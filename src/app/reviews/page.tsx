"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import Script from "next/script";
import Image from "next/image";

// Create a Reviews component that will use SociableKit
const GoogleReviews = () => {
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const isScriptLoaded = useRef(false);

  useEffect(() => {
    // Only execute this if the script hasn't been loaded yet
    if (!isScriptLoaded.current && reviewsContainerRef.current) {
      isScriptLoaded.current = true;
      
      // Clean up any existing widgets before re-initializing
      if (window.sociablekit) {
        window.sociablekit.widgets = [];
      }

      // Initialize SociableKit
      if (typeof window !== 'undefined' && window.sociablekit) {
        window.sociablekit.initSocialFeed();
      }
      
    }
  }, []);

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
      <section className="relative text-white min-h-[585px] md:min-h-[715px]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/Images/webPhotos/reviewsBanner.jpeg" 
            alt="Customer reviews banner" 
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0 bg-black opacity-50" />
          <div 
            className="absolute bottom-0 left-0 right-0 h-16 md:h-24 z-[1]" 
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0) 15%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.4) 55%, rgba(255,255,255,0.6) 65%, rgba(255,255,255,0.75) 75%, rgba(255,255,255,0.85) 85%, rgba(255,255,255,0.95) 95%, rgba(255,255,255,1) 100%)'
            }}
          />
        </div>
        <div className="container-custom relative z-10 pt-32 md:pt-40 pb-32 md:pb-48 flex flex-col min-h-[585px] md:min-h-[715px]">
          <div className="max-w-3xl mx-auto text-center flex-1 flex flex-col justify-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">Customer Reviews</h1>
            <div className="flex justify-center items-center gap-1 mb-4">
              <StarIcon className="h-6 w-6 text-primary" />
              <StarIcon className="h-6 w-6 text-primary" />
              <StarIcon className="h-6 w-6 text-primary" />
              <StarIcon className="h-6 w-6 text-primary" />
              <StarIcon className="h-6 w-6 text-primary" />
              <span className="ml-2 text-2xl font-bold text-white">{rating}/5</span>
            </div>
            <p className="text-lg max-w-2xl mx-auto text-white mb-6">
              See what our customers have to say about our detailing services.
            </p>
            <div className="mt-6">
              <Link 
                href="https://g.page/r/CRqkNMTJw0l8EAI/review"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-3 inline-block"
              >
                Leave a Google Review
              </Link>
            </div>
          </div>
        </div>
        
        {/* Curved Divider */}
        <div className="curved-divider hero-services-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hero-reviews-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4"></stop>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1"></stop>
              </linearGradient>
            </defs>
            <path fill="url(#hero-reviews-gradient)" d="M0,128 C480,0 960,160 1440,80 L1440,160 L0,160 Z"></path>
          </svg>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <GoogleReviews />
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for Your Own Transformation?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the same exceptional results our customers rave about. Book your detailing service today!
          </p>
          <Link href="https://app.squareup.com/appointments/buyer/widget/hs7hvrxqk38fag/L51SWV5N7VVBD" className="btn bg-white text-primary hover:bg-gray-100 font-bold px-8 py-3 shadow-lg">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
} 