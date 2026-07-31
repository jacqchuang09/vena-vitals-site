import { useEffect, useRef, useState } from "react";

/**
 * Plays a set of clips on an endless loop, crossfading from one into the next a
 * moment before each clip ends so the transitions feel smooth rather than cut.
 */
const sources = [
  "/assets/operating-room/or-monitor.mp4",
  "/assets/operating-room/or-monitor-2.mp4",
];

const FADE_MS = 700;
const CROSSFADE_LEAD = 0.85; // seconds before a clip ends to begin the fade

export function HeroBackgroundVideos({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(0);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const transitioning = useRef(false);

  useEffect(() => {
    const first = videoRefs.current[0];
    if (first) {
      const played = first.play();
      if (played) played.catch(() => {});
    }
  }, []);

  const advance = (from: number) => {
    if (transitioning.current || from !== active) return;
    transitioning.current = true;
    const next = (from + 1) % sources.length;
    const nextVideo = videoRefs.current[next];
    if (nextVideo) {
      try {
        nextVideo.currentTime = 0;
      } catch {
        /* seeking before metadata is fine to ignore */
      }
      const played = nextVideo.play();
      if (played) played.catch(() => {});
    }
    setActive(next);
  };

  useEffect(() => {
    // Once the crossfade finishes, pause and rewind every clip but the active one.
    const timer = window.setTimeout(() => {
      videoRefs.current.forEach((video, i) => {
        if (video && i !== active) {
          video.pause();
          try {
            video.currentTime = 0;
          } catch {
            /* ignore */
          }
        }
      });
      transitioning.current = false;
    }, FADE_MS);
    return () => window.clearTimeout(timer);
  }, [active]);

  return (
    <div className={`${className} isolate`}>
      {sources.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            videoRefs.current[i] = el;
          }}
          src={src}
          className="absolute inset-0 h-full w-full origin-center scale-[1.14] translate-x-[3%] translate-y-[3%] object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 2 : 1 }}
          muted
          playsInline
          preload="auto"
          onTimeUpdate={() => {
            const video = videoRefs.current[i];
            if (!video || i !== active) return;
            if (video.duration && video.currentTime >= video.duration - CROSSFADE_LEAD) {
              advance(i);
            }
          }}
          onEnded={() => advance(i)}
        />
      ))}
    </div>
  );
}
