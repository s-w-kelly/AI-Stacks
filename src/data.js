// =============================================================================
// AI STACK DATA FILE
// =============================================================================
// This is the only file you need to edit for monthly updates.
// Last updated: December 2024
// =============================================================================

export const lastUpdated = "12/21/2025";

// -----------------------------------------------------------------------------
// STACK LAYERS (probably won't change often)
// -----------------------------------------------------------------------------
export const stackLayers = [
  { id: 'applications', name: 'Applications', description: 'Core in-house consumer and enterprise products' },
  { id: 'api', name: 'Model Access and Distribution', description: 'APIs, cloud platforms, weight releases' },
  { id: 'models', name: 'Models', description: 'Foundation models' },
  { id: 'cloud', name: 'Compute and Cloud Platforms', description: 'Cloud services, data center ops' },
  { id: 'infrastructure', name: 'Data Centers', description: 'Owned/controlled infrastructure' },
  { id: 'chips', name: 'Chips', description: 'GPUs, ASICs' },
];

// -----------------------------------------------------------------------------
// INFRASTRUCTURE PROVIDERS
// -----------------------------------------------------------------------------
// Only add providers here if a frontier lab actually depends on them.
// The 'type' field is for potential future filtering (chips vs cloud vs neocloud).
// -----------------------------------------------------------------------------
export const infrastructureProviders = [
  { id: 'amazon', name: 'Amazon (AWS cloud/datacenters, chips)', color: '#FF9900', type: 'cloud' },
  { id: 'amd', name: 'AMD (GPUs)', color: '#ED1C24', type: 'chips' },
  { id: 'coreweave', name: 'CoreWeave (cloud)', color: '#2741E7', type: 'neocloud', url: null },
  { id: 'crusoe', name: 'Crusoe (data centers)', color: '#ceeb13', type: 'neocloud', url: null },
  { id: 'google', name: 'Google (cloud/datacenters, TPUs)', color: '#4285F4', type: 'chips', url: null },
  { id: 'microsoft', name: 'Microsoft (Azure cloud/data centers)', color: '#3CCBF4', type: 'cloud', url: null },
  { id: 'nvidia', name: 'NVIDIA (GPUs)', color: '#76B900', type: 'chips', url: null },
  { id: 'oracle', name: 'Oracle (OCI cloud)', color: '#C74634', type: 'cloud', url: null },
,
];

// -----------------------------------------------------------------------------
// HELPER: Create a product entry
// -----------------------------------------------------------------------------
// Use this for cleaner syntax:
//   p('H100')                         → { name: 'H100', url: null }
//   p('Trainium', 'https://...')      → { name: 'Trainium', url: 'https://...' }
// -----------------------------------------------------------------------------
const p = (name, url = null) => ({ name, url });

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
//   - providerUrl: optional URL for the provider name
//   - inHouse: true if they own it, false if external dependency
//   - products: array of { name, url } objects (use p() helper above)
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
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Claude.ai', 'https://claude.ai/'), 
          p('Claude Code', 'https://claude.com/product/claude-code'),
        ] 
      },
      api: { 
        provider: 'Anthropic', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Claude API', 'https://claude.com/platform/api'), 
          p('Amazon Bedrock', 'https://aws.amazon.com/bedrock/anthropic/'), 
          p('Google Vertex AI', 'https://docs.cloud.google.com/vertex-ai/generative-ai/docs/partner-models/claude'), 
          p('Microsoft Azure AI Foundry', 'https://learn.microsoft.com/en-us/azure/ai-foundry/foundry-models/how-to/use-foundry-models-claude?view=foundry-classic&tabs=python'),
        ] 
      },
      models: { 
        provider: 'Anthropic', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Claude series', 'https://platform.claude.com/docs/en/about-claude/models/overview'),
        ] 
      },
      cloud: { 
        provider: 'Amazon + Google',
        providerUrl: null, 
        inHouse: false, 
        products: [
          p('AWS (Rainier/others)', 'https://www.aboutamazon.com/news/aws/amazon-invests-additional-4-billion-anthropic-ai'), 
          p('Google Cloud', 'https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services'),
        ], 
        dependencies: ['amazon', 'google'] 
      },
      infrastructure: { 
        provider: 'Amazon',
        providerUrl: null, 
        inHouse: false, 
        products: [
          p('Project Rainier (AWS partnership)', 'https://www.aboutamazon.com/news/aws/aws-project-rainier-ai-trainium-chips-compute-cluster'),         
        ], 
        dependencies: ['amazon'] 
      },
      chips: { 
        provider: 'Amazon + Google + NVIDIA', 
        providerUrl: null,
        inHouse: false, 
        products: [
          p('AWS Trainium/Inferentia', 'https://www.aboutamazon.com/news/aws/amazon-invests-additional-4-billion-anthropic-ai'),
          p('Google Cloud TPUs', 'https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services'), 
          p('NVIDIA GPUs', 'https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services'),
        ], 
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
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Gemini assistant', 'https://gemini.google.com/app'), 
          p('AI Studio', 'https://aistudio.google.com/welcome'), 
          p('Antigravity', 'https://antigravity.google/'), 
          p('NotebookLM', 'https://notebooklm.google/'),
        ] 
      },
      api: { 
        provider: 'Google', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Gemini API', 'https://ai.google.dev/gemini-api/docs'),
          p('Vertex AI API', 'https://docs.cloud.google.com/vertex-ai/docs/reference/rest'),
          p('Open weights (Gemma)', 'https://huggingface.co/collections/google/gemma-3-release'),
        ]
      },
      models: { 
        provider: 'Google', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Gemini series','https://deepmind.google/models/gemini/'), 
          p('Nano Banana', 'https://deepmind.google/models/gemini-image/'),
          p('Gemma', 'https://deepmind.google/models/gemma/'),
          p('Veo', 'https://deepmind.google/models/veo/'), 
          p('Imagen', 'https://deepmind.google/models/imagen/'), 
          p('Lyria', 'https://deepmind.google/models/lyria/'),
        ] 
      },
      cloud: { 
        provider: 'Google', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Google Cloud', 'https://cloud.google.com/'),
        ] 
      },
      infrastructure: { 
        provider: 'Google', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Google Cloud', 'https://cloud.google.com/about/locations'),
        ] 
      },
      chips: { 
        provider: 'Google', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Google Cloud TPUs', 'https://cloud.google.com/tpu?hl=en'),
        ] 
      },
    }
  },
  {
    id: 'meta',
    name: 'Meta',
    color: '#0081FB',
    stack: {
      applications: { 
        provider: 'Meta', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Meta AI', 'https://ai.meta.com/meta-ai/'),
        ] 
      },
      api: { 
        provider: 'Meta', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Llama API', 'https://llama.developer.meta.com/docs/overview/'), 
          p('Open weights', 'https://huggingface.co/meta-llama'),
          p('Amazon Bedrock', 'https://aws.amazon.com/bedrock/meta/'), 
          p('Google Vertex AI', 'https://docs.cloud.google.com/vertex-ai/generative-ai/docs/open-models/use-llama'),
          p('Microsoft Azure AI Foundry', 'https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/models-inference-examples?view=foundry-classic&tabs=llama-three#meta'),
        ] 
      },
      models: { 
        provider: 'Meta',
        providerUrl: null, 
        inHouse: true, 
        products: [
          p('Llama series', 'https://huggingface.co/meta-llama')
        ] 
      },
      cloud: { 
        provider: 'Meta + Amazon + CoreWeave + Google + Microsoft',
        providerUrl: null,
        inHouse: false, 
        products: [
          p('Meta Data Centers', 'https://datacenters.atmeta.com/'), 
          p('AWS', 'https://ai.meta.com/blog/aws-program-startups-build-with-llama/'), 
          p('CoreWeave', 'https://finance.yahoo.com/news/coreweave-signs-14-billion-ai-124208188.html'), 
          p('Google Cloud', 'https://www.cnbc.com/2025/08/21/google-scores-six-year-meta-cloud-deal-worth-over-10-billion.html'), 
          p('Microsoft Azure', 'https://blogs.microsoft.com/blog/2023/07/18/microsoft-and-meta-expand-their-ai-partnership-with-llama-2-on-azure-and-windows/'),
        ],
        dependencies: ['amazon', 'coreweave', 'google', 'microsoft'] 
      },
      infrastructure: { 
        provider: 'Meta', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Meta Data Centers', 'https://datacenters.atmeta.com/'), 
        ],
      },
      chips: { 
        provider: 'Meta + AMD + NVIDIA', 
        providerUrl: null,
        inHouse: false, 
        products: [
          p('MTIAs', 'https://www.reuters.com/technology/artificial-intelligence/meta-begins-testing-its-first-in-house-ai-training-chip-2025-03-11/'),
          p('AMD GPUs', 'https://www.theregister.com/2024/12/23/nvidia_ai_hardware_competition/'), 
          p('NVIDIA GPUs', 'https://www.theregister.com/2024/12/23/nvidia_ai_hardware_competition/'),
        ], 
        dependencies: ['amd', 'nvidia'] 
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
        providerUrl: null,
        inHouse: true, 
        products: [
          p('ChatGPT','https://chatgpt.com/'), 
          p('Sora', 'https://sora.chatgpt.com/'),
        ] 
      },
      api: { 
        provider: 'OpenAI', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('OpenAI API', 'https://openai.com/api/'), 
          p('Azure OpenAI', 'https://azure.microsoft.com/en-us/products/ai-foundry/models/openai'),
          p('Open weights (gpt-oss)', 'https://huggingface.co/collections/openai/gpt-oss')
        ] 
      },
      models: { 
        provider: 'OpenAI', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('GPT series', 'https://platform.openai.com/docs/models'), 
          p('Sora', 'https://platform.openai.com/docs/models'), 
          p('gpt-oss', 'https://platform.openai.com/docs/models'),
        ] 
      },
      cloud: { 
        provider: 'OpenAI + Amazon + CoreWeave + Google + Microsoft + Oracle',
        providerUrl: null,
        inHouse: false, 
        products: [
          p('Stargate (OpenAI/OCI)', 'https://openai.com/index/five-new-stargate-sites/'),
          p('AWS', 'https://www.aboutamazon.com/news/aws/aws-open-ai-workloads-compute-infrastructure'), 
          p('CoreWeave', 'https://www.coreweave.com/news/coreweave-expands-agreement-with-openai-by-up-to-6-5b'), 
          p('Google Cloud', 'https://www.reuters.com/business/retail-consumer/openai-taps-google-unprecedented-cloud-deal-despite-ai-rivalry-sources-say-2025-06-10/'), 
          p('Microsoft Azure', 'https://openai.com/index/next-chapter-of-microsoft-openai-partnership/'), 
        ],
        dependencies: ['amazon', 'coreweave', 'google', 'microsoft', 'oracle']
      },
      infrastructure: { 
        provider: 'OpenAI + Crusoe + Oracle',
        providerUrl: null,
        inHouse: false, 
        products: [
          p('Stargate (OpenAI/Crusoe/OCI)', 'https://www.crusoe.ai/resources/newsroom/crusoe-announces-flagship-abilene-data-center-is-live'), 
        ],
        dependencies: ['crusoe', 'oracle'] 
      },
      chips: { 
        provider: 'Google + NVIDIA + AMD (2026)', 
        providerUrl: null,
        inHouse: false, 
        products: [
          p('Google Cloud TPUs', 'https://www.reuters.com/business/openai-turns-googles-ai-chips-power-its-products-information-reports-2025-06-27/'), 
          p('NVIDIA GPUs', 'https://nvidianews.nvidia.com/news/openai-and-nvidia-announce-strategic-partnership-to-deploy-10gw-of-nvidia-systems'), 
          p('AMD GPUs (2026)', 'https://openai.com/index/openai-amd-strategic-partnership/'),
        ], 
        dependencies: ['google', 'nvidia', 'amd'] 
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
        products: [
          p('Grok', 'https://grok.com/'),
        ] 
      },
      api: { 
        provider: 'xAI', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('xAI API', 'https://x.ai/api'),
          p('Microsoft Azure AI Foundry', 'https://devblogs.microsoft.com/foundry/announcing-grok-3-and-grok-3-mini-on-azure-ai-foundry/'),
          p('OCI Generative AI', 'https://docs.oracle.com/en-us/iaas/Content/generative-ai/xai-models.htm')
        ] 
      },
      models: { 
        provider: 'xAI', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Grok series', 'https://docs.x.ai/docs/models'),
        ] 
      },
      cloud: { 
        provider: 'xAI + Amazon + Google + Oracle', 
        providerUrl: null,
        inHouse: false, 
        products: [
          p('Colossus', 'https://x.ai/colossus'),
          p('AWS', 'https://x.ai/legal/subprocessor-list'),
          p('Google Cloud', 'https://x.ai/legal/subprocessor-list'),
          p('OCI', 'https://x.ai/legal/subprocessor-list'),
        ],
        dependencies: ['amazon', 'google', 'oracle'] 
      },
      infrastructure: { 
        provider: 'xAI', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Colossus', 'https://x.ai/colossus'),
        ]
      },
      chips: { 
        provider: 'NVIDIA', 
        providerUrl: null,
        inHouse: false, 
        products: [
          p('NVIDIA GPUs', 'https://nvidianews.nvidia.com/news/spectrum-x-ethernet-networking-xai-colossus'),
        ], 
        dependencies: ['nvidia'] 
      },
    }
  },
];

// -----------------------------------------------------------------------------
// HOW TO UPDATE THIS FILE
// -----------------------------------------------------------------------------
// 1. Update lastUpdated at the top
// 2. To add a source URL to a product:
//      Change: p('Product Name')
//      To:     p('Product Name', 'https://source-url.com/article')
// 3. To add a source URL to a provider name:
//      Add providerUrl: 'https://...' to the layer object
// 4. To add a new company: copy an existing company object and modify
// 5. To add a new infrastructure provider: add to infrastructureProviders array
// 6. Remember: dependencies array must use provider IDs from infrastructureProviders
// -----------------------------------------------------------------------------
