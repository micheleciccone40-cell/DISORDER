import Image from "next/image";
import { navigazione, site, indirizzoCompleto } from "@/data/site";
import Ornamento from "./Ornamento";

export default function Footer() {
  const anno = new Date().getFullYear();

  return (
    <footer id="contatti" className="relative overflow-hidden bg-notte pt-[clamp(4rem,8vw,7rem)]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-[0.16]"
        style={{
          backgroundImage: "url(/texture/legno.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "linear-gradient(to bottom, black, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />

      <div className="contenitore relative">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          {/* identità */}
          <div>
            <Image
              src="/brand/disorder-logo.webp"
              alt={site.nome}
              width={385}
              height={655}
              className="h-24 w-auto"
            />
            <p className="mt-6 max-w-[38ch] text-[0.92rem] leading-relaxed text-fumo">
              {site.sottotitolo}. Smash burger, whiskey irlandesi e musica dal vivo in{" "}
              {site.indirizzo.via}.
            </p>
            <div className="mt-6 flex gap-3">
              {site.social.map((s) => (
                <a
                  key={s.nome}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.nome}
                  className="flex h-10 w-10 items-center justify-center border text-fumo transition-all duration-500 hover:border-oro hover:text-oro"
                  style={{ borderColor: "var(--bordo-tenue)" }}
                >
                  {s.nome === "Instagram" ? <IconaInstagram /> : <IconaFacebook />}
                </a>
              ))}
            </div>
          </div>

          {/* dove */}
          <div>
            <h4 className="font-[family-name:var(--font-inciso)] text-[0.58rem] uppercase tracking-[0.28em] text-oro/85">
              Dove siamo
            </h4>
            <address className="mt-5 not-italic text-[0.92rem] leading-relaxed text-fumo">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mappaQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-500 hover:text-oro"
              >
                {indirizzoCompleto}
                <br />
                {site.indirizzo.provincia} — {site.indirizzo.paese}
              </a>
            </address>

            <div className="mt-6 space-y-1 text-[0.92rem] text-fumo">
              {site.contatti.telefono && (
                <a href={`tel:${site.contatti.telefono}`} className="block hover:text-oro">
                  {site.contatti.telefono}
                </a>
              )}
              {site.contatti.email && (
                <a href={`mailto:${site.contatti.email}`} className="block hover:text-oro">
                  {site.contatti.email}
                </a>
              )}
              <a
                href={site.contatti.prenotazioni.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-oro transition-colors duration-500 hover:text-crema"
              >
                {site.contatti.prenotazioni.etichetta} →
              </a>
            </div>
          </div>

          {/* orari */}
          <div>
            <h4 className="font-[family-name:var(--font-inciso)] text-[0.58rem] uppercase tracking-[0.28em] text-oro/85">
              Orari
            </h4>
            <ul className="mt-5 space-y-2 text-[0.86rem]">
              {site.orari.map((o) => (
                <li key={o.giorno} className="voce">
                  <span className={o.chiuso ? "text-fumo/55" : "text-fumo"}>{o.giorno}</span>
                  <span className="voce-punti text-fumo/40" aria-hidden="true" />
                  <span className={o.chiuso ? "text-fumo/55" : "text-crema"}>{o.apertura}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* collegamenti */}
          <div>
            <h4 className="font-[family-name:var(--font-inciso)] text-[0.58rem] uppercase tracking-[0.28em] text-oro/85">
              Vai a
            </h4>
            <ul className="mt-5 space-y-2.5 text-[0.92rem]">
              {navigazione.map((v) => (
                <li key={v.href}>
                  <a href={v.href} className="text-fumo transition-colors duration-500 hover:text-oro">
                    {v.etichetta}
                  </a>
                </li>
              ))}
              <li>
                <a href="#home" className="text-fumo transition-colors duration-500 hover:text-oro">
                  Torna in cima
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <Ornamento />
        </div>

        <div className="flex flex-col items-center gap-3 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-[family-name:var(--font-inciso)] text-[0.55rem] uppercase tracking-[0.24em] text-fumo/60">
            © {anno} {site.nome} — {site.citta}
          </p>
          <p className="font-[family-name:var(--font-inciso)] text-[0.55rem] uppercase tracking-[0.24em] text-fumo/45">
            Bevi responsabilmente
          </p>
        </div>
      </div>
    </footer>
  );
}

function IconaInstagram() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
    </svg>
  );
}

function IconaFacebook() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07Z" />
    </svg>
  );
}
