// Enums
export enum UserRole {
  ADMIN = "ROLE_ADMIN",
  SELLER = "ROLE_SELLER",
  BUYER = "ROLE_BUYER",
}
export enum EventType {
  ART = "ART",
  SPORT = "SPORT",
  MUSIC = "MUSIC",
  FESTIVAL = "FESTIVAL",
  CONFERENCE = "CONFERENCE",
  CULTURE = "CULTURE",
  FOOD = "FOOD",
}
export enum EventStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CANCELLED = "CANCELLED",
}
export enum Currency {
  USD = "USD",
  EUR = "EUR",
  MAD = "MAD",
}

// Updated ArtisanCategory and ArtisanStatus to match SQL
export enum ArtisanCategory {
  TEXTILES = "TEXTILES",
  CERAMICS = "CERAMICS",
  POTTERY = "POTTERY",
  JEWELRY = "JEWELRY",
  LEATHER = "LEATHER",
  WOODWORK = "WOODWORK",
  METALWORK = "METALWORK",
}
export enum ArtisanStatus {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
  COMING_SOON = "COMING_SOON",
  RESERVED = "RESERVED",
  SOLD = "SOLD",
}

export enum BookingType {
  HOTEL = "HOTEL",
  PACKAGE = "PACKAGE",
  TRANSPORT = "TRANSPORT",
  FOOD = "FOOD",
  ARTISAN = "ARTISAN",
  EVENT = "EVENT",
}
export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}
export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}

// Updated FoodType and FoodStatus to match SQL
export enum FoodType {
  COOKING_CLASS = "COOKING_CLASS",
  TASTING_MENU = "TASTING_MENU",
  WINE_PAIRING = "WINE_PAIRING",
  FINE_DINING = "FINE_DINING",
  FOOD_TOUR = "FOOD_TOUR",
  MARKET_VISIT = "MARKET_VISIT",
}
export enum FoodDifficulty {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}
export enum FoodStatus {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
  COMING_SOON = "COMING_SOON",
}

export enum HotelStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  MAINTENANCE = "MAINTENANCE",
}
export enum HotelAmenity {
  WIFI = "WIFI",
  SPA = "SPA",
  PARKING = "PARKING",
  POOL = "POOL",
  BAR = "BAR",
  CONCIERGE = "CONCIERGE",
  GYM = "GYM",
  LAUNDRY = "LAUNDRY",
  RESTAURANT = "RESTAURANT",
  ROOM_SERVICE = "ROOM_SERVICE",
}

export enum PackageType {
  ADVENTURE = "ADVENTURE",
  BUSINESS = "BUSINESS",
  CULTURAL = "CULTURAL",
  FAMILY = "FAMILY",
  GROUP = "GROUP",
  HONEYMOON = "HONEYMOON",
  WELLNESS = "WELLNESS",
  LUXURY = "LUXURY",
  ROMANTIC = "ROMANTIC",
}
export enum PackageStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  INACTIVE = "INACTIVE",
}
export enum TransportType {
  AIRPORT_TRANSFER = "AIRPORT_TRANSFER",
  BUS = "BUS",
  PRIVATE_CAR = "PRIVATE_CAR",
  TAXI = "TAXI",
}
export enum TransportStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

// User
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  avatar?: string;
  companyName?: string;
  description?: string;
  license?: string;
  address?: {
    street?: string;
    city?: string;
    country?: string;
    zipCode?: string;
  };
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

// RefreshToken
export interface RefreshToken {
  id: string;
  token: string;
  user: User;
  expiresAt: string;
  revoked: boolean;
  used: boolean;
  createdAt: string;
}

// Event
export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  category: string;
  dateRange: { start: string; end: string };
  timeRange: { start: string; end: string };
  venue: string;
  address: string;
  city: string;
  lat?: number;
  lng?: number;
  status: EventStatus;
  featured: boolean;
  tags: string[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  requirements?: {
    ageLimit?: number;
    dresscode?: string;
    specialRequirements?: string[];
  };
  createdAt?: string;
  updatedAt?: string;
  organizer: User;
  tickets?: Ticket[];
  images?: EventImage[];
  attendees?: Attendee[];
}

// Ticket
export interface Ticket {
  id: string;
  typeName: string;
  price: number;
  currency: Currency;
  quantity: number;
  sold: number;
  event: Event;
}

// EventImage
export interface EventImage {
  id: string;
  url: string;
  caption?: string;
  isPrimary: boolean;
  event: Event;
}

// Attendee
export interface Attendee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  event: Event;
  user?: User;
  ticket: Ticket;
  createdAt: string;
}

// Artisan
export interface Artisan {
  id: string;
  name: string; // <-- was title
  description: string;
  category: ArtisanCategory;
  status: ArtisanStatus;
  price: number;
  currency?: string;
  inStock: boolean;
  materials: string[];
  images?: { url: string; caption?: string; isPrimary: boolean }[];
  owner?: User;
  quantity?: number;
  origin?: string;
  craftsman?: string;
  dimensions?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Booking
export interface Booking {
  id: string;
  type: BookingType;
  itemId: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  seller: User;
  createdAt?: string;
  updatedAt?: string;
}

// Food
export interface Foods {
  id: string;
  name: string;
  title: string;
  description: string;
  type: FoodType;
  difficulty: FoodDifficulty;
  status: FoodStatus;
  price: number;
  maxParticipants: number;
  images?: { url: string; caption?: string; isPrimary: boolean }[];
  owner: User;
  createdAt?: string;
  updatedAt?: string;
}

// Hotel
export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: {
    address: string;
    city: string;
    region?: string;
    coordinates?: { lat: number; lng: number };
  };
  images: { url: string; caption?: string; isPrimary: boolean }[];
  amenities: HotelAmenity[];
  status: HotelStatus;
  featured: boolean;
  minPrice: number;
  maxPrice: number;
  reviews?: Review[];
}

// Review
export interface Review {
  id: string;
  rating: number;
  comment?: string;
  user: User;
  hotel: Hotel;
  createdAt: string;
}

// Package
export interface Package {
  id: string;
  name: string;
  title: string;
  description: string;
  type: PackageType;
  status: PackageStatus;
  featured: boolean;
  tags: string[];
  price: number;
  images?: { url: string; caption?: string; isPrimary: boolean }[];
  createdAt?: string;
  updatedAt?: string;
}

// Transport
export interface Transport {
  id: string;
  name: string;
  description: string;
  type: TransportType;
  status: TransportStatus;
  price: number;
  city: string;
  capacity: number;
  currency: Currency
  features: string[];
  images?: { url: string; caption?: string; isPrimary: boolean }[];
  owner: User;
  createdAt?: string;
  updatedAt?: string;
}