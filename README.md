# ✨ About Me

A personal "about me" site built with plain HTML, CSS and JavaScript. It needs no build step and has no dependencies, and you can customize all of it.

- Hero section with a typewriter effect, an avatar with an animated ring and floating chips
- About, Skills (with a scrolling marquee), Projects and Contact sections
- Dark and light mode, plus 4 backgrounds (aurora, stars, grid, plain) and 4 font styles
- A **🎨 customizer panel** for changing the accent color, mode, background, font, roundness and animations live
- Fully responsive, and respects "reduce motion" settings

## 🛠️ Make it yours

**All the content lives in [`config.js`](config.js).** Open it and change:

| What | Where in `config.js` |
| --- | --- |
| Name, greeting, typed roles, tagline | `name`, `greeting`, `roles`, `tagline` |
| Profile picture | `avatar: "me.jpg"` (put the image next to `index.html`) |
| Bio and fun facts | `about`, `facts` |
| Skills | `skills` (groups of items) |
| Projects | `projects` (emoji, title, description, tags, optional `link` and `image`) |
| Email and socials | `email`, `socials` (github, x, instagram, youtube, discord, linkedin, twitch, tiktok, website…) |
| Section names and titles, or hiding a section | `sections` (wrap words in `*stars*` to make them gradient) |
| Default colors and look | `theme` |

### Designing the look visually
1. Open the site and click the **🎨** button (bottom right).
2. Play with colors, backgrounds and fonts until you love it.
3. Click **Copy config**, then paste the copied block over the `theme: { ... }` block in `config.js`.

Set `showCustomizer: false` if you'd rather visitors didn't see the 🎨 button.

## 👀 Preview locally
Open `index.html` in your browser. Or, for a local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🚀 Publish for free with GitHub Pages
1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**, then pick your branch and `/ (root)`.
4. Your site will be live at `https://<your-username>.github.io/aboutme/` within a minute or so 🎉

## 📁 Files
```
index.html   page structure
config.js    ← your content and theme (edit this!)
style.css    styles
script.js    renders the config and powers the customizer
```
