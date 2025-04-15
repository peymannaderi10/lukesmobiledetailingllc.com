import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe without specifying API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookingData, amount, amountInCents } = body;
    
    if (!bookingData || (!amount && !amountInCents)) {
      return NextResponse.json(
        { error: 'Missing required booking data or amount' },
        { status: 400 }
      );
    }

    // Calculate payment amount - use amountInCents if provided, otherwise calculate from amount
    const paymentAmount = amountInCents || Math.round(amount * 100);
    
    // Log the payment amount for debugging
    console.log(`Creating payment intent for ${bookingData.paymentType} payment. Amount: $${(paymentAmount/100).toFixed(2)}`);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentAmount, // Use the calculated amount
      currency: 'usd',
      metadata: {
        bookingType: 'car-detailing',
        customerName: `${bookingData.firstName} ${bookingData.lastName}`,
        customerEmail: bookingData.email,
        customerPhone: bookingData.phone,
        package: bookingData.package,
        date: bookingData.date,
        time: bookingData.time,
        vehicle: `${bookingData.vehicleYear} ${bookingData.vehicleMake} ${bookingData.vehicleModel}`,
        paymentType: bookingData.paymentType || 'full',
      },
      receipt_email: bookingData.email,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: unknown) {
    console.error('Error creating payment intent:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create payment intent';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 