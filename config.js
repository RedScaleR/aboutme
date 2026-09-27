/* ==========================================================================
   ✨ YOUR SITE CONFIG ✨
   Everything on the page comes from this file.
   Edit the text below, save, refresh the page, and you're done.
   (Tip: keep the quotes "" and commas , where they are!)
   ========================================================================== */

window.SITE_CONFIG = {

  /* ---------- The basics ---------- */
  name: "RedScaleR",
  greeting: "Hey there, I'm",
  rolePrefix: "I'm ",
  roles: ["a developer.", "a creator.", "a problem solver.", "always learning."], // these get typed out one by one
  tagline: "I build things for the web and love turning ideas into something you can actually click on.",
  avatar: "",               // path or URL to a photo, e.g. "me.jpg". Leave "" to show your initial instead.
  initials: "",             // optional: letters shown when there's no avatar (defaults to your first initial)
  status: "Open to new projects",  // little green badge at the top. Set to "" to hide it.
  location: "📍 Planet Earth",     // floating chip next to your picture ("" to hide)
  chip: "Coffee-powered ☕",        // second floating chip ("" to hide)

  buttons: {
    primary: "See my work",
    secondary: "Say hello 👋",
  },

  /* ---------- About ---------- */
  about: [
    "Hey! 👋 I'm a curious human who loves building things on the internet. I get a kick out of taking a messy idea and turning it into something clean, fast and fun to use.",
    "When I'm not coding you'll probably find me gaming, sketching out new ideas, or deep down a rabbit hole learning something completely random. I think the best projects are made with a little bit of heart.",
  ],
  facts: [
    { emoji: "📍", label: "Based in",   value: "Planet Earth" },
    { emoji: "💻", label: "Currently",  value: "Building cool stuff" },
    { emoji: "🎧", label: "On repeat",  value: "Lo-fi beats" },
    { emoji: "🎮", label: "After hours", value: "Gaming & doodling" },
  ],

  /* ---------- Skills ---------- */
  skills: [
    { emoji: "⚡", group: "Languages",  items: ["JavaScript", "TypeScript", "Python", "HTML", "CSS"] },
    { emoji: "🛠️", group: "Tools",      items: ["Git", "VS Code", "Figma", "Node.js", "Linux"] },
    { emoji: "💫", group: "Also into",  items: ["UI Design", "Gaming", "Music", "Photography"] },
  ],

  /* ---------- Projects ---------- */
  // link: optional URL (makes the card clickable)   image: optional cover picture
  projects: [
    {
      emoji: "🌐",
      title: "About Me Site",
      description: "The page you're looking at! Fully customizable and built with plain HTML, CSS & JavaScript.",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://github.com/RedScaleR/aboutme",
    },
    {
      emoji: "🎮",
      title: "Tiny Browser Game",
      description: "A small game I made for fun. Simple rules, surprisingly addictive.",
      tags: ["Canvas", "Game Dev"],
    },
    {
      emoji: "🤖",
      title: "Helper Bot",
      description: "A little bot that automates the boring stuff so I don't have to.",
      tags: ["Python", "Automation"],
    },
    {
      emoji: "🎨",
      title: "Design Playground",
      description: "A collection of UI experiments, animations and color palettes I keep coming back to.",
      tags: ["CSS", "Animation", "Design"],
    },
  ],

  /* ---------- Contact ---------- */
  contactText: "Got an idea, a question, or just want to say hi? My inbox is always open. :)",
  email: "hello@example.com",   // "" to hide the email button
  // type can be: github, x, twitter, linkedin, instagram, youtube, twitch, tiktok, discord, email, website
  // leave url "" to hide one
  socials: [
    { type: "github",    url: "https://github.com/RedScaleR" },
    { type: "x",         url: "" },
    { type: "instagram", url: "" },
    { type: "youtube",   url: "" },
    { type: "discord",   url: "" },
    { type: "linkedin",  url: "" },
  ],
  footer: "Made with ♥ and way too much coffee",

  /* ---------- Sections ---------- */
  // show: false hides a section. Wrap words in *stars* to give them the gradient color.
  sections: {
    about:    { show: true, label: "About",    title: "A little *about me*" },
    skills:   { show: true, label: "Skills",   title: "Things I *love* working with" },
    projects: { show: true, label: "Projects", title: "Stuff I've *made*" },
    contact:  { show: true, label: "Contact",  title: "Let's make something *together*" },
  },

  /* ---------- Look & feel ---------- */
  // Tip: open the site, click the 🎨 button, play around, then hit "Copy config"
  // and paste the result over this theme block.
  theme: {
    accent: "#ff3b5c",      // any hex color
    mode: "dark",           // "dark" | "light" | "auto" (follows the visitor's device)
    background: "aurora",   // "aurora" | "stars" | "grid" | "plain"
    font: "modern",         // "modern" | "elegant" | "mono" | "rounded"
    radius: 18,             // corner roundness in px (0 – 28)
    motion: true,           // animations on/off
  },

  // Show the 🎨 button so visitors can play with the look too.
  // Their changes only live in their own browser.
  showCustomizer: true,
};
