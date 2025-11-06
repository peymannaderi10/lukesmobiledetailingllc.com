"use client";

import { useEffect, useState } from "react";

export default function SocialSidebar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show sidebar after a short delay for animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden md:block transition-all duration-500 ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="w-px h-32 bg-primary/30 mb-4"></div>
        <ul className="flex flex-col items-center gap-6">
          <li>
            <a
              href="https://www.facebook.com/lukemobiledetailing/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 text-primary hover:text-primary-dark transition-colors duration-300 hover:-translate-y-1 transform"
              aria-label="Facebook"
            >
              <svg
                className="w-7 h-7"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/lukesmobiledetailingllc/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 text-primary hover:text-primary-dark transition-colors duration-300 hover:-translate-y-1 transform"
              aria-label="Instagram"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://tiktok.com/@lukesmobiledetailing"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 text-primary hover:text-primary-dark transition-colors duration-300 hover:-translate-y-1 transform"
              aria-label="TikTok"
            >
              <svg
                className="w-7 h-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>
          </li>
        </ul>
        <div className="w-px h-32 bg-primary/30 mt-4"></div>
      </div>
    </div>
  );
}

