/**
 * API Utility Functions
 * 
 * @module apiUtils
 * @description Utility functions related to API operations
 */

/**
 * Get the base URL for API requests from environment variables
 * Falls back to localhost if environment variable is not set
 * 
 * @returns {string} The base URL for API requests
 */
export const getApiBaseUrl = (): string => import.meta.env.VITE_API_URL || 'http://localhost:3000/api';