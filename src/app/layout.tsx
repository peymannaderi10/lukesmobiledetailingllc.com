import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

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
  metadataBase: new URL('https://lukesmobiledetailingllc.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Luke's Mobile Detailing | Professional Car Detailing Services",
    description: "Professional mobile car detailing services that come to you. Interior and exterior detailing, washing, and more.",
    url: 'https://lukesmobiledetailingllc.com',
    siteName: "Luke's Mobile Detailing",
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://lukesmobiledetailingllc.com/Images/webPhotos/logo2.png',
        width: 1200,
        height: 630,
        alt: "Luke's Mobile Detailing Logo",
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Luke's Mobile Detailing | Professional Car Detailing Services",
    description: "Professional mobile car detailing services that come to you.",
    images: ['https://lukesmobiledetailingllc.com/Images/webPhotos/logo2.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Luke's Mobile Detailing",
              "image": "https://lukesmobiledetailingllc.com/Images/webPhotos/logo2.png",
              "url": "https://lukesmobiledetailingllc.com",
              "telephone": "+1-530-650-3631", 
              "description": "Professional mobile car detailing services that come to you. Interior and exterior detailing, washing, and more.",
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Yuba City, CA"
                },
                {
                  "@type": "City",
                  "name": "Marysville, CA"
                },
                {
                  "@type": "City",
                  "name": "Meridian, CA"
                },
                {
                  "@type": "City",
                  "name": "Live Oak, CA"
                },
                {
                  "@type": "City",
                  "name": "Olivehurst, CA"
                },
                {
                  "@type": "City",
                  "name": "Linda, CA"
                },
                {
                  "@type": "City",
                  "name": "Gridley, CA"
                },
                {
                  "@type": "City",
                  "name": "Sutter, CA"
                },
                {
                  "@type": "City",
                  "name": "Plumas Lake, CA"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "CA",
                "addressCountry": "US"
              },
              "priceRange": "$$",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "17:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Saturday"],
                  "opens": "09:00",
                  "closes": "17:00"
                }
              ],
              "sameAs": [
                "https://www.tiktok.com/@lukesmobiledetailing",  
                "https://www.instagram.com/lukesmobiledetailingllc"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        style={{ isolation: "isolate" }}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
