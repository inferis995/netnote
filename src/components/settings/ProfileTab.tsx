import { useState, useEffect } from "react";
import { useProfile } from "./useProfile";
import { AvatarIcons } from "./AvatarIcons";

export function ProfileTab() {
  const { profile, updateProfile } = useProfile();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setName(profile.name);
    setEmail(profile.email);
    setAvatar(profile.avatar);
  }, [profile]);

  const hasChanges =
    name !== profile.name ||
    email !== profile.email ||
    avatar !== profile.avatar;

  const handleSave = () => {
    updateProfile({ name, email, avatar });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Professional SVG avatars


  return (
    <div className="space-y-6">
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--color-text)" }}
        >
          Avatar
        </label>
        <div className="flex gap-2 flex-wrap">
          {AvatarIcons.map((Icon, index) => (
            <button
              key={`svg-${index}`}
              onClick={() => setAvatar(`svg-${index}`)}
              className="w-12 h-12 rounded-xl flex items-center justify-center transition-all"
              style={{
                backgroundColor:
                  avatar === `svg-${index}`
                    ? "var(--color-accent-light)"
                    : "var(--color-bg-subtle)",
                color:
                  avatar === `svg-${index}`
                    ? "var(--color-accent)"
                    : "var(--color-text-secondary)",
                border:
                  avatar === `svg-${index}`
                    ? "2px solid var(--color-accent)"
                    : "2px solid transparent",
              }}
            >
              <Icon className="w-6 h-6" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-text)" }}
        >
          Nome{" "}
          <span
            className="font-normal"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            (opzionale)
          </span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Il tuo nome"
          className="w-full px-3 py-2 rounded-lg text-sm"
          style={{
            backgroundColor: "var(--color-bg-subtle)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
          }}
        />
      </div>

      <div>
        <label
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-text)" }}
        >
          Email{" "}
          <span
            className="font-normal"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            (opzionale)
          </span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="latua@email.com"
          className="w-full px-3 py-2 rounded-lg text-sm"
          style={{
            backgroundColor: "var(--color-bg-subtle)",
            color: "var(--color-text)",
            border: "1px solid var(--color-border)",
          }}
        />
        <p
          className="mt-1.5 text-xs"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          Utilizzato per ricevere aggiornamenti su NetNote.
          Nessun obbligo di registrazione.
        </p>
      </div>

      <div className="flex items-center justify-between pt-2">
        <p className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
          Il tuo profilo è salvato localmente su questo dispositivo.
        </p>
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className="px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-40"
          style={{
            backgroundColor: saved ? "#22c55e" : "var(--color-accent)",
            color: "white",
          }}
        >
          {saved ? "Salvato!" : "Salva"}
        </button>
      </div>
    </div>
  );
}
