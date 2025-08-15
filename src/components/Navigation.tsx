import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

interface NavigationProps {
  onAuthClick?: () => void;
}

const Navigation = ({ onAuthClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Auto-close mobile menu on scroll/touch/wheel
  useEffect(() => {
    const closeMenu = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      window.addEventListener("scroll", closeMenu, { passive: true });
      window.addEventListener("wheel", closeMenu, { passive: true });
      window.addEventListener("touchstart", closeMenu, { passive: true });
      return () => {
        window.removeEventListener("scroll", closeMenu);
        window.removeEventListener("wheel", closeMenu);
        window.removeEventListener("touchstart", closeMenu);
      };
    }
  }, [isMenuOpen]);

  // Handle mobile navigation click and close menu
  const handleMobileNavClick = () => {
    setIsMenuOpen(false);
  };

  // Handle mobile auth button click
  const handleMobileAuthClick = () => {
    onAuthClick?.();
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Reviews", href: "/reviews" },
    { name: "Like Products", href: "/like-products" },
    { name: "Blog Posts", href: "/blog" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-2xl font-bold text-luxury hover:text-primary transition-colors duration-300 cursor-pointer"
            >
              Real Touch Paris
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `text-foreground hover:text-primary transition-colors duration-300 font-medium relative group ${
                      isActive ? "text-primary" : ""
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                          isActive
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right side icons and buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              className="btn-outline-luxury px-4 py-2 text-sm"
              onClick={onAuthClick}
            >
              Login
            </Button>
            <Button
              className="btn-outline-luxury px-4 py-2 text-sm"
              onClick={onAuthClick}
            >
              Signup
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:text-primary transition-all duration-300"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${
                    isMenuOpen
                      ? "opacity-0 rotate-90 scale-75"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X
                  className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${
                    isMenuOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-75"
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen
              ? "max-h-screen opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          {/* Backdrop overlay */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
          <div className="relative z-50 px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-sm rounded-lg mt-2 border border-border/50 shadow-lg">
            {navItems.map((item, index) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={handleMobileNavClick}
                className={({ isActive }) =>
                  `w-full text-left text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 hover:bg-primary/10 hover:scale-105 ${
                    isActive ? "text-primary bg-primary/10" : ""
                  }`
                }
                style={{
                  animationDelay: `${index * 50}ms`,
                  transform: isMenuOpen ? "translateX(0)" : "translateX(-20px)",
                  opacity: isMenuOpen ? 1 : 0,
                }}
              >
                {item.name}
              </NavLink>
            ))}
            <div
              className="flex items-center space-x-4 px-3 py-2 transition-all duration-300"
              style={{
                animationDelay: "200ms",
                transform: isMenuOpen
                  ? "translateY(0)"
                  : "translateY(20px)",
                opacity: isMenuOpen ? 1 : 0,
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                className="btn-outline-luxury px-4 py-2 text-sm transition-all duration-300 hover:scale-105"
                onClick={handleMobileAuthClick}
              >
                Login
              </Button>
              <Button
                className="btn-outline-luxury px-4 py-2 text-sm transition-all duration-300 hover:scale-105"
                onClick={handleMobileAuthClick}
              >
                Signup
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
