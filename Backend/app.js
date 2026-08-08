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

app.use("/movies", movieRouter);
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);
app.use("/api/ai", aiRouter);

const PORT = 3001; // Frontend ko application localhost mai run vairaxa backend pani yesmai run vayo vane conflict aauxa so also initially default for JS is 3000

dbConnection().then(async () => {
    await seedIfEmpty();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
