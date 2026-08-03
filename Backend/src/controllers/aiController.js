import { GoogleGenAI } from "@google/genai";
import SAMPLE_MOVIES from "../../data/movies.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function recommendMovies(req, res) {
    try {
        const { watchlist = [], genres = [] } = req.body || {};

        if (watchlist.length === 0 && genres.length === 0) {
            return res.status(400).json({
                error: "Add movies to your watchlist so we can recommend something.",
            });
        }

        const catalog = SAMPLE_MOVIES.map(
            (m) => `- "${m.title}" (${m.genre}, ${m.year}, rating ${m.rating}): ${m.synopsis}`
        ).join("\n");

        const prompt = `Based on this user's watchlist: [${watchlist.join(", ")}] and favourite genres: [${genres.join(", ")}], recommend exactly 3 movies from our database they would enjoy, with reasons. Only choose movies from the database list below. Return JSON in exactly this format:
{
  "recommendations": [
    { "title": "<movie title>", "reason": "<why they would enjoy it>" }
  ]
}

Our database movies:
${catalog}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            },
        });

        let parsed;
        try {
            parsed = JSON.parse(response.text);
        } catch {
            return res.status(502).json({ error: "Gemini returned an invalid response." });
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
                error: "Gemini did not return movies from the database.",
            });
        }

        return res.status(200).json({ success: true, recommendations });
    } catch (error) {
        return res.status(500).json({
            error: `AI recommendation failed: ${error.message}`,
        });
    }
}
