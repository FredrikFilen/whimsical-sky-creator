
// Common type for Sky elements
export interface SkyElement {
  id: string;
  type: "cloud" | "bird";
  position: { x: number; y: number };
  size: number;
  animationDelay: string;
}

// Response type for successful API operations
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
