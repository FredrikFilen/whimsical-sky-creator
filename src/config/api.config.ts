
/**
 * API Configuration
 * 
 * This file contains the configuration for the Bird and Cloud APIs.
 * Using relative URLs to avoid CORS issues.
 */

export const apiConfig = {
  birds: {
    baseUrl: "/api/birds", // Using relative URL to avoid CORS issues
    headers: {
      "Content-Type": "application/json",
      // Add any API keys or authentication headers here
      // "Authorization": "Bearer YOUR_API_KEY"
    }
  },
  clouds: {
    baseUrl: "/api/clouds", // Using relative URL to avoid CORS issues
    headers: {
      "Content-Type": "application/json",
      // Add any API keys or authentication headers here
      // "Authorization": "Bearer YOUR_API_KEY"
    }
  }
};
