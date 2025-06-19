import os
import httpx
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from datetime import datetime
from typing import List
from pydantic import parse_obj_as
from db.models import ArticleInDB
from db.utils import upsert_articles
from dotenv import load_dotenv

load_dotenv()
NEWSAPI_KEY = os.getenv("NEWSAPI_KEY")

async def fetch_and_store():
    response = httpx.get(
        "https://newsapi.org/v2/top-headlines",
        params={"apiKey": NEWSAPI_KEY, "language": "en", "pageSize": 50}
    )
    data = response.json().get("articles", [])
    articles: List[ArticleInDB] = parse_obj_as(List[ArticleInDB], data)
    upsert_articles(articles)

scheduler = AsyncIOScheduler()
scheduler.add_job(fetch_and_store, "cron", day_of_week="mon", hour=0)
