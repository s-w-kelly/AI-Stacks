import React, { useState } from 'react';
import { companies, stackLayers, infrastructureProviders, lastUpdated } from './data.js';

const AIStackVisualization = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);

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

  const clearSelection = () => {
    setSelectedCompany(null);
    setSelectedProvider(null);
  };

  return (
    <div className="min-h-screen bg-slate-700 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">AI Stack Tracker</h1>
          <p className="text-slate-400">Monitoring service/infrastructure partnerships and vertical integration across frontier AI developers</p>
          <p className="text-sm text-slate-500 mt-1">
            Click on a company or provider to highlight dependencies
          </p>
        </header>

        {/* Infrastructure Providers */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wide">
            Key Providers
          </h2>
          <div className="flex gap-2 md:gap-3 flex-wrap">
            {infrastructureProviders.map(provider => (
              <button
                key={provider.id}
                onClick={() => setSelectedProvider(selectedProvider === provider.id ? null : provider.id)}
                className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-2 ${
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
                  {getDependencyCount(provider.id)}
                </span>
              </button>
            ))}
            {(selectedCompany || selectedProvider) && (
              <button
                onClick={clearSelection}
                className="px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium bg-slate-700 hover:bg-slate-600 transition-all"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Main Grid */}
        <div className="overflow-x-auto pb-4">
          <div 
            className="grid gap-2 md:gap-4" 
            style={{ 
              gridTemplateColumns: `140px repeat(${companies.length}, minmax(140px, 1fr))`, 
              minWidth: '800px' 
            }}
          >
            {/* Header Row */}
            <div></div>
            {companies.map(company => (
              <button
                key={company.id}
                onClick={() => setSelectedCompany(selectedCompany === company.id ? null : company.id)}
                className={`p-3 md:p-4 rounded-t-xl text-center font-semibold text-sm md:text-base transition-all ${
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
                <div className="flex flex-col justify-center pr-2 md:pr-4">
                  <span className="font-medium text-white text-sm md:text-base">{layer.name}</span>
                  <span className="text-xs text-slate-400 hidden md:block">{layer.description}</span>
                </div>

                {/* Company cells for this layer */}
                {companies.map(company => {
                  const layerData = company.stack[layer.id];
                  const isInHouse = layerData.inHouse;
                  
                  return (
                    <div
                      key={`${company.id}-${layer.id}`}
                      className={`p-2 md:p-3 transition-all duration-200 ${
                        layerIndex === stackLayers.length - 1 ? 'rounded-b-xl' : ''
                      }`}
                      style={{
                        backgroundColor: isInHouse ? company.color + '30' : '#475569',
                        borderLeft: `3px solid ${isInHouse ? company.color : '#94a3b8'}`,
                        opacity: getOpacity(company, layer)
                      }}
                    >
                      <div 
                        className="text-xs font-semibold mb-1" 
                        style={{ color: isInHouse ? company.color : '#94a3b8' }}
                      >
                        {layerData.provider}
                        {!isInHouse && <span className="ml-1 text-slate-400">(ext)</span>}
                      </div>
                      <div className="text-xs text-slate-300 line-clamp-2">
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
        <div className="mt-4 md:mt-6 flex gap-4 md:gap-6 text-xs md:text-sm">
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
              const externalDeps = [...new Set(
                Object.values(company.stack).flatMap(l => l.dependencies || [])
              )];
              return (
                <p className="text-slate-300 text-sm">
                  {inHouseCount === total 
                    ? 'Fully vertically integrated across all stack layers.' 
                    : `Controls ${inHouseCount} of ${total} stack layers in-house. External dependencies: ${
                        externalDeps.map(
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

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-slate-700 text-xs text-slate-500">
          <p>Last updated: {lastUpdated}</p>
          <p className="mt-1">Data compiled from public sources. For corrections or updates, contact sk2585@georgetown.edu.</p>
        </footer>
      </div>
    </div>
  );
};

export default AIStackVisualization;
