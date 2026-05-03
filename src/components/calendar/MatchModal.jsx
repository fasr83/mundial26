import { X, MapPin, Clock, Tv, Star, Globe } from 'lucide-react'
import { LATAM_ZONES, TV_CHANNELS, formatLocalTime, formatLocalDateFull } from '../../data/partidos'

export default function MatchModal({ match, isFavorite, onFavorite, onClose }) {
  if (!match) return null

  const isTBD = match.home === 'Por definir'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-fifa-card2 border border-fifa-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-fifa-card2/95 backdrop-blur-sm border-b border-fifa-border p-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-fifa-gold uppercase tracking-wider">
              Partido #{match.id} · {match.phase}
              {match.group && ` · Grupo ${match.group}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onFavorite(match.id)}
              className={`p-1.5 rounded-lg transition-colors ${isFavorite ? 'text-fifa-gold' : 'text-gray-600 hover:text-gray-400'}`}
            >
              <Star className={`w-5 h-5 ${isFavorite ? 'fill-fifa-gold' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-fifa-card transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Teams */}
          <div className="flex items-center justify-center gap-4">
            <TeamBlock name={match.home} isTBD={isTBD} />
            <div className="text-center">
              <div className="font-display text-3xl text-gray-500">VS</div>
              <div className="text-xs text-gray-700 mt-1">Copa del Mundo 2026</div>
            </div>
            <TeamBlock name={match.away} isTBD={isTBD} align="right" />
          </div>

          {/* Venue */}
          <div className="card p-3 flex items-start gap-3">
            <MapPin className="w-4 h-4 text-fifa-gold mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">{match.venue.name}</div>
              <div className="text-xs text-gray-500">{match.venue.city} · {match.venue.country}</div>
            </div>
          </div>

          {/* LATAM Timezones */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-fifa-gold" />
              <span className="text-sm font-semibold text-white">Horarios LATAM</span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {LATAM_ZONES.map((zone) => {
                const time = formatLocalTime(match.dateUTC, zone.offset)
                const date = formatLocalDateFull(match.dateUTC, zone.offset)
                return (
                  <div
                    key={zone.id}
                    className="flex items-center justify-between bg-fifa-card border border-fifa-border rounded-lg px-3 py-2"
                  >
                    <span className="text-sm text-gray-300">{zone.country}</span>
                    <div className="text-right">
                      <span className="text-sm font-bold text-white">{time}</span>
                      <span className="text-xs text-gray-600 ml-2">{date}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* TV Channels */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tv className="w-4 h-4 text-fifa-gold" />
              <span className="text-sm font-semibold text-white">Canales de TV</span>
            </div>
            <div className="space-y-2">
              {Object.entries(TV_CHANNELS).map(([zoneId, channels]) => {
                const zone = LATAM_ZONES.find((z) => z.id === zoneId)
                if (!zone) return null
                return (
                  <div key={zoneId} className="flex items-start justify-between bg-fifa-card border border-fifa-border rounded-lg px-3 py-2 gap-3">
                    <span className="text-sm text-gray-300 flex-shrink-0">{zone.country}</span>
                    <div className="text-xs text-gray-500 text-right">
                      {channels.join(' · ')}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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

function TeamBlock({ name, isTBD, align = 'left' }) {
  const flag = FLAG_MAP[name]
  return (
    <div className={`flex-1 ${align === 'right' ? 'text-right items-end' : 'text-left items-start'} flex flex-col gap-1`}>
      {flag && <span className="text-4xl">{flag}</span>}
      <span className={`font-semibold text-sm leading-tight ${isTBD ? 'text-gray-600 italic' : 'text-white'}`}>
        {name}
      </span>
    </div>
  )
}
