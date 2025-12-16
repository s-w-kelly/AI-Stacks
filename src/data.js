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
  { id: 'applications', name: 'Applications', description: 'Consumer and enterprise products' },
  { id: 'api', name: 'APIs', description: 'Developer access and tooling' },
  { id: 'models', name: 'Models', description: 'Foundation models' },
  { id: 'cloud', name: 'Cloud Providers', description: 'Cloud provision/data center ops' },
  { id: 'infrastructure', name: 'Data Centers', description: 'Physical infrastructure' },
  { id: 'chips', name: 'Chips', description: 'AI accelerators' },
];

// -----------------------------------------------------------------------------
// INFRASTRUCTURE PROVIDERS
// -----------------------------------------------------------------------------
// Only add providers here if a frontier lab actually depends on them.
// The 'type' field is for potential future filtering (chips vs cloud vs neocloud).
// -----------------------------------------------------------------------------
export const infrastructureProviders = [
  { id: 'nvidia', name: 'NVIDIA (GPUs)', color: '#76B900', type: 'chips' },
  { id: 'amd', name: 'AMD (GPUs)', color: '#ED1C24', type: 'chips' },
  { id: 'google', name: 'Google (Cloud, TPUs)', color: '#4285F4', type: 'chips' },
  { id: 'amazon', name: 'Amazon (AWS)', color: '#FF9900', type: 'cloud' },
  { id: 'microsoft', name: 'Microsoft (Azure)', color: '#3CCBF4', type: 'cloud' },
  { id: 'oracle', name: 'Oracle (OCI)', color: '#C74634', type: 'cloud' },
  { id: 'coreweave', name: 'CoreWeave (cloud)', color: '#2741E7', type: 'neocloud' },
  { id: 'crusoe', name: 'Crusoe (data centers)', color: '#ceeb13', type: 'neocloud' },

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
      cloud: { 
        provider: 'Amazon + Google', 
        inHouse: false, 
        products: ['AWS', 'Google Cloud'], 
        dependencies: ['amazon', 'google'] 
      },
      infrastructure: { 
        provider: 'Amazon + Google', 
        inHouse: false, 
        products: ['AWS', 'Google Cloud'], 
        dependencies: ['amazon', 'google'] 
      },
      chips: { 
        provider: 'Amazon + Google + NVIDIA', 
        inHouse: false, 
        products: ['AWS Trainium', 'Google TPUs', 'NVIDIA GPUs'], 
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
      cloud: { 
        provider: 'Google', 
        inHouse: true, 
        products: ['Google Cloud'] 
      },
      infrastructure: { 
        provider: 'Google', 
        inHouse: true, 
        products: ['Google Cloud data centers'] 
      },
      chips: { 
        provider: 'Google', 
        inHouse: true, 
        products: ['Google TPUs'] 
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
        products: ['Meta AI'] 
      },
      api: { 
        provider: 'Meta', 
        inHouse: true, 
        products: ['Llama API', 'Amazon Bedrock', 'Open weights distribution'] 
      },
      models: { 
        provider: 'Meta', 
        inHouse: true, 
        products: ['Llama'] 
      },
      cloud: { 
        provider: 'Amazon + CoreWeave + Google + Microsoft',
        inHouse: false, 
        products: ['AWS', 'CoreWeave', 'Google Cloud', 'Microsoft Azure'],
        dependencies: ['amazon', 'google', 'microsoft'] 
      },
      infrastructure: { 
        provider: 'Meta + CoreWeave + Amazon', 
        inHouse: true, 
        products: ['Meta Data Centers', 'AWS', 'CoreWeave', 'Microsoft Azure'],
        dependencies: ['amazon', 'coreweave', 'microsoft'] 
      },
      chips: { 
        provider: 'AMD + NVIDIA', 
        inHouse: false, 
        products: ['AMD GPUs', 'NVIDIA GPUs'], 
        dependencies: ['AMD', 'nvidia'] 
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
      cloud: { 
        provider: 'Amazon + CoreWeave + Google + Microsoft + Oracle',
        inHouse: false, 
        products: ['AWS', 'CoreWeave', 'Google Cloud', 'Microsoft Azure', 'Oracle Cloud Infrastructure (Stargate)'],
        dependencies: ['amazon', 'coreweave', 'google', 'microsoft', 'oracle']
      },
      infrastructure: { 
        provider: 'Microsoft + OpenAI',
        inHouse: false, 
        products: ['Azure AI Infrastructure', 'Stargate (Crusoe)'],
        dependencies: ['crusoe', 'microsoft'] 
      },
      chips: { 
        provider: 'Google + NVIDIA', 
        inHouse: false, 
        products: ['Google TPUs', 'NVIDIA GPUs'], 
        dependencies: ['google', 'nvidia'] 
      },
    }
  },
  {
    id: 'xai',
    name: 'xAI',
    color: '#000000',
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
      cloud: { 
        provider: 'Oracle', 
        inHouse: false, 
        products: ['Colossus data centers'],
        dependencies: ['oracle'] 
      },
      infrastructure: { 
        provider: 'xAI', 
        inHouse: true, 
        products: ['Colossus data centers']
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
