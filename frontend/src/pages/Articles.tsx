import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleFilters from '@/components/ArticleFilters';
import ArticleList from '@/components/ArticleList';
import { listArticles } from '@/api'; 
const Articles = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState(['all']);
  const [sources, setSources] = useState(['all']);

   // Fetch articles from backend
   useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await listArticles();
        setArticles(data);
        console.log(data);
        // Extract unique topics & sources
        const uniqueTopics = Array.from(new Set(data.map(a => a.topic).filter(Boolean))) as string[];
        const uniqueSources = Array.from(new Set(data.map(a => a.source_name).filter(Boolean))) as string[];

        setTopics(['all', ...uniqueTopics]);
        setSources(['all', ...uniqueSources]);
      } catch (error) {
        console.error("Failed to load articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = selectedTopic === 'all' || article.topic === selectedTopic;
    const matchesSource = selectedSource === 'all' || article.source_name === selectedSource;
    
    return matchesSearch && matchesTopic && matchesSource;
  });

  const handleViewArticle = (articleId: number) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Existing Articles</h1>
          <p className="text-gray-600">Browse and analyze previously processed news articles</p>
        </div>

        <ArticleFilters
          searchTerm={searchTerm}
          selectedTopic={selectedTopic}
          selectedSource={selectedSource}
          onSearchChange={setSearchTerm}
          onTopicChange={setSelectedTopic}
          onSourceChange={setSelectedSource}
        />

        <ArticleList
          articles={filteredArticles}
          onViewArticle={handleViewArticle}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Articles;
