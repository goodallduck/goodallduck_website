// 작업물 목록 — 여기에 항목을 추가하면 메인과 WORK 페이지에 함께 반영됩니다.
// 배열 순서가 곧 노출 순서예요 (메인은 앞에서 5개). 장르가 섞이도록 배치했어요.
// cat: talk | interview | brand | vlog (WORK 페이지 필터와 연결)
// uploaded / seconds: YouTube 공개일 · 길이(초) — 검색엔진용 구조화 데이터에 쓰여요.
// 수정한 뒤에는 `node tools/build.js`를 실행하면 HTML · sitemap · 구조화 데이터가 함께 갱신돼요.
window.WORKS = [
  {
    id: "gs79NkDoHVc", uploaded: "2025-12-02", seconds: 527, slug: "hancar-daejeon", cat: "brand", catLabel: "브랜드 다큐",
    series: "브랜드 필름", title: "대전 유리 복원 교체는 저희가 책임지겠습니다",
    role: "기획 · 촬영 · 편집", runtime: "8:47", date: "2025.12",
    desc: "매장 기술자들의 인터뷰와 실제 시공 과정을 엮은 브랜드 다큐멘터리. 자료 조사와 대본부터 현장 · 인터뷰 촬영, 색보정, 자막 · 사운드까지 혼자 맡아, 서비스 소개보다 사람의 이야기로 신뢰를 전했습니다.",
  },
  {
    id: "cX60--ny6Vg", uploaded: "2026-10-16", seconds: 559, slug: "second-entry-1", cat: "talk", catLabel: "토크 예능",
    series: "두 번째 엔트리", title: "코트 밖에선 뭐하세요? 농구 1편",
    role: "편집", runtime: "9:19", date: "2026.10",
    desc: "은퇴 후 새 길을 걷는 농구 선수 출신 3인과 현역 선수 1인의 토크 콘텐츠. 네 사람의 대화를 리액션 중심으로 다듬고, 예능 자막 · 화면 분할 · 인물 이력 그래픽으로 웃음과 정보를 함께 살렸습니다.",
  },
  {
    id: "97S9TTtGtpI", uploaded: "2025-10-15", seconds: 434, slug: "sura-guam", cat: "vlog", catLabel: "VLOG",
    series: "SURA WORLD", title: "일 말고 여행은 처음이야, 그것도 괌?",
    role: "편집", runtime: "7:14", date: "2025.10",
    desc: "괌 생일 여행과 뷰티 루틴을 담은 VLOG. 브랜드 협업 제품 소개를 여행의 흐름 속에 자연스럽게 녹이고, 감성 자막과 리듬감 있는 컷으로 휴가의 무드를 살렸습니다.",
  },
  {
    id: "y1DKgvss6Qw", uploaded: "2026-10-07", seconds: 357, slug: "field-ep4", cat: "interview", catLabel: "인터뷰",
    series: "필드 밖 인터뷰 EP.4", title: "다이빙 선수 고현아, 체육회 행정가가 되다",
    role: "편집", runtime: "5:57", date: "2026.10",
    desc: "다이빙 선수에서 행정가가 된 선수의 인터뷰. 질문 타이틀 카드로 챕터를 나누고, 수영장 · 훈련장 · 사무실 B-roll을 엮어 변화의 흐름을 보여 주었습니다.",
  },
  {
    id: "8l0QdVpEJc0", uploaded: "2025-09-26", seconds: 345, slug: "hancar-replace", cat: "brand", catLabel: "정보 콘텐츠",
    series: "자동차 유리 이야기", title: "유리 교환 잘못 했다가 수리비 1,200만원이요?!",
    role: "기획 · 촬영 · 편집", runtime: "5:45", date: "2025.09",
    desc: "유리 교환 업체를 고를 때 무엇을 봐야 하는지 짚는 정보 콘텐츠. 기술자 인터뷰에 충돌 테스트 자료, 부자재 비교 그래픽, 강조 자막을 더해 5분 안에 핵심을 전달했습니다.",
  },
  {
    id: "zlNf0exexe8", uploaded: "2026-10-21", seconds: 669, slug: "second-entry-2", cat: "talk", catLabel: "토크 예능",
    series: "두 번째 엔트리", title: "코트 밖에선 뭐하세요? 농구 2편",
    role: "편집", runtime: "11:09", date: "2026.10",
    desc: "밸런스 게임과 모의 면접으로 이어지는 2부 구성. A/B 선택 그래픽과 VS 자막으로 긴장감을 살리고, 하이라이트 오프닝과 코너 전환으로 11분 분량을 끝까지 따라가게 만들었습니다.",
  },
  {
    id: "9KPk15Hs414", uploaded: "2025-08-22", seconds: 406, slug: "hancar-history", cat: "brand", catLabel: "정보 콘텐츠",
    series: "자동차 유리 이야기", title: "앞유리가 있는데요 없었습니다",
    role: "기획 · 제작 · 편집", runtime: "6:46", date: "2025.08",
    desc: "최초의 자동차부터 접합 유리 · 강화 유리의 탄생까지, 자동차 유리와 안전의 역사를 다룬 지식 콘텐츠. 아카이브 사진 · 특허 문서 · 충돌 테스트 영상을 말풍선과 모션 그래픽으로 엮어 가볍게 따라가도록 만들었습니다.",
  },
  {
    id: "hvKFZ2EsZR4", uploaded: "2026-09-28", seconds: 355, slug: "field-ep3", cat: "interview", catLabel: "인터뷰",
    series: "필드 밖 인터뷰 EP.3", title: "태권도 선수 윤성준, 인테리어 대표가 되다",
    role: "편집", runtime: "5:55", date: "2026.09",
    desc: "국가대표 출신에서 인테리어 업체 대표가 된 선수의 인터뷰. 답변을 '선수 시절 → 진로 고민 → 새로운 일' 흐름으로 정리하고, 도장과 현장 B-roll을 교차해 리듬을 더했습니다.",
  },
  {
    id: "VQk5wPf2Tgs", uploaded: "2024-07-29", seconds: 743, slug: "sura-y2k", cat: "vlog", catLabel: "VLOG",
    series: "SURA WORLD", title: "오또리들의 Y2K 컨셉 여행기",
    role: "편집", runtime: "12:23", date: "2024.07",
    desc: "친구들과 떠난 Y2K 컨셉 여행 VLOG. 촬영본을 예능 흐름으로 재구성하고, Y2K 무드에 맞춘 컬러 자막 · 프레임 · 효과음으로 장면마다 캐릭터를 살렸습니다.",
  },
  {
    id: "4wHNOWh1Dd4", uploaded: "2025-08-28", seconds: 344, slug: "hancar-tint", cat: "brand", catLabel: "정보 콘텐츠",
    series: "자동차 유리 이야기", title: "썬팅, 어떻게 발전해왔을까?",
    role: "기획 · 편집", runtime: "5:44", date: "2025.08",
    desc: "1960년대부터 이어진 자동차 썬팅의 역사를 다룬 지식 콘텐츠. 아카이브 영상과 일러스트, 모션 그래픽을 엮어 딱딱한 정보를 가볍게 따라가도록 구성했습니다.",
  },
  {
    id: "kCuQYSP5nCU", uploaded: "2025-06-17", seconds: 198, slug: "hancar-chip", cat: "brand", catLabel: "정보 콘텐츠",
    series: "자동차 유리 이야기", title: "돌빵 그냥 방치하지 마세요!",
    role: "기획 · 촬영 · 편집", runtime: "3:18", date: "2025.06",
    desc: "앞유리 돌빵 사고의 대처법을 알려 주는 정보 콘텐츠. 기술자가 설명하는 진행 장면에 일러스트 합성과 상황 연출 컷, 챕터 그래픽을 더해 '왜 빨리 복원해야 하는지'를 3분 안에 설득력 있게 전달했습니다.",
  },
];

// Card markup shared by the browser (main.js) and tools/build.js (pre-rendered HTML for crawlers)
window.workCardHTML = function (w, i, feature) {
  const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  return `
      <article class="card reveal${feature ? " card--feature" : ""}" data-cat="${w.cat}" data-i="${i}">
        <button class="card__media" aria-label="${esc(w.title)} 영상 재생">
          <img src="assets/img/works/${w.slug}.webp" alt="${esc(w.series)} — ${esc(w.title)}" loading="lazy" width="1280" height="720">
          <img class="card__alt" src="assets/img/works/${w.slug}-alt.webp" alt="" loading="lazy" width="960" height="540">
          <span class="card__play">재생</span>
        </button>
        <div class="card__body">
          <span class="tag">${esc(w.catLabel)}</span>
          <h3 class="card__title"><a class="card__link" href="https://www.youtube.com/watch?v=${w.id}" target="_blank" rel="noopener"><span class="card__series">${esc(w.series)}</span> ${esc(w.title)}</a></h3>
          <p class="meta">${esc(w.role)} · ${esc(w.runtime)} · ${esc(w.date)}</p>
        </div>
      </article>`;
};
