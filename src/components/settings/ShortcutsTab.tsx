export function ShortcutsTab() {
  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const modKey = isMac ? "⌘" : "Ctrl";

  const shortcuts = [
    { keys: [modKey, "N"], description: "Nuova nota" },
    { keys: [modKey, "R"], description: "Nuova nota e registra" },
    { keys: [modKey, "S"], description: "Ferma registrazione" },
    { keys: [modKey, "M"], description: "Cambia tema chiaro/scuro" },
    { keys: [modKey, ","], description: "Apri impostazioni" },
    { keys: ["Esc"], description: "Chiudi" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3
          className="text-sm font-semibold mb-3"
          style={{ color: "var(--color-text)" }}
        >
          Scorciatoie da Tastiera
        </h3>
        <p
          className="text-sm mb-4"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Usa queste scorciatoie per navigare e controllare NetNote.
        </p>
      </div>

      <div className="space-y-2">
        {shortcuts.map((shortcut, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-xl"
            style={{ backgroundColor: "var(--color-bg-subtle)" }}
          >
            <span
              className="text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {shortcut.description}
            </span>
            <div className="flex items-center gap-1">
              {shortcut.keys.map((key, keyIndex) => (
                <kbd
                  key={keyIndex}
                  className="px-2 py-1 text-xs font-medium rounded"
                  style={{
                    backgroundColor: "var(--color-bg-elevated)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                  }}
                >
                  {key}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
