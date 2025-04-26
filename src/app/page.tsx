"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  CheckCircleIcon, 
  SparklesIcon, 
  ClockIcon, 
  MapPinIcon, 
  TruckIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Home() {
  // Track active tab for each package
  const [activeTab, setActiveTab] = useState({
    signature: "interior",
    basic: "interior"
  });

  // Function to handle tab changes
  const handleTabChange = (packageName: string, tabName: string) => {
    setActiveTab(prev => ({
      ...prev,
      [packageName]: tabName
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/Images/webPhotos/Banner.jpg" 
            alt="Professional car detailing" 
            fill
            priority
            className="object-cover object-center object-position-y-top"
            style={{ objectPosition: "center 55%" }}
          />
          <div className="absolute inset-0 bg-black opacity-80" />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Mobile Detailing Services
            </h1>
            <p className="text-lg md:text-xl mb-8">
              We bring our premium car detailing services directly to your location.
              Convenience and quality at your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" className="btn-primary text-center">
                Book Your Detail
              </Link>
              <Link href="/services" className="btn-outline text-center">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-sm">
              <TruckIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Mobile Service</h3>
              <p className="text-gray-800">We come to your home, office, or any location convenient for you.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-sm">
              <SparklesIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Premium Products</h3>
              <p className="text-gray-800">We use high-quality, eco-friendly products for a superior finish.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-100 rounded-lg shadow-sm">
              <CheckCircleIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Satisfaction Guaranteed</h3>
              <p className="text-gray-800">Your satisfaction is our priority. We don't leave until you're happy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Our Detailing Packages</h2>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Choose from our range of comprehensive detailing packages designed to meet your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* The Signature Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
                MOST POPULAR
              </div>
              <div className="bg-primary text-white p-6">
                <h3 className="text-2xl font-bold mb-2">The Signature</h3>
                <p className="text-3xl font-bold">$255</p>
                <p className="text-sm mt-2">Interior & Exterior Detail</p>
              </div>
              <div className="p-6">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mb-4">
                  <button 
                    className={`py-2 px-4 font-medium text-sm ${activeTab.signature === "interior" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
                    onClick={() => handleTabChange("signature", "interior")}
                  >
                    Interior
                  </button>
                  <button 
                    className={`py-2 px-4 font-medium text-sm ${activeTab.signature === "exterior" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
                    onClick={() => handleTabChange("signature", "exterior")}
                  >
                    Exterior
                  </button>
                </div>
                
                {/* Interior Features */}
                <div className={activeTab.signature === "interior" ? "block" : "hidden"}>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Full interior deep vacuum</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Wipe down of all surfaces</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Steam cleaning of cracks & crevices</span>
                    </li>
                    <li className="flex items-start">
                      <ClockIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mr-2" />
                      <span className="text-gray-700">See full details on services page</span>
                    </li>
                  </ul>
                </div>
                
                {/* Exterior Features */}
                <div className={activeTab.signature === "exterior" ? "block" : "hidden"}>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Full vehicle pre rinse</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Paint decontamination</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">3-5 month sealant</span>
                    </li>
                    <li className="flex items-start">
                      <ClockIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mr-2" />
                      <span className="text-gray-700">See full details on services page</span>
                    </li>
                  </ul>
                </div>
                
                <Link 
                  href="/booking?package=signature" 
                  className="btn-primary w-full mt-6 text-center block"
                >
                  Book Now
                </Link>
              </div>
            </div>
            
            {/* Full Interior Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-secondary text-white p-6">
                <h3 className="text-2xl font-bold mb-2">The Full Interior</h3>
                <p className="text-3xl font-bold">$195</p>
                <p className="text-sm mt-2">Interior Detail</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Full interior deep vacuum</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Wipe down of all surfaces</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Steam cleaning of cup holders</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Air freshener</span>
                  </li>
                  <li className="flex items-start">
                    <ClockIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mr-2" />
                    <span className="text-gray-700">See full details on services page</span>
                  </li>
                </ul>
                <Link 
                  href="/booking?package=full-interior" 
                  className="btn-primary w-full mt-6 text-center block"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Full Exterior Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-secondary text-white p-6">
                <h3 className="text-2xl font-bold mb-2">The Full Exterior</h3>
                <p className="text-3xl font-bold">$130</p>
                <p className="text-sm mt-2">Exterior Detail</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Foam wash</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Wheels & wheel wells</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Paint decontamination</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">6-8 month sealant</span>
                  </li>
                  <li className="flex items-start">
                    <ClockIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mr-2" />
                    <span className="text-gray-700">See full details on services page</span>
                  </li>
                </ul>
                <Link 
                  href="/booking?package=full-exterior" 
                  className="btn-primary w-full mt-6 text-center block"
                >
                  Book Now
                </Link>
              </div>
            </div>
            
            {/* The Basic Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-secondary text-white p-6">
                <h3 className="text-2xl font-bold mb-2">The Basic</h3>
                <p className="text-3xl font-bold">$185</p>
                <p className="text-sm mt-2">Interior & Exterior Detail</p>
              </div>
              <div className="p-6">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mb-4">
                  <button 
                    className={`py-2 px-4 font-medium text-sm ${activeTab.basic === "interior" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
                    onClick={() => handleTabChange("basic", "interior")}
                  >
                    Interior
                  </button>
                  <button 
                    className={`py-2 px-4 font-medium text-sm ${activeTab.basic === "exterior" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
                    onClick={() => handleTabChange("basic", "exterior")}
                  >
                    Exterior
                  </button>
                </div>
                
                {/* Interior Features */}
                <div className={activeTab.basic === "interior" ? "block" : "hidden"}>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Full interior vacuum</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Wipe down of all surfaces</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Air freshener</span>
                    </li>
                    <li className="flex items-start">
                      <ClockIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mr-2" />
                      <span className="text-gray-700">See full details on services page</span>
                    </li>
                  </ul>
                </div>
                
                {/* Exterior Features */}
                <div className={activeTab.basic === "exterior" ? "block" : "hidden"}>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Foam wash</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Wheels & tires cleaned</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Tire shine</span>
                    </li>
                    <li className="flex items-start">
                      <ClockIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mr-2" />
                      <span className="text-gray-700">See full details on services page</span>
                    </li>
                  </ul>
                </div>
                
                <Link 
                  href="/booking?package=basic" 
                  className="btn-primary w-full mt-6 text-center block"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/services" className="btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say about our services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-800 mb-4">
                "I contacted Luke about detailing my plane. We made plans to meet at the airport and he was right on time. He did an excellent job and I was very impressed with how hard he worked and all of the professional products he used. I would highly recommend Luke's mobile detailing."
              </p>
              <div className="flex items-center">
                <div className="mr-4 bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="font-bold text-gray-600">CB</span>
                </div>
                <div>
                  <h4 className="font-bold">Carin Batham</h4>
                  <p className="text-sm text-gray-500">Siganture Package Customer</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-800 mb-4">
                "First time getting my car detailed by Luke and he showed up on time with a 100 gallon water tank and his own generator to power all his equipment, he was extremely professional and clean, I'm definitely gonna recommend him to my friends and will be using his services in the future!"
              </p>
              <div className="flex items-center">
                <div className="mr-4 bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="font-bold text-gray-600">SA</span>
                </div>
                <div>
                  <h4 className="font-bold">Shahan Ali</h4>
                  <p className="text-sm text-gray-500">Signature Package Customer</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/reviews" className="btn-outline">
              View All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Vehicle?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your mobile detailing service today and experience the difference.
          </p>
          <Link href="/booking" className="btn bg-white text-primary hover:bg-gray-100 font-bold px-8 py-3 shadow-lg">
            Book Now
          </Link>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Service Area</h2>
              <p className="text-lg text-gray-800 mb-6">
                We provide our mobile detailing services throughout Yuba City, Marysville, and surrounding areas in California.
              </p>
              <ul className="grid grid-cols-2 gap-2">
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>Yuba City</span>
                </li>
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>Marysville</span>
                </li>
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>Live Oak</span>
                </li>
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>Olivehurst</span>
                </li>
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>Linda</span>
                </li>
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>Gridley</span>
                </li>
              </ul>
              <p className="mt-6 text-gray-700">
                Not sure if we service your area? <Link href="/contact" className="text-primary hover:underline">Contact us</Link> to find out!
              </p>
            </div>
            <div className="md:w-1/2 bg-white rounded-lg p-4 h-80 overflow-hidden shadow-sm">
              {/* Yuba City/Marysville map */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99439.13782406501!2d-121.68402299442324!3d39.13572971039171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809b51944dffefb7%3A0xaa3f8a1952a72a47!2sYuba%20City%2C%20CA!5e0!3m2!1sen!2sus!4v1693438071518!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Yuba City/Marysville Service Area Map"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
