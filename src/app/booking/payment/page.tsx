'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Link from 'next/link';
import PaymentForm from '@/components/PaymentForm';

// Payment types
type PaymentType = 'full' | 'deposit';

// Booking data interface
interface BookingData {
  date: string;
  time: string;
  package: string;
  packagePrice: number;
  additionalServices: Array<{name: string, price: number}>;
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
  paymentType?: PaymentType;
}

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState<PaymentType>('full');
  const [amountToPay, setAmountToPay] = useState(0);

  useEffect(() => {
    // Get booking data from URL
    const bookingParam = searchParams.get('booking');
    
    if (!bookingParam) {
      router.push('/booking/customer-info');
      return;
    }

    try {
      // Parse the booking data
      const parsedBookingData = JSON.parse(decodeURIComponent(bookingParam)) as BookingData;
      setBookingData(parsedBookingData);

      // Calculate total amount
      let total = parsedBookingData.packagePrice || 0;
      if (parsedBookingData.additionalServices) {
        parsedBookingData.additionalServices.forEach(service => {
          total += service.price;
        });
      }
      setTotalAmount(total);
      setAmountToPay(total); // Default to full payment
    } catch (error) {
      console.error('Error parsing booking data:', error);
      router.push('/booking/customer-info');
    }
  }, [searchParams, router]);

  // Update amount to pay when payment type changes
  useEffect(() => {
    if (totalAmount === 0) return;
    
    // Calculate the amount to pay based on payment type
    const newAmountToPay = calculateAmountToPay(paymentType, totalAmount);
    setAmountToPay(newAmountToPay);
    
    // Create or update payment intent if we have booking data
    if (bookingData) {
      createPaymentIntent();
    }
  }, [paymentType, totalAmount]);
  
  // Calculate amount to pay based on payment type and total
  const calculateAmountToPay = (type: PaymentType, total: number): number => {
    let amount = 0;
    if (type === 'full') {
      amount = total;
    } else {
      // 10% deposit, rounded to 2 decimal places
      amount = parseFloat((total * 0.1).toFixed(2));
    }
    console.log(`Payment calculation: type=${type}, total=${total}, amount to pay=${amount}`);
    return amount;
  };

  // Handle payment type change
  const handlePaymentTypeChange = (type: PaymentType) => {
    // First set the payment type
    setPaymentType(type);
    
    // For immediate UI feedback, also update amount to pay directly
    const newAmount = calculateAmountToPay(type, totalAmount);
    setAmountToPay(newAmount);
    
    // Then create a new payment intent with the updated amount
    // (this will be called again by the effect, but we want immediate feedback)
    if (bookingData) {
      setTimeout(() => createPaymentIntent(), 0);
    }
  };

  // Create a payment intent
  const createPaymentIntent = async () => {
    if (!bookingData) return;
    
    setIsLoading(true);
    try {
      const updatedBookingData = {
        ...bookingData,
        paymentType: paymentType
      };
      
      // Convert to cents for Stripe and ensure we're using the correct amount
      const amountInCents = Math.round(amountToPay * 100);
      
      console.log(`Creating payment intent: paymentType=${paymentType}, amountToPay=${amountToPay}, amountInCents=${amountInCents}`);
      
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingData: updatedBookingData,
          amount: amountToPay, // Use the calculated amount based on payment type
          amountInCents: amountInCents, // Add explicit amount in cents for Stripe
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent');
      }

      setClientSecret(data.clientSecret);
      setIsLoading(false);
      
    } catch (err: unknown) {
      console.error('Error creating payment intent:', err);
      const errorMessage = err instanceof Error ? err.message : 'There was an error processing your payment. Please try again.';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  // Format date for display
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

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Handle successful payment
  const handlePaymentSuccess = async (paymentIntentId: string) => {
    if (!bookingData) return;
    
    try {
      // Make sure we've got the current amount to pay
      const currentAmountToPay = calculateAmountToPay(paymentType, totalAmount);
      
      // Save booking to database with payment type
      const updatedBookingData = {
        ...bookingData,
        paymentType: paymentType,
        amountPaid: currentAmountToPay,
        remainingBalance: paymentType === 'deposit' ? totalAmount - currentAmountToPay : 0
      };
      
      console.log(`Payment success: paymentType=${paymentType}, amountPaid=${currentAmountToPay}, remainingBalance=${paymentType === 'deposit' ? totalAmount - currentAmountToPay : 0}`);
      
      const response = await fetch('/api/save-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingData: updatedBookingData,
          paymentIntentId,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save booking');
      }
      
      // Navigate to confirmation page
      router.push(`/booking/confirmation?booking=${encodeURIComponent(JSON.stringify(updatedBookingData))}&payment_intent_id=${paymentIntentId}`);
      
    } catch (err) {
      console.error('Error saving booking:', err);
      setError('Payment was successful, but there was an error saving your booking. Please contact us.');
    }
  };

  if (isLoading && !error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="ml-3 text-gray-700">Preparing payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Error</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <Link 
              href="/booking/customer-info" 
              className="btn-primary"
            >
              Try Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!bookingData || !clientSecret) {
    return (
      <div className="py-20 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading payment information...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Complete Your Payment</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Please provide your payment information to confirm your detailing service
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 mb-8 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Service Package</p>
                    <p className="font-medium text-black">{bookingData.package}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium text-black">{formatDate(bookingData.date)} at {bookingData.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Vehicle</p>
                    <p className="font-medium text-black">{bookingData.vehicleYear} {bookingData.vehicleMake} {bookingData.vehicleModel}</p>
                  </div>
                
                  {/* Pricing Summary */}
                  <div className="mt-6 border-t pt-4">
                    <h3 className="font-semibold mb-2">Price Details</h3>
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
                        <span>{formatCurrency(totalAmount)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Form */}
            <div className="lg:col-span-2">
              {/* Payment Option Selection - Smaller Version */}
              <div className="bg-white rounded-xl shadow-md p-4 mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Choose Payment Option</h2>
                <div className="space-y-2">
                  <div className="flex gap-3">
                    <div 
                      className={`flex-1 p-3 border rounded-lg cursor-pointer transition-all ${paymentType === 'full' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-primary'}`}
                      onClick={() => handlePaymentTypeChange('full')}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${paymentType === 'full' ? 'border-primary' : 'border-gray-400'}`}>
                          {paymentType === 'full' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                        </div>
                        <div>
                          <span className="font-semibold text-sm text-black">Pay in Full</span>
                          <p className="text-xs text-gray-600">{formatCurrency(totalAmount)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`flex-1 p-3 border rounded-lg cursor-pointer transition-all ${paymentType === 'deposit' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-primary'}`}
                      onClick={() => handlePaymentTypeChange('deposit')}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 mr-2 flex items-center justify-center ${paymentType === 'deposit' ? 'border-primary' : 'border-gray-400'}`}>
                          {paymentType === 'deposit' && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                        </div>
                        <div>
                          <span className="font-semibold text-sm text-black">10% Deposit</span>
                          <p className="text-xs text-gray-600">{formatCurrency(totalAmount * 0.1)} now</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-blue-800 bg-blue-50 border border-blue-200 rounded-lg p-2">
                    {paymentType === 'full' 
                      ? 'Full payment now. No additional payment on service day.'
                      : '10% deposit now. Remaining balance collected on service day.'}
                  </div>
                </div>
              </div>

              {/* Credit Card Form */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">Amount to pay now: <span className="text-xl font-semibold text-primary">{formatCurrency(amountToPay)}</span></p>
                  {paymentType === 'deposit' && (
                    <p className="text-sm text-gray-600">Remaining balance due on service day: {formatCurrency(totalAmount - amountToPay)}</p>
                  )}
                </div>
                <Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
                  <PaymentForm 
                    clientSecret={clientSecret} 
                    onPaymentSuccess={handlePaymentSuccess}
                    totalAmount={amountToPay}
                  />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p className="mt-4 text-gray-700">Loading payment page...</p>
    </div>}>
      <PaymentContent />
    </Suspense>
  );
} 