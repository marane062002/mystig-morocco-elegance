import { useState, useEffect } from "react";
import { Event, EventType, EventStatus, User } from '@/models/entities';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { eventsAPI } from '@/services/api';
import { Plus, Edit, Trash2, Calendar, MapPin, Clock, Tag, X, Sparkles, Users, Star } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const defaultForm: Partial<Event> = {
  title: "",
  description: "",
  type: EventType.FESTIVAL,
  category: "CEREMONY",
  dateRange: { start: "", end: "" },
  timeRange: { start: "", end: "" },
  venue: "",
  address: "",
  city: "",
  status: EventStatus.DRAFT,
  featured: false,
  tags: [],
};

const EVENT_CATEGORIES = [
  "CEREMONY",
  "BASKETBALL", 
  "CONCERT",
  "WORKSHOP",
  "FOOTBALL",
  "EXHIBITION",
  "COMPETITION",
];

const Events = () => {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partial<Event> | null>(null);
  const [form, setForm] = useState<Partial<Event>>(defaultForm);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const getThemeStyles = () => {
    switch (theme) {
      case 'dark':
        return {
          card: 'bg-gray-900 border-gray-800',
          text: 'text-gray-100',
          subtext: 'text-gray-400',
          accent: 'from-blue-600 to-purple-600',
          formBg: 'bg-gray-800',
          inputBg: 'bg-gray-700 border-gray-600 text-gray-100'
        };
      case 'moroccan':
        return {
          card: 'bg-white/90 border-orange-200',
          text: 'text-gray-800',
          subtext: 'text-gray-600',
          accent: 'from-orange-500 to-red-500',
          formBg: 'bg-white',
          inputBg: 'bg-white/60 border-orange-200/50'
        };
      case 'modern':
        return {
          card: 'bg-white border-gray-200',
          text: 'text-gray-900',
          subtext: 'text-gray-600',
          accent: 'from-indigo-500 to-purple-500',
          formBg: 'bg-white',
          inputBg: 'bg-gray-50 border-gray-200'
        };
      default:
        return {
          card: 'bg-white border-gray-200',
          text: 'text-gray-900',
          subtext: 'text-gray-600',
          accent: 'from-blue-500 to-indigo-500',
          formBg: 'bg-white',
          inputBg: 'bg-gray-50 border-gray-200'
        };
    }
  };

  const themeStyles = getThemeStyles();

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await eventsAPI.getAll();
      if (response && response.content && Array.isArray(response.content)) {
        setEvents(response.content);
      } else {
        setEvents([]);
        setError("Received invalid data format from server");
      }
    } catch (err) {
      setError("Failed to fetch events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleEdit = (event: Event) => {
    setEditing(event);
    setForm({
      ...event,
      dateRange: event.dateRange || { start: "", end: "" },
      timeRange: event.timeRange || { start: "", end: "" },
      tags: event.tags || [],
      category: event.category || "CEREMONY",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      try {
        await eventsAPI.delete(id);
        fetchEvents();
      } catch (err) {
        setError("Failed to delete event");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing && editing.id) {
        await eventsAPI.update(editing.id, form);
      } else {
        await eventsAPI.create(form);
      }
      setShowForm(false);
      setEditing(null);
      setForm(defaultForm);
      fetchEvents();
    } catch (err) {
      setError("Failed to save event");
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return 'bg-green-100 text-green-800 border-green-200';
      case 'DRAFT': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Modern Header */}
        <div className={`relative ${themeStyles.card} rounded-2xl p-8 border shadow-lg overflow-hidden`}>
          <div className={`absolute inset-0 bg-gradient-to-r ${themeStyles.accent} opacity-5`}></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${themeStyles.accent} rounded-2xl flex items-center justify-center shadow-lg`}>
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className={`font-serif text-4xl font-bold ${themeStyles.text} mb-2`}>
                  Event Management
                </h1>
                <p className={`${themeStyles.subtext} text-lg`}>
                  Create and manage authentic cultural experiences
                </p>
              </div>
            </div>
            <button
              onClick={() => { setShowForm(true); setEditing(null); setForm(defaultForm); }}
              className={`flex items-center space-x-2 bg-gradient-to-r ${themeStyles.accent} text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium`}
            >
              <Plus className="w-5 h-5" />
              <span>Add Event</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl relative flex justify-between items-center shadow-sm">
            <span className="font-medium">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-4 p-1 hover:bg-red-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Enhanced Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`${themeStyles.formBg} rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border`}>
              {/* Modal Header */}
              <div className={`p-6 bg-gradient-to-r ${theme === 'moroccan' ? 'from-orange-100 to-red-100' : theme === 'dark' ? 'from-gray-800 to-gray-700' : 'from-gray-50 to-gray-100'} border-b`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${themeStyles.accent} rounded-xl flex items-center justify-center shadow-lg`}>
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <h2 className={`text-2xl font-bold ${themeStyles.text}`}>
                      {editing ? "Edit Event" : "Create New Event"}
                    </h2>
                  </div>
                  <button
                    onClick={() => { setShowForm(false); setEditing(null); setForm(defaultForm); }}
                    className={`p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 ${theme === 'dark' ? 'hover:bg-gray-700' : ''}`}
                  >
                    <X className={`w-6 h-6 ${themeStyles.subtext}`} />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${themeStyles.text} flex items-center`}>
                      <Sparkles className={`w-4 h-4 mr-2 ${theme === 'moroccan' ? 'text-orange-500' : 'text-primary'}`} />
                      Event Title *
                    </label>
                    <input
                      type="text"
                      value={form.title || ""}
                      onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                      placeholder="Enter event name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${themeStyles.text} flex items-center`}>
                      <Tag className={`w-4 h-4 mr-2 ${theme === 'moroccan' ? 'text-orange-500' : 'text-primary'}`} />
                      Event Type *
                    </label>
                    <select
                      value={form.type || EventType.FESTIVAL}
                      onChange={e => setForm(f => ({ ...f, type: e.target.value as EventType }))}
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                    >
                      {Object.values(EventType).map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-semibold ${themeStyles.text}`}>
                    Description *
                  </label>
                  <textarea
                    value={form.description || ""}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 resize-none`}
                    rows={4}
                    placeholder="Describe your event..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${themeStyles.text}`}>Category *</label>
                    <select
                      value={form.category || "CEREMONY"}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                    >
                      {EVENT_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${themeStyles.text}`}>Status *</label>
                    <select
                      value={form.status || EventStatus.DRAFT}
                      onChange={e => setForm(f => ({ ...f, status: e.target.value as EventStatus }))}
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                    >
                      {Object.values(EventStatus).map(stat => (
                        <option key={stat} value={stat}>{stat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${themeStyles.text} flex items-center`}>
                      <Calendar className={`w-4 h-4 mr-2 ${theme === 'moroccan' ? 'text-orange-500' : 'text-primary'}`} />
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={form.dateRange?.start || ""}
                      onChange={e => setForm(f => ({
                        ...f,
                        dateRange: { ...f.dateRange, start: e.target.value }
                      }))}
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${themeStyles.text} flex items-center`}>
                      <Calendar className={`w-4 h-4 mr-2 ${theme === 'moroccan' ? 'text-orange-500' : 'text-primary'}`} />
                      End Date
                    </label>
                    <input
                      type="date"
                      value={form.dateRange?.end || ""}
                      onChange={e => setForm(f => ({
                        ...f,
                        dateRange: { ...f.dateRange, end: e.target.value }
                      }))}
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${themeStyles.text} flex items-center`}>
                      <Clock className={`w-4 h-4 mr-2 ${theme === 'moroccan' ? 'text-orange-500' : 'text-primary'}`} />
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={form.timeRange?.start || ""}
                      onChange={e => setForm(f => ({
                        ...f,
                        timeRange: { ...f.timeRange, start: e.target.value }
                      }))}
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${themeStyles.text} flex items-center`}>
                      <Clock className={`w-4 h-4 mr-2 ${theme === 'moroccan' ? 'text-orange-500' : 'text-primary'}`} />
                      End Time
                    </label>
                    <input
                      type="time"
                      value={form.timeRange?.end || ""}
                      onChange={e => setForm(f => ({
                        ...f,
                        timeRange: { ...f.timeRange, end: e.target.value }
                      }))}
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${themeStyles.text} flex items-center`}>
                      <MapPin className={`w-4 h-4 mr-2 ${theme === 'moroccan' ? 'text-orange-500' : 'text-primary'}`} />
                      Venue
                    </label>
                    <input
                      type="text"
                      value={form.venue || ""}
                      onChange={e => setForm(f => ({ ...f, venue: e.target.value }))}
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                      placeholder="Venue name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${themeStyles.text} flex items-center`}>
                      <MapPin className={`w-4 h-4 mr-2 ${theme === 'moroccan' ? 'text-orange-500' : 'text-primary'}`} />
                      City
                    </label>
                    <input
                      type="text"
                      value={form.city || ""}
                      onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                      placeholder="City"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`block text-sm font-semibold ${themeStyles.text} flex items-center`}>
                    <MapPin className={`w-4 h-4 mr-2 ${theme === 'moroccan' ? 'text-orange-500' : 'text-primary'}`} />
                    Full Address
                  </label>
                  <input
                    type="text"
                    value={form.address || ""}
                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                    className={`w-full px-4 py-3 ${themeStyles.inputBg} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                    placeholder="Complete venue address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${themeStyles.text} flex items-center`}>
                      <Star className={`w-4 h-4 mr-2 ${theme === 'moroccan' ? 'text-orange-500' : 'text-primary'}`} />
                      Featured Event
                    </label>
                    <select
                      value={form.featured ? "true" : "false"}
                      onChange={e => setForm(f => ({ ...f, featured: e.target.value === "true" }))}
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className={`block text-sm font-semibold ${themeStyles.text} flex items-center`}>
                      <Tag className={`w-4 h-4 mr-2 ${theme === 'moroccan' ? 'text-orange-500' : 'text-primary'}`} />
                      Tags
                    </label>
                    <input
                      type="text"
                      value={form.tags?.join(", ") || ""}
                      onChange={e => setForm(f => ({
                        ...f,
                        tags: e.target.value.split(",").map(s => s.trim()).filter(Boolean)
                      }))}
                      className={`w-full px-4 py-3 ${themeStyles.inputBg} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300`}
                      placeholder="Festival, Music, Culture..."
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setEditing(null); setForm(defaultForm); }}
                    className={`px-6 py-3 ${theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-xl transition-all duration-300 font-medium`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-8 py-3 bg-gradient-to-r ${themeStyles.accent} text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium`}
                  >
                    {editing ? "Save Changes" : "Create Event"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Events List */}
        <div className={`${themeStyles.card} rounded-2xl border shadow-lg overflow-hidden`}>
          <div className={`p-6 bg-gradient-to-r ${theme === 'moroccan' ? 'from-orange-100 to-red-100' : theme === 'dark' ? 'from-gray-800 to-gray-700' : 'from-gray-50 to-gray-100'} border-b`}>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 bg-gradient-to-br ${themeStyles.accent} rounded-lg flex items-center justify-center`}>
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h2 className={`text-xl font-bold ${themeStyles.text}`}>Events List</h2>
            </div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="relative">
                  <div className={`w-12 h-12 border-4 ${theme === 'dark' ? 'border-gray-700 border-t-blue-500' : 'border-gray-200 border-t-primary'} rounded-full animate-spin`}></div>
                </div>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <div className={`w-16 h-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Calendar className={`w-8 h-8 ${themeStyles.subtext}`} />
                </div>
                <p className={`${themeStyles.text} text-lg`}>No events found</p>
                <p className={`${themeStyles.subtext} text-sm`}>Click "Add Event" to get started</p>
              </div>
            ) : (
              <div className="space-y-6">
                {events.map((event, index) => (
                  <div 
                    key={event.id} 
                    className={`${themeStyles.card} rounded-xl border p-6 hover:shadow-lg transition-all duration-300 hover:scale-102 group`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className={`font-bold text-xl ${themeStyles.text} group-hover:text-primary transition-colors duration-300`}>
                            {event.title}
                          </h3>
                          {event.featured && (
                            <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full flex items-center space-x-1">
                              <Star className="w-3 h-3" />
                              <span>FEATURED</span>
                            </div>
                          )}
                        </div>
                        <p className={`${themeStyles.subtext} mb-4`}>{event.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <Tag className={`w-4 h-4 ${theme === 'moroccan' ? 'text-orange-500' : 'text-primary'}`} />
                            <span className={`font-medium ${themeStyles.text}`}>Type:</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium">
                              {event.type}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${themeStyles.text}`}>Category:</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-lg text-xs font-medium">
                              {event.category}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${themeStyles.text}`}>Status:</span>
                            <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(event.status)}`}>
                              {event.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-md"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                      <div className={`flex items-center space-x-2 p-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'} rounded-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-blue-200'}`}>
                        <Calendar className={`w-4 h-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                        <div>
                          <span className={`font-semibold ${themeStyles.text}`}>Dates:</span>
                          <span className={`ml-2 ${themeStyles.subtext}`}>{formatDate(event.dateRange?.start)} - {formatDate(event.dateRange?.end)}</span>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-2 p-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-purple-50'} rounded-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-purple-200'}`}>
                        <Clock className={`w-4 h-4 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                        <div>
                          <span className={`font-semibold ${themeStyles.text}`}>Times:</span>
                          <span className={`ml-2 ${themeStyles.subtext}`}>{formatTime(event.timeRange?.start)} - {formatTime(event.timeRange?.end)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-green-50'} rounded-lg border ${theme === 'dark' ? 'border-gray-700' : 'border-green-200'} text-sm`}>
                      <div className="flex items-start space-x-2">
                        <MapPin className={`w-4 h-4 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'} mt-0.5`} />
                        <div>
                          <span className={`font-semibold ${themeStyles.text}`}>Location:</span>
                          <span className={`ml-2 ${themeStyles.subtext}`}>{event.venue || "Not specified"} | {event.city || "Not specified"}</span>
                          {event.address && (
                            <div className={`${themeStyles.subtext} mt-1`}>{event.address}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {event.tags && event.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {event.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex} 
                            className={`px-3 py-1 ${theme === 'moroccan' ? 'bg-orange-100 text-orange-800 border-orange-200' : theme === 'dark' ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-gray-100 text-gray-800 border-gray-200'} rounded-full text-xs font-medium border`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Events;