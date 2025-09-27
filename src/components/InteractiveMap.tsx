import { useState } from "react";
import { MapPin, Camera, Mountain, TreePine, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Region {
  id: string;
  name: string;
  title: string;
  description: string;
  attractions: Array<{
    name: string;
    type: 'monastery' | 'nature' | 'adventure' | 'culture';
    rating: number;
    image: string;
  }>;
  coordinates: { top: string; left: string };
}

const regions: Region[] = [
  {
    id: 'north',
    name: 'North Sikkim',
    title: 'Land of High Altitude Wonders',
    description: 'Experience the majestic Himalayan peaks, pristine lakes, and ancient monasteries in the land of eternal snow.',
    coordinates: { top: '15%', left: '45%' },
    attractions: [
      {
        name: 'Gurudongmar Lake',
        type: 'nature',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Lachen Monastery',
        type: 'monastery',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Zero Point',
        type: 'adventure',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1464822759844-d150ad6d1904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'east',
    name: 'East Sikkim',
    title: 'Gateway to Spiritual Heritage',
    description: 'Home to Gangtok and magnificent monasteries, offering perfect blend of urban culture and spiritual tranquility.',
    coordinates: { top: '35%', left: '65%' },
    attractions: [
      {
        name: 'Rumtek Monastery',
        type: 'monastery',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Tsomgo Lake',
        type: 'nature',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Enchey Monastery',
        type: 'monastery',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1571892806085-bd5ca5e1e3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'west',
    name: 'West Sikkim',
    title: 'Ancient Heritage & Natural Beauty',
    description: 'Discover historic monasteries, sacred lakes, and the cultural heart of Sikkim in this mystical region.',
    coordinates: { top: '45%', left: '25%' },
    attractions: [
      {
        name: 'Pemayangtse Monastery',
        type: 'monastery',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1571892806085-bd5ca5e1e3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Khecheopalri Lake',
        type: 'nature',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Tashiding Monastery',
        type: 'monastery',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1589810411080-c6734f6a0fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'south',
    name: 'South Sikkim',
    title: 'Cultural Heritage & Adventures',
    description: 'Experience rich cultural traditions, historic temples, and thrilling adventures in the southern valleys.',
    coordinates: { top: '65%', left: '45%' },
    attractions: [
      {
        name: 'Ralang Monastery',
        type: 'monastery',
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Namchi',
        type: 'culture',
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      },
      {
        name: 'Ravangla',
        type: 'nature',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];

const InteractiveMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'monastery':
        return <Star className="w-4 h-4" />;
      case 'nature':
        return <Mountain className="w-4 h-4" />;
      case 'adventure':
        return <TreePine className="w-4 h-4" />;
      case 'culture':
        return <Camera className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'monastery':
        return 'bg-sacred-red text-spiritual-white';
      case 'nature':
        return 'bg-prayer-blue text-spiritual-white';
      case 'adventure':
        return 'bg-secondary text-spiritual-white';
      case 'culture':
        return 'bg-sacred-gold text-monastery-brown';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="regions-map" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="monastery-title mb-4">
            Explore Sikkim by Regions
          </h2>
          <p className="cultural-text max-w-2xl mx-auto">
            Click on any region to discover its unique monasteries, natural wonders, 
            cultural experiences, and adventure activities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Map */}
          <div className="relative">
            <div 
              className="relative w-full h-96 bg-gradient-monastery rounded-2xl shadow-golden overflow-hidden"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1464822759844-d150ad6d1904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-monastery-brown/30"></div>
              
              {/* Region Markers */}
              {regions.map((region) => (
                <button
                  key={region.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 ${
                    selectedRegion?.id === region.id
                      ? 'bg-sacred-red shadow-golden scale-110'
                      : 'bg-spiritual-white/20 backdrop-blur-sm hover:bg-spiritual-white/30 hover:scale-105'
                  }`}
                  style={{ top: region.coordinates.top, left: region.coordinates.left }}
                  onClick={() => setSelectedRegion(selectedRegion?.id === region.id ? null : region)}
                >
                  <MapPin className={`w-5 h-5 ${
                    selectedRegion?.id === region.id ? 'text-spiritual-white' : 'text-monastery-brown'
                  }`} />
                  <div className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-semibold ${
                    selectedRegion?.id === region.id ? 'text-sacred-red' : 'text-monastery-brown'
                  }`}>
                    {region.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Region Details */}
          <div className="space-y-6">
            {selectedRegion ? (
              <Card className="monastery-card border-sacred-gold/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-monastery-brown">
                    {selectedRegion.title}
                  </CardTitle>
                  <p className="cultural-text">{selectedRegion.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-monastery-brown mb-3">Top Attractions:</h4>
                    <div className="grid gap-3">
                      {selectedRegion.attractions.map((attraction, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-spiritual-white/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${getTypeBadgeColor(attraction.type)}`}>
                              {getTypeIcon(attraction.type)}
                            </div>
                            <div>
                              <div className="font-medium text-monastery-brown">{attraction.name}</div>
                              <div className="flex items-center gap-1 text-sm text-monastery-brown-light">
                                <Star className="w-3 h-3 fill-current" />
                                <span>{attraction.rating}</span>
                              </div>
                            </div>
                          </div>
                          <Badge className={getTypeBadgeColor(attraction.type)}>
                            {attraction.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-gradient-sunset text-spiritual-white">
                      Explore {selectedRegion.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="monastery-card border-monastery-brown/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-4 text-monastery-brown-light" />
                    <h3 className="text-xl font-semibold text-monastery-brown mb-2">
                      Select a Region
                    </h3>
                    <p className="cultural-text">
                      Click on any region marker on the map to discover its unique attractions, 
                      monasteries, and cultural experiences.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;