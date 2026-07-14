import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  genre: {
    type: String,
    required: true,
    enum: [
      "Romance/Action",
      "Romance/Drama",
      "Action/Drama",
      "Comedy/Drama",
      "Action/Thriller",
    ],
  },

  year: {
    type: Number,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },

  director: {
    type: String,
    required: true,
    trim: true,
  },

  synopsis: {
    type: String,
    required: true,
  },

  poster: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;