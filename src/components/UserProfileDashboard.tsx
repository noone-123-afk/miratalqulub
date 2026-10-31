import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from 'recharts';
import {
  User,
  Brain,
  Heart,
  Sparkles,
  Share2,
  Copy,
  Check,
  Globe,
  Lock,
  CheckCircle2,
  ShieldCheck,
  Compass,
  ArrowLeft,
  MessageCircle,
  Award,
  X,
  Target,
  AlertTriangle,
  Users,
  Send,
  Linkedin,
  Phone,
  Filter,
  History,
  Calendar,
  Trash2,
  TrendingUp,
  BarChart3,
  FileDown,
  Edit3,
  Plus,
  Sliders,
  Eye,
  RotateCcw,
  ClipboardCheck,
  Search,
} from 'lucide-react';
import { UserProfile, PartnerAnalysisResult } from '../types';
import {
  PsychometricReport,
  calculatePsychometricReport,
  getQuestionsForAssessment,
  AssessmentType,
} from '../data/psychologySuiteData';
import {
  COMMUNITY_PROFILES,
  CommunityMemberProfile,
  UserPersonalQuestionnaireData,
  QUESTIONNAIRE_OPTIONS,
  loadUserPersonalQuestionnaire,
  saveUserPersonalQuestionnaire,
  calculateMemberPsychometricMatch,
} from '../data/communityProfiles';
import { soundManager } from '../utils/sound';
import { useAuth } from '../context/AuthContext';
import {
  setPublicProfileStatus,
  fetchUnifiedTestHistory,
  deleteUnifiedTestRecord,
  fetchPublicCommunityProfiles,
  saveUserPsychologyReport,
  savePersistentUserProfile,
  UnifiedTestRecord,
} from '../services/userHistoryService';
import { exportPsychometricReportAsPDF } from '../utils/pdfReportGenerator';
import { SkeletonLoader } from './SkeletonLoader';

export type DashboardTabKey =
  | 'overview'
  | 'questionnaire'
  | 'cattell_16pf'
  | 'partner'
  | 'matches'
  | 'history'
  | 'share';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  result?: PartnerAnalysisResult | null;
  onOpenPsychologyTests?: (initialTestId?: AssessmentType) => void;
  onOpenIntelligenceTest?: () => void;
  onOpenCoupleInvite?: () => void;
  onOpenLiveChat?: () => void;
  onProfileUpdated?: (newProfile: UserProfile) => void;
  initialTab?: DashboardTabKey;
}

function openExternalShareUrl(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export const UserProfileDashboard: React.FC<Props> = ({
  isOpen,
  onClose,
  profile,
  result,
  onOpenPsychologyTests,
  onOpenIntelligenceTest,
  onOpenCoupleInvite,
  onOpenLiveChat,
  onProfileUpdated,
  initialTab = 'overview',
}) => {
  const { user } = useAuth();
  const [isPublic, setIsPublic] = useState(() => {
    try {
      return localStorage.getItem('is_user_public_profile') === 'true';
    } catch {
      return false;
    }
  });
  const [whatsappContact, setWhatsappContact] = useState(() => {
    try {
      return localStorage.getItem('user_contact_whatsapp') || '';
    } catch {
      return '';
    }
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTabKey>(initialTab);
  const [matchFilter, setMatchFilter] = useState<'all' | 'complementary' | 'similar'>('all');
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
  const [matchSearchQuery, setMatchSearchQuery] = useState('');
  const [selectedMemberToCompare, setSelectedMemberToCompare] =
    useState<CommunityMemberProfile | null>(null);
  const [rawCommunityMembers, setRawCommunityMembers] =
    useState<CommunityMemberProfile[]>(COMMUNITY_PROFILES);

  // Unified Test History State
  const [testHistory, setTestHistory] = useState<UnifiedTestRecord[]>([]);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(false);
  const [historyFilter, setHistoryFilter] = useState<
    'all' | 'intelligence' | 'psychology' | 'partner_compatibility'
  >('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Latest General Psychometric Report
  const [report, setReport] = useState<PsychometricReport>(() => {
    try {
      const cached = localStorage.getItem('latest_psychology_report');
      if (cached) return JSON.parse(cached);
    } catch {}
    return calculatePsychometricReport('big_five', {}, profile?.userName || 'المستخدم');
  });

  // Dedicated Cattell 16PF Report & Inline Assessment State
  const [cattellReport, setCattellReport] = useState<PsychometricReport>(() => {
    try {
      const cached16 = localStorage.getItem('psychology_report_sixteen_pf');
      if (cached16) return JSON.parse(cached16);
    } catch {}
    return calculatePsychometricReport('sixteen_pf', {}, profile?.userName || 'المستخدم');
  });
  const [isTaking16PFInline, setIsTaking16PFInline] = useState(false);
  const [inline16PFAnswers, setInline16PFAnswers] = useState<Record<string, string>>({});
  const [cattellViewMode, setCattellViewMode] = useState<'clusters' | 'global5' | 'all16'>('all16');
  const [inline16PFMissing, setInline16PFMissing] = useState<number[]>([]);

  // User Personal, Behavioral & Marital Questionnaire State
  const [questionnaire, setQuestionnaire] = useState<UserPersonalQuestionnaireData>(() =>
    loadUserPersonalQuestionnaire(profile, null)
  );
  const [questionnaireSavedToast, setQuestionnaireSavedToast] = useState(false);
  const [customStrengthInput, setCustomStrengthInput] = useState('');
  const [customInterestInput, setCustomInterestInput] = useState('');
  const [customAspirationInput, setCustomAspirationInput] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    let latestRep: PsychometricReport | null = null;
    try {
      const cached = localStorage.getItem('latest_psychology_report');
      if (cached) {
        latestRep = JSON.parse(cached);
        if (latestRep) setReport(latestRep);
      }
      const cached16 = localStorage.getItem('psychology_report_sixteen_pf');
      if (cached16) {
        const parsed16 = JSON.parse(cached16);
        if (parsed16) setCattellReport(parsed16);
      }
    } catch {}
    setQuestionnaire(loadUserPersonalQuestionnaire(profile, latestRep));
  }, [isOpen, profile]);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Load test history and community profiles when modal opens
  useEffect(() => {
    if (!isOpen) return;
    fetchPublicCommunityProfiles().then((realList) => {
      setRawCommunityMembers(realList);
    });

    const loadHistory = async () => {
      setLoadingHistory(true);
      try {
        const records = await fetchUnifiedTestHistory(user);
        setTestHistory(records);
      } catch (e) {
        console.warn('Could not load test history', e);
      } finally {
        setLoadingHistory(false);
      }
    };
    loadHistory();
  }, [isOpen, activeTab, user]);

  if (!isOpen) return null;

  const userName =
    questionnaire.fullName?.trim() ||
    profile?.userName ||
    user?.displayName ||
    'المستخدم';
  const userAge = questionnaire.userAge || profile?.userAge || 26;
  const userGender = questionnaire.userGender || profile?.userGender || 'male';
  const country = questionnaire.country || profile?.country || 'المملكة العربية السعودية';
  const city = questionnaire.city?.trim() || country;

  // Combine user-declared questionnaire answers with empirical test findings
  const effectiveStrengths: string[] = [
    ...questionnaire.selectedStrengths,
    ...questionnaire.customStrengths,
    ...(questionnaire.stressResponseStyle ? [`أسلوب إدارة الضغوط: ${questionnaire.stressResponseStyle}`] : []),
    ...(questionnaire.decisionMakingStyle ? [`منهجية اتخاذ القرار: ${questionnaire.decisionMakingStyle}`] : []),
    ...(report.isCompleted ? report.userStrengthsAr.slice(0, 3) : []),
    ...(cattellReport.isCompleted ? cattellReport.userStrengthsAr.slice(0, 2) : []),
  ].filter((v, i, arr) => Boolean(v) && arr.indexOf(v) === i);

  const effectiveInterests: string[] = [
    ...questionnaire.selectedInterests,
    ...questionnaire.customInterests,
    ...(questionnaire.intellectualPassion
      ? [`الشغف المعرفي والفكري: ${questionnaire.intellectualPassion}`]
      : []),
    ...(questionnaire.weekendRoutinePreference
      ? [`نمط قضاء الأوقات اليومية والإجازات: ${questionnaire.weekendRoutinePreference}`]
      : []),
    ...(report.isCompleted ? report.userInterestsAr.slice(0, 2) : []),
  ].filter((v, i, arr) => Boolean(v) && arr.indexOf(v) === i);

  const effectiveAspirations: string[] = [
    ...questionnaire.selectedMaritalAspirations,
    ...questionnaire.customMaritalAspirations,
    ...(questionnaire.maritalHomeAtmosphere
      ? [`أجواء البيت الزوجي المنشودة: ${questionnaire.maritalHomeAtmosphere}`]
      : []),
    ...(questionnaire.financialManagementVision
      ? [`الرؤية المالية للأسرة: ${questionnaire.financialManagementVision}`]
      : []),
    ...(questionnaire.conflictResolutionProtocol
      ? [`منهجية حل الخلافات الزوجية: ${questionnaire.conflictResolutionProtocol}`]
      : []),
    ...(questionnaire.parentingAndFamilyVision
      ? [`الرؤية التربوية والأسرية: ${questionnaire.parentingAndFamilyVision}`]
      : []),
    ...(questionnaire.primaryLoveLanguage
      ? [`لغة الحب والتقدير الأساسية: ${questionnaire.primaryLoveLanguage}`]
      : []),
  ].filter((v, i, arr) => Boolean(v) && arr.indexOf(v) === i);

  const getCore5Dimensions = () => {
    const activeRep = cattellReport.isCompleted ? cattellReport : report;
    const findS = (keys: string[], fb: number) => {
      for (const k of keys) {
        const d = activeRep.dimensionScores.find((x) => x.key === k);
        if (d) return d.score;
      }
      if (activeRep.cattellGlobalFactors) {
        for (const k of keys) {
          const g = activeRep.cattellGlobalFactors.find((x) => x.key === k);
          if (g) return g.score;
        }
      }
      return fb;
    };
    return {
      extraversion: findS(['extraversion', 'global_extraversion', 'eysenck_extraversion', 'warmth'], 72),
      emotionalStability: findS(['emotional_stability', 'global_stability', 'eysenck_stability', 'stability'], 78),
      openness: findS(['openness', 'global_sensitivity', 'openness_to_change', 'reasoning'], 80),
      agreeableness: findS(['agreeableness', 'eysenck_empathy', 'warmth', 'social_empathy'], 84),
      conscientiousness: findS(['conscientiousness', 'global_self_control', 'rule_consciousness', 'perfectionism'], 82),
    };
  };

  // Save Questionnaire handler
  const handleSaveQuestionnaire = async () => {
    soundManager.playRoundPass();
    saveUserPersonalQuestionnaire(questionnaire);
    setQuestionnaire((prev) => ({ ...prev, isCompleted: true }));
    setQuestionnaireSavedToast(true);
    setTimeout(() => setQuestionnaireSavedToast(false), 3500);

    // Sync updated demographic fields to persistent profile
    const updatedProfile: UserProfile = {
      userGender: questionnaire.userGender,
      partnerGender: questionnaire.userGender === 'male' ? 'female' : 'male',
      userAge: questionnaire.userAge,
      country: questionnaire.country,
      ethnicity: profile?.ethnicity || 'عربي',
      educationLevel: questionnaire.educationAndCareer,
      lifestyleOutlook: questionnaire.maritalHomeAtmosphere,
      partnerFeaturesPreference: questionnaire.partnerCorePersonalityType,
      userName: questionnaire.fullName || profile?.userName,
      userBirthDate: profile?.userBirthDate,
    };
    await savePersistentUserProfile(updatedProfile, user);
    if (onProfileUpdated) {
      onProfileUpdated(updatedProfile);
    }

    // If profile is public, also sync to public_profiles
    if (isPublic) {
      await setPublicProfileStatus(user, true, {
        displayName: userName,
        userGender,
        userAge,
        country,
        city,
        archetype: cattellReport.isCompleted
          ? cattellReport.primaryArchetypeAr
          : report.primaryArchetypeAr,
        contactWhatsapp: whatsappContact,
        bio: questionnaire.personalBio,
        strengths: effectiveStrengths.slice(0, 6),
        interests: effectiveInterests.slice(0, 6),
        aspirations: effectiveAspirations.slice(0, 6),
        idealPartnerNeeds: questionnaire.partnerEmotionalNeedsFromThem,
        communicationStyle: questionnaire.partnerCommunicationPreference,
        dimensionScores: getCore5Dimensions(),
      });
    }
  };

  // Inline 16PF Assessment Submission
  const sixteenPFQuestions = getQuestionsForAssessment('sixteen_pf');
  const handleCompleteInline16PF = async () => {
    const missing: number[] = [];
    sixteenPFQuestions.forEach((q, idx) => {
      if (!inline16PFAnswers[q.id]) missing.push(idx);
    });
    if (missing.length > 0) {
      soundManager.playTap();
      setInline16PFMissing(missing);
      return;
    }
    setInline16PFMissing([]);
    const new16Report = calculatePsychometricReport('sixteen_pf', inline16PFAnswers, userName);
    soundManager.playRoundPass();
    setCattellReport(new16Report);
    setReport(new16Report);
    setIsTaking16PFInline(false);
    await saveUserPsychologyReport(user, new16Report, profile);
    const updatedRecords = await fetchUnifiedTestHistory(user);
    setTestHistory(updatedRecords);
  };

  // Export Full Psychometric Profile Dashboard as PDF
  const handleExportFullDashboardPDF = () => {
    soundManager.playTap();
    const activeRep = cattellReport.isCompleted ? cattellReport : report;
    exportPsychometricReportAsPDF({
      reportTitle: `الملف الشخصي السيكومتري والزوجي الشامل — ${userName}`,
      subTitle: 'Comprehensive Psychometric, 16PF & Marital Compatibility Dossier',
      scientificBasis:
        'مبني على إجابات المستخدم الفعلية، مقياس كاتل للعوامل الـ 16 (16PF)، العوامل الخمسة الكبرى (Big Five)، ونظرية غوتمان وبولبي للتوافق الزوجي',
      userName: `${userName} (${userAge} سنة • ${country})`,
      completedAt: new Date().toLocaleDateString('ar-JO'),
      overallScoreLabel: 'مؤشر النضج والاتزان السيكومتري العام',
      overallScoreValue: `${activeRep.totalScore}% (المئين ${activeRep.overallPercentile}%)`,
      cognitiveFingerprintTitle: activeRep.primaryArchetypeAr,
      executiveSummary: `${
        questionnaire.personalBio
          ? `النبذة الشخصية: ${questionnaire.personalBio} — `
          : ''
      }${activeRep.summaryAr || activeRep.validityMessageAr}`,
      metrics: cattellReport.dimensionScores.map((d) => ({
        label: d.factorCode ? `[${d.factorCode}] ${d.labelAr}` : d.labelAr,
        scorePercent: d.score,
        levelLabel: d.stenScore ? `${d.levelAr} (Sten ${d.stenScore}/10)` : d.levelAr,
        rawText: d.plainExplanationAr
          ? `${d.plainExplanationAr} — ${d.analysisAr}`
          : d.analysisAr,
        color: d.color || '#8b5cf6',
      })),
      sections: [
        {
          title: '1. صفاتي ونقاط قوتي السلوكية (Behavioral Strengths)',
          badge: 'من إجاباتك الشخصية والسيكومترية',
          content: `المستوى التعليمي والمهني: ${questionnaire.educationAndCareer || 'غير محدد'} | أسلوب إدارة الضغوط: ${questionnaire.stressResponseStyle}`,
          items: effectiveStrengths,
        },
        {
          title: '2. اهتماماتي وشغفي اليومي (Daily Interests & Passions)',
          badge: 'نمط الحياة والشغف المعرفي',
          content: `الشغف الفكري: ${questionnaire.intellectualPassion} | روتين نهاية الأسبوع: ${questionnaire.weekendRoutinePreference}`,
          items: effectiveInterests,
        },
        {
          title: '3. تطلعاتي المستقبلية للعش الزوجي (Marital Nest Vision)',
          badge: 'رؤية الأسرة والحوار والمالية',
          content: `لغة الحب الأساسية: ${questionnaire.primaryLoveLanguage}`,
          items: effectiveAspirations,
        },
        {
          title: '4. مواصفات شريك الحياة المناسب (Ideal Life Partner Profile)',
          badge: questionnaire.partnerCorePersonalityType,
          content: `الاحتياجات العاطفية: ${questionnaire.partnerEmotionalNeedsFromThem} — أسلوب الحوار المفضل: ${questionnaire.partnerCommunicationPreference}`,
          items: [
            `الفئة العمرية المفضلة للشريك: ${questionnaire.preferredPartnerAgeRange}`,
            ...questionnaire.partnerEssentialTraits.map((t) => `صفة أساسية مطلوبة: ${t}`),
            ...questionnaire.partnerGreenFlags.map((g) => `مؤشر توافق إيجابي (Green Flag): ${g}`),
            ...questionnaire.partnerRedFlags.map((r) => `مؤشر تنافر مرفوض (Red Flag): ${r}`),
          ],
        },
        ...(cattellReport.cattellGlobalFactors
          ? [
              {
                title: '5. العوامل العالمية الخمسة الكبرى في مقياس كاتل (16PF Global Factors)',
                badge: 'Raymond Cattell 16PF',
                content: 'الخلاصة العاملية المبسطة لغير المختصين:',
                items: cattellReport.cattellGlobalFactors.map(
                  (gf) => `${gf.labelAr} (${gf.score}% • Sten ${gf.sten}/10): ${gf.plainExplanationAr}`
                ),
              },
            ]
          : []),
      ],
      careersOrRecommendations: cattellReport.userAspirationsAr || report.userAspirationsAr || [],
      questionAudit: (activeRep.questionAudit || []).map((qa) => ({
        questionNumber: qa.questionNumber,
        questionText: qa.promptAr,
        userAnswer: qa.selectedOptionAr,
        correctAnswerOrTrait: `${qa.traitMeasuredAr} (${qa.scientificTraitEn})`,
        isCorrectOrHigh: qa.scoreWeight >= 3,
        pointsEarned: `${qa.scoreWeight}/${qa.maxWeight}`,
      })),
    });
  };

  // Export any historical test record as PDF
  const handleDownloadHistoryRecordPDF = (rec: UnifiedTestRecord) => {
    soundManager.playTap();
    const snap = rec.snapshot;
    if (rec.testType === 'psychology' && snap && snap.dimensionScores) {
      exportPsychometricReportAsPDF({
        reportTitle: snap.testTitleAr || rec.testTitleAr,
        subTitle: 'Psychometric Assessment Report',
        scientificBasis: 'مختبر المقاييس النفسية والسيكومترية المعتمد',
        userName,
        completedAt: new Date(rec.createdAt).toLocaleDateString('ar-JO'),
        overallScoreLabel: 'النتيجة الكلية والنمط السيكومتري',
        overallScoreValue: `${rec.percentage}% — ${rec.scoreOrArchetype}`,
        cognitiveFingerprintTitle: snap.primaryArchetypeAr || rec.scoreOrArchetype,
        executiveSummary: snap.summaryAr || snap.validityMessageAr || rec.testCategoryAr,
        metrics: (snap.dimensionScores || []).map((d: any) => ({
          label: d.factorCode ? `[${d.factorCode}] ${d.labelAr}` : d.labelAr,
          scorePercent: d.score || 75,
          levelLabel: d.stenScore ? `${d.levelAr} (Sten ${d.stenScore}/10)` : d.levelAr || 'متوازن',
          rawText: d.plainExplanationAr ? `${d.plainExplanationAr} — ${d.analysisAr}` : d.analysisAr || '',
          color: d.color || '#8b5cf6',
        })),
        sections: [
          ...(snap.userStrengthsAr?.length
            ? [
                {
                  title: 'نقاط القوة المرصودة في هذا الاختبار',
                  content: 'السمات البارزة وفق إجاباتك:',
                  items: snap.userStrengthsAr,
                },
              ]
            : []),
        ],
        careersOrRecommendations: snap.userAspirationsAr || rec.keyInsights || [],
      });
      return;
    }

    if (rec.testType === 'intelligence' && snap) {
      exportPsychometricReportAsPDF({
        reportTitle: rec.testTitleAr,
        subTitle: 'Standardized Intelligence & Cognitive Battery Report',
        scientificBasis: snap.scientificBasisAr || 'مختبر القياس العقلي والمعرفي المعتمد',
        userName,
        completedAt: new Date(rec.createdAt).toLocaleDateString('ar-JO'),
        overallScoreLabel: 'الدرجة المعيارية والترتيب المئيني',
        overallScoreValue: rec.scoreOrArchetype,
        cognitiveFingerprintTitle: snap.cognitiveFingerprintTitle || rec.testTitleAr,
        executiveSummary: snap.executiveSummary || snap.cognitiveFingerprintSummary || rec.testCategoryAr,
        metrics: (snap.allScores || snap.subScales || []).map((s: any) => ({
          label: s.titleAr || s.labelAr || 'بعد معرفي',
          scorePercent: s.percentage || s.score || rec.percentage,
          levelLabel: s.levelLabel || 'متميز',
          rawText: s.descriptionAr || s.analysisAr || '',
          color: s.color || '#3b82f6',
        })),
        sections: [
          {
            title: 'أبرز المؤشرات المعرفية المرصودة',
            content: 'خلاصة الأداء العقلي والمعرفي في هذا الاختبار:',
            items: rec.keyInsights || [],
          },
        ],
        careersOrRecommendations: snap.topStrengths?.[0]?.careersAr || rec.keyInsights || [],
      });
      return;
    }

    // Fallback for partner_compatibility or general record
    exportPsychometricReportAsPDF({
      reportTitle: rec.testTitleAr,
      subTitle: rec.testCategoryAr,
      scientificBasis: 'منظومة التوافق السيكومتري والاجتماعي المعتمدة',
      userName,
      completedAt: new Date(rec.createdAt).toLocaleDateString('ar-JO'),
      overallScoreLabel: 'نسبة التوافق الكلية',
      overallScoreValue: `${rec.percentage}% (${rec.scoreOrArchetype})`,
      cognitiveFingerprintTitle: rec.scoreOrArchetype,
      executiveSummary:
        snap?.romanticAdvice ||
        snap?.detailedMatchReason ||
        `تقرير توافق محفوظ بتاريخ ${new Date(rec.createdAt).toLocaleDateString('ar-JO')}.`,
      metrics: [
        {
          label: 'التوافق الفكري والمعرفي',
          scorePercent: snap?.intellectualScore || rec.percentage,
          levelLabel: 'مرتفع',
          rawText: 'انسجام في الرؤى وطريقة اتخاذ القرارات المشتركة.',
          color: '#3b82f6',
        },
        {
          label: 'التوافق الاجتماعي والقيمي',
          scorePercent: snap?.sociologicalScore || rec.percentage,
          levelLabel: 'مرتفع',
          rawText: 'توافق في العادات والتقاليد والروابط الأسرية.',
          color: '#10b981',
        },
        {
          label: 'الذكاء العاطفي والاستقرار',
          scorePercent: snap?.emotionalScore || rec.percentage,
          levelLabel: 'مرتفع',
          rawText: 'قدرة على الاحتواء الوجداني وحل الخلافات بمودة.',
          color: '#f43f5e',
        },
        {
          label: 'انسجام نمط الحياة والأهداف',
          scorePercent: snap?.lifestyleScore || rec.percentage,
          levelLabel: 'مرتفع',
          rawText: 'تقارب في إدارة الحياة اليومية والتطلعات المستقبلية.',
          color: '#a855f7',
        },
      ],
      sections: [
        {
          title: 'أبرز السمات والمؤشرات المسجلة',
          content: snap?.partnerVibeQuote || 'مؤشرات التوافق:',
          items: rec.keyInsights || snap?.partnerTraits || [],
        },
      ],
    });
  };

  const handleDeleteHistoryItem = async (recordId: string) => {
    soundManager.playTap();
    setDeletingId(recordId);
    try {
      await deleteUnifiedTestRecord(user, recordId);
      setTestHistory((prev) => prev.filter((r) => r.id !== recordId));
    } catch (err) {
      console.warn('Failed to delete history record', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleTogglePublic = async (newVal: boolean) => {
    soundManager.playTap();
    setIsPublic(newVal);
    try {
      localStorage.setItem('is_user_public_profile', newVal ? 'true' : 'false');
    } catch {}

    await setPublicProfileStatus(user, newVal, {
      displayName: userName,
      userGender,
      userAge,
      country,
      city,
      archetype: cattellReport.isCompleted
        ? cattellReport.primaryArchetypeAr
        : report.primaryArchetypeAr,
      contactWhatsapp: whatsappContact,
      bio: questionnaire.personalBio,
      strengths: effectiveStrengths.slice(0, 6),
      interests: effectiveInterests.slice(0, 6),
      aspirations: effectiveAspirations.slice(0, 6),
      idealPartnerNeeds: questionnaire.partnerEmotionalNeedsFromThem,
      communicationStyle: questionnaire.partnerCommunicationPreference,
      dimensionScores: getCore5Dimensions(),
    });
  };

  const handleSaveWhatsapp = async () => {
    soundManager.playTap();
    try {
      localStorage.setItem('user_contact_whatsapp', whatsappContact);
    } catch {}
    if (isPublic) {
      await setPublicProfileStatus(user, true, {
        displayName: userName,
        userGender,
        userAge,
        country,
        city,
        archetype: cattellReport.isCompleted
          ? cattellReport.primaryArchetypeAr
          : report.primaryArchetypeAr,
        contactWhatsapp: whatsappContact,
        bio: questionnaire.personalBio,
        strengths: effectiveStrengths.slice(0, 6),
        interests: effectiveInterests.slice(0, 6),
        aspirations: effectiveAspirations.slice(0, 6),
        idealPartnerNeeds: questionnaire.partnerEmotionalNeedsFromThem,
        communicationStyle: questionnaire.partnerCommunicationPreference,
        dimensionScores: getCore5Dimensions(),
      });
    }
  };

  // Generate shareable public profile URL
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://miratalqulub.com';
  const publicProfileUrl = `${baseUrl}/?publicProfile=${encodeURIComponent(
    userName
  )}&country=${encodeURIComponent(country)}&archetype=${encodeURIComponent(
    cattellReport.isCompleted ? cattellReport.primaryArchetypeAr : report.primaryArchetypeAr
  )}`;

  const shareText = `🔮 تفضل بالاطلاع على ملفي السيكومتري المعتمد ومواصفات شريكي المناسب على منصة «مِرآة القلوب»:\n\n👤 الاسم: ${userName}\n👑 النمط النفسي: ${
    cattellReport.isCompleted ? cattellReport.primaryArchetypeAr : report.primaryArchetypeAr
  }\n🌍 البلد: ${country}\n\nتصفح ملفي واكتشف مدى توافقنا للتواصل:\n${publicProfileUrl}`;

  const handleCopyLink = () => {
    soundManager.playTap();
    navigator.clipboard.writeText(publicProfileUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // Recharts data for psychometric radar
  const activeRadarSource = cattellReport.isCompleted
    ? cattellReport.cattellGlobalFactors?.map((g) => ({
        subject: g.labelAr.split(':')[1]?.split('(')[0]?.trim() || g.labelAr,
        score: g.score,
        fullMark: 100,
      })) || []
    : report.dimensionScores.map((dim) => ({
        subject: dim.labelAr.split('(')[0].trim(),
        score: dim.score,
        fullMark: 100,
      }));

  // Scientifically compute real match scores for all community members against current user
  const activeMatchingReport = cattellReport.isCompleted ? cattellReport : report;
  const computedCommunityMembers = rawCommunityMembers
    .map((m) => calculateMemberPsychometricMatch(m, activeMatchingReport, questionnaire))
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);

  const filteredMembers = computedCommunityMembers.filter((m) => {
    if (matchFilter === 'complementary' && m.category !== 'complementary' && m.category !== 'both')
      return false;
    if (matchFilter === 'similar' && m.category !== 'similar' && m.category !== 'both')
      return false;
    if (genderFilter !== 'all' && m.userGender !== genderFilter) return false;
    if (matchSearchQuery.trim()) {
      const q = matchSearchQuery.trim().toLowerCase();
      const hay = `${m.displayName} ${m.country} ${m.city} ${m.archetype} ${m.interests.join(' ')} ${m.strengths.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  // Helper to toggle item in questionnaire array
  const toggleArrayItem = (list: string[], item: string): string[] => {
    if (list.includes(item)) {
      return list.filter((x) => x !== item);
    }
    return [...list, item];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="glass-panel w-full max-w-5xl rounded-3xl p-4 sm:p-6 border border-white/20 shadow-2xl relative my-auto text-right max-h-[94vh] flex flex-col overflow-hidden"
      >
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-rose-500 p-0.5 shadow-lg shadow-purple-500/25 flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#120d24] rounded-[14px] flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-extrabold text-base sm:text-xl text-white font-['Alexandria']">
                  لوحة الملف الشخصي السيكومتري (UserProfileDashboard)
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  مبني على إجاباتك الحقيقية + PDF مفعل 🔬
                </span>
              </div>
              <p className="text-xs text-gray-300">
                صفاتك السلوكية، اهتماماتك اليومية، تطلعات العش الزوجي، مقياس كاتل (16PF)، وشبكة المتوافقين للتواصل
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportFullDashboardPDF}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <FileDown className="w-4 h-4" />
              <span>تحميل الملف السيكومتري الشامل PDF 📄</span>
            </button>

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
        </div>

        {/* Navigation Tabs (7 Comprehensive Scientific Tabs) */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10 mb-4 shrink-0 overflow-x-auto text-xs font-bold scrollbar-none">
          <button
            onClick={() => {
              soundManager.playTab();
              setActiveTab('overview');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
              activeTab === 'overview'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>سماتي، اهتماماتي وتطلعاتي</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTab();
              setActiveTab('questionnaire');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
              activeTab === 'questionnaire'
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                : 'text-amber-300 hover:text-white bg-amber-500/10 border border-amber-500/30'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>استبيان بياناتي وتطلعاتي ✍️</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTab();
              setActiveTab('cattell_16pf');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
              activeTab === 'cattell_16pf'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-indigo-300 hover:text-white bg-indigo-500/10 border border-indigo-500/20'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>مقياس كاتل لـ 16 سمة (16PF) 📊</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTab();
              setActiveTab('partner');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
              activeTab === 'partner'
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>شريك حياتي المناسب 💖</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTab();
              setActiveTab('matches');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
              activeTab === 'matches'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>اكتشف من يشبهك أو يتوافق معك للتواصل 🤝</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTab();
              setActiveTab('history');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>سجل وتطور اختباراتي 📈</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTab();
              setActiveTab('share');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
              activeTab === 'share'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>نشر صفحتي 🌐</span>
          </button>
        </div>

        {/* ================= TAB 1: USER OVERVIEW & PSYCHOMETRICS ================= */}
        {activeTab === 'overview' && (
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
            {/* Prompt Banner if User Has Not Filled Personal Questionnaire Yet */}
            {!questionnaire.isCompleted && (
              <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="space-y-1 text-right">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-amber-300">
                    <ClipboardCheck className="w-4 h-4 shrink-0" />
                    <span>تحري الدقة العلمية في بياناتك الشخصية والزوجية</span>
                  </div>
                  <p className="text-xs text-gray-200 leading-relaxed">
                    لضمان أن تعبر خانات (صفاتي ونقاط قوتي السلوكية، اهتماماتي وشغفي اليومي، تطلعاتي المستقبلية للعش الزوجي، ومواصفات شريك الحياة) عن إجاباتك الحقيقية بدقة 100%، قم بتعبئة أسئلة الاستبيان الشخصي المخصص وإجراء مقياس كاتل (16PF).
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      setActiveTab('questionnaire');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition cursor-pointer shadow-md whitespace-nowrap"
                  >
                    تعبئة أسئلة ملفي الشخصي الآن ✍️
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      setActiveTab('cattell_16pf');
                    }}
                    className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition cursor-pointer whitespace-nowrap"
                  >
                    مقياس كاتل 16PF 📊
                  </button>
                </div>
              </div>
            )}

            {/* Identity Card */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-rose-500/15 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1.5 text-center sm:text-right">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <h3 className="font-black text-lg sm:text-xl text-white font-['Alexandria']">
                    {userName} ({userAge} عاماً)
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-gray-200 border border-white/15">
                    {country} {questionnaire.city ? `• ${questionnaire.city}` : ''}
                  </span>
                  {questionnaire.educationAndCareer && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/30">
                      {questionnaire.educationAndCareer}
                    </span>
                  )}
                </div>

                <p className="text-sm font-bold text-rose-300">
                  {cattellReport.isCompleted
                    ? cattellReport.primaryArchetypeAr
                    : report.primaryArchetypeAr}
                </p>

                {questionnaire.personalBio ? (
                  <p className="text-xs text-white/90 max-w-2xl leading-relaxed bg-black/30 p-2.5 rounded-xl border border-white/10">
                    «{questionnaire.personalBio}»
                  </p>
                ) : (
                  <p className="text-xs text-gray-300 max-w-xl">
                    {cattellReport.isCompleted
                      ? cattellReport.validityMessageAr
                      : report.validityMessageAr}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    soundManager.playTap();
                    setActiveTab('questionnaire');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>تعديل إجاباتي الشخصية</span>
                </button>

                {onOpenPsychologyTests && (
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      onOpenPsychologyTests();
                    }}
                    className="px-3.5 py-2 rounded-xl bg-purple-500/25 hover:bg-purple-500/35 border border-purple-400/40 text-purple-200 text-xs font-bold transition cursor-pointer shadow-sm"
                  >
                    إجراء مقياس نفسي معتمد 🔬
                  </button>
                )}
              </div>
            </div>

            {/* Strengths, Interests, and Aspirations Grid (Strictly User-Driven + Empirically Verified) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {/* Box 1: صفاتي ونقاط قوتي السلوكية */}
              <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/30 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>صفاتي ونقاط قوتي السلوكية:</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('questionnaire')}
                      className="text-[10px] text-emerald-300 hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" /> تحديد/تعديل
                    </button>
                  </div>

                  {effectiveStrengths.length === 0 ? (
                    <div className="p-3 rounded-xl bg-black/30 border border-white/10 text-xs text-gray-400 space-y-2">
                      <p>لم تقم بتحديد صفاتك ونقاط قوتك السلوكية بعد.</p>
                      <button
                        type="button"
                        onClick={() => setActiveTab('questionnaire')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[11px] cursor-pointer"
                      >
                        + أجب عن أسئلة صفاتي السلوكية الآن
                      </button>
                    </div>
                  ) : (
                    <ul className="space-y-1.5 text-xs text-gray-200 leading-relaxed">
                      {effectiveStrengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 mt-0.5 font-bold">✓</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Quick Add Custom Strength inline */}
                <div className="pt-2 border-t border-white/10 flex items-center gap-1.5">
                  <input
                    type="text"
                    value={customStrengthInput}
                    onChange={(e) => setCustomStrengthInput(e.target.value)}
                    placeholder="أضف صفة أو نقطة قوة تميزك..."
                    className="flex-1 bg-black/40 border border-white/15 rounded-xl px-2.5 py-1.5 text-[11px] text-white outline-none focus:border-emerald-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!customStrengthInput.trim()) return;
                      soundManager.playTap();
                      const updated: UserPersonalQuestionnaireData = {
                        ...questionnaire,
                        isCompleted: true,
                        customStrengths: [
                          ...questionnaire.customStrengths,
                          customStrengthInput.trim(),
                        ],
                      };
                      setQuestionnaire(updated);
                      saveUserPersonalQuestionnaire(updated);
                      setCustomStrengthInput('');
                    }}
                    className="p-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                    title="إضافة فورية"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Box 2: اهتماماتي وشغفي اليومي */}
              <div className="p-4 rounded-2xl bg-white/5 border border-sky-500/30 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
                      <Compass className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>اهتماماتي وشغفي اليومي:</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('questionnaire')}
                      className="text-[10px] text-sky-300 hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" /> تحديد/تعديل
                    </button>
                  </div>

                  {effectiveInterests.length === 0 ? (
                    <div className="p-3 rounded-xl bg-black/30 border border-white/10 text-xs text-gray-400 space-y-2">
                      <p>لم تقم بتحديد اهتماماتك وشغفك اليومي بعد.</p>
                      <button
                        type="button"
                        onClick={() => setActiveTab('questionnaire')}
                        className="px-3 py-1.5 rounded-lg bg-sky-600 text-white font-bold text-[11px] cursor-pointer"
                      >
                        + اختر اهتماماتك وشغفك اليومي الآن
                      </button>
                    </div>
                  ) : (
                    <ul className="space-y-1.5 text-xs text-gray-200 leading-relaxed">
                      {effectiveInterests.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-sky-400 mt-0.5 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Quick Add Custom Interest inline */}
                <div className="pt-2 border-t border-white/10 flex items-center gap-1.5">
                  <input
                    type="text"
                    value={customInterestInput}
                    onChange={(e) => setCustomInterestInput(e.target.value)}
                    placeholder="أضف هواية أو شغفاً يومياً..."
                    className="flex-1 bg-black/40 border border-white/15 rounded-xl px-2.5 py-1.5 text-[11px] text-white outline-none focus:border-sky-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!customInterestInput.trim()) return;
                      soundManager.playTap();
                      const updated: UserPersonalQuestionnaireData = {
                        ...questionnaire,
                        isCompleted: true,
                        customInterests: [
                          ...questionnaire.customInterests,
                          customInterestInput.trim(),
                        ],
                      };
                      setQuestionnaire(updated);
                      saveUserPersonalQuestionnaire(updated);
                      setCustomInterestInput('');
                    }}
                    className="p-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white cursor-pointer"
                    title="إضافة فورية"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Box 3: تطلعاتي المستقبلية للعش الزوجي */}
              <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/30 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                      <Target className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>تطلعاتي المستقبلية للعش الزوجي:</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('questionnaire')}
                      className="text-[10px] text-amber-300 hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      <Edit3 className="w-3 h-3" /> تحديد/تعديل
                    </button>
                  </div>

                  {effectiveAspirations.length === 0 ? (
                    <div className="p-3 rounded-xl bg-black/30 border border-white/10 text-xs text-gray-400 space-y-2">
                      <p>لم تقم بتحديد تطلعاتك المستقبلية للعش الزوجي بعد.</p>
                      <button
                        type="button"
                        onClick={() => setActiveTab('questionnaire')}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px] cursor-pointer"
                      >
                        + حدد رؤيتك للعش الزوجي الآن
                      </button>
                    </div>
                  ) : (
                    <ul className="space-y-1.5 text-xs text-gray-200 leading-relaxed">
                      {effectiveAspirations.map((asp, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-400 mt-0.5 font-bold">★</span>
                          <span>{asp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Quick Add Custom Marital Aspiration inline */}
                <div className="pt-2 border-t border-white/10 flex items-center gap-1.5">
                  <input
                    type="text"
                    value={customAspirationInput}
                    onChange={(e) => setCustomAspirationInput(e.target.value)}
                    placeholder="أضف تطلعاً أو شرطاً للعش الزوجي..."
                    className="flex-1 bg-black/40 border border-white/15 rounded-xl px-2.5 py-1.5 text-[11px] text-white outline-none focus:border-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!customAspirationInput.trim()) return;
                      soundManager.playTap();
                      const updated: UserPersonalQuestionnaireData = {
                        ...questionnaire,
                        isCompleted: true,
                        customMaritalAspirations: [
                          ...questionnaire.customMaritalAspirations,
                          customAspirationInput.trim(),
                        ],
                      };
                      setQuestionnaire(updated);
                      saveUserPersonalQuestionnaire(updated);
                      setCustomAspirationInput('');
                    }}
                    className="p-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer"
                    title="إضافة فورية"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Radar Chart + Trait Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Radar Chart */}
              <div className="p-4 rounded-3xl bg-black/25 border border-white/10 flex flex-col items-center justify-between">
                <div className="w-full flex items-center justify-between mb-1">
                  <h4 className="font-bold text-xs text-gray-300 flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-purple-400" />
                    <span>المخطط الراداري للسمات السيكومترية المقاسة:</span>
                  </h4>
                  <span className="text-[10px] font-mono text-purple-300">
                    {cattellReport.isCompleted ? 'مقياس كاتل 16PF ✓' : report.testTitleAr}
                  </span>
                </div>

                <div className="w-full h-64 my-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={activeRadarSource} outerRadius="72%">
                      <PolarGrid stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#e2e8f0', fontSize: 10, fontWeight: 700 }}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        stroke="rgba(255,255,255,0.2)"
                        tick={{ fill: '#94a3b8', fontSize: 8 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#120d24',
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '12px',
                          color: '#fff',
                          textAlign: 'right',
                        }}
                      />
                      <Radar
                        name="مستوى السمة"
                        dataKey="score"
                        stroke="#a855f7"
                        strokeWidth={2.5}
                        fill="#c084fc"
                        fillOpacity={0.45}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Traits Progress Bars */}
              <div className="p-4 rounded-3xl bg-black/25 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-gray-300 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-rose-400" />
                    <span>الأبعاد النفسية والاجتماعية المقاسة:</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setActiveTab('cattell_16pf')}
                    className="text-[11px] text-purple-300 hover:text-white font-bold cursor-pointer"
                  >
                    عرض تقرير كاتل 16PF الكامل ←
                  </button>
                </div>

                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
                  {(cattellReport.isCompleted ? cattellReport : report).dimensionScores.map(
                    (dim) => (
                      <div key={dim.key} className="space-y-1 p-2 rounded-xl bg-white/5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-gray-200">{dim.labelAr}</span>
                          <div className="flex items-center gap-1.5 font-mono">
                            {dim.stenScore && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-amber-300">
                                Sten {dim.stenScore}/10
                              </span>
                            )}
                            <span className="font-bold text-purple-300">{dim.score}%</span>
                          </div>
                        </div>
                        <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${dim.score}%`,
                              backgroundColor: dim.color || '#a855f7',
                            }}
                          />
                        </div>
                        {dim.plainExplanationAr && (
                          <p className="text-[11px] text-emerald-300 font-medium">
                            ✨ {dim.plainExplanationAr}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PERSONAL, BEHAVIORAL & MARITAL QUESTIONNAIRE ================= */}
        {activeTab === 'questionnaire' && (
          <div className="flex-1 overflow-y-auto pr-1 space-y-5 custom-scrollbar">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-500/15 to-rose-500/15 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-amber-400" />
                  <span>
                    استبيان بناء وتحديث الملف الشخصي والسيكومتري الدقيق (مبني على إجاباتك الحقيقية)
                  </span>
                </h3>
                <p className="text-xs text-gray-200 mt-1">
                  أجب عن الأسئلة التالية وحدد اختياراتك بدقة؛ ليتم تعبئة كافة خانات ملفك الشخصي، تطلعات العش الزوجي، ومواصفات شريك الحياة وحساب نسب التوافق مع الأعضاء بناءً على ما تقوله أنت فعلياً.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveQuestionnaire}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition cursor-pointer shadow-lg shrink-0"
              >
                حفظ واعتماد بياناتي وإجاباتي ✓
              </button>
            </div>

            {questionnaireSavedToast && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  تم حفظ جميع إجاباتك وتحديث خانات ملفك الشخصي ومواصفات شريك الحياة وحسابات التوافق بنجاح!
                </span>
              </div>
            )}

            {/* Section 1: Basic Personal Information */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <h4 className="font-bold text-xs sm:text-sm text-purple-300 border-b border-white/10 pb-2">
                أولاً: البيانات الشخصية والتعريفية الدقيقة
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block text-gray-300 mb-1 font-bold">الاسم أو اللقب:</label>
                  <input
                    type="text"
                    value={questionnaire.fullName}
                    onChange={(e) =>
                      setQuestionnaire({ ...questionnaire, fullName: e.target.value })
                    }
                    placeholder="اكتب اسمك أو لقبك..."
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 font-bold">العمر (بالسنوات):</label>
                  <input
                    type="number"
                    min={18}
                    max={80}
                    value={questionnaire.userAge}
                    onChange={(e) =>
                      setQuestionnaire({
                        ...questionnaire,
                        userAge: Number(e.target.value) || 26,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white font-mono outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 font-bold">الجنس:</label>
                  <select
                    value={questionnaire.userGender}
                    onChange={(e) =>
                      setQuestionnaire({
                        ...questionnaire,
                        userGender: e.target.value as 'male' | 'female',
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white outline-none focus:border-purple-400"
                  >
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 font-bold">البلد:</label>
                  <input
                    type="text"
                    value={questionnaire.country}
                    onChange={(e) =>
                      setQuestionnaire({ ...questionnaire, country: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 font-bold">المدينة:</label>
                  <input
                    type="text"
                    value={questionnaire.city}
                    onChange={(e) => setQuestionnaire({ ...questionnaire, city: e.target.value })}
                    placeholder="مثال: عمّان، الرياض، جدة..."
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 font-bold">
                    المؤهل العلمي ومجال العمل:
                  </label>
                  <input
                    type="text"
                    value={questionnaire.educationAndCareer}
                    onChange={(e) =>
                      setQuestionnaire({
                        ...questionnaire,
                        educationAndCareer: e.target.value,
                      })
                    }
                    placeholder="مثال: بكالوريوس هندسة / ماجستير إدارة..."
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-purple-400"
                  />
                </div>
              </div>
              <div className="text-xs">
                <label className="block text-gray-300 mb-1 font-bold">
                  نبذة شخصية صادقة تعبر عنك (تظهر في ملفك):
                </label>
                <textarea
                  rows={2}
                  value={questionnaire.personalBio}
                  onChange={(e) =>
                    setQuestionnaire({ ...questionnaire, personalBio: e.target.value })
                  }
                  placeholder="اكتب بضعة أسطر تصف شخصيتك، قيمك في الحياة، وما تبحث عنه بصدق..."
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white outline-none focus:border-purple-400"
                />
              </div>
            </div>

            {/* Section 2: Behavioral Traits & Strengths Questions */}
            <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/30 space-y-3">
              <h4 className="font-bold text-xs sm:text-sm text-emerald-300 border-b border-white/10 pb-2">
                ثانياً: أسئلة «صفاتي ونقاط قوتي السلوكية» (وفق مقياس VIA وBig Five)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-200 mb-1 font-bold">
                    1. كيف تتعامل سلوكياً عند مواجهة ضغوط أو أزمات مفاجئة؟
                  </label>
                  <select
                    value={questionnaire.stressResponseStyle}
                    onChange={(e) =>
                      setQuestionnaire({ ...questionnaire, stressResponseStyle: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white outline-none"
                  >
                    {QUESTIONNAIRE_OPTIONS.stressResponseOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-200 mb-1 font-bold">
                    2. ما هو أسلوبك المفضل في اتخاذ القرارات المهمة؟
                  </label>
                  <select
                    value={questionnaire.decisionMakingStyle}
                    onChange={(e) =>
                      setQuestionnaire({ ...questionnaire, decisionMakingStyle: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white outline-none"
                  >
                    {QUESTIONNAIRE_OPTIONS.decisionMakingOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-xs space-y-2">
                <label className="block text-gray-200 font-bold">
                  3. اختر الصفات ونقاط القوة السلوكية التي تنطبق عليك فعلياً (يمكنك اختيار أكثر من صفة):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {QUESTIONNAIRE_OPTIONS.strengthsCatalog.map((str) => {
                    const checked = questionnaire.selectedStrengths.includes(str);
                    return (
                      <button
                        key={str}
                        type="button"
                        onClick={() =>
                          setQuestionnaire({
                            ...questionnaire,
                            selectedStrengths: toggleArrayItem(
                              questionnaire.selectedStrengths,
                              str
                            ),
                          })
                        }
                        className={`p-2.5 rounded-xl border text-right text-xs transition flex items-center justify-between cursor-pointer ${
                          checked
                            ? 'bg-emerald-600/30 border-emerald-400 text-white font-bold'
                            : 'bg-black/30 border-white/10 text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        <span>{str}</span>
                        {checked && <Check className="w-4 h-4 text-emerald-400 shrink-0 mr-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 3: Daily Interests & Passions Questions */}
            <div className="p-4 rounded-2xl bg-white/5 border border-sky-500/30 space-y-3">
              <h4 className="font-bold text-xs sm:text-sm text-sky-300 border-b border-white/10 pb-2">
                ثالثاً: أسئلة «اهتماماتي وشغفي اليومي» (وفق نموذج هولاند RIASEC وأسلوب الحياة)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-200 mb-1 font-bold">
                    1. ما هي المجالات الفكرية أو المعرفية التي تثير شغفك في النقاش؟
                  </label>
                  <input
                    type="text"
                    value={questionnaire.intellectualPassion}
                    onChange={(e) =>
                      setQuestionnaire({ ...questionnaire, intellectualPassion: e.target.value })
                    }
                    placeholder="مثال: علم النفس، الأدب، التقنية، ريادة الأعمال، التاريخ..."
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-200 mb-1 font-bold">
                    2. كيف تفضل قضاء وقت فراغك وعطلة نهاية الأسبوع؟
                  </label>
                  <input
                    type="text"
                    value={questionnaire.weekendRoutinePreference}
                    onChange={(e) =>
                      setQuestionnaire({
                        ...questionnaire,
                        weekendRoutinePreference: e.target.value,
                      })
                    }
                    placeholder="مثال: جلسة هادئة في البيت، السفر والطبيعة، زيارة العائلة..."
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white outline-none"
                  />
                </div>
              </div>

              <div className="text-xs space-y-2">
                <label className="block text-gray-200 font-bold">
                  3. حدد اهتماماتك وهواياتك اليومية المفضلة:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {QUESTIONNAIRE_OPTIONS.interestsCatalog.map((interest) => {
                    const checked = questionnaire.selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() =>
                          setQuestionnaire({
                            ...questionnaire,
                            selectedInterests: toggleArrayItem(
                              questionnaire.selectedInterests,
                              interest
                            ),
                          })
                        }
                        className={`p-2.5 rounded-xl border text-right text-xs transition flex items-center justify-between cursor-pointer ${
                          checked
                            ? 'bg-sky-600/30 border-sky-400 text-white font-bold'
                            : 'bg-black/30 border-white/10 text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        <span>{interest}</span>
                        {checked && <Check className="w-4 h-4 text-sky-400 shrink-0 mr-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 4: Future Marital Nest Aspirations Questions */}
            <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/30 space-y-3">
              <h4 className="font-bold text-xs sm:text-sm text-amber-300 border-b border-white/10 pb-2">
                رابعاً: أسئلة «تطلعاتي المستقبلية للعش الزوجي» (وفق نظرية البيت الزوجي المتين لجون غوتمان)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-200 mb-1 font-bold">
                    1. ما هي الأجواء العامة التي تتطلع لبنائها في بيتك الزوجي؟
                  </label>
                  <select
                    value={questionnaire.maritalHomeAtmosphere}
                    onChange={(e) =>
                      setQuestionnaire({
                        ...questionnaire,
                        maritalHomeAtmosphere: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white outline-none"
                  >
                    {QUESTIONNAIRE_OPTIONS.maritalHomeAtmosphereOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-200 mb-1 font-bold">
                    2. ما هي رؤيتك للإدارة المالية والميزانية في الأسرة؟
                  </label>
                  <select
                    value={questionnaire.financialManagementVision}
                    onChange={(e) =>
                      setQuestionnaire({
                        ...questionnaire,
                        financialManagementVision: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white outline-none"
                  >
                    {QUESTIONNAIRE_OPTIONS.financialVisionOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-200 mb-1 font-bold">
                    3. ما هو بروتوكول حل الخلافات الزوجية الذي ترتاح له؟
                  </label>
                  <select
                    value={questionnaire.conflictResolutionProtocol}
                    onChange={(e) =>
                      setQuestionnaire({
                        ...questionnaire,
                        conflictResolutionProtocol: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white outline-none"
                  >
                    {QUESTIONNAIRE_OPTIONS.conflictProtocolOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-200 mb-1 font-bold">
                    4. ما هي لغة الحب والتقدير الأساسية التي تسعد قلبك؟
                  </label>
                  <select
                    value={questionnaire.primaryLoveLanguage}
                    onChange={(e) =>
                      setQuestionnaire({
                        ...questionnaire,
                        primaryLoveLanguage: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white outline-none"
                  >
                    {QUESTIONNAIRE_OPTIONS.loveLanguagesOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-xs space-y-2">
                <label className="block text-gray-200 font-bold">
                  5. اختر التطلعات والأولويات التي تود تحقيقها في عشك الزوجي:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {QUESTIONNAIRE_OPTIONS.maritalAspirationsCatalog.map((asp) => {
                    const checked = questionnaire.selectedMaritalAspirations.includes(asp);
                    return (
                      <button
                        key={asp}
                        type="button"
                        onClick={() =>
                          setQuestionnaire({
                            ...questionnaire,
                            selectedMaritalAspirations: toggleArrayItem(
                              questionnaire.selectedMaritalAspirations,
                              asp
                            ),
                          })
                        }
                        className={`p-2.5 rounded-xl border text-right text-xs transition flex items-center justify-between cursor-pointer ${
                          checked
                            ? 'bg-amber-500/30 border-amber-400 text-white font-bold'
                            : 'bg-black/30 border-white/10 text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        <span>{asp}</span>
                        {checked && <Check className="w-4 h-4 text-amber-400 shrink-0 mr-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 5: Ideal Life Partner Specifications Questions */}
            <div className="p-4 rounded-2xl bg-white/5 border border-rose-500/30 space-y-3">
              <h4 className="font-bold text-xs sm:text-sm text-rose-300 border-b border-white/10 pb-2">
                خامساً: أسئلة «مواصفات شريك الحياة المناسب» (وفق اختيارك والتكامل السيكومتري)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-gray-200 mb-1 font-bold">
                    1. ما هي الشخصية الأساسية التي تتمناها في شريك حياتك؟
                  </label>
                  <input
                    type="text"
                    value={questionnaire.partnerCorePersonalityType}
                    onChange={(e) =>
                      setQuestionnaire({
                        ...questionnaire,
                        partnerCorePersonalityType: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-200 mb-1 font-bold">
                    2. الفئة العمرية المفضلة لشريك الحياة:
                  </label>
                  <input
                    type="text"
                    value={questionnaire.preferredPartnerAgeRange}
                    onChange={(e) =>
                      setQuestionnaire({
                        ...questionnaire,
                        preferredPartnerAgeRange: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-200 mb-1 font-bold">
                    3. أهم احتياجاتك العاطفية التي تنتظرها من شريك حياتك:
                  </label>
                  <input
                    type="text"
                    value={questionnaire.partnerEmotionalNeedsFromThem}
                    onChange={(e) =>
                      setQuestionnaire({
                        ...questionnaire,
                        partnerEmotionalNeedsFromThem: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-200 mb-1 font-bold">
                    4. أسلوب التواصل والحوار المفضل مع الشريك:
                  </label>
                  <input
                    type="text"
                    value={questionnaire.partnerCommunicationPreference}
                    onChange={(e) =>
                      setQuestionnaire({
                        ...questionnaire,
                        partnerCommunicationPreference: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-white outline-none"
                  />
                </div>
              </div>

              <div className="text-xs space-y-2">
                <label className="block text-emerald-300 font-bold">
                  5. الصفات الأساسية والمؤشرات الإيجابية المطلوبة في الشريك (Green Flags):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {QUESTIONNAIRE_OPTIONS.partnerEssentialTraitsCatalog.map((tr) => {
                    const checked = questionnaire.partnerEssentialTraits.includes(tr);
                    return (
                      <button
                        key={tr}
                        type="button"
                        onClick={() =>
                          setQuestionnaire({
                            ...questionnaire,
                            partnerEssentialTraits: toggleArrayItem(
                              questionnaire.partnerEssentialTraits,
                              tr
                            ),
                          })
                        }
                        className={`p-2.5 rounded-xl border text-right text-xs transition flex items-center justify-between cursor-pointer ${
                          checked
                            ? 'bg-emerald-600/30 border-emerald-400 text-white font-bold'
                            : 'bg-black/30 border-white/10 text-gray-300'
                        }`}
                      >
                        <span>{tr}</span>
                        {checked && <Check className="w-4 h-4 text-emerald-400 shrink-0 mr-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="text-xs space-y-2">
                <label className="block text-rose-300 font-bold">
                  6. المؤشرات السلبية المرفوضة تماماً في الشريك (Red Flags):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {QUESTIONNAIRE_OPTIONS.partnerRedFlagsCatalog.map((rf) => {
                    const checked = questionnaire.partnerRedFlags.includes(rf);
                    return (
                      <button
                        key={rf}
                        type="button"
                        onClick={() =>
                          setQuestionnaire({
                            ...questionnaire,
                            partnerRedFlags: toggleArrayItem(questionnaire.partnerRedFlags, rf),
                          })
                        }
                        className={`p-2.5 rounded-xl border text-right text-xs transition flex items-center justify-between cursor-pointer ${
                          checked
                            ? 'bg-rose-600/30 border-rose-400 text-white font-bold'
                            : 'bg-black/30 border-white/10 text-gray-300'
                        }`}
                      >
                        <span>{rf}</span>
                        {checked && <Check className="w-4 h-4 text-rose-400 shrink-0 mr-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    handleSaveQuestionnaire();
                    setActiveTab('overview');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs cursor-pointer shadow-lg"
                >
                  حفظ جميع إجاباتي وعرض ملفي الشخصي المحدث ✓
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: CATTELL 16PF SIMPLIFIED REPORT & INLINE RUNNER ================= */}
        {activeTab === 'cattell_16pf' && (
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
            {/* Top Banner for Cattell 16PF */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-slate-900 border border-indigo-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-black text-base sm:text-lg text-white font-['Alexandria']">
                    مقياس كاتل لـ 16 سمة (16PF) - تقرير مبسط لغير المختصين
                  </h3>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/25 text-indigo-200 border border-indigo-400/40">
                    Raymond B. Cattell 16PF (Sten 1-10)
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
                  يقيس هذا الاختبار العالمي 16 سمة أولية للشخصية (العوامل A إلى Q4) بالإضافة إلى العوامل العالمية الخمسة الكبرى، ويترجم كل درجة معيارية (Sten 1-10) إلى لغة يومية مبسطة توضح سلوكك في الحياة والزواج.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setIsTaking16PFInline((prev) => !prev);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>
                    {isTaking16PFInline
                      ? 'العودة لعرض التقرير'
                      : cattellReport.isCompleted
                      ? 'إعادة / تعديل إجابات مقياس 16PF'
                      : 'ابدأ الإجابة على أسئلة 16PF الآن (32 سؤالاً)'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    exportPsychometricReportAsPDF({
                      reportTitle: 'تقرير مقياس كاتل للعوامل الـ 16 للشخصية (Cattell 16PF)',
                      subTitle: '16PF Fifth Edition — Simplified Non-Specialist Report',
                      scientificBasis:
                        'Raymond B. Cattell (1949/1993) — 16 Primary Factors + 5 Global Second-Order Factors (Sten 1-10)',
                      userName,
                      completedAt: cattellReport.completionDate,
                      overallScoreLabel: 'متوسط الاتزان العاملي والمئين المعياري',
                      overallScoreValue: `${cattellReport.totalScore}% (المئين ${cattellReport.overallPercentile}%)`,
                      cognitiveFingerprintTitle: cattellReport.primaryArchetypeAr,
                      executiveSummary: `${cattellReport.summaryAr} — ${cattellReport.validityMessageAr}`,
                      metrics: cattellReport.dimensionScores.map((d) => ({
                        label: d.factorCode ? `[${d.factorCode}] ${d.labelAr}` : d.labelAr,
                        scorePercent: d.score,
                        levelLabel: `${d.levelAr} (Sten ${d.stenScore || 6}/10)`,
                        rawText: `${d.plainExplanationAr || ''} — ${d.analysisAr}`,
                        color: d.color || '#8b5cf6',
                      })),
                      sections: cattellReport.cattellGlobalFactors
                        ? [
                            {
                              title: 'العوامل العالمية الخمسة الكبرى (5 Global Factors)',
                              badge: 'تحليل الدرجة الثانية',
                              content: 'الأبعاد الكبرى المستخلصة من تفاعل السمات الـ 16:',
                              items: cattellReport.cattellGlobalFactors.map(
                                (g) => `${g.labelAr} (${g.score}% • Sten ${g.sten}/10): ${g.plainExplanationAr}`
                              ),
                            },
                          ]
                        : [],
                      careersOrRecommendations: cattellReport.userAspirationsAr,
                    });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>تحميل تقرير 16PF PDF 📄</span>
                </button>
              </div>
            </div>

            {/* Inline 32-Question 16PF Runner */}
            {isTaking16PFInline ? (
              <div className="p-4 rounded-3xl bg-black/40 border border-indigo-500/40 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h4 className="font-bold text-sm text-white">
                      أسئلة مقياس كاتل للعوامل الـ 16 للشخصية (32 موقفاً سلوكياً واقعياً)
                    </h4>
                    <p className="text-xs text-indigo-200">
                      أجب عن جميع الأسئلة الـ 32 بصدق لتظهر درجاتك الحقيقية في السمات الـ 16 بالدرجة المعيارية Sten (1-10)
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    تمت الإجابة على {Object.keys(inline16PFAnswers).length} / {sixteenPFQuestions.length}
                  </span>
                </div>

                {inline16PFMissing.length > 0 && (
                  <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-xs text-rose-200 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>
                      يُرجى الإجابة على جميع الأسئلة الـ 32 لضمان دقة التقرير (تبقى{' '}
                      {inline16PFMissing.length} سؤالاً، أولها سؤال #{inline16PFMissing[0] + 1}).
                    </span>
                  </div>
                )}

                <div className="space-y-3 max-h-[52vh] overflow-y-auto pr-1 custom-scrollbar">
                  {sixteenPFQuestions.map((q, idx) => {
                    const isMiss = inline16PFMissing.includes(idx);
                    return (
                      <div
                        key={q.id}
                        className={`p-3.5 rounded-2xl border ${
                          isMiss
                            ? 'bg-rose-950/30 border-rose-500/60'
                            : 'bg-white/5 border-white/10'
                        } space-y-2`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-indigo-300 font-mono">
                            سؤال #{idx + 1}
                          </span>
                          {inline16PFAnswers[q.id] && (
                            <span className="text-[11px] text-emerald-400 font-bold">
                              ✓ تمت الإجابة
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-white">{q.promptAr}</p>
                        {q.subPromptAr && (
                          <p className="text-[11px] text-indigo-200/80">💡 {q.subPromptAr}</p>
                        )}
                        <div className="grid grid-cols-1 gap-1.5 pt-1">
                          {q.options.map((opt) => {
                            const sel = inline16PFAnswers[q.id] === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => {
                                  soundManager.playTap();
                                  setInline16PFAnswers((prev) => ({ ...prev, [q.id]: opt.id }));
                                }}
                                className={`p-2.5 rounded-xl border text-right text-xs transition flex items-center justify-between cursor-pointer ${
                                  sel
                                    ? 'bg-indigo-600/40 border-indigo-400 text-white font-bold'
                                    : 'bg-black/30 border-white/10 text-gray-300 hover:bg-white/10'
                                }`}
                              >
                                <span>{opt.textAr}</span>
                                <span className="text-[10px] font-mono text-indigo-300 mr-2 shrink-0">
                                  [{opt.traitLabel}]
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={handleCompleteInline16PF}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs cursor-pointer shadow-lg"
                  >
                    حساب وإصدار تقرير كاتل 16PF الدقيق الآن ✓
                  </button>
                </div>
              </div>
            ) : (
              /* Cattell 16PF Simplified Non-Specialist Report Display */
              <div className="space-y-4">
                {!cattellReport.isCompleted && (
                  <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-between gap-3 text-xs text-amber-200">
                    <span>
                      ⚠️ ملاحظة: لم تقم بإجراء اختبار كاتل (16PF) بعد — الدرجات المعروضة أدناه تمثل خط المنتصف المحايد (50% / Sten 5). اضغط على «ابدأ الإجابة على أسئلة 16PF الآن» أعلاه لحساب سماتك الـ 16 الحقيقية بدقة.
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsTaking16PFInline(true)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold shrink-0 cursor-pointer"
                    >
                      ابدأ الاختبار الآن
                    </button>
                  </div>
                )}

                {/* View Mode Switcher for 16PF */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-gray-300">
                    اختر طريقة عرض التقرير المبسط لغير المختصين:
                  </span>
                  <div className="flex items-center p-1 rounded-xl bg-black/50 border border-white/10 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setCattellViewMode('all16')}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        cattellViewMode === 'all16'
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      السمات الـ 16 الكاملة (A - Q4) 📊
                    </button>
                    <button
                      type="button"
                      onClick={() => setCattellViewMode('global5')}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        cattellViewMode === 'global5'
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      العوامل العالمية الـ 5 الكبرى 🌍
                    </button>
                    <button
                      type="button"
                      onClick={() => setCattellViewMode('clusters')}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        cattellViewMode === 'clusters'
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      المجموعات الـ 4 المبسطة 🧩
                    </button>
                  </div>
                </div>

                {/* All 16 Factors Detailed Non-Specialist Cards */}
                {cattellViewMode === 'all16' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cattellReport.dimensionScores.map((dim) => (
                      <div
                        key={dim.key}
                        className="p-4 rounded-2xl bg-black/35 border border-white/10 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-extrabold text-xs sm:text-sm text-white">
                            {dim.labelAr}
                          </span>
                          <div className="flex items-center gap-1.5 font-mono shrink-0">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                              Sten {dim.stenScore || 6}/10
                            </span>
                            <span className="font-black text-sm text-purple-300">
                              {dim.score}%
                            </span>
                          </div>
                        </div>

                        {dim.lowPoleAr && dim.highPoleAr && (
                          <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium">
                            <span>القطب المنخفض: {dim.lowPoleAr}</span>
                            <span>القطب المرتفع: {dim.highPoleAr}</span>
                          </div>
                        )}

                        <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${dim.score}%`,
                              backgroundColor: dim.color || '#6366f1',
                            }}
                          />
                        </div>

                        {dim.plainExplanationAr && (
                          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-200 font-medium leading-relaxed">
                            ✨ <strong>التفسير المبسط لغير المختصين:</strong> {dim.plainExplanationAr}
                          </div>
                        )}

                        <p className="text-[11px] text-gray-300 leading-relaxed">{dim.analysisAr}</p>
                        <p className="text-[11px] text-amber-300">💍 تطبيق زوجي: {dim.adviceAr}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 5 Global Factors View */}
                {cattellViewMode === 'global5' && cattellReport.cattellGlobalFactors && (
                  <div className="space-y-3">
                    {cattellReport.cattellGlobalFactors.map((gf) => (
                      <div
                        key={gf.key}
                        className="p-4 rounded-2xl bg-black/35 border border-white/10 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-sm text-white">{gf.labelAr}</span>
                          <div className="flex items-center gap-2 font-mono text-xs">
                            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                              Sten {gf.sten}/10
                            </span>
                            <span className="font-black text-white">{gf.score}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-gray-400">
                          <span>{gf.lowPoleAr}</span>
                          <span>{gf.highPoleAr}</span>
                        </div>
                        <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${gf.score}%`, backgroundColor: gf.color }}
                          />
                        </div>
                        <p className="text-xs text-emerald-200 font-semibold">
                          💡 المعنى المبسط: {gf.plainExplanationAr}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4 Simplified Clusters View */}
                {cattellViewMode === 'clusters' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      {
                        title: '1. أسلوب التواصل والتفاعل الإنساني 💬',
                        keys: ['warmth', 'liveliness', 'social_boldness', 'privateness'],
                        desc: 'يجمع عوامل الدفء (A)، الحيوية (F)، الجرأة الاجتماعية (H)، وحفظ الخصوصية (N) ليوضح كيف تتواصل عاطفياً واجتماعياً.',
                        color: '#f43f5e',
                      },
                      {
                        title: '2. الصلابة العاطفية وإدارة الضغوط 🛡️',
                        keys: ['stability', 'vigilance', 'apprehension', 'tension'],
                        desc: 'يجمع عوامل قوة الأنا (C)، اليقظة (L)، الاطمئنان (O)، والسكينة (Q4) ليوضح مدى ثباتك الانفعالي وقت الأزمات.',
                        color: '#10b981',
                      },
                      {
                        title: '3. التفكير التحليلي والخيال والتجديد 💡',
                        keys: ['reasoning', 'sensitivity', 'abstractedness', 'openness_to_change'],
                        desc: 'يجمع عوامل المنطق التحليلي (B)، رهافة الحس (I)، الخيال (M)، والانفتاح على التطوير (Q1).',
                        color: '#38bdf8',
                      },
                      {
                        title: '4. القيادة والانضباط وأسلوب الحياة ⚖️',
                        keys: ['dominance', 'rule_consciousness', 'self_reliance', 'perfectionism'],
                        desc: 'يجمع عوامل القيادة (E)، الضمير الحي (G)، الاستقلالية (Q2)، والدقة التنظيمية (Q3).',
                        color: '#a855f7',
                      },
                    ].map((cl, idx) => {
                      const matched = cattellReport.dimensionScores.filter((d) =>
                        cl.keys.includes(d.key)
                      );
                      const avg = Math.round(
                        matched.reduce((acc, c) => acc + c.score, 0) / Math.max(1, matched.length)
                      );
                      return (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-black/35 border border-white/10 space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-xs sm:text-sm text-white">{cl.title}</h5>
                            <span
                              className="font-black text-xs font-mono px-2.5 py-0.5 rounded-lg"
                              style={{ backgroundColor: `${cl.color}25`, color: cl.color }}
                            >
                              {avg}%
                            </span>
                          </div>
                          <p className="text-xs text-gray-300 leading-relaxed">{cl.desc}</p>
                          <div className="space-y-1.5 pt-2 border-t border-white/10">
                            {matched.map((m) => (
                              <div
                                key={m.key}
                                className="flex items-center justify-between text-[11px] text-gray-200"
                              >
                                <span>{m.labelAr.split('(')[0]}</span>
                                <span className="font-mono text-purple-300">
                                  {m.score}% (Sten {m.stenScore}/10)
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: IDEAL LIFE PARTNER PROFILE ================= */}
        {activeTab === 'partner' && (
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-purple-500/20 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1.5 text-center sm:text-right">
                <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-xs inline-block">
                  تحليل مواصفات شريك الحياة المناسب (وفق إجاباتك والتكامل السيكومتري) 💍
                </span>
                <h3 className="font-black text-lg sm:text-xl text-white font-['Alexandria']">
                  {questionnaire.partnerCorePersonalityType ||
                    activeMatchingReport.idealPartnerProfile.recommendedArchetypeAr}
                </h3>
                <p className="text-xs text-gray-200 max-w-2xl leading-relaxed">
                  الفئة العمرية المفضلة: <strong>{questionnaire.preferredPartnerAgeRange}</strong> • تم استخلاص هذه المواصفات من إجاباتك المباشرة في الاستبيان الزوجي بالتكامل مع نتائجك السيكومترية في مقياس كاتل (16PF) والعوامل الخمسة.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('questionnaire')}
                className="px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs transition cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>تعديل مواصفات شريكي</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
                  <Sparkles className="w-4 h-4 text-rose-400" />
                  <span>الصفات الأساسية والسمات المتكاملة المطلوبة في الشريك:</span>
                </div>
                <ul className="space-y-2 text-xs text-gray-200 leading-relaxed">
                  {[
                    ...questionnaire.partnerEssentialTraits,
                    ...activeMatchingReport.idealPartnerProfile.complementaryTraits.slice(0, 2),
                  ]
                    .filter((v, i, a) => Boolean(v) && a.indexOf(v) === i)
                    .map((t, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300">
                  <Heart className="w-4 h-4 text-purple-400" />
                  <span>احتياجاتك العاطفية وأسلوب الحوار الأنسب مع الشريك:</span>
                </div>
                <div className="space-y-2.5 text-xs text-gray-200 leading-relaxed">
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <strong className="text-purple-300 block mb-1">
                      الحاجة للأمان النفسي والاحتواء:
                    </strong>
                    <p>{questionnaire.partnerEmotionalNeedsFromThem}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20">
                    <strong className="text-sky-300 block mb-1">
                      أسلوب التواصل وحل الخلافات المفضل:
                    </strong>
                    <p>{questionnaire.partnerCommunicationPreference}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>مؤشرات التوافق الإيجابي (Green Flags) التي تبحث عنها:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-gray-200 leading-relaxed">
                  {questionnaire.partnerGreenFlags.map((g, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>مؤشرات التنافر المرفوضة (Red Flags) لتجنبها:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-gray-200 leading-relaxed">
                  {questionnaire.partnerRedFlags.map((r, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: DISCOVER MATCHES (COMPATIBLE & SIMILAR) ================= */}
        {activeTab === 'matches' && (
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
            {/* Discoverability Banner & Toggle */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-purple-500/15 border border-emerald-500/30 space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>
                      اكتشف من يشبهك أو يتوافق معك للتواصل (خوارزمية التوافق السيكومتري)
                    </span>
                  </h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    يتم حساب نسب التوافق التكاملي والتشابه النمطي رياضياً بناءً على إجاباتك في الاستبيان الشخصي وسماتك الـ 16 (Cattell 16PF / Big Five).
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-gray-300">
                    {isPublic ? 'ملفي مفعل للتعارف 🟢' : 'ملف خاص 🔒'}
                  </span>
                  <button
                    onClick={() => handleTogglePublic(!isPublic)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      isPublic ? 'bg-emerald-500' : 'bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isPublic ? '-translate-x-6' : '-translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {isPublic && (
                <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-300 shrink-0">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>رقم الواتساب للتواصل (اختياري):</span>
                  </div>
                  <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
                    <input
                      type="text"
                      value={whatsappContact}
                      onChange={(e) => setWhatsappContact(e.target.value)}
                      placeholder="مثال: +966501234567"
                      className="px-3 py-1.5 rounded-xl bg-black/40 border border-emerald-500/30 text-white text-xs outline-none flex-1 font-mono"
                    />
                    <button
                      onClick={handleSaveWhatsapp}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer shrink-0"
                    >
                      حفظ وتحديث بطاقتي
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Match Filter & Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1 p-1 rounded-2xl bg-black/30 border border-white/10 text-xs font-bold overflow-x-auto">
                <button
                  onClick={() => {
                    soundManager.playTab();
                    setMatchFilter('all');
                  }}
                  className={`px-3 py-1 rounded-xl transition cursor-pointer ${
                    matchFilter === 'all'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  جميع المتوافقين ({computedCommunityMembers.length})
                </button>
                <button
                  onClick={() => {
                    soundManager.playTab();
                    setMatchFilter('complementary');
                  }}
                  className={`px-3 py-1 rounded-xl transition cursor-pointer ${
                    matchFilter === 'complementary'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  التوافق التكاملي للزواج 💍
                </button>
                <button
                  onClick={() => {
                    soundManager.playTab();
                    setMatchFilter('similar');
                  }}
                  className={`px-3 py-1 rounded-xl transition cursor-pointer ${
                    matchFilter === 'similar'
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  المتشابهون في النمط والاهتمامات 🤝
                </button>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value as any)}
                  className="px-2.5 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white outline-none"
                >
                  <option value="all">الجنس: الكل</option>
                  <option value="female">إناث</option>
                  <option value="male">ذكور</option>
                </select>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-2" />
                  <input
                    type="text"
                    value={matchSearchQuery}
                    onChange={(e) => setMatchSearchQuery(e.target.value)}
                    placeholder="ابحث بالبلد أو الاهتمام..."
                    className="pr-8 pl-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white outline-none w-44"
                  />
                </div>
              </div>
            </div>

            {/* Member Profiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-4 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 transition flex flex-col justify-between space-y-3"
                >
                  {/* Member Top */}
                  <div className="flex items-start gap-3">
                    <img
                      src={member.avatarUrl}
                      alt={member.displayName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500/40 shrink-0 shadow-md"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-extrabold text-sm text-white truncate">
                          {member.displayName}
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0">
                          {member.archetypeBadge}
                        </span>
                      </div>
                      <p className="text-[11px] text-rose-300 font-semibold truncate">
                        {member.archetype}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {member.country} • {member.city} ({member.userAge} سنة)
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-gray-300 leading-relaxed">{member.bio}</p>

                  {/* Dynamic Shared Highlights & Complementarity */}
                  {member.sharedHighlightsWithUser &&
                    member.sharedHighlightsWithUser.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-emerald-300 block">
                          نقاط التشابه والتلاقي المباشر مع إجاباتك:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {member.sharedHighlightsWithUser.slice(0, 2).map((sh, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-200 border border-emerald-500/30"
                            >
                              ✓ {sh}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Compatibility & Similarity Progress */}
                  <div className="p-2.5 rounded-2xl bg-black/40 border border-white/10 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 font-bold flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-rose-400" />
                        <span>معامل التوافق التكاملي للزواج:</span>
                      </span>
                      <span className="font-black text-rose-300 font-mono text-sm">
                        {member.compatibilityScore}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-rose-500 rounded-full"
                        style={{ width: `${member.compatibilityScore}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-0.5 font-mono">
                      <span>معامل التشابه السيكومتري: {member.similarityScore}%</span>
                      <span>{member.attachmentStyleAr || 'ارتباط آمن'}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playTap();
                        setSelectedMemberToCompare(member);
                      }}
                      className="flex-1 py-2 px-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>تحليل التوافق المقارن</span>
                    </button>

                    {member.contactOptions.whatsapp && (
                      <button
                        type="button"
                        onClick={() => {
                          soundManager.playTap();
                          const msg = `مرحباً ${member.displayName}، اطلعت على ملفك السيكومتري المتوافق معي بنسبة ${member.compatibilityScore}% على منصة «مِرآة القلوب» وأود التواصل معك 🌸`;
                          openExternalShareUrl(
                            `https://api.whatsapp.com/send?phone=${member.contactOptions.whatsapp}&text=${encodeURIComponent(
                              msg
                            )}`
                          );
                        }}
                        className="py-2 px-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>واتساب</span>
                      </button>
                    )}

                    {onOpenLiveChat && (
                      <button
                        onClick={() => {
                          soundManager.playTap();
                          onClose();
                          onOpenLiveChat();
                        }}
                        className="py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                      >
                        <span>دردشة حية</span>
                      </button>
                    )}

                    {onOpenCoupleInvite && (
                      <button
                        onClick={() => {
                          soundManager.playTap();
                          onClose();
                          onOpenCoupleInvite();
                        }}
                        className="py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 font-bold text-xs transition cursor-pointer"
                        title="دعوة لخوض اختبار التوافق الثنائي"
                      >
                        <span>دعوة 💑</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Side-by-Side Scientific Comparison Modal */}
            <AnimatePresence>
              {selectedMemberToCompare && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm"
                >
                  <div className="w-full max-w-2xl rounded-3xl bg-[#140e28] border border-purple-500/40 p-5 space-y-4 text-right max-h-[88vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <h4 className="font-extrabold text-base text-white">
                          المقارنة السيكومترية الدقيقة: {userName} ✕{' '}
                          {selectedMemberToCompare.displayName}
                        </h4>
                        <p className="text-xs text-purple-300">
                          نسبة التوافق التكاملي: {selectedMemberToCompare.compatibilityScore}% • نسبة التشابه النمطي: {selectedMemberToCompare.similarityScore}%
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedMemberToCompare(null)}
                        className="p-1.5 rounded-full bg-white/10 text-gray-300 hover:text-white cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* 5 Dimensions Comparison Bars */}
                    <div className="space-y-2.5">
                      <h5 className="font-bold text-xs text-gray-300">
                        مقارنة الأبعاد الخمسة الكبرى للشخصية (أنت مقابل الشريك):
                      </h5>
                      {(() => {
                        const u5 = getCore5Dimensions();
                        const m5 = selectedMemberToCompare.dimensionScores;
                        const rows = [
                          { label: 'الانبساط والحيوية الاجتماعية', u: u5.extraversion, m: m5.extraversion },
                          { label: 'الاستقرار الانفعالي وقوة الأنا', u: u5.emotionalStability, m: m5.emotionalStability },
                          { label: 'الانفتاح الفكري والتطوير', u: u5.openness, m: m5.openness },
                          { label: 'التعاطف والوفاق العلائقي', u: u5.agreeableness, m: m5.agreeableness },
                          { label: 'اليقظة والضمير والتنظيم', u: u5.conscientiousness, m: m5.conscientiousness },
                        ];
                        return rows.map((r, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-xs space-y-1">
                            <div className="flex items-center justify-between font-bold text-white">
                              <span>{r.label}</span>
                              <span className="font-mono text-[11px] text-purple-300">
                                أنت: {r.u}% | الطرف الآخر: {r.m}% (الفرق: {Math.abs(r.u - r.m)}%)
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${r.u}%` }} />
                              </div>
                              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${r.m}%` }} />
                              </div>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                        <strong className="text-emerald-300 block">أبرز صفاته ونقاط قوته:</strong>
                        <ul className="space-y-1 text-gray-200">
                          {selectedMemberToCompare.strengths.map((s, i) => (
                            <li key={i}>• {s}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                        <strong className="text-amber-300 block">تطلعاته للعش الزوجي:</strong>
                        <ul className="space-y-1 text-gray-200">
                          {selectedMemberToCompare.aspirations.map((a, i) => (
                            <li key={i}>• {a}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      {onOpenLiveChat && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedMemberToCompare(null);
                            onClose();
                            onOpenLiveChat();
                          }}
                          className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs cursor-pointer"
                        >
                          بدء محادثة تفاعلية الآن 💬
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedMemberToCompare(null)}
                        className="px-4 py-2 rounded-xl bg-white/10 text-gray-200 font-bold text-xs cursor-pointer"
                      >
                        إغلاق
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ================= TAB 6: TEST HISTORY & EVOLUTION ================= */}
        {activeTab === 'history' && (
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
            {/* Header Banner */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-blue-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1.5 text-center sm:text-right">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="font-black text-lg sm:text-xl text-white font-['Alexandria'] flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <span>سجل وتطور اختباراتي (مع تحميل تقارير PDF)</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    محفوظ وموثق 🔒
                  </span>
                </div>
                <p className="text-xs text-gray-300 max-w-xl">
                  تتبع جميع اختبارات الذكاء ومقاييس الشخصية وتوافق الشريك التي أجريتها، مع إمكانية تحميل أي تقرير سابق بصيغة PDF حقيقية في أي وقت.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {onOpenIntelligenceTest && (
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      onOpenIntelligenceTest();
                    }}
                    className="px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/40 text-blue-200 text-xs font-bold transition cursor-pointer shadow-sm"
                  >
                    + اختبار ذكاء جديد
                  </button>
                )}
                {onOpenPsychologyTests && (
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      onOpenPsychologyTests();
                    }}
                    className="px-3 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/40 text-emerald-200 text-xs font-bold transition cursor-pointer shadow-sm"
                  >
                    + اختبار نفسي جديد
                  </button>
                )}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block font-bold">
                    إجمالي الاختبارات المحفوظة
                  </span>
                  <span className="text-lg font-black text-white font-mono">
                    {testHistory.length} اختبار
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block font-bold">
                    متوسط الاتزان والأداء السيكومتري
                  </span>
                  <span className="text-lg font-black text-emerald-400 font-mono">
                    {testHistory.length > 0
                      ? Math.round(
                          testHistory.reduce((acc, curr) => acc + (curr.percentage || 0), 0) /
                            testHistory.length
                        )
                      : cattellReport.totalScore}
                    %
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-300 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-400 block font-bold">
                    حالة المزامنة والخصوصية
                  </span>
                  <span className="text-xs font-bold text-blue-300">
                    {user ? 'سحابي ومحمي (Firebase)' : 'محفوظ محلياً + جلسة الزائر'}
                  </span>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
              <span className="text-gray-400 text-xs shrink-0 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> تصفية:
              </span>
              <button
                onClick={() => setHistoryFilter('all')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
                  historyFilter === 'all'
                    ? 'bg-white/20 text-white font-black'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                الكل ({testHistory.length})
              </button>
              <button
                onClick={() => setHistoryFilter('intelligence')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
                  historyFilter === 'intelligence'
                    ? 'bg-blue-600 text-white font-black'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                اختبارات الذكاء ({testHistory.filter((t) => t.testType === 'intelligence').length})
              </button>
              <button
                onClick={() => setHistoryFilter('psychology')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
                  historyFilter === 'psychology'
                    ? 'bg-emerald-600 text-white font-black'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                المقاييس النفسية ({testHistory.filter((t) => t.testType === 'psychology').length})
              </button>
              <button
                onClick={() => setHistoryFilter('partner_compatibility')}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
                  historyFilter === 'partner_compatibility'
                    ? 'bg-purple-600 text-white font-black'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                توافق الشريك ({testHistory.filter((t) => t.testType === 'partner_compatibility').length})
              </button>
            </div>

            {/* Test History List */}
            {loadingHistory ? (
              <div className="space-y-3 pt-2">
                <SkeletonLoader type="history_card" count={3} />
              </div>
            ) : testHistory.length === 0 ? (
              <div className="p-8 rounded-3xl bg-black/30 border border-white/10 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                  <Brain className="w-7 h-7 text-purple-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-white">لا توجد اختبارات مسجلة حتى الآن</h4>
                  <p className="text-xs text-gray-400 max-w-md mx-auto">
                    ابدأ رحلتك المعرفية الآن بإجراء أحد اختبارات الذكاء أو مقاييس الشخصية المعتمدة أو مقياس كاتل (16PF)؛ ليتم حفظ سجلك الشخصي وتحميل تقاريرك بصيغة PDF.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      setActiveTab('cattell_16pf');
                      setIsTaking16PFInline(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition cursor-pointer"
                  >
                    📊 إجراء مقياس كاتل 16PF الآن
                  </button>
                  {onOpenIntelligenceTest && (
                    <button
                      onClick={() => {
                        soundManager.playTap();
                        onOpenIntelligenceTest();
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition cursor-pointer"
                    >
                      💡 اختبارات الذكاء المعتمدة
                    </button>
                  )}
                  {onOpenPsychologyTests && (
                    <button
                      onClick={() => {
                        soundManager.playTap();
                        onOpenPsychologyTests();
                      }}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition cursor-pointer"
                    >
                      🧠 مقاييس الشخصية المعتمدة
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-1">
                {testHistory
                  .filter((rec) =>
                    historyFilter === 'all' ? true : rec.testType === historyFilter
                  )
                  .map((rec) => {
                    const dateFormatted = new Date(rec.createdAt).toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    return (
                      <div
                        key={rec.id}
                        className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-white/20 transition-all space-y-3"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                              style={{
                                backgroundColor: `${rec.badgeColor || '#059669'}20`,
                                borderColor: `${rec.badgeColor || '#059669'}50`,
                                color: rec.badgeColor || '#059669',
                              }}
                            >
                              {rec.testType === 'intelligence' ? (
                                <Sparkles className="w-5 h-5" />
                              ) : rec.testType === 'psychology' ? (
                                <Brain className="w-5 h-5" />
                              ) : (
                                <Heart className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-extrabold text-sm sm:text-base text-white font-['Alexandria']">
                                  {rec.testTitleAr}
                                </h4>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/15">
                                  {rec.testCategoryAr}
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-400 flex items-center gap-1.5 mt-0.5">
                                <Calendar className="w-3 h-3 text-gray-500" />
                                <span>{dateFormatted}</span>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className="px-3 py-1 rounded-xl text-xs font-black shrink-0 border font-mono"
                              style={{
                                backgroundColor: `${rec.badgeColor || '#059669'}25`,
                                borderColor: `${rec.badgeColor || '#059669'}40`,
                                color: rec.badgeColor || '#34d399',
                              }}
                            >
                              {rec.scoreOrArchetype}
                            </span>

                            <button
                              type="button"
                              onClick={() => handleDownloadHistoryRecordPDF(rec)}
                              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                              title="تحميل هذا التقرير بصيغة PDF"
                            >
                              <FileDown className="w-3.5 h-3.5" />
                              <span>تحميل PDF</span>
                            </button>

                            <button
                              onClick={() => handleDeleteHistoryItem(rec.id)}
                              disabled={deletingId === rec.id}
                              title="حذف هذا السجل"
                              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-300 transition cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {rec.keyInsights && rec.keyInsights.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {rec.keyInsights.map((ins, i) => (
                              <span
                                key={i}
                                className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white/5 text-gray-300 border border-white/10"
                              >
                                ✓ {ins}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 7: PUBLISH & SOCIAL SHARE ================= */}
        {activeTab === 'share' && (
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
            <div className="p-5 rounded-3xl bg-black/30 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>نشر ومشاركة ملفي الشخصي عبر رابط مخصص</span>
                  </h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    يمكنك مشاركة نتائج اختبارك، صفاتك السلوكية، اهتماماتك، وتطلعاتك ومواصفات شريكك المناسب مع الآخرين
                  </p>
                </div>

                <button
                  onClick={() => handleTogglePublic(!isPublic)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    isPublic ? 'bg-emerald-500' : 'bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isPublic ? '-translate-x-6' : '-translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {isPublic ? (
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2 p-2 rounded-2xl bg-black/40 border border-emerald-500/30">
                    <input
                      type="text"
                      readOnly
                      value={publicProfileUrl}
                      className="bg-transparent text-xs text-emerald-200 font-mono flex-1 outline-none px-2 select-all overflow-ellipsis"
                    />
                    <button
                      onClick={handleCopyLink}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-sm ${
                        copiedLink
                          ? 'bg-emerald-500 text-white'
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>تم النسخ!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>نسخ الرابط</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-300 block">
                      مشاركة مباشرة على منصات السوشيل ميديا:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <button
                        onClick={() =>
                          openExternalShareUrl(
                            `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`
                          )
                        }
                        className="py-2 px-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>واتساب</span>
                      </button>

                      <button
                        onClick={() =>
                          openExternalShareUrl(
                            `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
                          )
                        }
                        className="py-2 px-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 text-sky-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>𝕏 تويتر</span>
                      </button>

                      <button
                        onClick={() =>
                          openExternalShareUrl(
                            `https://t.me/share/url?url=${encodeURIComponent(
                              publicProfileUrl
                            )}&text=${encodeURIComponent(shareText)}`
                          )
                        }
                        className="py-2 px-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-blue-400" />
                        <span>تليجرام</span>
                      </button>

                      <button
                        onClick={() =>
                          openExternalShareUrl(
                            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              publicProfileUrl
                            )}`
                          )
                        }
                        className="py-2 px-3 rounded-xl bg-indigo-600/25 hover:bg-indigo-600/35 border border-indigo-500/30 text-indigo-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>فيسبوك</span>
                      </button>

                      <button
                        onClick={() =>
                          openExternalShareUrl(
                            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                              publicProfileUrl
                            )}`
                          )
                        }
                        className="py-2 px-3 rounded-xl bg-blue-700/25 hover:bg-blue-700/35 border border-blue-600/30 text-blue-200 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                        <span>لينكد إن</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-400 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>
                    ملفك الشخصي حالياً خاص ومحمي ولا يظهر للآخرين إلا عند تفعيل خيار النشر أعلاه.
                  </span>
                </div>
              )}
            </div>

            {/* Profile Card Preview */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-tr from-[#16102a] via-[#1f1538] to-[#120d20] border border-white/15 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs text-gray-400 font-bold">
                  معاينة بطاقة ملفك العامة للآخرين:
                </span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                  Public Social Preview
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  {userName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-extrabold text-base sm:text-lg text-white font-['Alexandria']">
                    {userName}
                  </h4>
                  <p className="text-xs text-rose-300 font-semibold">
                    {cattellReport.isCompleted
                      ? cattellReport.primaryArchetypeAr
                      : report.primaryArchetypeAr}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {country} • {userAge} سنة
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs text-gray-300 space-y-1.5">
                <strong className="text-purple-300 block text-xs">
                  مواصفات الشريك المناسب حسب اختياراتك:
                </strong>
                <p>{questionnaire.partnerCorePersonalityType}</p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {questionnaire.partnerEssentialTraits.slice(0, 3).map((tr, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300"
                    >
                      ✓ {tr}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
