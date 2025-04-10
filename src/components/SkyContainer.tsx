import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import Cloud from "./Cloud";
import Bird from "./Bird";
import { Button } from "@/components/ui/button";
import { Cloud as CloudIcon, Bird as BirdIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { SkyService } from "@/services/sky.service";
import { SkyElement, Bird as BirdType, Cloud as CloudType } from "@/services/api.types";
import { apiConfig } from "@/config/api.config";
import { getRandomBirdColor, getRandomCloudSize } from "@/utils/colorUtils";

const SkyContainer: React.FC = () => {
  const [elements, setElements] = useState<SkyElement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadSkyElements = async () => {
      setIsLoading(true);
      try {
        const loadedElements = await SkyService.loadAllElements();
        
        if (loadedElements.length > 0) {
          setElements(loadedElements);
          toast({
            title: "Sky loaded",
            description: "Your saved sky has been loaded successfully!",
          });
        } else {
          const savedElements = localStorage.getItem("skyElements");
          if (savedElements) {
            const parsedElements = JSON.parse(savedElements);
            setElements(parsedElements);
            
            await SkyService.saveAllElements(parsedElements);
            
            toast({
              title: "Sky loaded from local storage",
              description: "Your saved sky has been loaded from local storage and synced to the API.",
            });
          }
        }
      } catch (error) {
        console.error("Error loading sky elements:", error);
        toast({
          title: "Error loading sky",
          description: `There was a problem loading your saved sky from API: ${apiConfig.birds.baseUrl} and ${apiConfig.clouds.baseUrl}`,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSkyElements();
  }, [toast]);

  useEffect(() => {
    const saveSkyElements = async () => {
      if (elements.length > 0) {
        try {
          const saved = await SkyService.saveAllElements(elements);
          if (!saved) {
            localStorage.setItem("skyElements", JSON.stringify(elements));
            console.warn("Saved to localStorage as API save failed");
          }
        } catch (error) {
          console.error("Error saving sky elements:", error);
          localStorage.setItem("skyElements", JSON.stringify(elements));
        }
      }
    };

    if (elements.length > 0) {
      saveSkyElements();
    }
  }, [elements]);

  const addElement = async (type: "cloud" | "bird") => {
    const position = {
      x: Math.floor(Math.random() * 80) + 5,
      y: Math.floor(Math.random() * 70) + 5,
    };

    const size = Math.random() * 1 + 1;
    const animationDelay = `${Math.random() * 10}s`;

    let newElement: SkyElement;

    if (type === "bird") {
      newElement = {
        id: uuidv4(),
        type,
        position,
        size,
        animationDelay,
        color: getRandomBirdColor(),
      } as BirdType;
    } else {
      newElement = {
        id: uuidv4(),
        type,
        position,
        size,
        animationDelay,
        cloudSize: getRandomCloudSize(),
      } as CloudType;
    }

    setElements((prev) => [...prev, newElement]);
    
    const added = await SkyService.addElement(newElement);
    
    if (added) {
      toast({
        title: `Added ${type}`,
        description: `A new ${type} has been added to your sky and saved to the API!`,
      });
    } else {
      toast({
        title: `Added ${type} (locally only)`,
        description: `A new ${type} has been added to your sky but failed to save to the API.`,
      });
    }
  };

  const clearSky = async () => {
    setIsLoading(true);
    try {
      const cleared = await SkyService.clearAllElements();
      
      if (cleared) {
        localStorage.removeItem("skyElements");
        setElements([]);
        toast({
          title: "Sky cleared",
          description: "All elements have been removed from your sky and the API.",
        });
      } else {
        throw new Error("Failed to clear elements from API");
      }
    } catch (error) {
      console.error("Error clearing sky:", error);
      localStorage.removeItem("skyElements");
      setElements([]);
      toast({
        title: "Sky cleared (locally only)",
        description: "All elements have been removed from your sky locally, but there was an error clearing the API data.",
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
        {elements.map((element) => (
          element.type === "cloud" ? (
            <Cloud
              key={element.id}
              id={element.id}
              position={element.position}
              size={element.size}
              animationDelay={element.animationDelay}
              cloudSize={(element as CloudType).cloudSize || "medium"}
            />
          ) : (
            <Bird
              key={element.id}
              id={element.id}
              position={element.position}
              size={element.size}
              animationDelay={element.animationDelay}
              color={(element as BirdType).color || "#000000"}
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
