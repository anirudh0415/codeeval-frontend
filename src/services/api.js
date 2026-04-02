import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
};

export const problemService = {
    getAll: () => api.get('/problems'),
    getById: (id) => api.get(`/problems/${id}`),
    create: (problem) => api.post('/problems', problem),
    addTestCase: (id, testCase) => api.post(`/problems/${id}/testcases`, testCase),
};

export const submissionService = {
    submit: (submission) => api.post('/submissions', submission),
    getUserSubmissions: (userId) => api.get(`/submissions/user/${userId}`),
};

export const userService = {
    getProfile: (id) => api.get(`/users/${id}`),
    updateProfile: (id, data) => api.put(`/users/${id}`, data),
};

export default api;
