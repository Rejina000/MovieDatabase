import SAMPLE_MOVIES from "../../data/movies.js";

export function getAll() {
    return SAMPLE_MOVIES;
}

export function getById(id) {
    return SAMPLE_MOVIES.find((movie) => movie.id === id);
}

export function addMovie(movie) {
    SAMPLE_MOVIES.push(movie);
}

export function updateMovie(id, newMovie) {
    const index = SAMPLE_MOVIES.findIndex(
        (movie) => movie.id == id
    );

    if (index === -1) {
        return null;
    }

    SAMPLE_MOVIES.splice(index, 1, {
        ...SAMPLE_MOVIES[index],
        ...newMovie,
    });

    return SAMPLE_MOVIES[index];
}