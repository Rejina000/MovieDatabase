import Groq from "groq-sdk";
import SAMPLE_MOVIES from "../../data/movies.js";
import { verifyToken } from "../utils/auth.js";
import * as AuthModel from "../models/authModel.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function recommendMovies(req, res) {
    try {
        let watchlist = [];
        let genres = [];

        const token =
            req.headers.authorization?.split(" ")[1] ||
            req.cookies?.jwtToken;
        const payload = token ? verifyToken(token) : null;

        if (payload && payload.userId) {
            const user = await AuthModel.getWatchlist(payload.userId);

            if (user && user.watchlist.length > 0) {
                const movies = user.watchlist.filter(Boolean);
                watchlist = movies.map((m) => m.title);
                genres = [
                    ...new Set(
                        movies
                            .flatMap((m) => (m.genre || "").split("/"))
                            .map((g) => g.trim())
                            .filter(Boolean)
                    ),
                ];
            }
        }

        const {
            watchlist: bodyWatchlist = [],
            genres: bodyGenres = [],
            preferences: bodyPreferences = "",
        } = req.body || {};

        if (watchlist.length === 0 && genres.length === 0) {
            watchlist = bodyWatchlist;
            genres = bodyGenres;
        }
        const preferences = String(bodyPreferences || "").trim();

        if (watchlist.length === 0 && genres.length === 0 && !preferences) {
            return res.status(400).json({
                error:
                    "Add movies to your watchlist or tell us your preferences so we can recommend something.",
            });
        }

        const catalog = SAMPLE_MOVIES.map(
            (m) => `- "${m.title}" (${m.genre}, ${m.year}, rating ${m.rating}): ${m.synopsis}`
        ).join("\n");

        const prompt = `Based on this user's watchlist: [${watchlist.join(", ")}]${genres.length ? `, favourite genres: [${genres.join(", ")}]` : ""}${preferences ? `, and their preferences: "${preferences}"` : ""}, recommend exactly 3 movies from our database they would enjoy, with reasons. Only choose movies from the database list below. Return JSON in exactly this format:
{
  "recommendations": [
    { "title": "<movie title>", "reason": "<why they would enjoy it>" }
  ]
}

Our database movies:
${catalog}`;

        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content:
                        "You are MovieMate AI, a movie recommendation assistant. Always reply with valid JSON only.",
                },
                { role: "user", content: prompt },
            ],
            response_format: { type: "json_object" },
        });

        const content = response.choices?.[0]?.message?.content || "";

        let parsed;
        try {
            parsed = JSON.parse(content);
        } catch {
            return res.status(502).json({ error: "Groq returned an invalid response." });
        }

        const recommendations = (parsed.recommendations || [])
            .slice(0, 3)
            .map((rec) => {
                const movie = SAMPLE_MOVIES.find(
                    (m) =>
                        m.title.toLowerCase() ===
                        String(rec.title || "").trim().toLowerCase()
                );
                return { movie: movie || null, reason: rec.reason || "" };
            })
            .filter((rec) => rec.movie);

        if (recommendations.length === 0) {
            return res.status(502).json({
                error: "Groq did not return movies from the database.",
            });
        }

        return res.status(200).json({ success: true, recommendations });
    } catch (error) {
        return res.status(500).json({
            error: `AI recommendation failed: ${error.message}`,
        });
    }
}
