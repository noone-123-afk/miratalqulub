import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Brain, Fingerprint } from 'lucide-react';
import { UserProfile } from '../types';

interface Props {
  profile: UserProfile;
}

const STEPS = [
  'تحليل كيمياء الشخصية ونمط الحياة العاطفي...',
  'مطابقة الملامح العرقية والجمالية مع أصول شريكك...',
  'توليد التناغم الروحي وتفاصيل لغة الحب المشتركة...',
  'رسم الصورة الواقعية لشريك الحياة بدقة سينمائية...',
  'إعداد بطاقة توأم الروح والمواصفات الجوهرية...',
];

export const AnalyzingStep: React.FC<Props> = ({ profile }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) return prev + 1;
        return prev;
      });
    }, 1400);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 250);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto px-4 py-16 text-center text-white"
      dir="rtl"
    >
      {/* Animated glowing portal with Framer Motion continuous animations */}
      <div className="relative w-44 h-44 mx-auto mb-8 flex items-center justify-center">
        {/* Pulsing Outer Glow */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/40 via-pink-500/30 to-violet-600/40 blur-2xl pointer-events-none"
        />

        {/* Spinning Dotted/Dashed Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-1 rounded-full border-2 border-rose-500/40 border-dashed"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-5 rounded-full border-2 border-violet-500/40 border-dotted"
        />

        {/* Center Crystal Heart with floating motion */}
        <motion.div
          animate={{
            y: [-4, 4, -4],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-rose-500 via-pink-500 to-violet-600 p-0.5 shadow-2xl shadow-rose-500/50 flex items-center justify-center"
        >
          <div className="w-full h-full bg-[#140e2b] rounded-[22px] flex items-center justify-center">
            <span className="text-4xl">🔮</span>
          </div>
        </motion.div>
      </div>

      {/* Main heading */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-2xl font-black mb-2 text-white font-['Alexandria']"
      >
        جاري كشف <span className="text-gradient">توأم روحك</span>
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-xs sm:text-sm text-gray-300 mb-6"
      >
        المنصة تقوم الآن بمطابقة شخصيتك مع ملامح ({profile.ethnicity}) في ({profile.country}).
      </motion.p>

      {/* Live status ticker with smooth text replacement */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel p-4 rounded-2xl border border-white/10 mb-6"
      >
        <div className="h-7 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="flex items-center justify-center gap-2 text-rose-300 text-sm font-semibold"
            >
              <Sparkles className="w-4 h-4 animate-spin text-yellow-300 shrink-0" />
              <span>{STEPS[currentStepIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mt-3">
          <motion.div
            className="h-full bg-gradient-to-l from-rose-500 via-pink-500 to-violet-500 rounded-full"
            initial={{ width: '10%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-[11px] text-gray-400 mt-2 font-mono">اكتمال التحليل: {progress}%</div>
      </motion.div>

      {/* Features tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-gray-300"
      >
        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1">
          <Brain className="w-3 h-3 text-rose-400" /> تحليل نفسي عميق
        </span>
        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1">
          <Fingerprint className="w-3 h-3 text-violet-400" /> بصمة الملامح العرقية
        </span>
        <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1">
          <Heart className="w-3 h-3 text-pink-400" /> صورة واقعية 100%
        </span>
      </motion.div>
    </motion.div>
  );
};
