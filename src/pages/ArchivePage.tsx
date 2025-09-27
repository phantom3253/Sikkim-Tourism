import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import DigitalArchive from "@/components/DigitalArchive";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scroll, Image as ImageIcon, BookOpen, Zap } from "lucide-react";

const ArchivePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Header Section */}
        <section className="bg-gradient-spiritual py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="monastery-title mb-6">
              Digital Heritage Archive
            </h1>
            <p className="cultural-text text-lg mb-8">
              Explore our digitized collection of rare manuscripts, ancient murals, 
              historical documents, and traditional artworks from Sikkim's monasteries. 
              Each artifact is carefully preserved with high-resolution imaging and detailed metadata.
            </p>
          </div>
        </section>

        {/* Archive Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-monastery-brown mb-4">
                Archive Features
              </h2>
              <p className="cultural-text">
                Advanced digital preservation meets accessible cultural heritage
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="monastery-card border-sacred-red/20 text-center">
                <CardHeader>
                  <ImageIcon className="w-10 h-10 mx-auto text-sacred-red mb-2" />
                  <CardTitle className="text-monastery-brown">High-Resolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="cultural-text text-sm">
                    Ultra-high resolution images with zoom capabilities up to 300% for detailed examination
                  </p>
                </CardContent>
              </Card>

              <Card className="monastery-card border-prayer-blue/20 text-center">
                <CardHeader>
                  <BookOpen className="w-10 h-10 mx-auto text-prayer-blue mb-2" />
                  <CardTitle className="text-monastery-brown">Rich Metadata</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="cultural-text text-sm">
                    Comprehensive information including provenance, materials, and conservation status
                  </p>
                </CardContent>
              </Card>

              <Card className="monastery-card border-sacred-gold/20 text-center">
                <CardHeader>
                  <Scroll className="w-10 h-10 mx-auto text-sacred-gold mb-2" />
                  <CardTitle className="text-monastery-brown">Multi-Format</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="cultural-text text-sm">
                    Manuscripts, murals, documents, and artworks from multiple centuries and traditions
                  </p>
                </CardContent>
              </Card>

              <Card className="monastery-card border-secondary/20 text-center">
                <CardHeader>
                  <Zap className="w-10 h-10 mx-auto text-secondary mb-2" />
                  <CardTitle className="text-monastery-brown">Advanced Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="cultural-text text-sm">
                    Filter by type, monastery, century, language, and condition with instant results
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Archive Component */}
        <DigitalArchive />

        {/* Conservation Information */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-subtle">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-monastery-brown mb-8">
              Digital Preservation Initiative
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-sacred-red mb-2">150+</div>
                <div className="text-monastery-brown font-medium mb-2">Artifacts Digitized</div>
                <p className="cultural-text text-sm">
                  Rare manuscripts, murals, and documents from across Sikkim's monasteries
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-prayer-blue mb-2">12</div>
                <div className="text-monastery-brown font-medium mb-2">Monasteries Covered</div>
                <p className="cultural-text text-sm">
                  Comprehensive coverage of major Buddhist monasteries in all four regions
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-sacred-gold mb-2">800+</div>
                <div className="text-monastery-brown font-medium mb-2">Years of History</div>
                <p className="cultural-text text-sm">
                  Artifacts spanning from the 12th century to modern times
                </p>
              </div>
            </div>
            
            <div className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-monastery-brown/20">
              <p className="cultural-text">
                Our digital preservation project aims to safeguard Sikkim's invaluable Buddhist heritage 
                for future generations. Each artifact is meticulously photographed using state-of-the-art 
                equipment and catalogued with scholarly precision to ensure cultural knowledge remains 
                accessible to researchers, devotees, and curious minds worldwide.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ArchivePage;