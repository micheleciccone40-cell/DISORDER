"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import Marchio from "./Marchio";

/**
 * Prima schermata. Nessuna immagine di sfondo e nessun logo:
 * dietro c'è il canvas dell'onda, che scorre con la pagina.
 * La scritta sfuma appena inizi a scendere, per lasciarla lavorare.
 */
export default function Landing() {
  const contenuto = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const aggiorna = () => {
      raf = 0;
      const y = window.scrollY;
      const el = contenuto.current;
      if (!el) return;
      const h = window.innerHeight;
      if (y > h * 1.2) return;
      el.style.transform = `translate3d(0, ${y * -0.08}px, 0)`;
      el.style.opacity = String(Math.max(0, 1 - y / (h * 0.6)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(aggiorna);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    aggiorna();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const [prima, seconda] = site.slogan.split("\n");

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Ora l'onda arriva qui al completo: senza questa pozza d'ombra il
          17-25% dell'area dietro le parole è acceso e il crema non si legge.
          È un'ellisse, non un velo: ai bordi dello schermo l'onda resta
          intatta, si abbassa solo dove ci sono le lettere.
          Stretta e alleggerita (0.68→0.52 al centro): la prima schermata è
          quella che si guarda di più, e l'ombra si mangiava proprio le
          creste centrali, che sono la parte viva del disegno. */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          background: [
            "radial-gradient(ellipse 62% 46% at 50% 52%, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
            /* fondo: regge l'indicatore «Scorri» e cuce la landing con la
               sezione sotto, che parte già velata */
            "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 24%)",
          ].join(", "),
        }}
      />

      <div ref={contenuto} className="contenitore alone relative z-10 pb-28 pt-32 text-center">
        {/* i ritardi qui sotto sono agganciati al sipario di Intro.tsx: il
            nero se ne va a 0,30 s, e da lì il testo entra in cascata */}
        <div style={{ animation: "affiora 0.36s var(--ease-lento) 0.16s both" }}>
          <Marchio taglia="grande" />
        </div>

        <div className="pozza mt-10 flex flex-col items-center gap-5 sm:mt-12">
          <span
            className="inciso text-fumo"
            style={{ animation: "salita 0.26s var(--ease-lento) 0.22s both" }}
          >
            {site.claim} · {site.citta}
          </span>

          <h1
            className="max-w-[18ch] text-[clamp(1.5rem,3.4vw,2.4rem)] text-crema"
            style={{ animation: "salita 0.28s var(--ease-lento) 0.26s both" }}
          >
            {prima} <em className="corsivo">{seconda}</em>
          </h1>

          <p
            className="max-w-[44ch] text-[0.98rem] leading-relaxed text-fumo"
            style={{ animation: "salita 0.28s var(--ease-lento) 0.3s both" }}
          >
            Smash burger schiacciati sulla piastra, whiskey irlandesi, cocktail classici e
            musica dal vivo. In {site.indirizzo.via}, dal 2023.
          </p>
        </div>
      </div>

      <div
        className="alone absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        style={{ animation: "salita 0.3s var(--ease-lento) 0.36s both" }}
        aria-hidden="true"
      >
        {/* fumo e non cenere: con l'onda piena in cima, il cenere spariva
            dove passa una cresta */}
        <span className="font-[family-name:var(--font-inciso)] text-[0.55rem] uppercase tracking-[0.34em] text-fumo">
          Scorri
        </span>
        <span className="relative block h-14 w-px overflow-hidden bg-crema/12">
          <span
            className="absolute inset-x-0 top-0 block h-1/2 bg-verde/80"
            style={{ animation: "scendi 2.6s var(--ease-lento) infinite" }}
          />
        </span>
      </div>
    </section>
  );
}
