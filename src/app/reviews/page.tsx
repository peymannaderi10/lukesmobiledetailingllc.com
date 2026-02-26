"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";

const GoogleReviews = () => {
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const isScriptLoaded = useRef(false);

  useEffect(() => {
    if (!isScriptLoaded.current && reviewsContainerRef.current) {
      isScriptLoaded.current = true;
      
      if (window.sociablekit) {
        window.sociablekit.widgets = [];
      }

      if (typeof window !== 'undefined' && window.sociablekit) {
        window.sociablekit.initSocialFeed();
      }
    }
  }, []);

  return (
    <>
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
      <div 
        ref={reviewsContainerRef}
        className="sk-ww-google-reviews" 
        data-embed-id="25549722"
      ></div>
    </>
  );
};

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
    const getRating = () => {
      const ratingElement = document.querySelector('.sk-badge__value');
      if (ratingElement) {
        const newRating = ratingElement.textContent || "5.0";
        setRating(newRating);
      }
    };

    getRating();

    const interval = setInterval(() => { getRating(); }, 1000);
    const timeout = setTimeout(() => { clearInterval(interval); }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="bg-black text-gray-100">
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
          <div className="absolute inset-0 bg-black/60" />
          <div 
            className="absolute bottom-0 left-0 right-0 h-16 md:h-24 z-[1]" 
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,0.95) 95%, rgba(0,0,0,1) 100%)'
            }}
          />
        </div>
        <div className="container-custom relative z-10 pt-32 md:pt-40 pb-32 md:pb-48 flex flex-col min-h-[585px] md:min-h-[715px]">
          <div className="max-w-3xl mx-auto text-center flex-1 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">Testimonials</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 text-white tracking-tight">Customer Reviews</h1>
            <div className="flex justify-center items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-primary text-2xl">star</span>
              ))}
              <span className="ml-2 text-2xl font-bold text-white">{rating}/5</span>
            </div>
            <p className="text-lg max-w-2xl mx-auto text-gray-300 mb-8">
              See what our customers have to say about our detailing services.
            </p>
            <div>
              <Link 
                href="https://g.page/r/CRqkNMTJw0l8EAI/review"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-primary-dark transition-all shadow-[0_0_20px_rgba(210,31,60,0.3)] hover:shadow-[0_0_30px_rgba(210,31,60,0.5)] inline-block"
              >
                Leave a Google Review
              </Link>
            </div>
          </div>
        </div>
        
        <div className="curved-divider hero-services-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hero-reviews-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4"></stop>
                <stop offset="100%" stopColor="#000000" stopOpacity="1"></stop>
              </linearGradient>
            </defs>
            <path fill="url(#hero-reviews-gradient)" d="M0,128 C480,0 960,160 1440,80 L1440,160 L0,160 Z"></path>
          </svg>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-16 md:py-24 bg-[#0A0A0A]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">Google Reviews</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">What Our Customers Say</h2>
          </div>
          <GoogleReviews />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28 bg-[#111] border-t border-white/5 relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">Get Started</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">Ready for Your Own Transformation?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Experience the same exceptional results our customers rave about. Book your detailing service today!
          </p>
          <Link 
            href="/book" 
            className="bg-primary text-white px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-primary-dark transition-all shadow-[0_0_20px_rgba(210,31,60,0.3)] hover:shadow-[0_0_30px_rgba(210,31,60,0.5)] transform hover:-translate-y-0.5 inline-block"
          >
            Book Now
          </Link>
        </div>
        <div className="absolute left-1/4 top-1/3 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute right-1/4 bottom-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
      </section>
    </div>
  );
}