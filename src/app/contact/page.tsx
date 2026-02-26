"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ServiceAreaMap from "@/components/ServiceAreaMap";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => { setOpenFaq(openFaq === index ? null : index); };

  const faqItems = [
    { question: "How do I schedule a detailing service?", answer: "You can easily book through our online booking system or call us directly. We'll confirm your appointment within 24 hours." },
    { question: "What should I do to prepare for my appointment?", answer: "Please remove all personal belongings from your vehicle before the service. We'll need access to your vehicle and a water source. If possible, park in a shaded area or garage." },
    { question: "What if I need to reschedule my appointment?", answer: "We understand plans can change. Please give us at least 24 hours notice if you need to reschedule. You can call us or use our online booking system to select a new time." },
    { question: "Do you offer any guarantees?", answer: "Yes! We stand behind our work with a 100% satisfaction guarantee. If you're not completely satisfied with any aspect of our service, we'll make it right at no additional cost." }
  ];

  return (
    <div className="bg-black text-gray-100">
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
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">Reach Out</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 text-white tracking-tight">Contact Us</h1>
            <p className="text-base sm:text-xl max-w-2xl mx-auto text-gray-300">
              Looking for a free quote or a custom detail? <br className="hidden sm:block" /> Give us a call or send us a message today!
            </p>
          </div>
        </div>
        
        <div className="curved-divider hero-services-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hero-contact-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4"></stop>
                <stop offset="100%" stopColor="#000000" stopOpacity="1"></stop>
              </linearGradient>
            </defs>
            <path fill="url(#hero-contact-gradient)" d="M0,128 C480,0 960,160 1440,80 L1440,160 L0,160 Z"></path>
          </svg>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 md:py-28 bg-[#0A0A0A] relative overflow-hidden">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">Get In Touch</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">How to Reach Us</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                We&apos;re here to help! Reach out to us through any of the methods below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-zinc-900/80 backdrop-blur-sm rounded-sm p-6 sm:p-8 border border-white/10 hover:border-primary/20 transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-sm">call</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl mb-3 text-white">Phone</h3>
                    <a href="tel:(530)650-3631" className="text-primary hover:text-primary-dark transition-colors text-lg font-medium">
                      (530) 650-3631
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/80 backdrop-blur-sm rounded-sm p-6 sm:p-8 border border-white/10 hover:border-primary/20 transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-sm">mail</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl mb-3 text-white">Email</h3>
                    <a href="mailto:luke8888z@gmail.com" className="text-primary hover:text-primary-dark transition-colors text-lg font-medium break-all">
                      luke8888z@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/80 backdrop-blur-sm rounded-sm p-6 sm:p-8 border border-white/10 hover:border-primary/20 transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-xl mb-3 text-white">Business Hours</h3>
                    <ul className="text-gray-300 space-y-3 text-lg">
                      <li className="flex flex-col gap-1">
                        <span className="font-medium text-gray-200">Monday - Saturday:</span>
                        <span className="text-gray-300">7:00 AM - 8:00 PM</span>
                      </li>
                      <li className="flex flex-col gap-1">
                        <span className="font-medium text-gray-200">Sunday:</span>
                        <span className="text-gray-300">Closed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900/80 backdrop-blur-sm rounded-sm p-6 sm:p-8 border border-white/10 hover:border-primary/20 transition-all duration-300 group">
                <div className="flex items-start">
                  <div className="flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-bold text-xl mb-3 text-white">Service Area</h3>
                    <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                      We serve Yuba City, Marysville, Meridian, Live Oak, Olivehurst, Linda, Gridley, Sutter, Plumas Lake, and surrounding areas.
                    </p>
                    <Link 
                      href="/about#service-area" 
                      className="text-primary hover:text-primary-dark text-sm font-bold uppercase tracking-widest inline-flex items-center gap-2 transition-colors duration-300"
                    >
                      <span>View Service Area Map</span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute left-10 top-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute right-10 bottom-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
        </div>
      </section>

      {/* Social Media - Mobile Only */}
      <section className="md:hidden bg-black py-8">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold mb-6">Follow Us</p>
            <div className="flex justify-center gap-6">
              <a href="https://www.facebook.com/lukemobiledetailing/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="https://www.instagram.com/lukesmobiledetailingllc/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
              <a href="https://tiktok.com/@lukesmobiledetailing" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="py-20 md:py-28 bg-[#111] relative overflow-hidden" id="service-area">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">Coverage</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">Our Service Area</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                We provide mobile detailing services throughout Yuba City, Marysville, Meridian, Live Oak, Olivehurst, Linda, Gridley, Sutter, Plumas Lake, and surrounding areas in California.
              </p>
            </div>
            
            <div className="bg-zinc-900 rounded-sm p-0 h-[500px] md:h-[600px] overflow-hidden border border-white/10 hover:border-primary/20 transition-all duration-300">
              <ServiceAreaMap className="rounded-sm" />
            </div>
          </div>
          
          <div className="absolute left-1/4 top-1/3 w-24 h-24 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute right-1/4 bottom-1/4 w-32 h-32 bg-primary/8 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-[#0A0A0A] relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">FAQ</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Still have questions? Here are some common inquiries about our services.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {faqItems.map((item, index) => (
              <div key={index} className="mb-4 bg-zinc-900/80 backdrop-blur-sm rounded-sm border border-white/10 overflow-hidden group hover:border-primary/20 transition-all duration-300">
                <button
                  className="flex justify-between items-center w-full p-6 text-left text-white hover:text-primary transition-colors duration-300"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-bold pr-4">{item.question}</span>
                  <span className={`material-symbols-outlined flex-shrink-0 transition-all duration-300 ${openFaq === index ? 'rotate-180 text-primary' : 'text-gray-400'}`}>
                    expand_more
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 pt-0 border-t border-white/10">
                    <p className="text-gray-300 leading-relaxed text-lg">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute left-1/4 top-1/3 w-24 h-24 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute right-1/4 bottom-1/4 w-32 h-32 bg-primary/8 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-28 bg-[#111] border-t border-white/5 relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">Book Today</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">Ready to Book Your Detailing Service?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-gray-300">
            Don&apos;t wait to restore your vehicle to its showroom shine. Book your appointment today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book" 
              className="bg-primary text-white px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-primary-dark transition-all shadow-[0_0_20px_rgba(210,31,60,0.3)] hover:shadow-[0_0_30px_rgba(210,31,60,0.5)] transform hover:-translate-y-0.5"
            >
              Book Now
            </Link>
            <Link 
              href="/services" 
              className="border border-white/20 text-white px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-white/5 transition-all transform hover:-translate-y-0.5"
            >
              View Services
            </Link>
          </div>
        </div>
        
        <div className="absolute left-1/4 top-1/3 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute right-1/4 bottom-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
      </section>
    </div>
  );
}