import { Geist, Outfit, Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import FloatingContactButtons from "@/components/common/FloatingContactButtons";
import ScrollToTop from "@/components/common/ScrollToTop";
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${outfit.variable} ${instrumentSans.variable} ${roundo.variable} h-full antialiased`}>
      <head>
        {/* Warm up the GTM origins during first paint so the deferred loader
            below doesn't pay DNS + TLS when it finally runs. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager — next/script with afterInteractive instead of a
            raw inline <script> in <head>. The inline version executed before
            first paint and injected gtm.js synchronously into the critical
            path, which is a large part of the mobile blocking time; this runs
            it once the page is interactive. dataLayer is seeded here so any
            push that happens before gtm.js lands is still picked up. */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P93V5VC5');`}
        </Script>
        {/* Google Tag Manager (noscript) — must be first thing in <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P93V5VC5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ScrollToTop />
        {children}
        <FloatingContactButtons />
      </body>
    </html>
  );
}
