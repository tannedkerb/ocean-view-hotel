/* =========================================================
   OCEAN VIEW HOTEL — ДАННЫЕ САЙТА (легко редактировать)
   ---------------------------------------------------------
   Цены в долларах США (USD). Рядом сайт сам показывает сумму в манатах
   по курсу AZN_RATE. Цены номеров взяты из презентации, остальные
   ориентированы на реальные цены премиальных отелей Баку
   и подводных ресторанов Мальдив (см. README.txt).
   ========================================================= */

const SITE = {
  AZN_RATE: 1.7,
  phone: "+994 12 000 00 00",
  whatsapp: "994500000000",
  email: "hello@oceanview.az",
  address: { az: "Xəzər dənizi sahili, Abşeron, Azərbaycan", ru: "Побережье Каспийского моря, Абшерон, Азербайджан", en: "Caspian Sea coast, Absheron, Azerbaijan" },
  mapQuery: "Absheron Peninsula, Azerbaijan",
  socials: { instagram: "#", tiktok: "#", facebook: "#", youtube: "#" }
};

/* ---------------- НОМЕРА (из презентации) ---------------- */
const ROOMS = [
  {
    id: "standard", price: 350, size: 30, count: 20, guests: 2, img: "img/pool.jpg", level: "above",
    name: { az: "Standard Sea View", ru: "Standard Sea View", en: "Standard Sea View" },
    desc: {
      az: "Su üstündə, Xəzərə panoram mənzərəli balkon. Səhər günəşi birbaşa yatağınıza düşür.",
      ru: "Над водой, балкон с панорамным видом на Каспий. Утреннее солнце прямо в спальне.",
      en: "Above the water, with a panoramic balcony over the Caspian. Morning sun right in your bedroom."
    },
    amen: ["view", "breakfast", "wifi", "pool"]
  },
  {
    id: "premium", price: 650, size: 45, count: 12, guests: 2, img: "img/room-underwater.jpg", level: "below",
    name: { az: "Premium Underwater", ru: "Premium Underwater", en: "Premium Underwater" },
    desc: {
      az: "Su altında, yataqdan dənizin içinə açılan nəhəng akril pəncərə. Balıqlar sizin qonşunuzdur.",
      ru: "Под водой, огромное акриловое окно в море прямо у кровати. Рыбы — ваши соседи.",
      en: "Underwater, with a huge acrylic window into the sea next to the bed. The fish are your neighbours."
    },
    amen: ["underwater", "breakfast", "wifi", "minibar"]
  },
  {
    id: "romantic", price: 900, size: 55, count: 6, guests: 2, img: "img/suite-underwater.jpg", level: "below",
    name: { az: "Romantic Ocean Suite", ru: "Romantic Ocean Suite", en: "Romantic Ocean Suite" },
    desc: {
      az: "Cütlüklər üçün süita: şüşə günbəz altında yataq otağı, qonaq otağı və şampan qarşılanması.",
      ru: "Сьют для пар: спальня под стеклянным куполом, гостиная и встреча с шампанским.",
      en: "A suite for couples: a bedroom under a glass dome, a living room and a champagne welcome."
    },
    amen: ["underwater", "breakfast", "wifi", "minibar", "champagne", "butler"]
  },
  {
    id: "villa", price: 2000, size: 100, count: 2, guests: 4, img: "img/villa-spa.jpg", level: "both",
    name: { az: "Presidential Ocean Villa", ru: "Presidential Ocean Villa", en: "Presidential Ocean Villa" },
    desc: {
      az: "İki mərtəbəli villa: yuxarıda terras və şəxsi cakuzi, aşağıda su altı yataq otağı. Şəxsi butler və transfer daxildir.",
      ru: "Двухуровневая вилла: наверху терраса и личное джакузи, внизу подводная спальня. Личный батлер и трансфер включены.",
      en: "A two-level villa with a terrace and private jacuzzi upstairs and an underwater bedroom below. Personal butler and transfer included."
    },
    amen: ["underwater", "view", "breakfast", "jacuzzi", "butler", "transfer", "minibar"]
  }
];

const AMENITIES = {
  view:       { icon: "🌅", az: "Dəniz mənzərəsi", ru: "Вид на море", en: "Sea view" },
  underwater: { icon: "🐠", az: "Su altı pəncərə", ru: "Подводное окно", en: "Underwater window" },
  breakfast:  { icon: "🥐", az: "Səhər yeməyi", ru: "Завтрак", en: "Breakfast" },
  wifi:       { icon: "📶", az: "Wi-Fi", ru: "Wi-Fi", en: "Wi-Fi" },
  pool:       { icon: "🏊", az: "Hovuz", ru: "Бассейн", en: "Pool" },
  minibar:    { icon: "🍷", az: "Mini-bar", ru: "Мини-бар", en: "Minibar" },
  champagne:  { icon: "🥂", az: "Şampan", ru: "Шампанское", en: "Champagne" },
  jacuzzi:    { icon: "🛁", az: "Cakuzi", ru: "Джакузи", en: "Jacuzzi" },
  butler:     { icon: "🎩", az: "Butler", ru: "Батлер", en: "Butler" },
  transfer:   { icon: "🚘", az: "Transfer", ru: "Трансфер", en: "Transfer" }
};

/* ---------------- ВЫБОР ПРИ БРОНИРОВАНИИ (доп. услуги) ---------------- */
const EXTRAS = [
  { id: "transfer", price: 45,  name: { az: "Hava limanından transfer (sedan)", ru: "Трансфер из аэропорта (седан)", en: "Airport transfer (sedan)" } },
  { id: "dinner",   price: 360, name: { az: "Su altı restoranda şam yeməyi (2 nəfər)", ru: "Ужин в подводном ресторане (на двоих)", en: "Underwater dinner for two" } },
  { id: "dive",     price: 150, name: { az: "Təlimatçı ilə ilk dalış", ru: "Первое погружение с инструктором", en: "Discovery dive with an instructor" } },
  { id: "spa",      price: 220, name: { az: "Cütlük üçün SPA (60 dəq)", ru: "СПА для пары (60 мин)", en: "Couples' spa (60 min)" } }
];

/* ---------------- РЕСТОРАНЫ ---------------- */
const RESTAURANTS = [
  {
    img: "img/restaurant-tunnel.jpg",
    name: { az: "Deep Blue — su altı restoranı", ru: "Deep Blue — подводный ресторан", en: "Deep Blue — underwater restaurant" },
    desc: {
      az: "Dəniz səviyyəsindən 8 metr aşağıda, cəmi 24 yer. Xəzər dəniz məhsulları ilə 6 kursluq dequstasiya menyusu.",
      ru: "8 метров ниже уровня моря, всего 24 места. Дегустационный сет из 6 блюд с каспийскими морепродуктами.",
      en: "Eight metres below sea level, with only 24 seats. A six-course tasting menu of Caspian seafood."
    },
    menu: [
      { price: 110, name: { az: "Nahar seti (4 kurs)", ru: "Обеденный сет (4 блюда)", en: "Lunch set (4 courses)" } },
      { price: 180, name: { az: "Şam yeməyi dequstasiyası (6 kurs)", ru: "Ужин-дегустация (6 блюд)", en: "Tasting dinner (6 courses)" } },
      { price: 95,  name: { az: "Şərab müşayiəti", ru: "Винное сопровождение", en: "Wine pairing" } }
    ]
  },
  {
    img: "img/restaurant-hall.jpg",
    name: { az: "Horizon — terras restoranı", ru: "Horizon — ресторан на террасе", en: "Horizon — terrace restaurant" },
    desc: {
      az: "Su üstündə, gün batımı mənzərəli. Azərbaycan və Aralıq dənizi mətbəxi, səhər yeməyi bufeti.",
      ru: "Над водой, с видом на закат. Азербайджанская и средиземноморская кухня, завтрак-буфет.",
      en: "Above the water, with sunset views. Azerbaijani and Mediterranean cuisine and a breakfast buffet."
    },
    menu: [
      { price: 28, name: { az: "Xəzər balığı kababı", ru: "Кебаб из каспийской рыбы", en: "Caspian fish kebab" } },
      { price: 42, name: { az: "Nərə balığı, narşərab sousu", ru: "Осетрина с наршарабом", en: "Sturgeon with narsharab" } },
      { price: 24, name: { az: "Şah plov", ru: "Шах-плов", en: "Shah plov" } },
      { price: 12, name: { az: "Paxlava və çay dəsti", ru: "Пахлава и чайный набор", en: "Pakhlava and tea set" } }
    ]
  }
];

/* ---------------- УСЛУГИ И ВПЕЧАТЛЕНИЯ ---------------- */
const EXPERIENCES = [
  { icon: "🤿", img: "img/diving.jpg", price: 150, unit: { az: "nəfər", ru: "чел.", en: "person" },
    name: { az: "Təlimatçı ilə dalış", ru: "Дайвинг с инструктором", en: "Diving with an instructor" },
    desc: { az: "Hovuzda təlim və dənizdə 40 dəqiqəlik dalış. Təcrübə tələb olunmur.", ru: "Обучение в бассейне и 40 минут в море. Опыт не нужен.", en: "Training in the pool and 40 minutes in the sea. No experience needed." } },
  { icon: "🛥️", img: "img/caspian.jpg", price: 90, unit: { az: "nəfər", ru: "чел.", en: "person" },
    name: { az: "Dəniz ekskursiyası", ru: "Морская прогулка", en: "Sea excursion" },
    desc: { az: "Abşeron sahili boyu 2 saatlıq yaxta gəzintisi.", ru: "2 часа на яхте вдоль Абшеронского побережья.", en: "Two hours by yacht along the Absheron coast." } },
  { icon: "🧖", img: "img/villa-spa.jpg", price: 110, unit: { az: "60 dəq", ru: "60 мин", en: "60 min" },
    name: { az: "SPA və hamam", ru: "СПА и хаммам", en: "Spa and hammam" },
    desc: { az: "Masaj, şərq hamamı, hovuz və fitnes zalı. Hamam ritualı: 250 $.", ru: "Массаж, восточный хаммам, бассейн и фитнес-зал. Ритуал хаммама: $250.", en: "Massage, an Eastern hammam, a pool and a gym. Hammam ritual: $250." } },
  { icon: "💍", img: "img/terrace-wedding.jpg", price: 120, unit: { az: "qonaq", ru: "гость", en: "guest" },
    name: { az: "Toylar və tədbirlər", ru: "Свадьбы и события", en: "Weddings and events" },
    desc: { az: "Dəniz üzərində terras 150 qonağadək. Konfrans zalı: gündə 1 500 $.", ru: "Терраса над морем до 150 гостей. Конференц-зал: $1 500 в день.", en: "A terrace over the sea for up to 150 guests. Conference hall: $1,500 per day." } },
  { icon: "🚘", img: "img/lobby.jpg", price: 45, unit: { az: "yol", ru: "поездка", en: "ride" },
    name: { az: "Transfer", ru: "Трансфер", en: "Transfer" },
    desc: { az: "Bakı hava limanından sedan. Biznes klass (Mercedes S): 120 $.", ru: "Седан из аэропорта Баку. Бизнес-класс (Mercedes S): $120.", en: "A sedan from Baku airport. Business class (Mercedes S): $120." } },
  { icon: "🗺️", img: "img/caspian.jpg", price: 120, unit: { az: "nəfər", ru: "чел.", en: "person" },
    name: { az: "Azərbaycan turları", ru: "Туры по Азербайджану", en: "Tours of Azerbaijan" },
    desc: { az: "İçərişəhər və Bakı: 120 $, Qobustan və palçıq vulkanları: 160 $.", ru: "Ичеришехер и Баку: $120, Гобустан и грязевые вулканы: $160.", en: "Icherisheher and Baku: $120. Gobustan and the mud volcanoes: $160." } }
];

/* ---------------- ПАКЕТЫ ---------------- */
const PACKAGES = [
  // value — сколько стоило бы всё по отдельности (для подписи «экономия»)
  { id: "romantic", room: "romantic", nights: 2, price: 2350, value: 2580, featured: true,
    name: { az: "Romantic Ocean", ru: "Romantic Ocean", en: "Romantic Ocean" },
    items: {
      az: ["Romantic Ocean Suite-də 2 gecə", "Su altında şam yeməyi (2 nəfər)", "Cütlük üçün SPA", "Gül və şampan ilə qarşılanma"],
      ru: ["2 ночи в Romantic Ocean Suite", "Подводный ужин на двоих", "СПА для пары", "Встреча с цветами и шампанским"],
      en: ["2 nights in the Romantic Ocean Suite", "Underwater dinner for two", "Couples' spa", "Welcome flowers and champagne"]
    } },
  { id: "explorer", room: "premium", nights: 3, price: 2250, value: 2475,
    name: { az: "Deep Blue Explorer", ru: "Deep Blue Explorer", en: "Deep Blue Explorer" },
    items: {
      az: ["Premium Underwater-də 3 gecə", "Təlimatçı ilə 2 dalış", "Yaxta ilə dəniz gəzintisi", "Hava limanından transfer"],
      ru: ["3 ночи в Premium Underwater", "2 погружения с инструктором", "Морская прогулка на яхте", "Трансфер из аэропорта"],
      en: ["3 nights in Premium Underwater", "2 dives with an instructor", "Yacht trip", "Airport transfer"]
    } },
  { id: "discovery", room: "standard", nights: 5, price: 2190, value: 2530,
    name: { az: "Azerbaijan Discovery", ru: "Azerbaijan Discovery", en: "Azerbaijan Discovery" },
    items: {
      az: ["Standard Sea View-da 5 gecə", "Bakı və İçərişəhər turu", "Qobustan və palçıq vulkanları", "Su altı restoranda nahar"],
      ru: ["5 ночей в Standard Sea View", "Тур по Баку и Ичеришехеру", "Гобустан и грязевые вулканы", "Обед в подводном ресторане"],
      en: ["5 nights in Standard Sea View", "Baku and Icherisheher tour", "Gobustan and the mud volcanoes", "Lunch in the underwater restaurant"]
    } }
];

/* ---------------- ОТЗЫВЫ ---------------- */
const REVIEWS = [
  { name: "Sophie & Marc", from: { az: "Fransa", ru: "Франция", en: "France" }, stars: 5,
    text: { az: "Bal ayımızı su altında keçirdik. Səhər oyanıb pəncərədən balıqları görmək — sözlə ifadə etmək mümkün deyil.",
            ru: "Провели медовый месяц под водой. Просыпаться и видеть рыб за окном — словами не передать.",
            en: "We spent our honeymoon underwater. Waking up to fish outside the window is beyond words." } },
  { name: "Nigar H.", from: { az: "Bakı", ru: "Баку", en: "Baku" }, stars: 5,
    text: { az: "Deep Blue-da şam yeməyi həyatımın ən gözəl axşamı idi. Xəzəri belə görməmişdim.",
            ru: "Ужин в Deep Blue — лучший вечер в моей жизни. Я никогда не видела Каспий таким.",
            en: "Dinner at Deep Blue was the best evening of my life. I had never seen the Caspian like this." } },
  { name: "Daniel R.", from: { az: "Böyük Britaniya", ru: "Великобритания", en: "United Kingdom" }, stars: 5,
    text: { az: "İlk dəfə dalış etdim, təlimatçılar əla idi. Sonra Qobustan turu — mükəmməl kombinasiya.",
            ru: "Нырял впервые, инструкторы отличные. Потом тур в Гобустан — идеальное сочетание.",
            en: "My first dive, and the instructors were great. Then the Gobustan tour: a perfect combination." } },
  { name: "Алексей П.", from: { az: "Moskva", ru: "Москва", en: "Moscow" }, stars: 4,
    text: { az: "Möhtəşəm konsepsiya və servis. Qiymətlər yüksəkdir, amma təcrübə buna dəyər.",
            ru: "Потрясающая концепция и сервис. Цены высокие, но впечатления того стоят.",
            en: "An amazing concept and great service. The prices are high, but the experience is worth it." } }
];

/* ---------------- FAQ ---------------- */
const FAQ = [
  { q: { az: "Su altında qalmaq təhlükəsizdirmi?", ru: "Безопасно ли жить под водой?", en: "Is it safe to stay underwater?" },
    a: { az: "Bəli. Akril panellərin hermetikliyi daim yoxlanılır, ehtiyat enerji və ventilyasiya sistemləri, həmçinin təxliyə yolları var.",
         ru: "Да. Герметичность акриловых панелей постоянно контролируется, есть резервное питание, вентиляция и эвакуационные выходы.",
         en: "Yes. The acrylic panels are constantly checked for leaks, and there are backup power, ventilation and evacuation routes." } },
  { q: { az: "Qiymətə nə daxildir?", ru: "Что входит в стоимость?", en: "What is included in the price?" },
    a: { az: "Səhər yeməyi, Wi-Fi, hovuz və fitnes zalı. Villada butler və transfer də daxildir.",
         ru: "Завтрак, Wi-Fi, бассейн и фитнес-зал. На вилле также батлер и трансфер.",
         en: "Breakfast, Wi-Fi, the pool and the gym. The villa also includes a butler and transfer." } },
  { q: { az: "Qiymətlər hansı valyutadadır?", ru: "В какой валюте цены?", en: "What currency are the prices in?" },
    a: { az: "ABŞ dolları ilə. Yanında təxmini manat qarşılığı göstərilir. Ödəniş AZN, USD və ya EUR ilə mümkündür.",
         ru: "В долларах США, рядом показан примерный эквивалент в манатах. Оплатить можно в AZN, USD или EUR.",
         en: "In US dollars, with an approximate manat equivalent alongside. You can pay in AZN, USD or EUR." } },
  { q: { az: "Uşaqlarla gəlmək olarmı?", ru: "Можно ли с детьми?", en: "Can I bring children?" },
    a: { az: "Bəli, Standard və Villa nömrələrində. Deep Blue restoranı axşamlar yalnız 16 yaşdan yuxarı qonaqlar üçündür.",
         ru: "Да, в номерах Standard и на вилле. Ресторан Deep Blue вечером только для гостей старше 16 лет.",
         en: "Yes, in the Standard rooms and the villa. Deep Blue is for guests aged 16+ in the evening." } },
  { q: { az: "Dalış üçün sertifikat lazımdırmı?", ru: "Нужен ли сертификат для дайвинга?", en: "Do I need a certificate to dive?" },
    a: { az: "Xeyr, ilk dalış təlimatçı ilə keçirilir. Sahil mühafizəsindən icazəni biz özümüz alırıq.",
         ru: "Нет, первое погружение проходит с инструктором. Разрешение береговой охраны мы оформляем сами.",
         en: "No. Your first dive is with an instructor, and we arrange the coast guard permit for you." } },
  { q: { az: "Ekologiyanı necə qoruyursunuz?", ru: "Как вы заботитесь об экологии?", en: "How do you protect the environment?" },
    a: { az: "Çirkab suları təmizlənir, dəniz ekosistemi daimi monitorinq olunur, davamlı materiallar istifadə edilir.",
         ru: "Сточные воды очищаются, морская экосистема постоянно мониторится, используются устойчивые материалы.",
         en: "Wastewater is treated, the marine ecosystem is monitored continuously, and we build with sustainable materials." } }
];
