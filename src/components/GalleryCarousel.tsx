import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import images for the specified cities
import agadirImage from '@/assets/agadir-beach.jpg';
import rabatImage from '@/assets/rabat-hassan-tower.jpg';
import marrakechImage from '@/assets/marrakech.jpg';
import fesImage from '@/assets/fes-medina.jpg';
import essaouiraImage from '@/assets/essaouira.jpg';

const GalleryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: agadirImage,
      title: 'Agadir',
      subtitle: 'Atlantic Pearl'
    },
    {
      src: rabatImage,
      title: 'Rabat',
      subtitle: 'Imperial Capital'
    },
    {
      src: marrakechImage,
      title: 'Marrakech',
      subtitle: 'Red City'
    },
    {
      src: fesImage,
      title: 'Fés',
      subtitle: 'Spiritual Heart'
    },
    {
      src: essaouiraImage,
      title: 'Essaouira',
      subtitle: 'Wind City'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Discover Morocco's Treasures
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Journey through the most captivating destinations where ancient traditions meet modern luxury
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Image */}
          <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-luxury">
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Image Info */}
            <div className="absolute bottom-8 left-8">
              <h3 className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">
                {images[currentIndex].title}
              </h3>
              <p className="text-white/90 text-lg md:text-xl">
                {images[currentIndex].subtitle}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-white" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-muted hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
                index === currentIndex ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-white">
                  <p className="text-sm font-semibold">{image.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryCarousel;