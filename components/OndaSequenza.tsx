"use client";

import { useEffect, useRef, useState } from "react";

/**
 * L'onda di Unknown Pleasures che si disegna mentre scorri.
 *
 * Non è un video in loop: è una sequenza di 166 fotogrammi su canvas, e
 * l'indice del fotogramma è funzione della posizione di scroll dell'intera
 * pagina. Fermi lo scroll, si ferma. Torni su, torna indietro.
 * Stessa tecnica delle pagine prodotto Apple.
 *
 * Frame 1 in cima al sito, frame 166 in fondo.
 */

const N_FRAME = 166;
/** Sotto questa larghezza uso la serie leggera (720px invece di 1280px) */
const SOGLIA_MOBILE = 820;

const percorso = (serie: "d" | "m", n: number) =>
  `/onda/${serie}/f${String(n).padStart(3, "0")}.webp`;

export default function OndaSequenza() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [acceso, setAcceso] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const ridotto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const serie: "d" | "m" = window.innerWidth < SOGLIA_MOBILE ? "m" : "d";
    /* i fotogrammi sono 16:9 e il disegno arriva fino ai bordi: su telefono
       allargo appena, tanto ai lati c'è solo la coda piatta delle onde */
    const overscan = serie === "m" ? 1.12 : 1;

    const immagini: (HTMLImageElement | undefined)[] = new Array(N_FRAME);
    const pronte = new Array<boolean>(N_FRAME).fill(false);

    let indiceVoluto = 0;
    let indiceDisegnato = -1;
    let raf = 0;
    let vivo = true;

    const piuVicinoPronto = (i: number) => {
      if (pronte[i]) return i;
      for (let d = 1; d < N_FRAME; d++) {
        if (i - d >= 0 && pronte[i - d]) return i - d;
        if (i + d < N_FRAME && pronte[i + d]) return i + d;
      }
      return -1;
    };

    const disegna = (i: number, forza = false) => {
      const j = piuVicinoPronto(i);
      if (j < 0) return;
      if (j === indiceDisegnato && !forza) return;
      const img = immagini[j];
      if (!img) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, vw, vh);

      const s = Math.min(vw / img.naturalWidth, vh / img.naturalHeight) * overscan;
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      ctx.drawImage(img, (vw - w) / 2, (vh - h) / 2, w, h);
      indiceDisegnato = j;
    };

    const dimensiona = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      disegna(indiceVoluto, true);
    };

    const aggiorna = () => {
      raf = 0;
      const scorribile = document.documentElement.scrollHeight - window.innerHeight;
      const p = scorribile > 0 ? Math.min(1, Math.max(0, window.scrollY / scorribile)) : 0;
      indiceVoluto = Math.round(p * (N_FRAME - 1));
      disegna(indiceVoluto);
    };

    const alloScroll = () => {
      if (!raf) raf = requestAnimationFrame(aggiorna);
    };

    const carica = (i: number) =>
      new Promise<void>((risolvi) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          pronte[i] = true;
          if (indiceDisegnato < 0 || i === indiceVoluto) disegna(indiceVoluto);
          risolvi();
        };
        img.onerror = () => risolvi();
        img.src = percorso(serie, i + 1);
        immagini[i] = img;
      });

    (async () => {
      if (ridotto) {
        /* chi ha chiesto meno movimento vede solo l'onda completa, ferma */
        await carica(N_FRAME - 1);
        indiceVoluto = N_FRAME - 1;
        dimensiona();
        window.addEventListener("resize", dimensiona);
        setAcceso(true);
        return;
      }

      await carica(0);
      if (!vivo) return;
      dimensiona();
      setAcceso(true);

      window.addEventListener("scroll", alloScroll, { passive: true });
      window.addEventListener("resize", dimensiona);
      aggiorna();

      /* il resto in ordine, a sei alla volta: lo scrubbing intanto usa
         il fotogramma pronto più vicino, quindi non si vede mai un buco */
      let prossimo = 1;
      const operaio = async () => {
        while (vivo && prossimo < N_FRAME) await carica(prossimo++);
      };
      await Promise.all(Array.from({ length: 6 }, operaio));
    })();

    return () => {
      vivo = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", alloScroll);
      window.removeEventListener("resize", dimensiona);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-black" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ opacity: acceso ? 1 : 0, transition: "opacity 1.2s var(--ease-lento)" }}
      />
      {/* appena una velatura in basso, perché i testi non poggino sul nulla */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </div>
  );
}
