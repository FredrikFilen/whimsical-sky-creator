
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Cloud from "./Cloud";
import Bird from "./Bird";
import { Button } from "@/components/ui/button";
import { Cloud as CloudIcon, Bird as BirdIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface SkyElement {
  id: string;
  type: "cloud" | "bird";
  position: { x: number; y: number };
  size: number;
  animationDelay: string;
}

const SkyContainer: React.FC = () => {
  const [elements, setElements] = useState<SkyElement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load existing elements from localStorage
    const loadSkyElements = async () => {
      setIsLoading(true);
      try {
        // Simulate API fetch delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Get data from localStorage
        const savedElements = localStorage.getItem("skyElements");
        if (savedElements) {
          setElements(JSON.parse(savedElements));
          toast({
            title: "Sky loaded",
            description: "Your saved sky has been loaded successfully!",
          });
        }
      } catch (error) {
        console.error("Error loading sky elements:", error);
        toast({
          title: "Error loading sky",
          description: "There was a problem loading your saved sky.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSkyElements();
  }, [toast]);

  useEffect(() => {
    // Save to localStorage whenever elements change
    const saveSkyElements = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 300));
        localStorage.setItem("skyElements", JSON.stringify(elements));
      } catch (error) {
        console.error("Error saving sky elements:", error);
      }
    };

    if (elements.length > 0) {
      saveSkyElements();
    }
  }, [elements]);

  const addElement = (type: "cloud" | "bird") => {
    // Generate random position within the container
    const position = {
      x: Math.floor(Math.random() * 80) + 5, // 5% to 85%
      y: Math.floor(Math.random() * 70) + 5, // 5% to 75%
    };

    // Random size between 1 and 2
    const size = Math.random() * 1 + 1;
    
    // Random animation delay
    const animationDelay = `${Math.random() * 10}s`;

    const newElement: SkyElement = {
      id: uuidv4(),
      type,
      position,
      size,
      animationDelay,
    };

    setElements((prev) => [...prev, newElement]);
    
    toast({
      title: `Added ${type}`,
      description: `A new ${type} has been added to your sky!`,
    });
  };

  const clearSky = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      localStorage.removeItem("skyElements");
      setElements([]);
      toast({
        title: "Sky cleared",
        description: "All elements have been removed from your sky.",
      });
    } catch (error) {
      console.error("Error clearing sky:", error);
      toast({
        title: "Error clearing sky",
        description: "There was a problem clearing your sky.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="w-full h-[500px] rounded-lg relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #87CEEB, #1E90FF)",
        }}
      >
        {/* Render clouds and birds */}
        {elements.map((element) => (
          element.type === "cloud" ? (
            <Cloud
              key={element.id}
              id={element.id}
              position={element.position}
              size={element.size}
              animationDelay={element.animationDelay}
            />
          ) : (
            <Bird
              key={element.id}
              id={element.id}
              position={element.position}
              size={element.size}
              animationDelay={element.animationDelay}
            />
          )
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        <Button 
          onClick={() => addElement("cloud")}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <CloudIcon size={18} />
          Add Cloud
        </Button>
        
        <Button 
          onClick={() => addElement("bird")}
          disabled={isLoading}
          className="flex items-center gap-2"
          variant="secondary"
        >
          <BirdIcon size={18} />
          Add Bird
        </Button>

        <Button 
          onClick={clearSky}
          disabled={isLoading}
          variant="outline"
        >
          Clear Sky
        </Button>
      </div>
    </div>
  );
};

export default SkyContainer;
