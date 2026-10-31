import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizQuestion } from '../types';
import { soundManager } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';
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
} from 'lucide-react';

interface Props {
  questions: QuizQuestion[];
  onComplete: (answers: Record<number, string>) => void;
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

export const QuizStep: React.FC<Props> = ({ questions, onComplete, onBackToProfile }) => {
  const { direction, language } = useLanguage();
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

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const currentQ = questions[currentIndex] || questions[0];
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

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
        onComplete(updatedAnswers);
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
    <div className="w-full max-w-xl mx-auto px-4 py-4 text-white" dir={direction}>
      {/* Top Progress & Navigation */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-300">
          <div className="flex items-center gap-1.5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevious}
              className="flex items-center gap-1 hover:text-rose-400 transition cursor-pointer py-1 px-2.5 rounded-lg bg-white/5 border border-white/10"
            >
              <ArrowRight className={`w-3.5 h-3.5 ${direction === 'ltr' ? 'rotate-180' : ''}`} />
              <span>{language === 'ar' ? 'السابق' : 'Previous'}</span>
            </motion.button>
            {Object.keys(answers).length > 0 && (
              <button
                type="button"
                onClick={handleResetQuiz}
                className="py-1 px-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-300 border border-white/10 text-[10px] transition cursor-pointer"
              >
                {language === 'ar' ? 'إعادة من الأول' : 'Reset'}
              </button>
            )}
          </div>
          <span className="font-bold text-rose-300 font-['Alexandria',sans-serif]">
            {language === 'ar'
              ? `السؤال ${currentIndex + 1} من ${questions.length}`
              : `Question ${currentIndex + 1} of ${questions.length}`}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-emerald-400 hidden sm:inline">● حفظ تلقائي</span>
            <span className="font-semibold text-gray-400">{progressPercent}%</span>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
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
          <div className="glass-panel-glow p-6 rounded-3xl border border-white/15">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>{currentQ.category}</span>
              </div>
              <span className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                {currentQ.scientificDimension}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug mb-2 font-['Alexandria']">
              {currentQ.title}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm">{currentQ.subtitle}</p>
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
                  className={`w-full p-4 rounded-2xl border text-right transition-colors duration-200 flex items-start gap-3.5 cursor-pointer ${
                    isChosen
                      ? 'bg-gradient-to-l from-rose-500/30 to-violet-600/30 border-rose-400 shadow-lg shadow-rose-500/25 text-white'
                      : 'bg-[#15102a]/80 hover:bg-[#1a1435] border-white/10 text-gray-200 hover:border-white/20'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-transform ${
                      isChosen
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {ICON_MAP[option.icon] || <Sparkles className="w-5 h-5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm sm:text-base leading-snug mb-1 text-white">
                      {option.text}
                    </div>
                    <div className="text-xs text-gray-400 leading-relaxed">
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
      <p className="text-center text-xs text-gray-400 mt-6">
        اختر الإجابة الأقرب لعفويتك وطبيعتك لتكون النتيجة أكثر دقة وواقعية ✨
      </p>
    </div>
  );
};
