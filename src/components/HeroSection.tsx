import { ArrowDown, Play, MapPin, Volume2, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play failed, which is expected in many browsers
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="hero-section">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/api/placeholder/1920/1080"
        >
          <source src="/api/placeholder/video/sikkim-hero.mp4" type="video/mp4" />
          {/* Fallback to image if video fails */}
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
          />
        </video>
        <div className="absolute inset-0 bg-gradient-monastery"></div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        <button
          onClick={togglePlay}
          className="p-3 bg-spiritual-white/10 backdrop-blur-sm border border-spiritual-white/20 rounded-full text-spiritual-white hover:bg-spiritual-white/20 transition-all duration-300"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-3 bg-spiritual-white/10 backdrop-blur-sm border border-spiritual-white/20 rounded-full text-spiritual-white hover:bg-spiritual-white/20 transition-all duration-300"
        >
          <Volume2 className={`w-4 h-4 ${isMuted ? 'opacity-50' : ''}`} />
        </button>
      </div>
      
      {/* Floating Prayer Flags Animation */}
      <div className="absolute top-20 left-10 w-16 h-2 bg-gradient-sunset opacity-70 animate-float"></div>
      <div className="absolute top-32 right-20 w-12 h-2 bg-secondary opacity-60 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-28 left-1/3 w-10 h-2 bg-accent opacity-50 animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-spiritual-white mb-6 leading-tight">
            Experience Sikkim's
            <span className="block bg-gradient-sunset bg-clip-text text-transparent">
              Spiritual Heritage
            </span>
            <span className="block text-3xl sm:text-5xl lg:text-6xl">in 360°</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-spiritual-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in ancient Buddhist monasteries through virtual tours, 
            cultural archives, and spiritual experiences in the heart of the Himalayas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-sunset hover:opacity-90 text-spiritual-white px-8 py-3 text-lg font-semibold shadow-golden transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('regions-map')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Explore Regions
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-spiritual-white/30 text-spiritual-white hover:bg-spiritual-white/10 px-8 py-3 text-lg backdrop-blur-sm"
              onClick={() => document.getElementById('monasteries')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="w-5 h-5 mr-2" />
              Virtual Tours
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-spiritual-white/80">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">15+</div>
              <div className="text-sm uppercase tracking-wide">Sacred Monasteries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">360°</div>
              <div className="text-sm uppercase tracking-wide">Virtual Tours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">1000+</div>
              <div className="text-sm uppercase tracking-wide">Years of Heritage</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-glow">
          <ArrowDown className="w-6 h-6 text-spiritual-white/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;