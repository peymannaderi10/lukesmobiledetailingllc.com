import Link from "next/link";
import { MapPinIcon, StarIcon, TrophyIcon, UserIcon } from "@heroicons/react/24/outline";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-secondary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">About Luke's Mobile Detailing</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Professional mobile car detailing services that come to you.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Luke's Mobile Detailing was founded in 2024 with a simple mission: to provide exceptional car 
                detailing services that come directly to our customers, saving them time without sacrificing quality.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What started as a passion for keeping cars in pristine condition has grown into a full-service 
                mobile detailing business serving Houston, Texas. Our attention to detail and commitment to customer 
                satisfaction has made us a trusted name in mobile car care.
              </p>
              <p className="text-lg text-gray-600">
                Today, we continue to serve our community with the same dedication to quality and service that 
                has defined our business from day one. We take pride in transforming vehicles and exceeding 
                customer expectations with every detail.
              </p>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 h-96 flex items-center justify-center">
              {/* Replace with actual image */}
              <div className="text-gray-500 text-center">
                <p className="mb-2">Founder Image</p>
                <p className="text-sm">Luke working on a vehicle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Luke's Mobile Detailing?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We stand apart from other detailing services because of our commitment to excellence in everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <TrophyIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Premium Quality</h3>
              <p className="text-gray-600">
                We use only the highest quality products and equipment to ensure your vehicle receives the best care possible.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPinIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Mobile Convenience</h3>
              <p className="text-gray-600">
                We come to your home, office, or any location that's convenient for you, saving you time and hassle.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <StarIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Customer Satisfaction</h3>
              <p className="text-gray-600">
                We're not happy unless you're completely satisfied with our work. Your satisfaction is our top priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our experienced team of detailing professionals is committed to delivering exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                {/* Replace with actual image */}
                <UserIcon className="h-24 w-24 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Luke [Last Name]</h3>
                <p className="text-primary font-medium mb-4">Founder & Master Detailer</p>
                <p className="text-gray-600 mb-4">
                  With over [X] years of experience in the automotive detailing industry, Luke has a passion 
                  for bringing vehicles back to showroom condition.
                </p>
                <div className="flex items-center">
                  <span className="text-gray-500 text-sm font-medium mr-2">Certifications:</span>
                  <span className="text-gray-500 text-sm">IDA Certified Detailer</span>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                {/* Replace with actual image */}
                <UserIcon className="h-24 w-24 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Team Member</h3>
                <p className="text-primary font-medium mb-4">Senior Detailer</p>
                <p className="text-gray-600 mb-4">
                  Specializing in paint correction and ceramic coatings, our senior detailer brings years of 
                  experience and attention to detail to every job.
                </p>
                <div className="flex items-center">
                  <span className="text-gray-500 text-sm font-medium mr-2">Specialties:</span>
                  <span className="text-gray-500 text-sm">Paint Correction, Ceramic Coatings</span>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                {/* Replace with actual image */}
                <UserIcon className="h-24 w-24 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Team Member</h3>
                <p className="text-primary font-medium mb-4">Interior Specialist</p>
                <p className="text-gray-600 mb-4">
                  With a keen eye for detail and expertise in interior restoration, our specialist transforms 
                  even the most neglected interiors.
                </p>
                <div className="flex items-center">
                  <span className="text-gray-500 text-sm font-medium mr-2">Specialties:</span>
                  <span className="text-gray-500 text-sm">Interior Detailing, Leather Restoration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Service Area */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Service Area</h2>
              <p className="text-lg text-gray-600 mb-6">
                We proudly serve Houston, Texas and surrounding areas, bringing our premium mobile detailing 
                services directly to your location.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our service radius extends approximately 25 miles from Downtown Houston, covering the 
                following areas:
              </p>
              <ul className="grid grid-cols-2 gap-2 mb-6">
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
              <p className="text-gray-600">
                Not sure if we service your area? <Link href="/contact" className="text-primary hover:underline">Contact us</Link> to find out!
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 h-96 overflow-hidden shadow-sm">
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

      {/* Certifications */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Certifications & Training</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We take pride in our professional credentials and ongoing education in the latest detailing techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-200">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                {/* Replace with actual certification logo */}
                <span className="text-gray-500">Logo</span>
              </div>
              <h3 className="font-bold mb-2">IDA Certification</h3>
              <p className="text-gray-600 text-sm">
                International Detailing Association Certified Detailer
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-200">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                {/* Replace with actual certification logo */}
                <span className="text-gray-500">Logo</span>
              </div>
              <h3 className="font-bold mb-2">Paint Correction</h3>
              <p className="text-gray-600 text-sm">
                Specialized training in paint correction techniques
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-200">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                {/* Replace with actual certification logo */}
                <span className="text-gray-500">Logo</span>
              </div>
              <h3 className="font-bold mb-2">Ceramic Coating</h3>
              <p className="text-gray-600 text-sm">
                Certified installer for premium ceramic coating products
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center border border-gray-200">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                {/* Replace with actual certification logo */}
                <span className="text-gray-500">Logo</span>
              </div>
              <h3 className="font-bold mb-2">Leather Restoration</h3>
              <p className="text-gray-600 text-sm">
                Specialized training in leather cleaning and restoration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Experience the Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your appointment today and see why our customers trust us with their vehicles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="btn bg-white text-primary hover:bg-gray-100 font-bold px-8 py-3">
              Book Now
            </Link>
            <Link href="/contact" className="btn bg-transparent border-2 border-white hover:bg-white/10 font-bold px-8 py-3">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 