
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
        // First check if we have elements in localStorage
        const savedElements = localStorage.getItem("skyElements");
        if (savedElements) {
          const parsedElements = JSON.parse(savedElements);
          setElements(parsedElements);
          updateLocalCounts(parsedElements);
          
          toast({
            title: "Sky loaded from local storage",
            description: "Your saved sky has been loaded from local storage.",
          });
          
          // Try to load from API in the background
          try {
            const apiElements = await SkyService.loadAllElements();
            if (apiElements.length > 0) {
              updateApiCounts(apiElements);
              toast({
                title: "API sync complete",
                description: "Your sky has been synchronized with the API.",
              });
            }
          } catch (apiError) {
            console.error("Error syncing with API:", apiError);
            toast({
              variant: "destructive",
              title: "API sync failed",
              description: "Could not connect to the API. Working in offline mode.",
            });
          }
        } else {
          // No local storage, try the API
          try {
            const loadedElements = await SkyService.loadAllElements();
            
            if (loadedElements.length > 0) {
              setElements(loadedElements);
              updateApiCounts(loadedElements);
              // Save to localStorage for offline use
              localStorage.setItem("skyElements", JSON.stringify(loadedElements));
              updateLocalCounts(loadedElements);
              
              toast({
                title: "Sky loaded from API",
                description: "Your saved sky has been loaded successfully!",
              });
            }
          } catch (apiError) {
            console.error("Error loading from API:", apiError);
            toast({
              variant: "destructive",
              title: "Cannot load from API",
              description: "Starting with an empty sky. Check your API configuration.",
            });
          }
        }
      } catch (error) {
        console.error("Error loading sky elements:", error);
        
        toast({
          variant: "destructive",
          title: "Error loading sky",
          description: "There was a problem loading your saved sky.",
        });
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
    try {
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
    } catch (error) {
      console.error("API save error:", error);
      toast({
        title: `Added ${type} (locally only)`,
        description: `A new ${type} has been added to your sky but failed to save to the API.`,
      });
    }
  };

  const clearSky = async () => {
    setIsLoading(true);
    
    // Clear local state first
    localStorage.removeItem("skyElements");
    setElements([]);
    setLocalCounts({ birds: 0, clouds: 0 });
    
    // Try to clear API
    try {
      const cleared = await SkyService.clearAllElements();
      
      if (cleared) {
        setApiCounts({ birds: 0, clouds: 0 });
        toast({
          title: "Sky cleared",
          description: "All elements have been removed from your sky and the API.",
        });
      } else {
        toast({
          title: "Sky cleared (locally only)",
          description: "All elements have been removed locally, but there was an error clearing the API data.",
        });
      }
    } catch (error) {
      console.error("Error clearing sky from API:", error);
      toast({
        title: "Sky cleared (locally only)",
        description: "All elements have been removed locally, but there was an error clearing the API data.",
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
