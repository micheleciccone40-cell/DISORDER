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
    <section id="menu" className="sezione velo relative">
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

        <div className="mt-12 md:mt-16">
          <Rivela ritardo={80}>
            <div className="lastra relative overflow-hidden px-5 py-10 sm:px-10 md:px-14 md:py-16">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
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
                          background: attivo ? "var(--color-oro)" : "transparent",
                          color: attivo ? "#14100a" : "var(--color-fumo)",
                          border: `1px solid ${attivo ? "var(--color-oro)" : "rgba(255,255,255,0.16)"}`,
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

                <p className="mt-5 text-center font-[family-name:var(--font-inciso)] text-[0.55rem] uppercase tracking-[0.26em] text-cenere">
                  {numeroPiatti} voci
                </p>

                <span
                  className="mx-auto mb-12 mt-8 block h-px w-full max-w-md"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(198,161,91,0.4), transparent)",
                  }}
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

                <p className="mt-16 text-center text-[0.78rem] leading-relaxed text-cenere">
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
      style={{ color: attivo ? "var(--color-crema)" : "var(--color-cenere)" }}
    >
      {children}
      <span
        className="absolute inset-x-3 bottom-1 block h-px origin-center bg-oro transition-transform duration-500"
        style={{ transform: attivo ? "scaleX(1)" : "scaleX(0)" }}
      />
    </button>
  );
}
