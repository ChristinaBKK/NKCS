"""Bilingual translation for DB values (zh → en).

由 gen_translations.py 自动生成；可手动覆盖。
Apply these via translate_*() functions in app.py when lang='en'.
"""
from typing import Optional


SCHOOLS = {
  "深圳国际交流学院（深国交）": "Shenzhen College of International Education (SCIE)",
  "深国交": "Shenzhen College of International Education (SCIE)",
  "上海赫贤学校": "Shanghai High School (Hefei)",
  "上海赫贤高中部": "Shanghai He-Xian High School",
  "上海赫贤高中": "Shanghai He-Xian High School",
  "包玉刚实验学校": "YK Pao School",
  "FindingSchool": "FindingSchool",
  "UWC中国": "UWC China",
  "上海七宝德怀特": "Shanghai Qibao Dwight High School",
  "上海包玉刚实验学校": "Shanghai Packer Collegiate International School",
  "上海协和双语": "Shanghai Concord Bilingual School",
  "上海平和双语学校": "Shanghai Pinghe School",
  "上海惠灵顿国际学校": "Wellington College International Shanghai",
  "上海星河湾双语学校": "Shanghai Xing He Wan Bilingual School",
  "上海耀华古北": "Yaohua International School Shanghai Gubei",
  "加藤国际教育": "Kato International Education",
  "北京世青国际学校": "Beijing World Youth Academy",
  "北京十一学校一分校国际部": "Beijing No.11 School Branch International Department",
  "北京海淀凯文学校": "Beijing Haidian Kevin School",
  "北京鼎石学校": "Keystone Academy Beijing",
  "南京外国语学校中英项目": "Nanjing Foreign Language School Sino-British Programme",
  "哈罗Harrow": "Harrow",
  "唯寻国际教育": "Weixun International Education",
  "宜校": "YiSchool",
  "广州贝赛思": "BASIS International School Guangzhou",
  "德威Dulwich": "Dulwich College",
  "新加坡伊顿": "Eaton International School Singapore",
  "枫叶教育": "Maple Leaf Educational Systems",
  "棕榈大道": "Palm Avenue International School",
  "深圳中学国际部": "Shenzhen Middle School International Department",
  "深圳国际交流学院": "Shenzhen College of International Education",
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
  "英国": "United Kingdom"
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
  "伦敦政治经济学院": "London School of Economics and Political Science",
  "伦敦时装学院": "London College of Fashion",
  "佐治亚理工学院": "Georgia Institute of Technology",
  "剑桥大学": "University of Cambridge",
  "加州大学圣地亚哥分校": "University of California, San Diego",
  "加州大学圣塔芭芭拉分校": "University of California, Santa Barbara",
  "加州大学圣巴巴拉分校": "University of California, Santa Barbara",
  "加州大学戴维斯分校": "University of California, Davis",
  "加州大学欧文分校": "University of California, Irvine",
  "加州大学洛杉矶分校": "University of California, Los Angeles",
  "华盛顿大学": "University of Washington",
  "卡尔顿学院": "Carleton College",
  "威斯康星大学麦迪逊分校": "University of Wisconsin-Madison",
  "密歇根大学安娜堡分校": "University of Michigan, Ann Arbor",
  "帝国理工学院": "Imperial College London",
  "温布尔登学院": "Wimbledon College",
  "爱丁堡大学": "University of Edinburgh",
  "牛津大学": "University of Oxford",
  "纽约大学": "New York University",
  "芝加哥大学": "University of Chicago",
  "西北大学": "Northwestern University",
  "金斯顿大学": "Kingston University",
  "香港大学": "The University of Hong Kong",
  "香港大学李嘉诚医学院": "HKU Li Ka Shing Faculty of Medicine",
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
