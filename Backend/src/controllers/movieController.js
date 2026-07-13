import * as movieModel from "../models/movieModel.js";

// Handle GET /movies
export function getMovies(req, res) {
    const movies = movieModel.getAll();
    return res.json(movies);
}

// Handle GET /movies/:id
export function getMovieById(req, res) {
    const movie = movieModel.getById(Number(req.params.id));
    if (!movie) {
        return res.status(404).json({
            error: "Movie not found for given id",
        });
    }
    return res.status(200).json(movie);
}

// Handle POST /movies
export function createMovie(req, res) {
    const movie = req.body;
    movieModel.addMovie(movie);
    return res.status(201).json({
        message: "Movie added successfully",
        movie: movie,
    });
}

// Handle PUT /movies/:id
export function updateMovie(req, res) {
    const id = Number(req.params.id);
    const newMovie = req.body;
    const updated = movieModel.updateMovie(id, newMovie);
    
    if (!updated) {
        return res.status(404).json({
            error: "Movie not found for the given id",
        });
    }

    return res.status(200).json({
        message: "Movie updated successfully",
        movie: updated,
    });
}
