import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getArticle, analyze, getAnalyses  } from '@/api'; 

import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ExternalLink, Calendar, User, AlertCircle, CheckCircle } from 'lucide-react';



const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isCreatingAnalysis, setIsCreatingAnalysis] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArticle(id);
        const analyses = await getAnalyses(id);
        const latest = analyses[0] || null;
  
        setArticle({
          ...data,
          analysis: latest
            ? {
                summary: latest.summary,
                key_points: latest.key_points,
                credibilityScore: latest.bias_confidence * 100,
                sourceVerification: 'Stored Analysis',
                bias: latest.bias,
                biasScore: latest.bias_confidence * 100 -10
              }
            : null,
          hasAnalysis: !!latest,
        });
      } catch (error) {
        console.error("Failed to fetch article or analysis", error);
      }
    };
  
    fetchData();
  }, [id]);

  const handleCreateAnalysis = async () => {
    setIsCreatingAnalysis(true);
    try {
      const data = await analyze({ article_id: article.id });
      setArticle(prev => ({
        ...prev,
        ...data,
        analysis: {
          summary: data.summary,
          key_points: data.key_points,
          credibilityScore: data.bias_confidence * 100, // mock logic
          sourceVerification: 'Auto-generated',
          bias: data.bias,
          biasScore: (data.bias_confidence * 100)
        },
        hasAnalysis: true
      }));
    } catch (error) {
      console.error("Analysis failed", error);
    }
    setIsCreatingAnalysis(false);
  };

  const getBiasLabel = (bias) => {
    if (!bias) return { label: 'Unknown', color: 'bg-gray-100 text-gray-800' };
  
    switch (bias.toLowerCase()) {
      case 'true':
        return { label: 'Factual', color: 'bg-green-100 text-green-800' };
      case 'misleading':
        return { label: 'Misleading', color: 'bg-yellow-100 text-yellow-800' };
      case 'false':
        return { label: 'False Information', color: 'bg-red-100 text-red-800' };
      default:
        return { label: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
            <Button onClick={() => navigate('/articles')} className="mt-4">
              Back to Articles
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const biasInfo = getBiasLabel(article.analysis?.bias);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          onClick={() => navigate('/articles')}
          variant="outline" 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Button>

        {/* Article Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">{article.source_name}</Badge>
              <Badge className={biasInfo.color}>
                {biasInfo.label}
              </Badge>
            </div>
            <CardTitle className="text-2xl leading-tight">
              {article.title}
            </CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-4">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
              {article.author && (
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {article.author}
                </span>
              )}
            </div>
          </CardHeader>
          
          {article.urlToImage && (
            <div className="px-6 pb-6">
              <img 
                src={article.urlToImage} 
                alt={article.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </Card>

        {/* Article Content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Article Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed mb-4">
              {article.description}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {article.content}
            </p>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button variant="outline" asChild>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read Original Article
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Bias Analysis</span>
              {!article.analysis && (
                <Button 
                  onClick={handleCreateAnalysis}
                  disabled={isCreatingAnalysis}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isCreatingAnalysis ? 'Creating Analysis...' : 'Create Analysis'}
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {article.analysis ? (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Political Bias Score</span>
                    <span className="text-sm text-gray-500">{article.analysis.biasScore}/100</span>
                  </div>
                  <Progress value={article.analysis.biasScore} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Credibility Score</span>
                    <span className="text-sm text-gray-500">{article.analysis.credibilityScore}/100</span>
                  </div>
                  <Progress value={article.analysis.credibilityScore} className="h-2" />
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Summary
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{article.analysis.summary}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <AlertCircle className="w-4 h-4 text-orange-600 mr-2" />
                    Key Findings
                  </h4>
                  <ul className="space-y-2">
                    {article.analysis.key_points.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Source Verification:</strong> {article.analysis.sourceVerification}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Available</h3>
                <p className="text-gray-600 mb-4">
                  This article hasn't been analyzed yet. Click "Create Analysis" to generate bias detection and credibility scoring.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;
