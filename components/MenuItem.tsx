import Image from "next/image";
import type { Piatto } from "@/data/menu";

function Prezzo({ valore, classe = "" }: { valore: string; classe?: string }) {
  return (
    <span className={`whitespace-nowrap font-[family-name:var(--font-display)] ${classe}`}>
      <span className="mr-[0.12em] align-[0.08em] text-[0.8em]">€</span>
      {valore}
    </span>
  );
}

function Etichetta({ testo }: { testo: string }) {
  return (
    <span
      className="inline-block px-2 py-[3px] font-[family-name:var(--font-inciso)] text-[0.5rem] uppercase tracking-[0.2em] text-oro"
      style={{ border: "1px solid var(--bordo-tenue)" }}
    >
      {testo}
    </span>
  );
}

/** Card con fotografia reale del piatto. */
export function CardPiatto({ piatto, indice }: { piatto: Piatto; indice: number }) {
  return (
    <article
      className="group flex flex-col overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.035)",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: "0 20px 44px -34px rgba(0,0,0,0.95)",
        animation: "salita 0.75s var(--ease-lento) both",
        animationDelay: `${Math.min(indice, 8) * 55}ms`,
      }}
    >
      {piatto.foto && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={piatto.foto}
            alt={piatto.nome}
            fill
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.07]"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent 55%)" }}
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 px-6 py-6">
        {/* niente puntini qui: sulle card il nome va spesso a capo e i
            puntini si spezzerebbero. Restano nelle righe della carta. */}
        <div className="flex items-baseline justify-between gap-4">
          <h4 className="text-[1.2rem] leading-snug text-crema">{piatto.nome}</h4>
          <Prezzo valore={piatto.prezzo} classe="text-[1.2rem] text-oro" />
        </div>

        {piatto.descrizione && (
          <p className="text-[0.88rem] leading-relaxed text-fumo">{piatto.descrizione}</p>
        )}

        {piatto.etichetta && (
          <div className="mt-auto pt-2">
            <Etichetta testo={piatto.etichetta} />
          </div>
        )}
      </div>
    </article>
  );
}

/** Riga da menu cartaceo, con i puntini di guida fino al prezzo. */
export function RigaPiatto({ piatto, indice }: { piatto: Piatto; indice: number }) {
  return (
    <li
      className="group py-4"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        animation: "salita 0.6s var(--ease-lento) both",
        animationDelay: `${Math.min(indice, 14) * 35}ms`,
      }}
    >
      <div className="voce">
        <h4 className="text-[1.06rem] leading-snug text-crema transition-colors duration-500 group-hover:text-oro">
          {piatto.nome}
        </h4>
        <span className="voce-punti text-cenere" aria-hidden="true" />
        <Prezzo valore={piatto.prezzo} classe="text-[1.06rem] text-oro" />
      </div>

      {piatto.descrizione && (
        <p className="mt-1.5 max-w-[62ch] pr-10 text-[0.86rem] leading-relaxed text-fumo">
          {piatto.descrizione}
        </p>
      )}

      {piatto.etichetta && (
        <div className="mt-2.5">
          <Etichetta testo={piatto.etichetta} />
        </div>
      )}
    </li>
  );
}
