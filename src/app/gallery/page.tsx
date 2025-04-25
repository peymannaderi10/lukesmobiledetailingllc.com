"use client";

import Link from "next/link";
import { useState } from "react";

export default function GalleryPage() {
  // Track which before/after image is being viewed for each comparison
  const [activeImages, setActiveImages] = useState({
    comparison1: "before",
    comparison2: "before",
    comparison3: "before",
    comparison4: "before",
    comparison5: "before",
    comparison6: "before"
  });

  // Function to handle image toggle
  const handleImageToggle = (comparisonId: string, view: string) => {
    setActiveImages(prev => ({
      ...prev,
      [comparisonId]: view
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="relative bg-secondary text-white py-12 md:py-20">
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="w-full h-full bg-gradient-to-r from-secondary to-secondary-light" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Our Detailing Gallery
            </h1>
            <p className="text-base md:text-lg">
              Browse through our showcase of transformations and see the difference our professional detailing services can make.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Before & After Transformations */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Featured Transformations</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Take a look at some of our most impressive detailing transformations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Transformation 1 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative pt-[56.25%]">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  {/* Replace with actual image */}
                  <p className="text-gray-700">Transformation Image</p>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-bold text-lg mb-2">Paint Correction & Ceramic Coating</h3>
                <p className="text-gray-600 mb-4">
                  Removed years of swirl marks and applied a premium ceramic coating for long-lasting protection.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Vehicle: Mercedes-Benz C300</span>
                  <span className="text-sm font-medium text-primary">Ultimate Package</span>
                </div>
              </div>
            </div>
            
            {/* Transformation 2 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative pt-[56.25%]">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  {/* Replace with actual image */}
                  <p className="text-gray-700">Transformation Image</p>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-bold text-lg mb-2">Interior Restoration</h3>
                <p className="text-gray-600 mb-4">
                  Deep cleaned heavily soiled seats and carpets, restoring them to like-new condition.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Vehicle: Ford F-150</span>
                  <span className="text-sm font-medium text-primary">Premium Package</span>
                </div>
              </div>
            </div>
            
            {/* Transformation 3 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative pt-[56.25%]">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  {/* Replace with actual image */}
                  <p className="text-gray-700">Transformation Image</p>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="font-bold text-lg mb-2">Headlight Restoration</h3>
                <p className="text-gray-600 mb-4">
                  Restored foggy, yellowed headlights to crystal clear, improving visibility and appearance.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Vehicle: Toyota Camry</span>
                  <span className="text-sm font-medium text-primary">Add-on Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Comparisons */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-black">Before & After</h2>
            <p className="text-base sm:text-lg text-black max-w-3xl mx-auto">
              See the dramatic difference our detailing services can make with these before and after comparisons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before/After Comparison 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
              <div className="p-4 sm:p-6 bg-gray-50 border-b">
                <h3 className="text-xl font-bold">Exterior Detail - Black SUV</h3>
                <p className="text-gray-600">Full exterior detail with paint correction and ceramic coating.</p>
              </div>
              
              <div className="relative">
                {/* Toggle buttons */}
                <div className="absolute top-4 left-4 z-10 flex bg-white rounded-lg shadow overflow-hidden">
                  <button 
                    className={`px-4 py-2 text-sm font-medium ${activeImages.comparison1 === 'before' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => handleImageToggle('comparison1', 'before')}
                  >
                    Before
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm font-medium ${activeImages.comparison1 === 'after' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => handleImageToggle('comparison1', 'after')}
                  >
                    After
                  </button>
                </div>
                
                {/* Images */}
                <div className="relative pt-[56.25%] bg-gray-200">
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeImages.comparison1 === 'before' ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Replace with actual before image */}
                    <p className="text-gray-700 font-bold text-xl">Before Image</p>
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeImages.comparison1 === 'after' ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Replace with actual after image */}
                    <p className="text-gray-700 font-bold text-xl">After Image</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Before/After Comparison 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
              <div className="p-4 sm:p-6 bg-gray-50 border-b">
                <h3 className="text-xl font-bold">Interior Restoration - Family Minivan</h3>
                <p className="text-gray-600">Deep cleaning of heavily soiled interior with stain removal.</p>
              </div>
              
              <div className="relative">
                {/* Toggle buttons */}
                <div className="absolute top-4 left-4 z-10 flex bg-white rounded-lg shadow overflow-hidden">
                  <button 
                    className={`px-4 py-2 text-sm font-medium ${activeImages.comparison2 === 'before' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => handleImageToggle('comparison2', 'before')}
                  >
                    Before
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm font-medium ${activeImages.comparison2 === 'after' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => handleImageToggle('comparison2', 'after')}
                  >
                    After
                  </button>
                </div>
                
                {/* Images */}
                <div className="relative pt-[56.25%] bg-gray-200">
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeImages.comparison2 === 'before' ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Replace with actual before image */}
                    <p className="text-gray-700 font-bold text-xl">Before Image</p>
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeImages.comparison2 === 'after' ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Replace with actual after image */}
                    <p className="text-gray-700 font-bold text-xl">After Image</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Before/After Comparison 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
              <div className="p-4 sm:p-6 bg-gray-50 border-b">
                <h3 className="text-xl font-bold">Headlight Restoration - Sedan</h3>
                <p className="text-gray-600">Restoration of heavily oxidized and yellowed headlights.</p>
              </div>
              
              <div className="relative">
                {/* Toggle buttons */}
                <div className="absolute top-4 left-4 z-10 flex bg-white rounded-lg shadow overflow-hidden">
                  <button 
                    className={`px-4 py-2 text-sm font-medium ${activeImages.comparison3 === 'before' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => handleImageToggle('comparison3', 'before')}
                  >
                    Before
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm font-medium ${activeImages.comparison3 === 'after' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => handleImageToggle('comparison3', 'after')}
                  >
                    After
                  </button>
                </div>
                
                {/* Images */}
                <div className="relative pt-[56.25%] bg-gray-200">
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeImages.comparison3 === 'before' ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Replace with actual before image */}
                    <p className="text-gray-700 font-bold text-xl">Before Image</p>
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeImages.comparison3 === 'after' ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Replace with actual after image */}
                    <p className="text-gray-700 font-bold text-xl">After Image</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Before/After Comparison 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
              <div className="p-4 sm:p-6 bg-gray-50 border-b">
                <h3 className="text-xl font-bold">Leather Conditioning - Luxury Sedan</h3>
                <p className="text-gray-600">Revitalizing dried and cracked leather surfaces.</p>
              </div>
              
              <div className="relative">
                {/* Toggle buttons */}
                <div className="absolute top-4 left-4 z-10 flex bg-white rounded-lg shadow overflow-hidden">
                  <button 
                    className={`px-4 py-2 text-sm font-medium ${activeImages.comparison4 === 'before' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => handleImageToggle('comparison4', 'before')}
                  >
                    Before
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm font-medium ${activeImages.comparison4 === 'after' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => handleImageToggle('comparison4', 'after')}
                  >
                    After
                  </button>
                </div>
                
                {/* Images */}
                <div className="relative pt-[56.25%] bg-gray-200">
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeImages.comparison4 === 'before' ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Replace with actual before image */}
                    <p className="text-gray-700 font-bold text-xl">Before Image</p>
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeImages.comparison4 === 'after' ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Replace with actual after image */}
                    <p className="text-gray-700 font-bold text-xl">After Image</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Before/After Comparison 5 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
              <div className="p-4 sm:p-6 bg-gray-50 border-b">
                <h3 className="text-xl font-bold">Engine Bay Detailing - Sports Car</h3>
                <p className="text-gray-600">Professional cleaning and dressing of engine components.</p>
              </div>
              
              <div className="relative">
                {/* Toggle buttons */}
                <div className="absolute top-4 left-4 z-10 flex bg-white rounded-lg shadow overflow-hidden">
                  <button 
                    className={`px-4 py-2 text-sm font-medium ${activeImages.comparison5 === 'before' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => handleImageToggle('comparison5', 'before')}
                  >
                    Before
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm font-medium ${activeImages.comparison5 === 'after' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => handleImageToggle('comparison5', 'after')}
                  >
                    After
                  </button>
                </div>
                
                {/* Images */}
                <div className="relative pt-[56.25%] bg-gray-200">
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeImages.comparison5 === 'before' ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Replace with actual before image */}
                    <p className="text-gray-700 font-bold text-xl">Before Image</p>
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeImages.comparison5 === 'after' ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Replace with actual after image */}
                    <p className="text-gray-700 font-bold text-xl">After Image</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Before/After Comparison 6 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
              <div className="p-4 sm:p-6 bg-gray-50 border-b">
                <h3 className="text-xl font-bold">Wheel & Caliper Detailing - Performance Car</h3>
                <p className="text-gray-600">Deep cleaning and protection of wheels and brake components.</p>
              </div>
              
              <div className="relative">
                {/* Toggle buttons */}
                <div className="absolute top-4 left-4 z-10 flex bg-white rounded-lg shadow overflow-hidden">
                  <button 
                    className={`px-4 py-2 text-sm font-medium ${activeImages.comparison6 === 'before' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => handleImageToggle('comparison6', 'before')}
                  >
                    Before
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm font-medium ${activeImages.comparison6 === 'after' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => handleImageToggle('comparison6', 'after')}
                  >
                    After
                  </button>
                </div>
                
                {/* Images */}
                <div className="relative pt-[56.25%] bg-gray-200">
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeImages.comparison6 === 'before' ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Replace with actual before image */}
                    <p className="text-gray-700 font-bold text-xl">Before Image</p>
                  </div>
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${activeImages.comparison6 === 'after' ? 'opacity-100' : 'opacity-0'}`}>
                    {/* Replace with actual after image */}
                    <p className="text-gray-700 font-bold text-xl">After Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="container-custom px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ready to Transform Your Vehicle?</h2>
          <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Book your mobile detailing service today and experience the same amazing results.
          </p>
          <Link href="/booking" className="btn bg-white text-primary hover:bg-gray-100 font-bold px-6 sm:px-8 py-3 shadow-lg">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
} 