import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000/api/analyze/";

export async function analyzeUrl(url) {
  const response = await axios.post(API_URL, { url });
  return response.data;
}