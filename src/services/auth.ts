import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken,
  authAPI,
} from "./api";

export const getCurrentUser = async () => {
  try {
    return await authAPI.getCurrentUser();
  } catch {
    return null;
  }
};

export const login = async (email: string, password: string) => {
  const response = await authAPI.login(email, password);
  if (response.accessToken && response.refreshToken) {
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
  }
  return response;
};

export const register = async (userData: any) => {
  const response = await authAPI.register(userData);
  if (response.accessToken && response.refreshToken) {
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
  }
  return response;
};

export const logout = async () => {
  try {
    await authAPI.logout();
  } finally {
    removeAccessToken();
    removeRefreshToken();
  }
};

export const isAuthenticated = () => !!getAccessToken();

export const refreshToken = async () => {
  const token = getRefreshToken();
  if (!token) return null;
  const response = await authAPI.refreshToken();
  if (response.accessToken && response.refreshToken) {
    setAccessToken(response.accessToken);
    setRefreshToken(response.refreshToken);
    return response.accessToken;
  }
  logout();
  return null;
};