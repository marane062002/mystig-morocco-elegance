import { ChefHat, Utensils, Coffee, Grape } from 'lucide-react';

const GastronomySection = () => {
  const gastronomyExperiences = [
    {
      icon: ChefHat,
      title: 'Cours de Cuisine Traditionnelle',
      description: 'Apprenez les secrets de la cuisine marocaine avec nos chefs experts',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      specialties: ['Tajine aux sept légumes', 'Couscous royal', 'Pastilla au pigeon', 'Pâtisseries orientales'],
      duration: '3-5 heures',
      includes: ['Marché aux épices', 'Cours pratique', 'Dégustation', 'Recettes à emporter']
    },
    {
      icon: Utensils,
      title: 'Dîners dans des Palais',
      description: 'Expériences gastronomiques dans des cadres somptueux',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      specialties: ['Menu dégustation', 'Spectacle folklorique', 'Service royal', 'Vins sélectionnés'],
      duration: '3-4 heures',
      includes: ['Transport', 'Menu 7 services', 'Spectacle', 'Digestifs traditionnels']
    },
    {
      icon: Coffee,
      title: 'Rituels du Thé',
      description: 'Découverte de l\'art du thé à la menthe et des pâtisseries',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      specialties: ['Thé à la menthe', 'Cornes de gazelle', 'Chebakia', 'Makroudh'],
      duration: '2 heures',
      includes: ['Cérémonie du thé', 'Pâtisseries fraîches', 'Histoire et traditions', 'Dégustation']
    },
    {
      icon: Grape,
      title: 'Découverte des Vignobles',
      description: 'Visite des domaines viticoles des régions de Meknès et Benslimane',
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      specialties: ['Vins rouges', 'Vins rosés', 'Cépages locaux', 'Accords mets-vins'],
      duration: 'Journée complète',
      includes: ['Visite vignobles', 'Dégustation', 'Déjeuner', 'Transport']
    }
  ];

  return (
    <section id="gastronomy" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Gastronomie Marocaine
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Savourez les délices de la cuisine marocaine à travers des expériences culinaires authentiques
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {gastronomyExperiences.map((experience, index) => (
            <div
              key={index}
              className="bg-luxury-beige rounded-xl overflow-hidden border border-border hover:shadow-luxury transition-all duration-500 hover:scale-105 fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="md:flex">
                <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <experience.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2 p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                    {experience.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {experience.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="font-semibold text-foreground">Durée : {experience.duration}</span>
                    </div>
                    
                    <h4 className="font-semibold text-foreground mb-2 text-sm">Spécialités :</h4>
                    <div className="space-y-1">
                      {experience.specialties.map((specialty, idx) => (
                        <div key={idx} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {specialty}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-2 text-sm">Inclus :</h4>
                    <div className="space-y-1">
                      {experience.includes.map((item, idx) => (
                        <div key={idx} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                    Réserver
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

export default GastronomySection;