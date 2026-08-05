"use client";

import { site } from "@/data/site";
import Marchio from "./Marchio";
import OndaSequenza from "./OndaSequenza";
import Rivela from "./Rivela";

export default function Hero() {
  return (
    <>
      {/* L'animazione dell'onda di Unknown Pleasures a tutto schermo */}
      <OndaSequenza />

      <section
        id="home"
        className="alone relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-16 text-center"
      >
        {/* Velatura centrale per proteggere il testo lasciando liberi i bordi */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.8) 75%, rgba(0, 0, 0, 0.95) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="contenitore relative z-10 flex flex-col items-center gap-8 max-w-4xl">
          {/* Badge o indicatore di posizione */}
          <Rivela ritardo={100}>
            <div className="inline-flex items-center gap-2 rounded-full border border-oro/30 bg-notte/60 px-4 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-oro animate-pulse" />
              <span className="inciso text-[0.62rem] text-oro/90">
                {site.indirizzo.via} — {site.citta}
              </span>
            </div>
          </Rivela>

          {/* Marchio tipografico DISORDER PUBLIC HOUSE */}
          <Rivela ritardo={200}>
            <Marchio taglia="grande" className="my-2" />
          </Rivela>

          {/* Claim & Sottotitolo */}
          <Rivela ritardo={300}>
            <p className="max-w-[36ch] font-[family-name:var(--font-display)] text-[clamp(1.2rem,2.8vw,1.8rem)] italic text-crema/90 leading-snug">
              {site.sottotitolo}
            </p>
          </Rivela>

          {/* Pulsanti d'azione */}
          <Rivela ritardo={400}>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                href={site.contatti.prenotazioni.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn px-8 py-3.5 text-[0.7rem]"
              >
                Prenota un tavolo
              </a>
              <a
                href="#menu"
                className="btn btn-fantasma px-8 py-3.5 text-[0.7rem]"
              >
                Scopri il menu
              </a>
            </div>
          </Rivela>
        </div>

        {/* Scroll Hint in basso */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-75 transition-opacity hover:opacity-100">
          <a
            href="#chi-siamo"
            aria-label="Scorri verso il basso"
            className="flex flex-col items-center gap-2 group"
          >
            <span className="inciso text-[0.55rem] tracking-[0.3em] text-cenere group-hover:text-oro transition-colors">
              Scorri
            </span>
            <div className="h-9 w-5 rounded-full border border-cenere/40 p-1 flex justify-center group-hover:border-oro/60 transition-colors">
              <div className="h-2 w-1 rounded-full bg-oro animate-bounce" />
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
