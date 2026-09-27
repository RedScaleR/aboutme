/* ==========================================================================
   Renders config.js into the page and powers the 🎨 customizer.
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

  // "Stuff I've *made*" -> gradient on "made". No stars? The last word gets it.
  const fancy = (s) => {
    const t = esc(s);
    return /\*(.+?)\*/.test(t) ? t.replace(/\*(.+?)\*/g, "<em>$1</em>") : t.replace(/(\S+)\s*$/, "<em>$1</em>");
  };

  /* ---------- icons ---------- */
  const svg = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const ICONS = {
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    x: '<path d="M4 4l11.7 16H20L8.3 4z"/><path d="M4 20l6.8-6.8M13.2 10.8 20 4"/>',
    twitter: '<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
    youtube: '<path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
    twitch: '<path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"/>',
    tiktok: '<path d="M16 3a5 5 0 0 0 5 5M16 3v12a5 5 0 1 1-5-5"/>',
    discord: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
    email: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    website: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
    arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
  };
  const icon = (name) => svg(ICONS[name] || ICONS.website);

  /* ---------- theme state ---------- */
  const DEFAULT_THEME = { accent: "#ff3b5c", mode: "dark", background: "aurora", font: "modern", radius: 18, motion: true };
  const BASE = { ...DEFAULT_THEME, ...(C.theme || {}) };
  const KEY = "aboutme:theme";
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } },
    set(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} },
    clear() { try { localStorage.removeItem(KEY); } catch {} },
  };
  const saved = store.get();
  // with the customizer hidden, visitors can still flip light/dark from the nav
  let theme = { ...BASE, ...(C.showCustomizer === false ? (saved.mode ? { mode: saved.mode } : {}) : saved) };

  const darkMQ = matchMedia("(prefers-color-scheme: dark)");
  const reduceMQ = matchMedia("(prefers-reduced-motion: reduce)");
  const motionOn = () => !!theme.motion && !reduceMQ.matches;
  const isHex = (v) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(String(v));
  const fullHex = (h) => (h.length === 4 ? "#" + [...h.slice(1)].map((c) => c + c).join("") : h).toLowerCase();

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
    const dark = theme.mode === "auto" ? darkMQ.matches : theme.mode !== "light";
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--accent-2", accent2);
    root.style.setProperty("--radius", clamp(Number(theme.radius) || 0, 0, 28) + "px");
    root.dataset.theme = dark ? "dark" : "light";
    root.dataset.font = theme.font;
    root.dataset.bg = theme.background;
    root.dataset.motion = motionOn() ? "on" : "off";
    $('meta[name="theme-color"]')?.setAttribute("content", dark ? "#0b0a10" : "#fbf7f5");

    // favicon = little gradient tile with your initial
    const fav = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${accent}"/><stop offset="1" stop-color="${accent2}"/></linearGradient></defs><rect width="64" height="64" rx="18" fill="url(#g)"/><text x="32" y="44" font-family="Inter,Arial,sans-serif" font-size="34" font-weight="800" text-anchor="middle" fill="#fff">${esc(initials().slice(0, 1))}</text></svg>`;
    $("#favicon").href = "data:image/svg+xml," + encodeURIComponent(fav);

    syncPanel();
    stars.refresh();
    glow.refresh();
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

  const SECTION_DEFAULTS = {
    about: { label: "About", title: "A little *about me*" },
    skills: { label: "Skills", title: "Things I *love* working with" },
    projects: { label: "Projects", title: "Stuff I've *made*" },
    contact: { label: "Contact", title: "Let's make something *together*" },
  };

  function render() {
    document.title = C.pageTitle || `${name} — About me`;
    $("#logo").innerHTML = `${esc(C.logo || name)}<span>.</span>`;

    // hero
    const status = $("#status");
    if (C.status) status.lastElementChild.textContent = C.status;
    else status.remove();
    $("#greeting").textContent = C.greeting ?? "Hi, I'm";
    $("#name").textContent = name;
    $("#rolePrefix").textContent = C.rolePrefix ?? "I'm ";
    $("#tagline").textContent = C.tagline || "";
    $("#btnPrimary span").textContent = C.buttons?.primary || "See my work";
    $("#btnSecondary").textContent = C.buttons?.secondary || "Say hello 👋";
    $("#avatar").innerHTML = C.avatar
      ? `<img src="${esc(C.avatar)}" alt="${esc(name)}">`
      : `<span class="initials">${esc(initials())}</span>`;
    C.location ? ($("#chipA").textContent = C.location) : $("#chipA").remove();
    C.chip ? ($("#chipB").textContent = C.chip) : $("#chipB").remove();

    // about
    const about = C.about || [];
    const facts = C.facts || [];
    $("#aboutText").innerHTML = about.map((p) => `<p>${esc(p)}</p>`).join("");
    $("#facts").innerHTML = facts
      .map((f, i) => `<div class="fact card reveal" style="--d:${i * 0.08}s"><span class="emoji">${esc(f.emoji)}</span><span class="label">${esc(f.label)}</span><span class="value">${esc(f.value)}</span></div>`)
      .join("");
    if (!facts.length || !about.length) $(".about-grid").classList.add("solo");

    // skills
    const groups = C.skills || [];
    const all = groups.flatMap((g) => g.items || []);
    if (all.length) {
      let seq = all;
      while (seq.length < 14) seq = seq.concat(all);
      const items = seq.map((s, i) => `<span class="${i % 3 === 1 ? "solid" : ""}">${esc(s)}</span><i>✦</i>`).join("");
      $("#marquee").innerHTML = `<div class="mq-set">${items}</div><div class="mq-set">${items}</div>`;
    } else $(".marquee").remove();
    $("#skillGroups").innerHTML = groups
      .map((g, i) => `
        <div class="skill-group card reveal" style="--d:${i * 0.08}s">
          <h3>${g.emoji ? `<span class="emoji">${esc(g.emoji)}</span>` : ""}${esc(g.group)}</h3>
          <ul class="chips">${(g.items || []).map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        </div>`)
      .join("");

    // projects
    $("#projectGrid").innerHTML = (C.projects || [])
      .map((p, i) => {
        const tag = p.link ? "a" : "article";
        const attrs = p.link ? ` href="${esc(p.link)}" target="_blank" rel="noopener"` : "";
        return `
        <${tag} class="project card reveal" style="--d:${(i % 3) * 0.08}s"${attrs}>
          ${p.image ? `<div class="p-cover"><img src="${esc(p.image)}" alt="" loading="lazy"></div>` : ""}
          <div class="p-top">
            <span class="p-icon">${esc(p.emoji || "✦")}</span>
            ${p.link ? `<span class="p-arrow">${icon("arrow")}</span>` : ""}
          </div>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.description)}</p>
          ${p.tags?.length ? `<ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
        </${tag}>`;
      })
      .join("");

    const count = (C.projects || []).length;
    if (count % 2 === 0 && count % 3 !== 0) $("#projectGrid").classList.add("two");

    // contact
    $("#contactText").textContent = C.contactText || "";
    if (C.email) {
      $("#emailBtn").href = "mailto:" + C.email;
      $("#emailLabel").textContent = C.email;
      $("#copyEmail").addEventListener("click", () => copy(C.email, "Email copied ✨"));
    } else $("#emailRow").remove();
    const socials = (C.socials || []).filter((s) => s.url);
    $("#socials").innerHTML = socials
      .map((s) => {
        const label = s.label || (s.type ? s.type[0].toUpperCase() + s.type.slice(1) : "Link");
        const href = s.type === "email" && !/^mailto:/.test(s.url) ? "mailto:" + s.url : s.url;
        return `<a class="icon-btn" href="${esc(href)}" target="_blank" rel="noopener" aria-label="${esc(label)}" title="${esc(label)}">${icon(s.type)}</a>`;
      })
      .join("");
    if (!socials.length) $("#socials").remove();

    // footer
    $("#footerText").textContent = `© ${new Date().getFullYear()} ${name}${C.footer ? " · " + C.footer : ""}`;

    // sections: hide, number & title them
    const has = {
      about: about.length || facts.length,
      skills: groups.length,
      projects: (C.projects || []).length,
      contact: C.email || socials.length || C.contactText,
    };
    let n = 0;
    for (const id of Object.keys(SECTION_DEFAULTS)) {
      const cfg = { ...SECTION_DEFAULTS[id], ...(C.sections?.[id] || {}) };
      const link = $(`[data-section="${id}"]`);
      if (cfg.show === false || !has[id]) {
        $("#" + id).remove();
        link.parentElement.remove();
        continue;
      }
      n++;
      const sec = $("#" + id);
      $(".eyebrow", sec).textContent = `${String(n).padStart(2, "0")} — ${cfg.label}`;
      $("h2", sec).innerHTML = fancy(cfg.title);
      link.textContent = cfg.label;
    }
    // hero buttons point somewhere that exists
    if (!$("#projects")) $("#btnPrimary").href = $("main section:nth-of-type(2)") ? "#" + $("main section:nth-of-type(2)").id : "#home";
    if (!$("#contact")) $("#btnSecondary").remove();
    if (!$("main section:nth-of-type(2)")) $(".scroll-hint").remove();

    if (C.showCustomizer === false) {
      $("#fab").remove();
      $("#panel").remove();
    }
  }

  /* ---------- typewriter ---------- */
  function typewriter(el, words) {
    words = (words || []).filter(Boolean);
    if (!words.length) { el.parentElement.remove(); return; }
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
      let delay = deleting ? 40 : 85;
      if (!deleting && i >= word.length) { delay = 1700; deleting = true; }
      else if (deleting && i <= 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
      setTimeout(tick, delay);
    };
    tick();
  }

  /* ---------- starfield ---------- */
  const stars = (() => {
    const cv = $("#stars");
    const ctx = cv.getContext("2d");
    let pts = [], raf = 0, w = 0, h = 0, color = "#fff", accent = "#f00";
    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = Array.from({ length: Math.round((w * h) / 4200) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.2 + 0.25, p: Math.random() * 6.28,
        s: Math.random() * 1.5 + 0.4, a: Math.random() < 0.12,
      }));
    }
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      for (const s of pts) {
        ctx.globalAlpha = 0.2 + 0.8 * (0.5 + 0.5 * Math.sin(s.p + (t / 1000) * s.s));
        ctx.fillStyle = s.a ? accent : color;
        ctx.beginPath();
        ctx.arc(s.x, (s.y - t * 0.004 * s.r + h) % h, s.a ? s.r + 0.5 : s.r, 0, 6.28);
        ctx.fill();
      }
    }
    const loop = (t) => { draw(t); raf = requestAnimationFrame(loop); };
    function refresh() {
      cancelAnimationFrame(raf);
      if (root.dataset.bg !== "stars") { ctx.clearRect(0, 0, w, h); return; }
      const cs = getComputedStyle(root);
      color = cs.getPropertyValue("--star").trim() || "#fff";
      accent = cs.getPropertyValue("--accent").trim() || "#f00";
      motionOn() ? (raf = requestAnimationFrame(loop)) : draw(0);
    }
    let rt;
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { size(); refresh(); }, 150); });
    size();
    return { refresh };
  })();

  /* ---------- cursor glow ---------- */
  const glow = (() => {
    const el = $("#glow");
    const fine = matchMedia("(pointer: fine)");
    let x = 0, y = 0, queued = false;
    addEventListener("pointermove", (e) => {
      if (!fine.matches || !motionOn()) return;
      x = e.clientX; y = e.clientY;
      el.classList.add("on");
      if (!queued) {
        queued = true;
        requestAnimationFrame(() => { el.style.transform = `translate(${x}px, ${y}px)`; queued = false; });
      }
    }, { passive: true });
    document.addEventListener("pointerleave", () => el.classList.remove("on"));
    return { refresh() { if (!motionOn()) el.classList.remove("on"); } };
  })();

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
      const on = k === "accent" ? isHex(theme.accent) && fullHex(theme.accent) === v : String(theme[k]) === v;
      if (on && k === "accent") matched = true;
      b.setAttribute("aria-pressed", String(on));
    });
    $("#customSwatch").setAttribute("aria-pressed", String(!matched));
    if (!matched && isHex(theme.accent)) $("#customSwatch").style.background = fullHex(theme.accent);
    else $("#customSwatch").style.background = "";
    $("#customColor").value = isHex(theme.accent) ? fullHex(theme.accent) : DEFAULT_THEME.accent;
    $("#radius").value = theme.radius;
    $("#radiusVal").textContent = theme.radius + "px";
    $("#motion").checked = !!theme.motion;
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
      copy(`  theme: {\n${body}\n  },`, "Copied! Paste it into config.js ✨");
    });
  }

  /* ---------- nav, reveal, spotlight ---------- */
  function setupNav() {
    const nav = $("#nav"), bar = $("#progress"), menuBtn = $("#menuBtn");
    const onScroll = () => {
      nav.classList.toggle("scrolled", scrollY > 20);
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? clamp(scrollY / max, 0, 1) : 0})`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const setMenu = (on) => {
      nav.classList.toggle("open", on);
      menuBtn.setAttribute("aria-expanded", String(on));
    };
    menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
    $$(".nav-links a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

    $("#themeToggle").addEventListener("click", () => set("mode", root.dataset.theme === "dark" ? "light" : "dark"));

    const links = $$(".nav-links a");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) links.forEach((l) => l.classList.toggle("active", l.dataset.section === en.target.id));
      }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    $$("main section").forEach((s) => io.observe(s));
  }

  function setupReveal() {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    $$(".reveal").forEach((el) => io.observe(el));
  }

  function setupSpotlight() {
    $$(".project").forEach((card) =>
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      })
    );
  }

  /* ---------- go! ---------- */
  render();
  applyTheme();
  typewriter($("#typed"), C.roles);
  setupPanel();
  setupNav();
  setupReveal();
  setupSpotlight();

  const reapply = () => applyTheme();
  darkMQ.addEventListener?.("change", () => theme.mode === "auto" && reapply());
  reduceMQ.addEventListener?.("change", reapply);
})();
