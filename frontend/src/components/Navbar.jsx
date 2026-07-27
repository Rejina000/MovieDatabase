import React from "react";

const Navbar = ({
  onAddClick,
  showForm,
  onBrowse,
  onWatchlist,
  isWatchlistView,
  user,
  onAuthClick,
  onLogout,
  showAuthForm
}) => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <h1 className="text-xl font-black tracking-tighter cursor-pointer" onClick={onBrowse}>MOVIE APP</h1>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex space-x-6 font-medium">
          <button 
            onClick={onBrowse} 
            className={`hover:text-blue-200 transition-colors cursor-pointer ${!isWatchlistView && !showForm && !showAuthForm ? "text-white font-bold border-b-2 border-white" : "text-blue-100"}`}
          >
            Browse
          </button>
          <button 
            onClick={onWatchlist} 
            className={`hover:text-blue-200 transition-colors cursor-pointer ${isWatchlistView ? "text-white font-bold border-b-2 border-white" : "text-blue-100"}`}
          >
            Watch Later
          </button>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:inline-block text-sm font-semibold bg-blue-700 px-3 py-1.5 rounded-lg border border-blue-500/30">
                Hi, {user.username}
              </span>
              <button
                onClick={onAddClick}
                className={`${showForm ? "bg-red-500 hover:bg-red-600" : "bg-white text-blue-600 hover:bg-blue-50"
                  } px-4 py-1.5 rounded-lg font-bold transition-all shadow-sm text-sm cursor-pointer`}
              >
                {showForm ? "Close Form" : "+ Add Movie"}
              </button>
              <button
                onClick={onLogout}
                className="bg-blue-800 hover:bg-blue-700 text-white px-3 py-1.5 border border-blue-500/40 rounded-lg text-sm font-bold transition-all cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={onAuthClick}
              className={`${showAuthForm ? "bg-blue-700 border border-blue-500/40" : "bg-white text-blue-600 hover:bg-blue-50"
                } px-4 py-1.5 rounded-lg font-bold transition-all shadow-sm text-sm cursor-pointer`}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
