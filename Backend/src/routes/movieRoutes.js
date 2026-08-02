import express from "express";
import {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
} from "../controllers/movieController.js";

const router = express.Router();

// Define route mapping to movieController handlers
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.put("/:id", updateMovie);

export default router;
