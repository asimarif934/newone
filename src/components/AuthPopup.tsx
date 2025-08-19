import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Mail, Lock, User, Sparkles, Gift, Truck, Tag, Star, Check, ChevronDown, Eye, EyeOff } from "lucide-react";
import { markUserAsSignedUp, checkUserSignupStatus } from "@/utils/authUtils";

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  isManualSignup?: boolean;
}

const AuthPopup = ({ isOpen, onClose, isManualSignup = false }: AuthPopupProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [hasSignedUp, setHasSignedUp] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close popup when Escape key is pressed and handle mobile keyboard
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleResize = () => {
      // Close popup on orientation change for mobile
      if (isMobile && window.innerHeight < 400) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      window.addEventListener('resize', handleResize);
      document.body.style.overflow = "hidden";
      
      // Prevent mobile keyboard from pushing content up
      if (isMobile) {
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = "unset";
      
      if (isMobile) {
        document.body.style.position = "";
        document.body.style.width = "";
      }
    };
  }, [isOpen, onClose, isMobile]);

  useEffect(() => {
    setHasSignedUp(checkUserSignupStatus());
  }, [isOpen]);

  // Check if content overflows and show scroll hint
  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const { scrollHeight, clientHeight } = scrollContainerRef.current;
        setShowScrollHint(scrollHeight > clientHeight);
      }
    };

    if (isOpen) {
      // Delay to ensure content is rendered
      setTimeout(checkOverflow, 100);
      window.addEventListener('resize', checkOverflow);
    }

    return () => window.removeEventListener('resize', checkOverflow);
  }, [isOpen]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop } = scrollContainerRef.current;
      if (scrollTop > 50) {
        setShowScrollHint(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(isLogin ? "Login" : "Signup", { email, password, name });
      
      if (isLogin || !isLogin) {
        markUserAsSignedUp();
      }
      
      onClose();
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const signupBenefits = [
    { text: "Get future discounts", icon: Tag },
    { text: "Free delivery", icon: Truck },
    { text: "Free gifts", icon: Gift },
    { text: "Exclusive coupons", icon: Star }
  ];

  // Handle form submission with loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center !pt-20 !pb-20 p-8 sm:p-8 safe-area-top safe-area-bottom">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup Container */}
      <div className="relative bg-card/95 backdrop-blur-md  border border-primary/20 rounded-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto mt-10 mb-10 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300 max-h-[90vh] sm:max-h-[85vh] flex flex-col">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-background/80 backdrop-blur-sm border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/25 z-10 focus-visible-ring"
          aria-label="Close popup"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>

        {/* Scrollable Content */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto mt-4 mb-4 p-4 sm:p-6 lg:p-8"
          onScroll={handleScroll}
        >
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary" />
                </div>
              </div>
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-luxury mb-2">
              Welcome to Real Touch Paris
            </h2>
            <p className="text-foreground/70 text-sm sm:text-base">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </p>
          </div>

          {/* Signup Benefits */}
          {!hasSignedUp && (
            <div className="mb-4 sm:mb-6 lg:mb-8 p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/10 backdrop-blur-sm">
              <h3 className="text-xs sm:text-sm font-semibold text-primary mb-3 sm:mb-4 text-center tracking-wide uppercase">
                Sign up and enjoy exclusive benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {signupBenefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="flex items-center gap-2 sm:gap-3 group">
                      <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <IconComponent className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                      </div>
                      <span className="text-xs sm:text-sm text-foreground/90 font-medium group-hover:text-primary transition-colors">
                        {benefit.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-colors h-10 sm:h-11 text-sm sm:text-base focus-visible-ring"
                    required={!isLogin}
                    aria-label="Full name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-colors h-10 sm:h-11 text-sm sm:text-base focus-visible-ring"
                  required
                  aria-label="Email address"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary transition-colors h-10 sm:h-11 text-sm sm:text-base focus-visible-ring"
                  required
                  aria-label="Password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-primary/10 text-foreground/50 hover:text-primary transition-colors focus-visible-ring"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-discover mt-4 sm:mt-6 h-10 sm:h-11 text-sm sm:text-base focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </div>
              ) : (
                isLogin ? "Sign In" : "Create Account"
              )}
            </Button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-sm text-foreground/70">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-primary hover:text-primary/80 transition-colors font-medium focus-visible-ring"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Social Login Section */}
          <div className="mt-4 sm:mt-6 lg:mt-8">
            {/* Divider */}
            <div className="relative my-3 sm:my-4 lg:my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-foreground/50">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-2 sm:space-y-3">
              <Button 
                variant="outline" 
                className="w-full bg-background/50 border-border/50 hover:bg-background/70 transition-colors h-10 sm:h-11 text-sm sm:text-base focus-visible-ring"
              >
                Continue with Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-background/50 border-border/50 hover:bg-background/70 transition-colors h-10 sm:h-11 text-sm sm:text-base focus-visible-ring"
              >
                Continue with Facebook
              </Button>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="text-xs text-foreground/50 text-center mt-3 sm:mt-4 lg:mt-6 leading-relaxed">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </div>

        {/* Scroll Hint Arrow */}
        {showScrollHint && (
          <div className="absolute bottom-10 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-primary/20 backdrop-blur-sm rounded-full p-2 animate-bounce">
              <ChevronDown className="w-4 h-4 text-primary" />
            </div>
          </div>
        )}

        {/* Skip Button - Mobile optimized */}
        {isMobile && (
          <div className="absolute bottom-3 right-3 z-10">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="text-xs text-foreground/70 hover:text-primary transition-colors px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 focus-visible-ring"
            >
              Skip
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPopup;
