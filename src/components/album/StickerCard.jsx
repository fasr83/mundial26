import { useRef } from 'react'
import { Check, Star, Shield, Users, User } from 'lucide-react'

const TYPE_ICONS = {
  badge: Shield,
  team: Users,
  player: User,
  intro: Star,
  cover: Star,
  stadium: Shield,
}

const TYPE_LABELS = {
  badge: 'Escudo',
  team: 'Equipo',
  player: 'Jugador',
  intro: 'Intro',
  cover: 'Portada',
  stadium: 'Estadio',
}

export default function StickerCard({ sticker, status = 0, onToggle }) {
  // status: number — 0=falta, 1=tengo, 2+=tengo+N extras repetidos
  const clickTimer = useRef(null)
  const Icon = TYPE_ICONS[sticker.type] || User

  const isGot = status >= 1
  const isRepeated = status >= 2
  const isMissing = status === 0
  const extras = status >= 2 ? status - 1 : 0

  const handleClick = () => {
    clearTimeout(clickTimer.current)
    clickTimer.current = setTimeout(() => {
      if (status === 0) onToggle(sticker.number, 1)
      else if (status === 1) onToggle(sticker.number, 0)
      else onToggle(sticker.number, status - 1) // reduce extras (min 1)
    }, 220)
  }

  const handleDoubleClick = () => {
    clearTimeout(clickTimer.current)
    onToggle(sticker.number, Math.max(2, status + 1)) // add extra copy
  }

  return (
    <div
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`
        relative select-none cursor-pointer rounded-lg border transition-all duration-200
        flex flex-col items-center justify-between p-2 gap-1
        hover:scale-105 hover:z-10 active:scale-95
        ${sticker.special ? 'border-yellow-500/50' : 'border-fifa-border'}
        ${isGot && !isRepeated ? 'sticker-got' : ''}
        ${isRepeated ? 'sticker-repeated' : ''}
        ${isMissing ? 'sticker-missing bg-fifa-card' : 'bg-fifa-card2'}
      `}
      title={`${sticker.code} — ${sticker.description}\nClic = Conseguido/Quitar | Doble clic = +Repetido`}
    >
      {/* Special star */}
      {sticker.special && (
        <div className="absolute top-0.5 right-0.5">
          <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
        </div>
      )}

      {/* Extras badge — top-left */}
      {extras > 0 && (
        <div className="absolute -top-1.5 -left-1.5 bg-yellow-400 text-black text-[8px] font-black rounded-full w-4 h-4 flex items-center justify-center border border-black/20 z-10 shadow">
          +{extras}
        </div>
      )}

      {/* Sticker code */}
      <span className={`text-[10px] font-bold tabular-nums leading-none text-center ${sticker.special ? 'text-yellow-300' : 'text-white'}`}>
        {sticker.code}
      </span>

      {/* Icon */}
      <div className={`
        rounded-full p-1.5 transition-colors
        ${isGot && !isRepeated ? 'bg-green-500/20' : isRepeated ? 'bg-yellow-500/20' : 'bg-fifa-border/40'}
      `}>
        <Icon className={`
          w-3.5 h-3.5
          ${isGot && !isRepeated ? 'text-green-400' : isRepeated ? 'text-yellow-400' : 'text-gray-500'}
        `} />
      </div>

      {/* Got overlay — green check */}
      {isGot && !isRepeated && (
        <div className="absolute inset-0 flex items-center justify-center animate-bounce-in pointer-events-none">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/50">
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          </div>
        </div>
      )}

      {/* Type label */}
      <span className="text-[9px] text-gray-600 truncate w-full text-center leading-none">
        {TYPE_LABELS[sticker.type] || sticker.type}
      </span>
    </div>
  )
}
