import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "@/components/Navigation"; 

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Gallery from "./pages/Gallery";
import Product from "./pages/Product"; // optional, if you still want single old page
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail"; // ✅ details page
import Reviews from "./pages/Reviews";
import LikeProducts from "./pages/LikeProducts";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} /> {/* ✅ details route */}
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/like-products" element={<LikeProducts />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/product" element={<Product />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
