"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Script from "next/script";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState({
    signature: "interior",
    diamond: "interior",
    basic: "interior"
  });

  const handleTabChange = (packageName: string, tabName: string) => {
    setActiveTab(prev => ({
      ...prev,
      [packageName]: tabName
    }));
  };

  const detailingServices = [
    {
      "@type": "Service",
      "name": "The Signature Detail Package",
      "description": "Complete interior and exterior detail including deep vacuum, steam cleaning, paint decontamination, and 6-8 month sealant.",
      "serviceType": "Car Detailing",
      "provider": { "@type": "LocalBusiness", "name": "Luke's Mobile Detailing" },
      "serviceOutput": { "@type": "Thing", "name": "Detailed vehicle with 6-8 month paint protection" },
      "estimatedDuration": "PT4H"
    },
    {
      "@type": "Service",
      "name": "The Diamond Detail Package",
      "description": "Premium interior and exterior detailing with heated extraction, leather conditioning, clay bar treatment, ceramic wax, and light polish.",
      "serviceType": "Premium Car Detailing",
      "provider": { "@type": "LocalBusiness", "name": "Luke's Mobile Detailing" },
      "serviceOutput": { "@type": "Thing", "name": "Premium detailed vehicle with ceramic infused wax protection" },
      "estimatedDuration": "PT5H30M"
    },
    {
      "@type": "Service",
      "name": "The Basic Detail Package",
      "description": "Essential interior and exterior detail with vacuum, wipe down of surfaces, foam wash, and tire shine.",
      "serviceType": "Basic Car Detailing",
      "provider": { "@type": "LocalBusiness", "name": "Luke's Mobile Detailing" },
      "serviceOutput": { "@type": "Thing", "name": "Clean and refreshed vehicle" },
      "estimatedDuration": "PT2H30M"
    },
    {
      "@type": "Service",
      "name": "The Full Interior Package",
      "description": "Comprehensive interior detailing with deep vacuum, steam cleaning of surfaces, UV protectant application, and air freshener.",
      "serviceType": "Interior Car Detailing",
      "provider": { "@type": "LocalBusiness", "name": "Luke's Mobile Detailing" },
      "serviceOutput": { "@type": "Thing", "name": "Thoroughly cleaned and protected vehicle interior" },
      "estimatedDuration": "PT3H"
    },
    {
      "@type": "Service",
      "name": "The Full Exterior Package",
      "description": "Complete exterior detailing with foam wash, paint decontamination, wheel cleaning, window cleaning, and 6-8 month sealant.",
      "serviceType": "Exterior Car Detailing",
      "provider": { "@type": "LocalBusiness", "name": "Luke's Mobile Detailing" },
      "serviceOutput": { "@type": "Thing", "name": "Professionally cleaned and protected vehicle exterior" },
      "estimatedDuration": "PT2H"
    }
  ];

  const serviceCategories = [
    {
      "@type": "Service", "name": "Interior Detailing",
      "description": "Complete interior cleaning services including vacuuming, steam cleaning, and surface treatments.",
      "serviceType": "Car Interior Cleaning",
      "provider": { "@type": "LocalBusiness", "name": "Luke's Mobile Detailing" },
      "areaServed": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": "39.1404", "longitude": "-121.6169" }, "geoRadius": "40" }
    },
    {
      "@type": "Service", "name": "Exterior Detailing",
      "description": "Exterior cleaning services including wash, polish, paint correction, and protective coatings.",
      "serviceType": "Car Exterior Cleaning",
      "provider": { "@type": "LocalBusiness", "name": "Luke's Mobile Detailing" },
      "areaServed": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": "39.1404", "longitude": "-121.6169" }, "geoRadius": "40" }
    },
    {
      "@type": "Service", "name": "Paint Correction",
      "description": "Professional paint correction to remove swirls, scratches, and imperfections.",
      "serviceType": "Car Paint Restoration",
      "provider": { "@type": "LocalBusiness", "name": "Luke's Mobile Detailing" }
    },
    {
      "@type": "Service", "name": "Ceramic Coating",
      "description": "Long-lasting ceramic coating protection for your vehicle's paint.",
      "serviceType": "Car Paint Protection",
      "provider": { "@type": "LocalBusiness", "name": "Luke's Mobile Detailing" }
    },
    {
      "@type": "Service", "name": "Mobile Detailing",
      "description": "Professional car detailing services that come to your location in Yuba City, Marysville, and surrounding areas.",
      "serviceType": "Mobile Car Detailing",
      "provider": { "@type": "LocalBusiness", "name": "Luke's Mobile Detailing" },
      "areaServed": [
        { "@type": "City", "name": "Yuba City", "address": { "@type": "PostalAddress", "addressRegion": "CA" } },
        { "@type": "City", "name": "Marysville", "address": { "@type": "PostalAddress", "addressRegion": "CA" } },
        { "@type": "City", "name": "Live Oak", "address": { "@type": "PostalAddress", "addressRegion": "CA" } },
        { "@type": "City", "name": "Olivehurst", "address": { "@type": "PostalAddress", "addressRegion": "CA" } }
      ]
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const toggleFaq = (index: number) => { setOpenFaq(openFaq === index ? null : index); };

  const faqItems = [
    { question: "How long does a typical detailing service take?", answer: "Service times vary based on the package and vehicle condition. The Basic package typically takes 2-3 hours, the Premium package 3-4 hours, and the Signature package 4-5 hours. Additional services may extend these times." },
    { question: "What's included in each package?", answer: "Our Basic package includes exterior wash, tire shine, and basic interior cleaning. The Premium package adds interior deep cleaning, leather conditioning, and paint decontamination. The Signature package includes everything plus paint correction, ceramic coating, and premium wax application." },
    { question: "Do I need to be present during the service?", answer: "No, you don't need to be present during the service. We just need access to your vehicle and a water source. Many customers provide access and go about their day while we work." },
    { question: "What areas do you service?", answer: "We service Yuba City, Marysville, Live Oak, Olivehurst, Linda, Gridley, Sutter, Plumas Lake, and surrounding areas within a 25-mile radius. If you're unsure if we serve your area, please contact us to check." },
    { question: "What forms of payment do you accept?", answer: "We accept all major credit cards, debit cards, cash, and mobile payment options like Venmo and Cash App. Payment is required upon completion of service." }
  ];

  const CheckItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start">
      <span className="material-symbols-outlined text-primary text-xl flex-shrink-0 mr-3 mt-0.5">check_circle</span>
      <span className="text-gray-200">{children}</span>
    </li>
  );

  const DurationItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start border-t border-white/10 pt-3 mt-3">
      <span className="material-symbols-outlined text-gray-500 text-xl flex-shrink-0 mr-3 mt-0.5">schedule</span>
      <span className="text-gray-300">{children}</span>
    </li>
  );

  const CheckItemDark = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start">
      <span className="material-symbols-outlined text-primary text-xl flex-shrink-0 mr-3 mt-0.5">verified</span>
      <span className="text-gray-800">{children}</span>
    </li>
  );

  const DurationItemDark = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start border-t border-black/10 pt-3 mt-3">
      <span className="material-symbols-outlined text-gray-400 text-xl flex-shrink-0 mr-3 mt-0.5">schedule</span>
      <span className="text-gray-500">{children}</span>
    </li>
  );

  return (
    <div className="bg-black text-gray-100">
      {/* Schema.org markup */}
      <Script id="schema-services-page" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", "itemListElement": detailingServices.map((service, index) => ({ "@type": "ListItem", "position": index + 1, "item": service })) }) }} />
      <Script id="schema-service-categories" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", "itemListElement": serviceCategories.map((category, index) => ({ "@type": "ListItem", "position": index + 1, "item": category })) }) }} />

      {/* Header */}
      <section className="relative text-white min-h-[585px] md:min-h-[715px]">
        <div className="absolute inset-0 z-0">
          <Image src="/Images/webPhotos/servicesBanner.jpg" alt="Car detailing services" fill priority className="object-cover" style={{ objectPosition: "center 90%" }} />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 z-[1]" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,0.95) 95%, rgba(0,0,0,1) 100%)' }} />
        </div>
        <div className="container-custom relative z-10 pt-32 md:pt-40 pb-32 md:pb-48 flex flex-col min-h-[585px] md:min-h-[715px]">
          <div className="max-w-3xl mx-auto text-center flex-1 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">What We Offer</p>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 text-white tracking-tight">Our Detailing Services</h1>
            <Link href="/contact" className="inline-block border border-white/20 text-white px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-white/5 transition-all mx-auto">
              Free Quote or Custom Detail?
            </Link>
          </div>
        </div>
        <div className="curved-divider hero-services-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
            <defs><linearGradient id="hero-services-page-gradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4"></stop><stop offset="100%" stopColor="#000000" stopOpacity="1"></stop></linearGradient></defs>
            <path fill="url(#hero-services-page-gradient)" d="M0,128 C480,0 960,160 1440,80 L1440,160 L0,160 Z"></path>
          </svg>
        </div>
      </section>

      {/* Packages Overview */}
      <section className="py-12 md:py-20 bg-[#0A0A0A]">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">Packages</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Choose Your Detail</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* The Signature Package */}
            <div className="group bg-white text-black relative overflow-hidden transform md:-translate-y-4 shadow-2xl flex flex-col h-full border-t-4 border-primary">
              <div className="absolute top-0 right-0 p-6 opacity-5 font-display font-black text-8xl text-black select-none">01</div>
              <div className="relative z-10 p-5 sm:p-8 flex flex-col h-full">
                <div className="mb-6">
                  <div className="bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 inline-block mb-4 rounded-full">Most Popular</div>
                  <h3 className="text-3xl font-display italic text-black mb-2">The Signature</h3>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Interior & Exterior Detail</p>
                </div>
                <div className="w-full h-px bg-black/10 mb-6" />
                <div className="flex border-b border-black/10 mb-4">
                  <button className={`py-2 px-4 font-bold text-xs uppercase tracking-widest transition-colors ${activeTab.signature === "interior" ? "border-b-2 border-primary text-primary" : "text-gray-400 hover:text-gray-600"}`} onClick={() => handleTabChange("signature", "interior")}>Interior</button>
                  <button className={`py-2 px-4 font-bold text-xs uppercase tracking-widest transition-colors ${activeTab.signature === "exterior" ? "border-b-2 border-primary text-primary" : "text-gray-400 hover:text-gray-600"}`} onClick={() => handleTabChange("signature", "exterior")}>Exterior</button>
                </div>
                <div className="flex-1">
                  <div className={activeTab.signature === "interior" ? "block" : "hidden"}>
                    <ul className="space-y-3 mb-6">
                      <CheckItemDark>Full interior deep vacuum</CheckItemDark>
                      <CheckItemDark>Wipe down of all surfaces</CheckItemDark>
                      <CheckItemDark>Steam cleaning of cracks & crevices vinyl</CheckItemDark>
                      <CheckItemDark>Inside screens windows</CheckItemDark>
                      <CheckItemDark>Application of P&S interior UV protectant</CheckItemDark>
                      <CheckItemDark>Final touch up&apos;s & vacuum</CheckItemDark>
                      <CheckItemDark>Air freshener</CheckItemDark>
                      <DurationItemDark>Duration: 4 hours</DurationItemDark>
                    </ul>
                  </div>
                  <div className={activeTab.signature === "exterior" ? "block" : "hidden"}>
                    <ul className="space-y-3 mb-6">
                      <CheckItemDark>Full vehicle pre rinse</CheckItemDark>
                      <CheckItemDark>Foam wash</CheckItemDark>
                      <CheckItemDark>Wheels & wheel wells</CheckItemDark>
                      <CheckItemDark>Tires</CheckItemDark>
                      <CheckItemDark>Paint decontamination</CheckItemDark>
                      <CheckItemDark>Full dry down & light polish</CheckItemDark>
                      <CheckItemDark>Windows</CheckItemDark>
                      <CheckItemDark>Tire shine</CheckItemDark>
                      <CheckItemDark>6-8 month sealant</CheckItemDark>
                      <DurationItemDark>Duration: 4 hours</DurationItemDark>
                    </ul>
                  </div>
                </div>
                <Link href="/book?service=signature" className="w-full bg-primary text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-primary-dark transition-all duration-300 flex justify-center items-center gap-2 shadow-lg hover:shadow-xl mt-4">
                  Select Package <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* The Diamond Package */}
            <div className="group bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all duration-500 relative overflow-hidden flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />
              <div className="absolute top-0 right-0 p-6 opacity-10 font-display font-black text-8xl text-white group-hover:text-primary transition-colors duration-500 select-none">02</div>
              <div className="relative z-10 p-5 sm:p-8 flex flex-col h-full">
                <div className="mb-6">
                  <div className="bg-black text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 inline-block mb-4 rounded-full">Showroom Ready</div>
                  <h3 className="text-3xl font-display italic text-white mb-2 group-hover:text-primary transition-colors">The Diamond</h3>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Interior & Exterior Detail</p>
                </div>
                <div className="w-full h-px bg-white/10 mb-6 group-hover:bg-primary/30 transition-colors" />
                <div className="flex border-b border-white/10 mb-4">
                  <button className={`py-2 px-4 font-bold text-xs uppercase tracking-widest transition-colors ${activeTab.diamond === "interior" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-300"}`} onClick={() => handleTabChange("diamond", "interior")}>Interior</button>
                  <button className={`py-2 px-4 font-bold text-xs uppercase tracking-widest transition-colors ${activeTab.diamond === "exterior" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-300"}`} onClick={() => handleTabChange("diamond", "exterior")}>Exterior</button>
                </div>
                <div className="flex-1">
                  <div className={activeTab.diamond === "interior" ? "block" : "hidden"}>
                    <ul className="space-y-3 mb-6">
                      <CheckItem>Full interior deep vacuum</CheckItem>
                      <CheckItem>Wipe down of all surfaces</CheckItem>
                      <CheckItem>Heated shampoo extraction of seats and carpets</CheckItem>
                      <CheckItem>Steam cleaning of cracks & crevices vinyl</CheckItem>
                      <CheckItem>Inside screens windows</CheckItem>
                      <CheckItem>Application of P&S interior UV protectant</CheckItem>
                      <CheckItem>Leather and vinyl conditioning</CheckItem>
                      <CheckItem>Final touch up&apos;s & vacuum</CheckItem>
                      <CheckItem>Air freshener</CheckItem>
                      <DurationItem>Duration: 5.5 hours</DurationItem>
                    </ul>
                  </div>
                  <div className={activeTab.diamond === "exterior" ? "block" : "hidden"}>
                    <ul className="space-y-3 mb-6">
                      <CheckItem>Full vehicle pre rinse</CheckItem>
                      <CheckItem>Foam wash</CheckItem>
                      <CheckItem>Wheels & wheel wells</CheckItem>
                      <CheckItem>Tires</CheckItem>
                      <CheckItem>Paint decontamination</CheckItem>
                      <CheckItem>Undercarriage wash</CheckItem>
                      <CheckItem>Clay bar treatment</CheckItem>
                      <CheckItem>Machine applied ceramic infused wax</CheckItem>
                      <CheckItem>Full dry down & light polish</CheckItem>
                      <CheckItem>Windows</CheckItem>
                      <CheckItem>Tire shine</CheckItem>
                      <DurationItem>Duration: 5.5 hours</DurationItem>
                    </ul>
                  </div>
                </div>
                <Link href="/book?service=diamond" className="w-full border border-white/20 bg-transparent text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-primary hover:border-primary transition-all duration-300 flex justify-center items-center gap-2 group-hover:shadow-[0_0_15px_rgba(210,31,60,0.3)] mt-4">
                  Select Package <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* The Basic Package */}
            <div className="group bg-zinc-900/50 border border-white/5 hover:border-gray-500/50 transition-all duration-500 relative overflow-hidden flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />
              <div className="absolute top-0 right-0 p-6 opacity-10 font-display font-black text-8xl text-white select-none">03</div>
              <div className="relative z-10 p-5 sm:p-8 flex flex-col h-full">
                <div className="mb-6">
                  <div className="bg-gray-800 text-gray-300 text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 inline-block mb-4 rounded-full">Maintenance</div>
                  <h3 className="text-3xl font-display italic text-white mb-2">The Basic</h3>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Interior & Exterior Detail</p>
                </div>
                <div className="w-full h-px bg-white/10 mb-6 group-hover:bg-gray-500/30 transition-colors" />
                <div className="flex border-b border-white/10 mb-4">
                  <button className={`py-2 px-4 font-bold text-xs uppercase tracking-widest transition-colors ${activeTab.basic === "interior" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-300"}`} onClick={() => handleTabChange("basic", "interior")}>Interior</button>
                  <button className={`py-2 px-4 font-bold text-xs uppercase tracking-widest transition-colors ${activeTab.basic === "exterior" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-300"}`} onClick={() => handleTabChange("basic", "exterior")}>Exterior</button>
                </div>
                <div className="flex-1">
                  <div className={activeTab.basic === "interior" ? "block" : "hidden"}>
                    <ul className="space-y-3 mb-6">
                      <CheckItem>Full interior vacuum</CheckItem>
                      <CheckItem>Wipe down of all surfaces</CheckItem>
                      <CheckItem>Inside screens windows</CheckItem>
                      <CheckItem>Air freshener</CheckItem>
                      <DurationItem>Duration: 2.5 hours</DurationItem>
                    </ul>
                  </div>
                  <div className={activeTab.basic === "exterior" ? "block" : "hidden"}>
                    <ul className="space-y-3 mb-6">
                      <CheckItem>Foam wash</CheckItem>
                      <CheckItem>Wheels cleaned</CheckItem>
                      <CheckItem>Tires</CheckItem>
                      <CheckItem>Full dry down</CheckItem>
                      <CheckItem>Windows</CheckItem>
                      <CheckItem>Tire shine</CheckItem>
                      <DurationItem>Duration: 2.5 hours</DurationItem>
                    </ul>
                  </div>
                </div>
                <Link href="/book?service=basic" className="w-full border border-white/20 bg-transparent text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 flex justify-center items-center gap-2 mt-4">
                  Select Package <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* The Full Interior Package */}
            <div className="group bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all duration-500 relative overflow-hidden flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />
              <div className="absolute top-0 right-0 p-6 opacity-10 font-display font-black text-8xl text-white select-none">04</div>
              <div className="relative z-10 p-5 sm:p-8 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-3xl font-display italic text-white mb-2 group-hover:text-primary transition-colors">The Full Interior</h3>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Interior Detail</p>
                </div>
                <div className="w-full h-px bg-white/10 mb-6 group-hover:bg-primary/30 transition-colors" />
                <div className="flex-1">
                  <ul className="space-y-3 mb-6">
                    <CheckItem>Full interior deep vacuum</CheckItem>
                    <CheckItem>Wipe down of all surfaces</CheckItem>
                    <CheckItem>Steam cleaning of cup holders, vinyl, air vents & floor mats</CheckItem>
                    <CheckItem>Inside screens windows</CheckItem>
                    <CheckItem>Application of P&S interior UV protectant</CheckItem>
                    <CheckItem>Final touch up&apos;s & double vacuum</CheckItem>
                    <CheckItem>Air freshener & business card to finish it off!</CheckItem>
                    <DurationItem>Duration: 3 hours</DurationItem>
                  </ul>
                </div>
                <Link href="/book?service=fullinterior" className="w-full border border-white/20 bg-transparent text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-primary hover:border-primary transition-all duration-300 flex justify-center items-center gap-2 group-hover:shadow-[0_0_15px_rgba(210,31,60,0.3)] mt-4">
                  Select Package <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* The Full Exterior Package */}
            <div className="group bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all duration-500 relative overflow-hidden flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />
              <div className="absolute top-0 right-0 p-6 opacity-10 font-display font-black text-8xl text-white select-none">05</div>
              <div className="relative z-10 p-5 sm:p-8 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-3xl font-display italic text-white mb-2 group-hover:text-primary transition-colors">The Full Exterior</h3>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Exterior Detail</p>
                </div>
                <div className="w-full h-px bg-white/10 mb-6 group-hover:bg-primary/30 transition-colors" />
                <div className="flex-1">
                  <ul className="space-y-3 mb-6">
                    <CheckItem>Rinse of entire car/truck</CheckItem>
                    <CheckItem>Foam wash</CheckItem>
                    <CheckItem>Wheels & tires</CheckItem>
                    <CheckItem>Bug/road debris removed</CheckItem>
                    <CheckItem>Paint decontamination</CheckItem>
                    <CheckItem>Drying of entire vehicle</CheckItem>
                    <CheckItem>Windows cleaned</CheckItem>
                    <CheckItem>Steam cleaning of wheel wells & rims</CheckItem>
                    <CheckItem>6-8 month sealant</CheckItem>
                    <DurationItem>Duration: 2 hours</DurationItem>
                  </ul>
                </div>
                <Link href="/book?service=fullexterior" className="w-full border border-white/20 bg-transparent text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-primary hover:border-primary transition-all duration-300 flex justify-center items-center gap-2 group-hover:shadow-[0_0_15px_rgba(210,31,60,0.3)] mt-4">
                  Select Package <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-28 bg-[#111] relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">How It Works</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">Our Detailing Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We follow a meticulous process to ensure your vehicle receives the highest quality detailing service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "1", title: "Assessment", desc: "We thoroughly inspect your vehicle to identify specific areas that need attention and determine the best approach.", icon: "search" },
              { num: "2", title: "Preparation", desc: "We prepare the appropriate tools, equipment, and premium products specifically selected for your vehicle.", icon: "build" },
              { num: "3", title: "Execution", desc: "We carefully perform each step of the detailing process with precision and attention to detail.", icon: "auto_awesome" }
            ].map((step) => (
              <div key={step.num} className="bg-zinc-900 rounded-sm p-6 sm:p-8 shadow-lg border border-white/10 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden">
                <span className="absolute top-4 right-4 text-2xl font-display font-bold text-primary">{step.num}</span>
                <span className="material-symbols-outlined text-primary text-3xl mb-4 block">{step.icon}</span>
                <h3 className="text-xl font-display font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="absolute left-10 top-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute right-10 bottom-1/4 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-28 bg-[#0A0A0A] relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">FAQ</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Have questions about our services? Find answers to common questions below.
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
    </div>
  );
}