import { useState } from 'react'
import Navbar from './components/Navbar'
import AlbumModule from './components/album/AlbumModule'
import CalendarModule from './components/calendar/CalendarModule'
import StandingsModule from './components/standings/StandingsModule'
import StoreModule from './components/store/StoreModule'

export default function App() {
  const [activeModule, setActiveModule] = useState('album')

  return (
    <div className="min-h-screen bg-fifa-dark font-body">
      <Navbar activeModule={activeModule} setActiveModule={setActiveModule} />
      <main className="pt-16">
        {activeModule === 'album'     && <AlbumModule />}
        {activeModule === 'calendar'  && <CalendarModule />}
        {activeModule === 'standings' && <StandingsModule />}
        {activeModule === 'store'     && <StoreModule />}
      </main>
    </div>
  )
}
