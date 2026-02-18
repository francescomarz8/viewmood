# Dmood - Device Preview

A minimal tool to preview any website at different device sizes and share branded preview links with clients.

## Project Structure

```
device-preview/
├── index.html          ← Editor: configure URL, device, orientation
├── view.html           ← Shared viewer: minimal branded preview (recipients see this)
├── assets/
│   └── logo.svg        ← Replace with your logo.png (rectangular, ~200×48px)
└── README.md
```

## How It Works

### Two pages, one flow:

1. **`index.html`** (Editor) — You use this internally.
   - Paste a URL, pick a device size (or set custom dimensions)
   - See the live preview scaled to fit
   - Click **Share** → a link is copied to your clipboard

2. **`view.html`** (Viewer) — Your client sees this.
   - Minimal black background, your company logo, the embedded preview
   - `+` / `−` buttons to zoom in/out (maintains aspect ratio)
   - "Open in new tab" CTA button
   - No sidebar, no controls clutter — just the preview

---
