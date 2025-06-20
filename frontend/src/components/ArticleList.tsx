import { Search } from 'lucide-react';
import ArticleCard from './ArticleCard';

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

interface ArticleListProps {
  articles: Article[];
  onViewArticle: (articleId: number) => void;
}

const ArticleList = ({ articles, onViewArticle }: ArticleListProps) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Search className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
        <p className="text-gray-600">Try adjusting your search terms or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map(article => (
        <ArticleCard
          key={article.id}
          article={article}
          onViewArticle={onViewArticle}
        />
      ))}
    </div>
  );
};

export default ArticleList;
