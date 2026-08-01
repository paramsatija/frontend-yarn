import { useEffect, useRef, useState } from 'react'
import { Search, Copy, Check, Terminal, Book, Code, Braces, FileJson } from 'lucide-react'
import { useDecrypt } from '../hooks/useDecrypt'

const codeExample = `import { YARNClient } from '@yarn/sdk';

const client = new YARNClient({
  apiKey: process.env.YARN_API_KEY,
  network: 'mainnet'
});

// Subscribe to real-time price feeds
const feed = await client.capital.subscribe({
  pair: 'BTC/USD',
  granularity: '1s',
  attest: true  // Cryptographic proof
});

feed.onUpdate((data) => {
  console.log('Price:', data.price);
  console.log('Attestation:', data.proof);
  console.log('Latency:', data.metadata.latency + 'ms');
});

// Query historical evidence
const evidence = await client.evidence.query({
  type: 'price_attestation',
  from: Date.now() - 86400000,
  verified: true
});`

const sdks = [
  { name: 'JavaScript', icon: Braces, install: 'npm install @yarn/sdk', version: 'v4.2.1', color: '#f7df1e' },
  { name: 'Python', icon: Terminal, install: 'pip install yarn-sdk', version: 'v3.8.0', color: '#3776ab' },
  { name: 'Rust', icon: Code, install: 'cargo add yarn-sdk', version: 'v2.1.4', color: '#dea584' },
  { name: 'Go', icon: FileJson, install: 'go get yarn.io/sdk', version: 'v5.0.2', color: '#00add8' },
]

const docLinks = [
  { title: 'Getting Started', desc: 'Install and configure the YARN SDK in minutes' },
  { title: 'API Reference', desc: 'Complete endpoint documentation with examples' },
  { title: 'Authentication', desc: 'API keys, permissions, and security best practices' },
  { title: 'Webhooks', desc: 'Real-time event subscriptions and callbacks' },
  { title: 'Attestation', desc: 'Cryptographic proof verification guide' },
  { title: 'Error Handling', desc: 'Status codes, retries, and debugging' },
]

export default function DevelopersPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const headlineRef = useDecrypt('Built for Developers.', {})

  useEffect(() => {
    window.scrollTo(0, 0)

    const section = sectionRef.current
    if (!section) return

    const animatedElements = section.querySelectorAll('.dev-animate')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const index = parseInt(el.dataset.index || '0')
            setTimeout(() => {
              el.classList.add('animate-fade-in-up')
            }, index * 80)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={sectionRef}>
      {/* Hero */}
      <section className="min-h-[60vh] bg-yarn-base flex items-center justify-center pt-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 text-center">
          <span className="eyebrow text-yarn-neon block mb-6">
            DEVELOPERS
          </span>
          <h1
            ref={headlineRef}
            className="font-display text-display-xl text-white"
          >
            Built for Developers.
          </h1>
          <p className="text-body text-[rgba(255,255,255,0.6)] max-w-[520px] mx-auto mt-6">
            Comprehensive SDKs, real-time sandbox, and attestation proofs in
            every response. Integrate verified intelligence in hours.
          </p>

          {/* Search Bar */}
          <div
            data-index={0}
            className="dev-animate opacity-0 max-w-[600px] mx-auto mt-10 relative"
          >
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.35)]"
            />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full bg-yarn-elevated border border-[rgba(255,255,255,0.06)] py-4 pl-12 pr-4 text-body-small text-white placeholder:text-[rgba(255,255,255,0.35)] focus:outline-none focus:border-[rgba(255,255,255,0.12)] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="bg-yarn-surface py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left - Explanation */}
            <div
              data-index={0}
              className="dev-animate opacity-0"
            >
              <span className="eyebrow text-yarn-neon block mb-4">
                QUICK START
              </span>
              <h2 className="font-display text-display-l text-white mb-6">
                Integrate in 5 minutes.
              </h2>
              <p className="text-body text-[rgba(255,255,255,0.6)] mb-8">
                Our SDK handles authentication, connection management, and
                attestation verification automatically. Focus on building — we
                handle the infrastructure.
              </p>

              <ul className="space-y-4">
                {[
                  'Auto-reconnect with exponential backoff',
                  'Built-in attestation verification',
                  'TypeScript types included',
                  'Comprehensive error handling',
                ].map((item, i) => (
                  <li
                    key={i}
                    data-index={i + 1}
                    className="dev-animate opacity-0 flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 bg-yarn-neon" />
                    <span className="text-body-small text-[rgba(255,255,255,0.6)]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right - Code Block */}
            <div
              data-index={2}
              className="dev-animate opacity-0"
            >
              <div className="bg-yarn-elevated border border-[rgba(255,255,255,0.06)] relative">
                {/* Code Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-caption text-[rgba(255,255,255,0.35)] hover:text-white transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={14} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Code Content */}
                <pre className="p-6 overflow-x-auto">
                  <code className="text-body-small leading-relaxed">
                    {codeExample.split('\n').map((line, i) => (
                      <div key={i} className="flex">
                        <span className="text-[rgba(255,255,255,0.2)] w-8 shrink-0 select-none">
                          {i + 1}
                        </span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightCode(line),
                          }}
                        />
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDK Grid */}
      <section className="bg-yarn-base py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="eyebrow text-yarn-neon block mb-4">
              SDKS
            </span>
            <h2 className="font-display text-display-l text-white">
              Choose your language.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
            {sdks.map((sdk, index) => (
              <div
                key={sdk.name}
                data-index={index}
                className="dev-animate opacity-0 bg-yarn-surface p-8 hover:bg-yarn-elevated transition-colors cursor-pointer group"
              >
                <sdk.icon
                  size={28}
                  style={{ color: sdk.color }}
                  className="mb-4"
                />
                <span className="text-heading-s text-white block mb-1">
                  {sdk.name}
                </span>
                <span className="text-caption text-[rgba(255,255,255,0.35)] block mb-4">
                  {sdk.version}
                </span>
                <code className="text-caption text-[rgba(255,255,255,0.5)] bg-yarn-base px-3 py-2 block">
                  {sdk.install}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Links */}
      <section className="bg-yarn-surface py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <span className="eyebrow text-yarn-neon block mb-4">
              DOCUMENTATION
            </span>
            <h2 className="font-display text-display-l text-white">
              Everything you need.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {docLinks.map((doc, index) => (
              <div
                key={doc.title}
                data-index={index}
                className="dev-animate opacity-0 bg-yarn-base p-8 hover:bg-yarn-elevated transition-colors cursor-pointer group"
              >
                <Book
                  size={18}
                  className="text-yarn-neon mb-4 group-hover:scale-110 transition-transform"
                />
                <span className="text-heading-s text-white block mb-2">
                  {doc.title}
                </span>
                <span className="text-body-small text-[rgba(255,255,255,0.5)]">
                  {doc.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Simple syntax highlighting
function highlightCode(line: string): string {
  let highlighted = line
    .replace(/\b(import|from|const|let|var|new|await|true|false|return)\b/g, '<span style="color:#c792ea">$1</span>')
    .replace(/\b(console|log|process|env)\b/g, '<span style="color:#82aaff">$1</span>')
    .replace(/('.*?')/g, '<span style="color:#c3e88d">$1</span>')
    .replace(/(\/\/.*)/g, '<span style="color:#676e95">$1</span>')
    .replace(/\b(\d+)\b/g, '<span style="color:#f78c6c">$1</span>')

  return highlighted
}
