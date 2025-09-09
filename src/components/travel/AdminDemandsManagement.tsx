import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { DemandStatus, ClientDemand, DemandWithAssignments, CityAssignment } from '@/types/travel';
import { staticClientDemands, staticCities, staticActivities, staticHotels, staticTransports, staticServices } from '@/data/staticTravelData';

const AdminDemandsManagement = () => {
  const [demands] = useState<ClientDemand[]>(staticClientDemands);
  const [expandedDemands, setExpandedDemands] = useState<Set<string>>(new Set());
  const [assignments, setAssignments] = useState<Record<string, CityAssignment[]>>({});

  const toggleDemandExpansion = (demandId: string) => {
    const newExpanded = new Set(expandedDemands);
    if (newExpanded.has(demandId)) {
      newExpanded.delete(demandId);
    } else {
      newExpanded.add(demandId);
      // Initialize assignments if not already done
      if (!assignments[demandId]) {
        const demand = demands.find(d => d.id === demandId);
        if (demand) {
          setAssignments(prev => ({
            ...prev,
            [demandId]: demand.citySelections.map(city => ({
              cityId: city.cityId,
              startDate: city.startDate,
              endDate: city.endDate,
              duration: city.duration,
              activityIds: city.activityIds,
              hotelId: '',
              transportId: '',
              serviceIds: [],
              totalPrice: 0
            }))
          }));
        }
      }
    }
    setExpandedDemands(newExpanded);
  };

  const updateAssignment = (demandId: string, cityIndex: number, field: string, value: any) => {
    setAssignments(prev => ({
      ...prev,
      [demandId]: prev[demandId].map((assignment, index) => {
        if (index === cityIndex) {
          const updated = { ...assignment, [field]: value };
          // Recalculate price when selections change
          updated.totalPrice = calculateCityPrice(updated);
          return updated;
        }
        return assignment;
      })
    }));
  };

  const calculateCityPrice = (assignment: CityAssignment): number => {
    let total = 0;
    
    // Hotel price
    if (assignment.hotelId) {
      const hotel = staticHotels.find(h => h.id === assignment.hotelId);
      if (hotel) {
        total += hotel.pricePerNight * assignment.duration;
      }
    }
    
    // Transport price
    if (assignment.transportId) {
      const transport = staticTransports.find(t => t.id === assignment.transportId);
      if (transport) {
        total += transport.pricePerDay * assignment.duration;
      }
    }
    
    // Activities price
    assignment.activityIds.forEach(activityId => {
      const activity = staticActivities.find(a => a.id === activityId);
      if (activity) {
        total += activity.price;
      }
    });
    
    // Services price
    assignment.serviceIds.forEach(serviceId => {
      const service = staticServices.find(s => s.id === serviceId);
      if (service) {
        total += service.price;
      }
    });
    
    return total;
  };

  const getTotalDemandPrice = (demandId: string): number => {
    const demandAssignments = assignments[demandId] || [];
    return demandAssignments.reduce((total, assignment) => total + assignment.totalPrice, 0);
  };

  const getStatusBadge = (status: DemandStatus) => {
    const variants = {
      [DemandStatus.PENDING]: 'destructive' as const,
      [DemandStatus.VALIDATED]: 'default' as const,
      [DemandStatus.SENT]: 'secondary' as const
    };
    
    return (
      <Badge variant={variants[status]}>
        {status}
      </Badge>
    );
  };

  const handleSendEmail = (demand: ClientDemand) => {
    const totalPrice = getTotalDemandPrice(demand.id);
    const subject = `Votre programme de voyage personnalisé - ${totalPrice}€`;
    const body = `Bonjour ${demand.clientInfo.fullName},\n\nVoici votre programme de voyage personnalisé...\n\nPrix total: ${totalPrice}€`;
    
    window.open(`mailto:${demand.clientInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleWhatsApp = (demand: ClientDemand) => {
    const message = `Bonjour ${demand.clientInfo.fullName}, votre programme de voyage est prêt!`;
    window.open(`https://wa.me/${demand.clientInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Demandes</h1>
        <div className="flex gap-2">
          <Input placeholder="Rechercher par nom..." className="w-64" />
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value={DemandStatus.PENDING}>En attente</SelectItem>
              <SelectItem value={DemandStatus.VALIDATED}>Validé</SelectItem>
              <SelectItem value={DemandStatus.SENT}>Envoyé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Demandes Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demands.map((demand) => (
              <div key={demand.id} className="border rounded-lg">
                <Collapsible>
                  <CollapsibleTrigger 
                    className="w-full"
                    onClick={() => toggleDemandExpansion(demand.id)}
                  >
                    <div className="flex items-center justify-between p-4 hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        {expandedDemands.has(demand.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <div className="text-left">
                          <div className="font-medium">{demand.clientInfo.fullName}</div>
                          <div className="text-sm text-muted-foreground">
                            {demand.clientInfo.email} • {demand.clientInfo.numberOfTravelers} voyageurs
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div>{demand.clientInfo.tripPeriod} nuitées</div>
                          <div className="text-sm text-muted-foreground">
                            {getTotalDemandPrice(demand.id)}€
                          </div>
                        </div>
                        {getStatusBadge(demand.status)}
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={(e) => {
                            e.stopPropagation();
                            handleSendEmail(demand);
                          }}>
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={(e) => {
                            e.stopPropagation();
                            handleWhatsApp(demand);
                          }}>
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    {expandedDemands.has(demand.id) && (
                      <div className="border-t p-4">
                        <h4 className="font-medium mb-4">Détails du Programme</h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Ville</TableHead>
                              <TableHead>Dates</TableHead>
                              <TableHead>Durée</TableHead>
                              <TableHead>Expériences Client</TableHead>
                              <TableHead>Hôtel</TableHead>
                              <TableHead>Transport</TableHead>
                              <TableHead>Services</TableHead>
                              <TableHead>Prix</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {demand.citySelections.map((citySelection, index) => {
                              const city = staticCities.find(c => c.id === citySelection.cityId);
                              const cityActivities = staticActivities.filter(a => 
                                citySelection.activityIds.includes(a.id)
                              );
                              const assignment = assignments[demand.id]?.[index];
                              
                              return (
                                <TableRow key={index}>
                                  <TableCell className="font-medium">{city?.name}</TableCell>
                                  <TableCell>
                                    {citySelection.startDate} – {citySelection.endDate}
                                  </TableCell>
                                  <TableCell>{citySelection.duration} nuitées</TableCell>
                                  <TableCell>
                                    <div className="text-sm">
                                      {cityActivities.map(a => a.name).join(', ')}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Select
                                      value={assignment?.hotelId || ''}
                                      onValueChange={(value) => 
                                        updateAssignment(demand.id, index, 'hotelId', value)
                                      }
                                    >
                                      <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Sélectionner" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {staticHotels
                                          .filter(h => h.cityId === citySelection.cityId)
                                          .map(hotel => (
                                            <SelectItem key={hotel.id} value={hotel.id}>
                                              {hotel.name} ({hotel.pricePerNight}€/nuit)
                                            </SelectItem>
                                          ))}
                                      </SelectContent>
                                    </Select>
                                  </TableCell>
                                  <TableCell>
                                    <Select
                                      value={assignment?.transportId || ''}
                                      onValueChange={(value) => 
                                        updateAssignment(demand.id, index, 'transportId', value)
                                      }
                                    >
                                      <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Sélectionner" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {staticTransports
                                          .filter(t => t.cityId === citySelection.cityId)
                                          .map(transport => (
                                            <SelectItem key={transport.id} value={transport.id}>
                                              {transport.name} ({transport.pricePerDay}€/jour)
                                            </SelectItem>
                                          ))}
                                      </SelectContent>
                                    </Select>
                                  </TableCell>
                                  <TableCell>
                                    <Select
                                      value={(assignment?.serviceIds || [])[0] || ''}
                                      onValueChange={(value) => 
                                        updateAssignment(demand.id, index, 'serviceIds', value ? [value] : [])
                                      }
                                    >
                                      <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Sélectionner" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {staticServices.map(service => (
                                          <SelectItem key={service.id} value={service.id}>
                                            {service.name} ({service.price}€)
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {assignment?.totalPrice || 0}€
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                        
                        <div className="flex justify-between items-center mt-4 pt-4 border-t">
                          <div className="text-lg font-bold">
                            Total: {getTotalDemandPrice(demand.id)}€
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline">Sauvegarder</Button>
                            <Button>Valider & Envoyer</Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDemandsManagement;