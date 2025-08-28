import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Trash2, Utensils, Users, DollarSign, BarChart3, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Foods, FoodType, FoodDifficulty, FoodStatus, User } from '@/models/entities';
import { foodAPI, usersAPI } from '@/services/api';

// Updated defaultForm to match backend requirements
const defaultForm: Partial<Foods> = {
  name: '', // backend expects 'name'
  description: '',
  type: FoodType.COOKING_CLASS,
  difficulty: FoodDifficulty.BEGINNER,
  status: FoodStatus.AVAILABLE,
  price: 0,
  maxParticipants: 1,
};

const getTypeColor = (type: string) => {
  switch (type) {
    case FoodType.COOKING_CLASS: return "bg-blue-100 text-blue-800";
    case FoodType.FOOD_TOUR: return "bg-green-100 text-green-800";
    case FoodType.TASTING_MENU: return "bg-purple-100 text-purple-800";
    case FoodType.WINE_PAIRING: return "bg-yellow-100 text-yellow-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case FoodDifficulty.BEGINNER: return "bg-green-100 text-green-800";
    case FoodDifficulty.INTERMEDIATE: return "bg-yellow-100 text-yellow-800";
    case FoodDifficulty.ADVANCED: return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case FoodStatus.AVAILABLE: return "bg-green-100 text-green-800";
    case FoodStatus.UNAVAILABLE: return "bg-red-100 text-red-800";
    case FoodStatus.COMING_SOON: return "bg-yellow-100 text-yellow-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const Food = () => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Foods> | null>(null);
  const [form, setForm] = useState<Partial<Foods>>(defaultForm);
  const [foods, setFoods] = useState<Foods[]>([]);
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

  // Fetch foods (list)
  const fetchFoods = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await foodAPI.getAll();
      // The API returns an object with a content property containing the array
      if (response && response.content && Array.isArray(response.content)) {
        setFoods(response.content);
      } else if (response && Array.isArray(response.items)) {
        // If backend returns FoodListResponseDto with items property
        setFoods(response.items);
      } else if (Array.isArray(response)) {
        // Fallback: if the API returns array directly
        setFoods(response);
      } else {
        setFoods([]);
        setError('Received invalid data format from server');
      }
    } catch (err) {
      setError('Failed to fetch food experiences');
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchFoods(); }, []);

  const handleEdit = (food: Foods) => {
    setEditing(food);
    setForm({ 
      ...food,
      name: food.name || '',
      maxParticipants: food.maxParticipants || 1,
      price: food.price || 0
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette expérience gastronomique ?")) {
      try {
        await foodAPI.delete(id);
        fetchFoods();
      } catch (err) {
        setError('Failed to delete food experience');
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
        difficulty: form.difficulty,
        status: form.status,
        price: form.price,
        maxParticipants: form.maxParticipants,
      };
      if (editing && editing.id) {
        await foodAPI.update(editing.id, payload);
      } else {
        await foodAPI.create(payload);
      }
      setShowForm(false);
      setEditing(null);
      setForm(defaultForm);
      fetchFoods();
    } catch (err) {
      setError('Failed to save food experience');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Expériences Gastronomiques
            </h1>
            <p className="text-muted-foreground">
              Gérez vos expériences culinaires et gastronomiques
            </p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Ajouter une expérience</span>
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
                {editing ? 'Modifier l\'expérience' : 'Ajouter une expérience gastronomique'}
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
                      value={form.type || FoodType.COOKING_CLASS}
                      onChange={e => setForm(f => ({ ...f, type: e.target.value as FoodType }))}
                      className="w-full px-4 py-2 border rounded"
                      required
                    >
                      {Object.values(FoodType).map(type => (
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
                    <label className="block mb-1 font-semibold">Difficulté *</label>
                    <select
                      value={form.difficulty || FoodDifficulty.BEGINNER}
                      onChange={e => setForm(f => ({ ...f, difficulty: e.target.value as FoodDifficulty }))}
                      className="w-full px-4 py-2 border rounded"
                      required
                    >
                      {Object.values(FoodDifficulty).map(diff => (
                        <option key={diff} value={diff}>{diff}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold">Statut *</label>
                    <select
                      value={form.status || FoodStatus.AVAILABLE}
                      onChange={e => setForm(f => ({ ...f, status: e.target.value as FoodStatus }))}
                      className="w-full px-4 py-2 border rounded"
                      required
                    >
                      {Object.values(FoodStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div>
                    <label className="block mb-1 font-semibold">Participants max *</label>
                    <input
                      type="number"
                      value={form.maxParticipants || 1}
                      onChange={e => setForm(f => ({ ...f, maxParticipants: Number(e.target.value) }))}
                      className="w-full px-4 py-2 border rounded"
                      required
                      min="1"
                    />
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
                    {editing ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Foods List */}
        <div className="bg-background rounded-xl border border-border shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Expériences</h2>
          </div>
          <div className="divide-y divide-border">
            {loading ? (
              <div className="p-6 text-center text-muted-foreground">Chargement...</div>
            ) : foods.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                Aucune expérience trouvée. Cliquez sur "Ajouter une expérience" pour commencer.
              </div>
            ) : (
              foods.map((food) => (
                <div key={food.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{food.name}</h3>
                      <div className="text-muted-foreground text-sm mt-1">{food.description}</div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(food)}
                        className="flex items-center space-x-1 px-3 py-1 rounded bg-primary text-primary-foreground"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(food.id)}
                        className="flex items-center space-x-1 px-3 py-1 rounded bg-red-500 text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Utensils className="w-4 h-4 text-muted-foreground" />
                      <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(food.type)}`}>
                        {food.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-muted-foreground" />
                      <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(food.difficulty)}`}>
                        {food.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">Statut:</span> 
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(food.status)}`}>
                        {food.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span>
                        <span className="font-semibold">Prix:</span> {food.price} MAD
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>
                        <span className="font-semibold">Participants max:</span> {food.maxParticipants}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Food;