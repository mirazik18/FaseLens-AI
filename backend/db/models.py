from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ArticleInDB(BaseModel):
    id: Optional[int]
    source_id: Optional[str]
    source_name: str
    author: Optional[str]
    title: str
    description: Optional[str]
    url: str
    urlToImage: Optional[str]
    publishedAt: datetime
    content: Optional[str]
    hasAnalysis: Optional[bool] = False
class ArticleResponse(ArticleInDB):
    id: int

class AnalysisResponse(BaseModel):
    id: int
    article_id: int
    bias: str
    bias_confidence: float
    summary: str
    analyzedAt: datetime
    key_points: Optional[List[str]]

class IncomingArticle(BaseModel):
    source_id: Optional[str]
    source_name: str
    author: Optional[str]
    title: str
    description: Optional[str]
    url: str
    urlToImage: Optional[str]
    publishedAt: datetime
    content: Optional[str]
    hasAnalysis: Optional[bool] = False