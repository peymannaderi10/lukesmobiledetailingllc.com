"use client";

import Link from "next/link";
import Image from "next/image";
import SimpleBeforeAfterSlider from "@/components/SimpleBeforeAfterSlider";

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
  return (
    <div className="bg-black text-gray-100">
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
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">Our Work</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-4 text-white tracking-tight">
              Our Detailing Gallery
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              See the stunning transformations we deliver. Your car deserves this level of perfection.
            </p>
          </div>
        </div>
        
        <div className="curved-divider hero-services-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hero-gallery-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4"></stop>
                <stop offset="100%" stopColor="#000000" stopOpacity="1"></stop>
              </linearGradient>
            </defs>
            <path fill="url(#hero-gallery-gradient)" d="M0,128 C480,0 960,160 1440,80 L1440,160 L0,160 Z"></path>
          </svg>
        </div>
      </section>

      {/* Before & After Comparisons */}
      <section className="py-16 md:py-24 bg-[#0A0A0A]">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">Transformations</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white tracking-tight">Before & After</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              See the dramatic difference our detailing services can make with these before and after comparisons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisonData.map((comparison) => (
              <div key={comparison.id} className="rounded-sm overflow-hidden">
                <SimpleBeforeAfterSlider
                  beforeImage={comparison.beforeImage}
                  afterImage={comparison.afterImage}
                  beforeAlt={comparison.beforeAlt}
                  afterAlt={comparison.afterAlt}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28 bg-[#111] border-t border-white/5 relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">Get Started</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">Ready to Transform Your Vehicle?</h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Book your mobile detailing service today and experience the same amazing results.
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