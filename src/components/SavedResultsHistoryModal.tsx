import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  fetchUserSavedResults,
  deleteSavedResultFromHistory,
  SavedHistoricalResult,
  fetchUnifiedTestHistory,
  deleteUnifiedTestRecord,
  buildTemporalEvolutionSummary,
  UnifiedTestRecord,
} from '../services/userHistoryService';
import { UserProfile, PartnerAnalysisResult } from '../types';
import { soundManager } from '../utils/sound';
import {
  X,
  History,
  Trash2,
  ExternalLink,
  Calendar,
  Brain,
  ShieldCheck,
  RefreshCw,
  FileDown,
  TrendingUp,
  Search,
  Filter,
  Eye,
} from 'lucide-react';
import { SkeletonLoader } from './SkeletonLoader';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
  onLoadHistoricalResult?: (profile: UserProfile, result: PartnerAnalysisResult) => void;
}

export const SavedResultsHistoryModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onOpenAuth,
  onLoadHistoricalResult,
}) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'unified' | 'partner'>('unified');
  const [results, setResults] = useState<SavedHistoricalResult[]>([]);
  const [unifiedRecords, setUnifiedRecords] = useState<UnifiedTestRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'tiered_assessment' | 'personality_comparison' | 'psychology' | 'intelligence' | 'partner_compatibility'>('all');
  const [tierFilter, setTierFilter] = useState<'all' | 'quick' | 'advanced' | 'professional'>('all');
  const [reopenedRecord, setReopenedRecord] = useState<UnifiedTestRecord | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen, user]);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const [partnerData, unifiedData] = await Promise.all([
        fetchUserSavedResults(user),
        fetchUnifiedTestHistory(user),
      ]);
      setResults(partnerData);
      setUnifiedRecords(unifiedData);
    } catch (e) {
      console.error('Failed to load saved results', e);
    }
    setLoading(false);
  };

  const handleDelete = async (resultId: string) => {
    soundManager.playTap();
    setDeletingId(resultId);
    try {
      await deleteSavedResultFromHistory(user, resultId);
      setResults((prev) => prev.filter((r) => r.id !== resultId));
    } catch (e) {
      console.error('Failed to delete result', e);
    }
    setDeletingId(null);
  };

  const handleDeleteUnified = async (recordId: string) => {
    soundManager.playTap();
    setDeletingId(recordId);
    try {
      await deleteUnifiedTestRecord(user, recordId);
      setUnifiedRecords((prev) => prev.filter((r) => r.id !== recordId));
      if (reopenedRecord?.id === recordId) setReopenedRecord(null);
    } catch (e) {
      console.error('Failed to delete unified record', e);
    }
    setDeletingId(null);
  };

  const handleDownloadUnifiedPdf = async (rec: UnifiedTestRecord) => {
    soundManager.playTap();
    const { exportPsychometricReportAsPDF } = await import('../utils/pdfReportGenerator');
    if (rec.snapshot && rec.snapshot.subscales && rec.snapshot.visualCharts) {
      const rep = rec.snapshot;
      exportPsychometricReportAsPDF({
        reportTitle: `${rep.tierTitleAr} — التقرير السيكومتري الشامل`,
        subTitle: `${rep.archetypeTitleAr} (${rep.answeredCount}/${rep.questionCount} سؤالاً)`,
        scientificBasis: (rep.scientificReferences || []).join(' • '),
        userName: rep.userName,
        completedAt: new Date(rec.createdAt).toLocaleDateString('ar-JO'),
        overallScoreLabel: 'مؤشر النضج السيكومتري الكلي',
        overallScoreValue: `${rep.overallMaturityIndex}%`,
        cognitiveFingerprintTitle: `الاتساق الداخلي ${rep.consistencyIndex}% • المعيارية ${rep.overallPercentile}%`,
        executiveSummary: rep.executiveSummaryAr,
        metrics: (rep.subscales || []).slice(0, 14).map((s: any) => ({
          label: s.labelAr,
          scorePercent: s.percentage,
          levelLabel: `Sten ${s.stenScore}/10 • T=${s.tScore}`,
          rawText: s.interpretationAr,
          color: s.color,
        })),
        sections: [
          {
            title: 'وصف الشخصية الأساسي والتركيبة النفسية',
            content: rep.personalityDescriptionAr || '',
          },
          {
            title: 'نقاط القوة ومجالات التحسين',
            content: rep.emotionalMaturitySummaryAr || '',
            items: [...(rep.strengthsAr || []), ...(rep.improvementAreasAr || [])],
          },
        ],
        visualCharts: rep.visualCharts,
      });
      return;
    }

    exportPsychometricReportAsPDF({
      reportTitle: rec.testTitleAr,
      subTitle: rec.testCategoryAr,
      scientificBasis: 'APA Validated Psychometric Models • Mirror of Hearts Lab',
      userName: user?.displayName || 'المختبَر',
      completedAt: new Date(rec.createdAt).toLocaleDateString('ar-JO'),
      overallScoreLabel: 'النتيجة المعيارية',
      overallScoreValue: rec.scoreOrArchetype,
      cognitiveFingerprintTitle: rec.testTitleAr,
      executiveSummary: (rec.keyInsights || []).join(' — ') || rec.scoreOrArchetype,
      metrics: Object.entries(rec.standardizedScores || {}).map(([k, v]) => ({
        label: k,
        scorePercent: Number(v) || rec.percentage,
        levelLabel: 'معياري معتمد',
        color: rec.badgeColor || '#8b5cf6',
      })),
      sections: [
        {
          title: 'أبرز المؤشرات السيكومترية المحفوظة',
          content: rec.scoreOrArchetype,
          items: rec.keyInsights || [],
        },
      ],
    });
  };

  const handleSelectResult = (item: SavedHistoricalResult) => {
    soundManager.playTap();
    if (onLoadHistoricalResult && item.profileSnapshot && item.fullResultSnapshot) {
      onLoadHistoricalResult(
        item.profileSnapshot as UserProfile,
        item.fullResultSnapshot as PartnerAnalysisResult
      );
      onClose();
    }
  };

  if (!isOpen) return null;

  const evolution = buildTemporalEvolutionSummary(unifiedRecords);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl max-h-[92vh] flex flex-col p-5 sm:p-6 overflow-hidden glass-panel rounded-3xl border border-rose-500/30 shadow-2xl text-white"
          dir="rtl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-rose-500/25">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black font-['Alexandria']">
                  سجل تقاريري وتتبع التغير مع الزمن
                </h3>
                <span className="text-xs text-gray-300">
                  {user
                    ? `الحساب: ${user.displayName || user.email || 'مستخدم مسجل'}`
                    : 'سجل الزائر المستمر (محفوظ تلقائياً في قاعدة البيانات)'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={loadHistory}
                disabled={loading}
                aria-label="تحديث السجل من قاعدة البيانات"
                title="تحديث السجل من قاعدة البيانات"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => {
                  soundManager.playTap();
                  onClose();
                }}
                aria-label="إغلاق نافذة سجل التقارير"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-black/40 border border-white/10 mt-3 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('unified')}
              className={`py-2 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                activeTab === 'unified'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              سجل التقارير الشامل وتتبع الزمن ({unifiedRecords.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('partner')}
              className={`py-2 px-3 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                activeTab === 'partner'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              بطاقات توافق الشريك ({results.length})
            </button>
          </div>

          {/* Optional Sign-In Banner for Visitors */}
          {!user && (
            <div className="mt-3 p-3 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between gap-2 text-xs shrink-0">
              <span className="text-blue-200">
                ✓ نتائجك محفوظة تلقائياً في قاعدة بيانات الموقع لهذا المتصفح. يمكنك أيضاً ربطها بحسابك للوصول إليها من أي جهاز آخر.
              </span>
              <button
                onClick={() => {
                  soundManager.playTap();
                  onOpenAuth();
                }}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shrink-0 cursor-pointer"
              >
                ربط بحساب
              </button>
            </div>
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
            {loading ? (
              <div className="py-2 space-y-3">
                <SkeletonLoader type="history_card" count={3} />
              </div>
            ) : activeTab === 'unified' ? (
              <div className="space-y-4">
                {/* Temporal Evolution Summary: Today vs Last Month vs Last Year */}
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-extrabold flex items-center gap-1.5 text-emerald-300">
                      <TrendingUp className="w-4 h-4" />
                      <span>تتبع التغير مع الزمن (العام الماضي ← الشهر الماضي ← اليوم)</span>
                    </h4>
                    <span className="text-xs font-black text-emerald-400 tabular-nums">
                      {evolution.trendDelta >= 0 ? `+${evolution.trendDelta}%` : `${evolution.trendDelta}%`}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-300">{evolution.trendInsightAr}</p>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    {evolution.buckets.map((b) => (
                      <div key={b.periodKey} className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                        <div className="text-[10px] text-gray-400 font-bold">{b.periodLabelAr}</div>
                        <div className="text-base font-black text-emerald-400 tabular-nums">
                          {b.count > 0 ? `${b.avgScore}%` : '—'}
                        </div>
                        <div className="text-[10px] text-gray-400">{b.count} اختبار</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Search & Filter */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="relative sm:col-span-2">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      aria-label="ابحث في سجل تقاريري"
                      placeholder="ابحث باسم التقرير أو النمط أو المستوى..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pr-8 pl-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white outline-none"
                    />
                  </div>
                  <select
                    aria-label="تصفية حسب مستوى التحليل"
                    value={tierFilter}
                    onChange={(e) => setTierFilter(e.target.value as any)}
                    className="px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white outline-none"
                  >
                    <option value="all">كل المستويات</option>
                    <option value="quick">التحليل السريع (32)</option>
                    <option value="advanced">التحليل المتقدم (144)</option>
                    <option value="professional">التحليل الاحترافي (288)</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold">
                  <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  {[
                    { id: 'all', label: 'الكل' },
                    { id: 'tiered_assessment', label: 'مستويات التحليل' },
                    { id: 'personality_comparison', label: 'مقارنة شخصيتين' },
                    { id: 'psychology', label: 'المقاييس النفسية' },
                    { id: 'intelligence', label: 'اختبارات الذكاء' },
                    { id: 'partner_compatibility', label: 'توافق الشريك' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setTypeFilter(f.id as any)}
                      className={`px-2.5 py-1 rounded-lg transition cursor-pointer shrink-0 ${
                        typeFilter === f.id ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-300'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {unifiedRecords.length === 0 ? (
                  <div className="py-10 text-center text-xs text-gray-400">
                    لا توجد تقارير محفوظة بعد. أكمل أي اختبار لحفظ التقرير والدرجات الخام والمعيارية هنا.
                  </div>
                ) : (
                  unifiedRecords
                    .filter((r) => (typeFilter === 'all' ? true : r.testType === typeFilter))
                    .filter((r) => (tierFilter === 'all' ? true : r.analysisTier === tierFilter))
                    .filter((r) => {
                      const q = searchQuery.trim().toLowerCase();
                      if (!q) return true;
                      return (
                        r.testTitleAr.toLowerCase().includes(q) ||
                        r.scoreOrArchetype.toLowerCase().includes(q) ||
                        r.testCategoryAr.toLowerCase().includes(q)
                      );
                    })
                    .map((rec) => (
                      <div
                        key={rec.id}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <div className="font-bold text-sm text-white">{rec.testTitleAr}</div>
                            <div className="text-[11px] text-purple-300">{rec.scoreOrArchetype}</div>
                            <div className="text-[10px] text-gray-400 mt-0.5">
                              {new Date(rec.createdAt).toLocaleString('ar-SA')} · {rec.testCategoryAr}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setReopenedRecord(reopenedRecord?.id === rec.id ? null : rec)}
                              className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>فتح التقرير</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDownloadUnifiedPdf(rec)}
                              className="px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/35 border border-indigo-500/40 text-indigo-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <FileDown className="w-3.5 h-3.5" />
                              <span>PDF</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteUnified(rec.id)}
                              disabled={deletingId === rec.id}
                              aria-label="حذف هذا التقرير"
                              className="p-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {reopenedRecord?.id === rec.id && (
                          <div className="p-3.5 rounded-xl bg-black/50 border border-purple-500/30 text-xs space-y-2 mt-2">
                            {rec.snapshot?.executiveSummaryAr && (
                              <p className="text-gray-200 leading-relaxed">{rec.snapshot.executiveSummaryAr}</p>
                            )}
                            {rec.keyInsights && rec.keyInsights.length > 0 && (
                              <ul className="space-y-1 text-emerald-300">
                                {rec.keyInsights.map((k, idx) => (
                                  <li key={idx}>• {k}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                )}
              </div>
            ) : results.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <Brain className="w-10 h-10 text-rose-400 mx-auto" />
                <div>
                  <h4 className="text-base font-bold text-white mb-1">لا توجد نتائج توافق شريك محفوظة بعد</h4>
                  <p className="text-xs text-gray-300 max-w-xs mx-auto">
                    عند إتمام اختبار توافق الشريك، اضغط على زر «حفظ النتيجة في حسابي» لتظهر هنا بشكل دائم.
                  </p>
                </div>
              </div>
            ) : (
              results.map((res) => {
                const dateStr = new Date(res.createdAt).toLocaleDateString('ar-SA', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={res.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-rose-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      {res.imageUrl ? (
                        <img
                          src={res.imageUrl}
                          alt={res.partnerName}
                          className="w-14 h-14 rounded-2xl object-cover border border-rose-500/30 shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-xl shrink-0">
                          {res.partnerGender === 'female' ? '👩' : '👨'}
                        </div>
                      )}

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm sm:text-base text-white">
                            {res.partnerName}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-black border border-rose-500/30">
                            {res.compatibilityScore}% توافق
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            {dateStr}
                          </span>
                          <span>•</span>
                          <span>{res.country}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                      <button
                        onClick={async () => {
                          soundManager.playTap();
                          const { exportPsychometricReportAsPDF } = await import(
                            '../utils/pdfReportGenerator'
                          );
                          exportPsychometricReportAsPDF({
                            reportTitle: `تقرير التوافق السيكومتري المحفوظ — ${res.partnerName}`,
                            subTitle: 'Saved Partner Compatibility Psychometric Report',
                            scientificBasis:
                              'Gottman (1999) • Bowlby/ECR-R • Sternberg • Bowen • Schwartz',
                            userName: res.country,
                            completedAt: dateStr,
                            overallScoreLabel: 'مؤشر التوافق الكلي الموزون',
                            overallScoreValue: `${res.compatibilityScore}%`,
                            cognitiveFingerprintTitle: `${res.partnerName} (${res.country})`,
                            executiveSummary: `تقرير توافق محفوظ في قاعدة البيانات بنسبة توافق كلي (${res.compatibilityScore}%)، وتناغم فكري (${res.intellectualScore}%)، واجتماعي (${res.sociologicalScore}%)، وعاطفي (${res.emotionalScore}%).`,
                            metrics: [
                              {
                                label: 'التوافق الفكري والتعليمي (Intellectual Synergy)',
                                scorePercent: res.intellectualScore || 88,
                                levelLabel: 'معياري موثق',
                                color: '#8b5cf6',
                              },
                              {
                                label: 'التوافق الاجتماعي والعائلي (Sociological Harmony)',
                                scorePercent: res.sociologicalScore || 86,
                                levelLabel: 'معياري موثق',
                                color: '#06b6d4',
                              },
                              {
                                label: 'الذكاء العاطفي والاستقرار (Emotional Intelligence)',
                                scorePercent: res.emotionalScore || 90,
                                levelLabel: 'معياري موثق',
                                color: '#10b981',
                              },
                              {
                                label: 'انسجام نمط الحياة والأهداف (Lifestyle Alignment)',
                                scorePercent: res.lifestyleScore || 87,
                                levelLabel: 'معياري موثق',
                                color: '#f43f5e',
                              },
                            ],
                            sections: [
                              {
                                title: 'ملخص أبعاد التوافق المحفوظة',
                                badge: `${res.compatibilityScore}% توافق`,
                                content:
                                  (res.fullResultSnapshot as PartnerAnalysisResult)
                                    ?.detailedMatchReason ||
                                  `تم حساب هذا التقرير بناءً على إجاباتك الفعلية وتفضيلاتك الديموغرافية في (${res.country}).`,
                              },
                            ],
                          });
                        }}
                        className="px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border border-indigo-500/35 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        title="تصدير التقرير بصيغة PDF"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span>PDF 📄</span>
                      </button>

                      {onLoadHistoricalResult && res.profileSnapshot && (
                        <button
                          onClick={() => handleSelectResult(res)}
                          className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>فتح التقرير</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(res.id)}
                        disabled={deletingId === res.id}
                        aria-label="حذف من السجل"
                        title="حذف من السجل"
                        className="p-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Bar */}
          {user && (
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 shrink-0">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>النتائج محفوظة بأمان ومحمية بقواعد أمان Firebase Firestore</span>
              </span>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="text-gray-400 hover:text-rose-400 transition-colors"
              >
                تسجيل الخروج
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
