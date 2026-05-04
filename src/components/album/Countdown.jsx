import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

const WORLD_CUP_START = new Date('2026-06-11T21:00:00-06:00')

function getTimeLeft() {
  const diff = WORLD_CUP_START - new Date()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

export default function WorldCupCountdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!timeLeft) {
    return (
      <div className="bg-gradient-to-br from-fifa-gold/20 to-fifa-card border border-fifa-gold/50 rounded-2xl p-4 text-center">
        <div className="text-2xl mb-1">🏆</div>
        <div className="text-fifa-gold font-display text-lg">¡El Mundial ha comenzado!</div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-fifa-card2 to-fifa-card border border-fifa-border rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="text-fifa-gold w-4 h-4 flex-shrink-0" />
        <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Faltan para el Mundial</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {[
          { value: timeLeft.days, label: 'días' },
          { value: timeLeft.hours, label: 'hrs' },
          { value: timeLeft.minutes, label: 'min' },
          { value: timeLeft.seconds, label: 'seg' },
        ].map(({ value, label }) => (
          <div key={label} className="bg-fifa-darker rounded-xl p-2 text-center border border-fifa-border/60">
            <div className="font-display text-2xl text-gradient-gold leading-none tabular-nums">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-[9px] text-gray-500 mt-1">{label}</div>
          </div>
        ))}
      </div>
      <div className="text-center text-[10px] text-gray-600 mt-2">11 Jun 2026 · Estadio Azteca · México</div>
    </div>
  )
}
