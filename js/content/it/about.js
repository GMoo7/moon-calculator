// Testi della schermata "Come funziona" (italiano).
// Modifica i testi qui. Non serve saper programmare: lascia le virgolette e le virgole.

export const about = {
  title: "Come funziona il calcolatore del sorgere della Luna",

  // Mostrato per primo, prima della guida alle fasi lunari.
  intro: [
    {
      title: "Come si calcola il sorgere della Luna?",
      text: "Il calcolatore segue la Luna nel cielo per il giorno scelto, usando la stessa matematica orbitale degli astronomi. Il sorgere della Luna è il momento in cui il bordo superiore della Luna compare sopra un orizzonte piatto e libero. Il tramonto è il momento in cui scompare.",
    },
    {
      title: "Perché il sorgere della Luna cambia ogni giorno?",
      text: "La Luna gira intorno alla Terra nella stessa direzione in cui la Terra ruota, quindi ogni giorno sorge circa 50 minuti più tardi del giorno prima. La Luna piena sorge più o meno al tramonto, la Luna nuova più o meno all'alba.",
    },
    {
      title: "Perché a volte non c'è il sorgere della Luna?",
      text: "Poiché la Luna sorge un po' più tardi ogni giorno, circa una volta al mese un giorno del calendario viene saltato: la Luna sorge poco prima di mezzanotte un giorno e poco dopo mezzanotte il giorno seguente. Vicino ai poli la Luna può anche restare sopra o sotto l'orizzonte per un giorno intero.",
    },
  ],

  phasesTitle: "Le otto fasi lunari",
  phasesIntro:
    "La Luna compie un ciclo completo in circa 29,5 giorni. I disegni mostrano la Luna come si vede dall'emisfero nord. Nell'emisfero sud il lato illuminato è dalla parte opposta, e il calcolatore lo capovolge per te.",

  // Una riga per ogni fase, nello stesso ordine di phaseNames in ui.js.
  phaseText: [
    "La Luna si trova tra la Terra e il Sole, quindi il lato rivolto verso di noi è buio. Sorge e tramonta insieme al Sole e non si vede.",
    "Una sottile falce compare bassa a ovest dopo il tramonto. Ogni notte diventa più spessa.",
    "Metà della faccia che vediamo è illuminata. Sorge verso mezzogiorno ed è alta nel cielo al tramonto.",
    "Più della metà è illuminata. Sorge nel pomeriggio e splende per gran parte della sera.",
    "Tutta la faccia è illuminata. Sorge al tramonto e tramonta all'alba, quindi resta nel cielo tutta la notte.",
    "Perde lentamente la sua luce. Sorge dopo il tramonto, ogni notte un po' più tardi, ed è ancora in cielo dopo l'alba.",
    "Di nuovo mezza illuminata, ma dalla parte opposta. Sorge verso mezzanotte ed è alta nel cielo all'alba.",
    "Una sottile falce che sorge nelle ore prima dell'alba, bassa a est.",
  ],

  // Mostrato per ultimo, dopo la guida alle fasi lunari.
  outro: [
    {
      title: "Quanto è preciso?",
      text: "Abbiamo confrontato i risultati con un secondo programma di astronomia per sedici città del mondo. Gli orari di solito coincidono entro un minuto, ed entro circa 3 minuti all'estremo nord. Colline, edifici e meteo cambiano il momento in cui vedi davvero la Luna, quindi lascia un po' di margine.",
    },
    {
      title: "Privacy",
      text: "Tutto viene calcolato nel tuo browser. Il luogo scelto è salvato solo sul tuo dispositivo. Quando cerchi una città, il nome della città viene inviato al servizio di ricerca gratuito Open-Meteo, che restituisce le coordinate.",
    },
  ],
};
