// Authoritative 19 Prefectures where Prefecture Name != Capital City Name
export const PREFECTURES_DATA = [
  {
    id: 'hokkaido',
    pref: '北海道',
    capital: '札幌市',
    readingPref: 'ほっかいどう',
    readingCap: 'さっぽろし',
    region: 'hokkaido_tohoku',
    regionLabel: '北海道・東北',
    symbol: '🏯',
    tip: '北海道の道庁所在地は「札幌（さっぽろ）市」！時計台や大通公園、雪まつりで有名です。'
  },
  {
    id: 'iwate',
    pref: '岩手県',
    capital: '盛岡市',
    readingPref: 'いわてけん',
    readingCap: 'もりおかし',
    region: 'hokkaido_tohoku',
    regionLabel: '北海道・東北',
    symbol: '🍜',
    tip: '岩手県の県庁所在地は「盛岡（もりおか）市」！わんこそばや盛岡冷麺、中津川の風情が有名。'
  },
  {
    id: 'miyagi',
    pref: '宮城県',
    capital: '仙台市',
    readingPref: 'みやぎけん',
    readingCap: 'せんだいし',
    region: 'hokkaido_tohoku',
    regionLabel: '北海道・東北',
    symbol: '🌙',
    tip: '宮城県の県庁所在地は「仙台（せんだい）市」！「杜の都」と呼ばれ、伊達政宗ゆかりの青葉城があります。'
  },
  {
    id: 'ibaraki',
    pref: '茨城県',
    capital: '水戸市',
    readingPref: 'いばらきけん',
    readingCap: 'みとし',
    region: 'kanto',
    regionLabel: '関東',
    symbol: '🌺',
    tip: '茨城県の県庁所在地は「水戸（みと）市」！水戸黄門、納豆、日本三名園の偕楽園（かいらくえん）が名物。'
  },
  {
    id: 'tochigi',
    pref: '栃木県',
    capital: '宇都宮市',
    readingPref: 'とちぎけん',
    readingCap: 'うつのみやし',
    region: 'kanto',
    regionLabel: '関東',
    symbol: '🥟',
    tip: '栃木県の県庁所在地は「宇都宮（うつのみや）市」！日本有数の餃子の街として全国に知られています。'
  },
  {
    id: 'gunma',
    pref: '群馬県',
    capital: '前橋市',
    readingPref: 'ぐんまけん',
    readingCap: 'まえばしし',
    region: 'kanto',
    regionLabel: '関東',
    tip: '群馬県の県庁所在地は「前橋（まえばし）市」！高崎市と並ぶ中心都市で、赤城山の麓に位置します。'
  },
  {
    id: 'saitama',
    pref: '埼玉県',
    capital: 'さいたま市',
    readingPref: 'さいたまけん',
    readingCap: 'さいたまし',
    region: 'kanto',
    regionLabel: '関東',
    tip: '埼玉県の県庁所在地はひらがな表記の「さいたま市」！浦和や大宮などが合併して誕生しました。'
  },
  {
    id: 'tokyo',
    pref: '東京都',
    capital: '新宿区',
    readingPref: 'とうきょうと',
    readingCap: 'しんじゅくく',
    region: 'kanto',
    regionLabel: '関東',
    symbol: '🏙️',
    tip: '東京都の都庁所在地は「新宿（しんじゅく）区」！超高層ビル街の中に東京都庁本庁舎がそびえ立ちます。'
  },
  {
    id: 'kanagawa',
    pref: '神奈川県',
    capital: '横浜市',
    readingPref: 'かながわけん',
    readingCap: 'よこはまし',
    region: 'kanto',
    regionLabel: '関東',
    symbol: '⚓',
    tip: '神奈川県の県庁所在地は「横浜（よこはま）市」！みなとみらいや横浜中華街が人気の開港都市。'
  },
  {
    id: 'ishikawa',
    pref: '石川県',
    capital: '金沢市',
    readingPref: 'いしかわけん',
    readingCap: 'かなざわし',
    region: 'chubu',
    regionLabel: '中部',
    symbol: '🏯',
    tip: '石川県の県庁所在地は「金沢（かなざわ）市」！兼六園やひがし茶屋街など加賀百万石の歴史が息づく城下町。'
  },
  {
    id: 'yamanashi',
    pref: '山梨県',
    capital: '甲府市',
    readingPref: 'やまなしけん',
    readingCap: 'こうふし',
    region: 'chubu',
    regionLabel: '中部',
    symbol: '🍇',
    tip: '山梨県の県庁所在地は「甲府（こうふ）市」！武田信玄公のホームグラウンドで、ほうとうや葡萄の名産地。'
  },
  {
    id: 'aichi',
    pref: '愛知県',
    capital: '名古屋市',
    readingPref: 'あいちけん',
    readingCap: 'なごやし',
    region: 'chubu',
    regionLabel: '中部',
    symbol: '🏰',
    tip: '愛知県の県庁所在地は「名古屋（なごや）市」！金のシャチホコの名古屋城、ひつまぶしや味噌カツが有名。'
  },
  {
    id: 'mie',
    pref: '三重県',
    capital: '津市',
    readingPref: 'みえけん',
    readingCap: 'つし',
    region: 'kansai',
    regionLabel: '関西',
    tip: '三重県の県庁所在地は「津（つ）市」！日本一名前が短い（漢字1文字・ひらがな1文字）県庁所在地。'
  },
  {
    id: 'shiga',
    pref: '滋賀県',
    capital: '大津市',
    readingPref: 'しがけん',
    readingCap: 'おおつし',
    region: 'kansai',
    regionLabel: '関西',
    symbol: '⛵',
    tip: '滋賀県の県庁所在地は「大津（おおつ）市」！日本最大の湖・琵琶湖（びわこ）の南端に広がります。'
  },
  {
    id: 'hyogo',
    pref: '兵庫県',
    capital: '神戸市',
    readingPref: 'ひょうごけん',
    readingCap: 'こうべし',
    region: 'kansai',
    regionLabel: '関西',
    symbol: '🚢',
    tip: '兵庫県の県庁所在地は「神戸（こうべ）市」！港町の異国情緒と六甲山からの美しい夜景が魅力。'
  },
  {
    id: 'shimane',
    pref: '島根県',
    capital: '松江市',
    readingPref: 'しまねけん',
    readingCap: 'まつえし',
    region: 'chugoku_shikoku',
    regionLabel: '中国・四国',
    symbol: '🌅',
    tip: '島根県の県庁所在地は「松江（まつえ）市」！宍道湖（しんじこ）の夕日と國宝・松江城が美しい水の都。'
  },
  {
    id: 'kagawa',
    pref: '香川県',
    capital: '高松市',
    readingPref: 'かがわけん',
    readingCap: 'たかまつし',
    region: 'chugoku_shikoku',
    regionLabel: '中国・四国',
    symbol: '🍜',
    tip: '香川県の県庁所在地は「高松（たかまつ）市」！「讃岐うどん」で有名で、名勝・栗林公園があります。'
  },
  {
    id: 'ehime',
    pref: '愛媛県',
    capital: '松山市',
    readingPref: 'えひめけん',
    readingCap: 'まつやまし',
    region: 'chugoku_shikoku',
    regionLabel: '中国・四国',
    symbol: '🍊',
    tip: '愛媛県の県庁所在地は「松山（まつやま）市」！日本最古の温泉・道後温泉や松山城で親しまれています。'
  },
  {
    id: 'okinawa',
    pref: '沖縄県',
    capital: '那覇市',
    readingPref: 'おきなわけん',
    readingCap: 'なはし',
    region: 'kyushu_okinawa',
    regionLabel: '九州・沖縄',
    symbol: '🌺',
    tip: '沖縄県の県庁所在地は「那覇（なは）市」！首里城跡や活気あふれる国際通りがある南国の中心地。'
  }
];
