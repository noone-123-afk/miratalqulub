import React from 'react';
import { BookOpen, Brain, Compass, ArrowLeft, ArrowRight, Sparkles, Clock, Layers } from 'lucide-react';
import {
  NextStepRecommendationBundle,
  ResolvedTestCard,
} from '../data/recommendationsMapping';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';

interface NextStepRecommendationsProps {
  bundle: NextStepRecommendationBundle;
  onBeforeNavigate?: () => void;
  onLaunchTest?: (testCard: ResolvedTestCard) => boolean | void;
  forceDark?: boolean;
}

export const NextStepRecommendations: React.FC<NextStepRecommendationsProps> = ({
  bundle,
  onBeforeNavigate,
  onLaunchTest,
  forceDark = false,
}) => {
  const { language, isRTL } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = !forceDark && theme === 'light';

  const handleOpenArticle = () => {
    soundManager.playTap();
    try {
      sessionStorage.setItem('mirat_open_article_id', bundle.article.id);
    } catch {
      // ignore storage errors
    }
    onBeforeNavigate?.();
    window.location.hash = bundle.article.route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenNovel = () => {
    soundManager.playTap();
    try {
      if (bundle.novel.kind === 'novel_genre') {
        sessionStorage.setItem('mirat_open_novel_genre', bundle.novel.genre);
        window.dispatchEvent(
          new CustomEvent('mirat:open-novel-genre', { detail: bundle.novel.genre })
        );
      }
    } catch {
      // ignore storage errors
    }
    onBeforeNavigate?.();
    window.location.hash = bundle.novel.route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTest = () => {
    soundManager.playTap();
    if (onLaunchTest) {
      const handled = onLaunchTest(bundle.test);
      if (handled === true) return;
    }

    onBeforeNavigate?.();

    if (bundle.test.launchKind === 'compatibility') {
      window.location.hash = '#/compatibility';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      sessionStorage.setItem('mirat_pending_test_launch', JSON.stringify(bundle.test));
    } catch {
      // ignore storage errors
    }

    window.dispatchEvent(new CustomEvent('mirat:launch-test', { detail: bundle.test }));
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section
      aria-label={isAr ? 'خطوتك التالية بناءً على نتيجتك' : 'Your Next Step Based on Your Result'}
      className={`rounded-3xl border p-5 sm:p-6 space-y-5 shadow-xl ${
        isLight
          ? 'bg-gradient-to-br from-white via-slate-50 to-indigo-50/50 border-slate-200 text-slate-900'
          : 'bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-indigo-950/50 border-white/15 text-white'
      }`}
    >
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b pb-3.5 ${
          isLight ? 'border-slate-200' : 'border-white/10'
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400 shrink-0" />
            <h3 className="font-extrabold text-base sm:text-lg font-['Alexandria']">
              {isAr ? 'خطوتك التالية بناءً على نتيجتك' : 'Your Next Step Based on Your Result'}
            </h3>
          </div>
          <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {isAr
              ? 'مسار معرفي وتطبيقي منتقى بدقة من مكتبة «مرآة القلوب» استناداً إلى أبرز مؤشرات تقريرك.'
              : 'Curated directly from the Mirror of Hearts library based on your strongest result dimensions.'}
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold border self-start sm:self-auto shrink-0 ${
            isLight
              ? 'bg-amber-50 border-amber-200 text-amber-800'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAr ? 'توصية مخصصة من 3 خطوات' : '3-Step Tailored Path'}</span>
        </span>
      </div>

      {/* Exactly 3 Concise Cards: Article, Test, Novel/Genre */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Suggested Article */}
        <div
          className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 transition ${
            isLight
              ? 'bg-white border-sky-200 hover:border-sky-400 shadow-sm'
              : 'bg-white/[0.04] border-sky-500/25 hover:border-sky-400/50'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold border ${
                  isLight
                    ? 'bg-sky-50 border-sky-200 text-sky-700'
                    : 'bg-sky-500/15 border-sky-500/30 text-sky-300'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                <span>{isAr ? 'مقال مقترح' : 'Suggested Article'}</span>
              </span>
              <span
                className={`text-[10px] flex items-center gap-1 ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                <Clock className="w-3 h-3" />
                <span>{isAr ? bundle.article.readTimeAr : bundle.article.readTimeEn}</span>
              </span>
            </div>

            <h4 className="font-extrabold text-sm leading-snug line-clamp-2 flex items-start gap-1.5">
              <span className="shrink-0">{bundle.article.icon}</span>
              <span>{isAr ? bundle.article.titleAr : bundle.article.titleEn}</span>
            </h4>

            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {isAr ? bundle.article.reasonAr : bundle.article.reasonEn}
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenArticle}
            className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              isLight
                ? 'bg-sky-600 hover:bg-sky-700 border-sky-600 text-white'
                : 'bg-sky-600/25 hover:bg-sky-600/40 border-sky-400/40 text-sky-200'
            }`}
          >
            <span>{isAr ? 'اقرأ المقال الآن' : 'Read Article'}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: Suggested Complementary Test */}
        <div
          className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 transition ${
            isLight
              ? 'bg-white border-purple-200 hover:border-purple-400 shadow-sm'
              : 'bg-white/[0.04] border-purple-500/25 hover:border-purple-400/50'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold border ${
                  isLight
                    ? 'bg-purple-50 border-purple-200 text-purple-700'
                    : 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                }`}
              >
                <Brain className="w-3 h-3" />
                <span>{isAr ? 'اختبار مقترح' : 'Suggested Test'}</span>
              </span>
              <span className="text-sm">{bundle.test.icon}</span>
            </div>

            <h4 className="font-extrabold text-sm leading-snug line-clamp-2">
              {isAr ? bundle.test.titleAr : bundle.test.titleEn}
            </h4>

            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {isAr ? bundle.test.reasonAr : bundle.test.reasonEn}
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenTest}
            className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              isLight
                ? 'bg-purple-600 hover:bg-purple-700 border-purple-600 text-white'
                : 'bg-purple-600/25 hover:bg-purple-600/40 border-purple-400/40 text-purple-200'
            }`}
          >
            <span>{isAr ? 'ابدأ الاختبار المكمل' : 'Start Next Assessment'}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: Suggested Novel or Novel Genre */}
        <div
          className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 transition ${
            isLight
              ? 'bg-white border-rose-200 hover:border-rose-400 shadow-sm'
              : 'bg-white/[0.04] border-rose-500/25 hover:border-rose-400/50'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold border ${
                  isLight
                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                    : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>
                  {bundle.novel.kind === 'novel'
                    ? isAr
                      ? 'رواية مقترحة'
                      : 'Suggested Novel'
                    : isAr
                    ? 'تصنيف روايات مقترح'
                    : 'Suggested Genre'}
                </span>
              </span>
              <span className="text-sm">{bundle.novel.icon}</span>
            </div>

            <h4 className="font-extrabold text-sm leading-snug line-clamp-2">
              {isAr ? bundle.novel.titleAr : bundle.novel.titleEn}
            </h4>

            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {isAr ? bundle.novel.reasonAr : bundle.novel.reasonEn}
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenNovel}
            className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              isLight
                ? 'bg-rose-600 hover:bg-rose-700 border-rose-600 text-white'
                : 'bg-rose-600/25 hover:bg-rose-600/40 border-rose-400/40 text-rose-200'
            }`}
          >
            <span>
              {bundle.novel.kind === 'novel'
                ? isAr
                  ? 'افتح الرواية'
                  : 'Open Novel'
                : isAr
                ? 'تصفح هذا التصنيف'
                : 'Browse This Genre'}
            </span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
