/* ==========================================================================
   ✨ YOUR CARD CONFIG ✨
   Everything on the card comes from this file.
   Edit the text below, save, refresh the page, and you're done.
   (Tip: keep the quotes "" and commas , where they are!)
   ========================================================================== */

window.SITE_CONFIG = {

  /* ---------- You ---------- */
  name: "RedScaleR",
  username: "@redscaler",
  pronouns: "",              // e.g. "he/him", "she/her", "they/them". Leave "" to hide.
  avatar: "",                // link or file for your pfp (gifs work!). "" shows your initial.
  banner: "",                // link or file for the banner at the top. "" uses a gradient.
  status: "online",          // "online" | "idle" | "dnd" | "offline" | "" to hide the dot
  roles: ["developer ✦", "creator ♡", "always learning ☆"],   // typed out one by one

  bio: "hi! i build things on the internet and turn random ideas into stuff you can click on. probably gaming or coding rn :3",

  // little icons next to your pfp. Hover them to see the label.
  badges: [
    { emoji: "💻", label: "Developer" },
    { emoji: "🎮", label: "Gamer" },
    { emoji: "☕", label: "Runs on coffee" },
    { emoji: "✨", label: "Certified cool" },
  ],

  // "Right now" list. Remove the lines you don't want.
  currently: [
    { emoji: "🎧", label: "Listening to", value: "lo-fi beats" },
    { emoji: "🎮", label: "Playing",      value: "Minecraft" },
    { emoji: "🛠️", label: "Building",     value: "this card!" },
  ],

  likes: ["coding", "gaming", "music", "cats", "late nights", "pixel art"],

  // Big buttons. Add as many as you like. Leave url "" to hide one.
  links: [
    { emoji: "🛠️", title: "My projects", url: "https://github.com/RedScaleR?tab=repositories" },
    { emoji: "💌", title: "Source code of this card", url: "https://github.com/RedScaleR/aboutme" },
  ],

  // Icon buttons. Types: discord, github, x, twitter, instagram, youtube, tiktok, twitch,
  // spotify, steam, roblox, linkedin, email, website.
  // url: where it goes.  copy: text that gets copied when clicked (great for your Discord username!)
  // Leave both "" to hide one.
  socials: [
    { type: "discord",   copy: "" },
    { type: "github",    url: "https://github.com/RedScaleR" },
    { type: "youtube",   url: "" },
    { type: "tiktok",    url: "" },
    { type: "instagram", url: "" },
    { type: "spotify",   url: "" },
    { type: "steam",     url: "" },
  ],

  // Optional background song with a little player on the card.
  // url: a direct link to an .mp3 (or a file next to index.html, e.g. "song.mp3").
  music: { url: "", title: "", artist: "", volume: 0.4 },

  // "click to enter" screen before the card shows up. It also lets music start playing.
  enterScreen: false,
  enterText: "click to enter ✦",

  footer: "made with ♡",

  /* ---------- Look & feel ---------- */
  // Tip: open the page, click the 🎨 button, play around, then hit "Copy config"
  // and paste the result over this theme block.
  theme: {
    accent: "#ff3b5c",        // any hex color
    mode: "dark",             // "dark" | "light" | "auto" (follows the visitor's device)
    background: "aurora",     // "aurora" | "stars" | "hearts" | "grid" | "plain"
    backgroundImage: "",      // optional picture/gif link behind everything
    font: "modern",           // "modern" | "cute" | "pixel" | "serif" | "mono"
    card: "glass",            // "glass" (see-through) | "solid"
    radius: 22,               // corner roundness in px (0 – 32)
    motion: true,             // animations on/off
    sparkles: true,           // sparkle trail behind the mouse + bursts on click
  },

  // Show the 🎨 button so visitors can play with the look too.
  // Their changes only live in their own browser.
  showCustomizer: true,
};
