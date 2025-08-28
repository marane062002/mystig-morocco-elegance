// Travel Program Types and Interfaces

// ENUMS
export enum DemandStatus {
  PENDING = "PENDING",
  VALIDATED = "VALIDATED",
  SENT = "SENT"
}

export enum TransportType {
  BUS = "BUS",
  CAR = "CAR",
  TRAIN = "TRAIN",
  PLANE = "PLANE",
  OTHER = "OTHER"
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

export interface Hotel {
  id: string;
  name: string;
  city: City;
  price: number;
  stars: number;
  active: boolean;
}

export interface Transport {
  id: string;
  type: TransportType;
  company?: string;
  city: City;
  price: number;
  active: boolean;
}

export interface Activity {
  id: string;
  name: string;
  city: City;
  price: number;
  active: boolean;
}

export interface ServiceOffering {
  id: string;
  type: ServiceType;
  providerName: string;
  city: City;
  price: number;
  active: boolean;
}

// For city selection in the form
export interface CitySelection {
  cityId: string;
  startDate: string;
  endDate: string;
  duration: number;
  activities: string[]; // array of activity IDs
}

// PLAN A: DEMAND

export interface DemandCity {
  id?: string;
  city: City;
  startDate: string;
  endDate: string;
  durationDays: number;
  activities: Activity[];
  selectedHotel?: Hotel;
  selectedTransport?: Transport;
  services: ServiceOffering[];
}

export interface Demand {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  travelers: number;
  periodDays: number;
  status: DemandStatus;
  totalPrice: number;
  cities: DemandCity[];
}

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