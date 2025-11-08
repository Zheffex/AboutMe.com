# Letter For My Love

Static website ready for deployment on GitHub Pages.

## Quick Deploy (GitHub Pages)

This repo includes a GitHub Actions workflow that publishes the site on pushes to `main`.

### Steps

1. Push the repository to GitHub.
2. In your GitHub repo, go to `Settings` → `Pages`.
3. Under `Build and deployment`, set **Source** to `GitHub Actions`.
4. Push any change to `main` (or click `Run workflow` in `Actions`).
5. Your site will be available at `https://<your-username>.github.io/<repo-name>/`.

### Notes

- All assets use relative paths, so they work under a project site URL.
- `.nojekyll` is included to bypass Jekyll processing.
- Large images and audio files may impact load time. Consider optimizing media for faster delivery.

## Local Preview

You can preview locally with any static server:

```powershell
python -m http.server 8000
```

Open `http://localhost:8000/`.

## Structure

- `index.html` — main page
- `styles/main.css` — styles
- `scripts/main.js` — interactivity
- `assets/` — images and audio