export interface Node {
  id: string;
  type: string;
  category: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  label: string;
  style?: {
    backgroundColor?: string;
    borderColor?: string;
    color?: string;
  };
}

export interface Connection {
  id: string;
  source: string;
  target: string;
  type: 'arrow' | 'line';
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  icon: string;
  color: string;
}

export interface Comment {
  id: string;
  nodeId?: string;
  position: { x: number; y: number };
  author: string;
  content: string;
  timestamp: Date;
  mentions?: string[];
}

export interface Cursor {
  id: string;
  user: string;
  position: { x: number; y: number };
  color: string;
}

export interface DiagramState {
  nodes: Node[];
  connections: Connection[];
  comments: Comment[];
  cursors: Cursor[];
  documentation: string;
  zoomLevel: number;
  panOffset: { x: number; y: number };
}