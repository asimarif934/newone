import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, ArrowLeft, Share2, Truck, Shield, Leaf } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import productsImage from "@/assets/products-showcase.jpg";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  badge?: string;
  discount?: string;
  image: string;
  description: string;
}

const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product: Product = location.state?.product || {
    id: 1,
    name: "Rose Gold Velvet Lipstick",
    price: "€42",
    originalPrice: "€55",
    rating: 4.9,
    reviews: 247,
    badge: "Best Seller",
    discount: "30% OFF",
    image: productsImage,
    description: "Luxurious velvet finish with 12-hour wear"
  };

  // Mock product images (in real app, these would come from the product data)
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  // Mock customer reviews
  const customerReviews = [
    {
      id: 1,
      customer: "Sophie M.",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely stunning quality. My lips have never looked better! The velvet finish is incredible and it lasts all day perfectly."
    },
    {
      id: 2,
      customer: "Isabella R.",
      rating: 5,
      date: "1 week ago",
      comment: "The color is perfect and the formula is so smooth. I love how it doesn't dry out my lips. Worth every euro!"
    },
    {
      id: 3,
      customer: "Camille L.",
      rating: 4,
      date: "2 weeks ago",
      comment: "Beautiful packaging and great color payoff. The only reason I gave it 4 stars is because I wish it lasted a bit longer."
    }
  ];

  // Mock related products
  const relatedProducts = [
    {
      id: 1,
      name: "Golden Hour Eyeshadow Palette",
      price: "€78",
      image: productsImage,
      badge: "Limited Edition"
    },
    {
      id: 2,
      name: "Midnight Glam Mascara",
      price: "€35",
      image: productsImage,
      badge: "Best Seller"
    },
    {
      id: 3,
      name: "Pearl Essence Foundation",
      price: "€65",
      image: productsImage
    }
  ];

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleBuyNow = () => {
    // TODO: Implement checkout logic
    console.log(`Buying ${product.name} for ${product.price}`);
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart logic
    console.log(`Adding ${quantity} ${product.name} to cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B0000] via-[#2D1810] to-[#000000] relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-amber-400 rounded-full animate-float opacity-80" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/5 w-3 h-3 bg-amber-400 rounded-full animate-float opacity-40" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-amber-400 rounded-full animate-float opacity-70" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <Navigation />
      
      {/* Header */}
      <div className="pt-20 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackClick}
              className="w-10 h-10 rounded-full border border-amber-400/50 text-amber-400 hover:bg-amber-400/20 backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">{product.name}</h1>
              <p className="text-amber-200/80 mt-1 drop-shadow-md">Luxury Beauty Collection</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-black/20 backdrop-blur-sm border border-amber-400/30 shadow-2xl">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-red-500 text-white text-sm px-3 py-1">
                    {product.discount}
                  </Badge>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={handleAddToWishlist}
                className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <Heart 
                  className={`w-6 h-6 ${
                    isWishlisted 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-gray-800'
                  }`} 
                />
              </button>

              {/* Share Button */}
              <button className="absolute top-4 right-20 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110">
                <Share2 className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all duration-300 bg-black/20 backdrop-blur-sm ${
                    selectedImage === index 
                      ? 'border-amber-400 scale-105 shadow-lg shadow-amber-400/25' 
                      : 'border-amber-400/30 hover:border-amber-400/60'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="space-y-8">
            {/* Badge */}
            {product.badge && (
              <Badge className="bg-gradient-to-r from-amber-400 to-yellow-400 text-black text-sm px-4 py-2 font-semibold shadow-lg">
                {product.badge}
              </Badge>
            )}

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl md:text-4xl font-bold text-amber-400 drop-shadow-lg">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-amber-200/60 line-through">{product.originalPrice}</span>
              )}
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-500'
                    }`}
                  />
                ))}
              </div>
              <span className="text-amber-200/80">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3 drop-shadow-md">Description</h3>
              <p className="text-amber-200/90 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-400/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-400/30">
                  <Truck className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Free Shipping</p>
                  <p className="text-sm text-amber-200/70">On orders over €50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-400/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-400/30">
                  <Shield className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-white">30-Day Returns</p>
                  <p className="text-sm text-amber-200/70">Hassle-free returns</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-400/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-400/30">
                  <Leaf className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-white">Cruelty Free</p>
                  <p className="text-sm text-amber-200/70">100% vegan friendly</p>
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <label className="font-medium text-white">Quantity:</label>
                <div className="flex items-center border border-amber-400/50 rounded-lg bg-black/20 backdrop-blur-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-amber-400/20 transition-colors text-amber-400 font-bold"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-amber-400/20 transition-colors text-amber-400 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-transparent border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black transition-all duration-300 py-4 text-lg font-semibold shadow-lg hover:shadow-amber-400/25"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-400 text-black hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 py-4 text-lg font-semibold shadow-lg hover:shadow-amber-400/25"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customerReviews.map((review) => (
              <div key={review.id} className="bg-black/20 backdrop-blur-sm border border-amber-400/30 rounded-xl p-6 shadow-2xl hover:shadow-amber-400/25 transition-all duration-300">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-500'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-amber-200/90 mb-4 leading-relaxed">
                  "{review.comment}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{review.customer}</span>
                  <span className="text-sm text-amber-200/70">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center drop-shadow-lg">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-black/20 backdrop-blur-sm border border-amber-400/30 rounded-xl p-6 shadow-2xl hover:shadow-amber-400/25 transition-all duration-300 cursor-pointer group">
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {relatedProduct.badge && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-amber-400 text-black text-xs font-semibold shadow-lg">
                        {relatedProduct.badge}
                      </Badge>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-white mb-2">{relatedProduct.name}</h3>
                <p className="text-amber-400 font-bold">{relatedProduct.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Product;
