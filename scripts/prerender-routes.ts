import fs from 'node:fs';
import path from 'node:path';
import { ARTICLES_CATALOG, Article } from '../src/data/articlesData';
import { ACADEMIC_PAPERS_CATALOG, AcademicPaper } from '../src/data/academicPapersData';
import { NOVELS_CATALOG, Novel, NovelChapter } from '../src/data/novelsData';
import { generateSitemapXml } from '../src/utils/sitemapGenerator';

const BASE_URL = 'https://miratalqulub.com';
const OG_IMAGE_URL = `${BASE_URL}/og-image.jpg`;
const DIST_DIR = path.resolve('dist');
const INDEX_HTML_PATH = path.join(DIST_DIR, 'index.html');

interface StaticRouteMeta {
  route: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  highlights: { title: string; body: string }[];
  schemaType?: string;
}

const CORE_ROUTES: StaticRouteMeta[] = [
  {
    route: '/compatibility',
    title: 'كاشف شريك الحياة والتوافق النفسي | مرآة القلوب',
    description:
      'اكتشف مواصفات وتوافق شريك الحياة الواقعية وفق المقاييس النفسية والاجتماعية وخوارزمية التوافق الفكري والعاطفي في منصة مرآة القلوب.',
    heading: 'كاشف شريك الحياة والتوافق النفسي',
    intro:
      'يحلل مقياس التوافق في مرآة القلوب القيم الجوهرية، وأنماط التعلق العاطفي، واستراتيجيات إدارة الخلافات، وأولويات الاستقرار الأسري لبناء رؤية موضوعية للتوافق بعيداً عن الانطباعات العابرة.',
    highlights: [
      {
        title: 'تحليل الأبعاد الخمسة للتوافق',
        body: 'قياس التطابق في القيم الدينية والاجتماعية، التناغم الفكري، الحاجات العاطفية، إدارة الضغوط، والتوقعات المستقبلية.',
      },
      {
        title: 'تجربة The Blind Date المنهجية',
        body: 'أربع مراحل حوارية متدرجة تكشف عمق التفكير والأسلوب الإنساني قبل الانتقال إلى الدردشة المفتوحة.',
      },
    ],
  },
  {
    route: '/personality-tests',
    title: 'اختبارات تحليل الشخصية المعتمدة | مرآة القلوب',
    description:
      'اختبارات تحليل شخصية سيكومترية مبنية على نموذج العوامل الخمسة الكبرى Big Five وأنماط التعلق والذكاء العاطفي مع تقارير تحليلية دقيقة.',
    heading: 'مقاييس تحليل الشخصية السيكومترية',
    intro:
      'تقدم منصة مرآة القلوب حزمة متكاملة من اختبارات الشخصية المبنية على النماذج النفسية الرصينة، لفهم السمات السلوكية والدوافع اللاواعية ونقاط القوة التفاعلية.',
    highlights: [
      {
        title: 'نموذج العوامل الخمسة الكبرى (Big Five)',
        body: 'تقييم الانفتاح على الخبرة، الضمير الحي، الانبساط، التوافقية، والاستقرار العاطفي بمؤشرات معيارية واضحة.',
      },
      {
        title: 'أنماط التعلق والذكاء الوجداني',
        body: 'تشخيص أنماط الارتباط العاطفي وآليات التنظيم الانفعالي داخل العلاقات القريبة وبيئة العمل.',
      },
    ],
  },
  {
    route: '/iq-tests',
    title: 'اختبارات الذكاء المتعدد والقدرات المعرفية | مرآة القلوب',
    description:
      'اكتشف خريطة ذكائك عبر اختبارات الذكاء المتعدد (غاردنر) والقدرات المنطقية واللغوية والتحليلية في منصة مرآة القلوب.',
    heading: 'اختبارات الذكاء المتعدد والقدرات المعرفية',
    intro:
      'قياس متعدد الأبعاد للقدرات الذهنية يستند إلى نظرية الذكاءات المتعددة، ويساعدك على اكتشاف مجالات تميزك الفكرية والأكاديمية والمهنية.',
    highlights: [
      {
        title: 'الذكاءات الثمانية لغاردنر',
        body: 'تحليل متوازن للذكاء المنطقي الرياضي، اللغوي، البصري المكاني، الذاتي، والاجتماعي.',
      },
      {
        title: 'توصيات التوجيه الأكاديمي والمهني',
        body: 'ربط نتائج القدرات الذهنية بالتخصصات الجامعية والمسارات المهنية الأكثر ملاءمة لشخصيتك.',
      },
    ],
  },
  {
    route: '/articles',
    title: 'المكتبة المعرفية والمقالات العلمية | مرآة القلوب',
    description:
      'مقالات علمية محكمة ومبسطة في علم النفس التطبيقي، التوافق الزوجي، الذكاء العاطفي، العلاج المعرفي السلوكي، وبناء الشخصية.',
    heading: 'المكتبة المعرفية والمقالات العلمية المتخصصة',
    intro:
      'تضم مكتبة مرآة القلوب عشرات المقالات السيكومترية والعيادية المكتوبة بأسلوب علمي رصين وموثقة بمراجع APA في مجالات التوافق الأسري، الذكاء العاطفي، والعلاج المعرفي السلوكي.',
    highlights: [
      {
        title: 'سلاسل معرفية مترابطة',
        body: 'تغطي التوافق والزواج الواعي، فهم الذات، الذكاء العاطفي في القيادة والعمل، وإدارة القلق والتفكير المفرط.',
      },
      {
        title: 'أدوات تطبيقية داخل كل مقال',
        body: 'يتضمن كل مقال خلاصة علمية، جداول تشخيصية مقارنة، وتمارين عملية قابلة للتطبيق اليومي.',
      },
    ],
  },
  {
    route: '/novels',
    title: 'الروايات التفاعلية والقصص النفسية | مرآة القلوب',
    description:
      'اقرأ روايات وقصصاً نفسية وإنسانية تفاعلية تستكشف أعماق النفس البشرية والتحديات العاطفية والاجتماعية المعاصرة.',
    heading: 'الروايات التفاعلية والدراسات السردية',
    intro:
      'مجموعة أعمال سردية وإنسانية تترجم المفاهيم النفسية العميقة إلى حكايات واقعية تلامس تحديات العلاقات، والهوية، والتعافي العاطفي.',
    highlights: [
      {
        title: 'قصص مستوحاة من الواقع النفسي',
        body: 'استكشاف ديناميكيات القوة في العلاقات، التحرر من الصدمات، وإعادة بناء الثقة بالنفس.',
      },
    ],
  },
  {
    route: '/tools',
    title: 'الأدوات التفاعلية والوعي النفسي | مرآة القلوب',
    description:
      'أدوات تفاعلية عملية لإدارة القلق، تفكيك التشوهات المعرفية، قياس جودة التواصل، وتنظيم التوازن النفسي اليومي.',
    heading: 'مختبر الأدوات التفاعلية والوعي النفسي',
    intro:
      'أدوات عملية مستمدة من العلاج المعرفي السلوكي (CBT) وعلم النفس الإيجابي لمساعدتك على تحويل المعرفة النظرية إلى مهارات يومية ملموسة.',
    highlights: [
      {
        title: 'تفكيك التشوهات المعرفية',
        body: 'أداة تفاعلية لإعادة صياغة الأفكار التلقائية السلبية وبناء استجابة معرفية متوازنة.',
      },
    ],
  },
  {
    route: '/about',
    title: 'من نحن | مرآة القلوب',
    description:
      'تعرف على رؤية ورسالة منصة مرآة القلوب، المبادرة العربية المستقلة في التوافق الإنساني والمقاييس السيكومترية في عمّان - الأردن.',
    heading: 'من نحن — رؤية ورسالة مرآة القلوب',
    intro:
      'مرآة القلوب مبادرة معرفية وتقنية عربية تأسست في عمّان - الأردن لتقديم بيئة رقمية آمنة تجمع بين المقاييس النفسية الموثقة والأدوات الحوارية الهادفة لبناء علاقات إنسانية أكثر وعياً واستقراراً.',
    highlights: [
      {
        title: 'الجمع بين العلم والخصوصية',
        body: 'نعتمد على أطر علمية رصينة مثل العوامل الخمسة الكبرى ونظرية التعلق مع التزام صارم بخصوصية المستخدمين.',
      },
    ],
    schemaType: 'AboutPage',
  },
  {
    route: '/how-it-works',
    title: 'كيف تعمل المنصة | مرآة القلوب',
    description:
      'دليل شامل لخطوات العمل داخل منصة مرآة القلوب: من إنشاء الملف السيكومتري وحتى تحليل التوافق وتجربة الحوار الواعي.',
    heading: 'كيف تعمل منصة مرآة القلوب؟',
    intro:
      'تبدأ رحلتك ببناء ملفك المعرفي والنفسي عبر مقاييس قصيرة ودقيقة، ثم تستعرض مؤشرات التوافق والأدوات التحليلية التي تمنحك فهماً أعمق لذاتك وللطرف الآخر.',
    highlights: [
      {
        title: 'أربع خطوات واضحة',
        body: 'إكمال التقييم الأساسي، استعراض التقرير التفاعلي، الاستفادة من التوصيات المعرفية، وخوض التجربة الحوارية عند الرغبة.',
      },
    ],
  },
  {
    route: '/compatibility-algorithm',
    title: 'خوارزمية التوافق السيكومترية | مرآة القلوب',
    description:
      'تفصيل هندسي وعلمي لآلية عمل خوارزمية التوافق في مرآة القلوب وكيفية وزن الأبعاد القيمية والفكرية والعاطفية.',
    heading: 'منهجية خوارزمية التوافق النفسي والفكري',
    intro:
      'تعتمد خوارزمية التوافق على موازنة التطابق في القيم الأساسية مع التكامل في السمات المزاجية، بدلاً من الاعتماد على التطابق الحرفي السطحي.',
    highlights: [
      {
        title: 'أوزان ديناميكية شفافة',
        body: 'توزيع مدروس للأوزان بين القيم المشتركة، أسلوب التواصل، مرونة إدارة الصراع، والأولويات الأسرية.',
      },
    ],
  },
  {
    route: '/how-results-are-calculated',
    title: 'كيف تُحسب النتائج والتقارير | مرآة القلوب',
    description:
      'توضيح شفاف لكيفية احتساب الدرجات والمؤشرات المعيارية في اختبارات الشخصية والذكاء والتوافق داخل مرآة القلوب.',
    heading: 'كيف تُحسب النتائج والمؤشرات النفسية؟',
    intro:
      'تُحسب جميع النتائج وفق نماذج إحصائية ومعيارية تهدف إلى الوصف التنموي والاستبصار الذاتي، دون إصدار أحكام سريرية قطعية.',
    highlights: [
      {
        title: 'شفافية المعايير',
        body: 'عرض تفصيلي لكل بُعد فرعي مع تفسير علمي لمستوى النتيجة وتوصيات عملية للتطوير.',
      },
    ],
  },
  {
    route: '/methodology',
    title: 'المنهجية العلمية والمصادر | مرآة القلوب',
    description:
      'تعرف على المرجعية العلمية والاختبارات المعتمدة ومصادر علم النفس التطبيقي التي تستند إليها منصة مرآة القلوب.',
    heading: 'المنهجية العلمية والمراجع البحثية المعتمدة',
    intro:
      'تستند محتويات وأدوات المنصة إلى أدبيات علم النفس المعاصر: نظرية العوامل الخمسة الكبرى، نظرية التعلق لـ بولبي وإينسورث، أبحاث غوتمان في استقرار العلاقات، ونظرية الذكاءات المتعددة.',
    highlights: [
      {
        title: 'مراجعة معرفية مستمرة',
        body: 'توثيق المصادر العلمية وفق أسلوب الجمعية الأمريكية لعلم النفس (APA 7th) وتحديث المحتوى دوريًا.',
      },
    ],
  },
  {
    route: '/privacy',
    title: 'سياسة الخصوصية وحماية البيانات | مرآة القلوب',
    description:
      'سياسة الخصوصية الكاملة لمنصة مرآة القلوب: كيف نحمي بياناتك، تشفير الاتصالات، وحقوقك الكاملة في الحذف والتعديل.',
    heading: 'سياسة الخصوصية وحماية البيانات',
    intro:
      'تضع مرآة القلوب خصوصية المستخدم وأمن بياناته الشخصية والسيكومترية في مقدمة أولوياتها، مع تشفير كامل للاتصالات وعدم بيع أو مشاركة البيانات مع أطراف تجارية.',
    highlights: [
      {
        title: 'تحكم كامل في البيانات',
        body: 'يمكنك مراجعة ملفك الشخصي أو تعديل بياناتك أو طلب حذفها نهائياً في أي وقت.',
      },
    ],
  },
  {
    route: '/terms',
    title: 'شروط الاستخدام والضوابط | مرآة القلوب',
    description:
      'الشروط والأحكام المنظمة لاستخدام منصة مرآة القلوب، قواعد السلوك الراقي، وحدود الاستخدام المعرفي للأدوات النفسية.',
    heading: 'شروط الاستخدام وضوابط المجتمع',
    intro:
      'ينظم استخدام منصة مرآة القلوب ميثاق أخلاقي يحفظ الاحترام المتبادل، ويؤكد أن الاختبارات والمقالات تقدم لأغراض التثقيف والاستبصار الشخصي.',
    highlights: [
      {
        title: 'بيئة حوار آمنة وموثوقة',
        body: 'الالتزام بالاحترام المتبادل والخصوصية وعدم إساءة استخدام أدوات التواصل التفاعلية.',
      },
    ],
  },
  {
    route: '/faq',
    title: 'الأسئلة الشائعة | مرآة القلوب',
    description:
      'إجابات وافية عن الأسئلة الأكثر شيوعاً حول اختبارات مرآة القلوب، خوارزمية التوافق، الخصوصية، وتجربة The Blind Date.',
    heading: 'الأسئلة الشائعة حول منصة مرآة القلوب',
    intro:
      'جمعنا لك هنا أبرز الاستفسارات حول طبيعة المقاييس النفسية، دقة نتائج التوافق، سياسة حفظ البيانات، وآلية استخدام المنصة مجاناً.',
    highlights: [
      {
        title: 'استخدام مجاني وشفاف',
        body: 'المحتوى المعرفي والاختبارات الأساسية متاحة بوضوح كامل دون رسوم خفية أو التزامات إلزامية.',
      },
    ],
    schemaType: 'FAQPage',
  },
  {
    route: '/disclaimer',
    title: 'إخلاء المسؤولية العلمية والطبية | مرآة القلوب',
    description:
      'بيان إخلاء المسؤولية التثقيفي: منصة مرآة القلوب منصة معرفية وسيكومترية استبصارية ولا تغني عن التشخيص أو العلاج النفسي السريري.',
    heading: 'إخلاء المسؤولية العلمية والطبية',
    intro:
      'المقاييس والمقالات المنشورة في مرآة القلوب مصممة للتثقيف النفسي وتنمية الوعي الذاتي، ولا تُعد بديلاً عن الاستشارة الطبية أو النفسية المتخصصة عند الحاجة السريرية.',
    highlights: [
      {
        title: 'دعم الوعي دون تشخيص طبي',
        body: 'في حالات الضيق النفسي الحاد أو الأزمات الصحية، ننصح بالتواصل المباشر مع مختص نفسي أو طبيب مرخص.',
      },
    ],
  },
  {
    route: '/contact',
    title: 'اتصل بنا | مرآة القلوب',
    description:
      'تواصل مع فريق منصة مرآة القلوب في عمّان - الأردن للاستفسارات التقنية أو المعرفية أو طلبات الدعم والخصوصية.',
    heading: 'قنوات التواصل الرسمية مع مرآة القلوب',
    intro:
      'يسعد فريقنا الهندسي والمعرفي في عمّان - الأردن باستقبال ملاحظاتكم واستفساراتكم ومقترحات التطوير عبر البريد الرسمي one497303@gmail.com.',
    highlights: [
      {
        title: 'الدعم والاستفسارات',
        body: 'نستجيب لرسائل الدعم الفني، ملاحظات المحتوى العلمي، وطلبات إدارة الحساب والخصوصية بسرعة ومسؤولية.',
      },
    ],
    schemaType: 'ContactPage',
  },
  {
    route: '/profile',
    title: 'الملف الشخصي والنتائج المحفوظة | مرآة القلوب',
    description:
      'إدارة ملفك الشخصي ونتائج اختبارات الشخصية والذكاء والتوافق النفسي المحفوظة بأمان في مرآة القلوب.',
    heading: 'الملف الشخصي وسجل التقييمات',
    intro:
      'مساحتك الخاصة لمتابعة تطور مؤشراتك السيكومترية، حفظ مقالاتك المفضلة، ومراجعة تقارير التوافق والتوصيات المعرفية.',
    highlights: [
      {
        title: 'مزامنة محمية',
        body: 'حفظ سلس لإعداداتك وتقييماتك مع خيارات واضحة لإدارة الخصوصية.',
      },
    ],
  },
];

function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(text: string): string {
  return escapeHtml(text).replace(/"/g, '&quot;');
}

function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

function injectHeadMetadata(
  templateHtml: string,
  opts: {
    title: string;
    description: string;
    canonicalUrl: string;
    ogType: 'website' | 'article';
    structuredData: Record<string, unknown>;
  }
): string {
  let html = templateHtml;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(opts.title)}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeAttr(opts.description)}" />`
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeAttr(opts.canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeAttr(opts.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeAttr(opts.description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${opts.ogType}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeAttr(opts.canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeAttr(opts.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeAttr(opts.description)}" />`
  );

  const jsonLdScript = `<script id="prerendered-structured-data" type="application/ld+json">${safeJsonLd(opts.structuredData)}</script>`;
  html = html.replace('</head>', `    ${jsonLdScript}\n  </head>`);
  return html;
}

function replaceRootFallback(html: string, innerHtml: string): string {
  const startMarker = '<div id="root">';
  const endMarker = '</body>';
  const startIdx = html.indexOf(startMarker);
  const bodyCloseIdx = html.lastIndexOf(endMarker);

  if (startIdx === -1 || bodyCloseIdx === -1 || bodyCloseIdx <= startIdx) {
    throw new Error('Could not locate <div id="root"> ... </body> wrapper in dist/index.html');
  }

  return (
    html.slice(0, startIdx) +
    `<div id="root">\n${innerHtml}\n    </div>\n  ` +
    html.slice(bodyCloseIdx)
  );
}

function renderShell(mainContentHtml: string): string {
  return `      <div class="min-h-screen bg-[#0c0916] text-slate-100 flex flex-col">
        <header class="border-b border-white/10 bg-[#120d22]/90">
          <div class="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <a href="/" class="text-xl font-bold text-white">مرآة القلوب</a>
            <nav aria-label="التنقل الرئيسي" class="flex flex-wrap gap-4 text-sm text-slate-300">
              <a href="/compatibility">كاشف شريك الحياة</a>
              <a href="/personality-tests">تحليل الشخصية</a>
              <a href="/iq-tests">اختبارات الذكاء</a>
              <a href="/articles">المقالات العلمية</a>
              <a href="/novels">الروايات التفاعلية</a>
              <a href="/tools">الأدوات المعرفية</a>
              <a href="/methodology">المنهجية العلمية</a>
              <a href="/about">من نحن</a>
            </nav>
          </div>
        </header>
        <main class="max-w-5xl mx-auto px-6 py-12 flex-1 space-y-8">
${mainContentHtml}
        </main>
        <footer class="border-t border-white/10 bg-[#090611] py-8 px-6 text-sm text-slate-400">
          <div class="max-w-6xl mx-auto flex flex-wrap justify-between gap-4">
            <p>© 2026 مرآة القلوب — عمّان، الأردن</p>
            <div class="flex flex-wrap gap-4">
              <a href="/how-it-works">كيف تعمل المنصة</a>
              <a href="/compatibility-algorithm">خوارزمية التوافق</a>
              <a href="/how-results-are-calculated">كيف تُحسب النتائج</a>
              <a href="/privacy">سياسة الخصوصية</a>
              <a href="/terms">شروط الاستخدام</a>
              <a href="/faq">الأسئلة الشائعة</a>
              <a href="/contact">اتصل بنا</a>
            </div>
          </div>
        </footer>
      </div>`;
}

function buildCoreRouteBody(
  meta: StaticRouteMeta,
  articles: Article[],
  academicPapers: AcademicPaper[],
  novels: Novel[]
): string {
  const highlightsHtml = meta.highlights
    .map(
      (item) => `            <article class="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-2">
              <h2 class="text-xl font-bold text-rose-300">${escapeHtml(item.title)}</h2>
              <p class="text-sm leading-relaxed text-slate-300">${escapeHtml(item.body)}</p>
            </article>`
    )
    .join('\n');

  let extraDirectoryHtml = '';
  if (meta.route === '/articles') {
    const articleLinks = articles
      .map(
        (article) =>
          `              <li class="rounded-xl border border-white/10 bg-white/5 p-4 space-y-1">
                <a href="/articles/${escapeAttr(encodeURIComponent(article.id))}" class="text-lg font-bold text-rose-200 hover:underline">${escapeHtml(article.title)}</a>
                <p class="text-xs text-slate-400">${escapeHtml(article.categoryLabelAr)} • ${escapeHtml(article.readTime)}</p>
                <p class="text-sm text-slate-300">${escapeHtml(article.summary)}</p>
              </li>`
      )
      .join('\n');
    const seenIds = new Set(articles.map((a) => a.id));
    const uniquePapers = academicPapers.filter((p) => !seenIds.has(p.id));
    const paperLinks = uniquePapers
      .map(
        (paper) =>
          `              <li class="rounded-xl border border-white/10 bg-white/5 p-4 space-y-1">
                <a href="/articles/${escapeAttr(encodeURIComponent(paper.id))}" class="text-lg font-bold text-cyan-200 hover:underline">${escapeHtml(paper.titleAr)}</a>
                <p class="text-xs text-slate-400">${escapeHtml(paper.categoryLabelAr)} • ${escapeHtml(paper.readTimeAr)}</p>
                <p class="text-sm text-slate-300">${escapeHtml(paper.abstractAr)}</p>
              </li>`
      )
      .join('\n');

    extraDirectoryHtml = `
          <section class="space-y-4">
            <h2 class="text-2xl font-bold text-white">فهرس المقالات العلمية والأبحاث المحكّمة (${articles.length + uniquePapers.length})</h2>
            <ul class="grid gap-4 md:grid-cols-2">
${articleLinks}
${paperLinks}
            </ul>
          </section>`;
  } else if (meta.route === '/novels') {
    const novelLinks = novels
      .map(
        (novel) =>
          `              <li class="rounded-xl border border-white/10 bg-white/5 p-5 space-y-2">
                <a href="/novels/${escapeAttr(encodeURIComponent(novel.id))}" class="text-lg font-bold text-emerald-200 hover:underline">${escapeHtml(novel.titleAr)}</a>
                <p class="text-xs text-slate-400">${escapeHtml(novel.genreLabelAr)} • ${novel.totalChapters} فصول • ${escapeHtml(novel.estimatedReadingTime)}</p>
                <p class="text-sm text-slate-300">${escapeHtml(novel.synopsisAr)}</p>
              </li>`
      )
      .join('\n');

    extraDirectoryHtml = `
          <section class="space-y-4">
            <h2 class="text-2xl font-bold text-white">فهرس الروايات والدراسات السردية (${novels.length} روايات)</h2>
            <ul class="grid gap-4 md:grid-cols-2">
${novelLinks}
            </ul>
          </section>`;
  }

  return renderShell(`          <section class="space-y-4">
            <h1 class="text-3xl font-extrabold text-white">${escapeHtml(meta.heading)}</h1>
            <p class="text-base leading-relaxed text-slate-300">${escapeHtml(meta.intro)}</p>
          </section>
          <section class="grid gap-6 md:grid-cols-2">
${highlightsHtml}
          </section>${extraDirectoryHtml}`);
}

function buildArticleBody(article: Article): string {
  const quoteHtml = article.clinicalCaseQuoteAr
    ? `          <blockquote class="rounded-2xl border-r-4 border-rose-400 bg-white/5 p-5 text-slate-200 italic leading-relaxed">
            ${escapeHtml(article.clinicalCaseQuoteAr)}
          </blockquote>`
    : '';

  const takeawaysHtml =
    article.keyTakeaways.length > 0
      ? `          <section class="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
            <h2 class="text-xl font-bold text-rose-300">أبرز النقاط العلمية</h2>
            <ul class="list-disc pr-5 space-y-2 text-slate-200">
${article.keyTakeaways.map((t) => `              <li>${escapeHtml(t)}</li>`).join('\n')}
            </ul>
          </section>`
      : '';

  const paragraphsHtml = article.contentParagraphs
    .map(
      (p) => `          <section class="space-y-2">
            <h2 class="text-2xl font-bold text-violet-200">${escapeHtml(p.heading)}</h2>
            <p class="text-base leading-relaxed text-slate-300">${escapeHtml(p.text)}</p>
          </section>`
    )
    .join('\n');

  const exerciseHtml =
    article.practicalExercise?.steps?.length > 0
      ? `          <section class="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-3">
            <h2 class="text-xl font-bold text-emerald-300">${escapeHtml(article.practicalExercise.title)}</h2>
            <ol class="list-decimal pr-5 space-y-2 text-slate-200">
${article.practicalExercise.steps.map((s) => `              <li>${escapeHtml(s)}</li>`).join('\n')}
            </ol>
          </section>`
      : '';

  const conclusionHtml = article.conclusionAr
    ? `          <section class="space-y-2">
            <h2 class="text-xl font-bold text-amber-300">الخلاصة التطبيقية</h2>
            <p class="text-base leading-relaxed text-slate-300">${escapeHtml(article.conclusionAr)}</p>
          </section>`
    : '';

  return renderShell(`          <nav aria-label="مسار التنقل" class="text-sm text-slate-400 flex flex-wrap gap-2">
            <a href="/" class="hover:text-white">الرئيسية</a>
            <span>/</span>
            <a href="/articles" class="hover:text-white">المقالات العلمية</a>
            <span>/</span>
            <span class="text-rose-300">${escapeHtml(article.categoryLabelAr)}</span>
          </nav>
          <article class="space-y-6">
            <header class="space-y-3">
              <p class="text-sm text-rose-300">${escapeHtml(article.categoryLabelAr)} • ${escapeHtml(article.readTime)} • ${escapeHtml(article.publishDate)}</p>
              <h1 class="text-3xl font-extrabold text-white">${escapeHtml(article.title)}</h1>
              <p class="text-sm text-violet-300">الإطار العلمي: ${escapeHtml(article.scientificFramework)}</p>
              <p class="text-lg leading-relaxed text-slate-200">${escapeHtml(article.summary)}</p>
            </header>
${quoteHtml}
${takeawaysHtml}
${paragraphsHtml}
${exerciseHtml}
${conclusionHtml}
          </article>`);
}

function writeHtmlRoute(routePath: string, html: string) {
  const cleanRoute = routePath.replace(/^\/+/, '').replace(/\/+$/, '');
  const targetFile = path.join(DIST_DIR, `${cleanRoute}.html`);
  fs.mkdirSync(path.dirname(targetFile), { recursive: true });
  fs.writeFileSync(targetFile, html, 'utf-8');
}

function buildAcademicPaperBody(paper: AcademicPaper): string {
  const introHtml = paper.introductionAr
    .map((p) => `            <p class="text-base leading-relaxed text-slate-300">${escapeHtml(p)}</p>`)
    .join('\n');

  const sectionsHtml = [...paper.theoreticalFramework, ...paper.analysisAndDiscussion]
    .map(
      (sec) => `          <section class="space-y-2">
            <h2 class="text-2xl font-bold text-cyan-200">${escapeHtml(sec.sectionNumber)} ${escapeHtml(sec.titleAr)}</h2>
            <p class="text-base leading-relaxed text-slate-300">${escapeHtml(sec.contentAr)}</p>
          </section>`
    )
    .join('\n');

  return renderShell(`          <nav aria-label="مسار التنقل" class="text-sm text-slate-400 flex flex-wrap gap-2">
            <a href="/" class="hover:text-white">الرئيسية</a>
            <span>/</span>
            <a href="/articles" class="hover:text-white">المقالات والأبحاث</a>
            <span>/</span>
            <span class="text-cyan-300">${escapeHtml(paper.categoryLabelAr)}</span>
          </nav>
          <article class="space-y-6">
            <header class="space-y-3">
              <p class="text-sm text-cyan-300">${escapeHtml(paper.methodologyBadgeAr)} • ${escapeHtml(paper.readTimeAr)} • ${escapeHtml(paper.publishDate)}</p>
              <h1 class="text-3xl font-extrabold text-white">${escapeHtml(paper.titleAr)}</h1>
              <p class="text-lg leading-relaxed text-slate-200">${escapeHtml(paper.abstractAr)}</p>
            </header>
            <section class="space-y-3">
              <h2 class="text-xl font-bold text-rose-300">المقدمة العلمية</h2>
${introHtml}
            </section>
${sectionsHtml}
            <section class="space-y-2">
              <h2 class="text-xl font-bold text-amber-300">الخاتمة البحثية</h2>
              <p class="text-base leading-relaxed text-slate-300">${escapeHtml(paper.conclusionAr)}</p>
            </section>
          </article>`);
}

function buildNovelBody(novel: Novel): string {
  const chaptersHtml = novel.chapters
    .map(
      (ch, idx) =>
        `              <li class="rounded-xl border border-white/10 bg-white/5 p-4 space-y-1">
                <a href="/novels/${escapeAttr(encodeURIComponent(novel.id))}/chapter/${idx + 1}" class="text-lg font-bold text-emerald-200 hover:underline">الفصل ${ch.chapterNumber}: ${escapeHtml(ch.titleAr)}</a>
                <p class="text-xs text-slate-400">${ch.estimatedMinutes} دقيقة • ${ch.wordsCount} كلمة</p>
                <p class="text-sm text-slate-300">${escapeHtml(ch.synopsisAr)}</p>
              </li>`
    )
    .join('\n');

  return renderShell(`          <nav aria-label="مسار التنقل" class="text-sm text-slate-400 flex flex-wrap gap-2">
            <a href="/" class="hover:text-white">الرئيسية</a>
            <span>/</span>
            <a href="/novels" class="hover:text-white">الروايات التفاعلية</a>
            <span>/</span>
            <span class="text-emerald-300">${escapeHtml(novel.genreLabelAr)}</span>
          </nav>
          <article class="space-y-6">
            <header class="space-y-3">
              <p class="text-sm text-emerald-300">${escapeHtml(novel.genreLabelAr)} • ${novel.totalChapters} فصول • ${escapeHtml(novel.estimatedReadingTime)}</p>
              <h1 class="text-3xl font-extrabold text-white">${escapeHtml(novel.titleAr)}</h1>
              <p class="text-base text-violet-200">${escapeHtml(novel.subtitleAr)}</p>
              <p class="text-lg leading-relaxed text-slate-200">${escapeHtml(novel.synopsisAr)}</p>
            </header>
            <section class="grid gap-4 md:grid-cols-2">
              <div class="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-1">
                <h2 class="text-lg font-bold text-rose-300">المحور الجنائي والتحليلي</h2>
                <p class="text-sm text-slate-300">${escapeHtml(novel.forensicThemeAr)}</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-1">
                <h2 class="text-lg font-bold text-cyan-300">البُعد النفسي</h2>
                <p class="text-sm text-slate-300">${escapeHtml(novel.psychologicalFocusAr)}</p>
              </div>
            </section>
            <section class="space-y-4">
              <h2 class="text-2xl font-bold text-white">فصول الرواية</h2>
              <ul class="grid gap-4 md:grid-cols-2">
${chaptersHtml}
              </ul>
            </section>
          </article>`);
}

function buildChapterBody(novel: Novel, chapter: NovelChapter, chapterIdx: number): string {
  const chapterNum = chapterIdx + 1;
  const paragraphs = chapter.contentAr
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 60)
    .map((p) => `            <p class="text-base leading-relaxed text-slate-300">${escapeHtml(p)}</p>`)
    .join('\n');

  const prevLink =
    chapterNum > 1
      ? `<a href="/novels/${escapeAttr(encodeURIComponent(novel.id))}/chapter/${chapterNum - 1}" class="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:text-white">الفصل السابق</a>`
      : '';
  const nextLink =
    chapterNum < novel.chapters.length
      ? `<a href="/novels/${escapeAttr(encodeURIComponent(novel.id))}/chapter/${chapterNum + 1}" class="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:text-white">الفصل التالي</a>`
      : '';

  return renderShell(`          <nav aria-label="مسار التنقل" class="text-sm text-slate-400 flex flex-wrap gap-2">
            <a href="/" class="hover:text-white">الرئيسية</a>
            <span>/</span>
            <a href="/novels" class="hover:text-white">الروايات</a>
            <span>/</span>
            <a href="/novels/${escapeAttr(encodeURIComponent(novel.id))}" class="hover:text-white">${escapeHtml(novel.titleAr)}</a>
            <span>/</span>
            <span class="text-emerald-300">الفصل ${chapterNum}</span>
          </nav>
          <article class="space-y-6">
            <header class="space-y-2">
              <p class="text-sm text-emerald-300">${escapeHtml(novel.titleAr)} • الفصل ${chapterNum} من ${novel.chapters.length} • ${chapter.estimatedMinutes} دقيقة</p>
              <h1 class="text-3xl font-extrabold text-white">${escapeHtml(chapter.titleAr)}</h1>
              <p class="text-base leading-relaxed text-slate-200">${escapeHtml(chapter.synopsisAr)}</p>
            </header>
            <section class="space-y-4">
${paragraphs}
            </section>
            <div class="flex flex-wrap gap-3 pt-4">
              <a href="/novels/${escapeAttr(encodeURIComponent(novel.id))}" class="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:text-white">فهرس الرواية</a>
              ${prevLink}
              ${nextLink}
            </div>
          </article>`);
}

function main() {
  if (!fs.existsSync(INDEX_HTML_PATH)) {
    throw new Error(`Missing ${INDEX_HTML_PATH}. Run "vite build" before prerendering.`);
  }

  const templateHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

  for (const routeMeta of CORE_ROUTES) {
    const canonicalUrl = `${BASE_URL}${routeMeta.route}`;
    const pageHtml = injectHeadMetadata(templateHtml, {
      title: routeMeta.title,
      description: routeMeta.description,
      canonicalUrl,
      ogType: 'website',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': routeMeta.schemaType || 'WebPage',
        url: canonicalUrl,
        name: routeMeta.title,
        description: routeMeta.description,
        inLanguage: 'ar',
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
        },
        isPartOf: {
          '@id': `${BASE_URL}/#website`,
        },
      },
    });
    const fullPageHtml = replaceRootFallback(
      pageHtml,
      buildCoreRouteBody(routeMeta, ARTICLES_CATALOG, ACADEMIC_PAPERS_CATALOG, NOVELS_CATALOG)
    );
    writeHtmlRoute(routeMeta.route, fullPageHtml);
  }

  const renderedArticleIds = new Set<string>();

  for (const article of ARTICLES_CATALOG) {
    renderedArticleIds.add(article.id);
    const canonicalUrl = `${BASE_URL}/articles/${encodeURIComponent(article.id)}`;
    const fullTitle = `${article.title} | مرآة القلوب`;
    const pageHtml = injectHeadMetadata(templateHtml, {
      title: fullTitle,
      description: article.summary,
      canonicalUrl,
      ogType: 'article',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.summary,
        datePublished: article.publishDate,
        inLanguage: 'ar',
        image: OG_IMAGE_URL,
        mainEntityOfPage: canonicalUrl,
        author: {
          '@type': 'Organization',
          name: 'مِـرآة القـلوب',
          url: BASE_URL,
        },
        publisher: {
          '@id': `${BASE_URL}/#organization`,
        },
      },
    });
    const fullArticleHtml = replaceRootFallback(pageHtml, buildArticleBody(article));
    writeHtmlRoute(`/articles/${article.id}`, fullArticleHtml);
  }

  let academicCount = 0;
  for (const paper of ACADEMIC_PAPERS_CATALOG) {
    if (renderedArticleIds.has(paper.id)) continue;
    renderedArticleIds.add(paper.id);
    academicCount += 1;
    const canonicalUrl = `${BASE_URL}/articles/${encodeURIComponent(paper.id)}`;
    const fullTitle = `${paper.titleAr} | مرآة القلوب`;
    const pageHtml = injectHeadMetadata(templateHtml, {
      title: fullTitle,
      description: paper.abstractAr,
      canonicalUrl,
      ogType: 'article',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'ScholarlyArticle',
        headline: paper.titleAr,
        description: paper.abstractAr,
        datePublished: paper.publishDate,
        inLanguage: 'ar',
        image: OG_IMAGE_URL,
        mainEntityOfPage: canonicalUrl,
        author: {
          '@type': 'Organization',
          name: 'مِـرآة القـلوب',
          url: BASE_URL,
        },
        publisher: {
          '@id': `${BASE_URL}/#organization`,
        },
      },
    });
    const fullPaperHtml = replaceRootFallback(pageHtml, buildAcademicPaperBody(paper));
    writeHtmlRoute(`/articles/${paper.id}`, fullPaperHtml);
  }

  let chaptersCount = 0;
  for (const novel of NOVELS_CATALOG) {
    const novelCanonicalUrl = `${BASE_URL}/novels/${encodeURIComponent(novel.id)}`;
    const novelTitle = `${novel.titleAr} | مكتبة الروايات — مرآة القلوب`;
    const novelPageHtml = injectHeadMetadata(templateHtml, {
      title: novelTitle,
      description: novel.synopsisAr,
      canonicalUrl: novelCanonicalUrl,
      ogType: 'article',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: novel.titleAr,
        description: novel.synopsisAr,
        inLanguage: 'ar',
        genre: novel.genreLabelAr,
        numberOfPages: novel.totalChapters,
        url: novelCanonicalUrl,
        image: OG_IMAGE_URL,
        publisher: {
          '@id': `${BASE_URL}/#organization`,
        },
      },
    });
    writeHtmlRoute(`/novels/${novel.id}`, replaceRootFallback(novelPageHtml, buildNovelBody(novel)));

    for (let idx = 0; idx < novel.chapters.length; idx += 1) {
      chaptersCount += 1;
      const chapter = novel.chapters[idx];
      const chapterNum = idx + 1;
      const chapterCanonicalUrl = `${BASE_URL}/novels/${encodeURIComponent(novel.id)}/chapter/${chapterNum}`;
      const chapterTitle = `الفصل ${chapterNum}: ${chapter.titleAr} — ${novel.titleAr} | مرآة القلوب`;
      const chapterHtml = injectHeadMetadata(templateHtml, {
        title: chapterTitle,
        description: chapter.synopsisAr,
        canonicalUrl: chapterCanonicalUrl,
        ogType: 'article',
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Chapter',
          name: chapter.titleAr,
          position: chapterNum,
          description: chapter.synopsisAr,
          inLanguage: 'ar',
          url: chapterCanonicalUrl,
          isPartOf: {
            '@type': 'Book',
            name: novel.titleAr,
            url: novelCanonicalUrl,
          },
        },
      });
      writeHtmlRoute(
        `/novels/${novel.id}/chapter/${chapterNum}`,
        replaceRootFallback(chapterHtml, buildChapterBody(novel, chapter, idx))
      );
    }
  }

  const { xml: sitemapXml, stats } = generateSitemapXml({ baseUrl: BASE_URL });
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');

  console.log(
    `[prerender] Generated ${CORE_ROUTES.length} core route HTML files, ${ARTICLES_CATALOG.length} articles, ${academicCount} academic papers, ${NOVELS_CATALOG.length} novels, and ${chaptersCount} novel chapters in dist/ + updated dist/sitemap.xml (${stats.totalUrls} total URLs).`
  );
}

main();
