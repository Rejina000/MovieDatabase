import express from "express";
import {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
} from "../controllers/movieController.js";

import { movieRules, validate } from "../validators/movieValidator.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);

router.post("/", movieRules, validate, createMovie);

router.put("/:id", movieRules, validate, updateMovie);

export default router;