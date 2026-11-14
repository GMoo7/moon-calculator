// Textos de la pantalla "Cómo funciona" (español).
// Edita los textos aquí. No hace falta saber programar: deja las comillas y las comas.

export const about = {
  title: "Cómo funciona la calculadora de salida de la Luna",

  // Se muestra primero, antes de la guía de fases lunares.
  intro: [
    {
      title: "¿Cómo se calcula la salida de la Luna?",
      text: "La calculadora sigue a la Luna por el cielo durante el día elegido, con las mismas matemáticas orbitales que usan los astrónomos. La salida de la Luna es el momento en que su borde superior aparece sobre un horizonte plano y despejado. La puesta es el momento en que desaparece.",
    },
    {
      title: "¿Por qué cambia la salida de la Luna cada día?",
      text: "La Luna gira alrededor de la Tierra en el mismo sentido en que la Tierra rota, así que cada día sale unos 50 minutos más tarde que el anterior. La luna llena sale hacia la puesta del Sol, y la luna nueva hacia el amanecer.",
    },
    {
      title: "¿Por qué a veces no hay salida de la Luna?",
      text: "Como la Luna sale un poco más tarde cada día, una vez al mes se salta un día del calendario: la Luna sale poco antes de medianoche un día y poco después de medianoche al siguiente. Cerca de los polos, la Luna también puede quedarse sobre el horizonte, o bajo él, durante todo un día.",
    },
  ],

  phasesTitle: "Las ocho fases de la Luna",
  phasesIntro:
    "La Luna completa un ciclo en unos 29,5 días. Los dibujos muestran la Luna vista desde el hemisferio norte. En el hemisferio sur el lado iluminado queda en el lado opuesto, y la calculadora lo voltea por ti.",

  // Una línea por cada fase, en el mismo orden que phaseNames en ui.js.
  phaseText: [
    "La Luna está entre la Tierra y el Sol, así que la cara que vemos está oscura. Sale y se pone con el Sol y no se ve.",
    "Una fina media luna aparece baja en el oeste después del atardecer. Cada noche se hace más gruesa.",
    "La mitad de la cara que vemos está iluminada. Sale hacia el mediodía y está alta en el cielo al atardecer.",
    "Más de la mitad está iluminada. Sale por la tarde y brilla durante gran parte de la noche.",
    "Toda la cara está iluminada. Sale al atardecer y se pone al amanecer, así que está en el cielo toda la noche.",
    "Va perdiendo luz poco a poco. Sale después del atardecer, cada noche un poco más tarde, y sigue en el cielo después del amanecer.",
    "De nuevo la mitad está iluminada, pero en el lado opuesto. Sale hacia la medianoche y está alta en el cielo al amanecer.",
    "Una fina media luna que sale en las horas previas al amanecer, baja en el este.",
  ],

  // Se muestra al final, después de la guía de fases lunares.
  outro: [
    {
      title: "¿Qué precisión tiene?",
      text: "Comparamos los resultados con un segundo programa de astronomía en dieciséis ciudades del mundo. Las horas suelen coincidir con menos de un minuto de diferencia, y con unos 3 minutos en el extremo norte. Las colinas, los edificios y el tiempo cambian el momento en que realmente ves la Luna, así que deja un pequeño margen.",
    },
    {
      title: "Privacidad",
      text: "Todo se calcula en tu navegador. El lugar que eliges se guarda solo en tu propio dispositivo. Cuando buscas una ciudad, su nombre se envía al servicio de búsqueda gratuito Open-Meteo para que devuelva las coordenadas.",
    },
  ],
};
