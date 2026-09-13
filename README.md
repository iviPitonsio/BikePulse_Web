# BikePulse

BikePulse es una aplicación web que ofrece información en tiempo real sobre el estado de las estaciones de bicicletas de la ciudad de A Coruña. El frontend consume una API propia que centraliza los datos de la red de bicis compartidas y los muestra de forma clara, visual e interactiva.

## Características

- **Resumen de la red**: número de estaciones totales y operativas, bicicletas libres, huecos disponibles y capacidad total.
- **Estaciones llenas y vacías**: lista de estaciones sin bicicletas disponibles o sin huecos libres.
- **Ranking**: las estaciones con más bicicletas disponibles.
- **Buscador de estaciones**: filtro en tiempo real por nombre, con barra de ocupación y código de color según el nivel de bicicletas disponibles.
- **Detalle de estación**: dirección, código postal, capacidad, disponibilidad, si admite alquiler/devolución y si es estación de carga o virtual.
- **Gráfica de disponibilidad**: evolución del número de bicicletas disponibles a lo largo del tiempo.
- **Historial de estados**: registro del estado de cada estación en cada actualización.
- **Animaciones**: efectos de scroll y entrada de elementos con GSAP y ScrollTrigger.
- **Diseño responsive**: optimizado para móvil y escritorio.

## Tecnologías

- Astro 7
- Tailwind CSS 4
- JavaScript
- GSAP (con ScrollTrigger) + SplitType

## Estructura del proyecto

```text
/
├── public/
│   ├── bike.ico
├── src/
│   ├── components/
│   │   ├── EmptyStations.astro
│   │   ├── Footer.astro
│   │   ├── FullStations.astro
│   │   ├── Loading.astro
│   │   ├── Ranking.astro
│   │   ├── StationList.astro
│   │   └── Summary.astro
│   ├── css/
│   │   └── style.css
│   ├── fonts/
│   │   └── Valve.otf
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro      # Panel principal
│   │   └── station.astro    # Detalle de estación
│   └── scripts/
│       ├── animations.js
│       ├── app.js
│       ├── config.js        # Configuración de la API
│       └── station.js
├── astro.config.mjs
├── package.json
└── tsconfig.json
```


## API backend

La aplicación consume una API REST propia alojada en Render:

`https://bikepulseconnection.onrender.com`

La URL se configura en `src/scripts/config.js`. Endpoints utilizados:

- `/station/summary` — resumen de la red
- `/stations` — listado de estaciones
- `/station/ranking` — ranking por bicicletas disponibles
- `/station/full` — estaciones llenas
- `/station/empty` — estaciones vacías
- `/station/:id` — datos de una estación
- `/station/:id/status` — estado actual de una estación
- `/station/:id/history` — historial de una estación

## Licencia

Todos los derechos reservados. &copy; 2026 Iván Iglesias.
