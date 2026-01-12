# GitHub Actions Workflows

Questo progetto utilizza GitHub Actions per automatizzare la build e il rilascio delle applicazioni.

## Workflows Disponibili

### 1. `release.yml` - Build di Release
Questo workflow viene attivato quando viene creato un nuovo tag che inizia con `v` (es. `v1.0.3`).

**Cosa fa:**
- Crea una release su GitHub
- Builda l'applicazione per Windows, macOS (Universal Binary) e Linux
- Carica i binari sulla release
- Genera gli updater artifacts per l'auto-update integrato

**Come creare una release:**
```bash
git tag v1.0.3
git push origin v1.0.3
```

### 2. `test-build.yml` - Test Build
Questo workflow viene eseguito su ogni push al branch `main` e su ogni Pull Request.

**Cosa fa:**
- Verifica che il codice compili su tutte le piattaforme
- Esegue il linting del codice frontend
- NON pubblica release

## Secrets Necessari

Per firmare e pubblicare le release, è necessario configurare i seguenti secrets nel repository GitHub (Settings → Secrets and variables → Actions):

### Secrets Obbligatori

#### `TAURI_SIGNING_PRIVATE_KEY` e `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`
Chiavi per firmare gli updater artifacts di Tauri.

**Come generarle:**
```bash
npm install -g @tauri-apps/cli
tauri signer generate -- -w ~/.tauri/myapp.key
```

Questo comando genera:
- Una chiave privata (da salvare come secret `TAURI_SIGNING_PRIVATE_KEY`)
- Una password (da salvare come secret `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`)
- Una chiave pubblica (già presente in `tauri.conf.json`)

### Secrets per macOS Code Signing (Opzionali ma Raccomandati)

Per distribuire su macOS senza warning, è necessario firmare l'applicazione con un certificato Apple Developer:

- `APPLE_CERTIFICATE`: Il certificato in formato base64
- `APPLE_CERTIFICATE_PASSWORD`: Password del certificato
- `APPLE_SIGNING_IDENTITY`: L'ID del certificato (es. "Developer ID Application: Your Name (TEAM_ID)")
- `APPLE_ID`: Il tuo Apple ID
- `APPLE_PASSWORD`: Password specifica per l'app (generata su appleid.apple.com)
- `APPLE_TEAM_ID`: Il tuo Team ID Apple Developer

**Come ottenere il certificato in base64:**
```bash
base64 -i path/to/certificate.p12 | pbcopy
```

## Piattaforme Supportate

- **Windows**: `.exe` installer + `.msi` installer + updater
- **macOS**: Universal Binary `.app` + `.dmg` + updater (Intel + Apple Silicon)
- **Linux**: `.deb` + `.AppImage` + updater

## Requisiti di Sistema per la Build

### Windows
- Vulkan SDK 1.3.204.0 o superiore (installato automaticamente nel workflow)

### macOS
- Xcode Command Line Tools
- Per universal binary: supporto per `aarch64-apple-darwin` e `x86_64-apple-darwin`

### Linux (Ubuntu 22.04)
- libwebkit2gtk-4.1-dev
- libappindicator3-dev
- librsvg2-dev
- patchelf
- libasound2-dev

## Note

- Le release vengono create come **draft** e devono essere pubblicate manualmente dopo la verifica
- Il workflow `test-build.yml` NON crea release, serve solo per verificare che il codice compili
- Per testare una build locale senza pubblicare: `npm run tauri build`

## Troubleshooting

**Errore "Vulkan SDK not found" su Windows:**
Il workflow installa automaticamente il Vulkan SDK. Se l'errore persiste, verifica che la versione sia corretta.

**Errore "codesign failed" su macOS:**
Verifica che tutti i secrets per Apple siano configurati correttamente. La firma del codice è opzionale ma fortemente raccomandata.

**Build fallisce su Linux:**
Verifica che tutte le dipendenze di sistema siano installate. Il workflow installa automaticamente le dipendenze necessarie.
