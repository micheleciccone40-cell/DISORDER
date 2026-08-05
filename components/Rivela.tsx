"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Fa affiorare il contenuto quando entra nel viewport.
 * Una sola volta, con un ritardo opzionale per creare la cascata.
 */
export default function Rivela({
  children,
  ritardo = 0,
  className = "",
  as: Tag = "div",
  soglia = 0.15,
}: {
  children: ReactNode;
  ritardo?: number;
  className?: string;
  as?: ElementType;
  soglia?: number;
}) {
  /* Attenzione: la soglia va rapportata all'altezza dell'elemento.
     Un blocco più alto del viewport non raggiunge mai una soglia in
     percentuale, quindi non si rivelerebbe mai. */
  const ref = useRef<HTMLElement>(null);
  const [visibile, setVisibile] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisibile(true);
      return;
    }
    const altezzaViewport = window.innerHeight || 1;
    const sogliaSicura = el.offsetHeight > altezzaViewport * 0.7 ? 0 : soglia;

    const io = new IntersectionObserver(
      ([voce]) => {
        if (voce.isIntersecting) {
          setVisibile(true);
          io.disconnect();
        }
      },
      { threshold: sogliaSicura, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [soglia]);

  return (
    <Tag
      ref={ref}
      className={`rivela ${visibile ? "visibile" : ""} ${className}`}
      style={{ "--ritardo": `${ritardo}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
