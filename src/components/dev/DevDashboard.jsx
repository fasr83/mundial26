import { useState, useEffect, useCallback } from 'react'
import {
  BarChart2, Users, Eye, Download, Smartphone, Globe, TrendingUp,
  Key, RefreshCw, LogOut, Star, BookOpen, Calendar, Trophy, ShoppingCart,
  Wifi, WifiOff, Settings, CheckCircle, AlertCircle, ExternalLink
} from 'lucide-react'
import { getTrackingData } from '../../hooks/useAppTracking'

const REPO = 'fasr83/mundial26'
const GH_TOKEN_KEY = 'mundial26-dev-gh-token'

function StatCard({ icon: Icon, label, value, sub, color = 'text-fifa-gold' }) {
  return (
    <div className="bg-fifa-card border border-fifa-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${color}`} />
        <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
      </div>
      <div className={`font-display text-3xl ${color}`}>{value ?? '—'}</div>
      {sub && <div className="text-xs text-gray-600 mt-1">{sub}</div>}
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h3 className="font-display text-lg text-gray-300 tracking-wider mb-3 flex items-center gap-2">
      {children}
    </h3>
  )
}

export default function DevDashboard({ onLogout }) {
  const [ghToken, setGhToken] = useState(() => localStorage.getItem(GH_TOKEN_KEY) || '')
  const [tokenInput, setTokenInput] = useState('')
  const [showTokenForm, setShowTokenForm] = useState(false)
  const [ghData, setGhData] = useState(null)
  const [ghError, setGhError] = useState('')
  const [loading, setLoading] = useState(false)
  const [localData, setLocalData] = useState({})

  useEffect(() => {
    setLocalData(getTrackingData())
  }, [])

  const fetchGitHub = useCallback(async (token) => {
    if (!token) return
    setLoading(true)
    setGhError('')
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
      }
      const base = `https://api.github.com/repos/${REPO}/traffic`
      const [views, referrers, paths] = await Promise.all([
        fetch(`${base}/views`, { headers }).then(r => r.json()),
        fetch(`${base}/popular/referrers`, { headers }).then(r => r.json()),
        fetch(`${base}/popular/paths`, { headers }).then(r => r.json()),
      ])
      if (views.message) throw new Error(views.message)
      setGhData({ views, referrers, paths })
    } catch (err) {
      setGhError(err.message || 'Error al conectar con GitHub')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    if (ghToken) fetchGitHub(ghToken)
  }, [ghToken, fetchGitHub])

  function saveToken() {
    const t = tokenInput.trim()
    if (!t) return
    localStorage.setItem(GH_TOKEN_KEY, t)
    setGhToken(t)
    setShowTokenForm(false)
    setTokenInput('')
  }

  function removeToken() {
    localStorage.removeItem(GH_TOKEN_KEY)
    setGhToken('')
    setGhData(null)
  }

  // Derived local stats
  const local = {
    sessions: localData.sessions || 0,
    pwaInstalled: localData.pwaInstalled ? 'Sí' : 'No',
    firstVisit: localData.firstVisit ? new Date(localData.firstVisit).toLocaleDateString('es') : '—',
    lastVisit: localData.lastVisit ? new Date(localData.lastVisit).toLocaleDateString('es') : '—',
    events: localData.events || {},
    daily: localData.daily || {},
  }

  const moduleIcons = {
    module_album: { icon: BookOpen, label: 'Álbum' },
    module_calendar: { icon: Calendar, label: 'Calendario' },
    module_standings: { icon: BarChart2, label: 'Posiciones' },
    module_store: { icon: ShoppingCart, label: 'Tienda' },
    pwa_install: { icon: Smartphone, label: 'Instalaciones PWA' },
    session: { icon: Users, label: 'Sesiones totales' },
  }

  // Last 7 days from GitHub
  const last7Days = ghData?.views?.views?.slice(-7) || []
  const totalViews = ghData?.views?.count || 0
  const uniqueVisitors = ghData?.views?.uniques || 0

  return (
    <div className="min-h-screen bg-fifa-darker">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-fifa-darker/95 backdrop-blur border-b border-fifa-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart2 className="w-5 h-5 text-fifa-gold" />
          <span className="font-display text-xl text-gradient-gold tracking-wider">PANEL DEV · MUNDIAL26</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchGitHub(ghToken)}
            disabled={!ghToken || loading}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-fifa-border rounded-lg px-3 py-1.5 disabled:opacity-30 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Actualizar
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400 border border-fifa-border rounded-lg px-3 py-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Salir
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">

        {/* ── SECCIÓN 1: GITHUB TRAFFIC ─────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <SectionTitle><Globe className="w-4 h-4 text-fifa-gold" /> Tráfico Global — GitHub Pages</SectionTitle>
            <div className="flex items-center gap-2">
              {ghToken ? (
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs text-green-400">
                    <CheckCircle className="w-3 h-3" /> Conectado
                  </span>
                  <button onClick={() => setShowTokenForm(s => !s)} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={removeToken} className="text-xs text-red-500 hover:text-red-400 transition-colors">
                    Desconectar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowTokenForm(s => !s)}
                  className="flex items-center gap-1.5 text-xs bg-fifa-gold/10 border border-fifa-gold/30 text-fifa-gold px-3 py-1.5 rounded-lg hover:bg-fifa-gold/20 transition-colors"
                >
                  <Key className="w-3.5 h-3.5" /> Conectar GitHub Token
                </button>
              )}
            </div>
          </div>

          {/* Token form */}
          {showTokenForm && (
            <div className="bg-fifa-card border border-fifa-border rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-400 mb-3">
                Crea un <strong className="text-white">Personal Access Token</strong> en{' '}
                <a href="https://github.com/settings/tokens/new?scopes=repo" target="_blank" rel="noopener noreferrer"
                  className="text-fifa-gold hover:underline inline-flex items-center gap-1">
                  github.com/settings/tokens <ExternalLink className="w-3 h-3" />
                </a>{' '}
                con permiso <code className="bg-black/40 px-1 rounded text-green-400">repo</code> o{' '}
                <code className="bg-black/40 px-1 rounded text-green-400">read:org</code>. Se guarda solo en este dispositivo.
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={tokenInput}
                  onChange={e => setTokenInput(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                  className="flex-1 bg-fifa-darker border border-fifa-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-fifa-gold font-mono"
                  onKeyDown={e => e.key === 'Enter' && saveToken()}
                />
                <button onClick={saveToken} className="px-4 py-2 bg-fifa-gold text-black text-sm font-bold rounded-lg hover:bg-yellow-300 transition-colors">
                  Guardar
                </button>
              </div>
            </div>
          )}

          {/* Error */}
          {ghError && (
            <div className="flex items-center gap-2 text-sm text-red-400 bg-red-900/20 border border-red-900/40 rounded-xl px-4 py-3 mb-4">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {ghError === 'Must have push access to repository' ? 'El token necesita permiso "repo" — recrea el token con ese scope.' : ghError}
            </div>
          )}

          {/* No token placeholder */}
          {!ghToken && !ghError && (
            <div className="bg-fifa-card border border-dashed border-fifa-border rounded-xl p-8 text-center">
              <WifiOff className="w-10 h-10 text-gray-700 mx-auto mb-3" />
              <p className="text-gray-500 text-sm mb-1">Conecta tu GitHub Token para ver estadísticas globales</p>
              <p className="text-gray-700 text-xs">Visitas únicas · Páginas vistas · Fuentes de tráfico</p>
            </div>
          )}

          {/* GitHub stats */}
          {ghData && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                <StatCard icon={Eye} label="Vistas (14 días)" value={totalViews.toLocaleString()} sub="páginas vistas totales" />
                <StatCard icon={Users} label="Visitantes únicos" value={uniqueVisitors.toLocaleString()} sub="últimos 14 días" color="text-blue-400" />
                <StatCard icon={TrendingUp} label="Promedio diario" value={Math.round(totalViews / 14)} sub="vistas por día" color="text-green-400" />
                <StatCard icon={Globe} label="Fuentes de tráfico" value={ghData.referrers?.length || 0} sub="sitios referidores" color="text-purple-400" />
              </div>

              {/* Daily chart (text bars) */}
              {last7Days.length > 0 && (
                <div className="bg-fifa-card border border-fifa-border rounded-xl p-5 mb-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Vistas diarias — últimos 7 días</h4>
                  <div className="space-y-2">
                    {last7Days.map((day) => {
                      const max = Math.max(...last7Days.map(d => d.count), 1)
                      const pct = Math.round((day.count / max) * 100)
                      const date = new Date(day.timestamp).toLocaleDateString('es', { weekday: 'short', month: 'short', day: 'numeric' })
                      return (
                        <div key={day.timestamp} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-28 shrink-0 capitalize">{date}</span>
                          <div className="flex-1 bg-fifa-darker rounded-full h-4 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-fifa-gold/70 to-fifa-gold rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-300 w-16 text-right">
                            {day.count} <span className="text-gray-600">({day.uniques} únicos)</span>
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Referrers */}
              {ghData.referrers?.length > 0 && (
                <div className="bg-fifa-card border border-fifa-border rounded-xl p-5">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Fuentes de tráfico</h4>
                  <div className="space-y-2">
                    {ghData.referrers.map((ref) => (
                      <div key={ref.referrer} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300 flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5 text-gray-600" />
                          {ref.referrer || 'Directo'}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {ref.count} vistas · {ref.uniques} únicos
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </section>

        {/* ── SECCIÓN 2: ESTADÍSTICAS LOCALES ──────────────── */}
        <section>
          <SectionTitle><Smartphone className="w-4 h-4 text-blue-400" /> Actividad — Este Dispositivo</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            <StatCard icon={Users} label="Sesiones totales" value={local.sessions} sub={`Desde ${local.firstVisit}`} />
            <StatCard icon={Smartphone} label="PWA instalada" value={local.pwaInstalled} sub={localData.pwaInstalledAt ? new Date(localData.pwaInstalledAt).toLocaleDateString('es') : 'No registrado'} color={localData.pwaInstalled ? 'text-green-400' : 'text-gray-500'} />
            <StatCard icon={Star} label="Primera visita" value={local.firstVisit} sub="en este dispositivo" color="text-purple-400" />
            <StatCard icon={TrendingUp} label="Última visita" value={local.lastVisit} sub="en este dispositivo" color="text-blue-400" />
          </div>

          {/* Module usage */}
          <div className="bg-fifa-card border border-fifa-border rounded-xl p-5 mb-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Uso por módulo — este dispositivo</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(moduleIcons).map(([key, { icon: Icon, label }]) => {
                const count = local.events[key] || 0
                return (
                  <div key={key} className="flex items-center gap-3 bg-fifa-darker rounded-lg px-3 py-2.5">
                    <Icon className="w-4 h-4 text-gray-500 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs text-gray-400 truncate">{label}</div>
                      <div className="font-display text-lg text-white">{count}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Last 7 days local activity */}
          {Object.keys(local.daily).length > 0 && (
            <div className="bg-fifa-card border border-fifa-border rounded-xl p-5">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Actividad local — últimos días</h4>
              <div className="space-y-1.5">
                {Object.entries(local.daily)
                  .sort(([a], [b]) => b.localeCompare(a))
                  .slice(0, 7)
                  .map(([date, events]) => {
                    const total = Object.values(events).reduce((a, b) => a + b, 0)
                    return (
                      <div key={date} className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{new Date(date + 'T12:00:00').toLocaleDateString('es', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        <span className="text-gray-400">{total} eventos</span>
                      </div>
                    )
                  })}
              </div>
            </div>
          )}
        </section>

        {/* ── SECCIÓN 3: INFO TÉCNICA ───────────────────────── */}
        <section>
          <SectionTitle><Settings className="w-4 h-4 text-gray-400" /> Información Técnica</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-fifa-card border border-fifa-border rounded-xl p-5 space-y-3 text-sm">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">App</h4>
              <div className="flex justify-between"><span className="text-gray-500">URL pública</span><a href="https://fasr83.github.io/mundial26/" target="_blank" rel="noopener noreferrer" className="text-fifa-gold hover:underline text-xs flex items-center gap-1">fasr83.github.io/mundial26 <ExternalLink className="w-3 h-3" /></a></div>
              <div className="flex justify-between"><span className="text-gray-500">Repositorio</span><a href="https://github.com/fasr83/mundial26" target="_blank" rel="noopener noreferrer" className="text-fifa-gold hover:underline text-xs flex items-center gap-1">github.com/fasr83/mundial26 <ExternalLink className="w-3 h-3" /></a></div>
              <div className="flex justify-between"><span className="text-gray-500">Stack</span><span className="text-gray-300">React 18 + Vite + Tailwind</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Deploy</span><span className="text-gray-300">GitHub Pages · GitHub Actions</span></div>
              <div className="flex justify-between"><span className="text-gray-500">PWA</span><span className="text-green-400 flex items-center gap-1"><Wifi className="w-3 h-3" /> Habilitada</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Storage</span><span className="text-gray-300">localStorage (por dispositivo)</span></div>
            </div>
            <div className="bg-fifa-card border border-fifa-border rounded-xl p-5 space-y-3 text-sm">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Álbum Panini</h4>
              <div className="flex justify-between"><span className="text-gray-500">Total láminas</span><span className="text-fifa-gold font-bold">980</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Selecciones</span><span className="text-gray-300">48</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Por selección</span><span className="text-gray-300">20 (foil + grupal + 18 retratos)</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Intro / Estadios</span><span className="text-gray-300">20 láminas</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Partidos</span><span className="text-gray-300">104 (72 grupos + 32 eliminatoria)</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Sedes</span><span className="text-gray-300">16 estadios</span></div>
            </div>
          </div>
        </section>

        {/* ── SECCIÓN 4: COMO ACCEDER ──────────────────────── */}
        <section>
          <SectionTitle><Key className="w-4 h-4 text-gray-400" /> Acceso al Panel</SectionTitle>
          <div className="bg-fifa-card border border-fifa-border rounded-xl p-5 text-sm space-y-3">
            <p className="text-gray-400">El panel se accede haciendo <strong className="text-white">clic 7 veces</strong> sobre el logo <span className="text-fifa-gold font-display">MUNDIAL26</span> en el navbar.</p>
            <p className="text-gray-400">Contraseña por defecto: <code className="bg-black/40 text-fifa-gold px-2 py-0.5 rounded font-mono">ROBUR2026</code></p>
            <p className="text-gray-400">Para cambiar la contraseña, edita <code className="bg-black/40 text-blue-300 px-2 py-0.5 rounded font-mono">src/components/dev/DevLogin.jsx</code> y actualiza el hash SHA-256.</p>
            <p className="text-gray-400">El GitHub Token se almacena solo en tu navegador (localStorage) — nunca se envía al repositorio.</p>
          </div>
        </section>

      </div>
    </div>
  )
}
