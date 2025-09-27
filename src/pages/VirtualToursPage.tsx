import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VirtualTour360 from "@/components/VirtualTour360";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, Clock, Star } from "lucide-react";

const VirtualToursPage = () => {
  const featuredTours = [
    {
      id: 'rumtek-main-hall',
      title: 'Rumtek Monastery - Main Prayer Hall',
      monastery: 'Rumtek Monastery',
      description: 'Experience the magnificent main prayer hall with ancient murals and golden Buddha statues',
      duration: '15 min',
      highlights: ['Golden Buddha Statue', 'Ancient Murals', 'Prayer Wheels'],
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isVRReady: true,
      rating: 4.8
    },
    {
      id: 'pemayangtse-exterior',
      title: 'Pemayangtse Monastery - Exterior Views',
      monastery: 'Pemayangtse Monastery',
      description: 'Explore the stunning exterior architecture and panoramic mountain views',
      duration: '12 min',
      highlights: ['Mountain Views', 'Traditional Architecture', 'Sacred Gardens'],
      difficulty: 'Easy',
      image: 'https://images.unsplash.com/photo-1571892806085-bd5ca5e1e3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isVRReady: true,
      rating: 4.7
    },
    {
      id: 'enchey-meditation',
      title: 'Enchey Monastery - Meditation Hall',
      monastery: 'Enchey Monastery',
      description: 'Immerse yourself in the peaceful meditation hall atmosphere',
      duration: '20 min',
      highlights: ['Meditation Space', 'Sacred Texts', 'Peaceful Ambiance'],
      difficulty: 'Medium',
      image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isVRReady: false,
      rating: 4.6
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Header Section */}
        <section className="bg-gradient-spiritual py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="monastery-title mb-6">
              360° Virtual Tours
            </h1>
            <p className="cultural-text text-lg mb-8">
              Experience Sikkim's sacred monasteries from anywhere in the world. 
              Our immersive virtual tours bring you closer to ancient Buddhist heritage 
              with interactive features and multilingual narration.
            </p>
          </div>
        </section>

        {/* Featured Tour */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-monastery-brown mb-4">
                Featured Virtual Tour
              </h2>
              <p className="cultural-text">
                Start your spiritual journey with our most popular immersive experience
              </p>
            </div>
            
            <VirtualTour360 />
          </div>
        </section>

        {/* All Tours Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-monastery-brown mb-4">
                All Virtual Tours
              </h2>
              <p className="cultural-text">
                Explore our complete collection of monastery tours
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTours.map((tour) => (
                <Card key={tour.id} className="monastery-card border-monastery-brown/20 group">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <div 
                        className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url(${tour.image})` }}
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge className="bg-sacred-red text-spiritual-white">
                          <Eye className="w-3 h-3 mr-1" />
                          360° Tour
                        </Badge>
                        {tour.isVRReady && (
                          <Badge className="bg-prayer-blue text-spiritual-white">
                            VR Ready
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-3 right-3">
                        <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-white text-xs">{tour.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-monastery-brown mb-2">
                        {tour.title}
                      </h3>
                      <p className="cultural-text text-sm mb-3 line-clamp-2">
                        {tour.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs text-monastery-brown-light">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{tour.monastery}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{tour.duration}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {tour.highlights.slice(0, 2).map((highlight, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-sacred-gold/10 text-monastery-brown px-2 py-1 rounded"
                            >
                              {highlight}
                            </span>
                          ))}
                          {tour.highlights.length > 2 && (
                            <span className="text-xs bg-sacred-gold/10 text-monastery-brown px-2 py-1 rounded">
                              +{tour.highlights.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-sunset text-spiritual-white">
                        <Eye className="w-4 h-4 mr-2" />
                        Start Virtual Tour
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* VR Information */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-monastery-brown mb-8">
              Enhanced VR Experience
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="monastery-card border-sacred-gold/20">
                <CardHeader>
                  <Eye className="w-8 h-8 mx-auto text-sacred-red mb-2" />
                  <CardTitle className="text-center text-monastery-brown">Immersive Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="cultural-text text-sm text-center">
                    Experience monasteries as if you're physically present with our high-resolution 360° photography
                  </p>
                </CardContent>
              </Card>

              <Card className="monastery-card border-sacred-gold/20">
                <CardHeader>
                  <MapPin className="w-8 h-8 mx-auto text-prayer-blue mb-2" />
                  <CardTitle className="text-center text-monastery-brown">Interactive Hotspots</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="cultural-text text-sm text-center">
                    Click on interactive points to learn about architecture, artifacts, and spiritual significance
                  </p>
                </CardContent>
              </Card>

              <Card className="monastery-card border-sacred-gold/20">
                <CardHeader>
                  <Clock className="w-8 h-8 mx-auto text-sacred-gold mb-2" />
                  <CardTitle className="text-center text-monastery-brown">Audio Narration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="cultural-text text-sm text-center">
                    Listen to guided tours in multiple languages including English, Hindi, Nepali, and Tibetan
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VirtualToursPage;