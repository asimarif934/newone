import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar, Clock, User, Heart, Share2 } from "lucide-react";
import { supabase } from "../supabaseClient"; // ensure correct path

const BlogDetail = () => {
  const { id } = useParams();

  // State for likes
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);

  // Blog data with all 8 entries
  const blogData: Record<
    string,
    {
      title: string;
      author: string;
      date: string;
      readTime: string;
      category: string;
      image: string;
      content: string[];
    }
  > = {
    "1": {
      title: "10 Essential Skincare Steps for Glowing Skin",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Skincare",
      image: "/placeholder.svg",
      content: [
        "Welcome to our ultimate skincare tutorial.",
        "In this guide, you’ll learn step-by-step how to achieve glowing skin.",
        "Follow these tips daily to see amazing results!",
      ],
    },
    "2": {
      title: "5 Quick and Healthy Breakfast Ideas",
      author: "Chef Emily Parker",
      date: "2024-02-10",
      readTime: "5 min read",
      category: "Food",
      image: "/placeholder.svg",
      content: [
        "Start your day with these easy breakfast recipes.",
        "Each recipe takes less than 10 minutes.",
        "Healthy and delicious for a perfect morning!",
      ],
    },
    "3": {
      title: "Top 7 Travel Destinations for 2024",
      author: "Alex Turner",
      date: "2024-03-20",
      readTime: "7 min read",
      category: "Travel",
      image: "/placeholder.svg",
      content: [
        "Discover the hottest travel spots this year.",
        "From mountains to beaches, explore our top picks.",
        "Plan your next adventure now!",
      ],
    },
    "4": {
      title: "How to Boost Your Productivity",
      author: "Sophia Lee",
      date: "2024-04-05",
      readTime: "6 min read",
      category: "Lifestyle",
      image: "/placeholder.svg",
      content: [
        "Learn the secrets to staying focused and productive.",
        "Implement these strategies in your daily routine.",
        "Achieve more without burning out!",
      ],
    },
    "5": {
      title: "Understanding Mental Health",
      author: "Dr. James Brown",
      date: "2024-05-12",
      readTime: "10 min read",
      category: "Health",
      image: "/placeholder.svg",
      content: [
        "Mental health is just as important as physical health.",
        "Explore common issues and how to cope with them.",
        "Find resources and tips for a healthier mind.",
      ],
    },
    "6": {
      title: "Beginner's Guide to Yoga",
      author: "Lily Adams",
      date: "2024-06-18",
      readTime: "8 min read",
      category: "Fitness",
      image: "/placeholder.svg",
      content: [
        "Start your yoga journey with these simple poses.",
        "Improve flexibility, strength, and mindfulness.",
        "Perfect for beginners and busy schedules!",
      ],
    },
    "7": {
      title: "Mastering Home Gardening",
      author: "Robert Green",
      date: "2024-07-22",
      readTime: "9 min read",
      category: "Hobby",
      image: "/placeholder.svg",
      content: [
        "Grow your own vegetables and flowers at home.",
        "Learn planting, watering, and harvesting tips.",
        "Turn your backyard into a beautiful garden oasis.",
      ],
    },
    "8": {
      title: "The Future of Technology in 2025",
      author: "Elena White",
      date: "2024-08-30",
      readTime: "12 min read",
      category: "Tech",
      image: "/placeholder.svg",
      content: [
        "Technology continues to evolve at lightning speed.",
        "Explore upcoming innovations in AI, robotics, and more.",
        "Stay ahead of the curve with these insights.",
      ],
    },
  };

  const blog = id ? blogData[id] : null;

  // Theme colors
  const themeColor = "#e09a32";
  const hoverColor = "#c58528";

  // Fetch likes from Supabase
  useEffect(() => {
    const fetchLikes = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from("blog_likes")
        .select("*", { count: "exact" })
        .eq("blog_id", id);

      if (error) console.log("Error fetching likes:", error);
      else setLikes(data?.length || 0);
    };

    fetchLikes();
  }, [id]);

  // Handle like button click
  const handleLike = async () => {
    if (!id) return;
    try {
      const { data, error } = await supabase.from("blog_likes").insert([
        {
          blog_id: id,
        },
      ]);

      if (error) {
        console.log("Error liking blog:", error);
      } else {
        setLikes((prev) => prev + 1);
        setLiked(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Share Handler
  const handleShare = () => {
    if (!blog) return;

    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: blog.title,
          text: blog.content[0],
          url: shareUrl,
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied! You can share it anywhere.");
    }
  };

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4" style={{ color: themeColor }}>
          Blog Not Found
        </h1>
        <p className="text-muted-foreground">
          Sorry, the blog you are looking for does not exist.
        </p>
        <Link
          to="/blog"
          className="inline-block mt-6 px-6 py-2 rounded-lg border font-semibold transition"
          style={{ borderColor: themeColor, color: themeColor }}
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div
  className="max-w-4xl my-8 mx-4 md:mx-8 lg:mx-auto !bg-card px-4 py-8 rounded-lg shadow-sm border"
  style={{ borderColor: "rgba(107, 114, 128, 0.3)", borderWidth: "1px" }} 
>
      {/* Blog Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: themeColor }}>
        {blog.title}
      </h1>

      {/* Author + Date + Read Time */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" style={{ color: themeColor }} />
          {blog.author}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" style={{ color: themeColor }} />
          {new Date(blog.date).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" style={{ color: themeColor }} />
          {blog.readTime}
        </div>
      </div>

      {/* Placeholder Image */}
      <div
        className="w-full aspect-video bg-muted rounded-lg overflow-hidden mb-8 border"
        style={{ borderColor: themeColor, borderWidth: "1px" }}
      >
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
      </div>

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none">
        {blog.content.map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>

      {/* Back to Blogs + Like/Share */}
      <div className="flex justify-between items-center mt-8">
        <Link
          to="/blog"
          className="inline-block px-6 py-2 rounded-lg font-semibold transition border"
          style={{ borderColor: themeColor, color: themeColor }}
        >
          Back to Blogs
        </Link>

        <div className="flex gap-3 items-center">
          <button
            className={`p-2 rounded-full border transition ${liked ? "bg-red-100" : ""}`}
            style={{ borderColor: themeColor, color: themeColor }}
            onClick={handleLike}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = hoverColor;
              e.currentTarget.style.color = "#333";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = liked ? "#ffcccc" : "transparent";
              e.currentTarget.style.color = themeColor;
            }}
          >
            <Heart className="h-5 w-5" />
          </button>
          <span>{likes}</span>
          <button
            className="p-2 rounded-full border transition"
            style={{ borderColor: themeColor, color: themeColor }}
            onClick={handleShare}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = hoverColor;
              e.currentTarget.style.color = "#333";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = themeColor;
            }}
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
