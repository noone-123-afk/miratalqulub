import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  fetchUserSavedResults,
  deleteSavedResultFromHistory,
  SavedHistoricalResult,
} from '../services/userHistoryService';
import { UserProfile, PartnerAnalysisResult } from '../types';
import { soundManager } from '../utils/sound';
import {
  X,
  History,
  Trash2,
  ExternalLink,
  Calendar,
  Sparkles,
  Heart,
  Brain,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
  RefreshCw,
  LogIn,
  FileDown,
} from 'lucide-react';
import { SkeletonLoader } from './SkeletonLoader';
import { exportPsychometricReportAsPDF } from '../utils/pdfReportGenerator';

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
  const [results, setResults] = useState<SavedHistoricalResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen, user]);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await fetchUserSavedResults(user);
      setResults(data);
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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl max-h-[90vh] flex flex-col p-5 sm:p-6 overflow-hidden glass-panel rounded-3xl border border-rose-500/30 shadow-2xl text-white"
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
                  سجل نتائج الاختبارات المحفوظة في قاعدة البيانات
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
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Optional Sign-In Banner for Visitors to link across devices */}
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
              /* Smooth Skeleton Loader State */
              <div className="py-2 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300 px-1">
                  <span>جارٍ استرجاع سجل اختباراتك وتحديثات التطور بأمان...</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                </div>
                <SkeletonLoader type="history_card" count={3} />
              </div>
            ) : results.length === 0 ? (
              /* Empty Results State */
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-2xl">
                  📋
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1">لا توجد نتائج محفوظة بعد</h4>
                  <p className="text-xs text-gray-300 max-w-xs mx-auto">
                    عند إتمام أي اختبار توافق، اضغط على زر «حفظ النتيجة في حسابي» لتظهر هنا بشكل دائم.
                  </p>
                </div>
              </div>
            ) : (
              /* Results List */
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

                        {/* Dimension Mini Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-300">
                            فكري: {res.intellectualScore}%
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300">
                            اجتماعي: {res.sociologicalScore}%
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300">
                            عاطفي: {res.emotionalScore}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                      <button
                        onClick={() => {
                          soundManager.playTap();
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
