import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  FileText, 
  Camera, 
  Save, 
  Eye, 
  EyeOff,
  Shield,
  Bell,
  Palette,
  Globe,
  Lock,
  Trash2
} from 'lucide-react';
import { getCurrentUser } from '@/services/auth';
import { usersAPI } from '@/services/api';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  phone: string | null;
  address: string | null;
  businessInfo: {
    companyName: string | null;
    license: string | null;
    specialties: string[];
    description: string | null;
  };
  emailVerified: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    description: '',
    license: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          companyName: userData.businessInfo?.companyName || '',
          description: userData.businessInfo?.description || '',
          license: userData.businessInfo?.license || '',
          address: userData.address || '',
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await usersAPI.updateProfile({
        name: formData.name,
        phone: formData.phone,
        companyName: formData.companyName,
        description: formData.description,
        license: formData.license,
        address: formData.address
      });
      // Refresh user data
      const updatedUser = await getCurrentUser();
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Préférences', icon: Palette }
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-red-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header with Moroccan styling */}
        <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-2xl p-8 text-white overflow-hidden">
          {/* Moroccan pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="font-serif text-4xl font-bold mb-2">
              Paramètres du Compte
            </h1>
            <p className="text-white/80 text-lg">
              Gérez vos informations personnelles et préférences
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-200/50 shadow-lg overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-orange-100 to-red-100 border-b border-orange-200/50">
                <h3 className="font-bold text-gray-800">Navigation</h3>
              </div>
              <div className="p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 mb-1 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-200/50 shadow-lg overflow-hidden">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="p-6 bg-gradient-to-r from-orange-100 to-red-100 border-b border-orange-200/50">
                    <h3 className="text-xl font-bold text-gray-800">Informations du Profil</h3>
                    <p className="text-gray-600 mt-1">Mettez à jour vos informations personnelles</p>
                  </div>
                  
                  <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center space-x-6 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200/50">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/50">
                          {user?.avatar ? (
                            <img 
                              src={user.avatar} 
                              alt={user.name}
                              className="w-20 h-20 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-2xl">
                              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          )}
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-lg border-2 border-orange-200 hover:bg-orange-50 transition-all duration-300">
                          <Camera className="w-4 h-4 text-orange-600" />
                        </button>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">Photo de profil</h4>
                        <p className="text-gray-600 text-sm">Cliquez pour changer votre photo</p>
                      </div>
                    </div>

                    {/* Form Fields with Moroccan styling */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <User className="w-4 h-4 mr-2 text-orange-500" />
                          Nom complet
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg focus:scale-105"
                            placeholder="Votre nom complet"
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 to-red-500/0 group-focus-within:from-orange-500/10 group-focus-within:to-red-500/10 transition-all duration-300 pointer-events-none"></div>
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-orange-500" />
                          Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl cursor-not-allowed"
                            disabled
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-orange-500" />
                          Téléphone
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg focus:scale-105"
                            placeholder="+212 6XX XXX XXX"
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 to-red-500/0 group-focus-within:from-orange-500/10 group-focus-within:to-red-500/10 transition-all duration-300 pointer-events-none"></div>
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <Building className="w-4 h-4 mr-2 text-orange-500" />
                          Nom de l'entreprise
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                            className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg focus:scale-105"
                            placeholder="Nom de votre entreprise"
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 to-red-500/0 group-focus-within:from-orange-500/10 group-focus-within:to-red-500/10 transition-all duration-300 pointer-events-none"></div>
                        </div>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                        Adresse
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg focus:scale-105"
                          placeholder="Votre adresse complète"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 to-red-500/0 group-focus-within:from-orange-500/10 group-focus-within:to-red-500/10 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-orange-500" />
                        Description
                      </label>
                      <div className="relative">
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData({...formData, description: e.target.value})}
                          rows={4}
                          className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg resize-none"
                          placeholder="Décrivez votre expérience..."
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 to-red-500/0 group-focus-within:from-orange-500/10 group-focus-within:to-red-500/10 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-orange-500" />
                        Licence professionnelle
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.license}
                          onChange={(e) => setFormData({...formData, license: e.target.value})}
                          className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg focus:scale-105"
                          placeholder="Numéro de licence"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 to-red-500/0 group-focus-within:from-orange-500/10 group-focus-within:to-red-500/10 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-6">
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
                      >
                        <Save className="w-5 h-5" />
                        <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <div className="p-6 bg-gradient-to-r from-orange-100 to-red-100 border-b border-orange-200/50">
                    <h3 className="text-xl font-bold text-gray-800">Sécurité</h3>
                    <p className="text-gray-600 mt-1">Gérez votre mot de passe et sécurité</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <form className="space-y-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <Lock className="w-4 h-4 mr-2 text-orange-500" />
                          Mot de passe actuel
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.currentPassword}
                            onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                            className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg pr-12"
                            placeholder="Mot de passe actuel"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors duration-300"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <Lock className="w-4 h-4 mr-2 text-orange-500" />
                          Nouveau mot de passe
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                            className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                            placeholder="Nouveau mot de passe"
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <Lock className="w-4 h-4 mr-2 text-orange-500" />
                          Confirmer le mot de passe
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg"
                            placeholder="Confirmer le mot de passe"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-6">
                        <button
                          type="submit"
                          className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                          <Shield className="w-5 h-5" />
                          <span>Mettre à jour</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <div className="p-6 bg-gradient-to-r from-orange-100 to-red-100 border-b border-orange-200/50">
                    <h3 className="text-xl font-bold text-gray-800">Notifications</h3>
                    <p className="text-gray-600 mt-1">Configurez vos préférences de notification</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    {[
                      { title: 'Nouvelles réservations', desc: 'Recevoir un email pour chaque nouvelle réservation' },
                      { title: 'Avis clients', desc: 'Notifications pour les nouveaux avis' },
                      { title: 'Messages', desc: 'Alertes pour les nouveaux messages' },
                      { title: 'Rappels', desc: 'Rappels pour les tâches importantes' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200/50">
                        <div>
                          <h4 className="font-semibold text-gray-800">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-orange-500 peer-checked:to-red-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div>
                  <div className="p-6 bg-gradient-to-r from-orange-100 to-red-100 border-b border-orange-200/50">
                    <h3 className="text-xl font-bold text-gray-800">Préférences</h3>
                    <p className="text-gray-600 mt-1">Personnalisez votre expérience</p>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <Globe className="w-4 h-4 mr-2 text-orange-500" />
                          Langue
                        </label>
                        <select className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg">
                          <option>Français</option>
                          <option>العربية</option>
                          <option>English</option>
                        </select>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <Palette className="w-4 h-4 mr-2 text-orange-500" />
                          Thème
                        </label>
                        <select className="w-full px-4 py-3 bg-white/60 border-2 border-orange-200/50 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white transition-all duration-300 focus:shadow-lg">
                          <option>Marocain Traditionnel</option>
                          <option>Moderne</option>
                          <option>Sombre</option>
                        </select>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="mt-12 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border-2 border-red-200/50">
                      <h4 className="font-bold text-red-800 mb-2 flex items-center">
                        <Trash2 className="w-5 h-5 mr-2" />
                        Zone de danger
                      </h4>
                      <p className="text-red-600 text-sm mb-4">
                        Ces actions sont irréversibles. Procédez avec prudence.
                      </p>
                      <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        Supprimer le compte
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;