import { useState } from "react";
import { MapPin, Calendar, Users, Eye, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// Sample monastery data
const monasteries = [
  {
    id: 1,
    name: "Rumtek Monastery",
    location: "East Sikkim",
    sect: "Kagyu",
    year: 1740,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=8",
    description: "The most significant monastery of the Kagyu sect, known as the 'Dharma Chakra Centre'.",
    virtualTour: true,
    festival: "Guru Rinpoche's Birthday",
    rating: 4.8,
    visitors: 1250
  },
  {
    id: 2,
    name: "Pemayangtse Monastery",
    location: "West Sikkim",
    sect: "Nyingma",
    year: 1705,
    image: "https://t3.ftcdn.net/jpg/04/28/14/14/240_F_428141483_7USn9OKlvj2nXihXpD4kVKlproOjRtaO.jpg",
    description: "One of the oldest and most significant monasteries in Sikkim, 'Perfect Sublime Lotus'.",
    virtualTour: true,
    festival: "Chaam Dance Festival",
    rating: 4.7,
    visitors: 890
  },
  {
    id: 3,
    name: "Tashiding Monastery",
    location: "West Sikkim",
    sect: "Nyingma",
    year: 1641,
    image: "https://holidays.tripfactory.com/sikkim/wp-content/uploads/sites/18/2024/06/Best-time-to-Visit-Tashiding-Monastery.webp",
    description: "The heart of Sikkim, situated on a hilltop between the rivers Rathong and Rangeet.",
    virtualTour: false,
    festival: "Bumchu Festival",
    rating: 4.6,
    visitors: 650
  },
  {
    id: 4,
    name: "Enchey Monastery",
    location: "East Sikkim",
    sect: "Nyingma",
    year: 1909,
    image: "https://www.esikkimtourism.in/wp-content/uploads/2019/03/enchy-monasteryyy-bnnnr.jpg",
    description: "Built on the site blessed by Lama Drupthob Karpo, meaning 'Solitary Temple'.",
    virtualTour: true,
    festival: "Chaam Dance",
    rating: 4.5,
    visitors: 480
  },
  {
    id: 5,
    name: "Phensang Monastery",
    location: "North Sikkim",
    sect: "Nyingma",
    year: 1721,
    image: "https://d3sftlgbtusmnv.cloudfront.net/blog/wp-content/uploads/2024/08/Phensang-Monastery-Cover-Image-840x425.jpg",
    description: "A serene monastery in North Sikkim with breathtaking mountain views.",
    virtualTour: false,
    festival: "Losar Festival",
    rating: 4.4,
    visitors: 320
  },
  {
    id: 6,
    name: "Ralang Monastery",
    location: "South Sikkim",
    sect: "Kagyu",
    year: 1768,
    image: "https://1001things.org/wp-content/uploads/2019/09/Ralang12.jpg",
    description: "Known for its beautiful location and the sacred hot springs nearby.",
    virtualTour: true,
    festival: "Pang Lhabsol",
    rating: 4.3,
    visitors: 275
  }
];

const MonasteryGrid = () => {
  const [filter, setFilter] = useState("all");
  const [favoriteMonasteries, setFavoriteMonasteries] = useState<number[]>([]);

  const filteredMonasteries = monasteries.filter(monastery => {
    if (filter === "all") return true;
    if (filter === "virtual-tour") return monastery.virtualTour;
    if (filter === "sect") return monastery.sect === "Nyingma" || monastery.sect === "Kagyu";
    return monastery.location.toLowerCase().includes(filter);
  });

  const toggleFavorite = (id: number) => {
    setFavoriteMonasteries(prev => 
      prev.includes(id) 
        ? prev.filter(monasteryId => monasteryId !== id)
        : [...prev, id]
    );
  };

  const filterButtons = [
    { key: "all", label: "All Monasteries" },
    { key: "virtual-tour", label: "360° Tours" },
    { key: "east", label: "East Sikkim" },
    { key: "west", label: "West Sikkim" },
    { key: "north", label: "North Sikkim" },
    { key: "south", label: "South Sikkim" }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="monastery-title mb-4">
          Explore Sacred Monasteries
        </h2>
        <p className="cultural-text max-w-2xl mx-auto">
          Discover the spiritual heart of Sikkim through our collection of ancient Buddhist monasteries, 
          each with its unique history, architecture, and cultural significance.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filterButtons.map((button) => (
          <Button
            key={button.key}
            variant={filter === button.key ? "default" : "outline"}
            onClick={() => setFilter(button.key)}
            className={`
              transition-all duration-300 
              ${filter === button.key 
                ? 'bg-gradient-sunset text-spiritual-white shadow-golden' 
                : 'hover:bg-secondary/20 hover:border-secondary'
              }
            `}
          >
            {button.label}
          </Button>
        ))}
      </div>

      {/* Monastery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredMonasteries.map((monastery, index) => (
          <Card 
            key={monastery.id} 
            className="monastery-card group cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={monastery.image}
                  alt={monastery.name}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay with badges */}
                <div className="absolute inset-0 bg-gradient-monastery opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="bg-sacred-gold text-monastery-brown">
                    {monastery.sect}
                  </Badge>
                  {monastery.virtualTour && (
                    <Badge className="bg-prayer-blue text-spiritual-white">
                      360° Tour
                    </Badge>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(monastery.id);
                  }}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
                    favoriteMonasteries.includes(monastery.id)
                      ? 'bg-sacred-red text-spiritual-white'
                      : 'bg-spiritual-white/20 text-spiritual-white hover:bg-spiritual-white/30'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favoriteMonasteries.includes(monastery.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-monastery-brown group-hover:text-sacred-red transition-colors">
                  {monastery.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-secondary">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{monastery.rating}</span>
                </div>
              </div>

              <div className="flex items-center text-monastery-brown-light mb-3 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{monastery.location} • Founded {monastery.year}</span>
              </div>

              <p className="cultural-text text-sm mb-4 line-clamp-2">
                {monastery.description}
              </p>

              <div className="flex items-center justify-between text-sm text-monastery-brown-light">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{monastery.festival}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{monastery.visitors}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0">
              <Button 
                className="w-full bg-gradient-sunset hover:opacity-90 text-spiritual-white transition-all duration-300 group-hover:shadow-golden"
              >
                <Eye className="w-4 h-4 mr-2" />
                {monastery.virtualTour ? 'Start Virtual Tour' : 'View Details'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredMonasteries.length === 0 && (
        <div className="text-center py-12">
          <p className="cultural-text">No monasteries found for the selected filter.</p>
        </div>
      )}
    </section>
  );
};

export default MonasteryGrid;