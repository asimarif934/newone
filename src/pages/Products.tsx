import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Navigation from "@/components/Navigation";
import { products, Product } from "@/data/products";

const Products = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    if (categoryParam) {
      setActiveFilter(categoryParam);
    } else {
      setActiveFilter("all");
    }
  }, [location.search]);

  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const addToCart = (product: Product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() === activeFilter.toLowerCase()
        );

  // Categories list with "deals" placed after "all"
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
    return ["all", "deals", ...uniqueCategories.filter((c) => c.toLowerCase() !== "deals")];
  }, []);

  const handleFilterClick = (category: string) => {
    setActiveFilter(category);
    const params = new URLSearchParams(location.search);
    if (category.toLowerCase() === "all") {
      params.delete("category");
    } else {
      params.set("category", category.toLowerCase());
    }
    navigate(
      {
        pathname: "/products",
        search: params.toString() ? `?${params.toString()}` : "",
      },
      { replace: false }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative">
      <Navigation />

      {/* Hero Section */}
      <div className="mt-5 pt-0 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our Premium Collection
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Discover luxury beauty products that elevate your routine with premium quality and innovative formulas
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={
                  activeFilter.toLowerCase() === category.toLowerCase()
                    ? "secondary"
                    : "outline"
                }
                className={`px-4 py-2 text-sm cursor-pointer transition-all duration-300 hover:bg-primary hover:text-primary-foreground ${
                  activeFilter.toLowerCase() === category.toLowerCase()
                    ? "bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold shadow-md border-0"
                    : "hover:scale-105"
                }`}
                onClick={() => handleFilterClick(category)}
              >
                {category === "all"
                  ? "All Products"
                  : category === "deals"
                  ? "Deals"
                  : category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
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
                        ((product.originalPrice - product.price) / product.originalPrice) * 100
                      )
                    : null;

                return (
                  <Link to={`/products/${product.id}`} key={product.id}>
                    <Card className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2 border-border/50 rounded-2xl overflow-hidden cursor-pointer">
                      <CardHeader className="relative pb-4">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                          />
                          {discount && (
                            <Badge className="absolute top-2 left-2 bg-red-500 text-white shadow-md">
                              {discount}% OFF
                            </Badge>
                          )}
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
                            <span className="text-sm font-medium">
                              {product.rating}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            ({product.reviews})
                          </span>
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
                              Rs. {product.price}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                Rs. {product.originalPrice}
                              </span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              addToCart(product);
                            }}
                          >
                            <ShoppingCart className="h-4 w-4" />
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

      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full shadow-lg bg-primary hover:bg-primary/90 relative"
        >
          <ShoppingCart className="h-6 w-6 text-white" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Products;
