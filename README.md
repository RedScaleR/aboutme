# ✦ About Me Card

A cute, customizable profile card for your Discord bio, in the style of straw.page. It's plain HTML, CSS and JS, with no build step.

## 🛠️ Make it yours
Open **`config.js`** and edit your name, username, pronouns, pfp and banner (gifs work), status dot, badges, bio, "right now" list, likes, link buttons, socials (a Discord button copies your username), an optional music player and an optional "click to enter" screen.

To change the look, open the page and click the **🎨** button. You can pick the accent color, dark or light mode, the background (aurora, stars, hearts, grid, plain, or your own image), the font (modern, cute, pixel, serif, mono), glass or solid card, roundness, sparkle cursor and animations. When you like it, hit **Copy config** and paste it over the `theme` block in `config.js`.

Put photos or songs next to `index.html` and point to them, e.g. `avatar: "pfp.gif"`.

The link-preview text and image live in the `<meta>` tags at the top of `index.html`, and `preview.png` is the preview image.

## 🚀 Put it online (free)
1. Upload these files to a GitHub repo.
2. Go to **Settings → Pages**, choose **Deploy from a branch**, pick your branch and `/ (root)`, and hit **Save**.
3. After about a minute it's live at `https://<your-username>.github.io/<repo-name>/`. Paste that link into your Discord **About Me** ♡

No GitHub? You can also drag the folder onto https://app.netlify.com/drop to get a link instantly.

## 👀 Preview locally
Double-click `index.html`, or run `python3 -m http.server 8000` and visit http://localhost:8000
