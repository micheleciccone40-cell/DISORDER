import Image from "next/image";
import { site } from "@/data/site";

/**
 * Offerta pranzo. Prezzi e promessa arrivano dal post Instagram "Disorder Lunch"
 * dentro eventi.pdf: i giorni in cui è attiva non sono indicati nel post e quindi
 * non compaiono qui (si aggiungono da `site.lunch.nota`).
 */
export default function LunchBanner() {
  const { lunch } = site;

  return (
    <aside className="relative grid overflow-hidden md:grid-cols-2" style={{ border: "1px solid var(--bordo-tenue)" }}>
      {/* su mobile do all'immagine le sue proporzioni reali, così la scritta
          stampata sul banner non viene tagliata */}
      <div className="relative aspect-[1179/560] md:aspect-auto md:min-h-full">
        <Image
          src={lunch.immagine}
          alt="L'insegna del Disorder Public House in Piazza Palazzo"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(9,20,13,0.15), rgba(9,20,13,0.9)), linear-gradient(to right, transparent 60%, rgba(9,20,13,0.85))",
          }}
        />
      </div>

      <div className="bg-bottiglia px-6 py-9 sm:px-10 sm:py-12">
        <span className="inciso text-oro/90">A pranzo</span>
        <h3 className="mt-4 text-[clamp(1.7rem,3.4vw,2.4rem)] text-crema">{lunch.titolo}</h3>
        <p className="mt-3 font-[family-name:var(--font-display)] text-[1.05rem] italic text-oro/85">
          {lunch.promessa}
        </p>

        <ul className="mt-7 space-y-3">
          {lunch.voci.map((v) => (
            <li key={v.nome} className="voce text-[0.98rem]">
              <span className="text-crema">{v.nome}</span>
              <span className="voce-punti text-fumo" aria-hidden="true" />
              <span className="font-[family-name:var(--font-display)] text-oro">{v.prezzo}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[0.86rem] text-fumo">{lunch.incluso}.</p>
        {lunch.nota && <p className="mt-2 text-[0.86rem] text-fumo">{lunch.nota}</p>}
      </div>
    </aside>
  );
}
