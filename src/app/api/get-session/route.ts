import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const session_id = searchParams.get('session_id');
    
    if (!session_id) {
      return NextResponse.json(
        { error: 'Missing session_id parameter' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['payment_intent', 'line_items'],
    });

    return NextResponse.json({ success: true, session });
  } catch (error: unknown) {
    console.error('Error retrieving session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to retrieve session';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 