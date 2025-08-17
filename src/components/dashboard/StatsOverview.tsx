import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, Star } from 'lucide-react';

const StatsOverview = () => {
  const stats = [
    {
      title: 'Revenus ce mois',
      value: '45,230 MAD',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Réservations',
      value: '127',
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      title: 'Clients actifs',
      value: '89',
      change: '-2.1%',
      trend: 'down',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Note moyenne',
      value: '4.8/5',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-background rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{stat.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {stat.value}
            </h3>
            <p className="text-muted-foreground text-sm">
              {stat.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;