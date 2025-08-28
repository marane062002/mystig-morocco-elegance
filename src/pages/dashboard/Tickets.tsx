import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Plus, Edit, Trash2, Ticket, Calendar, Users, MapPin, Clock, Download, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Ticket as TicketType, Event, Currency } from '@/models/entities';
import { ticketsAPI, eventsAPI } from '@/services/api';

const defaultForm: Partial<TicketType> = {
  typeName: '',
  price: 0,
  currency: Currency.MAD,
  quantity: 1,
  sold: 0,
  event: undefined,
};

const Tickets = () => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<TicketType> | null>(null);
  const [form, setForm] = useState<Partial<TicketType>>(defaultForm);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all events and tickets
  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const eventsResponse = await eventsAPI.getAll();
      // Handle different API response formats for events
      const eventsData = eventsResponse && eventsResponse.content ? eventsResponse.content : 
                        Array.isArray(eventsResponse) ? eventsResponse : [];
      
      setEvents(eventsData);
      
      const ticketsResponse = await ticketsAPI.getAll();
      // Handle different API response formats for tickets
      const ticketsData = ticketsResponse && ticketsResponse.content ? ticketsResponse.content : 
                         Array.isArray(ticketsResponse) ? ticketsResponse : [];
      
      // Map tickets to include event info
      const allTickets = ticketsData.map((ticket: any) => {
        const ev = eventsData.find((e: Event) => e.id === ticket.eventId);
        return { ...ticket, event: ev };
      });
      setTickets(allTickets);
    } catch (err) {
      setError('Failed to fetch tickets');
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTickets(); }, []);

  const handleEdit = (ticket: TicketType) => {
    setEditing(ticket);
    setForm({
      ...ticket,
      event: ticket.event,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce billet ?")) {
      try {
        await ticketsAPI.delete(id);
        fetchTickets();
      } catch (err) {
        setError('Failed to delete ticket');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.event) return;
    
    try {
      const payload = {
        typeName: form.typeName,
        price: form.price,
        currency: form.currency,
        quantity: form.quantity,
        eventId: form.event.id,
      };
      
      if (editing && editing.id) {
        await ticketsAPI.update(editing.id, payload);
      } else {
        await ticketsAPI.create(payload);
      }
      
      setShowForm(false);
      setEditing(null);
      setForm(defaultForm);
      fetchTickets();
    } catch (err) {
      setError('Failed to save ticket');
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Non spécifié";
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return "Non spécifié";
    return timeString;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Gestion de la Billetterie
            </h1>
            <p className="text-muted-foreground">
              Créez et gérez vos billets d'événements
            </p>
          </div>
          <button 
            onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }}
            className="flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Créer des billets</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex justify-between items-center">
            <span>{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-4"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editing ? 'Modifier le billet' : 'Créer un billet'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-1 font-semibold">Événement *</label>
                  <select
                    value={form.event?.id || ''}
                    onChange={e => {
                      const ev = events.find(ev => ev.id === e.target.value);
                      setForm(f => ({ ...f, event: ev }));
                    }}
                    className="w-full px-4 py-2 border rounded"
                    required
                  >
                    <option value="">Sélectionner un événement</option>
                    {events.map(ev => (
                      <option key={ev.id} value={ev.id}>{ev.title}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-semibold">Nom du billet *</label>
                    <input
                      type="text"
                      value={form.typeName}
                      onChange={e => setForm(f => ({ ...f, typeName: e.target.value }))}
                      className="w-full px-4 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold">Devise *</label>
                    <select
                      value={form.currency}
                      onChange={e => setForm(f => ({ ...f, currency: e.target.value as Currency }))}
                      className="w-full px-4 py-2 border rounded"
                      required
                    >
                      {Object.values(Currency).map(cur => (
                        <option key={cur} value={cur}>{cur}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-semibold">Prix *</label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))}
                      className="w-full px-4 py-2 border rounded"
                      required
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-semibold">Quantité *</label>
                    <input
                      type="number"
                      value={form.quantity}
                      onChange={e => setForm(f => ({ ...f, quantity: Number(e.target.value) }))}
                      className="w-full px-4 py-2 border rounded"
                      required
                      min="1"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditing(null); setForm(defaultForm); }}
                    className="px-4 py-2 rounded bg-muted text-foreground hover:bg-muted/80"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {editing ? 'Modifier' : 'Créer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tickets List */}
        <div className="bg-background rounded-xl border border-border shadow-sm">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Billets d'événements</h2>
          </div>
          <div className="divide-y divide-border">
            {loading ? (
              <div className="p-6 text-center text-muted-foreground">Chargement...</div>
            ) : tickets.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                Aucun billet trouvé. Cliquez sur "Créer des billets" pour commencer.
              </div>
            ) : (
              tickets.map((ticket) => (
                <div key={ticket.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 text-primary rounded-lg">
                        <Ticket className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-bold text-lg">{ticket.typeName}</h3>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {ticket.event?.title || 'Événement inconnu'}
                          </span>
                        </div>
                        
                        {ticket.event && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="w-4 h-4 mr-2" />
                              {ticket.event.venue || "Non spécifié"}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="w-4 h-4 mr-2" />
                              {formatDate(ticket.event.dateRange?.start)}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="w-4 h-4 mr-2" />
                              {formatTime(ticket.event.timeRange?.start)}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-6 mb-3">
                          <div className="flex items-center text-sm">
                            <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                            <span className="font-medium">{ticket.sold || 0}</span>
                            <span className="text-muted-foreground">/{ticket.quantity || 1} vendus</span>
                          </div>
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${((ticket.sold || 0) / (ticket.quantity || 1)) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-green-600">
                            {(ticket.quantity || 0) - (ticket.sold || 0)} disponibles
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-bold text-primary">{ticket.price || 0} {ticket.currency}</span>
                          <span className="text-sm text-muted-foreground">par billet</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex items-center space-x-1 px-3 py-1 rounded bg-blue-500 text-white">
                        <Download className="w-4 h-4" />
                        <span>Exporter</span>
                      </button>
                      <button
                        onClick={() => handleEdit(ticket)}
                        className="flex items-center space-x-1 px-3 py-1 rounded bg-primary text-primary-foreground"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(ticket.id)}
                        className="flex items-center space-x-1 px-3 py-1 rounded bg-red-500 text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tickets;