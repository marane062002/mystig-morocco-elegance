import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Trash2, MapPin, X, Save } from 'lucide-react';
import { City } from '@/models/travel-programs';
import { citiesAPI } from '@/services/travel-programs-api';

const defaultForm: Partial<City> = {
  name: '',
  region: '',
  country: '',
  enabled: true,
};

const Cities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<City | null>(null);
  const [form, setForm] = useState<Partial<City>>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setLoading(true);
    try {
      const data = await citiesAPI.getAll();
      setCities(data);
    } catch (err) {
      setError('Failed to fetch cities');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Client-side uniqueness check for name
    if (
      !editing &&
      cities.some(
        (c) =>
          c.name.trim().toLowerCase() === (form.name || '').trim().toLowerCase()
      )
    ) {
      setError('Le nom de la ville doit être unique.');
      return;
    }
    try {
      if (editing) {
        await citiesAPI.update(editing.id, form);
      } else {
        await citiesAPI.create(form);
      }
      setShowForm(false);
      setEditing(null);
      setForm(defaultForm);
      fetchCities();
    } catch (err) {
      setError('Failed to save city');
    }
  };

  const handleEdit = (city: City) => {
    setEditing(city);
    setForm(city);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette ville ?')) {
      try {
        await citiesAPI.delete(id);
        fetchCities();
      } catch (err) {
        setError('Failed to delete city');
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Gestion des Villes
            </h1>
            <p className="text-muted-foreground">
              Ajoutez et gérez les villes disponibles
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditing(null);
              setForm(defaultForm);
            }}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter une ville</span>
          </button>
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
                    {editing ? 'Modifier la ville' : 'Ajouter une ville'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditing(null);
                      setForm(defaultForm);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      value={form.name || ''}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Région
                    </label>
                    <input
                      type="text"
                      value={form.region || ''}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          region: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pays *
                    </label>
                    <input
                      type="text"
                      value={form.country || ''}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          country: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="flex items-center mt-6">
                    <input
                      type="checkbox"
                      checked={form.enabled ?? true}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          enabled: e.target.checked,
                        }))
                      }
                      className="mr-2"
                      id="enabled"
                    />
                    <label htmlFor="enabled" className="text-sm font-semibold text-gray-700">
                      Ville activée
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditing(null);
                      setForm(defaultForm);
                    }}
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

        {/* Cities List */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-100 to-green-100 border-b">
            <h2 className="text-xl font-bold text-gray-800">Liste des villes</h2>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-500">Chargement...</p>
              </div>
            ) : cities.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Aucune ville trouvée</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cities.map((city) => (
                  <div
                    key={city.id}
                    className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-blue-200 p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <h3 className="font-bold text-gray-800 text-lg mb-1">
                      {city.name}
                    </h3>
                    <p className="text-blue-600 text-sm mb-2">{city.region}</p>
                    <p className="text-gray-600 text-sm mb-2">{city.country}</p>
                    <div className="flex items-center mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          city.enabled
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {city.enabled ? 'Activée' : 'Désactivée'}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(city)}
                        className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(city.id)}
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

export default Cities;