import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Movie App</h1>
      <div className="space-x-4">
        <a href="#" className="hover:underline">Browse</a>
        <a href="#" className="hover:underline">Watchlist</a>
        <a href="#" className="hover:underline">Add Movie</a>
      </div>
    </nav>
  );
};

export default Navbar;
