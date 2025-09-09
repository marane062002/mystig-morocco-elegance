import { useState, useEffect } from 'react';
import {
  User, Mail, Phone, Baby, Plus, Minus, X, CheckCircle, AlertCircle,
  MapPin, Star, DollarSign
} from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  City,
  Activity,
  Gender,
  DemandStatus,
  Traveler,
  MainTraveler,
  ClientInfo,
  DemandCity,
  Demand
} from '@/types/travel';
import { activitiesAPI, citiesAPI, demandsAPI } from '@/services/travel-programs-api';

interface PlanAFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CitySelectionForm {
  cityId: string;
  startDate: string;
  endDate: string;
  duration: number;
  activityIds: string[];
}

const PlanAForm = ({ isOpen, onClose }: PlanAFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cities, setCities] = useState<City[]>([]);
  const [activities, setActivities] = useState<{ [cityId: string]: Activity[] }>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dateError, setDateError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    mainTraveler: {
      fullName: '',
      email: '',
      phone: ''
    },
    numberOfAdults: 1,
    numberOfChildren: 0,
    childAges: [] as number[],
    selectedCities: [] as string[],
    citySelections: {} as { [cityId: string]: CitySelectionForm },
    comment: '',
    tripStartDate: '',
    tripEndDate: ''
  });

  useEffect(() => {
    if (isOpen) {
      fetchCities();
      updateChildAges(formData.numberOfChildren);
    }
    // eslint-disable-next-line
  }, [isOpen, formData.numberOfChildren]);

  const updateChildAges = (count: number) => {
    setFormData(prev => ({
      ...prev,
      childAges: Array(count).fill(8).map((age, i) => prev.childAges[i] ?? age)
    }));
  };

  const fetchCities = async () => {
    try {
      const citiesData = await citiesAPI.getAll();
      setCities(citiesData);
    } catch (error) {
      console.error('Failed to fetch cities:', error);
      const fallbackCities: City[] = [
        { id: '1', name: 'Marrakech', region: 'Marrakech-Safi', country: 'Morocco', enabled: true },
        { id: '2', name: 'Fes', region: 'Fes-Meknes', country: 'Morocco', enabled: true },
        { id: '3', name: 'Casablanca', region: 'Casablanca-Settat', country: 'Morocco', enabled: true },
        { id: '4', name: 'Chefchaouen', region: 'Tanger-Tetouan-Al Hoceima', country: 'Morocco', enabled: true },
      ];
      setCities(fallbackCities);
    }
  };

  const fetchActivitiesForCity = async (cityId: string) => {
    try {
      setLoading(true);
      const activitiesData = await activitiesAPI.getAll(cityId);
      setActivities(prev => ({ ...prev, [cityId]: activitiesData }));
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      setActivities(prev => ({ ...prev, [cityId]: [] }));
    } finally {
      setLoading(false);
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

  const validateDateSequence = (): boolean => {
    const selections = Object.values(formData.citySelections);
    if (selections.length < 2) {
      setDateError(null);
      return true;
    }
    const sortedSelections = selections.sort((a, b) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    for (let i = 0; i < sortedSelections.length - 1; i++) {
      const currentCity = sortedSelections[i];
      const nextCity = sortedSelections[i + 1];
      const currentEndDate = new Date(currentCity.endDate);
      const nextStartDate = new Date(nextCity.startDate);
      if (currentEndDate.toDateString() !== nextStartDate.toDateString()) {
        const currentCityName = cities.find(c => c.id === currentCity.cityId)?.name;
        const nextCityName = cities.find(c => c.id === nextCity.cityId)?.name;
        setDateError(`Décalage détecté : Départ de ${currentCityName} le ${currentEndDate.toLocaleDateString('fr-FR')} mais arrivée à ${nextCityName} le ${nextStartDate.toLocaleDateString('fr-FR')}. Les dates doivent être continues.`);
        return false;
      }
    }
    setDateError(null);
    return true;
  };

  const getMinStartDateForCity = (cityId: string): string => {
    const selections = Object.values(formData.citySelections);
    const currentSelection = formData.citySelections[cityId];
    if (!currentSelection) return '';
    const sortedSelections = selections.sort((a, b) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    const currentIndex = sortedSelections.findIndex(s => s.cityId === cityId);
    if (currentIndex > 0) {
      const previousSelection = sortedSelections[currentIndex - 1];
      return previousSelection.endDate;
    }
    return '';
  };

  const handleNumberOfAdultsChange = (count: number) => {
    if (count < 1) return;
    setFormData(prev => ({
      ...prev,
      numberOfAdults: count
    }));
  };

  const handleNumberOfChildrenChange = (count: number) => {
    if (count < 0) return;
    setFormData(prev => ({
      ...prev,
      numberOfChildren: count
    }));
    setTimeout(() => updateChildAges(count), 0);
  };

  const updateChildAge = (index: number, value: number) => {
    setFormData(prev => {
      const newAges = [...prev.childAges];
      newAges[index] = value;
      return { ...prev, childAges: newAges };
    });
  };

  const handleCitySelection = (cityId: string, checked: boolean) => {
    setFormData(prev => {
      const selectedCities = checked
        ? [...prev.selectedCities, cityId]
        : prev.selectedCities.filter(id => id !== cityId);
      const citySelections = { ...prev.citySelections };
      if (checked && !citySelections[cityId]) {
        citySelections[cityId] = {
          cityId,
          startDate: prev.tripStartDate,
          endDate: prev.tripStartDate,
          duration: 0,
          activityIds: []
        };
        fetchActivitiesForCity(cityId);
      }
      if (!checked) {
        delete citySelections[cityId];
      }
      return { ...prev, selectedCities, citySelections };
    });
  };

  const updateCitySelection = (cityId: string, field: keyof CitySelectionForm, value: any) => {
    setFormData(prev => {
      const citySelections = { ...prev.citySelections };
      const selection = citySelections[cityId] || {
        cityId,
        startDate: prev.tripStartDate,
        endDate: prev.tripStartDate,
        duration: 0,
        activityIds: []
      };
      selection[field] = value;
      if (field === 'startDate' || field === 'endDate') {
        selection.duration = calculateDuration(selection.startDate, selection.endDate);
      }
      citySelections[cityId] = selection;
      return { ...prev, citySelections };
    });
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Basic validation - phone should be at least 10 digits
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10;
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      mainTraveler: { ...prev.mainTraveler, phone: value }
    }));
    
    // Validate phone number
    if (value && !validatePhoneNumber(value)) {
      setPhoneError('Veuillez entrer un numéro de téléphone valide');
    } else {
      setPhoneError(null);
    }
  };

  const isStep1Valid = (): boolean => {
    if (!formData.mainTraveler.fullName || !formData.mainTraveler.email || !formData.mainTraveler.phone) {
      return false;
    }
    if (phoneError) {
      return false;
    }
    return formData.childAges.every(age => age > 0);
  };

  const isStep2Valid = (): boolean => {
    if (!formData.tripStartDate || !formData.tripEndDate) return false;
    return formData.selectedCities.length > 0 &&
      Object.values(formData.citySelections).every(selection =>
        selection.startDate &&
        selection.endDate &&
        selection.duration > 0 &&
        selection.startDate >= formData.tripStartDate &&
        selection.endDate <= formData.tripEndDate
      ) &&
      !dateError;
  };

  const handleSubmit = async () => {
    if (!validateDateSequence()) {
      alert('Veuillez corriger le décalage entre les dates avant de soumettre.');
      return;
    }
    setSubmitting(true);
    try {
      // Prepare travelers array: adults + children (only age)
      const travelers: Traveler[] = [
        ...Array(formData.numberOfAdults).fill({}),
        ...formData.childAges.map(age => ({ age }))
      ];
      const clientInfo: ClientInfo = {
        mainTraveler: formData.mainTraveler,
        travelers,
        tripPeriod: calculateTripPeriod(),
        tripStartDate: formData.tripStartDate,
        tripEndDate: formData.tripEndDate
      };
      const demandCities: DemandCity[] = formData.selectedCities.map(cityId => {
        const selection = formData.citySelections[cityId];
        const city = cities.find(c => c.id === cityId);
        const cityActivities = activities[cityId]?.filter(a =>
          selection.activityIds.includes(a.id)
        ) || [];
        return {
          city: city!,
          startDate: selection.startDate,
          endDate: selection.endDate,
          durationDays: selection.duration,
          activities: cityActivities,
          roomSelections: []
        };
      });
      await demandsAPI.createClientDemand(
        clientInfo,
        demandCities,
        formData.comment
      );
      setFormData({
        mainTraveler: { fullName: '', email: '', phone: '' },
        numberOfAdults: 1,
        numberOfChildren: 0,
        childAges: [],
        selectedCities: [],
        citySelections: {},
        comment: '',
        tripStartDate: '',
        tripEndDate: ''
      });
      setCurrentStep(1);
      setDateError(null);
      onClose();
      alert('Votre demande a été envoyée avec succès! Nous vous contactons sous 72h maximum.');
    } catch (error) {
      console.error('Submit error:', error);
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 2 && !validateDateSequence()) {
      alert('Veuillez corriger le décalage entre les dates avant de continuer.');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Plan A - Custom Program</h2>
              <p className="text-gray-600">Create your customized trip</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
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
          {/* Step 1 - Traveler Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-blue-500" />
                Traveler Information
              </h3>
              {/* Main Traveler */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-500" />
                  Main Traveler (Contact)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.mainTraveler.fullName}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        mainTraveler: { ...prev.mainTraveler, fullName: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.mainTraveler.email}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        mainTraveler: { ...prev.mainTraveler, email: e.target.value }
                      }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                    <PhoneInput
                      country={'ma'}
                      preferredCountries={['ma', 'fr', 'es', 'us']}
                      value={formData.mainTraveler.phone}
                      onChange={handlePhoneChange}
                      inputProps={{
                        name: 'phone',
                        required: true,
                        className: 'w-full px-4 py-3 pl-16 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none'
                      }}
                      containerClass="w-full"
                      buttonClass="!border-2 !border-gray-200 !rounded-l-xl !bg-white hover:!bg-gray-50"
                      dropdownClass="!bg-white !border !border-gray-200 !rounded-lg !shadow-lg"
                      searchClass="!bg-gray-50 !border !border-gray-200 !rounded-lg !mx-2 !my-2"
                      placeholder="Enter your phone number"
                    />
                    {phoneError && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {phoneError}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Number of Travelers */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-4">Number of Travelers</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Adults */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h5 className="font-semibold text-gray-700 mb-3 flex items-center">
                      <User className="w-4 h-4 mr-2 text-blue-500" />
                      Number of adults
                    </h5>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleNumberOfAdultsChange(formData.numberOfAdults - 1)}
                        disabled={formData.numberOfAdults <= 1}
                        className="p-2 bg-gray-200 rounded-lg disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-bold">{formData.numberOfAdults} adult(s)</span>
                      <button
                        onClick={() => handleNumberOfAdultsChange(formData.numberOfAdults + 1)}
                        className="p-2 bg-gray-200 rounded-lg"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {/* Children */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h5 className="font-semibold text-gray-700 mb-3 flex items-center">
                      <Baby className="w-4 h-4 mr-2 text-orange-500" />
                      Number of children
                    </h5>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleNumberOfChildrenChange(formData.numberOfChildren - 1)}
                        disabled={formData.numberOfChildren <= 0}
                        className="p-2 bg-gray-200 rounded-lg disabled:opacity-50"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-bold">{formData.numberOfChildren} child(ren)</span>
                      <button
                        onClick={() => handleNumberOfChildrenChange(formData.numberOfChildren + 1)}
                        className="p-2 bg-gray-200 rounded-lg"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Total: {formData.numberOfAdults + formData.numberOfChildren} traveler(s)</p>
                </div>
              </div>
              {/* Children information */}
              {formData.numberOfChildren > 0 && (
                <div className="space-y-4">
                  {formData.childAges.map((age, index) => (
                    <div key={index} className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                      <h5 className="font-bold text-gray-800 mb-4 flex items-center">
                        <Baby className="w-5 h-5 mr-2 text-orange-500" />
                        Child {index + 1}
                      </h5>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                        <input
                          type="number"
                          value={age}
                          onChange={e => updateChildAge(index, Number(e.target.value))}
                          min="0"
                          max="17"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Trip dates */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-4">Trip Duration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">From *</label>
                    <input
                      type="date"
                      value={formData.tripStartDate}
                      onChange={e => setFormData(prev => ({ ...prev, tripStartDate: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">To *</label>
                    <input
                      type="date"
                      value={formData.tripEndDate}
                      min={formData.tripStartDate}
                      onChange={e => setFormData(prev => ({ ...prev, tripEndDate: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <button
                  onClick={nextStep}
                  disabled={!isStep1Valid()}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                    !isStep1Valid()
                      ? 'bg-blue-100 text-blue-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  Next Step
                </button>
              </div>
            </div>
          )}
          {/* Step 2 - City Selection */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-blue-500" />
                City Selection
              </h3>
              {dateError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center space-x-2 text-red-800">
                    <AlertCircle className="w-5 h-5" />
                    <p className="font-semibold">{dateError}</p>
                  </div>
                </div>
              )}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">Choose your destinations *</label>
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
              {formData.selectedCities.map((cityId) => {
                const city = cities.find(c => c.id === cityId);
                const selection = formData.citySelections[cityId];
                const cityActivities = activities[cityId] || [];
                const minStartDate = getMinStartDateForCity(cityId);
                return (
                  <div key={cityId} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                      {city?.name}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Arrival Date *</label>
                        <input
                          type="date"
                          value={selection?.startDate || ''}
                          onChange={(e) => updateCitySelection(cityId, 'startDate', e.target.value)}
                          min={formData.tripStartDate}
                          max={formData.tripEndDate}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                          required
                        />
                        {minStartDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Min: {new Date(minStartDate).toLocaleDateString('en-US')}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Departure Date *</label>
                        <input
                          type="date"
                          value={selection?.endDate || ''}
                          onChange={(e) => updateCitySelection(cityId, 'endDate', e.target.value)}
                          min={selection?.startDate || formData.tripStartDate}
                          max={formData.tripEndDate}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                        <input
                          type="text"
                          value={`${selection?.duration || 0} nights`}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 cursor-not-allowed"
                          disabled
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-4 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        Available activities in {city?.name}
                      </label>
                      {loading ? (
                        <div className="text-center py-4">
                          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                          <p className="mt-2 text-gray-500">Loading activities...</p>
                        </div>
                      ) : cityActivities.length === 0 ? (
                        <div className="text-center py-6 bg-white rounded-lg border border-dashed border-gray-300">
                          <p className="text-gray-500">No activities available for this city</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {cityActivities.map((activity) => (
                            <div key={activity.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                              <div className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-gray-800">{activity.name}</h5>
                                    {/* <div className="flex items-center mt-1">
                                      <DollarSign className="w-4 h-4 text-green-600" />
                                      <span className="text-green-600 font-medium ml-1">{activity.price} MAD</span>
                                    </div> */}
                                  </div>
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
                                    className="h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                </div>
                                <p className="text-gray-600 text-sm">{activity.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-end mt-8">
                <button
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 font-semibold mr-4 transition-all duration-300 hover:bg-gray-300"
                >
                  Previous Step
                </button>
                <button
                  onClick={nextStep}
                  disabled={!isStep2Valid() || submitting}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                    !isStep2Valid() || submitting
                      ? 'bg-blue-100 text-blue-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Next Step'
                  )}
                </button>
              </div>
            </div>
          )}
          {/* Step 3 - Review & Submit */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
                Request Summary
              </h3>
              {/* Traveler Information Summary */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-bold text-gray-800 mb-4">Main Traveler Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-sm font-semibold text-gray-700">Full Name:</span>
                    <span className="block text-gray-800">{formData.mainTraveler.fullName}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-gray-700">Email:</span>
                    <span className="block text-gray-800">{formData.mainTraveler.email}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-gray-700">Phone:</span>
                    <span className="block text-gray-800">{formData.mainTraveler.phone}</span>
                  </div>
                </div>
              </div>
              {/* Travelers Details */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-4">Traveler Details</h4>
                <div>
                  <span className="block text-sm font-semibold text-gray-700 mb-2">Adults:</span>
                  <span className="block text-gray-800 mb-4">{formData.numberOfAdults} adult(s)</span>
                  <span className="block text-sm font-semibold text-gray-700 mb-2">Children:</span>
                  <span className="block text-gray-800">
                    {formData.childAges.length > 0
                      ? formData.childAges.map((age, idx) => `Child ${idx + 1}: ${age} years old`).join(', ')
                      : 'None'}
                  </span>
                </div>
              </div>
              {/* Trip Dates Summary */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-4">Trip Dates</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="block text-sm font-semibold text-gray-700">Start Date:</span>
                    <span className="block text-gray-800">{formData.tripStartDate ? new Date(formData.tripStartDate).toLocaleDateString('en-US') : ''}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-gray-700">End Date:</span>
                    <span className="block text-gray-800">{formData.tripEndDate ? new Date(formData.tripEndDate).toLocaleDateString('en-US') : ''}</span>
                  </div>
                </div>
              </div>
              {/* Cities and Activities Summary */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-4">Selected Cities and Activities</h4>
                {formData.selectedCities.map(cityId => {
                  const city = cities.find(c => c.id === cityId);
                  const selection = formData.citySelections[cityId];
                  const cityActivities = activities[cityId]?.filter(a => selection.activityIds.includes(a.id)) || [];
                  return (
                    <div key={cityId} className="mb-4">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                        <span className="font-semibold text-gray-800">{city?.name}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <span className="block text-sm font-semibold text-gray-700">Arrival Date:</span>
                          <span className="block text-gray-800">{selection.startDate ? new Date(selection.startDate).toLocaleDateString('en-US') : ''}</span>
                        </div>
                        <div>
                          <span className="block text-sm font-semibold text-gray-700">Departure Date:</span>
                          <span className="block text-gray-800">{selection.endDate ? new Date(selection.endDate).toLocaleDateString('en-US') : ''}</span>
                        </div>
                        <div>
                          <span className="block text-sm font-semibold text-gray-700">Duration:</span>
                          <span className="block text-gray-800">{selection.duration} nights</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <span className="block text-sm font-semibold text-gray-700 mb-2">Activities:</span>
                        <ul className="list-disc list-inside">
                          {cityActivities.length > 0 ? (
                            cityActivities.map(activity => (
                              <li key={activity.id} className="text-gray-800">
                                {activity.name} 
                                {/* - <span className="text-green-600 font-medium">{activity.price} MAD</span>  */}
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500">No activities selected</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Comments Section */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-4">Additional comments</h4>
                <textarea
                  value={formData.comment}
                  onChange={e => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  placeholder="Add a comment or special request..."
                />
              </div>
              <div className="flex justify-end mt-8">
                <button
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 font-semibold mr-4 transition-all duration-300 hover:bg-gray-300"
                >
                  Previous Step
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                    submitting
                      ? 'bg-blue-100 text-blue-500 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanAForm;