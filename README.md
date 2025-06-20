# FactLens: AI-Powered News Analysis Platform

FactLens is a full-stack AI-powered web application that fetches real-time news articles, analyzes their political bias and credibility using NLP models, and presents key insights through an interactive web interface.

## 🔍 Features

- **News Aggregation**: Pulls top headlines from [NewsAPI](https://newsapi.org/).
- **Bias & Credibility Analysis**: Uses a language model to generate summaries, key points, and bias/confidence scores.
- **Hugging Face Integration**: Supports external models for NLP tasks.
- **Interactive Frontend**: Built with Vite + React for a fast, responsive UI.
- **Backend API**: Built with FastAPI for scalable, async endpoints.
- **Database Storage**: Persists articles and analyses using Supabase (PostgreSQL).
- **Scheduler**: Periodic fetching and storage of new articles with APScheduler.

## 📦 Tech Stack

| Layer       | Technology            |
|-------------|------------------------|
| Frontend    | React + Vite + Tailwind |
| Backend     | FastAPI + Python       |
| ML/NLP      | Hugging Face Transformers, LangChain |
| Database    | Supabase (PostgreSQL) |
| Scheduler   | APScheduler            |
| News Feed   | NewsAPI.org            |

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/FactLens-AI.git
cd FactLens-AI
```

### 2. Backend Setup
```bash
Create a .env file in the backend/ directory:
NEWSAPI_KEY=your_newsapi_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_api_key

Install dependencies:
cd backend
pip install -r requirements.txt

Run the server:

bash
Copy
Edit
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
Create .env in frontend/:
env
Copy
Edit
VITE_API_BASE_URL=http://localhost:8000/api
Install and run:

bash
Copy
Edit
cd frontend
npm install
npm run dev
```
### 🧠 Example Output
Once an article is analyzed, you will see:

Political bias score (0–100)

Credibility score

AI-generated summary

Bullet-point key findings

Source verification label
