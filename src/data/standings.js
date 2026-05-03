// Estructura de posiciones para los 12 grupos
// Se inicializa desde localStorage y se actualiza manualmente por el usuario

export function createEmptyStandings() {
  const groups = {}
  const groupTeams = {
    A: ['México','Sudáfrica','Corea del Sur','República Checa'],
    B: ['Canadá','Bosnia y Herzegovina','Catar','Suiza'],
    C: ['Brasil','Marruecos','Haití','Escocia'],
    D: ['Estados Unidos','Paraguay','Australia','Turquía'],
    E: ['Alemania','Curazao','Costa de Marfil','Ecuador'],
    F: ['Países Bajos','Japón','Suecia','Túnez'],
    G: ['Bélgica','Egipto','Irán','Nueva Zelanda'],
    H: ['España','Cabo Verde','Arabia Saudí','Uruguay'],
    I: ['Francia','Senegal','Irak','Noruega'],
    J: ['Argentina','Argelia','Austria','Jordania'],
    K: ['Portugal','RD Congo','Uzbekistán','Colombia'],
    L: ['Inglaterra','Croacia','Ghana','Panamá'],
  }

  Object.entries(groupTeams).forEach(([group, teams]) => {
    groups[group] = teams.map(name => ({
      name,
      pj: 0, // Partidos jugados
      pg: 0, // Ganados
      pe: 0, // Empatados
      pp: 0, // Perdidos
      gf: 0, // Goles a favor
      gc: 0, // Goles en contra
      pts: 0,// Puntos
    }))
  })
  return groups
}

export function computeStandings(standings) {
  const result = {}
  Object.entries(standings).forEach(([group, teams]) => {
    result[group] = [...teams]
      .map(t => ({ ...t, dg: t.gf - t.gc })) // diferencia de goles
      .sort((a, b) =>
        b.pts - a.pts ||
        b.dg  - a.dg  ||
        b.gf  - a.gf  ||
        a.name.localeCompare(b.name)
      )
  })
  return result
}

export function applyMatchResult(standings, group, homeTeam, awayTeam, homeGoals, awayGoals) {
  const updated = JSON.parse(JSON.stringify(standings))
  const grp = updated[group]
  if (!grp) return standings

  const home = grp.find(t => t.name === homeTeam)
  const away = grp.find(t => t.name === awayTeam)
  if (!home || !away) return standings

  home.pj++; away.pj++
  home.gf += homeGoals; home.gc += awayGoals
  away.gf += awayGoals; away.gc += homeGoals

  if (homeGoals > awayGoals) {
    home.pg++; away.pp++
    home.pts += 3
  } else if (homeGoals === awayGoals) {
    home.pe++; away.pe++
    home.pts++; away.pts++
  } else {
    away.pg++; home.pp++
    away.pts += 3
  }
  return updated
}

// Tablas de avance en eliminatorias
export const ROUND_NAMES = {
  r32:  'Ronda de 32',
  r16:  'Octavos de Final',
  qf:   'Cuartos de Final',
  sf:   'Semifinal',
  tp:   'Tercer Puesto',
  final:'Final',
}

export function createEmptyBracket() {
  return {
    r32:   Array(16).fill(null).map((_,i) => ({ id: i+73,  home: null, away: null, homeGoals: null, awayGoals: null })),
    r16:   Array(8).fill(null).map((_,i)  => ({ id: i+89,  home: null, away: null, homeGoals: null, awayGoals: null })),
    qf:    Array(4).fill(null).map((_,i)  => ({ id: i+97,  home: null, away: null, homeGoals: null, awayGoals: null })),
    sf:    Array(2).fill(null).map((_,i)  => ({ id: i+101, home: null, away: null, homeGoals: null, awayGoals: null })),
    tp:    [{ id: 103, home: null, away: null, homeGoals: null, awayGoals: null }],
    final: [{ id: 104, home: null, away: null, homeGoals: null, awayGoals: null }],
  }
}
