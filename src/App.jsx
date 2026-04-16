import { useState, useEffect } from "react";

const MOD = {
  Hangul:     { color: '#185FA5', bg: '#E6F1FB', text: '#0C447C' },
  Greetings:  { color: '#BA7517', bg: '#FAEEDA', text: '#633806' },
  Restaurant: { color: '#3B6D11', bg: '#EAF3DE', text: '#27500A' },
  Numbers:    { color: '#534AB7', bg: '#EEEDFE', text: '#3C3489' },
  Time:       { color: '#A32D2D', bg: '#FCEBEB', text: '#791F1F' },
};

const LESSONS = [
  { day:1, mod:'Hangul', title:'Basic Vowels', sub:'The 6 core vowels',
    intro:'Hangul was created in 1443 by King Sejong the Great. Unlike Chinese characters, it\'s entirely phonetic — each symbol represents a sound. Today we start with the 6 essential vowels that form the backbone of every Korean word.',
    book:'Active Korean 1, Ch.1 pp.10–15 — trace each vowel 10× in the workbook',
    cards:[
      {k:'ㅏ',r:'a',m:'Like "a" in father',e:'아이 (a-i) = child'},
      {k:'ㅓ',r:'eo',m:'Like "u" in uh',e:'어머니 = mother'},
      {k:'ㅗ',r:'o',m:'Like "oh"',e:'오빠 = older brother'},
      {k:'ㅜ',r:'u',m:'Like "oo" in moon',e:'우유 = milk'},
      {k:'ㅡ',r:'eu',m:'Spread lips, no rounding',e:'으 (hesitation sound)'},
      {k:'ㅣ',r:'i',m:'Like "ee" in see',e:'이 = this / tooth'},
    ],
    quiz:[
      {q:'What sound does ㅏ make?',o:['"ah" (father)','"oh"','"ee"','"oo"'],a:0},
      {q:'Which vowel sounds like "oo" in moon?',o:['ㅏ','ㅓ','ㅗ','ㅜ'],a:3},
      {q:'ㅣ sounds like which English sound?',o:['"uh"','"oh"','"ee" in see','"eu"'],a:2},
      {q:'Which vowel has spread lips (no rounding)?',o:['ㅗ','ㅜ','ㅡ','ㅓ'],a:2},
      {q:'What does 우유 mean?',o:['Child','Mother','Milk','Tooth'],a:2},
    ]
  },
  { day:2, mod:'Hangul', title:'Compound Vowels', sub:'Vowels that combine sounds',
    intro:'Compound vowels are created by combining two basic vowels. Notice the pattern: adding an extra stroke often adds a "y" sound. These are very common in everyday Korean speech.',
    book:'Active Korean 1, Ch.1 — compound vowels section. Complete the writing practice.',
    cards:[
      {k:'ㅐ',r:'ae',m:'Like "e" in bed',e:'개 = dog'},
      {k:'ㅔ',r:'e',m:'Like "e" in yes (almost same as ㅐ)',e:'세 = three'},
      {k:'ㅑ',r:'ya',m:'Like "ya" in yard',e:'야구 = baseball'},
      {k:'ㅕ',r:'yeo',m:'Like "yuh"',e:'여기 = here'},
      {k:'ㅛ',r:'yo',m:'Like "yo"',e:'요리 = cooking'},
      {k:'ㅠ',r:'yu',m:'Like "you"',e:'유리 = glass'},
    ],
    quiz:[
      {q:'ㅐ sounds most like which English vowel?',o:['"a" in father','"e" in bed','"ee" in see','"oo" in moon'],a:1},
      {q:'Adding an extra stroke to ㅏ creates which vowel?',o:['ㅓ','ㅑ (ya)','ㅜ','ㅡ'],a:1},
      {q:'What does 여기 mean?',o:['Here','Dog','Baseball','Cooking'],a:0},
      {q:'Which vowel sounds like "you"?',o:['ㅑ','ㅕ','ㅛ','ㅠ'],a:3},
      {q:'개 means what in Korean?',o:['Cat','Dog','Bird','Fish'],a:1},
    ]
  },
  { day:3, mod:'Hangul', title:'Consonants Part 1', sub:'The first 7 consonants',
    intro:'Korean consonants never stand alone — they always pair with a vowel to form a syllable block. The shape of each consonant actually mimics how your mouth/tongue makes that sound!',
    book:'Active Korean 1, Ch.1 — consonants section. Trace each consonant in the workbook.',
    cards:[
      {k:'ㄱ',r:'g / k',m:'Soft "g" at start; "k" at end',e:'가다 = to go'},
      {k:'ㄴ',r:'n',m:'Like "n" in no',e:'나 = I/me (informal)'},
      {k:'ㄷ',r:'d / t',m:'Soft "d" at start; "t" at end',e:'다리 = leg/bridge'},
      {k:'ㄹ',r:'r / l',m:'A flap — between English "r" and "l"',e:'라면 = ramen'},
      {k:'ㅁ',r:'m',m:'Like "m" in mom',e:'마음 = heart/mind'},
      {k:'ㅂ',r:'b / p',m:'Soft "b" at start; "p" at end',e:'바다 = ocean/sea'},
      {k:'ㅅ',r:'s',m:'Like "s" in sun',e:'사랑 = love'},
    ],
    quiz:[
      {q:'사랑 means what in Korean?',o:['Ocean','Heart','Love','Bridge'],a:2},
      {q:'ㄹ is described as a sound between:',o:['g and k','d and t','r and l','b and p'],a:2},
      {q:'Which consonant sounds like "m"?',o:['ㄴ','ㄷ','ㅁ','ㅅ'],a:2},
      {q:'ㄱ makes a "k" sound when:',o:['At start of syllable','At end of syllable','Before ㅏ','After ㄴ'],a:1},
      {q:'What does 바다 mean?',o:['Love','Ocean/Sea','Ramen','Bridge'],a:1},
    ]
  },
  { day:4, mod:'Hangul', title:'Consonants Part 2', sub:'Aspirated & remaining consonants',
    intro:'Today: the remaining 7 consonants, including 3 "aspirated" ones (said with a puff of air) and the crucial ㅇ which is silent at the start of a syllable but sounds like "ng" at the end.',
    book:'Active Korean 1, Ch.1 — finish all consonants. Complete writing exercises.',
    cards:[
      {k:'ㅇ',r:'silent / ng',m:'Silent at syllable START; "ng" at END',e:'아 = ah! / 강 = river'},
      {k:'ㅈ',r:'j',m:'Like "j" in jump',e:'자다 = to sleep'},
      {k:'ㅊ',r:'ch',m:'Like "ch" in cheese',e:'차 = tea / car'},
      {k:'ㅋ',r:'k (aspirated)',m:'Strong "k" with a puff of air',e:'커피 = coffee'},
      {k:'ㅌ',r:'t (aspirated)',m:'Strong "t" with a puff of air',e:'타다 = to ride'},
      {k:'ㅍ',r:'p (aspirated)',m:'Strong "p" with a puff of air',e:'파 = green onion'},
      {k:'ㅎ',r:'h',m:'Like "h" in hello',e:'하늘 = sky'},
    ],
    quiz:[
      {q:'When does ㅇ make a sound?',o:['Always silent','Before ㅏ only','At END of syllable (as "ng")','Start of every word'],a:2},
      {q:'ㅋ, ㅌ, ㅍ are all what type of consonants?',o:['Soft','Aspirated (puff of air)','Silent','Double'],a:1},
      {q:'커피 means:',o:['Tea','Water','Coffee','Milk'],a:2},
      {q:'What does 하늘 mean?',o:['Heart','Sky','Ocean','Love'],a:1},
      {q:'Which consonant sounds like "ch" in cheese?',o:['ㅈ','ㅊ','ㅋ','ㅎ'],a:1},
    ]
  },
  { day:5, mod:'Hangul', title:'Syllable Blocks', sub:'Building Korean words',
    intro:'Now the magic happens! Korean syllables are written as square blocks. The pattern is: Consonant + Vowel (+ optional final consonant). Let\'s read your first real Korean words using everything you\'ve learned!',
    book:'Active Korean 1, Ch.1 — syllable structure section. Practice building blocks.',
    cards:[
      {k:'가',r:'ga',m:'ㄱ + ㅏ → 가',e:'가다 = to go'},
      {k:'안',r:'an',m:'ㅇ(silent) + ㅏ + ㄴ → 안',e:'안에 = inside'},
      {k:'한국',r:'Han-guk',m:'Korea',e:'한국 사람 = Korean person'},
      {k:'서울',r:'Seo-ul',m:'Capital of Korea',e:'서울역 = Seoul Station'},
      {k:'식당',r:'sik-dang',m:'Restaurant',e:'식당 어디예요? = Where is the restaurant?'},
      {k:'지하철',r:'ji-ha-cheol',m:'Subway',e:'지하철역 = subway station'},
    ],
    quiz:[
      {q:'What does 한국 mean?',o:['Seoul','Korea','Korean person','Subway'],a:1},
      {q:'식당 means:',o:['Subway','Station','Restaurant','Coffee shop'],a:2},
      {q:'How many individual letters are in the block 안?',o:['1','2','3','4'],a:2},
      {q:'What does 서울 mean?',o:['Korea','Restaurant','Seoul (capital)','Subway'],a:2},
      {q:'지하철 means:',o:['Bus','Taxi','Train','Subway'],a:3},
    ]
  },
  { day:6, mod:'Hangul', title:'Reading Real Signs', sub:'Hangul in the wild',
    intro:'You\'re in Seoul! Let\'s practice reading words you\'ll actually see on signs, menus, and transportation. Many are English loan words written in Korean — you\'ll recognize them immediately!',
    book:'Active Korean 1 — scan Chapter 1 word lists for any signs you recognize.',
    cards:[
      {k:'화장실',r:'hwa-jang-sil',m:'Restroom / Bathroom',e:'화장실이 어디예요? = Where is the restroom?'},
      {k:'출구',r:'chul-gu',m:'Exit',e:'Seen in subways and buildings'},
      {k:'입구',r:'ip-gu',m:'Entrance',e:'Opposite of 출구'},
      {k:'편의점',r:'pyeon-ui-jeom',m:'Convenience store (7-Eleven, GS25)',e:'편의점이 있어요? = Is there a convenience store?'},
      {k:'약국',r:'yak-guk',m:'Pharmacy',e:'약국이 어디예요? = Where\'s the pharmacy?'},
      {k:'은행',r:'eun-haeng',m:'Bank / ATM',e:'은행이 있어요? = Is there a bank?'},
    ],
    quiz:[
      {q:'화장실 means:',o:['Exit','Entrance','Restroom','Bank'],a:2},
      {q:'출구 vs 입구 — what\'s the difference?',o:['Same thing','Exit vs. Entrance','Bus vs. Subway','Bank vs. Store'],a:1},
      {q:'편의점 is:',o:['A pharmacy','A bank','A convenience store','A restaurant'],a:2},
      {q:'약국 means:',o:['Bank','Pharmacy','Exit','Subway'],a:1},
      {q:'If you see 은행, you can:',o:['Use the restroom','Exit the building','Exchange money / use ATM','Buy food'],a:2},
    ]
  },
  { day:7, mod:'Hangul', title:'Week 1 Review', sub:'Consolidate your Hangul',
    intro:'Congratulations on completing Week 1! You now know all vowels, all 14 basic consonants, and how syllable blocks work. Let\'s lock it all in. After today, you can read Korean out loud.',
    book:'Active Korean 1, Ch.1 — complete ALL writing exercises. Write each character 5 times from memory.',
    cards:[
      {k:'ㅏㅓㅗㅜㅡㅣ',r:'a eo o u eu i',m:'The 6 core vowels',e:'Master these first — they\'re in everything!'},
      {k:'ㄱㄴㄷㄹㅁㅂㅅ',r:'g/k n d/t r/l m b/p s',m:'Consonants 1–7',e:'사랑해요 = I love you'},
      {k:'ㅇㅈㅊㅋㅌㅍㅎ',r:'∅/ng j ch k t p h',m:'Consonants 8–14',e:'ㅋㅌㅍ = puff of air!'},
      {k:'안녕하세요',r:'Annyeonghaseyo',m:'Hello (formal)',e:'Use with strangers & elders — always!'},
      {k:'감사합니다',r:'Gamsahamnida',m:'Thank you (formal)',e:'Use this constantly in Korea!'},
      {k:'네 / 아니요',r:'Ne / Aniyo',m:'Yes / No',e:'네 = yes, 아니요 = no'},
    ],
    quiz:[
      {q:'How do you say "Hello" formally in Korean?',o:['감사합니다','안녕하세요','네','죄송합니다'],a:1},
      {q:'감사합니다 means:',o:['Hello','Goodbye','Thank you','I\'m sorry'],a:2},
      {q:'What does 네 mean?',o:['No','Yes','Hello','Thank you'],a:1},
      {q:'How many basic consonants are there in Hangul?',o:['6','10','14','21'],a:2},
      {q:'The consonants ㅋ, ㅌ, ㅍ are pronounced with:',o:['Soft sound','A puff of air','Silence','A nasal sound'],a:1},
    ]
  },
  { day:8, mod:'Greetings', title:'Hello & Goodbye', sub:'First impressions matter',
    intro:'Korean has formal and informal speech levels. For your trip, always use formal speech with strangers, shop staff, and anyone older. Today: the essential greetings every visitor needs.',
    book:'Active Korean 1, Ch.2 — Greetings & Introductions. Listen to the audio if available.',
    cards:[
      {k:'안녕하세요',r:'Annyeonghaseyo',m:'Hello (formal, all-purpose)',e:'Use anytime with strangers or staff'},
      {k:'안녕히 가세요',r:'Annyeonghi gaseyo',m:'Goodbye — said to someone LEAVING',e:'You stay, they leave'},
      {k:'안녕히 계세요',r:'Annyeonghi gyeseyo',m:'Goodbye — said when YOU leave',e:'You leave, they stay'},
      {k:'안녕',r:'Annyeong',m:'Hey / Bye (informal)',e:'Only with close friends your own age'},
      {k:'반갑습니다',r:'Bangapseumnida',m:'Nice to meet you (formal)',e:'First introductions'},
      {k:'처음 뵙겠습니다',r:'Cheoeum boepgesseumnida',m:'How do you do (very formal)',e:'Business or formal first meetings'},
    ],
    quiz:[
      {q:'Which goodbye do you say when YOU are leaving?',o:['안녕히 가세요','안녕히 계세요','안녕하세요','반갑습니다'],a:1},
      {q:'안녕하세요 is appropriate to use with:',o:['Only close friends','Strangers and elders','Only children','Only business contacts'],a:1},
      {q:'What does 반갑습니다 mean?',o:['Goodbye','Hello','Nice to meet you','Thank you'],a:2},
      {q:'When is 안녕 (informal) appropriate?',o:['With shop staff','With hotel staff','With close friends your age','With elders'],a:2},
      {q:'안녕히 가세요 is said to someone who is:',o:['Staying while you leave','Leaving while you stay','Greeting you first time','Older than you'],a:1},
    ]
  },
  { day:9, mod:'Greetings', title:'Thank You & Apologies', sub:'Politeness opens every door',
    intro:'Koreans greatly appreciate politeness from foreign visitors. These phrases earn you instant goodwill everywhere — restaurants, shops, taxis. Use them generously!',
    book:'Active Korean 1, Ch.2 — polite expressions section.',
    cards:[
      {k:'감사합니다',r:'Gamsahamnida',m:'Thank you (most formal)',e:'Works everywhere, anytime'},
      {k:'고맙습니다',r:'Gomapseumnida',m:'Thank you (warm/heartfelt)',e:'Slightly warmer tone, still formal'},
      {k:'고마워요',r:'Gomawoyo',m:'Thank you (semi-formal)',e:'Casual but still polite'},
      {k:'죄송합니다',r:'Joesonghamnida',m:'I\'m sorry / Excuse me (formal)',e:'Bumping into someone, making mistakes'},
      {k:'실례합니다',r:'Sillyehamnida',m:'Excuse me (to get attention)',e:'Getting a waiter\'s attention politely'},
      {k:'괜찮아요',r:'Gwaenchanayo',m:'It\'s okay / No problem',e:'Response when someone apologizes to you'},
    ],
    quiz:[
      {q:'Which is the most formal "Thank you"?',o:['고마워요','감사합니다','괜찮아요','실례합니다'],a:1},
      {q:'How do you politely get a waiter\'s attention?',o:['감사합니다','죄송합니다','실례합니다','괜찮아요'],a:2},
      {q:'죄송합니다 means:',o:['Thank you','You\'re welcome','Goodbye','I\'m sorry / Excuse me'],a:3},
      {q:'If someone apologizes to you, respond with:',o:['죄송합니다','감사합니다','괜찮아요','실례합니다'],a:2},
      {q:'고마워요 is:',o:['Very formal','Semi-formal but polite','Rude','Only used with children'],a:1},
    ]
  },
  { day:10, mod:'Greetings', title:'Introductions', sub:'Tell people who you are',
    intro:'Introducing yourself in Korean creates an instant connection with locals. Even a basic self-introduction will impress people and make your trip more memorable and personal.',
    book:'Active Korean 1, Ch.2 — self-introduction dialogue. Practice out loud!',
    cards:[
      {k:'제 이름은 ___예요',r:'Je ireumeun ___yeyo',m:'My name is ___',e:'제 이름은 알렉스예요 = My name is Alex'},
      {k:'저는 미국 사람이에요',r:'Jeoneun miguk saramieyo',m:'I am American',e:'미국 = America, 영국 = UK, 캐나다 = Canada'},
      {k:'저는 ___에서 왔어요',r:'Jeoneun ___eseo wasseoyo',m:'I came from ___',e:'저는 뉴욕에서 왔어요 = I\'m from New York'},
      {k:'한국어를 조금 해요',r:'Hangugeoreul jogeum haeyo',m:'I speak a little Korean',e:'Locals will absolutely love this!'},
      {k:'영어 할 수 있어요?',r:'Yeongeo hal su isseoyo?',m:'Can you speak English?',e:'Useful when you\'re stuck'},
      {k:'잠깐만요',r:'Jamkkanmanyo',m:'Just a moment / One sec',e:'When you need time to think or find a word'},
    ],
    quiz:[
      {q:'How do you say "My name is ___"?',o:['저는 미국 사람이에요','제 이름은 ___예요','한국어를 조금 해요','잠깐만요'],a:1},
      {q:'한국어를 조금 해요 means:',o:['I don\'t speak Korean','I speak a little Korean','Do you speak Korean?','I love Korea'],a:1},
      {q:'영어 할 수 있어요? means:',o:['Can you speak Korean?','Do you like English?','Can you speak English?','Where is the English menu?'],a:2},
      {q:'If you need a moment to think, you say:',o:['감사합니다','잠깐만요','죄송합니다','괜찮아요'],a:1},
      {q:'미국 means:',o:['New York','English','America','Korea'],a:2},
    ]
  },
  { day:11, mod:'Greetings', title:'Essential Question Words', sub:'Words that unlock conversations',
    intro:'Knowing question words lets you ask for help even when your Korean is limited. These are your lifeline when navigating Korea — commit them to memory today!',
    book:'Active Korean 1, Ch.3 — question words section.',
    cards:[
      {k:'어디',r:'eodi',m:'Where?',e:'화장실이 어디예요? = Where is the restroom?'},
      {k:'얼마',r:'eolma',m:'How much?',e:'얼마예요? = How much is it?'},
      {k:'뭐 / 무엇',r:'mwo / mueot',m:'What?',e:'이게 뭐예요? = What is this?'},
      {k:'언제',r:'eonje',m:'When?',e:'언제 열어요? = When do you open?'},
      {k:'몇 시',r:'myeot si',m:'What time?',e:'몇 시예요? = What time is it?'},
      {k:'어떻게',r:'eotteoke',m:'How?',e:'어떻게 가요? = How do I get there?'},
    ],
    quiz:[
      {q:'어디 means:',o:['When','Where','What','How much'],a:1},
      {q:'How do you ask "How much is it?"',o:['얼마예요?','어디예요?','뭐예요?','언제예요?'],a:0},
      {q:'몇 시예요? means:',o:['Where is it?','What is this?','What time is it?','How do I get there?'],a:2},
      {q:'어떻게 means:',o:['Where','When','What','How'],a:3},
      {q:'이게 뭐예요? translates to:',o:['Where is this?','What is this?','How much is this?','When is this?'],a:1},
    ]
  },
  { day:12, mod:'Greetings', title:'Survival Phrases', sub:'Your lifeline when things get confusing',
    intro:'These phrases ensure you\'re never completely stuck in Korea. When someone speaks too fast, when you\'re lost, when you\'re confused — these phrases will save you every time.',
    book:'Active Korean 1 — review all phrases from Ch.2–3. Try the dialogue exercises.',
    cards:[
      {k:'모르겠어요',r:'Moreugesseoyo',m:'I don\'t know / I\'m not sure',e:'Useful when you\'re genuinely confused'},
      {k:'이해 못 했어요',r:'Ihae mot haesseoyo',m:'I didn\'t understand',e:'When someone speaks too fast'},
      {k:'다시 말해 주세요',r:'Dasi malhae juseyo',m:'Please say that again',e:'Ask for polite repetition'},
      {k:'천천히 말해 주세요',r:'Cheoncheonhi malhae juseyo',m:'Please speak slowly',e:'Incredibly useful — use it freely!'},
      {k:'도와주세요',r:'Dowajuseyo',m:'Please help me',e:'Emergency or deep confusion'},
      {k:'여기요!',r:'Yeogiyo!',m:'Excuse me! (to call staff)',e:'Calling a waiter — very common in Korea'},
    ],
    quiz:[
      {q:'How do you ask someone to speak slowly?',o:['다시 말해 주세요','천천히 말해 주세요','모르겠어요','도와주세요'],a:1},
      {q:'여기요! is used to:',o:['Say goodbye','Call a waiter / get staff attention','Ask for the check','Say thank you'],a:1},
      {q:'다시 말해 주세요 means:',o:['Speak slowly','Please say that again','I don\'t understand','Help me'],a:1},
      {q:'If you\'re lost and need help, you say:',o:['모르겠어요','여기요','도와주세요','이해 못 했어요'],a:2},
      {q:'모르겠어요 means:',o:['I understand','I don\'t know/I\'m not sure','Please repeat','Speak slowly'],a:1},
    ]
  },
  { day:13, mod:'Greetings', title:'Getting Around', sub:'Transportation phrases',
    intro:'Seoul has one of the world\'s best subway systems, and taxis are abundant and relatively affordable. These phrases help you navigate the city with confidence from day one.',
    book:'Active Korean 1 — transportation vocabulary. Practice each phrase 3× out loud.',
    cards:[
      {k:'___ 어디예요?',r:'___eodi yeyo?',m:'Where is ___?',e:'지하철역 어디예요? = Where is the subway?'},
      {k:'___ 가주세요',r:'___gajuseyo',m:'Please take me to ___',e:'For taxis: 강남 가주세요 = Please go to Gangnam'},
      {k:'여기서 내려 주세요',r:'Yeogiseo naeryeo juseyo',m:'Please drop me off here',e:'In a taxi when you\'ve arrived'},
      {k:'얼마나 걸려요?',r:'Eolmana geollyeoyo?',m:'How long does it take?',e:'걸려요 = takes (time)'},
      {k:'왼쪽 / 오른쪽',r:'Oenjjok / Oreunjjok',m:'Left / Right',e:'왼쪽으로 가세요 = Go left'},
      {k:'직진',r:'Jikjin',m:'Straight ahead',e:'직진하세요 = Go straight'},
    ],
    quiz:[
      {q:'How do you ask a taxi to take you to Gangnam?',o:['강남 어디예요?','강남 가주세요','강남 내려 주세요','강남 걸려요?'],a:1},
      {q:'왼쪽 means:',o:['Right','Straight','Left','Back'],a:2},
      {q:'여기서 내려 주세요 means:',o:['How long does it take?','Where are we going?','Please drop me off here','Go straight'],a:2},
      {q:'직진 means:',o:['Turn left','Turn right','Go back','Straight ahead'],a:3},
      {q:'얼마나 걸려요? asks:',o:['How much does it cost?','How far is it?','How long does it take?','When does it arrive?'],a:2},
    ]
  },
  { day:14, mod:'Greetings', title:'Week 2 Review', sub:'Conversations you can now have',
    intro:'Week 2 complete! You can greet people, introduce yourself, ask essential questions, and navigate the city. You have enough Korean to have meaningful interactions with locals.',
    book:'Active Korean 1, Ch.2–3 — complete all dialogue exercises. Read them out loud!',
    cards:[
      {k:'안녕하세요! 제 이름은 ___예요.',r:'Hello! My name is ___.',m:'Greetings + introduction',e:'Your standard opening line in Korea'},
      {k:'화장실이 어디예요?',r:'Hwajangsili eodiyeyo?',m:'Where is the restroom?',e:'You\'ll use this more than any other phrase'},
      {k:'천천히 말해 주세요',r:'Cheoncheonhi malhae juseyo',m:'Please speak slowly',e:'Don\'t be shy — ask anyone, anytime'},
      {k:'감사합니다!',r:'Gamsahamnida!',m:'Thank you!',e:'Bow slightly when saying this'},
      {k:'여기요! 실례합니다.',r:'Yeogiyo! Sillyehamnida.',m:'Excuse me!',e:'Getting attention in restaurants and shops'},
      {k:'한국어를 조금 해요',r:'Hangugeoreul jogeum haeyo',m:'I speak a little Korean',e:'Locals appreciate the effort enormously!'},
    ],
    quiz:[
      {q:'The correct formal greeting in Korean is:',o:['안녕','안녕하세요','반갑습니다','감사합니다'],a:1},
      {q:'How do you say "Where is the restroom?"',o:['화장실이 얼마예요?','화장실이 어디예요?','화장실 주세요','화장실이 있어요?'],a:1},
      {q:'여기요 is best used to:',o:['Say goodbye','Thank someone','Get a waiter\'s attention','Ask for directions'],a:2},
      {q:'Which phrase means "Please speak slowly"?',o:['다시 말해 주세요','모르겠어요','천천히 말해 주세요','도와주세요'],a:2},
      {q:'You\'re leaving a restaurant. What do you say?',o:['안녕히 계세요','안녕히 가세요','반갑습니다','죄송합니다'],a:0},
    ]
  },
  { day:15, mod:'Restaurant', title:'Entering a Restaurant', sub:'From the door to your seat',
    intro:'Korean restaurants have their own culture. Some are self-service, some have call buttons at the table, and some expect you to shout 여기요! Knowing what to expect makes everything smooth.',
    book:'Active Korean 1 — food and restaurant chapter. Study the ordering dialogue.',
    cards:[
      {k:'몇 분이세요?',r:'Myeot buniseyo?',m:'How many people? (staff asks you)',e:'You\'ll hear this the moment you walk in'},
      {k:'두 명이요',r:'Du myeongieyo',m:'Two people please',e:'두=2, 세=3, 네=4 명이요 for more'},
      {k:'메뉴 주세요',r:'Menyu juseyo',m:'Please bring the menu',e:'If no menu is on the table'},
      {k:'사진 메뉴 있어요?',r:'Sajin menyu isseoyo?',m:'Do you have a picture menu?',e:'A lifesaver when you can\'t read everything!'},
      {k:'주문할게요',r:'Jumunhalgeyo',m:'I\'d like to order (I\'m ready)',e:'Said to the waiter when you\'re ready'},
      {k:'추천해 주세요',r:'Chucheonhae juseyo',m:'Please recommend something',e:'Great way to get the best dish in the house!'},
    ],
    quiz:[
      {q:'A staff member asks 몇 분이세요? They want to know:',o:['What you want to order','How many people in your group','If you have a reservation','How you will pay'],a:1},
      {q:'How do you say "Two people, please"?',o:['두 명이요','세 명이요','네 명이요','한 명이요'],a:0},
      {q:'주문할게요 means:',o:['Check please','I\'d like to order','Please recommend','Do you have a menu?'],a:1},
      {q:'추천해 주세요 means:',o:['Please bring the menu','I\'ll have this','Please recommend something','How much is it?'],a:2},
      {q:'사진 메뉴 있어요? asks for:',o:['A picture menu','A children\'s menu','An English menu','The check'],a:0},
    ]
  },
  { day:16, mod:'Restaurant', title:'Ordering Food', sub:'Getting exactly what you want',
    intro:'Time to order! Korean menus often have pictures which helps a lot. Knowing key ordering phrases ensures you get what you want — and can handle dietary needs safely.',
    book:'Active Korean 1 — practice the ordering dialogue section aloud.',
    cards:[
      {k:'이거 주세요',r:'Igeo juseyo',m:'This please (point at menu)',e:'The single most useful ordering phrase — ever!'},
      {k:'하나 / 둘 / 셋',r:'Hana / Dul / Set',m:'One / Two / Three (native Korean counting)',e:'Used when counting items to order'},
      {k:'물 주세요',r:'Mul juseyo',m:'Water please',e:'Free in most Korean restaurants!'},
      {k:'맵지 않게 해주세요',r:'Maepji anke haejuseyo',m:'Please make it not spicy',e:'Korea can be very spicy — use this if needed'},
      {k:'알레르기가 있어요',r:'Allereugi ga isseoyo',m:'I have allergies',e:'Critical safety phrase to know'},
      {k:'영어 메뉴 있어요?',r:'Yeongeo menyu isseoyo?',m:'Do you have an English menu?',e:'Common in tourist areas of Seoul'},
    ],
    quiz:[
      {q:'The easiest way to order from a picture menu is:',o:['주문할게요','이거 주세요 (+ pointing)','메뉴 주세요','추천해 주세요'],a:1},
      {q:'맵지 않게 해주세요 means:',o:['This is too spicy','I love spicy food','Please make it not spicy','What is spicy here?'],a:2},
      {q:'If you have food allergies, you say:',o:['맵지 않게 해주세요','알레르기가 있어요','물 주세요','이거 주세요'],a:1},
      {q:'하나, 둘, 셋 are:',o:['Formal numbers','Native Korean counting numbers','Sino-Korean numbers','Menu categories'],a:1},
      {q:'How do you ask for water?',o:['이거 주세요','물 주세요','메뉴 주세요','추천해 주세요'],a:1},
    ]
  },
  { day:17, mod:'Restaurant', title:'Korean Food Vocabulary', sub:'Know what you\'re eating',
    intro:'Korean cuisine is rich, varied, and absolutely delicious. Knowing key dish names helps you read menus and order with confidence. These are dishes you\'ll definitely encounter.',
    book:'Active Korean 1 — food vocabulary section. Try to recall each dish name.',
    cards:[
      {k:'비빔밥',r:'Bibimbap',m:'Mixed rice bowl with vegetables & egg',e:'One of Korea\'s most popular dishes worldwide'},
      {k:'삼겹살',r:'Samgyeopsal',m:'Grilled pork belly',e:'Popular BBQ cooked right at your table!'},
      {k:'김치찌개',r:'Kimchi-jjigae',m:'Kimchi stew',e:'Comforting staple — every Korean eats this'},
      {k:'냉면',r:'Naengmyeon',m:'Cold noodles',e:'Perfect for summer; two styles: 물냉면/비빔냉면'},
      {k:'치킨',r:'Chikin',m:'Korean fried chicken',e:'Often paired with beer — called 치맥!'},
      {k:'떡볶이',r:'Tteokbokki',m:'Spicy rice cakes',e:'Popular street food — warning: very spicy!'},
    ],
    quiz:[
      {q:'비빔밥 is:',o:['Grilled pork belly','Cold noodles','Mixed rice bowl','Kimchi stew'],a:2},
      {q:'삼겹살 is cooked:',o:['In a stone pot','At the table on a grill','In broth','Stir-fried'],a:1},
      {q:'냉면 is served:',o:['Hot','Cold','Room temperature','Either hot or cold'],a:1},
      {q:'떡볶이 is famous for being:',o:['Very sweet','Very spicy','Very sour','Very bland'],a:1},
      {q:'치킨 (Korean fried chicken) is often paired with:',o:['Tea','Coffee','Beer (맥주)','Soju'],a:2},
    ]
  },
  { day:18, mod:'Restaurant', title:'During Your Meal', sub:'Mid-meal phrases',
    intro:'Things come up during a meal — you need more water, extra rice, napkins, or you want to compliment the food. These phrases keep the experience smooth from start to finish.',
    book:'Active Korean 1 — situational dialogues. Role-play with a friend or out loud alone!',
    cards:[
      {k:'맛있어요!',r:'Massisseoyo!',m:'It\'s delicious!',e:'Say this to compliment the food — always appreciated'},
      {k:'물 더 주세요',r:'Mul deo juseyo',m:'More water please',e:'더 = more (works for anything!)'},
      {k:'밥 더 주세요',r:'Bap deo juseyo',m:'More rice please',e:'Rice refills are often FREE in Korea!'},
      {k:'젓가락 주세요',r:'Jeotgarak juseyo',m:'Chopsticks please',e:'숟가락 = spoon, 포크 = fork'},
      {k:'너무 매워요',r:'Neomu maewoyo',m:'It\'s too spicy!',e:'너무 = too much (너무 맛있어요 = too delicious!)'},
      {k:'포장해 주세요',r:'Pojanghe juseyo',m:'Please pack it to go',e:'For leftovers or takeout orders'},
    ],
    quiz:[
      {q:'맛있어요 means:',o:['I\'m full','It\'s delicious','It\'s too spicy','More please'],a:1},
      {q:'더 means:',o:['Less','More','No','Please'],a:1},
      {q:'How do you ask for more rice?',o:['물 더 주세요','밥 더 주세요','젓가락 주세요','포장해 주세요'],a:1},
      {q:'포장해 주세요 means:',o:['Make it less spicy','Pack it to go','Chopsticks please','Check please'],a:1},
      {q:'너무 매워요 means:',o:['It\'s delicious','Not spicy enough','It\'s too spicy','I\'m allergic'],a:2},
    ]
  },
  { day:19, mod:'Restaurant', title:'Paying the Bill', sub:'Wrap up your meal',
    intro:'In Korea, it\'s common to pay at the counter on your way out rather than waiting for the server to bring a bill. Knowing payment phrases ensures a smooth checkout every time.',
    book:'Active Korean 1 — numbers review + payment vocabulary.',
    cards:[
      {k:'계산해 주세요',r:'Gyesanhae juseyo',m:'Check please / Bill please',e:'Most common way to ask for the bill'},
      {k:'얼마예요?',r:'Eolmayeyo?',m:'How much is it?',e:'Works in any shop, market, or taxi'},
      {k:'카드 돼요?',r:'Kadeu dwaeyo?',m:'Do you accept cards?',e:'Most places in Korea now accept cards'},
      {k:'영수증 주세요',r:'Yeongsujeung juseyo',m:'Receipt please',e:'영수증 = receipt'},
      {k:'각자 계산할게요',r:'Gakja gyesanhalgeyo',m:'We\'ll pay separately',e:'Splitting the bill'},
      {k:'같이 계산할게요',r:'Gachi gyesanhalgeyo',m:'We\'ll pay together',e:'Paying as one group'},
    ],
    quiz:[
      {q:'How do you ask for the check?',o:['얼마예요?','계산해 주세요','영수증 주세요','카드 돼요?'],a:1},
      {q:'카드 돼요? means:',o:['How much is it?','Do you accept cards?','Can I have a receipt?','Can we split?'],a:1},
      {q:'영수증 주세요 means:',o:['Check please','Receipt please','Water please','To-go please'],a:1},
      {q:'In Korea, when do you usually pay?',o:['Before ordering','During the meal','When leaving, at the counter','Server brings bill automatically'],a:2},
      {q:'각자 계산할게요 means:',o:['Pay together','Pay separately','Cash only','Credit card only'],a:1},
    ]
  },
  { day:20, mod:'Restaurant', title:'Café Culture', sub:'Korea\'s incredible coffee scene',
    intro:'Korea has one of the world\'s most impressive café cultures — beautiful spaces, creative drinks, and an obsession with coffee. Knowing café phrases will serve you daily on your trip.',
    book:'Active Korean 1 — beverage vocabulary and ordering. Practice the café dialogue.',
    cards:[
      {k:'아메리카노',r:'Amerikano',m:'Americano — the most popular coffee in Korea',e:'뜨거운 아메리카노 = Hot Americano'},
      {k:'뜨겁게 / 차갑게',r:'Tteugeobge / Chagapge',m:'Hot / Cold (for drinks)',e:'뜨겁게 해주세요 = Make it hot'},
      {k:'아이스 / 핫',r:'Aiseu / Hat',m:'Iced / Hot (English loan words)',e:'아이스 아메리카노 = the classic Korean order'},
      {k:'테이크아웃 할게요',r:'Teikeuaut halgeyo',m:'I\'ll take it to go',e:'테이크아웃 = takeout (from English)'},
      {k:'여기서 마실게요',r:'Yeogiseo masilgeyo',m:'I\'ll drink it here',e:'Dine in at the café'},
      {k:'사이즈가 어떻게 돼요?',r:'Saijeu-ga eotteoke dwaeyo?',m:'What sizes do you have?',e:'Sizes often: 스몰/미디엄/라지'},
    ],
    quiz:[
      {q:'The most popular coffee order in Korea is:',o:['라떼','카푸치노','아메리카노','에스프레소'],a:2},
      {q:'뜨겁게 means:',o:['Cold','Hot','Sweet','Large'],a:1},
      {q:'테이크아웃 할게요 means:',o:['I\'ll drink here','Large size','I\'ll take it to go','What sizes?'],a:2},
      {q:'How do you say "I\'ll drink it here"?',o:['테이크아웃 할게요','여기서 마실게요','사이즈가 어떻게 돼요?','차갑게 해주세요'],a:1},
      {q:'차갑게 means:',o:['Hot','Sweet','Cold','Extra shot'],a:2},
    ]
  },
  { day:21, mod:'Restaurant', title:'Week 3 Review', sub:'Full meal from start to finish',
    intro:'Week 3 complete! You can now navigate any Korean restaurant or café from the moment you walk in to paying the bill. Let\'s do a full meal walkthrough review.',
    book:'Active Korean 1 — complete all food/restaurant exercises. Role-play a full meal dialogue!',
    cards:[
      {k:'입장: 안녕하세요! 두 명이요.',r:'Entering: Hello! Two people please.',m:'Bow slightly, smile — you\'re in!',e:'Table for two'},
      {k:'주문: 이거 주세요. 물 주세요.',r:'Ordering: I\'ll have this. Water please.',m:'Point at the menu photo confidently',e:'이거 + point = foolproof ordering'},
      {k:'식사 중: 맛있어요! 밥 더 주세요.',r:'During meal: Delicious! More rice please.',m:'Compliment the food!',e:'Rice is often free refills'},
      {k:'계산: 계산해 주세요. 카드 돼요?',r:'Paying: Check please. Do you accept cards?',m:'Walk to the counter to pay',e:'Most places take cards now'},
      {k:'퇴장: 감사합니다! 안녕히 계세요!',r:'Leaving: Thank you! Goodbye!',m:'Bow as you leave — it\'s polite',e:'You are leaving, so: 안녕히 계세요'},
      {k:'카페: 아이스 아메리카노 하나 주세요.',r:'Café: One iced Americano please.',m:'The most common café order in Korea!',e:'하나 = one item (native Korean)'},
    ],
    quiz:[
      {q:'Complete: 아이스 아메리카노 ___ 주세요 (one please)',o:['하나','둘','셋','넷'],a:0},
      {q:'When you\'re ready to order, you say:',o:['계산해 주세요','추천해 주세요','주문할게요','여기요'],a:2},
      {q:'맛있어요 means:',o:['I\'m full','It\'s too spicy','It\'s delicious','More please'],a:2},
      {q:'After eating, how do you ask for the check?',o:['영수증 주세요','계산해 주세요','포장해 주세요','물 주세요'],a:1},
      {q:'여기요! in a restaurant means:',o:['The food is here','Excuse me! (to call staff)','I\'m ready to pay','Please sit here'],a:1},
    ]
  },
  { day:22, mod:'Numbers', title:'Sino-Korean Numbers', sub:'Used for money, floors & dates',
    intro:'Korean has TWO number systems! Sino-Korean numbers (based on Chinese) are used for prices, floors in buildings, phone numbers, and dates. You NEED these for shopping in Korea.',
    book:'Active Korean 1 — numbers chapter. Practice writing out prices you see around you.',
    cards:[
      {k:'일 이 삼 사 오',r:'il i sam sa o',m:'1 through 5 (Sino-Korean)',e:'일 층 = 1st floor'},
      {k:'육 칠 팔 구 십',r:'yuk chil pal gu sip',m:'6 through 10',e:'십 원 = 10 won'},
      {k:'백 / 천 / 만',r:'baek / cheon / man',m:'Hundred / Thousand / Ten-thousand',e:'만 원 = approx $7.50 USD'},
      {k:'이만 오천 원',r:'i-man o-cheon won',m:'25,000 won (about $18 USD)',e:'Typical mid-range restaurant meal'},
      {k:'삼만 원',r:'sam-man won',m:'30,000 won (about $22 USD)',e:'Nice dinner for one'},
      {k:'오천 원',r:'o-cheon won',m:'5,000 won (about $3.70 USD)',e:'Street food, convenience store meal'},
    ],
    quiz:[
      {q:'How do you say 10,000 in Korean?',o:['천','백','만','억'],a:2},
      {q:'이만 오천 원 equals:',o:['2,500 won','25,000 won','250,000 won','2,050 won'],a:1},
      {q:'Which number system is used for prices?',o:['Native Korean','Sino-Korean','Both equally','Neither'],a:1},
      {q:'삼 means:',o:['1','2','3','4'],a:2},
      {q:'오천 원 is approximately:',o:['$0.37 USD','$3.70 USD','$37 USD','$370 USD'],a:1},
    ]
  },
  { day:23, mod:'Numbers', title:'Native Korean Numbers', sub:'Used for counting things & age',
    intro:'Native Korean numbers are used to count physical objects, state your age, and tell the hours on a clock. You already know a few (하나, 둘, 셋 from restaurant day) — let\'s complete the set!',
    book:'Active Korean 1 — native Korean numbers. Practice counting objects in the room.',
    cards:[
      {k:'하나 둘 셋 넷 다섯',r:'ha-na dul set net da-seot',m:'1–5 (Native Korean)',e:'Used for counting things'},
      {k:'여섯 일곱 여덟 아홉 열',r:'yeo-seot il-gop yeo-deol a-hop yeol',m:'6–10 (Native Korean)',e:'열 = 10'},
      {k:'스물 / 서른 / 마흔',r:'seu-mul / seo-reun / ma-heun',m:'20 / 30 / 40',e:'저는 스물 다섯 살이에요 = I\'m 25'},
      {k:'___ 살이에요',r:'___sal-ieyo',m:'I am ___ years old',e:'스물 살이에요 = I\'m 20 years old'},
      {k:'한 잔 / 두 잔',r:'han jan / du jan',m:'One glass / Two glasses',e:'잔 = counter for drinks/glasses'},
      {k:'한 개 / 두 개',r:'han gae / du gae',m:'One item / Two items',e:'개 = general counter for things'},
    ],
    quiz:[
      {q:'Native Korean numbers are used for:',o:['Prices','Phone numbers','Counting items and stating age','Floors in a building'],a:2},
      {q:'How do you say "I am 25 years old"?',o:['이십오 살이에요','스물 다섯 살이에요','이오 살이에요','다섯 스물 살이에요'],a:1},
      {q:'한 개 means:',o:['One glass','One item/thing','One floor','One person'],a:1},
      {q:'열 means:',o:['5','8','10','20'],a:2},
      {q:'Two glasses of water = 물 ___ 주세요',o:['두 잔','한 잔','이 잔','둘 잔'],a:0},
    ]
  },
  { day:24, mod:'Numbers', title:'Korean Currency', sub:'Navigating won like a local',
    intro:'The Korean Won can feel confusing at first — everything costs thousands! But once you internalize the scale, it\'s straightforward. The smallest common bill is 1,000 won.',
    book:'Active Korean 1 — money and shopping vocabulary. Practice saying prices out loud.',
    cards:[
      {k:'원 (₩)',r:'Won',m:'Korean currency unit',e:'1,000 won = approx $0.75 USD (2024–25 rates)'},
      {k:'얼마예요?',r:'Eolmayeyo?',m:'How much is it?',e:'Say this in any shop, market, taxi, anywhere'},
      {k:'너무 비싸요',r:'Neomu bissayo',m:'It\'s too expensive',e:'Try this at traditional markets (재래시장)'},
      {k:'깎아 주세요',r:'Kkakka juseyo',m:'Please give me a discount',e:'At traditional markets only — not restaurants!'},
      {k:'거스름돈',r:'Geoseureumdon',m:'Change (money returned to you)',e:'거스름돈 주세요 = my change please'},
      {k:'현금 / 카드',r:'Hyeongeum / Kadeu',m:'Cash / Card',e:'현금이에요 = it\'s cash / 카드예요 = card'},
    ],
    quiz:[
      {q:'1,000 won is approximately:',o:['$0.075 USD','$0.75 USD','$7.50 USD','$75 USD'],a:1},
      {q:'너무 비싸요 means:',o:['It\'s cheap','It\'s free','It\'s too expensive','What\'s the price?'],a:2},
      {q:'Where can you try bargaining (깎아 주세요)?',o:['Convenience stores','Restaurants','Traditional markets','Subway stations'],a:2},
      {q:'거스름돈 means:',o:['Credit card','Cash','Change (money back)','Receipt'],a:2},
      {q:'How do you say "cash" in Korean?',o:['카드','현금','원','거스름돈'],a:1},
    ]
  },
  { day:25, mod:'Numbers', title:'Week 4 Review', sub:'Shopping and money mastered',
    intro:'Week 4 complete! You can handle money, count items, state your age, and shop confidently in Korea. Let\'s make sure both number systems are locked in.',
    book:'Active Korean 1 — complete all number exercises. Practice counting objects around you.',
    cards:[
      {k:'Sino: 일이삼사오육칠팔구십',r:'il i sam sa o yuk chil pal gu sip',m:'1–10 Sino-Korean',e:'Prices, dates, phone numbers, floors'},
      {k:'Native: 하나둘셋넷다섯...',r:'ha-na dul set net da-seot...',m:'1–10 Native Korean',e:'Counting items, age, and time (hours!)'},
      {k:'만 원',r:'Man won',m:'10,000 won — think of it as a $10 bill',e:'Most common denomination in Korea'},
      {k:'얼마예요? / 비싸요',r:'Eolmayeyo? / Bissayo',m:'How much? / Expensive',e:'Your two shopping essentials'},
      {k:'한 개 주세요',r:'Han gae juseyo',m:'One please (one item)',e:'한 개, 두 개, 세 개...'},
      {k:'카드 돼요? / 현금이에요',r:'Card ok? / It\'s cash',m:'Payment phrases',e:'Most places now take cards in Korea'},
    ],
    quiz:[
      {q:'Which system do you use for prices?',o:['Native Korean (하나, 둘...)','Sino-Korean (일, 이...)','Either works','Neither'],a:1},
      {q:'How do you say 15,000 won?',o:['오 천 원','십오 천 원','일만 오천 원','오만 원'],a:2},
      {q:'두 개 주세요 means:',o:['One please','Two please','Three please','How many?'],a:1},
      {q:'너무 비싸요 would be appropriate to say at:',o:['A restaurant','A subway station','A traditional market','A hotel'],a:2},
      {q:'10,000 won is said as:',o:['천 원','백 원','만 원','억 원'],a:2},
    ]
  },
  { day:26, mod:'Time', title:'Telling the Time', sub:'Hours and minutes in Korean',
    intro:'Korean uses BOTH number systems for time: Native Korean for hours (한, 두, 세...) and Sino-Korean for minutes (일, 이, 삼...). It sounds complex but becomes natural quickly!',
    book:'Active Korean 1 — time expressions chapter.',
    cards:[
      {k:'몇 시예요?',r:'Myeot siyeyo?',m:'What time is it?',e:'The essential time question'},
      {k:'한 시 / 두 시 / 세 시',r:'han si / du si / se si',m:'1 o\'clock / 2 / 3',e:'시 = o\'clock. Use NATIVE numbers for hours!'},
      {k:'삼십 분 / 사십오 분',r:'sam-sip bun / sa-sip-o bun',m:'30 minutes / 45 minutes',e:'분 = minutes. Use SINO-Korean for minutes!'},
      {k:'두 시 삼십 분이에요',r:'Du si samsip bunieyo',m:'It\'s 2:30',e:'Native (hour) + 시 + Sino (minutes) + 분'},
      {k:'오전 / 오후',r:'Ojeon / Ohu',m:'AM / PM',e:'오전 열 시 = 10 AM, 오후 세 시 = 3 PM'},
      {k:'반',r:'Ban',m:'Half past (:30)',e:'두 시 반 = 2:30 (literally "two o\'clock half")'},
    ],
    quiz:[
      {q:'What number system is used for HOURS in Korean?',o:['Sino-Korean (일,이,삼...)','Native Korean (한,두,세...)','Both work equally','English numbers'],a:1},
      {q:'두 시 반 means:',o:['2:00','2:15','2:30','2:45'],a:2},
      {q:'오후 means:',o:['Morning (AM)','Afternoon/Evening (PM)','Evening only','Midnight'],a:1},
      {q:'How do you say "3 o\'clock"?',o:['삼 시','세 시','3 시','셋 시'],a:1},
      {q:'몇 시예요? means:',o:['How long?','What time is it?','When does it open?','How many hours?'],a:1},
    ]
  },
  { day:27, mod:'Time', title:'Days & Dates', sub:'Plan your schedule in Korean',
    intro:'Knowing days of the week and date vocabulary helps you make reservations, read schedules, and plan your trip. Korean days of the week are named after the five elements plus sun and moon!',
    book:'Active Korean 1 — days, weeks, months section.',
    cards:[
      {k:'월 화 수 목 금 토 일',r:'wol hwa su mok geum to il',m:'Mon Tue Wed Thu Fri Sat Sun',e:'월=Moon 화=Fire 수=Water 목=Wood 금=Gold 토=Earth 일=Sun'},
      {k:'오늘 / 내일 / 어제',r:'o-neul / nae-il / eo-je',m:'Today / Tomorrow / Yesterday',e:'오늘이 몇 월 며칠이에요? = What\'s today\'s date?'},
      {k:'이번 주 / 다음 주',r:'i-beon ju / da-eum ju',m:'This week / Next week',e:'다음 주 월요일 = next Monday'},
      {k:'몇 월 며칠이에요?',r:'Myeot wol myeochirieyo?',m:'What is today\'s date?',e:'월 = month, 일 = day'},
      {k:'예약이 있어요',r:'Yeyagi isseoyo',m:'I have a reservation',e:'For restaurants and hotels'},
      {k:'몇 시에 열어요?',r:'Myeot sie yeoreoyo?',m:'What time do you open?',e:'닫아요 = close — 몇 시에 닫아요? = closing time?'},
    ],
    quiz:[
      {q:'In Korean, Monday (월요일) is literally named after:',o:['Fire','Moon','Water','Wood'],a:1},
      {q:'오늘 means:',o:['Yesterday','Tomorrow','Today','This week'],a:2},
      {q:'내일 means:',o:['Yesterday','Today','Tomorrow','Next week'],a:2},
      {q:'How do you say "I have a reservation"?',o:['예약이 있어요','예약해 주세요','예약이 없어요','예약 취소해요'],a:0},
      {q:'몇 시에 열어요? asks:',o:['What time is it?','How long until closing?','What time do you open?','When is the reservation?'],a:2},
    ]
  },
  { day:28, mod:'Time', title:'Time Expressions', sub:'Talking about when things happen',
    intro:'These time expressions connect everything you know. They help you understand schedules, give accurate directions, and plan your day in Korea with precision.',
    book:'Active Korean 1 — time expression exercises. Complete all practice sentences.',
    cards:[
      {k:'지금',r:'jigeum',m:'Now',e:'지금 몇 시예요? = What time is it now?'},
      {k:'나중에',r:'najunge',m:'Later',e:'나중에 봐요 = See you later'},
      {k:'곧',r:'got',m:'Soon',e:'곧 도착해요 = Arriving soon'},
      {k:'십 분 후에',r:'sip bun hue',m:'In 10 minutes',e:'몇 분 후에? = In how many minutes?'},
      {k:'아침 / 점심 / 저녁',r:'achim / jeomsim / jeonyeok',m:'Morning / Lunch / Evening (also = meals!)',e:'저녁 먹었어요? = Did you eat dinner?'},
      {k:'오래 걸려요?',r:'Orae geollyeoyo?',m:'Does it take long?',e:'In a restaurant, taxi, or at attractions'},
    ],
    quiz:[
      {q:'지금 means:',o:['Later','Soon','Now','Already'],a:2},
      {q:'아침, 점심, 저녁 translate to:',o:['Yesterday, today, tomorrow','Morning, lunch, evening','Monday, Wednesday, Friday','AM, PM, midnight'],a:1},
      {q:'곧 도착해요 means:',o:['We\'re far away','We already arrived','Arriving soon','We left already'],a:2},
      {q:'오래 걸려요? asks:',o:['How much does it cost?','Does it take long?','How far is it?','When does it close?'],a:1},
      {q:'십 분 후에 means:',o:['10 minutes ago','In 10 minutes','10 minutes from yesterday','At 10 o\'clock'],a:1},
    ]
  },
  { day:29, mod:'Time', title:'Final Review Part 1', sub:'Hangul + Greetings + Restaurant',
    intro:'Two days left! Today we review Weeks 1–3. You\'ve built an incredible foundation. Let\'s make sure everything is solid before your trip.',
    book:'Active Korean 1 — review Chapters 1–3 completely. Read every dialogue out loud.',
    cards:[
      {k:'안녕하세요! 화장실이 어디예요?',r:'Hello! Where is the restroom?',m:'Greetings + location question',e:'A real conversation you\'ll have in Korea'},
      {k:'여기요! 이거 하나 주세요.',r:'Excuse me! One of these please.',m:'Restaurant: attention + ordering',e:'Point at the menu item as you say this'},
      {k:'맛있어요! 계산해 주세요.',r:'Delicious! Check please.',m:'Compliment + asking for bill',e:'The perfect end to every great meal'},
      {k:'천천히 말해 주세요. 한국어를 조금 해요.',r:'Speak slowly please. I speak a little Korean.',m:'Survival combo',e:'Use this freely — locals will appreciate it!'},
      {k:'ㄱㄴㄷㄹㅁㅂㅅ + ㅇㅈㅊㅋㅌㅍㅎ',r:'g n d r m b s + ng j ch k t p h',m:'All 14 basic consonants',e:'Can you recall each sound without looking?'},
      {k:'출구 / 입구 / 화장실 / 편의점',r:'Exit / Entrance / Restroom / Convenience store',m:'Signs you must recognize',e:'You\'ll see all of these every single day'},
    ],
    quiz:[
      {q:'How do you say "Delicious!" in Korean?',o:['맛없어요','맛있어요','매워요','달아요'],a:1},
      {q:'What does 출구 mean?',o:['Entrance','Restroom','Exit','Pharmacy'],a:2},
      {q:'When you want a waiter\'s attention in a restaurant:',o:['안녕히 가세요','실례합니다 / 여기요','잠깐만요','죄송합니다'],a:1},
      {q:'ㅇ at the START of a syllable is:',o:['A strong "g" sound','An "ng" sound','Completely silent','An "h" sound'],a:2},
      {q:'계산해 주세요 means:',o:['Please recommend','Check please','I\'ll order now','Pack to go'],a:1},
    ]
  },
  { day:30, mod:'Time', title:'Final Review — Korea Ready!', sub:'30 days. You\'re ready.',
    intro:'Congratulations! You\'ve completed your 30-day Korean crash course! Today is a final review of everything. You ARE ready for Korea. 파이팅!',
    book:'Active Korean 1 — complete the full book review. You now have the foundation for Active Korean 2!',
    cards:[
      {k:'Sino (일~만)',r:'il i sam sa o yuk chil pal gu sip baek cheon man',m:'For prices, floors, phone numbers',e:'만 원 = 10,000 won = approx $7.50'},
      {k:'Native (하나~열)',r:'ha-na dul set net da-seot yeo-seot il-gop yeo-deol a-hop yeol',m:'For counting items, age, HOURS',e:'세 시 = 3 o\'clock'},
      {k:'두 시 반이에요',r:'Du si ban-ieyo',m:'It\'s 2:30',e:'Native (hr) + 시 + 반 = half past'},
      {k:'오만 원이에요',r:'Oman wonieyo',m:'It\'s 50,000 won (approx $37 USD)',e:'A nice dinner, shopping, or day of activities'},
      {k:'몇 시에 닫아요?',r:'Myeot sie dadayo?',m:'What time do you close?',e:'닫다 = to close. Essential travel question!'},
      {k:'한국 여행 잘 하세요! 파이팅!',r:'Have a great trip to Korea! You\'ve got this!',m:'파이팅 = Go for it / Good luck!',e:'You earned this — enjoy every moment!'},
    ],
    quiz:[
      {q:'What time is 세 시 반?',o:['3:00','3:15','3:30','3:45'],a:2},
      {q:'50,000 won is said as:',o:['오천 원','오만 원','오십만 원','오백 원'],a:1},
      {q:'몇 시에 닫아요? asks:',o:['What time do you open?','What time do you close?','How long are you open?','Are you open now?'],a:1},
      {q:'파이팅! is used in Korea to mean:',o:['Goodbye forever','Good luck / You\'ve got this!','I love Korea','Let\'s eat!'],a:1},
      {q:'Which is correct for "5 o\'clock"?',o:['오 시','다섯 시','5시간','오시'],a:1},
    ]
  },
];

const WEEK_LABELS = ['', 'Week 1: Hangul', 'Week 2: Greetings', 'Week 3: Restaurant', 'Week 4: Numbers', 'Week 5: Time'];
const getWeek = (day) => Math.min(Math.ceil(day / 7), 5);

const Badge = ({ mod, small }) => {
  const m = MOD[mod];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: small ? '2px 8px' : '4px 10px',
      background: m.bg, color: m.text,
      borderRadius: 8, fontSize: small ? 11 : 12, fontWeight: 500,
      border: `0.5px solid ${m.color}40`,
    }}>{mod}</span>
  );
};

export default function App() {
  const [view, setView] = useState('home');
  const [done, setDone] = useState(new Set());
  const [curDay, setCurDay] = useState(1);
  const [lesson, setLesson] = useState(null);
  const [tab, setTab] = useState('learn');
  const [ci, setCi] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [sel, setSel] = useState(null);
  const [quizEnd, setQuizEnd] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('kr-prog');
      if (saved) {
        const d = JSON.parse(saved);
        setDone(new Set(d.done || []));
        setCurDay(d.cur || 1);
      }
    } catch(e) {}
  }, []);

  const save = (nd, nc) => {
    try {
      localStorage.setItem('kr-prog', JSON.stringify({ done: [...nd], cur: nc }));
    } catch(e) {}
  };

  const openLesson = (l) => {
    setLesson(l); setTab('learn'); setCi(0); setFlipped(false);
    setQi(0); setScore(0); setSel(null); setQuizEnd(false);
    setView('lesson');
    window.scrollTo(0, 0);
  };

  const markDone = () => {
    const nd = new Set(done); nd.add(lesson.day);
    const nc = Math.min(lesson.day + 1, 31);
    setDone(nd); setCurDay(nc); save(nd, nc); setView('home');
    window.scrollTo(0, 0);
  };

  const handleAnswer = (idx) => {
    if (sel !== null) return;
    setSel(idx);
    if (idx === lesson.quiz[qi].a) setScore(s => s + 1);
    setTimeout(() => {
      if (qi < lesson.quiz.length - 1) { setQi(q => q + 1); setSel(null); }
      else setQuizEnd(true);
    }, 900);
  };

  const totalDone = done.size;
  const pct = Math.round((totalDone / 30) * 100);
  const weekProgress = Array.from({length:5}, (_,i) => {
    const wk = i+1;
    const wkDays = LESSONS.filter(l => getWeek(l.day) === wk);
    return { wk, total: wkDays.length, done: wkDays.filter(l => done.has(l.day)).length, mod: wkDays[0]?.mod };
  });

  if (view === 'lesson' && lesson) {
    const cards = lesson.cards;
    const quiz = lesson.quiz;
    const card = cards[ci];
    const m = MOD[lesson.mod];

    return (
      <div style={{ fontFamily: 'var(--font-sans)', maxWidth: 640, margin: '0 auto', padding: '0 0 60px' }}>
        <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => setView('home')} style={{ background: 'none', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 13, color: 'var(--color-text-secondary)' }}>← Back</button>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Day {lesson.day}</span>
              <Badge mod={lesson.mod} small />
            </div>
            <div style={{ fontSize: 16, fontWeight: 500, marginTop: 2, color: 'var(--color-text-primary)' }}>{lesson.title}</div>
          </div>
          {done.has(lesson.day) && <span style={{ fontSize: 12, background: '#EAF3DE', color: '#27500A', padding: '4px 10px', borderRadius: 8, fontWeight: 500 }}>Done</span>}
        </div>

        <div style={{ display: 'flex', margin: '16px 20px 0', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
          {['learn','cards','quiz'].map(t => (
            <button key={t} onClick={() => { setTab(t); if(t==='cards'){setCi(0);setFlipped(false);} if(t==='quiz'){setQi(0);setScore(0);setSel(null);setQuizEnd(false);} }} style={{ background: 'none', border: 'none', padding: '10px 16px', cursor: 'pointer', fontSize: 13, fontWeight: tab===t ? 500 : 400, color: tab===t ? m.color : 'var(--color-text-secondary)', borderBottom: tab===t ? `2px solid ${m.color}` : '2px solid transparent' }}>
              {t === 'cards' ? 'Flashcards' : t === 'learn' ? 'Lesson' : 'Quiz'}
            </button>
          ))}
        </div>

        <div style={{ padding: '20px' }}>
          {tab === 'learn' && (
            <div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--color-text-primary)', margin: '0 0 20px' }}>{lesson.intro}</p>
              <div style={{ background: m.bg, border: `0.5px solid ${m.color}40`, borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: m.text, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Korean 1 Reference</div>
                <div style={{ fontSize: 14, color: m.text }}>{lesson.book}</div>
              </div>
              <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 12 }}>Today's {cards.length} key vocabulary items:</div>
              {cards.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
                  <div style={{ minWidth: 56, textAlign: 'center', fontSize: 26, fontFamily: '"Noto Sans KR", sans-serif', color: m.color, lineHeight: 1 }}>{c.k}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 2 }}>{c.r}</div>
                    <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 2 }}>{c.m}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)', fontStyle: 'italic' }}>{c.e}</div>
                  </div>
                </div>
              ))}
              <button onClick={() => setTab('cards')} style={{ width: '100%', marginTop: 24, padding: '12px', border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, background: 'var(--color-background-secondary)', cursor: 'pointer', fontSize: 14, color: 'var(--color-text-primary)' }}>
                Practice Flashcards →
              </button>
            </div>
          )}

          {tab === 'cards' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Card {ci+1} of {cards.length}</span>
                <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 6 }}>
                  {cards.map((_,i) => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: i===ci ? m.color : 'var(--color-border-secondary)' }} />)}
                </div>
              </div>
              <div onClick={() => setFlipped(f => !f)} style={{ background: flipped ? m.bg : 'var(--color-background-primary)', border: `0.5px solid ${flipped ? m.color+'60' : 'var(--color-border-tertiary)'}`, borderRadius: 12, padding: '40px 24px', textAlign: 'center', cursor: 'pointer', minHeight: 220, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
                {!flipped ? (
                  <>
                    <div style={{ fontSize: 52, fontFamily: '"Noto Sans KR", sans-serif', color: m.color, marginBottom: 12, lineHeight: 1 }}>{card.k}</div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>tap to reveal</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 20, fontWeight: 500, color: m.text, marginBottom: 8 }}>{card.r}</div>
                    <div style={{ fontSize: 15, color: m.text, marginBottom: 10, lineHeight: 1.5 }}>{card.m}</div>
                    <div style={{ fontSize: 13, color: m.color, fontStyle: 'italic', lineHeight: 1.5 }}>{card.e}</div>
                  </>
                )}
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                <button onClick={() => { if(ci>0){setCi(ci-1);setFlipped(false);} }} disabled={ci===0} style={{ flex: 1, padding: '11px', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 8, background: 'var(--color-background-secondary)', cursor: ci===0 ? 'default' : 'pointer', fontSize: 13, color: ci===0 ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)' }}>← Prev</button>
                {ci < cards.length - 1
                  ? <button onClick={() => { setCi(ci+1); setFlipped(false); }} style={{ flex: 1, padding: '11px', border: `0.5px solid ${m.color}60`, borderRadius: 8, background: m.bg, cursor: 'pointer', fontSize: 13, color: m.text, fontWeight: 500 }}>Next →</button>
                  : <button onClick={() => setTab('quiz')} style={{ flex: 2, padding: '11px', border: `0.5px solid ${m.color}`, borderRadius: 8, background: m.color, cursor: 'pointer', fontSize: 14, color: '#fff', fontWeight: 500 }}>Take the Quiz →</button>
                }
              </div>
            </div>
          )}

          {tab === 'quiz' && (
            <div>
              {quizEnd ? (
                <div style={{ textAlign: 'center', paddingTop: 20 }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>{score === quiz.length ? '🎉' : score >= Math.ceil(quiz.length * 0.7) ? '👍' : '💪'}</div>
                  <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 8, color: 'var(--color-text-primary)' }}>{score}/{quiz.length} correct</div>
                  <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>
                    {score === quiz.length ? 'Perfect score! You\'ve mastered this lesson.' : score >= Math.ceil(quiz.length * 0.7) ? 'Great job! Review any missed questions and retry.' : 'Keep practicing — review the lesson and retry!'}
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => { setQi(0); setScore(0); setSel(null); setQuizEnd(false); }} style={{ flex: 1, padding: '12px', border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, background: 'var(--color-background-secondary)', cursor: 'pointer', fontSize: 14, color: 'var(--color-text-primary)' }}>Retry Quiz</button>
                    <button onClick={markDone} style={{ flex: 1, padding: '12px', border: `0.5px solid ${m.color}`, borderRadius: 8, background: m.color, cursor: 'pointer', fontSize: 14, color: '#fff', fontWeight: 500 }}>Complete Day {lesson.day} ✓</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <div style={{ flex: 1, height: 4, background: 'var(--color-border-tertiary)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(qi/quiz.length)*100}%`, background: m.color, transition: 'width 0.3s' }} />
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', minWidth: 40 }}>{qi+1}/{quiz.length}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--color-text-primary)', lineHeight: 1.5, marginBottom: 20 }}>{quiz[qi].q}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {quiz[qi].o.map((opt, i) => {
                      let bg = 'var(--color-background-primary)', border = 'var(--color-border-secondary)', color = 'var(--color-text-primary)';
                      if (sel !== null) {
                        if (i === quiz[qi].a) { bg = '#EAF3DE'; border = '#3B6D11'; color = '#27500A'; }
                        else if (i === sel) { bg = '#FCEBEB'; border = '#A32D2D'; color = '#791F1F'; }
                      }
                      return <button key={i} onClick={() => handleAnswer(i)} style={{ padding: '13px 16px', background: bg, border: `0.5px solid ${border}`, borderRadius: 8, cursor: sel!==null ? 'default' : 'pointer', fontSize: 14, color, textAlign: 'left', lineHeight: 1.4, transition: 'background 0.2s' }}>{opt}</button>;
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  const todayLesson = LESSONS.find(l => l.day === curDay) || LESSONS[29];

  return (
    <div style={{ fontFamily: 'var(--font-sans)', maxWidth: 640, margin: '0 auto', padding: '0 0 60px' }}>
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 500, color: 'var(--color-text-primary)', fontFamily: '"Noto Sans KR", var(--font-sans)' }}>한국어 코스</div>
            <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>30-Day Korean for Travel</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 24, fontWeight: 500, color: 'var(--color-text-primary)' }}>{pct}%</div>
            <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{totalDone}/30 days</div>
          </div>
        </div>
        <div style={{ height: 6, background: 'var(--color-border-tertiary)', borderRadius: 3, marginTop: 14, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #185FA5, #534AB7)', borderRadius: 3, transition: 'width 0.5s' }} />
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Modules</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
          {weekProgress.map(({wk, total, done: wd, mod}) => {
            const m = MOD[mod] || MOD.Hangul;
            const complete = wd === total;
            return (
              <div key={wk} style={{ padding: '10px 8px', background: complete ? m.bg : 'var(--color-background-secondary)', border: `0.5px solid ${complete ? m.color+'60' : 'var(--color-border-tertiary)'}`, borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: complete ? m.text : 'var(--color-text-secondary)', marginBottom: 4 }}>W{wk}</div>
                <div style={{ fontSize: 10, color: complete ? m.color : 'var(--color-text-tertiary)' }}>{wd}/{total}</div>
              </div>
            );
          })}
        </div>
      </div>

      {curDay <= 30 ? (
        <div style={{ padding: '20px' }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Today's Lesson</div>
          <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-secondary)', borderRadius: 12, padding: '20px', cursor: 'pointer' }} onClick={() => openLesson(todayLesson)}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>Day {todayLesson.day}</span>
                  <Badge mod={todayLesson.mod} small />
                </div>
                <div style={{ fontSize: 17, fontWeight: 500, color: 'var(--color-text-primary)' }}>{todayLesson.title}</div>
                <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>{todayLesson.sub}</div>
              </div>
              <div style={{ fontSize: 22, color: MOD[todayLesson.mod].color }}>→</div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              {[`${todayLesson.cards.length} vocab`, `${todayLesson.quiz.length} questions`, '~30 min'].map((item, i) => (
                <span key={i} style={{ fontSize: 11, color: 'var(--color-text-tertiary)', background: 'var(--color-background-secondary)', padding: '3px 8px', borderRadius: 6 }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: '20px' }}>
          <div style={{ background: '#EAF3DE', border: '0.5px solid #3B6D11', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: '#27500A', marginBottom: 4 }}>Course Complete!</div>
            <div style={{ fontSize: 14, color: '#3B6D11' }}>30/30 days done. 한국 여행 잘 하세요!</div>
          </div>
        </div>
      )}

      <div style={{ padding: '0 20px' }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>All 30 Days</div>
        {[1,2,3,4,5].map(wk => {
          const wkLessons = LESSONS.filter(l => getWeek(l.day) === wk);
          const wkMod = wkLessons[0]?.mod;
          const m = MOD[wkMod] || MOD.Hangul;
          return (
            <div key={wk} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Badge mod={wkMod} small />{WEEK_LABELS[wk]}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {wkLessons.map(l => {
                  const isDone = done.has(l.day);
                  const isToday = l.day === curDay;
                  return (
                    <div key={l.day} onClick={() => openLesson(l)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', background: isToday ? m.bg : 'var(--color-background-primary)', border: `0.5px solid ${isToday ? m.color+'60' : isDone ? 'var(--color-border-secondary)' : 'var(--color-border-tertiary)'}`, borderRadius: 8, cursor: 'pointer' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, background: isDone ? m.color : isToday ? m.color+'20' : 'var(--color-background-secondary)', color: isDone ? '#fff' : isToday ? m.color : 'var(--color-text-tertiary)', fontWeight: 500 }}>
                        {isDone ? '✓' : l.day}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: isToday ? 500 : 400, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.title}</div>
                        <div style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{l.sub}</div>
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>→</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
