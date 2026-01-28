import api from './api';

export const login = (credentials) => api.post('/api/v1/auth/login', credentials);
export const register = (userData) => api.post('/api/v1/auth/register', userData);
export const verifyOtp = (otpData) => api.post('/api/v1/auth/verify', otpData);
export const sendOtp = (email) => api.post(`/api/v1/auth/send-otp?email=${email}`);
export const getUserProfile = () => api.get('/api/v1/auth/me');
export const updateUserProfile = (userData) => api.put('/api/v1/auth/me', userData);

// Add other auth endpoints as needed
