import { Car, Bus, Plane, Train } from 'lucide-react';

const TransportSection = () => {
  const transportOptions = [
    {
      icon: Car,
      title: 'Véhicules Privés',
      description: 'Chauffeurs professionnels et véhicules climatisés pour vos déplacements',
      features: ['4x4 tout terrain', 'Minibus 8-17 places', 'Berlines de luxe', 'Chauffeurs guides'],
      advantages: ['Flexibilité totale', 'Confort optimal', 'Arrêts à la demande', 'Bagages sécurisés'],
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
    },
    {
      icon: Bus,
      title: 'Autocars de Tourisme',
      description: 'Transport en groupe avec tout le confort moderne',
      features: ['Climatisation', 'Sièges inclinables', 'WiFi gratuit', 'Toilettes à bord'],
      advantages: ['Économique', 'Écologique', 'Rencontres', 'Guides à bord'],
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'
    },
    {
      icon: Plane,
      title: 'Vols Domestiques',
      description: 'Liaisons aériennes pour optimiser votre temps de voyage',
      features: ['Royal Air Maroc', 'Air Arabia', 'Vols réguliers', 'Assistance aéroport'],
      advantages: ['Gain de temps', 'Confort', 'Vues aériennes', 'Service premium'],
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
    },
    {
      icon: Train,
      title: 'Train à Grande Vitesse',
      description: 'Al Boraq, le TGV marocain reliant Casablanca à Tanger',
      features: ['320 km/h', '1ère et 2ème classe', 'WiFi gratuit', 'Restauration à bord'],
      advantages: ['Rapidité', 'Ponctualité', 'Écologique', 'Confort moderne'],
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
    }
  ];

  return (
    <section id="transport" className="py-20 bg-luxury-beige">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Solutions de Transport
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des moyens de transport adaptés à tous vos besoins pour explorer le Maroc en toute sérénité
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {transportOptions.map((transport, index) => (
            <div
              key={index}
              className="bg-background rounded-xl overflow-hidden border border-border hover:shadow-luxury transition-all duration-500 hover:scale-105 fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="md:flex">
                <div className="md:w-1/3 relative h-48 md:h-auto overflow-hidden">
                  <img
                    src={transport.image}
                    alt={transport.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <transport.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                    {transport.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {transport.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Caractéristiques :</h4>
                      <div className="space-y-1">
                        {transport.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Avantages :</h4>
                      <div className="space-y-1">
                        {transport.advantages.map((advantage, idx) => (
                          <div key={idx} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                            {advantage}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                    Demander un devis
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

export default TransportSection;