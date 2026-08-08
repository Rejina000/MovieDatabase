import { Router } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../controllers/authController.js";
import authenticate from "../utils/middleware/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Current logged-in user
router.get("/me", authenticate, getCurrentUser);

export default router;