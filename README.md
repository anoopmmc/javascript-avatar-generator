# JavaScript Avatar Generator

A simple client-side avatar generator built with vanilla JavaScript, HTML, and CSS.

## Live Demo

GitHub Pages: https://anoopmmc.github.io/javascript-avatar-generator/

If the link 404s right now, enable GitHub Pages as described below (one-time setup) and it will be live in a minute or two.

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

### Optional: Use a GitHub Actions workflow
If you later add a build step (e.g., bundling, TypeScript, asset optimization), switch to the "GitHub Actions" option in the Pages settings and add a workflow like:

```
name: Deploy Pages
on:
	push:
		branches: [ main ]

permissions:
	contents: read
	pages: write
	id-token: write

jobs:
	build:
		runs-on: ubuntu-latest
		steps:
			- uses: actions/checkout@v4
			# Add build steps here if needed (npm ci && npm run build)
			- name: Upload artifact
				uses: actions/upload-pages-artifact@v3
				with:
					path: .
	deploy:
		needs: build
		runs-on: ubuntu-latest
		environment:
			name: github-pages
			url: ${{ steps.deployment.outputs.page_url }}
		steps:
			- id: deployment
				uses: actions/deploy-pages@v4
```

Keep it simple for now—branch deployment is enough.

## Development Ideas
- Random avatar shapes / colors
- Save/export as PNG/SVG
- Seed-based deterministic avatar generation
- UI controls for shape, palette, symmetry

## License
MIT
