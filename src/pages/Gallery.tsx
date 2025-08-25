import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X, Heart, Share2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import productsImage from "@/assets/products-showcase.jpg";

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  type: string;
}

const Gallery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // Get gallery items from navigation state or use default
  const galleryItems: GalleryItem[] = location.state?.allItems || [
    {
      id: 1,
      image: productsImage,
      title: "Rose Gold Velvet Lipstick",
      type: "product"
    },
    {
      id: 2,
      image: productsImage,
      title: "Golden Hour Eyeshadow",
      type: "customer"
    },
    {
      id: 3,
      image: productsImage,
      title: "Midnight Glam Mascara",
      type: "product"
    },
    {
      id: 4,
      image: productsImage,
      title: "Pearl Essence Foundation",
      type: "customer"
    },
    {
      id: 5,
      image: productsImage,
      title: "Luxury Makeup Collection",
      type: "product"
    },
    {
      id: 6,
      image: productsImage,
      title: "Parisian Beauty Look",
      type: "customer"
    },
    {
      id: 7,
      image: productsImage,
      title: "Velvet Touch Blush",
      type: "product"
    },
    {
      id: 8,
      image: productsImage,
      title: "Sunset Glow Highlighter",
      type: "customer"
    }
  ];

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbf7] via-[#faf6f0] to-[#f7f2e8]">
      <Navigation />
      
      {/* Header */}
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackClick}
              className="w-10 h-10 rounded-full border border-amber-200/30 text-amber-600 hover:bg-amber-50"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-luxury">Gallery</h1>
              <p className="text-lg text-foreground/70 mt-2">Discover our luxury beauty collection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer group transform transition-all duration-500 hover:scale-105 ${
                index % 2 === 1 ? 'mt-4 md:mt-8' : ''
              }`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleItemClick(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-sm transition-opacity duration-300 ${
                hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <h4 className="text-sm font-semibold mb-2 text-center">{item.title}</h4>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-xs font-medium">
                    View Details
                  </div>
                </div>
              </div>
              {/* Type Badge */}
              <div className="absolute top-3 left-3 z-10">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.type === 'product' 
                    ? 'bg-amber-400/90 text-amber-900' 
                    : 'bg-blue-400/90 text-blue-900'
                }`}>
                  {item.type === 'product' ? 'Product' : 'Customer'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-white">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-transparent border-2 border-amber-400/50 text-amber-400 hover:bg-amber-400 hover:text-black rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-400/25"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              
              {/* Action Buttons */}
              <div className="absolute top-4 left-4 flex gap-2">
                <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-gray-800" />
                </button>
                <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Share2 className="w-5 h-5 text-gray-800" />
                </button>
              </div>
            </div>

            {/* Item Info */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-luxury">{selectedItem.title}</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedItem.type === 'product' 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {selectedItem.type === 'product' ? 'Product' : 'Customer Photo'}
                </div>
              </div>
              
              {selectedItem.type === 'product' && (
                <div className="space-y-4">
                  <p className="text-foreground/70">
                    Experience the luxury of {selectedItem.title.toLowerCase()}. Crafted with premium ingredients and designed for the modern beauty enthusiast.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-foreground/60">Finish:</span>
                      <span className="ml-2 text-foreground">Velvet</span>
                    </div>
                    <div>
                      <span className="text-foreground/60">Wear Time:</span>
                      <span className="ml-2 text-foreground">12 hours</span>
                    </div>
                    <div>
                      <span className="text-foreground/60">Size:</span>
                      <span className="ml-2 text-foreground">Standard</span>
                    </div>
                    <div>
                      <span className="text-foreground/60">Cruelty Free:</span>
                      <span className="ml-2 text-foreground">Yes</span>
                    </div>
                  </div>
                  <Button className="w-full bg-amber-400 text-amber-900 hover:bg-amber-500 transition-colors">
                    Shop Now
                  </Button>
                </div>
              )}
              
              {selectedItem.type === 'customer' && (
                <div className="space-y-4">
                  <p className="text-foreground/70">
                    Real beauty from our community. This stunning look was created using our luxury products by one of our valued customers.
                  </p>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="border-amber-200 text-amber-600 hover:bg-amber-50">
                      Shop the Look
                    </Button>
                    <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                      Share Your Look
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
