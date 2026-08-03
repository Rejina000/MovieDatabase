import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "";

const AiRecommendations = ({ movies, watchlistIds }) => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const watchlistMovies = movies.filter((m) => watchlistIds.includes(m.id));
  const genres = [
    ...new Set(watchlistMovies.flatMap((m) => m.genre.split("/").map((g) => g.trim()))),
  ];
  const titles = watchlistMovies.map((m) => m.title);
  const hasWatchlist = watchlistMovies.length > 0;

  const handleRecommend = async () => {
    setError("");
    setRecommendations(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/ai/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ watchlist: titles, genres }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          response.status >= 500
            ? "AI service unavailable right now. Check that GEMINI_API_KEY is set and try again."
            : result.error || "Failed to get recommendations."
        );
      }
      setRecommendations(result.recommendations);
    } catch (err) {
      console.error("AI recommendation error:", err);
      setError(
        err.message === "Failed to fetch"
          ? "Cannot reach the backend. Run \"npm start\" inside the Backend folder, then try again."
          : err.message || "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10 rounded-3xl border border-purple-100 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-6 shadow-xl shadow-purple-500/5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black tracking-tight text-gray-900">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">
              AI Movie Picks
            </span>
          </h3>
          <p className="text-sm text-gray-500 font-medium mt-1">
            Gemini recommends movies from your collection based on your Watch Later list.
          </p>
        </div>

        <button
          onClick={handleRecommend}
          disabled={loading || !hasWatchlist}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition hover:shadow-xl hover:shadow-purple-500/30 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Thinking...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Recommend Me Something
            </>
          )}
        </button>
      </div>

      {!hasWatchlist && !error && (
        <p className="mt-4 text-sm text-gray-400 font-medium">
          Add movies to your Watch Later list first, then ask for recommendations.
        </p>
      )}

      {error && (
        <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {recommendations && recommendations.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendations.map((rec, i) => (
            <div
              key={rec.movie.id}
              className="group rounded-2xl border border-purple-100 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10"
            >
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <img
                    src={rec.movie.poster}
                    alt={rec.movie.title}
                    className="h-28 w-20 rounded-xl object-cover shadow-md"
                  />
                  <span className="absolute -top-2 -left-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-xs font-black text-white shadow-md">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 leading-tight">{rec.movie.title}</h4>
                  <p className="mt-1 text-xs text-gray-400 font-medium">
                    {rec.movie.genre} · {rec.movie.year}
                  </p>
                  <p className="mt-1 text-sm text-yellow-500 font-bold">★ {rec.movie.rating}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                <span className="font-bold text-violet-600">Why: </span>
                {rec.reason}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AiRecommendations;
