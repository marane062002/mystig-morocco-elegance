import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
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
  Home
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Tableau de bord', href: '/dashboard', active: true },
    { icon: BarChart3, label: 'Statistiques', href: '/dashboard/statistics' },
    { icon: Hotel, label: 'Hôtels', href: '/dashboard/hotels' },
    { icon: Calendar, label: 'Événements', href: '/dashboard/events' },
    { icon: Car, label: 'Transport', href: '/dashboard/transport' },
    { icon: Package, label: 'Forfaits', href: '/dashboard/packages' },
    { icon: Palette, label: 'Artisanat', href: '/dashboard/artisan' },
    { icon: UtensilsCrossed, label: 'Gastronomie', href: '/dashboard/food' },
    { icon: Ticket, label: 'Billetterie', href: '/dashboard/tickets' },
  ];

  return (
    <div className="min-h-screen bg-luxury-ivory">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h1 className="font-serif text-2xl font-bold text-foreground">
              MystigTravel
            </h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  item.active
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="p-4 border-t border-border space-y-2">
            <a
              href="/dashboard/settings"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            >
              <Settings className="w-5 h-5" />
              <span className="font-medium">Paramètres</span>
            </a>
            <button
              onClick={logout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-background border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user?.name || 'Utilisateur'}</p>
                <p className="text-xs text-muted-foreground">Vendeur Premium</p>
              </div>
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-medium">
                  {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;