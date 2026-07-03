import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MovieGrid from "./components/MovieGrid";
import AddMovieForm from "./components/AddMovieForm";
import MovieDetail from "./components/MovieDetail";

const SAMPLE_MOVIES = [
  { 
    id: 1, 
    title: "Saiyaara", 
    genre: "Romance/Action", 
    year: 2012, 
    rating: 7.2, 
    director: "Kabir Khan",
    synopsis: "A story of star-crossed lovers set against a backdrop of espionage and danger in the mountains of Syria.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTk2ZmFhYjctYWZiYy00N2IxLWEzMWItZGRiMDY4ZDQwZWFlXkEyXkFqcGc@._V1_.jpg" 
  },
  { 
    id: 2, 
    title: "Titanic", 
    genre: "Romance/Drama", 
    year: 1997, 
    rating: 7.9, 
    director: "James Cameron",
    synopsis: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    poster: "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png" 
  },
  { 
    id: 3, 
    title: "Dhurandhar", 
    genre: "Action/Drama", 
    year: 2015, 
    rating: 6.8, 
    director: "Dnyanesh Bhalekar",
    synopsis: "A high-stakes thriller involving family secrets, legendary rivals, and a man's quest for justice in a modern city.",
    poster: "https://m.media-amazon.com/images/M/MV5BNzdkNjAxNWMtNWY3My00NTI1LTg2YWQtOGI3MDA0NzdhMjEyXkEyXkFqcGc@._V1_.jpg" 
  },
  { 
    id: 4, 
    title: "3 Idiots", 
    genre: "Comedy/Drama", 
    year: 2009, 
    rating: 8.4, 
    director: "Rajkumar Hirani",
    synopsis: "Two friends search for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.",
    poster: "https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg" 
  },
  { 
    id: 5, 
    title: "Article 370", 
    genre: "Action/Thriller", 
    year: 2024, 
    rating: 8.1, 
    director: "Aditya Suhas Jambhale",
    synopsis: "An intelligence agent is sent on a mission to bring stability to a volatile region by navigating intense political conflict and danger.",
    poster: "https://m.media-amazon.com/images/M/MV5BZjNlNWU0NGEtMGU2Ni00Y2UyLWI3MWUtM2VkZTMxMDljNGE0XkEyXkFqcGc@._V1_.jpg" 
  }
];

function App() {
  const [movies, setMovies] = useState(SAMPLE_MOVIES);
  const [showForm, setShowForm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleAddMovie = (newMovie) => {
    setMovies([newMovie, ...movies]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans">
      <Navbar 
        onAddClick={() => {
          setShowForm(!showForm);
          setSelectedMovie(null); // Close details if opening form
        }} 
        showForm={showForm} 
      />
      
      <main className="container mx-auto py-10 px-4">
        {/* Gallery View */}
        {!selectedMovie && !showForm && (
          <>
            <header className="mb-12 text-center">
              <h2 className="text-4xl font-extrabold text-blue-900 mb-2 underline underline-offset-8 decoration-blue-200">
                Movie Gallery
              </h2>
              <p className="text-gray-500 font-medium italic">Your Official Collection</p>
            </header>
            <MovieGrid 
              movies={movies} 
              onMovieClick={(movie) => setSelectedMovie(movie)} 
            />
          </>
        )}

        {/* Add Movie Form View */}
        {showForm && (
          <div className="max-w-xl mx-auto mb-16">
            <AddMovieForm 
              onAddMovie={handleAddMovie} 
              onCancel={() => setShowForm(false)} 
            />
          </div>
        )}

        {/* Movie Detail View */}
        {selectedMovie && !showForm && (
          <MovieDetail 
            movie={selectedMovie} 
            onBack={() => setSelectedMovie(null)} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
