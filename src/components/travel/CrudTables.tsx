import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Trash2, Plus } from 'lucide-react';
import { City, Hotel, Activity, Service, Transport, ServiceType, Currency } from '@/types/travel';
import { staticCities, staticHotels, staticActivities, staticServices, staticTransports } from '@/data/staticTravelData';

// Cities CRUD Component
export const CitiesCrud = () => {
  const [cities, setCities] = useState<City[]>(staticCities);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = (city: Partial<City>) => {
    if (editingCity) {
      setCities(prev => prev.map(c => c.id === editingCity.id ? { ...c, ...city } : c));
    } else {
      const newCity: City = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        ...city
      } as City;
      setCities(prev => [...prev, newCity]);
    }
    setEditingCity(null);
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setCities(prev => prev.filter(c => c.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Gestion des Villes
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingCity(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Ville
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingCity ? 'Modifier la Ville' : 'Nouvelle Ville'}
                </DialogTitle>
              </DialogHeader>
              <CityForm city={editingCity} onSave={handleSave} />
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Région</TableHead>
              <TableHead>Pays</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cities.map((city) => (
              <TableRow key={city.id}>
                <TableCell className="font-medium">{city.name}</TableCell>
                <TableCell>{city.region}</TableCell>
                <TableCell>{city.country}</TableCell>
                <TableCell>
                  <Badge variant={city.isActive ? 'default' : 'secondary'}>
                    {city.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingCity(city);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(city.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// City Form Component
const CityForm = ({ city, onSave }: { city: City | null; onSave: (city: Partial<City>) => void }) => {
  const [formData, setFormData] = useState({
    name: city?.name || '',
    region: city?.region || '',
    country: city?.country || '',
    description: city?.description || '',
    isActive: city?.isActive ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nom</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="region">Région</Label>
        <Input
          id="region"
          value={formData.region}
          onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="country">Pays</Label>
        <Input
          id="country"
          value={formData.country}
          onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>
      <Button type="submit" className="w-full">
        {city ? 'Mettre à jour' : 'Créer'}
      </Button>
    </form>
  );
};

// Hotels CRUD Component
export const HotelsCrud = () => {
  const [hotels, setHotels] = useState<Hotel[]>(staticHotels);
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = (hotel: Partial<Hotel>) => {
    if (editingHotel) {
      setHotels(prev => prev.map(h => h.id === editingHotel.id ? { ...h, ...hotel } : h));
    } else {
      const newHotel: Hotel = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        amenities: [],
        ...hotel
      } as Hotel;
      setHotels(prev => [...prev, newHotel]);
    }
    setEditingHotel(null);
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setHotels(prev => prev.filter(h => h.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Gestion des Hôtels
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingHotel(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Nouvel Hôtel
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingHotel ? 'Modifier l\'Hôtel' : 'Nouvel Hôtel'}
                </DialogTitle>
              </DialogHeader>
              <HotelForm hotel={editingHotel} onSave={handleSave} />
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Prix/Nuit</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotels.map((hotel) => {
              const city = staticCities.find(c => c.id === hotel.cityId);
              return (
                <TableRow key={hotel.id}>
                  <TableCell className="font-medium">{hotel.name}</TableCell>
                  <TableCell>{city?.name}</TableCell>
                  <TableCell>{hotel.pricePerNight}€</TableCell>
                  <TableCell>{hotel.rating}/5</TableCell>
                  <TableCell>
                    <Badge variant={hotel.isActive ? 'default' : 'secondary'}>
                      {hotel.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingHotel(hotel);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(hotel.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Hotel Form Component
const HotelForm = ({ hotel, onSave }: { hotel: Hotel | null; onSave: (hotel: Partial<Hotel>) => void }) => {
  const [formData, setFormData] = useState({
    name: hotel?.name || '',
    description: hotel?.description || '',
    cityId: hotel?.cityId || '',
    address: hotel?.address || '',
    rating: hotel?.rating || 5,
    pricePerNight: hotel?.pricePerNight || 0,
    currency: hotel?.currency || Currency.EUR,
    isActive: hotel?.isActive ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nom</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="cityId">Ville</Label>
        <Select
          value={formData.cityId}
          onValueChange={(value) => setFormData(prev => ({ ...prev, cityId: value }))}
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
      <div>
        <Label htmlFor="address">Adresse</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pricePerNight">Prix/Nuit</Label>
          <Input
            id="pricePerNight"
            type="number"
            value={formData.pricePerNight}
            onChange={(e) => setFormData(prev => ({ ...prev, pricePerNight: parseFloat(e.target.value) }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            type="number"
            min="1"
            max="5"
            value={formData.rating}
            onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>
      <Button type="submit" className="w-full">
        {hotel ? 'Mettre à jour' : 'Créer'}
      </Button>
    </form>
  );
};

// Activities CRUD Component (similar pattern)
export const ActivitiesCrud = () => {
  const [activities, setActivities] = useState<Activity[]>(staticActivities);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = (activity: Partial<Activity>) => {
    if (editingActivity) {
      setActivities(prev => prev.map(a => a.id === editingActivity.id ? { ...a, ...activity } : a));
    } else {
      const newActivity: Activity = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        ...activity
      } as Activity;
      setActivities(prev => [...prev, newActivity]);
    }
    setEditingActivity(null);
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Gestion des Expériences
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingActivity(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle Expérience
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingActivity ? 'Modifier l\'Expérience' : 'Nouvelle expérience'}
                </DialogTitle>
              </DialogHeader>
              <ActivityForm activity={editingActivity} onSave={handleSave} />
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => {
              const city = staticCities.find(c => c.id === activity.cityId);
              return (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.name}</TableCell>
                  <TableCell>{city?.name}</TableCell>
                  <TableCell>{activity.price}€</TableCell>
                  <TableCell>{activity.duration}h</TableCell>
                  <TableCell>
                    <Badge variant={activity.isActive ? 'default' : 'secondary'}>
                      {activity.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingActivity(activity);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(activity.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Activity Form Component
const ActivityForm = ({ activity, onSave }: { activity: Activity | null; onSave: (activity: Partial<Activity>) => void }) => {
  const [formData, setFormData] = useState({
    name: activity?.name || '',
    description: activity?.description || '',
    cityId: activity?.cityId || '',
    price: activity?.price || 0,
    currency: activity?.currency || Currency.EUR,
    duration: activity?.duration || 1,
    maxParticipants: activity?.maxParticipants || 10,
    isActive: activity?.isActive ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nom</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="cityId">Ville</Label>
        <Select
          value={formData.cityId}
          onValueChange={(value) => setFormData(prev => ({ ...prev, cityId: value }))}
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
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="price">Prix</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="duration">Durée (h)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="maxParticipants">Max Participants</Label>
          <Input
            id="maxParticipants"
            type="number"
            value={formData.maxParticipants}
            onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
        />
      </div>
      <Button type="submit" className="w-full">
        {activity ? 'Mettre à jour' : 'Créer'}
      </Button>
    </form>
  );
};