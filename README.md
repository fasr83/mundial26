# MUNDIAL26 — Mi Álbum Panini 🏆

Aplicación web completa para seguir el álbum Panini del Mundial 2026 y consultar el calendario oficial con horarios LATAM.

## Características

### Módulo 1: Álbum Panini
- 48 selecciones clasificadas con 634 stickers totales
- Marcar stickers como **Conseguido** (clic) o **Repetido** (doble clic)
- Progreso por país con barra animada
- Panel de resumen global: cuántos tengo, faltan, repetidos
- **Exportar lista de faltantes**: copiar al portapapeles o descargar TXT
- Filtros: Todos / En progreso / Completos / Sin empezar
- Filtro por confederación (CONMEBOL, UEFA, CONCACAF, CAF, AFC, OFC)
- Buscador por nombre de país
- Confeti animado al completar un país al 100%
- Persistencia en `localStorage`

### Módulo 2: Calendario FIFA World Cup 2026
- 104 partidos completos (72 grupos + 32 eliminatorias)
- Horarios convertidos para 11 zonas LATAM automáticamente
- Selector de país/zona horaria
- Canales de TV por país para cada partido
- Vista Lista y Vista Calendario (Junio/Julio)
- Favoritos con estrella (persistidos en localStorage)
- Resaltado especial para partidos del día de hoy
- Modal de partido con todos los detalles: horarios LATAM, canales, sede
- Filtros por fase, grupo, equipo/sede

## Instalación y uso

```bash
cd mundial26
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Build para producción

```bash
npm run build
npm run preview
```

El resultado en `/dist` es un sitio estático desplegable en Netlify, Vercel, GitHub Pages, etc.

## Stack técnico

- **React 18** + Hooks
- **Vite 5** (bundler)
- **Tailwind CSS 3** (estilos custom con tema FIFA 2026)
- **Lucide React** (iconografía)
- **localStorage** (persistencia client-side)
- Sin backend — 100% estático

## Estructura del proyecto

```
mundial26/
├── src/
│   ├── data/
│   │   ├── countries.js    # 48 selecciones + generación de stickers
│   │   └── partidos.js     # 104 partidos + zonas horarias + canales TV
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── album/
│   │   │   ├── AlbumModule.jsx
│   │   │   ├── CountryGrid.jsx
│   │   │   ├── CountryDetail.jsx
│   │   │   ├── StickerCard.jsx
│   │   │   └── GlobalSummary.jsx
│   │   └── calendar/
│   │       ├── CalendarModule.jsx
│   │       ├── MatchCard.jsx
│   │       └── MatchModal.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Notas

- Los horarios de los partidos de grupos son aproximados (el calendario oficial FIFA se publicará antes del torneo).
- Las fases eliminatorias muestran "Por definir" hasta que se conozcan los clasificados.
- Los canales de TV pueden variar según los derechos de transmisión finales para 2026.
