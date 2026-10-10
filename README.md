# Tova Designs website

A simple, fast static website: plain HTML, CSS and a little JavaScript. No build step, no frameworks: upload the folder and it works.

```
tova-designs/
├── index.html          Home
├── about.html          About
├── case-studies.html   Case studies (with working filters)
├── contact.html        Contact (enquiry form + FAQs)
├── css/styles.css      All styling, colours and fonts
├── js/main.js          Mobile menu, scroll fades, filters, contact form
├── images/             Photos (currently stand-ins, see below)
├── fonts/              Put your Safira March font files here
└── favicon.svg         Browser tab icon
```

## Preview it on your computer

Double-click `index.html` to open it in your browser. Everything except the contact form sending works this way.

## Put it on GitHub

1. Create a new repository on github.com (for example `tova-designs`).
2. Click **Add file → Upload files**, drag in everything inside this folder (not the folder itself), and click **Commit changes**.

Or from a terminal:

```bash
cd tova-designs
git init
git add .
git commit -m "Tova Designs website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/tova-designs.git
git push -u origin main
```

## Host it

Any of these are free for a site like this:

- **Netlify** (recommended): netlify.com → Add new site → Import from GitHub → pick the repo → Deploy. No build settings needed. Every time you push to GitHub, the site updates.
- **Cloudflare Pages**: same idea; leave the build command empty and the output directory as `/`.
- **GitHub Pages**: in the repo, Settings → Pages → Deploy from branch → `main` / root.

Then connect your domain (e.g. `tovadesigns.co.nz`) in your host's domain settings.

## Make the contact form send emails

Static sites can't send email by themselves, so the form uses **Formspree** (free plan available):

1. Sign up at formspree.io and create a new form.
2. Copy its ID: the part after `/f/` in the endpoint, e.g. `xyzabcd`.
3. In `contact.html`, replace `YOUR_FORM_ID` in `action="https://formspree.io/f/YOUR_FORM_ID"`.

Until you do this, submitting shows the thank-you message but nothing is sent.

## Things to update before launch

Search the files for `[` and `yourdomain` to find every placeholder:

- `hello@yourdomain.co.nz` and the phone number (all pages)
- `[Founder name]`, bios and portrait placeholders (`index.html`, `about.html`)
- Your story paragraph (`about.html`)
- Prices and timeframes in the FAQs (`contact.html`)
- NZBN in the footer
- Social media links in the footer

## Fonts

- **Montserrat** loads from Google Fonts automatically.
- **Safira March** is a paid font. Buy a licence that covers web use, then put the files in `/fonts` named `SafiraMarch.woff2` (and optionally `SafiraMarch.woff`). They load automatically. Until then, the free font **Italiana** is used as a stand-in.
- Body text uses Montserrat Light (300) for easy reading. To use Thin everywhere, change `--body-weight: 300;` to `100` at the top of `css/styles.css`.

## Photos

The images in `/images` are stand-ins cropped from mood-board images. Replace them with your own photography (or properly licensed stock) **before going live**, keeping the same file names, or update the `src` paths in the HTML. Aim for JPGs around 1600–2000 px wide and under 300 KB each.

## Colours

All colours live at the top of `css/styles.css`:

| Name | HEX |
|---|---|
| Cream (background) | `#FBF8F2` |
| Vanilla | `#F6EEDF` |
| Sand | `#D9C6A5` |
| Bay Blue | `#DCE7EC` |
| Mist | `#E6E4DF` |
| Driftwood | `#7A6343` |
| Harbour Ink (text) | `#2F3A40` |
