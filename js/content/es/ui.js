// Cada etiqueta, botón y mensaje del sitio (español).
// {name}, {zone} y similares los rellena el código: déjalos tal como están.

export const ui = {
  siteName: "Calculadora de salida de la Luna",
  menu: { home: "Calculadora", week: "Tabla de 7 días", about: "Cómo funciona" },
  footer: "Calculado en tu navegador, con una precisión de un par de minutos.",

  picker: {
    placeholder: "Busca una ciudad, p. ej. Madrid",
    inputLabel: "Nombre de la ciudad",
    search: "Buscar",
    useMyLocation: "Usar mi ubicación",
    showing: "Mostrando {name}",
    prompt: "Busca una ciudad o usa tu ubicación.",
    searching: "Buscando…",
    pickPlace: "Elige tu lugar:",
    notFound: "No se encontró ninguna ciudad. Revisa la ortografía.",
    searchFailed: "No se pudo conectar con la búsqueda de ciudades. Revisa tu conexión e inténtalo de nuevo.",
    noGeolocation: "Tu navegador no puede compartir su ubicación. Busca una ciudad en su lugar.",
    finding: "Buscando tu ubicación…",
    locationFailed: "No se pudo obtener tu ubicación. Busca una ciudad en su lugar.",
    myLocation: "Mi ubicación",
  },

  home: {
    dateLabel: "Fecha",
    previousDay: "Día anterior",
    nextDay: "Día siguiente",
    noCity: "Aún no has elegido ciudad",
    moonrise: "Salida de la Luna",
    moonset: "Puesta de la Luna",
    moonPhase: "Fase lunar",
    lit: "{percent} iluminada",
    phaseLabel: "{name}, {percent} iluminada",
    chooseCity: "{lit}. Elige una ciudad para ver cuándo sale la Luna.",
    look: "Mira hacia {bearing} en el horizonte.",
    timesIn: "Las horas están en la zona horaria {zone}.",
  },

  week: {
    title: "Horas de salida de la Luna de los próximos 7 días",
    chooseCity: "Elige una ciudad arriba para ver los próximos 7 días.",
    columns: ["Fecha", "Salida", "Puesta", "Fase"],
    note: "Las horas están en la zona horaria {zone}. Un guion (—) significa que ese día la Luna no sale o no se pone.",
  },

  shift: {
    same: "Aproximadamente a la misma hora que el día anterior.",
    laterOne: "1 minuto más tarde que el día anterior.",
    laterMany: "{n} minutos más tarde que el día anterior.",
    earlierOne: "1 minuto más temprano que el día anterior.",
    earlierMany: "{n} minutos más temprano que el día anterior.",
  },

  missing: {
    alwaysUp: "La Luna permanece sobre el horizonte todo el día",
    neverUp: "La Luna permanece bajo el horizonte todo el día",
    noRise: "No hay salida de la Luna este día",
    noSet: "No hay puesta de la Luna este día",
  },

  // Norte, noreste, este ... en este orden.
  compass: ["N", "NE", "E", "SE", "S", "SO", "O", "NO"],

  // Las ocho fases, empezando por la Luna nueva.
  phaseNames: [
    "Luna nueva",
    "Luna creciente",
    "Cuarto creciente",
    "Gibosa creciente",
    "Luna llena",
    "Gibosa menguante",
    "Cuarto menguante",
    "Luna menguante",
  ],

  // Nombres de las ciudades de un toque. Las coordenadas están en js/config.js.
  cities: {
    london: "Londres, Reino Unido",
    newYork: "Nueva York, Estados Unidos",
    losAngeles: "Los Ángeles, Estados Unidos",
    saoPaulo: "São Paulo, Brasil",
    dubai: "Dubái, Emiratos Árabes Unidos",
    mumbai: "Bombay, India",
    tokyo: "Tokio, Japón",
    sydney: "Sídney, Australia",
  },
};
