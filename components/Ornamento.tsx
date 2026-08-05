/**
 * Filetto ornamentale fra le sezioni: una spiga d'orzo stilizzata
 * fra due righe che sfumano. Serve a dare respiro, non a fare effetto.
 */
export default function Ornamento({ className = "" }: { className?: string }) {
  return (
    <div className={`filetto ${className}`} aria-hidden="true">
      <svg width="34" height="18" viewBox="0 0 34 18" fill="none">
        <path d="M17 1v16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path
          d="M17 5c-2.6 0-4.6-1.1-5.6-3 2.4-.5 4.5.4 5.6 3Zm0 0c2.6 0 4.6-1.1 5.6-3-2.4-.5-4.5.4-5.6 3Zm0 5c-2.6 0-4.6-1.1-5.6-3 2.4-.5 4.5.4 5.6 3Zm0 0c2.6 0 4.6-1.1 5.6-3-2.4-.5-4.5.4-5.6 3Zm0 5c-2.6 0-4.6-1.1-5.6-3 2.4-.5 4.5.4 5.6 3Zm0 0c2.6 0 4.6-1.1 5.6-3-2.4-.5-4.5.4-5.6 3Z"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
