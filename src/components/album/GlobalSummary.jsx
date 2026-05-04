import { useMemo, useState } from 'react'
import { Copy, Download, Check, RefreshCw, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
import { TOTAL_STICKERS, ALL_STICKERS, COUNTRIES } from '../../data/countries'

const COUNTRY_MAP = {}
COUNTRIES.forEach((c) => { COUNTRY_MAP[c.id.toUpperCase()] = { name: c.name, flag: c.flag } })
COUNTRY_MAP['FWC'] = { name: 'Historia FIFA', flag: '🌍' }
COUNTRY_MAP['CC']  = { name: 'Coca-Cola', flag: '🥤' }
COUNTRY_MAP['00']  = { name: 'Portada', flag: '📖' }

function codePrefix(code) {
  return code.includes(' ') ? code.split(' ')[0] : code
}

export default function GlobalSummary({ stickerStatus }) {
  const [copied, setCopied] = useState(false)
  const [showTrading, setShowTrading] = useState(false)

  const stats = useMemo(() => {
    let got = 0, totalExtras = 0
    ALL_STICKERS.forEach((s) => {
      const count = stickerStatus[s.number] || 0
      if (count >= 1) got++
      if (count >= 2) totalExtras += count - 1
    })
    const missing = TOTAL_STICKERS - got
    const pct = Math.round((got / TOTAL_STICKERS) * 100)
    return { got, repeated: totalExtras, missing, pct }
  }, [stickerStatus])

  const missingList = useMemo(() => {
    return ALL_STICKERS
      .filter((s) => !(stickerStatus[s.number] >= 1))
      .map((s) => s.number)
      .sort((a, b) => a - b)
  }, [stickerStatus])

  // Group repeated stickers by country for trading
  const tradingGroups = useMemo(() => {
    const groups = {}
    ALL_STICKERS.forEach((s) => {
      const count = stickerStatus[s.number] || 0
      if (count < 2) return
      const prefix = codePrefix(s.code)
      if (!groups[prefix]) groups[prefix] = []
      groups[prefix].push({ code: s.code, extras: count - 1 })
    })
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]))
  }, [stickerStatus])

  const handleCopy = () => {
    const text = `Stickers faltantes (${missingList.length}):\n${missingList.join(', ')}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleDownload = () => {
    const text = `MUNDIAL26 — Mi Álbum Panini\nStickers faltantes (${missingList.length} de ${TOTAL_STICKERS}):\n\n${missingList.join('\n')}`
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'stickers-faltantes.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleCopyTrading = () => {
    const lines = tradingGroups.map(([prefix, stickers]) => {
      const info = COUNTRY_MAP[prefix]
      const label = info ? `${info.flag} ${info.name}` : prefix
      const list = stickers.map((s) => `${s.code}(×${s.extras + 1})`).join(', ')
      return `${label}: ${list}`
    })
    const text = `Mis stickers repetidos para intercambiar:\n\n${lines.join('\n')}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="bg-gradient-to-br from-fifa-card2 to-fifa-card border border-fifa-border rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="text-fifa-gold w-5 h-5" />
        <h3 className="font-display text-xl text-gradient-gold tracking-wider">Mi Álbum</h3>
      </div>

      {/* Big progress */}
      <div className="text-center mb-4">
        <div className={`font-display text-6xl leading-none mb-1 ${stats.pct === 100 ? 'animate-glow text-fifa-gold' : 'text-gradient-gold'}`}>
          {stats.pct}%
        </div>
        <div className="text-xs text-gray-500">completado</div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar mb-4 h-3">
        <div
          className={`progress-fill ${stats.pct === 100 ? 'animate-pulse-gold' : ''}`}
          style={{ width: `${stats.pct}%` }}
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <StatBox value={stats.got} label="Tengo" color="text-green-400" bg="bg-green-900/20" icon={<Check className="w-3 h-3" />} />
        <StatBox value={stats.missing} label="Faltan" color="text-red-400" bg="bg-red-900/20" icon={null} />
        <StatBox value={stats.repeated} label="Extras" color="text-yellow-400" bg="bg-yellow-900/20" icon={<RefreshCw className="w-3 h-3" />} />
      </div>

      <div className="text-center text-xs text-gray-600 mb-4">
        {TOTAL_STICKERS} stickers totales en el álbum
      </div>

      {/* Trading list */}
      {tradingGroups.length > 0 && (
        <div className="mb-4 border border-yellow-500/20 rounded-xl overflow-hidden">
          <button
            onClick={() => setShowTrading(!showTrading)}
            className="w-full flex items-center justify-between px-3 py-2.5 bg-yellow-900/20 text-xs font-semibold text-yellow-300 hover:bg-yellow-900/30 transition-colors"
          >
            <span className="flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5" />
              Para intercambiar — {stats.repeated} extras
            </span>
            {showTrading ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showTrading && (
            <div className="p-3 space-y-2 max-h-64 overflow-y-auto">
              {tradingGroups.map(([prefix, stickers]) => {
                const info = COUNTRY_MAP[prefix]
                return (
                  <div key={prefix}>
                    <div className="text-[10px] text-gray-500 font-semibold mb-1 flex items-center gap-1">
                      {info && <span>{info.flag}</span>}
                      <span>{info ? info.name : prefix}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {stickers.map((s) => (
                        <span
                          key={s.code}
                          className="bg-yellow-900/30 border border-yellow-500/30 text-yellow-200 text-[9px] font-bold px-1.5 py-0.5 rounded"
                        >
                          {s.code} {s.extras > 1 ? `×${s.extras + 1}` : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
              <button
                onClick={handleCopyTrading}
                className="w-full flex items-center justify-center gap-1.5 text-[10px] text-yellow-400 hover:text-yellow-200 transition-colors pt-1 border-t border-yellow-500/20"
              >
                <Copy className="w-3 h-3" />
                Copiar lista de intercambios
              </button>
            </div>
          )}
        </div>
      )}

      {/* Export missing */}
      {missingList.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 text-center">Lista de {missingList.length} stickers faltantes:</p>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 btn-outline text-xs py-2"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado!' : 'Copiar lista'}
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 btn-gold text-xs py-2"
            >
              <Download className="w-3.5 h-3.5" />
              Descargar TXT
            </button>
          </div>
        </div>
      )}

      {stats.pct === 100 && (
        <div className="text-center mt-3 animate-bounce-in">
          <span className="text-2xl">🏆</span>
          <p className="text-xs text-fifa-gold font-bold mt-1">¡Álbum Completo!</p>
        </div>
      )}
    </div>
  )
}

function StatBox({ value, label, color, bg, icon }) {
  return (
    <div className={`${bg} rounded-xl p-3 text-center border border-white/5`}>
      <div className={`font-display text-2xl ${color} flex items-center justify-center gap-1`}>
        {icon}
        {value}
      </div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
    </div>
  )
}
