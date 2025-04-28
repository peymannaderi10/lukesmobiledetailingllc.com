"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import Script from "next/script";
import Image from "next/image";
import { useReviews } from "../context/ReviewsContext";

// Create a Reviews component that will use SociableKit
const GoogleReviews = () => {
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);
  const { isReviewsLoaded, setIsReviewsLoaded, hasVisitedBefore } = useReviews();
  const [showLoader, setShowLoader] = useState(!hasVisitedBefore || !isReviewsLoaded);

  useEffect(() => {
    // Only show loader if reviews aren't loaded
    if (hasVisitedBefore && isReviewsLoaded) {
      setShowLoader(false);
    }

    // Don't show the widget initially if we haven't visited before
    if (!hasVisitedBefore) {
      const widgetEl = reviewsContainerRef.current;
      if (widgetEl) {
        widgetEl.style.visibility = 'hidden';
      }
    }

    // This function handles the initialization of SociableKit
    const initializeSociableKit = () => {
      if (scriptLoadedRef.current) return;
      
      scriptLoadedRef.current = true;
      
      // If we've already visited and loaded, don't reinitialize
      if (hasVisitedBefore && isReviewsLoaded) return;
      
      if (window.sociablekit) {
        // Clear any existing widget data
        window.sociablekit.widgets = [];
        
        console.log("Initializing SociableKit...");
        
        // Initialize the widget
        window.sociablekit.initSocialFeed();
        
        // Wait for the widget to load
        const checkWidget = setInterval(() => {
          const widgetContent = document.querySelector('.sk-reviews');
          if (widgetContent) {
            clearInterval(checkWidget);
            
            console.log("SociableKit widget loaded!");
            
            // Hide loader and show widget
            setShowLoader(false);
            
            // Make widget visible if it was hidden
            const widgetEl = reviewsContainerRef.current;
            if (widgetEl) {
              widgetEl.style.visibility = 'visible';
            }
            
            // Mark as loaded after everything is complete
            setTimeout(() => {
              setIsReviewsLoaded(true);
            }, 1000);
          }
        }, 500);
        
        // Add timeout to prevent infinite waiting
        setTimeout(() => {
          clearInterval(checkWidget);
          
          // If we still don't have content, force the completion
          if (!document.querySelector('.sk-reviews')) {
            console.log("SociableKit widget timeout - forcing completion");
            setShowLoader(false);
            setIsReviewsLoaded(true);
            
            const widgetEl = reviewsContainerRef.current;
            if (widgetEl) {
              widgetEl.style.visibility = 'visible';
            }
          }
        }, 10000);
      }
    };

    // If the script is already loaded in the document, initialize directly
    if (typeof window !== 'undefined' && window.sociablekit) {
      initializeSociableKit();
    }

    // Add CSS fixes for the stars regardless of loading state
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

    // Set up event listener for the script loaded event
    window.onSociablekitLoad = initializeSociableKit;

    return () => {
      // Cleanup
      delete window.onSociablekitLoad;
    };
  }, [hasVisitedBefore, isReviewsLoaded, setIsReviewsLoaded]);

  return (
    <>
      {/* Always include the script - its execution will be managed by our useEffect */}
      <Script
        src="https://widgets.sociablekit.com/google-reviews/widget.js"
        async
        defer
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.sociablekit) {
            // Call the global handler we set up
            if (window.onSociablekitLoad) {
              window.onSociablekitLoad();
            }
          }
        }}
      />
      
      {/* Loading indicator */}
      {showLoader && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <span className="ml-3 text-lg">Loading reviews...</span>
        </div>
      )}
      
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
    onSociablekitLoad?: () => void;
  }
}

export default function ReviewsPage() {
  const [rating, setRating] = useState<string>("5.0");
  const { hasVisitedBefore, setHasVisitedBefore } = useReviews();

  useEffect(() => {
    // Mark that we've visited the reviews page
    setHasVisitedBefore(true);
    
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
  }, [setHasVisitedBefore]);

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