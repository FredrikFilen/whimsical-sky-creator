
import React from "react";
import { cn } from "@/lib/utils";

interface CloudProps {
  id: string;
  position: { x: number; y: number };
  size: number;
  animationDelay: string;
  cloudSize: "small" | "medium" | "large";
}

const Cloud: React.FC<CloudProps> = ({ id, position, size, animationDelay, cloudSize }) => {
  // Scale based on cloud size category
  const sizeMultiplier = 
    cloudSize === "small" ? 0.7 :
    cloudSize === "large" ? 1.3 : 
    1; // medium is the default
    
  return (
    <div
      className={cn("absolute float-animation")}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animationDelay,
      }}
      data-id={id}
    >
      <div className="relative">
        <div
          className={cn(
            "bg-white rounded-full shadow-lg absolute",
            "opacity-90"
          )}
          style={{
            width: `${size * 40 * sizeMultiplier}px`,
            height: `${size * 40 * sizeMultiplier}px`,
          }}
        ></div>
        <div
          className={cn(
            "bg-white rounded-full shadow-lg absolute",
            "opacity-90"
          )}
          style={{
            width: `${size * 60 * sizeMultiplier}px`,
            height: `${size * 60 * sizeMultiplier}px`,
            left: `${size * 20 * sizeMultiplier}px`,
            top: `${-size * 10 * sizeMultiplier}px`,
          }}
        ></div>
        <div
          className={cn(
            "bg-white rounded-full shadow-lg absolute",
            "opacity-90"
          )}
          style={{
            width: `${size * 50 * sizeMultiplier}px`,
            height: `${size * 50 * sizeMultiplier}px`,
            left: `${size * 50 * sizeMultiplier}px`,
            top: `${size * 0 * sizeMultiplier}px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Cloud;
