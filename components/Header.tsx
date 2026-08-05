"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navigazione, site } from "@/data/site";

export default function Header() {
  const [compatto, setCompatto] = useState(false);
  const [aperto, setAperto] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompatto(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = aperto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aperto]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setAperto(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* z-70: deve restare sopra all'overlay del menu mobile (z-60),
          altrimenti il pulsante di chiusura non è raggiungibile */}
      <header
        className="fixed inset-x-0 top-0 z-[70]"
        style={{
          background: compatto
            ? "linear-gradient(to bottom, rgba(9,17,12,0.97), rgba(9,17,12,0.9))"
            : "linear-gradient(to bottom, rgba(7,13,10,0.55), rgba(7,13,10,0))",
          backdropFilter: compatto ? "blur(10px)" : "none",
          borderBottom: compatto ? "1px solid var(--bordo-tenue)" : "1px solid transparent",
          boxShadow: compatto ? "0 18px 40px -32px rgba(0,0,0,0.95)" : "none",
          transition:
            "background 0.7s var(--ease-lento), border-color 0.7s var(--ease-lento), box-shadow 0.7s var(--ease-lento)",
        }}
      >
        <div className="contenitore flex items-center justify-between gap-6">
          <a
            href="#home"
            className="group flex items-center gap-3 py-3"
            aria-label={`${site.nome} — torna in cima`}
          >
            <Image
              src="/brand/disorder-logo.webp"
              alt={site.nome}
              width={385}
              height={655}
              priority
              className="w-auto transition-all duration-700"
              style={{ height: compatto ? "2.45rem" : "3.1rem" }}
            />
            <span className="hidden leading-none sm:block">
              <span className="inciso block text-[0.72rem] text-crema">Disorder</span>
              <span className="mt-1 block font-[family-name:var(--font-inciso)] text-[0.55rem] uppercase tracking-[0.32em] text-oro/80">
                Public House
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Navigazione principale">
            {navigazione.map((v) => (
              <a
                key={v.href}
                href={v.href}
                className="group relative py-2 font-[family-name:var(--font-inciso)] text-[0.68rem] uppercase tracking-[0.22em] text-crema/85 transition-colors duration-500 hover:text-oro"
              >
                {v.etichetta}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-oro transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            ))}
            <a
              href={site.contatti.prenotazioni.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn px-6 py-3 text-[0.62rem]"
            >
              Prenota
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setAperto((v) => !v)}
            aria-label={aperto ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={aperto}
            className="relative flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <span
              className="block h-px w-6 bg-crema transition-all duration-500"
              style={{ transform: aperto ? "translateY(7px) rotate(45deg)" : "none" }}
            />
            <span
              className="block h-px w-6 bg-crema transition-all duration-300"
              style={{ opacity: aperto ? 0 : 1 }}
            />
            <span
              className="block h-px w-6 bg-crema transition-all duration-500"
              style={{ transform: aperto ? "translateY(-7px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </header>

      {/* menu mobile a tutta pagina */}
      <div
        className="fixed inset-0 z-[60] lg:hidden"
        style={{
          pointerEvents: aperto ? "auto" : "none",
          clipPath: aperto ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
          transition: "clip-path 0.75s var(--ease-sipario)",
        }}
      >
        <div className="legno absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,19,14,0.93), rgba(9,20,13,0.97) 60%, #08110c)",
          }}
        />

        <nav
          className="relative flex h-full flex-col items-center justify-center gap-1 px-8"
          aria-label="Navigazione mobile"
        >
          {navigazione.map((v, i) => (
            <a
              key={v.href}
              href={v.href}
              onClick={() => setAperto(false)}
              className="py-3 font-[family-name:var(--font-display)] text-[2.1rem] leading-tight text-crema transition-colors duration-500 hover:text-oro"
              style={{
                opacity: aperto ? 1 : 0,
                transform: aperto ? "none" : "translateY(18px)",
                transition: `opacity 0.6s var(--ease-lento) ${180 + i * 80}ms, transform 0.6s var(--ease-lento) ${180 + i * 80}ms, color 0.4s`,
              }}
            >
              {v.etichetta}
            </a>
          ))}

          <span className="my-7 block h-px w-20 bg-oro/40" />

          <a
            href={site.contatti.prenotazioni.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setAperto(false)}
            className="btn"
            style={{
              opacity: aperto ? 1 : 0,
              transition: "opacity 0.6s var(--ease-lento) 520ms",
            }}
          >
            Prenota un tavolo
          </a>

          <div
            className="mt-9 flex gap-6"
            style={{ opacity: aperto ? 1 : 0, transition: "opacity 0.6s var(--ease-lento) 600ms" }}
          >
            {site.social.map((s) => (
              <a
                key={s.nome}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inciso text-fumo transition-colors hover:text-oro"
              >
                {s.nome}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
