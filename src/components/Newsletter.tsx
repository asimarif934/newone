import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles } from "lucide-react";
import { useState } from "react";

interface NewsletterProps {
  onAuthClick?: () => void;
}

const Newsletter = ({ onAuthClick }: NewsletterProps) => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-20 bg-luxury-gradient relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-[#E6C872]/20 rounded-full flex items-center justify-center animate-glow">
              <Mail className="w-10 h-10 text-[#E6C872]" />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-[#D8B45A] animate-pulse" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#E6C872] mb-6 leading-tight drop-shadow-sm">
          Join the Golden Circle
        </h2>
        
        <p className="text-xl text-[#E6C872]/90 mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
          Be the first to discover new collections, exclusive beauty tips, 
          and receive special offers crafted just for you.
        </p>

        {/* Email Form and Buttons */}
        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-[#E6C872]/10 border-[#E6C872]/20 text-[#E6C872] placeholder:text-[#E6C872]/60 focus:bg-[#E6C872]/20 transition-colors"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="border-2 border-[#E6C872] text-[#E6C872] bg-transparent hover:bg-[#E6C872] hover:text-primary px-8 py-3 transition-all duration-300"
              onClick={onAuthClick}
            >
              Login
            </Button>
            <Button 
              className="border-2 border-[#E6C872] text-[#E6C872] bg-transparent hover:bg-[#E6C872] hover:text-primary px-8 py-3 transition-all duration-300"
              onClick={onAuthClick}
            >
              Signup
            </Button>
          </div>
        </div>

        {/* Signup Benefits Block */}
        <div className="mt-12 p-6 md:p-8 bg-[#E6C872]/10 rounded-xl border border-[#E6C872]/20 backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-[#E6C872] mb-4 text-center tracking-wide uppercase drop-shadow-sm">
            Sign up and enjoy exclusive benefits
          </h3>
          <div className="max-w-2xl mx-auto space-y-3">
            {[
              "Get future discounts",
              "Free delivery",
              "Free gifts",
              "Exclusive coupons",
            ].map((text, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-5 h-5 bg-[#E6C872]/30 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-[#E6C872] rounded-full"></span>
                </div>
                <span className="text-sm md:text-base text-[#E6C872] font-medium drop-shadow-sm">
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Note */}
        <p className="text-xs text-[#E6C872]/70 mt-8 drop-shadow-sm">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;