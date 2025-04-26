import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
});

// Clients endpoints
export const getClients = (query) => api.get(`/clients?q=${query}`);
export const createClient = (client) => api.post('/clients', client); // Make sure this exists
export const getClient = (id) => api.get(`/clients/${id}`);  

// Programs endpoints
export const getPrograms = () => api.get('/programs');
export const createProgram = (program) => api.post('/programs', program);

// Enrollments endpoints
export const enrollClient = (enrollment) => api.post('/enrollments', enrollment);