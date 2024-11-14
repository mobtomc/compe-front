import axios from "axios";

export const scrapeSite = (url) =>
  axios.post("http://127.0.0.1:8000/scrape/", { url });

export const analyzeData = (data) =>
  axios.post("http://127.0.0.1:8000/analyze/", { data });

export const getSuggestions = (data) =>
  axios.post("http://127.0.0.1:8000/suggestions/", { data });

export const searchCompetitors = async (businessType, location) => {
  const options = {
    method: "POST",
    url: "https://local-business-data.p.rapidapi.com/search",
    headers: {
      "x-rapidapi-key": "4899d0cf4amshf718985ca408012p1956e7jsn700070588f24",
      "x-rapidapi-host": "local-business-data.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      queries: [`${businessType} in ${location}`],
      limit: 5,
      region: "us",
      language: "en",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};

