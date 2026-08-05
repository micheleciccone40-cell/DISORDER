"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

/**
 * Apertura del sito: buio caldo, il logo affiora, la scritta si incide,
 * poi il sipario si alza sulla home. Nessun glitch, nessun conto alla rovescia.
 */
export default function Intro() {
  const [alzato, setAlzato] = useState(false);
  const [smontato, setSmontato] = useState(false);

  useEffect(() => {
    const ridotto =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (ridotto) {
      setSmontato(true);
      return;
    }

    document.body.classList.add("intro-attiva");
    const t1 = window.setTimeout(() => setAlzato(true), 2500);
    const t2 = window.setTimeout(() => {
      setSmontato(true);
      document.body.classList.remove("intro-attiva");
    }, 3700);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.classList.remove("intro-attiva");
    };
  }, []);

  if (smontato) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] overflow-hidden"
      style={{
        transform: alzato ? "translateY(-101%)" : "none",
        transition: "transform 1.15s var(--ease-sipario)",
      }}
    >
      <div className="legno absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, rgba(22,52,31,0.55) 0%, rgba(10,19,14,0.94) 55%, #070f0b 100%)",
        }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 px-6">
        <Image
          src="/brand/disorder-logo.webp"
          alt=""
          width={385}
          height={655}
          priority
          className="h-[min(38vh,17rem)] w-auto"
          style={{ animation: "affiora 1.5s var(--ease-lento) 0.15s both" }}
        />

        <div className="flex flex-col items-center gap-4">
          <span
            className="inciso text-crema/85"
            style={{ animation: "salita 1s var(--ease-lento) 1s both" }}
          >
            {site.claim}
          </span>
          <span
            className="block h-px w-24 origin-center bg-oro/70"
            style={{ animation: "riga-oro 1.1s var(--ease-lento) 1.25s both" }}
          />
          <span
            className="text-center font-[family-name:var(--font-display)] text-[1.05rem] italic text-fumo sm:text-[1.25rem]"
            style={{ animation: "salita 1s var(--ease-lento) 1.5s both" }}
          >
            {site.citta} — dal 2023
          </span>
        </div>
      </div>
    </div>
  );
}
