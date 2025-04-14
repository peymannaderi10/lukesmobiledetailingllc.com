import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

// Reviews data (in a real app, this would come from a database)
const reviews = [
  {
    id: 1,
    name: "John Smith",
    service: "Premium Package",
    date: "September 15, 2023",
    rating: 5,
    review: "Luke did an amazing job on my SUV. It had months of dirt and grime, and now it looks better than when I bought it. The interior detailing was particularly impressive - my kids had done a number on the upholstery, and Luke got out stains I thought would be there forever. Highly recommend his premium package!",
    vehicle: "BMW X5",
    beforeImage: "/placeholder-before.jpg",
    afterImage: "/placeholder-after.jpg",
  },
  {
    id: 2,
    name: "Sarah Davis",
    service: "Ultimate Package",
    date: "August 22, 2023",
    rating: 5,
    review: "I was amazed at the transformation of my car. Luke's attention to detail is outstanding. The paint correction removed years of swirl marks, and the ceramic coating has made washing my car so much easier. Water just beads right off! The convenience of having him come to my home made it even better. Worth every penny.",
    vehicle: "Tesla Model 3",
    beforeImage: "/placeholder-before.jpg",
    afterImage: "/placeholder-after.jpg",
  },
  {
    id: 3,
    name: "Michael Johnson",
    service: "Basic Package",
    date: "July 10, 2023",
    rating: 4,
    review: "Great service at a reasonable price. Luke arrived on time and was very professional. My car hasn't looked this clean in years. The only reason for 4 stars instead of 5 is that there were a couple of spots on the exterior that could have used a bit more attention, but overall I'm very satisfied and will use the service again.",
    vehicle: "Honda Accord",
    beforeImage: "/placeholder-before.jpg",
    afterImage: "/placeholder-after.jpg",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    service: "Premium Package",
    date: "June 5, 2023",
    rating: 5,
    review: "Luke is a true professional. He spent nearly 4 hours on my vehicle and the results were spectacular. The interior looks and smells brand new, and the exterior is gleaming. He even took care of some minor scratches at no extra charge. I've scheduled another appointment for my husband's truck next month.",
    vehicle: "Audi Q7",
    beforeImage: "/placeholder-before.jpg",
    afterImage: "/placeholder-after.jpg",
  },
  {
    id: 5,
    name: "David Wilson",
    service: "Ultimate Package",
    date: "May 17, 2023",
    rating: 5,
    review: "I had Luke perform the Ultimate Package on my Porsche, and I couldn't be happier with the results. The paint correction and ceramic coating made a huge difference - my car looks better than showroom condition. Luke's knowledge and passion for his craft are evident in his work. A bit pricey, but absolutely worth it for a vehicle you care about.",
    vehicle: "Porsche 911",
    beforeImage: "/placeholder-before.jpg",
    afterImage: "/placeholder-after.jpg",
  },
  {
    id: 6,
    name: "Jennifer Lee",
    service: "Basic Package",
    date: "April 30, 2023",
    rating: 5,
    review: "As a busy mom of three, I don't have time to keep my minivan clean. Luke came to my house during my kids' naptime and transformed my disaster of a vehicle in just 2 hours. He was quiet, efficient, and the results were amazing. The convenience factor alone is worth it, but the quality of work exceeded my expectations.",
    vehicle: "Toyota Sienna",
    beforeImage: "/placeholder-before.jpg",
    afterImage: "/placeholder-after.jpg",
  },
];

// Generate star rating components
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        i < rating 
          ? <StarIcon key={i} className="h-5 w-5 text-primary" /> 
          : <StarOutlineIcon key={i} className="h-5 w-5 text-gray-300" />
      ))}
    </div>
  );
};

export default function ReviewsPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-secondary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Customer Reviews</h1>
          <div className="flex justify-center items-center gap-1 mb-4">
            <StarIcon className="h-6 w-6 text-primary" />
            <StarIcon className="h-6 w-6 text-primary" />
            <StarIcon className="h-6 w-6 text-primary" />
            <StarIcon className="h-6 w-6 text-primary" />
            <StarIcon className="h-6 w-6 text-primary" />
            <span className="ml-2 text-2xl font-bold">4.9/5</span>
          </div>
          <p className="text-lg max-w-2xl mx-auto">
            See what our customers have to say about our detailing services.
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Left column with customer info */}
                    <div className="md:w-1/4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-bold">{review.name}</h3>
                          <p className="text-gray-500 text-sm">{review.date}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <StarRating rating={review.rating} />
                      </div>
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">Service:</p>
                        <p className="font-medium">{review.service}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Vehicle:</p>
                        <p className="font-medium">{review.vehicle}</p>
                      </div>
                    </div>
                    
                    {/* Right column with review and images */}
                    <div className="md:w-3/4">
                      <div className="mb-6">
                        <h3 className="font-bold text-lg mb-3">Review</h3>
                        <p className="text-gray-600">{review.review}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-lg mb-3">Before & After</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <div className="bg-gray-200 rounded-lg overflow-hidden h-48 sm:h-64 flex items-center justify-center">
                              {/* Replace with actual image */}
                              <p className="text-gray-500">Before Image</p>
                            </div>
                            <p className="text-center text-sm mt-2 text-gray-500">Before</p>
                          </div>
                          <div>
                            <div className="bg-gray-200 rounded-lg overflow-hidden h-48 sm:h-64 flex items-center justify-center">
                              {/* Replace with actual image */}
                              <p className="text-gray-500">After Image</p>
                            </div>
                            <p className="text-center text-sm mt-2 text-gray-500">After</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Review Section */}
      <section className="py-12 md:py-20 bg-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Had a Great Experience?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We'd love to hear about your experience with Luke's Mobile Detailing.
              Share your feedback and help others discover our services!
            </p>
            <div className="mt-6">
              <Link 
                href="/contact?subject=Review" 
                className="btn-primary px-8 py-3"
              >
                Submit Your Review
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Before & After Transformations */}
      <section className="py-12 md:py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Transformations</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Take a look at some of our most impressive detailing transformations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Transformation 1 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative pt-[56.25%]">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  {/* Replace with actual image */}
                  <p className="text-gray-500">Transformation Image</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Paint Correction & Ceramic Coating</h3>
                <p className="text-gray-600 mb-4">
                  Removed years of swirl marks and applied a premium ceramic coating for long-lasting protection.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Vehicle: Mercedes-Benz C300</span>
                  <span className="text-sm font-medium text-primary">Ultimate Package</span>
                </div>
              </div>
            </div>
            
            {/* Transformation 2 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative pt-[56.25%]">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  {/* Replace with actual image */}
                  <p className="text-gray-500">Transformation Image</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Interior Restoration</h3>
                <p className="text-gray-600 mb-4">
                  Deep cleaned heavily soiled seats and carpets, restoring them to like-new condition.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Vehicle: Ford F-150</span>
                  <span className="text-sm font-medium text-primary">Premium Package</span>
                </div>
              </div>
            </div>
            
            {/* Transformation 3 */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="relative pt-[56.25%]">
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  {/* Replace with actual image */}
                  <p className="text-gray-500">Transformation Image</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Headlight Restoration</h3>
                <p className="text-gray-600 mb-4">
                  Restored foggy, yellowed headlights to crystal clear, improving visibility and appearance.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Vehicle: Toyota Camry</span>
                  <span className="text-sm font-medium text-primary">Add-on Service</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/gallery" className="btn-outline px-8 py-3">
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for Your Own Transformation?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the same exceptional results our customers rave about. Book your detailing service today!
          </p>
          <Link href="/booking" className="btn bg-white text-primary hover:bg-gray-100 font-bold px-8 py-3">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
} 