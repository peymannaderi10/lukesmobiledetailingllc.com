import Link from "next/link";
import Image from "next/image";
import { MapPinIcon, StarIcon, TrophyIcon, UserIcon } from "@heroicons/react/24/outline";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import TiltedCard from "@/components/TiltedCard";
import CardSwap, { Card } from "@/components/CardSwap";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative text-white min-h-[585px] md:min-h-[715px]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/Images/webPhotos/banner3.jpg" 
            alt="About Luke's Mobile Detailing" 
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 55%" }}
          />
          <div className="absolute inset-0 bg-black opacity-50" />
          <div 
            className="absolute bottom-0 left-0 right-0 h-16 md:h-24 z-[1]" 
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0) 15%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.4) 55%, rgba(255,255,255,0.6) 65%, rgba(255,255,255,0.75) 75%, rgba(255,255,255,0.85) 85%, rgba(255,255,255,0.95) 95%, rgba(255,255,255,1) 100%)'
            }}
          />
        </div>
        <div className="container-custom relative z-10 pt-32 md:pt-40 pb-32 md:pb-48 flex flex-col min-h-[585px] md:min-h-[715px]">
          <div className="max-w-3xl mx-auto text-center flex-1 flex flex-col justify-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">About Luke's Mobile Detailing</h1>
            <p className="text-lg max-w-2xl mx-auto text-white">
              Professional mobile car detailing services that come to you.
            </p>
          </div>
        </div>
        
        {/* Curved Divider */}
        <div className="curved-divider hero-services-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hero-about-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4"></stop>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1"></stop>
              </linearGradient>
            </defs>
            <path fill="url(#hero-about-gradient)" d="M0,128 C480,0 960,160 1440,80 L1440,160 L0,160 Z"></path>
          </svg>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 text-center md:text-left">Our Story</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Luke's Mobile Detailing was founded in 2022 with a simple mission: to provide exceptional car 
                  detailing services that come directly to our customers, saving them time without sacrificing quality.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  What started as a passion for keeping cars in pristine condition has grown into a full-service 
                  mobile detailing business serving Yuba City, Marysville, and surrounding areas in California. With several years of experience, 
                  we specialize in bringing vehicles back to showroom condition through meticulous attention to detail and 
                  a commitment to exceeding customer expectations.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center w-full h-full">
              <div className="w-full max-w-[400px] md:max-w-[500px] aspect-square">
                <TiltedCard
                  imageSrc="/Images/webPhotos/AboutMe.jpeg"
                  altText="Luke, Founder of Luke's Mobile Detailing"
                  captionText="Luke, Founder of Luke's Mobile Detailing"
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.0}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={true}
                  overlayContent={
                    <p className="text-white text-xl font-bold bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                      Luke - Owner
                    </p>
                  }
                />
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute left-10 top-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute right-10 bottom-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Why Choose Luke's Mobile Detailing?</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                We stand apart from other detailing services because of our commitment to excellence in everything we do.
              </p>
            </div>
            {/* Right Column - Card Stack */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
              <CardSwap
                width={400}
                height={320}
                cardDistance={60}
                verticalDistance={70}
                delay={5000}
                pauseOnHover={true}
                skewAmount={6}
                easing="elastic"
              >
                <Card>
                  <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                    <div className="flex items-center justify-center mb-6">
                      <TrophyIcon className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-red-500">Premium Quality</h3>
                    <p className="text-red-500 leading-relaxed">
                      We use only the highest quality products and equipment to ensure your vehicle receives the best care possible.
                    </p>
                  </div>
                </Card>
                
                <Card>
                  <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                    <div className="flex items-center justify-center mb-6">
                      <MapPinIcon className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-red-500">Mobile Convenience</h3>
                    <p className="text-red-500 leading-relaxed">
                      We come to your home, office, or any location that's convenient for you, saving you time and hassle.
                    </p>
                  </div>
                </Card>
                
                <Card>
                  <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                    <div className="flex items-center justify-center mb-6">
                      <StarIcon className="h-8 w-8 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-red-500">Customer Satisfaction</h3>
                    <p className="text-red-500 leading-relaxed">
                      We're not happy unless you're completely satisfied with our work. Your satisfaction is our top priority.
                    </p>
                  </div>
                </Card>
              </CardSwap>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute left-1/4 top-1/3 w-24 h-24 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute right-1/4 bottom-1/4 w-32 h-32 bg-primary/8 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
        </div>
      </section>

      {/* Our Service Area */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden" id="service-area">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our Service Area</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We proudly serve Yuba City, Marysville, and surrounding areas in California, bringing our premium mobile detailing 
              services directly to your location.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-100">
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our service area includes the following locations:
              </p>
              <ul className="grid grid-cols-2 gap-4 mb-8">
                <li className="flex items-center text-gray-900 group">
                  <MapPinIcon className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Yuba City</span>
                </li>
                <li className="flex items-center text-gray-900 group">
                  <MapPinIcon className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Marysville</span>
                </li>
                <li className="flex items-center text-gray-900 group">
                  <MapPinIcon className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Live Oak</span>
                </li>
                <li className="flex items-center text-gray-900 group">
                  <MapPinIcon className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Olivehurst</span>
                </li>
                <li className="flex items-center text-gray-900 group">
                  <MapPinIcon className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Linda</span>
                </li>
                <li className="flex items-center text-gray-900 group">
                  <MapPinIcon className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Gridley</span>
                </li>
                <li className="flex items-center text-gray-900 group">
                  <MapPinIcon className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Sutter</span>
                </li>
                <li className="flex items-center text-gray-900 group">
                  <MapPinIcon className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Plumas Lake</span>
                </li>
                <li className="flex items-center text-gray-900 group">
                  <MapPinIcon className="h-5 w-5 text-primary mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Meridian</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Not sure if we service your area? <Link href="/contact" className="text-primary hover:underline font-medium">Contact us</Link> to find out!
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 h-96 overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <ServiceAreaMap />
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute left-10 top-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute right-10 bottom-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-primary to-primary/90 text-white relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Experience the Difference?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-white">
            Book your appointment today and see why our customers trust us with their vehicles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://app.squareup.com/appointments/buyer/widget/hs7hvrxqk38fag/L51SWV5N7VVBD" 
              className="btn bg-white text-primary hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Book Now
            </Link>
            <Link 
              href="/contact" 
              className="btn bg-transparent border-2 border-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute left-1/4 top-1/3 w-32 h-32 bg-white/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute right-1/4 bottom-1/4 w-40 h-40 bg-white/10 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
      </section>
    </div>
  );
} 