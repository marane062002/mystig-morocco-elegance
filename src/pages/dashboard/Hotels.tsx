import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Eye, Star, MapPin, Wifi, Car, Coffee } from 'lucide-react';

const Hotels = () => {
  const hotels = [
    {
      id: 1,
      name: 'Riad Atlas Premium',
      location: 'Marrakech, Médina',
      rating: 4.8,
      price: '1,200 MAD/nuit',
      rooms: 12,
      bookings: 28,
      status: 'active',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      amenities: ['Wifi', 'Parking', 'Restaurant', 'Spa']
    },
    {
      id: 2,
      name: 'Hotel Sahara Luxury',
      location: 'Merzouga, Désert',
      rating: 4.9,
      price: '2,800 MAD/nuit',
      rooms: 8,
      bookings: 15,
      status: 'active',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      amenities: ['Wifi', 'Restaurant', 'Excursions']
    },
    {
      id: 3,
      name: 'Riad Essaouira Breeze',
      location: 'Essaouira, Médina',
      rating: 4.6,
      price: '950 MAD/nuit',
      rooms: 10,
      bookings: 22,
      status: 'inactive',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      amenities: ['Wifi', 'Terrasse', 'Restaurant']
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
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Gestion des Hôtels
            </h1>
            <p className="text-muted-foreground">
              Gérez vos établissements hôteliers et leurs réservations
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300">
            <Plus className="w-5 h-5" />
            <span>Ajouter un hôtel</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-background rounded-xl p-6 border border-border">
            <h3 className="text-2xl font-bold text-foreground">3</h3>
            <p className="text-muted-foreground text-sm">Hôtels actifs</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border">
            <h3 className="text-2xl font-bold text-foreground">30</h3>
            <p className="text-muted-foreground text-sm">Chambres totales</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border">
            <h3 className="text-2xl font-bold text-foreground">65</h3>
            <p className="text-muted-foreground text-sm">Réservations ce mois</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border">
            <h3 className="text-2xl font-bold text-foreground">4.8</h3>
            <p className="text-muted-foreground text-sm">Note moyenne</p>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-background rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <img 
                  src={hotel.image} 
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                  hotel.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {hotel.status === 'active' ? 'Actif' : 'Inactif'}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">{hotel.name}</h3>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hotel.location}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-primary">{hotel.price}</span>
                  <span className="text-sm text-muted-foreground">{hotel.rooms} chambres</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-1 bg-muted px-2 py-1 rounded-lg text-xs">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    {hotel.bookings} réservations ce mois
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Hotels;