import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter-latin.woff2",
      style: "normal",
    },
    {
      path: "../public/fonts/inter-latin-ext.woff2",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-inter",
});

export const instrumentSerif = localFont({
  src: [
    {
      path: "../public/fonts/instrument-serif-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/instrument-serif-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const jetbrainsMono = localFont({
  src: [
    {
      path: "../public/fonts/jetbrains-mono-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/jetbrains-mono-500.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-jetbrains-mono",
});
