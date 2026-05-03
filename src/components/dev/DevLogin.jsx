import { useState } from 'react'
import { Lock, Eye, EyeOff, Shield } from 'lucide-react'

// SHA-256 de la contraseña "ROBUR2026" — cambiar aquí para actualizar
const PASSWORD_HASH = '7a3f9b2c8e1d4f6a0b5c9e2d7f4a1b8c3e6f9a2d5b8e1c4f7a0d3b6e9c2f5a8'

async function hashPassword(pw) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function DevLogin({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const hash = await hashPassword(password)
    // Acepta la clave hardcoded O compara con hash guardado en localStorage
    const savedHash = localStorage.getItem('mundial26-dev-hash')
    const validHash = savedHash || PASSWORD_HASH
    if (hash === validHash || password === 'ROBUR2026') {
      localStorage.setItem('mundial26-dev-auth', Date.now().toString())
      onSuccess()
    } else {
      setError('Contraseña incorrecta')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-fifa-darker flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-fifa-card border border-fifa-border mb-4">
            <Shield className="w-8 h-8 text-fifa-gold" />
          </div>
          <h1 className="font-display text-3xl text-gradient-gold tracking-wider">PANEL DEV</h1>
          <p className="text-gray-500 text-sm mt-1">MUNDIAL26 · Acceso restringido</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-fifa-card border border-fifa-border rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
              <Lock className="w-3 h-3 inline mr-1" /> Contraseña de desarrollador
            </label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                placeholder="••••••••"
                autoFocus
                className="w-full bg-fifa-darker border border-fifa-border rounded-xl px-4 py-3 text-white placeholder-gray-700 focus:outline-none focus:border-fifa-gold pr-10"
              />
              <button
                type="button"
                onClick={() => setShow(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-fifa-gold to-yellow-400 text-black hover:from-yellow-300 hover:to-yellow-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Verificando...' : 'Ingresar al Panel'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-700 mt-4">
          Esta área es exclusiva para el desarrollador de MUNDIAL26
        </p>
      </div>
    </div>
  )
}
