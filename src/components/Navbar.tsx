"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import RotatingText, { type RotatingTextRef } from "./RotatingText";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];

// Service areas for the dynamic text animation - formatted with "!"
const locations = [
  "YOU!",
  "Yuba City!",
  "Marysville!",
  "Live Oak!",
  "Olivehurst!",
  "Linda!",
  "Gridley!",
  "Sutter!",
  "Plumas Lake!",
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rotatingTextRef = useRef<RotatingTextRef>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle custom rotation intervals - longer for "YOU" (5 seconds), shorter for others (3 seconds)
  const handleNext = useCallback((index: number) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Determine duration based on next index
    const nextIndex = (index + 1) % locations.length;
    const duration = nextIndex === 0 ? 5000 : 3000;

    // Set timeout to advance to next location
    timeoutRef.current = setTimeout(() => {
      if (rotatingTextRef.current) {
        rotatingTextRef.current.next();
      }
    }, duration);
  }, []);

  // Start the rotation cycle
  useEffect(() => {
    // Initial delay for "YOU" (longer)
    timeoutRef.current = setTimeout(() => {
      if (rotatingTextRef.current) {
        rotatingTextRef.current.next();
      }
    }, 5000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <Link href="/" className="navbar-brand">
            <span className="inline-block">
              WE COME TO{" "}
              <RotatingText
                ref={rotatingTextRef}
                texts={locations}
                onNext={handleNext}
                auto={false}
                mainClassName=""
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </span>
          </Link>

          <div className="navbar-links">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="navbar-link"
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://app.squareup.com/appointments/buyer/widget/hs7hvrxqk38fag/L51SWV5N7VVBD"
              className="btn-primary btn-nav-book"
            >
              Book Now
            </a>
          </div>

          <div
            className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="navbar-link-mobile"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://app.squareup.com/appointments/buyer/widget/hs7hvrxqk38fag/L51SWV5N7VVBD"
              className="btn-primary btn-nav-book"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </a>
          </div>
        </div>
      </nav>

    </>
  );
} 