# Signing Keys

**Password:** `netnote123`

## Files
- `netnote-final.key` - Private key (DO NOT SHARE)
- `netnote-final.key.pub` - Public key (in tauri.conf.json)

## Usage for Future Releases

```powershell
$env:TAURI_SIGNING_PRIVATE_KEY = Get-Content ".keys\netnote-final.key" -Raw
$env:TAURI_SIGNING_PRIVATE_KEY_PASSWORD = "netnote123"
npm run tauri build
```

When prompted for password, enter: `netnote123`
