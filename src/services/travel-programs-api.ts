import { apiRequest } from './api';
import { Demand, SpecialPackage, City, Activity, ServiceOffering, Hotel, Transport } from '@/models/travel-programs';

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
    ? apiRequest(`/activities?cityId=${cityId}`)
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

// Services API
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
  getAll: async () => apiRequest('/demands'),
  getById: async (id: string) => apiRequest(`/demands/${id}`),
  create: async (data: Partial<Demand>) => apiRequest('/demands', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: async (id: string, data: Partial<Demand>) => apiRequest(`/demands/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: async (id: string) => apiRequest(`/demands/${id}`, { method: 'DELETE' }),
  
  // New endpoints for individual updates
  updateServices: async (demandId: string, cityId: string, serviceIds: string[]) => 
    apiRequest(`/demands/${demandId}/cities/${cityId}/services`, {
      method: 'PATCH',
      body: JSON.stringify(serviceIds),
    }),
  
  updateActivities: async (demandId: string, cityId: string, activityIds: string[]) => 
    apiRequest(`/demands/${demandId}/cities/${cityId}/activities`, {
      method: 'PATCH',
      body: JSON.stringify(activityIds),
    }),
  
  updateHotel: async (demandId: string, cityId: string, hotelId: string) => 
    apiRequest(`/demands/${demandId}/cities/${cityId}/hotel`, {
      method: 'PATCH',
      body: JSON.stringify(hotelId),
    }),
  
  updateTransport: async (demandId: string, cityId: string, transportId: string) => 
    apiRequest(`/demands/${demandId}/cities/${cityId}/transport`, {
      method: 'PATCH',
      body: JSON.stringify(transportId),
    }),
  
  getDemandCities: async (demandId: string) => 
    apiRequest(`/demands/${demandId}/cities`),
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
};