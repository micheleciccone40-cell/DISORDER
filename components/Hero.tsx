"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";

export default function Hero() {
  const sfondo = useRef<HTMLDivElement>(null);
  const contenuto = useRef<HTMLDivElement>(null);

  /* Parallasse molto contenuta: la parete di legno scorre più lenta del testo. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const aggiorna = () => {
      raf = 0;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return;
      if (sfondo.current) sfondo.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
      if (contenuto.current) {
        contenuto.current.style.transform = `translate3d(0, ${y * -0.06}px, 0)`;
        contenuto.current.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.75)));
      }
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
      {/* parete di legno del locale */}
      <div ref={sfondo} className="absolute inset-x-0 -top-[8%] h-[125%] will-change-transform">
        <Image
          src="/texture/hero-legno.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ animation: "respiro 26s ease-in-out infinite alternate" }}
        />
      </div>

      {/* velature calde: verde bottiglia in alto e in basso, luce ambrata al centro */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 64% at 50% 44%, rgba(28,17,7,0.18) 0%, rgba(10,19,14,0.70) 62%, rgba(7,13,10,0.94) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,15,11,0.88) 0%, rgba(9,20,13,0.22) 30%, rgba(9,20,13,0.45) 70%, var(--color-notte) 100%)",
        }}
      />

      <div
        ref={contenuto}
        className="contenitore relative z-10 pb-28 pt-24 text-center sm:pb-32 sm:pt-28"
      >
        <Image
          src="/brand/disorder-logo.webp"
          alt={`${site.nome} — logo`}
          width={385}
          height={655}
          priority
          className="mx-auto h-[min(25vh,12.5rem)] w-auto drop-shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
          style={{ animation: "affiora 1.6s var(--ease-lento) 3.55s both" }}
        />

        <div className="mt-7 flex flex-col items-center gap-4 sm:mt-9 sm:gap-5">
          <span
            className="inciso text-oro/90"
            style={{ animation: "salita 1s var(--ease-lento) 4.0s both" }}
          >
            {site.claim} · {site.citta}
          </span>

          <h1
            className="max-w-[16ch] text-balance text-[clamp(2.6rem,7.5vw,5.4rem)] text-crema"
            style={{ animation: "salita 1.15s var(--ease-lento) 4.15s both" }}
          >
            {prima} <em className="corsivo">{seconda}</em>
          </h1>

          <p
            className="max-w-[46ch] text-[1.02rem] leading-relaxed text-fumo"
            style={{ animation: "salita 1.15s var(--ease-lento) 4.35s both" }}
          >
            Smash burger schiacciati sulla piastra, whiskey irlandesi, cocktail classici e musica
            dal vivo. In Piazza Palazzo, dal 2023.
          </p>

          <div
            className="mt-4 flex flex-col items-center gap-3 sm:flex-row"
            style={{ animation: "salita 1.15s var(--ease-lento) 4.55s both" }}
          >
            <a href="#menu" className="btn w-full sm:w-auto">
              Scopri il menu
            </a>
            <a href="#eventi" className="btn btn-fantasma w-full sm:w-auto">
              Prossimi eventi
            </a>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        style={{ animation: "salita 1.2s var(--ease-lento) 4.9s both" }}
        aria-hidden="true"
      >
        <span className="font-[family-name:var(--font-inciso)] text-[0.58rem] uppercase tracking-[0.34em] text-fumo/70">
          Entra
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-crema/15">
          <span
            className="absolute inset-x-0 top-0 block h-1/2 bg-oro/80"
            style={{ animation: "scendi 2.6s var(--ease-lento) infinite" }}
          />
        </span>
      </div>

      <style>{`
        @keyframes scendi {
          0%   { transform: translateY(-100%); opacity: 0; }
          35%  { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
