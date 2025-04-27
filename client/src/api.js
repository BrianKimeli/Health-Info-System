import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const login = async (credentials) => {
  try {
    console.log('Sending login request:', {
      username: credentials.username,
      password: '***' // Don't log actual password
    });
    
    const response = await api.post('/auth/login', {
      username: 'doctor',    // Hardcoded for testing
      password: 'test123'    // Hardcoded for testing
    });
    
    console.log('Login response:', {
      status: response.status,
      data: response.data
    });
    return response.data;
  } catch (error) {
    console.error('Full login error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
      message: error.message
    });
    throw error;
  }
};

export const getCurrentUser = () => api.get('/auth/me');

// Client endpoints
export const getClients = (query) => api.get(`/clients?q=${query}`);
export const getClient = (id) => api.get(`/clients/${id}`);
export const createClient = (client) => api.post('/clients', client);

// Program endpoints
export const getPrograms = () => api.get('/programs');
export const createProgram = (program) => api.post('/programs', program);

// Enrollment endpoints
export const enrollClient = (enrollment) => api.post('/enrollments', enrollment);