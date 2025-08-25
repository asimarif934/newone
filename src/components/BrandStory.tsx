import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import productsImage from "@/assets/products-showcase.jpg";

const ReviewsGallery = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const navigate = useNavigate();

  const reviews = [
    {
      id: 1,
      rating: 5,
      testimonial: "Absolutely stunning quality. My lips have never looked better! The velvet finish is incredible and it lasts all day perfectly.",
      customer: "Sophie M.",
      initials: "SM",
      image: productsImage
    },
    {
      id: 2,
      rating: 5,
      testimonial: "The velvet finish is incredible. Lasts all day perfectly. I love how it doesn't dry out my lips. Worth every euro!",
      customer: "Isabella R.",
      initials: "IR",
      image: productsImage
    },
    {
      id: 3,
      rating: 5,
      testimonial: "Luxury packaging and amazing results. Worth every euro! The colors are so rich and vibrant.",
      customer: "Camille L.",
      initials: "CL",
      image: productsImage
    },
    {
      id: 4,
      rating: 5,
      testimonial: "Best makeup I've ever used. The colors are so rich! Incredible staying power throughout the day.",
      customer: "Emma D.",
      initials: "ED",
      image: productsImage
    },
    {
      id: 5,
      rating: 5,
      testimonial: "Incredible staying power. I'm obsessed with this brand! The quality is unmatched.",
      customer: "Marie K.",
      initials: "MK",
      image: productsImage
    }
  ];

  // Auto-slide reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleViewAllReviews = () => {
    navigate("/reviews");
  };

  return (
    <section className="py-20 overflow-hidden bg-gradient-to-b from-yellow-500 via-black/5 to-black">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-white/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-white/20 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white/25 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Real Stories, Real Beauty
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Discover what our community says about their Real Touch Paris experience
          </p>
        </div>

        {/* Desktop Layout: Two Columns */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Reviews */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-8 drop-shadow-lg">Customer Reviews</h3>
            <div className="space-y-8">
              {reviews.slice(currentReviewIndex, currentReviewIndex + 3).map((review, index) => (
                <div key={review.id} className="relative">
                  {/* Staggered Review Card Layout */}
                  <div className={`relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:shadow-purple-500/25 hover:scale-105 ${
                    index % 2 === 0 ? 'mr-8' : 'ml-8'
                  }`}>
                    <div className="flex gap-6">
                      {/* Smaller Image (reduced by ~25%) */}
                      <div className="flex-shrink-0">
                        <div className="relative w-32 h-40 overflow-hidden rounded-2xl shadow-xl">
                          <img
                            src={review.image}
                            alt={review.customer}
                            className="w-full h-full object-cover"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          
                          {/* Customer Initials Badge */}
                          <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-xs font-bold text-purple-600">{review.initials}</span>
                          </div>
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className="flex-1 min-w-0">
                        {/* Star Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-300 fill-yellow-300 drop-shadow-sm" />
                          ))}
                        </div>
                        
                        {/* Review Text */}
                        <p className="text-white/95 mb-4 font-medium text-lg leading-relaxed">
                          "{review.testimonial}"
                        </p>
                        
                        {/* Reviewer Name */}
                        <div className="flex items-center gap-3">
                          <span className="text-white/90 font-semibold text-lg">{review.customer}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Subtle Drop Shadow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-3xl blur-xl transform ${
                    index % 2 === 0 ? 'mr-6 mt-2' : 'ml-6 mt-2'
                  }`}></div>
                </div>
              ))}
            </div>
            
            {/* Desktop Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevReview}
                className="w-12 h-12 rounded-full border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextReview}
                className="w-12 h-12 rounded-full border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right Column: Additional Reviews */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white mb-8 drop-shadow-lg">More Reviews</h3>
            <div className="space-y-6">
              {reviews.slice(currentReviewIndex + 3, currentReviewIndex + 5).map((review, index) => (
                <div key={review.id} className="relative">
                  <div className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl transform transition-all duration-500 hover:shadow-purple-500/25 hover:scale-105 ${
                    index % 2 === 0 ? 'ml-8' : 'mr-8'
                  }`}>
                    <div className="flex gap-4">
                      {/* Smaller Image */}
                      <div className="flex-shrink-0">
                        <div className="relative w-24 h-32 overflow-hidden rounded-xl shadow-lg">
                          <img
                            src={review.image}
                            alt={review.customer}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          <div className="absolute bottom-2 right-2 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-xs font-bold text-purple-600">{review.initials}</span>
                          </div>
                        </div>
                      </div>

                      {/* Review Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-300 fill-yellow-300 drop-shadow-sm" />
                          ))}
                        </div>
                        <p className="text-white/95 mb-3 font-medium leading-relaxed line-clamp-3">
                          "{review.testimonial}"
                        </p>
                        <span className="text-white/80 font-semibold">{review.customer}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Drop Shadow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-3xl blur-xl transform ${
                    index % 2 === 0 ? 'ml-6 mt-2' : 'mr-6 mt-2'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout: Stacked with Staggered Cards */}
        <div className="lg:hidden space-y-8">
          <h3 className="text-2xl font-bold text-white mb-8 drop-shadow-lg text-center">Customer Reviews</h3>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentReviewIndex * 100}%)` }}>
                {reviews.map((review, index) => (
                  <div key={review.id} className="w-full flex-shrink-0 px-2">
                    <div className="relative">
                      {/* Staggered Review Card for Mobile */}
                      <div className={`relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl transform transition-all duration-500 ${
                        index % 2 === 0 ? 'mr-4' : 'ml-4'
                      }`}>
                        <div className="flex gap-4">
                          {/* Smaller Image */}
                          <div className="flex-shrink-0">
                            <div className="relative w-24 h-32 overflow-hidden rounded-xl shadow-lg">
                              <img
                                src={review.image}
                                alt={review.customer}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                              <div className="absolute bottom-2 right-2 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-xs font-bold text-purple-600">{review.initials}</span>
                              </div>
                            </div>
                          </div>

                          {/* Review Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-300 fill-yellow-300 drop-shadow-sm" />
                              ))}
                            </div>
                            <p className="text-white/95 mb-3 font-medium leading-relaxed line-clamp-3">
                              "{review.testimonial}"
                            </p>
                            <span className="text-white/80 font-semibold">{review.customer}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Drop Shadow Effect */}
                      <div className={`absolute inset-0  rounded-3xl blur-xl transform ${
                        index % 2 === 0 ? 'mr-2 mt-2' : 'ml-2 mt-2'
                      }`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevReview}
                className="w-12 h-12 rounded-full border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentReviewIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextReview}
                className="w-12 h-12 rounded-full border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* View All Reviews Button */}
        <div className="text-center mt-16 pt-16 border-t border-white/20">
          <Button 
            onClick={handleViewAllReviews}
            className="bg-amber-400 text-amber-900 hover:bg-yellow-500 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 group shadow-2xl hover:shadow-[var(--shadow-glow)]"
          >
            View All Reviews
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-50" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsGallery;