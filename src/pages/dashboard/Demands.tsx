import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Demand, DemandStatus } from '@/models/travel-programs';
import { demandsAPI, citiesAPI, hotelsAPI, transportsAPI, servicesAPI, activitiesAPI } from '@/services/travel-programs-api';
import { 
  X, Send, ChevronDown, ChevronUp, Trash2, Edit, Check, XCircle, 
  Save, RefreshCw, FileText, Plus, Minus, User, Users, Calendar, 
  MapPin, Hotel, Activity, Globe, Truck, CreditCard, MessageCircle,
  Phone, Mail, DollarSign, Percent, Coins
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// Helper interface for display
interface DisplayDemand extends Demand {
  fullName: string;
  email: string;
  phone: string;
  travelers: number;
  periodDays: number;
}

const Demands = () => {
  const [demands, setDemands] = useState<DisplayDemand[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [hotels, setHotels] = useState<any[]>([]);
  const [transports, setTransports] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<{type: string, demandId: string, cityId: string, field: string} | null>(null);
  const [tempSelections, setTempSelections] = useState<{
    hotel: string | null, 
    services: string[],
    activities: string[],
    roomSelections: { roomTypeId: string; roomType: string; price: number; capacity: number; count: number }[]
  }>({
    hotel: null,
    services: [],
    activities: [],
    roomSelections: []
  });
  const [generatingPdf, setGeneratingPdf] = useState<string | null>(null);
  const [globalServices, setGlobalServices] = useState<string[]>([]);
  const [globalTransport, setGlobalTransport] = useState<string | null>(null);
  
  // Pourcentages gérés uniquement côté frontend
  const [benefitPercentage, setBenefitPercentage] = useState<number>(0);
  const [taxPercentage, setTaxPercentage] = useState<number>(10);

  // Transform demand data for display
  const transformDemandForDisplay = (demand: Demand): DisplayDemand => {
    return {
      ...demand,
      fullName: demand.clientInfo?.mainTraveler?.fullName || 'N/A',
      email: demand.clientInfo?.mainTraveler?.email || 'N/A',
      phone: demand.clientInfo?.mainTraveler?.phone || 'N/A',
      travelers: demand.clientInfo?.travelers?.length || 0,
      periodDays: demand.clientInfo?.tripPeriod || 0
    };
  };

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
      
      // Transform demands for display
      const displayDemands = (demandsRes || []).map(transformDemandForDisplay);
      setDemands(displayDemands);
      setCities(citiesRes || []);
      setHotels(hotelsRes || []);
      setTransports(transportsRes || []);
      setServices(servicesRes || []);
      setActivities(activitiesRes || []);
    } catch (err) {
      setError('Failed to fetch data');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshDemand = async (demandId: string) => {
    try {
      const updatedDemand = await demandsAPI.getById(demandId);
      const displayDemand = transformDemandForDisplay(updatedDemand);
      setDemands(prev => prev.map(d => d.id === demandId ? displayDemand : d));
    } catch (err) {
      setError('Failed to refresh demand data');
      console.error('Refresh error:', err);
    }
  };

  const handleExpand = async (id: string) => {
    if (expanded === id) {
      setExpanded(null);
    } else {
      setExpanded(id);
      try {
        await refreshDemand(id);
      } catch (err) {
        setError('Failed to refresh demand data');
      }
    }
    setEditingItem(null);
    setTempSelections({
      hotel: null,
      services: [],
      activities: [],
      roomSelections: []
    });
    setGlobalServices([]);
    setGlobalTransport(null);
  };

  const updateDemand = async (id: string, data: Partial<Demand>) => {
    try {
      await demandsAPI.update(id, data);
      await refreshDemand(id);
    } catch (err) {
      setError('Failed to update demand');
      console.error('Update error:', err);
      throw err;
    }
  };

  const deleteDemand = async (id: string) => {
    try {
      await demandsAPI.delete(id);
    } catch (err) {
      setError('Failed to delete demand');
      console.error('Delete error:', err);
      throw err;
    }
  };

  const sendDemand = async (id: string) => {
    try {
      await demandsAPI.send(id);
      await refreshDemand(id);
    } catch (err) {
      setError('Failed to send demand');
      console.error('Send error:', err);
      throw err;
    }
  };

  const handleStatusChange = async (demandId: string, status: DemandStatus) => {
    try {
      // Use the API method instead of generic update
      await demandsAPI.updateStatus(demandId, status);
      await refreshDemand(demandId);
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
      console.error('Hotel update error:', err);
    } finally {
      setUpdating(null);
    }
  };

  const handleTransportChange = async (demandId: string, transportId: string) => {
    setUpdating(`transport-${demandId}`);
    try {
      await demandsAPI.updateTransport(demandId, transportId);
      await refreshDemand(demandId);
    } catch (err) {
      setError('Failed to update transport');
      console.error('Transport update error:', err);
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
      console.error('Activities update error:', err);
    } finally {
      setUpdating(null);
    }
  };

  const handleRoomSelectionsChange = async (demandId: string, cityId: string, roomSelections: { roomTypeId: string; roomType: string; price: number; capacity: number; count: number }[]) => {
    setUpdating(`rooms-${cityId}`);
    try {
      await demandsAPI.updateRoomSelections(demandId, cityId, roomSelections);
      await refreshDemand(demandId);
    } catch (err) {
      setError('Failed to update room selections');
      console.error('Room selections update error:', err);
    } finally {
      setUpdating(null);
    }
  };

  const handleGlobalServicesChange = async (demandId: string, serviceIds: string[]) => {
    setUpdating(`global-services-${demandId}`);
    try {
      await demandsAPI.updateGlobalServices(demandId, serviceIds);
      await refreshDemand(demandId);
    } catch (err) {
      setError('Failed to update global services');
      console.error('Global services update error:', err);
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Supprimer cette demande ?')) {
      try {
        await deleteDemand(id);
        setDemands(prev => prev.filter(d => d.id !== id));
        if (expanded === id) {
          setExpanded(null);
        }
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
        hotel: city?.selectedHotel?.id || null,
        roomSelections: city?.roomSelections || []
      }));
    } else if (field === 'activities') {
      setTempSelections(prev => ({
        ...prev,
        activities: city?.activities?.map((a: any) => a.id) || []
      }));
    } else if (field === 'roomSelections') {
      setTempSelections(prev => ({
        ...prev,
        roomSelections: city?.roomSelections || []
      }));
    }
  };

  const startGlobalEditing = (demandId: string, field: string) => {
    setEditingItem({ type: 'global', demandId, cityId: '', field });
    const demand = demands.find(d => d.id === demandId);
    
    if (field === 'globalServices') {
      setGlobalServices(demand?.globalServices?.map(gs => gs.service.id) || []);
    } else if (field === 'transport') {
      setGlobalTransport(demand?.selectedTransport?.id || null);
    }
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setTempSelections({
      hotel: null,
      services: [],
      activities: [],
      roomSelections: []
    });
    setGlobalServices([]);
    setGlobalTransport(null);
  };

  const saveEditing = async () => {
    if (!editingItem) return;
    
    const { demandId, cityId, field } = editingItem;
    
    try {
      if (field === 'hotel' && tempSelections.hotel !== null) {
        await handleHotelChange(demandId, cityId, tempSelections.hotel);
        if (tempSelections.roomSelections.length > 0) {
          await handleRoomSelectionsChange(demandId, cityId, tempSelections.roomSelections);
        }
      } else if (field === 'activities') {
        await handleActivitiesChange(demandId, cityId, tempSelections.activities);
      } else if (field === 'roomSelections') {
        await handleRoomSelectionsChange(demandId, cityId, tempSelections.roomSelections);
      } else if (field === 'globalServices') {
        await handleGlobalServicesChange(demandId, globalServices);
      } else if (field === 'transport' && globalTransport !== null) {
        await handleTransportChange(demandId, globalTransport);
      }
      
      setEditingItem(null);
      setTempSelections({
        hotel: null,
        services: [],
        activities: [],
        roomSelections: []
      });
      setGlobalServices([]);
      setGlobalTransport(null);
    } catch {
      setError('Failed to save changes');
    }
  };

  const updateRoomSelectionCount = (index: number, count: number) => {
    setTempSelections(prev => {
      const newSelections = [...prev.roomSelections];
      newSelections[index] = { ...newSelections[index], count };
      return { ...prev, roomSelections: newSelections };
    });
  };

  const addRoomSelection = (roomType: any) => {
    setTempSelections(prev => ({
      ...prev,
      roomSelections: [...prev.roomSelections, { 
        roomTypeId: roomType.id, 
        roomType: roomType.type, 
        price: roomType.price, 
        capacity: roomType.capacity, 
        count: 1 
      }]
    }));
  };

  const removeRoomSelection = (index: number) => {
    setTempSelections(prev => ({
      ...prev,
      roomSelections: prev.roomSelections.filter((_, i) => i !== index)
    }));
  };

  const getCityName = (cityId: string) => {
    return cities.find(c => c.id === cityId)?.name || 'Ville inconnue';
  };

  const getRoomTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'SINGLE': 'Single',
      'DOUBLE': 'Double',
      'TRIPLE': 'Triple',
      'FAMILY': 'Familiale',
      'SUITE': 'Suite'
    };
    return labels[type] || type;
  };

  const calcCityPrice = (dc: any) => {
    const hotelPrice = dc.roomSelections?.reduce((sum: number, rs: any) => sum + (rs.price * rs.count), 0) || 0;
    const activitiesSum = (dc.activities || []).reduce((sum: number, a: any) => sum + (a.price || 0), 0);
    
    return (hotelPrice * (dc.durationDays || 0)) + activitiesSum;
  };

  const calcGlobalServicesPrice = (demand: DisplayDemand) => {
    return (demand.globalServices || []).reduce((sum: number, gs: any) => sum + (gs.service.price * gs.quantity), 0);
  };

  const calcTransportPrice = (demand: DisplayDemand) => {
    return demand.selectedTransport ? demand.selectedTransport.price * demand.periodDays : 0;
  };

  const calcBasePrice = (demand: DisplayDemand) => {
    const citiesPrice = (demand.cities || []).reduce((total: number, dc: any) => total + calcCityPrice(dc), 0);
    const globalServicesPrice = calcGlobalServicesPrice(demand);
    const transportPrice = calcTransportPrice(demand);
    return citiesPrice + globalServicesPrice + transportPrice;
  };

  const calcTotalPrice = (demand: DisplayDemand) => {
    const basePrice = calcBasePrice(demand);
    
    // Application des pourcentages (gérés côté frontend)
    const benefitAmount = basePrice * (benefitPercentage / 100);
    const taxAmount = basePrice * (taxPercentage / 100);
    
    return basePrice + benefitAmount + taxAmount;
  };

  const calcPricePerTraveler = (demand: DisplayDemand) => {
    return demand.travelers > 0 ? calcTotalPrice(demand) / demand.travelers : 0;
  };

  const isUpdating = (id: string, field: string) => {
    return updating === `${field}-${id}`;
  };

  // Function to generate PDF quote (devis)
  const generateQuotePDF = async (demand: DisplayDemand) => {
    setGeneratingPdf(demand.id);
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(22);
      doc.setTextColor(40, 103, 160);
      doc.text('VOYAGE MAROC', 105, 25, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text('Votre partenaire de voyage au Maroc', 105, 32, { align: 'center' });
      
      doc.setFontSize(10);
      doc.text('123 Avenue Mohammed V, Casablanca, Maroc', 105, 40, { align: 'center' });
      doc.text('Tél: +212 5 22 123 456 | Email: contact@voyagemaroc.ma', 105, 45, { align: 'center' });
      
      // Title
      doc.setFontSize(16);
      doc.setTextColor(40, 40, 40);
      doc.text('DEVIS', 105, 60, { align: 'center' });
      
      // Details
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(`Devis N°: ${demand.id?.slice(0, 8).toUpperCase() || 'N/A'}`, 20, 70);
      doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 75);
      
      // Client info
      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);
      doc.text('CLIENT:', 20, 85);
      
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(`${demand.fullName}`, 20, 92);
      doc.text(`${demand.email}`, 20, 97);
      if (demand.phone) doc.text(`${demand.phone}`, 20, 102);
      
      // Trip details
      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);
      doc.text('DÉTAILS DU VOYAGE:', 20, 115);
      
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      doc.text(`Nombre de voyageurs: ${demand.travelers}`, 20, 122);
      doc.text(`Période: ${demand.periodDays} nuitées`, 20, 127);
      
      if (demand.comment) {
        doc.text(`Commentaire: ${demand.comment}`, 20, 132);
      }
      
      // Table
      const tableColumn = ["Destination", "Nuitées", "Voyageurs", "Hébergement", "Expériences", "Montant"];
      const tableRows: any[] = [];
      
      demand.cities?.forEach((city: any) => {
        const cityName = city.city.name;
        const nights = city.durationDays;
        const travelers = demand.travelers;
        
        const hotelInfo = city.selectedHotel 
          ? `${city.selectedHotel.name} (${city.roomSelections?.map((rs: any) => `${rs.count} ${getRoomTypeLabel(rs.roomType)}`).join(', ') || 'N/A'})` 
          : '-';
        
        const activitiesList = city.activities?.map((a: any) => a.name).join(', ') || '-';
        const amount = `${calcCityPrice(city)} MAD`;
        
        tableRows.push([cityName, nights, travelers, hotelInfo, activitiesList, amount]);
      });
      
      // Transport row
      if (demand.selectedTransport) {
        const transportAmount = calcTransportPrice(demand);
        tableRows.push(['Transport général', demand.periodDays, demand.travelers, demand.selectedTransport.type, '-', `${transportAmount} MAD`]);
      }
      
      // Global services row
      if (demand.globalServices && demand.globalServices.length > 0) {
        const globalServicesList = demand.globalServices.map((gs: any) => `${gs.service.type} (x${gs.quantity})`).join(', ');
        const globalServicesAmount = `${calcGlobalServicesPrice(demand)} MAD`;
        tableRows.push(['Services généraux', '-', '-', globalServicesList, '-', globalServicesAmount]);
      }
      
      // Benefit row
      const basePrice = calcBasePrice(demand);
      const benefitAmount = basePrice * (benefitPercentage / 100);
      if (benefitPercentage > 0) {
        tableRows.push(['Bénéfice', '-', '-', '-', '-', `${benefitAmount.toFixed(2)} MAD`]);
      }
      
      // Tax row
      const taxAmount = basePrice * (taxPercentage / 100);
      tableRows.push(['Taxes', '-', '-', '-', '-', `${taxAmount.toFixed(2)} MAD`]);
      
      // Total row
      tableRows.push(['COÛT DE REVIENS GLOBAL', '-', '-', '-', '-', `${calcTotalPrice(demand).toFixed(2)} MAD`]);
      
      // Price per traveler
      tableRows.push(['Coût par voyageur', '-', '-', '-', '-', `${calcPricePerTraveler(demand).toFixed(2)} MAD`]);
      
      // Generate table
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: demand.comment ? 140 : 135,
        theme: 'striped',
        headStyles: {
          fillColor: [40, 103, 160],
          textColor: 255,
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        }
      });
      
      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text('Merci pour votre confiance!', 105, doc.internal.pageSize.height - 10, { align: 'center' });
      }
      
      // Save
      doc.save(`Devis-${demand.fullName.replace(/\s+/g, '-')}-${demand.id?.slice(0, 8) || 'N/A'}.pdf`);
      
    } catch (err) {
      setError('Erreur lors de la génération du devis');
      console.error('PDF generation error:', err);
    } finally {
      setGeneratingPdf(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'VALIDATED': return 'bg-blue-100 text-blue-800';
      case 'SENT': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'En attente';
      case 'VALIDATED': return 'Validé';
      case 'SENT': return 'Envoyé';
      default: return status;
    }
  };

  const getGenderIcon = (gender: string) => {
    return gender === 'MALE' ? '♂' : '♀';
  };

  const getTravelerType = (type: string) => {
    switch (type) {
      case 'ADULT': return 'Adulte';
      case 'CHILD': return 'Enfant';
      case 'INFANT': return 'Bébé';
      default: return type;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Gestion des Demandes
          </h1>
          <button 
            onClick={fetchAll}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center space-x-2 transition-colors duration-200"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualiser</span>
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-4">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              Liste des demandes
            </h2>
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
              <div className="space-y-6">
                {demands.map((demand) => (
                  <div key={demand.id} className="border rounded-xl p-5 bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg text-gray-800">{demand.fullName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(demand.status)}`}>
                            {getStatusText(demand.status)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-2 text-blue-500" />
                            {demand.email}
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-blue-500" />
                            {demand.phone}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2 text-blue-500" />
                            {demand.travelers} voyageurs
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                            {demand.periodDays} nuitées
                          </div>
                        </div>
                        
                        {demand.comment && (
                          <div className="mt-2 text-sm text-gray-600 flex items-start">
                            <MessageCircle className="w-4 h-4 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{demand.comment}</span>
                          </div>
                        )}
                        
                        <div className="mt-3 flex flex-wrap gap-2">
                          <div className="text-sm text-gray-600 flex items-center">
                            <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                            <span className="font-bold text-green-600">{calcTotalPrice(demand).toFixed(2)} MAD</span>
                            <span className="mx-1">•</span>
                            <span>par voyageur:</span>
                            <span className="font-bold text-blue-600 ml-1">{calcPricePerTraveler(demand).toFixed(2)} MAD</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 justify-end">
                        <button 
                          onClick={() => generateQuotePDF(demand)}
                          disabled={generatingPdf === demand.id}
                          className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 flex items-center space-x-2 transition-colors duration-200 text-sm"
                        >
                          {generatingPdf === demand.id ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <FileText className="w-4 h-4" />
                          )}
                          <span>Devis PDF</span>
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
                      <div className="mt-6 space-y-6">
                        {/* Travelers Information */}
                        <div className="border rounded-lg p-4 bg-white shadow-sm">
                          <div className="font-semibold text-blue-700 mb-3 text-lg flex items-center">
                            <Users className="w-5 h-5 mr-2" />
                            Informations des voyageurs
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {demand.clientInfo?.travelers?.map((traveler, index) => (
                              <div key={index} className="border rounded-lg p-3 bg-gray-50">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="font-medium text-gray-800 flex items-center">
                                    <User className="w-4 h-4 mr-2 text-blue-500" />
                                    {traveler.fullName}
                                  </div>
                                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    {getTravelerType(traveler.type)}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-600">
                                  <div className="flex items-center mb-1">
                                    <span className="w-20">Âge:</span>
                                    <span className="font-medium">{traveler.age} ans</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="w-20">Genre:</span>
                                    <span className="font-medium">{traveler.gender === 'MALE' ? 'Homme' : 'Femme'} {getGenderIcon(traveler.gender)}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Global Transport Section */}
                        <div className="border rounded-lg p-4 bg-white shadow-sm">
                          <div className="font-semibold text-blue-700 mb-3 text-lg flex items-center">
                            <Truck className="w-5 h-5 mr-2" />
                            Transport général
                          </div>
                          
                          {editingItem?.demandId === demand.id && editingItem?.field === 'transport' ? (
                            <div className="flex items-center gap-2">
                              <select
                                value={globalTransport || ''}
                                onChange={e => setGlobalTransport(e.target.value)}
                                className="p-2 border rounded flex-1 text-sm focus:ring-blue-300 focus:border-blue-300"
                              >
                                <option value="">Sélectionner un transport</option>
                                {transports.map(transport => (
                                  <option key={transport.id} value={transport.id}>
                                    {transport.type} ({transport.price} MAD/jour)
                                  </option>
                                ))}
                              </select>
                              <button 
                                onClick={saveEditing}
                                className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                                disabled={isUpdating(demand.id, 'transport')}
                              >
                                {isUpdating(demand.id, 'transport') ? (
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
                                {demand.selectedTransport 
                                  ? `${demand.selectedTransport.type} (${demand.selectedTransport.price} MAD/jour)` 
                                  : 'Aucun transport sélectionné'
                                }
                              </span>
                              <button 
                                onClick={() => startGlobalEditing(demand.id, 'transport')}
                                className="p-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Global Services Section */}
                        <div className="border rounded-lg p-4 bg-white shadow-sm">
                          <div className="font-semibold text-blue-700 mb-3 text-lg flex items-center">
                            <Globe className="w-5 h-5 mr-2" />
                            Services généraux
                          </div>
                          
                          {editingItem?.demandId === demand.id && editingItem?.field === 'globalServices' ? (
                            <div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                {services.map(service => (
                                  <div key={service.id} className="flex items-center">
                                    <input
                                      type="checkbox"
                                      checked={globalServices.includes(service.id)}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setGlobalServices(prev => [...prev, service.id]);
                                        } else {
                                          setGlobalServices(prev => prev.filter(id => id !== service.id));
                                        }
                                      }}
                                      className="mr-2 rounded text-blue-500 focus:ring-blue-300"
                                    />
                                    <span className="text-sm">{service.providerName} - {service.type} ({service.price} MAD)</span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex gap-2 mt-2">
                                <button 
                                  onClick={saveEditing}
                                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1 text-sm transition-colors duration-200"
                                  disabled={isUpdating(demand.id, 'global-services')}
                                >
                                  {isUpdating(demand.id, 'global-services') ? (
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
                                  Services sélectionnés ({demand.globalServices?.length || 0})
                                </span>
                                <button 
                                  onClick={() => startGlobalEditing(demand.id, 'globalServices')}
                                  className="p-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                              </div>
                              {(demand.globalServices && demand.globalServices.length > 0) && (
                                <ul className="list-disc ml-6 text-sm">
                                  {demand.globalServices.map((gs: any) => (
                                    <li key={gs.service.id} className="text-gray-600">
                                      {gs.service.providerName} - {gs.service.type} ({gs.service.price} MAD) x{gs.quantity}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Benefit and Tax Section */}
                        <div className="border rounded-lg p-4 bg-white shadow-sm">
                          <div className="font-semibold text-blue-700 mb-3 text-lg flex items-center">
                            <Coins className="w-5 h-5 mr-2" />
                            Calcul du coût
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="font-semibold block mb-2 text-gray-700 flex items-center">
                                <Percent className="w-4 h-4 mr-1" />
                                Pourcentage de bénéfice:
                              </label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  value={benefitPercentage}
                                  onChange={e => setBenefitPercentage(Number(e.target.value))}
                                  className="p-2 border rounded w-20 text-sm"
                                  min="0"
                                  max="100"
                                />
                                <span>%</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Ce pourcentage sera ajouté au coût de base
                              </p>
                            </div>
                            
                            <div>
                              <label className="font-semibold block mb-2 text-gray-700 flex items-center">
                                <Percent className="w-4 h-4 mr-1" />
                                Pourcentage de taxe:
                              </label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  value={taxPercentage}
                                  onChange={e => setTaxPercentage(Number(e.target.value))}
                                  className="p-2 border rounded w-20 text-sm"
                                  min="0"
                                  max="100"
                                />
                                <span>%</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Pourcentage de taxe applicable
                              </p>
                            </div>
                          </div>

                          {/* Affichage des calculs en temps réel */}
                          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div className="text-sm text-gray-700 space-y-2">
                              <div className="flex justify-between">
                                <span>Coût de base:</span>
                                <span className="font-semibold">{calcBasePrice(demand).toFixed(2)} MAD</span>
                              </div>
                              {benefitPercentage > 0 && (
                                <div className="flex justify-between text-green-600">
                                  <span>Bénéfice ({benefitPercentage}%):</span>
                                  <span className="font-semibold">+{(calcBasePrice(demand) * (benefitPercentage / 100)).toFixed(2)} MAD</span>
                                </div>
                              )}
                              <div className="flex justify-between text-blue-600">
                                <span>Taxes ({taxPercentage}%):</span>
                                <span className="font-semibold">+{(calcBasePrice(demand) * (taxPercentage / 100)).toFixed(2)} MAD</span>
                              </div>
                              <div className="flex justify-between mt-2 pt-2 border-t border-gray-200 font-bold text-lg">
                                <span>Coût de reviens global:</span>
                                <span className="text-green-600">{calcTotalPrice(demand).toFixed(2)} MAD</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Cities Section */}
                        <div className="space-y-4">
                          <div className="font-semibold text-blue-700 text-lg flex items-center">
                            <MapPin className="w-5 h-5 mr-2" />
                            Destinations du voyage
                          </div>
                          
                          {(demand.cities || []).map((dc: any) => (
                            <div key={dc.id} className="border rounded-lg p-4 bg-white shadow-sm">
                              <div className="font-semibold text-blue-700 mb-3 text-lg flex items-center">
                                {dc.city.name} 
                                <span className="ml-3 text-sm font-normal text-gray-600 flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {dc.durationDays} nuitées • Du {dc.startDate} au {dc.endDate}
                                </span>
                              </div>
                              
                              {/* Activities Section */}
                              <div className="mb-4">
                                <label className="font-semibold block mb-2 text-gray-700 flex items-center">
                                  <Activity className="w-4 h-4 mr-2" />
                                  Expériences:
                                </label>
                                {editingItem?.cityId === dc.id && editingItem?.field === 'activities' ? (
                                  <div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                      {activities
                                        .filter((a: any) => a.city.id === dc.city.id)
                                        .map((activity: any) => (
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
                                        Expériences sélectionnées ({dc.activities?.length || 0})
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
                                        {(dc.activities || []).map((a: any) => (
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
                                  <label className="font-semibold block mb-2 text-gray-700 flex items-center">
                                    <Hotel className="w-4 h-4 mr-2" />
                                    Hôtel:
                                  </label>
                                  {editingItem?.cityId === dc.id && editingItem?.field === 'hotel' ? (
                                    <div className="flex flex-col gap-2">
                                      <select
                                        value={tempSelections.hotel || ''}
                                        onChange={e => setTempSelections(prev => ({...prev, hotel: e.target.value}))}
                                        className="p-2 border rounded flex-1 text-sm focus:ring-blue-300 focus:border-blue-300"
                                      >
                                        <option value="">Sélectionner un hôtel</option>
                                        {hotels
                                          .filter((h: any) => h.city.id === dc.city.id)
                                          .map((hotel: any) => (
                                            <option key={hotel.id} value={hotel.id}>
                                              {hotel.name} ({hotel.roomTypes.map((rt: any) => `${getRoomTypeLabel(rt.type)}: ${rt.price} MAD`).join(', ')})
                                            </option>
                                          ))
                                        }
                                      </select>
                                      
                                      {tempSelections.hotel && (
                                        <div className="mt-2">
                                          <label className="font-semibold block mb-2 text-gray-700">Types de chambres:</label>
                                          {hotels
                                            .find((h: any) => h.id === tempSelections.hotel)
                                            ?.roomTypes.map((roomType: any, index: number) => (
                                              <div key={roomType.id} className="flex items-center justify-between mb-2">
                                                <span className="text-sm">{getRoomTypeLabel(roomType.type)} ({roomType.price} MAD/nuit)</span>
                                                <div className="flex items-center">
                                                  <button 
                                                    onClick={() => {
                                                      const existing = tempSelections.roomSelections.findIndex(rs => rs.roomTypeId === roomType.id);
                                                      if (existing >= 0) {
                                                        removeRoomSelection(existing);
                                                      } else {
                                                        addRoomSelection(roomType);
                                                      }
                                                    }}
                                                    className={`p-1 rounded ${tempSelections.roomSelections.some(rs => rs.roomTypeId === roomType.id) ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} hover:opacity-80 transition-colors duration-200`}
                                                  >
                                                    {tempSelections.roomSelections.some(rs => rs.roomTypeId === roomType.id) ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                                  </button>
                                                </div>
                                              </div>
                                            ))
                                          }
                                          
                                          {tempSelections.roomSelections.length > 0 && (
                                            <div className="mt-2 p-2 bg-gray-50 rounded">
                                              <label className="font-semibold block mb-2 text-gray-700">Chambres sélectionnées:</label>
                                              {tempSelections.roomSelections.map((rs, index) => (
                                                <div key={index} className="flex items-center justify-between mb-1">
                                                  <span className="text-sm">{rs.count} {getRoomTypeLabel(rs.roomType)}(s)</span>
                                                  <div className="flex items-center">
                                                    <button 
                                                      onClick={() => updateRoomSelectionCount(index, Math.max(1, rs.count - 1))}
                                                      className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200"
                                                    >
                                                      <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="mx-2 text-sm">{rs.count}</span>
                                                    <button 
                                                      onClick={() => updateRoomSelectionCount(index, rs.count + 1)}
                                                      className="p-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors duration-200"
                                                    >
                                                      <Plus className="w-3 h-3" />
                                                    </button>
                                                    <button 
                                                      onClick={() => removeRoomSelection(index)}
                                                      className="ml-2 p-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors duration-200"
                                                    >
                                                      <X className="w-3 h-3" />
                                                    </button>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      )}
                                      
                                      <div className="flex gap-2 mt-4">
                                        <button 
                                          onClick={saveEditing}
                                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1 text-sm transition-colors duration-200"
                                          disabled={isUpdating(dc.id, 'hotel')}
                                        >
                                          {isUpdating(dc.id, 'hotel') ? (
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
                                    <div className="flex items-center gap-2">
                                      <div>
                                        <span className="text-sm">
                                          {dc.selectedHotel 
                                            ? `${dc.selectedHotel.name}` 
                                            : 'Aucun hôtel sélectionné'
                                          }
                                        </span>
                                        {dc.roomSelections && dc.roomSelections.length > 0 && (
                                          <div className="text-xs text-gray-600 mt-1">
                                            Chambres: {dc.roomSelections.map((rs: any) => `${rs.count} ${getRoomTypeLabel(rs.roomType)}`).join(', ')}
                                          </div>
                                        )}
                                      </div>
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
                              
                              {/* City Total Amount */}
                              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="font-semibold text-gray-700 flex justify-between">
                                  <span>Total pour {dc.city.name}:</span>
                                  <span className="text-green-600">{calcCityPrice(dc)} MAD</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Global Total Amount */}
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="text-xl font-bold text-blue-800 flex justify-between items-center">
                            <span>Coût de reviens global:</span>
                            <span>{calcTotalPrice(demand).toFixed(2)} MAD</span>
                          </div>
                          <div className="text-md font-semibold text-blue-700 flex justify-between items-center mt-2">
                            <span>Coût par voyageur:</span>
                            <span>{calcPricePerTraveler(demand).toFixed(2)} MAD</span>
                          </div>
                          {benefitPercentage > 0 && (
                            <div className="text-sm text-gray-600 mt-1">
                              Bénéfice: {benefitPercentage}%
                            </div>
                          )}
                          <div className="text-sm text-gray-600">
                            Taxes: {taxPercentage}%
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