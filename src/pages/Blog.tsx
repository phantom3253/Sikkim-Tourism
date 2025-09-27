import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, User, Clock, Eye, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  views: number;
  likes: number;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "A Monk's Journey: Life Inside Rumtek Monastery",
    excerpt: "Step into the daily life of Buddhist monks at Sikkim's most revered monastery, where ancient traditions meet modern devotion.",
    author: "Lama Tenzin",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Spiritual Life",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    views: 2340,
    likes: 89,
    featured: true
  },
  {
    id: 2,
    title: "Losar Festival: Celebrating Tibetan New Year in Sikkim",
    excerpt: "Experience the vibrant colors, traditional dances, and spiritual significance of Sikkim's most important Buddhist festival.",
    author: "Sarah Thompson",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Festivals",
    image: "https://images.unsplash.com/photo-1571892806085-bd5ca5e1e3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    views: 1890,
    likes: 67
  },
  {
    id: 3,
    title: "Trekking to Hidden Monasteries: North Sikkim Adventure",
    excerpt: "Discover remote monasteries nestled in the Himalayas, accessible only through challenging yet rewarding mountain trails.",
    author: "Rajesh Pradhan",
    date: "2024-01-05",
    readTime: "12 min read",
    category: "Adventure",
    image: "https://images.unsplash.com/photo-1464822759844-d150ad6d1904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    views: 3210,
    likes: 124
  },
  {
    id: 4,
    title: "Ancient Murals: Preserving Himalayan Art Heritage",
    excerpt: "Explore the intricate Buddhist art that adorns monastery walls, telling stories of enlightenment and cultural preservation.",
    author: "Dr. Pemba Sherpa",
    date: "2023-12-28",
    readTime: "10 min read",
    category: "Art & Culture",
    image: "https://images.unsplash.com/photo-1589810411080-c6734f6a0fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    views: 1567,
    likes: 45
  },
  {
    id: 5,
    title: "Meditation Retreats: Finding Peace in Sikkim's Monasteries",
    excerpt: "A guide to meditation programs offered by various monasteries, perfect for both beginners and experienced practitioners.",
    author: "Maya Chettri",
    date: "2023-12-20",
    readTime: "7 min read",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    views: 2100,
    likes: 78
  },
  {
    id: 6,
    title: "Sustainable Tourism: Protecting Sacred Spaces",
    excerpt: "How responsible tourism practices help preserve Sikkim's monastic heritage while supporting local communities.",
    author: "Environmental Team",
    date: "2023-12-15",
    readTime: "9 min read",
    category: "Conservation",
    image: "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    views: 1023,
    likes: 34
  }
];

const categories = ["All", "Spiritual Life", "Festivals", "Adventure", "Art & Culture", "Wellness", "Conservation"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Header Section */}
        <section className="bg-gradient-spiritual py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="monastery-title mb-6">
              Stories from the Heart of Himalayas
            </h1>
            <p className="cultural-text text-lg mb-8">
              Discover authentic experiences, spiritual insights, and cultural treasures through 
              stories from monks, travelers, and local communities.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Input 
                  placeholder="Search stories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 py-3 border-monastery-brown/20 focus:border-secondary"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-gradient-sunset text-spiritual-white shadow-golden' 
                    : 'hover:bg-secondary/20 hover:border-secondary'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Post */}
          {featuredPost && selectedCategory === "All" && !searchQuery && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-monastery-brown mb-6">Featured Story</h2>
              <Card className="monastery-card overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <Badge className="bg-sacred-red text-spiritual-white mb-4">
                      {featuredPost.category}
                    </Badge>
                    <h3 className="text-2xl font-bold text-monastery-brown mb-4">
                      {featuredPost.title}
                    </h3>
                    <p className="cultural-text mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4 text-sm text-monastery-brown-light">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(featuredPost.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Button className="bg-gradient-sunset text-spiritual-white">
                        Read Full Story
                      </Button>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleLike(featuredPost.id)}
                          className="flex items-center gap-1 text-monastery-brown-light hover:text-sacred-red transition-colors"
                        >
                          <Heart className={`w-4 h-4 ${likedPosts.includes(featuredPost.id) ? 'fill-current text-sacred-red' : ''}`} />
                          <span>{featuredPost.likes + (likedPosts.includes(featuredPost.id) ? 1 : 0)}</span>
                        </button>
                        <div className="flex items-center gap-1 text-monastery-brown-light">
                          <Eye className="w-4 h-4" />
                          <span>{featuredPost.views}</span>
                        </div>
                        <button className="text-monastery-brown-light hover:text-secondary transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <Card 
                key={post.id} 
                className="monastery-card group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-monastery opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-sacred-gold text-monastery-brown">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-monastery-brown group-hover:text-sacred-red transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="cultural-text text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-monastery-brown-light mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" className="text-xs">
                      Read More
                    </Button>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(post.id);
                        }}
                        className="flex items-center gap-1 text-monastery-brown-light hover:text-sacred-red transition-colors"
                      >
                        <Heart className={`w-3 h-3 ${likedPosts.includes(post.id) ? 'fill-current text-sacred-red' : ''}`} />
                        <span className="text-xs">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                      </button>
                      <div className="flex items-center gap-1 text-monastery-brown-light">
                        <Eye className="w-3 h-3" />
                        <span className="text-xs">{post.views}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="cultural-text">No stories found for the selected filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;