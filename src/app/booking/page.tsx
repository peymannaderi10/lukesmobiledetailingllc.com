"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

// Define types for form data
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleColor: string;
  servicePackage: string;
  serviceDate: string;
  serviceTime: string;
  specialInstructions: string;
};

// Define service packages
const packages = [
  {
    id: "basic",
    name: "Basic Package",
    price: "$99+",
    description: "Exterior wash & interior vacuum",
    duration: "1-2 hours"
  },
  {
    id: "premium",
    name: "Premium Package",
    price: "$179+",
    description: "Comprehensive interior & exterior cleaning",
    duration: "3-4 hours"
  },
  {
    id: "ultimate",
    name: "Ultimate Package",
    price: "$299+",
    description: "Complete detailing with paint correction",
    duration: "5-8 hours"
  }
];

// Generate time slots
const generateTimeSlots = () => {
  const slots = [];
  for (let i = 8; i <= 16; i++) {
    slots.push(`${i}:00`);
    if (i < 16) {
      slots.push(`${i}:30`);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedPackage = searchParams.get("package") || "";
  
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(preselectedPackage);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState("");

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>();

  // Set the package if it was passed in the URL
  useState(() => {
    if (preselectedPackage) {
      setValue("servicePackage", preselectedPackage);
    }
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    setValue("servicePackage", packageId);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setValue("serviceDate", date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setValue("serviceTime", time);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Here you would integrate with Stripe to handle the $15 booking fee
      // This is a placeholder for the actual API call
      console.log('Form data submitted:', data);
      
      // Simulate API processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a random booking reference
      const reference = 'BK-' + Math.floor(100000 + Math.random() * 900000);
      setBookingReference(reference);
      
      // Reset form and show success message
      reset();
      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Progress steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex flex-col items-center ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
              1
            </div>
            <span className="mt-2 text-sm font-medium">Package</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
          <div className={`flex flex-col items-center ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
              2
            </div>
            <span className="mt-2 text-sm font-medium">Date & Time</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-primary' : 'bg-gray-300'}`}></div>
          <div className={`flex flex-col items-center ${step >= 3 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
              3
            </div>
            <span className="mt-2 text-sm font-medium">Details</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 4 ? 'bg-primary' : 'bg-gray-300'}`}></div>
          <div className={`flex flex-col items-center ${step >= 4 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 4 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
              4
            </div>
            <span className="mt-2 text-sm font-medium">Payment</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Package Selection */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-6">Select Your Detailing Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPackage === pkg.id
                      ? 'border-primary bg-red-50'
                      : 'border-gray-200 hover:border-primary'
                  }`}
                  onClick={() => handlePackageSelect(pkg.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{pkg.name}</h3>
                    {selectedPackage === pkg.id && (
                      <CheckCircleIcon className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <p className="text-2xl font-bold text-primary mb-2">{pkg.price}</p>
                  <p className="text-gray-600 mb-2">{pkg.description}</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Duration:</span> {pkg.duration}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="btn-primary"
                onClick={() => setStep(2)}
                disabled={!selectedPackage}
              >
                Continue to Date & Time
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date and Time Selection */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-6">Select Date & Time</h2>
            
            <div className="mb-6">
              <label className="block mb-2 font-medium">Select Date</label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-md"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => handleDateSelect(e.target.value)}
                required
              />
            </div>
            
            {selectedDate && (
              <div className="mb-6">
                <label className="block mb-2 font-medium">Select Time</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={`p-2 border rounded-md ${
                        selectedTime === time
                          ? 'bg-primary text-white border-primary'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-between mt-8">
              <button
                type="button"
                className="btn-outline"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
              >
                Continue to Details
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Customer & Vehicle Details */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-6">Your Details</h2>
            
            <div className="mb-6">
              <h3 className="font-medium mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">First Name*</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && <span className="text-red-500 text-xs">Required</span>}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Last Name*</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && <span className="text-red-500 text-xs">Required</span>}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Email*</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                  />
                  {errors.email && <span className="text-red-500 text-xs">Valid email required</span>}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Phone*</label>
                  <input
                    type="tel"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register("phone", { required: true })}
                  />
                  {errors.phone && <span className="text-red-500 text-xs">Required</span>}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-4">Service Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block mb-1 text-sm font-medium">Address*</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register("address", { required: true })}
                  />
                  {errors.address && <span className="text-red-500 text-xs">Required</span>}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">City*</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register("city", { required: true })}
                  />
                  {errors.city && <span className="text-red-500 text-xs">Required</span>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium">State*</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      {...register("state", { required: true })}
                    />
                    {errors.state && <span className="text-red-500 text-xs">Required</span>}
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">ZIP*</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      {...register("zip", { required: true })}
                    />
                    {errors.zip && <span className="text-red-500 text-xs">Required</span>}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-4">Vehicle Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Year*</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register("vehicleYear", { required: true })}
                  />
                  {errors.vehicleYear && <span className="text-red-500 text-xs">Required</span>}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Make*</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register("vehicleMake", { required: true })}
                  />
                  {errors.vehicleMake && <span className="text-red-500 text-xs">Required</span>}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Model*</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register("vehicleModel", { required: true })}
                  />
                  {errors.vehicleModel && <span className="text-red-500 text-xs">Required</span>}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Color*</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register("vehicleColor", { required: true })}
                  />
                  {errors.vehicleColor && <span className="text-red-500 text-xs">Required</span>}
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block mb-1 text-sm font-medium">Special Instructions (Optional)</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={3}
                {...register("specialInstructions")}
                placeholder="Any specific concerns or areas that need special attention?"
              ></textarea>
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                type="button"
                className="btn-outline"
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => setStep(4)}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Payment */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold mb-6">Review & Complete Booking</h2>
            
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h3 className="font-medium mb-4">Booking Summary</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-medium">
                    {packages.find(pkg => pkg.id === selectedPackage)?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">
                    {selectedDate ? formatDate(selectedDate) : ""} at {selectedTime}
                  </p>
                </div>
              </div>
              
              <hr className="my-4" />
              
              <div className="flex justify-between items-center mb-2">
                <span>Booking Fee</span>
                <span className="font-medium">$15.00</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                This fee will be deducted from your final service price.
              </p>
              
              <div className="bg-primary/10 p-3 rounded-md mb-4">
                <p className="text-sm">
                  <strong>Note:</strong> This is a booking fee only. The final price will be determined
                  based on your vehicle's size and condition. The technician will confirm the final price
                  before beginning service.
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-4">Payment Information</h3>
              
              {/* In a real implementation, integrate with Stripe or another payment processor */}
              <div className="border p-4 rounded-md">
                <p className="mb-4">The actual payment form would be integrated here.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Card Number</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="1234 5678 9012 3456"
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium">Expiration</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="MM/YY"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium">CVC</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="123"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                type="button"
                className="btn-outline"
                onClick={() => setStep(3)}
              >
                Back
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Pay $15 & Complete Booking'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-secondary mb-4">Book Your Detailing Service</h1>
          <p className="text-lg text-gray-600">
            Select your preferred package, date, and time - and we'll bring our professional detailing services to you!
          </p>
        </div>
        
        <Suspense fallback={<div className="text-center p-12">Loading booking form...</div>}>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  );
} 