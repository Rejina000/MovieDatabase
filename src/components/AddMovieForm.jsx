import React, { useState } from "react";

const AddMovieForm = ({ onAddMovie, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: "",
    director: "",
    synopsis: "",
    poster: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic validation
    if (!formData.title || !formData.genre) return alert("Please fill at least Title and Genre");
    
    onAddMovie({ 
      ...formData, 
      id: Date.now(), 
      rating: 5.0, // Default rating for new movies
      poster: formData.poster || "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop"
    });
  };

  const InputWrapper = ({ icon, children, label }) => (
    <div className="space-y-1.5 flex-1">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <span>{icon}</span> {label}
      </label>
      <div className="relative group">
        {children}
      </div>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-blue-50 max-w-2xl mx-auto my-4 transition-all duration-300">
      <header className="mb-8 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
          <span className="text-3xl">🎬</span>
          <h2 className="text-3xl font-black text-blue-900 tracking-tight">Add New Movie</h2>
        </div>
        <p className="text-gray-500 font-medium ml-0 sm:ml-12">Fill in the details below to add a new movie.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-6">
          {/* Movie Title */}
          <InputWrapper icon="🎬" label="Movie Title">
            <input 
              type="text" 
              placeholder="e.g. Inception" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </InputWrapper>

          {/* Genre */}
          <InputWrapper icon="🏷" label="Genre">
            <input 
              type="text" 
              placeholder="e.g. Sci-Fi, Action" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium"
              value={formData.genre}
              onChange={(e) => setFormData({...formData, genre: e.target.value})}
            />
          </InputWrapper>

          {/* Year and Director Row */}
          <div className="flex flex-col sm:flex-row gap-6">
            <InputWrapper icon="📅" label="Release Year">
              <input 
                type="number" 
                placeholder="2024" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
              />
            </InputWrapper>
            <InputWrapper icon="👤" label="Director">
              <input 
                type="text" 
                placeholder="Christopher Nolan" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium"
                value={formData.director}
                onChange={(e) => setFormData({...formData, director: e.target.value})}
              />
            </InputWrapper>
          </div>

          {/* Poster URL */}
          <InputWrapper icon="🔗" label="Poster Image URL">
            <input 
              type="text" 
              placeholder="https://example.com/poster.jpg" 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium"
              value={formData.poster}
              onChange={(e) => setFormData({...formData, poster: e.target.value})}
            />
          </InputWrapper>

          {/* Synopsis */}
          <InputWrapper icon="📝" label="Synopsis">
            <textarea 
              placeholder="A brief description of the movie..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 h-32 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-medium resize-none"
              value={formData.synopsis}
              onChange={(e) => setFormData({...formData, synopsis: e.target.value})}
            />
          </InputWrapper>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button 
            type="submit" 
            className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            <span>💾</span> Save Movie
          </button>
          <button 
            type="button" 
            onClick={onCancel} 
            className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovieForm;