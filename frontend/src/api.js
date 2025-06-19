import axios from "axios";

// Base URL: use env var if set, fallback to localhost
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// List articles with optional filters: { topic, date_from }
export const listArticles = (filters = {}) =>
  api.get("/articles", { params: filters }).then(res => res.data);

// Get a single article by ID
export const getArticle = (id) =>
  api.get(`/articles/${id}`).then(res => res.data);

// Analyze raw text or existing article:
// - provide { text } for freeform
// - or pass article_id as query param: /analyze?article_id=123
export const analyze = ({ text, article_id } = {}) =>
  api
    .post(`/analyze${article_id ? `?article_id=${article_id}` : ""}`, { text })
    .then(res => res.data);

export default api;