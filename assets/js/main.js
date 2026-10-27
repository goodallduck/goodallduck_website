// 꾸더덕 — interactions (nav, hero slideshow, timecode, filters, video modal, contact form)
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- nav ---------- */
  const nav = $("#nav");
  const toggle = $("#navToggle");
  const onScroll = () => nav.classList.toggle("is-solid", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$("#navLinks a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }));

  /* ---------- hero slideshow + caption ---------- */
  const slides = $$(".hero__slide");
  const caption = $("#nowCaption");
  let current = 0;
  if (slides.length > 1 && !reduceMotion) {
    setInterval(() => {
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
      caption.style.opacity = 0;
      setTimeout(() => { caption.textContent = slides[current].dataset.caption; caption.style.opacity = 1; }, 400);
    }, 6000);
  }

  /* ---------- running timecode (HH:MM:SS:FF @ 24fps) ---------- */
  const tc = $("#timecode");
  const start = performance.now();
  const pad = (n) => String(n).padStart(2, "0");
  const tick = (now) => {
    const t = (now - start) / 1000;
    const f = Math.floor((t % 1) * 24);
    const s = Math.floor(t);
    tc.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f)}`;
    if (!reduceMotion) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    io.observe(el);
  });

  /* ---------- work filters ---------- */
  const cards = $$(".card");
  $$(".filter").forEach((btn) => btn.addEventListener("click", () => {
    $$(".filter").forEach((b) => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-selected", b === btn); });
    const f = btn.dataset.filter;
    cards.forEach((c) => {
      const show = f === "all" || c.dataset.cat === f;
      c.classList.toggle("is-hidden", !show);
      if (show) c.classList.add("is-in");
    });
    // the wide "feature" layout only makes sense when everything is shown
    $(".card--feature")?.classList.toggle("card--feature-off", f !== "all");
  }));

  /* ---------- video modal ---------- */
  const modal = $("#modal");
  const video = $("#modalVideo");
  let lastFocus = null;
  const openModal = (card) => {
    const id = card.dataset.yt;
    lastFocus = document.activeElement;
    video.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="${card.dataset.title}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen"></iframe>`;
    $("#modalSeries").textContent = `${card.dataset.series} · ${card.dataset.client}`;
    $("#modalTitle").textContent = card.dataset.title;
    $("#modalMeta").textContent = card.dataset.meta;
    $("#modalDesc").textContent = card.dataset.desc;
    $("#modalLink").href = `https://www.youtube.com/watch?v=${id}`;
    modal.hidden = false;
    document.body.classList.add("is-locked");
    $(".modal__close", modal).focus();
  };
  const closeModal = () => {
    modal.hidden = true;
    video.innerHTML = "";
    document.body.classList.remove("is-locked");
    lastFocus?.focus();
  };
  cards.forEach((c) => $(".card__media", c).addEventListener("click", () => openModal(c)));
  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  /* ---------- contact form (Netlify Forms) ---------- */
  const form = $("#contactForm");
  const status = $("#formStatus");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const btn = $(".form__submit", form);
    btn.disabled = true;
    status.className = "form__status";
    status.textContent = "보내는 중이에요…";
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.classList.add("is-ok");
      status.textContent = "문의가 접수됐어요. 확인 후 연락드릴게요!";
    } catch (err) {
      status.textContent = "전송에 실패했어요. goodallduck@gmail.com으로 메일 주시면 바로 확인할게요.";
    } finally {
      btn.disabled = false;
    }
  });
})();
