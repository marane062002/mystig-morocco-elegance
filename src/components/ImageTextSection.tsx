import marrakechImage from '@/assets/marrakech.jpg';
import essaouiraImage from '@/assets/essaouira.jpg';
import rabatImage from '@/assets/rabat-hassan-tower.jpg';
import fesImage from '@/assets/fes-medina.jpg';

const ImageTextSection = () => {
  const sections = [
    {
      image: marrakechImage,
      title: 'Marrakech, the Imperial Soul',
      description: 'Dive into the bustling energy of Jemaa el-Fna square, explore the fragrant souks where merchant calls resonate, and discover the secret gardens of La Mamounia. Marrakech reveals its treasures to travelers seeking authenticity and refinement.',
      imageLeft: true
    },
    {
      image: essaouiraImage,
      title: 'Essaouira, the Atlantic Pearl',
      description: 'Nestled along Morocco\'s Atlantic coast, this enchanting coastal city unveils its windswept ramparts and vibrant harbor. Every corner offers a new perspective on this maritime marvel where time seems suspended between ocean and sky.',
      imageLeft: false
    },
    {
      image: rabatImage,
      title: 'Rabat, the Royal Capital',
      description: 'The administrative capital combines imperial grandeur with modern sophistication. From the magnificent Hassan Tower to the elegant Andalusian Gardens, Rabat embodies Morocco\'s political and cultural heritage.',
      imageLeft: true
    },
    {
      image: fesImage,
      title: 'Fés, the Spiritual Heart',
      description: 'Step into the world\'s largest car-free urban area in Fés el-Bali. This ancient medina houses the oldest continuously operating university and preserves centuries of Islamic scholarship and traditional craftsmanship.',
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
                  Discover this destination
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