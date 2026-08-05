/**
 * Eventi del Disorder.
 *
 * PROVENIENZA: tutti e tre gli eventi sono trascritti dai post Instagram
 * contenuti in `eventi.pdf` (6 screenshot → 4 post: 3 eventi live + 1 promo pranzo).
 * L'anno è il 2026: nei post le date sono indicate come "GIO"/"THU" e
 * 6 ago, 9 lug e 14 mag cadono di giovedì solo nel 2026.
 *
 * Le locandine in /public/eventi sono ritagliate dagli stessi screenshot.
 *
 * PER AGGIUNGERE UN EVENTO: metti la locandina in /public/eventi/<slug>.webp
 * (formato consigliato 4:5) e aggiungi un oggetto in cima all'array.
 * Il carosello mostra automaticamente i primi `MAX_EVENTI_IN_HOME`.
 */

export type Evento = {
  id: string;
  /** Piccola etichetta sopra il titolo */
  occhiello: string;
  titolo: string;
  /** Artista / formazione, se c'è */
  artista: string | null;
  /** ISO, usata per ordinare e per il markup strutturato */
  data: string;
  orario: string;
  luogo: string;
  descrizione: string;
  /** Riga in evidenza (fuori menu, birra, ecc.) — opzionale */
  nota: string | null;
  immagine: string;
  /** Testo alternativo della locandina */
  alt: string;
  cta: { etichetta: string; url: string } | null;
};

export const MAX_EVENTI_IN_HOME = 5;

export const eventi: Evento[] = [
  {
    id: "3-years-of-disorder",
    occhiello: "Terzo anniversario",
    titolo: "3 Years of Disorder: The Show Must Go On",
    artista: "Jordan Trey — Galileo, Queen tribute",
    data: "2026-08-06",
    orario: "Dalle 18:00 · live alle 21:00",
    luogo: "Piazza Palazzo, L'Aquila",
    descrizione:
      "Dalle 18:00 la festa in Piazza Palazzo. Alle 21:00 Jordan Trey canta i Queen sotto le stelle: Bohemian Rhapsody, We Will Rock You, Under Pressure. Le canzoni che hanno definito il rock, live in piazza.",
    nota: "Local craft beer per tutta la serata",
    immagine: "/eventi/queen-night.webp",
    alt: "Locandina della Queen Night per i tre anni del Disorder Public House",
    cta: { etichetta: "Prenota il tavolo", url: "https://menu.pienissimo.com/menu" },
  },
  {
    id: "western-stories",
    occhiello: "Il Disorder diventa un saloon",
    titolo: "Western Stories",
    artista: "Giorgia & Livio",
    data: "2026-07-09",
    orario: "Dalle 21:00",
    luogo: "Disorder Public House — City Center",
    descrizione:
      "Per una notte il centro città si sposta lungo la Route 66. Le luci si abbassano per fare spazio alle radici della musica country western: chitarre, ballate e quell'atmosfera da vecchio saloon che fa battere lo stivale a tempo.",
    nota: "Fuori menu: Texas Burger con brisket, solo per questa sera e fino a esaurimento scorte",
    immagine: "/eventi/western-stories.webp",
    alt: "Locandina della serata Western Stories al Disorder Public House",
    cta: { etichetta: "Prenota il tavolo", url: "https://menu.pienissimo.com/menu" },
  },
  {
    id: "the-americans",
    occhiello: "Acoustic duo",
    titolo: "The Americans",
    artista: "Classic country rock hits",
    data: "2026-05-14",
    orario: "Dalle 21:30",
    luogo: "Piazza Palazzo 1, L'Aquila",
    descrizione:
      "Folk, country, rock — e una scaletta che parla da sola: Bruce Springsteen, Elvis Presley, Eagles, Bob Dylan, Neil Young. I classici che non passano mai di moda, tutti in una sera.",
    nota: null,
    immagine: "/eventi/the-americans.webp",
    alt: "Locandina della serata The Americans al Disorder Public House",
    cta: { etichetta: "Prenota il tavolo", url: "https://menu.pienissimo.com/menu" },
  },
];

/** Eventi in ordine dal più recente, limitati a quelli mostrati in home. */
export const eventiRecenti = [...eventi]
  .sort((a, b) => b.data.localeCompare(a.data))
  .slice(0, MAX_EVENTI_IN_HOME);

const MESI = [
  "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
  "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre",
];
const GIORNI = ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];

export function formattaData(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return {
    giorno: String(d).padStart(2, "0"),
    mese: MESI[m - 1],
    meseBreve: MESI[m - 1].slice(0, 3),
    anno: String(y),
    settimana: GIORNI[dt.getUTCDay()],
    esteso: `${GIORNI[dt.getUTCDay()]} ${d} ${MESI[m - 1]} ${y}`,
  };
}
