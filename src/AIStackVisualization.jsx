import React, { useState } from 'react';
import { companies, stackLayers, infrastructureProviders, lastUpdated } from './data.js';

// Small external-link glyph shown on linked product chips.
const ExternalArrow = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="mt-[3px] h-3 w-3 shrink-0 opacity-40 transition-opacity group-hover:opacity-100"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17 17 7" />
    <path d="M9 7h8v8" />
  </svg>
);

// Products render as a stacked list of soft chips — one row each — so long,
// descriptive names stay readable and linked entries are a clear hover target.
const ProductList = ({ products }) => {
  return (
    <ul className="flex flex-col gap-1">
      {products.map(product => (
        <li key={product.name}>
          {product.url ? (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group flex items-start gap-1.5 rounded bg-ink/[0.05] px-2 py-1 text-xs leading-snug text-muted transition-colors hover:bg-accent/10 hover:text-accent"
            >
              <span className="flex-1">{product.name}</span>
              <ExternalArrow />
            </a>
          ) : (
            <span className="flex rounded bg-ink/[0.05] px-2 py-1 text-xs leading-snug text-muted">
              {product.name}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

// Maps a confidence level to a border style + label for the cell.
// Omitted / 'confirmed' reads as solid; weaker sourcing gets dashed/dotted.
const CONFIDENCE = {
  confirmed: { border: 'solid', label: null },
  reported:  { border: 'dashed', label: 'reported' },
  unknown:   { border: 'dotted', label: 'unverified' },
};

// Small marker shown next to a provider when sourcing is below 'confirmed'.
const ConfidenceBadge = ({ level }) => {
  const cfg = CONFIDENCE[level];
  if (!cfg || !cfg.label) return null;
  return (
    <span className="shrink-0 rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
      {cfg.label}
    </span>
  );
};

// Sun/moon icon toggle for light/dark theme.
const ThemeToggle = ({ theme, setTheme }) => {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-hairline bg-surface text-muted shadow-card transition-colors hover:text-ink"
    >
      {isDark ? (
        // Moon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        // Sun
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )}
    </button>
  );
};

// Helper component for rendering provider name with optional link
const ProviderName = ({ provider, providerUrl, isInHouse, color }) => {
  const baseStyle = { color: isInHouse ? color : 'rgb(var(--muted))' };

  if (providerUrl) {
    return (
      <a
        href={providerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs font-semibold underline decoration-dotted underline-offset-2 hover:decoration-solid transition-colors"
        style={baseStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {provider}
        {!isInHouse && <span className="ml-1 font-normal text-faint no-underline">(ext)</span>}
      </a>
    );
  }

  return (
    <div className="text-xs font-semibold" style={baseStyle}>
      {provider}
      {!isInHouse && <span className="ml-1 font-normal text-faint">(ext)</span>}
    </div>
  );
};

// A single clickable provider filter chip in the Key Dependencies bar.
const ProviderChip = ({ provider, count, selectedProvider, setSelectedProvider }) => {
  const isSelected = selectedProvider === provider.id;
  const isDimmed = selectedProvider && !isSelected;
  return (
    <button
      onClick={() => setSelectedProvider(isSelected ? null : provider.id)}
      className={`group flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium transition-all duration-200 active:scale-[0.98] ${
        isSelected
          ? 'border-accent bg-accent text-white shadow-card'
          : 'border-hairline bg-surface text-ink hover:border-accent/40 hover:shadow-card'
      } ${isDimmed ? 'opacity-45' : 'opacity-100'}`}
    >
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full ring-1 ring-black/10"
        style={{ backgroundColor: provider.color }}
      />
      <span>{provider.name}</span>
      <span
        className={`tabular rounded px-1.5 py-0.5 font-mono text-[11px] ${
          isSelected ? 'bg-paper/25 text-paper' : 'bg-paper text-muted'
        }`}
      >
        {count}
      </span>
    </button>
  );
};

// Renders one stack matrix (layers as rows) for a given set of labs.
// Rendered once per region so each table stays narrow as labs are added.
// The region's Key Dependencies bar sits directly under the header.
const StackTable = ({ title, subtitle, companyList, providers, providerCount, selectedProvider, setSelectedProvider, headerAction, selectedCompany, setSelectedCompany, getOpacity }) => {
  if (companyList.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="mb-4 border-b border-hairline pb-2">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-serif text-xl font-semibold text-ink">{title}</h2>
          {headerAction}
        </div>
        {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
      </div>

      {providers && providers.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-muted">
            Key Dependencies
          </h3>
          <div className="flex flex-wrap gap-2">
            {providers.map(provider => (
              <ProviderChip
                key={provider.id}
                provider={provider}
                count={providerCount(provider.id)}
                selectedProvider={selectedProvider}
                setSelectedProvider={setSelectedProvider}
              />
            ))}
          </div>
        </div>
      )}

      <div className="overflow-x-auto pb-2">
        <div
          className="grid gap-2 md:gap-3"
          style={{
            gridTemplateColumns: `150px repeat(${companyList.length}, minmax(150px, 1fr))`,
            minWidth: `${150 + companyList.length * 168}px`
          }}
        >
          {/* Header Row */}
          <div></div>
          {companyList.map(company => {
            const isSelected = selectedCompany === company.id;
            const isDimmed = selectedCompany && !isSelected;
            return (
              <button
                key={company.id}
                onClick={() => setSelectedCompany(isSelected ? null : company.id)}
                className={`rounded-lg border bg-surface px-3 py-3 text-center text-sm font-semibold text-ink shadow-card transition-all duration-200 hover:-translate-y-0.5 ${
                  isSelected ? 'border-accent ring-1 ring-accent' : 'border-hairline'
                } ${isDimmed ? 'opacity-40' : 'opacity-100'}`}
                style={{ borderTop: `3px solid ${company.color}` }}
              >
                {company.name}
              </button>
            );
          })}

          {/* Stack Layers */}
          {stackLayers.map((layer) => (
            <React.Fragment key={layer.id}>
              {/* Layer Label */}
              <div className="flex flex-col justify-center pr-2 md:pr-3">
                <span className="text-sm font-semibold text-ink">{layer.name}</span>
                <span className="mt-0.5 hidden text-xs leading-snug text-faint md:block">{layer.description}</span>
              </div>

              {/* Company cells for this layer */}
              {companyList.map(company => {
                const layerData = company.stack[layer.id];
                const isInHouse = layerData.inHouse;
                const confidence = layerData.confidence || 'confirmed';
                const borderStyle = (CONFIDENCE[confidence] || CONFIDENCE.confirmed).border;

                return (
                  <div
                    key={`${company.id}-${layer.id}`}
                    className="rounded-lg border border-hairline p-2.5 shadow-card transition-all duration-200 md:p-3"
                    style={{
                      backgroundColor: isInHouse ? company.color + '1f' : 'rgb(var(--surface))',
                      borderLeft: `3px ${borderStyle} ${isInHouse ? company.color : 'rgb(var(--faint))'}`,
                      opacity: getOpacity(company, layer)
                    }}
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <ProviderName
                        provider={layerData.provider}
                        providerUrl={layerData.providerUrl}
                        isInHouse={isInHouse}
                        color={company.color}
                      />
                      <ConfidenceBadge level={confidence} />
                    </div>
                    <div className="mt-1.5">
                      <ProductList products={layerData.products} />
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

const SwatchLabel = ({ swatch, children }) => (
  <div className="flex items-center gap-2">
    {swatch}
    <span className="text-muted">{children}</span>
  </div>
);

const AIStackVisualization = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  // Initialized from the class the pre-paint script already set on <html>.
  const [theme, setThemeState] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light'
  );

  const setTheme = (mode) => {
    setThemeState(mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', mode === 'dark' ? '#181715' : '#f5f4f0');
    try { localStorage.setItem('theme', mode); } catch (e) { /* storage unavailable */ }
  };

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
    return isHighlighted(company, layer) ? 1 : 0.25;
  };

  // Counts how many layers across the given labs depend on a provider.
  const dependencyCount = (providerId, list) => {
    let count = 0;
    list.forEach(company => {
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

  const usCompanies = companies.filter(c => (c.region || 'us') === 'us');
  const chinaCompanies = companies.filter(c => c.region === 'china');

  // A provider belongs to a region's dependency bar if any lab there depends on
  // it. Shared providers (e.g. NVIDIA) show up in both, with per-region counts.
  const usProviders = infrastructureProviders.filter(p => dependencyCount(p.id, usCompanies) > 0);
  const chinaProviders = infrastructureProviders.filter(p => dependencyCount(p.id, chinaCompanies) > 0);

  return (
    <div className="min-h-[100dvh] bg-paper text-ink">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
        {/* Header */}
        <header className="mb-10 border-b border-hairline pb-8">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/stackfavlg.png"
                alt="AI Stack Tracker logo"
                className="h-10 w-10 md:h-12 md:w-12"
              />
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                AI Stack Tracker
              </h1>
            </div>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
            Monitoring hardware, infrastructure, and service partnerships/dependencies across American and Chinese frontier AI labs.
          </p>
          <p className="mt-2 text-sm text-faint">
            Select a lab or a provider to trace its dependencies across the stack.
          </p>
        </header>

        {/* Stack tables, split by region — each with its Key Dependencies bar */}
        <StackTable
          title="US Labs"
          companyList={usCompanies}
          providers={usProviders}
          providerCount={(id) => dependencyCount(id, usCompanies)}
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          headerAction={(selectedCompany || selectedProvider) && (
            <button
              onClick={clearSelection}
              className="rounded-md border border-hairline bg-surface px-3 py-1.5 text-xs font-medium text-muted transition-all duration-200 hover:border-accent/40 hover:text-ink active:scale-[0.98]"
            >
              Clear selection
            </button>
          )}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          getOpacity={getOpacity}
        />
        <StackTable
          title="Chinese Labs"
          subtitle="Lower layers (cloud, datacenters, chips) are harder to source — see confidence markers."
          companyList={chinaCompanies}
          providers={chinaProviders}
          providerCount={(id) => dependencyCount(id, chinaCompanies)}
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          getOpacity={getOpacity}
        />

        {/* Legend */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 rounded-lg border border-hairline bg-surface px-4 py-3 text-xs shadow-card">
          <SwatchLabel
            swatch={<span className="h-4 w-4 rounded border-l-[3px] border-accent" style={{ backgroundColor: 'rgb(var(--accent) / 0.12)' }} />}
          >
            Self-sufficient (may still partner)
          </SwatchLabel>
          <SwatchLabel
            swatch={<span className="h-4 w-4 rounded border border-hairline border-l-[3px] border-l-faint bg-surface" />}
          >
            Dependent on third parties
          </SwatchLabel>
          <SwatchLabel
            swatch={
              <span className="inline-flex items-center gap-1 rounded bg-ink/[0.05] px-1.5 py-0.5 text-muted">
                item<ExternalArrow />
              </span>
            }
          >
            links to source
          </SwatchLabel>
          <div className="flex items-center gap-3">
            <SwatchLabel swatch={<span className="h-4 w-4 rounded border-l-[3px] border-solid border-faint bg-surface" />}>
              confirmed
            </SwatchLabel>
            <SwatchLabel swatch={<span className="h-4 w-4 rounded border-l-[3px] border-dashed border-faint bg-surface" />}>
              reported
            </SwatchLabel>
            <SwatchLabel swatch={<span className="h-4 w-4 rounded border-l-[3px] border-dotted border-faint bg-surface" />}>
              unverified
            </SwatchLabel>
          </div>
        </div>

        {/* Insight Panel */}
        {selectedCompany && (
          <div className="mt-8 rounded-lg border border-hairline bg-surface p-5 shadow-card">
            <h3 className="mb-2 font-serif text-base font-semibold text-ink">
              {companies.find(c => c.id === selectedCompany)?.name} — integration analysis
            </h3>
            {(() => {
              const company = companies.find(c => c.id === selectedCompany);
              const inHouseCount = Object.values(company.stack).filter(l => l.inHouse).length;
              const total = Object.values(company.stack).length;
              const externalDeps = [...new Set(
                Object.values(company.stack).flatMap(l => l.dependencies || [])
              )];
              return (
                <p className="text-sm leading-relaxed text-muted">
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
          <div className="mt-8 rounded-lg border border-hairline bg-surface p-5 shadow-card">
            <h3 className="mb-2 font-serif text-base font-semibold text-ink">
              {infrastructureProviders.find(p => p.id === selectedProvider)?.name} — dependents
            </h3>
            <p className="text-sm leading-relaxed text-muted">
              {companies.filter(c =>
                Object.values(c.stack).some(l => l.dependencies?.includes(selectedProvider))
              ).map(c => c.name).join(', ')} depend on this provider.
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 flex flex-col gap-4 border-t border-hairline pt-6 text-xs text-faint sm:flex-row sm:justify-between">
          <div>
            <p className="tabular font-mono">Last updated: {lastUpdated}</p>
          </div>
          <div className="flex max-w-md flex-col sm:items-end sm:text-right">
            <p>
              Created and maintained by{' '}
              <a
                href="https://www.skellydotcom.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-muted underline decoration-faint underline-offset-2 hover:text-accent"
              >
                Spencer Kelly
              </a>.
            </p>
            <p className="mt-1">
              This website was built using Claude Code but all research/analysis/content is by me.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AIStackVisualization;
