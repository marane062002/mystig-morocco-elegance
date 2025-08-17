import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Eye } from 'lucide-react';

const Statistics = () => {
  const monthlyData = [
    { month: 'Jan', revenue: 25000, bookings: 45, clients: 38 },
    { month: 'Fév', revenue: 32000, bookings: 52, clients: 42 },
    { month: 'Mar', revenue: 28000, bookings: 48, clients: 40 },
    { month: 'Avr', revenue: 35000, bookings: 58, clients: 48 },
    { month: 'Mai', revenue: 42000, bookings: 65, clients: 55 },
    { month: 'Jun', revenue: 45230, bookings: 72, clients: 62 }
  ];

  const topOffers = [
    { name: 'Circuit Désert Sahara', bookings: 28, revenue: '15,400 MAD', rating: 4.9 },
    { name: 'Riad Marrakech Premium', bookings: 24, revenue: '12,800 MAD', rating: 4.8 },
    { name: 'Excursion Atlas Mountains', bookings: 19, revenue: '8,550 MAD', rating: 4.7 },
    { name: 'Week-end Essaouira', bookings: 15, revenue: '6,750 MAD', rating: 4.6 }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Statistiques de performance
            </h1>
            <p className="text-muted-foreground">
              Analysez vos ventes et performances sur les 6 derniers mois
            </p>
          </div>
          <div className="flex space-x-3">
            <select className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
              <option>6 derniers mois</option>
              <option>12 derniers mois</option>
              <option>Cette année</option>
            </select>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-background rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-green-600 text-sm font-medium">+18.2%</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">207,580 MAD</h3>
            <p className="text-muted-foreground text-sm">Revenus totaux</p>
          </div>

          <div className="bg-background rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-blue-600 text-sm font-medium">+12.5%</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">320</h3>
            <p className="text-muted-foreground text-sm">Réservations totales</p>
          </div>

          <div className="bg-background rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-purple-600 text-sm font-medium">+8.7%</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">285</h3>
            <p className="text-muted-foreground text-sm">Clients uniques</p>
          </div>

          <div className="bg-background rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-orange-600 text-sm font-medium">+25.3%</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">1,247</h3>
            <p className="text-muted-foreground text-sm">Vues profil</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <div className="bg-background rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Évolution des revenus</h2>
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-primary rounded-t-lg transition-all duration-500 hover:bg-primary/80"
                    style={{ height: `${(data.revenue / 50000) * 200}px` }}
                  ></div>
                  <span className="text-xs text-muted-foreground mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bookings Chart */}
          <div className="bg-background rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Réservations mensuelles</h2>
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-400"
                    style={{ height: `${(data.bookings / 80) * 200}px` }}
                  ></div>
                  <span className="text-xs text-muted-foreground mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Offers */}
        <div className="bg-background rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Offres les plus performantes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topOffers.map((offer, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{offer.name}</h3>
                      <p className="text-sm text-muted-foreground">{offer.bookings} réservations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{offer.revenue}</p>
                    <p className="text-sm text-muted-foreground">★ {offer.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Statistics;