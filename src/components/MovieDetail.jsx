import React from "react";

const MovieDetail = ({ movie, onBack }) => {
  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto my-10 border border-gray-100">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            src={movie.poster} 
            alt={movie.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-8">
          <button onClick={onBack} className="text-blue-600 font-bold mb-4 flex items-center hover:underline">
             ← Back to Gallery
          </button>
          <h2 className="text-4xl font-black text-blue-900 mb-2">{movie.title}</h2>
          <div className="flex gap-4 items-center mb-6">
            <span className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-600 font-bold">{movie.year}</span>
            <span className="bg-blue-100 px-3 py-1 rounded text-sm text-blue-700 font-bold">{movie.genre}</span>
            <span className="text-yellow-500 font-bold text-xl">⭐ {movie.rating}</span>
          </div>
          
          <div className="mb-6">
             <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest mb-2">Director</h3>
             <p className="text-xl font-medium">{movie.director || "Not Specified"}</p>
          </div>

          <div className="mb-6">
             <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest mb-2">Synopsis</h3>
             <p className="text-gray-700 leading-relaxed text-lg">
                {movie.synopsis || "No detailed synopsis available for this movie yet. Stay tuned for more updates on this classic title."}
             </p>
          </div>

          <div className="mb-6">
             <h3 className="font-bold text-gray-400 uppercase text-xs tracking-widest mb-2">Cast</h3>
             <p className="text-gray-600">Leading Actors: To be announced</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
