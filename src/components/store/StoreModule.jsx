import { ShoppingCart, Package, BookOpen, Star, Truck, Shield, ExternalLink, Tag, Zap } from 'lucide-react'

const PANINI_STORE_URL = 'https://paninitienda.com'

const PRODUCTS = [
  {
    id: 'album',
    name: 'Álbum Oficial Panini',
    subtitle: 'Copa Mundial de la FIFA 2026™',
    price: null,
    priceLabel: 'Consultar precio',
    image: '📒',
    badge: 'OFICIAL',
    badgeColor: 'bg-fifa-gold text-black',
    description: '112 páginas · 980 láminas en total · Edición Filial y Export',
    details: [
      '112 páginas a todo color',
      '20 láminas por selección',
      '18 retratos + 1 foto grupal + 1 escudo foil',
      '20 láminas de estadios y páginas especiales',
      '20 láminas extra de jugadores en acción',
      'Disponible en versión Filial y Export',
    ],
    highlight: true,
    url: `${PANINI_STORE_URL}/collections/mundial-2026`,
  },
  {
    id: 'pack',
    name: 'Sobre de Láminas',
    subtitle: '7 láminas + 1 extra aleatoria',
    price: null,
    priceLabel: 'Consultar precio',
    image: '✉️',
    badge: '7 LÁMINAS',
    badgeColor: 'bg-blue-600 text-white',
    description: '7 láminas por sobre + 1 lámina extra insertada aleatoriamente',
    details: [
      '7 láminas oficiales por sobre',
      '1 lámina extra aleatoria incluida',
      'Posibilidad de láminas brillantes especiales',
      'Láminas de jugadores en acción (1 cada ~100 sobres)',
      'Coleccionables en 4 variantes de color',
      'Empaque oficial sellado',
    ],
    highlight: false,
    url: `${PANINI_STORE_URL}/collections/mundial-2026`,
  },
  {
    id: 'box',
    name: 'Display Box Oficial',
    subtitle: '104 sobres = 728 láminas',
    price: null,
    priceLabel: 'Consultar precio',
    image: '📦',
    badge: '104 SOBRES',
    badgeColor: 'bg-purple-600 text-white',
    description: 'Caja display oficial con 104 sobres para completar tu álbum más rápido',
    details: [
      '104 sobres oficiales por caja',
      '728 láminas mínimas garantizadas',
      '~104 láminas extra aleatorias adicionales',
      'Ideal para intercambiar con amigos',
      'Embalaje oficial Panini sellado',
      'Mejor relación precio por lámina',
    ],
    highlight: false,
    url: `${PANINI_STORE_URL}/collections/mundial-2026`,
  },
  {
    id: 'tin',
    name: 'Pack Especial de Inicio',
    subtitle: 'Álbum + 6 sobres',
    price: null,
    priceLabel: 'Consultar precio',
    image: '🎁',
    badge: 'PACK INICIO',
    badgeColor: 'bg-green-600 text-white',
    description: 'Álbum oficial más 6 sobres para arrancar tu colección de inmediato',
    details: [
      'Álbum oficial de 112 páginas incluido',
      '6 sobres de láminas incluidos',
      '42+ láminas para comenzar',
      'Perfecto como regalo',
      'Presentación especial de colección',
      'Producto oficial licenciado FIFA',
    ],
    highlight: false,
    url: `${PANINI_STORE_URL}/collections/mundial-2026`,
  },
]

const LATAM_STORES = [
  { country: '🇲🇽 México',     url: 'https://paninitienda.com',            name: 'Panini Tienda MX' },
  { country: '🇦🇷 Argentina',  url: 'https://paninitienda.com',            name: 'Panini Tienda AR' },
  { country: '🇨🇴 Colombia',   url: 'https://paninitienda.com',            name: 'Panini Tienda CO' },
  { country: '🇨🇱 Chile',      url: 'https://paninitienda.com',            name: 'Panini Tienda CL' },
  { country: '🇧🇷 Brasil',     url: 'https://paninitienda.com.br',         name: 'Panini Brasil' },
  { country: '🇵🇪 Perú',       url: 'https://paninitienda.com',            name: 'Panini Tienda PE' },
  { country: '🇺🇾 Uruguay',    url: 'https://paninitienda.com',            name: 'Panini Tienda UY' },
  { country: '🇻🇪 Venezuela',  url: 'https://paninitienda.com',            name: 'Panini Tienda VE' },
  { country: '🇪🇨 Ecuador',    url: 'https://paninitienda.com',            name: 'Panini Tienda EC' },
  { country: '🇵🇾 Paraguay',   url: 'https://paninitienda.com',            name: 'Panini Tienda PY' },
  { country: '🇧🇴 Bolivia',    url: 'https://paninitienda.com',            name: 'Panini Tienda BO' },
]

const STATS = [
  { icon: '📒', value: '980',  label: 'Láminas totales' },
  { icon: '👕', value: '48',   label: 'Selecciones' },
  { icon: '📄', value: '112',  label: 'Páginas' },
  { icon: '✉️', value: '7',    label: 'Láminas por sobre' },
]

export default function StoreModule() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-4xl text-gradient-gold tracking-wider">
          TIENDA PANINI
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Álbum Oficial FIFA World Cup 2026™ · Compra directamente en la tienda oficial
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="bg-fifa-card border border-fifa-border rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">{s.icon}</div>
            <div className="font-display text-2xl text-gradient-gold">{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className={`relative bg-fifa-card border rounded-2xl p-6 transition-all hover:border-fifa-gold/50 hover:shadow-lg hover:shadow-fifa-gold/10 ${
              product.highlight ? 'border-fifa-gold/60 shadow-md shadow-fifa-gold/10' : 'border-fifa-border'
            }`}
          >
            {/* Badge */}
            <span className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full ${product.badgeColor}`}>
              {product.badge}
            </span>

            {/* Icon + title */}
            <div className="flex items-start gap-4 mb-4">
              <div className="text-5xl leading-none">{product.image}</div>
              <div>
                <h3 className={`font-display text-xl tracking-wide ${product.highlight ? 'text-gradient-gold' : 'text-white'}`}>
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm">{product.subtitle}</p>
                <p className="text-gray-500 text-xs mt-1">{product.description}</p>
              </div>
            </div>

            {/* Details */}
            <ul className="space-y-1.5 mb-5">
              {product.details.map((d, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-fifa-gold text-xs">✓</span>
                  {d}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all
                bg-gradient-to-r from-fifa-gold/90 to-yellow-400/90 text-black hover:from-fifa-gold hover:to-yellow-300
                shadow-lg shadow-yellow-500/20"
            >
              <ShoppingCart className="w-4 h-4" />
              Comprar en Panini Tienda Oficial
              <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
            </a>
          </div>
        ))}
      </div>

      {/* Key facts banner */}
      <div className="bg-gradient-to-r from-fifa-navy/30 to-fifa-card2 border border-fifa-navy/50 rounded-2xl p-5 mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-fifa-gold fill-fifa-gold" />
          <h3 className="font-display text-xl text-white tracking-wide">DATOS CLAVE DEL ÁLBUM</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-fifa-gold shrink-0" />
              <span>20 láminas extra únicas de jugadores en acción</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-fifa-gold shrink-0" />
              <span>4 variantes de color en láminas especiales</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-fifa-gold shrink-0" />
              <span>Las láminas extra salen ~cada 100 sobres</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-fifa-gold shrink-0" />
              <span>Misma estructura que el álbum Qatar 2022</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-fifa-gold shrink-0" />
              <span>1 escudo oficial en material especial por selección</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-fifa-gold shrink-0" />
              <span>Disponible en versión Filial y Export</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-fifa-gold shrink-0" />
              <span>Envíos a toda LATAM desde tienda oficial</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-fifa-gold shrink-0" />
              <span>Producto 100% oficial licenciado FIFA</span>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-fifa-gold shrink-0" />
              <span>Display Box: 104 sobres por caja</span>
            </div>
          </div>
        </div>
      </div>

      {/* LATAM stores */}
      <div>
        <h3 className="font-display text-2xl text-gradient-gold tracking-wider mb-4">
          TIENDAS PANINI EN LATINOAMÉRICA
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {LATAM_STORES.map((store) => (
            <a
              key={store.country}
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-fifa-card border border-fifa-border hover:border-fifa-gold/50 rounded-xl px-4 py-3 transition-all group"
            >
              <span className="text-lg leading-none">{store.country.split(' ')[0]}</span>
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-fifa-gold transition-colors">
                  {store.country.split(' ').slice(1).join(' ')}
                </div>
                <div className="text-xs text-gray-600">Tienda oficial</div>
              </div>
              <ExternalLink className="w-3 h-3 text-gray-600 group-hover:text-fifa-gold ml-auto transition-colors" />
            </a>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-gray-700 mt-8">
        Todos los precios y disponibilidad son manejados directamente por Panini.
        MUNDIAL26 no procesa pagos ni almacena datos de compra — te redirigimos a la tienda oficial.
      </p>
    </div>
  )
}
