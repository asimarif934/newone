import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { products } from "@/data/products";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  badge?: string;     // e.g. "Best Seller"
  discount?: string;  // e.g. "31% OFF"
  image: string;
  description: string;
}

const ProductShowcase = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Get the first two products from the centralized products data
  const showcaseProducts: Product[] = products.slice(0, 2).map(product => ({
    id: product.id,
    name: product.name,
    category: product.category,
    price: `$${product.price}`,
    originalPrice: product.originalPrice > product.price ? `$${product.originalPrice}` : undefined,
    rating: product.rating,
    reviews: product.reviews,
    badge: product.isBestSeller ? "Best Seller" : product.isLimitedEdition ? "Limited Edition" : undefined,
    discount: product.originalPrice > product.price 
      ? `${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF`
      : undefined,
    image: product.image,
    description: product.description,
  }));

  return (
    <section className="py-10 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Responsive grid instead of stacked flex */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {showcaseProducts.map((product) => {
            return (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="block"
              >
                <div className="rounded-2xl border border-border/50 bg-card text-card-foreground shadow-xl p-4 sm:p-6 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                  {/* Image + overlay items */}
                  
                  <div className="!aspect-[4/5] w-full overflow-hidden rounded-lg">
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
  />

                    {/* Discount (TOP-LEFT) */}
                    {product.discount && (
                      <Badge className="absolute top-2 left-2 z-10 bg-red-500 text-white shadow-md">
                        {product.discount}
                      </Badge>
                    )}

                    {/* Badge (TOP-RIGHT) */}
                    {product.badge && (
                      <Badge className="absolute top-2 right-2 z-10 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold shadow-md border-0">
                        {product.badge}
                      </Badge>
                    )}

                    {/* Wishlist Heart (BOTTOM-RIGHT) */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute bottom-2 right-2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          wishlist.includes(product.id)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-800"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Rating row */}
                  <div className="flex items-center gap-2 mt-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Category */}
                  <Badge variant="outline" className="mt-2 text-xs">
                    {product.category}
                  </Badge>

                  {/* Title */}
                  <h3 className="mt-2 text-lg font-semibold hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Short description */}
                  <p className="text-sm text-muted-foreground mt-1">
                    {product.description}
                  </p>

                  {/* Price + Add to Cart */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-foreground">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>

                    <Button 
                      className="bg-yellow-500 hover:bg-yellow-500 text-black"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View more */}
        <div className="text-center pt-8">
          <Link to="/products">
            <Button className="btn-outline-luxury text-base px-8 py-3">
              View More Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
