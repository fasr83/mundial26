import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import AlbumModule from './components/album/AlbumModule'
import CalendarModule from './components/calendar/CalendarModule'
import StandingsModule from './components/standings/StandingsModule'
import CommunityModule from './components/community/CommunityModule'
import DevLogin from './components/dev/DevLogin'
import DevDashboard from './components/dev/DevDashboard'
import { useAppTracking } from './hooks/useAppTracking'

const DEV_AUTH_KEY = 'mundial26-dev-auth'
const DEV_AUTH_TTL = 1000 * 60 * 60 * 8 // 8 horas

function isDevAuthed() {
  const ts = localStorage.getItem(DEV_AUTH_KEY)
  if (!ts) return false
  return Date.now() - Number(ts) < DEV_AUTH_TTL
}

export default function App() {
  const [activeModule, setActiveModule] = useState('album')
  const [devMode, setDevMode] = useState(false)      // 'login' | 'dashboard' | false
  const [logoClicks, setLogoClicks] = useState(0)

  useAppTracking(activeModule)

  // 7 clicks on logo opens dev panel
  const handleLogoClick = useCallback(() => {
    setLogoClicks(n => {
      const next = n + 1
      if (next >= 7) {
        setDevMode(isDevAuthed() ? 'dashboard' : 'login')
        return 0
      }
      return next
    })
  }, [])

  function handleDevLogout() {
    localStorage.removeItem(DEV_AUTH_KEY)
    setDevMode(false)
  }

  if (devMode === 'login') {
    return <DevLogin onSuccess={() => setDevMode('dashboard')} />
  }
  if (devMode === 'dashboard') {
    return <DevDashboard onLogout={handleDevLogout} />
  }

  return (
    <div className="min-h-screen bg-fifa-dark font-body">
      <Navbar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        onLogoClick={handleLogoClick}
      />
      <main className="safe-main">
        {activeModule === 'album'     && <AlbumModule />}
        {activeModule === 'calendar'  && <CalendarModule />}
        {activeModule === 'standings' && <StandingsModule />}
        {activeModule === 'community' && <CommunityModule />}
      </main>
    </div>
  )
}
