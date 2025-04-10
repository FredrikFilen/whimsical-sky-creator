
import React from "react";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto py-8 px-4 flex-1">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About Sky Creator</h1>
          <div className="prose prose-blue max-w-none">
            <p className="mb-4">
              Sky Creator is a fun interactive web application that allows you to create your own peaceful sky scenes by adding clouds and birds with simple button clicks.
            </p>
            <p className="mb-4">
              Each element you add has its own unique animation pattern, creating a soothing and dynamic sky scene. The application demonstrates modern web animation techniques and state management.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-3">Features</h2>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>Add clouds with realistic floating animations</li>
              <li>Add birds with natural flying patterns</li>
              <li>Automatic saving of your sky creations</li>
              <li>Simple and intuitive user interface</li>
            </ul>
            <h2 className="text-xl font-semibold mt-6 mb-3">Technical Details</h2>
            <p>
              This application is built using modern web technologies including React, TypeScript, and Tailwind CSS. The animations are created using CSS keyframes, and the state management is handled with React hooks.
            </p>
            <p className="mt-4">
              The application simulates a REST API by using the browser's localStorage for persistence, but could easily be extended to use a real backend service.
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

export default About;
