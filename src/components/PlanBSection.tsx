import { useState, useEffect } from 'react';
import { Star, MapPin, Calendar, Users, ArrowRight, Package, Sparkles } from 'lucide-react';
import { AdminPackage } from '@/types/travel';
import { specialPackagesAPI } from '@/services/travel-programs-api';
import { useCart } from '@/contexts/CartContext';

const PlanBSection = () => {
  const [packages, setPackages] = useState<AdminPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const data = await specialPackagesAPI.getAll();
      setPackages(data.filter((pkg: AdminPackage) => pkg.isActive));
    } catch (error) {
      console.error('Failed to fetch special packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (pkg: AdminPackage) => {
    addItem({
      id: pkg.id,
      name: pkg.title,
      price: pkg.finalPrice,
      currency: pkg.currency,
      type: 'package',
      description: pkg.description
    });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
              Plan B - Offres Spéciales
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez nos forfaits exclusifs avec des tarifs préférentiels
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <p className="mt-4 text-muted-foreground">Chargement des offres...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className="group bg-white rounded-2xl border border-purple-200 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Package Header */}
                <div className="relative p-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                  <h3 className="font-bold text-xl mb-2">{pkg.title}</h3>
                  <p className="text-purple-100 text-sm">{pkg.description}</p>
                </div>

                {/* Package Content */}
                <div className="p-6">
                  {/* Cities */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                      Destinations
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.cities.slice(0, 3).map((cityId, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs">
                          Ville {idx + 1}
                        </span>
                      ))}
                      {pkg.cities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                          +{pkg.cities.length - 3} autres
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                      Durée
                    </h4>
                     <p className="text-gray-600 text-sm">
                       {pkg.cityDateRanges.reduce((total, range) => total + range.duration, 0)} nuitées
                     </p>
                  </div>

                  {/* Activities */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Expériences incluses
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {pkg.activities.length} Expériences sélectionnées
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600 text-sm">Prix de base:</span>
                      <span className="text-gray-600 line-through">{pkg.basePrice} {pkg.currency}</span>
                    </div>
                     <div className="flex items-center justify-between mb-2">
                       <span className="text-green-600 text-sm font-semibold">Remise {pkg.discountPercentage}%:</span>
                       <span className="text-green-600 font-semibold">
                         -{(pkg.basePrice * pkg.discountPercentage / 100).toFixed(0)} {pkg.currency}
                       </span>
                     </div>
                    <div className="flex items-center justify-between border-t border-purple-200 pt-2">
                      <span className="font-bold text-gray-800">Prix final:</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {pkg.finalPrice} {pkg.currency}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleAddToCart(pkg)}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 rounded-xl hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <span>Ajouter au panier</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <button className="w-full flex items-center justify-center space-x-2 bg-white border-2 border-purple-200 text-purple-600 py-3 rounded-xl hover:bg-purple-50 transition-all duration-300">
                      <span>Voir les détails</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {packages.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Aucune offre spéciale disponible</h3>
            <p className="text-muted-foreground">Revenez bientôt pour découvrir nos prochaines offres!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlanBSection;