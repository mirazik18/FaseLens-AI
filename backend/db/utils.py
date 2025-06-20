from datetime import datetime
from typing import List

from fastapi import HTTPException

from db.client import supabase_client
from db.models import ArticleInDB


def upsert_articles(articles: List[ArticleInDB]):
    records = []
    for article in articles:
        record = article.dict(exclude_none=True)
        if isinstance(record.get("publishedAt"), datetime):
            record["publishedAt"] = record["publishedAt"].isoformat()
        records.append(record)

    res = supabase_client.table("articles").upsert(records, on_conflict=["url"]).execute()
    if not res.data:
        raise HTTPException(status_code=500, detail="Failed to upsert articles")
def transform_article(raw):
    return {
        "source_id": raw["source"].get("id"),
        "source_name": raw["source"].get("name"),
        "author": raw.get("author"),
        "title": raw.get("title"),
        "description": raw.get("description"),
        "url": raw.get("url"),
        "urlToImage": raw.get("urlToImage"),
        "publishedAt": raw.get("publishedAt"),  # ISO string from NewsAPI
        "content": raw.get("content"),
        "hasAnalysis": False
    }