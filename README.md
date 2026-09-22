# anthonyradke.com

Source for my personal portfolio site — static HTML/CSS/JS, hosted on GitHub Pages at
[anthonyradke.com](https://anthonyradke.com).

## Structure

- `index.html` — homepage
- `projects/` — individual project pages
- `css/`, `js/`, `images/` — site assets
- `files/` — resume and other downloadable files

## Running locally

No build step — just serve the directory root, e.g.:

```bash
python3 -m http.server
```

## Images & caching

- Images are WebP, sized to roughly 2× their largest display size. Convert new ones with ImageMagick, e.g.
  `magick in.png -resize '1920x1920>' -quality 90 -define webp:method=6 out.webp` (use ~80 for photos).
- Give below-the-fold `<img>`s `loading="lazy" decoding="async"`.
- GitHub Pages caches assets for 10 minutes; bump the `?v=` query on `styles.css` / `main.js` / `sidebar.js`
  in every HTML file after editing them.
- Add new pages to `sitemap.xml`.
