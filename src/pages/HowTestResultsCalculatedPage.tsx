import React, { useState } from 'react';
import {
  Calculator,
  Brain,
  ShieldCheck,
  Heart,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sliders,
  Compass,
  Scale,
  Lock,
  Layers,
  HelpCircle,
  X,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';
import { PageSEO } from '../components/PageSEO';

export interface HowTestResultsCalculatedPageProps {
  onBackToHome?: () => void;
  onNavigatePage?: (page: string) => void;
  onStartPersonalityTests?: () => void;
  onStartCompatibilityTest?: () => void;
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const HowTestResultsCalculatedPage: React.FC<HowTestResultsCalculatedPageProps> = ({
  onBackToHome,
  onNavigatePage,
  onStartPersonalityTests,
  onStartCompatibilityTest,
  isModal = false,
  onCloseModal,
}) => {
  const { language, isRTL } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';

  // Interactive Live Scoring Mini-Simulator state for visitor trust
  const [simQ1, setSimQ1] = useState<number>(4); // Direct item (1..5)
  const [simQ2, setSimQ2] = useState<number>(2); // Reverse item (1..5 -> 6 - val = 4)
  const [simQ3, setSimQ3] = useState<number>(5); // Direct item (1..5)

  const simQ2Adjusted = 6 - simQ2;
  const rawTotal = simQ1 + simQ2Adjusted + simQ3; // Range: 3 to 15
  const minPossible = 3;
  const maxPossible = 15;
  const finalPercentage = Math.round(((rawTotal - minPossible) / (maxPossible - minPossible)) * 100);

  const [activeModelTab, setActiveModelTab] = useState<
    'all' | 'bigfive' | 'hexaco' | 'attachment' | 'eq'
  >('all');

  const likertLabels = isAr
    ? [
        { val: 1, text: '١ - أعارض بشدة' },
        { val: 2, text: '٢ - أعارض' },
        { val: 3, text: '٣ - محايد' },
        { val: 4, text: '٤ - أوافق' },
        { val: 5, text: '٥ - أوافق بشدة' },
      ]
    : [
        { val: 1, text: '1 - Strongly Disagree' },
        { val: 2, text: '2 - Disagree' },
        { val: 3, text: '3 - Neutral' },
        { val: 4, text: '4 - Agree' },
        { val: 5, text: '5 - Strongly Agree' },
      ];

  const contentBody = (
    <div className="space-y-8">
      {/* Header Banner */}
      <header
        className={`relative overflow-hidden rounded-3xl border p-6 sm:p-10 shadow-xl ${
          isLight
            ? 'bg-gradient-to-br from-indigo-50 via-white to-emerald-50 border-indigo-200'
            : 'bg-gradient-to-br from-indigo-950/50 via-slate-900/95 to-emerald-950/40 border-indigo-500/30'
        }`}
      >
        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold border ${
                isLight
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {isAr
                  ? 'ميثاق الشفافية العلمية وبناء الثقة مع الزوار'
                  : 'Scientific Transparency & Visitor Trust Charter'}
              </span>
            </div>

            {isModal && onCloseModal && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onCloseModal();
                }}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                    : 'bg-slate-800 hover:bg-slate-700 border-white/15 text-slate-200'
                }`}
              >
                <X className="w-4 h-4" />
                <span>{isAr ? 'إغلاق والعودة للاختبار' : 'Close & Return to Test'}</span>
              </button>
            )}
          </div>

          <h1
            className={`text-2xl sm:text-4xl font-black tracking-tight font-['Alexandria'] ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {isAr ? 'كيف يتم حساب نتائج الاختبارات؟' : 'How Are Test Results Calculated?'}
          </h1>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isLight ? 'text-slate-700' : 'text-slate-200'
            }`}
          >
            {isAr
              ? 'في «مِـرآة القـلوب»، نؤمن بأن ثقتك تبدأ من معرفتك الدقيقة بكيفية عمل اختباراتنا. نحن لا نستخدم أي أرقام عشوائية أو تخمينات؛ بل نعتمد على معادلات قياس نفسي (Psychometric Scoring) واضحة تحول إجاباتك مباشرة إلى نسب مئوية دقيقة عبر أربعة نماذج علمية عالمية: العوامل الخمسة الكبرى (Big Five)، نموذج هيكساكو (HEXACO)، أنماط التعلق (Attachment)، والذكاء العاطفي (Emotional Intelligence).'
              : 'At Mirror of Hearts, we believe your trust begins with full transparency on how our assessments work. We never use random numbers or guesswork; every answer is processed through deterministic psychometric scoring equations across four global models: Big Five, HEXACO, Attachment Styles, and Emotional Intelligence.'}
          </p>

          {/* Trust Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div
              className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                isLight
                  ? 'bg-white/90 border-slate-200 text-slate-800'
                  : 'bg-slate-900/70 border-white/10 text-slate-200'
              }`}
            >
              <Calculator className="w-5 h-5 text-indigo-500 shrink-0" />
              <div className="text-xs">
                <div className="font-extrabold">
                  {isAr ? 'حساب رياضي حتمي 100%' : '100% Deterministic Math'}
                </div>
                <div className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                  {isAr ? 'نفس الإجابات تعطي نفس النتيجة دائماً' : 'Identical answers always yield identical scores'}
                </div>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                isLight
                  ? 'bg-white/90 border-slate-200 text-slate-800'
                  : 'bg-slate-900/70 border-white/10 text-slate-200'
              }`}
            >
              <Scale className="w-5 h-5 text-emerald-500 shrink-0" />
              <div className="text-xs">
                <div className="font-extrabold">
                  {isAr ? 'أسئلة طردية وعكسية متوازنة' : 'Balanced Reverse-Scored Items'}
                </div>
                <div className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                  {isAr ? 'لمنع التسرع أو الانحياز التلقائي' : 'Prevents automatic response bias'}
                </div>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                isLight
                  ? 'bg-white/90 border-slate-200 text-slate-800'
                  : 'bg-slate-900/70 border-white/10 text-slate-200'
              }`}
            >
              <Lock className="w-5 h-5 text-rose-500 shrink-0" />
              <div className="text-xs">
                <div className="font-extrabold">
                  {isAr ? 'خصوصية وأمان تام' : 'Complete Data Privacy'}
                </div>
                <div className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                  {isAr ? 'تحليل فوري دون بيع أو مشاركة بياناتك' : 'Instant calculation with zero data sharing'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Step-by-Step General Scoring Explanation (الخطوات الـ 3 لتحويل إجابتك إلى نتيجة) */}
      <section
        className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-slate-900/75 border-white/10 shadow-lg'
        }`}
      >
        <div className="space-y-2">
          <h2
            className={`text-lg sm:text-2xl font-black font-['Alexandria'] flex items-center gap-2.5 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            <Calculator className="w-6 h-6 text-indigo-500 shrink-0" />
            <span>
              {isAr
                ? 'أولاً: كيف تتحول إجاباتك إلى نسبة مئوية في ٣ خطوات بسيطة؟'
                : 'First: How Your Answers Become a Percentage in 3 Simple Steps'}
            </span>
          </h2>
          <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {isAr
              ? 'قبل أن نستعرض المقاييس الأربعة، إليك القاعدة الرياضية الموحدة التي يطبقها محرك الموقع على كل سؤال تجيب عليه:'
              : 'Before exploring the four models, here is the unified mathematical rule applied to every item you answer:'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div
            className={`p-5 rounded-2xl border space-y-2.5 ${
              isLight
                ? 'bg-indigo-50/60 border-indigo-200'
                : 'bg-indigo-950/25 border-indigo-500/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-black ${
                  isLight ? 'bg-indigo-700 text-white' : 'bg-indigo-500 text-slate-950'
                }`}
              >
                {isAr ? 'الخطوة ١' : 'Step 1'}
              </span>
              <span className="text-xs font-bold text-indigo-500">1 → 5</span>
            </div>
            <h3 className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isAr ? 'تحويل الإجابة إلى نقاط (مقياس ليكرت)' : 'Convert Answer to Points (Likert Scale)'}
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              {isAr
                ? 'كل خيار له قيمة رقمية ثابتة من ١ إلى ٥: (أعارض بشدة = ١، أعارض = ٢، محايد = ٣، أوافق = ٤، أوافق بشدة = ٥).'
                : 'Each choice maps to a fixed value from 1 to 5: (Strongly Disagree = 1, Disagree = 2, Neutral = 3, Agree = 4, Strongly Agree = 5).'}
            </p>
          </div>

          {/* Step 2 */}
          <div
            className={`p-5 rounded-2xl border space-y-2.5 ${
              isLight
                ? 'bg-amber-50/70 border-amber-200'
                : 'bg-amber-950/25 border-amber-500/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-black ${
                  isLight ? 'bg-amber-800 text-white' : 'bg-amber-400 text-slate-950'
                }`}
              >
                {isAr ? 'الخطوة ٢' : 'Step 2'}
              </span>
              <span className="text-xs font-bold text-amber-500">6 - X</span>
            </div>
            <h3 className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isAr ? 'تصحيح الأسئلة العكسية (Reverse Scoring)' : 'Adjust Reverse-Keyed Questions'}
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              {isAr
                ? 'لضمان دقة الاختبار، بعض الأسئلة مكتوبة بصيغة عكسية (مثل: «أفضل العزلة دائماً» في مقياس الانبساط). هنا يقوم النظام بعكس الدرجة تلقائياً بالمعادلة (٦ ناقص إجابتك).'
                : 'To ensure accuracy, some items are reverse-worded. The engine automatically flips the score using the formula (6 minus your answer).'}
            </p>
          </div>

          {/* Step 3 */}
          <div
            className={`p-5 rounded-2xl border space-y-2.5 ${
              isLight
                ? 'bg-emerald-50/70 border-emerald-200'
                : 'bg-emerald-950/25 border-emerald-500/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-black ${
                  isLight ? 'bg-emerald-800 text-white' : 'bg-emerald-400 text-slate-950'
                }`}
              >
                {isAr ? 'الخطوة ٣' : 'Step 3'}
              </span>
              <span className="text-xs font-bold text-emerald-500">0% → 100%</span>
            </div>
            <h3 className={`text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isAr ? 'حساب النسبة المئوية الصافية' : 'Calculate Normalized Percentage'}
            </h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              {isAr
                ? 'نجمع نقاطك في كل سمة، ثم نحولها إلى نسبة مئوية مفهومة من ٠٪ إلى ١٠٠٪ عبر قسمة نقاطك الفعلية على أعلى مجموع ممكن للسمة.'
                : 'We sum your adjusted points for each trait and normalize them onto a clear 0% to 100% scale.'}
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs for the 4 Core Models */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', labelAr: 'جميع المقاييس الأربعة (نظرة كاملة)', labelEn: 'All 4 Models (Full Guide)' },
          { id: 'bigfive', labelAr: '١. العوامل الخمسة (Big Five)', labelEn: '1. Big Five (OCEAN)' },
          { id: 'hexaco', labelAr: '٢. نموذج هيكساكو (HEXACO)', labelEn: '2. HEXACO Model' },
          { id: 'attachment', labelAr: '٣. أنماط التعلق (Attachment)', labelEn: '3. Attachment Styles' },
          { id: 'eq', labelAr: '٤. الذكاء العاطفي (Emotional Intelligence)', labelEn: '4. Emotional Intelligence (EQ)' },
        ].map((tab) => {
          const active = activeModelTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                soundManager.playTap();
                setActiveModelTab(tab.id as any);
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold border transition cursor-pointer ${
                active
                  ? 'bg-indigo-700 text-white border-indigo-600 shadow-md'
                  : isLight
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-200 border-white/10'
              }`}
            >
              {isAr ? tab.labelAr : tab.labelEn}
            </button>
          );
        })}
      </div>

      {/* =====================================================================
          MODEL 1: BIG FIVE (OCEAN)
      ===================================================================== */}
      {(activeModelTab === 'all' || activeModelTab === 'bigfive') && (
        <section
          className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
            isLight
              ? 'bg-white border-purple-200 shadow-sm'
              : 'bg-slate-900/80 border-purple-500/30 shadow-lg'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-purple-500/20">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-purple-600 dark:text-purple-300">
                <Brain className="w-4 h-4" />
                <span>
                  {isAr
                    ? 'النموذج الأول • Costa & McCrae / Goldberg (IPIP)'
                    : 'Model 1 • Costa & McCrae / Goldberg (IPIP)'}
                </span>
              </div>
              <h2
                className={`text-xl sm:text-2xl font-black font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr
                  ? '١. مقياس العوامل الخمسة الكبرى للشخصية (Big Five / OCEAN)'
                  : '1. The Big Five Personality Traits (OCEAN)'}
              </h2>
            </div>
            <span
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black border self-start ${
                isLight
                  ? 'bg-purple-50 text-purple-900 border-purple-200'
                  : 'bg-purple-500/15 text-purple-200 border-purple-500/30'
              }`}
            >
              {isAr ? '٥ أبعاد مستقلة (٠٪ - ١٠٠٪)' : '5 Independent Traits (0% - 100%)'}
            </span>
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
            {isAr
              ? 'بدلاً من وضع البشر في «قوالب جامدة»، يقيس نموذج العوامل الخمسة الكبرى (Big Five) شخصيتك عبر ٥ أبعاد مستقلة تماماً، وتسمى اختصاراً (OCEAN). لا توجد هنا درجة «جيدة» أو «سيئة»، بل كل درجة توضح أسلوبك الفطري في التفكير والعمل والتفاعل:'
              : 'Instead of placing people into rigid boxes, the Big Five (OCEAN) measures your personality across 5 continuous dimensions. There are no "good" or "bad" scores—each percentage reflects your natural style:'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                code: 'O',
                titleAr: 'الانفتاح على الخبرة (Openness)',
                titleEn: 'Openness to Experience (O)',
                simpleAr:
                  'يقيس حب الاستطلاع، الخيال، الشغف بالأفكار الجديدة والفنون مقابل تفضيل الطرق العملية المجربة والروتين الواضح.',
                simpleEn:
                  'Measures curiosity, imagination, and appreciation for new ideas versus practical, familiar routines.',
                scoreHowAr: 'الدرجة المرتفعة = مجدد ومبتكر | الدرجة المعتدلة/المنخفضة = واقعي وعملي.',
                scoreHowEn: 'High = imaginative & curious | Lower = pragmatic & traditional.',
              },
              {
                code: 'C',
                titleAr: 'يقظة الضمير والانضباط (Conscientiousness)',
                titleEn: 'Conscientiousness (C)',
                simpleAr:
                  'يقيس التنظيم، التخطيط المسبق، الدقة في المواعيد، وتحمل المسؤولية مقابل العفوية والمرونة اللحظية.',
                simpleEn:
                  'Measures organization, dependability, self-discipline, and goal-oriented planning versus spontaneity.',
                scoreHowAr: 'الدرجة المرتفعة = منظم ومنضبط | الدرجة المنخفضة = عفوي ومرن.',
                scoreHowEn: 'High = organized & disciplined | Lower = spontaneous & flexible.',
              },
              {
                code: 'E',
                titleAr: 'الانبساطية والطاقة الاجتماعية (Extraversion)',
                titleEn: 'Extraversion (E)',
                simpleAr:
                  'يقيس من أين تستمد طاقتك: من التفاعل مع الناس والمبادرة والحيوية، أم من الهدوء والتركيز العميق في مساحتك الخاصة.',
                simpleEn:
                  'Measures whether you recharge through social interaction and excitement or quiet solitude.',
                scoreHowAr: 'الدرجة المرتفعة = اجتماعي ومبادر | الدرجة المنخفضة = هادئ ومتأمل.',
                scoreHowEn: 'High = outgoing & energetic | Lower = reserved & reflective.',
              },
              {
                code: 'A',
                titleAr: 'الوفاق والطيبة والتعاون (Agreeableness)',
                titleEn: 'Agreeableness (A)',
                simpleAr:
                  'يقيس مدى اللطف، التعاطف، التعاون، وحرصك على الانسجام مع الآخرين مقابل الحزم المباشر والتنافسية.',
                simpleEn:
                  'Measures empathy, kindness, trust, and cooperative harmony versus directness and competitiveness.',
                scoreHowAr: 'الدرجة المرتفعة = متعاطف ومتعاون | الدرجة المنخفضة = حازم ومستقل الرأي.',
                scoreHowEn: 'High = compassionate & cooperative | Lower = analytical & direct.',
              },
              {
                code: 'ES',
                titleAr: 'الاتزان الانفعالي (Emotional Stability)',
                titleEn: 'Emotional Stability (ES / Neuroticism)',
                simpleAr:
                  'يقيس قدرتك على البقاء هادئاً ومتماسكاً تحت الضغوط والتقلبات اليومية مقابل سرعة القلق والتأثر العاطفي.',
                simpleEn:
                  'Measures calmness and resilience under stress versus emotional sensitivity and worry.',
                scoreHowAr: 'الدرجة المرتفعة = هادئ ومتزن انفعالياً | الدرجة المنخفضة = حساس وسريع التأثر.',
                scoreHowEn: 'High = calm & resilient | Lower = emotionally reactive & sensitive.',
              },
            ].map((trait) => (
              <div
                key={trait.code}
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                  isLight
                    ? 'bg-slate-50/90 border-slate-200'
                    : 'bg-white/[0.03] border-white/10'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-purple-700 text-white font-black text-xs flex items-center justify-center shrink-0">
                      {trait.code}
                    </span>
                    <h3 className={`text-xs sm:text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {isAr ? trait.titleAr : trait.titleEn}
                    </h3>
                  </div>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {isAr ? trait.simpleAr : trait.simpleEn}
                  </p>
                </div>
                <div
                  className={`p-2.5 rounded-xl text-[11px] font-bold border ${
                    isLight
                      ? 'bg-purple-50 text-purple-900 border-purple-200'
                      : 'bg-purple-950/30 text-purple-200 border-purple-500/25'
                  }`}
                >
                  {isAr ? trait.scoreHowAr : trait.scoreHowEn}
                </div>
              </div>
            ))}
          </div>

          <div
            className={`p-4 rounded-2xl border text-xs leading-relaxed ${
              isLight
                ? 'bg-purple-50/70 border-purple-200 text-purple-950'
                : 'bg-purple-950/20 border-purple-500/30 text-purple-100'
            }`}
          >
            <span className="font-black">
              {isAr ? '💡 كيف نحسب Big Five في الموقع؟ ' : '💡 How we calculate Big Five: '}
            </span>
            {isAr
              ? 'يتم تجميع نقاط الأسئلة المخصصة لكل عامل من العوامل الخمسة على حدة (بعد قلب درجات الأسئلة العكسية)، ثم تُقسم على الدرجة القصوى لذلك العامل لتظهر لك نسبتك المئوية الدقيقة في كل سمة بشكل مستقل.'
              : 'Questions for each of the 5 traits are summed independently (after reversing negative items) and divided by the maximum possible points for that specific trait.'}
          </div>
        </section>
      )}

      {/* =====================================================================
          MODEL 2: HEXACO
      ===================================================================== */}
      {(activeModelTab === 'all' || activeModelTab === 'hexaco') && (
        <section
          className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
            isLight
              ? 'bg-white border-emerald-200 shadow-sm'
              : 'bg-slate-900/80 border-emerald-500/30 shadow-lg'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-emerald-500/20">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
                <Layers className="w-4 h-4" />
                <span>
                  {isAr
                    ? 'النموذج الثاني • Ashton & Lee (HEXACO-PI-R)'
                    : 'Model 2 • Ashton & Lee (HEXACO-PI-R)'}
                </span>
              </div>
              <h2
                className={`text-xl sm:text-2xl font-black font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr
                  ? '٢. نموذج هيكساكو السداسي للشخصية (HEXACO)'
                  : '2. The HEXACO Six-Factor Personality Model'}
              </h2>
            </div>
            <span
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black border self-start ${
                isLight
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30'
              }`}
            >
              {isAr ? '٦ أبعاد (يضيف بُعد الصدق والتواضع H)' : '6 Factors (Adds Honesty-Humility H)'}
            </span>
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
            {isAr
              ? 'طوّر العلماء نموذج (HEXACO) بعد اكتشافهم أن العوامل الخمسة الكبرى ينقصها بُعد سادس بالغ الأهمية في العلاقات الزوجية والإنسانية، وهو بُعد «الصدق والتواضع» (Honesty-Humility). يتكون الاسم من أوائل حروف أبعاده الستة:'
              : 'Researchers developed HEXACO after discovering a crucial 6th dimension essential for relationship trust and ethics: Honesty-Humility (H). Its 6 factors are:'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Highlighted H Factor */}
            <div
              className={`md:col-span-2 p-5 rounded-2xl border-2 space-y-2 ${
                isLight
                  ? 'bg-emerald-50/90 border-emerald-400 text-emerald-950'
                  : 'bg-emerald-950/35 border-emerald-500/50 text-emerald-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-700 text-white font-black text-xs">
                  H • البُعد السادس المميز
                </span>
                <h3 className="text-sm sm:text-base font-black">
                  {isAr
                    ? 'الصدق والتواضع والنزاهة (Honesty-Humility)'
                    : 'Honesty-Humility (H) — The Core Trust Factor'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">
                {isAr
                  ? 'يقيس مدى الإخلاص الفطري، العدالة، القناعة، والابتعاد عن الخداع أو استغلال الطرف الآخر لمصالح شخصية. في اختبارات التوافق لدينا، يُعد ارتفاع هذا المؤشر لدى الطرفين من أقوى علامات الأمان الأخلاقي واستقرار العلاقة على المدى الطويل.'
                  : 'Measures sincerity, fairness, modesty, and avoidance of manipulation or entitlement. In our compatibility engine, high Honesty-Humility is a primary predictor of relational loyalty and ethical safety.'}
              </p>
            </div>

            {[
              {
                letter: 'E',
                nameAr: 'الانفعالية والارتباط العاطفي (Emotionality)',
                descAr: 'يقيس العمق الوجداني، التعاطف العاطفي، والحاجة إلى مشاركة المشاعر والدعم المعنوي مع المقربين.',
                nameEn: 'Emotionality (E)',
                descEn: 'Measures sentimental attachment, empathy, and need for emotional sharing.',
              },
              {
                letter: 'X',
                nameAr: 'الانبساط الاجتماعي (eXtraversion)',
                descAr: 'يقيس الثقة الاجتماعية، الحيوية، والقدرة على بث الحماس والبهجة في اللقاءات والحوارات.',
                nameEn: 'eXtraversion (X)',
                descEn: 'Measures social self-esteem, liveliness, and interpersonal enthusiasm.',
              },
              {
                letter: 'A',
                nameAr: 'الوفاق والتسامح (Agreeableness)',
                descAr: 'في HEXACO يركز هذا البُعد تحديداً على الحِلم، الصبر، المسامحة، وعدم حمل الضغينة عند الخلاف.',
                nameEn: 'Agreeableness vs. Anger (A)',
                descEn: 'Specifically measures forgiveness, gentleness, patience, and flexibility during conflict.',
              },
              {
                letter: 'C',
                nameAr: 'يقظة الضمير والإتقان (Conscientiousness)',
                descAr: 'يقيس التنظيم، التروّي قبل اتخاذ القرارات، والالتزام بالوعود والمسؤوليات.',
                nameEn: 'Conscientiousness (C)',
                descEn: 'Measures diligence, prudence, organization, and reliability.',
              },
              {
                letter: 'O',
                nameAr: 'الانفتاح الفكري والجمالي (Openness)',
                descAr: 'يقيس تذوق الجمال، حب المعرفة، والقدرة على التفكير الإبداعي غير التقليدي.',
                nameEn: 'Openness to Experience (O)',
                descEn: 'Measures aesthetic appreciation, inquisitiveness, and creativity.',
              },
            ].map((item) => (
              <div
                key={item.letter}
                className={`p-4 rounded-2xl border space-y-1.5 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-emerald-700 text-white font-black text-xs flex items-center justify-center">
                    {item.letter}
                  </span>
                  <h4 className={`text-xs sm:text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {isAr ? item.nameAr : item.nameEn}
                  </h4>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================================
          MODEL 3: ATTACHMENT STYLES
      ===================================================================== */}
      {(activeModelTab === 'all' || activeModelTab === 'attachment') && (
        <section
          className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
            isLight
              ? 'bg-white border-rose-200 shadow-sm'
              : 'bg-slate-900/80 border-rose-500/30 shadow-lg'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-rose-500/20">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-rose-700 dark:text-rose-300">
                <Heart className="w-4 h-4" />
                <span>
                  {isAr
                    ? 'النموذج الثالث • Bowlby & Brennan (ECR-R)'
                    : 'Model 3 • Bowlby & Brennan (ECR-R)'}
                </span>
              </div>
              <h2
                className={`text-xl sm:text-2xl font-black font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr
                  ? '٣. مقياس أنماط التعلق العاطفي (Attachment Styles)'
                  : '3. Adult Attachment Styles Assessment'}
              </h2>
            </div>
            <span
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black border self-start ${
                isLight
                  ? 'bg-rose-50 text-rose-900 border-rose-200'
                  : 'bg-rose-500/15 text-rose-200 border-rose-500/30'
              }`}
            >
              {isAr ? 'محوران يحسمان ٤ أنماط تعلق' : '2 Axes Determine 4 Attachment Styles'}
            </span>
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
            {isAr
              ? 'يفسر مقياس التعلق العاطفي كيف نشعر بالأمان أو القلق عندما نقترب عاطفياً من شريك الحياة. يتم حساب نمط التعلق بطريقة علمية واضحة جداً عبر قياس درجتك على محورين فقط:'
              : 'Attachment theory explains how we experience closeness and security in relationships. Your style is calculated by measuring your score across two fundamental axes:'}
          </p>

          {/* The 2 Axes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-2xl border space-y-1.5 ${
                isLight ? 'bg-rose-50/70 border-rose-200' : 'bg-rose-950/25 border-rose-500/30'
              }`}
            >
              <h3 className={`text-sm font-black ${isLight ? 'text-rose-950' : 'text-rose-200'}`}>
                {isAr ? 'المحور الأول: قلق التعلق (Attachment Anxiety)' : 'Axis 1: Attachment Anxiety'}
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {isAr
                  ? 'يقيس مدى انشغال البال، الخوف من الهجر أو البرود العاطفي، والحاجة المستمرة إلى الطمأنة وتأكيد المحبة.'
                  : 'Measures sensitivity to rejection, fear of abandonment, and need for frequent reassurance.'}
              </p>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-1.5 ${
                isLight ? 'bg-indigo-50/70 border-indigo-200' : 'bg-indigo-950/25 border-indigo-500/30'
              }`}
            >
              <h3 className={`text-sm font-black ${isLight ? 'text-indigo-950' : 'text-indigo-200'}`}>
                {isAr ? 'المحور الثاني: تجنب التعلق (Attachment Avoidance)' : 'Axis 2: Attachment Avoidance'}
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {isAr
                  ? 'يقيس مدى التحفظ من الاقتراب العاطفي العميق، وتفضيل الاعتماد على النفس وإخفاء المشاعر بدلاً من البوح بها.'
                  : 'Measures discomfort with deep emotional closeness and preference for extreme self-reliance.'}
              </p>
            </div>
          </div>

          {/* 4 Quadrants Explanation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                badgeAr: 'قلق منخفض + تجنب منخفض',
                badgeEn: 'Low Anxiety + Low Avoidance',
                titleAr: '١. التعلق الآمن (Secure)',
                titleEn: '1. Secure Attachment',
                descAr:
                  'يرتاح للقرب العاطفي ويثق بالشريك دون خوف مفرط من الهجر، ويعبر عن احتياجاته ومشاعره بهدوء ووضوح.',
                descEn:
                  'Comfortable with intimacy and autonomy; communicates needs openly and trusts the partner.',
                color: isLight
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-emerald-950/30 border-emerald-500/40 text-emerald-100',
              },
              {
                badgeAr: 'قلق مرتفع + تجنب منخفض',
                badgeEn: 'High Anxiety + Low Avoidance',
                titleAr: '٢. التعلق القلِق / المشغول (Anxious)',
                titleEn: '2. Anxious-Preoccupied Attachment',
                descAr:
                  'يحب القرب العاطفي بشدة ويهتم بالتفاصيل، لكنه يتأثر سريعاً بأي تأخر أو تغير في نبرة الشريك ويحتاج للطمأنة.',
                descEn:
                  'Desires deep closeness but worries about partner availability and seeks frequent reassurance.',
                color: isLight
                  ? 'bg-amber-50 border-amber-300 text-amber-950'
                  : 'bg-amber-950/30 border-amber-500/40 text-amber-100',
              },
              {
                badgeAr: 'قلق منخفض + تجنب مرتفع',
                badgeEn: 'Low Anxiety + High Avoidance',
                titleAr: '٣. التعلق التجنبي المستقل (Dismissive-Avoidant)',
                titleEn: '3. Dismissive-Avoidant Attachment',
                descAr:
                  'يقدّر مساحته الخاصة واستقلاليته بدرجة عالية، ويميل إلى الانسحاب الهادئ أو كتم المشاعر عند حدوث ضغط عاطفي.',
                descEn:
                  'Highly values independence and personal space; tends to suppress emotions under relational stress.',
                color: isLight
                  ? 'bg-sky-50 border-sky-300 text-sky-950'
                  : 'bg-sky-950/30 border-sky-500/40 text-sky-100',
              },
              {
                badgeAr: 'قلق مرتفع + تجنب مرتفع',
                badgeEn: 'High Anxiety + High Avoidance',
                titleAr: '٤. التعلق التجنبي الخائف (Fearful-Avoidant)',
                titleEn: '4. Fearful-Avoidant Attachment',
                descAr:
                  'يرغب داخلياً في القرب والحب، لكنه يخشى التعرض للخذلان أو الجرح، فيتأرجح بين الاقتراب والابتعاد.',
                descEn:
                  'Craves closeness yet fears vulnerability and hurt, leading to push-pull emotional dynamics.',
                color: isLight
                  ? 'bg-rose-50 border-rose-300 text-rose-950'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-100',
              },
            ].map((quad, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border space-y-2 ${quad.color}`}>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-black">
                    {isAr ? quad.titleAr : quad.titleEn}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-black/10 dark:bg-white/10">
                    {isAr ? quad.badgeAr : quad.badgeEn}
                  </span>
                </div>
                <p className="text-xs leading-relaxed opacity-90">
                  {isAr ? quad.descAr : quad.descEn}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================================
          MODEL 4: EMOTIONAL INTELLIGENCE (EQ)
      ===================================================================== */}
      {(activeModelTab === 'all' || activeModelTab === 'eq') && (
        <section
          className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
            isLight
              ? 'bg-white border-amber-200 shadow-sm'
              : 'bg-slate-900/80 border-amber-500/30 shadow-lg'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-amber-500/20">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-amber-800 dark:text-amber-300">
                <Sparkles className="w-4 h-4" />
                <span>
                  {isAr
                    ? 'النموذج الرابع • Salovey & Mayer / Goleman / Bar-On'
                    : 'Model 4 • Salovey & Mayer / Goleman / Bar-On'}
                </span>
              </div>
              <h2
                className={`text-xl sm:text-2xl font-black font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr
                  ? '٤. مقياس الذكاء العاطفي والاجتماعي (Emotional Intelligence - EQ)'
                  : '4. Emotional & Social Intelligence (EQ)'}
              </h2>
            </div>
            <span
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black border self-start ${
                isLight
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-amber-500/15 text-amber-200 border-amber-500/30'
              }`}
            >
              {isAr ? '٤ مهارات عاطفية واجتماعية (٢٥٪ لكل ركن)' : '4 Core Pillars (25% Weight Each)'}
            </span>
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
            {isAr
              ? 'الذكاء العاطفي (EQ) ليس موهبة غامضة، بل هو مجموعة مهارات عملية قابلة للقياس والتطوير تحدد كيف تدير مشاعرك وكيف تبني علاقات ناجحة. نحسب درجتك الكلية في الذكاء العاطفي من متوسط أربعة أركان متساوية الوزن:'
              : 'Emotional Intelligence (EQ) is a practical, measurable set of skills governing how you understand feelings and navigate relationships. We compute your overall EQ score across four equally weighted pillars:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                num: '١',
                weight: '25%',
                titleAr: 'الوعي الذاتي بالمشاعر (Self-Awareness)',
                titleEn: '1. Self-Awareness',
                descAr:
                  'قدرتك على ملاحظة مشاعرك لحظة حدوثها وفهم السبب الحقيقي وراء ضيقك أو فرحك بدقة.',
                descEn:
                  'Recognizing your own emotions and understanding what triggers them in real time.',
              },
              {
                num: '٢',
                weight: '25%',
                titleAr: 'تنظيم الانفعال والتهدئة (Self-Regulation)',
                titleEn: '2. Self-Regulation',
                descAr:
                  'قدرتك على التريث وضبط النفس عند الغضب أو التوتر بدلاً من الرد الاندفاعي الجارح.',
                descEn:
                  'Managing impulses, calming yourself under stress, and pausing before reacting.',
              },
              {
                num: '٣',
                weight: '25%',
                titleAr: 'التعاطف وقراءة الآخر (Empathy)',
                titleEn: '3. Empathy & Social Awareness',
                descAr:
                  'قدرتك على التقاط مشاعر الطرف الآخر من نبرة صوته وتعابيره والإنصات إليه باحتواء حقيقي.',
                descEn:
                  'Sensing others’ feelings through tone and body language and listening with genuine care.',
              },
              {
                num: '٤',
                weight: '25%',
                titleAr: 'إدارة العلاقات والخلاف (Relationship Management)',
                titleEn: '4. Relationship Management',
                descAr:
                  'مهارتك في حل الخلافات بالحوار الهادئ وبناء الثقة والمودة دون لوم أو قطيعة.',
                descEn:
                  'Resolving conflicts constructively, de-escalating tension, and nurturing mutual trust.',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                  isLight ? 'bg-amber-50/50 border-amber-200' : 'bg-white/[0.03] border-white/10'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-amber-700 text-white font-black text-xs flex items-center justify-center">
                      {pillar.num}
                    </span>
                    <span
                      className={`text-xs font-black ${
                        isLight ? 'text-amber-900' : 'text-amber-300'
                      }`}
                    >
                      {pillar.weight}
                    </span>
                  </div>
                  <h3 className={`text-xs sm:text-sm font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {isAr ? pillar.descAr : pillar.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================================
          INTERACTIVE LIVE SCORING SIMULATOR (جرب بنفسك الآن: محاكي الحساب الفوري)
      ===================================================================== */}
      <section
        className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
          isLight
            ? 'bg-gradient-to-br from-slate-50 via-white to-indigo-50/60 border-indigo-200 shadow-md'
            : 'bg-gradient-to-br from-slate-900 via-slate-900/95 to-indigo-950/35 border-indigo-500/30 shadow-xl'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold text-indigo-700 dark:text-indigo-300">
              <Sliders className="w-4 h-4" />
              <span>
                {isAr
                  ? 'تجربة عملية مباشرة لبناء الثقة (بدون أي غموض)'
                  : 'Interactive Live Demonstration'}
              </span>
            </div>
            <h2
              className={`text-lg sm:text-2xl font-black font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? 'جرّب بنفسك الآن: شاهد كيف يحسب النظام النتيجة أمام عينيك'
                : 'Try It Yourself: Watch How the Engine Calculates Scores Live'}
            </h2>
          </div>

          <div
            className={`px-4 py-2.5 rounded-2xl border text-center shrink-0 ${
              isLight
                ? 'bg-indigo-700 text-white border-indigo-800'
                : 'bg-indigo-600 text-white border-indigo-400/40'
            }`}
          >
            <div className="text-[11px] font-bold opacity-90">
              {isAr ? 'النتيجة المحسوبة فوراً' : 'Live Calculated Score'}
            </div>
            <div className="text-2xl font-black">{finalPercentage}%</div>
          </div>
        </div>

        <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          {isAr
            ? 'غيّر الإجابات في الأسئلة الثلاثة التجريبية التالية، ولاحظ كيف تتغير النقاط والدرجة المئوية في نفس اللحظة وفق المعادلة الحتمية:'
            : 'Change the answers on the three sample items below and watch the raw points and percentage update instantaneously:'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Sim Question 1 */}
          <div
            className={`p-4 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-950/60 border-white/10'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-emerald-700 dark:text-emerald-300">
                {isAr ? 'سؤال ١ (بند طردي مباشر)' : 'Item 1 (Direct Scoring)'}
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                {isAr ? `النقاط = ${simQ1}` : `Points = ${simQ1}`}
              </span>
            </div>
            <p className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isAr
                ? '«أستمتع بالحوار الهادف وتبادل الأفكار الجديدة مع شريك حياتي.»'
                : '“I enjoy meaningful dialogue and exploring new ideas with my partner.”'}
            </p>
            <div className="grid grid-cols-5 gap-1">
              {likertLabels.map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setSimQ1(opt.val);
                  }}
                  className={`py-2 rounded-lg text-xs font-extrabold border transition cursor-pointer ${
                    simQ1 === opt.val
                      ? 'bg-emerald-700 text-white border-emerald-800'
                      : isLight
                      ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-300'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-white/10'
                  }`}
                >
                  {opt.val}
                </button>
              ))}
            </div>
          </div>

          {/* Sim Question 2 (Reverse) */}
          <div
            className={`p-4 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-950/60 border-white/10'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-amber-800 dark:text-amber-300">
                {isAr ? 'سؤال ٢ (بند عكسي: 6 - إجابتك)' : 'Item 2 (Reverse: 6 - answer)'}
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300">
                {isAr
                  ? `6 - ${simQ2} = ${simQ2Adjusted} نقاط`
                  : `6 - ${simQ2} = ${simQ2Adjusted} pts`}
              </span>
            </div>
            <p className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isAr
                ? '«أجد صعوبة في تهدئة نفسي عند حدوث خلاف بسيط.» (سؤال عكسي)'
                : '“I find it hard to calm down during minor disagreements.” (Reverse item)'}
            </p>
            <div className="grid grid-cols-5 gap-1">
              {likertLabels.map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setSimQ2(opt.val);
                  }}
                  className={`py-2 rounded-lg text-xs font-extrabold border transition cursor-pointer ${
                    simQ2 === opt.val
                      ? 'bg-amber-800 text-white border-amber-900'
                      : isLight
                      ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-300'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-white/10'
                  }`}
                >
                  {opt.val}
                </button>
              ))}
            </div>
          </div>

          {/* Sim Question 3 */}
          <div
            className={`p-4 rounded-2xl border space-y-3 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-950/60 border-white/10'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-indigo-700 dark:text-indigo-300">
                {isAr ? 'سؤال ٣ (بند طردي مباشر)' : 'Item 3 (Direct Scoring)'}
              </span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                {isAr ? `النقاط = ${simQ3}` : `Points = ${simQ3}`}
              </span>
            </div>
            <p className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isAr
                ? '«أحرص على الصدق والوضوح التام في وعودي والتزاماتي.»'
                : '“I prioritize honesty and complete clarity in my promises.”'}
            </p>
            <div className="grid grid-cols-5 gap-1">
              {likertLabels.map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setSimQ3(opt.val);
                  }}
                  className={`py-2 rounded-lg text-xs font-extrabold border transition cursor-pointer ${
                    simQ3 === opt.val
                      ? 'bg-indigo-700 text-white border-indigo-800'
                      : isLight
                      ? 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-300'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-white/10'
                  }`}
                >
                  {opt.val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Formula Breakdown Box */}
        <div
          className={`p-4 rounded-2xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
            isLight
              ? 'bg-white border-indigo-200 text-slate-800'
              : 'bg-slate-950/80 border-indigo-500/30 text-slate-200'
          }`}
        >
          <div className="space-y-1">
            <div className="font-black text-indigo-700 dark:text-indigo-300">
              {isAr ? 'المعادلة المطبقة الآن على اختياراتك:' : 'Live Formula Applied to Your Selections:'}
            </div>
            <div className="font-mono text-xs sm:text-sm">
              {isAr
                ? `المجموع = (${simQ1} + ${simQ2Adjusted} + ${simQ3}) = ${rawTotal} من أصل 15  ⟵  ((${rawTotal} - 3) ÷ (15 - 3)) × 100 = ${finalPercentage}%`
                : `Total = (${simQ1} + ${simQ2Adjusted} + ${simQ3}) = ${rawTotal} / 15  ⟶  ((${rawTotal} - 3) ÷ (15 - 3)) × 100 = ${finalPercentage}%`}
            </div>
          </div>
          <div className="w-full sm:w-48 bg-slate-200 dark:bg-slate-800 h-3 rounded-full overflow-hidden shrink-0">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-emerald-600 transition-all duration-300"
              style={{ width: `${finalPercentage}%` }}
            />
          </div>
        </div>
      </section>

      {/* Action CTA Bar */}
      <div
        className={`rounded-3xl border p-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-slate-900/80 border-white/10 shadow-lg'
        }`}
      >
        <div className="space-y-1 text-center sm:text-start">
          <h3 className={`text-base sm:text-lg font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {isAr
              ? 'هل أنت مستعد لبدء اختبارك بثقة واطمئنان؟'
              : 'Ready to Start Your Assessment with Confidence?'}
          </h3>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {isAr
              ? 'اختر الاختبار الذي يناسبك الآن واحصل على تقريرك الفوري المحسوب بدقة علمية.'
              : 'Choose your preferred assessment now and receive your scientifically calculated report.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {isModal && onCloseModal ? (
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                onCloseModal();
              }}
              className="px-5 py-2.5 rounded-2xl bg-indigo-700 hover:bg-indigo-600 text-white font-extrabold text-xs cursor-pointer shadow-md flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isAr ? 'العودة لإكمال الاختبار الآن' : 'Return to Assessment Now'}</span>
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  if (onStartPersonalityTests) {
                    onStartPersonalityTests();
                  } else if (onNavigatePage) {
                    onNavigatePage('personality-tests');
                  }
                }}
                className="px-5 py-2.5 rounded-2xl bg-indigo-700 hover:bg-indigo-600 text-white font-extrabold text-xs cursor-pointer shadow-md flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                <span>{isAr ? 'بدء اختبارات الشخصية (Big Five / HEXACO)' : 'Start Personality Tests'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  if (onStartCompatibilityTest) {
                    onStartCompatibilityTest();
                  } else if (onNavigatePage) {
                    onNavigatePage('compatibility');
                  }
                }}
                className="px-5 py-2.5 rounded-2xl bg-rose-700 hover:bg-rose-600 text-white font-extrabold text-xs cursor-pointer shadow-md flex items-center gap-2"
              >
                <Heart className="w-4 h-4" />
                <span>{isAr ? 'بدء اختبار التوافق العاطفي' : 'Start Compatibility Test'}</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div
        dir={isAr ? 'rtl' : 'ltr'}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget && onCloseModal) {
            onCloseModal();
          }
        }}
      >
        <div
          className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border p-4 sm:p-8 shadow-2xl ${
            isLight
              ? 'bg-slate-50 border-slate-300 text-slate-900'
              : 'bg-[#0b0e17] border-white/15 text-slate-100'
          }`}
        >
          {contentBody}
        </div>
      </div>
    );
  }

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
            ? 'كيف يتم حساب نتائج الاختبارات؟ (Big Five, HEXACO, Attachment, EQ) | مرآة القلوب'
            : 'How Are Test Results Calculated? (Big Five, HEXACO, Attachment, EQ) | Mirror of Hearts'
        }
        description={
          isAr
            ? 'شرح مبسط وشفاف لكيفية حساب نتائج الاختبارات النفسية واختبارات التوافق في مرآة القلوب: العوامل الخمسة الكبرى (Big Five)، نموذج هيكساكو (HEXACO)، أنماط التعلق (Attachment)، والذكاء العاطفي (Emotional Intelligence).'
            : 'A simple, transparent guide explaining how test results are calculated in Mirror of Hearts across Big Five, HEXACO, Attachment Styles, and Emotional Intelligence.'
        }
        canonicalPath="/how-results-are-calculated"
        language={language}
      />

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Breadcrumb */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 pb-4 border-b ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}
        >
          <div className={`flex items-center gap-2 text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {onBackToHome && (
              <button
                type="button"
                onClick={onBackToHome}
                className="hover:text-indigo-500 transition cursor-pointer font-bold"
              >
                {isAr ? 'الرئيسية' : 'Home'}
              </button>
            )}
            <span>/</span>
            <button
              type="button"
              onClick={() => onNavigatePage && onNavigatePage('personality-tests')}
              className="hover:text-indigo-500 transition cursor-pointer font-bold"
            >
              {isAr ? 'مواقع الاختبارات' : 'Assessments'}
            </button>
            <span>/</span>
            <span className={`font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isAr ? 'كيف يتم حساب نتائج الاختبارات؟' : 'How Are Test Results Calculated?'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onNavigatePage && (
              <button
                type="button"
                onClick={() => onNavigatePage('personality-tests')}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  isLight
                    ? 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-800'
                    : 'bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-500/40 text-indigo-200'
                }`}
              >
                <Brain className="w-3.5 h-3.5" />
                <span>{isAr ? 'الذهاب لمختبر الاختبارات' : 'Go to Tests Lab'}</span>
              </button>
            )}
            {onBackToHome && (
              <button
                type="button"
                onClick={onBackToHome}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                }`}
              >
                {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
              </button>
            )}
          </div>
        </div>

        {contentBody}
      </div>
    </div>
  );
};
