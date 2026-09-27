/* ==========================================================================
   Renders config.js into the card and powers the 🎨 customizer.
   You shouldn't need to edit this file — change config.js instead.
   ========================================================================== */
(() => {
  "use strict";

  const C = window.SITE_CONFIG || {};
  const root = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const fine = matchMedia("(pointer: fine)");

  /* ---------- icons ---------- */
  const svg = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const ICONS = {
    discord: '<path d="M8.5 7.5c2.3-.7 4.7-.7 7 0M8.5 16.5c2.3.7 4.7.7 7 0M15.5 16.5l1 2.5c2-.6 3.8-1.6 5-3 0-4.5-1.2-8.3-3-11-1.4-.6-2.9-1-4.5-1.2l-.6 1.4M8.5 16.5l-1 2.5c-2-.6-3.8-1.6-5-3 0-4.5 1.2-8.3 3-11 1.4-.6 2.9-1 4.5-1.2l.6 1.4"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    x: '<path d="M4 4l11.7 16H20L8.3 4z"/><path d="M4 20l6.8-6.8M13.2 10.8 20 4"/>',
    twitter: '<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
    youtube: '<path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
    tiktok: '<path d="M16 3a5 5 0 0 0 5 5M16 3v12a5 5 0 1 1-5-5"/>',
    twitch: '<path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"/>',
    spotify: '<circle cx="12" cy="12" r="10"/><path d="M7.5 9c3.2-1 6.8-.7 9.5.9M8 12.4c2.6-.7 5.4-.4 7.6.8M8.6 15.6c2-.5 4-.3 5.6.6"/>',
    steam: '<circle cx="12" cy="12" r="10"/><circle cx="15.5" cy="9.5" r="2.5"/><circle cx="9" cy="15" r="2"/><path d="M3 13.5l4.4 1.6M10.6 13.8l3.2-2.6"/>',
    roblox: '<path d="M6.3 2 2 17.7 17.7 22 22 6.3z"/><path d="m10.2 9.2 4.6 1.2-1.2 4.6-4.6-1.2z"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    email: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    website: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
    arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
  };
  const icon = (name) => svg(ICONS[name] || ICONS.website);
  const LABELS = { x: "X", github: "GitHub", youtube: "YouTube", tiktok: "TikTok", linkedin: "LinkedIn" };

  /* ---------- theme state ---------- */
  const DEFAULT_THEME = {
    accent: "#ff3b5c", mode: "dark", background: "aurora", backgroundImage: "",
    font: "modern", card: "glass", radius: 22, motion: true, sparkles: true,
  };
  const OPTIONS = {
    mode: ["dark", "light", "auto"],
    background: ["aurora", "stars", "hearts", "grid", "plain"],
    font: ["modern", "cute", "pixel", "serif", "mono"],
    card: ["glass", "solid"],
  };
  const BASE = { ...DEFAULT_THEME, ...(C.theme || {}) };
  const KEY = "aboutme:theme";
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } },
    set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} },
    clear() { try { localStorage.removeItem(KEY); } catch {} },
  };
  const saved = store.get();
  // with the customizer hidden, visitors can't change anything, so ignore old picks
  let theme = { ...BASE, ...(C.showCustomizer === false ? {} : saved) };

  const darkMQ = matchMedia("(prefers-color-scheme: dark)");
  const reduceMQ = matchMedia("(prefers-reduced-motion: reduce)");
  const motionOn = () => !!theme.motion && !reduceMQ.matches;
  const isHex = (v) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(String(v));
  const fullHex = (h) => (h.length === 4 ? "#" + [...h.slice(1)].map((c) => c + c).join("") : h).toLowerCase();
  const option = (k) => (OPTIONS[k].includes(theme[k]) ? theme[k] : DEFAULT_THEME[k]);

  function hexToHsl(hex) {
    const n = parseInt(fullHex(hex).slice(1), 16);
    const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
    let h = 0, s = 0;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h *= 60;
    }
    return [h, s * 100, l * 100];
  }
  // the second gradient color is the accent nudged around the color wheel
  function companion(hex) {
    const [h, s, l] = hexToHsl(hex);
    return `hsl(${Math.round((h + 35) % 360)} ${Math.round(clamp(s + 5, 0, 100))}% ${Math.round(clamp(l + 4, 50, 72))}%)`;
  }

  function save() {
    const diff = {};
    for (const k of Object.keys(theme)) if (theme[k] !== BASE[k]) diff[k] = theme[k];
    Object.keys(diff).length ? store.set(diff) : store.clear();
  }

  function applyTheme() {
    const accent = isHex(theme.accent) ? fullHex(theme.accent) : DEFAULT_THEME.accent;
    const accent2 = companion(accent);
    const mode = option("mode");
    const dark = mode === "auto" ? darkMQ.matches : mode === "dark";
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--accent-2", accent2);
    root.style.setProperty("--radius", clamp(Number(theme.radius) || 0, 0, 32) + "px");
    root.dataset.theme = dark ? "dark" : "light";
    root.dataset.font = option("font");
    root.dataset.bg = option("background");
    root.dataset.card = option("card");
    root.dataset.motion = motionOn() ? "on" : "off";

    const img = String(theme.backgroundImage || "").trim();
    root.dataset.bgimg = img ? "on" : "off";
    if (img) root.style.setProperty("--bg-image", `url(${JSON.stringify(img)})`);

    // favicon = little gradient tile with your initial
    const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${accent}"/><stop offset="1" stop-color="${accent2}"/></linearGradient></defs><rect width="64" height="64" rx="18" fill="url(#g)"/><text x="32" y="44" font-family="Inter,Arial,sans-serif" font-size="34" font-weight="800" text-anchor="middle" fill="#fff">${esc(initials().slice(0, 1))}</text></svg>`;
    $("#favicon").href = "data:image/svg+xml," + encodeURIComponent(fav);

    syncPanel();
    fx.refresh();
    if (!motionOn()) $("#cardWrap").style.cssText = "";
  }

  function set(key, value) {
    theme[key] = value;
    save();
    applyTheme();
  }

  /* ---------- content ---------- */
  const name = C.name || "Your Name";
  function initials() {
    if (C.initials) return C.initials;
    const words = name.trim().split(/\s+/);
    return (words.length > 1 ? words[0][0] + words[words.length - 1][0] : words[0][0] || "?").toUpperCase();
  }

  const STATUS = {
    online: ["#23a55a", "Online"],
    idle: ["#f0b232", "Idle"],
    dnd: ["#f23f43", "Do not disturb"],
    offline: ["#80848e", "Offline"],
  };

  function render() {
    document.title = C.pageTitle || name;

    // banner + avatar
    if (C.banner) {
      const b = $("#banner");
      b.classList.add("has-img");
      b.style.backgroundImage = `url(${JSON.stringify(C.banner)})`;
    }
    $("#avatar").innerHTML = C.avatar
      ? `<img src="${esc(C.avatar)}" alt="${esc(name)}">`
      : `<span class="initials">${esc(initials())}</span>`;
    const st = STATUS[C.status];
    if (st) {
      const el = $("#status");
      el.style.setProperty("--status", st[0]);
      el.dataset.s = C.status;
      el.title = st[1];
      el.setAttribute("aria-label", st[1]);
    } else $("#status").remove();

    // badges
    const badges = C.badges || [];
    $("#badges").innerHTML = badges
      .map((b) => `<span class="badge" tabindex="0" data-tip="${esc(b.label)}" aria-label="${esc(b.label)}">${esc(b.emoji)}</span>`)
      .join("");
    if (!badges.length) $("#badges").remove();

    // name line
    $("#name").textContent = name;
    $("#username").textContent = C.username || "";
    $("#pronouns").textContent = C.pronouns || "";

    // about / now / likes
    const bio = Array.isArray(C.bio) ? C.bio.join("\n\n") : C.bio || "";
    const now = (C.currently || []).filter((n) => n.value);
    const likes = C.likes || [];
    if (bio) $("#bio").textContent = bio;
    else $("#aboutBlock").remove();
    $("#bio").style.whiteSpace = "pre-line";
    $("#now").innerHTML = now
      .map((n) => `<li><span class="ic">${esc(n.emoji || "✦")}</span><span class="txt"><span class="lbl">${esc(n.label)}</span><span class="val">${esc(n.value)}</span></span></li>`)
      .join("");
    if (!now.length) $("#nowBlock").remove();
    $("#likes").innerHTML = likes.map((l) => `<li>${esc(l)}</li>`).join("");
    if (!likes.length) $("#likesBlock").remove();
    if (!$("#inner .block")) $("#inner").remove();

    // links
    const links = (C.links || []).filter((l) => l.url);
    $("#links").innerHTML = links
      .map((l) => `<a class="link" href="${esc(l.url)}" target="_blank" rel="noopener"><span class="ic">${esc(l.emoji || "✦")}</span><span class="t">${esc(l.title || l.url)}</span>${icon("arrow")}</a>`)
      .join("");
    if (!links.length) $("#links").remove();

    // socials: url = open a link, copy = copy text (e.g. your Discord username)
    const socials = (C.socials || []).filter((s) => s.url || s.copy);
    $("#socials").innerHTML = socials
      .map((s, i) => {
        const pretty = LABELS[s.type] || (s.type ? s.type[0].toUpperCase() + s.type.slice(1) : "Link");
        const label = s.label || (s.copy && !s.url ? `${pretty}: ${s.copy}` : pretty);
        if (!s.url) return `<button class="icon-btn" data-copy="${i}" aria-label="Copy ${esc(label)}" title="${esc(label)} (click to copy)">${icon(s.type)}</button>`;
        const href = s.type === "email" && !/^mailto:/.test(s.url) ? "mailto:" + s.url : s.url;
        return `<a class="icon-btn" href="${esc(href)}" target="_blank" rel="noopener" aria-label="${esc(label)}" title="${esc(label)}">${icon(s.type)}</a>`;
      })
      .join("");
    $$("[data-copy]").forEach((b) =>
      b.addEventListener("click", () => {
        const s = socials[b.dataset.copy];
        copy(s.copy, `Copied ${s.copy} ✦`);
      })
    );
    if (!socials.length) $("#socials").remove();

    $("#footer").textContent = C.footer || "";
    if (!C.footer) $("#footer").remove();

    if (C.showCustomizer === false) {
      $("#fab").remove();
      $("#panel").remove();
    }
  }

  /* ---------- music ---------- */
  const music = (() => {
    const m = C.music || {};
    const player = $("#player");
    if (!m.url) { player.remove(); return { start() {} }; }
    const audio = new Audio(m.url);
    audio.loop = true;
    audio.preload = "metadata";
    audio.volume = clamp(Number(m.volume ?? 0.4), 0, 1);
    $("#trackTitle").textContent = m.title || "now playing";
    $("#trackArtist").textContent = m.artist || "";
    const btn = $("#playBtn");
    const sync = () => {
      player.classList.toggle("playing", !audio.paused);
      btn.setAttribute("aria-label", audio.paused ? "Play music" : "Pause music");
    };
    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);
    audio.addEventListener("timeupdate", () => {
      $("#barFill").style.width = audio.duration ? (audio.currentTime / audio.duration) * 100 + "%" : "0";
    });
    btn.addEventListener("click", () => (audio.paused ? audio.play().catch(() => toast("Couldn't play that song :(")) : audio.pause()));
    $("#bar").addEventListener("click", (e) => {
      if (!audio.duration) return;
      const r = e.currentTarget.getBoundingClientRect();
      audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
    });
    return { start: () => audio.play().catch(() => {}) };
  })();

  /* ---------- enter screen ---------- */
  function setupEnter() {
    if (!C.enterScreen) return;
    const el = $("#enter");
    $("#enterText").textContent = C.enterText || "click to enter ✦";
    el.hidden = false;
    const go = () => {
      el.classList.add("gone");
      music.start();
      setTimeout(() => el.remove(), 700);
    };
    el.addEventListener("click", go, { once: true });
    el.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && go());
    el.focus();
  }

  /* ---------- typewriter ---------- */
  function typewriter(el, words) {
    words = (words || []).filter(Boolean);
    if (!words.length) { $("#roleLine").remove(); return; }
    let w = 0, i = 0, deleting = false;
    const tick = () => {
      const word = words[w];
      if (words.length === 1) { el.textContent = word; return; }
      if (!motionOn()) {
        el.textContent = word;
        setTimeout(() => { w = (w + 1) % words.length; i = 0; deleting = false; tick(); }, 2400);
        return;
      }
      i += deleting ? -1 : 1;
      el.textContent = word.slice(0, i);
      let delay = deleting ? 38 : 80;
      if (!deleting && i >= word.length) { delay = 1800; deleting = true; }
      else if (deleting && i <= 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
      setTimeout(tick, delay);
    };
    tick();
  }

  /* ---------- background effects (stars / floating hearts) ---------- */
  const fx = (() => {
    const cv = $("#fx");
    const ctx = cv.getContext("2d");
    const GLYPHS = ["♡", "✦", "☆", "✧", "♥", "⋆"];
    let pts = [], raf = 0, w = 0, h = 0, mode = "", colors = [];
    function build() {
      if (mode === "stars") {
        pts = Array.from({ length: Math.round((w * h) / 4200) }, () => ({
          x: Math.random() * w, y: Math.random() * h,
          r: Math.random() * 1.2 + 0.25, p: Math.random() * 6.28,
          s: Math.random() * 1.5 + 0.4, c: Math.random() < 0.12 ? 1 : 0,
        }));
      } else if (mode === "hearts") {
        pts = Array.from({ length: Math.round((w * h) / 26000) + 10 }, () => ({
          x: Math.random() * w, y: Math.random() * h, g: pick(GLYPHS),
          size: 10 + Math.random() * 16, v: 0.15 + Math.random() * 0.45,
          p: Math.random() * 6.28, rot: Math.random() * 6.28, a: 0.15 + Math.random() * 0.45,
          c: Math.floor(Math.random() * 3),
        }));
      } else pts = [];
    }
    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      if (mode === "stars") {
        for (const s of pts) {
          ctx.globalAlpha = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(s.p + (t / 1000) * s.s));
          ctx.fillStyle = colors[s.c];
          ctx.beginPath();
          ctx.arc(s.x, (((s.y - t * 0.004 * s.r) % h) + h) % h, s.c ? s.r + 0.5 : s.r, 0, 6.28);
          ctx.fill();
        }
      } else if (mode === "hearts") {
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (const s of pts) {
          const y = ((((s.y - (t / 16) * s.v) % (h + 60)) + h + 60) % (h + 60)) - 30;
          const x = s.x + Math.sin(s.p + t / 1400) * 18;
          ctx.save();
          ctx.globalAlpha = s.a;
          ctx.fillStyle = colors[s.c];
          ctx.translate(x, y);
          ctx.rotate(Math.sin(s.rot + t / 2000) * 0.4);
          ctx.font = `${s.size}px system-ui, sans-serif`;
          ctx.fillText(s.g, 0, 0);
          ctx.restore();
        }
      }
    }
    const loop = (t) => { draw(t); raf = requestAnimationFrame(loop); };
    function refresh() {
      cancelAnimationFrame(raf);
      const next = root.dataset.bg;
      const changed = next !== mode;
      mode = next === "stars" || next === "hearts" ? next : "";
      if (changed) build();
      if (!mode) { ctx.clearRect(0, 0, w, h); return; }
      const cs = getComputedStyle(root);
      const accent = cs.getPropertyValue("--accent").trim();
      const accent2 = cs.getPropertyValue("--accent-2").trim();
      colors = mode === "stars" ? [cs.getPropertyValue("--star").trim() || "#fff", accent] : [accent, accent2, cs.getPropertyValue("--star").trim()];
      motionOn() ? (raf = requestAnimationFrame(loop)) : draw(0);
    }
    let rt;
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { size(); refresh(); }, 150); });
    size();
    return { refresh };
  })();

  /* ---------- pointer: glow, tilt, sparkles ---------- */
  function setupPointer() {
    const glow = $("#glow"), wrap = $("#cardWrap");
    const SPARKS = ["✦", "✧", "⋆", "♡", "✶"];
    let x = 0, y = 0, queued = false, lastSpark = 0;

    const spawn = (px, py, n, burst) => {
      for (let i = 0; i < n; i++) {
        const s = document.createElement("span");
        s.className = "spark";
        s.textContent = pick(SPARKS);
        const a = Math.random() * Math.PI * 2;
        const d = burst ? 40 + Math.random() * 60 : 8 + Math.random() * 18;
        s.style.cssText =
          `left:${px}px;top:${py}px;--dx:${(Math.cos(a) * d).toFixed(1)}px;--dy:${(Math.sin(a) * d + (burst ? 0 : 22)).toFixed(1)}px;` +
          `--s:${burst ? 12 + Math.random() * 12 : 8 + Math.random() * 8}px;--t:${burst ? 0.9 : 0.75}s;` +
          `color:${Math.random() < 0.5 ? "var(--accent)" : "var(--accent-2)"}`;
        s.addEventListener("animationend", () => s.remove());
        document.body.append(s);
      }
    };

    addEventListener("pointermove", (e) => {
      if (!motionOn() || !fine.matches) return;
      x = e.clientX; y = e.clientY;
      glow.classList.add("on");
      const now = performance.now();
      if (theme.sparkles && now - lastSpark > 40) { lastSpark = now; spawn(x, y, 1, false); }
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        glow.style.transform = `translate(${x}px, ${y}px)`;
        // gentle 3D tilt of the card toward the pointer
        const r = wrap.getBoundingClientRect();
        const dx = clamp((x - (r.left + r.width / 2)) / (innerWidth / 2), -1, 1);
        const dy = clamp((y - (r.top + r.height / 2)) / (innerHeight / 2), -1, 1);
        wrap.style.setProperty("--ry", (dx * 6).toFixed(2) + "deg");
        wrap.style.setProperty("--rx", (-dy * 6).toFixed(2) + "deg");
      });
    }, { passive: true });

    document.addEventListener("pointerleave", () => {
      glow.classList.remove("on");
      wrap.style.setProperty("--rx", "0deg");
      wrap.style.setProperty("--ry", "0deg");
    });

    addEventListener("pointerdown", (e) => {
      if (!theme.sparkles || !motionOn() || e.target.closest(".panel, .fab")) return;
      spawn(e.clientX, e.clientY, 10, true);
    });
  }

  /* ---------- helpers ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
  }
  async function copy(text, msg) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = Object.assign(document.createElement("textarea"), { value: text });
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.append(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      ta.remove();
    }
    toast(msg);
  }

  /* ---------- customizer panel ---------- */
  function syncPanel() {
    if (!$("#panel")) return;
    let matched = false;
    $$("[data-set]").forEach((b) => {
      const [k, v] = b.dataset.set.split(":");
      const on = k === "accent" ? isHex(theme.accent) && fullHex(theme.accent) === v : option(k) === v;
      if (on && k === "accent") matched = true;
      b.setAttribute("aria-pressed", String(on));
    });
    const custom = $("#customSwatch");
    custom.setAttribute("aria-pressed", String(!matched));
    custom.style.background = !matched && isHex(theme.accent) ? fullHex(theme.accent) : "";
    $("#customColor").value = isHex(theme.accent) ? fullHex(theme.accent) : DEFAULT_THEME.accent;
    const bgInput = $("#bgImage");
    if (document.activeElement !== bgInput) bgInput.value = theme.backgroundImage || "";
    $("#radius").value = theme.radius;
    $("#radiusVal").textContent = theme.radius + "px";
    $("#motion").checked = !!theme.motion;
    $("#sparkles").checked = !!theme.sparkles;
  }

  function setupPanel() {
    const panel = $("#panel"), fab = $("#fab");
    if (!panel) return;
    const open = (on) => {
      panel.classList.toggle("open", on);
      fab.setAttribute("aria-expanded", String(on));
    };
    fab.addEventListener("click", (e) => { e.stopPropagation(); open(!panel.classList.contains("open")); });
    $("#panelClose").addEventListener("click", () => open(false));
    document.addEventListener("click", (e) => { if (!panel.contains(e.target)) open(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") open(false); });

    $$("[data-set]", panel).forEach((b) =>
      b.addEventListener("click", () => {
        const [k, v] = b.dataset.set.split(":");
        set(k, v);
      })
    );
    $("#customColor").addEventListener("input", (e) => set("accent", e.target.value));
    $("#radius").addEventListener("input", (e) => set("radius", Number(e.target.value)));
    $("#motion").addEventListener("change", (e) => set("motion", e.target.checked));
    $("#sparkles").addEventListener("change", (e) => set("sparkles", e.target.checked));
    let bgt;
    $("#bgImage").addEventListener("input", (e) => {
      clearTimeout(bgt);
      bgt = setTimeout(() => set("backgroundImage", e.target.value.trim()), 400);
    });
    $("#resetTheme").addEventListener("click", () => {
      theme = { ...BASE };
      store.clear();
      applyTheme();
      toast("Back to the defaults :)");
    });
    $("#copyTheme").addEventListener("click", () => {
      const body = Object.entries(theme)
        .map(([k, v]) => `    ${k}: ${typeof v === "string" ? JSON.stringify(v) : v},`)
        .join("\n");
      copy(`  theme: {\n${body}\n  },`, "Copied! Paste it into config.js ✦");
    });
  }

  /* ---------- go! ---------- */
  render();
  applyTheme();
  typewriter($("#typed"), C.roles);
  setupPanel();
  setupPointer();
  setupEnter();

  darkMQ.addEventListener?.("change", () => theme.mode === "auto" && applyTheme());
  reduceMQ.addEventListener?.("change", applyTheme);
})();
