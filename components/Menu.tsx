"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { categoriePerMacro, macroFiltri, menu, type Macro } from "@/data/menu";
import MenuCategory from "./MenuCategory";
import Rivela from "./Rivela";
import LunchBanner from "./LunchBanner";

export default function Menu() {
  const [macro, setMacro] = useState<"tutto" | Macro>("tutto");
  const [categoria, setCategoria] = useState<string>("tutte");

  const categorieVisibili = useMemo(() => categoriePerMacro(macro), [macro]);

  const daMostrare = useMemo(() => {
    if (categoria === "tutte") return categorieVisibili;
    const trovata = menu.find((c) => c.id === categoria);
    return trovata ? [trovata] : categorieVisibili;
  }, [categoria, categorieVisibili]);

  const cambiaMacro = (m: "tutto" | Macro) => {
    setMacro(m);
    setCategoria("tutte");
  };

  const numeroPiatti = daMostrare.reduce((n, c) => n + c.piatti.length, 0);

  return (
    <section id="menu" className="relative overflow-hidden">
      {/* fondale: la parete di legno del locale, tenuta scura */}
      <div className="absolute inset-0 bg-notte" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url(/texture/legno.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-notte) 0%, rgba(9,20,13,0.86) 22%, rgba(9,20,13,0.86) 78%, var(--color-notte) 100%)",
        }}
      />

      <div className="relative pb-[clamp(4.5rem,9vw,8rem)] pt-[clamp(4.5rem,9vw,8.5rem)]">
        <div className="contenitore">
          <Rivela className="text-center">
            <span className="inciso text-oro/90">La carta</span>
            <h2 className="mx-auto mt-5 max-w-[16ch] text-[clamp(2.1rem,5vw,3.6rem)] text-crema">
              Quello che <em className="corsivo">si mangia</em>
            </h2>
            <p className="mx-auto mt-5 max-w-[54ch] text-fumo">
              Cucina e bancone, per intero. Prezzi e descrizioni sono quelli del locale: se cambia
              qualcosa in cucina, cambia una riga qui.
            </p>
          </Rivela>
        </div>

        {/* striscia video: il nostro smash burger, dal trailer del locale */}
        <Rivela ritardo={120} className="mt-14">
          <FasciaTrailer />
        </Rivela>

        {/* il menu vero e proprio, su carta appoggiata al tavolo */}
        <div className="contenitore mt-14 md:mt-20">
          <Rivela ritardo={80}>
            <div
              className="pergamena relative overflow-hidden px-5 py-10 sm:px-10 md:px-14 md:py-16"
              style={{
                boxShadow: "0 40px 90px -50px rgba(0,0,0,0.95)",
                border: "1px solid rgba(107,68,35,0.28)",
              }}
            >
              {/* venatura leggerissima della carta */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.09]"
                style={{ backgroundImage: "var(--grana)" }}
                aria-hidden="true"
              />

              <div className="relative">
                {/* filtro macro */}
                <div
                  className="flex flex-wrap items-center justify-center gap-2"
                  role="group"
                  aria-label="Filtra cucina o bar"
                >
                  {macroFiltri.map((f) => {
                    const attivo = macro === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => cambiaMacro(f.id)}
                        aria-pressed={attivo}
                        className="px-6 py-3 font-[family-name:var(--font-inciso)] text-[0.62rem] uppercase tracking-[0.24em] transition-all duration-500"
                        style={{
                          background: attivo ? "#24160a" : "transparent",
                          color: attivo ? "var(--color-pergamena)" : "#6b4423",
                          border: `1px solid ${attivo ? "#24160a" : "rgba(107,68,35,0.35)"}`,
                        }}
                      >
                        {f.etichetta}
                      </button>
                    );
                  })}
                </div>

                {/* categorie */}
                <div
                  className="mt-6 flex flex-wrap items-center justify-center gap-x-1 gap-y-1"
                  role="group"
                  aria-label="Scegli una portata"
                >
                  <ChipCategoria
                    attivo={categoria === "tutte"}
                    onClick={() => setCategoria("tutte")}
                  >
                    Tutte
                  </ChipCategoria>
                  {categorieVisibili.map((c) => (
                    <ChipCategoria
                      key={c.id}
                      attivo={categoria === c.id}
                      onClick={() => setCategoria(c.id)}
                    >
                      {c.nome}
                    </ChipCategoria>
                  ))}
                </div>

                <p className="mt-5 text-center font-[family-name:var(--font-inciso)] text-[0.55rem] uppercase tracking-[0.26em]" style={{ color: "#8a6a44" }}>
                  {numeroPiatti} voci
                </p>

                <span
                  className="mx-auto mt-8 mb-12 block h-px w-full max-w-md"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(107,68,35,0.4), transparent)" }}
                />

                {/* contenuto animato */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${macro}-${categoria}`}
                    initial={{ opacity: 0, y: 18, scale: 0.995 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.995 }}
                    transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                    className="space-y-20"
                  >
                    {daMostrare.map((c) => (
                      <MenuCategory key={c.id} categoria={c} />
                    ))}
                  </motion.div>
                </AnimatePresence>

                <p
                  className="mt-16 text-center text-[0.78rem] leading-relaxed"
                  style={{ color: "#8a6a44" }}
                >
                  Per allergeni e intolleranze chiedi al personale di sala.
                </p>
              </div>
            </div>
          </Rivela>

          <Rivela ritardo={140} className="mt-8">
            <LunchBanner />
          </Rivela>
        </div>
      </div>
    </section>
  );
}

function ChipCategoria({
  attivo,
  onClick,
  children,
}: {
  attivo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={attivo}
      className="relative px-4 py-2 font-[family-name:var(--font-display)] text-[0.98rem] transition-colors duration-500"
      style={{ color: attivo ? "#24160a" : "#8a6a44" }}
    >
      {children}
      <span
        className="absolute inset-x-3 bottom-1 block h-px origin-center transition-transform duration-500"
        style={{
          background: "var(--color-oro-scuro)",
          transform: attivo ? "scaleX(1)" : "scaleX(0)",
        }}
      />
    </button>
  );
}

function FasciaTrailer() {
  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{ height: "clamp(15rem, 44vw, 30rem)" }}
    >
      <video
        className="absolute inset-0 h-full w-full object-contain"
        src="/trailer/disorder-trailer.mp4"
        poster="/trailer/poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Il nostro smash burger"
      />
      {/* velatura ambrata: toglie il nero da spot pubblicitario e lo scalda */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(122,72,20,0.30) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, var(--color-notte) 0%, transparent 18%, transparent 82%, var(--color-notte) 100%), linear-gradient(to bottom, var(--color-notte) 0%, transparent 14%, transparent 74%, rgba(9,20,13,0.96) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 p-5 text-center sm:p-8">
        <p className="font-[family-name:var(--font-display)] text-[clamp(1.1rem,2.6vw,1.8rem)] italic text-crema/95">
          Due patty da 90 grammi, schiacciate sulla piastra al momento.
        </p>
      </div>
    </div>
  );
}
