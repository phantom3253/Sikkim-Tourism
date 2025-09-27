import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, Camera, Mountain, Star } from "lucide-react";

const regions = [
  {
    id: 'north',
    name: 'North Sikkim',
    title: 'Land of High Altitude Wonders',
    description: 'Explore pristine lakes, snow-capped peaks, and ancient monasteries at breathtaking altitudes.',
    image: 'https://images.unsplash.com/photo-1464822759844-d150ad6d1904?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    highlights: ['Gurudongmar Lake', 'Lachen Monastery', 'Zero Point', 'Thangu Valley'],
    color: 'from-blue-600/80 to-purple-600/80'
  },
  {
    id: 'east',
    name: 'East Sikkim',
    title: 'Gateway to Spiritual Heritage',
    description: 'Discover Gangtok\'s urban charm alongside magnificent monasteries and sacred lakes.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    highlights: ['Rumtek Monastery', 'Tsomgo Lake', 'Enchey Monastery', 'Hanuman Tok'],
    color: 'from-red-600/80 to-orange-600/80'
  },
  {
    id: 'west',
    name: 'West Sikkim',
    title: 'Ancient Heritage & Natural Beauty',
    description: 'Journey through historic monasteries, sacred lakes, and the cultural heart of Sikkim.',
    image: 'https://images.unsplash.com/photo-1571892806085-bd5ca5e1e3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    highlights: ['Pemayangtse Monastery', 'Khecheopalri Lake', 'Tashiding Monastery', 'Yuksom'],
    color: 'from-green-600/80 to-teal-600/80'
  },
  {
    id: 'south',
    name: 'South Sikkim',
    title: 'Cultural Heritage & Adventures',
    description: 'Experience rich traditions, historic temples, and thrilling adventures in southern valleys.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    highlights: ['Ralang Monastery', 'Namchi', 'Ravangla', 'Tendong Hill'],
    color: 'from-yellow-600/80 to-red-600/80'
  }
];

const RegionalSections = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="monastery-title mb-4">
            Discover Sikkim by Regions
          </h2>
          <p className="cultural-text max-w-3xl mx-auto">
            From the towering peaks of North Sikkim to the cultural valleys of the South, 
            each region offers unique spiritual experiences and breathtaking natural beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regions.map((region, index) => (
            <Card 
              key={region.id} 
              className="monastery-card border-none overflow-hidden group cursor-pointer"
            >
              <CardContent className="p-0">
                <div className="relative h-80 overflow-hidden">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${region.image})` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${region.color} opacity-70`} />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <div className="transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                      <h3 className="text-2xl font-bold mb-2">{region.name}</h3>
                      <p className="text-lg font-medium mb-2 opacity-90">{region.title}</p>
                      <p className="text-sm opacity-80 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                        {region.description}
                      </p>
                      
                      {/* Highlights - Shown on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-4">
                        <div className="flex flex-wrap gap-2">
                          {region.highlights.slice(0, 3).map((highlight, idx) => (
                            <span 
                              key={idx}
                              className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full"
                            >
                              {highlight}
                            </span>
                          ))}
                          {region.highlights.length > 3 && (
                            <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                              +{region.highlights.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group-hover:translate-x-1"
                        onClick={() => document.getElementById('regions-map')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        Explore Region
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Corner Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-2">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-white/50 backdrop-blur-sm rounded-full px-8 py-4 border border-sacred-gold/20">
            <Camera className="w-5 h-5 text-sacred-red" />
            <span className="text-monastery-brown font-medium">Ready to explore?</span>
            <Button 
              className="bg-gradient-sunset text-spiritual-white hover:opacity-90"
              onClick={() => document.getElementById('regions-map')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Mountain className="w-4 h-4 mr-2" />
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionalSections;