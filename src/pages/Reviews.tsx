import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft, Play, Pause, Volume2, VolumeX, Sparkles, Heart, Share2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import productsImage from "@/assets/products-showcase.jpg";

interface Review {
  id: number;
  type: "image" | "video";
  customer: string;
  rating: number;
  date: string;
  comment: string;
  image?: string;
  videoUrl?: string;
  caption?: string;
  likes: number;
  shares: number;
}

const Reviews = () => {
  const navigate = useNavigate();
  const [pausedVideos, setPausedVideos] = useState<Set<number>>(new Set());
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set());
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: 1,
      type: "image",
      customer: "Sophie M.",
      rating: 5,
      date: "2 days ago",
      comment:
        "Absolutely stunning quality! My lips have never looked better. The velvet finish is incredible and it lasts all day perfectly. Obsessed with this shade! 💄✨",
      image: productsImage,
      likes: 124,
      shares: 18,
    },
    {
      id: 2,
      type: "video",
      customer: "Isabella R.",
      rating: 5,
      date: "1 week ago",
      comment:
        "Watch my transformation! The color payoff is insane and the formula is so smooth. I love how it doesn't dry out my lips. Worth every euro! 🎥💋",
      videoUrl:
        "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      caption: "Before & After: Rose Gold Velvet Lipstick",
      likes: 89,
      shares: 23,
    },
    {
      id: 3,
      type: "image",
      customer: "Camille L.",
      rating: 4,
      date: "2 weeks ago",
      comment:
        "Beautiful packaging and great color payoff. The only reason I gave it 4 stars is because I wish it lasted a bit longer. Still love it though! 💕",
      image: productsImage,
      likes: 67,
      shares: 12,
    },
    {
      id: 4,
      type: "video",
      customer: "Emma D.",
      rating: 5,
      date: "3 weeks ago",
      comment:
        "Check out this amazing glow! The foundation gives me such a natural, dewy finish. Perfect for everyday wear. Real Touch Paris never disappoints! ✨🌟",
      videoUrl:
        "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      caption: "Natural Glow: Pearl Essence Foundation",
      likes: 156,
      shares: 31,
    },
    {
      id: 5,
      type: "image",
      customer: "Marie K.",
      rating: 5,
      date: "1 month ago",
      comment:
        "Incredible staying power! I'm obsessed with this brand! The quality is unmatched and the colors are so rich and vibrant. My new go-to! 🎨💄",
      image: productsImage,
      likes: 203,
      shares: 45,
    },
    {
      id: 6,
      type: "video",
      customer: "Alexandra P.",
      rating: 5,
      date: "1 month ago",
      comment:
        "Look at this eyeshadow palette in action! The pigmentation is incredible and the shimmer is to die for. Perfect for creating any look! 🎭✨",
      videoUrl:
        "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      caption: "Golden Hour Eyeshadow Palette Demo",
      likes: 178,
      shares: 28,
    },
  ];

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleVideoPlay = (reviewId: number) => {
    const video = videoRefs.current[reviewId];
    if (video) {
      if (video.paused) {
        video.play();
        setPausedVideos((prev) => {
          const newSet = new Set(prev);
          newSet.delete(reviewId);
          return newSet;
        });
      } else {
        video.pause();
        setPausedVideos((prev) => new Set(prev).add(reviewId));
      }
    }
  };

  const toggleVideoMute = (reviewId: number) => {
    const video = videoRefs.current[reviewId];
    if (video) {
      video.muted = !video.muted;
      setMutedVideos((prev) => {
        const newSet = new Set(prev);
        if (video.muted) {
          newSet.add(reviewId);
        } else {
          newSet.delete(reviewId);
        }
        return newSet;
      });
    }
  };

  // Intersection Observer to pause videos when not visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoId = parseInt(
            entry.target.getAttribute("data-video-id") || "0"
          );
          const video = videoRefs.current[videoId];

          if (video && !entry.isIntersecting) {
            video.pause();
            setPausedVideos((prev) => new Set(prev).add(videoId));
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => observer.disconnect();
  }, []);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />

      {/* Header */}
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackClick}
              className="w-10 h-10 rounded-full border border-border/50 text-foreground hover:bg-muted/30 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Customer Reviews
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Beauty Reviews Straight from the Heart
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            {reviews
              .filter((_, index) => index % 2 === 0)
              .map((review, index) => (
                <div
                  key={review.id}
                  className="bg-card/90 border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  {review.type === "image" ? (
                    <ImageReviewCard
                      review={review}
                      renderStars={renderStars}
                    />
                  ) : (
                    <VideoReviewCard
                      review={review}
                      renderStars={renderStars}
                      videoRef={(el) => (videoRefs.current[review.id] = el)}
                      isPaused={pausedVideos.has(review.id)}
                      isMuted={mutedVideos.has(review.id)}
                      onPlayToggle={() => toggleVideoPlay(review.id)}
                      onMuteToggle={() => toggleVideoMute(review.id)}
                    />
                  )}
                </div>
              ))}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {reviews
              .filter((_, index) => index % 2 === 1)
              .map((review, index) => (
                <div
                  key={review.id}
                  className="bg-card/90 border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  {review.type === "image" ? (
                    <ImageReviewCard
                      review={review}
                      renderStars={renderStars}
                    />
                  ) : (
                    <VideoReviewCard
                      review={review}
                      renderStars={renderStars}
                      videoRef={(el) => (videoRefs.current[review.id] = el)}
                      isPaused={pausedVideos.has(review.id)}
                      isMuted={mutedVideos.has(review.id)}
                      onPlayToggle={() => toggleVideoPlay(review.id)}
                      onMuteToggle={() => toggleVideoMute(review.id)}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden space-y-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-card/90 border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {review.type === "image" ? (
                <ImageReviewCard review={review} renderStars={renderStars} />
              ) : (
                <VideoReviewCard
                  review={review}
                  renderStars={renderStars}
                  videoRef={(el) => (videoRefs.current[review.id] = el)}
                  isPaused={pausedVideos.has(review.id)}
                  isMuted={mutedVideos.has(review.id)}
                  onPlayToggle={() => toggleVideoPlay(review.id)}
                  onMuteToggle={() => toggleVideoMute(review.id)}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-muted/30 border border-border/50 rounded-2xl p-8 md:p-12 text-center shadow-lg">
          <div className="flex justify-center mb-6">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            ✨ Tag us & share your glow using #realtouchluxury ✨
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Get exclusive coupons & free delivery when you share your Real Touch
            Paris experience
          </p>

          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105">
            <Share2 className="w-5 h-5 mr-2" />
            Share Your Glow
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Image Review Card
const ImageReviewCard = ({
  review,
  renderStars,
}: {
  review: Review;
  renderStars: (rating: number) => JSX.Element[];
}) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {review.customer.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {review.customer}
            </h3>
            <p className="text-sm text-muted-foreground">{review.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
      </div>

      {/* Image */}
      {review.image && (
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={review.image}
            alt={`Review by ${review.customer}`}
            className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}

      {/* Text */}
      <p className="text-muted-foreground leading-relaxed">
        "{review.comment}"
      </p>

      {/* Engagement */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{review.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="w-4 h-4" />
            <span>{review.shares}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Video Review Card
const VideoReviewCard = ({
  review,
  renderStars,
  videoRef,
  isPaused,
  isMuted,
  onPlayToggle,
  onMuteToggle,
}: {
  review: Review;
  renderStars: (rating: number) => JSX.Element[];
  videoRef: (el: HTMLVideoElement | null) => void;
  isPaused: boolean;
  isMuted: boolean;
  onPlayToggle: () => void;
  onMuteToggle: () => void;
}) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {review.customer.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {review.customer}
            </h3>
            <p className="text-sm text-muted-foreground">{review.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
      </div>

      {/* Video */}
      <div className="relative overflow-hidden rounded-xl bg-black">
        <video
          ref={videoRef}
          data-video-id={review.id}
          className="w-full h-64 object-cover"
          loop
          muted={isMuted}
          playsInline
        >
          <source src={review.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <button
            onClick={onPlayToggle}
            className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 shadow-lg transition-all duration-300"
          >
            {isPaused ? (
              <Play className="w-8 h-8 text-gray-800 ml-1" />
            ) : (
              <Pause className="w-8 h-8 text-gray-800" />
            )}
          </button>
        </div>

        {/* Mute Button */}
        <button
          onClick={onMuteToggle}
          className="absolute top-4 right-4 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-all"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>

        {/* Caption */}
        {review.caption && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black/70 rounded-lg px-3 py-2">
              <p className="text-white text-sm font-medium">{review.caption}</p>
            </div>
          </div>
        )}
      </div>

      {/* Text */}
      <p className="text-muted-foreground leading-relaxed">
        "{review.comment}"
      </p>

      {/* Engagement */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{review.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="w-4 h-4" />
            <span>{review.shares}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
