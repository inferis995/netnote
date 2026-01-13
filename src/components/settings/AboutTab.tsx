import { LogoImage } from "../LogoImage";
import { APP_VERSION } from "./constants";

export function AboutTab() {
  return (
    <div className="space-y-6">
      {/* Logo and App Name */}
      <div className="text-center">
        <div className="mb-4">
          <LogoImage className="w-32 h-auto mx-auto hover:scale-105 transition-transform duration-300" />
        </div>

        {/* Styled Wordmark */}
        <h1 className="text-2xl tracking-tight text-[var(--color-text)] flex items-center justify-center mb-1">
          <span className="font-light">Net</span><span className="font-bold">Note</span>
        </h1>

        <p
          className="text-sm mt-1"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Versione {APP_VERSION} (Gennaio 2026)
        </p>
      </div>

      {/* Description */}
      <div
        className="p-4 rounded-xl text-center"
        style={{ backgroundColor: "var(--color-bg-subtle)" }}
      >
        <p className="text-sm" style={{ color: "var(--color-text)" }}>
          Un'app per note focalizzata sulla privacy con trascrizione e riassunti IA locali.
        </p>
      </div>

      {/* Privacy Commitment */}
      <div
        className="p-4 rounded-xl"
        style={{ backgroundColor: "rgba(34, 197, 94, 0.06)" }}
      >
        <div className="flex gap-3">
          <svg
            className="w-5 h-5 shrink-0 mt-0.5"
            style={{ color: "#22c55e" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <div>
            <h4
              className="text-sm font-medium mb-1"
              style={{ color: "var(--color-text)" }}
            >
              Privacy Prima di Tutto
            </h4>
            <p
              className="text-xs"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Tutte le elaborazioni avvengono localmente sul tuo dispositivo. Le tue registrazioni,
              trascrizioni e note non lasciano mai il tuo computer. Niente cloud, niente
              tracciamento, niente compromessi.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2">
        <h4
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          Funzionalità
        </h4>
        <ul
          className="space-y-1.5 text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <li className="flex items-center gap-2">
            <span style={{ color: "var(--color-accent)" }}>•</span>
            Speech-to-text locale con Whisper
          </li>
          <li className="flex items-center gap-2">
            <span style={{ color: "var(--color-accent)" }}>•</span>
            Riassunti IA potenziati da Ollama
          </li>
          <li className="flex items-center gap-2">
            <span style={{ color: "var(--color-accent)" }}>•</span>
            Esportazione in Markdown
          </li>
          <li className="flex items-center gap-2">
            <span style={{ color: "var(--color-accent)" }}>•</span>
            100% funzionante offline
          </li>
        </ul>
      </div>

      {/* Credits */}
      <div className="space-y-3 text-center">
        <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
          Costruito con <span style={{ color: "#ef4444" }}>♥</span> usando tecnologie open source
        </p>
        <p className="text-sm mt-4 text-[var(--color-text-secondary)]">
          Creato da <span className="font-semibold text-[var(--color-text)]">Giovanni Addeo</span>
        </p>

        <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]">
          <p>
            Powered by Tauri, React, and Ollama.
          </p>
          <p className="mt-2">
            L'elaborazione IA locale mantiene i tuoi dati privati e sicuri.
          </p>
        </div>
      </div>
    </div>
  );
}
