import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieRouter from "./src/routes/movieRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import dbConnection from './src/config/db.js'
import cookieParse from 'cookie-parser';


dotenv.config();

const app = express();
app.use(cookieParse());
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors(
    {
        origin:(origin,callback)=>{
            if(!origin ||
                 ['http://localhost:5173',process.env.FRONTEND_URL].includes(origin)){
                return callback(null,true)
            }
            callback(new Error('CORS origin not allowed'))
        },
        credentials:true
    }),
);

// Mount the movie router under /movies

app.get("/health", (req, res) => {
    res.status(200).json({ ok: true });
  });
app.use("/movies", movieRouter);
app.use("/auth", authRoutes);

await dbConnection()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});