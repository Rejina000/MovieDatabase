import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        genre: { type: String, required: true, trim: true },
        year: { type: Number, required: true },
        rating: { type: Number, required: true },
        director: { type: String, required: true, trim: true },
        synopsis: { type: String, required: true, trim: true },
        poster: { type: String, required: true },
    },
    { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export function getAll() {
    return Movie.find();
}

export function getById(id) {
    return Movie.findById(id);
}

export function addMovie(movie) {
    return Movie.create(movie);
}

export function updateMovie(id, newMovie) {
    return Movie.findByIdAndUpdate(id, newMovie, {
        new: true,
        runValidators: true,
    });
}

export function deleteMovie(id) {
    return Movie.findByIdAndDelete(id);
}

export async function seedIfEmpty() {
    const count = await Movie.estimatedDocumentCount();
    if (count > 0) return;

    const { default: SAMPLE_MOVIES } = await import("../../data/movies.js");
    const docs = SAMPLE_MOVIES.map(({ id, ...rest }) => rest);
    await Movie.insertMany(docs);
    console.log("Seeded default movies into MongoDB");
}
