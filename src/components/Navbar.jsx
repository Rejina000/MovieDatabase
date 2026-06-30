import React from "react";

const Navbar = ({ onAddClick, showForm }) => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <h1 className="text-xl font-black tracking-tighter">MOVIE APP</h1>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex space-x-4 font-medium">
          <a href="#" className="hover:text-blue-200 transition-colors">Browse</a>
          <a href="#" className="hover:text-blue-200 transition-colors">Watchlist</a>
        </div>
        
        <button 
          onClick={onAddClick}
          className={`${
            showForm ? "bg-red-500 hover:bg-red-600" : "bg-white text-blue-600 hover:bg-blue-50"
          } px-4 py-1.5 rounded-lg font-bold transition-all shadow-sm text-sm`}
        >
          {showForm ? "Close Form" : "+ Add Movie"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
