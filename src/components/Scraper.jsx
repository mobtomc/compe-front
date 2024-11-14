// Scraper.jsx
import { useState } from "react";
import { scrapeSite, analyzeData, getSuggestions } from "../services/api";
import AnalysisComponent from "./AnalysisComponent";
import SuggestionsComponent from "./SuggestionsComponent.jsx";
import Navbar from "./Navbar";
import CompetitorSearch from "./CompetitorSearch.jsx";

function Scraper() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [urlError, setUrlError] = useState(null);

  const fetchSuggestions = async (scrapedData) => {
    try {
      const suggestionsResponse = await getSuggestions(scrapedData);
      const suggestionsArray = suggestionsResponse.data.suggestions
        ? suggestionsResponse.data.suggestions
            .split("\n")
            .filter((s) => s.trim() !== "")
        : [];
      setSuggestions(suggestionsArray);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // URL validation function
  const isValidUrl = (url) => {
    const urlPattern = new RegExp(
      "^(https?://)?" + // Protocol (optional)
        "(([a-zA-Z0-9-]+.)+[a-zA-Z]{2,})" + // Domain name and TLD
        "(:[0-9]{1,5})?" + // Port (optional)
        "(/.*)?$", // Path (optional)
      "i"
    );
    return urlPattern.test(url);
  };

  const handleScrape = async () => {
    if (!url.trim()) {
      setUrlError("Please enter a URL");
      return;
    } else if (!isValidUrl(url.trim())) {
      setUrlError("Invalid URL format");
      return;
    }

    setUrlError(null);
    setLoading(true);
    setAnalysisResult(null);
    setSuggestions([]);

    try {
      const response = await scrapeSite(url);
      const scrapedData = response.data.data;
      setData(scrapedData);

      const analysisResponse = await analyzeData(scrapedData);
      setAnalysisResult(analysisResponse.data);

      fetchSuggestions(scrapedData);
    } catch (error) {
      setData(
        `Error: ${
          error.response
            ? error.response.data.detail
            : "An unknown error occurred"
        }`
      );
      setAnalysisResult(null);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navbar />
      <div className="flex h-[80vh] w-[90%] py-8 justify-between items-center gap-8">
        {/* Left: Hero Section */}
        <div className="flex flex-col justify-center items-center w-[55%] text-white p-8 rounded-xl h-[70vh]">
          <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-blue-400 mb-4 animate-pulse">
            Site Scribe
          </h2>
          <p className="text-lg text-center w-[30rem]">
            Analyze and improve your website&apos;s content effortlessly with
            sentiment analysis and AI-driven suggestions.
          </p>
        </div>

        {/* Right: Card with URL input and Scrape Button */}
        <div className="w-[45%]">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transform hover:scale-105 transition-transform duration-200 ease-out">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Scrape a Site
            </h2>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL here"
              className="w-full p-2 mb-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-900 text-white placeholder-gray-500"
            />
            {urlError && (
              <p className="text-red-500 text-sm mt-1">{urlError}</p>
            )}
            <button
              onClick={handleScrape}
              className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 w-full transition-colors duration-200 ease-in-out mt-2"
            >
              Scrape
            </button>
          </div>
        </div>
      </div>

      {/* Display scraped data and sentiment analysis */}
      <div className="flex flex-col items-center space-y-4 pb-8 w-[90%]">
        {/* Scraped Data Section */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl shadow-lg w-full max-w-3xl p-6 transform hover:scale-105 transition-transform duration-200 ease-out">
          <h3 className="text-3xl text-white text-center font-bold mb-2">
            Scraped Data
          </h3>
          <p
            className="mt-4 p-4 bg-gray-900 rounded-lg shadow-md text-gray-400 overflow-auto"
            style={{ maxHeight: "300px" }}
          >
            {loading ? "Loading..." : data || "No data to display"}
          </p>
        </div>

        {/* Sentiment Analysis Section */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl shadow-lg w-full max-w-3xl p-6 transform hover:scale-105 transition-transform duration-200 ease-out">
          <h3 className="text-3xl text-white text-center font-bold mb-2">
            Sentiment Analysis
          </h3>
          {analysisResult ? (
            <AnalysisComponent analysis={analysisResult} />
          ) : (
            <p className="text-gray-400 text-center">No analysis available.</p>
          )}
        </div>

        {/* Suggestions Section */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl shadow-lg w-full max-w-3xl p-6 transform hover:scale-105 transition-transform duration-200 ease-out">
          <h3 className="text-3xl text-white text-center font-bold mb-2">
            Improvement Suggestions
          </h3>
          {suggestions.length > 0 ? (
            <SuggestionsComponent suggestions={suggestions} />
          ) : (
            <p className="text-gray-400 text-center">
              No Suggestions available
            </p>
          )}
        </div>

        <CompetitorSearch />
      </div>
    </div>
  );
}

export default Scraper;
