import { useState } from 'react';
import api from "../api";   
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';

const AnalyzeSection = () => {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
        const res = await api.post("/analyze", { text: inputText });
        // res.data matches your AnalysisResponse model:
        // { id, article_id, bias, bias_confidence, summary, analyzedAt }
        setResults({
          biasScore: Math.round(res.data.bias_confidence * 100),
          biasDirection: res.data.bias,
          summary: res.data.summary,
          credibilityScore: null,               // you can add a separate score if you expose one
          key_points: res.data.key_points,                        // you can extend your API to return these
          sources: "N/A",                       // likewise
        });
      } catch (err) {
        console.error(err);
        alert("Analysis failed: " + (err.response?.data?.detail || err.message));
      } finally {
        setIsAnalyzing(false);
      }
    };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Analyze Any News Article
          </h2>
          <p className="text-lg text-gray-600">
            Paste your article text below and get instant bias detection and neutral analysis
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Article Analysis Tool</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your news article text here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={8}
              className="resize-none"
            />
            <Button 
              onClick={handleAnalyze}
              disabled={!inputText.trim() || isAnalyzing}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Article'}
            </Button>
          </CardContent>
        </Card>

        {results && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Analysis Results</span>
                  <Badge variant={results.biasScore > 60 ? 'destructive' : 'secondary'}>
                    {results.biasDirection}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Political Bias Score</span>
                    <span className="text-sm text-gray-500">{results.biasScore}/100</span>
                  </div>
                  <Progress value={results.biasScore} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Confidence Score</span>
                    <span className="text-sm text-gray-500">{results.credibilityScore}/100</span>
                  </div>
                  <Progress value={results.credibilityScore} className="h-2" />
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    Summary
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{results.summary}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <AlertCircle className="w-4 h-4 text-orange-600 mr-2" />
                    Key Findings
                  </h4>
                  <ul className="space-y-2">
                    {results.key_points.map((point, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Source Verification:</strong> {results.sources}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnalyzeSection;