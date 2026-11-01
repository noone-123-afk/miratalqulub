import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Compass,
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
  BarChart3,
  Heart,
  BookOpen,
  CloudCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { soundManager } from '../utils/sound';
import { PageSEO } from '../components/PageSEO';
import {
  PERSONALITY_TESTS_CATALOG,
  PersonalityTestMeta,
  PersonalityTestId,
  MBTI_ARCHETYPES_INFO,
} from '../data/personalityTestsData';
import { saveUnifiedTestRecord } from '../services/userHistoryService';

interface Props {
  onBackToHome: () => void;
  onNavigatePage?: (page: string) => void;
}

export const PersonalityTestsPage: React.FC<Props> = ({ onBackToHome, onNavigatePage }) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const { user } = useAuth();
  const isAr = language === 'ar';

  // State: 'catalog' | 'test' | 'result'
  const [activeTest, setActiveTest] = useState<PersonalityTestMeta | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // questionId -> value (1 to 5)
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSavingCloud, setIsSavingCloud] = useState(false);
  const [cloudSaved, setCloudSaved] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

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

    if (activeTest) {
      if (currentQuestionIndex < activeTest.questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex((prev) => prev + 1);
        }, 180);
      } else {
        // All answered! Calculate results
        calculateAndSaveResults(activeTest, updated);
      }
    }
  };

  const calculateAndSaveResults = async (test: PersonalityTestMeta, allAnswers: Record<number, number>) => {
    setIsSavingCloud(true);

    if (test.id === 'mbti_16types') {
      // Calculate E/I, S/N, T/F, J/P scores
      let scoreE = 0, countE = 0;
      let scoreS = 0, countS = 0;
      let scoreT = 0, countT = 0;
      let scoreJ = 0, countJ = 0;

      test.questions.forEach((q) => {
        const val = allAnswers[q.id] || 3;
        if (q.dimension === 'EI') {
          countE += 1;
          scoreE += q.positivePole === 'E' ? val : 6 - val;
        } else if (q.dimension === 'SN') {
          countS += 1;
          scoreS += q.positivePole === 'S' ? val : 6 - val;
        } else if (q.dimension === 'TF') {
          countT += 1;
          scoreT += q.positivePole === 'T' ? val : 6 - val;
        } else if (q.dimension === 'JP') {
          countJ += 1;
          scoreJ += q.positivePole === 'J' ? val : 6 - val;
        }
      });

      const avgE = scoreE / (countE * 5);
      const avgS = scoreS / (countS * 5);
      const avgT = scoreT / (countT * 5);
      const avgJ = scoreJ / (countJ * 5);

      const codeE = avgE >= 0.5 ? 'E' : 'I';
      const codeS = avgS >= 0.5 ? 'S' : 'N';
      const codeT = avgT >= 0.5 ? 'T' : 'F';
      const codeJ = avgJ >= 0.5 ? 'J' : 'P';
      const typeCode = `${codeE}${codeS}${codeT}${codeJ}`;

      const archetype = MBTI_ARCHETYPES_INFO[typeCode] || MBTI_ARCHETYPES_INFO['INTJ'];

      const percentages = {
        E: Math.round(avgE * 100),
        I: Math.round((1 - avgE) * 100),
        S: Math.round(avgS * 100),
        N: Math.round((1 - avgS) * 100),
        T: Math.round(avgT * 100),
        F: Math.round((1 - avgT) * 100),
        J: Math.round(avgJ * 100),
        P: Math.round((1 - avgJ) * 100),
      };

      setMbtiResult({ typeCode, archetype, percentages });
      setIsCompleted(true);

      // Persist to Cloud Database (Firestore) + LocalStorage
      try {
        await saveUnifiedTestRecord(user || null, {
          testType: 'psychology',
          testTitleAr: `نمط مايرز-بريغز: ${typeCode} (${archetype.titleAr})`,
          testCategoryAr: 'مقاييس الشخصية المعتمدة',
          scoreOrArchetype: typeCode,
          percentage: 95,
          badgeColor: '#e11d48',
          keyInsights: archetype.strengthsAr.slice(0, 3),
          snapshot: { typeCode, archetype, percentages, timestamp: new Date().toISOString() },
        });
        setCloudSaved(true);
      } catch (e) {
        console.warn('Cloud save fallback', e);
      } finally {
        setIsSavingCloud(false);
      }
    } else if (test.id === 'big_five_ocean') {
      let scoreO = 0, countO = 0;
      let scoreC = 0, countC = 0;
      let scoreE = 0, countE = 0;
      let scoreA = 0, countA = 0;
      let scoreES = 0, countES = 0;

      test.questions.forEach((q) => {
        const val = allAnswers[q.id] || 3;
        if (q.dimension === 'O') {
          countO++;
          scoreO += val;
        } else if (q.dimension === 'C') {
          countC++;
          scoreC += val;
        } else if (q.dimension === 'E') {
          countE++;
          scoreE += val;
        } else if (q.dimension === 'A') {
          countA++;
          scoreA += val;
        } else if (q.dimension === 'N') {
          countES++;
          scoreES += q.positivePole === 'ES' ? val : 6 - val;
        }
      });

      const scores = {
        O: Math.round((scoreO / (countO * 5)) * 100),
        C: Math.round((scoreC / (countC * 5)) * 100),
        E: Math.round((scoreE / (countE * 5)) * 100),
        A: Math.round((scoreA / (countA * 5)) * 100),
        ES: Math.round((scoreES / (countES * 5)) * 100),
      };

      setBigFiveResult({ scores });
      setIsCompleted(true);

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

  return (
    <div className="w-full min-h-screen text-slate-100 py-6 sm:py-10 px-3 sm:px-6 selection:bg-rose-500/30 selection:text-rose-200">
      <PageSEO
        title={
          isAr
            ? 'مختبر مقاييس الشخصية المعتمدة (MBTI & Big Five) | مرآة القلوب'
            : 'Certified Personality Assessments (MBTI & Big Five) | Mirror of Hearts'
        }
        description={
          isAr
            ? 'اختر من مقاييس علم النفس المعتمدة: مؤشر مايرز-بريغز للأنماط الـ16 ونموذج العوامل الخمسة الكبرى (OCEAN) مع واجهة تفاعلية، حفظ سحابي، وإخلاء مسؤولية علمي.'
            : 'Explore certified psychometric assessments: Myers-Briggs 16 Types (MBTI) and Big Five (OCEAN) traits with real-time cloud saving and scientific disclaimers.'
        }
        canonicalPath="/#/personality-tests"
        language={language}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Breadcrumb & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={onBackToHome}
              className="hover:text-rose-400 transition cursor-pointer flex items-center gap-1 font-semibold"
            >
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            </button>
            <span>/</span>
            <span className="text-white font-bold">
              {isAr ? 'مختبر مقاييس الشخصية المعتمدة' : 'Certified Personality Lab'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-sky-300 transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>

            <button
              onClick={onBackToHome}
              className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-xs font-bold text-rose-300 transition flex items-center gap-1 cursor-pointer"
            >
              {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: Assessments Catalog */}
        {!activeTest && (
          <div className="space-y-8">
            <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950/40 via-slate-900/90 to-purple-950/40 border border-rose-500/30 p-8 sm:p-12 shadow-2xl">
              <div className="relative z-10 max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  <Brain className="w-4 h-4" />
                  <span>{isAr ? 'المقاييس النفسية العالمية المعتمدة' : 'Gold Standard Psychometric Inventories'}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {isAr ? 'مختبر استكشاف الشخصية والأبعاد السلوكية' : 'Personality Archetypes & Behavioral Matrix'}
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {isAr
                    ? 'اختر أحد المقاييس العالمية الرصينة لفهم آليات تفكيرك، ونقاط قوتك الفطرية، وطبيعة تفاعلك في العلاقات الإنسانية مع حفظ سحابي مشفر لنتائجك.'
                    : 'Select a validated psychometric inventory to uncover your cognitive wiring, natural strengths, and relational communication styles with cloud persistence.'}
                </p>
              </div>
            </header>

            {/* Assessment Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PERSONALITY_TESTS_CATALOG.map((test) => (
                <div
                  key={test.id}
                  className="bg-slate-900/70 border border-slate-800 hover:border-rose-500/50 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-rose-950/30 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full text-white border"
                        style={{ backgroundColor: `${test.badgeColor}25`, borderColor: `${test.badgeColor}60` }}
                      >
                        {isAr ? test.badgeAr : test.badgeEn}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{test.estimatedMinutes} {isAr ? 'دقائق' : 'mins'}</span>
                      </span>
                    </div>

                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-rose-300 transition-colors">
                        {isAr ? test.titleAr : test.titleEn}
                      </h2>
                      <p className="text-xs text-rose-400/90 font-medium mt-1">
                        {isAr ? test.subtitleAr : test.subtitleEn}
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isAr ? test.shortDescriptionAr : test.shortDescriptionEn}
                    </p>

                    {/* Scientific origin tag */}
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <span className="text-slate-500 block text-[10px]">{isAr ? 'المرجعية الأكاديمية:' : 'Academic Reference:'}</span>
                        <span className="text-slate-300 font-semibold">{isAr ? test.scientificOriginAr : test.scientificOriginEn}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartTest(test)}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-sm transition-all shadow-lg shadow-rose-950 flex items-center justify-center gap-2"
                  >
                    <span>{isAr ? 'ابدأ الاختبار الآن' : 'Start Assessment'}</span>
                    {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: Active Test Runner */}
        {activeTest && !isCompleted && (
          <div className="space-y-6">
            {/* Header with Progress Bar */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-rose-400 font-bold block">
                    {isAr ? activeTest.titleAr : activeTest.titleEn}
                  </span>
                  <span className="text-xs text-slate-400">
                    {isAr
                      ? `السؤال ${currentQuestionIndex + 1} من ${activeTest.questions.length}`
                      : `Question ${currentQuestionIndex + 1} of ${activeTest.questions.length}`}
                  </span>
                </div>

                <button
                  onClick={() => setActiveTest(null)}
                  className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700"
                >
                  {isAr ? 'إلغاء والعودة' : 'Cancel & Exit'}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
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
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl"
              >
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                  <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-rose-300 border border-slate-700">
                    {isAr ? `البند رقم #${currentQuestionIndex + 1}` : `Statement #${currentQuestionIndex + 1}`}
                  </span>
                  <h3 className="text-lg sm:text-2xl font-bold text-white leading-relaxed">
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
                            : `bg-slate-950/80 text-slate-300 border-slate-800 hover:bg-slate-800/80 ${opt.color}`
                        }`}
                      >
                        <span className="w-7 h-7 rounded-full bg-black/30 flex items-center justify-center text-xs font-mono font-bold">
                          {opt.value}
                        </span>
                        <span className="text-center">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Question Navigation footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => {
                      soundManager.playTap();
                      setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs text-slate-300 font-semibold flex items-center gap-1.5"
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
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-xs text-white font-semibold flex items-center gap-1.5"
                  >
                    <span>{currentQuestionIndex === activeTest.questions.length - 1 ? (isAr ? 'إظهار النتيجة' : 'View Results') : (isAr ? 'التالي' : 'Next')}</span>
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
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

                {/* Header badge & Archetype */}
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isAr ? 'نمطك النفسي المعتمد' : 'Your Validated Archetype'}</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center gap-3">
                      <span>{mbtiResult.typeCode}</span>
                      <span className="text-xl sm:text-2xl font-bold text-rose-400">
                        {isAr ? mbtiResult.archetype.titleAr : mbtiResult.archetype.titleEn}
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      {isAr ? mbtiResult.archetype.roleAr : mbtiResult.archetype.roleEn}
                    </p>
                  </div>

                  {/* Cloud status */}
                  <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isAr ? 'تم الحفظ سحابياً في ملفك' : 'Saved to Cloud Dossier'}</span>
                  </div>
                </div>

                {/* Description & Narrative */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">{isAr ? 'التحليل النفسي العام للنمط:' : 'Archetype Overview:'}</h4>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {isAr ? mbtiResult.archetype.descriptionAr : mbtiResult.archetype.descriptionEn}
                  </p>
                </div>

                {/* 4 Polarities Percentage Bars */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-sm font-bold text-slate-200">{isAr ? 'توزيع الأبعاد القطبية الأربعة:' : 'Four Cognitive Dichotomies:'}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* E vs I */}
                    <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-rose-300">{isAr ? 'الانبساط (E)' : 'Extraversion (E)'} {mbtiResult.percentages.E}%</span>
                        <span className="text-cyan-300">{isAr ? 'الانطواء (I)' : 'Introversion (I)'} {mbtiResult.percentages.I}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden flex">
                        <div className="bg-rose-500 h-full" style={{ width: `${mbtiResult.percentages.E}%` }} />
                        <div className="bg-cyan-500 h-full" style={{ width: `${mbtiResult.percentages.I}%` }} />
                      </div>
                    </div>

                    {/* S vs N */}
                    <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-amber-300">{isAr ? 'الحسي (S)' : 'Sensing (S)'} {mbtiResult.percentages.S}%</span>
                        <span className="text-purple-300">{isAr ? 'الحدسي (N)' : 'Intuition (N)'} {mbtiResult.percentages.N}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden flex">
                        <div className="bg-amber-500 h-full" style={{ width: `${mbtiResult.percentages.S}%` }} />
                        <div className="bg-purple-500 h-full" style={{ width: `${mbtiResult.percentages.N}%` }} />
                      </div>
                    </div>

                    {/* T vs F */}
                    <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-blue-300">{isAr ? 'التفكير (T)' : 'Thinking (T)'} {mbtiResult.percentages.T}%</span>
                        <span className="text-pink-300">{isAr ? 'المشاعر (F)' : 'Feeling (F)'} {mbtiResult.percentages.F}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden flex">
                        <div className="bg-blue-500 h-full" style={{ width: `${mbtiResult.percentages.T}%` }} />
                        <div className="bg-pink-500 h-full" style={{ width: `${mbtiResult.percentages.F}%` }} />
                      </div>
                    </div>

                    {/* J vs P */}
                    <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-emerald-300">{isAr ? 'الحكم (J)' : 'Judging (J)'} {mbtiResult.percentages.J}%</span>
                        <span className="text-orange-300">{isAr ? 'الإدراك (P)' : 'Perceiving (P)'} {mbtiResult.percentages.P}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden flex">
                        <div className="bg-emerald-500 h-full" style={{ width: `${mbtiResult.percentages.J}%` }} />
                        <div className="bg-orange-500 h-full" style={{ width: `${mbtiResult.percentages.P}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Strengths */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-200">{isAr ? 'أبرز نقاط القوة السلوكية:' : 'Core Strengths:'}</h4>
                  <div className="flex flex-wrap gap-2">
                    {(isAr ? mbtiResult.archetype.strengthsAr : mbtiResult.archetype.strengthsEn).map((str, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-rose-300"
                      >
                        ✓ {str}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Relational Communication Style */}
                <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                    <Heart className="w-4 h-4" />
                    <span>{isAr ? 'أسلوبك في التوافق والعلاقات الإنسانية:' : 'Relational & Compatibility Style:'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {isAr ? mbtiResult.archetype.relationalStyleAr : mbtiResult.archetype.relationalStyleEn}
                  </p>
                </div>
              </div>
            )}

            {/* BIG FIVE RESULT PRESENTATION */}
            {bigFiveResult && (
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 mb-2">
                      <Award className="w-3.5 h-3.5" />
                      <span>{isAr ? 'التقرير السيكومتري الخماسي' : 'Big Five Psychometric Profile'}</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                      {isAr ? 'مصفوفة العوامل الخمسة الكبرى (OCEAN)' : 'OCEAN Dimension Matrix'}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isAr ? 'تم الحفظ سحابياً في ملفك' : 'Saved to Cloud Dossier'}</span>
                  </div>
                </div>

                {/* 5 Trait Progress Scales */}
                <div className="space-y-5">
                  {/* Openness */}
                  <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-purple-300">{isAr ? '1. الانفتاح على الخبرة (Openness)' : '1. Openness to Experience'}</span>
                      <span className="font-mono text-purple-400">{bigFiveResult.scores.O}%</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {isAr
                        ? 'يعكس الفضول المعرفي، التذوق الجمالي، والاهتمام بالأفكار غير التقليدية والابتكار.'
                        : 'Reflects intellectual curiosity, appreciation for art, and interest in novel experiences.'}
                    </p>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: `${bigFiveResult.scores.O}%` }} />
                    </div>
                  </div>

                  {/* Conscientiousness */}
                  <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-emerald-300">{isAr ? '2. يقظة الضمير والانضباط (Conscientiousness)' : '2. Conscientiousness'}</span>
                      <span className="font-mono text-emerald-400">{bigFiveResult.scores.C}%</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {isAr
                        ? 'يعكس قوة الإرادة، التنظيم الذاتي، الالتزام بالواجبات، ودقة المواعيد والمسؤولية.'
                        : 'Reflects self-discipline, organization, goal-oriented persistence, and reliability.'}
                    </p>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${bigFiveResult.scores.C}%` }} />
                    </div>
                  </div>

                  {/* Extraversion */}
                  <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-rose-300">{isAr ? '3. الانبساطية والاجتماعية (Extraversion)' : '3. Extraversion'}</span>
                      <span className="font-mono text-rose-400">{bigFiveResult.scores.E}%</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {isAr
                        ? 'يعكس الحيوية الاجتماعية، الرغبة في التفاعل، الحزم في التعبير، والميل للبهجة.'
                        : 'Reflects social vitality, enthusiasm, assertiveness, and desire for active interaction.'}
                    </p>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full rounded-full" style={{ width: `${bigFiveResult.scores.E}%` }} />
                    </div>
                  </div>

                  {/* Agreeableness */}
                  <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-cyan-300">{isAr ? '4. الوفاق والتعاون (Agreeableness)' : '4. Agreeableness'}</span>
                      <span className="font-mono text-cyan-400">{bigFiveResult.scores.A}%</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {isAr
                        ? 'يعكس التعاطف الإنساني، التسامح، كرم المشاعر، والحرص على الانسجام وتجنب الصدامات.'
                        : 'Reflects interpersonal compassion, altruism, cooperativeness, and desire for harmony.'}
                    </p>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${bigFiveResult.scores.A}%` }} />
                    </div>
                  </div>

                  {/* Emotional Stability */}
                  <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-sm font-bold">
                      <span className="text-blue-300">{isAr ? '5. الاتزان الانفعالي والصلابة (Emotional Stability)' : '5. Emotional Stability'}</span>
                      <span className="font-mono text-blue-400">{bigFiveResult.scores.ES}%</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {isAr
                        ? 'يعكس القدرة على امتصاص الضغوط والأزمات، الهدوء الذهني، والتعافي من الإحباطات.'
                        : 'Reflects composure under stress, emotional resilience, and calm cognitive balance.'}
                    </p>
                    <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${bigFiveResult.scores.ES}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MANDATORY SCIENTIFIC DISCLAIMER AT END OF TEST (Required by User) */}
            <div className="rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border border-amber-500/40 p-6 sm:p-8 space-y-3 shadow-xl">
              <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>{isAr ? 'إخلاء مسؤولية علمي واستشاري إلزامي:' : 'Mandatory Scientific & Educational Disclaimer:'}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
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
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-rose-400" />
                <span>{isAr ? 'استكشاف مقياس آخر' : 'Explore Another Test'}</span>
              </button>

              <button
                onClick={handleShareResult}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-rose-950"
              >
                {copiedShare ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedShare ? (isAr ? 'تم نسخ الرابط' : 'Link Copied') : (isAr ? 'مشاركة النتيجة' : 'Share Result')}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
