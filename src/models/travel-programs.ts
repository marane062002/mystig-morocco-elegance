// Travel Program Types and Interfaces

// ENUMS
export enum DemandStatus {
  PENDING = "PENDING",
  VALIDATED = "VALIDATED",
  SENT = "SENT"
}

export enum TransportType {
  VAN = "VAN",           // Van 5-6 personnes
  MINIBUS = "MINIBUS",   // Mini bus 20 personnes
  AUTOCAR = "AUTOCAR"    // Auto-car 50 personnes
}
export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum TravelerType {
  ADULT = 'ADULT',
  CHILD = 'CHILD',
  INFANT = 'INFANT'
}
export enum ServiceType {
  GUIDE = "GUIDE",
  PHOTOGRAPHY = "PHOTOGRAPHY",
  DRIVER = "DRIVER",
  TRANSLATION = "TRANSLATION",
  SECURITY = "SECURITY",
  OTHER = "OTHER"
}

// ENTITIES

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

export interface Traveler {
  fullName: string;
  age: number;
  gender: Gender;
  type: TravelerType;
}

export interface MainTraveler {
  fullName: string;
  email: string;
  phone: string;
}

export interface ClientInfo {
  mainTraveler: MainTraveler;
  travelers: Traveler[];
  tripPeriod: number;
}

// Update your interfaces to match the component expectations
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

export interface Demand {
  id?: string;
  clientInfo: ClientInfo;  // This contains mainTraveler and travelers
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

// Add helper interface for the component
export interface DemandForDisplay extends Omit<Demand, 'clientInfo'> {
  fullName: string;
  email: string;
  phone: string;
  travelers: number;
  periodDays: number;
}

// Modifier l'interface Transport
export interface Transport {
  id: string;
  type: TransportType;
  company?: string;
  // Supprimer la relation avec city
  price: number;
  active: boolean;
}

export interface Activity {
  id: string;
  name: string;
  description: string; // Nouveau champ
  city: City;
  price: number;
  active: boolean;
}

// Modifier l'interface ServiceOffering
export interface ServiceOffering {
  id: string;
  type: ServiceType;
  providerName: string;
  // Supprimer la relation avec city
  price: number;
  active: boolean;
}

// For city selection in the form
export interface CitySelection {
  cityId: string;
  city?: City;
  startDate: string;
  endDate: string;
  duration: number;
  activityIds: string[];
  activities?: Activity[];
}

// PLAN A: DEMAND

// export interface DemandCity {
//   id?: string;
//   city: City;
//   startDate: string;
//   endDate: string;
//   durationDays: number;
//   activities: Activity[];
//   selectedHotel?: Hotel;
//   roomSelections: {
//     roomType: RoomType;
//     count: number;
//   }[];
//   // Ajouter le prix calculé pour cette ville (optionnel)
//   calculatedPrice?: number;
// }

// export interface Demand {
//   id?: string;
//   fullName: string;
//   email: string;
//   phone?: string;
//   travelers: number;
//   periodDays: number;
//   status: DemandStatus;
//   totalPrice: number;
//   cities: DemandCity[];
//   comment?: string;
//   globalServices?: {
//     service: ServiceOffering;
//     quantity: number;
//   }[];
//   selectedTransport?: Transport;
//   // Ces champs peuvent être optionnels si gérés uniquement en frontend
//   benefitPercentage?: number;
//   taxPercentage?: number;
//   createdAt?: string;
//   updatedAt?: string;
//   // Ajouter une référence à l'agent qui gère la demande (optionnel)
//   agentId?: string;
// }

// PLAN B: SPECIAL PACKAGE

export interface PackageCityPeriod {
  id: string;
  city: City;
  periodDays: number;
}

export interface SpecialPackage {
  id: string;
  name: string;
  description?: string;
  cities: City[];
  hotels: Hotel[];
  activities: Activity[];
  services: ServiceOffering[];
  transports: Transport[];
  basePrice: number;
  discountPercent: number;
  finalPrice: number;
  status: boolean;
  totalPeriodDays: number;
  cityPeriods: PackageCityPeriod[];
}




