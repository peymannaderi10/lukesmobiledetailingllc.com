"use client";

import { useState } from "react";
import Link from "next/link";
import { EnvelopeIcon, PhoneIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import ServiceAreaMap from "@/components/ServiceAreaMap";

export default function ContactPage() {
  // State for FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Toggle FAQ accordion
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // FAQ data
  const faqItems = [
    {
      question: "How do I schedule a detailing service?",
      answer: "You can easily book through our online booking system or call us directly. We'll confirm your appointment within 24 hours."
    },
    {
      question: "What should I do to prepare for my appointment?",
      answer: "Please remove all personal belongings from your vehicle before the service. We'll need access to your vehicle and a water source. If possible, park in a shaded area or garage."
    },
    {
      question: "What if I need to reschedule my appointment?",
      answer: "We understand plans can change. Please give us at least 24 hours notice if you need to reschedule. You can call us or use our online booking system to select a new time."
    },
    {
      question: "Do you offer any guarantees?",
      answer: "Yes! We stand behind our work with a 100% satisfaction guarantee. If you're not completely satisfied with any aspect of our service, we'll make it right at no additional cost."
    }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative text-white min-h-[585px] md:min-h-[715px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Images/webPhotos/contactBanner.png"
            alt="Contact Us Banner"
            fill
            className="object-cover"
            priority
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
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">Contact Us</h1>
            <p className="text-xl max-w-2xl mx-auto text-white">
              Looking for a free quote or a custom detail? <br></br> Give us a call or send us a message today!
            </p>
          </div>
        </div>
        
        {/* Curved Divider */}
        <div className="curved-divider hero-services-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hero-contact-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4"></stop>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1"></stop>
              </linearGradient>
            </defs>
            <path fill="url(#hero-contact-gradient)" d="M0,128 C480,0 960,160 1440,80 L1440,160 L0,160 Z"></path>
          </svg>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Get In Touch</h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                We're here to help! Reach out to us through any of the methods below.
              </p>
            </div>

            {/* Contact Cards - Desktop: 2 columns, Mobile: 1 column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <PhoneIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-gray-900">Phone</h3>
                    <a 
                      href="tel:(530)650-3631" 
                      className="text-primary hover:text-primary-dark transition-colors text-lg font-medium"
                    >
                      (530) 650-3631
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <EnvelopeIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-gray-900">Email</h3>
                    <a 
                      href="mailto:luke8888z@gmail.com" 
                      className="text-primary hover:text-primary-dark transition-colors text-lg font-medium break-all"
                    >
                      luke8888z@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <ClockIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xl mb-3 text-gray-900">Business Hours</h3>
                    <ul className="text-gray-700 space-y-3 text-lg">
                      <li className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                        <span className="font-medium text-gray-800">Monday - Saturday:</span>
                        <span className="text-gray-700">7:00 AM - 8:00 PM</span>
                      </li>
                      <li className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
                        <span className="font-medium text-gray-800">Sunday:</span>
                        <span className="text-gray-700">Closed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="mr-4 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <MapPinIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xl mb-3 text-gray-900">Service Area</h3>
                    <p className="text-gray-700 mb-4 text-lg leading-relaxed">
                      We serve Yuba City, Marysville, Meridian, Live Oak, Olivehurst, Linda, Gridley, Sutter, Plumas Lake, and surrounding areas in California.
                    </p>
                    <Link 
                      href="/about#service-area" 
                      className="text-primary hover:text-primary-dark text-lg font-medium inline-flex items-center gap-2 transition-colors duration-300 group-hover:gap-3"
                    >
                      <span>View Service Area Map</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute left-10 top-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute right-10 bottom-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
        </div>
      </section>

      {/* Social Media - Mobile Only */}
      <section className="md:hidden bg-white">
        <div className="container-custom">
          <div className="text-center">
            <div className="flex justify-center gap-8">
              <a
                href="https://www.facebook.com/lukemobiledetailing/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/lukesmobiledetailingllc/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@lukesmobiledetailing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark transition-colors duration-300"
                aria-label="TikTok"
              >
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden" id="service-area">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our Service Area</h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                We provide mobile detailing services throughout Yuba City, Marysville, Meridian, Live Oak, Olivehurst, Linda, Gridley, Sutter, Plumas Lake, and surrounding areas in California.
              </p>
            </div>
            
            {/* Right side - Map */}
            <div className="bg-white rounded-xl p-0 h-[500px] md:h-[600px] overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
              <ServiceAreaMap className="rounded-xl" />
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute left-1/4 top-1/3 w-24 h-24 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute right-1/4 bottom-1/4 w-32 h-32 bg-primary/8 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Still have questions? Here are some common inquiries about our services.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {faqItems.map((item, index) => (
              <div key={index} className="mb-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <button
                  className="flex justify-between items-center w-full p-6 text-left text-gray-900 hover:text-primary transition-colors duration-300 group-hover:bg-white/50"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg md:text-xl font-semibold pr-4">{item.question}</span>
                  <svg
                    className={`w-6 h-6 flex-shrink-0 transition-all duration-300 ${openFaq === index ? 'rotate-180 text-primary' : 'text-gray-400 group-hover:text-primary'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 pt-0 border-t border-white/20">
                    <p className="text-gray-700 leading-relaxed text-lg">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Decorative elements */}
          <div className="absolute left-1/4 top-1/3 w-24 h-24 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute right-1/4 bottom-1/4 w-32 h-32 bg-primary/8 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-primary to-primary/90 text-white relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to Book Your Detailing Service?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-white">
            Don't wait to restore your vehicle to its showroom shine. Book your appointment today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://app.squareup.com/appointments/buyer/widget/hs7hvrxqk38fag/L51SWV5N7VVBD" 
              className="btn bg-white text-primary hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Book Now
            </Link>
            <Link 
              href="/services" 
              className="btn bg-transparent border-2 border-white hover:bg-white/10 font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              View Services
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