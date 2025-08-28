import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, Star } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const StatsOverview = () => {
  const { theme } = useTheme();

  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return {
          card: 'bg-gray-900 border-gray-800',
          text: 'text-gray-100',
          subtext: 'text-gray-400',
          accent: 'from-blue-600 to-purple-600'
        };
      case 'moroccan':
        return {
          card: 'bg-white/90 border-orange-200',
          text: 'text-gray-800',
          subtext: 'text-gray-600',
          accent: 'from-orange-500 to-red-500'
        };
      case 'modern':
        return {
          card: 'bg-white border-gray-200',
          text: 'text-gray-900',
          subtext: 'text-gray-600',
          accent: 'from-indigo-500 to-purple-500'
        };
      default:
        return {
          card: 'bg-white border-gray-200',
          text: 'text-gray-900',
          subtext: 'text-gray-600',
          accent: 'from-blue-500 to-indigo-500'
        };
    }
  };

  const themeStyles = getThemeStyles();

  const stats = [
    {
      title: 'Monthly Revenue',
      value: '$45,230',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Bookings',
      value: '127',
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
      gradient: 'from-blue-500 to-cyan-600',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Active Clients',
      value: '89',
      change: '-2.1%',
      trend: 'down',
      icon: Users,
      gradient: 'from-purple-500 to-violet-600',
      bgGradient: 'from-purple-50 to-violet-50'
    },
    {
      title: 'Average Rating',
      value: '4.8/5',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      gradient: 'from-yellow-500 to-orange-600',
      bgGradient: 'from-yellow-50 to-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`relative ${themeStyles.card} backdrop-blur-sm rounded-2xl p-6 border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group overflow-hidden`}
        >
          {/* Background gradient overlay for dark theme */}
          {theme === 'dark' && (
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-5`}></div>
          )}

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-semibold ${
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
              <h3 className={`text-3xl font-bold ${themeStyles.text} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                {stat.value}
              </h3>
              <p className={`${themeStyles.subtext} font-medium`}>
                {stat.title}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;