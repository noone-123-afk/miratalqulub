import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion, UserProfile } from '../types';
import { soundManager } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { ScientificClinicalDisclaimerBanner } from './PsychometricAcademicFraming';
import {
  detectUserLocationAndNationality,
  refineEthnicPromptWithQuizAnswers,
  getNationalityEntryByCountry,
  NATIONALITY_DATABASE,
  DetectedNationalityProfile,
} from '../utils/locationNationalityDetector';
import {
  ArrowRight,
  Sparkles,
  Coffee,
  Compass,
  Users,
  Target,
  Shield,
  Smile,
  Gift,
  Laugh,
  MessageCircleHeart,
  Clock,
  Handshake,
  Sparkle,
  Brain,
  HeartHandshake,
  Feather,
  Crown,
  Zap,
  ShieldCheck,
  TrendingUp,
  Sun,
  DoorOpen,
  Layout,
  Palette,
  Globe,
  Briefcase,
  Heart,
  Leaf,
  Rocket,
  MapPin,
} from 'lucide-react';

interface Props {
  questions: QuizQuestion[];
  profile?: UserProfile | null;
  onComplete: (answers: Record<number, string>, detectedLocation?: DetectedNationalityProfile) => void;
  onBackToProfile: () => void;
}

// Icon mapper
const ICON_MAP: Record<string, React.ReactNode> = {
  Coffee: <Coffee className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
  Smile: <Smile className="w-5 h-5" />,
  Gift: <Gift className="w-5 h-5" />,
  Laugh: <Laugh className="w-5 h-5" />,
  MessageCircleHeart: <MessageCircleHeart className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  Handshake: <Handshake className="w-5 h-5" />,
  Sparkle: <Sparkle className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5" />,
  Feather: <Feather className="w-5 h-5" />,
  Crown: <Crown className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Sun: <Sun className="w-5 h-5" />,
  DoorOpen: <DoorOpen className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Leaf: <Leaf className="w-5 h-5" />,
  Rocket: <Rocket className="w-5 h-5" />,
};

const questionVariants = {
  initial: { opacity: 0, x: 28 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    x: -28,
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

const optionsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const optionItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const PARTNER_QUIZ_AUTOSAVE_KEY = 'mirat_partner_quiz_autosave_v2';

export const QuizStep: React.FC<Props> = ({
  questions,
  profile,
  onComplete,
  onBackToProfile,
}) => {
  const { direction, language } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';
  const partnerGender = profile?.partnerGender || 'female';

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(PARTNER_QUIZ_AUTOSAVE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.currentIndex === 'number' && parsed.currentIndex < questions.length) {
          return parsed.currentIndex;
        }
      }
    } catch {
      // ignore
    }
    return 0;
  });

  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem(PARTNER_QUIZ_AUTOSAVE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers && typeof parsed.answers === 'object') {
          return parsed.answers;
        }
      }
    } catch {
      // ignore
    }
    return {};
  });

  // Automatic Location & Nationality Detection State while answering questions
  const [detectedLocation, setDetectedLocation] = useState<DetectedNationalityProfile>(() =>
    getNationalityEntryByCountry(
      profile?.detectedCountryCode || profile?.country || 'SA',
      partnerGender
    )
  );
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    setIsDetectingLocation(true);
    detectUserLocationAndNationality({
      partnerGender,
      fallbackCountry: profile?.country,
      answers,
    }).then((detected) => {
      if (!mounted) return;
      setDetectedLocation(detected);
      setIsDetectingLocation(false);
    });
    return () => {
      mounted = false;
    };
  }, [partnerGender, profile?.country]);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const currentQ = questions[currentIndex] || questions[0];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleManualNationalityOverride = (countryCode: string) => {
    soundManager.playTap();
    const manualEntry = getNationalityEntryByCountry(countryCode, partnerGender);
    const refined = refineEthnicPromptWithQuizAnswers(manualEntry, answers, partnerGender);
    setDetectedLocation({
      ...refined,
      detectionSource: 'manual',
    });
  };

  const handleResetQuiz = () => {
    soundManager.playTap();
    try {
      localStorage.removeItem(PARTNER_QUIZ_AUTOSAVE_KEY);
    } catch {
      // ignore
    }
    setAnswers({});
    setCurrentIndex(0);
    setSelectedOptionId(null);
  };

  const handleSelectOption = (optionId: string) => {
    soundManager.playTap();
    setSelectedOptionId(optionId);

    const updatedAnswers = { ...answers, [currentQ.id]: optionId };
    setAnswers(updatedAnswers);

    // Dynamically refine the ethnic facial features AI prompt as the user answers each question
    const refinedLocation = refineEthnicPromptWithQuizAnswers(
      detectedLocation,
      updatedAnswers,
      partnerGender
    );
    setDetectedLocation(refinedLocation);

    // Auto advance after short tactile delay
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        soundManager.playPageTransition();
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setSelectedOptionId(null);
        try {
          localStorage.setItem(
            PARTNER_QUIZ_AUTOSAVE_KEY,
            JSON.stringify({
              answers: updatedAnswers,
              currentIndex: nextIndex,
              updatedAt: new Date().toISOString(),
            })
          );
        } catch {
          // ignore
        }
      } else {
        soundManager.playPageTransition();
        try {
          localStorage.removeItem(PARTNER_QUIZ_AUTOSAVE_KEY);
        } catch {
          // ignore
        }
        onComplete(updatedAnswers, refinedLocation);
      }
    }, 280);
  };

  const handlePrevious = () => {
    soundManager.playPageTransition();
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setSelectedOptionId(null);
    } else {
      onBackToProfile();
    }
  };

  return (
    <div
      className={`w-full max-w-xl mx-auto px-4 py-4 ${
        isLight ? 'text-slate-900' : 'text-white'
      }`}
      dir={direction}
    >
      {/* Clinical & Scientific Disclaimer at the beginning of the Compatibility Quiz */}
      <ScientificClinicalDisclaimerBanner
        testType="compatibility"
        testTitleAr="اختبار التوافق النفسي والقيمي للشريك"
        testTitleEn="Partner Psychological & Values Compatibility Quiz"
        compact
      />

      {/* Automatic Location & Nationality Detector Banner for Realistic Ethnic Portrait Guidance */}
      <div
        className={`mb-4 p-3.5 rounded-2xl border transition-colors ${
          isLight
            ? 'bg-emerald-50/80 border-emerald-200 text-slate-800 shadow-sm'
            : 'bg-emerald-950/35 border-emerald-500/30 text-white'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-500 shrink-0">
              <MapPin className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-300">
                  {isAr
                    ? 'اكتشاف تلقائي للموقع والجنسية لتوجيه ملامح صورة الشريك بالذكاء الاصطناعي:'
                    : 'Auto-Detected Location & Nationality for AI Partner Ethnic Realism:'}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                  <span>{detectedLocation.flag}</span>
                  <span>{detectedLocation.countryNameAr}</span>
                  <span>•</span>
                  <span>{detectedLocation.nationalityAr}</span>
                </span>
              </div>
              <p
                className={`text-[11px] mt-1 leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {isDetectingLocation
                  ? isAr
                    ? 'جاري معايرة الموقع الجغرافي والملامح العرقية الواقعية أثناء إجابتك...'
                    : 'Calibrating location and realistic ethnic facial features...'
                  : detectedLocation.ethnicFacialTraitsDescriptionAr}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 ms-auto">
            <label htmlFor="quiz-nationality-select" className="text-[10px] font-bold opacity-75">
              {isAr ? 'تعديل الجنسية:' : 'Change:'}
            </label>
            <select
              id="quiz-nationality-select"
              aria-label={isAr ? 'تعديل الجنسية المكتشفة' : 'Change Detected Nationality'}
              title={isAr ? 'تعديل الجنسية المكتشفة' : 'Change Detected Nationality'}
              value={detectedLocation.countryCode}
              onChange={(e) => handleManualNationalityOverride(e.target.value)}
              className={`px-2 py-1 rounded-lg border text-[11px] font-bold cursor-pointer ${
                isLight
                  ? 'bg-white border-emerald-300 text-slate-800'
                  : 'bg-slate-900 border-emerald-500/40 text-white'
              }`}
            >
              {Object.values(NATIONALITY_DATABASE).map((entry) => (
                <option key={entry.code} value={entry.code}>
                  {entry.flag} {entry.nameAr} ({entry.nationalityAr})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Top Progress & Navigation */}
      <div className="mb-6 space-y-2">
        <div
          className={`flex items-center justify-between text-xs ${
            isLight ? 'text-slate-600' : 'text-gray-300'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              className={`flex items-center gap-1 hover:text-rose-500 transition cursor-pointer py-1 px-2.5 rounded-lg border ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-700'
                  : 'bg-white/5 border-white/10 text-gray-200'
              }`}
            >
              <ArrowRight className={`w-3.5 h-3.5 ${direction === 'ltr' ? 'rotate-180' : ''}`} />
              <span>{isAr ? 'السابق' : 'Previous'}</span>
            </motion.button>
            {Object.keys(answers).length > 0 && (
              <button
                type="button"
                onClick={handleResetQuiz}
                className={`py-1 px-2 rounded-lg border text-[10px] transition cursor-pointer ${
                  isLight
                    ? 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border-slate-200'
                    : 'bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-300 border-white/10'
                }`}
              >
                {isAr ? 'إعادة من الأول' : 'Reset'}
              </button>
            )}
          </div>
          <span
            className={`font-bold font-['Alexandria',sans-serif] ${
              isLight ? 'text-rose-600' : 'text-rose-300'
            }`}
          >
            {isAr
              ? `السؤال ${currentIndex + 1} من ${questions.length}`
              : `Question ${currentIndex + 1} of ${questions.length}`}
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] hidden sm:inline ${
                isLight ? 'text-emerald-600 font-bold' : 'text-emerald-400'
              }`}
            >
              {isAr ? '● حفظ تلقائي' : '● Auto-saved'}
            </span>
            <span className={`font-semibold ${isLight ? 'text-slate-600' : 'text-gray-400'}`}>
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div
          className={`w-full h-2 rounded-full overflow-hidden ${
            isLight ? 'bg-slate-200' : 'bg-white/10'
          }`}
        >
          <motion.div
            className="h-full bg-gradient-to-l from-rose-500 via-pink-500 to-violet-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Animated Question Card & Options Switcher */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          variants={questionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="space-y-4"
        >
          {/* Question Card */}
          <div
            className={`p-6 rounded-3xl border ${
              isLight
                ? 'bg-white border-slate-200 shadow-lg'
                : 'glass-panel-glow border-white/15'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                  isLight
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>{currentQ.category}</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full border ${
                  isLight
                    ? 'bg-slate-100 text-slate-600 border-slate-200'
                    : 'text-gray-400 bg-white/5 border-white/10'
                }`}
              >
                {currentQ.scientificDimension}
              </span>
            </div>

            <h3
              className={`text-xl sm:text-2xl font-extrabold leading-snug mb-2 font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {currentQ.title}
            </h3>
            <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-gray-300'}`}>
              {currentQ.subtitle}
            </p>
          </div>

          {/* Options List */}
          <motion.div
            variants={optionsContainerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {currentQ.options.map((option) => {
              const isChosen =
                selectedOptionId === option.id || answers[currentQ.id] === option.id;
              return (
                <motion.button
                  key={option.id}
                  variants={optionItemVariants}
                  whileHover={{ scale: 1.015, x: -3 }}
                  whileTap={{ scale: 0.985 }}
                  type="button"
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full p-4 rounded-2xl border text-start transition-colors duration-200 flex items-start gap-3.5 cursor-pointer ${
                    isChosen
                      ? isLight
                        ? 'bg-rose-50 border-rose-400 shadow-md text-slate-900'
                        : 'bg-gradient-to-l from-rose-500/30 to-violet-600/30 border-rose-400 shadow-lg shadow-rose-500/25 text-white'
                      : isLight
                      ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-rose-300 shadow-sm'
                      : 'bg-[#15102a]/80 hover:bg-[#1a1435] border-white/10 text-gray-200 hover:border-white/20'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-transform ${
                      isChosen
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105'
                        : isLight
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {ICON_MAP[option.icon] || <Sparkles className="w-5 h-5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      className={`font-bold text-sm sm:text-base leading-snug mb-1 ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {option.text}
                    </div>
                    <div
                      className={`text-xs leading-relaxed ${
                        isLight ? 'text-slate-600' : 'text-gray-400'
                      }`}
                    >
                      {option.description}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Footer Hint */}
      <p className={`text-center text-xs mt-6 ${isLight ? 'text-slate-500' : 'text-gray-400'}`}>
        {isAr
          ? 'اختر الإجابة الأقرب لعفويتك وطبيعتك لتكون النتيجة الاستكشافية أكثر دقة وواقعية ✨'
          : 'Choose the answer closest to your natural behavior for a more accurate exploratory result ✨'}
      </p>
    </div>
  );
};
