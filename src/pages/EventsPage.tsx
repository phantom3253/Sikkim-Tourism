import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EventsCalendar from "@/components/EventsCalendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, MapPin, Bell } from "lucide-react";

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Header Section */}
        <section className="bg-gradient-spiritual py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="monastery-title mb-6">
              Events & Festivals Calendar
            </h1>
            <p className="cultural-text text-lg mb-8">
              Join spiritual celebrations, meditation sessions, and cultural events 
              happening across Sikkim's sacred monasteries. Experience the living 
              traditions of Buddhist heritage through festivals, rituals, and community gatherings.
            </p>
          </div>
        </section>

        {/* Event Types */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-monastery-brown mb-4">
                Types of Events
              </h2>
              <p className="cultural-text">
                Discover the variety of spiritual and cultural experiences available
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="monastery-card border-sacred-red/20 text-center group hover:border-sacred-red/40 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto bg-sacred-red/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-sacred-red/20 transition-colors">
                    <Bell className="w-6 h-6 text-sacred-red" />
                  </div>
                  <CardTitle className="text-monastery-brown">Festivals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="cultural-text text-sm">
                    Major Buddhist festivals like Losar, Saga Dawa, and regional celebrations with traditional ceremonies
                  </p>
                </CardContent>
              </Card>

              <Card className="monastery-card border-prayer-blue/20 text-center group hover:border-prayer-blue/40 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto bg-prayer-blue/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-prayer-blue/20 transition-colors">
                    <Users className="w-6 h-6 text-prayer-blue" />
                  </div>
                  <CardTitle className="text-monastery-brown">Meditation Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="cultural-text text-sm">
                    Daily and special meditation practices open to visitors seeking mindfulness and inner peace
                  </p>
                </CardContent>
              </Card>

              <Card className="monastery-card border-sacred-gold/20 text-center group hover:border-sacred-gold/40 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto bg-sacred-gold/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-sacred-gold/20 transition-colors">
                    <Calendar className="w-6 h-6 text-sacred-gold" />
                  </div>
                  <CardTitle className="text-monastery-brown">Cultural Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="cultural-text text-sm">
                    Heritage walks, traditional art workshops, and cultural performances showcasing Sikkimese traditions
                  </p>
                </CardContent>
              </Card>

              <Card className="monastery-card border-secondary/20 text-center group hover:border-secondary/40 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-secondary/20 transition-colors">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <CardTitle className="text-monastery-brown">Pilgrimages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="cultural-text text-sm">
                    Guided spiritual journeys to sacred sites and multi-monastery tours for deeper cultural immersion
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Calendar Component */}
        <EventsCalendar />

        {/* Event Guidelines */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-monastery-brown mb-4">
                Visitor Guidelines
              </h2>
              <p className="cultural-text">
                Respectful participation in monastery events and festivals
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="monastery-card border-monastery-brown/20">
                <CardHeader>
                  <CardTitle className="text-monastery-brown">Dress Code & Etiquette</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-sacred-red rounded-full mt-2 flex-shrink-0"></div>
                    <p className="cultural-text text-sm">Wear modest, conservative clothing covering shoulders and legs</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-sacred-red rounded-full mt-2 flex-shrink-0"></div>
                    <p className="cultural-text text-sm">Remove shoes and hats before entering prayer halls</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-sacred-red rounded-full mt-2 flex-shrink-0"></div>
                    <p className="cultural-text text-sm">Maintain silence during meditation and prayer sessions</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-sacred-red rounded-full mt-2 flex-shrink-0"></div>
                    <p className="cultural-text text-sm">Follow photography restrictions as indicated by monastery staff</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="monastery-card border-monastery-brown/20">
                <CardHeader>
                  <CardTitle className="text-monastery-brown">Participation & Registration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-prayer-blue rounded-full mt-2 flex-shrink-0"></div>
                    <p className="cultural-text text-sm">Register in advance for special events and meditation retreats</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-prayer-blue rounded-full mt-2 flex-shrink-0"></div>
                    <p className="cultural-text text-sm">Arrive 15-30 minutes early for festival ceremonies</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-prayer-blue rounded-full mt-2 flex-shrink-0"></div>
                    <p className="cultural-text text-sm">Donations are welcome but not mandatory for participation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-prayer-blue rounded-full mt-2 flex-shrink-0"></div>
                    <p className="cultural-text text-sm">Join guided tours for better understanding of rituals and traditions</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-sacred-gold/20 text-center">
              <p className="cultural-text">
                <strong>Special Note:</strong> Festival dates may vary based on the lunar calendar. 
                We recommend checking our calendar regularly and registering your interest 
                to receive notifications about upcoming events and any schedule changes.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EventsPage;