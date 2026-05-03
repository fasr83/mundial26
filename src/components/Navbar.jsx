import { BookOpen, Calendar, Trophy, BarChart2, MessageCircle } from 'lucide-react'

const TABS = [
  { key: 'album',      label: 'Álbum',      icon: BookOpen      },
  { key: 'calendar',   label: 'Calendario', icon: Calendar      },
  { key: 'standings',  label: 'Posiciones', icon: BarChart2     },
  { key: 'community',  label: 'Comunidad',  icon: MessageCircle },
]

export default function Navbar({ activeModule, setActiveModule, onLogoClick }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-fifa-darker/95 backdrop-blur-md border-b border-fifa-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo — 7 clicks abre panel dev */}
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={onLogoClick}>
          <Trophy className="text-fifa-gold w-7 h-7" />
          <div>
            <span className="font-display text-2xl text-gradient-gold tracking-wider leading-none">
              MUNDIAL26
            </span>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest leading-none mt-0.5">
              Mi Álbum Panini
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-fifa-card rounded-xl p-1 border border-fifa-border">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveModule(key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeModule === key ? 'tab-active' : 'tab-inactive'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Badge */}
        <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 rounded-full bg-fifa-gold animate-pulse" />
          <span>FIFA World Cup 2026™</span>
        </div>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-transparent via-fifa-gold to-transparent opacity-60" />
    </nav>
  )
}
