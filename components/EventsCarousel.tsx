"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { eventiRecenti, formattaData } from "@/data/events";
import Rivela from "./Rivela";

const AUTOPLAY_MS = 8000;

export default function EventsCarousel() {
  const [indice, setIndice] = useState(0);
  const [inPausa, setInPausa] = useState(false);
  const [trascinamento, setTrascinamento] = useState(0);
  const [staTrascinando, setStaTrascinando] = useState(false);

  const pista = useRef<HTMLDivElement>(null);
  const partenzaX = useRef(0);
  const totale = eventiRecenti.length;

  const vaiA = useCallback(
    (i: number) => setIndice(((i % totale) + totale) % totale),
    [totale],
  );

  /* autoplay leggero, in pausa su hover, focus, drag e a scheda nascosta */
  useEffect(() => {
    if (inPausa || staTrascinando || totale < 2) return;
    if (typeof document !== "undefined" && document.hidden) return;
    const id = window.setInterval(() => setIndice((i) => (i + 1) % totale), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [inPausa, staTrascinando, totale, indice]);

  useEffect(() => {
    const onVis = () => setInPausa(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  /* trascinamento con puntatore: funziona con mouse, dito e penna */
  const giuPuntatore = (e: React.PointerEvent) => {
    if (totale < 2) return;
    partenzaX.current = e.clientX;
    setStaTrascinando(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const muoviPuntatore = (e: React.PointerEvent) => {
    if (!staTrascinando) return;
    setTrascinamento(e.clientX - partenzaX.current);
  };

  const suPuntatore = () => {
    if (!staTrascinando) return;
    const larghezza = pista.current?.clientWidth ?? 1;
    const soglia = Math.min(110, larghezza * 0.16);
    if (trascinamento < -soglia) vaiA(indice + 1);
    else if (trascinamento > soglia) vaiA(indice - 1);
    setTrascinamento(0);
    setStaTrascinando(false);
  };

  const suTasto = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") vaiA(indice + 1);
    if (e.key === "ArrowLeft") vaiA(indice - 1);
  };

  if (totale === 0) return null;

  return (
    <section id="eventi" className="sezione relative overflow-hidden bg-notte">
      {/* alone caldo dietro al carosello */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(35,64,40,0.55) 0%, transparent 70%)",
        }}
      />

      <div className="contenitore relative">
        <Rivela className="mb-12 text-center md:mb-16">
          <span className="inciso text-oro/90">Dal palco</span>
          <h2 className="mx-auto mt-5 max-w-[18ch] text-[clamp(2.1rem,5vw,3.6rem)]">
            Le ultime <em className="corsivo">serate</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-fumo">
            Tributi, duo acustici, country western. Quello che è passato dal nostro palco — e
            quello che ci passerà.
          </p>
        </Rivela>

        <Rivela ritardo={120}>
          <div
            className="relative"
            onMouseEnter={() => setInPausa(true)}
            onMouseLeave={() => setInPausa(false)}
            onFocusCapture={() => setInPausa(true)}
            onBlurCapture={() => setInPausa(false)}
          >
            <div
              ref={pista}
              className="trascina overflow-hidden rounded-[3px]"
              style={{ border: "1px solid var(--bordo-tenue)" }}
              role="region"
              aria-roledescription="carosello"
              aria-label="Ultimi eventi"
              tabIndex={0}
              onKeyDown={suTasto}
              onPointerDown={giuPuntatore}
              onPointerMove={muoviPuntatore}
              onPointerUp={suPuntatore}
              onPointerCancel={suPuntatore}
            >
              <div
                className="flex"
                style={{
                  width: `${totale * 100}%`,
                  transform: `translate3d(calc(${(-indice * 100) / totale}% + ${trascinamento}px), 0, 0)`,
                  transition: staTrascinando
                    ? "none"
                    : "transform 0.95s var(--ease-lento)",
                }}
              >
                {eventiRecenti.map((ev, i) => {
                  const d = formattaData(ev.data);
                  const attivo = i === indice;
                  return (
                    <article
                      key={ev.id}
                      className="relative grid grid-cols-1 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]"
                      style={{ width: `${100 / totale}%` }}
                      aria-hidden={!attivo}
                      aria-roledescription="slide"
                      aria-label={`${i + 1} di ${totale}`}
                    >
                      {/* locandina, incorniciata: object-contain così nessuna
                          scritta del manifesto viene tagliata */}
                      <div
                        className="relative flex items-center justify-center p-5 sm:p-8 md:block md:min-h-[34rem] md:p-0"
                        style={{
                          background:
                            "radial-gradient(ellipse at 50% 40%, #2a1a0d 0%, #150d06 60%, #0c0703 100%)",
                        }}
                      >
                        <div className="relative aspect-[4/5] w-full max-w-[19rem] overflow-hidden shadow-[0_24px_50px_-24px_rgba(0,0,0,0.95)] md:absolute md:inset-0 md:aspect-auto md:max-w-none md:shadow-none">
                          <Image
                            src={ev.immagine}
                            alt={ev.alt}
                            fill
                            sizes="(max-width: 768px) 90vw, 42vw"
                            draggable={false}
                            className="object-contain"
                            style={{
                              transform: attivo ? "scale(1)" : "scale(1.04)",
                              transition: "transform 1.6s var(--ease-lento)",
                            }}
                            priority={i === 0}
                          />
                        </div>
                      </div>

                      {/* testo */}
                      <div className="legno relative flex flex-col justify-center gap-5 px-6 py-10 sm:px-10 md:px-12 md:py-14">
                        {/* la data sta qui e non sul manifesto: sulle locandine
                            il titolo è in alto e verrebbe coperto */}
                        <div className="flex items-end gap-4">
                          <span className="font-[family-name:var(--font-display)] text-[3.2rem] leading-[0.85] text-oro">
                            {d.giorno}
                          </span>
                          <span className="flex flex-col pb-1">
                            <span className="font-[family-name:var(--font-inciso)] text-[0.6rem] uppercase tracking-[0.26em] text-crema/90">
                              {d.mese} {d.anno}
                            </span>
                            <span className="mt-1 font-[family-name:var(--font-display)] text-[0.95rem] italic capitalize text-fumo">
                              {d.settimana}
                            </span>
                          </span>
                        </div>

                        <div>
                          <span className="inciso text-oro/90">{ev.occhiello}</span>
                          <h3 className="mt-4 text-[clamp(1.7rem,3.4vw,2.75rem)] text-crema">
                            {ev.titolo}
                          </h3>
                          {ev.artista && (
                            <p className="mt-3 font-[family-name:var(--font-display)] text-[1.05rem] italic text-oro/85">
                              {ev.artista}
                            </p>
                          )}
                        </div>

                        <span className="block h-px w-16 bg-oro/35" />

                        <p className="max-w-[54ch] leading-relaxed text-fumo">{ev.descrizione}</p>

                        {ev.nota && (
                          <p
                            className="max-w-[54ch] border-l-2 py-1 pl-4 text-[0.92rem] italic text-crema/85"
                            style={{ borderColor: "var(--color-bordeaux)" }}
                          >
                            {ev.nota}
                          </p>
                        )}

                        <dl className="mt-1 grid gap-x-8 gap-y-3 text-[0.86rem] sm:grid-cols-2">
                          <div>
                            <dt className="font-[family-name:var(--font-inciso)] text-[0.55rem] uppercase tracking-[0.26em] text-fumo/70">
                              Orario
                            </dt>
                            <dd className="mt-1 text-crema">{ev.orario}</dd>
                          </div>
                          <div>
                            <dt className="font-[family-name:var(--font-inciso)] text-[0.55rem] uppercase tracking-[0.26em] text-fumo/70">
                              Dove
                            </dt>
                            <dd className="mt-1 text-crema">{ev.luogo}</dd>
                          </div>
                        </dl>

                        {ev.cta && (
                          <a
                            href={ev.cta.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn mt-3 self-start"
                            tabIndex={attivo ? 0 : -1}
                          >
                            {ev.cta.etichetta}
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {totale > 1 && (
              <>
                <FrecciaCarosello direzione="sx" onClick={() => vaiA(indice - 1)} />
                <FrecciaCarosello direzione="dx" onClick={() => vaiA(indice + 1)} />
              </>
            )}
          </div>
        </Rivela>

        {totale > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            {eventiRecenti.map((ev, i) => (
              <button
                key={ev.id}
                type="button"
                onClick={() => vaiA(i)}
                aria-label={`Vai a ${ev.titolo}`}
                aria-current={i === indice}
                className="group py-2"
              >
                <span
                  className="block h-[2px] transition-all duration-700"
                  style={{
                    width: i === indice ? "3rem" : "1.25rem",
                    background:
                      i === indice ? "var(--color-oro)" : "color-mix(in srgb, var(--color-fumo) 45%, transparent)",
                  }}
                />
              </button>
            ))}
          </div>
        )}

        <p className="mt-6 text-center font-[family-name:var(--font-inciso)] text-[0.55rem] uppercase tracking-[0.28em] text-fumo/55 md:hidden">
          Scorri con il dito
        </p>
      </div>
    </section>
  );
}

function FrecciaCarosello({
  direzione,
  onClick,
}: {
  direzione: "sx" | "dx";
  onClick: () => void;
}) {
  const sx = direzione === "sx";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={sx ? "Evento precedente" : "Evento successivo"}
      className="absolute top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-oro/30 bg-notte/75 text-crema backdrop-blur-[3px] transition-all duration-500 hover:border-oro hover:bg-notte hover:text-oro md:flex"
      style={sx ? { left: "-1.5rem" } : { right: "-1.5rem" }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={sx ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
