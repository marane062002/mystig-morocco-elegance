import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Trash2, Tag, DollarSign, Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Package, PackageType, PackageStatus, User } from '@/models/entities';
import { packagesAPI, usersAPI } from '@/services/api';

// Updated defaultForm to match backend requirements (see PackageRequestDto)
const defaultForm: Partial<Package> = {
  name: '', // backend expects 'name', not 'title'
  description: '',
  type: PackageType.ADVENTURE,
  status: PackageStatus.DRAFT,
  price: 0,
  featured: false,
  tags: [],
  // Add other fields if needed: durationDays, durationNights, destinations, inclusions, exclusions, pricing, images, itinerary, etc.
};

const getTypeColor = (type: string) => {
  switch (type) {
    case PackageType.ADVENTURE: return "bg-blue-100 text-blue-800";
    case PackageType.CULTURAL: return "bg-green-100 text-green-800";
    case PackageType.LUXURY: return "bg-yellow-100 text-yellow-800";
    case PackageType.FAMILY: return "bg-purple-100 text-purple-800";
    case PackageType.HONEYMOON: return "bg-pink-100 text-pink-800";
    case PackageType.WELLNESS: return "bg-indigo-100 text-indigo-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case PackageStatus.DRAFT: return "bg-gray-100 text-gray-800";
    case PackageStatus.PUBLISHED: return "bg-green-100 text-green-800";
    case PackageStatus.ARCHIVED: return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const Packages = () => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Package> | null>(null);
  const [form, setForm] = useState<Partial<Package>>(defaultForm);
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Fetch current user profile for ownerId
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await usersAPI.getProfile();
        setUser(userData);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // Fetch packages (list)
  const fetchPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await packagesAPI.getAll();
      // The API returns an object with a content property containing the array
      if (response && response.content && Array.isArray(response.content)) {
        setPackages(response.content);
      } else if (response && Array.isArray(response.items)) {
        // If backend returns PackageListResponseDto with items property
        setPackages(response.items);
      } else if (Array.isArray(response)) {
        // Fallback: if the API returns array directly
        setPackages(response);
      } else {
        setPackages([]);
        setError('Received invalid data format from server');
      }
    } catch (err) {
      setError('Failed to fetch packages');
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPackages(); }, []);

  const handleEdit = (pkg: Package) => {
    setEditing(pkg);
    setForm({
      ...pkg,
      name: pkg.name || '',
      price: pkg.price || 0,
      featured: pkg.featured ?? false,
      tags: pkg.tags || [],
      status: pkg.status || PackageStatus.DRAFT,
      type: pkg.type || PackageType.ADVENTURE,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce forfait ?")) {
      try {
        await packagesAPI.delete(id);
        fetchPackages();
      } catch (err) {
        setError('Failed to delete package');
      }
    }
  };

  // Send POST/PUT with correct fields
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        ownerId: user?.id,
        name: form.name, // backend expects 'name'
        description: form.description,
        type: form.type,
        status: form.status,
        price: form.price,
        featured: form.featured,
        tags: form.tags,
        // Add other fields if needed
      };
      if (editing && editing.id) {
        await packagesAPI.update(editing.id, payload);
      } else {
        await packagesAPI.create(payload);
      }
      setShowForm(false);
      setEditing(null);
      setForm(defaultForm);
      fetchPackages();
    } catch (err) {
      setError('Failed to save package');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Gestion des Forfaits
            </h1>
            <p className="text-muted-foreground">
              Créez et gérez vos forfaits voyage personnalisés
            </p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Créer un forfait</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex justify-between items-center">
            <span>{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editing ? 'Modifier le forfait' : 'Créer un forfait'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-semibold">Nom *</label>
                    <input
                      type="text"
                      value={form.name || ''}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold">Type *</label>
                    <select
                      value={form.type || PackageType.ADVENTURE}
                      onChange={e => setForm(f => ({ ...f, type: e.target.value as PackageType }))}
                      className="w-full px-4 py-2 border rounded"
                      required
                    >
                      {Object.values(PackageType).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-semibold">Description *</label>
                  <textarea
                    value={form.description || ''}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className="w-full px-4 py-2 border rounded"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-semibold">Statut *</label>
                    <select
                      value={form.status || PackageStatus.DRAFT}
                      onChange={e => setForm(f => ({ ...f, status: e.target.value as PackageStatus }))}
                      className="w-full px-4 py-2 border rounded"
                      required
                    >
                      {Object.values(PackageStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold">Prix (MAD) *</label>
                    <input
                      type="number"
                      value={form.price || 0}
                      onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                      className="w-full px-4 py-2 border rounded"
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-semibold">Tags</label>
                    <input
                      type="text"
                      value={form.tags?.join(", ") || ""}
                      onChange={e => setForm(f => ({
                        ...f,
                        tags: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                      }))}
                      className="w-full px-4 py-2 border rounded"
                      placeholder="Aventure, Famille, etc."
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold">Mis en avant</label>
                    <select
                      value={form.featured ? "true" : "false"}
                      onChange={e => setForm(f => ({ ...f, featured: e.target.value === "true" }))}
                      className="w-full px-4 py-2 border rounded"
                    >
                      <option value="true">Oui</option>
                      <option value="false">Non</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditing(null); setForm(defaultForm); }}
                    className="px-4 py-2 rounded bg-muted text-foreground hover:bg-muted/80"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {editing ? 'Modifier' : 'Créer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Packages List */}
        <div className="bg-background rounded-xl border border-border shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Forfaits</h2>
          </div>
          <div className="divide-y divide-border">
            {loading ? (
              <div className="p-6 text-center text-muted-foreground">Chargement...</div>
            ) : packages.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                Aucun forfait trouvé. Cliquez sur "Créer un forfait" pour commencer.
              </div>
            ) : (
              packages.map((pkg) => (
                <div key={pkg.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{pkg.name}</h3>
                      <div className="text-muted-foreground text-sm mt-1">{pkg.description}</div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(pkg)}
                        className="flex items-center space-x-1 px-3 py-1 rounded bg-primary text-primary-foreground"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="flex items-center space-x-1 px-3 py-1 rounded bg-red-500 text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(pkg.type)}`}>
                        {pkg.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Statut:</span> 
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(pkg.status)}`}>
                        {pkg.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span>
                        <span className="font-semibold">Prix:</span> {pkg.price} MAD
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className={`w-4 h-4 ${pkg.featured ? "text-yellow-500" : "text-muted-foreground"}`} />
                      <span className={pkg.featured ? "text-yellow-600" : "text-muted-foreground"}>
                        {pkg.featured ? "Mis en avant" : "Standard"}
                      </span>
                    </div>
                  </div>
                  
                  {pkg.tags && pkg.tags.length > 0 && (
                    <div className="mt-4">
                      <div className="flex items-center space-x-2 text-sm mb-2">
                        <Tag className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">Tags:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {pkg.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-muted rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Packages;