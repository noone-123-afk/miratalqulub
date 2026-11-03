import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  ShieldCheck,
  Layers,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  Share2,
  Copy,
  Check,
  MessageCircle,
  Bookmark,
  BookmarkCheck,
  Send,
  Linkedin,
  Zap,
  Sliders,
  Heart,
  Target,
  Compass,
  FileDown,
  RotateCcw,
  AlertTriangle,
  ListChecks,
  Eye,
} from 'lucide-react';
import {
  ASSESSMENTS_CATALOG,
  AssessmentType,
  AssessmentCategory,
  getQuestionsForAssessment,
  calculatePsychometricReport,
  PsychometricReport,
  TestQuestion,
} from '../data/psychologySuiteData';
import { soundManager } from '../utils/sound';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { saveUserPsychologyReport } from '../services/userHistoryService';
import { exportPsychometricReportAsPDF } from '../utils/pdfReportGenerator';
import {
  PsychometricAcademicIntro,
  PsychometricAcademicConclusion,
  ScientificClinicalDisclaimerBanner,
} from './PsychometricAcademicFraming';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  initialTestId?: AssessmentType | null;
  onAssessmentCompleted?: (report: PsychometricReport) => void;
  onOpenDashboard?: (initialTab?: 'overview' | 'partner' | 'share' | 'matches' | 'history' | 'cattell_16pf' | 'questionnaire') => void;
}

function openExternalShareLink(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export const PsychologyTestsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  userName = 'المستخدم',
  initialTestId = null,
  onAssessmentCompleted,
  onOpenDashboard,
}) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { theme } = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<AssessmentCategory | 'all'>('all');
  const [selectedTest, setSelectedTest] = useState<AssessmentType | null>(initialTestId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [runnerViewMode, setRunnerViewMode] = useState<'single' | 'page5' | 'all'>('single');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeReport, setActiveReport] = useState<PsychometricReport | null>(null);
  const [isSavedToProfile, setIsSavedToProfile] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [clusterViewMode, setClusterViewMode] = useState<'clusters' | 'global5' | 'all'>('clusters');
  const [unansweredWarning, setUnansweredWarning] = useState<number[]>([]);
  const [showAuditTable, setShowAuditTable] = useState(false);
  const [savedReportsByTest, setSavedReportsByTest] = useState<Record<string, PsychometricReport>>({});

  // Load any saved reports from localStorage so catalog cards show completion status & direct PDF download
  const refreshSavedReportsMap = () => {
    try {
      const map: Record<string, PsychometricReport> = {};
      ASSESSMENTS_CATALOG.forEach((item) => {
        const raw = localStorage.getItem(`psychology_report_${item.id}`);
        if (raw) {
          const parsed = JSON.parse(raw) as PsychometricReport;
          if (parsed && parsed.testId) {
            map[item.id] = parsed;
          }
        }
      });
      setSavedReportsByTest(map);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (isOpen) {
      refreshSavedReportsMap();
      if (initialTestId) {
        handleSelectTest(initialTestId);
      }
    }
  }, [isOpen, initialTestId]);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  const handleSelectTest = (testId: AssessmentType) => {
    soundManager.playTab();
    setSelectedTest(testId);
    setActiveReport(null);
    setIsSavedToProfile(false);
    setClusterViewMode('clusters');
    setUnansweredWarning([]);

    // Restore auto-saved progress from localStorage if available
    try {
      const savedRaw = localStorage.getItem(`mirat_psych_autosave_${testId}`);
      if (savedRaw) {
        const parsed = JSON.parse(savedRaw);
        if (parsed && parsed.answers && typeof parsed.currentQuestionIndex === 'number') {
          setAnswers(parsed.answers);
          setCurrentQuestionIndex(parsed.currentQuestionIndex);
          setTimeout(scrollToTop, 40);
          return;
        }
      }
    } catch {
      // ignore parse errors
    }

    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeout(scrollToTop, 40);
  };

  const handleViewSavedReport = (rep: PsychometricReport, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundManager.playTap();
    setSelectedTest(rep.testId);
    setActiveReport(rep);
    setIsSavedToProfile(true);
    setTimeout(scrollToTop, 40);
  };

  const handleResetCurrentTest = () => {
    if (!selectedTest) return;
    soundManager.playTap();
    try {
      localStorage.removeItem(`mirat_psych_autosave_${selectedTest}`);
    } catch {
      // ignore
    }
    setAnswers({});
    setCurrentQuestionIndex(0);
    setUnansweredWarning([]);
    scrollToTop();
  };

  const finalizeAssessment = (finalAnswers: Record<string, string>) => {
    if (!selectedTest) return;
    const questions = getQuestionsForAssessment(selectedTest);
    const missingIndices: number[] = [];
    questions.forEach((q, idx) => {
      if (!finalAnswers[q.id]) {
        missingIndices.push(idx);
      }
    });

    if (missingIndices.length > 0) {
      soundManager.playTap();
      setUnansweredWarning(missingIndices);
      setCurrentQuestionIndex(missingIndices[0]);
      scrollToTop();
      return;
    }

    setUnansweredWarning([]);
    try {
      localStorage.removeItem(`mirat_psych_autosave_${selectedTest}`);
    } catch {
      // ignore
    }

    const report = calculatePsychometricReport(selectedTest, finalAnswers, userName);
    soundManager.playRoundPass();
    setActiveReport(report);

    // Auto-save locally and Firestore
    saveUserPsychologyReport(user, report);
    setIsSavedToProfile(true);
    refreshSavedReportsMap();

    if (onAssessmentCompleted) {
      onAssessmentCompleted(report);
    }
    setTimeout(scrollToTop, 50);
  };

  const handleSelectOption = (questionId: string, optionId: string, autoAdvance = true) => {
    soundManager.playTap();
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    const questions = selectedTest ? getQuestionsForAssessment(selectedTest) : [];
    const remainingMissing = unansweredWarning.filter((idx) => !newAnswers[questions[idx]?.id]);
    setUnansweredWarning(remainingMissing);

    if (selectedTest) {
      try {
        localStorage.setItem(
          `mirat_psych_autosave_${selectedTest}`,
          JSON.stringify({
            answers: newAnswers,
            currentQuestionIndex,
            updatedAt: new Date().toISOString(),
          })
        );
      } catch {
        // ignore storage quota errors
      }
    }

    if (autoAdvance && runnerViewMode === 'single') {
      if (currentQuestionIndex < questions.length - 1) {
        const nextIdx = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIdx);
        scrollToTop();
      } else {
        finalizeAssessment(newAnswers);
      }
    }
  };

  const triggerPdfExportForReport = (rep: PsychometricReport, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundManager.playTap();
    const currentCatalog = ASSESSMENTS_CATALOG.find((c) => c.id === rep.testId);

    const extraSections: { title: string; badge?: string; content: string; items?: string[] }[] = [];

    if (rep.cattellGlobalFactors && rep.cattellGlobalFactors.length > 0) {
      extraSections.push({
        title: 'العوامل العالمية الخمسة الكبرى لمقياس كاتل (16PF Global Factors)',
        badge: 'تحليل عاملي من الدرجة الثانية',
        content: 'ملخص الأبعاد الكبرى المستخلصة من السمات الـ 16 الأولية لريموند كاتل:',
        items: rep.cattellGlobalFactors.map(
          (gf) => `${gf.labelAr} — النسبة: ${gf.score}% (Sten ${gf.sten}/10): ${gf.plainExplanationAr}`
        ),
      });
    }

    if (rep.userStrengthsAr?.length) {
      extraSections.push({
        title: 'نقاط القوة والسمات السلوكية المرصودة من إجاباتك',
        badge: 'تحليل سلوكي',
        content: 'أبرز السمات الإيجابية المرصودة إحصائياً بناءً على إجاباتك الفعلية:',
        items: rep.userStrengthsAr,
      });
    }

    if (rep.idealPartnerProfile) {
      extraSections.push({
        title: 'مواصفات الشريك الأكثر توافقاً وانسجاماً معك سيكومترياً',
        badge: rep.idealPartnerProfile.recommendedArchetypeAr,
        content: `${rep.idealPartnerProfile.emotionalNeedsAr} — ${rep.idealPartnerProfile.communicationStyleAr}`,
        items: [
          rep.idealPartnerProfile.lifestyleHarmonyAr,
          ...(rep.idealPartnerProfile.complementaryTraits || []),
        ],
      });
    }

    exportPsychometricReportAsPDF({
      reportTitle: rep.testTitleAr,
      subTitle: currentCatalog?.titleEn || 'Psychometric Personality Assessment',
      scientificBasis: currentCatalog?.scientificReference || 'مختبر القياس السيكومتري المعتمد',
      userName,
      completedAt: rep.completionDate || new Date().toLocaleDateString('ar-JO'),
      overallScoreLabel: 'مؤشر الاتزان والنضج السيكومتري (المئين المعياري)',
      overallScoreValue: `${rep.totalScore}% (المئين ${rep.overallPercentile}%)`,
      cognitiveFingerprintTitle: rep.primaryArchetypeAr,
      executiveSummary: `${rep.summaryAr || ''} — ${rep.validityMessageAr}`,
      metrics: rep.dimensionScores.map((d) => ({
        label: d.factorCode ? `[${d.factorCode}] ${d.labelAr}` : d.labelAr,
        scorePercent: d.score,
        levelLabel: d.stenScore ? `${d.levelAr} (Sten ${d.stenScore}/10)` : d.levelAr,
        rawText: d.plainExplanationAr ? `${d.plainExplanationAr} — ${d.analysisAr}` : d.analysisAr,
        color: d.color || '#8b5cf6',
      })),
      sections: extraSections,
      careersOrRecommendations: rep.userAspirationsAr || [],
      questionAudit: rep.questionAudit?.map((qa) => ({
        questionNumber: qa.questionNumber,
        questionText: qa.promptAr,
        userAnswer: qa.selectedOptionAr,
        correctAnswerOrTrait: `${qa.traitMeasuredAr} (${qa.scientificTraitEn})`,
        isCorrectOrHigh: qa.scoreWeight >= 3,
        pointsEarned: `${qa.scoreWeight}/${qa.maxWeight}`,
        explanationAr: `يقيس هذا البند بُعد (${qa.traitMeasuredAr}) وحصلت إجابتك على وزن ${qa.scoreWeight} من ${qa.maxWeight}.`,
      })),
    });
  };

  const handleManualSave = async () => {
    if (!activeReport) return;
    soundManager.playTap();
    await saveUserPsychologyReport(user, activeReport);
    setIsSavedToProfile(true);
    refreshSavedReportsMap();
  };

  // Social Sharing Functions
  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://miratalqulub.com';
  const shareText = activeReport
    ? `🔮 قمت بإجراء تحليل الشخصية العلمي المعتمد على منصة «مِرآة القلوب»:\n\n✨ المقياس: ${activeReport.testTitleAr}\n👑 النمط السيكومتري: ${activeReport.primaryArchetypeAr}\n📈 نسبة النضج والتوافق: ${activeReport.totalScore}% (المئين ${activeReport.overallPercentile}%)\n\nاكتشف نمطك الحقيقي وشريكك المناسب:\n${currentUrl}`
    : '';

  const handleCopyLink = () => {
    soundManager.playTap();
    navigator.clipboard.writeText(
      `${currentUrl}/?psychologyReport=${encodeURIComponent(activeReport?.primaryArchetypeAr || '')}`
    );
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleShareWhatsApp = () => {
    soundManager.playTap();
    openExternalShareLink(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`);
  };

  const handleShareTwitter = () => {
    soundManager.playTap();
    const tweet = `🔮 قمت بإجراء تحليل الشخصية المعتمد على منصة «مِرآة القلوب» وخرجت بنمط (${activeReport?.primaryArchetypeAr}) بنسبة اتزان ${activeReport?.totalScore}%! 🧠✨\n\nاكتشف نمطك ومواصفات شريكك:\n${currentUrl}`;
    openExternalShareLink(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`);
  };

  const handleShareTelegram = () => {
    soundManager.playTap();
    openExternalShareLink(
      `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`
    );
  };

  const handleShareLinkedIn = () => {
    soundManager.playTap();
    openExternalShareLink(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
    );
  };

  const handleShareFacebook = () => {
    soundManager.playTap();
    openExternalShareLink(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    );
  };

  const currentQuestions = selectedTest ? getQuestionsForAssessment(selectedTest) : [];
  const currentQ: TestQuestion | undefined = currentQuestions[currentQuestionIndex];
  const answeredCount = currentQuestions.filter((q) => Boolean(answers[q.id])).length;
  const progressPercent =
    currentQuestions.length > 0 ? Math.round((answeredCount / currentQuestions.length) * 100) : 0;

  // Page 5 slicing
  const page5Index = Math.floor(currentQuestionIndex / 5);
  const totalPages5 = Math.ceil(currentQuestions.length / 5);
  const page5Questions = currentQuestions.slice(page5Index * 5, page5Index * 5 + 5);

  // Render Symmetrical Inkblot Graphic for Rorschach Test
  const renderInkblotGraphic = (plateIndex: number) => {
    const hues = [
      { c1: '#ec4899', c2: '#8b5cf6', c3: '#f43f5e' },
      { c1: '#38bdf8', c2: '#6366f1', c3: '#10b981' },
      { c1: '#f59e0b', c2: '#ec4899', c3: '#a855f7' },
      { c1: '#14b8a6', c2: '#3b82f6', c3: '#f43f5e' },
    ];
    const palette = hues[plateIndex % hues.length];
    return (
      <div className="w-full max-w-sm mx-auto h-40 sm:h-48 bg-gradient-to-b from-[#1b1433] to-[#0d091a] rounded-2xl border border-purple-500/30 p-3 mb-4 flex items-center justify-center relative shadow-inner overflow-hidden">
        <svg viewBox="0 0 320 200" className="w-full h-full drop-shadow-[0_0_12px_rgba(244,63,94,0.4)]">
          <defs>
            <radialGradient id={`inkblotGrad_${plateIndex}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={palette.c1} stopOpacity="0.9" />
              <stop offset="45%" stopColor={palette.c2} stopOpacity="0.8" />
              <stop offset="85%" stopColor="#1e1638" stopOpacity="0.95" />
            </radialGradient>
            <filter id="inkBlur">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
            </filter>
          </defs>

          <g filter="url(#inkBlur)">
            <path
              d="M160 30 C130 10, 90 25, 60 55 C30 85, 40 135, 75 160 C110 185, 140 150, 160 170 Z"
              fill={`url(#inkblotGrad_${plateIndex})`}
            />
            <circle cx="100" cy="85" r="18" fill={palette.c3} opacity="0.6" />
            <path d="M160 90 Q110 120 80 105 Q120 70 160 85 Z" fill={palette.c2} opacity="0.85" />
          </g>

          <g filter="url(#inkBlur)">
            <path
              d="M160 30 C190 10, 230 25, 260 55 C290 85, 280 135, 245 160 C210 185, 180 150, 160 170 Z"
              fill={`url(#inkblotGrad_${plateIndex})`}
            />
            <circle cx="220" cy="85" r="18" fill={palette.c3} opacity="0.6" />
            <path d="M160 90 Q210 120 240 105 Q200 70 160 85 Z" fill={palette.c2} opacity="0.85" />
          </g>

          <ellipse cx="160" cy="100" rx="14" ry="70" fill={palette.c2} opacity="0.8" />
          <ellipse cx="160" cy="50" rx="8" ry="18" fill={palette.c1} opacity="0.9" />
        </svg>

        <span className="absolute bottom-2 right-3 text-[10px] text-purple-300 font-mono bg-black/60 px-2 py-0.5 rounded-md border border-purple-500/20">
          لوحة رورشاخ الإسقاطية #{plateIndex + 1} 🎨
        </span>
      </div>
    );
  };

  // Helper for Cattell 16PF 4-Cluster Grouping for Non-Specialists
  const get16PFClusters = (rep: PsychometricReport) => {
    const scores = rep.dimensionScores;
    const findScore = (key: string) => scores.find((s) => s.key === key)?.score || 50;

    const cluster1Factors = ['warmth', 'liveliness', 'social_boldness', 'privateness'];
    const cluster1Avg = Math.round(
      cluster1Factors.reduce((acc, k) => acc + findScore(k), 0) / cluster1Factors.length
    );

    const cluster2Factors = ['stability', 'vigilance', 'apprehension', 'tension'];
    const cluster2Avg = Math.round(
      cluster2Factors.reduce((acc, k) => acc + findScore(k), 0) / cluster2Factors.length
    );

    const cluster3Factors = ['reasoning', 'abstractedness', 'openness_to_change', 'sensitivity'];
    const cluster3Avg = Math.round(
      cluster3Factors.reduce((acc, k) => acc + findScore(k), 0) / cluster3Factors.length
    );

    const cluster4Factors = ['dominance', 'rule_consciousness', 'self_reliance', 'perfectionism'];
    const cluster4Avg = Math.round(
      cluster4Factors.reduce((acc, k) => acc + findScore(k), 0) / cluster4Factors.length
    );

    return [
      {
        id: 'social_warmth',
        titleAr: 'أسلوب التواصل والتفاعل الإنساني',
        icon: '💬',
        score: cluster1Avg,
        factors: 'العوامل المقاسة: الدفء (A)، الحيوية (F)، الجرأة (H)، الكياسة (N)',
        summary:
          cluster1Avg >= 68
            ? 'حرارة مشاعر عالية وقدرة ممتازة على كسر الجليد وبث المودة مع صيانة الخصوصية الراقية.'
            : cluster1Avg >= 45
            ? 'توازن رصين بين الود الاجتماعي والحفاظ على الخصوصية والحدود المريحة.'
            : 'تفضيل للهدوء والخصوصية العالية والعلاقات المنتقاة بعيداً عن المجاملات الواسعة.',
        color: '#f43f5e',
      },
      {
        id: 'emotional_resilience',
        titleAr: 'الصلابة العاطفية وإدارة الضغوط',
        icon: '🛡️',
        score: cluster2Avg,
        factors: 'العوامل المقاسة: الاستقرار (C)، اليقظة (L)، الاطمئنان (O)، السكينة (Q4)',
        summary:
          cluster2Avg >= 68
            ? 'قوة تحمل عالية أمام تقلبات الحياة، قدرة على امتصاص التوتر، ونباهة تحمي الأسرة.'
            : cluster2Avg >= 45
            ? 'اتزان انفعالي معتدل يتعامل بواقعية مع الضغوط ويستعيد سكينته تدريجياً.'
            : 'حساسية وجدانية مرهفة تتأثر بالتوتر وتحتاج لبيئة زوجية مطمئنة وهادئة.',
        color: '#10b981',
      },
      {
        id: 'cognitive_creativity',
        titleAr: 'التفكير التحليلي، الخيال، والانفتاح',
        icon: '💡',
        score: cluster3Avg,
        factors: 'العوامل المقاسة: التفكير المنطقي (B)، الحساسية (I)، الخيال (M)، التجديد (Q1)',
        summary:
          cluster3Avg >= 68
            ? 'قدرة عالية على التحليل المنطقي، خيال خصب، وشغف بالتطوير والتجديد المستمر.'
            : cluster3Avg >= 45
            ? 'جمع متوازن بين المنطق العملي، الذوق الرفيع، والانفتاح المدروس.'
            : 'واقعية عملية مباشرة تركز على الحاضر الملموس والطرق المجربة الواضحة.',
        color: '#38bdf8',
      },
      {
        id: 'leadership_lifestyle',
        titleAr: 'الانضباط، القيادة، وأسلوب الحياة',
        icon: '⚖️',
        score: cluster4Avg,
        factors: 'العوامل المقاسة: القيادة (E)، الضمير (G)، الاستقلالية (Q2)، الدقة (Q3)',
        summary:
          cluster4Avg >= 68
            ? 'التزام أخلاقي صارم بالواجبات، دقة تنظيمية، وقدرة عالية على القيادة والاعتماد على الذات.'
            : cluster4Avg >= 45
            ? 'إدارة متزنة للمسؤوليات تجمع بين الالتزام والمرونة والتعاون الزوجي.'
            : 'ميل للعفوية والمرونة والمسالمة وتفضيل العمل التشاركي غير المقيد.',
        color: '#a855f7',
      },
    ];
  };

  // Helper for Eysenck 4 Temperaments
  const getEysenckTemperament = (rep: PsychometricReport) => {
    const extraDim = rep.dimensionScores.find((d) => d.key === 'eysenck_extraversion')?.score || 50;
    const stabDim = rep.dimensionScores.find((d) => d.key === 'eysenck_stability')?.score || 50;
    const isExtra = extraDim >= 52;
    const isStab = stabDim >= 52;

    if (isExtra && isStab) {
      return {
        key: 'sanguine',
        titleAr: 'المزاج الدموي (Sanguine) ☀️',
        tagAr: 'اجتماعي، قيادي، متفائل ومرن',
        desc: 'طاقة حيوية متدفقة، قدرة فطرية على نشر الإيجابية والتكيف السريع، وروح قيادية عفوية ومحبوبة.',
        partnerTip: 'يتوافق بشكل استثنائي مع الشريك البلغمي (Phlegmatic) الذي يمنحه السكينة والعمق والثبات.',
        quadrant: 'انبساط مرتفع + استقرار عصبي عالي',
        color: '#38bdf8',
      };
    } else if (isExtra && !isStab) {
      return {
        key: 'choleric',
        titleAr: 'المزاج الصفراوي (Choleric) 🔥',
        tagAr: 'شغوف، حاسم، مبادر وطموح',
        desc: 'طاقة متوثبة، إرادة حديدية، ورغبة قوية في تحقيق الأهداف والتأثير، مع سرعة استثارة تحتاج لبيئة هادئة.',
        partnerTip: 'يحتاج لشريك صبور متزن يتفهم طاقته ويحتويه برفق دون صدام مباشر.',
        quadrant: 'انبساط مرتفع + حساسية انفعالية',
        color: '#f97316',
      };
    } else if (!isExtra && isStab) {
      return {
        key: 'phlegmatic',
        titleAr: 'المزاج البلغمي (Phlegmatic) 🌊',
        tagAr: 'هادئ، حكيم، مسالم وسند موثوق',
        desc: 'أعصاب فولاذية، صبر عميق، سلام داخلي، وتجنب للمعارك الجانبية، مما يجعله ملاذاً آمناً لكل من حوله.',
        partnerTip: 'يتكامل بامتياز مع الشريك الدموي الحيوي (Sanguine) الذي يضفي طاقة وألواناً على هدوء حياته.',
        quadrant: 'انطواء هادئ + استقرار عصبي عالي',
        color: '#10b981',
      };
    } else {
      return {
        key: 'melancholic',
        titleAr: 'المزاج السوداوي (Melancholic) 🌙',
        tagAr: 'متأمل، مرهف الحس، مخلص ومفكر عميق',
        desc: 'حس وجداني مرهف، دقة ملاحظة للأمور الخفية، إخلاص نادر ومشاعر صادقة تبحث عن الأمان والتقدير.',
        partnerTip: 'يحتاج لشريك إيجابي آمن يمنحه الدفء النفسي الدائم ويصون رهافة مشاعره.',
        quadrant: 'انطواء متأمل + حساسية انفعالية',
        color: '#a855f7',
      };
    }
  };

  const filteredCatalog =
    selectedCategory === 'all'
      ? ASSESSMENTS_CATALOG
      : ASSESSMENTS_CATALOG.filter((c) => c.category === selectedCategory);

  const renderSingleQuestionCard = (q: TestQuestion, qIdx: number, autoAdvance: boolean) => {
    const isMissing = unansweredWarning.includes(qIdx);
    return (
      <div
        key={q.id}
        className={`p-4 sm:p-5 rounded-2xl border transition mb-4 ${
          isMissing
            ? 'bg-rose-950/30 border-rose-500/60'
            : 'bg-white/5 border-white/10'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
            سؤال {qIdx + 1} من {currentQuestions.length}
          </span>
          {answers[q.id] ? (
            <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> تمت الإجابة
            </span>
          ) : (
            <span className="text-[11px] text-amber-300 font-medium">بانتظار إجابتك</span>
          )}
        </div>

        {selectedTest === 'rorschach' && renderInkblotGraphic(qIdx)}

        <h3 className="font-extrabold text-sm sm:text-base text-white leading-relaxed font-['Alexandria'] mb-2">
          {q.promptAr}
        </h3>
        {q.subPromptAr && (
          <p className="text-xs text-purple-300 mb-3 font-medium">💡 {q.subPromptAr}</p>
        )}

        <div className="space-y-2 mt-3">
          {q.options.map((opt) => {
            const isSelected = answers[q.id] === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(q.id, opt.id, autoAdvance)}
                className={`w-full p-3.5 rounded-2xl border text-right transition flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600/35 to-rose-600/35 border-purple-400 text-white shadow-md'
                    : 'bg-black/30 hover:bg-white/10 border-white/10 text-gray-200'
                }`}
              >
                <div className="space-y-1">
                  <span className="text-xs sm:text-sm font-semibold block leading-relaxed">
                    {opt.textAr}
                  </span>
                  <span className="text-[10px] text-purple-300/80 font-mono block">
                    [{opt.traitLabel} • {opt.scientificTrait}]
                  </span>
                </div>
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mr-2" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-white/30 shrink-0 mr-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className={`fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 backdrop-blur-md overflow-y-auto ${
        isAr ? 'text-right' : 'text-left'
      } ${isLight ? 'bg-slate-900/60' : 'bg-black/85'}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className={`glass-panel w-full max-w-4xl rounded-3xl p-5 sm:p-7 border shadow-2xl relative my-auto max-h-[93vh] flex flex-col overflow-hidden ${
          isLight
            ? 'bg-slate-900 border-purple-400/40 text-white'
            : 'border-white/20 text-white'
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-rose-500 p-0.5 shadow-lg shadow-purple-500/25 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#120d24] rounded-[14px] flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-extrabold text-base sm:text-xl text-white font-['Alexandria']">
                  {isAr
                    ? 'قسم مقاييس وتحليل الشخصية الاستكشافي والتثقيفي'
                    : 'Exploratory & Educational Personality Scales Suite'}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {isAr
                    ? 'أدوات استكشافية للوعي الذاتي + PDF مفعل 🔬'
                    : 'Exploratory Self-Discovery + PDF Export 🔬'}
                </span>
              </div>
              <p className="text-xs text-gray-300">
                {isAr
                  ? '8 مقاييس عالمية استكشافية (193 سؤالاً محكماً) مع تقارير Sten وPDF حقيقية قابلة للتحميل الفوري'
                  : '8 Validated Exploratory Scales (193 Items) with Sten Scores & Instant PDF Reports'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
            }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ================= VIEW 1: ASSESSMENT CATALOG ================= */}
        {!selectedTest && (
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar"
          >
            {/* Clinical & Scientific Exploratory Disclaimer Notice */}
            <ScientificClinicalDisclaimerBanner testType="personality" />

            {/* Permanent Top Academic Introduction (AR/EN + Dark/Light Mode) */}
            <PsychometricAcademicIntro variant="modal" focusScope="personality" />

            {/* Top Explanatory & Scientific Disclaimer Banner */}
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40 text-xs text-purple-200 space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm">
                  <Brain className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>الأساس المنهجي والعمق العلمي للمقاييس السيكومترية المعتمدة</span>
                </div>
                {onOpenDashboard && (
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      onClose();
                      onOpenDashboard('overview');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>فتح لوحة ملفي الشخصي السيكومتري</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <p className="leading-relaxed text-slate-300">
                تعتمد هذه المقاييس على نظريات علماء النفس العالميين الرائدين: ريموند كاتل (16PF)، كوستا ومكري (Big Five NEO-PI-R)، هانز آيزنك (EPQ-R)، هاثاواي وماكينلي (MMPI-2)، هيرمان رورشاخ وإكسنر، هنري موراي (TAT)، جون بولبي (ECR-R)، ودانيال جولمان (EQ). جميع النتائج تُحسب رياضياً من إجاباتك الفعلية مع خاصية تحميل التقرير بصيغة PDF حقيقية.
              </p>
            </div>

            {/* Spotlight Banner for Cattell 16PF & Eysenck EPQ (Simplified for Non-Specialists) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/50 to-pink-950/40 border border-purple-500/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="font-extrabold text-xs text-white">
                    مقاييس التحليل العاملي والمزاج البيولوجي (مبسطة لغير المختصين):
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  درجات معيارية Sten 1-10 ✨
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* 16PF Spotlight */}
                <div
                  onClick={() => handleSelectTest('sixteen_pf')}
                  className="p-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">📊</span>
                      <span className="font-bold text-xs text-white group-hover:text-purple-300 transition">
                        مقياس كاتل لـ 16 سمة (16PF) - تقرير مبسط لغير المختصين
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300">
                      32 سؤالاً تقيس 16 سمة أولية + 5 عوامل عالمية كبرى و4 مجموعات سلوكية مبسطة.
                    </p>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-purple-400 group-hover:-translate-x-1 transition-transform shrink-0 mr-2" />
                </div>

                {/* EPQ Spotlight */}
                <div
                  onClick={() => handleSelectTest('epq')}
                  className="p-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 cursor-pointer transition flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">🧬</span>
                      <span className="font-bold text-xs text-white group-hover:text-sky-300 transition">
                        نموذج آيزنك للأمزجة البيولوجية (EPQ-R)
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300">
                      24 سؤالاً لتحديد مزاجك العصبي الفطري (دموي، صفراوي، بلغمي، سوداوي) والشريك المكمل.
                    </p>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-sky-400 group-hover:-translate-x-1 transition-transform shrink-0 mr-2" />
                </div>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10 overflow-x-auto text-xs font-bold scrollbar-none">
              <button
                onClick={() => {
                  soundManager.playTab();
                  setSelectedCategory('all');
                }}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                جميع المقاييس (8)
              </button>
              <button
                onClick={() => {
                  soundManager.playTab();
                  setSelectedCategory('psychiatry_psychology');
                }}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
                  selectedCategory === 'psychiatry_psychology'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {isAr
                  ? '🧠 سمات الشخصية والاتزان (استكشافية)'
                  : '🧠 Personality Traits & Balance (Exploratory)'}
              </button>
              <button
                onClick={() => {
                  soundManager.playTab();
                  setSelectedCategory('projective');
                }}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
                  selectedCategory === 'projective'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🎨 الاختبارات الإسقاطية
              </button>
              <button
                onClick={() => {
                  soundManager.playTab();
                  setSelectedCategory('sociological');
                }}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
                  selectedCategory === 'sociological'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🤝 علوم الاجتماع والارتباط
              </button>
              <button
                onClick={() => {
                  soundManager.playTab();
                  setSelectedCategory('intellectual_cultural');
                }}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
                  selectedCategory === 'intellectual_cultural'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🌟 الفكر والتنمية البشرية (16PF & EQ)
              </button>
            </div>

            {/* Assessment Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {filteredCatalog.map((item) => {
                const savedRep = savedReportsByTest[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectTest(item.id)}
                    className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 transition cursor-pointer flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {item.badge}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {savedRep && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                              مكتمل ✓ {savedRep.totalScore}%
                            </span>
                          )}
                          <span className="text-[10px] text-gray-400 font-mono">
                            ⏱️ {item.estimatedMinutes} د • {item.questionCount} سؤالاً
                          </span>
                        </div>
                      </div>

                      <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition mb-1">
                        {item.titleAr}
                      </h4>
                      <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                        {item.shortDesc}
                      </p>
                      <div className="mt-2 text-[10px] text-gray-400 flex items-center gap-1">
                        <span className="text-purple-400 shrink-0">المرجع العلمي:</span>
                        <span className="truncate">{item.scientificReference}</span>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between gap-2 flex-wrap">
                      {savedRep ? (
                        <div className="flex items-center gap-1.5 w-full justify-between">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => handleViewSavedReport(savedRep, e)}
                              className="px-2.5 py-1 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3 h-3" />
                              <span>عرض التقرير</span>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => triggerPdfExportForReport(savedRep, e)}
                              className="px-2.5 py-1 rounded-xl bg-amber-500/25 hover:bg-amber-500/40 border border-amber-400/40 text-amber-200 text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                            >
                              <FileDown className="w-3 h-3" />
                              <span>تحميل PDF</span>
                            </button>
                          </div>
                          <span className="text-[11px] text-purple-300 font-bold flex items-center gap-1">
                            <span>إعادة الاختبار</span>
                            <ArrowLeft className="w-3 h-3" />
                          </span>
                        </div>
                      ) : (
                        <>
                          <span className="text-xs text-purple-300 font-semibold">
                            ابدأ الاختبار الآن ({item.questionCount} سؤالاً)
                          </span>
                          <ArrowLeft className="w-3.5 h-3.5 text-purple-300 group-hover:-translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Permanent Bottom Academic Conclusion & APA References */}
            <PsychometricAcademicConclusion variant="modal" />
          </div>
        )}

        {/* ================= VIEW 2: QUESTION RUNNER ================= */}
        {selectedTest && !activeReport && currentQ && (
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto pr-1 flex flex-col justify-between custom-scrollbar"
          >
            <div>
              {/* Clinical & Scientific Disclaimer at the start of the active test */}
              <ScientificClinicalDisclaimerBanner
                testType="personality"
                testTitleAr={ASSESSMENTS_CATALOG.find((c) => c.id === selectedTest)?.titleAr}
                testTitleEn={ASSESSMENTS_CATALOG.find((c) => c.id === selectedTest)?.titleEn}
                compact
              />

              {/* Top Progress, View Mode Switcher & Back */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs">
                <button
                  onClick={() => {
                    soundManager.playTap();
                    setSelectedTest(null);
                  }}
                  className="flex items-center gap-1 text-gray-300 hover:text-white transition cursor-pointer bg-white/5 px-3 py-1.5 rounded-xl border border-white/10"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>العودة لقائمة المقاييس</span>
                </button>

                {/* View Mode Switcher */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-black/50 border border-white/10 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setRunnerViewMode('single')}
                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                      runnerViewMode === 'single'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    سؤال تلو الآخر
                  </button>
                  <button
                    type="button"
                    onClick={() => setRunnerViewMode('page5')}
                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                      runnerViewMode === 'page5'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    5 أسئلة بالصفحة
                  </button>
                  <button
                    type="button"
                    onClick={() => setRunnerViewMode('all')}
                    className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                      runnerViewMode === 'all'
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    جميع الأسئلة ({currentQuestions.length})
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {answeredCount > 0 && (
                    <button
                      onClick={handleResetCurrentTest}
                      title="إعادة الاختبار من السؤال الأول"
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-300 hover:text-rose-300 border border-white/10 text-[11px] transition cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>إعادة</span>
                    </button>
                  )}
                  <span className="text-gray-300 font-mono text-[11px]">
                    {answeredCount}/{currentQuestions.length} مكتمل ({progressPercent}%)
                  </span>
                  <div className="w-20 sm:w-28 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-rose-500 transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Interactive Question Map Bar */}
              <div className="mb-3 p-2.5 rounded-2xl bg-black/40 border border-white/10">
                <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1.5">
                  <span>خريطة الأسئلة التفاعلية (انقر للانتقال المباشر):</span>
                  <span className="text-emerald-400 font-mono">
                    تمت الإجابة على {answeredCount} من {currentQuestions.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {currentQuestions.map((q, idx) => {
                    const isAns = Boolean(answers[q.id]);
                    const isCurr = idx === currentQuestionIndex && runnerViewMode === 'single';
                    const isWarn = unansweredWarning.includes(idx);
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          soundManager.playTap();
                          setCurrentQuestionIndex(idx);
                          if (runnerViewMode === 'all') {
                            setRunnerViewMode('single');
                          }
                        }}
                        className={`w-7 h-7 rounded-lg text-[11px] font-mono font-bold transition cursor-pointer flex items-center justify-center border ${
                          isCurr
                            ? 'bg-purple-600 text-white border-purple-300 ring-2 ring-purple-400/50'
                            : isWarn
                            ? 'bg-rose-600/40 text-rose-200 border-rose-400 animate-pulse'
                            : isAns
                            ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/40'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Unanswered Warning Banner */}
              {unansweredWarning.length > 0 && (
                <div className="mb-3 p-3 rounded-2xl bg-rose-950/60 border border-rose-500/50 flex items-center justify-between gap-2 text-xs text-rose-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>
                      يُرجى الإجابة على جميع الأسئلة لضمان الدقة العلمية (تبقى {unansweredWarning.length}{' '}
                      سؤالاً غير مجاب، أولها سؤال رقم {unansweredWarning[0] + 1}).
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentQuestionIndex(unansweredWarning[0]);
                      setRunnerViewMode('single');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px] shrink-0 cursor-pointer"
                  >
                    انتقل للسؤال {unansweredWarning[0] + 1}
                  </button>
                </div>
              )}

              {/* Specialized helper cues for 16PF and EPQ for non-specialists */}
              {selectedTest === 'sixteen_pf' && (
                <div className="mb-3 px-3.5 py-2 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-purple-200">
                    <Sliders className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="font-semibold">
                      مقياس كاتل لـ 16 سمة (16PF) — 32 بنداً عاملياً بدرجات معيارية Sten 1-10
                    </span>
                  </div>
                  <span className="text-[11px] text-purple-300 font-medium hidden sm:inline">
                    تقرير مبسط لغير المختصين + تحليل العوامل الـ 16
                  </span>
                </div>
              )}

              {selectedTest === 'epq' && (
                <div className="mb-3 px-3.5 py-2 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-sky-200">
                    <Zap className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className="font-semibold">نموذج آيزنك للأمزجة البيولوجية (EPQ-R)</span>
                  </div>
                  <span className="text-[11px] text-sky-300 font-medium hidden sm:inline">
                    استبيان عصبي فطري مبسط (24 سؤالاً)
                  </span>
                </div>
              )}

              {/* Questions Display Based on Mode */}
              {runnerViewMode === 'single' && renderSingleQuestionCard(currentQ, currentQuestionIndex, true)}

              {runnerViewMode === 'page5' && (
                <div>
                  {page5Questions.map((q, i) =>
                    renderSingleQuestionCard(q, page5Index * 5 + i, false)
                  )}
                  <div className="flex items-center justify-between gap-3 my-3">
                    <button
                      type="button"
                      disabled={page5Index === 0}
                      onClick={() => {
                        soundManager.playTap();
                        setCurrentQuestionIndex(Math.max(0, (page5Index - 1) * 5));
                        scrollToTop();
                      }}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-40 text-white text-xs font-bold cursor-pointer"
                    >
                      الصفحة السابقة
                    </button>
                    <span className="text-xs text-gray-300 font-mono">
                      صفحة {page5Index + 1} من {totalPages5}
                    </span>
                    {page5Index < totalPages5 - 1 ? (
                      <button
                        type="button"
                        onClick={() => {
                          soundManager.playTap();
                          setCurrentQuestionIndex((page5Index + 1) * 5);
                          scrollToTop();
                        }}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer"
                      >
                        الصفحة التالية
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => finalizeAssessment(answers)}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-extrabold cursor-pointer shadow-lg"
                      >
                        إصدار التقرير السيكومتري الدقيق ✓
                      </button>
                    )}
                  </div>
                </div>
              )}

              {runnerViewMode === 'all' && (
                <div>
                  {currentQuestions.map((q, idx) => renderSingleQuestionCard(q, idx, false))}
                </div>
              )}
            </div>

            {/* Bottom Navigation & Submit Bar */}
            <div className="pt-3 mt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                {runnerViewMode === 'single' && (
                  <>
                    <button
                      type="button"
                      disabled={currentQuestionIndex === 0}
                      onClick={() => {
                        soundManager.playTap();
                        setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
                        scrollToTop();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-40 text-gray-200 font-bold cursor-pointer"
                    >
                      السؤال السابق
                    </button>
                    {currentQuestionIndex < currentQuestions.length - 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          soundManager.playTap();
                          setCurrentQuestionIndex((prev) =>
                            Math.min(currentQuestions.length - 1, prev + 1)
                          );
                          scrollToTop();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 font-bold cursor-pointer"
                      >
                        السؤال التالي
                      </button>
                    )}
                  </>
                )}
              </div>

              <button
                type="button"
                onClick={() => finalizeAssessment(answers)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-extrabold text-xs transition cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  اعتماد الإجابات وإصدار النتيجة ({answeredCount}/{currentQuestions.length})
                </span>
              </button>
            </div>
          </div>
        )}

        {/* ================= VIEW 3: PSYCHOMETRIC REPORT ================= */}
        {activeReport && (
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar"
          >
            {/* Report Header */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-rose-500/20 border border-purple-500/40 text-center relative overflow-hidden">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  اكتمل التقييم السيكومتري بنجاح • درجة الاتزان: {activeReport.totalScore}% (المئين{' '}
                  {activeReport.overallPercentile}%)
                </span>
              </div>

              <h3 className="font-black text-lg sm:text-xl text-white font-['Alexandria'] mb-1">
                {activeReport.primaryArchetypeAr}
              </h3>
              <p className="text-xs text-gray-300 max-w-xl mx-auto">
                {activeReport.validityMessageAr}
              </p>

              {/* Action Bar: Save to Profile, Download PDF & Discover Matches */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-3 mt-3 border-t border-white/10">
                <button
                  onClick={() => triggerPdfExportForReport(activeReport)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  <FileDown className="w-4 h-4" />
                  <span>تحميل التقرير الكامل PDF + معاينة فورية 📄</span>
                </button>

                <button
                  onClick={handleManualSave}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
                    isSavedToProfile
                      ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {isSavedToProfile ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>محفوظ في ملفك الشخصي ✓</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>إضافة النتيجة لملفي الشخصي</span>
                    </>
                  )}
                </button>

                {onOpenDashboard && (
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      onClose();
                      onOpenDashboard('matches');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:opacity-95 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>اكتشف من يشبهك أو يتوافق معك للتواصل 🤝</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Executive Summary Card */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span>الملخص التنفيذي للتحليل السيكومتري:</span>
                </div>
                <span className="text-[11px] font-mono text-purple-300">
                  عدد الأسئلة المحللة: {activeReport.answeredCount || activeReport.dimensionScores.length}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                {activeReport.summaryAr}
              </p>
            </div>

            {/* Special Section 1: Eysenck EPQ 4-Temperament Quadrants Card */}
            {activeReport.testId === 'epq' &&
              (() => {
                const epqTemp = getEysenckTemperament(activeReport);
                return (
                  <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-sky-950/40 via-purple-950/40 to-slate-900 border border-sky-500/40 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-400" />
                        <div>
                          <h4 className="font-black text-sm sm:text-base text-white">
                            نمط المزاج العصبي الفطري (الأمزجة الأربعة)
                          </h4>
                          <span className="text-[11px] text-gray-300">
                            وفق نموذج هانز آيزنك العصبي البيولوجي (EPQ-R)
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                        {epqTemp.titleAr}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-sky-300">
                        <span>👑 الصفة البارزة:</span>
                        <span className="text-white">{epqTemp.tagAr}</span>
                      </div>
                      <p className="text-xs text-gray-200 leading-relaxed">{epqTemp.desc}</p>
                    </div>

                    {/* 4 Quadrants Visual Interactive Grid */}
                    <div>
                      <h5 className="font-bold text-xs text-gray-300 mb-2">
                        موضعك في شبكة الأمزجة الأربعة (الانبساط مقابل الاستقرار العصبي):
                      </h5>
                      <div className="grid grid-cols-2 gap-2 text-center text-xs">
                        <div
                          className={`p-3 rounded-2xl border transition ${
                            epqTemp.key === 'choleric'
                              ? 'bg-orange-500/25 border-orange-400 text-white ring-2 ring-orange-400/50 shadow-lg'
                              : 'bg-black/30 border-white/10 text-gray-400 opacity-60'
                          }`}
                        >
                          <div className="font-black text-sm text-orange-300 mb-0.5">
                            الصفراوي 🔥
                          </div>
                          <div className="text-[10px] text-gray-300">طاقة حاسمة، قيادي، ومبادر</div>
                          <div className="text-[9px] text-gray-400 mt-1 font-mono">
                            انبساط + حساسية انفعالية
                          </div>
                          {epqTemp.key === 'choleric' && (
                            <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-400 text-black">
                              مزاجك الفعلي ✓
                            </span>
                          )}
                        </div>

                        <div
                          className={`p-3 rounded-2xl border transition ${
                            epqTemp.key === 'sanguine'
                              ? 'bg-sky-500/25 border-sky-400 text-white ring-2 ring-sky-400/50 shadow-lg'
                              : 'bg-black/30 border-white/10 text-gray-400 opacity-60'
                          }`}
                        >
                          <div className="font-black text-sm text-sky-300 mb-0.5">الدموي ☀️</div>
                          <div className="text-[10px] text-gray-300">
                            متفائل، مرح، واجتماعي مرن
                          </div>
                          <div className="text-[9px] text-gray-400 mt-1 font-mono">
                            انبساط + استقرار عصبي
                          </div>
                          {epqTemp.key === 'sanguine' && (
                            <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-sky-400 text-black">
                              مزاجك الفعلي ✓
                            </span>
                          )}
                        </div>

                        <div
                          className={`p-3 rounded-2xl border transition ${
                            epqTemp.key === 'melancholic'
                              ? 'bg-purple-500/25 border-purple-400 text-white ring-2 ring-purple-400/50 shadow-lg'
                              : 'bg-black/30 border-white/10 text-gray-400 opacity-60'
                          }`}
                        >
                          <div className="font-black text-sm text-purple-300 mb-0.5">
                            السوداوي 🌙
                          </div>
                          <div className="text-[10px] text-gray-300">
                            عميق، متأمل، ومرهف الحس
                          </div>
                          <div className="text-[9px] text-gray-400 mt-1 font-mono">
                            انطواء + حساسية انفعالية
                          </div>
                          {epqTemp.key === 'melancholic' && (
                            <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-purple-400 text-black">
                              مزاجك الفعلي ✓
                            </span>
                          )}
                        </div>

                        <div
                          className={`p-3 rounded-2xl border transition ${
                            epqTemp.key === 'phlegmatic'
                              ? 'bg-emerald-500/25 border-emerald-400 text-white ring-2 ring-emerald-400/50 shadow-lg'
                              : 'bg-black/30 border-white/10 text-gray-400 opacity-60'
                          }`}
                        >
                          <div className="font-black text-sm text-emerald-300 mb-0.5">
                            البلغمي 🌊
                          </div>
                          <div className="text-[10px] text-gray-300">هادئ، حكيم، وصبور جداً</div>
                          <div className="text-[9px] text-gray-400 mt-1 font-mono">
                            انطواء + استقرار عصبي
                          </div>
                          {epqTemp.key === 'phlegmatic' && (
                            <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-400 text-black">
                              مزاجك الفعلي ✓
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
                      <Heart className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-bold block mb-0.5 text-white">
                          التوافق الحيوي مع الشريك:
                        </span>
                        <p className="leading-relaxed">{epqTemp.partnerTip}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}

            {/* Special Section 2: Cattell 16PF Simplified Non-Specialist Report + 5 Global Factors + 16 Primary Factors */}
            {activeReport.testId === 'sixteen_pf' && (
              <div className="space-y-3 p-4 rounded-3xl bg-purple-950/25 border border-purple-500/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-purple-400" />
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-white">
                        مقياس كاتل لـ 16 سمة (16PF) - تقرير مبسط لغير المختصين:
                      </h4>
                      <p className="text-[11px] text-gray-300">
                        مبني على التحليل العاملي لريموند كاتل (16PF Fifth Edition) بالدرجات المعيارية Sten (1-10)
                      </p>
                    </div>
                  </div>

                  {/* Toggle between Clusters, 5 Global Factors, and Full 16-Factors */}
                  <div className="flex items-center p-0.5 rounded-xl bg-black/50 border border-white/10 text-[11px] font-bold">
                    <button
                      onClick={() => setClusterViewMode('clusters')}
                      className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                        clusterViewMode === 'clusters'
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      المجموعات الـ 4 المبسطة 🧩
                    </button>
                    <button
                      onClick={() => setClusterViewMode('global5')}
                      className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                        clusterViewMode === 'global5'
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      العوامل الـ 5 الكبرى 🌍
                    </button>
                    <button
                      onClick={() => setClusterViewMode('all')}
                      className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                        clusterViewMode === 'all'
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      السمات الـ 16 بالتفصيل 📊
                    </button>
                  </div>
                </div>

                {/* View A: 4 Macro-Clusters View */}
                {clusterViewMode === 'clusters' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {get16PFClusters(activeReport).map((cluster) => (
                      <div
                        key={cluster.id}
                        className="p-4 rounded-2xl bg-black/35 border border-white/10 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{cluster.icon}</span>
                            <span className="font-bold text-xs sm:text-sm text-white">
                              {cluster.titleAr}
                            </span>
                          </div>
                          <span
                            className="font-black text-xs font-mono px-2 py-0.5 rounded-md"
                            style={{ backgroundColor: `${cluster.color}25`, color: cluster.color }}
                          >
                            {cluster.score}%
                          </span>
                        </div>

                        <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${cluster.score}%`,
                              backgroundColor: cluster.color,
                            }}
                          />
                        </div>

                        <p className="text-xs text-gray-200 leading-relaxed">{cluster.summary}</p>
                        <div className="text-[10px] text-purple-300 pt-1 border-t border-white/10">
                          {cluster.factors}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* View B: 5 Global Factors View */}
                {clusterViewMode === 'global5' && activeReport.cattellGlobalFactors && (
                  <div className="space-y-2.5">
                    {activeReport.cattellGlobalFactors.map((gf) => (
                      <div
                        key={gf.key}
                        className="p-3.5 rounded-2xl bg-black/35 border border-white/10 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="font-bold text-xs sm:text-sm text-white">
                            {gf.labelAr}
                          </span>
                          <div className="flex items-center gap-2 font-mono text-xs">
                            <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                              Sten {gf.sten}/10
                            </span>
                            <span className="font-black text-white">{gf.score}%</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-gray-400">
                          <span>القطب المنخفض: {gf.lowPoleAr}</span>
                          <span>القطب المرتفع: {gf.highPoleAr}</span>
                        </div>

                        <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${gf.score}%`, backgroundColor: gf.color }}
                          />
                        </div>

                        <p className="text-xs text-emerald-200 font-medium leading-relaxed">
                          💡 التفسير المبسط: {gf.plainExplanationAr}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* View C: Full 16 Primary Factors List with Bipolar Spectrum & Plain Explanation */}
                {clusterViewMode === 'all' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeReport.dimensionScores.map((dim) => (
                      <div
                        key={dim.key}
                        className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-1 text-xs">
                          <span className="font-bold text-white">{dim.labelAr}</span>
                          <div className="flex items-center gap-1.5 shrink-0 font-mono">
                            {dim.stenScore && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-amber-300">
                                Sten {dim.stenScore}/10
                              </span>
                            )}
                            <span className="font-black text-sm text-purple-300">
                              {dim.score}%
                            </span>
                          </div>
                        </div>

                        {dim.lowPoleAr && dim.highPoleAr && (
                          <div className="flex items-center justify-between text-[10px] text-gray-400">
                            <span>{dim.lowPoleAr}</span>
                            <span>{dim.highPoleAr}</span>
                          </div>
                        )}

                        <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${dim.score}%`,
                              backgroundColor: dim.color || '#8b5cf6',
                            }}
                          />
                        </div>

                        {dim.plainExplanationAr && (
                          <p className="text-xs text-emerald-300 font-semibold leading-relaxed">
                            ✨ باللغة اليومية المبسطة: {dim.plainExplanationAr}
                          </p>
                        )}

                        <p className="text-[11px] text-gray-300 leading-relaxed">{dim.analysisAr}</p>
                        <p className="text-[10px] text-amber-300/90">💍 {dim.adviceAr}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Standard Dimension Breakdown for other assessments */}
            {activeReport.testId !== 'sixteen_pf' && (
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-gray-300">
                  نتائج الأبعاد السيكومترية المقاسة بدقة إحصائية من إجاباتك:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeReport.dimensionScores.map((dim) => (
                    <div
                      key={dim.key}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{dim.labelAr}</span>
                        <div className="flex items-center gap-1.5 font-mono">
                          {dim.stenScore && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-amber-300">
                              Sten {dim.stenScore}/10
                            </span>
                          )}
                          <span className="font-black text-sm text-purple-300">{dim.score}%</span>
                        </div>
                      </div>

                      <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${dim.score}%`,
                            backgroundColor: dim.color || '#8b5cf6',
                          }}
                        />
                      </div>

                      {dim.plainExplanationAr && (
                        <p className="text-xs text-emerald-300 font-semibold">
                          ✨ المعنى السلوكي المبسط: {dim.plainExplanationAr}
                        </p>
                      )}
                      <p className="text-[11px] text-gray-300 leading-relaxed">{dim.analysisAr}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths & Aspirations derived from answers */}
            {(activeReport.userStrengthsAr?.length > 0 ||
              activeReport.userAspirationsAr?.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeReport.userStrengthsAr?.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                      <Target className="w-4 h-4 text-emerald-400" />
                      <span>نقاط القوة المرصودة من إجاباتك الفعلية:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-gray-200">
                      {activeReport.userStrengthsAr.map((s: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeReport.userAspirationsAr?.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                      <Compass className="w-4 h-4 text-amber-400" />
                      <span>التوصيات والتطلعات المناسبة لنمطك:</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-gray-200">
                      {activeReport.userAspirationsAr.map((a: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-400 mt-0.5">•</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Ideal Partner Profile Section */}
            {activeReport.idealPartnerProfile && (
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-rose-950/40 via-purple-950/40 to-slate-900 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <Heart className="w-5 h-5 text-rose-400" />
                  <h4 className="font-extrabold text-sm sm:text-base text-white">
                    مواصفات الشريك الأكثر توافقاً وانسجاماً معك (وفق التكامل السيكومتري):
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="font-bold text-rose-300 block">✨ الشريك الأنسب:</span>
                    <p className="text-gray-200 leading-relaxed font-semibold">
                      {activeReport.idealPartnerProfile.recommendedArchetypeAr}
                    </p>
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      {activeReport.idealPartnerProfile.lifestyleHarmonyAr}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="font-bold text-purple-300 block">
                      🤝 أسباب التوافق والاحتواء:
                    </span>
                    <p className="text-gray-200 leading-relaxed">
                      {activeReport.idealPartnerProfile.emotionalNeedsAr}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <span className="font-bold text-sky-300 block">
                      💡 نصيحة التواصل والانسجام:
                    </span>
                    <p className="text-gray-200 leading-relaxed">
                      {activeReport.idealPartnerProfile.communicationStyleAr}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Question-by-Question Audit Table */}
            {activeReport.questionAudit && activeReport.questionAudit.length > 0 && (
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <ListChecks className="w-4 h-4 text-emerald-400" />
                    <span>
                      سجل التدقيق العلمي لإجاباتك ({activeReport.questionAudit.length} سؤالاً):
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAuditTable((prev) => !prev)}
                    className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-purple-200 font-bold cursor-pointer"
                  >
                    {showAuditTable ? 'إخفاء جدول التدقيق ▲' : 'عرض جميع إجاباتي وأوزانها ▼'}
                  </button>
                </div>

                {showAuditTable && (
                  <div className="max-h-72 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                    {activeReport.questionAudit.map((qa) => (
                      <div
                        key={qa.questionId}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-purple-300 font-mono">
                            سؤال #{qa.questionNumber}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                            الوزن السيكومتري: {qa.scoreWeight}/{qa.maxWeight} • {qa.traitMeasuredAr}
                          </span>
                        </div>
                        <p className="text-white font-semibold">{qa.promptAr}</p>
                        <p className="text-gray-300">
                          <strong className="text-emerald-400">إجابتك:</strong> {qa.selectedOptionAr}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Social Media Sharing Suite */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-white flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>نشر ومشاركة نتائجك في مواقع السوشيل ميديا:</span>
                </h4>
                <span className="text-[10px] text-gray-400">شارك تحليلك الملهم</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="py-2 px-2.5 rounded-xl bg-emerald-600/25 hover:bg-emerald-600/35 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>واتساب</span>
                </button>

                <button
                  onClick={handleShareTwitter}
                  className="py-2 px-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 text-sky-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>𝕏 تويتر</span>
                </button>

                <button
                  onClick={handleShareTelegram}
                  className="py-2 px-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-blue-400" />
                  <span>تليجرام</span>
                </button>

                <button
                  onClick={handleShareFacebook}
                  className="py-2 px-2.5 rounded-xl bg-indigo-600/25 hover:bg-indigo-600/35 border border-indigo-500/30 text-indigo-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>فيسبوك</span>
                </button>

                <button
                  onClick={handleShareLinkedIn}
                  className="py-2 px-2.5 rounded-xl bg-blue-700/25 hover:bg-blue-700/35 border border-blue-600/30 text-blue-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                  <span>لينكد إن</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    copiedLink
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/10 hover:bg-white/15 text-gray-200 border border-white/15'
                  }`}
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-purple-400" />
                      <span>نسخ الرابط</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <button
                onClick={() => {
                  soundManager.playTap();
                  setSelectedTest(null);
                  setActiveReport(null);
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-bold transition cursor-pointer"
              >
                خوض اختبار نفسي آخر 🔄
              </button>

              {onOpenDashboard && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    soundManager.playTap();
                    onClose();
                    onOpenDashboard('overview');
                  }}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:opacity-95 text-white text-xs font-extrabold shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>عرض لوحة ملفي الشخصي الكاملة (Dashboard)</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </motion.button>
              )}
            </div>

            {/* Permanent Bottom Academic Conclusion & APA References */}
            <PsychometricAcademicConclusion variant="modal" />
          </div>
        )}
      </motion.div>
    </div>
  );
};
