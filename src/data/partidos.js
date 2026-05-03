// Calendario Oficial FIFA World Cup 2026
// Fuente: fifa.com — Sorteo diciembre 2025
// Todos los horarios en UTC. Hora local de sede = UTC + offset de venue.
// EDT (verano USA Este) = UTC-4, CDT (verano USA Centro/México) = UTC-5, PDT (verano USA/Vancouver Pacífico) = UTC-7

export const VENUES = {
  azteca:   { name: 'Estadio Azteca (Banorte)', city: 'Ciudad de México', country: 'México',  tz: 'CDT', offset: -5 },
  bbva:     { name: 'Estadio BBVA',             city: 'Monterrey',        country: 'México',  tz: 'CDT', offset: -5 },
  akron:    { name: 'Estadio Akron',            city: 'Guadalajara',      country: 'México',  tz: 'CDT', offset: -5 },
  bmo:      { name: 'BMO Field',                city: 'Toronto',          country: 'Canadá',  tz: 'EDT', offset: -4 },
  bcplace:  { name: 'BC Place',                 city: 'Vancouver',        country: 'Canadá',  tz: 'PDT', offset: -7 },
  metlife:  { name: 'MetLife Stadium',          city: 'E. Rutherford (NY/NJ)', country: 'USA', tz: 'EDT', offset: -4 },
  attdallas:{ name: 'AT&T Stadium',             city: 'Arlington (Dallas)',country: 'USA',    tz: 'CDT', offset: -5 },
  sofi:     { name: 'SoFi Stadium',             city: 'Inglewood (Los Ángeles)', country: 'USA', tz: 'PDT', offset: -7 },
  levis:    { name: "Levi's Stadium",           city: 'Santa Clara (San Francisco)', country: 'USA', tz: 'PDT', offset: -7 },
  hardrock: { name: 'Hard Rock Stadium',        city: 'Miami',            country: 'USA',    tz: 'EDT', offset: -4 },
  arrowhead:{ name: 'Arrowhead Stadium',        city: 'Kansas City',      country: 'USA',    tz: 'CDT', offset: -5 },
  lincoln:  { name: 'Lincoln Financial Field',  city: 'Filadelfia',       country: 'USA',    tz: 'EDT', offset: -4 },
  gillette: { name: 'Gillette Stadium',         city: 'Foxborough (Boston)', country: 'USA', tz: 'EDT', offset: -4 },
  lumen:    { name: 'Lumen Field',              city: 'Seattle',          country: 'USA',    tz: 'PDT', offset: -7 },
  nrg:      { name: 'NRG Stadium',              city: 'Houston',          country: 'USA',    tz: 'CDT', offset: -5 },
  atlanta:  { name: 'Mercedes-Benz Stadium',    city: 'Atlanta',          country: 'USA',    tz: 'EDT', offset: -4 },
}

// Zonas horarias LATAM (sin DST en junio-julio)
export const LATAM_ZONES = [
  { id: 'mx', country: '🇲🇽 México',     offset: -5, label: 'CDT' },
  { id: 'co', country: '🇨🇴 Colombia',   offset: -5, label: 'COT' },
  { id: 'ec', country: '🇪🇨 Ecuador',    offset: -5, label: 'ECT' },
  { id: 'pe', country: '🇵🇪 Perú',       offset: -5, label: 'PET' },
  { id: 've', country: '🇻🇪 Venezuela',  offset: -4, label: 'VET' },
  { id: 'bo', country: '🇧🇴 Bolivia',    offset: -4, label: 'BOT' },
  { id: 'cl', country: '🇨🇱 Chile',      offset: -4, label: 'CLT' },
  { id: 'py', country: '🇵🇾 Paraguay',   offset: -4, label: 'PYT' },
  { id: 'ar', country: '🇦🇷 Argentina',  offset: -3, label: 'ART' },
  { id: 'uy', country: '🇺🇾 Uruguay',    offset: -3, label: 'UYT' },
  { id: 'br', country: '🇧🇷 Brasil',     offset: -3, label: 'BRT' },
]

// Canales de TV por país LATAM
export const TV_CHANNELS = {
  mx: ['Televisa / Canal 5', 'TV Azteca / Azteca 7', 'TUDN', 'ViX+'],
  co: ['Caracol TV', 'RCN', 'Win Sports', 'ESPN'],
  ec: ['Teleamazonas', 'TC Televisión', 'GolTV (Canal del Fútbol)', 'DirecTV Sports'],
  pe: ['América TV', 'Movistar Deportes', 'ATV', 'DirecTV Sports'],
  ve: ['Venevisión', 'Televen', 'SimpleTV', 'DirecTV Sports'],
  bo: ['Bolivia TV', 'Tigo Sports', 'DirecTV Sports'],
  ar: ['TyC Sports', 'TV Pública', 'TNT Sports', 'DirecTV Sports'],
  uy: ['Tenfield', 'Canal 10', 'VTV', 'DirecTV Sports'],
  br: ['TV Globo', 'SporTV', 'CazéTV (YouTube)', 'Globoplay'],
  cl: ['TVN', 'Canal 13', 'TNT Sports Chile', 'DirecTV Sports'],
  py: ['Telefuturo', 'RPC', 'Tigo Sports', 'DirecTV Sports'],
}

export function formatLocalTime(dateUTC, offsetHours) {
  const localMs = new Date(dateUTC).getTime() + offsetHours * 3600000
  const d = new Date(localMs)
  return `${String(d.getUTCHours()).padStart(2,'0')}:${String(d.getUTCMinutes()).padStart(2,'0')}`
}

export function formatLocalDateFull(dateUTC, offsetHours) {
  const localMs = new Date(dateUTC).getTime() + offsetHours * 3600000
  const d = new Date(localMs)
  const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
  const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
  return `${days[d.getUTCDay()]} ${d.getUTCDate()} ${months[d.getUTCMonth()]}`
}

export function toLocalDate(dateUTC, offsetHours) {
  const localMs = new Date(dateUTC).getTime() + offsetHours * 3600000
  return new Date(localMs).toISOString().slice(0, 10)
}

function m(id, phase, group, home, away, dateUTC, venueKey) {
  return { id, phase, group, home, away, dateUTC, venue: VENUES[venueKey] }
}

const TBD = 'Por definir'

// ════════════════════════════════════════════════════════════
//  FASE DE GRUPOS  (72 partidos — jun 11-27)
//  Horarios ET → UTC: sumar 4h (EDT, hora de verano USA este)
//  Ejemplo: 15:00 ET = 19:00 UTC
//  Nota: partidos de 20h/21h/22h/23h ET cruzan medianoche UTC
// ════════════════════════════════════════════════════════════

export const MATCHES = [

  // ── JORNADA 1 (Jun 11-17) ────────────────────────────────────────

  // Jueves 11 Jun
  m(1,  'Grupos','A','México','Sudáfrica',              '2026-06-11T19:00Z','azteca'),
  m(2,  'Grupos','A','Corea del Sur','República Checa', '2026-06-12T02:00Z','akron'),

  // Viernes 12 Jun
  m(3,  'Grupos','B','Canadá','Bosnia y Herzegovina',   '2026-06-12T19:00Z','bmo'),
  m(4,  'Grupos','D','Estados Unidos','Paraguay',        '2026-06-13T01:00Z','sofi'),

  // Sábado 13 Jun
  m(5,  'Grupos','B','Catar','Suiza',                   '2026-06-13T19:00Z','levis'),
  m(6,  'Grupos','C','Brasil','Marruecos',              '2026-06-13T22:00Z','metlife'),
  m(7,  'Grupos','C','Haití','Escocia',                 '2026-06-14T01:00Z','gillette'),
  m(8,  'Grupos','D','Australia','Turquía',             '2026-06-14T04:00Z','bcplace'),

  // Domingo 14 Jun
  m(9,  'Grupos','E','Alemania','Curazao',              '2026-06-14T17:00Z','nrg'),
  m(10, 'Grupos','F','Países Bajos','Japón',            '2026-06-14T20:00Z','attdallas'),
  m(11, 'Grupos','E','Costa de Marfil','Ecuador',       '2026-06-14T23:00Z','lincoln'),
  m(12, 'Grupos','F','Suecia','Túnez',                  '2026-06-15T04:00Z','bbva'),

  // Lunes 15 Jun
  m(13, 'Grupos','H','España','Cabo Verde',             '2026-06-15T16:00Z','atlanta'),
  m(14, 'Grupos','G','Bélgica','Egipto',                '2026-06-15T19:00Z','lumen'),
  m(15, 'Grupos','H','Arabia Saudí','Uruguay',          '2026-06-15T22:00Z','hardrock'),
  m(16, 'Grupos','G','Irán','Nueva Zelanda',            '2026-06-16T01:00Z','sofi'),

  // Martes 16 Jun
  m(17, 'Grupos','I','Francia','Senegal',               '2026-06-16T19:00Z','metlife'),
  m(18, 'Grupos','I','Irak','Noruega',                  '2026-06-16T22:00Z','gillette'),
  m(19, 'Grupos','J','Argentina','Argelia',             '2026-06-17T01:00Z','arrowhead'),
  m(20, 'Grupos','J','Austria','Jordania',              '2026-06-17T04:00Z','levis'),

  // Miércoles 17 Jun
  m(21, 'Grupos','K','Portugal','RD Congo',             '2026-06-17T17:00Z','nrg'),
  m(22, 'Grupos','L','Inglaterra','Croacia',            '2026-06-17T20:00Z','attdallas'),
  m(23, 'Grupos','L','Ghana','Panamá',                  '2026-06-17T23:00Z','bmo'),
  m(24, 'Grupos','K','Uzbekistán','Colombia',           '2026-06-18T02:00Z','azteca'),

  // ── JORNADA 2 (Jun 18-23) ────────────────────────────────────────

  // Jueves 18 Jun
  m(25, 'Grupos','A','República Checa','Sudáfrica',     '2026-06-18T16:00Z','atlanta'),
  m(26, 'Grupos','B','Suiza','Bosnia y Herzegovina',   '2026-06-18T19:00Z','sofi'),
  m(27, 'Grupos','B','Canadá','Catar',                  '2026-06-18T22:00Z','bcplace'),
  m(28, 'Grupos','A','México','Corea del Sur',          '2026-06-19T01:00Z','akron'),

  // Viernes 19 Jun
  m(29, 'Grupos','D','Estados Unidos','Australia',      '2026-06-19T19:00Z','lumen'),
  m(30, 'Grupos','C','Escocia','Marruecos',             '2026-06-19T22:00Z','gillette'),
  m(31, 'Grupos','C','Brasil','Haití',                  '2026-06-20T01:00Z','lincoln'),
  m(32, 'Grupos','D','Turquía','Paraguay',              '2026-06-20T04:00Z','levis'),

  // Sábado 20 Jun
  m(33, 'Grupos','F','Países Bajos','Suecia',           '2026-06-20T17:00Z','nrg'),
  m(34, 'Grupos','E','Alemania','Costa de Marfil',      '2026-06-20T20:00Z','bmo'),
  m(35, 'Grupos','E','Ecuador','Curazao',               '2026-06-21T02:00Z','arrowhead'),
  m(36, 'Grupos','F','Túnez','Japón',                   '2026-06-21T04:00Z','bbva'),

  // Domingo 21 Jun
  m(37, 'Grupos','H','España','Arabia Saudí',           '2026-06-21T16:00Z','atlanta'),
  m(38, 'Grupos','G','Bélgica','Irán',                  '2026-06-21T19:00Z','sofi'),
  m(39, 'Grupos','H','Uruguay','Cabo Verde',            '2026-06-21T22:00Z','hardrock'),
  m(40, 'Grupos','G','Nueva Zelanda','Egipto',          '2026-06-22T01:00Z','bcplace'),

  // Lunes 22 Jun
  m(41, 'Grupos','J','Argentina','Austria',             '2026-06-22T17:00Z','attdallas'),
  m(42, 'Grupos','I','Francia','Irak',                  '2026-06-22T21:00Z','lincoln'),
  m(43, 'Grupos','I','Noruega','Senegal',               '2026-06-23T00:00Z','metlife'),
  m(44, 'Grupos','J','Jordania','Argelia',              '2026-06-23T03:00Z','levis'),

  // Martes 23 Jun
  m(45, 'Grupos','K','Portugal','Uzbekistán',           '2026-06-23T17:00Z','nrg'),
  m(46, 'Grupos','L','Inglaterra','Ghana',              '2026-06-23T20:00Z','gillette'),
  m(47, 'Grupos','L','Panamá','Croacia',                '2026-06-23T23:00Z','bmo'),
  m(48, 'Grupos','K','Colombia','RD Congo',             '2026-06-24T02:00Z','akron'),

  // ── JORNADA 3 (Jun 24-27) — simultáneas por grupo ─────────────────

  // Miércoles 24 Jun — Grupos B y C
  m(49, 'Grupos','B','Suiza','Canadá',                  '2026-06-24T19:00Z','bcplace'),
  m(50, 'Grupos','B','Bosnia y Herzegovina','Catar',    '2026-06-24T19:00Z','lumen'),
  m(51, 'Grupos','C','Escocia','Brasil',                '2026-06-24T22:00Z','hardrock'),
  m(52, 'Grupos','C','Marruecos','Haití',               '2026-06-24T22:00Z','atlanta'),
  m(53, 'Grupos','A','República Checa','México',        '2026-06-25T01:00Z','azteca'),
  m(54, 'Grupos','A','Sudáfrica','Corea del Sur',       '2026-06-25T01:00Z','bbva'),

  // Jueves 25 Jun — Grupos D, E y F
  m(55, 'Grupos','E','Curazao','Costa de Marfil',       '2026-06-25T20:00Z','lincoln'),
  m(56, 'Grupos','E','Ecuador','Alemania',              '2026-06-25T20:00Z','metlife'),
  m(57, 'Grupos','F','Japón','Suecia',                  '2026-06-25T23:00Z','attdallas'),
  m(58, 'Grupos','F','Túnez','Países Bajos',            '2026-06-25T23:00Z','arrowhead'),
  m(59, 'Grupos','D','Turquía','Estados Unidos',        '2026-06-26T02:00Z','sofi'),
  m(60, 'Grupos','D','Paraguay','Australia',            '2026-06-26T02:00Z','levis'),

  // Viernes 26 Jun — Grupos G, H e I
  m(61, 'Grupos','I','Noruega','Francia',               '2026-06-26T19:00Z','gillette'),
  m(62, 'Grupos','I','Senegal','Irak',                  '2026-06-26T19:00Z','bmo'),
  m(63, 'Grupos','H','Cabo Verde','Arabia Saudí',       '2026-06-27T00:00Z','nrg'),
  m(64, 'Grupos','H','Uruguay','España',                '2026-06-27T00:00Z','akron'),
  m(65, 'Grupos','G','Egipto','Irán',                   '2026-06-27T03:00Z','lumen'),
  m(66, 'Grupos','G','Nueva Zelanda','Bélgica',         '2026-06-27T03:00Z','bcplace'),

  // Sábado 27 Jun — Grupos J, K y L
  m(67, 'Grupos','L','Panamá','Inglaterra',             '2026-06-27T21:00Z','metlife'),
  m(68, 'Grupos','L','Croacia','Ghana',                 '2026-06-27T21:00Z','lincoln'),
  m(69, 'Grupos','K','Colombia','Portugal',             '2026-06-27T23:30Z','hardrock'),
  m(70, 'Grupos','K','RD Congo','Uzbekistán',           '2026-06-27T23:30Z','atlanta'),
  m(71, 'Grupos','J','Argelia','Austria',               '2026-06-28T02:00Z','arrowhead'),
  m(72, 'Grupos','J','Jordania','Argentina',            '2026-06-28T02:00Z','attdallas'),

  // ════════════════════════════════════════════════════════════
  //  RONDA DE 32  (Jun 28 – Jul 3) — 16 partidos
  // ════════════════════════════════════════════════════════════
  m(73,  'Ronda de 32', null, TBD, TBD, '2026-06-28T19:00Z', 'metlife'),
  m(74,  'Ronda de 32', null, TBD, TBD, '2026-06-28T22:00Z', 'sofi'),
  m(75,  'Ronda de 32', null, TBD, TBD, '2026-06-29T19:00Z', 'hardrock'),
  m(76,  'Ronda de 32', null, TBD, TBD, '2026-06-29T22:00Z', 'attdallas'),
  m(77,  'Ronda de 32', null, TBD, TBD, '2026-06-30T19:00Z', 'gillette'),
  m(78,  'Ronda de 32', null, TBD, TBD, '2026-06-30T22:00Z', 'arrowhead'),
  m(79,  'Ronda de 32', null, TBD, TBD, '2026-07-01T19:00Z', 'lumen'),
  m(80,  'Ronda de 32', null, TBD, TBD, '2026-07-01T22:00Z', 'bbva'),
  m(81,  'Ronda de 32', null, TBD, TBD, '2026-07-02T19:00Z', 'lincoln'),
  m(82,  'Ronda de 32', null, TBD, TBD, '2026-07-02T22:00Z', 'levis'),
  m(83,  'Ronda de 32', null, TBD, TBD, '2026-07-02T23:00Z', 'azteca'),
  m(84,  'Ronda de 32', null, TBD, TBD, '2026-07-03T20:00Z', 'nrg'),
  m(85,  'Ronda de 32', null, TBD, TBD, '2026-07-03T23:00Z', 'bmo'),
  m(86,  'Ronda de 32', null, TBD, TBD, '2026-07-03T22:00Z', 'atlanta'),
  m(87,  'Ronda de 32', null, TBD, TBD, '2026-07-04T01:00Z', 'bcplace'),
  m(88,  'Ronda de 32', null, TBD, TBD, '2026-07-04T20:00Z', 'akron'),

  // ════════════════════════════════════════════════════════════
  //  OCTAVOS DE FINAL  (Jul 4-7) — 8 partidos
  // ════════════════════════════════════════════════════════════
  m(89,  'Octavos de Final', null, TBD, TBD, '2026-07-04T22:00Z', 'metlife'),
  m(90,  'Octavos de Final', null, TBD, TBD, '2026-07-05T01:00Z', 'attdallas'),
  m(91,  'Octavos de Final', null, TBD, TBD, '2026-07-05T22:00Z', 'sofi'),
  m(92,  'Octavos de Final', null, TBD, TBD, '2026-07-06T01:00Z', 'hardrock'),
  m(93,  'Octavos de Final', null, TBD, TBD, '2026-07-06T22:00Z', 'lumen'),
  m(94,  'Octavos de Final', null, TBD, TBD, '2026-07-07T01:00Z', 'gillette'),
  m(95,  'Octavos de Final', null, TBD, TBD, '2026-07-07T22:00Z', 'azteca'),
  m(96,  'Octavos de Final', null, TBD, TBD, '2026-07-08T01:00Z', 'arrowhead'),

  // ════════════════════════════════════════════════════════════
  //  CUARTOS DE FINAL  (Jul 9-11) — 4 partidos
  // ════════════════════════════════════════════════════════════
  m(97,  'Cuartos de Final', null, TBD, TBD, '2026-07-09T22:00Z', 'metlife'),
  m(98,  'Cuartos de Final', null, TBD, TBD, '2026-07-10T01:00Z', 'sofi'),
  m(99,  'Cuartos de Final', null, TBD, TBD, '2026-07-11T22:00Z', 'attdallas'),
  m(100, 'Cuartos de Final', null, TBD, TBD, '2026-07-12T01:00Z', 'hardrock'),

  // ════════════════════════════════════════════════════════════
  //  SEMIFINALES  (Jul 14-15) — 2 partidos
  // ════════════════════════════════════════════════════════════
  m(101, 'Semifinal', null, TBD, TBD, '2026-07-14T22:00Z', 'metlife'),
  m(102, 'Semifinal', null, TBD, TBD, '2026-07-15T22:00Z', 'sofi'),

  // ════════════════════════════════════════════════════════════
  //  TERCER PUESTO  (Jul 18) y  FINAL  (Jul 19)
  // ════════════════════════════════════════════════════════════
  m(103, 'Tercer Puesto', null, TBD, TBD, '2026-07-18T21:00Z', 'hardrock'),
  m(104, 'Final',         null, TBD, TBD, '2026-07-19T22:00Z', 'metlife'),
]

export const PHASES = [
  'Grupos', 'Ronda de 32', 'Octavos de Final',
  'Cuartos de Final', 'Semifinal', 'Tercer Puesto', 'Final',
]

export const GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L']
