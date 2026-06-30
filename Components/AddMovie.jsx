import React, { useState } from "react";

const AddMovieForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: new Date().getFullYear(),
    rating: 0,
    poster: "",
    synopsis: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "rating" || name === "year" ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.genre) return alert("Title and Genre are required!");
    onAdd({ ...formData, id: Date.now() });
    onCancel(); // Close form
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-800 rounded-3xl shadow-2xl border border-gray-700 my-10">
      <h2 className="text-3xl font-black text-white mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Add New Movie
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm font-semibold">Movie Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Inception"
              className="bg-gray-900 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm font-semibold">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="e.g. Sci-Fi, Action"
              className="bg-gray-900 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm font-semibold">Release Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="bg-gray-900 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm font-semibold">Rating (1-10)</label>
            <input
              type="number"
              name="rating"
              step="0.1"
              min="0"
              max="10"
              value={formData.rating}
              onChange={handleChange}
              className="bg-gray-900 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-400 text-sm font-semibold">Poster URL</label>
          <input
            type="url"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            placeholder="https://..."
            className="bg-gray-900 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-400 text-sm font-semibold">Synopsis</label>
          <textarea
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            rows="4"
            placeholder="Brief movie description..."
            className="bg-gray-900 text-white p-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 px-6 rounded-xl border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white transition-all font-bold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-6 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition-all font-bold"
          >
            Create Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovieForm;
