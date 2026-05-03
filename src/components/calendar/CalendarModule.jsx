import { useState, useMemo, useCallback } from 'react'
import { Search, Star, Filter, Calendar, List, Globe, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { MATCHES, PHASES, GROUPS, LATAM_ZONES, formatLocalTime, formatLocalDateFull, toLocalDate } from '../../data/partidos'
import MatchCard from './MatchCard'
import MatchModal from './MatchModal'

const DEFAULT_ZONE = LATAM_ZONES[0] // México

function getLocalDateStr(match, offset) {
  const d = new Date(match.dateUTC)
  const localMs = d.getTime() + offset * 3600000
  return new Date(localMs).toISOString().slice(0, 10)
}

function getTodayStr(offset) {
  const now = new Date()
  const localMs = now.getTime() + offset * 3600000
  return new Date(localMs).toISOString().slice(0, 10)
}

export default function CalendarModule() {
  const [favorites, setFavorites] = useLocalStorage('mundial26-favorites', [])
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [view, setView] = useState('list') // list | calendar
  const [search, setSearch] = useState('')
  const [phaseFilter, setPhaseFilter] = useState('all')
  const [groupFilter, setGroupFilter] = useState('all')
  const [showFavsOnly, setShowFavsOnly] = useState(false)
  const [selectedZone, setSelectedZone] = useState(DEFAULT_ZONE)
  const [currentMonth, setCurrentMonth] = useState(5) // June = 5 (0-indexed)
  const [currentYear] = useState(2026)

  const todayStr = getTodayStr(selectedZone.offset)

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [setFavorites])

  const filteredMatches = useMemo(() => {
    return MATCHES.filter((m) => {
      if (showFavsOnly && !favorites.includes(m.id)) return false
      if (phaseFilter !== 'all' && m.phase !== phaseFilter) return false
      if (groupFilter !== 'all' && m.group !== groupFilter) return false
      if (search) {
        const q = search.toLowerCase()
        if (!m.home.toLowerCase().includes(q) &&
            !m.away.toLowerCase().includes(q) &&
            !m.venue.city.toLowerCase().includes(q) &&
            !m.venue.name.toLowerCase().includes(q)) return false
      }
      return true
    }).sort((a, b) => new Date(a.dateUTC) - new Date(b.dateUTC))
  }, [favorites, showFavsOnly, phaseFilter, groupFilter, search])

  // Group by date for list view
  const matchesByDate = useMemo(() => {
    const groups = {}
    filteredMatches.forEach((m) => {
      const dateStr = getLocalDateStr(m, selectedZone.offset)
      if (!groups[dateStr]) groups[dateStr] = []
      groups[dateStr].push(m)
    })
    return groups
  }, [filteredMatches, selectedZone])

  // Calendar view data
  const calendarDays = useMemo(() => {
    const year = currentYear
    const month = currentMonth
    const firstDay = new Date(Date.UTC(year, month, 1)).getUTCDay()
    const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
    const days = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      const dayMatches = MATCHES.filter((m) => getLocalDateStr(m, selectedZone.offset) === dateStr)
      days.push({ date: d, dateStr, matches: dayMatches })
    }
    return days
  }, [currentMonth, currentYear, selectedZone])

  const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-4xl text-gradient-gold tracking-wider">
          CALENDARIO OFICIAL
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          FIFA World Cup 2026™ · 11 Jun – 19 Jul · 104 partidos · 16 sedes
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        {/* Zone selector */}
        <div className="flex items-center gap-2 bg-fifa-card border border-fifa-border rounded-xl px-3 py-2">
          <Globe className="w-4 h-4 text-fifa-gold" />
          <select
            value={selectedZone.id}
            onChange={(e) => setSelectedZone(LATAM_ZONES.find((z) => z.id === e.target.value))}
            className="bg-transparent text-sm text-white focus:outline-none"
          >
            {LATAM_ZONES.map((z) => (
              <option key={z.id} value={z.id} className="bg-fifa-card">
                {z.country}
              </option>
            ))}
          </select>
        </div>

        {/* View toggle */}
        <div className="flex gap-1 bg-fifa-card border border-fifa-border rounded-xl p-1">
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${view === 'list' ? 'tab-active' : 'tab-inactive'}`}
          >
            <List className="w-3.5 h-3.5" /> Lista
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${view === 'calendar' ? 'tab-active' : 'tab-inactive'}`}
          >
            <Calendar className="w-3.5 h-3.5" /> Calendario
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar equipo, sede..."
            className="bg-fifa-card border border-fifa-border rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-fifa-gold w-48"
          />
        </div>

        {/* Phase filter */}
        <select
          value={phaseFilter}
          onChange={(e) => setPhaseFilter(e.target.value)}
          className="bg-fifa-card border border-fifa-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-fifa-gold"
        >
          <option value="all">Todas las fases</option>
          {PHASES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>

        {/* Group filter */}
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="bg-fifa-card border border-fifa-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-fifa-gold"
        >
          <option value="all">Todos los grupos</option>
          {GROUPS.map((g) => <option key={g} value={g}>Grupo {g}</option>)}
        </select>

        {/* Favorites toggle */}
        <button
          onClick={() => setShowFavsOnly(!showFavsOnly)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold transition-all ${
            showFavsOnly ? 'bg-yellow-500/20 border-yellow-500/50 text-fifa-gold' : 'border-fifa-border text-gray-400 hover:text-white'
          }`}
        >
          <Star className={`w-4 h-4 ${showFavsOnly ? 'fill-fifa-gold text-fifa-gold' : ''}`} />
          Favoritos {favorites.length > 0 && `(${favorites.length})`}
        </button>
      </div>

      {/* Today's timezone banner */}
      <div className="bg-fifa-navy/20 border border-fifa-navy/40 rounded-xl px-4 py-2.5 mb-5 flex items-center justify-between flex-wrap gap-2">
        <div className="text-xs text-gray-400">
          Horarios en zona: <span className="text-white font-semibold">{selectedZone.country} (UTC{selectedZone.offset >= 0 ? '+' : ''}{selectedZone.offset})</span>
        </div>
        <div className="text-xs text-gray-500">
          Hoy: <span className="text-gray-300">{todayStr}</span>
        </div>
      </div>

      {/* ── LIST VIEW ────────────────────────────────────── */}
      {view === 'list' && (
        <div className="space-y-6">
          {Object.keys(matchesByDate).length === 0 ? (
            <div className="text-center py-20 text-gray-600">
              <p className="text-lg">No se encontraron partidos</p>
            </div>
          ) : (
            Object.entries(matchesByDate)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([dateStr, dayMatches]) => {
                const isToday = dateStr === todayStr
                return (
                  <div key={dateStr}>
                    <div className={`flex items-center gap-3 mb-3 ${isToday ? 'text-fifa-gold' : ''}`}>
                      <h3 className={`font-display text-xl tracking-wide ${isToday ? 'text-gradient-gold' : 'text-gray-300'}`}>
                        {formatLocalDateFull(dayMatches[0].dateUTC, selectedZone.offset)}
                      </h3>
                      {isToday && (
                        <span className="text-xs font-bold text-fifa-gold bg-yellow-900/30 border border-yellow-500/40 px-2 py-0.5 rounded-full">
                          HOY
                        </span>
                      )}
                      <div className="flex-1 h-px bg-fifa-border" />
                      <span className="text-xs text-gray-600">{dayMatches.length} partido{dayMatches.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {dayMatches.map((m) => (
                        <MatchCard
                          key={m.id}
                          match={m}
                          offset={selectedZone.offset}
                          isToday={isToday}
                          isFavorite={favorites.includes(m.id)}
                          onFavorite={toggleFavorite}
                          onClick={() => setSelectedMatch(m)}
                        />
                      ))}
                    </div>
                  </div>
                )
              })
          )}
        </div>
      )}

      {/* ── CALENDAR VIEW ────────────────────────────────── */}
      {view === 'calendar' && (
        <div>
          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentMonth((m) => Math.max(5, m - 1))}
              disabled={currentMonth <= 5}
              className="p-2 rounded-lg border border-fifa-border text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="font-display text-2xl text-gradient-gold tracking-wider">
              {MONTHS[currentMonth]} {currentYear}
            </h3>
            <button
              onClick={() => setCurrentMonth((m) => Math.min(6, m + 1))}
              disabled={currentMonth >= 6}
              className="p-2 rounded-lg border border-fifa-border text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-gray-600 py-2">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />
              const isToday = day.dateStr === todayStr
              const hasMatches = day.matches.length > 0
              return (
                <div
                  key={day.dateStr}
                  className={`
                    min-h-[80px] rounded-lg border p-1.5 transition-all
                    ${isToday ? 'border-fifa-gold bg-yellow-900/10' : 'border-fifa-border'}
                    ${hasMatches ? 'cursor-pointer hover:border-fifa-gold/50 hover:bg-fifa-card2' : 'opacity-40'}
                  `}
                >
                  <div className={`text-xs font-bold mb-1 ${isToday ? 'text-fifa-gold' : 'text-gray-500'}`}>
                    {day.date}
                    {isToday && <span className="ml-1 text-[9px]">HOY</span>}
                  </div>
                  <div className="space-y-0.5">
                    {day.matches.slice(0, 3).map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMatch(m)}
                        className="w-full text-left text-[9px] leading-tight bg-fifa-navy/40 hover:bg-fifa-navy/70 rounded px-1 py-0.5 text-blue-300 truncate transition-colors"
                      >
                        {m.home === 'Por definir' ? `P${m.id}` : `${m.home.split(' ')[0]} vs ${m.away.split(' ')[0]}`}
                      </button>
                    ))}
                    {day.matches.length > 3 && (
                      <div className="text-[9px] text-gray-600 text-center">+{day.matches.length - 3} más</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Match modal */}
      {selectedMatch && (
        <MatchModal
          match={selectedMatch}
          isFavorite={favorites.includes(selectedMatch.id)}
          onFavorite={toggleFavorite}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  )
}
