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

  // -------------------------
  // Deals Section (6 products)
  // -------------------------
  {
    id: 101,
    name: "Special Combo Pack",
    description: "Limited-time combo deal with amazing value.",
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviews: 320,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80",
    category: "deals",
    isBestSeller: true,
  },
  {
    id: 102,
    name: "Holiday Gift Set",
    description: "Perfect gift set with makeup and skincare essentials.",
    price: 149.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviews: 278,
    image: "https://images.unsplash.com/photo-1581089781785-603411fa81e6?auto=format&fit=crop&w=600&q=80",
    category: "deals",
    isLimitedEdition: true,
  },
  {
    id: 103,
    name: "Mega Brush Bundle",
    description: "Exclusive brush collection at discounted price.",
    price: 99.99,
    originalPrice: 169.99,
    rating: 4.6,
    reviews: 411,
    image: "https://images.unsplash.com/photo-1607083206968-13611e5099e8?auto=format&fit=crop&w=600&q=80",
    category: "deals",
  },
  {
    id: 104,
    name: "Luxury Perfume Duo",
    description: "Exclusive perfume duo pack with premium scents.",
    price: 249.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviews: 540,
    image: "https://images.unsplash.com/photo-1607082349250-3aa14fb4ee8a?auto=format&fit=crop&w=600&q=80",
    category: "deals",
  },
  {
    id: 105,
    name: "Glow Essentials Kit",
    description: "All-in-one kit for glowing and healthy skin.",
    price: 129.99,
    originalPrice: 219.99,
    rating: 4.9,
    reviews: 368,
    image: "https://images.unsplash.com/photo-1556228453-bb3d74b3f34d?auto=format&fit=crop&w=600&q=80",
    category: "deals",
  },
  {
    id: 106,
    name: "Matte Lipstick Mega Pack",
    description: "12-shade matte lipstick deal pack.",
    price: 89.99,
    originalPrice: 149.99,
    rating: 4.5,
    reviews: 297,
    image: "https://images.unsplash.com/photo-1583241962747-6aa7d4d21f60?auto=format&fit=crop&w=600&q=80",
    category: "deals",
  },
];
