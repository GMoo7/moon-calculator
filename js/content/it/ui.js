// Ogni etichetta, pulsante e messaggio del sito (italiano).
// {name}, {zone} e simili vengono riempiti dal codice: lasciali come sono.

export const ui = {
  siteName: "Calcolatore del sorgere della Luna",
  menu: { home: "Calcolatore", week: "Tabella 7 giorni", about: "Come funziona" },
  footer: "Calcolato nel tuo browser, con una precisione di un paio di minuti.",

  picker: {
    placeholder: "Cerca una città, es. Roma",
    inputLabel: "Nome della città",
    search: "Cerca",
    useMyLocation: "Usa la mia posizione",
    showing: "Località: {name}",
    prompt: "Cerca una città o usa la tua posizione.",
    searching: "Ricerca in corso…",
    pickPlace: "Scegli il tuo luogo:",
    notFound: "Nessuna città trovata. Controlla l'ortografia.",
    searchFailed: "Impossibile raggiungere la ricerca delle città. Controlla la connessione e riprova.",
    noGeolocation: "Il tuo browser non può condividere la posizione. Cerca invece una città.",
    finding: "Sto cercando la tua posizione…",
    locationFailed: "Impossibile ottenere la tua posizione. Cerca invece una città.",
    myLocation: "La mia posizione",
  },

  home: {
    dateLabel: "Data",
    previousDay: "Giorno precedente",
    nextDay: "Giorno successivo",
    noCity: "Nessuna città scelta",
    moonrise: "Sorgere della Luna",
    moonset: "Tramonto della Luna",
    moonPhase: "Fase lunare",
    lit: "{percent} illuminata",
    phaseLabel: "{name}, {percent} illuminata",
    chooseCity: "{lit}. Scegli una città per vedere quando sorge la Luna.",
    look: "Guarda verso {bearing} all'orizzonte.",
    timesIn: "Gli orari sono nel fuso orario {zone}.",
  },

  week: {
    title: "Orari del sorgere della Luna per i prossimi 7 giorni",
    chooseCity: "Scegli una città qui sopra per vedere i prossimi 7 giorni.",
    columns: ["Data", "Sorgere", "Tramonto", "Fase"],
    note: "Gli orari sono nel fuso orario {zone}. Un trattino (—) significa che quel giorno la Luna non sorge o non tramonta.",
  },

  shift: {
    same: "Circa alla stessa ora del giorno prima.",
    laterOne: "1 minuto dopo rispetto al giorno prima.",
    laterMany: "{n} minuti dopo rispetto al giorno prima.",
    earlierOne: "1 minuto prima rispetto al giorno prima.",
    earlierMany: "{n} minuti prima rispetto al giorno prima.",
  },

  missing: {
    alwaysUp: "La Luna resta sopra l'orizzonte tutto il giorno",
    neverUp: "La Luna resta sotto l'orizzonte tutto il giorno",
    noRise: "Nessun sorgere della Luna in questo giorno",
    noSet: "Nessun tramonto della Luna in questo giorno",
  },

  // Nord, nord-est, est ... in quest'ordine.
  compass: ["N", "NE", "E", "SE", "S", "SO", "O", "NO"],

  // Le otto fasi, a partire dalla Luna nuova.
  phaseNames: [
    "Luna nuova",
    "Falce crescente",
    "Primo quarto",
    "Gibbosa crescente",
    "Luna piena",
    "Gibbosa calante",
    "Ultimo quarto",
    "Falce calante",
  ],

  // Nomi delle città a un tocco. Le coordinate sono in js/config.js.
  cities: {
    london: "Londra, Regno Unito",
    newYork: "New York, Stati Uniti",
    losAngeles: "Los Angeles, Stati Uniti",
    saoPaulo: "San Paolo, Brasile",
    dubai: "Dubai, Emirati Arabi Uniti",
    mumbai: "Mumbai, India",
    tokyo: "Tokyo, Giappone",
    sydney: "Sydney, Australia",
  },
};
