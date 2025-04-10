
import { apiConfig } from "@/config/api.config";
import { SkyElement, ApiResponse } from "./api.types";

export const CloudService = {
  /**
   * Fetch all clouds from the API
   */
  async getAllClouds(): Promise<SkyElement[]> {
    try {
      const response = await fetch(`${apiConfig.clouds.baseUrl}`, {
        method: "GET",
        headers: apiConfig.clouds.headers,
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching clouds: ${response.statusText}`);
      }
      
      const data: ApiResponse<SkyElement[]> = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || "Failed to fetch clouds");
      }
      
      return data.data || [];
    } catch (error) {
      console.error("Cloud API error:", error);
      // Return empty array as fallback
      return [];
    }
  },
  
  /**
   * Save clouds to the API
   */
  async saveClouds(clouds: SkyElement[]): Promise<boolean> {
    try {
      const response = await fetch(`${apiConfig.clouds.baseUrl}`, {
        method: "POST",
        headers: apiConfig.clouds.headers,
        body: JSON.stringify({ clouds }),
      });
      
      if (!response.ok) {
        throw new Error(`Error saving clouds: ${response.statusText}`);
      }
      
      const data: ApiResponse<any> = await response.json();
      
      return data.success;
    } catch (error) {
      console.error("Cloud API error:", error);
      return false;
    }
  },
  
  /**
   * Clear all clouds from the API
   */
  async clearClouds(): Promise<boolean> {
    try {
      const response = await fetch(`${apiConfig.clouds.baseUrl}/clear`, {
        method: "DELETE",
        headers: apiConfig.clouds.headers,
      });
      
      if (!response.ok) {
        throw new Error(`Error clearing clouds: ${response.statusText}`);
      }
      
      const data: ApiResponse<any> = await response.json();
      
      return data.success;
    } catch (error) {
      console.error("Cloud API error:", error);
      return false;
    }
  }
};
