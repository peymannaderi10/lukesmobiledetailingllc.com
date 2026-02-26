"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { SERVICES, SERVICE_INCLUDES } from "@/lib/pricing";
import type { ServiceKey } from "@/lib/pricing";
import Script from "next/script";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ServiceAreaMap from "@/components/ServiceAreaMap";

const reviewsRow1 = [
  { text: "I contacted Luke about detailing my plane. He was right on time, did an excellent job, and I was very impressed with how hard he worked and all the professional products he used.", author: "Carin Batham" },
  { text: "First time getting my car detailed by Luke. He showed up on time with a 100 gallon water tank and his own generator. Extremely professional and clean.", author: "Shahan Ali" },
  { text: "I couldn't be happier! Luke showed up right on time and was ready to work. His pricing is very fair, especially considering the amazing quality of his work.", author: "Mark Hernandez" },
  { text: "I booked the Signature Detail Wash for my BMW, and I'm seriously impressed. Every inch of my car was spotless. Punctual, professional, and came fully prepared.", author: "Omar Gonzalez" },
];

const reviewsRow2 = [
  { text: "Luke did an incredible job on four different vehicles for our household. I was blown away by the attention to detail. His prices are incredibly reasonable.", author: "Glory Albin" },
  { text: "My truck has never looked this spotless. Luke truly exceeded my expectations. Every inch of the interior and exterior was cleaned to perfection.", author: "Daniela Corona" },
  { text: "Luke did a fantastic job on my BMW X1. It looks better than when I bought it. He works hard, is courteous and shows up on time.", author: "Richard Blomberg" },
  { text: "Moto mom truck transformation! Luke showed up and worked his magic and now it's so clean I almost don't want to let the kids back in. Seriously impressive.", author: "Jondea Erisman" },
];

const SERVICE_CONFIG: { key: ServiceKey; badge: string }[] = [
  { key: "signature", badge: "Most Popular" },
  { key: "diamond", badge: "Showroom Ready" },
  { key: "basic", badge: "Maintenance" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Record<string, "interior" | "exterior">>({
    signature: "interior",
    diamond: "interior",
    basic: "interior",
  });
  const handleTabChange = (pkg: string, tab: "interior" | "exterior") => {
    setActiveTab((prev) => ({ ...prev, [pkg]: tab }));
  };
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;
    if (!row1 || !row2) return;

    let raf: number;
    let pos1 = 0;
    let pos2 = 0;
    const speed = 0.2;

    const animate = () => {
      pos1 -= speed;
      pos2 += speed;

      const w1 = row1.scrollWidth / 2;
      const w2 = row2.scrollWidth / 2;

      if (Math.abs(pos1) >= w1) pos1 = 0;
      if (pos2 >= w2) pos2 = 0;

      row1.style.transform = `translateX(${pos1}px)`;
      row2.style.transform = `translateX(${-w2 + pos2}px)`;

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const servicesData = [
    {
      "@type": "Service",
      name: "The Signature Detail",
      description: "Full interior and exterior detail with steam cleaning, leather conditioning, foam cannon wash, and silica sealant.",
      provider: { "@type": "LocalBusiness", name: "Luke's Mobile Detailing" },
      areaServed: { "@type": "City", name: "Yuba City" },
      offers: { "@type": "Offer", price: "255", priceCurrency: "USD" },
    },
    {
      "@type": "Service",
      name: "The Diamond Detail",
      description: "Premium detail including clay bar treatment, 1-step paint correction, 6-month ceramic sealant, and engine bay detail.",
      provider: { "@type": "LocalBusiness", name: "Luke's Mobile Detailing" },
      areaServed: { "@type": "City", name: "Yuba City" },
      offers: { "@type": "Offer", price: "495", priceCurrency: "USD" },
    },
    {
      "@type": "Service",
      name: "The Standard Detail",
      description: "Essential maintenance including interior vacuum, surface wipe down, hand wash, and tire dressing.",
      provider: { "@type": "LocalBusiness", name: "Luke's Mobile Detailing" },
      areaServed: { "@type": "City", name: "Yuba City" },
      offers: { "@type": "Offer", price: "185", priceCurrency: "USD" },
    },
  ];

  return (
    <div className="bg-black text-gray-100 font-body">
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: servicesData.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: service,
            })),
          }),
        }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What areas does Luke's Mobile Detailing serve?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We serve Yuba City, Marysville, Live Oak, Olivehurst, Linda, Gridley, Sutter, Plumas Lake, and surrounding areas in Northern California.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to provide water or electricity?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No! We bring our own 100-gallon water tank and generator. We are fully self-contained.",
                },
              },
            ],
          }),
        }}
      />

      {/* ===== HERO ===== */}
      <header className="relative w-full min-h-screen flex items-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Images/webPhotos/Banner.jpg"
            alt="Professional car detailing"
            fill
            priority
            className="object-cover opacity-60 scale-105 hidden md:block"
            style={{ objectPosition: "center 55%" }}
          />
          <Image
            src="/Images/webPhotos/hero2.jpg"
            alt="Professional car detailing"
            fill
            priority
            className="object-cover opacity-60 scale-105 md:hidden"
            style={{ objectPosition: "center 45%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
        </div>

        <div className="relative z-20 container mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full pt-28 pb-20 lg:pt-20">
          {/* Left Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-primary" />
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">
                Quality Mobile Detailing
              </span>
            </div>

            <div className="inline-block mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-8xl font-display font-black text-white leading-[0.9] mb-3 sm:mb-4 italic tracking-tighter drop-shadow-2xl">
                SERVICING
              </h1>
              <div className="overflow-hidden w-4/6">
                <div className="city-marquee-track inline-flex items-center gap-4 text-lg sm:text-xl lg:text-2xl text-gray-400 font-body tracking-wide whitespace-nowrap">
                  {(() => {
                    const cities = [
                      "Yuba City",
                      "Marysville",
                      "Live Oak",
                      "Olivehurst",
                      "Linda",
                      "Gridley",
                      "Sutter",
                      "Plumas Lake",
                      "Meridian",
                      "Wheatland",
                    ];
                    const row = cities.flatMap((c) => [c, "·"]).slice(0, -1);
                    return [...row, ...row].map((item, i) => (
                      <span key={i} className="inline-block shrink-0">
                        {item}
                      </span>
                    ));
                  })()}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mb-8 sm:mb-10">
              <div>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">53.0M <span className="text-primary">+</span></span>
                <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 mt-1">Views Across All Platforms</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/lukemobiledetailing/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300" aria-label="Facebook">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="https://www.instagram.com/lukesmobiledetailingllc/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300" aria-label="Instagram">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
              <a href="https://tiktok.com/@lukesmobiledetailing" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300" aria-label="TikTok">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
              </a>
            </div>
          </div>

          {/* Right: Quick Booking Form */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full z-0" />
            <div className="glassmorphism p-6 sm:p-8 w-full shadow-2xl relative z-10 rounded-sm border-t border-white/20">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/20 to-transparent rounded-tr-sm" />
              <h3 className="text-3xl font-display font-bold text-white mb-3 italic">
                Book Your Detail
              </h3>
              <div className="mb-6 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  <span className="text-white/90 text-xs font-semibold uppercase tracking-widest">
                    Limited Slots Available This Week
                  </span>
                </div>
                <p className="text-gray-500 text-[11px] tracking-wide font-body">
                  No payment required for estimate.
                </p>
              </div>
              <Link
                href="/book"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 uppercase tracking-[0.2em] text-xs transition-all duration-300 shadow-[0_4px_20px_rgba(210,31,60,0.35)] hover:shadow-[0_6px_28px_rgba(210,31,60,0.5)] flex justify-center items-center gap-2 group hover:-translate-y-0.5"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ===== SERVICES (temporarily hidden – uncomment to restore) ===== */}
      {/* <section className="py-24 bg-[#0A0A0A] relative overflow-hidden" id="services">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-900/30 -skew-x-12 transform origin-top-right translate-x-32" />
        <div className="container mx-auto px-6 lg:px-8 mb-16 relative z-10 flex flex-col lg:flex-row items-end justify-between gap-8">
          <div>
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block flex items-center gap-2">
              <span className="w-8 h-px bg-primary" /> Curated Services
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white italic leading-none">
              PRECISION <br />
              PACKAGES
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-sm leading-relaxed mb-2">
            Tailored solutions for every vehicle. From daily drivers to
            concours-ready classics, we provide the level of care your machine
            deserves.
          </p>
        </div>

        <div className="container mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 relative z-10">
          {SERVICE_CONFIG.map(({ key, badge }, idx) => {
            const svc = SERVICES[key];
            const includes = SERVICE_INCLUDES[key];
            const hasTabs = includes.interior != null && includes.exterior != null;
            const isDiamond = key === "diamond";
            const isBasic = key === "basic";

            const CheckItem = ({ children }: { children: React.ReactNode }) => (
              <li className="flex items-start">
                <span className="material-symbols-outlined text-primary text-xl flex-shrink-0 mr-3 mt-0.5">check_circle</span>
                <span className={isDiamond ? "text-gray-800" : "text-gray-200"}>{children}</span>
              </li>
            );
            const DurationItem = ({ children }: { children: React.ReactNode }) => (
              <li className={`flex items-start border-t pt-3 mt-3 ${isDiamond ? "border-black/10" : "border-white/10"}`}>
                <span className="material-symbols-outlined text-gray-500 text-xl flex-shrink-0 mr-3 mt-0.5">schedule</span>
                <span className={isDiamond ? "text-gray-600" : "text-gray-300"}>{children}</span>
              </li>
            );
            const CheckItemDark = ({ children }: { children: React.ReactNode }) => (
              <li className="flex items-start">
                <span className="material-symbols-outlined text-primary text-xl flex-shrink-0 mr-3 mt-0.5">check_circle</span>
                <span className={isDiamond ? "text-gray-800" : "text-gray-200"}>{children}</span>
              </li>
            );

            const cardClasses = isDiamond
              ? "group bg-white text-black relative overflow-hidden transform md:-translate-y-4 shadow-2xl flex flex-col h-full border-t-4 border-primary"
              : isBasic
              ? "group bg-zinc-900/50 border border-white/5 hover:border-gray-500/50 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
              : "group bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all duration-500 relative overflow-hidden flex flex-col h-full";
            const numOpacity = isDiamond ? "opacity-5" : "opacity-10";
            const numColor = isDiamond ? "text-black" : "text-white";

            return (
              <div key={key} className={cardClasses}>
                {!isDiamond && <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />}
                <div className={`absolute top-0 right-0 p-6 ${numOpacity} font-display font-black text-8xl ${numColor} select-none`}>
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="relative z-10 p-5 sm:p-8 flex flex-col h-full">
                  <div className="mb-6">
                    {badge && (
                      <div className={`text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 inline-block mb-4 rounded-full font-body not-italic ${
                        isDiamond ? "bg-black text-white" : isBasic ? "bg-gray-800 text-gray-300" : "bg-primary/10 border border-primary/20 text-primary"
                      }`}>
                        {badge}
                      </div>
                    )}
                    <h3 className={`text-3xl font-display italic mb-2 ${isDiamond ? "text-black" : "text-white group-hover:text-primary transition-colors"}`}>
                      {svc.name}
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-gray-500">{svc.description}</p>
                  </div>
                  <div className={`w-full h-px mb-6 ${isDiamond ? "bg-black/10" : "bg-white/10 group-hover:bg-primary/30 transition-colors"}`} />
                  {hasTabs ? (
                    <>
                      <div className={`flex border-b mb-4 ${isDiamond ? "border-black/10" : "border-white/10"}`}>
                        <button
                          type="button"
                          onClick={() => handleTabChange(key, "interior")}
                          className={`py-2 px-4 font-bold text-xs uppercase tracking-widest transition-colors ${activeTab[key] === "interior" ? "border-b-2 border-primary text-primary" : isDiamond ? "text-gray-400 hover:text-gray-600" : "text-gray-500 hover:text-gray-300"}`}
                        >
                          Interior
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTabChange(key, "exterior")}
                          className={`py-2 px-4 font-bold text-xs uppercase tracking-widest transition-colors ${activeTab[key] === "exterior" ? "border-b-2 border-primary text-primary" : isDiamond ? "text-gray-400 hover:text-gray-600" : "text-gray-500 hover:text-gray-300"}`}
                        >
                          Exterior
                        </button>
                      </div>
                      <div className="flex-1">
                        <div className={activeTab[key] === "interior" ? "block" : "hidden"}>
                          <ul className="space-y-3 mb-2">
                            {includes.interior!.slice(0, 4).map((item, i) => (
                              isDiamond ? <CheckItemDark key={i}>{item}</CheckItemDark> : <CheckItem key={i}>{item}</CheckItem>
                            ))}
                            <li key="more" className="flex items-start">
                              <span className="material-symbols-outlined text-primary text-xl flex-shrink-0 mr-3 mt-0.5">check_circle</span>
                              <Link href="/services" className="text-primary hover:text-primary-dark hover:underline transition-colors">
                                See full list on services page
                              </Link>
                            </li>
                          </ul>
                          <ul><DurationItem>Duration: {svc.baseDuration} hours</DurationItem></ul>
                        </div>
                        <div className={activeTab[key] === "exterior" ? "block" : "hidden"}>
                          <ul className="space-y-3 mb-2">
                            {includes.exterior!.slice(0, 4).map((item, i) => (
                              isDiamond ? <CheckItemDark key={i}>{item}</CheckItemDark> : <CheckItem key={i}>{item}</CheckItem>
                            ))}
                            <li key="more" className="flex items-start">
                              <span className="material-symbols-outlined text-primary text-xl flex-shrink-0 mr-3 mt-0.5">check_circle</span>
                              <Link href="/services" className="text-primary hover:text-primary-dark hover:underline transition-colors">
                                See full list on services page
                              </Link>
                            </li>
                          </ul>
                          <ul><DurationItem>Duration: {svc.baseDuration} hours</DurationItem></ul>
                        </div>
                      </div>
                    </>
                  ) : null}
                  <Link
                    href={`/book?service=${key}`}
                    className={`w-full py-4 font-bold uppercase tracking-widest text-xs transition-all duration-300 flex justify-center items-center gap-2 mt-4 ${
                      isDiamond
                        ? "bg-primary text-white hover:bg-primary-dark shadow-lg hover:shadow-xl"
                        : isBasic
                        ? "border border-white/20 bg-transparent text-white hover:bg-white hover:text-black"
                        : "border border-white/20 bg-transparent text-white hover:bg-primary hover:border-primary hover:text-white"
                    }`}
                  >
                    Select Package <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10 mt-10 text-center">
          <Link href="/services" className="text-primary text-sm font-medium hover:underline transition-all inline-flex items-center gap-1">
            View more services <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section> */}

      {/* ===== BEFORE & AFTER ===== */}
      <section
        className="py-32 bg-[#111] text-center overflow-hidden border-t border-white/5 relative"
        id="difference"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-[#111] to-[#111] opacity-60" />
        </div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <h2 className="text-[4rem] sm:text-[8rem] lg:text-[14rem] font-display font-black text-white/5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 whitespace-nowrap select-none pointer-events-none">
            RESTORE
          </h2>
          <div className="relative z-10 mb-12">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-2 block font-body not-italic">
              The Difference
            </span>
            <h3 className="text-4xl lg:text-5xl font-display font-bold text-white mt-1">
              Before &amp; After
            </h3>
          </div>
          <BeforeAfterSlider />
        </div>
      </section>

      {/* ===== FEATURES / THE PROCESS ===== */}
      <section className="py-32 bg-[#0A0A0A]" id="process">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <div className="relative w-full aspect-[4/5] group">
              <div className="hidden sm:block absolute top-[-20px] left-[-20px] w-1/2 h-1/2 border-t-2 border-l-2 border-primary/50 z-0" />
              <div className="hidden sm:block absolute bottom-[-20px] right-[-20px] w-1/2 h-1/2 border-b-2 border-r-2 border-primary/50 z-0" />
              <div className="absolute inset-0 bg-gray-900 z-10 overflow-hidden shadow-2xl">
                <Image
                  src="/Images/webPhotos/mobileServiceCard.jpg"
                  alt="Detailer polishing a car"
                  fill
                  className="object-cover opacity-90 grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <div className="flex items-end gap-3 border-b border-white/20 pb-4 mb-4">
                    <span className="text-5xl font-display font-black text-white italic leading-none">
                      LUKE&apos;S
                    </span>
                    <span className="text-primary font-bold tracking-widest text-xs mb-1 bg-white/10 px-2 py-1 rounded-sm backdrop-blur-sm font-body not-italic">
                      GUARANTEE
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm font-light">
                    Certified professionals. Insured service. Unmatched results.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Features */}
            <div className="flex flex-col pl-0 lg:pl-12">
              <div className="w-20 h-1.5 bg-primary mb-8" />
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6 sm:mb-8 leading-tight">
                NOT JUST A WASH. <br />
                <span className="italic text-gray-500 font-serif">
                  ENGINEERED CARE.
                </span>
              </h2>
              <p className="text-gray-400 mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed font-light border-l border-white/10 pl-6">
                Your vehicle is a complex machine. Luke&apos;s Mobile Detailing
                employs advanced chemistry and professional-grade tools to safely
                lift dirt and protect your investment without inducing swirls.
              </p>
              <div className="space-y-8">
                <div className="flex gap-6 items-start group">
                  <div className="text-primary shrink-0 transition-colors duration-300">
                    <span className="material-symbols-outlined text-5xl">
                      location_on
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-2 group-hover:text-primary transition-colors font-body not-italic">
                      We Come to You
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                      Home, office, or anywhere that works for you. No drop-off,
                      no wait—we bring the detail to your doorstep.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start group">
                  <div className="text-primary shrink-0 transition-colors duration-300">
                    <span className="material-symbols-outlined text-5xl">
                      auto_awesome
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-2 group-hover:text-primary transition-colors font-body not-italic">
                      Premium Products
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                      Professional-grade formulas and eco-conscious choices for
                      a superior finish that lasts.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 items-start group">
                  <div className="text-primary shrink-0 transition-colors duration-300">
                    <span className="material-symbols-outlined text-5xl">
                      verified
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-2 group-hover:text-primary transition-colors font-body not-italic">
                      Satisfaction Guaranteed
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                      We don&apos;t consider the job done until you do. Your
                      approval is what matters most.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="relative bg-[#0A0A0A] overflow-hidden py-0">
        <div className="relative">
          {/* Scrolling rows */}
          <div className="py-12 space-y-8">
            {/* Row 1 - scrolls left */}
            <div className="overflow-hidden">
              <div ref={row1Ref} className="flex gap-8 w-max">
                {[...reviewsRow1, ...reviewsRow1].map((review, i) => (
                  <div key={`r1-${i}`} className="w-[300px] sm:w-[400px] flex-shrink-0 bg-zinc-900/80 border border-white/10 rounded-sm p-5 sm:p-7">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-white text-sm font-bold">{review.author}</p>
                        <p className="text-gray-500 text-[11px] mt-0.5">Posted on Google</p>
                      </div>
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    </div>
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, s) => (
                        <span key={s} className="material-symbols-outlined text-amber-400 text-base">star</span>
                      ))}
                    </div>
                    <p className="text-gray-200 text-[15px] leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 - scrolls right */}
            <div className="overflow-hidden">
              <div ref={row2Ref} className="flex gap-8 w-max">
                {[...reviewsRow2, ...reviewsRow2].map((review, i) => (
                  <div key={`r2-${i}`} className="w-[300px] sm:w-[400px] flex-shrink-0 bg-zinc-900/80 border border-white/10 rounded-sm p-5 sm:p-7">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-white text-sm font-bold">{review.author}</p>
                        <p className="text-gray-500 text-[11px] mt-0.5">Posted on Google</p>
                      </div>
                      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    </div>
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, s) => (
                        <span key={s} className="material-symbols-outlined text-amber-400 text-base">star</span>
                      ))}
                    </div>
                    <p className="text-gray-200 text-[15px] leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Left/right edge fades */}
          <div className="absolute inset-y-0 left-0 w-60 md:w-96 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-60 md:w-96 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent z-10 pointer-events-none" />

          {/* Center overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="absolute inset-0 bg-[#0A0A0A]/40" />
            <div className="relative text-center px-6 pointer-events-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight uppercase leading-tight mb-8 max-w-3xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                Real Results From <span className="text-primary">Real Customers</span>
              </h2>
              <Link
                href="/reviews"
                className="bg-primary text-white px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-primary-dark transition-all shadow-[0_0_20px_rgba(210,31,60,0.3)] hover:shadow-[0_0_30px_rgba(210,31,60,0.5)] transform hover:-translate-y-0.5 inline-block"
              >
                View All Reviews
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICE AREA ===== */}
      <section
        className="relative bg-[#050505] min-h-[600px] flex items-center border-t border-white/5"
        id="locations"
      >
        <div className="absolute inset-0 z-0">
          <div className="hidden lg:block w-full h-full">
            <ServiceAreaMap />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/90 to-transparent" />
        </div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 py-20">
          <div className="bg-black/80 backdrop-blur-xl p-6 sm:p-10 border-l-4 border-primary text-white shadow-2xl max-w-lg">
            <div className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 font-body not-italic">
              Serving Northern California
            </div>
            <h2 className="text-4xl font-display font-bold mb-6">
              Service Area
            </h2>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed border-b border-white/10 pb-6">
              We primarily service the greater Yuba-Sutter region. Travel fees
              may apply for locations outside our primary radius.
            </p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
              {[
                "Yuba City",
                "Marysville",
                "Sutter",
                "Plumas Lake",
                "Live Oak",
                "Wheatland",
                "Olivehurst",
                "Gridley",
              ].map((city, i) => (
                <div
                  key={city}
                  className="flex items-center gap-3 text-sm text-gray-300 font-medium group cursor-default"
                >
                  <span
                    className={`w-2 h-2 rounded-full group-hover:scale-150 transition-transform ${
                      i < 4 ? "bg-primary" : "bg-gray-600 group-hover:bg-primary"
                    }`}
                  />
                  {city}
                </div>
              ))}
            </div>

            {/* Mobile map */}
            <div className="lg:hidden mb-6 h-48 overflow-hidden rounded-sm border border-white/10">
              <ServiceAreaMap />
            </div>

            <Link
              href="/contact"
              className="w-full bg-white text-black font-bold uppercase tracking-widest text-xs py-4 hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 group"
            >
              Check My Location{" "}
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_outward
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
