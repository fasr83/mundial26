// 48 selecciones — Sorteo Oficial FIFA World Cup 2026 (diciembre 2025)
// Estructura oficial álbum Panini: 980 láminas
// · 20 láminas de introducción (estadios + páginas especiales)
// · 48 selecciones × 20 láminas = 960 (1 escudo foil + 1 foto grupal + 18 retratos)

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
    players: [
      'Guillermo Ochoa', 'Jesús Corona', 'Rodolfo Cota',
      'Jorge Sánchez', 'Kevin Álvarez', 'César Montes', 'Johan Vásquez',
      'Néstor Araujo', 'Jesús Gallardo', 'Edson Álvarez', 'Carlos Rodríguez',
      'Héctor Herrera', 'Roberto Alvarado', 'Érick Gutiérrez', 'Uriel Antuna',
      'Hirving Lozano', 'Raúl Jiménez', 'Henry Martín',
    ],
  },
  {
    id: 'rsa', name: 'Sudáfrica', flag: '🇿🇦', confederation: 'CAF', group: 'A',
    players: [
      'Ronwen Williams', 'Bruce Bvuma', 'Veli Mothwa',
      'Siyanda Xulu', 'Mothobi Mvala', 'Nkosinathi Sibisi', 'Grant Kekana',
      'Terrence Mashego', 'Teboho Mokoena', 'Bongani Zungu', 'Sipho Mbule',
      'Percy Tau', 'Keagan Dolly', 'Themba Zwane', 'Sibongakonke Mbatha',
      'Evidence Makgopa', 'Lyle Foster', 'Bradley Grobler',
    ],
  },
  {
    id: 'kor', name: 'Corea del Sur', flag: '🇰🇷', confederation: 'AFC', group: 'A',
    players: [
      'Kim Seung-gyu', 'Jo Hyeon-woo', 'Song Bum-keun',
      'Kim Tae-hwan', 'Kim Young-gwon', 'Lee Young-jae', 'Kim Min-jae',
      'Lee Yong', 'Hwang In-beom', 'Jung Woo-young', 'Lee Jae-sung',
      'Paik Seung-ho', 'Lee Kang-in', 'Kwon Chang-hoon', 'Na Sang-ho',
      'Heung-min Son', 'Hwang Hee-chan', 'Hwang Ui-jo',
    ],
  },
  {
    id: 'cze', name: 'República Checa', flag: '🇨🇿', confederation: 'UEFA', group: 'A',
    players: [
      'Jiří Pavlenka', 'Tomáš Vaclík', 'Jindřich Staněk',
      'Vladimír Coufal', 'Tomáš Souček', 'Jan Bořil', 'Ondřej Kúdela',
      'David Zima', 'Jakub Jankto', 'Lukáš Provod', 'Antonín Barák',
      'Ladislav Krejčí', 'Marek Havlík', 'Michal Sadílek', 'Daniel Červ',
      'Patrick Schick', 'Adam Hložek', 'Tomáš Chorý',
    ],
  },

  // ── GRUPO B: Canadá · Bosnia y Herzegovina · Catar · Suiza ────────
  {
    id: 'can', name: 'Canadá', flag: '🇨🇦', confederation: 'CONCACAF', group: 'B',
    players: [
      'Milan Borjan', 'Maxime Crépeau', 'Dayne St. Clair',
      'Richie Laryea', 'Kamal Miller', 'Steven Vitória', 'Alistair Johnston',
      'Samuel Adekugbe', 'Stephen Eustaquio', 'Ismael Koné', 'Mark-Anthony Kaye',
      'Jonathan David', 'Cyle Larin', 'Alphonso Davies', 'Tajon Buchanan',
      'Liam Millar', 'Theo Corbeanu', 'Charles-Andreas Brym',
    ],
  },
  {
    id: 'bih', name: 'Bosnia y Herzegovina', flag: '🇧🇦', confederation: 'UEFA', group: 'B',
    players: [
      'Ibrahim Šehić', 'Kenan Pirić', 'Nikola Vasilj',
      'Sead Kolašinac', 'Ognjen Vranješ', 'Ermin Bičakčić', 'Anel Ahmedhodžić',
      'Miralem Pjanić', 'Armin Hodžić', 'Haris Duljevič', 'Edin Višća',
      'Ermedin Demirović', 'Muamer Tankovic', 'Amar Rahimić', 'Nedim Bajrić',
      'Edin Džeko', 'Haris Tabak', 'Deni Miličević',
    ],
  },
  {
    id: 'qat', name: 'Catar', flag: '🇶🇦', confederation: 'AFC', group: 'B',
    players: [
      'Meshaal Barsham', 'Yousef Hassan', 'Khalid Baloul',
      'Pedro Miguel', 'Bassam Al-Rawi', 'Boualem Khoukhi', 'Ismail Mohamad',
      'Karim Boudiaf', 'Abdulaziz Hatem', 'Hassan Al-Haydos', 'Assim Madibo',
      'Khalid Salman', 'Ahmed Alaaeldin', 'Yousuf Abdurisag', 'Homam Al-Amin',
      'Almoez Ali', 'Mohammed Muntari', 'Akram Afif',
    ],
  },
  {
    id: 'sui', name: 'Suiza', flag: '🇨🇭', confederation: 'UEFA', group: 'B',
    players: [
      'Yann Sommer', 'Gregor Kobel', 'Jonas Omlin',
      'Silvan Widmer', 'Manuel Akanji', 'Fabian Schär', 'Ricardo Rodríguez',
      'Nico Elvedi', 'Granit Xhaka', 'Remo Freuler', 'Michel Aebischer',
      'Xherdan Shaqiri', 'Fabian Rieder', 'Christian Fassnacht', 'Ardon Jashari',
      'Breel Embolo', 'Ruben Vargas', 'Dan Ndoye',
    ],
  },

  // ── GRUPO C: Brasil · Marruecos · Haití · Escocia ─────────────────
  {
    id: 'bra', name: 'Brasil', flag: '🇧🇷', confederation: 'CONMEBOL', group: 'C',
    players: [
      'Alisson', 'Ederson', 'Weverton',
      'Danilo', 'Marquinhos', 'Thiago Silva', 'Alex Sandro',
      'Eder Militão', 'Casemiro', 'Bruno Guimarães', 'Lucas Paquetá',
      'Raphinha', 'Rodrygo', 'Vinícius Jr.', 'Gabriel Martinelli',
      'Endrick', 'Richarlison', 'Gabriel Jesus',
    ],
  },
  {
    id: 'mar', name: 'Marruecos', flag: '🇲🇦', confederation: 'CAF', group: 'C',
    players: [
      'Yassine Bounou', 'Munir Mohamedi', 'Ahmed Tagnaouti',
      'Achraf Hakimi', 'Noussair Mazraoui', 'Romain Saïss', 'Jawad El Yamiq',
      'Nayef Aguerd', 'Azzedine Ounahi', 'Selim Amallah', 'Sofyan Amrabat',
      'Hakim Ziyech', 'Sofiane Boufal', 'Abde Ezzalzouli', 'Ilias Chair',
      'Youssef En-Nesyri', 'Ayoub El Kaabi', 'Ryan Mmaee',
    ],
  },
  {
    id: 'hai', name: 'Haití', flag: '🇭🇹', confederation: 'CONCACAF', group: 'C',
    players: [
      'Josué Duverger', 'Hervé Lollichon', 'Sébastien Lordeus',
      'Mechack Jérôme', 'Andrew Jean-Baptiste', 'Defly Fabius', 'Carlo Marcelin',
      'Kervens Belfort', 'Jeff Louis', 'Florentino Ibarra', 'Duckens Nazon',
      'Frantzdy Pierrot', 'Wilde Donald Guerrier', 'Joathe Coicou', 'Chris Leidner',
      'Damus Steeven', 'Rony Alexandre', 'Orlandi Méndez',
    ],
  },
  {
    id: 'sco', name: 'Escocia', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', confederation: 'UEFA', group: 'C',
    players: [
      'Angus Gunn', 'Craig Gordon', 'Zander Clark',
      'Aaron Hickey', 'Grant Hanley', 'Kieran Tierney', 'Andy Robertson',
      'Jack Hendry', 'Ryan Christie', 'John McGinn', 'Callum McGregor',
      'Billy Gilmour', 'Scott McTominay', 'Stuart Armstrong', 'Kenny McLean',
      'Che Adams', 'Lyndon Dykes', 'Lawrence Shankland',
    ],
  },

  // ── GRUPO D: EE.UU. · Paraguay · Australia · Turquía ──────────────
  {
    id: 'usa', name: 'Estados Unidos', flag: '🇺🇸', confederation: 'CONCACAF', group: 'D',
    players: [
      'Matt Turner', 'Patrick Schulte', 'Ethan Horvath',
      'Sergiño Dest', 'Walker Zimmerman', 'Chris Richards', 'Antonee Robinson',
      'Joe Scally', 'Tyler Adams', 'Weston McKennie', 'Yunus Musah',
      'Brenden Aaronson', 'Giovanni Reyna', 'Christian Pulisic', 'Timothy Weah',
      'Josh Sargent', 'Folarin Balogun', 'Ricardo Pepi',
    ],
  },
  {
    id: 'par', name: 'Paraguay', flag: '🇵🇾', confederation: 'CONMEBOL', group: 'D',
    players: [
      'Antony Silva', 'Gastón Olveira', 'Alfredo Aguilar',
      'Robert Rojas', 'Gustavo Gómez', 'Junior Alonso', 'Blas Riveros',
      'Fabián Balbuena', 'Miguel Almirón', 'Matías Rojas', 'Richard Sánchez',
      'Ángel Romero', 'Alejandro Romero Gamarra', 'Iván Piris', 'Jorge Morel',
      'Antonio Sanabria', 'Julio Enciso', 'Lautaro Acosta',
    ],
  },
  {
    id: 'aus', name: 'Australia', flag: '🇦🇺', confederation: 'AFC', group: 'D',
    players: [
      'Mat Ryan', 'Danny Vukovic', 'Andrew Redmayne',
      'Harry Souttar', 'Bailey Wright', 'Ryan McGowan', 'Joel King',
      'Nathaniel Atkinson', 'Jackson Irvine', 'Aaron Mooy', 'Riley McGree',
      'Ajdin Hrustic', 'Mathew Leckie', 'Craig Goodwin', 'Cameron Devlin',
      'Mitchell Duke', 'Martin Boyle', 'Jason Cummings',
    ],
  },
  {
    id: 'tur', name: 'Turquía', flag: '🇹🇷', confederation: 'UEFA', group: 'D',
    players: [
      'Altay Bayındır', 'Uğurcan Çakır', 'Mert Günok',
      'Zeki Çelik', 'Merih Demiral', 'Samet Akaydın', 'Ferdi Kadıoğlu',
      'Abdülkerim Bardakcı', 'Hakan Çalhanoğlu', 'Salih Özcan', 'Orkun Kökçü',
      'Arda Güler', 'Kenan Yıldız', 'Barış Alper Yılmaz', 'Kerem Aktürkoğlu',
      'Cenk Tosun', 'Berat Djimsiti', 'Semih Kılıçsoy',
    ],
  },

  // ── GRUPO E: Alemania · Curazao · Costa de Marfil · Ecuador ───────
  {
    id: 'ger', name: 'Alemania', flag: '🇩🇪', confederation: 'UEFA', group: 'E',
    players: [
      'Manuel Neuer', 'Marc-André ter Stegen', 'Oliver Baumann',
      'Joshua Kimmich', 'Antonio Rüdiger', 'Jonathan Tah', 'David Raum',
      'Niklas Süle', 'Robert Andrich', 'Pascal Groß', 'Aleksandar Pavlović',
      'Florian Wirtz', 'Jamal Musiala', 'Leroy Sané', 'Serge Gnabry',
      'Thomas Müller', 'Kai Havertz', 'Niclas Füllkrug',
    ],
  },
  {
    id: 'cur', name: 'Curazao', flag: '🇨🇼', confederation: 'CONCACAF', group: 'E',
    players: [
      'Eloy Room', 'Shiloh Winkel', 'Etienne Vaessen',
      'Cuco Martina', 'Leandro Bacuna', 'Ryan Donk', 'Darryl Lachman',
      'Gilson Tavares', 'Juninho Bacuna', 'Jarchinio Antonia', 'Rangelo Janga',
      'Richie Musaba', 'Elson Hooi', 'Quiñcy Promes', 'Brandley Kuwas',
      'Myron Boadu', 'Reiner Ferrier', 'Furdjel Narsingh',
    ],
  },
  {
    id: 'civ', name: 'Costa de Marfil', flag: '🇨🇮', confederation: 'CAF', group: 'E',
    players: [
      'Yahia Fofana', 'Badra Ali Sangaré', 'Sylvain Gbohouo',
      'Simon Deli', 'Wilfried Singo', 'Odilon Kossounou', 'Ghislain Konan',
      'Serge Aurier', 'Franck Kessié', 'Ibrahim Sangaré', 'Seko Fofana',
      'Maxwel Cornet', 'Nicolas Pépé', 'Jean-Philippe Krasso', 'Karim Konaté',
      'Sebastién Haller', 'Wilfried Zaha', 'Oumar Diakité',
    ],
  },
  {
    id: 'ecu', name: 'Ecuador', flag: '🇪🇨', confederation: 'CONMEBOL', group: 'E',
    players: [
      'Alexander Domínguez', 'Hernán Galíndez', 'Máximo Banguera',
      'Angelo Preciado', 'Piero Hincapié', 'Robert Arboleda', 'Pervis Estupiñán',
      'Diego Palacios', 'Carlos Gruezo', 'Moisés Caicedo', 'Alan Franco',
      'Gonzalo Plata', 'Djorkaeff Reasco', 'Romario Ibarra', 'Jeremy Sarmiento',
      'Enner Valencia', 'Michael Estrada', 'Kevin Rodríguez',
    ],
  },

  // ── GRUPO F: Países Bajos · Japón · Suecia · Túnez ────────────────
  {
    id: 'ned', name: 'Países Bajos', flag: '🇳🇱', confederation: 'UEFA', group: 'F',
    players: [
      'Bart Verbruggen', 'Mark Flekken', 'Remko Pasveer',
      'Denzel Dumfries', 'Virgil van Dijk', 'Matthijs de Ligt', 'Nathan Aké',
      'Stefan de Vrij', 'Frenkie de Jong', 'Tijjani Reijnders', 'Teun Koopmeiners',
      'Xavi Simons', 'Steven Bergwijn', 'Donyell Malen', 'Wout Weghorst',
      'Cody Gakpo', 'Memphis Depay', 'Brian Brobbey',
    ],
  },
  {
    id: 'jpn', name: 'Japón', flag: '🇯🇵', confederation: 'AFC', group: 'F',
    players: [
      'Shuichi Gonda', 'Zion Suzuki', 'Daniel Schmidt',
      'Hiroki Sakai', 'Maya Yoshida', 'Ko Itakura', 'Yuto Nagatomo',
      'Shogo Taniguchi', 'Wataru Endo', 'Hidemasa Morita', 'Sho Ito',
      'Daichi Kamada', 'Junya Ito', 'Ritsu Doan', 'Takefusa Kubo',
      'Ayase Ueda', 'Kaoru Mitoma', 'Koki Ogawa',
    ],
  },
  {
    id: 'swe', name: 'Suecia', flag: '🇸🇪', confederation: 'UEFA', group: 'F',
    players: [
      'Robin Olsen', 'Karl-Johan Johnsson', 'Andreas Linde',
      'Emil Krafth', 'Victor Nilsson Lindelöf', 'Carl Starfelt', 'Ludwig Augustinsson',
      'Mikael Lustig', 'Albin Ekdal', 'Jens-Lys Cajuste', 'Kristoffer Olsson',
      'Dejan Kulusevski', 'Emil Forsberg', 'Mattias Svanberg', 'Samuel Adegbenro',
      'Alexander Isak', 'Viktor Gyökeres', 'Marcus Danielson',
    ],
  },
  {
    id: 'tun', name: 'Túnez', flag: '🇹🇳', confederation: 'CAF', group: 'F',
    players: [
      'Aymen Dahmen', 'Bechir Ben Said', 'Mouez Hassen',
      'Wajdi Kechrida', 'Montassar Talbi', 'Dylan Bronn', 'Ali Abdi',
      'Mohamed Dräger', 'Ellyes Skhiri', 'Anis Ben Slimane', 'Hannibal Mejbri',
      'Hamza Rafia', 'Youssef Msakni', 'Naïm Sliti', 'Saîf-Eddine Khaoui',
      'Wahbi Khazri', 'Seifeddine Jaziri', 'Taha Yassine Khenissi',
    ],
  },

  // ── GRUPO G: Bélgica · Egipto · Irán · Nueva Zelanda ──────────────
  {
    id: 'bel', name: 'Bélgica', flag: '🇧🇪', confederation: 'UEFA', group: 'G',
    players: [
      'Koen Casteels', 'Thibaut Courtois', 'Matz Sels',
      'Timothy Castagne', 'Jan Vertonghen', 'Wout Faes', 'Arthur Theate',
      'Zeno Debast', 'Kevin De Bruyne', 'Axel Witsel', 'Youri Tielemans',
      'Charles De Ketelaere', 'Jérémy Doku', 'Leandro Trossard', 'Johan Bakayoko',
      'Romelu Lukaku', 'Lois Openda', 'Dries Mertens',
    ],
  },
  {
    id: 'egy', name: 'Egipto', flag: '🇪🇬', confederation: 'CAF', group: 'G',
    players: [
      'Mohamed El-Shenawy', 'Ahmed El-Shenawy', 'Mahmoud Gaber',
      'Mohamed Abdelmonem', 'Ahmed Hegazi', 'Ayman Ashraf', 'Baher El-Mohamady',
      'Akram Tawfik', 'Tarek Hamed', 'Amr El-Sulaya', 'Emam Ashour',
      'Omar Marmoush', 'Mohamed Salah', 'Trezeguet', 'Ahmed Sayed Zizo',
      'Mostafa Mohamed', 'Marwan Hamdy', 'Kahraba',
    ],
  },
  {
    id: 'irn', name: 'Irán', flag: '🇮🇷', confederation: 'AFC', group: 'G',
    players: [
      'Alireza Beiranvand', 'Hossein Hosseini', 'Payam Niazmand',
      'Shoja Khalilzadeh', 'Milad Mohammadi', 'Majid Hosseini', 'Ramin Rezaeian',
      'Morteza Pouraliganji', 'Ahmad Noorollahi', 'Ali Gholizadeh', 'Mohammad Mohebi',
      'Saman Ghoddos', 'Saeid Ezatolahi', 'Mehdi Torabi', 'Vahid Amiri',
      'Sardar Azmoun', 'Mehdi Taremi', 'Allahyar Sayyadmanesh',
    ],
  },
  {
    id: 'nzl', name: 'Nueva Zelanda', flag: '🇳🇿', confederation: 'OFC', group: 'G',
    players: [
      'Oliver Sail', 'Stefan Marinovic', 'Michael Woud',
      'Liberato Cacace', 'Winston Reid', 'Nando Pijnaker', 'Michael Boxall',
      'Myer Bevan', 'Joe Bell', 'Clayton Lewis', 'Matthew Garbett',
      'Sarpreet Singh', 'Alex Greive', 'Marko Stamenic', 'Tim Payne',
      'Chris Wood', 'Callan Elliot', 'Dane Ingham',
    ],
  },

  // ── GRUPO H: España · Cabo Verde · Arabia Saudí · Uruguay ─────────
  {
    id: 'esp', name: 'España', flag: '🇪🇸', confederation: 'UEFA', group: 'H',
    players: [
      'Unai Simón', 'David Raya', 'Álex Remiro',
      'Dani Carvajal', 'Aymeric Laporte', 'Pau Cubarsí', 'Alejandro Grimaldo',
      'Robin Le Normand', 'Rodri', 'Fabián Ruiz', 'Martín Zubimendi',
      'Pedri', 'Gavi', 'Dani Olmo', 'Fermín López',
      'Lamine Yamal', 'Nico Williams', 'Álvaro Morata',
    ],
  },
  {
    id: 'cpv', name: 'Cabo Verde', flag: '🇨🇻', confederation: 'CAF', group: 'H',
    players: [
      'Vozinha', 'Edu Água', 'Cláudio Filipe',
      'Stopira', 'Marco Moreno', 'Dylan Tavares', 'Roberto',
      'Filipe Moreira', 'Jamiro Monteiro', 'Ryan Mendes', 'Garry Rodrigues',
      'Fali Candé', 'Nuno Tavares', 'Kenny Rocha', 'Lúcio Antunes',
      'Jovane Cabral', 'Júlio Tavares', 'Bruno Lopes',
    ],
  },
  {
    id: 'ksa', name: 'Arabia Saudí', flag: '🇸🇦', confederation: 'AFC', group: 'H',
    players: [
      'Mohammed Al-Owais', 'Fawaz Al-Qarni', 'Nawaf Al-Aqidi',
      'Sultan Al-Ghannam', 'Ali Al-Bulayhi', 'Hassan Al-Tambakti', 'Abdulelah Al-Amri',
      'Sami Al-Najei', 'Mohamed Kanno', 'Nawaf Al-Abed', 'Sami Al-Naji',
      'Saleh Al-Shehri', 'Salem Al-Dawsari', 'Hattan Bahebri', 'Nasser Al-Dawsari',
      'Firas Al-Buraikan', 'Abdullah Al-Hamdan', 'Musab Al-Juwayr',
    ],
  },
  {
    id: 'uru', name: 'Uruguay', flag: '🇺🇾', confederation: 'CONMEBOL', group: 'H',
    players: [
      'Fernando Muslera', 'Sebastián Sosa', 'Martín Campaña',
      'Guillermo Varela', 'Diego Godín', 'Sebastián Coates', 'Mathías Olivera',
      'Ronald Araújo', 'Lucas Torreira', 'Manuel Ugarte', 'Rodrigo Bentancur',
      'Federico Valverde', 'Nicolás De La Cruz', 'Maxi Gómez', 'Brian Rodríguez',
      'Luis Suárez', 'Darwin Núñez', 'Facundo Torres',
    ],
  },

  // ── GRUPO I: Francia · Senegal · Irak · Noruega ───────────────────
  {
    id: 'fra', name: 'Francia', flag: '🇫🇷', confederation: 'UEFA', group: 'I',
    players: [
      'Mike Maignan', 'Alphonse Areola', 'Brice Samba',
      'William Saliba', 'Raphaël Varane', 'Lucas Digne', 'Theo Hernández',
      'Ibrahima Konaté', 'N\'Golo Kanté', 'Aurélien Tchouaméni', 'Adrien Rabiot',
      'Antoine Griezmann', 'Ousmane Dembélé', 'Kingsley Coman', 'Marcus Thuram',
      'Kylian Mbappé', 'Randal Kolo Muani', 'Bradley Barcola',
    ],
  },
  {
    id: 'sen', name: 'Senegal', flag: '🇸🇳', confederation: 'CAF', group: 'I',
    players: [
      'Edouard Mendy', 'Alfred Gomis', 'Seny Dieng',
      'Bouna Sarr', 'Kalidou Koulibaly', 'Abdou Diallo', 'Ismail Jakobs',
      'Formose Mendy', 'Nampalys Mendy', 'Pape Gueye', 'Lamine Camara',
      'Ismaila Sarr', 'Krepin Diatta', 'Iliman Ndiaye', 'Nicolas Jackson',
      'Sadio Mané', 'Bamba Dieng', 'Habib Diallo',
    ],
  },
  {
    id: 'irq', name: 'Irak', flag: '🇮🇶', confederation: 'AFC', group: 'I',
    players: [
      'Jalal Hassan', 'Mohammed Hameed', 'Fahad Thaeir',
      'Ali Adnan', 'Saad Natiq', 'Bassam Rashid', 'Ahmed Ibrahim',
      'Ali Faez', 'Humam Tariq', 'Alaa Abbas', 'Amjad Attwan',
      'Mohanad Ali', 'Safaa Hadi', 'Ayman Hussein', 'Ali Jasim',
      'Ahmed Yasin', 'Aiham Ousso', 'Dundar Hasrat',
    ],
  },
  {
    id: 'nor', name: 'Noruega', flag: '🇳🇴', confederation: 'UEFA', group: 'I',
    players: [
      'Ørjan Nyland', 'Rune Jarstein', 'Jørgen Strand Larsen',
      'Birger Meling', 'Kristoffer Ajer', 'Stefan Strandberg', 'Olav Bjørn Moen',
      'Leo Østigård', 'Sander Berge', 'Patrick Berg', 'Fredrik Aursnes',
      'Martin Ødegaard', 'Morten Thorsby', 'Mathias Normann', 'Mohamed Elyounoussi',
      'Erling Haaland', 'Alexander Sørloth', 'Antonio Nusa',
    ],
  },

  // ── GRUPO J: Argentina · Argelia · Austria · Jordania ─────────────
  {
    id: 'arg', name: 'Argentina', flag: '🇦🇷', confederation: 'CONMEBOL', group: 'J',
    players: [
      'Emiliano Martínez', 'Gerónimo Rulli', 'Juan Musso',
      'Nahuel Molina', 'Cristian Romero', 'Nicolás Otamendi', 'Nicolás Tagliafico',
      'Lisandro Martínez', 'Rodrigo De Paul', 'Enzo Fernández', 'Leandro Paredes',
      'Alexis Mac Allister', 'Giovani Lo Celso', 'Ángel Di María', 'Alejandro Garnacho',
      'Lionel Messi', 'Lautaro Martínez', 'Julián Álvarez',
    ],
  },
  {
    id: 'alg', name: 'Argelia', flag: '🇩🇿', confederation: 'CAF', group: 'J',
    players: [
      'Raïs M\'Bolhi', 'Alexandre Oukidja', 'Yassine Chourar',
      'Ramy Bensebaini', 'Aïssa Mandi', 'Mohamed Fares', 'Djamel Benlamri',
      'Djamel Eddine Benlamri', 'Yacine Adli', 'Nabil Bentaleb', 'Ismaël Bennacer',
      'Sofiane Feghouli', 'Riyad Mahrez', 'Andy Delort', 'Said Benrahma',
      'Islam Slimani', 'Baghdad Bounedjah', 'Youcef Belaïli',
    ],
  },
  {
    id: 'aut', name: 'Austria', flag: '🇦🇹', confederation: 'UEFA', group: 'J',
    players: [
      'Patrick Pentz', 'Heinz Lindner', 'Alexander Schlager',
      'Stefan Posch', 'David Alaba', 'Maximilian Wöber', 'Philipp Mwene',
      'Kevin Danso', 'Florian Grillitsch', 'Konrad Laimer', 'Nicolas Seiwald',
      'Marcel Sabitzer', 'Florian Kainz', 'Christoph Baumgartner', 'Romano Schmid',
      'Michael Gregoritsch', 'Marko Arnautović', 'Patrick Wimmer',
    ],
  },
  {
    id: 'jor', name: 'Jordania', flag: '🇯🇴', confederation: 'AFC', group: 'J',
    players: [
      'Yahia Nader', 'Mohammad Al-Shagran', 'Amer Shafi',
      'Yazan Al-Naimat', 'Baha Faisal', 'Anas Bani Yaseen', 'Badr Naji',
      'Yosef Alamarat', 'Ahmad Sarour', 'Mahmoud Almardi', 'Yazan Al-Arab',
      'Musa Al-Tamari', 'Mohammad Abu Zema', 'Hamza Al-Dardour', 'Oday Dabbagh',
      'Motaz Nouri', 'Zaid Al-Rashdan', 'Ahmad Rawabdeh',
    ],
  },

  // ── GRUPO K: Portugal · RD Congo · Uzbekistán · Colombia ──────────
  {
    id: 'por', name: 'Portugal', flag: '🇵🇹', confederation: 'UEFA', group: 'K',
    players: [
      'Rui Patrício', 'Diogo Costa', 'José Sá',
      'João Cancelo', 'Rúben Dias', 'Pepe', 'Nuno Mendes',
      'António Silva', 'João Palhinha', 'Vitinha', 'Bruno Fernandes',
      'Bernardo Silva', 'Rafael Leão', 'Pedro Neto', 'João Félix',
      'Cristiano Ronaldo', 'Gonçalo Ramos', 'Francisco Conceição',
    ],
  },
  {
    id: 'cod', name: 'RD Congo', flag: '🇨🇩', confederation: 'CAF', group: 'K',
    players: [
      'Joël Kiassumbua', 'Leyden Dieu-Merci', 'Lionel Mpasi',
      'Chancel Mbemba', 'Arthur Masuaku', 'Marcel Tisserand', 'Fiston Mayele',
      'Nathan Ngoy', 'Samuel Bastien', 'Silas Mvumpa', 'Théo Bongonda',
      'Yannick Bolasie', 'Firmin Mubele', 'Gaël Kakuta', 'Jonathan Bolingi',
      'Cédric Bakambu', 'Benik Afobe', 'Dieumerci Mbokani',
    ],
  },
  {
    id: 'uzb', name: 'Uzbekistán', flag: '🇺🇿', confederation: 'AFC', group: 'K',
    players: [
      'Abduvohid Nishonov', 'Jasurbek Yakhshiboev', 'Dilshod Yusupov',
      'Khusan Murodov', 'Sanjar Tursunov', 'Otabek Shukurov', 'Nodir Ahmedov',
      'Javokhir Sidiqov', 'Bobur Abdullaev', 'Jaloliddin Masharipov', 'Otabek Rakhimov',
      'Sardor Rashidov', 'Farrukh Tashkentov', 'Sherzod Nazarov', 'Husan Hatamov',
      'Eldor Shomurodov', 'Abbosbek Fayzullaev', 'Dostonbek Khamdamov',
    ],
  },
  {
    id: 'col', name: 'Colombia', flag: '🇨🇴', confederation: 'CONMEBOL', group: 'K',
    players: [
      'David Ospina', 'Camilo Vargas', 'Kevin Mier',
      'Santiago Arias', 'Dávinson Sánchez', 'Yerry Mina', 'William Tesillo',
      'Daniel Muñoz', 'Wilmar Barrios', 'Mateus Uribe', 'Richard Ríos',
      'Juan Cuadrado', 'James Rodríguez', 'Jhon Arias', 'Jhon Córdoba',
      'Luis Díaz', 'Rafael Santos Borré', 'Radamel Falcao',
    ],
  },

  // ── GRUPO L: Inglaterra · Croacia · Ghana · Panamá ────────────────
  {
    id: 'eng', name: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation: 'UEFA', group: 'L',
    players: [
      'Jordan Pickford', 'Aaron Ramsdale', 'Dean Henderson',
      'Kieran Trippier', 'John Stones', 'Marc Guehi', 'Luke Shaw',
      'Ezri Konsa', 'Declan Rice', 'Kobbie Mainoo', 'Trent Alexander-Arnold',
      'Jude Bellingham', 'Phil Foden', 'Bukayo Saka', 'Marcus Rashford',
      'Harry Kane', 'Ollie Watkins', 'Cole Palmer',
    ],
  },
  {
    id: 'cro', name: 'Croacia', flag: '🇭🇷', confederation: 'UEFA', group: 'L',
    players: [
      'Dominik Livaković', 'Ivo Grbić', 'Lovre Kalinić',
      'Josip Juranović', 'Joško Gvardiol', 'Duje Ćaleta-Car', 'Borna Sosa',
      'Martin Erlić', 'Luka Modrić', 'Marcelo Brozović', 'Mateo Kovačić',
      'Mario Pašalić', 'Ivan Perišić', 'Lovro Majer', 'Nikola Vlašić',
      'Andrej Kramarić', 'Bruno Petković', 'Ante Budimir',
    ],
  },
  {
    id: 'gha', name: 'Ghana', flag: '🇬🇭', confederation: 'CAF', group: 'L',
    players: [
      'Lawrence Ati-Zigi', 'Joseph Wollacott', 'Richard Ofori',
      'Daniel Amartey', 'Thomas Partey', 'Tariq Lamptey', 'Gideon Mensah',
      'Alexander Djiku', 'Baba Rahman', 'Daniel Kofi Kyereh', 'Elisha Owusu',
      'Mohammed Kudus', 'Andre Ayew', 'Jordan Ayew', 'Osman Bukari',
      'Antoine Semenyo', 'Inaki Williams', 'Kamaldeen Sulemana',
    ],
  },
  {
    id: 'pan', name: 'Panamá', flag: '🇵🇦', confederation: 'CONCACAF', group: 'L',
    players: [
      'Luis Mejía', 'Orlando Mosquera', 'Gianluca Busio',
      'Fidel Escobar', 'Éric Davis', 'Roderick Miller', 'Harold Cummings',
      'Andrés Andrade', 'José Fajardo', 'Adalberto Carrasquilla', 'Aníbal Godoy',
      'Rolando Blackburn', 'Édgar Yoel Bárcenas', 'Ismael Díaz', 'Cristian Martínez',
      'Cecilio Waterman', 'Alberto Quintero', 'Gabriel Torres',
    ],
  },
]

// 20 láminas de introducción (estadios + páginas especiales)
export const INTRO_STICKERS = [
  { number: 1,  type: 'cover',   description: 'Portada Oficial — FIFA World Cup 2026™',     special: true  },
  { number: 2,  type: 'intro',   description: 'Logo Oficial y Mascota "Striker"',            special: true  },
  { number: 3,  type: 'intro',   description: 'Trofeo Copa del Mundo FIFA™',                special: true  },
  { number: 4,  type: 'intro',   description: 'Historia de la Copa del Mundo FIFA™',        special: false },
  { number: 5,  type: 'intro',   description: 'Camino a la Copa / Clasificatorias',         special: false },
  { number: 6,  type: 'intro',   description: 'Récords y Estadísticas Históricas',          special: false },
  { number: 7,  type: 'stadium', description: 'MetLife Stadium — East Rutherford (Final)',  special: false },
  { number: 8,  type: 'stadium', description: 'Estadio Azteca — Ciudad de México',         special: false },
  { number: 9,  type: 'stadium', description: 'Rose Bowl — Los Ángeles',                   special: false },
  { number: 10, type: 'stadium', description: 'AT&T Stadium — Dallas/Arlington',           special: false },
  { number: 11, type: 'stadium', description: 'Hard Rock Stadium — Miami',                 special: false },
  { number: 12, type: 'stadium', description: 'Gillette Stadium — Boston',                 special: false },
  { number: 13, type: 'stadium', description: 'Lumen Field — Seattle',                     special: false },
  { number: 14, type: 'stadium', description: 'Mercedes-Benz Stadium — Atlanta',           special: false },
  { number: 15, type: 'stadium', description: 'Arrowhead Stadium — Kansas City',           special: false },
  { number: 16, type: 'stadium', description: 'Allegiant Stadium — Las Vegas',             special: false },
  { number: 17, type: 'stadium', description: 'BC Place — Vancouver',                      special: false },
  { number: 18, type: 'stadium', description: 'BMO Field — Toronto',                       special: false },
  { number: 19, type: 'stadium', description: 'Estadio BBVA — Guadalupe / Monterrey',      special: false },
  { number: 20, type: 'stadium', description: 'Estadio Akron — Guadalajara',               special: false },
]

const STICKERS_PER_COUNTRY = 20 // 1 escudo (foil) + 1 foto grupal + 18 retratos
let nextNum = INTRO_STICKERS.length + 1

export const COUNTRIES = COUNTRIES_RAW.map((country) => {
  const stickers = []

  stickers.push({
    number: nextNum++, type: 'badge',
    description: `Escudo — ${country.name}`, special: true,
  })
  stickers.push({
    number: nextNum++, type: 'team',
    description: `Foto Grupal — ${country.name}`, special: false,
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

// 20 intro + 48 × 20 = 20 + 960 = 980
export const TOTAL_STICKERS = INTRO_STICKERS.length + COUNTRIES.length * STICKERS_PER_COUNTRY

export const ALL_STICKERS = [
  ...INTRO_STICKERS.map((s) => ({ ...s, countryId: 'intro', countryName: 'Introducción' })),
  ...COUNTRIES.flatMap((c) =>
    c.stickers.map((s) => ({ ...s, countryId: c.id, countryName: c.name, flag: c.flag }))
  ),
]
