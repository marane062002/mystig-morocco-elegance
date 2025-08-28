import { Plus, Upload, MessageCircle, BarChart3, Sparkles } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const QuickActions = () => {
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

  const actions = [
    {
      title: 'Add New Offer',
      description: 'Create a new travel package',
      icon: Plus,
      gradient: 'from-blue-500 to-cyan-600',
      href: '/dashboard/packages'
    },
    {
      title: 'Upload Photos',
      description: 'Add images to your offers',
      icon: Upload,
      gradient: 'from-purple-500 to-violet-600',
      href: '/dashboard/media'
    },
    {
      title: 'Client Messages',
      description: '3 new messages',
      icon: MessageCircle,
      gradient: 'from-green-500 to-emerald-600',
      href: '/dashboard/messages',
      badge: '3'
    },
    {
      title: 'Monthly Report',
      description: 'Generate performance report',
      icon: BarChart3,
      gradient: 'from-orange-500 to-red-600',
      href: '/dashboard/statistics'
    }
  ];

  return (
    <div className={`${themeStyles.card} backdrop-blur-sm rounded-2xl border shadow-lg overflow-hidden`}>
      <div className={`p-6 bg-gradient-to-r ${theme === 'moroccan' ? 'from-orange-100 to-red-100' : theme === 'dark' ? 'from-gray-800 to-gray-700' : 'from-gray-50 to-gray-100'} border-b`}>
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${themeStyles.accent} rounded-xl flex items-center justify-center shadow-lg`}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-xl font-bold ${themeStyles.text}`}>Quick Actions</h2>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {actions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className={`relative block p-4 rounded-xl ${themeStyles.card} border hover:shadow-lg transition-all duration-300 group hover:scale-105 overflow-hidden`}
            >
              <div className="flex items-center space-x-4 relative z-10">
                <div className={`relative p-3 rounded-xl bg-gradient-to-br ${action.gradient} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <action.icon className="w-6 h-6 text-white" />
                  {action.badge && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse shadow-lg">
                      {action.badge}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-bold ${themeStyles.text} mb-1 group-hover:scale-105 transition-transform duration-300`}>
                    {action.title}
                  </h3>
                  <p className={`${themeStyles.subtext}`}>
                    {action.description}
                  </p>
                </div>

                <div className={`w-8 h-8 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 shadow-lg`}>
                  <div className="w-3 h-3 border-r-2 border-b-2 border-white transform rotate-[-45deg]"></div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;