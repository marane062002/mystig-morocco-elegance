import { useState, useEffect, useRef } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Demand, DemandCity, DemandStatus, City, Hotel, Transport, ServiceOffering, Activity } from '@/models/travel-programs';
import { demandsAPI, citiesAPI, hotelsAPI, transportsAPI, servicesAPI, activitiesAPI } from '@/services/travel-programs-api';
import { X, Send, ChevronDown, ChevronUp, Trash2, Edit, Check, XCircle, Save, RefreshCw, Download, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const Demands = () => {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [transports, setTransports] = useState<Transport[]>([]);
  const [services, setServices] = useState<ServiceOffering[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<{type: string, demandId: string, cityId: string, field: string} | null>(null);
  const [tempSelections, setTempSelections] = useState<{
    hotel: string | null, 
    transport: string | null, 
    services: string[],
    activities: string[]
  }>({
    hotel: null,
    transport: null,
    services: [],
    activities: []
  });
  const [generatingPdf, setGeneratingPdf] = useState<string | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [demandsRes, citiesRes, hotelsRes, transportsRes, servicesRes, activitiesRes] = await Promise.all([
        demandsAPI.getAll(),
        citiesAPI.getAll(),
        hotelsAPI.getAll(),
        transportsAPI.getAll(),
        servicesAPI.getAll(),
        activitiesAPI.getAll(),
      ]);
      setDemands(demandsRes || []);
      setCities(citiesRes || []);
      setHotels(hotelsRes || []);
      setTransports(transportsRes || []);
      setServices(servicesRes || []);
      setActivities(activitiesRes || []);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const refreshDemand = async (demandId: string) => {
    try {
      const updatedDemand = await demandsAPI.getById(demandId);
      setDemands(prev => prev.map(d => d.id === demandId ? updatedDemand : d));
    } catch (err) {
      setError('Failed to refresh demand data');
    }
  };

  const handleExpand = async (id: string) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
      // Refresh the demand data when expanding to get latest changes
      try {
        await refreshDemand(id);
      } catch (err) {
        setError('Failed to refresh demand data');
      }
    }
    setEditingItem(null);
    setTempSelections({
      hotel: null,
      transport: null,
      services: [],
      activities: []
    });
  };

  const updateDemand = async (id: string, data: Partial<Demand>) => {
    try {
      await demandsAPI.update(id, data);
      await refreshDemand(id);
    } catch (err) {
      setError('Failed to update demand');
      throw err;
    }
  };

  const deleteDemand = async (id: string) => {
    try {
      await demandsAPI.delete(id);
    } catch (err) {
      setError('Failed to delete demand');
      throw err;
    }
  };

  const sendDemand = async (id: string) => {
    try {
      await demandsAPI.send(id);
      await refreshDemand(id);
    } catch (err) {
      setError('Failed to send demand');
      throw err;
    }
  };

  const handleStatusChange = async (demandId: string, status: DemandStatus) => {
    try {
      await updateDemand(demandId, { status });
    } catch {
      setError('Failed to update status');
    }
  };

  const handleHotelChange = async (demandId: string, cityId: string, hotelId: string) => {
    setUpdating(`hotel-${cityId}`);
    try {
      await demandsAPI.updateHotel(demandId, cityId, hotelId);
      await refreshDemand(demandId);
    } catch (err) {
      setError('Failed to update hotel');
    } finally {
      setUpdating(null);
    }
  };

  const handleTransportChange = async (demandId: string, cityId: string, transportId: string) => {
    setUpdating(`transport-${cityId}`);
    try {
      await demandsAPI.updateTransport(demandId, cityId, transportId);
      await refreshDemand(demandId);
    } catch (err) {
      setError('Failed to update transport');
    } finally {
      setUpdating(null);
    }
  };

  const handleServicesChange = async (demandId: string, cityId: string, serviceIds: string[]) => {
    setUpdating(`services-${cityId}`);
    try {
      await demandsAPI.updateServices(demandId, cityId, serviceIds);
      await refreshDemand(demandId);
    } catch (err) {
      setError('Failed to update services');
    } finally {
      setUpdating(null);
    }
  };

  const handleActivitiesChange = async (demandId: string, cityId: string, activityIds: string[]) => {
    setUpdating(`activities-${cityId}`);
    try {
      await demandsAPI.updateActivities(demandId, cityId, activityIds);
      await refreshDemand(demandId);
    } catch (err) {
      setError('Failed to update activities');
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer cette demande ?')) {
      try {
        await deleteDemand(id);
        setDemands(prev => prev.filter(d => d.id !== id));
      } catch {
        setError('Failed to delete demand');
      }
    }
  };

  const handleSend = async (id: string) => {
    try {
      await sendDemand(id);
    } catch {
      setError('Failed to send offer');
    }
  };

  const startEditing = (demandId: string, cityId: string, field: string, currentValues: any) => {
    setEditingItem({ type: 'demandCity', demandId, cityId, field });
    
    const demand = demands.find(d => d.id === demandId);
    const city = demand?.cities?.find(c => c.id === cityId);
    
    if (field === 'hotel') {
      setTempSelections(prev => ({
        ...prev,
        hotel: city?.selectedHotel?.id || null
      }));
    } else if (field === 'transport') {
      setTempSelections(prev => ({
        ...prev,
        transport: city?.selectedTransport?.id || null
      }));
    } else if (field === 'services') {
      setTempSelections(prev => ({
        ...prev,
        services: city?.services?.map((s: ServiceOffering) => s.id) || []
      }));
    } else if (field === 'activities') {
      setTempSelections(prev => ({
        ...prev,
        activities: city?.activities?.map((a: Activity) => a.id) || []
      }));
    }
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setTempSelections({
      hotel: null,
      transport: null,
      services: [],
      activities: []
    });
  };

  const saveEditing = async () => {
    if (!editingItem) return;
    
    const { demandId, cityId, field } = editingItem;
    
    try {
      if (field === 'hotel' && tempSelections.hotel !== null) {
        await handleHotelChange(demandId, cityId, tempSelections.hotel);
      } else if (field === 'transport' && tempSelections.transport !== null) {
        await handleTransportChange(demandId, cityId, tempSelections.transport);
      } else if (field === 'services') {
        await handleServicesChange(demandId, cityId, tempSelections.services);
      } else if (field === 'activities') {
        await handleActivitiesChange(demandId, cityId, tempSelections.activities);
      }
      
      setEditingItem(null);
      setTempSelections({
        hotel: null,
        transport: null,
        services: [],
        activities: []
      });
    } catch {
      setError('Failed to save changes');
    }
  };

  const getCityName = (cityId: string) => {
    return cities.find(c => c.id === cityId)?.name || 'Ville inconnue';
  };

  const calcCityPrice = (dc: DemandCity) => {
    const hotelPrice = dc.selectedHotel?.price || 0;
    const transportPrice = dc.selectedTransport?.price || 0;
    const servicesSum = (dc.services || []).reduce((sum, s) => sum + (s.price || 0), 0);
    const activitiesSum = (dc.activities || []).reduce((sum, a) => sum + (a.price || 0), 0);
    
    return (hotelPrice + transportPrice) * (dc.durationDays || 0) + servicesSum + activitiesSum;
  };

  const calcTotalPrice = (demand: Demand) => {
    return (demand.cities || []).reduce((total, dc) => total + calcCityPrice(dc), 0);
  };

  const isUpdating = (cityId: string, field: string) => {
    return updating === `${field}-${cityId}`;
  };

  // Function to generate PDF invoice
  const generateInvoicePDF = async (demand: Demand) => {
    setGeneratingPdf(demand.id);
    try {
      // Create new PDF document
      const doc = new jsPDF();
      
      // Add company logo and header
      doc.setFontSize(22);
      doc.setTextColor(40, 103, 160);
      doc.text('VOYAGE MAROC', 105, 25, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text('Votre partenaire de voyage au Maroc', 105, 32, { align: 'center' });
      
      doc.setFontSize(10);
      doc.text('123 Avenue Mohammed V, Casablanca, Maroc', 105, 40, { align: 'center' });
      doc.text('Tél: +212 5 22 123 456 | Email: contact@voyagemaroc.ma', 105, 45, { align: 'center' });
      
      // Add invoice title
      doc.setFontSize(16);
      doc.setTextColor(40, 40, 40);
      doc.text('FACTURE', 105, 60, { align: 'center' });
      
      // Add invoice details
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(`Facture N°: ${demand.id.slice(0, 8).toUpperCase()}`, 20, 70);
      doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 75);
      
      // Client information
      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);
      doc.text('CLIENT:', 20, 85);
      
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(`${demand.fullName}`, 20, 92);
      doc.text(`${demand.email}`, 20, 97);
      doc.text(`${demand.phone}`, 20, 102);
      
      // Trip details
      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);
      doc.text('DÉTAILS DU VOYAGE:', 20, 115);
      
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(`Nombre de voyageurs: ${demand.travelers}`, 20, 122);
      doc.text(`Période: ${demand.periodDays} jours`, 20, 127);
      
      // Table for cities and services
      const tableColumn = ["Destination", "Hébergement", "Transport", "Services", "Activités", "Montant"];
      const tableRows: any[] = [];
      
      demand.cities?.forEach((city) => {
        const cityName = getCityName(city.city.id);
        const hotel = city.selectedHotel ? `${city.selectedHotel.name} (${city.selectedHotel.price} MAD/nuit)` : '-';
        const transport = city.selectedTransport ? `${city.selectedTransport.type} (${city.selectedTransport.price} MAD/jour)` : '-';
        const servicesList = city.services?.map(s => s.type).join(', ') || '-';
        const activitiesList = city.activities?.map(a => a.name).join(', ') || '-';
        const amount = `${calcCityPrice(city)} MAD`;
        
        tableRows.push([cityName, hotel, transport, servicesList, activitiesList, amount]);
      });
      
      // Add total row
      tableRows.push(['TOTAL', '', '', '', '', `${calcTotalPrice(demand)} MAD`]);
      
      // Generate the table
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 135,
        theme: 'striped',
        headStyles: {
          fillColor: [40, 103, 160],
          textColor: 255,
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        },
        footStyles: {
          fillColor: [40, 103, 160],
          textColor: 255,
          fontStyle: 'bold'
        }
      });
      
      // Add footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text('Merci pour votre confiance!', 105, doc.internal.pageSize.height - 10, { align: 'center' });
      }
      
      // Save the PDF
      doc.save(`facture-${demand.fullName.replace(/\s+/g, '-')}-${demand.id.slice(0, 8)}.pdf`);
      
    } catch (err) {
      setError('Erreur lors de la génération du PDF');
      console.error('PDF generation error:', err);
    } finally {
      setGeneratingPdf(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
          Gestion des Demandes
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-4">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-100 to-green-100 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Liste des demandes</h2>
              <button 
                onClick={fetchAll}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2 transition-colors duration-200"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Actualiser</span>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-500">Chargement...</p>
              </div>
            ) : demands.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucune demande trouvée</p>
              </div>
            ) : (
              <div className="space-y-4">
                {demands.map((demand) => (
                  <div key={demand.id} className="border rounded-xl p-4 bg-gradient-to-br from-blue-50 to-green-50 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-800">{demand.fullName}</h3>
                        <div className="text-sm text-gray-600">{demand.email} | {demand.phone}</div>
                        <div className="text-sm text-gray-600">Voyageurs: {demand.travelers}</div>
                        <div className="text-sm text-gray-600">Période: {demand.periodDays} jours</div>
                        <div className="text-sm text-gray-600 flex items-center">
                          Statut: 
                          <select
                            value={demand.status}
                            onChange={(e) => handleStatusChange(demand.id, e.target.value as DemandStatus)}
                            className="ml-2 px-2 py-1 border rounded bg-white text-sm"
                          >
                            <option value="PENDING">En attente</option>
                            <option value="VALIDATED">Validé</option>
                            <option value="SENT">Envoyé</option>
                          </select>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Prix total: <span className="font-bold text-green-600">{calcTotalPrice(demand)} MAD</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button 
                          onClick={() => generateInvoicePDF(demand)}
                          disabled={generatingPdf === demand.id}
                          className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center space-x-2 transition-colors duration-200 text-sm"
                        >
                          {generatingPdf === demand.id ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <FileText className="w-4 h-4" />
                          )}
                          <span>Facture PDF</span>
                        </button>
                        <button 
                          onClick={() => handleSend(demand.id)} 
                          className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center space-x-2 transition-colors duration-200 text-sm"
                          disabled={demand.status === 'SENT'}
                        >
                          <Send className="w-4 h-4" />
                          <span>Envoyer</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(demand.id)} 
                          className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center space-x-2 transition-colors duration-200 text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Supprimer</span>
                        </button>
                        <button 
                          onClick={() => handleExpand(demand.id)} 
                          className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center space-x-2 transition-colors duration-200 text-sm"
                        >
                          {expanded === demand.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          <span>Détails</span>
                        </button>
                      </div>
                    </div>
                    
                    {expanded === demand.id && (
                      <div className="mt-4 space-y-4">
                        {(demand.cities || []).map((dc) => (
                          <div key={dc.id} className="border rounded-lg p-4 bg-white shadow-sm">
                            <div className="font-semibold text-blue-700 mb-2 text-lg">{getCityName(dc.city.id)}</div>
                            <div className="text-sm mb-2 text-gray-600">Du {dc.startDate} au {dc.endDate} ({dc.durationDays} jours)</div>
                            
                            {/* Activities Section */}
                            <div className="mb-4">
                              <label className="font-semibold block mb-2 text-gray-700">Activités:</label>
                              {editingItem?.cityId === dc.id && editingItem?.field === 'activities' ? (
                                <div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                    {activities
                                      .filter(a => a.city.id === dc.city.id)
                                      .map(activity => (
                                        <div key={activity.id} className="flex items-center">
                                          <input
                                            type="checkbox"
                                            checked={tempSelections.activities.includes(activity.id)}
                                            onChange={(e) => {
                                              if (e.target.checked) {
                                                setTempSelections(prev => ({
                                                  ...prev,
                                                  activities: [...prev.activities, activity.id]
                                                }));
                                              } else {
                                                setTempSelections(prev => ({
                                                  ...prev,
                                                  activities: prev.activities.filter(id => id !== activity.id)
                                                }));
                                              }
                                            }}
                                            className="mr-2 rounded text-blue-500 focus:ring-blue-300"
                                          />
                                          <span className="text-sm">{activity.name} ({activity.price} MAD)</span>
                                        </div>
                                      ))
                                    }
                                  </div>
                                  <div className="flex gap-2 mt-2">
                                    <button 
                                      onClick={saveEditing}
                                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1 text-sm transition-colors duration-200"
                                      disabled={isUpdating(dc.id, 'activities')}
                                    >
                                      {isUpdating(dc.id, 'activities') ? (
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                      ) : (
                                        <Check className="w-4 h-4" />
                                      )}
                                      Enregistrer
                                    </button>
                                    <button 
                                      onClick={cancelEditing}
                                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1 text-sm transition-colors duration-200"
                                    >
                                      <XCircle className="w-4 h-4" /> Annuler
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-wrap gap-4">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="font-semibold text-gray-700">
                                      Activités sélectionnées ({dc.activities?.length || 0})
                                    </span>
                                    <button 
                                      onClick={() => startEditing(demand.id, dc.id, 'activities', dc)}
                                      className="p-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                  </div>
                                  {(dc.activities && dc.activities.length > 0) && (
                                    <ul className="list-disc ml-6 text-sm">
                                      {(dc.activities || []).map(a => (
                                        <li key={a.id} className="text-gray-600">{a.name} <span className="text-xs text-gray-500">({a.price} MAD)</span></li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            {/* Hotel Section */}
                            <div className="mb-4 flex items-start justify-between">
                              <div className="flex-1">
                                <label className="font-semibold block mb-2 text-gray-700">Hôtel:</label>
                                {editingItem?.cityId === dc.id && editingItem?.field === 'hotel' ? (
                                  <div className="flex items-center gap-2">
                                    <select
                                      value={tempSelections.hotel || ''}
                                      onChange={e => setTempSelections(prev => ({...prev, hotel: e.target.value}))}
                                      className="p-2 border rounded flex-1 text-sm focus:ring-blue-300 focus:border-blue-300"
                                    >
                                      <option value="">Sélectionner un hôtel</option>
                                      {hotels
                                        .filter(h => h.city.id === dc.city.id)
                                        .map(hotel => (
                                          <option key={hotel.id} value={hotel.id}>
                                            {hotel.name} ({hotel.price} MAD/nuit)
                                          </option>
                                        ))
                                      }
                                    </select>
                                    <button 
                                      onClick={saveEditing}
                                      className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                                      disabled={isUpdating(dc.id, 'hotel')}
                                    >
                                      {isUpdating(dc.id, 'hotel') ? (
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                      ) : (
                                        <Check className="w-4 h-4" />
                                      )}
                                    </button>
                                    <button 
                                      onClick={cancelEditing}
                                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm">
                                      {dc.selectedHotel 
                                        ? `${dc.selectedHotel.name} (${dc.selectedHotel.price} MAD/nuit)` 
                                        : 'Aucun hôtel sélectionné'
                                      }
                                    </span>
                                    <button 
                                      onClick={() => startEditing(demand.id, dc.id, 'hotel', dc)}
                                      className="p-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Transport Section */}
                            <div className="mb-4 flex items-start justify-between">
                              <div className="flex-1">
                                <label className="font-semibold block mb-2 text-gray-700">Transport:</label>
                                {editingItem?.cityId === dc.id && editingItem?.field === 'transport' ? (
                                  <div className="flex items-center gap-2">
                                    <select
                                      value={tempSelections.transport || ''}
                                      onChange={e => setTempSelections(prev => ({...prev, transport: e.target.value}))}
                                      className="p-2 border rounded flex-1 text-sm focus:ring-blue-300 focus:border-blue-300"
                                    >
                                      <option value="">Sélectionner un transport</option>
                                      {transports
                                        .filter(t => t.city.id === dc.city.id)
                                        .map(transport => (
                                          <option key={transport.id} value={transport.id}>
                                            {transport.type} ({transport.price} MAD/jour)
                                          </option>
                                        ))
                                      }
                                    </select>
                                    <button 
                                      onClick={saveEditing}
                                      className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                                      disabled={isUpdating(dc.id, 'transport')}
                                    >
                                      {isUpdating(dc.id, 'transport') ? (
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                      ) : (
                                        <Check className="w-4 h-4" />
                                      )}
                                    </button>
                                    <button 
                                      onClick={cancelEditing}
                                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
                                    >
                                      <XCircle className="w-4 h-4" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm">
                                      {dc.selectedTransport 
                                        ? `${dc.selectedTransport.type} (${dc.selectedTransport.price} MAD/jour)` 
                                        : 'Aucun transport sélectionné'
                                      }
                                    </span>
                                    <button 
                                      onClick={() => startEditing(demand.id, dc.id, 'transport', dc)}
                                      className="p-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Services Section */}
                            <div className="mb-4 flex items-start justify-between">
                              <div className="flex-1">
                                <label className="font-semibold block mb-2 text-gray-700">Services:</label>
                                {editingItem?.cityId === dc.id && editingItem?.field === 'services' ? (
                                  <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                      {services
                                        .filter(s => s.city.id === dc.city.id)
                                        .map(service => (
                                          <div key={service.id} className="flex items-center">
                                            <input
                                              type="checkbox"
                                              checked={tempSelections.services.includes(service.id)}
                                              onChange={(e) => {
                                                if (e.target.checked) {
                                                  setTempSelections(prev => ({
                                                    ...prev,
                                                    services: [...prev.services, service.id]
                                                  }));
                                                } else {
                                                  setTempSelections(prev => ({
                                                    ...prev,
                                                    services: prev.services.filter(id => id !== service.id)
                                                  }));
                                                }
                                              }}
                                              className="mr-2 rounded text-blue-500 focus:ring-blue-300"
                                            />
                                            <span className="text-sm">{service.providerName} - {service.type} ({service.price} MAD)</span>
                                          </div>
                                        ))
                                      }
                                    </div>
                                    <div className="flex gap-2 mt-2">
                                      <button 
                                        onClick={saveEditing}
                                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1 text-sm transition-colors duration-200"
                                        disabled={isUpdating(dc.id, 'services')}
                                      >
                                        {isUpdating(dc.id, 'services') ? (
                                          <RefreshCw className="w-4 h-4 animate-spin" />
                                        ) : (
                                          <Check className="w-4 h-4" />
                                        )}
                                        Enregistrer
                                      </button>
                                      <button 
                                        onClick={cancelEditing}
                                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1 text-sm transition-colors duration-200"
                                      >
                                        <XCircle className="w-4 h-4" /> Annuler
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="font-semibold text-gray-700">
                                        Services sélectionnés ({dc.services?.length || 0})
                                      </span>
                                      <button 
                                        onClick={() => startEditing(demand.id, dc.id, 'services', dc)}
                                        className="p-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200"
                                      >
                                        <Edit className="w-4 h-4" />
                                      </button>
                                    </div>
                                    {(dc.services && dc.services.length > 0) && (
                                      <ul className="list-disc ml-6 text-sm">
                                        {dc.services.map(service => (
                                          <li key={service.id} className="text-gray-600">
                                            {service.providerName} - {service.type} ({service.price} MAD)
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* City Total Amount */}
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                              <div className="font-semibold text-gray-700">
                                Total pour {getCityName(dc.city.id)}: 
                                <span className="ml-2 text-green-600">{calcCityPrice(dc)} MAD</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Global Total Amount */}
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="text-xl font-bold text-blue-800 flex justify-between items-center">
                            <span>Total global:</span>
                            <span>{calcTotalPrice(demand)} MAD</span>
                          </div>
                        </div>
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

export default Demands;