
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
import { Badge } from "@/components/ui/badge";

const SkyContainer: React.FC = () => {
  const [elements, setElements] = useState<SkyElement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiCounts, setApiCounts] = useState({ birds: 0, clouds: 0 });
  const [localCounts, setLocalCounts] = useState({ birds: 0, clouds: 0 });
  const { toast } = useToast();

  useEffect(() => {
    const loadSkyElements = async () => {
      setIsLoading(true);
      try {
        const loadedElements = await SkyService.loadAllElements();
        
        if (loadedElements.length > 0) {
          setElements(loadedElements);
          updateApiCounts(loadedElements);
          toast({
            title: "Sky loaded",
            description: "Your saved sky has been loaded successfully!",
          });
        } else {
          const savedElements = localStorage.getItem("skyElements");
          if (savedElements) {
            const parsedElements = JSON.parse(savedElements);
            setElements(parsedElements);
            updateLocalCounts(parsedElements);
            
            await SkyService.saveAllElements(parsedElements);
            updateApiCounts(parsedElements);
            
            toast({
              title: "Sky loaded from local storage",
              description: "Your saved sky has been loaded from local storage and synced to the API.",
            });
          }
        }
      } catch (error) {
        console.error("Error loading sky elements:", error);
        
        // Try to load from localStorage as fallback
        const savedElements = localStorage.getItem("skyElements");
        if (savedElements) {
          const parsedElements = JSON.parse(savedElements);
          setElements(parsedElements);
          updateLocalCounts(parsedElements);
          
          toast({
            title: "Sky loaded from local storage",
            description: "There was a problem loading from the API, so we loaded from local storage.",
          });
        } else {
          toast({
            title: "Error loading sky",
            description: `There was a problem loading your saved sky from API: ${apiConfig.birds.baseUrl} and ${apiConfig.clouds.baseUrl}`,
            variant: "destructive",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadSkyElements();
  }, [toast]);

  // Update counts whenever elements change
  useEffect(() => {
    if (elements.length > 0) {
      // Update local counts
      updateLocalCounts(elements);
      
      // Save to localStorage
      localStorage.setItem("skyElements", JSON.stringify(elements));
    }
  }, [elements]);

  // Update API and local counts
  const updateApiCounts = (elements: SkyElement[]) => {
    const birds = elements.filter(element => element.type === "bird").length;
    const clouds = elements.filter(element => element.type === "cloud").length;
    setApiCounts({ birds, clouds });
  };

  const updateLocalCounts = (elements: SkyElement[]) => {
    const birds = elements.filter(element => element.type === "bird").length;
    const clouds = elements.filter(element => element.type === "cloud").length;
    setLocalCounts({ birds, clouds });
  };

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

    // Update local state immediately
    const updatedElements = [...elements, newElement];
    setElements(updatedElements);
    updateLocalCounts(updatedElements);
    
    // Try to save to API
    const added = await SkyService.addElement(newElement);
    
    if (added) {
      // Update API counts if successful
      updateApiCounts(updatedElements);
      
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
        setApiCounts({ birds: 0, clouds: 0 });
        setLocalCounts({ birds: 0, clouds: 0 });
        
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
      setLocalCounts({ birds: 0, clouds: 0 });
      
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

      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        <div className="flex flex-col items-center">
          <Button 
            onClick={() => addElement("cloud")}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <CloudIcon size={18} />
            Add Cloud
          </Button>
          <div className="flex gap-2 mt-2 text-sm">
            <Badge variant="outline" className="flex gap-1">
              Local: {localCounts.clouds}
            </Badge>
            <Badge variant="secondary" className="flex gap-1">
              API: {apiCounts.clouds}
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <Button 
            onClick={() => addElement("bird")}
            disabled={isLoading}
            className="flex items-center gap-2"
            variant="secondary"
          >
            <BirdIcon size={18} />
            Add Bird
          </Button>
          <div className="flex gap-2 mt-2 text-sm">
            <Badge variant="outline" className="flex gap-1">
              Local: {localCounts.birds}
            </Badge>
            <Badge variant="secondary" className="flex gap-1">
              API: {apiCounts.birds}
            </Badge>
          </div>
        </div>

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
