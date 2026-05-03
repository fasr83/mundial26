import { useState, useEffect, useCallback, useRef } from 'react'
import { MessageCircle, MapPin, Plus, Clock, Phone, CheckCircle, Loader, Search, Send, Users, Shield, ImagePlus, X } from 'lucide-react'
import { ref, push, onValue, serverTimestamp, query, limitToLast, orderByChild } from 'firebase/database'
import { db, auth, signInAnonymously, isFirebaseConfigured } from '../../lib/firebase'
import { CITIES_BY_COUNTRY, LATAM_COUNTRY_IDS } from '../../data/cities.js'

function timeAgo(ts) {
  if (!ts) return ''
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60000)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  if (d > 0) return `hace ${d}d`
  if (h > 0) return `hace ${h}h`
  if (m > 0) return `hace ${m}min`
  return 'ahora'
}

// ── COMPRIMIR IMAGEN CON CANVAS ───────────────────────────────────────
function compressImage(file, maxPx = 600, quality = 0.65) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, maxPx / Math.max(img.width, img.height))
        const w = Math.round(img.width * scale)
        const h = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.onerror = reject
      img.src = e.target.result
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// ── CHAT GLOBAL ──────────────────────────────────────────────────────
function GlobalChat({ uid, bannedUids }) {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [apodo, setApodo] = useState(() => localStorage.getItem('mundial26-apodo') || '')
  const [apodoTemp, setApodoTemp] = useState('')
  const [settingApodo, setSettingApodo] = useState(!localStorage.getItem('mundial26-apodo'))
  const [sending, setSending] = useState(false)
  const [expandedImg, setExpandedImg] = useState(null)
  const bottomRef = useRef(null)
  const fileRef = useRef(null)

  const isBanned = uid && bannedUids[uid]

  useEffect(() => {
    if (!isFirebaseConfigured || !db) return
    const q = query(ref(db, 'chat/messages'), orderByChild('timestamp'), limitToLast(80))
    const unsub = onValue(q, snap => {
      const data = snap.val() || {}
      const list = Object.entries(data)
        .map(([id, m]) => ({ id, ...m }))
        .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))
      setMessages(list)
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    })
    return () => unsub()
  }, [])

  function saveApodo() {
    const name = apodoTemp.trim()
    if (!name) return
    localStorage.setItem('mundial26-apodo', name)
    setApodo(name)
    setSettingApodo(false)
  }

  async function handleImageSelect(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      alert('La imagen es muy grande. Máximo 10MB.')
      e.target.value = ''
      return
    }
    try {
      const compressed = await compressImage(file)
      setImagePreview(compressed)
    } catch {
      alert('No se pudo procesar la imagen. Intenta con otra.')
    }
    e.target.value = ''
  }

  async function sendMessage(e) {
    e.preventDefault()
    if ((!text.trim() && !imagePreview) || !uid || !apodo || isBanned) return
    setSending(true)
    try {
      const payload = { uid, apodo, timestamp: serverTimestamp() }
      if (imagePreview) {
        payload.imagen = imagePreview
        if (text.trim()) payload.texto = text.trim().slice(0, 300)
      } else {
        payload.texto = text.trim().slice(0, 300)
      }
      await push(ref(db, 'chat/messages'), payload)
      setText('')
      setImagePreview(null)
    } catch {}
    setSending(false)
  }

  if (settingApodo) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-5">
        <Users className="w-12 h-12 text-fifa-gold" />
        <div className="text-center">
          <h3 className="font-display text-2xl text-white mb-1">¿Cómo te llamas?</h3>
          <p className="text-gray-500 text-sm">Elige un apodo para el chat</p>
        </div>
        <div className="flex gap-2 w-full max-w-sm">
          <input
            autoFocus
            value={apodoTemp}
            onChange={e => setApodoTemp(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && saveApodo()}
            placeholder="ej. Carlos M."
            maxLength={30}
            className="flex-1 bg-fifa-darker border border-fifa-border rounded-xl px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-fifa-gold"
          />
          <button
            onClick={saveApodo}
            disabled={!apodoTemp.trim()}
            className="px-5 py-3 bg-fifa-gold text-black font-bold rounded-xl hover:bg-yellow-300 disabled:opacity-40 transition-all"
          >
            Entrar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[600px] bg-fifa-card border border-fifa-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-fifa-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-gray-400">Chat global · {messages.length} mensajes</span>
        </div>
        <button
          onClick={() => { setApodoTemp(apodo); setSettingApodo(true) }}
          className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
        >
          Apodo: <span className="text-gray-300">{apodo}</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-center py-12 text-gray-600 text-sm">
            Sé el primero en escribir algo 👋
          </div>
        )}
        {messages.map(msg => {
          const isMe = msg.uid === uid
          const banned = bannedUids[msg.uid]
          return (
            <div key={msg.id} className={`flex gap-2 ${isMe ? 'flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                banned ? 'bg-red-900/40 text-red-600' : isMe ? 'bg-fifa-gold/20 text-fifa-gold' : 'bg-fifa-navy text-gray-400'
              }`}>
                {banned ? '🚫' : msg.apodo?.[0]?.toUpperCase() || '?'}
              </div>
              <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-0.5`}>
                <span className="text-[10px] text-gray-600 px-1">
                  {banned ? <span className="text-red-700">bloqueado</span> : msg.apodo}
                  {' · '}{timeAgo(msg.timestamp)}
                </span>
                <div className={`rounded-2xl text-sm overflow-hidden ${
                  banned
                    ? 'bg-red-900/20 border border-red-900/30 text-red-800 italic text-xs px-3 py-2'
                    : isMe
                      ? 'bg-fifa-gold/15 border border-fifa-gold/20 text-white'
                      : 'bg-fifa-darker border border-fifa-border text-gray-200'
                }`}>
                  {banned ? (
                    <span className="px-3 py-2 block">Mensaje de usuario bloqueado</span>
                  ) : (
                    <>
                      {msg.imagen && (
                        <img
                          src={msg.imagen}
                          alt="imagen"
                          className="max-w-[220px] rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setExpandedImg(msg.imagen)}
                        />
                      )}
                      {msg.texto && (
                        <span className="px-3 py-2 block">{msg.texto}</span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-fifa-border shrink-0">
        {isBanned ? (
          <div className="flex items-center gap-2 bg-red-900/20 border border-red-900/40 rounded-xl px-4 py-3 text-red-400 text-sm">
            <Shield className="w-4 h-4 shrink-0" />
            Has sido bloqueado del chat por el administrador.
          </div>
        ) : (
          <form onSubmit={sendMessage} className="space-y-2">
            {/* Image preview */}
            {imagePreview && (
              <div className="relative w-fit">
                <img src={imagePreview} alt="preview" className="max-h-28 rounded-xl border border-fifa-gold/30" />
                <button
                  type="button"
                  onClick={() => setImagePreview(null)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400 transition-colors"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            )}
            <div className="flex gap-2">
              {/* Hidden file input */}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
              {/* Image button */}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="px-3 py-2.5 bg-fifa-darker border border-fifa-border rounded-xl text-gray-400 hover:text-fifa-gold hover:border-fifa-gold/50 transition-all shrink-0"
              >
                <ImagePlus className="w-4 h-4" />
              </button>
              <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder={imagePreview ? 'Añade un texto (opcional)...' : 'Escribe un mensaje...'}
                maxLength={300}
                className="flex-1 bg-fifa-darker border border-fifa-border rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-fifa-gold"
              />
              <button
                type="submit"
                disabled={(!text.trim() && !imagePreview) || sending}
                className="px-4 py-2.5 bg-gradient-to-r from-fifa-gold to-yellow-400 text-black rounded-xl hover:from-yellow-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
              >
                {sending ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Full-screen image viewer */}
      {expandedImg && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setExpandedImg(null)}
        >
          <button className="absolute top-4 right-4 text-white hover:text-gray-300">
            <X className="w-8 h-8" />
          </button>
          <img src={expandedImg} alt="imagen ampliada" className="max-w-full max-h-full rounded-xl object-contain" />
        </div>
      )}
    </div>
  )
}

// ── MEETUP POSTS ─────────────────────────────────────────────────────
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
      {post.fecha && <p className="text-xs text-fifa-gold font-medium">📅 {post.fecha}</p>}
      {post.mensaje && <p className="text-gray-300 text-sm">{post.mensaje}</p>}
      {post.contacto && (
        <p className="text-xs text-green-400 flex items-center gap-1.5">
          <Phone className="w-3 h-3" />{post.contacto}
        </p>
      )}
      <div className="flex items-center gap-1.5 pt-1">
        <div className="w-5 h-5 rounded-full bg-fifa-navy flex items-center justify-center text-[10px]">
          {post.autorNombre?.[0]?.toUpperCase() || '?'}
        </div>
        <span className="text-xs text-gray-600">{post.autorNombre || 'Anónimo'}</span>
      </div>
    </div>
  )
}

function NewPostForm({ onClose, onSubmit }) {
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
    } catch {}
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
          <input value={fecha} onChange={e => setFecha(e.target.value)} placeholder="ej. Sábado 14 de junio, 3:00pm" maxLength={80}
            className="w-full bg-fifa-darker border border-fifa-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-fifa-gold" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Mensaje adicional</label>
          <textarea value={mensaje} onChange={e => setMensaje(e.target.value)} placeholder="ej. Tengo repetidos de Argentina, Brasil y España." maxLength={250} rows={3}
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
      <p className="text-[10px] text-gray-700 mt-3 text-center">Tu publicación será revisada por el creador antes de aparecer.</p>
    </div>
  )
}

// ── MÓDULO PRINCIPAL ──────────────────────────────────────────────────
export default function CommunityModule() {
  const [uid, setUid] = useState(null)
  const [bannedUids, setBannedUids] = useState({})
  const [activeTab, setActiveTab] = useState('chat')
  const [selectedCountry, setSelectedCountry] = useState('col')
  const [selectedCity, setSelectedCity] = useState('')
  const [posts, setPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) return
    signInAnonymously(auth).then(c => setUid(c.user.uid)).catch(() => {})
  }, [])

  useEffect(() => {
    if (!isFirebaseConfigured || !db) return
    const unsub = onValue(ref(db, 'banned'), snap => {
      setBannedUids(snap.val() || {})
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (!isFirebaseConfigured || !db || !selectedCountry || !selectedCity) { setPosts([]); return }
    setLoadingPosts(true)
    const path = `community/${selectedCountry}/${selectedCity.replace(/\s+/g, '_')}/posts`
    const unsub = onValue(ref(db, path), snap => {
      const data = snap.val() || {}
      const list = Object.entries(data)
        .map(([id, p]) => ({ id, ...p }))
        .filter(p => p.approved)
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
      setPosts(list)
      setLoadingPosts(false)
    })
    return () => unsub()
  }, [selectedCountry, selectedCity])

  const handleSubmit = useCallback(async (data) => {
    if (!isFirebaseConfigured || !db || !uid) return
    const path = `community/${selectedCountry}/${selectedCity.replace(/\s+/g, '_')}/posts`
    await push(ref(db, path), { ...data, approved: false, uid, createdAt: serverTimestamp() })
  }, [selectedCountry, selectedCity, uid])

  const country = CITIES_BY_COUNTRY[selectedCountry]
  const allCountries = [
    ...LATAM_COUNTRY_IDS.filter(id => CITIES_BY_COUNTRY[id]),
    ...Object.keys(CITIES_BY_COUNTRY).filter(id => !LATAM_COUNTRY_IDS.includes(id) && CITIES_BY_COUNTRY[id]?.cities),
  ]
  const filteredCities = (country?.cities || []).filter(c => c.toLowerCase().includes(search.toLowerCase()))

  if (!isFirebaseConfigured) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="font-display text-4xl text-gradient-gold tracking-wider mb-6">COMUNIDAD</h1>
        <div className="bg-fifa-card border border-dashed border-fifa-border rounded-2xl p-8 text-center max-w-xl mx-auto">
          <MessageCircle className="w-14 h-14 text-gray-700 mx-auto mb-4" />
          <h3 className="font-display text-2xl text-white mb-2">Chat Comunitario en Configuración</h3>
          <p className="text-gray-400 text-sm mb-4">Para activar la comunidad necesitas conectar Firebase.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-5">
        <h1 className="font-display text-4xl text-gradient-gold tracking-wider">COMUNIDAD</h1>
        <p className="text-gray-500 text-sm mt-1">Chat en tiempo real · Puntos de intercambio por ciudad</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-fifa-card border border-fifa-border rounded-xl p-1 w-fit mb-6">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'chat' ? 'bg-fifa-gold text-black' : 'text-gray-400 hover:text-white'}`}
        >
          <MessageCircle className="w-4 h-4" /> Chat Global
        </button>
        <button
          onClick={() => setActiveTab('meetups')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'meetups' ? 'bg-fifa-gold text-black' : 'text-gray-400 hover:text-white'}`}
        >
          <MapPin className="w-4 h-4" /> Intercambios
        </button>
      </div>

      {activeTab === 'chat' && (
        <GlobalChat uid={uid} bannedUids={bannedUids} />
      )}

      {activeTab === 'meetups' && (
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-fifa-card border border-fifa-border rounded-2xl overflow-hidden sticky top-20">
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
              <div className="p-3 border-b border-fifa-border">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
                  <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar ciudad..."
                    className="w-full bg-fifa-darker border border-fifa-border rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-gray-700 focus:outline-none focus:border-fifa-gold" />
                </div>
              </div>
              <div className="overflow-y-auto max-h-96">
                {filteredCities.map(city => (
                  <button key={city} onClick={() => { setSelectedCity(city); setShowForm(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-all flex items-center justify-between ${
                      selectedCity === city ? 'bg-fifa-gold/10 text-fifa-gold border-r-2 border-fifa-gold' : 'text-gray-400 hover:text-white hover:bg-fifa-darker'
                    }`}>
                    <span>{city}</span>
                    {selectedCity === city && <MapPin className="w-3.5 h-3.5" />}
                  </button>
                ))}
                {filteredCities.length === 0 && <p className="text-xs text-gray-700 text-center py-6">Sin ciudades</p>}
              </div>
            </div>
          </div>

          {/* Panel */}
          <div className="flex-1 min-w-0">
            {!selectedCity ? (
              <div className="bg-fifa-card border border-dashed border-fifa-border rounded-2xl p-12 text-center">
                <MapPin className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500">Selecciona una ciudad para ver los puntos de intercambio</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div>
                    <h2 className="font-display text-2xl text-white tracking-wide">{country?.flag} {selectedCity}</h2>
                    <p className="text-gray-500 text-xs mt-0.5">{country?.name} · Intercambio de láminas</p>
                  </div>
                  {!showForm && (
                    <button onClick={() => setShowForm(true)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-fifa-gold to-yellow-400 text-black text-sm font-bold rounded-xl hover:from-yellow-300 transition-all shadow-lg shadow-yellow-500/20">
                      <Plus className="w-4 h-4" /> Proponer punto
                    </button>
                  )}
                </div>
                {showForm && (
                  <div className="mb-5">
                    <NewPostForm onClose={() => setShowForm(false)} onSubmit={handleSubmit} />
                  </div>
                )}
                {loadingPosts ? (
                  <div className="text-center py-12"><Loader className="w-8 h-8 text-fifa-gold animate-spin mx-auto mb-2" /></div>
                ) : posts.length === 0 ? (
                  <div className="bg-fifa-card border border-dashed border-fifa-border rounded-2xl p-10 text-center">
                    <MessageCircle className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm mb-1">Aún no hay puntos en {selectedCity}</p>
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
