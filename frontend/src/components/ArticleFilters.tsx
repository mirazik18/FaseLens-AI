import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { topics, sources } from '@/data/mockData';

interface ArticleFiltersProps {
  searchTerm: string;
  selectedTopic: string;
  selectedSource: string;
  onSearchChange: (value: string) => void;
  onTopicChange: (value: string) => void;
  onSourceChange: (value: string) => void;
}

const ArticleFilters = ({
  searchTerm,
  selectedTopic,
  selectedSource,
  onSearchChange,
  onTopicChange,
  onSourceChange
}: ArticleFiltersProps) => {
  return (
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
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedTopic} onValueChange={onTopicChange}>
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

          <Select value={selectedSource} onValueChange={onSourceChange}>
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
  );
};

export default ArticleFilters;
