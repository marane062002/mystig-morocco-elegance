import chefchaouenImage from '@/assets/chefchaouen.jpg';
import marrakechImage from '@/assets/marrakech.jpg';
import essaouiraImage from '@/assets/essaouira.jpg';
import desertImage from '@/assets/desert-sunset.jpg';
import atlasImage from '@/assets/atlas-mountains.jpg';

const DestinationsGrid = () => {
  const destinations = [
    {
      image: desertImage,
      title: 'Merzouga',
      subtitle: 'Désert du Sahara',
      description: 'Nuits étoilées et dunes infinies'
    },
    {
      image: atlasImage,
      title: 'Vallée de l\'Ourika',
      subtitle: 'Montagnes de l\'Atlas',
      description: 'Villages berbères authentiques'
    },
    {
      image: essaouiraImage,
      title: 'Plages d\'Essaouira',
      subtitle: 'Côte Atlantique',
      description: 'Charme portuaire et vents océaniques'
    },
    {
      image: chefchaouenImage,
      title: 'Chefchaouen',
      subtitle: 'Perle du Rif',
      description: 'Architecture bleue envoûtante'
    },
    {
      image: marrakechImage,
      title: 'Marrakech',
      subtitle: 'Ville Impériale',
      description: 'Palais et jardins secrets'
    }
  ];

  return (
    <section id="destinations" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Destinations Recommandées
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des lieux d'exception soigneusement sélectionnés pour leur beauté authentique et leur richesse culturelle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="group cursor-pointer fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-luxury hover:shadow-luxury-hover transition-all duration-500 group-hover:scale-105">
                <div className="aspect-[4/3] w-full">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-serif text-2xl font-bold mb-1">
                    {destination.title}
                  </h3>
                  <p className="text-sm opacity-80 mb-2">
                    {destination.subtitle}
                  </p>
                  <p className="text-sm opacity-90">
                    {destination.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsGrid;