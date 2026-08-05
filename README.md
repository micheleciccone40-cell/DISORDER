# Disorder Public House — sito

Irish pub e gastropub, Piazza Palazzo 1, L'Aquila.
Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 4 + Motion.

## Avvio

```bash
npm install
```

```bash
npm run dev
```

Poi apri http://localhost:3000. Per la versione di produzione: `npm run build` e `npm start`.

## Dove si modificano i contenuti

Tutto il testo del sito sta in tre file. Non serve toccare i componenti.

| File | Cosa contiene |
| --- | --- |
| `data/site.ts` | Indirizzo, orari, social, link prenotazioni, slogan, offerta pranzo |
| `data/menu.ts` | Categorie, piatti, descrizioni, prezzi, foto |
| `data/events.ts` | Eventi mostrati nel carosello |

### Aggiungere un evento

1. Metti la locandina in `public/eventi/nome-evento.webp` (proporzioni consigliate 4:5).
2. Aggiungi un oggetto **in cima** all'array `eventi` in `data/events.ts`.

Il carosello ordina da solo dal più recente e mostra i primi `MAX_EVENTI_IN_HOME` (oggi 5).

### Aggiungere un piatto o una categoria

In `data/menu.ts`. Ogni categoria ha:

- `macro`: `"cucina"` o `"bar"` — decide sotto quale filtro compare;
- `layout`: `"gallery"` (card con foto) oppure `"carta"` (righe con i puntini);
- `gruppi`: opzionale, per i sottogruppi come in Liquor & Spirits.

Per legare una foto a un prodotto: metti il file in `public/menu/` e indica il percorso
nel campo `foto`. **Le foto vanno associate solo al prodotto che ritraggono davvero.**

### Aggiungere telefono, email o CAP

In `data/site.ts` i campi valorizzati a `null` non sono presenti nei materiali forniti.
Appena li riempi compaiono da soli in contatti e footer.

## Cosa manca ancora (non è stato inventato)

- **Birre.** Nel materiale non c'è nessun elenco di birre con prezzi, anche se il locale è
  un pub. Serve una categoria nuova in `data/menu.ts`.
- **Telefono ed email.** Non compaiono da nessuna parte nei file forniti.
- **Giorni del Disorder Lunch.** Il post non li indica: si aggiungono in `site.lunch.nota`.
- **Eventi.** Nel PDF ci sono 3 eventi live. Il carosello ne mostra fino a 5.

## Struttura

```
app/          layout, pagina, CSS globale (palette, texture, tipografia)
components/   Header, Hero, EventsCarousel, About, LocationMap,
              Menu, MenuCategory, MenuItem, LunchBanner, Footer, Intro
data/         contenuti del sito
public/       asset ottimizzati (brand, menu, eventi, texture, trailer)
```

## Asset

Gli originali restano dove erano: `RESOURCES/`, `MENU FOTO/`, `TRAILER/`, `eventi.pdf`.
In `public/` ci sono le versioni ottimizzate usate dal sito. Il logo è quello fornito:
`public/brand/disorder-logo.png` è l'originale ritagliato del margine trasparente,
`disorder-logo-original.png` è il file di partenza intatto.

Il vecchio sito statico è in `_sito-precedente/`: non viene più usato, si può cancellare.

## Messa online

Prima di pubblicare, imposta il dominio così che le anteprime social puntino al posto giusto:

```bash
NEXT_PUBLIC_SITE_URL=https://iltuodominio.it
```
