import type { Metadata, Viewport } from "next";
import { Fraunces, Karla, Cinzel } from "next/font/google";
import { site, indirizzoCompleto } from "@/data/site";
import "./globals.css";

/* Serif editoriale morbido per i titoli: gli assi SOFT e WONK
   smussano le grazie e danno il carattere “da insegna” che serve. */
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

/* Sans umanista, calda e molto leggibile, per il corpo del testo. */
const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
});

/* Maiuscoletto inciso, in accordo con la scritta del logo. */
const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
  variable: "--font-cinzel",
});

/* Quando il sito andrà online, basta impostare NEXT_PUBLIC_SITE_URL
   (es. https://disorderpublichouse.it) perché og:image punti al dominio giusto. */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.nome} — ${site.claim} a ${site.citta}`,
    template: `%s — ${site.nome}`,
  },
  description:
    "Irish pub e gastropub nel cuore di L'Aquila. Smash burger, whiskey irlandesi, cocktail e serate live in Piazza Palazzo.",
  applicationName: site.nome,
  openGraph: {
    title: `${site.nome} — ${site.claim}`,
    description:
      "Irish pub e gastropub nel cuore di L'Aquila. Smash burger, whiskey irlandesi e serate live.",
    locale: "it_IT",
    type: "website",
    siteName: site.nome,
    images: [{ url: "/brand/disorder-logo.png", width: 385, height: 655, alt: site.nome }],
  },
  icons: {
    icon: "/brand/icon.png",
    apple: "/brand/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a130e",
  colorScheme: "dark",
};

const datiStrutturati = {
  "@context": "https://schema.org",
  "@type": "BarOrPub",
  name: site.nome,
  description: site.sottotitolo,
  image: "/brand/disorder-logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.indirizzo.via,
    addressLocality: site.indirizzo.citta,
    addressRegion: site.indirizzo.provincia,
    addressCountry: "IT",
  },
  servesCuisine: ["Gastropub", "Irish pub", "Burger"],
  sameAs: site.social.map((s) => s.url),
  openingHours: site.orari
    .filter((o) => !o.chiuso)
    .map((o) => `${["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][o.indice]} ${o.apertura.replace(" – ", "-")}`),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${fraunces.variable} ${karla.variable} ${cinzel.variable}`}>
      <body className="grana">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datiStrutturati) }}
        />
        <a
          href="#menu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-oro focus:px-4 focus:py-2 focus:text-notte"
        >
          Vai al menu
        </a>
        {children}
        <span className="sr-only">{indirizzoCompleto}</span>
      </body>
    </html>
  );
}
