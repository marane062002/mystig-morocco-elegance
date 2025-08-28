import { useState, useEffect } from "react";
import { Artisan, ArtisanCategory, ArtisanStatus, User } from '@/models/entities';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { artisanAPI, usersAPI } from '@/services/api';
import { Plus, Edit, Trash2, Package, Tag, DollarSign, Hash, X, Palette, Sparkles } from "lucide-react";

// Updated defaultForm to match mystig_db.sql columns and enums
const defaultForm: Partial<Artisan> = {
  name: "",
  description: "",
  category: ArtisanCategory.TEXTILES,
  status: ArtisanStatus.AVAILABLE,
  price: 0,
  currency: "MAD",
  inStock: true,
  materials: [],
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case ArtisanCategory.TEXTILES: return "bg-blue-100 text-blue-800";
    case ArtisanCategory.POTTERY: return "bg-green-100 text-green-800";
    case ArtisanCategory.WOODWORK: return "bg-yellow-100 text-yellow-800";
    case ArtisanCategory.METALWORK: return "bg-purple-100 text-purple-800";
    case ArtisanCategory.JEWELRY: return "bg-pink-100 text-pink-800";
    case ArtisanCategory.LEATHER: return "bg-orange-100 text-orange-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case ArtisanStatus.AVAILABLE: return "bg-green-100 text-green-800";
    case ArtisanStatus.UNAVAILABLE: return "bg-red-100 text-red-800";
    case ArtisanStatus.COMING_SOON: return "bg-yellow-100 text-yellow-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const ArtisanPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Artisan> | null>(null);
  const [form, setForm] = useState<Partial<Artisan>>(defaultForm);
  const [artisans, setArtisans] = useState<Artisan[]>([]);
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

  const fetchArtisans = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await artisanAPI.getAll();
      // The API returns an object with an items property containing the array
      if (response && response.items && Array.isArray(response.items)) {
        setArtisans(response.items);
      } else if (Array.isArray(response)) {
        // Fallback: if the API returns array directly
        setArtisans(response);
      } else {
        setArtisans([]);
        setError("Received invalid data format from server");
      }
    } catch (err) {
      setError("Failed to fetch artisans");
      setArtisans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArtisans(); }, []);

  const handleEdit = (artisan: Artisan) => {
    setEditing(artisan);
    setForm({
      ...artisan,
      materials: artisan.materials || [],
      price: artisan.price || 0,
      inStock: artisan.inStock ?? true,
      currency: artisan.currency || "MAD",
      name: artisan.name || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet artisan ?")) {
      try {
        await artisanAPI.delete(id);
        fetchArtisans();
      } catch (err) {
        setError("Failed to delete artisan");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...form, ownerId: user?.id };
      if (editing && editing.id) {
        await artisanAPI.update(editing.id, payload);
      } else {
        await artisanAPI.create(payload);
      }
      setShowForm(false);
      setEditing(null);
      setForm(defaultForm);
      fetchArtisans();
    } catch (err) {
      setError("Failed to save artisan");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header with Moroccan styling */}
        <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Palette className="w-8 h-8 text-yellow-300" />
              </div>
              <div>
                <h1 className="font-serif text-4xl font-bold mb-2">
                  Artisanat Marocain
                </h1>
                <p className="text-white/90 text-lg">
                  Préservez et partagez l'art traditionnel du Maroc
                </p>
              </div>
            </div>
            <button
              onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/20"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Ajouter un produit</span>
            </button>
          </div>
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-orange-200/50">
              <div className="p-6 bg-gradient-to-r from-indigo-100 to-purple-100 border-b border-indigo-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {editing ? "Modifier le produit" : "Ajouter un produit artisanal"}
                    </h2>
                  </div>
                  <button
                    onClick={() => { setShowForm(false); setEditing(null); setForm(defaultForm); }}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <Sparkles className="w-4 h-4 mr-2 text-indigo-500" />
                        Nom du produit *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={form.name || ""}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className="w-full px-4 py-3 bg-white/60 border-2 border-indigo-200/50 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 focus:shadow-lg focus:scale-105"
                          placeholder="Ex: Tapis berbère traditionnel"
                          required
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-focus-within:from-indigo-500/10 group-focus-within:to-purple-500/10 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <Tag className="w-4 h-4 mr-2 text-indigo-500" />
                        Catégorie *
                      </label>
                      <select
                        value={form.category || ArtisanCategory.TEXTILES}
                        onChange={e => setForm(f => ({ ...f, category: e.target.value as ArtisanCategory }))}
                        className="w-full px-4 py-3 bg-white/60 border-2 border-indigo-200/50 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                      >
                        {Object.values(ArtisanCategory).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Edit className="w-4 h-4 mr-2 text-indigo-500" />
                      Description *
                    </label>
                    <div className="relative">
                      <textarea
                        value={form.description || ""}
                        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/60 border-2 border-indigo-200/50 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 focus:shadow-lg resize-none"
                        rows={4}
                        placeholder="Décrivez votre produit artisanal..."
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-focus-within:from-indigo-500/10 group-focus-within:to-purple-500/10 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Statut *</label>
                      <select
                        value={form.status || ArtisanStatus.AVAILABLE}
                        onChange={e => setForm(f => ({ ...f, status: e.target.value as ArtisanStatus }))}
                        className="w-full px-4 py-3 bg-white/60 border-2 border-indigo-200/50 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                      >
                        {Object.values(ArtisanStatus).map(stat => (
                          <option key={stat} value={stat}>{stat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">En stock *</label>
                      <select
                        value={form.inStock ? "true" : "false"}
                        onChange={e => setForm(f => ({ ...f, inStock: e.target.value === "true" }))}
                        className="w-full px-4 py-3 bg-white/60 border-2 border-indigo-200/50 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                      >
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-indigo-500" />
                        Prix *
                      </label>
                      <input
                        type="number"
                        value={form.price || 0}
                        onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                        className="w-full px-4 py-3 bg-white/60 border-2 border-indigo-200/50 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                        min={0}
                        required
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Devise *</label>
                      <select
                        value={form.currency || "MAD"}
                        onChange={e => setForm(f => ({ ...f, currency: e.target.value }))}
                        className="w-full px-4 py-3 bg-white/60 border-2 border-indigo-200/50 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                      >
                        <option value="MAD">MAD</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <Hash className="w-4 h-4 mr-2 text-indigo-500" />
                      Matériaux utilisés
                    </label>
                    <input
                      type="text"
                      value={form.materials?.join(", ") || ""}
                      onChange={e => setForm(f => ({
                        ...f,
                        materials: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                      }))}
                      className="w-full px-4 py-3 bg-white/60 border-2 border-indigo-200/50 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                      placeholder="Coton, Laine, Bois de cèdre, Argent..."
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t border-indigo-200/50">
                    <button
                      type="button"
                      onClick={() => { setShowForm(false); setEditing(null); setForm(defaultForm); }}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium"
                    >
                      {editing ? "Enregistrer" : "Ajouter"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Artisan List with Moroccan Cards */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-orange-200/50 shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-indigo-100 to-purple-100 border-b border-indigo-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Produits artisanaux</h2>
            </div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                </div>
              </div>
            ) : artisans.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-indigo-600" />
                </div>
                <p className="text-gray-600 text-lg">Aucun produit artisanal trouvé</p>
                <p className="text-gray-500 text-sm">Cliquez sur "Ajouter un produit" pour commencer</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {artisans.map((artisan, index) => (
                  <div 
                    key={artisan.id} 
                    className="relative bg-gradient-to-r from-white to-indigo-50/50 rounded-xl border-2 border-indigo-200/30 p-6 hover:shadow-xl transition-all duration-500 hover:scale-102 group overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Moroccan tile accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                        <div className="flex-1">
                          <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
                            {artisan.name}
                          </h3>
                          <p className="text-gray-600 mb-4">{artisan.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Tag className="w-4 h-4 text-indigo-500" />
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(artisan.category)}`}>
                                {artisan.category}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-700">Statut:</span> 
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(artisan.status)}`}>
                                {artisan.status}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4 text-green-500" />
                              <span className="font-bold text-green-600">
                                {artisan.price} {artisan.currency}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Package className="w-4 h-4 text-blue-500" />
                              <span className={artisan.inStock ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                {artisan.inStock ? "En stock" : "Rupture"}
                              </span>
                            </div>
                          </div>
                          
                          {artisan.materials && artisan.materials.length > 0 && (
                            <div className="mt-4">
                              <div className="flex items-center space-x-2 text-sm mb-2">
                                <Hash className="w-4 h-4 text-orange-500" />
                                <span className="font-semibold text-gray-700">Matériaux:</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {artisan.materials.map((material, matIndex) => (
                                  <span 
                                    key={matIndex} 
                                    className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 rounded-full text-xs font-medium border border-orange-200/50"
                                  >
                                    {material}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(artisan)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl hover:from-blue-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Modifier</span>
                          </button>
                          <button
                            onClick={() => handleDelete(artisan.id)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                      </div>
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

export default ArtisanPage;