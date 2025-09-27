import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, MapPin, Archive, Calendar, Compass, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Home", href: "/", icon: Compass },
  { name: "Explore Monasteries", href: "/monasteries", icon: MapPin },
  { name: "Stories & Blogs", href: "/blog", icon: BookOpen },
  { name: "About", href: "/about", icon: Users },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-spiritual-white/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold monastery-title"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-sunset flex items-center justify-center prayer-wheel">
              <span className="text-spiritual-white text-sm">☸</span>
            </div>
            <span>Monastery360</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "nav-link flex items-center space-x-2 text-sm font-medium",
                    isActive && "active"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-monastery-brown hover:bg-secondary/20"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-spiritual-white border-t border-border animate-fade-in-up">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "nav-link flex items-center space-x-3 text-base font-medium px-3 py-2 rounded-md",
                    isActive && "active bg-secondary/10"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;