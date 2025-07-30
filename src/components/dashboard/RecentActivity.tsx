import { Clock, MapPin, Users, DollarSign } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'booking',
      title: 'Nouvelle réservation - Circuit Désert',
      description: 'Famille Martin - 4 personnes',
      amount: '2,800 MAD',
      time: 'Il y a 2h',
      icon: MapPin,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 2,
      type: 'review',
      title: 'Nouvel avis client',
      description: 'Sarah L. - 5 étoiles pour Riad Marrakech',
      time: 'Il y a 4h',
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Paiement reçu',
      description: 'Forfait Atlas Mountains',
      amount: '1,500 MAD',
      time: 'Il y a 6h',
      icon: DollarSign,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 4,
      type: 'booking',
      title: 'Réservation annulée',
      description: 'Excursion Essaouira - Remboursement effectué',
      time: 'Il y a 1 jour',
      icon: Clock,
      color: 'bg-red-100 text-red-600'
    }
  ];

  return (
    <div className="bg-background rounded-xl border border-border">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Activité récente</h2>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200">
              <div className={`p-2 rounded-lg ${activity.color}`}>
                <activity.icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground mb-1">
                  {activity.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
              
              {activity.amount && (
                <div className="text-right">
                  <p className="font-bold text-foreground">
                    {activity.amount}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="text-primary hover:text-primary/80 font-medium transition-colors duration-200">
            Voir toute l'activité
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;