import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Tag, Sparkles } from "lucide-react";
import { triggerDiscountPopup } from "@/utils/authUtils";

interface DiscountBannerProps {
  onShowAuthPopup: () => void;
}

const DiscountBanner = ({ onShowAuthPopup }: DiscountBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleSignupClick = () => {
    // Check if we should show the popup for this user
    const shouldShow = triggerDiscountPopup();
    
    if (shouldShow) {
      onShowAuthPopup();
    } else {
      // User is already signed up, redirect to discount page
      console.log("User is signed up, redirecting to discount page...");
      // Add your discount page redirect logic here
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-primary/90 to-accent/90 text-primary-foreground px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Tag className="w-5 h-5" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="font-medium">Special Offer: 20% off for new members!</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleSignupClick}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-colors px-4 py-1 text-sm font-medium"
          >
            Sign Up Now
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="w-8 h-8 bg-transparent border border-amber-400/50 text-amber-400 hover:bg-amber-400 hover:text-black rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-400/25"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;
