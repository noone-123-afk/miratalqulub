import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserProfile, Gender } from '../types';
import {
  COUNTRIES_LIST,
  ETHNICITY_OPTIONS,
  EDUCATION_LEVELS,
  LIFESTYLE_OUTLOOKS,
} from '../data/questions';
import { soundManager } from '../utils/sound';
import {
  Sparkles,
  Heart,
  ChevronDown,
  Check,
  GraduationCap,
  Users2,
  ShieldCheck,
  BookOpen,
  Calendar,
  Database,
  History,
} from 'lucide-react';
import { getGenerationalCohort } from '../utils/socioculturalScience';
import { WebsiteTabKey } from './WebsiteSectionsModal';
import { useLanguage } from '../context/LanguageContext';
import { BehindTheScenesSection } from './BehindTheScenesSection';

interface Props {
  onStart: (profile: UserProfile) => void;
  initialProfile?: UserProfile | null;
  savedTestsCount?: number;
  onOpenSavedHistory?: () => void;
  onOpenBlindDate?: () => void;
  onOpenDomainHosting?: () => void;
  onOpenWebsiteSection?: (tab?: WebsiteTabKey) => void;
  onOpenPsychologyTests?: () => void;
  onOpenIntelligenceTests?: () => void;
  onOpenUserDashboard?: () => void;
  onOpenArticles?: () => void;
  onOpenNovels?: () => void;
  onOpenContactFeedback?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const ProfileStep: React.FC<Props> = ({
  onStart,
  initialProfile,
  savedTestsCount = 0,
  onOpenSavedHistory,
  onOpenBlindDate,
  onOpenDomainHosting,
  onOpenWebsiteSection,
  onOpenPsychologyTests,
  onOpenIntelligenceTests,
  onOpenUserDashboard,
  onOpenArticles,
  onOpenNovels,
  onOpenContactFeedback,
}) => {
  const { language, direction, isRTL, t } = useLanguage();
  const [userGender, setUserGender] = useState<Gender>(initialProfile?.userGender || 'male');
  const [partnerGender, setPartnerGender] = useState<Gender>(initialProfile?.partnerGender || 'female');
  const [userAge, setUserAge] = useState<number>(initialProfile?.userAge || 26);
  const [userName, setUserName] = useState<string>(initialProfile?.userName || '');
  const [country, setCountry] = useState<string>(initialProfile?.country || 'المملكة العربية السعودية');
  const [ethnicity, setEthnicity] = useState<string>(initialProfile?.ethnicity || 'عربي خليجي');
  const [educationLevel, setEducationLevel] = useState<string>(initialProfile?.educationLevel || EDUCATION_LEVELS[0]);
  const [lifestyleOutlook, setLifestyleOutlook] = useState<string>(initialProfile?.lifestyleOutlook || LIFESTYLE_OUTLOOKS[0]);
  const [partnerFeaturesPreference, setPartnerFeaturesPreference] = useState<string>(initialProfile?.partnerFeaturesPreference || '');
  const [userBirthDate, setUserBirthDate] = useState<string>(initialProfile?.userBirthDate || '1998-05-15');
  const [activeHubTab, setActiveHubTab] = useState<
    'all' | 'compatibility' | 'blind_date' | 'psychology' | 'intelligence' | 'articles' | 'novels' | 'behind_scenes'
  >('all');

  useEffect(() => {
    if (initialProfile) {
      if (initialProfile.userGender) setUserGender(initialProfile.userGender);
      if (initialProfile.partnerGender) setPartnerGender(initialProfile.partnerGender);
      if (initialProfile.userAge) setUserAge(initialProfile.userAge);
      if (initialProfile.userName !== undefined) setUserName(initialProfile.userName);
      if (initialProfile.country) setCountry(initialProfile.country);
      if (initialProfile.ethnicity) setEthnicity(initialProfile.ethnicity);
      if (initialProfile.educationLevel) setEducationLevel(initialProfile.educationLevel);
      if (initialProfile.lifestyleOutlook) setLifestyleOutlook(initialProfile.lifestyleOutlook);
      if (initialProfile.partnerFeaturesPreference !== undefined) {
        setPartnerFeaturesPreference(initialProfile.partnerFeaturesPreference);
      }
      if (initialProfile.userBirthDate) setUserBirthDate(initialProfile.userBirthDate);
    }
  }, [initialProfile]);

  const previewCohort = getGenerationalCohort(userBirthDate, userAge);

  const handleUserGenderSelect = (gender: Gender) => {
    soundManager.playTap();
    setUserGender(gender);
    if (gender === 'male') {
      setPartnerGender('female');
    } else {
      setPartnerGender('male');
    }
  };

  const handleCountryChange = (countryName: string) => {
    soundManager.playTap();
    setCountry(countryName);
    const found = COUNTRIES_LIST.find((c) => c.name === countryName);
    if (found && found.defaultEthnicity) {
      setEthnicity(found.defaultEthnicity);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playNext();
    onStart({
      userGender,
      partnerGender,
      userAge,
      userName: userName.trim() || undefined,
      userBirthDate: userBirthDate || undefined,
      country,
      ethnicity,
      educationLevel,
      lifestyleOutlook,
      partnerFeaturesPreference: partnerFeaturesPreference.trim() || undefined,
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto px-4 py-6 text-white"
      dir={direction}
    >
      {/* Engineering Oversight and Official Trust Banner */}
      <motion.div
        variants={itemVariants}
        className="mb-6 p-3.5 sm:p-4 rounded-3xl bg-slate-900/90 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-right shadow-md"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-950/70 border border-blue-500/50 flex items-center justify-center text-blue-300 shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold text-white font-['Alexandria']">
                الموقع مشرف عليه ومُدار بواسطة مجموعة من المهندسين المتخصصين
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900/80 text-blue-200 border border-blue-400/40 font-bold">
                الأردن - عمّان • إدارة معتمدة
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-1 leading-relaxed">
              تواصل واستفسارات وملاحظات عبر البريد المعتمد حصرياً: <span className="font-mono font-bold text-white underline select-all">one497303@gmail.com</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 text-[11px] text-slate-300 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>تشفير TLS 1.3 معتمد</span>
        </div>
      </motion.div>

      {/* Hero Banner with Framer Motion */}
      <motion.div variants={itemVariants} className="text-center mb-6 relative p-5 rounded-3xl bg-slate-900/80 border border-slate-800">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-200 text-xs font-semibold mb-3 shadow-sm">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>{language === 'ar' ? 'منظومة التوافق الفكري والاجتماعي وعلم النفس التطبيقي' : 'Behavioral & Sociological Compatibility Framework'}</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2.5 font-['Alexandria',sans-serif]">
          {t('hero_title_1')} <span className="text-blue-400">{t('hero_title_highlight')}</span>
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          {t('hero_subtitle')}
        </p>

        {/* Smart Hub Tabs Bar (Reduces long scrolling) */}
        <div className="mt-6 mb-4 flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto py-1.5 px-2 rounded-2xl bg-slate-950/90 border border-slate-800 scrollbar-none">
          {[
            { id: 'all', label: 'جميع الأقسام', icon: '✨' },
            { id: 'behind_scenes', label: 'عن الموقع وفريق العمل', icon: '👥', badge: 'إشراف هندسي' },
            { id: 'intelligence', label: 'اختبارات الذكاء', icon: '💡', badge: 'جديد' },
            { id: 'compatibility', label: 'كاشف التوافق', icon: '🔮' },
            { id: 'blind_date', label: 'The Blind Date', icon: '💬' },
            { id: 'psychology', label: 'مقاييس الشخصية', icon: '🧠' },
            { id: 'articles', label: 'المقالات النفسية', icon: '📚' },
            { id: 'novels', label: 'الروايات والتحقيقات', icon: '🕵️‍♂️' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                soundManager.playTap();
                setActiveHubTab(tab.id as any);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeHubTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-950 text-blue-200 border border-blue-500/30">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Cards Grid Based on Smart Tab */}
        {(activeHubTab === 'all' || activeHubTab !== 'compatibility') && (
          <div className={`mt-4 text-right ${
            activeHubTab === 'all'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3'
              : 'max-w-xl mx-auto'
          }`}>
            {/* Behind the scenes standalone tab */}
            {activeHubTab === 'behind_scenes' && (
              <BehindTheScenesSection
                onExploreTests={onOpenIntelligenceTests}
                onExploreNovels={onOpenNovels}
                onOpenContactFeedback={onOpenContactFeedback}
              />
            )}

            {/* Card 1: The Blind Date */}
            {(activeHubTab === 'all' || activeHubTab === 'blind_date') && onOpenBlindDate && (
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-3.5 sm:p-4 rounded-3xl bg-slate-950/90 border border-red-900/50 flex flex-col justify-between space-y-3 shadow-md hover:border-red-600 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-red-950/70 border border-red-800/60 flex items-center justify-center text-lg sm:text-xl shadow-sm text-red-300">
                      💬
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-red-950/70 text-red-200 text-[10px] font-bold border border-red-800/60">
                      لقاء تفاعلي 🌟
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-white font-['Alexandria']">
                    The Blind Date
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    4 مراحل أسئلة متبادلة وتقييم إجابات الشريك خلف الستار، حتى لحظة القرار للدردشة المفتوحة.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    onOpenBlindDate();
                  }}
                  className="w-full py-2.5 px-3 rounded-2xl bg-red-700 hover:bg-red-600 text-white text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>بدء The Blind Date</span>
                  <span>💬</span>
                </button>
              </motion.div>
            )}

            {/* Card 2: Multiple Intelligences Assessment Suite */}
            {(activeHubTab === 'all' || activeHubTab === 'intelligence') && (
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`p-3.5 sm:p-4 rounded-3xl bg-slate-950/90 border border-blue-900/50 flex flex-col justify-between space-y-3 shadow-md hover:border-blue-500 transition ${
                  activeHubTab === 'intelligence' ? 'p-5 sm:p-6 border-blue-500' : ''
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-blue-950/70 border border-blue-800/60 flex items-center justify-center text-lg sm:text-xl shadow-sm text-blue-300">
                      💡
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-blue-950/70 text-blue-200 text-[10px] font-bold border border-blue-800/60">
                      4 بطاريات • 135 سؤالاً 🧠
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-white font-['Alexandria']">
                    مختبر اختبارات الذكاء العلمي
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    4 بطاريات محكّمة: الذكاءات المتعددة الـ 9 (45 سؤالاً)، مصفوفات رافن IQ (30 سؤالاً)، الذكاء العاطفي EQ (30 سؤالاً)، والقدرات المعرفية CogAT (30 سؤالاً).
                  </p>
                  {activeHubTab === 'intelligence' && (
                    <div className="pt-2 text-xs text-slate-200 space-y-1 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                      <p>⏱️ حفظ تلقائي فوري للإجابات وتصحيح معياري دقيق.</p>
                      <p>📊 مصفوفات بصرية SVG أصلية + مقاييس ليكرت ومواقف سلوكية.</p>
                      <p>🕸️ رسم راداري تفاعلي + تصدير التقرير العلمي بصيغة PDF.</p>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    if (onOpenIntelligenceTests) {
                      onOpenIntelligenceTests();
                    }
                  }}
                  className="w-full py-2.5 px-3 rounded-2xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>بدء اختبار الذكاء الآن</span>
                  <span>💡</span>
                </button>
              </motion.div>
            )}

            {/* Card 3: Scientific Personality Assessment Suite */}
            {(activeHubTab === 'all' || activeHubTab === 'psychology') && (
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-3.5 sm:p-4 rounded-3xl bg-slate-950/90 border border-slate-700 flex flex-col justify-between space-y-3 shadow-md hover:border-slate-500 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg sm:text-xl shadow-sm text-slate-200">
                      🧠
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 text-[10px] font-bold border border-emerald-800/60">
                      20-32 سؤالاً لكل مقياس 🔬
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-white font-['Alexandria']">
                    مقاييس تحليل الشخصية
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    8 مقاييس عالمية محكّمة (Big Five IPIP-NEO, 16PF, MBTI, رورشاخ، ستانفورد-بينيه، التعلق ECR-R، غوتمان) مع تقرير PDF.
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  {onOpenPsychologyTests && (
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playTap();
                        onOpenPsychologyTests();
                      }}
                      className="flex-1 py-2 px-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition border border-slate-700 cursor-pointer"
                    >
                      خوض اختبار 🔬
                    </button>
                  )}
                  {onOpenUserDashboard && (
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playTap();
                        onOpenUserDashboard();
                      }}
                      className="py-2 px-2.5 rounded-2xl bg-slate-800/60 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition cursor-pointer"
                      title="لوحة ملفي والمتوافقين"
                    >
                      👤 ملفي
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* Card 4: Articles & Applied Psychology Encyclopedia */}
            {(activeHubTab === 'all' || activeHubTab === 'articles') && (
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-3.5 sm:p-4 rounded-3xl bg-slate-950/90 border border-emerald-900/50 flex flex-col justify-between space-y-3 shadow-md hover:border-emerald-500 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-950/70 border border-emerald-800/60 flex items-center justify-center text-lg sm:text-xl shadow-sm text-emerald-300">
                      📚
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-200 text-[10px] font-bold border border-emerald-800/60">
                      علوم تطبيقية 📖
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-white font-['Alexandria']">
                    مقالات العلاقات والنفس
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    أبحاث متخصصة في التوافق الزوجي، إدارة الخلافات، الذكاء العاطفي، وتنمية الذات والنضج النفسي.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    if (onOpenArticles) {
                      onOpenArticles();
                    } else if (onOpenWebsiteSection) {
                      onOpenWebsiteSection('articles');
                    }
                  }}
                  className="w-full py-2.5 px-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>تصفح المقالات العلمية</span>
                  <span>📚</span>
                </button>
              </motion.div>
            )}

            {/* Card 5: Suspense & Thriller Novels Section */}
            {(activeHubTab === 'all' || activeHubTab === 'novels') && (
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-3.5 sm:p-4 rounded-3xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between space-y-3 shadow-md hover:border-slate-600 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-lg sm:text-xl shadow-sm text-slate-200">
                      🕵️‍♂️
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-200 text-[10px] font-bold border border-slate-700">
                      تشويق وأكشن 🔍
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-white font-['Alexandria']">
                    الروايات والتحقيقات
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    روايات طويلة بأسلوب محقق جنائي خبير، مسارح الجرائم، الأدلة الميكروسكوبية، أكشن وخيال علمي.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    if (onOpenNovels) {
                      onOpenNovels();
                    }
                  }}
                  className="w-full py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>دخول واحة الروايات</span>
                  <span>🕵️‍♂️</span>
                </button>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>

      {/* Main Profile Form Wrapper */}
      <div className="max-w-2xl mx-auto">
        {(activeHubTab === 'all' || activeHubTab === 'compatibility') && (
          <form onSubmit={handleSubmit} className="space-y-6">
        {/* Persistent Cloud Database Status & Returning Visitor/User Bar */}
        <motion.div
          variants={itemVariants}
          className="p-4 rounded-3xl bg-gradient-to-l from-emerald-950/60 via-slate-900/90 to-blue-950/60 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md"
        >
          <div className="flex items-center gap-3 text-right">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-extrabold text-white font-['Alexandria']">
                  قاعدة البيانات السحابية الدائمة مفعّلة للزوار والمستخدمين
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                  {initialProfile ? 'تم استرجاع بياناتك تلقائياً ✓' : 'حفظ تلقائي مستمر'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                تُحفظ بياناتك ونتائج جميع اختباراتك تلقائياً في قاعدة البيانات لتتمكن من العودة إليها في كل زيارة.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
            {onOpenSavedHistory && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onOpenSavedHistory();
                }}
                className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-emerald-600/25 hover:bg-emerald-600/40 text-emerald-200 border border-emerald-400/40 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <History className="w-3.5 h-3.5" />
                <span>سجل نتائجي المحفوظة {savedTestsCount > 0 ? `(${savedTestsCount})` : ''}</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Gender Selection */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4"
        >
          <label className="block text-sm font-bold text-white">
            بياناتك الشخصية: <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="button"
              onClick={() => handleUserGenderSelect('male')}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition duration-200 border text-center cursor-pointer ${
                userGender === 'male'
                  ? 'bg-blue-900/60 border-blue-500 text-white shadow-md'
                  : 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200'
              }`}
            >
              <span className="text-3xl">👨</span>
              <span className="font-extrabold text-base">أنا شاب (ذكر)</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="button"
              onClick={() => handleUserGenderSelect('female')}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition duration-200 border text-center cursor-pointer ${
                userGender === 'female'
                  ? 'bg-red-900/60 border-red-500 text-white shadow-md'
                  : 'bg-slate-900 border-slate-700 hover:bg-slate-800 text-slate-200'
              }`}
            >
              <span className="text-3xl">👩</span>
              <span className="font-extrabold text-base">أنا فتاة (أنثى)</span>
            </motion.button>
          </div>

          {/* Looking for Partner */}
          <div className="pt-2 border-t border-slate-700">
            <label className="block text-sm font-bold text-white mb-2">
              شريك الحياة المطلوب دراسة التوافق معه: <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  setPartnerGender('female');
                }}
                className={`py-2.5 px-4 rounded-xl text-sm font-bold border flex items-center justify-center gap-2 transition cursor-pointer ${
                  partnerGender === 'female'
                    ? 'bg-red-900/60 border-red-500 text-white shadow-sm'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <span>فتاة / امرأة 👰</span>
                {partnerGender === 'female' && <Check className="w-4 h-4 text-emerald-400" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  setPartnerGender('male');
                }}
                className={`py-2.5 px-4 rounded-xl text-sm font-bold border flex items-center justify-center gap-2 transition cursor-pointer ${
                  partnerGender === 'male'
                    ? 'bg-blue-900/60 border-blue-500 text-white shadow-sm'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <span>شاب / رجل 🤵</span>
                {partnerGender === 'male' && <Check className="w-4 h-4 text-emerald-400" />}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Name and Age */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-200 mb-1.5">
                اسمك الكريم أو لقبك (لتخصيص تقرير التوافق):
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="مثلاً: فيصل، سارة، أحمد..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-400 text-sm"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-bold text-gray-200">عمرك الحالي:</label>
                <span className="text-sm font-extrabold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
                  {userAge} عاماً
                </span>
              </div>
              <input
                type="range"
                min="18"
                max="65"
                value={userAge}
                onChange={(e) => setUserAge(Number(e.target.value))}
                className="w-full accent-rose-500 h-2 bg-white/10 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>18</span>
                <span>28</span>
                <span>42</span>
                <span>65+</span>
              </div>
            </div>
          </div>

          {/* Birth date for Real Demographic & Generational Sociological Fit */}
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-bold text-gray-200 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>تاريخ ميلادك (الفئة العمرية والجيل الاجتماعي ومرحلة النضج):</span>
              </label>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-xs text-emerald-200 font-bold">
                <span>{previewCohort.cohortName}</span>
                <span className="text-[10px] text-cyan-300">({previewCohort.birthYearRange})</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={userBirthDate}
                onChange={(e) => {
                  soundManager.playTap();
                  setUserBirthDate(e.target.value);
                }}
                className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-400 text-sm cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              يُستخدم لتحديد الجيل الديموغرافي ومطابقة التوافق القيمي والثقافي الحقيقي مع شريك حياتك وفق دراسات علم الاجتماع الأسري.
            </p>
          </div>
        </motion.div>

        {/* Scientific Dimensions: Education & Lifestyle */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4"
        >
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <GraduationCap className="w-4 h-4" />
            <span>المستوى التعليمي والفكري:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {EDUCATION_LEVELS.map((level) => {
              const isSelected = educationLevel === level;
              return (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  key={level}
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setEducationLevel(level);
                  }}
                  className={`p-3 rounded-xl border text-right transition flex items-center justify-between text-xs cursor-pointer ${
                    isSelected
                      ? 'bg-rose-500/20 border-rose-400 text-white shadow-sm'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span>{level}</span>
                  {isSelected && <Check className="w-4 h-4 text-rose-400 shrink-0 mr-1.5" />}
                </motion.button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 text-violet-400 font-bold text-sm mb-2">
              <Users2 className="w-4 h-4" />
              <span>البيئة الاجتماعية والتطلعات الأسرية المفضلة:</span>
            </div>
            <div className="space-y-2">
              {LIFESTYLE_OUTLOOKS.map((outlook) => {
                const isSelected = lifestyleOutlook === outlook;
                return (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    key={outlook}
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      setLifestyleOutlook(outlook);
                    }}
                    className={`w-full p-3 rounded-xl border text-right transition flex items-center justify-between text-xs cursor-pointer ${
                      isSelected
                        ? 'bg-violet-500/20 border-violet-400 text-white shadow-sm'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{outlook}</span>
                    {isSelected && <Check className="w-4 h-4 text-violet-400 shrink-0 mr-2" />}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Country & Ethnicity */}
        <motion.div
          variants={itemVariants}
          className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4"
        >
          <div>
            <label className="block text-sm font-bold text-gray-200 mb-1.5">
              بلدك وجنسيتك الحالية: <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <select
                value={country}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#161226] border border-white/15 text-white appearance-none focus:outline-none focus:border-rose-400 text-sm cursor-pointer pr-4 pl-10"
              >
                {COUNTRIES_LIST.map((c) => (
                  <option key={c.code} value={c.name} className="bg-[#161226] text-white py-1">
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              يُستخدم لاقتراح الاسم الأكثر ملاءمة لثقافة بلدك ومطابقة التقاليد الاجتماعية.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-200 mb-1.5">
              الأصول العرقية والملامح المطلوبة للشريك: <span className="text-rose-400">*</span>
            </label>
            <div className="space-y-2">
              {ETHNICITY_OPTIONS.map((item) => {
                const isSelected = ethnicity === item.tag || ethnicity.includes(item.tag);
                return (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    key={item.id}
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      setEthnicity(item.tag);
                    }}
                    className={`w-full p-3 rounded-xl border text-right transition flex items-center justify-between text-xs sm:text-sm cursor-pointer ${
                      isSelected
                        ? 'bg-rose-500/20 border-rose-400 text-white shadow-sm'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-rose-400 shrink-0 mr-2" />}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-200 mb-1.5">
              مواصفات تود التركيز عليها في ملامحه (اختياري):
            </label>
            <input
              type="text"
              value={partnerFeaturesPreference}
              onChange={(e) => setPartnerFeaturesPreference(e.target.value)}
              placeholder="مثال: عيون واسعة دافئة، ابتسامة ساحرة، هيبة ووقار، بشرة قمحية..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-400 text-sm"
            />
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          className="w-full py-4 px-6 rounded-2xl font-extrabold text-base sm:text-lg bg-blue-700 hover:bg-blue-600 text-white shadow-lg shadow-blue-900/30 flex items-center justify-center gap-3 transition cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span>بدء دراسة التوافق الفكري واكتشاف الشريك</span>
          <Heart className="w-5 h-5 fill-white text-white" />
        </motion.button>

        <motion.p
          variants={itemVariants}
          className="text-center text-xs text-slate-300 flex items-center justify-center gap-1.5"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>تحليل نفسي واجتماعي خاص ومشفر 100% مبني على معايير التوافق الأسري</span>
        </motion.p>
      </form>
      )}
      </div>

      {/* Behind The Scenes: Human Team & Philosophy Section (User Request) */}
      {(activeHubTab === 'all' || activeHubTab === 'behind_scenes') && (
        <BehindTheScenesSection
          onExploreTests={onOpenIntelligenceTests}
          onExploreNovels={onOpenNovels}
          onOpenContactFeedback={onOpenContactFeedback}
        />
      )}
    </motion.div>
  );
};
