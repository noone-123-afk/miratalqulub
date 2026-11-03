import React, { useState } from 'react';
import {
  Brain,
  Heart,
  BookOpen,
  User,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  FileText,
  Mail,
  Info,
  HelpCircle,
  Sparkles,
  Feather,
  Cpu,
  MessageCircle,
  Compass,
  Sun,
  Moon,
  Languages,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';
import { AdSenseBanner } from './AdSenseBanner';
import { purgeAllUserDataPermanently } from '../services/userHistoryService';

export interface FooterProps {
  currentPage?: string;
  onNavigatePage: (page: string) => void;
  onResetHome: () => void;
  onOpenBlindDate: () => void;
  onOpenPsychologyTests: () => void;
  onOpenIntelligenceTests: () => void;
  onOpenUserDashboard: () => void;
  onOpenHistory: () => void;
  onOpenArticles: () => void;
  onOpenNovels: () => void;
  onOpenCoupleInvite?: () => void;
  onOpenDomainHosting?: () => void;
  onOpenAdSense?: () => void;
  onOpenAnalytics?: () => void;
  onDataDeleted?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentPage = 'home',
  onNavigatePage,
  onResetHome,
  onOpenBlindDate,
  onOpenPsychologyTests,
  onOpenIntelligenceTests,
  onOpenUserDashboard,
  onOpenHistory,
  onOpenArticles,
  onOpenNovels,
  onOpenCoupleInvite,
  onOpenDomainHosting,
  onOpenAdSense,
  onOpenAnalytics,
  onDataDeleted,
}) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, isOwner } = useAuth();
  const [theme, toggleTheme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handlePermanentDelete = async () => {
    soundManager.playTap();
    setIsDeleting(true);
    try {
      await purgeAllUserDataPermanently(user);
      setIsDeleting(false);
      setConfirmDelete(false);
      setDeleteSuccess(true);
      if (onDataDeleted) onDataDeleted();
      onResetHome();
      setTimeout(() => setDeleteSuccess(false), 3500);
    } catch {
      setIsDeleting(false);
    }
  };

  return (
    <footer
      dir={isAr ? 'rtl' : 'ltr'}
      className={`w-full border-t pt-12 pb-8 text-xs transition-colors duration-300 ${
        isLight
          ? 'bg-slate-100/95 border-slate-200 text-slate-600'
          : 'bg-[#08060f]/95 border-white/10 text-slate-400 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Top Row: Brand Identity + Prominent "ملفي" & Permanent Data Deletion Control Card */}
        <div
          className={`p-5 sm:p-6 rounded-3xl border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ${
            isLight
              ? 'bg-white border-slate-200/90 shadow-sm'
              : 'bg-slate-900/75 border-white/10 shadow-xl'
          }`}
        >
          {/* Brand Summary */}
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🔮</span>
              <span
                className={`font-extrabold text-base sm:text-lg font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr
                  ? 'مِـرآة القـلوب | Mirror of Hearts (miratalqulub.com)'
                  : 'Mirror of Hearts | مرآة القلوب (miratalqulub.com)'}
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {isAr
                ? 'منصة عربية مستقلة رائدة تعتمد على المقاييس السيكومترية الموثقة بمراجع APA، واختبارات الذكاء المتعدد، وتحليل التوافق الفكري والعاطفي، مع واحة معرفية شاملة للمقالات والأبحاث والروايات الأدبية.'
                : 'An independent platform integrating APA-referenced psychometric inventories, multiple intelligences batteries, and relational compatibility algorithms with a comprehensive literary and academic knowledge oasis.'}
            </p>
          </div>

          {/* Highlighted "ملفي" (My Profile) & Permanent Data Deletion Control Box */}
          <div
            className={`w-full lg:w-auto min-w-[300px] p-4 rounded-2xl border space-y-3 ${
              isLight
                ? 'bg-violet-50/70 border-violet-200'
                : 'bg-violet-950/25 border-violet-500/30'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-violet-500 shrink-0" />
                <span
                  className={`font-extrabold text-xs sm:text-sm font-['Alexandria'] ${
                    isLight ? 'text-violet-950' : 'text-violet-200'
                  }`}
                >
                  {isAr ? 'ملفي والتحكم الشخصي بالبيانات' : 'My Profile & Personal Data Control'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    toggleLanguage();
                  }}
                  className={`px-2 py-1 rounded-lg border text-[11px] font-bold cursor-pointer flex items-center gap-1 ${
                    isLight
                      ? 'bg-white border-slate-200 text-sky-700'
                      : 'bg-slate-900 border-white/10 text-sky-300'
                  }`}
                >
                  <Languages className="w-3 h-3" />
                  <span>{isAr ? 'EN' : 'AR'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    toggleTheme();
                  }}
                  className={`px-2 py-1 rounded-lg border text-[11px] font-bold cursor-pointer flex items-center gap-1 ${
                    isLight
                      ? 'bg-white border-slate-200 text-amber-700'
                      : 'bg-slate-900 border-white/10 text-amber-300'
                  }`}
                >
                  {theme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onOpenUserDashboard();
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-rose-600 hover:from-violet-500 hover:to-rose-500 text-white font-extrabold text-xs transition cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>{isAr ? 'فتح لوحة ملفي وسجلاتي' : 'Open My Profile & Dossier'}</span>
              </button>

              {!confirmDelete && !deleteSuccess && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setConfirmDelete(true);
                  }}
                  className={`px-3 py-2 rounded-xl border font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                    isLight
                      ? 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700'
                      : 'bg-rose-500/15 hover:bg-rose-500/25 border-rose-500/35 text-rose-300'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  <span>{isAr ? 'حذف بياناتي نهائياً' : 'Delete Data Permanently'}</span>
                </button>
              )}
            </div>

            {deleteSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  {isAr
                    ? 'تم مسح جميع بياناتك وسجلاتك المحلية والسحابية نهائياً.'
                    : 'All local and cloud records have been permanently deleted.'}
                </span>
              </div>
            )}

            {confirmDelete && (
              <div
                className={`p-3 rounded-xl border space-y-2 ${
                  isLight
                    ? 'bg-rose-50 border-rose-300 text-rose-950'
                    : 'bg-rose-950/60 border-rose-500/50 text-rose-100'
                }`}
              >
                <div className="flex items-start gap-2 text-[11px] leading-relaxed">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    {isAr
                      ? 'تأكيد الحذف النهائي: سيتم مسح ملفك الشخصي وجميع نتائج اختباراتك من المتصفح والسحابة فوراً دون إمكانية الاسترجاع.'
                      : 'Confirm permanent deletion: Your profile and all test records will be immediately erased from browser and cloud storage.'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={handlePermanentDelete}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs cursor-pointer"
                  >
                    {isDeleting
                      ? isAr
                        ? 'جاري المسح...'
                        : 'Deleting...'
                      : isAr
                      ? 'تأكيد الحذف النهائي'
                      : 'Confirm Permanent Delete'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      isLight
                        ? 'bg-white border border-slate-300 text-slate-700'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {isAr ? 'تراجع' : 'Cancel'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main 4-Column Grid: The 3 Primary Pathways + Essential Legal & Governance Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-start">
          {/* COLUMN 1 — المسار الأول: استكشف ذاتك (Explore Yourself) */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                  isLight
                    ? 'bg-purple-50 border-purple-200 text-purple-700'
                    : 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                }`}
              >
                <Brain className="w-4 h-4" />
              </div>
              <h4
                className={`font-black text-sm font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr ? '١. استكشف ذاتك' : '1. Explore Yourself'}
              </h4>
            </div>
            <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {isAr
                ? 'مقاييس الشخصية المعتمدة وبطاريات الذكاءات المتعددة والقدرات المعرفية الموثقة بمراجع APA.'
                : 'Validated personality inventories and multi-modal intelligence batteries documented with APA citations.'}
            </p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('personality-tests')}
                  className={`transition cursor-pointer flex items-center gap-2 font-bold ${
                    currentPage === 'personality-tests'
                      ? 'text-purple-500'
                      : isLight
                      ? 'text-slate-700 hover:text-purple-600'
                      : 'text-slate-200 hover:text-purple-300'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>
                    {isAr
                      ? 'مختبر مقاييس الشخصية (MBTI & Big Five)'
                      : 'Personality Lab (MBTI & Big Five)'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    onOpenIntelligenceTests();
                  }}
                  className={`transition cursor-pointer flex items-center gap-2 font-bold ${
                    isLight
                      ? 'text-slate-700 hover:text-cyan-600'
                      : 'text-slate-200 hover:text-cyan-300'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  <span>
                    {isAr
                      ? 'مختبر اختبارات الذكاء (Gardner & Raven IQ)'
                      : 'Intelligence Batteries (Gardner & Raven IQ)'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    onOpenPsychologyTests();
                  }}
                  className={`transition cursor-pointer flex items-center gap-2 font-bold ${
                    isLight
                      ? 'text-slate-700 hover:text-indigo-600'
                      : 'text-slate-200 hover:text-indigo-300'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>
                    {isAr
                      ? 'المقاييس المتخصصة (16PF • آيزنك • التعلق)'
                      : 'Specialized Scales (16PF • Eysenck • ECR-R)'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    onOpenHistory();
                  }}
                  className={`transition cursor-pointer flex items-center gap-2 ${
                    isLight
                      ? 'text-slate-600 hover:text-violet-600'
                      : 'text-slate-300 hover:text-violet-300'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                  <span>
                    {isAr
                      ? 'سجل وتطور اختباراتي وتصدير PDF'
                      : 'Longitudinal Test History & PDF Export'}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 2 — المسار الثاني: اكتشف التوافق (Discover Compatibility) */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                  isLight
                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                    : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                }`}
              >
                <Heart className="w-4 h-4" />
              </div>
              <h4
                className={`font-black text-sm font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr ? '٢. اكتشف التوافق' : '2. Discover Compatibility'}
              </h4>
            </div>
            <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {isAr
                ? 'كاشف التوافق الفكري والعاطفي وتجربة اللقاء الأعمى التفاعلي (The Blind Date) خلف الستار.'
                : 'Psychometric partner compatibility calculator and progressive curtain-drop dialogue in The Blind Date.'}
            </p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    onNavigatePage('home');
                    onResetHome();
                  }}
                  className={`transition cursor-pointer flex items-center gap-2 font-bold ${
                    currentPage === 'home'
                      ? 'text-rose-500'
                      : isLight
                      ? 'text-slate-700 hover:text-rose-600'
                      : 'text-slate-200 hover:text-rose-300'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>
                    {isAr
                      ? 'كاشف التوافق وحاسبة الشريك المثالي'
                      : 'Partner Compatibility Detector'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    onOpenBlindDate();
                  }}
                  className={`transition cursor-pointer flex items-center gap-2 font-bold ${
                    isLight
                      ? 'text-slate-700 hover:text-pink-600'
                      : 'text-slate-200 hover:text-pink-300'
                  }`}
                >
                  <MessageCircle className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                  <span>
                    {isAr
                      ? 'تجربة اللقاء الأعمى (The Blind Date)'
                      : 'The Blind Date Interactive Stage'}
                  </span>
                </button>
              </li>
              {onOpenCoupleInvite && (
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      onOpenCoupleInvite();
                    }}
                    className={`transition cursor-pointer flex items-center gap-2 ${
                      isLight
                        ? 'text-slate-600 hover:text-emerald-600'
                        : 'text-slate-300 hover:text-emerald-300'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>
                      {isAr
                        ? 'اختبار التوافق المزدوج مع الشريك'
                        : 'Dual Couple Compatibility Invite'}
                    </span>
                  </button>
                </li>
              )}
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('how-it-works')}
                  className={`transition cursor-pointer flex items-center gap-2 ${
                    currentPage === 'how-it-works'
                      ? 'text-sky-500 font-bold'
                      : isLight
                      ? 'text-slate-600 hover:text-sky-600'
                      : 'text-slate-300 hover:text-sky-300'
                  }`}
                >
                  <Info className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span>
                    {isAr
                      ? 'كيف تعمل خوارزمية التوافق؟'
                      : 'How the Compatibility Engine Works'}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3 — المسار الثالث: هدية الواحة المعرفية والمقالات والروايات */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                  isLight
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                }`}
              >
                <BookOpen className="w-4 h-4" />
              </div>
              <h4
                className={`font-black text-sm font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr
                  ? '٣. هدية الواحة المعرفية والمقالات والروايات'
                  : '3. Knowledge Oasis: Articles & Novels'}
              </h4>
            </div>
            <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {isAr
                ? 'موسوعة المقالات الإكلينيكية والأبحاث المحكّمة، ومكتبة الروايات الأدبية والتحقيقات والخيال العلمي.'
                : 'Clinical psychology encyclopedia, peer-reviewed research papers, and multi-genre literary novels.'}
            </p>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('articles')}
                  className={`transition cursor-pointer flex items-center gap-2 font-bold ${
                    currentPage === 'articles'
                      ? 'text-emerald-500'
                      : isLight
                      ? 'text-slate-700 hover:text-emerald-600'
                      : 'text-slate-200 hover:text-emerald-300'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>
                    {isAr
                      ? 'موسوعة المقالات والأبحاث المحكّمة'
                      : 'Articles & Peer-Reviewed Research'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('novels')}
                  className={`transition cursor-pointer flex items-center gap-2 font-bold ${
                    currentPage === 'novels' ||
                    currentPage === 'novel-detail' ||
                    currentPage === 'chapter-reader'
                      ? 'text-amber-500'
                      : isLight
                      ? 'text-slate-700 hover:text-amber-600'
                      : 'text-slate-200 hover:text-amber-300'
                  }`}
                >
                  <Feather className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>
                    {isAr
                      ? 'مكتبة الروايات الأدبية والتحقيقات'
                      : 'Novels & Forensic Thrillers Library'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('methodology')}
                  className={`transition cursor-pointer flex items-center gap-2 ${
                    currentPage === 'methodology'
                      ? 'text-indigo-500 font-bold'
                      : isLight
                      ? 'text-slate-600 hover:text-indigo-600'
                      : 'text-slate-300 hover:text-indigo-300'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>
                    {isAr
                      ? 'المنهجية العلمية والمصادر (APA)'
                      : 'Scientific Methodology & APA Sources'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('faq')}
                  className={`transition cursor-pointer flex items-center gap-2 ${
                    currentPage === 'faq'
                      ? 'text-purple-500 font-bold'
                      : isLight
                      ? 'text-slate-600 hover:text-purple-600'
                      : 'text-slate-300 hover:text-purple-300'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>
                    {isAr ? 'الأسئلة الشائعة (FAQ)' : 'Frequently Asked Questions (FAQ)'}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 4 — الصفحات القانونية، الخصوصية، والتواصل */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                  isLight
                    ? 'bg-sky-50 border-sky-200 text-sky-700'
                    : 'bg-sky-500/15 border-sky-500/30 text-sky-300'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4
                className={`font-black text-sm font-['Alexandria'] ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isAr ? 'الحوكمة والصفحات القانونية' : 'Governance & Legal Pages'}
              </h4>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('about')}
                  className={`transition cursor-pointer flex items-center gap-2 ${
                    currentPage === 'about'
                      ? 'text-purple-500 font-bold'
                      : isLight
                      ? 'text-slate-700 hover:text-slate-900'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{isAr ? 'من نحن (About Us)' : 'About Us'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('privacy')}
                  className={`transition cursor-pointer flex items-center gap-2 ${
                    currentPage === 'privacy'
                      ? 'text-emerald-500 font-bold'
                      : isLight
                      ? 'text-slate-700 hover:text-slate-900'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{isAr ? 'سياسة الخصوصية (Privacy Policy)' : 'Privacy Policy'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('terms')}
                  className={`transition cursor-pointer flex items-center gap-2 ${
                    currentPage === 'terms'
                      ? 'text-cyan-500 font-bold'
                      : isLight
                      ? 'text-slate-700 hover:text-slate-900'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{isAr ? 'شروط الاستخدام (Terms of Service)' : 'Terms of Service'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('disclaimer')}
                  className={`transition cursor-pointer flex items-center gap-2 ${
                    currentPage === 'disclaimer'
                      ? 'text-amber-500 font-bold'
                      : isLight
                      ? 'text-slate-700 hover:text-slate-900'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{isAr ? 'إخلاء المسؤولية القانوني والعلمي' : 'Legal & Clinical Disclaimer'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigatePage('contact')}
                  className={`transition cursor-pointer flex items-center gap-2 font-bold ${
                    currentPage === 'contact'
                      ? 'text-sky-500'
                      : isLight
                      ? 'text-sky-700 hover:text-sky-900'
                      : 'text-sky-300 hover:text-sky-200'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>{isAr ? 'اتصل بنا (Contact Us)' : 'Contact Us'}</span>
                </button>
              </li>
              {isOwner && (
                <li className="pt-1">
                  <button
                    type="button"
                    onClick={() => onNavigatePage('admin-cms')}
                    className="text-amber-500 hover:text-amber-400 font-bold transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>🛡️ {isAr ? 'مركز إدارة المحتوى و AdSense' : 'CMS & AdSense Center'}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Mandatory Legal & Scientific Disclaimer Banner */}
        <div
          className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
            isLight
              ? 'bg-amber-50/90 border-amber-200 text-amber-950'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
          }`}
        >
          <span className="text-base shrink-0">⚠️</span>
          <div className="space-y-0.5 leading-relaxed">
            <span className="font-bold block">
              {isAr
                ? 'تنبيه قانوني واستشاري إلزامي:'
                : 'Mandatory Legal & Educational Disclaimer:'}
            </span>
            <p className={`text-[11px] ${isLight ? 'text-amber-900/90' : 'text-slate-300'}`}>
              {isAr
                ? 'النتائج، والمقاييس، والتقارير، والتحليلات المقدمة داخل موقع «مرآة القلوب» هي لأغراض معرفية وتثقيفية واستكشافية فقط، وليست استشارات نفسية أو قانونية أو طبية أو مهنية مرخصة، ولا تمثل بأي حال من الأحوال ضماناً لنجاح أو استمرار أي علاقة أو ارتباط.'
                : 'The results, assessments, and reports provided within Mirror of Hearts are strictly for educational, informational, and self-reflection purposes. They do not constitute licensed psychological, clinical, legal, or medical counseling.'}
            </p>
          </div>
        </div>

        {/* Global Google AdSense Responsive Footer Banner */}
        <div className="pt-1">
          <AdSenseBanner slot="3456789012" format="auto" />
        </div>

        {/* Bottom Copyright & Security Status Bar */}
        <div
          className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] ${
            isLight ? 'border-slate-200 text-slate-500' : 'border-white/5 text-slate-400'
          }`}
        >
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span>{t('footer_rights')}</span>
            <span>•</span>
            <span>{isAr ? 'تشفير قياسي TLS 1.3' : 'TLS 1.3 Encrypted'}</span>
            <span>•</span>
            <span>Google Cloud Platform (Europe-West1)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-500 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{t('cloud_status')}</span>
            </span>
            <span>{t('ssl_verified')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
