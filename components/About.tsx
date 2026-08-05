import Image from "next/image";
import { site } from "@/data/site";
import { menu } from "@/data/menu";
import LocationMap from "./LocationMap";
import Rivela from "./Rivela";
import Ornamento from "./Ornamento";

/* I numeri non sono claim di marketing: sono contati sul menu reale. */
const conta = (id: string) => menu.find((c) => c.id === id)?.piatti.length ?? 0;
const numeri = [
  { valore: conta("cocktail"), etichetta: "Cocktail alla carta" },
  { valore: conta("liquor-spirits"), etichetta: "Distillati e amari" },
  {
    valore: menu.filter((c) => c.macro === "cucina").reduce((n, c) => n + c.piatti.length, 0),
    etichetta: "Piatti in cucina",
  },
];

export default function About() {
  return (
    <section
      id="chi-siamo"
      className="sezione velo sfuma-alto relative"
    >
      <div className="contenitore relative grid items-start gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.78fr)] lg:gap-16">
        {/* colonna sinistra: racconto */}
        <div>
          <Rivela>
            <Image
              src="/brand/disorder-logo.webp"
              alt={`${site.nome} — logo`}
              width={385}
              height={655}
              className="h-24 w-auto sm:h-28"
            />
          </Rivela>

          <Rivela ritardo={100}>
            <span className="inciso mt-7 block text-oro/90">Chi siamo</span>
            <h2 className="mt-5 max-w-[15ch] text-[clamp(2.1rem,5vw,3.5rem)] text-crema">
              Un pub, <em className="corsivo">non un locale</em>
            </h2>
          </Rivela>

          <Rivela ritardo={200}>
            <div className="mt-7 max-w-[58ch] space-y-5 leading-relaxed text-fumo">
              <p>
                Il <strong className="font-normal text-crema">Disorder Public House</strong> sta in{" "}
                {site.indirizzo.via}, nel cuore di {site.citta}. Legno, luce bassa, birra alla
                spina e un bancone che la sera è sempre pieno: la formula del pub, senza
                scorciatoie.
              </p>
              <p>
                In cucina si fanno smash burger schiacciati sulla piastra al momento, il fish and
                chips come si deve, e le Old School Fries tagliate a mano con le patate di
                Montereale. Dietro al bancone, whiskey irlandesi, torbe scozzesi, amari di casa e i
                cocktail classici.
              </p>
              <p>
                Il nome e l&apos;insegna arrivano dai Joy Division: quell&apos;onda che vedi
                scorrere dietro a tutto il sito è <em className="italic">Unknown Pleasures</em>, la
                stessa incisa sul nostro bicchiere. Da noi il disordine è di casa — nel senso
                migliore.
              </p>
            </div>
          </Rivela>

          <Rivela ritardo={280}>
            <dl
              className="mt-10 grid grid-cols-3 gap-6 border-t pt-8"
              style={{ borderColor: "var(--bordo-tenue)" }}
            >
              {numeri.map((n) => (
                <div key={n.etichetta}>
                  <dt className="font-[family-name:var(--font-display)] text-[2.1rem] leading-none text-oro">
                    {n.valore}
                  </dt>
                  <dd className="mt-2 font-[family-name:var(--font-inciso)] text-[0.55rem] uppercase leading-relaxed tracking-[0.2em] text-cenere">
                    {n.etichetta}
                  </dd>
                </div>
              ))}
            </dl>
          </Rivela>

          <Rivela ritardo={340}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={site.contatti.prenotazioni.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Prenota un tavolo
              </a>
              <a href="#menu" className="btn btn-fantasma">
                Vedi il menu
              </a>
            </div>
          </Rivela>
        </div>

        {/* colonna destra: mappa (contenuta) e orari */}
        <div className="lg:sticky lg:top-28">
          <Rivela ritardo={160}>
            <LocationMap />
          </Rivela>

          <Rivela ritardo={240}>
            <div
              className="mt-5 px-5 py-5"
              style={{ border: "1px solid var(--bordo-tenue)", background: "rgba(0,0,0,0.5)" }}
            >
              <span className="font-[family-name:var(--font-inciso)] text-[0.55rem] uppercase tracking-[0.28em] text-cenere">
                Quando siamo aperti
              </span>
              <ul className="mt-4 space-y-2 text-[0.88rem]">
                {site.orari.map((o) => (
                  <li key={o.giorno} className="voce">
                    <span className={o.chiuso ? "text-cenere" : "text-crema"}>{o.giorno}</span>
                    <span className="voce-punti text-cenere" aria-hidden="true" />
                    <span className={o.chiuso ? "text-cenere" : "text-oro"}>{o.apertura}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Rivela>
        </div>
      </div>

      <div className="contenitore relative mt-20">
        <Ornamento />
      </div>
    </section>
  );
}
