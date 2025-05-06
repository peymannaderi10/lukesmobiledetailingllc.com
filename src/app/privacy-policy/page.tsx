import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Luke\'s Mobile Detailing',
  description: 'Our privacy policy explains how we collect, use, and protect your personal information when you use our website or services.',
};

export default function PrivacyPolicy() {
  return (
    <div className="container-custom py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <p className="lead text-lg mb-6">
          This Privacy Policy describes how Luke's Mobile Detailing ("we", "us", or "our") collects, uses, and shares your personal information when you visit or make a purchase from lukesmobiledetailingllc.com (the "Site") or use our mobile detailing services.
        </p>
        
        <p className="mb-4">
          Last Updated: May 6, 2025
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Personal Information</h3>
        <p>
          When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your bookings. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information that can uniquely identify an individual (including the information below) as "Personal Information". See the list below for more information about what Personal Information we collect.
        </p>
        
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li><strong>Personal Information You Provide:</strong> Name, Email, Phone number, Address (for mobile service locations), Vehicle information, Billing and payment information</li>
          <li><strong>Device Information:</strong> Web browser, IP address, Device type</li>
          <li><strong>Order Information:</strong> Service type, Purchase history, Payment information</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Usage Information</h3>
        <p>
          We also collect information about how you use our website, including:
        </p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>Pages you visit</li>
          <li>Time spent on each page</li>
          <li>Links you click</li>
          <li>Services you view</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>Provide, operate, and maintain our website and services</li>
          <li>Process and complete your service bookings</li>
          <li>Send you appointment confirmations and service reminders</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Improve our website and customer experience</li>
          <li>Send you marketing communications (if you've opted in)</li>
          <li>Protect against fraud and unauthorized transactions</li>
          <li>Comply with legal obligations</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Sharing Your Personal Information</h2>
        <p>
          We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above. For example:
        </p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li><strong>Payment processors:</strong> We use Square to process your payment information securely. Their use of your personal information is governed by their Privacy Policy.</li>
          <li><strong>Booking systems:</strong> We use appointment scheduling systems to manage your bookings.</li>
          <li><strong>Marketing and analytics partners:</strong> We use service providers to help us with marketing and analyzing how users interact with our website.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
        <p>
          A cookie is a small amount of information that's downloaded to your computer or device when you visit our Site. We use a number of different cookies, including functional, performance, advertising, and social media or content cookies. Cookies make your browsing experience better by allowing the website to remember your actions and preferences. This means you don't have to re-enter this information each time you return to the site or browse from one page to another.
        </p>
        <p className="mt-3">
          You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can negatively impact your user experience and parts of our website might no longer be fully accessible.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Do Not Track</h2>
        <p>
          Please note that because there is no consistent industry understanding of how to respond to "Do Not Track" signals, we do not alter our data collection and usage practices when we detect such a signal from your browser.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
        <p>
          If you are a resident of California, you have the rights outlined in the California Consumer Privacy Act (CCPA). These include:
        </p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>The right to know about the personal information we collect about you and how it's used and shared</li>
          <li>The right to delete personal information collected from you (with certain exceptions)</li>
          <li>The right to opt-out of the sale of your personal information</li>
          <li>The right to non-discrimination for exercising your CCPA rights</li>
        </ul>
        <p className="mt-3">
          To exercise your rights, please contact us using the information provided in the "Contact Us" section below.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Data Retention</h2>
        <p>
          We will keep your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Changes</h2>
        <p>
          We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons. When we make changes, we will update the "Last Updated" date at the top of this policy.
        </p>
        <p className="mt-3">
          We encourage you to check this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p>
          For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by email at <a href="mailto:luke8888z@gmail.com" className="text-primary hover:underline">luke8888z@gmail.com</a> or by phone at <a href="tel:+15306503631" className="text-primary hover:underline">(530) 650-3631</a>.
        </p>
        
        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="mt-4">
            <Link href="/" className="text-primary hover:underline">Return to Home</Link> | <Link href="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link> | <Link href="/sitemap" className="text-primary hover:underline">Sitemap</Link>
          </p>
        </div>
      </div>
    </div>
  );
} 