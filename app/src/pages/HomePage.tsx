import Hero from '../sections/Hero'
import PlatformOverview from '../sections/PlatformOverview'
import NetworkViz from '../sections/NetworkViz'
import BentoGrid from '../sections/BentoGrid'
import LiveMetrics from '../sections/LiveMetrics'
import EvidenceSection from '../sections/EvidenceSection'
import YRNUtility from '../sections/YRNUtility'
import Testimonials from '../sections/Testimonials'
import TrustLogos from '../sections/TrustLogos'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustLogos />
      <PlatformOverview />
      <NetworkViz />
      <BentoGrid />
      <LiveMetrics />
      <EvidenceSection />
      <YRNUtility />
      <Testimonials />
    </>
  )
}
