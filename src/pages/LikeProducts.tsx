import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, TrendingUp, Users, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";

const LikeProducts = () => {
  const [likeProducts] = useState([
    {
      id: 1,
      name: "Luxury Foundation",
      description: "Premium foundation with long-lasting coverage and natural finish",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.8,
      reviews: 1247,
      image: "/placeholder.svg",
      category: "Makeup",
      matchScore: 95,
      reason: "Based on your foundation preferences",
      isTrending: true,
    },
    {
      id: 2,
      name: "Anti-Aging Serum",
      description: "Advanced formula targeting fine lines and wrinkles",
      price: 149.99,
      originalPrice: 199.99,
      rating: 4.9,
      reviews: 892,
      image: "/placeholder.svg",
      category: "Skincare",
      matchScore: 92,
      reason: "Similar to products you've liked",
      isTrending: false,
    },
    {
      id: 3,
      name: "Luxury Lipstick Set",
      description: "Collection of 6 premium matte lipsticks in trending shades",
      price: 79.99,
      originalPrice: 99.99,
      rating: 4.7,
      reviews: 567,
      image: "/placeholder.svg",
      category: "Makeup",
      matchScore: 88,
      reason: "Popular among users like you",
      isTrending: true,
    },
    {
      id: 4,
      name: "Hydrating Face Mask",
      description: "Intensive hydration mask with hyaluronic acid",
      price: 34.99,
      originalPrice: 49.99,
      rating: 4.6,
      reviews: 423,
      image: "/placeholder.svg",
      category: "Skincare",
      matchScore: 85,
      reason: "Complements your skincare routine",
      isTrending: false,
    },
    {
      id: 5,
      name: "Professional Brush Set",
      description: "Complete set of 12 professional makeup brushes",
      price: 129.99,
      originalPrice: 179.99,
      rating: 4.8,
      reviews: 756,
      image: "/placeholder.svg",
      category: "Tools",
      matchScore: 90,
      reason: "Based on your tool preferences",
      isTrending: true,
    },
    {
      id: 6,
      name: "Vitamin C Brightening Cream",
      description: "Brightening cream with stable vitamin C and antioxidants",
      price: 69.99,
      originalPrice: 89.99,
      rating: 4.7,
      reviews: 634,
      image: "/placeholder.svg",
      category: "Skincare",
      matchScore: 87,
      reason: "Similar to your favorite products",
      isTrending: false,
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Products You'll Love
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover personalized recommendations based on your preferences and browsing history
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Trending
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm flex items-center gap-2">
              <Users className="h-4 w-4" />
              Popular
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Personalized
            </Badge>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {likeProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 relative">
                {/* Match Score Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-primary text-primary-foreground font-bold">
                    {product.matchScore}% Match
                  </Badge>
                </div>
                
                <CardHeader className="relative pb-4">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.isTrending && (
                      <Badge variant="secondary" className="absolute top-2 right-2 bg-orange-500 text-white">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 hover:bg-background"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="mb-2 text-xs">
                    {product.category}
                  </Badge>
                  <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description}
                  </CardDescription>
                  
                  {/* Reason for recommendation */}
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground italic">
                      💡 {product.reason}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-foreground">
                        ${product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeProducts;
