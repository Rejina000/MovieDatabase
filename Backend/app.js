import express from "express"
import SAMPLE_MOVIES from "./data/movies.js";
const app = express();
app.use(express.json())
const PORT = 3001; // Frontend ko application local host mai run vairaxa backend pani yesmai run vayo vane conflict aauxa so also initially default for JS is 3000

app.get("/movies",(req,res)=>{
    //k kaam garne vanera yeta bhitra lekhne
    return res.json(SAMPLE_MOVIES) //universal format vankai json ho so tei use gareko
})
app.post("/movies", (req, res) => {
    const movie = req.body;

    SAMPLE_MOVIES.push(movie);

    return res.status(201).json({
        message: "Movie added successfully",
        movie: movie
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});