import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, Send, Bot, Download, Save } from 'lucide-react';
import { Node, Tool } from '../types';
import { getAllTools } from '../utils/tools';

interface DocumentationPanelProps {
  documentation: string;
  onDocumentationChange: (doc: string) => void;
  onNodesGenerate: (nodes: Node[]) => void;
}

const DocumentationPanel: React.FC<DocumentationPanelProps> = ({
  documentation,
  onDocumentationChange,
  onNodesGenerate,
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'ai'>('edit');
  const [aiInput, setAiInput] = useState('');
  const [aiMessages, setAiMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: '👋 Hi! I can help you generate diagrams and documentation. Try asking me:\n\n• "Design a scalable e-commerce infrastructure"\n• "Create a microservices architecture"\n• "Build a cloud-native application setup"\n• "Design a Kubernetes deployment"\n\nI\'ll create the nodes on your canvas automatically!'
    }
  ]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const generateInfrastructure = (prompt: string): { nodes: Node[], documentation: string } => {
    const allTools = getAllTools();
    const nodes: Node[] = [];
    let documentation = '';

    const promptLower = prompt.toLowerCase();

    if (promptLower.includes('e-commerce') || promptLower.includes('ecommerce')) {
      // E-commerce architecture
      const positions = [
        { x: 100, y: 100 }, { x: 300, y: 100 }, { x: 500, y: 100 },
        { x: 100, y: 250 }, { x: 300, y: 250 }, { x: 500, y: 250 },
        { x: 100, y: 400 }, { x: 300, y: 400 }, { x: 500, y: 400 }
      ];

      const ecommerceNodes = [
        { tool: 'load-balancer', label: 'Load Balancer', pos: 0 },
        { tool: 'api-gateway', label: 'API Gateway', pos: 1 },
        { tool: 'cdn', label: 'CDN', pos: 2 },
        { tool: 'aws-ec2', label: 'Web Servers', pos: 3 },
        { tool: 'aws-lambda', label: 'Order Service', pos: 4 },
        { tool: 'aws-lambda', label: 'Payment Service', pos: 5 },
        { tool: 'entity', label: 'User DB', pos: 6 },
        { tool: 'entity', label: 'Product DB', pos: 7 },
        { tool: 'message-queue', label: 'Message Queue', pos: 8 }
      ];

      ecommerceNodes.forEach(({ tool, label, pos }) => {
        const toolData = allTools.find(t => t.id === tool);
        if (toolData) {
          nodes.push({
            id: `node-${Date.now()}-${pos}`,
            type: toolData.id,
            category: toolData.category,
            position: positions[pos],
            size: { width: 140, height: 70 },
            label,
            style: {
              backgroundColor: toolData.color + '20',
              borderColor: toolData.color,
              color: '#ffffff',
            },
          });
        }
      });

      documentation = `# E-commerce Infrastructure Architecture

## Overview
Scalable e-commerce platform designed for high availability and performance.

## Components

### Frontend Layer
- **CDN**: Global content delivery for static assets
- **Load Balancer**: Distributes traffic across web servers

### Application Layer
- **API Gateway**: Central entry point for all API requests
- **Web Servers**: Handle user interface and business logic
- **Microservices**: Order and Payment processing services

### Data Layer
- **User Database**: Customer profiles and authentication
- **Product Database**: Catalog and inventory management
- **Message Queue**: Asynchronous processing and notifications

## Scalability Features
- Auto-scaling web servers
- Database read replicas
- Caching layers
- Microservices architecture`;

    } else if (promptLower.includes('microservices')) {
      // Microservices architecture
      const positions = [
        { x: 200, y: 80 }, { x: 100, y: 200 }, { x: 300, y: 200 },
        { x: 500, y: 200 }, { x: 100, y: 350 }, { x: 300, y: 350 },
        { x: 500, y: 350 }
      ];

      const microservicesNodes = [
        { tool: 'api-gateway', label: 'API Gateway', pos: 0 },
        { tool: 'aws-lambda', label: 'User Service', pos: 1 },
        { tool: 'aws-lambda', label: 'Product Service', pos: 2 },
        { tool: 'aws-lambda', label: 'Order Service', pos: 3 },
        { tool: 'entity', label: 'User DB', pos: 4 },
        { tool: 'entity', label: 'Product DB', pos: 5 },
        { tool: 'message-queue', label: 'Event Bus', pos: 6 }
      ];

      microservicesNodes.forEach(({ tool, label, pos }) => {
        const toolData = allTools.find(t => t.id === tool);
        if (toolData) {
          nodes.push({
            id: `node-${Date.now()}-${pos}`,
            type: toolData.id,
            category: toolData.category,
            position: positions[pos],
            size: { width: 140, height: 70 },
            label,
            style: {
              backgroundColor: toolData.color + '20',
              borderColor: toolData.color,
              color: '#ffffff',
            },
          });
        }
      });

      documentation = `# Microservices Architecture

## Overview
Distributed system architecture with loosely coupled services.

## Services

### API Gateway
- Request routing and load balancing
- Authentication and authorization
- Rate limiting and monitoring

### Core Services
- **User Service**: Account management and profiles
- **Product Service**: Catalog and inventory
- **Order Service**: Order processing and fulfillment

### Data Management
- Database per service pattern
- Event-driven communication
- Eventual consistency model

## Benefits
- Independent deployment and scaling
- Technology diversity
- Fault isolation
- Team autonomy`;

    } else if (promptLower.includes('kubernetes') || promptLower.includes('k8s')) {
      // Kubernetes architecture
      const positions = [
        { x: 150, y: 80 }, { x: 350, y: 80 }, { x: 100, y: 200 },
        { x: 300, y: 200 }, { x: 500, y: 200 }, { x: 200, y: 350 }
      ];

      const k8sNodes = [
        { tool: 'load-balancer', label: 'Ingress', pos: 0 },
        { tool: 'service', label: 'Service', pos: 1 },
        { tool: 'deployment', label: 'Frontend', pos: 2 },
        { tool: 'deployment', label: 'Backend', pos: 3 },
        { tool: 'pod', label: 'Database', pos: 4 },
        { tool: 'message-queue', label: 'ConfigMap', pos: 5 }
      ];

      k8sNodes.forEach(({ tool, label, pos }) => {
        const toolData = allTools.find(t => t.id === tool);
        if (toolData) {
          nodes.push({
            id: `node-${Date.now()}-${pos}`,
            type: toolData.id,
            category: toolData.category,
            position: positions[pos],
            size: { width: 140, height: 70 },
            label,
            style: {
              backgroundColor: toolData.color + '20',
              borderColor: toolData.color,
              color: '#ffffff',
            },
          });
        }
      });

      documentation = `# Kubernetes Deployment Architecture

## Overview
Container orchestration platform for scalable applications.

## Components

### Ingress Layer
- **Ingress Controller**: External traffic routing
- **Load Balancer**: Traffic distribution

### Application Layer
- **Services**: Internal service discovery
- **Deployments**: Application workload management
- **Pods**: Container runtime environment

### Configuration
- **ConfigMaps**: Application configuration
- **Secrets**: Sensitive data management
- **Persistent Volumes**: Data storage

## Features
- Auto-scaling and self-healing
- Rolling updates and rollbacks
- Service mesh integration
- Multi-environment support`;

    } else {
      // Generic cloud infrastructure
      const positions = [
        { x: 100, y: 100 }, { x: 300, y: 100 }, { x: 500, y: 100 },
        { x: 200, y: 250 }, { x: 400, y: 250 }, { x: 300, y: 400 }
      ];

      const genericNodes = [
        { tool: 'load-balancer', label: 'Load Balancer', pos: 0 },
        { tool: 'aws-ec2', label: 'App Servers', pos: 1 },
        { tool: 'cdn', label: 'CDN', pos: 2 },
        { tool: 'entity', label: 'Database', pos: 3 },
        { tool: 'aws-s3', label: 'File Storage', pos: 4 },
        { tool: 'firewall', label: 'Security', pos: 5 }
      ];

      genericNodes.forEach(({ tool, label, pos }) => {
        const toolData = allTools.find(t => t.id === tool);
        if (toolData) {
          nodes.push({
            id: `node-${Date.now()}-${pos}`,
            type: toolData.id,
            category: toolData.category,
            position: positions[pos],
            size: { width: 140, height: 70 },
            label,
            style: {
              backgroundColor: toolData.color + '20',
              borderColor: toolData.color,
              color: '#ffffff',
            },
          });
        }
      });

      documentation = `# Cloud Infrastructure Architecture

## Overview
Modern cloud-native infrastructure for scalable applications.

## Components

### Frontend
- **CDN**: Global content delivery network
- **Load Balancer**: High availability traffic distribution

### Compute
- **Application Servers**: Scalable compute instances
- **Auto-scaling**: Dynamic resource allocation

### Storage
- **Database**: Managed database service
- **File Storage**: Object storage for assets

### Security
- **Firewall**: Network security and access control
- **SSL/TLS**: Encrypted data transmission

## Best Practices
- Infrastructure as Code
- Monitoring and logging
- Backup and disaster recovery
- Cost optimization`;
    }

    return { nodes, documentation };
  };
  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: aiInput
    };

    // Generate infrastructure based on the prompt
    const { nodes, documentation: generatedDocs } = generateInfrastructure(aiInput);
    
    // Add nodes to canvas
    if (nodes.length > 0) {
      onNodesGenerate(nodes);
    }
    
    // Update documentation
    if (generatedDocs) {
      onDocumentationChange(generatedDocs);
    }

    const assistantMessage = {
      id: Date.now() + 1,
      type: 'assistant',
      content: `✨ I've generated a ${aiInput.toLowerCase().includes('e-commerce') ? 'scalable e-commerce' : 
                                    aiInput.toLowerCase().includes('microservices') ? 'microservices' :
                                    aiInput.toLowerCase().includes('kubernetes') ? 'Kubernetes' : 'cloud'} architecture for you!\n\n🎯 **What I created:**\n• ${nodes.length} infrastructure components on your canvas\n• Complete documentation with architecture overview\n• Best practices and scalability considerations\n\nYou can now:\n• Drag nodes to reposition them\n• Connect components with arrows\n• Edit the documentation as needed\n• Ask me to modify or extend the architecture!`
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