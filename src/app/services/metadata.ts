import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Car Detailing Services | Luke's Mobile Detailing",
  description: "Mobile car detailing services in Yuba City, Marysville, and surrounding areas. Interior cleaning, exterior washing, paint protection, and more - we come to you!",
  keywords: "car detailing services, mobile detailing, auto detailing packages, Yuba City, Marysville, interior cleaning, exterior washing, paint protection",
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: "Car Detailing Services | Luke's Mobile Detailing",
    description: "Mobile car detailing services in Yuba City, Marysville, and surrounding areas. We bring professional detailing to your location.",
    url: 'https://lukesmobiledetailing.com/services',
    type: 'website',
    images: [
      {
        url: 'https://lukesmobiledetailing.com/Images/webPhotos/servicesBanner.jpg',
        width: 1200,
        height: 630,
        alt: "Luke's Mobile Detailing Services",
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Car Detailing Services | Luke's Mobile Detailing",
    description: "Mobile car detailing services in Yuba City, Marysville, and surrounding areas. We come to your location.",
    images: ['https://lukesmobiledetailing.com/Images/webPhotos/servicesBanner.jpg'],
  }
}; 