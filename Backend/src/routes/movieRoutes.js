import express from "express";
import {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
} from "../controllers/movieController.js";
import { movieRules, validate } from "../validators/movieValidator.js";

const router = express.Router();

// Define route mapping to movieController handlers
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", movieRules, validate, createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
