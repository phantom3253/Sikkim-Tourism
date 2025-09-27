import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw, Maximize, Eye, Info, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
  type: 'info' | 'navigation' | 'audio' | 'image';
  content?: string;
  audioUrl?: string;
  imageUrl?: string;
}

interface VirtualTour {
  id: string;
  title: string;
  monastery: string;
  description: string;
  panoramaUrl: string;
  hotspots: Hotspot[];
  audioNarration: {
    [language: string]: string;
  };
  vrSupported: boolean;
}

const sampleTour: VirtualTour = {
  id: 'rumtek-main-hall',
  title: 'Rumtek Monastery - Main Prayer Hall',
  monastery: 'Rumtek Monastery',
  description: 'Explore the magnificent main prayer hall of Rumtek Monastery, featuring intricate murals, ancient statues, and traditional Tibetan architecture.',
  panoramaUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  hotspots: [
    {
      id: 'altar',
      x: 50,
      y: 40,
      title: 'Golden Buddha Statue',
      description: 'A magnificent 16th-century golden Buddha statue, the centerpiece of the prayer hall.',
      type: 'info',
      content: 'This statue was brought from Tibet and represents Sakyamuni Buddha in the meditation pose.',
      imageUrl: 'https://images.unsplash.com/photo-1571892806085-bd5ca5e1e3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'murals',
      x: 20,
      y: 30,
      title: 'Ancient Murals',
      description: 'Centuries-old murals depicting scenes from Buddhist mythology.',
      type: 'image',
      content: 'These murals tell the story of Buddha\'s life and teachings through vibrant colors and intricate details.',
      imageUrl: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'prayer-wheels',
      x: 80,
      y: 60,
      title: 'Prayer Wheels',
      description: 'Traditional prayer wheels containing sacred mantras.',
      type: 'audio',
      content: 'Listen to the traditional mantras inscribed on these prayer wheels.',
      audioUrl: '/audio/om-mani-padme-hum.mp3'
    }
  ],
  audioNarration: {
    english: '/audio/rumtek-narration-en.mp3',
    hindi: '/audio/rumtek-narration-hi.mp3',
    nepali: '/audio/rumtek-narration-ne.mp3',
    tibetan: '/audio/rumtek-narration-bo.mp3'
  },
  vrSupported: true
};

interface VirtualTour360Props {
  tour?: VirtualTour;
}

const VirtualTour360 = ({ tour = sampleTour }: VirtualTour360Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

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

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  const resetView = () => {
    setRotation(0);
    setZoom(1);
  };

  const enterVRMode = () => {
    // This would integrate with WebXR API for VR support
    alert('VR mode would be activated here with WebXR API integration');
  };

  return (
    <div className="space-y-6">
      {/* Tour Info */}
      <Card className="monastery-card border-sacred-gold/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl text-monastery-brown">{tour.title}</CardTitle>
              <p className="text-monastery-brown-light mt-1">{tour.monastery}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-sacred-red text-spiritual-white">
                360° Tour
              </Badge>
              {tour.vrSupported && (
                <Badge className="bg-prayer-blue text-spiritual-white">
                  VR Ready
                </Badge>
              )}
            </div>
          </div>
          <p className="cultural-text mt-2">{tour.description}</p>
        </CardHeader>
      </Card>

      {/* 360° Viewer */}
      <Card className="monastery-card border-monastery-brown/20">
        <CardContent className="p-0">
          <div 
            ref={containerRef}
            className={`relative bg-black ${isFullscreen ? 'h-screen' : 'h-96 md:h-[32rem]'} rounded-lg overflow-hidden group`}
          >
            {/* Panoramic Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 cursor-move"
              style={{ 
                backgroundImage: `url(${tour.panoramaUrl})`,
                transform: `rotate(${rotation}deg) scale(${zoom})`
              }}
            >
              {/* Hotspots */}
              {tour.hotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  className="absolute w-8 h-8 bg-sacred-red rounded-full border-2 border-spiritual-white shadow-golden animate-pulse hover:animate-none hover:scale-125 transition-all duration-300"
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setSelectedHotspot(hotspot)}
                >
                  <Info className="w-4 h-4 text-spiritual-white m-auto" />
                </button>
              ))}
            </div>

            {/* Controls Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-auto">
                {/* Language Selector */}
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-40 bg-black/50 backdrop-blur-sm border-white/20 text-white">
                    <Languages className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">हिंदी</SelectItem>
                    <SelectItem value="nepali">नेपाली</SelectItem>
                    <SelectItem value="tibetan">བོད་ཡིག</SelectItem>
                  </SelectContent>
                </Select>

                {/* Top Right Controls */}
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={toggleFullscreen}
                    className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  >
                    <Maximize className="w-4 h-4" />
                  </Button>
                  {tour.vrSupported && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={enterVRMode}
                      className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                    >
                      <Eye className="w-4 h-4" />
                      VR
                    </Button>
                  )}
                </div>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-4 left-4 right-4 pointer-events-auto">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="flex items-center justify-between gap-4">
                    {/* Audio Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleAudio}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleMute}
                        className="text-white hover:bg-white/20"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                    </div>

                    {/* View Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-white text-sm">
                        <span>Zoom:</span>
                        <Slider
                          value={[zoom]}
                          onValueChange={([value]) => setZoom(value)}
                          min={0.5}
                          max={2}
                          step={0.1}
                          className="w-20"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetView}
                        className="text-white hover:bg-white/20"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Element */}
            <audio
              ref={audioRef}
              src={tour.audioNarration[selectedLanguage]}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              muted={isMuted}
            />
          </div>
        </CardContent>
      </Card>

      {/* Hotspot Details */}
      {selectedHotspot && (
        <Card className="monastery-card border-sacred-red/30">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-xl text-monastery-brown">
                {selectedHotspot.title}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedHotspot(null)}
                className="text-monastery-brown-light hover:text-monastery-brown"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="cultural-text mb-4">{selectedHotspot.description}</p>
            {selectedHotspot.content && (
              <p className="text-sm text-monastery-brown-light mb-4">{selectedHotspot.content}</p>
            )}
            {selectedHotspot.imageUrl && (
              <div 
                className="w-full h-48 bg-cover bg-center rounded-lg mb-4"
                style={{ backgroundImage: `url(${selectedHotspot.imageUrl})` }}
              />
            )}
            {selectedHotspot.audioUrl && selectedHotspot.type === 'audio' && (
              <audio controls className="w-full">
                <source src={selectedHotspot.audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </CardContent>
        </Card>
      )}

      {/* Navigation Hints */}
      <Card className="monastery-card border-monastery-brown/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-sacred-red/10 rounded-full flex items-center justify-center">
                <Info className="w-5 h-5 text-sacred-red" />
              </div>
              <p className="text-sm text-monastery-brown">Click red dots for detailed information</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-prayer-blue/10 rounded-full flex items-center justify-center">
                <Eye className="w-5 h-5 text-prayer-blue" />
              </div>
              <p className="text-sm text-monastery-brown">Drag to look around the space</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-sacred-gold/10 rounded-full flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-sacred-gold" />
              </div>
              <p className="text-sm text-monastery-brown">Enable audio for guided narration</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualTour360;