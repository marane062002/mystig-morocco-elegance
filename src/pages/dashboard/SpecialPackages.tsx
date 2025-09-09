import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  MapPin, 
  DollarSign, 
  Star,
  X,
  Save,
  Percent,
  Calendar
} from 'lucide-react';
import { SpecialPackage, City, Activity, ServiceOffering, Hotel, Transport, PackageCityPeriod } from '@/models/travel-programs';
import { 
  packagesAPI, 
  citiesAPI, 
  activitiesAPI, 
  servicesAPI,
  hotelsAPI,
  transportsAPI 
} from '@/services/travel-programs-api';

const defaultForm: Partial<SpecialPackage> = {
  name: '',
  description: '',
  cities: [],
  hotels: [],
  activities: [],
  services: [],
  transports: [],
  basePrice: 0,
  discountPercent: 0,
  finalPrice: 0,
  status: true,
  totalPeriodDays: 0,
  cityPeriods: [],
};

type CityResourceSelections = {
  [cityId: string]: {
    hotels: string[];
    activities: string[];
    services: string[];
    transports: string[];
    periodDays: number;
  }
};

const SpecialPackages = () => {
  const [packages, setPackages] = useState<SpecialPackage[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [services, setServices] = useState<ServiceOffering[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [transports, setTransports] = useState<Transport[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<SpecialPackage | null>(null);
  const [form, setForm] = useState<Partial<SpecialPackage>>(defaultForm);
  const [citySelections, setCitySelections] = useState<CityResourceSelections>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [packagesData, citiesData, activitiesData, servicesData, hotelsData, transportsData] = await Promise.all([
        packagesAPI.getAll().catch(() => []),
        citiesAPI.getAll().catch(() => []),
        activitiesAPI.getAll().catch(() => []),
        servicesAPI.getAll().catch(() => []),
        hotelsAPI.getAll().catch(() => []),
        transportsAPI.getAll().catch(() => [])
      ]);
      setPackages(Array.isArray(packagesData) ? packagesData : []);
      setCities(Array.isArray(citiesData) ? citiesData : []);
      setActivities(Array.isArray(activitiesData) ? activitiesData : []);
      setServices(Array.isArray(servicesData) ? servicesData : []);
      setHotels(Array.isArray(hotelsData) ? hotelsData : []);
      setTransports(Array.isArray(transportsData) ? transportsData : []);
    } catch (err) {
      setError('Failed to fetch data');
      setPackages([]);
      setCities([]);
      setActivities([]);
      setServices([]);
      setHotels([]);
      setTransports([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate price based on selected resources and periods
  const calculateBasePrice = (): number => {
    let total = 0;
    Object.entries(citySelections).forEach(([cityId, sel]) => {
      const periodDays = sel.periodDays || 1;
      
      // Calculate hotel cost (per night)
      const hotelCost = sel.hotels
        .map(hid => hotels.find(h => h.id === hid)?.price || 0)
        .reduce((a, b) => a + b, 0) * periodDays;

      // Activities, services, transports are one-time costs
      const activityCost = sel.activities
        .map(aid => activities.find(a => a.id === aid)?.price || 0)
        .reduce((a, b) => a + b, 0);

      const serviceCost = sel.services
        .map(sid => services.find(s => s.id === sid)?.price || 0)
        .reduce((a, b) => a + b, 0);

      const transportCost = sel.transports
        .map(tid => transports.find(t => t.id === tid)?.price || 0)
        .reduce((a, b) => a + b, 0);

      total += hotelCost + activityCost + serviceCost + transportCost;
    });
    return total;
  };

  const calculateFinalPrice = (): number => {
    const basePrice = calculateBasePrice();
    const discount = basePrice * (form.discountPercent || 0) / 100;
    return basePrice - discount;
  };

  const calculateTotalPeriodDays = (): number => {
    return Object.values(citySelections)
      .reduce((total, sel) => total + (sel.periodDays || 0), 0);
  };

  const updateForm = (field: string, value: any) => {
    setForm(prev => {
      const arrayFields = ['cities', 'hotels', 'activities', 'services', 'transports'];
      if (arrayFields.includes(field) && !Array.isArray(value)) {
        value = [];
      }
      const updated = { ...prev, [field]: value };
      updated.basePrice = calculateBasePrice();
      updated.finalPrice = calculateFinalPrice();
      updated.totalPeriodDays = calculateTotalPeriodDays();
      return updated;
    });
  };

  // Handle city selection and initialize citySelections
  const handleCitySelection = (cityId: string, checked: boolean) => {
    let newCities = (form.cities as City[]) || [];
    if (checked) {
      newCities = [...newCities, cities.find(c => c.id === cityId)!];
      setCitySelections(prev => ({
        ...prev,
        [cityId]: prev[cityId] || { 
          hotels: [], 
          activities: [], 
          services: [], 
          transports: [],
          periodDays: 1 
        }
      }));
    } else {
      newCities = newCities.filter(c => c.id !== cityId);
      setCitySelections(prev => {
        const updated = { ...prev };
        delete updated[cityId];
        return updated;
      });
    }
    updateForm('cities', newCities);
  };

  // Handle per-city resource selection
  const handleResourceSelection = (
    cityId: string,
    type: keyof CityResourceSelections[string],
    resourceId: string,
    checked: boolean
  ) => {
    setCitySelections(prev => {
      const citySel = prev[cityId] || { 
        hotels: [], 
        activities: [], 
        services: [], 
        transports: [],
        periodDays: 1 
      };
      const arr = citySel[type];
      const currentArr = Array.isArray(arr) ? arr : [];
      const newArr = checked ? [...currentArr, resourceId] : currentArr.filter(id => id !== resourceId);
      return {
        ...prev,
        [cityId]: { ...citySel, [type]: newArr }
      };
    });
  };

  // Handle period change for each city
  const handlePeriodChange = (cityId: string, periodDays: number) => {
    setCitySelections(prev => ({
      ...prev,
      [cityId]: {
        ...prev[cityId],
        periodDays: periodDays
      }
    }));
    // Update form to trigger price recalculations
    updateForm('basePrice', calculateBasePrice());
  };

  // Build package data from citySelections for submit
  const buildPackageResources = () => {
    const selectedHotels: Hotel[] = [];
    const selectedActivities: Activity[] = [];
    const selectedServices: ServiceOffering[] = [];
    const selectedTransports: Transport[] = [];
    const cityPeriods: PackageCityPeriod[] = [];

    Object.entries(citySelections).forEach(([cityId, sel]) => {
      // Add resources
      selectedHotels.push(...hotels.filter(h => h.city.id === cityId && sel.hotels.includes(h.id)));
      selectedActivities.push(...activities.filter(a => a.city.id === cityId && sel.activities.includes(a.id)));
      selectedServices.push(...services.filter(s => s.city.id === cityId && sel.services.includes(s.id)));
      selectedTransports.push(...transports.filter(t => t.city.id === cityId && sel.transports.includes(t.id)));
      
      // Add city period
      if (sel.periodDays > 0) {
        const city = cities.find(c => c.id === cityId);
        if (city) {
          cityPeriods.push({
            id: '', // Will be generated by backend
            city: city,
            periodDays: sel.periodDays
          });
        }
      }
    });

    return { selectedHotels, selectedActivities, selectedServices, selectedTransports, cityPeriods };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { selectedHotels, selectedActivities, selectedServices, selectedTransports, cityPeriods } = buildPackageResources();
    try {
      const packageData = {
        ...form,
        hotels: selectedHotels,
        activities: selectedActivities,
        services: selectedServices,
        transports: selectedTransports,
        cityPeriods: cityPeriods,
        basePrice: calculateBasePrice(),
        finalPrice: calculateFinalPrice(),
        totalPeriodDays: calculateTotalPeriodDays()
      };
      // Ensure compatibility with API by casting to bypass type checking
      const compatiblePackageData = {
        ...packageData,
        cities: (packageData.cities as any[]) || [],
        hotels: (packageData.hotels as any[]) || [],
        activities: (packageData.activities as any[]) || [],
        services: (packageData.services as any[]) || [],
        transports: (packageData.transports as any[]) || [],
      } as any;
      
      if (editing) {
        await packagesAPI.update(editing.id, compatiblePackageData);
      } else {
        await packagesAPI.create(compatiblePackageData);
      }
      setShowForm(false);
      setEditing(null);
      setForm(defaultForm);
      setCitySelections({});
      fetchData();
    } catch (err) {
      setError('Failed to save package');
    }
  };

  const handleEdit = (pkg: SpecialPackage) => {
    setEditing(pkg);
    setForm(pkg);
    
    // Build citySelections from pkg
    const selections: CityResourceSelections = {};
    
    // Initialize with city periods
    (pkg.cityPeriods || []).forEach(cp => {
      selections[cp.city.id] = {
        hotels: [],
        activities: [],
        services: [],
        transports: [],
        periodDays: cp.periodDays
      };
    });

    // Add resources
    (pkg.hotels || []).forEach(hotel => {
      if (!selections[hotel.city.id]) {
        selections[hotel.city.id] = { 
          hotels: [], 
          activities: [], 
          services: [], 
          transports: [],
          periodDays: 1 
        };
      }
      selections[hotel.city.id].hotels.push(hotel.id);
    });

    (pkg.activities || []).forEach(activity => {
      if (!selections[activity.city.id]) {
        selections[activity.city.id] = { 
          hotels: [], 
          activities: [], 
          services: [], 
          transports: [],
          periodDays: 1 
        };
      }
      selections[activity.city.id].activities.push(activity.id);
    });

    (pkg.services || []).forEach(service => {
      if (!selections[service.city.id]) {
        selections[service.city.id] = { 
          hotels: [], 
          activities: [], 
          services: [], 
          transports: [],
          periodDays: 1 
        };
      }
      selections[service.city.id].services.push(service.id);
    });

    (pkg.transports || []).forEach(transport => {
      if (!selections[transport.city.id]) {
        selections[transport.city.id] = { 
          hotels: [], 
          activities: [], 
          services: [], 
          transports: [],
          periodDays: 1 
        };
      }
      selections[transport.city.id].transports.push(transport.id);
    });

    setCitySelections(selections);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce forfait ?')) {
      try {
        await packagesAPI.delete(id);
        fetchData();
      } catch (err) {
        setError('Failed to delete package');
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl p-8 text-white overflow-hidden">
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-serif text-4xl font-bold mb-2">
                  Plan B - Offres Spéciales
                </h1>
                <p className="text-white/90 text-lg">
                  Créez des forfaits exclusifs avec remises
                </p>
              </div>
            </div>
            <button
              onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); setCitySelections({}); }}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>Créer un forfait</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-4">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editing ? 'Modifier le forfait' : 'Créer un forfait spécial'}
                  </h2>
                  <button
                    onClick={() => { setShowForm(false); setEditing(null); setForm(defaultForm); setCitySelections({}); }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nom *</label>
                    <input
                      type="text"
                      value={form.name || ''}
                      onChange={(e) => updateForm('name', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Statut</label>
                    <select
                      value={form.status ? 'true' : 'false'}
                      onChange={(e) => updateForm('status', e.target.value === 'true')}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    >
                      <option value="true">Activé</option>
                      <option value="false">Désactivé</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={form.description || ''}
                    onChange={(e) => updateForm('description', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    rows={3}
                  />
                </div>

                {/* Cities Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Villes *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {(cities || []).map(city => (
                      <div key={city.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`pkg-city-${city.id}`}
                          checked={((form.cities as City[]) || []).some(c => c.id === city.id)}
                          onChange={(e) => handleCitySelection(city.id, e.target.checked)}
                          className="w-4 h-4 text-purple-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`pkg-city-${city.id}`} className="text-sm text-gray-700 cursor-pointer">
                          {city.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Per-city resource selection */}
                {((form.cities as City[]) || []).map(city => (
                  <div key={city.id} className="bg-gray-50 rounded-xl p-6 border mt-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-purple-500" />
                      {city.name}
                    </h4>

                    {/* Period Days Input */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre de nuitées dans cette ville *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={citySelections[city.id]?.periodDays || 1}
                        onChange={(e) => handlePeriodChange(city.id, Number(e.target.value))}
                        className="w-32 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                        required
                      />
                    </div>

                    {/* Hotels */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Hôtels</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {hotels.filter(h => h.city.id === city.id).map(hotel => (
                          <div key={hotel.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={citySelections[city.id]?.hotels.includes(hotel.id) || false}
                              onChange={e => handleResourceSelection(city.id, 'hotels', hotel.id, e.target.checked)}
                              className="w-4 h-4 text-purple-500 border-gray-300 rounded"
                            />
                            <label className="text-sm">{hotel.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Activities */}
                    <div className="mt-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Expériences</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {activities.filter(a => a.city.id === city.id).map(activity => (
                          <div key={activity.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={citySelections[city.id]?.activities.includes(activity.id) || false}
                              onChange={e => handleResourceSelection(city.id, 'activities', activity.id, e.target.checked)}
                              className="w-4 h-4 text-purple-500 border-gray-300 rounded"
                            />
                            <label className="text-sm">{activity.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Services */}
                    <div className="mt-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Services</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {services.filter(s => s.city.id === city.id).map(service => (
                          <div key={service.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={citySelections[city.id]?.services.includes(service.id) || false}
                              onChange={e => handleResourceSelection(city.id, 'services', service.id, e.target.checked)}
                              className="w-4 h-4 text-purple-500 border-gray-300 rounded"
                            />
                            <label className="text-sm">{service.providerName}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Transports */}
                    <div className="mt-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Transports</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {transports.filter(t => t.city.id === city.id).map(transport => (
                          <div key={transport.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={citySelections[city.id]?.transports.includes(transport.id) || false}
                              onChange={e => handleResourceSelection(city.id, 'transports', transport.id, e.target.checked)}
                              className="w-4 h-4 text-purple-500 border-gray-300 rounded"
                            />
                            <label className="text-sm">{transport.type}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pricing and Period Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Période totale</label>
                    <div className="flex items-center px-4 py-3 border-2 border-blue-200 rounded-xl bg-blue-50">
                      <Calendar className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="font-bold text-blue-600">{calculateTotalPeriodDays()} nuitées</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Prix de base</label>
                    <input
                      type="text"
                      value={`${calculateBasePrice()} MAD`}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-100 cursor-not-allowed"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Remise % *</label>
                    <input
                      type="number"
                      value={form.discountPercent || 0}
                      onChange={(e) => updateForm('discountPercent', Number(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Prix final</label>
                    <input
                      type="text"
                      value={`${calculateFinalPrice()} MAD`}
                      className="w-full px-4 py-3 border-2 border-green-200 rounded-xl bg-green-50 cursor-not-allowed font-bold text-green-600"
                      disabled
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditing(null); setForm(defaultForm); setCitySelections({}); }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  >
                    <Save className="w-5 h-5" />
                    <span>{editing ? 'Enregistrer' : 'Créer'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Packages List */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-b">
            <h2 className="text-xl font-bold text-gray-800">Forfaits spéciaux</h2>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                <p className="mt-4 text-gray-500">Chargement...</p>
              </div>
            ) : (packages || []).length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun forfait spécial trouvé</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(packages || []).map((pkg) => (
                  <div key={pkg.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg mb-1">{pkg.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${pkg.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {pkg.status ? 'Activé' : 'Désactivé'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                    
                    {/* Period Information */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-blue-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="font-semibold">{pkg.totalPeriodDays} jours au total</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {pkg.cityPeriods?.map(cp => (
                          <div key={cp.city.id} className="flex justify-between">
                            <span>{cp.city.name}:</span>
                            <span>{cp.periodDays} nuitées</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {(pkg.cities || []).length} villes incluses
                      </div>
                    </div>
                    
                    {/* Pricing */}
                    <div className="bg-white rounded-lg p-4 mb-4 border border-purple-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600 text-sm">Prix de base:</span>
                        <span className="text-gray-600 line-through">{pkg.basePrice} MAD</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-600 text-sm font-semibold">Remise {pkg.discountPercent}%:</span>
                        <span className="text-green-600 font-semibold">
                          -{(pkg.basePrice * (pkg.discountPercent || 0) / 100).toFixed(0)} MAD
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t border-purple-200 pt-2">
                        <span className="font-bold text-gray-800">Prix final:</span>
                        <span className="text-xl font-bold text-purple-600">
                          {pkg.finalPrice} MAD
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SpecialPackages;