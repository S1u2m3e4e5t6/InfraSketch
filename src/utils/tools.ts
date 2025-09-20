import { Tool } from '../types';

export const toolCategories = {
  flowcharts: {
    name: 'Flowcharts',
    tools: [
      { id: 'rectangle', name: 'Rectangle', category: 'flowcharts', icon: '▭', color: '#3B82F6' },
      { id: 'diamond', name: 'Diamond', category: 'flowcharts', icon: '◇', color: '#10B981' },
      { id: 'circle', name: 'Circle', category: 'flowcharts', icon: '○', color: '#F59E0B' },
      { id: 'arrow', name: 'Arrow', category: 'flowcharts', icon: '→', color: '#6B7280' },
    ]
  },
  sequence: {
    name: 'Sequence Diagrams',
    tools: [
      { id: 'actor', name: 'Actor', category: 'sequence', icon: '👤', color: '#8B5CF6' },
      { id: 'object', name: 'Object', category: 'sequence', icon: '📦', color: '#06B6D4' },
      { id: 'message', name: 'Message', category: 'sequence', icon: '💬', color: '#84CC16' },
      { id: 'loop', name: 'Loop', category: 'sequence', icon: '🔄', color: '#F97316' },
      { id: 'condition', name: 'Condition', category: 'sequence', icon: '❓', color: '#EF4444' },
    ]
  },
  erd: {
    name: 'ERD',
    tools: [
      { id: 'entity', name: 'Entity', category: 'erd', icon: '🏢', color: '#3B82F6' },
      { id: 'relationship', name: 'Relationship', category: 'erd', icon: '🔗', color: '#10B981' },
      { id: 'attribute', name: 'Attribute', category: 'erd', icon: '🏷️', color: '#F59E0B' },
    ]
  },
  org: {
    name: 'Org Charts',
    tools: [
      { id: 'employee', name: 'Employee', category: 'org', icon: '👨‍💼', color: '#8B5CF6' },
      { id: 'department', name: 'Department', category: 'org', icon: '🏛️', color: '#06B6D4' },
      { id: 'connector', name: 'Connector', category: 'org', icon: '━', color: '#6B7280' },
    ]
  },
  cloud: {
    name: 'Cloud Architecture',
    tools: [
      { id: 'aws-ec2', name: 'AWS EC2', category: 'cloud', icon: '☁️', color: '#FF9900' },
      { id: 'aws-s3', name: 'AWS S3', category: 'cloud', icon: '🪣', color: '#FF9900' },
      { id: 'aws-lambda', name: 'AWS Lambda', category: 'cloud', icon: 'λ', color: '#FF9900' },
      { id: 'azure-vm', name: 'Azure VM', category: 'cloud', icon: '💻', color: '#0078D4' },
      { id: 'gcp-storage', name: 'GCP Storage', category: 'cloud', icon: '🗄️', color: '#4285F4' },
    ]
  },
  k8s: {
    name: 'Kubernetes',
    tools: [
      { id: 'pod', name: 'Pod', category: 'k8s', icon: '🏃', color: '#326CE5' },
      { id: 'deployment', name: 'Deployment', category: 'k8s', icon: '🚀', color: '#326CE5' },
      { id: 'service', name: 'Service', category: 'k8s', icon: '🔌', color: '#326CE5' },
      { id: 'api-gateway', name: 'API Gateway', category: 'k8s', icon: '🚪', color: '#10B981' },
    ]
  },
  infrastructure: {
    name: 'Infrastructure',
    tools: [
      { id: 'load-balancer', name: 'Load Balancer', category: 'infrastructure', icon: '⚖️', color: '#8B5CF6' },
      { id: 'cdn', name: 'CDN', category: 'infrastructure', icon: '🌐', color: '#06B6D4' },
      { id: 'message-queue', name: 'Message Queue', category: 'infrastructure', icon: '📬', color: '#84CC16' },
      { id: 'firewall', name: 'Firewall', category: 'infrastructure', icon: '🛡️', color: '#EF4444' },
      { id: 'auth', name: 'Auth', category: 'infrastructure', icon: '🔐', color: '#F59E0B' },
    ]
  },
};

export const getAllTools = (): Tool[] => {
  return Object.values(toolCategories).flatMap(category => category.tools);
};

export const getToolsByCategory = (categoryKey: string): Tool[] => {
  return toolCategories[categoryKey]?.tools || [];
};