import React, { useState } from 'react';
import { Wand2, CheckCircle, AlertCircle, TrendingUp, Lightbulb } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const PromptOptimizer = ({ isOpen, onClose, onOptimizedPrompt, initialPrompt = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const analyzePrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis (in real implementation, this would call your AI service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAnalysis = {
        score: Math.floor(Math.random() * 30) + 70, // 70-100
        strengths: [
          'Clear and specific request',
          'Good context provided',
          'Appropriate tone'
        ],
        weaknesses: [
          'Could be more specific about desired output format',
          'Missing context about target audience',
          'Could benefit from examples'
        ],
        suggestions: [
          'Add specific formatting requirements',
          'Include target audience details',
          'Provide an example of desired output',
          'Use more descriptive language'
        ],
        optimizedPrompt: generateOptimizedPrompt(prompt),
        categories: ['Clarity', 'Specificity', 'Context', 'Structure']
      };
      
      setAnalysis(mockAnalysis);
    } catch (error) {
      console.error('Error analyzing prompt:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateOptimizedPrompt = (originalPrompt) => {
    // Simple optimization logic (in real implementation, this would use AI)
    let optimized = originalPrompt;
    
    if (!optimized.includes('Please')) {
      optimized = 'Please ' + optimized.toLowerCase();
    }
    
    if (!optimized.includes('specific') && !optimized.includes('detailed')) {
      optimized += ' Please provide a detailed and specific response.';
    }
    
    if (!optimized.includes('format')) {
      optimized += ' Format the response clearly with bullet points or numbered lists where appropriate.';
    }
    
    return optimized;
  };

  const useOptimizedPrompt = () => {
    if (analysis?.optimizedPrompt) {
      onOptimizedPrompt(analysis.optimizedPrompt);
      onClose();
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return isDark ? 'text-green-400' : 'text-green-600';
    if (score >= 80) return isDark ? 'text-yellow-400' : 'text-yellow-600';
    if (score >= 70) return isDark ? 'text-orange-400' : 'text-orange-600';
    return isDark ? 'text-red-400' : 'text-red-600';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className={`w-full max-w-5xl h-[95vh] sm:h-[90vh] rounded-lg sm:rounded-xl shadow-2xl ${
        isDark ? 'bg-[#0f1318] border border-[#00ff9540]' : 'bg-white border border-emerald-100'
      } flex flex-col overflow-hidden`}>
        
        {/* Header */}
        <div className={`p-3 sm:p-6 border-b ${
          isDark ? 'border-[#00ff9520]' : 'border-emerald-100'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Wand2 className={`w-5 h-5 sm:w-6 sm:h-6 ${isDark ? 'text-[#00ff95]' : 'text-emerald-600'}`} />
              <h2 className={`text-lg sm:text-xl font-semibold ${
                isDark ? 'text-[#00ff95]' : 'text-emerald-600'
              }`}>
                Prompt Optimizer
              </h2>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${
                isDark 
                  ? 'hover:bg-[#00ff9520] text-gray-400 hover:text-[#00ff95]' 
                  : 'hover:bg-emerald-50 text-gray-600 hover:text-emerald-600'
              }`}
            >
              ✕
            </button>
          </div>
          <p className={`mt-2 text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Improve your prompts with AI-powered analysis and suggestions
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 h-full">
            
            {/* Input Section */}
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-[#00ff95]' : 'text-emerald-700'
                }`}>
                  Your Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt here for analysis and optimization..."
                  className={`w-full h-32 sm:h-40 p-3 sm:p-4 rounded-lg border resize-none text-sm sm:text-base ${
                    isDark
                      ? 'bg-[#0a0c10] border-[#00ff9520] text-gray-200 placeholder-gray-500 focus:border-[#00ff95]'
                      : 'bg-white border-emerald-200 text-gray-900 placeholder-gray-400 focus:border-emerald-500'
                  } focus:ring-2 focus:ring-opacity-20 focus:outline-none`}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-xs ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {prompt.length}/1000 characters
                  </span>
                </div>
              </div>

              <button
                onClick={analyzePrompt}
                disabled={!prompt.trim() || isAnalyzing}
                className={`w-full py-2 sm:py-3 px-4 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  isDark
                    ? 'bg-[#00ff95] hover:bg-[#00ff95]/90 text-black disabled:bg-gray-700 disabled:text-gray-500'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white disabled:bg-gray-300 disabled:text-gray-500'
                } disabled:cursor-not-allowed`}
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin" />
                    Analyzing...
                  </div>
                ) : (
                  'Analyze & Optimize'
                )}
              </button>
            </div>

            {/* Analysis Results */}
            <div className="space-y-3 sm:space-y-4">
              {analysis ? (
                <>
                  {/* Score */}
                  <div className={`p-3 sm:p-4 rounded-lg ${
                    isDark ? 'bg-[#0a0c10]' : 'bg-emerald-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-medium text-sm sm:text-base ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Prompt Score
                      </span>
                      <span className={`text-xl sm:text-2xl font-bold ${getScoreColor(analysis.score)}`}>
                        {analysis.score}/100
                      </span>
                    </div>
                    <div className={`w-full bg-gray-200 rounded-full h-2 ${
                      isDark ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          analysis.score >= 90 ? 'bg-green-500' :
                          analysis.score >= 80 ? 'bg-yellow-500' :
                          analysis.score >= 70 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${analysis.score}%` }}
                      />
                    </div>
                  </div>

                  {/* Strengths */}
                  <div>
                    <h4 className={`font-medium mb-2 flex items-center gap-2 text-sm sm:text-base ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    }`}>
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      Strengths
                    </h4>
                    <ul className="space-y-1">
                      {analysis.strengths.map((strength, index) => (
                        <li key={index} className={`text-xs sm:text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          • {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Suggestions */}
                  <div>
                    <h4 className={`font-medium mb-2 flex items-center gap-2 text-sm sm:text-base ${
                      isDark ? 'text-yellow-400' : 'text-yellow-600'
                    }`}>
                      <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4" />
                      Suggestions
                    </h4>
                    <ul className="space-y-1">
                      {analysis.suggestions.map((suggestion, index) => (
                        <li key={index} className={`text-xs sm:text-sm ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          • {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Optimized Prompt */}
                  <div>
                    <h4 className={`font-medium mb-2 flex items-center gap-2 text-sm sm:text-base ${
                      isDark ? 'text-[#00ff95]' : 'text-emerald-600'
                    }`}>
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      Optimized Prompt
                    </h4>
                    <div className={`p-3 sm:p-4 rounded-lg border ${
                      isDark
                        ? 'bg-[#0a0c10] border-[#00ff9520]'
                        : 'bg-emerald-50 border-emerald-200'
                    }`}>
                      <p className={`text-xs sm:text-sm mb-3 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {analysis.optimizedPrompt}
                      </p>
                      <button
                        onClick={useOptimizedPrompt}
                        className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium ${
                          isDark
                            ? 'bg-[#00ff95] hover:bg-[#00ff95]/90 text-black'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        } transition-colors`}
                      >
                        Use This Prompt
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className={`flex flex-col items-center justify-center h-full text-center p-4 ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  <Wand2 className="w-8 h-8 sm:w-12 sm:h-12 mb-4 opacity-50" />
                  <p className="text-sm sm:text-base">Enter a prompt and click "Analyze & Optimize" to get AI-powered suggestions</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptOptimizer;
