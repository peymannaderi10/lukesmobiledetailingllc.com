// Payment types
export type PaymentType = 'full' | 'deposit';

// Booking data interface
export interface BookingData {
  date: string;
  time: string;
  package: string;
  packagePrice: number;
  serviceDuration?: number; // Duration in hours
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
  amountPaid?: number;
  remainingBalance?: number;
  paymentIntentId?: string;
  bookingId?: string;
} 