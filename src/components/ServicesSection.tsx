import { MapPin, Calendar, Users, Compass, Camera, Utensils } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: MapPin,
      title: 'Circuits Personnalisés',
      description: 'Des itinéraires sur mesure adaptés à vos envies et votre budget, avec guide privé francophone.',
      features: ['Itinéraires flexibles', 'Guide expert', 'Transport privé', 'Hébergements sélectionnés']
    },
    {
      icon: Calendar,
      title: 'Organisation d\'Événements',
      description: 'Mariages, séminaires, célébrations privées dans des lieux d\'exception au Maroc.',
      features: ['Lieux uniques', 'Coordination complète', 'Prestataires locaux', 'Service premium']
    },
    {
      icon: Users,
      title: 'Voyages de Groupe',
      description: 'Expériences collectives enrichissantes pour familles, amis ou entreprises.',
      features: ['Groupes 8-20 personnes', 'Tarifs préférentiels', 'Activités de groupe', 'Logistique simplifiée']
    },
    {
      icon: Compass,
      title: 'Aventures & Trekking',
      description: 'Explorez les sentiers secrets de l\'Atlas et les dunes du Sahara avec nos guides experts.',
      features: ['Guides de montagne', 'Équipement fourni', 'Bivouacs authentiques', 'Tous niveaux']
    },
    {
      icon: Camera,
      title: 'Voyages Photo',
      description: 'Capturez la beauté du Maroc avec nos circuits spécialement conçus pour les photographes.',
      features: ['Spots exclusifs', 'Lumières optimales', 'Guide photographe', 'Petits groupes']
    },
    {
      icon: Utensils,
      title: 'Expériences Culinaires',
      description: 'Découvrez les secrets de la gastronomie marocaine avec nos chefs et artisans locaux.',
      features: ['Cours de cuisine', 'Marchés locaux', 'Dégustation', 'Recettes traditionnelles']
    }
  ];

  return (
    <section id="services" className="py-20 bg-luxury-beige">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Nos Services
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une gamme complète de services pour créer votre voyage idéal au Maroc
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-8 border border-border hover:shadow-luxury transition-all duration-500 hover:scale-105 fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;