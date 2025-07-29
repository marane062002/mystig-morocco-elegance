import marrakechImage from '@/assets/marrakech.jpg';
import chefchaouenImage from '@/assets/chefchaouen.jpg';

const ImageTextSection = () => {
  const sections = [
    {
      image: marrakechImage,
      title: 'Marrakech, l\'Âme Impériale',
      description: 'Plongez dans l\'effervescence de la place Jemaa el-Fna, explorez les souks parfumés où résonnent les appels des marchands, et découvrez les jardins secrets de la Mamounia. Marrakech révèle ses trésors aux voyageurs en quête d\'authenticité et de raffinement.',
      imageLeft: true
    },
    {
      image: chefchaouenImage,
      title: 'Chefchaouen, la Perle Bleue',
      description: 'Nichée dans les montagnes du Rif, cette ville enchanteresse dévoile ses ruelles azur et ses terrasses fleuries. Chaque coin de rue offre une nouvelle perspective sur cette merveille architecturale où le temps semble suspendu entre ciel et terre.',
      imageLeft: false
    }
  ];

  return (
    <section className="py-20 bg-luxury-ivory">
      {sections.map((section, index) => (
        <div key={index} className={`${index > 0 ? 'mt-20' : ''}`}>
          <div className="container mx-auto px-6">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${
              section.imageLeft ? '' : 'lg:grid-flow-col-dense'
            }`}>
              {/* Image */}
              <div className={`${section.imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative group">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-lg shadow-luxury">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className={`${section.imageLeft ? 'lg:order-2' : 'lg:order-1'} fade-in-up`}>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
                  {section.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {section.description}
                </p>
                <button className="btn-luxury rounded-lg">
                  Découvrir cette destination
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ImageTextSection;