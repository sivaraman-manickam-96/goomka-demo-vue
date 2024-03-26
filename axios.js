// axios.js

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_URL, // Replace with your API base URL
});

// Add a request interceptor to include the authorization token in the headers
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
