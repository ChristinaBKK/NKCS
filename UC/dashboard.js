// ============================================
//  国际化 (i18n) - 中英双语
// ============================================
const I18N = {
  zh: {
    pageTitle: "国际学校案例分析 | Case Studies",
    brandName: "国际学校案例研究",
    brandTagline: "International School Case Studies",
    viewAs: "视角",
    rolePrincipal: "校长",
    roleCounselor: "升学指导",
    roleCurriculum: "课程研发",
    actionRefresh: "刷新",
    filterTitle: "筛选",
    filterSchool: "学校",
    filterCurriculum: "课程",
    filterCountry: "录取国家",
    filterAdmit: "录取学校",
    filterTime: "时间",
    timeAll: "全部",
    time2026: "2026",
    time2025: "2025",
    time2024: "2024",
    time2023: "2023",
    actionSaveFilter: "💾 保存我的筛选",
    actionClear: "清除",
    heroTitle: "优秀学生案例",
    heroDesc: "升学 + 学术 双视角 · 数据驱动的对标研究",
    statTotalCases: "案例总数",
    statTotalCasesDesc: "全部已抽取",
    statSchools: "覆盖学校",
    statSchoolsDesc: "所含公众号",
    statCountries: "录取国家",
    statCountriesDesc: "覆盖国家/地区",
    statOxbridge: "牛剑录取",
    statOxbridgeDesc: "牛津 + 剑桥",
    chartCountries: "录取国家分布",
    chartCurriculum: "课程体系分布",
    chartAdmit: "录取学校 Top 10",
    casesTitle: "学生案例",
    casesCount: "共 {n} 条",
    noData: "暂无数据",
    noDataHint: "试试调整筛选条件",
    loading: "加载中...",
    purpose: "类型",
    grade: "届",
    admitTo: "录取",
    major: "专业",
    keyTakeaways: "关键经验",
    activities: "活动 / 竞赛",
    sourceArticle: "原文",
    close: "关闭",
    savedFilters: "已保存的筛选",
    noSavedFilters: "暂无保存的筛选",
    selectAll: "全选",
    clearAll: "清空",
    language: "中文",
  },
  en: {
    pageTitle: "Case Studies Dashboard",
    brandName: "School Case Studies",
    brandTagline: "International School Case Studies",
    viewAs: "View as",
    rolePrincipal: "Principal",
    roleCounselor: "Counselor",
    roleCurriculum: "Curriculum",
    actionRefresh: "Refresh",
    filterTitle: "Filters",
    filterSchool: "School",
    filterCurriculum: "Curriculum",
    filterCountry: "Country",
    filterAdmit: "Admit School",
    filterTime: "Time",
    timeAll: "All",
    time2026: "2026",
    time2025: "2025",
    time2024: "2024",
    time2023: "2023",
    actionSaveFilter: "💾 Save my filter",
    actionClear: "Clear",
    heroTitle: "Outstanding Student Cases",
    heroDesc: "Admission + Curriculum · Data-driven benchmarking",
    statTotalCases: "Total Cases",
    statTotalCasesDesc: "All extracted",
    statSchools: "Schools",
    statSchoolsDesc: "Accounts covered",
    statCountries: "Countries",
    statCountriesDesc: "Countries / regions",
    statOxbridge: "Oxbridge",
    statOxbridgeDesc: "Oxford + Cambridge",
    chartCountries: "Admit Countries",
    chartCurriculum: "Curriculum Distribution",
    chartAdmit: "Top 10 Admit Schools",
    casesTitle: "Student Cases",
    casesCount: "{n} total",
    noData: "No data",
    noDataHint: "Try adjusting filters",
    loading: "Loading...",
    purpose: "Type",
    grade: "Class",
    admitTo: "Admitted to",
    major: "Major",
    keyTakeaways: "Key Takeaways",
    activities: "Activities",
    sourceArticle: "Source article",
    close: "Close",
    savedFilters: "Saved filters",
    noSavedFilters: "No saved filters",
    selectAll: "Select all",
    clearAll: "Clear",
    language: "English",
  },
};

let currentLang = localStorage.getItem("lang") || "zh";
let currentRole = localStorage.getItem("role") || "principal";

function t(key) {
  return I18N[currentLang][key] || I18N.zh[key] || key;
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });
  // placeholder 也需要翻译
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  // 标题
  document.title = t("pageTitle");
  // HTML lang
  document.documentElement.lang = currentLang;
  document.documentElement.dataset.lang = currentLang;
  // 语言按钮高亮
  document.querySelector(".lang-zh").classList.toggle("text-primary-700", currentLang === "zh");
  document.querySelector(".lang-zh").classList.toggle("font-semibold", currentLang === "zh");
  document.querySelector(".lang-zh").classList.toggle("text-slate-500", currentLang !== "zh");
  document.querySelector(".lang-en").classList.toggle("text-primary-700", currentLang === "en");
  document.querySelector(".lang-en").classList.toggle("font-semibold", currentLang === "en");
  document.querySelector(".lang-en").classList.toggle("text-slate-500", currentLang !== "en");
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  applyI18n();
  renderAll();
}

// ============================================
//  Supabase 客户端
// ============================================
const SUPABASE_URL = "https://lrkmyzgmqcdllctbhxdd.supabase.co";
// 使用 anon key（公开，配合 RLS 仅可读，安全）
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxya215emdtcWNkbGxjdGJoeGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MjU5MDksImV4cCI6MjAwOTM0OTkwOX0.qg9_BRb9h4LA1yuAjyfDu7Ay8aDjAcWM3mPvw3K0lEA";
// 避免与 window.supabase 全局变量冲突（supabase-js UMD 已经在 window.supabase 上挂载）
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ============================================
//  全局状态
// ============================================
let ALL_CASES = [];      // 全部案例
let FILTERED = [];       // 筛选后
let CHARTS = {};         // chart instances

const FILTER_STATE = {
  school: new Set(),
  curriculum: new Set(),
  country: new Set(),
  admit: new Set(),
  time: "all",
};

// ============================================
//  加载数据
// ============================================
async function loadData() {
  document.getElementById("loading").classList.remove("hidden");
  try {
    // v_recent_cases 视图已经 join 了 articles 和 accounts
    const { data, error } = await sb
      .from("v_recent_cases")
      .select("*")
      .order("published_at", { ascending: false });
    if (error) throw error;

    // 兜底：如果视图为空或权限问题，从 student_cases 取
    if (!data || data.length === 0) {
      const { data: cases } = await sb
        .from("student_cases")
        .select("*, articles!inner(title, published_at, account_id, accounts(name, region))")
        .order("created_at", { ascending: false });
      ALL_CASES = (cases || []).map(normalizeCase).filter(Boolean);
    } else {
      ALL_CASES = data.map(normalizeCase).filter(Boolean);
    }

    document.getElementById("lastUpdate").textContent =
      `${t("lastUpdate") || "更新"}: ${new Date().toLocaleTimeString(currentLang === "zh" ? "zh-CN" : "en-US", { hour: "2-digit", minute: "2-digit" })}`;
  } catch (e) {
    console.error("Load error:", e);
    ALL_CASES = [];
  } finally {
    document.getElementById("loading").classList.add("hidden");
  }
}

function normalizeCase(row) {
  // 兼容 view 和 join
  return {
    id: row.id || row.case_id,
    student_alias: row.student_alias,
    school: row.school,
    curriculum: row.curriculum,
    grade: row.grade,
    admit_country: row.admit_country || [],
    admit_schools: row.admit_schools || [],
    admit_majors: row.admit_majors || [],
    gpa: row.gpa,
    test_scores: row.test_scores || {},
    activities: row.activities || [],
    key_takeaways: row.key_takeaways || [],
    article_purpose: row.article_purpose,
    is_arts: row.is_arts || false,
    confidence_score: row.confidence_score,
    needs_human_review: row.needs_human_review,
    article_title: row.article_title || row.title,
    article_url: row.article_url || row.url,
    account_name: row.account_name,
    published_at: row.published_at,
  };
}

// ============================================
//  筛选
// ============================================
function applyFilter() {
  FILTERED = ALL_CASES.filter((c) => {
    if (FILTER_STATE.school.size > 0) {
      // school 字段可能为空，回退到 account_name
      const sch = c.school || c.account_name || "";
      if (!FILTER_STATE.school.has(sch)) return false;
    }
    if (FILTER_STATE.curriculum.size > 0) {
      if (!FILTER_STATE.curriculum.has(c.curriculum)) return false;
    }
    if (FILTER_STATE.country.size > 0) {
      const hasCountry = (c.admit_country || []).some((co) => FILTER_STATE.country.has(co));
      if (!hasCountry) return false;
    }
    if (FILTER_STATE.admit.size > 0) {
      const hasAdmit = (c.admit_schools || []).some((s) => FILTER_STATE.admit.has(s));
      if (!hasAdmit) return false;
    }
    if (FILTER_STATE.time !== "all" && c.published_at) {
      const year = new Date(c.published_at).getFullYear().toString();
      if (year !== FILTER_STATE.time) return false;
    }
    return true;
  });
  renderAll();
}

function getUniqueValues(field) {
  const set = new Set();
  ALL_CASES.forEach((c) => {
    const v = c[field];
    if (Array.isArray(v)) v.forEach((x) => x && set.add(x));
    else if (v) set.add(v);
  });
  return Array.from(set).sort();
}

// ============================================
//  渲染：筛选面板
// ============================================
function renderFilters() {
  // 学校
  const schools = getUniqueValues("school").length ? getUniqueValues("school") : getUniqueValues("account_name");
  renderFilterList("filterSchool", schools, FILTER_STATE.school, "school");

  // 课程
  const currs = getUniqueValues("curriculum").filter(Boolean);
  renderFilterChips("filterCurriculum", currs, FILTER_STATE.curriculum);

  // 录取国家
  renderFilterList("filterCountry", getUniqueValues("admit_country"), FILTER_STATE.country, "country");

  // 录取学校（带搜索）
  const admits = getUniqueValues("admit_schools");
  renderFilterList("filterAdmit", admits, FILTER_STATE.admit, "admit", "filterAdmitSearch");
}

function renderFilterList(elId, items, selectedSet, filterKey, searchId) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = "";
  if (items.length === 0) {
    el.innerHTML = `<div class="text-xs text-slate-400 px-2 py-1">—</div>`;
    return;
  }
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "filter-item" + (selectedSet.has(item) ? " active" : "");
    div.dataset.value = item;
    div.dataset.filter = filterKey;
    div.innerHTML = `
      <input type="checkbox" ${selectedSet.has(item) ? "checked" : ""}>
      <span class="truncate">${escapeHTML(item)}</span>
    `;
    div.addEventListener("click", () => toggleFilter(filterKey, item));
    el.appendChild(div);
  });
}

function renderFilterChips(elId, items, selectedSet) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = "";
  items.forEach((item) => {
    const div = document.createElement("div");
    div.className = "chip" + (selectedSet.has(item) ? " active" : "");
    div.textContent = item;
    div.addEventListener("click", () => toggleFilter("curriculum", item));
    el.appendChild(div);
  });
}

function toggleFilter(key, value) {
  if (FILTER_STATE[key].has(value)) FILTER_STATE[key].delete(value);
  else FILTER_STATE[key].add(value);
  applyFilter();
  renderFilters();  // 重渲染以更新 active 状态
}

function clearFilter() {
  FILTER_STATE.school.clear();
  FILTER_STATE.curriculum.clear();
  FILTER_STATE.country.clear();
  FILTER_STATE.admit.clear();
  FILTER_STATE.time = "all";
  document.getElementById("filterTime").value = "all";
  applyFilter();
  renderFilters();
}

// 录取学校搜索
document.getElementById("filterAdmitSearch")?.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  const el = document.getElementById("filterAdmit");
  el.querySelectorAll(".filter-item").forEach((item) => {
    const v = item.dataset.value.toLowerCase();
    item.style.display = v.includes(q) ? "" : "none";
  });
});

// 时间筛选
document.getElementById("filterTime")?.addEventListener("change", (e) => {
  FILTER_STATE.time = e.target.value;
  applyFilter();
});

// ============================================
//  渲染：统计卡片
// ============================================
function renderStats() {
  const total = FILTERED.length;
  const schools = new Set(FILTERED.map((c) => c.school || c.account_name).filter(Boolean));
  const countries = new Set();
  FILTERED.forEach((c) => (c.admit_country || []).forEach((co) => countries.add(co)));
  const oxbridge = FILTERED.filter((c) => {
    const s = (c.admit_schools || []).join(" ");
    return /剑桥|Cambridge|牛津|Oxford/i.test(s);
  }).length;

  document.querySelector('[data-stat="total"]').textContent = total;
  document.querySelector('[data-stat="schools"]').textContent = schools.size;
  document.querySelector('[data-stat="countries"]').textContent = countries.size;
  document.querySelector('[data-stat="oxbridge"]').textContent = oxbridge;
}

// ============================================
//  渲染：图表
// ============================================
function renderCharts() {
  // 国家分布
  const countryCount = {};
  FILTERED.forEach((c) => (c.admit_country || []).forEach((co) => {
    countryCount[co] = (countryCount[co] || 0) + 1;
  }));
  renderPieChart("chartCountries", countryCount, ["#1d4ed8", "#f59e0b", "#0ea5e9", "#10b981", "#8b5cf6", "#ec4899", "#f43f5e", "#06b6d4"]);

  // 课程分布
  const currCount = {};
  FILTERED.forEach((c) => {
    const k = c.curriculum || "Other";
    currCount[k] = (currCount[k] || 0) + 1;
  });
  renderBarChart("chartCurriculum", currCount, ["#1d4ed8", "#f59e0b", "#10b981", "#8b5cf6", "#ec4899"]);

  // 录取学校 Top 10
  const admitCount = {};
  FILTERED.forEach((c) => (c.admit_schools || []).forEach((s) => {
    admitCount[s] = (admitCount[s] || 0) + 1;
  }));
  const top10 = Object.entries(admitCount).sort((a, b) => b[1] - a[1]).slice(0, 10);
  renderHorizontalBarChart("chartAdmit", Object.fromEntries(top10), "#1d4ed8");
}

function renderPieChart(canvasId, dataObj, colors) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  if (CHARTS[canvasId]) CHARTS[canvasId].destroy();

  const labels = Object.keys(dataObj);
  const values = Object.values(dataObj);

  CHARTS[canvasId] = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: "#fff",
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
          labels: {
            font: { size: 11, family: "Inter" },
            padding: 10,
            boxWidth: 12,
          },
        },
      },
      cutout: "60%",
    },
  });
}

function renderBarChart(canvasId, dataObj, colors) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  if (CHARTS[canvasId]) CHARTS[canvasId].destroy();

  const labels = Object.keys(dataObj);
  const values = Object.values(dataObj);

  CHARTS[canvasId] = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: colors.slice(0, labels.length),
        borderRadius: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0, font: { size: 11 } } },
        x: { ticks: { font: { size: 11 } } },
      },
    },
  });
}

function renderHorizontalBarChart(canvasId, dataObj, color) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;
  if (CHARTS[canvasId]) CHARTS[canvasId].destroy();

  const entries = Object.entries(dataObj);
  const labels = entries.map(([k]) => k);
  const values = entries.map(([, v]) => v);

  CHARTS[canvasId] = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: color,
        borderRadius: 4,
      }],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { beginAtZero: true, ticks: { precision: 0, font: { size: 11 } } },
        y: { ticks: { font: { size: 11 } } },
      },
    },
  });
}

// ============================================
//  渲染：案例卡片
// ============================================
function renderCases() {
  const grid = document.getElementById("casesGrid");
  const countEl = document.getElementById("casesCount");
  countEl.textContent = t("casesCount").replace("{n}", FILTERED.length);

  if (FILTERED.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full bg-white rounded-xl border border-slate-200 p-12 text-center">
        <div class="text-4xl mb-3">📭</div>
        <p class="text-slate-700 font-medium">${t("noData")}</p>
        <p class="text-xs text-slate-500 mt-1">${t("noDataHint")}</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = FILTERED.map((c) => caseCardHTML(c)).join("");
  grid.querySelectorAll(".case-card").forEach((el) => {
    el.addEventListener("click", () => openModal(el.dataset.id));
  });
}

function caseCardHTML(c) {
  const country = (c.admit_country || [])[0] || "";
  const countryFlag = flagOf(country);
  const admit = (c.admit_schools || [])[0] || "—";
  const major = (c.admit_majors || [])[0] || "";
  const takeaways = (c.key_takeaways || []).slice(0, 2);
  const conf = Math.round((c.confidence_score || 0) * 100);
  const confColor = conf >= 80 ? "text-emerald-600" : conf >= 60 ? "text-amber-600" : "text-slate-500";

  return `
    <div class="case-card" data-id="${c.id}">
      <div class="case-name">${escapeHTML(c.student_alias || "—")}</div>
      <div class="case-school">${escapeHTML(c.school || c.account_name || "—")}</div>
      <div>
        ${c.curriculum ? `<span class="case-tag case-tag-curriculum">${escapeHTML(c.curriculum)}</span>` : ""}
        ${c.article_purpose ? `<span class="case-tag case-tag-purpose">${escapeHTML(c.article_purpose)}</span>` : ""}
        ${c.grade ? `<span class="case-tag">${escapeHTML(c.grade)}</span>` : ""}
      </div>
      <div class="case-admit">
        <div class="case-admit-school">${countryFlag} ${escapeHTML(admit)}</div>
        ${major ? `<div class="case-admit-country">${escapeHTML(major)} · ${escapeHTML(country)}</div>` : `<div class="case-admit-country">${escapeHTML(country)}</div>`}
      </div>
      ${takeaways.length ? `
        <div class="case-takeaway">
          ${takeaways.map(t => `<div class="case-takeaway-item">${escapeHTML(t)}</div>`).join("")}
        </div>
      ` : ""}
      <div class="case-footer">
        <span>${escapeHTML(c.article_title || "").slice(0, 30)}${(c.article_title || "").length > 30 ? "..." : ""}</span>
        <span class="case-confidence">
          <span class="${confColor} font-medium">${conf}%</span>
          <span class="case-confidence-bar"><span class="case-confidence-fill" style="width:${conf}%"></span></span>
        </span>
      </div>
    </div>
  `;
}

function flagOf(country) {
  const map = {
    "美国": "🇺🇸", "英国": "🇬🇧", "中国香港": "🇭🇰", "中国": "🇨🇳",
    "澳大利亚": "🇦🇺", "加拿大": "🇨🇦", "新加坡": "🇸🇬", "日本": "🇯🇵",
    "USA": "🇺🇸", "UK": "🇬🇧", "Hong Kong": "🇭🇰", "China": "🇨🇳",
    "Australia": "🇦🇺", "Canada": "🇨🇦", "Singapore": "🇸🇬", "Japan": "🇯🇵",
  };
  return map[country] || "🎓";
}

// ============================================
//  详情弹窗
// ============================================
function openModal(id) {
  const c = ALL_CASES.find((x) => x.id === id);
  if (!c) return;

  document.getElementById("modalName").textContent = c.student_alias || "—";
  document.getElementById("modalSchool").textContent =
    [c.school || c.account_name, c.curriculum, c.grade].filter(Boolean).join(" · ");

  const conf = Math.round((c.confidence_score || 0) * 100);
  const ts = c.test_scores || {};
  const testScoresHTML = Object.keys(ts).length
    ? Object.entries(ts).map(([k, v]) => `<div class="modal-key-value"><span class="modal-key">${escapeHTML(k)}</span><span class="modal-value">${escapeHTML(String(v))}</span></div>`).join("")
    : "—";

  const actsHTML = (c.activities || []).length
    ? c.activities.map(a => `<div class="modal-takeaway-item">${escapeHTML(a)}</div>`).join("")
    : "—";

  const takesHTML = (c.key_takeaways || []).length
    ? c.key_takeaways.map(t => `<div class="modal-takeaway-item">${escapeHTML(t)}</div>`).join("")
    : "—";

  document.getElementById("modalContent").innerHTML = `
    <div class="modal-section">
      <div class="modal-section-title">${t("admitTo")}</div>
      <div class="case-admit" style="margin-top:0">
        <div class="case-admit-school">${flagOf((c.admit_country || [])[0] || "")} ${escapeHTML((c.admit_schools || []).join("、") || "—")}</div>
        <div class="case-admit-country">${escapeHTML((c.admit_majors || []).join("、"))} · ${escapeHTML((c.admit_country || []).join("、"))}</div>
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">${t("statTotalCases")} · ${t("purpose")} · ${t("grade")}</div>
      <div class="modal-key-value">
        <span class="modal-key">${t("statTotalCases")}</span><span class="modal-value">${t("curriculum") ? "" : ""}${escapeHTML(c.curriculum || "—")}</span>
        <span class="modal-key">${t("purpose")}</span><span class="modal-value">${escapeHTML(c.article_purpose || "—")}</span>
        <span class="modal-key">${t("grade")}</span><span class="modal-value">${escapeHTML(c.grade || "—")}</span>
        <span class="modal-key">GPA</span><span class="modal-value">${escapeHTML(c.gpa || "—")}</span>
        <span class="modal-key">AI ${t("confidence") || "置信度"}</span><span class="modal-value">${conf}%</span>
      </div>
    </div>

    ${Object.keys(ts).length ? `
    <div class="modal-section">
      <div class="modal-section-title">Test Scores / 标化</div>
      ${testScoresHTML}
    </div>
    ` : ""}

    ${(c.activities || []).length ? `
    <div class="modal-section">
      <div class="modal-section-title">${t("activities")}</div>
      ${actsHTML}
    </div>
    ` : ""}

    ${(c.key_takeaways || []).length ? `
    <div class="modal-section">
      <div class="modal-section-title">${t("keyTakeaways")}</div>
      ${takesHTML}
    </div>
    ` : ""}

    <div class="modal-section">
      <a href="${escapeHTML(c.article_url || "#")}" target="_blank" class="modal-source-link">
        🔗 ${t("sourceArticle")}: ${escapeHTML((c.article_title || "").slice(0, 60))}
      </a>
    </div>
  `;

  document.getElementById("caseModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("caseModal").classList.add("hidden");
}

// ============================================
//  保存筛选（localStorage）
// ============================================
function getSavedFilters() {
  try { return JSON.parse(localStorage.getItem("savedFilters") || "[]"); } catch { return []; }
}

function renderSavedFilters() {
  const list = getSavedFilters();
  const el = document.getElementById("savedFiltersList");
  el.innerHTML = "";
  if (list.length === 0) {
    el.innerHTML = `<div class="text-xs text-slate-400 px-2 py-1">${t("noSavedFilters")}</div>`;
    return;
  }
  list.forEach((f, i) => {
    const div = document.createElement("div");
    div.className = "saved-filter";
    div.innerHTML = `
      <span class="truncate">${escapeHTML(f.name)}</span>
      <span class="delete" data-idx="${i}">×</span>
    `;
    div.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete")) return;
      applySavedFilter(f);
    });
    div.querySelector(".delete").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteSavedFilter(i);
    });
    el.appendChild(div);
  });
}

function saveCurrentFilter() {
  const name = prompt(t("filterNamePrompt") || "给这个筛选起个名字：");
  if (!name) return;
  const list = getSavedFilters();
  list.push({
    name,
    state: {
      school: [...FILTER_STATE.school],
      curriculum: [...FILTER_STATE.curriculum],
      country: [...FILTER_STATE.country],
      admit: [...FILTER_STATE.admit],
      time: FILTER_STATE.time,
    },
  });
  localStorage.setItem("savedFilters", JSON.stringify(list));
  renderSavedFilters();
}

function applySavedFilter(f) {
  FILTER_STATE.school = new Set(f.state.school);
  FILTER_STATE.curriculum = new Set(f.state.curriculum);
  FILTER_STATE.country = new Set(f.state.country);
  FILTER_STATE.admit = new Set(f.state.admit);
  FILTER_STATE.time = f.state.time;
  document.getElementById("filterTime").value = FILTER_STATE.time;
  applyFilter();
  renderFilters();
}

function deleteSavedFilter(idx) {
  const list = getSavedFilters();
  list.splice(idx, 1);
  localStorage.setItem("savedFilters", JSON.stringify(list));
  renderSavedFilters();
}

// ============================================
//  工具
// ============================================
function escapeHTML(s) {
  if (s == null) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ============================================
//  主流程
// ============================================
function renderAll() {
  renderStats();
  renderCharts();
  renderCases();
}

async function init() {
  // 事件绑定
  document.getElementById("langToggle").addEventListener("click", () => {
    setLang(currentLang === "zh" ? "en" : "zh");
  });
  document.getElementById("refreshBtn").addEventListener("click", async () => {
    await loadData();
    renderAll();
  });
  document.getElementById("clearFilterBtn").addEventListener("click", clearFilter);
  document.getElementById("saveFilterBtn").addEventListener("click", saveCurrentFilter);
  document.getElementById("roleSelect").value = currentRole;
  document.getElementById("roleSelect").addEventListener("change", (e) => {
    currentRole = e.target.value;
    localStorage.setItem("role", currentRole);
  });
  // ESC 关闭弹窗
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  applyI18n();
  await loadData();
  applyFilter();  // 初始化 FILTERED
  renderFilters();
  renderSavedFilters();
}

init();
