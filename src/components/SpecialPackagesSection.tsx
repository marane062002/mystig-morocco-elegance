import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Clock, Users, Star } from 'lucide-react';
import { specialPackagesAPI } from '@/services/travel-programs-api';
import { AdminPackage } from '@/types/travel';

const SpecialPackagesSection = () => {
  const [packages, setPackages] = useState<AdminPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const data = await specialPackagesAPI.getAll();
      setPackages(data.slice(0, 6)); // Limit to 6 packages for carousel
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch special packages:', error);
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, packages.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, packages.length - 2)) % Math.max(1, packages.length - 2));
  };

  if (loading) {
    return (
      <section id="special-packages" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="special-packages" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Journeys & Rituals
            </h2>
            <div className="w-24 h-px bg-primary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our curated collection of mystical experiences across Morocco
            </p>
          </div>

          {packages.length > 0 && (
            <div className="relative fade-in-up">
              {/* Carousel Container */}
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
                >
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="w-1/3 flex-shrink-0 px-3">
                      <div className="bg-background rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                        {/* Package Image Placeholder */}
                        <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 text-white">
                            <div className="flex items-center space-x-2 mb-2">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">Featured Package</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="font-serif text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {pkg.title || `Mystic Journey ${pkg.id.slice(0, 4)}`}
                          </h3>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-muted-foreground text-sm">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span>
                                {pkg.cities && pkg.cities.length > 0 
                                  ? pkg.cities.slice(0, 2).map(c => c.name).join(', ') + (pkg.cities.length > 2 ? '...' : '')
                                  : 'Multiple destinations'
                                }
                              </span>
                            </div>
                            <div className="flex items-center text-muted-foreground text-sm">
                              <Clock className="w-4 h-4 mr-2" />
                              <span>7-10 days</span>
                            </div>
                            <div className="flex items-center text-muted-foreground text-sm">
                              <Users className="w-4 h-4 mr-2" />
                              <span>Up to 8 travelers</span>
                            </div>
                          </div>

                          <div className="border-t border-border pt-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-2xl font-bold text-primary">
                                  ${pkg.basePrice || 1200}
                                </span>
                                <span className="text-muted-foreground text-sm ml-1">per person</span>
                              </div>
                              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm font-medium">
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              {packages.length > 3 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {packages.length > 3 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({ length: Math.max(1, packages.length - 2) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentIndex === index ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {packages.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No special packages available at the moment. Check back soon for exciting new journeys!
              </p>
            </div>
          )}

          <div className="text-center mt-12 fade-in-up">
            <button className="btn-luxury px-8 py-4 text-lg">
              Explore All Packages
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialPackagesSection;