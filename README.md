# anthonyradke.com

Source for [anthonyradke.com](https://anthonyradke.com), a mechanical engineering portfolio: mechanical design, CAD
and sheet metal work, plus a full write-up of a senior capstone project, a precision seed dispenser built for Rooted
Robotics.

Hand-written HTML, CSS and JavaScript with no framework or build step, hosted on GitHub Pages.

## How it works

The home page has three sections: About, Projects and Contact. Only one shows at a time. Clicking a link
switches sections and updates the URL, so the back button and shared links still work.

Bigger projects get their own page in the `projects/` folder. The sidebar is a small custom HTML element in
`js/sidebar.js`, so every page shares the same one.

## Files

```
index.html          home page
projects/<name>/    one folder per project page
css/styles.css      styles
js/main.js          section switching, mobile menu, copy email button, certificate viewer
js/sidebar.js       shared sidebar
fonts/              Inter font files
images/             photos and renders
files/              resume and certificate
```

## Running locally

```sh
python3 -m http.server
```

## Notes for editing

- Images are WebP. To convert one: `magick in.png -resize '1920x1920>' -quality 90 out.webp`
  (use about 80 for photos).
- Images further down the page use `loading="lazy"` so the top loads first.
- GitHub Pages caches files for 10 minutes. After changing CSS or JS, bump the `?v=` number where it's linked in
  each HTML file so browsers grab the new version.
- Add new pages to `sitemap.xml`.

## License

The code (HTML, CSS and JavaScript) is MIT licensed. Images, documents, project write-ups and other content are not; see [LICENSE](LICENSE).
