import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  RotateCcw,
  Share2,
  Download,
  UserCheck,
  Award,
  Target,
  BookOpen,
  Briefcase,
  AlertTriangle,
  Lightbulb,
  Check,
  Layers,
  CheckCircle2,
  FileText,
  ListChecks,
  HelpCircle,
} from 'lucide-react';
import {
  IntelligenceBatteryType,
  INTELLIGENCE_BATTERIES_CATALOG,
  IntelligenceCategory,
  INTELLIGENCE_CATEGORIES,
  INTELLIGENCE_QUESTIONS,
  LIKERT_OPTIONS,
  calculateIntelligenceResults,
  IntelligenceTestResult,
  getQuestionsForBattery,
  calculateObjectiveBatteryResult,
  ObjectiveBatteryResult,
} from '../data/intelligenceTestData';
import { IntelligenceRadarChart } from './IntelligenceRadarChart';
import { ViralShareModal } from './ViralShareModal';
import { soundManager } from '../utils/sound';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { db, doc, setDoc } from '../firebase';
import { saveUnifiedTestRecord } from '../services/userHistoryService';
import {
  exportPsychometricReportAsPDF,
  generateExecutiveSummary,
} from '../utils/pdfReportGenerator';
import {
  PsychometricAcademicIntro,
  PsychometricAcademicConclusion,
  ScientificClinicalDisclaimerBanner,
} from './PsychometricAcademicFraming';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaveResultToProfile?: (result: IntelligenceTestResult) => void;
}

type StepMode = 'welcome' | 'instructions' | 'test' | 'results';
type RunnerViewMode = 'paged_5' | 'single_1' | 'all_list';

const STORAGE_RESULT_KEY = 'mirat_intelligence_test_result';
const STORAGE_ANSWERS_KEY = 'mirat_intelligence_test_answers';
const STORAGE_OBJ_ANSWERS_KEY = 'mirat_intelligence_obj_answers_';
const STORAGE_OBJ_RESULT_KEY = 'mirat_intelligence_obj_result_';

export const IntelligenceTestModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSaveResultToProfile,
}) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { theme } = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';
  const questionScrollRef = useRef<HTMLDivElement | null>(null);

  // Test setup
  const [step, setStep] = useState<StepMode>('welcome');
  const [activeBattery, setActiveBattery] = useState<IntelligenceBatteryType>('multiple_intelligences');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [ageGroup, setAgeGroup] = useState<string>('18-29');
  const [runnerViewMode, setRunnerViewMode] = useState<RunnerViewMode>('paged_5');

  // Answers for Multiple Intelligences (Likert 1..5)
  const [answers, setAnswers] = useState<Record<string, number>>({});
  // Answers for Objective Batteries (IQ, EQ, CogAT: questionId -> optionId)
  const [objAnswers, setObjAnswers] = useState<Record<string, string>>({});

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [activeCategoryDetail, setActiveCategoryDetail] = useState<IntelligenceCategory | null>(null);
  const [unansweredWarning, setUnansweredWarning] = useState<boolean>(false);

  // Question audit filter on Objective Results screen
  const [showQuestionAudit, setShowQuestionAudit] = useState<boolean>(true);
  const [auditFilter, setAuditFilter] = useState<'all' | 'correct' | 'incorrect'>('all');

  // Timer
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(1500);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  // Final Results
  const [testResult, setTestResult] = useState<IntelligenceTestResult | null>(null);
  const [objResult, setObjResult] = useState<ObjectiveBatteryResult | null>(null);
  const [isSavedToProfile, setIsSavedToProfile] = useState<boolean>(false);
  const [isViralShareOpen, setIsViralShareOpen] = useState<boolean>(false);

  // Load saved answers or existing test result on mount
  useEffect(() => {
    try {
      const savedRes = localStorage.getItem(STORAGE_RESULT_KEY);
      if (savedRes) {
        setTestResult(JSON.parse(savedRes));
      }
      const savedAns = localStorage.getItem(STORAGE_ANSWERS_KEY);
      if (savedAns) {
        setAnswers(JSON.parse(savedAns));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Load objective battery saved progress when switching battery
  useEffect(() => {
    if (activeBattery !== 'multiple_intelligences') {
      try {
        const savedObjAns = localStorage.getItem(`${STORAGE_OBJ_ANSWERS_KEY}${activeBattery}`);
        if (savedObjAns) {
          setObjAnswers(JSON.parse(savedObjAns));
        } else {
          setObjAnswers({});
        }
        const savedObjRes = localStorage.getItem(`${STORAGE_OBJ_RESULT_KEY}${activeBattery}`);
        if (savedObjRes) {
          setObjResult(JSON.parse(savedObjRes));
        } else {
          setObjResult(null);
        }
      } catch {
        setObjAnswers({});
      }
    }
  }, [activeBattery]);

  // Auto-scroll to top of question container whenever page or view mode changes
  useEffect(() => {
    if (step === 'test' && questionScrollRef.current) {
      questionScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, runnerViewMode, step]);

  // Timer countdown & elapsed tracking when taking test
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isTimerActive && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds((prev) => (prev > 0 ? prev - 1 : 0));
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeftSeconds]);

  if (!isOpen) return null;

  const currentBatteryMeta =
    INTELLIGENCE_BATTERIES_CATALOG.find((b) => b.id === activeBattery) ||
    INTELLIGENCE_BATTERIES_CATALOG[0];

  const isMultipleIntelligences = activeBattery === 'multiple_intelligences';
  const activeMIQuestions = INTELLIGENCE_QUESTIONS;
  const activeObjQuestions = !isMultipleIntelligences
    ? getQuestionsForBattery(activeBattery)
    : [];

  const totalQuestionsCount = isMultipleIntelligences
    ? activeMIQuestions.length
    : activeObjQuestions.length;

  const questionsPerPage =
    runnerViewMode === 'all_list'
      ? totalQuestionsCount
      : runnerViewMode === 'single_1'
      ? 1
      : 5;

  const totalPages = Math.max(1, Math.ceil(totalQuestionsCount / questionsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages - 1);

  const currentMIQuestionsPage = isMultipleIntelligences
    ? activeMIQuestions.slice(
        safeCurrentPage * questionsPerPage,
        (safeCurrentPage + 1) * questionsPerPage
      )
    : [];

  const currentObjQuestionsPage = !isMultipleIntelligences
    ? activeObjQuestions.slice(
        safeCurrentPage * questionsPerPage,
        (safeCurrentPage + 1) * questionsPerPage
      )
    : [];

  const answeredCount = isMultipleIntelligences
    ? activeMIQuestions.filter((q) => answers[q.id] !== undefined).length
    : activeObjQuestions.filter((q) => objAnswers[q.id] !== undefined).length;

  const remainingCount = Math.max(0, totalQuestionsCount - answeredCount);
  const progressPercent = Math.round((answeredCount / Math.max(1, totalQuestionsCount)) * 100);

  // Handlers
  const handleSelectBattery = (battery: IntelligenceBatteryType) => {
    soundManager.playTap();
    setActiveBattery(battery);
    setUnansweredWarning(false);
    setStep('instructions');
  };

  const handleOpenSavedBatteryResult = (
    e: React.MouseEvent,
    battery: IntelligenceBatteryType
  ) => {
    e.stopPropagation();
    soundManager.playTap();
    setActiveBattery(battery);
    setUnansweredWarning(false);

    if (battery === 'multiple_intelligences') {
      if (testResult) {
        setActiveCategoryDetail(testResult.primaryIntelligence);
        setStep('results');
      }
    } else {
      try {
        const raw = localStorage.getItem(`${STORAGE_OBJ_RESULT_KEY}${battery}`);
        if (raw) {
          const parsed: ObjectiveBatteryResult = JSON.parse(raw);
          setObjResult(parsed);
          setStep('results');
        }
      } catch {}
    }
  };

  const handleDirectPDFForBattery = (
    e: React.MouseEvent,
    battery: IntelligenceBatteryType
  ) => {
    e.stopPropagation();
    soundManager.playTap();
    if (battery === 'multiple_intelligences' && testResult) {
      triggerMIPDFExport(testResult);
    } else if (battery !== 'multiple_intelligences') {
      try {
        const raw = localStorage.getItem(`${STORAGE_OBJ_RESULT_KEY}${battery}`);
        if (raw) {
          const parsed: ObjectiveBatteryResult = JSON.parse(raw);
          const meta =
            INTELLIGENCE_BATTERIES_CATALOG.find((b) => b.id === battery) ||
            INTELLIGENCE_BATTERIES_CATALOG[1];
          triggerObjectivePDFExport(parsed, meta);
        }
      } catch {}
    }
  };

  const handleStartTest = () => {
    soundManager.playTap();
    setCurrentPage(0);
    setUnansweredWarning(false);
    setElapsedSeconds(0);
    setTimeLeftSeconds(currentBatteryMeta.recommendedMinutes * 60);
    setIsTimerActive(true);
    setStep('test');
  };

  const handleResetBatteryAnswers = () => {
    soundManager.playTap();
    setUnansweredWarning(false);
    if (isMultipleIntelligences) {
      setAnswers({});
      try {
        localStorage.removeItem(STORAGE_ANSWERS_KEY);
      } catch {}
    } else {
      setObjAnswers({});
      try {
        localStorage.removeItem(`${STORAGE_OBJ_ANSWERS_KEY}${activeBattery}`);
      } catch {}
    }
    setCurrentPage(0);
  };

  const handleSelectMIAnswer = (questionId: string, val: number) => {
    soundManager.playTap();
    const updated = { ...answers, [questionId]: val };
    setAnswers(updated);
    if (unansweredWarning) setUnansweredWarning(false);
    try {
      localStorage.setItem(STORAGE_ANSWERS_KEY, JSON.stringify(updated));
    } catch {}
  };

  const handleSelectObjAnswer = (questionId: string, optionId: string) => {
    soundManager.playTap();
    const updated = { ...objAnswers, [questionId]: optionId };
    setObjAnswers(updated);
    if (unansweredWarning) setUnansweredWarning(false);
    try {
      localStorage.setItem(`${STORAGE_OBJ_ANSWERS_KEY}${activeBattery}`, JSON.stringify(updated));
    } catch {}
  };

  const handleSwitchViewMode = (mode: RunnerViewMode) => {
    soundManager.playTap();
    setRunnerViewMode(mode);
    setCurrentPage(0);
  };

  const handleJumpToQuestionIndex = (zeroBasedQuestionIndex: number) => {
    soundManager.playTap();
    if (runnerViewMode === 'all_list') {
      const el = document.getElementById(`intel-q-card-${zeroBasedQuestionIndex + 1}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      const targetPage = Math.floor(zeroBasedQuestionIndex / questionsPerPage);
      setCurrentPage(targetPage);
      setTimeout(() => {
        const el = document.getElementById(`intel-q-card-${zeroBasedQuestionIndex + 1}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 80);
    }
  };

  const handleJumpToFirstUnanswered = () => {
    soundManager.playTap();
    setUnansweredWarning(false);
    if (isMultipleIntelligences) {
      const idx = activeMIQuestions.findIndex((q) => answers[q.id] === undefined);
      if (idx >= 0) handleJumpToQuestionIndex(idx);
    } else {
      const idx = activeObjQuestions.findIndex((q) => objAnswers[q.id] === undefined);
      if (idx >= 0) handleJumpToQuestionIndex(idx);
    }
  };

  const handleNextPage = () => {
    soundManager.playTap();
    if (safeCurrentPage < totalPages - 1) {
      setCurrentPage(safeCurrentPage + 1);
    } else {
      if (answeredCount < totalQuestionsCount && !unansweredWarning) {
        setUnansweredWarning(true);
        return;
      }
      handleFinishTest(true);
    }
  };

  const handlePrevPage = () => {
    soundManager.playTap();
    if (safeCurrentPage > 0) {
      setCurrentPage(safeCurrentPage - 1);
    }
  };

  const handleFinishTest = (forceSubmit = false) => {
    if (!forceSubmit && answeredCount < totalQuestionsCount) {
      setUnansweredWarning(true);
      return;
    }

    soundManager.playRoundPass();
    setIsTimerActive(false);
    setUnansweredWarning(false);

    if (isMultipleIntelligences) {
      const result = calculateIntelligenceResults(answers, ageGroup, gender);
      setTestResult(result);
      setStep('results');
      setActiveCategoryDetail(result.primaryIntelligence);

      try {
        localStorage.setItem(STORAGE_RESULT_KEY, JSON.stringify(result));
      } catch {}

      saveUnifiedTestRecord(user, {
        testType: 'intelligence',
        testTitleAr: `مقياس الذكاءات الـ 9: ${INTELLIGENCE_CATEGORIES[result.primaryIntelligence].titleAr}`,
        testCategoryAr: 'الذكاءات المتعددة (هوارد جاردنر وماكينزي - 45 سؤالاً)',
        scoreOrArchetype: INTELLIGENCE_CATEGORIES[result.primaryIntelligence].titleAr,
        percentage: result.categoryScores[result.primaryIntelligence].percentage,
        badgeColor: INTELLIGENCE_CATEGORIES[result.primaryIntelligence].color,
        keyInsights: [
          `الذكاء السائد: ${INTELLIGENCE_CATEGORIES[result.primaryIntelligence].titleAr}`,
          ...INTELLIGENCE_CATEGORIES[result.primaryIntelligence].suggestedCareersAr
            .slice(0, 2)
            .map((c) => `مهنة مقترحة: ${c}`),
        ],
        snapshot: result,
      }).catch(() => {});
    } else {
      const result = calculateObjectiveBatteryResult(
        activeBattery,
        objAnswers,
        elapsedSeconds || 120,
        ageGroup
      );
      setObjResult(result);
      setStep('results');

      try {
        localStorage.setItem(`${STORAGE_OBJ_RESULT_KEY}${activeBattery}`, JSON.stringify(result));
      } catch {}

      saveUnifiedTestRecord(user, {
        testType: 'intelligence',
        testTitleAr: result.batteryTitleAr,
        testCategoryAr: currentBatteryMeta.scientificScaleName,
        scoreOrArchetype: `${result.classificationTitleAr} (${result.standardScore})`,
        percentage: result.overallPercentage,
        badgeColor: currentBatteryMeta.accentColor,
        keyInsights: [
          `الدرجة المعيارية: ${result.standardScore} (المئين ${result.percentileRank}%)`,
          ...result.strengthsAr.slice(0, 2),
        ],
        snapshot: result,
      }).catch(() => {});
    }
  };

  const handleSaveToProfile = async () => {
    soundManager.playTap();
    setIsSavedToProfile(true);

    if (isMultipleIntelligences && testResult) {
      if (onSaveResultToProfile) {
        onSaveResultToProfile(testResult);
      }
      try {
        await saveUnifiedTestRecord(user, {
          testType: 'intelligence',
          testTitleAr: `مقياس الذكاءات الـ 9: ${INTELLIGENCE_CATEGORIES[testResult.primaryIntelligence].titleAr}`,
          testCategoryAr: 'الذكاءات المتعددة (هوارد جاردنر - 45 سؤالاً)',
          scoreOrArchetype: INTELLIGENCE_CATEGORIES[testResult.primaryIntelligence].titleAr,
          percentage: testResult.categoryScores[testResult.primaryIntelligence].percentage,
          badgeColor: INTELLIGENCE_CATEGORIES[testResult.primaryIntelligence].color,
          keyInsights: [
            `الذكاء السائد: ${INTELLIGENCE_CATEGORIES[testResult.primaryIntelligence].titleAr}`,
            ...INTELLIGENCE_CATEGORIES[testResult.primaryIntelligence].suggestedCareersAr
              .slice(0, 2)
              .map((c) => `مهنة مقترحة: ${c}`),
          ],
          snapshot: testResult,
        });

        if (user && user.uid) {
          const userRef = doc(db, 'users', user.uid);
          await setDoc(
            userRef,
            {
              intelligenceProfile: {
                primaryIntelligence: testResult.primaryIntelligence,
                topThree: testResult.topThree,
                scores: testResult.categoryScores,
                completedAt: testResult.completedAt,
              },
            },
            { merge: true }
          );
        }
      } catch (err) {
        console.warn('Could not sync intelligence to Firestore', err);
      }
    } else if (!isMultipleIntelligences && objResult) {
      try {
        await saveUnifiedTestRecord(user, {
          testType: 'intelligence',
          testTitleAr: objResult.batteryTitleAr,
          testCategoryAr: currentBatteryMeta.scientificScaleName,
          scoreOrArchetype: `${objResult.classificationTitleAr} (${objResult.standardScore})`,
          percentage: objResult.overallPercentage,
          badgeColor: currentBatteryMeta.accentColor,
          keyInsights: objResult.strengthsAr,
          snapshot: objResult,
        });
      } catch {}
    }

    setTimeout(() => setIsSavedToProfile(false), 3000);
  };

  const triggerMIPDFExport = (res: IntelligenceTestResult) => {
    const primaryMeta = INTELLIGENCE_CATEGORIES[res.primaryIntelligence];
    const secondMeta = INTELLIGENCE_CATEGORIES[res.topThree[1]];
    const execSummary = generateExecutiveSummary(
      `معدل كلي ${res.overallAverage}%`,
      secondMeta.titleAr,
      primaryMeta.titleAr
    );

    exportPsychometricReportAsPDF({
      reportTitle: 'التقرير السيكومتري الشامل للذكاءات المتعددة (9 ذكاءات • 45 سؤالاً)',
      subTitle: `البصمة المعرفية المهيمنة: ${primaryMeta.titleAr}`,
      scientificBasis: 'Howard Gardner (1983/1999) & Walter McKenzie Inventory (45 Items)',
      completedAt: new Date(res.completedAt).toLocaleDateString('ar-SA'),
      overallScoreLabel: 'المعدل المعرفي الكلي',
      overallScoreValue: `${res.overallAverage}%`,
      cognitiveFingerprintTitle: `البصمة المعرفية: ${primaryMeta.titleAr} + ${secondMeta.titleAr}`,
      executiveSummary: execSummary,
      metrics: (Object.keys(INTELLIGENCE_CATEGORIES) as IntelligenceCategory[]).map((cat) => ({
        label: `${INTELLIGENCE_CATEGORIES[cat].icon} ${INTELLIGENCE_CATEGORIES[cat].titleAr}`,
        scorePercent: res.categoryScores[cat]?.percentage || 0,
        rawText: `${res.categoryScores[cat]?.rawScore || 0}/25`,
        color: INTELLIGENCE_CATEGORIES[cat].color,
      })),
      sections: res.topThree.map((cat, idx) => {
        const meta = INTELLIGENCE_CATEGORIES[cat];
        const pct = res.categoryScores[cat]?.percentage || 0;
        return {
          title: `المركز ${idx + 1}: ${meta.titleAr} (${pct}%)`,
          badge: meta.titleEn,
          content: `${meta.descriptionAr} — ${meta.scientificFoundationAr}`,
          items: [
            ...meta.optimalLearningStylesAr.map((s) => `أسلوب التعلم الأمثل: ${s}`),
            ...meta.developmentExercisesAr.map((e) => `تمرين التطوير: ${e}`),
          ],
        };
      }),
      careersOrRecommendations: primaryMeta.suggestedCareersAr,
    });
  };

  const triggerObjectivePDFExport = (
    res: ObjectiveBatteryResult,
    meta: (typeof INTELLIGENCE_BATTERIES_CATALOG)[number]
  ) => {
    exportPsychometricReportAsPDF({
      reportTitle: res.batteryTitleAr,
      subTitle: `${res.classificationTitleAr} — (${res.correctOrHighCount}/${res.totalQuestions} إجابة صحيحة)`,
      scientificBasis: `${meta.scientificScaleName} (${meta.theoristAr})`,
      completedAt: res.completedAt,
      overallScoreLabel: 'الدرجة المعيارية (IQ/EQ)',
      overallScoreValue: `${res.standardScore} (المئين ${res.percentileRank}%)`,
      cognitiveFingerprintTitle: `${res.classificationTitleAr} • الدقة الموزونة ${res.overallPercentage}%`,
      executiveSummary: res.executiveSummaryAr,
      metrics: res.domainScores.map((d) => ({
        label: d.domainTitleAr,
        scorePercent: d.percentage,
        rawText: `${d.correctCount}/${d.totalCount}`,
        levelLabel: d.levelAr,
        color: d.color,
      })),
      sections: [
        ...res.domainScores.map((d) => ({
          title: `${d.domainTitleAr} (${d.correctCount}/${d.totalCount} إجابات صحيحة)`,
          badge: `${d.percentage}% • ${d.levelAr}`,
          content: d.interpretationAr,
        })),
        {
          title: 'ملخص التدقيق العلمي للإجابات (30 سؤالاً)',
          badge: `الدقة المباشرة: ${res.accuracyPercentage}%`,
          content: `أجاب المختبَر إجابة صحيحة/مثالية على (${res.correctOrHighCount}) من أصل (${res.totalQuestions}) سؤالاً في زمن قدره (${formatTimer(res.timeSpentSeconds)}).`,
          items: (res.questionReview || []).slice(0, 10).map(
            (q) =>
              `س${q.questionNumber} (${q.isCorrect ? '✓ صحيح' : '✗ خطأ'}): إجابتك «${q.selectedLabelAr}» | الصواب: «${q.correctLabelAr}»`
          ),
        },
      ],
      careersOrRecommendations: [
        ...res.suggestedCareersAr.map((c) => `مسار مهني مقترح: ${c}`),
        ...res.growthRecommendationsAr.map((g) => `توصية تطويرية: ${g}`),
      ],
      questionAudit: (res.questionReview || []).map((q) => ({
        questionNumber: q.questionNumber,
        questionText: q.promptAr,
        userAnswer: q.selectedLabelAr,
        correctAnswerOrTrait: `${q.domainTitleAr} • الصواب: ${q.correctLabelAr}`,
        isCorrectOrHigh: q.isCorrect,
        pointsEarned: q.isCorrect ? '✓ صحيح' : '✗ خطأ',
        explanationAr: q.explanationAr,
      })),
    });
  };

  const handleDownloadPDFReport = () => {
    soundManager.playTap();
    if (isMultipleIntelligences && testResult) {
      triggerMIPDFExport(testResult);
    } else if (!isMultipleIntelligences && objResult) {
      triggerObjectivePDFExport(objResult, currentBatteryMeta);
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Helper to render 6 distinct, mathematically accurate SVG Raven's Progressive Matrices
  const renderRavenMatrixVisual = (matrixId?: string) => {
    if (!matrixId) return null;

    return (
      <div className="my-3 p-4 rounded-2xl bg-slate-900/95 border border-indigo-500/30 flex flex-col items-center justify-center">
        <div className="text-[11px] text-indigo-300 font-bold mb-2 flex items-center gap-1.5">
          <span>🧩</span>
          <span>لوحة مصفوفة رافين البصرية (Raven’s Progressive Matrix)</span>
        </div>

        {/* Matrix 1: 3x3 Dot Progression (Row + Col + 1) */}
        {matrixId === 'raven_matrix_1' && (
          <svg viewBox="0 0 240 240" className="w-48 h-48 sm:w-56 sm:h-56">
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => {
                const x = 15 + col * 72;
                const y = 15 + row * 72;
                const isMissing = row === 2 && col === 2;
                const count = row + col + 1;
                return (
                  <g key={`${row}_${col}`}>
                    <rect
                      x={x}
                      y={y}
                      width="64"
                      height="64"
                      rx="10"
                      fill={isMissing ? 'rgba(99,102,241,0.18)' : 'rgba(15,23,42,0.9)'}
                      stroke={isMissing ? '#818cf8' : '#475569'}
                      strokeWidth="2"
                      strokeDasharray={isMissing ? '4,3' : undefined}
                    />
                    {isMissing ? (
                      <text
                        x={x + 32}
                        y={y + 40}
                        textAnchor="middle"
                        fill="#a5b4fc"
                        fontSize="24"
                        fontWeight="bold"
                      >
                        ؟
                      </text>
                    ) : (
                      <>
                        {count >= 1 && <circle cx={x + 32} cy={y + 32} r="5" fill="#38bdf8" />}
                        {count >= 2 && <circle cx={x + 16} cy={y + 16} r="5" fill="#38bdf8" />}
                        {count >= 3 && <circle cx={x + 48} cy={y + 48} r="5" fill="#38bdf8" />}
                        {count >= 4 && <circle cx={x + 48} cy={y + 16} r="5" fill="#38bdf8" />}
                      </>
                    )}
                  </g>
                );
              })
            )}
          </svg>
        )}

        {/* Matrix 2: 90-degree Clockwise Arrow Rotation */}
        {matrixId === 'raven_matrix_2' && (
          <svg viewBox="0 0 240 100" className="w-60 h-28">
            {[0, 1, 2].map((col) => {
              const x = 15 + col * 72;
              const y = 18;
              const isMissing = col === 2;
              const rotation = col * 90;
              return (
                <g key={col}>
                  <rect
                    x={x}
                    y={y}
                    width="64"
                    height="64"
                    rx="10"
                    fill={isMissing ? 'rgba(99,102,241,0.18)' : 'rgba(15,23,42,0.9)'}
                    stroke={isMissing ? '#818cf8' : '#475569'}
                    strokeWidth="2"
                  />
                  {isMissing ? (
                    <text
                      x={x + 32}
                      y={y + 40}
                      textAnchor="middle"
                      fill="#a5b4fc"
                      fontSize="24"
                      fontWeight="bold"
                    >
                      ؟
                    </text>
                  ) : (
                    <g transform={`rotate(${rotation} ${x + 32} ${y + 32})`}>
                      <line
                        x1={x + 32}
                        y1={y + 50}
                        x2={x + 32}
                        y2={y + 16}
                        stroke="#ec4899"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <polyline
                        points={`${x + 22},${y + 26} ${x + 32},${y + 14} ${x + 42},${y + 26}`}
                        fill="none"
                        stroke="#ec4899"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        )}

        {/* Matrix 3: XOR Visual Line Subtraction */}
        {matrixId === 'raven_matrix_3' && (
          <svg viewBox="0 0 240 100" className="w-60 h-28">
            <rect x="15" y="18" width="64" height="64" rx="10" fill="rgba(15,23,42,0.9)" stroke="#475569" strokeWidth="2" />
            <line x1="47" y1="26" x2="47" y2="74" stroke="#38bdf8" strokeWidth="3" />
            <line x1="25" y1="74" x2="69" y2="26" stroke="#a855f7" strokeWidth="3" />

            <rect x="87" y="18" width="64" height="64" rx="10" fill="rgba(15,23,42,0.9)" stroke="#475569" strokeWidth="2" />
            <line x1="119" y1="26" x2="119" y2="74" stroke="#38bdf8" strokeWidth="3" />
            <line x1="97" y1="26" x2="141" y2="74" stroke="#10b981" strokeWidth="3" />

            <rect
              x="159"
              y="18"
              width="64"
              height="64"
              rx="10"
              fill="rgba(99,102,241,0.18)"
              stroke="#818cf8"
              strokeWidth="2"
              strokeDasharray="4,3"
            />
            <text x="191" y="58" textAnchor="middle" fill="#a5b4fc" fontSize="24" fontWeight="bold">
              ؟
            </text>
          </svg>
        )}

        {/* Matrix 4: 3x3 Latin Square (Triangle, Circle, Diamond + Outline, Striped, Solid) */}
        {matrixId === 'raven_matrix_4' && (
          <svg viewBox="0 0 240 240" className="w-48 h-48 sm:w-56 sm:h-56">
            {[
              // Row 0: Triangle(outline), Circle(striped), Diamond(solid)
              { row: 0, col: 0, shape: 'tri', fill: 'outline' },
              { row: 0, col: 1, shape: 'cir', fill: 'striped' },
              { row: 0, col: 2, shape: 'dia', fill: 'solid' },
              // Row 1: Diamond(striped), Triangle(solid), Circle(outline)
              { row: 1, col: 0, shape: 'dia', fill: 'striped' },
              { row: 1, col: 1, shape: 'tri', fill: 'solid' },
              { row: 1, col: 2, shape: 'cir', fill: 'outline' },
              // Row 2: Circle(outline), Triangle(striped), Missing(Diamond solid)
              { row: 2, col: 0, shape: 'cir', fill: 'outline' },
              { row: 2, col: 1, shape: 'tri', fill: 'striped' },
              { row: 2, col: 2, shape: 'missing', fill: 'missing' },
            ].map((cell) => {
              const x = 15 + cell.col * 72;
              const y = 15 + cell.row * 72;
              const cx = x + 32;
              const cy = y + 32;
              const isMissing = cell.shape === 'missing';
              const fillStyle =
                cell.fill === 'solid'
                  ? '#a855f7'
                  : cell.fill === 'striped'
                  ? 'rgba(56,189,248,0.35)'
                  : 'none';
              const strokeColor =
                cell.fill === 'solid'
                  ? '#c084fc'
                  : cell.fill === 'striped'
                  ? '#38bdf8'
                  : '#f43f5e';

              return (
                <g key={`${cell.row}_${cell.col}`}>
                  <rect
                    x={x}
                    y={y}
                    width="64"
                    height="64"
                    rx="10"
                    fill={isMissing ? 'rgba(99,102,241,0.18)' : 'rgba(15,23,42,0.9)'}
                    stroke={isMissing ? '#818cf8' : '#475569'}
                    strokeWidth="2"
                    strokeDasharray={isMissing ? '4,3' : undefined}
                  />
                  {isMissing ? (
                    <text x={cx} y={cy + 8} textAnchor="middle" fill="#a5b4fc" fontSize="24" fontWeight="bold">
                      ؟
                    </text>
                  ) : (
                    <>
                      {cell.shape === 'cir' && (
                        <circle cx={cx} cy={cy} r="17" fill={fillStyle} stroke={strokeColor} strokeWidth="2.5" />
                      )}
                      {cell.shape === 'tri' && (
                        <polygon
                          points={`${cx},${cy - 18} ${cx - 18},${cy + 15} ${cx + 18},${cy + 15}`}
                          fill={fillStyle}
                          stroke={strokeColor}
                          strokeWidth="2.5"
                        />
                      )}
                      {cell.shape === 'dia' && (
                        <polygon
                          points={`${cx},${cy - 18} ${cx + 18},${cy} ${cx},${cy + 18} ${cx - 18},${cy}`}
                          fill={fillStyle}
                          stroke={strokeColor}
                          strokeWidth="2.5"
                        />
                      )}
                      {cell.fill === 'striped' && (
                        <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} stroke={strokeColor} strokeWidth="2" />
                      )}
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        )}

        {/* Matrix 5: Polygon Sides (+1 Horizontally) & Inner Dots (-1 Vertically) */}
        {matrixId === 'raven_matrix_5' && (
          <svg viewBox="0 0 240 240" className="w-48 h-48 sm:w-56 sm:h-56">
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => {
                const x = 15 + col * 72;
                const y = 15 + row * 72;
                const cx = x + 32;
                const cy = y + 32;
                const isMissing = row === 2 && col === 2;
                const sides = 4 + col; // col 0: square(4), col 1: pentagon(5), col 2: hexagon(6)
                const dots = 3 - row; // row 0: 3 dots, row 1: 2 dots, row 2: 1 dot

                const pts = Array.from({ length: sides })
                  .map((_, i) => {
                    const ang = (i * 2 * Math.PI) / sides - Math.PI / 2;
                    return `${(cx + 20 * Math.cos(ang)).toFixed(1)},${(cy + 20 * Math.sin(ang)).toFixed(1)}`;
                  })
                  .join(' ');

                return (
                  <g key={`${row}_${col}`}>
                    <rect
                      x={x}
                      y={y}
                      width="64"
                      height="64"
                      rx="10"
                      fill={isMissing ? 'rgba(99,102,241,0.18)' : 'rgba(15,23,42,0.9)'}
                      stroke={isMissing ? '#818cf8' : '#475569'}
                      strokeWidth="2"
                      strokeDasharray={isMissing ? '4,3' : undefined}
                    />
                    {isMissing ? (
                      <text x={cx} y={cy + 8} textAnchor="middle" fill="#a5b4fc" fontSize="24" fontWeight="bold">
                        ؟
                      </text>
                    ) : (
                      <>
                        <polygon points={pts} fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth="2" />
                        {dots === 1 && <circle cx={cx} cy={cy} r="3.5" fill="#fbbf24" />}
                        {dots === 2 && (
                          <>
                            <circle cx={cx - 6} cy={cy} r="3.5" fill="#fbbf24" />
                            <circle cx={cx + 6} cy={cy} r="3.5" fill="#fbbf24" />
                          </>
                        )}
                        {dots === 3 && (
                          <>
                            <circle cx={cx - 7} cy={cy + 4} r="3.2" fill="#fbbf24" />
                            <circle cx={cx + 7} cy={cy + 4} r="3.2" fill="#fbbf24" />
                            <circle cx={cx} cy={cy - 6} r="3.2" fill="#fbbf24" />
                          </>
                        )}
                      </>
                    )}
                  </g>
                );
              })
            )}
          </svg>
        )}

        {/* Matrix 6: Corner Pointer Spiral (+1 step clockwise horizontally, +2 steps vertically) */}
        {matrixId === 'raven_matrix_6' && (
          <svg viewBox="0 0 240 240" className="w-48 h-48 sm:w-56 sm:h-56">
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => {
                const x = 15 + col * 72;
                const y = 15 + row * 72;
                const isMissing = row === 2 && col === 2;
                // Corner index: 0=TopLeft, 1=TopRight, 2=BottomRight, 3=BottomLeft
                const cornerIdx = (row * 2 + col) % 4;
                const cornerCoords = [
                  { px: x + 16, py: y + 16 },
                  { px: x + 48, py: y + 16 },
                  { px: x + 48, py: y + 48 },
                  { px: x + 16, py: y + 48 },
                ][cornerIdx];

                return (
                  <g key={`${row}_${col}`}>
                    <rect
                      x={x}
                      y={y}
                      width="64"
                      height="64"
                      rx="10"
                      fill={isMissing ? 'rgba(99,102,241,0.18)' : 'rgba(15,23,42,0.9)'}
                      stroke={isMissing ? '#818cf8' : '#475569'}
                      strokeWidth="2"
                      strokeDasharray={isMissing ? '4,3' : undefined}
                    />
                    {isMissing ? (
                      <text x={x + 32} y={y + 40} textAnchor="middle" fill="#a5b4fc" fontSize="24" fontWeight="bold">
                        ؟
                      </text>
                    ) : (
                      <>
                        <rect
                          x={x + 12}
                          y={y + 12}
                          width="40"
                          height="40"
                          fill="none"
                          stroke="#334155"
                          strokeWidth="1"
                          strokeDasharray="2,2"
                        />
                        <circle cx={cornerCoords.px} cy={cornerCoords.py} r="7" fill="#f43f5e" />
                      </>
                    )}
                  </g>
                );
              })
            )}
          </svg>
        )}
      </div>
    );
  };

  // Filtered audit items for Objective results
  const filteredAuditQuestions = (objResult?.questionReview || []).filter((item) => {
    if (auditFilter === 'correct') return item.isCorrect;
    if (auditFilter === 'incorrect') return !item.isCorrect;
    return true;
  });

  // Share text for current result (MI or Objective)
  const currentViralShareTitle = isMultipleIntelligences
    ? 'مشاركة نتيجة مختبر الذكاءات المتعددة'
    : `مشاركة نتيجة ${objResult?.batteryTitleAr || 'اختبار الذكاء'}`;

  const currentViralShareCategory = isMultipleIntelligences
    ? 'مقياس الذكاءات المتعددة • Gardner & McKenzie (45 سؤالاً)'
    : `${currentBatteryMeta.scientificScaleName} (30 سؤالاً)`;

  const currentViralShareText =
    isMultipleIntelligences && testResult
      ? `🧠 خضت مقياس الذكاءات المتعددة (45 سؤالاً • 9 ذكاءات) في منصة مِـرآة القـلوب:\n🥇 ذكائي المهيمن: ${INTELLIGENCE_CATEGORIES[testResult.primaryIntelligence].icon} ${INTELLIGENCE_CATEGORIES[testResult.primaryIntelligence].titleAr} (${testResult.categoryScores[testResult.primaryIntelligence].percentage}%)\n🥈 الثاني: ${INTELLIGENCE_CATEGORIES[testResult.topThree[1]].icon} ${INTELLIGENCE_CATEGORIES[testResult.topThree[1]].titleAr} (${testResult.categoryScores[testResult.topThree[1]].percentage}%)\n🥉 الثالث: ${INTELLIGENCE_CATEGORIES[testResult.topThree[2]].icon} ${INTELLIGENCE_CATEGORIES[testResult.topThree[2]].titleAr} (${testResult.categoryScores[testResult.topThree[2]].percentage}%)\nمعدل الذكاء الكلي: ${testResult.overallAverage}%`
      : objResult
      ? `🧠 خضت «${objResult.batteryTitleAr}» (30 سؤالاً معيارياً) في منصة مِـرآة القـلوب:\n🏆 التصنيف: ${objResult.classificationTitleAr}\n📊 الدرجة المعيارية: ${objResult.standardScore} (المئين ${objResult.percentileRank}%)\n✅ الإجابات الصحيحة: ${objResult.correctOrHighCount}/${objResult.totalQuestions} (${objResult.overallPercentage}%)\n🥇 البعد الأقوى: ${objResult.domainScores[0]?.domainTitleAr} (${objResult.domainScores[0]?.percentage}%)`
      : '';

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-md overflow-hidden ${
        isAr ? 'text-right' : 'text-left'
      } ${isLight ? 'bg-slate-900/60' : 'bg-black/90'}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className={`w-full max-w-5xl h-[95vh] max-h-[920px] border rounded-3xl overflow-hidden shadow-2xl flex flex-col relative ${
          isLight
            ? 'bg-slate-900 border-purple-400/40 text-white'
            : 'bg-slate-950 border-purple-500/30 text-white'
        }`}
      >
        {/* ================= MODAL HEADER ================= */}
        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-cyan-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#120d24] rounded-[14px] flex items-center justify-center text-lg">
                🧠
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-sm sm:text-base text-white font-['Alexandria']">
                  {isAr
                    ? 'مختبر مقاييس الذكاء والقدرات المعرفية الاستكشافي'
                    : 'Exploratory Cognitive & Intelligence Batteries Lab'}
                </h2>
                <span className="hidden sm:inline text-[11px] text-purple-300">
                  Gardner • Raven • WAIS • Bar-On • MSCEIT • CogAT
                </span>
              </div>
              <p className="text-[11px] text-gray-300">
                {isAr
                  ? '4 بطاريات علمية استكشافية (135 سؤالاً محكماً: 30 إلى 45 سؤالاً لكل اختبار) مع تحميل PDF مباشر'
                  : '4 Exploratory Scientific Batteries (135 Validated Items) with Instant PDF Export'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {step === 'test' && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/40 border border-white/15 text-xs text-amber-300 font-mono font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimer(timeLeftSeconds)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= STAGE 1: WELCOME & BATTERY SELECTION ================= */}
        {step === 'welcome' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 custom-scrollbar max-w-5xl mx-auto w-full">
            {/* Clinical & Scientific Disclaimer at the start of the Intelligence Lab */}
            <ScientificClinicalDisclaimerBanner testType="intelligence" />

            {/* Permanent Top Academic Introduction (AR/EN + Dark/Light Mode) */}
            <PsychometricAcademicIntro variant="modal" focusScope="intelligence" />

            {/* Hero Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-indigo-950/70 border border-purple-500/30 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>منظومة التقييم السيكومتري والمعرفي الشامل (135 سؤالاً علمياً محكماً)</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white font-['Alexandria']">
                اختر البطارية العلمية المعتمدة لاكتشاف بصمتك المعرفية والانفعالية بدقة 100%
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                تم بناء هذه البطاريات الأربع وفق المعايير السيكومترية العالمية: نظرية الذكاءات التسعة لـ <strong>هوارد جاردنر وماكينزي (45 سؤالاً)</strong>، ومصفوفات <strong>رافين المتتابعة ونموذج كاتل-هورن-كارول CHC لقياس الـ IQ (30 سؤالاً)</strong>، ومقياس <strong>بار-أون وماير-سالوفي للذكاء العاطفي MSCEIT (30 سؤالاً)</strong>، وبطارية <strong>CogAT & Wonderlic للقدرات المهنية (30 سؤالاً)</strong> مع تصحيح علمي تفصيلي وتصدير PDF مباشر.
              </p>
            </div>

            {/* Demographics Config */}
            <div className="p-4 sm:p-5 rounded-3xl bg-white/5 border border-white/10 space-y-4">
              <h4 className="text-xs font-black text-white flex items-center gap-2">
                <span>👤 ضبط المعيار السيكومتري والفئة العمرية:</span>
                <span className="text-[11px] text-gray-400 font-normal">
                  (يُستخدم لمقارنة درجتك الخام بجدول المعايير العمرية Norm Tables)
                </span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">الجنس:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        gender === 'male'
                          ? 'bg-blue-600/30 border-blue-500 text-blue-200 shadow-md'
                          : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <span>👨 ذكر</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        gender === 'female'
                          ? 'bg-pink-600/30 border-pink-500 text-pink-200 shadow-md'
                          : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <span>👩 أنثى</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1.5">الفئة العمرية:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {[
                      { key: '12-17', label: '12-17 سنة' },
                      { key: '18-29', label: '18-29 سنة' },
                      { key: '30-49', label: '30-49 سنة' },
                      { key: '50+', label: '50+ سنة' },
                    ].map((ag) => (
                      <button
                        type="button"
                        key={ag.key}
                        onClick={() => setAgeGroup(ag.key)}
                        className={`p-2 rounded-xl border text-[11px] text-center transition cursor-pointer font-bold ${
                          ageGroup === ag.key
                            ? 'bg-purple-600/30 border-purple-500 text-purple-200 shadow-md'
                            : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        {ag.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Accredited Scientific Batteries Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>البطاريات العلمية الأربع المعتمدة (إجمالي 135 سؤالاً):</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INTELLIGENCE_BATTERIES_CATALOG.map((bat) => {
                  let savedProgressCount = 0;
                  let hasSavedResult = false;
                  let savedSummaryBadge = '';

                  try {
                    if (bat.id === 'multiple_intelligences') {
                      savedProgressCount = Object.keys(answers).length;
                      if (testResult) {
                        hasSavedResult = true;
                        savedSummaryBadge = `${INTELLIGENCE_CATEGORIES[testResult.primaryIntelligence].titleAr} (${testResult.overallAverage}%)`;
                      }
                    } else {
                      const rawAns = localStorage.getItem(`${STORAGE_OBJ_ANSWERS_KEY}${bat.id}`);
                      if (rawAns) savedProgressCount = Object.keys(JSON.parse(rawAns)).length;
                      const rawRes = localStorage.getItem(`${STORAGE_OBJ_RESULT_KEY}${bat.id}`);
                      if (rawRes) {
                        const parsedRes: ObjectiveBatteryResult = JSON.parse(rawRes);
                        hasSavedResult = true;
                        savedSummaryBadge = `الدرجة ${parsedRes.standardScore} • الدقة ${parsedRes.overallPercentage}%`;
                      }
                    }
                  } catch {}

                  return (
                    <div
                      key={bat.id}
                      onClick={() => handleSelectBattery(bat.id)}
                      className="p-5 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 transition cursor-pointer flex flex-col justify-between group shadow-lg"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between text-xs text-slate-300">
                          <span className="text-2xl">{bat.icon}</span>
                          <span className="px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-200 font-bold">
                            {bat.questionCount} سؤالاً · {bat.recommendedMinutes} دقيقة
                          </span>
                        </div>

                        <h5 className="font-black text-base text-white group-hover:text-purple-300 transition font-['Alexandria']">
                          {bat.titleAr}
                        </h5>

                        <p className="text-xs text-gray-300 leading-relaxed">
                          {bat.descriptionAr}
                        </p>

                        <div className="text-[11px] text-purple-300 pt-1">
                          المرجع العلمي: {bat.theoristAr}
                        </div>

                        {hasSavedResult && (
                          <div className="p-2.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-2 text-[11px]">
                            <span className="text-emerald-300 font-bold">
                              ✓ آخر نتيجة: {savedSummaryBadge}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => handleOpenSavedBatteryResult(e, bat.id)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/40 text-emerald-100 font-bold cursor-pointer"
                              >
                                عرض النتيجة 📊
                              </button>
                              <button
                                type="button"
                                onClick={(e) => handleDirectPDFForBattery(e, bat.id)}
                                className="px-2.5 py-1 rounded-lg bg-indigo-600/40 hover:bg-indigo-600/60 border border-indigo-400/40 text-indigo-100 font-bold cursor-pointer"
                              >
                                PDF 📄
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                        {savedProgressCount > 0 ? (
                          <span className="text-emerald-400 font-bold">
                            محفوظ تلقائياً ({savedProgressCount}/{bat.questionCount} سؤالاً)
                          </span>
                        ) : (
                          <span className="text-gray-400">
                            {bat.questionCount} سؤالاً معيارياً • حفظ فوري
                          </span>
                        )}
                        <span className="font-extrabold text-white group-hover:text-purple-300 flex items-center gap-1">
                          <span>معاينة التعليمات والبدء</span>
                          <ArrowLeft className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Permanent Bottom Academic Conclusion & APA References */}
            <PsychometricAcademicConclusion variant="modal" />
          </div>
        )}

        {/* ================= STAGE 1B: WELCOME & SCIENTIFIC INSTRUCTIONS SCREEN ================= */}
        {step === 'instructions' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 custom-scrollbar max-w-3xl mx-auto w-full">
            <button
              onClick={() => setStep('welcome')}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>{isAr ? 'العودة لقائمة البطاريات الأربع' : 'Back to All 4 Batteries'}</span>
            </button>

            <ScientificClinicalDisclaimerBanner
              testType="intelligence"
              testTitleAr={currentBatteryMeta.titleAr}
              testTitleEn={currentBatteryMeta.scientificScaleName}
            />

            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950/50 to-slate-900 border border-purple-500/40 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between text-xs text-purple-300">
                <span>{currentBatteryMeta.scientificScaleName}</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 font-bold">
                  {totalQuestionsCount} سؤالاً كاملاً · {currentBatteryMeta.recommendedMinutes} دقيقة
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">
                {currentBatteryMeta.icon} {currentBatteryMeta.titleAr}
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {currentBatteryMeta.descriptionAr}
              </p>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
                <h4 className="text-xs font-black text-amber-300">
                  📋 تعليمات الاختبار والمنهجية السيكومترية ({totalQuestionsCount} سؤالاً):
                </h4>
                <ul className="text-xs text-gray-200 space-y-2 list-disc list-inside leading-relaxed">
                  {currentBatteryMeta.instructionsAr.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                  <li>
                    يمكنك التبديل أثناء الاختبار بين <strong>عرض الصفحات (5 أسئلة)</strong> أو{' '}
                    <strong>عرض جميع الأسئلة الـ {totalQuestionsCount} في قائمة واحدة</strong> أو التنقل عبر خريطة الأسئلة التفاعلية.
                  </li>
                </ul>
              </div>

              {answeredCount > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-emerald-200">
                    <strong>💾 تم العثور على جلسة محفوظة تلقائياً:</strong> لقد أجبت مسبقاً على ({answeredCount} من {totalQuestionsCount} سؤالاً). يمكنك استئناف الاختبار أو البدء من جديد.
                  </div>
                  <button
                    onClick={handleResetBatteryAnswers}
                    className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 text-xs font-bold shrink-0 cursor-pointer"
                  >
                    مسح والبدء من الصفر
                  </button>
                </div>
              )}

              <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                {((isMultipleIntelligences && testResult) || (!isMultipleIntelligences && objResult)) && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setStep('results')}
                      className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition cursor-pointer"
                    >
                      عرض تقرير نتيجتي السابقة 📊
                    </button>
                    <button
                      onClick={handleDownloadPDFReport}
                      className="px-4 py-3 rounded-2xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/40 text-indigo-200 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>تحميل PDF 📄</span>
                    </button>
                  </div>
                )}

                <button
                  onClick={handleStartTest}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-95 text-white font-black text-xs sm:text-sm transition shadow-xl cursor-pointer flex items-center gap-2 mr-auto"
                >
                  <span>
                    {answeredCount > 0 && answeredCount < totalQuestionsCount
                      ? `استئناف الاختبار (${answeredCount}/${totalQuestionsCount})`
                      : `بدء الاختبار الآن (${totalQuestionsCount} سؤالاً)`}
                  </span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= STAGE 2, 3 & 4: QUESTION RUNNER WITH QUESTION MAP & VIEW SWITCHER ================= */}
        {step === 'test' && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Progress & View Mode Switcher Bar */}
            <div className="px-4 py-2.5 bg-black/50 border-b border-white/10 space-y-2.5 shrink-0">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-purple-300">{currentBatteryMeta.titleAr}</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-white font-bold">
                    إجمالي الأسئلة: {totalQuestionsCount} سؤالاً
                  </span>
                  {runnerViewMode !== 'all_list' && (
                    <>
                      <span className="text-gray-500">·</span>
                      <span className="text-amber-300 font-bold">
                        صفحة {safeCurrentPage + 1} من {totalPages}
                      </span>
                    </>
                  )}
                </div>

                {/* View Mode Switcher */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => handleSwitchViewMode('paged_5')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      runnerViewMode === 'paged_5'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    5 أسئلة بالصفحة
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchViewMode('single_1')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      runnerViewMode === 'single_1'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    سؤال تلو الآخر
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchViewMode('all_list')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      runnerViewMode === 'all_list'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    جميع الـ {totalQuestionsCount} سؤالاً
                  </button>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">
                    تمت الإجابة: {answeredCount} / {totalQuestionsCount} ({progressPercent}%)
                  </span>
                  <div className="w-24 sm:w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Interactive Numbered Question Map (1 .. 30 or 1 .. 45) */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 custom-scrollbar">
                <span className="text-[10px] text-gray-400 shrink-0 ml-1">خريطة الأسئلة:</span>
                {Array.from({ length: totalQuestionsCount }).map((_, idx) => {
                  const qId = isMultipleIntelligences
                    ? activeMIQuestions[idx]?.id
                    : activeObjQuestions[idx]?.id;
                  const isAnswered = isMultipleIntelligences
                    ? answers[qId] !== undefined
                    : objAnswers[qId] !== undefined;
                  const isOnCurrentPage =
                    runnerViewMode !== 'all_list' &&
                    idx >= safeCurrentPage * questionsPerPage &&
                    idx < (safeCurrentPage + 1) * questionsPerPage;

                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => handleJumpToQuestionIndex(idx)}
                      title={`الانتقال إلى السؤال ${idx + 1}`}
                      className={`w-6 h-6 rounded-lg text-[10px] font-mono font-bold shrink-0 transition cursor-pointer flex items-center justify-center border ${
                        isAnswered
                          ? isOnCurrentPage
                            ? 'bg-emerald-500 text-slate-950 border-white shadow-sm'
                            : 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40'
                          : isOnCurrentPage
                          ? 'bg-purple-600 text-white border-purple-300 shadow-sm'
                          : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Unanswered Warning Banner if user clicked Finish early */}
            {unansweredWarning && remainingCount > 0 && (
              <div className="mx-4 mt-3 p-3.5 rounded-2xl bg-amber-950/90 border border-amber-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="text-xs text-amber-200 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>تنبيه دقة القياس:</strong> تبقى لديك ({remainingCount}) سؤالاً بدون إجابة من أصل ({totalQuestionsCount}). للحصول على درجة معيارية ونسبة مئوية دقيقة 100% يُنصح بالإجابة على جميع الأسئلة.
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleJumpToFirstUnanswered}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs cursor-pointer"
                  >
                    الانتقال للسؤال غير المجاب ⬅
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFinishTest(true)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
                  >
                    إنهاء واحتساب النتيجة الحالية
                  </button>
                </div>
              </div>
            )}

            {/* Questions List */}
            <div
              ref={questionScrollRef}
              className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar max-w-4xl mx-auto w-full"
            >
              <ScientificClinicalDisclaimerBanner
                testType="intelligence"
                testTitleAr={currentBatteryMeta.titleAr}
                testTitleEn={currentBatteryMeta.scientificScaleName}
                compact
              />
              {isMultipleIntelligences
                ? currentMIQuestionsPage.map((question, qIdx) => {
                    const questionGlobalIdx = safeCurrentPage * questionsPerPage + qIdx + 1;
                    const catMeta = INTELLIGENCE_CATEGORIES[question.category];
                    const selectedVal = answers[question.id];
                    const questionText =
                      gender === 'female' && question.femaleTextAr
                        ? question.femaleTextAr
                        : question.textAr;

                    return (
                      <motion.div
                        id={`intel-q-card-${questionGlobalIdx}`}
                        key={question.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(qIdx * 0.02, 0.2) }}
                        className={`p-4 sm:p-5 rounded-3xl border transition space-y-3 ${
                          selectedVal !== undefined
                            ? 'bg-emerald-950/15 border-emerald-500/30'
                            : 'bg-white/5 border-white/10 hover:border-purple-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-lg bg-purple-500/20 border border-purple-500/30 font-mono font-bold text-purple-200">
                              السؤال {questionGlobalIdx} من {totalQuestionsCount}
                            </span>
                            <span>·</span>
                            <span style={{ color: catMeta.color }}>
                              {catMeta.icon} {catMeta.titleAr}
                            </span>
                          </div>
                          <span className="text-[11px] text-gray-400">
                            {question.situationContextAr}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-extrabold text-white leading-relaxed font-['Alexandria']">
                          «{questionText}»
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1">
                          {LIKERT_OPTIONS.map((opt) => {
                            const isChosen = selectedVal === opt.value;
                            return (
                              <button
                                type="button"
                                key={opt.value}
                                onClick={() => handleSelectMIAnswer(question.id, opt.value)}
                                className={`p-2.5 rounded-2xl border text-center transition cursor-pointer flex sm:flex-col items-center justify-between sm:justify-center gap-1.5 ${
                                  isChosen
                                    ? 'bg-gradient-to-r sm:bg-gradient-to-b from-purple-600/40 to-pink-600/40 border-purple-400 text-white shadow-lg'
                                    : 'bg-black/30 border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <div className="flex items-center gap-1.5 sm:gap-1">
                                  <span className="text-sm">{opt.icon}</span>
                                  <span className="text-xs font-bold">
                                    {opt.labelAr.split(' ')[0]} {opt.labelAr.split(' ')[1] || ''}
                                  </span>
                                </div>
                                <span className="text-[10px] opacity-75 font-mono">
                                  ({opt.value} درجات)
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })
                : currentObjQuestionsPage.map((question, qIdx) => {
                    const selectedOptId = objAnswers[question.id];
                    const diffLabel =
                      question.difficulty === 3
                        ? 'مستوى متقدم ★★★'
                        : question.difficulty === 2
                        ? 'مستوى متوسط ★★'
                        : 'مستوى تأسيسي ★';

                    const optionLetters = ['أ', 'ب', 'ج', 'د'];

                    return (
                      <motion.div
                        id={`intel-q-card-${question.questionNumber}`}
                        key={question.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(qIdx * 0.02, 0.2) }}
                        className={`p-4 sm:p-5 rounded-3xl border transition space-y-3 ${
                          selectedOptId !== undefined
                            ? 'bg-emerald-950/15 border-emerald-500/30'
                            : 'bg-white/5 border-white/10 hover:border-purple-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-lg bg-purple-500/20 border border-purple-500/30 font-mono font-bold text-purple-200">
                              السؤال {question.questionNumber} من {totalQuestionsCount}
                            </span>
                            <span>·</span>
                            <span className="text-sky-300">{question.domainTitleAr}</span>
                          </div>
                          <span className="text-[11px] text-amber-300 font-bold">{diffLabel}</span>
                        </div>

                        {renderRavenMatrixVisual(question.matrixVisualId)}

                        <h4 className="text-sm sm:text-base font-extrabold text-white leading-relaxed font-['Alexandria']">
                          {question.promptAr}
                        </h4>

                        {question.subPromptAr && (
                          <p className="text-xs text-purple-300">{question.subPromptAr}</p>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                          {question.options.map((opt, optIndex) => {
                            const isChosen = selectedOptId === opt.id;
                            return (
                              <button
                                type="button"
                                key={opt.id}
                                onClick={() => handleSelectObjAnswer(question.id, opt.id)}
                                className={`p-3.5 rounded-2xl border text-right transition cursor-pointer flex items-center justify-between gap-2.5 ${
                                  isChosen
                                    ? 'bg-gradient-to-r from-purple-600/35 to-indigo-600/35 border-purple-400 text-white shadow-md'
                                    : 'bg-black/30 border-white/10 text-gray-300 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <span
                                    className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                                      isChosen
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-white/10 text-gray-300'
                                    }`}
                                  >
                                    {optionLetters[optIndex] || optIndex + 1}
                                  </span>
                                  <span className="text-xs sm:text-sm font-bold leading-relaxed">
                                    {opt.labelAr}
                                  </span>
                                </div>
                                {isChosen ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border border-white/25 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    );
                  })}
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="p-4 bg-slate-950 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
              {runnerViewMode !== 'all_list' ? (
                <button
                  disabled={safeCurrentPage === 0}
                  onClick={handlePrevPage}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                    safeCurrentPage === 0
                      ? 'opacity-30 cursor-not-allowed border-white/5 text-gray-500'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-white cursor-pointer'
                  }`}
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>
                    {runnerViewMode === 'single_1' ? 'السؤال السابق' : 'الصفحة السابقة'}
                  </span>
                </button>
              ) : (
                <span className="text-xs text-emerald-300 font-bold">
                  أنت تستعرض جميع الأسئلة الـ {totalQuestionsCount} كاملة
                </span>
              )}

              <button
                onClick={() => setStep('welcome')}
                className="text-xs text-gray-400 hover:text-white transition cursor-pointer"
              >
                حفظ والخروج المؤقت للقائمة
              </button>

              <button
                onClick={handleNextPage}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-95 text-white font-extrabold text-xs transition shadow-lg shadow-purple-600/25 flex items-center gap-1.5 cursor-pointer"
              >
                <span>
                  {safeCurrentPage < totalPages - 1
                    ? runnerViewMode === 'single_1'
                      ? `السؤال التالي (${safeCurrentPage + 2}/${totalPages})`
                      : `الصفحة التالية (${safeCurrentPage + 2}/${totalPages})`
                    : `إنهاء واستخراج التقرير الشامل (${answeredCount}/${totalQuestionsCount}) 📊`}
                </span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STAGE 6A: MULTIPLE INTELLIGENCES 360 REPORT ================= */}
        {step === 'results' && isMultipleIntelligences && testResult && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 custom-scrollbar max-w-5xl mx-auto w-full">
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-5 shadow-2xl">
              <div className="space-y-2 text-center md:text-right">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-emerald-300">
                  <span>تقرير معتمد وفق مقياس جاردنر وماكينزي (9 ذكاءات • 45 سؤالاً)</span>
                  <span>·</span>
                  <span className="text-gray-300">المعدل الكلي: {testResult.overallAverage}%</span>
                  {testResult.answeredCount !== undefined && (
                    <>
                      <span>·</span>
                      <span className="text-purple-300">
                        الأسئلة المجابة: {testResult.answeredCount}/{testResult.totalQuestions || 45}
                      </span>
                    </>
                  )}
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-white font-['Alexandria']">
                  ذكائك المهيمن هو:{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
                    {INTELLIGENCE_CATEGORIES[testResult.primaryIntelligence].titleAr}
                  </span>
                </h3>
                <p className="text-xs text-gray-300 max-w-xl leading-relaxed">
                  {generateExecutiveSummary(
                    `${testResult.overallAverage}%`,
                    INTELLIGENCE_CATEGORIES[testResult.topThree[1]].titleAr,
                    INTELLIGENCE_CATEGORIES[testResult.primaryIntelligence].titleAr
                  )}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 justify-center shrink-0">
                <button
                  onClick={handleDownloadPDFReport}
                  className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل التقرير PDF 📄</span>
                </button>

                <button
                  onClick={handleSaveToProfile}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-bold text-xs transition shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  {isSavedToProfile ? <Check className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                  <span>{isSavedToProfile ? 'تم الحفظ ✓' : 'حفظ بملفي'}</span>
                </button>

                <button
                  onClick={() => setIsViralShareOpen(true)}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs transition shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>مشاركة</span>
                </button>

                <button
                  onClick={() => setStep('welcome')}
                  className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition border border-white/10 cursor-pointer"
                  title="العودة للبطاريات"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Radar Chart (9 Axes) & Top 3 Podium */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-6 p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center shadow-lg">
                <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
                  <span className="font-extrabold text-white">
                    الرسم البياني الراداري للذكاءات التسعة
                  </span>
                  <span className="text-[11px] text-purple-300">انقر على أي زاوية للتفصيل</span>
                </div>
                <IntelligenceRadarChart
                  scores={testResult.categoryScores}
                  highlightCategory={activeCategoryDetail}
                  onSelectCategory={(cat) => setActiveCategoryDetail(cat)}
                />
              </div>

              <div className="lg:col-span-6 space-y-3">
                <h4 className="text-xs font-black text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>ترتيب الذكاءات التسعة من الأعلى إلى الأقل:</span>
                </h4>

                <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
                  {(Object.keys(INTELLIGENCE_CATEGORIES) as IntelligenceCategory[])
                    .sort(
                      (a, b) =>
                        testResult.categoryScores[b].percentage -
                        testResult.categoryScores[a].percentage
                    )
                    .map((cat, idx) => {
                      const meta = INTELLIGENCE_CATEGORIES[cat];
                      const score = testResult.categoryScores[cat];
                      return (
                        <div
                          key={cat}
                          onClick={() => setActiveCategoryDetail(cat)}
                          className={`p-3 rounded-2xl border transition cursor-pointer ${
                            activeCategoryDetail === cat
                              ? 'bg-purple-600/20 border-purple-400 shadow-md'
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-slate-400">#{idx + 1}</span>
                              <span>{meta.icon}</span>
                              <span className="font-extrabold text-xs sm:text-sm text-white">
                                {meta.titleAr}
                              </span>
                            </div>
                            <span className="font-mono font-black text-xs text-rose-400">
                              {score.percentage}% ({score.rawScore}/25)
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${meta.gradient} rounded-full`}
                              style={{ width: `${score.percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Deep Dive for Selected Intelligence */}
            {activeCategoryDetail && (
              <div className="p-5 sm:p-6 rounded-3xl bg-white/5 border border-purple-500/30 space-y-5 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">
                      {INTELLIGENCE_CATEGORIES[activeCategoryDetail].icon}
                    </span>
                    <div>
                      <h4 className="font-black text-white text-base font-['Alexandria']">
                        التحليل العميق لـ {INTELLIGENCE_CATEGORIES[activeCategoryDetail].titleAr} (
                        {testResult.categoryScores[activeCategoryDetail].percentage}%)
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        {INTELLIGENCE_CATEGORIES[activeCategoryDetail].scientificFoundationAr}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {INTELLIGENCE_CATEGORIES[activeCategoryDetail].subSkills.map((sub) => {
                    const subScore = testResult.subSkillScores[sub.key] || { percentage: 0 };
                    return (
                      <div
                        key={sub.key}
                        className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-white">{sub.titleAr}</span>
                          <span className="font-mono font-black text-xs text-purple-400">
                            {subScore.percentage}%
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-300 leading-relaxed">
                          {sub.descriptionAr}
                        </p>
                        <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                            style={{ width: `${subScore.percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/25 space-y-2">
                    <h5 className="text-xs font-black text-indigo-300 flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-indigo-400" />
                      <span>المهن والوظائف الأنسب لهذا الذكاء:</span>
                    </h5>
                    <ul className="text-xs text-gray-300 space-y-1.5 pr-2 list-disc list-inside">
                      {INTELLIGENCE_CATEGORIES[activeCategoryDetail].suggestedCareersAr.map(
                        (career, i) => (
                          <li key={i}>{career}</li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/25 space-y-2">
                    <h5 className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-emerald-400" />
                      <span>طرق الدراسة والتعلم المثلى:</span>
                    </h5>
                    <ul className="text-xs text-gray-300 space-y-1.5 pr-2 list-disc list-inside">
                      {INTELLIGENCE_CATEGORIES[activeCategoryDetail].optimalLearningStylesAr.map(
                        (style, i) => (
                          <li key={i}>{style}</li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/25 space-y-2">
                    <h5 className="text-xs font-black text-rose-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>نقاط الضعف والتحديات المحتملة:</span>
                    </h5>
                    <ul className="text-xs text-gray-300 space-y-1.5 pr-2 list-disc list-inside">
                      {INTELLIGENCE_CATEGORIES[activeCategoryDetail].weaknessAndRisksAr.map(
                        (risk, i) => (
                          <li key={i}>{risk}</li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/25 space-y-2">
                    <h5 className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <span>تمارين عملية لتطوير وتنمية هذا الذكاء:</span>
                    </h5>
                    <ul className="text-xs text-gray-300 space-y-1.5 pr-2 list-disc list-inside">
                      {INTELLIGENCE_CATEGORIES[activeCategoryDetail].developmentExercisesAr.map(
                        (exercise, i) => (
                          <li key={i}>{exercise}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= STAGE 6B: OBJECTIVE BATTERY 360 REPORT (IQ / EQ / CogAT) ================= */}
        {step === 'results' && !isMultipleIntelligences && objResult && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 custom-scrollbar max-w-5xl mx-auto w-full">
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-purple-950/80 border border-indigo-500/35 flex flex-col md:flex-row items-center justify-between gap-5 shadow-2xl">
              <div className="space-y-2 text-center md:text-right">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-sky-300">
                  <span>{objResult.batteryTitleAr}</span>
                  <span>·</span>
                  <span>الدرجة المعيارية: {objResult.standardScore}</span>
                  <span>·</span>
                  <span>المئين: {objResult.percentileRank}%</span>
                  <span>·</span>
                  <span className="text-emerald-300">
                    الإجابات الصحيحة: {objResult.correctOrHighCount}/{objResult.totalQuestions}
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-white font-['Alexandria']">
                  {objResult.classificationTitleAr}
                </h3>
                <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
                  {objResult.executiveSummaryAr}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 justify-center shrink-0">
                <button
                  onClick={handleDownloadPDFReport}
                  className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>تحميل التقرير PDF 📄</span>
                </button>

                <button
                  onClick={handleSaveToProfile}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  {isSavedToProfile ? <Check className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                  <span>{isSavedToProfile ? 'تم الحفظ ✓' : 'حفظ بملفي'}</span>
                </button>

                <button
                  onClick={() => setIsViralShareOpen(true)}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs transition shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>مشاركة</span>
                </button>

                <button
                  onClick={() => setStep('welcome')}
                  className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>اختبار آخر</span>
                </button>
              </div>
            </div>

            {/* Key Metrics Row (5 Precise Psychometric Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-[11px] text-gray-400">الدرجة المعيارية (IQ/EQ)</div>
                <div className="text-2xl font-black text-purple-400 font-mono mt-1">
                  {objResult.standardScore}
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">المتوسط المعياري: 100</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-[11px] text-gray-400">الترتيب المئيني (Percentile)</div>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                  {objResult.percentileRank}%
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">
                  أعلى من {objResult.percentileRank}% من العينة
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-[11px] text-gray-400">الإجابات الصحيحة</div>
                <div className="text-2xl font-black text-teal-400 font-mono mt-1">
                  {objResult.correctOrHighCount}/{objResult.totalQuestions}
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">
                  دقة مباشرة: {objResult.accuracyPercentage ?? objResult.overallPercentage}%
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-[11px] text-gray-400">النسبة الموزونة بالصعوبة</div>
                <div className="text-2xl font-black text-sky-400 font-mono mt-1">
                  {objResult.overallPercentage}%
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">موزونة بمعامل صعوبة الأسئلة</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center col-span-2 sm:col-span-1">
                <div className="text-[11px] text-gray-400">الزمن المستغرق</div>
                <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                  {formatTimer(objResult.timeSpentSeconds)}
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">
                  من أصل {currentBatteryMeta.recommendedMinutes}:00 دقيقة
                </div>
              </div>
            </div>

            {/* Domains Breakdown */}
            <div className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-4">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                <span>تحليل الأبعاد المعرفية والفرعية للبطارية:</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {objResult.domainScores.map((dom) => (
                  <div
                    key={dom.domainKey}
                    className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{dom.domainTitleAr}</span>
                      <span className="font-mono font-bold" style={{ color: dom.color }}>
                        {dom.percentage}% ({dom.correctCount ?? 0}/{dom.totalCount ?? 6}) · {dom.levelAr}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${dom.percentage}%`, backgroundColor: dom.color }}
                      />
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      {dom.interpretationAr}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths, Growth & Careers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <h5 className="text-xs font-black text-emerald-300">✨ أبرز نقاط القوة:</h5>
                <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                  {objResult.strengthsAr.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <h5 className="text-xs font-black text-amber-300">💡 توصيات التطوير الذاتي:</h5>
                <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                  {objResult.growthRecommendationsAr.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-2">
                <h5 className="text-xs font-black text-indigo-300">💼 المسارات المهنية الملائمة:</h5>
                <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                  {objResult.suggestedCareersAr.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Question-by-Question Answer Key & Scientific Explanation Audit */}
            {objResult.questionReview && objResult.questionReview.length > 0 && (
              <div className="p-5 rounded-3xl bg-white/5 border border-purple-500/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <ListChecks className="w-5 h-5 text-purple-400" />
                    <div>
                      <h4 className="text-sm font-black text-white">
                        مراجعة الإجابات ومفتاح الحل العلمي المحكّم ({objResult.totalQuestions} سؤالاً)
                      </h4>
                      <p className="text-[11px] text-gray-400">
                        كشف تفصيلي شفاف لكل سؤال وإجابتك عليه مقارنة بالإجابة العلمية المعتمدة مع شرح القاعدة
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-white/10 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setAuditFilter('all')}
                        className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
                          auditFilter === 'all' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        الكل ({objResult.questionReview.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuditFilter('correct')}
                        className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
                          auditFilter === 'correct'
                            ? 'bg-emerald-600 text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        الصحيحة ({objResult.questionReview.filter((q) => q.isCorrect).length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuditFilter('incorrect')}
                        className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
                          auditFilter === 'incorrect'
                            ? 'bg-rose-600 text-white'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        الخاطئة ({objResult.questionReview.filter((q) => !q.isCorrect).length})
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowQuestionAudit((prev) => !prev)}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white cursor-pointer"
                    >
                      {showQuestionAudit ? 'طي القائمة' : 'عرض القائمة'}
                    </button>
                  </div>
                </div>

                {showQuestionAudit && (
                  <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
                    {filteredAuditQuestions.map((item) => (
                      <div
                        key={item.questionNumber}
                        className={`p-3.5 rounded-2xl border text-xs space-y-2 ${
                          item.isCorrect
                            ? 'bg-emerald-950/15 border-emerald-500/30'
                            : 'bg-rose-950/15 border-rose-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded-md font-mono font-bold ${
                                item.isCorrect
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : 'bg-rose-500/20 text-rose-300'
                              }`}
                            >
                              سؤال {item.questionNumber} {item.isCorrect ? '✓ إجابة صحيحة' : '✗ إجابة غير دقيقة'}
                            </span>
                            <span className="text-sky-300 font-bold">{item.domainTitleAr}</span>
                          </div>
                          <span className="font-mono text-[11px] text-gray-400">
                            الدرجة: {item.scoreEarned}/100
                          </span>
                        </div>

                        <p className="font-bold text-white leading-relaxed">{item.promptAr}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          <div className="p-2 rounded-xl bg-black/40 border border-white/10">
                            <span className="text-gray-400 block text-[10px]">إجابتك المختارة:</span>
                            <span
                              className={`font-bold ${
                                item.isCorrect ? 'text-emerald-300' : 'text-rose-300'
                              }`}
                            >
                              {item.selectedLabelAr}
                            </span>
                          </div>
                          <div className="p-2 rounded-xl bg-black/40 border border-emerald-500/25">
                            <span className="text-gray-400 block text-[10px]">
                              الإجابة العلمية المعتمدة:
                            </span>
                            <span className="font-bold text-emerald-300">{item.correctLabelAr}</span>
                          </div>
                        </div>

                        <div className="text-[11px] text-indigo-200 bg-indigo-950/30 border border-indigo-500/20 rounded-xl p-2 flex items-start gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                          <span>
                            <strong>التفسير العلمي:</strong> {item.explanationAr}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Permanent Bottom Academic Conclusion & APA References */}
            <PsychometricAcademicConclusion variant="modal" />
          </div>
        )}

        {/* Viral Share Modal (Supports both Multiple Intelligences and Objective Batteries) */}
        {(testResult || objResult) && (
          <ViralShareModal
            isOpen={isViralShareOpen}
            onClose={() => setIsViralShareOpen(false)}
            titleAr={currentViralShareTitle}
            shareText={currentViralShareText}
            categoryTagAr={currentViralShareCategory}
          />
        )}
      </motion.div>
    </div>
  );
};
