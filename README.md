# ROSH4N — Personal Developer Portfolio

A clean, responsive, and developer-focused personal portfolio website built with semantic **HTML5**, modern **CSS3**, and **Vanilla JavaScript**. Created for the **Hack Club Stardance Personal Website** mission.

---

## 📁 File Structure

```text
evilhere7/
├── index.html            # Main markup (semantic HTML5, SEO metadata, accessible layout)
├── style.css             # Stylesheet (dark charcoal theme, green accent, responsive rules)
├── script.js             # Vanilla JavaScript (mobile menu, scrollspy, form validation)
├── README.md             # Project documentation & deployment guide
└── assets/               # Visual assets
    ├── profile.jpg       # Profile picture (Minecraft-style avatar)
    ├── godam360.svg      # Project banner for Godam360
    ├── grammate.svg      # Project banner for GramMate
    └── minecraft.svg     # Project banner for Minecraft / BedWars experiments
```

---

## 🚀 How to Run Locally

No installations or build tools required.

### Method 1: Direct File Open (Easiest)
1. Double-click `index.html` in your file explorer.
2. It will open and run in your web browser immediately.

### Method 2: Python Local Server
Run this command in the terminal inside this folder:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## 🛠️ Where to Change Personal Information

All personal details are organized and commented inside `index.html`:

1. **Name & Titles**: Look inside the `<header>` and `<section id="home">`.
2. **About Me**: Edit the paragraphs under `<section id="about">`.
3. **NOW Section**: Update your current focus items under `<aside class="now-section">`.
4. **Skills**: Modify or add tech tags in `<section id="skills">`.
5. **Projects**: Edit descriptions and replace `href="#"` with your actual live project URLs in `<section id="projects">`.
6. **Social & GitHub Links**: Search for `https://github.com/evilhere7` and replace with your profile links.
7. **Contact Email**: Search for `roshan.contact@example.com` under `<section id="contact">`.

---

## 🖼️ Where to Replace the Profile Image

Your main profile image is linked in `index.html`:
- Primary URL: `https://i.ibb.co/xqDNPPd6/channels4-profile.jpg`
- Local fallback: `assets/profile.jpg`

To replace it with a local photo:
1. Save your image as `profile.jpg` inside the `assets/` folder.
2. In `index.html`, change `src="https://i.ibb.co/xqDNPPd6/channels4-profile.jpg"` to `src="assets/profile.jpg"`.

---

## 🌐 How to Deploy to GitHub Pages

1. Commit and push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Build personal website for Stardance mission"
   git push origin main
   ```
2. Go to your repository on [GitHub](https://github.com/evilhere7).
3. Click **Settings** ➔ **Pages** (in the left sidebar).
4. Under **Source / Branch**, select `main` (or `master`) and folder `/(root)`.
5. Click **Save**. Your site will be live at `https://evilhere7.github.io/evilhere7/` (or your GitHub Pages URL).

---

## 📜 License

Created with ❤️ by **ROSH4N (Roshan Rimal)** for the **Hack Club Stardance Mission**.  
Open-source under the [MIT License](https://opensource.org/licenses/MIT).
