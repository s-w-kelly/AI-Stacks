// =============================================================================
// AI STACK DATA FILE
// =============================================================================
// This is the only file you need to edit for monthly updates.
// Last updated: December 2024
// =============================================================================

export const lastUpdated = "7/11/2026";

// -----------------------------------------------------------------------------
// STACK LAYERS
// -----------------------------------------------------------------------------
export const stackLayers = [
  { id: 'applications', name: 'Applications', description: 'Core in-house consumer and enterprise products' },
  { id: 'api', name: 'Model Access and Distribution', description: 'APIs, cloud platforms, weight releases' },
  { id: 'models', name: 'Models', description: 'Foundation models' },
  { id: 'cloud', name: 'Compute and Cloud Platforms', description: 'Cloud services, access to compute, datacenter ops' },
  { id: 'infrastructure', name: 'Datacenters', description: 'Owned/controlled infrastructure' },
  { id: 'chips', name: 'Chips', description: 'GPUs, ASICs' },
];

// -----------------------------------------------------------------------------
// INFRASTRUCTURE PROVIDERS
// -----------------------------------------------------------------------------
// Only add providers here if a frontier lab actually depends on them.
// The 'type' field is for potential future filtering (chips vs cloud vs neocloud).
// -----------------------------------------------------------------------------
export const infrastructureProviders = [
  { id: 'akamai', name: 'Akamai (cloud)', color: '#00A4EB', type: 'cloud' },
  { id: 'alibabacloud', name: 'Alibaba Cloud (cloud/datacenters)', color: '#FF6A00', type: 'cloud', url: null, region: 'china' },
  { id: 'amazon', name: 'Amazon (AWS cloud/datacenters, chips)', color: '#FF9900', type: 'cloud' },
  { id: 'amd', name: 'AMD (GPUs)', color: '#ED1C24', type: 'chips' },
  { id: 'broadcom', name: 'Broadcom (chip development)', color: '#CC092F', type: 'chips' },
  { id: 'cerebras', name: 'Cerebras (cloud)', color: '#f33900', type: 'chips' },
  { id: 'coreweave', name: 'CoreWeave (cloud)', color: '#2741E7', type: 'neocloud', url: null },
  { id: 'crusoe', name: 'Crusoe (datacenters)', color: '#ceeb13', type: 'neocloud', url: null },
  { id: 'fluidstack', name: 'Fluidstack (cloud/datacenters)', color: '#000000', type: 'cloud', url: null },
  { id: 'google', name: 'Google (cloud/datacenters, TPUs)', color: '#4285F4', type: 'chips', url: null },
  { id: 'huawei', name: 'Huawei (Ascend chips, cloud)', color: '#CF0A2C', type: 'chips', url: null, region: 'china' },
  { id: 'hut8', name: 'Hut 8 (datacenters)', color: '#bcbfb0', type: 'cloud', url: null },
  { id: 'microsoft', name: 'Microsoft (Azure cloud/datacenters, Maia chips)', color: '#3CCBF4', type: 'cloud', url: null },
  { id: 'nebius', name: 'Nebius (cloud/datacenters)', color: '#d3f254', type: 'cloud', url: null },
  { id: 'nvidia', name: 'NVIDIA (GPUs)', color: '#76B900', type: 'chips', url: null },
  { id: 'oracle', name: 'Oracle (OCI cloud)', color: '#C74634', type: 'cloud', url: null },
  { id: 'spacexai', name: 'SpaceXAI (cloud)', color: '#000000', type: 'cloud', url: null },

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
//   - confidence: optional 'confirmed' | 'reported' | 'unknown' (defaults to
//       'confirmed' when omitted). Encodes how solid the sourcing is. Use it for
//       opaque rows — e.g. Chinese labs' chip/datacenter sourcing — so the map can
//       stay honest instead of omitting rows it can't fully verify. Renders as
//       border style: solid = confirmed, dashed = reported, dotted = unknown.
//
//   - region: optional 'us' | 'china' on the COMPANY (defaults to 'us'). Used to
//       group/label labs; the provider set differs by region.
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
          p('Claude Cowork', 'https://claude.com/product/cowork')
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
          p('Microsoft Foundry', 'https://learn.microsoft.com/en-us/azure/ai-foundry/foundry-models/how-to/use-foundry-models-claude?view=foundry-classic&tabs=python'),
        ] 
      },
      models: { 
        provider: 'Anthropic', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Claude family', 'https://platform.claude.com/docs/en/about-claude/models/overview'),
        ] 
      },
      cloud: { 
        provider: 'Anthropic/Fluidstack + Amazon + CoreWeave + Google + Microsoft + SpaceXAI',
        providerUrl: null, 
        inHouse: false, 
        products: [
          p('Akamai', 'https://www.forbes.com/sites/janakirammsv/2026/05/08/akamai-lands-18-billion-anthropic-deal-as-cdn-becomes-ai-cloud/'),
          p('AWS', 'https://www.aboutamazon.com/news/aws/amazon-invests-additional-4-billion-anthropic-ai'),
          p('CoreWeave', 'https://investors.coreweave.com/news/news-details/2026/CoreWeave-Announces-Multi-Year-Agreement-With-Anthropic/default.aspx'), 
          p('Google Cloud', 'https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services'),
          p('Microsoft', 'https://www.anthropic.com/news/microsoft-nvidia-anthropic-announce-strategic-partnerships'),
          p('SpaceXAI', 'https://www.anthropic.com/news/higher-limits-spacex'),
        ], 
        dependencies: ['akamai', 'amazon', 'coreweave', 'fluidstack', 'google', 'microsoft', 'spacexai'] 
      },
      infrastructure: { 
        provider: 'Anthropic/Fluidstack/Hut 8 + Amazon',
        providerUrl: null, 
        inHouse: false, 
        products: [
          p('Anthropic datacenters (w/ Fluidstack/Hut 8)', 'https://www.prnewswire.com/news-releases/hut-8-announces-ai-infrastructure-partnership-with-anthropic-and-fluidstack-302644377.html'),         
          p('Project Rainier (AWS partnership)', 'https://www.aboutamazon.com/news/aws/aws-project-rainier-ai-trainium-chips-compute-cluster'),         
        ], 
        dependencies: ['amazon', 'fluidstack', 'hut8'] 
      },
      chips: { 
        provider: 'Amazon + Google(+Broadcom) + NVIDIA', 
        providerUrl: null,
        inHouse: false, 
        products: [
          p('AWS Trainium/Inferentia accelerators', 'https://www.aboutamazon.com/news/aws/amazon-invests-additional-4-billion-anthropic-ai'),
          p('Google Cloud TPUs (supplied by Google and Broadcom)', 'https://www.tomshardware.com/tech-industry/broadcom-expands-anthropic-deal-to-3-5gw-of-google-tpu-capacity-from-2027'), 
          p('NVIDIA GPUs', 'https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services'),
        ], 
        dependencies: ['amazon', 'broadcom', 'google', 'nvidia'] 
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
          p('Gemini family','https://deepmind.google/models/gemini/'), 
          p('Nano Banana', 'https://deepmind.google/models/gemini-image/'),
          p('Gemma', 'https://deepmind.google/models/gemma/'),
          p('Veo', 'https://deepmind.google/models/veo/'), 
          p('Lyria', 'https://deepmind.google/models/lyria/'),
        ] 
      },
      cloud: { 
        provider: 'Google + SpaceXAI', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Google Cloud', 'https://cloud.google.com/'),
          p('SpaceXAI', 'https://www.nytimes.com/2026/06/05/technology/spacex-google-deal.html'),
        ] 
      },
      infrastructure: { 
        provider: 'Google', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Google Cloud datacenters', 'https://cloud.google.com/about/locations'),
        ] 
      },
      chips: { 
        provider: 'Google', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Google Cloud TPUs (Broadcom co-developed)', 'https://cloud.google.com/tpu?hl=en'),
        ],
        dependencies: ['broadcom'],
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
          p('Llama family', 'https://huggingface.co/meta-llama'),
          p('Muse family', 'https://ai.meta.com/blog/introducing-muse-spark-msl/')

        ] 
      },
      cloud: { 
        provider: 'Meta + Amazon + CoreWeave + Google + Microsoft + Nebius',
        providerUrl: null,
        inHouse: false, 
        products: [
          p('AWS', 'https://ai.meta.com/blog/aws-program-startups-build-with-llama/'), 
          p('CoreWeave', 'https://finance.yahoo.com/news/coreweave-signs-14-billion-ai-124208188.html'), 
          p('Google Cloud', 'https://www.cnbc.com/2025/08/21/google-scores-six-year-meta-cloud-deal-worth-over-10-billion.html'), 
          p('Microsoft Azure', 'https://blogs.microsoft.com/blog/2023/07/18/microsoft-and-meta-expand-their-ai-partnership-with-llama-2-on-azure-and-windows/'),
          p('Nebius', 'https://nebius.com/newsroom/nebius-signs-new-ai-infrastructure-agreement-with-meta'), 
        ],
        dependencies: ['amazon', 'coreweave', 'google', 'microsoft', 'nebius'] 
      },
      infrastructure: { 
        provider: 'Meta', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Meta Data Centers', 'https://datacenters.atmeta.com/'),
          p('Nebius', 'https://nebius.com/newsroom/nebius-signs-new-ai-infrastructure-agreement-with-meta'), 
        ],
      },
      chips: { 
        provider: 'Meta + AMD + Google + NVIDIA', 
        providerUrl: null,
        inHouse: false, 
        products: [
          p('MTIAs (Broadcom co-developed)', 'https://ai.meta.com/blog/meta-mtia-scale-ai-chips-for-billions/'),
          p('AMD GPUs', 'https://www.amd.com/en/newsroom/press-releases/2026-2-24-amd-and-meta-announce-expanded-strategic-partnersh.html'),
          p('Google TPUs', 'https://finance.yahoo.com/news/google-signs-multibillion-dollar-ai-232844608.html'),
          p('NVIDIA GPUs', 'https://nvidianews.nvidia.com/news/meta-builds-ai-infrastructure-with-nvidia'),
        ], 
        dependencies: ['amd', 'broadcom', 'google', 'nvidia'] 
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
          p('Codex', 'https://openai.com/codex/'),
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
          p('GPT family', 'https://platform.openai.com/docs/models'), 
          p('Sora', 'https://platform.openai.com/docs/models'), 
          p('gpt-oss', 'https://platform.openai.com/docs/models'),
        ] 
      },
      cloud: { 
        provider: 'OpenAI + Amazon + Cerebras + CoreWeave + Google + Microsoft + Oracle',
        providerUrl: null,
        inHouse: false, 
        products: [
          p('AWS', 'https://www.aboutamazon.com/news/aws/aws-open-ai-workloads-compute-infrastructure'), 
          p('Cerebras', 'https://finance.yahoo.com/news/openai-buy-compute-capacity-startup-200619645.html'), 
          p('CoreWeave', 'https://www.coreweave.com/news/coreweave-expands-agreement-with-openai-by-up-to-6-5b'), 
          p('Google Cloud', 'https://www.reuters.com/business/retail-consumer/openai-taps-google-unprecedented-cloud-deal-despite-ai-rivalry-sources-say-2025-06-10/'), 
          p('Microsoft Azure', 'https://openai.com/index/next-chapter-of-microsoft-openai-partnership/'), 
          p('Oracle', 'https://openai.com/index/five-new-stargate-sites/'), 
        ],
        dependencies: ['amazon', 'cerebras', 'coreweave', 'google', 'microsoft', 'oracle']
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
        provider: 'AMD + Google + Microsoft + NVIDIA + Broadcom', 
        providerUrl: null,
        inHouse: false, 
        products: [
          p('Jalapeño (in-house inference accelerator; Broadcom co-developed)', 'https://openai.com/index/openai-broadcom-jalapeno-inference-chip/'),
          p('AMD GPUs', 'https://openai.com/index/openai-amd-strategic-partnership/'),
          p('Google Cloud TPUs', 'https://www.reuters.com/business/openai-turns-googles-ai-chips-power-its-products-information-reports-2025-06-27/'), 
          p('NVIDIA GPUs', 'https://nvidianews.nvidia.com/news/openai-and-nvidia-announce-strategic-partnership-to-deploy-10gw-of-nvidia-systems'), 
          p('Microsoft Maia accelerators', 'https://blogs.microsoft.com/blog/2026/01/26/maia-200-the-ai-accelerator-built-for-inference/'), 
        ], 
        dependencies: ['amd', 'broadcom', 'google', 'microsoft', 'nvidia'] 
      },
    }
  },
  {
    id: 'spacexai',
    name: 'SpaceXAI',
    color: '#000000',
    stack: {
      applications: { 
        provider: 'SpaceXAI', 
        inHouse: true, 
        products: [
          p('Grok', 'https://grok.com/'),
        ] 
      },
      api: { 
        provider: 'SpaceXAI', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('SpaceXAI API', 'https://x.ai/api'),
          p('Microsoft Azure AI Foundry', 'https://devblogs.microsoft.com/foundry/announcing-grok-3-and-grok-3-mini-on-azure-ai-foundry/'),
          p('OCI Generative AI', 'https://docs.oracle.com/en-us/iaas/Content/generative-ai/xai-models.htm')
        ] 
      },
      models: { 
        provider: 'SpaceXAI', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Grok family', 'https://docs.x.ai/docs/models'),
        ] 
      },
      cloud: { 
        provider: 'SpaceXAI + Amazon + Google + Oracle', 
        providerUrl: null,
        inHouse: false, 
        products: [
          p('AWS', 'https://x.ai/legal/subprocessor-list'),
          p('Google Cloud', 'https://x.ai/legal/subprocessor-list'),
          p('OCI', 'https://x.ai/legal/subprocessor-list'),
        ],
        dependencies: ['amazon', 'google', 'oracle'] 
      },
      infrastructure: { 
        provider: 'SpaceXAI', 
        providerUrl: null,
        inHouse: true, 
        products: [
          p('Colossus datacenters', 'https://x.ai/colossus'),
          p('MACROHARDRR', 'https://apnews.com/article/xai-musk-data-center-mississippi-memphis-433691ace945708a04762b4791602f3d'),
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
  // ---------------------------------------------------------------------------
  // CHINESE LABS (MOCK) — sourcing on the lower layers is deliberately marked
  // with confidence levels. Verify/replace URLs and claims before publishing.
  // ---------------------------------------------------------------------------
  {
    id: 'deepseek',
    name: 'DeepSeek',
    color: '#4D6BFE',
    region: 'china',
    stack: {
      applications: {
        provider: 'DeepSeek',
        providerUrl: null,
        inHouse: true,
        confidence: 'confirmed',
        products: [
          p('DeepSeek app/chat', 'https://chat.deepseek.com/'),
        ]
      },
      api: {
        provider: 'DeepSeek',
        providerUrl: null,
        inHouse: true,
        confidence: 'confirmed',
        products: [
          p('DeepSeek API', 'https://platform.deepseek.com/'),
          p('Open weights', 'https://huggingface.co/deepseek-ai'),
        ]
      },
      models: {
        provider: 'DeepSeek',
        providerUrl: null,
        inHouse: true,
        confidence: 'confirmed',
        products: [
          p('DeepSeek-V3 / R1 family', 'https://huggingface.co/deepseek-ai'),
        ]
      },
      cloud: {
        provider: 'High-Flyer (self-operated)',
        providerUrl: null,
        inHouse: true,
        confidence: 'reported',
        products: [
          p('Self-operated clusters (parent: High-Flyer)'),
        ]
      },
      infrastructure: {
        provider: 'High-Flyer (self-operated)',
        providerUrl: null,
        inHouse: true,
        confidence: 'reported',
        products: [
          p('Fire-Flyer clusters (reported)'),
        ]
      },
      chips: {
        provider: 'NVIDIA + Huawei (reported)',
        providerUrl: null,
        inHouse: false,
        confidence: 'unknown',
        products: [
          p('NVIDIA A100 / H800 (reported, pre-controls stockpile)'),
          p('Huawei Ascend for inference (reported)'),
        ],
        dependencies: ['nvidia', 'huawei']
      },
    }
  },
  {
    id: 'alibaba',
    name: 'Alibaba (Qwen)',
    color: '#FF6A00',
    region: 'china',
    stack: {
      applications: {
        provider: 'Alibaba',
        providerUrl: null,
        inHouse: true,
        confidence: 'confirmed',
        products: [
          p('Qwen chat', 'https://chat.qwen.ai/'),
          p('Quark'),
        ]
      },
      api: {
        provider: 'Alibaba Cloud',
        providerUrl: null,
        inHouse: true,
        confidence: 'confirmed',
        products: [
          p('Model Studio (DashScope)', 'https://www.alibabacloud.com/en/product/modelstudio'),
          p('Open weights', 'https://huggingface.co/Qwen'),
        ]
      },
      models: {
        provider: 'Alibaba',
        providerUrl: null,
        inHouse: true,
        confidence: 'confirmed',
        products: [
          p('Qwen family', 'https://huggingface.co/Qwen'),
        ]
      },
      cloud: {
        provider: 'Alibaba Cloud',
        providerUrl: null,
        inHouse: true,
        confidence: 'confirmed',
        products: [
          p('Alibaba Cloud', 'https://www.alibabacloud.com/'),
        ]
      },
      infrastructure: {
        provider: 'Alibaba Cloud',
        providerUrl: null,
        inHouse: true,
        confidence: 'confirmed',
        products: [
          p('Alibaba Cloud datacenters', 'https://www.alibabacloud.com/en/global-locations'),
        ]
      },
      chips: {
        provider: 'NVIDIA + Huawei + in-house (reported)',
        providerUrl: null,
        inHouse: false,
        confidence: 'reported',
        products: [
          p('NVIDIA H20 / export-compliant parts (reported)'),
          p('Huawei Ascend (reported)'),
          p('T-Head / in-house accelerators (reported)'),
        ],
        dependencies: ['nvidia', 'huawei']
      },
    }
  },
  {
    id: 'moonshot',
    name: 'Moonshot (Kimi)',
    color: '#5A4FCF',
    region: 'china',
    stack: {
      applications: {
        provider: 'Moonshot AI',
        providerUrl: null,
        inHouse: true,
        confidence: 'confirmed',
        products: [
          p('Kimi', 'https://www.kimi.com/'),
        ]
      },
      api: {
        provider: 'Moonshot AI',
        providerUrl: null,
        inHouse: true,
        confidence: 'confirmed',
        products: [
          p('Moonshot API', 'https://platform.moonshot.ai/'),
          p('Open weights', 'https://huggingface.co/moonshotai'),
        ]
      },
      models: {
        provider: 'Moonshot AI',
        providerUrl: null,
        inHouse: true,
        confidence: 'confirmed',
        products: [
          p('Kimi K2 family', 'https://huggingface.co/moonshotai'),
        ]
      },
      cloud: {
        provider: 'Undisclosed public cloud',
        providerUrl: null,
        inHouse: false,
        confidence: 'unknown',
        products: [
          p('Undisclosed (Alibaba is an investor; cloud provider not confirmed)'),
        ]
      },
      infrastructure: {
        provider: 'Undisclosed',
        providerUrl: null,
        inHouse: false,
        confidence: 'unknown',
        products: [
          p('Undisclosed'),
        ]
      },
      chips: {
        provider: 'NVIDIA + Huawei (reported)',
        providerUrl: null,
        inHouse: false,
        confidence: 'unknown',
        products: [
          p('NVIDIA H800 / H20 (reported)'),
          p('Huawei Ascend (reported)'),
        ],
        dependencies: ['nvidia', 'huawei']
      },
    }
  },
  {
    id: 'zhipu',
    name: 'Zhipu (Z.ai)',
    color: '#3B5BDB',
    region: 'china',
    stack: {
      applications: {
        provider: 'Zhipu AI',
        providerUrl: null,
        inHouse: true,
        confidence: 'confirmed',
        products: [
          p('Z.ai chat', 'https://chat.z.ai/'),
        ]
      },
      api: {
        provider: 'Zhipu AI',
        providerUrl: null,
        inHouse: true,
        confidence: 'confirmed',
        products: [
          p('BigModel / Z.ai API', 'https://open.bigmodel.cn/'),
          p('Open weights', 'https://huggingface.co/zai-org'),
        ]
      },
      models: {
        provider: 'Zhipu AI',
        providerUrl: null,
        inHouse: true,
        confidence: 'confirmed',
        products: [
          p('GLM family', 'https://huggingface.co/zai-org'),
        ]
      },
      cloud: {
        provider: 'Undisclosed public cloud',
        providerUrl: null,
        inHouse: false,
        confidence: 'unknown',
        products: [
          p('Undisclosed'),
        ]
      },
      infrastructure: {
        provider: 'Undisclosed',
        providerUrl: null,
        inHouse: false,
        confidence: 'unknown',
        products: [
          p('Undisclosed'),
        ]
      },
      chips: {
        provider: 'NVIDIA + Huawei (reported)',
        providerUrl: null,
        inHouse: false,
        confidence: 'reported',
        products: [
          p('NVIDIA (reported)'),
          p('Huawei Ascend (reported)'),
        ],
        dependencies: ['nvidia', 'huawei']
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
