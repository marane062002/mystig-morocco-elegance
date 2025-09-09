import { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, MapPin, Clock, Users, Star, Calendar, 
  RefreshCw, X, Hotel, Car, Ticket, UserCheck, DollarSign, Tag
} from 'lucide-react';
import { specialPackagesAPI } from '@/services/travel-programs-api';
import { AdminPackage } from '@/types/travel';

const SpecialPackagesSection = () => {
  const [packages, setPackages] = useState<AdminPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<AdminPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await specialPackagesAPI.getAll();
      
      if (Array.isArray(data)) {
        setPackages(data);
      } else if (data && typeof data === 'object' && data.data && Array.isArray(data.data)) {
        setPackages(data.data);
      } else if (data && typeof data === 'object' && Array.isArray(data.items)) {
        setPackages(data.items);
      } else {
        console.error('Unexpected API response format:', data);
        setError('Unexpected data format received from server');
        setPackages([]);
      }
    } catch (err) {
      console.error('Failed to fetch special packages:', err);
      setError('Failed to load special packages. Please try again later.');
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (packages.length <= 1) return;
    setCurrentIndex((prev) => 
      prev === packages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    if (packages.length <= 1) return;
    setCurrentIndex((prev) => 
      prev === 0 ? packages.length - 1 : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const openModal = (pkg: AdminPackage) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  // Calculate total days from city periods
  const calculateTotalDays = (pkg: AdminPackage) => {
    if (!pkg.cityPeriods || pkg.cityPeriods.length === 0) return '7-10';
    
    const totalDays = pkg.cityPeriods.reduce((sum, period) => {
      return sum + (period.durationDays || 0);
    }, 0);
    
    return totalDays > 0 ? totalDays.toString() : '7-10';
  };

  // Calculate total price including all components
  const calculateTotalPrice = (pkg: AdminPackage) => {
    if (pkg.finalPrice) return pkg.finalPrice;
    
    let total = pkg.basePrice || 0;
    
    // Add hotel costs
    if (pkg.hotels && pkg.hotels.length > 0) {
      pkg.hotels.forEach(hotel => {
        total += hotel.price || 0;
      });
    }
    
    // Add activity costs
    if (pkg.activities && pkg.activities.length > 0) {
      pkg.activities.forEach(activity => {
        total += activity.price || 0;
      });
    }
    
    // Add service costs
    if (pkg.services && pkg.services.length > 0) {
      pkg.services.forEach(service => {
        total += service.price || 0;
      });
    }
    
    // Add transport costs
    if (pkg.transports && pkg.transports.length > 0) {
      pkg.transports.forEach(transport => {
        total += transport.price || 0;
      });
    }
    
    // Apply discount if available
    if (pkg.discountPercent && pkg.discountPercent > 0) {
      total = total * (1 - pkg.discountPercent / 100);
    }
    
    return Math.round(total);
  };

  // Format price with thousands separators
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US');
  };

  // Modal Component
  const PackageModal = () => {
    if (!selectedPackage) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="sticky top-0 bg-white border-b p-6 rounded-t-xl flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedPackage.name}
            </h2>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            {/* Description */}
            {selectedPackage.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600">{selectedPackage.description}</p>
              </div>
            )}

            {/* Pricing */}
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Pricing Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-gray-700">Base Price:</span>
                  <span className="ml-auto font-semibold">${formatPrice(selectedPackage.basePrice || 0)}</span>
                </div>
                {selectedPackage.discountPercent > 0 && (
                  <div className="flex items-center">
                    <Tag className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-gray-700">Discount:</span>
                    <span className="ml-auto font-semibold text-green-600">
                      {selectedPackage.discountPercent}% off
                    </span>
                  </div>
                )}
                <div className="flex items-center md:col-span-2">
                  <span className="text-lg font-bold text-gray-800">Final Price:</span>
                  <span className="ml-auto text-2xl font-bold text-blue-600">
                    ${formatPrice(calculateTotalPrice(selectedPackage))}
                  </span>
                </div>
              </div>
            </div>

            {/* Cities */}
            {selectedPackage.cities && selectedPackage.cities.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Destinations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedPackage.cities.map((city) => (
                    <div key={city.id} className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-gray-800">{city.name}</h4>
                      <p className="text-sm text-gray-600">{city.region}, {city.country}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hotels */}
            {selectedPackage.hotels && selectedPackage.hotels.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Hotel className="w-5 h-5 mr-2 text-blue-600" />
                  Accommodation
                </h3>
                <div className="space-y-3">
                  {selectedPackage.hotels.map((hotel) => (
                    <div key={hotel.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-800">{hotel.name}</h4>
                          <p className="text-sm text-gray-600">
                            {hotel.city.name} • {Array.from({ length: hotel.stars || 4 }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 inline fill-yellow-400" />
                            ))}
                          </p>
                        </div>
                        <span className="font-semibold text-blue-600">${hotel.price}/night</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activities */}
            {selectedPackage.activities && selectedPackage.activities.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Ticket className="w-5 h-5 mr-2 text-blue-600" />
                  Activities
                </h3>
                <div className="space-y-3">
                  {selectedPackage.activities.map((activity) => (
                    <div key={activity.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-800">{activity.name}</h4>
                          <p className="text-sm text-gray-600">{activity.city.name}</p>
                        </div>
                        <span className="font-semibold text-blue-600">${activity.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {selectedPackage.services && selectedPackage.services.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
                  Services
                </h3>
                <div className="space-y-3">
                  {selectedPackage.services.map((service) => (
                    <div key={service.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-800">{service.providerName}</h4>
                          <p className="text-sm text-gray-600">
                            {service.type} • {service.city.name}
                          </p>
                        </div>
                        <span className="font-semibold text-blue-600">${service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Transport */}
            {selectedPackage.transports && selectedPackage.transports.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Car className="w-5 h-5 mr-2 text-blue-600" />
                  Transportation
                </h3>
                <div className="space-y-3">
                  {selectedPackage.transports.map((transport) => (
                    <div key={transport.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-gray-800">{transport.company}</h4>
                          <p className="text-sm text-gray-600">
                            {transport.type} • {transport.city.name}
                          </p>
                        </div>
                        <span className="font-semibold text-blue-600">${transport.price}/day</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Duration */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-600" />
                Trip Duration
              </h3>
              <p className="text-gray-700">
                {calculateTotalDays(selectedPackage)} days
                {selectedPackage.cityPeriods && selectedPackage.cityPeriods.length > 0 && 
                  ' (Flexible dates available)'
                }
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="sticky bottom-0 bg-white border-t p-6 rounded-b-xl">
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => {
                  // Handle booking logic here
                  console.log('Book package:', selectedPackage.id);
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-muted rounded-xl p-6 h-96 animate-pulse">
                  <div className="h-48 bg-muted-foreground/20 rounded-lg mb-4"></div>
                  <div className="h-6 bg-muted-foreground/20 rounded mb-2"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded mb-1"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded mb-1"></div>
                  <div className="h-4 bg-muted-foreground/20 rounded mb-4"></div>
                  <div className="h-10 bg-muted-foreground/20 rounded"></div>
                </div>
              ))}
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
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              Journeys & Rituals
            </h2>
            <div className="w-24 h-px bg-primary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover our curated collection of mystical experiences across Morocco
            </p>
          </div>

          {error && (
            <div className="text-center py-8 bg-destructive/10 rounded-lg mb-8">
              <p className="text-destructive">{error}</p>
              <button 
                onClick={fetchPackages}
                className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center mx-auto"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </button>
            </div>
          )}

          {packages.length > 0 ? (
            <div className="relative">
              {/* Carousel Container */}
              <div className="rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ 
                    transform: `translateX(-${currentIndex * 100}%)`,
                    width: `50%`
                  }}
                >
                  {packages.map((pkg, index) => (
                    <div key={pkg.id || index} className="w-full flex-shrink-0 px-3">
                      <div className="bg-background rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                        {/* Package Image Placeholder with gradient */}
                        <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden flex items-center justify-center">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                          <div className="relative z-10 text-center p-4 text-white">
                            <h3 className="font-serif text-2xl font-bold mb-2">
                              {pkg.name || `Special Package ${pkg.id ? pkg.id.slice(0, 4) : index + 1}`}
                            </h3>
                            <p className="text-sm opacity-90">{pkg.description || 'Experience the magic of Morocco'}</p>
                          </div>
                          <div className="absolute top-4 right-4 flex items-center space-x-2">
                            <div className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                              {pkg.discountPercent ? `Save ${pkg.discountPercent}%` : 'Special Offer'}
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium text-muted-foreground">Featured Package</span>
                            </div>
                            {pkg.status === false && (
                              <span className="px-2 py-1 bg-destructive/10 text-destructive text-xs rounded-full">
                                Unavailable
                              </span>
                            )}
                          </div>

                          <div className="space-y-3 mb-4">
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">
                                {pkg.cities && pkg.cities.length > 0 
                                  ? pkg.cities.map(c => c.name).join(', ')
                                  : 'Multiple destinations'
                                }
                              </span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">{calculateTotalDays(pkg)} days</span>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">Small group experience</span>
                            </div>
                            {pkg.cityPeriods && pkg.cityPeriods.length > 0 && (
                              <div className="flex items-center text-muted-foreground">
                                <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span className="text-sm">Flexible dates</span>
                              </div>
                            )}
                          </div>

                          {/* Included features */}
                          <div className="mb-4">
                            <h4 className="font-semibold text-foreground text-sm mb-2">Includes:</h4>
                            <div className="flex flex-wrap gap-2">
                              {pkg.hotels && pkg.hotels.length > 0 && (
                                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                  {pkg.hotels.length} Hotel{pkg.hotels.length > 1 ? 's' : ''}
                                </span>
                              )}
                              {pkg.activities && pkg.activities.length > 0 && (
                                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                  {pkg.activities.length} Activit{pkg.activities.length > 1 ? 'ies' : 'y'}
                                </span>
                              )}
                              {pkg.services && pkg.services.length > 0 && (
                                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                  {pkg.services.length} Service{pkg.services.length > 1 ? 's' : ''}
                                </span>
                              )}
                              {pkg.transports && pkg.transports.length > 0 && (
                                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                  Transport
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="border-t border-border pt-4">
                            <div className="flex items-center justify-between">
                              <div>
                                {pkg.discountPercent && pkg.discountPercent > 0 ? (
                                  <div className="flex items-center">
                                    <span className="text-2xl font-bold text-primary">
                                      ${formatPrice(calculateTotalPrice(pkg))}
                                    </span>
                                    <span className="text-muted-foreground text-sm line-through ml-2">
                                      ${formatPrice(pkg.basePrice || 0)}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="text-2xl font-bold text-primary">
                                    ${formatPrice(calculateTotalPrice(pkg))}
                                  </span>
                                )}
                                <span className="text-muted-foreground text-sm ml-1">per person</span>
                              </div>
                              <button 
                                onClick={() => openModal(pkg)}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={pkg.status === false}
                              >
                                {pkg.status === false ? 'Unavailable' : 'View Details'}
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
              {packages.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg z-10"
                    aria-label="Previous package"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg z-10"
                    aria-label="Next package"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {packages.length > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {packages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentIndex === index ? 'bg-primary' : 'bg-muted'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            !error && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No special packages available at the moment. Check back soon for exciting new journeys!
                </p>
                <button 
                  onClick={fetchPackages}
                  className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center mx-auto"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Packages
                </button>
              </div>
            )
          )}

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium">
              Explore All Packages
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <PackageModal />}
    </section>
  );
};

export default SpecialPackagesSection;