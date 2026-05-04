import { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { Search, Filter, RotateCcw, Star } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { COUNTRIES, INTRO_STICKERS, HISTORY_STICKERS, COCACOLA_STICKERS, CONFEDERATIONS, TOTAL_STICKERS } from '../../data/countries'
import CountryGrid from './CountryGrid'
import CountryDetail from './CountryDetail'
import GlobalSummary from './GlobalSummary'
import WorldCupCountdown from './Countdown'

function triggerConfetti() {
  const colors = ['#FFD700', '#CC0000', '#003087', '#fff', '#FFA500']
  const container = document.createElement('div')
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden'
  document.body.appendChild(container)

  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div')
    const color = colors[Math.floor(Math.random() * colors.length)]
    const size = Math.random() * 8 + 4
    el.style.cssText = `
      position:absolute;width:${size}px;height:${size}px;background:${color};
      left:${Math.random() * 100}%;top:-10px;border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      animation:fall ${Math.random() * 2 + 1}s linear ${Math.random() * 0.5}s forwards;
    `
    container.appendChild(el)
  }

  const style = document.createElement('style')
  style.textContent = `@keyframes fall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}`
  document.head.appendChild(style)
  setTimeout(() => { container.remove(); style.remove() }, 3500)
}

export default function AlbumModule() {
  const [stickerStatus, setStickerStatus] = useLocalStorage('mundial26-stickers', {})
  const [selectedCountryId, setSelectedCountryId] = useState(null)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedConf, setSelectedConf] = useState('')
  const [showIntro, setShowIntro] = useState(false)

  // Migrate old string-based data ('got'/'repeated'/'missing') to numeric counts
  useEffect(() => {
    setStickerStatus((prev) => {
      const needsMigration = Object.values(prev).some((v) => typeof v === 'string')
      if (!needsMigration) return prev
      const migrated = {}
      for (const [key, val] of Object.entries(prev)) {
        migrated[key] = val === 'got' ? 1 : val === 'repeated' ? 2 : 0
      }
      return migrated
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const selectedCountry = useMemo(
    () => COUNTRIES.find((c) => c.id === selectedCountryId),
    [selectedCountryId]
  )

  const handleToggle = useCallback((stickerNum, newCount) => {
    setStickerStatus((prev) => {
      const updated = { ...prev, [stickerNum]: newCount }

      if (newCount >= 1) {
        const country = COUNTRIES.find((c) => c.stickers.some((s) => s.number === stickerNum))
        if (country) {
          const allGot = country.stickers.every(
            (s) => (s.number === stickerNum ? newCount : (prev[s.number] || 0)) >= 1
          )
          if (allGot) triggerConfetti()
        }
      }
      return updated
    })
  }, [setStickerStatus])

  const handleReset = () => {
    if (window.confirm('¿Resetear todo el álbum? Se perderá el progreso guardado.')) {
      setStickerStatus({})
    }
  }

  if (selectedCountry) {
    return (
      <CountryDetail
        country={selectedCountry}
        stickerStatus={stickerStatus}
        onToggle={handleToggle}
        onBack={() => setSelectedCountryId(null)}
      />
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <WorldCupCountdown />
          <GlobalSummary stickerStatus={stickerStatus} />

          {/* Intro section toggle */}
          <button
            onClick={() => setShowIntro(!showIntro)}
            className="w-full card p-3 flex items-center gap-2 hover:border-fifa-gold/50 transition-colors text-sm"
          >
            <Star className="w-4 h-4 text-fifa-gold" />
            <span className="text-gray-300">Stickers Especiales</span>
            <span className="ml-auto text-xs text-gray-600">00 · FWC 1–19 · CC 1–14</span>
          </button>

          {showIntro && (
            <div className="card p-3 animate-fade-in space-y-3">
              <p className="text-[10px] text-gray-600 uppercase tracking-wider">Introducción</p>
              <div className="grid grid-cols-5 gap-1.5">
                {INTRO_STICKERS.map((s) => (
                  <IntroStickerMini key={s.number} sticker={s} status={stickerStatus[s.number] || 0} onToggle={handleToggle} />
                ))}
              </div>
              <p className="text-[10px] text-gray-600 uppercase tracking-wider">Historia del Mundial</p>
              <div className="grid grid-cols-5 gap-1.5">
                {HISTORY_STICKERS.map((s) => (
                  <IntroStickerMini key={s.number} sticker={s} status={stickerStatus[s.number] || 0} onToggle={handleToggle} />
                ))}
              </div>
              <p className="text-[10px] text-gray-600 uppercase tracking-wider">Coca-Cola Bonus</p>
              <div className="grid grid-cols-5 gap-1.5">
                {COCACOLA_STICKERS.map((s) => (
                  <IntroStickerMini key={s.number} sticker={s} status={stickerStatus[s.number] || 0} onToggle={handleToggle} />
                ))}
              </div>
            </div>
          )}

          {/* Reset */}
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 text-xs text-gray-600 hover:text-red-400 transition-colors py-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Resetear álbum
          </button>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          <div className="mb-6">
            <h1 className="font-display text-4xl text-gradient-gold tracking-wider">
              ÁLBUM PANINI
            </h1>
            <p className="text-gray-500 text-sm mt-1">FIFA World Cup 2026™ · 48 selecciones · {TOTAL_STICKERS} stickers</p>
          </div>

          {/* Filters row */}
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar país..."
                className="bg-fifa-card border border-fifa-border rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-fifa-gold w-44"
              />
            </div>

            <div className="flex gap-1 bg-fifa-card border border-fifa-border rounded-xl p-1">
              {[
                { value: 'all', label: 'Todos' },
                { value: 'started', label: '▸ En progreso' },
                { value: 'complete', label: '✓ Completos' },
                { value: 'notstarted', label: '○ Sin empezar' },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    filter === f.value ? 'bg-fifa-gold text-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedConf}
                onChange={(e) => setSelectedConf(e.target.value)}
                className="bg-fifa-card border border-fifa-border rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-fifa-gold"
              >
                <option value="">Todas las conf.</option>
                {CONFEDERATIONS.filter((c) => c !== 'Playoff').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Groups legend */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {['A','B','C','D','E','F','G','H','I','J','K','L'].map((g) => (
              <span key={g} className="text-[10px] text-gray-500 bg-fifa-card border border-fifa-border rounded px-1.5 py-0.5">
                G-{g}
              </span>
            ))}
          </div>

          <CountryGrid
            stickerStatus={stickerStatus}
            filter={filter}
            search={search}
            selectedConfederation={selectedConf}
            onSelectCountry={setSelectedCountryId}
          />
        </div>
      </div>
    </div>
  )
}

function IntroStickerMini({ sticker, status = 0, onToggle }) {
  const clickTimer = useRef(null)
  const isGot = status >= 1
  const isRepeated = status >= 2

  const handleClick = () => {
    clearTimeout(clickTimer.current)
    clickTimer.current = setTimeout(() => {
      if (status === 0) onToggle(sticker.number, 1)
      else if (status === 1) onToggle(sticker.number, 0)
      else onToggle(sticker.number, status - 1)
    }, 220)
  }

  const handleDoubleClick = () => {
    clearTimeout(clickTimer.current)
    onToggle(sticker.number, Math.max(2, status + 1))
  }

  return (
    <button
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`
        aspect-square rounded text-[10px] font-bold flex flex-col items-center justify-center gap-0.5 transition-all
        border hover:scale-105
        ${isGot && !isRepeated ? 'bg-green-900/30 border-green-500/50 text-green-400' : ''}
        ${isRepeated ? 'bg-yellow-900/30 border-yellow-500/50 text-yellow-400' : ''}
        ${!isGot && !isRepeated ? 'bg-fifa-darker border-fifa-border text-gray-400' : ''}
        ${sticker.special ? 'border-yellow-500/40' : ''}
      `}
      title={sticker.description}
    >
      <span>{sticker.code}</span>
      {isGot && !isRepeated && <span>✓</span>}
      {isRepeated && <span className="text-[8px]">+{status - 1}</span>}
    </button>
  )
}
