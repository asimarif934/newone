import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const footerLinks = {
    shop: [
      { name: "New Arrivals", href: "/new" },
      { name: "Best Sellers", href: "/bestsellers" },
      { name: "Lips", href: "/lips" },
      { name: "Eyes", href: "/eyes" },
      { name: "Face", href: "/face" },
      { name: "Gift Sets", href: "/gifts" }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Reviews", href: "/reviews" },
      { name: "Our Community", href: "/community" },
      { name: "Our Products", href: "/products" },
      { name: "Blogs", href: "/blogs" }
    ],
    support: [
      { name: "Shipping & Returns", href: "/shipping-returns" },
      { name: "Makeup Guide", href: "/makeup-guide" },
      { name: "FAQs", href: "/faqs" }
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com/example", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/example", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/example", label: "Twitter" },
    { icon: Youtube, href: "https://youtube.com/example", label: "YouTube" }
  ];

  return (
    <footer className="bg-card border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-luxury">Real Touch Paris</h3>
            <p className="text-foreground/70 leading-relaxed max-w-md !mt-3">
              Where luxury meets artistry. Experience the touch of real beauty 
              with our exclusive Parisian collection crafted for the modern woman.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-foreground/60 !mt-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>75001 Paris, France</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <a href="https://wa.me/923411816746" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">+92 341 1816746</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:abbasiasim853@gmail.com" className="hover:text-primary transition-colors">abbasiasim853@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-primary" />
                <a href="https://wa.me/923411816746" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 !mt-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="hover:text-primary hover:bg-primary/10 transition-colors"
                  asChild
                >
                  <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                    <social.icon className="w-5 h-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Shop Links 
          <div>
            <h4 className="font-semibold text-foreground mb-2">Shop</h4>
            <ul className="space-y-0">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-foreground/60 hover:text-primary transition-colors text-xs"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>*/}

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-2">Company</h4>
            <ul className="space-y-0">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-foreground/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-2">Support</h4>
            <ul className="space-y-0">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-foreground/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-foreground/60">
            © 2024 Real Touch Paris. All rights reserved.
          </div>
          
          <div className="flex gap-6 text-sm">
            <a href="/privacy-policy" className="text-foreground/60 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-foreground/60 hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="/cookie-policy" className="text-foreground/60 hover:text-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;