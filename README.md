# anthonyradke.com

My engineering portfolio: mechanical design, CAD and sheet metal work, with a write-up of my senior capstone
(a precision seed-dispensing machine for Rooted Robotics). Hosted on GitHub Pages at
[anthonyradke.com](https://anthonyradke.com).

Hand-written HTML, CSS and JavaScript, no framework or build step. The home page is one document with About,
Projects and Contact sections. `js/main.js` shows one at a time and keeps the URL hash in sync, so Back and
direct links work. Longer project write-ups get their own page under `projects/`.

## Layout

```
index.html          home page (About, Projects, Contact)
projects/<name>/    one page per project write-up
css/styles.css      all styles
js/main.js          section switching, mobile sidebar, copy-email button, certificate viewer
js/sidebar.js       <app-sidebar> custom element, shared by every page
fonts/              Inter, self-hosted
images/             project photos and renders (WebP)
files/              resume and certificate
```

## Running locally

```sh
python3 -m http.server
```

## Notes

- Images are WebP at about twice their largest display size:
  `magick in.png -resize '1920x1920>' -quality 90 -define webp:method=6 out.webp` (around 80 for photos).
  Anything below the fold gets `loading="lazy" decoding="async"`.
- GitHub Pages caches assets for 10 minutes, so CSS and JS are linked with a `?v=` query. Bump it in every HTML
  file after changing them.
- New pages go in `sitemap.xml`.
