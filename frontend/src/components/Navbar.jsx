import React from "react";

const Navbar = ({ onAddClick, showForm, onBrowse, onWatchlist, isWatchlistView, user, onLogin, onLogout }) => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <h1 className="text-xl font-black tracking-tighter cursor-pointer" onClick={onBrowse}>MOVIE APP</h1>

      <div className="flex items-center gap-6">
        {user && <div className="hidden md:flex space-x-6 font-medium">
          <button 
            onClick={onBrowse} 
            className={`hover:text-blue-200 transition-colors ${!isWatchlistView && !showForm ? "text-white font-bold border-b-2 border-white" : "text-blue-100"}`}
          >
            Browse
          </button>
          <button 
            onClick={onWatchlist} 
            className={`hover:text-blue-200 transition-colors ${isWatchlistView ? "text-white font-bold border-b-2 border-white" : "text-blue-100"}`}
          >
            Watch Later
          </button>
        </div>}

        {user && <button
          onClick={onAddClick}
          className={`${showForm ? "bg-red-500 hover:bg-red-600" : "bg-white text-blue-600 hover:bg-blue-50"
            } px-4 py-1.5 rounded-lg font-bold transition-all shadow-sm text-sm`}
        >
          {showForm ? "Close Form" : "+ Add Movie"}
        </button>}
        {user ? (
          <>
            <div className="flex items-center gap-2 bg-white/10 rounded-full pl-1.5 pr-3 py-1.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-black uppercase shadow-sm">
                {user.username?.charAt(0) || "U"}
              </div>
              <div className="leading-tight text-left hidden sm:block">
                <p className="text-xs font-bold text-white truncate max-w-[120px]">{user.username}</p>
                <p className="text-[10px] text-blue-100 truncate max-w-[140px]">{user.email}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="rounded-lg border border-blue-300 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-blue-700"
            >
              Log out
            </button>
          </>
        ) : (
          <button
            onClick={onLogin}
            className="rounded-lg border border-blue-300 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
