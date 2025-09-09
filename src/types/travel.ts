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
  INSURANCE = 'INSURANCE',
  PHOTOGRAPHY = 'PHOTOGRAPHY',
  DRIVER = 'DRIVER',
  TRANSLATION = 'TRANSLATION',
  SECURITY = 'SECURITY',
  OTHER = 'OTHER'
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  MAD = 'MAD'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}



// Base Interfaces
export interface City {
  id: string;
  name: string;
  region?: string;
  country?: string;
  enabled: boolean;
}
export enum RoomTypeEnum {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE', 
  TRIPLE = 'TRIPLE',
  FAMILY = 'FAMILY',
  SUITE = 'SUITE'
}
export interface RoomType {
  id: string;
  type: RoomTypeEnum;
  price: number;
  capacity: number;
}
export interface Hotel {
  id: string;
  name: string;
  city: City;
  roomTypes: RoomType[];
  stars: number;
  active: boolean;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  city: City;
  price: number;
  active: boolean;
}

export interface ServiceOffering {
  id: string;
  type: ServiceType;
  providerName: string;
  price: number;
  active: boolean;
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
export enum TransportType {
  VAN = "VAN",
  MINIBUS = "MINIBUS", 
  AUTOCAR = "AUTOCAR"
}

export interface Transport {
  id: string;
  type: TransportType;
  company?: string;
  price: number;
  active: boolean;
}

export enum TravelerType {
  ADULT = 'ADULT',
  CHILD = 'CHILD',
  INFANT = 'INFANT'
}
// Traveler Interfaces
export interface Traveler {
  age?: number;
}

export interface MainTraveler {
  fullName: string;
  email: string;
  phone: string;
}

// Client Custom Program Interfaces
export interface ClientInfo {
  mainTraveler: MainTraveler;
  travelers: Traveler[];
  tripPeriod: number;
  tripStartDate: string; // Ajouté
  tripEndDate: string;   // Ajouté
}

export interface CitySelection {
  cityId: string;
  city?: City;
  startDate: string;
  endDate: string;
  duration: number;
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
  comment?: string;
}

// Demand City (Admin completion)
export interface DemandCity {
  id?: string;
  city: City;
  startDate: string;
  endDate: string;
  durationDays: number;
  activities: Activity[];
  selectedHotel?: Hotel;
  roomSelections: {
    roomTypeId: string;
    roomType: string;
    price: number;
    capacity: number;
    count: number;
  }[];
  calculatedPrice?: number;
}

// Main Demand Interface
export interface Demand {
  id?: string;
  clientInfo: ClientInfo;
  status: DemandStatus;
  totalPrice: number;
  cities: DemandCity[];
  comment?: string;
  globalServices?: {
    service: ServiceOffering;
    quantity: number;
  }[];
  selectedTransport?: Transport;
  benefitPercentage?: number;
  taxPercentage?: number;
  createdAt?: string;
  updatedAt?: string;
  agentId?: string;
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