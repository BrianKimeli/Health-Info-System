import axios from 'axios';

const api = axios.create({
  baseURL: 'https://health-info-system-fv7s.onrender.com/api',
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const getCurrentUser = () => api.get('https://health-info-system-fv7s.onrender.com/api/auth/me'); // Updated endpoint

// Client endpoints
export const getClients = (query) => api.get(`/clients?q=${query}`);
export const getClient = (id) => api.get(`/clients/${id}`);
export const createClient = (client) => api.post('/clients', client);

// Program endpoints
export const getPrograms = () => api.get('/programs');
export const createProgram = (program) => api.post('/programs', program);

// Enrollment endpoints
export const enrollClient = (enrollment) => api.post('/enrollments', enrollment);