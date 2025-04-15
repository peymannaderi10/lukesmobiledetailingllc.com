import Image from "next/image";
import Link from "next/link";
import { 
  CheckCircleIcon, 
  SparklesIcon, 
  ClockIcon, 
  MapPinIcon, 
  TruckIcon,
  StarIcon
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-secondary text-white">
        <div className="absolute inset-0 z-0 opacity-50">
          {/* Replace with actual car detailing image */}
          <div className="w-full h-full bg-gradient-to-r from-secondary to-secondary-light" />
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-secondary text-white p-6">
                <h3 className="text-2xl font-bold mb-2">Basic Package</h3>
                <p className="text-3xl font-bold">$99<span className="text-sm font-normal"> and up</span></p>
                <p className="text-sm mt-2">Perfect for routine maintenance</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Exterior hand wash & dry</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Wheel cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Tire shine application</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Interior vacuum & dusting</span>
          </li>
                  <li className="flex items-start">
                    <ClockIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mr-2" />
                    <span className="text-gray-700">Approx. 1-2 hours</span>
          </li>
                </ul>
                <Link 
                  href="/booking?package=basic" 
                  className="btn-primary w-full mt-6 text-center block"
                >
                  Book Now
                </Link>
              </div>
            </div>
            
            {/* Premium Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
                POPULAR
              </div>
              <div className="bg-primary text-white p-6">
                <h3 className="text-2xl font-bold mb-2">Premium Package</h3>
                <p className="text-3xl font-bold">$179<span className="text-sm font-normal"> and up</span></p>
                <p className="text-sm mt-2">Comprehensive interior & exterior</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Everything in Basic Package</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Interior deep cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Leather conditioning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Exterior wax protection</span>
                  </li>
                  <li className="flex items-start">
                    <ClockIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mr-2" />
                    <span className="text-gray-700">Approx. 3-4 hours</span>
                  </li>
                </ul>
                <Link 
                  href="/booking?package=premium" 
                  className="btn-primary w-full mt-6 text-center block"
                >
                  Book Now
                </Link>
              </div>
            </div>
            
            {/* Ultimate Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-secondary text-white p-6">
                <h3 className="text-2xl font-bold mb-2">Ultimate Package</h3>
                <p className="text-3xl font-bold">$299<span className="text-sm font-normal"> and up</span></p>
                <p className="text-sm mt-2">The complete detailing experience</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Everything in Premium Package</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Paint correction</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Ceramic coating application</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Engine bay cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <ClockIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mr-2" />
                    <span className="text-gray-700">Approx. 5-8 hours</span>
                  </li>
                </ul>
                <Link 
                  href="/booking?package=ultimate" 
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
                "Luke did an amazing job on my SUV. It had months of dirt and grime, 
                and now it looks better than when I bought it. Highly recommend his premium package!"
              </p>
              <div className="flex items-center">
                <div className="mr-4 bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="font-bold text-gray-600">JS</span>
                </div>
                <div>
                  <h4 className="font-bold">John Smith</h4>
                  <p className="text-sm text-gray-500">Premium Package Customer</p>
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
                "I was amazed at the transformation of my car. Luke's attention to detail is outstanding.
                The convenience of having him come to my home made it even better."
              </p>
              <div className="flex items-center">
                <div className="mr-4 bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="font-bold text-gray-600">SD</span>
                </div>
                <div>
                  <h4 className="font-bold">Sarah Davis</h4>
                  <p className="text-sm text-gray-500">Ultimate Package Customer</p>
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
                We provide our mobile detailing services throughout the greater Houston, Texas area, 
                including these locations and surrounding communities:
              </p>
              <ul className="grid grid-cols-2 gap-2">
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>The Heights</span>
                </li>
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>Sugar Land</span>
                </li>
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>Katy</span>
                </li>
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>The Woodlands</span>
                </li>
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>Pearland</span>
                </li>
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>Spring</span>
                </li>
              </ul>
              <p className="mt-6 text-gray-700">
                Not sure if we service your area? <Link href="/contact" className="text-primary hover:underline">Contact us</Link> to find out!
              </p>
            </div>
            <div className="md:w-1/2 bg-white rounded-lg p-4 h-80 overflow-hidden shadow-sm">
              {/* Houston map */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221925.9737018205!2d-95.76824936415143!3d29.817773238610072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b8b4488d8501%3A0xca0d02def365053b!2sHouston%2C%20TX!5e0!3m2!1sen!2sus!4v1693438071518!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Houston Service Area Map"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
