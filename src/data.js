// =============================================================================
// AI STACK DATA FILE
// =============================================================================
// This is the only file you need to edit for monthly updates.
// Last updated: December 2024
// =============================================================================

export const lastUpdated = "December 2024";

// -----------------------------------------------------------------------------
// STACK LAYERS (probably won't change often)
// -----------------------------------------------------------------------------
export const stackLayers = [
  { id: 'applications', name: 'Applications', description: 'Consumer & enterprise products' },
  { id: 'api', name: 'API / Platform', description: 'Developer access & tooling' },
  { id: 'models', name: 'Models', description: 'Foundation models' },
  { id: 'training', name: 'Training Infrastructure', description: 'Compute for training runs' },
  { id: 'cloud', name: 'Cloud / Data Centers', description: 'Physical infrastructure' },
  { id: 'chips', name: 'Chips / Hardware', description: 'AI accelerators' },
];

// -----------------------------------------------------------------------------
// INFRASTRUCTURE PROVIDERS
// -----------------------------------------------------------------------------
// Only add providers here if a frontier lab actually depends on them.
// The 'type' field is for potential future filtering (chips vs cloud vs neocloud).
// -----------------------------------------------------------------------------
export const infrastructureProviders = [
  { id: 'nvidia', name: 'NVIDIA', color: '#76B900', type: 'chips' },
  { id: 'amazon', name: 'Amazon (AWS)', color: '#FF9900', type: 'cloud' },
  { id: 'microsoft', name: 'Microsoft (Azure)', color: '#00A4EF', type: 'cloud' },
  { id: 'oracle', name: 'Oracle', color: '#F80000', type: 'cloud' },
  { id: 'coreweave', name: 'CoreWeave', color: '#6366F1', type: 'neocloud' },
  // Add more as needed:
  // { id: 'crusoe', name: 'Crusoe', color: '#...', type: 'neocloud' },
  // { id: 'nebius', name: 'Nebius', color: '#...', type: 'neocloud' },
];

// -----------------------------------------------------------------------------
// FRONTIER AI COMPANIES
// -----------------------------------------------------------------------------
// Each company has:
//   - id: unique identifier (used for linking)
//   - name: display name
//   - color: brand color (hex)
//   - stack: object with one entry per layer
//
// Each stack layer has:
//   - provider: who provides this (display text)
//   - inHouse: true if they own it, false if external dependency
//   - products: array of specific products/services
//   - dependencies: array of provider IDs (only if inHouse is false)
// -----------------------------------------------------------------------------
export const companies = [
  {
    id: 'google',
    name: 'Google DeepMind',
    color: '#4285F4',
    stack: {
      applications: { 
        provider: 'Google', 
        inHouse: true, 
        products: ['Gemini App', 'Search AI', 'Workspace AI'] 
      },
      api: { 
        provider: 'Google', 
        inHouse: true, 
        products: ['Vertex AI', 'Gemini API'] 
      },
      models: { 
        provider: 'Google', 
        inHouse: true, 
        products: ['Gemini 2.0', 'Gemini 1.5', 'Gemma'] 
      },
      training: { 
        provider: 'Google', 
        inHouse: true, 
        products: ['TPU Pods'] 
      },
      cloud: { 
        provider: 'Google', 
        inHouse: true, 
        products: ['Google Cloud'] 
      },
      chips: { 
        provider: 'Google', 
        inHouse: true, 
        products: ['TPU v5p', 'Trillium'] 
      },
    }
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    color: '#D4A574',
    stack: {
      applications: { 
        provider: 'Anthropic', 
        inHouse: true, 
        products: ['Claude.ai', 'Claude for Enterprise'] 
      },
      api: { 
        provider: 'Anthropic', 
        inHouse: true, 
        products: ['Claude API', 'Amazon Bedrock', 'Vertex AI'] 
      },
      models: { 
        provider: 'Anthropic', 
        inHouse: true, 
        products: ['Claude 3.5 Sonnet', 'Claude 3.5 Haiku', 'Claude 3 Opus'] 
      },
      training: { 
        provider: 'AWS + GCP', 
        inHouse: false, 
        products: ['AWS Trainium', 'Google TPU'], 
        dependencies: ['amazon', 'google'] 
      },
      cloud: { 
        provider: 'AWS + GCP', 
        inHouse: false, 
        products: ['Amazon Web Services', 'Google Cloud'], 
        dependencies: ['amazon', 'google'] 
      },
      chips: { 
        provider: 'NVIDIA + Google + AWS', 
        inHouse: false, 
        products: ['H100', 'TPU', 'Trainium'], 
        dependencies: ['nvidia', 'google', 'amazon'] 
      },
    }
  },
  {
    id: 'openai',
    name: 'OpenAI',
    color: '#10A37F',
    stack: {
      applications: { 
        provider: 'OpenAI', 
        inHouse: true, 
        products: ['ChatGPT', 'DALL-E', 'Sora'] 
      },
      api: { 
        provider: 'OpenAI', 
        inHouse: true, 
        products: ['OpenAI API', 'Azure OpenAI'] 
      },
      models: { 
        provider: 'OpenAI', 
        inHouse: true, 
        products: ['GPT-4o', 'o1', 'o3'] 
      },
      training: { 
        provider: 'Microsoft', 
        inHouse: false, 
        products: ['Azure AI Infrastructure'], 
        dependencies: ['microsoft'] 
      },
      cloud: { 
        provider: 'Microsoft', 
        inHouse: false, 
        products: ['Microsoft Azure'], 
        dependencies: ['microsoft'] 
      },
      chips: { 
        provider: 'NVIDIA', 
        inHouse: false, 
        products: ['H100', 'GB200'], 
        dependencies: ['nvidia'] 
      },
    }
  },
  {
    id: 'meta',
    name: 'Meta AI',
    color: '#0668E1',
    stack: {
      applications: { 
        provider: 'Meta', 
        inHouse: true, 
        products: ['Meta AI', 'Instagram AI', 'WhatsApp AI'] 
      },
      api: { 
        provider: 'Meta', 
        inHouse: true, 
        products: ['Llama API', 'Open weights distribution'] 
      },
      models: { 
        provider: 'Meta', 
        inHouse: true, 
        products: ['Llama 3.3', 'Llama 3.2', 'Llama 3.1 405B'] 
      },
      training: { 
        provider: 'Meta', 
        inHouse: true, 
        products: ['Research SuperCluster', 'AI Research SuperCluster'] 
      },
      cloud: { 
        provider: 'Meta', 
        inHouse: true, 
        products: ['Meta Data Centers'] 
      },
      chips: { 
        provider: 'NVIDIA', 
        inHouse: false, 
        products: ['H100 clusters (600k+)'], 
        dependencies: ['nvidia'] 
      },
    }
  },
  {
    id: 'xai',
    name: 'xAI',
    color: '#1D1D1F',
    stack: {
      applications: { 
        provider: 'xAI', 
        inHouse: true, 
        products: ['Grok (via X)'] 
      },
      api: { 
        provider: 'xAI', 
        inHouse: true, 
        products: ['Grok API'] 
      },
      models: { 
        provider: 'xAI', 
        inHouse: true, 
        products: ['Grok-2', 'Grok-2 mini'] 
      },
      training: { 
        provider: 'xAI', 
        inHouse: true, 
        products: ['Colossus (Memphis)'] 
      },
      cloud: { 
        provider: 'Mixed', 
        inHouse: false, 
        products: ['Oracle Cloud', 'Own facilities'], 
        dependencies: ['oracle'] 
      },
      chips: { 
        provider: 'NVIDIA', 
        inHouse: false, 
        products: ['H100 (100k+ cluster)'], 
        dependencies: ['nvidia'] 
      },
    }
  },
];

// -----------------------------------------------------------------------------
// HOW TO UPDATE THIS FILE
// -----------------------------------------------------------------------------
// 1. Update lastUpdated at the top
// 2. To add a new company: copy an existing company object and modify
// 3. To add a new infrastructure provider: add to infrastructureProviders array
// 4. To update a company's stack: find the company, edit the relevant layer
// 5. Remember: dependencies array must use provider IDs from infrastructureProviders
// -----------------------------------------------------------------------------
