// 48 selecciones — Sorteo Oficial FIFA World Cup 2026 (diciembre 2025)

export const CONFEDERATIONS = ['CONMEBOL', 'UEFA', 'CONCACAF', 'CAF', 'AFC', 'OFC']

export const GROUP_COLORS = {
  A: 'bg-blue-600',   B: 'bg-purple-600', C: 'bg-red-600',
  D: 'bg-orange-600', E: 'bg-yellow-600', F: 'bg-green-600',
  G: 'bg-teal-600',   H: 'bg-cyan-600',   I: 'bg-indigo-600',
  J: 'bg-pink-600',   K: 'bg-rose-600',   L: 'bg-lime-600',
}

const COUNTRIES_RAW = [
  // ── GRUPO A: México · Sudáfrica · Corea del Sur · Rep. Checa ──────
  {
    id: 'mex', name: 'México', flag: '🇲🇽', confederation: 'CONCACAF', group: 'A',
    players: ['Guillermo Ochoa', 'Jorge Sánchez', 'César Montes', 'Johan Vásquez',
      'Jesús Gallardo', 'Edson Álvarez', 'Héctor Herrera', 'Uriel Antuna',
      'Hirving Lozano', 'Raúl Jiménez', 'Henry Martín'],
  },
  {
    id: 'rsa', name: 'Sudáfrica', flag: '🇿🇦', confederation: 'CAF', group: 'A',
    players: ['Ronwen Williams', 'Teboho Mokoena', 'Siyanda Xulu', 'Mothobi Mvala',
      'Nkosinathi Sibisi', 'Percy Tau', 'Themba Zwane', 'Bongani Zungu',
      'Evidence Makgopa', 'Lyle Foster', 'Bradley Grobler'],
  },
  {
    id: 'kor', name: 'Corea del Sur', flag: '🇰🇷', confederation: 'AFC', group: 'A',
    players: ['Kim Seung-gyu', 'Kim Tae-hwan', 'Kim Young-gwon', 'Lee Young-jae',
      'Lee Yong', 'Hwang In-beom', 'Jung Woo-young', 'Lee Jae-sung',
      'Heung-min Son', 'Hwang Hee-chan', 'Hwang Ui-jo'],
  },
  {
    id: 'cze', name: 'República Checa', flag: '🇨🇿', confederation: 'UEFA', group: 'A',
    players: ['Jiří Pavlenka', 'Vladimír Coufal', 'Tomáš Souček', 'Jan Bořil',
      'Ondřej Kúdela', 'Jakub Jankto', 'Lukáš Provod', 'Antonín Barák',
      'Patrick Schick', 'Adam Hložek', 'Tomáš Chorý'],
  },

  // ── GRUPO B: Canadá · Bosnia y Herzegovina · Catar · Suiza ────────
  {
    id: 'can', name: 'Canadá', flag: '🇨🇦', confederation: 'CONCACAF', group: 'B',
    players: ['Milan Borjan', 'Richie Laryea', 'Kamal Miller', 'Steven Vitória',
      'Samuel Adekugbe', 'Jonathan David', 'Cyle Larin', 'Alphonso Davies',
      'Tajon Buchanan', 'Stephen Eustaquio', 'Ismael Koné'],
  },
  {
    id: 'bih', name: 'Bosnia y Herzegovina', flag: '🇧🇦', confederation: 'UEFA', group: 'B',
    players: ['Ibrahim Šehić', 'Sead Kolašinac', 'Ognjen Vranješ', 'Ermin Bičakčić',
      'Miralem Pjanić', 'Armin Hodžić', 'Edin Džeko', 'Anel Ahmedhodžić',
      'Ermedin Demirović', 'Haris Duljevič', 'Muamer Tankovic'],
  },
  {
    id: 'qat', name: 'Catar', flag: '🇶🇦', confederation: 'AFC', group: 'B',
    players: ['Meshaal Barsham', 'Pedro Miguel', 'Bassam Al-Rawi', 'Boualem Khoukhi',
      'Ismail Mohamad', 'Karim Boudiaf', 'Abdulaziz Hatem', 'Hassan Al-Haydos',
      'Almoez Ali', 'Mohammed Muntari', 'Akram Afif'],
  },
  {
    id: 'sui', name: 'Suiza', flag: '🇨🇭', confederation: 'UEFA', group: 'B',
    players: ['Yann Sommer', 'Silvan Widmer', 'Manuel Akanji', 'Fabian Schär',
      'Ricardo Rodríguez', 'Granit Xhaka', 'Remo Freuler', 'Xherdan Shaqiri',
      'Breel Embolo', 'Ruben Vargas', 'Dan Ndoye'],
  },

  // ── GRUPO C: Brasil · Marruecos · Haití · Escocia ─────────────────
  {
    id: 'bra', name: 'Brasil', flag: '🇧🇷', confederation: 'CONMEBOL', group: 'C',
    players: ['Alisson', 'Danilo', 'Marquinhos', 'Thiago Silva', 'Alex Sandro',
      'Casemiro', 'Bruno Guimarães', 'Rodrygo', 'Vinícius Jr.', 'Endrick', 'Richarlison'],
  },
  {
    id: 'mar', name: 'Marruecos', flag: '🇲🇦', confederation: 'CAF', group: 'C',
    players: ['Yassine Bounou', 'Achraf Hakimi', 'Noussair Mazraoui', 'Romain Saïss',
      'Jawad El Yamiq', 'Azzedine Ounahi', 'Selim Amallah', 'Hakim Ziyech',
      'Sofiane Boufal', 'Youssef En-Nesyri', 'Abde Ezzalzouli'],
  },
  {
    id: 'hai', name: 'Haití', flag: '🇭🇹', confederation: 'CONCACAF', group: 'C',
    players: ['Josué Duverger', 'Mechack Jérôme', 'Andrew Jean-Baptiste', 'Defly Fabius',
      'Carlo Marcelin', 'Jeff Louis', 'Florentino Ibarra', 'Wilde Donald Guerrier',
      'Duckens Nazon', 'Frantzdy Pierrot', 'Kervens Belfort'],
  },
  {
    id: 'sco', name: 'Escocia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', confederation: 'UEFA', group: 'C',
    players: ['Angus Gunn', 'Aaron Hickey', 'Grant Hanley', 'Kieran Tierney',
      'Andy Robertson', 'Ryan Christie', 'John McGinn', 'Billy Gilmour',
      'Scott McTominay', 'Che Adams', 'Lyndon Dykes'],
  },

  // ── GRUPO D: EE.UU. · Paraguay · Australia · Turquía ──────────────
  {
    id: 'usa', name: 'Estados Unidos', flag: '🇺🇸', confederation: 'CONCACAF', group: 'D',
    players: ['Matt Turner', 'Sergiño Dest', 'Walker Zimmerman', 'Chris Richards',
      'Antonee Robinson', 'Tyler Adams', 'Weston McKennie', 'Yunus Musah',
      'Giovanni Reyna', 'Christian Pulisic', 'Josh Sargent'],
  },
  {
    id: 'par', name: 'Paraguay', flag: '🇵🇾', confederation: 'CONMEBOL', group: 'D',
    players: ['Antony Silva', 'Robert Rojas', 'Gustavo Gómez', 'Junior Alonso',
      'Blas Riveros', 'Miguel Almirón', 'Matías Rojas', 'Ángel Romero',
      'Alejandro Romero Gamarra', 'Iván Piris', 'Jorge Morel'],
  },
  {
    id: 'aus', name: 'Australia', flag: '🇦🇺', confederation: 'AFC', group: 'D',
    players: ['Mat Ryan', 'Harry Souttar', 'Bailey Wright', 'Ryan McGowan',
      'Mathew Leckie', 'Jackson Irvine', 'Aaron Mooy', 'Ajdin Hrustic',
      'Mitchell Duke', 'Craig Goodwin', 'Martin Boyle'],
  },
  {
    id: 'tur', name: 'Turquía', flag: '🇹🇷', confederation: 'UEFA', group: 'D',
    players: ['Altay Bayındır', 'Zeki Çelik', 'Merih Demiral', 'Samet Akaydın',
      'Ferdi Kadıoğlu', 'Hakan Çalhanoğlu', 'Arda Güler', 'Kenan Yıldız',
      'Barış Alper Yılmaz', 'Kerem Aktürkoğlu', 'Cenk Tosun'],
  },

  // ── GRUPO E: Alemania · Curazao · Costa de Marfil · Ecuador ───────
  {
    id: 'ger', name: 'Alemania', flag: '🇩🇪', confederation: 'UEFA', group: 'E',
    players: ['Manuel Neuer', 'Joshua Kimmich', 'Antonio Rüdiger', 'Jonathan Tah',
      'David Raum', 'Florian Wirtz', 'Jamal Musiala', 'Toni Kroos',
      'Thomas Müller', 'Kai Havertz', 'Leroy Sané'],
  },
  {
    id: 'cur', name: 'Curazao', flag: '🇨🇼', confederation: 'CONCACAF', group: 'E',
    players: ['Eloy Room', 'Cuco Martina', 'Leandro Bacuna', 'Juninho Bacuna',
      'Ryan Donk', 'Jarchinio Antonia', 'Rangelo Janga', 'Richie Musaba',
      'Elson Hooi', 'Myron Boadu', 'Reiner Ferrier'],
  },
  {
    id: 'civ', name: 'Costa de Marfil', flag: '🇨🇮', confederation: 'CAF', group: 'E',
    players: ['Yahia Fofana', 'Simon Deli', 'Wilfried Singo', 'Odilon Kossounou',
      'Ghislain Konan', 'Franck Kessié', 'Ibrahim Sangaré', 'Seko Fofana',
      'Nicolas Pépé', 'Sebastién Haller', 'Wilfried Zaha'],
  },
  {
    id: 'ecu', name: 'Ecuador', flag: '🇪🇨', confederation: 'CONMEBOL', group: 'E',
    players: ['Alexander Domínguez', 'Angelo Preciado', 'Piero Hincapié', 'Robert Arboleda',
      'Pervis Estupiñán', 'Carlos Gruezo', 'Moisés Caicedo', 'Gonzalo Plata',
      'Enner Valencia', 'Michael Estrada', 'Ángel Mena'],
  },

  // ── GRUPO F: Países Bajos · Japón · Suecia · Túnez ────────────────
  {
    id: 'ned', name: 'Países Bajos', flag: '🇳🇱', confederation: 'UEFA', group: 'F',
    players: ['Bart Verbruggen', 'Denzel Dumfries', 'Virgil van Dijk', 'Matthijs de Ligt',
      'Nathan Aké', 'Frenkie de Jong', 'Tijjani Reijnders', 'Xavi Simons',
      'Cody Gakpo', 'Memphis Depay', 'Donyell Malen'],
  },
  {
    id: 'jpn', name: 'Japón', flag: '🇯🇵', confederation: 'AFC', group: 'F',
    players: ['Shuichi Gonda', 'Hiroki Sakai', 'Maya Yoshida', 'Ko Itakura',
      'Yuto Nagatomo', 'Wataru Endo', 'Daichi Kamada', 'Junya Ito',
      'Ritsu Doan', 'Ayase Ueda', 'Kaoru Mitoma'],
  },
  {
    id: 'swe', name: 'Suecia', flag: '🇸🇪', confederation: 'UEFA', group: 'F',
    players: ['Robin Olsen', 'Emil Krafth', 'Victor Nilsson Lindelöf', 'Carl Starfelt',
      'Ludwig Augustinsson', 'Albin Ekdal', 'Jens-Lys Cajuste', 'Dejan Kulusevski',
      'Emil Forsberg', 'Alexander Isak', 'Viktor Gyökeres'],
  },
  {
    id: 'tun', name: 'Túnez', flag: '🇹🇳', confederation: 'CAF', group: 'F',
    players: ['Aymen Dahmen', 'Wajdi Kechrida', 'Montassar Talbi', 'Dylan Bronn',
      'Ali Abdi', 'Ellyes Skhiri', 'Anis Ben Slimane', 'Hamza Rafia',
      'Youssef Msakni', 'Naïm Sliti', 'Wahbi Khazri'],
  },

  // ── GRUPO G: Bélgica · Egipto · Irán · Nueva Zelanda ──────────────
  {
    id: 'bel', name: 'Bélgica', flag: '🇧🇪', confederation: 'UEFA', group: 'G',
    players: ['Koen Casteels', 'Timothy Castagne', 'Jan Vertonghen', 'Wout Faes',
      'Axel Witsel', 'Kevin De Bruyne', 'Youri Tielemans', 'Charles De Ketelaere',
      'Romelu Lukaku', 'Dries Mertens', 'Leandro Trossard'],
  },
  {
    id: 'egy', name: 'Egipto', flag: '🇪🇬', confederation: 'CAF', group: 'G',
    players: ['Mohamed El-Shenawy', 'Mohamed Abdelmonem', 'Ahmed Hegazi', 'Mohamed Hamdy',
      'Omar Marmoush', 'Mohamed Salah', 'Mostafa Mohamed', 'Trezeguet',
      'Ahmed Sayed Zizo', 'Amr El-Sulaya', 'Marwan Hamdy'],
  },
  {
    id: 'irn', name: 'Irán', flag: '🇮🇷', confederation: 'AFC', group: 'G',
    players: ['Alireza Beiranvand', 'Shoja Khalilzadeh', 'Milad Mohammadi', 'Majid Hosseini',
      'Mohammad Mohebi', 'Ali Gholizadeh', 'Ahmad Noorollahi', 'Saman Ghoddos',
      'Sardar Azmoun', 'Mehdi Taremi', 'Allahyar Sayyadmanesh'],
  },
  {
    id: 'nzl', name: 'Nueva Zelanda', flag: '🇳🇿', confederation: 'OFC', group: 'G',
    players: ['Oliver Sail', 'Liberato Cacace', 'Winston Reid', 'Nando Pijnaker',
      'Michael Boxall', 'Joe Bell', 'Sarpreet Singh', 'Clayton Lewis',
      'Chris Wood', 'Callan Elliot', 'Marko Stamenic'],
  },

  // ── GRUPO H: España · Cabo Verde · Arabia Saudí · Uruguay ─────────
  {
    id: 'esp', name: 'España', flag: '🇪🇸', confederation: 'UEFA', group: 'H',
    players: ['Unai Simón', 'Dani Carvajal', 'Aymeric Laporte', 'Pau Cubarsí',
      'Alejandro Grimaldo', 'Rodri', 'Pedri', 'Gavi',
      'Lamine Yamal', 'Nico Williams', 'Álvaro Morata'],
  },
  {
    id: 'cpv', name: 'Cabo Verde', flag: '🇨🇻', confederation: 'CAF', group: 'H',
    players: ['Vozinha', 'Stopira', 'Marco Moreno', 'Dylan Tavares', 'Roberto',
      'Jamiro Monteiro', 'Ryan Mendes', 'Garry Rodrigues',
      'Jovane Cabral', 'Nunu Tavares', 'Júlio Tavares'],
  },
  {
    id: 'ksa', name: 'Arabia Saudí', flag: '🇸🇦', confederation: 'AFC', group: 'H',
    players: ['Mohammed Al-Owais', 'Sultan Al-Ghannam', 'Ali Al-Bulayhi', 'Hassan Al-Tambakti',
      'Abdulelah Al-Amri', 'Mohamed Kanno', 'Nawaf Al-Abed', 'Saleh Al-Shehri',
      'Salem Al-Dawsari', 'Firas Al-Buraikan', 'Abdullah Al-Hamdan'],
  },
  {
    id: 'uru', name: 'Uruguay', flag: '🇺🇾', confederation: 'CONMEBOL', group: 'H',
    players: ['Fernando Muslera', 'Guillermo Varela', 'Diego Godín', 'Sebastián Coates',
      'Mathías Olivera', 'Lucas Torreira', 'Rodrigo Bentancur', 'Federico Valverde',
      'Luis Suárez', 'Darwin Núñez', 'Facundo Torres'],
  },

  // ── GRUPO I: Francia · Senegal · Irak · Noruega ───────────────────
  {
    id: 'fra', name: 'Francia', flag: '🇫🇷', confederation: 'UEFA', group: 'I',
    players: ['Mike Maignan', 'William Saliba', 'Raphaël Varane', 'Lucas Digne',
      'Theo Hernández', 'N\'Golo Kanté', 'Aurélien Tchouaméni', 'Antoine Griezmann',
      'Kylian Mbappé', 'Ousmane Dembélé', 'Marcus Thuram'],
  },
  {
    id: 'sen', name: 'Senegal', flag: '🇸🇳', confederation: 'CAF', group: 'I',
    players: ['Edouard Mendy', 'Bouna Sarr', 'Kalidou Koulibaly', 'Abdou Diallo',
      'Ismail Jakobs', 'Nampalys Mendy', 'Pape Gueye', 'Ismaila Sarr',
      'Sadio Mané', 'Bamba Dieng', 'Lamine Camara'],
  },
  {
    id: 'irq', name: 'Irak', flag: '🇮🇶', confederation: 'AFC', group: 'I',
    players: ['Jalal Hassan', 'Ali Adnan', 'Saad Natiq', 'Bassam Rashid',
      'Ahmed Ibrahim', 'Humam Tariq', 'Alaa Abbas', 'Mohanad Ali',
      'Amjad Attwan', 'Ayman Hussein', 'Safaa Hadi'],
  },
  {
    id: 'nor', name: 'Noruega', flag: '🇳🇴', confederation: 'UEFA', group: 'I',
    players: ['Ørjan Nyland', 'Birger Meling', 'Kristoffer Ajer', 'Stefan Strandberg',
      'Olav Bjørn Moen', 'Sander Berge', 'Martin Ødegaard', 'Antonio Nusa',
      'Erling Haaland', 'Alexander Sørloth', 'Mathias Normann'],
  },

  // ── GRUPO J: Argentina · Argelia · Austria · Jordania ─────────────
  {
    id: 'arg', name: 'Argentina', flag: '🇦🇷', confederation: 'CONMEBOL', group: 'J',
    players: ['Emiliano Martínez', 'Nahuel Molina', 'Cristian Romero', 'Nicolás Otamendi',
      'Nicolás Tagliafico', 'Rodrigo De Paul', 'Enzo Fernández', 'Leandro Paredes',
      'Lionel Messi', 'Lautaro Martínez', 'Julián Álvarez'],
  },
  {
    id: 'alg', name: 'Argelia', flag: '🇩🇿', confederation: 'CAF', group: 'J',
    players: ['Raïs M\'Bolhi', 'Ramy Bensebaini', 'Aïssa Mandi', 'Mohamed Fares',
      'Djamel Benlamri', 'Yacine Adli', 'Nabil Bentaleb', 'Sofiane Feghouli',
      'Riyad Mahrez', 'Islam Slimani', 'Baghdad Bounedjah'],
  },
  {
    id: 'aut', name: 'Austria', flag: '🇦🇹', confederation: 'UEFA', group: 'J',
    players: ['Patrick Pentz', 'Stefan Posch', 'David Alaba', 'Maximilian Wöber',
      'Philipp Mwene', 'Florian Grillitsch', 'Konrad Laimer', 'Marcel Sabitzer',
      'Christoph Baumgartner', 'Michael Gregoritsch', 'Marko Arnautović'],
  },
  {
    id: 'jor', name: 'Jordania', flag: '🇯🇴', confederation: 'AFC', group: 'J',
    players: ['Yahia Nader', 'Yazan Al-Naimat', 'Baha Faisal', 'Anas Bani Yaseen',
      'Amer Shafi', 'Ahmad Sarour', 'Mahmoud Almardi', 'Musa Al-Tamari',
      'Mohammad Abu Zema', 'Yazan Al-Arab', 'Hamza Al-Dardour'],
  },

  // ── GRUPO K: Portugal · RD Congo · Uzbekistán · Colombia ──────────
  {
    id: 'por', name: 'Portugal', flag: '🇵🇹', confederation: 'UEFA', group: 'K',
    players: ['Rui Patrício', 'João Cancelo', 'Rúben Dias', 'Pepe',
      'Nuno Mendes', 'Bernardo Silva', 'Bruno Fernandes', 'Vitinha',
      'Cristiano Ronaldo', 'Rafael Leão', 'João Félix'],
  },
  {
    id: 'cod', name: 'RD Congo', flag: '🇨🇩', confederation: 'CAF', group: 'K',
    players: ['Joël Kiassumbua', 'Chancel Mbemba', 'Arthur Masuaku', 'Fiston Mayele',
      'Cédric Bakambu', 'Samuel Bastien', 'Yannick Bolasie', 'Firmin Mubele',
      'Benik Afobe', 'Gaël Kakuta', 'Jordan Botaka'],
  },
  {
    id: 'uzb', name: 'Uzbekistán', flag: '🇺🇿', confederation: 'AFC', group: 'K',
    players: ['Abduvohid Nishonov', 'Jasurbek Yakhshiboev', 'Khusan Murodov', 'Sanjar Tursunov',
      'Otabek Shukurov', 'Bobur Abdullaev', 'Jaloliddin Masharipov', 'Eldor Shomurodov',
      'Farrukh Tashkentov', 'Sardor Rashidov', 'Otabek Rakhimov'],
  },
  {
    id: 'col', name: 'Colombia', flag: '🇨🇴', confederation: 'CONMEBOL', group: 'K',
    players: ['David Ospina', 'Santiago Arias', 'Dávinson Sánchez', 'Yerry Mina',
      'William Tesillo', 'Wilmar Barrios', 'Juan Cuadrado', 'James Rodríguez',
      'Luis Díaz', 'Rafael Santos Borré', 'Falcao'],
  },

  // ── GRUPO L: Inglaterra · Croacia · Ghana · Panamá ────────────────
  {
    id: 'eng', name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation: 'UEFA', group: 'L',
    players: ['Jordan Pickford', 'Kieran Trippier', 'John Stones', 'Marc Guehi',
      'Luke Shaw', 'Declan Rice', 'Jude Bellingham', 'Phil Foden',
      'Bukayo Saka', 'Harry Kane', 'Marcus Rashford'],
  },
  {
    id: 'cro', name: 'Croacia', flag: '🇭🇷', confederation: 'UEFA', group: 'L',
    players: ['Dominik Livaković', 'Josip Juranović', 'Joško Gvardiol', 'Duje Ćaleta-Car',
      'Borna Sosa', 'Luka Modrić', 'Marcelo Brozović', 'Mateo Kovačić',
      'Ivan Perišić', 'Andrej Kramarić', 'Ante Budimir'],
  },
  {
    id: 'gha', name: 'Ghana', flag: '🇬🇭', confederation: 'CAF', group: 'L',
    players: ['Lawrence Ati-Zigi', 'Daniel Amartey', 'Thomas Partey', 'Tariq Lamptey',
      'Gideon Mensah', 'Mohammed Kudus', 'Andre Ayew', 'Jordan Ayew',
      'Osman Bukari', 'Antoine Semenyo', 'Inaki Williams'],
  },
  {
    id: 'pan', name: 'Panamá', flag: '🇵🇦', confederation: 'CONCACAF', group: 'L',
    players: ['Luis Mejía', 'Fidel Escobar', 'Éric Davis', 'Roderick Miller',
      'Harold Cummings', 'José Fajardo', 'Adalberto Carrasquilla', 'Rolando Blackburn',
      'Cecilio Waterman', 'Alberto Quintero', 'Gabriel Torres'],
  },
]

// Stickers de introducción (1-10)
export const INTRO_STICKERS = [
  { number: 1, type: 'cover', description: 'Portada Oficial FIFA World Cup 2026', special: true },
  { number: 2, type: 'intro', description: 'Logo FIFA World Cup 2026', special: true },
  { number: 3, type: 'intro', description: 'Mascota Oficial — "Striker"', special: true },
  { number: 4, type: 'intro', description: 'MetLife Stadium — Sede Final (NJ/NY)', special: false },
  { number: 5, type: 'intro', description: 'Estadio Azteca — Partido Inaugural', special: false },
  { number: 6, type: 'intro', description: 'AT&T Stadium — Dallas', special: false },
  { number: 7, type: 'intro', description: 'SoFi Stadium — Los Ángeles', special: false },
  { number: 8, type: 'intro', description: 'Trofeo Copa del Mundo FIFA', special: true },
  { number: 9, type: 'intro', description: '48 Selecciones — Nuevo Formato', special: false },
  { number: 10, type: 'intro', description: 'Árbitros Élite Mundial 2026', special: false },
]

const STICKERS_PER_COUNTRY = 13 // escudo(foil) + equipo + 11 jugadores
let nextNum = INTRO_STICKERS.length + 1

export const COUNTRIES = COUNTRIES_RAW.map((country) => {
  const stickers = []

  stickers.push({
    number: nextNum++, type: 'badge',
    description: `Escudo — ${country.name}`, special: true,
  })
  stickers.push({
    number: nextNum++, type: 'team',
    description: `Equipo — ${country.name}`, special: false,
  })
  country.players.forEach((player) => {
    stickers.push({
      number: nextNum++, type: 'player', description: player, special: false,
    })
  })

  return {
    ...country,
    stickers,
    stickerStart: stickers[0].number,
    stickerEnd: stickers[stickers.length - 1].number,
  }
})

export const TOTAL_STICKERS = INTRO_STICKERS.length + COUNTRIES.length * STICKERS_PER_COUNTRY

export const ALL_STICKERS = [
  ...INTRO_STICKERS.map((s) => ({ ...s, countryId: 'intro', countryName: 'Introducción' })),
  ...COUNTRIES.flatMap((c) =>
    c.stickers.map((s) => ({ ...s, countryId: c.id, countryName: c.name, flag: c.flag }))
  ),
]
