
import { SkyElement } from "./api.types";
import { BirdService } from "./birds.service";
import { CloudService } from "./clouds.service";

export const SkyService = {
  /**
   * Load all sky elements from both APIs
   */
  async loadAllElements(): Promise<SkyElement[]> {
    try {
      // Load birds and clouds in parallel
      const [birds, clouds] = await Promise.all([
        BirdService.getAllBirds(),
        CloudService.getAllClouds()
      ]);
      
      // Combine both arrays
      return [...birds, ...clouds];
    } catch (error) {
      console.error("Sky service error:", error);
      return [];
    }
  },
  
  /**
   * Save all sky elements to their respective APIs
   */
  async saveAllElements(elements: SkyElement[]): Promise<boolean> {
    try {
      // Separate birds and clouds
      const birds = elements.filter(element => element.type === "bird");
      const clouds = elements.filter(element => element.type === "cloud");
      
      // Save birds and clouds in parallel
      const [birdsSaved, cloudsSaved] = await Promise.all([
        BirdService.saveBirds(birds),
        CloudService.saveClouds(clouds)
      ]);
      
      // Return true only if both operations succeeded
      return birdsSaved && cloudsSaved;
    } catch (error) {
      console.error("Sky service error:", error);
      return false;
    }
  },
  
  /**
   * Clear all sky elements from both APIs
   */
  async clearAllElements(): Promise<boolean> {
    try {
      // Clear birds and clouds in parallel
      const [birdsCleared, cloudsCleared] = await Promise.all([
        BirdService.clearBirds(),
        CloudService.clearClouds()
      ]);
      
      // Return true only if both operations succeeded
      return birdsCleared && cloudsCleared;
    } catch (error) {
      console.error("Sky service error:", error);
      return false;
    }
  },
  
  /**
   * Add a single element to the appropriate API
   */
  async addElement(element: SkyElement): Promise<boolean> {
    try {
      if (element.type === "bird") {
        // For a single bird, fetch existing birds first
        const birds = await BirdService.getAllBirds();
        return BirdService.saveBirds([...birds, element]);
      } else {
        // For a single cloud, fetch existing clouds first
        const clouds = await CloudService.getAllClouds();
        return CloudService.saveClouds([...clouds, element]);
      }
    } catch (error) {
      console.error("Sky service error:", error);
      return false;
    }
  }
};
