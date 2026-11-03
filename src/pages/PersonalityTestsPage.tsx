import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Share2,
  Check,
  ShieldAlert,
  Award,
  Layers,
  Heart,
  Sun,
  Moon,
  Cpu,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';
import { PageSEO } from '../components/PageSEO';
import {
  PERSONALITY_TESTS_CATALOG,
  PersonalityTestMeta,
  MBTI_ARCHETYPES_INFO,
} from '../data/personalityTestsData';
import { saveUnifiedTestRecord } from '../services/userHistoryService';
import {
  PsychometricAcademicIntro,
  PsychometricAcademicConclusion,
  ScientificClinicalDisclaimerBanner,
} from '../components/PsychometricAcademicFraming';
import { IntelligenceTestModal } from '../components/IntelligenceTestModal';
import { PsychologyTestsModal } from '../components/PsychologyTestsModal';

interface Props {
  onBackToHome: () => void;
  onNavigatePage?: (page: string) => void;
}

export const PersonalityTestsPage: React.FC<Props> = ({ onBackToHome }) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const { user } = useAuth();
  const [theme, toggleTheme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';

  // State: 'catalog' | 'test' | 'result'
  const [activeTest, setActiveTest] = useState<PersonalityTestMeta | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // questionId -> value (1 to 5)
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSavingCloud, setIsSavingCloud] = useState(false);
  const [cloudSaved, setCloudSaved] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Additional Modals for Intelligence & Advanced Psychometrics directly accessible from this page
  const [isIntelligenceModalOpen, setIsIntelligenceModalOpen] = useState(false);
  const [isPsychModalOpen, setIsPsychModalOpen] = useState(false);

  // Result state
  const [mbtiResult, setMbtiResult] = useState<{
    typeCode: string;
    archetype: (typeof MBTI_ARCHETYPES_INFO)[string];
    percentages: { E: number; I: number; S: number; N: number; T: number; F: number; J: number; P: number };
  } | null>(null);

  const [bigFiveResult, setBigFiveResult] = useState<{
    scores: { O: number; C: number; E: number; A: number; ES: number };
  } | null>(null);

  const likertOptions = isAr
    ? [
        { value: 1, label: 'أعارض بشدة', color: 'hover:border-rose-500 hover:text-rose-400' },
        { value: 2, label: 'أعارض', color: 'hover:border-rose-400/60 hover:text-rose-300' },
        { value: 3, label: 'محايد', color: 'hover:border-slate-500 hover:text-slate-300' },
        { value: 4, label: 'أوافق', color: 'hover:border-emerald-400/60 hover:text-emerald-300' },
        { value: 5, label: 'أوافق بشدة', color: 'hover:border-emerald-500 hover:text-emerald-400' },
      ]
    : [
        { value: 1, label: 'Strongly Disagree', color: 'hover:border-rose-500 hover:text-rose-400' },
        { value: 2, label: 'Disagree', color: 'hover:border-rose-400/60 hover:text-rose-300' },
        { value: 3, label: 'Neutral', color: 'hover:border-slate-500 hover:text-slate-300' },
        { value: 4, label: 'Agree', color: 'hover:border-emerald-400/60 hover:text-emerald-300' },
        { value: 5, label: 'Strongly Agree', color: 'hover:border-emerald-500 hover:text-emerald-400' },
      ];

  const handleStartTest = (test: PersonalityTestMeta) => {
    soundManager.playTap();
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsCompleted(false);
    setCloudSaved(false);
    setMbtiResult(null);
    setBigFiveResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAnswer = (questionId: number, value: number) => {
    soundManager.playTap();
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);

    if (activeTest && currentQuestionIndex < activeTest.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 220);
    } else if (activeTest && currentQuestionIndex === activeTest.questions.length - 1) {
      calculateAndSaveResults(activeTest, updated);
    }
  };

  const calculateAndSaveResults = async (
    test: PersonalityTestMeta,
    finalAnswers: Record<number, number>
  ) => {
    setIsCompleted(true);
    setIsSavingCloud(true);

    if (test.id === 'mbti_16') {
      const sums: Record<string, { score: number; count: number }> = {
        EI: { score: 0, count: 0 },
        SN: { score: 0, count: 0 },
        TF: { score: 0, count: 0 },
        JP: { score: 0, count: 0 },
      };

      test.questions.forEach((q) => {
        const raw = finalAnswers[q.id] || 3;
        const val = q.direction === 1 ? raw : 6 - raw;
        if (sums[q.dimension]) {
          sums[q.dimension].score += val;
          sums[q.dimension].count += 1;
        }
      });

      const calcPct = (dim: string) => {
        const item = sums[dim];
        if (!item || item.count === 0) return 50;
        const min = item.count * 1;
        const max = item.count * 5;
        return Math.round(((item.score - min) / (max - min)) * 100);
      };

      const E = calcPct('EI');
      const I = 100 - E;
      const S = calcPct('SN');
      const N = 100 - S;
      const T = calcPct('TF');
      const F = 100 - T;
      const J = calcPct('JP');
      const P = 100 - J;

      const typeCode = `${E >= 50 ? 'E' : 'I'}${S >= 50 ? 'S' : 'N'}${T >= 50 ? 'T' : 'F'}${J >= 50 ? 'J' : 'P'}`;
      const archetype = MBTI_ARCHETYPES_INFO[typeCode] || MBTI_ARCHETYPES_INFO['INFJ'];

      setMbtiResult({
        typeCode,
        archetype,
        percentages: { E, I, S, N, T, F, J, P },
      });

      try {
        await saveUnifiedTestRecord(user || null, {
          testType: 'psychology',
          testTitleAr: 'مؤشر الأنماط الـ16 لمايرز-بريغز (MBTI)',
          testCategoryAr: 'مقاييس الشخصية المعتمدة',
          scoreOrArchetype: `${typeCode} - ${archetype.titleAr}`,
          percentage: Math.max(E, I),
          badgeColor: '#f43f5e',
          keyInsights: archetype.strengthsAr,
          snapshot: {
            typeCode,
            percentages: { E, I, S, N, T, F, J, P },
            timestamp: new Date().toISOString(),
          },
        });
        setCloudSaved(true);
      } catch (e) {
        console.warn('Cloud save fallback', e);
      } finally {
        setIsSavingCloud(false);
      }
    } else if (test.id === 'big_five') {
      const sums: Record<string, { score: number; count: number }> = {
        O: { score: 0, count: 0 },
        C: { score: 0, count: 0 },
        E: { score: 0, count: 0 },
        A: { score: 0, count: 0 },
        ES: { score: 0, count: 0 },
      };

      test.questions.forEach((q) => {
        const raw = finalAnswers[q.id] || 3;
        const val = q.direction === 1 ? raw : 6 - raw;
        if (sums[q.dimension]) {
          sums[q.dimension].score += val;
          sums[q.dimension].count += 1;
        }
      });

      const calcPct = (dim: string) => {
        const item = sums[dim];
        if (!item || item.count === 0) return 50;
        const min = item.count * 1;
        const max = item.count * 5;
        return Math.round(((item.score - min) / (max - min)) * 100);
      };

      const scores = {
        O: calcPct('O'),
        C: calcPct('C'),
        E: calcPct('E'),
        A: calcPct('A'),
        ES: calcPct('ES'),
      };

      setBigFiveResult({ scores });

      try {
        await saveUnifiedTestRecord(user || null, {
          testType: 'psychology',
          testTitleAr: 'مقياس العوامل الخمسة الكبرى (Big Five / OCEAN)',
          testCategoryAr: 'مقاييس الشخصية المعتمدة',
          scoreOrArchetype: `الانفتاح ${scores.O}% • الانضباط ${scores.C}%`,
          percentage: Math.round((scores.O + scores.C + scores.E + scores.A + scores.ES) / 5),
          badgeColor: '#8b5cf6',
          keyInsights: [
            `الانفتاح الفكري: ${scores.O}%`,
            `الانضباط الذاتي: ${scores.C}%`,
            `الاتزان الانفعالي: ${scores.ES}%`,
          ],
          snapshot: { scores, timestamp: new Date().toISOString() },
        });
        setCloudSaved(true);
      } catch (e) {
        console.warn('Cloud save fallback', e);
      } finally {
        setIsSavingCloud(false);
      }
    }
  };

  const handleShareResult = () => {
    soundManager.playTap();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
      });
    }
  };

  const intelligenceBatteriesSummary = [
    {
      id: 'multiple_intelligences',
      icon: '🧠',
      titleAr: 'مقياس الذكاءات التسعة المتعددة (Gardner & McKenzie - 45 بنداً)',
      titleEn: 'Multiple Intelligences Inventory (Gardner & McKenzie - 45 Items)',
      descAr:
        'يحلل البصمة المعرفية عبر 9 ذكاءات مستقلة: اللغوي، المنطقي الرياضي، البصري المكاني، الحركي، الموسيقي، الاجتماعي، الذاتي، الطبيعي، والوجودي.',
      descEn:
        'Evaluates cognitive profiles across 9 distinct modalities: Linguistic, Logical-Mathematical, Spatial, Kinesthetic, Musical, Interpersonal, Intrapersonal, Naturalistic, and Existential.',
      refAr: 'Gardner (1983, 1999) • Frames of Mind',
      refEn: 'Gardner (1983, 1999) • Frames of Mind',
    },
    {
      id: 'fluid_iq',
      icon: '🧩',
      titleAr: 'بطارية الذكاء السائل والمنطقي المعياري (Raven & WAIS/CHC - 30 سؤالاً)',
      titleEn: 'Fluid & Quantitative IQ Battery (Raven & WAIS/CHC - 30 Items)',
      descAr:
        'تتضمن مصفوفات رافين البصرية المتتابعة، سلاسل الأعداد، الاستنباط المنطقي، والقياس اللفظي لحساب الدرجة المعيارية (Standard Score) والمئين العمري.',
      descEn:
        'Includes Raven’s visual progressive matrices, numerical sequences, deductive syllogisms, and verbal analogies with age-normed Standard Scores.',
      refAr: 'Raven (2000) & Cattell-Horn-Carroll (CHC)',
      refEn: 'Raven (2000) & Cattell-Horn-Carroll (CHC)',
    },
    {
      id: 'emotional_eq',
      icon: '💖',
      titleAr: 'مقياس الذكاء العاطفي والاجتماعي المعتمد (MSCEIT & Bar-On - 30 موقفاً)',
      titleEn: 'Emotional & Social Intelligence Battery (MSCEIT & Bar-On - 30 Scenarios)',
      descAr:
        'يقيس الوعي الانفعالي، إدارة الضغوط، قراءة الإشارات غير اللفظية، والتعاطف العلائقي عبر مواقف حياتية وزوجية واقعية محكّمة.',
      descEn:
        'Assesses emotional perception, stress regulation, non-verbal decoding, and relational empathy through validated situational judgment scenarios.',
      refAr: 'Salovey & Mayer (1990); Bar-On (1997); Goleman (1995)',
      refEn: 'Salovey & Mayer (1990); Bar-On (1997); Goleman (1995)',
    },
    {
      id: 'cattell_16pf',
      icon: '📊',
      titleAr: 'استبيان كاتل لعوامل الشخصية الـ 16 ونموذج آيزنك (16PF & EPQ-R)',
      titleEn: 'Cattell 16 Personality Factors & Eysenck Temperament (16PF & EPQ-R)',
      descAr:
        'تحليل عاملي دقيق بـالدرجات المعيارية العشرية (Sten 1-10) لقياس 16 سمة أولية و4 أمزجة بيولوجية فطرية مع تقارير PDF فورية.',
      descEn:
        'Factor-analytic assessment utilizing Standard Ten (Sten 1-10) scoring across 16 primary traits and 4 neurobiological temperaments.',
      refAr: 'Cattell et al. (1970) & Eysenck (1985)',
      refEn: 'Cattell et al. (1970) & Eysenck (1985)',
    },
  ];

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`w-full min-h-screen py-6 sm:py-10 px-3 sm:px-6 transition-colors duration-300 selection:bg-rose-500/30 ${
        isLight ? 'bg-slate-50 text-slate-900' : 'text-slate-100'
      }`}
    >
      <PageSEO
        title={
          isAr
            ? 'مختبر مقاييس الشخصية واختبارات الذكاء المعتمدة (MBTI, Big Five, IQ, EQ) | مرآة القلوب'
            : 'Certified Personality & Intelligence Assessments (MBTI, Big Five, IQ, EQ) | Mirror of Hearts'
        }
        description={
          isAr
            ? 'مختبر المقاييس السيكومترية واختبارات الذكاء الموثق بمراجع APA: مؤشر مايرز-بريغز (MBTI)، العوامل الخمسة الكبرى (OCEAN)، الذكاءات المتعددة لجاردنر، مصفوفات رافين للذكاء، ومقياس كاتل 16PF.'
            : 'APA-referenced psychometric and intelligence laboratory: Myers-Briggs 16 Types (MBTI), Big Five (OCEAN), Gardner Multiple Intelligences, Raven Fluid IQ, and Cattell 16PF.'
        }
        canonicalPath="/#/personality-tests"
        language={language}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Breadcrumb & Controls (Language AR/EN + Theme Dark/Light + Home) */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 pb-4 border-b ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}
        >
          <div className={`flex items-center gap-2 text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            <button
              onClick={onBackToHome}
              className="hover:text-rose-500 transition cursor-pointer flex items-center gap-1 font-semibold"
            >
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            </button>
            <span>/</span>
            <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {isAr
                ? 'مختبر المقاييس السيكومترية واختبارات الذكاء'
                : 'Psychometric & Intelligence Assessment Lab'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => {
                soundManager.playTap();
                toggleTheme();
              }}
              aria-label={isAr ? 'تبديل الوضع الليلي والنهاري' : 'Toggle Dark/Light Mode'}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-amber-700 shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-amber-300'
              }`}
            >
              {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              <span>{isLight ? (isAr ? 'الوضع الليلي' : 'Dark Mode') : (isAr ? 'الوضع النهاري' : 'Light Mode')}</span>
            </button>

            {/* AR / EN Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-sky-700 shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-sky-300'
              }`}
            >
              <span>{isAr ? 'English (EN)' : 'العربية (AR)'}</span>
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

        {/* PERMANENT TOP ACADEMIC INTRODUCTION (Always visible in DOM for Mediapartners-Google) */}
        <PsychometricAcademicIntro variant="page" focusScope="all" />

        {/* VIEW 1: Assessments Catalog */}
        {!activeTest && (
          <div className="space-y-8">
            <header
              className={`relative overflow-hidden rounded-3xl border p-8 sm:p-10 shadow-xl ${
                isLight
                  ? 'bg-gradient-to-r from-rose-50 via-white to-purple-50 border-rose-200'
                  : 'bg-gradient-to-r from-rose-950/40 via-slate-900/90 to-purple-950/40 border-rose-500/30'
              }`}
            >
              <div className="relative z-10 max-w-3xl space-y-3">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${
                    isLight
                      ? 'bg-rose-100 text-rose-800 border-rose-300'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}
                >
                  <Brain className="w-4 h-4" />
                  <span>
                    {isAr
                      ? 'المقاييس النفسية واختبارات الذكاء العالمية المعتمدة'
                      : 'Validated Psychometric & Cognitive Intelligence Inventories'}
                  </span>
                </div>
                <h1
                  className={`text-2xl sm:text-4xl font-black tracking-tight ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {isAr
                    ? 'مختبر استكشاف الشخصية والذكاءات المتعددة'
                    : 'Personality Archetypes & Multi-Modal Intelligence Matrix'}
                </h1>
                <p
                  className={`text-sm sm:text-base leading-relaxed ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}
                >
                  {isAr
                    ? 'اختر أحد المقاييس السيكومترية أو بطاريات الذكاء العالمية لفهم بنيتك المعرفية، نقاط قوتك الفطرية، وطبيعة تفاعلك في العلاقات الإنسانية والمهنية مع حفظ سحابي وتقارير PDF فورية.'
                    : 'Select a validated psychometric scale or cognitive intelligence battery to uncover your cognitive architecture, natural strengths, and relational dynamics with cloud persistence and PDF reports.'}
                </p>
              </div>
            </header>

            {/* Clinical & Scientific Exploratory Disclaimer Notice */}
            <ScientificClinicalDisclaimerBanner testType="personality" />

            {/* Primary Personality Assessment Cards Grid (MBTI & Big Five) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PERSONALITY_TESTS_CATALOG.map((test) => (
                <div
                  key={test.id}
                  className={`border rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between transition-all group ${
                    isLight
                      ? 'bg-white border-slate-200 hover:border-rose-400 shadow-lg hover:shadow-xl'
                      : 'bg-slate-900/70 border-slate-800 hover:border-rose-500/50 hover:shadow-2xl hover:shadow-rose-950/30'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}
                        style={{
                          backgroundColor: `${test.badgeColor}20`,
                          borderColor: `${test.badgeColor}60`,
                        }}
                      >
                        {isAr ? test.badgeAr : test.badgeEn}
                      </span>
                      <span
                        className={`flex items-center gap-1 text-xs ${
                          isLight ? 'text-slate-600' : 'text-slate-400'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {test.estimatedMinutes} {isAr ? 'دقائق' : 'mins'}
                        </span>
                      </span>
                    </div>

                    <div>
                      <h2
                        className={`text-xl sm:text-2xl font-bold transition-colors ${
                          isLight
                            ? 'text-slate-900 group-hover:text-rose-600'
                            : 'text-white group-hover:text-rose-300'
                        }`}
                      >
                        {isAr ? test.titleAr : test.titleEn}
                      </h2>
                      <p
                        className={`text-xs font-medium mt-1 ${
                          isLight ? 'text-rose-600' : 'text-rose-400/90'
                        }`}
                      >
                        {isAr ? test.subtitleAr : test.subtitleEn}
                      </p>
                    </div>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isLight ? 'text-slate-600' : 'text-slate-300'
                      }`}
                    >
                      {isAr ? test.shortDescriptionAr : test.shortDescriptionEn}
                    </p>

                    {/* Scientific origin tag */}
                    <div
                      className={`p-3 rounded-xl border text-[11px] flex items-center gap-2 ${
                        isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-700'
                          : 'bg-slate-950/70 border-slate-800 text-slate-400'
                      }`}
                    >
                      <Award className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <span
                          className={`block text-[10px] ${
                            isLight ? 'text-slate-500' : 'text-slate-500'
                          }`}
                        >
                          {isAr ? 'المرجعية الأكاديمية (APA):' : 'Academic Reference (APA):'}
                        </span>
                        <span
                          className={`font-semibold ${
                            isLight ? 'text-slate-800' : 'text-slate-300'
                          }`}
                        >
                          {isAr ? test.scientificOriginAr : test.scientificOriginEn}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartTest(test)}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{isAr ? 'ابدأ الاختبار الآن' : 'Start Assessment'}</span>
                    {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>

            {/* Intelligence & Extended Psychometric Batteries Showcase */}
            <div
              className={`rounded-3xl border p-6 sm:p-8 space-y-6 ${
                isLight
                  ? 'bg-white border-slate-200 shadow-lg'
                  : 'bg-slate-900/75 border-purple-500/30 shadow-xl'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-purple-500/20">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-purple-500">
                    <Cpu className="w-4 h-4" />
                    <span>
                      {isAr
                        ? 'منظومة اختبارات الذكاء (IQ / EQ) والتحليل العاملي المتقدم (16PF)'
                        : 'Cognitive Intelligence (IQ / EQ) & Advanced Factor-Analytic Batteries (16PF)'}
                    </span>
                  </div>
                  <h2
                    className={`text-lg sm:text-2xl font-black font-['Alexandria'] ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {isAr
                      ? 'بطاريات الذكاءات المتعددة، مصفوفات رافين، ومقاييس الشخصية الاستكشافية والتثقيفية'
                      : 'Multiple Intelligences, Raven’s Matrices & Exploratory Educational Personality Scales'}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      setIsIntelligenceModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-extrabold transition shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Layers className="w-4 h-4" />
                    <span>
                      {isAr
                        ? 'فتح مختبر الذكاء والقدرات (135 سؤالاً)'
                        : 'Open Intelligence Lab (135 Items)'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      setIsPsychModalOpen(true);
                    }}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
                      isLight
                        ? 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-800'
                        : 'bg-purple-500/15 hover:bg-purple-500/25 border-purple-500/35 text-purple-200'
                    }`}
                  >
                    <Brain className="w-4 h-4" />
                    <span>
                      {isAr
                        ? 'فتح المقاييس المتخصصة (16PF • EPQ • التعلق)'
                        : 'Open Specialized Scales (16PF • EPQ • ECR-R)'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {intelligenceBatteriesSummary.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      soundManager.playTap();
                      if (item.id === 'cattell_16pf') {
                        setIsPsychModalOpen(true);
                      } else {
                        setIsIntelligenceModalOpen(true);
                      }
                    }}
                    className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between gap-3 ${
                      isLight
                        ? 'bg-slate-50/90 hover:bg-purple-50/50 border-slate-200 hover:border-purple-300'
                        : 'bg-slate-950/65 hover:bg-slate-950 border-white/10 hover:border-purple-500/40'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{item.icon}</span>
                        <span
                          className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                            isLight
                              ? 'bg-purple-100 border-purple-200 text-purple-800'
                              : 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                          }`}
                        >
                          {isAr ? item.refAr : item.refEn}
                        </span>
                      </div>
                      <h3
                        className={`font-bold text-sm sm:text-base ${
                          isLight ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {isAr ? item.titleAr : item.titleEn}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed ${
                          isLight ? 'text-slate-600' : 'text-slate-300'
                        }`}
                      >
                        {isAr ? item.descAr : item.descEn}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-purple-500/15 text-xs font-bold text-purple-500">
                      <span>
                        {isAr ? 'بدء البطارية المعيارية والتصحيح الفوري' : 'Launch Standardized Battery'}
                      </span>
                      {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Active Test Runner */}
        {activeTest && !isCompleted && (
          <div className="space-y-6">
            {/* Clinical & Scientific Disclaimer at the start of the active test */}
            <ScientificClinicalDisclaimerBanner
              testType="personality"
              testTitleAr={activeTest.titleAr}
              testTitleEn={activeTest.titleEn}
              compact
            />

            {/* Header with Progress Bar */}
            <div
              className={`border rounded-2xl p-5 space-y-4 ${
                isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-rose-500 font-bold block">
                    {isAr ? activeTest.titleAr : activeTest.titleEn}
                  </span>
                  <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {isAr
                      ? `السؤال ${currentQuestionIndex + 1} من ${activeTest.questions.length}`
                      : `Question ${currentQuestionIndex + 1} of ${activeTest.questions.length}`}
                  </span>
                </div>

                <button
                  onClick={() => setActiveTest(null)}
                  className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                      : 'text-slate-400 hover:text-white bg-slate-800 border-slate-700'
                  }`}
                >
                  {isAr ? 'إلغاء والعودة' : 'Cancel & Exit'}
                </button>
              </div>

              {/* Progress Bar */}
              <div
                className={`w-full h-2.5 rounded-full overflow-hidden border ${
                  isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-rose-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentQuestionIndex + 1) / activeTest.questions.length) * 100}%`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Current Question Card */}
            {activeTest.questions[currentQuestionIndex] && (
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className={`border rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
                }`}
              >
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold border ${
                      isLight
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-slate-800 text-rose-300 border-slate-700'
                    }`}
                  >
                    {isAr
                      ? `البند رقم #${currentQuestionIndex + 1}`
                      : `Statement #${currentQuestionIndex + 1}`}
                  </span>
                  <h3
                    className={`text-lg sm:text-2xl font-bold leading-relaxed ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {isAr
                      ? activeTest.questions[currentQuestionIndex].textAr
                      : activeTest.questions[currentQuestionIndex].textEn}
                  </h3>
                </div>

                {/* 5-Point Likert Interactive Scale */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
                  {likertOptions.map((opt) => {
                    const isSelected =
                      answers[activeTest.questions[currentQuestionIndex].id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() =>
                          handleSelectAnswer(
                            activeTest.questions[currentQuestionIndex].id,
                            opt.value
                          )
                        }
                        className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-900/50 scale-[1.03]'
                            : isLight
                            ? `bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 ${opt.color}`
                            : `bg-slate-950/80 text-slate-300 border-slate-800 hover:bg-slate-800/80 ${opt.color}`
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                            isSelected
                              ? 'bg-black/25 text-white'
                              : isLight
                              ? 'bg-slate-200 text-slate-800'
                              : 'bg-black/30 text-slate-200'
                          }`}
                        >
                          {opt.value}
                        </span>
                        <span className="text-center">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Question Navigation footer */}
                <div
                  className={`flex items-center justify-between pt-4 border-t ${
                    isLight ? 'border-slate-200' : 'border-slate-800'
                  }`}
                >
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => {
                      soundManager.playTap();
                      setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
                    }}
                    className={`px-4 py-2 rounded-xl disabled:opacity-40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    <span>{isAr ? 'السؤال السابق' : 'Previous'}</span>
                  </button>

                  <span className="text-xs text-slate-500 font-mono">
                    {Math.round(((currentQuestionIndex + 1) / activeTest.questions.length) * 100)}%
                  </span>

                  <button
                    disabled={!answers[activeTest.questions[currentQuestionIndex].id]}
                    onClick={() => {
                      soundManager.playTap();
                      if (currentQuestionIndex < activeTest.questions.length - 1) {
                        setCurrentQuestionIndex((prev) => prev + 1);
                      } else {
                        calculateAndSaveResults(activeTest, answers);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-xs text-white font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>
                      {currentQuestionIndex === activeTest.questions.length - 1
                        ? isAr
                          ? 'إظهار النتيجة'
                          : 'View Results'
                        : isAr
                        ? 'التالي'
                        : 'Next'}
                    </span>
                    {isRTL ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* VIEW 3: Results & Scientific Disclaimer View */}
        {isCompleted && (
          <div className="space-y-8">
            {/* MBTI RESULT PRESENTATION */}
            {mbtiResult && (
              <div
                className={`border rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
                }`}
              >
                <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

                {/* Header badge & Archetype */}
                <div
                  className={`relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6 ${
                    isLight ? 'border-slate-200' : 'border-slate-800'
                  }`}
                >
                  <div>
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border mb-2 ${
                        isLight
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isAr ? 'نمطك النفسي المعتمد' : 'Your Validated Archetype'}</span>
                    </div>
                    <h2
                      className={`text-3xl sm:text-5xl font-black tracking-tight flex items-center gap-3 ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      <span>{mbtiResult.typeCode}</span>
                      <span className="text-xl sm:text-2xl font-bold text-rose-500">
                        {isAr ? mbtiResult.archetype.titleAr : mbtiResult.archetype.titleEn}
                      </span>
                    </h2>
                    <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {isAr ? mbtiResult.archetype.roleAr : mbtiResult.archetype.roleEn}
                    </p>
                  </div>

                  {/* Cloud status */}
                  <div
                    className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border ${
                      isLight
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>
                      {isSavingCloud
                        ? isAr
                          ? 'جاري الحفظ...'
                          : 'Saving...'
                        : cloudSaved || true
                        ? isAr
                          ? 'تم الحفظ سحابياً في ملفك'
                          : 'Saved to Cloud Dossier'
                        : ''}
                    </span>
                  </div>
                </div>

                {/* Description & Narrative */}
                <div className="space-y-4">
                  <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                    {isAr ? 'التحليل النفسي العام للنمط:' : 'Archetype Overview:'}
                  </h4>
                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      isLight ? 'text-slate-700' : 'text-slate-300'
                    }`}
                  >
                    {isAr ? mbtiResult.archetype.descriptionAr : mbtiResult.archetype.descriptionEn}
                  </p>
                </div>

                {/* 4 Polarities Percentage Bars */}
                <div className="space-y-4 pt-2">
                  <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                    {isAr ? 'توزيع الأبعاد القطبية الأربعة:' : 'Four Cognitive Dichotomies:'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* E vs I */}
                    <div
                      className={`p-4 rounded-2xl border space-y-2 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                      }`}
                    >
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-rose-500">
                          {isAr ? 'الانبساط (E)' : 'Extraversion (E)'} {mbtiResult.percentages.E}%
                        </span>
                        <span className="text-cyan-600">
                          {isAr ? 'الانطواء (I)' : 'Introversion (I)'} {mbtiResult.percentages.I}%
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                        <div className="bg-rose-500 h-full" style={{ width: `${mbtiResult.percentages.E}%` }} />
                        <div className="bg-cyan-500 h-full" style={{ width: `${mbtiResult.percentages.I}%` }} />
                      </div>
                    </div>

                    {/* S vs N */}
                    <div
                      className={`p-4 rounded-2xl border space-y-2 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                      }`}
                    >
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-amber-500">
                          {isAr ? 'الحسي (S)' : 'Sensing (S)'} {mbtiResult.percentages.S}%
                        </span>
                        <span className="text-purple-500">
                          {isAr ? 'الحدسي (N)' : 'Intuition (N)'} {mbtiResult.percentages.N}%
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                        <div className="bg-amber-500 h-full" style={{ width: `${mbtiResult.percentages.S}%` }} />
                        <div className="bg-purple-500 h-full" style={{ width: `${mbtiResult.percentages.N}%` }} />
                      </div>
                    </div>

                    {/* T vs F */}
                    <div
                      className={`p-4 rounded-2xl border space-y-2 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                      }`}
                    >
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-blue-500">
                          {isAr ? 'التفكير (T)' : 'Thinking (T)'} {mbtiResult.percentages.T}%
                        </span>
                        <span className="text-pink-500">
                          {isAr ? 'المشاعر (F)' : 'Feeling (F)'} {mbtiResult.percentages.F}%
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                        <div className="bg-blue-500 h-full" style={{ width: `${mbtiResult.percentages.T}%` }} />
                        <div className="bg-pink-500 h-full" style={{ width: `${mbtiResult.percentages.F}%` }} />
                      </div>
                    </div>

                    {/* J vs P */}
                    <div
                      className={`p-4 rounded-2xl border space-y-2 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                      }`}
                    >
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-emerald-500">
                          {isAr ? 'الحكم (J)' : 'Judging (J)'} {mbtiResult.percentages.J}%
                        </span>
                        <span className="text-orange-500">
                          {isAr ? 'الإدراك (P)' : 'Perceiving (P)'} {mbtiResult.percentages.P}%
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                        <div className="bg-emerald-500 h-full" style={{ width: `${mbtiResult.percentages.J}%` }} />
                        <div className="bg-orange-500 h-full" style={{ width: `${mbtiResult.percentages.P}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Strengths */}
                <div className="space-y-3">
                  <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-slate-200'}`}>
                    {isAr ? 'أبرز نقاط القوة السلوكية:' : 'Core Strengths:'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(isAr ? mbtiResult.archetype.strengthsAr : mbtiResult.archetype.strengthsEn).map(
                      (str, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold ${
                            isLight
                              ? 'bg-rose-50 border-rose-200 text-rose-700'
                              : 'bg-slate-950 border-slate-800 text-rose-300'
                          }`}
                        >
                          ✓ {str}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Relational Communication Style */}
                <div
                  className={`p-5 rounded-2xl border space-y-1.5 ${
                    isLight
                      ? 'bg-rose-50/80 border-rose-200 text-slate-800'
                      : 'bg-rose-500/10 border-rose-500/30 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 text-rose-500 text-xs font-bold">
                    <Heart className="w-4 h-4" />
                    <span>
                      {isAr
                        ? 'أسلوبك في التوافق والعلاقات الإنسانية:'
                        : 'Relational & Compatibility Style:'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {isAr
                      ? mbtiResult.archetype.relationalStyleAr
                      : mbtiResult.archetype.relationalStyleEn}
                  </p>
                </div>
              </div>
            )}

            {/* BIG FIVE RESULT PRESENTATION */}
            {bigFiveResult && (
              <div
                className={`border rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl ${
                  isLight ? 'bg-white border-slate-200' : 'bg-slate-900/90 border-slate-800'
                }`}
              >
                <div
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6 ${
                    isLight ? 'border-slate-200' : 'border-slate-800'
                  }`}
                >
                  <div>
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border mb-2 ${
                        isLight
                          ? 'bg-purple-50 text-purple-700 border-purple-200'
                          : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>
                        {isAr ? 'التقرير السيكومتري الخماسي' : 'Big Five Psychometric Profile'}
                      </span>
                    </div>
                    <h2
                      className={`text-2xl sm:text-4xl font-black tracking-tight ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {isAr ? 'مصفوفة العوامل الخمسة الكبرى (OCEAN)' : 'OCEAN Dimension Matrix'}
                    </h2>
                  </div>

                  <div
                    className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border ${
                      isLight
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? 'تم الحفظ سحابياً في ملفك' : 'Saved to Cloud Dossier'}</span>
                  </div>
                </div>

                {/* 5 Trait Progress Scales */}
                <div className="space-y-5">
                  {[
                    {
                      key: 'O',
                      titleAr: '1. الانفتاح على الخبرة (Openness)',
                      titleEn: '1. Openness to Experience',
                      descAr:
                        'يعكس الفضول المعرفي، التذوق الجمالي، والاهتمام بالأفكار غير التقليدية والابتكار.',
                      descEn:
                        'Reflects intellectual curiosity, appreciation for art, and interest in novel experiences.',
                      score: bigFiveResult.scores.O,
                      barClass: 'bg-purple-500',
                      textClass: 'text-purple-500',
                    },
                    {
                      key: 'C',
                      titleAr: '2. يقظة الضمير والانضباط (Conscientiousness)',
                      titleEn: '2. Conscientiousness',
                      descAr:
                        'يعكس قوة الإرادة، التنظيم الذاتي، الالتزام بالواجبات، ودقة المواعيد والمسؤولية.',
                      descEn:
                        'Reflects self-discipline, organization, goal-oriented persistence, and reliability.',
                      score: bigFiveResult.scores.C,
                      barClass: 'bg-emerald-500',
                      textClass: 'text-emerald-500',
                    },
                    {
                      key: 'E',
                      titleAr: '3. الانبساطية والاجتماعية (Extraversion)',
                      titleEn: '3. Extraversion',
                      descAr:
                        'يعكس الحيوية الاجتماعية، الرغبة في التفاعل، الحزم في التعبير، والميل للبهجة.',
                      descEn:
                        'Reflects social vitality, enthusiasm, assertiveness, and desire for active interaction.',
                      score: bigFiveResult.scores.E,
                      barClass: 'bg-rose-500',
                      textClass: 'text-rose-500',
                    },
                    {
                      key: 'A',
                      titleAr: '4. الوفاق والتعاون (Agreeableness)',
                      titleEn: '4. Agreeableness',
                      descAr:
                        'يعكس التعاطف الإنساني، التسامح، كرم المشاعر، والحرص على الانسجام وتجنب الصدامات.',
                      descEn:
                        'Reflects interpersonal compassion, altruism, cooperativeness, and desire for harmony.',
                      score: bigFiveResult.scores.A,
                      barClass: 'bg-cyan-500',
                      textClass: 'text-cyan-500',
                    },
                    {
                      key: 'ES',
                      titleAr: '5. الاتزان الانفعالي والصلابة (Emotional Stability)',
                      titleEn: '5. Emotional Stability',
                      descAr:
                        'يعكس القدرة على امتصاص الضغوط والأزمات، الهدوء الذهني، والتعافي من الإحباطات.',
                      descEn:
                        'Reflects composure under stress, emotional resilience, and calm cognitive balance.',
                      score: bigFiveResult.scores.ES,
                      barClass: 'bg-blue-500',
                      textClass: 'text-blue-500',
                    },
                  ].map((trait) => (
                    <div
                      key={trait.key}
                      className={`p-5 rounded-2xl border space-y-2 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center text-sm font-bold">
                        <span className={trait.textClass}>
                          {isAr ? trait.titleAr : trait.titleEn}
                        </span>
                        <span className={`font-mono ${trait.textClass}`}>{trait.score}%</span>
                      </div>
                      <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {isAr ? trait.descAr : trait.descEn}
                      </p>
                      <div
                        className={`w-full h-2.5 rounded-full overflow-hidden ${
                          isLight ? 'bg-slate-200' : 'bg-slate-900'
                        }`}
                      >
                        <div
                          className={`${trait.barClass} h-full rounded-full`}
                          style={{ width: `${trait.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MANDATORY SCIENTIFIC DISCLAIMER AT END OF TEST */}
            <div
              className={`rounded-3xl border p-6 sm:p-8 space-y-3 shadow-xl ${
                isLight
                  ? 'bg-amber-50 border-amber-200 text-amber-950'
                  : 'bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border-amber-500/40 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5 text-amber-500 font-bold text-sm">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>
                  {isAr
                    ? 'إخلاء مسؤولية علمي واستشاري إلزامي:'
                    : 'Mandatory Scientific & Educational Disclaimer:'}
                </span>
              </div>
              <p className="text-xs leading-relaxed">
                {isAr
                  ? 'هذا التقرير السيكومتري مُعد حصراً لأغراض التثقيف الذاتي، وتعميق الوعي الشخصي، والتأمل المعرفي. هذه النتائج لا تمثل تشخيصاً نفسياً أو عيادياً أو طبياً، ولا تعد بديلاً عن جلسات الإرشاد النفسي أو الأسري المرخصة. الشخصية الإنسانية كائن ديناميكي مرن يتطور بالخبرة والنضج ولا يمكن اختزاله في قالب جامد أو نسبة قطعية.'
                  : 'This psychometric report is provided solely for educational self-reflection, mindfulness, and personal growth. It does not constitute a clinical psychological, psychiatric, or medical diagnosis, nor is it a substitute for certified counseling. Human personality is dynamic and continually evolves with experience beyond singular rigid labels.'}
              </p>
            </div>

            {/* Actions: Retest or Return */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  soundManager.playTap();
                  setActiveTest(null);
                  setIsCompleted(false);
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer ${
                  isLight
                    ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <RefreshCw className="w-4 h-4 text-rose-500" />
                <span>{isAr ? 'استكشاف مقياس آخر' : 'Explore Another Test'}</span>
              </button>

              <button
                onClick={handleShareResult}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer"
              >
                {copiedShare ? (
                  <Check className="w-4 h-4 text-emerald-300" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
                <span>
                  {copiedShare
                    ? isAr
                      ? 'تم نسخ الرابط'
                      : 'Link Copied'
                    : isAr
                    ? 'مشاركة النتيجة'
                    : 'Share Result'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* PERMANENT BOTTOM ACADEMIC CONCLUSION & APA 7th ED. REFERENCES (Always visible in DOM for Mediapartners-Google) */}
        <PsychometricAcademicConclusion variant="page" />
      </div>

      {/* Embedded Intelligence & Psychometric Modals */}
      {isIntelligenceModalOpen && (
        <IntelligenceTestModal
          isOpen={isIntelligenceModalOpen}
          onClose={() => setIsIntelligenceModalOpen(false)}
        />
      )}
      {isPsychModalOpen && (
        <PsychologyTestsModal
          isOpen={isPsychModalOpen}
          onClose={() => setIsPsychModalOpen(false)}
        />
      )}
    </div>
  );
};
