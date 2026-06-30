import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import MovieGrid from "./components/MovieGrid";
import AddMovieForm from "./components/AddMovieForm";
import MovieDetail from "./components/MovieDetail";

const INITIAL_DATA = [
  { 
    id: 1, 
    title: "Saiyaara", 
    genre: "Romance/Action", 
    year: 2012, 
    rating: 7.2, 
    director: "Kabir Khan",
    poster: "/posters/saiyaara.png" 
  },
  { 
    id: 2, 
    title: "Titanic", 
    genre: "Romance/Drama", 
    year: 1997, 
    rating: 7.9, 
    director: "James Cameron",
    poster: "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png" 
  },
  { 
    id: 3, 
    title: "Dhurandhar", 
    genre: "Comedy/Drama", 
    year: 2015, 
    rating: 6.8, 
    director: "Dnyanesh Bhalekar",
    poster: "/posters/dhurandhar.png" 
  },
  { 
    id: 4, 
    title: "3 Idiots", 
    genre: "Comedy/Drama", 
    year: 2009, 
    rating: 8.4, 
    director: "Rajkumar Hirani",
    poster: "https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg" 
  },
  { 
    id: 5, 
    title: "Article 370", 
    genre: "Action/Thriller", 
    year: 2024, 
    rating: 8.1, 
    director: "Aditya Suhas Jambhale",
    poster: "/posters/article_370.png" 
  }
];

function App() {
  const [movies, setMovies] = useState(INITIAL_DATA);
  const [watchlistIds, setWatchlistIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("gallery"); // gallery, add, details
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [stats, setStats] = useState({ total: 0, average: 0 });

  // Compute stats whenever movies change
  useEffect(() => {
    const total = movies.length;
    const avg = total > 0 ? (movies.reduce((acc, m) => acc + m.rating, 0) / total).toFixed(1) : 0;
    setStats({ total, average: avg });
  }, [movies]);

  const handleAddMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
    setCurrentView("gallery");
  };

  const toggleWatchlist = (movie) => {
    setWatchlistIds(prev => 
      prev.includes(movie.id) 
        ? prev.filter(id => id !== movie.id) 
        : [...prev, movie.id]
    );
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setCurrentView("details");
  };

  // Filter movies based on search
  const filteredMovies = movies.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4">
        {/* Dashboard & Search (Only show in gallery view) */}
        {currentView === "gallery" && (
          <section className="mt-8 mb-12 flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex gap-8">
               <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Movies</p>
                  <p className="text-3xl font-black text-blue-600">{stats.total}</p>
               </div>
               <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Avg Rating</p>
                  <p className="text-3xl font-black text-blue-600">{stats.average}</p>
               </div>
            </div>

            <div className="w-full md:w-96 flex items-center bg-gray-100 rounded-xl px-4 py-3">
               <span className="mr-3">🔍</span>
               <input 
                  type="text" 
                  placeholder="Search movies..." 
                  className="bg-transparent w-full focus:outline-none font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>

            <button 
              onClick={() => setCurrentView("add")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              + Add Movie
            </button>
          </section>
        )}

        {/* View Switcher */}
        {currentView === "add" && (
          <AddMovieForm 
            onAddMovie={handleAddMovie} 
            onCancel={() => setCurrentView("gallery")} 
          />
        )}

        {currentView === "details" && (
          <MovieDetail 
            movie={selectedMovie} 
            onBack={() => setCurrentView("gallery")} 
          />
        )}

        {currentView === "gallery" && (
          <>
            <h2 className="text-3xl font-black text-blue-900 mb-8 border-l-8 border-blue-600 pl-4">
               {searchTerm ? `Results for "${searchTerm}"` : "My Collection"}
            </h2>
            <MovieGrid 
              movies={filteredMovies} 
              onSelectMovie={handleSelectMovie}
              onToggleWatchlist={toggleWatchlist}
              watchlistIds={watchlistIds}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
