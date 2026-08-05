/**
 * Dati anagrafici del locale.
 *
 * PROVENIENZA DI OGNI CAMPO (nessun dato inventato):
 *  - indirizzo  → didascalie Instagram nel PDF `eventi.pdf`
 *                 ("Piazza Palazzo, L'Aquila" e "📍 Piazza Palazzo 1")
 *  - orari      → tabella orari del sito statico precedente (index.html)
 *  - social     → link del sito statico precedente
 *  - prenotazioni → link Pienissimo del sito statico precedente
 *
 * I campi lasciati a `null` NON sono presenti nei materiali forniti:
 * riempirli qui e compariranno automaticamente in header, contatti e footer.
 */

export const site = {
  nome: "Disorder Public House",
  nomeBreve: "Disorder",
  claim: "Irish Pub & Gastropub",
  slogan: "Dove il disordine\nè di casa",
  sottotitolo: "Irish pub e gastropub nel cuore di L'Aquila",

  citta: "L'Aquila",
  indirizzo: {
    via: "Piazza Palazzo 1",
    cap: null as string | null, // non presente nei materiali
    citta: "L'Aquila",
    provincia: "AQ",
    paese: "Italia",
  },

  /** Ricerca usata per l'embed della mappa. */
  mappaQuery: "Disorder Public House, Piazza Palazzo, L'Aquila",

  contatti: {
    telefono: null as string | null, // non presente nei materiali
    email: null as string | null, // non presente nei materiali
    prenotazioni: {
      etichetta: "Prenota su Pienissimo",
      url: "https://menu.pienissimo.com/menu",
    },
  },

  social: [
    {
      nome: "Instagram",
      handle: "@disorderpublichouse",
      url: "https://www.instagram.com/disorderpublichouse/",
    },
    {
      nome: "Facebook",
      handle: "Disorder Public House",
      url: "https://www.facebook.com/people/Disorder-Public-House/100093424218755/",
    },
  ],

  /** 0 = domenica, come Date.getDay() */
  orari: [
    { giorno: "Lunedì", indice: 1, apertura: "Chiuso", chiuso: true },
    { giorno: "Martedì", indice: 2, apertura: "18:00 – 01:00", chiuso: false },
    { giorno: "Mercoledì", indice: 3, apertura: "18:00 – 01:00", chiuso: false },
    { giorno: "Giovedì", indice: 4, apertura: "18:00 – 01:00", chiuso: false },
    { giorno: "Venerdì", indice: 5, apertura: "18:00 – 02:00", chiuso: false },
    { giorno: "Sabato", indice: 6, apertura: "18:00 – 02:00", chiuso: false },
    { giorno: "Domenica", indice: 0, apertura: "18:00 – 00:00", chiuso: false },
  ],

  /**
   * Offerta pranzo — dal post Instagram "DISORDER LUNCH" in eventi.pdf.
   * Nel post non compaiono i giorni in cui è attiva: se li conosci, aggiungili in `nota`.
   */
  lunch: {
    titolo: "Disorder Lunch",
    promessa: "Mangi in 30 minuti o non paghi",
    incluso: "Acqua e caffè sempre inclusi",
    voci: [
      { nome: "Primo", prezzo: "10€" },
      { nome: "Smash burger e contorno", prezzo: "12€" },
      { nome: "Polletto alle erbe e contorno", prezzo: "15€" },
    ],
    immagine: "/eventi/disorder-lunch.webp",
    nota: null as string | null,
  },
} as const;

export const navigazione = [
  { etichetta: "Eventi", href: "#eventi" },
  { etichetta: "Chi siamo", href: "#chi-siamo" },
  { etichetta: "Menu", href: "#menu" },
  { etichetta: "Contatti", href: "#contatti" },
];

export const indirizzoCompleto = [
  site.indirizzo.via,
  [site.indirizzo.cap, site.indirizzo.citta].filter(Boolean).join(" "),
]
  .filter(Boolean)
  .join(" — ");
