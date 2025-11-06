"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CheckCircleIcon,
  SparklesIcon,
  ClockIcon,
  MapPinIcon,
  TruckIcon,
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Script from "next/script";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ServiceAreaMap from "@/components/ServiceAreaMap";

export default function Home() {
  // Track active tab for each package
  const [activeTab, setActiveTab] = useState({
    signature: "interior",
    diamond: "interior",
    basic: "interior"
  });

  // Track active testimonial
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      text: "Nikita came on time! The car was pretty dirty and I have a lot of activities so the car was full of stuff too. They were thorough and the inside looks like I just drove it off the lot! Now I'm a barn person so the car was pretty dirty and muddy. They worked hard and the car is shiny and looks great! She even drives better!! Highly recommend this service.",
      author: "Bree-Anna Vail",
      initials: "BV"
    },
    {
      text: "Great job on our car! Every detail looks better than when the car was new. Easy to schedule, showed up on time, and did a great job. Highly recommend if you want your car to look great.",
      author: "George Blankenship",
      initials: "GB"
    },
    {
      text: "I want to give a shout out to Nikita and his awesome auto detailing company that he has started. When I hired him, I did not know much about him, but I have to say that within a few hours that I spent with him, I can see where he is going. He is not finished with the job until he feels it's perfect. I just think this is an outstanding young man. He loves what he does and it shows. I know if I could fast-forward 10 years, he is going to be a huge success in business and in life. I HIGHLY recommend hiring him.",
      author: "Jo James",
      initials: "JJ"
    },
    {
      text: "I have been looking around for a little while for someone to come clean my car. It was filthy inside and out! I got a few estimates but had an issue with not really having access to water. Back duplex front parking. Right away Nikita said we do charge a little fee we can pick it up clean it then bring it back! That was music to my ears. Today he picked up my car and a couple of hours later brought it back looking like new. They really go out of their way to make sure the customer is happy. I am a very happy customer!",
      author: "Debbie Gapsar",
      initials: "DG"
    },
    {
      text: "I contacted Luke about detailing my plane. We made plans to meet at the airport and he was right on time. He did an excellent job and I was very impressed with how hard he worked and all of the professional products he used. I would highly recommend Luke's mobile detailing.",
      author: "Carin Batham",
      initials: "CB"
    },
    {
      text: "First time getting my car detailed by Luke and he showed up on time with a 100 gallon water tank and his own generator to power all his equipment, he was extremely professional and clean, I'm definitely gonna recommend him to my friends and will be using his services in the future!",
      author: "Shahan Ali",
      initials: "SA"
    },
    {
      text: "I couldn't be happier with the service from Luke's Mobile Detailing! Luke showed up right on time and was ready to work. His pricing is very fair, especially considering the amazing quality of his work. He's a hard worker who clearly takes pride in what he does. The before and after pictures were incredible — they really show just how much attention to detail Luke puts into every vehicle. My car looked brand new when he was done! I highly recommend Luke's Mobile Detailing to anyone looking for a top-notch, reliable, and professional service. Will definitely be using him again!",
      author: "Mark Hernandez",
      initials: "MH"
    },
    {
      text: "I booked the Signature Detail Wash for my BMW, and I'm seriously impressed. The mobile detailing service was punctual, professional, and came fully prepared. What really blew me away was the precision and care—every inch of my car was spotless, from the rims to the interior vents. The attention to details was unmatched. My BMW looks like it just rolled off the showroom floor. Highly recommend this service to anyone who wants their car looking its absolute best!",
      author: "Omar Gonzalez",
      initials: "OG"
    },
    {
      text: "Luke did an incredible job on four different vehicles for our household. I was blown away by the attention to detail, and the amount of work that he puts into detailing each car. I really appreciated that Luke showed up for the job on time and worked diligently all day to complete the four cars! His prices are incredibly reasonable, especially considering the extra convenience of him coming to my home. I will be calling on Luke again soon to keep my cars looking great!",
      author: "Glory Albin",
      initials: "GA"
    },
    {
      text: "I had an amazing experience with Luke's Mobile Detailing! My truck has never looked this spotless it use to be a work truck so you can imagine the dirt and grime it had accumulated. Luke truly exceeded my expectations. Every inch of the interior and exterior was cleaned to perfection, and he clearly takes pride in his work. The convenience of having him come to me made it even better. If you are looking for professional highly recommend Luke's mobile detailing!",
      author: "Daniela Corona",
      initials: "DC"
    },
    {
      text: "Luke did a fantastic job on my BMW X1. It looks better than when I bought it. He works hard, is courteous and shows up on time. Just make sure you know what you are scheduling. Ask questions such as what is included and what is extra. This was my first time so I did not know what to ask. Steam cleaning the engine is extra as is polishing yellowing headlights. But that said I definitely got my moneys worth. Thank you Luke",
      author: "Richard Blomberg",
      initials: "RB"
    }
  ];

  // Testimonial navigation functions
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setActiveTestimonial(index);
  };

  // Function to handle tab changes
  const handleTabChange = (packageName: string, tabName: string) => {
    setActiveTab(prev => ({
      ...prev,
      [packageName]: tabName
    }));
  };

  // Services data for Schema.org
  const servicesData = [
    {
      "@type": "Service",
      "name": "The Signature Detail Package",
      "description": "Complete interior and exterior detail including deep vacuum, steam cleaning, paint decontamination, and 6-8 month sealant.",
      "offers": {
        "@type": "Offer",
        "price": "255.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "serviceType": "Car Detailing",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Luke's Mobile Detailing"
      },
      "estimatedDuration": "PT4H"
    },
    {
      "@type": "Service",
      "name": "The Diamond Detail Package",
      "description": "Premium interior and exterior detailing with heated extraction, leather conditioning, clay bar treatment, ceramic wax, and light polish.",
      "offers": {
        "@type": "Offer",
        "price": "495.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "serviceType": "Premium Car Detailing",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Luke's Mobile Detailing"
      },
      "estimatedDuration": "PT5H30M"
    },
    {
      "@type": "Service",
      "name": "The Basic Detail Package",
      "description": "Essential interior and exterior detail with vacuum, wipe down of surfaces, foam wash, and tire shine.",
      "offers": {
        "@type": "Offer",
        "price": "185.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "serviceType": "Basic Car Detailing",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Luke's Mobile Detailing"
      },
      "estimatedDuration": "PT2H30M"
    },
    {
      "@type": "Service",
      "name": "The Full Interior Package",
      "description": "Comprehensive interior detailing with deep vacuum, steam cleaning of surfaces, UV protectant application, and air freshener.",
      "offers": {
        "@type": "Offer",
        "price": "195.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "serviceType": "Interior Car Detailing",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Luke's Mobile Detailing"
      },
      "estimatedDuration": "PT3H"
    },
    {
      "@type": "Service",
      "name": "The Full Exterior Package",
      "description": "Complete exterior detailing with foam wash, paint decontamination, wheel cleaning, window cleaning, and 6-8 month sealant.",
      "offers": {
        "@type": "Offer",
        "price": "130.00",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "serviceType": "Exterior Car Detailing",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Luke's Mobile Detailing"
      },
      "estimatedDuration": "PT2H"
    }
  ];

  // FAQ data for Schema.org
  const faqData = [
    {
      "@type": "Question",
      "name": "Do you come to my location?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! We are a mobile detailing service that comes to your home, office, or any location convenient for you in Yuba City, Marysville, and surrounding areas."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a detail take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Service times vary by package. The Basic package takes 1-2 hours, the Signature package takes 2-3 hours, and the Diamond package takes 4-6 hours depending on vehicle size and condition."
      }
    },
    {
      "@type": "Question",
      "name": "What forms of payment do you accept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We accept all major credit cards, cash, and electronic payment methods including Square, Venmo, and more."
      }
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Schema.org JSON-LD */}
      <Script
        id="schema-services"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": servicesData.map((service, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": service
            }))
          })
        }}
      />

      <Script
        id="schema-faqs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData
          })
        }}
      />

      <Script
        id="schema-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDetailingBusiness",
            "name": "Luke's Mobile Detailing",
            "description": "Professional mobile car detailing services that come to you in Yuba City, Marysville and surrounding areas.",
            "url": "https://lukesmobiledetailingllc.com",
            "logo": "https://lukesmobiledetailingllc.com/Images/webPhotos/logoblack.png",
            "image": "https://lukesmobiledetailingllc.com/Images/webPhotos/Banner.jpg",
            "telephone": "+15306503631",
            "priceRange": "$$",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Yuba City",
              "addressRegion": "CA",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "39.1404",
              "longitude": "-121.6169"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "17:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "17:00"
              }
            ],
            "sameAs": [
              "https://www.facebook.com/lukemobiledetailing/",
              "https://www.instagram.com/lukesmobiledetailingllc/",
              "https://tiktok.com/@lukesmobiledetailing"
            ],
            "areaServed": [
              {
                "@type": "City",
                "name": "Yuba City"
              },
              {
                "@type": "City",
                "name": "Marysville"
              },
              {
                "@type": "City",
                "name": "Live Oak"
              },
              {
                "@type": "City",
                "name": "Olivehurst"
              },
              {
                "@type": "City",
                "name": "Linda"
              },
              {
                "@type": "City",
                "name": "Gridley"
              }
            ]
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative text-white min-h-[750px] md:min-h-[900px]">
        <div className="absolute inset-0 z-0">
          {/* Mobile Image */}
          <Image 
            src="/Images/webPhotos/hero2.jpg" 
            alt="Professional car detailing" 
            fill
            priority
            className="object-cover object-center md:hidden"
            style={{ objectPosition: "center 45%" }}
          />
          {/* Desktop Image */}
          <Image 
            src="/Images/webPhotos/Banner.jpg" 
            alt="Professional car detailing" 
            fill
            priority
            className="object-cover object-center hidden md:block"
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
        <div className="container-custom relative z-10 pt-28 md:pt-36 pb-28 md:pb-40 flex flex-col min-h-[750px] md:min-h-[900px]">
          <div className="max-w-3xl mx-auto text-center flex-1 flex flex-col" style={{ marginTop: "-2rem" }}>
            <div className="mb-2" style={{ visibility: "hidden" }}>
              <p className="text-xl md:text-2xl font-semibold font-didot italic">WE COME TO YOU!</p>
            </div>
            <h1 className="text-3xl md:text-6xl font-bold mb-6" style={{ visibility: "hidden" }}>
              Protect Your Investment
            </h1>
            <div className="mt-auto mb-8 md:mb-12 flex flex-col items-center">
              <div className="hero-badge">
                <span>As seen on Social Media</span>
                <div className="view-counter">
                  <span id="view-count">100.0M +</span>
                  <span>views</span>
                </div>
              </div>
              <div className="hero-buttons-container flex gap-4 justify-center items-center">
                <Link href="https://app.squareup.com/appointments/buyer/widget/hs7hvrxqk38fag/L51SWV5N7VVBD" className="btn-primary text-center">
                  Book Your Detail
                </Link>
                <Link href="#before-after" className="btn-outline text-center">
                  Before and After
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Curved Divider */}
        <div className="curved-divider hero-services-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hero-services-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4"></stop>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1"></stop>
              </linearGradient>
            </defs>
            <path fill="url(#hero-services-gradient)" d="M0,128 C480,0 960,160 1440,80 L1440,160 L0,160 Z"></path>
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-6 md:py-12 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                      <span className="text-gray-800">6-8 month sealant</span>
                    </li>
                    <li className="flex items-start">
                      <ClockIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mr-2" />
                      <span className="text-gray-700">See full details on services page</span>
                    </li>
                  </ul>
                </div>
                
                <Link 
                  href="https://book.squareup.com/appointments/hs7hvrxqk38fag/location/L51SWV5N7VVBD/services/GRM2YZAKP4ONQJTU7CRS4DGI" 
                  className="btn-primary w-full mt-6 text-center block"
                >
                  Book Now
                </Link>
              </div>
            </div>
            
            {/* The Diamond Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#34eba1] p-6">
                <h3 className="text-2xl font-bold mb-2 text-white">The Diamond</h3>
                <p className="text-3xl font-bold text-white">$495</p>
                <p className="text-sm mt-2 text-white">Interior & Exterior Detail</p>
              </div>
              <div className="p-6">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mb-4">
                  <button 
                    className={`py-2 px-4 font-medium text-sm ${activeTab.diamond === "interior" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
                    onClick={() => handleTabChange("diamond", "interior")}
                  >
                    Interior
                  </button>
                  <button 
                    className={`py-2 px-4 font-medium text-sm ${activeTab.diamond === "exterior" ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
                    onClick={() => handleTabChange("diamond", "exterior")}
                  >
                    Exterior
                  </button>
                </div>
                
                {/* Interior Features */}
                <div className={activeTab.diamond === "interior" ? "block" : "hidden"}>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Full interior deep vacuum</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Heated shampoo extraction</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Leather & vinyl conditioning</span>
                    </li>
                    <li className="flex items-start">
                      <ClockIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mr-2" />
                      <span className="text-gray-700">See full details on services page</span>
                    </li>
                  </ul>
                </div>
                
                {/* Exterior Features */}
                <div className={activeTab.diamond === "exterior" ? "block" : "hidden"}>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Clay bar treatment</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Machine applied ceramic wax</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Light polish & undercarriage wash</span>
                    </li>
                    <li className="flex items-start">
                      <ClockIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mr-2" />
                      <span className="text-gray-700">See full details on services page</span>
                    </li>
                  </ul>
                </div>
                
                <Link 
                  href="https://book.squareup.com/appointments/hs7hvrxqk38fag/location/L51SWV5N7VVBD/services/NXJA3PDFZXDV3GT4K2JTKDPX" 
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
                  href="https://book.squareup.com/appointments/hs7hvrxqk38fag/location/L51SWV5N7VVBD/services/WDQ62TG7WUZJ7D6J3N7KY6IO" 
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

      {/* Before & After Section */}
      <section id="before-after" className="pt-12 md:pt-20 pb-6 md:pb-8 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See the Difference</h2>
          </div>

          <div className="before-after-container max-w-4xl mx-auto">
            {/* Navigation buttons for before/after pairs */}
            <div className="before-after-nav flex justify-center mb-8">
              <button className="before-after-btn active" data-pair="0">1</button>
              <button className="before-after-btn" data-pair="1">2</button>
              <button className="before-after-btn" data-pair="2">3</button>
            </div>

            {/* Timer bar */}
            <div className="before-after-timer-bar-wrapper mb-6">
              <div className="before-after-timer-bar" id="before-after-timer-bar"></div>
            </div>

            <div className="before-after-wrapper relative">
              <img className="before-image absolute top-0 left-0 w-full h-full object-cover" id="before-image" src="/Images/beforeAndAfter/passengerBefore.jpg" alt="Before Detailing - Passenger Interior" />
              <img className="after-image absolute top-0 left-0 w-full h-full object-cover" id="after-image" src="/Images/beforeAndAfter/passengerAfter.jpg" alt="After Detailing - Passenger Interior" />

              <div className="slider-line"></div>

              <div className="slider-handle absolute top-1/2 transform -translate-y-1/2 cursor-grab bg-white border-2 border-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                <div className="slider-arrows flex">
                  <div className="arrow-left text-primary font-bold">❮</div>
                  <div className="arrow-right text-primary font-bold">❯</div>
                </div>
              </div>

              <div className="slider-labels absolute top-4 left-0 w-full flex justify-between px-4">
                <span className="before-label bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm font-bold uppercase">Before</span>
                <span className="after-label bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm font-bold uppercase">After</span>
              </div>
            </div>

            <div className="drag-instruction text-center mt-6 text-gray-600">
              Drag slider to compare
            </div>
          </div>
        </div>
        <BeforeAfterSlider />
      </section>

      {/* Features */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative overflow-hidden rounded-lg shadow-md h-80">
              <Image 
                src="/Images/webPhotos/mobileServiceCard.jpg" 
                alt="Mobile Service" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-6 text-center">
                <TruckIcon className="w-12 h-12 text-white mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">Mobile Service</h3>
                <p className="text-white">We come to your home, office, or any location convenient for you.</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-md h-80">
              <Image 
                src="/Images/webPhotos/PremiumProductsCard.jpg" 
                alt="Premium Products" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-6 text-center">
                <SparklesIcon className="w-12 h-12 text-white mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">Premium Products</h3>
                <p className="text-white">We use high-quality, eco-friendly products for a superior finish.</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-md h-80">
              <Image 
                src="/Images/webPhotos/SatisfactionGuaranteedCard.jpg" 
                alt="Satisfaction Guaranteed" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-6 text-center">
                <CheckCircleIcon className="w-12 h-12 text-white mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">Satisfaction Guaranteed</h3>
                <p className="text-white">Your satisfaction is our priority. We don't leave until you're happy.</p>
              </div>
            </div>
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
          
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            {/* Image on the left */}
            <div className="md:w-1/2 relative rounded-lg overflow-hidden shadow-md h-auto">
              <div className="w-full h-[300px] md:h-full relative">
                <Image 
                  src="/Images/webPhotos/banner2.jpeg" 
                  alt="Professional detailing service" 
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Testimonials on the right */}
            <div className="md:w-1/2 flex flex-col">
              {/* Testimonials Container */}
              <div className="relative flex-1 min-h-[400px] md:min-h-[500px] mb-4 overflow-hidden">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-600 ease-in-out ${
                      index === activeTestimonial
                        ? "opacity-100 translate-x-0 z-10 visible"
                        : index < activeTestimonial
                        ? "opacity-0 -translate-x-full z-0 invisible"
                        : "opacity-0 translate-x-full z-0 invisible"
                    }`}
                  >
                    <div className="bg-gray-100 p-6 rounded-lg shadow-sm h-full flex flex-col border-b-4 border-primary">
                      <p className="text-gray-800 mb-4 flex-1">
                        "{testimonial.text}"
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex text-primary">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className="h-5 w-5 fill-current" />
                          ))}
                        </div>
                        <div className="text-right">
                          <h4 className="font-bold">{testimonial.author}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-300 text-gray-700 hover:border-primary hover:bg-primary hover:text-white active:bg-primary active:text-white flex items-center justify-center transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeftIcon className="h-5 w-5 text-current" />
                </button>
                
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === activeTestimonial
                          ? "bg-primary w-6"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full bg-gray-100 border-2 border-gray-300 text-gray-700 hover:border-primary hover:bg-primary hover:text-white active:bg-primary active:text-white flex items-center justify-center transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRightIcon className="h-5 w-5 text-current" />
                </button>
              </div>

              {/* Link to all reviews */}
              <div className="text-center mt-4">
                <Link href="/reviews" className="btn-outline">
                  View All Reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center md:text-left">Our Service Area</h2>
          
          {/* Map - appears right after title on mobile */}
          <div className="mb-6 md:hidden bg-white rounded-lg p-4 h-80 overflow-hidden shadow-sm">
            <ServiceAreaMap />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
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
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>Sutter</span>
                </li>
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>Plumas Lake</span>
                </li>
                <li className="flex items-center text-black">
                  <MapPinIcon className="h-5 w-5 text-primary mr-2" />
                  <span>Meridian</span>
                </li>
              </ul>
              <p className="mt-6 text-gray-700">
                Not sure if we service your area? <Link href="/contact" className="text-primary hover:underline">Contact us</Link> to find out!
              </p>
            </div>
            <div className="hidden md:block md:w-1/2 bg-white rounded-lg p-4 h-80 overflow-hidden shadow-sm">
              <ServiceAreaMap />
            </div>
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
          <Link href="https://app.squareup.com/appointments/buyer/widget/hs7hvrxqk38fag/L51SWV5N7VVBD " className="btn bg-white text-primary hover:bg-gray-100 font-bold px-8 py-3 shadow-lg">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
