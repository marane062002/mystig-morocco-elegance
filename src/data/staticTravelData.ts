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
  Currency,
  TransportType
} from '@/types/travel';

// Static Cities Data
export const staticCities: City[] = [
  {
    id: '1',
    name: 'Marrakech',
    region: 'Marrakech-Safi',
    country: 'Morocco',
    description: 'The Red City, famous for its medina and Jemaa el-Fnaa square. Experience the bustling souks, magnificent palaces, and vibrant culture.',
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
    description: 'The imperial capital with rich history, Hassan Tower, Royal Mausoleum, and elegant modern districts.',
    imageUrl: '/src/assets/chefchaouen.jpg',
    enabled: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Fés',
    region: 'Fés-Meknès',
    country: 'Morocco',
    description: 'The spiritual heart of Morocco, home to the world\'s oldest university and an authentic medieval medina.',
    imageUrl: '/src/assets/hero-riad.jpg',
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
    description: 'Coastal city known for its fortified medina, artistic atmosphere, fresh seafood, and windsurfing.',
    imageUrl: '/src/assets/essaouira.jpg',
    enabled: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Agadir',
    region: 'Souss-Massa',
    country: 'Morocco',
    description: 'Modern resort city with golden beaches, luxurious hotels, and a perfect blend of relaxation and adventure.',
    imageUrl: '/src/assets/atlas-mountains.jpg',
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
    stars: 5,
    rating: 5,
    pricePerNight: 200,
    price: 200,
    currency: Currency.EUR,
    amenities: ['Wifi', 'Spa', 'Pool', 'Restaurant'],
    imageUrl: '/src/assets/hero-riad.jpg',
    active: true,
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
    stars: 4,
    rating: 4,
    pricePerNight: 150,
    price: 150,
    currency: Currency.EUR,
    amenities: ['Wifi', 'Parking', 'Restaurant', 'Gym'],
    active: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Riad Fés Medina',
    description: 'Authentic riad in the ancient medina of Fés',
    cityId: '3',
    address: 'Medina, Fés',
    stars: 4,
    rating: 4,
    pricePerNight: 120,
    price: 120,
    currency: Currency.EUR,
    amenities: ['Wifi', 'Traditional Architecture', 'Rooftop Terrace'],
    active: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Riad Essaouira Ocean',
    description: 'Charming riad near the ocean with traditional decor',
    cityId: '4',
    address: 'Medina, Essaouira',
    stars: 4,
    rating: 4,
    pricePerNight: 110,
    price: 110,
    currency: Currency.EUR,
    amenities: ['Wifi', 'Ocean View', 'Traditional Breakfast'],
    active: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Agadir Beach Resort',
    description: 'Modern beachfront resort with luxury amenities',
    cityId: '5',
    address: 'Agadir Beach, Agadir',
    stars: 5,
    rating: 5,
    pricePerNight: 250,
    price: 250,
    currency: Currency.EUR,
    amenities: ['Wifi', 'Beach Access', 'Spa', 'Pool', 'Golf Course'],
    active: true,
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
    description: 'Desert camel trekking experience in Marrakech surroundings',
    cityId: '1',
    price: 50,
    currency: Currency.EUR,
    duration: 4,
    maxParticipants: 20,
    active: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Spa Treatment',
    description: 'Traditional hammam and massage in authentic Marrakech spa',
    cityId: '1',
    price: 80,
    currency: Currency.EUR,
    duration: 3,
    maxParticipants: 10,
    imageUrl: '/src/assets/hammam-spa.jpg',
    active: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Museum Tour',
    description: 'Guided tour of historical museums and monuments in Rabat',
    cityId: '2',
    price: 30,
    currency: Currency.EUR,
    duration: 2,
    maxParticipants: 15,
    active: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Medina Walking Tour',
    description: 'Explore the ancient medina and tanneries of Fés',
    cityId: '3',
    price: 35,
    currency: Currency.EUR,
    duration: 3,
    maxParticipants: 12,
    active: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Cooking Class',
    description: 'Learn traditional Moroccan cuisine in Marrakech',
    cityId: '1',
    price: 60,
    currency: Currency.EUR,
    duration: 4,
    maxParticipants: 8,
    imageUrl: '/src/assets/moroccan-cuisine.jpg',
    active: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '6',
    name: 'Port and Medina Tour',
    description: 'Discover Essaouira\'s charming port and fortified medina',
    cityId: '4',
    price: 25,
    currency: Currency.EUR,
    duration: 2,
    maxParticipants: 15,
    active: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '7',
    name: 'Surf Lesson',
    description: 'Learn to surf on Agadir\'s beautiful beaches',
    cityId: '5',
    price: 45,
    currency: Currency.EUR,
    duration: 3,
    maxParticipants: 8,
    active: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '8',
    name: 'Kasbah Visit',
    description: 'Visit Agadir\'s reconstructed Kasbah with panoramic views',
    cityId: '5',
    price: 20,
    currency: Currency.EUR,
    duration: 2,
    maxParticipants: 20,
    active: true,
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
    name: 'Luxury Minibus',
    description: 'Air-conditioned minibus for group travel',
    type: TransportType.MINIBUS,
    company: 'Atlas Transport',
    cityId: '1',
    price: 120,
    pricePerDay: 120,
    currency: Currency.EUR,
    capacity: 25,
    active: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Private Van',
    description: 'Comfortable van with professional driver',
    type: TransportType.VAN,
    company: 'Morocco VIP Transport',
    cityId: '2',
    price: 80,
    pricePerDay: 80,
    currency: Currency.EUR,
    capacity: 4,
    active: true,
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Luxury Autocar',
    description: 'Spacious autocar for large groups',
    type: TransportType.AUTOCAR,
    company: 'Desert Tours Transport',
    cityId: '3',
    price: 100,
    pricePerDay: 100,
    currency: Currency.EUR,
    capacity: 8,
    active: true,
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
      mainTraveler: {
        fullName: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1234567890'
      },
      travelers: [{}],
      tripPeriod: 5,
      tripStartDate: '2025-09-01',
      tripEndDate: '2025-09-06'
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
      mainTraveler: {
        fullName: 'Sarah Wilson',
        email: 'sarah.wilson@email.com',
        phone: '+9876543210'
      },
      travelers: [{}, {}, {}],
      tripPeriod: 7,
      tripStartDate: '2025-10-01',
      tripEndDate: '2025-10-08'
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