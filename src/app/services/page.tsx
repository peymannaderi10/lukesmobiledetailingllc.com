import Link from "next/link";
import { 
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  CloudIcon,
  BeakerIcon
} from "@heroicons/react/24/outline";

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-secondary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Our Detailing Services</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We offer a range of professional car detailing services tailored to keep your vehicle looking its best.
            All services are performed at your location.
          </p>
        </div>
      </div>

      {/* Packages Overview */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Basic Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="bg-secondary text-white p-6">
                <h2 className="text-2xl font-bold mb-2">Basic Package</h2>
                <p className="text-3xl font-bold">$99<span className="text-sm font-normal"> and up</span></p>
                <p className="text-sm mt-2">Perfect for routine maintenance</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Exterior hand wash & dry</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Wheel cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Tire shine application</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Interior vacuum & dusting</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Dashboard & console cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Window cleaning (interior & exterior)</span>
                  </li>
                  <li className="flex items-start">
                    <ClockIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mr-2" />
                    <span className="text-gray-700">Approx. 1-2 hours</span>
                  </li>
                </ul>
                <Link
                  href="/booking?package=basic"
                  className="btn-primary w-full text-center block"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Premium Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative lg:transform lg:scale-105">
              <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
                MOST POPULAR
              </div>
              <div className="bg-primary text-white p-6">
                <h2 className="text-2xl font-bold mb-2">Premium Package</h2>
                <p className="text-3xl font-bold">$179<span className="text-sm font-normal"> and up</span></p>
                <p className="text-sm mt-2">Comprehensive interior & exterior</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Everything in Basic Package</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Interior deep cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Leather conditioning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Carpet shampooing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Exterior wax protection</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Door jamb cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Air freshener</span>
                  </li>
                  <li className="flex items-start">
                    <ClockIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mr-2" />
                    <span className="text-gray-700">Approx. 3-4 hours</span>
                  </li>
                </ul>
                <Link
                  href="/booking?package=premium"
                  className="btn-primary w-full text-center block"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Ultimate Package */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="bg-secondary text-white p-6">
                <h2 className="text-2xl font-bold mb-2">Ultimate Package</h2>
                <p className="text-3xl font-bold">$299<span className="text-sm font-normal"> and up</span></p>
                <p className="text-sm mt-2">The complete detailing experience</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Everything in Premium Package</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Paint correction</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Ceramic coating application</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Headlight restoration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Engine bay cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Trim restoration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-800">Paint sealant protection</span>
                  </li>
                  <li className="flex items-start">
                    <ClockIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mr-2" />
                    <span className="text-gray-700">Approx. 5-8 hours</span>
                  </li>
                </ul>
                <Link
                  href="/booking?package=ultimate"
                  className="btn-primary w-full text-center block"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
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
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-20">
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
                Service times vary based on the package and vehicle condition. Basic packages typically take 1-2 hours, 
                Premium packages 3-4 hours, and Ultimate packages 5-8 hours.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Do I need to be present during the service?</h3>
              <p className="text-gray-800">
                No, you don't need to be present the entire time. We just need access to your vehicle and a water source.
                Many customers provide access and go about their day while we work.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">What if I'm not satisfied with the service?</h3>
              <p className="text-gray-800">
                Your satisfaction is our priority. If you're not completely satisfied, please let us know immediately, 
                and we'll address any concerns to ensure you're happy with the results.
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">What areas do you service?</h3>
              <p className="text-gray-800">
                We service [Your Service Area] and surrounding communities within a 25-mile radius. If you're unsure 
                if we serve your area, please contact us to check.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-2">What forms of payment do you accept?</h3>
              <p className="text-gray-800">
                We accept credit cards, debit cards, cash, and mobile payment options like Venmo and Cash App.
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
          <Link href="/booking" className="btn bg-white text-primary hover:bg-gray-100 font-bold px-8 py-3">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
} 