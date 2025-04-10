
/**
 * API Configuration
 * 
 * This file contains the configuration for the Bird and Cloud APIs.
 * Update these endpoints to point to your actual API servers.
 */

export const apiConfig = {
  birds: {
    baseUrl: "https://api.example.com/birds", // Replace with your actual Bird API endpoint
    headers: {
      "Content-Type": "application/json",
      // Add any API keys or authentication headers here
      // "Authorization": "Bearer YOUR_API_KEY"
    }
  },
  clouds: {
    baseUrl: "https://api.example.com/clouds", // Replace with your actual Cloud API endpoint
    headers: {
      "Content-Type": "application/json",
      // Add any API keys or authentication headers here
      // "Authorization": "Bearer YOUR_API_KEY"
    }
  }
};
