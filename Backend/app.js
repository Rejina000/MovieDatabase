import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import SAMPLE_MOVIES from "./data/movies.js";
import authRoutes from "./src/routes/authRoutes.js";
import dbConnection from "./src/config/db.js";
import aiRouter from "./src/routes/aiRoutes.js";
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);
app.use("/api/ai", aiRouter);

const PORT = 3001; // Frontend ko application localhost mai run vairaxa backend pani yesmai run vayo vane conflict aauxa so also initially default for JS is 3000

app.get("/movies", (req, res) => {
    // k kaam garne vanera yeta bhitra lekhne
    return res.json(SAMPLE_MOVIES); // universal format vankai json ho so tei use gareko
});

// NEW GET BY ID ROUTE
app.get("/movies/:id", (req, res) => {
    const movie = SAMPLE_MOVIES.find(
        (movie) => movie.id == req.params.id
    );

    if (!movie) {
        return res.status(404).json({
            error: "Movie not found for given id",
        });
    }

    return res.status(200).json(movie);
});

app.post("/movies", (req, res) => {
    const movie = req.body;

    SAMPLE_MOVIES.push(movie);

    return res.status(201).json({
        message: "Movie added successfully",
        movie: movie,
    });
});

app.put("/movies/:id", (req, res) => {
    const newMovie = req.body;

    const movie = SAMPLE_MOVIES.find(
        (movie) => movie.id == req.params.id
    );

    if (!movie) {
        return res.status(404).json({
            error: "Movie not found for the given id",
        });
    }

    const index = SAMPLE_MOVIES.findIndex(
        (movie) => movie.id == req.params.id
    );

    SAMPLE_MOVIES.splice(index, 1, {
        ...movie,
        ...newMovie,
    });

    return res.status(200).json({
        message: "Movie updated successfully",
        movie: SAMPLE_MOVIES[index],
    });
});

dbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
