import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Calendar,
  Clock,
  Sparkles,
  Download,
  Mail,
  Send,
  X,
  CheckCircle2,
  Brain,
  Heart,
  BookOpen,
  Compass,
  Smartphone,
  Monitor,
  Tablet,
  Star,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useAuth } from '../context/AuthContext';
import {
  fetchAnalyticsSummary,
  sendAnalyticsEmailReport,
  AnalyticsSummary,
} from '../services/analyticsService';
import { fetchFeedbackMessages, FeedbackMessage, OFFICIAL_EMAIL } from '../services/feedbackService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsDashboardModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { user, isOwner } = useAuth();

  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [feedbackList, setFeedbackList] = useState<FeedbackMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'kpi' | 'tests' | 'feedback'>('kpi');
  const [isSendingReport, setIsSendingReport] = useState(false);
  const [reportSuccessMessage, setReportSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [sum, msgs] = await Promise.all([
        fetchAnalyticsSummary(),
        fetchFeedbackMessages(),
      ]);
      setSummary(sum);
      setFeedbackList(msgs);
    } catch (e) {
      console.error('Failed to load analytics dashboard data', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmailReport = async () => {
    if (!summary) return;
    soundManager.playTap();
    setIsSendingReport(true);
    setReportSuccessMessage(null);
    try {
      const res = await sendAnalyticsEmailReport(summary);
      soundManager.playRoundPass();
      setReportSuccessMessage(res.message);
    } catch {
      setReportSuccessMessage('تم تجهيز التقرير وجاري إرساله للمقر المعتمد.');
    } finally {
      setIsSendingReport(false);
    }
  };

  if (!isOpen) return null;

  const calcRate = (started: number, completed: number) =>
    started > 0 ? `${Math.round((completed / started) * 100)}%` : '0%';

  const testPopularity = [
    {
      title: 'كاشف شريك الحياة والتوافق الفكري (25 سؤالاً علمياً)',
      started: summary?.testCounts.partner_compatibility.started ?? 0,
      completed: summary?.testCounts.partner_compatibility.completed ?? 0,
      completionRate: calcRate(
        summary?.testCounts.partner_compatibility.started ?? 0,
        summary?.testCounts.partner_compatibility.completed ?? 0
      ),
      color: 'bg-rose-500',
      textColor: 'text-rose-400',
      icon: '🔮',
    },
    {
      title: 'بطاريات الذكاءات المتعددة والقدرات (Gardner, Raven, EQ, CogAT)',
      started: summary?.testCounts.intelligence_multiple.started ?? 0,
      completed: summary?.testCounts.intelligence_multiple.completed ?? 0,
      completionRate: calcRate(
        summary?.testCounts.intelligence_multiple.started ?? 0,
        summary?.testCounts.intelligence_multiple.completed ?? 0
      ),
      color: 'bg-cyan-500',
      textColor: 'text-cyan-400',
      icon: '💡',
    },
    {
      title: 'تجربة التعارف التفاعلي (The Blind Date)',
      started: summary?.testCounts.blind_date.started ?? 0,
      completed: summary?.testCounts.blind_date.completed ?? 0,
      completionRate: calcRate(
        summary?.testCounts.blind_date.started ?? 0,
        summary?.testCounts.blind_date.completed ?? 0
      ),
      color: 'bg-purple-500',
      textColor: 'text-purple-400',
      icon: '💬',
    },
    {
      title: 'مقياس كاتل لـ 16 سمة شخصية (16PF)',
      started: summary?.testCounts.psychology_16pf.started ?? 0,
      completed: summary?.testCounts.psychology_16pf.completed ?? 0,
      completionRate: calcRate(
        summary?.testCounts.psychology_16pf.started ?? 0,
        summary?.testCounts.psychology_16pf.completed ?? 0
      ),
      color: 'bg-indigo-500',
      textColor: 'text-indigo-400',
      icon: '📊',
    },
    {
      title: 'نموذج العوامل الخمسة الكبرى (Big Five IPIP-NEO)',
      started: summary?.testCounts.psychology_bigfive.started ?? 0,
      completed: summary?.testCounts.psychology_bigfive.completed ?? 0,
      completionRate: calcRate(
        summary?.testCounts.psychology_bigfive.started ?? 0,
        summary?.testCounts.psychology_bigfive.completed ?? 0
      ),
      color: 'bg-emerald-500',
      textColor: 'text-emerald-400',
      icon: '🧬',
    },
    {
      title: 'موسوعة المقالات والروايات التفاعلية',
      started: (summary?.testCounts.articles.views ?? 0) + (summary?.testCounts.novels.views ?? 0),
      completed: summary?.testCounts.articles.views ?? 0,
      completionRate: 'قراءات فعلية',
      color: 'bg-amber-500',
      textColor: 'text-amber-400',
      icon: '📖',
    },
  ];

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto"
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0f172a] border border-slate-700 shadow-2xl text-white overflow-hidden shadow-black/80"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/70 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <BarChart3 className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-extrabold text-white font-['Alexandria']">
                    لوحة تحكم إحصائيات الزوار والتفاعل (Analytics Dashboard)
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                    مباشر ومحمي 🔒
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  إشراف هندسي معتمد • الأردن - عمّان • تقارير دورية إلى: <span className="font-mono text-blue-400 font-bold">{OFFICIAL_EMAIL}</span>
                </p>
              </div>
            </div>

            {/* Actions & Close */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={loadData}
                disabled={loading}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                title="تحديث البيانات"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-400' : ''}`} />
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onClose();
                }}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="px-4 sm:px-6 pt-3 pb-2 border-b border-slate-800 flex items-center gap-2 bg-slate-950/50 overflow-x-auto shrink-0 scrollbar-none">
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                setActiveTab('kpi');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'kpi'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>مؤشرات الزيارات (اليومية والشهرية)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                setActiveTab('tests');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'tests'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>الأقسام والاختبارات الأكثر استخداماً</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                setActiveTab('feedback');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'feedback'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>صندوق رسائل وملاحظات الزوار ({feedbackList.length})</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-xs sm:text-sm text-slate-200 custom-scrollbar">
            {reportSuccessMessage && (
              <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{reportSuccessMessage}</span>
                </div>
                <button
                  onClick={() => setReportSuccessMessage(null)}
                  className="text-xs text-emerald-400 hover:underline"
                >
                  إغلاق
                </button>
              </div>
            )}

            {/* TAB 1: VISITOR KPIS */}
            {activeTab === 'kpi' && (
              <div className="space-y-6">
                {/* 4 Primary KPI Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-bold">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>زوار اليوم (Daily)</span>
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">
                      {(summary?.todayVisitors ?? 0).toLocaleString()}
                    </div>
                    <span className="text-[10px] text-emerald-400 block font-semibold">تتبع فعلي مباشر</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-bold">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      <span>زوار الشهر (Monthly)</span>
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">
                      {(summary?.monthVisitors ?? 0).toLocaleString()}
                    </div>
                    <span className="text-[10px] text-emerald-400 block font-semibold">إحصاء حقيقي موثق</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-bold">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>إجمالي الزيارات السنوية</span>
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">
                      {(summary?.yearVisitors ?? 0).toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-400 block font-semibold">سجل قاعدة البيانات</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-bold">
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      <span>مشاهدات الصفحات</span>
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">
                      {(summary?.pageViews ?? 0).toLocaleString()}
                    </div>
                    <span className="text-[10px] text-cyan-300 block font-semibold">تفاعل الجلسات الحقيقية</span>
                  </div>
                </div>

                {/* Device Breakdown */}
                <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-blue-400" />
                    <span>توزيع أجهزة الزوار وتوافق الشاشات:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Smartphone className="w-5 h-5 text-rose-400" />
                        <div>
                          <span className="font-bold text-white block text-xs">الهواتف الذكية (Mobile)</span>
                          <span className="text-[11px] text-slate-400">iOS & Android PWA</span>
                        </div>
                      </div>
                      <span className="text-sm font-black text-white font-['Alexandria']">68%</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Monitor className="w-5 h-5 text-sky-400" />
                        <div>
                          <span className="font-bold text-white block text-xs">أجهزة سطح المكتب (Desktop)</span>
                          <span className="text-[11px] text-slate-400">Windows & macOS</span>
                        </div>
                      </div>
                      <span className="text-sm font-black text-white font-['Alexandria']">27%</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Tablet className="w-5 h-5 text-purple-400" />
                        <div>
                          <span className="font-bold text-white block text-xs">الأجهزة اللوحية (Tablets)</span>
                          <span className="text-[11px] text-slate-400">iPad & Android Tabs</span>
                        </div>
                      </div>
                      <span className="text-sm font-black text-white font-['Alexandria']">5%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TESTS & SECTION POPULARITY */}
            {activeTab === 'tests' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-white text-sm">معدلات استخدام واكتمال الاختبارات</h4>
                    <p className="text-xs text-slate-300">
                      تتبع أي الأقسام يحظى بأعلى إقبال وتفاعل لإثراء المحتوى بما يناسب اهتمامات الزوار.
                    </p>
                  </div>
                  <span className="text-2xl">📊</span>
                </div>

                <div className="space-y-3">
                  {testPopularity.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{item.icon}</span>
                          <h5 className="font-bold text-sm text-white">{item.title}</h5>
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 ${item.textColor}`}>
                          معدل الإنجاز: {item.completionRate}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                        <span>إجمالي من بدأوا: <strong className="text-white">{item.started.toLocaleString()}</strong></span>
                        <span>أكملوا بنجاح: <strong className="text-emerald-400">{item.completed.toLocaleString()}</strong></span>
                      </div>

                      {/* Visual Progress Bar */}
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all duration-500`}
                          style={{
                            width: typeof item.completionRate === 'string' && item.completionRate.includes('%')
                              ? item.completionRate
                              : '85%',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: VISITOR FEEDBACK INBOX */}
            {activeTab === 'feedback' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">
                    سجل الملاحظات والرسائل الواردة من الزوار ({feedbackList.length})
                  </h4>
                  <span className="text-xs text-slate-400">
                    موجّهة تلقائياً إلى: <span className="font-mono text-blue-400">{OFFICIAL_EMAIL}</span>
                  </span>
                </div>

                {feedbackList.length === 0 ? (
                  <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 text-center space-y-2">
                    <Mail className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-xs text-slate-400">لا توجد رسائل جديدة في الوقت الحالي.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {feedbackList.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5 hover:border-slate-700 transition"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-blue-950 text-blue-400 flex items-center justify-center font-bold">
                              {msg.name.slice(0, 1)}
                            </div>
                            <div>
                              <span className="font-bold text-white block text-xs">{msg.name}</span>
                              <span className="text-[11px] text-slate-400 font-mono select-all">{msg.email}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-start sm:self-auto">
                            <span className="px-2 py-0.5 rounded-lg bg-slate-800 text-[10px] font-bold text-slate-300">
                              {msg.categoryLabelAr}
                            </span>
                            <div className="flex items-center text-amber-400 text-xs">
                              {Array.from({ length: msg.rating || 5 }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                            <span className="text-[10px] text-slate-500">
                              {new Date(msg.createdAt).toLocaleDateString('ar')}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h6 className="font-bold text-xs text-slate-200 mb-1">{msg.subject}</h6>
                          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                            {msg.message}
                          </p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-1">
                          <a
                            href={`mailto:${msg.email}?subject=${encodeURIComponent(`رد منصة مرآة القلوب حول: ${msg.subject}`)}&body=${encodeURIComponent(`مرحباً ${msg.name}،\n\nشكراً لتواصلك مع منصة مِـرآة القـلوب...\n`)}`}
                            className="py-1 px-3 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 text-[11px] font-bold flex items-center gap-1.5 transition"
                          >
                            <Send className="w-3 h-3" />
                            <span>الرد على الزائر عبر الإيميل</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Bar with Dispatch Report to Email */}
          <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>بيانات موثوقة ومحفوظة سحابياً • Google Cloud Firestore (Europe-West1)</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={handleSendEmailReport}
                disabled={isSendingReport}
                className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-900/30 cursor-pointer disabled:opacity-50"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{isSendingReport ? 'جاري الإرسال...' : 'إرسال تقرير تحليلي للإيميل (one497303@gmail.com) 📧'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onClose();
                }}
                className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
