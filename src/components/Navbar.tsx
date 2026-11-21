import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import {
  Heart,
  Volume2,
  VolumeX,
  RotateCcw,
  Menu,
  X,
  BookOpen,
  Sun,
  Moon,
  Languages,
  ChevronDown,
  Brain,
  User,
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import type { WebsiteTabKey } from './WebsiteSectionsModal';
import { useAppTheme } from '../utils/theme';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { OFFICIAL_LOGO_URL } from '../utils/logoAsset';
import { navigateCleanUrl } from '../utils/navigation';

const PWAInstallModal = lazy(() =>
  import('./PWAInstallModal').then((m) => ({ default: m.PWAInstallModal }))
);

const NavbarOwnerControls = lazy(() =>
  import('./navbar/NavbarOwnerControls').then((m) => ({ default: m.NavbarOwnerControls }))
);

const NavbarUserMenu = lazy(() =>
  import('./navbar/NavbarUserMenu').then((m) => ({ default: m.NavbarUserMenu }))
);

const NavbarMobileDrawer = lazy(() =>
  import('./navbar/NavbarMobileDrawer').then((m) => ({ default: m.NavbarMobileDrawer }))
);

const NavbarDesktopDropdown = lazy(() =>
  import('./navbar/NavbarDesktopDropdown').then((m) => ({ default: m.NavbarDesktopDropdown }))
);

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
  onOpenBlindDate,
  onOpenDomainHosting,
  onOpenAdSense,
  onOpenAuth,
  onOpenHistory,
  onOpenPsychologyTests,
  onOpenIntelligenceTests,
  onOpenUserDashboard,
  onOpenCoupleInvite,
  onOpenArticles,
  onOpenNovels,
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

  const handleCleanNav = (
    page: string,
    cleanPath: string,
    fallback?: () => void
  ) => {
    handleNavAction(() => {
      if (onNavigatePage) {
        onNavigatePage(page);
      } else {
        navigateCleanUrl(cleanPath);
        if (fallback) fallback();
      }
    });
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
      const { purgeAllUserDataPermanently } = await import('../services/userHistoryService');
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

  const isSelfActive =
    currentPage === 'personality-tests' ||
    currentPage === 'iq-tests' ||
    currentPage === 'how-results-are-calculated';
  const isCompatibilityActive = currentPage === 'compatibility' || currentPage === 'tools';
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
          <a
            href="/"
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            onClick={(e) => {
              e.preventDefault();
              handleCleanNav('home', '/');
              if (onReset) onReset();
            }}
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
                  width={44}
                  height={44}
                  decoding="async"
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
                className={`text-[10px] font-medium hidden sm:block ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                {t('brand_tagline')}
              </p>
            </div>
          </a>

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

              {activeDropdown === 'self' && (
                <Suspense fallback={null}>
                  <NavbarDesktopDropdown
                    activeDropdown="self"
                    isAr={isAr}
                    isLight={isLight}
                    onCleanNav={handleCleanNav}
                    onNavAction={handleNavAction}
                    onNavigatePage={onNavigatePage}
                    onReset={onReset}
                    onOpenPsychologyTests={onOpenPsychologyTests}
                    onOpenIntelligenceTests={onOpenIntelligenceTests}
                  />
                </Suspense>
              )}
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

              {activeDropdown === 'compatibility' && (
                <Suspense fallback={null}>
                  <NavbarDesktopDropdown
                    activeDropdown="compatibility"
                    isAr={isAr}
                    isLight={isLight}
                    onCleanNav={handleCleanNav}
                    onNavAction={handleNavAction}
                    onNavigatePage={onNavigatePage}
                    onReset={onReset}
                    onOpenBlindDate={onOpenBlindDate}
                    onOpenCoupleInvite={onOpenCoupleInvite}
                  />
                </Suspense>
              )}
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

              {activeDropdown === 'oasis' && (
                <Suspense fallback={null}>
                  <NavbarDesktopDropdown
                    activeDropdown="oasis"
                    isAr={isAr}
                    isLight={isLight}
                    onCleanNav={handleCleanNav}
                    onNavAction={handleNavAction}
                    onNavigatePage={onNavigatePage}
                    onOpenArticles={onOpenArticles}
                    onOpenNovels={onOpenNovels}
                  />
                </Suspense>
              )}
            </div>
          </nav>

          {/* 3. Right Side Controls: Prominent "ملفي" (My Profile & Data Deletion), Lang, Theme, Lazy Owner */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* ================= PROMINENT "ملفي" (MY PROFILE & DATA CONTROL) BUTTON ================= */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown('profile')}
                aria-expanded={activeDropdown === 'profile'}
                className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl border text-xs font-extrabold transition flex items-center gap-1.5 cursor-pointer shadow-sm ${
                  activeDropdown === 'profile'
                    ? 'bg-gradient-to-r from-violet-700 to-rose-700 text-white border-violet-400 shadow-md'
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

              {activeDropdown === 'profile' && (
                <Suspense fallback={null}>
                  <NavbarUserMenu
                    isAr={isAr}
                    isLight={isLight}
                    user={user}
                    confirmDeleteStep={confirmDeleteStep}
                    isDeletingData={isDeletingData}
                    deleteSuccessToast={deleteSuccessToast}
                    onSetConfirmDeleteStep={setConfirmDeleteStep}
                    onPermanentDeleteData={handlePermanentDeleteData}
                    onNavAction={handleNavAction}
                    onNavigatePage={onNavigatePage}
                    onOpenUserDashboard={onOpenUserDashboard}
                    onOpenHistory={onOpenHistory}
                    onOpenAuth={onOpenAuth}
                  />
                </Suspense>
              )}
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
              title={isAr ? 'تبديل اللغة إلى الإنجليزية' : 'Switch language to Arabic'}
              aria-label={isAr ? 'تبديل اللغة إلى الإنجليزية' : 'Switch language to Arabic'}
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
              title={
                theme === 'dark'
                  ? isAr
                    ? 'التبديل إلى الوضع النهاري'
                    : 'Switch to Light Mode'
                  : isAr
                  ? 'التبديل إلى الوضع الليلي'
                  : 'Switch to Dark Mode'
              }
              aria-label={
                theme === 'dark'
                  ? isAr
                    ? 'التبديل إلى الوضع النهاري'
                    : 'Switch to Light Mode'
                  : isAr
                  ? 'التبديل إلى الوضع الليلي'
                  : 'Switch to Dark Mode'
              }
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

            {/* Lazy-Loaded Owner-Only Admin & Website Files Download Controls */}
            {isOwner && (
              <Suspense fallback={null}>
                <NavbarOwnerControls
                  isAr={isAr}
                  isLight={isLight}
                  isOpen={activeDropdown === 'owner'}
                  user={user}
                  onToggle={() => toggleDropdown('owner')}
                  onNavAction={handleNavAction}
                  onNavigatePage={onNavigatePage}
                  onOpenDomainHosting={onOpenDomainHosting}
                  onOpenAdSense={onOpenAdSense}
                  onOpenAnalytics={onOpenAnalytics}
                />
              </Suspense>
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
              aria-label={
                soundOn
                  ? isAr
                    ? 'كتم المؤثرات الصوتية'
                    : 'Mute sound effects'
                  : isAr
                  ? 'تفعيل المؤثرات الصوتية'
                  : 'Unmute sound effects'
              }
              title={
                soundOn
                  ? isAr
                    ? 'كتم المؤثرات الصوتية'
                    : 'Mute sound effects'
                  : isAr
                  ? 'تفعيل المؤثرات الصوتية'
                  : 'Unmute sound effects'
              }
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
                title={isAr ? 'إعادة الاختبار من البداية' : 'Reset assessment'}
                aria-label={isAr ? 'إعادة الاختبار من البداية' : 'Reset assessment'}
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
              aria-label={isAr ? 'فتح أو إغلاق القائمة الرئيسية' : 'Toggle navigation menu'}
              title={isAr ? 'فتح أو إغلاق القائمة الرئيسية' : 'Toggle navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ================= LAZY-LOADED MOBILE NAVIGATION DRAWER ================= */}
        {mobileMenuOpen && (
          <Suspense fallback={null}>
            <NavbarMobileDrawer
              isAr={isAr}
              isLight={isLight}
              confirmDeleteStep={confirmDeleteStep}
              onSetConfirmDeleteStep={setConfirmDeleteStep}
              onPermanentDeleteData={handlePermanentDeleteData}
              onNavAction={handleNavAction}
              onNavigatePage={onNavigatePage}
              onReset={onReset}
              onOpenPsychologyTests={onOpenPsychologyTests}
              onOpenIntelligenceTests={onOpenIntelligenceTests}
              onOpenBlindDate={onOpenBlindDate}
              onOpenArticles={onOpenArticles}
              onOpenNovels={onOpenNovels}
              onOpenUserDashboard={onOpenUserDashboard}
              onOpenHistory={onOpenHistory}
            />
          </Suspense>
        )}
      </header>

      {showPwaModal && (
        <Suspense fallback={null}>
          <PWAInstallModal isOpen={showPwaModal} onClose={() => setShowPwaModal(false)} />
        </Suspense>
      )}
    </>
  );
};
