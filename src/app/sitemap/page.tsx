import Link from 'next/link';

export const metadata = {
  title: 'Sitemap | Luke\'s Mobile Detailing',
  description: 'Find all pages on our website through this sitemap. Navigate easily through our services, locations, and resources.',
};

export default function Sitemap() {
  const sitemapCategories = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'About Us', href: '/about' },
        { name: 'Gallery', href: '/gallery' },
        { name: 'Reviews', href: '/reviews' },
        { name: 'Contact', href: '/contact' },
        { name: 'Book an Appointment', href: 'https://app.squareup.com/appointments/buyer/widget/hs7hvrxqk38fag/L51SWV5N7VVBD' },
      ]
    },
    {
      title: 'Our Services',
      links: [
        { name: 'Full Detail Package', href: '/services#full-detail' },
        { name: 'Interior Detail', href: '/services#interior-detail' },
        { name: 'Exterior Detail', href: '/services#exterior-detail' },
        { name: 'Paint Correction', href: '/services#paint-correction' },
        { name: 'Ceramic Coating', href: '/services#ceramic-coating' },
      ]
    },
    {
      title: 'Service Areas',
      links: [
        { name: 'Yuba City', href: '/contact#service-area' },
        { name: 'Marysville', href: '/contact#service-area' },
        { name: 'Live Oak', href: '/contact#service-area' },
        { name: 'Olivehurst', href: '/contact#service-area' },
        { name: 'Gridley', href: '/contact#service-area' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms-of-service' },
        { name: 'Accessibility', href: '/accessibility' },
      ]
    },
  ];

  return (
    <div className="container-custom py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
      <p className="mb-8">Use this sitemap to find any page on our website. If you can't find what you're looking for, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sitemapCategories.map((category) => (
          <div key={category.title} className="border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
            <ul className="space-y-2">
              {category.links.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('http') ? (
                    <a 
                      href={link.href} 
                      className="text-primary hover:underline" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-primary hover:underline">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 