import { site, indirizzoCompleto } from "@/data/site";

/**
 * Mappa Google incorniciata come un quadro appeso al muro e calata
 * nella palette del sito con un filtro caldo.
 */
export default function LocationMap() {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(site.mappaQuery)}&output=embed`;
  const link = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mappaQuery)}`;

  return (
    <div className="mappa relative">
      <div
        className="relative overflow-hidden"
        style={{
          border: "1px solid var(--bordo-tenue)",
          boxShadow: "var(--ombra-calda)",
          background: "var(--color-legno-scuro)",
        }}
      >
        <div className="relative aspect-[4/3] w-full lg:aspect-[3/4] xl:aspect-[4/3]">
          <iframe
            src={src}
            title={`Mappa — ${site.nome}, ${indirizzoCompleto}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>

        {/* targa in basso, come l'insegna sotto una cornice */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"
          style={{ borderTop: "1px solid var(--bordo-tenue)", background: "rgba(8,15,11,0.92)" }}
        >
          <div>
            <span className="font-[family-name:var(--font-inciso)] text-[0.55rem] uppercase tracking-[0.28em] text-fumo/70">
              Ci trovi qui
            </span>
            <p className="mt-1 font-[family-name:var(--font-display)] text-[1.05rem] text-crema">
              {indirizzoCompleto}
            </p>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-inciso)] text-[0.6rem] uppercase tracking-[0.22em] text-oro transition-colors duration-500 hover:text-crema"
          >
            Indicazioni →
          </a>
        </div>
      </div>
    </div>
  );
}
