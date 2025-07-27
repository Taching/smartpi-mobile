import Api from "../services/api";

// Default configuration - update these values for your Raspberry Pi
export const API_CONFIG = {
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.EXPO_PUBLIC_API_KEY,
  },
};

// Create API instance
export const apiClient = new Api(API_CONFIG);
