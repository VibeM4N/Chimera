import axios from 'axios';
import.meta.env;

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('chimera_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Service
export const authService = {
  register: (email, password, fullName) =>
    api.post('/auth/register', { email, password, fullName }),
  login: (email, password, rememberMe = false) =>
    api.post('/auth/login', { email, password, rememberMe }),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me'),
};

// Scanner Service
export const scanService = {
  scanURL: (url) => api.post('/scan/url', { url }),
  scanEmail: (emailData) => api.post('/scan/email', emailData),
  getScanHistory: (limit = 10) => api.get(`/scan/history?limit=${limit}`),
};

// Report Service
export const reportService = {
  submitReport: (reportData) => api.post('/reports', reportData),
  getReports: (limit = 20) => api.get(`/reports?limit=${limit}`),
  getReportById: (id) => api.get(`/reports/${id}`),
};

// Analytics Service
export const analyticsService = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getTrends: () => api.get('/analytics/trends'),
};

// Contact Service
export const contactService = {
  submitContact: (contactData) => api.post('/contact', contactData),
};

export default api;
