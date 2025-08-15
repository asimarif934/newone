import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Mail, Lock, User, Sparkles, Gift, Truck, Tag, Star, Check, ChevronDown } from "lucide-react";
import { markUserAsSignedUp, checkUserSignupStatus } from "@/utils/authUtils";

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  isManualSignup?: boolean; // New prop to distinguish manual signup from landing popup
}

const AuthPopup = ({ isOpen, onClose, isManualSignup = false }: AuthPopupProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [hasSignedUp, setHasSignedUp] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showScrollHint, setShowScrollHint] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Close popup when Escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    // determine if user already signed up/logged in to control benefits visibility
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
      checkOverflow();
      window.addEventListener('resize', checkOverflow);
    }

    return () => window.removeEventListener('resize', checkOverflow);
  }, [isOpen]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      // Hide scroll hint when user scrolls down
      if (scrollTop > 50) {
        setShowScrollHint(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log(isLogin ? "Login" : "Signup", { email, password, name });
    
    // If auth is successful, mark user as signed up/logged in
    if (isLogin || !isLogin) {
      markUserAsSignedUp();
    }
    
    onClose();
  };

  const signupBenefits = [
    { text: "Get future discounts" },
    { text: "Free delivery" },
    { text: "Free gifts" },
    { text: "Exclusive coupons" }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="relative bg-card/95 backdrop-blur-md border border-primary/20 rounded-2xl max-w-md w-full mx-4 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300 max-h-[85vh] flex flex-col">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 bg-transparent border-2 border-amber-400/50 text-amber-400 hover:bg-amber-400 hover:text-black rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-400/25 z-10"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Scrollable Content */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-6 sm:p-8"
          onScroll={handleScroll}
        >
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-luxury mb-2">
              Welcome to Real Touch Paris
            </h2>
            <p className="text-foreground/70 text-sm">
              {isLogin ? "Sign in to your account" : "Create your account"}
            </p>
          </div>

          {/* Signup Benefits: visible only for users who haven't signed up/logged in */}
          {!hasSignedUp && (
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/10 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-primary mb-3 sm:mb-4 text-center tracking-wide uppercase">
                Sign up and enjoy exclusive benefits
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {signupBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/90 font-medium group-hover:text-primary transition-colors">
                      {benefit.text}
                    </span>
                  </div>
                ))}
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
                    className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-colors"
                    required={!isLogin}
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
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full btn-discover mt-4 sm:mt-6"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-sm text-foreground/70">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Social Login Buttons - Always show below form content */}
          <div className="mt-6 sm:mt-8">
            {/* Divider */}
            <div className="relative my-4 sm:my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-foreground/50">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full bg-background/50 border-border/50 hover:bg-background/70 transition-colors">
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full bg-background/50 border-border/50 hover:bg-background/70 transition-colors">
                Continue with Facebook
              </Button>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="text-xs text-foreground/50 text-center mt-4 sm:mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        {/* Scroll Hint Arrow - Centered above form bottom */}
        {showScrollHint && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-primary/20 backdrop-blur-sm rounded-full p-2 animate-bounce">
              <ChevronDown className="w-4 h-4 text-primary" />
            </div>
          </div>
        )}

        {/* Fixed Skip Button - Bottom Right Corner with Circle Background */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="bg-background/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onClose}
              className="text-xs text-foreground font-medium hover:text-primary transition-colors px-3 py-1 rounded-full"
            >
              Skip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;
