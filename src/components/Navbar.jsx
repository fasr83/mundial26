import { useState } from 'react'
import { BookOpen, Calendar, Trophy, BarChart2, MessageCircle, Share2, X, Download } from 'lucide-react'

const TABS = [
  { key: 'album',      label: 'Álbum',      icon: BookOpen      },
  { key: 'calendar',   label: 'Calendario', icon: Calendar      },
  { key: 'standings',  label: 'Posiciones', icon: BarChart2     },
  { key: 'community',  label: 'Comunidad',  icon: MessageCircle },
]

const APP_URL = 'https://fasr83.github.io/mundial26/'
const QR_URL  = 'https://fasr83.github.io/mundial26/qr-mundial26.png'

function ShareModal({ onClose }) {
  const [copied, setCopied] = useState(false)

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MUNDIAL26 — Mi Álbum Panini',
          text: '¡Completa tu álbum Panini FIFA World Cup 2026!',
          url: APP_URL,
        })
      } catch {}
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(APP_URL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-fifa-darker border border-fifa-border rounded-2xl p-6 w-full max-w-sm shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-5">
          <h2 className="font-display text-2xl text-gradient-gold tracking-wider">COMPARTIR</h2>
          <p className="text-gray-500 text-xs mt-1">Invita a tus amigos a llenar el álbum</p>
        </div>

        {/* QR */}
        <div className="flex justify-center mb-5">
          <div className="bg-[#080E1C] p-3 rounded-2xl border border-fifa-gold/30 shadow-lg shadow-yellow-500/10">
            <img
              src={QR_URL}
              alt="QR MUNDIAL26"
              className="w-52 h-52 rounded-lg"
            />
          </div>
        </div>

        {/* URL */}
        <div className="bg-fifa-card border border-fifa-border rounded-xl px-4 py-3 mb-4 flex items-center justify-between gap-2">
          <span className="text-xs text-gray-400 truncate">{APP_URL}</span>
          <button
            onClick={copyLink}
            className={`text-xs font-semibold shrink-0 transition-colors ${copied ? 'text-green-400' : 'text-fifa-gold hover:text-yellow-300'}`}
          >
            {copied ? '¡Copiado!' : 'Copiar'}
          </button>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          {typeof navigator.share !== 'undefined' && (
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-fifa-gold to-yellow-400 text-black text-sm font-bold rounded-xl hover:from-yellow-300 transition-all"
            >
              <Share2 className="w-4 h-4" /> Compartir por WhatsApp / más
            </button>
          )}
          <a
            href={QR_URL}
            download="qr-mundial26.png"
            className="w-full flex items-center justify-center gap-2 py-3 bg-fifa-card border border-fifa-border text-gray-300 text-sm font-semibold rounded-xl hover:border-fifa-gold hover:text-white transition-all"
          >
            <Download className="w-4 h-4" /> Descargar QR
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Navbar({ activeModule, setActiveModule, onLogoClick }) {
  const [showShare, setShowShare] = useState(false)

  return (
    <>
      <nav
        className="safe-nav fixed top-0 left-0 right-0 z-50 bg-fifa-darker/95 backdrop-blur-md border-b border-fifa-border"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
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

          {/* Share button */}
          <button
            onClick={() => setShowShare(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-fifa-border text-gray-400 hover:text-fifa-gold hover:border-fifa-gold/50 transition-all text-xs font-semibold"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden md:inline">Compartir</span>
          </button>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-transparent via-fifa-gold to-transparent opacity-60" />
      </nav>

      {showShare && <ShareModal onClose={() => setShowShare(false)} />}
    </>
  )
}
