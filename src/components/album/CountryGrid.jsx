import { useMemo } from 'react'
import { COUNTRIES, GROUP_COLORS } from '../../data/countries'

export default function CountryGrid({ stickerStatus, filter, search, selectedConfederation, onSelectCountry }) {
  const countriesWithStats = useMemo(() => {
    return COUNTRIES.map((country) => {
      let got = 0, extras = 0
      country.stickers.forEach((s) => {
        const count = stickerStatus[s.number] || 0
        if (count >= 1) got++
        if (count >= 2) extras += count - 1
      })
      const total = country.stickers.length
      const pct = Math.round((got / total) * 100)
      return { ...country, got, extras, missing: total - got, total, pct }
    })
  }, [stickerStatus])

  const filtered = useMemo(() => {
    return countriesWithStats.filter((c) => {
      if (selectedConfederation && c.confederation !== selectedConfederation) return false
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
      if (filter === 'complete' && c.pct !== 100) return false
      if (filter === 'started' && c.got === 0) return false
      if (filter === 'notstarted' && c.got > 0) return false
      return true
    })
  }, [countriesWithStats, filter, search, selectedConfederation])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {filtered.map((country) => (
        <CountryCard
          key={country.id}
          country={country}
          onClick={() => onSelectCountry(country.id)}
        />
      ))}
      {filtered.length === 0 && (
        <div className="col-span-full text-center py-20 text-gray-600">
          <p className="text-lg">No hay países que coincidan</p>
        </div>
      )}
    </div>
  )
}

function CountryCard({ country, onClick }) {
  const { pct, got, total, extras, group } = country
  const groupColor = GROUP_COLORS[group] || 'bg-gray-600'

  return (
    <button
      onClick={onClick}
      className="card p-3 flex flex-col items-center gap-2 hover:border-fifa-gold/50 hover:bg-fifa-card2 transition-all duration-200 hover:scale-105 active:scale-95 text-left w-full animate-fade-in"
    >
      <span className="text-3xl leading-none">{country.flag}</span>
      <span className="text-xs font-semibold text-white text-center leading-tight line-clamp-2 w-full text-center">
        {country.name}
      </span>
      <span className={`group-badge text-white text-[10px] ${groupColor}`}>
        G-{group}
      </span>

      <div className="w-full">
        <div className="flex justify-between text-[10px] text-gray-600 mb-1">
          <span>{got}/{total}</span>
          {extras > 0 && <span className="text-yellow-500">+{extras}🔁</span>}
          <span className={pct === 100 ? 'text-fifa-gold font-bold' : 'text-gray-500'}>{pct}%</span>
        </div>
        <div className="progress-bar h-1.5">
          <div
            className={`progress-fill ${pct === 100 ? 'animate-pulse-gold' : ''}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {pct === 100 && (
        <div className="text-[10px] text-fifa-gold font-bold flex items-center gap-1">
          <span>🏆</span> Completo
        </div>
      )}
    </button>
  )
}
