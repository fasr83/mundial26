import { Check, RefreshCw, Star, Shield, Users, User } from 'lucide-react'

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

export default function StickerCard({ sticker, status, onToggle }) {
  // status: 'missing' | 'got' | 'repeated'
  const Icon = TYPE_ICONS[sticker.type] || User
  const isGot = status === 'got'
  const isRepeated = status === 'repeated'
  const isMissing = status === 'missing'

  const handleClick = (e) => {
    if (e.detail === 2) {
      // double click → repeated
      onToggle(sticker.number, 'repeated')
    } else {
      // single click → toggle got/missing
      onToggle(sticker.number, status === 'got' ? 'missing' : 'got')
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`
        relative select-none cursor-pointer rounded-lg border transition-all duration-200
        flex flex-col items-center justify-between p-2 gap-1
        hover:scale-105 hover:z-10 active:scale-95
        ${sticker.special ? 'border-yellow-500/50' : 'border-fifa-border'}
        ${isGot ? 'sticker-got' : ''}
        ${isRepeated ? 'sticker-repeated' : ''}
        ${isMissing && !sticker.special ? 'sticker-missing bg-fifa-card' : ''}
        ${isMissing && sticker.special ? 'sticker-missing bg-fifa-card' : ''}
        ${!isMissing ? 'bg-fifa-card2' : 'bg-fifa-card'}
      `}
      title={`${sticker.code} — ${sticker.description}${'\n'}Clic = Conseguido | Doble clic = Repetido`}
    >
      {/* Special foil indicator */}
      {sticker.special && (
        <div className="absolute top-0.5 right-0.5">
          <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
        </div>
      )}

      {/* Number */}
      <span className={`text-[10px] font-bold tabular-nums leading-none text-center ${sticker.special ? 'text-yellow-400' : 'text-gray-500'}`}>
        {sticker.code}
      </span>

      {/* Icon */}
      <div className={`
        rounded-full p-1.5 transition-colors
        ${isGot ? 'bg-green-500/20' : isRepeated ? 'bg-yellow-500/20' : 'bg-fifa-border/40'}
      `}>
        <Icon className={`
          w-3.5 h-3.5
          ${isGot ? 'text-green-400' : isRepeated ? 'text-yellow-400' : 'text-gray-500'}
        `} />
      </div>

      {/* Status overlay icon */}
      {isGot && (
        <div className="absolute inset-0 flex items-center justify-center animate-bounce-in pointer-events-none">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/50">
            <Check className="w-3 h-3 text-white" strokeWidth={3} />
          </div>
        </div>
      )}
      {isRepeated && (
        <div className="absolute top-1 left-1 pointer-events-none">
          <div className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center">
            <RefreshCw className="w-2.5 h-2.5 text-black" strokeWidth={3} />
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
