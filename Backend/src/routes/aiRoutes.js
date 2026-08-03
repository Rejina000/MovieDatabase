import { Router } from "express";
import { recommendMovies } from "../controllers/aiController.js";

const router = Router();

router.post("/recommend", recommendMovies);

export default router;
