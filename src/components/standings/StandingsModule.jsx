import { useState, useMemo, useCallback } from 'react'
import { Trophy, ChevronDown, ChevronUp, Edit3, Check, X, RotateCcw, TrendingUp } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import {
  createEmptyStandings, computeStandings, applyMatchResult,
  createEmptyBracket,
} from '../../data/standings'
import { MATCHES } from '../../data/partidos'
import { COUNTRIES, GROUP_COLORS } from '../../data/countries'

const FLAG_MAP = Object.fromEntries(COUNTRIES.map(c => [c.name, c.flag]))

const GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L']

export default function StandingsModule() {
  const [standings, setStandings] = useLocalStorage('mundial26-standings', createEmptyStandings())
  const [bracket, setBracket] = useLocalStorage('mundial26-bracket', createEmptyBracket())
  const [activeGroup, setActiveGroup] = useState('A')
  const [editingMatch, setEditingMatch] = useState(null) // { matchId, homeGoals, awayGoals }
  const [tab, setTab] = useState('groups') // groups | bracket | input

  const sorted = useMemo(() => computeStandings(standings), [standings])

  const groupMatches = useMemo(() =>
    MATCHES.filter(m => m.phase === 'Grupos' && m.group === activeGroup),
    [activeGroup]
  )

  const handleReset = () => {
    if (window.confirm('¿Resetear todas las tablas de posiciones?')) {
      setStandings(createEmptyStandings())
      setBracket(createEmptyBracket())
    }
  }

  const handleSaveResult = useCallback((match, hg, ag) => {
    if (hg === '' || ag === '' || hg === null || ag === null) return
    setStandings(prev => applyMatchResult(prev, match.group, match.home, match.away, Number(hg), Number(ag)))
    setEditingMatch(null)
  }, [setStandings])

  // advance bracket winner
  const handleBracketResult = useCallback((round, idx, hg, ag) => {
    setBracket(prev => {
      const updated = JSON.parse(JSON.stringify(prev))
      updated[round][idx].homeGoals = hg
      updated[round][idx].awayGoals = ag
      return updated
    })
  }, [setBracket])

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="font-display text-4xl text-gradient-gold tracking-wider">
            TABLAS DE POSICIONES
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Ingresa resultados · Se actualiza en tiempo real · Datos guardados localmente
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-xs text-gray-600 hover:text-red-400 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Resetear todo
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 bg-fifa-card border border-fifa-border rounded-xl p-1 mb-6 w-fit">
        {[
          { key: 'groups',  label: 'Fase de Grupos' },
          { key: 'input',   label: 'Cargar Resultados' },
          { key: 'bracket', label: 'Eliminatorias' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t.key ? 'tab-active' : 'tab-inactive'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: GRUPOS ─────────────────────────────────────── */}
      {tab === 'groups' && (
        <div>
          {/* Group selector */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {GROUPS.map(g => (
              <button key={g} onClick={() => setActiveGroup(g)}
                className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                  activeGroup === g ? 'bg-fifa-gold text-black' : 'bg-fifa-card border border-fifa-border text-gray-400 hover:text-white'
                }`}>
                {g}
              </button>
            ))}
          </div>

          <StandingTable group={activeGroup} teams={sorted[activeGroup] || []} />
        </div>
      )}

      {/* ── TAB: CARGAR RESULTADOS ──────────────────────────── */}
      {tab === 'input' && (
        <div className="space-y-6">
          {/* Group selector */}
          <div className="flex flex-wrap gap-1.5">
            {GROUPS.map(g => (
              <button key={g} onClick={() => setActiveGroup(g)}
                className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${
                  activeGroup === g ? 'bg-fifa-gold text-black' : 'bg-fifa-card border border-fifa-border text-gray-400 hover:text-white'
                }`}>
                {g}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {groupMatches.map(match => (
              <MatchResultRow
                key={match.id}
                match={match}
                onSave={(hg, ag) => handleSaveResult(match, hg, ag)}
              />
            ))}
          </div>

          {/* All groups quick view */}
          <div className="mt-8">
            <h3 className="font-display text-xl text-gradient-gold mb-4 tracking-wider">
              TODOS LOS GRUPOS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {GROUPS.map(g => (
                <MiniTable key={g} group={g} teams={sorted[g] || []} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: ELIMINATORIAS ──────────────────────────────── */}
      {tab === 'bracket' && (
        <BracketView bracket={bracket} onUpdate={handleBracketResult} />
      )}
    </div>
  )
}

// ── Tabla de posiciones de un grupo ─────────────────────────────────────────
function StandingTable({ group, teams }) {
  const gc = GROUP_COLORS[group] || 'bg-gray-600'
  return (
    <div className="card overflow-hidden">
      <div className={`${gc} px-4 py-2 flex items-center gap-2`}>
        <Trophy className="w-4 h-4 text-white/80" />
        <span className="font-display text-lg text-white tracking-wider">GRUPO {group}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-fifa-border text-xs text-gray-500 uppercase">
              <th className="text-left px-4 py-2 w-6">#</th>
              <th className="text-left px-4 py-2">Equipo</th>
              <th className="text-center px-2 py-2">PJ</th>
              <th className="text-center px-2 py-2">G</th>
              <th className="text-center px-2 py-2">E</th>
              <th className="text-center px-2 py-2">P</th>
              <th className="text-center px-2 py-2">GF</th>
              <th className="text-center px-2 py-2">GC</th>
              <th className="text-center px-2 py-2">DG</th>
              <th className="text-center px-3 py-2 font-bold text-white">PTS</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => {
              const flag = FLAG_MAP[team.name] || '🏳'
              const qualified = idx < 2
              const thirdPlace = idx === 2
              return (
                <tr key={team.name}
                  className={`border-b border-fifa-border/50 transition-colors hover:bg-fifa-card2 ${
                    qualified ? 'bg-green-900/5' : ''
                  }`}>
                  <td className="px-4 py-2.5">
                    <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                      qualified ? 'bg-green-600 text-white' : thirdPlace ? 'bg-yellow-600/50 text-yellow-300' : 'bg-fifa-border text-gray-500'
                    }`}>{idx + 1}</span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg leading-none">{flag}</span>
                      <span className={`font-semibold ${qualified ? 'text-white' : 'text-gray-300'}`}>
                        {team.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-center px-2 py-2.5 text-gray-400">{team.pj}</td>
                  <td className="text-center px-2 py-2.5 text-green-400">{team.pg}</td>
                  <td className="text-center px-2 py-2.5 text-gray-400">{team.pe}</td>
                  <td className="text-center px-2 py-2.5 text-red-400">{team.pp}</td>
                  <td className="text-center px-2 py-2.5 text-gray-300">{team.gf}</td>
                  <td className="text-center px-2 py-2.5 text-gray-500">{team.gc}</td>
                  <td className={`text-center px-2 py-2.5 font-semibold ${team.dg > 0 ? 'text-green-400' : team.dg < 0 ? 'text-red-400' : 'text-gray-500'}`}>
                    {team.dg > 0 ? '+' : ''}{team.dg}
                  </td>
                  <td className="text-center px-3 py-2.5">
                    <span className="font-display text-lg text-fifa-gold">{team.pts}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-3 px-4 py-2 border-t border-fifa-border/50 text-xs text-gray-600">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-600 inline-block"/>Clasificados</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-600/50 inline-block"/>Posible mejor 3°</span>
      </div>
    </div>
  )
}

// ── Mini tabla para vista compacta ───────────────────────────────────────────
function MiniTable({ group, teams }) {
  const gc = GROUP_COLORS[group] || 'bg-gray-600'
  return (
    <div className="card overflow-hidden">
      <div className={`${gc} px-3 py-1.5`}>
        <span className="font-display text-base text-white tracking-wider">GRUPO {group}</span>
      </div>
      <table className="w-full text-xs">
        <tbody>
          {teams.map((t, i) => (
            <tr key={t.name} className={`border-b border-fifa-border/30 ${i < 2 ? 'bg-green-900/5' : ''}`}>
              <td className="pl-3 pr-1 py-1.5 text-gray-500 w-5">{i+1}</td>
              <td className="py-1.5 pr-2">
                <span className="mr-1">{FLAG_MAP[t.name] || '🏳'}</span>
                <span className={`font-medium ${i < 2 ? 'text-white' : 'text-gray-400'}`}>{t.name}</span>
              </td>
              <td className="text-center py-1.5 text-gray-500 w-7">{t.pj}</td>
              <td className="text-center py-1.5 text-gray-400 w-10">{t.gf}-{t.gc}</td>
              <td className="text-center pr-3 py-1.5 w-8">
                <span className="font-bold text-fifa-gold">{t.pts}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Fila para ingresar resultado de un partido ───────────────────────────────
function MatchResultRow({ match, onSave }) {
  const [hg, setHg] = useState('')
  const [ag, setAg] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (hg === '' || ag === '') return
    onSave(hg, ag)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const flagH = FLAG_MAP[match.home] || '🏳'
  const flagA = FLAG_MAP[match.away] || '🏳'

  return (
    <div className={`card p-3 flex items-center gap-3 flex-wrap transition-all ${saved ? 'border-green-500/50' : ''}`}>
      {/* Partido # */}
      <span className="text-xs text-gray-600 w-14 flex-shrink-0">P#{match.id}</span>

      {/* Home */}
      <div className="flex items-center gap-1.5 flex-1 min-w-[100px] justify-end">
        <span className="text-sm font-semibold text-white text-right truncate">{match.home}</span>
        <span className="text-xl leading-none">{flagH}</span>
      </div>

      {/* Score inputs */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <input
          type="number" min="0" max="20" value={hg}
          onChange={e => setHg(e.target.value)}
          className="w-10 h-8 text-center bg-fifa-darker border border-fifa-border rounded text-white font-bold text-sm focus:outline-none focus:border-fifa-gold"
        />
        <span className="text-gray-500 font-bold">–</span>
        <input
          type="number" min="0" max="20" value={ag}
          onChange={e => setAg(e.target.value)}
          className="w-10 h-8 text-center bg-fifa-darker border border-fifa-border rounded text-white font-bold text-sm focus:outline-none focus:border-fifa-gold"
        />
      </div>

      {/* Away */}
      <div className="flex items-center gap-1.5 flex-1 min-w-[100px]">
        <span className="text-xl leading-none">{flagA}</span>
        <span className="text-sm font-semibold text-white truncate">{match.away}</span>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={hg === '' || ag === ''}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex-shrink-0 ${
          saved ? 'bg-green-600 text-white' :
          'bg-fifa-gold text-black hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed'
        }`}
      >
        <Check className="w-3.5 h-3.5" />
        {saved ? 'Guardado' : 'Guardar'}
      </button>
    </div>
  )
}

// ── Vista de eliminatorias ───────────────────────────────────────────────────
function BracketView({ bracket, onUpdate }) {
  const rounds = [
    { key: 'r32',   label: 'Ronda de 32', cols: 4 },
    { key: 'r16',   label: 'Octavos',     cols: 4 },
    { key: 'qf',    label: 'Cuartos',     cols: 2 },
    { key: 'sf',    label: 'Semis',       cols: 2 },
    { key: 'final', label: 'Final',       cols: 1 },
  ]

  return (
    <div className="space-y-8">
      {rounds.map(round => (
        <div key={round.key}>
          <h3 className="font-display text-xl text-gradient-gold mb-3 tracking-wider">
            {round.label}
          </h3>
          <div className={`grid gap-3 grid-cols-1 sm:grid-cols-2 ${round.cols >= 4 ? 'lg:grid-cols-4' : round.cols === 2 ? 'lg:grid-cols-2' : 'max-w-sm'}`}>
            {(bracket[round.key] || []).map((match, idx) => (
              <BracketMatchCard
                key={match.id}
                match={match}
                onUpdate={(hg, ag) => onUpdate(round.key, idx, hg, ag)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function BracketMatchCard({ match, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [hg, setHg] = useState(match.homeGoals ?? '')
  const [ag, setAg] = useState(match.awayGoals ?? '')

  const hasResult = match.homeGoals !== null && match.awayGoals !== null
  const homeWins = hasResult && match.homeGoals > match.awayGoals
  const awayWins = hasResult && match.awayGoals > match.homeGoals

  const save = () => {
    if (hg === '' || ag === '') return
    onUpdate(Number(hg), Number(ag))
    setEditing(false)
  }

  return (
    <div className="card p-3">
      <div className="text-xs text-gray-600 mb-2 flex justify-between">
        <span>Partido #{match.id}</span>
        {!editing && (
          <button onClick={() => setEditing(true)} className="hover:text-fifa-gold transition-colors">
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="space-y-2">
        {[
          { team: match.home, goals: match.homeGoals, wins: homeWins },
          { team: match.away, goals: match.awayGoals, wins: awayWins },
        ].map(({ team, goals, wins }, i) => {
          const flag = FLAG_MAP[team || ''] || '🏳'
          return (
            <div key={i} className={`flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg ${wins ? 'bg-green-900/20 border border-green-600/30' : 'bg-fifa-darker'}`}>
              <div className="flex items-center gap-1.5 min-w-0">
                {team && <span className="text-base leading-none">{flag}</span>}
                <span className={`text-xs font-semibold truncate ${team ? 'text-white' : 'text-gray-600 italic'}`}>
                  {team || 'Por definir'}
                </span>
              </div>
              <span className={`font-display text-lg flex-shrink-0 ${wins ? 'text-green-400' : goals !== null ? 'text-white' : 'text-gray-700'}`}>
                {goals !== null ? goals : '–'}
              </span>
            </div>
          )
        })}
      </div>

      {editing && (
        <div className="mt-2 flex items-center gap-1.5 justify-center border-t border-fifa-border pt-2">
          <input type="number" min="0" value={hg} onChange={e => setHg(e.target.value)}
            className="w-10 h-7 text-center bg-fifa-darker border border-fifa-border rounded text-white text-sm focus:outline-none focus:border-fifa-gold" />
          <span className="text-gray-500">–</span>
          <input type="number" min="0" value={ag} onChange={e => setAg(e.target.value)}
            className="w-10 h-7 text-center bg-fifa-darker border border-fifa-border rounded text-white text-sm focus:outline-none focus:border-fifa-gold" />
          <button onClick={save} className="bg-green-600 hover:bg-green-500 text-white rounded px-2 py-1 ml-1">
            <Check className="w-3 h-3" />
          </button>
          <button onClick={() => setEditing(false)} className="text-gray-600 hover:text-gray-400 px-1">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}
