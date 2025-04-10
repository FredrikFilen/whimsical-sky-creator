
import React from "react";
import { cn } from "@/lib/utils";

interface BirdProps {
  id: string;
  position: { x: number; y: number };
  size: number;
  animationDelay: string;
  color: string;
}

const Bird: React.FC<BirdProps> = ({ id, position, size, animationDelay, color }) => {
  return (
    <div
      className="absolute fly-animation"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animationDelay,
      }}
      data-id={id}
    >
      <div 
        className={cn(
          "text-black"
        )}
        style={{
          fontSize: `${size * 24}px`
        }}
      >
        {/* Simple bird icon using SVG */}
        <div className="relative">
          <svg
            width={size * 30}
            height={size * 20}
            viewBox="0 0 30 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2,14 Q10,8 15,14 Q20,8 28,14 L26,11 L28,14 L26,17 M15,14 L13,18"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Bird;
