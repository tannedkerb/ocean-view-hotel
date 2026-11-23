/* OCEAN VIEW HOTEL — main script */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  let lang = localStorage.getItem("ovh-lang") || "az";
  const t = (k) => (I18N[k] && I18N[k][lang]) || k;
  const L = (o) => (o && (o[lang] || o.az)) || "";
  const fmt = (n) => Math.round(n).toLocaleString("en-US").replace(/,/g, " ");
  const usd = (n) => "$" + fmt(n);
  const azn = (n) => "≈ " + fmt(n * SITE.AZN_RATE) + " AZN";

  /* ---------------- PRELOADER ---------------- */
  addEventListener("load", () => setTimeout(() => {
    $("#preloader").classList.add("done");
    document.body.classList.remove("is-loading");
    startBubbles();
  }, 1700));

  /* ---------------- I18N ---------------- */
  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    $$("#lang button").forEach((b) => b.classList.toggle("active", b.dataset.lang === lang));
    renderAll();
  }
  $$("#lang button").forEach((b) => b.addEventListener("click", () => {
    lang = b.dataset.lang; localStorage.setItem("ovh-lang", lang);
    document.body.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 500, easing: "ease-out" });
    applyLang();
  }));

  function renderAll() {
    renderRooms(); renderDining(); renderExperiences(); renderPackages();
    renderReviews(); renderFaq(); renderContacts(); fillBookingSelects(); calcBooking();
    observeReveal();
  }

  /* ---------------- ROOMS ---------------- */
  function renderRooms() {
    $("#roomGrid").innerHTML = ROOMS.map((r, i) => `
      <article class="room reveal" style="transition-delay:${(i % 2) * 100}ms">
        <div class="room__img">
          <img src="${r.img}" alt="${L(r.name)}" loading="lazy" />
          <span class="room__lvl ${r.level}">${r.level === "above" ? "☀" : "🌊"} ${t("lvl." + r.level)}</span>
        </div>
        <div class="room__body">
          <h3>${L(r.name)}</h3>
          <div class="room__meta"><span>${r.size} m²</span><span>·</span><span>${r.guests} ${t("rooms.guests")}</span><span>·</span><span>${r.count} ${t("rooms.count")}</span></div>
          <p class="room__desc">${L(r.desc)}</p>
          <div class="room__amen">${r.amen.map((a) => `<span>${AMENITIES[a].icon} ${L(AMENITIES[a])}</span>`).join("")}</div>
          <div class="room__foot">
            <div class="price">${usd(r.price)}<small>${t("rooms.night")} · ${azn(r.price)}</small></div>
            <button class="btn btn--outline btn--sm" data-room="${r.id}">${t("btn.choose")}</button>
          </div>
        </div>
      </article>`).join("");
    $$("[data-room]").forEach((b) => b.addEventListener("click", () => openBooking({ room: b.dataset.room })));
  }

  /* ---------------- DINING ---------------- */
  function renderDining() {
    $("#dinList").innerHTML = RESTAURANTS.map((r) => `
      <div class="din">
        <div class="din__media reveal"><img src="${r.img}" alt="" loading="lazy" /></div>
        <div class="reveal">
          <h3>${L(r.name)}</h3>
          <p>${L(r.desc)}</p>
          <ul class="menu">${r.menu.map((m) => `<li><b>${L(m.name)}</b><i></i><em>${usd(m.price)}</em></li>`).join("")}</ul>
        </div>
      </div>`).join("");
  }

  /* ---------------- EXPERIENCES ---------------- */
  function renderExperiences() {
    $("#expGrid").innerHTML = EXPERIENCES.map((e, i) => `
      <div class="exp reveal" style="transition-delay:${(i % 3) * 90}ms">
        <img src="${e.img}" alt="" loading="lazy" />
        <div class="exp__ico">${e.icon}</div>
        <h4>${L(e.name)}</h4>
        <p>${L(e.desc)}</p>
        <div class="exp__price">${t("exp.from") ? `<small>${t("exp.from")}</small>` : ""}${usd(e.price)}<small>/ ${L(e.unit)}</small></div>
      </div>`).join("");
  }

  /* ---------------- PACKAGES ---------------- */
  function renderPackages() {
    $("#pkGrid").innerHTML = PACKAGES.map((p, i) => `
      <div class="pk reveal ${p.featured ? "featured" : ""}" style="transition-delay:${i * 100}ms">
        ${p.featured ? `<span class="pk__badge">${t("pk.popular")}</span>` : ""}
        <div class="pk__nights">${p.nights} ${t("pk.nights")}</div>
        <h3>${L(p.name)}</h3>
        <div class="pk__price">${usd(p.price)}</div>
        <div class="pk__save"><s>${usd(p.value)}</s> · ${t("pk.save")} <b>${usd(p.value - p.price)}</b> · ${azn(p.price)}</div>
        <ul>${L(p.items).map((x) => `<li>${x}</li>`).join("")}</ul>
        <button class="btn ${p.featured ? "btn--aqua" : "btn--outline"}" data-pkg="${p.id}">${t("btn.package")}</button>
      </div>`).join("");
    $$("[data-pkg]").forEach((b) => b.addEventListener("click", () => openBooking({ pkg: b.dataset.pkg })));
  }

  /* ---------------- REVIEWS ---------------- */
  let rvI = 0, rvTimer;
  function renderReviews() {
    $("#sliderTrack").innerHTML = REVIEWS.map((r) => `
      <div class="review">
        <div class="review__stars">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</div>
        <blockquote>${L(r.text)}</blockquote>
        <cite>${r.name} <span>· ${L(r.from)}</span></cite>
      </div>`).join("");
    $("#sliderDots").innerHTML = REVIEWS.map((_, i) => `<button data-i="${i}" aria-label="${i + 1}"></button>`).join("");
    $$("#sliderDots button").forEach((b) => b.addEventListener("click", () => goReview(+b.dataset.i)));
    goReview(rvI);
  }
  function goReview(i) {
    rvI = (i + REVIEWS.length) % REVIEWS.length;
    $("#sliderTrack").style.transform = `translateX(-${rvI * 100}%)`;
    $$("#sliderDots button").forEach((b, k) => b.classList.toggle("active", k === rvI));
    clearInterval(rvTimer); rvTimer = setInterval(() => goReview(rvI + 1), 6500);
  }
  $("#prevRev").addEventListener("click", () => goReview(rvI - 1));
  $("#nextRev").addEventListener("click", () => goReview(rvI + 1));

  /* ---------------- FAQ ---------------- */
  function renderFaq() {
    $("#faqList").innerHTML = FAQ.map((f, i) => `
      <div class="acc reveal ${i === 0 ? "open" : ""}">
        <button class="acc__q">${L(f.q)}<i></i></button>
        <div class="acc__a"><div><p>${L(f.a)}</p></div></div>
      </div>`).join("");
    $$(".acc__q").forEach((q) => q.addEventListener("click", () => {
      const a = q.parentElement, was = a.classList.contains("open");
      $$(".acc").forEach((x) => x.classList.remove("open"));
      if (!was) a.classList.add("open");
    }));
  }

  /* ---------------- CONTACTS ---------------- */
  const ICONS = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6 1-.6z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.2 1.7 3.8 4 4v3.3c-1.5 0-2.9-.4-4-1.1v6.3c0 3.4-2.6 5.5-5.5 5.5S5.5 18.8 5.5 15.6c0-3.4 2.9-5.7 6.3-5.3v3.4c-1.4-.4-2.9.5-2.9 2 0 1.2 1 2.1 2.2 2.1 1.4 0 2.2-.9 2.2-2.4V3h3.2z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2c-.2-1.5-1-2.5-2.5-2.7C17.3 5.2 12 5.2 12 5.2s-5.3 0-7.5.3C3 5.7 2.2 6.7 2 8.2 1.8 9.6 1.8 12 1.8 12s0 2.4.2 3.8c.2 1.5 1 2.5 2.5 2.7 2.2.3 7.5.3 7.5.3s5.3 0 7.5-.3c1.5-.2 2.3-1.2 2.5-2.7.2-1.4.2-3.8.2-3.8s0-2.4-.2-3.8zM10 15V9l5.2 3L10 15z"/></svg>'
  };
  function renderContacts() {
    $("#cAddress").textContent = L(SITE.address);
    $("#cPhone").textContent = SITE.phone; $("#cPhone").href = "tel:" + SITE.phone.replace(/\s/g, "");
    $("#cEmail").textContent = SITE.email; $("#cEmail").href = "mailto:" + SITE.email;
    $$(".js-wa").forEach((a) => (a.href = `https://wa.me/${SITE.whatsapp}`));
    $("#socials").innerHTML = Object.entries(SITE.socials).map(([k, v]) => `<a href="${v}" aria-label="${k}" target="_blank" rel="noopener">${ICONS[k] || k}</a>`).join("");
    const src = `https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&hl=${lang}&z=10&output=embed`;
    if ($("#map").src !== src) $("#map").src = src;
  }

  /* ---------------- LEVELS SWITCH ---------------- */
  const sw = $("#lvSwitch"), lv = $("#lv");
  function setLevel(v) {
    lv.dataset.state = v;
    sw.classList.toggle("below", v === "below");
    $$("#lvSwitch button").forEach((b) => b.classList.toggle("active", b.dataset.lv === v));
  }
  $$("#lvSwitch button").forEach((b) => b.addEventListener("click", () => setLevel(b.dataset.lv)));
  onSwipe(lv, (d) => setLevel(d > 0 ? "below" : "above"));

  /* ---------------- SCROLL: header, progress, depth ---------------- */
  const header = $("#header"), progress = $("#scrollProgress"), toTop = $("#toTop"), heroBg = $(".hero__bg");
  const depth = $("#depth"), depthVal = $("#depthVal"), depthFill = $("#depthFill");
  function onScroll() {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight, p = h > 0 ? y / h : 0;
    header.classList.toggle("scrolled", y > 40);
    progress.style.width = p * 100 + "%";
    toTop.classList.toggle("show", y > 800);
    depth.classList.toggle("show", y > innerHeight * 0.6);
    depthVal.textContent = (p * 12).toFixed(1);
    depthFill.style.height = p * 100 + "%";
    if (y < innerHeight) heroBg.style.transform = `translateY(${y * 0.3}px)`;
    let cur = "";
    $$("section[id]").forEach((s) => { if (y + 140 >= s.offsetTop) cur = s.id; });
    $$(".nav a").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
  }
  addEventListener("scroll", onScroll, { passive: true });
  toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  const burger = $("#burger"), nav = $("#nav");
  $$(".nav a").forEach((a, i) => a.style.setProperty("--i", i));
  const closeMenu = () => { burger.classList.remove("open"); nav.classList.remove("open"); document.body.classList.remove("no-scroll"); };
  burger.addEventListener("click", () => {
    const open = !nav.classList.contains("open");
    burger.classList.toggle("open", open); nav.classList.toggle("open", open);
    document.body.classList.toggle("no-scroll", open);
  });
  $$(".nav a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---------------- REVEAL + COUNTERS ---------------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) {
      const el = e.target;
      el.classList.add("in"); io.unobserve(el);
      // the stagger delay is only for the appear animation; drop it so hover effects react instantly
      if (el.style.transitionDelay) setTimeout(() => { el.style.transitionDelay = ""; }, 1400);
    }
  }), { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  function observeReveal() { $$(".reveal:not(.in)").forEach((el) => io.observe(el)); }
  const cio = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, t0 = performance.now();
    const step = (now) => { const k = Math.min((now - t0) / 1800, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - k, 4))); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step); cio.unobserve(el);
  }), { threshold: 0.5 });
  $$("[data-count]").forEach((el) => cio.observe(el));

  /* ---------------- BUBBLES ---------------- */
  function startBubbles() {
    const cv = $("#bubbles"), ctx = cv.getContext("2d");
    let W, H, bs = [];
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const resize = () => { W = cv.width = cv.offsetWidth * dpr; H = cv.height = cv.offsetHeight * dpr; };
    resize(); addEventListener("resize", resize);
    const count = innerWidth < 640 ? 35 : 70;
    const mk = (initial) => ({ x: Math.random() * W, y: initial ? Math.random() * H : H + 20, r: (Math.random() * 4 + 1.2) * dpr, v: (Math.random() * 0.7 + 0.3) * dpr, a: Math.random() * 6.28, w: Math.random() * 0.6 + 0.2 });
    for (let i = 0; i < count; i++) bs.push(mk(true));
    (function loop() {
      ctx.clearRect(0, 0, W, H);
      for (const b of bs) {
        b.y -= b.v; b.a += 0.02; b.x += Math.sin(b.a) * b.w;
        if (b.y < -20) Object.assign(b, mk(false));
        const alpha = Math.min(1, b.y / (H * 0.5)) * 0.55;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, 6.283);
        ctx.strokeStyle = `rgba(190,250,247,${alpha})`; ctx.lineWidth = dpr; ctx.stroke();
        ctx.beginPath(); ctx.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.28, 0, 6.283);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`; ctx.fill();
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ---------------- SWIPE ---------------- */
  function onSwipe(el, cb) {
    let x0 = null, y0 = null;
    el.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    el.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) cb(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  }
  onSwipe($("#slider"), (d) => goReview(rvI + d));

  /* ---------------- MODALS ---------------- */
  const openModal = (m) => { m.classList.add("open"); m.setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll"); };
  const closeModal = (m) => { m.classList.remove("open"); m.setAttribute("aria-hidden", "true"); document.body.classList.remove("no-scroll"); };
  $$(".modal").forEach((m) => m.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(m); }));
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") { $$(".modal.open").forEach(closeModal); closeLb(); }
    if ($("#lightbox").classList.contains("open")) { if (e.key === "ArrowRight") lbGo(1); if (e.key === "ArrowLeft") lbGo(-1); }
  });

  /* ---------------- BOOKING ---------------- */
  const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const addDays = (s, n) => { const d = new Date(s); d.setDate(d.getDate() + n); return iso(d); };
  const today = iso(new Date()), tomorrow = addDays(today, 1);
  ["#qIn", "#bIn"].forEach((s) => { $(s).min = today; $(s).value = tomorrow; });
  ["#qOut", "#bOut"].forEach((s) => { $(s).min = tomorrow; $(s).value = addDays(tomorrow, 2); });
  let activePkg = null;

  function fillBookingSelects() {
    const sel = $("#bRoom"), cur = sel.value;
    sel.innerHTML = ROOMS.map((r) => `<option value="${r.id}">${L(r.name)} — ${usd(r.price)} ${t("rooms.night")}</option>`).join("");
    if (cur) sel.value = cur;
    const checked = $$("#bExtras input:checked").map((i) => i.value);
    $("#bExtras").innerHTML = EXTRAS.map((x) => `
      <label class="ex"><input type="checkbox" value="${x.id}" ${checked.includes(x.id) ? "checked" : ""} /><i></i><span>${L(x.name)}</span><em>+${usd(x.price)}</em></label>`).join("");
    $$("#bExtras input").forEach((i) => i.addEventListener("change", calcBooking));
    if (activePkg) $("#bkPkgName").textContent = L(activePkg.name);
  }
  const nights = () => Math.round((new Date($("#bOut").value) - new Date($("#bIn").value)) / 864e5);
  function calcBooking() {
    const room = ROOMS.find((r) => r.id === $("#bRoom").value) || ROOMS[0];
    const n = Math.max(0, nights() || 0);
    const extras = $$("#bExtras input:checked").reduce((s, i) => s + EXTRAS.find((x) => x.id === i.value).price, 0);
    const base = activePkg ? activePkg.price : n * room.price;
    const total = base + extras;
    $("#sNights").textContent = n;
    $("#sTotal").textContent = usd(total);
    $("#sAzn").textContent = azn(total);
    return total;
  }
  $("#bRoom").addEventListener("change", calcBooking);
  $("#bIn").addEventListener("change", () => {
    $("#bOut").min = addDays($("#bIn").value, 1);
    if (activePkg) $("#bOut").value = addDays($("#bIn").value, activePkg.nights);
    calcBooking();
  });
  $("#bOut").addEventListener("change", calcBooking);

  function setPackage(p) {
    activePkg = p || null;
    $("#bkPkg").hidden = !activePkg;
    $("#bRoom").disabled = !!activePkg;
    $("#bOut").disabled = !!activePkg;
    if (activePkg) {
      $("#bkPkgName").textContent = L(activePkg.name);
      $("#bRoom").value = activePkg.room;
      $("#bOut").value = addDays($("#bIn").value, activePkg.nights);
    }
    calcBooking();
  }
  $("#bkPkgX").addEventListener("click", () => setPackage(null));

  function openBooking(o = {}) {
    $("#bkForm").hidden = false; $("#bkOk").hidden = true; $("#bErr").textContent = "";
    if (o.in) $("#bIn").value = o.in;
    if (o.out) $("#bOut").value = o.out;
    if (o.guests) $("#bAdults").value = o.guests;
    if (o.room) $("#bRoom").value = o.room;
    setPackage(o.pkg ? PACKAGES.find((p) => p.id === o.pkg) : null);
    openModal($("#bookModal"));
  }
  document.addEventListener("click", (e) => { if (e.target.closest(".js-book")) { closeMenu(); openBooking(); } });
  $("#quickForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const g = +$("#qGuests").value;
    const room = ROOMS.find((r) => r.guests >= g) || ROOMS[0];
    openBooking({ room: room.id, in: $("#qIn").value, out: $("#qOut").value, guests: g });
  });

  const shake = () => $("#bookModal .modal__box").animate([{ transform: "translateX(0)" }, { transform: "translateX(-10px)" }, { transform: "translateX(10px)" }, { transform: "translateX(-6px)" }, { transform: "translateX(0)" }], { duration: 400 });
  $("#bookForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const err = $("#bErr");
    $$("#bookForm .f").forEach((f) => f.classList.remove("invalid"));
    const miss = ["#bIn", "#bOut", "#bName", "#bPhone"].filter((s) => !$(s).value.trim());
    if (miss.length) { miss.forEach((s) => $(s).closest(".f").classList.add("invalid")); err.textContent = t("bk.err.req"); shake(); return; }
    if (nights() <= 0) { $("#bOut").closest(".f").classList.add("invalid"); err.textContent = t("bk.err.dates"); shake(); return; }
    const room = ROOMS.find((r) => r.id === $("#bRoom").value);
    if (+$("#bAdults").value + +$("#bKids").value > room.guests + 1) { err.textContent = t("bk.err.guests"); shake(); return; }

    const num = "OVH-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    const booking = {
      num, room: room.id, package: activePkg ? activePkg.id : null, checkIn: $("#bIn").value, checkOut: $("#bOut").value,
      adults: +$("#bAdults").value, kids: +$("#bKids").value, name: $("#bName").value.trim(), phone: $("#bPhone").value.trim(),
      email: $("#bEmail").value.trim(), extras: $$("#bExtras input:checked").map((i) => i.value), comment: $("#bComment").value.trim(),
      totalUSD: calcBooking(), created: new Date().toISOString()
    };
    // demo mode: the booking is saved in this browser (localStorage)
    const all = JSON.parse(localStorage.getItem("ovh-bookings") || "[]");
    all.push(booking); localStorage.setItem("ovh-bookings", JSON.stringify(all));
    $("#okNum").textContent = num;
    $("#bkForm").hidden = true; $("#bkOk").hidden = false;
    $("#bookForm").reset(); $("#bIn").value = tomorrow; $("#bOut").value = addDays(tomorrow, 2);
    setPackage(null);
  });

  /* ---------------- LIGHTBOX ---------------- */
  const lb = $("#lightbox"), lbImg = $("#lbImg"), items = $$("#masonry .m-item");
  let lbI = 0;
  items.forEach((a, i) => a.addEventListener("click", (e) => { e.preventDefault(); lbI = i; lbShow(); lb.classList.add("open"); }));
  function lbShow() { lbImg.src = items[lbI].getAttribute("href"); }
  function lbGo(d) { lbI = (lbI + d + items.length) % items.length; lbShow(); }
  function closeLb() { lb.classList.remove("open"); }
  $(".lightbox__close").addEventListener("click", closeLb);
  $(".lightbox__prev").addEventListener("click", () => lbGo(-1));
  $(".lightbox__next").addEventListener("click", () => lbGo(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  onSwipe(lb, lbGo);

  /* ---------------- INIT ---------------- */
  $("#year").textContent = new Date().getFullYear();
  applyLang();
  onScroll();
})();
