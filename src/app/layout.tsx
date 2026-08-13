import type { Metadata } from "next";
import {
  Cinzel,
  Cormorant_Garamond,
  DM_Sans,
  Great_Vibes,
  Italianno,
  Outfit,
} from "next/font/google";
import "./globals.css";

/** Ceremonial English display — classic wedding card titles */
const display = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Soft editorial for long English lines */
const displaySoft = Cormorant_Garamond({
  variable: "--font-display-soft",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const brand = DM_Sans({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Flourished English script — “the wedding of”, & */
const script = Italianno({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const scriptAlt = Great_Vibes({
  variable: "--font-script-alt",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Where Creativity Meets Code · Protorev Digital",
    template: "%s · Where Creativity Meets Code",
  },
  description:
    "Where creativity meets code — multi-faith, multi-language digital wedding invitations by Protorev Digital.",
  applicationName: "Protorev Digital",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${displaySoft.variable} ${body.variable} ${brand.variable} ${script.variable} ${scriptAlt.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Ceremonial Indic serifs + classical Tiro — Illustrator-grade invitation type */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Noto+Serif+Kannada:wght@400;500;600;700&family=Noto+Serif+Malayalam:wght@400;500;600;700&family=Noto+Serif+Tamil:wght@400;500;600;700&family=Noto+Serif+Telugu:wght@400;500;600;700&family=Tiro+Devanagari+Hindi&family=Tiro+Kannada&family=Tiro+Tamil&family=Tiro+Telugu&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
