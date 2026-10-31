import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  BookOpen,
  Brain,
  Compass,
  ArrowLeft,
  Heart,
  CheckCircle2,
  Clock,
  Layers,
  Award,
} from 'lucide-react';
import { PartnerAnalysisResult, UserProfile } from '../types';
import { soundManager } from '../utils/sound';

interface Props {
  result: PartnerAnalysisResult;
  profile: UserProfile;
  onOpenPsychologyTests?: () => void;
  onOpenIntelligenceTests?: () => void;
  onOpenArticles?: (articleId?: string) => void;
  onOpenNovels?: (novelId?: string) => void;
}

export const SmartRecommendationsSection: React.FC<Props> = ({
  result,
  profile,
  onOpenPsychologyTests,
  onOpenIntelligenceTests,
  onOpenArticles,
  onOpenNovels,
}) => {
  // Determine personalized suggestions based on analysis result & scores
  const intellectualScore = result.intellectualScore || 96;
  const emotionalScore = result.emotionalScore || 98;
  const sociologicalScore = result.sociologicalScore || 95;

  // Curated smart articles tailored to the profile
  const recommendedArticles = [
    {
      id: 'intellectual-compatibility-secrets',
      title: 'أسرار التوافق الفكري والقرارات المشتركة في مؤسسة الزواج الحديثة',
      tag: 'توصية فكرية',
      tagColor: 'text-sky-300 bg-sky-950/80 border-sky-500/30',
      reason: `بناءً على نسبة التوافق الفكري (${intellectualScore}%) لتعزيز اتخاذ القرارات المشتركة.`,
      icon: '🧠',
      readTime: '5 دقائق',
    },
    {
      id: 'emotional-intelligence-marriage',
      title: 'الذكاء العاطفي وأساليب الاحتواء السيكولوجي لتفادي تراكم الخلافات',
      tag: 'توصية عاطفية',
      tagColor: 'text-rose-300 bg-rose-950/80 border-rose-500/30',
      reason: `بناءً على نمط ارتباطك (${result.attachmentStyle || 'الارتباط الآمن'}) لتقوية لغة المودة.`,
      icon: '💖',
      readTime: '6 دقائق',
    },
  ];

  // Curated complementary tests
  const recommendedTests = [
    {
      id: 'intelligence',
      title: 'مقياس الذكاءات المتعددة (Gardner & McKenzie)',
      type: 'ذكاءات 8 أبعاد',
      desc: 'اكتشف نوع ذكائك ومهاراتك الـ 24 الفرعية والمهن المناسبة للتكامل مع الشريك.',
      badge: 'مقياس عالمي 🔬',
      badgeColor: 'text-cyan-300 bg-cyan-950/80 border-cyan-500/30',
      icon: '💡',
      action: onOpenIntelligenceTests,
      buttonText: 'بدء اختبار الذكاءات',
    },
    {
      id: 'psychology_cattell',
      title: 'مقياس كاتل لـ 16 سمة شخصية (Cattell 16PF)',
      type: 'سيكومتري معمق',
      desc: 'قياس دقيق لسماتك في الصلابة العاطفية، التفكير المنطقي، والانفتاح الإنساني.',
      badge: 'معتمد إحصائياً 📊',
      badgeColor: 'text-purple-300 bg-purple-950/80 border-purple-500/30',
      icon: '🧬',
      action: onOpenPsychologyTests,
      buttonText: 'خوض مقياس الشخصية',
    },
  ];

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-7 border border-white/10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-amber-300 font-extrabold text-base sm:text-lg font-['Alexandria']">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <span>نظام التوصيات المعرفية والذكية (Smart Recommendations)</span>
          </div>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            تم تخصيص هذه التوصيات تلقائياً بناءً على نمط «{result.partnerArchetype}» ومؤشراتك السلوكية لتعزيز الوعي وبناء علاقة متوازنة.
          </p>
        </div>

        <span className="px-3 py-1 rounded-xl bg-purple-950/80 border border-purple-500/30 text-[11px] font-bold text-purple-200 self-start sm:self-auto shrink-0 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-purple-400" />
          <span>توصيات سيكولوجية مخصصة</span>
        </span>
      </div>

      {/* Grid: 2 Columns (Recommended Tests & Recommended Articles) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Column 1: Complementary Tests */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <Brain className="w-4 h-4 text-purple-400" />
            <span>الاختبارات التكميلية المقترحة لك:</span>
          </div>

          <div className="space-y-3">
            {recommendedTests.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${t.badgeColor}`}>
                      {t.badge}
                    </span>
                    <span className="text-base">{t.icon}</span>
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1">{t.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{t.desc}</p>
                </div>

                {t.action && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      t.action!();
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-purple-200 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <span>{t.buttonText}</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Recommended Articles & Reading */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>مقالات سيكولوجية تدعم نتيجتك:</span>
          </div>

          <div className="space-y-3">
            {recommendedArticles.map((art) => (
              <div
                key={art.id}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${art.tagColor}`}>
                      {art.tag}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{art.readTime}</span>
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1 flex items-start gap-1.5">
                    <span className="shrink-0">{art.icon}</span>
                    <span>{art.title}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{art.reason}</p>
                </div>

                {onOpenArticles && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      onOpenArticles(art.id);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-sky-600/30 hover:bg-sky-600/50 border border-sky-400/40 text-sky-200 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <span>قراءة المقال والتحليل 📖</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Psychology Novel Bridge */}
      {onOpenNovels && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-slate-900 border border-pink-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-right">
            <span className="text-2xl">📚</span>
            <div>
              <h4 className="font-bold text-sm text-white">
                رواية سيكولوجية مستوحاة من ثقافة «{profile.country}»
              </h4>
              <p className="text-xs text-slate-300">
                استكشف عمق المشاعر الإنسانية وعقد الشخصيات من خلال الروايات الأدبية والتحقيقات النفسية التفاعلية.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              soundManager.playTap();
              onOpenNovels();
            }}
            className="py-2 px-4 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs whitespace-nowrap transition cursor-pointer shrink-0"
          >
            تصفح مكتبة الروايات 📖
          </button>
        </div>
      )}

      {/* Explicit Scientific Disclaimer Under Results */}
      <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-emerald-300">
          <span>⚖️ إخلاء مسؤولية علمي وتوعوي:</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400">
          هذه النتائج والتوصيات مقدمة لأغراض الإرشاد الذاتي والتوافق المعرفي والإثراء الإنساني؛ ولا تشكل بأي حال من الأحوال تشخيصاً عيادياً أو طبياً نفسياً. كل شخص يتميز بتفرده ومرونته النفسية المستمرة في التطور والنمو.
        </p>
      </div>
    </div>
  );
};
