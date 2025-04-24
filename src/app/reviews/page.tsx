"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import Script from "next/script";

// Create a Reviews component that will use SociableKit
const GoogleReviews = () => {
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const isScriptLoaded = useRef(false);

  // Function to apply CSS fixes
  const applyCSSFixes = () => {
    // Add custom CSS to fix star alignment and container width
    const style = document.createElement('style');
    style.textContent = `
      /* Make container wider */
      .sk-ww-google-reviews {
        max-width: 100% !important;
        width: 100% !important;
      }
      
      /* Fix star alignment - more aggressive with !important */
      .sk-ww-google-reviews .sk-ww-google-review-item .sk-ww-google-review-rating {
        display: flex !important;
        flex-direction: row !important;
        justify-content: flex-start !important;
        align-items: center !important;
        flex-wrap: nowrap !important;
      }
      
      .sk-ww-google-reviews .sk-ww-google-review-item .sk-ww-google-review-rating img {
        display: inline-block !important;
        margin: 0 2px !important;
      }
      
      /* Improve overall layout */
      .sk-ww-google-reviews .sk-ww-google-review-item {
        margin-bottom: 20px !important;
        width: 100% !important;
      }
      
      /* Make reviews display in a grid */
      .sk-ww-google-review-items {
        display: grid !important;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
        gap: 20px !important;
      }
    `;
    document.head.appendChild(style);
  };

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
      
      // Apply CSS fixes immediately
      applyCSSFixes();
      
      // Also apply CSS fixes after a delay to ensure the widget has loaded
      setTimeout(applyCSSFixes, 1000);
      setTimeout(applyCSSFixes, 2000);
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
            // Apply CSS fixes after widget loads
            setTimeout(applyCSSFixes, 500);
          }
        }}
      />
      
      {/* SociableKit Widget Container */}
      <div 
        ref={reviewsContainerRef}
        className="sk-ww-google-reviews w-full" 
        data-embed-id="25549722"
        data-reviews-count="6"
        data-max-rows="2"
        data-show-more="false"
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
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-secondary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Customer Reviews</h1>
          <div className="flex justify-center items-center gap-1 mb-4">
            <StarIcon className="h-6 w-6 text-primary" />
            <StarIcon className="h-6 w-6 text-primary" />
            <StarIcon className="h-6 w-6 text-primary" />
            <StarIcon className="h-6 w-6 text-primary" />
            <StarIcon className="h-6 w-6 text-primary" />
            <span className="ml-2 text-2xl font-bold">4.7/5</span>
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

      {/* Featured Before & After Transformations */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Transformations</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Take a look at some of our most impressive detailing transformations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Transformation 1 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative pt-[56.25%]">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  {/* Replace with actual image */}
                  <p className="text-gray-700">Transformation Image</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Paint Correction & Ceramic Coating</h3>
                <p className="text-gray-600 mb-4">
                  Removed years of swirl marks and applied a premium ceramic coating for long-lasting protection.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Vehicle: Mercedes-Benz C300</span>
                  <span className="text-sm font-medium text-primary">Ultimate Package</span>
                </div>
              </div>
            </div>
            
            {/* Transformation 2 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative pt-[56.25%]">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  {/* Replace with actual image */}
                  <p className="text-gray-700">Transformation Image</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Interior Restoration</h3>
                <p className="text-gray-600 mb-4">
                  Deep cleaned heavily soiled seats and carpets, restoring them to like-new condition.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Vehicle: Ford F-150</span>
                  <span className="text-sm font-medium text-primary">Premium Package</span>
                </div>
              </div>
            </div>
            
            {/* Transformation 3 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative pt-[56.25%]">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  {/* Replace with actual image */}
                  <p className="text-gray-700">Transformation Image</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Headlight Restoration</h3>
                <p className="text-gray-600 mb-4">
                  Restored foggy, yellowed headlights to crystal clear, improving visibility and appearance.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Vehicle: Toyota Camry</span>
                  <span className="text-sm font-medium text-primary">Add-on Service</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/gallery" className="btn-outline-dark px-8 py-3">
              View Gallery
            </Link>
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