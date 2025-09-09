const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Auth token management (access/refresh)
const getAccessToken = () => localStorage.getItem('accessToken');
const setAccessToken = (token: string) => localStorage.setItem('accessToken', token);
const removeAccessToken = () => localStorage.removeItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');
const setRefreshToken = (token: string) => localStorage.setItem('refreshToken', token);
const removeRefreshToken = () => localStorage.removeItem('refreshToken');

// API request helper with JWT/refresh support
// API request helper with JWT/refresh support
export const apiRequest = async (endpoint: string, options: RequestInit = {}, retry = true): Promise<any> => {
  const token = getAccessToken();
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

    // Handle unauthorized or forbidden → try refresh
    if ((response.status === 401 || response.status === 403) && retry && getRefreshToken()) {
      const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: getRefreshToken() }),
      });

      if (refreshRes.ok) {
        const data = await refreshRes.json();
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        // Retry original request once
        return apiRequest(endpoint, options, false);
      } else {
        removeAccessToken();
        removeRefreshToken();
        throw new Error('Session expired, please login again.');
      }
    }

    // Parse response
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
    if (response.accessToken && response.refreshToken) {
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
    }
    return response;
  },

  register: async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    companyName?: string;
    description?: string;
    license?: string;
    address?: any;
  }) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    if (response.accessToken && response.refreshToken) {
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
    }
    return response;
  },

  logout: async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } finally {
      removeAccessToken();
      removeRefreshToken();
    }
  },

  getCurrentUser: async () => apiRequest('/auth/me'),
  forgotPassword: async (email: string) =>
    apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
  resetPassword: async (token: string, password: string) =>
    apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    }),
  verifyEmail: async (token: string) => apiRequest(`/auth/verify-email/${token}`),
  
  refreshToken: async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');
    return apiRequest('/auth/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },
};

// Users API
export const usersAPI = {
  getProfile: async () => apiRequest('/users/profile'),
  updateProfile: async (profileData: any) =>
    apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),
  getAll: async (params?: Record<string, any>) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/users${qs}`);
  },
  updateStatus: async (id: string, isActive: boolean) =>
    apiRequest(`/users/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ isActive }),
    }),
};
// Hotels API
export const hotelsAPI = {
  getAll: async (params?: Record<string, any>) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/hotels${qs}`);
  },
  getById: async (id: string) => apiRequest(`/hotels/${id}`),
  create: async (hotelData: any) =>
    apiRequest('/hotels', {
      method: 'POST',
      body: JSON.stringify(hotelData),
    }),
  update: async (id: string, hotelData: any) =>
    apiRequest(`/hotels/${id}`, {
      method: 'PUT',
      body: JSON.stringify(hotelData),
    }),
  delete: async (id: string) =>
    apiRequest(`/hotels/${id}`, { method: 'DELETE' }),
  addReview: async (id: string, reviewData: { rating: number; comment?: string }) =>
    apiRequest(`/hotels/${id}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData),
    }),
};


// Events API
export const eventsAPI = {
  getAll: async (params?: Record<string, any>) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/events${qs}`);
  },
  getById: async (id: string) => apiRequest(`/events/${id}`),
  create: async (eventData: any) =>
    apiRequest('/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    }),
  update: async (id: string, eventData: any) =>
    apiRequest(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    }),
  delete: async (id: string) =>
    apiRequest(`/events/${id}`, { method: 'DELETE' }),
  purchaseTickets: async (id: string, ticketData: { ticketId: string; quantity: number }) =>
    apiRequest(`/events/${id}/tickets/purchase`, {
      method: 'POST',
      body: JSON.stringify(ticketData),
    }),
  getAttendees: async (id: string) => apiRequest(`/events/${id}/attendees`),
};

// Packages API
export const packagesAPI = {
  getAll: async (params?: Record<string, any>) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/packages${qs}`);
  },
  getById: async (id: string) => apiRequest(`/packages/${id}`),
  create: async (packageData: any) =>
    apiRequest('/packages', {
      method: 'POST',
      body: JSON.stringify(packageData),
    }),
  update: async (id: string, packageData: any) =>
    apiRequest(`/packages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(packageData),
    }),
  delete: async (id: string) =>
    apiRequest(`/packages/${id}`, { method: 'DELETE' }),
  book: async (id: string) =>
    apiRequest(`/packages/${id}/book`, { method: 'POST' }),
};

// Statistics API
export const statisticsAPI = {
  getDashboard: async (params?: Record<string, any>) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/statistics/dashboard${qs}`);
  },
  getRevenue: async (params?: Record<string, any>) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/statistics/revenue${qs}`);
  },
  getBookings: async (params?: Record<string, any>) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/statistics/bookings${qs}`);
  },
  getPopularItems: async (params?: Record<string, any>) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/statistics/popular-items${qs}`);
  },
  getCustomerAnalytics: async () => apiRequest(`/statistics/customer-analytics`),
  getSellerPerformance: async (params?: Record<string, any>) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/statistics/seller-performance${qs}`);
  },
};

// Transport API
export const transportAPI = {
  getAll: async (params?: Record<string, any>) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/transport${qs}`);
  },
  getById: async (id: string) => apiRequest(`/transport/${id}`),
  create: async (data: any) =>
    apiRequest('/transport', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: async (id: string, data: any) =>
    apiRequest(`/transport/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: async (id: string) =>
    apiRequest(`/transport/${id}`, { method: 'DELETE' }),
};

// Artisan API
export const artisanAPI = {
  getAll: async (params?: Record<string, any>) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/artisan${qs}`);
  },
  getById: async (id: string) => apiRequest(`/artisan/${id}`),
  create: async (data: any) =>
    apiRequest('/artisan', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: async (id: string, data: any) =>
    apiRequest(`/artisan/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: async (id: string) =>
    apiRequest(`/artisan/${id}`, { method: 'DELETE' }),
};

// Food API
export const foodAPI = {
  getAll: async (params?: Record<string, any>) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/food${qs}`);
  },
  getById: async (id: string) => apiRequest(`/food/${id}`),
  create: async (data: any) =>
    apiRequest('/food', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: async (id: string, data: any) =>
    apiRequest(`/food/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  delete: async (id: string) =>
    apiRequest(`/food/${id}`, { method: 'DELETE' }),
};

// Tickets API
export const ticketsAPI = {
  getAll: async (params?: Record<string, any>) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return apiRequest(`/tickets${qs}`);
  },
  getById: async (id: string) => apiRequest(`/tickets/${id}`),
  create: async (ticketData: any) =>
    apiRequest('/tickets', {
      method: 'POST',
      body: JSON.stringify(ticketData),
    }),
  update: async (id: string, ticketData: any) =>
    apiRequest(`/tickets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ticketData),
    }),
  delete: async (id: string) =>
    apiRequest(`/tickets/${id}`, { method: 'DELETE' }),
};

// Export token utilities
export {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
};