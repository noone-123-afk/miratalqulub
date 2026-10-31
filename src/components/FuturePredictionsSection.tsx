import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Calendar,
  Compass,
  Clock,
  Home,
  Briefcase,
  Users,
  Plane,
  Flame,
  Award,
  Check,
  Copy,
  ChevronRight,
  ChevronLeft,
  Key,
  ShieldCheck,
  Eye,
  Camera,
} from 'lucide-react';
import { UserProfile, PartnerAnalysisResult, FutureHorizonPrediction } from '../types';
import { generateFuturePredictions } from '../utils/futurePredictions';
import { soundManager } from '../utils/sound';

interface Props {
  profile: UserProfile;
  result?: PartnerAnalysisResult | null;
}

export const FuturePredictionsSection: React.FC<Props> = ({ profile, result }) => {
  const predictions = generateFuturePredictions(profile, result);
  // Default to the 5-year horizon as specifically requested by user!
  const [selectedHorizonYears, setSelectedHorizonYears] = useState<number>(5);
  const [copiedForecast, setCopiedForecast] = useState<boolean>(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const currentPrediction =
    predictions.find((p) => p.years === selectedHorizonYears) || predictions[2];

  const partnerName =
    result?.proposedPartnerName || (profile.partnerGender === 'female' ? 'نـورة' : 'فيـصل');

  const handleSelectHorizon = (years: number) => {
    soundManager.playTab();
    setSelectedHorizonYears(years);
    setActiveImageIndex(0);
  };

  const handleCopyForecast = () => {
    soundManager.playTap();
    const text = `🔮 توقعات المستقبل المشترك ومحطات الحياة (${currentPrediction.labelAr}):\n\n✨ ${currentPrediction.themeTitleAr}\n\n🏡 ${currentPrediction.summaryAr}\n\n🔑 مفتاح النجاح الذهبي: ${currentPrediction.goldenKeyAr}\n\nكاشف شريك الحياة والتوافق النفسي 💖`;
    navigator.clipboard.writeText(text);
    setCopiedForecast(true);
    setTimeout(() => setCopiedForecast(false), 2500);
  };

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-purple-500/30 relative overflow-hidden bg-gradient-to-b from-purple-950/40 via-slate-900/90 to-slate-950 shadow-2xl">
      {/* Decorative Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-gradient-to-b from-purple-600/15 via-rose-500/10 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 relative z-10 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-rose-600 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/25 shrink-0 text-white">
            🔮
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-white font-['Alexandria']">
                توقعات المستقبل المشترك ومحطات الحياة
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/40 text-[10px] text-purple-300 font-extrabold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>محاكاة استشرافية دقيقة</span>
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-0.5">
              رسم سيناريوهات وتفاصيل حياتكما معاً عبر السنوات بناءً على تحليل الشخصيات والكيمياء السلوكية
            </p>
          </div>
        </div>

        {/* Prediction Accuracy Meter */}
        <div className="flex items-center gap-2 self-end sm:self-auto px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
          <span className="text-[11px] text-gray-400">مؤشر الاحتمالية:</span>
          <strong className="text-emerald-400 font-bold font-mono">
            {currentPrediction.aiProbability}%
          </strong>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
      </div>

      {/* Time Horizon Selector Tabs */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-6 p-1 rounded-2xl bg-black/40 border border-white/10">
        {predictions.map((p) => {
          const isSelected = p.years === selectedHorizonYears;
          return (
            <button
              key={p.years}
              type="button"
              onClick={() => handleSelectHorizon(p.years)}
              className={`py-2.5 px-1.5 sm:px-3 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center gap-0.5 cursor-pointer relative ${
                isSelected
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white shadow-lg shadow-purple-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {p.years === 5 && (
                <span className="absolute -top-2.5 right-1 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black shadow-sm uppercase">
                  الأبرز 🌟
                </span>
              )}
              <span className="font-['Alexandria']">{p.labelAr}</span>
              <span className="text-[10px] opacity-80 hidden sm:inline">{p.badgeAr}</span>
            </button>
          );
        })}
      </div>

      {/* Main Horizon Card Body with Animated Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPrediction.years}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="space-y-6"
        >
          {/* Theme Title & Narrative Summary */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-rose-950/40 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2 text-rose-300 text-xs font-bold">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>محطة {currentPrediction.labelAr} مع {partnerName}:</span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-white font-['Alexandria'] mb-2 leading-snug">
              {currentPrediction.themeTitleAr}
            </h4>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              {currentPrediction.summaryAr}
            </p>
          </div>

          {/* Symbolic Expressive Images Gallery (User Request: صور رمزية تعبيرية لهذه التوقعات) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-purple-400" />
                <span>صور رمزية تعبيرية لمشهد الحياة في هذه المرحلة:</span>
              </span>
              <span className="text-[11px] text-gray-400">
                {currentPrediction.symbolicImages.length} لقطات استشرافية 📸
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentPrediction.symbolicImages.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="group relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-lg aspect-video sm:aspect-[4/3]"
                >
                  <img
                    src={img.url}
                    alt={img.captionAr}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-90" />

                  {/* Top Tag */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2.5 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-[10px] text-amber-300 font-bold shadow-md">
                      {img.tagAr}
                    </span>
                  </div>

                  {/* Bottom Caption */}
                  <div className="absolute bottom-2.5 inset-x-2.5 text-right">
                    <p className="text-xs font-bold text-white drop-shadow leading-snug">
                      {img.captionAr}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pillars of Future Life (Home, Career, Romance, Family, Travel) */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-gray-200 block px-1">
              تفاصيل أبعاد الحياة المشتركة في هذه المرحلة:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {currentPrediction.pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition space-y-2 text-right"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{pillar.icon}</span>
                    <h5 className="text-xs font-bold text-white font-['Alexandria']">
                      {pillar.titleAr}
                    </h5>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-relaxed">
                    {pillar.descriptionAr}
                  </p>
                  <div className="pt-1.5 border-t border-white/5 text-[10px] text-amber-300/90 font-medium">
                    ✨ {pillar.highlightAr}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Key for This Forecast & Share Action */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-right">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
                <Key className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-300 block">
                  مفتاح النجاح الذهبي لتحقيق هذا التوقع:
                </span>
                <p className="text-xs text-gray-200 mt-0.5">
                  «{currentPrediction.goldenKeyAr}»
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyForecast}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shrink-0 self-end sm:self-auto"
            >
              {copiedForecast ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">تم النسخ بنجاح</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>نسخ توقعات {currentPrediction.labelAr}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
