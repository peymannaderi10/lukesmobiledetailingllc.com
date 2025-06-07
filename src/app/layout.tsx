import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: "Luke's Mobile Detailing | Professional Car Detailing Services",
  description: "Professional mobile car detailing services that come to you. Interior and exterior detailing, washing, and more. Book online today.",
  keywords: "car detailing, mobile detailing, auto detailing, car wash, luke's mobile detailing",
  openGraph: {
    title: "Luke's Mobile Detailing | Professional Car Detailing Services",
    description: "Professional mobile car detailing services that come to you. Interior and exterior detailing, washing, and more. Book online today.",
    url: "https://lukesmobiledetailingllc.com",
    siteName: "Luke's Mobile Detailing",
    images: [
      {
        url: "https://lukesmobiledetailingllc.com/Images/webPhotos/Banner.jpg",
        width: 1200,
        height: 630,
        alt: "Luke's Mobile Detailing Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luke's Mobile Detailing | Professional Car Detailing Services",
    description: "Professional mobile car detailing services that come to you. Interior and exterior detailing, washing, and more. Book online today.",
    images: ["https://lukesmobiledetailingllc.com/Images/webPhotos/Banner.jpg"],
  },
  alternates: {
    canonical: "https://lukesmobiledetailingllc.com",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest'
      }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "Luke's Mobile Detailing"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* iOS Safari specific tags that can't be defined in metadata */}
        <meta name="format-detection" content="telephone=no" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        style={{ isolation: "isolate" }}
      >
        <Script
          id="schema-org-script"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Luke's Mobile Detailing",
              "image": "https://lukesmobiledetailingllc.com/Images/webPhotos/Banner.jpg",
              "url": "https://lukesmobiledetailingllc.com",
              "telephone": "+15306503631",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Yuba City",
                "addressRegion": "CA",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 39.1404,
                "longitude": -121.6169
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "09:00",
                  "closes": "17:00"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/lukemobiledetailing/",
                "https://www.instagram.com/lukesmobiledetailingllc/",
                "https://tiktok.com/@lukesmobiledetailing"
              ],
              "priceRange": "$$",
              "description": "Professional mobile car detailing services that come to you. Interior and exterior detailing, washing, and more."
            })
          }}
        />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
