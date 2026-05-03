import { Star, MapPin, Clock, Tv } from 'lucide-react'
import { formatLocalTime, formatLocalDateFull } from '../../data/partidos'

const PHASE_COLORS = {
  'Grupos': 'text-blue-400 border-blue-500/30 bg-blue-900/10',
  'Ronda de 32': 'text-purple-400 border-purple-500/30 bg-purple-900/10',
  'Octavos de Final': 'text-orange-400 border-orange-500/30 bg-orange-900/10',
  'Cuartos de Final': 'text-red-400 border-red-500/30 bg-red-900/10',
  'Semifinal': 'text-pink-400 border-pink-500/30 bg-pink-900/10',
  'Tercer Puesto': 'text-yellow-400 border-yellow-500/30 bg-yellow-900/10',
  'Final': 'text-fifa-gold border-yellow-500/50 bg-yellow-900/20',
}

export default function MatchCard({ match, offset, isToday, isFavorite, onFavorite, onClick }) {
  const localTime = formatLocalTime(match.dateUTC, offset)
  const localDate = formatLocalDateFull(match.dateUTC, offset)
  const isTBD = match.home === 'Por definir'
  const isFinal = match.phase === 'Final'
  const phaseStyle = PHASE_COLORS[match.phase] || 'text-gray-400 border-gray-500/30 bg-gray-900/10'

  return (
    <div
      onClick={onClick}
      className={`
        card p-4 cursor-pointer hover:border-fifa-gold/40 transition-all duration-200
        hover:bg-fifa-card2 active:scale-98 group animate-fade-in
        ${isToday ? 'match-today' : ''}
        ${isFinal ? 'bg-gradient-to-br from-yellow-900/10 to-fifa-card border-yellow-600/40' : ''}
      `}
    >
      {/* Top row: phase + date + favorite */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${phaseStyle}`}>
            {match.phase}
            {match.group && ` · Grupo ${match.group}`}
          </span>
          {isToday && (
            <span className="text-[10px] font-bold text-fifa-gold bg-yellow-900/30 border border-yellow-500/40 px-2 py-0.5 rounded-full animate-pulse">
              🔴 HOY
            </span>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onFavorite(match.id) }}
          className={`transition-all hover:scale-110 ${isFavorite ? 'text-fifa-gold' : 'text-gray-700 hover:text-gray-500'}`}
        >
          <Star className={`w-4 h-4 ${isFavorite ? 'fill-fifa-gold' : ''}`} />
        </button>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-between mb-3">
        <Team name={match.home} isTBD={isTBD} />
        <div className="text-center px-3">
          <span className="font-display text-lg text-gray-500 tracking-widest">VS</span>
          <div className="text-[10px] text-gray-600 mt-0.5">Partido #{match.id}</div>
        </div>
        <Team name={match.away} isTBD={isTBD} align="right" />
      </div>

      {/* Footer: time + venue */}
      <div className="flex items-center justify-between text-xs text-gray-500 border-t border-fifa-border/50 pt-2.5 mt-2.5">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-fifa-gold" />
          <span className="text-white font-semibold">{localTime}</span>
          <span className="text-gray-600">· {localDate}</span>
        </div>
        <div className="flex items-center gap-1 max-w-[140px] text-right">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{match.venue.city}</span>
        </div>
      </div>
    </div>
  )
}

function Team({ name, isTBD, align = 'left' }) {
  const parts = name.split(' ')
  const flag = !isTBD && getFlag(name)

  return (
    <div className={`flex-1 ${align === 'right' ? 'text-right' : 'text-left'}`}>
      {flag && (
        <div className={`text-2xl mb-1 ${align === 'right' ? 'text-right' : 'text-left'}`}>
          {flag}
        </div>
      )}
      <div className={`font-semibold text-sm leading-tight ${isTBD ? 'text-gray-600 italic' : 'text-white'}`}>
        {name}
      </div>
    </div>
  )
}

// Map team name to flag emoji
const FLAG_MAP = {
  'Argentina': '🇦🇷', 'Marruecos': '🇲🇦', 'Croacia': '🇭🇷', 'Qatar': '🇶🇦',
  'Brasil': '🇧🇷', 'Suiza': '🇨🇭', 'Serbia': '🇷🇸', 'Nueva Zelanda': '🇳🇿',
  'Francia': '🇫🇷', 'México': '🇲🇽', 'Ecuador': '🇪🇨', 'Túnez': '🇹🇳',
  'España': '🇪🇸', 'Japón': '🇯🇵', 'Colombia': '🇨🇴', 'Costa Rica': '🇨🇷',
  'Alemania': '🇩🇪', 'Estados Unidos': '🇺🇸', 'Arabia Saudita': '🇸🇦', 'Costa de Marfil': '🇨🇮',
  'Inglaterra': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Países Bajos': '🇳🇱', 'Corea del Sur': '🇰🇷', 'Argelia': '🇩🇿',
  'Portugal': '🇵🇹', 'Canadá': '🇨🇦', 'Uruguay': '🇺🇾', 'Irak': '🇮🇶',
  'Bélgica': '🇧🇪', 'Italia': '🇮🇹', 'Camerún': '🇨🇲', 'Jordania': '🇯🇴',
  'Dinamarca': '🇩🇰', 'Polonia': '🇵🇱', 'Nigeria': '🇳🇬', 'Indonesia': '🇮🇩',
  'Austria': '🇦🇹', 'Turquía': '🇹🇷', 'Egipto': '🇪🇬', 'Venezuela': '🇻🇪',
  'Escocia': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'Irán': '🇮🇷', 'Panamá': '🇵🇦', 'Sudáfrica': '🇿🇦',
  'Honduras': '🇭🇳', 'Australia': '🇦🇺', 'Jamaica': '🇯🇲', 'Senegal': '🇸🇳',
}
function getFlag(name) { return FLAG_MAP[name] || null }
