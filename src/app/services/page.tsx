"use client";
import Link from "next/link";
import { useState } from "react";
import { 
  CheckCircleIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  CloudIcon,
  BeakerIcon,
  ClockIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Script from "next/script";


export default function ServicesPage() {
  // Track active tab for each package
  const [activeTab, setActiveTab] = useState({
    signature: "interior",
    diamond: "interior",
    basic: "interior"
  });

  // Function to handle tab changes
  const handleTabChange = (packageName: string, tabName: string) => {
    setActiveTab(prev => ({
      ...prev,
      [packageName]: tabName
    }));
  };

  // Services schema data
  const detailingServices = [
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
      "serviceOutput": {
        "@type": "Thing",
        "name": "Detailed vehicle with 6-8 month paint protection"
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
      "serviceOutput": {
        "@type": "Thing",
        "name": "Premium detailed vehicle with ceramic infused wax protection"
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
      "serviceOutput": {
        "@type": "Thing",
        "name": "Clean and refreshed vehicle"
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
      "serviceOutput": {
        "@type": "Thing",
        "name": "Thoroughly cleaned and protected vehicle interior"
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
      "serviceOutput": {
        "@type": "Thing",
        "name": "Professionally cleaned and protected vehicle exterior"
      },
      "estimatedDuration": "PT2H"
    }
  ];

  // Service categories schema
  const serviceCategories = [
    {
      "@type": "Service", 
      "name": "Interior Detailing",
      "description": "Complete interior cleaning services including vacuuming, steam cleaning, and surface treatments.",
      "serviceType": "Car Interior Cleaning",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Luke's Mobile Detailing"
      },
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "39.1404",
          "longitude": "-121.6169"
        },
        "geoRadius": "40"
      }
    },
    {
      "@type": "Service", 
      "name": "Exterior Detailing",
      "description": "Exterior cleaning services including wash, polish, paint correction, and protective coatings.",
      "serviceType": "Car Exterior Cleaning",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Luke's Mobile Detailing"
      },
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "39.1404",
          "longitude": "-121.6169"
        },
        "geoRadius": "40"
      }
    },
    {
      "@type": "Service", 
      "name": "Paint Correction",
      "description": "Professional paint correction to remove swirls, scratches, and imperfections.",
      "serviceType": "Car Paint Restoration",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Luke's Mobile Detailing"
      }
    },
    {
      "@type": "Service", 
      "name": "Ceramic Coating",
      "description": "Long-lasting ceramic coating protection for your vehicle's paint.",
      "serviceType": "Car Paint Protection",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Luke's Mobile Detailing"
      }
    },
    {
      "@type": "Service", 
      "name": "Mobile Detailing",
      "description": "Professional car detailing services that come to your location in Yuba City, Marysville, and surrounding areas.",
      "serviceType": "Mobile Car Detailing",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Luke's Mobile Detailing"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Yuba City",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "CA"
          }
        },
        {
          "@type": "City",
          "name": "Marysville",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "CA"
          }
        },
        {
          "@type": "City",
          "name": "Live Oak",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "CA"
          }
        },
        {
          "@type": "City",
          "name": "Olivehurst",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "CA"
          }
        }
      ]
    }
  ];

  return (
    <div className="bg-white">
      {/* Schema.org markup */}
      <Script
        id="schema-services-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": detailingServices.map((service, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": service
            }))
          })
        }}
      />

      <Script
        id="schema-service-categories"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": serviceCategories.map((category, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": category
            }))
          })
        }}
      />

      {/* Header */}
      <div className="bg-secondary text-white py-16 relative">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/Images/webPhotos/servicesBanner.jpg" 
            alt="Car detailing services" 
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 90%" }}
          />
          <div className="absolute inset-0 bg-black opacity-65" />
        </div>
        <div className="container-custom text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Our Detailing Services</h1>
          <Link href="/contact" className="btn-outline text-center">
                Free Quote or Custom Detail?
          </Link>
        </div>
      </div>

      {/* Packages Overview */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* The Signature Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative lg:transform lg:scale-105 flex flex-col">
              <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg font-medium text-sm z-10">
                MOST POPULAR
              </div>
              <div className="bg-primary text-white p-6">
                <h2 className="text-2xl font-bold mb-2">The Signature</h2>
                <p className="text-3xl font-bold">$255</p>
                <p className="text-sm mt-2">Interior & Exterior Detail</p>
              </div>
              <div className="p-6 flex-1 flex flex-col">
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
                
                {/* Tab Content */}
                <div className="flex-1">
                  {/* Interior Content */}
                  <div className={activeTab.signature === "interior" ? "block" : "hidden"}>
                    <ul className="space-y-3 mb-6">
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
                        <span className="text-gray-800">Steam cleaning of cracks & crevices vinyl</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Inside screens windows</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Application of P&S interior UV protectant</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Final touch up's & vacuum</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Air freshener</span>
                      </li>
                      <li className="flex items-start border-t border-gray-200 pt-3 mt-3">
                        <ClockIcon className="h-6 w-6 text-gray-500 flex-shrink-0 mr-2" />
                        <span className="text-gray-700">Duration: 4 hours</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Exterior Content */}
                  <div className={activeTab.signature === "exterior" ? "block" : "hidden"}>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Full vehicle pre rinse</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Foam wash</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Wheels & wheel wells</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Tires</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Paint decontamination</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Full dry down & light polish</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Windows</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Tire shine</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">6-8 month sealant</span>
                      </li>
                      <li className="flex items-start border-t border-gray-200 pt-3 mt-3">
                        <ClockIcon className="h-6 w-6 text-gray-500 flex-shrink-0 mr-2" />
                        <span className="text-gray-700">Duration: 4 hours</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Link
                  href="https://book.squareup.com/appointments/hs7hvrxqk38fag/location/L51SWV5N7VVBD/services/GRM2YZAKP4ONQJTU7CRS4DGI"
                  className="btn-primary w-full text-center block mt-4"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* The Diamond Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col">
              <div className="bg-[#34eba1] p-6">
                <h2 className="text-2xl font-bold mb-2 text-white">The Diamond</h2>
                <p className="text-3xl font-bold text-white">$495</p>
                <p className="text-sm mt-2 text-white">Interior & Exterior Detail</p>
              </div>
              <div className="p-6 flex-1 flex flex-col">
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
                
                {/* Tab Content */}
                <div className="flex-1">
                  {/* Interior Content */}
                  <div className={activeTab.diamond === "interior" ? "block" : "hidden"}>
                    <ul className="space-y-3 mb-6">
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
                        <span className="text-gray-800">Heated shampoo extraction of seats and carpets</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Steam cleaning of cracks & crevices vinyl</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Inside screens windows</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Application of P&S interior UV protectant</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Leather and vinyl conditioning</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Final touch up's & vacuum</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Air freshener</span>
                      </li>
                      <li className="flex items-start border-t border-gray-200 pt-3 mt-3">
                        <ClockIcon className="h-6 w-6 text-gray-500 flex-shrink-0 mr-2" />
                        <span className="text-gray-700">Duration: 5.5 hours</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Exterior Content */}
                  <div className={activeTab.diamond === "exterior" ? "block" : "hidden"}>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Full vehicle pre rinse</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Foam wash</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Wheels & wheel wells</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Tires</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Paint decontamination</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Undercarriage wash</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Clay bar treatment</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Machine applied ceramic infused wax</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Full dry down & light polish</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Windows</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Tire shine</span>
                      </li>
                      <li className="flex items-start border-t border-gray-200 pt-3 mt-3">
                        <ClockIcon className="h-6 w-6 text-gray-500 flex-shrink-0 mr-2" />
                        <span className="text-gray-700">Duration: 5.5 hours</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Link
                  href="https://book.squareup.com/appointments/hs7hvrxqk38fag/location/L51SWV5N7VVBD/services/NXJA3PDFZXDV3GT4K2JTKDPX"
                  className="btn-primary w-full text-center block mt-4"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* The Basic Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col">
              <div className="bg-secondary text-white p-6">
                <h2 className="text-2xl font-bold mb-2">The Basic</h2>
                <p className="text-3xl font-bold">$185</p>
                <p className="text-sm mt-2">Interior & Exterior Detail</p>
              </div>
              <div className="p-6 flex-1 flex flex-col">
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
                
                {/* Tab Content */}
                <div className="flex-1">
                  {/* Interior Content */}
                  <div className={activeTab.basic === "interior" ? "block" : "hidden"}>
                    <ul className="space-y-3 mb-6">
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
                        <span className="text-gray-800">Inside screens windows</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Air freshener</span>
                      </li>
                      <li className="flex items-start border-t border-gray-200 pt-3 mt-3">
                        <ClockIcon className="h-6 w-6 text-gray-500 flex-shrink-0 mr-2" />
                        <span className="text-gray-700">Duration: 2.5 hours</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Exterior Content */}
                  <div className={activeTab.basic === "exterior" ? "block" : "hidden"}>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Foam wash</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Wheels cleaned</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Tires</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Full dry down</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Windows</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                        <span className="text-gray-800">Tire shine</span>
                      </li>
                      <li className="flex items-start border-t border-gray-200 pt-3 mt-3">
                        <ClockIcon className="h-6 w-6 text-gray-500 flex-shrink-0 mr-2" />
                        <span className="text-gray-700">Duration: 2.5 hours</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Link
                  href="https://book.squareup.com/appointments/hs7hvrxqk38fag/location/L51SWV5N7VVBD/services/WDQ62TG7WUZJ7D6J3N7KY6IO"
                  className="btn-primary w-full text-center block mt-4"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* The Full Interior Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col">
              <div className="bg-[#1e3a8a] text-white p-6">
                <h2 className="text-2xl font-bold mb-2 text-white">The Full Interior</h2>
                <p className="text-3xl font-bold text-white">$195</p>
                <p className="text-sm mt-2 text-white">Interior Detail</p>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <ul className="space-y-3 mb-6">
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
                      <span className="text-gray-800">Steam cleaning of cup holders, vinyl, air vents & floor mats</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Inside screens windows</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Application of P&S interior UV protectant</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Final touch up's & double vacuum</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Air freshener & business card to finish it off!</span>
                    </li>
                    <li className="flex items-start border-t border-gray-200 pt-3 mt-3">
                      <ClockIcon className="h-6 w-6 text-gray-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-700">Duration: 3 hours</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="https://book.squareup.com/appointments/hs7hvrxqk38fag/location/L51SWV5N7VVBD/services/LC6EIKAV6UUDRBMESJF7XOZW"
                  className="btn-primary w-full text-center block mt-4"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* The Full Exterior Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 flex flex-col">
              <div className="bg-[#fcc603] text-white p-6">
                <h2 className="text-2xl font-bold mb-2 text-white ">The Full Exterior</h2>
                <p className="text-3xl font-bold text-white">$130</p>
                <p className="text-sm mt-2 text-white">Exterior Detail</p>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Rinse of entire car/truck</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Foam wash</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Wheels & tires</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Bug/road debris removed</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Paint decontamination</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Drying of entire vehicle</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Windows cleaned</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">Steam cleaning of wheel wells & rims</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                      <span className="text-gray-800">6-8 month sealant</span>
                    </li>
                    <li className="flex items-start border-t border-gray-200 pt-3 mt-3">
                      <ClockIcon className="h-6 w-6 text-gray-500 flex-shrink-0 mr-2" />
                      <span className="text-gray-700">Duration: 2 hours</span>
                    </li>
                  </ul>
                </div>
                <Link
                  href="https://book.squareup.com/appointments/hs7hvrxqk38fag/location/L51SWV5N7VVBD/services/C2LHAU4BATIYKDYHNBMDZSOA"
                  className="btn-primary w-full text-center block mt-4"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services 
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Additional Services</h2>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              These specialized services can be added to any package for an additional cost.
              Just let us know what extras you'd like when you book.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CloudIcon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Odor Removal</h3>
              <p className="mb-2 text-gray-800">Complete odor elimination using professional-grade products and equipment.</p>
              <p className="text-primary font-bold">From $49</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <BeakerIcon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Pet Hair Removal</h3>
              <p className="mb-2 text-gray-800">Specialized tools to completely remove stubborn pet hair from your vehicle.</p>
              <p className="text-primary font-bold">From $39</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <LightBulbIcon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Headlight Restoration</h3>
              <p className="mb-2 text-gray-800">Remove oxidation and restore clarity to foggy headlights.</p>
              <p className="text-primary font-bold">From $79</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ShieldCheckIcon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Ceramic Coating</h3>
              <p className="mb-2 text-gray-800">Long-lasting paint protection that adds gloss and repels water and contaminants.</p>
              <p className="text-primary font-bold">From $199</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <BeakerIcon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Stain Removal</h3>
              <p className="mb-2 text-gray-800">Deep cleaning to remove tough stains from carpets, upholstery, and other surfaces.</p>
              <p className="text-primary font-bold">From $49</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ShieldCheckIcon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Paint Protection Film</h3>
              <p className="mb-2 text-gray-800">Invisible film to protect high-impact areas from rock chips and scratches.</p>
              <p className="text-primary font-bold">From $299</p>
            </div>
          </div>
        </div>
      </section>*/}

      {/* Process Section */}
      <section className="py-6 md:py-10">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Detailing Process</h2>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              We follow a meticulous process to ensure your vehicle receives the highest quality detailing service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Assessment</h3>
              <p className="text-gray-800">
                We thoroughly inspect your vehicle to identify specific areas that need attention and determine the best approach.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Preparation</h3>
              <p className="text-gray-800">
                We prepare the appropriate tools, equipment, and premium products specifically selected for your vehicle.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Execution</h3>
              <p className="text-gray-800">
                We carefully perform each step of the detailing process with precision and attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-800 max-w-3xl mx-auto">
              Have questions about our services? Find answers to common questions below.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">How long does a typical detailing service take?</h3>
              <p className="text-gray-800">
                Service times vary based on the package and vehicle condition. The Basic package typically takes 2-3 hours, 
                the Premium package 3-4 hours, and the Signature package 4-5 hours. Additional services may extend these times.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">What's included in each package?</h3>
              <p className="text-gray-800">
                Our Basic package includes exterior wash, tire shine, and basic interior cleaning. The Premium package adds 
                interior deep cleaning, leather conditioning, and paint decontamination. The Signature package includes everything 
                plus paint correction, ceramic coating, and premium wax application.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Do I need to be present during the service?</h3>
              <p className="text-gray-800">
                No, you don't need to be present during the service. We just need access to your vehicle and a water source.
                Many customers provide access and go about their day while we work.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">What areas do you service?</h3>
              <p className="text-gray-800">
                We service Yuba City, Marysville, Live Oak, Olivehurst, Linda, Gridley, Sutter, Plumas Lake, and surrounding areas within a 25-mile radius. If you're unsure 
                if we serve your area, please contact us to check.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">What forms of payment do you accept?</h3>
              <p className="text-gray-800">
                We accept all major credit cards, debit cards, cash, and mobile payment options like Venmo and Cash App.
                Payment is required upon completion of service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Book Your Detailing Service?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule your appointment today and experience the difference of professional mobile detailing.
          </p>
          <Link href="https://app.squareup.com/appointments/buyer/widget/hs7hvrxqk38fag/L51SWV5N7VVBD" className="btn bg-white text-primary hover:bg-gray-100 font-bold px-8 py-3">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
} 
