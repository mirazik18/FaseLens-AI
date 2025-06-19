from typing import List

from fastapi import HTTPException

from db.client import supabase_client
from db.models import ArticleInDB


def upsert_articles(articles: List[ArticleInDB]):
    records = [article.dict(exclude_none=True) for article in articles]
    res = supabase_client.table("articles").upsert(records, on_conflict_columns=["url"]).execute()
    if res.error:
        raise HTTPException(status_code=500, detail=res.error.message)
