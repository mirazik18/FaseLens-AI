import logging
from fastapi import APIRouter, HTTPException, Depends, Request
from typing import List, Optional
from datetime import datetime, timezone
from pydantic import BaseModel
from langchain_huggingface import HuggingFacePipeline
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from db.client import supabase_client
from db.models import ArticleResponse, AnalysisResponse, ArticleInDB

router = APIRouter()
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
# Dependency model for query params
class ArticleQuery(BaseModel):
    topic: Optional[str] = None
    date_from: Optional[datetime] = None
class AnalyzeRequest(BaseModel):
    text: Optional[str] = None

@router.get("/articles", response_model=List[ArticleResponse])
async def list_articles(query: ArticleQuery = Depends()):
    builder = supabase_client.table("articles")
    result = builder.select("*").execute()
    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to fetch articles")

    return result.data


@router.get("/articles/{article_id}", response_model=ArticleResponse)
async def get_article(article_id: int):
    res = supabase_client.table("articles").select("*").eq("id", article_id).single().execute()
    if res.error or not res.data:
        raise HTTPException(status_code=404, detail="Article not found")
    return ArticleResponse(**res.data)

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_article(
    request: Request,
    body: AnalyzeRequest,
    article_id: Optional[int] = None
):
    # Determine input text
    if article_id:
        res = supabase_client.table("articles").select("*").eq("id", article_id).single().execute()
        if res.error or not res.data:
            raise HTTPException(status_code=404, detail="Article not found")
        article = ArticleInDB(**res.data)
        text = " ".join(filter(None, [article.title, article.description, article.content]))
    elif body.text:
        article = None
        text = body.text
    else:
        raise HTTPException(status_code=400, detail="Provide article_id or raw text")

    # Run bias classification
    bias_classifier = request.app.state.bias_classifier
    bias_res = bias_classifier(text, candidate_labels=["True", "Misleading", "False"])
    predicted = bias_res["labels"][0]
    confidence = bias_res["scores"][0]

    # Summarization via LangChain pipeline
    summary_prompt = PromptTemplate(
        input_variables=["text"],
        template="Summarize the following text in a neutral manner with minimum of 80 words:{text}"
    )
    llm_summary = HuggingFacePipeline(
        pipeline=request.app.state.summarizer,
        model_kwargs={"min_length": 80, "max_length": 200,}
    )
    summary_chain = LLMChain(prompt=summary_prompt, llm=llm_summary)
    summary = summary_chain.predict(text=text)

    # Extract key points via LangChain
    keypoints_prompt = PromptTemplate(
        input_variables=["text"],
        template="Extract the 3 most important key points from the following text as a bullet list:{text}"
    ) 
    llm_keypoints = HuggingFacePipeline(
        pipeline=request.app.state.summarizer,
        model_kwargs={"max_length": 20}
    )
    keypoints_chain = LLMChain(prompt=keypoints_prompt, llm=llm_keypoints)
    raw_points = keypoints_chain.predict(text=text)
    # Split into list
    key_points = [sentence.strip() for sentence in raw_points.split('.') if sentence.strip()]
    logger.debug("key points:\n%s", key_points)
    # Store analysis if linked to an article
    if article:
        analysis_payload = {
            "article_id": article.id,
            "bias": predicted,
            "bias_confidence": confidence,
            "summary": summary,
            "key_points": key_points,
            "analyzedAt": datetime.now(timezone.utc).isoformat()
        }
        insert = supabase_client.table("analyses").insert(analysis_payload).execute()
        if insert.error:
            raise HTTPException(status_code=500, detail=insert.error.message)
        return AnalysisResponse(**insert.data[0])

    # Return ephemeral analysis
    return AnalysisResponse(
        id=-1,
        article_id=-1,
        bias=predicted,
        bias_confidence=confidence,
        summary=summary,
        key_points=key_points,
        analyzedAt=datetime.now(timezone.utc)
    )