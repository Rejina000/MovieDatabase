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
      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 h-full cursor-pointer group"
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-64 object-cover transform group-hover:scale-110 group-hover:brightness-90 transition-transform duration-500"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop";
        }}
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{movie.title}</h3>
          <span className={`text-white px-2 py-1 rounded text-xs font-bold ${getRatingColor(movie.rating)}`}>
            {movie.rating}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{movie.genre} | {movie.year}</p>

        {/* Watchlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent opening detail view when clicking button
            onToggleWatchlist(movie);
          }}
          className={`w-full py-2 rounded-lg font-bold transition-colors ${
            isWatchlisted 
              ? "bg-red-100 text-red-600 border border-red-200" 
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isWatchlisted ? "Remove from Watch Later" : "Add to Watch Later"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;