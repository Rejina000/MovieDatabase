import React from "react";

const MovieDetail = ({ movie, onBack }) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto my-10 animate-fade-in translate-y-0 transition-all">
      <div className="md:flex">
        {/* Poster Section */}
        <div className="md:w-1/3">
          <img 
            src={movie.poster} 
            alt={movie.title} 
            className="w-full h-full object-cover min-h-[400px]"
          />
        </div>

        {/* Content Section */}
        <div className="md:w-2/3 p-8 flex flex-col">
          <button 
            onClick={onBack} 
            className="text-blue-600 font-bold mb-6 flex items-center hover:underline group"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> 
            Back to Collection
          </button>

          <h2 className="text-5xl font-black text-blue-900 mb-4 tracking-tighter">
            {movie.title}
          </h2>

          <div className="flex gap-4 items-center mb-8">
            <span className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-bold border border-blue-100">
              {movie.year}
            </span>
            <span className="bg-gray-50 text-gray-600 px-4 py-1 rounded-full text-sm font-bold border border-gray-100">
              {movie.genre}
            </span>
            <span className="text-yellow-500 font-black text-2xl">
              ★ {movie.rating}
            </span>
          </div>
          
          <div className="space-y-6">
            <div>
               <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Director</h3>
               <p className="text-xl font-bold text-gray-800">{movie.director || "Unknown Director"}</p>
            </div>

            <div>
               <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Synopsis</h3>
               <p className="text-gray-600 leading-relaxed text-lg">
                  {movie.synopsis || "No detailed synopsis available for this title yet. Explore the gallery for more cinematic masterpieces."}
               </p>
            </div>

            <div>
               <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Cast</h3>
               <p className="text-gray-600 italic">Leading cast details to be updated soon.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;