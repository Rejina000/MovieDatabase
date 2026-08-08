import * as MovieModel from "../models/movieModel.js";

export async function getMovies(req, res) {
    try {
        const movies = await MovieModel.getAll();
        return res.status(200).json(movies);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function getMovieById(req, res) {
    try {
        const movie = await MovieModel.getById(req.params.id);

        if (!movie) {
            return res.status(404).json({
                error: "Movie not found for given id",
            });
        }

        return res.status(200).json(movie);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export async function createMovie(req, res) {
    try {
        const movie = await MovieModel.addMovie(req.body);

        return res.status(201).json({
            message: "Movie added successfully",
            movie,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export async function updateMovie(req, res) {
    try {
        const movie = await MovieModel.updateMovie(req.params.id, req.body);

        if (!movie) {
            return res.status(404).json({
                error: "Movie not found for the given id",
            });
        }

        return res.status(200).json({
            message: "Movie updated successfully",
            movie,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export async function deleteMovie(req, res) {
    try {
        const movie = await MovieModel.deleteMovie(req.params.id);

        if (!movie) {
            return res.status(404).json({
                error: "Movie not found for the given id",
            });
        }

        return res.status(200).json({
            message: "Movie deleted successfully",
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}
