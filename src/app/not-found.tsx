import Link from 'next/link';
import { Metadata } from 'next';
import RelatedPages from '@/components/RelatedPages';

export const metadata: Metadata = {
  title: "Page Not Found | Luke's Mobile Detailing",
  description: "Sorry, the page you're looking for doesn't exist. Return to our home page to explore our car detailing services.",
  robots: {
    index: false,
    follow: true,
  }
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/" className="btn-primary inline-block mb-12">
            Return to Home
          </Link>
          
          <div className="mt-12 border-t pt-12">
            <h3 className="text-xl font-semibold mb-4">Helpful Links</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/services" className="text-primary hover:underline">
                Our Services
              </Link>
              <Link href="/about" className="text-primary hover:underline">
                About Us
              </Link>
              <Link href="/contact" className="text-primary hover:underline">
                Contact Us
              </Link>
              <Link href="/square-booking" className="text-primary hover:underline">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <RelatedPages currentPath="/404" title="You Might Be Looking For" />
    </div>
  );
} 