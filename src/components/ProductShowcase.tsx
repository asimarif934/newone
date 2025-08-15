import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { useState } from "react";
import productsImage from "@/assets/products-showcase.jpg";
import ProductDetailPanel from "./ProductDetailPanel";

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

const ProductShowcase = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);

  const products: Product[] = [
    {
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
    },
    {
      id: 2,
      name: "Golden Hour Eyeshadow Palette",
      price: "€78",
      rating: 4.8,
      reviews: 189,
      badge: "Limited Edition",
      discount: "15% OFF",
      image: productsImage,
      description: "18 shades inspired by Parisian sunsets"
    },
    {
      id: 3,
      name: "Midnight Glam Mascara",
      price: "€35",
      rating: 4.9,
      reviews: 312,
      discount: "25% OFF",
      image: productsImage,
      description: "Dramatic volume and length for 24 hours"
    },
    {
      id: 4,
      name: "Pearl Essence Foundation",
      price: "€65",
      rating: 4.7,
      reviews: 156,
      image: productsImage,
      description: "Luminous coverage with skincare benefits"
    }
  ];

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailPanelOpen(true);
  };

  const handleCloseDetailPanel = () => {
    setIsDetailPanelOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section className="py-6 sm:py-20 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-luxury mb-4 sm:mb-6">
            Signature Collection
          </h2>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Discover our most coveted pieces, each crafted with the finest ingredients 
            and designed to awaken your inner radiance.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6 sm:mt-8 shimmer"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative card-luxury p-1 sm:p-6 transform transition-all duration-500 hover:scale-105 cursor-pointer"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => handleProductClick(product)}
            >
              {/* Badge */}
              {product.badge && (
                <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 z-10 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs sm:text-sm">
                  {product.badge}
                </Badge>
              )}

              {/* Product Image */}
              <div className="relative overflow-hidden rounded-lg mb-1.5 sm:mb-4 bg-background/20" style={{ aspectRatio: '4/5' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-luxury-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                
                {/* Discount Badge - Top Left (scaled for mobile) */}
                {product.discount && (
                  <div className="absolute top-[8%] left-[8%] sm:top-3 sm:left-3 z-10 animate-in fade-in duration-500">
                    <div className="bg-black/70 backdrop-blur-sm rounded-md sm:rounded-lg px-1.5 py-0.5 sm:px-3 sm:py-1.5 border border-white/20" style={{ fontSize: 'clamp(10px, 2.5vw, 14px)' }}>
                      <span className="text-white font-semibold">{product.discount}</span>
                    </div>
                  </div>
                )}

                {/* Add to Cart Icon - Bottom Right (scaled for mobile) */}
                <div className="absolute bottom-[8%] right-[8%] sm:bottom-3 sm:right-3 z-10">
                  <div className={`bg-white/80 backdrop-blur-sm rounded-full transition-all duration-300 ${
                    hoveredProduct === product.id ? 'opacity-90 scale-110' : 'opacity-60'
                  }`} style={{ padding: 'clamp(6px, 2vw, 8px)' }}>
                    <ShoppingCart className="text-gray-800" style={{ width: 'clamp(12px, 3vw, 16px)', height: 'clamp(12px, 3vw, 16px)' }} />
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-1 sm:space-y-2">
                <h3 className="font-semibold text-sm sm:text-lg group-hover:text-primary transition-colors duration-300 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-base sm:text-xl font-bold text-primary">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs sm:text-sm text-foreground/50 line-through">{product.originalPrice}</span>
                  )}
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-primary fill-primary'
                            : 'text-muted-foreground'
                        }`}
                        style={{ width: 'clamp(10px, 2.5vw, 12px)', height: 'clamp(10px, 2.5vw, 12px)' }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-foreground/60 whitespace-nowrap">
                    ({product.reviews})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products */}
        <div className="text-center mt-6 sm:mt-16">
          <Button className="btn-outline-luxury text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3">
            View All Products
          </Button>
        </div>
      </div>

      {/* Product Detail Panel */}
      <ProductDetailPanel
        product={selectedProduct}
        isOpen={isDetailPanelOpen}
        onClose={handleCloseDetailPanel}
      />
    </section>
  );
};

export default ProductShowcase;