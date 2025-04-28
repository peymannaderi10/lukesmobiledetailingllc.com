import Link from "next/link";
import Image from "next/image";
import { MapPinIcon, StarIcon, TrophyIcon, UserIcon } from "@heroicons/react/24/outline";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-secondary text-white py-16 relative">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/Images/webPhotos/banner3.jpg" 
            alt="About Luke's Mobile Detailing" 
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 55%" }}
          />
          <div className="absolute inset-0 bg-black opacity-65" />
        </div>
        <div className="container-custom text-center relative z-10">
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
                Luke's Mobile Detailing was founded in 2022 with a simple mission: to provide exceptional car 
                detailing services that come directly to our customers, saving them time without sacrificing quality.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What started as a passion for keeping cars in pristine condition has grown into a full-service 
                mobile detailing business serving Yuba City, Marysville, and surrounding areas in California. Our attention to detail and commitment to customer 
                satisfaction has made us a trusted name in mobile car care.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                With several years of experience in the automotive detailing industry, Luke has a passion 
                for bringing vehicles back to showroom condition. Specializing in full detailing and paint 
                correction, every service is delivered with meticulous attention to detail.
              </p>
              <p className="text-lg text-gray-600">
                Today, we continue to serve our community with the same dedication to quality and service that 
                has defined our business from day one. We take pride in transforming vehicles and exceeding 
                customer expectations with every detail.
              </p>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm h-full">
              <Image 
                src="/Images/webPhotos/AboutMe.jpeg" 
                alt="Luke, Founder of Luke's Mobile Detailing" 
                width={600} 
                height={600} 
                className="w-full h-full object-cover"
                priority
              />
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

      {/* Our Service Area */}
      <section className="py-12 md:py-20 bg-gray-100" id="service-area">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Service Area</h2>
              <p className="text-lg text-gray-600 mb-6">
                We proudly serve Yuba City, Marysville, and surrounding areas in California, bringing our premium mobile detailing 
                services directly to your location.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our service area includes the following locations:
              </p>
              <ul className="grid grid-cols-2 gap-2 mb-6">
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
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>Sutter</span>
                </li>
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>Plumas Lake</span>
                </li>
              </ul>
              <p className="text-gray-600">
                Not sure if we service your area? <Link href="/contact" className="text-primary hover:underline">Contact us</Link> to find out!
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 h-96 overflow-hidden shadow-sm">
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