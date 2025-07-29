import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import chefchaouenImage from '@/assets/chefchaouen.jpg';
import marrakechImage from '@/assets/marrakech.jpg';
import essaouiraImage from '@/assets/essaouira.jpg';
import atlasImage from '@/assets/atlas-mountains.jpg';
import desertImage from '@/assets/desert-sunset.jpg';

const GalleryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: chefchaouenImage,
      title: 'Chefchaouen',
      subtitle: 'La perle bleue du Rif'
    },
    {
      src: marrakechImage,
      title: 'Marrakech',
      subtitle: 'La ville rouge impériale'
    },
    {
      src: desertImage,
      title: 'Désert du Sahara',
      subtitle: 'Merzouga sous les étoiles'
    },
    {
      src: essaouiraImage,
      title: 'Essaouira',
      subtitle: 'La cité des vents'
    },
    {
      src: atlasImage,
      title: 'Atlas',
      subtitle: 'Montagnes majestueuses'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Carousel Images */}
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image.src})` }}
            >
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            
            {/* Image Caption */}
            <div className="absolute bottom-8 left-8 text-white z-10">
              <h3 className="font-serif text-3xl md:text-4xl font-bold mb-2">
                {image.title}
              </h3>
              <p className="text-lg md:text-xl opacity-90">
                {image.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default GalleryCarousel;