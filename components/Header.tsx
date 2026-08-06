"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navigazione, site } from "@/data/site";

/**
 * Barra fissa. Su telefono le voci di menu sono visibili in una seconda
 * riga: niente hamburger, niente tendina da aprire per sapere cosa c'è.
 */
export default function Header() {
  const [compatto, setCompatto] = useState(false);
  const [attiva, setAttiva] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setCompatto(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* evidenzia la voce della sezione che stai guardando */
  useEffect(() => {
    const sezioni = navigazione
      .map((v) => document.querySelector(v.href))
      .filter((e): e is Element => Boolean(e));
    if (!sezioni.length) return;

    const io = new IntersectionObserver(
      (voci) => {
        const vista = voci
          .filter((v) => v.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vista) setAttiva(`#${vista.target.id}`);
        /* in cima alla pagina nessuna sezione è in vista: spengo tutto,
           altrimenti resterebbe acceso l'ultimo punto visitato */
        else if (window.scrollY < window.innerHeight * 0.6) setAttiva("");
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.01, 0.5] },
    );
    sezioni.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[70]"
      style={{
        background: compatto
          ? "linear-gradient(to bottom, rgba(0,0,0,0.94), rgba(0,0,0,0.86))"
          : "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))",
        borderBottom: compatto ? "1px solid var(--bordo-tenue)" : "1px solid transparent",
        transition: "background 0.7s var(--ease-lento), border-color 0.7s var(--ease-lento)",
      }}
    >
      <div className="contenitore">
        {/* riga 1 — marchio e prenotazione */}
        <div className="flex items-center justify-between gap-4 py-2.5 lg:py-3">
          <a
            href="#home"
            className="flex items-center gap-3"
            aria-label={`${site.nome} — torna in cima`}
          >
            <Image
              src="/brand/disorder-logo.webp"
              alt=""
              width={385}
              height={655}
              priority
              className="w-auto transition-all duration-700"
              style={{ height: compatto ? "2rem" : "2.5rem" }}
            />
            <span className="leading-none">
              <span className="block font-[family-name:var(--font-display)] text-[1.05rem] tracking-[0.02em] text-crema sm:text-[1.2rem]">
                DISORDER
              </span>
              <span className="mt-1 block font-[family-name:var(--font-inciso)] text-[0.48rem] uppercase tracking-[0.3em] text-verde/85 sm:text-[0.55rem]">
                Public House
              </span>
            </span>
          </a>

          <div className="flex items-center gap-8">
            {/* voci inline: da desktop in su */}
            <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigazione principale">
              {navigazione.map((v) => (
                <VoceNav key={v.href} href={v.href} attiva={attiva === v.href}>
                  {v.etichetta}
                </VoceNav>
              ))}
            </nav>

            <a
              href={site.contatti.prenotazioni.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn px-4 py-2.5 text-[0.55rem] sm:px-6 sm:py-3 sm:text-[0.62rem]"
            >
              Prenota
            </a>
          </div>
        </div>

        {/* riga 2 — le stesse voci, visibili su telefono e tablet */}
        <nav
          className="-mx-5 flex items-center gap-1 overflow-x-auto px-5 pb-2 pt-2 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Sezioni del sito"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          {navigazione.map((v) => (
            <VoceNav key={v.href} href={v.href} attiva={attiva === v.href} compatta>
              {v.etichetta}
            </VoceNav>
          ))}
        </nav>
      </div>
    </header>
  );
}

function VoceNav({
  href,
  attiva,
  compatta = false,
  children,
}: {
  href: string;
  attiva: boolean;
  compatta?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-current={attiva ? "true" : undefined}
      className={`group relative whitespace-nowrap font-[family-name:var(--font-inciso)] uppercase transition-colors duration-500 hover:text-verde ${
        compatta
          ? "px-3 py-1.5 text-[0.58rem] tracking-[0.18em]"
          : "py-2 text-[0.68rem] tracking-[0.22em]"
      }`}
      style={{
        color: attiva ? "var(--color-verde)" : "color-mix(in srgb, var(--color-crema) 82%, transparent)",
      }}
    >
      {children}
      <span
        className="absolute inset-x-2 bottom-0 block h-px origin-left bg-verde transition-transform duration-500 group-hover:scale-x-100"
        style={{ transform: attiva ? "scaleX(1)" : "scaleX(0)" }}
      />
    </a>
  );
}
