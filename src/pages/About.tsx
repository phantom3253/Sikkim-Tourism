import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Users, Heart, Globe, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-spiritual py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="monastery-title mb-6">
              Preserving Sikkim's Spiritual Heritage
            </h1>
            <p className="cultural-text text-lg leading-relaxed">
              Monastery360 is a digital heritage platform dedicated to preserving and sharing the sacred Buddhist 
              monasteries of Sikkim. Through immersive 360° virtual tours, cultural archives, and storytelling, 
              we bridge the gap between ancient wisdom and modern technology.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-monastery-brown mb-6">Our Mission</h2>
              <p className="cultural-text mb-6">
                To digitally preserve Sikkim's monastic heritage while making it accessible to people worldwide. 
                We believe that ancient wisdom and cultural treasures should be preserved for future generations 
                while remaining alive and relevant in our modern world.
              </p>
              <p className="cultural-text">
                Through cutting-edge technology and respectful documentation, we create immersive experiences 
                that honor the spiritual significance of these sacred spaces while educating visitors about 
                Buddhist culture, history, and practices.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-64 bg-gradient-monastery rounded-xl spiritual-glow"></div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-monastery-brown mb-12">
            How We Preserve Heritage
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="monastery-card text-center">
              <CardHeader>
                <Camera className="w-12 h-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-monastery-brown">360° Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="cultural-text text-sm">
                  High-resolution 360° photography and virtual reality technology to create immersive monastery experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="monastery-card text-center">
              <CardHeader>
                <Globe className="w-12 h-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-monastery-brown">Digital Archives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="cultural-text text-sm">
                  Digitizing manuscripts, murals, and artifacts to preserve cultural knowledge for future generations.
                </p>
              </CardContent>
            </Card>

            <Card className="monastery-card text-center">
              <CardHeader>
                <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-monastery-brown">Community Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="cultural-text text-sm">
                  Working closely with monks, local communities, and cultural experts to ensure authentic representation.
                </p>
              </CardContent>
            </Card>

            <Card className="monastery-card text-center">
              <CardHeader>
                <Heart className="w-12 h-12 text-secondary mx-auto mb-4" />
                <CardTitle className="text-monastery-brown">Cultural Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="cultural-text text-sm">
                  Educational content that promotes understanding of Buddhist philosophy, traditions, and practices.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-monastery-brown mb-12">
            Our Collaborative Approach
          </h2>
          
          <div className="space-y-8">
            <Card className="monastery-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-sacred-red mb-4">Monastic Partnership</h3>
                <p className="cultural-text">
                  We work directly with the monastic communities to ensure that our documentation respects 
                  sacred spaces and accurately represents the spiritual significance of each monastery. 
                  Monks and spiritual leaders guide our work to maintain authenticity and reverence.
                </p>
              </CardContent>
            </Card>

            <Card className="monastery-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-sacred-red mb-4">Technology & Heritage</h3>
                <p className="cultural-text">
                  Our team combines cutting-edge technology with deep respect for cultural heritage. 
                  We use advanced 360° cameras, 3D scanning, and virtual reality to create immersive 
                  experiences while preserving the spiritual essence of these sacred spaces.
                </p>
              </CardContent>
            </Card>

            <Card className="monastery-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-sacred-red mb-4">Community Impact</h3>
                <p className="cultural-text">
                  Beyond digital preservation, we aim to support local communities through responsible 
                  tourism promotion, cultural education, and economic opportunities that respect and 
                  preserve the sacred nature of these heritage sites.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;