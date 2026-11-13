import React from 'react';
import {
  BookOpen,
  Brain,
  Layers,
  Scale,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Globe,
  FileText,
  Bookmark,
  ExternalLink,
  Cpu,
  Lock,
  Heart,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { PageSEO } from '../components/PageSEO';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { OFFICIAL_LOGO_URL } from '../utils/logoAsset';

interface Props {
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
}

export const SourcesMethodologyPage: React.FC<Props> = ({
  onBackToHome,
  onNavigatePage,
}) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const [theme] = useAppTheme();
  const isLight = theme === 'light';
  const isAr = language === 'ar';

  const academicReferences = isAr
    ? [
        {
          title: 'نموذج البيت العلائقي المتين (Sound Relationship House Theory)',
          author: 'د. جون غوتمان (Dr. John M. Gottman & Dr. Julie Schwartz Gottman, 1999)',
          journal: 'The Gottman Institute & Journal of Family Psychology',
          details:
            'يركز هذا النموذج على بناء خرائط الحب المعرفية، والتعبير عن الإعجاب والتقدير، والاستجابة لمحاولات التقارب والترميم العاطفي (Repair Attempts)، وإدارة الخلافات الزوجية بأسلوب متزن بدلاً من التجريح أو الانسحاب الدفاعي.',
        },
        {
          title: 'نظرية التعلق العاطفي للراشدين (Adult Attachment Theory - ECR-R)',
          author: 'جون بولبي، ماري إينسورث، وكريس فرالي (Bowlby, Ainsworth, & Fraley et al., 2000)',
          journal: 'Journal of Personality and Social Psychology',
          details:
            'أداة قياس مقننة تقيس بعدين أساسيين في العلاقات: قلق التعلق (Attachment Anxiety) وتجنب التعلق (Attachment Avoidance). تساعد الأفراد في تحديد نمط ارتباطهم (الآمن، القلق، أو التجنبي) وتأثيره المباشر على الأمان الزوجي.',
        },
        {
          title: 'نظرية الحب الثلاثية ومثلث المشاعر (Triangular Theory of Love)',
          author: 'روبرت ستيرنبرغ (Robert J. Sternberg, 1986)',
          journal: 'Psychological Review, 93(2), 119-135',
          details:
            'تحدد النظرية ثلاثة أركان أساسية للعلاقات: الحميمية (Intimacy - القرب الوجداني)، الشغف (Passion - الجاذبية والطاقة المشتركة)، والالتزام (Commitment - القرار الواعي باستمرار وبناء العلاقة).',
        },
        {
          title: 'مقياس السمات الـ16 ونظرية الشخصية (16 Personality Factor Questionnaire)',
          author: 'ريموند كاتل (Raymond B. Cattell, 1946 / 1993)',
          journal: 'Institute for Personality and Ability Testing (IPAT)',
          details:
            'من أقدم وأدق المقاييس السيكومترية التي تحلل الشخصية عبر 16 سمة أولية وخمسة أبعاد عالمية عليا، مما يساعد في فهم أساليب حل المشكلات، والاتزان الوجداني، والتفاعل الاجتماعي.',
        },
        {
          title: 'نظرية الذكاءات المتعددة (Multiple Intelligences Theory)',
          author: 'هوارد جاردنر ووالتر ماكينزي (Howard Gardner, 1983; Walter McKenzie, 1999)',
          journal: 'Frames of Mind: The Theory of Multiple Intelligences',
          details:
            'تجاوز المفهوم التقليدي الضيق للذكاء ليشمل 8 مسارات معرفية متكاملة: الذكاء اللغوي، المنطقي، البصري المكاني، الموسيقي، الحركي، الاجتماعي التفاعلي، والتأملي الذاتي والطبيعي.',
        },
        {
          title: 'علم النفس المالي ومخططات الإنفاق (Financial Psychology & Money Scripts)',
          author: 'برادلي كلونتز وتيد كلونتز (Dr. Bradley Klontz & Ted Klontz, 2011)',
          journal: 'Journal of Financial Therapy',
          details:
            'دراسة المعتقدات اللاواعية حول المال والإنفاق وكيف تؤثر على الاستقرار الأسري وتوافق الشريكين في إدارة الميزانية المنزلية.',
        },
      ]
    : [
        {
          title: 'The Sound Relationship House Theory',
          author: 'Dr. John M. Gottman & Dr. Julie Schwartz Gottman (1999)',
          journal: 'The Gottman Institute & Journal of Family Psychology',
          details:
            'Focuses on building cognitive love maps, sharing admiration, responding to bids for connection, utilizing repair attempts during conflict, and establishing shared existential meaning.',
        },
        {
          title: 'Adult Attachment Theory & The ECR-R Inventory',
          author: 'John Bowlby, Mary Ainsworth, & R. Chris Fraley et al. (2000)',
          journal: 'Journal of Personality and Social Psychology',
          details:
            'A psychometrically validated construct measuring attachment anxiety and attachment avoidance, enabling individuals to recognize whether their attachment blueprint is secure, anxious, or avoidant.',
        },
        {
          title: 'Triangular Theory of Love',
          author: 'Robert J. Sternberg (1986)',
          journal: 'Psychological Review, 93(2), 119-135',
          details:
            'Defines relationship dynamics through three intersecting vertices: intimacy (emotional warmth and vulnerability), passion (physical attraction and drive), and commitment (conscious decision to sustain partnership).',
        },
        {
          title: 'Cattell 16 Personality Factor Model (16PF)',
          author: 'Raymond B. Cattell (1946 / 1993)',
          journal: 'Institute for Personality and Ability Testing (IPAT)',
          details:
            'A foundational psychometric model identifying 16 primary personality factors alongside 5 global second-order dimensions, mapping behavioral stability, warmth, and cognitive problem-solving.',
        },
        {
          title: 'Multiple Intelligences Theory',
          author: 'Howard Gardner (1983) & Walter McKenzie (1999)',
          journal: 'Frames of Mind: The Theory of Multiple Intelligences',
          details:
            'Expands beyond singular IQ metrics into 8 distinct cognitive pathways: verbal-linguistic, logical-mathematical, spatial, interpersonal, intrapersonal, bodily-kinesthetic, and naturalist.',
        },
        {
          title: 'Financial Psychology & Money Scripts Inventory',
          author: 'Dr. Bradley Klontz & Ted Klontz (2011)',
          journal: 'Journal of Financial Therapy',
          details:
            'Examines subconscious financial beliefs and habits to understand how differing money perspectives affect domestic harmony and long-term marital equilibrium.',
        },
      ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isAr
      ? 'المرجعية الأكاديمية والمنهجية السيكومترية المعتمدة | مرآة القلوب'
      : 'Academic References & Psychometric Methodology | Mirror of Hearts',
    description: isAr
      ? 'المنهجية العلمية والأسس النفسية لمنصة «مرآة القلوب»: دراسة تحليلية في قياس التوافق الإنساني وأخلاقيات البيانات والنماذج الإكلينيكية (غوتمان، بيك، وبولبي).'
      : 'Scientific methodology and psychological underpinnings of Mirror of Hearts: Clinical models (Gottman, Beck, Bowlby), psychometric scoring, and data ethics.',
    url: 'https://miratalqulub.com/#/methodology',
    publisher: {
      '@type': 'Organization',
      name: 'مرآة القلوب - Mirror of Hearts',
      email: 'one497303@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Amman',
        addressCountry: 'JO',
      },
    },
  };

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`w-full min-h-screen py-6 sm:py-10 px-3 sm:px-6 transition-colors duration-300 ${
        isLight ? 'bg-slate-50 text-slate-900' : 'text-slate-100'
      }`}
    >
      <PageSEO
        title={
          isAr
            ? 'المرجعية الأكاديمية والمنهجية السيكومترية المعتمدة | مرآة القلوب'
            : 'Academic References & Psychometric Methodology | Mirror of Hearts'
        }
        description={
          isAr
            ? 'المنهجية العلمية والأسس النفسية لمنصة «مرآة القلوب»: دراسة تحليلية في قياس التوافق الإنساني وأخلاقيات البيانات والنماذج الإكلينيكية المعتمدة.'
            : 'Scientific methodology and clinical foundations of Mirror of Hearts: Gottman, Beck, Bowlby models, psychometric scoring, and data ethics.'
        }
        canonicalPath="/#/methodology"
        language={language}
        pageType="website"
        structuredData={structuredData}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb and Controls */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 pb-4 border-b ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}
        >
          <div
            className={`flex items-center gap-2 text-xs ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            <button
              onClick={onBackToHome}
              className="hover:text-rose-500 transition cursor-pointer flex items-center gap-1 font-semibold"
            >
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            </button>
            <span>/</span>
            <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isAr ? 'المنهجية العلمية' : 'Scientific Methodology'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-200 text-sky-700 shadow-2xs'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-sky-300'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>

            <button
              onClick={onBackToHome}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                isLight
                  ? 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700'
                  : 'bg-rose-500/20 hover:bg-rose-500/30 border-rose-500/40 text-rose-300'
              }`}
            >
              {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
            </button>
          </div>
        </div>

        {/* Hero Title & Study Intro */}
        <div
          className={`p-6 sm:p-10 rounded-3xl border shadow-xl transition-all duration-300 ${
            isLight
              ? 'bg-gradient-to-br from-indigo-50/80 via-white to-slate-50 border-indigo-100 shadow-indigo-100/50'
              : 'bg-gradient-to-r from-indigo-950/40 via-slate-900/80 to-purple-950/40 border-indigo-500/30 shadow-2xl backdrop-blur-xl'
          }`}
        >
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-14 h-14 rounded-2xl p-0.5 bg-gradient-to-tr from-rose-500 via-pink-500 to-violet-600 shadow-lg shadow-rose-500/25 shrink-0 overflow-hidden">
              <div className="w-full h-full rounded-[14px] bg-[#0b0e17] overflow-hidden flex items-center justify-center">
                <img
                  src={OFFICIAL_LOGO_URL}
                  alt={isAr ? 'شعار مرآة القلوب الرسمي' : 'Mirror of Hearts Official Logo'}
                  className="w-full h-full object-cover rounded-[14px]"
                />
              </div>
            </div>
            <div>
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${
                  isLight
                    ? 'bg-indigo-100/80 border-indigo-200 text-indigo-800'
                    : 'bg-indigo-500/20 border-indigo-400/30 text-indigo-300'
                }`}
              >
                <Brain className="w-3.5 h-3.5" />
                <span>
                  {isAr
                    ? 'المرجعية الأكاديمية والمنهجية السيكومترية المعتمدة'
                    : 'Validated Academic References & Psychometric Methodology'}
                </span>
              </div>
              <h1
                className={`text-xl sm:text-3xl font-black font-['Alexandria'] mt-2 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr
                  ? 'المنهجية العلمية والأسس النفسية لمنصة «مرآة القلوب»'
                  : 'Scientific Methodology & Psychological Foundations'}
              </h1>
              <p
                className={`text-xs sm:text-sm font-semibold mt-1 ${
                  isLight ? 'text-indigo-600' : 'text-indigo-300'
                }`}
              >
                {isAr
                  ? 'دراسة تحليلية في قياس التوافق الإنساني وأخلاقيات البيانات'
                  : 'Analytical Study in Relational Compatibility Psychometrics & Data Ethics'}
              </p>
            </div>
          </div>

          <p
            className={`text-xs sm:text-sm leading-relaxed md:leading-loose ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            {isAr
              ? 'تُعد منصة «مرآة القلوب» (miratalqulub.com) بيئة بحثية وتطبيقية متخصصة في علم النفس التوافقي والقياسات السيكومترية الحديثة. صُممت حاسبة التوافق والمختبرات الملحقة بها استناداً إلى أطر نظرية محكّمة في علم النفس المعرفي، وعلم نفس العلاقات الأسرية، ونظريات التعلق العاطفي، مع التزام هندسي صارم بمعايير التشفير القياسي وحماية الخصوصية الفردية.'
              : 'Mirror of Hearts (miratalqulub.com) serves as a specialized empirical and research-grounded environment in compatibility psychology and modern psychometrics. Our compatibility engine and testing laboratories are engineered strictly from validated frameworks in cognitive psychology, family dynamics, and adult attachment theory, aligned with cryptographic privacy safeguards.'}
          </p>
        </div>

        {/* AdSense In-Page Banner */}
        <AdSenseBanner slot="6789012345" format="auto" />

        {/* ================= أولاً: المنهجية العلمية والأسس السيكومترية لقياس التوافق ================= */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-sm space-y-4 ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-slate-900/70 border-white/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                isLight
                  ? 'bg-purple-50 border border-purple-200 text-purple-600'
                  : 'bg-purple-500/20 border border-purple-500/30 text-purple-400'
              }`}
            >
              <Layers className="w-5 h-5" />
            </div>
            <h2
              className={`text-lg sm:text-xl font-black font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? 'أولاً: المنهجية العلمية والأسس السيكومترية لقياس التوافق'
                : '1. Scientific Methodology & Psychometric Compatibility Foundations'}
            </h2>
          </div>

          <div
            className={`space-y-4 text-xs sm:text-sm leading-relaxed md:leading-loose ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            <p>
              {isAr
                ? 'تجاوزت الدراسات النفسية المعاصرة النظرة الأحادية السطحية للتوافق الزواجي والعاطفي؛ إذ لم يعد الانسجام بين شريكين يُقاس بمجرد تشابه الهوايات الظاهرية، بل بمدى التكامل والتناغم عبر أربعة محاور بنيوية متداخلة: المحور المعرفي والفكري (Cognitive & Intellectual Synergy)، المحور الوجداني والتنظيمي للعواطف (Emotional Regulation & Empathy)، المحور القيمي والاجتماعي الديموغرافي (Sociocultural & Generational Alignment)، ومحور إدارة الأزمات ونمط الحياة اليومي (Behavioral & Lifestyle Equilibrium).'
                : 'Contemporary relational psychology has moved beyond superficial monocentric views of compatibility. Marital and interpersonal harmony is no longer gauged by surface hobbies, but through multidimensional synergy across four interlocking structural pillars: Cognitive & Intellectual Synergy, Emotional Regulation & Empathy, Sociocultural & Generational Alignment, and Behavioral & Lifestyle Equilibrium.'}
            </p>

            <p>
              {isAr
                ? 'تعتمد خوارزمية القياس في «مرآة القلوب» على نموذج الأوزان النسبية متعددة المتغيرات (Multivariate Weighted Psychometric Scoring)؛ حيث يتم تحليل استجابات المستخدم عبر مصفوفة مواقف حياتية تحاكي التفاعلات اليومية الحقيقية (كإدارة الضغوط المالية، وأساليب الحوار وقت الخلاف، وتوزيع الأدوار الأسرية، ومستويات الاستقلالية مقابل الاندماج). وتُعالج هذه المدخلات رياضياً لإنتاج مؤشرات كمية ونوعية دقيقة تكشف مناطق القوة المشتركة والفجوات المحتملة التي تتطلب وعياً استباقياً.'
                : 'The measurement engine in Mirror of Hearts applies a Multivariate Weighted Psychometric Scoring framework, assessing user responses across real-world scenario matrices (such as financial stress resolution, conflict dialogue styles, domestic role allocation, and autonomy versus fusion). These inputs are mathematically processed to yield granular quantitative and qualitative indices that illuminate mutual strengths and growth areas requiring proactive mindfulness.'}
            </p>
          </div>
        </section>

        {/* ================= ثانياً: النماذج الإكلينيكية التأسيسية المعتمدة (غوتمان، بيك، وبولبي) ================= */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-sm space-y-6 ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-slate-900/70 border-white/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                isLight
                  ? 'bg-rose-50 border border-rose-200 text-rose-600'
                  : 'bg-rose-500/20 border border-rose-500/30 text-rose-400'
              }`}
            >
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h2
                className={`text-lg sm:text-xl font-black font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr
                  ? 'ثانياً: النماذج الإكلينيكية التأسيسية المعتمدة (غوتمان، بيك، وبولبي)'
                  : '2. Foundational Clinical Frameworks: Gottman, Beck & Bowlby'}
              </h2>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {isAr
                  ? 'ترتكز بنية الأسئلة والتحليلات السردية والأكاديمية في المنصة على ثلاث مدارس علمية رائدة:'
                  : 'Our assessment matrices and narrative analytics are anchored in three premier clinical traditions:'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* 1. غوتمان */}
            <div
              className={`p-5 rounded-2xl border space-y-2.5 ${
                isLight
                  ? 'bg-slate-50/80 border-slate-200'
                  : 'bg-white/[0.03] border-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h3
                  className={`font-black text-sm sm:text-base font-['Alexandria'] ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {isAr
                    ? 'نموذج جون غوتمان للبيت العلائقي المتين (Gottman’s Sound Relationship House Theory)'
                    : 'John Gottman’s Sound Relationship House Theory'}
                </h3>
              </div>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {isAr
                  ? 'استناداً إلى الدراسات الطولية التي أجراها البروفيسور جون غوتمان على مدار أربعة عقود في مختبر الحب والأسرة (The Love Lab)، تقيس منصتنا قدرة الشريكين على بناء «خرائط الحب المعرفية» (Love Maps)، والاستجابة الإيجابية لمحاولات التقارب الوجداني (Turning Toward Bids for Connection)، وامتلاك مهارات «الترميم العاطفي» (Repair Attempts) لخفض التوتر أثناء النقاش. كما ترصد المؤشرات الوقائية ضد ما أسماه غوتمان «الفرسان الأربعة المدمرة للعلاقة» (The Four Horsemen): النقد اللاذع (Criticism)، الازدراء والتهكم (Contempt)، الدفاعية المفرطة (Defensiveness)، والانسحاب الصامت أو الجدار الصخري (Stonewalling).'
                  : 'Grounded in Dr. John Gottman’s 40-year longitudinal research in "The Love Lab," our engine quantifies couples’ abilities to construct cognitive Love Maps, turn toward bids for emotional connection, and employ repair attempts during de-escalation, while monitoring early indicators of the "Four Horsemen": Criticism, Contempt, Defensiveness, and Stonewalling.'}
              </p>
            </div>

            {/* 2. آرون بيك */}
            <div
              className={`p-5 rounded-2xl border space-y-2.5 ${
                isLight
                  ? 'bg-slate-50/80 border-slate-200'
                  : 'bg-white/[0.03] border-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h3
                  className={`font-black text-sm sm:text-base font-['Alexandria'] ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {isAr
                    ? 'النموذج المعرفي لآرون بيك (Aaron T. Beck’s Cognitive Therapy & Schema Model)'
                    : 'Aaron T. Beck’s Cognitive Therapy & Schema Model'}
                </h3>
              </div>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {isAr
                  ? 'أثبت رائد العلاج المعرفي آرون بيك في كتابه الشهير (الحب لا يكفي وحدَه - Love Is Never Enough) أن معظم التصدعات الزوجية لا تنشأ من غياب المودة، بل من «التشوهات المعرفية» (Cognitive Distortions) والأفكار التلقائية السلبية التي تشوه تأويل نوايا الشريك. توظف «مرآة القلوب» مبادئ بيك لتحليل كيف يتعامل الفرد مع أخطاء التفكير الشائعة مثل: قراءة الأفكار المسبقة (Mind Reading)، التعميم المفرط (Overgeneralization)، التفكير الكارثي (Catastrophizing)، والتفكير الثنائي الحدي (All-or-Nothing Thinking)، مما يساعد المستخدمين على تبني مرونة معرفية وحوار عقلاني ناضج.'
                  : 'Cognitive therapy pioneer Aaron T. Beck demonstrated in "Love Is Never Enough" that relationship ruptures frequently arise not from a deficiency of affection, but from cognitive distortions and automatic thoughts misattributing partner intent. We evaluate common cognitive errors—including mind reading, overgeneralization, catastrophizing, and polarized thinking—to foster rational resilience and mature dialogue.'}
              </p>
            </div>

            {/* 3. جون بولبي */}
            <div
              className={`p-5 rounded-2xl border space-y-2.5 ${
                isLight
                  ? 'bg-slate-50/80 border-slate-200'
                  : 'bg-white/[0.03] border-white/5'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <h3
                  className={`font-black text-sm sm:text-base font-['Alexandria'] ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {isAr
                    ? 'نظرية التعلق العاطفي لجون بولبي وماري إينسورث (Bowlby & Ainsworth’s Attachment Theory)'
                    : 'John Bowlby & Mary Ainsworth’s Attachment Theory'}
                </h3>
              </div>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {isAr
                  ? 'وفقاً لنظرية التعلق التي أسسها جون بولبي وطورتها ماري إينسورث وامتدت لاحقاً إلى مقاييس التعلق للراشدين (ECR-R)، يشكل كل إنسان «نموذج عمل داخلياً» (Internal Working Model) للأمان العاطفي والاستحقاق الذاتي. تحلل استبيانات المنصة بدقة أبعاد قلق الهجران (Attachment Anxiety) وتجنب الحميمية (Attachment Avoidance) لتحديد نمط التعلق السائد (التعلق الآمن Secure، التعلق القلق-المنشغل Anxious-Preoccupied، التعلق التجنبي-المستخف Dismissive-Avoidant، أو القلق-التجنبي Fearful-Avoidant)، مع دمجها بنموذج العوامل الخمسة الكبرى للشخصية (Big Five / OCEAN) ونظرية الحب الثلاثية لروبرت ستيرنبرغ.'
                  : 'Under Bowlby and Ainsworth’s attachment theory (extended into adult attachment via the ECR-R inventory), every human forms an Internal Working Model of emotional security and worthiness. Our platform assesses attachment anxiety and attachment avoidance to map secure, anxious-preoccupied, dismissive-avoidant, or fearful-avoidant blueprints, synthesized with the Big Five (OCEAN) and Sternberg’s Triangular Theory of Love.'}
              </p>
            </div>
          </div>
        </section>

        {/* ================= ثالثاً: هندسة الخصوصية، مبدأ الحد الأدنى من جمع البيانات، وتشفير TLS 1.3 ================= */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-sm space-y-4 ${
            isLight
              ? 'bg-slate-50/90 border-slate-200'
              : 'bg-white/[0.02] border-white/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                isLight
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-600'
                  : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-400'
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2
              className={`text-lg sm:text-xl font-black font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? 'ثالثاً: هندسة الخصوصية، مبدأ الحد الأدنى من جمع البيانات، وتشفير TLS 1.3'
                : '3. Privacy Engineering, Data Minimization & TLS 1.3 Security'}
            </h2>
          </div>

          <p
            className={`text-xs sm:text-sm leading-relaxed md:leading-loose ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            {isAr
              ? 'تتبنى منصة «مرآة القلوب» فلسفة «الخصوصية بالتصميم» (Privacy by Design) وتطبق بصرامة مبدأ الحد الأدنى من جمع البيانات (Data Minimization Principle) المتوافق مع اللوائح العالمية لحماية البيانات (GDPR / CCPA). لا تطلب المنصة من الزوار أي وثائق رسمية، أو أرقام هواتف شخصية، أو عناوين سكنية، أو رفع صور شخصية لإجراء اختبارات التوافق والمقاييس النفسية؛ بل تكتفي بالمتغيرات الديموغرافية والسيكومترية الضرورية حصراً لتشغيل المعادلات التحليلية.'
              : 'Mirror of Hearts embraces "Privacy by Design" and enforces strict Data Minimization under GDPR/CCPA. We never ask for national IDs, telephone numbers, home addresses, or personal photographs; only minimal psychometric metrics strictly needed for scoring are processed.'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div
              className={`p-4 rounded-2xl border ${
                isLight
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : 'bg-emerald-950/20 border-emerald-500/30'
              }`}
            >
              <strong
                className={`block mb-1 text-xs sm:text-sm font-bold ${
                  isLight ? 'text-emerald-900' : 'text-emerald-300'
                }`}
              >
                {isAr
                  ? 'بروتوكول التشفير القياسي TLS 1.3 و AES-256:'
                  : 'TLS 1.3 & AES-256 Encryption Standard:'}
              </strong>
              <span
                className={`text-xs leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {isAr
                  ? 'تُؤمّن كافة حزم البيانات المتبادلة بين متصفح المستخدم وخوادم السحابة عبر بروتوكول التشفير القياسي الحديث (TLS 1.3 - Transport Layer Security) مع سرية التوجيه التام (Perfect Forward Secrecy)، مما يمنع أي اعتراض أو تنصت سيبراني، بالإضافة إلى إمكانية قفل النتائج محلياً برمز سري خاص (PIN Lock).'
                  : 'All network traffic between browser and cloud endpoints is secured using TLS 1.3 with Perfect Forward Secrecy and AES-256 encryption at rest, preventing any interception or cyber eavesdropping.'}
              </span>
            </div>

            <div
              className={`p-4 rounded-2xl border ${
                isLight
                  ? 'bg-blue-50/70 border-blue-200'
                  : 'bg-blue-950/20 border-blue-500/30'
              }`}
            >
              <strong
                className={`block mb-1 text-xs sm:text-sm font-bold ${
                  isLight ? 'text-blue-900' : 'text-blue-300'
                }`}
              >
                {isAr
                  ? 'مبدأ الحد الأدنى من البيانات وعدم المشاركة التجارية:'
                  : 'Data Minimization & Zero Commercial Sharing:'}
              </strong>
              <span
                className={`text-xs leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {isAr
                  ? 'تُعالج إجابات الاستبيانات لحظياً لتوليد التقرير التوافقي، ولا تقوم المنصة ببيع أو تأجير أو المتاجرة بأي بيانات سيكومترية أو شخصية مع سماسرة البيانات أو شركات الإعلانات الموجهة، مع منح المستخدم حق الحذف الفوري الكامل لسجله في أي وقت.'
                  : 'Questionnaire responses are computed in real time to generate reports; we never sell, lease, or monetize personal data with data brokers or targeted advertising firms, with instant permanent erasure rights guaranteed.'}
              </span>
            </div>
          </div>
        </section>

        {/* ================= رابعاً: إخلاء المسؤولية العلمي والعيادي والقانوني ================= */}
        <section
          className={`p-6 sm:p-8 rounded-3xl border space-y-3 ${
            isLight
              ? 'bg-amber-50/80 border-amber-300 text-slate-800'
              : 'bg-amber-950/20 border-amber-500/35 text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Scale className="w-6 h-6 text-amber-500 shrink-0" />
            <h2
              className={`text-lg sm:text-xl font-black font-['Alexandria'] ${
                isLight ? 'text-amber-950' : 'text-amber-300'
              }`}
            >
              {isAr
                ? 'رابعاً: إخلاء المسؤولية العلمي والعيادي والقانوني (Scientific & Clinical Disclaimer)'
                : '4. Scientific, Clinical & Legal Disclaimer'}
            </h2>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed">
            {isAr
              ? 'إن جميع المقاييس السيكومترية، وحاسبات التوافق الفكري والعاطفي، والدراسات البحثية، والمقالات العيادية القصصية المنشورة عبر منصة «مرآة القلوب» قُدّمت لأغراض التثقيف العلمي، وتعزيز الوعي الذاتي، وإثراء الحوار البناء بين الشركاء والمقبلين على الزواج. لا تُعد هذه الأدوات أو النتائج المستخلصة منها بأي حال من الأحوال بديلاً عن التشخيص الطبي النفسي أو التقييم الإكلينيكي المباشر وفق الدليل التشخيصي والإحصائي للاضطرابات النفسية (DSM-5-TR) أو التصنيف الدولي للأمراض (ICD-11).'
              : 'All psychometric tools, compatibility assessments, and clinical narrative essays on Mirror of Hearts are presented strictly for psychoeducational awareness, self-discovery, and constructive dialogue. They never substitute for clinical psychiatric evaluation or medical diagnosis under DSM-5-TR or ICD-11.'}
          </p>

          <p
            className={`text-xs sm:text-sm font-semibold leading-relaxed pt-1 ${
              isLight ? 'text-amber-900' : 'text-amber-200/90'
            }`}
          >
            {isAr
              ? 'تؤكد إدارة المنصة أن التوافق الإنساني عملية ديناميكية حية تقوم على المسؤولية الأخلاقية، والمروءة، والاحترام المتبادل، والجهد الواعي المستمر من كلا الطرفين، وفي حالات الاضطرابات النفسية الحادة أو النزاعات الأسرية العميقة يُوصى دائماً بمراجعة الأخصائيين النفسيين والاستشاريين الأسريين المرخصين.'
              : 'Human compatibility is an evolving dynamic grounded in mutual chivalry, moral integrity, and shared conscious effort. In cases of acute psychological distress or deep marital conflict, consulting certified and licensed mental health clinicians is unconditionally advised.'}
          </p>
        </section>

        {/* ================= المرجعيات الأكاديمية والمقاييس المعتمدة ================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-indigo-500" />
            <h2
              className={`text-lg font-bold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr ? 'المرجعيات الأكاديمية والمقاييس المعتمدة' : 'Academic Frameworks & Published References'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {academicReferences.map((ref, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all duration-200 space-y-2.5 ${
                  isLight
                    ? 'bg-white border-slate-200 shadow-sm hover:border-indigo-300'
                    : 'bg-slate-900/60 border-slate-800 hover:border-indigo-500/30'
                }`}
              >
                <div className="space-y-1">
                  <h3
                    className={`font-bold text-sm font-['Alexandria'] leading-snug ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {ref.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-indigo-500">{ref.author}</div>
                  <div className="text-[10px] text-slate-400 font-mono italic">{ref.journal}</div>
                </div>
                <p
                  className={`text-xs leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}
                >
                  {ref.details}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Navigation Back Links */}
        <div
          className={`flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl border ${
            isLight
              ? 'bg-white border-slate-200 shadow-sm'
              : 'bg-slate-900/50 border-white/5'
          }`}
        >
          <button
            onClick={onBackToHome}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <span>{isAr ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}</span>
          </button>
          <button
            onClick={() => onNavigatePage('privacy')}
            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <span>{isAr ? 'سياسة الخصوصية وتشفير TLS 1.3' : 'Privacy Policy & TLS 1.3'}</span>
          </button>
          <button
            onClick={() => onNavigatePage('disclaimer')}
            className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <span>{isAr ? 'إخلاء المسؤولية القانوني والعيادي' : 'Clinical & Legal Disclaimer'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SourcesMethodologyPage;
