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
    filterLevel: "申请层级",
    filterUndergradOnly: "仅看本科申请",
    filterUndergradHint: "关闭后包含硕士 / 高中 / 研究生申请",
    quickLevel: "",
    levelUndergrad: "",
    levelGraduate: "",
    levelHighschool: "",
    levelAll: "",
    levelHint: "",
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
    filterLevel: "Level",
    filterUndergradOnly: "Undergraduate only",
    filterUndergradHint: "Off = also include Master's / High School",
    quickLevel: "",
    levelUndergrad: "",
    levelGraduate: "",
    levelHighschool: "",
    levelAll: "",
    levelHint: "",
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
  "北京某公立学校国际部": "International Department of a Beijing Public School",
  "武汉英中": "Wuhan Britain-China School",
  "广东工业大学": "Guangdong University of Technology",
  "重庆枫叶国际学校": "Chongqing Maple Leaf International School",
  "海南枫叶国际学校": "Hainan Maple Leaf International School",
  "上海某国际学校": "An International School in Shanghai",
  "北京某国际学校": "An International School in Beijing",
  "德胜学校（国际）": "Desheng School (International)",
  "翰林国际": "Hanlin International",
  "德胜学校国际部": "International Department of Desheng School",
  "WLSA上海学校": "WLSA Shanghai Academy",
  "北京某公立中学国际部": "International Department of a Beijing Public Middle School",
  "美伦国际高中 (Majestic International College)": "Majestic International College",
  "上海市世外中学": "Shanghai World Foreign Language Middle School",
  "无锡狄邦文理学校（NKCS）": "Wuxi DiBang Liberal Arts School (NKCS)",
  "英领国际学校": "Yingling International School",
  "北京市第八十中学": "Beijing No. 80 High School",
  "辰美（国际）艺术学校": "Cherish-Arting International Arts School",
  "光华剑桥": "Guanghua Cambridge International School",
  "广东碧桂园学校": "Guangdong Country Garden School",
  "东方剑桥国际学校": "Oriental Cambridge International School",
  "美伦国际学院 (Majestic International College)": "Majestic International College",
  "深圳荟同学校": "Shenzhen College of International Education (SCIE) Huitong",
  "万科梅沙书院": "Vanke Meisha Academy",
  "北京八中国际部": "International Department of Beijing No. 8 High School",
  "上海枫叶双语学校": "Shanghai Maple Leaf Bilingual School",
  "温州森马协和学校": "Wenzhou Semir Concordia School",
  "苏州工业园区外国语学校": "Suzhou Industrial Park Foreign Language School",
  "考文垂大学": "Coventry University",
  "深大师院国际高中（AISSU）": "Affiliated International School of Shenzhen University (AISSU)",
  "伦敦国王学院": "King's College London (KCL)",
  "华东师范大学第二附属中学国际部": "International Department of the Second Affiliated High School of East China Normal University",
  "上海诺美学校": "Shanghai Nuo Mei School",
  "北京爱迪国际学校": "Beijing AIDE International School",
  "无锡狄邦文理学校": "Wuxi DiHan Liberal Arts School",
  "天津法拉古特学校": "Tianjin Farragut School",
  "昆山狄邦华曜学校": "Kunshan DiHan Huayao School",
  "广州南沙民心港人子弟学校": "Guangzhou Nansha Minxin Hong Kong Children's School",
  "北京师范大学附属实验中学": "The Experimental High School Attached to Beijing Normal University",
  "海南枫叶国际高中": "Hainan Maple Leaf International High School",
  "广东顺德德胜学校国际部": "International Department of Shunde Desheng School, Guangdong",
  "稻香湖学校": "Daoxianghu School",
  "郑州外国语学校": "Zhengzhou Foreign Language School",
  "厦门华锐莱普顿学校": "Xiamen Huarui Leighton School",
  "北京外国语大学国际课程中心": "International Curriculum Center of Beijing Foreign Studies University (BFSU)",
  "北京新东方双语学校": "Beijing New Oriental Bilingual School",
  "新加坡斯坦福特学院": "Stamford College Singapore",
  "香港耀中国际学校 YCIS Hong Kong": "YCIS Hong Kong (Yew Chung International School of Hong Kong)",
  "华威大学": "University of Warwick",
  "上海市民办尚德实验学校": "Shanghai Shangde Experimental School",
  "上海诺美高级中学": "Shanghai Nuo Mei High School",
  "长沙康礼克雷格学校": "Changsha Congrui Craig School",
  "济南外国语学校": "Jinan Foreign Language School",
  "珠海一附实验中学国际部": "Zhuhai No.1 Affiliated Experimental Middle School International Department",
  "北京市私立汇佳学校": "Beijing Huijia Private School",
  "济南新航实验外国语学校": "Jinan Xinhang Experimental Foreign Language School",
  "北京昌平区凯博学校": "Beijing Changping Kebo School",
  "上海中学国际部": "Shanghai High School International Division",
  "四川省都江堰中学双语班": "Dujiangyan High School Bilingual Program (Sichuan)",
  "深圳爱文世界学校": "Avenues: The World School Shenzhen",
  "广州外国语学校国际部": "Guangzhou Foreign Language School International Department",
  "深圳中学": "Shenzhen Middle School",
  "福州中加学校": "Fuzhou Sino-Canada School",
  "上海新纪元双语学校": "Shanghai New Era Bilingual School",
  "清华附中稻香湖学校": "The High School Affiliated to Tsinghua University Daoxianghu School",
  "武汉爱莎文华中学": "Wuhan AISCA Wenhua School",
  "光华剑桥国际学校": "Guanghua Cambridge International School",
  "伦敦政治经济学院": "London School of Economics and Political Science (LSE)",
  "伦敦玛丽女王大学": "Queen Mary University of London (QMUL)",
  "威斯敏斯特大学": "University of Westminster",
  "光华剑桥美高": "Guanghua Cambridge American High School",
  "曼彻斯特大学": "University of Manchester",
  "领科教育": "Linkcool Education (Lingo Education)",
  "北京市鼎石学校": "Keystone Academy Beijing",
  "上海美高双语学校": "Shanghai American High Bilingual School",
  "宁波市镇海中学国际部": "Ningbo Zhenhai High School International Department",
  "宁波市镇海赫威斯肯特学校": "Ningbo Zhenhai Huawei Kent School",
  "武汉英中国际学校": "Wuhan Britain-China School",
  "海口中学": "Haikou Middle School",
  "北京师范大学实验中学": "The Experimental High School Attached to Beijing Normal University",
  "UWC常熟世界联合学院": "UWC Changshu China",
  "UCLA（加州大学洛杉矶分校）": "University of California, Los Angeles (UCLA)",
  "深圳市枫叶学校": "Shenzhen Maple Leaf School",
  "上外附中": "High School Affiliated to Shanghai International Studies University (SHSID)",
  "川大附中国际部": "High School Affiliated to Sichuan University International Department",
  "南京外国语学校国际部": "Nanjing Foreign Language School International Department",
  "大连枫叶国际学校": "Dalian Maple Leaf International School",
  "曹杨二中": "Shanghai Caoyang No.2 High School",
  "上海市实验学校": "Shanghai Experimental School",
  "青岛梅尔顿学校": "Qingdao Meierton School",
  "巴蜀常春藤学校": "Bashu Ivy School",
  "海嘉学校": "Haijia School",
  "常熟世华学校": "Changshu Shihua School",
  "东方剑桥国际学校 (Oriental Cambridge International School)": "Oriental Cambridge International School",
  "杭州国际学校 (HIS)": "Hangzhou International School (HIS)",
  "伦敦大学学院": "University College London (UCL)",
  "杜伦大学": "Durham University",
  "利兹大学": "University of Leeds",
  "利物浦大学": "University of Liverpool",
  "谢菲尔德大学": "University of Sheffield",
  "萨塞克斯大学": "University of Sussex",
  "上海交大附中": "High School Affiliated to Shanghai Jiao Tong University",
  "斯旺西大学": "Swansea University",
  "上海市民办尚德实验学校（尚德·盖斯顿美高）": "Shanghai Shangde Experimental School (Shangde Gasdon American High School)",
  "北京王府学校": "Beijing Royal School",
  "惠州市光正实验学校": "Huizhou Guangzheng Experimental School",
  "扬州新东方外国语学校": "Yangzhou New Oriental Foreign Language School",
  "南通思德茀外国语学校": "Nantong Sidefu Foreign Language School",
  "杭州外国语学校": "Hangzhou Foreign Languages School",
  "武汉英中学校": "Wuhan Britain-China School",
  "浙江桐乡耀华国际学校": "Tongxiang Yaohua International School",
  "耀中国际学校上海浦西校区": "YCIS Shanghai Puxi Campus",
  "香港耀中国际学校": "YCIS Hong Kong (Yew Chung International School of Hong Kong)",
  "ACCP国际课程中心": "ACCP International Curriculum Center",
  "杭州国际学校": "Hangzhou International School",
  "中央财经大学国际教育中心（2+2项目）": "Central University of Finance and Economics International Education Center (2+2 Program)",
  "广州暨大港澳子弟学校": "Guangzhou Jinan University Hong Kong & Macao Children's School",
  "东莞暨大港澳子弟学校": "Dongguan Jinan University Hong Kong & Macao Children's School",
  "清澜山学校": "Qinglanshan School",
  "圣华紫竹学院": "Shenghua Zizhu Academy",
  "深圳国际交流书院": "Shenzhen College of International Education (SCIE)",
  "耀华国际教育学校上海临港校区": "Yaohua International Education School Shanghai Lingang Campus",
  "北京赫德学校": "Beijing Hede School",
  "北京大学": "Peking University (PKU)",
  "中山大学": "Sun Yat-sen University (SYSU)",
  "GIA（美中国际爱智学校）": "GIA (Global Intelligence Academy)",
  "深圳枫叶学校": "Shenzhen Maple Leaf School",
  "多伦多大学": "University of Toronto (UofT)",
  "圣安德鲁斯大学": "University of St Andrews",
  "宋庆龄学校": "Song Qingling School",
  "北京海淀外国语藤飞学校": "Beijing Haidian Foreign Language Tengfei School",
  "北京八十中国际部": "Beijing No.80 High School International Department",
  "成都七中万达学校国际部": "Chengdu No.7 High School Wanda Campus International Department",
  "杭州狄邦文理学校": "Dipont Huacheng Academy (Hangzhou)",
  "爱默生学院": "Emerson College",
  "大连枫叶高中": "Dalian Maple Leaf High School",
  "西安枫叶高中": "Xi'an Maple Leaf High School",
  "武汉枫叶高中": "Wuhan Maple Leaf High School",
  "天津泰达枫叶高中": "Tianjin TEDA Maple Leaf High School",
  "重庆枫叶高中": "Chongqing Maple Leaf High School",
  "镇江枫叶高中": "Zhenjiang Maple Leaf High School",
  "洛阳枫叶高中": "Luoyang Maple Leaf High School",
  "上海枫叶高中": "Shanghai Maple Leaf High School",
  "海南枫叶高中": "Hainan Maple Leaf High School",
  "深圳枫叶高中": "Shenzhen Maple Leaf High School",
  "襄阳枫叶高中": "Xiangyang Maple Leaf High School",
  "和林格尔枫叶高中": "Horinger Maple Leaf High School",
  "上外附中国际部": "International Department, High School Affiliated to SISU (SHSID)",
  "上海市行政管理学校": "Shanghai School of Administration Management",
  "上海法国外籍人员子女学校": "Lycée Français de Shanghai",
  "日本安比哈罗国际学校": "Appi Haru International School",
  "宏文学校青岛校区": "Hongwen School Qingdao Campus",
  "福州西湖国际学校": "Fuzhou Xihu International School",
  "深圳枫叶国际学校": "Shenzhen Maple Leaf International School",
  "北京101中学": "Beijing No.101 High School",
  "南京贝赛思外籍人员子女学校": "Nanjing Basisi School (Nanjing International School Bethel)",
  "北京市海淀区稻香湖学校": "Daoxianghu School, Haidian District, Beijing",
  "杭州外国语学校剑桥国际高中": "Hangzhou Foreign Languages School Cambridge International High School",
  "伦敦玛丽女王大学（2+2）": "Queen Mary University of London (2+2)",
  "常熟UWC": "United World College Changshu China (UWC Changshu)",
  "领科教育上海校区 赛倍思学部": "Linkers Education Shanghai Campus — Sabis Department",
  "领科教育上海校区 A Level学部": "Linkers Education Shanghai Campus — A Level Department",
  "万科双语高中（德英乐旗下）": "Vanke Bilingual High School (under Düsseldorf International School Group)",
  "广州外国语学校": "Guangzhou Foreign Language School",
  "上海交通大学附属中学国际部（交中IB）": "International Department, High School Affiliated to Shanghai Jiao Tong University (JZIB)",
  "上海美高学校": "Shanghai American School (SAS)",
  "美伦国际高中（Majestic International College）": "Majestic International College",
  "苏州外国语学校": "Suzhou Foreign Language School",
  "常州外国语学校（后转至江苏省常州中学）": "Changzhou Foreign Language School (later transferred to Changzhou High School of Jiangsu Province)",
  "北京新东方扬州外国语学校": "Beijing New Oriental Yangzhou Foreign Language School",
  "武汉英中（武汉英国中学）": "Wuhan Britain-China School (WBCS)",
  "武汉英国中学（武汉英中）": "Wuhan Britain-China School (WBCS)",
  "天津英华实验学校": "Tianjin Yinghua International School",
  "上海美国学校 (Shanghai American School)": "Shanghai American School (SAS)",
  "青岛耀中国际学校": "Yew Chung International School of Qingdao (YCIS Qingdao)",
  "北京国际高中": "Beijing International High School",
  "德威国际学校": "Dulwich College",
  "国内普高（具体校名未披露）": "Domestic High School (Name Undisclosed)",
  "ACCP国际课程中心（原就读国际高中）": "ACCP International Curriculum Center (Previously Attended International High School)",
  "ACCP国际课程中心（原就读美高）": "ACCP International Curriculum Center (Previously Attended American High School)",
  "哈罗国际学校深圳": "Harrow International School Shenzhen",
  "哈罗北京学校": "Harrow International School Beijing",
  "北京德威英国国际学校": "Dulwich College Beijing",
  "北师大实验学校": "Beijing Normal University Experimental School",
  "海高（新西兰）": "Hai Gao High School (New Zealand)",
  "深中国际部": "Shenzhen Middle School International Department",
  "Pearson UWC（此前就读常熟UWC）": "Pearson United World College (Previously Attended UWC Changshu China)",
  "宾州美高（具体校名未提及）": "Pennsylvania High School (Name Undisclosed)",
  "华东师范大学第二附属中学（华二）": "The Second Affiliated High School of East China Normal University (ECNU No.2)",
  "某新一线城市公立国际部": "Public School International Department (New Tier-1 City, Name Undisclosed)",
  "杭州国际学校（HIS）": "Hangzhou International School (HIS)",
  "上海闵行区协和双语教科学校": "Concordia Bilingual School Minhang Shanghai",
  "山东省青岛第一国际学校（QISS）": "Qingdao No.1 International School of Shandong (QISS)",
  "无锡市协和双语学校": "Wuxi Concordia Bilingual School",
  "上海青浦区协和双语学校": "Concordia Bilingual School Qingpu Shanghai",
  "北京中学国际部": "Beijing Middle School International Department",
  "苏州北美国际高级中学": "Suzhou North American High School",
  "上海世外DISCIMUS中德班（原就读国内私立学校）": "Shanghai SUIS DISCIMUS Sino-German Program (Previously Attended Domestic Private School)",
  "上海世外DISCIMUS中德班（体制内转轨国际教育）": "Shanghai SUIS DISCIMUS Sino-German Program (Transitioned from Domestic Education System)",
  "上实剑桥": "Shanghai Experimental School Cambridge International Center",
  "上海安生学校": "Shanghai Ansheng School",
  "天津光华剑桥高级中学": "Tianjin Guanghua Cambridge Senior High School",
  "中国人民大学附属中学ICC国际部": "The High School Affiliated to Renmin University of China ICC International Department",
  "国内某电影学院": "Domestic Film Academy (Name Undisclosed)",
  "南方科技大学": "Southern University of Science and Technology (SUSTech)",
  "北京师范大学珠海分校": "Beijing Normal University Zhuhai Campus",
  "国内某双一流、985大学": "Domestic Double First-Class / 985 University (Name Undisclosed)",
  "国内某美院附中": "Affiliated High School of Domestic Fine Arts Academy (Name Undisclosed)",
  "国内某高中": "Domestic High School (Name Undisclosed)",
  "万科双语高中": "Vanke Bilingual High School",
  "上海天华国际中本贯通": "Shanghai Tianhua International Secondary-to-Bachelor Integrated Program",
  "南京金地未来学校": "Nanjing Gemdale Future School",
  "LWS上海美高学校": "LWS Shanghai American High School",
  "华东政法大学（推测）": "East China University of Political Science and Law (ECUPL) (Presumed)",
  "海淀凯文学校": "Haidian Kaiwen Academy",
  "实验学校国际部": "Experimental School International Department",
  "人大附中ICC国际课程中心": "RDFZ ICC International Curriculum Center",
  "国内985院校": "Domestic 985 University (Name Undisclosed)",
  "国内普通双非院校": "Domestic Non-Double First-Class University (Name Undisclosed)",
  "C9高校（具体名称未披露）": "C9 League University (Name Undisclosed)",
  "山东大学（威海）": "Shandong University (Weihai)",
  "浙江大学": "Zhejiang University",
  "北京师范大学-香港浸会大学联合国际学院（BNBU）": "Beijing Normal University-Hong Kong Baptist University United International College (UIC)",
  "澳门科技大学": "Macau University of Science and Technology (MUST)",
  "新航道（OSSD课程学员）": "New Channel International Education (OSSD Program Students)",
  "新航道": "New Channel International Education",
  "奥克兰大学": "University of Auckland",
  "圣路易斯华盛顿大学": "Washington University in St. Louis (WashU)",
  "华东政法大学": "East China University of Political Science and Law (ECUPL)",
  "麦克马斯特大学": "McMaster University",
  "复旦大学": "Fudan University",
  "深圳国际学校": "Shenzhen International School",
  "康奈尔大学": "Cornell University",
  "加州大学伯克利分校": "University of California, Berkeley (UC Berkeley)",
  "威斯康星大学麦迪逊分校": "University of Wisconsin-Madison (UW-Madison)",
  "麦吉尔大学": "McGill University",
  "西安大略大学": "University of Western Ontario (Western University)",
  "华东师范大学": "East China Normal University (ECNU)",
  "香港大学": "University of Hong Kong (HKU)",
  "知名公立高中": "Well-known Public High School",
  "公立高中": "Public High School",
  "知名公立高中（未具名）": "Well-known Public High School (unnamed)",
  "北京市朝阳区凯文学校": "Beijing Chaoyang凯文学校 Kevin School",
  "公立高中（未具名）": "Public High School (unnamed)",
  "华南师范大学附属中学": "The High School Affiliated to South China Normal University (SCNU Affiliated High School)",
  "小径湾贝赛斯国际学校": "Basys International School Xiaojingwan",
  "西雅图某私校": "A Private School in Seattle (unnamed)",
  "佛罗里达希尔斯伯勒县某公立高中": "A Public High School in Hillsborough County, Florida (unnamed)",
  "美国某公立高中": "A U.S. Public High School (unnamed)",
  "金苹果锦城一中": "Jinpingguo Jincheng No.1 High School",
  "深圳市展华实验学校国际部": "Shenzhen Zhanhua Experimental School International Department",
  "美国本科Top20院校": "U.S. Top 20 Undergraduate Institution",
  "美国某本科院校": "A U.S. Undergraduate Institution (unnamed)",
  "加拿大本科院校": "A Canadian Undergraduate Institution (unnamed)",
  "中国人民大学附属中学": "The High School Affiliated to Renmin University of China (RDFZ)",
  "美东罗德岛寄宿美高（具体校名未披露）": "A Boarding High School in Rhode Island, East Coast U.S. (unnamed)",
  "美国某TOP美高（具体校名未披露）": "A Top U.S. Boarding/Private High School (unnamed)",
  "中国某高中（具体校名未披露）": "A Chinese High School (unnamed)",
  "常州威雅": "Wycombe Abbey School Changzhou",
  "上海某体制内学校（具体校名未披露）": "A Shanghai Public-System School (unnamed)",
  "加拿大高中": "A Canadian High School (unnamed)",
  "上海励滕伯克曼": "Shanghai Ryton Berkman School",
  "上海领科教育学校": "Shanghai Linkers Education School",
  "蛇口贝赛思国际学校": "Shekou International School (SIS)",
  "上海外国语大学附属中学": "The High School Affiliated to Shanghai International Studies University (SISU Affiliated High School)",
  "四川师范大学": "Sichuan Normal University",
  "武汉外国语学校": "Wuhan Foreign Languages School",
  "香港弘立书院": "Hong Kong Academy",
  "Jumeirah College（迪拜）": "Jumeirah College (Dubai)",
  "东莞ISD国际学校": "Dongguan ISD International School",
  "深圳大学师范学院附属中学（深大师院）": "Affiliated Middle School of Shenzhen University Normal College",
  "西安铁一中国际课程班": "Xi'an Tieyi High School International Program",
  "大连华美双语学校": "Dalian Huamei Bilingual School",
  "北京四中国际校区": "Beijing No.4 High School International Campus",
  "北京人朝分实验学校": "Beijing Renchao Fen Experimental School",
  "天津美达菲学校国际部": "Tianjin Meritorious School International Department",
  "哈尔滨第三中学": "Harbin No.3 High School",
  "闵行万科学校": "Minhang Vanke School",
  "贝赛思独立学校硅谷校区": "Basis Independent School Silicon Valley",
  "上海星河湾学校": "Shanghai Xinghe Bay School",
  "马尼拉国际学校": "International School Manila",
  "北京顺义国际学校": "Western Academy of Beijing (WAB)",
  "Buckingham Browne and Nichols School": "Buckingham Browne & Nichols School",
  "澳洲新南威尔士大学": "University of New South Wales (UNSW)",
  "美国大学（大一转学）": "A University in the United States (Transfer, Freshman Year)",
  "文蓝国际教育（脱产，原就读于英国高中IGCSE阶段）": "Wenlan International Education (Full-time Program, Previously Enrolled in UK High School IGCSE)",
  "文蓝国际学习中心": "Wenlan International Learning Center",
  "北京交通大学": "Beijing Jiaotong University",
  "文蓝（国内高中+文蓝A-Level双轨）": "Wenlan (Dual-Track: Domestic High School + Wenlan A-Level)",
  "文蓝Aston（香港）": "Wenlan Aston (Hong Kong)",
  "国内某知名国际学校": "A Well-Known International School in China",
  "国内某知名国际学校（后脱产就读文蓝全日制课程）": "A Well-Known International School in China (Later Enrolled Full-time at Wenlan)",
  "文蓝留学（脱产机构）": "Wenlan Study Abroad (Full-time Institution)",
  "文蓝国际教育": "Wenlan International Education",
  "杭州第二中学": "Hangzhou No. 2 High School",
  "武昌实验中学": "Wuchang Experimental Middle School",
  "CWA世华学校": "CWA World Chinese Academy",
  "香港某IB学校": "An IB School in Hong Kong",
  "文蓝（机构）": "Wenlan (Institution)",
  "青苗学校": "Qingmiao School",
  "北京市海嘉学校": "Beijing Hejia School",
  "马萨诸塞州某寄宿制私立高中": "A Boarding Private High School in Massachusetts",
  "加拿大某私立高中": "A Private High School in Canada",
  "加拿大某中学": "A Secondary School in Canada",
  "安多佛高中": "Phillips Academy Andover",
  "香港中文大学（深圳）": "The Chinese University of Hong Kong, Shenzhen (CUHK-Shenzhen)",
  "香港城市大学（东莞）": "City University of Hong Kong, Dongguan (CityUHK Dongguan)",
  "香港科技大学（广州）": "The Hong Kong University of Science and Technology (Guangzhou) (HKUST(GZ))",
  "北京师范大学-香港浸会大学联合国际学院": "Beijing Normal University - Hong Kong Baptist University United International College (UIC)",
  "WLSA上海": "WLSA Shanghai Academy",
  "上海某公立学校": "A Public School in Shanghai",
  "深圳某高中": "A High School in Shenzhen",
  "南加州大学": "University of Southern California (USC)",
  "纽约大学 + 南加州大学": "New York University (NYU) + University of Southern California (USC)",
  "纽约大学": "New York University (NYU)",
  "伯克利音乐学院": "Berklee College of Music",
  "惠灵顿玛格丽特女王学院": "Wellington College (Queen Margaret's Campus)",
  "肯庭格恩中学": "Kentiggern College",
  "维特利亚国立理工学院": "Whitireia New Zealand (Whitireia Polytechnic)",
  "上海交通大学附属中学": "High School Affiliated to Shanghai Jiao Tong University",
  "深圳国际预科书院": "Shenzhen International Pre-university Academy",
  "深圳(南山)中加学校": "Shenzhen (Nanshan) Sino-Canadian School",
  "深圳实验学校国际教育基地": "Shenzhen Experimental School International Education Center",
  "深圳富源英美学校": "Shenzhen Fuyuan British-American School",
  "Bronx Science High School": "Bronx High School of Science",
  "六师二附小": "The Second Affiliated Primary School of the Sixth Normal School",
  "上海启能东方外国语学校": "Shanghai Qineng Oriental Foreign Language School",
  "华东师范大学第二附属中学闵行紫竹分校": "The Second Affiliated High School of East China Normal University, Minhang Zizhu Campus",
  "上海民办启能东方外国语学校": "Shanghai Private Qineng Oriental Foreign Language School",
  "句容碧桂园学校": "Jurong Country Garden School",
  "平和双语学校": "Pinghe Bilingual School",
  "英基沙田学院 (ESF Sha Tin College)": "ESF Sha Tin College",
  "北京顶尖公立国际部": "International Department of a Top Public School in Beijing",
  "海淀区头部公立高中": "Top Public High School in Haidian District",
  "哈罗上海": "Harrow International School Shanghai",
  "哈罗南宁": "Harrow International School Nanning",
  "上海哈罗国际学校": "Harrow International School Shanghai",
  "深圳前海哈罗国际学校": "Harrow International School Shenzhen Qianhai",
  "北京某头部公立高中国际部": "International Division of a Top Public High School in Beijing",
  "中国常熟世界联合学院": "United World College Changshu China (UWC Changshu)",
  "上海某民办学校": "Private School in Shanghai",
  "济南某公立学校国际部": "International Division of a Public School in Jinan",
  "广州某国际学校": "International School in Guangzhou",
  "爱丁堡大学": "University of Edinburgh",
  "中国人民大学附属中学国际部": "The High School Affiliated to Renmin University of China, International Division (RDFZ)",
  "南京某国际学校": "International School in Nanjing",
  "上海某公立学校国际部": "International Division of a Public School in Shanghai",
  "QS前100大学": "QS Top 100 University",
  "海外某高中": "High School Abroad",
  "浙江某公立学校国际部": "International Division of a Public School in Zhejiang",
  "某海外高中": "High School Abroad",
  "南京贝赛斯国际学校": "Nanjing Besses International School",
  "加州某小镇高中（约20人毕业班）": "Small-Town High School in California (approx. 20-person graduating class)",
  "Babson College（转学前）": "Babson College (prior to transfer)",
  "北京某公立高中": "Public High School in Beijing",
  "北京鼎石国际学校": "Keystone Academy Beijing",
  "视觉艺术高中": "High School of Art and Design",
  "北京某国际部": "International Division in Beijing",
  "乌鲁木齐某公立学校": "Public School in Urumqi",
  "长三角国际学校": "International School in the Yangtze River Delta",
  "鼎石学校": "Keystone Academy",
  "北京某公立中学": "Public Middle/High School in Beijing",
  "上海中学": "Shanghai High School",
  "济南某公立中学": "Public Middle/High School in Jinan",
  "青岛某公立中学": "Public Middle/High School in Qingdao",
  "哈罗香港国际学校": "Harrow International School Hong Kong",
  "汇点中国": "Huidge China",
  "人大附中ICC": "RDFZ ICC (The High School Affiliated to Renmin University of China, International Curriculum Center)",
  "北师大实验": "Beijing Normal University Experimental High School",
  "江西科技学院附中": "High School Affiliated to Jiangxi University of Science and Technology",
  "北京十一学校": "Beijing No.11 School",
  "北京80中学": "Beijing No.80 High School",
  "重庆南开中学": "Chongqing Nankai Secondary School",
  "普林斯顿数理学校": "Princeton Mathematics and Science School",
  "新加坡UWC": "United World College South East Asia (UWCSEA)",
  "BASIS International School Hangzhou（杭州钱江贝赛思外籍人员子女学校）": "BASIS International School Hangzhou",
  "BASIS International School Nanjing（南京贝赛思外籍人员子女学校）": "BASIS International School Nanjing",
  "杭州钱江贝赛思外籍人员子女学校": "BASIS International School Hangzhou",
  "上海世界外国语中学": "Shanghai World Foreign Language Middle School",
  "民办位育IB": "Shanghai Weiyu High School (IB Programme)",
  "北京第二外国语学院": "Beijing International Studies University (BISU)",
  "上海中学（本部）": "Shanghai High School",
  "北京师范大学附属实验中学国际部": "The Experimental High School Attached to Beijing Normal University (International Department)",
  "上海协和国际外籍人员子女学校": "Shanghai Concordia International School",
  "光华剑桥学校": "Guanghua Cambridge School",
  "领科教育上海校区 IB学部": "Dipont Education Shanghai Campus (IB Programme)",
  "长安大学": "Chang'an University",
  "新加坡Kaplan-UCD合作项目": "Kaplan-UCD Partnership Programme Singapore",
  "哈尔滨工业大学威海分校": "Harbin Institute of Technology Weihai (HIT Weihai)",
  "华南师范大学": "South China Normal University (SCNU)",
  "人民大学附属中学国际部（ICC）": "The High School Affiliated to Renmin University of China (International Curriculum Center, ICC)",
  "常州外国语附属双语学校": "Changzhou Foreign Languages School Affiliated Bilingual School",
  "香港沪江维多利亚学校": "Huju Victoria School Hong Kong",
  "上海包玉刚国际学校": "Shanghai Pui Ching International School",
  "清香": "Qingxiang School",
  "文蓝": "Wenlan International Education",
  "上海文蓝": "Shanghai Wenlan International Education",
  "海外高中": "Overseas High School",
  "国际学校": "International School",
  "中外合办院校": "Sino-Foreign Cooperative University",
  "香港某国际学校": "An International School in Hong Kong",
  "上海英澳美行中国际": "Shanghai Ying-Ao-Mei-Xing-Zhong International",
  "北京某公立高中国际部": "A Beijing Public High School International Dept.",
  "上海世外中学": "Shanghai World Foreign Language Middle School",
  "上海市世界外国语中学": "Shanghai World Foreign Language Middle School",
  "七德": "Shanghai Qibao Dwight High School",
  "七宝德怀特": "Shanghai Qibao Dwight High School",
  "美伦国际高中": "Majestic International College",
  "美伦国际学院": "Majestic International College",
  "深大师院国际高中": "The Affiliated International High School of Shenzhen University",
  "清华附中国际部": "Tsinghua University High School International Dept.",
  "上海平和": "Shanghai Pinghe School",
  "平和双语": "Shanghai Pinghe Bilingual School",
  "包玉刚": "YK Pao School",
  "星河湾": "Shanghai Starriver Bilingual School",
  "协和双语": "Shanghai Concord Bilingual School",
  "鼎石": "Keystone Academy Beijing",
  "世青": "Beijing World Youth Academy",
  "人大附中": "The High School Affiliated to Renmin University",
  "人大附中中外合作办学项目（ICC）": "RDFZ ICC",
  "深国交万科": "SCIE Vanke",
  "上海星河湾": "Shanghai Starriver Bilingual School",
  "上海包玉刚": "Shanghai YK Pao School",
  "上海平和双语": "Shanghai Pinghe Bilingual School",
  "上海协和": "Shanghai Xiehe Bilingual School",
  "美高学校": "US High School",
  "国际部": "International Department",
  "国际课程班": "International Curriculum Class",
  "深圳清澜山": "Shenzhen Tsinglan School",
  "东莞清澜山": "Dongguan Tsinglan School",

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
  "中国澳门": "Macao SAR, China",
  "中国大陆": "Mainland China",
  "新西兰": "New Zealand",
  "法国": "France",
  "荷兰": "Netherlands",
  "马来西亚": "Malaysia",
  "德国": "Germany",
  "俄罗斯": "Russia",
  "爱尔兰": "Ireland",
  "卡塔尔": "Qatar",
  "西班牙": "Spain",

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
  "多伦多大学": "University of Toronto",
  "曼彻斯特大学": "University of Manchester",
  "伦敦国王学院": "King's College London (KCL)",
  "康奈尔大学": "Cornell University",
  "宾夕法尼亚大学": "University of Pennsylvania (UPenn)",
  "悉尼大学": "University of Sydney",
  "约翰霍普金斯大学": "Johns Hopkins University",
  "华威大学": "University of Warwick",
  "北京大学": "Peking University (PKU)",
  "香港城市大学": "City University of Hong Kong (CityU)",
  "香港中文大学": "The Chinese University of Hong Kong (CUHK)",
  "圣路易斯华盛顿大学": "Washington University in St. Louis (WashU)",
  "加州大学尔湾分校": "University of California, Irvine (UCI)",
  "耶鲁大学": "Yale University",
  "俄亥俄州立大学": "The Ohio State University (OSU)",
  "布里斯托大学": "University of Bristol",
  "伊利诺伊大学香槟分校": "University of Illinois Urbana-Champaign (UIUC)",
  "新南威尔士大学": "University of New South Wales (UNSW)",
  "杜伦大学": "Durham University",
  "南洋理工大学": "Nanyang Technological University (NTU)",
  "英属哥伦比亚大学": "University of British Columbia (UBC)",
  "伯明翰大学": "University of Birmingham",
  "新加坡国立大学": "National University of Singapore (NUS)",
  "埃默里大学": "Emory University",
  "北卡罗来纳大学教堂山分校": "University of North Carolina at Chapel Hill (UNC)",
  "莱斯大学": "Rice University",
  "卡耐基梅隆大学": "Carnegie Mellon University (CMU)",
  "不列颠哥伦比亚大学": "University of British Columbia (UBC)",
  "伯克利音乐学院": "Berklee College of Music",
  "清华大学": "Tsinghua University",
  "罗格斯大学": "Rutgers University",
  "加州理工学院": "California Institute of Technology (Caltech)",
  "普林斯顿大学": "Princeton University",
  "悉尼科技大学": "University of Technology Sydney (UTS)",
  "华盛顿大学西雅图分校": "University of Washington (UW)",
  "英国帝国理工学院": "Imperial College London",
  "麦吉尔大学": "McGill University",
  "卡内基梅隆大学": "Carnegie Mellon University (CMU)",
  "巴斯大学": "University of Bath",
  "格拉斯哥大学": "University of Glasgow",
  "布朗大学": "Brown University",
  "伦敦玛丽女王大学": "Queen Mary University of London (QMUL)",
  "谢菲尔德大学": "University of Sheffield",
  "诺丁汉大学": "University of Nottingham",
  "莫纳什大学": "Monash University",
  "范德堡大学": "Vanderbilt University",
  "中国香港大学": "The University of Hong Kong (HKU)",
  "马里兰艺术学院": "Maryland Institute College of Art (MICA)",
  "奥克兰大学": "University of Auckland",
  "阿尔伯塔大学": "University of Alberta",
  "加拿大多伦多大学": "University of Toronto",
  "波莫纳学院": "Pomona College",
  "韦尔斯利学院": "Wellesley College",
  "圣安德鲁斯大学": "University of St Andrews",
  "英国剑桥大学": "University of Cambridge",
  "密歇根大学": "University of Michigan",
  "佛罗里达大学": "University of Florida",
  "密歇根州立大学": "Michigan State University",
  "乔治城大学": "Georgetown University",
  "约翰斯·霍普金斯大学": "Johns Hopkins University",
  "罗切斯特大学": "University of Rochester",
  "北卡罗莱纳大学教堂山分校": "University of North Carolina at Chapel Hill",
  "UCL": "University College London (UCL)",
  "早稻田大学": "Waseda University",
  "西澳大学": "University of Western Australia",
  "伦敦大学国王学院": "King's College London",
  "滑铁卢大学": "University of Waterloo",
  "中国科学技术大学少年班": "University of Science and Technology of China (Special Class for the Gifted Young)",
  "英国爱丁堡大学": "University of Edinburgh",
  "英国伦敦大学学院": "University College London (UCL)",
  "加拿大麦吉尔大学": "McGill University",
  "麦克马斯特大学": "McMaster University",
  "加州大学圣克鲁兹分校": "University of California, Santa Cruz",
  "新西兰奥克兰大学": "University of Auckland",
  "奥蒂斯艺术设计学院": "Otis College of Art and Design",
  "慕尼黑工业大学": "Technical University of Munich (TUM)",
  "新加坡南洋理工大学": "Nanyang Technological University (NTU)",
  "帝国理工大学": "Imperial College London",
  "卡迪夫大学": "Cardiff University",
  "埃克塞特大学": "University of Exeter",
  "罗斯霍曼理工学院": "Rose-Hulman Institute of Technology",
  "英国曼彻斯特大学": "University of Manchester",
  "英国伯明翰大学": "University of Birmingham",
  "澳大利亚国立大学": "Australian National University (ANU)",
  "加州大学河滨分校": "University of California, Riverside",
  "蒙纳士大学马来西亚校区": "Monash University Malaysia",
  "纽约州立大学布法罗分校": "University at Buffalo, SUNY",
  "罗格斯大学卡姆登分校": "Rutgers University-Camden",
  "罗格斯大学纽华克分校": "Rutgers University-Newark",
  "威斯康星大学麦迪逊校区": "University of Wisconsin-Madison",
  "上海外国语大学附属外国语学校": "Shanghai International Studies University Affiliated Foreign Language School",
  "上海实验学校": "Shanghai Laboratory School",
  "皇家墨尔本理工大学": "RMIT University",
  "瑞林艺术与设计学院": "Ringling College of Art and Design",
  "罗格斯大学-新布朗斯维克分校": "Rutgers University-New Brunswick",
  "格林内尔学院": "Grinnell College",
  "英国布里斯托大学": "University of Bristol",
  "英国南安普顿大学": "University of Southampton",
  "美国莱斯大学": "Rice University",
  "纽约大学斯特恩商学院": "NYU Stern School of Business",
  "英国牛津大学": "University of Oxford",
  "哈弗福德学院": "Haverford College",
  "美国东北大学": "Northeastern University",
  "剑桥大学三一学院": "Trinity College, University of Cambridge",
  "华盛顿大学圣路易斯分校": "Washington University in St. Louis",
  "波士顿学院": "Boston College",
  "德州大学奥斯汀分校": "The University of Texas at Austin",
  "伦敦帝国学院": "Imperial College London",
  "爱默生学院": "Emerson College",
  "宾夕法尼亚大学沃顿商学院": "The Wharton School, University of Pennsylvania",
  "拉夫堡大学": "Loughborough University",
  "麦考瑞大学": "Macquarie University",
  "史密斯学院": "Smith College",
  "亚利桑那州立大学": "Arizona State University (ASU)",
  "卫斯理安大学": "Wesleyan University",
  "金史密斯大学": "Goldsmiths, University of London",
  "香港教育大学": "The Education University of Hong Kong (EdUHK)",
  "香港都会大学": "Hong Kong Metropolitan University (HKMU)",
  "肯特州立大学": "Kent State University",
  "新英格兰音乐学院": "New England Conservatory (NEC)",
  "曼哈顿音乐学院": "Manhattan School of Music (MSM)",
  "格拉斯哥艺术学院": "The Glasgow School of Art (GSA)",
  "伯明翰城市大学": "Birmingham City University (BCU)",
  "奥本大学": "Auburn University",
  "伦敦大学城市学院贝叶斯商学院": "Bayes Business School, City, University of London",
  "纽卡斯尔大学": "Newcastle University",
  "洛杉矶音乐学院": "Colburn School",
  "美国现代音乐学院": "Musicians Institute (MI)",
  "复旦大学": "Fudan University",
  "浙江大学": "Zhejiang University (ZJU)",
  "东京大学": "The University of Tokyo",
  "阿姆斯特丹大学": "University of Amsterdam (UvA)",
  "罗德岛设计学院": "Rhode Island School of Design (RISD)",
  "西北大学卡塔尔分校": "Northwestern University in Qatar",
  "哈佛大学教育学院": "Harvard Graduate School of Education (HGSE)",
  "哥大巴纳德学院": "Barnard College, Columbia University",
  "加州大学系列院校": "University of California (UC System)",
  "华盛顿大学-西雅图": "University of Washington, Seattle (UW)",
  "威斯康辛大学麦迪逊分校": "University of Wisconsin–Madison",
  "美国加州大学伯克利分校": "University of California, Berkeley (UC Berkeley)",
  "同济大学": "Tongji University",
  "中国香港科技大学": "The Hong Kong University of Science and Technology (HKUST)",
  "美国南加州大学": "University of Southern California (USC)",
  "美国圣路易斯华盛顿大学": "Washington University in St. Louis",
  "英国伦敦政治经济学院": "London School of Economics and Political Science (LSE)",
  "香港演艺学院": "The Hong Kong Academy for Performing Arts (HKAPA)",
  "俄罗斯人民友谊大学": "RUDN University (Peoples' Friendship University of Russia)",
  "普渡大学": "Purdue University",
  "德克萨斯大学奥斯汀分校": "The University of Texas at Austin",
  "威廉姆斯学院": "Williams College",
  "苏黎世联邦理工大学": "ETH Zurich",
  "阿德莱德大学": "University of Adelaide",
  "亚琛工业大学": "RWTH Aachen University",
  "马来西亚理工大学": "Universiti Teknologi Malaysia (UTM)",
  "新加坡管理大学": "Singapore Management University (SMU)",
  "高布兰动画学院": "Gobelins, l'école de l'image",
  "法国工艺美术学院ESMA": "ESMA (École Supérieure des Métiers Artistiques)",
  "韦仕敦大学": "Western University",
  "英国G5院校": "UK G5 Universities",
  "香港中文大学（深圳）": "The Chinese University of Hong Kong, Shenzhen (CUHK-Shenzhen)",
  "伊利诺伊香槟分校": "University of Illinois Urbana-Champaign (UIUC)",
  "香港城市大学（东莞）": "City University of Hong Kong (Dongguan)",
  "宾州州立大学法学院": "Penn State Law, Pennsylvania State University",
  "弗吉尼亚大学": "University of Virginia (UVA)",
  "巴纳德学院": "Barnard College",
  "麦卡莱斯特学院": "Macalester College",
  "PROMYS数学夏校": "PROMYS (Program in Mathematics for Young Scientists)",
  "斯坦福大学数学夏令营 SUMaC": "Stanford University Mathematics Camp (SUMaC)",
  "维克森林大学": "Wake Forest University",
  "加利福尼亚大学河滨分校": "University of California, Riverside (UC Riverside)",
  "加利福尼亚大学圣克鲁兹分校": "University of California, Santa Cruz (UC Santa Cruz)",
  "伦敦经济学院": "London School of Economics and Political Science (LSE)",
  "中国科学技术大学": "University of Science and Technology of China (USTC)",
  "上海交通大学": "Shanghai Jiao Tong University (SJTU)",
  "佩珀代因大学": "Pepperdine University",
  "女王大学": "Queen's University",
  "南澳大学": "University of South Australia (UniSA)",
  "约克大学": "University of York",
  "哈维穆德学院": "Harvey Mudd College",
  "美国纽约州立大学石溪分校": "Stony Brook University, State University of New York (SUNY Stony Brook)",
  "美国罗格斯大学": "Rutgers University",
  "澳大利亚莫那什大学": "Monash University",
  "英国格拉斯哥大学": "University of Glasgow",
  "英国利兹大学": "University of Leeds",
  "塔夫茨大学": "Tufts University",
  "宾夕法尼亚大学夏校": "University of Pennsylvania Pre-College Program",
  "加利福尼亚大学伯克利分校": "University of California, Berkeley (UC Berkeley)",
  "克利夫兰音乐学院": "Cleveland Institute of Music (CIM)",
  "伦敦大学皇家音乐学院": "Royal College of Music (RCM)",
  "安吉利亚鲁斯金大学": "Anglia Ruskin University (ARU)",
  "纽约时装学院": "Fashion Institute of Technology (FIT)",
  "约翰斯·霍普金斯大学皮博迪音乐学院": "Peabody Institute, Johns Hopkins University",
  "玛丽女王大学": "Queen Mary University of London (QMUL)",
  "罗马大学（萨皮恩扎大学）": "Sapienza University of Rome",
  "密歇根大学安娜堡校区": "University of Michigan, Ann Arbor (U-M)",
  "芝加哥艺术大学": "School of the Art Institute of Chicago (SAIC)",
  "洛桑酒店管理学院": "École hôtelière de Lausanne (EHL)",
  "艾米丽卡尔艺术学院": "Emily Carr University of Art + Design (ECUAD)",
  "谢尔丹学院": "Sheridan College",
  "海牙皇家艺术学院": "Royal Academy of Art, The Hague (KABK)",
  "伯恩茅斯艺术大学": "Arts University Bournemouth (AUB)",
  "南洋艺术学院": "Nanyang Academy of Fine Arts (NAFA)",
  "英国金斯顿大学": "Kingston University London",
  "苏格兰皇家音乐学院": "Royal Conservatoire of Scotland (RCS)",
  "伦敦大学皇家中央演讲与戏剧学院": "Royal Central School of Speech and Drama (RCSSD)",
  "安格利亚鲁斯金大学": "Anglia Ruskin University (ARU)",
  "上海戏剧学院": "Shanghai Theatre Academy",
  "金匠大学": "Goldsmiths, University of London",
  "美国MI现代音乐学院": "Musicians Institute (MI)",
  "ICN商学院": "ICN Business School",
  "剑桥大学（面试未录取）": "University of Cambridge (interviewed, not admitted)",
  "波士顿大学文理学院": "Boston University College of Arts & Sciences",
  "密歇根大学安娜堡": "University of Michigan, Ann Arbor",
  "艺术中心设计学院（ACCD）": "ArtCenter College of Design (ArtCenter)",
  "UIUC": "University of Illinois Urbana-Champaign (UIUC)",
  "KCL": "King's College London (KCL)",
  "辛辛那提大学": "University of Cincinnati",
  "西方学院": "Occidental College",
  "斯基德莫尔学院": "Skidmore College",
  "劳伦斯大学": "Lawrence University",
  "天普大学": "Temple University",
  "罗格斯大学新布朗斯维克分校": "Rutgers University–New Brunswick",
  "罗彻斯特大学": "University of Rochester",
  "巴黎政治学院": "Sciences Po",
  "多伦多大学（密西沙加校区）": "University of Toronto Mississauga (UTM)",
  "凯尼恩学院": "Kenyon College",
  "瑞林艺术学院": "Ringling College of Art and Design",
  "湖南大学": "Hunan University",
  "都柏林圣三一大学": "Trinity College Dublin (TCD)",
  "都柏林大学学院": "University College Dublin (UCD)",
  "爱尔兰皇家外科医院": "Royal College of Surgeons in Ireland (RCSI)",
  "荷兰乌特勒支大学": "Utrecht University",
  "格里昂酒店管理学院": "Glion Institute of Higher Education",
  "瑞士EHL洛桑酒店管理学院": "EHL Hospitality Business School",
  "大阪大学": "Osaka University",
  "法政大学": "Hosei University",
  "上智大学": "Sophia University",
  "剑桥大学·三一学院": "Trinity College, University of Cambridge",
  "美国哥伦比亚大学": "Columbia University",
  "科尔盖特大学": "Colgate University",
  "玛卡莱斯特学院": "Macalester College",
  "艾米丽卡尔艺术与设计大学": "Emily Carr University of Art + Design",
  "西门菲莎大学": "Simon Fraser University (SFU)",
  "宾州州立大学": "Pennsylvania State University (Penn State)",
  "加拿大韦士敦大学": "Western University (Canada)",
  "加拿大英属哥伦比亚大学": "University of British Columbia (UBC)",
  "加拿大滑铁卢大学": "University of Waterloo",
  "日本东北大学": "Tohoku University",
  "日本名古屋大学": "Nagoya University",
  "中国香港中文大学": "The Chinese University of Hong Kong (CUHK)",
  "中国香港城市大学": "City University of Hong Kong (CityU)",
  "中国香港理工大学": "The Hong Kong Polytechnic University (PolyU)",
  "荷兰埃因霍芬理工大学": "Eindhoven University of Technology (TU/e)",
  "荷兰格罗宁根大学": "University of Groningen",
  "美国密歇根大学安娜堡分校": "University of Michigan, Ann Arbor",
  "美国纽约大学Stern商学院": "NYU Stern School of Business",
  "美国加州大学洛杉矶分校": "University of California, Los Angeles (UCLA)",
  "圣三一拉邦音乐舞蹈学院": "Trinity Laban Conservatoire of Music and Dance",
  "伦敦现代舞学院": "London Contemporary Dance School",
  "英国Rambert芭蕾与现代舞学校": "Rambert School of Ballet and Contemporary Dance",
  "波士顿伯克利音乐学院": "Berklee College of Music",
  "美国加州大学圣地亚哥分校": "University of California, San Diego (UCSD)",
  "美国伊利诺伊大学香槟分校": "University of Illinois Urbana-Champaign (UIUC)",
  "美国密西根大学安娜堡分校": "University of Michigan, Ann Arbor",
  "美国史密斯学院": "Smith College",
  "日本东京大学": "The University of Tokyo",
  "美国康奈尔大学": "Cornell University",
  "美国波莫纳学院": "Pomona College",
  "美国范德堡大学": "Vanderbilt University",
  "北京外国语大学": "Beijing Foreign Studies University (BFSU)",
  "中国人民大学": "Renmin University of China (RUC)",
  "俄罗斯国家研究型高等经济大学": "HSE University (National Research University Higher School of Economics)",
  "俄罗斯国家研究型技术大学（莫斯科钢铁合金学院）": "NUST MISIS (National University of Science and Technology MISiS)",
  "卡尔加里大学": "University of Calgary",
  "密西根大学安娜堡分校": "University of Michigan, Ann Arbor",
  "IE大学": "IE University",
  "华盛顿大学（西雅图）": "University of Washington, Seattle (UW)",
  "不列颠哥伦比亚大学（UBC）": "University of British Columbia (UBC)",
  "伦敦大学学院（UCL）": "University College London (UCL)",
  "俄勒冈州立大学": "Oregon State University",
  "伊拉斯姆斯大学": "Erasmus University Rotterdam",
  "弗吉尼亚理工大学": "Virginia Tech (Virginia Polytechnic Institute and State University)",
  "马里兰大学帕克分校": "University of Maryland, College Park",
  "雪城大学": "Syracuse University",
  "南加州建筑学院": "Southern California Institute of Architecture (SCI-Arc)",
  "伦敦艺术大学切尔西艺术与设计学院": "Chelsea College of Arts, University of the Arts London (UAL)",
  "圣塔克拉拉大学": "Santa Clara University",
  "圣何塞州立大学": "San José State University (SJSU)",
  "巴黎文理研究大学": "Université PSL (Paris Sciences et Lettres)",
  "奥克兰理工大学": "Auckland University of Technology (AUT)",
  "东华学院": "Tung Wah College",
  "德累斯顿工业大学": "Technische Universität Dresden (TU Dresden)",
  "格拉斯哥艺术大学": "The Glasgow School of Art (GSA)",
  "蒙彼利埃高等动画电影与特效学院ARTFX": "ARTFX School (École Supérieure des Métiers Artistiques)",
  "美国曼彻斯特大学（罗切斯特理工学院）": "Rochester Institute of Technology (RIT)",
  "纽约州立大学石溪分校": "Stony Brook University (State University of New York at Stony Brook)",
  "马来西亚泰莱大学": "Taylor's University (Malaysia)",
  "卢比卡设计与游戏动画学院RUBIKA": "RUBIKA (School of Design, Animation & Video Games)",
  "MoPA动画学院": "MoPA (école MoPA)",
  "柯蒂斯音乐学院": "Curtis Institute of Music",
  "明尼苏达大学": "University of Minnesota",
  "凯斯西储大学": "Case Western Reserve University",
  "HEC Paris-耶鲁大学": "HEC Paris – Yale University",
  "史蒂文斯理工学院": "Stevens Institute of Technology",
  "新泽西理工学院": "New Jersey Institute of Technology (NJIT)",
  "加州大学默塞德分校": "University of California, Merced (UC Merced)",
  "艾玛威拉德女子中学": "Emma Willard School",
  "特拉华大学": "University of Delaware",
  "圣母大学": "University of Notre Dame",
  "UCLA": "University of California, Los Angeles (UCLA)",
  "UCSD": "University of California, San Diego (UCSD)",
  "USC": "University of Southern California (USC)",
  "马里兰大学": "University of Maryland",
  "洛约拉马利蒙特大学": "Loyola Marymount University (LMU)",
  "美利坚大学": "American University",
  "NMH（北田山高中）": "Northfield Mount Hermon School (NMH)",
  "罗切斯特理工大学": "Rochester Institute of Technology (RIT)",
  "考陶德艺术学院": "The Courtauld Institute of Art",
  "哥伦比亚大学国际与公共事务学院": "Columbia University School of International and Public Affairs (SIPA)",
  "南加州大学安纳伯格传播学院": "USC Annenberg School for Communication and Journalism",
  "三一学院": "Trinity College",
  "贝洛伊特学院": "Beloit College",
  "中南财经政法大学": "Zhongnan University of Economics and Law",
  "LSE伦敦政治经济学院": "London School of Economics and Political Science (LSE)",
  "UCL伦敦大学学院": "University College London (UCL)",
  "UCLA加州大学洛杉矶分校": "University of California, Los Angeles (UCLA)",
  "UCSD加州大学圣地亚哥分校": "University of California, San Diego (UCSD)",
  "UC Davis加州大学戴维斯分校": "University of California, Davis (UC Davis)",
  "USC南加州大学": "University of Southern California (USC)",
  "罗格斯大学新布朗斯维克主校": "Rutgers University–New Brunswick",
  "澳洲蒙纳士大学": "Monash University",
  "PROMYS Italia（意大利青少年数学夏令营）": "PROMYS Italia",
  "暨南大学": "Jinan University",
  "马来西亚博特拉大学": "Universiti Putra Malaysia (UPM)",
  "英国杜伦大学": "Durham University",
  "西北师范大学": "Northwest Normal University",
  "澳洲国立大学": "Australian National University (ANU)",
  "加州理工大学": "California Institute of Technology (Caltech)",
  "宾夕法尼亚大学工程学院": "University of Pennsylvania School of Engineering and Applied Science (Penn Engineering)",
  "加州大学梅塞德分校": "University of California, Merced (UC Merced)",
  "皇家兽医学院": "Royal Veterinary College (RVC)",
  "霍特国际商学院": "Hult International Business School",
  "福特汉姆大学": "Fordham University",
  "慕尼黑大学": "Ludwig Maximilian University of Munich (LMU Munich)",
  "海德堡大学": "Heidelberg University",
  "柏林自由大学": "Free University of Berlin (FU Berlin)",
  "卡尔斯鲁厄理工学院": "Karlsruhe Institute of Technology (KIT)",
  "剑桥大学（面邀）": "University of Cambridge",
  "汤布里奇公学（Tonbridge School）": "Tonbridge School",
  "伊斯曼音乐学院": "Eastman School of Music",
  "温切斯特公学": "Winchester College",
  "惠灵顿公学": "Wellington College",
  "哈佛设计学院研究生院": "Harvard Graduate School of Design (GSD)",
  "乌得勒支大学": "Utrecht University",
  "芝加哥艺术学校": "School of the Art Institute of Chicago (SAIC)",
  "英国皇家艺术学院": "Royal College of Art (RCA)",
  "加州大学滨河分校": "University of California, Riverside (UC Riverside)",
  "拉格比公学": "Rugby School",
  "匹兹堡大学": "University of Pittsburgh",
  "麻省总医院": "Massachusetts General Hospital",
  "巴黎高商": "HEC Paris",
  "多所顶尖大学（未具体说明）": "Multiple top universities (unspecified)",
  "香港科技大学（广州）": "The Hong Kong University of Science and Technology (Guangzhou) (HKUST-GZ)",
  "北京师范大学-香港浸会大学联合国际学院": "Beijing Normal University - Hong Kong Baptist University United International College (UIC)",
  "藤校": "Ivy League",
  "加州大学圣芭芭拉分校": "University of California, Santa Barbara (UCSB)",
  "香港浸会大学": "Hong Kong Baptist University (HKBU)",
  "内布拉斯加大学": "University of Nebraska",
  "乔治敦大学": "Georgetown University",
  "纽约州立大学奥尔巴尼分校": "University at Albany, State University of New York (SUNY Albany)",
  "某藤校": "An Ivy League university (unspecified)",
  "兰卡斯特大学": "Lancaster University",
  "加拿大不列颠哥伦比亚大学（UBC）": "University of British Columbia (UBC)",
  "加州大学": "University of California (UC)",
  "瑞士洛桑酒店管理学校帕苏格校区": "École hôtelière de Lausanne (EHL) – Passugg Campus",
  "思克莱德大学": "University of Strathclyde",
  "南安普敦大学": "University of Southampton",
  "澳门理工大学": "Macao Polytechnic University",
  "华东师范大学第二附属中学": "The Second Affiliated High School of East China Normal University",
  "北京大学光华管理学院": "Guanghua School of Management, Peking University",
  "芝加哥大学布斯商学院": "University of Chicago Booth School of Business",
  "萨凡纳艺术学院": "Savannah College of Art and Design (SCAD)",
  "维思大学": "Vassar College",
  "威斯里安大学": "Wesleyan University",
  "乔治城大学卡塔尔校区": "Georgetown University in Qatar",
  "伊利诺伊卫斯理安大学": "Illinois Wesleyan University",
  "英国剑桥大学（面试邀请）": "University of Cambridge (Interview Invitation)",
  "澳大利亚墨尔本大学": "University of Melbourne",
  "澳大利亚悉尼大学": "University of Sydney",
  "美国加州大学欧文分校": "University of California, Irvine (UCI)",
  "美国加州大学戴维斯分校": "University of California, Davis (UC Davis)",
  "美国加州大学圣芭芭拉分校": "University of California, Santa Barbara (UCSB)",
  "美国俄亥俄州立大学": "The Ohio State University",
  "美国加州大学默塞德分校": "University of California, Merced (UC Merced)",
  "澳大利亚新南威尔士大学": "University of New South Wales (UNSW)",
  "英国华威大学": "University of Warwick",
  "英国伦敦艺术大学": "University of the Arts London (UAL)",
  "达尔豪斯大学": "Dalhousie University",
  "明尼苏达大学双城分校": "University of Minnesota Twin Cities",
  "巴德学院": "Bard College",
  "科罗拉多学院": "Colorado College",
  "宾夕法尼亚大学沃顿商学院全球青年项目": "University of Pennsylvania Wharton School Global Youth Program",
  "霍奇基斯中学": "The Hotchkiss School",
  "佩迪中学": "The Peddie School",
  "迪尔菲尔德学院": "Deerfield Academy",
  "鲁米斯查菲高中": "Loomis Chaffee School",
  "清华大学（姚班）": "Tsinghua University (Yao Class)",
  "伦斯勒理工学院": "Rensselaer Polytechnic Institute (RPI)",
  "汉密尔顿学院": "Hamilton College",
  "纽约州立大学": "State University of New York (SUNY)",
  "卡尔顿大学": "Carleton University",
  "多伦多都市大学": "Toronto Metropolitan University",
  "麻省理工大学": "Massachusetts Institute of Technology (MIT)",
  "加拿大航空学院": "Canadian Aviation College",
  "汤姆逊大学": "Thompson Rivers University",
  "里贾纳大学": "University of Regina",
  "湖首大学": "Lakehead University",
  "渥太华大学": "University of Ottawa",
  "布兰迪斯大学": "Brandeis University",
  "加州大学伯克利": "University of California, Berkeley (UC Berkeley)",
  "UBC": "University of British Columbia (UBC)",
  "瑞士酒店管理学校": "Swiss Hotel Management School (SHMS)",
  "北卡罗莱纳州立大学教堂山分校": "University of North Carolina at Chapel Hill (UNC Chapel Hill)",
  "伦敦艺术大学中央圣马丁学院": "Central Saint Martins, University of the Arts London",
  "英国皇家音乐学院": "Royal Academy of Music",
  "曼尼斯音乐学院": "Mannes School of Music",
  "旧金山音乐学院": "San Francisco Conservatory of Music",
  "南加州大学桑顿音乐学院": "USC Thornton School of Music",
  "宾州州立大学帕克分校": "Pennsylvania State University, University Park",
  "北卡州立大学": "North Carolina State University (NC State)",
  "罗格斯大学新布鲁斯维克主校区": "Rutgers University–New Brunswick",
  "纽约州立大学宾汉姆顿分校": "Binghamton University, State University of New York",
  "布莱恩特大学": "Bryant University",
  "盖茨堡学院": "Gettysburg College",
  "瑞士酒店管理大学": "École hôtelière de Lausanne (EHL)",
  "美国大学": "American University",
  "立命馆大学": "Ritsumeikan University",
  "伦敦大学学院UCL": "University College London (UCL)",
  "美国哥伦比亚大学-香港城市大学双学位项目": "Columbia University & City University of Hong Kong Dual Degree Program",
  "哥伦比亚大学与巴黎政治学院双学位项目": "Columbia University & Sciences Po Dual Degree Program",
  "哥伦比亚大学与香港城市大学双学位项目": "Columbia University & City University of Hong Kong Dual Degree Program",
  "上海外国语大学附属浦东外国语学校": "Shanghai Foreign Language School Attached to SISU (Pudong)",
  "温州森马协和国际高中": "Wenzhou Semir Xiehe International High School",
  "美本Top 10顶尖名校": "Top 10 US Universities (specific names not disclosed)",
  "美国Top20文理学院（具体校名未披露）": "Top 20 US Liberal Arts Colleges (names not disclosed)",

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
  "心理学": "Psychology",
  "物理": "Physics",
  "机械工程": "Mechanical Engineering",
  "传媒": "Media Studies",
  "商业与管理": "Business and Management",
  "艺术与科学": "Arts and Sciences",
  "金融": "Finance",
  "自然科学": "Natural Sciences",
  "市场营销": "Marketing",
  "数学与统计": "Mathematics and Statistics",
  "法学博士（JD）": "Juris Doctor (JD)",
  "生物医学": "Biomedical Science",
  "工商管理": "Business Administration",
  "环境科学": "Environmental Science",
  "生物医学工程": "Biomedical Engineering",
  "国际关系": "International Relations",
  "心理与行为科学": "Psychology and Behavioural Sciences",
  "公共管理": "Public Administration",
  "神经科学": "Neuroscience",
  "人工智能": "Artificial Intelligence",
  "化学工程": "Chemical Engineering",
  "生物化学": "Biochemistry",
  "时尚设计": "Fashion Design",
  "空间数据学科与智慧城市": "Spatial Data Science and Smart Cities",
  "银行金融": "Banking and Finance",
  "政治学": "Political Science",
  "音乐": "Music",
  "公共卫生": "Public Health",
  "管理": "Management",
  "材料科学": "Materials Science",
  "数据科学硕士": "Master of Science in Data Science",
  "数字媒体设计": "Digital Media Design",
  "计算机": "Computer Science",
  "航空航天工程": "Aerospace Engineering",
  "国际商务、金融与经济学": "International Business, Finance and Economics",
  "数字媒体": "Digital Media",
  "哲学": "Philosophy",
  "精算": "Actuarial Science",
  "酒店管理": "Hospitality Management",
  "法律": "Law",
  "会计": "Accounting",
  "插画": "Illustration",
  "作曲": "Music Composition",
  "管理学": "Management Studies",
  "数学与经济": "Mathematics and Economics",
  "医学生物科学": "Medical Biosciences",
  "金融科技": "FinTech",
  "国际商务": "International Business",
  "经济史": "Economic History",
  "时尚管理": "Fashion Management",
  "法学": "Law",
  "语言学": "Linguistics",
  "生物医学科学": "Biomedical Science",
  "东亚研究": "East Asian Studies",
  "电气工程": "Electrical Engineering",
  "信息系统": "Information Systems",
  "艺术": "Art",
  "工程学": "Engineering",
  "公共政策": "Public Policy",
  "体育管理": "Sport Management",
  "应用数据科学（MSADS）": "Applied Data Science (MSADS)",
  "政治与国际关系": "Politics and International Relations",
  "数据科学和经济学": "Data Science and Economics",
  "生医工程": "Biomedical Engineering",
  "统计科学硕士": "MSc Statistical Science",
  "统计学硕士": "MSc Statistics",
  "产品设计": "Product Design",
  "建筑": "Architecture",
  "服装设计": "Fashion Design",
  "电子工程": "Electronic Engineering",
  "材料科学与工程": "Materials Science and Engineering",
  "商务管理": "Business Management",
  "性别研究": "Gender Studies",
  "人力资源管理": "Human Resource Management",
  "Morse": "MORSE",
  "量化金融": "Quantitative Finance",
  "教育": "Education",
  "物理学": "Physics",
  "政治科学": "Political Science",
  "PPE（哲学、政治与经济）": "PPE (Philosophy, Politics and Economics)",
  "政治与数据科学": "Politics and Data Science",
  "MORSE": "MORSE (Mathematics, Operational Research, Statistics and Economics)",
  "数学与管理和金融": "Mathematics with Management and Finance",
  "生命科学": "Life Sciences",
  "纯艺": "Fine Art",
  "商业经济学": "Business Economics",
  "法学硕士（LLM）": "Master of Laws (LLM)",
  "商业分析": "Business Analytics",
  "管理学硕士": "Master of Management",
  "整合营销硕士": "Master of Integrated Marketing",
  "统计学": "Statistics",
  "机器学习与数据科学": "Machine Learning and Data Science",
  "自然科学（地球和行星科学）": "Natural Sciences (Earth and Planetary Sciences)",
  "应用临床医学": "Applied Clinical Medicine",
  "建筑工程项目管理": "Construction Project Management",
  "土地经济": "Land Economy",
  "数据与系统工程": "Data and Systems Engineering",
  "政治与经济": "Politics and Economics",
  "国际社会与公共政策（含经济学）": "International Social and Public Policy (with Economics)",
  "理学士": "Bachelor of Science (BSc)",
  "建筑学": "Architecture",
  "古典学": "Classics",
  "城市规划": "Urban Planning",
  "土木工程": "Civil Engineering",
  "纳米技术": "Nanotechnology",
  "计算机科学与工程": "Computer Science and Engineering",
  "会计硕士": "Master of Accounting",
  "商业经济与战略": "Business Economics and Strategy",
  "应用计算机科学与工程": "Applied Computer Science and Engineering",
  "移动与个人通信": "Mobile and Personal Communications",
  "创新与创业": "Innovation and Entrepreneurship",
  "高级机械工程": "Advanced Mechanical Engineering",
  "早期教育": "Early Childhood Education",
  "国际金融市场": "International Financial Markets",
  "时尚企业与社会": "Fashion Business and Society",
  "银行与金融": "Banking and Finance",
  "建筑设计": "Architectural Design",
  "应用计算科学与工程": "Applied Computing Science and Engineering",
  "金融数学": "Financial Mathematics",
  "投资金融": "Investment Finance",
  "数学交易与金融": "Mathematical Trading and Finance",
  "安全与复原": "Security and Resilience",
  "应用商业分析": "Applied Business Analytics",
  "面料设计": "Textile Design",
  "信息管理": "Information Management",
  "全球遗产管理": "Global Heritage Management",
  "古建筑保护": "Historic Building Conservation",
  "藏馆护理": "Collection Care",
  "大数据科学": "Big Data Science",
  "无线与微波通信": "Wireless and Microwave Communications",
  "电气工程与智能电网": "Electrical Engineering and Smart Grids",
  "音乐制作": "Music Production",
  "视觉传达设计": "Visual Communication Design",
  "人类发展与教育": "Human Development and Education",
  "公共健康": "Public Health",
  "政治经济学": "Political Economy",
  "地球与行星科学": "Earth and Planetary Sciences",
  "政府学": "Government",
  "数学与物理科学": "Mathematics and Physical Sciences",
  "航空工程": "Aeronautical Engineering",
  "分子生物工程": "Molecular Bioengineering",
  "生物技术": "Biotechnology",
  "商学": "Business Studies",
  "游戏设计": "Game Design",
  "环境研究": "Environmental Studies",
  "金融经济学": "Financial Economics",
  "信息技术": "Information Technology",
  "生物统计": "Biostatistics",
  "金融与经济学": "Finance and Economics",
  "金融工程": "Financial Engineering",
  "商务学硕士": "Master of Business",
  "市场营销硕士": "Master of Marketing",
  "土木工程硕士": "Master of Civil Engineering",
  "公共关系硕士": "Master of Public Relations",
  "智能制造硕士": "Master of Intelligent Manufacturing",
  "JD（法学博士）": "JD (Juris Doctor)",
  "公共管理硕士": "Master of Public Administration (MPA)",
  "土木与环境工程": "Civil and Environmental Engineering",
  "统计": "Statistics",
  "数学与金融": "Mathematics and Finance",
  "传播学": "Communication Studies",
  "计算机生物": "Computational Biology",
  "地理": "Geography",
  "非洲研究": "African Studies",
  "文理（Arts and Sciences BASc）": "Arts and Sciences (BASc)",
  "机械电气与工程": "Mechanical, Electrical and Engineering",
  "生物科学": "Biological Sciences",
  "人文艺术与社会科学": "Humanities, Arts and Social Sciences",
  "商业与经济学": "Business and Economics",
  "影视配乐": "Film and TV Scoring",
  "药学": "Pharmacy",
  "兽医": "Veterinary Medicine",
  "物理学（MPhys）": "Physics (MPhys)",
  "医学院": "Medical School",
  "科学学士": "Bachelor of Science (BSc)",
  "科学（B类）": "Science (Type B)",
  "历史与政治": "History and Politics",
  "金融商业管理": "Finance and Business Management",
  "商科/创业": "Business / Entrepreneurship",
  "统计学(数据科学)硕士": "Master of Statistics (Data Science)",
  "统计学（数据科学）硕士": "Master of Statistics (Data Science)",
  "电影制作": "Film Production",
  "经济与金融": "Economics and Finance",
  "科学": "Science",
  "工程与建筑设计": "Engineering and Architectural Design",
  "国际关系与商业管理": "International Relations and Business Management",
  "电子电气工程（EEE）": "Electronic and Electrical Engineering (EEE)",
  "计算机与人工智能": "Computer Science and Artificial Intelligence",
  "自然科学（物理）": "Natural Sciences (Physics)",
  "物理与天体物理": "Physics and Astrophysics",
  "计算机编程": "Computer Programming",
  "设计工艺": "Design and Craft",
  "管理与技术（M&T双学位）": "Management and Technology (M&T Dual Degree)",
  "环境地球科学": "Environmental Earth Sciences",
  "影像与数字媒体": "Image & Digital Media",
  "应用人工智能": "Applied Artificial Intelligence",
  "舞美设计": "Stage Design",
  "制作艺术与设计": "Production Arts and Design",
  "新药生物工艺": "Biopharmaceutical Process Development",
  "全球健康与社会医学": "Global Health and Social Medicine",
  "医学创新与企业": "Medical Innovation and Enterprise",
  "生物医学技术风险投资": "Biomedical Technology Venture",
  "商业统计与管理": "Business Statistics and Management",
  "统计经济与管理": "Statistics, Economics and Management",
  "影视摄影与制作": "Film Cinematography and Production",
  "生物人类学": "Biological Anthropology",
  "心理学与哲学": "Psychology and Philosophy",
  "词曲创作与制作": "Songwriting and Music Production",
  "汉语国际教育": "Teaching Chinese as an International Language",
  "行政管理": "Public Administration",
  "商学（Fisher商学院）": "Business (Fisher College of Business)",
  "经济学（研究生）": "Economics (Graduate)",
  "文理专业": "Liberal Arts",
  "传播（计划转专业）": "Communication (Intended Transfer)",
  "化学工程（入学）→ 电子与计算机工程（ECE，转专业后）": "Chemical Engineering (Enrolled) → Electrical and Computer Engineering (ECE, After Transfer)",
  "数学与数据科学": "Mathematics and Data Science",
  "应用心理学": "Applied Psychology",
  "海洋生物": "Marine Biology",
  "数学和计算机": "Mathematics and Computer Science",
  "工商管理（光华管理学院）": "Business Administration (Guanghua School of Management)",
  "食品科学": "Food Science",
  "地球科学": "Earth Sciences",
  "经济金融与数据科学": "Economics, Finance and Data Science",
  "计算机与哲学": "Computer Science and Philosophy",
  "人工智能与哲学": "Artificial Intelligence and Philosophy",
  "电影配乐": "Film Scoring",
  "社会学+教育学+舞蹈": "Sociology + Education + Dance",
  "计算机（AI情感计算）": "Computer Science (Affective Computing / AI)",
  "商科 (Rotman商学院)": "Business (Rotman School of Management)",
  "电气电子工程": "Electrical and Electronic Engineering",
  "医学/生物相关": "Medicine / Biology Related",
  "数学相关": "Mathematics Related",
  "视觉设计": "Visual Design",
  "艺术设计学": "Art and Design",
  "美术与视觉艺术": "Fine Arts and Visual Arts",
  "沉浸式媒体与虚拟混合现实": "Immersive Media and Mixed Reality (XR)",
  "生物化学与生物科技": "Biochemistry and Biotechnology",
  "英语/创意写作": "English / Creative Writing",
  "商学院（Ivey AEO）": "Business (Ivey Business School AEO)",
  "医博类": "Pre-Medicine / Medical Programs",
  "综合类": "General / Undeclared",
  "经济与法律（交叉方向）": "Economics and Law (Interdisciplinary)",
  "现代舞": "Contemporary Dance",
  "舞蹈": "Dance",
  "工程（工程技术与医疗健康方向）": "Engineering (Engineering Technology and Healthcare)",
  "心理": "Psychology",
  "数学与计算机科学": "Mathematics and Computer Science",
  "数学与应用数学": "Mathematics and Applied Mathematics",
  "心血管（硕士）": "Cardiovascular Science (MSc)",
  "医学科学（博士）": "Medical Science (PhD)",
  "兽医（急诊与重症监护方向）": "Veterinary Medicine (Emergency and Critical Care)",
  "物理相关专业": "Physics-related Programs",
  "LEAPS项目": "LEAPS Program",
  "应用医学科学": "Applied Medical Sciences",
  "教育心理学": "Educational Psychology",
  "天体物理": "Astrophysics",
  "会计与金融": "Accounting and Finance",
  "量子计算（意向）": "Quantum Computing (Intended)",
  "理学学士": "Bachelor of Science (BSc)",
  "应用科学": "Applied Science",
  "材料工程": "Materials Engineering",
  "数学/金融分析与风险管理": "Mathematics / Financial Analysis and Risk Management",
  "早期儿童教育": "Early Childhood Education",
  "教育社会与文化": "Education, Society and Culture",
  "教育领导力与文化": "Educational Leadership and Culture",
  "人工智能与媒体（AI and Media）": "Artificial Intelligence and Media (AI and Media)",
  "理工科专业": "Science and Engineering Programs",
  "工科实验班": "Engineering Honors Program",
  "创业": "Entrepreneurship",
  "时尚公共关系与传媒": "Fashion Public Relations and Media",
  "电子与信息工程": "Electronic and Information Engineering",
  "生物医药技术风险投资": "Biomedical Technology Venture Capital",
  "计算机科学与生物工程": "Computer Science and Bioengineering",
  "商业与社会科学": "Business and Social Sciences",
  "人体运动学": "Kinesiology",
  "机械工程科学": "Mechanical Engineering Science",
  "文理通识": "Liberal Arts and Sciences",
  "Fashion（Knitwear Design）": "Fashion (Knitwear Design)",
  "古典哲学": "Classical Philosophy",
  "运动与体育科学": "Sport and Exercise Science",
  "体育、运动与健康": "Physical Education, Sport and Health",
  "言语治疗与康复": "Speech Therapy and Rehabilitation",
  "社会科学心理学": "Psychology (Social Sciences)",
  "幼儿教育": "Early Childhood Education",
  "体育和电子竞技管理": "Sports and Esports Management",
  "社会工作": "Social Work",
  "电子及信息技术": "Electronics and Information Technology",
  "制药生物过程技术": "Pharmaceutical Bioprocess Technology",
  "运动与医学科学": "Sport and Medical Sciences",
  "生物与医学工程": "Biomedical Engineering",
  "统计与金融": "Statistics and Finance",
  "实验心理学": "Experimental Psychology",
  "自然科学（生化方向）": "Natural Sciences (Biochemistry)",
  "自然科学（物化方向）": "Natural Sciences (Physical Chemistry)",
  "传媒学": "Media Studies",
  "商业智能与分析": "Business Intelligence and Analytics",
  "金融学（硕士方向）": "Finance (Master's)",
  "动画艺术": "Animation Arts",
  "集成设计与媒体": "Integrated Design and Media",
  "IT": "Information Technology (IT)",
  "经济商科": "Economics and Business",
  "人文社会政治科学": "Humanities, Social and Political Sciences",
  "工程科学": "Engineering Science",
  "精算科学": "Actuarial Science",
  "计算机与数据科学": "Computer Science and Data Science",
  "统计决策": "Statistical Decision Making",
  "地球学与资源管理": "Earth Sciences and Resource Management",
  "法学硕士 LLM": "Master of Laws (LLM)",
  "软件工程": "Software Engineering",
  "城市数据科学与分析": "Urban Data Science and Analytics",
  "计算科学": "Computational Science",
  "计算机音乐": "Computer Music",
  "哲学系": "Philosophy",
  "临床医学（卓越医师-科学家计划）": "Clinical Medicine (Distinction Clinician-Scientist Programme)",
  "体育科技理学士": "Bachelor of Science in Sports Technology",
  "能源工程": "Energy Engineering",
  "智能建筑物技术与管理": "Intelligent Building Technology and Management",
  "电子及计算机工程": "Electronic and Computer Engineering",
  "教学与教师领导力": "Teaching and Teacher Leadership",
  "生物统计与数据科学": "Biostatistics and Data Science",
  "物理学 PhD": "PhD in Physics",
  "战略传播": "Strategic Communication",
  "IMC整合营销传播": "Integrated Marketing Communication (IMC)",
  "行为决策科学": "Behavioral Decision Science",
  "机器学习硕士": "Master of Science in Machine Learning",
  "MIIS": "Master of International and Intercultural Studies (MIIS)",
  "CS计算机科学": "Computer Science (CS)",
  "M2M双学位": "M2M Dual Degree",
  "风险管理与金融工程": "Risk Management and Financial Engineering",
  "网络安全硕士（应用密码学方向）": "Master of Cybersecurity (Applied Cryptography)",
  "人力资本管理与分析硕士": "Master of Human Capital Management and Analytics",
  "全球管理硕士": "Master of Global Management",
  "知识管理硕士": "Master of Science in Knowledge Management",
  "国际人力资源管理硕士": "Master of Science in International Human Resource Management",
  "人力资源管理与组织分析硕士": "Master of Science in Human Resource Management and Organisational Analysis",
  "人力资源管理与劳资关系硕士": "Master of Science in Human Resource Management and Industrial Relations",
  "音乐治疗": "Music Therapy",
  "土木工程硕士（基础设施数字化与管理）": "Master of Science in Civil Engineering (Digital Infrastructure and Management)",
  "国际建筑管理硕士": "Master of Science in International Construction Management",
  "机械工程硕士": "Master of Science in Mechanical Engineering",
  "电气与计算机工程硕士": "Master of Science in Electrical and Computer Engineering",
  "电气与计算机工程硕士-机器学习与数据科学": "Master of Science in Electrical and Computer Engineering - Machine Learning and Data Science",
  "工程数据分析与统计硕士": "Master of Science in Engineering Data Analytics and Statistics",
  "哲学、政治与经济学硕士": "Master of Arts in Philosophy, Politics and Economics",
  "教育学硕士（教育行政与管理方向）": "Master of Education (Educational Administration and Management)",
  "科学人工智能硕士": "Master of Science in Artificial Intelligence",
  "商业信息系统硕士（智能系统管理方向）": "Master of Science in Business Information Systems (Intelligent Systems Management)",
  "新闻学硕士": "Master of Science in Journalism",
  "智能建筑物技术与管理硕士": "Master of Science in Intelligent Building Technology and Management",
  "土木与建筑工程硕士": "Master of Science in Civil and Architectural Engineering",
  "电力工程硕士": "Master of Science in Electrical Power Engineering",
  "电力系统硕士": "Master of Science in Power Systems",
  "电子与计算机工程硕士": "Master of Science in Electronic and Computer Engineering",
  "网络安全工程硕士": "Master of Science in Cybersecurity Engineering",
  "网络安全硕士": "Master of Science in Cybersecurity",
  "光通信与信号处理硕士": "Master of Science in Optical Communications and Signal Processing",
  "通信与信号处理硕士": "Master of Science in Communications and Signal Processing",
  "通信与信息工程硕士": "Master of Science in Communications and Information Engineering",
  "人工智能硕士": "Master of Science in Artificial Intelligence",
  "低空经济硕士": "Master of Science in Low-Altitude Economy",
  "运营与供应链管理硕士": "Master of Science in Operations and Supply Chain Management",
  "物理学数据建模与量子技术硕士": "Master of Science in Data Modelling and Quantum Technologies in Physics",
  "公共关系与企业传播硕士": "Master of Science in Public Relations and Corporate Communications",
  "碳中和可持续科技硕士": "Master of Science in Carbon Neutrality and Sustainable Technology",
  "可持续能源硕士": "Master of Science in Sustainable Energy",
  "材料工程与纳米技术硕士": "Master of Science in Materials Engineering and Nanotechnology",
  "计算机与信息工程硕士": "Master of Science in Computer and Information Engineering",
  "城市信息学与智慧城市硕士": "Master of Science in Urban Informatics and Smart Cities",
  "公共政策与管理硕士": "Master of Science in Public Policy and Management",
  "材料科学与工程硕士": "Master of Science in Materials Science and Engineering",
  "电子资讯工程硕士": "Master of Science in Electronic and Information Engineering",
  "文社科": "Humanities and Social Sciences",
  "国际关系硕士（CIR）": "Master of Arts in International Relations (CIR)",
  "法学LLM": "Master of Laws (LLM)",
  "数学与计算科学": "Mathematics and Computational Science",
  "数学与物理科": "Mathematics and Physics",
  "交叉学科（数据科学/心理学/人机交互）": "Interdisciplinary Studies (Data Science / Psychology / Human-Computer Interaction)",
  "中国文学与语言学": "Chinese Literature and Linguistics",
  "计算生物": "Computational Biology",
  "脑科学": "Brain Science",
  "生物医学信息学": "Biomedical Informatics",
  "健康数据科学": "Health Data Science",
  "生物医学工程/神经工程": "Biomedical Engineering / Neural Engineering",
  "统计与数据科学硕士": "Master of Statistics and Data Science",
  "景观建筑": "Landscape Architecture",
  "计算机图形与游戏技术": "Computer Graphics and Game Technology",
  "计算机与信息技术": "Computer and Information Technology",
  "天文学": "Astronomy",
  "计算生物学与生物医学信息学": "Computational Biology and Biomedical Informatics",
  "计算生物学与量化遗传学": "Computational Biology and Quantitative Genetics",
  "生物统计学": "Biostatistics",
  "计算生物学/生物信息学": "Computational Biology / Bioinformatics",
  "金融经济学硕士": "Master of Financial Economics",
  "定量经济学硕士": "Master of Quantitative Economics",
  "经济学硕士": "Master of Economics",
  "心理学硕士": "Master of Psychology",
  "国际关系硕士": "Master of International Relations",
  "外交事务硕士": "Master of Diplomatic Affairs",
  "国际事务硕士": "Master of International Affairs",
  "社会政策硕士": "Master of Social Policy",
  "社会科学定量方法硕士": "Master of Quantitative Methods in Social Science",
  "公共政策硕士": "Master of Public Policy",
  "社会科学硕士": "Master of Social Science",
  "教育科技硕士": "Master of Educational Technology",
  "教育心理学硕士": "Master of Educational Psychology",
  "发展心理学硕士": "Master of Developmental Psychology",
  "理科专业": "Science (General)",
  "公共卫生硕士（微生物流行病学）": "Master of Public Health (Microbial Epidemiology)",
  "流行病学理学硕士": "Master of Science in Epidemiology",
  "人文硕士（MAPH）": "Master of Arts Program in the Humanities (MAPH)",
  "艺术史硕士": "Master of Art History",
  "公共管理硕士（MPA）": "Master of Public Administration (MPA)",
  "公共政策硕士（MPP）": "Master of Public Policy (MPP)",
  "社会工作硕士（MSW）": "Master of Social Work (MSW)",
  "心理健康咨询硕士": "Master of Mental Health Counseling",
  "心理健康与幸福咨询硕士": "Master of Counseling in Mental Health and Wellness",
  "物理哲学（本硕连读）": "Philosophy of Physics (Integrated Bachelor's/Master's)",
  "理科（未具名）": "Science (Unspecified)",
  "工商管理学士及法学博士双学位": "Bachelor of Business Administration / Juris Doctor (BBA/JD)",
  "EECS": "Electrical Engineering and Computer Science (EECS)",
  "文理学院": "College of Arts and Sciences",
  "计算机科学与音乐交叉方向": "Computer Science and Music (Interdisciplinary)",
  "符号系统科学": "Symbolic Systems",
  "电气与计算机工程": "Electrical and Computer Engineering",
  "会计基本面分析": "Accounting Fundamentals Analysis",
  "MIEF（国际经济金融）": "Master of International Economics and Finance (MIEF)",
  "环境健康科学": "Environmental Health Sciences",
  "运筹学": "Operations Research",
  "可持续管理": "Sustainable Management",
  "公卫-生物统计与数据科学": "Public Health - Biostatistics and Data Science",
  "社会政策+数据分析证书": "Social Policy with Certificate in Data Analysis",
  "商业分析与人工智能": "Business Analytics and Artificial Intelligence",
  "分析学": "Analytics",
  "地球与海洋科学（全奖博士）": "Earth and Ocean Sciences (Fully Funded PhD)",
  "环境科学（全奖博士）": "Environmental Science (Fully Funded PhD)",
  "学习设计创新与技术": "Learning Design, Innovation, and Technology",
  "教育数据科学": "Data Science in Education",
  "公卫-健康信息学": "Public Health - Health Informatics",
  "应用信息科学": "Applied Information Science",
  "区域研究-东亚方向": "Regional Studies - East Asia",
  "东亚语言与文化": "East Asian Languages and Cultures",
  "东亚语言与文化（博士全奖）": "East Asian Languages and Cultures (Fully Funded PhD)",
  "ECE": "Electrical and Computer Engineering (ECE)",
  "金融风险管理": "Financial Risk Management",
  "运筹学与信息工程-数据分析": "Operations Research and Information Engineering - Data Analytics",
  "风险管理定量方法": "Quantitative Methods for Risk Management",
  "科技人文与政策": "Science, Technology, Humanities and Policy",
  "工程管理": "Engineering Management",
  "技术管理": "Technology Management",
  "系统工程": "Systems Engineering",
  "数据分析工程": "Data Analytics Engineering",
  "应用经济与数据科学（MAEDS）": "Master of Applied Economics and Data Science (MAEDS)",
  "营销学与计算机跨理学士（Marketing + CS）": "Bachelor of Science in Marketing and Computer Science (Marketing + CS)",
  "非洲文化研究": "African Cultural Studies",
  "物理与哲学": "Physics and Philosophy",
  "环境相关专业": "Environmental Studies (General)",
  "地理相关专业": "Geography (General)",
  "计算机音乐（CCRMA）": "Computer-Based Music Theory and Acoustics / Computer Music (CCRMA)",
  "声乐": "Vocal Performance",
  "钢琴": "Piano Performance",
  "传播与媒体研究": "Communication and Media Studies",
  "文科": "Liberal Arts",
  "政治学与国际关系": "Politics and International Relations",
  "社会政治学与传播学": "Socio-Political Sciences and Communication",
  "量化经济": "Quantitative Economics",
  "经济、金融与数据科学": "Economics, Finance, and Data Science",
  "文学与文化研究硕士": "Master of Arts in Literary and Cultural Studies",
  "国际语言教育硕士": "Master of Arts in International Language Education",
  "技术物理理学硕士": "Master of Science in Engineering Physics",
  "组织行为": "Organizational Behavior",
  "物理（本硕连读 MSci）": "Physics (MSci Integrated Master's)",
  "理论物理（本硕连读）": "Theoretical Physics (Integrated Master's)",
  "数学与哲学": "Mathematics and Philosophy",
  "STEM商学院": "STEM Business School",
  "数学科学": "Mathematical Sciences",
  "商科/经济": "Business / Economics",
  "计算生物学": "Computational Biology",
  "电子电器工程": "Electrical and Electronic Engineering",
  "医学生命科学": "Medical Life Sciences",
  "物理（本硕连读）": "Physics (Integrated Master's)",
  "物理工程": "Engineering Physics",
  "新闻传媒": "Journalism and Media",
  "戏剧研究": "Theatre Studies",
  "人工智能与数据科学": "Artificial Intelligence and Data Science",
  "信息科技": "Information Technology",
  "航空航天": "Aerospace Engineering",
  "大地测量与地球观测": "Geodesy and Earth Observation",
  "材料与过程可持续工程": "Sustainable Engineering: Materials and Process",
  "可持续材料技术": "Sustainable Materials Technology",
  "地理与经济": "Geography and Economics",
  "风险管理科学与数据分析": "Risk Management Science and Data Analytics",
  "自然科学(地球和行星科学)": "Natural Sciences (Earth and Planetary Sciences)",
  "Media（媒体）": "Media",
  "医学生物": "Medical Biology",
  "国际社会公共政策": "International Social and Public Policy",
  "国际社会与公共政策": "International Social and Public Policy",
  "精算学": "Actuarial Science",
  "通用工程": "General Engineering",
  "统计决策学": "Statistical Decision Science",
  "国际社会与公共政策(含经济学)": "International Social and Public Policy (with Economics)",
  "亚洲&中东研究": "Asian and Middle Eastern Studies",
  "爵士作曲": "Jazz Composition",
  "工程与公共政策": "Engineering and Public Policy",
  "兽医生物学/兽医学博士本博连读（BVB/DVM）": "Veterinary Biosciences / Doctor of Veterinary Medicine (BVSc/DVM)",
  "Art Studio（纯艺）": "Art Studio",
  "Performing Art Technology（表演艺术科技）": "Performing Arts Technology",
  "视觉传媒": "Visual Communication",
  "摄影": "Photography",
  "商科（双学位）": "Business (Dual Degree)",
  "数学统计与金融": "Mathematics, Statistics and Finance",
  "计量经济和数据科学": "Econometrics and Data Science",
  "全球传播科学": "Global Communication Science",
  "传媒和文化": "Media and Culture",
  "经济和商业经济": "Economics and Business Economics",
  "商业学士（Commerce）": "Bachelor of Commerce",
  "Bachelor of Art and Science in Design（设计文理学士）": "Bachelor of Arts and Science in Design",
  "Bachelor of Art and Science in Design": "Bachelor of Arts and Science in Design",
  "设计文理学士": "Bachelor of Arts and Science in Design",
  "艺术管理": "Arts Management",
  "纯艺术（Fine Art）": "Fine Art",
  "政治科学国际关系方向": "Political Science with International Relations",
  "物理治疗博士(DPT)": "Doctor of Physical Therapy (DPT)",
  "英国文学": "English Literature",
  "文科类专业": "Liberal Arts",
  "人文与科学": "Humanities and Sciences",
  "数学（求真书院）": "Mathematics (Qiuzhen College)",
  "物理（少年班及创新试点班，A档资格）": "Physics (Junior Class & Innovation Pilot Program, Grade A Qualification)",
  "计算与数据科学": "Computational and Data Science",
  "文理": "Liberal Arts and Sciences",
  "神经科学相关": "Neuroscience (Related Programs)",
  "听力语言障碍研究相关": "Speech-Language Pathology and Audiology (Related Programs)",
  "数据专业": "Data Science",
  "商业经济": "Business Economics",
  "新闻学": "Journalism",
  "电影艺术": "Cinematic Arts",
  "编剧": "Screenwriting",
  "比较文学": "Comparative Literature",
  "化学专业": "Chemistry",
  "犯罪学": "Criminology",
  "电影与电视": "Film and Television",
  "运动管理": "Sport Management",
  "传播学与技术": "Communication and Technology",
  "对外英语教学": "Teaching English as a Foreign Language (TEFL)",
  "犯罪与社会科学": "Crime and Social Science",
  "理科（化学相关）": "Natural Sciences (Chemistry-related)",
  "飞行/航空": "Aviation / Aeronautics",
  "电影电视及数码媒体": "Film, Television and Digital Media",
  "教育实践与社会学": "Education Practice and Sociology",
  "信息安全技术应用": "Applied Information Security Technology",
  "PPE": "Philosophy, Politics and Economics (PPE)",
  "全球管理": "Global Management",
  "电气与机械工程": "Electrical and Mechanical Engineering",
  "电气与电子工程": "Electrical and Electronic Engineering",
  "艺术（美术）": "Art (Fine Art)",
  "会计学": "Accounting",
  "艺术设计": "Art and Design",
  "光华管理学院（商科）": "Guanghua School of Management (Business)",
  "纳米材料": "Nanomaterials",
  "生物相关": "Biology (Related Programs)",
  "社会人类学": "Social Anthropology",
  "运动科学": "Sports Science",
  "生物与环境科学": "Biology and Environmental Science",
  "戏剧": "Drama / Theatre",
  "天文学/天体物理学": "Astronomy / Astrophysics",
  "人文地理": "Human Geography",
  "社会政策与经济学": "Social Policy and Economics",
  "Medical Biosciences生物医学科学": "Medical Biosciences",
  "Human Neuroscience人类神经科学": "Human Neuroscience",
  "计算机与数学科学": "Computer and Mathematical Sciences",
  "应用数学与金融分析": "Applied Mathematics and Financial Analysis",
  "数据科学和机器学习硕士": "MSc Data Science and Machine Learning",
  "社会公正研究（夏校项目）": "Social Justice Studies (Summer Program)",
  "生物医学研究（夏校项目）": "Biomedical Research (Summer Program)",
  "人文学科": "Humanities",
  "商学（沃顿商学院）": "Business (Wharton School)",
  "社会学与科学政治学": "Sociology and Political Science",
  "化学/环境科学": "Chemistry / Environmental Science",
  "法律学": "Law",
  "社会科学(社会学与数据分析)": "Social Science (Sociology and Data Analysis)",
  "微细胞生物学": "Microbiology and Cell Biology",
  "室内设计": "Interior Design",
  "工作室艺术": "Studio Art",
  "国际事务": "International Affairs",
  "时尚设计（商业方向）": "Fashion Design (Business Track)",
  "政策制定": "Policy Studies",
  "教育科学": "Education Science",
  "计算机科学（姚班方向）": "Computer Science (Yao Class)",
  "医学生物化学": "Medical Biochemistry",
  "计算语言学": "Computational Linguistics",
  "金融专业": "Finance",
  "体育与运动医学": "Sports and Exercise Medicine",
  "商业信息管理": "Business Information Management",
  "文化、媒体与创意产业": "Culture, Media and Creative Industries",
  "环境与商业": "Environment and Business",
  "生物医药": "Biomedicine",
  "音乐作曲": "Music Composition",
  "作曲（博士）": "Composition (PhD)",
  "娱乐行业管理（研究生）": "Entertainment Industry Management (Graduate)",
  "计算机（硕士）": "Computer Science (Master's)",
  "社会文化人类学": "Sociocultural Anthropology",
  "经济与管理": "Economics and Management",
  "Undecided（意向Applied Math & CS + Music双专业）": "Undecided (Intended Double Major: Applied Math & CS + Music)",
  "神经生物专业": "Neurobiology",
  "电气和计算机工程": "Electrical and Computer Engineering",
  "经济与商业": "Economics and Business",
  "犯罪科学": "Forensic Science",
  "长笛演奏 / 音乐表演": "Flute Performance / Music Performance",
  "单簧管演奏": "Clarinet Performance",
  "长笛演奏": "Flute Performance",
  "双专业（具体未说明）": "Double Major (Unspecified)",
  "商业科技管理": "Management of Business Technology",
  "音乐科技": "Music Technology",
  "樱花学者项目": "Sakura Science Program",
  "人体营养学": "Human Nutrition",
  "医学数据科学硕士": "MSc Medical Data Science",
  "计算科学硕士": "MSc Computational Science",
  "商管": "Business Administration",
  "决策分析与运营管理": "Decision Analytics and Operations Management",
  "商业管理": "Business Management",
  "理学": "Science",
  "设计工程": "Design Engineering",
  "科技与管理双学位": "Dual Degree in Technology and Management",
  "社会学及交叉领域": "Sociology and Interdisciplinary Studies",
  "经济金融": "Economics and Finance",
  "化学与生物工程": "Chemical and Biological Engineering",
  "医学与生物科学": "Medicine and Biosciences",
  "社会科学试验班": "Social Sciences Pilot Program",
  "文学士": "Bachelor of Arts (BA)",
  "理学士（创新与科技）": "Bachelor of Science (Innovation and Technology)",
  "工业工程及决策分析学系": "Department of Industrial Engineering and Decision Analytics",
  "金融科技硕士": "MSc Financial Technology (FinTech)",
  "生物信息": "Bioinformatics",
  "人工智能与去中心化技术": "Artificial Intelligence and Decentralized Technology",
  "信号处理与机器学习": "Signal Processing and Machine Learning",
  "计算机控制与自动化硕士": "MSc Computer Control and Automation",
  "机器人硕士": "MSc Robotics",
  "机械与自动化工程硕士": "MSc Mechanical and Automation Engineering",
  "智能机器人工程硕士": "MSc Intelligent Robotics Engineering",
  "电子与信息工程硕士": "MSc Electronic and Information Engineering",
  "创业与创新硕士（中文班）": "MSc Entrepreneurship and Innovation (Chinese-taught)",
  "消防工程科学硕士": "MSc Fire Engineering Science",
  "碳中和城市与可持续发展硕士": "MSc Carbon Neutral Cities and Sustainable Development",
  "建造管理硕士": "MSc Construction Management",
  "结构工程硕士": "MSc Structural Engineering",
  "工业物流系统硕士": "MSc Industrial Logistics Systems",
  "项目管理硕士": "MSc Project Management",
  "商业管理硕士": "MSc Business Management",
  "电子商务管理硕士": "MSc E-Commerce Management",
  "管理学硕士（国际人力资源管理）": "MSc Management (International Human Resource Management)",
  "媒体医学与健康": "Media, Medicine and Health",
  "整合营销": "Integrated Marketing",
  "市场科学": "Marketing Science",
  "国际管理": "International Management",
  "人文与电子科技（跨专业）": "Humanities and Electronic Technology (Interdisciplinary)",
  "中国与全球治理社会科学硕士": "Master of Social Science in China and Global Governance",
  "公共政策和管理文学硕士": "Master of Arts in Public Policy and Management",
  "营养科学": "Nutritional Science",
  "营养与代谢生物学": "Nutrition and Metabolic Biology",
  "营养与食品研究": "Nutrition and Food Studies",
  "管理市场营销": "Management and Marketing",
  "纺织设计": "Textile Design",
  "公共管理硕士(MPM)": "Master of Public Management (MPM)",
  "公共政策硕士(MPP)": "Master of Public Policy (MPP)",
  "经济学/经济与金融": "Economics / Economics and Finance",
  "化学与生物医学": "Chemistry and Biomedicine",
  "理学士法学士双学位": "Bachelor of Science and Bachelor of Laws (Dual Degree)",
  "绿色可持续金融": "Green and Sustainable Finance",
  "环境系统/环境政策": "Environmental Systems / Environmental Policy",
  "全球研究": "Global Studies",
  "牙医": "Dentistry",

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
// _en-aware: 优先用 LLM 翻译的 _en 字段，fallback 到字典，最后返回中文
const trEnOrDict = (cn, enVal, dict) => {
  if (currentLang !== "en") return cn;
  if (enVal) return enVal;
  if (cn && dict[cn]) return dict[cn];
  return cn;
};
const trSchool = (cn, en) => trEnOrDict(cn, en, SCHOOLS_EN);
const trCountry = (cn, en) => trEnOrDict(cn, en, COUNTRIES_EN);
const trUniv = (cn, en) => trEnOrDict(cn, en, UNIVERSITIES_EN);
const trPurpose = (cn, en) => trEnOrDict(cn, en, PURPOSES_EN);
const trCurr = (cn) => tr(cn, CURRICULUMS_EN);
const trMajor = (cn, en) => trEnOrDict(cn, en, MAJORS_EN);
const trSchoolList = (arr, enArr) => (arr || []).map((x, i) => trSchool(x, enArr?.[i])).join(", ");
const trCountryList = (arr, enArr) => (arr || []).map((x, i) => trCountry(x, enArr?.[i])).join(", ");
const trUnivList = (arr, enArr) => (arr || []).map((x, i) => trUniv(x, enArr?.[i])).join(", ");
const trMajorList = (arr, enArr) => (arr || []).map((x, i) => trMajor(x, enArr?.[i])).join(", ");

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
  level: "undergrad",    // 申请层级: undergrad / graduate / highschool / all
  undergradOnly: true,   // 兼容旧逻辑；与 level 同步
};

// ============================================
//  申请层级判定：本科 / 研究生 / 高中
// ============================================
const NON_UNDERGRAD_KEYWORDS = [
  '硕士', '研究生', 'PhD', '博士', '博士申请',
  '本科毕业', '申请硕士', 'Master',
  '美高', '美高申请', '高中', '高中申请', '国际高中',
  '9年级', '10年级', 'G9', 'G10', 'G11',
  '9 年级', '10 年级', '11 年级',
  '美本转学', '转学申请', '本科转学',
  'Class of 20',     // 排除 2025 届毕业生
  '2025届', '2024届', '2023届', '2022届', '2021届', '2026届',
  '毕业生', '已毕业',
];

// 规范化 grade 值到 5 类：G9/G10/G11/G12/Graduate/Prep-Senior/Prep-Junior
// 注：A-Level/IB 的 Year 13 等同 G12（都是申请大学的最高年级）
function normalizeGrade(grade) {
  if (!grade) return null;
  const g = grade.trim();
  // 已是规范值
  if (/^(G\s*9|G\s*10|G\s*11|G\s*12|Graduate|Prep-Senior|Prep-Junior)$/i.test(g)) {
    return g.replace(/\s+/g, '');
  }
  // G13 / Year 13 / 13 年级 → G12（A-Level/IB 最后一年，与 G12 同一申请段）
  if (/^(G\s*13|Year\s*13|13\s*年级|13年级|Year 13)$/i.test(g)) return 'G12';
  // 中文写法
  if (g.includes('6年级') || g.includes('6 年级')) return 'MiddleSchool';
  if (g.includes('7年级') || g.includes('7 年级')) return 'MiddleSchool';
  if (g.includes('8年级') || g.includes('8 年级') || g === '初二' || g === '初三' || g === '初一') return 'MiddleSchool';
  if (g.includes('9年级') || g.includes('9 年级')) return 'G9';
  if (g.includes('10年级') || g.includes('10 年级') || g === '高一') return 'G10';
  if (g.includes('11年级') || g.includes('11 年级') || g === '高二') return 'G11';
  if (g.includes('12年级') || g.includes('12 年级') || g === '高三') return 'G12';
  if (g.includes('13年级') || g.includes('13 年级')) return 'G12';  // 13 年级 = A-Level/IB 最高年
  if (/A2|AS\/A2|Year 12|Year 13/i.test(g)) return 'G12';
  if (/本科毕业|已毕业|毕业生|届毕业生|Master|硕士|PhD|博士|研究生|申请硕士/.test(g)) return 'Graduate';
  if (/Class of 20\d\d|202\d届|2026届/.test(g)) return 'Graduate';
  return g;  // 兜底
}

function getApplicationLevel(c) {
  // 优先用规范化后的 grade
  const gradeNorm = normalizeGrade(c.grade) || '';
  // 把更多字段也喂进来作为信号：admit_majors 也很关键（法学博士/JD/MD/LLM）
  const text = [
    c.grade || '',
    c.article_purpose || '',
    c.article_purpose_en || '',
    ...(c.key_takeaways || []),
    ...(c.key_takeaways_en || []),
    ...(c.activities || []),
    ...(c.activities_en || []),
    ...(c.admit_majors || []),
    ...(c.admit_majors_en || []),
  ].join(' ');

  if (!c.grade && !c.admit_schools?.length) return 'unknown';

  // 检测 admit_schools 是否都是美高/英高（Academy/School/Prep 关键词）
  const admits = c.admit_schools || [];
  const admitsEn = c.admit_schools_en || [];
  const allAdmitText = [...admits, ...admitsEn].join(' ');
  const looksLikeHighSchool = /\b(Academy|Preparatory|Prep School|High School|Upper School|Montessori)\b/i.test(allAdmitText);
  // 至少有 2 个美高名（避免单个 case 误判）
  const hsNameCount = (allAdmitText.match(/\b(Academy|Preparatory|Prep School|High School|Upper School)\b/gi) || []).length;

  // 高中申请：MiddleSchool (6-8 年级) + G9-G11
  if (/^(MiddleSchool|G9|G10|G11)$/i.test(gradeNorm)) {
    return 'highschool';
  }
  if (/美高|高中申请|美高申请|国际高中.*G(10|9|11)|Prep-Junior|Prep-Senior/i.test(text)) {
    return 'highschool';
  }
  // admit_schools 全是高中名（如 Deerfield Academy / Lawrenceville）
  if (admits.length > 0 && hsNameCount >= 2 && !admits.some(s => /大学|University|College|学校/i.test(s) && !/Academy|Preparatory|Prep School|High School/.test(s))) {
    return 'highschool';
  }
  // admit_schools 里没有真正的大学（不含 大学/学院/University/College/Institute）
  // 而且 grade 是初中/MiddleSchool 段 → 误填的国内学校名，不是本科录取
  if (gradeNorm === 'MiddleSchool' || /^(6|7|8|9)\s*年级|初一|初二|初三/.test(c.grade || '')) {
    const hasUniv = admits.some(s => /大学|学院|University|College|Institute|Universit/i.test(s));
    if (!hasUniv) return 'highschool';
  }

  // 研究生：综合 grade + 文本信号
  if (gradeNorm === 'Graduate') return 'graduate';
  // grade 字段里带"研究生/大四"等词
  if (/申请研究|大四|本科.*申请|研一|研二|研三|硕士在读|博士在读|保研|考研/i.test(c.grade || '')) {
    return 'graduate';
  }
  // 文本里有研究生申请/标化关键词（GRE/GMAT/MCAT/LSAT/法学院/医学院/PhD/硕士 + 跨申/转专业 等）
  const gradSignals = [
    // 学位
    '研究生', '硕士', '博士', 'PhD', 'Master', "Master's", 'MS ', 'MA ', 'MBA', 'MFA', 'JD', 'MD', 'LLM', 'EdD', 'PsyD', 'DBA',
    // 中文学位（更直接的"研究"信号）
    '法学博士', '医学博士', '法学硕士', '教育学博士', '教育博士', '研究型硕士', '授课型硕士', '专业硕士',
    '研究生申请', '申请研究生', '跨申', '跨专业申请', '考研', '保研', '硕博',
    // 标化
    'GRE', 'GMAT', 'MCAT', 'LSAT',
    // 专业方向
    '法学院', '医学院', '读研', '先修课',
    // 英文学位关键词
    'graduate', 'grad school', 'grad student', 'law school', 'medical school', 'business school',
  ];
  // 至少 2 个 graduate 信号才认（避免 "Master of Finance" 在本科项目里被误抓）
  let gradHit = 0;
  for (const sig of gradSignals) {
    if (text.toLowerCase().includes(sig.toLowerCase())) gradHit++;
  }
  if (gradHit >= 2) return 'graduate';

  // 强单信号兜底：admit_majors 直接含 JD/MD/LLM/PhD/法学博士 等明确的"专业研究生学位"字样
  // → 即使其他信号为 0，也认 graduate（避免类似 J 同学 / 法学博士（JD） 漏判）
  const majors = [...(c.admit_majors || []), ...(c.admit_majors_en || [])].join(' ');
  const strongSingleSignals = [
    'JD', 'MD', 'LLM', 'EdD', 'PsyD', 'DBA', 'PhD',
    '法学博士', '医学博士', '教育博士', '法学硕士', 'Doctor of', 'Juris Doctor',
  ];
  for (const sig of strongSingleSignals) {
    if (majors.includes(sig) || text.includes(sig)) return 'graduate';
  }

  // 默认本科
  return 'undergrad';
}

// ============================================
//  加载数据
// ============================================
async function loadData() {
  document.getElementById("loading").classList.remove("hidden");
  try {
    // v_recent_cases 视图已 join articles + accounts，且带全部 _en 列
    const PAGE = 1000;
    let allData = [];
    let from = 0;
    while (true) {
      const { data, error } = await sb
        .from("v_recent_cases")
        .select("*")
        .order("published_at", { ascending: false })
        .range(from, from + PAGE - 1);
      if (error) throw error;
      if (!data || data.length === 0) break;
      allData = allData.concat(data);
      if (data.length < PAGE) break;
      from += PAGE;
    }
    ALL_CASES = allData.map(normalizeCase).filter(Boolean);
    console.log(`Loaded ${ALL_CASES.length} cases from v_recent_cases view`);

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
  const articles = row.articles || {};
  return {
    id: row.id || row.case_id,
    student_alias: row.student_alias,
    student_alias_en: row.student_alias_en,
    school: row.school,
    school_en: row.school_en,
    curriculum: row.curriculum,
    grade: row.grade,
    grade_en: row.grade_en,
    admit_country: row.admit_country || [],
    admit_country_en: row.admit_country_en || [],
    admit_schools: row.admit_schools || [],
    admit_schools_en: row.admit_schools_en || [],
    admit_majors: row.admit_majors || [],
    admit_majors_en: row.admit_majors_en || [],
    gpa: row.gpa,
    gpa_en: row.gpa_en,
    test_scores: row.test_scores || {},
    test_scores_en: row.test_scores_en || {},
    activities: row.activities || [],
    activities_en: row.activities_en || [],
    key_takeaways: row.key_takeaways || [],
    key_takeaways_en: row.key_takeaways_en || [],
    article_purpose: row.article_purpose,
    article_purpose_en: row.article_purpose_en,
    is_arts: row.is_arts || false,
    confidence_score: row.confidence_score,
    needs_human_review: row.needs_human_review,
    article_title: row.article_title || articles.title || row.title,
    article_url: row.article_url || articles.url || articles.mp_url || row.url,
    account_name: row.account_name || (articles.accounts && articles.accounts.name),
    published_at: row.published_at || articles.published_at,
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
    // 申请层级（仅看本科开关 + 顶部 chip）
    if (FILTER_STATE.level !== 'all') {
      const lvl = getApplicationLevel(c);
      if (lvl !== FILTER_STATE.level && lvl !== 'unknown' && FILTER_STATE.level !== 'undergrad') return false;
      // 本科模式：高中 + 研究生都过滤掉
      if (FILTER_STATE.level === 'undergrad' && (lvl === 'graduate' || lvl === 'highschool')) return false;
    }
    return true;
  });
  renderAll();
}

function getUniqueValues(field) {
  const set = new Set();
  // 当 level 不是 all 时，filter 列表里就只展示当前过滤规则下真的会出现 case 的项
  const level = FILTER_STATE.level;
  ALL_CASES.forEach((c) => {
    if (level !== 'all') {
      const lvl = getApplicationLevel(c);
      if (level === 'undergrad' && (lvl === 'graduate' || lvl === 'highschool')) return;
      if (level !== 'undergrad' && lvl !== level && lvl !== 'unknown') return;
    }
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
      <span class="flex-1 break-words leading-snug">${escapeHTML(translateFn ? translateFn(item) : item)}</span>
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
  FILTER_STATE.level = "undergrad";
  FILTER_STATE.undergradOnly = true;
  document.getElementById("filterTime").value = "all";
  const undergradChk = document.getElementById("filterUndergradOnly");
  if (undergradChk) undergradChk.checked = true;
  // 同步顶部 chip
  document.querySelectorAll(".level-chip").forEach((b) => b.classList.toggle("active", b.dataset.level === "undergrad"));
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

// 仅看本科开关（侧边栏）
document.getElementById("filterUndergradOnly")?.addEventListener("change", (e) => {
  FILTER_STATE.undergradOnly = e.target.checked;
  FILTER_STATE.level = e.target.checked ? "undergrad" : "all";
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
  const countryEn = (c.admit_country_en || [])[0] || "";
  const countryFlag = flagOf(country);
  const admit = (c.admit_schools || [])[0] || "—";
  const admitEn = (c.admit_schools_en || [])[0] || "";
  const major = (c.admit_majors || [])[0] || "";
  const majorEn = (c.admit_majors_en || [])[0] || "";
  // 英文模式：优先 _en 字段（_en 缺失则 fallback 中文）
  const takeaways = currentLang === "en"
    ? ((c.key_takeaways_en && c.key_takeaways_en.length > 0) ? c.key_takeaways_en.slice(0, 2) : (c.key_takeaways || []).slice(0, 2))
    : (c.key_takeaways || []).slice(0, 2);
  const conf = Math.round((c.confidence_score || 0) * 100);
  const confColor = conf >= 80 ? "text-emerald-600" : conf >= 60 ? "text-amber-600" : "text-slate-500";

  return `
    <div class="case-card" data-id="${c.id}">
      <div class="case-name">
        <a href="${escapeHTML(c.article_url || '#')}" target="_blank" rel="noopener" class="case-name-link" onclick="event.stopPropagation()" title="${escapeHTML(c.article_title || '')}">
          ${escapeHTML(currentLang === "en" && c.student_alias_en ? c.student_alias_en : (c.student_alias || "—"))}
        </a>
      </div>
      <div class="case-school">${escapeHTML(trSchool(c.school || c.account_name || "—", c.school_en))}</div>
      <div>
        ${c.curriculum && c.curriculum !== "IGCSE" ? `<span class="case-tag case-tag-curriculum">${escapeHTML(trCurr(c.curriculum))}</span>` : ""}
        ${c.article_purpose ? `<span class="case-tag case-tag-purpose">${escapeHTML(trPurpose(c.article_purpose, c.article_purpose_en))}</span>` : ""}
        ${c.grade ? `<span class="case-tag">${escapeHTML(currentLang === "en" && c.grade_en ? c.grade_en : c.grade)}</span>` : ""}
      </div>
      <div class="case-admit">
        <div class="case-admit-school">${countryFlag} ${escapeHTML(trUniv(admit, admitEn))}</div>
        ${major ? `<div class="case-admit-country">${escapeHTML(trMajor(major, majorEn))} · ${escapeHTML(trCountry(country, countryEn))}</div>` : `<div class="case-admit-country">${escapeHTML(trCountry(country, countryEn))}</div>`}
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

  const isEn = currentLang === "en";
  const studentDisplay = isEn && c.student_alias_en ? c.student_alias_en : (c.student_alias || "—");
  const gradeDisplay = isEn && c.grade_en ? c.grade_en : (c.grade || "");
  const purposeDisplay = isEn && c.article_purpose_en ? c.article_purpose_en : c.article_purpose;
  const gpaDisplay = isEn && c.gpa_en ? c.gpa_en : c.gpa;
  const acts = isEn && c.activities_en?.length ? c.activities_en : c.activities;
  const takes = isEn && c.key_takeaways_en?.length ? c.key_takeaways_en : c.key_takeaways;
  const ts = isEn && c.test_scores_en && Object.keys(c.test_scores_en).length ? c.test_scores_en : c.test_scores;

  document.getElementById("modalName").textContent = studentDisplay;
  document.getElementById("modalSchool").textContent =
    [trSchool(c.school || c.account_name || "", c.school_en), trCurr(c.curriculum), gradeDisplay].filter(Boolean).join(" · ");

  const conf = Math.round((c.confidence_score || 0) * 100);
  const testScoresHTML = Object.keys(ts).length
    ? Object.entries(ts).map(([k, v]) => `<div class="modal-key-value"><span class="modal-key">${escapeHTML(k)}</span><span class="modal-value">${escapeHTML(String(v))}</span></div>`).join("")
    : "—";

  const actsHTML = (acts || []).length
    ? acts.map(a => `<div class="modal-takeaway-item">${escapeHTML(a)}</div>`).join("")
    : "—";

  const takesHTML = (takes || []).length
    ? takes.map(t => `<div class="modal-takeaway-item">${escapeHTML(t)}</div>`).join("")
    : "—";

  document.getElementById("modalContent").innerHTML = `
    <div class="modal-section">
      <div class="modal-section-title">${t("admitTo")}</div>
      <div class="case-admit" style="margin-top:0">
        <div class="case-admit-school">${flagOf((c.admit_country || [])[0] || "")} ${escapeHTML(trUnivList(c.admit_schools, c.admit_schools_en) || "—")}</div>
        <div class="case-admit-country">${escapeHTML(trMajorList(c.admit_majors, c.admit_majors_en))} · ${escapeHTML(trCountryList(c.admit_country, c.admit_country_en))}</div>
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-title">${t("statTotalCases")} · ${t("purpose")} · ${t("grade")}</div>
      <div class="modal-key-value">
        <span class="modal-key">${t("curriculum") || "Curriculum"}</span><span class="modal-value">${escapeHTML(trCurr(c.curriculum) || "—")}</span>
        <span class="modal-key">${t("purpose")}</span><span class="modal-value">${escapeHTML(trPurpose(c.article_purpose, c.article_purpose_en) || "—")}</span>
        <span class="modal-key">${t("grade")}</span><span class="modal-value">${escapeHTML(gradeDisplay || "—")}</span>
        <span class="modal-key">${t("gpa")}</span><span class="modal-value">${escapeHTML(gpaDisplay || "—")}</span>
        <span class="modal-key">${t("aiConfidence")}</span><span class="modal-value">${conf}%</span>
      </div>
    </div>

    ${Object.keys(ts).length ? `
    <div class="modal-section">
      <div class="modal-section-title">${t("testScores")}</div>
      ${testScoresHTML}
    </div>
    ` : ""}

    ${(acts || []).length ? `
    <div class="modal-section">
      <div class="modal-section-title">${t("activities")}</div>
      ${actsHTML}
    </div>
    ` : ""}

    ${(takes || []).length ? `
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
