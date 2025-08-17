import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "@/components/Navigation"; // ✅ Import Navigation

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Gallery from "./pages/Gallery";
import Product from "./pages/Product";
import Reviews from "./pages/Reviews";
import Products from "./pages/Products";
import LikeProducts from "./pages/LikeProducts";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail"; // ✅ Import BlogDetail page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation /> {/* ✅ Always visible at top */}
        <div className="pt-16"> {/* Push content below fixed nav */}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/like-products" element={<LikeProducts />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} /> {/* ✅ Blog details route */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/product" element={<Product />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
