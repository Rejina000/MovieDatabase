import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  getUserWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "../controllers/authController.js";
import authenticate from "../utils/middleware/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Current logged-in user
router.get("/me", authenticate, getCurrentUser);

// Watchlist
router.get("/watchlist", authenticate, getUserWatchlist);
router.put("/watchlist/:movieId", authenticate, addToWatchlist);
router.delete("/watchlist/:movieId", authenticate, removeFromWatchlist);

export default router;