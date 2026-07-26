"""Bilingual translation for DB values (zh → en).

由 gen_translations.py 自动生成；可手动覆盖。
Apply these via translate_*() functions in app.py when lang='en'.
"""
from typing import Optional


SCHOOLS = {
  "深圳国际交流学院": "Shenzhen College of International Education (SCIE)",
  "深国交": "Shenzhen College of International Education (SCIE)",
  "上海赫贤学校": "Shanghai He-Xian School",
  "上海赫贤学校（东校区）": "Shanghai He-Xian School (East Campus)",
  "上海赫贤学校（璟旻艺术高中）": "Shanghai He-Xian School (Jingmin Arts High School)",
  "上海包玉刚实验学校": "Shanghai YK Pao School",
  "FindingSchool": "FindingSchool",
  "UWC中国": "UWC China",
  "上海七宝德怀特": "Shanghai Qibao Dwight High School",
  "上海协和双语": "Shanghai Concord Bilingual School",
  "上海平和双语学校": "Shanghai Pinghe School",
  "上海惠灵顿国际学校": "Wellington College International Shanghai",
  "上海星河湾双语学校": "Shanghai Starriver Bilingual School",
  "上海耀华古北校区": "Yaohua International School Shanghai (Gubei Campus)",
  "上海耀中浦东校区": "Yew Chung International School Shanghai (Pudong)",
  "北京耀中": "Yew Chung International School Beijing",
  "香港耀中": "Yew Chung International School Hong Kong",
  "加藤国际教育": "Kato International Education",
  "北京世青学校": "Beijing World Youth Academy (BWYA)",
  "北京世青国际学校": "Beijing World Youth Academy (BWYA)",
  "北京十一学校一分校国际部": "Beijing No.11 School Branch International Department",
  "北京海淀凯文学校": "Beijing Haidian Kevin School",
  "北京鼎石学校": "Keystone Academy Beijing",
  "南京外国语学校中英项目": "Nanjing Foreign Language School Sino-British Programme",
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
  "顶思": "Topschool"
}


COUNTRIES = {
  "中国香港": "Hong Kong SAR, China",
  "澳大利亚": "Australia",
  "美国": "United States",
  "英国": "United Kingdom",
  "意大利": "Italy",
  "新加坡": "Singapore",
  "瑞士": "Switzerland",
  "韩国": "South Korea"
}


PURPOSES = {
  "录取喜报": "Admission Announcement",
  "成长故事": "Growth Story",
  "经验分享": "Experience Sharing"
}


CURRICULUMS = {
  "A-Level": "A-Level",
  "IB": "International Baccalaureate (IB)",
  "IGCSE": "IGCSE"
}


UNIVERSITIES = {
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
  "香港科技大学": "The Hong Kong University of Science and Technology"
}


# ===== Apply functions =====
def translate_school(name: Optional[str], lang: str) -> Optional[str]:
    if not name or lang == "zh":
        return name
    return SCHOOLS.get(name, name)


def translate_country(name: Optional[str], lang: str) -> Optional[str]:
    if not name or lang == "zh":
        return name
    return COUNTRIES.get(name, name)


def translate_purpose(name: Optional[str], lang: str) -> Optional[str]:
    if not name or lang == "zh":
        return name
    return PURPOSES.get(name, name)


def translate_curriculum(name: Optional[str], lang: str) -> Optional[str]:
    if not name or lang == "zh":
        return name
    return CURRICULUMS.get(name, name)


def translate_university(name: Optional[str], lang: str) -> Optional[str]:
    if not name or lang == "zh":
        return name
    return UNIVERSITIES.get(name, name)


def translate_school_list(names: list, lang: str) -> list:
    if lang == "zh" or not names:
        return names
    return [translate_school(n, lang) for n in names]


def translate_country_list(names: list, lang: str) -> list:
    if lang == "zh" or not names:
        return names
    return [translate_country(n, lang) for n in names]


def translate_university_list(names: list, lang: str) -> list:
    if lang == "zh" or not names:
        return names
    return [translate_university(n, lang) for n in names]


MAJORS = {
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
}


def translate_major(name: Optional[str], lang: str) -> Optional[str]:
    if not name or lang == "zh":
        return name
    return MAJORS.get(name, name)


def translate_major_list(names: list, lang: str) -> list:
    if lang == "zh" or not names:
        return names
    return [translate_major(n, lang) for n in names]
