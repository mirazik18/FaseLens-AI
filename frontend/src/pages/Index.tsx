import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyzeSection from '@/components/AnalyzeSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield, TrendingUp, Zap, Users, Globe } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">
              AI-Powered News Analysis
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Detect Political Bias in
              <span className="text-blue-600 block">News Articles</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Whether you're reading something new or revisiting a published piece — we give you fast, 
              neutral analysis using advanced AI to help you stay informed with objective insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                Start Analyzing
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                View Sample Analysis
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Cards */}
        <div className="absolute top-20 left-10 hidden lg:block">
          <Card className="p-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
            <CardContent className="p-0 flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Neutral Bias</span>
            </CardContent>
          </Card>
        </div>
        
        <div className="absolute top-32 right-10 hidden lg:block">
          <Card className="p-4 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
            <CardContent className="p-0 flex items-center space-x-3">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">87% Accuracy</span>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FactLens?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our advanced AI technology provides comprehensive analysis to help you understand 
              the full context of any news article.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Bias Detection</h3>
                <p className="text-gray-600">
                  Identify political leanings and subjective language in news articles with 
                  our sophisticated AI analysis engine.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Analysis</h3>
                <p className="text-gray-600">
                  Get comprehensive analysis results in seconds. Simply paste your article 
                  and receive detailed insights immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-purple-50 to-white">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Neutral Summaries</h3>
                <p className="text-gray-600">
                  Receive objective summaries that present facts without political spin, 
                  helping you form your own informed opinions.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-orange-50 to-white">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Credibility Scoring</h3>
                <p className="text-gray-600">
                  Evaluate source reliability and fact-checking accuracy to help you 
                  assess the trustworthiness of information.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-teal-50 to-white">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Multiple Perspectives</h3>
                <p className="text-gray-600">
                  Understand how the same story might be presented differently across 
                  various news sources and political viewpoints.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-indigo-50 to-white">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Coverage</h3>
                <p className="text-gray-600">
                  Analyze articles from news sources worldwide, understanding regional 
                  biases and cultural perspectives in reporting.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Analyze Section */}
      <AnalyzeSection />

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-blue-100">Articles Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">87%</div>
              <div className="text-blue-100">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">Available Analysis</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;