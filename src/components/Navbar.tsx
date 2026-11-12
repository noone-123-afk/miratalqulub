import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Volume2,
  VolumeX,
  RotateCcw,
  Cloud,
  Menu,
  X,
  BookOpen,
  ShieldCheck,
  DollarSign,
  Sun,
  Moon,
  LogIn,
  UserCheck,
  Languages,
  Crown,
  ChevronDown,
  MessageCircle,
  BarChart3,
  Mail,
  Brain,
  Compass,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  User,
  FileText,
  Feather,
  Cpu,
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { PWAInstallModal } from './PWAInstallModal';
import { WebsiteTabKey } from './WebsiteSectionsModal';
import { useAppTheme } from '../utils/theme';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { purgeAllUserDataPermanently } from '../services/userHistoryService';
import { OFFICIAL_LOGO_URL } from '../utils/logoAsset';

export interface NavbarProps {
  onReset?: () => void;
  showReset?: boolean;
  onOpenLiveChat?: () => void;
  onOpenBlindDate?: () => void;
  onOpenDomainHosting?: () => void;
  onOpenWebsiteSection?: (tab?: WebsiteTabKey) => void;
  onOpenAdSense?: () => void;
  onOpenAuth?: () => void;
  onOpenHistory?: () => void;
  onOpenPsychologyTests?: () => void;
  onOpenIntelligenceTests?: () => void;
  onOpenOnboardingWizard?: () => void;
  onOpenUserDashboard?: () => void;
  onOpenCoupleInvite?: () => void;
  onOpenArticles?: () => void;
  onOpenNovels?: () => void;
  onOpenContactFeedback?: () => void;
  onOpenAnalytics?: () => void;
  onNavigatePage?: (page: string) => void;
  onDataDeleted?: () => void;
  currentPage?: string;
}

type ActiveDropdown = 'self' | 'compatibility' | 'oasis' | 'profile' | 'owner' | null;

export const Navbar: React.FC<NavbarProps> = ({
  onReset,
  showReset,
  onOpenLiveChat,
  onOpenBlindDate,
  onOpenDomainHosting,
  onOpenWebsiteSection,
  onOpenAdSense,
  onOpenAuth,
  onOpenHistory,
  onOpenPsychologyTests,
  onOpenIntelligenceTests,
  onOpenOnboardingWizard,
  onOpenUserDashboard,
  onOpenCoupleInvite,
  onOpenArticles,
  onOpenNovels,
  onOpenContactFeedback,
  onOpenAnalytics,
  onNavigatePage,
  onDataDeleted,
  currentPage = 'home',
}) => {
  const { user, isOwner } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const [theme, toggleTheme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';

  const [soundOn, setSoundOn] = useState(true);
  const [showPwaModal, setShowPwaModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);

  // Permanent Data Deletion confirmation state
  const [confirmDeleteStep, setConfirmDeleteStep] = useState(false);
  const [isDeletingData, setIsDeletingData] = useState(false);
  const [deleteSuccessToast, setDeleteSuccessToast] = useState(false);

  const navContainerRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setConfirmDeleteStep(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSound = () => {
    soundManager.enabled = !soundOn;
    setSoundOn(!soundOn);
    if (!soundOn) {
      soundManager.playTap();
    }
  };

  const handleNavAction = (callback?: () => void) => {
    soundManager.playTap();
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setConfirmDeleteStep(false);
    if (callback) callback();
  };

  const toggleDropdown = (key: ActiveDropdown) => {
    soundManager.playTap();
    setConfirmDeleteStep(false);
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  const handlePermanentDeleteData = async () => {
    soundManager.playTap();
    setIsDeletingData(true);
    try {
      await purgeAllUserDataPermanently(user);
      setIsDeletingData(false);
      setConfirmDeleteStep(false);
      setDeleteSuccessToast(true);
      if (onDataDeleted) onDataDeleted();
      if (onReset) onReset();
      setTimeout(() => {
        setDeleteSuccessToast(false);
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }, 2800);
    } catch {
      setIsDeletingData(false);
    }
  };

  const isSelfActive = currentPage === 'personality-tests';
  const isCompatibilityActive = currentPage === 'home';
  const isOasisActive =
    currentPage === 'articles' ||
    currentPage === 'novels' ||
    currentPage === 'novel-detail' ||
    currentPage === 'chapter-reader' ||
    currentPage === 'methodology';

  return (
    <>
      <header
        ref={navContainerRef}
        dir={isAr ? 'rtl' : 'ltr'}
        className={`sticky top-0 z-40 w-full border-b px-3 sm:px-6 py-2.5 backdrop-blur-xl transition-colors duration-300 ${
          isLight
            ? 'bg-white/95 border-slate-200/90 text-slate-900 shadow-sm'
            : 'bg-[#0b0e17]/90 border-white/10 text-slate-100 shadow-lg shadow-black/20'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* 1. Brand Logo & Identity */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            onClick={() =>
              handleNavAction(() => {
                if (onNavigatePage) onNavigatePage('home');
                if (onReset) onReset();
              })
            }
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-violet-600 p-0.5 shadow-md shadow-rose-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
              <div
                className={`w-full h-full rounded-[14px] flex items-center justify-center relative overflow-hidden ${
                  isLight ? 'bg-slate-950' : 'bg-[#0b0e17]'
                }`}
              >
                <img
                  src={OFFICIAL_LOGO_URL}
                  alt={isAr ? 'شعار مرآة القلوب' : 'Mirror of Hearts Official Logo'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[13px]"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1
                  className={`font-extrabold text-sm sm:text-base tracking-wide font-['Alexandria',sans-serif] ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {t('brand_name')}
                </h1>
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0" />
              </div>
              <p
                className={`text-[10px] hidden sm:block ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                {t('brand_tagline')}
              </p>
            </div>
          </div>

          {/* 2. Desktop Central Navigation: 3 Clear Primary Pathways */}
          <nav
            aria-label={isAr ? 'المسارات الرئيسية للموقع' : 'Primary Site Navigation Pathways'}
            className="hidden lg:flex items-center gap-2 text-xs font-bold"
          >
            {/* ================= PATHWAY 1: استكشف ذاتك (Explore Yourself) ================= */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('self')}
                aria-expanded={activeDropdown === 'self'}
                className={`px-3.5 py-2 rounded-xl border transition flex items-center gap-2 cursor-pointer ${
                  isSelfActive || activeDropdown === 'self'
                    ? isLight
                      ? 'bg-purple-50 border-purple-300 text-purple-900 shadow-sm'
                      : 'bg-purple-500/20 border-purple-400/50 text-purple-200 shadow-sm'
                    : isLight
                    ? 'bg-slate-50/80 hover:bg-purple-50/60 border-slate-200/90 text-slate-700 hover:text-purple-800'
                    : 'bg-white/[0.03] hover:bg-purple-500/10 border-white/10 text-slate-200 hover:text-purple-200'
                }`}
              >
                <Brain className="w-4 h-4 text-purple-500 shrink-0" />
                <span>{isAr ? '١. استكشف ذاتك' : '1. Explore Yourself'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    activeDropdown === 'self' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'self' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.16 }}
                    className={`absolute top-full mt-2 w-80 rounded-2xl border p-2.5 shadow-2xl z-50 space-y-1.5 ${
                      isAr ? 'right-0 text-right' : 'left-0 text-left'
                    } ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-800'
                        : 'bg-slate-950/95 border-purple-500/35 text-slate-100 backdrop-blur-xl'
                    }`}
                  >
                    <div
                      className={`px-3 py-1.5 text-[11px] font-extrabold border-b ${
                        isLight
                          ? 'border-slate-100 text-purple-700'
                          : 'border-white/10 text-purple-300'
                      }`}
                    >
                      {isAr
                        ? 'المسار الأول: مقاييس الشخصية واختبارات الذكاء'
                        : 'Pathway 1: Personality Scales & Intelligence Labs'}
                    </div>

                    {/* Item 1: MBTI & Big Five Page */}
                    <button
                      type="button"
                      onClick={() =>
                        handleNavAction(() =>
                          onNavigatePage
                            ? onNavigatePage('personality-tests')
                            : onOpenPsychologyTests && onOpenPsychologyTests()
                        )
                      }
                      className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer ${
                        isLight ? 'hover:bg-purple-50' : 'hover:bg-white/10'
                      }`}
                    >
                      <Brain className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-xs">
                          {isAr
                            ? 'مختبر مقاييس الشخصية (MBTI & Big Five)'
                            : 'Personality Lab (MBTI & Big Five / OCEAN)'}
                        </div>
                        <div
                          className={`text-[11px] font-normal mt-0.5 ${
                            isLight ? 'text-slate-500' : 'text-slate-400'
                          }`}
                        >
                          {isAr
                            ? 'تحليل الأنماط الـ16 والعوامل الخمسة الكبرى موثق بمراجع APA'
                            : '16 Jungian archetypes & Five-Factor model with APA citations'}
                        </div>
                      </div>
                    </button>

                    {/* Item 2: Intelligence Tests Modal */}
                    {onOpenIntelligenceTests && (
                      <button
                        type="button"
                        onClick={() => handleNavAction(onOpenIntelligenceTests)}
                        className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer ${
                          isLight ? 'hover:bg-cyan-50' : 'hover:bg-white/10'
                        }`}
                      >
                        <Cpu className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-xs">
                            {isAr
                              ? 'مختبر اختبارات الذكاء والقدرات (IQ & EQ)'
                              : 'Multiple Intelligences & IQ/EQ Batteries'}
                          </div>
                          <div
                            className={`text-[11px] font-normal mt-0.5 ${
                              isLight ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            {isAr
                              ? 'ذكاءات جاردنر الـ9، مصفوفات رافين، والذكاء العاطفي (135 سؤالاً)'
                              : 'Gardner 9 MI, Raven Progressive Matrices & Emotional Intelligence'}
                          </div>
                        </div>
                      </button>
                    )}

                    {/* Item 3: Specialized Clinical Psychometrics (16PF, EPQ, Attachment) */}
                    {onOpenPsychologyTests && (
                      <button
                        type="button"
                        onClick={() => handleNavAction(onOpenPsychologyTests)}
                        className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer ${
                          isLight ? 'hover:bg-indigo-50' : 'hover:bg-white/10'
                        }`}
                      >
                        <Compass className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-xs">
                            {isAr
                              ? 'المقاييس المتخصصة (كاتل 16PF وآيزنك والتعلق)'
                              : 'Specialized Scales (Cattell 16PF, EPQ & Attachment)'}
                          </div>
                          <div
                            className={`text-[11px] font-normal mt-0.5 ${
                              isLight ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            {isAr
                              ? '8 مقاييس إكلينيكية بدرجات معيارية Sten وتصدير PDF فوري'
                              : '8 clinical scales with normative Sten scores & direct PDF export'}
                          </div>
                        </div>
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ================= PATHWAY 2: اكتشف التوافق (Discover Compatibility) ================= */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('compatibility')}
                aria-expanded={activeDropdown === 'compatibility'}
                className={`px-3.5 py-2 rounded-xl border transition flex items-center gap-2 cursor-pointer ${
                  isCompatibilityActive || activeDropdown === 'compatibility'
                    ? isLight
                      ? 'bg-rose-50 border-rose-300 text-rose-900 shadow-sm'
                      : 'bg-rose-500/20 border-rose-400/50 text-rose-200 shadow-sm'
                    : isLight
                    ? 'bg-slate-50/80 hover:bg-rose-50/60 border-slate-200/90 text-slate-700 hover:text-rose-800'
                    : 'bg-white/[0.03] hover:bg-rose-500/10 border-white/10 text-slate-200 hover:text-rose-200'
                }`}
              >
                <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{isAr ? '٢. اكتشف التوافق' : '2. Discover Compatibility'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    activeDropdown === 'compatibility' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'compatibility' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.16 }}
                    className={`absolute top-full mt-2 w-80 rounded-2xl border p-2.5 shadow-2xl z-50 space-y-1.5 ${
                      isAr ? 'right-0 text-right' : 'left-0 text-left'
                    } ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-800'
                        : 'bg-slate-950/95 border-rose-500/35 text-slate-100 backdrop-blur-xl'
                    }`}
                  >
                    <div
                      className={`px-3 py-1.5 text-[11px] font-extrabold border-b ${
                        isLight
                          ? 'border-slate-100 text-rose-700'
                          : 'border-white/10 text-rose-300'
                      }`}
                    >
                      {isAr
                        ? 'المسار الثاني: كاشف التوافق و The Blind Date'
                        : 'Pathway 2: Compatibility Detector & The Blind Date'}
                    </div>

                    {/* Item 1: Compatibility Detector (Home Calculator) */}
                    <button
                      type="button"
                      onClick={() =>
                        handleNavAction(() => {
                          if (onNavigatePage) onNavigatePage('home');
                          if (onReset) onReset();
                        })
                      }
                      className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer ${
                        isLight ? 'hover:bg-rose-50' : 'hover:bg-white/10'
                      }`}
                    >
                      <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-xs">
                          {isAr
                            ? 'كاشف التوافق الفكري والعاطفي (حاسبة التوافق)'
                            : 'Partner Compatibility Detector & Calculator'}
                        </div>
                        <div
                          className={`text-[11px] font-normal mt-0.5 ${
                            isLight ? 'text-slate-500' : 'text-slate-400'
                          }`}
                        >
                          {isAr
                            ? 'خوارزمية التوافق السيكومتري عبر 4 أبعاد مع تحليل الشريك'
                            : '4-dimension psychometric compatibility engine & partner synthesis'}
                        </div>
                      </div>
                    </button>

                    {/* Item 2: The Blind Date */}
                    {onOpenBlindDate && (
                      <button
                        type="button"
                        onClick={() => handleNavAction(onOpenBlindDate)}
                        className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer ${
                          isLight ? 'hover:bg-pink-50' : 'hover:bg-white/10'
                        }`}
                      >
                        <MessageCircle className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-xs">
                            {isAr
                              ? 'تجربة اللقاء الأعمى التفاعلي (The Blind Date)'
                              : 'The Blind Date Interactive Experience'}
                          </div>
                          <div
                            className={`text-[11px] font-normal mt-0.5 ${
                              isLight ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            {isAr
                              ? 'حوار فكري متدرج خلف الستار لاختبار انسجام القيم والروح'
                              : 'Progressive curtain-drop dialogue to test intellectual & value resonance'}
                          </div>
                        </div>
                      </button>
                    )}

                    {/* Item 3: Couple Compatibility Invite */}
                    {onOpenCoupleInvite && (
                      <button
                        type="button"
                        onClick={() => handleNavAction(onOpenCoupleInvite)}
                        className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer ${
                          isLight ? 'hover:bg-rose-50' : 'hover:bg-white/10'
                        }`}
                      >
                        <UserCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-xs">
                            {isAr
                              ? 'اختبار التوافق المزدوج مع الشريك (Couple Invite)'
                              : 'Dual Couple Compatibility Assessment'}
                          </div>
                          <div
                            className={`text-[11px] font-normal mt-0.5 ${
                              isLight ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            {isAr
                              ? 'أنشئ رابط دعوة خاصاً لمقارنة إجاباتك مع شريكك مباشرة'
                              : 'Generate a private invite link to compare responses with your partner'}
                          </div>
                        </div>
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ================= PATHWAY 3: هدية الواحة المعرفية والمقالات والروايات ================= */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('oasis')}
                aria-expanded={activeDropdown === 'oasis'}
                className={`px-3.5 py-2 rounded-xl border transition flex items-center gap-2 cursor-pointer ${
                  isOasisActive || activeDropdown === 'oasis'
                    ? isLight
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
                      : 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200 shadow-sm'
                    : isLight
                    ? 'bg-slate-50/80 hover:bg-emerald-50/60 border-slate-200/90 text-slate-700 hover:text-emerald-800'
                    : 'bg-white/[0.03] hover:bg-emerald-500/10 border-white/10 text-slate-200 hover:text-emerald-200'
                }`}
              >
                <BookOpen className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  {isAr
                    ? '٣. هدية الواحة المعرفية والمقالات والروايات'
                    : '3. Knowledge Oasis: Articles & Novels'}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    activeDropdown === 'oasis' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'oasis' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.16 }}
                    className={`absolute top-full mt-2 w-84 rounded-2xl border p-2.5 shadow-2xl z-50 space-y-1.5 ${
                      isAr ? 'right-0 text-right' : 'left-0 text-left'
                    } ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-800'
                        : 'bg-slate-950/95 border-emerald-500/35 text-slate-100 backdrop-blur-xl'
                    }`}
                  >
                    <div
                      className={`px-3 py-1.5 text-[11px] font-extrabold border-b ${
                        isLight
                          ? 'border-slate-100 text-emerald-800'
                          : 'border-white/10 text-emerald-300'
                      }`}
                    >
                      {isAr
                        ? 'المسار الثالث: الواحة المعرفية، الأبحاث المحكّمة، والروايات'
                        : 'Pathway 3: Knowledge Oasis, Peer-Reviewed Research & Novels'}
                    </div>

                    {/* Item 1: Articles & Academic Research Encyclopedia */}
                    <button
                      type="button"
                      onClick={() =>
                        handleNavAction(() =>
                          onNavigatePage
                            ? onNavigatePage('articles')
                            : onOpenArticles && onOpenArticles()
                        )
                      }
                      className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer ${
                        isLight ? 'hover:bg-emerald-50' : 'hover:bg-white/10'
                      }`}
                    >
                      <BookOpen className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-xs">
                          {isAr
                            ? 'موسوعة المقالات والأبحاث الأكاديمية المحكّمة'
                            : 'Clinical Articles & Peer-Reviewed Research Encyclopedia'}
                        </div>
                        <div
                          className={`text-[11px] font-normal mt-0.5 ${
                            isLight ? 'text-slate-500' : 'text-slate-400'
                          }`}
                        >
                          {isAr
                            ? '9 مقالات سردية إكلينيكية و4 أوراق بحثية محكّمة بصيغة APA'
                            : '9 clinical narrative articles & 4 peer-reviewed APA research papers'}
                        </div>
                      </div>
                    </button>

                    {/* Item 2: Novels Directory Page */}
                    <button
                      type="button"
                      onClick={() =>
                        handleNavAction(() =>
                          onNavigatePage
                            ? onNavigatePage('novels')
                            : onOpenNovels && onOpenNovels()
                        )
                      }
                      className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer ${
                        isLight ? 'hover:bg-amber-50' : 'hover:bg-white/10'
                      }`}
                    >
                      <Feather className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-xs">
                          {isAr
                            ? 'مكتبة الروايات الأدبية والتحقيقات والخيال العلمي'
                            : 'Literary, Sci-Fi & Forensic Mystery Novels Library'}
                        </div>
                        <div
                          className={`text-[11px] font-normal mt-0.5 ${
                            isLight ? 'text-slate-500' : 'text-slate-400'
                          }`}
                        >
                          {isAr
                            ? 'في بيتنا ياسمين • شيفرة الأندرويد • ظلال لا تترك أثراً والمزيد'
                            : 'Multi-genre full novels with reader mode, time/place & commentary'}
                        </div>
                      </div>
                    </button>

                    {/* Item 3: Scientific Methodology & Sources */}
                    {onNavigatePage && (
                      <button
                        type="button"
                        onClick={() => handleNavAction(() => onNavigatePage('methodology'))}
                        className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer ${
                          isLight ? 'hover:bg-sky-50' : 'hover:bg-white/10'
                        }`}
                      >
                        <FileText className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-xs">
                            {isAr
                              ? 'المنهجية العلمية والمصادر الأكاديمية'
                              : 'Scientific Methodology & Academic Sources'}
                          </div>
                          <div
                            className={`text-[11px] font-normal mt-0.5 ${
                              isLight ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            {isAr
                              ? 'توثيق النماذج السيكومترية، الخصوصية، وأخلاقيات البحث'
                              : 'Documentation of psychometric models, privacy, and research ethics'}
                          </div>
                        </div>
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* 3. Right Side Controls: Prominent "ملفي" (My Profile & Data Deletion), Lang, Theme, Owner */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* ================= PROMINENT "ملفي" (MY PROFILE & DATA CONTROL) BUTTON ================= */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('profile')}
                aria-expanded={activeDropdown === 'profile'}
                className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  activeDropdown === 'profile'
                    ? 'bg-gradient-to-r from-violet-600 to-rose-600 text-white border-violet-400 shadow-md'
                    : isLight
                    ? 'bg-violet-50 hover:bg-violet-100 border-violet-300 text-violet-900'
                    : 'bg-gradient-to-r from-violet-500/20 to-rose-500/20 hover:from-violet-500/30 hover:to-rose-500/30 border-violet-400/50 text-violet-100'
                }`}
              >
                <User className="w-3.5 h-3.5 shrink-0" />
                <span className="font-['Alexandria',sans-serif]">
                  {isAr ? 'ملفي' : 'My Profile'}
                </span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    activeDropdown === 'profile' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.16 }}
                    className={`absolute top-full mt-2 w-80 rounded-2xl border p-3 shadow-2xl z-50 space-y-2 ${
                      isAr ? 'left-0 text-right' : 'right-0 text-left'
                    } ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-800'
                        : 'bg-slate-950/95 border-violet-500/40 text-slate-100 backdrop-blur-xl'
                    }`}
                  >
                    <div
                      className={`pb-2 border-b flex items-center justify-between ${
                        isLight ? 'border-slate-100' : 'border-white/10'
                      }`}
                    >
                      <span
                        className={`text-xs font-extrabold ${
                          isLight ? 'text-violet-800' : 'text-violet-300'
                        }`}
                      >
                        {isAr
                          ? 'مركز التحكم الشخصي والخصوصية'
                          : 'Personal Profile & Data Control'}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          isLight
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-emerald-500/15 text-emerald-300'
                        }`}
                      >
                        TLS 1.3
                      </span>
                    </div>

                    {/* 1. Open User Psychometric Dashboard */}
                    {onOpenUserDashboard && (
                      <button
                        type="button"
                        onClick={() => handleNavAction(onOpenUserDashboard)}
                        className={`w-full p-2.5 rounded-xl transition flex items-center gap-2.5 text-xs font-bold cursor-pointer ${
                          isLight ? 'hover:bg-violet-50 text-slate-800' : 'hover:bg-white/10 text-white'
                        }`}
                      >
                        <User className="w-4 h-4 text-violet-500 shrink-0" />
                        <div>
                          <div>
                            {isAr
                              ? 'لوحة ملفي السيكومتري الشامل'
                              : 'My Psychometric Dashboard'}
                          </div>
                          <div
                            className={`text-[10px] font-normal ${
                              isLight ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            {isAr
                              ? 'استعراض بصمتك المعرفية وتقاريرك وتفضيلاتك'
                              : 'View your cognitive fingerprint, reports & preferences'}
                          </div>
                        </div>
                      </button>
                    )}

                    {/* 2. Saved Test History */}
                    {onOpenHistory && (
                      <button
                        type="button"
                        onClick={() => handleNavAction(onOpenHistory)}
                        className={`w-full p-2.5 rounded-xl transition flex items-center gap-2.5 text-xs font-bold cursor-pointer ${
                          isLight ? 'hover:bg-emerald-50 text-slate-800' : 'hover:bg-white/10 text-white'
                        }`}
                      >
                        <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
                        <div>
                          <div>
                            {isAr
                              ? 'سجل نتائجي المحفوظة وتصدير PDF'
                              : 'Saved Results History & PDF Export'}
                          </div>
                          <div
                            className={`text-[10px] font-normal ${
                              isLight ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            {isAr
                              ? 'جميع اختبارات الشخصية والذكاء والتوافق السابقة'
                              : 'Access all past personality, IQ & compatibility records'}
                          </div>
                        </div>
                      </button>
                    )}

                    {/* 3. Cloud Account / Sign In */}
                    {onOpenAuth && (
                      <button
                        type="button"
                        onClick={() => handleNavAction(onOpenAuth)}
                        className={`w-full p-2.5 rounded-xl transition flex items-center gap-2.5 text-xs font-bold cursor-pointer ${
                          isLight ? 'hover:bg-sky-50 text-slate-800' : 'hover:bg-white/10 text-white'
                        }`}
                      >
                        {user ? (
                          <UserCheck className="w-4 h-4 text-sky-500 shrink-0" />
                        ) : (
                          <LogIn className="w-4 h-4 text-sky-500 shrink-0" />
                        )}
                        <div>
                          <div>
                            {user
                              ? isAr
                                ? `حسابي المتصل (${user.displayName || user.email?.split('@')[0]})`
                                : `Connected Account (${user.displayName || user.email?.split('@')[0]})`
                              : isAr
                              ? 'تسجيل الدخول / مزامنة الحساب السحابي'
                              : 'Sign In / Cloud Account Sync'}
                          </div>
                          <div
                            className={`text-[10px] font-normal ${
                              isLight ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            {isAr
                              ? 'لحفظ سجلاتك عبر أجهزتك المختلفة بأمان'
                              : 'Securely synchronize your records across devices'}
                          </div>
                        </div>
                      </button>
                    )}

                    {/* 4. PERMANENT DATA DELETION OPTION */}
                    <div
                      className={`pt-2 border-t ${
                        isLight ? 'border-slate-200' : 'border-white/10'
                      }`}
                    >
                      {deleteSuccessToast ? (
                        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 text-xs font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>
                            {isAr
                              ? 'تم حذف جميع بياناتك وسجلاتك نهائياً بنجاح.'
                              : 'All your personal data and records have been permanently deleted.'}
                          </span>
                        </div>
                      ) : !confirmDeleteStep ? (
                        <button
                          type="button"
                          onClick={() => {
                            soundManager.playTap();
                            setConfirmDeleteStep(true);
                          }}
                          className={`w-full p-2.5 rounded-xl border transition flex items-center justify-between text-xs font-bold cursor-pointer ${
                            isLight
                              ? 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700'
                              : 'bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/30 text-rose-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Trash2 className="w-4 h-4 text-rose-500 shrink-0" />
                            <span>
                              {isAr
                                ? 'حذف بياناتي وسجلاتي نهائياً'
                                : 'Delete My Data Permanently'}
                            </span>
                          </div>
                        </button>
                      ) : (
                        <div
                          className={`p-3 rounded-xl border space-y-2.5 ${
                            isLight
                              ? 'bg-rose-50 border-rose-300 text-rose-950'
                              : 'bg-rose-950/60 border-rose-500/50 text-rose-100'
                          }`}
                        >
                          <div className="flex items-start gap-2 text-[11px] leading-relaxed">
                            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                            <span>
                              {isAr
                                ? 'هل أنت متأكد؟ سيتم مسح جميع نتائجك المحفوظة وملفك الشخصي من المتصفح والسحابة نهائياً ولا يمكن التراجع.'
                                : 'Are you sure? All saved test results and profile data will be permanently erased from local storage and cloud.'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={isDeletingData}
                              onClick={handlePermanentDeleteData}
                              className="flex-1 py-1.5 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold transition cursor-pointer"
                            >
                              {isDeletingData
                                ? isAr
                                  ? 'جاري الحذف...'
                                  : 'Deleting...'
                                : isAr
                                ? 'نعم، احذف نهائياً'
                                : 'Yes, Delete Forever'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteStep(false)}
                              className={`py-1.5 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
                                isLight
                                  ? 'bg-white border border-slate-300 text-slate-700'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {isAr ? 'إلغاء' : 'Cancel'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Switcher Button (AR / EN) */}
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                toggleLanguage();
              }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                isLight
                  ? 'bg-sky-50 hover:bg-sky-100 border-sky-200 text-sky-800'
                  : 'bg-sky-500/15 hover:bg-sky-500/25 border-sky-400/35 text-sky-200'
              }`}
              title={t('lang_switch_tooltip')}
              aria-label={t('lang_toggle_label')}
            >
              <Languages className="w-3.5 h-3.5 shrink-0" />
              <span className="font-['Alexandria',sans-serif]">
                {isAr ? 'EN' : 'عربي'}
              </span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                toggleTheme();
              }}
              className={`flex items-center gap-1 px-2.5 py-1.5 sm:py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                isLight
                  ? 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800'
                  : 'bg-amber-500/15 hover:bg-amber-500/25 border-amber-400/30 text-amber-300'
              }`}
              title={theme === 'dark' ? t('light_mode') : t('dark_mode')}
              aria-label={theme === 'dark' ? t('light_mode') : t('dark_mode')}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-purple-700" />
              )}
              <span className="hidden xl:inline">
                {theme === 'dark'
                  ? isAr
                    ? 'نهاري'
                    : 'Light'
                  : isAr
                  ? 'ليلي'
                  : 'Dark'}
              </span>
            </button>

            {/* Owner Admin Control Dropdown (Visible when owner/applicable) */}
            {isOwner && (
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => toggleDropdown('owner')}
                  className={`flex items-center gap-1 px-2.5 py-1.5 sm:py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    isLight
                      ? 'bg-amber-50 border-amber-300 text-amber-900'
                      : 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5 text-amber-500" />
                  <ChevronDown className="w-3 h-3" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'owner' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 6 }}
                      className={`absolute top-full mt-2 w-64 p-2 rounded-2xl border shadow-2xl z-50 space-y-1 ${
                        isAr ? 'left-0 text-right' : 'right-0 text-left'
                      } ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-800'
                          : 'bg-slate-950 border-amber-500/40 text-slate-100'
                      }`}
                    >
                      {onNavigatePage && (
                        <button
                          type="button"
                          onClick={() => handleNavAction(() => onNavigatePage('admin-cms'))}
                          className="w-full p-2 rounded-xl hover:bg-rose-500/15 text-rose-500 flex items-center gap-2 text-xs font-bold cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4 shrink-0" />
                          <span>{isAr ? 'مركز إدارة المحتوى و AdSense' : 'CMS & AdSense Audit'}</span>
                        </button>
                      )}
                      {onOpenDomainHosting && (
                        <button
                          type="button"
                          onClick={() => handleNavAction(onOpenDomainHosting)}
                          className="w-full p-2 rounded-xl hover:bg-blue-500/15 text-blue-500 flex items-center gap-2 text-xs font-bold cursor-pointer"
                        >
                          <Cloud className="w-4 h-4 shrink-0" />
                          <span>{isAr ? 'الاستضافة والدومين' : 'Hosting & Domain'}</span>
                        </button>
                      )}
                      {onOpenAdSense && (
                        <button
                          type="button"
                          onClick={() => handleNavAction(onOpenAdSense)}
                          className="w-full p-2 rounded-xl hover:bg-amber-500/15 text-amber-500 flex items-center gap-2 text-xs font-bold cursor-pointer"
                        >
                          <DollarSign className="w-4 h-4 shrink-0" />
                          <span>Google AdSense</span>
                        </button>
                      )}
                      {onOpenAnalytics && (
                        <button
                          type="button"
                          onClick={() => handleNavAction(onOpenAnalytics)}
                          className="w-full p-2 rounded-xl hover:bg-emerald-500/15 text-emerald-500 flex items-center gap-2 text-xs font-bold cursor-pointer"
                        >
                          <BarChart3 className="w-4 h-4 shrink-0" />
                          <span>{isAr ? 'إحصائيات الزوار' : 'Visitor Analytics'}</span>
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition cursor-pointer hidden sm:flex ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
              }`}
              aria-label={soundOn ? t('sound_mute') : t('sound_unmute')}
              title={soundOn ? t('sound_mute') : t('sound_unmute')}
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-rose-500" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Reset Quiz Button when in active quiz/result */}
            {showReset && (
              <button
                type="button"
                onClick={onReset}
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                }`}
                title={t('reset_test')}
                aria-label={t('reset_test')}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className={`p-2 rounded-xl border lg:hidden cursor-pointer ${
                isLight
                  ? 'bg-slate-100 border-slate-200 text-slate-800'
                  : 'bg-white/5 border-white/10 text-slate-200'
              }`}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE NAVIGATION DRAWER (Organized by the 3 Pathways + My Profile) ================= */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`lg:hidden mt-3 pt-3 border-t overflow-hidden text-xs space-y-3 ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}
            >
              {/* Pathway 1 Mobile Block: استكشف ذاتك */}
              <div
                className={`p-3 rounded-2xl border space-y-2 ${
                  isLight ? 'bg-purple-50/60 border-purple-200' : 'bg-purple-950/25 border-purple-500/30'
                }`}
              >
                <div className="font-extrabold text-purple-500 flex items-center gap-1.5">
                  <Brain className="w-4 h-4" />
                  <span>
                    {isAr
                      ? '١. استكشف ذاتك (مقاييس الشخصية والذكاء)'
                      : '1. Explore Yourself (Personality & IQ)'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      handleNavAction(() =>
                        onNavigatePage
                          ? onNavigatePage('personality-tests')
                          : onOpenPsychologyTests && onOpenPsychologyTests()
                      )
                    }
                    className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
                      isLight
                        ? 'bg-white border-purple-200 text-slate-800'
                        : 'bg-slate-900/90 border-white/10 text-slate-100'
                    }`}
                  >
                    🧠 {isAr ? 'مقاييس الشخصية (MBTI & Big Five)' : 'Personality Lab (MBTI & Big Five)'}
                  </button>
                  {onOpenIntelligenceTests && (
                    <button
                      type="button"
                      onClick={() => handleNavAction(onOpenIntelligenceTests)}
                      className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
                        isLight
                          ? 'bg-white border-purple-200 text-slate-800'
                          : 'bg-slate-900/90 border-white/10 text-slate-100'
                      }`}
                    >
                      💡 {isAr ? 'اختبارات الذكاء المتعدد و رافين' : 'Multiple Intelligences & IQ Lab'}
                    </button>
                  )}
                  {onOpenPsychologyTests && (
                    <button
                      type="button"
                      onClick={() => handleNavAction(onOpenPsychologyTests)}
                      className={`p-2.5 rounded-xl border font-bold text-start sm:col-span-2 cursor-pointer ${
                        isLight
                          ? 'bg-white border-purple-200 text-slate-800'
                          : 'bg-slate-900/90 border-white/10 text-slate-100'
                      }`}
                    >
                      📊 {isAr ? 'المقاييس الإكلينيكية المتخصصة (16PF • EPQ • التعلق)' : 'Specialized Clinical Scales (16PF • EPQ)'}
                    </button>
                  )}
                </div>
              </div>

              {/* Pathway 2 Mobile Block: اكتشف التوافق */}
              <div
                className={`p-3 rounded-2xl border space-y-2 ${
                  isLight ? 'bg-rose-50/60 border-rose-200' : 'bg-rose-950/25 border-rose-500/30'
                }`}
              >
                <div className="font-extrabold text-rose-500 flex items-center gap-1.5">
                  <Heart className="w-4 h-4" />
                  <span>
                    {isAr
                      ? '٢. اكتشف التوافق (كاشف التوافق و The Blind Date)'
                      : '2. Discover Compatibility & The Blind Date'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      handleNavAction(() => {
                        if (onNavigatePage) onNavigatePage('home');
                        if (onReset) onReset();
                      })
                    }
                    className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
                      isLight
                        ? 'bg-white border-rose-200 text-slate-800'
                        : 'bg-slate-900/90 border-white/10 text-slate-100'
                    }`}
                  >
                    💖 {isAr ? 'كاشف التوافق الفكري والعاطفي' : 'Partner Compatibility Calculator'}
                  </button>
                  {onOpenBlindDate && (
                    <button
                      type="button"
                      onClick={() => handleNavAction(onOpenBlindDate)}
                      className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
                        isLight
                          ? 'bg-white border-rose-200 text-slate-800'
                          : 'bg-slate-900/90 border-white/10 text-slate-100'
                      }`}
                    >
                      💬 {isAr ? 'اللقاء الأعمى (The Blind Date)' : 'The Blind Date Experience'}
                    </button>
                  )}
                </div>
              </div>

              {/* Pathway 3 Mobile Block: هدية الواحة المعرفية والمقالات والروايات */}
              <div
                className={`p-3 rounded-2xl border space-y-2 ${
                  isLight
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-emerald-950/25 border-emerald-500/30'
                }`}
              >
                <div className="font-extrabold text-emerald-500 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {isAr
                      ? '٣. هدية الواحة المعرفية والمقالات والروايات'
                      : '3. Knowledge Oasis: Articles & Novels'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      handleNavAction(() =>
                        onNavigatePage
                          ? onNavigatePage('articles')
                          : onOpenArticles && onOpenArticles()
                      )
                    }
                    className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
                      isLight
                        ? 'bg-white border-emerald-200 text-slate-800'
                        : 'bg-slate-900/90 border-white/10 text-slate-100'
                    }`}
                  >
                    📚 {isAr ? 'موسوعة المقالات والأبحاث المحكّمة' : 'Clinical Articles & Research'}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleNavAction(() =>
                        onNavigatePage
                          ? onNavigatePage('novels')
                          : onOpenNovels && onOpenNovels()
                      )
                    }
                    className={`p-2.5 rounded-xl border font-bold text-start cursor-pointer ${
                      isLight
                        ? 'bg-white border-emerald-200 text-slate-800'
                        : 'bg-slate-900/90 border-white/10 text-slate-100'
                    }`}
                  >
                    🕵️‍♂️ {isAr ? 'مكتبة الروايات والتحقيقات' : 'Novels & Forensic Library'}
                  </button>
                </div>
              </div>

              {/* Mobile Profile & Permanent Data Deletion Block */}
              <div
                className={`p-3 rounded-2xl border space-y-2 ${
                  isLight ? 'bg-violet-50/70 border-violet-200' : 'bg-violet-950/30 border-violet-500/30'
                }`}
              >
                <div className="font-extrabold text-violet-500 flex items-center justify-between">
                  <span>👤 {isAr ? 'ملفي والتحكم بالبيانات' : 'My Profile & Data Control'}</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {onOpenUserDashboard && (
                    <button
                      type="button"
                      onClick={() => handleNavAction(onOpenUserDashboard)}
                      className={`p-2 rounded-xl border font-bold text-start cursor-pointer ${
                        isLight
                          ? 'bg-white border-violet-200 text-slate-800'
                          : 'bg-slate-900 border-white/10 text-slate-100'
                      }`}
                    >
                      {isAr ? 'لوحة ملفي الشامل' : 'Profile Dashboard'}
                    </button>
                  )}
                  {onOpenHistory && (
                    <button
                      type="button"
                      onClick={() => handleNavAction(onOpenHistory)}
                      className={`p-2 rounded-xl border font-bold text-start cursor-pointer ${
                        isLight
                          ? 'bg-white border-violet-200 text-slate-800'
                          : 'bg-slate-900 border-white/10 text-slate-100'
                      }`}
                    >
                      {isAr ? 'سجل نتائجي المحفوظة' : 'Saved History'}
                    </button>
                  )}
                </div>

                {/* Permanent Delete in Mobile */}
                {!confirmDeleteStep ? (
                  <button
                    type="button"
                    onClick={() => setConfirmDeleteStep(true)}
                    className="w-full p-2 rounded-xl bg-rose-500/15 border border-rose-500/35 text-rose-500 font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>
                      {isAr ? 'حذف جميع بياناتي نهائياً' : 'Delete All My Data Permanently'}
                    </span>
                  </button>
                ) : (
                  <div className="p-2.5 rounded-xl bg-rose-600/15 border border-rose-500/40 space-y-2">
                    <p className="text-[11px] font-bold text-rose-500">
                      {isAr
                        ? 'تأكيد المسح النهائي لجميع البيانات المحلية والسحابية؟'
                        : 'Confirm permanent erasure of all local and cloud data?'}
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handlePermanentDeleteData}
                        className="flex-1 py-1.5 rounded-lg bg-rose-600 text-white font-bold cursor-pointer"
                      >
                        {isAr ? 'نعم، احذف نهائياً' : 'Yes, Delete'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteStep(false)}
                        className="py-1.5 px-3 rounded-lg bg-slate-700 text-white font-bold cursor-pointer"
                      >
                        {isAr ? 'إلغاء' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <PWAInstallModal isOpen={showPwaModal} onClose={() => setShowPwaModal(false)} />
    </>
  );
};
