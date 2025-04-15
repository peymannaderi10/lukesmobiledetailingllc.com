"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<string>(searchParams.get('package') || 'Basic');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      setError('Please select both a date and time');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Navigate to the customer information page with the selected data
      router.push(`/booking/customer-info?date=${selectedDate}&time=${encodeURIComponent(selectedTime)}&package=${encodeURIComponent(selectedPackage)}`);
    } catch (err) {
      console.error('Error navigating to customer info page:', err);
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Book Your Detailing Service</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select your preferred date, time, and service package to begin booking your mobile detailing appointment.
          </p>
        </div>
        
        {/* Booking Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
              <span>1</span>
            </div>
            <div className="text-primary font-medium mx-2">Select Package</div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center">
              <span>2</span>
            </div>
            <div className="text-gray-500 font-medium mx-2">Customer Info</div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center">
              <span>3</span>
            </div>
            <div className="text-gray-500 font-medium mx-2">Payment</div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Date Selection */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Date</h2>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-black"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              {/* Time and Package Selection */}
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Time</h2>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-black"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                  >
                    <option value="">Select a time</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                  </select>
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Package</h2>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-black"
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    required
                  >
                    <option value="Basic">Basic Package - $99</option>
                    <option value="Premium">Premium Package - $179</option>
                    <option value="Ultimate">Ultimate Package - $299</option>
                  </select>
                  <p className="mt-4 text-sm text-gray-600">
                    You can add additional services in the next step.
                  </p>
                </div>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-800 p-4 rounded-md">
                {error}
              </div>
            )}
            
            <div className="flex justify-end">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isLoading || !selectedDate || !selectedTime}
              >
                {isLoading ? 'Processing...' : 'Continue to Customer Info'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading booking page...</p>
        </div>
      </div>
    </div>}>
      <BookingContent />
    </Suspense>
  );
} 