// Local screenshot pipeline. Review changes without spending a Netlify deploy.
//
//   npm run shots                     every target, against the dev server
//   npm run shots -- --build          against the real prerendered output
//   npm run shots -- home tech        only the named targets
//   npm run shots -- --out review-2   write to shots/review-2/
//
// Output lands in shots/<run>/ and is gitignored. Nothing here is used at
// build or deploy time; it only drives a local Chrome.
//
// No new dependencies: it talks to the Chrome already on this machine over the
// DevTools protocol, using Node's built-in WebSocket and fetch (Node 22+).

import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const CHROME =
  process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 4321;
const CDP_PORT = 9333;

// Each target is one screenshot: a route, a viewport, and optionally how far
// down the page to scroll before capturing. `scroll` is in CSS pixels from the
// top; sections on this site are full-viewport-height, so a section's offset is
// roughly its index times the viewport height.
const TARGETS = [
  { name: "home", path: "/", w: 1440, h: 900 },
  { name: "home-laptop", path: "/", w: 1024, h: 760 },
  { name: "home-phone", path: "/", w: 390, h: 780 },
  { name: "problem", path: "/", w: 1440, h: 900, scroll: 920 },
  { name: "solution", path: "/", w: 1440, h: 900, scroll: 1850 },
  { name: "evidence", path: "/", w: 1440, h: 900, scroll: 2800 },
  { name: "usecases", path: "/", w: 1440, h: 900, scroll: 3750 },
  { name: "tech", path: "/technology", w: 1440, h: 900 },
  { name: "tech-sensing", path: "/technology", w: 1440, h: 900, scroll: 1850 },
  { name: "clinical", path: "/clinical-evidence", w: 1440, h: 900 },
  { name: "anesthesiology", path: "/solutions/anesthesiology", w: 1440, h: 900 },
  { name: "partner", path: "/partner-with-us", w: 1440, h: 900 },
  { name: "contact", path: "/contact", w: 1440, h: 900 },
  { name: "footer", path: "/contact", w: 1440, h: 900, scroll: 99999 },
];

const args = process.argv.slice(2);
const useBuild = args.includes("--build");
const outIdx = args.indexOf("--out");
const runName = outIdx !== -1 ? args[outIdx + 1] : "latest";
const names = args.filter((a, i) => !a.startsWith("--") && !(outIdx !== -1 && i === outIdx + 1));
const targets = names.length ? TARGETS.filter((t) => names.includes(t.name)) : TARGETS;

if (!targets.length) {
  console.error(`No targets matched. Available:\n  ${TARGETS.map((t) => t.name).join("\n  ")}`);
  process.exit(1);
}
if (!existsSync(CHROME)) {
  console.error(`Chrome not found at:\n  ${CHROME}\nSet CHROME_PATH to override.`);
  process.exit(1);
}

const outDir = join("shots", runName);
const children = [];
const cleanup = () =>
  children.forEach((c) => {
    try {
      c.kill("SIGKILL");
    } catch {}
  });
process.on("exit", cleanup);
process.on("SIGINT", () => {
  cleanup();
  process.exit(130);
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForHttp(url, timeoutMs, label) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await sleep(400);
  }
  throw new Error(`${label} did not come up at ${url} within ${timeoutMs}ms`);
}

function run(cmd, cmdArgs, opts = {}) {
  const child = spawn(cmd, cmdArgs, { stdio: "ignore", ...opts });
  children.push(child);
  return child;
}

// One CDP session against a single tab, kept open across every screenshot so
// the browser and the page bundle are only paid for once.
async function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = () => rej(new Error("could not open a DevTools connection"));
  });
  let id = 0;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    const slot = pending.get(msg.id);
    if (!slot) return;
    pending.delete(msg.id);
    msg.error ? slot.rej(new Error(msg.error.message)) : slot.res(msg.result ?? {});
  };
  const send = (method, params = {}) =>
    new Promise((res, rej) => {
      const mid = ++id;
      pending.set(mid, { res, rej });
      ws.send(JSON.stringify({ id: mid, method, params }));
    });
  return { send, close: () => ws.close() };
}

async function main() {
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  let origin;
  if (useBuild) {
    console.log("building…");
    await new Promise((res, rej) => {
      const b = spawn("npm", ["run", "build"], { stdio: "inherit" });
      b.on("exit", (code) => (code === 0 ? res() : rej(new Error("build failed"))));
    });
    run("npx", ["--yes", "serve", "-s", "dist/client", "-l", String(PORT)]);
    origin = `http://localhost:${PORT}`;
  } else {
    run("npm", ["run", "dev", "--", "--port", String(PORT), "--strictPort"]);
    origin = `http://localhost:${PORT}`;
  }
  await waitForHttp(origin, 90_000, useBuild ? "static server" : "dev server");

  run(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--remote-debugging-port=${CDP_PORT}`,
    "--remote-allow-origins=*",
    "--user-data-dir=/tmp/vena-shots-profile",
    "about:blank",
  ]);
  await waitForHttp(`http://localhost:${CDP_PORT}/json/version`, 30_000, "Chrome");

  const tabs = await (await fetch(`http://localhost:${CDP_PORT}/json/list`)).json();
  const tab = tabs.find((t) => t.type === "page");
  const cdp = await connect(tab.webSocketDebuggerUrl);
  await cdp.send("Page.enable");

  for (const t of targets) {
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: t.w,
      height: t.h,
      deviceScaleFactor: 2,
      mobile: t.w < 768,
    });
    await cdp.send("Page.navigate", { url: origin + t.path });
    // Videos, fonts and the reveal animations all need a beat to settle. The
    // dev server also compiles on first request for each route.
    await sleep(useBuild ? 4000 : 7000);
    if (t.scroll) {
      await cdp.send("Runtime.evaluate", {
        expression: `window.scrollTo(0, Math.min(${t.scroll}, document.body.scrollHeight)); 1`,
      });
      await sleep(2500);
    }
    const { data } = await cdp.send("Page.captureScreenshot", { format: "png" });
    const file = join(outDir, `${t.name}.png`);
    await writeFile(file, Buffer.from(data, "base64"));
    console.log(`  ${t.name.padEnd(16)} ${t.w}x${t.h}${t.scroll ? ` @${t.scroll}` : ""}  ${file}`);
  }

  cdp.close();
  console.log(`\n${targets.length} shot(s) in ${outDir}/`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("\n" + err.message);
    process.exit(1);
  });
