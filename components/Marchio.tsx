/**
 * Il marchio scritto: niente immagine, solo tipografia.
 * DISORDER in Fraunces, PUBLIC HOUSE in Cinzel spaziato —
 * gli stessi due caratteri incisi sul bicchiere del logo.
 */
export default function Marchio({
  taglia = "grande",
  className = "",
}: {
  taglia?: "grande" | "media" | "piccola";
  className?: string;
}) {
  const misure = {
    grande: {
      nome: "text-[clamp(3.2rem,13vw,9.5rem)]",
      sotto: "text-[clamp(0.6rem,1.5vw,0.95rem)] tracking-[0.52em]",
      riga: "w-[min(70%,22rem)]",
      spazio: "gap-4 sm:gap-6",
    },
    media: {
      nome: "text-[clamp(2rem,5vw,3rem)]",
      sotto: "text-[0.6rem] tracking-[0.42em]",
      riga: "w-[min(70%,12rem)]",
      spazio: "gap-3",
    },
    piccola: {
      nome: "text-[1.05rem]",
      sotto: "text-[0.48rem] tracking-[0.3em]",
      riga: "hidden",
      spazio: "gap-0.5",
    },
  }[taglia];

  return (
    <span className={`flex flex-col items-center ${misure.spazio} ${className}`}>
      {taglia !== "piccola" && (
        <span
          className={`block h-px ${misure.riga}`}
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-oro) 70%, transparent), transparent)",
          }}
          aria-hidden="true"
        />
      )}

      <span
        className={`block font-[family-name:var(--font-display)] leading-[0.86] text-crema ${misure.nome}`}
        style={{ fontVariationSettings: '"SOFT" 25, "WONK" 0, "opsz" 144', letterSpacing: "-0.02em" }}
      >
        DISORDER
      </span>

      <span
        className={`block font-[family-name:var(--font-inciso)] font-semibold uppercase text-oro ${misure.sotto}`}
      >
        Public&nbsp;House
      </span>

      {taglia !== "piccola" && (
        <span
          className={`block h-px ${misure.riga}`}
          style={{
            background:
              "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-oro) 70%, transparent), transparent)",
          }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
