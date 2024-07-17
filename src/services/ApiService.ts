import axios from "axios";
import University from "../models/University";

const API_URL =
  "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates";

const fetchUniversities = async (): Promise<University[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export { fetchUniversities };
