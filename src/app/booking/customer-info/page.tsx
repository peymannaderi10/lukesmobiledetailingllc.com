'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Vehicle types options
const vehicleTypes = [
  'Sedan',
  'SUV',
  'Truck',
  'Van',
  'Coupe',
  'Hatchback',
  'Convertible',
  'Wagon',
  'Other'
];

function CustomerInfoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get package, date, and time from URL parameters
  const packageParam = searchParams.get('package') || 'Basic';
  const dateParam = searchParams.get('date') || '';
  const timeParam = searchParams.get('time') || '';
  const packagePriceParam = searchParams.get('packagePrice');
  const durationParam = searchParams.get('serviceDuration');
  
  // Get price based on package
  const getPackagePrice = (pkg: string) => {
    // First check if we have a price from the URL
    if (packagePriceParam) {
      return parseInt(packagePriceParam, 10);
    }
    
    // Otherwise use our package mapping
    switch(pkg.toLowerCase()) {
      case 'signature': return 255;
      case 'full-interior': return 195;
      case 'full-exterior': return 130;
      case 'basic': return 185;
      default: return 185;
    }
  };

  // State for form
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    vehicleType: 'Sedan',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleColor: '',
    notes: '',
    additionalServices: [] as {name: string, price: number}[],
  });
  
  // State for form validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle additional service selection
  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, dataset } = e.target;
    const serviceName = dataset.name || '';
    const servicePrice = Number(dataset.price || 0);
    
    if (checked) {
      // Add service to the array
      setFormData(prev => ({
        ...prev,
        additionalServices: [...prev.additionalServices, { name: serviceName, price: servicePrice }]
      }));
    } else {
      // Remove service from the array
      setFormData(prev => ({
        ...prev,
        additionalServices: prev.additionalServices.filter(service => service.name !== serviceName)
      }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.vehicleMake.trim()) newErrors.vehicleMake = 'Vehicle make is required';
    if (!formData.vehicleModel.trim()) newErrors.vehicleModel = 'Vehicle model is required';
    if (!formData.vehicleYear.trim()) newErrors.vehicleYear = 'Vehicle year is required';
    if (!formData.vehicleColor.trim()) newErrors.vehicleColor = 'Vehicle color is required';
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Phone validation - basic format check
    if (formData.phone && !/^[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    // ZIP code validation
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'ZIP code is invalid (use format 12345 or 12345-6789)';
    }
    
    // Vehicle year validation
    if (formData.vehicleYear) {
      const year = parseInt(formData.vehicleYear);
      const currentYear = new Date().getFullYear();
      if (isNaN(year) || year < 1900 || year > currentYear + 1) {
        newErrors.vehicleYear = `Year must be between 1900 and ${currentYear + 1}`;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create booking data to pass to payment page
      const bookingData = {
        ...formData,
        date: dateParam,
        time: timeParam,
        package: packageParam,
        packagePrice: getPackagePrice(packageParam),
        serviceDuration: durationParam ? parseInt(durationParam, 10) : getServiceDuration(packageParam),
      };
      
      // Encode booking data for URL
      const encodedBookingData = encodeURIComponent(JSON.stringify(bookingData));
      
      // Navigate to payment page with booking data
      router.push(`/booking/payment?booking=${encodedBookingData}`);
    } else {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Function to get service duration based on package
  const getServiceDuration = (pkg: string): number => {
    switch(pkg.toLowerCase()) {
      case 'signature': return 4;
      case 'full-interior': return 2;
      case 'full-exterior': return 2;
      case 'basic': return 2;
      default: return 2;
    }
  };

  return (
    <div className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Customer Information</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please provide your details to proceed with your {packageParam} Package booking
          </p>
        </div>
        
        {/* Booking Steps */}
        <div className="flex flex-wrap justify-center mb-8 md:mb-12 gap-2 sm:gap-0">
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
              <span>1</span>
            </div>
            <div className="text-primary font-medium mx-2 text-sm sm:text-base">Select Package</div>
            <div className="hidden sm:block w-8 sm:w-16 h-0.5 bg-gray-300"></div>
          </div>
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
              <span>2</span>
            </div>
            <div className="text-primary font-medium mx-2 text-sm sm:text-base">Customer Info</div>
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
            {/* Personal Information Section */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Vehicle Information Section */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Vehicle Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
                <div>
                  <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Type*
                  </label>
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-black"
                  >
                    {vehicleTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="vehicleYear" className="block text-sm font-medium text-gray-700 mb-1">
                    Year*
                  </label>
                  <input
                    type="text"
                    id="vehicleYear"
                    name="vehicleYear"
                    value={formData.vehicleYear}
                    onChange={handleChange}
                    placeholder="e.g. 2022"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                      errors.vehicleYear ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.vehicleYear && (
                    <p className="mt-1 text-sm text-red-600">{errors.vehicleYear}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="vehicleMake" className="block text-sm font-medium text-gray-700 mb-1">
                    Make*
                  </label>
                  <input
                    type="text"
                    id="vehicleMake"
                    name="vehicleMake"
                    value={formData.vehicleMake}
                    onChange={handleChange}
                    placeholder="e.g. Toyota"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                      errors.vehicleMake ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.vehicleMake && (
                    <p className="mt-1 text-sm text-red-600">{errors.vehicleMake}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700 mb-1">
                    Model*
                  </label>
                  <input
                    type="text"
                    id="vehicleModel"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    placeholder="e.g. Camry"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                      errors.vehicleModel ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.vehicleModel && (
                    <p className="mt-1 text-sm text-red-600">{errors.vehicleModel}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="vehicleColor" className="block text-sm font-medium text-gray-700 mb-1">
                    Color*
                  </label>
                  <input
                    type="text"
                    id="vehicleColor"
                    name="vehicleColor"
                    value={formData.vehicleColor}
                    onChange={handleChange}
                    placeholder="e.g. Silver"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                      errors.vehicleColor ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.vehicleColor && (
                    <p className="mt-1 text-sm text-red-600">{errors.vehicleColor}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Service Location Section */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Service Location</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address*
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State*
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                        errors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code*
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary text-black ${
                        errors.zipCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Services Section */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Additional Services (Optional)</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <div className="flex items-start p-4 border border-gray-200 rounded-md">
                  <input
                    type="checkbox"
                    id="service-odor"
                    data-name="Odor Removal"
                    data-price="49"
                    onChange={handleServiceChange}
                    className="h-5 w-5 text-primary border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="service-odor" className="ml-3 block">
                    <span className="font-medium text-gray-900">Odor Removal</span>
                    <span className="block text-sm text-gray-500">Complete odor elimination</span>
                    <span className="text-primary font-medium">$49</span>
                  </label>
                </div>
                
                <div className="flex items-start p-4 border border-gray-200 rounded-md">
                  <input
                    type="checkbox"
                    id="service-pet"
                    data-name="Pet Hair Removal"
                    data-price="39"
                    onChange={handleServiceChange}
                    className="h-5 w-5 text-primary border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="service-pet" className="ml-3 block">
                    <span className="font-medium text-gray-900">Pet Hair Removal</span>
                    <span className="block text-sm text-gray-500">Specialized tools for pet hair</span>
                    <span className="text-primary font-medium">$39</span>
                  </label>
                </div>
                
                <div className="flex items-start p-4 border border-gray-200 rounded-md">
                  <input
                    type="checkbox"
                    id="service-headlight"
                    data-name="Headlight Restoration"
                    data-price="79"
                    onChange={handleServiceChange}
                    className="h-5 w-5 text-primary border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="service-headlight" className="ml-3 block">
                    <span className="font-medium text-gray-900">Headlight Restoration</span>
                    <span className="block text-sm text-gray-500">Remove oxidation from headlights</span>
                    <span className="text-primary font-medium">$79</span>
                  </label>
                </div>
                
                <div className="flex items-start p-4 border border-gray-200 rounded-md">
                  <input
                    type="checkbox"
                    id="service-ceramic"
                    data-name="Ceramic Coating"
                    data-price="199"
                    onChange={handleServiceChange}
                    className="h-5 w-5 text-primary border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="service-ceramic" className="ml-3 block">
                    <span className="font-medium text-gray-900">Ceramic Coating</span>
                    <span className="block text-sm text-gray-500">Long-lasting paint protection</span>
                    <span className="text-primary font-medium">$199</span>
                  </label>
                </div>
                
                <div className="flex items-start p-4 border border-gray-200 rounded-md">
                  <input
                    type="checkbox"
                    id="service-stain"
                    data-name="Stain Removal"
                    data-price="49"
                    onChange={handleServiceChange}
                    className="h-5 w-5 text-primary border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="service-stain" className="ml-3 block">
                    <span className="font-medium text-gray-900">Stain Removal</span>
                    <span className="block text-sm text-gray-500">Deep cleaning for tough stains</span>
                    <span className="text-primary font-medium">$49</span>
                  </label>
                </div>
                
                <div className="flex items-start p-4 border border-gray-200 rounded-md">
                  <input
                    type="checkbox"
                    id="service-ppf"
                    data-name="Paint Protection Film"
                    data-price="299"
                    onChange={handleServiceChange}
                    className="h-5 w-5 text-primary border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="service-ppf" className="ml-3 block">
                    <span className="font-medium text-gray-900">Paint Protection Film</span>
                    <span className="block text-sm text-gray-500">Invisible film protection</span>
                    <span className="text-primary font-medium">$299</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Special Instructions */}
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Special Instructions (Optional)</h2>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special requests or information about your vehicle that we should know?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-black"
                ></textarea>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Link href="/booking" className="btn-secondary text-center">
                Back to Packages
              </Link>
              <button type="submit" className="btn-primary">
                Continue to Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function CustomerInfoPage() {
  return (
    <Suspense fallback={<div className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading customer information page...</p>
        </div>
      </div>
    </div>}>
      <CustomerInfoContent />
    </Suspense>
  );
} 