import axios from "axios";

const API_URL = "http://localhost:5000"; // Your backend URL

// Fetch all time tracking entries
export const fetchEntries = async () => {
  try {
    const response = await axios.get(`${API_URL}/time-tracking`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Add a new time tracking entry
export const addEntry = async (entryData) => {
  try {
    const response = await axios.post(`${API_URL}/time-tracking`, entryData);
    return response.data;
  } catch (error) {
    console.error("Error adding entry:", error);
    return null;
  }
};
