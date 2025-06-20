from fastapi import FastAPI
from contextlib import asynccontextmanager
from api.routes import router as api_router
from tasks import scheduler
from fastapi.middleware.cors import CORSMiddleware
import torch
from transformers import pipeline

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load Hugging Face pipelines once on startup
    device = 0 if torch.cuda.is_available() else -1
    app.state.bias_classifier = pipeline(
        "zero-shot-classification",
        model="facebook/bart-large-mnli",
        device=device
    )
    
    app.state.summarizer = pipeline(
        "summarization",
        model="facebook/bart-large-cnn",
        device=device
    )
    # Start scheduled tasks
    scheduler.start()
    yield
    # Shutdown scheduler on app termination
    scheduler.shutdown()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",   # your Vite dev server
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")
