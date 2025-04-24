"use client";

import { useState, Suspense, useEffect, ReactNode, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<string>('Basic');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [packageDetails, setPackageDetails] = useState<ReactNode | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  
  // Package details mapping
  const packageInfo: Record<string, { 
    price: string, 
    priceValue: number, 
    duration: number, // Duration in hours
    description: ReactNode 
  }> = {
    'Signature': {
      price: '$255',
      priceValue: 255,
      duration: 4, // 4 hours
      description: (
        <div className="mt-4 space-y-2 text-sm">
          <p className="font-semibold">The Signature (interior and exterior) detail includes:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-primary mb-2">Interior:</p>
              <ul className="list-disc pl-5 space-y-1 text-black">
                <li>Full interior deep vacuum</li>
                <li>Wipe down of all surfaces</li>
                <li>Steam cleaning of cracks & crevices vinyl</li>
                <li>Inside screens & windows</li>
                <li>Application of P&S interior UV protectant</li>
                <li>Final touch-ups & vacuum</li>
                <li>Air freshener</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-primary mb-2">Exterior:</p>
              <ul className="list-disc pl-5 space-y-1 text-black">
                <li>Full vehicle pre-rinse</li>
                <li>Foam wash</li>
                <li>Wheels & wheel wells</li>
                <li>Tires</li>
                <li>Paint decontamination</li>
                <li>Full dry down & light polish</li>
                <li>Windows</li>
                <li>Tire shine</li>
                <li>3-5 month sealant</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-500 mt-2">Duration: approximately 4 hours</p>
        </div>
      )
    },
    'Full-Interior': {
      price: '$195',
      priceValue: 195,
      duration: 2, // 2 hours
      description: (
        <div className="mt-4 space-y-2 text-sm">
          <p className="font-semibold">The Full (Interior) detail includes:</p>
          <ul className="list-disc pl-5 space-y-1 text-black">
            <li>Full interior deep vacuum</li>
            <li>Wipe down of all surfaces</li>
            <li>Steam cleaning of cup holders, vinyl, air vents & floor mats</li>
            <li>Inside screens & windows</li>
            <li>Application of P&S interior UV protectant</li>
            <li>Final touch-ups & double vacuum</li>
            <li>Air freshener & business card</li>
          </ul>
          <p className="text-gray-500 mt-2">Duration: approximately 2 hours</p>
        </div>
      )
    },
    'Full-Exterior': {
      price: '$130',
      priceValue: 130,
      duration: 2, // 2 hours
      description: (
        <div className="mt-4 space-y-2 text-sm">
          <p className="font-semibold">The Full (Exterior) detail includes:</p>
          <ul className="list-disc pl-5 space-y-1 text-black">
            <li>Rinse of entire car/truck</li>
            <li>Foam wash</li>
            <li>Wheels & tires</li>
            <li>Bug/road debris removed</li>
            <li>Paint decontamination</li>
            <li>Drying of entire vehicle</li>
            <li>Windows cleaned</li>
            <li>Steam cleaning of wheel wells & rims</li>
            <li>6-8 month sealant</li>
          </ul>
          <p className="text-gray-500 mt-2">Duration: approximately 2 hours</p>
        </div>
      )
    },
    'Basic': {
      price: '$185',
      priceValue: 185,
      duration: 2, // 2 hours
      description: (
        <div className="mt-4 space-y-2 text-sm">
          <p className="font-semibold">The Basic (interior and exterior) detail includes:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-primary mb-2">Interior:</p>
              <ul className="list-disc pl-5 space-y-1 text-black">
                <li>Full interior vacuum</li>
                <li>Wipe down of all surfaces</li>
                <li>Inside screens & windows</li>
                <li>Air freshener</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-primary mb-2">Exterior:</p>
              <ul className="list-disc pl-5 space-y-1 text-black">
                <li>Foam wash</li>
                <li>Wheels cleaned</li>
                <li>Tires</li>
                <li>Full dry down</li>
                <li>Windows</li>
                <li>Tire shine</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-500 mt-2">Duration: approximately 2 hours</p>
        </div>
      )
    }
  };
  
  // Function to check available times for a given date
  const checkAvailableTimes = useCallback(async (date: string) => {
    setIsCheckingAvailability(true);
    setError(null);
    
    try {
      // Pass the selected package to the API so it can consider service duration
      const packageDuration = packageInfo[selectedPackage]?.duration || 2; // Default to 2 hours if not specified
      const response = await fetch(`/api/bookings/available-times?date=${date}&duration=${packageDuration}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch available times');
      }
      
      if (data.success) {
        setAvailableTimes(data.availableTimes);
        
        // If currently selected time is no longer available, reset it
        if (selectedTime && !data.availableTimes.includes(selectedTime)) {
          setSelectedTime('');
        }
      } else {
        throw new Error(data.error || 'Failed to fetch available times');
      }
    } catch (err) {
      console.error('Error checking available times:', err);
      setError('Unable to check available times. Please try again.');
      // Default to all times if there's an error
      setAvailableTimes([
        "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
        "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
      ]);
    } finally {
      setIsCheckingAvailability(false);
    }
  }, [selectedPackage, selectedTime]);
  
  // Set initial package from URL parameter on component mount
  useEffect(() => {
    const packageParam = searchParams.get('package');
    if (packageParam) {
      // Convert the URL parameter to match the dropdown options
      const packageMap: Record<string, string> = {
        'basic': 'Basic',
        'signature': 'Signature',
        'full-interior': 'Full-Interior',
        'full-exterior': 'Full-Exterior'
      };
      
      // Use the mapped value or default to Basic if not found
      const packageValue = packageMap[packageParam.toLowerCase()] || 'Basic';
      setSelectedPackage(packageValue);
    }
  }, [searchParams]);

  // Update package details when package selection changes
  useEffect(() => {
    setPackageDetails(packageInfo[selectedPackage]?.description || null);
  }, [selectedPackage]);
  
  // Check available times when date changes
  useEffect(() => {
    if (selectedDate) {
      checkAvailableTimes(selectedDate);
    }
  }, [selectedDate, checkAvailableTimes]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      setError('Please select both a date and time');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Include the package price and duration in the URL
      const packagePrice = packageInfo[selectedPackage]?.priceValue || 0;
      const serviceDuration = packageInfo[selectedPackage]?.duration || 2;
      router.push(`/booking/customer-info?date=${selectedDate}&time=${encodeURIComponent(selectedTime)}&package=${encodeURIComponent(selectedPackage)}&packagePrice=${packagePrice}&serviceDuration=${serviceDuration}`);
    } catch (err) {
      console.error('Error navigating to customer info page:', err);
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 md:py-20 bg-gray-50 min-h-screen w-full overflow-x-hidden">
      <div className="container-custom px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Book Your Detailing Service</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Select your preferred date, time, and service package to begin booking your mobile detailing appointment.
          </p>
        </div>
        
        {/* Booking Steps - Mobile Responsive */}
        <div className="flex flex-wrap justify-center mb-8 md:mb-12 gap-2 sm:gap-0">
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
              <span>1</span>
            </div>
            <div className="text-primary font-medium mx-2 text-sm sm:text-base">Select Package</div>
            <div className="hidden sm:block w-8 sm:w-16 h-0.5 bg-gray-300"></div>
          </div>
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center">
              <span>2</span>
            </div>
            <div className="text-gray-500 font-medium mx-2 text-sm sm:text-base">Customer Info</div>
            <div className="hidden sm:block w-8 sm:w-16 h-0.5 bg-gray-300"></div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center">
              <span>3</span>
            </div>
            <div className="text-gray-500 font-medium mx-2 text-sm sm:text-base">Payment</div>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Date and Time Selection */}
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Select Date</h2>
                  <input
                    type="date"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-black"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Select Time</h2>
                  
                  {isCheckingAvailability ? (
                    <div className="flex justify-center items-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="ml-2 text-gray-600">Checking available times...</span>
                    </div>
                  ) : (
                    <>
                      {!selectedDate ? (
                        <p className="text-gray-500 mb-4">Please select a date first</p>
                      ) : availableTimes.length === 0 ? (
                        <p className="text-gray-500 mb-4">No available times for this date. Please select another date.</p>
                      ) : (
                        <select
                          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-black"
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          required
                        >
                          <option value="">Select a time</option>
                          {availableTimes.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      )}
                    </>
                  )}
                </div>
              </div>
              
              {/* Package Selection */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Select Package</h2>
                <select
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-black"
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  required
                >
                  <option value="Signature">The Signature (Interior & Exterior) - $255</option>
                  <option value="Full-Interior">The Full Interior Detail - $195</option>
                  <option value="Full-Exterior">The Full Exterior Detail - $130</option>
                  <option value="Basic">The Basic (Interior & Exterior) - $185</option>
                </select>
                
                {/* Display package details */}
                <div className="overflow-y-auto max-h-[50vh] sm:max-h-[400px] pr-1">
                  {packageDetails}
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
                className="btn-primary px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
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