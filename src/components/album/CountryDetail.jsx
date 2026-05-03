import { ArrowLeft, Check, RefreshCw, Search } from 'lucide-react'
import { useState, useMemo } from 'react'
import StickerCard from './StickerCard'
import { GROUP_COLORS } from '../../data/countries'

export default function CountryDetail({ country, stickerStatus, onToggle, onBack }) {
  const [filter, setFilter] = useState('all') // all | got | repeated | missing
  const [search, setSearch] = useState('')

  const stats = useMemo(() => {
    let got = 0, repeated = 0, missing = 0
    country.stickers.forEach((s) => {
      const st = stickerStatus[s.number] || 'missing'
      if (st === 'got') got++
      else if (st === 'repeated') repeated++
      else missing++
    })
    return { got, repeated, missing, total: country.stickers.length }
  }, [country.stickers, stickerStatus])

  const pct = Math.round((stats.got / stats.total) * 100)

  const filtered = useMemo(() => {
    return country.stickers.filter((s) => {
      const st = stickerStatus[s.number] || 'missing'
      if (filter !== 'all' && st !== filter) return false
      if (search && !s.description.toLowerCase().includes(search.toLowerCase()) &&
          !String(s.number).includes(search)) return false
      return true
    })
  }, [country.stickers, stickerStatus, filter, search])

  const groupColor = GROUP_COLORS[country.group] || 'bg-gray-600'

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-fifa-card2 border-b border-fifa-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al álbum
          </button>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{country.flag}</span>
              <div>
                <h2 className="font-display text-3xl text-gradient-gold tracking-wide">
                  {country.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`group-badge text-white ${groupColor}`}>
                    Grupo {country.group}
                  </span>
                  <span className="text-xs text-gray-500">{country.confederation}</span>
                  <span className="text-xs text-gray-500">
                    Stickers #{country.stickerStart}–{country.stickerEnd}
                  </span>
                </div>
              </div>
            </div>

            {/* Mini stats */}
            <div className="flex gap-3 flex-wrap">
              <StatChip icon={<Check className="w-3.5 h-3.5" />} count={stats.got} label="Tengo" color="text-green-400" />
              <StatChip icon={<RefreshCw className="w-3.5 h-3.5" />} count={stats.repeated} label="Repetidos" color="text-yellow-400" />
              <StatChip count={stats.missing} label="Faltan" color="text-gray-400" />
            </div>
          </div>

          {/* Progress */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{stats.got} / {stats.total} stickers</span>
              <span className="font-bold text-fifa-gold">{pct}%</span>
            </div>
            <div className="progress-bar">
              <div
                className={`progress-fill transition-all duration-700 ${pct === 100 ? 'animate-pulse-gold' : ''}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & search */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-2 flex-wrap items-center">
          {['all', 'got', 'repeated', 'missing'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === f
                  ? 'bg-fifa-gold text-black'
                  : 'bg-fifa-card border border-fifa-border text-gray-400 hover:text-white'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'got' ? '✓ Tengo' : f === 'repeated' ? '↻ Repetidos' : '○ Faltan'}
            </button>
          ))}

          <div className="relative ml-auto">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar sticker..."
              className="bg-fifa-card border border-fifa-border rounded-full pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-fifa-gold w-44"
            />
          </div>
        </div>
      </div>

      {/* Stickers grid */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <p className="text-lg">No hay stickers que coincidan</p>
          </div>
        ) : (
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-13 gap-2">
            {filtered.map((sticker) => (
              <StickerCard
                key={sticker.number}
                sticker={sticker}
                status={stickerStatus[sticker.number] || 'missing'}
                onToggle={onToggle}
              />
            ))}
          </div>
        )}

        {/* Tip */}
        <p className="text-center text-xs text-gray-700 mt-6">
          Clic = Conseguido · Doble clic = Repetido · Clic en conseguido = Quitar
        </p>
      </div>
    </div>
  )
}

function StatChip({ icon, count, label, color }) {
  return (
    <div className="flex items-center gap-1.5 bg-fifa-card border border-fifa-border rounded-lg px-3 py-1.5">
      {icon && <span className={color}>{icon}</span>}
      <span className={`text-sm font-bold ${color}`}>{count}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  )
}
