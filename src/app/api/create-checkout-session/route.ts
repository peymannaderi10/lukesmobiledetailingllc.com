import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookingData, amount } = body;
    
    if (!bookingData || !amount) {
      return NextResponse.json(
        { error: 'Missing required booking data or amount' },
        { status: 400 }
      );
    }

    // Line items for the checkout session
    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${bookingData.package} Package`,
            description: `Car detailing service on ${bookingData.date} at ${bookingData.time}`,
            metadata: {
              bookingType: 'car-detailing',
              package: bookingData.package,
            }
          },
          unit_amount: Math.round(bookingData.packagePrice * 100), // Convert to cents
        },
        quantity: 1,
      },
    ];

    // Add additional services as line items
    if (bookingData.additionalServices && bookingData.additionalServices.length > 0) {
      bookingData.additionalServices.forEach((service: {name: string, price: number}) => {
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: service.name,
              description: `Additional service: ${service.name}`,
              metadata: {
                bookingType: 'car-detailing',
                package: bookingData.package,
              }
            },
            unit_amount: Math.round(service.price * 100), // Convert to cents
          },
          quantity: 1,
        });
      });
    }

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}&booking=${encodeURIComponent(JSON.stringify(bookingData))}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/booking/customer-info`,
      customer_email: bookingData.email,
      client_reference_id: new Date().getTime().toString(), // Unique reference ID for the booking
      payment_intent_data: {
        metadata: {
          bookingType: 'car-detailing',
          customerName: `${bookingData.firstName} ${bookingData.lastName}`,
          customerEmail: bookingData.email,
          customerPhone: bookingData.phone,
          package: bookingData.package,
          date: bookingData.date,
          time: bookingData.time,
          vehicle: `${bookingData.vehicleYear} ${bookingData.vehicleMake} ${bookingData.vehicleModel}`,
          address: `${bookingData.address}, ${bookingData.city}, ${bookingData.state} ${bookingData.zipCode}`,
        },
      },
      metadata: {
        bookingData: JSON.stringify({
          name: `${bookingData.firstName} ${bookingData.lastName}`,
          email: bookingData.email,
          phone: bookingData.phone,
          package: bookingData.package,
          date: bookingData.date,
          time: bookingData.time,
          vehicle: `${bookingData.vehicleYear} ${bookingData.vehicleMake} ${bookingData.vehicleModel}`,
          address: `${bookingData.address}, ${bookingData.city}, ${bookingData.state} ${bookingData.zipCode}`,
        }),
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: unknown) {
    console.error('Error creating checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create checkout session';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 