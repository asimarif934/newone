import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-makeup.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleDiscoverProducts = () => {
    navigate("/products");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury makeup model"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-luxury-gradient opacity-20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float opacity-60"></div>
        <div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full animate-float opacity-80"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/5 w-3 h-3 bg-primary rounded-full animate-float opacity-40"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-float opacity-70"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto flex flex-col justify-center min-h-[80vh] sm:min-h-[90vh]">
          {/* Tagline */}
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6 text-primary mr-2 animate-pulse" />
            <span className="text-accent font-medium tracking-wider uppercase text-sm">
              Premium Beauty Collection
            </span>
            <Sparkles className="w-6 h-6 text-primary ml-2 animate-pulse" />
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-luxury leading-tight">
            Beauty isn't applied,
            <br />
            <span className="text-accent italic">it's awakened</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the touch of real beauty with our exclusive Parisian
            collection. Where luxury meets artistry.
          </p>

          {/* Shimmer Divider */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8 shimmer"></div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className="border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-300 group"
              onClick={handleDiscoverProducts}
            >
              Discover Our Products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-foreground/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-glow"></div>
              <span>Made in Paris</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 bg-accent rounded-full animate-glow"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <span>Cruelty-Free</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 bg-primary rounded-full animate-glow"
                style={{ animationDelay: "1s" }}
              ></div>
              <span>Premium Ingredients</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent"></div>
        <div className="w-2 h-2 bg-primary rounded-full mx-auto mt-2 animate-bounce"></div>
      </div>
    </section>
  );
};

export default HeroSection;
