
import { apiConfig } from "@/config/api.config";
import { SkyElement, ApiResponse } from "./api.types";

export const BirdService = {
  /**
   * Fetch all birds from the API
   */
  async getAllBirds(): Promise<SkyElement[]> {
    try {
      const response = await fetch(`${apiConfig.birds.baseUrl}`, {
        method: "GET",
        headers: apiConfig.birds.headers,
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching birds: ${response.statusText}`);
      }
      
      const data: ApiResponse<SkyElement[]> = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || "Failed to fetch birds");
      }
      
      return data.data || [];
    } catch (error) {
      console.error("Bird API error:", error);
      // Return empty array as fallback
      return [];
    }
  },
  
  /**
   * Save birds to the API
   */
  async saveBirds(birds: SkyElement[]): Promise<boolean> {
    try {
      const response = await fetch(`${apiConfig.birds.baseUrl}`, {
        method: "POST",
        headers: apiConfig.birds.headers,
        body: JSON.stringify({ birds }),
      });
      
      if (!response.ok) {
        throw new Error(`Error saving birds: ${response.statusText}`);
      }
      
      const data: ApiResponse<any> = await response.json();
      
      return data.success;
    } catch (error) {
      console.error("Bird API error:", error);
      return false;
    }
  },
  
  /**
   * Clear all birds from the API
   */
  async clearBirds(): Promise<boolean> {
    try {
      const response = await fetch(`${apiConfig.birds.baseUrl}/clear`, {
        method: "DELETE",
        headers: apiConfig.birds.headers,
      });
      
      if (!response.ok) {
        throw new Error(`Error clearing birds: ${response.statusText}`);
      }
      
      const data: ApiResponse<any> = await response.json();
      
      return data.success;
    } catch (error) {
      console.error("Bird API error:", error);
      return false;
    }
  }
};
