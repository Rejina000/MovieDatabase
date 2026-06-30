import React from "react";

const MovieCard = ({ movie }) => {
  // Simple check for rating color
  const getRatingColor = (rating) => {
    if (rating >= 8) return "bg-green-500";
    if (rating >= 5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
      <img 
        src={movie.poster} 
        alt={movie.title} 
        className="w-full h-64 object-cover" 
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop";
        }}
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{movie.title}</h3>
          <span className={`text-white px-2 py-1 rounded text-xs ${getRatingColor(movie.rating)}`}>
            {movie.rating}
          </span>
        </div>
        <p className="text-gray-600 text-sm">{movie.genre} | {movie.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
