import { useState } from "react";
import { searchCompetitors } from "../services/api";

function CompetitorSearch() {
  const [businessType, setBusinessType] = useState("");
  const [location, setLocation] = useState("");
  const [competitors, setCompetitors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!businessType.trim() || !location.trim()) {
      setError("Please enter both business type and location.");
      return;
    }
  
    setLoading(true);
    setError(null);
    setCompetitors([]); 
  
    try {
      console.log("Searching competitors for:", businessType, location);
      const response = await searchCompetitors(businessType, location);
      if (response && response.data && response.data.length > 0) {
        setCompetitors(response.data);
        console.log("Competitors data:", response.data);
      } else {
        setError("No results found.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Could not fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex w-[90%] py-8 justify-center items-center gap-8">
        {/* Input Section */}
        <div className="w-[70%]">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center transform hover:scale-105 transition-transform duration-200 ease-out">
            <h2 className="text-2xl font-bold mb-4 text-white">
              Search Competitors
            </h2>
            <input
              type="text"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              placeholder="Business Type (e.g., Plumber)"
              className="w-full p-2 mb-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-900 text-white placeholder-gray-500"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (e.g., Texas)"
              className="w-full p-2 mb-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-900 text-white placeholder-gray-500"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <button
              onClick={handleSearch}
              className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 w-full transition-colors duration-200 ease-in-out mt-2"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>

     {/* Display Competitor Results */}
<div className="flex flex-wrap gap-4 w-[90%] justify-center py-8">
  {competitors.map((competitor, index) => (
    <div
      key={index}
      className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg shadow-lg p-6 w-[20rem] transform hover:scale-105 transition-transform duration-200 ease-out"
    >
      <h3 className="text-xl font-bold text-white mb-2">
        {competitor.name || "Business Name"}
      </h3>
      <p className="text-sm text-gray-400">
        {competitor.full_address || "Address not available"}
      </p>
      <p className="text-sm text-gray-400">
        Rating: {competitor.rating || "N/A"}
      </p>
      <p className="text-sm text-gray-400">
        Reviews: {competitor.review_count || "N/A"}
      </p>
    </div>
  ))}
</div>

    </div>
  );
}

export default CompetitorSearch;
