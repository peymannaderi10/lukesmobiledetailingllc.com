"use client";
import Script from "next/script";

export default function BookingPage() {
  return (
    <div className="container-custom py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Book Your Appointment</h1>
      <div id="square-booking-widget" />
      <Script
        id="square-booking-script"
        src="https://app.squareup.com/appointments/buyer/widget/ol8bykxt9qhyl1/L76HQK2G7GC0R"
        strategy="afterInteractive"
      />
    </div>
  );
} 