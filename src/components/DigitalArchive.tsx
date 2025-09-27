import { useState } from "react";
import { Search, Filter, ZoomIn, ZoomOut, Download, BookOpen, Scroll, Image as ImageIcon, Languages, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ArchiveItem {
  id: string;
  title: string;
  type: 'manuscript' | 'mural' | 'document' | 'artwork';
  language: string;
  century: string;
  monastery: string;
  description: string;
  imageUrl: string;
  highResUrl: string;
  metadata: {
    dimensions: string;
    material: string;
    condition: string;
    digitizedDate: string;
    conservationStatus: 'excellent' | 'good' | 'fair' | 'needs-attention';
  };
  translations?: {
    [language: string]: {
      title: string;
      description: string;
    };
  };
}

const archiveItems: ArchiveItem[] = [
  {
    id: '1',
    title: 'Lotus Sutra Manuscript',
    type: 'manuscript',
    language: 'Tibetan',
    century: '15th Century',
    monastery: 'Rumtek Monastery',
    description: 'Ancient Tibetan manuscript of the Lotus Sutra, one of the most important texts in Mahayana Buddhism. Features gold leaf illuminations and traditional calligraphy.',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highResUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90',
    metadata: {
      dimensions: '42 x 15 cm',
      material: 'Palm leaf, gold leaf',
      condition: 'Good',
      digitizedDate: '2023-08-15',
      conservationStatus: 'good'
    },
    translations: {
      english: {
        title: 'Lotus Sutra Manuscript',
        description: 'Ancient Tibetan manuscript of the Lotus Sutra with gold illuminations.'
      },
      hindi: {
        title: 'पद्म सूत्र हस्तलिपि',
        description: 'स्वर्ण चित्रणों के साथ कमल सूत्र की प्राचीन तिब्बती हस्तलिपि।'
      }
    }
  },
  {
    id: '2',
    title: 'Wheel of Life Mural',
    type: 'mural',
    language: 'Sanskrit',
    century: '16th Century',
    monastery: 'Pemayangtse Monastery',
    description: 'Spectacular wall mural depicting the Wheel of Life (Bhavachakra), showing the cycle of samsara with intricate details of the six realms of existence.',
    imageUrl: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highResUrl: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90',
    metadata: {
      dimensions: '3.2 x 2.8 meters',
      material: 'Natural pigments on plaster',
      condition: 'Excellent',
      digitizedDate: '2023-09-02',
      conservationStatus: 'excellent'
    }
  },
  {
    id: '3',
    title: 'Monastery Foundation Charter',
    type: 'document',
    language: 'Tibetan',
    century: '17th Century',
    monastery: 'Tashiding Monastery',
    description: 'Historical document describing the foundation of Tashiding Monastery, including land grants and religious ceremonies performed during its establishment.',
    imageUrl: 'https://images.unsplash.com/photo-1589810411080-c6734f6a0fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highResUrl: 'https://images.unsplash.com/photo-1589810411080-c6734f6a0fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90',
    metadata: {
      dimensions: '35 x 25 cm',
      material: 'Handmade paper, ink',
      condition: 'Fair',
      digitizedDate: '2023-07-20',
      conservationStatus: 'needs-attention'
    }
  },
  {
    id: '4',
    title: 'Buddha Life Stories Thangka',
    type: 'artwork',
    language: 'Tibetan',
    century: '18th Century',
    monastery: 'Enchey Monastery',
    description: 'Traditional Tibetan thangka painting depicting scenes from Buddha\'s life, painted with natural pigments on silk canvas with intricate border designs.',
    imageUrl: 'https://images.unsplash.com/photo-1571892806085-bd5ca5e1e3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    highResUrl: 'https://images.unsplash.com/photo-1571892806085-bd5ca5e1e3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=90',
    metadata: {
      dimensions: '120 x 85 cm',
      material: 'Silk, natural pigments',
      condition: 'Excellent',
      digitizedDate: '2023-10-10',
      conservationStatus: 'excellent'
    }
  }
];

const DigitalArchive = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedMonastery, setSelectedMonastery] = useState('all');
  const [selectedCentury, setSelectedCentury] = useState('all');
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const filteredItems = archiveItems.filter(item => {
    const searchMatch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.monastery.toLowerCase().includes(searchTerm.toLowerCase());
    
    const typeMatch = selectedType === 'all' || item.type === selectedType;
    const monasteryMatch = selectedMonastery === 'all' || item.monastery === selectedMonastery;
    const centuryMatch = selectedCentury === 'all' || item.century === selectedCentury;
    
    return searchMatch && typeMatch && monasteryMatch && centuryMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'manuscript':
        return <Scroll className="w-4 h-4" />;
      case 'mural':
        return <ImageIcon className="w-4 h-4" />;
      case 'document':
        return <BookOpen className="w-4 h-4" />;
      case 'artwork':
        return <ImageIcon className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'manuscript':
        return 'bg-sacred-red text-spiritual-white';
      case 'mural':
        return 'bg-prayer-blue text-spiritual-white';
      case 'document':
        return 'bg-sacred-gold text-monastery-brown';
      case 'artwork':
        return 'bg-secondary text-monastery-brown';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'needs-attention':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 3));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));

  const getDisplayContent = (item: ArchiveItem) => {
    if (selectedLanguage !== 'english' && item.translations?.[selectedLanguage]) {
      return item.translations[selectedLanguage];
    }
    return { title: item.title, description: item.description };
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="monastery-title mb-4">
            Digital Heritage Archive
          </h2>
          <p className="cultural-text max-w-3xl mx-auto">
            Explore our digitized collection of rare manuscripts, ancient murals, 
            historical documents, and traditional artworks from Sikkim's monasteries. 
            Each item is carefully preserved and presented with detailed metadata.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="monastery-card border-sacred-gold/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-monastery-brown">
              <Search className="w-5 h-5" />
              Search & Filter Archive
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search Input */}
              <div className="lg:col-span-2">
                <Input
                  placeholder="Search by title, description, or monastery..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-monastery-brown/20 focus:border-sacred-gold"
                />
              </div>

              {/* Type Filter */}
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="manuscript">Manuscripts</SelectItem>
                  <SelectItem value="mural">Murals</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="artwork">Artwork</SelectItem>
                </SelectContent>
              </Select>

              {/* Monastery Filter */}
              <Select value={selectedMonastery} onValueChange={setSelectedMonastery}>
                <SelectTrigger>
                  <SelectValue placeholder="All Monasteries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Monasteries</SelectItem>
                  <SelectItem value="Rumtek Monastery">Rumtek</SelectItem>
                  <SelectItem value="Pemayangtse Monastery">Pemayangtse</SelectItem>
                  <SelectItem value="Enchey Monastery">Enchey</SelectItem>
                  <SelectItem value="Tashiding Monastery">Tashiding</SelectItem>
                </SelectContent>
              </Select>

              {/* Century Filter */}
              <Select value={selectedCentury} onValueChange={setSelectedCentury}>
                <SelectTrigger>
                  <SelectValue placeholder="All Periods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Periods</SelectItem>
                  <SelectItem value="15th Century">15th Century</SelectItem>
                  <SelectItem value="16th Century">16th Century</SelectItem>
                  <SelectItem value="17th Century">17th Century</SelectItem>
                  <SelectItem value="18th Century">18th Century</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-monastery-brown" />
                <span className="text-sm font-medium text-monastery-brown">Display Language:</span>
              </div>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">हिंदी</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Archive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const displayContent = getDisplayContent(item);
            
            return (
              <Card key={item.id} className="monastery-card border-monastery-brown/20 group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <div 
                      className="h-48 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className={getTypeColor(item.type)}>
                        {getTypeIcon(item.type)}
                        <span className="ml-1 capitalize">{item.type}</span>
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className={getConditionColor(item.metadata.conservationStatus)}>
                        {item.metadata.conservationStatus.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-monastery-brown mb-2">
                      {displayContent.title}
                    </h3>
                    <p className="cultural-text text-sm mb-3 line-clamp-2">
                      {displayContent.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-monastery-brown-light">
                        <Calendar className="w-3 h-3" />
                        <span>{item.century} • {item.language}</span>
                      </div>
                      <div className="text-xs text-monastery-brown-light">
                        {item.monastery}
                      </div>
                    </div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full bg-gradient-sunset text-spiritual-white"
                          onClick={() => setSelectedItem(item)}
                        >
                          <ZoomIn className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      
                      <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl text-monastery-brown">
                            {displayContent.title}
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                          {/* High-res Image Viewer */}
                          <div className="space-y-4">
                            <div className="relative bg-black rounded-lg overflow-hidden">
                              <div 
                                className="w-full h-96 bg-contain bg-center bg-no-repeat transition-transform duration-300"
                                style={{ 
                                  backgroundImage: `url(${item.highResUrl})`,
                                  transform: `scale(${zoomLevel})`
                                }}
                              />
                              <div className="absolute bottom-4 right-4 flex gap-2">
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={zoomOut}
                                  className="bg-white/10 backdrop-blur-sm text-white border-white/20"
                                >
                                  <ZoomOut className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={zoomIn}
                                  className="bg-white/10 backdrop-blur-sm text-white border-white/20"
                                >
                                  <ZoomIn className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <Button className="w-full bg-sacred-gold text-monastery-brown">
                              <Download className="w-4 h-4 mr-2" />
                              Download High Resolution
                            </Button>
                          </div>

                          {/* Metadata */}
                          <div className="space-y-6">
                            <div>
                              <h4 className="font-semibold text-monastery-brown mb-3">Description</h4>
                              <p className="cultural-text">{displayContent.description}</p>
                            </div>

                            <div>
                              <h4 className="font-semibold text-monastery-brown mb-3">Metadata</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-monastery-brown-light">Type:</span>
                                  <Badge className={getTypeColor(item.type)}>
                                    {item.type}
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-monastery-brown-light">Period:</span>
                                  <span className="text-monastery-brown">{item.century}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-monastery-brown-light">Language:</span>
                                  <span className="text-monastery-brown">{item.language}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-monastery-brown-light">Monastery:</span>
                                  <span className="text-monastery-brown">{item.monastery}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-monastery-brown-light">Dimensions:</span>
                                  <span className="text-monastery-brown">{item.metadata.dimensions}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-monastery-brown-light">Material:</span>
                                  <span className="text-monastery-brown">{item.metadata.material}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-monastery-brown-light">Condition:</span>
                                  <Badge className={getConditionColor(item.metadata.conservationStatus)}>
                                    {item.metadata.conservationStatus.replace('-', ' ')}
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-monastery-brown-light">Digitized:</span>
                                  <span className="text-monastery-brown">
                                    {new Date(item.metadata.digitizedDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Results Summary */}
        <div className="text-center mt-12">
          <p className="cultural-text">
            Showing {filteredItems.length} of {archiveItems.length} items
          </p>
        </div>
      </div>
    </section>
  );
};

export default DigitalArchive;