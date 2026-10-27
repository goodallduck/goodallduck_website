// 꾸더덕 — interactions (menu, work cards, filters, video modal, marquee, contact form)
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- menu ---------- */
  const menuBtn = $("#menuBtn");
  const menu = $("#menu");
  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    document.body.classList.toggle("is-locked", open);
    menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
    if (open) menu.hidden = false;
    else setTimeout(() => { if (!document.body.classList.contains("menu-open")) menu.hidden = true; }, 600);
  };
  menuBtn.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* ---------- work cards (from works.js) ---------- */
  $$("[data-works]").forEach((grid) => {
    const limit = Number(grid.dataset.limit) || Infinity;
    grid.innerHTML = (window.WORKS || []).slice(0, limit).map((w, i) => `
      <article class="card reveal${grid.hasAttribute("data-feature") && i === 0 ? " card--feature" : ""}" data-cat="${w.cat}" data-i="${i}">
        <button class="card__media" aria-label="${esc(w.title)} 영상 재생">
          <img src="assets/img/works/${w.slug}.webp" alt="${esc(w.series)} — ${esc(w.title)}" loading="lazy" width="1280" height="720">
          <img class="card__alt" src="assets/img/works/${w.slug}-alt.webp" alt="" loading="lazy" width="960" height="540">
          <span class="card__play">재생</span>
        </button>
        <div class="card__body">
          <span class="tag">${esc(w.catLabel)}</span>
          <h3 class="card__title"><span class="card__series">${esc(w.series)}</span> ${esc(w.title)}</h3>
          <p class="meta">${esc(w.role)} · ${esc(w.runtime)} · ${esc(w.date)}</p>
        </div>
      </article>`).join("");
  });

  /* ---------- ABOUT collage ----------
     Order matters: logo (2x2) + 3 wide (2x2) + 8 small tiles pack a 4-column grid
     with no gaps (6 rows), and a 2-column grid on mobile (9 rows). */
  const COLLAGE = [
    ["second-entry-1", "", true], ["field-ep3", ""], ["sura-y2k", ""],
    ["field-ep4", "", true], ["second-entry-2", ""], ["sura-guam", "-alt"],
    ["sura-guam", "", true], ["second-entry-1", "-alt"], ["field-ep4", "-alt"], ["field-ep3", "-alt"], ["sura-y2k", "-alt"],
  ];
  $$("[data-collage]").forEach((box) => {
    const works = window.WORKS || [];
    box.insertAdjacentHTML("beforeend", COLLAGE.map(([slug, alt, wide]) => {
      const i = works.findIndex((w) => w.slug === slug);
      if (i < 0) return "";
      const w = works[i];
      return `
      <button class="tile reveal${wide ? " tile--wide" : ""}" data-play="${i}" aria-label="${esc(w.title)} 영상 재생">
        <img src="assets/img/works/${slug}${alt}.webp" alt="" loading="lazy">
        ${alt ? "" : `<span class="tag">${esc(w.catLabel)}</span>`}
      </button>`;
    }).join(""));
  });

  /* ---------- filters (WORK page) ---------- */
  $$(".filter").forEach((btn) => btn.addEventListener("click", () => {
    $$(".filter").forEach((b) => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-selected", b === btn); });
    const f = btn.dataset.filter;
    $$(".card").forEach((c) => {
      const show = f === "all" || c.dataset.cat === f;
      c.classList.toggle("is-hidden", !show);
      if (show) c.classList.add("is-in");
    });
  }));

  /* ---------- video modal ---------- */
  const modal = $("#modal");
  if (modal) {
    const video = $("#modalVideo");
    let lastFocus = null;
    const open = (w) => {
      lastFocus = document.activeElement;
      video.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${w.id}?autoplay=1&rel=0" title="${esc(w.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen"></iframe>`;
      $("#modalCat").textContent = w.catLabel;
      $("#modalTitle").textContent = `${w.series} — ${w.title}`;
      $("#modalMeta").textContent = `${w.role} · ${w.runtime} · ${w.date}`;
      $("#modalDesc").textContent = w.desc;
      $("#modalLink").href = `https://www.youtube.com/watch?v=${w.id}`;
      modal.hidden = false;
      document.body.classList.add("is-locked");
      $(".modal__close", modal).focus();
    };
    const close = () => {
      modal.hidden = true;
      video.innerHTML = "";
      document.body.classList.remove("is-locked");
      lastFocus?.focus();
    };
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".card__media, [data-play]");
      if (btn) open(window.WORKS[btn.dataset.play ?? btn.closest(".card").dataset.i]);
    });
    $$("[data-close]", modal).forEach((el) => el.addEventListener("click", close));
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!modal.hidden) close();
      else if (document.body.classList.contains("menu-open")) setMenu(false);
    });
  }

  /* ---------- marquee: repeat the track so the loop is seamless ---------- */
  $$(".marquee__track").forEach((t) => { t.innerHTML += t.innerHTML; });

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
  $$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 2) * 90}ms`; io.observe(el); });

  /* ---------- contact form (Web3Forms → email to goodallduck@gmail.com) ---------- */
  $$('form[name="contact"]').forEach((form) => {
    const status = $(".form__status", form);
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const btn = $(".form__submit", form);
      btn.disabled = true;
      status.className = "form__status";
      status.textContent = "보내는 중…";
      try {
        const res = await fetch(form.action, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || res.status);
        form.reset();
        status.classList.add("is-ok");
        status.textContent = "접수됐어요! 확인 후 연락드릴게요.";
      } catch (err) {
        status.textContent = "전송에 실패했어요. goodallduck@gmail.com으로 보내주세요.";
      } finally {
        btn.disabled = false;
      }
    });
  });
})();
