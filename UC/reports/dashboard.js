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
    curriculum: "课程",
    confidence: "置信度",
    grade: "届",
    admitTo: "录取",
    major: "专业",
    gpa: "GPA",
    testScores: "标化成绩",
    aiConfidence: "AI 置信度",
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
    gpa: "GPA",
    testScores: "Test Scores",
    aiConfidence: "AI Confidence",
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
  // 筛选侧栏是动态渲染的，必须也重渲染才能跟上语言切换
  renderFilters();
  renderSavedFilters();
}

// ============================================
//  Supabase 客户端
// ============================================
const SUPABASE_URL = "https://lrkmyzgmqcdllctbhxdd.supabase.co";
// 使用 anon key（公开，配合 RLS 仅可读，安全）
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxya215emdtcWNkbGxjdGJoeGRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwODAzNTAsImV4cCI6MjEwMDY1NjM1MH0.0VkZgpOG0A5sFFoRtYR5LyCW26U3AlXwg0WuTqbH99M";
// 避免与 window.supabase 全局变量冲突（supabase-js UMD 已经在 window.supabase 上挂载）
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ============================================
//  翻译字典（DB 值 → 英文）
// ============================================
const SCHOOLS_EN = {
  "深圳国际交流学院": "SCIE (Shenzhen College of International Education)",
  "深国交": "SCIE (Shenzhen College of International Education)",
  "上海赫贤学校": "Shanghai He-Xian School",
  "上海赫贤学校（东校区）": "Shanghai He-Xian School (East Campus)",
  "上海赫贤学校（璟旻艺术高中）": "Shanghai He-Xian School (Jingmin Arts High School)",
  "上海包玉刚实验学校": "Shanghai YK Pao School",
  "FindingSchool": "FindingSchool",
  "UWC中国": "UWC China",
  "上海七宝德怀特": "Shanghai Qibao Dwight High School",
  "上海七宝德怀特高级中学": "Shanghai Qibao Dwight High School",
  "上海协和双语": "Shanghai Concord Bilingual School",
  "上海平和双语学校": "Shanghai Pinghe School",
  "上海惠灵顿国际学校": "Wellington College International Shanghai",
  "上海星河湾双语学校": "Shanghai Starriver Bilingual School",
  "上海耀华古北校区": "Yaohua International School Shanghai (Gubei Campus)",
  "上海耀华古北": "Yaohua International School Shanghai (Gubei Campus)",
  "上海耀中浦东校区": "Yew Chung International School Shanghai (Pudong)",
  "北京耀中": "Yew Chung International School Beijing",
  "香港耀中": "Yew Chung International School Hong Kong",
  "加藤国际教育": "Kato International Education",
  "北京世青学校": "Beijing World Youth Academy (BWYA)",
  "北京世青国际学校": "Beijing World Youth Academy (BWYA)",
  "北京十一学校一分校国际部": "Beijing No.11 School International Dept.",
  "北京海淀凯文学校": "Beijing Haidian Kevin School",
  "北京鼎石学校": "Keystone Academy Beijing",
  "南京外国语学校中英项目": "Nanjing Foreign Language School (Sino-British)",
  "南京外国语学校": "Nanjing Foreign Language School",
  "南京贝赛思国际学校": "BASIS International School Nanjing",
  "杭州贝赛思国际学校": "BASIS International School Hangzhou",
  "广州贝赛思国际学校": "BASIS International School Guangzhou",
  "华润小径湾贝赛思国际学校": "BASIS International School Park Lane Harbour",
  "哈罗Harrow": "Harrow",
  "唯寻国际教育": "Weixun International Education",
  "宜校": "YiSchool",
  "德威Dulwich": "Dulwich College",
  "新加坡伊顿": "EtonHouse International School Singapore",
  "枫叶教育": "Maple Leaf Educational Systems",
  "棕榈大道": "Palm Avenue International School",
  "深圳中学国际部": "Shenzhen Middle School International Department",
  "深圳贝赛思": "BASIS International School Shenzhen",
  "爸爸真棒": "DadGood",
  "翰林国际教育": "Hanlin International Education",
  "耀中耀华YCYW": "YCYW (Yew Chung Yew Wah)",
  "诺德安达": "Nord Anglia Education",
  "贝赛思BASIS": "BASIS International School",
  "重庆德普外国语学校": "Chongqing Depu Foreign Language School",
  "顶思": "Topschool",
};
const COUNTRIES_EN = {
  "美国": "United States",
  "英国": "United Kingdom",
  "中国香港": "Hong Kong SAR, China",
  "澳大利亚": "Australia",
  "意大利": "Italy",
  "新加坡": "Singapore",
  "瑞士": "Switzerland",
  "韩国": "South Korea",
  "加拿大": "Canada",
  "中国": "China",
  "日本": "Japan",
};
const UNIVERSITIES_EN = {
  "东北大学": "Northeastern University",
  "伊利诺伊大学厄巴纳-香槟分校": "University of Illinois Urbana-Champaign",
  "伦敦大学学院": "University College London (UCL)",
  "伦敦大学金史密斯学院": "Goldsmiths, University of London",
  "伦敦大学科陶德艺术学院": "Courtauld Institute of Art, University of London",
  "伦敦政治经济学院": "London School of Economics and Political Science",
  "伦敦时装学院": "London College of Fashion",
  "伦敦艺术大学": "University of the Arts London",
  "利兹大学": "University of Leeds",
  "伯恩茅斯大学": "Bournemouth University",
  "佐治亚理工学院": "Georgia Institute of Technology",
  "剑桥大学": "University of Cambridge",
  "加州大学伯克利分校": "University of California, Berkeley",
  "加州大学圣地亚哥分校": "University of California, San Diego",
  "加州大学圣塔芭芭拉分校": "University of California, Santa Barbara",
  "加州大学圣巴巴拉分校": "University of California, Santa Barbara",
  "加州大学戴维斯分校": "University of California, Davis",
  "加州大学欧文分校": "University of California, Irvine",
  "加州大学洛杉矶分校": "University of California, Los Angeles",
  "加州艺术学院": "California Institute of the Arts",
  "南加利福尼亚大学": "University of Southern California",
  "南加州大学": "University of Southern California",
  "南安普顿大学": "University of Southampton",
  "哈佛大学": "Harvard University",
  "哥伦比亚大学": "Columbia University",
  "墨尔本大学": "University of Melbourne",
  "奥蒂斯艺术与设计学院": "Otis College of Art and Design",
  "威斯敏斯特大学": "University of Westminster",
  "巴布森学院": "Babson College",
  "布莱顿大学": "University of Brighton",
  "帕森斯设计学院": "Parsons School of Design",
  "华盛顿大学": "University of Washington",
  "康涅狄格大学": "University of Connecticut",
  "延世大学": "Yonsei University",
  "拉萨尔艺术学院": "LASALLE College of the Arts",
  "提赛德大学": "Teesside University",
  "斯坦福大学": "Stanford University",
  "斯沃斯莫尔学院": "Swarthmore College",
  "昆士兰大学": "University of Queensland",
  "普瑞特艺术学院": "Pratt Institute",
  "杜克大学": "Duke University",
  "波士顿大学": "Boston University",
  "瑞士理诺士大学": "Les Roches International School of Hotel Management",
  "瓦萨学院": "Vassar College",
  "米兰新美术学院": "Nuova Accademia di Belle Arti (NABA)",
  "纽约视觉艺术学院": "School of Visual Arts",
  "艺术中心设计学院": "ArtCenter College of Design",
  "芝加哥艺术学院": "School of the Art Institute of Chicago (SAIC)",
  "萨凡纳艺术与设计学院": "Savannah College of Art and Design",
  "萨凡纳艺术设计学院": "Savannah College of Art and Design",
  "蒙纳士大学": "Monash University",
  "贝茨学院": "Bates College",
  "卡尔顿学院": "Carleton College",
  "达特茅斯学院": "Dartmouth College",
  "金斯顿大学": "Kingston University",
  "金斯顿大学艺术学院": "Kingston University (School of Art)",
  "威斯康星大学麦迪逊分校": "University of Wisconsin-Madison",
  "密歇根大学安娜堡分校": "University of Michigan, Ann Arbor",
  "帝国理工学院": "Imperial College London",
  "温布尔登学院": "Wimbledon College of Arts",
  "爱丁堡大学": "University of Edinburgh",
  "牛津大学": "University of Oxford",
  "麻省理工学院": "Massachusetts Institute of Technology (MIT)",
  "纽约大学": "New York University",
  "芝加哥大学": "University of Chicago",
  "西北大学": "Northwestern University",
  "香港大学": "The University of Hong Kong",
  "香港大学李嘉诚医学院": "HKU Li Ka Shing Faculty of Medicine",
  "香港理工大学": "The Hong Kong Polytechnic University",
  "香港科技大学": "The Hong Kong University of Science and Technology",
};
const MAJORS_EN = {
  "临床医学": "Clinical Medicine",
  "人类学": "Anthropology",
  "传媒设计": "Communication Design",
  "分子生物学": "Molecular Biology",
  "分子工程": "Molecular Engineering",
  "创意写作": "Creative Writing",
  "创意计算": "Creative Computing",
  "化工": "Chemical Engineering",
  "化学": "Chemistry",
  "医学": "Medicine",
  "商业": "Business",
  "商科": "Business",
  "基因科学": "Genetics",
  "娱乐设计": "Entertainment Design",
  "媒体": "Media Studies",
  "媒体设计": "Media Design",
  "动物学": "Zoology",
  "动画": "Animation",
  "历史": "History",
  "工业设计": "Industrial Design",
  "工程": "Engineering",
  "平面设计": "Graphic Design",
  "戏剧与表演设计": "Theatre & Performance Design",
  "戏剧与银幕戏服设计": "Theatre & Screen Costume Design",
  "教育学": "Education",
  "数字媒体与传媒": "Digital Media & Communication",
  "数字艺术": "Digital Art",
  "数字艺术计算": "Digital Art & Computing",
  "数据分析": "Data Analytics",
  "数据科学": "Data Science",
  "时尚": "Fashion",
  "款待与休闲产业管理": "Hospitality & Leisure Industry Management",
  "数学": "Mathematics",
  "文化艺术管理": "Arts & Cultural Management",
  "环境工程": "Environmental Engineering",
  "生物": "Biology",
  "生物学": "Biology",
  "生物工程": "Bioengineering",
  "电子电气工程": "Electrical & Electronic Engineering",
  "电影": "Film",
  "电气工程与设计": "Electrical Engineering & Design",
  "电脑动画与视觉特效": "Computer Animation & Visual Effects",
  "社会科学": "Social Sciences",
  "社会心理学": "Social Psychology",
  "社会学": "Sociology",
  "纯艺术": "Fine Arts",
  "经济学": "Economics",
  "经济": "Economics",
  "自然科学-物理": "Natural Sciences (Physics)",
  "自然科学（物理方向）": "Natural Sciences (Physics)",
  "自然科学-生化": "Natural Sciences (Biochemistry)",
  "自然科学（生物方向）": "Natural Sciences (Biology)",
  "艺术与科技": "Art & Technology",
  "艺术与设计": "Art & Design",
  "艺术史": "Art History",
  "艺术指导与视觉特效": "Art Direction & Visual Effects",
  "表演服装": "Performance Costume",
  "表演服装设计": "Performance Costume Design",
  "视觉传达": "Visual Communication",
  "计算机科学": "Computer Science",
  "设计": "Design",
  "设计创新": "Design Innovation",
  "兽医学": "Veterinary Medicine",
  "用户研究": "User Research",
  "用户体验设计": "UX Design",
  "交互设计": "Interaction Design",
};
const PURPOSES_EN = {
  "录取喜报": "Admission Announcement",
  "成长故事": "Growth Story",
  "经验分享": "Experience Sharing",
  "学习方法": "Study Method",
};
const CURRICULUMS_EN = {
  "IB": "IB (International Baccalaureate)",
  "AP": "AP (Advanced Placement)",
  "A-Level": "A-Level",
  "BC": "BC (British Columbia)",
  "Mixed": "Mixed",
  "Other": "Other",
  "IGCSE": "IGCSE",  // 兜底（不应作为课程，但万一出现仍翻译）
};

const tr = (cn, dict) => (currentLang === "en" && cn && dict[cn]) ? dict[cn] : cn;
const trSchool = (cn) => tr(cn, SCHOOLS_EN);
const trCountry = (cn) => tr(cn, COUNTRIES_EN);
const trUniv = (cn) => tr(cn, UNIVERSITIES_EN);
const trPurpose = (cn) => tr(cn, PURPOSES_EN);
const trCurr = (cn) => tr(cn, CURRICULUMS_EN);
const trMajor = (cn) => tr(cn, MAJORS_EN);
const trSchoolList = (arr) => (arr || []).map(trSchool).join(", ");
const trCountryList = (arr) => (arr || []).map(trCountry).join(", ");
const trUnivList = (arr) => (arr || []).map(trUniv).join(", ");
const trMajorList = (arr) => (arr || []).map(trMajor).join(", ");

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
  renderFilterList("filterSchool", schools, FILTER_STATE.school, "school", trSchool);

  // 课程（IGCSE 是考试/标化，不是课程体系，过滤掉）
  const currs = getUniqueValues("curriculum").filter(Boolean).filter(c => c !== "IGCSE");
  renderFilterChips("filterCurriculum", currs, FILTER_STATE.curriculum);

  // 录取国家
  renderFilterList("filterCountry", getUniqueValues("admit_country"), FILTER_STATE.country, "country", trCountry);

  // 录取学校（带搜索）
  const admits = getUniqueValues("admit_schools");
  renderFilterList("filterAdmit", admits, FILTER_STATE.admit, "admit", trUniv, "filterAdmitSearch");
}

function renderFilterList(elId, items, selectedSet, filterKey, translateFn, searchId) {
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
      <span class="truncate">${escapeHTML(translateFn ? translateFn(item) : item)}</span>
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
    div.textContent = trCurr(item);
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
  // 清空 admit 搜索
  const admitSearch = document.getElementById("filterAdmitSearch");
  if (admitSearch) admitSearch.value = "";
  applyFilter();
  renderFilters();
}

// 清除单个 filter（点击 label 旁的 ✕）
function clearSingleFilter(key) {
  if (key === "school")      FILTER_STATE.school.clear();
  else if (key === "curriculum") FILTER_STATE.curriculum.clear();
  else if (key === "country")    FILTER_STATE.country.clear();
  else if (key === "admit")      FILTER_STATE.admit.clear();
  else if (key === "time") {
    FILTER_STATE.time = "all";
    const sel = document.getElementById("filterTime");
    if (sel) sel.value = "all";
  }
  // admit 搜索框也清空
  if (key === "admit") {
    const admitSearch = document.getElementById("filterAdmitSearch");
    if (admitSearch) admitSearch.value = "";
  }
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
  // 国家分布（图例跟随语言）
  const countryCount = {};
  FILTERED.forEach((c) => (c.admit_country || []).forEach((co) => {
    const key = trCountry(co);  // 中文/英文都用作 key，避免重复
    countryCount[key] = (countryCount[key] || 0) + 1;
  }));
  renderPieChart("chartCountries", countryCount, ["#1d4ed8", "#f59e0b", "#0ea5e9", "#10b981", "#8b5cf6", "#ec4899", "#f43f5e", "#06b6d4"]);

  // 课程分布（IGCSE 是考试不是课程，过滤掉）
  const currCount = {};
  FILTERED.forEach((c) => {
    const k = c.curriculum || "Other";
    if (k === "IGCSE") return;
    const key = trCurr(k);
    currCount[key] = (currCount[key] || 0) + 1;
  });
  renderBarChart("chartCurriculum", currCount, ["#1d4ed8", "#f59e0b", "#10b981", "#8b5cf6", "#ec4899"]);

  // 录取学校 Top 10
  const admitCount = {};
  FILTERED.forEach((c) => (c.admit_schools || []).forEach((s) => {
    const key = trUniv(s);
    admitCount[key] = (admitCount[key] || 0) + 1;
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
      <div class="case-name">
        <a href="${escapeHTML(c.article_url || '#')}" target="_blank" rel="noopener" class="case-name-link" onclick="event.stopPropagation()" title="${escapeHTML(c.article_title || '')}">
          ${escapeHTML(c.student_alias || "—")}
        </a>
      </div>
      <div class="case-school">${escapeHTML(trSchool(c.school || c.account_name || "—"))}</div>
      <div>
        ${c.curriculum && c.curriculum !== "IGCSE" ? `<span class="case-tag case-tag-curriculum">${escapeHTML(trCurr(c.curriculum))}</span>` : ""}
        ${c.article_purpose ? `<span class="case-tag case-tag-purpose">${escapeHTML(trPurpose(c.article_purpose))}</span>` : ""}
        ${c.grade ? `<span class="case-tag">${escapeHTML(c.grade)}</span>` : ""}
      </div>
      <div class="case-admit">
        <div class="case-admit-school">${countryFlag} ${escapeHTML(trUniv(admit))}</div>
        ${major ? `<div class="case-admit-country">${escapeHTML(trMajor(major))} · ${escapeHTML(trCountry(country))}</div>` : `<div class="case-admit-country">${escapeHTML(trCountry(country))}</div>`}
      </div>
      ${takeaways.length ? `
        <div class="case-takeaway">
          ${takeaways.map(t => `<div class="case-takeaway-item">${escapeHTML(t)}</div>`).join("")}
        </div>
      ` : ""}
      <div class="case-footer">
        <a href="${escapeHTML(c.article_url || '#')}" target="_blank" rel="noopener" class="case-article-link" title="${escapeHTML(c.article_title || '')}">
          📰 ${escapeHTML(c.article_title || "").slice(0, 30)}${(c.article_title || "").length > 30 ? "..." : ""}
        </a>
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
    [trSchool(c.school || c.account_name || ""), trCurr(c.curriculum), c.grade].filter(Boolean).join(" · ");

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
        <div class="case-admit-school">${flagOf((c.admit_country || [])[0] || "")} ${escapeHTML(trUnivList(c.admit_schools) || "—")}</div>
        <div class="case-admit-country">${escapeHTML(trMajorList(c.admit_majors))} · ${escapeHTML(trCountryList(c.admit_country))}</div>
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">${t("statTotalCases")} · ${t("purpose")} · ${t("grade")}</div>
      <div class="modal-key-value">
        <span class="modal-key">${t("curriculum") || "Curriculum"}</span><span class="modal-value">${escapeHTML(trCurr(c.curriculum) || "—")}</span>
        <span class="modal-key">${t("purpose")}</span><span class="modal-value">${escapeHTML(trPurpose(c.article_purpose) || "—")}</span>
        <span class="modal-key">${t("grade")}</span><span class="modal-value">${escapeHTML(c.grade || "—")}</span>
        <span class="modal-key">${t("gpa")}</span><span class="modal-value">${escapeHTML(c.gpa || "—")}</span>
        <span class="modal-key">${t("aiConfidence")}</span><span class="modal-value">${conf}%</span>
      </div>
    </div>

    ${Object.keys(ts).length ? `
    <div class="modal-section">
      <div class="modal-section-title">${t("testScores")}</div>
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
  // 每个 filter 的独立清除按钮
  document.querySelectorAll(".filter-clear-btn").forEach(btn => {
    btn.addEventListener("click", () => clearSingleFilter(btn.dataset.clear));
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
