import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile, Gender } from '../types';
import {
  COUNTRIES_LIST,
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
  User,
  Globe,
  MessageSquareHeart,
  Landmark,
  FileCheck2,
  ArrowRight,
  ArrowLeft,
  Edit3,
  AlertCircle,
} from 'lucide-react';
import { getGenerationalCohort } from '../utils/socioculturalScience';
import { WebsiteTabKey } from './WebsiteSectionsModal';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { BehindTheScenesSection } from './BehindTheScenesSection';
import { ScientificClinicalDisclaimerBanner } from './PsychometricAcademicFraming';

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

const CULTURAL_REGIONAL_OPTIONS = [
  {
    id: 'gulf',
    tag: 'خليجي',
    labelAr: 'ثقافة خليجية (قيم الكرم الأصيل، الترابط الأسري، والوقار الاجتماعي)',
    labelEn: 'Gulf Cultural Heritage (Hospitality, strong family kinship, and social dignity)',
  },
  {
    id: 'levantine',
    tag: 'شامي',
    labelAr: 'ثقافة شامية (الدفء الأسري، الدبلوماسية الاجتماعية، والتذوق الثقافي)',
    labelEn: 'Levantine Cultural Heritage (Warmth, social diplomacy, and cultural appreciation)',
  },
  {
    id: 'egyptian',
    tag: 'مصري',
    labelAr: 'ثقافة مصرية (الروح المرحة، الألفة الاجتماعية، والمرونة الحياتية)',
    labelEn: 'Egyptian Cultural Heritage (Humor, social familiarity, and adaptive resilience)',
  },
  {
    id: 'maghreb',
    tag: 'مغاربي',
    labelAr: 'ثقافة مغاربية (الأصالة المتوسطية، الاعتزاز بالهوية، والانفتاح الثقافي)',
    labelEn: 'Maghreb Cultural Heritage (Mediterranean authenticity, identity pride, and openness)',
  },
  {
    id: 'iraqi',
    tag: 'عراقي',
    labelAr: 'ثقافة رافدينية عراقية (الشهامة، العمق الفكري والأدبي، والوفاء العائلي)',
    labelEn: 'Mesopotamian / Iraqi Heritage (Chivalry, literary depth, and family loyalty)',
  },
  {
    id: 'nile_valley',
    tag: 'وادي النيل',
    labelAr: 'ثقافة وادي النيل (الطيبة الفطرية، التكافل المجتمعي، والسكينة الروحية)',
    labelEn: 'Nile Valley Heritage (Innate kindness, communal solidarity, and serenity)',
  },
  {
    id: 'mediterranean',
    tag: 'تركي/أوراسي',
    labelAr: 'ثقافة متوسطية / أوراسية (التوازن بين الأصالة الشرقية والحداثة العملية)',
    labelEn: 'Mediterranean / Eurasian Heritage (Balance of Eastern traditions and modern pragmatism)',
  },
  {
    id: 'global',
    tag: 'عالمي',
    labelAr: 'ثقافة عالمية متعددة الروافد (انفتاح فكري وحوار عابر للثقافات)',
    labelEn: 'Global / Multicultural Outlook (Cross-cultural dialogue and intellectual openness)',
  },
];

const BILINGUAL_EDUCATION_OPTIONS = [
  {
    value: EDUCATION_LEVELS[0],
    labelAr: 'تعليم جامعي عالي (بكالوريوس فما فوق)',
    labelEn: 'University Degree (Bachelor’s or higher)',
  },
  {
    value: EDUCATION_LEVELS[1],
    labelAr: 'دراسات عليا وأبحاث (ماجستير / دكتوراه)',
    labelEn: 'Postgraduate & Academic Research (Master’s / PhD)',
  },
  {
    value: EDUCATION_LEVELS[2],
    labelAr: 'تخصص تقني أو مهني متقدم وريادة أعمال',
    labelEn: 'Advanced Technical / Professional & Entrepreneurship',
  },
  {
    value: EDUCATION_LEVELS[3],
    labelAr: 'مثقف وشغوف بالتعلم الذاتي وتطوير الفكر',
    labelEn: 'Autodidact & Lifelong Intellectual Learner',
  },
];

const BILINGUAL_LIFESTYLE_OPTIONS = [
  {
    value: LIFESTYLE_OUTLOOKS[0],
    labelAr: 'بيئة عائلية مترابطة مع الحفاظ على استقلالية وخصوصية الحياة الزوجية',
    labelEn: 'Close family ties balanced with strong marital privacy and autonomy',
  },
  {
    value: LIFESTYLE_OUTLOOKS[1],
    labelAr: 'بيئة عصرية طموحة تركز على النجاح المهني المشترك والشغف بالسفر والمعرفة',
    labelEn: 'Ambitious modern lifestyle focused on mutual career growth and travel',
  },
  {
    value: LIFESTYLE_OUTLOOKS[2],
    labelAr: 'بيئة أسرية هادئة تميل للاستقرار والسكينة وتأسيس بيت دافئ متوازن',
    labelEn: 'Calm home-centered environment prioritizing serenity and stability',
  },
  {
    value: LIFESTYLE_OUTLOOKS[3],
    labelAr: 'بيئة اجتماعية منفتحة تكثر فيها المبادرات الثقافية والصداقات الراقية',
    labelEn: 'Socially active lifestyle rich in cultural events and refined friendships',
  },
];

const CORE_VALUES_OPTIONS = [
  {
    id: 'serenity_respect',
    labelAr: 'السكينة الروحية، المودة، والاحترام المتبادل كأولوية قصوى',
    labelEn: 'Emotional serenity, mutual affection, and unconditional respect',
  },
  {
    id: 'intellectual_growth',
    labelAr: 'النمو الفكري والمهني المشترك والحوار الثقافي المستمر',
    labelEn: 'Shared intellectual & career growth with continuous dialogue',
  },
  {
    id: 'family_authenticity',
    labelAr: 'الأصالة القيمية، التماسك الأسري، وتنشئة جيل متزن أخلاقياً',
    labelEn: 'Value authenticity, family cohesion, and nurturing balanced children',
  },
  {
    id: 'autonomy_partnership',
    labelAr: 'الشراكة المرنة واحترام المساحة الشخصية والاستقلالية الناضجة',
    labelEn: 'Flexible partnership respecting personal space and mature autonomy',
  },
];

const COMMUNICATION_CONFLICT_OPTIONS = [
  {
    id: 'calm_analytical',
    labelAr: 'الحوار الهادئ المباشر وتحليل أسباب الخلاف بموضوعية بعيداً عن اللوم (نموذج غوتمان)',
    labelEn: 'Calm direct dialogue analyzing root causes objectively without blame (Gottman model)',
  },
  {
    id: 'pause_then_resolve',
    labelAr: 'التهدئة الانفعالية المؤقتة عند التوتر ثم العودة للنقاش الودّي المنظم',
    labelEn: 'Brief emotional cooling-off period followed by structured, warm resolution',
  },
  {
    id: 'empathy_reassurance',
    labelAr: 'المصارحة الوجدانية الفورية وتغليب الاحتواء العاطفي وطمأنة الشريك أولاً',
    labelEn: 'Immediate emotional reassurance and empathetic validation before problem-solving',
  },
  {
    id: 'pragmatic_compromise',
    labelAr: 'البحث العملي السريع عن حلول وسط عادلة وتجاوز التفاصيل الجانبية الصغيرة',
    labelEn: 'Pragmatic, rapid compromise focusing on fair solutions over minor details',
  },
];

const FINANCIAL_FAMILY_VISION_OPTIONS = [
  {
    id: 'shared_transparent_budget',
    labelAr: 'تخطيط مالي تشاركي وميزانية أسرية موحدة بشفافية كاملة وأهداف ادخارية مشتركة',
    labelEn: 'Joint financial planning, transparent unified household budget, and shared savings goals',
  },
  {
    id: 'hybrid_autonomy_pool',
    labelAr: 'صندوق التزامات أسرية مشترك مع احتفاظ كل شريك بذمته واستقلاليته المالية الخاصة',
    labelEn: 'Shared household expense pool while maintaining individual financial autonomy',
  },
  {
    id: 'quality_of_life_investment',
    labelAr: 'أولوية الاستثمار في جودة الحياة اليومية، التعليم النوعي، والتجارب الأسرية الملهمة',
    labelEn: 'Prioritizing investment in quality of life, education, and enriching family experiences',
  },
  {
    id: 'long_term_security',
    labelAr: 'الادخار الاستراتيجي المحافظ وبناء الأصول والأمان المالي طويل الأمد للأسرة',
    labelEn: 'Conservative strategic saving and long-term asset building for family security',
  },
];

const CURRENT_YEAR = 2026;
const BIRTH_YEARS = Array.from({ length: 55 }, (_, i) => CURRENT_YEAR - 18 - i); // 2008 down to 1954

export const ProfileStep: React.FC<Props> = ({
  onStart,
  initialProfile,
  savedTestsCount = 0,
  onOpenSavedHistory,
  onOpenBlindDate,
  onOpenWebsiteSection,
  onOpenPsychologyTests,
  onOpenIntelligenceTests,
  onOpenUserDashboard,
  onOpenArticles,
  onOpenNovels,
  onOpenContactFeedback,
}) => {
  const { language, direction, isRTL, t } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';

  // 4-Step Wizard State (1 to 4)
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Fundamentals (Nickname, Gender, Birth Year, Country)
  const [userName, setUserName] = useState<string>(initialProfile?.userName || '');
  const [userGender, setUserGender] = useState<Gender>(initialProfile?.userGender || 'male');
  const [partnerGender, setPartnerGender] = useState<Gender>(initialProfile?.partnerGender || 'female');
  const initialBirthYear =
    initialProfile?.birthYear ||
    (initialProfile?.userBirthDate ? parseInt(initialProfile.userBirthDate.slice(0, 4), 10) : 0) ||
    (initialProfile?.userAge ? CURRENT_YEAR - initialProfile.userAge : 1998);
  const [birthYear, setBirthYear] = useState<number>(
    birthYearInBounds(initialBirthYear) ? initialBirthYear : 1998
  );
  const [country, setCountry] = useState<string>(
    initialProfile?.country || 'المملكة العربية السعودية'
  );

  // Step 2: Cultural Preferences & Lifestyle
  const [ethnicity, setEthnicity] = useState<string>(initialProfile?.ethnicity || 'خليجي');
  const [educationLevel, setEducationLevel] = useState<string>(
    initialProfile?.educationLevel || EDUCATION_LEVELS[0]
  );
  const [lifestyleOutlook, setLifestyleOutlook] = useState<string>(
    initialProfile?.lifestyleOutlook || LIFESTYLE_OUTLOOKS[0]
  );

  // Step 3: Core Values, Communication & Conflict Resolution, Financial & Family Vision
  const [coreValuesPriority, setCoreValuesPriority] = useState<string>(
    initialProfile?.coreValuesPriority || CORE_VALUES_OPTIONS[0].labelAr
  );
  const [communicationAndConflictStyle, setCommunicationAndConflictStyle] = useState<string>(
    initialProfile?.communicationAndConflictStyle || COMMUNICATION_CONFLICT_OPTIONS[0].labelAr
  );
  const [financialAndFamilyVision, setFinancialAndFamilyVision] = useState<string>(
    initialProfile?.financialAndFamilyVision || FINANCIAL_FAMILY_VISION_OPTIONS[0].labelAr
  );

  // Step 4: Mandatory Privacy & Data Minimization Consent Checkbox
  const [privacyConsentAccepted, setPrivacyConsentAccepted] = useState<boolean>(
    initialProfile?.privacyConsentAccepted || false
  );
  const [consentError, setConsentError] = useState<boolean>(false);

  // Hub tab state
  const [activeHubTab, setActiveHubTab] = useState<
    | 'all'
    | 'compatibility'
    | 'blind_date'
    | 'psychology'
    | 'intelligence'
    | 'articles'
    | 'novels'
    | 'behind_scenes'
  >('all');

  function birthYearInBounds(yr: number) {
    return !isNaN(yr) && yr >= 1945 && yr <= CURRENT_YEAR - 18;
  }

  useEffect(() => {
    if (initialProfile) {
      if (initialProfile.userGender) setUserGender(initialProfile.userGender);
      if (initialProfile.partnerGender) setPartnerGender(initialProfile.partnerGender);
      if (initialProfile.userName !== undefined) setUserName(initialProfile.userName);
      if (initialProfile.country) setCountry(initialProfile.country);
      if (initialProfile.ethnicity) setEthnicity(initialProfile.ethnicity);
      if (initialProfile.educationLevel) setEducationLevel(initialProfile.educationLevel);
      if (initialProfile.lifestyleOutlook) setLifestyleOutlook(initialProfile.lifestyleOutlook);
      if (initialProfile.coreValuesPriority) setCoreValuesPriority(initialProfile.coreValuesPriority);
      if (initialProfile.communicationAndConflictStyle) {
        setCommunicationAndConflictStyle(initialProfile.communicationAndConflictStyle);
      }
      if (initialProfile.financialAndFamilyVision) {
        setFinancialAndFamilyVision(initialProfile.financialAndFamilyVision);
      }
      if (initialProfile.birthYear && birthYearInBounds(initialProfile.birthYear)) {
        setBirthYear(initialProfile.birthYear);
      } else if (initialProfile.userAge) {
        const computedYr = CURRENT_YEAR - initialProfile.userAge;
        if (birthYearInBounds(computedYr)) setBirthYear(computedYr);
      }
    }
  }, [initialProfile]);

  const computedAge = Math.max(18, CURRENT_YEAR - birthYear);
  const syntheticBirthDate = `${birthYear}-01-01`;
  const previewCohort = getGenerationalCohort(syntheticBirthDate, computedAge);

  const handleUserGenderSelect = (gender: Gender) => {
    soundManager.playTap();
    setUserGender(gender);
    setPartnerGender(gender === 'male' ? 'female' : 'male');
  };

  const handleCountryChange = (countryName: string) => {
    soundManager.playTap();
    setCountry(countryName);
    const found = COUNTRIES_LIST.find((c) => c.name === countryName);
    if (found && found.defaultEthnicity) {
      const matchedCultural = CULTURAL_REGIONAL_OPTIONS.find((opt) =>
        found.defaultEthnicity.includes(opt.tag)
      );
      if (matchedCultural) {
        setEthnicity(matchedCultural.tag);
      }
    }
  };

  const goToNextStep = () => {
    soundManager.playTap();
    if (wizardStep < 4) {
      setWizardStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const goToPrevStep = () => {
    soundManager.playTap();
    if (wizardStep > 1) {
      setWizardStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyConsentAccepted) {
      soundManager.playTap();
      setConsentError(true);
      return;
    }
    setConsentError(false);
    soundManager.playNext();

    const combinedCulturalSummary = `${coreValuesPriority} | ${communicationAndConflictStyle} | ${financialAndFamilyVision}`;

    onStart({
      userGender,
      partnerGender,
      userAge: computedAge,
      birthYear,
      userName: userName.trim() || undefined,
      userBirthDate: syntheticBirthDate,
      country,
      ethnicity,
      educationLevel,
      lifestyleOutlook,
      partnerFeaturesPreference: combinedCulturalSummary,
      coreValuesPriority,
      communicationAndConflictStyle,
      financialAndFamilyVision,
      privacyConsentAccepted: true,
    });
  };

  const wizardStepsMeta = [
    {
      step: 1 as const,
      titleAr: '١. الأساسيات',
      titleEn: '1. Fundamentals',
      subAr: 'اللقب، الجنس، سنة الميلاد، والبلد',
      subEn: 'Alias, Gender, Birth Year & Country',
      icon: User,
    },
    {
      step: 2 as const,
      titleAr: '٢. الثقافة ونمط الحياة',
      titleEn: '2. Culture & Lifestyle',
      subAr: 'الانتماء الثقافي الإقليمي والتعليم',
      subEn: 'Regional Heritage & Education',
      icon: Globe,
    },
    {
      step: 3 as const,
      titleAr: '٣. القيم والتواصل',
      titleEn: '3. Values & Dialogue',
      subAr: 'حل الخلافات والرؤية المالية والأسرية',
      subEn: 'Conflict Resolution & Family Vision',
      icon: MessageSquareHeart,
    },
    {
      step: 4 as const,
      titleAr: '٤. المراجعة والموافقة',
      titleEn: '4. Review & Consent',
      subAr: 'ملخص البيانات والموافقة الإلزامية',
      subEn: 'Summary & Mandatory Privacy Consent',
      icon: FileCheck2,
    },
  ];

  const selectedCultureObj =
    CULTURAL_REGIONAL_OPTIONS.find(
      (c) => c.tag === ethnicity || ethnicity.includes(c.tag)
    ) || CULTURAL_REGIONAL_OPTIONS[0];

  return (
    <div
      className={`w-full max-w-4xl mx-auto px-4 py-6 transition-colors duration-300 ${
        isLight ? 'text-slate-900' : 'text-white'
      }`}
      dir={direction}
    >
      {/* Engineering Oversight and Official Trust Banner */}
      <div
        className={`mb-6 p-3.5 sm:p-4 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm ${
          isLight
            ? 'bg-white border-blue-200 text-slate-800'
            : 'bg-slate-900/90 border-blue-500/30 text-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 ${
              isLight
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-blue-950/70 border-blue-500/50 text-emerald-400'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-extrabold font-['Alexandria']">
                {isAr
                  ? 'الموقع مشرف عليه ومُدار بواسطة مجموعة من المهندسين المتخصصين'
                  : 'Engineered & Supervised by Independent Specialist Software Engineers'}
              </span>
              <span
                className={`text-[10px] font-mono font-bold ${
                  isLight ? 'text-blue-700' : 'text-blue-300'
                }`}
              >
                {isAr ? 'الأردن - عمّان' : 'Amman, Jordan'}
              </span>
            </div>
            <p className={`text-[11px] sm:text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {isAr ? 'تواصل واستفسارات وملاحظات عبر البريد المعتمد:' : 'Official contact & inquiries:'}{' '}
              <span className="font-mono font-bold underline select-all">one497303@gmail.com</span>
            </p>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 shrink-0 text-[11px] font-mono ${
            isLight ? 'text-emerald-700 font-bold' : 'text-slate-300'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{isAr ? 'تشفير TLS 1.3 معتمد' : 'TLS 1.3 Encrypted'}</span>
        </div>
      </div>

      {/* Hero Section & Quick Hub Switcher */}
      <div
        className={`text-center mb-6 relative p-5 sm:p-6 rounded-3xl border ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-slate-900/80 border-slate-800 shadow-lg'
        }`}
      >
        <div
          className={`inline-flex items-center gap-2 text-xs font-bold mb-2 ${
            isLight ? 'text-blue-700' : 'text-blue-300'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-500" />
          <span>
            {isAr
              ? 'منظومة التوافق الفكري والاجتماعي وعلم النفس التطبيقي'
              : 'Behavioral & Sociological Compatibility Framework'}
          </span>
        </div>

        <h2
          className={`text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 font-['Alexandria',sans-serif] ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          {t('hero_title_1')} <span className="text-blue-500">{t('hero_title_highlight')}</span>
        </h2>
        <p
          className={`text-xs sm:text-sm max-w-xl mx-auto leading-relaxed ${
            isLight ? 'text-slate-600' : 'text-slate-300'
          }`}
        >
          {t('hero_subtitle')}
        </p>

        {/* Smart Hub Tabs Bar */}
        <div
          className={`mt-5 flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto py-1.5 px-2 rounded-2xl border scrollbar-none ${
            isLight
              ? 'bg-slate-100 border-slate-200'
              : 'bg-slate-950/90 border-slate-800'
          }`}
        >
          {[
            { id: 'all', labelAr: 'جميع الأقسام', labelEn: 'All Sections', icon: '✨' },
            { id: 'compatibility', labelAr: 'معالج كاشف التوافق', labelEn: 'Compatibility Wizard', icon: '🔮' },
            { id: 'intelligence', labelAr: 'اختبارات الذكاء', labelEn: 'Intelligence Lab', icon: '💡' },
            { id: 'psychology', labelAr: 'مقاييس الشخصية', labelEn: 'Personality Scales', icon: '🧠' },
            { id: 'blind_date', labelAr: 'The Blind Date', labelEn: 'The Blind Date', icon: '💬' },
            { id: 'articles', labelAr: 'المقالات والأبحاث', labelEn: 'Articles & Research', icon: '📚' },
            { id: 'novels', labelAr: 'الروايات والتحقيقات', labelEn: 'Novels Library', icon: '🕵️‍♂️' },
            { id: 'behind_scenes', labelAr: 'فريق العمل', labelEn: 'Engineering Team', icon: '👥' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                soundManager.playTap();
                setActiveHubTab(tab.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeHubTab === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-700 hover:bg-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{isAr ? tab.labelAr : tab.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Quick Cards when browsing other tabs */}
        {(activeHubTab === 'all' || activeHubTab !== 'compatibility') && (
          <div
            className={`mt-4 text-start ${
              activeHubTab === 'all'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3'
                : 'max-w-xl mx-auto'
            }`}
          >
            {activeHubTab === 'behind_scenes' && (
              <BehindTheScenesSection
                onExploreTests={onOpenIntelligenceTests}
                onExploreNovels={onOpenNovels}
                onOpenContactFeedback={onOpenContactFeedback}
              />
            )}

            {(activeHubTab === 'all' || activeHubTab === 'blind_date') && onOpenBlindDate && (
              <div
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition ${
                  isLight
                    ? 'bg-rose-50/50 border-rose-200 hover:border-rose-400'
                    : 'bg-slate-950/90 border-rose-900/50 hover:border-rose-500'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-rose-500">
                    <span>💬 The Blind Date</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {isAr
                      ? '4 مراحل حوارية متبادلة وتقييم إجابات الشريك خلف الستار.'
                      : '4 progressive dialogue stages evaluating partner responses behind the curtain.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    onOpenBlindDate();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition cursor-pointer"
                >
                  {isAr ? 'بدء The Blind Date' : 'Launch The Blind Date'}
                </button>
              </div>
            )}

            {(activeHubTab === 'all' || activeHubTab === 'intelligence') && (
              <div
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition ${
                  isLight
                    ? 'bg-blue-50/50 border-blue-200 hover:border-blue-400'
                    : 'bg-slate-950/90 border-blue-900/50 hover:border-blue-500'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-500">
                    <span>💡 {isAr ? 'مختبر اختبارات الذكاء' : 'Intelligence Lab'}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {isAr
                      ? '4 بطاريات محكّمة: الذكاءات الـ 9، مصفوفات رافين IQ، والذكاء العاطفي EQ.'
                      : '4 validated batteries: 9 Multiple Intelligences, Raven IQ & Emotional Intelligence.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    if (onOpenIntelligenceTests) onOpenIntelligenceTests();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition cursor-pointer"
                >
                  {isAr ? 'بدء اختبار الذكاء' : 'Start IQ / MI Test'}
                </button>
              </div>
            )}

            {(activeHubTab === 'all' || activeHubTab === 'psychology') && (
              <div
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition ${
                  isLight
                    ? 'bg-purple-50/50 border-purple-200 hover:border-purple-400'
                    : 'bg-slate-950/90 border-slate-700 hover:border-purple-500'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-purple-500">
                    <span>🧠 {isAr ? 'مقاييس تحليل الشخصية' : 'Personality Scales'}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {isAr
                      ? '8 مقاييس عالمية محكّمة (Big Five, 16PF, MBTI, التعلق ECR-R) مع تقرير PDF.'
                      : '8 validated scales (Big Five, 16PF, MBTI, ECR-R Attachment) with PDF report.'}
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
                      className="flex-1 py-2 px-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition cursor-pointer"
                    >
                      {isAr ? 'خوض مقياس' : 'Take Scale'}
                    </button>
                  )}
                  {onOpenUserDashboard && (
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playTap();
                        onOpenUserDashboard();
                      }}
                      className={`py-2 px-2.5 rounded-xl border font-bold text-xs transition cursor-pointer ${
                        isLight
                          ? 'bg-white border-purple-200 text-purple-800'
                          : 'bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      👤 {isAr ? 'ملفي' : 'Profile'}
                    </button>
                  )}
                </div>
              </div>
            )}

            {(activeHubTab === 'all' || activeHubTab === 'articles') && (
              <div
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition ${
                  isLight
                    ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-400'
                    : 'bg-slate-950/90 border-emerald-900/50 hover:border-emerald-500'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-500">
                    <span>📚 {isAr ? 'موسوعة المقالات والأبحاث' : 'Articles & Research'}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {isAr
                      ? 'أبحاث محكّمة ومقالات معمقة في التوافق الزوجي، إدارة الخلافات، والنضج النفسي.'
                      : 'Peer-reviewed papers and clinical articles on marital harmony and emotional maturity.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    if (onOpenArticles) onOpenArticles();
                    else if (onOpenWebsiteSection) onOpenWebsiteSection('articles');
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
                >
                  {isAr ? 'تصفح الموسوعة العلمية' : 'Browse Encyclopedia'}
                </button>
              </div>
            )}

            {(activeHubTab === 'all' || activeHubTab === 'novels') && (
              <div
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition ${
                  isLight
                    ? 'bg-amber-50/50 border-amber-200 hover:border-amber-400'
                    : 'bg-slate-950/90 border-slate-800 hover:border-amber-500/50'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-500">
                    <span>🕵️‍♂️ {isAr ? 'الروايات والتحقيقات' : 'Novels Library'}</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {isAr
                      ? 'روايات رومانسية، تحقيقات جنائية، وخيال علمي تكنولوجي بوضع قراءة مريح.'
                      : 'Romance, forensic mystery, and sci-fi novels with customizable reader mode.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    if (onOpenNovels) onOpenNovels();
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition cursor-pointer"
                >
                  {isAr ? 'دخول واحة الروايات' : 'Enter Novels Oasis'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= 4-STEP MULTI-STEP COMPATIBILITY WIZARD ================= */}
      {(activeHubTab === 'all' || activeHubTab === 'compatibility') && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Clinical & Scientific Disclaimer at the start of the Compatibility Detector */}
          <ScientificClinicalDisclaimerBanner
            testType="compatibility"
            testTitleAr="حاسبة التوافق وكاشف الشريك (4 خطوات)"
            testTitleEn="4-Step Compatibility & Partner Detector"
          />

          {/* Cloud Persistence & Saved History Banner */}
          <div
            className={`p-4 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
              isLight
                ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                : 'bg-gradient-to-l from-emerald-950/60 via-slate-900/90 to-blue-950/60 border-emerald-500/30 text-white'
            }`}
          >
            <div className="flex items-center gap-3 text-start">
              <div
                className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 ${
                  isLight
                    ? 'bg-white border-emerald-200 text-emerald-600'
                    : 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300'
                }`}
              >
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-extrabold font-['Alexandria']">
                    {isAr
                      ? 'معالج كاشف التوافق الذكي (4 خطوات منهجية وفق مبدأ تقليل البيانات)'
                      : '4-Step Smart Compatibility Wizard (Data Minimization Compliant)'}
                  </span>
                </div>
                <p className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {isAr
                    ? 'يقتصر النموذج على اللقب وسنة الميلاد والتفضيلات الثقافية والقيمية دون طلب أي بيانات حساسة.'
                    : 'Collects only your alias, birth year, and cultural/value preferences without sensitive personal data.'}
                </p>
              </div>
            </div>

            {onOpenSavedHistory && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onOpenSavedHistory();
                }}
                className={`w-full sm:w-auto px-3.5 py-2 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
                  isLight
                    ? 'bg-white hover:bg-emerald-100 border-emerald-300 text-emerald-800'
                    : 'bg-emerald-600/25 hover:bg-emerald-600/40 text-emerald-200 border-emerald-400/40'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>
                  {isAr ? 'سجل نتائجي' : 'Saved History'}{' '}
                  {savedTestsCount > 0 ? `(${savedTestsCount})` : ''}
                </span>
              </button>
            )}
          </div>

          {/* Wizard Card Container */}
          <form
            onSubmit={handleFinalSubmit}
            className={`rounded-3xl border p-5 sm:p-8 shadow-xl space-y-6 transition-colors duration-300 ${
              isLight
                ? 'bg-white border-slate-200/90 text-slate-900'
                : 'bg-slate-900/90 border-white/10 text-white'
            }`}
          >
            {/* ================= ANIMATED TOP PROGRESS BAR & 4-STEP INDICATOR ================= */}
            <div className="space-y-4 pb-5 border-b border-blue-500/20">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-blue-500 font-extrabold">
                  {isAr
                    ? `الخطوة ${wizardStep} من 4: ${wizardStepsMeta[wizardStep - 1].titleAr}`
                    : `Step ${wizardStep} of 4: ${wizardStepsMeta[wizardStep - 1].titleEn}`}
                </span>
                <span className="font-mono text-emerald-500 font-bold">
                  {wizardStep * 25}% {isAr ? 'مكتمل' : 'Complete'}
                </span>
              </div>

              {/* Animated Progress Track */}
              <div
                className={`w-full h-2.5 rounded-full overflow-hidden border ${
                  isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 rounded-full"
                  initial={{ width: '25%' }}
                  animate={{ width: `${wizardStep * 25}%` }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                />
              </div>

              {/* 4 Step Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {wizardStepsMeta.map((s) => {
                  const IconComponent = s.icon;
                  const isCurrent = wizardStep === s.step;
                  const isDone = wizardStep > s.step;
                  return (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => {
                        soundManager.playTap();
                        setWizardStep(s.step);
                      }}
                      className={`p-2.5 rounded-2xl border text-start transition flex items-center gap-2.5 cursor-pointer ${
                        isCurrent
                          ? isLight
                            ? 'bg-blue-50 border-blue-400 text-blue-950 shadow-sm'
                            : 'bg-blue-600/20 border-blue-400 text-white shadow-sm'
                          : isDone
                          ? isLight
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                          : isLight
                          ? 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                          : 'bg-slate-950/60 border-white/10 text-slate-400 hover:bg-white/5'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                          isCurrent
                            ? 'bg-blue-600 text-white'
                            : isDone
                            ? 'bg-emerald-500 text-white'
                            : isLight
                            ? 'bg-slate-200 text-slate-700'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isDone ? <Check className="w-3.5 h-3.5" /> : <IconComponent className="w-3.5 h-3.5" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-extrabold truncate">
                          {isAr ? s.titleAr : s.titleEn}
                        </div>
                        <div
                          className={`text-[10px] truncate ${
                            isLight ? 'text-slate-500' : 'text-slate-400'
                          }`}
                        >
                          {isAr ? s.subAr : s.subEn}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ================= STEP CONTENT PANELS ================= */}
            <AnimatePresence mode="wait">
              {/* ----------------- STEP 1: FUNDAMENTALS ----------------- */}
              {wizardStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-black font-['Alexandria']">
                      {isAr
                        ? 'الخطوة الأولى: الأساسيات الديموغرافية المبسطة'
                        : 'Step 1: Simplified Demographic Fundamentals'}
                    </h3>
                    <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {isAr
                        ? 'نكتفي بالاسم المستعار (اللقب) وسنة الميلاد فقط التزاماً بمبدأ الحد الأدنى من جمع البيانات (Data Minimization).'
                        : 'In adherence to Data Minimization principles, only an alias/nickname and birth year are requested.'}
                    </p>
                  </div>

                  {/* 1. Nickname / Alias */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold mb-1.5">
                      {isAr
                        ? 'الاسم المستعار أو اللقب (لتخصيص التقرير دون الحاجة للاسم الكامل):'
                        : 'Nickname or Alias (to personalize your report without full legal name):'}
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder={
                        isAr ? 'مثال: أبو فيصل، سارة، طارق...' : 'e.g., Alex, Sara, Tariq...'
                      }
                      className={`w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none focus:border-blue-500 ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                          : 'bg-slate-950/80 border-white/15 text-white placeholder-slate-500'
                      }`}
                    />
                  </div>

                  {/* 2. Gender & Partner Gender */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      className={`p-4 rounded-2xl border space-y-3 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-white/10'
                      }`}
                    >
                      <label className="block text-xs sm:text-sm font-bold">
                        {isAr ? 'جنسك:' : 'Your Gender:'} <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleUserGenderSelect('male')}
                          className={`p-3 rounded-xl border font-bold text-xs sm:text-sm flex flex-col items-center gap-1.5 transition cursor-pointer ${
                            userGender === 'male'
                              ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                              : isLight
                              ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                              : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="text-2xl">👨</span>
                          <span>{isAr ? 'ذكر' : 'Male'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUserGenderSelect('female')}
                          className={`p-3 rounded-xl border font-bold text-xs sm:text-sm flex flex-col items-center gap-1.5 transition cursor-pointer ${
                            userGender === 'female'
                              ? 'bg-rose-600 text-white border-rose-400 shadow-sm'
                              : isLight
                              ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                              : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="text-2xl">👩</span>
                          <span>{isAr ? 'أنثى' : 'Female'}</span>
                        </button>
                      </div>
                    </div>

                    <div
                      className={`p-4 rounded-2xl border space-y-3 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-white/10'
                      }`}
                    >
                      <label className="block text-xs sm:text-sm font-bold">
                        {isAr
                          ? 'الشريك المطلوب دراسة التوافق معه:'
                          : 'Target Partner Gender:'}{' '}
                        <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            soundManager.playTap();
                            setPartnerGender('female');
                          }}
                          className={`p-3 rounded-xl border font-bold text-xs sm:text-sm flex flex-col items-center gap-1.5 transition cursor-pointer ${
                            partnerGender === 'female'
                              ? 'bg-rose-600 text-white border-rose-400 shadow-sm'
                              : isLight
                              ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                              : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="text-2xl">👰</span>
                          <span>{isAr ? 'أنثى / شريكة' : 'Female Partner'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            soundManager.playTap();
                            setPartnerGender('male');
                          }}
                          className={`p-3 rounded-xl border font-bold text-xs sm:text-sm flex flex-col items-center gap-1.5 transition cursor-pointer ${
                            partnerGender === 'male'
                              ? 'bg-blue-600 text-white border-blue-400 shadow-sm'
                              : isLight
                              ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                              : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="text-2xl">🤵</span>
                          <span>{isAr ? 'ذكر / شريك' : 'Male Partner'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 3. Birth Year (Instead of exact date) & Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Birth Year Selector */}
                    <div
                      className={`p-4 rounded-2xl border space-y-2.5 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-emerald-500" />
                          <span>
                            {isAr ? 'سنة الميلاد (بدون يوم أو شهر):' : 'Birth Year (Year Only):'}
                          </span>
                        </label>
                        <span className="text-xs font-mono font-bold text-emerald-500">
                          ~{computedAge} {isAr ? 'عاماً' : 'yrs'}
                        </span>
                      </div>

                      <div className="relative">
                        <select
                          value={birthYear}
                          onChange={(e) => {
                            soundManager.playTap();
                            setBirthYear(Number(e.target.value));
                          }}
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm font-mono font-bold appearance-none cursor-pointer ${
                            isLight
                              ? 'bg-white border-slate-300 text-slate-900'
                              : 'bg-slate-900 border-white/15 text-white'
                          }`}
                        >
                          {BIRTH_YEARS.map((yr) => (
                            <option key={yr} value={yr}>
                              {yr} ({CURRENT_YEAR - yr} {isAr ? 'سنة' : 'yrs'})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                      </div>

                      <div className="text-[11px] text-emerald-500 font-semibold flex items-center justify-between pt-1">
                        <span>
                          {isAr ? 'الفئة الجيلية:' : 'Generational Cohort:'} {previewCohort.cohortName}
                        </span>
                        <span className="font-mono">({previewCohort.birthYearRange})</span>
                      </div>
                    </div>

                    {/* Country Selector */}
                    <div
                      className={`p-4 rounded-2xl border space-y-2.5 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-white/10'
                      }`}
                    >
                      <label className="block text-xs sm:text-sm font-bold">
                        {isAr ? 'البلد / الإقامة الحالية:' : 'Country / Current Residence:'}{' '}
                        <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={country}
                          onChange={(e) => handleCountryChange(e.target.value)}
                          className={`w-full px-4 py-2.5 rounded-xl border text-sm font-bold appearance-none cursor-pointer ${
                            isLight
                              ? 'bg-white border-slate-300 text-slate-900'
                              : 'bg-slate-900 border-white/15 text-white'
                          }`}
                        >
                          {COUNTRIES_LIST.map((c) => (
                            <option key={c.code} value={c.name}>
                              {c.flag} {c.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                      </div>
                      <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        {isAr
                          ? 'يُستخدم لمواءمة السياق الثقافي والاجتماعي العام.'
                          : 'Used to calibrate general sociocultural context.'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ----------------- STEP 2: CULTURAL PREFERENCES & LIFESTYLE ----------------- */}
              {wizardStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-black font-['Alexandria']">
                      {isAr
                        ? 'الخطوة الثانية: التفضيلات الثقافية ونمط الحياة'
                        : 'Step 2: Cultural Preferences & Lifestyle Outlook'}
                    </h3>
                    <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {isAr
                        ? 'يركز هذا القسم على المدرسة الثقافية والإقليمية العامة (خليجي، شامي، مصري، مغاربي، إلخ) والتطلعات التعليمية والاجتماعية بعيداً عن الأوصاف الجسدية السطحية.'
                        : 'Focuses on general regional cultural heritage (Gulf, Levantine, Egyptian, Maghreb, etc.), education, and social lifestyle rather than physical traits.'}
                    </p>
                  </div>

                  {/* 1. General Cultural & Regional Options */}
                  <div className="space-y-2.5">
                    <label className="block text-xs sm:text-sm font-bold">
                      {isAr
                        ? 'الخلفية الثقافية والإقليمية المفضلة للتوافق القيمي:'
                        : 'Preferred Cultural & Regional Background:'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {CULTURAL_REGIONAL_OPTIONS.map((item) => {
                        const isSelected =
                          ethnicity === item.tag || ethnicity.includes(item.tag);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              soundManager.playTap();
                              setEthnicity(item.tag);
                            }}
                            className={`p-3.5 rounded-2xl border text-start transition flex items-center justify-between gap-2 text-xs cursor-pointer ${
                              isSelected
                                ? isLight
                                  ? 'bg-blue-50 border-blue-500 text-blue-950 font-bold shadow-sm'
                                  : 'bg-blue-600/20 border-blue-400 text-white font-bold shadow-sm'
                                : isLight
                                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                : 'bg-slate-950/60 border-white/10 text-slate-300 hover:bg-white/5'
                            }`}
                          >
                            <span className="leading-relaxed">
                              {isAr ? item.labelAr : item.labelEn}
                            </span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-blue-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Educational Level */}
                  <div className="space-y-2.5 pt-2 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-rose-500">
                      <GraduationCap className="w-4 h-4" />
                      <span>
                        {isAr
                          ? 'المستوى التعليمي والفكري:'
                          : 'Educational & Intellectual Background:'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {BILINGUAL_EDUCATION_OPTIONS.map((ed) => {
                        const isSelected = educationLevel === ed.value;
                        return (
                          <button
                            key={ed.value}
                            type="button"
                            onClick={() => {
                              soundManager.playTap();
                              setEducationLevel(ed.value);
                            }}
                            className={`p-3 rounded-2xl border text-start transition flex items-center justify-between gap-2 text-xs cursor-pointer ${
                              isSelected
                                ? isLight
                                  ? 'bg-rose-50 border-rose-400 text-rose-950 font-bold shadow-sm'
                                  : 'bg-rose-500/20 border-rose-400 text-white font-bold shadow-sm'
                                : isLight
                                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                : 'bg-slate-950/60 border-white/10 text-slate-300 hover:bg-white/5'
                            }`}
                          >
                            <span>{isAr ? ed.labelAr : ed.labelEn}</span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-rose-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Lifestyle & Social Outlook */}
                  <div className="space-y-2.5 pt-2 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-purple-500">
                      <Users2 className="w-4 h-4" />
                      <span>
                        {isAr
                          ? 'نمط الحياة والتطلعات الاجتماعية المفضلة:'
                          : 'Preferred Lifestyle & Social Outlook:'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {BILINGUAL_LIFESTYLE_OPTIONS.map((lf) => {
                        const isSelected = lifestyleOutlook === lf.value;
                        return (
                          <button
                            key={lf.value}
                            type="button"
                            onClick={() => {
                              soundManager.playTap();
                              setLifestyleOutlook(lf.value);
                            }}
                            className={`w-full p-3 rounded-2xl border text-start transition flex items-center justify-between gap-2 text-xs cursor-pointer ${
                              isSelected
                                ? isLight
                                  ? 'bg-purple-50 border-purple-400 text-purple-950 font-bold shadow-sm'
                                  : 'bg-purple-500/20 border-purple-400 text-white font-bold shadow-sm'
                                : isLight
                                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                : 'bg-slate-950/60 border-white/10 text-slate-300 hover:bg-white/5'
                            }`}
                          >
                            <span>{isAr ? lf.labelAr : lf.labelEn}</span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-purple-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ----------------- STEP 3: VALUES, COMMUNICATION, CONFLICT & FINANCIAL/FAMILY VISION ----------------- */}
              {wizardStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-black font-['Alexandria']">
                      {isAr
                        ? 'الخطوة الثالثة: القيم وأسلوب التواصل وحل الخلافات والرؤية المالية والأسرية'
                        : 'Step 3: Core Values, Conflict Resolution & Financial/Family Vision'}
                    </h3>
                    <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {isAr
                        ? 'تُعد هذه الركائز الثلاث (توافق القيم، إدارة الخلاف، والشفافية المالية) المحددات العلمية الأهم لاستقرار العلاقات طويلة الأمد وفق أبحاث جون غوتمان.'
                        : 'These three pillars (value congruence, conflict repair, and financial alignment) are the strongest predictors of long-term relational stability.'}
                    </p>
                  </div>

                  {/* 1. Core Relational Values */}
                  <div className="space-y-2.5">
                    <label className="block text-xs sm:text-sm font-bold text-emerald-500">
                      {isAr
                        ? '١. القيمة العليا التي تمنحها الأولوية القصوى في الشراكة:'
                        : '1. Primary Core Value in a Life Partnership:'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {CORE_VALUES_OPTIONS.map((v) => {
                        const isSelected = coreValuesPriority === v.labelAr;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => {
                              soundManager.playTap();
                              setCoreValuesPriority(v.labelAr);
                            }}
                            className={`p-3.5 rounded-2xl border text-start transition flex items-center justify-between gap-2 text-xs cursor-pointer ${
                              isSelected
                                ? isLight
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-sm'
                                  : 'bg-emerald-500/20 border-emerald-400 text-white font-bold shadow-sm'
                                : isLight
                                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                : 'bg-slate-950/60 border-white/10 text-slate-300 hover:bg-white/5'
                            }`}
                          >
                            <span className="leading-relaxed">
                              {isAr ? v.labelAr : v.labelEn}
                            </span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Communication & Conflict Resolution Style */}
                  <div className="space-y-2.5 pt-2 border-t border-white/10">
                    <label className="block text-xs sm:text-sm font-bold text-blue-500">
                      {isAr
                        ? '٢. أسلوب التواصل المفضل وإدارة الخلافات الزوجية:'
                        : '2. Preferred Communication & Conflict Resolution Style:'}
                    </label>
                    <div className="space-y-2">
                      {COMMUNICATION_CONFLICT_OPTIONS.map((c) => {
                        const isSelected = communicationAndConflictStyle === c.labelAr;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                              soundManager.playTap();
                              setCommunicationAndConflictStyle(c.labelAr);
                            }}
                            className={`w-full p-3.5 rounded-2xl border text-start transition flex items-center justify-between gap-2 text-xs cursor-pointer ${
                              isSelected
                                ? isLight
                                  ? 'bg-blue-50 border-blue-500 text-blue-950 font-bold shadow-sm'
                                  : 'bg-blue-500/20 border-blue-400 text-white font-bold shadow-sm'
                                : isLight
                                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                : 'bg-slate-950/60 border-white/10 text-slate-300 hover:bg-white/5'
                            }`}
                          >
                            <span className="leading-relaxed">
                              {isAr ? c.labelAr : c.labelEn}
                            </span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-blue-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Financial & Family Vision */}
                  <div className="space-y-2.5 pt-2 border-t border-white/10">
                    <label className="block text-xs sm:text-sm font-bold text-amber-500 flex items-center gap-1.5">
                      <Landmark className="w-4 h-4" />
                      <span>
                        {isAr
                          ? '٣. الرؤية المالية والأسرية المستقبلية:'
                          : '3. Future Financial & Family Governance Vision:'}
                      </span>
                    </label>
                    <div className="space-y-2">
                      {FINANCIAL_FAMILY_VISION_OPTIONS.map((f) => {
                        const isSelected = financialAndFamilyVision === f.labelAr;
                        return (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => {
                              soundManager.playTap();
                              setFinancialAndFamilyVision(f.labelAr);
                            }}
                            className={`w-full p-3.5 rounded-2xl border text-start transition flex items-center justify-between gap-2 text-xs cursor-pointer ${
                              isSelected
                                ? isLight
                                  ? 'bg-amber-50 border-amber-500 text-amber-950 font-bold shadow-sm'
                                  : 'bg-amber-500/20 border-amber-400 text-white font-bold shadow-sm'
                                : isLight
                                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                                : 'bg-slate-950/60 border-white/10 text-slate-300 hover:bg-white/5'
                            }`}
                          >
                            <span className="leading-relaxed">
                              {isAr ? f.labelAr : f.labelEn}
                            </span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-amber-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ----------------- STEP 4: FINAL REVIEW, SUMMARY & MANDATORY CONSENT ----------------- */}
              {wizardStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isRTL ? -20 : 20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-black font-['Alexandria']">
                      {isAr
                        ? 'الخطوة الرابعة: المراجعة النهائية وملخص البيانات والموافقة'
                        : 'Step 4: Final Data Review, Summary & Mandatory Consent'}
                    </h3>
                    <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      {isAr
                        ? 'راجع ملخص اختياراتك في الخطوات الثلاث السابقة، ثم اقبل مربع الموافقة الإلزامي لبدء حساب التوافق السيكومتري.'
                        : 'Review your selections across the previous three steps and check the mandatory privacy consent box to begin.'}
                    </p>
                  </div>

                  {/* Summary Cards Grid */}
                  <div className="space-y-3">
                    {/* Summary 1: Step 1 */}
                    <div
                      className={`p-4 rounded-2xl border space-y-2 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-blue-500">
                          {isAr ? '١. الأساسيات الديموغرافية' : '1. Fundamentals'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setWizardStep(1)}
                          className="text-[11px] font-bold text-blue-500 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{isAr ? 'تعديل' : 'Edit'}</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px]">
                            {isAr ? 'اللقب / الاسم المستعار:' : 'Nickname:'}
                          </span>
                          <span className="font-bold">
                            {userName.trim() || (isAr ? 'زائر كريم' : 'Guest')}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">
                            {isAr ? 'الجنس / الشريك:' : 'Gender / Partner:'}
                          </span>
                          <span className="font-bold">
                            {userGender === 'male'
                              ? isAr
                                ? 'ذكر ← أنثى'
                                : 'Male → Female'
                              : isAr
                              ? 'أنثى ← ذكر'
                              : 'Female → Male'}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">
                            {isAr ? 'سنة الميلاد والجيل:' : 'Birth Year & Cohort:'}
                          </span>
                          <span className="font-bold font-mono">
                            {birthYear} (~{computedAge} {isAr ? 'سنة' : 'y'})
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">
                            {isAr ? 'البلد:' : 'Country:'}
                          </span>
                          <span className="font-bold">{country}</span>
                        </div>
                      </div>
                    </div>

                    {/* Summary 2: Step 2 */}
                    <div
                      className={`p-4 rounded-2xl border space-y-2 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-purple-500">
                          {isAr
                            ? '٢. التفضيلات الثقافية ونمط الحياة'
                            : '2. Cultural Preferences & Lifestyle'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setWizardStep(2)}
                          className="text-[11px] font-bold text-purple-500 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{isAr ? 'تعديل' : 'Edit'}</span>
                        </button>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div>
                          <span className="text-slate-400">
                            {isAr ? 'الخلفية الثقافية الإقليمية: ' : 'Regional Culture: '}
                          </span>
                          <span className="font-bold">
                            {isAr ? selectedCultureObj.labelAr : selectedCultureObj.labelEn}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400">
                            {isAr ? 'المستوى التعليمي: ' : 'Education: '}
                          </span>
                          <span className="font-bold">{educationLevel}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">
                            {isAr ? 'نمط الحياة: ' : 'Lifestyle: '}
                          </span>
                          <span className="font-bold">{lifestyleOutlook}</span>
                        </div>
                      </div>
                    </div>

                    {/* Summary 3: Step 3 */}
                    <div
                      className={`p-4 rounded-2xl border space-y-2 ${
                        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-emerald-500">
                          {isAr
                            ? '٣. القيم وأسلوب التواصل والرؤية المالية'
                            : '3. Values, Communication & Financial Vision'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setWizardStep(3)}
                          className="text-[11px] font-bold text-emerald-500 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>{isAr ? 'تعديل' : 'Edit'}</span>
                        </button>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div>
                          <span className="text-slate-400">
                            {isAr ? 'الأولوية القيمية: ' : 'Core Value: '}
                          </span>
                          <span className="font-bold">{coreValuesPriority}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">
                            {isAr ? 'إدارة الخلاف: ' : 'Conflict Style: '}
                          </span>
                          <span className="font-bold">{communicationAndConflictStyle}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">
                            {isAr ? 'الرؤية المالية والأسرية: ' : 'Financial Vision: '}
                          </span>
                          <span className="font-bold">{financialAndFamilyVision}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MANDATORY PRIVACY & DATA PROTECTION CONSENT CHECKBOX */}
                  <div
                    className={`p-4 sm:p-5 rounded-2xl border transition ${
                      privacyConsentAccepted
                        ? isLight
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                          : 'bg-emerald-950/35 border-emerald-500/50 text-emerald-100'
                        : consentError
                        ? isLight
                          ? 'bg-rose-50 border-rose-500 text-rose-950'
                          : 'bg-rose-950/40 border-rose-500 text-rose-100'
                        : isLight
                        ? 'bg-amber-50/70 border-amber-300 text-slate-800'
                        : 'bg-slate-950/80 border-amber-500/40 text-slate-200'
                    }`}
                  >
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={privacyConsentAccepted}
                        onChange={(e) => {
                          soundManager.playTap();
                          setPrivacyConsentAccepted(e.target.checked);
                          if (e.target.checked) setConsentError(false);
                        }}
                        className="mt-1 w-5 h-5 rounded accent-emerald-600 cursor-pointer shrink-0"
                      />
                      <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
                        <span className="font-extrabold block">
                          {isAr
                            ? 'مربع الموافقة الإلزامي على سياسة الخصوصية وحماية البيانات (مطلوب): *'
                            : 'Mandatory Privacy Policy & Data Protection Consent (Required): *'}
                        </span>
                        <p className="text-xs opacity-90">
                          {isAr
                            ? 'أقرُّ بموافقتي الصريحة على سياسة الخصوصية وشروط الاستخدام ومبدأ الحد الأدنى من جمع البيانات (Data Minimization) التابع لمنصة «مرآة القلوب»، وأتفهم أن نتائج حاسبة التوافق تُعالَج لأغراض الاستبصار المعرفي والتربوي ولا تُعد تشخيصاً طبياً أو إكلينيكياً، مع احتفاظي بحق حذف بياناتي نهائياً في أي وقت من قائمة «ملفي».'
                            : 'I explicitly agree to the Privacy Policy, Terms of Service, and Data Minimization standards of Mirror of Hearts. I understand that this compatibility calculation is strictly for educational self-discovery rather than clinical diagnosis, and that I can permanently delete my data at any time via the "My Profile" menu.'}
                        </p>
                      </div>
                    </label>

                    {consentError && !privacyConsentAccepted && (
                      <div className="mt-3 pt-2 border-t border-rose-500/30 flex items-center gap-2 text-xs font-bold text-rose-500">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>
                          {isAr
                            ? 'يُرجى تحديد مربع الموافقة الإلزامي على سياسة الخصوصية وحماية البيانات للمتابعة.'
                            : 'Please check the mandatory Privacy Policy & Data Protection consent box to proceed.'}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ================= WIZARD NAVIGATION FOOTER (PREV / NEXT / SUBMIT) ================= */}
            <div
              className={`pt-4 border-t flex items-center justify-between gap-3 ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}
            >
              {wizardStep > 1 ? (
                <button
                  type="button"
                  onClick={goToPrevStep}
                  className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                >
                  {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                  <span>{isAr ? 'الخطوة السابقة' : 'Previous Step'}</span>
                </button>
              ) : (
                <div />
              )}

              {wizardStep < 4 ? (
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-extrabold transition shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>
                    {isAr
                      ? `متابعة إلى الخطوة ${wizardStep + 1}`
                      : `Continue to Step ${wizardStep + 1}`}
                  </span>
                  {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              ) : (
                <button
                  type="submit"
                  className={`px-6 py-3.5 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition shadow-lg cursor-pointer ${
                    privacyConsentAccepted
                      ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:opacity-95 text-white shadow-emerald-900/30'
                      : isLight
                      ? 'bg-slate-200 text-slate-500 border border-slate-300'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>
                    {isAr
                      ? 'بدء حساب التوافق واستكشاف الشريك'
                      : 'Start Compatibility Calculation'}
                  </span>
                  <Heart className="w-4 h-4 fill-current" />
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Behind The Scenes: Human Team & Philosophy Section */}
      {(activeHubTab === 'all' || activeHubTab === 'behind_scenes') && (
        <BehindTheScenesSection
          onExploreTests={onOpenIntelligenceTests}
          onExploreNovels={onOpenNovels}
          onOpenContactFeedback={onOpenContactFeedback}
        />
      )}
    </div>
  );
};
