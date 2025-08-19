import { useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Heart,
  ShoppingCart,
  ArrowLeft,
  Truck,
  Shield,
  Leaf,
  Minus,
  Plus,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

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
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  // ✅ Ensure we always start at the top when landing on (or switching) product pages
  useLayoutEffect(() => {
    try {
      const prev = (window.history as any).scrollRestoration;
      // Guard against browsers that support this
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      // Restore previous behavior on cleanup
      return () => {
        if ("scrollRestoration" in window.history) {
          window.history.scrollRestoration = prev ?? "auto";
        }
      };
    } catch {
      // Fallback (older browsers)
      window.scrollTo(0, 0);
    }
  }, [id]);

  const productData = products.find((p) => p.id === Number(id));

  if (!productData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh] px-4">
          <div className="text-center bg-card/60 backdrop-blur-sm px-6 sm:px-10 py-8 rounded-2xl shadow-xl border border-border/50">
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-primary mb-4 tracking-widest">
              Product Not Found
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              The product you're looking for doesn't exist.
            </p>
            <Button
              onClick={() => navigate("/products")}
              className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 
                         text-black font-semibold px-4 sm:px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(255,193,7,0.5)] 
                         hover:scale-110 hover:shadow-[0_0_40px_rgba(255,193,7,0.8)] transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const product: Product = {
    id: productData.id,
    name: productData.name,
    price: `$${productData.price}`,
    originalPrice:
      productData.originalPrice > productData.price
        ? `$${productData.originalPrice}`
        : undefined,
    rating: productData.rating,
    reviews: productData.reviews,
    badge: productData.isBestSeller
      ? "Best Seller"
      : productData.isLimitedEdition
      ? "Limited Edition"
      : undefined,
    discount:
      productData.originalPrice > productData.price
        ? `${Math.round(
            ((productData.originalPrice - productData.price) /
              productData.originalPrice) *
              100
          )}% OFF`
        : undefined,
    image: productData.image,
    description: productData.description,
  };

  const productImages = [product.image, product.image, product.image];

  const customerReviews = [
    {
      id: 1,
      customer: "Sophie M.",
      rating: 5,
      date: "2 days ago",
      comment:
        "Absolutely stunning quality. My lips have never looked better! The velvet finish is incredible and it lasts all day perfectly.",
    },
    {
      id: 2,
      customer: "Isabella R.",
      rating: 5,
      date: "1 week ago",
      comment:
        "The color is perfect and the formula is so smooth. I love how it doesn't dry out my lips. Worth every euro!",
    },
    {
      id: 3,
      customer: "Camille L.",
      rating: 4,
      date: "2 weeks ago",
      comment:
        "Beautiful packaging and great color payoff. The only reason I gave it 4 stars is because I wish it lasted a bit longer.",
    },
  ];

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === productData.category && item.id !== productData.id
    )
    .slice(0, 4)
    .map((item) => ({
      id: item.id,
      name: item.name,
      price: `$${item.price}`,
      image: item.image,
      badge: item.isBestSeller
        ? "Best Seller"
        : item.isLimitedEdition
        ? "Limited Edition"
        : undefined,
    }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-x-hidden">
      <Navigation />

      {/* Responsive wrapper to prevent overflow */}
      <div className="w-full max-w-full overflow-x-hidden">
        {/* Header */}
        <div className="pt-3 pb-5 text-center px-4 sm:px-6">
          <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-foreground drop-shadow-lg tracking-wide bg-card/60 backdrop-blur-sm inline-block px-4 sm:px-2 py-3 rounded-2xl border border-border/50">
            {product.name}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground italic bg-card/50 backdrop-blur-sm inline-block px-3 sm:px-4 py-2 rounded-xl border border-border/30">
            Elegance meets Parisian luxury
          </p>
        </div>

        {/* Main Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-5 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16">
          {/* Left: Images */}
          <div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/50 group bg-card">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
              />

              {product.discount && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                  {product.discount}
                </Badge>
              )}

              {product.badge && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm shadow-lg">
                  {product.badge}
                </Badge>
              )}

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:scale-125 transition-all shadow-lg"
              >
                <Heart
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${
                    isWishlisted
                      ? "text-red-500 fill-red-500"
                      : "text-gray-700"
                  }`}
                />
              </button>
            </div>

            {/* Thumbnails */}
           {/* <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-5">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-xl border-2 overflow-hidden transition duration-300 bg-card ${
                    selectedImage === idx
                      ? "border-primary "
                      : "border-border/50 hover:border-primary/10"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>*/}
          </div>

          {/* Right: Info */}
          <div className="space-y-8 bg-card/60 backdrop-blur-sm p-3 sm:p-8 rounded-2xl border border-border/50 shadow-xl">
            {product.badge && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 
                               text-black font-semibold px-4 sm:px-5 py-1 shadow-lg rounded-full text-sm">
                {product.badge}
              </Badge>
            )}

            <div className="flex items-center gap-3 sm:gap-4 flex-wrap !mt-3 ml-2">
              <p className="text-3xl sm:text-5xl font-bold text-foreground">
                ${(Number(productData.price) * quantity).toFixed(2)}
              </p>
              {product.originalPrice && (
                <p className="text-lg sm:text-2xl text-muted-foreground line-through">
                  {product.originalPrice}
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="inline-flex items-center gap-4 border border-yellow-500 rounded-lg p-1 !mt-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="bg-card/70 p-2 sm:p-3 rounded-lg border border-border/50 hover:bg-primary hover:text-primary-foreground transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="bg-card/70 p-2 sm:p-3 rounded-lg border border-border/50 hover:bg-primary hover:text-primary-foreground transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-2 !mt-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-500 fill-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
              <span className="text-xs sm:text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Product Description */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 !mt-3 pl-0 pr-0">
              <h2 className="text-xl sm:text-3xl font-serif text-foreground mb-3">
                Product Description
              </h2>
              <div
                className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-3 text-muted-foreground shadow-lg relative transition-all"
                style={{
                  maxHeight: isExpanded ? "none" : "160px",
                  overflow: "hidden",
                }}
              >
                {product.description}
                <p className="mt-4">
                  This product is designed with premium ingredients for maximum
                  comfort, lasting wear, and a luxurious finish. Perfect for any
                  occasion.
                </p>

                {!isExpanded && (
                  <div className="absolute bottom-0 right-0 bg-gradient-to-t from-card/90 to-transparent w-full flex justify-end p-2">
                    <Button
                      variant="ghost"
                      className="bg-black/70 border border-yellow-500 rounded-full text-primary font-semibold px-2 py-0 text-xs"
                      onClick={() => setIsExpanded(true)}
                    >
                      View More
                    </Button>
                  </div>
                )}

                {isExpanded && (
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="ghost"
                      className="text-primary font-semibold"
                      onClick={() => setIsExpanded(false)}
                    >
                      View Less
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="flex justify-center gap-2 flex-nowrap w-full !mt-3">
              <div className="bg-card/60 rounded-xl p-2 sm:p-3 flex-1 min-w-0 border border-border/50 hover:scale-105 hover:border-primary transition-all 
                  flex flex-col items-center justify-center text-center">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-1" />
                <p className="text-foreground text-xs sm:text-sm">Shipping in 2 days</p>
              </div>

              <div className="bg-card/60 rounded-xl p-2 sm:p-3 flex-1 min-w-0 border border-border/50 hover:scale-105 hover:border-primary transition-all 
                  flex flex-col items-center justify-center text-center">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-1" />
                <p className="text-foreground text-xs sm:text-sm">7-Day Returns</p>
              </div>

              <div className="bg-card/60 rounded-xl p-2 sm:p-3 flex-1 min-w-0 border border-border/50 hover:scale-105 hover:border-primary transition-all 
                  flex flex-col items-center justify-center text-center">
                <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-primary mb-1" />
                <p className="text-foreground text-xs sm:text-sm">Kind</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center !mt-3">
              <Button className="flex-1 bg-transparent border-2 border-primary text-primary 
                               hover:bg-primary hover:text-primary-foreground text-base sm:text-lg py-3 sm:py-4 rounded-xl shadow-lg transition-all mr-3">
                <ShoppingCart className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Add to Cart
              </Button>
              <Button className="flex-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-black font-bold text-base sm:text-lg py-3 px-6 sm:py-4 
                               rounded-xl shadow-xl hover:scale-110 transition-transform">
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-5">
          <h2 className="text-2xl sm:text-3xl font-serif text-center text-foreground mb-10 tracking-wide">
            Customer Reviews
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {customerReviews.map((review) => (
              <div
                key={review.id}
                className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-xl hover:border-primary/40 hover:scale-105 transition-all"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 italic">
                  "{review.comment}"
                </p>
                <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                  <span>{review.customer}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-14 mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif text-center text-foreground mb-14 tracking-wide">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
            {relatedProducts.map((rp) => (
              <div
                key={rp.id}
                onClick={() => navigate(`/product/${rp.id}`)}
                className="cursor-pointer group border border-border/50 rounded-2xl p-4 sm:p-6 transition-all 
                         bg-card/60 backdrop-blur-sm hover:bg-card/80 
                         hover:shadow-[0_0_40px_rgba(255,193,7,0.7)] hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-xl mb-4 aspect-square">
                  <img
                    src={rp.image}
                    alt={rp.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                  {rp.badge && (
                    <Badge className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full shadow-md">
                      {rp.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="text-sm sm:text-base text-foreground font-semibold group-hover:text-primary transition-colors">
                  {rp.name}
                </h3>
                <p className="text-primary font-bold text-sm sm:text-base">
                  {rp.price}
                </p>
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
