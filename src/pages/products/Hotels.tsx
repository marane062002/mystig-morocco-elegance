import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Star, MapPin, Wifi, Car, Coffee, Users } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Hotels = () => {
  useScrollAnimation();

  const hotels = [
    {
      id: 1,
      name: 'Riad Atlas Premium',
      location: 'Marrakech, Médina',
      rating: 4.8,
      reviews: 124,
      price: '1,200 MAD/nuit',
      rooms: 12,
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      amenities: ['Wifi', 'Parking', 'Restaurant', 'Spa'],
      description: 'Riad de luxe au cœur de la médina avec architecture traditionnelle'
    },
    {
      id: 2,
      name: 'Hotel Sahara Luxury',
      location: 'Merzouga, Désert',
      rating: 4.9,
      reviews: 78,
      price: '2,800 MAD/nuit',
      rooms: 8,
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      amenities: ['Wifi', 'Restaurant', 'Excursions', 'Spa'],
      description: 'Hôtel de luxe au cœur du désert avec vue sur les dunes'
    },
    {
      id: 3,
      name: 'Riad Essaouira Breeze',
      location: 'Essaouira, Médina',
      rating: 4.6,
      reviews: 95,
      price: '950 MAD/nuit',
      rooms: 10,
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      amenities: ['Wifi', 'Terrasse', 'Restaurant', 'Vue mer'],
      description: 'Riad traditionnel avec vue sur l\'océan Atlantique'
    },
    {
      id: 4,
      name: 'Kasbah du Toubkal',
      location: 'Imlil, Atlas',
      rating: 4.7,
      reviews: 67,
      price: '1,800 MAD/nuit',
      rooms: 14,
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      amenities: ['Restaurant', 'Randonnée', 'Spa', 'Vue montagne'],
      description: 'Kasbah authentique dans les montagnes de l\'Atlas'
    },
    {
      id: 5,
      name: 'Riad Fès Heritage',
      location: 'Fès, Médina',
      rating: 4.5,
      reviews: 112,
      price: '800 MAD/nuit',
      rooms: 8,
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      amenities: ['Wifi', 'Restaurant', 'Hammam', 'Terrasse'],
      description: 'Riad historique dans la plus ancienne médina du monde'
    },
    {
      id: 6,
      name: 'Hotel Chefchaouen Blue',
      location: 'Chefchaouen, Médina',
      rating: 4.4,
      reviews: 89,
      price: '650 MAD/nuit',
      rooms: 12,
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      amenities: ['Wifi', 'Restaurant', 'Vue montagne', 'Terrasse'],
      description: 'Hôtel traditionnel dans la ville bleue du Rif'
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'restaurant': return <Coffee className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-luxury-ivory via-luxury-beige to-luxury-sand">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto fade-in-up">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6">
              Hôtels & Riads
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Séjournez dans les plus beaux établissements du Maroc
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par ville ou nom d'hôtel..."
                className="w-full pl-12 pr-4 py-4 bg-background/80 backdrop-blur-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel, index) => (
              <div
                key={hotel.id}
                className="group bg-background rounded-xl border border-border overflow-hidden hover:shadow-luxury transition-all duration-500 hover:scale-105 fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{hotel.rating}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {hotel.rooms} chambres
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-foreground text-lg mb-1 group-hover:text-primary transition-colors duration-300">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {hotel.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">
                    {hotel.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center space-x-1 bg-muted px-2 py-1 rounded-lg text-xs">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-lg font-bold text-primary">{hotel.price}</span>
                      <p className="text-xs text-muted-foreground">{hotel.reviews} avis</p>
                    </div>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                      Réserver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12 fade-in-up">
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
              Voir plus d'hôtels
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hotels;