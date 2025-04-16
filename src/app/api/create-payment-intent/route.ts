import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-03-31.basil'
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingData, payment_method_type = 'card' } = body;

    // Validate the booking data
    if (!bookingData) {
      return NextResponse.json(
        { error: 'Missing booking data' }, 
        { status: 400 }
      );
    }

    // Calculate amount in cents (from package price and additional services)
    let totalAmount = bookingData.packagePrice || 0;
    if (bookingData.additionalServices && bookingData.additionalServices.length > 0) {
      bookingData.additionalServices.forEach((service: {name: string, price: number}) => {
        totalAmount += service.price;
      });
    }

    // Apply payment type logic (full payment or deposit)
    const paymentAmount = bookingData.paymentType === 'deposit' 
      ? Math.round(totalAmount * 0.1 * 100) // 10% deposit in cents
      : Math.round(totalAmount * 100); // Full amount in cents

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentAmount,
      currency: 'usd',
      payment_method_types: [payment_method_type],
      metadata: {
        bookingType: 'car-detailing',
        package: bookingData.package,
        date: bookingData.date,
        time: bookingData.time,
        customerEmail: bookingData.email,
        customerName: `${bookingData.firstName} ${bookingData.lastName}`,
        customerPhone: bookingData.phone,
        vehicle: `${bookingData.vehicleYear} ${bookingData.vehicleMake} ${bookingData.vehicleModel}`,
        paymentType: bookingData.paymentType || 'full',
      },
      receipt_email: bookingData.email,
    });

    // Return the client secret
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
} 