"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { StreamMusic } from "@/data/music";

type Props = {
  music: StreamMusic;
  accent: string;
  enabled: boolean;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement | string,
        opts: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (e: { target: YtPlayer }) => void;
            onStateChange?: (e: { data: number; target: YtPlayer }) => void;
          };
        },
      ) => YtPlayer;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

type YtPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  destroy: () => void;
  setVolume: (n: number) => void;
};

let ytApiPromise: Promise<void> | null = null;

function loadYouTubeApi() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(s);
    }
  });
  return ytApiPromise;
}

/**
 * Background music via YouTube (primary) + optional Spotify embed —
 * same pattern used by cinematic invite studios (tap to play / pause).
 */
export function MusicToggle({ music, accent, enabled }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YtPlayer | null>(null);
  const spotifyRef = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(false);
  const [needsTap, setNeedsTap] = useState(true);
  const [engine, setEngine] = useState<"youtube" | "spotify">("youtube");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let player: YtPlayer | null = null;

    void (async () => {
      try {
        await loadYouTubeApi();
        if (cancelled || !hostRef.current || !window.YT) return;

        // Clear previous mount node children
        hostRef.current.innerHTML = "";
        const mount = document.createElement("div");
        hostRef.current.appendChild(mount);

        player = new window.YT.Player(mount, {
          videoId: music.youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            rel: 0,
            loop: 1,
            playlist: music.youtubeId,
            playsinline: 1,
          },
          events: {
            onReady: (e) => {
              if (cancelled) return;
              e.target.setVolume(35);
              playerRef.current = e.target;
              setReady(true);
              setEngine("youtube");
            },
            onStateChange: (e) => {
              if (!window.YT) return;
              if (e.data === window.YT.PlayerState.PLAYING) setPlaying(true);
              if (e.data === window.YT.PlayerState.PAUSED) setPlaying(false);
              if (e.data === window.YT.PlayerState.ENDED) {
                e.target.playVideo();
              }
            },
          },
        });
      } catch {
        if (!cancelled && music.spotifyTrackId) {
          setEngine("spotify");
          setReady(true);
        }
      }
    })();

    return () => {
      cancelled = true;
      try {
        player?.destroy();
      } catch {
        /* ignore */
      }
      playerRef.current = null;
    };
  }, [enabled, music.youtubeId, music.spotifyTrackId]);

  const playSpotify = useCallback(() => {
    const iframe = spotifyRef.current;
    if (!iframe || !music.spotifyTrackId) return;
    // Reload with autoplay to satisfy gesture-gated play
    iframe.src = `https://open.spotify.com/embed/track/${music.spotifyTrackId}?utm_source=generator&theme=0`;
    setPlaying(true);
    setNeedsTap(false);
    setEngine("spotify");
  }, [music.spotifyTrackId]);

  const toggle = async () => {
    if (engine === "youtube" && playerRef.current) {
      if (playing) {
        playerRef.current.pauseVideo();
        setPlaying(false);
      } else {
        try {
          playerRef.current.setVolume(35);
          playerRef.current.playVideo();
          setPlaying(true);
          setNeedsTap(false);
        } catch {
          if (music.spotifyTrackId) playSpotify();
          else setNeedsTap(true);
        }
      }
      return;
    }

    if (music.spotifyTrackId) {
      if (playing) {
        // Spotify embed can't reliably pause via API — blank the src
        if (spotifyRef.current) spotifyRef.current.src = "about:blank";
        setPlaying(false);
      } else {
        playSpotify();
      }
    }
  };

  if (!enabled) return null;

  return (
    <>
      {/* Off-screen YouTube host */}
      <div
        ref={hostRef}
        aria-hidden
        className="pointer-events-none fixed -left-[9999px] h-px w-px overflow-hidden opacity-0"
      />

      {/* Optional Spotify embed (hidden when idle) */}
      {music.spotifyTrackId && (
        <iframe
          ref={spotifyRef}
          title="Spotify music"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="pointer-events-none fixed bottom-0 left-0 h-px w-px opacity-0"
          tabIndex={-1}
        />
      )}

      <div className="invite-music-dock fixed right-3 top-3 z-50 flex flex-col items-end gap-2 sm:right-5 sm:top-5">
        <button
          type="button"
          onClick={() => void toggle()}
          aria-label={playing ? "Pause music" : "Play music"}
          title={`${music.label} · YouTube${music.spotifyTrackId ? " / Spotify" : ""}`}
          className="flex items-center gap-2 rounded-full border px-3 py-2 backdrop-blur-md transition hover:scale-[1.03] sm:px-4"
          style={{
            background: "rgba(0,0,0,0.5)",
            borderColor: accent,
            color: accent,
          }}
        >
          <span className="text-sm">{playing ? "❚❚" : "▶"}</span>
          <span className="hidden text-[0.65rem] uppercase tracking-[0.18em] sm:inline">
            {playing ? "Music" : needsTap ? "Tap music" : ready ? "Play" : "…"}
          </span>
        </button>
        <p className="max-w-[10rem] text-right text-[10px] leading-snug text-white/70 sm:max-w-[12rem]">
          {music.label}
          <span className="opacity-70"> · YouTube Music</span>
        </p>
      </div>
    </>
  );
}
