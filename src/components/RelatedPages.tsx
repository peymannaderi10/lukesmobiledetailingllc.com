import React from 'react';
import Link from 'next/link';

interface RelatedPage {
  title: string;
  path: string;
  description: string;
}

interface RelatedPagesProps {
  currentPath: string;
  title?: string;
}

const RelatedPages: React.FC<RelatedPagesProps> = ({ currentPath, title = "You Might Also Be Interested In" }) => {
  const allPages: RelatedPage[] = [
    {
      title: "Home",
      path: "/",
      description: "Return to our homepage to learn more about Luke's Mobile Detailing services."
    },
    {
      title: "Our Services",
      path: "/services",
      description: "Explore our full range of professional detailing services for your vehicle."
    },
    {
      title: "About Us",
      path: "/about",
      description: "Learn about our expertise and commitment to quality car detailing."
    },
    {
      title: "Gallery",
      path: "/gallery",
      description: "See examples of our work and the transformations we've achieved."
    },
    {
      title: "Reviews",
      path: "/reviews",
      description: "Read what our satisfied customers have to say about our detailing services."
    },
    {
      title: "Contact Us",
      path: "/contact",
      description: "Get in touch with us for questions or special requests."
    }
  ];

  // Filter out the current page
  const relatedPages = allPages.filter(page => page.path !== currentPath);

  // Show 3-4 related pages
  const pagesToShow = relatedPages.slice(0, 4);

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pagesToShow.map((page, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-medium mb-2">{page.title}</h3>
              <p className="text-gray-600 mb-4">{page.description}</p>
              <Link 
                href={page.path} 
                className="text-red-600 hover:text-red-800 font-medium inline-flex items-center"
              >
                Learn more
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPages; 