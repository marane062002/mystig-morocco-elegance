import agadirImage from '@/assets/agadir-beach.jpg';
import rabatImage from '@/assets/rabat-hassan-tower.jpg';
import marrakechImage from '@/assets/marrakech.jpg';
import fesImage from '@/assets/fes-medina.jpg';
import essaouiraImage from '@/assets/essaouira.jpg';

const DestinationsGrid = () => {
  const destinations = [
    {
      image: marrakechImage,
      title: 'Marrakech',
      subtitle: 'Imperial City',
      description: 'Historic medina and vibrant souks'
    },
    {
      image: rabatImage,
      title: 'Rabat',
      subtitle: 'Royal Capital',
      description: 'Hassan Tower and imperial heritage'
    },
    {
      image: fesImage,
      title: 'Fés',
      subtitle: 'Spiritual Heart',
      description: 'Ancient medina and traditional crafts'
    },
    {
      image: essaouiraImage,
      title: 'Essaouira',
      subtitle: 'Atlantic Pearl',
      description: 'Coastal charm and ocean winds'
    },
    {
      image: agadirImage,
      title: 'Agadir',
      subtitle: 'Beach Resort',
      description: 'Modern resort and golden beaches'
    }
  ];

  return (
    <section id="destinations" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Recommended Destinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Exceptional places carefully selected for their authentic beauty and cultural richness
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