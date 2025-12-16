import React, { useState } from 'react';

const AIStackVisualization = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const stackLayers = [
    { id: 'applications', name: 'Applications', description: 'Consumer & enterprise products' },
    { id: 'api', name: 'API / Platform', description: 'Developer access & tooling' },
    { id: 'models', name: 'Models', description: 'Foundation models & fine-tuning' },
    { id: 'training', name: 'Training Infrastructure', description: 'Compute for training runs' },
    { id: 'cloud', name: 'Cloud / Data Centers', description: 'Physical infrastructure' },
    { id: 'chips', name: 'Chips / Hardware', description: 'AI accelerators' },
  ];

  const companies = [
    {
      id: 'google',
      name: 'Google DeepMind',
      color: '#4285F4',
      stack: {
        applications: { provider: 'Google', inHouse: true, products: ['Gemini App', 'Search AI', 'Workspace AI'] },
        api: { provider: 'Google', inHouse: true, products: ['Vertex AI', 'Gemini API'] },
        models: { provider: 'Google', inHouse: true, products: ['Gemini', 'PaLM', 'Gemma'] },
        training: { provider: 'Google', inHouse: true, products: ['TPU Pods'] },
        cloud: { provider: 'Google', inHouse: true, products: ['Google Cloud'] },
        chips: { provider: 'Google', inHouse: true, products: ['TPU v5', 'Trillium'] },
      }
    },
    {
      id: 'anthropic',
      name: 'Anthropic',
      color: '#D4A574',
      stack: {
        applications: { provider: 'Anthropic', inHouse: true, products: ['Claude.ai', 'Claude for Enterprise'] },
        api: { provider: 'Anthropic', inHouse: true, products: ['Claude API', 'Amazon Bedrock'] },
        models: { provider: 'Anthropic', inHouse: true, products: ['Claude 3.5', 'Claude 3'] },
        training: { provider: 'Mixed', inHouse: false, products: ['AWS', 'Google Cloud'], dependencies: ['amazon', 'google'] },
        cloud: { provider: 'AWS + GCP', inHouse: false, products: ['Amazon Web Services', 'Google Cloud'], dependencies: ['amazon', 'google'] },
        chips: { provider: 'NVIDIA + Google', inHouse: false, products: ['H100', 'TPU'], dependencies: ['nvidia', 'google'] },
      }
    },
    {
      id: 'openai',
      name: 'OpenAI',
      color: '#10A37F',
      stack: {
        applications: { provider: 'OpenAI', inHouse: true, products: ['ChatGPT', 'DALL-E', 'Sora'] },
        api: { provider: 'OpenAI', inHouse: true, products: ['OpenAI API', 'Azure OpenAI'] },
        models: { provider: 'OpenAI', inHouse: true, products: ['GPT-4o', 'o1', 'GPT-4'] },
        training: { provider: 'Microsoft', inHouse: false, products: ['Azure AI Infrastructure'], dependencies: ['microsoft'] },
        cloud: { provider: 'Microsoft', inHouse: false, products: ['Microsoft Azure'], dependencies: ['microsoft'] },
        chips: { provider: 'NVIDIA', inHouse: false, products: ['H100', 'GB200'], dependencies: ['nvidia'] },
      }
    },
    {
      id: 'meta',
      name: 'Meta AI',
      color: '#0668E1',
      stack: {
        applications: { provider: 'Meta', inHouse: true, products: ['Meta AI', 'Instagram AI', 'WhatsApp AI'] },
        api: { provider: 'Meta', inHouse: true, products: ['Llama API', 'Open weights'] },
        models: { provider: 'Meta', inHouse: true, products: ['Llama 3.1', 'Llama 3'] },
        training: { provider: 'Meta', inHouse: true, products: ['Research SuperCluster'] },
        cloud: { provider: 'Meta', inHouse: true, products: ['Meta Data Centers'] },
        chips: { provider: 'NVIDIA', inHouse: false, products: ['H100 clusters'], dependencies: ['nvidia'] },
      }
    },
    {
      id: 'xai',
      name: 'xAI',
      color: '#1D1D1F',
      stack: {
        applications: { provider: 'xAI', inHouse: true, products: ['Grok (via X)'] },
        api: { provider: 'xAI', inHouse: true, products: ['Grok API'] },
        models: { provider: 'xAI', inHouse: true, products: ['Grok-2', 'Grok-1.5'] },
        training: { provider: 'xAI', inHouse: true, products: ['Colossus (Memphis)'] },
        cloud: { provider: 'Mixed', inHouse: false, products: ['Oracle Cloud', 'Own facilities'], dependencies: ['oracle'] },
        chips: { provider: 'NVIDIA', inHouse: false, products: ['H100 (100k+)'], dependencies: ['nvidia'] },
      }
    },
  ];

  const infrastructureProviders = [
    { id: 'nvidia', name: 'NVIDIA', color: '#76B900', type: 'chips' },
    { id: 'amazon', name: 'Amazon (AWS)', color: '#FF9900', type: 'cloud' },
    { id: 'microsoft', name: 'Microsoft (Azure)', color: '#00A4EF', type: 'cloud' },
    { id: 'oracle', name: 'Oracle', color: '#F80000', type: 'cloud' },
  ];

  const isHighlighted = (company, layer) => {
    if (!selectedCompany && !selectedProvider) return true;
    if (selectedCompany === company.id) return true;
    if (selectedProvider) {
      const layerData = company.stack[layer.id];
      return layerData.dependencies?.includes(selectedProvider);
    }
    return false;
  };

  const getOpacity = (company, layer) => {
    if (!selectedCompany && !selectedProvider) return 1;
    return isHighlighted(company, layer) ? 1 : 0.2;
  };

  const getDependencyCount = (providerId) => {
    let count = 0;
    companies.forEach(company => {
      Object.values(company.stack).forEach(layer => {
        if (layer.dependencies?.includes(providerId)) count++;
      });
    });
    return count;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">The AI Stack</h1>
          <p className="text-slate-400">Comparing vertical integration across frontier AI developers</p>
          <p className="text-sm text-slate-500 mt-1">Click on a company or infrastructure provider to highlight dependencies</p>
        </header>

        {/* Infrastructure Providers */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wide">Key Infrastructure Providers</h2>
          <div className="flex gap-3 flex-wrap">
            {infrastructureProviders.map(provider => (
              <button
                key={provider.id}
                onClick={() => setSelectedProvider(selectedProvider === provider.id ? null : provider.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedProvider === provider.id 
                    ? 'ring-2 ring-white' 
                    : 'hover:ring-1 hover:ring-slate-500'
                }`}
                style={{ 
                  backgroundColor: provider.color + '20',
                  borderLeft: `3px solid ${provider.color}`,
                  opacity: selectedProvider && selectedProvider !== provider.id ? 0.4 : 1
                }}
              >
                <span>{provider.name}</span>
                <span className="bg-slate-700 px-2 py-0.5 rounded text-xs">
                  {getDependencyCount(provider.id)} deps
                </span>
              </button>
            ))}
            {(selectedCompany || selectedProvider) && (
              <button
                onClick={() => { setSelectedCompany(null); setSelectedProvider(null); }}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-700 hover:bg-slate-600 transition-all"
              >
                Clear selection
              </button>
            )}
          </div>
        </div>

        {/* Main Grid */}
        <div className="overflow-x-auto">
          <div className="grid gap-4" style={{ gridTemplateColumns: `180px repeat(${companies.length}, 1fr)`, minWidth: '900px' }}>
            {/* Header Row */}
            <div></div>
            {companies.map(company => (
              <button
                key={company.id}
                onClick={() => setSelectedCompany(selectedCompany === company.id ? null : company.id)}
                className={`p-4 rounded-t-xl text-center font-semibold transition-all ${
                  selectedCompany === company.id ? 'ring-2 ring-white' : ''
                }`}
                style={{ 
                  backgroundColor: company.color,
                  opacity: selectedCompany && selectedCompany !== company.id ? 0.4 : 1
                }}
              >
                {company.name}
              </button>
            ))}

            {/* Stack Layers */}
            {stackLayers.map((layer, layerIndex) => (
              <React.Fragment key={layer.id}>
                {/* Layer Label */}
                <div className="flex flex-col justify-center pr-4">
                  <span className="font-medium text-white">{layer.name}</span>
                  <span className="text-xs text-slate-400">{layer.description}</span>
                </div>

                {/* Company cells for this layer */}
                {companies.map(company => {
                  const layerData = company.stack[layer.id];
                  const isInHouse = layerData.inHouse;
                  
                  return (
                    <div
                      key={`${company.id}-${layer.id}`}
                      className={`p-3 transition-all duration-200 ${
                        layerIndex === stackLayers.length - 1 ? 'rounded-b-xl' : ''
                      }`}
                      style={{
                        backgroundColor: isInHouse ? company.color + '30' : '#475569',
                        borderLeft: `3px solid ${isInHouse ? company.color : '#94a3b8'}`,
                        opacity: getOpacity(company, layer)
                      }}
                    >
                      <div className="text-xs font-semibold mb-1" style={{ color: isInHouse ? company.color : '#94a3b8' }}>
                        {layerData.provider}
                        {!isInHouse && <span className="ml-1 text-slate-400">(external)</span>}
                      </div>
                      <div className="text-xs text-slate-300">
                        {layerData.products.join(', ')}
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500/30 border-l-2 border-blue-500"></div>
            <span className="text-slate-400">In-house capability</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-600 border-l-2 border-slate-400"></div>
            <span className="text-slate-400">External dependency</span>
          </div>
        </div>

        {/* Insight Panel */}
        {selectedCompany && (
          <div className="mt-6 p-4 bg-slate-800 rounded-xl">
            <h3 className="font-semibold mb-2">
              {companies.find(c => c.id === selectedCompany)?.name} Integration Analysis
            </h3>
            {(() => {
              const company = companies.find(c => c.id === selectedCompany);
              const inHouseCount = Object.values(company.stack).filter(l => l.inHouse).length;
              const total = Object.values(company.stack).length;
              return (
                <p className="text-slate-300 text-sm">
                  {inHouseCount === total 
                    ? 'Fully vertically integrated across all stack layers.' 
                    : `Controls ${inHouseCount} of ${total} stack layers in-house. External dependencies: ${
                        [...new Set(Object.values(company.stack).flatMap(l => l.dependencies || []))].map(
                          d => infrastructureProviders.find(p => p.id === d)?.name || d
                        ).join(', ')
                      }.`
                  }
                </p>
              );
            })()}
          </div>
        )}

        {selectedProvider && (
          <div className="mt-6 p-4 bg-slate-800 rounded-xl">
            <h3 className="font-semibold mb-2">
              {infrastructureProviders.find(p => p.id === selectedProvider)?.name} Dependencies
            </h3>
            <p className="text-slate-300 text-sm">
              {companies.filter(c => 
                Object.values(c.stack).some(l => l.dependencies?.includes(selectedProvider))
              ).map(c => c.name).join(', ')} depend on this provider.
            </p>
          </div>
        )}

        <footer className="mt-8 pt-4 border-t border-slate-700 text-xs text-slate-500">
          <p>Last updated: [Month Year] • Data compiled from public sources</p>
        </footer>
      </div>
    </div>
  );
};

export default AIStackVisualization;
