import { Star, MapPin, Wifi, Car, Coffee, Waves } from 'lucide-react';

const AccommodationsSection = () => {
  const accommodations = [
    {
      category: 'Riads de Luxe',
      description: 'Palais traditionnels transformés en havres de paix au cœur des médinas',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      features: ['Architecture authentique', 'Patios intérieurs', 'Service personnalisé', 'Spa traditionnel'],
      locations: ['Marrakech', 'Fès', 'Essaouira'],
      priceRange: '800 - 3000 MAD/nuit'
    },
    {
      category: 'Hôtels de Charme',
      description: 'Établissements boutique alliant confort moderne et charme marocain',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      features: ['Design contemporain', 'Équipements modernes', 'Restaurants gastronomiques', 'Piscines'],
      locations: ['Casablanca', 'Rabat', 'Agadir'],
      priceRange: '600 - 2000 MAD/nuit'
    },
    {
      category: 'Campements Désert',
      description: 'Bivouacs de luxe pour une nuit magique sous les étoiles du Sahara',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      features: ['Tentes berbères', 'Confort moderne', 'Excursions chamelières', 'Spectacles traditionnels'],
      locations: ['Merzouga', 'Zagora', 'M\'hamid'],
      priceRange: '1200 - 4000 MAD/nuit'
    },
    {
      category: 'Kasbahs Historiques',
      description: 'Forteresses ancestrales restaurées offrant une immersion dans l\'histoire',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      features: ['Patrimoine historique', 'Vues panoramiques', 'Jardins traditionnels', 'Musées privés'],
      locations: ['Ouarzazate', 'Skoura', 'Aït Benhaddou'],
      priceRange: '900 - 2500 MAD/nuit'
    },
    {
      category: 'Écolodges Atlas',
      description: 'Hébergements écologiques dans les montagnes avec vues spectaculaires',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      features: ['Écologie responsable', 'Randonnées guidées', 'Cuisine locale', 'Panoramas exceptionnels'],
      locations: ['Imlil', 'Ourika', 'Azilal'],
      priceRange: '500 - 1500 MAD/nuit'
    },
    {
      category: 'Resorts Côtiers',
      description: 'Complexes balnéaires de luxe face à l\'océan Atlantique',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      features: ['Accès plage privée', 'Sports nautiques', 'Spas marins', 'Restaurants fruits de mer'],
      locations: ['Agadir', 'Essaouira', 'El Jadida'],
      priceRange: '1000 - 3500 MAD/nuit'
    }
  ];

  return (
    <section id="accommodations" className="py-20 bg-luxury-beige">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Hébergements d'Exception
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Du riad traditionnel au campement de luxe, découvrez nos hébergements soigneusement sélectionnés
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accommodations.map((accommodation, index) => (
            <div
              key={index}
              className="bg-background rounded-xl overflow-hidden border border-border hover:shadow-luxury transition-all duration-500 hover:scale-105 fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={accommodation.image}
                  alt={accommodation.category}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-serif text-xl font-bold">{accommodation.category}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {accommodation.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Caractéristiques :</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {accommodation.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Destinations :</h4>
                  <div className="flex flex-wrap gap-2">
                    {accommodation.locations.map((location, idx) => (
                      <span key={idx} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-lg">
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm font-medium text-primary">{accommodation.priceRange}</span>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300">
                    Découvrir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccommodationsSection;