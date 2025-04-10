
import React from "react";
import Navbar from "@/components/Navbar";
import SkyContainer from "@/components/SkyContainer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto py-8 px-4 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">Whimsical Sky Creator</h1>
          <p className="text-gray-600 mb-8 text-center">
            Create your own peaceful sky scene with clouds and birds.
          </p>
          
          <SkyContainer />
          
          <div className="mt-12 bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">How to use:</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Click the "Add Cloud" button to add a floating cloud to your sky</li>
              <li>Click the "Add Bird" button to add a flying bird to your sky</li>
              <li>Each element will float around with its own unique animation</li>
              <li>Counters below each button show the number of elements in local storage and API</li>
              <li>Your sky is automatically saved locally and to the connected API</li>
            </ul>
            
            <div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
              <h3 className="text-lg font-medium mb-2">API Configuration</h3>
              <p className="text-sm text-gray-600 mb-2">
                This application is designed to work with or without API connectivity. If the API is not available, elements will be stored in your browser's local storage.
              </p>
              <p className="text-sm text-gray-600">
                To configure your own API endpoints, update the URLs in <code className="bg-gray-100 px-1 py-0.5 rounded">src/config/api.config.ts</code>.
              </p>
            </div>
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

export default Index;
