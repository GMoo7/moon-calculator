// Words shown on the "How it works" screen (English).
// Edit the text here. No code knowledge needed: keep the quotes and commas.

export const about = {
  title: "How the moonrise calculator works",

  // Shown first, before the moon phase guide.
  intro: [
    {
      title: "How is moonrise worked out?",
      text: "The calculator follows the moon across the sky for your chosen day, using the same orbit maths astronomers use. Moonrise is the moment the top edge of the moon appears above a flat, open horizon. Moonset is the moment it disappears.",
    },
    {
      title: "Why does moonrise change every day?",
      text: "The moon travels around the Earth in the same direction the Earth spins, so each day it rises about 50 minutes later than the day before. A full moon rises around sunset, and a new moon rises around sunrise.",
    },
    {
      title: "Why is there sometimes no moonrise?",
      text: "Because the moon rises later each day, about once a month a calendar day is skipped: the moon rises just before midnight on one day and just after midnight on the next. Close to the poles the moon can also stay up, or stay down, for a whole day.",
    },
  ],

  phasesTitle: "The eight moon phases",
  phasesIntro:
    "The moon makes one full cycle in about 29.5 days. The drawings show the moon as seen from the northern hemisphere. In the southern hemisphere the lit side is on the opposite side, and the calculator flips it for you.",

  // One line for each phase, in the same order as phaseNames in ui.js.
  phaseText: [
    "The moon sits between the Earth and the sun, so the side facing us is dark. It rises and sets with the sun and cannot be seen.",
    "A thin crescent appears low in the west after sunset. It gets thicker each night.",
    "Half of the face we see is lit. It rises around midday and is high in the sky at sunset.",
    "More than half is lit. It rises in the afternoon and shines for most of the evening.",
    "The whole face is lit. It rises around sunset and sets around sunrise, so it is up all night.",
    "Slowly losing its light. It rises after sunset, a little later each night, and is still up after sunrise.",
    "Half is lit again, on the opposite side. It rises around midnight and is high in the sky at sunrise.",
    "A thin crescent that rises in the hours before sunrise, low in the east.",
  ],

  // Shown last, after the moon phase guide.
  outro: [
    {
      title: "How accurate is it?",
      text: "We compared the results with a second astronomy program for sixteen cities around the world. Times usually match within a minute, and within about 3 minutes in the far north. Hills, buildings and weather change when you actually see the moon, so allow a little extra time.",
    },
    {
      title: "Privacy",
      text: "Everything is calculated in your browser. Your chosen place is saved only on your own device. When you search for a city, the city name is sent to the free Open-Meteo search service so it can return coordinates.",
    },
  ],
};
