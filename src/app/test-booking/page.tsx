"use client";

import Script from "next/script";

export default function TestBookingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-secondary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Test Booking Page</h1>
          <p className="text-lg max-w-2xl mx-auto">
            This is a test page for the Square Appointments widget.
          </p>
        </div>
      </div>

      {/* Widget Container */}
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Square Appointments Widget */}
          <Script 
            src="https://app.squareup.com/appointments/buyer/widget/ol8bykxt9qhyl1/L76HQK2G7GC0R.js"
            strategy="afterInteractive"
          />
        </div>
      </div>
    </div>
  );
} 