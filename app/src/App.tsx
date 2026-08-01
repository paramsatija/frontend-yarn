import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navigation from './components/Navigation'
import PageTransition from './components/PageTransition'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import PlatformPage from './pages/PlatformPage'
import EcosystemPage from './pages/EcosystemPage'
import DevelopersPage from './pages/DevelopersPage'
import PricingPage from './pages/PricingPage'
import LaunchPage from './pages/LaunchPage'
import DashboardLayout from './dashboard/DashboardLayout'
import Overview from './dashboard/Overview'
import Screener from './dashboard/Screener'
import Engines from './dashboard/Engines'
import RiskPage from './dashboard/RiskPage'
import EvidenceLog from './dashboard/EvidenceLog'
import SettingsPage from './dashboard/SettingsPage'
import Workflows from './dashboard/Workflows'

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  const location = useLocation()
  const isAppRoute = location.pathname.startsWith('/app')

  return (
    <div className="min-h-screen bg-yarn-base text-white font-mono">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Marketing nav only on non-app pages */}
      {!isAppRoute && <Navigation />}

      <main>
        <PageTransition>
          <Routes>
            {/* Marketing pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/platform" element={<PlatformPage />} />
            <Route path="/ecosystem" element={<EcosystemPage />} />
            <Route path="/developers" element={<DevelopersPage />} />
            <Route path="/pricing" element={<PricingPage />} />

            {/* App launcher */}
            <Route path="/launch" element={<LaunchPage />} />

            {/* Finance Dashboard - no marketing nav/footer */}
            <Route path="/app" element={<DashboardLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Overview />} />
              <Route path="screener" element={<Screener />} />
              <Route path="engines" element={<Engines />} />
              <Route path="risk" element={<RiskPage />} />
              <Route path="evidence" element={<EvidenceLog />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="workflows" element={<Workflows />} />
            </Route>
          </Routes>
        </PageTransition>
      </main>

      {/* Marketing footer only on non-app pages */}
      {!isAppRoute && <Footer />}
    </div>
  )
}

export default App
