import { useMemo, useState } from 'react'
import { Copy, Download, Check, RefreshCw, BookOpen } from 'lucide-react'
import { TOTAL_STICKERS, ALL_STICKERS } from '../../data/countries'

export default function GlobalSummary({ stickerStatus }) {
  const [copied, setCopied] = useState(false)

  const stats = useMemo(() => {
    let got = 0, repeated = 0
    ALL_STICKERS.forEach((s) => {
      const st = stickerStatus[s.number] || 'missing'
      if (st === 'got') got++
      else if (st === 'repeated') repeated++
    })
    const missing = TOTAL_STICKERS - got - repeated
    const pct = Math.round((got / TOTAL_STICKERS) * 100)
    return { got, repeated, missing, pct }
  }, [stickerStatus])

  const missingList = useMemo(() => {
    return ALL_STICKERS
      .filter((s) => !stickerStatus[s.number] || stickerStatus[s.number] === 'missing')
      .map((s) => s.number)
      .sort((a, b) => a - b)
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
        <StatBox value={stats.repeated} label="Repetidos" color="text-yellow-400" bg="bg-yellow-900/20" icon={<RefreshCw className="w-3 h-3" />} />
      </div>

      <div className="text-center text-xs text-gray-600 mb-4">
        {TOTAL_STICKERS} stickers totales en el álbum
      </div>

      {/* Export buttons */}
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
