import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Share2,
  Download,
  Copy,
  Check,
  ZoomIn,
  RefreshCw,
  MessageCircle,
  Twitter,
  ShieldCheck,
  Award,
  Eye,
  GraduationCap,
  Users,
  Brain,
  Quote,
  Flame,
  Lock,
  KeyRound,
  Calculator,
  Sun,
  Moon,
  Bookmark,
  BookmarkCheck,
  History,
  RotateCw,
  FileDown,
} from 'lucide-react';
import { useAppTheme } from '../utils/theme';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { saveTestResultToHistory } from '../services/userHistoryService';
import { PartnerAnalysisResult, UserProfile } from '../types';
import { generateShareCardCanvas } from '../utils/shareCard';
import { soundManager } from '../utils/sound';
import { ImageViewerModal } from './ImageViewerModal';
import { CompatibilityCharts } from './CompatibilityCharts';
import { CompatibilityHeatmap } from './CompatibilityHeatmap';
import { SocioculturalScienceSection } from './SocioculturalScienceSection';
import { FastCompatibilityCadenceSection } from './FastCompatibilityCadenceSection';
import { PrivacySettingsModal } from './PrivacySettingsModal';
import { RealCalculationAuditModal } from './RealCalculationAuditModal';
import { CompatibilityFlipCard, CompatibilityCardData } from './CompatibilityFlipCard';
import { SmartRecommendationsSection } from './SmartRecommendationsSection';
import { isPinLockEnabled } from '../utils/privacyLock';
import { calculateRealCompatibility } from '../utils/realScoringEngine';
import { exportPsychometricReportAsPDF } from '../utils/pdfReportGenerator';

interface Props {
  result: PartnerAnalysisResult;
  profile: UserProfile;
  onRestart: () => void;
  onRegenerateImage?: () => void;
  isRegeneratingImage?: boolean;
  onLockResult?: () => void;
  onOpenLiveChat?: () => void;
  onOpenBlindDate?: () => void;
  onOpenAuth?: () => void;
  onOpenHistory?: () => void;
  onOpenPsychologyTests?: () => void;
  onOpenIntelligenceTests?: () => void;
  onOpenArticles?: (articleId?: string) => void;
  onOpenNovels?: (novelId?: string) => void;
  onOpenUserDashboard?: () => void;
  onOpenCoupleInvite?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const tabVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.18, ease: 'easeIn' as const },
  },
};

// Smooth staggered fade-in variants for all elements within the card (User Request 7)
const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.12,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const ResultStep: React.FC<Props> = ({
  result,
  profile,
  onRestart,
  onRegenerateImage,
  isRegeneratingImage,
  onLockResult,
  onOpenLiveChat,
  onOpenBlindDate,
  onOpenAuth,
  onOpenHistory,
  onOpenPsychologyTests,
  onOpenIntelligenceTests,
  onOpenArticles,
  onOpenNovels,
  onOpenUserDashboard,
  onOpenCoupleInvite,
}) => {
  const { user } = useAuth();
  const { language, direction, isRTL, t, translateText } = useLanguage();
  const [activeTab, setActiveTab] = useState<'profile' | 'intellect' | 'social' | 'traits' | 'advice'>('profile');
  const [copied, setCopied] = useState(false);
  const [isGeneratingShareCard, setIsGeneratingShareCard] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [pinEnabled, setPinEnabled] = useState(() => isPinLockEnabled());
  const [theme, toggleTheme] = useAppTheme();

  // Flip animation state for compatibility cards (User request)
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const handleToggleFlipCard = (cardId: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const areAllCardsFlipped = ['intellectual', 'sociological', 'emotional', 'lifestyle'].every(
    (id) => !!flippedCards[id]
  );

  const handleToggleFlipAll = () => {
    soundManager.playTap();
    const nextState = !areAllCardsFlipped;
    setFlippedCards({
      intellectual: nextState,
      sociological: nextState,
      emotional: nextState,
      lifestyle: nextState,
    });
  };

  // Save to account state
  const [isSavingResult, setIsSavingResult] = useState(false);
  const [isResultSaved, setIsResultSaved] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const handleSaveToAccount = async () => {
    soundManager.playTap();
    setIsSavingResult(true);
    try {
      await saveTestResultToHistory(user, profile, result);
      soundManager.playRoundPass();
      setIsResultSaved(true);
      setSaveSuccessMsg(
        user
          ? 'تم حفظ نتيجة الاختبار في قاعدة بيانات حسابك بنجاح!'
          : 'تم حفظ نتيجة الاختبار في قاعدة البيانات لسجلك الدائم بنجاح!'
      );
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (e) {
      console.error('Failed to save result to account', e);
      setSaveSuccessMsg('تعذر الحفظ، يرجى المحاولة لاحقاً');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    }
    setIsSavingResult(false);
  };

  const effectiveBreakdown = result.scoringBreakdown || calculateRealCompatibility(profile, {});

  useEffect(() => {
    soundManager.playResultReveal();
    try {
      confetti({
        particleCount: 85,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#8b5cf6', '#fbbf24', '#ffffff'],
      });
    } catch {
      // Fallback
    }
  }, []);

  const imageUrl =
    result.imageUrl ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=95';

  const partnerName = result.proposedPartnerName || (profile.partnerGender === 'female' ? 'نـورة' : 'فيـصل');

  // Download High-Res Share Card
  const handleDownloadCard = async () => {
    soundManager.playTap();
    setIsGeneratingShareCard(true);
    try {
      const dataUrl = await generateShareCardCanvas(result, profile, imageUrl);
      const link = document.createElement('a');
      link.download = `sharik-alhayat-${partnerName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export share card:', err);
    } finally {
      setIsGeneratingShareCard(false);
    }
  };

  // Native Web Share API
  const handleNativeShare = async () => {
    soundManager.playTap();
    setIsGeneratingShareCard(true);

    const shareTitle = `مِرآة القلوب | دراسة التوافق الفكري والاجتماعي`;
    const shareText = `🔮 حللت توافقي الفكري والاجتماعي مع شريك حياتي (${partnerName} - ${result.partnerArchetype}) بنسبة ${result.compatibilityScore}% من أصول (${profile.ethnicity}) في ${profile.country}! اكتشف شريكك الآن:`;
    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        try {
          const dataUrl = await generateShareCardCanvas(result, profile, imageUrl);
          const res = await fetch(dataUrl);
          const blob = await res.blob();
          const file = new File([blob], `partner-${partnerName}.png`, { type: 'image/png' });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: shareTitle,
              text: shareText,
              url: shareUrl,
              files: [file],
            });
            setIsGeneratingShareCard(false);
            return;
          }
        } catch {
          // Fallback to text
        }

        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } else {
        handleCopyLink();
        handleDownloadCard();
      }
    } catch (e) {
      console.log('Share dismissed', e);
    } finally {
      setIsGeneratingShareCard(false);
    }
  };

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `📊 نتيجة التقييم السيكومتري العلمي للتوافق الأسري (منصة مِـرآة القـلوب):\n\n✨ النمط التوافقي: ${result.partnerArchetype}\n❤️ مؤشر التوافق الكلي الموزون: ${result.compatibilityScore}%\n🧠 التوافق الفكري والمعرفي: ${result.intellectualScore || 90}%\n🏛️ التوافق القيمي والمجتمعي: ${result.sociologicalScore || 88}%\n🌍 الخلفية الثقافية: ${profile.ethnicity} - ${profile.country}\n\nجرب الاختبار العلمي المعتمد (25 بنداً):\n${typeof window !== 'undefined' ? window.location.href : ''}`
  )}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `أتممت التقييم السيكومتري العلمي للتوافق الأسري عبر منصة مِـرآة القـلوب بنسبة توافق موزون ${result.compatibilityScore}%! 📊🔬`
  )}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`;

  const handleExportScientificPDF = () => {
    soundManager.playTap();
    const subscales = effectiveBreakdown.scientificSubscales || [];
    exportPsychometricReportAsPDF({
      reportTitle: 'التقرير السيكومتري العلمي الشامل للتوافق الأسري والزواجي',
      subTitle: 'مبني على 25 بنداً محكّماً وفق نماذج Gottman و Bowlby/ECR-R و Sternberg و Bowen و Schwartz و Klontz',
      scientificBasis:
        'Gottman (1999) Sound Relationship House • Fraley et al. (2000) ECR-R • Sternberg (1986) • Bowen (1978) • Schwartz (1992) • Klontz (2011)',
      userName: profile.userName || 'مشارك',
      completedAt: new Date().toLocaleDateString('ar-JO'),
      overallScoreLabel: 'مؤشر التوافق السيكومتري الموزون',
      overallScoreValue: `${effectiveBreakdown.compatibilityScore}%`,
      cognitiveFingerprintTitle: `${result.partnerArchetype} — بصمة التناغم الأسري (${effectiveBreakdown.auditHash})`,
      executiveSummary: `${result.detailedMatchReason} — خوارزمية القياس: ${effectiveBreakdown.algorithmVersion}`,
      metrics: subscales.map((sub) => ({
        label: `${sub.titleAr} (${sub.theoryNameEn})`,
        scorePercent: sub.score,
        rawText: `${sub.questionsUsed.length} بنود قياسية`,
        levelLabel: sub.scientistAr,
        color: '#10b981',
      })),
      sections: subscales.map((sub) => ({
        title: sub.titleAr,
        badge: `${sub.scientistAr} • ${sub.theoryNameEn}`,
        content: sub.analysisAr,
        scorePercent: sub.score,
      })),
      careersOrRecommendations: [
        result.intellectualSynergy,
        result.socialHarmony,
        result.romanticAdvice,
      ],
      disclaimerText:
        'هذا التقرير السيكومتري مبني على إجاباتك الفعلية عبر معادلات إحصائية حتمية (Deterministic Weighted Scoring) لأغراض الوعي الذاتي والإرشاد الأسري، ولا يعتمد على أي توقعات غيبية أو عشوائية.',
    });
  };

  const handleCopyLink = () => {
    soundManager.playTap();
    navigator.clipboard.writeText(
      `📊 منصة مِـرآة القـلوب للتقييم العلمي للتوافق الأسري\nالنمط التوافقي: ${result.partnerArchetype}\nمؤشر التوافق الموزون: ${result.compatibilityScore}%\n${window.location.href}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto px-4 py-6 text-white"
      dir={direction}
    >
      {/* Privacy PIN Security Bar */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between gap-2 p-2.5 px-3.5 rounded-2xl bg-black/40 border border-white/10 mb-5 text-xs shadow-md"
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              pinEnabled ? 'bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse' : 'bg-gray-500'
            }`}
          />
          <span className="text-gray-300 font-medium">
            {pinEnabled ? (
              <strong className="text-emerald-400">{t('pin_security_enabled')}</strong>
            ) : (
              <span className="text-gray-400">{t('pin_security_disabled')}</span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {pinEnabled && onLockResult && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                soundManager.playTap();
                onLockResult();
              }}
              className="px-2.5 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold flex items-center gap-1 cursor-pointer transition text-[11px]"
              title={t('lock_now')}
            >
              <Lock className="w-3 h-3" />
              <span>{t('lock_now')}</span>
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              soundManager.playTap();
              setShowPrivacyModal(true);
            }}
            className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium flex items-center gap-1 cursor-pointer transition text-[11px]"
          >
            <KeyRound className="w-3 h-3 text-amber-300" />
            <span>{pinEnabled ? t('pin_settings') : t('enable_pin')}</span>
          </motion.button>

          {/* Light Mode / Dark Mode Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              soundManager.playTap();
              toggleTheme();
            }}
            className="px-2.5 py-1 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 font-medium flex items-center gap-1 cursor-pointer transition text-[11px]"
            title={theme === 'dark' ? t('light_mode') : t('dark_mode')}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3 h-3 text-amber-400" />
                <span>{t('light_mode')}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-purple-600" />
                <span>{t('dark_mode')}</span>
              </>
            )}
          </motion.button>

          {/* Save Result to Account Button (Firebase Auth & Firestore) */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleSaveToAccount}
            disabled={isSavingResult}
            className={`px-3 py-1 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer transition text-[11px] shadow-sm ${
              isResultSaved
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                : 'bg-gradient-to-r from-rose-500/20 to-purple-500/20 hover:from-rose-500/30 hover:to-purple-500/30 border border-rose-500/30 text-rose-200'
            }`}
            title="Save result to account"
          >
            {isResultSaved ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('saved_in_account')}</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-rose-400" />
                <span>{isSavingResult ? t('saving_progress') : t('save_to_account')}</span>
              </>
            )}
          </motion.button>

          {/* History Button */}
          {onOpenHistory && (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                soundManager.playTap();
                onOpenHistory();
              }}
              className="px-2.5 py-1 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/30 text-purple-200 font-medium flex items-center gap-1 cursor-pointer transition text-[11px]"
              title="History"
            >
              <History className="w-3 h-3 text-purple-300" />
              <span>{t('history_btn')}</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Save Success Alert Banner */}
      <AnimatePresence>
        {saveSuccessMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <BookmarkCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveSuccessMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner with Entrance Motion */}
      <motion.div variants={itemVariants} className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-violet-500/20 border border-rose-500/40 text-rose-200 text-xs font-bold mb-3 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
          <span>{t('result_badge_success')}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 font-['Alexandria',sans-serif]">
          {t('result_title_main')} <span className="text-gradient">{t('result_title_partner')}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-300">
          {t('result_subtitle_desc')} ({profile.country})
        </p>
      </motion.div>

      {/* Main Partner Hero Portrait Card with Slowly Moving Gradient Overlay & Warm Flame Background (User Requests 9 & 10) */}
      <motion.div
        variants={itemVariants}
        className="relative glass-panel-glow rounded-3xl p-5 border border-rose-500/35 mb-6 overflow-hidden"
      >
        {/* Layer 1: Slowly Moving Ambient Color Gradient Overlay (User Request 9) */}
        <motion.div
          className="absolute -inset-10 pointer-events-none opacity-70"
          animate={{
            background: [
              'radial-gradient(circle at 15% 25%, rgba(244, 63, 94, 0.45) 0%, rgba(245, 158, 11, 0.25) 35%, rgba(139, 92, 246, 0.2) 70%, transparent 100%)',
              'radial-gradient(circle at 65% 75%, rgba(236, 72, 153, 0.45) 0%, rgba(249, 115, 22, 0.3) 40%, rgba(168, 85, 247, 0.2) 75%, transparent 100%)',
              'radial-gradient(circle at 35% 85%, rgba(245, 158, 11, 0.4) 0%, rgba(244, 63, 94, 0.35) 45%, rgba(124, 58, 237, 0.2) 80%, transparent 100%)',
              'radial-gradient(circle at 80% 20%, rgba(217, 70, 239, 0.4) 0%, rgba(251, 113, 133, 0.35) 40%, rgba(245, 158, 11, 0.2) 75%, transparent 100%)',
              'radial-gradient(circle at 15% 25%, rgba(244, 63, 94, 0.45) 0%, rgba(245, 158, 11, 0.25) 35%, rgba(139, 92, 246, 0.2) 70%, transparent 100%)',
            ],
            opacity: [0.6, 0.9, 0.65, 0.85, 0.6],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Layer 2: Animated Warm Moving Flame Effect behind card using Framer Motion (User Request 10) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main Organic Flame Orb - Behind Partner Portrait */}
          <motion.div
            className="absolute -top-12 -right-8 w-80 h-80 bg-gradient-to-t from-rose-600/35 via-orange-500/30 to-amber-400/25 blur-3xl rounded-full"
            animate={{
              y: [0, -22, -8, -28, 0],
              x: [0, -16, 12, -18, 0],
              scale: [1, 1.16, 0.94, 1.12, 1],
              opacity: [0.45, 0.8, 0.5, 0.75, 0.45],
              borderRadius: [
                '50% 50% 50% 50%',
                '40% 60% 70% 30% / 40% 40% 60% 60%',
                '60% 40% 30% 70% / 50% 60% 40% 50%',
                '50% 50% 50% 50%',
              ],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Secondary Warm Flame Lick - Bottom Left */}
          <motion.div
            className="absolute -bottom-14 -left-10 w-80 h-80 bg-gradient-to-t from-amber-500/30 via-rose-500/30 to-violet-600/25 blur-3xl rounded-full"
            animate={{
              y: [0, -26, -12, -34, 0],
              x: [0, 18, -14, 20, 0],
              scale: [0.95, 1.18, 1, 1.14, 0.95],
              opacity: [0.35, 0.7, 0.45, 0.75, 0.35],
            }}
            transition={{
              duration: 7.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.6,
            }}
          />

          {/* Upward Floating Candlelight Sparkles & Embers */}
          <motion.div
            className="absolute bottom-4 right-1/4 w-3 h-3 rounded-full bg-amber-400/70 blur-[1px]"
            animate={{
              y: [0, -130],
              x: [0, -18, 12],
              opacity: [0, 0.9, 0],
              scale: [0.5, 1.3, 0.2],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <motion.div
            className="absolute bottom-6 right-1/2 w-2 h-2 rounded-full bg-rose-400/80 blur-[1px]"
            animate={{
              y: [0, -150],
              x: [0, 20, -15],
              opacity: [0, 0.85, 0],
              scale: [0.4, 1.2, 0.2],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 1.4,
            }}
          />
          <motion.div
            className="absolute bottom-2 left-1/3 w-2.5 h-2.5 rounded-full bg-orange-400/75 blur-[1px]"
            animate={{
              y: [0, -115],
              x: [0, -14, 16],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.1, 0.2],
            }}
            transition={{
              duration: 4.1,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 2.3,
            }}
          />
        </div>

        {/* Card Content with Cascading Fade-In for all Elements (User Request 7) */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center gap-6 relative z-10"
        >
          {/* Photorealistic Portrait Container with subtle float, magical pulsing glow, and entrance fade-in */}
          <motion.div
            variants={cardItemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative w-64 h-64 sm:w-64 sm:h-64 shrink-0 group flex items-center justify-center"
          >
            {/* Outer Magical Ambient Pulsing Glow */}
            <motion.div
              className="absolute -inset-3.5 rounded-3xl bg-gradient-to-tr from-rose-500/40 via-fuchsia-500/35 to-violet-600/40 blur-xl pointer-events-none"
              animate={{
                opacity: [0.35, 0.85, 0.35],
                scale: [0.96, 1.04, 0.96],
              }}
              transition={{
                duration: 3.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Inner Concentrated Pulsing Aura Ring */}
            <motion.div
              className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-rose-400/60 via-pink-400/50 to-purple-500/60 blur-md pointer-events-none"
              animate={{
                opacity: [0.45, 0.9, 0.45],
                scale: [0.99, 1.02, 0.99],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.4,
              }}
            />

            {/* Frame with animated glowing border and pulsing shadow */}
            <motion.div
              className="w-full h-full rounded-2xl overflow-hidden border-2 relative z-10"
              animate={{
                borderColor: [
                  'rgba(255, 255, 255, 0.3)',
                  'rgba(251, 113, 133, 0.8)',
                  'rgba(192, 132, 252, 0.65)',
                  'rgba(255, 255, 255, 0.3)',
                ],
                boxShadow: [
                  '0 0 16px -2px rgba(244, 63, 94, 0.35), 0 0 28px -4px rgba(168, 85, 247, 0.25)',
                  '0 0 32px 4px rgba(244, 63, 94, 0.65), 0 0 46px 6px rgba(217, 70, 239, 0.45)',
                  '0 0 16px -2px rgba(244, 63, 94, 0.35), 0 0 28px -4px rgba(168, 85, 247, 0.25)',
                ],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <img
                src={imageUrl}
                alt={partnerName}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500 cursor-pointer"
                onClick={() => setShowLightbox(true)}
              />

              {/* Ultra HD Badge */}
              <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white flex items-center gap-1 shadow-md">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>{t('ultra_hd_badge')}</span>
              </div>

              {/* Zoom hint overlay with Framer Motion hover/tap */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowLightbox(true)}
                className="absolute bottom-2.5 left-2.5 p-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-white transition flex items-center gap-1 text-xs cursor-pointer shadow-md"
                title={language === 'ar' ? 'عرض الصورة بملء الشاشة' : 'View Fullscreen'}
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'تكبير' : 'Zoom'}</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Partner Header Details - Staggered Fade-in Children (User Request 7) */}
          <div className="flex-1 text-center sm:text-right space-y-3">
            {/* Proposed Name Banner */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ scale: 1.04, y: -2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-400/40 shadow-sm cursor-pointer"
            >
              <span className="text-xs text-amber-300 font-bold">{t('proposed_partner_badge')}:</span>
              <span className="font-extrabold text-lg text-white font-['Alexandria',sans-serif]">«{partnerName}»</span>
            </motion.div>

            {/* Archetype Title */}
            <motion.h3
              variants={cardItemVariants}
              className="text-2xl sm:text-3xl font-black text-white font-['Alexandria',sans-serif] leading-tight"
            >
              {translateText(result.partnerArchetype)}
            </motion.h3>

            {/* Compatibility Score Pill with Audit Trigger */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                soundManager.playTap();
                setShowAuditModal(true);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 cursor-pointer shadow-sm transition group"
              title="Click to view mathematical audit"
            >
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
              <span className="text-xs font-bold text-rose-200">
                {t('overall_compatibility_label')}: <strong className="text-white text-base">{result.compatibilityScore}%</strong>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-extrabold text-emerald-300 flex items-center gap-1">
                <Calculator className="w-3 h-3 text-emerald-400" />
                <span>{t('mathematical_audit_btn')}</span>
              </span>
            </motion.div>

            {/* Origin & Attachment & Love Language Details */}
            <motion.div variants={cardItemVariants} className="space-y-1 text-xs text-gray-300">
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <span className="text-rose-400 font-bold">{language === 'ar' ? 'الأصل والمجتمع:' : 'Origin & Culture:'}</span>
                <span className="text-white font-medium">{profile.country} ({profile.ethnicity})</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <span className="text-violet-400 font-bold">{language === 'ar' ? 'نمط الارتباط:' : 'Attachment Style:'}</span>
                <span className="text-gray-200">{translateText(result.attachmentStyle || 'ارتباط آمن وتشاركي')}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <span className="text-yellow-400 font-bold">{language === 'ar' ? 'لغة الحب المشتركة:' : 'Shared Love Language:'}</span>
                <span className="text-yellow-300 font-semibold">{translateText(result.loveLanguage)}</span>
              </div>
            </motion.div>

            {/* Regenerate Option */}
            {onRegenerateImage && (
              <motion.div variants={cardItemVariants}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onRegenerateImage}
                  disabled={isRegeneratingImage}
                  className="text-xs text-gray-400 hover:text-rose-300 transition flex items-center justify-center sm:justify-start gap-1 mt-1 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRegeneratingImage ? 'animate-spin text-rose-400' : ''}`} />
                  <span>{isRegeneratingImage ? t('regenerating_now') : (language === 'ar' ? 'توليد ملامح بديلة' : 'Regenerate Alternative Features')}</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Recharts Interactive Compatibility Visualizations */}
      <motion.div variants={itemVariants}>
        <CompatibilityCharts result={result} profile={profile} partnerName={partnerName} />
      </motion.div>

      {/* Interactive Recharts Emotional & Social Compatibility Heatmap (User Request) */}
      <motion.div variants={itemVariants}>
        <CompatibilityHeatmap result={result} profile={profile} partnerName={partnerName} />
      </motion.div>

      {/* Scientific Metrics Dashboard with Interactive 3D Flip Cards (User Request) */}
      {(() => {
        const compatibilityCardsData: CompatibilityCardData[] = [
          {
            id: 'intellectual',
            title: 'التوافق الفكري',
            categoryNameAr: 'التوافق الفكري والذهني 🧠',
            icon: <GraduationCap className="w-3.5 h-3.5" />,
            score: result.intellectualScore || 96,
            subtitle: 'تقارب الرؤى ونضج الحوار',
            themeColor: 'sky',
            deepAnalysis:
              result.intellectualSynergy ||
              'تناغم ذهني رفيع؛ يتشارك الطرفان أسلوب التفكير العقلاني وتبادل الآراء بإصغاء ناضج مع احترام مساحة الاختلاف البناء.',
            goldenAdvice:
              'حددا وقتاً أسبوعياً لجلسات نقاش هادئة دون هواتف، لتبادل الأفكار الملهمة والتخطيط لمشاريعكما المشتركة.',
            tags: ['#نضج_الحوار', '#تقارب_الرؤى', '#احترام_الفكر'],
          },
          {
            id: 'sociological',
            title: 'التوافق المجتمعي',
            categoryNameAr: 'الترابط الأسري والبيئة 🏛️',
            icon: <Users className="w-3.5 h-3.5" />,
            score: result.sociologicalScore || 95,
            subtitle: 'الترابط الأسري والبيئة',
            themeColor: 'violet',
            deepAnalysis:
              result.socialHarmony ||
              `انسجام وثيق مع عادات وتقاليد المجتمع في (${profile.country})، وتوافق تام حول تقدير الأهل وصلة الرحم وصيانة استقلالية البيت.`,
            goldenAdvice:
              'ابنيا حدوداً صحية تحترم العائلة الكبيرة وتصون في الوقت ذاته خصوصية القرار الزوجي داخل البيت.',
            tags: ['#صلة_الرحم', '#احترام_البيئة', '#خصوصية_البيت'],
          },
          {
            id: 'emotional',
            title: 'الذكاء العاطفي',
            categoryNameAr: 'الاحتواء والأمان النفسي 💖',
            icon: <Heart className="w-3.5 h-3.5" />,
            score: result.emotionalScore || 98,
            subtitle: 'الاحتواء والأمان النفسي',
            themeColor: 'rose',
            deepAnalysis:
              result.detailedMatchReason ||
              `نمط ارتباط آمن (${result.attachmentStyle || 'Secure Attachment'}) يمنح الطرفين شعوراً فورياً بالدفء والطمأنينة والتعبير الصادق عن المشاعر.`,
            goldenAdvice:
              'مارسا "الاحتواء قبل النقاش"؛ أظهرا التقدير والعاطفة أولاً عند أي اختلاف لتذوب التوترات تلقائياً.',
            tags: ['#أمان_نفسي', '#لغة_المودة', '#احتواء_المشاعر'],
          },
          {
            id: 'lifestyle',
            title: 'نمط الحياة',
            categoryNameAr: 'إيقاع اليوم والاستقرار 🧭',
            icon: <Flame className="w-3.5 h-3.5" />,
            score: result.lifestyleScore || 94,
            subtitle: 'الأهداف والاستقرار',
            themeColor: 'amber',
            deepAnalysis:
              'تطابق عملي مريح في إدارة الميزانية، تنظيم الأولويات الحياتية، والتوازن الصحي بين الطموح المهني وأوقات الراحة والسفر.',
            goldenAdvice:
              'اتفقا على خطة مالية واضحة للادخار والمصاريف، واحرصا على قضاء عطلة دورية لتجديد النشاط والبهجة.',
            tags: ['#توازن_الحياة', '#تخطيط_مالي', '#راحة_يومية'],
          },
        ];

        return (
          <motion.div
            variants={itemVariants}
            className="glass-panel rounded-3xl p-4 sm:p-5 border border-white/10 mb-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 text-rose-400 font-extrabold text-sm sm:text-base">
                  <Brain className="w-4 h-4" />
                  <span>مؤشرات التوافق العلمي والاجتماعي المعتمدة:</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
                  <RotateCw className="w-3 h-3 text-rose-400" />
                  <span>اضغط على أي بطاقة لقلبها (Flip) وقراءة التحليل المعمّق والنصائح الذهبية</span>
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleToggleFlipAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-300 text-xs font-bold transition cursor-pointer"
                  title={areAllCardsFlipped ? 'إعادة جميع البطاقات للواجهة الرئيسية' : 'قلب جميع البطاقات لقراءة التحليلات'}
                >
                  <RotateCw className={`w-3.5 h-3.5 text-purple-400 ${areAllCardsFlipped ? 'rotate-180' : ''} transition-transform duration-300`} />
                  <span>{areAllCardsFlipped ? 'إعادة كل البطاقات ↩️' : 'قلب جميع البطاقات 🔄'}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    soundManager.playTap();
                    setShowAuditModal(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-bold transition cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5 text-emerald-400" />
                  <span>لوحة الأرقام 📐</span>
                </motion.button>
              </div>
            </div>

            {/* 3D Flip Compatibility Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {compatibilityCardsData.map((card) => (
                <CompatibilityFlipCard
                  key={card.id}
                  data={card}
                  isFlipped={!!flippedCards[card.id]}
                  onToggleFlip={() => handleToggleFlipCard(card.id)}
                />
              ))}
            </div>
          </motion.div>
        );
      })()}

      {/* Scientific Personality Suite & Discoverable Profile Hub (User Request) */}
      <motion.div
        variants={itemVariants}
        className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-purple-500/15 via-rose-500/15 to-violet-500/15 border border-purple-500/30 mb-6 shadow-xl relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-right">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-rose-500 p-0.5 shadow-lg shadow-purple-500/20 shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-[#120d24] rounded-[14px] flex items-center justify-center">
                <Brain className="w-7 h-7 text-purple-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-black text-sm sm:text-base text-white font-['Alexandria']">
                  تعميق تحليلك عبر قسم مقاييس الشخصية العلمي ولوحة ملفك الشخصي
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  صدق وثبات إحصائي 🔬
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-1 max-w-2xl leading-relaxed">
                خض اختبارات العوامل الخمسة (Big Five)، ومينيسوتا (MMPI)، ورورشاخ الإسقاطي، ونمط الارتباط البشري، وانشر نتائجك في السوشيل ميديا أو اكتشف من يشبهك ويتوافق معك للتواصل وبناء شراكة حقيقية.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 justify-end w-full md:w-auto">
            {onOpenPsychologyTests && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  soundManager.playTap();
                  onOpenPsychologyTests();
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition shadow-md shadow-purple-500/20 cursor-pointer flex items-center gap-1.5"
              >
                <span>خوض اختبار نفسي معتمد 🔬</span>
              </motion.button>
            )}

            {onOpenUserDashboard && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  soundManager.playTap();
                  onOpenUserDashboard();
                }}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 border border-white/15 font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <span>لوحة ملفي والمتوافقين للتواصل 👤</span>
              </motion.button>
            )}

            {onOpenCoupleInvite && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  soundManager.playTap();
                  onOpenCoupleInvite();
                }}
                className="px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-300 font-bold text-xs transition cursor-pointer flex items-center gap-1"
              >
                <span>دعوة شريك 💑</span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Tabs Breakdown with Smooth Content Switcher */}
      <motion.div
        variants={itemVariants}
        className="glass-panel rounded-3xl p-5 border border-white/10 mb-6"
      >
        {/* Tab Headers with Framer Motion hover & tap */}
        <div className="grid grid-cols-5 gap-1 p-1 rounded-2xl bg-black/40 border border-white/10 mb-5 overflow-x-auto">
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundManager.playTab();
              setActiveTab('profile');
            }}
            className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-bold transition text-center cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? 'الاسم والملامح' : 'Name & Profile'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundManager.playTab();
              setActiveTab('intellect');
            }}
            className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-bold transition text-center cursor-pointer ${
              activeTab === 'intellect'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? 'التوافق الفكري' : 'Intellectual Fit'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundManager.playTab();
              setActiveTab('social');
            }}
            className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-bold transition text-center cursor-pointer ${
              activeTab === 'social'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? 'التوافق المجتمعي' : 'Social Fit'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundManager.playTab();
              setActiveTab('traits');
            }}
            className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-bold transition text-center cursor-pointer ${
              activeTab === 'traits'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? 'السمات الجوهرية' : 'Core Traits'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              soundManager.playTab();
              setActiveTab('advice');
            }}
            className={`py-2 px-1 rounded-xl text-[11px] sm:text-xs font-bold transition text-center cursor-pointer ${
              activeTab === 'advice'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? 'الوصية الزوجية' : 'Couple Advice'}
          </motion.button>
        </div>

        {/* Tab Contents with AnimatePresence */}
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-4"
            >
              <motion.div
                whileHover={{ scale: 1.015, y: -2 }}
                className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/25 space-y-1.5 transition cursor-pointer"
              >
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Quote className="w-4 h-4" />
                  <span>دلالة الاسم المقترح: «{partnerName}»</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                  {result.nameMeaning}
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.015, y: -2 }}
                className="space-y-2 transition cursor-pointer"
              >
                <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                  <Eye className="w-4 h-4" />
                  <span>المواصفات الجمالية والملامح البشرية الواقعية:</span>
                </div>
                <p className="text-sm text-gray-200 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
                  {result.visualDescription}
                </p>
              </motion.div>

              <motion.blockquote
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm italic text-rose-200 text-center leading-relaxed font-serif transition cursor-pointer"
              >
                {result.partnerVibeQuote}
              </motion.blockquote>
            </motion.div>
          )}

          {activeTab === 'intellect' && (
            <motion.div
              key="intellect"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <GraduationCap className="w-4 h-4" />
                <span>دراسة التوافق الفكري والقرارات المشتركة:</span>
              </div>
              <motion.p
                whileHover={{ scale: 1.015 }}
                className="text-sm text-gray-200 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10 cursor-pointer"
              >
                {result.intellectualSynergy || result.detailedMatchReason}
              </motion.p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <motion.div
                  whileHover={{ scale: 1.025, y: -2 }}
                  className="bg-sky-500/10 p-3 rounded-xl border border-sky-500/20 cursor-pointer transition"
                >
                  <strong className="text-sky-300 block mb-1">أسلوب الحوار:</strong>
                  <span className="text-gray-300">عقلاني هادئ قائم على الإقناع دون فرض وصاية</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.025, y: -2 }}
                  className="bg-sky-500/10 p-3 rounded-xl border border-sky-500/20 cursor-pointer transition"
                >
                  <strong className="text-sky-300 block mb-1">دعم الطموح المهني:</strong>
                  <span className="text-gray-300">تشجيع متواصل وفخر متبادل بالإنجازات الفردية</span>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'social' && (
            <motion.div
              key="social"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-violet-400 font-bold text-sm">
                <Users className="w-4 h-4" />
                <span>التوافق المجتمعي والعائلي ومحيط البيئة:</span>
              </div>
              <motion.p
                whileHover={{ scale: 1.015 }}
                className="text-sm text-gray-200 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10 cursor-pointer"
              >
                {result.socialHarmony || result.detailedMatchReason}
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-xs text-gray-200 space-y-1 cursor-pointer transition"
              >
                <div className="font-bold text-violet-300">الانسجام مع البيئة الأسرية في ({profile.country}):</div>
                <p className="text-gray-300">
                  يحقق التوازن الذهبي بين بر الوالدين وتوطيد الروابط الأسرية الدافئة، مع صيانة قدسية بيت الزوجية وخصوصية أسراره التامة.
                </p>
              </motion.div>
            </motion.div>
          )}

          {activeTab === 'traits' && (
            <motion.div
              key="traits"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <Award className="w-4 h-4" />
                <span>الأعمدة الأربعة للشخصية والتوافق السلوكي:</span>
              </div>
              <div className="space-y-2.5">
                {result.partnerTraits.map((trait, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02, x: -3 }}
                    whileTap={{ scale: 0.985 }}
                    className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 space-y-1.5 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-bold text-white">{trait.title}</span>
                      <span className="font-extrabold text-rose-400 font-mono">{trait.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-l from-rose-500 to-violet-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${trait.percentage}%` }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                      />
                    </div>
                    <p className="text-[11px] text-gray-400">{trait.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'advice' && (
            <motion.div
              key="advice"
              variants={tabVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <Heart className="w-4 h-4" />
                <span>الوصية الذهبية لاستدامة المودة والرحمة:</span>
              </div>
              <motion.div
                whileHover={{ scale: 1.015, y: -2 }}
                className="p-4 rounded-2xl bg-gradient-to-l from-rose-500/10 to-violet-600/10 border border-rose-500/20 text-sm leading-relaxed text-gray-200 cursor-pointer"
              >
                {result.romanticAdvice}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 cursor-pointer"
              >
                💡 <strong>تلميح اجتماعي:</strong> شارك هذه النتيجة مع عائلتك أو أصدقائك المقربين لمعرفة رأيهم في الاسم المقترح «{partnerName}» والمواصفات!
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Empirical 6-Subscale Scientific Compatibility Matrix (Gottman, Bowlby/ECR-R, Sternberg, Bowen/Schwartz, Klontz, Janis/Mann) */}
      {effectiveBreakdown.scientificSubscales && effectiveBreakdown.scientificSubscales.length > 0 && (
        <motion.div
          variants={itemVariants}
          className="glass-panel rounded-3xl p-5 sm:p-6 border border-emerald-500/30 mb-6 bg-slate-950/85 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-bold text-emerald-300">
                <Calculator className="w-3.5 h-3.5" />
                <span>تقييم التوافق المبني على أسس علمية محكّمة (25 بنداً قياسياً)</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white font-['Alexandria']">
                مصفوفة المقاييس السيكومترية الستة للتوافق الزواجي والأسري
              </h3>
              <p className="text-xs text-slate-300">
                نتائج حقيقية مستخرجة مباشرةً من إجاباتك دون أي تخمين عشوائي أو نصوص دعائية، مع إمكانية مراجعة سجل النقاط الخام أو مقارنة إجاباتك مع شريك فعلي.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleExportScientificPDF}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md"
              >
                <FileDown className="w-4 h-4" />
                <span>تحميل التقرير العلمي (PDF)</span>
              </button>
              {onOpenCoupleInvite && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    onOpenCoupleInvite();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-rose-600/25 hover:bg-rose-600/35 border border-rose-500/40 text-rose-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Users className="w-4 h-4 text-rose-400" />
                  <span>التقييم العلمي المزدوج لشريكين</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {effectiveBreakdown.scientificSubscales.map((sub) => (
              <div
                key={sub.id}
                className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between space-y-2.5"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold text-white">{sub.titleAr}</span>
                    <span className="text-sm font-black font-mono text-emerald-400">{sub.score}%</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {sub.scientistAr} • {sub.theoryNameEn}
                  </div>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-l from-emerald-400 to-teal-500 rounded-full"
                    style={{ width: `${sub.score}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-bold">
                    {sub.score >= 85 ? 'توافق علمي مرتفع جداً' : sub.score >= 72 ? 'توافق متزن ومثمر' : 'قابل للتطوير التشاركي'}
                  </span>
                  <span className="text-slate-400 font-mono">
                    البنود: #{sub.questionsUsed.join(', #')}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed">{sub.analysisAr}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Real Sociocultural, Human Values & Behavioral Science Matrix */}
      <motion.div variants={itemVariants} className="mb-6">
        <SocioculturalScienceSection partnerName={partnerName} profile={profile} />
      </motion.div>

      {/* Fast Compatibility Calculator & Real Chat Cadence Speedometer */}
      <motion.div variants={itemVariants} className="mb-6">
        <FastCompatibilityCadenceSection
          partnerName={partnerName}
          profile={profile}
          onOpenLiveChat={onOpenLiveChat}
          onOpenBlindDate={onOpenBlindDate}
        />
      </motion.div>

      {/* The Blind Date Show Interactive TV Experience (User Request) */}
      {onOpenBlindDate && (
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="relative glass-panel rounded-3xl p-5 border border-rose-500/40 mb-6 overflow-hidden bg-gradient-to-r from-purple-950/60 via-slate-950 to-rose-950/60 shadow-xl shadow-rose-950/30"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-right">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-600 to-purple-600 flex items-center justify-center text-3xl shadow-lg shadow-rose-500/30 text-white">
                  💬
                </div>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-400 rounded-full border-2 border-slate-950 animate-ping" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-400 rounded-full border-2 border-slate-950" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h4 className="text-base sm:text-lg font-black text-white font-['Alexandria']">
                    The Blind Date
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-[10px] text-rose-300 font-extrabold">
                    جلسة التوافق التفاعلية ✨
                  </span>
                </div>
                <p className="text-xs text-gray-300 max-w-md leading-relaxed">
                  خض تجربة The Blind Date التفاعلية: 4 مستويات أسئلة متبادلة (شخصية، اجتماعية، علمية، طموحات) مع تقييم إجابات الطرفين، ثم لحظة الحسم والدردشة المفتوحة!
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                soundManager.playTap();
                onOpenBlindDate();
              }}
              className="py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:opacity-95 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-rose-500/25 transition cursor-pointer shrink-0 whitespace-nowrap"
            >
              <span>بدء The Blind Date الآن 💬</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Real-Time Live Matching Chat with Online Users (User Request) */}
      {onOpenLiveChat && (
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="relative glass-panel rounded-3xl p-5 border border-emerald-500/35 mb-6 overflow-hidden bg-gradient-to-r from-emerald-950/40 via-slate-950 to-teal-950/40 shadow-xl shadow-emerald-950/20"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-right">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30 text-white">
                  📡
                </div>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-ping" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-950" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h4 className="text-base sm:text-lg font-black text-white font-['Alexandria']">
                    دردشة حية مع أشخاص متواجدين في الوقت نفسه
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[10px] text-emerald-300 font-bold">
                    رادار حي 🟢
                  </span>
                </div>
                <p className="text-xs text-gray-300 max-w-md leading-relaxed">
                  إذا تواجد الآن مستخدم آخر يتطابق معك في المواصفات ورغبة الشريك، يتيح لك النظام فتح محادثة فورية ومجهولة وآمنة للتواصل المباشر.
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                soundManager.playTap();
                onOpenLiveChat();
              }}
              className="py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition cursor-pointer shrink-0"
            >
              <span>فتح رادار الدردشة والمطابقة 🟢</span>
              <span className="text-base">💬</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Smart Recommendations Section (Articles, Complementary Tests & Scientific Disclaimer) */}
      <motion.div variants={itemVariants} className="mb-6">
        <SmartRecommendationsSection
          result={result}
          profile={profile}
          onOpenPsychologyTests={onOpenPsychologyTests}
          onOpenIntelligenceTests={onOpenIntelligenceTests}
          onOpenArticles={onOpenArticles}
          onOpenNovels={onOpenNovels}
        />
      </motion.div>

      {/* Social Media Sharing Suite */}
      <motion.div
        variants={itemVariants}
        className="glass-panel p-5 rounded-3xl border border-white/10 mb-6 space-y-4"
      >
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 text-rose-400 font-extrabold text-base mb-1">
            <Share2 className="w-4 h-4" />
            <span>مشاركة وتصدير التقرير العلمي للتوافق</span>
          </div>
          <p className="text-xs text-gray-300">
            بطاقة سيكومترية وتقرير PDF علمي موثق يتضمن مؤشرات التوافق الستة والنتائج الإحصائية
          </p>
        </div>

        {/* Primary Social Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNativeShare}
            disabled={isGeneratingShareCard}
            className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-violet-600 hover:opacity-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30 transition cursor-pointer disabled:opacity-60"
          >
            <Share2 className="w-4 h-4" />
            <span>{isGeneratingShareCard ? 'جاري تجهيز البطاقة...' : 'مشاركة بطاقة النتيجة'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadCard}
            disabled={isGeneratingShareCard}
            className="py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-60"
          >
            <Download className="w-4 h-4 text-rose-400" />
            <span>تحميل البطاقة كصورة HD</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExportScientificPDF}
            className="py-3.5 px-4 rounded-2xl bg-emerald-600/25 hover:bg-emerald-600/35 border border-emerald-500/40 text-emerald-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-emerald-400" />
            <span>تصدير التقرير العلمي PDF</span>
          </motion.button>
        </div>

        {/* Secondary Quick Share (Iframe-safe links) */}
        <div className="flex items-center justify-center gap-3 pt-2 border-t border-white/10">
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playTap()}
            className="p-3 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 flex items-center gap-2 text-xs font-bold transition cursor-pointer"
            title="مشاركة في واتساب"
          >
            <MessageCircle className="w-4 h-4" />
            <span>واتساب</span>
          </a>

          <a
            href={twitterShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playTap()}
            className="p-3 rounded-2xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/30 text-sky-400 flex items-center gap-2 text-xs font-bold transition cursor-pointer"
            title="مشاركة في منصة إكس"
          >
            <Twitter className="w-4 h-4" />
            <span>منصة X</span>
          </a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopyLink}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 flex items-center gap-2 text-xs font-medium transition cursor-pointer"
            title="نسخ الرابط"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>نسخ الرابط</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Restart */}
      <motion.div variants={itemVariants} className="text-center pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            soundManager.playPageTransition();
            onRestart();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white text-sm font-semibold transition cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-rose-400" />
          <span>إجراء دراسة توافق جديدة لشريك آخر أو بلد مختلف</span>
        </motion.button>
      </motion.div>

      {/* Lightbox Modal */}
      <ImageViewerModal
        imageUrl={imageUrl}
        title={`شريك الحياة: ${partnerName}`}
        subtitle={`${result.partnerArchetype} • ${profile.country}`}
        isOpen={showLightbox}
        onClose={() => setShowLightbox(false)}
        onDownload={handleDownloadCard}
        onShare={handleNativeShare}
      />

      {/* Privacy Settings Modal */}
      <PrivacySettingsModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        onPinConfigured={(isLockedNow) => {
          const enabled = isPinLockEnabled();
          setPinEnabled(enabled);
          if (isLockedNow && onLockResult) {
            onLockResult();
          }
        }}
      />

      {/* Real Calculation & Deterministic Scoring Audit Modal */}
      <RealCalculationAuditModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
        scoringBreakdown={effectiveBreakdown}
        partnerName={partnerName}
      />
    </motion.div>
  );
};
