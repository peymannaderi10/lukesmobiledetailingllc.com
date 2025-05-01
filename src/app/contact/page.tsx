"use client";

import { useState } from "react";
import Link from "next/link";
import { EnvelopeIcon, PhoneIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

type ContactFormInputs = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setIsSubmitting(true);
    setErrorMessage("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form submitted:", data);
      
      // Reset form and show success message
      reset();
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("There was an error submitting your message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="relative py-16">
        {/* Banner Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/Images/webPhotos/contactBanner.jpg"
            alt="Contact Us Banner"
            fill
            className="object-cover"
            priority
            style={{ objectPosition: "center 55%" }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
        <div className="container-custom text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto text-white">
            Looking for a free quote or a custom detail? <br></br> Give us a call or send us a message today!
          </p>
        </div>
      </div>

      {/* Contact Information & Form */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>

              {/* Contact Cards */}
              <div className="space-y-6">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-primary rounded-full p-3 mr-4">
                      <PhoneIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Phone</h3>
                      <a href="tel:(530)650-3631" className="text-gray-600 hover:text-primary">
                        (530) 650-3631
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-primary rounded-full p-3 mr-4">
                      <EnvelopeIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Email</h3>
                      <a href="mailto:luke8888z@gmail.com" className="text-gray-600 hover:text-primary">
                        luke8888z@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-primary rounded-full p-3 mr-4">
                      <ClockIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Business Hours</h3>
                      <ul className="text-gray-600 space-y-1">
                        <li className="flex justify-between">
                          <span>Monday - Friday:</span>
                          <span>8:00 AM - 5:00 PM</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Saturday:</span>
                          <span>8:00 AM - 5:00 PM</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Sunday:</span>
                          <span>Closed</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100 p-6 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-primary rounded-full p-3 mr-4">
                      <MapPinIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Service Area</h3>
                      <p className="text-gray-600 mb-2">
                        We serve Yuba City, Marysville, Meridian, Live Oak, Olivehurst, Linda, Gridley, Sutter, Plumas Lake, and surrounding areas in California.
                      </p>
                      <Link href="/about#service-area" className="text-primary hover:underline">
                        View Service Area Map
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/lukemobiledetailing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black hover:bg-primary hover:text-primary-dark transition-colors rounded-full p-3"
                    aria-label="Facebook"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
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
                    className="bg-black hover:bg-primary hover:text-primary-dark transition-colors rounded-full p-3"
                    aria-label="Instagram"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 lg:p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                
                {isSuccess ? (
                  <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg">
                    <h3 className="font-bold text-xl mb-2 text-black">Thank You!</h3>
                    <p className="mb-4 text-black">Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="btn-primary"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block mb-2 font-medium text-black">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          className={`w-full p-3 border rounded-md ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          }`}
                          {...register("name", { required: true })}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">Name is required</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block mb-2 font-medium text-black">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          className={`w-full p-3 border rounded-md ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          {...register("email", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                          })}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            Valid email is required
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="phone" className="block mb-2 font-medium text-black">
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          className="w-full p-3 border border-gray-300 rounded-md"
                          {...register("phone")}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block mb-2 font-medium text-black">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="subject"
                          type="text"
                          className={`w-full p-3 border rounded-md ${
                            errors.subject ? "border-red-500" : "border-gray-300"
                          }`}
                          {...register("subject", { required: true })}
                        />
                        {errors.subject && (
                          <p className="text-red-500 text-sm mt-1">Subject is required</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block mb-2 font-medium text-black">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className={`w-full p-3 border rounded-md ${
                          errors.message ? "border-red-500" : "border-gray-300"
                        }`}
                        {...register("message", { required: true })}
                      ></textarea>
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">Message is required</p>
                      )}
                    </div>
                    
                    {errorMessage && (
                      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6">
                        {errorMessage}
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      className="btn-primary px-8 py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="py-12 bg-gray-100">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Service Area</h2>
            <p className="text-gray-800 max-w-3xl mx-auto">
              We provide mobile detailing services throughout Yuba City, Marysville, Meridian, Live Oak, Olivehurst, Linda, Gridley, Sutter, Plumas Lake, and surrounding areas in California.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            {/* Yuba City/Marysville Google Map */}
            <div className="bg-white h-80 rounded-lg overflow-hidden">
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

      {/* FAQ */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-800 max-w-3xl mx-auto">
              Still have questions? Here are some common inquiries about our services.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">How do I schedule a detailing service?</h3>
              <p className="text-gray-800">
                You can easily book through our online booking system, call us directly, or send us a message 
                through the contact form above. We'll confirm your appointment within 24 hours.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">What should I do to prepare for my appointment?</h3>
              <p className="text-gray-800">
                Please remove all personal belongings from your vehicle before the service. We'll need access to 
                your vehicle and a water source. If possible, park in a shaded area or garage.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">What if I need to reschedule my appointment?</h3>
              <p className="text-gray-800">
                We understand plans can change. Please give us at least 24 hours notice if you need to reschedule. 
                You can call us or use our online booking system to select a new time.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">Do you offer any guarantees?</h3>
              <p className="text-gray-800">
                Yes! We stand behind our work with a 100% satisfaction guarantee. If you're not completely satisfied 
                with any aspect of our service, we'll make it right at no additional cost.
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
            Don't wait to restore your vehicle to its showroom shine. Book your appointment today!
          </p>
          <Link href="/booking" className="btn bg-white text-primary hover:bg-gray-100 font-bold px-8 py-3">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
} 