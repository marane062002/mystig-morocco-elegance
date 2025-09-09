import { 
  City, 
  Hotel, 
  Activity, 
  Service, 
  Transport, 
  ClientDemand, 
  AdminPackage,
  UserRole,
  DemandStatus,
  ServiceType,
  Currency 
} from '@/types/travel';

// Static Cities Data
export const staticCities: City[] = [
  {
    id: '1',
    name: 'Marrakech',
    region: 'Marrakech-Safi',
    country: 'Morocco',
    description: 'The Red City, famous for its medina and Jemaa el-Fnaa square',
    imageUrl: '/src/assets/marrakech.jpg',
    enabled: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Rabat',
    region: 'Rabat-Salé-Kénitra',
    country: 'Morocco',
    description: 'The capital city with rich history and modern architecture',
    imageUrl: '/src/assets/desert-sunset.jpg',
    enabled: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Chefchaouen',
    region: 'Tanger-Tétouan-Al Hoceïma',
    country: 'Morocco',
    description: 'The Blue Pearl of Morocco',
    imageUrl: '/src/assets/chefchaouen.jpg',
    enabled: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Essaouira',
    region: 'Marrakech-Safi',
    country: 'Morocco',
    description: 'Coastal city known for its medina and windsurfing',
    imageUrl: '/src/assets/essaouira.jpg',
    enabled: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Static Hotels Data
export const staticHotels: Hotel[] = [
  {
    id: '1',
    name: 'Riad Luxury Marrakech',
    description: 'Traditional riad in the heart of the medina',
    cityId: '1',
    address: 'Medina, Marrakech',
    rating: 5,
    pricePerNight: 200,
    currency: Currency.EUR,
    amenities: ['Wifi', 'Spa', 'Pool', 'Restaurant'],
    imageUrl: '/src/assets/hero-riad.jpg',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Hotel Atlas Rabat',
    description: 'Modern hotel in the city center',
    cityId: '2',
    address: 'Centre Ville, Rabat', 
    rating: 4,
    pricePerNight: 150,
    currency: Currency.EUR,
    amenities: ['Wifi', 'Parking', 'Restaurant', 'Gym'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Casa Hassan Chefchaouen',
    description: 'Charming guesthouse with mountain views',
    cityId: '3',
    address: 'Medina, Chefchaouen',
    rating: 4,
    pricePerNight: 80,
    currency: Currency.EUR,
    amenities: ['Wifi', 'Terrace', 'Traditional Breakfast'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Static Activities Data
export const staticActivities: Activity[] = [
  {
    id: '1',
    name: 'Camel Ride',
    description: 'Desert camel trekking experience',
    cityId: '1',
    price: 50,
    currency: Currency.EUR,
    duration: 4,
    maxParticipants: 20,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Spa Treatment',
    description: 'Traditional hammam and massage',
    cityId: '1',
    price: 80,
    currency: Currency.EUR,
    duration: 3,
    maxParticipants: 10,
    imageUrl: '/src/assets/hammam-spa.jpg',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Museum Tour',
    description: 'Guided tour of historical museums',
    cityId: '2',
    price: 30,
    currency: Currency.EUR,
    duration: 2,
    maxParticipants: 15,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Blue City Walking Tour',
    description: 'Explore the famous blue streets',
    cityId: '3',
    price: 25,
    currency: Currency.EUR,
    duration: 3,
    maxParticipants: 12,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Cooking Class',
    description: 'Learn traditional Moroccan cuisine',
    cityId: '1',
    price: 60,
    currency: Currency.EUR,
    duration: 4,
    maxParticipants: 8,
    imageUrl: '/src/assets/moroccan-cuisine.jpg',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Static Services Data
export const staticServices: Service[] = [
  {
    id: '1',
    name: 'Professional Guide',
    description: 'Certified local guide',
    type: ServiceType.GUIDE,
    provider: 'Morocco Tours Guide',
    price: 100,
    currency: Currency.EUR,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Airport Transfer',
    description: 'Private airport transfer service',
    type: ServiceType.TRANSPORT_SERVICE,
    provider: 'Atlas Transfer',
    price: 50,
    currency: Currency.EUR,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Traditional Lunch',
    description: 'Moroccan lunch at local restaurant',
    type: ServiceType.CATERING,
    provider: 'Restaurant Al Fassia',
    price: 35,
    currency: Currency.EUR,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Static Transport Data
export const staticTransports: Transport[] = [
  {
    id: '1',
    name: 'Luxury Bus',
    description: 'Air-conditioned bus for group travel',
    type: 'Bus',
    cityId: '1',
    pricePerDay: 120,
    currency: Currency.EUR,
    capacity: 25,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Private Car',
    description: 'Comfortable sedan with driver',
    type: 'Car',
    cityId: '2',
    pricePerDay: 80,
    currency: Currency.EUR,
    capacity: 4,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Minivan',
    description: 'Spacious van for small groups',
    type: 'Van',
    cityId: '3',
    pricePerDay: 100,
    currency: Currency.EUR,
    capacity: 8,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Static Client Demands Data
export const staticClientDemands: ClientDemand[] = [
  {
    id: '1',
    clientInfo: {
      fullName: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1234567890',
      numberOfTravelers: 2,
      tripPeriod: 5
    },
    citySelections: [
      {
        cityId: '1',
        startDate: '2025-09-01',
        endDate: '2025-09-03',
        duration: 2,
        activityIds: ['1', '2']
      },
      {
        cityId: '2',
        startDate: '2025-09-03',
        endDate: '2025-09-06',
        duration: 3,
        activityIds: ['3']
      }
    ],
    status: DemandStatus.PENDING,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    clientInfo: {
      fullName: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      phone: '+9876543210',
      numberOfTravelers: 4,
      tripPeriod: 7
    },
    citySelections: [
      {
        cityId: '1',
        startDate: '2025-10-01',
        endDate: '2025-10-04',
        duration: 3,
        activityIds: ['1', '5']
      },
      {
        cityId: '3',
        startDate: '2025-10-04',
        endDate: '2025-10-08',
        duration: 4,
        activityIds: ['4']
      }
    ],
    status: DemandStatus.VALIDATED,
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-22T09:15:00Z'
  }
];

// Static Admin Packages Data
export const staticAdminPackages: AdminPackage[] = [
  {
    id: '1',
    title: 'Imperial Cities Discovery',
    description: 'Explore Morocco\'s historical imperial cities',
    cityIds: ['1', '2'],
    hotelIds: ['1', '2'],
    activityIds: ['1', '2', '3'],
    serviceIds: ['1', '3'],
    transportId: '1',
    cityDateRanges: [
      {
        cityId: '1',
        startDate: '2025-08-01',
        endDate: '2025-08-04',
        duration: 3
      },
      {
        cityId: '2',
        startDate: '2025-08-04',
        endDate: '2025-08-07',
        duration: 3
      }
    ],
    basePrice: 1200,
    discountPercentage: 15,
    finalPrice: 1020,
    currency: Currency.EUR,
    isActive: true,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  }
];