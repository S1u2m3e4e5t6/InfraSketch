import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, Move, RotateCcw } from 'lucide-react';
import { Node, Tool, Connection, Cursor } from '../types';

interface CanvasProps {
  nodes: Node[];
  connections: Connection[];
  cursors: Cursor[];
  selectedTool: Tool | null;
  onNodeAdd: (node: Node) => void;
  onNodeUpdate: (node: Node) => void;
  onNodeSelect: (nodeId: string | null) => void;
  selectedNodeId: string | null;
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
  panOffset: { x: number; y: number };
  onPanChange: (offset: { x: number; y: number }) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  nodes,
  connections,
  cursors,
  selectedTool,
  onNodeAdd,
  onNodeUpdate,
  onNodeSelect,
  selectedNodeId,
  zoomLevel,
  onZoomChange,
  panOffset,
  onPanChange,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (!selectedTool || isPanning) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left - panOffset.x) / zoomLevel;
    const y = (e.clientY - rect.top - panOffset.y) / zoomLevel;

    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: selectedTool.id,
      category: selectedTool.category,
      position: { x, y },
      size: { width: 120, height: 60 },
      label: selectedTool.name,
      style: {
        backgroundColor: selectedTool.color + '20',
        borderColor: selectedTool.color,
        color: '#ffffff',
      },
    };

    onNodeAdd(newNode);
  }, [selectedTool, isPanning, panOffset, zoomLevel, onNodeAdd]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.ctrlKey)) { // Middle mouse or Ctrl+click
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return;

    const deltaX = e.clientX - lastPanPoint.x;
    const deltaY = e.clientY - lastPanPoint.y;

    onPanChange({
      x: panOffset.x + deltaX,
      y: panOffset.y + deltaY,
    });

    setLastPanPoint({ x: e.clientX, y: e.clientY });
  }, [isPanning, lastPanPoint, panOffset, onPanChange]);

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newZoom = Math.max(0.1, Math.min(3, zoomLevel + delta));
      onZoomChange(newZoom);
    }
  }, [zoomLevel, onZoomChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const toolData = e.dataTransfer.getData('application/json');
    
    if (!toolData) return;

    try {
      const tool: Tool = JSON.parse(toolData);
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = (e.clientX - rect.left - panOffset.x) / zoomLevel;
      const y = (e.clientY - rect.top - panOffset.y) / zoomLevel;

      const newNode: Node = {
        id: `node-${Date.now()}`,
        type: tool.id,
        category: tool.category,
        position: { x, y },
        size: { width: 120, height: 60 },
        label: tool.name,
        style: {
          backgroundColor: tool.color + '20',
          borderColor: tool.color,
          color: '#ffffff',
        },
      };

      onNodeAdd(newNode);
    } catch (error) {
      console.error('Failed to parse dropped tool:', error);
    }
  }, [panOffset, zoomLevel, onNodeAdd]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex-1 relative bg-slate-900/50 overflow-hidden">
      {/* Canvas Controls */}
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <motion.button
          onClick={() => onZoomChange(Math.min(3, zoomLevel + 0.2))}
          className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ZoomIn className="w-4 h-4" />
        </motion.button>
        <motion.button
          onClick={() => onZoomChange(Math.max(0.1, zoomLevel - 0.2))}
          className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ZoomOut className="w-4 h-4" />
        </motion.button>
        <motion.button
          onClick={() => {
            onZoomChange(1);
            onPanChange({ x: 0, y: 0 });
          }}
          className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4" />
        </motion.button>
        <div className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm">
          {Math.round(zoomLevel * 100)}%
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className={`w-full h-full relative ${isPanning ? 'cursor-grabbing' : selectedTool ? 'cursor-crosshair' : 'cursor-grab'}`}
        onClick={handleCanvasClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* Grid Background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: `${20 * zoomLevel}px ${20 * zoomLevel}px`,
            backgroundPosition: `${panOffset.x}px ${panOffset.y}px`,
          }}
        />

        {/* Canvas Content */}
        <div
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: '0 0',
          }}
        >
          {/* Connections */}
          <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            {connections.map((connection) => {
              const sourceNode = nodes.find(n => n.id === connection.source);
              const targetNode = nodes.find(n => n.id === connection.target);
              
              if (!sourceNode || !targetNode) return null;

              return (
                <motion.line
                  key={connection.id}
                  x1={sourceNode.position.x + sourceNode.size.width / 2}
                  y1={sourceNode.position.y + sourceNode.size.height / 2}
                  x2={targetNode.position.x + targetNode.size.width / 2}
                  y2={targetNode.position.y + targetNode.size.height / 2}
                  stroke="#60a5fa"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          <div style={{ zIndex: 2 }}>
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                className={`absolute border-2 rounded-lg shadow-lg cursor-pointer select-none ${
                  selectedNodeId === node.id ? 'ring-2 ring-blue-400' : ''
                }`}
                style={{
                  left: node.position.x,
                  top: node.position.y,
                  width: node.size.width,
                  height: node.size.height,
                  backgroundColor: node.style?.backgroundColor || '#1f2937',
                  borderColor: node.style?.borderColor || '#374151',
                  color: node.style?.color || '#ffffff',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onNodeSelect(node.id);
                }}
                drag
                onDrag={(e, info) => {
                  const updatedNode = {
                    ...node,
                    position: {
                      x: node.position.x + info.delta.x / zoomLevel,
                      y: node.position.y + info.delta.y / zoomLevel,
                    },
                  };
                  onNodeUpdate(updatedNode);
                }}
                whileHover={{ scale: 1.05 }}
                whileDrag={{ scale: 1.1, zIndex: 10 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className="p-3 text-center h-full flex items-center justify-center">
                  <span className="text-sm font-medium truncate">{node.label}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cursors */}
          <div style={{ zIndex: 3 }}>
            {cursors.map((cursor) => (
              <motion.div
                key={cursor.id}
                className="absolute pointer-events-none"
                style={{
                  left: cursor.position.x,
                  top: cursor.position.y,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <div 
                  className="w-4 h-4 rounded-full border-2 border-white"
                  style={{ backgroundColor: cursor.color }}
                />
                <div 
                  className="px-2 py-1 bg-black/80 text-white text-xs rounded mt-1 whitespace-nowrap"
                >
                  {cursor.user}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-white/70 text-sm">
        <span>Nodes: {nodes.length}</span>
        <span>Connections: {connections.length}</span>
        <span>Position: {Math.round(panOffset.x)}, {Math.round(panOffset.y)}</span>
      </div>
    </div>
  );
};

export default Canvas;