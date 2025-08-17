import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Calendar, Users, MapPin, Clock, Edit, Eye } from 'lucide-react';

const Events = () => {
  const events = [
    {
      id: 1,
      title: 'Festival Gnawa Essaouira',
      type: 'Festival',
      date: '2024-06-20',
      time: '20:00',
      location: 'Essaouira',
      capacity: 500,
      sold: 342,
      price: '150 MAD',
      status: 'active',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
    },
    {
      id: 2,
      title: 'Match Raja vs Wydad',
      type: 'Sport',
      date: '2024-07-15',
      time: '18:00',
      location: 'Stade Mohammed V, Casablanca',
      capacity: 1000,
      sold: 756,
      price: '200 MAD',
      status: 'active',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg'
    },
    {
      id: 3,
      title: 'Soirée Traditionnelle Berbère',
      type: 'Culture',
      date: '2024-06-25',
      time: '19:30',
      location: 'Imlil, Atlas',
      capacity: 80,
      sold: 65,
      price: '300 MAD',
      status: 'active',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'festival': return 'bg-purple-100 text-purple-800';
      case 'sport': return 'bg-green-100 text-green-800';
      case 'culture': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Gestion des Événements
            </h1>
            <p className="text-muted-foreground">
              Organisez et vendez des billets pour vos événements
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300">
            <Plus className="w-5 h-5" />
            <span>Créer un événement</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-background rounded-xl p-6 border border-border">
            <h3 className="text-2xl font-bold text-foreground">3</h3>
            <p className="text-muted-foreground text-sm">Événements actifs</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border">
            <h3 className="text-2xl font-bold text-foreground">1,163</h3>
            <p className="text-muted-foreground text-sm">Billets vendus</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border">
            <h3 className="text-2xl font-bold text-foreground">1,580</h3>
            <p className="text-muted-foreground text-sm">Capacité totale</p>
          </div>
          <div className="bg-background rounded-xl p-6 border border-border">
            <h3 className="text-2xl font-bold text-foreground">73.6%</h3>
            <p className="text-muted-foreground text-sm">Taux de remplissage</p>
          </div>
        </div>

        {/* Events List */}
        <div className="bg-background rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Événements à venir</h2>
          </div>
          
          <div className="divide-y divide-border">
            {events.map((event) => (
              <div key={event.id} className="p-6 hover:bg-muted/30 transition-colors duration-200">
                <div className="flex items-start space-x-4">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-foreground text-lg mb-1">{event.title}</h3>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary text-lg">{event.price}</p>
                        <p className="text-sm text-muted-foreground">par billet</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(event.date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm">
                          <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                          <span className="font-medium">{event.sold}</span>
                          <span className="text-muted-foreground">/{event.capacity}</span>
                        </div>
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(event.sold / event.capacity) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((event.sold / event.capacity) * 100)}%
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Events;