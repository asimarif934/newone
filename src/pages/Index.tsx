import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import ReviewsGallery from "@/components/BrandStory";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import AuthPopup from "@/components/AuthPopup";
import { checkUserSignupStatus } from "@/utils/authUtils";

const Index = () => {
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isManualSignup, setIsManualSignup] = useState(false);

  useEffect(() => {
    // Show popup immediately on page load if user hasn't signed up/logged in
    const userSignedUp = checkUserSignupStatus();
    if (!userSignedUp) {
      setShowAuthPopup(true);
      setIsManualSignup(false); // Landing popup
    }
  }, []);

  const handleCloseAuthPopup = () => {
    setShowAuthPopup(false);
    setIsManualSignup(false);
    // Don't set any flags - popup will show again on next refresh if user hasn't signed up
  };

  const handleAuthClick = () => {
    // Check if user has already signed up
    const userSignedUp = checkUserSignupStatus();
    
    if (!userSignedUp) {
      setShowAuthPopup(true);
      setIsManualSignup(true); // Manual signup from button click
    } else {
      // User is already signed up, handle login flow
      console.log("User is already signed up, redirecting to login...");
      // Add your login redirect logic here
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onAuthClick={handleAuthClick} />
      <HeroSection />
      <ProductShowcase />
      <ReviewsGallery />
      <Newsletter onAuthClick={handleAuthClick} />
      <Footer />
      <AuthPopup 
        isOpen={showAuthPopup} 
        onClose={handleCloseAuthPopup} 
        isManualSignup={isManualSignup}
      />
    </div>
  );
};

export default Index;
