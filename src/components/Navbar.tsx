"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];

// Service areas for the ticker
const serviceAreas = "Yuba City, Marysville, Live Oak, Olivehurst, Linda, Gridley, Sutter, Plumas Lake, and surrounding areas in California.";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-md">
        <nav className="container-custom flex items-center justify-between py-2">
          <div className="flex lg:flex-1">
            <Link href="/" className="flex items-center">
              <span className="text-lg font-extrabold text-black font-['PT_Serif']">
                <span className="text-2xl">LUKE'S</span> <span style={{ color: '#af0f03' }}>MOBILE DETAILING</span>
              </span>
              <Image 
                src="/Images/webPhotos/navbarLogo.png"
                alt="Luke's Mobile Detailing Logo"
                width={512}
                height={512}
                className="w-9 h-9 object-contain"
                priority
              />
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-secondary p-2 -m-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-secondary hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="https://app.squareup.com/appointments/buyer/widget/hs7hvrxqk38fag/L51SWV5N7VVBD" className="btn-primary font-medium text-sm">Book Now</a>  
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="fixed inset-0 bg-black/30" onClick={() => setMobileMenuOpen(false)} />
              <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center">
                    <span className="text-lg font-extrabold text-black font-['PT_Serif']">
                      <span className="text-2xl md:text-3xl">LUKE'S</span> <span style={{ color: '#af0f03' }}>MOBILE DETAILING</span>
                    </span>
                    <Image 
                      src="/Images/webPhotos/navbarLogo.png"
                      alt="Luke's Mobile Detailing Logo"
                      width={36}
                      height={36}
                      className="w-9 h-9 object-contain"
                      priority
                    />
                  </Link>
                  <button
                    type="button"
                    className="text-secondary p-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block py-2 text-base font-medium text-secondary hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <a href="https://app.squareup.com/appointments/buyer/widget/hs7hvrxqk38fag/L51SWV5N7VVBD" className="btn-primary block w-full mt-4 text-center font-medium text-sm" onClick={() => setMobileMenuOpen(false)}>Book Your Appointment</a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
        
        {/* Scrolling News Ticker */}
        <div className="bg-primary text-white py-1 overflow-hidden whitespace-nowrap relative">
          <div className="inline-block animate-ticker">
            <span className="mr-4"> Proudly Serving: {serviceAreas} </span>
            <span className="mr-4"> Proudly Serving: {serviceAreas} </span>
            <span className="mr-4"> Proudly Serving: {serviceAreas} </span>
            <span className="mr-4"> Proudly Serving: {serviceAreas} </span>
          </div>
        </div>
      </header>
      
      <style jsx global>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-ticker {
          animation: ticker 30s linear infinite;
          will-change: transform;
        }
      `}</style>
    </>
  );
} 