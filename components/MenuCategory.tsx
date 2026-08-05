import type { Categoria } from "@/data/menu";
import { CardPiatto, RigaPiatto } from "./MenuItem";

export default function MenuCategory({ categoria }: { categoria: Categoria }) {
  const conFoto = categoria.layout === "gallery";

  /* sottogruppi (es. Irish Whiskey, Rum…) se la categoria li dichiara */
  const gruppi = categoria.gruppi?.length
    ? categoria.gruppi
        .map((g) => ({ nome: g, piatti: categoria.piatti.filter((p) => p.gruppo === g) }))
        .filter((g) => g.piatti.length > 0)
    : [{ nome: null as string | null, piatti: categoria.piatti }];

  return (
    <section aria-labelledby={`cat-${categoria.id}`} className="scroll-mt-32">
      <header className="mb-9 text-center">
        <h3
          id={`cat-${categoria.id}`}
          className="text-[clamp(1.8rem,4vw,2.7rem)] text-[#24160a]"
        >
          {categoria.nome}
        </h3>
        {categoria.intro && (
          <p
            className="mx-auto mt-3 max-w-[46ch] font-[family-name:var(--font-display)] text-[1.02rem] italic"
            style={{ color: "#7a5a34" }}
          >
            {categoria.intro}
          </p>
        )}
        <span
          className="mx-auto mt-6 block h-px w-20"
          style={{ background: "color-mix(in srgb, var(--color-oro-scuro) 60%, transparent)" }}
        />
      </header>

      {conFoto ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoria.piatti.map((p, i) => (
            <CardPiatto key={p.nome} piatto={p} indice={i} />
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-5xl">
          {gruppi.map((g) => (
            <div key={g.nome ?? "unico"} className="mb-10 last:mb-0">
              {g.nome && (
                <h4
                  className="mb-4 font-[family-name:var(--font-inciso)] text-[0.62rem] uppercase tracking-[0.3em]"
                  style={{ color: "var(--color-oro-scuro)" }}
                >
                  {g.nome}
                </h4>
              )}
              <ul
                className={
                  g.piatti.length > 6 && !g.piatti.some((p) => p.descrizione)
                    ? "grid gap-x-12 sm:grid-cols-2"
                    : "grid gap-x-14 lg:grid-cols-2"
                }
              >
                {g.piatti.map((p, i) => (
                  <RigaPiatto key={p.nome} piatto={p} indice={i} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
