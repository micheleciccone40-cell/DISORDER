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
    <section id="chi-siamo" className="sezione relative overflow-hidden bg-bottiglia">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: "url(/texture/legno.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "soft-light",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-notte) 0%, transparent 18%, transparent 82%, var(--color-notte) 100%)",
        }}
      />

      <div className="contenitore relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-20">
        {/* colonna sinistra: logo + racconto */}
        <div>
          <Rivela>
            <Image
              src="/brand/disorder-logo.webp"
              alt={`${site.nome} — logo`}
              width={385}
              height={655}
              className="h-32 w-auto sm:h-40"
            />
          </Rivela>

          <Rivela ritardo={100}>
            <span className="inciso mt-8 block text-oro/90">Chi siamo</span>
            <h2 className="mt-5 max-w-[15ch] text-[clamp(2.1rem,5vw,3.5rem)] text-crema">
              Un pub, <em className="corsivo">non un locale</em>
            </h2>
          </Rivela>

          <Rivela ritardo={200}>
            <div className="mt-7 max-w-[58ch] space-y-5 leading-relaxed text-fumo">
              <p>
                Il <strong className="font-normal text-crema">Disorder Public House</strong> sta in{" "}
                {site.indirizzo.via}, nel cuore di {site.citta}. Legno, luce bassa, birra alla
                spina e un bancone che la sera è sempre pieno: la formula del pub, senza scorciatoie.
              </p>
              <p>
                In cucina si fanno smash burger schiacciati sulla piastra al momento, il fish and
                chips come si deve, e le Old School Fries tagliate a mano con le patate di
                Montereale. Dietro al bancone, whiskey irlandesi, torbe scozzesi, amari di casa e i
                cocktail classici.
              </p>
              <p>
                Il nome e l'insegna arrivano dai Joy Division: quel bicchiere con le onde è{" "}
                <em className="italic">Unknown Pleasures</em>. Da noi il disordine è di casa — nel
                senso migliore.
              </p>
            </div>
          </Rivela>

          <Rivela ritardo={280}>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t pt-8" style={{ borderColor: "var(--bordo-tenue)" }}>
              {numeri.map((n) => (
                <div key={n.etichetta}>
                  <dt className="font-[family-name:var(--font-display)] text-[2.1rem] leading-none text-oro">
                    {n.valore}
                  </dt>
                  <dd className="mt-2 font-[family-name:var(--font-inciso)] text-[0.55rem] uppercase leading-relaxed tracking-[0.2em] text-fumo/80">
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

        {/* colonna destra: mappa + orari */}
        <div>
          <Rivela ritardo={160}>
            <LocationMap />
          </Rivela>

          <Rivela ritardo={240}>
            <div
              className="mt-6 px-6 py-6"
              style={{ border: "1px solid var(--bordo-tenue)", background: "rgba(8,15,11,0.55)" }}
            >
              <span className="font-[family-name:var(--font-inciso)] text-[0.55rem] uppercase tracking-[0.28em] text-fumo/70">
                Quando siamo aperti
              </span>
              <ul className="mt-4 space-y-2 text-[0.92rem]">
                {site.orari.map((o) => (
                  <li key={o.giorno} className="voce">
                    <span className={o.chiuso ? "text-fumo/60" : "text-crema"}>{o.giorno}</span>
                    <span className="voce-punti" aria-hidden="true" />
                    <span className={o.chiuso ? "text-fumo/60" : "text-oro"}>{o.apertura}</span>
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
