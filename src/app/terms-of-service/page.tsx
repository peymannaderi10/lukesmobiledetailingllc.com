import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Luke\'s Mobile Detailing',
  description: 'Our terms of service outline the agreement between Luke\'s Mobile Detailing and our customers when using our services or website.',
};

export default function TermsOfService() {
  return (
    <div className="container-custom py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <div className="prose max-w-none">
        <p className="lead text-lg mb-6">
          Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the https://lukesmobiledetailingllc.com website (the "Site") or mobile detailing services operated by Luke's Mobile Detailing ("us", "we", "our").
        </p>
        
        <p className="mb-4">
          Last Updated: May 6, 2025
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing our website or booking our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site or our services.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Services</h2>
        <p>
          Luke's Mobile Detailing provides mobile car detailing services that come to your location. All services are subject to availability, weather conditions, and other factors outside of our control.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Service Area</h3>
        <p>
          We currently service Yuba City, Marysville, Live Oak, Olivehurst, Linda, Gridley, Sutter, Plumas Lake, and surrounding areas in California. Service outside this area may be available with additional travel fees.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Service Requirements</h3>
        <p>
          To receive our services, you must provide:
        </p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>Access to your vehicle</li>
          <li>A safe, legal location for us to perform the service</li>
          <li>Water and electricity access (if required for the service package chosen)</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Bookings and Cancellations</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Booking Appointments</h3>
        <p>
          All service bookings must be made through our website booking system or by phone. A valid credit/debit card is required to secure your appointment.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Cancellation Policy</h3>
        <p>
          We understand that plans can change. Our cancellation policy is as follows:
        </p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>Cancellations made 24 hours or more before your scheduled appointment will receive a full refund of any prepaid amounts.</li>
          <li>Cancellations made less than 24 hours before your scheduled appointment may be subject to a cancellation fee of 25% of the service price.</li>
          <li>No-shows or cancellations after our technician has arrived may be charged the full service fee.</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Weather-Related Cancellations</h3>
        <p>
          We reserve the right to reschedule appointments due to inclement weather conditions that would affect the quality of our service or create unsafe working conditions. In such cases, no cancellation fee will be charged.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Payment</h2>
        <p>
          Payment is due upon completion of service unless otherwise arranged. We accept major credit cards, cash, and electronic payment methods (Square, Venmo, etc.).
        </p>
        <p className="mt-3">
          Prices are subject to change without notice. Additional charges may apply for:
        </p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>Excessively dirty vehicles</li>
          <li>Pet hair removal</li>
          <li>Oversized vehicles (SUVs, trucks, vans)</li>
          <li>Additional services requested on-site</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Satisfaction Guarantee</h2>
        <p>
          We take pride in our work and want you to be completely satisfied. If you're not satisfied with our service, please notify us within 24 hours of service completion, and we will return to address any concerns at no additional cost.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Liability</h2>
        <p>
          While we take the utmost care when servicing your vehicle, Luke's Mobile Detailing is not responsible for:
        </p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>Pre-existing damage not noted before service begins</li>
          <li>Normal wear and tear that may be revealed during cleaning</li>
          <li>Items left in the vehicle</li>
          <li>Damage due to acts of nature during service</li>
          <li>Damage that may occur due to pre-existing conditions of the vehicle (e.g., loose moldings, deteriorated clear coat, etc.)</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Website Use</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">7.1 Account Registration</h3>
        <p>
          When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding your password and for all activities that occur under your account.
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">7.2 Prohibited Activities</h3>
        <p>
          You may not:
        </p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>Use our website in any way that violates any applicable laws or regulations</li>
          <li>Engage in any conduct that restricts or inhibits anyone's use of our services</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Use our site to transmit malware or viruses</li>
          <li>Harvest or collect user information without permission</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Intellectual Property</h2>
        <p>
          All content, features, and functionality of our website, including but not limited to text, graphics, logos, and images, are the exclusive property of Luke's Mobile Detailing and are protected by copyright, trademark, and other intellectual property laws.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Modifications to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Service at any time. We will notify users of any significant changes by posting a notice on our website. Your continued use of our services after such modifications constitutes your acceptance of the updated Terms.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us:
        </p>
        <ul className="list-none pl-0 my-4 space-y-2">
          <li>Luke's Mobile Detailing</li>
          <li>Phone: <a href="tel:+15306503631" className="text-primary hover:underline">(530) 650-3631</a></li>
          <li>Email: <a href="mailto:luke8888z@gmail.com" className="text-primary hover:underline">luke8888z@gmail.com</a></li>
        </ul>
        
        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="mt-4">
            <Link href="/" className="text-primary hover:underline">Return to Home</Link> | <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> | <Link href="/sitemap" className="text-primary hover:underline">Sitemap</Link>
          </p>
        </div>
      </div>
    </div>
  );
} 