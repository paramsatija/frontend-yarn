import ScrambleLink from './ScrambleLink'
import { usePageTransitionNavigate } from './PageTransition'

const footerColumns = [
  {
    title: 'PLATFORM',
    links: [
      { label: 'Overview', href: '/platform' },
      { label: 'Architecture', href: null },
      { label: 'Security', href: null },
      { label: 'Roadmap', href: null },
      { label: 'Status', href: null },
    ],
  },
  {
    title: 'ECOSYSTEM',
    links: [
      { label: 'Capital', href: '/ecosystem' },
      { label: 'Legal', href: null },
      { label: 'Enterprise', href: null },
      { label: 'Governance', href: null },
      { label: 'Treasury', href: null },
    ],
  },
  {
    title: 'DEVELOPERS',
    links: [
      { label: 'Documentation', href: '/developers' },
      { label: 'API Reference', href: '/developers' },
      { label: 'SDKs', href: '/developers' },
      { label: 'GitHub', href: null },
      { label: 'Changelog', href: null },
    ],
  },
  {
    title: 'RESOURCES',
    links: [
      { label: 'Research', href: null },
      { label: 'Blog', href: null },
      { label: 'Press', href: null },
      { label: 'Contact', href: null },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Terms', href: null },
      { label: 'Privacy', href: null },
      { label: 'Cookie Policy', href: null },
    ],
  },
]

export default function Footer() {
  const transitionNavigate = usePageTransitionNavigate()

  return (
    <footer className="bg-yarn-base border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* CTA Row */}
        <div className="py-20 lg:py-32 text-center">
          <h2 className="font-display text-display-l text-white mb-8">
            Ready to integrate verified intelligence?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => transitionNavigate('/launch')}
              className="btn-primary"
            >
              Launch App
            </button>
            <button className="btn-outline">Contact Sales</button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="border-t border-[rgba(255,255,255,0.06)] pt-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-caption text-[rgba(255,255,255,0.35)] uppercase tracking-[0.12em] mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link) =>
                    link.href ? (
                      <li key={link.label}>
                        <ScrambleLink
                          to={link.href}
                          className="text-body-small text-[rgba(255,255,255,0.6)] hover:text-white transition-colors"
                        >
                          {link.label}
                        </ScrambleLink>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <span className="text-body-small text-[rgba(255,255,255,0.35)]">
                          {link.label}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-8 mt-16 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-caption text-[rgba(255,255,255,0.35)]">
            &copy; 2025 YARN Protocol. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <span
              onClick={() => transitionNavigate('/launch')}
              className="text-caption text-[rgba(255,255,255,0.35)] hover:text-white transition-colors cursor-pointer"
            >
              Launch App
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
