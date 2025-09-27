import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import InteractiveMap from "@/components/InteractiveMap";
import MonasteryGrid from "@/components/MonasteryGrid";
import Footer from "@/components/Footer";
import NewsUpdates from "@/components/NewsUpdates";
import EventsCalendar from "@/components/EventsCalendar";
import RegionalSections from "@/components/RegionalSections";
import Monastery360 from "@/components/Monastery360";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* 🔹 Fullscreen 360° monastery landing section */}
      <Monastery360 />

      {/* 🔹 Rest of landing page */}
      <Navigation />
      <main>
        <HeroSection />
        <NewsUpdates />
        <RegionalSections />
        <InteractiveMap />
        <EventsCalendar />
        <div id="monasteries">
          <MonasteryGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
