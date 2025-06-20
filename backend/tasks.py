import logging
import os
from fastapi import logger
import httpx
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from datetime import datetime
from typing import List
from pydantic import parse_obj_as, ValidationError
from db.models import ArticleInDB, IncomingArticle
from db.utils import transform_article, upsert_articles
from dotenv import load_dotenv
from newspaper import fulltext, Article

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
load_dotenv()
NEWSAPI_KEY = os.getenv("NEWSAPI_KEY")

async def fetch_and_store():
    response = httpx.get(
        "https://newsapi.org/v2/top-headlines",
        params={"apiKey": NEWSAPI_KEY, "language": "en", "pageSize": 5}
    )

    articles_data = response.json().get("articles", [])
    transformed = []

    for raw in articles_data:
        try:
            transformed_article = transform_article(raw)

            # Try to get full content from the URL
            if raw.get("url"):
                article = Article(raw["url"], language='en')
                article.download()
                article.parse()
                transformed_article["content"] = article.text.strip() or raw.get("content")
        except Exception as e:
            logger.warning(f"Failed to fetch full content for {raw.get('url')}: {e}")
            transformed_article["content"] = raw.get("content")

        transformed.append(transformed_article)

    articles = [IncomingArticle(**item) for item in transformed]
    upsert_articles(articles)
    logger.info(f"Stored {len(articles)} articles.")

scheduler = AsyncIOScheduler()
scheduler.add_job(fetch_and_store, "cron", day_of_week="thu", hour=18)
