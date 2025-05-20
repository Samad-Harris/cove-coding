/**
 * Axios HTTP client for API requests
 * 
 * @module axiosClient
 * @description Configures and exports a pre-configured Axios instance for making API requests
 * with common configurations and interceptors for error handling
 */
import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Default configuration for the Axios instance
 * 
 * @remarks
 * Sets common headers, timeout, and base URL for all requests
 */
const config: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
};

/**
 * Create and configure the Axios instance
 * 
 * @remarks
 * This instance is configured with the default settings and will be extended with interceptors
 */
const axiosClient: AxiosInstance = axios.create(config);

/**
 * Request interceptor
 * Intercepts all outgoing requests before they are sent
 * 
 * @remarks
 * TODO: Add authentication logic here when ready to implement auth
 */
axiosClient.interceptors.request.use(
    (config) => {
        // Config passed through without modification for now
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor
 * Intercepts all responses after they are received
 * 
 * @remarks
 * Handles common error patterns and provides consistent error logging
 */
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        // Handle common errors here
        if (error.response) {
            // The request was made and the server responded with an error status code
            console.error('API Error:', error.response.status, error.response.data);
            
            // TODO: Add authentication handling when auth is implemented
            // For now, we'll just log the errors
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Network Error:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Request Error:', error.message);
        }
        return Promise.reject(error);
    }
);

/**
 * Export the configured Axios instance for use throughout the application
 * 
 * @example
 * ```typescript
 * import axiosClient from './axiosClient';
 * 
 * // Make a GET request
 * const response = await axiosClient.get('/endpoint');
 * 
 * // Make a POST request with data
 * const response = await axiosClient.post('/endpoint', { data: 'value' });
 * ```
 */
export default axiosClient;