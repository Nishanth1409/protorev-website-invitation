/** Streaming music used across invitation themes (YouTube + Spotify). */

export type StreamMusic = {
  /** YouTube video id — primary player */
  youtubeId: string;
  /** Optional Spotify track id for embed fallback */
  spotifyTrackId?: string;
  label: string;
};

/**
 * Upbeat / warm celebration moods.
 * YouTube is primary; Spotify mirrors Xensco-style event-page streaming.
 */
export const musicByMood = {
  gilded: {
    youtubeId: "ru0K8uYEZWw",
    spotifyTrackId: "3ZFTkvIE7kyPt6NuZQtkH",
    label: "Champagne night",
  },
  royal: {
    youtubeId: "hT_nvWreIhg",
    spotifyTrackId: "0tgVpDi06FyKpA1z0VMD4v",
    label: "Royal romance",
  },
  festival: {
    youtubeId: "CevxZvSJLk8",
    spotifyTrackId: "0pqnGHJpmpxLKifKRmU6WP",
    label: "Festival joy",
  },
  garden: {
    youtubeId: "450p7goxZqg",
    spotifyTrackId: "1zi7xx7UVEFkmKfvBbGgvc",
    label: "Garden bloom",
  },
  cosmic: {
    youtubeId: "fLexgOxsZu0",
    spotifyTrackId: "7qiZfU4dY1lWllzX7mPBI3",
    label: "Starlit sky",
  },
  coastal: {
    youtubeId: "09R8_2nJtjg",
    spotifyTrackId: "1BxfuPK3JrZWsOtZFGC57t",
    label: "Ocean breeze",
  },
  neon: {
    youtubeId: "fJ9rUzIMcZQ",
    spotifyTrackId: "5CQ30WqJwcep0pYcV4AMNc",
    label: "Neon celebration",
  },
  classic: {
    youtubeId: "YQHsXMglC9A",
    spotifyTrackId: "3U4isOIWKQKtCd4JS7oI0B",
    label: "Classic vow",
  },
} as const satisfies Record<string, StreamMusic>;

export type MusicMood = keyof typeof musicByMood;

export const defaultMusic: StreamMusic = musicByMood.royal;
