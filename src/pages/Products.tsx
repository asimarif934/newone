import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Navigation from "@/components/Navigation";

const Products = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const [products] = useState([
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
      isNew: true,
      isSale: true,
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
      isNew: false,
      isSale: true,
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
      isNew: true,
      isSale: false,
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
      isNew: false,
      isSale: true,
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
      isNew: false,
      isSale: true,
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
      isNew: true,
      isSale: false,
    },
  ]);

  // Filter products based on active filter
  const filteredProducts = activeFilter === "all" 
    ? products 
    : products.filter(product => product.category.toLowerCase() === activeFilter.toLowerCase());

  // Get unique categories for filter buttons
  const categories = ["all", ...Array.from(new Set(products.map(product => product.category)))];

  const handleFilterClick = (category: string) => {
    setActiveFilter(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our Premium Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover luxury beauty products that elevate your routine with premium quality and innovative formulas
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={activeFilter.toLowerCase() === category.toLowerCase() ? "secondary" : "outline"}
                className={`px-4 py-2 text-sm cursor-pointer transition-all duration-300 hover:bg-primary hover:text-primary-foreground ${
                  activeFilter.toLowerCase() === category.toLowerCase() 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "hover:scale-105"
                }`}
                onClick={() => handleFilterClick(category)}
              >
                {category === "all" ? "All Products" : category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-muted-foreground mb-4">
                No products found in this category
              </h3>
              <p className="text-muted-foreground">
                Try selecting a different category or browse all our products.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50">
                  <CardHeader className="relative pb-4">
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.isNew && (
                        <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                          New
                        </Badge>
                      )}
                      {product.isSale && (
                        <Badge variant="destructive" className="absolute top-2 right-2">
                          Sale
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 hover:bg-background"
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
                    <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </CardDescription>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
