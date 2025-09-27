import Navigation from "@/components/Navigation";
import MonasteryGrid from "@/components/MonasteryGrid";
import Footer from "@/components/Footer";
import { Search, Filter, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Monasteries = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Header Section */}
        <section className="bg-gradient-spiritual py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="monastery-title mb-6">
              Sacred Monasteries of Sikkim
            </h1>
            <p className="cultural-text text-lg mb-8">
              Discover ancient Buddhist heritage through our comprehensive collection of Sikkim's most sacred monasteries. 
              Each monastery tells a unique story of faith, culture, and architectural mastery.
            </p>
            
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-monastery-brown-light w-4 h-4" />
                <Input 
                  placeholder="Search monasteries by name, location, or sect..."
                  className="pl-10 py-3 border-monastery-brown/20 focus:border-secondary"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Map className="w-4 h-4" />
                Map View
              </Button>
            </div>
          </div>
        </section>

        {/* Monastery Grid */}
        <MonasteryGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Monasteries;