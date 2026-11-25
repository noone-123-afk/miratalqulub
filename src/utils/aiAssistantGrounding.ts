import {
  INDEX_ARTICLES_META,
  INDEX_ACADEMIC_META,
  INDEX_NOVELS_META,
  INDEX_PERSONALITY_TESTS_META,
  INDEX_ASSESSMENTS_META,
  INDEX_INTELLIGENCE_BATTERIES_META,
} from '../data/catalogMetadataIndex';

interface CatalogSearchDoc {
  kind: 'article' | 'paper' | 'novel' | 'test' | 'iq';
  titleAr: string;
  titleEn: string;
  route: string;
  summary: string;
  searchBlob: string;
}

const STOP_WORDS = new Set([
  'من',
  'في',
  'على',
  'إلى',
  'عن',
  'مع',
  'هذا',
  'هذه',
  'ذلك',
  'التي',
  'الذي',
  'هل',
  'كيف',
  'ما',
  'ماذا',
  'لماذا',
  'أين',
  'متى',
  'أنا',
  'أنت',
  'نحن',
  'هم',
  'هو',
  'هي',
  'أو',
  'و',
  'ثم',
  'لكن',
  'أن',
  'إن',
  'كان',
  'يكون',
  'أريد',
  'اريد',
  'ابغى',
  'ممكن',
  'ارشدني',
  'رشح',
  'اقترح',
  'لي',
  'لدي',
  'عندي',
  'the',
  'and',
  'for',
  'with',
  'what',
  'how',
  'which',
  'why',
  'can',
  'you',
  'about',
  'from',
  'this',
  'that',
  'into',
  'your',
]);

function normalizeArabicText(input: string): string {
  return input
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildSearchDocs(): CatalogSearchDoc[] {
  const docs: CatalogSearchDoc[] = [];

  for (const a of INDEX_ARTICLES_META) {
    const raw = `${a.title} ${a.titleEn} ${a.summary} ${a.summaryEn} ${a.categoryLabelAr} ${a.scientificFramework}`;
    docs.push({
      kind: 'article',
      titleAr: a.title,
      titleEn: a.titleEn,
      route: `/articles/${encodeURIComponent(a.id)}`,
      summary: a.summary.slice(0, 140),
      searchBlob: normalizeArabicText(raw),
    });
  }

  for (const p of INDEX_ACADEMIC_META) {
    const raw = `${p.titleAr} ${p.titleEn} ${p.abstractAr} ${(p.keywordsAr || []).join(' ')} ${(p.keywordsEn || []).join(' ')}`;
    docs.push({
      kind: 'paper',
      titleAr: p.titleAr,
      titleEn: p.titleEn,
      route: '/articles',
      summary: p.abstractAr.slice(0, 140),
      searchBlob: normalizeArabicText(raw),
    });
  }

  for (const n of INDEX_NOVELS_META) {
    const raw = `${n.titleAr} ${n.titleEn} ${n.genreLabelAr} ${n.synopsisAr} ${n.psychologicalFocusAr}`;
    docs.push({
      kind: 'novel',
      titleAr: n.titleAr,
      titleEn: n.titleEn,
      route: `/novels/${encodeURIComponent(n.id)}`,
      summary: n.synopsisAr.slice(0, 140),
      searchBlob: normalizeArabicText(raw),
    });
  }

  for (const t of INDEX_PERSONALITY_TESTS_META) {
    const raw = `${t.titleAr} ${t.titleEn} ${t.subtitleAr} ${t.shortDescriptionAr}`;
    docs.push({
      kind: 'test',
      titleAr: t.titleAr,
      titleEn: t.titleEn,
      route: '/personality-tests',
      summary: t.shortDescriptionAr.slice(0, 140),
      searchBlob: normalizeArabicText(raw),
    });
  }

  for (const a of INDEX_ASSESSMENTS_META) {
    const raw = `${a.titleAr} ${a.titleEn} ${a.categoryTitleAr} ${a.shortDesc} ${a.scientificReference}`;
    docs.push({
      kind: 'test',
      titleAr: a.titleAr,
      titleEn: a.titleEn,
      route: '/personality-tests',
      summary: a.shortDesc.slice(0, 140),
      searchBlob: normalizeArabicText(raw),
    });
  }

  for (const b of INDEX_INTELLIGENCE_BATTERIES_META) {
    const raw = `${b.titleAr} ${b.titleEn} ${b.descriptionAr} ${b.scientificScaleName}`;
    docs.push({
      kind: 'iq',
      titleAr: b.titleAr,
      titleEn: b.titleEn,
      route: '/iq-tests',
      summary: b.descriptionAr.slice(0, 140),
      searchBlob: normalizeArabicText(raw),
    });
  }

  return docs;
}

const CATALOG_SEARCH_DOCS = buildSearchDocs();

function findRelevantCatalogDocs(query: string, limit = 6): CatalogSearchDoc[] {
  const normalized = normalizeArabicText(query);
  const tokens = normalized
    .split(' ')
    .filter((t) => t.length >= 2 && !STOP_WORDS.has(t));

  if (tokens.length === 0) {
    // Return a balanced curated sample across tests, articles, and novels
    return [
      ...CATALOG_SEARCH_DOCS.filter((d) => d.kind === 'test').slice(0, 2),
      ...CATALOG_SEARCH_DOCS.filter((d) => d.kind === 'article').slice(0, 2),
      ...CATALOG_SEARCH_DOCS.filter((d) => d.kind === 'novel').slice(0, 2),
    ];
  }

  const scored: Array<{ doc: CatalogSearchDoc; score: number }> = [];

  for (const doc of CATALOG_SEARCH_DOCS) {
    let score = 0;
    const titleNorm = normalizeArabicText(`${doc.titleAr} ${doc.titleEn}`);
    for (const token of tokens) {
      if (titleNorm.includes(token)) {
        score += 5;
      } else if (doc.searchBlob.includes(token)) {
        score += 2;
      }
    }
    if (score > 0) {
      scored.push({ doc, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);

  const selected: CatalogSearchDoc[] = [];
  const seenRoutes = new Set<string>();
  for (const item of scored) {
    const key = `${item.doc.kind}:${item.doc.titleAr}`;
    if (seenRoutes.has(key)) continue;
    seenRoutes.add(key);
    selected.push(item.doc);
    if (selected.length >= limit) break;
  }

  return selected;
}

export function normalizeGeminiHistory(
  history: unknown
): Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> {
  if (!Array.isArray(history)) return [];

  const cleaned: Array<{ role: 'user' | 'model'; text: string }> = [];
  for (const item of history.slice(-20)) {
    if (!item || typeof (item as any).content !== 'string') continue;
    const text = (item as any).content.trim().slice(0, 4000);
    if (!text) continue;
    const role: 'user' | 'model' =
      (item as any).role === 'assistant' || (item as any).role === 'model' ? 'model' : 'user';

    // Gemini expects alternating turns starting with 'user'
    if (cleaned.length === 0 && role !== 'user') continue;

    const last = cleaned[cleaned.length - 1];
    if (last && last.role === role) {
      last.text = `${last.text}\n\n${text}`.slice(0, 6000);
    } else {
      cleaned.push({ role, text });
    }
  }

  // Ensure the final entry in history is 'model' so the upcoming user message alternates cleanly
  while (cleaned.length > 0 && cleaned[cleaned.length - 1].role === 'user') {
    cleaned.pop();
  }

  return cleaned.map((turn) => ({
    role: turn.role,
    parts: [{ text: turn.text }],
  }));
}

export function buildGroundedSystemInstruction(params: {
  message: string;
  historyText?: string;
  currentPage?: string;
  language?: string;
}): string {
  const isAr = params.language !== 'en';
  const currentPage = typeof params.currentPage === 'string' ? params.currentPage : 'home';
  const combinedQuery = `${params.message} ${params.historyText || ''}`.trim();
  const matchedDocs = findRelevantCatalogDocs(combinedQuery, 6);

  const kindLabel = (kind: CatalogSearchDoc['kind']) => {
    switch (kind) {
      case 'article':
        return isAr ? 'مقال علمي' : 'Article';
      case 'paper':
        return isAr ? 'ورقة بحثية' : 'Research Paper';
      case 'novel':
        return isAr ? 'رواية تفاعلية' : 'Novel';
      case 'test':
        return isAr ? 'مقياس شخصية' : 'Personality Test';
      case 'iq':
        return isAr ? 'اختبار ذكاء' : 'IQ Battery';
    }
  };

  const catalogContext =
    matchedDocs.length > 0
      ? matchedDocs
          .map(
            (d) =>
              `- [${kindLabel(d.kind)}] ${isAr ? d.titleAr : d.titleEn} -> [${isAr ? d.titleAr : d.titleEn}](${d.route}): ${d.summary}`
          )
          .join('\n')
      : '';

  return `أنت المساعد المعرفي الذكي الرسمي لمنصة "مِـرآة القـلوب" (Mirror of Hearts - miratalqulub.com)، وهي منصة عربية متخصصة في تحليل الشخصية، التوافق العاطفي والفكري، اختبارات الذكاء المتعدد، المقالات العلمية الموثقة، والروايات التفاعلية.

إرشاداتك الجوهرية:
1. اللغة والأسلوب: أجب بلغة المستخدم (${isAr ? 'العربية الفصحى الميسّرة والدافئة' : 'Clear, warm, natural English'}) بأسلوب علمي رصين، عملي، ومباشر بدون إطالة مملة.
2. الدقة العلمية والمسؤولية: لا تقدّم تشخيصاً طبياً أو علاجاً سريرياً قطعياً؛ وضّح بلطف عند الحاجة أن مقاييس المنصة للاستبصار الذاتي والتثقيف النفسي.
3. التنسيق الواضح: استخدم عناوين قصيرة أو نقاطاً مرقمة واضحة عند تقديم خطوات أو مقارنات لتسهيل القراءة.
4. الروابط الداخلية الحقيقية: وجّه المستخدم إلى الأقسام أو المحتويات الفعلية في المنصة باستخدام صيغة الروابط Markdown مثل [اسم القسم أو المقال](/المسار) فقط من المسارات التالية أو المسارات الموثقة أدناه:
   - [كاشف شريك الحياة والتوافق](/compatibility)
   - [اختبارات تحليل الشخصية](/personality-tests)
   - [اختبارات الذكاء المتعدد](/iq-tests)
   - [المكتبة العلمية والمقالات](/articles)
   - [الروايات التفاعلية](/novels)
   - [الأدوات التفاعلية وتجربة The Blind Date](/tools)
   - [كيف تُحسب النتائج](/how-results-are-calculated)
   - [المنهجية العلمية](/methodology)
   - [كيف تعمل المنصة](/how-it-works)
   - [الأسئلة الشائعة](/faq)
   - [سياسة الخصوصية](/privacy)
   - [ملفي الشخصي](/profile)
${catalogContext ? `\nمحتويات موثقة من فهرس المنصة مرتبطة بسؤال المستخدم (يمكنك ترشيحها مباشرة بروابطها كما هي):\n${catalogContext}\n` : ''}
5. السياق الحالي لتصفح المستخدم: الصفحة الحالية هي "${currentPage}". راعِ ذلك عند التوجيه وكن مختصراً ومفيداً (الحد المثالي 3–6 فقرات مركزة أو قائمة واضحة).`;
}

export function buildContextualFollowUps(params: {
  message: string;
  reply: string;
  currentPage?: string;
  language?: string;
}): string[] {
  const isAr = params.language !== 'en';
  const combined = `${params.message} ${params.reply} ${params.currentPage || ''}`.toLowerCase();

  if (combined.includes('توافق') || combined.includes('شريك') || combined.includes('compat') || combined.includes('partner')) {
    return isAr
      ? ['كيف تُحسب نسبة التوافق بدقة؟', 'ما هي مراحل تجربة The Blind Date؟', 'رشّح لي مقالاً عن الزواج الواعي']
      : ['How is compatibility percentage calculated?', 'Explain The Blind Date stages', 'Recommend an article on conscious relationships'];
  }

  if (combined.includes('شخصية') || combined.includes('big five') || combined.includes('mbti') || combined.includes('personality')) {
    return isAr
      ? ['ما الفرق بين Big Five و MBTI؟', 'أي مقياس يناسبني الآن؟', 'هل تحفظ المنصة نتائجي بأمان؟']
      : ['Big Five vs MBTI difference?', 'Which personality test fits me best?', 'How are my test results stored?'];
  }

  if (combined.includes('ذكاء') || combined.includes('iq') || combined.includes('raven') || combined.includes('معرف')) {
    return isAr
      ? ['ما هي الذكاءات التسعة لغاردنر؟', 'أي اختبار ذكاء أبدأ به؟', 'كيف أفسر درجتي في الاختبار؟']
      : ['What are Gardner’s 9 intelligences?', 'Which IQ battery should I start with?', 'How do I interpret my IQ score?'];
  }

  if (combined.includes('مقال') || combined.includes('رواية') || combined.includes('قصة') || combined.includes('article') || combined.includes('novel')) {
    return isAr
      ? ['اقترح رواية نفسية مشوقة', 'أريد مقالاً في الذكاء العاطفي', 'اختبر شخصيتي بناءً على اهتماماتي']
      : ['Suggest an engaging psychological novel', 'Find an article on emotional intelligence', 'Take a matching personality test'];
  }

  return isAr
    ? ['اقترح لي اختباراً أبدأ به الآن', 'كيف تحسب المنصة النتائج علمياً؟', 'رشّح لي مقالاً أو رواية مفيدة']
    : ['Suggest a test to start with', 'How are results scored scientifically?', 'Recommend an insightful article or novel'];
}
