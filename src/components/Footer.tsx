import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-monastery-brown text-spiritual-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-sunset flex items-center justify-center prayer-wheel">
                <span className="text-spiritual-white text-lg">☸</span>
              </div>
              <span className="text-2xl font-bold">Monastery360</span>
            </div>
            <p className="text-spiritual-white/80 mb-6 max-w-md leading-relaxed">
              Preserving Sikkim's spiritual heritage through immersive 360° virtual tours, 
              cultural archives, and digital storytelling. Experience ancient wisdom in the modern world.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-spiritual-white hover:bg-spiritual-white/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-spiritual-white hover:bg-spiritual-white/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-spiritual-white hover:bg-spiritual-white/10">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-sacred-gold">Explore</h3>
            <ul className="space-y-3">
              <li>
                <a href="/monasteries" className="text-spiritual-white/80 hover:text-sacred-gold transition-colors">
                  Monasteries
                </a>
              </li>
              <li>
                <a href="/archives" className="text-spiritual-white/80 hover:text-sacred-gold transition-colors">
                  Cultural Archives
                </a>
              </li>
              <li>
                <a href="/experiences" className="text-spiritual-white/80 hover:text-sacred-gold transition-colors">
                  Festivals & Events
                </a>
              </li>
              <li>
                <a href="/travel" className="text-spiritual-white/80 hover:text-sacred-gold transition-colors">
                  Travel Guide
                </a>
              </li>
              <li>
                <a href="/stories" className="text-spiritual-white/80 hover:text-sacred-gold transition-colors">
                  Stories & Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-sacred-gold">Connect</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-sacred-gold" />
                <span className="text-spiritual-white/80 text-sm">Gangtok, Sikkim, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-sacred-gold" />
                <span className="text-spiritual-white/80 text-sm">info@monastery360.org</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-sacred-gold" />
                <span className="text-spiritual-white/80 text-sm">+91 98765 43210</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3 text-sacred-gold">Languages</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-spiritual-white/10 rounded text-xs">English</span>
                <span className="px-2 py-1 bg-spiritual-white/10 rounded text-xs">Hindi</span>
                <span className="px-2 py-1 bg-spiritual-white/10 rounded text-xs">Nepali</span>
                <span className="px-2 py-1 bg-spiritual-white/10 rounded text-xs">Tibetan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-spiritual-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-spiritual-white/60 text-sm">
              © 2024 Monastery360. Preserving heritage with reverence and respect.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-spiritual-white/60 hover:text-sacred-gold text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-spiritual-white/60 hover:text-sacred-gold text-sm transition-colors">
                Terms of Use
              </a>
              <a href="/about" className="text-spiritual-white/60 hover:text-sacred-gold text-sm transition-colors">
                About Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;