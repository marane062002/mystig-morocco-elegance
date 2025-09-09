import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Star } from 'lucide-react';

const SpecialPackagesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Mock data for now to avoid API interface conflicts
  const mockPackages = [
    {
      id: '1',
      title: 'Imperial Cities Discovery',
      description: 'Explore the four imperial cities of Morocco: Rabat, Meknes, Fes, and Marrakech in one unforgettable journey.',
      basePrice: 1200,
      discountPercentage: 15,
      finalPrice: 1020,
      duration: 8,
      cities: 4,
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73dd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isActive: true
    },
    {
      id: '2', 
      title: 'Sahara Desert Adventure',
      description: 'Experience the magic of the Sahara with camel trekking, desert camping, and traditional Berber culture.',
      basePrice: 900,
      discountPercentage: 20,
      finalPrice: 720,
      duration: 5,
      cities: 3,
      image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isActive: true
    },
    {
      id: '3',
      title: 'Atlantic Coast Escape', 
      description: 'Discover Morocco\'s beautiful Atlantic coastline from Casablanca to Essaouira.',
      basePrice: 800,
      discountPercentage: 10,
      finalPrice: 720,
      duration: 6,
      cities: 3,
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isActive: true
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === mockPackages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? mockPackages.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentPackage = mockPackages[currentIndex];
  const hasDiscount = currentPackage.discountPercentage > 0;

  return (
    <section id="special-packages" className="py-20 bg-luxury-beige/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Exclusive Special Offers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our carefully crafted packages with exceptional value and unforgettable experiences
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Package Display */}
          <div className="bg-white rounded-2xl shadow-luxury overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Package Image */}
              <div className="relative h-96 lg:h-auto">
                <img
                  src={currentPackage.image}
                  alt={currentPackage.title}
                  className="w-full h-full object-cover"
                />
                {hasDiscount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    -{currentPackage.discountPercentage}% OFF
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex space-x-2 justify-center">
                    {mockPackages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div className="p-8 lg:p-12">
                <div className="h-full flex flex-col">
                  <div className="flex-1">
                    <h3 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
                      {currentPackage.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      {currentPackage.description}
                    </p>

                    {/* Package Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {currentPackage.duration} Days
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {currentPackage.cities} Cities
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          For Groups
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Premium Experience
                        </span>
                      </div>
                    </div>

                    {/* Included Services */}
                    <div className="mb-8">
                      <h4 className="font-semibold text-foreground mb-3">What's Included:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span className="text-sm text-muted-foreground">
                            Accommodation in premium hotels
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span className="text-sm text-muted-foreground">
                            Professional local guide
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span className="text-sm text-muted-foreground">
                            Transportation and transfers
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span className="text-sm text-muted-foreground">
                            Selected meals and cultural experiences
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="flex items-center space-x-2">
                          {hasDiscount && (
                            <span className="text-lg text-muted-foreground line-through">
                              ${currentPackage.basePrice}
                            </span>
                          )}
                          <span className="text-3xl font-bold text-foreground">
                            ${currentPackage.finalPrice}
                          </span>
                          <span className="text-sm text-muted-foreground">per person</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Based on double occupancy
                        </div>
                      </div>
                    </div>
                    <button className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300">
                      Book This Package
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Package Thumbnails */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPackages.map((pkg, index) => (
            <div
              key={pkg.id}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                index === currentIndex ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                  {pkg.discountPercentage > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      -{pkg.discountPercentage}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {pkg.title}
                  </h4>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span>{pkg.duration} Days</span>
                    <span>{pkg.cities} Cities</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {pkg.discountPercentage > 0 && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${pkg.basePrice}
                        </span>
                      )}
                      <span className="font-bold text-foreground">
                        ${pkg.finalPrice}
                      </span>
                    </div>
                    {pkg.isActive && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Available
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialPackagesSection;