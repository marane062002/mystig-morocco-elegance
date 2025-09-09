import { Mountain, Waves, Camera, Palette, Music, Users } from 'lucide-react';

const ActivitiesSection = () => {
  const activities = [
    {
      icon: Mountain,
      title: 'Trekking Atlas',
      description: 'Randonnées guidées dans les montagnes de l\'Atlas avec nuits chez l\'habitant',
      duration: '2-7 jours',
      difficulty: 'Tous niveaux',
      highlights: ['Toubkal 4167m', 'Villages berbères', 'Cascades d\'Ouzoud', 'Vallées verdoyantes'],
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
    },
    {
      icon: Waves,
      title: 'Excursions Désert',
      description: 'Aventures dans le Sahara avec méharées, bivouacs et lever de soleil sur les dunes',
      duration: '1-4 jours',
      difficulty: 'Facile',
      highlights: ['Méharée au coucher du soleil', 'Nuit sous les étoiles', 'Musique gnawa', 'Sandboarding'],
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
    },
    {
      icon: Camera,
      title: 'Circuits Photo',
      description: 'Voyages spécialement conçus pour capturer la beauté du Maroc',
      duration: '3-10 jours',
      difficulty: 'Intermédiaire',
      highlights: ['Lumières dorées', 'Portraits authentiques', 'Paysages époustouflants', 'Techniques photo'],
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'
    },
    {
      icon: Palette,
      title: 'Artisanat & Culture',
      description: 'Immersion dans l\'artisanat traditionnel avec rencontre des maîtres artisans',
      duration: '1-3 jours',
      difficulty: 'Facile',
      highlights: ['Ateliers poterie', 'Tissage berbère', 'Maroquinerie', 'Bijouterie traditionnelle'],
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
    },
    {
      icon: Music,
      title: 'Festivals & Événements',
      description: 'Participez aux festivals authentiques et célébrations locales',
      duration: 'Variable',
      difficulty: 'Facile',
      highlights: ['Festival Gnawa', 'Moussem des Roses', 'Festival des Amandiers', 'Fêtes berbères'],
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg'
    }
  ];

  return (
    <section id="activities" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Expériences
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des aventures authentiques pour tous les goûts et tous les niveaux
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-luxury-beige rounded-xl overflow-hidden border border-border hover:shadow-luxury transition-all duration-500 hover:scale-105 fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <activity.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  {activity.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {activity.description}
                </p>
                
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div>
                    <span className="font-semibold text-foreground">Durée :</span>
                    <span className="text-muted-foreground ml-1">{activity.duration}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">Niveau :</span>
                    <span className="text-muted-foreground ml-1">{activity.difficulty}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">Points forts :</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {activity.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
                
                <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                  En savoir plus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;