import { Geist, Outfit, Instrument_Sans } from "next/font/google";
import Script from "next/script";
import localFont from "next/font/local";
import FloatingContactButtons from "@/components/common/FloatingContactButtons";
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
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P93V5VC5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <FloatingContactButtons />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P93V5VC5');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </body>
    </html>
  );
}
