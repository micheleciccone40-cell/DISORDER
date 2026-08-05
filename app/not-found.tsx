import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center gap-7 overflow-hidden px-6 text-center">
      <div className="absolute inset-0 bg-black" />

      <div className="relative flex flex-col items-center gap-6">
        <Image
          src="/brand/disorder-logo.webp"
          alt={site.nome}
          width={385}
          height={655}
          className="h-40 w-auto"
        />
        <span className="inciso text-oro/90">Pagina non trovata</span>
        <h1 className="max-w-[18ch] text-[clamp(2rem,5vw,3.2rem)]">
          Qui non c&apos;è <em className="corsivo">niente da bere</em>
        </h1>
        <p className="max-w-[46ch] text-fumo">
          La pagina che cercavi non esiste. Il bancone però è sempre al suo posto.
        </p>
        <Link href="/" className="btn mt-2">
          Torna al pub
        </Link>
      </div>
    </main>
  );
}
