import { Geist, Outfit, Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const roundo = localFont({
  src: [
    { path: "../../public/Font/roundo/Roundo-ExtraLight.otf", weight: "200", style: "normal" },
    { path: "../../public/Font/roundo/Roundo-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/Font/roundo/Roundo-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/Font/roundo/Roundo-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/Font/roundo/Roundo-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../../public/Font/roundo/Roundo-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-roundo",
  display: "swap",
});

export const metadata = {
  title: "Chameri — Premium Villa Residences",
  description:
    "Chameri offers premium villa residences for those who seek refined living. Bespoke glass systems for ambitious architectural projects.",
  icons: {
    // Same swirl mark in both files — just re-colored to stay legible
    // against the browser's own tab background in each theme.
    icon: [
      { url: "/favicon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${outfit.variable} ${instrumentSans.variable} ${roundo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
