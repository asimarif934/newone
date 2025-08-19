import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight, BookOpen, Heart, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();

  const [blogPosts] = useState([
    {
      id: 1,
      title: "10 Essential Skincare Steps for Glowing Skin",
      excerpt: "Discover the ultimate skincare routine that will transform your skin...",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Skincare",
      image: "/placeholder.svg",
      featured: true,
      likes: 1247,
      views: 8920,
    },
    {
      id: 2,
      title: "The Science Behind Anti-Aging Ingredients",
      excerpt: "Explore the latest research on anti-aging compounds...",
      author: "Dr. Michael Chen",
      date: "2024-01-12",
      readTime: "12 min read",
      category: "Science",
      image: "/placeholder.svg",
      featured: false,
      likes: 892,
      views: 5670,
    },
    {
      id: 3,
      title: "Makeup Trends for 2024: What's Hot and What's Not",
      excerpt: "Stay ahead of the curve with our guide to the hottest makeup trends...",
      author: "Emma Rodriguez",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Makeup",
      image: "/placeholder.svg",
      featured: false,
      likes: 756,
      views: 4230,
    },
    {
      id: 4,
      title: "Natural vs. Synthetic: The Truth About Beauty Ingredients",
      excerpt: "We debunk common myths about natural and synthetic ingredients...",
      author: "Dr. Lisa Park",
      date: "2024-01-08",
      readTime: "10 min read",
      category: "Education",
      image: "/placeholder.svg",
      featured: false,
      likes: 634,
      views: 3890,
    },
    {
      id: 5,
      title: "How to Build a Professional Makeup Kit",
      excerpt: "Learn how to build a professional makeup kit with essential products...",
      author: "Maria Santos",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "Tutorials",
      image: "/placeholder.svg",
      featured: false,
      likes: 567,
      views: 3450,
    },
    {
      id: 6,
      title: "Seasonal Skincare: Adapting Your Routine for Winter",
      excerpt: "Winter weather can be harsh on your skin. Learn how to adapt...",
      author: "Dr. James Wilson",
      date: "2024-01-03",
      readTime: "9 min read",
      category: "Skincare",
      image: "/placeholder.svg",
      featured: false,
      likes: 489,
      views: 2980,
    },
    {
      id: 7,
      title: "Dummy Blog Post 1",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "Admin",
      date: "2024-02-01",
      readTime: "5 min read",
      category: "Skincare",
      image: "/placeholder.svg",
      featured: false,
      likes: 100,
      views: 500,
    },
    {
      id: 8,
      title: "Dummy Blog Post 2",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "Admin",
      date: "2024-02-02",
      readTime: "6 min read",
      category: "Makeup",
      image: "/placeholder.svg",
      featured: false,
      likes: 90,
      views: 450,
    },
  ]);

  const categories = ["All", "Skincare", "Makeup", "Science", "Education", "Tutorials"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const handleReadMore = (id: number) => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-[#e09a32] mr-3" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Beauty & Skincare Blog
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Expert insights, latest trends, and practical tips to help you look and feel your best
          </p>

          {/* Categories */}
          {/* Only change: override shadcn `--secondary` color to your yellow for the active badge */}
          <div
            className="flex flex-wrap justify-center gap-4"
            style={{
              ["--secondary" as any]: "36 74% 54%",            // ~ #e09a32
              ["--secondary-foreground" as any]: "0 0% 0%",    // black text
            }}
          >
            {categories.map((category) => (
              <Badge
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "secondary" : "outline"}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-[#e09a32] hover:text-black transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(0, visibleCount).map((post) => (
              <Card
                key={post.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/50 "
              >
                <CardHeader className="relative pb-4">
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/80 hover:bg-background"
                    >
                      <Share2 className="h-4 w-4 text-[#e09a32]" />
                    </Button>
                  </div>
                  <Badge variant="outline" className="w-fit text-[#e09a32] border-[#e09a32]">
                    {post.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardTitle
                    onClick={() => handleReadMore(post.id)}
                    className="text-xl mb-3 group-hover:text-[#e09a32] transition-colors duration-300 line-clamp-2 cursor-pointer"
                  >
                    {post.title}
                  </CardTitle>

                  <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>

                  <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-[#e09a32]" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-[#e09a32]" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-[#e09a32]" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3 text-[#e09a32]" />
                        {post.likes}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#e09a32] text-black hover:bg-[#c58528]"
                      onClick={() => handleReadMore(post.id)}
                    >
                      Read More
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View More Button */}
          {visibleCount < filteredPosts.length && (
            <div className="flex justify-center mt-12">
              <Button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="bg-[#e09a32] hover:bg-[#c58528] text-black"
              >
                View More
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
