// Core Enums
export enum UserRole {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_SELLER = 'ROLE_SELLER',
  ROLE_BUYER = 'ROLE_BUYER'
}

export enum DemandStatus {
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED',
  SENT = 'SENT'
}

export enum ServiceType {
  GUIDE = 'GUIDE',
  TRANSPORT_SERVICE = 'TRANSPORT_SERVICE',
  CATERING = 'CATERING',
  EQUIPMENT = 'EQUIPMENT',
  INSURANCE = 'INSURANCE'
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  MAD = 'MAD'
}

// Base Interfaces
export interface City {
  id: string;
  name: string;
  region: string;
  country: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  cityId: string;
  city?: City;
  address: string;
  rating: number;
  pricePerNight: number;
  currency: Currency;
  amenities: string[];
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  cityId: string;
  city?: City;
  price: number;
  currency: Currency;
  duration: number; // in hours
  maxParticipants?: number;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  type: ServiceType;
  provider: string;
  price: number;
  currency: Currency;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Transport {
  id: string;
  name: string;
  description: string;
  type: string;
  cityId: string;
  city?: City;
  pricePerDay: number;
  currency: Currency;
  capacity: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Client Custom Program Interfaces
export interface ClientInfo {
  fullName: string;
  email: string;
  phone: string;
  numberOfTravelers: number;
  tripPeriod: number; // auto-calculated
}

export interface CitySelection {
  cityId: string;
  city?: City;
  startDate: string;
  endDate: string;
  duration: number; // auto-calculated in days
  activityIds: string[];
  activities?: Activity[];
}

export interface ClientDemand {
  id: string;
  clientInfo: ClientInfo;
  citySelections: CitySelection[];
  status: DemandStatus;
  totalPrice?: number;
  createdAt: string;
  updatedAt: string;
}

// Admin Assignment Interfaces
export interface CityAssignment {
  cityId: string;
  city?: City;
  startDate: string;
  endDate: string;
  duration: number;
  activityIds: string[];
  activities?: Activity[];
  hotelId?: string;
  hotel?: Hotel;
  transportId?: string;
  transport?: Transport;
  serviceIds: string[];
  services?: Service[];
  totalPrice: number;
}

export interface DemandWithAssignments extends ClientDemand {
  cityAssignments: CityAssignment[];
  finalTotalPrice: number;
}

// Plan B - Special Admin Packages
export interface AdminPackage {
  id: string;
  title: string;
  description: string;
  cityIds: string[];
  cities?: City[];
  hotelIds: string[];
  hotels?: Hotel[];
  activityIds: string[];
  activities?: Activity[];
  serviceIds: string[];
  services?: Service[];
  transportId: string;
  transport?: Transport;
  cityDateRanges: {
    cityId: string;
    startDate: string;
    endDate: string;
    duration: number;
  }[];
  basePrice: number;
  discountPercentage: number;
  finalPrice: number;
  currency: Currency;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Form Interfaces
export interface ClientDemandForm {
  step: number;
  clientInfo: Partial<ClientInfo>;
  citySelections: Partial<CitySelection>[];
}

export interface AdminPackageForm extends Omit<AdminPackage, 'id' | 'basePrice' | 'finalPrice' | 'createdAt' | 'updatedAt'> {
  basePrice?: number;
  finalPrice?: number;
}

// Filter and Pagination Interfaces
export interface DemandFilters {
  status?: DemandStatus;
  clientName?: string;
  dateFrom?: string;
  dateTo?: string;
  minTravelers?: number;
  maxTravelers?: number;
}

export interface PaginationParams {
  page: number;
  size: number;
  sort?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}