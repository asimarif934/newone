import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

interface NavigationProps {
  onAuthClick?: () => void;
}

const Navigation = ({ onAuthClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for navigation background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Reviews", href: "/reviews" },
    { name: "Like Products", href: "/like-products" },
    { name: "Blog Posts", href: "/blog" },
  ];

  const handleMobileNavClick = (href: string) => {
    navigate(href);
    setIsMenuOpen(false);
  };

  const handleMobileAuthClick = () => {
    onAuthClick?.();
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg" 
            : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <NavLink
                to="/"
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-luxury hover:text-primary transition-colors duration-300 cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Real Touch Paris
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `text-foreground hover:text-primary transition-colors duration-300 font-medium relative group text-sm lg:text-base ${
                      isActive ? "text-primary" : ""
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.name}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Desktop Right side icons and buttons */}
            <div className="hidden lg:flex items-center space-x-4">
                             <Button 
                 variant="ghost" 
                 size="icon" 
                 className="hover:text-primary transition-colors hover:bg-primary/10 focus-visible-ring"
                 aria-label="Search"
               >
                <Search className="h-5 w-5" />
              </Button>
                             <Button 
                 className="btn-outline-luxury px-4 py-2 text-sm focus-visible-ring" 
                 onClick={onAuthClick}
               >
                 Login
               </Button>
               <Button 
                 className="btn-outline-luxury px-4 py-2 text-sm focus-visible-ring" 
                 onClick={onAuthClick}
               >
                 Signup
               </Button>
               <Button 
                 variant="ghost" 
                 size="icon" 
                 className="hover:text-primary transition-colors hover:bg-primary/10 relative focus-visible-ring"
                 aria-label="Shopping bag"
               >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </div>

                         {/* Tablet Navigation (simplified) */}
             <div className="hidden md:flex lg:hidden items-center space-x-4">
               <Button 
                 variant="ghost" 
                 size="icon" 
                 className="hover:text-primary transition-colors focus-visible-ring"
                 aria-label="Search"
               >
                 <Search className="h-5 w-5" />
               </Button>
               <Button 
                 className="btn-outline-luxury px-3 py-2 text-sm focus-visible-ring" 
                 onClick={onAuthClick}
               >
                 Login
               </Button>
               <Button 
                 variant="ghost" 
                 size="icon" 
                 className="hover:text-primary transition-colors relative focus-visible-ring"
                 aria-label="Shopping bag"
               >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </div>

                         {/* Mobile menu button */}
             <div className="md:hidden">
               <Button
                 variant="ghost"
                 size="icon"
                 onClick={() => setIsMenuOpen(!isMenuOpen)}
                 className="hover:text-primary transition-all duration-300 hover:bg-primary/10 focus-visible-ring"
                 aria-label={isMenuOpen ? "Close menu" : "Open menu"}
               >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${
                      isMenuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    className={`h-6 w-6 absolute inset-0 transition-all duration-300 ${
                      isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Mobile Menu */}
          <div className="fixed top-16 left-0 w-full z-50 lg:hidden">
            <div className="bg-background/95 backdrop-blur-md border-t border-border/50 shadow-xl">
              {/* Navigation Items */}
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item, index) => (
                                     <button
                     key={item.name}
                     onClick={() => handleMobileNavClick(item.href)}
                     className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-primary/10 hover:text-primary active:scale-95 animate-slide-in-top touch-target focus-visible-ring"
                     style={{ animationDelay: `${index * 50}ms` }}
                   >
                     {item.name}
                   </button>
                ))}
              </div>

                             {/* Mobile Action Buttons */}
               <div className="border-t border-border/50 px-4 py-4">
                 <div className="flex items-center justify-between space-x-2">
                   <Button
                     variant="ghost"
                     size="icon"
                     className="flex-1 hover:text-primary transition-all duration-300 hover:bg-primary/10 focus-visible-ring"
                     aria-label="Search"
                   >
                     <Search className="h-5 w-5" />
                   </Button>
                   <Button
                     className="flex-1 btn-outline-luxury px-4 py-2 text-sm transition-all duration-300 focus-visible-ring"
                     onClick={handleMobileAuthClick}
                   >
                     <User className="h-4 w-4 mr-2" />
                     Login
                   </Button>
                   <Button
                     className="flex-1 btn-outline-luxury px-4 py-2 text-sm transition-all duration-300 focus-visible-ring"
                     onClick={handleMobileAuthClick}
                   >
                     Signup
                   </Button>
                   <Button
                     variant="ghost"
                     size="icon"
                     className="flex-1 hover:text-primary transition-all duration-300 hover:bg-primary/10 relative focus-visible-ring"
                     aria-label="Shopping bag"
                   >
                    <ShoppingBag className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      0
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

           </>
   );
 };

export default Navigation;
