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
        {children}
        <FloatingContactButtons />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y29NJJ1WBV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-Y29NJJ1WBV');
          `}
        </Script>
        {/* Facebook Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2870368053320401');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2870368053320401&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Facebook Pixel Code */}
      </body>
    </html>
  );
}
