export interface ProjectDetail {
  slug: string;
  title: string;
  englishTitle: string;
  category: string;
  year: string;
  client: string;
  role: string;
  techStack: string[];
  summary: string;
  description: string;
  highlights: string[];
  liveUrl?: string;
  heroMockup: string;
  screenshots: Array<{
    src: string;
    alt: string;
    isFullTall?: boolean;
  }>;
}

export const PROJECT_DETAILS_DATA: Record<string, ProjectDetail> = {
  "tryotel-cross-platform-travel-app": {
    slug: "tryotel-cross-platform-travel-app",
    title: "ترایوتل – اپلیکیشن سفر چندسکویی",
    englishTitle: "Tryotel – Cross-Platform Travel App",
    category: "اپلیکیشن موبایل",
    year: "۲۰۲۱",
    client: "شرکت بین‌المللی Saimon Global",
    role: "توسعه‌دهنده ارشد موبایل (Lead Mobile Developer)",
    techStack: ["Flutter", "Dart", "Clean Architecture", "BLoC Pattern", "REST APIs", "iOS & Android"],
    summary: "اپلیکیشن جامع خدمات گردشگری و رزرواسیون پرواز و هتل با معماری تمیز و بالاترین سرعت پردازش در میان سامانه‌های OTA منطقه.",
    description:
      "پروژه اپلیکیشن ترایوتل (Tryotel) با هدف ارائه تجربه‌ای یکپارچه، سریع و بدون وقفه در خرید بلیط هواپیما و رزرو هتل‌های داخلی و بین‌المللی برای شرکت Saimon Global پیاده‌سازی شد. در توسعه این اپلیکیشن با استفاده از فریم‌ورک فلاتر (Flutter) و زبان دارت، از الگوی معماری Clean Architecture و مدیریت وضعیت BLoC بهره گرفته شد تا بیشترین میزان پایداری، تفکیک وظایف و قابلیت توسعه‌پذیری برای پلتفرم‌های اندروید و iOS حاصل شود. این سیستم سریع‌ترین زمان دریافت و پردازش فید پروازها را در میان پلتفرم‌های محلی به ثبت رسانده است.",
    highlights: [
      "پیاده‌سازی معماری تمیز (Clean Architecture) با تفکیک دقیق لایه‌های Data ،Domain و Presentation",
      "موتور جستجو و فیلتر پیشرفته پروازها با پاسخ‌دهی میلی‌ثانیه‌ای و مصرف حداقل ترافیک اینترنت",
      "طراحی رابط کاربری مدرن، ارگونومیک و کاملاً ریسپانسیو برای هر دو سیستم‌عامل Android و iOS",
      "یکپارچه‌سازی با درگاه‌های پرداخت بین‌المللی و سیستم‌های صدور آنی بلیط (E-Ticket)",
    ],
    liveUrl: "https://tryo.tel/app",
    heroMockup: "/wp-content/uploads/2021/07/tryotel_ios_mockup-1920x1200.jpg",
    screenshots: [
      {
        src: "/wp-content/uploads/2021/10/tryotel-app-full.jpg",
        alt: "نمای کامل و پیوسته رابط کاربری و صفحات اپلیکیشن ترایوتل",
        isFullTall: true,
      },
    ],
  },
  "tryotel-web-b2c": {
    slug: "tryotel-web-b2c",
    title: "ترایوتل وب – سامانه آنلاین گردشگری B2C",
    englishTitle: "Tryotel Web (B2C)",
    category: "توسعه وب",
    year: "۲۰۲۱",
    client: "شرکت Saimon Global",
    role: "مهندس فرانت‌اند (Front-End Engineer)",
    techStack: ["React", "Next.js", "TypeScript", "Redux Toolkit", "Styled Components", "PWA"],
    summary: "پلتفرم وب B2C پیشرفته برای جستجو، مقایسه قیمت و صدور آنی بلیط پرواز و رزرواسیون اقامتگاه با سریع‌ترین فید دریافت داده.",
    description:
      "نسخه تحت وب B2C ترایوتل به عنوان یکی از پیشروترین پلتفرم‌های رزرواسیون آنلاین سفر در منطقه راه‌اندازی شد تا تجربه خرید بلیط و رزرو هتل را برای میلیون‌ها کاربر آنلاین ساده، امن و سریع کند. این وب‌اپلیکیشن مقیاس‌پذیر، ضمن اتصال به سیستم‌های توزیع جهانی (GDS)، نرخ‌ها و برنامه‌های پروازی ایرلاین‌های متعدد را به صورت ریل‌تایم پردازش نموده و با رابط کاربری روان و بهینه‌سازی فنی دقیق، بالاترین نرخ تبدیل را رقم می‌زند.",
    highlights: [
      "سریع‌ترین زمان بارگذاری نتایج جستجوی پرواز در میان رقبای آنلاین بازار",
      "جریان رزرو و پرداخت آنلاین ۳ مرحله‌ای بدون نیاز به بارگذاری مجدد صفحه (Single Page Application)",
      "بهینه‌سازی کامل شاخص‌های عملکردی وب (Core Web Vitals) و دسترسی‌پذیری بالا",
    ],
    liveUrl: "https://dev.tryotel.com",
    heroMockup: "/wp-content/uploads/2021/11/tryotel-web-journey.jpg",
    screenshots: [
      {
        src: "/wp-content/uploads/2021/11/tryotel-web-journey.jpg",
        alt: "مسیر کامل رابط کاربری وب‌سایت ترایوتل B2C",
        isFullTall: true,
      },
    ],
  },
  "flight-local": {
    slug: "flight-local",
    title: "فلایت لوکال – پلتفرم سازمانی گردشگری B2B",
    englishTitle: "Flight Local (B2B Travel Solution)",
    category: "توسعه وب",
    year: "۲۰۲۱",
    client: "مجموعه Flight Local / Saimon Global",
    role: "معمار و توسعه‌دهنده فرانت‌اند",
    techStack: ["React", "Material-UI", "GraphQL", "Apollo Client", "Recharts", "TypeScript"],
    summary: "سامانه اتوماسیون سازمانی B2B برای آژانس‌های مسافرتی، صدور گروهی بلیط، مدیریت ویزا و تراکنش‌های مالی.",
    description:
      "پروژه Flight Local یک سامانه جامع سازمانی (B2B) برای آژانس‌های گردشگری و همکاران تجاری است که مدیریت سفارش‌ها، اخذ ویزا، رزروهای گروهی و صدور فاکتورهای شرکتی را در یک داشبورد متمرکز ممکن می‌سازد. رابط کاربری سامانه با معماری مبتنی بر GraphQL و کامپوننت‌های بهینه‌سازی‌شده React پیاده‌سازی شده تا کارشناسان آژانس‌ها بتوانند حجم وسیعی از داده‌ها و تراکنش‌های روزانه را با نهایت سرعت مدیریت نمایند.",
    highlights: [
      "معماری داده مبتنی بر GraphQL و Apollo Client برای کوئری‌های بهینه و کاهش ترافیک شبکه",
      "داشبورد حسابداری شرکتی، ردیابی کمیسیون‌ها و گزارش‌گیری چندبُعدی با Recharts",
      "پنل رزرو و ثبت گروهی مسافران همراه با اعتبارسنجی خودکار گذرنامه و ویزا",
    ],
    liveUrl: "https://flightlocal.com",
    heroMockup: "/wp-content/uploads/2021/11/2021-11-09_183502.jpg",
    screenshots: [
      {
        src: "/wp-content/uploads/2021/11/booking-panel.jpg",
        alt: "پنل مدیریت و فید رزرواسیون پرواز",
        isFullTall: false,
      },
      {
        src: "/wp-content/uploads/2021/11/booking-feed.jpg",
        alt: "جستجوی پیشرفته و نمایش نرخ‌های آژانس",
        isFullTall: false,
      },
      {
        src: "/wp-content/uploads/2021/11/booking-list.jpg",
        alt: "جدول گزارشات و سوابق مسافران",
        isFullTall: false,
      },
    ],
  },
  "khora-urban-thinkers": {
    slug: "khora-urban-thinkers",
    title: "خورا – وب‌سایت اندیشکده مشاوره شهری",
    englishTitle: "Khora – Urban Thinkers Consulting Firm",
    category: "توسعه وب",
    year: "۲۰۲۱",
    client: "موسسه Khora Urban Thinkers (اسپانیا)",
    role: "توسعه‌دهنده فرانت‌اند و انیمیشن",
    techStack: ["HTML5", "Modern CSS", "JavaScript", "Scroll-Driven Animations", "Responsive"],
    summary: "وب‌سایت مفهومی و مینیمال برای اندیشکده بین‌المللی توسعه پایدار و راهکارهای نوین شهری در اروپا.",
    description:
      "اندیشکده Khora Urban Thinkers با تلفیق خلاقیت، تفکر استراتژیک و نوآوری به حل چالش‌های پیچیده شهرهای مدرن می‌پردازد. این وب‌سایت با طراحی بصری چشم‌نواز، تایپوگرافی جسورانه و انیمیشن‌های مینیمال پیاده‌سازی شد تا بازتاب‌دهنده هویت حرفه‌ای، بین‌رشته‌ای و مردم‌محور این گروه مشاوره پایدار در اروپا باشد.",
    highlights: [
      "طراحی تایپوگرافی ویژه و گریدبندی مینیمال هماهنگ با هویت بصری اروپایی برند",
      "انیمیشن‌های نرم مبتنی بر اسکرول بدون افت فریم در دسکتاپ و موبایل",
      "ساختار کدنویسی بهینه و کم‌حجم برای بارگذاری آنی در سرعت‌های مختلف اینترنت",
    ],
    liveUrl: "https://khoraurbanthinkers.es/en/home-en/",
    heroMockup: "/wp-content/uploads/2021/10/khora-urban-thinkers-poster-r.jpg",
    screenshots: [
      {
        src: "/wp-content/uploads/2021/10/khora-website-screenshot-ui-1435x9999.jpg",
        alt: "عکس بسیار بلند از کل صفحه وب‌سایت خورا با حداکثر کیفیت",
        isFullTall: true,
      },
    ],
  },
  "walkerip": {
    slug: "walkerip",
    title: "واکر آی‌پی – وب‌سایت شرکت حقوقی بین‌المللی",
    englishTitle: "Walker IP Pty Ltd",
    category: "توسعه وب",
    year: "۲۰۲۱",
    client: "موسسه حقوقی Walker IP (استرالیا) / Neon Collective",
    role: "توسعه‌دهنده فرانت‌اند وب",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Responsive UI", "SEO Optimization"],
    summary: "پرتال حقوقی با هویت مدرن، تمرکز بر خدمات مالکیت معنوی، ثبت اختراعات و پرونده‌های تکنولوژی بین‌المللی.",
    description:
      "شرکت واکر آی‌پی یک مجموعه حقوقی نوآور و پیشگام در حوزه مالکیت فکری (IP) و ثبت اختراع است. هدف از این پروژه، پیاده‌سازی یک وب‌سایت شیک، معتبر و متمایز از قالب‌های کلیشه‌ای موسسات حقوقی سنتی بود که ارزش‌ها، تجربیات و تیم متخصص آن را به بهترین شکل به متقاضیان بین‌المللی معرفی کند.",
    highlights: [
      "استایل بصری لوکس با تم تاریک و المان‌های تایپوگرافی برجسته",
      "صفحات اختصاصی معرفی تیم وکلا، حوزه‌های تخصصی و فرم مشاوره هوشمند",
      "امتیاز کامل عملکرد در ابزارهای تست سئو و پرفورمنس",
    ],
    liveUrl: "https://www.walkerip.com/",
    heroMockup: "/wp-content/uploads/2021/10/walkerip-com-poster.jpg",
    screenshots: [
      {
        src: "/wp-content/uploads/2021/10/walkerip.com-web-ui.jpg",
        alt: "صفحه اصلی و بخش معرفی خدمات واکر آی‌پی",
        isFullTall: true,
      },
      {
        src: "/wp-content/uploads/2021/10/walkerip.com-web-contact.jpg",
        alt: "فرم ارتباط و درخواست مشاوره حقوقی",
        isFullTall: false,
      },
      {
        src: "/wp-content/uploads/2021/11/walkerip.com-web-team.jpg",
        alt: "معرفی همکاران و وکلای ارشد موسسه",
        isFullTall: false,
      },
      {
        src: "/wp-content/uploads/2021/10/walkerip.com-web-experience.jpg",
        alt: "بخش تجربیات و پرونده‌های موفق",
        isFullTall: false,
      },
    ],
  },
  "ai-lab-granada": {
    slug: "ai-lab-granada",
    title: "آزمایشگاه هوش مصنوعی گرانادا",
    englishTitle: "AI Lab Granada",
    category: "توسعه وب",
    year: "۲۰۲۱",
    client: "مرکز تحقیقات AI Lab Granada (اسپانیا)",
    role: "توسعه‌دهنده فرانت‌اند",
    techStack: ["React", "TypeScript", "Modern CSS", "Interactive Components"],
    summary: "پرتال مرکز نوآوری و پژوهش‌های پیشرفته هوش مصنوعی اروپا در حوزه‌های سلامت، پایداری و اقتصاد هوشمند.",
    description:
      "آزمایشگاه هوش مصنوعی گرانادا کانونی است که نخبگان پژوهشی و فناوری‌های پیشرفته محاسباتی را گرد هم می‌آورد تا راهکارهای هوش مصنوعی پایداری را در حوزه‌های سلامت، اقتصاد چرخشی، آموزش هوشمند و تحول صنایع ارائه دهد. این وب‌سایت با رویکردی آینده‌نگرانه، فضای معرفی پروژه‌ها، برنامه‌های شتاب‌دهی و انتقال دانش AI را به شکل تعاملی و پرانرژی به نمایش می‌گذارد.",
    highlights: [
      "طراحی آینده‌نگرانه متناسب با استانداردهای مراکز پژوهش و هوش مصنوعی بین‌المللی",
      "معماری مدولار برای افزودن سریع مقالات علمی و دستاوردهای مدل‌های زبانی و بینایی ماشین",
      "تصویر بسیار بلند از کل ساختار صفحه با جزئیات کامل",
    ],
    liveUrl: "",
    heroMockup: "/wp-content/uploads/2021/11/ailabgranada-home-full.jpg",
    screenshots: [
      {
        src: "/wp-content/uploads/2021/11/ailabgranada-home-full.jpg",
        alt: "عکس بسیار بلند از کل صفحه وب‌سایت آزمایشگاه هوش مصنوعی گرانادا",
        isFullTall: true,
      },
    ],
  },
  "all-the-roads-of-chittagong": {
    slug: "all-the-roads-of-chittagong",
    title: "تمامی جاده‌های چیتاگونگ – بصری‌سازی کلان‌داده",
    englishTitle: "All the roads of Chittagong",
    category: "بصری‌سازی داده",
    year: "۲۰۲۱",
    client: "پروژه تحقیقاتی و تجسم داده شخصی",
    role: "متخصص بصری‌سازی داده و سیستم‌های GIS",
    techStack: ["QGIS", "Python", "OpenStreetMap Data", "Data Visualization", "Vector Mapping"],
    summary: "اثر هنری داده‌محور و نقشه‌نگاری محاسباتی از کل شبکه معابر و جاده‌های کلان‌شهر بندری چیتاگونگ.",
    description:
      "این پروژه برگرفته از الهام نقشه‌نگاری جامع شبکه راه‌ها و با تحلیل بیش از ده‌ها هزار عارضه جغرافیایی وکتوری از معابر چیتاگونگ شکل گرفت. با استخراج داده‌های مکانی OpenStreetMap و بیش از ۲۰ ساعت تحلیل و رندرینگ پیشرفته در نرم‌افزار QGIS، یک اثر هنری با رزولوشن فوق‌العاده بالا خلق شد که ظرافت و پیچیدگی ساختار شریان‌های این شهر را نمایان می‌سازد.",
    highlights: [
      "پردازش بیش از ۱۰۰,۰۰۰ سگمنت جاده‌ای و دسته‌بندی بر اساس سلسله‌مراتب شبکه معابر",
      "کیفیت وکتوری و خروجی با وضوح تصویر ۲۷۴۸×۱۹۲۰ پیکسل مناسب برای چاپ و نمایش دیجیتال",
      "ترکیب داده‌های باز جغرافیایی با هنر بصری مونوکروم و تکنیک‌های نقشه‌برداری مدرن",
    ],
    liveUrl: "",
    heroMockup: "/wp-content/uploads/2021/03/all-the-roads-of-chittagong-1920x2748.jpg",
    screenshots: [
      {
        src: "/wp-content/uploads/2021/03/all-the-roads-of-chittagong-1920x2748.jpg",
        alt: "نقشه جامع بصری‌سازی کلیه معابر چیتاگونگ با وضوح بسیار بالا",
        isFullTall: true,
      },
    ],
  },
  "kananaskis-nordic-spa-website": {
    slug: "kananaskis-nordic-spa-website",
    title: "اسپا نوردیک کاناناسکیس – وب‌سایت هتل و آبگرم",
    englishTitle: "Kananaskis Nordic Spa Website",
    category: "توسعه وب",
    year: "۲۰۱۹",
    client: "Kananaskis Spa (کانادا) / Beks Marketing",
    role: "توسعه‌دهنده فرانت‌اند",
    techStack: ["HTML5", "CSS3", "JavaScript", "UI Animations", "Responsive Design"],
    summary: "وب‌سایت آرامش‌بخش برای مرکز آبگرم کوهستانی آلبرتای کانادا با تاکید بر سلامت جسم و روان.",
    description:
      "اسپا نوردیک کاناناسکیس پناهگاهی آرام در دل طبیعت کوهستانی کانادا برای رهایی از دغدغه‌های دنیای مدرن است. این وب‌سایت با تاکید بر القای حس آرامش، زیبایی‌های بصری و روال‌های آب‌درمانی طراحی شد. طراحی تجربه کاربری وب‌سایت به گونه‌ای است که کاربر قبل از ورود فیزیکی به اسپا، آرامش و کیفیت خدمات لوکس آن را لمس کند.",
    highlights: [
      "پالت رنگی طبیعی و آرامش‌بخش همراه با تایپوگرافی ظریف و تصاویر باکیفیت",
      "معرفی پکیج‌های درمانی، آبگرم هیدروتراپی و راهنمای کامل مهمانان",
      "طراحی ریسپانسیو بی‌نقص روی انواع گوشی‌ها و تبلت‌ها",
    ],
    liveUrl: "https://knordicspa.com/",
    heroMockup: "/wp-content/uploads/2021/10/kananaskis-nordic-spa-poster.jpg",
    screenshots: [
      {
        src: "/wp-content/uploads/2021/03/Website-Welcome-2019.jpg",
        alt: "پیش‌نمایش بخش خوش‌آمدگویی اسپا",
        isFullTall: false,
      },
      {
        src: "/wp-content/uploads/2021/03/Partner-Promotions.jpg",
        alt: "بخش پروموشن‌ها و همکاری‌ها",
        isFullTall: false,
      },
      {
        src: "/wp-content/uploads/2021/03/Website-Mockup-2.jpg",
        alt: "ماک‌آپ دسکتاپ وب‌سایت اسپا",
        isFullTall: false,
      },
    ],
  },
  "tapy": {
    slug: "tapy",
    title: "تاپی – کارت ویزیت هوشمند و پلتفرم اتصال دیجیتال",
    englishTitle: "Tapy – Download. Connect. Unlock.",
    category: "توسعه وب",
    year: "۲۰۲۱",
    client: "استارتاپ Tapy.co",
    role: "مهندس فرانت‌اند و طراح رابط کاربری",
    techStack: ["React", "Tailwind CSS", "NFC Integration", "Mobile Web", "Analytics"],
    summary: "پلتفرم معرفی و سفارش برچسب‌ها و کارت‌های هوشمند NFC برای ارتباط فوری تجاری و بازاریابی مدرن.",
    description:
      "سامانه تاپی (Tapy) با ارائه محصولات هوشمند NFC، فاصله میان کسب‌وکارها و مشتریان را به یک لمس کوتاه تبدیل می‌کند. وب‌سایت تاپی با هدف معرفی پتانسیل‌های این فناوری در کمپین‌های بازاریابی و افزایش درآمد شرکت‌ها طراحی گردید. طراحی رابط کاربری پویا و کاربرپسند، نرخ تعامل مخاطبان را به شکل چشمگیری افزایش داده است.",
    highlights: [
      "طراحی تعاملی لندینگ پیج برای پرزنت قابلیت‌های تپ و اشتراک‌گذاری سریع پروفایل",
      "داشبورد مدیریت کارت‌ها، لینک‌های اختصاصی و آمار بازدیدهای شبکه ارتباطی",
      "تصویر بلند و جامع از صفحات وب‌سایت با طراحی پرانرژی و جذاب",
    ],
    liveUrl: "https://tapy.co",
    heroMockup: "/wp-content/uploads/2021/10/tapy-co-poster.jpg",
    screenshots: [
      {
        src: "/wp-content/uploads/2021/10/tapy.co-web-screeshot-ui.jpg",
        alt: "عکس بسیار بلند از کل صفحه وب‌سایت تاپی",
        isFullTall: true,
      },
    ],
  },
  "a-higher-thought": {
    slug: "a-higher-thought",
    title: "اندیشه برتر – پلتفرم ویدیوهای الهام‌بخش",
    englishTitle: "A Higher Thought",
    category: "توسعه وب",
    year: "۲۰۲۱",
    client: "بنیاد غیرانتفاعی A Higher Thought",
    role: "توسعه‌دهنده وب فرانت‌اند",
    techStack: ["React", "Next.js", "Video Streaming", "Modern CSS", "Animations"],
    summary: "پلتفرم آنلاین اشتراک‌گذاری ویدیوهای کوتاه انگیزشی، امیدبخش و ترویج انرژی مثبت در سطح جهان.",
    description:
      "پروژه «اندیشه برتر» با این باور شکل گرفت که یک پیام صمیمانه و کوتاه می‌تواند ناامیدی را به امید و یک روز سخت را به روزی پرانرژی تبدیل کند. این پلتفرم ابزارهایی ساده و جذاب را در اختیار کاربران جهانی قرار می‌دهد تا با به اشتراک گذاشتن ویدیوهای الهام‌بخش، مکالمات مثبت آنلاین را تقویت کرده و تاثیر مثبتی بر زندگی دیگران بگذارند.",
    highlights: [
      "رابط کاربری متمرکز بر محتوای ویدیویی و بارگذاری سریع فایل‌های صوتی و تصویری",
      "محیط مینیمال با تایپوگرافی خوانا، تم تیره دلنشین و المان‌های تعاملی الهام‌بخش",
      "تصویر پیوسته و باکیفیت از ساختار طراحی صفحه وب‌سایت",
    ],
    liveUrl: "",
    heroMockup: "/wp-content/uploads/2021/10/ahigherthought.com-poster.jpg",
    screenshots: [
      {
        src: "/wp-content/uploads/2021/03/ahigherthought-web-ui.jpg",
        alt: "عکس بسیار بلند از طراحی رابط کاربری اندیشه برتر",
        isFullTall: true,
      },
    ],
  },
};

export const ALL_PROJECT_SLUGS = Object.keys(PROJECT_DETAILS_DATA);

