import { Suspense } from "react";
import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book Your Detail | Luke's Mobile Detailing",
  description:
    "Schedule your mobile detailing appointment online. Choose your service, vehicle type, and preferred time.",
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-black pt-28 md:pt-32 pb-16 text-gray-100">
      <Suspense
        fallback={
          <div className="container mx-auto max-w-4xl text-center py-20">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-500">Loading booking form&hellip;</p>
          </div>
        }
      >
        <BookingForm />
      </Suspense>
    </div>
  );
}
