'use client';

import { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

interface PaymentFormProps {
  clientSecret: string;
  onPaymentSuccess: (paymentIntentId: string) => void;
  totalAmount: number;
}

export default function PaymentForm({ clientSecret, onPaymentSuccess, totalAmount }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Use clientSecret to ensure the component knows when it's ready
  useEffect(() => {
    if (clientSecret) {
      setIsReady(true);
    }
  }, [clientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Use confirmPayment to complete the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        confirmParams: {
          return_url: `${window.location.origin}/booking/confirmation`,
        },
      });

      if (error) {
        // Show error to your customer
        setErrorMessage(error.message || 'An unexpected error occurred');
        console.error('Payment error:', error);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful
        onPaymentSuccess(paymentIntent.id);
      } else {
        setErrorMessage('Something went wrong with your payment. Please try again.');
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      setErrorMessage('An unexpected error occurred while processing your payment');
    } finally {
      setIsLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-8">
        {isReady ? (
          <PaymentElement />
        ) : (
          <div className="p-4 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading payment form...</p>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {errorMessage}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-gray-700 font-medium">
          Total: <span className="text-lg font-semibold">{formatCurrency(totalAmount)}</span>
        </div>
        <button
          type="submit"
          disabled={isLoading || !stripe || !elements || !isReady}
          className="btn-primary min-w-[150px]"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            'Pay Now'
          )}
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        Your payment is secured with SSL encryption. We never store your credit card information.
      </p>
    </form>
  );
} 