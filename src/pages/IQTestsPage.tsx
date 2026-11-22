import React from 'react';
import {
  Brain,
  Lightbulb,
  Cpu,
  Home,
  ArrowRight,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Award,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { PageSEO } from '../components/PageSEO';
import { soundManager } from '../utils/sound';
import { IntelligenceBatteryType } from '../data/intelligenceTestData';
import { ContextualLinksStrip } from '../components/ContextualLinksStrip';
import { SuggestedContentMixSection } from '../components/SuggestedContentMixSection';

interface IQTestsPageProps {
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
  onOpenIntelligenceBattery: (battery?: IntelligenceBatteryType) => void;
}

export const IQTestsPage: React.FC<IQTestsPageProps> = ({
  onBackToHome,
  onNavigatePage,
  onOpenIntelligenceBattery,
}) => {
  const { language, isRTL } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';

  const batteries: {
    id: IntelligenceBatteryType;
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    questionsCount: string;
    durationAr: string;
    durationEn: string;
    gradient: string;
    icon: string;
  }[] = [
    {
      id: 'multiple_intelligences',
      titleAr: 'مقياس الذكاءات المتعددة التسعة (Howard Gardner)',
      titleEn: 'Gardner Multiple Intelligences Inventory (9 Domains)',
      descAr:
        'تحليل شامل لأنماط ذكائك اللغوي، المنطقي، البصري، الموسيقي، الحركي، الاجتماعي، الذاتي، الطبيعي، والوجودي مع رادار معرفي وتوجيه مهني.',
      descEn:
        'Comprehensive profile across Linguistic, Logical, Spatial, Musical, Bodily, Interpersonal, Intrapersonal, Naturalist, and Existential intelligences.',
      questionsCount: isAr ? '45 سؤالاً محكماً' : '45 Items',
      durationAr: '12–15 دقيقة',
      durationEn: '12–15 min',
      gradient: 'from-amber-500 to-orange-600',
      icon: '💡',
    },
    {
      id: 'general_iq_raven_chc',
      titleAr: 'مصفوفات رافين المتدرجة للاستدلال المجرد (Raven IQ)',
      titleEn: 'Raven Progressive Logic & Abstract Reasoning',
      descAr:
        'اختبار موضوعي لقياس الذكاء السائل والقدرة على اكتشاف العلاقات النمطية والاستدلال المنطقي غير اللفظي.',
      descEn:
        'Objective fluid intelligence and non-verbal abstract pattern-recognition battery.',
      questionsCount: isAr ? 'مهام استدلالية موضوعية' : 'Objective Logic Tasks',
      durationAr: '10 دقائق',
      durationEn: '10 min',
      gradient: 'from-cyan-500 to-blue-600',
      icon: '🧩',
    },
    {
      id: 'emotional_intelligence_eq',
      titleAr: 'بطارية الذكاء العاطفي السيكومتري (EQ)',
      titleEn: 'Psychometric Emotional Intelligence Battery (EQ)',
      descAr:
        'قياس القدرة على إدراك المشاعر، التنظيم الانفعالي، التعاطف المعرفي، وإدارة العلاقات التفاعلية بدقة.',
      descEn:
        'Assesses emotional perception, regulation under stress, empathic accuracy, and relational fluency.',
      questionsCount: isAr ? 'مقياس تطبيقي متعدد المحاور' : 'Multi-Axis Assessment',
      durationAr: '8–10 دقائق',
      durationEn: '8–10 min',
      gradient: 'from-rose-500 to-pink-600',
      icon: '💎',
    },
    {
      id: 'cognitive_aptitude_cogat',
      titleAr: 'اختبار القدرات الإدراكية والمعرفية (CogAT)',
      titleEn: 'Cognitive Abilities Assessment (Verbal, Quantitative & Spatial)',
      descAr:
        'تقييم ثلاثي للقدرات اللفظية والكمية والتحليلية لفهم نقاط التفوق الذهني وأساليب التعلم المثلى.',
      descEn:
        'Tripartite assessment of verbal, quantitative, and analytical reasoning styles.',
      questionsCount: isAr ? 'اختبار قدرات متعددة' : 'Multi-Battery Test',
      durationAr: '10–12 دقيقة',
      durationEn: '10–12 min',
      gradient: 'from-indigo-500 to-violet-600',
      icon: '⚡',
    },
  ];

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-10 space-y-8"
    >
      <PageSEO
        title={
          isAr
            ? 'اختبارات الذكاء والقدرات المعرفية (IQ & EQ) | مرآة القلوب'
            : 'Multiple Intelligences, Raven IQ & Cognitive Abilities Lab | Mirror of Hearts'
        }
        description={
          isAr
            ? 'مختبر اختبارات الذكاء في منصة مرآة القلوب: ذكاءات هوارد غاردنر التسعة، مصفوفات رافين للاستدلال المجرد، بطارية الذكاء العاطفي، واختبار القدرات المعرفية CogAT مع تقارير فورية.'
            : 'Explore Mirror of Hearts IQ & Cognitive Lab: Howard Gardner 9 Multiple Intelligences, Raven Abstract Reasoning, Emotional Intelligence EQ, and CogAT.'
        }
        canonicalPath="/iq-tests"
        language={language}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: isAr ? 'اختبارات الذكاء والقدرات المعرفية | مرآة القلوب' : 'IQ & Cognitive Lab | Mirror of Hearts',
          url: 'https://miratalqulub.com/iq-tests',
          inLanguage: language,
        }}
      />

      {/* Top Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            soundManager.playTap();
            onBackToHome();
          }}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold inline-flex items-center gap-1.5 border transition ${
            isLight
              ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
              : 'bg-white/5 hover:bg-white/10 text-gray-200 border-white/10'
          }`}
        >
          <Home className="w-3.5 h-3.5 text-amber-500" />
          <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
        </a>

        <a
          href="/how-results-are-calculated"
          onClick={(e) => {
            e.preventDefault();
            soundManager.playTap();
            onNavigatePage('how-results-are-calculated');
          }}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold inline-flex items-center gap-1.5 border transition ${
            isLight
              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200'
              : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-200 border-emerald-500/30'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isAr ? 'كيف تُحسب النتائج؟' : 'How Scores Are Calculated'}</span>
        </a>
      </div>

      {/* Hero Header */}
      <header
        className={`p-6 sm:p-10 rounded-3xl border shadow-xl space-y-4 ${
          isLight
            ? 'bg-gradient-to-br from-amber-50 via-white to-cyan-50/70 border-amber-200 text-slate-900'
            : 'bg-gradient-to-br from-slate-900/95 via-amber-950/20 to-slate-950 border-amber-500/25 text-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-lg shrink-0">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span
              className={`text-[11px] font-extrabold tracking-wide uppercase block ${
                isLight ? 'text-amber-800' : 'text-amber-300'
              }`}
            >
              {isAr ? 'مختبر القدرات الذهنية والذكاء السيكومتري' : 'Cognitive & Psychometric Intelligence Lab'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black font-['Alexandria']">
              {isAr ? 'اختبارات الذكاء والقدرات المعرفية' : 'Intelligence & Cognitive Abilities Tests'}
            </h1>
          </div>
        </div>

        <p className={`text-sm sm:text-base leading-relaxed max-w-3xl ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          {isAr
            ? 'مجموعة متكاملة من المقاييس المعرفية المصممة لاكتشاف نقاط قوتك الذهنية وأسلوب تفكيرك الاستدلالي والعاطفي، مع مخطط رادار تفاعلي وتوصيات معرفية ومهنية مخصصة فور انتهاء كل بطارية.'
            : 'An integrated suite of psychometric batteries designed to map your cognitive strengths, fluid reasoning, and emotional fluency with instant radar reports.'}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              soundManager.playTap();
              onOpenIntelligenceBattery('multiple_intelligences');
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-sm shadow-lg transition cursor-pointer inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAr ? 'افتح مختبر الذكاء التفاعلي الآن' : 'Launch Interactive IQ Lab'}</span>
            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          <a
            href="/personality-tests"
            onClick={(e) => {
              e.preventDefault();
              soundManager.playTap();
              onNavigatePage('personality-tests');
            }}
            className={`px-5 py-3 rounded-2xl border font-bold text-sm transition inline-flex items-center gap-2 ${
              isLight
                ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800'
                : 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-200'
            }`}
          >
            <Brain className="w-4 h-4 text-purple-500" />
            <span>{isAr ? 'استكشف اختبارات الشخصية' : 'Explore Personality Lab'}</span>
          </a>
        </div>
      </header>

      {/* Batteries Grid */}
      <section aria-label={isAr ? 'بطاريات اختبارات الذكاء' : 'Intelligence Batteries'} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {batteries.map((b) => (
          <article
            key={b.id}
            className={`p-6 rounded-3xl border flex flex-col justify-between gap-5 transition-all duration-200 hover:-translate-y-0.5 ${
              isLight
                ? 'bg-white border-slate-200 shadow-sm hover:border-amber-400'
                : 'bg-slate-900/75 border-white/10 hover:border-amber-400/50'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${b.gradient} text-white flex items-center justify-center text-2xl shadow-md shrink-0`}
                >
                  {b.icon}
                </span>
                <div className="flex items-center gap-2 text-[11px] font-bold">
                  <span
                    className={`px-2.5 py-1 rounded-lg border ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-700'
                        : 'bg-white/5 border-white/10 text-slate-300'
                    }`}
                  >
                    {b.questionsCount}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg border inline-flex items-center gap-1 ${
                      isLight
                        ? 'bg-amber-50 border-amber-200 text-amber-800'
                        : 'bg-amber-500/15 border-amber-500/30 text-amber-200'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>{isAr ? b.durationAr : b.durationEn}</span>
                  </span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-black font-['Alexandria']">
                {isAr ? b.titleAr : b.titleEn}
              </h2>

              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                {isAr ? b.descAr : b.descEn}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                onOpenIntelligenceBattery(b.id);
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{isAr ? 'ابدأ هذا الاختبار الآن' : 'Start This Assessment'}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </article>
        ))}
      </section>

      {/* Scientific Integrity Note */}
      <div
        className={`p-5 rounded-2xl border flex items-start gap-3 text-xs leading-relaxed ${
          isLight
            ? 'bg-slate-50 border-slate-200 text-slate-700'
            : 'bg-white/[0.03] border-white/10 text-slate-300'
        }`}
      >
        <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-extrabold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              {isAr
                ? 'منهجية سيكومترية للاستكشاف الذاتي والتوجيه المعرفي'
                : 'Psychometric Orientation & Cognitive Awareness'}
            </span>
          </div>
          <p>
            {isAr
              ? 'تعتمد النتائج على التقييس الرياضي اللحظي لإجاباتك بهدف استكشاف ميولك المعرفية وقدراتك الذهنية؛ وهي لأغراض معرفية وتطويرية ولا تغني عن الفحص الإكلينيكي المتخصص.'
              : 'All results compute your personal responses in real time for cognitive insight and educational orientation.'}
          </p>
        </div>
      </div>

      {/* Contextual Internal Links (2–5 SEO & Educational links) */}
      <ContextualLinksStrip
        testId="intel_multiple_intelligences"
        sourcePage="/iq-tests"
        sourceType="test"
        count={4}
        titleAr="مراجع ودراسات لفهم اختبارات الذكاء والقدرات"
        titleEn="Scientific Explanations & Cognitive Studies"
      />

      {/* Curated Content Mix ("محتوى مقترح لك") */}
      <SuggestedContentMixSection
        sourcePage="/iq-tests"
        sourceType="test"
        clusters={['cognitive_intelligence', 'emotional_intelligence', 'personality']}
        excludeRoutes={['/iq-tests']}
        count={6}
        variant="you_may_also_like"
      />
    </div>
  );
};

export default IQTestsPage;
