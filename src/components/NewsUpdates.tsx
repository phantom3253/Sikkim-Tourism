import { useState, useEffect } from "react";
import { Bell, Calendar, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NewsItem {
  id: string;
  title: string;
  category: 'event' | 'announcement' | 'festival' | 'update';
  date: string;
  excerpt: string;
  isNew: boolean;
  link?: string;
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Losar Festival Celebrations at Rumtek Monastery - March 2024',
    category: 'festival',
    date: '2024-02-15',
    excerpt: 'Join the grand Tibetan New Year celebrations with traditional dances and prayers',
    isNew: true,
    link: '/festivals/losar-2024'
  },
  {
    id: '2',
    title: 'New 360° Virtual Tour Now Available for Pemayangtse Monastery',
    category: 'update',
    date: '2024-02-10',
    excerpt: 'Experience the ancient murals and architectural beauty in immersive detail',
    isNew: true,
    link: '/virtual-tours/pemayangtse'
  },
  {
    id: '3',
    title: 'Digital Archive Expansion: 100+ Rare Manuscripts Now Online',
    category: 'announcement',
    date: '2024-02-05',
    excerpt: 'Explore newly digitized Buddhist texts and historical documents from the 12th century',
    isNew: false,
    link: '/archives/manuscripts'
  },
  {
    id: '4',
    title: 'Monastery Restoration Project Update - Enchey Monastery',
    category: 'update',
    date: '2024-01-28',
    excerpt: 'Conservation work progresses to preserve ancient frescoes and architectural elements',
    isNew: false,
    link: '/projects/enchey-restoration'
  },
  {
    id: '5',
    title: 'Buddha Purnima Celebrations Across All Monasteries - May 2024',
    category: 'event',
    date: '2024-01-20',
    excerpt: 'Special meditation sessions and cultural programs planned for the sacred day',
    isNew: false,
    link: '/events/buddha-purnima'
  }
];

const NewsUpdates = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % newsItems.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'festival':
        return 'bg-sacred-red text-spiritual-white';
      case 'event':
        return 'bg-prayer-blue text-spiritual-white';
      case 'announcement':
        return 'bg-sacred-gold text-monastery-brown';
      case 'update':
        return 'bg-secondary text-monastery-brown';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-spiritual border-b border-sacred-gold/20">
      <div className="max-w-7xl mx-auto">
        {/* Scrolling News Ticker */}
        <div className="mb-6 overflow-hidden bg-monastery-brown rounded-lg">
          <div className="bg-sacred-red px-4 py-2 flex items-center gap-2">
            <Bell className="w-4 h-4 text-spiritual-white animate-pulse" />
            <span className="text-spiritual-white font-semibold text-sm">LATEST UPDATES</span>
          </div>
          <div className="px-4 py-3 bg-monastery-brown text-spiritual-white">
            <div className="flex animate-[scroll-left_30s_linear_infinite] whitespace-nowrap">
              {newsItems.filter(item => item.isNew).map((item, index) => (
                <span key={item.id} className="mr-8">
                  🕉️ {item.title}
                  {index < newsItems.filter(n => n.isNew).length - 1 && " • "}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured News Carousel */}
        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sacred-red" />
              <h2 className="text-xl font-bold text-monastery-brown">News & Announcements</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevSlide}
                className="p-2 border-monastery-brown/20"
                onMouseEnter={() => setIsAutoPlay(false)}
                onMouseLeave={() => setIsAutoPlay(true)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextSlide}
                className="p-2 border-monastery-brown/20"
                onMouseEnter={() => setIsAutoPlay(false)}
                onMouseLeave={() => setIsAutoPlay(true)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div 
            className="relative overflow-hidden rounded-xl"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {newsItems.map((item) => (
                <Card key={item.id} className="min-w-full monastery-card border-sacred-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getCategoryColor(item.category)}>
                            {item.category}
                          </Badge>
                          {item.isNew && (
                            <Badge className="bg-sacred-red text-spiritual-white animate-pulse">
                              NEW
                            </Badge>
                          )}
                          <span className="text-sm text-monastery-brown-light">
                            {new Date(item.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-monastery-brown mb-2">
                          {item.title}
                        </h3>
                        <p className="cultural-text text-sm mb-4">{item.excerpt}</p>
                        {item.link && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-sacred-gold/30 text-monastery-brown hover:bg-sacred-gold/10"
                          >
                            Read More
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {newsItems.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-sacred-red w-6' 
                    : 'bg-monastery-brown-light hover:bg-monastery-brown'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsUpdates;