import React, { useState } from 'react';
import { 
  Wand2, 
  Image, 
  Video, 
  Mic, 
  Code, 
  Briefcase, 
  Search, 
  TrendingUp, 
  Users,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AIToolsPanel = ({ isOpen, onClose, onToolSelect }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toolCategories = [
    { id: 'all', name: 'All Tools', icon: Sparkles },
    { id: 'text', name: 'Text Generation', icon: Wand2 },
    { id: 'image', name: 'Image Generation', icon: Image },
    { id: 'video', name: 'Video Generation', icon: Video },
    { id: 'audio', name: 'Audio Tools', icon: Mic },
    { id: 'development', name: 'Development', icon: Code },
    { id: 'productivity', name: 'Productivity', icon: Briefcase },
    { id: 'research', name: 'Research', icon: Search },
    { id: 'marketing', name: 'Marketing', icon: TrendingUp },
    { id: 'job', name: 'Job Search', icon: Users },
  ];

  const aiTools = [
    {
      id: 'prompt-optimizer',
      name: 'Prompt Optimizer',
      description: 'Enhance your prompts with AI-powered analysis and suggestions',
      category: 'text',
      action: 'optimize-prompt',
      icon: '🧠',
      integrated: true
    },
    {
      id: 'image-generator',
      name: 'AI Image Generator',
      description: 'Create stunning images from text descriptions',
      category: 'image',
      action: 'generate-image',
      icon: '🎨',
      integrated: true
    },
    {
      id: 'code-assistant',
      name: 'Code Assistant',
      description: 'Get help with coding, debugging, and code review',
      category: 'development',
      action: 'code-help',
      icon: '💻',
      integrated: true
    },
    {
      id: 'text-summarizer',
      name: 'Text Summarizer',
      description: 'Summarize long texts and documents',
      category: 'productivity',
      action: 'summarize-text',
      icon: '📄',
      integrated: true
    },
    {
      id: 'research-assistant',
      name: 'Research Assistant',
      description: 'Help with research, fact-checking, and analysis',
      category: 'research',
      action: 'research-help',
      icon: '🔍',
      integrated: true
    },
    {
      id: 'content-writer',
      name: 'Content Writer',
      description: 'Create engaging content for blogs, social media, and marketing',
      category: 'marketing',
      action: 'content-writing',
      icon: '✍️',
      integrated: true
    },
    {
      id: 'resume-builder',
      name: 'Resume Builder',
      description: 'Create professional resumes and cover letters',
      category: 'job',
      action: 'resume-help',
      icon: '📝',
      integrated: true
    },
    {
      id: 'email-assistant',
      name: 'Email Assistant',
      description: 'Compose professional emails and responses',
      category: 'productivity',
      action: 'email-help',
      icon: '📧',
      integrated: true
    }
  ];

  const filteredTools = selectedCategory === 'all' 
    ? aiTools 
    : aiTools.filter(tool => tool.category === selectedCategory);

  const handleToolClick = (tool) => {
    onToolSelect(tool);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-4xl h-[90vh] rounded-xl shadow-2xl ${
        isDark ? 'bg-[#0f1318] border border-[#00ff9540]' : 'bg-white border border-emerald-100'
      } flex flex-col overflow-hidden`}>
        
        {/* Header */}
        <div className={`p-6 border-b ${
          isDark ? 'border-[#00ff9520]' : 'border-emerald-100'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className={`w-6 h-6 ${isDark ? 'text-[#00ff95]' : 'text-emerald-600'}`} />
              <h2 className={`text-xl font-semibold ${
                isDark ? 'text-[#00ff95]' : 'text-emerald-600'
              }`}>
                AI Tools Galaxy
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
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Discover and use AI tools to enhance your workflow and productivity
          </p>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Categories Sidebar */}
          <div className={`w-64 border-r ${
            isDark ? 'border-[#00ff9520] bg-[#0a0c10]' : 'border-emerald-100 bg-emerald-50'
          } p-4 overflow-y-auto`}>
            <h3 className={`text-sm font-medium mb-3 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Categories
            </h3>
            <div className="space-y-1">
              {toolCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? isDark
                          ? 'bg-[#00ff9520] text-[#00ff95]'
                          : 'bg-emerald-100 text-emerald-700'
                        : isDark
                        ? 'text-gray-400 hover:bg-[#00ff9510] hover:text-[#00ff95]'
                        : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm">{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTools.map((tool) => (
                <div
                  key={tool.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${
                    isDark
                      ? 'bg-[#0a0c10] border-[#00ff9520] hover:border-[#00ff95] hover:bg-[#0f1318]'
                      : 'bg-white border-emerald-100 hover:border-emerald-300 hover:shadow-emerald-50'
                  }`}
                  onClick={() => handleToolClick(tool)}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{tool.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className={`font-medium ${
                          isDark ? 'text-[#00ff95]' : 'text-emerald-700'
                        }`}>
                          {tool.name}
                        </h4>
                        {tool.integrated && (
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            isDark
                              ? 'bg-[#00ff9520] text-[#00ff95]'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            Integrated
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {tool.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isDark
                            ? 'bg-[#00ff9510] text-[#00ff95]'
                            : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {toolCategories.find(cat => cat.id === tool.category)?.name}
                        </span>
                        <ChevronRight className={`w-4 h-4 ${
                          isDark ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* External Links */}
            <div className="mt-8 pt-6 border-t border-opacity-20 border-current">
              <h4 className={`text-lg font-medium mb-4 ${
                isDark ? 'text-[#00ff95]' : 'text-emerald-700'
              }`}>
                Explore More Tools
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="https://aitoolsgalaxy.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-lg ${
                    isDark
                      ? 'bg-[#0a0c10] border-[#00ff9520] hover:border-[#00ff95]'
                      : 'bg-white border-emerald-100 hover:border-emerald-300'
                  }`}
                >
                  <div>
                    <h5 className={`font-medium ${
                      isDark ? 'text-[#00ff95]' : 'text-emerald-700'
                    }`}>
                      AI Tools Galaxy
                    </h5>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Discover more AI tools
                    </p>
                  </div>
                  <ExternalLink className={`w-5 h-5 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                </a>

                <a
                  href="https://promptelevate.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-lg ${
                    isDark
                      ? 'bg-[#0a0c10] border-[#00ff9520] hover:border-[#00ff95]'
                      : 'bg-white border-emerald-100 hover:border-emerald-300'
                  }`}
                >
                  <div>
                    <h5 className={`font-medium ${
                      isDark ? 'text-[#00ff95]' : 'text-emerald-700'
                    }`}>
                      Prompt Elevate
                    </h5>
                    <p className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      AI-powered prompt optimizer
                    </p>
                  </div>
                  <ExternalLink className={`w-5 h-5 ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIToolsPanel;
