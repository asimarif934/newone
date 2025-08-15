import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight, BookOpen, Heart, Share2 } from "lucide-react";
import Navigation from "@/components/Navigation";

const Blog = () => {
  const [blogPosts] = useState([
    {
      id: 1,
      title: "10 Essential Skincare Steps for Glowing Skin",
      excerpt: "Discover the ultimate skincare routine that will transform your skin and give you that coveted natural glow. From cleansing to moisturizing, we cover everything you need to know.",
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
      excerpt: "Explore the latest research on anti-aging compounds and how they work at the cellular level to keep your skin youthful and radiant.",
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
      excerpt: "Stay ahead of the curve with our comprehensive guide to the hottest makeup trends of 2024. From bold colors to natural looks, we've got you covered.",
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
      excerpt: "We debunk common myths about natural and synthetic ingredients in beauty products. Learn what really matters for your skin's health.",
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
      excerpt: "Whether you're a makeup artist or just want to look your best, learn how to build a professional makeup kit with essential products and tools.",
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
      excerpt: "Winter weather can be harsh on your skin. Learn how to adapt your skincare routine to keep your skin healthy and hydrated during the cold months.",
      author: "Dr. James Wilson",
      date: "2024-01-03",
      readTime: "9 min read",
      category: "Skincare",
      image: "/placeholder.svg",
      featured: false,
      likes: 489,
      views: 2980,
    },
  ]);

  const categories = ["All", "Skincare", "Makeup", "Science", "Education", "Tutorials"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
              Beauty & Skincare Blog
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Expert insights, latest trends, and practical tips to help you look and feel your best
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Badge 
                key={category} 
                variant={category === "All" ? "secondary" : "outline"} 
                className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {blogPosts.filter(post => post.featured).map((post) => (
            <Card key={post.id} className="mb-16 group hover:shadow-xl transition-all duration-300 border-border/50">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge variant="outline" className="mb-4 w-fit">
                    {post.category}
                  </Badge>
                  <CardTitle className="text-3xl mb-4 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-lg mb-6 text-muted-foreground">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button className="bg-primary hover:bg-primary/90">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {post.views}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50">
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
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {post.category}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                  
                  <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {post.likes}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="group-hover:text-primary">
                      Read More
                      <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
