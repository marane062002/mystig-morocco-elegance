import { useState, useEffect } from 'react';
import { User, Mail, Phone, Users, Calendar, MapPin, Clock, ChevronRight, ChevronLeft, Send, CheckCircle } from 'lucide-react';
import { DemandStatus, City, Activity, CitySelection, ClientDemand } from '@/types/travel';
import { citiesAPI, activitiesAPI, demandsAPI } from '@/services/travel-programs-api';

interface PlanAFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlanAForm = ({ isOpen, onClose }: PlanAFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cities, setCities] = useState<City[]>([]);
  const [activities, setActivities] = useState<{ [cityId: string]: Activity[] }>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    numberOfTravelers: 1,
    selectedCities: [] as string[],
    citySelections: {} as { [cityId: string]: CitySelection }
  });

  useEffect(() => {
    if (isOpen) {
      fetchCities();
    }
  }, [isOpen]);

  const fetchCities = async () => {
    try {
      const citiesData = await citiesAPI.getAll();
      setCities(citiesData);
    } catch (error) {
      console.error('Failed to fetch cities:', error);
    }
  };

  const fetchActivitiesForCity = async (cityId: string) => {
    try {
      const activitiesData = await activitiesAPI.getAll(cityId);
      setActivities(prev => ({ ...prev, [cityId]: activitiesData }));
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    }
  };

  const calculateDuration = (startDate: string, endDate: string): number => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTripPeriod = (): number => {
    return Object.values(formData.citySelections).reduce((total, selection) => {
      return total + (selection.duration || 0);
    }, 0);
  };

  const handleCitySelection = (cityId: string, selected: boolean) => {
    if (selected) {
      setFormData(prev => ({
        ...prev,
        selectedCities: [...prev.selectedCities, cityId],
        citySelections: {
          ...prev.citySelections,
            [cityId]: {
              cityId,
              startDate: '',
              endDate: '',
              duration: 0,
              activityIds: []
            }
        }
      }));
      fetchActivitiesForCity(cityId);
    } else {
      setFormData(prev => ({
        ...prev,
        selectedCities: prev.selectedCities.filter(id => id !== cityId),
        citySelections: Object.fromEntries(
          Object.entries(prev.citySelections).filter(([id]) => id !== cityId)
        )
      }));
    }
  };

  const updateCitySelection = (cityId: string, field: string, value: any) => {
    setFormData(prev => {
      const updated = {
        ...prev,
        citySelections: {
          ...prev.citySelections,
          [cityId]: {
            ...prev.citySelections[cityId],
            [field]: value
          }
        }
      };

      // Auto-calculate duration if dates change
      if (field === 'startDate' || field === 'endDate') {
        const selection = updated.citySelections[cityId];
        if (selection.startDate && selection.endDate) {
          selection.duration = calculateDuration(selection.startDate, selection.endDate);
        }
      }

      return updated;
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Build cities array for backend
      const demandCities = Object.values(formData.citySelections).map(selection => {
        const cityObj = cities.find(c => c.id === selection.cityId);
        if (!cityObj) {
          throw new Error(`City not found for id: ${selection.cityId}`);
        }
        return {
          city: cityObj,
          startDate: selection.startDate,
          endDate: selection.endDate,
          durationDays: selection.duration,
          activities: (activities[selection.cityId] ?? [])
            .filter(a => selection.activityIds.includes(a.id)),
          services: [],
          selectedHotel: undefined,
          selectedTransport: undefined
        };
      });

      const demand: Partial<ClientDemand> = {
        clientInfo: {
          fullName: formData.clientName,
          email: formData.email,
          phone: formData.phone,
          numberOfTravelers: formData.numberOfTravelers,
          tripPeriod: calculateTripPeriod()
        },
        citySelections: Object.values(formData.citySelections),
        status: DemandStatus.PENDING,
        totalPrice: 0
      };

      console.log('Demand payload:', demand);

      await demandsAPI.create(demand);

      // Reset form and close
      setFormData({
        clientName: '',
        email: '',
        phone: '',
        numberOfTravelers: 1,
        selectedCities: [],
        citySelections: {}
      });
      setCurrentStep(1);
      onClose();

      alert('Votre demande a été envoyée avec succès! Nous vous contactons sous 24h.');
    } catch (error) {
      console.error('Submit error:', error);
      if (error.response) {
        console.error('API response:', error.response);
      }
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const isStep1Valid = () => {
    return formData.clientName && formData.email && formData.phone && formData.numberOfTravelers > 0;
  };

  const isStep2Valid = () => {
    return formData.selectedCities.length > 0 && 
           Object.values(formData.citySelections).every(selection => 
             selection.startDate && selection.endDate && selection.duration > 0
           );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Plan A - Programme Personnalisé</h2>
              <p className="text-gray-600">Créez votre voyage sur mesure</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ×
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6 flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Step 1 - Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-blue-500" />
                Informations Personnelles
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300"
                    placeholder="Votre nom complet"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300"
                    placeholder="votre@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300"
                    placeholder="+212 6XX XXX XXX"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre de voyageurs *
                  </label>
                  <input
                    type="number"
                    value={formData.numberOfTravelers}
                    onChange={(e) => setFormData(prev => ({ ...prev, numberOfTravelers: Number(e.target.value) }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300"
                    min="1"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Durée du voyage (calculée automatiquement)
                  </label>
                  <input
                    type="text"
                    value={`${calculateTripPeriod()} jours`}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed"
                    disabled
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Select Cities */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-500" />
                Sélection des Villes
              </h3>

              {/* Cities Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Choisissez vos destinations *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cities.map((city) => (
                    <div key={city.id} className="relative">
                      <input
                        type="checkbox"
                        id={`city-${city.id}`}
                        checked={formData.selectedCities.includes(city.id)}
                        onChange={(e) => handleCitySelection(city.id, e.target.checked)}
                        className="sr-only"
                      />
                      <label
                        htmlFor={`city-${city.id}`}
                        className={`block p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          formData.selectedCities.includes(city.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            formData.selectedCities.includes(city.id)
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {formData.selectedCities.includes(city.id) && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-800">{city.name}</h4>
                            <p className="text-sm text-gray-600">{city.region}</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* City Details Forms */}
              {formData.selectedCities.map((cityId) => {
                const city = cities.find(c => c.id === cityId);
                const selection = formData.citySelections[cityId];
                const cityActivities = activities[cityId] || [];

                return (
                  <div key={cityId} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                      {city?.name}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Date d'arrivée *
                        </label>
                        <input
                          type="date"
                          value={selection?.startDate || ''}
                          onChange={(e) => updateCitySelection(cityId, 'startDate', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Date de départ *
                        </label>
                        <input
                          type="date"
                          value={selection?.endDate || ''}
                          onChange={(e) => updateCitySelection(cityId, 'endDate', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Durée (calculée)
                        </label>
                        <input
                          type="text"
                          value={`${selection?.duration || 0} jours`}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 cursor-not-allowed"
                          disabled
                        />
                      </div>
                    </div>

                    {/* Activities Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Activités souhaitées
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {cityActivities.map((activity) => (
                          <div key={activity.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`activity-${activity.id}`}
                              checked={selection?.activityIds.includes(activity.id) || false}
                              onChange={(e) => {
                                const currentActivities = selection?.activityIds || [];
                                const newActivities = e.target.checked
                                  ? [...currentActivities, activity.id]
                                  : currentActivities.filter(id => id !== activity.id);
                                updateCitySelection(cityId, 'activityIds', newActivities);
                              }}
                              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={`activity-${activity.id}`} className="text-sm text-gray-700 cursor-pointer">
                              {activity.name} ({activity.price} {activity.currency})
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Step 3 - Submit */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Send className="w-6 h-6 mr-2 text-blue-500" />
                Récapitulatif de votre demande
              </h3>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-4">Informations personnelles</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <p><span className="font-semibold">Nom:</span> {formData.clientName}</p>
                  <p><span className="font-semibold">Email:</span> {formData.email}</p>
                  <p><span className="font-semibold">Téléphone:</span> {formData.phone}</p>
                  <p><span className="font-semibold">Voyageurs:</span> {formData.numberOfTravelers}</p>
                  <p><span className="font-semibold">Durée totale:</span> {calculateTripPeriod()} jours</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-800">Villes sélectionnées</h4>
                {Object.values(formData.citySelections).map((selection) => {
                  const city = cities.find(c => c.id === selection.cityId);
                  const selectedActivities = activities[selection.cityId]?.filter(a => 
                    selection.activityIds.includes(a.id)
                  ) || [];

                  return (
                    <div key={selection.cityId} className="bg-gray-50 rounded-xl p-4 border">
                      <h5 className="font-bold text-gray-800 mb-2">{city?.name}</h5>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                        <p><span className="font-semibold">Arrivée:</span> {new Date(selection.startDate).toLocaleDateString('fr-FR')}</p>
                        <p><span className="font-semibold">Départ:</span> {new Date(selection.endDate).toLocaleDateString('fr-FR')}</p>
                        <p><span className="font-semibold">Durée:</span> {selection.duration} jours</p>
                      </div>
                      {selectedActivities.length > 0 && (
                        <div>
                          <p className="font-semibold text-gray-700 mb-1">Activités:</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedActivities.map((activity) => (
                              <span key={activity.id} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs">
                                {activity.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <p className="text-green-800">
                  <span className="font-semibold">Note:</span> Après soumission, notre équipe vous contactera 
                  sous 24h pour finaliser votre programme avec les hôtels, transports et services adaptés.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200 mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Précédent</span>
            </button>

            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                disabled={currentStep === 1 ? !isStep1Valid() : !isStep2Valid()}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Suivant</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center space-x-2 px-8 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-300 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                <span>{submitting ? 'Envoi...' : 'Envoyer la demande'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanAForm;