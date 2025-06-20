import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink } from 'lucide-react';

interface Article {
  id: number;
  source_id: string;
  source_name: string;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: Date;
  content: string;
  biasScore: number;
  topic: string;
  hasAnalysis: boolean;
}

interface ArticleCardProps {
  article: Article;
  onViewArticle: (articleId: number) => void;
}

const getBiasLabel = (score: number) => {
  if (score < 30) return { label: 'Neutral', color: 'bg-green-100 text-green-800' };
  if (score < 60) return { label: 'Moderate', color: 'bg-yellow-100 text-yellow-800' };
  return { label: 'High Bias', color: 'bg-red-100 text-red-800' };
};

const ArticleCard = ({ article, onViewArticle }: ArticleCardProps) => {
  const biasInfo = getBiasLabel(article.biasScore);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      {article.urlToImage && (
        <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
          <img 
            src={article.urlToImage} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
      
        <CardTitle className="text-lg leading-tight line-clamp-2">
          {article.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          {article.author && (
            <span>By {article.author}</span>
          )}
        </div>
        
        <div className="space-y-2">
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => onViewArticle(article.id)}
            >
              {article.hasAnalysis ? 'View Analysis' : 'Create Analysis'}
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
