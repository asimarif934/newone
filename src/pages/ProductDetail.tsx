import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  ArrowLeft, 
  Share2, 
  Minus, 
  Plus,
  MessageCircle,
  User,
  Calendar
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { products, Product } from "@/data/products";

interface Review {
  id: number;
  customer: string;
  rating: number;
  comment: string;
  date: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: ""
  });

  // Find product by ID
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/products')} className="bg-primary hover:bg-primary/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Sample reviews data
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      customer: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely love this product! The quality is exceptional and it exceeded my expectations. Highly recommend!",
      date: "2024-01-15"
    },
    {
      id: 2,
      customer: "Michael Chen",
      rating: 4,
      comment: "Great product with amazing results. The packaging is beautiful and the formula feels luxurious on my skin.",
      date: "2024-01-10"
    },
    {
      id: 3,
      customer: "Emma Davis",
      rating: 5,
      comment: "This has become a staple in my beauty routine. The results are visible within days and the texture is perfect.",
      date: "2024-01-08"
    }
  ]);

  // Calculate discount
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // Get related products (same category, excluding current)
  const relatedProducts = products.filter(
    item => item.category === product.category && item.id !== product.id
  ).slice(0, 4);

  // Handle review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      const review: Review = {
        id: reviews.length + 1,
        customer: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };
      setReviews([review, ...reviews]);
      setNewReview({ name: "", rating: 5, comment: "" });
    }
  };

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : product.rating;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      {/* Header with Back Button */}
      <div className="pt-24 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full border border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{product.name}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 shadow-xl">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
              />
              
              {/* Badges */}
              {discount && (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-lg">
                  {discount}% OFF
                </Badge>
              )}
              {product.isBestSeller && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold shadow-lg">
                  Best Seller
                </Badge>
              )}
              {product.isLimitedEdition && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg">
                  Limited Edition
                </Badge>
              )}
              
              {/* Action Buttons */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setWishlist(!wishlist)}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      wishlist ? "text-red-500 fill-red-500" : "text-gray-700"
                    }`}
                  />
                </button>
                <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300">
                  <Share2 className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            {/* Price and Rating */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-foreground">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl line-through text-muted-foreground">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium text-foreground">{averageRating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">
                  ({reviews.length} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg bg-background">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted/50 transition-colors duration-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted/50 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {quantity} × ${product.price} = ${(quantity * product.price).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button 
                size="lg" 
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Buy Now
              </Button>
            </div>

            {/* Product Details */}
            <div className="pt-6 border-t border-border/50">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <span className="ml-2 font-medium">{product.category}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">SKU:</span>
                  <span className="ml-2 font-medium">SKU-{product.id.toString().padStart(4, '0')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Customer Reviews</h2>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">{reviews.length} reviews</span>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {reviews.map((review) => (
              <Card key={review.id} className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-foreground">{review.customer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">"{review.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Review Form */}
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Add Your Review</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                    <Input
                      value={newReview.name}
                      onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Rating</label>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setNewReview({...newReview, rating: i + 1})}
                          className="p-1 hover:scale-110 transition-transform duration-200"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              i < newReview.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Comment</label>
                  <Textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    placeholder="Share your experience with this product..."
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Submit Review
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => {
              const itemDiscount = item.originalPrice > item.price
                ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                : null;

              return (
                <Link
                  key={item.id}
                  to={`/products/${item.id}`}
                  className="group"
                >
                  <Card className="border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <CardHeader className="relative pb-4">
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                        {itemDiscount && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white shadow-md">
                            {itemDiscount}% OFF
                          </Badge>
                        )}
                        {item.isBestSeller && (
                          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold shadow-md">
                            Best Seller
                          </Badge>
                        )}
                        {item.isLimitedEdition && (
                          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold shadow-md">
                            Limited Edition
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">({item.reviews})</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline" className="mb-2 text-xs">
                        {item.category}
                      </Badge>
                      <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                        {item.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-foreground">
                          ${item.price}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
