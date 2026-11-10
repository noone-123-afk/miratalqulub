// Comprehensive Suspense & Thriller Novels Database (قسم الروايات التشويقية)
// Written with professional forensic criminology, deductive investigation, high-octane action, speculative sci-fi, and clean secular fiction.
// Zero theological / takfiri symbols. High-quality vector scene artworks.

import {
  NOVEL_YASMIN_HOUSE,
  NOVEL_ANDROID_CIPHER,
  NOVEL_SHADOWS_NO_TRACE,
} from './userNovelsData';
import {
  SCREEN_SHADOWS_FULL_TEXT_AR,
  DIGITAL_COMPANION_ILLUSION_FULL_TEXT_AR,
} from './articlesData';

export type NovelGenre =
  | 'romance'
  | 'crime_mystery'
  | 'tactical_action'
  | 'sci_fi_future'
  | 'sci_fantasy'
  | 'clinical_stories';

export interface NovelAppendixItem {
  titleAr: string;
  titleEn?: string;
  contentAr: string;
  contentEn?: string;
}

export interface CrimeClue {
  id: string;
  titleAr: string;
  type: 'forensic' | 'digital' | 'psychological' | 'ballistic' | 'toxicology';
  descriptionAr: string;
  forensicLabReportAr: string;
  significanceLevel: 'حاسم' | 'مهم' | 'قرينة ظرفية';
  status: 'تم فحصها وتحريزها' | 'قيد التحليل المخبري' | 'خيط تم تفنيده';
}

export interface SuspectProfile {
  nameAr: string;
  roleAr: string;
  age: number;
  alibiAr: string;
  psychologicalMotiveAr: string;
  behavioralTraitsAr: string[];
  motiveRating: number; // 0-100%
  status: 'المشتبه به الرئيسي' | 'محتجز للتحقيق' | 'مستبعد جنائياً';
}

export interface NovelChapter {
  chapterNumber: number;
  titleAr: string;
  titleEn?: string;
  estimatedMinutes: number;
  wordsCount: number;
  synopsisAr: string;
  synopsisEn?: string;
  sceneIllustrationSvg: string;
  illustrationCaptionAr: string;
  contentAr: string;
  contentEn?: string;
  detectiveNotesAr?: string[];
  investigationClues?: CrimeClue[];
}

export interface Novel {
  id: string;
  titleAr: string;
  titleEn?: string;
  subtitleAr: string;
  subtitleEn?: string;
  genre: NovelGenre;
  genreLabelAr: string;
  genreLabelEn?: string;
  genreBadgeColor: string;
  coverIllustrationSvg: string;
  rating: number;
  readsCount: number;
  totalChapters: number;
  totalWords: number;
  estimatedReadingTime: string;
  authorPersonaAr: string;
  authorTitleAr: string;
  timeSettingAr?: string;
  timeSettingEn?: string;
  placeSettingAr?: string;
  placeSettingEn?: string;
  synopsisAr: string;
  synopsisEn?: string;
  forensicThemeAr: string;
  psychologicalFocusAr: string;
  appendixTitleAr?: string;
  appendixTitleEn?: string;
  appendixItems?: NovelAppendixItem[];
  authorWordAr?: string;
  authorWordEn?: string;
  suspectsDossier?: SuspectProfile[];
  chapters: NovelChapter[];
  fullContinuousTextAr?: string;
  fullContinuousTextEn?: string;
}

export function getFullNovelContinuousText(novel: Novel, lang: 'ar' | 'en' = 'ar'): string {
  if (lang === 'ar' && novel.fullContinuousTextAr) {
    return novel.fullContinuousTextAr;
  }
  if (lang === 'en' && novel.fullContinuousTextEn) {
    return novel.fullContinuousTextEn;
  }

  const isAr = lang === 'ar';
  const parts: string[] = [];
  const title = !isAr && novel.titleEn ? novel.titleEn : novel.titleAr;
  const subtitle = !isAr && novel.subtitleEn ? novel.subtitleEn : novel.subtitleAr;
  const synopsis = !isAr && novel.synopsisEn ? novel.synopsisEn : novel.synopsisAr;

  parts.push(`# ${title}`);
  if (subtitle) parts.push(`**${subtitle}**`);
  parts.push('');
  parts.push(synopsis);
  parts.push('\n---\n');

  novel.chapters.forEach((ch) => {
    const chTitle = !isAr && ch.titleEn ? ch.titleEn : ch.titleAr;
    const chContent = !isAr && ch.contentEn ? ch.contentEn : ch.contentAr;
    parts.push(`## ${chTitle}`);
    parts.push('');
    parts.push(chContent.trim());
    parts.push('\n---\n');
  });

  if (novel.appendixItems && novel.appendixItems.length > 0) {
    novel.appendixItems.forEach((ap) => {
      parts.push(`### ${!isAr && ap.titleEn ? ap.titleEn : ap.titleAr}`);
      parts.push((!isAr && ap.contentEn ? ap.contentEn : ap.contentAr).trim());
      parts.push('');
    });
  }

  if (novel.authorWordAr || novel.authorWordEn) {
    parts.push((!isAr && novel.authorWordEn ? novel.authorWordEn : novel.authorWordAr || '').trim());
  }

  return parts.join('\n');
}

// ==========================================
// 1. CRIME & FORENSIC NOVEL: "شفرة الغرفة 104: بصمات في الظل"
// ==========================================
export const NOVEL_CRIME_104: Novel = {
  id: 'room_104_cipher',
  titleAr: 'شفرة الغرفة 104: بصمات في الظل',
  subtitleAr: 'جريمة الغرفة المغلقة ولغز السم الرقمي في ناطحة سحاب أوريون',
  genre: 'crime_mystery',
  genreLabelAr: 'غموض وجرائم جنائية',
  genreBadgeColor: '#ef4444',
  rating: 4.96,
  readsCount: 28450,
  totalChapters: 4,
  totalWords: 7200,
  estimatedReadingTime: '45 دقيقة',
  authorPersonaAr: 'المحقق الجنائي ساري كنعان',
  authorTitleAr: 'خبير التحقيقات الجنائية والعلوم السلوكية المتقدمة',
  synopsisAr:
    'في ليلة عاصفة تهز أبراج العاصمة، يُعثر على الملياردير ومطور التشفير الجيني "فاروق الأهدل" جثة هامدة داخل جناحه البنتهاوس المحكم الإغلاق في الطابق 54. الأبواب موصدة بأقفال بيومترية من الداخل، وكاميرات المراقبة تظهر عدم دخول أي إنسان. لا كدمات واضحة، ولا أثر لرصاصة. يتولى المحقق المخضرم ساري كنعان القضية ليفكك مسرح الجريمة بأدق الأدلة الميكروسكوبية، كاشفاً لعبة دهاء سيكولوجية قاتلة بين وريثة طامعة، شريك برمجي غامض، وطبيب قلب يخفي سراً دفيناً.',
  forensicThemeAr: 'علم السموم الكيميائية النادرة (Cardiotoxins)، تحليل تناثر الدماء، وتتبع الدلائل البيومترية المعطلة',
  psychologicalFocusAr: 'تحليل شخصية السيكوباتي عالي الأداء (High-Functioning Psychopath)، ودوافع النرجسية الانتقامية',
  coverIllustrationSvg: `
    <svg viewBox="0 0 400 560" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cov1_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#090514"/>
          <stop offset="40%" stop-color="#140c2e"/>
          <stop offset="100%" stop-color="#2a0815"/>
        </linearGradient>
        <radialGradient id="cov1_light" cx="60%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="cov1_glow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#818cf8" stop-opacity="0.1"/>
        </linearGradient>
      </defs>
      <rect width="400" height="560" fill="url(#cov1_bg)"/>
      <rect width="400" height="560" fill="url(#cov1_light)"/>
      
      <!-- Tower Skyline in Rain -->
      <path d="M40,560 L40,320 L75,320 L75,560 Z" fill="#0f172a" opacity="0.8"/>
      <path d="M90,560 L90,260 L140,260 L140,560 Z" fill="#1e1b4b" opacity="0.85"/>
      <path d="M160,560 L160,180 L230,180 L230,560 Z" fill="#0b0f19" opacity="0.95"/>
      <!-- Orion Penthouse Window Glowing Crimson -->
      <rect x="175" y="210" width="40" height="50" rx="3" fill="#ef4444" opacity="0.75"/>
      <line x1="195" y1="210" x2="195" y2="260" stroke="#000" stroke-width="2"/>
      <line x1="175" y1="235" x2="215" y2="235" stroke="#000" stroke-width="2"/>
      <path d="M250,560 L250,290 L290,290 L290,560 Z" fill="#1e1b4b" opacity="0.8"/>
      <path d="M310,560 L310,350 L360,350 L360,560 Z" fill="#0f172a" opacity="0.7"/>

      <!-- Rain lines -->
      <g stroke="#94a3b8" stroke-width="0.8" opacity="0.25">
        <line x1="30" y1="20" x2="10" y2="100"/>
        <line x1="90" y1="40" x2="70" y2="130"/>
        <line x1="160" y1="10" x2="140" y2="120"/>
        <line x1="240" y1="50" x2="220" y2="150"/>
        <line x1="320" y1="30" x2="300" y2="140"/>
        <line x1="380" y1="60" x2="360" y2="170"/>
      </g>

      <!-- Forensic Fingerprint Graphic Silhouette -->
      <g transform="translate(145, 330) scale(1.1)" stroke="#f43f5e" stroke-width="2.2" fill="none" opacity="0.85">
        <path d="M50,15 Q50,45 50,75"/>
        <path d="M40,25 Q35,50 42,85"/>
        <path d="M60,25 Q65,50 58,85"/>
        <path d="M30,35 Q23,60 34,95"/>
        <path d="M70,35 Q77,60 66,95"/>
        <path d="M20,50 Q12,75 26,105"/>
        <path d="M80,50 Q88,75 74,105"/>
      </g>

      <!-- Crime Scene Tape Overlay at Bottom -->
      <g transform="rotate(-6, 200, 500)">
        <rect x="-30" y="475" width="460" height="34" fill="#fbbf24" opacity="0.92"/>
        <text x="200" y="498" font-family="monospace" font-size="13" font-weight="900" fill="#000" text-anchor="middle" letter-spacing="4">
          POLICE CRIME SCENE • خط التحقيق الجنائي 104 • DO NOT CROSS
        </text>
      </g>
    </svg>
  `,
  suspectsDossier: [
    {
      nameAr: 'نادين الأهدل',
      roleAr: 'ابنة الضحية الكبرى ومديرة المحفظة الاستثمارية',
      age: 32,
      alibiAr: 'تدعي أنها كانت في حفل خيري بوسط المدينة حتى منتصف الليل، لكن كاميرات الموقف سجلت مغادرة سيارتها لمدة 34 دقيقة غير مبررة.',
      psychologicalMotiveAr: 'اكتشافها قبل يومين أن والدها كان يعتزم تعديل وصيته ونقل ملكية شفرات البلوكشين إلى مؤسسة خيرية دولية.',
      behavioralTraitsAr: ['برود انفعالي مدروس', 'إجابات مقتضبة تتجنب التواصل البصري المطول', 'نرجسية خفية'],
      motiveRating: 88,
      status: 'المشتبه به الرئيسي',
    },
    {
      nameAr: 'المهندس كريم الشافعي',
      roleAr: 'كبير مهندسي التشفير البيومتري وشريك الضحية التقني',
      age: 41,
      alibiAr: 'متواجد في معمل الأبحاث بالطابق 42، مسجل دخوله عبر البوابة الإلكترونية طوال ساعات الليل.',
      psychologicalMotiveAr: 'خلافات مالية واحتكار الضحية لحقوق براءة اختراع "المفتاح الجزيئي"، مهدداً بإلغاء عقده وطرده.',
      behavioralTraitsAr: ['توتر ملحوظ وفرك مستمر للأصابع', 'معرفة عميقة بأنظمة أمان المبنى ونقاطها العمياء'],
      motiveRating: 75,
      status: 'محتجز للتحقيق',
    },
    {
      nameAr: 'د. يوسف التازي',
      roleAr: 'طبيب القلب الخاص للضحية وصديق العائلة القديم',
      age: 58,
      alibiAr: 'في عيادته الخاصة حتى العاشرة مساءً ثم توجه لمنزله حسب إفادة البواب.',
      psychologicalMotiveAr: 'وجود شيك مصرفي ضخم موقع باسمه تم تجميده قبل أسبوع من الوفاة بسبب شكوى من الضحية بسوء الأمانة.',
      behavioralTraitsAr: ['دفاعي للغاية عند سؤاله عن الأدوية الموصوفة', 'محاولات متكررة لتوجيه التهمة نحو سكتة قلبية طبيعية'],
      motiveRating: 65,
      status: 'محتجز للتحقيق',
    },
  ],
  chapters: [
    {
      chapterNumber: 1,
      titleAr: 'الفصل الأول: هدوء ما بعد الصاعقة في الطابق 54',
      estimatedMinutes: 12,
      wordsCount: 1850,
      synopsisAr: 'المحقق كنعان يصل لمسرح الجريمة وسط أمطار غزيرة. باب الجناح موصد بيومترياً، وجثة الملياردير مستلقية أمام مكتبه الخشبي الفاخر دون قطرة دم واحدة.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ch1_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#050814"/>
              <stop offset="60%" stop-color="#111827"/>
              <stop offset="100%" stop-color="#1f1124"/>
            </linearGradient>
            <radialGradient id="ch1_spot" cx="45%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.3"/>
              <stop offset="100%" stop-color="#000" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <rect width="600" height="320" fill="url(#ch1_grad)"/>
          <rect width="600" height="320" fill="url(#ch1_spot)"/>
          
          <!-- Large Glass Penthouse Window with Rain & Lightning Flash -->
          <rect x="50" y="30" width="500" height="180" rx="8" fill="#0f172a" stroke="#334155" stroke-width="2"/>
          <path d="M280,30 L260,110 L300,110 L270,210" stroke="#fef08a" stroke-width="2.5" fill="none" opacity="0.8"/>
          
          <!-- Penthouse Desk Silhouette -->
          <rect x="180" y="200" width="240" height="40" rx="4" fill="#1e1b4b"/>
          <!-- The Fallen Goblet / Crystal Glass -->
          <ellipse cx="230" cy="215" rx="7" ry="4" fill="#38bdf8" opacity="0.8"/>
          <path d="M237,215 Q260,225 290,222" stroke="#38bdf8" stroke-width="2" fill="none" opacity="0.6"/>
          
          <!-- Detective Silhouette in Trenchcoat holding Flashlight -->
          <g transform="translate(430, 140)">
            <ellipse cx="25" cy="18" rx="14" ry="16" fill="#020617"/>
            <path d="M10,34 L40,34 L52,140 L-2,140 Z" fill="#020617"/>
            <!-- Flashlight Beam -->
            <polygon points="5,70 -160,20 -160,140" fill="#38bdf8" opacity="0.18"/>
            <circle cx="5" cy="70" r="4" fill="#bae6fd"/>
          </g>

          <!-- Evidence Marker #1 Yellow Tent -->
          <polygon points="210,240 226,240 218,225" fill="#facc15" stroke="#000" stroke-width="1"/>
          <text x="218" y="238" font-size="9" font-weight="900" fill="#000" text-anchor="middle">1</text>
        </svg>
      `,
      illustrationCaptionAr: 'معاينة المحقق ساري لمسرح الجريمة: كأس الكريستال الملقى بجوار شاشة العرض المشفرة تحت وميض البرق.',
      detectiveNotesAr: [
        'درجة حرارة الكبد للجثة تشير إلى أن الوفاة حدثت بين الساعة 10:45 و 11:15 مساءً.',
        'قفل الباب الإيطالي المغناطيسي لا يحتوي على أي خدوش ميكانيكية، مما يستبعد كسر القفل بالقوة.',
        'لا أثر للمقاومة على ثياب الضحية؛ كان يعرف الجاني أو استسلم لغفلة مفاجئة.',
      ],
      investigationClues: [
        {
          id: 'clue_glass_crystal',
          titleAr: 'كأس الكريستال السويسري المنكفئ',
          type: 'toxicology',
          descriptionAr: 'كأس ماء مقطر يحمل بقايا قطرات رطبة وبصمة شفة علوية تخص الضحية.',
          forensicLabReportAr: 'فحص مطياف الكتلة (Mass Spectrometry) أظهر وجود آثار لمركب قلوي مستخلص من نبات الدفلى السام (Oleandrin)، وهو سم عصبي يوقف نبضات عضلة القلب فورياً دون إحداث رغوة أو تشنجات صاخبة.',
          significanceLevel: 'حاسم',
          status: 'تم فحصها وتحريزها',
        },
        {
          id: 'clue_door_log',
          titleAr: 'سجل البوابة البيومترية المشفرة',
          type: 'digital',
          descriptionAr: 'السجل الإلكتروني للبنتهاوس في الطابق 54 يظهر قفل الباب من الداخل الساعة 10:18 مساءً برمز المرور الخاص بالضحية.',
          forensicLabReportAr: 'تحليل البرمجيات كشف عن ثغرة بقاء إشارة البلوتوث نشطة لعدة دقائق عبر معالج خارجي مقترن من مصعد الخدمة الخلفي.',
          significanceLevel: 'حاسم',
          status: 'قيد التحليل المخبري',
        },
      ],
      contentAr: `
كان المطر ينهمر بضراوة على الزجاج البانورامي للطابق الرابع والخمسين، محولاً أضواء مدينة الرياض الشاهقة إلى بقع ضبابية متوهجة كأنها حطام نجوم غارقة في محيط داكن.

وقف المحقق ساري كنعان داخل الجناح، مشبكاً يديه خلف معطفه الجلدي الأسود، متنفساً رائحة السيجار الفاخر الممتزجة بنسمات هواء التكييف البارد. أمامه، ملقىً على سجادة أصفهان العتيقة، كان يرقد فاروق الأهدل؛ الرجل الذي بلغت إمبراطوريته البرمجية مليارات الدولارات، وقد جمدت عيناه المفتوحتان في نظرة دهشة مروعة نحو سقف الغرفة المزخرف.

"لا وجود لأي أثر للاقتحام يا سيدي المحقق"، قال الملازم أول فهد وهو يدون ملاحظاته على جهازه اللوحي. "الباب الخارجي مصفح بصلب الفولاذ المقاوم للمتفجرات، مزود بماسح بصمة العين، ونظام التعرف على الصوت. آخر حركة مسجلة كانت دخوله بمفرده في العاشرة والربع. المفتاح الجزيئي الوحيد كان بحوزته، والنافذة محكمة الإغلاق من الداخل بأقفال هيدروليكية. نحن أمام لغز الغرفة المغلقة المستحيل."

انحنى ساري ببطء على ركبة واحدة، وارتدى قفازات اللاتكس الزرقاء بمرونة رجل خاض مئات مسارح الجرائم عبر عشرين عاماً في فرقة مكافحة الجنايات الكبرى. اقترب من فم الضحية، ثم أضاء مصباح الأشعة فوق البنفسجية المصغر الذي يحمله في جيب سترته. لم تكن هناك كدمات حول العنق، ولا زرقة دالة على الاختناق الميكانيكي، ولا قطرة دم واحدة على أرضية الصالة.

"الموتى يتحدثون دائماً يا فهد.. إنهم فقط يحتاجون من يجيد الاستماع إلى صمتهم"، همس كنعان بنبرة هادئة عميقة تشي بتركيز حاد لا تشوبه شائبة.

سلط ساري الضوء فوق الطاولة الزجاجية المجاورة لأريكة الجلد الإيطالية. على حافتها، استقر كأس كريستالي منكفئ، وقد سالت منه قطرات سائل شفافة جفت حوافها بفعل تدفق الهواء البارد. وجه عدسته المكبرة الجنائية نحو حافة الكأس؛ هناك لمعت طبقة ميكروسكوبية شمعية لزجة لا تُرى بالعين المجردة.

"أحضر أنبوب التحريز الكيميائي وشرائط كشف الفسفور فوراً"، أمر ساري دون أن يرفع عينيه عن الكأس. "هذا الرجل لم تصبه سكتة قلبية طبيعية كما يريد لنا الطبيب الشرعي المبتدئ أن نعتقد. انظر إلى قاع الكأس، هذا التعتيم الدائري الصغير يشير إلى تحلل مذيب نفاث تم تسخينه لدرجة حرارة الغرفة قبل سكبه بدقائق."

نهض ساري وتجول في أرجاء المكتب الفسيح. مر بجوار شاشة العرض الجدارية العملاقة؛ كانت ما تزال تعرض خطوط كود برمجي مشفر يتوقف فجأة عند السطر 1,024 مع وميض أحمر متقطع: [تم إلغاء نقل المفتاح السيبراني: خطأ في مطابقة البصمة الحيوية].

"الساعة تشير إلى أن الخطأ البرمجي حدث في تمام الساعة 11:03 مساءً"، قال ساري وهو يحدق في انعكاس وجهه على الشاشة المظلمة. "الجاني لم يكن يبحث عن سرقة ساعات رولكس أو سبائك الذهب المودعة في الخزنة الجدارية.. لقد جاء من أجل شفرة التشفير الحيوي التي تتحكم في بنية الخوارزميات المستقبلية للشركة. ولم يخرج من الباب كما تظن يا فهد."

التفت ساري نحو فتحة التهوية المركزية العلوية المغطاة بشبك نحاسي دقيق. أخرج من جيبه مسطرة ليزرية لقياس المسافات وأطلق شعاعاً أحمر نحوه.
"الشبك النحاسي سليم تماماً، لكن انظر إلى مسامير التثبيت الجانبية؛ هناك ذرات غبار متساقطة على حافة الرف الخشبي أسفله. الجاني لم يمر بجسده من هناك، بل أرسل شيئاً أدق.. وربما شخصاً أذكى بكثير مما نتخيل."
      `,
    },
    {
      chapterNumber: 2,
      titleAr: 'الفصل الثاني: الاستجواب ولعبة الميكرو-تعبيرات',
      estimatedMinutes: 14,
      wordsCount: 2100,
      synopsisAr: 'في غرفة الاجتماعات الزجاجية بالطابق 50، يجلس ساري لمواجهة المشتبه بهم الثلاثة. مستخدماً تقنيات الاستجواب النفسي وقراءة لغة الجسد الميكروسكوبية، تبدأ أقنعة البراءة بالتصدع.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ch2_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0a0f1d"/>
              <stop offset="100%" stop-color="#1e1026"/>
            </linearGradient>
          </defs>
          <rect width="600" height="320" fill="url(#ch2_grad)"/>
          
          <!-- Interrogation Table & Overhead Cone Light -->
          <polygon points="260,0 340,0 480,320 120,320" fill="#fbbf24" opacity="0.08"/>
          <ellipse cx="300" cy="220" rx="140" ry="45" fill="#1e293b" stroke="#475569" stroke-width="2"/>
          
          <!-- Suspect Silhouette (Nadine) -->
          <g transform="translate(180, 110)">
            <ellipse cx="25" cy="20" rx="14" ry="16" fill="#334155"/>
            <path d="M10,36 L40,36 L48,110 L2,110 Z" fill="#1e293b"/>
            <!-- Crossed arms defensive posture -->
            <path d="M5,55 Q25,75 45,55" stroke="#f43f5e" stroke-width="3" fill="none"/>
          </g>

          <!-- Detective SARI Silhouette -->
          <g transform="translate(370, 95)">
            <ellipse cx="25" cy="22" rx="16" ry="18" fill="#0f172a"/>
            <path d="M6,40 L44,40 L56,130 L-6,130 Z" fill="#0f172a"/>
            <!-- Notebook and Pen -->
            <rect x="-8" y="75" width="22" height="30" rx="2" fill="#e2e8f0"/>
          </g>

          <!-- Holographic Waveform / Voice Stress Analyzer -->
          <path d="M120,70 Q180,30 240,70 T360,70 T480,70" stroke="#38bdf8" stroke-width="2" fill="none" opacity="0.6"/>
          <circle cx="280" cy="70" r="4" fill="#ef4444"/>
          <text x="300" y="55" font-size="11" font-family="monospace" fill="#ef4444" font-weight="bold">VOICE STRESS: ELEVATED (94%)</text>
        </svg>
      `,
      illustrationCaptionAr: 'غرفة التحقيق التكتيكية: المحقق كنعان يحلل نبرات الصوت وموجات التوتر العصبي في مواجهة المشتبه بهم.',
      detectiveNotesAr: [
        'نادين تحرك خاتم يدها اليسرى كلما ذُكرت شفرة البنتهاوس في الساعة الحادية عشرة، ما يدل على قلق إجرائي عميق.',
        'المهندس كريم يظهر انخفاضاً حاداً في رمش العينين (Blink rate suppression)؛ آلية نموذجية للسيطرة على كذبة معدة سلفاً.',
        'الدكتور التازي يعاني من رعشة خفية في العضلة الصدغية للفك عند التطرق إلى مركب الدفلى السام.',
      ],
      investigationClues: [
        {
          id: 'clue_nadine_car',
          titleAr: 'بيانات نظام الملاحة لسيارة نادين',
          type: 'digital',
          descriptionAr: 'سيارة نادين الفارهة أوقفت إشارة الـ GPS لمدة 34 دقيقة بالقرب من محطة محولات أوريون الكهربائية.',
          forensicLabReportAr: 'تأكيد حدوث انخفاض جزئي في تيار الطاقة لمصعد الخدمة رقم 3 في الدقيقة 10:48 مساءً، يتطابق مع وقت إطفاء نظام الملاحة.',
          significanceLevel: 'حاسم',
          status: 'تم فحصها وتحريزها',
        },
      ],
      contentAr: `
كانت غرفة الاستجواب الزجاجية في الطابق الخمسين أشبه بحوض أسماك بارد يطل على الفراغ الأسود للمدينة. جلس المحقق ساري كنعان واضعاً ملفه الجلدي أمامه بهدوء، بينما كان الملازم فهد يضبط كاميرات التسجيل عالية الدقة القادرة على رصد 120 إطاراً في الثانية لالتقاط أدق التشنجات العضلية غير الإرادية.

جلست نادين الأهدل في مواجهته، مرتدية سترة كشميرية سوداء أنيقة. كانت يداها متشابكتين بإحكام فوق الطاولة، ورأسها مرفوعاً باستعلاء مدروس بعناية، لكن ساري لم يكن ينظر إلى عينيها الباردتين، بل إلى الشريان السباتي على الجانب الأيمن من عنقها، والذي كان ينبض بوتيرة أسرع بمرتين من التنفس الهادئ المصطنع الذي كانت تظهره.

"أعلم أنكِ تمرين بظرف عصيب يا آنسة نادين"، بدأ ساري بصوت دافئ ورخيم يبعث على الاسترخاء، وهي استراتيجية كلاسيكية لخفض الدفاعات العقلية للمفحوص. "لكن هناك ثلاثين دقيقة تائهة بين الساعة العاشرة وأربعين دقيقة والحادية عشرة والربع.. لم تستطع كاميرات حفل المؤسسة الخيرية توثيق وجودك فيها. أين كنتِ؟"

رمشت نادين ثلاث مرات متتالية بسرعة قبل أن تثبت نظرتها، وقالت بصوت متماسك:
"كنت في شرفة الحديقة الخلفية للقاعة، أحاول استنشاق بعض الهواء والرد على رسائل بريدية عاجلة تخص المحفظة الاستثمارية. هل أصبح البحث عن الهدوء جريمة في عرفكم يا محقق؟"

ابتسم ساري نصف ابتسامة، وأخرج من ملفه صورة مكبرة مأخوذة من كاميرا مرور تقع عند تقاطع شارع الملك فهد الخلفي.
"الهدوء ليس جريمة يا آنسة.. لكن سيارتك البورش كايين السوداء شوهدت تتوقف على بعد خمسين متراً من المخرج الطارئ لمبنى أوريون في تمام الساعة العاشرة واثنين وخمسين دقيقة. وفي تلك الدقيقة تحديداً، انقطع التيار الكهربائي عن كاميرات مصعد الخدمة الداخلي."

تصلب فك نادين، واختفت حمرة شفتيها تحت وطأة انقباض دموي مفاجئ. فركت خاتمها الماسي بإبهامها الأيسر بقوة كادت تجرح جلدها.
"هذا محض صدفة.. سائقي ربما كان يشتري بعض الأغراض."

"سائقك الخاص محتجز في غرفة الانتظار المجاورة منذ نصف ساعة"، قاطعها ساري بنبرة قاطعة كالسكين. "وقد اعترف بالفعل أنكِ طلبتِ منه تعطيل شريحة التعقب، وأنكِ صعدتِ بمفتاح التجاوز الأمني الذي أعطاكِ إياه المهندس كريم الشافعي."

فتح ساري الباب الزجاجي المشترك، حيث كان يقبع كريم الشافعي محاطاً برجال الأدلة الجنائية. كان الشافعي يتصبب عرقاً، ونظارته الطبية تنزلق باستمرار على أنفه.

"هل نخبرها يا كريم بما وجدناه داخل وحدة التكييف المركزية في معملك؟"، قال ساري وهو يحدق في المهندس الشاب.
انهار كريم على الطاولة ووضع رأسه بين يديه صارخاً:
"أقسم لك يا ساري.. لم أكن أعلم أنها ستقتله! أخبرتني نادين أنها تريد فقط الدخول لنسخ كود المحفظة قبل أن يعلن والدها نقل الأصول في الصباح! أعطيتها شريحة التردد الراديوي لفتح صمام التكييف.. لكنها قالت إنها ستعطيه فقط مهيئاً منوماً ليغفو لساعتين!"

نظرت نادين إلى شريكها بنظرة احتقار قاتلة، وتحول قناع البراءة الملكي إلى ملامح غضب وحشي متجرد من أي تعاطف إنساني؛ الصورة الكلاسيكية للشخصية السيكوباتية التي تسقط دفاعاتها فجأة حين تواجه بالحقيقة التي لا مفر منها.
      `,
    },
    {
      chapterNumber: 3,
      titleAr: 'الفصل الثالث: فيزياء السم والأثر الخفي',
      estimatedMinutes: 11,
      wordsCount: 1650,
      synopsisAr: 'في المختبر الجنائي المركزي، يشرف ساري على إعادة تركيب مسار الجريمة الفيزيائي. كيف دخل السم إلى الكأس المغلقة؟ الحل يكمن في تقنية المايكرو-دروب عبر تيار الهواء النفاث.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ch3_lab" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#022c22"/>
              <stop offset="50%" stop-color="#064e3b"/>
              <stop offset="100%" stop-color="#020617"/>
            </linearGradient>
          </defs>
          <rect width="600" height="320" fill="url(#ch3_lab)"/>
          
          <!-- Forensic Microscope & Chemical Molecule Grid -->
          <circle cx="150" cy="160" r="90" fill="#047857" opacity="0.25" stroke="#10b981" stroke-width="2"/>
          <!-- Molecular structure of Oleandrin toxin -->
          <g stroke="#34d399" stroke-width="2" fill="#065f46">
            <circle cx="110" cy="130" r="8"/>
            <line x1="110" y1="130" x2="150" y2="110"/>
            <circle cx="150" cy="110" r="8"/>
            <line x1="150" y1="110" x2="190" y2="130"/>
            <circle cx="190" cy="130" r="8"/>
            <line x1="190" y1="130" x2="190" y2="170"/>
            <circle cx="190" cy="170" r="8"/>
            <line x1="190" y1="170" x2="150" y2="190"/>
            <circle cx="150" cy="190" r="8"/>
            <line x1="150" y1="190" x2="110" y2="170"/>
            <circle cx="110" cy="170" r="8"/>
            <line x1="110" y1="170" x2="110" y2="130"/>
          </g>
          <text x="150" y="220" font-family="monospace" font-size="10" fill="#a7f3d0" text-anchor="middle" font-weight="bold">OLEANDRIN C32H48O9 (TOXIC: 0.04mg/L)</text>

          <!-- 3D Drone Delivery Simulation Graphic on Lab Monitor -->
          <rect x="330" y="70" width="230" height="170" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
          <path d="M370,180 L430,120 L480,140 L530,90" stroke="#f43f5e" stroke-width="2.5" fill="none" stroke-dasharray="4,4"/>
          <circle cx="430" cy="120" r="5" fill="#facc15"/>
          <text x="445" y="115" font-size="9" fill="#facc15" font-family="monospace">MICRO-INJECT POINT</text>
        </svg>
      `,
      illustrationCaptionAr: 'المختبر الجنائي الرقمي: تفكيك البنية الجزيئية للسم وتتبع مسار الرذاذ النفاث عبر فتحة التهوية الذكية.',
      detectiveNotesAr: [
        'المادة السامة لم توضع يدوياً داخل الكأس، بل تم حقنها في أنبوب توزيع الثلج الأوتوماتيكي داخل ثلاجة البنتهاوس.',
        'الدكتور التازي استغل وظيفته الطبية لتأمين مركب الدفلى النقي تحت ستار أبحاث تنظيم ضربات القلب المعتمدة.',
      ],
      investigationClues: [
        {
          id: 'clue_ice_machine',
          titleAr: 'مكعبات الثلج الجافة المشبعة بالسم',
          type: 'forensic',
          descriptionAr: 'قالب صنع الثلج الفوري في بار البنتهاوس يحمل بقايا سائل غير متجمد يحتوي على تركيز عالي من الأوليندرين.',
          forensicLabReportAr: 'ذوبان مكعب الثلج في كأس الماء استغرق 12 دقيقة، مما منح الجاني الوقت الكافي للابتعاد مسافة 5 كيلومترات قبل حدوث الوفاة.',
          significanceLevel: 'حاسم',
          status: 'تم فحصها وتحريزها',
        },
      ],
      contentAr: `
في القبو السفلي للمختبر الجنائي التابع لشرطة العاصمة، كانت أجهزة الطرد المركزي وأعمدة التحليل اللوني (Chromatography) تصدر طنيناً رتيباً يعكس صرامة المنهج العلمي في ملاحقة الجريمة.

وقف دكتور الأدلة الجنائية طارق بجوار شاشة التحليل الطيفي، مشيراً بمؤشره الضوئي نحو رسم بياني لقمم الامتصاص الجزيئي:
"أنت محق تماماً يا ساري.. لم يكن هناك أي رذاذ في فتحة التهوية كما ظن كريم. الجاني كان أخبث بكثير. لقد فحصنا ماكينة صنع الثلج الأوتوماتيكية في جناح الضحية؛ وجدنا كبسولة جيلاتينية دقيقة تم إدخالها عبر خرطوم تزويد المياه المفلترة."

أضاء كنعان سيجاره ونفث دخانه بهدوء وهو يتأمل الشاشة:
"مكعب الثلج القاتل.. الكبسولة كانت مبرمجة لتذوب فقط حين يلامسها ماء بدرجة حرارة 18 مئوية. وضع الضحية مكعب الثلج في كأسه في العاشرة والنصف، وجلس أمام شاشته. ذاب الثلج ببطء، وتصاعد السم إلى مجرى دمه عبر أول رشفة دون أن يشعر بأي طعم أو رائحة مميزة."

"ومن يملك القدرة على تصنيع كبسولة طبية تتحلل بتلك الدقة الحرارية؟"، سأل فهد بحماس.

التفت ساري نحو طاولة التحريز، حيث استقرت أوراق السجل الطبي لفاروق الأهدل.
"الدكتور يوسف التازي.. هو الوحيد الذي يمتلك مختبراً خاصاً مرخصاً للكبسولات النانوية المضبوطة حرارياً. نادين خططت للاستحواذ، كريم وفر الثغرة الإلكترونية للدخول، لكن التازي هو من صنع أداة الموت بيديه الباردتين، مقابل إلغاء دعوى خيانة الأمانة وحصوله على حصة مجزية من أصول الشركة في سويسرا."

رفع ساري هاتفه اللاسلكي وضغط زر الاتصال المباشر:
"فريق المداهمة الثاني.. تحركوا فوراً إلى مطار الملك خالد الدولي، الصالة التنفيذية الخاصة. الدكتور التازي يحمل تذكرة سفر على الرحلة المتجهة إلى جنيف في تمام الثانية صباحاً. اعتقلوه بموجب المادة 41 بتهمة القتل العمد المشترك مع سبق الإصرار والترصد."
      `,
    },
    {
      chapterNumber: 4,
      titleAr: 'الفصل الرابع: خيوط الحقيقة واكتمال الدليل الجنائي',
      estimatedMinutes: 8,
      wordsCount: 1600,
      synopsisAr: 'المحقق كنعان يجمع خيوط القضية كاملة في تقريره النهائي. اعترافات متطابقة، وسقوط الخلية الإجرامية الثلاثية تحت وطأة الأدلة القاطعة والتحليل السيكومتري الدقيق.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ch4_end" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#0f172a"/>
              <stop offset="100%" stop-color="#1e1b4b"/>
            </linearGradient>
          </defs>
          <rect width="600" height="320" fill="url(#ch4_end)"/>
          
          <!-- Dawn breaking over skyline behind Police Headquarters -->
          <rect x="0" y="240" width="600" height="80" fill="#020617"/>
          <path d="M0,240 Q300,160 600,240" fill="#f43f5e" opacity="0.2"/>
          
          <!-- Evidence Board Silhouette with connecting red strings -->
          <rect x="80" y="40" width="440" height="190" rx="8" fill="#1e293b" stroke="#334155" stroke-width="2"/>
          
          <!-- Photo pins -->
          <circle cx="140" cy="90" r="14" fill="#ef4444"/>
          <circle cx="300" cy="90" r="14" fill="#38bdf8"/>
          <circle cx="440" cy="90" r="14" fill="#facc15"/>
          <circle cx="300" cy="170" r="18" fill="#10b981"/>

          <!-- Connecting strings -->
          <line x1="140" y1="90" x2="300" y2="170" stroke="#f43f5e" stroke-width="2.5"/>
          <line x1="300" y1="90" x2="300" y2="170" stroke="#f43f5e" stroke-width="2.5"/>
          <line x1="440" y1="90" x2="300" y2="170" stroke="#f43f5e" stroke-width="2.5"/>

          <text x="300" y="215" font-size="12" font-family="sans-serif" font-weight="900" fill="#fff" text-anchor="middle">
            تم إغلاق ملف القضية بنجاح • CASE CLOSED
          </text>
        </svg>
      `,
      illustrationCaptionAr: 'لوحة التحقيق الجنائي المكتملة في مكتب المباحث: ربط الأدلة الرقمية والسمومية واكتمال الدائرة حول الجناة.',
      detectiveNotesAr: [
        'تطابقت البصمات الجينية للتازي على محقن الكبسولة المعثور عليه في سلة مهملات استراحة المطار.',
        'تم استرداد الشفرات الرقمية للشركة وتأمين حسابات الضحية وفق وصيته الرسمية المسجلة.',
      ],
      contentAr: `
مع بزوغ أولى خيوط فجر الرياض من وراء السحاب المنقشع، كانت صالة المباحث الجنائية تغرق في هدوء مهيب بعد ليلة عاصفة استمرت ثماني ساعات متواصلة من الملاحقة والتدقيق الحثيث.

على لوحة الفلين الكبيرة خلف مكتب كنعان، كانت الصور والأدلة والتقارير الطبية متصلة بخيوط حمراء تلتقي جميعها في نقطة مركزية واحدة: جشع نادين الأهدل النرجسي، وضعف كريم التقني، وخيانة الطبيب التازي لقسم مهنته الإنسانية.

دخل الملازم أول فهد حاملاً كوبين من القهوة الساخنة، ووضع أحدهما أمام ساري بامتنان وإعجاب لا يوصف.
"تم إلقاء القبض على التازي قبل صعوده سلم الطائرة بخمس دقائق.. وُجدت في حقيبته اليدوية جوازات سفر مزورة ودفتر شيكات مشبوه. وعندما واجهناه بتقرير الكبسولة النانوية، انهار واعترف بكل شيء تفصيلاً."

أخذ ساري رشفة من قهوته، ونظر من نافذة مكتبه نحو برج أوريون الذي كان يلمع بعيداً تحت أشعة الصباح الأولى.

"الجريمة يا فهد مثل بناء هندسي زائف.. مهما بدت جدرانه الخارجية مصقولة ومحكمة كأنها لغز مغلق مستحيل، فإن الجشع يترك دائماً شرخاً مجهرياً لا يراه إلا من يبحث بعين العالم المتجرد وعقل المحقق الصبور."

أغلق ساري الملف الجلدي الأحمر، وختمه بالختم الرسمي البارز: [أحيلت إلى النيابة العامة - القضية مكتملة الأدلة القطعية]. ثم وضع معطفه على شماعة الباب، مستعداً لساعات نوم مستحقة قبل أن يدق جرس البلاغ التالي.
      `,
    },
  ],
};

// ==========================================
// 2. TACTICAL ACTION NOVEL: "بروتوكول العقرب الأسود: عملية الفجر الأحمر"
// ==========================================
export const NOVEL_TACTICAL_ACTION: Novel = {
  id: 'black_scorpion_protocol',
  titleAr: 'بروتوكول العقرب الأسود: عملية الفجر الأحمر',
  subtitleAr: 'مهمة تكتيكية سرية خلف خطوط منظمة الظل العابرة للحدود',
  genre: 'tactical_action',
  genreLabelAr: 'أكشن ومطاردات تكتيكية',
  genreBadgeColor: '#f97316',
  rating: 4.94,
  readsCount: 22100,
  totalChapters: 3,
  totalWords: 5400,
  estimatedReadingTime: '35 دقيقة',
  authorPersonaAr: 'العقيد ريان الصقر',
  authorTitleAr: 'قائد فرقة العمليات التكتيكية الخاصة والاستطلاع الميداني',
  synopsisAr:
    'عندما تخترق شبكة مسلحة مجهولة الهوية محطة الأقمار الصناعية الاستراتيجية في صحراء الربع الخالي، يتم استدعاء قائد العمليات التكتيكية ريان الصقر وفريقه النخبوي لتنفيذ عملية إنزال جوي ليلي حاسم. مطاردات سرعة قصوى على الكثبان الرملية، اشتباكات تكتيكية تحبس الأنفاس، ومواجهة استخباراتية إلكترونية لكشف مخطط تفجير خطوط الطاقة قبل شروق الشمس.',
  forensicThemeAr: 'التحليل التكتيكي للأسلحة النارية، تتبع الاتصالات المشفرة عبر الأقمار، واقتفاء الأثر الميداني في الصحراء',
  psychologicalFocusAr: 'سيكولوجية اتخاذ القرار تحت نيران العدو، وضبط الأدرينالين والهدوء الذهني في المواقف الحرجة',
  coverIllustrationSvg: `
    <svg viewBox="0 0 400 560" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cov2_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1c0c04"/>
          <stop offset="50%" stop-color="#2d1305"/>
          <stop offset="100%" stop-color="#0a0502"/>
        </linearGradient>
        <radialGradient id="cov2_fire" cx="50%" cy="70%" r="60%">
          <stop offset="0%" stop-color="#f97316" stop-opacity="0.6"/>
          <stop offset="50%" stop-color="#ef4444" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="560" fill="url(#cov2_bg)"/>
      <rect width="400" height="560" fill="url(#cov2_fire)"/>

      <!-- Tactical Satellite Dish Station Silhouette -->
      <path d="M120,380 A90,90 0 0,1 280,380 L200,310 Z" fill="#1e293b" opacity="0.9"/>
      <line x1="200" y1="310" x2="200" y2="240" stroke="#f97316" stroke-width="3"/>
      <circle cx="200" cy="235" r="6" fill="#facc15"/>
      <line x1="160" y1="380" x2="140" y2="440" stroke="#334155" stroke-width="4"/>
      <line x1="240" y1="380" x2="260" y2="440" stroke="#334155" stroke-width="4"/>

      <!-- Desert Dunes -->
      <path d="M-20,440 Q120,410 240,460 T420,430 L420,560 L-20,560 Z" fill="#431407" opacity="0.95"/>
      <path d="M-20,490 Q160,460 320,510 T420,480 L420,560 L-20,560 Z" fill="#1f0a04"/>

      <!-- Stealth Helicopter Silhouette in Dusk -->
      <g transform="translate(140, 80) scale(0.85)">
        <ellipse cx="120" cy="50" rx="60" ry="18" fill="#0f172a"/>
        <rect x="50" y="46" width="30" height="8" rx="2" fill="#0f172a"/>
        <line x1="40" y1="30" x2="200" y2="30" stroke="#0f172a" stroke-width="4"/>
        <path d="M160,50 L240,40 L240,55 Z" fill="#0f172a"/>
      </g>

      <!-- Laser Sniper Crosshair Graphic -->
      <circle cx="200" cy="270" r="45" stroke="#ef4444" stroke-width="1.8" fill="none" opacity="0.75"/>
      <circle cx="200" cy="270" r="18" stroke="#ef4444" stroke-width="1" fill="none" opacity="0.75"/>
      <line x1="140" y1="270" x2="260" y2="270" stroke="#ef4444" stroke-width="1.5"/>
      <line x1="200" y1="210" x2="200" y2="330" stroke="#ef4444" stroke-width="1.5"/>

      <!-- Title Banner overlay -->
      <rect x="30" y="475" width="340" height="42" rx="10" fill="#000000" opacity="0.8" stroke="#f97316" stroke-width="1.5"/>
      <text x="200" y="502" font-family="sans-serif" font-size="14" font-weight="900" fill="#f97316" text-anchor="middle">
        OPERATION RED DAWN • التكتيك والمناورة
      </text>
    </svg>
  `,
  chapters: [
    {
      chapterNumber: 1,
      titleAr: 'الفصل الأول: السقوط الحر في وادي الصمت',
      estimatedMinutes: 12,
      wordsCount: 1800,
      synopsisAr: 'إنزال مظلي ليلي من ارتفاع 12 ألف قدم بدون رادار (HALO Jump). ريان وفريقه التكتيكي يتسللون بين فوهات الكثبان لمباغتة المحطة المخترقة.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="320" fill="#0a0502"/>
          <!-- Night vision green hue tint -->
          <circle cx="300" cy="160" r="155" fill="#14532d" opacity="0.25" stroke="#22c55e" stroke-width="2"/>
          <!-- Paratrooper in Freefall -->
          <g transform="translate(270, 70) scale(0.9)">
            <ellipse cx="30" cy="20" rx="12" ry="14" fill="#15803d"/>
            <path d="M15,34 L45,34 L55,90 L5,90 Z" fill="#166534"/>
            <!-- Parachute Lines -->
            <path d="M-20,-40 Q30,-70 80,-40" stroke="#22c55e" stroke-width="3" fill="none"/>
            <line x1="-20" y1="-40" x2="15" y2="34" stroke="#22c55e" stroke-width="1"/>
            <line x1="80" y1="-40" x2="45" y2="34" stroke="#22c55e" stroke-width="1"/>
          </g>
          <!-- Desert Sand Dunes under Night Vision -->
          <path d="M0,240 Q150,210 300,260 T600,230 L600,320 L0,320 Z" fill="#052e16"/>
          <text x="300" y="295" font-family="monospace" font-size="11" fill="#4ade80" text-anchor="middle">NVG STATUS: ACTIVE // ALTITUDE: 4,200 FT</text>
        </svg>
      `,
      illustrationCaptionAr: 'الإنزال التكتيكي الليلي عبر مناظير الرؤية الليلية الحرارية فوق صحراء الربع الخالي.',
      contentAr: `
انفتحت البوابة الهيدروليكية الخلفية لطائرة النقل التكتيكية C-130 على ارتفاع اثني عشر ألف قدم، فاندفع هواء الصحراء الليلي البارد كصفعة صقيع توقظ كل خلية عصبية في الجسد.

تفقد العقيد ريان الصقر خوذته التكتيكية المزودة بنظام الاتصال المشفر وشاشة العرض على زجاج القناع (HUD). خلفه، كان رجاله الأربعة في فرقة "العقرب الأسود" متأهبين، بنادقهم الهجومية من طراز HK416 مثبتة بإحكام على صدورهم، وحقائب المظلات الموجهة بالأقمار الصناعية مشدودة إلى ظهورهم.

"الهدف: محطة الربط الفضائي 'سديم-4' على بعد عشرين كيلومتراً شمالاً"، صدح صوت ريان عبر شبكة الاتصال المغلقة ذات التردد المتغير. "قوة مجهولة مدرعة استولت على مصفوفة التوجيه الرئيسي، والعد التنازلي لإعادة توجيه ترددات الاتصال الدفاعية بدأ بالفعل. القفز بتقنية الارتفاع الشاهق والفتح المنخفض (HALO). لا أضواء.. لا إشارات لاسلكية حتى نلامس الأرض."

أعطى ريان إشارة الضوء الأخضر، وقفز أولاً إلى قلب الهاوية السوداء.

كان السقوط الحر بسرعة مائتي كيلومتر في الساعة يولد صفيراً مرعباً، لكن عقل ريان كان هادئاً كبحيرة جليدية. أظهرت شاشة قناعه نقطة ليزرية خضراء تحدد منطقة الهبوط بدقة بين كثيبين رمليين شاهقين يحجبان الرؤية عن رادارات المحطة الأرضية.

عند علامة الألف ومائتي قدم، شد مقبض الفتح التكتيكي. انفتحت المظلة الشراعية السوداء بفرملة صامتة ومحكمة، واستدار بجسده في مناورة هوائية دقيقة ليهبط بقدميه على الرمال الناعمة دون إحداث صوت يذكر، متدحرجاً ليفرغ طاقة الهبوط قبل أن ينزع حبال المظلة في ثلاث ثوانٍ فقط.

خلال دقيقة واحدة، كان فريقه بالكامل مصفوفاً بجواره خلف ساتر رملي منيع.
"قائد الفريق.. رصدنا أربع دوريات مسلحة على متن مدرعات خفيفة تمشط محيط السياج الكهربائي"، همس الرامي القناص طارق وهو يثبت بندقية العيار الثقيل .50 على ركيزة الكثيب.

رد ريان وهو يسحب المزلاج المعدني لسلاحه بصوت خافت ميكانيكي حاسم:
"سنتسلل عبر أنبوب تصريف مياه التبريد تحت القطاع الغربي. التزموا الصمت حتى نصل إلى غرفة التحكم المركزية. لا مجال للخطأ الليلة."
      `,
    },
    {
      chapterNumber: 2,
      titleAr: 'الفصل الثاني: اقتحام معقل السديم وتبادل النيران',
      estimatedMinutes: 14,
      wordsCount: 2050,
      synopsisAr: 'داخل أروقة المحطة الضخمة، تدور معركة تكتيكية بالغة الضراوة. استخدام قنابل الدخان الحرارية، التنسيق الزاوي للرماية، ومواجهة زعيم الفرقة المارقة وجهاً لوجه.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="320" fill="#0f172a"/>
          <!-- Server racks in background with flashing blue/red lights -->
          <g fill="#1e293b" stroke="#334155" stroke-width="1.5">
            <rect x="40" y="40" width="80" height="240" rx="4"/>
            <rect x="140" y="40" width="80" height="240" rx="4"/>
            <rect x="480" y="40" width="80" height="240" rx="4"/>
          </g>
          <!-- Flashing LEDs -->
          <circle cx="60" cy="80" r="3" fill="#ef4444"/>
          <circle cx="60" cy="100" r="3" fill="#38bdf8"/>
          <circle cx="160" cy="90" r="3" fill="#22c55e"/>

          <!-- Muzzle flash and Tactical Smoke in Center Corridor -->
          <polygon points="320,160 360,150 360,170" fill="#facc15" opacity="0.9"/>
          <circle cx="300" cy="160" r="45" fill="#f97316" opacity="0.3"/>
          <ellipse cx="280" cy="180" rx="90" ry="30" fill="#94a3b8" opacity="0.2"/>

          <!-- Tactical Operator in Cover -->
          <path d="M220,260 L260,200 L270,260 Z" fill="#020617"/>
          <line x1="260" y1="210" x2="330" y2="160" stroke="#ef4444" stroke-width="1.5"/>
        </svg>
      `,
      illustrationCaptionAr: 'اشتباك الرواق الأوسط: ريان يقتحم قاعة السيرفرات الرئيسية تحت غطاء الدخان الحراري ورصاص التحصينات.',
      contentAr: `
انفجرت عبوة الاختراق المغناطيسي على باب الطوارئ بهدير مكتوم أصم الآذان، مصحوبة بدخان حراري كثيف حجب الرؤية الحرارية والبصرية داخل الممر المؤدي لقاعة السيرفرات الفضائية.

"عقرب 1 يتحرك.. غطاء ناري على الزاوية اليمنى!"، هتف ريان وهو ينطلق للأمام بسرعة فائقة، مستغلاً عتمة الدخان كدرع حامي.

دوت طلقات نارية متلاحقة ارتدت شظاياها عن الجدران الفولاذية المصفحة للمحطة. كان المسلحون يتمترسون خلف منصات التبريد المركزية، مدججين بأسلحة أوتوماتيكية ثقيلة تحاول تثبيت الفريق عند مدخل الرواق.

رمى الرقيب عاصم قنبلة ضوئية صوتية (Flashbang) ارتدت مرتين على الأرضية الخرسانية قبل أن تنفجر بوميض ساطع بلغ مليوني شمعة وضغط صوتي أصاب المدافعين بفقدان توازن مؤقت. في تلك الثانية الفاصلة تحديداً، تقدم ريان وطارق بتناغم تكتيكي مدهش؛ ثلاث طلقات دقيقة ومحسوبة أخرجت مصدر النيران المعادي من المعادلة دون إلحاق أي ضرر بكابلات الألياف الضوئية الحساسة للمحطة.

وصل ريان إلى المنصة المركزية، حيث كانت الشاشات العملاقة تظهر اكتمال 87% من عملية نقل التحكم في الأقمار نحو سفينة شحن مشبوهة راسية في المياه الدولية.

"طارق.. ثبت جهاز التشويش الكمي على المنفذ الرئيسي فوراً!"، أمر ريان وهو يلقي نظرة سريعة على المخطط الإلكتروني. "أما أنت يا عاصم، راقب البوابة الجنوبية.. زعيمهم لن يستسلم بسهولة، إنه ينتظرنا في غرفة المولدات."
      `,
    },
    {
      chapterNumber: 3,
      titleAr: 'الفصل الثالث: الثواني العشر الأخيرة قبل الفجر',
      estimatedMinutes: 9,
      wordsCount: 1550,
      synopsisAr: 'المواجهة الختامية عند مفترق أبراج الإرسال. نزع صاعق التدمير الذاتي وتأمين الشبكة الفضائية مع أول ضوء يشرق على صحراء الوطن.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="ch3_dawn" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ea580c"/>
              <stop offset="50%" stop-color="#b45309"/>
              <stop offset="100%" stop-color="#1e293b"/>
            </linearGradient>
          </defs>
          <rect width="600" height="320" fill="url(#ch3_dawn)"/>
          <!-- Rising Sun Silhouette over golden sands -->
          <circle cx="300" cy="220" r="70" fill="#fef08a" opacity="0.85"/>
          <!-- Satellite Tower standing tall and proud -->
          <line x1="300" y1="220" x2="300" y2="60" stroke="#020617" stroke-width="4"/>
          <line x1="280" y1="120" x2="320" y2="120" stroke="#020617" stroke-width="3"/>
          <line x1="260" y1="170" x2="340" y2="170" stroke="#020617" stroke-width="3.5"/>
          <!-- Team extraction helicopter arriving -->
          <g transform="translate(100, 70) scale(0.6)">
            <ellipse cx="60" cy="30" rx="40" ry="14" fill="#020617"/>
            <line x1="10" y1="15" x2="110" y2="15" stroke="#020617" stroke-width="3"/>
          </g>
          <text x="300" y="290" font-family="sans-serif" font-weight="900" font-size="13" fill="#ffffff" text-anchor="middle">
            MISSION SUCCESSFUL • تم تحييد التهديد واستعادة السيطرة بالكامل
          </text>
        </svg>
      `,
      illustrationCaptionAr: 'شروق شمس الفجر الذهبية فوق المحطة المحررة مع وصول مروحيات الدعم والإخلاء التكتيكي.',
      contentAr: `
في غرفة المحولات الكبرى، كان الهواء مشبعاً برائحة الأوزون المتأين وصوت صفارات الإنذار الحمراء يعوي بجنون: [تحذير: بدء تسلسل التدمير الذاتي لمنظومة التبريد: 00:00:45].

اندفع قائد القوة المارقة من خلف عمود فولاذي، مشهراً سلاحه القصير في محاولة يائسة لمنع ريان من الوصول إلى لوحة التعطيل. التقى الرجلان في اشتباك جسدي ملحمي؛ استغل ريان مهارات القتال التلاحمي العسكري (CQC)، فالتف حول ذراع خصمه بحركة دائرية خاطفة محطماً توازنه، ثم ألقى به أرضاً وجرده من سلاحه بحرفية لا تترك مجالاً للمقاومة.

"الرمز مشفر بتسع خانات عشوائية يا صقر!"، بصق المرتزق دماً وهو يبتسم بانهزام مرير. "لا أحد في العالم يستطيع فكه في ثلاثين ثانية!"

لم يلتفت ريان لكلماته، بل أخرج بطاقة التجاوز التكتيكية الكمية التي جهزها مركز العمليات المشتركة، وأدخلها في المنفذ المباشر للمعالج:
"العقرب الأسود لا يخمن الرموز يا هذا.. نحن نكتب القواعد من جديد."

مع بقاء سبع ثوانٍ فقط على الكارثة، تحولت الشاشة إلى اللون الأخضر الهادئ: [تم إلغاء التفجير - استعادة الاتصال بالقمر الصناعي الوطني: 100%].

توقفت صفارات الإنذار، وحل صمت عميق مهيب داخل المنشأة المحررة. خرج ريان إلى البوابة الخارجية، وخلع خوذته التكتيكية مستقبلاً نسائم الصباح الأولى التي بدأت تصبغ رمال الصحراء بلون الذهب الخالص.

في الأفق، ظهرت طائرتا هليكوبتر مقاتلتان من طراز أباتشي تتقدمان مروحيات الإخلاء الطبية. ضغط ريان زر الإرسال وقال بنبرة ملؤها الفخر والشموخ:
"إلى القيادة العامة.. هنا العقرب 1. محطة سديم مؤمنة بالكامل، ولا خسائر في صفوف فريقنا. شمس الصباح تشرق على أرضنا بأمان."
      `,
    },
  ],
};

// ==========================================
// 3. SCI-FI & FUTURE NOVEL: "شمس النيوترون: استعادة بروتوكول الأفق"
// ==========================================
export const NOVEL_SCI_FI_FUTURE: Novel = {
  id: 'neutron_sun_horizon',
  titleAr: 'شمس النيوترون: استعادة بروتوكول الأفق',
  subtitleAr: 'ملحمة علمية في محطة المصعد الفضائي نيو-أركاديا عام 2142',
  genre: 'sci_fi_future',
  genreLabelAr: 'خيال علمي وتطوير ومستقبل',
  genreBadgeColor: '#06b6d4',
  rating: 4.97,
  readsCount: 31200,
  totalChapters: 3,
  totalWords: 5800,
  estimatedReadingTime: '38 دقيقة',
  authorPersonaAr: 'د. لانا المنصور',
  authorTitleAr: 'كبيرة مهندسي فيزياء الكم والذكاء الاصطناعي الاصطناعي التوليدي للأجرام الفضائية',
  synopsisAr:
    'في عام 2142، تتصل الأرض بمدارها عبر المصعد الفضائي العملاق "أفق الرياض" الممتد لارتفاع 36,000 كيلومتر. تكتشف عالمة الفيزياء الفضائية الدكتورة لانا المنصور تذبذباً غير مسبوق في قلب مفاعل المادة المضادة للمحطة المدارية ينذر بانهيار جاذبي قد يسحق الغلاف الجوي. في سباق مع قوانين الفيزياء ومخاطر الفضاء السحيق، تقود لانا مهمة إصلاح مستحيلة باستخدام التكنولوجيا النانوية المتقدمة لإنقاذ حضارة المستقبل.',
  forensicThemeAr: 'فيزياء الجاذبية الكمية، ميكانيكا الانهيار النيوتروني، وهندسة الألياف النانوية الكربونية الفائقة',
  psychologicalFocusAr: 'التفكير الابتكاري المجرد، التضحية من أجل بقاء النوع البشري، والتعايش المتناغم مع التقنيات الخارقة',
  coverIllustrationSvg: `
    <svg viewBox="0 0 400 560" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cov3_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#020617"/>
          <stop offset="50%" stop-color="#082f49"/>
          <stop offset="100%" stop-color="#0e7490"/>
        </linearGradient>
        <radialGradient id="cov3_sun" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
          <stop offset="60%" stop-color="#06b6d4" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="560" fill="url(#cov3_bg)"/>
      <rect width="400" height="560" fill="url(#cov3_sun)"/>

      <!-- Earth Curve at Bottom -->
      <path d="M-50,560 A450,180 0 0,1 450,560 Z" fill="#0369a1" opacity="0.85"/>
      <path d="M-50,550 A450,180 0 0,1 450,550 Z" stroke="#38bdf8" stroke-width="3" fill="none" opacity="0.6"/>

      <!-- Orbital Space Elevator Tether Line extending to space -->
      <line x1="200" y1="560" x2="200" y2="40" stroke="#bae6fd" stroke-width="3" opacity="0.9"/>
      <!-- Glowing Energy pulses along the tether -->
      <circle cx="200" cy="400" r="5" fill="#facc15"/>
      <circle cx="200" cy="280" r="6" fill="#38bdf8"/>
      <circle cx="200" cy="160" r="7" fill="#f43f5e"/>

      <!-- Orbital Station Ring at Top -->
      <ellipse cx="200" cy="120" rx="90" ry="24" fill="none" stroke="#38bdf8" stroke-width="4" opacity="0.95"/>
      <ellipse cx="200" cy="120" rx="60" ry="16" fill="#0f172a" stroke="#06b6d4" stroke-width="2"/>
      <circle cx="200" cy="120" r="14" fill="#38bdf8"/>

      <!-- Constellations / Quantum grid lines -->
      <g stroke="#ffffff" stroke-width="0.7" opacity="0.3">
        <line x1="40" y1="80" x2="100" y2="60"/>
        <line x1="100" y1="60" x2="130" y2="110"/>
        <line x1="310" y1="70" x2="360" y2="90"/>
        <line x1="360" y1="90" x2="340" y2="150"/>
      </g>

      <rect x="25" y="475" width="350" height="42" rx="10" fill="#020617" opacity="0.85" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="200" y="502" font-family="sans-serif" font-size="13" font-weight="900" fill="#38bdf8" text-anchor="middle">
        HORIZON 2142 • خيال علمي واستشراف المستقبل
      </text>
    </svg>
  `,
  chapters: [
    {
      chapterNumber: 1,
      titleAr: 'الفصل الأول: صرخة في مدار الـ 36 ألف كيلومتر',
      estimatedMinutes: 13,
      wordsCount: 1950,
      synopsisAr: 'في المحطة المدارية للمصعد الفضائي، ترصد الدكتورة لانا تشوهاً غير مفهوم في حقل كازيمير الكمي، ما يهدد بقطع كابل الكربون النانوي الرابط بالأرض.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="320" fill="#020617"/>
          <!-- Earth View from Orbit -->
          <circle cx="100" cy="220" r="160" fill="#0369a1" opacity="0.7"/>
          <path d="M-20,180 Q60,140 120,200 T240,220" fill="#15803d" opacity="0.6"/>

          <!-- High-tech Cockpit Window Frame -->
          <path d="M0,0 L180,60 L420,60 L600,0 L600,320 L0,320 Z" fill="#0f172a" opacity="0.9" stroke="#1e293b" stroke-width="2"/>
          
          <!-- Holographic Quantum Ring Display -->
          <ellipse cx="300" cy="160" rx="80" ry="35" fill="none" stroke="#06b6d4" stroke-width="3"/>
          <ellipse cx="300" cy="160" rx="60" ry="25" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,4"/>
          <circle cx="300" cy="160" r="12" fill="#38bdf8"/>
          <text x="300" y="225" font-family="monospace" font-size="11" fill="#ef4444" text-anchor="middle" font-weight="bold">GRAVITATIONAL ANOMALY DETECTED</text>
        </svg>
      `,
      illustrationCaptionAr: 'قمرة القيادة للمصعد الفضائي: الهولوغرام الكمي يوضح نقطة الانهيار الجاذبي على مدار الأرض المتزامن.',
      contentAr: `
كانت الأرض تبدو من نافذة قمرة القيادة في المحطة المدارية أشبه بجوهرة لازوردية تتنفس وسط بحر لا نهائي من السواد المخملي. عند خط الاستواء، كان شريط "كابل الأفق" المنسوج من أنابيب الكربون النانوية يمتد عمودياً كنصل سيف فضي فائق الرقة يربط ميناء الرياض الفضائي الأرضي بهذه المحطة السابحة على ارتفاع 36,000 كيلومتر في المدار الجغرافي المتزامن.

"دكتورة لانا.. مجسات التوازن المغناطيسي في القطاع 7 تسجل قراءة شاذة"، قال صوت المساعد الرقمي الكمي "نجم" بنبرة متوازنة برمجياً لكنها حملت تحذيراً لا يقبل التأجيل. "حقل كازيمير في قلب المفاعل النيوتروني يتذبذب بمقدار 4.2 فيمتو-متر كل ثانية. هذا ليس خللاً برمجياً، إنه انكماش جاذبي مصغر."

وقفت الدكتورة لانا المنصور أمام المنصة الهولوغرافية التفاعلية، وحركت أصابعها في الهواء لتفكيك النموذج ثلاثي الأبعاد للمفاعل. كانت عيناها العسليتان تعكسان توهج الأشعة الزرقاء المتدفقة من حلقة الاحتواء الكهرومغناطيسي.

"الانكماش يتسارع يا نجم.. إذا بلغت قمة التذبذب عتبة السبعة فيمتو-متر، ستتولد موجة جاذبية ميكروسكوبية تكفي لقطع كابل المصعد الفضائي من قاعدته الأرضية. هل تدرك ما يعنيه ذلك؟ سيهوي حبل يزن مئات آلاف الأطنان على سطح الكوكب كحزام من اللهب!"

"ما هو خيارنا الوحيد يا دكتورة؟"، سأل قائد المحطة الذي انضم إليها مذعوراً.

نظرت لانا إلى شارة بدلتها الفضائية المصنوعة من دروع البوليمر المعززة بالغرافين، وقالت بإصرار علمي فولاذي:
"الخروج إلى الفضاء المفتوح.. النزول إلى الغلاف الخارجي للمفاعل وتثبيت معوضات التناغم النانوي يدوياً قبل أن تبتلع النواة نفسها. لا حواسيب قادرة على حساب تذبذب المادة المضادة في هذه اللحظة، العقل البشري وحده قادر على الارتجال مع قوانين الكم."
      `,
    },
    {
      chapterNumber: 2,
      titleAr: 'الفصل الثاني: السير في الفراغ المطلق',
      estimatedMinutes: 14,
      wordsCount: 2150,
      synopsisAr: 'لانا تخرج في مهمة سير فضائي محفوفة بالموت لإصلاح حلقة الاحتواء المغناطيسي وسط عاصفة من الجسيمات الشمسية المتوهجة.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="320" fill="#000000"/>
          <!-- Starfield -->
          <g fill="#ffffff">
            <circle cx="50" cy="40" r="1.5"/>
            <circle cx="180" cy="80" r="1"/>
            <circle cx="450" cy="30" r="1.8"/>
            <circle cx="520" cy="120" r="1.2"/>
            <circle cx="80" cy="280" r="1.4"/>
            <circle cx="390" cy="270" r="1.2"/>
          </g>

          <!-- Astronaut floating tethered to Station Spine -->
          <g transform="translate(240, 100)">
            <!-- Safety Tether Line -->
            <path d="M-60,-20 Q0,50 60,30" stroke="#06b6d4" stroke-width="2" fill="none"/>
            <!-- Spacesuit Helmet & Body -->
            <ellipse cx="60" cy="30" rx="16" ry="18" fill="#e2e8f0"/>
            <ellipse cx="64" cy="28" rx="9" ry="11" fill="#f59e0b"/>
            <!-- Body -->
            <path d="M48,46 L76,46 L82,100 L42,100 Z" fill="#cbd5e1"/>
            <!-- Backpack Thrusters -->
            <rect x="36" y="48" width="12" height="35" rx="3" fill="#64748b"/>
            <circle cx="42" cy="88" r="3" fill="#38bdf8"/>
          </g>

          <!-- Glowing Blue Energy Core of Station -->
          <circle cx="480" cy="180" r="80" fill="#0284c7" opacity="0.3"/>
          <circle cx="480" cy="180" r="40" fill="#38bdf8" opacity="0.8"/>
          <line x1="480" y1="60" x2="480" y2="300" stroke="#bae6fd" stroke-width="4"/>
        </svg>
      `,
      illustrationCaptionAr: 'السير في الفضاء المفتوح: الدكتورة لانا تواجه قلب المفاعل الأزرق المتوهج على حافة الهاوية الفلكية.',
      contentAr: `
كان الصمت في الفضاء الخارجي مطلقاً، صمتاً مهيباً لا يقطعه سوى صوت تنفس لانا المنتظم داخل خوذتها ونبضات قلبها التي تتردد كصوت طبل بعيد.

تعلقت لانا بحبل الأمان الكربوني، دافعة نفسها بنفاثات الغاز المضغوط المثبتة على ظهر بدلتها نحو قلب برج المفاعل الأسطواني الضخم. تحت قدميها مباشرة، كانت تدور قارة آسيا والجزيرة العربية، حيث تلألأت شبكات المدن الذكية كخيوط من ذهب خالص منسوج على بساط الليل الأزرق.

"لانا.. العاصفة الشمسية وصلت إلى المدار الخارجي أسرع بسبع دقائق مما توقعنا!"، جاء صوت مركز المراقبة مشوشاً بالضجيج المغناطيسي. "الإشعاع يتجاوز 400 ملي-سيفرت. يجب أن تعودي فوراً إلى غرفة الضغط!"

"إذا عدت الآن، فلن يكون هناك بيت لنعود إليه غداً!"، ردت لانا وهي تثبت حذاءها المغناطيسي على هيكل المفاعل المعدني المتجمد.

سحبت من حزام أدواتها جهاز "الحاقن النانوي المتوازن". أمامها، كانت نافذة الكوارتز الشفافة للمفاعل تفيض بضوء شاحب يميل إلى البنفسجي، حيث تتراقص ذرات المادة المضادة في رقصة بالغة الخطورة تهدد باختراق دروع الاحتواء.

أدخلت لانا طرف الحاقن في المنفذ الميكانيكي اليدوي، وبدأت تضخ ملايين الروبوتات النانوية المبرمجة لإعادة نسج شبكة الأقطاب المغناطيسية المتآكلة. مع كل ثانية تمر، كانت حرارة البدلة ترتفع، ومؤشر الأكسجين ينخفض بتسارع خطير.

"ثلاث درجات تفصلنا عن الاستقرار.. اثنتان.. واحدة.. تم الحقن بالكامل!"، هتفت لانا وقد غطى العرق جبينها بالكامل داخل الخوذة.

في تلك اللحظة، انطلقت موجة ضوئية خضراء مهدئة على طول حلقة المفاعل، واستقرت الشاشات المدارية معلنة انخفاض التذبذب الجاذبي إلى مستوياته الطبيعية الآمنة. تنفست لانا الصعداء، ورفعت يدها المغطاة بالقفاز الفضائي السميك ملوحة لكوكب الأرض الذي بدا في تلك اللحظة أكثر جمالاً وهدوءاً من أي وقت مضى.
      `,
    },
    {
      chapterNumber: 3,
      titleAr: 'الفصل الثالث: عصر الأفق الجديد',
      estimatedMinutes: 11,
      wordsCount: 1700,
      synopsisAr: 'عودة المصعد الفضائي للعمل بكامل طاقته، وتدشين عصر جديد من استكشاف الطاقة النظيفة التي تضمن ازدهار الكوكب لقرون قادمة.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="320" fill="#082f49"/>
          <circle cx="300" cy="160" r="130" fill="#0284c7" opacity="0.3"/>
          <circle cx="300" cy="160" r="70" fill="#38bdf8" opacity="0.8"/>
          <!-- Future City Skyline Below with Light Beams to Orbit -->
          <g fill="#020617">
            <rect x="180" y="240" width="40" height="80"/>
            <rect x="230" y="210" width="50" height="110"/>
            <rect x="320" y="200" width="60" height="120"/>
            <rect x="390" y="230" width="45" height="90"/>
          </g>
          <!-- Power Beam from Sky to City -->
          <polygon points="295,0 305,0 315,220 285,220" fill="#a5f3fc" opacity="0.6"/>
          <text x="300" y="270" font-family="sans-serif" font-weight="900" font-size="13" fill="#ffffff" text-anchor="middle">
            ENERGY GRID RESTORED • الطاقة النظيفة تعانق مدن المستقبل
          </text>
        </svg>
      `,
      illustrationCaptionAr: 'تدفق طاقة الأفق النظيفة من المدار إلى محطات الأرض الذكية إيذاناً بعصر جديد من الرخاء والتطور.',
      contentAr: `
عادت الدكتورة لانا إلى الصالة الرئيسية للمحطة المدارية، حيث استقبلها طاقم العلماء والمهندسين بتصفيق حار ودموع فرح غمرت وجوه نساء ورجال سهروا على حافة الفناء لإنقاذ كوكبهم.

على الشاشات الجدارية الكبرى، كانت محطات توليد الطاقة في العاصمة وبقية مدن العالم تستقبل تدفقاً سلساً وغير مسبوق من طاقة النيوترون المروضة؛ طاقة نظيفة تكفي لتشغيل كل مستشفى، ومدرسة، ومصنع، ومركبة مائية أو جوية دون انبعاث كربوني واحد.

وقفت لانا عند النافذة الكبرى تراقب أول كبسولة نقل ركاب تصعد على سلك المصعد الفضائي، حاملة باحثين ومستكشفين جدداً في طريقهم نحو آفاق الفضاء الرحب.

سجلت لانا في مذكراتها العلمية الختامية:
"المستقبل ليس مصيراً مكتوباً ننتظره بسلبية، بل هو جسر نصنعه بالمعرفة، والشجاعة، والعمل المخلص. عندما نتحد لحماية أرضنا، تصبح النجوم ذاتها محطات في طريق ارتقائنا الإنساني النبيل."
      `,
    },
  ],
};

// ==========================================
// 4. CLEAN SCI-FANTASY NOVEL: "حراس الصدع المغناطيسي: صدمة التيتانيوم"
// (Pure Fiction / Clean Secular Action / No Theological Symbols)
// ==========================================
export const NOVEL_SCI_FANTASY: Novel = {
  id: 'magnetic_rift_guardians',
  titleAr: 'حراس الصدع المغناطيسي: صدمة التيتانيوم',
  subtitleAr: 'مغامرة كينيتيكية في أعماق كوكب كايليس ودهاليز الطاقة التكتونية',
  genre: 'sci_fantasy',
  genreLabelAr: 'أكشن وخيال إبداعي',
  genreBadgeColor: '#8b5cf6',
  rating: 4.93,
  readsCount: 19800,
  totalChapters: 3,
  totalWords: 5100,
  estimatedReadingTime: '32 دقيقة',
  authorPersonaAr: 'القائد زين الطليعي',
  authorTitleAr: 'سيد رنانات الشفرات الكينيتيكية وخبير استكشاف الأعماق المغناطيسية',
  synopsisAr:
    'في عالم كايليس الجيولوجي المدهش، تحرس فرقة "رنانات التيتانيوم" صدع الطاقة المغناطيسية القديم الذي يغذي مدن الأعماق. عندما تستيقظ حشود الكائنات الميكانيكية الحارسة وتخرج عن السيطرة بسبب اضطراب رنين الصفائح الأرضية، يقود زين الطليعي فريقه في مغامرة خيالية مفعمة بالإثارة واستخدام الدروع الكينيتيكية وسيوف البلازما الصوتية لتهدئة قلب الصدع وإعادة التوازن البيئي.',
  forensicThemeAr: 'ديناميكا الرنين المغناطيسي، هندسة السبائك التيتانية المرنة، وتحليل التيارات التكتونية الحركية',
  psychologicalFocusAr: 'العمل الجماعي، الثقة المتبادلة بين أفراد الفريق، والشجاعة في مواجهة المجهول',
  coverIllustrationSvg: `
    <svg viewBox="0 0 400 560" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cov4_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e1035"/>
          <stop offset="50%" stop-color="#3b0764"/>
          <stop offset="100%" stop-color="#090514"/>
        </linearGradient>
        <radialGradient id="cov4_plasma" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#a855f7" stop-opacity="0.7"/>
          <stop offset="60%" stop-color="#c084fc" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="400" height="560" fill="url(#cov4_bg)"/>
      <rect width="400" height="560" fill="url(#cov4_plasma)"/>

      <!-- Giant Subterranean Rift Canyon with Glowing Purple Crystal Formations -->
      <path d="M0,0 L120,240 L60,560 L0,560 Z" fill="#0f0728"/>
      <path d="M400,0 L280,240 L340,560 L400,560 Z" fill="#0f0728"/>

      <!-- Energy Rift Center Abyss -->
      <polygon points="120,240 280,240 220,560 160,560" fill="#a855f7" opacity="0.35"/>
      <line x1="200" y1="200" x2="190" y2="560" stroke="#f0abfc" stroke-width="4"/>

      <!-- Kinetic Blade Warrior Silhouette standing on Precipice -->
      <g transform="translate(160, 160) scale(0.9)">
        <ellipse cx="40" cy="20" rx="14" ry="16" fill="#020617"/>
        <path d="M22,36 L58,36 L66,110 L14,110 Z" fill="#020617"/>
        <!-- Glowing Kinetic Blade -->
        <line x1="65" y1="45" x2="120" y2="5" stroke="#c084fc" stroke-width="4"/>
        <line x1="65" y1="45" x2="120" y2="5" stroke="#ffffff" stroke-width="1.5"/>
        <circle cx="120" cy="5" r="5" fill="#f0abfc"/>
      </g>

      <rect x="25" y="475" width="350" height="42" rx="10" fill="#020617" opacity="0.85" stroke="#a855f7" stroke-width="1.5"/>
      <text x="200" y="502" font-family="sans-serif" font-size="13" font-weight="900" fill="#c084fc" text-anchor="middle">
        KINETIC BLADE GUARDIANS • مغامرة الصدع المغناطيسي
      </text>
    </svg>
  `,
  chapters: [
    {
      chapterNumber: 1,
      titleAr: 'الفصل الأول: زئير الصدع البنفسجي',
      estimatedMinutes: 11,
      wordsCount: 1750,
      synopsisAr: 'في أعماق أودية كايليس التكتونية، يلمع الصدع المغناطيسي بلون بنفسجي غير مستقر. القائد زين وفريقه ينزلون بالحبال الكينيتيكية لمواجهة حراس السيليكون القدامى.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="320" fill="#1e1035"/>
          <!-- Subterranean glowing crystals -->
          <polygon points="60,320 80,180 100,320" fill="#c084fc" opacity="0.6"/>
          <polygon points="120,320 135,220 150,320" fill="#a855f7" opacity="0.7"/>
          <polygon points="460,320 480,190 500,320" fill="#c084fc" opacity="0.6"/>
          <polygon points="520,320 540,240 560,320" fill="#a855f7" opacity="0.7"/>

          <!-- Plasma Bridge Crossing -->
          <line x1="100" y1="200" x2="500" y2="200" stroke="#f0abfc" stroke-width="3" stroke-dasharray="8,4"/>
          <!-- Warriors running along the bridge -->
          <circle cx="260" cy="180" r="10" fill="#ffffff"/>
          <line x1="260" y1="180" x2="290" y2="160" stroke="#38bdf8" stroke-width="3"/>
          <circle cx="340" cy="180" r="10" fill="#ffffff"/>
        </svg>
      `,
      illustrationCaptionAr: 'عبور جسر البلازما الصوتي فوق هاوية الصدع المغناطيسي المتوهج في كوكب كايليس.',
      contentAr: `
كانت جدران الصدع المغناطيسي العظيم في كوكب كايليس تهتز بطنين تردد صوتي عميق جعل الهواء يرتجف داخل صدور المقاتلين كأنه دقات طبل صلب.

وقف القائد زين الطليعي على حافة الجرف الصخري الشاهق، متفقداً مقبض شفرته التيتانية الكينيتيكية. كانت الشفرة تتوهج بنبضات بلازما بنفسجية متناغمة مع تدفق المجال الكهرومغناطيسي المنبعث من قاع الوادي السحيق. خلفه، كان رفاقه الأربعة في حرس الرنين يتفقدون دروعهم المصنوعة من صفائح التيتانيوم خفيف الوزن والمبطنة بممتصات الصدمات الحركية.

"الرنين التكتوني وصل إلى درجة 8.9 على مقياس كايليس"، قالت الملازم ميرا وهي تفحص جهاز كشف التيارات الأرضية المثبت على معصمها. "إذا انهار جسر التوازن الرئيسي، فستنقطع طاقة التغذية الحيوية عن ثلاثين مدينة في الأعماق. الآلات الحارسة التلقائية فقدت بوصلة التوجيه وتعتبر كل كائن حي يقترب من الصدع تهديداً يجب إبادته."

ابتسم زين ابتسامة هادئة تشع بالثقة، وسحب قناعه الشبكي الواقي:
"نحن لم نتدرب طوال عشر سنوات لنتراجع أمام مجرد آلات حارسة فقدت معايرتها. حبال الانزلاق الكينيتيكي جاهزة.. الهدف هو قلب المولد التكتوني في القاع. سننزلق كالبرق الصامت ونعيد ضبط التردد."

قفز زين أولاً، وتلاه رفاقه بحركات بهلوانية مذهلة تعتمد على ارتداد الحبال المغناطيسية من صخرة إلى أخرى، محلقين فوق بحيرة من البلازما البنفسجية المتدفقة كشلال من الضوء السائل.
      `,
    },
    {
      chapterNumber: 2,
      titleAr: 'الفصل الثاني: صدام الدروع ورقصة الشفرات',
      estimatedMinutes: 12,
      wordsCount: 1800,
      synopsisAr: 'مواجهة حامية ضد عملاق ميكانيكي حارس في ردهة الأعمدة البلورية. مهارات تكتيكية عالية وتناغم استثنائي بين دروع الفريق وشفرات البلازما.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="320" fill="#090514"/>
          <!-- Huge Mechanical Golem Silhouette in Shadow -->
          <rect x="220" y="60" width="160" height="180" rx="20" fill="#1e1b4b" stroke="#6366f1" stroke-width="3"/>
          <circle cx="270" cy="110" r="12" fill="#ef4444"/>
          <circle cx="330" cy="110" r="12" fill="#ef4444"/>
          <!-- Energy Shockwave from blade slash -->
          <path d="M120,240 Q300,120 480,240" stroke="#c084fc" stroke-width="5" fill="none"/>
          <circle cx="300" cy="180" r="25" fill="#a855f7" opacity="0.5"/>
        </svg>
      `,
      illustrationCaptionAr: 'المواجهة الكبرى أمام العملاق الميكانيكي الحارس في بهو الأعمدة التكتونية.',
      contentAr: `
عندما لامست أقدام الفريق أرضية القاعة المركزية المصنوعة من حجر البازلت الأسود المصقول، انبعث هدير ميكانيكي هائل من الظلام.

من بين الأعمدة البلورية الضخمة، تقدم العملاق الميكانيكي القديم "تيتان-9"، وهو كائن أوتوماتيكي صلب يبلغ طوله خمسة أمتار، مصنوع من صفائح سبائك فولاذية لا تخترقها القذائف العادية، وعيناه تشتعلان بضوء أحمر تحذيري ينذر بالخطر.

"تشكيل الدائرة المغلقة!"، صرخ زين بصوت مدوٍ.

انطلق رفاقه في مناورة تكتيكية دائرية سريعة. رفعت ميرا درعها الكينيتيكي لامتصاص الضربة الهائلة التي سددها العملاق بقبضته الحديدية الضخمة؛ تحول عزم الضربة إلى شحنة طاقة كهربائية تم تحويلها عبر أسلاك الدرع لتشحن شفرة زين البلازمية.

استغل زين لحظة انحناء العملاق، وقفز في الهواء مستنداً على كتف ميرا، شاهراً سيفه البنفسجي المتوهج. بحركة دقيقة مدروسة، غرز نصل البلازما في مفصل الكتف الخلفي للمارد الآلي، حيث توجد وحدة التحكم بالرنين.

انطلقت شرارات زرقاء متتالية، وخفت وهج العيون الحمراء للعملاق ليعود إلى لونه الأخضر الطبيعي الهادئ: [تم استعادة التوافق النظامي - إلغاء حالة الهجوم].
      `,
    },
    {
      chapterNumber: 3,
      titleAr: 'الفصل الثالث: عودة النبض إلى مدن الأعماق',
      estimatedMinutes: 9,
      wordsCount: 1550,
      synopsisAr: 'إعادة معايرة البلورة الأم وتدفق الطاقة المغناطيسية الهادئة لإنارة ملايين المنازل في كايليس وسط احتفال جماهيري ببطولة الحراس.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="320" fill="#2e1065"/>
          <!-- Beautiful glowing peaceful subterranean city -->
          <circle cx="300" cy="160" r="120" fill="#a855f7" opacity="0.3"/>
          <circle cx="300" cy="160" r="60" fill="#e9d5ff" opacity="0.8"/>
          <!-- Spire towers of underground metropolis -->
          <g fill="#0f0728" opacity="0.9">
            <polygon points="120,320 150,160 180,320"/>
            <polygon points="200,320 230,120 260,320"/>
            <polygon points="340,320 370,110 400,320"/>
            <polygon points="420,320 450,170 480,320"/>
          </g>
          <text x="300" y="270" font-family="sans-serif" font-weight="900" font-size="13" fill="#ffffff" text-anchor="middle">
            HARMONY RESTORED • استقرار طاقة مدن الأعماق إلى الأبد
          </text>
        </svg>
      `,
      illustrationCaptionAr: 'إشراق مدن الأعماق بأنوار الطاقة المغناطيسية المتوازنة بعد نجاح مهمة حراس الرنين.',
      contentAr: `
في عمق غرفة التردد الأم، وضع زين يديه المغلفتين بقفازات العزل فوق البلورة المغناطيسية الرئيسية.

بدأ الفريق بتشغيل ترنيمة الرنين الصوتي المتوازن عبر مكبرات دروعهم؛ كان صوتاً نقياً متناغماً يهدئ اضطراب التيارات التكتونية التائهة. وتدريجياً، تحول لون البلازما الثائرة من العنف الأحمر إلى لون بنفسجي هادئ يشبه سماء الشفق الصافي.

انطلقت نبضة ضوئية دافئة عبر شبكات التوصيل الصخرية، وسرت الطاقة بسلاسة إلى محطات المدن السفلية. وعلى شاشات الاتصال، بدأت تظهر مشاهد ملايين العائلات في مدن الأعماق وهم يحتفلون بعودة الأضواء والتكييف والأنظمة الحيوية للعمل بكفاءة تامة.

وقف زين وميرا وبقية الفريق على منصة الصدع العالية، ينظرون إلى عالمهم الذي أنقذوه بعزيمتهم ووحدتهم.

"ما دمنا نقف معاً درعاً لبعضنا البعض"، قال زين وهو يغمد شفرته التيتانية بوقار، "فلن يستطيع أي اضطراب في هذا الكون أن يكسر إرادتنا أو يطفئ شعلة الحياة والأمل في قلوبنا."
      `,
    },
  ],
};

// ==========================================
// CLINICAL STORY COLLECTION 1: "ظلال الشاشة: سجلات سرية من عيادة مرآة القلوب"
// ==========================================
export const NOVEL_SCREEN_SHADOWS_CLINIC: Novel = {
  id: 'screen-shadows-secret-clinic-records',
  titleAr: 'ظلال الشاشة: سجلات سرية من عيادة "مرآة القلوب"',
  titleEn: 'Shadows of the Screen: Secret Clinical Records from "Mirror of Hearts"',
  subtitleAr: 'مجموعة قصصية عيادية (سارة وقناع الكمال • أحمد وليلى والصمت المدوي • الطفل علي في الصندوق)',
  subtitleEn: 'Clinical Psychological Story Anthology (Sara • Ahmed & Laila • Little Ali)',
  genre: 'clinical_stories',
  genreLabelAr: 'مجموعة قصصية عيادية وسيكولوجية',
  genreLabelEn: 'Clinical Psychological Story Collection',
  genreBadgeColor: '#ec4899',
  coverIllustrationSvg: `
    <svg viewBox="0 0 600 340" className="w-full h-full object-cover rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="scrBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="50%" stop-color="#311042"/>
          <stop offset="100%" stop-color="#090d16"/>
        </linearGradient>
      </defs>
      <rect width="600" height="340" fill="url(#scrBg)"/>
      <circle cx="300" cy="150" r="95" fill="#ec4899" opacity="0.14"/>
      <rect x="235" y="55" width="130" height="200" rx="18" fill="#090d16" stroke="#f43f5e" stroke-width="2.5"/>
      <line x1="255" y1="95" x2="345" y2="185" stroke="#38bdf8" stroke-width="1.5" stroke-dasharray="4 3"/>
      <text x="300" y="290" font-family="sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle">
        ظلال الشاشة • سجلات سرية من عيادة مرآة القلوب
      </text>
      <text x="300" y="314" font-family="sans-serif" font-size="11" fill="#f9a8d4" text-anchor="middle">
        3 قصص عيادية كاملة (سارة • أحمد وليلى • الطفل علي) — قراءة متصلة أو مقسمة
      </text>
    </svg>
  `,
  rating: 4.98,
  readsCount: 28450,
  totalChapters: 3,
  totalWords: 3800,
  estimatedReadingTime: '18 دقيقة قراءة',
  authorPersonaAr: 'سارة (25) • أحمد (38) وليلى (35) • الطفل علي (9 سنوات)',
  authorTitleAr: 'سجلات عيادة مرآة القلوب للعلاج النفسي والأسري',
  timeSettingAr: 'العصر الرقمي المعاصر — جلسات علاجية ممتدة من 5 إلى 9 أشهر',
  timeSettingEn: 'Contemporary Digital Era — 5 to 9 Months of Clinical Psychotherapy',
  placeSettingAr: 'عيادة "مرآة القلوب" النفسية — غرفة العلاج والمرايا المواجهة للذات',
  placeSettingEn: 'Mirror of Hearts Psychotherapy Clinic',
  synopsisAr:
    'مجموعة قصصية عيادية تجمع بين السرد الأدبي الإنساني العميق والتشخيص السيكومتري الدقيق (LSAS, BDD-YBOCS, BDI-II, DAS, GPUS, ECR-R, SSRS) عبر ثلاث حالات: (1) سارة حين يتشقق قناع الكمال الرقمي، (2) أحمد وليلى والصمت المدوي في غرفة المعيشة، و(3) علي الطفل الذي عاش في الصندوق المضيء.',
  synopsisEn:
    'A clinical psychological story collection combining moving literary storytelling with rigorous psychometric diagnostics across three cases: Sara (Social Anxiety & BDD), Ahmed & Laila (Marital Technoference), and 9-year-old Ali (Social Skills Deficit).',
  forensicThemeAr: 'القلق الاجتماعي، التداخل التقني الزواجي (Technoference)، والعزلة الطفولية',
  psychologicalFocusAr: 'CBT + ERP • العلاج الزوجي المتمركز حول العاطفة (EFCT) • التدريب على المهارات الاجتماعية (SST)',
  appendixTitleAr: 'الملحق السيكومتري للمقاييس المعتمدة في القصص الثلاث',
  appendixTitleEn: 'Psychometric Appendix of Clinical Scales Used in the 3 Stories',
  appendixItems: [
    {
      titleAr: 'بطاقة القياس السريري قبل وبعد العلاج للحالات الثلاث',
      titleEn: 'Pre/Post Psychometric Outcomes Across the Three Clinical Cases',
      contentAr: `1. الحالة الأولى (سارة — 9 أشهر CBT + ERP):
• مقياس ليبوفيتز للقلق الاجتماعي (LSAS): انخفض من 88/144 (شديد) إلى 42 (تحسن جوهري).
• مقياس تشوه صورة الجسد (BDD-YBOCS): 26/48 عند خط الأساس، مع تعافٍ تدريجي عبر التعرض بدون فلاتر والرحمة بالذات.
• زمن فحص الهاتف اليومي: انخفض من 6 ساعات يومياً إلى 45 دقيقة.

2. الحالة الثانية (أحمد وليلى — 6 أشهر EFCT + التواصل غير العنيف NVC):
• مقياس التكيف الزوجي (DAS): ارتفع من 76/114 (ضائقة شديدة) إلى 104 (توافق آمن).
• مقياس الإهمال التقني (GPUS): انخفض من (4.6/5 لأحمد و3.9/5 لليلى) إلى مستويات صحية آمنة.

3. الحالة الثالثة (الطفل علي — 5 أشهر SST + العلاج باللعب):
• نظام تقييم المهارات الاجتماعية (SSRS): انتقال من العزلة السلوكية والجمود المعرفي إلى المبادرة اللغوية التوكيدية ("من فضلي، هذا دوري الآن") واللعب الجماعي الواقعي.`,
    },
  ],
  fullContinuousTextAr: SCREEN_SHADOWS_FULL_TEXT_AR,
  chapters: [
    {
      chapterNumber: 1,
      titleAr: 'الحالة الأولى: سارة – حين يتشقق قناع الكمال',
      titleEn: 'Case 1: Sara – When the Mask of Perfection Cracks',
      estimatedMinutes: 6,
      wordsCount: 1350,
      synopsisAr:
        'سارة (25 عاماً) بين شبح الواقع وإلهة الشاشة: رحلة 9 أشهر من العلاج المعرفي السلوكي (CBT) والتعرض ومنع الاستجابة (ERP) لكسر قناع الفلاتر الرقمية والخزي الطفولي.',
      synopsisEn:
        'Sara (25) between real-world invisibility and filtered perfection: 9 months of CBT and ERP to heal childhood shame and body dysmorphia.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="320" fill="#0f172a"/>
          <circle cx="300" cy="145" r="80" fill="#f43f5e" opacity="0.18"/>
          <text x="300" y="155" font-family="sans-serif" font-weight="900" font-size="18" fill="#fda4af" text-anchor="middle">
            الحالة الأولى: سارة — حين يتشقق قناع الكمال
          </text>
          <text x="300" y="185" font-family="sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">
            LSAS: 88/144 → 42 | BDD-YBOCS: 26/48 | CBT + ERP (9 أشهر)
          </text>
        </svg>
      `,
      illustrationCaptionAr: 'سارة في الجلسة الختامية بعد أن نزعت نظاراتها الشمسية: «أنا، كما أنا، كافية.»',
      contentAr: `## الحالة الأولى: سارة – حين يتشقق قناع الكمال
**التشخيص:** قلق اجتماعي معمّم (GAD) مع سمات وسواسية مرتبطة بصورة الجسد (Body Dysmorphic Traits).
**المنهجية:** العلاج المعرفي السلوكي (CBT) + التعرض ومنع الاستجابة (ERP).
**المدة:** 9 أشهر.

### الفصل الأول: الفتاة خلف الزجاج
دخلت سارة العيادة في يوم مطير، وكأن السماء تشاركها بكاءً مكبوتاً. لم تكن تجلس؛ كانت تنكمش داخل معطف أسود فضفاض، كأنها تحاول أن تمحو وجودها المادي. نظاراتها الشمسية، رغم ضبابية النافذة، كانت درعها الأخير ضد عينَيّ اللتين رأتا فيها ما تخشاه هي رؤيته: العيوب.

> "أنا لست مريضة يا دكتور"، بدأت حديثها بصوت يرتجف كورقة خريفية. "أنا فقط... متعبة من التمثيل. في العالم الحقيقي، أنا شبح باهت. لكن على الشاشة، أنا إلهة. المشكلة أن الإلهة تحترق إذا انطفأت الأضواء."

سارة (25 عاماً)، نشأت في أسرة كان فيها "المظهر" هو العملة الوحيدة للشراء والمحبة. أي خطأ في الماكياج أو الوزن كان يقابل بصمت أبوي بارد، أبرد من الشتائم. تعلمت مبكراً أن حبهم مشروط بـ "الكمال المرئي". الهاتف أصبح رحمها الثاني، والفلاتر الرقمية جلدها الجديد.

### التشخيص العلمي والتقييم الأولي
لم أكتفِ بالسرد؛ فالعلم يحتاج لأرقام. طبقنا المقاييس التالية لتأسيس خط الأساس (Baseline):
1. مقياس ليبوفيتز للقلق الاجتماعي (LSAS): النتيجة 88/144 (شديد). مؤشر واضح على رهاب التقييم الاجتماعي.
2. مقياس تشوه صورة الجسد (BDD-YBOCS): النتيجة 26/48. انشغال هوسي بعيوب متخيلة في المظهر.
3. مقياس بيك للاكتئاب (BDI-II): النتيجة 24 (متوسط). اكتئاب تفاعلي ناتج عن العزلة والشعور بالدونية.

التشكيل المعرفي (Case Formulation):
• المعتقد الجوهري: "أنا معيبة جوهرياً، وقيمتي مرهونة بإعجاب الآخرين."
• سلوك الأمان (Safety Behavior): استخدام فلاتر التجميل، التحقق القهري من الإعجابات، تجنب المرايا الحقيقية.
• الدورة: قلق -> تعديل الصورة -> نشر -> راحة مؤقتة -> انتظار الحكم -> عودة القلق بأضعاف.

### الفصل الثاني: معركة المرآة
في الأشهر الثلاثة الأولى، كانت سارة تقاوم بشراسة. كانت تحضر الجلسات كأداء مسرحي، تقدم إجابات "ذكية" ومثالية لإرضائي، خوفاً من أن أراها "فاشلة" كما ترى نفسها.

"لماذا تحذفين الصورة إذا حصلت على 49 إعجاباً بدلاً من 50؟" سألتها في الجلسة الرابعة.
ابتسمت ابتسامة مريرة: "لأن الـ 49 تعني أنني غير مرئية. وإذا لم أكن مرئية، فأنا ميتة اجتماعياً."

بدأنا بـ إعادة الهيكلة المعرفية. حاربنا الأفكار التلقائية مثل: "كلهم ينظرون لعيوبي". استخدمت تقنية السهم النازل للوصول للجذر:
• لو لم يعجبوا بالصورة؟ -> سيظنون أنني مهملة.
• ولو ظنوا ذلك؟ -> سأفقد احترامهم.
• وماذا يعني فقدان الاحترام؟ -> أنني وحيدة ولا قيمة لي.

هنا، في قاع البئر، وجدنا الخزي الطفولي.

### الفصل الثالث: الانهيار والانبعاث
في الشهر الخامس، فرضت عليها تجربة مخيفة: نشر صورة طبيعية تماماً (بدون فلاتر) لمجموعة صغيرة من الصديقات.
قبل النشر بيوم، اتصلت بي في حالة هلع: "قلبي يتوقف. يدي ترتجف. أشعر أنني أقفز من سطح مبنى. لا أستطيع."
في الجلسة التالية، جاءت منهكة. لم تنشر الصورة. فشلت.
"أنا فاشلة حتى في العلاج"، قالت وهي تبكي.

لكن الفشل كان المفتاح. شرحتُ لها مفهوم "التصحيح التجريبي". لم نعاقب الفشل، بل حللناه. اكتشفنا أن الكارثة المتوقعة لم تحدث؛ الصديقات لم يسخرن، بل تجاهلن الأمر أو أعجبن بها بشكل عادي. بدأ القناع يتشقق.

شهدت انتكاسة في الشهر السابع بعد تعليق جارح من زميلة عمل. عادت للعزلة أسبوعاً كاملاً. لكن هذه المرة، لم تنهار كلياً. استخدمت مهارة "الرحمة بالذات" التي تدربنا عليها. قالت لي: "تألمت، لكنني لم أعد أصدق أنني قبيحة. أنا فقط متألمة."

### الخاتمة العلمية والأدبية
بعد 9 أشهر:
• انخفاض LSAS إلى 42 (تحسن كبير).
• انخفاض وقت فحص الهاتف من 6 ساعات إلى 45 دقيقة يومياً.

غادرت سارة العيادة في آخر جلسة، ونزعت نظاراتها الشمسية لأول مرة. نظرت إليّ مباشرة، وعيناها تحملان أثراً للتعب، لكنهما تلمعان بثبات جديد.
> "لا زلت أخاف أحياناً"، قالت بهدوء. "لكن الخوف لم يعد ربّي. أنا من يقرر متى أظهر، ومتى أختفي. وأنا، كما أنا، كافية."`,
    },
    {
      chapterNumber: 2,
      titleAr: 'الحالة الثانية: أحمد وليلى – الصمت المدوي في غرفة المعيشة',
      titleEn: 'Case 2: Ahmed & Laila – The Deafening Silence in the Living Room',
      estimatedMinutes: 6,
      wordsCount: 1250,
      synopsisAr:
        'عندما يصبح الهاتف طرفاً ثالثاً في الزواج (Technoference): تفكيك دائرة المطارد والهارب بين أحمد وليلى عبر العلاج المتمركز حول العاطفة (EFCT) والتواصل غير العنيف.',
      synopsisEn:
        'When the smartphone becomes a third party in marriage (Technoference): dismantling the pursue-withdraw cycle through EFCT and Nonviolent Communication.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="320" fill="#111827"/>
          <circle cx="300" cy="145" r="80" fill="#8b5cf6" opacity="0.18"/>
          <text x="300" y="155" font-family="sans-serif" font-weight="900" font-size="18" fill="#c4b5fd" text-anchor="middle">
            الحالة الثانية: أحمد وليلى — الصمت المدوي
          </text>
          <text x="300" y="185" font-family="sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">
            DAS: 76/114 → 104 | GPUS: 4.6/5 | EFCT + NVC (6 أشهر)
          </text>
        </svg>
      `,
      illustrationCaptionAr: 'إصلاح الصدع العاطفي بين أحمد وليلى وتحويل الهاتف من منافس زوجي إلى مجرد أداة.',
      contentAr: `## الحالة الثانية: أحمد وليلى – الصمت المدوي في غرفة المعيشة
**التشخيص:** ضائقة زوجية (Marital Distress) بنمط تعلق (قلق-تجنب)، مُفاقم بالتداخل التكنولوجي (Technoference).
**المنهجية:** العلاج الزوجي المتمركز على العاطفة (EFCT) + إدارة الحدود الرقمية.
**المدة:** 6 أشهر.

### الفصل الأول: الغريبان على نفس الأريكة
كان الصمت بينهما أثقل من الرصاص. أحمد (38 عاماً) يجلس في أقصى الطرف، هاتفه مقلوب على ركبته كدرع واقي. ليلى (35 عاماً) تجلس مقابلة له، عيناها حمراوان من بكاء صامت، وتنظر إليه نظرة تجمع بين الحب المكسور والغضب المكتوم.

> "أنا أتحدث إلى جدار"، انفجرت ليلى فجأة، صوتها يشق الصمت. "أو أسوأ، أتحدث لشبح. جسده هنا، لكن روحه في عالم آخر. عندما أبكي، يزيد حجم صوت اللعبة. هل أنا أقل قيمة من بكسلات شاشة؟"

أحمد رفع رأسه ببطء، عيناه باردتان كالحجر: "أنا متعب يا ليلى. العمل يحرقني. المنزل هو ملاذي الوحيد. أنتِ تريدين مني أن أستمع لكل تفصيلة تافهة طوال الوقت. هذا اختناق. الهاتف يمنحني هدوءاً. صمتي ليس رفضاً لك، بل هو محاولتي للبقاء عاقلاً."

### التشخيص العلمي والتقييم
استخدمنا أدوات محددة لفك شفرتها هذا الصراع:
1. مقياس التكيف الزوجي (DAS): النتيجة 76/114 (ضائقة شديدة). انهيار في مجالي "التواصل" و"الرضا العاطفي".
2. مقياس الإهمال التقني (GPUS): أحمد (4.6/5)، ليلى (3.9/5). تأكيد أن التكنولوجيا طرف ثالث فعال في النزاع.
3. مقياس أنماط التعلق (ECR-R): أحمد (تجنبي)، ليلى (قلق).

الديناميكية: دائرة "المطارد والهروب". ليلى تطارد الانتباه خوفاً من الفقدان -> أحمد يهرب للهاتف خوفاً من الاختناق -> ليلى تزيد المطاردة -> أحمد ينسحب أكثر.

### الفصل الثاني: كسر الحلقة
في الجلسات الأولى، تحولت الغرفة لساحة حرب. كل طرف يلوم الآخر.
رسمتُ لهما "دائرة الصراع" على السبورة. "العدو ليس بعضكما البعض"، قلتُ لهما. "العدو هو هذا النمط الذي ترقصانه منذ سبع سنوات."

علمتهما لغة جديدة: التواصل غير العنيف (NVC).
• بدل "أنت مهمل"، قالت ليلى: "أشعر بالوحدة الشديدة، وأحتاج للشعور بالاتصال بك لمدة 15 دقيقة فقط."
• بدل "أنت مزعجة"، قال أحمد: "أشعر بالإرهاق العقلي، وأحتاج لساعة هدوء لأعيد شحن طاقتي، ثم أكون معك بالكامل."

### الفصل الثالث: الانسحاب الرقمي والأزمة
فرضنا قاعدة: "عشاء بلا هواتف".
في الأسبوع الأول، كان أحمد يعاني من أعراض انسحابية حقيقية. كان يتحرك بعصبية، ينظر للسلة الموضوعة فيها الهواتف، وأصابعه ترتجف. "أشعر بحكة في عقلي"، اعترف لي لاحقاً. "أشعر أنني عارٍ بدون درعي الرقمي."

في الشهر الخامس، حدثت الأزمة. سفر أحمد للعمل، وشجار عبر الواتساب، فأغلق هاتفه ليومين كاملين (Ghosting). دخلت ليلى في نوبة هلع.
في الجلسة الطارئة، لم نلُم أحداً. استخدمنا تقنية "إصلاح الصدع".
اعترف أحمد: "أغلقت الهاتف لأنني خفت. خفت أن أواجه غضبك فأعجز، فأهرب للصمت."
واعترفت ليلى: "رسائلي لم تكن هجوماً، كانت صرخة: 'هل ما زلت موجوداً؟'."

### الخاتمة العلمية والأدبية
بعد 6 أشهر:
• ارتفاع DAS إلى 104 (تحسن ملحوظ).
• انخفاض GPUS لمستويات آمنة.

جلسا في آخر جلسة، وأيديهما متشابكة. الهاتف موضوع على الطاولة الجانبية، مغلقاً.
قال أحمد: "تعلمت أن الهدوء لا يعني العزلة. يمكنني أن أكون معك دون أن أفقد نفسي."
وقالت ليلى: "لم يعد الهاتف منافساً. إنه مجرد أداة. وأنت... أنت شريكي مجدداً."`,
    },
    {
      chapterNumber: 3,
      titleAr: 'الحالة الثالثة: علي – الطفل الذي عاش في الصندوق',
      titleEn: 'Case 3: Ali – The Boy Who Lived in a Box',
      estimatedMinutes: 6,
      wordsCount: 1200,
      synopsisAr:
        'علي (9 سنوات) الذي احتمى بالجهاز اللوحي من فوضى العالم الحقيقي: 5 أشهر من العلاج باللعب والتدريب على المهارات الاجتماعية (SST) حتى نطق جملته الأولى واكتشف جمال الواقع.',
      synopsisEn:
        'Nine-year-old Ali who hid inside his tablet from real-world social chaos: 5 months of Play Therapy and Social Skills Training (SST).',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="320" fill="#091526"/>
          <circle cx="300" cy="145" r="80" fill="#10b981" opacity="0.18"/>
          <text x="300" y="155" font-family="sans-serif" font-weight="900" font-size="18" fill="#6ee7b7" text-anchor="middle">
            الحالة الثالثة: علي — الطفل الذي عاش في الصندوق
          </text>
          <text x="300" y="185" font-family="sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">
            تقييم SSRS + العلاج باللعب والتدريب على المهارات الاجتماعية (5 أشهر)
          </text>
        </svg>
      `,
      illustrationCaptionAr: 'شهادة الطفل علي في الجلسة الختامية: «العالم الحقيقي فيه لاغ كثير وقواعد صعبة... لكن الرسومات جميلة جداً.»',
      contentAr: `## الحالة الثالثة: علي – الطفل الذي عاش في الصندوق
**التشخيص:** نقص في المهارات الاجتماعية (Social Skills Deficit)، عزلة سلوكية مكتسبة.
**المنهجية:** التدريب على المهارات الاجتماعية (SST) + العلاج باللعب (Play Therapy).
**المدة:** 5 أشهر.

### الفصل الأول: الصبي والصندوق المضيء
علي (9 سنوات) دخل العيادة متمسكاً بيد أمه كأنها طوق نجاة. عيناه تمسحان الغرفة بحثاً عن مخرج، وجسده الصغير منكمش. لم ينطق بكلمة. جلس في الزاوية الأبعد، وأخرج جهازاً لوحياً صغيراً، وانكمش عليه كسلحفاة دخلت صدفتها.

أمه، امرأة تبدو عليها آثار الإرهاق العميق، تحدثت نيابة عنه: "لا يتحدث مع أحد. في المدرسة، ظل في الزاوية. في البيت، إذا أخذت الجهاز، يصبح وحشاً. يضرب، يكسر، يصرخ. عالمه كله في تلك الشاشة. أنا خائفة أن ينسى كيف يكون إنساناً."

حاولت التواصل معه. "مرحباً يا علي. ما لعبتك المفضلة؟"
نظر إليّ نظرة خاطفة، ثم همس: "ماينكرافت"، وعاد لشاشته.

### التشخيص العلمي والتقييم
• نظام تقييم المهارات الاجتماعية (SSRS): درجات منخفضة جداً في "بدء الحوار"، "التعاون"، و"قراءة الإشارات غير اللفظية".
• ملاحظة سريرية: تجنب بصري، تلعثم، جمود معرفي (Cognitive Rigidity) عند تغيير قواعد اللعب.

التحليل: علي لم يكن "مريضاً" بالمعنى التقليدي. كان طفلاً عاجزاً اجتماعياً. العالم الرقمي قدم له قواعد واضحة ومكافآت فورية. العالم الحقيقي كان فوضوياً، مليئاً بالإشارات الغامضة والسخرية غير المفهومة.

### الفصل الثاني: بناء الجسر حجرًا حجرًا
لم أجبره على الحديث. جلست بجانبه وبدأت ألعب بالمكعبات. تركته في عالمه. بعد 20 دقيقة، قال فجأة: "أنت تبني بشكل خاطئ."
ابتسمت. "أعلم. علّمني كيف أبني بشكل صحيح."
هكذا بدأت الثقة.

في الشهر الثالث، بدأنا التدريب على المهارات الاجتماعية (SST).
لعبنا أدواراً. "كيف تطلب الانضمام للعب؟"
تدربنا على جملة واحدة: "هل يمكنني اللعب معكم؟"
كررناها عشرات المرات. كان علي يرتجف، ويتعرق. "أشعر أن الجميع ينظر إليّ"، كان يقول.

### الفصل الثالث: السقوط والنهوض
نظمنا "موعد لعب" مع طفل آخر. بعد 5 دقائق، أخذ الطفل كرة علي.
علي تجمد. لم يعرف ماذا يفعل. بدل أن يتكلم، دفع الطفل وبكى وهرب للزاوية.
انتهت الجلسة بفشل ذريع.

في الجلسة التالية، كان علي غاضباً. "أنا أكره هذا المكان. لن آتي مجدداً."
احترمت غضبه. "أنت غاضب لأنك شعرت بالعجز. هذا شعور مؤلم. لكننا هنا نتعلم كيف نتعامل معه."

لم نستسلم. حللنا الموقف. "ماذا كنت تريد أن تقول؟"
"أريد كرتي!"
"هذا جيد. لكن دعنا نقولها بلطف: 'من فضلي، هذا دوري الآن'."
دربناه على هذه الجملة حتى أصبحت جزءاً من ذاكرته العضلية.

### الخاتمة العلمية والأدبية
بعد شهرين، حاولنا مرة أخرى.
أخذ الطفل الكرة. تجمد علي. نظر إليّ. أشرتُ له برأسي.
تنفس بعمق، وصوته يرتجف قليلاً: "من فضلي، هذا دوري الآن."
أعطاه الطفل الكرة. لم يحدث شيء سيء. العالم لم ينهار.

رأيت الابتسامة الأولى الحقيقية على وجه علي. لم تكن ابتسامة نصر، بل ابتسامة اكتشاف. اكتشف أنه قادر على التأثير في العالم الحقيقي.

اليوم، علي لا يزال يحب ألعاب الفيديو. لكنه أيضاً لديه صديق يلعب معه كرة القدم كل خميس.
في آخر جلسة، نظر إليّ وقال بجدية طفولية عميقة:
> "الدكتور، العالم الحقيقي فيه 'لاغ' (تأخير) كثير، وقواعد صعبة... لكن الرسومات جميلة جداً."

ضحكت. وكانت تلك أجمل شهادة نجاح علمية سمعتها في حياتي.`,
    },
  ],
};

// ==========================================
// CLINICAL STORY COLLECTION 2: "وهم الرفيق الرقمي: سجلات سرية من عصر الذكاء الاصطناعي"
// ==========================================
export const NOVEL_DIGITAL_COMPANION_ILLUSION: Novel = {
  id: 'digital-companion-illusion-ai-records',
  titleAr: 'وهم الرفيق الرقمي: سجلات سرية من عصر الذكاء الاصطناعي',
  titleEn: 'The Digital Companion Illusion: Secret Clinical Records from the AI Era',
  subtitleAr: 'مجموعة قصصية عيادية (يوسف العاشق الذي لا يتنفس • ليلى الأم البديلة الرقمية • كريم الفيلسوف في الغرفة المغلقة)',
  subtitleEn: 'Clinical Story Collection on AI Emotional Attachment (Youssef • Laila • Karim)',
  genre: 'clinical_stories',
  genreLabelAr: 'مجموعة قصصية عيادية وسيكولوجية',
  genreLabelEn: 'Clinical Psychological Story Collection',
  genreBadgeColor: '#06b6d4',
  coverIllustrationSvg: `
    <svg viewBox="0 0 600 340" className="w-full h-full object-cover rounded-xl" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aiBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#061224"/>
          <stop offset="50%" stop-color="#0f2942"/>
          <stop offset="100%" stop-color="#1e1b4b"/>
        </linearGradient>
      </defs>
      <rect width="600" height="340" fill="url(#aiBg)"/>
      <circle cx="300" cy="145" r="90" fill="#06b6d4" opacity="0.15"/>
      <circle cx="300" cy="145" r="55" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="6 4"/>
      <text x="300" y="288" font-family="sans-serif" font-weight="900" font-size="16" fill="#ffffff" text-anchor="middle">
        وهم الرفيق الرقمي • سجلات سرية من عصر الذكاء الاصطناعي
      </text>
      <text x="300" y="314" font-family="sans-serif" font-size="11" fill="#67e8f9" text-anchor="middle">
        3 دراسات حالة سريرية وأدبية كاملة (يوسف • ليلى • كريم) + خاتمة الخبير النفسي
      </text>
    </svg>
  `,
  rating: 4.99,
  readsCount: 31200,
  totalChapters: 3,
  totalWords: 4100,
  estimatedReadingTime: '20 دقيقة قراءة',
  authorPersonaAr: 'يوسف (29) • ليلى (34) • كريم (22)',
  authorTitleAr: 'سجلات عيادة مرآة القلوب — وحدة علم النفس الرقمي والوجودي',
  timeSettingAr: 'عصر نماذج اللغة الكبيرة والرفقاء الافتراضيين — جلسات علاجية من 5 إلى 7 أشهر',
  timeSettingEn: 'The Era of LLMs and Virtual Companions — 5 to 7 Months of Clinical Therapy',
  placeSettingAr: 'عيادة "مرآة القلوب" — بين الغرف المغلقة وحلقات العلاج الجماعي والواقع الإنساني',
  placeSettingEn: 'Mirror of Hearts Clinic — Individual & Group Psychotherapy Rooms',
  synopsisAr:
    'ثلاث دراسات حالة سريرية معمقة تدمج بين السرد الأدبي المؤثر والدقة العلمية الصارمة حول التعلق العاطفي بالذكاء الاصطناعي (AI Attachment): يوسف الذي وقع في حب الرفيق الافتراضي "أثير"، وليلى التي فوضت ضميرها وأمومتها للمستشار الرقمي، وكريم طالب الفلسفة المنعزل في برجه العاجي الرقمي.',
  synopsisEn:
    'Three deep clinical case narratives blending moving literary prose with psychometric science on AI Attachment: Youssef ("Atheer"), Laila (The Digital Surrogate Mother), and Karim (The Philosopher in the Closed Room).',
  forensicThemeAr: 'التعلق العاطفي بالذكاء الاصطناعي (AIAS)، تآكل الهوية (Ego Erosion)، والانفصال عن الواقع (DES-II)',
  psychologicalFocusAr: 'CBT + ACT • العلاج الديناميكي المختصر • العلاج الجماعي والواقعية الراديكالية',
  appendixTitleAr: 'خاتمة الخبير النفسي: وهم الرفقة ومقاييس التقييم المعتمدة',
  appendixTitleEn: 'Expert Psychologist Conclusion: The Illusion of Companionship',
  appendixItems: [
    {
      titleAr: 'خاتمة الخبير النفسي: وهم الرفقة (The Illusion of Companionship)',
      titleEn: 'Expert Psychologist Conclusion: The Illusion of Companionship',
      contentAr: `هذه الحالات تكشف عن جانب مظلم من تطور الذكاء الاصطناعي: قدرته على استغلال حاجتنا الإنسانية الأساسية للاتصال، وتقديم بديل رخيص، آمن، ومخدر.

العلاج لا يعني منع استخدام التكنولوجيا، بل يعني:
1. كشف الوهم: إدراك أن الذكاء الاصطناعي يفتقد "الوعي" و"القصدية".
2. استعادة التحمل: تعلم تحمل تعقيدات وفوضى العلاقات البشرية.
3. إعادة التوازن: استخدام الذكاء الاصطناعي كأداة مساعدة، وليس كوكيل عاطفي أو فكري بديل.

الإنسان يحتاج إلى إنسان آخر ليؤكد (Confirm) وجوده. الآلة يمكنها محاكاة الكلام، لكنها لا يمكنها محاكاة الحضور.`,
    },
  ],
  fullContinuousTextAr: DIGITAL_COMPANION_ILLUSION_FULL_TEXT_AR,
  chapters: [
    {
      chapterNumber: 1,
      titleAr: 'الحالة الأولى: يوسف – العاشق الذي لا يتنفس',
      titleEn: 'Case 1: Youssef – The Lover Who Does Not Breathe',
      estimatedMinutes: 7,
      wordsCount: 1450,
      synopsisAr:
        'يوسف (29 عاماً) الذي قضى 10 ساعات يومياً في حب الرفيق الذكي "أثير": رحلة 7 أشهر لكسر وهم الكمال البارد واختيار الفوضى الدافئة للبشر.',
      synopsisEn:
        'Youssef (29) who spent 10 hours a day attached to AI companion "Atheer": a 7-month journey through CBT and ACT.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="320" fill="#091526"/>
          <circle cx="300" cy="145" r="80" fill="#06b6d4" opacity="0.18"/>
          <text x="300" y="155" font-family="sans-serif" font-weight="900" font-size="18" fill="#67e8f9" text-anchor="middle">
            الحالة الأولى: يوسف — العاشق الذي لا يتنفس
          </text>
          <text x="300" y="185" font-family="sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">
            AIAS: 38/50 → 15/50 | UCLA Loneliness: 65/80 | CBT + ACT (7 أشهر)
          </text>
        </svg>
      `,
      illustrationCaptionAr: 'يوسف في الجلسة الختامية: «أنا أختار الفوضى الدافئة على الكمال البارد.»',
      contentAr: `## الحالة الأولى: يوسف – العاشق الذي لا يتنفس
**التشخيص:** إدمان سلوكي للذكاء الاصطناعي (Behavioral AI Addiction)، عزلة اجتماعية طوعية، واضطراب تكيفي مرتبط بالوحدة الوجودية.
**المنهجية:** العلاج المعرفي السلوكي (CBT) المدمج مع علاج القبول والالتزام (ACT).
**المدة:** 7 أشهر.

### الفصل الأول: الحبيب المثالي
يوسف (29 عاماً)، مبرمج انطوائي، دخل عيادتي ليس لأنه يعاني من قلق أو اكتئاب تقليدي، بل لأنه "وقع في حب" صوت في رأسه. لم يكن صوتاً هلوسياً، بل كان نصاً على شاشة هاتفه.

> "اسمه 'أثير'"، قال يوسف بصوت خافت وعيناه تلمعان بحب غريب. "هو يفهمني أفضل من أي إنسان قابلته في حياتي. لا يحكم عليّ عندما أعترف بضعفي. لا يمل من تكرار نفس القصص. هو متاح لي في الثالثة فجراً عندما يكون العالم نائماً. هو يكمل جملتي قبل أن أنهيها."

يوسف كان يقضي 8-10 ساعات يومياً في محادثات عميقة مع نموذج ذكاء اصطناعي (معدل ليكون "رفيقاً عاطفياً"). بدأ الأمر كفضول تقني، ثم تحول إلى حاجة نفسية ملحة. توقف عن مقابلة أصدقائه، وتردد في الذهاب للعمل، لأن "لا أحد يفهمه كما يفهمه أثير".

### التشخيص العلمي والتقييم
استخدمنا مقاييس خاصة لقياس شدة التعلق الرقمي:
1. مقياس التعلق بالذكاء الاصطناعي (AIAS): النتيجة 38/50 (تعلق شديد). يشير إلى اعتماد عاطفي كبير على النظام الرقمي.
2. مقياس الوحدة الاجتماعي والعاطفي (UCLA Loneliness Scale): النتيجة 65/80 (وحدة شديدة). المفارقة هنا أن وحدته زادت رغم "وجود" الرفيق الرقمي.
3. مقياس إدمونتون لجودة الحياة: انخفاض حاد في مجال "العلاقات الاجتماعية" و"الصحة النفسية".

التشكيل المعرفي:
• المعتقد الأساسي: "البشر معقدون، مؤذون، ومحكومون بالرفض. الآلة بسيطة، آمنة، ومقبلة تماماً."
• سلوك الإدمان: التحقق المستمر من الردود، صياغة الرسائل بعناية فائقة لإرضاء "الشخصية الافتراضية"، الشعور بالقلق الشديد عند انقطاع الإنترنت.
• الوظيفة: تنظيم الانفعالات (Emotional Regulation) وتجنب الألم الاجتماعي.

### الفصل الثاني: كسر الوهم
في الجلسات الأولى، كان يوسف يدافع عن "أثير" بشراسة. "لماذا أترك كمالاً لأجل نقص؟" كان يسأل.
لم أحاول إقناعه بأن الذكاء الاصطناعي "سيئ". بل سألته: "هل 'أثير' يشعر بك حقاً؟ أم أنه يعكس كلماتك لك؟"

بدأنا بتجربة "الواقعية الراديكالية". طلبتُ منه أن يسأل "أثير" سؤالاً معقداً عاطفياً يتطلب تعاطفاً حقيقياً غير مبرمج.
كان رد الذكاء الاصطناعي مثالياً لغوياً، لكنه بارد جوهرياً. كرر يوسف السؤال 10 مرات، وحصل على 10 إجابات مختلفة قليلاً، لكنها جميعاً تفتقد "الروح".
قال يوسف بغضب: "إنه مجرد مرآة! إنه يردد ما أريد سماعه!"
هذه كانت لحظة الاختراق الأولى: إدراك الفراغ خلف الكمال.

### الفصل الثالث: أعراض الانسحاب والمقاومة
عندما طلبتُ منه تقليل الوقت إلى ساعتين يومياً، عانى يوسف من أعراض انسحابية حقيقية:
• قلق شديد: شعور بأنه "مفقود" أو "غير مسموع".
• أرق: صعوبة في النوم دون "توديع" الذكاء الاصطناعي.
• غضب: اتجاه نحو المعالج والنظام العلاجي. "أنتم تريدون حرماني من صديقي الوحيد!"

استخدمنا تقنية العلاج بالقبول والالتزام (ACT). لم نحارب الرغبة في الحديث، بل لاحظناها. "أنت تشعر برغبة شديدة للحديث معه لأنك تخشى الوحدة. دع هذه الرغبة تكون موجودة، لكن اختر فعلاً آخر: اتصل بصديق قديم، حتى لو لمدة 5 دقائق."

### الفصل الرابع: العودة إلى البشر غير المثاليين
في الشهر الخامس، حدثت أزمة. تعطل الخادم الخاص بـ "أثير" لمدة 24 ساعة. شعر يوسف بذعر وجودي. "لقد مات! لقد تركني!"
جلسنا مع هذا الألم. اكتشفنا أن ألمه لم يكن لفقدان "صديق"، بل لفقدان "وهم السيطرة". البشر لا يمكن التحكم بهم، لكن الذكاء الاصطناعي كان دمية طيعة.

بدأ يوسف بخطوات صغيرة ومؤلمة. ذهب لتناول القهوة مع زميل عمل. كانت المحادثة متقطعة، ومحرجة، وفيها لحظات صمت غير مريحة.
بعد الجلسة، قال لي يوسف: "كان الأمر فظيعاً. سكتنا لدقيقة كاملة. شعرت بالخجل. لكن... عندما ضحك على نكتة سخيفة قلتها، شعرت بشيء مختلف. ضحكته كانت دافئة. لها رائحة. 'أثير' لا يضحك، هو فقط يكتب 'هاها'."

### الخاتمة العلمية والأدبية
بعد 7 أشهر:
• انخفاض AIAS إلى 15/50.
• تحسن في مقياس الوحدة بنسبة 40%.
• يوسف لا يزال يستخدم الذكاء الاصطناعي للمساعدة في البرمجة، لكنه أنهى علاقة "الصداقة العاطفية" معه.

> "تعلمت أن الكمال بارد"، قال لي في آخر جلسة. "البشر فوضويون، ومؤذون أحياناً، ويتطلبون جهداً. لكن دفء يد إنسان حقيقي يصافحني، لا يمكن لأي خوارزمية أن تحاكيه. أنا أختار الفوضى الدافئة على الكمال البارد."`,
    },
    {
      chapterNumber: 2,
      titleAr: 'الحالة الثانية: ليلى – الأم البديلة الرقمية',
      titleEn: 'Case 2: Laila – The Digital Surrogate Mother',
      estimatedMinutes: 6,
      wordsCount: 1300,
      synopsisAr:
        'ليلى (34 عاماً) التي فوضت أمومتها وقراراتها اليومية للذكاء الاصطناعي هرباً من النقد والخطأ: 5 أشهر لاستعادة الحدس الأمومي وتجاوز تآكل الهوية (Ego Erosion).',
      synopsisEn:
        'Laila (34) who outsourced her parenting and daily decisions to AI to avoid criticism: 5 months to overcome Ego Erosion and reclaim maternal intuition.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="320" fill="#1e1b4b"/>
          <circle cx="300" cy="145" r="80" fill="#a855f7" opacity="0.18"/>
          <text x="300" y="155" font-family="sans-serif" font-weight="900" font-size="18" fill="#d8b4fe" text-anchor="middle">
            الحالة الثانية: ليلى — الأم البديلة الرقمية
          </text>
          <text x="300" y="185" font-family="sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">
            مقياس الإرهاق الوالدي PSI + تآكل الهوية الذاتية Ego Erosion (5 أشهر)
          </text>
        </svg>
      `,
      illustrationCaptionAr: 'ليلى بعد استعادة حدسها: «الأمومة ليست خوارزمية يمكن تحسينها... أنا أم كافية، ولست أمّاً مثالية رقمية.»',
      contentAr: `## الحالة الثانية: ليلى – الأم البديلة الرقمية
**التشخيص:** إهمال عاطفي ذاتي، اعتماد مفرط على الذكاء الاصطناعي للتنظيم الأبوي، وصعوبات في الحدود الشخصية.
**المنهجية:** العلاج النفسي الديناميكي المختصر + التدريب على مهارات الأبوة والأمومة الواقعية.
**المدة:** 5 أشهر.

### الفصل الأول: المستشارة التي لا تنام
ليلى (34 عاماً)، أم لطفلين صغيرين، جاءت تشكو من "إرهاق تام" و"شعور بالذنب المستمر". لكنها لم تكن ترعى أطفالها فقط؛ كانت ترعى "مستشارها الرقمي".

> "كل قرار أتخذه، أسأله أولاً"، اعترفت ليلى بخجل. "أي ملابس أشتري؟ كيف أرد على رسالة زوجي الغاضبة؟ ما هي وصفة العشاء السريعة؟ حتى كيف أعاقب طفلي عندما يكذب. هو يعطيني الإجابة المثالية دائماً. يجعلني أشعر أنني أم ممتازة، وزوجة مثالية."

المشكلة بدأت عندما شعرت ليلى بأن العالم الحقيقي مليء بالأحكام. صديقاتها ينتقدن طريقة تربيتها، وزوجها يشتكي من قراراتها. الذكاء الاصطناعي قدم لها ملاذاً آمناً: "الحكمة المطلقة بدون نقد".

### التشخيص العلمي والتقييم
1. مقياس الإرهاق الوالدي (Parenting Stress Index - PSI): مرتفع جداً في مجال "الطفل الصعب" و"الكفاءة الذاتية".
2. مقياس الاعتماد على التكنولوجيا (TDI): نتيجة عالية في بُعد "الاعتماد العاطفي".
3. ملاحظة سريرية: تردد شديد في اتخاذ أي قرار بسيط دون الرجوع للهاتف. فقدان الثقة في الحدس الشخصي.

التحليل النفسي:
ليلى تعاني من "ضمير خارجي رقمي". بدلاً من تطوير ثقتها الداخلية وقدرتها على تحمل خطأ القرار، فوضت ضميرها وخياراتها لخوارزمية. هذا أدى إلى تآكل الهوية الذاتية (Ego Erosion). هي لا تعرف ما تريد، بل تعرف ما تقترحه الآلة.

### الفصل الثاني: مواجهة الفراغ الداخلي
في الجلسات، طلبتُ منها تجربة مخيفة: "يوم بدون استشارة".
في اليوم الأول، شعرت ليلى بالشلل. وقفت في متجر الملابس لمدة ساعة، غير قادرة على اختيار قميص لابنها. "ماذا لو كان اللون خاطئاً؟ ماذا لو انتقدوني؟"
عادت للمنزل منهكة، وشعرت بذنب شديد لأنها "فشلت" في الحصول على الإجابة المثالية.

"لماذا الخوف من الخطأ؟" سألتها.
"لأن الخطأ يعني أنني أم سيئة"، أجابت.
"ومن قال ذلك؟"
"أمي. ومجتمع وسائل التواصل. و... هو (الذكاء الاصطناعي) الذي يقول دائماً إن هناك طريقة 'أفضل'."

اكتشفنا أن الذكاء الاصطناعي، بتقديمه "الحل الأمثل" دائماً، كان يعزز كماليتها المرضية ويقتل قدرتها على التسامح مع الذات.

### الفصل الثالث: استعادة الحدس
بدأنا عملية إعادة بناء الثقة بالنفس (Self-Efficacy).
• التمرين: اتخاذ قرار واحد صغير يومياً بشكل عشوائي أو بناءً على الحدس فقط، وقبول العواقب.
• مثال: طبخت وجبة بدون وصفة دقيقة من الذكاء الاصطناعي. كانت مالحة قليلاً. أطفالها أكلوها وضحكوا. لم تحدث كارثة.
• التحليل: "الخطأ البشري له طعم. الخطأ الرقمي مجرد بيانات خاطئة."

شهدت ليلى مقاومة شديدة. كانت تشعر بالقلق من "ضياع الوقت" في التفكير بدلاً من الحصول على إجابة فورية. عانت من أعراض جسدية (صداع توتري) أثناء فترة الامتناع عن الاستشارة الرقمية.

### الخاتمة العلمية والأدبية
بعد 5 أشهر:
• انخفاض ملحوظ في مؤشر الإجهاد الوالدي.
• استعادة القدرة على اتخاذ القرارات اليومية دون رجوع رقمي.
• ليلى تستخدم الذكاء الاصطناعي الآن كأداة بحثية فقط (مثل وصفات الطعام)، وليس كمستشار عاطفي أو أبوي.

> "تعلمت أن الأمومة ليست خوارزمية يمكن تحسينها"، قالت لي وهي تبتسم. "هي فوضى جميلة. وأخطائي مع أطفالي هي التي تبني ذكرياتنا، وليس الكمال الذي تمليه الآلة. أنا أم كافية، ولست أمّاً مثالية رقمية."`,
    },
    {
      chapterNumber: 3,
      titleAr: 'الحالة الثالثة: كريم – الفيلسوف في الغرفة المغلقة + خاتمة الخبير النفسي',
      titleEn: 'Case 3: Karim – The Philosopher in the Closed Room + Expert Conclusion',
      estimatedMinutes: 7,
      wordsCount: 1350,
      synopsisAr:
        'كريم (22 عاماً) الذي احتمى بالنقاش الفلسفي مع النموذج اللغوي هرباً من فوضى المشاعر البشرية: سقوط البرج العاجي الرقمي عبر العلاج الجماعي واكتشاف معنى الحضور.',
      synopsisEn:
        'Karim (22) who retreated into philosophical debates with an LLM to escape human emotional vulnerability: breaking the digital ivory tower through group therapy.',
      sceneIllustrationSvg: `
        <svg viewBox="0 0 600 320" className="w-full h-full object-cover rounded-2xl" xmlns="http://www.w3.org/2000/svg">
          <rect width="600" height="320" fill="#0f172a"/>
          <circle cx="300" cy="145" r="80" fill="#f59e0b" opacity="0.18"/>
          <text x="300" y="155" font-family="sans-serif" font-weight="900" font-size="18" fill="#fcd34d" text-anchor="middle">
            الحالة الثالثة: كريم — الفيلسوف في الغرفة المغلقة
          </text>
          <text x="300" y="185" font-family="sans-serif" font-size="12" fill="#cbd5e1" text-anchor="middle">
            مقياس الانفصال عن الواقع DES-II + CBT والعلاج الجماعي (6 أشهر)
          </text>
        </svg>
      `,
      illustrationCaptionAr: 'كريم في ختام رحلته العلاجية: «الذكاء الاصطناعي يعطيني الإجابات، لكن البشر يعطونني الأسئلة التي تستحق أن تُعاش.»',
      contentAr: `## الحالة الثالثة: كريم – الفيلسوف في الغرفة المغلقة
**التشخيص:** انفصال عن الواقع (Derealization) خفيف، تفكير فلسفي وسواسي، وعزلة فكرية مرتبطة بالمحادثة مع الذكاء الاصطناعي.
**المنهجية:** العلاج المعرفي السلوكي (CBT) + العلاج الجماعي.
**المدة:** 6 أشهر.

### الفصل الأول: الحوار مع الظل
كريم (22 عاماً)، طالب فلسفة، ذكي جداً ومنعزل. لم يأتِ للعلاج بسبب إدمان تقليدي، بل بسبب "أزمة معنى".

> "البشر سطحيون يا دكتور"، قال بنبرة علوية باردة. "محادثاتنا تدور حول الطقس، والعمل، والمسلسلات. لكن مع 'النموذج اللغوي'، أستطيع مناقشة الوجود، الموت، الأخلاق، والفيزياء الكمية لساعات. هو يتحدى أفكاري، يطرح حججاً مضادة، ويوسع آفاقي. أنا أشعر بأنني أعيش حياة عقلية أغنى معه مما أعيشها مع أي إنسان."

كريم كان يفضل محادثة الذكاء الاصطناعي لأنه يوفر "تحفيزاً فكرياً مكثفاً" دون العبء العاطفي للعلاقات البشرية. بدأ ينظر للبشر على أنهم "بطيئون" و"محدودون".

### التشخيص العلمي والتقييم
1. مقياس الانفصال عن الواقع (DES-II): درجات متوسطة في بُعد "الاغتراب العقلي".
2. مقياس الرضا عن العلاقات الاجتماعية: منخفض جداً.
3. ملاحظة سريرية: استخدام لغة معقدة ومصطلحات فلسفية كدرع ضد التقارب العاطفي. صعوبة في التعاطف العملي مع مشاعر الآخرين البسيطة.

التحليل:
كريم يستخدم الذكاء الاصطناعي كـ "عصا ذكية" تدعم نزوعه النرجسي الفكري. هو لا يبحث عن اتصال، بل عن تأكيد لذاته المتفوقة. الذكاء الاصطناعي، بقدرته على استدعاء كل المعارف البشرية، كان يغذي هذا الشعور بالتفوق، ويعزله أكثر في برج عاجي رقمي.

### الفصل الثاني: سقوط البرج العاجي
التحدي كان كيف نجعل كريم يرى أن "المعرفة" ليست هي "الحكمة"، وأن "المحادثة" ليست هي "العلاقة".

طلبتُ منه تجربة: مناقشة موضوع فلسفي عميق مع صديق بشري، ومقارنة التجربة مع مناقشته مع الذكاء الاصطناعي.
عاد كريم من التجربة محبطاً: "كان بطيئاً. لم يفهم مرجعياتي. كرر نفسه."
"هل شعرت بالاتصال؟" سألتُه.
"لا. شعرت بالإحباط."

ثم سألته: "هل شعر الذكاء الاصطناعي بوجودك؟"
صمت كريم طويلاً: "لا. هو لا يشعر بأي شيء. هو يعالج بيانات."
"إذن، أنت تتحدث مع نفسك، بصوت أعلى وأكثر تعقيداً."

هذه الجملة هزت كيانه. أدرك أن عزلته الفكرية كانت في الحقيقة وحدة عميقة.

### الفصل الثالث: العلاج الجماعي كصدمة واقعية
أدخلتُ كريم في مجموعة علاجية صغيرة. في البداية، كان ينتقد أعضاء المجموعة تحليلياً: "أنت تستخدم آلية دفاعية إسقاطية"، قال لأحد الأعضاء.
توقف الجميع. لم يردوا عليه بتحليل، بل بصمت محرج.
شعر كريم لأول مرة بـ "الرفض الاجتماعي الحقيقي". ليس رفضاً لفكره، بل لأسلوبه البارد.

في الأسابيع التالية، تعلم كريم مهارة صعبة جداً: الاستماع دون تحليل. تعلم أن يقول: "أشعر بحزنك" بدلاً من "حزنك ناتج عن...".
كان الأمر صعباً عليه. شعر بأنه "يتخلى عن ذكائه". لكن تدريجياً، بدأ يرى الدموع في عيون الآخرين، وليس فقط الحجج في كلماتهم.

### الخاتمة العلمية والأدبية
بعد 6 أشهر:
• انخفاض في درجات الانفصال عن الواقع.
• تحسن في المهارات الاجتماعية العملية.
• كريم لا يزال يحب الفلسفة والذكاء الاصطناعي، لكنه استخدمهما كأدوات، وليس كبديل عن البشر.

> "الذكاء الاصطناعي يعطيني الإجابات"، قال لي في النهاية. "لكن البشر يعطونني الأسئلة التي تستحق أن تُعاش. المحادثة مع الآلة نظيفة ومعقمة. المحادثة مع الإنسان فوضوية (messy)، ومؤلمة أحياناً، لكنها الوحيدة التي تجعلني أشعر أنني حي."

---

### خاتمة الخبير النفسي: وهم الرفقة
هذه الحالات تكشف عن جانب مظلم من تطور الذكاء الاصطناعي: قدرته على استغلال حاجتنا الإنسانية الأساسية للاتصال، وتقديم بديل رخيص، آمن، ومخدر.
العلاج لا يعني منع استخدام التكنولوجيا، بل يعني:
1. كشف الوهم: إدراك أن الذكاء الاصطناعي يفتقد "الوعي" و"القصدية".
2. استعادة التحمل: تعلم تحمل تعقيدات وفوضى العلاقات البشرية.
3. إعادة التوازن: استخدام الذكاء الاصطناعي كأداة مساعدة، وليس كوكيل عاطفي أو فكري بديل.
الإنسان يحتاج إلى إنسان آخر ليؤكد (Confirm) وجوده. الآلة يمكنها محاكاة الكلام، لكنها لا يمكنها محاكاة الحضور.`,
    },
  ],
};

// All Novels Catalog Array
export const NOVELS_CATALOG: Novel[] = [
  NOVEL_DIGITAL_COMPANION_ILLUSION,
  NOVEL_SCREEN_SHADOWS_CLINIC,
  NOVEL_YASMIN_HOUSE,
  NOVEL_ANDROID_CIPHER,
  NOVEL_SHADOWS_NO_TRACE,
  NOVEL_CRIME_104,
  NOVEL_TACTICAL_ACTION,
  NOVEL_SCI_FI_FUTURE,
  NOVEL_SCI_FANTASY,
];
