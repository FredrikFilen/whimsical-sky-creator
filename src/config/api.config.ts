
/**
 * API Configuration
 * 
 * This file contains the configuration for the Bird and Cloud APIs.
 * Using absolute URLs to connect to the remote API server.
 */

export const apiConfig = {
  birds: {
    baseUrl: "http://172.232.137.49/birds", // Using absolute URL to your API server
    headers: {
      "Content-Type": "application/json",
      // Add any API keys or authentication headers here
      // "Authorization": "Bearer YOUR_API_KEY"
    }
  },
  clouds: {
    baseUrl: "http://172.232.137.49/clouds", // Using absolute URL to your API server
    headers: {
      "Content-Type": "application/json",
      // Add any API keys or authentication headers here
      // "Authorization": "Bearer YOUR_API_KEY"
    }
  }
};
