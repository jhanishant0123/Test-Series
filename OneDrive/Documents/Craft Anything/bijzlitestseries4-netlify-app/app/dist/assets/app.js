/* BIJZLI Test Series - client application */
(() => {
  "use strict";

  const THEME_KEY = window.__bijzliThemeKey || "bijzli-theme-v3";
  const ACTIVITY_KEY = "bijzli-activity-v1";
  const SAVED_KEY = "bijzli-saved-v1";
  const THEMES = new Set(["dark", "bright", "green"]);
  const PAGE = 60;
  const PAPER_BASE = "https://bijzlitestseries4.netlify.app/";

  const byId = (id) => document.getElementById(id);

  const refs = {
    topbar: document.querySelector(".topbar"),
    search: byId("global-search"),
    searchClear: byId("search-clear"),
    searchSection: byId("search-section"),
    searchHeading: byId("search-heading"),
    searchCount: byId("search-count"),
    searchResults: byId("search-results"),
    searchMore: byId("search-more"),
    skeleton: byId("skeleton"),
    crumbs: byId("crumbs"),
    stepText: byId("step-text"),
    selectorTitle: byId("selector-title"),
    statusNote: byId("status-note"),
    resetBtn: byId("reset-btn"),
    browser: byId("browser"),
    branchSection: byId("branch-section"),
    branchGrid: byId("branch-grid"),
    providerSection: byId("provider-section"),
    providerGrid: byId("provider-grid"),
    seriesSection: byId("series-section"),
    seriesGrid: byId("series-grid"),
    testsSection: byId("tests-section"),
    testsList: byId("tests-list"),
    filterChips: byId("filter-chips"),
    yearChips: byId("year-chips"),
    filterInput: byId("filter-input"),
    sortSelect: byId("sort-select"),
    hideDone: byId("hide-done"),
    resultCount: byId("result-count"),
    branchCount: byId("branch-count"),
    providerCount: byId("provider-count"),
    testCount: byId("test-count"),
    openedCount: byId("opened-count"),
    activityCard: byId("activity-card"),
    activityList: byId("activity-list"),
    kpiRow: byId("kpi-row"),
    clearActivity: byId("clear-activity"),
    ctaBrowse: byId("cta-browse"),
    ctaResume: byId("cta-resume"),
    themeButtons: Array.from(document.querySelectorAll(".theme-btn")),
    tabs: Array.from(document.querySelectorAll(".tab"))
  };

  const state = {
    manifest: null,
    branches: [],
    papers: [],
    byKey: new Map(),
    route: { view: "browse", b: null, p: null, s: null, q: "" },
    activity: {},
    saved: new Set(),
    filter: "all",
    year: "all",
    sort: "default",
    seriesQuery: "",
    hideDone: false,
    activeSeriesKey: null,
    searchLimit: PAGE,
    wasSearching: false,
    activityTab: "continue",
    theme: window.__bijzliBootTheme || "dark"
  };

  const BRANCH_META = [
    { match: "DATA SCIENCE", code: "DA", hue: 192 },
    { match: "COMPUTER", code: "CS", hue: 265 },
    { match: "ELECTRONICS", code: "EC", hue: 212 },
    { match: "ELECTRICAL", code: "EE", hue: 45 },
    { match: "MECHANICAL", code: "ME", hue: 340 },
    { match: "CIVIL", code: "CE", hue: 25 }
  ];

  const CATEGORY_RULES = [
    ["mock", /\bmock\b/],
    ["subjectwise", /subject[\s_-]*wise/],
    ["topicwise", /topic[\s_-]*wise/],
    ["aptitude", /\baptitude\b/],
    ["advance", /\badvance/],
    ["basic", /\bbasic\b/],
    ["demo", /\bdemo\b/],
    ["full-syllabus", /full[\s_-]*syllabus/],
    ["part-syllabus", /part[\s_-]*syllabus/]
  ];

  const CATEGORY_LABELS = {
    all: "All types",
    mock: "Mock",
    "practice-mock": "Practice mock",
    subjectwise: "Subjectwise",
    "practice-subjectwise": "Practice subjectwise",
    "multi-subjectwise": "Multi-subject",
    topicwise: "Topicwise",
    "practice-topicwise": "Practice topicwise",
    aptitude: "Aptitude",
    advance: "Advance",
    basic: "Basic",
    demo: "Demo",
    "full-syllabus": "Full syllabus",
    "part-syllabus": "Part syllabus",
    other: "Other"
  };

  const CATEGORY_ORDER = [
    "all", "mock", "practice-mock", "subjectwise", "practice-subjectwise",
    "multi-subjectwise", "topicwise", "practice-topicwise", "aptitude",
    "advance", "basic", "full-syllabus", "part-syllabus", "demo", "other"
  ];

  const PROVIDER_ALIASES = {
    "MADE EASY": "BIJZLI EASY",
    "GATE ZEAL": "BIJZLI ZEAL"
  };

  const numberFormat = new Intl.NumberFormat("en-IN");

  function tidy(text) {
    return String(text ?? "")
      .replace(/_/g, " ")
      .replace(/\s*-\s*-\s*/g, " - ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function slugify(text) {
    const base = tidy(text)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (!base) return "item";
    if (base.length <= 60) return base;
    const cut = base.slice(0, 60);
    const boundary = cut.lastIndexOf("-");
    return (boundary > 24 ? cut.slice(0, boundary) : cut).replace(/-+$/, "") || "item";
  }

  function activityKey(path) {
    return String(path ?? "").toLowerCase().replace(/\.html?$/, "");
  }

  function providerLabel(name) {
    const clean = tidy(name);
    return PROVIDER_ALIASES[clean.toUpperCase()] ?? clean;
  }

  function branchMeta(name) {
    const upper = String(name ?? "").toUpperCase();
    return BRANCH_META.find((entry) => upper.includes(entry.match)) || { code: upper.slice(0, 2) || "GA", hue: 210 };
  }

  function accentFor(hue) {
    return `hsl(${hue} 72% 58%)`;
  }

  function categoryOf(title) {
    const text = title.toLowerCase();
    const hit = CATEGORY_RULES.find(([, pattern]) => pattern.test(text));
    return hit ? hit[0] : "other";
  }

  function yearsIn(text) {
    return Array.from(new Set(String(text).match(/(?<![0-9])20\d{2}(?![0-9])/g) || []));
  }

  function paperNumber(fileName) {
    const name = String(fileName ?? "");
    const match = /^(\d{1,4})[_\-\s]/.exec(name);
    if (match) return match[1].replace(/^0+(?=\d)/, "");
    const idMatch = /test[\s_-]*id[\s_-]*-?[\s_-]*(\d+)/i.exec(name);
    return idMatch ? idMatch[1] : "";
  }

  function pluralize(count, singular, plural = `${singular}s`) {
    return `${numberFormat.format(count)} ${count === 1 ? singular : plural}`;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function icon(paths, className) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    if (className) svg.setAttribute("class", className);
    paths.forEach((d) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      svg.appendChild(path);
    });
    return svg;
  }

  function relativeTime(timestamp) {
    if (!timestamp) return "";
    const minutes = Math.round((Date.now() - timestamp) / 60000);
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.round(hours / 24);
    if (days === 1) return "yesterday";
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  }

  /* Storage */

  function readStore(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch (_error) {
      return fallback;
    }
  }

  function writeStore(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_error) {
      /* storage is optional */
    }
  }

  function loadLocalState() {
    state.activity = readStore(ACTIVITY_KEY, {});
    const savedList = readStore(SAVED_KEY, []);
    state.saved = new Set(Array.isArray(savedList) ? savedList : []);
  }

  function recordOpen(paper) {
    const store = readStore(ACTIVITY_KEY, {});
    const previous = store[paper.key] || {};
    store[paper.key] = {
      ...previous,
      title: paper.title,
      branch: paper.branchName,
      series: paper.seriesLabel,
      openedAt: Date.now(),
      opens: (previous.opens || 0) + 1
    };
    writeStore(ACTIVITY_KEY, store);
    state.activity = store;
  }

  function toggleSaved(path) {
    if (state.saved.has(path)) state.saved.delete(path);
    else state.saved.add(path);
    writeStore(SAVED_KEY, Array.from(state.saved));
  }

  function entryFor(path) {
    return state.activity[path] || null;
  }

  function scoreOf(entry) {
    if (!entry || entry.submittedAt == null) return null;
    const marks = Number(entry.marks);
    const total = Number(entry.total);
    if (Number.isFinite(marks) && Number.isFinite(total) && total > 0) {
      return { basis: "marks", value: marks, max: total, pct: Math.max(0, (marks / total) * 100) };
    }
    const correct = Number(entry.correct);
    const questions = Number(entry.questions);
    if (Number.isFinite(correct) && Number.isFinite(questions) && questions > 0) {
      return { basis: "questions", value: correct, max: questions, pct: Math.max(0, (correct / questions) * 100) };
    }
    return null;
  }

  /* Index */

  function unique(slug, used) {
    let candidate = slug;
    let counter = 2;
    while (used.has(candidate)) candidate = `${slug}-${counter++}`;
    used.add(candidate);
    return candidate;
  }

  function buildIndex(manifest) {
    const branches = [];
    const papers = [];
    const byKey = new Map();
    const usedBranchSlugs = new Set();

    manifest.branches.forEach((rawBranch) => {
      const meta = branchMeta(rawBranch.name);
      const branch = {
        name: tidy(rawBranch.name),
        slug: unique(slugify(rawBranch.name), usedBranchSlugs),
        code: meta.code,
        accent: accentFor(meta.hue),
        testCount: rawBranch.testCount || 0,
        providers: []
      };

      const usedProviderSlugs = new Set();
      (rawBranch.providers || []).forEach((rawProvider) => {
        const provider = {
          name: providerLabel(rawProvider.name),
          slug: unique(slugify(providerLabel(rawProvider.name)), usedProviderSlugs),
          testCount: rawProvider.testCount || 0,
          branch,
          series: []
        };

        const usedSeriesSlugs = new Set();
        (rawProvider.series || []).forEach((rawSeries) => {
          const label = tidy(rawSeries.name);
          const labelYears = yearsIn(rawSeries.name);
          const seriesYears = (labelYears.length ? labelYears : yearsIn(rawSeries.path)).sort();
          const series = {
            name: label,
            slug: unique(slugify(label), usedSeriesSlugs),
            path: rawSeries.path,
            yearLabel: seriesYears.length >= 2
              ? `${seriesYears[0]}-${seriesYears[seriesYears.length - 1]}`
              : seriesYears[0] || "Batch",
            testCount: rawSeries.testCount || 0,
            branch,
            provider,
            tests: []
          };

          (rawSeries.tests || []).forEach((rawTest, index) => {
            const title = tidy(rawTest.title);
            const years = yearsIn(title);
            const paper = {
              path: rawTest.path,
              key: activityKey(rawTest.path),
              href: `${PAPER_BASE}${encodeURI(rawTest.path)}`,
              title,
              num: rawTest.num != null ? String(rawTest.num) : paperNumber(rawTest.fileName),
              order: index,
              category: rawTest.category ||
                (categoryOf(title) === "other" ? categoryOf(label) : categoryOf(title)),
              year: years.length ? years[years.length - 1] : "",
              branch,
              provider,
              series,
              branchName: branch.name,
              providerName: provider.name,
              seriesLabel: series.name,
              haystack: `${title} ${branch.name} ${branch.code} ${provider.name} ${series.name}`.toLowerCase()
            };
            series.tests.push(paper);
            papers.push(paper);
            byKey.set(paper.key, paper);
          });

          provider.series.push(series);
        });

        branch.providers.push(provider);
      });

      branches.push(branch);
    });

    state.branches = branches;
    state.papers = papers;
    state.byKey = byKey;
  }

  function openedCount(tests) {
    let count = 0;
    tests.forEach((test) => {
      if (state.activity[test.key]) count += 1;
    });
    return count;
  }

  function branchTests(branch) {
    const list = [];
    branch.providers.forEach((provider) =>
      provider.series.forEach((series) => list.push(...series.tests))
    );
    return list;
  }

  function providerTests(provider) {
    const list = [];
    provider.series.forEach((series) => list.push(...series.tests));
    return list;
  }

  /* Router */

  function parseHash() {
    const raw = decodeURIComponent((location.hash || "").replace(/^#\/?/, ""));
    if (!raw) return { view: "browse", b: null, p: null, s: null, q: "" };
    const parts = raw.split("/").filter(Boolean);
    if (parts[0] === "q") {
      return { view: "search", b: null, p: null, s: null, q: parts.slice(1).join("/") };
    }
    if (parts[0] === "saved") {
      return { view: "saved", b: null, p: null, s: null, q: "" };
    }
    if (parts[0] === "b") {
      return { view: "browse", b: parts[1] || null, p: parts[2] || null, s: parts[3] || null, q: "" };
    }
    return { view: "browse", b: null, p: null, s: null, q: "" };
  }

  function hashFor(branch, provider, series) {
    if (!branch) return "#/";
    let hash = `#/b/${branch.slug}`;
    if (provider) hash += `/${provider.slug}`;
    if (provider && series) hash += `/${series.slug}`;
    return hash;
  }

  function navigate(hash, replace = false) {
    const next = hash || "#/";
    if (location.hash === next) return;
    if (replace) {
      history.replaceState(null, "", next);
      applyRoute();
    } else {
      location.hash = next;
    }
  }

  function resolveRoute() {
    const route = state.route;
    const branch = route.b ? state.branches.find((item) => item.slug === route.b) || null : null;
    const provider = branch && route.p
      ? branch.providers.find((item) => item.slug === route.p) || null
      : null;
    const series = provider && route.s
      ? provider.series.find((item) => item.slug === route.s) || null
      : null;
    return { branch, provider, series };
  }

  function applyRoute() {
    state.route = parseHash();
    if (state.route.view === "search" && refs.search.value !== state.route.q) {
      refs.search.value = state.route.q;
    }
    if (state.route.view !== "search" && document.activeElement !== refs.search) {
      refs.search.value = "";
    }
    if (state.manifest) render();
  }

  /* Renderers */

  function setStatus(message, isError = false) {
    refs.statusNote.textContent = message;
    refs.statusNote.classList.toggle("error", isError);
  }

  function show(section, visible) {
    section.classList.toggle("hidden", !visible);
  }

  function renderCrumbs(branch, provider, series) {
    refs.crumbs.replaceChildren();
    const trail = [{ label: "All branches", hash: "#/" }];
    if (branch) trail.push({ label: branch.name, hash: hashFor(branch) });
    if (provider) trail.push({ label: provider.name, hash: hashFor(branch, provider) });
    if (series) trail.push({ label: series.name, hash: hashFor(branch, provider, series) });
    if (trail.length < 2) return;

    trail.forEach((crumb, index) => {
      if (index > 0) refs.crumbs.appendChild(el("span", "crumb-sep", "/"));
      const button = el("button", "crumb", crumb.label);
      button.type = "button";
      if (index === trail.length - 1) {
        button.setAttribute("aria-current", "page");
        button.disabled = true;
      } else {
        button.addEventListener("click", () => navigate(crumb.hash));
      }
      refs.crumbs.appendChild(button);
    });
  }

  function progressBlock(opened, total) {
    const wrap = el("div", "progress");
    const track = el("div", "progress-track");
    const fill = el("span", "progress-fill");
    fill.style.width = `${total ? Math.round((opened / total) * 100) : 0}%`;
    track.appendChild(fill);
    wrap.appendChild(track);
    wrap.appendChild(
      el("p", "progress-text", opened ? `${opened} of ${total} opened` : `${total} papers waiting`)
    );
    return wrap;
  }

  function renderBranches() {
    refs.branchGrid.replaceChildren();
    const fragment = document.createDocumentFragment();

    state.branches.forEach((branch) => {
      const card = el("button", "branch-card");
      card.type = "button";
      card.style.setProperty("--card-accent", branch.accent);

      const head = el("div", "card-head");
      head.appendChild(el("span", "code-badge", branch.code));
      head.appendChild(el("h4", "", branch.name));
      card.appendChild(head);

      card.appendChild(
        el("p", "meta", `${pluralize(branch.providers.length, "provider")} · ${pluralize(branch.testCount, "paper")}`)
      );
      card.appendChild(progressBlock(openedCount(branchTests(branch)), branch.testCount));

      card.addEventListener("click", () => navigate(hashFor(branch)));
      fragment.appendChild(card);
    });

    refs.branchGrid.appendChild(fragment);
  }

  function renderProviders(branch) {
    refs.providerGrid.replaceChildren();
    if (!branch) return;
    const fragment = document.createDocumentFragment();

    branch.providers.forEach((provider) => {
      const card = el("button", "provider-card");
      card.type = "button";
      card.style.setProperty("--card-accent", branch.accent);
      card.appendChild(el("h4", "", provider.name));
      card.appendChild(
        el("p", "meta", `${pluralize(provider.series.length, "batch", "batches")} · ${pluralize(provider.testCount, "paper")}`)
      );
      card.appendChild(progressBlock(openedCount(providerTests(provider)), provider.testCount));
      card.addEventListener("click", () => navigate(hashFor(branch, provider)));
      fragment.appendChild(card);
    });

    refs.providerGrid.appendChild(fragment);
  }

  function renderSeries(branch, provider) {
    refs.seriesGrid.replaceChildren();
    if (!provider) return;
    const fragment = document.createDocumentFragment();

    provider.series.forEach((series) => {
      const card = el("button", "series-card");
      card.type = "button";
      card.style.setProperty("--card-accent", branch.accent);
      card.appendChild(el("span", "year-chip", series.yearLabel));
      card.appendChild(el("h4", "", series.name));
      card.appendChild(el("p", "meta", pluralize(series.testCount, "paper")));
      card.appendChild(progressBlock(openedCount(series.tests), series.testCount));
      card.addEventListener("click", () => navigate(hashFor(branch, provider, series)));
      fragment.appendChild(card);
    });

    refs.seriesGrid.appendChild(fragment);
  }

  function scorePill(score) {
    const tone = score.pct >= 60 ? "score-good" : score.pct >= 35 ? "score-mid" : "score-low";
    const unit = score.basis === "marks" ? "marks" : "correct";
    const pill = el("span", `score-pill ${tone}`);
    pill.appendChild(document.createTextNode(`${Math.round(score.pct)}%`));
    pill.appendChild(el("span", "", `${score.value} / ${score.max} ${unit}`));
    pill.title = `Last attempt: ${score.value} out of ${score.max} ${unit}`;
    return pill;
  }

  function saveButton(paper) {
    const button = el("button", "save-btn");
    button.type = "button";
    const saved = state.saved.has(paper.key);
    button.classList.toggle("saved", saved);
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute("aria-label", saved ? "Remove from saved" : "Save this paper");
    button.title = saved ? "Remove from saved" : "Save for later";
    button.appendChild(icon(["M12 4l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L4.2 9.7l5.4-.8z"]));
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleSaved(paper.key);
      render();
    });
    return button;
  }

  function highlight(text, tokens) {
    const fragment = document.createDocumentFragment();
    if (!tokens.length) {
      fragment.appendChild(document.createTextNode(text));
      return fragment;
    }
    const pattern = new RegExp(
      `(${tokens.map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
      "gi"
    );
    let lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }
      fragment.appendChild(el("mark", "mark", match[0]));
      lastIndex = match.index + match[0].length;
      if (match[0].length === 0) pattern.lastIndex += 1;
    }
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    return fragment;
  }

  function testCard(paper, { showCrumb = false, tokens = [] } = {}) {
    const entry = entryFor(paper.key);
    const score = scoreOf(entry);

    const card = el("a", "test-card");
    card.href = paper.href;
    card.target = "_blank";
    card.rel = "noopener";
    card.style.setProperty("--card-accent", paper.branch.accent);

    const top = el("div", "test-top");
    if (paper.num) top.appendChild(el("span", "test-num", paper.num));
    top.appendChild(el("span", "tag", CATEGORY_LABELS[paper.category] ?? "Other"));
    if (paper.year) top.appendChild(el("span", "tag tag-year", paper.year));
    card.appendChild(top);

    const name = el("span", "test-name");
    name.appendChild(highlight(paper.title, tokens));
    card.appendChild(name);

    if (showCrumb) {
      card.appendChild(el("p", "test-crumb", `${paper.branch.code} · ${paper.providerName} · ${paper.seriesLabel}`));
    }

    const foot = el("div", "test-foot");
    const start = el("span", "start-pill");
    start.appendChild(document.createTextNode(score ? "Reattempt" : entry ? "Resume" : "Start test"));
    start.appendChild(icon(["M5 12h14", "M13 6l6 6-6 6"]));
    foot.appendChild(start);

    if (score) foot.appendChild(scorePill(score));
    else if (entry) foot.appendChild(el("span", "state-pill", `Opened ${relativeTime(entry.openedAt)}`));
    card.appendChild(foot);

    card.appendChild(saveButton(paper));
    card.addEventListener("click", () => recordOpen(paper));
    card.addEventListener("auxclick", () => recordOpen(paper));
    return card;
  }

  function emptyState(title, detail, actionLabel, onAction) {
    const box = el("div", "empty-state span-all");
    box.appendChild(el("strong", "", title));
    box.appendChild(el("span", "", detail));
    if (actionLabel) {
      const button = el("button", "ghost-btn ghost-btn-sm", actionLabel);
      button.type = "button";
      button.addEventListener("click", onAction);
      box.appendChild(button);
    }
    return box;
  }

  function sortPapers(list, mode) {
    const sorted = list.slice();
    if (mode === "az") return sorted.sort((a, b) => a.title.localeCompare(b.title));
    if (mode === "za") return sorted.sort((a, b) => b.title.localeCompare(a.title));
    if (mode === "score") {
      return sorted.sort((a, b) => {
        const sa = scoreOf(entryFor(a.key));
        const sb = scoreOf(entryFor(b.key));
        if (sa && sb) return sb.pct - sa.pct;
        if (sa) return -1;
        if (sb) return 1;
        return a.order - b.order;
      });
    }
    return sorted.sort((a, b) => a.order - b.order);
  }

  function renderTests(series) {
    refs.testsList.replaceChildren();
    refs.filterChips.replaceChildren();
    refs.yearChips.replaceChildren();
    if (!series) return;

    const seriesKey = `${series.branch.slug}/${series.provider.slug}/${series.slug}`;
    if (state.activeSeriesKey !== seriesKey) {
      state.activeSeriesKey = seriesKey;
      state.filter = "all";
      state.year = "all";
      state.seriesQuery = "";
      refs.filterInput.value = "";
    }

    const categories = new Set(["all"]);
    const years = new Set();
    series.tests.forEach((test) => {
      categories.add(test.category);
      if (test.year) years.add(test.year);
    });

    if (!categories.has(state.filter)) state.filter = "all";
    const yearList = Array.from(years).sort();
    if (state.year !== "all" && !years.has(state.year)) state.year = "all";

    CATEGORY_ORDER.filter((key) => categories.has(key)).forEach((key) => {
      const chip = el("button", "chip", CATEGORY_LABELS[key] ?? key);
      chip.type = "button";
      chip.classList.toggle("active", state.filter === key);
      chip.setAttribute("aria-pressed", String(state.filter === key));
      chip.addEventListener("click", () => {
        state.filter = key;
        render();
      });
      refs.filterChips.appendChild(chip);
    });

    if (yearList.length > 1) {
      ["all", ...yearList].forEach((key) => {
        const chip = el("button", "chip chip-sm", key === "all" ? "All years" : key);
        chip.type = "button";
        chip.classList.toggle("active", state.year === key);
        chip.setAttribute("aria-pressed", String(state.year === key));
        chip.addEventListener("click", () => {
          state.year = key;
          render();
        });
        refs.yearChips.appendChild(chip);
      });
    }

    const query = state.seriesQuery.trim().toLowerCase();
    const tokens = query ? query.split(/\s+/) : [];

    let visible = series.tests.filter((test) => {
      if (state.filter !== "all" && test.category !== state.filter) return false;
      if (state.year !== "all" && test.year !== state.year) return false;
      if (state.hideDone && state.activity[test.key]) return false;
      return tokens.every((token) => test.haystack.includes(token));
    });

    visible = sortPapers(visible, state.sort);

    const hiddenByDone = state.hideDone
      ? series.tests.length - series.tests.filter((test) => !state.activity[test.key]).length
      : 0;

    refs.resultCount.textContent =
      `Showing ${numberFormat.format(visible.length)} of ${pluralize(series.tests.length, "paper")}` +
      (hiddenByDone ? ` · ${hiddenByDone} hidden` : "");

    if (!visible.length) {
      refs.testsList.appendChild(
        emptyState(
          "No papers match",
          "Try a different keyword, clear the type filter, or turn the hide-opened toggle off.",
          "Reset filters",
          () => {
            state.filter = "all";
            state.year = "all";
            state.seriesQuery = "";
            state.hideDone = false;
            refs.filterInput.value = "";
            refs.hideDone.checked = false;
            render();
          }
        )
      );
      return;
    }

    const fragment = document.createDocumentFragment();
    visible.forEach((paper) => fragment.appendChild(testCard(paper, { tokens })));
    refs.testsList.appendChild(fragment);
  }

  /* Search */

  function searchPapers(query) {
    const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) return { tokens, results: [] };

    const results = [];
    state.papers.forEach((paper) => {
      if (!tokens.every((token) => paper.haystack.includes(token))) return;

      const title = paper.title.toLowerCase();
      let score = 0;
      tokens.forEach((token) => {
        const index = title.indexOf(token);
        if (index === 0) score += 60;
        else if (index > 0) score += 30 - Math.min(index, 20);
        if (new RegExp(`\\b${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(title)) score += 15;
      });
      score -= Math.min(paper.title.length / 12, 8);
      if (entryFor(paper.key)) score += 5;
      results.push({ paper, score });
    });

    results.sort((a, b) => b.score - a.score || a.paper.title.localeCompare(b.paper.title));
    return { tokens, results: results.map((item) => item.paper) };
  }

  function renderSearch(query) {
    refs.searchResults.replaceChildren();
    const { tokens, results } = searchPapers(query);

    refs.searchHeading.textContent = `Results for "${query}"`;
    refs.searchCount.textContent = results.length
      ? `${pluralize(results.length, "paper")} across the whole library`
      : "";

    if (!results.length) {
      refs.searchMore.hidden = true;
      refs.searchResults.appendChild(
        emptyState(
          "Nothing found",
          `No paper matches "${query}". Try a subject name (fluid mechanics), a paper type (topicwise), a code (EE), or a year (2026).`,
          "Clear search",
          () => {
            refs.search.value = "";
            navigate("#/", true);
          }
        )
      );
      return;
    }

    const shown = results.slice(0, state.searchLimit);
    const fragment = document.createDocumentFragment();
    shown.forEach((paper) => fragment.appendChild(testCard(paper, { showCrumb: true, tokens })));
    refs.searchResults.appendChild(fragment);

    const remaining = results.length - shown.length;
    refs.searchMore.hidden = remaining <= 0;
    if (remaining > 0) {
      refs.searchMore.textContent = `Show ${numberFormat.format(Math.min(remaining, PAGE))} more of ${numberFormat.format(remaining)}`;
    }
  }

  /* Activity */

  function activityEntries() {
    return Object.entries(state.activity)
      .map(([key, entry]) => ({ key, entry, paper: state.byKey.get(key) || null }))
      .filter((item) => item.paper)
      .sort((a, b) => (b.entry.submittedAt || b.entry.openedAt || 0) - (a.entry.submittedAt || a.entry.openedAt || 0));
  }

  function miniCard(paper, entry) {
    const card = el("a", "mini-card");
    card.href = paper.href;
    card.target = "_blank";
    card.rel = "noopener";
    card.style.setProperty("--card-accent", paper.branch.accent);
    card.appendChild(el("span", "mini-name", paper.title));

    const meta = el("div", "mini-meta");
    meta.appendChild(el("span", "", `${paper.branch.code} · ${paper.providerName}`));
    const score = scoreOf(entry);
    if (score) {
      meta.appendChild(scorePill(score));
      meta.appendChild(el("span", "", relativeTime(entry.submittedAt)));
    } else if (entry && entry.openedAt) {
      meta.appendChild(el("span", "", `Opened ${relativeTime(entry.openedAt)}`));
    }
    card.appendChild(meta);
    card.addEventListener("click", () => recordOpen(paper));
    return card;
  }

  function renderActivity() {
    const entries = activityEntries();
    const scored = entries.filter((item) => scoreOf(item.entry));
    const savedItems = Array.from(state.saved)
      .map((key) => ({ key, paper: state.byKey.get(key) || null, entry: state.activity[key] || null }))
      .filter((item) => item.paper);

    refs.openedCount.textContent = numberFormat.format(entries.length);

    const hasSomething = entries.length > 0 || savedItems.length > 0;
    refs.activityCard.hidden = !hasSomething;
    refs.ctaResume.hidden = entries.length === 0;
    if (entries.length) {
      refs.ctaResume.dataset.href = entries[0].paper.href;
      refs.ctaResume.textContent = `Resume: ${entries[0].paper.title.slice(0, 42)}${entries[0].paper.title.length > 42 ? "…" : ""}`;
    }
    if (!hasSomething) return;

    refs.kpiRow.replaceChildren();
    const avg = scored.length
      ? scored.reduce((sum, item) => sum + scoreOf(item.entry).pct, 0) / scored.length
      : null;
    const best = scored.reduce(
      (top, item) => (!top || scoreOf(item.entry).pct > scoreOf(top.entry).pct ? item : top),
      null
    );

    const latest = entries[0];
    const lastAt = latest ? latest.entry.submittedAt || latest.entry.openedAt : 0;

    [
      ["Papers opened", numberFormat.format(entries.length)],
      ["Papers scored", numberFormat.format(scored.length)],
      ["Average score", avg == null ? "—" : `${Math.round(avg)}%`],
      ["Best score", best ? `${Math.round(scoreOf(best.entry).pct)}%` : "—"],
      ["Last activity", relativeTime(lastAt) || "—"]
    ].forEach(([label, value]) => {
      const kpi = el("div", "kpi");
      kpi.appendChild(el("span", "kpi-val", value));
      kpi.appendChild(el("span", "kpi-lbl", label));
      refs.kpiRow.appendChild(kpi);
    });

    const counts = { continue: entries.length, saved: savedItems.length, scores: scored.length };
    refs.tabs.forEach((tab) => {
      const key = tab.dataset.tab;
      tab.setAttribute("aria-selected", String(state.activityTab === key));
      const badge = tab.querySelector(".tab-count");
      if (badge) badge.textContent = numberFormat.format(counts[key] || 0);
    });

    const source =
      state.activityTab === "saved" ? savedItems : state.activityTab === "scores" ? scored : entries;

    refs.activityList.replaceChildren();
    if (!source.length) {
      const messages = {
        saved: ["Nothing saved yet", "Tap the star on any paper to keep it here for later."],
        scores: ["No scores yet", "Submit a paper and your marks will appear here automatically."],
        continue: ["No activity yet", "Open any paper and it will show up here."]
      };
      const [title, detail] = messages[state.activityTab] || messages.continue;
      refs.activityList.appendChild(emptyState(title, detail));
      return;
    }

    const fragment = document.createDocumentFragment();
    source.slice(0, 8).forEach((item) => fragment.appendChild(miniCard(item.paper, item.entry)));
    refs.activityList.appendChild(fragment);
  }

  /* Main render */

  function render() {
    const { branch, provider, series } = resolveRoute();
    const isSearch = state.route.view === "search" && state.route.q.trim().length > 0;

    if (isSearch && !state.wasSearching && refs.browser.getBoundingClientRect().top > 40) {
      refs.browser.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    state.wasSearching = isSearch;

    refs.skeleton.hidden = true;
    refs.searchClear.hidden = !refs.search.value;

    show(refs.searchSection, isSearch);
    show(refs.branchSection, !isSearch && !branch);
    show(refs.providerSection, !isSearch && !!branch && !provider);
    show(refs.seriesSection, !isSearch && !!provider && !series);
    show(refs.testsSection, !isSearch && !!series);

    renderActivity();

    if (isSearch) {
      refs.crumbs.replaceChildren();
      refs.stepText.textContent = "Library search";
      refs.selectorTitle.textContent = "Search every paper";
      refs.resetBtn.hidden = false;
      setStatus("Searching across all branches, providers and batches. Press Escape to go back to browsing.");
      document.title = `${state.route.q} - BIJZLI Test Series`;
      renderSearch(state.route.q);
      return;
    }

    renderCrumbs(branch, provider, series);
    refs.resetBtn.hidden = !branch;

    if (!branch) {
      refs.stepText.textContent = "Step 1 of 4";
      refs.selectorTitle.textContent = "Select your branch";
      setStatus(`Choose your engineering branch. ${pluralize(state.papers.length, "paper")} are available right now.`);
      document.title = "BIJZLI Test Series";
      renderBranches();
      return;
    }

    if (!provider) {
      refs.stepText.textContent = "Step 2 of 4";
      refs.selectorTitle.textContent = "Select a provider";
      setStatus(`${branch.name} · choose which test series provider you want.`);
      document.title = `${branch.name} - BIJZLI Test Series`;
      renderProviders(branch);
      return;
    }

    if (!series) {
      refs.stepText.textContent = "Step 3 of 4";
      refs.selectorTitle.textContent = "Select a batch";
      setStatus(`${branch.name} · ${provider.name} · choose a batch or year.`);
      document.title = `${provider.name} - ${branch.name} - BIJZLI Test Series`;
      renderSeries(branch, provider);
      return;
    }

    refs.stepText.textContent = "Step 4 of 4";
    refs.selectorTitle.textContent = "Pick a paper";
    setStatus(`${branch.name} · ${provider.name} · ${series.name}. Papers open in a new tab.`);
    document.title = `${series.name} - BIJZLI Test Series`;
    renderTests(series);
  }

  function stepBack() {
    if (state.route.view === "search") {
      refs.search.value = "";
      navigate("#/", true);
      return;
    }
    const { branch, provider, series } = resolveRoute();
    if (series) navigate(hashFor(branch, provider));
    else if (provider) navigate(hashFor(branch));
    else navigate("#/");
  }

  /* Theme */

  function applyTheme(name) {
    const theme = THEMES.has(name) ? name : "dark";
    state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    refs.themeButtons.forEach((button) => {
      const active = button.dataset.theme === theme;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "bright" ? "#eef4ff" : theme === "green" ? "#071611" : "#06111d");
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (_error) {
      /* ignore */
    }
  }

  /* Events */

  let searchTimer = 0;

  function bindEvents() {
    refs.themeButtons.forEach((button) => {
      button.addEventListener("click", () => applyTheme(button.dataset.theme));
    });

    refs.resetBtn.addEventListener("click", stepBack);

    refs.search.addEventListener("input", () => {
      const value = refs.search.value;
      refs.searchClear.hidden = !value;
      window.clearTimeout(searchTimer);
      searchTimer = window.setTimeout(() => {
        state.searchLimit = PAGE;
        navigate(value.trim() ? `#/q/${encodeURIComponent(value.trim())}` : "#/", true);
      }, 130);
    });

    refs.search.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        refs.search.value = "";
        refs.searchClear.hidden = true;
        navigate("#/", true);
        refs.search.blur();
        return;
      }
      if (event.key === "ArrowDown") {
        const first = refs.searchResults.querySelector(".test-card");
        if (first) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    refs.searchResults.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      const cards = Array.from(refs.searchResults.querySelectorAll(".test-card"));
      const index = cards.indexOf(document.activeElement);
      if (index === -1) return;
      event.preventDefault();
      if (event.key === "ArrowUp" && index === 0) {
        refs.search.focus();
        return;
      }
      const next = cards[index + (event.key === "ArrowDown" ? 1 : -1)];
      if (next) next.focus();
    });

    refs.searchClear.addEventListener("click", () => {
      refs.search.value = "";
      refs.searchClear.hidden = true;
      navigate("#/", true);
      refs.search.focus();
    });

    refs.searchMore.addEventListener("click", () => {
      state.searchLimit += PAGE;
      render();
    });

    document.addEventListener("keydown", (event) => {
      const typingInField =
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLSelectElement ||
        document.activeElement instanceof HTMLTextAreaElement;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        refs.search.focus();
        refs.search.select();
        return;
      }
      if (event.key === "/" && !typingInField && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        refs.search.focus();
      }
    });

    refs.filterInput.addEventListener("input", () => {
      state.seriesQuery = refs.filterInput.value;
      render();
    });

    refs.sortSelect.addEventListener("change", () => {
      state.sort = refs.sortSelect.value;
      render();
    });

    refs.hideDone.addEventListener("change", () => {
      state.hideDone = refs.hideDone.checked;
      render();
    });

    refs.tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        state.activityTab = tab.dataset.tab;
        renderActivity();
      });
    });

    refs.clearActivity.addEventListener("click", () => {
      const confirmed = window.confirm(
        "Clear your opened papers, scores and saved list from this browser? This cannot be undone."
      );
      if (!confirmed) return;
      state.activity = {};
      state.saved = new Set();
      writeStore(ACTIVITY_KEY, {});
      writeStore(SAVED_KEY, []);
      render();
    });

    refs.ctaBrowse.addEventListener("click", () => {
      navigate("#/");
      refs.browser.scrollIntoView({ block: "start" });
      refs.browser.focus({ preventScroll: true });
    });

    refs.ctaResume.addEventListener("click", () => {
      const href = refs.ctaResume.dataset.href;
      if (href) window.open(href, "_blank", "noopener");
    });

    window.addEventListener("hashchange", () => {
      state.searchLimit = PAGE;
      applyRoute();
      if (refs.browser.getBoundingClientRect().top < 0) {
        refs.browser.scrollIntoView({ block: "start" });
      }
    });

    window.addEventListener("storage", (event) => {
      if (event.key !== ACTIVITY_KEY && event.key !== SAVED_KEY) return;
      loadLocalState();
      if (state.manifest) render();
    });

    window.addEventListener("focus", () => {
      loadLocalState();
      if (state.manifest) render();
    });

    const onScroll = () => refs.topbar.classList.toggle("stuck", window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Boot */

  function updateHeaderCounts() {
    refs.branchCount.textContent = numberFormat.format(state.branches.length);
    refs.testCount.textContent = numberFormat.format(state.papers.length);

    const providers = new Set();
    state.branches.forEach((branch) =>
      branch.providers.forEach((provider) => providers.add(provider.name))
    );
    refs.providerCount.textContent = numberFormat.format(providers.size);
    refs.search.placeholder = `Search ${numberFormat.format(state.papers.length)} papers - subject, test number, year`;
  }

  function showLoadError(error) {
    refs.skeleton.hidden = true;
    setStatus(
      "Could not load the test library. If you opened index.html directly from a folder, serve it over http (Netlify or a local server) and reload.",
      true
    );
    show(refs.branchSection, true);
    refs.branchGrid.replaceChildren(
      emptyState(
        "Library unavailable",
        "The paper index (data/series-manifest.json) could not be fetched.",
        "Try again",
        () => window.location.reload()
      )
    );
    console.error(error);
  }

  function localizeShortcutHint() {
    if (!/Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent)) return;
    const modifier = document.querySelector(".kbd-mod");
    if (modifier) modifier.textContent = "⌘";
  }

  async function initialize() {
    applyTheme(state.theme);
    localizeShortcutHint();
    loadLocalState();
    bindEvents();

    try {
      const response = await fetch("data/series-manifest.json", { cache: "no-cache" });
      if (!response.ok) throw new Error(`Manifest fetch failed with status ${response.status}`);
      const manifest = await response.json();
      if (!manifest || !Array.isArray(manifest.branches)) throw new Error("Manifest format is invalid.");

      state.manifest = manifest;
      buildIndex(manifest);
      updateHeaderCounts();
      applyRoute();
    } catch (error) {
      showLoadError(error);
    }
  }

  initialize();
})();
