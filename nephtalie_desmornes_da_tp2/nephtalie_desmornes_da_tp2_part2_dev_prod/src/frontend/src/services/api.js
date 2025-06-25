import axios from 'axios';

// Create a base API instance
const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor for authentication
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// API service methods
export default {
  // Authentication
  auth: {
    login: (credentials) => api.post('/login', credentials),
    register: (userData) => api.post('/register', userData),
    logout: () => api.post('/logout')
  },
  
  // Courses
  courses: {
    getAll: (params) => api.get('/courses', { params }),
    getById: (id) => api.get(`/courses/${id}`),
    getFeatured: () => api.get('/courses/featured')
  },
  
  // Dance Styles
  styles: {
    getAll: () => api.get('/styles'),
    getById: (id) => api.get(`/styles/${id}`),
    getCoursesByStyle: (styleId) => api.get(`/styles/${styleId}/courses`)
  },
  
  // Teachers
  teachers: {
    getAll: (params) => api.get('/teachers', { params }),
    getById: (id) => api.get(`/teachers/${id}`),
    getFeatured: () => api.get('/teachers/featured')
  },
  
  // Testimonials
  testimonials: {
    getAll: () => api.get('/testimonials')
  },
  
  // FAQ
  faq: {
    getAll: () => api.get('/faq')
  }
};