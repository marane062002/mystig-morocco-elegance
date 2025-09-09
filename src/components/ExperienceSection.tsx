import desertImage from '@/assets/desert-sunset.jpg';
import hammamImage from '@/assets/hammam-spa.jpg';
import cuisineImage from '@/assets/moroccan-cuisine.jpg';

const ExperienceSection = () => {
  const experiences = [
    {
      image: desertImage,
      title: 'Imperial Mystique',
      description: 'Guided journeys in Marrakech, Fes, and Rabat with private storytellers revealing the secrets of Morocco\'s imperial cities.'
    },
    {
      image: hammamImage,
      title: 'Cultural Soulcraft',
      description: 'Pottery, calligraphy, textiles workshops where ancient traditions meet modern creativity in intimate settings.'
    },
    {
      image: cuisineImage,
      title: 'Culinary Rituals',
      description: 'Cooking classes with Moroccan chefs, learning sacred recipes passed down through generations in authentic kitchens.'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Top Experiences
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Immerse yourself in the mystical essence of Morocco through carefully curated experiences that awaken the soul
          </p>
          
          {/* Additional Experience Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="p-6 bg-luxury-beige rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">Wellness & Relaxation</h3>
              <p className="text-muted-foreground">Spas, hammams, yoga sanctuaries</p>
            </div>
            <div className="p-6 bg-luxury-beige rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">Sacred Journeys</h3>
              <p className="text-muted-foreground">Spiritual experiences and meditation retreats</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="group cursor-pointer fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-luxury hover:shadow-luxury-hover transition-all duration-500 group-hover:scale-105">
                <div className="aspect-[4/5] w-full">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-serif text-2xl font-bold mb-3">
                    {experience.title}
                  </h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {experience.description}
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

export default ExperienceSection;