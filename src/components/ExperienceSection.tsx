import desertImage from '@/assets/desert-sunset.jpg';
import hammamImage from '@/assets/hammam-spa.jpg';
import cuisineImage from '@/assets/moroccan-cuisine.jpg';

const ExperienceSection = () => {
  const experiences = [
    {
      image: desertImage,
      title: 'Balade dans le désert',
      description: 'Traversez les dunes dorées à dos de chameau et passez une nuit magique sous les étoiles du Sahara dans un campement de luxe.'
    },
    {
      image: hammamImage,
      title: 'Rituels de bien-être',
      description: 'Découvrez les secrets ancestraux du hammam traditionnel et laissez-vous envelopper par une expérience de détente absolue.'
    },
    {
      image: cuisineImage,
      title: 'Saveurs marocaines',
      description: 'Savourez une cuisine raffinée dans des palais somptueux, où chaque plat raconte l\'histoire des épices et des traditions culinaires.'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Expériences d'Exception
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Chaque moment de votre voyage est pensé pour éveiller vos sens et créer des souvenirs inoubliables
          </p>
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