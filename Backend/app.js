import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import movieRouter from "./src/routes/movieRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import aiRouter from "./src/routes/aiRoutes.js";
import dbConnection from "./src/config/db.js";
import { seedIfEmpty } from "./src/models/movieModel.js";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Movie Database API is running",
        status: "success"
    });
});

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        ok: true
    });
});

app.use("/movies", movieRouter);
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);
app.use("/api/ai", aiRouter);

// Local: 3001
// Render: uses Render's assigned PORT
const PORT = process.env.PORT || 3001;

dbConnection().then(async () => {
    await seedIfEmpty();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});