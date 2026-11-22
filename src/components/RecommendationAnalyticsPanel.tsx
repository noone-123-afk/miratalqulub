import React, { useMemo, useState } from 'react';
import {
  Activity,
  Award,
  AlertTriangle,
  BarChart2,
  Compass,
  Download,
  Eye,
  Layers,
  MousePointerClick,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import {
  exportRecommendationMetricsSnapshot,
  getRecommendationAnalyticsSummary,
  RecommendationDashboardSummary,
  resetRecommendationAnalytics,
} from '../utils/recommendationAnalytics';

export const RecommendationAnalyticsPanel: React.FC = () => {
  const [refreshTick, setRefreshTick] = useState(0);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const summary: RecommendationDashboardSummary = useMemo(
    () => getRecommendationAnalyticsSummary(),
    [refreshTick]
  );

  const handleExportSnapshot = () => {
    const json = exportRecommendationMetricsSnapshot();
    try {
      const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mirat-recommendation-analytics-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExportNotice('تم تصدير تقرير التوصيات بنجاح (متوافق مع GA4 / GTM / Search Console).');
    } catch {
      setExportNotice('تم تجهيز لقطة البيانات في الذاكرة.');
    }
  };

  const handleReset = () => {
    resetRecommendationAnalytics();
    setRefreshTick((t) => t + 1);
    setExportNotice('تم تصفير عدادات التوصيات المحلية بنجاح.');
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h4 className="font-extrabold text-sm text-white font-['Alexandria']">
              تحليلات محرك التوصيات والروابط الداخلية (CTR &amp; Journeys)
            </h4>
          </div>
          <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>
              {summary.gdprConsentAnalyticsEnabled
                ? 'التتبع الخصوصي المجهول مفعّل ومتوافق مع GDPR (يدعم window.gtag و dataLayer).'
                : 'المستخدم رفض تتبع التحليلات — وضع عدم التخزين نشط احتراماً للخصوصية.'}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setRefreshTick((t) => t + 1)}
            className="min-h-[40px] px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>تحديث</span>
          </button>

          <button
            type="button"
            onClick={handleExportSnapshot}
            className="min-h-[40px] px-3 py-1.5 rounded-xl bg-indigo-600/25 hover:bg-indigo-600/40 border border-indigo-500/40 text-xs font-bold text-indigo-200 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تصدير JSON (GA4/GSC)</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="min-h-[40px] px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/70 border border-rose-500/30 text-xs font-bold text-rose-300 transition cursor-pointer"
          >
            إعادة ضبط
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="px-4 py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs font-bold text-emerald-200 flex items-center justify-between gap-2">
          <span>{exportNotice}</span>
          <button
            type="button"
            onClick={() => setExportNotice(null)}
            className="text-emerald-400 hover:underline cursor-pointer"
          >
            إخفاء
          </button>
        </div>
      )}

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span>مرات ظهور التوصيات</span>
          </span>
          <div className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">
            {summary.totalImpressions.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400">recommendation_view</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
            <MousePointerClick className="w-3.5 h-3.5 text-emerald-400" />
            <span>نقرات التوصيات</span>
          </span>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 font-['Alexandria']">
            {summary.totalClicks.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400">recommendation_click</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>معدل النقر العام (CTR)</span>
          </span>
          <div className="text-xl sm:text-2xl font-black text-amber-400 font-['Alexandria']">
            {summary.overallCtr}%
          </div>
          <span className="text-[10px] text-slate-400">Clicks ÷ Impressions</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>صفحات / جلسة</span>
          </span>
          <div className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">
            {summary.avgPagesPerSession}
          </div>
          <span className="text-[10px] text-purple-300 font-semibold">
            تأثير التوصيات: {summary.estimatedPagesPerSessionImpact}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 col-span-2 lg:col-span-1">
          <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>توصيات ضعيفة مستبعدة</span>
          </span>
          <div className="text-xl sm:text-2xl font-black text-rose-400 font-['Alexandria']">
            {summary.prunedWeakCount}
          </div>
          <span className="text-[10px] text-slate-400">تُحذف تلقائياً (&lt; 2.5% CTR)</span>
        </div>
      </div>

      {/* Block Performance Table */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <h5 className="font-extrabold text-sm text-white flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-indigo-400" />
          <span>أداء بلوكات التوصية ومعدل النقر (Block CTR)</span>
        </h5>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 px-2">البلوك</th>
                <th className="py-2 px-2">الظهور</th>
                <th className="py-2 px-2">النقرات</th>
                <th className="py-2 px-2">معدل CTR</th>
              </tr>
            </thead>
            <tbody>
              {summary.blockPerformance.map((row) => (
                <tr key={row.block} className="border-b border-slate-800/60">
                  <td className="py-2.5 px-2 font-bold text-slate-200">{row.labelAr}</td>
                  <td className="py-2.5 px-2 text-slate-300">{row.impressions}</td>
                  <td className="py-2.5 px-2 text-emerald-400 font-bold">{row.clicks}</td>
                  <td className="py-2.5 px-2">
                    <span className="font-black text-amber-300">{row.ctr}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performing vs Lowest Performing + Most Clicked Articles & Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h5 className="font-extrabold text-sm text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>أعلى التوصيات أداءً (Top Performing CTR)</span>
          </h5>
          {summary.topPerformingRecommendations.length === 0 ? (
            <p className="text-xs text-slate-400">
              ستظهر العناصر الأعلى نقراً تلقائياً بمجرد تفاعل الزوار مع بطاقات التوصية.
            </p>
          ) : (
            <div className="space-y-2">
              {summary.topPerformingRecommendations.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-2 text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-white truncate">{item.title || item.id}</div>
                    <div className="text-[10px] text-slate-400">
                      {item.type} · {item.impressions} ظهور · {item.clicks} نقرة
                    </div>
                  </div>
                  <span className="font-black text-emerald-400 shrink-0">{item.ctr}%</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h5 className="font-extrabold text-sm text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>أضعف التوصيات أداءً (مرشّحة للاستبدال)</span>
          </h5>
          {summary.lowestPerformingRecommendations.length === 0 ? (
            <p className="text-xs text-slate-400">
              لا توجد توصيات ضعيفة مرصودة حالياً (الحد الأدنى للرصد ٣ مرات ظهور).
            </p>
          ) : (
            <div className="space-y-2">
              {summary.lowestPerformingRecommendations.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-2 text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-slate-200 truncate">{item.title || item.id}</div>
                    <div className="text-[10px] text-slate-400">
                      {item.impressions} ظهور · {item.clicks} نقرة
                    </div>
                  </div>
                  <span className="font-black text-rose-400 shrink-0">{item.ctr}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Most Clicked Articles, Most Clicked Tests & Highest Converting Journeys */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
          <h5 className="font-extrabold text-xs text-sky-300">المقالات الأكثر نقراً</h5>
          {summary.mostClickedArticles.length === 0 ? (
            <p className="text-[11px] text-slate-400">لا توجد نقرات مسجلة بعد.</p>
          ) : (
            <ul className="space-y-2 text-xs">
              {summary.mostClickedArticles.map((art) => (
                <li key={art.id} className="flex items-center justify-between gap-2">
                  <span className="text-slate-200 truncate">{art.title || art.id}</span>
                  <span className="font-bold text-sky-400 shrink-0">{art.clicks}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
          <h5 className="font-extrabold text-xs text-purple-300">الاختبارات الأكثر نقراً</h5>
          {summary.mostClickedTests.length === 0 ? (
            <p className="text-[11px] text-slate-400">لا توجد نقرات مسجلة بعد.</p>
          ) : (
            <ul className="space-y-2 text-xs">
              {summary.mostClickedTests.map((tst) => (
                <li key={tst.id} className="flex items-center justify-between gap-2">
                  <span className="text-slate-200 truncate">{tst.title || tst.id}</span>
                  <span className="font-bold text-purple-400 shrink-0">{tst.clicks}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
          <h5 className="font-extrabold text-xs text-amber-300 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>المسارات الأعلى تحويلاً (Journeys)</span>
          </h5>
          {summary.highestConvertingJourneys.length === 0 ? (
            <p className="text-[11px] text-slate-400">لا توجد تحولات مسجلة بعد.</p>
          ) : (
            <ul className="space-y-2 text-xs">
              {summary.highestConvertingJourneys.map((j) => (
                <li key={j.journeyKey + j.targetPage} className="flex items-center justify-between gap-2">
                  <span className="text-slate-200 truncate">
                    {j.sourceType} → {j.targetTitle || j.targetPage}
                  </span>
                  <span className="font-bold text-amber-400 shrink-0">{j.clicks}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Most Viewed Content */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2.5">
        <h5 className="font-extrabold text-xs text-slate-200">المحتوى الأكثر ظهوراً ومشاهدة في التوصيات</h5>
        {summary.mostViewedContent.length === 0 ? (
          <p className="text-[11px] text-slate-400">تبدأ الإحصائيات بالتسجيل التلقائي فور ظهور البطاقات على الشاشة.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
            {summary.mostViewedContent.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between gap-2"
              >
                <span className="text-slate-200 truncate">{item.title || item.id}</span>
                <span className="text-[11px] font-bold text-cyan-400 shrink-0">
                  {item.impressions} مشاهدة
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationAnalyticsPanel;
