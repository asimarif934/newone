import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

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

interface ProductDetailPanelProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailPanel = ({ product, isOpen, onClose }: ProductDetailPanelProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!product) return null;

  const handleBuyNow = () => {
    // TODO: Implement checkout logic
    console.log(`Buying ${product.name} for Rs. ${product.price}`);
    onClose();
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleViewMore = () => {
    if (product) {
      navigate('/product', { state: { product } });
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side={isMobile ? "bottom" : "right"}
        className={`${
          isMobile 
            ? "w-full h-[75vh] p-0" 
            : "w-full sm:w-[40%] p-0"
        } overflow-hidden bg-gradient-to-b from-background to-background/95`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <SheetHeader className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-border/20">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg sm:text-2xl font-bold text-luxury line-clamp-1">
                {product.name}
              </SheetTitle>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Product Image */}
            <div className="relative overflow-hidden bg-background/20" style={{ aspectRatio: '4/5', maxHeight: '75vh' }}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 border border-white/20">
                    <span className="text-white font-semibold text-xs sm:text-sm">{product.discount}</span>
                  </div>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                onClick={handleAddToWishlist}
                className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 sm:p-2 transition-all duration-300 hover:scale-110"
              >
                <Heart 
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    isWishlisted 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-gray-800'
                  }`} 
                />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Badge */}
              {product.badge && (
                <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs sm:text-sm">
                  {product.badge}
                </Badge>
              )}

              {/* Price */}
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-3xl font-bold text-primary">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm sm:text-lg text-foreground/50 line-through">{product.originalPrice}</span>
                )}
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-primary fill-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-foreground/60">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Description</h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  {product.description}
                </p>
                {/* View More Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewMore}
                  className="mt-3 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  View More
                  <ArrowRight className="ml-2 w-3 h-3" />
                </Button>
              </div>

              {/* Additional Details - Only show on desktop */}
              {!isMobile && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-foreground/60">Finish:</span>
                      <span className="ml-2 text-foreground">Velvet</span>
                    </div>
                    <div>
                      <span className="text-foreground/60">Wear Time:</span>
                      <span className="ml-2 text-foreground">12 hours</span>
                    </div>
                    <div>
                      <span className="text-foreground/60">Size:</span>
                      <span className="ml-2 text-foreground">Standard</span>
                    </div>
                    <div>
                      <span className="text-foreground/60">Cruelty Free:</span>
                      <span className="ml-2 text-foreground">Yes</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer with Buy Button */}
          <div className="p-4 sm:p-6 border-t border-border/20 bg-background/50 backdrop-blur-sm">
            <Button 
              onClick={handleBuyNow}
              className="w-full btn-luxury text-base sm:text-lg py-3 sm:py-4 hover:shadow-[var(--shadow-glow)] transition-all duration-300"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Buy Now - {product.price}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductDetailPanel;
