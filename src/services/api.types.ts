
// Common type for Sky elements
export interface SkyElement {
  id: string;
  type: "cloud" | "bird";
  position: { x: number; y: number };
  size: number;
  animationDelay: string;
}

// Bird specific properties
export interface Bird extends SkyElement {
  type: "bird";
  color: string;
}

// Cloud specific properties
export interface Cloud extends SkyElement {
  type: "cloud";
  cloudSize: "small" | "medium" | "large";
}

// Response type for successful API operations
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
