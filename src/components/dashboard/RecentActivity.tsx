import { Clock, MapPin, Users, DollarSign, Star, Calendar } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const RecentActivity = () => {
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

  const activities = [
    {
      id: 1,
      type: 'booking',
      title: 'New Booking - Desert Circuit',
      description: 'Martin Family - 4 people',
      amount: '$2,800',
      time: '2h ago',
      icon: MapPin,
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 2,
      type: 'review',
      title: 'New Customer Review',
      description: 'Sarah L. - 5 stars for Riad Marrakech',
      time: '4h ago',
      icon: Star,
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      description: 'Atlas Mountains Package',
      amount: '$1,500',
      time: '6h ago',
      icon: DollarSign,
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: 4,
      type: 'booking',
      title: 'Booking Cancelled',
      description: 'Essaouira Excursion - Refund processed',
      time: '1 day ago',
      icon: Calendar,
      gradient: 'from-red-500 to-pink-600'
    }
  ];

  return (
    <div className={`${themeStyles.card} backdrop-blur-sm rounded-2xl border shadow-lg overflow-hidden`}>
      <div className={`p-6 bg-gradient-to-r ${theme === 'moroccan' ? 'from-orange-100 to-red-100' : theme === 'dark' ? 'from-gray-800 to-gray-700' : 'from-gray-50 to-gray-100'} border-b`}>
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${themeStyles.accent} rounded-xl flex items-center justify-center shadow-lg`}>
            <Clock className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-xl font-bold ${themeStyles.text}`}>Recent Activity</h2>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className={`relative p-4 rounded-xl ${themeStyles.card} border hover:shadow-lg transition-all duration-300 hover:scale-102 group overflow-hidden`}
            >
              <div className="flex items-start space-x-4 relative z-10">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${activity.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <activity.icon className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold ${themeStyles.text} mb-1 group-hover:scale-105 transition-transform duration-300`}>
                    {activity.title}
                  </h3>
                  <p className={`${themeStyles.subtext} mb-2`}>
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Clock className={`w-4 h-4 ${themeStyles.subtext}`} />
                    <span className={`text-sm ${themeStyles.subtext} font-medium`}>{activity.time}</span>
                  </div>
                </div>
                
                {activity.amount && (
                  <div className="text-right">
                    <p className={`font-bold ${themeStyles.text} text-lg`}>
                      {activity.amount}
                    </p>
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1 shadow-lg"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;