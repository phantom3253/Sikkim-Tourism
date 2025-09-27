import { useState } from "react";
import { Calendar as CalendarIcon, MapPin, Clock, Filter, Star, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  monastery: string;
  category: 'festival' | 'ritual' | 'meditation' | 'cultural' | 'pilgrimage';
  description: string;
  duration: string;
  participants?: number;
  image: string;
  isHighlighted: boolean;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Losar Festival',
    date: new Date(2024, 2, 15), // March 15, 2024
    time: '06:00 AM',
    location: 'Rumtek Monastery',
    monastery: 'Rumtek',
    category: 'festival',
    description: 'Tibetan New Year celebrations with traditional dances, prayers, and cultural performances',
    duration: '3 days',
    participants: 500,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isHighlighted: true
  },
  {
    id: '2',
    title: 'Morning Meditation Session',
    date: new Date(2024, 2, 20), // March 20, 2024
    time: '05:30 AM',
    location: 'Enchey Monastery',
    monastery: 'Enchey',
    category: 'meditation',
    description: 'Daily meditation practice open to visitors seeking inner peace and mindfulness',
    duration: '2 hours',
    participants: 30,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isHighlighted: false
  },
  {
    id: '3',
    title: 'Saga Dawa Festival',
    date: new Date(2024, 4, 22), // May 22, 2024
    time: '04:00 AM',
    location: 'Pemayangtse Monastery',
    monastery: 'Pemayangtse',
    category: 'festival',
    description: 'Celebrating Buddha\'s birth, enlightenment, and death with special prayers and offerings',
    duration: '1 day',
    participants: 800,
    image: 'https://images.unsplash.com/photo-1571892806085-bd5ca5e1e3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isHighlighted: true
  },
  {
    id: '4',
    title: 'Heritage Walk',
    date: new Date(2024, 2, 25), // March 25, 2024
    time: '09:00 AM',
    location: 'Tashiding Monastery',
    monastery: 'Tashiding',
    category: 'cultural',
    description: 'Guided tour exploring monastery architecture, ancient murals, and historical artifacts',
    duration: '4 hours',
    participants: 50,
    image: 'https://images.unsplash.com/photo-1589810411080-c6734f6a0fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isHighlighted: false
  },
  {
    id: '5',
    title: 'Pilgrimage to Sacred Sites',
    date: new Date(2024, 3, 10), // April 10, 2024
    time: '07:00 AM',
    location: 'Multiple Monasteries',
    monastery: 'Various',
    category: 'pilgrimage',
    description: 'Spiritual journey covering multiple sacred sites in West Sikkim region',
    duration: '2 days',
    participants: 100,
    image: 'https://images.unsplash.com/photo-1464822759844-d150ad6d1904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isHighlighted: false
  }
];

const EventsCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  const filteredEvents = events.filter(event => {
    const categoryMatch = selectedCategory === "all" || event.category === selectedCategory;
    const regionMatch = selectedRegion === "all" || event.monastery.toLowerCase().includes(selectedRegion.toLowerCase());
    return categoryMatch && regionMatch;
  });

  const eventsForSelectedDate = filteredEvents.filter(event => 
    selectedDate && 
    event.date.toDateString() === selectedDate.toDateString()
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'festival':
        return 'bg-sacred-red text-spiritual-white';
      case 'ritual':
        return 'bg-prayer-blue text-spiritual-white';
      case 'meditation':
        return 'bg-sacred-gold text-monastery-brown';
      case 'cultural':
        return 'bg-secondary text-monastery-brown';
      case 'pilgrimage':
        return 'bg-monastery-brown text-spiritual-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const hasEventOnDate = (date: Date) => {
    return filteredEvents.some(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="monastery-title mb-4">
            Events & Festivals Calendar
          </h2>
          <p className="cultural-text max-w-2xl mx-auto">
            Join spiritual celebrations, meditation sessions, and cultural events 
            happening across Sikkim's sacred monasteries throughout the year.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar and Filters */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="monastery-card border-sacred-gold/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-monastery-brown">
                  <CalendarIcon className="w-5 h-5" />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="w-full"
                  modifiers={{
                    hasEvent: (date) => hasEventOnDate(date)
                  }}
                  modifiersClassNames={{
                    hasEvent: "bg-sacred-red/20 text-sacred-red font-bold"
                  }}
                />
              </CardContent>
            </Card>

            {/* Filters */}
            <Card className="monastery-card border-monastery-brown/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-monastery-brown">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-monastery-brown mb-2 block">
                    Category
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="festival">Festivals</SelectItem>
                      <SelectItem value="ritual">Rituals</SelectItem>
                      <SelectItem value="meditation">Meditation</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="pilgrimage">Pilgrimage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-monastery-brown mb-2 block">
                    Region
                  </label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Regions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Regions</SelectItem>
                      <SelectItem value="rumtek">East Sikkim</SelectItem>
                      <SelectItem value="pemayangtse">West Sikkim</SelectItem>
                      <SelectItem value="lachen">North Sikkim</SelectItem>
                      <SelectItem value="ralang">South Sikkim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <div className="lg:col-span-2 space-y-4">
            {selectedDate && eventsForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-monastery-brown">
                  Events on {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                {eventsForSelectedDate.map((event) => (
                  <Card key={event.id} className={`monastery-card ${event.isHighlighted ? 'border-sacred-red' : 'border-monastery-brown/20'}`}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div 
                          className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url(${event.image})` }}
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-monastery-brown text-lg">
                                {event.title}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-monastery-brown-light mt-1">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {event.time}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {event.location}
                                </div>
                              </div>
                            </div>
                            <Badge className={getCategoryColor(event.category)}>
                              {event.category}
                            </Badge>
                          </div>
                          
                          <p className="cultural-text text-sm mb-3">{event.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-monastery-brown-light">
                              <span>Duration: {event.duration}</span>
                              {event.participants && (
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {event.participants} participants
                                </div>
                              )}
                            </div>
                            <Button size="sm" className="bg-gradient-sunset text-spiritual-white">
                              Learn More
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-monastery-brown">Upcoming Events</h3>
                {filteredEvents.slice(0, 4).map((event) => (
                  <Card key={event.id} className={`monastery-card ${event.isHighlighted ? 'border-sacred-red' : 'border-monastery-brown/20'}`}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div 
                          className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0"
                          style={{ backgroundImage: `url(${event.image})` }}
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-monastery-brown text-lg">
                                {event.title}
                              </h4>
                              <div className="flex items-center gap-4 text-sm text-monastery-brown-light mt-1">
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="w-3 h-3" />
                                  {event.date.toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {event.time}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {event.location}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {event.isHighlighted && (
                                <Badge className="bg-sacred-red text-spiritual-white">
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                              <Badge className={getCategoryColor(event.category)}>
                                {event.category}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="cultural-text text-sm mb-3">{event.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-monastery-brown-light">
                              <span>Duration: {event.duration}</span>
                              {event.participants && (
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {event.participants} expected
                                </div>
                              )}
                            </div>
                            <Button size="sm" className="bg-gradient-sunset text-spiritual-white">
                              Register Interest
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsCalendar;