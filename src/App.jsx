import { useState, useEffect, useRef, useCallback } from "react";

// ─── Design Tokens (WCAG AA+ on #0F172A bg) ──────────────────────────────────
const C = {
  bg:'#0F172A', s1:'#1E293B', s2:'#293548', s3:'#334155',
  border:'#334155', borderHi:'#475569',
  t1:'#F1F5F9', t2:'#94A3B8', t3:'#64748B',
  blue:'#60A5FA', green:'#4ADE80', amber:'#FCD34D',
  red:'#F87171', purple:'#C4B5FD', teal:'#2DD4BF',
  pink:'#F9A8D4', orange:'#FDBA74', lime:'#BEF264',
};

// ─── All Lesson Data ──────────────────────────────────────────────────────────
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
      {k:'네, 있어요.',r:'Ne, issoyo.',e:'Yes, I have a question.'},
      {k:'괜찮아요?',r:'Kwaenchanayo?',e:'Are you okay?'},
      {k:'괜찮아요.',r:'Kwaenchanayo.',e:"I'm okay."},
      {k:'숙제가 있어요.',r:'Sukjega issoyo.',e:'There is homework.'},
    ]},
  {id:'greet',title:'Greetings',sub:'Book 1 · Class 1',book:1,color:C.green,
    vocab:[
      {k:'안녕하세요',r:'annyeonghaseyo',e:'hello / how are you?'},
      {k:'안녕히 가세요',r:'annyeonghi kaseyo',e:'goodbye (to someone leaving)'},
      {k:'안녕히 계세요',r:'annyeonghi kyeseyo',e:'goodbye (as you leave)'},
      {k:'이름',r:'irum',e:'name'},
    ],
    phrases:[
      {k:'안녕하세요!',r:'Annyeonghaseyo!',e:'Hello!'},
      {k:'안녕히 가세요.',r:'Annyeonghi kaseyo.',e:'Goodbye (they leave).'},
      {k:'안녕히 계세요.',r:'Annyeonghi kyeseyo.',e:'Goodbye (you leave).'},
      {k:'이름이 뭐예요?',r:'Irumi mwoyeyo?',e:'What is your name?'},
      {k:'제 이름은 ___예요.',r:'Je irumun ___yeyo.',e:'My name is ___.'},
      {k:'만나서 반갑습니다.',r:'Mannaso pangapseumnida.',e:'Nice to meet you.'},
    ]},
  {id:'countries',title:'Countries & Languages',sub:'Book 1 · Class 2',book:1,color:C.purple,
    vocab:[
      {k:'미국',r:'miguk',e:'America'},{k:'일본',r:'ilbon',e:'Japan'},
      {k:'한국',r:'hanguk',e:'Korea'},{k:'태국',r:'taeguk',e:'Thailand'},
      {k:'중국',r:'chungguk',e:'China'},{k:'호주',r:'hoju',e:'Australia'},
      {k:'영국',r:'yongguk',e:'England'},{k:'프랑스',r:'purangsu',e:'France'},
      {k:'독일',r:'togil',e:'Germany'},{k:'스페인',r:'supein',e:'Spain'},
      {k:'러시아',r:'roshia',e:'Russia'},{k:'한국 사람',r:'hanguk saram',e:'Korean person'},
      {k:'나라',r:'nara',e:'country'},{k:'저',r:'cho',e:'I'},
      {k:'영어',r:'yongo',e:'English'},{k:'일본어',r:'ilbuno',e:'Japanese'},
      {k:'한국어',r:'hangugo',e:'Korean language'},{k:'중국어',r:'chunggugo',e:'Chinese'},
      {k:'불어',r:'puro',e:'French'},{k:'독일어',r:'togilo',e:'German'},
      {k:'스페인어',r:'supeino',e:'Spanish'},{k:'아랍어',r:'arabo',e:'Arabic'},
      {k:'러시아어',r:'roshiao',e:'Russian'},
    ],
    phrases:[
      {k:'어느 나라 사람이에요?',r:'Onu nara saramieyo?',e:'Where are you from?'},
      {k:'저는 미국 사람이에요.',r:'Chonun miguk saramieyo.',e:"I'm American."},
      {k:'어느 나라에서 왔어요?',r:'Onu naraeso wassoyo?',e:'Which country are you from?'},
      {k:'한국어를 해요?',r:'Hangugorŭl haeyo?',e:'Do you speak Korean?'},
      {k:'네, 조금 해요.',r:'Ne, chogum haeyo.',e:'Yes, a little.'},
      {k:'어떤 언어를 해요?',r:'Otton onorol haeyo?',e:'What language do you speak?'},
    ]},
  {id:'jobs',title:'Occupations',sub:'Book 1 · Class 3',book:1,color:C.orange,
    vocab:[
      {k:'직업',r:'chikob',e:'job / occupation'},
      {k:'회사원',r:'hoesawon',e:'company employee'},
      {k:'컴퓨터 프로그래머',r:'kompyuto puroguraemo',e:'computer programmer'},
      {k:'예술가',r:'yesulga',e:'artist'},{k:'회계사',r:'hoegyesa',e:'accountant / lawyer'},
      {k:'의사',r:'uisa',e:'doctor'},{k:'뭐',r:'mwo',e:'what'},{k:'어디',r:'odi',e:'where'},
    ],
    phrases:[
      {k:'직업이 뭐예요?',r:'Chikopi mwoyeyo?',e:'What is your job?'},
      {k:'저는 의사예요.',r:'Chonun uisayeyo.',e:"I'm a doctor."},
      {k:'저는 학생이에요.',r:'Chonun haksaengieyo.',e:"I'm a student."},
      {k:'저는 회사원이에요.',r:'Chonun hoesawoniyeyo.',e:"I'm a company employee."},
      {k:'어디에서 일해요?',r:'Odieso ilhaeyo?',e:'Where do you work?'},
      {k:'학교에서 일해요.',r:'Hakgyoeso ilhaeyo.',e:'I work at a school.'},
    ]},
  {id:'nums',title:'Numbers',sub:'Book 1 · Class 5',book:1,color:C.amber,
    vocab:[
      {k:'일',r:'il',e:'1 (Sino)'},{k:'이',r:'i',e:'2 (Sino)'},{k:'삼',r:'sam',e:'3 (Sino)'},
      {k:'사',r:'sa',e:'4 (Sino)'},{k:'오',r:'o',e:'5 (Sino)'},{k:'육',r:'yuk',e:'6 (Sino)'},
      {k:'칠',r:'chil',e:'7 (Sino)'},{k:'팔',r:'pal',e:'8 (Sino)'},{k:'구',r:'gu',e:'9 (Sino)'},
      {k:'십',r:'sip',e:'10'},{k:'이십',r:'isip',e:'20'},{k:'백',r:'paek',e:'100'},
      {k:'천',r:'chon',e:'1,000'},{k:'만',r:'man',e:'10,000'},
      {k:'전화',r:'chonhwa',e:'telephone'},{k:'번호',r:'ponho',e:'number'},
      {k:'제',r:'che',e:'my'},{k:'살',r:'sal',e:'years old'},
      {k:'하나',r:'hana',e:'1 (Native)'},{k:'둘',r:'dul',e:'2 (Native)'},
      {k:'셋',r:'set',e:'3 (Native)'},{k:'넷',r:'net',e:'4 (Native)'},
      {k:'다섯',r:'daseot',e:'5 (Native)'},{k:'여섯',r:'yeoseot',e:'6 (Native)'},
      {k:'일곱',r:'ilgob',e:'7 (Native)'},{k:'여덟',r:'yeodeol',e:'8 (Native)'},
      {k:'아홉',r:'ahob',e:'9 (Native)'},{k:'열',r:'yeol',e:'10 (Native)'},
    ],
    phrases:[
      {k:'전화번호가 뭐예요?',r:'Chonhwabonhoga mwoyeyo?',e:'What is your phone number?'},
      {k:'몇 살이에요?',r:'Myot sarieyo?',e:'How old are you?'},
      {k:'저는 ___살이에요.',r:'Chonun ___sarieyo.',e:'I am ___ years old.'},
      {k:'얼마예요?',r:'Olmayeyo?',e:'How much is it?'},
      {k:'오백 원이에요.',r:'Obaek woniyeyo.',e:"It's 500 won."},
      {k:'전화번호를 알아요?',r:'Chonhwabonhorŭl arayo?',e:'Do you know the phone number?'},
    ]},
  {id:'family',title:'Family',sub:'Book 1 · Class 6',book:1,color:C.pink,
    vocab:[
      {k:'가족',r:'kajok',e:'family'},{k:'엄마',r:'omma',e:'mom (informal)'},
      {k:'어머니',r:'omoni',e:'mother (formal)'},{k:'아빠',r:'appa',e:'dad (informal)'},
      {k:'아버지',r:'aboji',e:'father (formal)'},{k:'형',r:'hyong',e:'older brother (male)'},
      {k:'오빠',r:'oppa',e:'older brother (female)'},{k:'누나',r:'nuna',e:'older sister (male)'},
      {k:'언니',r:'onni',e:'older sister (female)'},{k:'여동생',r:'yodongsaeng',e:'younger sister'},
      {k:'남동생',r:'namdongsaeng',e:'younger brother'},{k:'할머니',r:'halmoni',e:'grandmother'},
      {k:'할아버지',r:'halaboji',e:'grandfather'},{k:'아이',r:'ai',e:'child'},
      {k:'아내',r:'anae',e:'wife'},{k:'남편',r:'nampyon',e:'husband'},
      {k:'친구',r:'chingu',e:'friend'},
    ],
    phrases:[
      {k:'가족이 있어요?',r:'Kajogi issoyo?',e:'Do you have family?'},
      {k:'가족이 몇 명이에요?',r:'Kajogi myot myongieyo?',e:'How many family members?'},
      {k:'형제가 있어요?',r:'Hyongjega issoyo?',e:'Do you have siblings?'},
      {k:'네, 형이 한 명 있어요.',r:'Ne, hyongi han myong issoyo.',e:'Yes, I have one older brother.'},
      {k:'아니요, 없어요.',r:'Aniyo, opsoyo.',e:'No, I do not.'},
      {k:'친구 이름이 뭐예요?',r:'Chingu irumi mwoyeyo?',e:"What is your friend's name?"},
    ]},
  {id:'things',title:'Introducing Things',sub:'Book 1 · Class 7',book:1,color:C.teal,
    vocab:[
      {k:'어디',r:'odi',e:'where'},{k:'여기',r:'yogi',e:'here'},
      {k:'거기',r:'kogi',e:'there (near you)'},{k:'저기',r:'chogi',e:'over there'},
      {k:'이게',r:'ige',e:'this / this thing'},{k:'펜',r:'pen',e:'pen'},
      {k:'콤퓨터',r:'kompyuteo',e:'computer'},{k:'책',r:'chaek',e:'book'},
      {k:'의자',r:'uija',e:'chair'},{k:'탁자',r:'takja',e:'table'},{k:'누구',r:'nugu',e:'who'},
    ],
    phrases:[
      {k:'이게 뭐예요?',r:'Ige mwoyeyo?',e:'What is this?'},
      {k:'이게 책이에요.',r:'Ige chaegieyo.',e:'This is a book.'},
      {k:'이게 누구예요?',r:'Ige nuguyeyo?',e:'Who is this?'},
      {k:'여기 있어요.',r:'Yogi issoyo.',e:'It is here.'},
      {k:'저기 있어요.',r:'Chogi issoyo.',e:'It is over there.'},
      {k:'어디에 있어요?',r:'Odie issoyo?',e:'Where is it?'},
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
      {k:'먹다',e:'to eat'},{k:'라면',e:'ramen'},
    ],
    phrases:[
      {k:'무슨 음식을 좋아해요?',e:'What kind of food do you like?'},
      {k:'무슨 음료수를 좋아해요?',e:'What kind of drink do you like?'},
      {k:'차를 좋아해요.',e:'I like tea.'},
      {k:'고기를 좋아해요?',e:'Do you like meat?'},
      {k:'고기를 좋아해요.',e:'I like meat.'},
      {k:'생선하고 계란을 좋아해요.',e:'I like fish and eggs.'},
      {k:'저는 생선을 안 좋아해요.',e:"I don't like fish."},
      {k:'술을 마셔요?',e:'Do you drink alcohol?'},
      {k:'술을 마셔요.',e:'I drink alcohol.'},
      {k:'술을 안 마셔요.',e:"I don't drink alcohol."},
      {k:'뭘 마셔요?',e:'What do you drink?'},
      {k:'물을 마셔요.',e:'I drink water.'},
    ]},
  {id:'meals',title:'Meals',sub:'Book 2 · Class 2',book:2,color:C.orange,
    vocab:[
      {k:'식사',e:'meal'},{k:'아침',e:'breakfast'},{k:'점심',e:'lunch'},
      {k:'저녁',e:'dinner'},{k:'간식',e:'snack'},{k:'혼자',e:'alone'},
      {k:'하고',e:'with'},{k:'누구하고',e:'with who'},
    ],
    phrases:[
      {k:'아침을 먹어요?',e:'Do you eat breakfast?'},
      {k:'아침을 안 먹어요.',e:"I don't eat breakfast."},
      {k:'점심으로 뭘 먹어요?',e:'What do you eat for lunch?'},
      {k:'밥을 먹어요.',e:'I eat rice.'},
      {k:'저는 보통 빵을 먹어요.',e:'I usually eat bread.'},
      {k:'저는 커피를 잘 안 마셔요.',e:"I don't really drink coffee."},
      {k:'누구하고 먹어요?',e:'Who do you eat with?'},
      {k:'친구하고 먹어요.',e:'I eat with my friend.'},
      {k:'혼자 먹어요.',e:'I eat by myself.'},
      {k:'어디에서 먹어요?',e:'Where do you eat?'},
      {k:'저는 집에서 먹어요.',e:'I eat at home.'},
      {k:'밖에서 먹어요?',e:'Do you go out to eat?'},
      {k:'저는 밖에서 안 먹어요.',e:"No, I don't eat out much."},
    ]},
  {id:'restdesc',title:'Describing Restaurants',sub:'Book 2 · Class 3',book:2,color:C.teal,
    vocab:[
      {k:'식당',e:'restaurant'},{k:'어디',e:'where'},{k:'밖',e:'outside'},
      {k:'가다',e:'to go'},{k:'가게',e:'store'},{k:'값싼',e:'cheap'},
      {k:'비싼',e:'expensive'},{k:'활기 넘치는',e:'lively'},{k:'조용한',e:'quiet'},
      {k:'맛있는',e:'delicious'},{k:'맛없는',e:'tastes bad'},{k:'빠른',e:'fast'},
      {k:'느린',e:'slow'},{k:'깨끗한',e:'clean'},{k:'있어요',e:'there is'},{k:'없어요',e:'there is not'},
    ],
    phrases:[
      {k:'식당에 가요?',e:'Do you go to a restaurant?'},
      {k:'어떤 식당에 가요?',e:'Which restaurant do you go to?'},
      {k:'어떤 가게에 가요?',e:'Which store do you go to?'},
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
      {k:'세 사람',e:'three people'},{k:'네 사람',e:'four people'},
      {k:'많이',e:'a lot of'},{k:'사람',e:'person'},{k:'만석',e:'full / no seats'},
      {k:'주세요',e:'please give me'},{k:'계산서',e:'bill'},
    ],
    phrases:[
      {k:'화장실이 어디예요?',e:'Where is the restroom?'},
      {k:'몇 분이세요?',e:'How many people?'},
      {k:'두 사람이에요.',e:'Two people.'},
      {k:'식당에 사람이 많이 있어요.',e:'There are many people in the restaurant.'},
      {k:'만석이에요.',e:'It is full.'},
      {k:'샐러드 주세요.',e:'A salad, please.'},
      {k:'물 두 개 주세요.',e:'Two waters, please.'},
      {k:'계산서 주세요.',e:"We'd like the bill."},
    ]},
  {id:'shop',title:'Shopping',sub:'Book 2 · Classes 6 & 7',book:2,color:C.purple,
    vocab:[
      {k:'한식',e:'Korean food'},{k:'고기집',e:'barbecue restaurant'},
      {k:'중국 음식',e:'Chinese food'},{k:'부페',e:'buffet'},
      {k:'일식',e:'Japanese food'},{k:'만두',e:'dumpling'},
      {k:'양식',e:'Western food'},{k:'파스타',e:'pasta'},{k:'피자',e:'pizza'},
      {k:'식품점',e:'grocery store'},{k:'백화점',e:'department store'},
      {k:'바',e:'bar'},{k:'옷 가게',e:'clothing store'},{k:'쇼핑',e:'shopping'},
      {k:'사다',e:'to buy'},{k:'어서 오세요',e:'welcome (to our store)'},
      {k:'주세요',e:'I would like'},{k:'얼마예요?',e:'how much?'},{k:'원',e:'won'},
      {k:'빨강',e:'red'},{k:'노랑',e:'yellow'},{k:'오렌지',e:'orange'},
      {k:'녹색',e:'green'},{k:'파랑',e:'blue'},{k:'보라',e:'purple'},
      {k:'검정',e:'black'},{k:'갈색',e:'brown'},{k:'흰색',e:'white'},
      {k:'작은',e:'small'},{k:'큰',e:'big'},{k:'가방',e:'bag'},
      {k:'신발',e:'shoes'},{k:'짧아요',e:'short'},{k:'길어요',e:'long'},
    ],
    phrases:[
      {k:'무엇을 사요?',e:'What will you buy?'},
      {k:'신발을 사요.',e:'I will buy shoes.'},
      {k:'어서 오세요.',e:'Welcome to our store.'},
      {k:'가방 주세요.',e:'I would like a bag.'},
      {k:'이거 얼마예요?',e:'How much is it?'},
      {k:'백원이에요.',e:'It is one hundred won.'},
      {k:'이거 한 개 주세요.',e:'Please give me one of these.'},
      {k:'저거 주세요.',e:'Please give me that one.'},
      {k:'이것은 짧아요.',e:'This is short.'},
      {k:'이것은 길어요.',e:'This is long.'},
    ]},
];

// All vocab flat list
const ALL_VOCAB = MODS.flatMap(m => m.vocab.map(v => ({...v, modId:m.id, modTitle:m.title, modColor:m.color})));

// ─── Speak Utility ────────────────────────────────────────────────────────────
const speak = (text) => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR';
  u.rate = 0.82;
  u.pitch = 1.0;
  window.speechSynthesis.speak(u);
};

// ─── Speaker Button ───────────────────────────────────────────────────────────
const SpeakBtn = ({ text, accent = C.blue }) => {
  const [active, setActive] = useState(false);
  const handle = useCallback((e) => {
    e.stopPropagation();
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/___/g, ''));
    u.lang = 'ko-KR'; u.rate = 0.82;
    u.onstart = () => setActive(true);
    u.onend = () => setActive(false);
    u.onerror = () => setActive(false);
    window.speechSynthesis.speak(u);
  }, [text]);

  return (
    <button onClick={handle} aria-label="Play pronunciation" style={{
      width:38, height:38, borderRadius:'50%', flexShrink:0, border:'none',
      background: active ? accent : C.s3,
      cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
      transition:'background 0.15s',
    }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill={active ? '#fff' : C.t2}>
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
      </svg>
    </button>
  );
};

// ─── Module Card ──────────────────────────────────────────────────────────────
const ModCard = ({ mod, studied, onOpen }) => {
  const total = mod.vocab.length + mod.phrases.length;
  const done = (studied[mod.id] || 0);
  const pct = Math.min(100, Math.round((done / total) * 100));
  return (
    <button onClick={() => onOpen(mod.id)} style={{
      background:C.s1, border:`1px solid ${C.border}`,
      borderRadius:14, padding:'16px', textAlign:'left', cursor:'pointer',
      borderLeft:`3px solid ${mod.color}`, width:'100%',
      transition:'border-color 0.15s',
    }}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
        <div style={{flex:1,minWidth:0,marginRight:8}}>
          <div style={{fontSize:15,fontWeight:600,color:C.t1,marginBottom:2,lineHeight:1.3}}>{mod.title}</div>
          <div style={{fontSize:12,color:C.t3}}>{mod.sub}</div>
        </div>
        {pct === 100
          ? <span style={{fontSize:11,background:mod.color+'22',color:mod.color,padding:'3px 8px',borderRadius:20,fontWeight:600,flexShrink:0}}>Done ✓</span>
          : <span style={{fontSize:11,color:C.t3,flexShrink:0}}>{mod.vocab.length}v · {mod.phrases.length}p</span>}
      </div>
      <div style={{height:4,background:C.s3,borderRadius:2,overflow:'hidden'}}>
        <div style={{height:'100%',width:`${pct}%`,background:mod.color,borderRadius:2,transition:'width 0.4s'}}/>
      </div>
      <div style={{fontSize:11,color:C.t3,marginTop:5}}>{pct}% viewed</div>
    </button>
  );
};

// ─── Learn Tab ────────────────────────────────────────────────────────────────
const LearnTab = ({ studied, onOpen }) => {
  const book1 = MODS.filter(m=>m.book===1), book2 = MODS.filter(m=>m.book===2);
  const totalAll = MODS.reduce((a,m)=>a+m.vocab.length+m.phrases.length,0);
  const doneAll = Object.values(studied).reduce((a,v)=>a+v,0);
  const pct = Math.round((doneAll/totalAll)*100);
  return (
    <div style={{padding:'0 16px 100px'}}>
      <div style={{padding:'20px 0 8px'}}>
        <div style={{fontSize:22,fontWeight:700,color:C.t1,fontFamily:'"Noto Sans KR",sans-serif'}}>한국어 학습</div>
        <div style={{fontSize:13,color:C.t3,marginBottom:12}}>Korean Language Learning</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
          <span style={{fontSize:12,color:C.t2}}>Overall progress</span>
          <span style={{fontSize:12,fontWeight:600,color:C.t1}}>{pct}%</span>
        </div>
        <div style={{height:6,background:C.s2,borderRadius:3,overflow:'hidden'}}>
          <div style={{height:'100%',width:`${pct}%`,background:`linear-gradient(90deg,${C.blue},${C.purple})`,borderRadius:3,transition:'width 0.5s'}}/>
        </div>
      </div>
      <div style={{fontSize:12,fontWeight:700,color:C.t3,letterSpacing:'0.06em',textTransform:'uppercase',marginTop:20,marginBottom:10}}>Book 1 — Beginner I</div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {book1.map(m=><ModCard key={m.id} mod={m} studied={studied} onOpen={onOpen}/>)}
      </div>
      <div style={{fontSize:12,fontWeight:700,color:C.t3,letterSpacing:'0.06em',textTransform:'uppercase',marginTop:24,marginBottom:10}}>Book 2 — Beginner II</div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {book2.map(m=><ModCard key={m.id} mod={m} studied={studied} onOpen={onOpen}/>)}
      </div>
    </div>
  );
};

// ─── Module Detail ────────────────────────────────────────────────────────────
const ModuleDetail = ({ modId, onBack, onStudied }) => {
  const mod = MODS.find(m=>m.id===modId);
  const [subTab, setSubTab] = useState('vocab');
  const items = subTab === 'vocab' ? mod.vocab : mod.phrases;

  useEffect(() => { onStudied(mod.id, mod.vocab.length + mod.phrases.length); }, []);

  return (
    <div style={{minHeight:'100vh',background:C.bg}}>
      {/* Header */}
      <div style={{background:C.s1,borderBottom:`1px solid ${C.border}`,padding:'16px',position:'sticky',top:0,zIndex:10}}>
        <button onClick={onBack} style={{background:'none',border:'none',color:C.t2,cursor:'pointer',fontSize:14,padding:0,display:'flex',alignItems:'center',gap:6,marginBottom:10}}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={C.t2}><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          Back
        </button>
        <div style={{fontSize:18,fontWeight:700,color:C.t1,lineHeight:1.2}}>{mod.title}</div>
        <div style={{fontSize:12,color:C.t3,marginTop:2}}>{mod.sub} · {mod.vocab.length} vocab · {mod.phrases.length} phrases</div>
        <div style={{display:'flex',gap:0,marginTop:14,borderBottom:`1px solid ${C.border}`}}>
          {['vocab','phrases'].map(t=>(
            <button key={t} onClick={()=>setSubTab(t)} style={{
              flex:1, background:'none', border:'none', cursor:'pointer',
              padding:'10px 0', fontSize:14, fontWeight:subTab===t?600:400,
              color:subTab===t?mod.color:C.t3,
              borderBottom:subTab===t?`2px solid ${mod.color}`:'2px solid transparent',
            }}>{t === 'vocab' ? `Vocabulary (${mod.vocab.length})` : `Phrases (${mod.phrases.length})`}</button>
          ))}
        </div>
      </div>
      {/* Items */}
      <div style={{padding:'8px 16px 100px'}}>
        {items.map((item,i)=>(
          <div key={i} style={{
            display:'flex', alignItems:'center', gap:12,
            padding:'14px 0', borderBottom:`1px solid ${C.border}`,
          }}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:20,fontFamily:'"Noto Sans KR",sans-serif',color:C.t1,lineHeight:1.3,marginBottom:2}}>{item.k}</div>
              {item.r && <div style={{fontSize:12,color:mod.color,marginBottom:2}}>{item.r}</div>}
              <div style={{fontSize:14,color:C.t2}}>{item.e}</div>
            </div>
            <SpeakBtn text={item.k} accent={mod.color}/>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Flashcards Tab ───────────────────────────────────────────────────────────
const FlashcardsTab = () => {
  const [filter, setFilter] = useState('all');
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());

  const pool = filter === 'all' ? ALL_VOCAB : ALL_VOCAB.filter(v=>v.modId===filter);
  const total = pool.length;
  const card = pool[idx] || pool[0];
  const knownCount = [...known].filter(k => pool.some(v=>v.k+v.modId===k)).length;

  const next = () => { setIdx(i=>(i+1)%total); setFlipped(false); };
  const prev = () => { setIdx(i=>(i-1+total)%total); setFlipped(false); };
  const markKnown = (e) => { e.stopPropagation(); setKnown(s=>new Set([...s,card.k+card.modId])); next(); };
  const markReview = (e) => { e.stopPropagation(); next(); };

  useEffect(()=>{setIdx(0);setFlipped(false);},[filter]);

  if (!card) return null;
  const isKnown = known.has(card.k+card.modId);

  return (
    <div style={{padding:'16px 16px 100px'}}>
      <div style={{fontSize:18,fontWeight:700,color:C.t1,marginBottom:4}}>Flashcards</div>
      <div style={{fontSize:13,color:C.t3,marginBottom:14}}>{knownCount}/{total} marked known</div>

      {/* Module filter */}
      <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:12,marginBottom:16,scrollbarWidth:'none'}}>
        {[{id:'all',title:'All',color:C.blue},...MODS].map(m=>(
          <button key={m.id} onClick={()=>setFilter(m.id)} style={{
            flexShrink:0, padding:'6px 14px', borderRadius:20,
            border:`1px solid ${filter===m.id ? m.color : C.border}`,
            background: filter===m.id ? m.color+'22' : C.s1,
            color: filter===m.id ? m.color : C.t3,
            fontSize:12, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap',
          }}>{m.title.split(' ')[0]}{m.id !== 'all' ? '' : ''}</button>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
        <span style={{fontSize:12,color:C.t3}}>Card {idx+1} of {total}</span>
        <span style={{fontSize:12,color:card.modColor}}>{card.modTitle}</span>
      </div>
      <div style={{height:4,background:C.s2,borderRadius:2,overflow:'hidden',marginBottom:16}}>
        <div style={{height:'100%',width:`${((idx+1)/total)*100}%`,background:card.modColor,borderRadius:2}}/>
      </div>

      {/* Card */}
      <div onClick={()=>setFlipped(f=>!f)} style={{cursor:'pointer',perspective:'1000px',marginBottom:16}}>
        <div style={{
          position:'relative',height:200,
          transformStyle:'preserve-3d',
          transform:flipped?'rotateY(180deg)':'rotateY(0deg)',
          transition:'transform 0.35s ease',
        }}>
          {/* Front */}
          <div style={{
            position:'absolute',width:'100%',height:'100%',backfaceVisibility:'hidden',
            background:C.s1,borderRadius:16,border:`1px solid ${isKnown?card.modColor:C.border}`,
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:20,
          }}>
            <div style={{fontSize:44,fontFamily:'"Noto Sans KR",sans-serif',color:C.t1,textAlign:'center',lineHeight:1.2,marginBottom:8}}>{card.k}</div>
            <div style={{fontSize:12,color:C.t3}}>tap to reveal</div>
          </div>
          {/* Back */}
          <div style={{
            position:'absolute',width:'100%',height:'100%',backfaceVisibility:'hidden',
            transform:'rotateY(180deg)',
            background:card.modColor+'18',borderRadius:16,border:`1px solid ${card.modColor}44`,
            display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:20,
          }}>
            <div style={{fontSize:26,fontWeight:700,color:C.t1,textAlign:'center',marginBottom:6}}>{card.e}</div>
            {card.r && <div style={{fontSize:14,color:card.modColor,marginBottom:4}}>{card.r}</div>}
            <div style={{fontSize:18,fontFamily:'"Noto Sans KR",sans-serif',color:C.t2,textAlign:'center'}}>{card.k}</div>
          </div>
        </div>
      </div>

      {/* Audio + nav */}
      <div style={{display:'flex',justifyContent:'center',marginBottom:14}}>
        <SpeakBtn text={card.k} accent={card.modColor}/>
      </div>

      {/* Known / Review buttons (only when flipped) */}
      {flipped ? (
        <div style={{display:'flex',gap:10,marginBottom:12}}>
          <button onClick={markReview} style={{
            flex:1,padding:'12px',borderRadius:10,border:`1px solid ${C.red}44`,
            background:C.red+'15',color:C.red,fontSize:14,fontWeight:600,cursor:'pointer',
          }}>Review again</button>
          <button onClick={markKnown} style={{
            flex:1,padding:'12px',borderRadius:10,border:`1px solid ${C.green}44`,
            background:C.green+'15',color:C.green,fontSize:14,fontWeight:600,cursor:'pointer',
          }}>I knew this ✓</button>
        </div>
      ) : (
        <div style={{display:'flex',gap:10,marginBottom:12}}>
          <button onClick={prev} style={{flex:1,padding:'12px',borderRadius:10,border:`1px solid ${C.border}`,background:C.s1,color:C.t2,fontSize:14,cursor:'pointer'}}>← Prev</button>
          <button onClick={next} style={{flex:1,padding:'12px',borderRadius:10,border:`1px solid ${C.border}`,background:C.s1,color:C.t2,fontSize:14,cursor:'pointer'}}>Next →</button>
        </div>
      )}
      <div style={{textAlign:'center',fontSize:12,color:C.t3}}>Tap card to flip · {total - knownCount} remaining</div>
    </div>
  );
};

// ─── Phrases Tab ──────────────────────────────────────────────────────────────
const PhrasesTab = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const ALL_PHRASES = MODS.flatMap(m=>m.phrases.map(p=>({...p,modId:m.id,modTitle:m.title,modColor:m.color})));
  const q = search.toLowerCase();
  const visible = ALL_PHRASES.filter(p=>{
    const matchFilter = filter==='all' || p.modId===filter;
    const matchSearch = !q || p.k.includes(q) || p.e.toLowerCase().includes(q) || (p.r||'').toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <div style={{padding:'16px 16px 100px'}}>
      <div style={{fontSize:18,fontWeight:700,color:C.t1,marginBottom:4}}>Phrase Book</div>
      <div style={{fontSize:13,color:C.t3,marginBottom:12}}>{visible.length} phrases</div>
      {/* Search */}
      <div style={{position:'relative',marginBottom:12}}>
        <svg style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)'}} width="16" height="16" viewBox="0 0 24 24" fill={C.t3}>
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input
          value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Search phrases..."
          style={{
            width:'100%', padding:'10px 12px 10px 36px',
            background:C.s1, border:`1px solid ${C.border}`,
            borderRadius:10, color:C.t1, fontSize:14, outline:'none',
            boxSizing:'border-box',
          }}
        />
      </div>
      {/* Filter */}
      <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:10,marginBottom:12,scrollbarWidth:'none'}}>
        {[{id:'all',title:'All',color:C.blue},...MODS].map(m=>(
          <button key={m.id} onClick={()=>setFilter(m.id)} style={{
            flexShrink:0, padding:'5px 12px', borderRadius:20,
            border:`1px solid ${filter===m.id?m.color:C.border}`,
            background: filter===m.id?m.color+'22':C.s1,
            color: filter===m.id?m.color:C.t3,
            fontSize:11, fontWeight:600, cursor:'pointer', whiteSpace:'nowrap',
          }}>{m.id==='all'?'All':m.title.split(' ')[0]}</button>
        ))}
      </div>
      {/* Phrases list */}
      {visible.length === 0
        ? <div style={{textAlign:'center',color:C.t3,padding:'40px 0',fontSize:14}}>No phrases found</div>
        : visible.map((p,i)=>(
          <div key={i} style={{
            display:'flex',alignItems:'center',gap:12,
            padding:'14px 0',borderBottom:`1px solid ${C.border}`,
          }}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:17,fontFamily:'"Noto Sans KR",sans-serif',color:C.t1,lineHeight:1.4,marginBottom:3}}>{p.k}</div>
              {p.r && <div style={{fontSize:11,color:p.modColor,marginBottom:2}}>{p.r}</div>}
              <div style={{fontSize:13,color:C.t2,marginBottom:4}}>{p.e}</div>
              <span style={{fontSize:10,background:p.modColor+'18',color:p.modColor,padding:'2px 8px',borderRadius:10,fontWeight:600}}>{p.modTitle}</span>
            </div>
            <SpeakBtn text={p.k} accent={p.modColor}/>
          </div>
        ))
      }
    </div>
  );
};

// ─── Bottom Nav ───────────────────────────────────────────────────────────────
const NAV = [
  {id:'learn',label:'Learn',icon:(a)=>(
    <svg width="22" height="22" viewBox="0 0 24 24" fill={a?C.blue:C.t3}>
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
    </svg>)},
  {id:'cards',label:'Flashcards',icon:(a)=>(
    <svg width="22" height="22" viewBox="0 0 24 24" fill={a?C.green:C.t3}>
      <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S14.93 12 13 12s-3.5-1.57-3.5-3.5S11.07 5 13 5zm7 13H4v-.36c0-.81.44-1.56 1.16-1.89C6.6 15.26 9.59 14 13 14s6.4 1.26 7.84 1.75c.72.33 1.16 1.08 1.16 1.89V18z"/>
    </svg>)},
  {id:'phrases',label:'Phrases',icon:(a)=>(
    <svg width="22" height="22" viewBox="0 0 24 24" fill={a?C.purple:C.t3}>
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>)},
];

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState('learn');
  const [activeModule, setActiveModule] = useState(null);
  const [studied, setStudied] = useState({});

  useEffect(()=>{
    document.body.style.background = C.bg;
    document.body.style.color = C.t1;
    document.body.style.margin = '0';
    document.body.style.fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif';
    document.body.style.WebkitFontSmoothing = 'antialiased';
    document.body.style.maxWidth = '480px';
    document.body.style.margin = '0 auto';
    try {
      const s = localStorage.getItem('kr-v2');
      if (s) setStudied(JSON.parse(s));
    } catch(e){}
  },[]);

  const handleStudied = (modId, count) => {
    setStudied(prev=>{
      const next = {...prev, [modId]:count};
      try { localStorage.setItem('kr-v2', JSON.stringify(next)); } catch(e){}
      return next;
    });
  };

  const openModule = (id) => { setActiveModule(id); window.scrollTo(0,0); };
  const closeModule = () => { setActiveModule(null); window.scrollTo(0,0); };

  const navColor = tab==='learn'?C.blue:tab==='cards'?C.green:C.purple;

  return (
    <div style={{minHeight:'100vh',background:C.bg,position:'relative'}}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap"/>
      {activeModule
        ? <ModuleDetail modId={activeModule} onBack={closeModule} onStudied={handleStudied}/>
        : tab==='learn' ? <LearnTab studied={studied} onOpen={openModule}/>
        : tab==='cards' ? <FlashcardsTab/>
        : <PhrasesTab/>
      }
      {/* Bottom Nav */}
      {!activeModule && (
        <nav style={{
          position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',
          width:'100%',maxWidth:480,
          background:C.s1,borderTop:`1px solid ${C.border}`,
          display:'flex',zIndex:100,
          paddingBottom:'env(safe-area-inset-bottom)',
        }}>
          {NAV.map(n=>(
            <button key={n.id} onClick={()=>setTab(n.id)} style={{
              flex:1, background:'none', border:'none', cursor:'pointer',
              padding:'10px 0 8px', display:'flex', flexDirection:'column',
              alignItems:'center', gap:3,
            }}>
              {n.icon(tab===n.id)}
              <span style={{fontSize:10,fontWeight:600,color:tab===n.id?(n.id==='learn'?C.blue:n.id==='cards'?C.green:C.purple):C.t3}}>
                {n.label}
              </span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
