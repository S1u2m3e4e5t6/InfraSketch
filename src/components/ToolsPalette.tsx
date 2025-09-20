import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { toolCategories } from '../utils/tools';
import { Tool } from '../types';

interface ToolsPaletteProps {
  onToolSelect: (tool: Tool) => void;
  selectedTool: Tool | null;
}

const ToolsPalette: React.FC<ToolsPaletteProps> = ({ onToolSelect, selectedTool }) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['flowcharts', 'cloud', 'k8s'])
  );

  const toggleCategory = (categoryKey: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryKey)) {
      newExpanded.delete(categoryKey);
    } else {
      newExpanded.add(categoryKey);
    }
    setExpandedCategories(newExpanded);
  };

  const handleDragStart = (e: React.DragEvent, tool: Tool) => {
    e.dataTransfer.setData('application/json', JSON.stringify(tool));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="w-80 bg-white/10 backdrop-blur-sm border-r border-white/20 h-full overflow-y-auto">
      <div className="p-6 border-b border-white/20">
        <h2 className="text-lg font-semibold text-white mb-2">Tools Palette</h2>
        <p className="text-sm text-white/70">Drag tools to canvas or click to select</p>
      </div>
      
      <div className="p-4 space-y-2">
        {Object.entries(toolCategories).map(([categoryKey, category]) => (
          <motion.div
            key={categoryKey}
            className="bg-white/5 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => toggleCategory(categoryKey)}
              className="w-full px-4 py-3 flex items-center justify-between text-white hover:bg-white/10 transition-colors"
            >
              <span className="font-medium">{category.name}</span>
              <motion.div
                animate={{ rotate: expandedCategories.has(categoryKey) ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-4 h-4" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {expandedCategories.has(categoryKey) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-white/10"
                >
                  <div className="p-2 grid grid-cols-2 gap-2">
                    {category.tools.map((tool) => (
                      <motion.button
                        key={tool.id}
                        onClick={() => onToolSelect(tool)}
                        onDragStart={(e) => handleDragStart(e, tool)}
                        draggable
                        className={`p-3 rounded-lg border transition-all text-left group hover:scale-105 ${
                          selectedTool?.id === tool.id
                            ? 'bg-white/20 border-white/40 shadow-lg'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex items-center space-x-2">
                          <span 
                            className="text-lg"
                            style={{ color: tool.color }}
                          >
                            {tool.icon}
                          </span>
                          <div>
                            <div className="text-sm font-medium text-white group-hover:text-white">
                              {tool.name}
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ToolsPalette;