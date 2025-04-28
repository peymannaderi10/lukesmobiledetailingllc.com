"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import Script from "next/script";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Create a Reviews component that will use SociableKit
const GoogleReviews = () => {
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Clean up any existing widgets
    if (window.sociablekit) {
      window.sociablekit.widgets = [];
    }

    // Initialize SociableKit
    if (typeof window !== 'undefined' && window.sociablekit) {
      window.sociablekit.initSocialFeed();
    }
      
    // Add custom CSS to fix the vertical stars issue
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* Fix for vertical stars in SociableKit widget */
      .sk-badge__stars {
        display: flex !important;
        flex-direction: row !important;
        justify-content: center !important;
        align-items: center !important;
        margin: 5px auto !important;
      }
      
      /* Individual review stars should be left-aligned */
      .sk-post__rating {
        display: flex !important;
        flex-direction: row !important;
        justify-content: flex-start !important;
        align-items: center !important;
        margin: 5px 0 !important;
      }
      
      .sk-post__rating-icon {
        display: inline-block !important;
        margin: 0 2px !important;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      // Clean up on unmount
      if (window.sociablekit) {
        window.sociablekit.widgets = [];
      }
      styleElement.remove();
    };
  }, [pathname]); // Re-run when pathname changes

  return (
    <>
      {/* SociableKit Script */}
      <Script
        src="https://widgets.sociablekit.com/google-reviews/widget.js"
        async
        defer
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.sociablekit) {
            window.sociablekit.initSocialFeed();
          }
        }}
      />
      
      {/* SociableKit Widget Container */}
      <div 
        ref={reviewsContainerRef}
        className="sk-ww-google-reviews" 
        data-embed-id="25549722"
      ></div>
    </>
  );
};

// Add TypeScript declaration for window.sociablekit
declare global {
  interface Window {
    sociablekit?: {
      initSocialFeed: () => void;
      widgets: Array<unknown>;
    };
  }
}

export default function ReviewsPage() {
  const [rating, setRating] = useState<string>("5.0");

  useEffect(() => {
    // Function to get rating from SociableKit widget
    const getRating = () => {
      const ratingElement = document.querySelector('.sk-badge__value');
      if (ratingElement) {
        const newRating = ratingElement.textContent || "5.0";
        setRating(newRating);
      }
    };

    // Initial check
    getRating();

    // Check periodically until we find the rating
    const interval = setInterval(() => {
      getRating();
    }, 1000);

    // Clean up interval after 10 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-secondary text-white py-16 relative">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/Images/webPhotos/reviewsBanner.jpeg" 
            alt="Customer reviews banner" 
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0 bg-black opacity-65" />
        </div>
        <div className="container-custom text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Customer Reviews</h1>
          <div className="flex justify-center items-center gap-1 mb-4">
            <StarIcon className="h-6 w-6 text-primary" />
            <StarIcon className="h-6 w-6 text-primary" />
            <StarIcon className="h-6 w-6 text-primary" />
            <StarIcon className="h-6 w-6 text-primary" />
            <StarIcon className="h-6 w-6 text-primary" />
            <span className="ml-2 text-2xl font-bold">{rating}/5</span>
          </div>
          <p className="text-lg max-w-2xl mx-auto">
            See what our customers have to say about our detailing services.
          </p>
        </div>
      </div>

      {/* Google Reviews Section */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <GoogleReviews />
        </div>
      </section>


      {/* Google Maps Section */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find Us</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Luke's Mobile Detailing serves customers throughout the region. Check our service area and reviews on Google Maps.
            </p>
          </div>
          <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d787342.9967339623!2d-121.6913194750624!3d39.569559709226795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x44ec67311b15f211%3A0x180b4e6d3cc4a12e!2sLuke%E2%80%99s%20Mobile%20Detailing!5e0!3m2!1sen!2sus!4v1745456581901!5m2!1sen!2sus" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Submit Review Section */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Had a Great Experience?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We'd love to hear about your experience with Luke's Mobile Detailing.
              Share your feedback and help others discover our services!
            </p>
            <div className="mt-6">
              <Link 
                href="https://g.page/r/CRqkNMTJw0l8EAI/review"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-3"
              >
                Leave a Google Review
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for Your Own Transformation?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the same exceptional results our customers rave about. Book your detailing service today!
          </p>
          <Link href="/booking" className="btn bg-white text-primary hover:bg-gray-100 font-bold px-8 py-3 shadow-lg">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
} 