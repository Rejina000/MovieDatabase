import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MovieGrid from "./components/MovieGrid";
import AddMovieForm from "./components/AddMovieForm";

const SAMPLE_MOVIES = [
  { 
    id: 1, 
    title: "Saiyaara", 
    genre: "Romance/Action", 
    year: 2012, 
    rating: 7.2, 
    poster: "https://m.media-amazon.com/images/M/MV5BMTk2ZmFhYjctYWZiYy00N2IxLWEzMWItZGRiMDY4ZDQwZWFlXkEyXkFqcGc@._V1_.jpg" 
  },
  { 
    id: 2, 
    title: "Titanic", 
    genre: "Romance/Drama", 
    year: 1997, 
    rating: 7.9, 
    poster: "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png" 
  },
  { 
    id: 3, 
    title: "Dhurandhar", 
    genre: "Action/Drama", 
    year: 2015, 
    rating: 6.8, 
    poster: "https://m.media-amazon.com/images/M/MV5BNzdkNjAxNWMtNWY3My00NTI1LTg2YWQtOGI3MDA0NzdhMjEyXkEyXkFqcGc@._V1_.jpg" 
  },
  { 
    id: 4, 
    title: "3 Idiots", 
    genre: "Comedy/Drama", 
    year: 2009, 
    rating: 8.4, 
    poster: "https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg" 
  },
  { 
    id: 5, 
    title: "Article 370", 
    genre: "Action/Thriller", 
    year: 2024, 
    rating: 8.1, 
    poster: "https://m.media-amazon.com/images/M/MV5BZjNlNWU0NGEtMGU2Ni00Y2UyLWI3MWUtM2VkZTMxMDljNGE0XkEyXkFqcGc@._V1_.jpg" 
  }
];

function App() {
  // Adding State for movies and form visibility
  const [movies, setMovies] = useState(SAMPLE_MOVIES);
  const [showForm, setShowForm] = useState(false);

  // Function to add a movie (Lifting State)
  const handleAddMovie = (newMovie) => {
    setMovies([newMovie, ...movies]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <Navbar 
        onAddClick={() => setShowForm(!showForm)} 
        showForm={showForm} 
      />
      
      <main className="container mx-auto py-10 px-4">
        <header className="mb-12 text-center">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-2 underline underline-offset-8 decoration-blue-200">
            Movie Gallery
          </h2>
          <p className="text-gray-500 font-medium italic">Your Official Collection</p>
        </header>

        {showForm && (
          <div className="max-w-xl mx-auto mb-16">
            <AddMovieForm 
              onAddMovie={handleAddMovie} 
              onCancel={() => setShowForm(false)} 
            />
          </div>
        )}

        <MovieGrid movies={movies} />
      </main>
    </div>
  );
}

export default App;
