import { useState, useEffect, useCallback } from 'react'
import {
  BarChart2, Users, Eye, Smartphone, Globe, TrendingUp,
  Key, RefreshCw, LogOut, Star, BookOpen, Calendar, MessageCircle,
  Wifi, WifiOff, Settings, CheckCircle, AlertCircle, ExternalLink,
  ThumbsUp, ThumbsDown, Loader, Shield, ShieldOff, Ban,
  ChevronDown, ChevronUp, Send, AlertTriangle
} from 'lucide-react'
import { getTrackingData } from '../../hooks/useAppTracking'
import { ref, onValue, update, set, remove } from 'firebase/database'
import { db, isFirebaseConfigured } from '../../lib/firebase'

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

function BanPanel() {
  const [messages, setMessages] = useState([])
  const [banned, setBanned] = useState({})
  const [actioning, setActioning] = useState({})
  const [selected, setSelected] = useState(null) // { uid, apodo }
  const [warningText, setWarningText] = useState('')
  const [sendingWarning, setSendingWarning] = useState(false)

  useEffect(() => {
    if (!isFirebaseConfigured || !db) return
    const unsubMsg = onValue(ref(db, 'chat/messages'), snap => {
      const data = snap.val() || {}
      const list = Object.entries(data)
        .map(([id, m]) => ({ id, ...m }))
        .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
        .slice(0, 60)
      setMessages(list)
    })
    const unsubBan = onValue(ref(db, 'banned'), snap => setBanned(snap.val() || {}))
    return () => { unsubMsg(); unsubBan() }
  }, [])

  async function banUser(uid, apodo) {
    setActioning(p => ({ ...p, [uid]: true }))
    await set(ref(db, `banned/${uid}`), { apodo, bannedAt: Date.now() })
    setActioning(p => ({ ...p, [uid]: false }))
  }

  async function unbanUser(uid) {
    setActioning(p => ({ ...p, [uid]: true }))
    await remove(ref(db, `banned/${uid}`))
    setActioning(p => ({ ...p, [uid]: false }))
  }

  async function sendWarning() {
    if (!warningText.trim() || !selected) return
    setSendingWarning(true)
    await set(ref(db, `warnings/${selected.uid}`), { message: warningText.trim(), sentAt: Date.now() })
    setWarningText('')
    setSendingWarning(false)
  }

  function selectUser(uid, apodo) {
    if (selected?.uid === uid) { setSelected(null); setWarningText(''); return }
    setSelected({ uid, apodo })
    setWarningText('')
  }

  if (!isFirebaseConfigured) return null

  const bannedList = Object.entries(banned)

  return (
    <div className="space-y-4">
      {/* Baneados activos */}
      {bannedList.length > 0 && (
        <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-3">
          <p className="text-xs text-red-400 uppercase tracking-wider mb-2 font-semibold">
            🚫 {bannedList.length} baneado{bannedList.length !== 1 ? 's' : ''}
          </p>
          <div className="flex flex-wrap gap-2">
            {bannedList.map(([uid, info]) => (
              <div key={uid} className="flex items-center gap-2 bg-red-900/20 border border-red-900/40 rounded-lg px-3 py-1.5">
                <span className="text-red-300 text-xs font-semibold">{info.apodo || 'Anónimo'}</span>
                <button
                  onClick={() => unbanUser(uid)}
                  disabled={actioning[uid]}
                  className="text-green-400 hover:text-green-300 disabled:opacity-40 transition-colors"
                  title="Desbanear"
                >
                  {actioning[uid] ? <Loader className="w-3 h-3 animate-spin" /> : <ShieldOff className="w-3 h-3" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista de mensajes compacta y scrollable */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold flex items-center gap-2">
          <MessageCircle className="w-3.5 h-3.5" />
          Mensajes recientes — clic para accionar
        </p>
        {messages.length === 0 ? (
          <p className="text-gray-600 text-sm text-center py-6">No hay mensajes aún.</p>
        ) : (
          <div className="border border-fifa-border rounded-xl overflow-hidden">
            <div className="max-h-64 overflow-y-auto divide-y divide-fifa-border/50">
              {messages.map(msg => {
                const isBanned = !!banned[msg.uid]
                const isSelected = selected?.uid === msg.uid
                return (
                  <button
                    key={msg.id}
                    onClick={() => selectUser(msg.uid, msg.apodo)}
                    className={`w-full text-left px-3 py-2 flex items-center gap-2 transition-colors ${
                      isSelected ? 'bg-fifa-gold/10 border-l-2 border-fifa-gold' :
                      isBanned ? 'bg-red-900/10 opacity-60' : 'hover:bg-fifa-darker'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isBanned ? 'bg-red-900/40 text-red-500' : 'bg-fifa-navy text-gray-400'
                    }`}>
                      {isBanned ? '🚫' : msg.apodo?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className={`text-xs font-semibold ${isBanned ? 'text-red-500 line-through' : 'text-gray-300'}`}>
                        {msg.apodo || 'Anónimo'}
                      </span>
                      {msg.imagen && <span className="text-[10px] text-blue-400 ml-1">[img]</span>}
                      <p className="text-[11px] text-gray-600 truncate">{msg.texto || '(imagen)'}</p>
                    </div>
                    {isBanned && <span className="text-[9px] text-red-700 shrink-0">BANEADO</span>}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Panel de acción para usuario seleccionado */}
      {selected && (
        <div className="bg-fifa-card border border-fifa-gold/30 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm font-semibold">{selected.apodo}</p>
              <p className="text-gray-600 text-[10px] font-mono">{selected.uid}</p>
            </div>
            <div className="flex gap-2">
              {banned[selected.uid] ? (
                <button
                  onClick={() => unbanUser(selected.uid)}
                  disabled={actioning[selected.uid]}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600/20 border border-green-500/40 text-green-400 text-xs rounded-lg hover:bg-green-600/30 disabled:opacity-40 transition-colors"
                >
                  {actioning[selected.uid] ? <Loader className="w-3 h-3 animate-spin" /> : <ShieldOff className="w-3 h-3" />}
                  Desbanear
                </button>
              ) : (
                <button
                  onClick={() => banUser(selected.uid, selected.apodo)}
                  disabled={actioning[selected.uid]}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/20 border border-red-500/40 text-red-400 text-xs rounded-lg hover:bg-red-600/30 disabled:opacity-40 transition-colors"
                >
                  {actioning[selected.uid] ? <Loader className="w-3 h-3 animate-spin" /> : <Ban className="w-3 h-3" />}
                  Banear
                </button>
              )}
            </div>
          </div>
          {/* Aviso interno */}
          <div>
            <p className="text-[10px] text-yellow-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Enviar aviso interno (aparece como popup al usuario)
            </p>
            <div className="flex gap-2">
              <input
                value={warningText}
                onChange={e => setWarningText(e.target.value)}
                placeholder="Ej: Tu comportamiento no es adecuado..."
                maxLength={200}
                className="flex-1 bg-fifa-darker border border-fifa-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-yellow-500"
                onKeyDown={e => e.key === 'Enter' && sendWarning()}
              />
              <button
                onClick={sendWarning}
                disabled={!warningText.trim() || sendingWarning}
                className="px-3 py-2 bg-yellow-600/20 border border-yellow-500/40 text-yellow-400 rounded-lg hover:bg-yellow-600/30 disabled:opacity-40 transition-colors shrink-0"
              >
                {sendingWarning ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ModerationPanel() {
  const [pending, setPending] = useState([])
  const [loadingMod, setLoadingMod] = useState(true)
  const [actioning, setActioning] = useState({})

  useEffect(() => {
    if (!isFirebaseConfigured || !db) { setLoadingMod(false); return }
    const unsub = onValue(ref(db, 'community'), snap => {
      const data = snap.val() || {}
      const all = []
      Object.entries(data).forEach(([country, cities]) => {
        Object.entries(cities).forEach(([city, cityData]) => {
          Object.entries(cityData.posts || {}).forEach(([id, post]) => {
            if (!post.approved) all.push({ id, country, city, ...post })
          })
        })
      })
      all.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      setPending(all)
      setLoadingMod(false)
    })
    return () => unsub()
  }, [])

  async function approve(p, approved) {
    setActioning(prev => ({ ...prev, [p.id]: true }))
    const path = `community/${p.country}/${p.city}/posts/${p.id}`
    await update(ref(db, path), { approved })
    setActioning(prev => ({ ...prev, [p.id]: false }))
  }

  if (!isFirebaseConfigured) {
    return (
      <div className="bg-fifa-card border border-dashed border-fifa-border rounded-xl p-6 text-center">
        <WifiOff className="w-8 h-8 text-gray-700 mx-auto mb-2" />
        <p className="text-gray-500 text-sm">Firebase no configurado — la comunidad no está activa.</p>
      </div>
    )
  }

  if (loadingMod) return <div className="flex justify-center py-8"><Loader className="w-6 h-6 text-fifa-gold animate-spin" /></div>

  if (pending.length === 0) {
    return (
      <div className="bg-fifa-card border border-green-500/20 rounded-xl p-6 text-center">
        <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
        <p className="text-gray-400 text-sm">No hay publicaciones pendientes de moderación.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">{pending.length} publicación{pending.length !== 1 ? 'es' : ''} pendiente{pending.length !== 1 ? 's' : ''} de aprobación</p>
      {pending.map(p => (
        <div key={p.id} className="bg-fifa-card border border-yellow-500/30 rounded-xl p-4">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <p className="text-xs text-gray-500 mb-1">
                <span className="text-gray-300">{p.country.toUpperCase()}</span> · {p.city?.replace(/_/g, ' ')}
              </p>
              <p className="text-white text-sm font-semibold">{p.lugar}</p>
              {p.fecha && <p className="text-fifa-gold text-xs">📅 {p.fecha}</p>}
              {p.mensaje && <p className="text-gray-400 text-xs mt-1">{p.mensaje}</p>}
              {p.contacto && <p className="text-green-400 text-xs mt-1">{p.contacto}</p>}
              <p className="text-gray-600 text-xs mt-1">por: {p.autorNombre || 'Anónimo'}</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button
                onClick={() => approve(p, true)}
                disabled={actioning[p.id]}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-600/20 border border-green-500/40 text-green-400 text-xs font-semibold rounded-lg hover:bg-green-600/30 disabled:opacity-40 transition-colors"
              >
                {actioning[p.id] ? <Loader className="w-3 h-3 animate-spin" /> : <ThumbsUp className="w-3.5 h-3.5" />}
                Aprobar
              </button>
              <button
                onClick={() => approve(p, false)}
                disabled={actioning[p.id]}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-semibold rounded-lg hover:bg-red-600/30 disabled:opacity-40 transition-colors"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
                Rechazar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
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
  const [showDailyChart, setShowDailyChart] = useState(false)
  const [showLocalDaily, setShowLocalDaily] = useState(false)

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
    module_album:     { icon: BookOpen,       label: 'Álbum' },
    module_calendar:  { icon: Calendar,       label: 'Calendario' },
    module_standings: { icon: BarChart2,      label: 'Posiciones' },
    module_community: { icon: MessageCircle,  label: 'Comunidad' },
    pwa_install:      { icon: Smartphone,     label: 'Instalaciones PWA' },
    session:          { icon: Users,          label: 'Sesiones totales' },
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

              {/* Daily chart (text bars) — collapsible */}
              {last7Days.length > 0 && (
                <div className="bg-fifa-card border border-fifa-border rounded-xl mb-4 overflow-hidden">
                  <button
                    onClick={() => setShowDailyChart(s => !s)}
                    className="w-full flex items-center justify-between px-5 py-3 hover:bg-fifa-darker/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Vistas diarias — últimos 7 días</h4>
                      <div className="flex gap-2 text-xs">
                        {last7Days.slice(-3).map(d => (
                          <span key={d.timestamp} className="text-fifa-gold font-mono">
                            {d.count}
                          </span>
                        ))}
                      </div>
                    </div>
                    {showDailyChart ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
                  </button>
                  {showDailyChart && (
                    <div className="px-5 pb-4 space-y-2 border-t border-fifa-border">
                      <div className="h-2" />
                      {last7Days.map((day) => {
                        const max = Math.max(...last7Days.map(d => d.count), 1)
                        const pct = Math.round((day.count / max) * 100)
                        const date = new Date(day.timestamp).toLocaleDateString('es', { weekday: 'short', month: 'short', day: 'numeric' })
                        return (
                          <div key={day.timestamp} className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 w-24 shrink-0 capitalize">{date}</span>
                            <div className="flex-1 bg-fifa-darker rounded-full h-3 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-fifa-gold/70 to-fifa-gold rounded-full transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-300 w-14 text-right tabular-nums">
                              {day.count} <span className="text-gray-600">({day.uniques})</span>
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  )}
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

          {/* Last 7 days local activity — collapsible */}
          {Object.keys(local.daily).length > 0 && (
            <div className="bg-fifa-card border border-fifa-border rounded-xl overflow-hidden">
              <button
                onClick={() => setShowLocalDaily(s => !s)}
                className="w-full flex items-center justify-between px-5 py-3 hover:bg-fifa-darker/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Actividad local — últimos días</h4>
                  <span className="text-xs text-gray-600">{Object.keys(local.daily).length} días registrados</span>
                </div>
                {showLocalDaily ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
              </button>
              {showLocalDaily && (
                <div className="px-5 pb-4 space-y-1.5 border-t border-fifa-border pt-3">
                  {Object.entries(local.daily)
                    .sort(([a], [b]) => b.localeCompare(a))
                    .slice(0, 7)
                    .map(([date, events]) => {
                      const total = Object.values(events).reduce((a, b) => a + b, 0)
                      return (
                        <div key={date} className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">{new Date(date + 'T12:00:00').toLocaleDateString('es', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                          <span className="text-gray-400 tabular-nums">{total} eventos</span>
                        </div>
                      )
                    })}
                </div>
              )}
            </div>
          )}
        </section>

        {/* ── SECCIÓN 3: MODERACIÓN COMUNIDAD ──────────────── */}
        <section>
          <SectionTitle><MessageCircle className="w-4 h-4 text-yellow-400" /> Moderación — Publicaciones Pendientes</SectionTitle>
          <ModerationPanel />
        </section>

        {/* ── SECCIÓN 4: BANEO DE USUARIOS ─────────────────── */}
        <section>
          <SectionTitle><Shield className="w-4 h-4 text-red-400" /> Control de Usuarios — Chat</SectionTitle>
          <BanPanel />
        </section>

        {/* ── SECCIÓN 4: INFO TÉCNICA ───────────────────────── */}
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
