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

## L'animazione dell'onda

Non è un video: è una **sequenza di 166 fotogrammi su canvas**, e l'indice del fotogramma
è funzione della posizione di scroll dell'intera pagina. Fermi lo scroll, si ferma; torni
su, torna indietro. Stessa tecnica delle pagine prodotto Apple
([spiegata qui](https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/)).

La sequenza è **invertita**: frame 166 in cima al sito — l'onda al completo — e
frame 1 in fondo ai contatti, dove resta il nero. Scendendo, l'onda si smonta.
Il codice sta in `components/OndaSequenza.tsx`: per rimetterla nel verso originale
si tolgono le due righe indicate nel commento accanto a `indicePerProgresso`.

Gli originali sono in `ANIMAZIONE DISORDER LANDING/` (166 webp 1280×720, 20,85 MB).
In `public/onda/` ci sono le due serie ottimizzate che usa il sito:

| Serie | Uso | Peso |
| --- | --- | --- |
| `public/onda/d/` | schermi ≥ 820px, 1280px di lato | 2,52 MB |
| `public/onda/m/` | telefoni, 720px di lato | 1,38 MB |

Per rigenerarle dopo aver cambiato i frame sorgente, serve uno script Pillow che
ricomprime `frame_NNNNN.webp` in `f001.webp`…`f166.webp` alle due larghezze.
Se cambia il **numero** di fotogrammi, aggiorna `N_FRAME` in `OndaSequenza.tsx`.

Chi ha attivo "riduci animazioni" nel sistema operativo vede l'onda completa, ferma,
senza scaricare tutti i fotogrammi.

### Quanto si vede l'onda sotto le sezioni

L'onda sta dietro tutto il sito, e sopra ci sono dei veli neri semitrasparenti che
tengono leggibile il testo. Se l'animazione sembra troppo coperta o troppo invadente,
si regolano questi valori in `app/globals.css`:

| Classe | Valore | Dove si vede | Luce che passa |
| --- | --- | --- | --- |
| `.velo` | `0.58` | chi siamo, eventi, menu | 42% |
| `.velo-fitto` | `0.66` | footer, schede evento, banner pranzo | 34% |
| `.lastra` | `0.66`–`0.74` | pannello del menu | 11% (si somma al velo) |

La landing non ha velo: ha un'ellisse d'ombra dentro `components/Landing.tsx`, che
scurisce solo dove stanno le parole e lascia l'onda intatta ai bordi dello schermo.

Alzare i numeri copre di più, abbassarli scopre di più. Due cose da sapere prima di
toccarli:

- **Sotto `0.57` il velo non regge più "Chi siamo".** Con la sequenza invertita quella
  sezione ha dietro i fotogrammi più carichi (16% di area accesa, picchi a 248) e il
  crema scende sotto il 4,5:1. Se inverti di nuovo l'animazione, il vincolo si sposta
  in fondo e il velo può tornare più leggero.
- **La lastra del menu è la più densa** perché è alta da sola il 61% della pagina ed è
  dove si legge davvero: lì il testo deve vincere sull'onda.

Il `text-shadow` della classe `.alone` è quello che salva le parole quando una cresta
sottile passa dietro una lettera: se lo togli, abbassa anche i veli.

## Struttura

```
app/          layout, pagina, CSS globale (palette e tipografia)
components/   OndaSequenza, Intro, Header, Landing, About, LocationMap,
              EventsCarousel, Menu, MenuCategory, MenuItem, LunchBanner,
              Footer, Marchio, Rivela, Ornamento
data/         contenuti del sito
public/       asset ottimizzati (brand, menu, eventi, onda)
```

Ordine delle sezioni in `app/page.tsx`: landing → chi siamo → eventi → menu → contatti.
Le voci dell'header seguono lo stesso ordine e si prendono da `navigazione` in
`data/site.ts`: cambia lì e cambiano in tutte e due le righe della barra.

## Asset

Gli originali restano dove erano: `RESOURCES/`, `MENU FOTO/`, `TRAILER/`, `eventi.pdf`,
`ANIMAZIONE DISORDER LANDING/`. In `public/` ci sono le versioni ottimizzate usate dal sito.
Il logo è quello fornito: `public/brand/disorder-logo.png` è l'originale ritagliato del
margine trasparente, `disorder-logo-original.png` è il file di partenza intatto.

Il logo compare nella barra in alto, in Chi siamo e nel footer. **Nella landing non c'è**:
lì il marchio è solo scritto (`components/Marchio.tsx`).

`TRAILER/` non è più usato dal sito: la vecchia animazione dello smash burger è stata
rimossa. I file restano sul disco.

Il vecchio sito statico è in `_sito-precedente/`: non viene più usato, si può cancellare.

## Messa online

Prima di pubblicare, imposta il dominio così che le anteprime social puntino al posto giusto:

```bash
NEXT_PUBLIC_SITE_URL=https://iltuodominio.it
```
