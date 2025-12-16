// =============================================================================
// AI STACK DATA FILE
// =============================================================================
// This is the only file you need to edit for monthly updates.
// Last updated: December 2024
// =============================================================================

export const lastUpdated = "December 2025";

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
  { id: 'microsoft', name: 'Microsoft (Azure)', color: '#3CCBF4', type: 'cloud' },
  { id: 'oracle', name: 'Oracle', color: '#C74634', type: 'cloud' },
  { id: 'coreweave', name: 'CoreWeave', color: '#2741E7', type: 'neocloud' },
  { id: 'crusoe', name: 'Crusoe', color: '#1D1D1F', type: 'neocloud' },

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
    id: 'anthropic',
    name: 'Anthropic',
    color: '#da7756',
    stack: {
      applications: { 
        provider: 'Anthropic', 
        inHouse: true, 
        products: ['Claude.ai', 'Claude Code'] 
      },
      api: { 
        provider: 'Anthropic', 
        inHouse: true, 
        products: ['Claude API', 'Amazon Bedrock', 'Google Vertex AI', 'Microsoft Azure AI'] 
      },
      models: { 
        provider: 'Anthropic', 
        inHouse: true, 
        products: ['Claude'] 
      },
      training: { 
        provider: 'AWS + Google Cloud', 
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
        provider: 'AWS + Google + NVIDIA', 
        inHouse: false, 
        products: ['Amazon Trainium', 'Google TPUs', 'NVIDIA GPUs'], 
        dependencies: ['amazon', 'google', 'nvidia'] 
      },
    }
  },
  {
    id: 'google',
    name: 'Google DeepMind',
    color: '#3369E8',
    stack: {
      applications: { 
        provider: 'Google', 
        inHouse: true, 
        products: ['Gemini app', 'Google AI Studio', 'Google Antigravity', 'Google NotebookLM'] 
      },
      api: { 
        provider: 'Google', 
        inHouse: true, 
        products: ['Vertex AI API', 'Gemini API'] 
      },
      models: { 
        provider: 'Google', 
        inHouse: true, 
        products: ['Gemini', 'Nano Banana', 'Gemma', 'Veo', 'Imagen', 'Lyria'] 
      },
      training: { 
        provider: 'Google', 
        inHouse: true, 
        products: ['TPUs'] 
      },
      cloud: { 
        provider: 'Google', 
        inHouse: true, 
        products: ['Google Cloud'] 
      },
      chips: { 
        provider: 'Google', 
        inHouse: true, 
        products: ['TPUs'] 
      },
    }
  },
  {
    id: 'meta',
    name: 'Meta AI',
    color: '#0081FB',
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
        products: ['Llama'] 
      },
      training: { 
        provider: 'Meta', 
        inHouse: true, 
        products: ['Meta Data Centers'] 
      },
      cloud: { 
        provider: 'Google Cloud', 'Microsoft', 
        inHouse: false, 
        products: ['Google Cloud', 'Microsoft Azure'] 
        dependencies: ['google', 'microsoft'] 
      },
      chips: { 
        provider: 'NVIDIA', 
        inHouse: false, 
        products: ['NVIDIA GPUs'], 
        dependencies: ['nvidia'] 
      },
    }
  },
  {
    id: 'openai',
    name: 'OpenAI',
    color: '#74AA9C',
    stack: {
      applications: { 
        provider: 'OpenAI', 
        inHouse: true, 
        products: ['ChatGPT', 'Sora'] 
      },
      api: { 
        provider: 'OpenAI', 
        inHouse: true, 
        products: ['OpenAI API', 'Azure OpenAI'] 
      },
      models: { 
        provider: 'OpenAI', 
        inHouse: true, 
        products: ['GPT', 'Sora'] 
      },
      training: { 
        provider: 'Mixed',
        inHouse: false, 
        products: ['Azure AI Infrastructure', 'Stargate'], 
        dependencies: ['crusoe', 'microsoft'] 
      },
      cloud: { 
        provider: 'Amazon', 'CoreWeave', 'Google Cloud', 'Microsoft', 'Oracle' 
        inHouse: false, 
        products: ['AWS', 'Google Cloud', 'Microsoft Azure', 'Oracle Cloud'], 
        dependencies: ['amazon', 'coreweave', 'google', 'microsoft', 'oracle'] 
      },
      chips: { 
        provider: 'Google', 'NVIDIA', 
        inHouse: false, 
        products: ['Google TPUs', 'NVIDIA GPUs'], 
        dependencies: ['google', 'nvidia'] 
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
        products: ['Grok'] 
      },
      api: { 
        provider: 'xAI', 
        inHouse: true, 
        products: ['Grok API'] 
      },
      models: { 
        provider: 'xAI', 
        inHouse: true, 
        products: ['Grok'] 
      },
      training: { 
        provider: 'xAI', 
        inHouse: true, 
        products: ['Colossus data centers'] 
      },
      cloud: { 
        provider: 'Oracle', 
        inHouse: false, 
        products: ['Oracle Cloud Infrastructure'], 
        dependencies: ['oracle'] 
      },
      chips: { 
        provider: 'NVIDIA', 
        inHouse: false, 
        products: ['NVIDIA GPUs'], 
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
