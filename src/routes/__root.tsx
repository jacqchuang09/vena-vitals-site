import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
// Site-wide default meta, and the not-found and error page text:
import site from "@content/site.json";

const { notFound, error: errorPage } = site;

export function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">{notFound.code}</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{notFound.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{notFound.body}</p>
        <div className="mt-6">
          <Link
            to={notFound.href}
            className="group inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {notFound.button}{" "}
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{errorPage.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{errorPage.body}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {errorPage.retryButton}
          </button>
          <a
            href={errorPage.href}
            className="group inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {errorPage.button}{" "}
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: site.seo.title },
      { name: "description", content: site.seo.description },
      { property: "og:site_name", content: site.seo.siteName },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ScrollToTop() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      });
      window.setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }, 80);
    };

    window.addEventListener("beforeunload", resetScroll);
    window.addEventListener("pageshow", resetScroll);
    resetScroll();

    return () => {
      window.removeEventListener("beforeunload", resetScroll);
      window.removeEventListener("pageshow", resetScroll);
    };
  }, []);

  useEffect(() => {
    // Mandatory scroll-snap (set globally in CSS) fights programmatic scroll on
    // route change, so neutralize it while we reset to the top, then restore it.
    const html = document.documentElement;
    const prevSnap = html.style.scrollSnapType;
    html.style.scrollSnapType = "none";

    const reset = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    reset();
    window.requestAnimationFrame(reset);
    const timer = window.setTimeout(() => {
      reset();
      html.style.scrollSnapType = prevSnap;
    }, 120);

    return () => {
      window.clearTimeout(timer);
      html.style.scrollSnapType = prevSnap;
    };
  }, [pathname]);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <div className="relative">
        <Nav />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
