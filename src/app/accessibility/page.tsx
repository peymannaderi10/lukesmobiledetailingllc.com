import Link from 'next/link';

export const metadata = {
  title: 'Accessibility Statement | Luke\'s Mobile Detailing',
  description: 'Our commitment to accessibility for all users of our website. Learn about our accessibility features and how to report issues.',
};

export default function Accessibility() {
  return (
    <div className="container-custom py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Accessibility Statement</h1>
      
      <div className="prose max-w-none">
        <p className="lead text-lg mb-6">
          Luke's Mobile Detailing is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Commitment</h2>
        <p>
          We strive to ensure that our website follows WCAG 2.1 (Web Content Accessibility Guidelines) at level AA. These guidelines explain how to make web content more accessible to people with a wide array of disabilities, including:
        </p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>Visual impairments</li>
          <li>Hearing impairments</li>
          <li>Physical limitations</li>
          <li>Speech disabilities</li>
          <li>Cognitive limitations</li>
          <li>Language barriers</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Features We've Implemented</h2>
        <p>
          Some of the accessibility features we've implemented on our website include:
        </p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>Semantic HTML structure for better screen reader compatibility</li>
          <li>Keyboard navigation support</li>
          <li>Color contrast that meets WCAG 2.1 AA standards</li>
          <li>Text resizing without loss of content or functionality</li>
          <li>Alt text for all informative images</li>
          <li>Clear and consistent navigation</li>
          <li>Form labels and instructions that are clearly associated with their controls</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Feedback and Contact Information</h2>
        <p>
          We welcome your feedback on the accessibility of Luke's Mobile Detailing website. Please let us know if you encounter accessibility barriers:
        </p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li>Phone: <a href="tel:+15306503631" className="text-primary hover:underline">(530) 650-3631</a></li>
          <li>Email: <a href="mailto:luke8888z@gmail.com" className="text-primary hover:underline">luke8888z@gmail.com</a></li>
          <li>Feedback: <Link href="/contact" className="text-primary hover:underline">Contact Form</Link></li>
        </ul>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Assessment and Ongoing Improvement</h2>
        <p>
          We are currently assessing our website against WCAG 2.1 Level AA criteria and working to remedy any issues. Our website accessibility is an ongoing effort, and we are regularly reviewing and improving our systems.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Helpful Resources</h2>
        <p>
          For more information about web accessibility, please visit these helpful resources:
        </p>
        <ul className="list-disc pl-6 my-4 space-y-2">
          <li><a href="https://www.w3.org/WAI/standards-guidelines/wcag/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Web Content Accessibility Guidelines (WCAG)</a></li>
          <li><a href="https://www.ada.gov/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Americans with Disabilities Act (ADA)</a></li>
          <li><a href="https://www.section508.gov/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Section 508</a></li>
        </ul>
        
        <div className="mt-10 pt-8 border-t border-gray-200">
          <p>
            This statement was last updated on May 6, 2025. As we continue to improve our website, this statement will be updated to reflect our ongoing commitment to accessibility.
          </p>
          <p className="mt-4">
            <Link href="/" className="text-primary hover:underline">Return to Home</Link> | <Link href="/contact" className="text-primary hover:underline">Contact Us</Link> | <Link href="/sitemap" className="text-primary hover:underline">Sitemap</Link>
          </p>
        </div>
      </div>
    </div>
  );
} 