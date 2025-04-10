
import React from "react";
import { cn } from "@/lib/utils";

interface CloudProps {
  id: string;
  position: { x: number; y: number };
  size: number;
  animationDelay: string;
}

const Cloud: React.FC<CloudProps> = ({ id, position, size, animationDelay }) => {
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
            width: `${size * 40}px`,
            height: `${size * 40}px`,
          }}
        ></div>
        <div
          className={cn(
            "bg-white rounded-full shadow-lg absolute",
            "opacity-90"
          )}
          style={{
            width: `${size * 60}px`,
            height: `${size * 60}px`,
            left: `${size * 20}px`,
            top: `${-size * 10}px`,
          }}
        ></div>
        <div
          className={cn(
            "bg-white rounded-full shadow-lg absolute",
            "opacity-90"
          )}
          style={{
            width: `${size * 50}px`,
            height: `${size * 50}px`,
            left: `${size * 50}px`,
            top: `${size * 0}px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Cloud;
