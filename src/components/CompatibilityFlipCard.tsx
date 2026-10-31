import React from 'react';
import { motion } from 'framer-motion';
import { RotateCw, Sparkles, CheckCircle2, Lightbulb } from 'lucide-react';
import { soundManager } from '../utils/sound';

export interface CompatibilityCardData {
  id: string;
  title: string;
  categoryNameAr: string;
  icon: React.ReactNode;
  score: number;
  subtitle: string;
  themeColor: 'sky' | 'violet' | 'rose' | 'amber';
  deepAnalysis: string;
  goldenAdvice: string;
  tags: string[];
}

interface Props {
  data: CompatibilityCardData;
  isFlipped: boolean;
  onToggleFlip: () => void;
}

const THEME_STYLES = {
  sky: {
    border: 'border-sky-500/30 hover:border-sky-400/50',
    scoreText: 'text-sky-400',
    badgeBg: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    frontGradient: 'from-sky-500/10 via-transparent to-transparent',
    backGradient: 'from-sky-950/40 via-[#141829]/95 to-[#0f111f]/95',
    backGradientLight: 'from-sky-50 via-white to-sky-50/80',
    iconColor: 'text-sky-400',
    glowShadow: 'shadow-sky-500/10',
    adviceBg: 'bg-sky-500/10 border-sky-500/20 text-sky-200',
  },
  violet: {
    border: 'border-violet-500/30 hover:border-violet-400/50',
    scoreText: 'text-violet-400',
    badgeBg: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    frontGradient: 'from-violet-500/10 via-transparent to-transparent',
    backGradient: 'from-violet-950/40 via-[#1a1229]/95 to-[#120d20]/95',
    backGradientLight: 'from-violet-50 via-white to-purple-50/80',
    iconColor: 'text-violet-400',
    glowShadow: 'shadow-violet-500/10',
    adviceBg: 'bg-violet-500/10 border-violet-500/20 text-violet-200',
  },
  rose: {
    border: 'border-rose-500/30 hover:border-rose-400/50',
    scoreText: 'text-rose-400',
    badgeBg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    frontGradient: 'from-rose-500/10 via-transparent to-transparent',
    backGradient: 'from-rose-950/40 via-[#22101e]/95 to-[#150a14]/95',
    backGradientLight: 'from-rose-50 via-white to-pink-50/80',
    iconColor: 'text-rose-400',
    glowShadow: 'shadow-rose-500/10',
    adviceBg: 'bg-rose-500/10 border-rose-500/20 text-rose-200',
  },
  amber: {
    border: 'border-amber-500/30 hover:border-amber-400/50',
    scoreText: 'text-amber-400',
    badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    frontGradient: 'from-amber-500/10 via-transparent to-transparent',
    backGradient: 'from-amber-950/40 via-[#241710]/95 to-[#150e09]/95',
    backGradientLight: 'from-amber-50 via-white to-yellow-50/80',
    iconColor: 'text-amber-400',
    glowShadow: 'shadow-amber-500/10',
    adviceBg: 'bg-amber-500/10 border-amber-500/20 text-amber-200',
  },
};

export const CompatibilityFlipCard: React.FC<Props> = ({
  data,
  isFlipped,
  onToggleFlip,
}) => {
  const styles = THEME_STYLES[data.themeColor];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playTap();
    onToggleFlip();
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer select-none relative w-full h-[220px] sm:h-[235px]"
      style={{ perspective: 1200 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as any);
        }
      }}
      aria-label={`${data.title}: ${data.score}%. انقر لقلب البطاقة وقراءة التحليل والنصيحة`}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          ease: [0.23, 1, 0.32, 1],
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative"
      >
        {/* ================= CARD FRONT ================= */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          className={`absolute inset-0 w-full h-full rounded-2xl p-3.5 flex flex-col justify-between border bg-gradient-to-b ${styles.frontGradient} bg-white/5 backdrop-blur-md shadow-lg ${styles.glowShadow} ${styles.border} transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl`}
        >
          {/* Header Row */}
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-200">
              <span className={`p-1.5 rounded-xl bg-white/5 border border-white/10 ${styles.iconColor}`}>
                {data.icon}
              </span>
              <span className="truncate">{data.title}</span>
            </div>

            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="p-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 group-hover:text-white transition"
              title="انقر لقلب البطاقة"
            >
              <RotateCw className="w-3 h-3" />
            </motion.div>
          </div>

          {/* Central Score Display */}
          <div className="text-center my-auto py-1 space-y-1">
            <div className={`text-3xl sm:text-4xl font-black ${styles.scoreText} font-['Alexandria'] tracking-tight drop-shadow-sm`}>
              {data.score}%
            </div>
            <p className="text-[11px] text-gray-300 font-medium leading-tight px-1">
              {data.subtitle}
            </p>
          </div>

          {/* Bottom Interactive Hint */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400 group-hover:text-gray-200 transition">
            <span className="flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-rose-400" />
              <span>تحليل ونصح معمّق</span>
            </span>
            <span className="flex items-center gap-1 font-semibold text-rose-400/90 group-hover:text-rose-300">
              <span>اقلب البطاقة</span>
              <RotateCw className="w-2.5 h-2.5 group-hover:rotate-45 transition-transform" />
            </span>
          </div>
        </div>

        {/* ================= CARD BACK ================= */}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className={`absolute inset-0 w-full h-full rounded-2xl p-3 flex flex-col justify-between border bg-gradient-to-b ${styles.backGradient} backdrop-blur-xl shadow-2xl ${styles.glowShadow} ${styles.border} text-right overflow-hidden`}
        >
          {/* Header Row on Back */}
          <div className="flex items-center justify-between gap-1.5 pb-1.5 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${styles.scoreText} bg-current`} />
              <span className="text-[11px] font-extrabold text-white">
                {data.categoryNameAr}
              </span>
            </div>

            <button
              onClick={handleClick}
              className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-gray-200 transition cursor-pointer"
              title="إعادة للواجهة"
            >
              <span>الواجهة</span>
              <RotateCw className="w-2.5 h-2.5" />
            </button>
          </div>

          {/* Content Body: Deep Analysis & Golden Advice */}
          <div className="flex-1 overflow-y-auto my-1.5 pr-0.5 space-y-1.5 text-right custom-scrollbar">
            {/* Deep Analysis Snippet */}
            <div className="space-y-0.5">
              <div className="text-[10px] font-bold text-gray-300 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                <span>التحليل الواقعي:</span>
              </div>
              <p className="text-[10.5px] leading-relaxed text-gray-200 font-normal">
                {data.deepAnalysis}
              </p>
            </div>

            {/* Golden Advice Box */}
            <div className={`p-2 rounded-xl border text-[10px] leading-relaxed ${styles.adviceBg}`}>
              <div className="font-bold flex items-center gap-1 mb-0.5 text-amber-300">
                <Lightbulb className="w-2.5 h-2.5 shrink-0" />
                <span>نصيحة ذهبية للطرفين:</span>
              </div>
              <p className="text-gray-100 font-medium">
                {data.goldenAdvice}
              </p>
            </div>
          </div>

          {/* Tags Footer */}
          <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] text-gray-400 shrink-0">
            <div className="flex items-center gap-1 overflow-hidden">
              {data.tags.slice(0, 2).map((t, idx) => (
                <span key={idx} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 truncate">
                  {t}
                </span>
              ))}
            </div>
            <span className="text-gray-400 text-[9px] shrink-0 font-medium">
              اضغط للقلب ↩️
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
