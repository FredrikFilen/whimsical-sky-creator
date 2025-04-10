
import React from "react";
import { Cloud } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Cloud className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-primary">SkyCreator</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/gallery" className="text-gray-600 hover:text-primary transition-colors">
            Gallery
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
