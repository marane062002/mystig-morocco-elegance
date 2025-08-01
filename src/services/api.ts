const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Auth token management
const getAuthToken = () => localStorage.getItem('authToken');
const setAuthToken = (token: string) => localStorage.setItem('authToken', token);
const removeAuthToken = () => localStorage.removeItem('authToken');

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.success && response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    businessInfo?: any;
  }) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.success && response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  logout: async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } finally {
      removeAuthToken();
    }
  },

  getCurrentUser: async () => {
    return await apiRequest('/auth/me');
  },
};

// Hotels API
export const hotelsAPI = {
  getAll: async (params?: { page?: number; limit?: number; status?: string; city?: string }) => {
    const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return await apiRequest(`/hotels${queryString}`);
  },

  getById: async (id: string) => {
    return await apiRequest(`/hotels/${id}`);
  },

  create: async (hotelData: any) => {
    return await apiRequest('/hotels', {
      method: 'POST',
      body: JSON.stringify(hotelData),
    });
  },

  update: async (id: string, hotelData: any) => {
    return await apiRequest(`/hotels/${id}`, {
      method: 'PUT',
      body: JSON.stringify(hotelData),
    });
  },

  delete: async (id: string) => {
    return await apiRequest(`/hotels/${id}`, {
      method: 'DELETE',
    });
  },

  addReview: async (id: string, reviewData: { rating: number; comment?: string }) => {
    return await apiRequest(`/hotels/${id}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  },
};

// Events API
export const eventsAPI = {
  getAll: async (params?: { page?: number; limit?: number; status?: string; type?: string; city?: string }) => {
    const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return await apiRequest(`/events${queryString}`);
  },

  getById: async (id: string) => {
    return await apiRequest(`/events/${id}`);
  },

  create: async (eventData: any) => {
    return await apiRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  },

  update: async (id: string, eventData: any) => {
    return await apiRequest(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  },

  delete: async (id: string) => {
    return await apiRequest(`/events/${id}`, {
      method: 'DELETE',
    });
  },

  purchaseTickets: async (id: string, ticketData: { ticketType: string; quantity: number }) => {
    return await apiRequest(`/events/${id}/tickets/purchase`, {
      method: 'POST',
      body: JSON.stringify(ticketData),
    });
  },
};

// Packages API
export const packagesAPI = {
  getAll: async (params?: { page?: number; limit?: number; status?: string; type?: string }) => {
    const queryString = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return await apiRequest(`/packages${queryString}`);
  },

  create: async (packageData: any) => {
    return await apiRequest('/packages', {
      method: 'POST',
      body: JSON.stringify(packageData),
    });
  },
};

// Statistics API
export const statisticsAPI = {
  getDashboard: async () => {
    return await apiRequest('/statistics/dashboard');
  },

  getRevenue: async (period?: string) => {
    const queryString = period ? `?period=${period}` : '';
    return await apiRequest(`/statistics/revenue${queryString}`);
  },
};

// Transport API
export const transportAPI = {
  getAll: async () => {
    return await apiRequest('/transport');
  },
};

// Artisan API
export const artisanAPI = {
  getAll: async () => {
    return await apiRequest('/artisan');
  },
};

// Food API
export const foodAPI = {
  getAll: async () => {
    return await apiRequest('/food');
  },
};

// Users API
export const usersAPI = {
  getProfile: async () => {
    return await apiRequest('/users/profile');
  },

  updateProfile: async (profileData: any) => {
    return await apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Export auth token utilities
export { getAuthToken, setAuthToken, removeAuthToken };