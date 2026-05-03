import { useState, useEffect, useCallback } from 'react'
import { MessageCircle, MapPin, Plus, Clock, Phone, CheckCircle, AlertCircle, Loader, Search } from 'lucide-react'
import { ref, push, onValue, serverTimestamp } from 'firebase/database'
import { db, auth, signInAnonymously, isFirebaseConfigured } from '../../lib/firebase'
import { CITIES_BY_COUNTRY, LATAM_COUNTRY_IDS } from '../../data/cities.js'

// ── HELPER ────────────────────────────────────────────────────────
function timeAgo(ts) {
  if (!ts) return ''
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60000)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  if (d > 0) return `hace ${d} día${d > 1 ? 's' : ''}`
  if (h > 0) return `hace ${h}h`
  if (m > 0) return `hace ${m}min`
  return 'ahora mismo'
}

function PostCard({ post }) {
  return (
    <div className="bg-fifa-card border border-fifa-border rounded-xl p-4 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-fifa-gold shrink-0 mt-0.5" />
          <span className="text-white text-sm font-semibold leading-snug">{post.lugar}</span>
        </div>
        <span className="text-[10px] text-gray-600 shrink-0 flex items-center gap-1">
          <Clock className="w-3 h-3" />{timeAgo(post.createdAt)}
        </span>
      </div>
      {post.fecha && (
        <p className="text-xs text-fifa-gold font-medium">📅 {post.fecha}</p>
      )}
      {post.mensaje && (
        <p className="text-gray-300 text-sm">{post.mensaje}</p>
      )}
      {post.contacto && (
        <p className="text-xs text-green-400 flex items-center gap-1.5">
          <Phone className="w-3 h-3" />{post.contacto}
        </p>
      )}
      <div className="flex items-center gap-1.5 pt-1">
        <div className="w-5 h-5 rounded-full bg-fifa-navy flex items-center justify-center text-[10px]">
          {post.autorNombre?.[0]?.toUpperCase() || '?'}
        </div>
        <span className="text-xs text-gray-600">{post.autorNombre || 'Usuario anónimo'}</span>
      </div>
    </div>
  )
}

function NewPostForm({ countryId, cityId, onClose, onSubmit }) {
  const [lugar, setLugar] = useState('')
  const [fecha, setFecha] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [contacto, setContacto] = useState('')
  const [nombre, setNombre] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!lugar.trim()) return
    setSubmitting(true)
    try {
      await onSubmit({ lugar: lugar.trim(), fecha: fecha.trim(), mensaje: mensaje.trim(), contacto: contacto.trim(), autorNombre: nombre.trim() || 'Anónimo' })
      setDone(true)
    } catch {
      // ignore
    }
    setSubmitting(false)
  }

  if (done) {
    return (
      <div className="bg-fifa-card border border-green-500/30 rounded-2xl p-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
        <h3 className="font-display text-xl text-white mb-1">¡Publicación enviada!</h3>
        <p className="text-gray-400 text-sm">El creador la revisará y aprobará pronto.</p>
        <button onClick={onClose} className="mt-4 px-6 py-2 bg-fifa-gold text-black text-sm font-bold rounded-xl hover:bg-yellow-300 transition-colors">Cerrar</button>
      </div>
    )
  }

  return (
    <div className="bg-fifa-card border border-fifa-border rounded-2xl p-5">
      <h3 className="font-display text-lg text-gradient-gold mb-4">PROPONER PUNTO DE INTERCAMBIO</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Tu nombre / apodo *</label>
          <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="ej. Carlos M." maxLength={40}
            className="w-full bg-fifa-darker border border-fifa-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-fifa-gold" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Lugar exacto *</label>
          <input required value={lugar} onChange={e => setLugar(e.target.value)} placeholder="ej. Parque de la 93, entrada principal" maxLength={120}
            className="w-full bg-fifa-darker border border-fifa-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-fifa-gold" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Fecha y hora</label>
          <input value={fecha} onChange={e => setFecha(e.target.value)} placeholder="ej. Sábado 14 de junio, 3:00pm"  maxLength={80}
            className="w-full bg-fifa-darker border border-fifa-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-fifa-gold" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Mensaje adicional</label>
          <textarea value={mensaje} onChange={e => setMensaje(e.target.value)} placeholder="ej. Tengo repetidos de Argentina, Brasil y España. Busco selecciones europeas." maxLength={250} rows={3}
            className="w-full bg-fifa-darker border border-fifa-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-fifa-gold resize-none" />
          <span className="text-[10px] text-gray-700">{mensaje.length}/250</span>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Contacto (WhatsApp, Instagram…)</label>
          <input value={contacto} onChange={e => setContacto(e.target.value)} placeholder="ej. WhatsApp +57 300 123 4567" maxLength={80}
            className="w-full bg-fifa-darker border border-fifa-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-fifa-gold" />
        </div>
        <div className="flex gap-2 pt-1">
          <button type="button" onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-fifa-border text-gray-400 hover:text-white text-sm font-semibold transition-colors">
            Cancelar
          </button>
          <button type="submit" disabled={submitting || !lugar.trim()}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-fifa-gold to-yellow-400 text-black text-sm font-bold hover:from-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
            {submitting ? <Loader className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" />Proponer</>}
          </button>
        </div>
      </form>
      <p className="text-[10px] text-gray-700 mt-3 text-center">Tu publicación será revisada por el creador antes de aparecer públicamente.</p>
    </div>
  )
}

// ── MÓDULO PRINCIPAL ──────────────────────────────────────────────
export default function CommunityModule() {
  const [uid, setUid] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState('col')
  const [selectedCity, setSelectedCity] = useState('')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')

  // Auth anónima
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) return
    signInAnonymously(auth).then(c => setUid(c.user.uid)).catch(() => {})
  }, [])

  // Escuchar posts aprobados
  useEffect(() => {
    if (!isFirebaseConfigured || !db || !selectedCountry || !selectedCity) {
      setPosts([])
      return
    }
    setLoading(true)
    const path = `community/${selectedCountry}/${selectedCity.replace(/\s+/g, '_')}/posts`
    const unsub = onValue(ref(db, path), snap => {
      const data = snap.val() || {}
      const list = Object.entries(data)
        .map(([id, p]) => ({ id, ...p }))
        .filter(p => p.approved)
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      setPosts(list)
      setLoading(false)
    })
    return () => unsub()
  }, [selectedCountry, selectedCity])

  const handleSubmit = useCallback(async (data) => {
    if (!isFirebaseConfigured || !db || !uid) return
    const path = `community/${selectedCountry}/${selectedCity.replace(/\s+/g, '_')}/posts`
    await push(ref(db, path), {
      ...data,
      approved: false,
      uid,
      createdAt: serverTimestamp(),
    })
  }, [selectedCountry, selectedCity, uid])

  const country = CITIES_BY_COUNTRY[selectedCountry]
  const allCountries = [
    ...LATAM_COUNTRY_IDS.filter(id => CITIES_BY_COUNTRY[id]),
    ...Object.keys(CITIES_BY_COUNTRY).filter(id => !LATAM_COUNTRY_IDS.includes(id) && CITIES_BY_COUNTRY[id]?.cities),
  ]

  const filteredCities = (country?.cities || []).filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-4xl text-gradient-gold tracking-wider">COMUNIDAD</h1>
        <p className="text-gray-500 text-sm mt-1">
          Puntos de intercambio de láminas · Por ciudad · Aprobados por el creador
        </p>
      </div>

      {!isFirebaseConfigured ? (
        // ── ESTADO SIN FIREBASE ──────────────────────────────
        <div className="bg-fifa-card border border-dashed border-fifa-border rounded-2xl p-8 text-center max-w-xl mx-auto">
          <MessageCircle className="w-14 h-14 text-gray-700 mx-auto mb-4" />
          <h3 className="font-display text-2xl text-white mb-2">Chat Comunitario en Configuración</h3>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            Para activar la comunidad necesitas conectar una base de datos Firebase gratuita.
          </p>
          <div className="bg-fifa-darker rounded-xl p-4 text-left text-xs text-gray-400 space-y-2 mb-4">
            <p className="font-semibold text-white">Pasos para activar (5 min):</p>
            <p>1. Ve a <span className="text-fifa-gold">console.firebase.google.com</span></p>
            <p>2. Crea un proyecto → activa <strong className="text-white">Realtime Database</strong></p>
            <p>3. Activa <strong className="text-white">Authentication → Anonymous</strong></p>
            <p>4. Ve a Project Settings → Tu app web → copia la config</p>
            <p>5. Crea el archivo <code className="bg-black/40 px-1 rounded text-green-400">.env.local</code> en la raíz del proyecto con los valores VITE_FIREBASE_*</p>
            <p>6. En el panel dev activa las reglas de moderación</p>
          </div>
          <a href="https://console.firebase.google.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-sm font-bold rounded-xl hover:from-orange-400 transition-all">
            Abrir Firebase Console →
          </a>
        </div>
      ) : (
        // ── INTERFAZ PRINCIPAL ────────────────────────────────
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Sidebar selector país/ciudad */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-fifa-card border border-fifa-border rounded-2xl overflow-hidden sticky top-20">
              {/* País selector */}
              <div className="p-3 border-b border-fifa-border">
                <label className="text-xs text-gray-500 uppercase tracking-wider block mb-2">País</label>
                <select
                  value={selectedCountry}
                  onChange={e => { setSelectedCountry(e.target.value); setSelectedCity(''); setShowForm(false) }}
                  className="w-full bg-fifa-darker border border-fifa-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-fifa-gold"
                >
                  <optgroup label="── Latinoamérica ──">
                    {LATAM_COUNTRY_IDS.filter(id => CITIES_BY_COUNTRY[id]).map(id => (
                      <option key={id} value={id} className="bg-fifa-card">
                        {CITIES_BY_COUNTRY[id].flag} {CITIES_BY_COUNTRY[id].name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="── Otros ──">
                    {allCountries.filter(id => !LATAM_COUNTRY_IDS.includes(id)).map(id => (
                      <option key={id} value={id} className="bg-fifa-card">
                        {CITIES_BY_COUNTRY[id].flag} {CITIES_BY_COUNTRY[id].name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Buscador de ciudad */}
              <div className="p-3 border-b border-fifa-border">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar ciudad..."
                    className="w-full bg-fifa-darker border border-fifa-border rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-fifa-gold"
                  />
                </div>
              </div>

              {/* Lista de ciudades */}
              <div className="overflow-y-auto max-h-96">
                {filteredCities.map(city => (
                  <button
                    key={city}
                    onClick={() => { setSelectedCity(city); setShowForm(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-all flex items-center justify-between group ${
                      selectedCity === city
                        ? 'bg-fifa-gold/10 text-fifa-gold border-r-2 border-fifa-gold'
                        : 'text-gray-400 hover:text-white hover:bg-fifa-darker'
                    }`}
                  >
                    <span>{city}</span>
                    {selectedCity === city && <MapPin className="w-3.5 h-3.5" />}
                  </button>
                ))}
                {filteredCities.length === 0 && (
                  <p className="text-xs text-gray-700 text-center py-6">Sin ciudades</p>
                )}
              </div>
            </div>
          </div>

          {/* Panel principal */}
          <div className="flex-1 min-w-0">
            {!selectedCity ? (
              <div className="bg-fifa-card border border-dashed border-fifa-border rounded-2xl p-12 text-center">
                <MapPin className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500">Selecciona una ciudad para ver los puntos de intercambio</p>
              </div>
            ) : (
              <>
                {/* Header ciudad */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div>
                    <h2 className="font-display text-2xl text-white tracking-wide">
                      {country?.flag} {selectedCity}
                    </h2>
                    <p className="text-gray-500 text-xs mt-0.5">{country?.name} · Intercambio de láminas</p>
                  </div>
                  {!showForm && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-fifa-gold to-yellow-400 text-black text-sm font-bold rounded-xl hover:from-yellow-300 transition-all shadow-lg shadow-yellow-500/20"
                    >
                      <Plus className="w-4 h-4" /> Proponer punto
                    </button>
                  )}
                </div>

                {/* Formulario nuevo post */}
                {showForm && (
                  <div className="mb-5">
                    <NewPostForm
                      countryId={selectedCountry}
                      cityId={selectedCity}
                      onClose={() => setShowForm(false)}
                      onSubmit={handleSubmit}
                    />
                  </div>
                )}

                {/* Posts */}
                {loading ? (
                  <div className="text-center py-12">
                    <Loader className="w-8 h-8 text-fifa-gold animate-spin mx-auto mb-2" />
                    <p className="text-gray-600 text-sm">Cargando puntos...</p>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="bg-fifa-card border border-dashed border-fifa-border rounded-2xl p-10 text-center">
                    <MessageCircle className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm mb-1">Aún no hay puntos de intercambio en {selectedCity}</p>
                    <p className="text-gray-700 text-xs">¡Sé el primero en proponer uno!</p>
                    {!showForm && (
                      <button onClick={() => setShowForm(true)}
                        className="mt-4 px-5 py-2 bg-fifa-gold/10 border border-fifa-gold/30 text-fifa-gold text-sm rounded-xl hover:bg-fifa-gold/20 transition-colors">
                        <Plus className="w-4 h-4 inline mr-1" />Proponer punto
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-gray-600">{posts.length} punto{posts.length !== 1 ? 's' : ''} de intercambio</p>
                    {posts.map(post => <PostCard key={post.id} post={post} />)}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
