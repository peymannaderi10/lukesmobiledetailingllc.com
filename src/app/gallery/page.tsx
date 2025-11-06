"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

// Define the comparison data structure
const comparisonData = [
  {
    id: "comparison7",
    beforeImage: "/Images/beforeAndAfter/before7.jpg",
    afterImage: "/Images/beforeAndAfter/after7.jpg",
    beforeAlt: "New Before Detailing",
    afterAlt: "New After Detailing"
  },
  {
    id: "comparison1",
    beforeImage: "/Images/beforeAndAfter/hondaBefore.jpg",
    afterImage: "/Images/beforeAndAfter/hondaAfter.jpg",
    beforeAlt: "Honda Before Detailing",
    afterAlt: "Honda After Detailing"
  },
  {
    id: "comparison2",
    beforeImage: "/Images/beforeAndAfter/passengerBefore.jpg",
    afterImage: "/Images/beforeAndAfter/passengerAfter.jpg",
    beforeAlt: "Passenger Seat Before Cleaning",
    afterAlt: "Passenger Seat After Cleaning"
  },
  {
    id: "comparison3",
    beforeImage: "/Images/beforeAndAfter/carpetBefore.jpg",
    afterImage: "/Images/beforeAndAfter/carpetAfter.jpg",
    beforeAlt: "Carpet Before Cleaning",
    afterAlt: "Carpet After Cleaning"
  },
  {
    id: "comparison4",
    beforeImage: "/Images/beforeAndAfter/carseatBefore.jpg",
    afterImage: "/Images/beforeAndAfter/carseatAfter.jpg",
    beforeAlt: "Car Seat Before Cleaning",
    afterAlt: "Car Seat After Cleaning"
  },
  {
    id: "comparison5",
    beforeImage: "/Images/beforeAndAfter/hairBefore.jpg",
    afterImage: "/Images/beforeAndAfter/hairAfter.jpg",
    beforeAlt: "Hair Before Cleaning",
    afterAlt: "Hair After Cleaning"
  },
  {
    id: "comparison6",
    beforeImage: "/Images/beforeAndAfter/fordBefore.jpg",
    afterImage: "/Images/beforeAndAfter/fordAfter.jpg",
    beforeAlt: "Ford Before Detailing",
    afterAlt: "Ford After Detailing"
  }
];

export default function GalleryPage() {
  // Initialize state for all comparisons
  const [activeImages, setActiveImages] = useState(
    Object.fromEntries(comparisonData.map(comp => [comp.id, "before"]))
  );

  // Function to handle image toggle
  const handleImageToggle = (comparisonId: string, view: string) => {
    setActiveImages(prev => ({
      ...prev,
      [comparisonId]: view
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="relative text-white min-h-[585px] md:min-h-[715px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Images/webPhotos/galleryBanner.jpg"
            alt="Gallery Banner"
            fill
            className="object-cover"
            priority
            style={{ objectPosition: "center 55%" }}
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
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Our Detailing Gallery
            </h1>
            <p className="text-base md:text-lg text-white">
              See the stunning transformations we deliver. Your car deserves this level of perfection.
            </p>
          </div>
        </div>
        
        {/* Curved Divider */}
        <div className="curved-divider hero-services-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hero-gallery-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4"></stop>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1"></stop>
              </linearGradient>
            </defs>
            <path fill="url(#hero-gallery-gradient)" d="M0,128 C480,0 960,160 1440,80 L1440,160 L0,160 Z"></path>
          </svg>
        </div>
      </section>

      {/* Before & After Comparisons */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-black">Before & After</h2>
            <p className="text-base sm:text-lg text-black max-w-3xl mx-auto">
              See the dramatic difference our detailing services can make with these before and after comparisons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisonData.map((comparison) => (
              <div key={comparison.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  {/* Toggle buttons */}
                  <div className="absolute top-4 left-4 z-10 flex bg-white rounded-lg shadow overflow-hidden">
                    <button 
                      className={`px-4 py-2 text-sm font-medium ${activeImages[comparison.id] === 'before' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                      onClick={() => handleImageToggle(comparison.id, 'before')}
                    >
                      Before
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm font-medium ${activeImages[comparison.id] === 'after' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                      onClick={() => handleImageToggle(comparison.id, 'after')}
                    >
                      After
                    </button>
                  </div>
                  
                  {/* Images */}
                  <div className="relative pt-[125%]">
                    <div className={`absolute inset-0 transition-opacity duration-300 ${activeImages[comparison.id] === 'before' ? 'opacity-100' : 'opacity-0'}`}>
                      <Image
                        src={comparison.beforeImage}
                        alt={comparison.beforeAlt}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <div className={`absolute inset-0 transition-opacity duration-300 ${activeImages[comparison.id] === 'after' ? 'opacity-100' : 'opacity-0'}`}>
                      <Image
                        src={comparison.afterImage}
                        alt={comparison.afterAlt}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ready to Transform Your Vehicle?</h2>
          <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Book your mobile detailing service today and experience the same amazing results.
          </p>
          <Link href="https://app.squareup.com/appointments/buyer/widget/hs7hvrxqk38fag/L51SWV5N7VVBD" className="btn bg-white text-primary hover:bg-gray-100 font-bold px-6 sm:px-8 py-3 shadow-lg">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}