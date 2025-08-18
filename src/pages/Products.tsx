import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Navigation from "@/components/Navigation";
import { products, Product } from "@/data/products";

const Products = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() === activeFilter.toLowerCase()
        );

  const categories = ["all", ...Array.from(new Set(products.map((p) => p.category)))];

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
              {filteredProducts.map((product) => {
                const discount =
                  product.originalPrice > product.price
                    ? Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )
                    : null;

                return (
                  <Link to={`/product/${product.id}`} key={product.id}>
                    <Card
                      className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 border-border/50 rounded-2xl overflow-hidden cursor-pointer"
                    >
                      <CardHeader className="relative pb-4">
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                          />
                          {/* Discount Badge */}
                          {discount && (
                            <Badge className="absolute top-2 left-2 bg-red-500 text-white shadow-md">
                              {discount}% OFF
                            </Badge>
                          )}
                          {/* Best Seller / Limited Edition */}
                          {product.isBestSeller && (
                            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold shadow-md border-0">
                              Best Seller
                            </Badge>
                          )}
                          {product.isLimitedEdition && (
                            <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold shadow-md border-0">
                              Limited Edition
                            </Badge>
                          )}
                          {/* Wishlist */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleWishlist(product.id);
                            }}
                            className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center transition-all duration-300 hover:scale-110"
                          >
                            <Heart
                              className={`h-5 w-5 ${
                                wishlist.includes(product.id)
                                  ? "text-red-500 fill-red-500"
                                  : "text-gray-700"
                              }`}
                            />
                          </button>
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
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <ShoppingCart className="h-4 w-4 " />
                          
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
