# Device Preview — dMood Labs

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

### Share link format:

```
https://yourdomain.com/view.html?url=https://greenback-app.dmoodlabs.com/&w=390&h=844&device=iPhone%2014
```

Parameters are encoded automatically when you click **Share**.

---

## Setup & Deployment

### Option A: Static hosting (simplest)

This is a **zero-build, zero-dependency** project. Just HTML + CSS + JS. No npm, no bundler, no framework.

1. **Replace the logo:**
   - Drop your `logo.png` (or `logo.svg`) into `assets/`
   - Update the `<img src="assets/logo.svg">` tags in both `index.html` and `view.html`
   - Recommended size: rectangular, ~200×48px, transparent background, light-colored content (it sits on a dark bg)

2. **Deploy to any static host:**

   **Vercel (recommended):**
   ```bash
   npm i -g vercel
   cd device-preview
   vercel
   ```

   **Netlify:**
   ```bash
   # Drag & drop the folder at netlify.com/drop
   # Or use CLI:
   npm i -g netlify-cli
   cd device-preview
   netlify deploy --prod --dir=.
   ```

   **Cloudflare Pages:**
   ```bash
   # Connect your GitHub repo at dash.cloudflare.com
   # Build command: (none)
   # Output directory: /
   ```

   **GitHub Pages:**
   ```bash
   # Push to a repo, enable Pages in Settings → Pages → Source: main branch
   ```

   **Any web server (Nginx, Apache, S3, etc.):**
   Just serve the folder as static files. No build step needed.

3. **Set up a custom domain (optional):**
   - Example: `preview.dmoodlabs.com`
   - Point your DNS to the hosting provider
   - Both pages will be at:
     - `preview.dmoodlabs.com/` → Editor
     - `preview.dmoodlabs.com/view.html?url=...` → Shared viewer

---

## Customization

### Branding

Both pages reference the logo in one place each. Search for `logo.svg` and update:

```html
<!-- index.html -->
<img class="logo-img" src="assets/logo.png" alt="dMood Labs">

<!-- view.html -->
<img src="assets/logo.png" alt="Logo">
```

### Colors

All colors are CSS variables at the top of each file. The key ones:

```css
:root {
  --bg: #050505;          /* Page background */
  --accent: #4ade80;      /* Green accent (buttons, indicators) */
  --accent-bg: #0d1f0d;   /* Accent background tint */
}
```

### Adding/removing devices

Edit the `DEVICES` array in `index.html`:

```js
const DEVICES = [
  { name:'iPhone 14', w:390, h:844, icon:'📱', cat:'phone' },
  // Add your own:
  { name:'My Custom Device', w:500, h:900, icon:'📱', cat:'phone' },
];
```

### Footer text

In `view.html`, update the footer:

```html
<div class="footer">
  <span class="footer-text">Powered by <a href="/">Your Company</a></span>
</div>
```

---

## Important Notes

- **iframe embedding**: The site you're previewing must allow iframe embedding. Your own sites (like `greenback-app.dmoodlabs.com`) will work fine. Third-party sites (Google, Twitter, etc.) typically block this via `X-Frame-Options` headers.

- **HTTPS**: Both the preview tool and the target site should use HTTPS. Mixed content (HTTPS tool loading HTTP site) will be blocked by browsers.

- **No server needed**: Everything runs client-side. The share link encodes all parameters in the URL — no database, no backend.
