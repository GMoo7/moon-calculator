// Lo que necesitan los buscadores y la cabecera de la página (español):
// títulos, descripciones, nombre del idioma. Lo usa tools/build.mjs, no el navegador.

export const meta = {
  languageName: "Español",
  ogLocale: "es_ES",
  languageMenu: "Idioma",
  chooseLanguage: "Elige tu idioma",
  tagline: "Horas de salida y puesta de la Luna para cualquier ciudad y fecha.",
  noscript: "Esta calculadora necesita JavaScript. Actívalo y vuelve a cargar la página.",
  notFound: {
    title: "Página no encontrada",
    text: "No hemos encontrado esa página.",
    link: "Ir a la página de inicio",
  },
  pages: {
    home: {
      title: "Calculadora de salida de la Luna – ¿A qué hora sale la Luna esta noche?",
      description:
        "Calculadora gratuita de salida y puesta de la Luna. Consulta a qué hora sale la Luna hoy, esta noche o en cualquier fecha para cualquier ciudad, con la fase lunar y hacia dónde mirar.",
    },
    week: {
      title: "Horas de salida de la Luna de los próximos 7 días – Calculadora",
      description:
        "Salida, puesta y fase de la Luna de los próximos 7 días en cualquier ciudad, en una sola tabla. Planea cuándo ver salir la Luna esta semana.",
    },
    about: {
      title: "Cómo se calcula la salida de la Luna y las 8 fases lunares – Calculadora",
      description:
        "Descubre por qué la Luna sale cada día unos 50 minutos más tarde, por qué algunos días no hay salida y cómo son las ocho fases de la Luna.",
    },
  },
};
