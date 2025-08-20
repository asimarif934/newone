import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, User, CreditCard, Truck, Tag } from "lucide-react";
import { products } from "@/data/products";

interface CartItem {
  id: number;
  quantity: number;
}

interface NavigationState {
  productId?: number;
  productName?: string;
  productPrice?: number;
  quantity?: number;
}

const Checkout = () => {
  const location = useLocation();
  const navigationState = location.state as NavigationState;
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phonePrimary: "",
    phoneSecondary: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);

  // Use navigation state if available, otherwise fall back to mock data
  const cartItems: CartItem[] = navigationState?.productId 
    ? [{ id: navigationState.productId, quantity: navigationState.quantity || 1 }]
    : [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 },
      ];

  const deliveryCharges = 200;
  const couponDiscounts: { [key: string]: number } = {
    "LUXURY20": 20,
    "BEAUTY15": 15,
    "WELCOME10": 10,
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleApplyCoupon = () => {
    const discount = couponDiscounts[couponCode.toUpperCase()];
    if (discount) {
      setAppliedCoupon(couponCode.toUpperCase());
      setCouponDiscount(discount);
    } else {
      setAppliedCoupon("");
      setCouponDiscount(0);
    }
  };

  const getCartItems = () => {
    // If we have navigation state with product details, use those
    if (navigationState?.productId && navigationState?.productName && navigationState?.productPrice) {
      return [{
        id: navigationState.productId,
        name: navigationState.productName,
        price: navigationState.productPrice,
        image: products.find(p => p.id === navigationState.productId)?.image || "",
        quantity: navigationState.quantity || 1
      }];
    }
    
    // Otherwise use the cart items from products data
    return cartItems.map(item => {
      const product = products.find(p => p.id === item.id);
      return { ...product, quantity: item.quantity };
    }).filter(Boolean);
  };

  const calculateSubtotal = () => {
    return getCartItems().reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    return (subtotal * couponDiscount) / 100;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return subtotal + deliveryCharges - discount;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle checkout submission
    console.log("Checkout submitted:", { formData, orderSummary: calculateTotal() });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="relative h-64 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 overflow-hidden">
        <div className="absolute inset-0 bg-luxury-gradient opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full animate-float opacity-80" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-1/4 left-1/5 w-3 h-3 bg-primary rounded-full animate-float opacity-40" style={{ animationDelay: "2s" }}></div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-luxury mb-4">
              Checkout - Shipping & Billing
            </h1>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto shimmer"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column - Customer Details Form */}
          <div className="space-y-8">
            <Card className="card-luxury">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-luxury flex items-center gap-3">
                  <User className="w-6 h-6 text-primary" />
                  Customer Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-foreground/80">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="bg-input/50 border-border/50 rounded-lg focus:border-primary focus:ring-primary/20"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground/80">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-input/50 border-border/50 rounded-lg focus:border-primary focus:ring-primary/20 pl-10"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phone Numbers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phonePrimary" className="text-foreground/80">Primary Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phonePrimary"
                          type="tel"
                          value={formData.phonePrimary}
                          onChange={(e) => handleInputChange("phonePrimary", e.target.value)}
                          className="bg-input/50 border-border/50 rounded-lg focus:border-primary focus:ring-primary/20 pl-10"
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneSecondary" className="text-foreground/80">Secondary Phone (Optional)</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phoneSecondary"
                          type="tel"
                          value={formData.phoneSecondary}
                          onChange={(e) => handleInputChange("phoneSecondary", e.target.value)}
                          className="bg-input/50 border-border/50 rounded-lg focus:border-primary focus:ring-primary/20 pl-10"
                          placeholder="+1 (555) 987-6543"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-4">
                    <Label className="text-foreground/80 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Shipping Address
                    </Label>
                    <div className="space-y-4">
                      <Input
                        type="text"
                        value={formData.street}
                        onChange={(e) => handleInputChange("street", e.target.value)}
                        className="bg-input/50 border-border/50 rounded-lg focus:border-primary focus:ring-primary/20"
                        placeholder="Street Address"
                        required
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className="bg-input/50 border-border/50 rounded-lg focus:border-primary focus:ring-primary/20"
                          placeholder="City"
                          required
                        />
                        <Input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange("postalCode", e.target.value)}
                          className="bg-input/50 border-border/50 rounded-lg focus:border-primary focus:ring-primary/20"
                          placeholder="Postal Code"
                          required
                        />
                        <Input
                          type="text"
                          value={formData.country}
                          onChange={(e) => handleInputChange("country", e.target.value)}
                          className="bg-input/50 border-border/50 rounded-lg focus:border-primary focus:ring-primary/20"
                          placeholder="Country"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <Card className="bg-muted/30 border-border/30">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Truck className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Delivery Information</h3>
                      </div>
                      <div className="space-y-2 text-sm text-foreground/80">
                        <p>Standard Delivery Charges: <span className="text-primary font-semibold">Rs. 200</span></p>
                        <p>Delivery within <span className="text-accent font-semibold">2 days</span></p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Coupon Section */}
                  <Card className="bg-muted/30 border-border/30">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Tag className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Apply Coupon</h3>
                      </div>
                      <div className="flex gap-3">
                        <Input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="bg-input/50 border-border/50 rounded-lg focus:border-primary focus:ring-primary/20"
                          placeholder="Enter Coupon Code"
                        />
                        <Button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="btn-luxury px-6"
                        >
                          Apply
                        </Button>
                      </div>
                      {appliedCoupon && (
                        <p className="text-sm text-primary mt-2">
                          Coupon "{appliedCoupon}" applied! {couponDiscount}% discount
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full btn-luxury text-lg py-4"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Complete Purchase
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <Card className="card-luxury sticky top-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-luxury flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-primary" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cart Items */}
                <div className="space-y-4">
                  {getCartItems().map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <p className="text-sm text-foreground/60">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-foreground/60">Rs. {item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-t border-border/30 pt-4">
                  <div className="flex justify-between text-foreground/80">
                    <span>Subtotal</span>
                    <span>Rs. {calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/80">
                    <span>Delivery Charges</span>
                    <span>Rs. {deliveryCharges.toFixed(2)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-primary">
                      <span>Discount ({couponDiscount}%)</span>
                      <span>- Rs. {calculateDiscount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold text-luxury border-t border-border/30 pt-3">
                    <span>Grand Total</span>
                    <span>Rs. {calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-sm text-foreground/80 text-center">
                    🔒 Your payment information is secure and encrypted
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
