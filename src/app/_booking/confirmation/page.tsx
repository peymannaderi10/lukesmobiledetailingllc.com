'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircleIcon, CalendarIcon, TruckIcon, UserIcon } from '@heroicons/react/24/outline';
import type { Stripe } from 'stripe';

interface BookingData {
  date: string;
  time: string;
  package: string;
  packagePrice: number;
  additionalServices?: Array<{name: string, price: number}>;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleType: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleColor: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  notes?: string;
  paymentType?: 'full' | 'deposit';
  amountPaid?: number;
  remainingBalance?: number;
}

// Define a type for the payment intent details
interface PaymentIntentDetails {
  id: string;
  status: string;
  amount: number;
  created: number;
  // Add more fields as needed
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<PaymentIntentDetails | null>(null);

  useEffect(() => {
    const bookingParam = searchParams.get('booking');
    const payment_intent_id = searchParams.get('payment_intent_id');
    
    if (!bookingParam) {
      setError('No booking information found.');
      setIsLoading(false);
      return;
    }
    
    if (!payment_intent_id) {
      setError('No payment information found.');
      setIsLoading(false);
      return;
    }
    
    try {
      const parsedBookingData = JSON.parse(decodeURIComponent(bookingParam)) as BookingData;
      setBookingData(parsedBookingData);
      setPaymentIntentId(payment_intent_id);

      // Since we're not calling the API, we can directly use the payment information
      // from the URL parameters and the booking data
      setIsLoading(false);
    } catch (error) {
      console.error('Error parsing booking data:', error);
      setError('There was an error retrieving your booking information.');
      setIsLoading(false);
    }
  }, [searchParams]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Calculate total with an optional bookingData parameter
  const calculateTotal = (data?: BookingData | null) => {
    const dataToUse = data || bookingData;
    if (!dataToUse) return 0;
    
    let total = dataToUse.packagePrice || 0;
    if (dataToUse.additionalServices) {
      dataToUse.additionalServices.forEach(service => {
        total += service.price;
      });
    }
    return total;
  };
  
  // Generate a confirmation number
  const confirmationNumber = paymentIntentId ? 
    `LMD-${paymentIntentId.slice(-6).toUpperCase()}` : 
    `LMD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  if (isLoading) {
    return (
      <div className="py-12 md:py-20 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-700">Processing your booking confirmation...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 md:py-20 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <Link href="/booking" className="btn-primary">
              Return to Booking
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="py-12 md:py-20 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No booking information found</h2>
            <p className="text-gray-700 mb-6">We couldn't find your booking information. Please try again.</p>
            <Link href="/booking" className="btn-primary">
              Return to Booking
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Confirmation Header */}
          <div className="text-center mb-8">
            <div className="bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-lg text-gray-600">
              Thank you for choosing Luke's Mobile Detailing. Your booking has been confirmed.
            </p>
          </div>

          {/* Confirmation Details Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="bg-primary text-white p-6">
              <h2 className="text-xl font-bold">Booking Confirmation</h2>
              <p className="text-white opacity-90">Confirmation #: {confirmationNumber}</p>
            </div>
            
            <div className="p-6">
              {/* Service Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                  Service Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Service Date</p>
                    <p className="font-medium">{formatDate(bookingData.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Service Time</p>
                    <p className="font-medium">{bookingData.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Package</p>
                    <p className="font-medium">{bookingData.package}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{bookingData.address}</p>
                    <p className="font-medium">{bookingData.city}, {bookingData.state} {bookingData.zipCode}</p>
                  </div>
                </div>
              </div>
              
              {/* Vehicle Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <TruckIcon className="h-5 w-5 mr-2 text-primary" />
                  Vehicle Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Vehicle Type</p>
                    <p className="font-medium">{bookingData.vehicleType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Make & Model</p>
                    <p className="font-medium">{bookingData.vehicleYear} {bookingData.vehicleMake} {bookingData.vehicleModel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Color</p>
                    <p className="font-medium">{bookingData.vehicleColor}</p>
                  </div>
                </div>
              </div>
              
              {/* Customer Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <UserIcon className="h-5 w-5 mr-2 text-primary" />
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{bookingData.firstName} {bookingData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{bookingData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{bookingData.phone}</p>
                  </div>
                </div>
              </div>
              
              {/* Payment Summary */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-3">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{bookingData.package} Package</span>
                    <span>{formatCurrency(bookingData.packagePrice)}</span>
                  </div>
                  
                  {bookingData.additionalServices && bookingData.additionalServices.length > 0 && (
                    <>
                      {bookingData.additionalServices.map((service, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-600">{service.name}</span>
                          <span>{formatCurrency(service.price)}</span>
                        </div>
                      ))}
                    </>
                  )}
                  
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Total Service Cost</span>
                    <span>{formatCurrency(calculateTotal())}</span>
                  </div>

                  {bookingData.paymentType === 'deposit' && bookingData.amountPaid && (
                    <>
                      <div className="flex justify-between text-primary pt-2">
                        <span>Amount Paid (10% Deposit)</span>
                        <span>{formatCurrency(bookingData.amountPaid)}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t">
                        <span>Remaining Balance (Due on Service Day)</span>
                        <span>{formatCurrency(bookingData.remainingBalance || 0)}</span>
                      </div>
                    </>
                  )}

                  {bookingData.paymentType === 'full' && (
                    <div className="mt-2 bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded text-sm">
                      Payment has been made in full. No additional payment required.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Notes and Next Steps */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-3">Preparing for Your Service</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>We'll arrive at your location during the scheduled time window.</li>
              <li>Please ensure your vehicle is accessible and that there is access to water if needed.</li>
              <li>Remove any valuable or personal items from your vehicle before the service.</li>
              {bookingData.paymentType === 'deposit' && (
                <li className="font-medium">Please have your remaining balance of {formatCurrency(bookingData.remainingBalance || 0)} ready for payment on the service day.</li>
              )}
              <li>A confirmation email has been sent to {bookingData.email} with these details.</li>
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary text-center">
              Return to Home
            </Link>
            <Link href="/contact" className="btn-secondary text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading booking confirmation...</p>
        </div>
      </div>
    </div>}>
      <ConfirmationContent />
    </Suspense>
  );
} 