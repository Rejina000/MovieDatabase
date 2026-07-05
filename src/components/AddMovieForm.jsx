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

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-md mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">Add New Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Movie Title" 
          className="w-full p-2 border rounded"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
        />
        <input 
          type="text" 
          placeholder="Genre" 
          className="w-full p-2 border rounded"
          value={formData.genre}
          onChange={(e) => setFormData({...formData, genre: e.target.value})}
        />
        <div className="flex gap-2">
          <input 
            type="number" 
            placeholder="Year" 
            className="w-1/2 p-2 border rounded"
            value={formData.year}
            onChange={(e) => setFormData({...formData, year: e.target.value})}
          />
          <input 
            type="text" 
            placeholder="Director" 
            className="w-1/2 p-2 border rounded"
            value={formData.director}
            onChange={(e) => setFormData({...formData, director: e.target.value})}
          />
        </div>
        <input 
          type="text" 
          placeholder="Poster Image URL" 
          className="w-full p-2 border rounded"
          value={formData.poster}
          onChange={(e) => setFormData({...formData, poster: e.target.value})}
        />
        <textarea 
          placeholder="Synopsis" 
          className="w-full p-2 border rounded h-24"
          value={formData.synopsis}
          onChange={(e) => setFormData({...formData, synopsis: e.target.value})}
        />
        <div className="flex gap-4 pt-4">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">Save Movie</button>
          <button type="button" onClick={onCancel} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-bold hover:bg-gray-300">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddMovieForm;