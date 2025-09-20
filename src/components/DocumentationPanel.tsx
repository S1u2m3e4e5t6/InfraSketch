import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, Send, Bot, Download, Save } from 'lucide-react';

interface DocumentationPanelProps {
  documentation: string;
  onDocumentationChange: (doc: string) => void;
}

const DocumentationPanel: React.FC<DocumentationPanelProps> = ({
  documentation,
  onDocumentationChange,
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'ai'>('edit');
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: '👋 Hi! I can help you generate diagrams and documentation. Try asking me to "Generate a scalable e-commerce architecture" or "Create documentation for a microservices setup".'
    }
  ]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: aiInput
    };

    const assistantMessage = {
      id: Date.now() + 1,
      type: 'assistant',
      content: `I'll help you with "${aiInput}". Here's a suggested approach:\n\n1. **Architecture Overview**: Start with the main components\n2. **Data Flow**: Define how information moves through the system\n3. **Security Considerations**: Implement proper authentication and authorization\n4. **Scalability**: Consider load balancing and caching strategies\n\nWould you like me to generate specific nodes for your diagram?`
    };

    setAiMessages(prev => [...prev, userMessage, assistantMessage]);
    setAiInput('');
  };

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = documentation.substring(0, start) + text + documentation.substring(end);
    
    onDocumentationChange(newText);
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + text.length;
      textarea.focus();
    }, 0);
  };

  const renderMarkdown = (text: string) => {
    // Simple markdown rendering for demonstration
    return text
      .replace(/#{3} (.*)/g, '<h3 class="text-lg font-semibold text-white mt-4 mb-2">$1</h3>')
      .replace(/#{2} (.*)/g, '<h2 class="text-xl font-semibold text-white mt-6 mb-3">$1</h2>')
      .replace(/#{1} (.*)/g, '<h1 class="text-2xl font-bold text-white mt-8 mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-white/90">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-800 px-1 py-0.5 rounded text-green-400 font-mono text-sm">$1</code>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="w-96 bg-white/10 backdrop-blur-sm border-l border-white/20 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab('edit')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'edit'
                ? 'bg-blue-500 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-1" />
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'preview'
                ? 'bg-blue-500 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'ai'
                ? 'bg-purple-500 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Bot className="w-4 h-4 inline mr-1" />
            AI
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'edit' && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-white/20">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-white">Documentation</h3>
                <div className="flex space-x-2">
                  <motion.button
                    className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Save className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {['# Heading', '## Subheading', '**Bold**', '*Italic*', '`Code`'].map((template) => (
                  <button
                    key={template}
                    onClick={() => insertAtCursor(template + ' ')}
                    className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs text-white/80 transition-all"
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              ref={textareaRef}
              value={documentation}
              onChange={(e) => onDocumentationChange(e.target.value)}
              placeholder="Write your documentation here using Markdown..."
              className="flex-1 p-4 bg-transparent text-white placeholder-white/50 resize-none border-none focus:outline-none font-mono text-sm"
              spellCheck={false}
            />
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="h-full overflow-y-auto p-4">
            {documentation ? (
              <div 
                className="prose prose-invert max-w-none text-sm text-white/90 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(documentation) }}
              />
            ) : (
              <div className="text-center text-white/50 mt-8">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No documentation yet.</p>
                <p className="text-sm mt-2">Switch to Edit tab to start writing.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {aiMessages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white ml-4'
                        : 'bg-white/10 text-white/90 mr-4'
                    }`}
                  >
                    {message.type === 'assistant' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-white/70 font-medium">AI Assistant</span>
                      </div>
                    )}
                    <p className="whitespace-pre-line">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <form onSubmit={handleAiSubmit} className="p-4 border-t border-white/20">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Ask AI to generate diagrams or documentation..."
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm focus:outline-none focus:border-purple-400"
                />
                <motion.button
                  type="submit"
                  className="p-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!aiInput.trim()}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentationPanel;