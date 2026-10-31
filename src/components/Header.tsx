import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Volume2,
  VolumeX,
  Download,
  RotateCcw,
  Globe,
  Cloud,
  Menu,
  X,
  BookOpen,
  Info,
  HelpCircle,
  ShieldCheck,
  Star,
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
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { PWAInstallModal } from './PWAInstallModal';
import { WebsiteTabKey } from './WebsiteSectionsModal';
import { useAppTheme } from '../utils/theme';
import { useAuth, OWNER_EMAIL } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface Props {
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
}

export const Header: React.FC<Props> = ({
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
}) => {
  const { user, isOwner } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const [soundOn, setSoundOn] = useState(true);
  const [showPwaModal, setShowPwaModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ownerDropdownOpen, setOwnerDropdownOpen] = useState(false);
  const [theme, toggleTheme] = useAppTheme();

  const toggleSound = () => {
    soundManager.enabled = !soundOn;
    setSoundOn(!soundOn);
    if (!soundOn) {
      soundManager.playTap();
    }
  };

  const handleNavClick = (callback?: () => void) => {
    soundManager.playTap();
    setMobileMenuOpen(false);
    setOwnerDropdownOpen(false);
    if (callback) callback();
  };

  const handleOpenArticles = () => {
    soundManager.playTap();
    setMobileMenuOpen(false);
    if (onOpenArticles) {
      onOpenArticles();
    } else if (onOpenWebsiteSection) {
      onOpenWebsiteSection('articles');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-3 sm:px-5 py-2.5 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Brand with Pulsing Heart Animation */}
          <div className="flex items-center gap-2.5 cursor-pointer group shrink-0" onClick={onReset}>
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-violet-600 p-0.5 shadow-md shadow-rose-500/25 flex items-center justify-center">
              <div className="w-full h-full bg-[#120d24] rounded-[14px] flex items-center justify-center relative overflow-hidden">
                <span className="text-lg sm:text-xl relative z-10">🔮</span>
                <motion.div
                  className="absolute inset-0 bg-rose-500/20 rounded-[14px]"
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-base sm:text-lg tracking-wide text-white font-['Alexandria',sans-serif]">
                  {t('brand_name')}
                </h1>
                <motion.div
                  animate={{
                    scale: [1, 1.28, 1.05, 1.32, 1],
                    rotate: [0, -3, 2, -2, 0],
                    filter: [
                      'drop-shadow(0 0 2px rgba(244, 63, 94, 0.4))',
                      'drop-shadow(0 0 8px rgba(244, 63, 94, 0.9))',
                      'drop-shadow(0 0 3px rgba(244, 63, 94, 0.5))',
                      'drop-shadow(0 0 10px rgba(236, 72, 153, 0.95))',
                      'drop-shadow(0 0 2px rgba(244, 63, 94, 0.4))',
                    ],
                  }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex items-center justify-center"
                  title={t('pulse_hearts')}
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-400" />
                </motion.div>
              </div>
              <p className="text-[10px] sm:text-[11px] text-gray-400">{t('brand_tagline')}</p>
            </div>
          </div>

          {/* Desktop Central Navigation (Clean, Spacious, Uncluttered) */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-gray-300">
            {/* Onboarding Interactive Guide Button (User Request) */}
            {onOpenOnboardingWizard && (
              <button
                onClick={() => handleNavClick(onOpenOnboardingWizard)}
                className="px-2.5 py-1.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-400/35 text-indigo-200 hover:text-white transition cursor-pointer flex items-center gap-1.5 font-bold shadow-sm"
                title="مرشدك التفاعلي لتحديد وجهتك الأنسب"
              >
                <span>🧭</span>
                <span>{language === 'ar' ? 'المرشد التفاعلي' : 'Guide Wizard'}</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick(onReset)}
              className="px-2.5 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition cursor-pointer"
            >
              {t('nav_home')}
            </button>

            {/* Articles Section Trigger (User Request) */}
            <button
              onClick={handleOpenArticles}
              className="px-2.5 py-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-500/10 transition cursor-pointer flex items-center gap-1.5 font-bold"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'ar' ? 'المقالات' : 'Articles'}</span>
            </button>

            {/* Suspense & Mystery Novels Trigger (User Request) */}
            {onOpenNovels && (
              <button
                onClick={() => handleNavClick(onOpenNovels)}
                className="px-2.5 py-1.5 rounded-lg text-amber-300 hover:text-white hover:bg-amber-500/10 transition cursor-pointer flex items-center gap-1.5 font-bold"
              >
                <span>🕵️‍♂️</span>
                <span>{language === 'ar' ? 'الروايات والتحقيقات' : 'Novels & Crime'}</span>
              </button>
            )}

            {/* The Blind Date (Updated: No "Show", No TV wording) */}
            {onOpenBlindDate && (
              <button
                onClick={() => handleNavClick(onOpenBlindDate)}
                className="px-2.5 py-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-rose-500/10 transition cursor-pointer flex items-center gap-1 font-bold"
              >
                <MessageCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>The Blind Date</span>
              </button>
            )}

            {/* Psychology Assessment Suite */}
            {onOpenPsychologyTests && (
              <button
                onClick={() => handleNavClick(onOpenPsychologyTests)}
                className="px-2.5 py-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-purple-500/10 transition cursor-pointer flex items-center gap-1"
              >
                <span>🧠</span>
                <span>{language === 'ar' ? 'مقاييس الشخصية' : 'Personality Tests'}</span>
              </button>
            )}

            {/* Multiple Intelligences Assessment Trigger (User Request) */}
            {onOpenIntelligenceTests && (
              <button
                onClick={() => handleNavClick(onOpenIntelligenceTests)}
                className="px-2.5 py-1.5 rounded-lg text-cyan-300 hover:text-white hover:bg-cyan-500/10 transition cursor-pointer flex items-center gap-1 font-bold"
              >
                <span>💡</span>
                <span>{language === 'ar' ? 'اختبارات الذكاء' : 'Intelligence Tests'}</span>
              </button>
            )}

            {/* User Dashboard */}
            {onOpenUserDashboard && (
              <button
                onClick={() => handleNavClick(onOpenUserDashboard)}
                className="px-2.5 py-1.5 rounded-lg text-violet-300 hover:text-white hover:bg-violet-500/10 transition cursor-pointer flex items-center gap-1"
              >
                <span>👤</span>
                <span>{language === 'ar' ? 'لوحة ملفي' : 'Profile'}</span>
              </button>
            )}

            {/* Contact & Feedback Trigger */}
            {onOpenContactFeedback && (
              <button
                onClick={() => handleNavClick(onOpenContactFeedback)}
                className="px-2.5 py-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-500/10 transition cursor-pointer flex items-center gap-1 font-semibold"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'ar' ? 'الملاحظات والتواصل' : 'Contact & Feedback'}</span>
              </button>
            )}

            {/* Website About / Info */}
            {onOpenWebsiteSection && (
              <button
                onClick={() => handleNavClick(() => onOpenWebsiteSection('about'))}
                className="px-2 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition cursor-pointer text-gray-400 hover:text-gray-200"
              >
                {t('nav_about')}
              </button>
            )}
          </nav>

          {/* Action buttons (Right side) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Switcher Button (Arabic / English Toggle) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                soundManager.playTap();
                toggleLanguage();
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500/15 via-blue-500/15 to-indigo-500/15 hover:from-sky-500/25 hover:to-indigo-500/25 border border-sky-400/35 text-sky-200 hover:text-white text-xs font-bold transition shadow-sm cursor-pointer"
              title={t('lang_switch_tooltip')}
              aria-label={t('lang_toggle_label')}
            >
              <Languages className="w-3.5 h-3.5 text-sky-300" />
              <span className="font-['Alexandria',sans-serif] font-bold">
                {language === 'ar' ? 'English' : 'العربية'}
              </span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-sky-400/25 text-sky-200 font-mono font-extrabold">
                {language === 'ar' ? 'EN' : 'عربي'}
              </span>
            </motion.button>

            {/* Light Mode / Dark Mode Toggle */}
            <button
              onClick={() => {
                soundManager.playTap();
                toggleTheme();
              }}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 hover:text-amber-200 text-xs font-bold transition active:scale-95 shadow-sm cursor-pointer"
              title={theme === 'dark' ? t('light_mode') : t('dark_mode')}
              aria-label={theme === 'dark' ? t('light_mode') : t('dark_mode')}
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-purple-600" />
              )}
            </button>

            {/* Domain, Hosting & AdSense Control Center */}
            <div className="relative">
              <button
                onClick={() => {
                  soundManager.playTap();
                  setOwnerDropdownOpen(!ownerDropdownOpen);
                }}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-400/50 text-amber-300 text-xs font-black transition active:scale-95 shadow-md shadow-amber-500/15 cursor-pointer"
                title="إدارة النشر العام، شراء الاستضافة والدومين، وربط Google AdSense"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline font-['Alexandria',sans-serif]">النشر وAdSense</span>
                <ChevronDown className={`w-3 h-3 text-amber-400 transition-transform ${ownerDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Owner Admin Dropdown Menu */}
              <AnimatePresence>
                {ownerDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 6 }}
                    className="absolute left-0 sm:right-auto sm:left-0 mt-2 w-72 p-2 rounded-2xl bg-slate-950/95 border border-amber-500/40 shadow-2xl backdrop-blur-xl z-50 text-right space-y-1.5"
                  >
                    <div className="px-3 py-2 border-b border-white/10 text-[11px] text-amber-300/90 font-bold flex items-center justify-between">
                      <span>مركز النشر والاستضافة وAdSense 👑</span>
                      <span className="text-[9px] text-emerald-400 font-mono">Live 200 OK</span>
                    </div>

                    {onOpenDomainHosting && (
                      <button
                        onClick={() => {
                          handleNavClick(onOpenDomainHosting);
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-white/10 text-blue-300 flex items-center gap-2 text-xs font-bold transition text-right cursor-pointer"
                      >
                        <Cloud className="w-4 h-4 text-blue-400 shrink-0" />
                        <div>
                          <div>رفع الموقع، شراء الاستضافة والدومين</div>
                          <div className="text-[10px] text-gray-400 font-normal">الرابط العام + فحص وشراء النطاق + DNS</div>
                        </div>
                      </button>
                    )}

                    {onOpenAdSense && (
                      <button
                        onClick={() => {
                          handleNavClick(onOpenAdSense);
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-white/10 text-amber-300 flex items-center gap-2 text-xs font-bold transition text-right cursor-pointer"
                      >
                        <DollarSign className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <div>ربط Google AdSense وتفعيل الأرباح</div>
                          <div className="text-[10px] text-gray-400 font-normal">معرف الناشر ca-pub وملف ads.txt</div>
                        </div>
                      </button>
                    )}

                    {onOpenAnalytics && (
                      <button
                        onClick={() => {
                          handleNavClick(onOpenAnalytics);
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-white/10 text-emerald-300 flex items-center gap-2 text-xs font-bold transition text-right cursor-pointer"
                      >
                        <BarChart3 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <div>
                          <div>لوحة إحصائيات وتحليل الزوار</div>
                          <div className="text-[10px] text-gray-400 font-normal">مؤشرات الزيارات والاختبارات الأكثر طلباً</div>
                        </div>
                      </button>
                    )}

                    {onOpenContactFeedback && (
                      <button
                        onClick={() => {
                          handleNavClick(onOpenContactFeedback);
                        }}
                        className="w-full p-2.5 rounded-xl hover:bg-white/10 text-sky-300 flex items-center gap-2 text-xs font-bold transition text-right cursor-pointer"
                      >
                        <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                        <div>
                          <div>رسائل وملاحظات الزوار الواردة</div>
                          <div className="text-[10px] text-gray-400 font-normal">المستقبل: one497303@gmail.com</div>
                        </div>
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Account & History Button (Firebase Auth) */}
            <button
              onClick={() => {
                soundManager.playTap();
                if (user) {
                  if (onOpenHistory) onOpenHistory();
                } else {
                  if (onOpenAuth) onOpenAuth();
                }
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/30 text-purple-200 text-xs font-bold transition active:scale-95 shadow-sm cursor-pointer"
              title={user ? t('my_account') : t('login_btn')}
            >
              {user ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span className="hidden sm:inline font-['Alexandria',sans-serif] max-w-[100px] truncate">
                    {user.displayName || user.email?.split('@')[0] || t('my_account')}
                  </span>
                  <span className="sm:hidden">{t('my_account')}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5 text-purple-400" />
                  <span className="hidden sm:inline font-['Alexandria',sans-serif]">{t('login_btn')}</span>
                  <span className="sm:hidden">{t('login_btn_mobile')}</span>
                </>
              )}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition active:scale-95 cursor-pointer"
              aria-label={soundOn ? t('sound_mute') : t('sound_unmute')}
              title={soundOn ? t('sound_mute') : t('sound_unmute')}
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-rose-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-gray-400" />
              )}
            </button>

            {/* Reset / Restart Quiz */}
            {showReset && (
              <button
                onClick={onReset}
                className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition active:scale-95 cursor-pointer"
                title={t('reset_test')}
                aria-label={t('reset_test')}
              >
                <RotateCcw className="w-4 h-4 text-gray-300" />
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => {
                soundManager.playTap();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 lg:hidden cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden mt-3 pt-3 border-t border-white/10 overflow-hidden text-xs"
            >
              <div className="grid grid-cols-2 gap-2 pb-2">
                {/* Language Switcher in Mobile Drawer */}
                <button
                  onClick={() => {
                    soundManager.playTap();
                    toggleLanguage();
                  }}
                  className="p-2.5 rounded-xl bg-sky-500/15 border border-sky-500/35 text-sky-200 font-bold flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-sky-400" />
                    <span>{language === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-400/20 font-mono">
                    {language === 'ar' ? 'EN 🇺🇸' : 'عربي 🇸🇦'}
                  </span>
                </button>

                {/* Onboarding Interactive Guide in Mobile */}
                {onOpenOnboardingWizard && (
                  <button
                    onClick={() => handleNavClick(onOpenOnboardingWizard)}
                    className="p-3 rounded-2xl bg-indigo-500/20 border border-indigo-500/35 font-extrabold text-indigo-200 flex items-center justify-center gap-2 cursor-pointer col-span-2 shadow-sm"
                  >
                    <span className="text-lg">🧭</span>
                    <span>{language === 'ar' ? 'المرشد التفاعلي: ما الذي تبحث عنه اليوم؟' : 'Interactive Guide'}</span>
                  </button>
                )}

                {/* Home */}
                <button
                  onClick={() => handleNavClick(onReset)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 font-bold text-gray-200 flex items-center gap-2 cursor-pointer"
                >
                  <span>🏠 {t('nav_home')}</span>
                </button>

                {/* Articles Section in Mobile (User Request) */}
                <button
                  onClick={handleOpenArticles}
                  className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 font-bold text-emerald-200 flex items-center gap-2 cursor-pointer col-span-2"
                >
                  <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>📚 {language === 'ar' ? 'موسوعة المقالات والعلوم النفسية' : 'Articles & Psychology Catalog'}</span>
                </button>

                {/* Suspense Novels (User Request) */}
                {onOpenNovels && (
                  <button
                    onClick={() => handleNavClick(onOpenNovels)}
                    className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 font-bold text-amber-200 flex items-center gap-2 cursor-pointer col-span-2"
                  >
                    <span>🕵️‍♂️</span>
                    <span>{language === 'ar' ? 'قسم الروايات والتحقيقات الجنائية' : 'Novels & Forensic Thrillers'}</span>
                  </button>
                )}

                {/* The Blind Date (No Show / No TV) */}
                {onOpenBlindDate && (
                  <button
                    onClick={() => handleNavClick(onOpenBlindDate)}
                    className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 font-bold text-rose-200 flex items-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>The Blind Date 💬</span>
                  </button>
                )}

                {/* Psychology Tests */}
                {onOpenPsychologyTests && (
                  <button
                    onClick={() => handleNavClick(onOpenPsychologyTests)}
                    className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 font-bold text-purple-200 flex items-center gap-2 cursor-pointer"
                  >
                    <span>🧠</span>
                    <span>{language === 'ar' ? 'مقاييس الشخصية' : 'Personality Tests'}</span>
                  </button>
                )}

                {/* Intelligence Tests (User Request) */}
                {onOpenIntelligenceTests && (
                  <button
                    onClick={() => handleNavClick(onOpenIntelligenceTests)}
                    className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 font-bold text-cyan-200 flex items-center gap-2 cursor-pointer"
                  >
                    <span>💡</span>
                    <span>{language === 'ar' ? 'اختبارات الذكاء' : 'IQ & MI Tests'}</span>
                  </button>
                )}

                {/* User Dashboard */}
                {onOpenUserDashboard && (
                  <button
                    onClick={() => handleNavClick(onOpenUserDashboard)}
                    className="p-2.5 rounded-xl bg-violet-500/15 border border-violet-500/30 font-bold text-violet-200 flex items-center gap-2 cursor-pointer"
                  >
                    <span>👤</span>
                    <span>{language === 'ar' ? 'لوحة ملفي' : 'Profile'}</span>
                  </button>
                )}

                {/* Couple Invite */}
                {onOpenCoupleInvite && (
                  <button
                    onClick={() => handleNavClick(onOpenCoupleInvite)}
                    className="p-2.5 rounded-xl bg-pink-500/15 border border-pink-500/30 font-bold text-pink-200 flex items-center gap-2 cursor-pointer"
                  >
                    <span>💑</span>
                    <span>{language === 'ar' ? 'دعوة شريك' : 'Invite'}</span>
                  </button>
                )}

                {/* Live Chat Radar */}
                {onOpenLiveChat && (
                  <button
                    onClick={() => handleNavClick(onOpenLiveChat)}
                    className="p-2.5 rounded-xl bg-teal-500/15 border border-teal-500/30 font-bold text-teal-200 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                    <span>{language === 'ar' ? 'رادار التوافق' : 'Radar'}</span>
                  </button>
                )}

                {/* Account / Login */}
                <button
                  onClick={() => handleNavClick(user ? onOpenHistory : onOpenAuth)}
                  className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 font-bold text-purple-200 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    {user ? <UserCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" /> : <LogIn className="w-3.5 h-3.5 text-purple-400 shrink-0" />}
                    <span className="truncate">{user ? (user.displayName || t('my_account')) : t('login_btn')}</span>
                  </div>
                </button>

                {/* Theme toggle in mobile */}
                <button
                  onClick={() => {
                    soundManager.playTap();
                    toggleTheme();
                    setMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 font-bold text-amber-300 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-purple-400" />}
                    <span>{theme === 'dark' ? t('light_mode') : t('dark_mode')}</span>
                  </div>
                </button>

                {/* PWA Install in mobile */}
                <button
                  onClick={() => {
                    setShowPwaModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 font-bold text-gray-200 flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-rose-400" />
                  <span>{t('install_btn')}</span>
                </button>

                {/* Contact & Feedback in mobile */}
                {onOpenContactFeedback && (
                  <button
                    onClick={() => handleNavClick(onOpenContactFeedback)}
                    className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 font-bold text-emerald-200 flex items-center gap-2 cursor-pointer col-span-2"
                  >
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>✉️ {language === 'ar' ? 'تواصل معنا والملاحظات (one497303@gmail.com)' : 'Contact & Feedback'}</span>
                  </button>
                )}

                {/* DOMAIN, HOSTING & ADSENSE IN MOBILE DRAWER */}
                <div className="col-span-2 mt-2 p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-600/10 border border-amber-400/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-black text-amber-300">
                    <div className="flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5 text-amber-400" />
                      <span>مركز النشر العام والاستضافة وAdSense</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">Live</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {onOpenAnalytics && (
                      <button
                        onClick={() => handleNavClick(onOpenAnalytics)}
                        className="p-2 rounded-xl bg-emerald-500/20 text-emerald-200 font-bold flex items-center gap-1.5 cursor-pointer text-[11px] col-span-2"
                      >
                        <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>لوحة إحصائيات الزوار والتفاعل 📊</span>
                      </button>
                    )}
                    {onOpenDomainHosting && (
                      <button
                        onClick={() => handleNavClick(onOpenDomainHosting)}
                        className="p-2 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-200 font-bold flex items-center gap-1.5 cursor-pointer text-[11px]"
                      >
                        <Cloud className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>الاستضافة والدومين</span>
                      </button>
                    )}

                    {onOpenAdSense && (
                      <button
                        onClick={() => handleNavClick(onOpenAdSense)}
                        className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-200 font-bold flex items-center gap-1.5 cursor-pointer text-[11px]"
                      >
                        <DollarSign className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Google AdSense</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Static informational section links */}
                {onOpenWebsiteSection && (
                  <>
                    <button
                      onClick={() => handleNavClick(() => onOpenWebsiteSection('about'))}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-right text-gray-300 flex items-center gap-2 cursor-pointer col-span-2"
                    >
                      <Info className="w-3.5 h-3.5 text-rose-400" />
                      <span>عن المنصة ورؤيتها</span>
                    </button>
                    <button
                      onClick={() => handleNavClick(() => onOpenWebsiteSection('how-it-works'))}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-right text-gray-300 flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>كيف تعمل الخوارزمية؟</span>
                    </button>
                    <button
                      onClick={() => handleNavClick(() => onOpenWebsiteSection('faq'))}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-right text-gray-300 flex items-center gap-2 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                      <span>الأسئلة الشائعة (FAQ)</span>
                    </button>
                  </>
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
