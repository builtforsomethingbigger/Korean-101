import { useState, useEffect, useCallback } from "react";

const C = {
  bg:'#0F172A', s1:'#1E293B', s2:'#253347', s3:'#334155',
  border:'#334155', borderHi:'#475569',
  t1:'#F1F5F9', t2:'#94A3B8', t3:'#64748B',
  blue:'#60A5FA', green:'#4ADE80', amber:'#FCD34D',
  red:'#F87171', purple:'#C4B5FD', teal:'#2DD4BF',
  pink:'#F9A8D4', orange:'#FDBA74', lime:'#BEF264',
};

// ─── Hangul Alphabet Data ─────────────────────────────────────────────────────
const HANGUL = {
  basicVowels: [
    {k:'ㅏ',r:'a',e:'as in "father"'},
    {k:'ㅑ',r:'ya',e:'as in "yard"'},
    {k:'ㅓ',r:'eo',e:'as in "uh"'},
    {k:'ㅕ',r:'yeo',e:'as in "yuh"'},
    {k:'ㅗ',r:'o',e:'as in "oh"'},
    {k:'ㅛ',r:'yo',e:'as in "yo"'},
    {k:'ㅜ',r:'u',e:'as in "moon"'},
    {k:'ㅠ',r:'yu',e:'as in "you"'},
    {k:'ㅡ',r:'eu',e:'no English equiv — spread lips, flat'},
    {k:'ㅣ',r:'i',e:'as in "see"'},
  ],
  compoundVowels: [
    {k:'ㅐ',r:'ae',e:'as in "bed"'},
    {k:'ㅒ',r:'yae',e:'"yae" — rare'},
    {k:'ㅔ',r:'e',e:'as in "yes"'},
    {k:'ㅖ',r:'ye',e:'"yeh"'},
    {k:'ㅘ',r:'wa',e:'"wa" — ㅗ+ㅏ'},
    {k:'ㅙ',r:'wae',e:'"wae" — ㅗ+ㅐ'},
    {k:'ㅚ',r:'oe',e:'"we" — ㅗ+ㅣ'},
    {k:'ㅝ',r:'wo',e:'"wuh" — ㅜ+ㅓ'},
    {k:'ㅞ',r:'we',e:'"weh" — ㅜ+ㅔ'},
    {k:'ㅟ',r:'wi',e:'"wee" — ㅜ+ㅣ'},
    {k:'ㅢ',r:'ui',e:'"eui" — ㅡ+ㅣ'},
  ],
  basicConsonants: [
    {k:'ㄱ',r:'g/k',e:'soft g at start, k at end'},
    {k:'ㄴ',r:'n',e:'like "n" in no'},
    {k:'ㄷ',r:'d/t',e:'soft d at start, t at end'},
    {k:'ㄹ',r:'r/l',e:'a flap — between r and l'},
    {k:'ㅁ',r:'m',e:'like "m" in mom'},
    {k:'ㅂ',r:'b/p',e:'soft b at start, p at end'},
    {k:'ㅅ',r:'s',e:'like "s" in sun'},
    {k:'ㅇ',r:'∅ / ng',e:'silent at start, "ng" at end'},
    {k:'ㅈ',r:'j',e:'like "j" in jump'},
    {k:'ㅊ',r:'ch',e:'like "ch" in cheese'},
    {k:'ㅋ',r:'k',e:'aspirated k — puff of air'},
    {k:'ㅌ',r:'t',e:'aspirated t — puff of air'},
    {k:'ㅍ',r:'p',e:'aspirated p — puff of air'},
    {k:'ㅎ',r:'h',e:'like "h" in hello'},
  ],
  doubleConsonants: [
    {k:'ㄲ',r:'kk',e:'tense k — harder than ㄱ'},
    {k:'ㄸ',r:'tt',e:'tense t — harder than ㄷ'},
    {k:'ㅃ',r:'pp',e:'tense p — harder than ㅂ'},
    {k:'ㅆ',r:'ss',e:'tense s — harder than ㅅ'},
    {k:'ㅉ',r:'jj',e:'tense j — harder than ㅈ'},
  ],
  syllableRules: [
    {rule:'Consonant + Vowel',ex:'가 = ㄱ+ㅏ',note:'Basic block: one consonant, one vowel'},
    {rule:'C + V + C (final)',ex:'밥 = ㅂ+ㅏ+ㅂ',note:'Final consonant sits below — called 받침 (batchim)'},
    {rule:'ㅇ is placeholder',ex:'아 = ∅+ㅏ',note:'When a vowel starts a syllable, ㅇ is written but silent'},
    {rule:'Tall vowels go right',ex:'가 나 바',note:'Vowels like ㅏ ㅓ ㅣ sit to the right of the consonant'},
    {rule:'Flat vowels go under',ex:'고 노 보',note:'Vowels like ㅗ ㅜ ㅡ sit below the consonant'},
  ],
};

// ─── Numbers Data ─────────────────────────────────────────────────────────────
const NUMBERS = [
  {n:1,  sino:'일(il)',    native:'하나(hana)'},
  {n:2,  sino:'이(i)',     native:'둘(dul)'},
  {n:3,  sino:'삼(sam)',   native:'셋(set)'},
  {n:4,  sino:'사(sa)',    native:'넷(net)'},
  {n:5,  sino:'오(o)',     native:'다섯(daseot)'},
  {n:6,  sino:'육(yuk)',   native:'여섯(yeoseot)'},
  {n:7,  sino:'칠(chil)',  native:'일곱(ilgob)'},
  {n:8,  sino:'팔(pal)',   native:'여덟(yeodeol)'},
  {n:9,  sino:'구(gu)',    native:'아홉(ahob)'},
  {n:10, sino:'십(sip)',   native:'열(yeol)'},
  {n:20, sino:'이십(isip)',native:'스물(seumul)'},
  {n:30, sino:'삼십(samsip)',native:'서른(seorun)'},
  {n:40, sino:'사십(sasip)',native:'마흔(maheun)'},
  {n:50, sino:'오십(osip)',native:'쉰(swin)'},
  {n:100,sino:'백(baek)',  native:'—'},
  {n:1000,sino:'천(cheon)',native:'—'},
  {n:2000,sino:'이천(icheon)',native:'—'},
  {n:3000,sino:'삼천(samcheon)',native:'—'},
  {n:10000,sino:'만(man)',  native:'—'},
  {n:20000,sino:'이만(iman)',native:'—'},
  {n:100000,sino:'십만(sipman)',native:'—'},
];

const NUM_USES = [
  {type:'Sino-Korean',uses:'Prices, dates, floors, phone numbers, minutes, months',ex:'삼만 원 = ₩30,000'},
  {type:'Native Korean',uses:'Counting objects (bottles, people), age, hours on clock',ex:'두 시 = 2 o\'clock · 스물 살 = 20 years old'},
];

// ─── Money Data ───────────────────────────────────────────────────────────────
const MONEY = {
  coins:[
    {won:'₩1',  note:'Almost never used'},
    {won:'₩5',  note:'Almost never used'},
    {won:'₩10', note:'Rare'},
    {won:'₩50', note:'Uncommon'},
    {won:'₩100',note:'Common — ≈ $0.07 USD'},
    {won:'₩500',note:'Common coin — ≈ $0.37 USD'},
  ],
  bills:[
    {won:'₩1,000', kr:'천 원 (cheon won)',   usd:'≈ $0.75',  note:'Smallest bill — like a $1'},
    {won:'₩5,000', kr:'오천 원 (ocheon won)', usd:'≈ $3.70',  note:'Street food, snacks'},
    {won:'₩10,000',kr:'만 원 (man won)',      usd:'≈ $7.40',  note:'Most used bill — like a $10'},
    {won:'₩50,000',kr:'오만 원 (oman won)',   usd:'≈ $37',    note:'Largest bill'},
  ],
  readingPrices:[
    {price:'₩500',     kr:'오백 원',       breakdown:'오(5) + 백(100) = 500'},
    {price:'₩1,200',   kr:'천이백 원',     breakdown:'천(1,000) + 이(2) + 백(100) = 1,200'},
    {price:'₩3,500',   kr:'삼천오백 원',   breakdown:'삼(3) + 천(1,000) + 오(5) + 백(100) = 3,500'},
    {price:'₩12,000',  kr:'만이천 원',     breakdown:'만(10,000) + 이(2) + 천(1,000) = 12,000'},
    {price:'₩25,000',  kr:'이만오천 원',   breakdown:'이(2) + 만(10,000) + 오(5) + 천(1,000) = 25,000'},
    {price:'₩100,000', kr:'십만 원',       breakdown:'십(10) + 만(10,000) = 100,000'},
  ],
  phrases:[
    {k:'얼마예요?',       r:'Eolmayeyo?',      e:'How much is it?'},
    {k:'비싸요.',         r:'Bissayo.',         e:"It's expensive."},
    {k:'싸요.',           r:'Ssayo.',           e:"It's cheap."},
    {k:'깎아 주세요.',     r:'Kkakka juseyo.',  e:'Please give me a discount. (markets only)'},
    {k:'카드 돼요?',      r:'Kadeu dwaeyo?',   e:'Do you accept cards?'},
    {k:'현금이에요.',     r:'Hyeongeum-ieyo.', e:"It's cash."},
    {k:'거스름돈 주세요.',r:'Geoseureum-don juseyo.',e:'My change please.'},
    {k:'영수증 주세요.',  r:'Yeongsujeung juseyo.',e:'Receipt please.'},
  ],
};

// ─── Module Vocabulary Data ───────────────────────────────────────────────────
const MODS = [
  {id:'cls',title:'Classroom Phrases',sub:'Book 1 · Class 1',book:1,color:C.blue,
    vocab:[
      {k:'네',r:'ne',e:'yes'},{k:'아니요',r:'aniyo',e:'no'},
      {k:'교실',r:'kyoshil',e:'classroom'},{k:'사용어',r:'sayongo',e:'phrase / words used'},
      {k:'수업',r:'suop',e:'class'},{k:'조금',r:'chogum',e:'a little'},
      {k:'질문',r:'chilmon',e:'question'},{k:'감사합니다',r:'kamsahamnida',e:'thank you'},
      {k:'영어',r:'yongo',e:'English'},{k:'한국어',r:'hangugo',e:'Korean'},
      {k:'숙제',r:'sukje',e:'homework'},{k:'학생',r:'haksaeng',e:'student'},
      {k:'선생님',r:'sonsaengnim',e:'teacher'},{k:'다음 주',r:'taum chu',e:'next week'},
    ],
    phrases:[
      {k:'알아요?',r:'Arayo?',e:'Do you understand?'},
      {k:'네, 알아요.',r:'Ne, Arayo.',e:'I understand.'},
      {k:'아니요, 모르겠어요.',r:'Aniyo, morugessoyo.',e:"I don't understand."},
      {k:'조금 알아요.',r:'Chogum arayo.',e:'I understand a little.'},
      {k:'다시요.',r:'Tashiyo.',e:'One more time.'},
      {k:'질문 있어요?',r:'Chilmon issoyo?',e:'Do you have any questions?'},
      {k:'괜찮아요?',r:'Kwaenchanayo?',e:'Are you okay?'},
      {k:'괜찮아요.',r:'Kwaenchanayo.',e:"I'm okay."},
      {k:'천천히 말해 주세요.',r:'Cheoncheonhi malhae juseyo.',e:'Please speak slowly.'},
      {k:'다시 말해 주세요.',r:'Dasi malhae juseyo.',e:'Please say that again.'},
    ]},
  {id:'greet',title:'Greetings',sub:'Book 1 · Class 1',book:1,color:C.green,
    vocab:[
      {k:'안녕하세요',r:'annyeonghaseyo',e:'hello / how are you?'},
      {k:'안녕히 가세요',r:'annyeonghi kaseyo',e:'goodbye (to someone leaving)'},
      {k:'안녕히 계세요',r:'annyeonghi kyeseyo',e:'goodbye (as you leave)'},
      {k:'이름',r:'irum',e:'name'},{k:'반갑습니다',r:'pangapseumnida',e:'nice to meet you'},
      {k:'죄송합니다',r:'joesonghamnida',e:'I\'m sorry / excuse me'},
      {k:'괜찮아요',r:'gwaenchanayo',e:'it\'s okay / no problem'},
      {k:'여기요',r:'yeogiyo',e:'excuse me (to get attention)'},
      {k:'잠깐만요',r:'jamkkanmanyo',e:'just a moment'},
    ],
    phrases:[
      {k:'안녕하세요!',r:'Annyeonghaseyo!',e:'Hello!'},
      {k:'안녕히 가세요.',r:'Annyeonghi kaseyo.',e:'Goodbye (they leave).'},
      {k:'안녕히 계세요.',r:'Annyeonghi kyeseyo.',e:'Goodbye (you leave).'},
      {k:'이름이 뭐예요?',r:'Irumi mwoyeyo?',e:'What is your name?'},
      {k:'제 이름은 ___예요.',r:'Je irumun ___yeyo.',e:'My name is ___.'},
      {k:'만나서 반갑습니다.',r:'Mannaso pangapseumnida.',e:'Nice to meet you.'},
      {k:'죄송합니다.',r:'Joesonghamnida.',e:"I'm sorry."},
      {k:'괜찮아요.',r:'Gwaenchanayo.',e:"It's okay."},
      {k:'잠깐만요.',r:'Jamkkanmanyo.',e:'Just a moment.'},
    ]},
  {id:'countries',title:'Countries & Languages',sub:'Book 1 · Class 2',book:1,color:C.purple,
    vocab:[
      {k:'미국',r:'miguk',e:'America'},{k:'일본',r:'ilbon',e:'Japan'},
      {k:'한국',r:'hanguk',e:'Korea'},{k:'태국',r:'taeguk',e:'Thailand'},
      {k:'중국',r:'chungguk',e:'China'},{k:'호주',r:'hoju',e:'Australia'},
      {k:'영국',r:'yongguk',e:'England'},{k:'프랑스',r:'purangsu',e:'France'},
      {k:'독일',r:'togil',e:'Germany'},{k:'스페인',r:'supein',e:'Spain'},
      {k:'한국 사람',r:'hanguk saram',e:'Korean person'},{k:'나라',r:'nara',e:'country'},
      {k:'저',r:'cho',e:'I (formal)'},{k:'영어',r:'yongo',e:'English'},
      {k:'한국어',r:'hangugo',e:'Korean language'},{k:'중국어',r:'chunggugo',e:'Chinese'},
      {k:'불어',r:'puro',e:'French'},{k:'독일어',r:'togilo',e:'German'},
      {k:'스페인어',r:'supeino',e:'Spanish'},{k:'아랍어',r:'arabo',e:'Arabic'},
    ],
    phrases:[
      {k:'어느 나라 사람이에요?',r:'Onu nara saramieyo?',e:'Where are you from?'},
      {k:'저는 미국 사람이에요.',r:'Chonun miguk saramieyo.',e:"I'm American."},
      {k:'어느 나라에서 왔어요?',r:'Onu naraeso wassoyo?',e:'Which country are you from?'},
      {k:'한국어를 해요?',r:'Hangugorŭl haeyo?',e:'Do you speak Korean?'},
      {k:'네, 조금 해요.',r:'Ne, chogum haeyo.',e:'Yes, a little.'},
      {k:'한국어를 조금 해요.',r:'Hangugorŭl chogum haeyo.',e:'I speak a little Korean.'},
      {k:'영어 할 수 있어요?',r:'Yeongeo hal su isseoyo?',e:'Can you speak English?'},
    ]},
  {id:'jobs',title:'Occupations',sub:'Book 1 · Class 3',book:1,color:C.orange,
    vocab:[
      {k:'직업',r:'chikob',e:'job / occupation'},{k:'회사원',r:'hoesawon',e:'company employee'},
      {k:'컴퓨터 프로그래머',r:'kompyuto puroguraemo',e:'programmer'},
      {k:'예술가',r:'yesulga',e:'artist'},{k:'의사',r:'uisa',e:'doctor'},
      {k:'선생님',r:'sonsaengnim',e:'teacher'},{k:'간호사',r:'ganhosa',e:'nurse'},
      {k:'요리사',r:'yorisa',e:'chef'},{k:'학생',r:'haksaeng',e:'student'},
      {k:'뭐',r:'mwo',e:'what'},{k:'어디',r:'odi',e:'where'},
    ],
    phrases:[
      {k:'직업이 뭐예요?',r:'Chikopi mwoyeyo?',e:'What is your job?'},
      {k:'저는 의사예요.',r:'Chonun uisayeyo.',e:"I'm a doctor."},
      {k:'저는 학생이에요.',r:'Chonun haksaengieyo.',e:"I'm a student."},
      {k:'저는 회사원이에요.',r:'Chonun hoesawoniyeyo.',e:"I'm a company employee."},
      {k:'어디에서 일해요?',r:'Odieso ilhaeyo?',e:'Where do you work?'},
      {k:'학교에서 일해요.',r:'Hakgyoeso ilhaeyo.',e:'I work at a school.'},
      {k:'병원에서 일해요.',r:'Byeonguoneso ilhaeyo.',e:'I work at a hospital.'},
    ]},
  {id:'family',title:'Family',sub:'Book 1 · Class 6',book:1,color:C.pink,
    vocab:[
      {k:'가족',r:'kajok',e:'family'},{k:'엄마',r:'omma',e:'mom (informal)'},
      {k:'어머니',r:'omoni',e:'mother (formal)'},{k:'아빠',r:'appa',e:'dad (informal)'},
      {k:'아버지',r:'aboji',e:'father (formal)'},{k:'형',r:'hyong',e:'older brother (male speaker)'},
      {k:'오빠',r:'oppa',e:'older brother (female speaker)'},{k:'누나',r:'nuna',e:'older sister (male speaker)'},
      {k:'언니',r:'onni',e:'older sister (female speaker)'},{k:'여동생',r:'yodongsaeng',e:'younger sister'},
      {k:'남동생',r:'namdongsaeng',e:'younger brother'},{k:'할머니',r:'halmoni',e:'grandmother'},
      {k:'할아버지',r:'halaboji',e:'grandfather'},{k:'아이',r:'ai',e:'child'},
      {k:'아내',r:'anae',e:'wife'},{k:'남편',r:'nampyon',e:'husband'},
      {k:'친구',r:'chingu',e:'friend'},{k:'남자친구',r:'namjachingu',e:'boyfriend'},
      {k:'여자친구',r:'yeojachingu',e:'girlfriend'},
    ],
    phrases:[
      {k:'가족이 있어요?',r:'Kajogi issoyo?',e:'Do you have family?'},
      {k:'가족이 몇 명이에요?',r:'Kajogi myot myongieyo?',e:'How many family members?'},
      {k:'형제가 있어요?',r:'Hyongjega issoyo?',e:'Do you have siblings?'},
      {k:'네, 형이 한 명 있어요.',r:'Ne, hyongi han myong issoyo.',e:'Yes, I have one older brother.'},
      {k:'아니요, 없어요.',r:'Aniyo, opsoyo.',e:'No, I do not.'},
      {k:'결혼했어요?',r:'Kyolhon haesseoyo?',e:'Are you married?'},
      {k:'네, 결혼했어요.',r:'Ne, kyolhon haesseoyo.',e:'Yes, I am married.'},
    ]},
  {id:'things',title:'Places & Objects',sub:'Book 1 · Class 7',book:1,color:C.teal,
    vocab:[
      {k:'어디',r:'odi',e:'where'},{k:'여기',r:'yogi',e:'here'},
      {k:'거기',r:'kogi',e:'there (near you)'},{k:'저기',r:'chogi',e:'over there'},
      {k:'이게',r:'ige',e:'this thing'},{k:'책',r:'chaek',e:'book'},
      {k:'의자',r:'uija',e:'chair'},{k:'탁자',r:'takja',e:'table'},
      {k:'화장실',r:'hwajangsil',e:'restroom'},{k:'출구',r:'chulgu',e:'exit'},
      {k:'입구',r:'ipgu',e:'entrance'},{k:'편의점',r:'pyeonuijeom',e:'convenience store'},
      {k:'약국',r:'yakguk',e:'pharmacy'},{k:'은행',r:'eunhaeng',e:'bank / ATM'},
      {k:'지하철',r:'jihacheol',e:'subway'},{k:'버스',r:'beoseu',e:'bus'},
      {k:'택시',r:'taeksi',e:'taxi'},{k:'호텔',r:'hotel',e:'hotel'},
    ],
    phrases:[
      {k:'이게 뭐예요?',r:'Ige mwoyeyo?',e:'What is this?'},
      {k:'여기 있어요.',r:'Yogi issoyo.',e:'It is here.'},
      {k:'어디에 있어요?',r:'Odie issoyo?',e:'Where is it?'},
      {k:'화장실이 어디예요?',r:'Hwajangshiri odiyeyo?',e:'Where is the restroom?'},
      {k:'지하철역이 어디예요?',r:'Jihacheolyogi odiyeyo?',e:'Where is the subway station?'},
      {k:'___ 가주세요.',r:'___gajuseyo.',e:'Please take me to ___ (taxi).'},
      {k:'여기서 내려 주세요.',r:'Yogiso naeryo juseyo.',e:'Please drop me off here.'},
      {k:'얼마나 걸려요?',r:'Eolmana geollyeoyo?',e:'How long does it take?'},
    ]},
  {id:'food',title:'Food & Drink',sub:'Book 2 · Class 1',book:2,color:C.lime,
    vocab:[
      {k:'음식',e:'food'},{k:'음료수',e:'drinks'},{k:'무슨',e:'what kind'},
      {k:'생선',e:'fish'},{k:'고기',e:'meat'},{k:'계란',e:'eggs'},
      {k:'빵',e:'bread'},{k:'야채',e:'vegetables'},{k:'과일',e:'fruit'},
      {k:'밥',e:'rice'},{k:'국',e:'soup'},{k:'물',e:'water'},
      {k:'우유',e:'milk'},{k:'커피',e:'coffee'},{k:'홍차',e:'black tea'},
      {k:'포도주',e:'wine'},{k:'술',e:'alcohol'},{k:'차',e:'tea'},
      {k:'맥주',e:'beer'},{k:'주스',e:'juice'},{k:'마시다',e:'to drink'},
      {k:'먹다',e:'to eat'},{k:'라면',e:'ramen'},{k:'김치',e:'kimchi'},
      {k:'비빔밥',e:'bibimbap'},{k:'삼겹살',e:'grilled pork belly'},
    ],
    phrases:[
      {k:'무슨 음식을 좋아해요?',e:'What kind of food do you like?'},
      {k:'차를 좋아해요.',e:'I like tea.'},
      {k:'고기를 좋아해요.',e:'I like meat.'},
      {k:'저는 생선을 안 좋아해요.',e:"I don't like fish."},
      {k:'술을 마셔요?',e:'Do you drink alcohol?'},
      {k:'뭘 마셔요?',e:'What do you drink?'},
      {k:'물을 마셔요.',e:'I drink water.'},
      {k:'맵지 않게 해 주세요.',e:'Please make it not spicy.'},
      {k:'알레르기가 있어요.',e:'I have allergies.'},
    ]},
  {id:'meals',title:'Meals',sub:'Book 2 · Class 2',book:2,color:C.orange,
    vocab:[
      {k:'식사',e:'meal'},{k:'아침',e:'breakfast'},{k:'점심',e:'lunch'},
      {k:'저녁',e:'dinner'},{k:'간식',e:'snack'},{k:'혼자',e:'alone'},
      {k:'하고',e:'with'},{k:'누구하고',e:'with who'},{k:'보통',e:'usually'},
      {k:'자주',e:'often'},{k:'가끔',e:'sometimes'},{k:'항상',e:'always'},
    ],
    phrases:[
      {k:'아침을 먹어요?',e:'Do you eat breakfast?'},
      {k:'아침을 안 먹어요.',e:"I don't eat breakfast."},
      {k:'점심으로 뭘 먹어요?',e:'What do you eat for lunch?'},
      {k:'밥을 먹어요.',e:'I eat rice.'},
      {k:'저는 보통 빵을 먹어요.',e:'I usually eat bread.'},
      {k:'누구하고 먹어요?',e:'Who do you eat with?'},
      {k:'친구하고 먹어요.',e:'I eat with my friend.'},
      {k:'혼자 먹어요.',e:'I eat by myself.'},
      {k:'어디에서 먹어요?',e:'Where do you eat?'},
    ]},
  {id:'restdesc',title:'Describing Restaurants',sub:'Book 2 · Class 3',book:2,color:C.teal,
    vocab:[
      {k:'식당',e:'restaurant'},{k:'가게',e:'store'},{k:'밖',e:'outside'},
      {k:'가다',e:'to go'},{k:'값싼',e:'cheap'},{k:'비싼',e:'expensive'},
      {k:'조용한',e:'quiet'},{k:'맛있는',e:'delicious'},{k:'맛없는',e:'tastes bad'},
      {k:'빠른',e:'fast'},{k:'느린',e:'slow'},{k:'깨끗한',e:'clean'},
      {k:'있어요',e:'there is'},{k:'없어요',e:'there is not'},
    ],
    phrases:[
      {k:'어떤 식당에 가요?',e:'Which restaurant do you go to?'},
      {k:'라면이 있어요?',e:'Do they have ramen?'},
      {k:'네, 있어요.',e:'Yes, they have it.'},
      {k:'아니요, 없어요.',e:"No, they don't have it."},
      {k:'식당이 어디에 있어요?',e:'Where is the restaurant?'},
      {k:'그 식당에 라면이 있어요?',e:'Does that restaurant have ramen?'},
    ]},
  {id:'atrest',title:'At the Restaurant',sub:'Book 2 · Class 5',book:2,color:C.red,
    vocab:[
      {k:'화장실',e:'restroom'},{k:'몇 분',e:'how many people'},
      {k:'한 사람',e:'one person'},{k:'두 사람',e:'two people'},
      {k:'많이',e:'a lot of'},{k:'만석',e:'full / no seats'},
      {k:'주세요',e:'please give me'},{k:'계산서',e:'bill'},
      {k:'메뉴',e:'menu'},{k:'추천',e:'recommendation'},
    ],
    phrases:[
      {k:'화장실이 어디예요?',e:'Where is the restroom?'},
      {k:'몇 분이세요?',e:'How many people?'},
      {k:'두 사람이에요.',e:'Two people.'},
      {k:'만석이에요.',e:'It is full.'},
      {k:'메뉴 주세요.',e:'Please bring the menu.'},
      {k:'이거 주세요.',e:'This please. (point at menu)'},
      {k:'물 두 개 주세요.',e:'Two waters, please.'},
      {k:'계산서 주세요.',e:"We'd like the bill."},
      {k:'맛있어요!',e:'It\'s delicious!'},
      {k:'여기요!',e:'Excuse me! (calling staff)'},
    ]},
  {id:'shop',title:'Shopping',sub:'Book 2 · Classes 6 & 7',book:2,color:C.purple,
    vocab:[
      {k:'쇼핑',e:'shopping'},{k:'사다',e:'to buy'},{k:'옷 가게',e:'clothing store'},
      {k:'백화점',e:'department store'},{k:'식품점',e:'grocery store'},
      {k:'가방',e:'bag'},{k:'신발',e:'shoes'},{k:'옷',e:'clothes'},
      {k:'빨강',e:'red'},{k:'노랑',e:'yellow'},{k:'파랑',e:'blue'},
      {k:'녹색',e:'green'},{k:'검정',e:'black'},{k:'흰색',e:'white'},
      {k:'작은',e:'small'},{k:'큰',e:'big'},{k:'짧아요',e:'short'},
      {k:'길어요',e:'long'},{k:'어서 오세요',e:'welcome (to our store)'},
    ],
    phrases:[
      {k:'무엇을 사요?',e:'What will you buy?'},
      {k:'어서 오세요.',e:'Welcome to our store.'},
      {k:'이거 얼마예요?',e:'How much is it?'},
      {k:'이거 한 개 주세요.',e:'Please give me one of these.'},
      {k:'저거 주세요.',e:'Please give me that one.'},
      {k:'이것은 짧아요.',e:'This is short.'},
      {k:'이것은 길어요.',e:'This is long.'},
      {k:'다른 색깔 있어요?',e:'Do you have another color?'},
      {k:'다른 사이즈 있어요?',e:'Do you have another size?'},
    ]},
];

// ─── Drills Data ──────────────────────────────────────────────────────────────
const DRILLS = [
  // Greetings
  {q:'How do you say "Hello" formally?',opts:['안녕하세요','안녕히 가세요','감사합니다','죄송합니다'],a:0,cat:'Greetings'},
  {q:'You are leaving your friend\'s home. You say:',opts:['안녕히 계세요','안녕히 가세요','안녕하세요','반갑습니다'],a:0,cat:'Greetings'},
  {q:'Your friend is leaving your home. You say:',opts:['안녕히 가세요','안녕히 계세요','잘 자요','또 봐요'],a:0,cat:'Greetings'},
  {q:'Complete: 만나서 ___.',opts:['반갑습니다','감사합니다','괜찮아요','죄송합니다'],a:0,cat:'Greetings',hint:'Nice to meet you'},
  {q:'"It\'s okay / no problem" in Korean:',opts:['괜찮아요','모르겠어요','있어요','없어요'],a:0,cat:'Greetings'},
  // Names & Intro
  {q:'Complete: 제 ___ 은 김민준이에요.',opts:['이름','친구','나라','직업'],a:0,cat:'Introductions',hint:'My ___ is Kim Min-jun.'},
  {q:'"I am American" in Korean:',opts:['저는 미국 사람이에요.','저는 한국 사람이에요.','저는 영국 사람이에요.','저는 일본 사람이에요.'],a:0,cat:'Introductions'},
  {q:'"I speak a little Korean":',opts:['한국어를 조금 해요.','한국어를 많이 해요.','영어를 해요.','한국어가 없어요.'],a:0,cat:'Introductions'},
  {q:'How do you ask "What is your job?"',opts:['직업이 뭐예요?','이름이 뭐예요?','나라가 어디예요?','나이가 어떻게 돼요?'],a:0,cat:'Introductions'},
  {q:'"I am a student" in Korean:',opts:['저는 학생이에요.','저는 의사예요.','저는 선생님이에요.','저는 요리사예요.'],a:0,cat:'Introductions'},
  // Classroom
  {q:'"I don\'t understand" in Korean:',opts:['아니요, 모르겠어요.','네, 알아요.','조금 알아요.','다시요.'],a:0,cat:'Classroom'},
  {q:'You need something repeated. You say:',opts:['다시요.','괜찮아요.','없어요.','비싸요.'],a:0,cat:'Classroom',hint:'One more time.'},
  {q:'"Please speak slowly":',opts:['천천히 말해 주세요.','다시 말해 주세요.','조금 알아요.','모르겠어요.'],a:0,cat:'Classroom'},
  // Numbers
  {q:'What is 3 in Sino-Korean?',opts:['삼','셋','세','사'],a:0,cat:'Numbers'},
  {q:'What is 7 in Native Korean?',opts:['일곱','칠','여덟','여섯'],a:0,cat:'Numbers'},
  {q:'How do you say 10,000 won?',opts:['만 원','천 원','백 원','억 원'],a:0,cat:'Numbers'},
  {q:'Native Korean numbers are used for:',opts:['Counting objects / age','Prices / money','Dates / months','Phone numbers'],a:0,cat:'Numbers'},
  {q:'How do you say "How old are you?"',opts:['몇 살이에요?','몇 시예요?','몇 분이에요?','몇 개예요?'],a:0,cat:'Numbers'},
  {q:'₩25,000 in Korean is:',opts:['이만오천 원','만오천 원','이천오백 원','오만 원'],a:0,cat:'Money'},
  {q:'"How much is it?" in Korean:',opts:['얼마예요?','어디예요?','뭐예요?','언제예요?'],a:0,cat:'Money'},
  // Restaurant
  {q:'You\'re ready to order. You say:',opts:['이거 주세요.','계산서 주세요.','메뉴 주세요.','물 주세요.'],a:0,cat:'Restaurant',hint:'This please (pointing)'},
  {q:'"Where is the restroom?" in Korean:',opts:['화장실이 어디예요?','화장실이 얼마예요?','화장실이 있어요?','화장실이 뭐예요?'],a:0,cat:'Restaurant'},
  {q:'"The food is delicious!" in Korean:',opts:['맛있어요!','맛없어요!','배고파요!','배불러요!'],a:0,cat:'Restaurant'},
  {q:'You want the bill. You say:',opts:['계산서 주세요.','메뉴 주세요.','물 주세요.','이거 주세요.'],a:0,cat:'Restaurant'},
  {q:'"Do you accept cards?" in Korean:',opts:['카드 돼요?','현금이에요?','얼마예요?','영수증 주세요.'],a:0,cat:'Restaurant'},
  // Food
  {q:'"I like meat" in Korean:',opts:['고기를 좋아해요.','고기를 싫어해요.','고기를 먹어요.','고기가 없어요.'],a:0,cat:'Food'},
  {q:'Complete: 아침을 ___ 먹어요. ("I don\'t eat breakfast")',opts:['안','못','잘','다'],a:0,cat:'Food',hint:'안 = negation'},
  {q:'"What do you drink?" in Korean:',opts:['뭘 마셔요?','뭘 먹어요?','뭘 좋아해요?','뭘 사요?'],a:0,cat:'Food'},
  // Locations
  {q:'"Where is the subway station?"',opts:['지하철역이 어디예요?','지하철역이 얼마예요?','지하철이 있어요?','지하철로 가요?'],a:0,cat:'Directions'},
  {q:'In a taxi, to say "go to Gangnam":',opts:['강남 가주세요.','강남 어디예요?','강남 얼마예요?','강남 있어요?'],a:0,cat:'Directions'},
  {q:'"Please drop me off here" in Korean:',opts:['여기서 내려 주세요.','여기서 가주세요.','여기서 멈춰요.','여기 있어요.'],a:0,cat:'Directions'},
  // Shopping
  {q:'"Do you have another color?"',opts:['다른 색깔 있어요?','다른 사이즈 있어요?','이거 얼마예요?','저거 주세요.'],a:0,cat:'Shopping'},
  {q:'"Welcome to our store" in Korean:',opts:['어서 오세요.','안녕히 가세요.','감사합니다.','안녕하세요.'],a:0,cat:'Shopping'},
  // Hangul
  {q:'Which vowel sounds like "oo" in moon?',opts:['ㅜ','ㅗ','ㅡ','ㅣ'],a:0,cat:'Hangul'},
  {q:'Which consonant is silent at the start but makes "ng" at the end?',opts:['ㅇ','ㅎ','ㄴ','ㄹ'],a:0,cat:'Hangul'},
  {q:'ㅋ, ㅌ, ㅍ are all:',opts:['Aspirated (puff of air)','Double consonants','Silent consonants','Nasal consonants'],a:0,cat:'Hangul'},
  {q:'In the syllable block 밥, the final consonant (받침) is:',opts:['ㅂ','ㅏ','ㅁ','ㅗ'],a:0,cat:'Hangul',hint:'밥 = rice'},
];

// ─── All vocab flat ───────────────────────────────────────────────────────────
const ALL_VOCAB = MODS.flatMap(m => m.vocab.map(v=>({...v,modId:m.id,modTitle:m.title,modColor:m.color})));

// ─── Speak ────────────────────────────────────────────────────────────────────
const SpeakBtn = ({ text, accent=C.blue, size=42 }) => {
  const [active, setActive] = useState(false);
  const handle = useCallback((e)=>{
    e.stopPropagation();
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/___/g,''));
    u.lang='ko-KR'; u.rate=0.8;
    u.onstart=()=>setActive(true);
    u.onend=()=>setActive(false);
    u.onerror=()=>setActive(false);
    window.speechSynthesis.speak(u);
  },[text]);
  return (
    <button onClick={handle} aria-label="Play pronunciation" style={{
      width:size,height:size,borderRadius:'50%',flexShrink:0,border:'none',
      background:active?accent:C.s3,cursor:'pointer',
      display:'flex',alignItems:'center',justifyContent:'center',
      transition:'background 0.15s',
    }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active?'#fff':C.t2}>
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
      </svg>
    </button>
  );
};

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHead = ({label})=>(
  <div style={{fontSize:13,fontWeight:700,color:C.t3,letterSpacing:'0.07em',textTransform:'uppercase',marginTop:28,marginBottom:12}}>{label}</div>
);

// ─── Module Card (no progress) ────────────────────────────────────────────────
const ModCard = ({mod, onOpen})=>(
  <button onClick={()=>onOpen(mod.id)} style={{
    background:C.s1,border:`1px solid ${C.border}`,borderRadius:14,
    padding:'18px 16px',textAlign:'left',cursor:'pointer',
    borderLeft:`4px solid ${mod.color}`,width:'100%',
  }}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{flex:1,minWidth:0,marginRight:10}}>
        <div style={{fontSize:17,fontWeight:600,color:C.t1,marginBottom:3,lineHeight:1.3}}>{mod.title}</div>
        <div style={{fontSize:14,color:C.t3}}>{mod.sub}</div>
      </div>
      <div style={{textAlign:'right',flexShrink:0}}>
        <div style={{fontSize:13,color:mod.color,fontWeight:600}}>{mod.vocab.length}v · {mod.phrases.length}p</div>
        <div style={{fontSize:20,color:C.t3,marginTop:2}}>›</div>
      </div>
    </div>
  </button>
);

// ─── Special Section Card ─────────────────────────────────────────────────────
const SpecialCard = ({title,icon,color,sub,onOpen,id})=>(
  <button onClick={()=>onOpen(id)} style={{
    background:C.s1,border:`1px solid ${color}44`,borderRadius:14,
    padding:'18px 16px',textAlign:'left',cursor:'pointer',width:'100%',
    background:`linear-gradient(135deg, ${color}18 0%, ${C.s1} 60%)`,
  }}>
    <div style={{display:'flex',alignItems:'center',gap:14}}>
      <div style={{fontSize:30,lineHeight:1}}>{icon}</div>
      <div style={{flex:1}}>
        <div style={{fontSize:17,fontWeight:700,color:C.t1,marginBottom:3}}>{title}</div>
        <div style={{fontSize:14,color:C.t2}}>{sub}</div>
      </div>
      <div style={{fontSize:22,color:color}}>›</div>
    </div>
  </button>
);

// ─── ALPHABET SECTION ─────────────────────────────────────────────────────────
const AlphabetSection = ({onBack})=>{
  const [sub, setSub] = useState('vowels');
  const tabs = [{id:'vowels',label:'Vowels'},{id:'consonants',label:'Consonants'},{id:'doubles',label:'Double'},{id:'rules',label:'Syllables'}];
  return (
    <div style={{minHeight:'100vh',background:C.bg}}>
      <div style={{background:C.s1,borderBottom:`1px solid ${C.border}`,padding:'16px',position:'sticky',top:0,zIndex:10}}>
        <button onClick={onBack} style={{background:'none',border:'none',color:C.t2,cursor:'pointer',fontSize:15,padding:0,display:'flex',alignItems:'center',gap:6,marginBottom:10}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={C.t2}><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          Back
        </button>
        <div style={{fontSize:20,fontWeight:700,color:C.t1}}>한글 Alphabet</div>
        <div style={{fontSize:14,color:C.t3,marginTop:2}}>Hangul — the Korean writing system</div>
        <div style={{display:'flex',gap:0,marginTop:14,borderBottom:`1px solid ${C.border}`,overflowX:'auto'}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setSub(t.id)} style={{
              flexShrink:0,background:'none',border:'none',cursor:'pointer',
              padding:'10px 14px',fontSize:14,fontWeight:sub===t.id?700:400,
              color:sub===t.id?C.amber:C.t3,
              borderBottom:sub===t.id?`2px solid ${C.amber}`:'2px solid transparent',
            }}>{t.label}</button>
          ))}
        </div>
      </div>
      <div style={{padding:'12px 16px 100px'}}>
        {sub==='vowels' && (
          <>
            <div style={{fontSize:15,color:C.t2,lineHeight:1.7,marginBottom:16,padding:'14px',background:C.s1,borderRadius:12,border:`1px solid ${C.border}`}}>
              Vowels can be divided into <strong style={{color:C.amber}}>basic</strong> (10) and <strong style={{color:C.orange}}>compound</strong> (11). Compound vowels combine two basic vowels. Most beginners focus on the 10 basic vowels first.
            </div>
            <div style={{fontSize:14,fontWeight:700,color:C.amber,marginBottom:10}}>Basic Vowels (10)</div>
            {HANGUL.basicVowels.map((v,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'13px 0',borderBottom:`1px solid ${C.border}`}}>
                <div style={{width:52,fontSize:38,fontFamily:'"Noto Sans KR",sans-serif',color:C.amber,textAlign:'center',lineHeight:1}}>{v.k}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:17,fontWeight:700,color:C.t1,marginBottom:2}}>{v.r}</div>
                  <div style={{fontSize:14,color:C.t2}}>{v.e}</div>
                </div>
                <SpeakBtn text={v.k} accent={C.amber}/>
              </div>
            ))}
            <div style={{fontSize:14,fontWeight:700,color:C.orange,marginTop:20,marginBottom:10}}>Compound Vowels (11)</div>
            {HANGUL.compoundVowels.map((v,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'13px 0',borderBottom:`1px solid ${C.border}`}}>
                <div style={{width:52,fontSize:38,fontFamily:'"Noto Sans KR",sans-serif',color:C.orange,textAlign:'center',lineHeight:1}}>{v.k}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:17,fontWeight:700,color:C.t1,marginBottom:2}}>{v.r}</div>
                  <div style={{fontSize:14,color:C.t2}}>{v.e}</div>
                </div>
                <SpeakBtn text={v.k} accent={C.orange}/>
              </div>
            ))}
          </>
        )}
        {sub==='consonants' && (
          <>
            <div style={{fontSize:15,color:C.t2,lineHeight:1.7,marginBottom:16,padding:'14px',background:C.s1,borderRadius:12,border:`1px solid ${C.border}`}}>
              There are <strong style={{color:C.blue}}>14 basic consonants</strong>. Three (ㅋ ㅌ ㅍ) are aspirated — said with a puff of air. ㅇ is unique: silent at the start of a syllable, "ng" at the end.
            </div>
            {HANGUL.basicConsonants.map((v,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'13px 0',borderBottom:`1px solid ${C.border}`}}>
                <div style={{width:52,fontSize:38,fontFamily:'"Noto Sans KR",sans-serif',color:C.blue,textAlign:'center',lineHeight:1}}>{v.k}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:17,fontWeight:700,color:C.t1,marginBottom:2}}>{v.r}</div>
                  <div style={{fontSize:14,color:C.t2}}>{v.e}</div>
                </div>
                <SpeakBtn text={'아'+v.k==='ㅇ'?'응':v.k+'아'} accent={C.blue}/>
              </div>
            ))}
          </>
        )}
        {sub==='doubles' && (
          <>
            <div style={{fontSize:15,color:C.t2,lineHeight:1.7,marginBottom:16,padding:'14px',background:C.s1,borderRadius:12,border:`1px solid ${C.border}`}}>
              <strong style={{color:C.teal}}>5 double (tense) consonants</strong> are formed by doubling a basic consonant. They create a harder, more abrupt sound — tense from the back of the throat. Common in everyday words.
            </div>
            {HANGUL.doubleConsonants.map((v,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'13px 0',borderBottom:`1px solid ${C.border}`}}>
                <div style={{width:52,fontSize:38,fontFamily:'"Noto Sans KR",sans-serif',color:C.teal,textAlign:'center',lineHeight:1}}>{v.k}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:17,fontWeight:700,color:C.t1,marginBottom:2}}>{v.r}</div>
                  <div style={{fontSize:14,color:C.t2}}>{v.e}</div>
                </div>
              </div>
            ))}
            <div style={{marginTop:20,padding:'14px',background:C.s1,borderRadius:12,border:`1px solid ${C.border}`}}>
              <div style={{fontSize:15,fontWeight:700,color:C.teal,marginBottom:8}}>Examples in words</div>
              {[{k:'까다',e:'to peel (hard k)'},{k:'따뜻하다',e:'warm'},{k:'빠르다',e:'fast'},{k:'쓰다',e:'to write / bitter'},{k:'짜다',e:'salty'}].map((w,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:`1px solid ${C.border}`}}>
                  <div>
                    <span style={{fontSize:18,fontFamily:'"Noto Sans KR",sans-serif',color:C.t1}}>{w.k}</span>
                    <span style={{fontSize:14,color:C.t2,marginLeft:10}}>{w.e}</span>
                  </div>
                  <SpeakBtn text={w.k} accent={C.teal} size={36}/>
                </div>
              ))}
            </div>
          </>
        )}
        {sub==='rules' && (
          <>
            <div style={{fontSize:15,color:C.t2,lineHeight:1.7,marginBottom:16,padding:'14px',background:C.s1,borderRadius:12,border:`1px solid ${C.border}`}}>
              Korean writes in <strong style={{color:C.green}}>syllable blocks</strong>, not left-to-right letters. Each block always contains at least one consonant and one vowel, arranged in a square.
            </div>
            {HANGUL.syllableRules.map((r,i)=>(
              <div key={i} style={{padding:'14px',background:C.s1,borderRadius:12,border:`1px solid ${C.border}`,marginBottom:10}}>
                <div style={{fontSize:16,fontWeight:700,color:C.green,marginBottom:6}}>{r.rule}</div>
                <div style={{fontSize:26,fontFamily:'"Noto Sans KR",sans-serif',color:C.t1,marginBottom:6}}>{r.ex}</div>
                <div style={{fontSize:14,color:C.t2}}>{r.note}</div>
              </div>
            ))}
            <div style={{padding:'16px',background:C.s1,borderRadius:12,border:`1px solid ${C.amber}44`,marginTop:12}}>
              <div style={{fontSize:15,fontWeight:700,color:C.amber,marginBottom:10}}>Try reading these</div>
              {[{k:'한국',e:'Korea'},{k:'사랑',e:'love'},{k:'감사합니다',e:'thank you'},{k:'서울',e:'Seoul'},{k:'비빔밥',e:'bibimbap'}].map((w,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:`1px solid ${C.border}`}}>
                  <div>
                    <div style={{fontSize:22,fontFamily:'"Noto Sans KR",sans-serif',color:C.t1}}>{w.k}</div>
                    <div style={{fontSize:14,color:C.t2}}>{w.e}</div>
                  </div>
                  <SpeakBtn text={w.k} accent={C.amber} size={36}/>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ─── NUMBERS SECTION ─────────────────────────────────────────────────────────
const NumbersSection = ({onBack})=>{
  const [sub,setSub] = useState('table');
  return (
    <div style={{minHeight:'100vh',background:C.bg}}>
      <div style={{background:C.s1,borderBottom:`1px solid ${C.border}`,padding:'16px',position:'sticky',top:0,zIndex:10}}>
        <button onClick={onBack} style={{background:'none',border:'none',color:C.t2,cursor:'pointer',fontSize:15,padding:0,display:'flex',alignItems:'center',gap:6,marginBottom:10}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={C.t2}><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          Back
        </button>
        <div style={{fontSize:20,fontWeight:700,color:C.t1}}>Numbers</div>
        <div style={{display:'flex',gap:0,marginTop:14,borderBottom:`1px solid ${C.border}`}}>
          {[{id:'table',label:'Reference Table'},{id:'usage',label:'When to Use'}].map(t=>(
            <button key={t.id} onClick={()=>setSub(t.id)} style={{
              flex:1,background:'none',border:'none',cursor:'pointer',
              padding:'10px 0',fontSize:14,fontWeight:sub===t.id?700:400,
              color:sub===t.id?C.amber:C.t3,
              borderBottom:sub===t.id?`2px solid ${C.amber}`:'2px solid transparent',
            }}>{t.label}</button>
          ))}
        </div>
      </div>
      <div style={{padding:'12px 16px 100px'}}>
        {sub==='table' && (
          <>
            <div style={{fontSize:15,color:C.t2,lineHeight:1.7,marginBottom:16,padding:'14px',background:C.s1,borderRadius:12,border:`1px solid ${C.border}`}}>
              Korean has <strong style={{color:C.amber}}>two number systems</strong>. Sino-Korean (from Chinese) is used for money, dates, and large numbers. Native Korean is used for counting things and telling the hour.
            </div>
            {/* Table header */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr 1.4fr',gap:1,background:C.border,borderRadius:10,overflow:'hidden',marginBottom:2}}>
              {['Number','Sino-Korean','Native Korean'].map((h,i)=>(
                <div key={i} style={{background:C.s2,padding:'12px 10px',fontSize:13,fontWeight:700,color:C.t3,textAlign:'center'}}>{h}</div>
              ))}
            </div>
            <div style={{borderRadius:10,overflow:'hidden',border:`1px solid ${C.border}`}}>
              {NUMBERS.map((row,i)=>{
                const bg = i%2===0?C.s1:C.bg;
                const isSpecial = row.n>=100;
                return (
                  <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 1.4fr 1.4fr',background:bg,borderBottom:i<NUMBERS.length-1?`1px solid ${C.border}`:'none'}}>
                    <div style={{padding:'13px 10px',fontSize:16,fontWeight:700,color:isSpecial?C.amber:C.t1,textAlign:'center',borderRight:`1px solid ${C.border}`}}>
                      {row.n.toLocaleString()}
                    </div>
                    <div style={{padding:'13px 10px',textAlign:'center',borderRight:`1px solid ${C.border}`}}>
                      <div style={{fontSize:16,fontFamily:'"Noto Sans KR",sans-serif',color:C.blue}}>{row.sino.split('(')[0].trim()}</div>
                      <div style={{fontSize:12,color:C.t3}}>{row.sino.match(/\(([^)]+)\)/)?.[1]||''}</div>
                    </div>
                    <div style={{padding:'13px 10px',textAlign:'center'}}>
                      {row.native==='—'
                        ? <div style={{fontSize:15,color:C.t3}}>—</div>
                        : <>
                            <div style={{fontSize:16,fontFamily:'"Noto Sans KR",sans-serif',color:C.green}}>{row.native.split('(')[0].trim()}</div>
                            <div style={{fontSize:12,color:C.t3}}>{row.native.match(/\(([^)]+)\)/)?.[1]||''}</div>
                          </>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{marginTop:16,padding:'14px',background:C.amber+'15',borderRadius:12,border:`1px solid ${C.amber}44`}}>
              <div style={{fontSize:15,fontWeight:700,color:C.amber,marginBottom:8}}>Building large numbers</div>
              {[
                {ex:'₩15,000',kr:'만 오천 원',note:'10,000 + 5,000'},
                {ex:'₩42,000',kr:'사만 이천 원',note:'40,000 + 2,000'},
                {ex:'35 years old',kr:'서른 다섯 살',note:'30 + 5 (native)'},
                {ex:'3:45 PM',kr:'오후 세 시 사십오 분',note:'Hour native, min Sino'},
              ].map((r,i)=>(
                <div key={i} style={{padding:'10px 0',borderBottom:i<3?`1px solid ${C.border}`:'none'}}>
                  <div style={{fontSize:14,color:C.t2,marginBottom:3}}>{r.ex}</div>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <span style={{fontSize:18,fontFamily:'"Noto Sans KR",sans-serif',color:C.t1}}>{r.kr}</span>
                    <SpeakBtn text={r.kr} accent={C.amber} size={34}/>
                  </div>
                  <div style={{fontSize:12,color:C.t3,marginTop:2}}>{r.note}</div>
                </div>
              ))}
            </div>
          </>
        )}
        {sub==='usage' && (
          <>
            {NUM_USES.map((u,i)=>(
              <div key={i} style={{padding:'16px',background:C.s1,borderRadius:12,border:`1px solid ${i===0?C.blue+'44':C.green+'44'}`,marginBottom:14}}>
                <div style={{fontSize:17,fontWeight:700,color:i===0?C.blue:C.green,marginBottom:8}}>{u.type}</div>
                <div style={{fontSize:15,color:C.t2,marginBottom:8,lineHeight:1.6}}><strong style={{color:C.t1}}>Use for:</strong> {u.uses}</div>
                <div style={{padding:'10px 12px',background:C.bg,borderRadius:8}}>
                  <span style={{fontSize:14,color:C.t3}}>Example: </span>
                  <span style={{fontSize:16,fontFamily:'"Noto Sans KR",sans-serif',color:C.t1}}>{u.ex.split('=')[0]}</span>
                  <span style={{fontSize:14,color:C.t2}}> = {u.ex.split('=')[1]}</span>
                </div>
              </div>
            ))}
            <div style={{padding:'16px',background:C.s1,borderRadius:12,border:`1px solid ${C.border}`,marginBottom:14}}>
              <div style={{fontSize:17,fontWeight:700,color:C.purple,marginBottom:10}}>Time uses BOTH systems</div>
              {[
                {ex:'두 시',note:'2 o\'clock — Native Korean for hours'},
                {ex:'삼십 분',note:'30 minutes — Sino-Korean for minutes'},
                {ex:'두 시 반',note:'2:30 — 반(ban) = half'},
                {ex:'오전 열 시',note:'10 AM — 오전 = AM'},
                {ex:'오후 세 시',note:'3 PM — 오후 = PM'},
              ].map((r,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom:i<4?`1px solid ${C.border}`:'none'}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:18,fontFamily:'"Noto Sans KR",sans-serif',color:C.t1}}>{r.ex}</div>
                    <div style={{fontSize:13,color:C.t2,marginTop:2}}>{r.note}</div>
                  </div>
                  <SpeakBtn text={r.ex} accent={C.purple} size={36}/>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ─── MONEY SECTION ────────────────────────────────────────────────────────────
const MoneySection = ({onBack})=>{
  const [sub,setSub] = useState('bills');
  return (
    <div style={{minHeight:'100vh',background:C.bg}}>
      <div style={{background:C.s1,borderBottom:`1px solid ${C.border}`,padding:'16px',position:'sticky',top:0,zIndex:10}}>
        <button onClick={onBack} style={{background:'none',border:'none',color:C.t2,cursor:'pointer',fontSize:15,padding:0,display:'flex',alignItems:'center',gap:6,marginBottom:10}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={C.t2}><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          Back
        </button>
        <div style={{fontSize:20,fontWeight:700,color:C.t1}}>Korean Won ₩</div>
        <div style={{fontSize:14,color:C.t3,marginTop:2}}>Prices, bills & payment</div>
        <div style={{display:'flex',gap:0,marginTop:14,borderBottom:`1px solid ${C.border}`,overflowX:'auto'}}>
          {[{id:'bills',label:'Bills & Coins'},{id:'reading',label:'Reading Prices'},{id:'phrases',label:'Phrases'}].map(t=>(
            <button key={t.id} onClick={()=>setSub(t.id)} style={{
              flexShrink:0,background:'none',border:'none',cursor:'pointer',
              padding:'10px 14px',fontSize:14,fontWeight:sub===t.id?700:400,
              color:sub===t.id?C.green:C.t3,
              borderBottom:sub===t.id?`2px solid ${C.green}`:'2px solid transparent',
            }}>{t.label}</button>
          ))}
        </div>
      </div>
      <div style={{padding:'12px 16px 100px'}}>
        {sub==='bills' && (
          <>
            <div style={{fontSize:15,color:C.t2,lineHeight:1.7,marginBottom:16,padding:'14px',background:C.s1,borderRadius:12,border:`1px solid ${C.border}`}}>
              The Korean Won (₩) runs at roughly <strong style={{color:C.green}}>₩1,350 per $1 USD</strong>. Everything looks expensive because of the denomination scale — ₩10,000 is like $7.50. Think in 만 (10,000) units.
            </div>
            <div style={{fontSize:15,fontWeight:700,color:C.green,marginBottom:10}}>Bills</div>
            {MONEY.bills.map((b,i)=>(
              <div key={i} style={{padding:'16px',background:C.s1,borderRadius:12,border:`1px solid ${C.border}`,marginBottom:10,display:'flex',alignItems:'center',gap:12}}>
                <div style={{minWidth:80,fontSize:17,fontWeight:700,color:C.green}}>{b.won}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:16,fontFamily:'"Noto Sans KR",sans-serif',color:C.t1,marginBottom:2}}>{b.kr}</div>
                  <div style={{fontSize:14,color:C.amber}}>{b.usd}</div>
                  <div style={{fontSize:13,color:C.t3,marginTop:2}}>{b.note}</div>
                </div>
                <SpeakBtn text={b.kr.split(' (')[0]} accent={C.green}/>
              </div>
            ))}
            <div style={{fontSize:15,fontWeight:700,color:C.t2,marginBottom:10,marginTop:20}}>Coins</div>
            {MONEY.coins.map((c,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0',borderBottom:`1px solid ${C.border}`}}>
                <span style={{fontSize:16,fontWeight:600,color:C.t1}}>{c.won}</span>
                <span style={{fontSize:14,color:C.t3}}>{c.note}</span>
              </div>
            ))}
          </>
        )}
        {sub==='reading' && (
          <>
            <div style={{fontSize:15,color:C.t2,lineHeight:1.7,marginBottom:16,padding:'14px',background:C.s1,borderRadius:12,border:`1px solid ${C.border}`}}>
              Korean reads prices from <strong style={{color:C.amber}}>largest to smallest</strong> unit — 만(10k) → 천(1k) → 백(100) → 십(10) → 일(1). The word 원 (won) always comes at the end.
            </div>
            {MONEY.readingPrices.map((p,i)=>(
              <div key={i} style={{padding:'16px',background:C.s1,borderRadius:12,border:`1px solid ${C.border}`,marginBottom:10}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                  <div style={{fontSize:22,fontWeight:700,color:C.amber}}>{p.price}</div>
                  <SpeakBtn text={p.kr} accent={C.amber}/>
                </div>
                <div style={{fontSize:22,fontFamily:'"Noto Sans KR",sans-serif',color:C.t1,marginBottom:6}}>{p.kr}</div>
                <div style={{padding:'8px 10px',background:C.bg,borderRadius:8}}>
                  <div style={{fontSize:13,color:C.t3}}>{p.breakdown}</div>
                </div>
              </div>
            ))}
          </>
        )}
        {sub==='phrases' && (
          <>
            <div style={{fontSize:15,color:C.t2,lineHeight:1.7,marginBottom:16,padding:'14px',background:C.s1,borderRadius:12,border:`1px solid ${C.border}`}}>
              Most shops and restaurants in Seoul accept cards. At traditional markets (시장), cash is expected and bargaining is acceptable with 깎아 주세요.
            </div>
            {MONEY.phrases.map((p,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'14px 0',borderBottom:`1px solid ${C.border}`}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:20,fontFamily:'"Noto Sans KR",sans-serif',color:C.t1,marginBottom:3}}>{p.k}</div>
                  <div style={{fontSize:13,color:C.green,marginBottom:2}}>{p.r}</div>
                  <div style={{fontSize:15,color:C.t2}}>{p.e}</div>
                </div>
                <SpeakBtn text={p.k} accent={C.green}/>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

// ─── MODULE DETAIL ────────────────────────────────────────────────────────────
const ModuleDetail = ({modId, onBack})=>{
  const mod = MODS.find(m=>m.id===modId);
  const [subTab, setSubTab] = useState('vocab');
  const items = subTab==='vocab' ? mod.vocab : mod.phrases;
  return (
    <div style={{minHeight:'100vh',background:C.bg}}>
      <div style={{background:C.s1,borderBottom:`1px solid ${C.border}`,padding:'16px',position:'sticky',top:0,zIndex:10}}>
        <button onClick={onBack} style={{background:'none',border:'none',color:C.t2,cursor:'pointer',fontSize:15,padding:0,display:'flex',alignItems:'center',gap:6,marginBottom:10}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill={C.t2}><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          Back
        </button>
        <div style={{fontSize:20,fontWeight:700,color:C.t1,lineHeight:1.2}}>{mod.title}</div>
        <div style={{fontSize:14,color:C.t3,marginTop:2}}>{mod.sub} · {mod.vocab.length} vocab · {mod.phrases.length} phrases</div>
        <div style={{display:'flex',gap:0,marginTop:14,borderBottom:`1px solid ${C.border}`}}>
          {['vocab','phrases'].map(t=>(
            <button key={t} onClick={()=>setSubTab(t)} style={{
              flex:1,background:'none',border:'none',cursor:'pointer',
              padding:'10px 0',fontSize:15,fontWeight:subTab===t?700:400,
              color:subTab===t?mod.color:C.t3,
              borderBottom:subTab===t?`2px solid ${mod.color}`:'2px solid transparent',
            }}>{t==='vocab'?`Vocabulary (${mod.vocab.length})`:`Phrases (${mod.phrases.length})`}</button>
          ))}
        </div>
      </div>
      <div style={{padding:'8px 16px 100px'}}>
        {items.map((item,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'15px 0',borderBottom:`1px solid ${C.border}`}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:21,fontFamily:'"Noto Sans KR",sans-serif',color:C.t1,lineHeight:1.3,marginBottom:3}}>{item.k}</div>
              {item.r && <div style={{fontSize:13,color:mod.color,marginBottom:3}}>{item.r}</div>}
              <div style={{fontSize:16,color:C.t2}}>{item.e}</div>
            </div>
            <SpeakBtn text={item.k} accent={mod.color}/>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── LEARN TAB ────────────────────────────────────────────────────────────────
const LearnTab = ({onOpen})=>{
  const b1 = MODS.filter(m=>m.book===1), b2 = MODS.filter(m=>m.book===2);
  return (
    <div style={{padding:'0 16px 100px'}}>
      <div style={{padding:'22px 0 10px'}}>
        <div style={{fontSize:26,fontWeight:700,color:C.t1,fontFamily:'"Noto Sans KR",sans-serif'}}>한국어 학습</div>
        <div style={{fontSize:15,color:C.t3}}>Korean Language — Beginner Course</div>
      </div>
      <SectionHead label="Core References"/>
      <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:4}}>
        <SpecialCard title="Hangul Alphabet" icon="가" color={C.amber} sub="Vowels, consonants, syllable rules" onOpen={onOpen} id="alphabet"/>
        <SpecialCard title="Numbers" icon="숫" color={C.blue} sub="Sino & Native Korean · reference table" onOpen={onOpen} id="numbers"/>
        <SpecialCard title="Korean Won ₩" icon="₩" color={C.green} sub="Bills, prices, payment phrases" onOpen={onOpen} id="money"/>
      </div>
      <SectionHead label="Book 1 — Beginner I"/>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {b1.map(m=><ModCard key={m.id} mod={m} onOpen={onOpen}/>)}
      </div>
      <SectionHead label="Book 2 — Beginner II"/>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {b2.map(m=><ModCard key={m.id} mod={m} onOpen={onOpen}/>)}
      </div>
    </div>
  );
};

// ─── FLASHCARDS TAB ───────────────────────────────────────────────────────────
const FlashcardsTab = ()=>{
  const [filter,setFilter] = useState('all');
  const [idx,setIdx] = useState(0);
  const [flipped,setFlipped] = useState(false);
  const [known,setKnown] = useState(new Set());
  const pool = filter==='all' ? ALL_VOCAB : ALL_VOCAB.filter(v=>v.modId===filter);
  const card = pool[idx]||pool[0];
  const next = ()=>{setIdx(i=>(i+1)%pool.length);setFlipped(false);};
  const prev = ()=>{setIdx(i=>(i-1+pool.length)%pool.length);setFlipped(false);};
  useEffect(()=>{setIdx(0);setFlipped(false);},[filter]);
  if (!card) return null;
  const isKnown = known.has(card.k+card.modId);
  const knownCount = [...known].filter(k=>pool.some(v=>v.k+v.modId===k)).length;
  return (
    <div style={{padding:'16px 16px 100px'}}>
      <div style={{fontSize:22,fontWeight:700,color:C.t1,marginBottom:3}}>Flashcards</div>
      <div style={{fontSize:15,color:C.t3,marginBottom:14}}>{knownCount}/{pool.length} marked known</div>
      <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:12,marginBottom:16,scrollbarWidth:'none'}}>
        {[{id:'all',title:'All',color:C.blue},...MODS].map(m=>(
          <button key={m.id} onClick={()=>setFilter(m.id)} style={{
            flexShrink:0,padding:'7px 16px',borderRadius:20,
            border:`1px solid ${filter===m.id?m.color:C.border}`,
            background:filter===m.id?m.color+'22':C.s1,
            color:filter===m.id?m.color:C.t3,
            fontSize:13,fontWeight:600,cursor:'pointer',whiteSpace:'nowrap',
          }}>{m.id==='all'?'All':m.title.split(' ')[0]}</button>
        ))}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
        <span style={{fontSize:14,color:C.t3}}>Card {idx+1} of {pool.length}</span>
        <span style={{fontSize:13,color:card.modColor,fontWeight:600}}>{card.modTitle}</span>
      </div>
      <div style={{height:4,background:C.s2,borderRadius:2,overflow:'hidden',marginBottom:16}}>
        <div style={{height:'100%',width:`${((idx+1)/pool.length)*100}%`,background:card.modColor,borderRadius:2}}/>
      </div>
      <div onClick={()=>setFlipped(f=>!f)} style={{cursor:'pointer',perspective:'1000px',marginBottom:16}}>
        <div style={{position:'relative',height:220,transformStyle:'preserve-3d',transform:flipped?'rotateY(180deg)':'rotateY(0deg)',transition:'transform 0.35s ease'}}>
          <div style={{position:'absolute',width:'100%',height:'100%',backfaceVisibility:'hidden',background:C.s1,borderRadius:18,border:`1px solid ${isKnown?card.modColor:C.border}`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24}}>
            <div style={{fontSize:52,fontFamily:'"Noto Sans KR",sans-serif',color:C.t1,textAlign:'center',lineHeight:1.2,marginBottom:10}}>{card.k}</div>
            <div style={{fontSize:14,color:C.t3}}>tap to reveal</div>
          </div>
          <div style={{position:'absolute',width:'100%',height:'100%',backfaceVisibility:'hidden',transform:'rotateY(180deg)',background:card.modColor+'18',borderRadius:18,border:`1px solid ${card.modColor}44`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:24}}>
            <div style={{fontSize:28,fontWeight:700,color:C.t1,textAlign:'center',marginBottom:8}}>{card.e}</div>
            {card.r && <div style={{fontSize:15,color:card.modColor,marginBottom:6}}>{card.r}</div>}
            <div style={{fontSize:22,fontFamily:'"Noto Sans KR",sans-serif',color:C.t2,textAlign:'center'}}>{card.k}</div>
          </div>
        </div>
      </div>
      <div style={{display:'flex',justifyContent:'center',marginBottom:14}}>
        <SpeakBtn text={card.k} accent={card.modColor} size={46}/>
      </div>
      {flipped ? (
        <div style={{display:'flex',gap:10,marginBottom:12}}>
          <button onClick={(e)=>{e.stopPropagation();next();}} style={{flex:1,padding:'14px',borderRadius:12,border:`1px solid ${C.red}44`,background:C.red+'15',color:C.red,fontSize:15,fontWeight:600,cursor:'pointer'}}>Review again</button>
          <button onClick={(e)=>{e.stopPropagation();setKnown(s=>new Set([...s,card.k+card.modId]));next();}} style={{flex:1,padding:'14px',borderRadius:12,border:`1px solid ${C.green}44`,background:C.green+'15',color:C.green,fontSize:15,fontWeight:600,cursor:'pointer'}}>I knew this ✓</button>
        </div>
      ) : (
        <div style={{display:'flex',gap:10,marginBottom:12}}>
          <button onClick={prev} style={{flex:1,padding:'14px',borderRadius:12,border:`1px solid ${C.border}`,background:C.s1,color:C.t2,fontSize:15,cursor:'pointer'}}>← Prev</button>
          <button onClick={next} style={{flex:1,padding:'14px',borderRadius:12,border:`1px solid ${C.border}`,background:C.s1,color:C.t2,fontSize:15,cursor:'pointer'}}>Next →</button>
        </div>
      )}
      <div style={{textAlign:'center',fontSize:14,color:C.t3}}>{pool.length-knownCount} remaining</div>
    </div>
  );
};

// ─── PHRASES TAB ──────────────────────────────────────────────────────────────
const PhrasesTab = ()=>{
  const [search,setSearch] = useState('');
  const [filter,setFilter] = useState('all');
  const ALL_PHRASES = MODS.flatMap(m=>m.phrases.map(p=>({...p,modId:m.id,modTitle:m.title,modColor:m.color})));
  const q = search.toLowerCase();
  const visible = ALL_PHRASES.filter(p=>{
    const mf = filter==='all'||p.modId===filter;
    const ms = !q||p.k.includes(q)||p.e.toLowerCase().includes(q)||(p.r||'').toLowerCase().includes(q);
    return mf && ms;
  });
  return (
    <div style={{padding:'16px 16px 100px'}}>
      <div style={{fontSize:22,fontWeight:700,color:C.t1,marginBottom:3}}>Phrase Book</div>
      <div style={{fontSize:15,color:C.t3,marginBottom:12}}>{visible.length} phrases</div>
      <div style={{position:'relative',marginBottom:12}}>
        <svg style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)'}} width="17" height="17" viewBox="0 0 24 24" fill={C.t3}>
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search phrases..." style={{width:'100%',padding:'12px 12px 12px 38px',background:C.s1,border:`1px solid ${C.border}`,borderRadius:10,color:C.t1,fontSize:15,outline:'none',boxSizing:'border-box'}}/>
      </div>
      <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:10,marginBottom:14,scrollbarWidth:'none'}}>
        {[{id:'all',title:'All',color:C.blue},...MODS].map(m=>(
          <button key={m.id} onClick={()=>setFilter(m.id)} style={{flexShrink:0,padding:'6px 14px',borderRadius:20,border:`1px solid ${filter===m.id?m.color:C.border}`,background:filter===m.id?m.color+'22':C.s1,color:filter===m.id?m.color:C.t3,fontSize:13,fontWeight:600,cursor:'pointer',whiteSpace:'nowrap'}}>
            {m.id==='all'?'All':m.title.split(' ')[0]}
          </button>
        ))}
      </div>
      {visible.length===0
        ? <div style={{textAlign:'center',color:C.t3,padding:'40px 0',fontSize:15}}>No phrases found</div>
        : visible.map((p,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:14,padding:'15px 0',borderBottom:`1px solid ${C.border}`}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:19,fontFamily:'"Noto Sans KR",sans-serif',color:C.t1,lineHeight:1.4,marginBottom:4}}>{p.k}</div>
              {p.r&&<div style={{fontSize:12,color:p.modColor,marginBottom:3}}>{p.r}</div>}
              <div style={{fontSize:15,color:C.t2,marginBottom:5}}>{p.e}</div>
              <span style={{fontSize:11,background:p.modColor+'1A',color:p.modColor,padding:'3px 10px',borderRadius:10,fontWeight:600}}>{p.modTitle}</span>
            </div>
            <SpeakBtn text={p.k} accent={p.modColor}/>
          </div>
        ))
      }
    </div>
  );
};

// ─── DRILLS TAB ───────────────────────────────────────────────────────────────
const DrillsTab = ()=>{
  const [catFilter,setCatFilter] = useState('All');
  const [di,setDi] = useState(0);
  const [sel,setSel] = useState(null);
  const [score,setScore] = useState(0);
  const [total,setTotal] = useState(0);
  const [done,setDone] = useState(false);
  const [streak,setStreak] = useState(0);
  const [bestStreak,setBestStreak] = useState(0);
  const cats = ['All',...[...new Set(DRILLS.map(d=>d.cat))]];
  const pool = catFilter==='All' ? DRILLS : DRILLS.filter(d=>d.cat===catFilter);
  const drill = pool[di % pool.length];

  useEffect(()=>{setDi(0);setSel(null);setScore(0);setTotal(0);setDone(false);setStreak(0);},[catFilter]);

  const handleAnswer = (idx)=>{
    if (sel!==null) return;
    setSel(idx);
    const correct = idx===drill.a;
    if (correct) {
      const ns = streak+1;
      setScore(s=>s+1);
      setStreak(ns);
      setBestStreak(b=>Math.max(b,ns));
    } else {
      setStreak(0);
    }
    setTotal(t=>t+1);
  };

  const next = ()=>{
    if (di+1 >= pool.length) { setDone(true); return; }
    setDi(d=>d+1);
    setSel(null);
  };

  const restart = ()=>{setDi(0);setSel(null);setScore(0);setTotal(0);setDone(false);setStreak(0);};

  const pct = total>0 ? Math.round((score/total)*100) : 0;

  if (done) return (
    <div style={{padding:'32px 20px 100px',textAlign:'center'}}>
      <div style={{fontSize:60,marginBottom:16}}>{pct>=80?'🎉':pct>=60?'👍':'💪'}</div>
      <div style={{fontSize:26,fontWeight:700,color:C.t1,marginBottom:6}}>Round Complete!</div>
      <div style={{fontSize:18,color:C.t2,marginBottom:24}}>{score}/{total} correct · {pct}%</div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:28}}>
        {[{label:'Score',val:`${pct}%`,color:pct>=80?C.green:pct>=60?C.amber:C.red},{label:'Best streak',val:`${bestStreak} 🔥`,color:C.orange}].map((s,i)=>(
          <div key={i} style={{background:C.s1,borderRadius:14,padding:'18px 12px',border:`1px solid ${s.color}33`}}>
            <div style={{fontSize:28,fontWeight:700,color:s.color}}>{s.val}</div>
            <div style={{fontSize:14,color:C.t3,marginTop:4}}>{s.label}</div>
          </div>
        ))}
      </div>
      <button onClick={restart} style={{width:'100%',padding:'16px',borderRadius:14,background:C.blue,border:'none',color:'#fff',fontSize:17,fontWeight:700,cursor:'pointer'}}>Try Again</button>
    </div>
  );

  return (
    <div style={{padding:'16px 16px 100px'}}>
      <div style={{fontSize:22,fontWeight:700,color:C.t1,marginBottom:3}}>Drills</div>
      <div style={{fontSize:15,color:C.t3,marginBottom:12}}>Tap the correct answer</div>
      {/* Category filter */}
      <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:10,marginBottom:16,scrollbarWidth:'none'}}>
        {cats.map(cat=>(
          <button key={cat} onClick={()=>setCatFilter(cat)} style={{
            flexShrink:0,padding:'7px 16px',borderRadius:20,
            border:`1px solid ${catFilter===cat?C.blue:C.border}`,
            background:catFilter===cat?C.blue+'22':C.s1,
            color:catFilter===cat?C.blue:C.t3,
            fontSize:13,fontWeight:600,cursor:'pointer',whiteSpace:'nowrap',
          }}>{cat}</button>
        ))}
      </div>
      {/* Stats bar */}
      <div style={{display:'flex',gap:10,marginBottom:16}}>
        {[
          {label:'Score',val:`${score}/${total}`,color:C.blue},
          {label:'Streak',val:`${streak} 🔥`,color:C.orange},
          {label:'Question',val:`${(di%pool.length)+1}/${pool.length}`,color:C.t3},
        ].map((s,i)=>(
          <div key={i} style={{flex:1,background:C.s1,borderRadius:10,padding:'10px 8px',textAlign:'center',border:`1px solid ${C.border}`}}>
            <div style={{fontSize:16,fontWeight:700,color:s.color}}>{s.val}</div>
            <div style={{fontSize:11,color:C.t3,marginTop:2}}>{s.label}</div>
          </div>
        ))}
      </div>
      {/* Progress */}
      <div style={{height:4,background:C.s2,borderRadius:2,overflow:'hidden',marginBottom:20}}>
        <div style={{height:'100%',width:`${((di%pool.length)/pool.length)*100}%`,background:C.blue,borderRadius:2,transition:'width 0.3s'}}/>
      </div>
      {/* Category tag */}
      <div style={{marginBottom:12}}>
        <span style={{fontSize:12,background:C.blue+'18',color:C.blue,padding:'4px 12px',borderRadius:10,fontWeight:600}}>{drill.cat}</span>
      </div>
      {/* Question */}
      <div style={{fontSize:18,fontWeight:600,color:C.t1,lineHeight:1.5,marginBottom:8,minHeight:64}}>{drill.q}</div>
      {drill.hint && <div style={{fontSize:13,color:C.t3,marginBottom:14,fontStyle:'italic'}}>Hint: {drill.hint}</div>}
      {/* Options */}
      <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:16}}>
        {drill.opts.map((opt,i)=>{
          let bg=C.s1, border=C.border, color=C.t1;
          if (sel!==null) {
            if (i===drill.a) { bg=C.green+'20'; border=C.green; color=C.green; }
            else if (i===sel && sel!==drill.a) { bg=C.red+'18'; border=C.red; color=C.red; }
          }
          return (
            <button key={i} onClick={()=>handleAnswer(i)} style={{
              padding:'16px',background:bg,
              border:`1.5px solid ${sel!==null&&i===drill.a?border:sel===i?border:C.border}`,
              borderRadius:12,cursor:sel!==null?'default':'pointer',
              fontSize:16,color:sel!==null?(i===drill.a?C.green:i===sel?C.red:C.t3):C.t1,
              textAlign:'left',lineHeight:1.4,
              fontFamily:opt.includes('요')||opt.includes('다')||opt.includes('세')||opt.match(/[가-힣]/) ? '"Noto Sans KR",sans-serif' : 'inherit',
              transition:'background 0.15s,border-color 0.15s',
              display:'flex',alignItems:'center',justifyContent:'space-between',
            }}>
              <span>{opt}</span>
              {sel!==null && i===drill.a && <span style={{fontSize:20}}>✓</span>}
              {sel!==null && i===sel && sel!==drill.a && <span style={{fontSize:20}}>✗</span>}
            </button>
          );
        })}
      </div>
      {/* Feedback + Next */}
      {sel!==null && (
        <div style={{marginBottom:12}}>
          <div style={{padding:'14px',borderRadius:12,background:sel===drill.a?C.green+'15':C.red+'15',border:`1px solid ${sel===drill.a?C.green+'44':C.red+'44'}`,marginBottom:12}}>
            <div style={{fontSize:16,fontWeight:700,color:sel===drill.a?C.green:C.red,marginBottom:4}}>
              {sel===drill.a?'Correct! 🎉':'Not quite — the answer is:'}
            </div>
            {sel!==drill.a && (
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <span style={{fontSize:19,fontFamily:'"Noto Sans KR",sans-serif',color:C.t1}}>{drill.opts[drill.a]}</span>
                <SpeakBtn text={drill.opts[drill.a]} accent={C.green} size={36}/>
              </div>
            )}
          </div>
          <button onClick={next} style={{width:'100%',padding:'15px',borderRadius:12,background:C.blue,border:'none',color:'#fff',fontSize:16,fontWeight:700,cursor:'pointer'}}>
            {di+1>=pool.length ? 'See results →' : 'Next question →'}
          </button>
        </div>
      )}
    </div>
  );
};

// ─── NAV ──────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {id:'learn',label:'Learn',activeColor:C.amber,
    icon:(a)=><svg width="24" height="24" viewBox="0 0 24 24" fill={a?C.amber:C.t3}><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>},
  {id:'cards',label:'Flashcards',activeColor:C.green,
    icon:(a)=><svg width="24" height="24" viewBox="0 0 24 24" fill={a?C.green:C.t3}><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S14.93 12 13 12s-3.5-1.57-3.5-3.5S11.07 5 13 5zm7 13H4v-.36c0-.81.44-1.56 1.16-1.89C6.6 15.26 9.59 14 13 14s6.4 1.26 7.84 1.75c.72.33 1.16 1.08 1.16 1.89V18z"/></svg>},
  {id:'phrases',label:'Phrases',activeColor:C.purple,
    icon:(a)=><svg width="24" height="24" viewBox="0 0 24 24" fill={a?C.purple:C.t3}><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>},
  {id:'drills',label:'Drills',activeColor:C.blue,
    icon:(a)=><svg width="24" height="24" viewBox="0 0 24 24" fill={a?C.blue:C.t3}><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>},
];

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState('learn');
  const [active, setActive] = useState(null); // 'alphabet' | 'numbers' | 'money' | modId

  useEffect(()=>{
    document.body.style.cssText='background:#0F172A;color:#F1F5F9;margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;';
    document.documentElement.style.background='#0F172A';
  },[]);

  const openSection = (id)=>{ setActive(id); window.scrollTo(0,0); };
  const closeSection = ()=>{ setActive(null); window.scrollTo(0,0); };

  const renderActive = ()=>{
    if (!active) return null;
    if (active==='alphabet') return <AlphabetSection onBack={closeSection}/>;
    if (active==='numbers') return <NumbersSection onBack={closeSection}/>;
    if (active==='money') return <MoneySection onBack={closeSection}/>;
    return <ModuleDetail modId={active} onBack={closeSection}/>;
  };

  return (
    <div style={{minHeight:'100vh',background:C.bg,maxWidth:480,margin:'0 auto',position:'relative'}}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"/>
      {active
        ? renderActive()
        : <>
            {tab==='learn'   && <LearnTab onOpen={openSection}/>}
            {tab==='cards'   && <FlashcardsTab/>}
            {tab==='phrases' && <PhrasesTab/>}
            {tab==='drills'  && <DrillsTab/>}
          </>
      }
      {!active && (
        <nav style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:480,background:C.s1,borderTop:`1px solid ${C.border}`,display:'flex',zIndex:100,paddingBottom:'env(safe-area-inset-bottom)'}}>
          {NAV_ITEMS.map(n=>(
            <button key={n.id} onClick={()=>setTab(n.id)} style={{flex:1,background:'none',border:'none',cursor:'pointer',padding:'10px 0 8px',display:'flex',flexDirection:'column',alignItems:'center',gap:3}}>
              {n.icon(tab===n.id)}
              <span style={{fontSize:11,fontWeight:600,color:tab===n.id?n.activeColor:C.t3}}>{n.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
