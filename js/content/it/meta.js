// Ciò che serve ai motori di ricerca e all'intestazione della pagina (italiano):
// titoli, descrizioni, nome della lingua. Usato da tools/build.mjs, non dal browser.

export const meta = {
  languageName: "Italiano",
  ogLocale: "it_IT",
  languageMenu: "Lingua",
  chooseLanguage: "Scegli la tua lingua",
  tagline: "Orari del sorgere e del tramonto della Luna per qualsiasi città e data.",
  noscript: "Questo calcolatore richiede JavaScript. Attivalo e ricarica la pagina.",
  notFound: {
    title: "Pagina non trovata",
    text: "Non abbiamo trovato questa pagina.",
    link: "Vai alla pagina iniziale",
  },
  pages: {
    home: {
      title: "Calcolatore del sorgere della Luna – A che ora sorge la Luna stasera?",
      description:
        "Calcolatore gratuito del sorgere e del tramonto della Luna. Scopri a che ora sorge la Luna oggi, stasera o in qualsiasi data per qualsiasi città, con fase lunare e direzione in cui guardare.",
    },
    week: {
      title: "Orari del sorgere della Luna per i prossimi 7 giorni – Calcolatore",
      description:
        "Sorgere, tramonto e fase della Luna per i prossimi 7 giorni in qualsiasi città, in un'unica tabella. Pianifica quando guardare sorgere la Luna questa settimana.",
    },
    about: {
      title: "Come si calcola il sorgere della Luna e le 8 fasi lunari – Calcolatore",
      description:
        "Scopri perché la Luna sorge ogni giorno circa 50 minuti più tardi, perché alcuni giorni non c'è il sorgere e come sono fatte le otto fasi lunari.",
    },
  },
};
