
// Array of bird colors
const birdColors = [
  "#1EAEDB", // Bright Blue
  "#8B5CF6", // Vivid Purple
  "#D946EF", // Magenta Pink
  "#F97316", // Bright Orange
  "#0EA5E9", // Ocean Blue
  "#D946EF", // Vivid Pink
  "#22C55E", // Green
  "#EF4444", // Red
  "#F97316", // Orange
  "#FACC15", // Yellow
  "#06B6D4", // Cyan
  "#8B5CF6", // Purple
];

/**
 * Generates a random color for birds
 */
export const getRandomBirdColor = (): string => {
  const randomIndex = Math.floor(Math.random() * birdColors.length);
  return birdColors[randomIndex];
};

/**
 * Generates a random cloud size
 */
export const getRandomCloudSize = (): "small" | "medium" | "large" => {
  const sizes: Array<"small" | "medium" | "large"> = ["small", "medium", "large"];
  const randomIndex = Math.floor(Math.random() * sizes.length);
  return sizes[randomIndex];
};
