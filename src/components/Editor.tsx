import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Settings, Users } from 'lucide-react';
import ToolsPalette from './ToolsPalette';
import Canvas from './Canvas';
import DocumentationPanel from './DocumentationPanel';
import StarfallBackground from './StarfallBackground';
import { Node, Tool, Connection, Cursor, DiagramState } from '../types';

interface EditorProps {
  onBack: () => void;
}

const Editor: React.FC<EditorProps> = ({ onBack }) => {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  const [diagramState, setDiagramState] = useState<DiagramState>({
    nodes: [],
    connections: [],
    comments: [],
    cursors: [
      { id: '1', user: 'John Doe', position: { x: 400, y: 200 }, color: '#3B82F6' },
      { id: '2', user: 'Jane Smith', position: { x: 600, y: 350 }, color: '#10B981' },
    ],
    documentation: `# System Architecture Documentation

## Overview
This document describes the high-level architecture of our system.

## Components

### API Gateway
- Central entry point for all client requests
- Handles authentication and routing
- Rate limiting and monitoring

### Microservices
- User Service: Manages user accounts and profiles
- Product Service: Handles product catalog and inventory
- Order Service: Processes orders and payments

### Database Layer
- PostgreSQL for transactional data
- Redis for caching and sessions
- MongoDB for analytics data

## Security Considerations
- OAuth 2.0 for authentication
- JWT tokens for session management
- API rate limiting
- Input validation and sanitization`,
    zoomLevel: 1,
    panOffset: { x: 0, y: 0 },
  });

  const handleToolSelect = useCallback((tool: Tool) => {
    setSelectedTool(tool);
    setSelectedNodeId(null);
  }, []);

  const handleNodeAdd = useCallback((node: Node) => {
    setDiagramState(prev => ({
      ...prev,
      nodes: [...prev.nodes, node],
    }));
    setSelectedTool(null);
  }, []);

  const handleNodeUpdate = useCallback((updatedNode: Node) => {
    setDiagramState(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => 
        node.id === updatedNode.id ? updatedNode : node
      ),
    }));
  }, []);

  const handleNodeSelect = useCallback((nodeId: string | null) => {
    setSelectedNodeId(nodeId);
    setSelectedTool(null);
  }, []);

  const handleZoomChange = useCallback((zoom: number) => {
    setDiagramState(prev => ({ ...prev, zoomLevel: zoom }));
  }, []);

  const handlePanChange = useCallback((offset: { x: number; y: number }) => {
    setDiagramState(prev => ({ ...prev, panOffset: offset }));
  }, []);

  const handleDocumentationChange = useCallback((doc: string) => {
    setDiagramState(prev => ({ ...prev, documentation: doc }));
  }, []);

  return (
    <div className="h-screen overflow-hidden relative">
      <StarfallBackground />
      
      {/* Header */}
      <motion.header
        className="relative z-10 h-16 bg-white/10 backdrop-blur-sm border-b border-white/20 flex items-center justify-between px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={onBack}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-xl font-semibold text-white">InfraSketch Editor</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <motion.button
            className="flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="w-4 h-4" />
            <span>2 collaborators</span>
          </motion.button>
          <motion.button
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content - 3 Panel Layout */}
      <div className="relative z-10 h-[calc(100vh-4rem)] flex">
        {/* Left Sidebar - Tools Palette */}
        <motion.div
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <ToolsPalette
            onToolSelect={handleToolSelect}
            selectedTool={selectedTool}
          />
        </motion.div>

        {/* Center - Canvas */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Canvas
            nodes={diagramState.nodes}
            connections={diagramState.connections}
            cursors={diagramState.cursors}
            selectedTool={selectedTool}
            onNodeAdd={handleNodeAdd}
            onNodeUpdate={handleNodeUpdate}
            onNodeSelect={handleNodeSelect}
            selectedNodeId={selectedNodeId}
            zoomLevel={diagramState.zoomLevel}
            onZoomChange={handleZoomChange}
            panOffset={diagramState.panOffset}
            onPanChange={handlePanChange}
          />
        </motion.div>

        {/* Right Sidebar - Documentation */}
        <motion.div
          initial={{ x: 384, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <DocumentationPanel
            documentation={diagramState.documentation}
            onDocumentationChange={handleDocumentationChange}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Editor;