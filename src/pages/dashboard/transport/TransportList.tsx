import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Trash2, MapPin, DollarSign, X, Save, Bus } from 'lucide-react';
import { Transport, TransportType, City } from '@/models/travel-programs';
import { transportsAPI, citiesAPI } from '@/services/travel-programs-api';

const defaultForm: Partial<Transport> = {
  type: TransportType.BUS,
  company: '',
  city: undefined, // <-- use city object
  price: 0,
  active: true,
};

const TransportList = () => {
  const [transports, setTransports] = useState<Transport[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Transport | null>(null);
  const [form, setForm] = useState<Partial<Transport>>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [transportsData, citiesData] = await Promise.all([
        transportsAPI.getAll(),
        citiesAPI.getAll()
      ]);
      setTransports(transportsData);
      setCities(citiesData);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Adapt handleEdit to set city object
  const handleEdit = (transport: Transport) => {
    setEditing(transport);
    setForm({
      ...transport,
      city: transport.city, // city object
    });
    setShowForm(true);
  };

  // Adapt handleSubmit to send city object
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedCity = cities.find(c => c.id === (form.city?.id || form.city));
      const payload = {
        ...form,
        city: selectedCity, // ensure city object with all properties
      };
      if (editing) {
        await transportsAPI.update(editing.id, payload);
      } else {
        await transportsAPI.create(payload);
      }
      setShowForm(false);
      setEditing(null);
      setForm(defaultForm);
      fetchData();
    } catch (err) {
      setError('Failed to save transport');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce moyen de transport ?')) {
      try {
        await transportsAPI.delete(id);
        fetchData();
      } catch (err) {
        setError('Failed to delete transport');
      }
    }
  };

  // Adapt filter logic
  const filteredTransports = selectedCity 
    ? transports.filter(t => t.city?.id === selectedCity)
    : transports;

  // Adapt getCityName
  const getCityName = (city: City | undefined) => city?.name || 'Ville inconnue';

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Gestion des Transports
            </h1>
            <p className="text-muted-foreground">
              Ajoutez et gérez les moyens de transport par ville
            </p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter un transport</span>
          </button>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-semibold text-gray-700">Filtrer par ville:</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Toutes les villes</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
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
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6 bg-gradient-to-r from-blue-100 to-green-100 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editing ? 'Modifier le transport' : 'Ajouter un transport'}
                  </h2>
                  <button
                    onClick={() => { setShowForm(false); setEditing(null); setForm(defaultForm); }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Type *</label>
                    <select
                      value={form.type || TransportType.BUS}
                      onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value as TransportType }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      required
                    >
                      {Object.values(TransportType).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Compagnie</label>
                    <input
                      type="text"
                      value={form.company || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ville *</label>
                    <select
                      value={form.city?.id || ''}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          city: cities.find(c => c.id === e.target.value),
                        }))
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      required
                    >
                      <option value="">Sélectionner une ville</option>
                      {cities.map(city => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Prix *</label>
                    <input
                      type="number"
                      value={form.price || 0}
                      onChange={(e) => setForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      min="0"
                      required
                    />
                  </div>
                  <div className="flex items-center mt-6">
                    <input
                      type="checkbox"
                      checked={form.active ?? true}
                      onChange={(e) => setForm(prev => ({ ...prev, active: e.target.checked }))}
                      className="mr-2"
                      id="active"
                    />
                    <label htmlFor="active" className="text-sm font-semibold text-gray-700">
                      Transport activé
                    </label>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditing(null); setForm(defaultForm); }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    <span>{editing ? 'Enregistrer' : 'Créer'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Transports List */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-100 to-green-100 border-b">
            <h2 className="text-xl font-bold text-gray-800">Liste des transports</h2>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-500">Chargement...</p>
              </div>
            ) : filteredTransports.length === 0 ? (
              <div className="text-center py-12">
                <Bus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucun transport trouvé</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTransports.map((transport) => (
                  <div key={transport.id} className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-blue-200 p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg mb-1">{transport.company || 'Sans compagnie'}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          {getCityName(transport.city)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <span className="font-semibold">Type:</span> {transport.type}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${transport.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {transport.active ? 'Activé' : 'Désactivé'}
                      </span>
                    </div>
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="w-4 h-4 mr-1" />
                          Prix:
                        </div>
                        <span className="font-bold text-green-600">{transport.price} MAD</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(transport)}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(transport.id)}
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

export default TransportList;