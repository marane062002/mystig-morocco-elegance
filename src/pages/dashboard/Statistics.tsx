import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { statisticsAPI } from '@/services/api';

// Types for statistics responses
type DashboardDto = {
  totalRevenue: number;
  revenueGrowth?: number;
  totalBookings: number;
  bookingsGrowth?: number;
  uniqueClients?: number;
  clientsGrowth?: number;
  profileViews?: number;
  profileViewsGrowth?: number;
  topItems?: PopularItemDto[];
  topSellers?: SellerPerformanceDto[];
  customerAnalytics?: CustomerAnalyticsDto;
  overallCustomerSatisfaction?: number;
};

type RevenueDto = { period: string; amount: number };
type BookingTrendDto = { period: string; count: number };
type PopularItemDto = { itemId: string; itemType: string; itemName: string; bookings: number; revenue?: number; rating?: number };
type SellerPerformanceDto = { sellerId: string; sellerName: string; bookingsCount: number; revenue: number };
type CustomerAnalyticsDto = { customersByCountry: Record<string, number> };

const Statistics = () => {
  const [period, setPeriod] = useState('month');
  const [loading, setLoading] = useState(false);

  // Dynamic statistics state
  const [dashboard, setDashboard] = useState<DashboardDto | null>(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState<RevenueDto[]>([]);
  const [monthlyBookings, setMonthlyBookings] = useState<BookingTrendDto[]>([]);
  const [topOffers, setTopOffers] = useState<PopularItemDto[]>([]);
  const [customerAnalytics, setCustomerAnalytics] = useState<CustomerAnalyticsDto | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Dashboard summary
        const dash = await statisticsAPI.getDashboard();
        setDashboard(dash);

        // Revenue chart
        const revenue = await statisticsAPI.getRevenue({ period });
        setMonthlyRevenue(revenue);

        // Bookings chart
        const bookings = await statisticsAPI.getBookings({ period });
        setMonthlyBookings(bookings);

        // Top offers
        const offers = await statisticsAPI.getPopularItems({ limit: 5 });
        setTopOffers(offers);

        // Customer analytics
        const analytics = await statisticsAPI.getCustomerAnalytics();
        setCustomerAnalytics(analytics);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [period]);

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
              Analysez vos ventes et performances
            </p>
          </div>
          <div className="flex space-x-3">
            <select
              className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={period}
              onChange={e => setPeriod(e.target.value)}
            >
              <option value="month">12 derniers mois</option>
              <option value="year">5 dernières années</option>
              <option value="day">30 derniers jours</option>
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
              <span className="text-green-600 text-sm font-medium">
                {dashboard?.revenueGrowth ? `+${dashboard.revenueGrowth}%` : ''}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              {dashboard?.totalRevenue?.toLocaleString('fr-MA') ?? '--'} MAD
            </h3>
            <p className="text-muted-foreground text-sm">Revenus totaux</p>
          </div>

          <div className="bg-background rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-blue-600 text-sm font-medium">
                {dashboard?.bookingsGrowth ? `+${dashboard.bookingsGrowth}%` : ''}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              {dashboard?.totalBookings ?? '--'}
            </h3>
            <p className="text-muted-foreground text-sm">Réservations totales</p>
          </div>

          <div className="bg-background rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-purple-600 text-sm font-medium">
                {dashboard?.clientsGrowth ? `+${dashboard.clientsGrowth}%` : ''}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              {dashboard?.uniqueClients ?? '--'}
            </h3>
            <p className="text-muted-foreground text-sm">Clients uniques</p>
          </div>

          <div className="bg-background rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-orange-600 text-sm font-medium">
                {dashboard?.profileViewsGrowth ? `+${dashboard.profileViewsGrowth}%` : ''}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              {dashboard?.profileViews ?? '--'}
            </h3>
            <p className="text-muted-foreground text-sm">Vues profil</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <div className="bg-background rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Évolution des revenus</h2>
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlyRevenue.length === 0 ? (
                <div className="text-muted-foreground">Aucune donnée</div>
              ) : (
                monthlyRevenue.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-primary rounded-t-lg transition-all duration-500 hover:bg-primary/80"
                      style={{ height: `${(data.amount / Math.max(...monthlyRevenue.map(d => d.amount || 1), 1)) * 200}px` }}
                    ></div>
                    <span className="text-xs text-muted-foreground mt-2">{data.period}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Bookings Chart */}
          <div className="bg-background rounded-xl border border-border p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Réservations</h2>
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlyBookings.length === 0 ? (
                <div className="text-muted-foreground">Aucune donnée</div>
              ) : (
                monthlyBookings.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-400"
                      style={{ height: `${(data.count / Math.max(...monthlyBookings.map(d => d.count || 1), 1)) * 200}px` }}
                    ></div>
                    <span className="text-xs text-muted-foreground mt-2">{data.period}</span>
                  </div>
                ))
              )}
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
              {topOffers.length === 0 ? (
                <div className="text-muted-foreground">Aucune donnée</div>
              ) : (
                topOffers.map((offer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{offer.itemName}</h3>
                        <p className="text-sm text-muted-foreground">{offer.bookings} réservations</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{offer.revenue ? `${offer.revenue} MAD` : '--'}</p>
                      <p className="text-sm text-muted-foreground">★ {offer.rating ?? '--'}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Statistics;