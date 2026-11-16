import React, { useState, useEffect, lazy, Suspense } from 'react';
import {
  Brain,
  Clock,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
  FileDown,
  Scale,
  BookOpen,
  AlertTriangle,
  Sparkles,
  History,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Trash2,
  Calendar,
  X,
  BookmarkCheck,
  Sliders,
  ListChecks,
} from 'lucide-react';
import {
  AnalysisTier,
  IndividualPsychometricProfile,
  TieredAssessmentReport,
  TwoPersonComparisonReport,
  VisualChartsPayload,
} from '../types';
import {
  ANALYSIS_TIERS_CATALOG,
  CONSTRUCT_SCIENTIFIC_CATALOG,
  getQuestionsForAnalysisTier,
} from '../data/tieredPsychologyBank';
import {
  TieredAnswersMap,
  NON_CLINICAL_DISCLAIMER_AR,
  calculateTieredPsychometricReport,
  validateTierReportCompleteness,
  saveTieredProgressAutoSave,
  loadTieredProgressAutoSave,
  clearTieredProgressAutoSave,
} from '../utils/tieredScoringEngine';
import {
  compareTwoPsychometricProfiles,
  profileFromTieredReport,
  profileFromUnifiedRecord,
  profileFromQuestionnaireOrCommunity,
} from '../utils/personalityComparisonEngine';
import {
  saveUnifiedTestRecord,
  fetchUnifiedTestHistory,
  deleteUnifiedTestRecord,
  buildTemporalEvolutionSummary,
  UnifiedTestRecord,
} from '../services/userHistoryService';
import {
  COMMUNITY_PROFILES,
  loadUserPersonalQuestionnaire,
} from '../data/communityProfiles';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';

const LazyScientificVisualDashboards = lazy(() =>
  import('./ScientificVisualDashboards').then((m) => ({
    default: m.ScientificVisualDashboards,
  }))
);

interface Props {
  userName?: string;
  onReportSaved?: (report: TieredAssessmentReport) => void;
  onLaunchComparison?: (report: TieredAssessmentReport) => void;
}

const LIKERT_OPTIONS = [
  { value: 1, labelAr: 'أعارض بشدة', subAr: 'لا تنطبق أبداً' },
  { value: 2, labelAr: 'أعارض', subAr: 'نادراً' },
  { value: 3, labelAr: 'محايد', subAr: 'أحياناً / وسط' },
  { value: 4, labelAr: 'أوافق', subAr: 'غالباً' },
  { value: 5, labelAr: 'أوافق بشدة', subAr: 'تنطبق تماماً' },
];

export const TieredAssessmentModule: React.FC<Props> = ({
  userName,
  onReportSaved,
  onLaunchComparison,
}) => {
  const { user } = useAuth();
  const { direction, tailwindClasses } = useLanguage();
  const { theme } = useAppTheme();
  const isLight = theme === 'light';

  const [moduleTab, setModuleTab] = useState<'tiers' | 'reports_timeline' | 'two_person_compare'>('tiers');
  const [selectedTier, setSelectedTier] = useState<AnalysisTier | null>(null);
  const [runnerMode, setRunnerMode] = useState<'single' | 'batch10'>('single');
  const [answers, setAnswers] = useState<TieredAnswersMap>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [savedProgressMap, setSavedProgressMap] = useState<
    Partial<Record<AnalysisTier, { count: number; total: number; updatedAt: string }>>
  >({});
  const [pausedNotice, setPausedNotice] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [report, setReport] = useState<TieredAssessmentReport | null>(null);
  const [isSavedRecord, setIsSavedRecord] = useState(false);

  // My Reports & Longitudinal Change Tracking State (Task 3)
  const [savedRecords, setSavedRecords] = useState<UnifiedTestRecord[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [historyFilter, setHistoryFilter] = useState<
    'all' | 'tiered_assessment' | 'personality_comparison' | 'psychology' | 'intelligence' | 'partner_compatibility'
  >('all');
  const [historyTierFilter, setHistoryTierFilter] = useState<'all' | 'quick' | 'advanced' | 'professional'>('all');
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [reopenedRecord, setReopenedRecord] = useState<UnifiedTestRecord | null>(null);

  // Two-Personality Comparison Engine State (Task 4)
  const [sourceAKey, setSourceAKey] = useState<string>('questionnaire');
  const [sourceBKey, setSourceBKey] = useState<string>('community:0');
  const [customPartnerB, setCustomPartnerB] = useState({
    name: 'الشريك المحتمل',
    openness: 76,
    conscientiousness: 80,
    extraversion: 70,
    agreeableness: 84,
    emotionalStability: 78,
    honestyHumility: 85,
    anxiety: 28,
    avoidance: 26,
    emotionalIntelligence: 82,
    communication: 80,
    conflictCollab: 82,
    valuesScore: 86,
    lifeGoalsScore: 82,
    parentingScore: 84,
  });
  const [comparisonReport, setComparisonReport] = useState<TwoPersonComparisonReport | null>(null);
  const [comparisonSaved, setComparisonSaved] = useState(false);

  const refreshSavedProgress = () => {
    const next: Partial<
      Record<AnalysisTier, { count: number; total: number; updatedAt: string }>
    > = {};
    ANALYSIS_TIERS_CATALOG.forEach((tierDef) => {
      const saved = loadTieredProgressAutoSave(tierDef.id);
      if (saved && Object.keys(saved.answers).length > 0) {
        next[tierDef.id] = {
          count: Object.keys(saved.answers).length,
          total: tierDef.questionCount,
          updatedAt: saved.updatedAt,
        };
      }
    });
    setSavedProgressMap(next);
  };

  const refreshUnifiedHistory = async () => {
    setLoadingRecords(true);
    try {
      const list = await fetchUnifiedTestHistory(user);
      setSavedRecords(list);
      const firstComparable = list.find(
        (r) => r.testType === 'tiered_assessment' || r.testType === 'psychology'
      );
      if (firstComparable && sourceAKey === 'questionnaire') {
        setSourceAKey(`record:${firstComparable.id}`);
      }
    } catch {
      // ignore
    } finally {
      setLoadingRecords(false);
    }
  };

  useEffect(() => {
    refreshSavedProgress();
    refreshUnifiedHistory();
  }, [user]);

  const startOrResumeTier = (tier: AnalysisTier, forceRestart = false) => {
    soundManager.playTap();
    setValidationError(null);
    setPausedNotice(null);
    setReport(null);
    setIsSavedRecord(false);

    if (forceRestart) {
      clearTieredProgressAutoSave(tier);
      setAnswers({});
      setCurrentIdx(0);
      setSelectedTier(tier);
      refreshSavedProgress();
      return;
    }

    const existing = loadTieredProgressAutoSave(tier);
    const qs = getQuestionsForAnalysisTier(tier);
    if (existing && Object.keys(existing.answers).length > 0) {
      setAnswers(existing.answers);
      setCurrentIdx(Math.min(existing.currentIndex, Math.max(0, qs.length - 1)));
    } else {
      setAnswers({});
      setCurrentIdx(0);
    }
    setSelectedTier(tier);
  };

  const questions = selectedTier ? getQuestionsForAnalysisTier(selectedTier) : [];
  const currentQ = questions[currentIdx];

  const handleSelectValue = (qId: string, val: number | 'A' | 'B') => {
    if (!selectedTier) return;
    soundManager.playTap();
    setValidationError(null);
    const updatedAnswers: TieredAnswersMap = { ...answers, [qId]: val };
    setAnswers(updatedAnswers);

    saveTieredProgressAutoSave({
      tier: selectedTier,
      answers: updatedAnswers,
      currentIndex: currentIdx,
      isPaused: false,
      updatedAt: new Date().toISOString(),
    });
    refreshSavedProgress();
  };

  const handleNext = () => {
    if (!selectedTier || !currentQ) return;

    if (runnerMode === 'batch10') {
      const batchStart = Math.floor(currentIdx / 10) * 10;
      const batchSlice = questions.slice(batchStart, batchStart + 10);
      const missingInBatch = batchSlice.find((q) => {
        const v = answers[q.id];
        return v === undefined || v === null;
      });
      if (missingInBatch) {
        soundManager.playTap();
        setValidationError(
          `يرجى الإجابة على جميع أسئلة هذه الصفحة قبل الانتقال (السؤال رقم ${missingInBatch.index} غير مجاب).`
        );
        return;
      }
      setValidationError(null);
      soundManager.playTap();
      const nextBatchIdx = batchStart + 10;
      if (nextBatchIdx < questions.length) {
        setCurrentIdx(nextBatchIdx);
        saveTieredProgressAutoSave({
          tier: selectedTier,
          answers,
          currentIndex: nextBatchIdx,
          isPaused: false,
          updatedAt: new Date().toISOString(),
        });
      } else {
        finalizeTierReport(answers);
      }
      return;
    }

    const curVal = answers[currentQ.id];
    if (curVal === undefined || curVal === null) {
      soundManager.playTap();
      setValidationError('يرجى اختيار إجابة لهذا البند أولاً قبل الانتقال للسؤال التالي.');
      return;
    }
    setValidationError(null);
    soundManager.playTap();

    if (currentIdx + 1 < questions.length) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      saveTieredProgressAutoSave({
        tier: selectedTier,
        answers,
        currentIndex: nextIdx,
        isPaused: false,
        updatedAt: new Date().toISOString(),
      });
    } else {
      finalizeTierReport(answers);
    }
  };

  const handlePrev = () => {
    if (!selectedTier || currentIdx === 0) return;
    soundManager.playTap();
    setValidationError(null);
    const prevIdx =
      runnerMode === 'batch10'
        ? Math.max(0, Math.floor(currentIdx / 10) * 10 - 10)
        : currentIdx - 1;
    setCurrentIdx(prevIdx);
    saveTieredProgressAutoSave({
      tier: selectedTier,
      answers,
      currentIndex: prevIdx,
      isPaused: false,
      updatedAt: new Date().toISOString(),
    });
  };

  const handlePauseAndSave = () => {
    if (!selectedTier) return;
    soundManager.playTap();
    saveTieredProgressAutoSave({
      tier: selectedTier,
      answers,
      currentIndex: currentIdx,
      isPaused: true,
      updatedAt: new Date().toISOString(),
    });
    refreshSavedProgress();
    setSelectedTier(null);
    setPausedNotice(
      `تم حفظ تقدمك تلقائياً (${Object.keys(answers).length} سؤالاً مجاباً). يمكنك الاستكمال من حيث توقفت في أي وقت.`
    );
  };

  const finalizeTierReport = async (finalAnswers: TieredAnswersMap) => {
    if (!selectedTier) return;
    const qs = getQuestionsForAnalysisTier(selectedTier);
    const check = validateTierReportCompleteness(selectedTier, qs, finalAnswers);

    if (!check.isComplete) {
      setValidationError(
        check.reasonAr || 'يُرجى استكمال جميع الأسئلة قبل اعتماد التقرير النهائي.'
      );
      if (check.missingIds.length > 0) {
        const firstMissingIdx = qs.findIndex((q) => q.id === check.missingIds[0]);
        if (firstMissingIdx >= 0) setCurrentIdx(firstMissingIdx);
      }
      return;
    }

    try {
      const computed = calculateTieredPsychometricReport(
        selectedTier,
        finalAnswers,
        userName || user?.displayName || 'مختبَر مِرآة القلوب'
      );

      clearTieredProgressAutoSave(selectedTier);
      refreshSavedProgress();
      soundManager.playResultReveal();
      setReport(computed);
      setSelectedTier(null);

      // Build rawScores & standardizedScores dictionaries for DB
      const rawScores: Record<string, number> = {};
      const standardizedScores: Record<string, number> = {};
      computed.subscales.forEach((s) => {
        rawScores[s.key] = s.rawScore;
        standardizedScores[s.key] = s.percentage;
      });

      const tierMeta = ANALYSIS_TIERS_CATALOG.find((t) => t.id === selectedTier);
      await saveUnifiedTestRecord(user || null, {
        testType: 'tiered_assessment',
        testTitleAr: `${computed.tierTitleAr} (${computed.questionCount} سؤالاً)`,
        testCategoryAr: 'التحليل السيكومتري متعدد المستويات',
        scoreOrArchetype: `${computed.archetypeTitleAr} • ${computed.overallMaturityIndex}%`,
        percentage: computed.overallMaturityIndex,
        badgeColor: tierMeta?.accentColor || '#8b5cf6',
        keyInsights: computed.strengthsAr.slice(0, 3),
        snapshot: computed,
        analysisTier: selectedTier,
        rawScores,
        standardizedScores,
      });

      setIsSavedRecord(true);
      refreshUnifiedHistory();
      onReportSaved?.(computed);
    } catch (err) {
      setValidationError(
        err instanceof Error
          ? err.message
          : 'تعذر إصدار التقرير: يرجى التأكد من إكمال كافة البنود المطلوبة.'
      );
    }
  };

  const handleDownloadTierPdf = async (targetReport: TieredAssessmentReport = report!) => {
    if (!targetReport) return;
    soundManager.playTap();
    const { exportPsychometricReportAsPDF } = await import('../utils/pdfReportGenerator');

    const sections = [
      {
        title: 'وصف الشخصية الأساسي والتركيبة النفسية',
        content: targetReport.personalityDescriptionAr,
      },
      {
        title: 'نقاط القوة البارزة ومجالات التحسين',
        content: targetReport.emotionalMaturitySummaryAr,
        items: [...targetReport.strengthsAr, ...targetReport.improvementAreasAr],
      },
      {
        title: 'أسلوب التواصل والذكاء العاطفي',
        content: targetReport.communicationStyleAr,
      },
    ];

    if (targetReport.thinkingStyleAnalysisAr) {
      sections.push({
        title: 'تحليل نمط التفكير واتخاذ القرار',
        content: `${targetReport.thinkingStyleAnalysisAr} ${targetReport.decisionMakingAnalysisAr || ''}`,
      });
    }
    if (targetReport.attachmentAnalysisAr) {
      sections.push({
        title: 'نمط التعلق وإدارة النزاعات والتوافق المتوقع',
        content: `${targetReport.attachmentAnalysisAr} ${targetReport.conflictResolutionAnalysisAr || ''} ${targetReport.expectedEmotionalCompatibilityAr || ''}`,
        items: targetReport.familySuccessIndicatorsAr,
      });
    }
    if (targetReport.valuesAndBeliefsAr) {
      sections.push({
        title: 'الملف الاحترافي: القيم، أهداف الحياة، إدارة الضغوط، والديمومة الزواجية',
        content: `${targetReport.valuesAndBeliefsAr} ${targetReport.lifeGoalsAnalysisAr || ''} ${targetReport.stressManagementCapacityAr || ''} ${targetReport.empathyAnalysisAr || ''} ${targetReport.longTermMaritalCompatibilityAr || ''}`,
      });
    }

    exportPsychometricReportAsPDF({
      reportTitle: `${targetReport.tierTitleAr} — التقرير السيكومتري الشامل`,
      subTitle: `${targetReport.archetypeTitleAr} (${targetReport.answeredCount}/${targetReport.questionCount} سؤالاً)`,
      scientificBasis: targetReport.scientificReferences.join(' • '),
      userName: targetReport.userName,
      completedAt: new Date(targetReport.createdAt).toLocaleDateString('ar-JO'),
      overallScoreLabel: 'مؤشر النضج السيكومتري الكلي',
      overallScoreValue: `${targetReport.overallMaturityIndex}%`,
      cognitiveFingerprintTitle: `الاتساق الداخلي ${targetReport.consistencyIndex}% • المعيارية ${targetReport.overallPercentile}%`,
      executiveSummary: targetReport.executiveSummaryAr,
      metrics: targetReport.subscales.slice(0, 14).map((s) => ({
        label: s.labelAr,
        scorePercent: s.percentage,
        levelLabel: `Sten ${s.stenScore}/10 • T=${s.tScore}`,
        rawText: s.interpretationAr,
        color: s.color,
      })),
      sections,
      careersOrRecommendations: targetReport.improvementAreasAr,
      disclaimerText: targetReport.scientificDisclaimerAr,
      visualCharts: targetReport.visualCharts,
    });
  };

  const handleDownloadSavedRecordPdf = async (rec: UnifiedTestRecord) => {
    soundManager.playTap();
    if (rec.snapshot && rec.snapshot.subscales && rec.snapshot.visualCharts) {
      await handleDownloadTierPdf(rec.snapshot as TieredAssessmentReport);
      return;
    }
    const { exportPsychometricReportAsPDF } = await import('../utils/pdfReportGenerator');
    if (rec.testType === 'personality_comparison' && rec.snapshot?.nineAxesBreakdown) {
      const cmp = rec.snapshot as TwoPersonComparisonReport;
      exportPsychometricReportAsPDF({
        reportTitle: 'تقرير مقارنة شخصيتين عبر المحاور التسعة السيكومترية',
        subTitle: `${cmp.personA.personName} ✕ ${cmp.personB.personName}`,
        scientificBasis: (cmp.scientificReferences || []).join(' • '),
        userName: cmp.personA.personName,
        completedAt: new Date(rec.createdAt).toLocaleDateString('ar-JO'),
        overallScoreLabel: 'التوافق الإجمالي الموزون',
        overallScoreValue: `${cmp.overallWeightedCompatibility}%`,
        cognitiveFingerprintTitle: cmp.compatibilityClassificationAr,
        executiveSummary: cmp.executiveSummaryAr,
        metrics: (cmp.subIndices || []).map((s) => ({
          label: s.titleAr,
          scorePercent: s.score,
          levelLabel: `وزن ${Math.round(s.weight * 100)}%`,
          rawText: s.interpretationAr,
          color: '#059669',
        })),
        sections: (cmp.nineAxesBreakdown || []).map((ax) => ({
          title: ax.axisNameAr,
          badge: `توافق ${ax.matchScore}%`,
          content: ax.scientificNoteAr,
        })),
        comparisonDualRadar: {
          personAName: cmp.personA.personName,
          personBName: cmp.personB.personName,
          axes: cmp.nineAxesBreakdown,
        },
      });
      return;
    }

    exportPsychometricReportAsPDF({
      reportTitle: rec.testTitleAr,
      subTitle: rec.testCategoryAr,
      scientificBasis: 'APA Validated Psychometric Models • Mirror of Hearts Lab',
      userName: userName || user?.displayName || 'المختبَر',
      completedAt: new Date(rec.createdAt).toLocaleDateString('ar-JO'),
      overallScoreLabel: 'النتيجة المعيارية',
      overallScoreValue: rec.scoreOrArchetype,
      cognitiveFingerprintTitle: rec.testTitleAr,
      executiveSummary: (rec.keyInsights || []).join(' — ') || rec.scoreOrArchetype,
      metrics: Object.entries(rec.standardizedScores || {}).map(([k, v]) => ({
        label: k,
        scorePercent: Number(v) || rec.percentage,
        levelLabel: 'معياري معتمد',
        color: rec.badgeColor || '#8b5cf6',
      })),
      sections: [
        {
          title: 'أبرز المؤشرات السيكومترية المستخلصة',
          content: rec.scoreOrArchetype,
          items: rec.keyInsights || [],
        },
      ],
    });
  };

  const handleDeleteRecord = async (id: string) => {
    soundManager.playTap();
    await deleteUnifiedTestRecord(user, id);
    setSavedRecords((prev) => prev.filter((r) => r.id !== id));
    if (reopenedRecord?.id === id) setReopenedRecord(null);
  };

  const resolveComparisonProfile = (
    key: string,
    fallbackLabel: string
  ): IndividualPsychometricProfile => {
    if (key === 'active_report' && report) {
      return profileFromTieredReport(report);
    }
    if (key.startsWith('record:')) {
      const recId = key.replace('record:', '');
      const found = savedRecords.find((r) => r.id === recId);
      if (found) return profileFromUnifiedRecord(found);
    }
    if (key.startsWith('community:')) {
      const idx = Number(key.replace('community:', '')) || 0;
      const member = COMMUNITY_PROFILES[idx] || COMMUNITY_PROFILES[0];
      return profileFromQuestionnaireOrCommunity(member, member.displayName);
    }
    if (key === 'custom_sliders') {
      return {
        personName: customPartnerB.name || 'شريك محتمل',
        personLabelAr: customPartnerB.name || 'شريك محتمل (تخصيص مباشر)',
        sourceType: 'live_assessment',
        bigFive: {
          openness: customPartnerB.openness,
          conscientiousness: customPartnerB.conscientiousness,
          extraversion: customPartnerB.extraversion,
          agreeableness: customPartnerB.agreeableness,
          emotionalStability: customPartnerB.emotionalStability,
        },
        hexaco: {
          honestyHumility: customPartnerB.honestyHumility,
          emotionality: 100 - customPartnerB.emotionalStability * 0.45,
          extraversion: customPartnerB.extraversion,
          agreeableness: customPartnerB.agreeableness,
          conscientiousness: customPartnerB.conscientiousness,
          openness: customPartnerB.openness,
        },
        attachment: {
          anxiety: customPartnerB.anxiety,
          avoidance: customPartnerB.avoidance,
          styleAr:
            customPartnerB.anxiety < 50 && customPartnerB.avoidance < 50
              ? 'نمط التعلق الآمن'
              : 'نمط تعلق حساس',
        },
        emotionalIntelligence: customPartnerB.emotionalIntelligence,
        communicationStyle: {
          assertive: customPartnerB.communication,
          reflective: customPartnerB.agreeableness,
          analytical: customPartnerB.openness,
          expressive: customPartnerB.extraversion,
          primaryAr: 'تواصل متوازن وواضح',
        },
        conflictResolution: {
          collaborating: customPartnerB.conflictCollab,
          compromising: Math.round((customPartnerB.conflictCollab + customPartnerB.agreeableness) / 2),
          accommodating: customPartnerB.agreeableness,
          competing: Math.max(15, 100 - customPartnerB.agreeableness),
          avoiding: customPartnerB.avoidance,
          primaryAr: 'التعاون التكاملي',
        },
        valuesScore: customPartnerB.valuesScore,
        lifeGoals: {
          familyStability: customPartnerB.lifeGoalsScore,
          careerGrowth: customPartnerB.conscientiousness,
          intellectualDepth: customPartnerB.openness,
          socialHarmony: customPartnerB.extraversion,
          financialSecurity: customPartnerB.conscientiousness,
        },
        parentingOrientation: customPartnerB.parentingScore,
      };
    }
    const qData = loadUserPersonalQuestionnaire();
    return profileFromQuestionnaireOrCommunity(qData, userName || fallbackLabel);
  };

  const handleRunComparison = () => {
    soundManager.playResultReveal();
    setComparisonSaved(false);
    const profA = resolveComparisonProfile(sourceAKey, userName || 'الشخص الأول (أ)');
    const profB = resolveComparisonProfile(sourceBKey, 'الشخص الثاني (ب)');
    const computed = compareTwoPsychometricProfiles(profA, profB);
    setComparisonReport(computed);
  };

  const handleSaveComparisonToHistory = async () => {
    if (!comparisonReport) return;
    soundManager.playTap();
    await saveUnifiedTestRecord(user || null, {
      testType: 'personality_comparison',
      testTitleAr: `مقارنة: ${comparisonReport.personA.personName} ✕ ${comparisonReport.personB.personName}`,
      testCategoryAr: 'مقارنة شخصيتين علمياً (9 محاور)',
      scoreOrArchetype: `${comparisonReport.overallWeightedCompatibility}% • ${comparisonReport.compatibilityClassificationAr}`,
      percentage: comparisonReport.overallWeightedCompatibility,
      badgeColor: '#059669',
      keyInsights: comparisonReport.subIndices.map((s) => `${s.titleAr}: ${s.score}%`),
      snapshot: comparisonReport,
      standardizedScores: Object.fromEntries(
        comparisonReport.subIndices.map((s) => [s.key, s.score])
      ),
    });
    setComparisonSaved(true);
    refreshUnifiedHistory();
  };

  const containerCard = isLight
    ? 'bg-white border-slate-200 text-slate-900 shadow-lg'
    : 'bg-slate-900/80 border-white/10 text-slate-100 shadow-xl';

  // 1. Report Screen
  if (report) {
    return (
      <div
        className={`rounded-3xl border p-5 sm:p-8 space-y-6 ${containerCard} ${tailwindClasses.containerClass}`}
        dir={direction}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-500/20">
          <div>
            <div className="text-xs font-bold opacity-75">
              {report.tierTitleAr} · {report.answeredCount}/{report.questionCount} بنداً · اتساق داخلي{' '}
              <span className="tabular-nums font-bold">{report.consistencyIndex}%</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black mt-1 font-['Alexandria']">
              {report.archetypeTitleAr}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleDownloadTierPdf(report)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>تنزيل التقرير الكامل (PDF بالرسوم البيانية)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                if (onLaunchComparison) {
                  onLaunchComparison(report);
                }
                setSourceAKey('active_report');
                setReport(null);
                setModuleTab('two_person_compare');
                setTimeout(() => {
                  const profA = profileFromTieredReport(report);
                  const profB = resolveComparisonProfile(sourceBKey, 'الشخص الثاني (ب)');
                  setComparisonReport(compareTwoPsychometricProfiles(profA, profB));
                }, 40);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Scale className="w-4 h-4" />
              <span>مقارنة شخصيتين بهذه النتيجة</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                setReport(null);
              }}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-white/5 border-white/15 text-slate-200'
              }`}
            >
              العودة لمستويات التحليل
            </button>
          </div>
        </div>

        {/* Non-clinical Disclaimer Banner */}
        <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed flex items-start gap-2.5 ${
          isLight ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
        }`}>
          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
          <span>{report.scientificDisclaimerAr}</span>
        </div>

        {/* Summary KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className={`p-3.5 rounded-2xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/10'}`}>
            <div className="text-[11px] opacity-75 font-bold">مؤشر النضج السيكومتري</div>
            <div className="text-2xl font-black text-purple-500 tabular-nums mt-0.5">
              {report.overallMaturityIndex}%
            </div>
          </div>
          <div className={`p-3.5 rounded-2xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/10'}`}>
            <div className="text-[11px] opacity-75 font-bold">الدرجة المعيارية Sten</div>
            <div className="text-2xl font-black text-emerald-500 tabular-nums mt-0.5">
              {report.overallSten} / 10
            </div>
          </div>
          <div className={`p-3.5 rounded-2xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/10'}`}>
            <div className="text-[11px] opacity-75 font-bold">الترتيب المئيني</div>
            <div className="text-2xl font-black text-sky-500 tabular-nums mt-0.5">
              {report.overallPercentile}%
            </div>
          </div>
          <div className={`p-3.5 rounded-2xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/10'}`}>
            <div className="text-[11px] opacity-75 font-bold">حالة الحفظ التلقائي</div>
            <div className="text-xs font-extrabold text-emerald-500 flex items-center gap-1 mt-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSavedRecord ? 'محفوظ في سجل تقاريري' : 'تم الحساب بدقة'}</span>
            </div>
          </div>
        </div>

        {/* Core Qualitative Sections */}
        <div className={`p-4 sm:p-5 rounded-2xl border space-y-2 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/25 border-white/10'}`}>
          <h3 className="font-extrabold text-sm">الملخص التنفيذي وبنية الشخصية</h3>
          <p className="text-xs sm:text-sm leading-relaxed opacity-90">{report.executiveSummaryAr}</p>
          <p className="text-xs sm:text-sm leading-relaxed opacity-85">{report.personalityDescriptionAr}</p>
        </div>

        {/* Tier-specific Narrative Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-2xl border space-y-2 ${isLight ? 'bg-emerald-50/70 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/20'}`}>
            <h4 className="font-extrabold text-xs sm:text-sm text-emerald-500">أبرز نقاط القوة السيكومترية</h4>
            <ul className="space-y-1.5 text-xs leading-relaxed">
              {report.strengthsAr.map((st, idx) => (
                <li key={idx}>• {st}</li>
              ))}
            </ul>
          </div>

          <div className={`p-4 rounded-2xl border space-y-2 ${isLight ? 'bg-amber-50/70 border-amber-200' : 'bg-amber-950/20 border-amber-500/20'}`}>
            <h4 className="font-extrabold text-xs sm:text-sm text-amber-500">نقاط التحسين والنمو المقترحة</h4>
            <ul className="space-y-1.5 text-xs leading-relaxed">
              {report.improvementAreasAr.map((imp, idx) => (
                <li key={idx}>• {imp}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
          <div className={`p-4 rounded-2xl border space-y-1.5 ${isLight ? 'bg-white border-slate-200' : 'bg-white/[0.03] border-white/10'}`}>
            <h4 className="font-extrabold text-sm">أسلوب التواصل السائد</h4>
            <p className="opacity-85">{report.communicationStyleAr}</p>
          </div>
          <div className={`p-4 rounded-2xl border space-y-1.5 ${isLight ? 'bg-white border-slate-200' : 'bg-white/[0.03] border-white/10'}`}>
            <h4 className="font-extrabold text-sm">مؤشر النضج العاطفي والتنظيم</h4>
            <p className="opacity-85">{report.emotionalMaturitySummaryAr}</p>
          </div>
        </div>

        {/* Advanced Tier Insights */}
        {report.thinkingStyleAnalysisAr && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
            <div className={`p-4 rounded-2xl border space-y-1.5 ${isLight ? 'bg-indigo-50/60 border-indigo-200' : 'bg-indigo-950/25 border-indigo-500/25'}`}>
              <h4 className="font-extrabold text-sm text-indigo-400">نمط التفكير واتخاذ القرار</h4>
              <p>{report.thinkingStyleAnalysisAr}</p>
              <p className="opacity-85">{report.decisionMakingAnalysisAr}</p>
            </div>
            <div className={`p-4 rounded-2xl border space-y-1.5 ${isLight ? 'bg-rose-50/60 border-rose-200' : 'bg-rose-950/25 border-rose-500/25'}`}>
              <h4 className="font-extrabold text-sm text-rose-400">نمط التعلق وإدارة النزاعات والتوافق العاطفي</h4>
              <p>{report.attachmentAnalysisAr}</p>
              <p className="opacity-85">{report.conflictResolutionAnalysisAr}</p>
              <p className="opacity-85">{report.expectedEmotionalCompatibilityAr}</p>
            </div>
          </div>
        )}

        {report.familySuccessIndicatorsAr && (
          <div className={`p-4 rounded-2xl border space-y-2 text-xs ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/10'}`}>
            <h4 className="font-extrabold text-sm">مؤشرات النجاح والاستقرار الأسري</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {report.familySuccessIndicatorsAr.map((ind, i) => (
                <div key={i}>✓ {ind}</div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Multi-Section Dossier */}
        {report.valuesAndBeliefsAr && (
          <div className={`p-5 rounded-2xl border space-y-3 text-xs leading-relaxed ${isLight ? 'bg-purple-50/70 border-purple-200' : 'bg-purple-950/20 border-purple-500/25'}`}>
            <h4 className="font-extrabold text-sm text-purple-400">الملف الاحترافي المعمق (Professional Dossier)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <strong className="block mb-1">القيم والمعتقدات الجوهرية:</strong>
                <p className="opacity-90">{report.valuesAndBeliefsAr}</p>
              </div>
              <div>
                <strong className="block mb-1">أهداف الحياة والتخطيط طويل المدى:</strong>
                <p className="opacity-90">{report.lifeGoalsAnalysisAr}</p>
              </div>
              <div>
                <strong className="block mb-1">القدرة على إدارة الضغوط والتنظيم التنفيذي:</strong>
                <p className="opacity-90">{report.stressManagementCapacityAr}</p>
              </div>
              <div>
                <strong className="block mb-1">التعاطف والقدرة على الاحتواء العاطفي:</strong>
                <p className="opacity-90">{report.empathyAnalysisAr}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-purple-500/20">
              <strong className="block mb-1">مؤشر التوافق الزواجي طويل الأمد:</strong>
              <p className="opacity-90">{report.longTermMaritalCompatibilityAr}</p>
            </div>
          </div>
        )}

        {/* Lazy-Loaded 9 Scientific Visual Charts */}
        <Suspense
          fallback={
            <div className="p-8 text-center text-xs font-bold opacity-75">
              جارٍ تحميل اللوحات البصرية السيكومترية الـ 9...
            </div>
          }
        >
          <LazyScientificVisualDashboards charts={report.visualCharts} userName={report.userName} />
        </Suspense>
      </div>
    );
  }

  // 2. Active Question Runner Screen
  if (selectedTier && currentQ) {
    const tierMeta = ANALYSIS_TIERS_CATALOG.find((t) => t.id === selectedTier)!;
    const constructMeta = CONSTRUCT_SCIENTIFIC_CATALOG[currentQ.construct];
    const currentAnswer = answers[currentQ.id];
    const answeredTotal = Object.keys(answers).length;
    const progressPct = Math.round((answeredTotal / questions.length) * 100);
    const batchStart = Math.floor(currentIdx / 10) * 10;
    const batchSlice = questions.slice(batchStart, batchStart + 10);

    return (
      <div
        className={`rounded-3xl border p-5 sm:p-7 space-y-5 ${containerCard} ${tailwindClasses.containerClass}`}
        dir={direction}
      >
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-500/20">
          <div>
            <div className="text-xs font-bold text-purple-500">
              {tierMeta.titleAr} · {constructMeta.titleAr}
            </div>
            <div className="text-xs opacity-75 mt-0.5 tabular-nums">
              {runnerMode === 'batch10'
                ? `الأسئلة ${batchStart + 1} – ${Math.min(questions.length, batchStart + 10)} من ${questions.length}`
                : `السؤال ${currentIdx + 1} من ${questions.length}`}{' '}
              · تم إنجاز {answeredTotal} سؤالاً ({progressPct}%)
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Toggle Single vs 10-per-page */}
            <div className={`flex items-center rounded-xl border p-0.5 text-[11px] font-bold ${isLight ? 'bg-slate-100 border-slate-300' : 'bg-white/5 border-white/15'}`}>
              <button
                type="button"
                onClick={() => setRunnerMode('single')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  runnerMode === 'single' ? 'bg-purple-600 text-white' : 'opacity-75'
                }`}
              >
                سؤال بسؤال
              </button>
              <button
                type="button"
                onClick={() => setRunnerMode('batch10')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                  runnerMode === 'batch10' ? 'bg-purple-600 text-white' : 'opacity-75'
                }`}
              >
                <ListChecks className="w-3.5 h-3.5" />
                <span>10 أسئلة بالصفحة</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handlePauseAndSave}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                isLight ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-amber-500/15 border-amber-500/35 text-amber-300'
              }`}
            >
              <PauseCircle className="w-4 h-4" />
              <span>إيقاف مؤقت وحفظ</span>
            </button>
            <button
              type="button"
              onClick={() => startOrResumeTier(selectedTier, true)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 cursor-pointer ${
                isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-white/5 border-white/15 text-slate-300'
              }`}
              title="إعادة البدء من البداية"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`w-full h-2.5 rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-white/10'}`}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.max(3, progressPct)}%`, backgroundColor: tierMeta.accentColor }}
          />
        </div>

        {runnerMode === 'batch10' ? (
          <div className="space-y-4">
            {batchSlice.map((qItem) => {
              const qAns = answers[qItem.id];
              return (
                <div
                  key={qItem.id}
                  className={`p-4 rounded-2xl border space-y-3 ${
                    isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-white/[0.03] border-white/10'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold opacity-80">
                    <span>
                      #{qItem.index} · البُعد المقاس: <strong className="text-purple-400">{qItem.facetAr}</strong>
                    </span>
                    <span>{qItem.scientificReference}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold leading-relaxed font-['Alexandria']">
                    {qItem.textAr}
                  </h4>
                  <p className="text-[11px] opacity-75">{qItem.dimensionExplanationAr}</p>

                  {qItem.format === 'forced_choice' && qItem.forcedOptions ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {qItem.forcedOptions.map((opt) => {
                        const selected = qAns === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleSelectValue(qItem.id, opt.id)}
                            className={`p-3 rounded-xl border text-right transition cursor-pointer ${
                              selected
                                ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                                : isLight
                                ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
                                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                            }`}
                          >
                            <div className="text-[11px] font-black opacity-80">الخيار {opt.id}</div>
                            <div className="text-xs font-bold leading-relaxed mt-0.5">{opt.textAr}</div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="grid grid-cols-5 gap-2">
                      {LIKERT_OPTIONS.map((opt) => {
                        const selected = qAns === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleSelectValue(qItem.id, opt.value)}
                            className={`p-2.5 rounded-xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                              selected
                                ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                                : isLight
                                ? 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800'
                                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                            }`}
                          >
                            <span className="text-sm font-black tabular-nums">{opt.value}</span>
                            <span className="text-[10px] font-bold">{opt.labelAr}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <>
            {/* Question Prompt & Scientific Explanation of Measured Dimension */}
            <div className="space-y-3 py-2">
              <div className="text-xs font-bold opacity-80">
                البُعد المقاس: <span className="text-purple-400">{currentQ.facetAr}</span> ·{' '}
                <span>{currentQ.format === 'forced_choice' ? 'اختيار قسري ثنائي' : 'مقياس ليكرت الخماسي'}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-black leading-relaxed font-['Alexandria']">
                {currentQ.textAr}
              </h3>

              <div className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2 ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-white/[0.04] border-white/10 text-slate-300'
              }`}>
                <BookOpen className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">التفسير العلمي للبُعد ({currentQ.scientificReference}): </span>
                  <span>{currentQ.dimensionExplanationAr}</span>
                </div>
              </div>
            </div>

            {/* Interactive Options (Likert-5 OR Forced-Choice) */}
            {currentQ.format === 'forced_choice' && currentQ.forcedOptions ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.forcedOptions.map((opt) => {
                  const selected = currentAnswer === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectValue(currentQ.id, opt.id)}
                      className={`p-4 rounded-2xl border text-right transition cursor-pointer flex flex-col justify-between gap-2 ${
                        selected
                          ? 'bg-purple-600 text-white border-purple-400 shadow-lg'
                          : isLight
                          ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-black opacity-80">الخيار {opt.id}</div>
                      <div className="text-sm font-bold leading-relaxed">{opt.textAr}</div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                {LIKERT_OPTIONS.map((opt) => {
                  const selected = currentAnswer === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelectValue(currentQ.id, opt.value)}
                      className={`p-3.5 rounded-2xl border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        selected
                          ? 'bg-purple-600 text-white border-purple-400 shadow-lg scale-[1.02]'
                          : isLight
                          ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-200'
                      }`}
                    >
                      <span className="text-base font-black tabular-nums">{opt.value}</span>
                      <span className="text-xs font-extrabold">{opt.labelAr}</span>
                      <span className="text-[10px] opacity-75">{opt.subAr}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Validation Warning */}
        {validationError && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-400 text-xs font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Footer Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-500/20">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-white/5 border-white/15 text-slate-200'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
            <span>السابق</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:opacity-95 text-white text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition cursor-pointer shadow-md"
          >
            <span>
              {(runnerMode === 'batch10' && batchStart + 10 >= questions.length) ||
              (runnerMode === 'single' && currentIdx + 1 === questions.length)
                ? 'اعتماد النتائج وعرض التقرير'
                : runnerMode === 'batch10'
                ? 'الصفحة التالية (10 أسئلة)'
                : 'التالي'}
            </span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Non-clinical Reminder */}
        <p className="text-[11px] opacity-70 text-center">
          {NON_CLINICAL_DISCLAIMER_AR}
        </p>
      </div>
    );
  }

  // 3. Main Hub: 3 Sub-Tabs (Tiers Catalog | My Reports & Timeline | Two-Person Comparison Engine)
  const evolution = buildTemporalEvolutionSummary(savedRecords);

  return (
    <section
      aria-label="مستويات التحليل النفسي المعتمدة وسجل التقارير والمقارنة"
      className={`rounded-3xl border p-5 sm:p-7 space-y-5 ${containerCard} ${tailwindClasses.containerClass}`}
      dir={direction}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-black font-['Alexandria'] flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            <span>منظومة التحليل النفسي متعدد المستويات والتقارير والمقارنة السيكومترية</span>
          </h2>
          <p className="text-xs opacity-80 leading-relaxed">
            مبنية حصرياً على النماذج العلمية الثمانية المعتمدة (Big Five · HEXACO · Attachment · Emotional Intelligence · Self Regulation · Interpersonal · Communication · Positive Psychology)
          </p>
        </div>
      </div>

      {/* Navigation Switcher for Tasks 1, 2, 3, 4 */}
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-2xl border ${
        isLight ? 'bg-slate-100 border-slate-200' : 'bg-black/40 border-white/10'
      }`}>
        <button
          type="button"
          onClick={() => {
            soundManager.playTap();
            setModuleTab('tiers');
          }}
          className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center justify-center gap-1.5 ${
            moduleTab === 'tiers'
              ? 'bg-purple-600 text-white shadow-md'
              : 'opacity-75 hover:opacity-100'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>مستويات التحليل الثلاثة (32 / 144 / 288)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundManager.playTap();
            setModuleTab('reports_timeline');
            refreshUnifiedHistory();
          }}
          className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center justify-center gap-1.5 ${
            moduleTab === 'reports_timeline'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'opacity-75 hover:opacity-100'
          }`}
        >
          <History className="w-4 h-4" />
          <span>سجل تقاريري وتتبع التغير مع الزمن ({savedRecords.length})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundManager.playTap();
            setModuleTab('two_person_compare');
          }}
          className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center justify-center gap-1.5 ${
            moduleTab === 'two_person_compare'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'opacity-75 hover:opacity-100'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>مقارنة شخصيتين (9 محاور + 6 مؤشرات)</span>
        </button>
      </div>

      {/* Non-Clinical Notice */}
      <div className={`p-3 rounded-2xl border text-xs leading-relaxed flex items-start gap-2 ${
        isLight ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-amber-950/25 border-amber-500/30 text-amber-200'
      }`}>
        <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
        <span>{NON_CLINICAL_DISCLAIMER_AR}</span>
      </div>

      {moduleTab === 'tiers' && (
        <>
          {pausedNotice && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 text-emerald-400 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{pausedNotice}</span>
            </div>
          )}

          {/* 3 Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ANALYSIS_TIERS_CATALOG.map((tierDef) => {
              const saved = savedProgressMap[tierDef.id];
              return (
                <div
                  key={tierDef.id}
                  className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 transition ${
                    isLight
                      ? 'bg-slate-50/80 border-slate-200 hover:border-purple-400'
                      : 'bg-white/[0.03] border-white/10 hover:border-purple-500/45'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="text-[11px] font-extrabold"
                        style={{ color: tierDef.accentColor }}
                      >
                        {tierDef.badgeAr}
                      </span>
                      <span className="text-[11px] font-bold opacity-75 flex items-center gap-1 tabular-nums">
                        <Clock className="w-3.5 h-3.5" />
                        {tierDef.durationLabelAr}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black font-['Alexandria']">
                      {tierDef.titleAr}
                    </h3>

                    <p className="text-xs opacity-80 leading-relaxed">{tierDef.descriptionAr}</p>

                    <div className="space-y-1 pt-2 border-t border-slate-500/15">
                      <div className="text-[11px] font-bold opacity-75">مخرجات التقرير:</div>
                      <ul className="space-y-1 text-[11px] opacity-90">
                        {tierDef.outputsAr.map((out, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <Sparkles className="w-3 h-3 shrink-0 mt-0.5" style={{ color: tierDef.accentColor }} />
                            <span>{out}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    {saved ? (
                      <>
                        <button
                          type="button"
                          onClick={() => startOrResumeTier(tierDef.id, false)}
                          className="w-full py-2.5 px-4 rounded-xl text-white text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                          style={{ backgroundColor: tierDef.accentColor }}
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>
                            استكمال التقييم ({saved.count}/{saved.total})
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => startOrResumeTier(tierDef.id, true)}
                          className={`w-full py-1.5 px-3 rounded-xl border text-[11px] font-bold transition cursor-pointer ${
                            isLight ? 'border-slate-300 text-slate-600' : 'border-white/15 text-slate-300'
                          }`}
                        >
                          بدء محاولة جديدة من الصفر
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => startOrResumeTier(tierDef.id, false)}
                        className="w-full py-2.5 px-4 rounded-xl text-white text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:opacity-95"
                        style={{ backgroundColor: tierDef.accentColor }}
                      >
                        <span>ابدأ {tierDef.titleAr} الآن</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {moduleTab === 'reports_timeline' && (
        <div className="space-y-5">
          {/* Longitudinal Evolution Summary (Task 3: Today vs Last Month vs Last Year) */}
          <div className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
            isLight ? 'bg-emerald-50/50 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/25'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span>تتبع التغير مع الزمن: نتائج اليوم × الشهر الماضي × العام الماضي</span>
                </h3>
                <p className="text-xs opacity-80 mt-0.5">{evolution.trendInsightAr}</p>
              </div>
              <span className="text-xs font-black text-emerald-500 tabular-nums">
                مؤشر التغير: {evolution.trendDelta >= 0 ? `+${evolution.trendDelta}%` : `${evolution.trendDelta}%`}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {evolution.buckets.map((b) => (
                <div
                  key={b.periodKey}
                  className={`p-3.5 rounded-xl border ${
                    isLight ? 'bg-white border-slate-200' : 'bg-black/35 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold opacity-75">
                    <span>{b.periodLabelAr}</span>
                    <span>{b.count} تقرير</span>
                  </div>
                  <div className="text-xl font-black text-emerald-500 tabular-nums my-1">
                    {b.count > 0 ? `${b.avgScore}%` : 'لا توجد سجلات'}
                  </div>
                  {b.count > 0 && (
                    <div className="space-y-1 text-[11px] opacity-85 pt-1 border-t border-slate-500/15">
                      <div className="flex justify-between">
                        <span>النضج النفسي والعاطفي:</span>
                        <strong className="tabular-nums">{b.emotionalAvg}%</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>الأداء المعرفي والذكاء:</span>
                        <strong className="tabular-nums">{b.cognitiveAvg}%</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>التوافق العلائقي والأسري:</span>
                        <strong className="tabular-nums">{b.relationalAvg}%</strong>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="relative sm:col-span-2">
              <Search className="w-4 h-4 opacity-50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                aria-label="ابحث في سجل تقاريري"
                placeholder="ابحث باسم التقرير، المستوى، أو النمط السيكومتري..."
                value={historySearchQuery}
                onChange={(e) => setHistorySearchQuery(e.target.value)}
                className={`w-full pr-9 pl-3 py-2 rounded-xl border text-xs outline-none ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900'
                    : 'bg-black/40 border-white/15 text-white'
                }`}
              />
            </div>

            <select
              aria-label="تصفية حسب مستوى التحليل"
              value={historyTierFilter}
              onChange={(e) => setHistoryTierFilter(e.target.value as any)}
              className={`px-3 py-2 rounded-xl border text-xs outline-none ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-slate-900'
                  : 'bg-black/40 border-white/15 text-white'
              }`}
            >
              <option value="all">كل مستويات التحليل</option>
              <option value="quick">التحليل السريع (32)</option>
              <option value="advanced">التحليل المتقدم (144)</option>
              <option value="professional">التحليل الاحترافي (288)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
            <span className="opacity-70 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> تصنيف:
            </span>
            {[
              { id: 'all', label: `الكل (${savedRecords.length})` },
              {
                id: 'tiered_assessment',
                label: `مستويات التحليل (${savedRecords.filter((r) => r.testType === 'tiered_assessment').length})`,
              },
              {
                id: 'personality_comparison',
                label: `مقارنة شخصيتين (${savedRecords.filter((r) => r.testType === 'personality_comparison').length})`,
              },
              {
                id: 'psychology',
                label: `المقاييس النفسية (${savedRecords.filter((r) => r.testType === 'psychology').length})`,
              },
              {
                id: 'intelligence',
                label: `اختبارات الذكاء (${savedRecords.filter((r) => r.testType === 'intelligence').length})`,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setHistoryFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
                  historyFilter === tab.id
                    ? 'bg-purple-600 text-white'
                    : isLight
                    ? 'bg-slate-100 text-slate-700'
                    : 'bg-white/5 text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {loadingRecords ? (
            <div className="p-6 text-center text-xs opacity-75">جارٍ تحميل سجل تقاريرك...</div>
          ) : savedRecords.length === 0 ? (
            <div className={`p-8 rounded-2xl border text-center space-y-2 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/25 border-white/10'}`}>
              <div className="text-sm font-extrabold">لا توجد تقارير محفوظة حتى الآن</div>
              <p className="text-xs opacity-75">
                أكمل أي مستوى تحليل (سريع، متقدم، أو احترافي) ليتم حفظ الدرجات الخام والمعيارية والتقرير الكامل هنا تلقائياً.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedRecords
                .filter((r) => (historyFilter === 'all' ? true : r.testType === historyFilter))
                .filter((r) => (historyTierFilter === 'all' ? true : r.analysisTier === historyTierFilter))
                .filter((r) => {
                  const q = historySearchQuery.trim().toLowerCase();
                  if (!q) return true;
                  return (
                    r.testTitleAr.toLowerCase().includes(q) ||
                    r.scoreOrArchetype.toLowerCase().includes(q) ||
                    r.testCategoryAr.toLowerCase().includes(q)
                  );
                })
                .map((rec) => (
                  <div
                    key={rec.id}
                    className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/10'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-extrabold text-sm">{rec.testTitleAr}</h4>
                        <span className="text-[11px] opacity-75">({rec.testCategoryAr})</span>
                      </div>
                      <div className="text-xs font-bold text-purple-500">{rec.scoreOrArchetype}</div>
                      <div className="text-[11px] opacity-70 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(rec.createdAt).toLocaleString('ar-SA')}</span>
                        {rec.rawScores && (
                          <span>· الدرجات الخام والمعيارية محفوظة ({Object.keys(rec.rawScores).length} بُعداً)</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          soundManager.playTap();
                          if (rec.snapshot && rec.snapshot.subscales && rec.snapshot.visualCharts) {
                            setReport(rec.snapshot as TieredAssessmentReport);
                          } else {
                            setReopenedRecord(rec);
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>إعادة فتح التقرير</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadSavedRecordPdf(rec)}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span>إعادة تحميل PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteRecord(rec.id)}
                        aria-label="حذف التقرير"
                        className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/30 text-rose-400 transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {reopenedRecord && (
            <div className="p-5 rounded-2xl border border-purple-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm">{reopenedRecord.testTitleAr}</h4>
                <button
                  type="button"
                  onClick={() => setReopenedRecord(null)}
                  className="p-1.5 rounded-lg bg-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs font-bold text-emerald-500">{reopenedRecord.scoreOrArchetype}</p>
              {reopenedRecord.keyInsights?.map((ins, idx) => (
                <div key={idx} className="text-xs">• {ins}</div>
              ))}
            </div>
          )}
        </div>
      )}

      {moduleTab === 'two_person_compare' && (
        <div className="space-y-5">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl border ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/10'
          }`}>
            <div>
              <label className="block text-xs font-extrabold text-purple-500 mb-1.5">
                الشخص الأول (شخص أ / المستخدم):
              </label>
              <select
                aria-label="مصدر بيانات الشخص الأول"
                value={sourceAKey}
                onChange={(e) => setSourceAKey(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                  isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-black/50 border-white/15 text-white'
                }`}
              >
                <option value="questionnaire">ملفي الشخصي الحالي (الاستبيان)</option>
                {savedRecords
                  .filter((r) => r.testType === 'tiered_assessment' || r.testType === 'psychology')
                  .map((rec) => (
                    <option key={`pa_${rec.id}`} value={`record:${rec.id}`}>
                      تقرير محفوظ: {rec.testTitleAr} ({rec.percentage}%)
                    </option>
                  ))}
                {COMMUNITY_PROFILES.slice(0, 6).map((cm, idx) => (
                  <option key={`ca_${cm.id}`} value={`community:${idx}`}>
                    ملف مرجعي: {cm.displayName} — {cm.country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-emerald-500 mb-1.5">
                الشخص الثاني (شخص ب / شريك محتمل):
              </label>
              <select
                aria-label="مصدر بيانات الشخص الثاني"
                value={sourceBKey}
                onChange={(e) => setSourceBKey(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs outline-none ${
                  isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-black/50 border-white/15 text-white'
                }`}
              >
                <option value="custom_sliders">تخصيص درجات الشريك المحتمل يدوياً (9 محاور)</option>
                {COMMUNITY_PROFILES.slice(0, 8).map((cm, idx) => (
                  <option key={`cb_${cm.id}`} value={`community:${idx}`}>
                    شريك مرجعي: {cm.displayName} — {cm.country}
                  </option>
                ))}
                {savedRecords
                  .filter((r) => r.testType === 'tiered_assessment' || r.testType === 'psychology')
                  .map((rec) => (
                    <option key={`pb_${rec.id}`} value={`record:${rec.id}`}>
                      تقرير محفوظ: {rec.testTitleAr} ({rec.percentage}%)
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {sourceBKey === 'custom_sliders' && (
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/10'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-extrabold flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-emerald-500" />
                  <span>معايرة المحاور التسعة للشريك المحتمل (ب):</span>
                </span>
                <input
                  type="text"
                  aria-label="اسم الشريك المحتمل"
                  value={customPartnerB.name}
                  onChange={(e) => setCustomPartnerB((p) => ({ ...p, name: e.target.value }))}
                  placeholder="اسم الشريك المحتمل"
                  className={`px-3 py-1 rounded-lg border text-xs ${
                    isLight ? 'bg-white border-slate-300' : 'bg-black/50 border-white/15 text-white'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {[
                  { key: 'openness', label: 'الانفتاح الفكري (Big Five)' },
                  { key: 'conscientiousness', label: 'يقظة الضمير والانضباط' },
                  { key: 'agreeableness', label: 'الوفاق واللطف العلائقي' },
                  { key: 'emotionalStability', label: 'الاتزان الانفعالي' },
                  { key: 'honestyHumility', label: 'الصدق والتواضع (HEXACO)' },
                  { key: 'emotionalIntelligence', label: 'الذكاء العاطفي (EI)' },
                  { key: 'communication', label: 'وضوح وحزم التواصل' },
                  { key: 'conflictCollab', label: 'التعاون في حل الخلافات' },
                  { key: 'valuesScore', label: 'القيم الجوهرية والأخلاق' },
                  { key: 'lifeGoalsScore', label: 'اتساق الأهداف الحياتية' },
                  { key: 'parentingScore', label: 'التوجه الأسري والتربوي' },
                  { key: 'anxiety', label: 'قلق التعلق (الأقل = أمان أعلى)' },
                ].map((sl) => (
                  <div key={sl.key} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span>{sl.label}</span>
                      <span className="tabular-nums text-purple-400">
                        {(customPartnerB as any)[sl.key]}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={98}
                      aria-label={sl.label}
                      value={(customPartnerB as any)[sl.key]}
                      onChange={(e) =>
                        setCustomPartnerB((p) => ({ ...p, [sl.key]: Number(e.target.value) }))
                      }
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleRunComparison}
            className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 hover:opacity-95 text-white text-xs sm:text-sm font-extrabold transition cursor-pointer shadow-lg flex items-center justify-center gap-2"
          >
            <Scale className="w-4 h-4" />
            <span>احسب التوافق العلمي الشامل بين الشخصيتين (9 محاور + 6 مؤشرات)</span>
          </button>

          {comparisonReport && (
            <div className="space-y-4">
              {/* Weighted Final Index Header */}
              <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isLight ? 'bg-indigo-50/70 border-indigo-200' : 'bg-indigo-950/30 border-indigo-500/35'
              }`}>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-purple-400">
                    {comparisonReport.personA.personName} ✕ {comparisonReport.personB.personName}
                  </div>
                  <h3 className="text-base sm:text-lg font-black font-['Alexandria']">
                    {comparisonReport.compatibilityClassificationAr}
                  </h3>
                  <p className="text-xs opacity-85 leading-relaxed">
                    {comparisonReport.executiveSummaryAr}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-center shrink-0 min-w-[135px]">
                  <div className="text-[11px] font-bold">المؤشر العام الموزون</div>
                  <div className="text-3xl font-black text-emerald-500 tabular-nums mt-0.5">
                    {comparisonReport.overallWeightedCompatibility}%
                  </div>
                </div>
              </div>

              {/* 6 Independent Domain Sub-Indices (Task 4 Requirement) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {comparisonReport.subIndices.map((sub) => (
                  <div
                    key={sub.key}
                    className={`p-4 rounded-2xl border space-y-2 ${
                      isLight ? 'bg-white border-slate-200' : 'bg-white/[0.03] border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold">{sub.titleAr}</span>
                      <span className="font-black text-emerald-500 tabular-nums">{sub.score}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-500/20 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-emerald-500"
                        style={{ width: `${sub.score}%` }}
                      />
                    </div>
                    <p className="text-[11px] opacity-80 leading-relaxed">{sub.interpretationAr}</p>
                    <div className="text-[10px] opacity-60">
                      الوزن النسبي: {Math.round(sub.weight * 100)}% · {sub.scientificReference}
                    </div>
                  </div>
                ))}
              </div>

              {/* 9 Axes Detailed Comparison Table */}
              <div className={`p-4 rounded-2xl border space-y-2.5 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/10'
              }`}>
                <h4 className="text-xs sm:text-sm font-extrabold">
                  تفصيل المقارنة عبر المحاور السيكومترية التسعة:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {comparisonReport.nineAxesBreakdown.map((ax) => (
                    <div
                      key={ax.axisKey}
                      className={`p-3 rounded-xl border text-xs space-y-1 ${
                        isLight ? 'bg-white border-slate-200' : 'bg-white/[0.03] border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold">
                        <span>{ax.axisNameAr}</span>
                        <span className="text-purple-400 tabular-nums">{ax.matchScore}%</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] opacity-75 tabular-nums">
                        <span>أ: {ax.personAScore}%</span>
                        <span>ب: {ax.personBScore}%</span>
                        <span>Δ {ax.delta}%</span>
                      </div>
                      <p className="text-[11px] opacity-85">{ax.scientificNoteAr}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dual Overlay Radar Visualization */}
              <Suspense
                fallback={
                  <div className="p-6 text-center text-xs opacity-75">
                    جارٍ رسم رادار المقارنة المزدوج...
                  </div>
                }
              >
                {(() => {
                  const overlayCharts: VisualChartsPayload = {
                    overallRadar: comparisonReport.nineAxesBreakdown.slice(0, 8).map((r) => ({
                      subject: r.axisNameAr.split('(')[0].trim(),
                      score: r.matchScore,
                      fullMark: 100,
                    })),
                    bigFiveRadar: [
                      { trait: 'الانفتاح (O)', score: comparisonReport.personA.bigFive.openness, benchmark: comparisonReport.personB.bigFive.openness, fullMark: 100 },
                      { trait: 'الضمير (C)', score: comparisonReport.personA.bigFive.conscientiousness, benchmark: comparisonReport.personB.bigFive.conscientiousness, fullMark: 100 },
                      { trait: 'الانبساط (E)', score: comparisonReport.personA.bigFive.extraversion, benchmark: comparisonReport.personB.bigFive.extraversion, fullMark: 100 },
                      { trait: 'الوفاق (A)', score: comparisonReport.personA.bigFive.agreeableness, benchmark: comparisonReport.personB.bigFive.agreeableness, fullMark: 100 },
                      { trait: 'الاتزان (ES)', score: comparisonReport.personA.bigFive.emotionalStability, benchmark: comparisonReport.personB.bigFive.emotionalStability, fullMark: 100 },
                    ],
                    hexacoRadar: [
                      { trait: 'الصدق-التواضع (H)', score: comparisonReport.personA.hexaco.honestyHumility, fullMark: 100 },
                      { trait: 'العاطفية (E)', score: comparisonReport.personA.hexaco.emotionality, fullMark: 100 },
                      { trait: 'الانبساط (X)', score: comparisonReport.personA.hexaco.extraversion, fullMark: 100 },
                      { trait: 'التسامح (A)', score: comparisonReport.personA.hexaco.agreeableness, fullMark: 100 },
                      { trait: 'الاجتهاد (C)', score: comparisonReport.personA.hexaco.conscientiousness, fullMark: 100 },
                      { trait: 'الانفتاح (O)', score: comparisonReport.personA.hexaco.openness, fullMark: 100 },
                    ],
                    emotionalIntelligence: [
                      { branch: `الذكاء العاطفي (${comparisonReport.personA.personName})`, score: comparisonReport.personA.emotionalIntelligence, color: '#8b5cf6' },
                      { branch: `الذكاء العاطفي (${comparisonReport.personB.personName})`, score: comparisonReport.personB.emotionalIntelligence, color: '#10b981' },
                    ],
                    attachment: {
                      anxiety: comparisonReport.personA.attachment.anxiety,
                      avoidance: comparisonReport.personA.attachment.avoidance,
                      styleKey: 'secure',
                      styleAr: comparisonReport.personA.attachment.styleAr,
                      styleEn: 'Attachment',
                    },
                    communicationStyles: [
                      { style: 'الحزم المحترم', score: comparisonReport.personA.communicationStyle.assertive, color: '#3b82f6' },
                      { style: 'الإنصات التأملي', score: comparisonReport.personA.communicationStyle.reflective, color: '#10b981' },
                      { style: 'الوضوح التحليلي', score: comparisonReport.personA.communicationStyle.analytical, color: '#8b5cf6' },
                      { style: 'الدفء التعبيري', score: comparisonReport.personA.communicationStyle.expressive, color: '#ec4899' },
                    ],
                    conflictModes: [
                      { mode: 'التعاون', score: comparisonReport.personA.conflictResolution.collaborating, fullMark: 100 },
                      { mode: 'الحلول الوسطية', score: comparisonReport.personA.conflictResolution.compromising, fullMark: 100 },
                      { mode: 'الاستيعاب', score: comparisonReport.personA.conflictResolution.accommodating, fullMark: 100 },
                      { mode: 'الحسم', score: comparisonReport.personA.conflictResolution.competing, fullMark: 100 },
                      { mode: 'التجنب', score: comparisonReport.personA.conflictResolution.avoiding, fullMark: 100 },
                    ],
                    lifeGoalsAlignment: [
                      { domain: 'الاستقرار الأسري', userScore: comparisonReport.personA.lifeGoals.familyStability, targetBenchmark: comparisonReport.personB.lifeGoals.familyStability },
                      { domain: 'النمو المهني', userScore: comparisonReport.personA.lifeGoals.careerGrowth, targetBenchmark: comparisonReport.personB.lifeGoals.careerGrowth },
                      { domain: 'العمق الفكري', userScore: comparisonReport.personA.lifeGoals.intellectualDepth, targetBenchmark: comparisonReport.personB.lifeGoals.intellectualDepth },
                      { domain: 'التناغم الاجتماعي', userScore: comparisonReport.personA.lifeGoals.socialHarmony, targetBenchmark: comparisonReport.personB.lifeGoals.socialHarmony },
                    ],
                    compatibilityMatrix: comparisonReport.nineAxesBreakdown.slice(0, 8).map((r) => ({
                      axisA: r.axisNameAr.split('(')[0],
                      axisB: 'توافق الثنائي',
                      synergyScore: r.matchScore,
                      labelAr: r.axisNameAr.split('(')[0],
                    })),
                  };
                  return (
                    <LazyScientificVisualDashboards
                      charts={overlayCharts}
                      userName={comparisonReport.personA.personName}
                      comparisonOverlay={{
                        personAName: comparisonReport.personA.personName,
                        personBName: comparisonReport.personB.personName,
                        axes: comparisonReport.nineAxesBreakdown,
                      }}
                    />
                  );
                })()}
              </Suspense>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSaveComparisonToHistory}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    comparisonSaved
                      ? 'bg-emerald-600 text-white'
                      : 'bg-purple-600 hover:bg-purple-500 text-white'
                  }`}
                >
                  <BookmarkCheck className="w-4 h-4" />
                  <span>{comparisonSaved ? '✓ تم الحفظ في سجل تقاريري' : 'حفظ المقارنة في سجل تقاريري'}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDownloadSavedRecordPdf({
                      id: comparisonReport.id,
                      userId: 'current',
                      testType: 'personality_comparison',
                      testTitleAr: `مقارنة: ${comparisonReport.personA.personName} ✕ ${comparisonReport.personB.personName}`,
                      testCategoryAr: 'مقارنة شخصيتين علمياً',
                      scoreOrArchetype: `${comparisonReport.overallWeightedCompatibility}%`,
                      percentage: comparisonReport.overallWeightedCompatibility,
                      createdAt: comparisonReport.createdAt,
                      badgeColor: '#059669',
                      keyInsights: [],
                      snapshot: comparisonReport,
                    })
                  }
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span>تصدير تقرير المقارنة (PDF بالرسوم)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
