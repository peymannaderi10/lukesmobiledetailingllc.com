import Link from "next/link";
import Image from "next/image";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import TiltedCard from "@/components/TiltedCard";
import CardSwap, { Card } from "@/components/CardSwap";

export default function AboutPage() {
  return (
    <div className="bg-black text-gray-100">
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
          <div className="absolute inset-0 bg-black/60" />
          <div 
            className="absolute bottom-0 left-0 right-0 h-16 md:h-24 z-[1]" 
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,0.95) 95%, rgba(0,0,0,1) 100%)'
            }}
          />
        </div>
        <div className="container-custom relative z-10 pt-32 md:pt-40 pb-32 md:pb-48 flex flex-col min-h-[585px] md:min-h-[715px]">
          <div className="max-w-3xl mx-auto text-center flex-1 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">Our Story</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 text-white tracking-tight">About Luke&apos;s Mobile Detailing</h1>
            <p className="text-lg max-w-2xl mx-auto text-gray-300">
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
                <stop offset="100%" stopColor="#000000" stopOpacity="1"></stop>
              </linearGradient>
            </defs>
            <path fill="url(#hero-about-gradient)" d="M0,128 C480,0 960,160 1440,80 L1440,160 L0,160 Z"></path>
          </svg>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-28 bg-[#0A0A0A] relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">Est. 2022</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-8 text-white text-center md:text-left tracking-tight">Our Story</h2>
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  Luke&apos;s Mobile Detailing was founded in 2022 with a simple mission: to provide exceptional car 
                  detailing services that come directly to our customers, saving them time without sacrificing quality.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  What started as a passion for keeping cars in pristine condition has grown into a full-service 
                  mobile detailing business serving Yuba City, Marysville, and surrounding areas in California. With several years of experience, 
                  we specialize in bringing vehicles back to showroom condition through meticulous attention to detail and 
                  a commitment to exceeding customer expectations.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center w-full h-full">
              <div className="w-full max-w-[400px] md:max-w-[500px] aspect-square relative">
                <div className="hidden sm:block absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-primary z-10" />
                <div className="hidden sm:block absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-primary z-10" />
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
                    <div className="glassmorphism px-5 py-3">
                      <p className="text-white text-sm font-bold uppercase tracking-widest">Luke — Owner</p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
          
          <div className="absolute left-10 top-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute right-10 bottom-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-[#111] relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col justify-center space-y-6 text-center lg:text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold">Why Us</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Why Choose Luke&apos;s Mobile Detailing?</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                We stand apart from other detailing services because of our commitment to excellence in everything we do.
              </p>
            </div>
            <div className="relative h-[380px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
              <CardSwap
                width={320}
                height={280}
                cardDistance={60}
                verticalDistance={70}
                delay={5000}
                pauseOnHover={true}
                skewAmount={6}
                easing="elastic"
              >
                <Card>
                  <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-primary text-3xl">emoji_events</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4 text-white">Premium Quality</h3>
                    <p className="text-gray-400 leading-relaxed">
                      We use only the highest quality products and equipment to ensure your vehicle receives the best care possible.
                    </p>
                  </div>
                </Card>
                
                <Card>
                  <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4 text-white">Mobile Convenience</h3>
                    <p className="text-gray-400 leading-relaxed">
                      We come to your home, office, or any location that&apos;s convenient for you, saving you time and hassle.
                    </p>
                  </div>
                </Card>
                
                <Card>
                  <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-primary text-3xl">star</span>
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4 text-white">Customer Satisfaction</h3>
                    <p className="text-gray-400 leading-relaxed">
                      We&apos;re not happy unless you&apos;re completely satisfied with our work. Your satisfaction is our top priority.
                    </p>
                  </div>
                </Card>
              </CardSwap>
            </div>
          </div>
          
          <div className="absolute left-1/4 top-1/3 w-24 h-24 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute right-1/4 bottom-1/4 w-32 h-32 bg-primary/8 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
        </div>
      </section>

      {/* Our Service Area */}
      <section className="py-20 md:py-28 bg-[#0A0A0A] relative overflow-hidden" id="service-area">
        <div className="container-custom">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">Coverage</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">Our Service Area</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We proudly serve Yuba City, Marysville, and surrounding areas in California, bringing our premium mobile detailing 
              services directly to your location.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-zinc-900/80 backdrop-blur-sm rounded-sm p-8 shadow-xl border border-white/10">
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Our service area includes the following locations:
              </p>
              <ul className="grid grid-cols-2 gap-4 mb-8">
                {["Yuba City", "Marysville", "Live Oak", "Olivehurst", "Linda", "Gridley", "Sutter", "Plumas Lake", "Meridian"].map((city) => (
                  <li key={city} className="flex items-center text-white group">
                    <span className="material-symbols-outlined text-primary text-lg mr-3 group-hover:scale-110 transition-transform duration-300">location_on</span>
                    <span className="font-medium">{city}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-300 leading-relaxed">
                Not sure if we service your area? <Link href="/contact" className="text-primary hover:underline font-medium">Contact us</Link> to find out!
              </p>
            </div>
            <div className="bg-zinc-900 rounded-sm p-4 h-96 overflow-hidden shadow-xl border border-white/10 hover:shadow-2xl transition-all duration-300">
              <ServiceAreaMap />
            </div>
          </div>
          
          <div className="absolute left-10 top-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute right-10 bottom-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28 bg-[#111] border-t border-white/5 relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">Get Started</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">Ready to Experience the Difference?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-gray-300">
            Book your appointment today and see why our customers trust us with their vehicles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book" 
              className="bg-primary text-white px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-primary-dark transition-all shadow-[0_0_20px_rgba(210,31,60,0.3)] hover:shadow-[0_0_30px_rgba(210,31,60,0.5)] transform hover:-translate-y-0.5"
            >
              Book Now
            </Link>
            <Link 
              href="/contact" 
              className="border border-white/20 text-white px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-white/5 transition-all transform hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>
        </div>
        
        <div className="absolute left-1/4 top-1/3 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute right-1/4 bottom-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
      </section>
    </div>
  );
}