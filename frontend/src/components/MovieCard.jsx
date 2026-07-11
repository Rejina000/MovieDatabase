import React from "react";

const MovieCard = ({ movie, onClick, onToggleWatchlist, isWatchlisted }) => {
  const getRatingColor = (rating) => {
    if (rating >= 8) return "bg-green-500";
    if (rating >= 5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div 
      onClick={() => onClick(movie)}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 border border-gray-100 overflow-hidden transition-all duration-300 h-full cursor-pointer group"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-gray-200">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop";
          }}
        />
        <div className="absolute top-3 right-3">
          <span className={`text-white px-2 py-1 rounded shadow-md text-xs font-bold ${getRatingColor(movie.rating)}`}>
            {movie.rating} ★
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold truncate pr-2 text-gray-800">{movie.title}</h3>
        </div>
        <p className="text-gray-500 text-sm mb-5">{movie.genre} | {movie.year}</p>

        {/* Watchlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening detail view when clicking button
            onToggleWatchlist(movie);
          }}
          className={`w-full py-2.5 rounded-xl font-bold transition-all duration-200 ${
            isWatchlisted 
              ? "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100" 
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md"
          }`}
        >
          {isWatchlisted ? "Remove from Watch Later" : "Add to Watch Later"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;