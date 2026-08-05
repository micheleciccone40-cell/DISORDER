/**
 * Menu del Disorder Public House.
 *
 * PROVENIENZA: categorie, nomi, descrizioni e prezzi sono trascritti dal menu
 * già presente nella cartella del progetto (index.html del sito precedente).
 * Le foto sono le 7 immagini di "MENU FOTO/", ottimizzate in /public/menu/ e
 * associate per nome esatto al Menù corrispondente — nessuna foto generata,
 * nessuna foto accostata a un prodotto diverso da quello che ritrae.
 *
 * COSA MANCA nei materiali (volutamente non inventato):
 *  - una categoria BIRRE con nomi e prezzi delle spine/bottiglie
 *  - foto dei singoli piatti fuori dai Menù combinati
 * Per aggiungerle basta creare una nuova categoria qui sotto.
 */

export type Macro = "cucina" | "bar";

export type Piatto = {
  nome: string;
  descrizione?: string;
  prezzo: string;
  /** Percorso in /public — solo se esiste una foto reale di QUESTO prodotto */
  foto?: string;
  /** Etichetta breve (es. "Vegetariano"), derivata dalla descrizione */
  etichetta?: string;
  /** Sottogruppo interno alla categoria (usato per Liquor & Spirits) */
  gruppo?: string;
};

export type Categoria = {
  id: string;
  nome: string;
  /** Riga di presentazione della categoria */
  intro?: string;
  macro: Macro;
  /** "gallery" = card con foto · "carta" = impaginazione da menu cartaceo */
  layout: "gallery" | "carta";
  /** Ordine dei sottogruppi, se la categoria ne usa */
  gruppi?: string[];
  piatti: Piatto[];
};

export const macroFiltri: { id: "tutto" | Macro; etichetta: string }[] = [
  { id: "tutto", etichetta: "Tutto" },
  { id: "cucina", etichetta: "Cucina" },
  { id: "bar", etichetta: "Bar" },
];

export const menu: Categoria[] = [
  {
    id: "menu-combinati",
    nome: "Menù",
    intro: "Panino, fritto e dolce. Il giro completo, in un piatto solo.",
    macro: "cucina",
    layout: "gallery",
    piatti: [
      {
        nome: "Classic Smash Menù",
        descrizione:
          "Il nostro Smash Burger classico, DFC e Old School Fries, per chiudere in dolcezza con tortino al cioccolato o cheesecake a scelta.",
        prezzo: "23,50",
        foto: "/menu/classic-smash.webp",
      },
      {
        nome: "Smash Plus Menù",
        descrizione:
          "Il nostro Smash Plus, DFC e Old School Fries, per chiudere in dolcezza con tortino al cioccolato o cheesecake a scelta.",
        prezzo: "25,00",
        foto: "/menu/smash-plus.webp",
      },
      {
        nome: "Smash Wood Menù",
        descrizione:
          "Il nostro Smash Wood, Chili Cheese Bites croccanti e le nostre Old School Fries, per chiudere in dolcezza con tortino al cioccolato o cheesecake a scelta.",
        prezzo: "23,50",
        foto: "/menu/smash-wood.webp",
      },
      {
        nome: "Main Road Menù",
        descrizione:
          "Il nostro Main Road, Chili Cheese Bites croccanti e le nostre Old School Fries, per chiudere in dolcezza con tortino al cioccolato o cheesecake a scelta.",
        prezzo: "23,50",
        foto: "/menu/main-road.webp",
      },
      {
        nome: "Highbury Menù",
        descrizione:
          "Il nostro Highbury, Chili Cheese Bites croccanti e le nostre Old School Fries, per chiudere in dolcezza con tortino al cioccolato o cheesecake a scelta.",
        prezzo: "23,50",
        foto: "/menu/highbury.webp",
      },
      {
        nome: "Brighton&HA Menù",
        descrizione:
          "Il nostro Brighton&HA, Chili Cheese Bites croccanti e le nostre Old School Fries, per chiudere in dolcezza con tortino al cioccolato o cheesecake a scelta.",
        prezzo: "23,50",
        foto: "/menu/brighton-ha.webp",
        etichetta: "Vegetariano",
      },
      {
        nome: "Filo's Smash Menù",
        descrizione:
          "Il nostro Filo's Burger, Chili Cheese Bites croccanti e le nostre Old School Fries, per chiudere in dolcezza con tortino al cioccolato o cheesecake a scelta.",
        prezzo: "18,50",
        foto: "/menu/filos-smash.webp",
      },
    ],
  },

  {
    id: "appetizer",
    nome: "Appetizer",
    intro: "Da dividere in tavola, o da tenersi stretti.",
    macro: "cucina",
    layout: "carta",
    piatti: [
      {
        nome: "Old School Fries",
        descrizione:
          "Patate di Montereale, tagliate a mano al momento e fritte con la buccia, croccanti fuori e morbide dentro, condite con il nostro mix di spezie.",
        prezzo: "5,00",
      },
      {
        nome: "Old School Fries Deluxe",
        descrizione: "Le nostre Old School Fries con aggiunta di pecorino e pancetta croccante.",
        prezzo: "7,00",
      },
      {
        nome: "Chili Cheese Bites",
        descrizione: "Pepite di formaggio fuso e jalapeño. Croccanti fuori, filanti dentro.",
        prezzo: "5,00",
      },
      {
        nome: "Olive Ascolane",
        descrizione: "Croccanti e sfiziose. Sette pezzi per porzione.",
        prezzo: "4,50",
      },
      {
        nome: "Chicken Wings",
        descrizione:
          "Alette di pollo speziate e succulente cotte alla griglia, accompagnate da salsa BBQ. Sei pezzi per porzione.",
        prezzo: "7,00",
      },
      {
        nome: "DFC — Disorder Fried Chicken",
        descrizione: "Tenders di pollo speziati e fritti. La nostra versione del fried chicken.",
        prezzo: "7,00",
      },
      {
        nome: "Salse",
        descrizione: "A scelta tra: Disorder, ketchup, maionese, barbecue.",
        prezzo: "0,50",
      },
    ],
  },

  {
    id: "main-courses",
    nome: "Main Courses",
    intro: "Smash burger schiacciati sulla piastra, e i classici da pub.",
    macro: "cucina",
    layout: "carta",
    piatti: [
      {
        nome: "Smash Burger",
        descrizione:
          "Due patty di manzo da 90g smashate alla piastra, cheddar filante, la nostra salsa smash, cuore di lattuga e pomodoro fresco.",
        prezzo: "13,00",
      },
      {
        nome: "Smash Plus",
        descrizione:
          "Due patty di manzo da 90g smashate alla piastra, pecorino filante, pancetta croccante, uovo al tegamino, cuore di lattuga e pomodoro fresco.",
        prezzo: "15,00",
      },
      {
        nome: "Smash Wood",
        descrizione:
          "Due patty di manzo croccanti con cicoria ripassata, crema di funghi, pecorino e cipolle caramellate.",
        prezzo: "15,00",
      },
      {
        nome: "Filo's Smash Burger",
        descrizione:
          "Un patty di manzo da 90g smashato alla piastra, cheddar filante, bacon croccante e la nostra salsa smash.",
        prezzo: "7,00",
      },
      {
        nome: "Maine Road",
        descrizione: "Il nostro cheeseburger: 220g di manzo, insalata, pomodoro e formaggio fuso.",
        prezzo: "13,00",
      },
      {
        nome: "Highbury",
        descrizione:
          "Panino con croccante cotoletta di pollo, insalata, pomodori, cheddar fuso e salsa algérienne.",
        prezzo: "13,00",
      },
      {
        nome: "Brighton&HA",
        descrizione:
          "Burger vegetale a base di soia alla griglia, edamer fuso, pecorino grattugiato, cuore di lattuga e pomodoro fresco.",
        prezzo: "13,00",
        etichetta: "Vegetariano",
      },
      {
        nome: "On The Plate",
        descrizione:
          "220g di manzo al piatto con un contorno a scelta tra Old School Fries, cicoria ripassata o patate e cicoria.",
        prezzo: "13,00",
      },
      {
        nome: "Pre Match Stress",
        descrizione:
          "L'iconico fish and chips da English pub. Pesce in pastella croccante con le nostre fries.",
        prezzo: "13,00",
      },
    ],
  },

  {
    id: "contorni",
    nome: "Contorni",
    intro: "Abruzzo, di fianco al piatto.",
    macro: "cucina",
    layout: "carta",
    piatti: [
      {
        nome: "Cicoria Ripassata",
        descrizione: "Cicoria ripassata con aglio e peperoncino.",
        prezzo: "5,00",
      },
      {
        nome: "Patate e Cicoria",
        descrizione: "Il classico contorno abruzzese: patate e cicoria ripassate insieme.",
        prezzo: "5,00",
      },
    ],
  },

  {
    id: "dessert",
    nome: "Dessert",
    macro: "cucina",
    layout: "carta",
    piatti: [
      {
        nome: "Chocolate Fondant",
        descrizione: "Tortino al cioccolato con cuore caldo e fondente.",
        prezzo: "5,00",
      },
    ],
  },

  {
    id: "cocktail",
    nome: "Cocktail",
    intro: "Classici, fatti come si deve.",
    macro: "bar",
    layout: "carta",
    piatti: [
      { nome: "Americano", prezzo: "7,00" },
      { nome: "Aperol Spritz", prezzo: "6,00" },
      { nome: "Boulevardier", prezzo: "7,00" },
      { nome: "Campari e Fanta", prezzo: "4,00" },
      { nome: "Campari Spritz", prezzo: "6,00" },
      { nome: "Cuba Libre", prezzo: "7,00" },
      { nome: "Daiquiri", prezzo: "7,00" },
      { nome: "Gin Fizz", prezzo: "7,00" },
      { nome: "Gin Lemon", prezzo: "6,00" },
      { nome: "Gin Tonic", prezzo: "6,00" },
      { nome: "Long Island Iced Tea", prezzo: "7,00" },
      { nome: "Manhattan", prezzo: "7,00" },
      { nome: "Margarita", prezzo: "7,00" },
      { nome: "Mi-To", prezzo: "6,00" },
      { nome: "Moscow Mule", prezzo: "6,00" },
      { nome: "Negroni", prezzo: "7,00" },
      { nome: "Negroni Sbagliato", prezzo: "7,00" },
      { nome: "Vodka Lemon", prezzo: "6,00" },
      { nome: "Vodka Sour", prezzo: "7,00" },
      { nome: "Vodka Tonic", prezzo: "6,00" },
      { nome: "Whisky Sour", prezzo: "7,00" },
    ],
  },

  {
    id: "liquor-spirits",
    nome: "Liquor & Spirits",
    intro: "Whiskey irlandesi, torbe scozzesi e gli amari di casa.",
    macro: "bar",
    layout: "carta",
    gruppi: [
      "Irish Whiskey",
      "Scotch Whisky",
      "Blended & Malt",
      "Bourbon & Rye",
      "Rum",
      "Amari & Digestivi",
      "Grappe",
    ],
    piatti: [
      { nome: "Jameson", prezzo: "5,00", gruppo: "Irish Whiskey" },
      { nome: "West Cork", prezzo: "6,00", gruppo: "Irish Whiskey" },
      { nome: "West Cork Blended", prezzo: "7,00", gruppo: "Irish Whiskey" },

      { nome: "Talisker Skye", prezzo: "8,00", gruppo: "Scotch Whisky" },
      { nome: "Laphroaig 10 YA", prezzo: "7,00", gruppo: "Scotch Whisky" },
      { nome: "Aberfeldy", prezzo: "6,00", gruppo: "Scotch Whisky" },
      { nome: "Bowmore", prezzo: "6,00", gruppo: "Scotch Whisky" },

      { nome: "Ballantines", prezzo: "5,00", gruppo: "Blended & Malt" },
      { nome: "J&B", prezzo: "5,00", gruppo: "Blended & Malt" },
      { nome: "William Lawson's", prezzo: "5,00", gruppo: "Blended & Malt" },
      { nome: "Glen Grant", prezzo: "5,00", gruppo: "Blended & Malt" },
      { nome: "Red Label", prezzo: "5,00", gruppo: "Blended & Malt" },
      { nome: "Black Label", prezzo: "6,00", gruppo: "Blended & Malt" },

      { nome: "Bulleit Bourbon", prezzo: "6,00", gruppo: "Bourbon & Rye" },
      { nome: "Bulleit 95 Rye", prezzo: "6,00", gruppo: "Bourbon & Rye" },

      { nome: "Zacapa Solera", prezzo: "8,00", gruppo: "Rum" },
      { nome: "Diplomatico", prezzo: "8,00", gruppo: "Rum" },
      { nome: "Matusalem", prezzo: "7,00", gruppo: "Rum" },
      { nome: "Kraken Rum", prezzo: "6,00", gruppo: "Rum" },

      { nome: "Amaro del Capo", prezzo: "4,00", gruppo: "Amari & Digestivi" },
      { nome: "Brancamenta", prezzo: "4,00", gruppo: "Amari & Digestivi" },
      { nome: "Fernet Branca", prezzo: "4,00", gruppo: "Amari & Digestivi" },
      { nome: "Montenegro", prezzo: "4,00", gruppo: "Amari & Digestivi" },
      { nome: "Jägermeister", prezzo: "4,00", gruppo: "Amari & Digestivi" },
      { nome: "Sambuca Molinari", prezzo: "4,00", gruppo: "Amari & Digestivi" },
      { nome: "Limoncello", prezzo: "4,00", gruppo: "Amari & Digestivi" },
      { nome: "Ratafia", prezzo: "4,00", gruppo: "Amari & Digestivi" },

      { nome: "Grappa 903 Barrique", prezzo: "4,00", gruppo: "Grappe" },
      { nome: "Grappa 903 Bianca", prezzo: "4,00", gruppo: "Grappe" },
    ],
  },

  {
    id: "soft-drink",
    nome: "Soft Drink",
    macro: "bar",
    layout: "carta",
    piatti: [
      { nome: "Acqua Naturale", prezzo: "1,00" },
      { nome: "Acqua Frizzante", prezzo: "1,00" },
      { nome: "Acqua Brillante", prezzo: "3,00" },
      { nome: "Caffè", prezzo: "1,00" },
      { nome: "Coca Cola", prezzo: "3,00" },
      { nome: "Coca Cola Zero", prezzo: "3,00" },
      { nome: "Fanta", prezzo: "3,00" },
      { nome: "Sprite", prezzo: "3,00" },
      { nome: "Estathé", prezzo: "3,00" },
    ],
  },
];

export function categoriePerMacro(macro: "tutto" | Macro) {
  return macro === "tutto" ? menu : menu.filter((c) => c.macro === macro);
}
