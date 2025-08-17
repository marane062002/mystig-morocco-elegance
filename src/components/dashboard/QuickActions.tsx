import { Plus, Upload, MessageCircle, BarChart3 } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Ajouter une offre',
      description: 'Créer un nouveau forfait voyage',
      icon: Plus,
      color: 'bg-primary text-primary-foreground',
      href: '/dashboard/packages/new'
    },
    {
      title: 'Importer photos',
      description: 'Ajouter des images à vos offres',
      icon: Upload,
      color: 'bg-blue-600 text-white',
      href: '/dashboard/media'
    },
    {
      title: 'Messages clients',
      description: '3 nouveaux messages',
      icon: MessageCircle,
      color: 'bg-green-600 text-white',
      href: '/dashboard/messages'
    },
    {
      title: 'Rapport mensuel',
      description: 'Générer le rapport de performance',
      icon: BarChart3,
      color: 'bg-purple-600 text-white',
      href: '/dashboard/reports'
    }
  ];

  return (
    <div className="bg-background rounded-xl border border-border">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Actions rapides</h2>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {actions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className="block p-4 rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">
                    {action.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {action.description}
                  </p>
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