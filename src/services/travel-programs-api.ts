import { DemandCity, RoomType } from '@/models/travel-programs';
import { apiRequest } from './api';
import { ClientDemand, AdminPackage, City, Activity, Service, Hotel, Transport, ClientInfo } from '@/types/travel';

// Type aliases for compatibility
type Demand = ClientDemand;
type SpecialPackage = AdminPackage;
type ServiceOffering = Service;

// Cities API
export const citiesAPI = {
  getAll: async () => apiRequest('/cities'),
  getById: async (id: string) => apiRequest(`/cities/${id}`),
  create: async (data: Partial<City>) => apiRequest('/cities', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: string, data: Partial<City>) => apiRequest(`/cities/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: string) => apiRequest(`/cities/${id}`, { method: 'DELETE' }),
};

// Hotels API
export const hotelsAPI = {
  getAll: async () => apiRequest('/travel/hotels'),
  getById: async (id: string) => apiRequest(`/travel/hotels/${id}`),
  create: async (data: Partial<Hotel>) => apiRequest('/travel/hotels', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: string, data: Partial<Hotel>) => apiRequest(`/travel/hotels/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: string) => apiRequest(`/travel/hotels/${id}`, { method: 'DELETE' }),
};

// Transport API
export const transportsAPI = {
  getAll: async () => apiRequest('/travel/transports'),
  getById: async (id: string) => apiRequest(`/travel/transports/${id}`),
  create: async (data: Partial<Transport>) => apiRequest('/travel/transports', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: string, data: Partial<Transport>) => apiRequest(`/travel/transports/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: string) => apiRequest(`/travel/transports/${id}`, { method: 'DELETE' }),
};

// Activities API
export const activitiesAPI = {
  getAll: async (cityId?: string) => cityId
    ? apiRequest(`/activities/city/${cityId}`)
    : apiRequest('/activities'),
  getById: async (id: string) => apiRequest(`/activities/${id}`),
  create: async (data: Partial<Activity>) => apiRequest('/activities', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: string, data: Partial<Activity>) => apiRequest(`/activities/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: string) => apiRequest(`/activities/${id}`, { method: 'DELETE' }),
};

// Services API (use travel-programs types)
export const servicesAPI = {
  getAll: async () => apiRequest('/services'),
  getById: async (id: string) => apiRequest(`/services/${id}`),
  create: async (data: Partial<ServiceOffering>) => apiRequest('/services', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: string, data: Partial<ServiceOffering>) => apiRequest(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: string) => apiRequest(`/services/${id}`, { method: 'DELETE' }),
};


// Demands API (Plan A)
// Update the API service to include the new endpoints
export const demandsAPI = {
  // Basic CRUD operations
  getAll: async (): Promise<Demand[]> => apiRequest('/demands'),
  getById: async (id: string): Promise<Demand> => apiRequest(`/demands/${id}`),
  create: async (data: Partial<Demand>): Promise<Demand> => apiRequest('/demands', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Step 1: Client creates demand with basic information
  createClientDemand: async (clientInfo: ClientInfo, cities: DemandCity[], comment?: string): Promise<Demand> => 
    apiRequest('/demands/client', {
      method: 'POST',
      body: JSON.stringify({ clientInfo, cities, comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  update: async (id: string, data: Partial<Demand>): Promise<Demand> => apiRequest(`/demands/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: string): Promise<void> => apiRequest(`/demands/${id}`, { method: 'DELETE' }),
  
  // Step 2: Admin completes the demand
  updateActivities: async (demandId: string, cityId: string, activityIds: string[]): Promise<DemandCity> => 
    apiRequest(`/demands/${demandId}/cities/${cityId}/activities`, {
      method: 'PATCH',
      body: JSON.stringify(activityIds),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  
  updateHotel: async (demandId: string, cityId: string, hotelId: string): Promise<DemandCity> => 
    apiRequest(`/demands/${demandId}/cities/${cityId}/hotel`, {
      method: 'PATCH',
      body: JSON.stringify(hotelId),
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  updateRoomSelections: async (demandId: string, cityId: string, roomSelections: DemandCity['roomSelections']): Promise<DemandCity> => 
    apiRequest(`/demands/${demandId}/cities/${cityId}/rooms`, {
      method: 'PATCH',
      body: JSON.stringify(roomSelections),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  
  updateTransport: async (demandId: string, transportId: string): Promise<Demand> => 
    apiRequest(`/demands/${demandId}/transport`, {
      method: 'PATCH',
      body: JSON.stringify(transportId),
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  updateGlobalServices: async (demandId: string, serviceIds: string[]): Promise<Demand> => 
    apiRequest(`/demands/${demandId}/global-services`, {
      method: 'PATCH',
      body: JSON.stringify(serviceIds),
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  updateGlobalServiceQuantity: async (demandId: string, serviceId: string, quantity: number): Promise<Demand> => 
    apiRequest(`/demands/${demandId}/global-services/${serviceId}`, {
      method: 'PATCH',
      body: JSON.stringify(quantity),
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  updateComment: async (demandId: string, comment: string): Promise<Demand> => 
    apiRequest(`/demands/${demandId}/comment`, {
      method: 'PATCH',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  updateStatus: async (demandId: string, status: string): Promise<Demand> => 
    apiRequest(`/demands/${demandId}/status`, {
      method: 'PATCH',
      body: JSON.stringify(status),
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  updateBenefitPercentage: async (demandId: string, benefitPercentage: number): Promise<Demand> =>
    apiRequest(`/demands/${demandId}/benefit-percentage`, {
      method: 'PATCH',
      body: JSON.stringify(benefitPercentage),
      headers: { 'Content-Type': 'application/json' },
    }),

  updateTaxPercentage: async (demandId: string, taxPercentage: number): Promise<Demand> =>
    apiRequest(`/demands/${demandId}/tax-percentage`, {
      method: 'PATCH',
      body: JSON.stringify(taxPercentage),
      headers: { 'Content-Type': 'application/json' },
    }),

  // Frontend-only percentage management (no API calls needed)
  // benefitPercentage and taxPercentage are now managed in frontend state

  getDemandCities: async (demandId: string): Promise<DemandCity[]> => 
    apiRequest(`/demands/${demandId}/cities`),
  
  send: async (demandId: string): Promise<Demand> => 
    apiRequest(`/demands/${demandId}/send`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }),

  calculatePrice: async (demandId: string): Promise<number> => 
    apiRequest(`/demands/${demandId}/price`),

  calculateAndUpdatePrice: async (demandId: string): Promise<number> => 
    apiRequest(`/demands/${demandId}/calculate`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
};

// Special Packages API (Plan B)
export const packagesAPI = {
  getAll: async () => apiRequest('/travel/packages'),
  getById: async (id: string) => apiRequest(`/travel/packages/${id}`),
  create: async (data: Partial<SpecialPackage>) => apiRequest('/travel/packages', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: string, data: Partial<SpecialPackage>) => apiRequest(`/travel/packages/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: string) => apiRequest(`/travel/packages/${id}`, { method: 'DELETE' }),
  send: async (demandId: string) => apiRequest(`/demands/${demandId}/send`, { method: 'POST' }),
};

// Export alias for backward compatibility
export const specialPackagesAPI = packagesAPI;