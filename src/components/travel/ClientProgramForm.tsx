import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ClientDemandForm, CitySelection } from '@/types/travel';
import { staticCities, staticActivities } from '@/data/staticTravelData';
import { useToast } from '@/hooks/use-toast';

const ClientProgramForm = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ClientDemandForm>({
    step: 1,
    clientInfo: {},
    citySelections: []
  });

  // Calculate trip period whenever city selections change
  useEffect(() => {
    const totalDays = formData.citySelections.reduce((sum, city) => sum + (city.duration || 0), 0);
    setFormData(prev => ({
      ...prev,
      clientInfo: {
        ...prev.clientInfo,
        tripPeriod: totalDays
      }
    }));
  }, [formData.citySelections]);

  const calculateDuration = (startDate: string, endDate: string): number => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleClientInfoChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      clientInfo: {
        ...prev.clientInfo,
        [field]: value
      }
    }));
  };

  const addCitySelection = () => {
    setFormData(prev => ({
      ...prev,
      citySelections: [
        ...prev.citySelections,
        {
          cityId: '',
          startDate: '',
          endDate: '',
          duration: 0,
          activityIds: []
        }
      ]
    }));
  };

  const removeCitySelection = (index: number) => {
    setFormData(prev => ({
      ...prev,
      citySelections: prev.citySelections.filter((_, i) => i !== index)
    }));
  };

  const updateCitySelection = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      citySelections: prev.citySelections.map((city, i) => {
        if (i === index) {
          const updated = { ...city, [field]: value };
          
          // Auto-calculate duration when dates change
          if (field === 'startDate' || field === 'endDate') {
            updated.duration = calculateDuration(updated.startDate || '', updated.endDate || '');
          }
          
          return updated;
        }
        return city;
      })
    }));
  };

  const handleActivityToggle = (cityIndex: number, activityId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      citySelections: prev.citySelections.map((city, i) => {
        if (i === cityIndex) {
          const activityIds = checked 
            ? [...(city.activityIds || []), activityId]
            : (city.activityIds || []).filter(id => id !== activityId);
          return { ...city, activityIds };
        }
        return city;
      })
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Submitting demand:', formData);
    toast({
      title: "Demande envoyée",
      description: "Votre programme personnalisé a été envoyé avec succès.",
    });
    
    // Reset form
    setFormData({
      step: 1,
      clientInfo: {},
      citySelections: []
    });
    setCurrentStep(1);
  };

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Informations Personnelles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="fullName">Nom</Label>
          <Input
            id="fullName"
            value={formData.clientInfo.fullName || ''}
            onChange={(e) => handleClientInfoChange('fullName', e.target.value)}
            placeholder="Votre nom"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.clientInfo.email || ''}
            onChange={(e) => handleClientInfoChange('email', e.target.value)}
            placeholder="votre@email.com"
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            value={formData.clientInfo.phone || ''}
            onChange={(e) => handleClientInfoChange('phone', e.target.value)}
            placeholder="+212 6XX XXX XXX"
          />
        </div>
        
        <div>
          <Label htmlFor="travelers">Nombre de Voyageurs</Label>
          <Input
            id="travelers"
            type="number"
            min="1"
            value={formData.clientInfo.numberOfTravelers || ''}
            onChange={(e) => handleClientInfoChange('numberOfTravelers', parseInt(e.target.value))}
            placeholder="2"
          />
        </div>
        
        <div>
          <Label htmlFor="tripPeriod">Durée du Voyage</Label>
          <Input
            id="tripPeriod"
            value={`${formData.clientInfo.tripPeriod || 0} nuitées`}
            disabled
            className="bg-muted"
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Sélection des Villes
          <Button onClick={addCitySelection} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une ville
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {formData.citySelections.map((citySelection, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Ville {index + 1}</h4>
              {formData.citySelections.length > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeCitySelection(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div>
              <Label>Ville</Label>
              <Select
                value={citySelection.cityId}
                onValueChange={(value) => updateCitySelection(index, 'cityId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une ville" />
                </SelectTrigger>
                <SelectContent>
                  {staticCities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Date de Début</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !citySelection.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {citySelection.startDate ? format(new Date(citySelection.startDate), "PPP") : "Sélectionner"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={citySelection.startDate ? new Date(citySelection.startDate) : undefined}
                      onSelect={(date) => updateCitySelection(index, 'startDate', date ? format(date, 'yyyy-MM-dd') : '')}
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
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !citySelection.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {citySelection.endDate ? format(new Date(citySelection.endDate), "PPP") : "Sélectionner"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={citySelection.endDate ? new Date(citySelection.endDate) : undefined}
                      onSelect={(date) => updateCitySelection(index, 'endDate', date ? format(date, 'yyyy-MM-dd') : '')}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div>
              <Label>Durée</Label>
              <Input
                value={`${citySelection.duration} nuitées`}
                disabled
                className="bg-muted"
              />
            </div>
            
            {citySelection.cityId && (
              <div>
                <Label>Expériences</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {staticActivities
                    .filter(activity => activity.cityId === citySelection.cityId)
                    .map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`activity-${index}-${activity.id}`}
                          checked={(citySelection.activityIds || []).includes(activity.id)}
                          onCheckedChange={(checked) => 
                            handleActivityToggle(index, activity.id, checked as boolean)
                          }
                        />
                        <Label htmlFor={`activity-${index}-${activity.id}`} className="text-sm">
                          {activity.name} - {activity.price}€ ({activity.duration}h)
                        </Label>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {formData.citySelections.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            Aucune ville sélectionnée. Cliquez sur "Ajouter une ville" pour commencer.
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Récapitulatif de votre Demande</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Informations Client</h4>
          <p><strong>Nom:</strong> {formData.clientInfo.fullName}</p>
          <p><strong>Email:</strong> {formData.clientInfo.email}</p>
          <p><strong>Téléphone:</strong> {formData.clientInfo.phone}</p>
          <p><strong>Voyageurs:</strong> {formData.clientInfo.numberOfTravelers}</p>
          <p><strong>Durée totale:</strong> {formData.clientInfo.tripPeriod} nuitées</p>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">Villes Sélectionnées</h4>
          {formData.citySelections.map((city, index) => {
            const cityData = staticCities.find(c => c.id === city.cityId);
            const selectedActivities = staticActivities.filter(a => 
              city.activityIds?.includes(a.id)
            );
            
            return (
              <div key={index} className="border rounded p-3">
                <p><strong>{cityData?.name}</strong></p>
                <p>Du {city.startDate} au {city.endDate} ({city.duration} nuitées)</p>
                {selectedActivities.length > 0 && (
                  <p><strong>Expériences:</strong> {selectedActivities.map(a => a.name).join(', ')}</p>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Programme Personnalisé</h1>
        <div className="text-sm text-muted-foreground">
          Étape {currentStep} sur 3
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>
      
      {/* Step content */}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      
      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Précédent
        </Button>
        
        {currentStep < 3 ? (
          <Button onClick={nextStep}>
            Suivant
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            Envoyer la Demande
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClientProgramForm;