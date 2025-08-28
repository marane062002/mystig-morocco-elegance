import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Hotel, 
  Calendar, 
  Car, 
  Package, 
  Palette, 
  UtensilsCrossed,
  Ticket,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  User,
  Building,
  BadgeCheck,
  Mail,
  Phone,
  MapPin,
  Crown, 
  Moon,
  Sun,
  Bell,
  Search,
  Monitor,
  Smartphone,
  Users,
  Activity,
  Briefcase
} from 'lucide-react';
import { getCurrentUser, isAuthenticated, logout as doLogout } from "@/services/auth";
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

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

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (isAuthenticated()) {
      getCurrentUser()
        .then((userData) => {
          setUser(userData);
        })
        .catch(() => {
          // Handle error
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      navigate('/login');
    }
  }, [navigate]);

  const menuItems = [
    { icon: BarChart3, label: 'Statistics', href: '/dashboard/statistics', color: 'from-green-500 to-green-600' },
    { icon: Users, label: 'Client Demands', href: '/dashboard/demands', color: 'from-cyan-500 to-cyan-600' },
    { icon: Hotel, label: 'Hotels', href: '/dashboard/hotels', color: 'from-yellow-500 to-yellow-600' },
    { icon: Package, label: 'Special Packages', href: '/dashboard/special-packages', color: 'from-violet-500 to-violet-600' },
    { icon: Car, label: 'Transport', href: '/dashboard/transport', color: 'from-orange-500 to-orange-600' },
    { icon: MapPin, label: 'Cities', href: '/dashboard/cities', color: 'from-emerald-500 to-emerald-600' },
    { icon: Activity, label: 'Activities', href: '/dashboard/activities', color: 'from-amber-500 to-amber-600' },
    { icon: Briefcase, label: 'Services', href: '/dashboard/services', color: 'from-teal-500 to-teal-600' },

  ];

  const handleLogout = () => {
    doLogout();
    navigate('/');
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = (role: string) => {
    const roleMap: { [key: string]: { text: string; color: string; icon: React.ReactNode } } = {
      'ROLE_SELLER': { 
        text: 'Seller', 
        color: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
        icon: <Building className="w-3 h-3" />
      },
      'ROLE_ADMIN': { 
        text: 'Administrator', 
        color: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white',
        icon: <Crown className="w-3 h-3" />
      },
      'ROLE_USER': { 
        text: 'User', 
        color: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
        icon: <User className="w-3 h-3" />
      }
    };

    return roleMap[role] || { text: role, color: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white', icon: <User className="w-3 h-3" /> };
  };

  const isActiveItem = (href: string) => {
    return location.pathname === href;
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return {
          sidebar: 'bg-gray-900 border-gray-800',
          topbar: 'bg-gray-900/95 border-gray-800',
          background: 'bg-gray-950',
          card: 'bg-gray-900 border-gray-800',
          text: 'text-gray-100',
          accent: 'from-blue-600 to-purple-600'
        };
      case 'moroccan':
        return {
          sidebar: 'bg-gradient-to-b from-orange-900 via-red-900 to-yellow-900',
          topbar: 'bg-orange-800/95 border-orange-700',
          background: 'bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50',
          card: 'bg-white/90 border-orange-200',
          text: 'text-gray-800',
          accent: 'from-orange-500 to-red-500'
        };
      case 'modern':
        return {
          sidebar: 'bg-white border-gray-200',
          topbar: 'bg-white/95 border-gray-200',
          background: 'bg-gray-50',
          card: 'bg-white border-gray-200',
          text: 'text-gray-900',
          accent: 'from-indigo-500 to-purple-500'
        };
      default:
        return {
          sidebar: 'bg-white border-gray-200',
          topbar: 'bg-white/95 border-gray-200',
          background: 'bg-gray-50',
          card: 'bg-white border-gray-200',
          text: 'text-gray-900',
          accent: 'from-blue-500 to-indigo-500'
        };
    }
  };

  const themeStyles = getThemeStyles();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeStyles.background} transition-all duration-300`}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 ${themeStyles.sidebar} border-r ${themeStyles.sidebar.includes('border-') ? '' : 'border-gray-200'} shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/20">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${themeStyles.accent} rounded-xl flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className={`font-serif text-xl font-bold ${themeStyles.text} tracking-wide`}>
                  MysticTravel
                </h1>
                <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} text-xs font-medium`}>
                  Admin Panel
                </p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className={`lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${themeStyles.text}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Section */}
          {user && (
            <div className="p-6 border-b border-gray-200/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${themeStyles.accent} rounded-2xl flex items-center justify-center shadow-lg`}>
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-xl">
                        {getUserInitials(user.name)}
                      </span>
                    )}
                  </div>
                  {user.emailVerified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <BadgeCheck className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`${themeStyles.text} font-bold text-lg truncate`}>{user.name}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role).color}`}>
                      {getRoleBadge(user.role).icon}
                      <span className="ml-1">{getRoleBadge(user.role).text}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                {user.businessInfo.companyName && (
                  <div className={`flex items-center ${theme === 'dark' ? 'text-gray-300 bg-gray-800' : 'text-gray-600 bg-gray-100'} rounded-lg px-3 py-2`}>
                    <Building className="w-4 h-4 mr-2" />
                    <span className="truncate">{user.businessInfo.companyName}</span>
                  </div>
                )}
                
                <div className={`flex items-center ${theme === 'dark' ? 'text-gray-300 bg-gray-800' : 'text-gray-600 bg-gray-100'} rounded-lg px-3 py-2`}>
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="truncate">{user.email}</span>
                </div>
                
                {user.phone && (
                  <div className={`flex items-center ${theme === 'dark' ? 'text-gray-300 bg-gray-800' : 'text-gray-600 bg-gray-100'} rounded-lg px-3 py-2`}>
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const active = isActiveItem(item.href);
              return (
                <button
                  key={item.href}
                  onClick={() => {
                    navigate(item.href);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                    active
                      ? `bg-gradient-to-r ${themeStyles.accent} text-white shadow-lg`
                      : `${themeStyles.text} hover:bg-gray-100 ${theme === 'dark' ? 'hover:bg-gray-800' : ''}`
                  }`}
                >
                  <div className={`p-2 rounded-lg ${active ? 'bg-white/20' : `bg-gradient-to-br ${item.color}`} transition-all duration-200`}>
                    <item.icon className={`w-5 h-5 ${active ? 'text-white' : 'text-white'}`} />
                  </div>
                  <span className="font-medium">{item.label}</span>
                  
                  {active && (
                    <div className="absolute right-3 w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-gray-200/20 space-y-2">
            <button
              onClick={() => {
                navigate('/dashboard/settings');
                setSidebarOpen(false);
              }}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                isActiveItem('/dashboard/settings')
                  ? `bg-gradient-to-r ${themeStyles.accent} text-white shadow-lg`
                  : `${themeStyles.text} hover:bg-gray-100 ${theme === 'dark' ? 'hover:bg-gray-800' : ''}`
              }`}
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium">Settings</span>
            </button>
            
            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${themeStyles.text} hover:bg-gray-100 ${theme === 'dark' ? 'hover:bg-gray-800' : ''}`}
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                  {theme === 'dark' ? <Moon className="w-5 h-5 text-white" /> : <Sun className="w-5 h-5 text-white" />}
                </div>
                <span className="font-medium">Theme</span>
              </button>
              
              {showThemeSelector && (
                <div className={`absolute bottom-full left-0 right-0 mb-2 ${themeStyles.card} backdrop-blur-sm rounded-xl border shadow-xl p-3 space-y-2`}>
                  {[
                    { id: 'light', name: 'Light', icon: Sun },
                    { id: 'dark', name: 'Dark', icon: Moon },
                    { id: 'moroccan', name: 'Moroccan', icon: Crown },
                    { id: 'modern', name: 'Modern', icon: Monitor }
                  ].map((themeOption) => (
                    <button
                      key={themeOption.id}
                      onClick={() => {
                        setTheme(themeOption.id as any);
                        setShowThemeSelector(false);
                      }}
                      className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-all duration-200 ${
                        theme === themeOption.id
                          ? `bg-gradient-to-r ${themeStyles.accent} text-white`
                          : `${themeStyles.text} hover:bg-gray-100 ${theme === 'dark' ? 'hover:bg-gray-800' : ''}`
                      }`}
                    >
                      <themeOption.icon className="w-4 h-4" />
                      <span className="font-medium">{themeOption.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={handleLogout}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${themeStyles.text} hover:bg-red-50 hover:text-red-600 ${theme === 'dark' ? 'hover:bg-red-900/20' : ''}`}
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 to-red-600">
                <LogOut className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Top bar */}
        <div className={`${themeStyles.topbar} backdrop-blur-xl border-b shadow-sm transition-all duration-300`}>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className={`lg:hidden p-3 rounded-xl bg-gradient-to-br ${themeStyles.accent} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className={`hidden md:flex items-center space-x-3 ${themeStyles.card} backdrop-blur-sm rounded-xl px-4 py-3 border shadow-sm`}>
                  <Search className={`w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className={`bg-transparent border-none outline-none text-sm placeholder-gray-400 w-40 font-medium ${themeStyles.text}`}
                  />
                </div>
                
                {/* Notifications */}
                <button className={`relative p-3 rounded-xl ${themeStyles.card} border hover:shadow-md transition-all duration-300 hover:scale-105`}>
                  <Bell className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                </button>
                
                {user && (
                  <div className={`flex items-center space-x-3 ${themeStyles.card} backdrop-blur-sm rounded-xl px-4 py-3 border shadow-sm`}>
                    <div className="text-right hidden sm:block">
                      <p className={`text-sm font-bold ${themeStyles.text}`}>{user.name}</p>
                      <div className="flex items-center justify-end space-x-1 mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleBadge(user.role).color}`}>
                          {getRoleBadge(user.role).icon}
                          <span className="ml-1">{getRoleBadge(user.role).text}</span>
                        </span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${themeStyles.accent} rounded-xl flex items-center justify-center shadow-lg`}>
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-lg">
                          {getUserInitials(user.name)}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-8 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;