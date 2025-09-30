# JavaScript Avatar Generator

A simple client-side avatar generator built with vanilla JavaScript, HTML, and CSS.

## Live Demo

GitHub Pages: https://anoopmmc.github.io/javascript-avatar-generator/

The site is deployed via GitHub Pages (branch source). If you see a 404 briefly after a push, wait ~30–60 seconds for the cache to refresh.

## Files
- `index.html` – Main HTML structure
- `style.css` – Basic styling
- `app.js` – Avatar generation logic (placeholder / to be expanded)

## Getting Started
Open `index.html` directly in your browser or serve via a simple static server.

## Deploying to GitHub Pages

This project is pure static HTML/CSS/JS, so the simplest deployment is the built‑in GitHub Pages "Deploy from a branch" option:

1. Push your latest changes to the `main` branch (already done for initial scaffold).
2. In the GitHub repository UI go to: Settings → Pages.
3. Under "Build and deployment" choose:
	 - Source: Deploy from a branch
	 - Branch: `main` / (root)
4. Click Save. GitHub will provision the site (usually < 2 minutes).
5. The site will be available at: `https://anoopmmc.github.io/javascript-avatar-generator/` (also shown on the Pages settings page).

### Later: Adding a build step
If you introduce a build process (TypeScript, bundling, minification), you can re-add a GitHub Actions workflow and switch the Pages Source from "Deploy from a branch" to "GitHub Actions". Until then, this zero‑build setup is the most reliable.

## Development Ideas
- Random avatar shapes / colors
- Save/export as PNG/SVG
- Seed-based deterministic avatar generation
- UI controls for shape, palette, symmetry

## License
MIT
