import React from "react";

const MovieCard = ({ movie, onSelect, onToggleWatchlist, isWatchlisted }) => {
  const getRatingColor = (rating) => {
    if (rating >= 8) return "bg-green-500";
    if (rating >= 5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="cursor-pointer" onClick={() => onSelect(movie)}>
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="w-full h-64 object-cover" 
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop";
          }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold truncate pr-2">{movie.title}</h3>
          <span className={`text-white px-2 py-1 rounded text-xs font-bold ${getRatingColor(movie.rating)}`}>
            {movie.rating}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{movie.genre} | {movie.year}</p>
        
        <button 
          onClick={() => onToggleWatchlist(movie)}
          className={`mt-auto w-full py-2 rounded font-bold transition-colors ${
            isWatchlisted ? "bg-red-100 text-red-600 border border-red-200" : "bg-blue-600 text-white"
          }`}
        >
          {isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
