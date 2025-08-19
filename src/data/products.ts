import blusher from "@/data/blusher.jpg";
import blusher2 from "@/data/blusher-2.jpg";
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  isBestSeller?: boolean;
  isLimitedEdition?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Luxury Foundation",
    description: "Premium foundation with long-lasting coverage and natural finish.",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 1247,
    image: blusher,
    category: "Makeup",
    isBestSeller: true,
  },
  {
    id: 2,
    name: "Anti-Aging Serum",
    description: "Advanced formula targeting fine lines and wrinkles.",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviews: 892,
    image: blusher2,
    category: "Skincare",
    isLimitedEdition: true,
  },
  {
    id: 3,
    name: "Luxury Lipstick Set",
    description: "Collection of 6 premium matte lipsticks in trending shades.",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1601924638867-3ec3a2dfe6c5?auto=format&fit=crop&w=600&q=80",
    category: "Makeup",
  },
  {
    id: 4,
    name: "Hydrating Face Mask",
    description: "Intensive hydration mask with hyaluronic acid.",
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviews: 423,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=600&q=80",
    category: "Skincare",
  },
  {
    id: 5,
    name: "Professional Brush Set",
    description: "Complete set of 12 professional makeup brushes.",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.8,
    reviews: 756,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
    category: "Tools",
    isBestSeller: true,
  },
  {
    id: 6,
    name: "Vitamin C Brightening Cream",
    description: "Brightening cream with stable vitamin C and antioxidants.",
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.7,
    reviews: 634,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
    category: "Skincare",
    isLimitedEdition: true,
  },
];
