import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AdminPackageForm as AdminPackageFormType, Currency } from '@/types/travel';
import { staticCities, staticHotels, staticActivities, staticServices, staticTransports } from '@/data/staticTravelData';
import { useToast } from '@/hooks/use-toast';

const AdminPackageForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<AdminPackageFormType>({
    title: '',
    description: '',
    cityIds: [],
    hotelIds: [],
    activityIds: [],
    serviceIds: [],
    transportId: '',
    cityDateRanges: [],
    discountPercentage: 0,
    currency: Currency.EUR,
    isActive: true
  });

  // Calculate base price and final price
  useEffect(() => {
    let basePrice = 0;

    // Calculate hotel costs
    formData.hotelIds.forEach(hotelId => {
      const hotel = staticHotels.find(h => h.id === hotelId);
      if (hotel) {
        const cityRange = formData.cityDateRanges.find(cr => cr.cityId === hotel.cityId);
        if (cityRange) {
          basePrice += hotel.pricePerNight * cityRange.duration;
        }
      }
    });

    // Calculate transport costs
    if (formData.transportId) {
      const transport = staticTransports.find(t => t.id === formData.transportId);
      if (transport) {
        const totalDays = formData.cityDateRanges.reduce((sum, cr) => sum + cr.duration, 0);
        basePrice += transport.pricePerDay * totalDays;
      }
    }

    // Calculate activity costs
    formData.activityIds.forEach(activityId => {
      const activity = staticActivities.find(a => a.id === activityId);
      if (activity) {
        basePrice += activity.price;
      }
    });

    // Calculate service costs
    formData.serviceIds.forEach(serviceId => {
      const service = staticServices.find(s => s.id === serviceId);
      if (service) {
        basePrice += service.price;
      }
    });

    const finalPrice = basePrice - (basePrice * (formData.discountPercentage / 100));

    setFormData(prev => ({
      ...prev,
      basePrice,
      finalPrice
    }));
  }, [formData.hotelIds, formData.transportId, formData.activityIds, formData.serviceIds, formData.cityDateRanges, formData.discountPercentage]);

  const calculateDuration = (startDate: string, endDate: string): number => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelectChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof AdminPackageFormType] as string[]), value]
        : (prev[field as keyof AdminPackageFormType] as string[]).filter(id => id !== value)
    }));
  };

  const addCityDateRange = () => {
    setFormData(prev => ({
      ...prev,
      cityDateRanges: [
        ...prev.cityDateRanges,
        {
          cityId: '',
          startDate: '',
          endDate: '',
          duration: 0
        }
      ]
    }));
  };

  const removeCityDateRange = (index: number) => {
    setFormData(prev => ({
      ...prev,
      cityDateRanges: prev.cityDateRanges.filter((_, i) => i !== index)
    }));
  };

  const updateCityDateRange = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      cityDateRanges: prev.cityDateRanges.map((range, i) => {
        if (i === index) {
          const updated = { ...range, [field]: value };
          
          // Auto-calculate duration when dates change
          if (field === 'startDate' || field === 'endDate') {
            updated.duration = calculateDuration(updated.startDate, updated.endDate);
          }
          
          return updated;
        }
        return range;
      })
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating package:', formData);
    toast({
      title: "Package créé",
      description: "Le package spécial a été créé avec succès.",
    });
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      cityIds: [],
      hotelIds: [],
      activityIds: [],
      serviceIds: [],
      transportId: '',
      cityDateRanges: [],
      discountPercentage: 0,
      currency: Currency.EUR,
      isActive: true
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Créer un Package Spécial</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informations Générales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                placeholder="Titre du package"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                placeholder="Description détaillée du package"
                rows={4}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="discount">Remise (%)</Label>
              <Input
                id="discount"
                type="number"
                min="0"
                max="100"
                value={formData.discountPercentage}
                onChange={(e) => handleFieldChange('discountPercentage', parseFloat(e.target.value) || 0)}
                placeholder="10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Cities Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Sélection des Villes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {staticCities.map((city) => (
                <div key={city.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`city-${city.id}`}
                    checked={formData.cityIds.includes(city.id)}
                    onCheckedChange={(checked) => 
                      handleMultiSelectChange('cityIds', city.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={`city-${city.id}`}>{city.name}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* City Date Ranges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Dates par Ville
              <Button type="button" onClick={addCityDateRange} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une période
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.cityDateRanges.map((range, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Période {index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeCityDateRange(index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Ville</Label>
                    <Select
                      value={range.cityId}
                      onValueChange={(value) => updateCityDateRange(index, 'cityId', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        {staticCities
                          .filter(city => formData.cityIds.includes(city.id))
                          .map((city) => (
                            <SelectItem key={city.id} value={city.id}>
                              {city.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Date de Début</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !range.startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {range.startDate ? format(new Date(range.startDate), "PPP") : "Sélectionner"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={range.startDate ? new Date(range.startDate) : undefined}
                          onSelect={(date) => updateCityDateRange(index, 'startDate', date ? format(date, 'yyyy-MM-dd') : '')}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label>Date de Fin</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !range.endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {range.endDate ? format(new Date(range.endDate), "PPP") : "Sélectionner"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={range.endDate ? new Date(range.endDate) : undefined}
                          onSelect={(date) => updateCityDateRange(index, 'endDate', date ? format(date, 'yyyy-MM-dd') : '')}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label>Durée</Label>
                    <Input
                      value={`${range.duration} nuitées`}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Hotels Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Hôtels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {staticHotels
                .filter(hotel => formData.cityIds.includes(hotel.cityId))
                .map((hotel) => {
                  const city = staticCities.find(c => c.id === hotel.cityId);
                  return (
                    <div key={hotel.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`hotel-${hotel.id}`}
                        checked={formData.hotelIds.includes(hotel.id)}
                        onCheckedChange={(checked) => 
                          handleMultiSelectChange('hotelIds', hotel.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={`hotel-${hotel.id}`}>
                        {hotel.name} - {city?.name} ({hotel.pricePerNight}€/nuit)
                      </Label>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        {/* Activities Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Expériences & Activités</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {staticActivities
                .filter(activity => formData.cityIds.includes(activity.cityId))
                .map((activity) => {
                  const city = staticCities.find(c => c.id === activity.cityId);
                  return (
                    <div key={activity.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`activity-${activity.id}`}
                        checked={formData.activityIds.includes(activity.id)}
                        onCheckedChange={(checked) => 
                          handleMultiSelectChange('activityIds', activity.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={`activity-${activity.id}`}>
                        {activity.name} - {city?.name} ({activity.price}€)
                      </Label>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        {/* Services Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              {staticServices.map((service) => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`service-${service.id}`}
                    checked={formData.serviceIds.includes(service.id)}
                    onCheckedChange={(checked) => 
                      handleMultiSelectChange('serviceIds', service.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={`service-${service.id}`}>
                    {service.name} - {service.type} ({service.price}€)
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transport Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Transport</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={formData.transportId}
              onValueChange={(value) => handleFieldChange('transportId', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un transport" />
              </SelectTrigger>
              <SelectContent>
                {staticTransports.map((transport) => {
                  const city = staticCities.find(c => c.id === transport.cityId);
                  return (
                    <SelectItem key={transport.id} value={transport.id}>
                      {transport.name} - {city?.name} ({transport.pricePerDay}€/jour)
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Pricing Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Résumé des Prix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Prix de base:</span>
              <span>{formData.basePrice || 0}€</span>
            </div>
            <div className="flex justify-between">
              <span>Remise ({formData.discountPercentage}%):</span>
              <span>-{((formData.basePrice || 0) * (formData.discountPercentage / 100)).toFixed(2)}€</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Prix final:</span>
              <span>{formData.finalPrice || 0}€</span>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Créer le Package
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminPackageForm;