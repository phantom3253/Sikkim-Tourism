import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Globe, MapPin, Calendar, Users, Star, Share2, Heart, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MonasteryDetailProps {
  monastery: {
    id: number;
    name: string;
    location: string;
    sect: string;
    year: number;
    image: string;
    description: string;
    virtualTour: boolean;
    festival: string;
    rating: number;
    visitors: number;
  } | null;
  onBack: () => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'ne', name: 'नेपाली', flag: '🇳🇵' },
  { code: 'bo', name: 'བོད་ཡིག', flag: '🏔️' }
];

const MonasteryDetailPage = ({ monastery, onBack }: MonasteryDetailProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const galleryImages = [
    monastery?.image || '',
    'https://images.unsplash.com/photo-1571892806085-bd5ca5e1e3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589810411080-c6734f6a0fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  ];

  const audioNarrations = {
    en: '/api/placeholder/audio/monastery-narration-en.mp3',
    hi: '/api/placeholder/audio/monastery-narration-hi.mp3',
    ne: '/api/placeholder/audio/monastery-narration-ne.mp3',
    bo: '/api/placeholder/audio/monastery-narration-bo.mp3'
  };

  const descriptions = {
    en: monastery?.description || '',
    hi: 'यह मठ सिक्किम की समृद्ध बौद्ध विरासत का प्रतीक है, जो आध्यात्मिक शांति और सांस्कृतिक संरक्षण का केंद्र है।',
    ne: 'यो गुम्बा सिक्किमको समृद्ध बौद्ध सम्पदाको प्रतीक हो, जुन आध्यात्मिक शान्ति र सांस्कृतिक संरक्षणको केन्द्र हो।',
    bo: 'དགོན་པ་འདི་སི་ཀིམ་གྱི་ནང་པའི་དུས་རབས་ཀྱི་རིན་ཐང་ཅན་གྱི་རྟེན་ཁྱིམ་ཞིག་ཡིན།'
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioNarrations[selectedLanguage as keyof typeof audioNarrations];
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [selectedLanguage]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  if (!monastery) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={monastery.image}
          alt={monastery.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-monastery"></div>
        
        {/* Navigation */}
        <div className="absolute top-6 left-6 z-20">
          <Button
            variant="outline"
            onClick={onBack}
            className="bg-spiritual-white/10 backdrop-blur-sm border-spiritual-white/20 text-spiritual-white hover:bg-spiritual-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Monasteries
          </Button>
        </div>

        {/* Actions */}
        <div className="absolute top-6 right-6 flex gap-2 z-20">
          <Button
            variant="outline"
            onClick={() => setIsLiked(!isLiked)}
            className="bg-spiritual-white/10 backdrop-blur-sm border-spiritual-white/20 text-spiritual-white hover:bg-spiritual-white/20"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-sacred-red' : ''}`} />
          </Button>
          <Button
            variant="outline"
            className="bg-spiritual-white/10 backdrop-blur-sm border-spiritual-white/20 text-spiritual-white hover:bg-spiritual-white/20"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-spiritual-white">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-sacred-gold text-monastery-brown mb-4">
              {monastery.sect} Sect
            </Badge>
            <h1 className="text-4xl font-bold mb-4">{monastery.name}</h1>
            <div className="flex items-center gap-6 text-spiritual-white/90">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{monastery.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Founded {monastery.year}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current" />
                <span>{monastery.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="virtual-tour" disabled={!monastery.virtualTour}>
              360° Tour
            </TabsTrigger>
            <TabsTrigger value="visit">Visit Info</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Language Selection & Audio Controls */}
                <Card className="monastery-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Audio Narration</span>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant={isPlaying ? "default" : "outline"}
                          onClick={toggleAudio}
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          {isPlaying ? "Pause" : "Play"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={toggleMute}
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {languages.map((lang) => (
                        <Button
                          key={lang.code}
                          size="sm"
                          variant={selectedLanguage === lang.code ? "default" : "outline"}
                          onClick={() => setSelectedLanguage(lang.code)}
                          className="flex items-center gap-2"
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </Button>
                      ))}
                    </div>
                    <audio
                      ref={audioRef}
                      onEnded={() => setIsPlaying(false)}
                      className="w-full"
                      controls
                    />
                  </CardContent>
                </Card>

                {/* Description */}
                <Card className="monastery-card">
                  <CardHeader>
                    <CardTitle>History & Significance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="cultural-text leading-relaxed">
                      {descriptions[selectedLanguage as keyof typeof descriptions]}
                    </p>
                    <div className="mt-6 p-4 bg-sacred-gold/10 rounded-lg">
                      <h4 className="font-semibold text-monastery-brown mb-2">Did You Know?</h4>
                      <p className="text-sm cultural-text">
                        This monastery houses ancient manuscripts dating back over {2024 - monastery.year} years 
                        and features traditional architecture that has inspired generations of Buddhist practitioners.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Festival Information */}
                <Card className="monastery-card">
                  <CardHeader>
                    <CardTitle>Annual Festival</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-sacred-red/10 rounded-lg">
                        <Calendar className="w-6 h-6 text-sacred-red" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-monastery-brown">{monastery.festival}</h4>
                        <p className="text-sm text-monastery-brown-light">Annual celebration with traditional dances and ceremonies</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Festival Calendar
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Facts */}
                <Card className="monastery-card">
                  <CardHeader>
                    <CardTitle>Quick Facts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-monastery-brown-light">Founded:</span>
                      <span className="font-semibold">{monastery.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-monastery-brown-light">Sect:</span>
                      <span className="font-semibold">{monastery.sect}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-monastery-brown-light">Annual Visitors:</span>
                      <span className="font-semibold">{monastery.visitors}+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-monastery-brown-light">Virtual Tour:</span>
                      <span className="font-semibold">{monastery.virtualTour ? "Available" : "Coming Soon"}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Virtual Tour */}
                {monastery.virtualTour && (
                  <Card className="monastery-card">
                    <CardHeader>
                      <CardTitle>Virtual Experience</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative bg-gradient-monastery rounded-lg p-6 text-center text-spiritual-white">
                        <Globe className="w-12 h-12 mx-auto mb-4" />
                        <h4 className="font-semibold mb-2">360° Virtual Tour</h4>
                        <p className="text-sm mb-4">Explore the monastery from your home</p>
                        <Button className="bg-spiritual-white text-monastery-brown hover:bg-spiritual-white/90">
                          Start Tour
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="mt-8">
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative">
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={monastery.name}
                  className="w-full h-96 object-cover rounded-xl"
                />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <Button
                    variant="outline"
                    onClick={prevImage}
                    className="bg-spiritual-white/10 backdrop-blur-sm border-spiritual-white/20 text-spiritual-white hover:bg-spiritual-white/20"
                  >
                    ←
                  </Button>
                  <Button
                    variant="outline"
                    onClick={nextImage}
                    className="bg-spiritual-white/10 backdrop-blur-sm border-spiritual-white/20 text-spiritual-white hover:bg-spiritual-white/20"
                  >
                    →
                  </Button>
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-spiritual-white' : 'bg-spiritual-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative rounded-lg overflow-hidden ${
                      index === currentImageIndex ? 'ring-2 ring-sacred-red' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${monastery.name} ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="virtual-tour" className="mt-8">
            <Card className="monastery-card">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-monastery rounded-xl p-8 text-spiritual-white">
                  <Camera className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">360° Virtual Tour</h3>
                  <p className="mb-6">Immerse yourself in the sacred spaces of {monastery.name}</p>
                  <Button className="bg-spiritual-white text-monastery-brown hover:bg-spiritual-white/90">
                    Launch Virtual Tour
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visit" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="monastery-card">
                <CardHeader>
                  <CardTitle>Visiting Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Sunday:</span>
                      <span>6:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Prayer Times:</span>
                      <span>5:00 AM, 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Entry Fee:</span>
                      <span>Free</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="monastery-card">
                <CardHeader>
                  <CardTitle>How to Reach</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">From Gangtok:</h4>
                      <p className="text-sm text-monastery-brown-light">24 km, 45 minutes by taxi</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Nearest Airport:</h4>
                      <p className="text-sm text-monastery-brown-light">Bagdogra Airport (124 km)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold">Parking:</h4>
                      <p className="text-sm text-monastery-brown-light">Available on-site</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MonasteryDetailPage;