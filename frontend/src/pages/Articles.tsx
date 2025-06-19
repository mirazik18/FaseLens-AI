import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter, Calendar, ExternalLink } from 'lucide-react';

// Mock data - in real app this would come from your backend
const mockArticles = [
  {
    id: 1,
    source_id: "cnn",
    source_name: "CNN",
    author: "John Smith",
    title: "Climate Change Policies Show Promising Results in Latest Report",
    description: "New environmental data suggests recent policy changes are having a positive impact on carbon emissions.",
    url: "https://example.com/article1",
    urlToImage: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=400&h=200&fit=crop",
    publishedAt: new Date('2024-01-15'),
    content: "Recent studies show that environmental policies implemented last year are beginning to show measurable results...",
    biasScore: 45,
    topic: "Environment"
  },
  {
    id: 2,
    source_id: "fox",
    source_name: "Fox News",
    author: "Sarah Johnson",
    title: "Economic Growth Continues Despite Market Volatility",
    description: "Analysis of recent economic indicators shows sustained growth across multiple sectors.",
    url: "https://example.com/article2",
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
    publishedAt: new Date('2024-01-14'),
    content: "Economic data released this week indicates continued growth momentum despite recent market fluctuations...",
    biasScore: 68,
    topic: "Economy"
  },
  {
    id: 3,
    source_id: "reuters",
    source_name: "Reuters",
    author: "Michael Brown",
    title: "Healthcare Reform Proposal Gains Bipartisan Support",
    description: "New healthcare legislation receives unexpected support from both sides of the political aisle.",
    url: "https://example.com/article3",
    urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=200&fit=crop",
    publishedAt: new Date('2024-01-13'),
    content: "A new healthcare reform proposal has garnered support from lawmakers across party lines...",
    biasScore: 25,
    topic: "Healthcare"
  }
];

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');

  const topics = ['all', 'Environment', 'Economy', 'Healthcare', 'Politics', 'Technology'];
  const sources = ['all', 'CNN', 'Fox News', 'Reuters', 'BBC', 'Associated Press'];

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = selectedTopic === 'all' || article.topic === selectedTopic;
    const matchesSource = selectedSource === 'all' || article.source_name === selectedSource;
    
    return matchesSearch && matchesTopic && matchesSource;
  });

  const getBiasLabel = (score) => {
    if (score < 30) return { label: 'Neutral', color: 'bg-green-100 text-green-800' };
    if (score < 60) return { label: 'Moderate', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'High Bias', color: 'bg-red-100 text-red-800' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Existing Articles</h1>
          <p className="text-gray-600">Browse and analyze previously processed news articles</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filter Articles</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {topics.map(topic => (
                    <SelectItem key={topic} value={topic}>
                      {topic === 'all' ? 'All Topics' : topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSource} onValueChange={setSelectedSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {sources.map(source => (
                    <SelectItem key={source} value={source}>
                      {source === 'all' ? 'All Sources' : source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => {
            const biasInfo = getBiasLabel(article.biasScore);
            
            return (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
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
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{article.source_name}</Badge>
                    <Badge className={biasInfo.color}>
                      {biasInfo.label}
                    </Badge>
                  </div>
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
                      {article.publishedAt.toLocaleDateString()}
                    </span>
                    {article.author && (
                      <span>By {article.author}</span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Bias Score:</span>
                      <span className="font-medium">{article.biasScore}/100</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Analysis
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
          })}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Articles;