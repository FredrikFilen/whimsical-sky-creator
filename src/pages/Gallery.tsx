
import React from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto py-8 px-4 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">Sky Gallery</h1>
          <p className="text-gray-600 mb-8 text-center">
            A collection of beautiful skies created by our community.
          </p>
          
          {/* Gallery placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div 
                  className="h-48 w-full"
                  style={{
                    background: i % 2 === 0 
                      ? "linear-gradient(to bottom, #87CEEB, #1E90FF)" 
                      : "linear-gradient(to bottom, #ADD8E6, #4682B4)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  {/* Placeholder clouds */}
                  <div className="absolute w-16 h-16 bg-white/90 rounded-full left-[20%] top-[30%]"></div>
                  <div className="absolute w-24 h-24 bg-white/90 rounded-full left-[35%] top-[25%]"></div>
                  <div className="absolute w-20 h-20 bg-white/90 rounded-full left-[50%] top-[40%]"></div>
                  
                  {/* Placeholder birds */}
                  {i % 2 === 0 && (
                    <>
                      <div className="absolute left-[25%] top-[60%]">
                        <svg width="30" height="20" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2,14 Q10,8 15,14 Q20,8 28,14 L26,11 L28,14 L26,17 M15,14 L13,18" stroke="black" strokeWidth="2" fill="none"/>
                        </svg>
                      </div>
                      <div className="absolute left-[65%] top-[50%]">
                        <svg width="20" height="15" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2,14 Q10,8 15,14 Q20,8 28,14 L26,11 L28,14 L26,17 M15,14 L13,18" stroke="black" strokeWidth="2" fill="none"/>
                        </svg>
                      </div>
                    </>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium">Sky Scene {i}</h3>
                  <p className="text-sm text-gray-500">Created by User {i}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-400">2 days ago</span>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-gray-500 italic mb-2">Coming Soon</p>
            <p className="text-sm text-gray-400">
              The gallery feature is currently under development.
              <br />Soon you'll be able to save your creations and view others' skies!
            </p>
          </div>
        </div>
      </main>
      <footer className="bg-gray-50 py-6 mt-auto">
        <div className="container mx-auto text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Whimsical Sky Creator. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Gallery;
