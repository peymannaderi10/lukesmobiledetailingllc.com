"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Create a Reviews component that will use SociableKit
const GoogleReviews = () => {
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const pathname = usePathname();
  const loadTriesRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Function to clean up SociableKit
  const cleanupSociableKit = () => {
    // Remove any existing widgets
    if (window.sociablekit) {
      window.sociablekit.widgets = [];
    }
    
    // Remove any existing script
    if (scriptRef.current && scriptRef.current.parentNode) {
      try {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      } catch (error) {
        console.error("Error removing script:", error);
      }
      scriptRef.current = null;
    }
    
    // Instead of removing children, empty the container safely
    const widgetContainers = document.querySelectorAll('.sk-ww-google-reviews');
    widgetContainers.forEach(container => {
      try {
        // Safer way to clear contents - just set innerHTML to empty
        container.innerHTML = '';
      } catch (error) {
        console.error("Error clearing container:", error);
      }
    });
  };

  // Function to load the SociableKit script
  const loadSociableKitScript = () => {
    if (loadTriesRef.current > 5) {
      console.warn("Maximum load attempts reached");
      return; // Prevent infinite retries
    }
    loadTriesRef.current++;
    
    try {
      cleanupSociableKit();
      
      // Add a version parameter to avoid caching issues
      const timestamp = new Date().getTime();
      
      // Create a new script element
      const script = document.createElement('script');
      script.src = `https://widgets.sociablekit.com/google-reviews/widget.js?v=${timestamp}`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log("SociableKit script loaded");
        setIsLoaded(true);
        
        // Simple approach: wait a bit and then initialize once
        setTimeout(() => {
          try {
            if (window.sociablekit) {
              console.log("Initializing SociableKit");
              window.sociablekit.initSocialFeed();
            } else {
              console.warn("SociableKit not available after script load");
            }
          } catch (error) {
            console.error("Error initializing SociableKit:", error);
          }
        }, 500);
      };
      
      script.onerror = (e) => {
        console.error("Failed to load SociableKit script:", e);
        // Try to reload after a delay
        setTimeout(loadSociableKitScript, 2000);
      };
      
      // Add the script to the document
      document.body.appendChild(script);
      scriptRef.current = script;
      
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
    } catch (error) {
      console.error("Error in loadSociableKitScript:", error);
    }
  };

  // Initialize on component mount and reload when pathname changes
  useEffect(() => {
    console.log("Reviews page mounted, pathname:", pathname);
    
    // Only load if we're on the reviews page
    if (pathname === '/reviews') {
      loadTriesRef.current = 0;
      loadSociableKitScript();
    }
    
    return () => {
      // Clean up when component unmounts or pathname changes
      cleanupSociableKit();
    };
  }, [pathname]);

  // Listen for visibility changes to reload when tab becomes visible
  useEffect(() => {
    let lastVisibilityChange = 0;
    
    const handleVisibilityChange = () => {
      try {
        // Debounce visibility changes to prevent rapid reloading
        const now = Date.now();
        if (now - lastVisibilityChange < 2000) {
          console.log("Ignoring rapid visibility change");
          return;
        }
        lastVisibilityChange = now;
        
        if (document.visibilityState === 'visible' && pathname === '/reviews') {
          console.log("Page became visible, reloading SociableKit");
          loadTriesRef.current = 0;
          loadSociableKitScript();
        }
      } catch (error) {
        console.error("Error in visibility change handler:", error);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname]);

  return (
    <div 
      ref={reviewsContainerRef}
      className="sk-ww-google-reviews" 
      data-embed-id="25549722"
    >
      {!isLoaded && (
        <div className="text-center py-16">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-4 text-gray-600">Loading reviews...</p>
        </div>
      )}
    </div>
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