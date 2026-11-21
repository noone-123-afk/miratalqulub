import React from 'react';
import {
  Wand2,
  MessageCircle,
  UserCheck,
  Radio,
  Brain,
  Compass,
  User,
  Home,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { PageSEO } from '../components/PageSEO';
import { soundManager } from '../utils/sound';

interface InteractiveToolsPageProps {
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
  onOpenBlindDate: () => void;
  onOpenCoupleInvite: () => void;
  onOpenLiveChat: () => void;
  onOpenPsychologyTests: () => void;
  onOpenOnboardingWizard: () => void;
}

export const InteractiveToolsPage: React.FC<InteractiveToolsPageProps> = ({
  onBackToHome,
  onNavigatePage,
  onOpenBlindDate,
  onOpenCoupleInvite,
  onOpenLiveChat,
  onOpenPsychologyTests,
  onOpenOnboardingWizard,
}) => {
  const { language, isRTL } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';

  const tools = [
    {
      id: 'blind_date',
      titleAr: 'تجربة اللقاء الأعمى التفاعلي (The Blind Date)',
      titleEn: 'The Blind Date Interactive Experience',
      descAr:
        'تجربة حوارية متدرجة من 4 مراحل لاختبار التوافق القيمي والفكري دون أحكام مظهرية مسبقة، مع تحليل انسجام النبرة والاستجابات.',
      descEn:
        'A 4-stage progressive dialogue experience testing core value alignment beyond surface appearance.',
      ctaAr: 'دخول تجربة اللقاء الأعمى',
      ctaEn: 'Launch Blind Date',
      icon: MessageCircle,
      gradient: 'from-rose-500 to-pink-600',
      onClick: onOpenBlindDate,
    },
    {
      id: 'couple_invite',
      titleAr: 'اختبار التوافق المزدوج مع الشريك (Couple Invite)',
      titleEn: 'Dual Couple Compatibility Assessment',
      descAr:
        'أنشئ رابط دعوة خاصاً ومشفراً لإرساله إلى شريك حياتك ومقارنة بصمتيكما السيكومترية في تقرير موحد.',
      descEn:
        'Generate an encrypted private invite link to compare responses directly with your partner.',
      ctaAr: 'إنشاء رابط دعوة الشريك',
      ctaEn: 'Create Partner Invite',
      icon: UserCheck,
      gradient: 'from-emerald-500 to-teal-600',
      onClick: onOpenCoupleInvite,
    },
    {
      id: 'specialized_scales',
      titleAr: 'مختبر المقاييس الإكلينيكية المتخصصة (16PF • EPQ • التعلق)',
      titleEn: 'Specialized Clinical Psychometric Scales (16PF • EPQ • Attachment)',
      descAr:
        '8 مقاييس نفسية معمقة تحسب درجات Sten المعيارية مع إمكانية استعراض التقرير المفصل وتصدير ملف PDF فوري.',
      descEn:
        '8 clinical scales computing standardized Sten scores with detailed reports and PDF export.',
      ctaAr: 'فتح مختبر المقاييس المتخصصة',
      ctaEn: 'Open Clinical Scales',
      icon: Brain,
      gradient: 'from-indigo-500 to-violet-600',
      onClick: onOpenPsychologyTests,
    },
    {
      id: 'live_radar',
      titleAr: 'الدردشة الفكرية والرادار التفاعلي المباشر',
      titleEn: 'Live Intellectual Dialogue & Interactive Radar',
      descAr:
        'مساحة حوارية مباشرة لاستكشاف التقارب الفكري وتبادل الآراء حول أسئلة العلاقات والحياة بخصوصية تامة.',
      descEn:
        'Real-time dialogue space for exploring intellectual resonance in total privacy.',
      ctaAr: 'فتح مساحة الحوار المباشر',
      ctaEn: 'Open Live Dialogue',
      icon: Radio,
      gradient: 'from-cyan-500 to-blue-600',
      onClick: onOpenLiveChat,
    },
    {
      id: 'onboarding_wizard',
      titleAr: 'معالج التوجيه الذكي — من أين أبدأ؟',
      titleEn: 'Smart Guided Compass Wizard',
      descAr:
        'أداة سريعة تقترح عليك الاختبار أو المقال أو الرواية الأنسب لاحتياجك النفسي أو العاطفي الحالي في ثوانٍ.',
      descEn:
        'Quick selector guiding you to the most fitting scale, research paper, or literary piece.',
      ctaAr: 'تشغيل معالج التوجيه',
      ctaEn: 'Start Compass Wizard',
      icon: Compass,
      gradient: 'from-amber-500 to-orange-600',
      onClick: onOpenOnboardingWizard,
    },
    {
      id: 'profile_hub',
      titleAr: 'لوحة ملفي السيكومتري وسجل النتائج',
      titleEn: 'Personal Psychometric Dossier & History',
      descAr:
        'استعرض خريطة تطورك عبر الزمن، وقارن نتائجك المحفوظة، وتحكم بشكل كامل في خصوصيتك أو حذف بياناتك فوراً.',
      descEn:
        'Review longitudinal progress, compare saved scores, and manage privacy or permanent deletion.',
      ctaAr: 'الانتقال إلى ملفي',
      ctaEn: 'Go to My Profile',
      icon: User,
      gradient: 'from-violet-600 to-purple-700',
      href: '/profile',
      onClick: () => onNavigatePage('profile'),
    },
  ];

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-10 space-y-8"
    >
      <PageSEO
        title={
          isAr
            ? 'الأدوات التفاعلية وتجربة The Blind Date | مرآة القلوب'
            : 'Interactive Psychometric Tools & The Blind Date | Mirror of Hearts'
        }
        description={
          isAr
            ? 'استكشف الأدوات التفاعلية في منصة مرآة القلوب: تجربة اللقاء الأعمى The Blind Date، اختبار التوافق المزدوج للشريكين، المقاييس الإكلينيكية المتخصصة 16PF، ومعالج التوجيه الذكي.'
            : 'Discover Mirror of Hearts Interactive Tools: The Blind Date experience, Dual Couple Invite, 16PF/EPQ clinical scales, live dialogue, and personal dossier.'
        }
        canonicalPath="/tools"
        language={language}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: isAr ? 'الأدوات التفاعلية | مرآة القلوب' : 'Interactive Tools | Mirror of Hearts',
          url: 'https://miratalqulub.com/tools',
          inLanguage: language,
        }}
      />

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            soundManager.playTap();
            onBackToHome();
          }}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold inline-flex items-center gap-1.5 border transition ${
            isLight
              ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
              : 'bg-white/5 hover:bg-white/10 text-gray-200 border-white/10'
          }`}
        >
          <Home className="w-3.5 h-3.5 text-violet-500" />
          <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
        </a>

        <a
          href="/compatibility"
          onClick={(e) => {
            e.preventDefault();
            soundManager.playTap();
            onNavigatePage('compatibility');
          }}
          className={`px-3.5 py-2 rounded-2xl text-xs font-bold inline-flex items-center gap-1.5 border transition ${
            isLight
              ? 'bg-rose-50 hover:bg-rose-100 text-rose-900 border-rose-200'
              : 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-200 border-rose-500/30'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAr ? 'كاشف شريك الحياة' : 'Compatibility Detector'}</span>
        </a>
      </div>

      {/* Hero Banner */}
      <header
        className={`p-6 sm:p-10 rounded-3xl border shadow-xl space-y-4 ${
          isLight
            ? 'bg-gradient-to-br from-violet-50 via-white to-rose-50/70 border-violet-200 text-slate-900'
            : 'bg-gradient-to-br from-slate-900/95 via-violet-950/25 to-slate-950 border-violet-500/25 text-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 text-white flex items-center justify-center shadow-lg shrink-0">
            <Wand2 className="w-6 h-6" />
          </div>
          <div>
            <span
              className={`text-[11px] font-extrabold tracking-wide uppercase block ${
                isLight ? 'text-violet-800' : 'text-violet-300'
              }`}
            >
              {isAr ? 'الخدمات الذكية والتجارب الحوارية المباشرة' : 'Smart Services & Interactive Experiences'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black font-['Alexandria']">
              {isAr ? 'الأدوات التفاعلية المتقدمة' : 'Interactive Platform Tools'}
            </h1>
          </div>
        </div>

        <p className={`text-sm sm:text-base leading-relaxed max-w-3xl ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          {isAr
            ? 'أدوات عملية مصممة لتجاوز القراءة النظرية إلى التجربة التطبيقية المباشرة: اختبر التوافق الثنائي مع شريكك، خض تجربة The Blind Date بأربع مراحل حوارية، أو استعن بالمقاييس السيكومترية الدقيقة.'
            : 'Practical interactive utilities turning psychometric theory into lived insight—from Dual Couple invites and The Blind Date to clinical scales and progress tracking.'}
        </p>
      </header>

      {/* Tools Grid */}
      <section aria-label={isAr ? 'قائمة الأدوات التفاعلية' : 'Interactive Tools List'} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((tool) => {
          const IconComp = tool.icon;
          return (
            <article
              key={tool.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between gap-5 transition-all duration-200 hover:-translate-y-0.5 ${
                isLight
                  ? 'bg-white border-slate-200 shadow-sm hover:border-violet-400'
                  : 'bg-slate-900/75 border-white/10 hover:border-violet-400/50'
              }`}
            >
              <div className="space-y-3">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${tool.gradient} text-white flex items-center justify-center shadow-md`}
                >
                  <IconComp className="w-6 h-6" />
                </div>

                <h2 className="text-base sm:text-lg font-black font-['Alexandria'] leading-snug">
                  {isAr ? tool.titleAr : tool.titleEn}
                </h2>

                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {isAr ? tool.descAr : tool.descEn}
                </p>
              </div>

              {tool.href ? (
                <a
                  href={tool.href}
                  onClick={(e) => {
                    e.preventDefault();
                    soundManager.playTap();
                    tool.onClick();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>{isAr ? tool.ctaAr : tool.ctaEn}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    tool.onClick();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-extrabold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>{isAr ? tool.ctaAr : tool.ctaEn}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default InteractiveToolsPage;
