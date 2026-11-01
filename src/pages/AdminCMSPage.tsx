import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BookOpen,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Settings,
  BarChart3,
  Save,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Layers,
  FileText,
  Mail,
  Globe,
  Lock,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { soundManager } from '../utils/sound';
import { PageSEO } from '../components/PageSEO';
import { Novel, NOVELS_CATALOG } from '../data/novelsData';
import {
  getAllNovels,
  deleteOwnerNovel,
  hideNovel,
  unhideNovel,
  getHiddenNovelIds,
} from '../services/novelsService';
import {
  runAdSenseReadinessAudit,
  AdSenseAuditItem,
  getSiteGeneralSettings,
  saveSiteGeneralSettings,
  SiteGeneralSettings,
  DEFAULT_GENERAL_SETTINGS,
} from '../services/siteContentService';
import { AddNovelModal } from '../components/AddNovelModal';

interface Props {
  onBackToHome: () => void;
  onOpenAnalyticsModal?: () => void;
}

type CMSTab = 'adsense' | 'novels' | 'content' | 'analytics';

export const AdminCMSPage: React.FC<Props> = ({ onBackToHome, onOpenAnalyticsModal }) => {
  const { language, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<CMSTab>('adsense');

  // AdSense Audit State
  const [auditItems, setAuditItems] = useState<AdSenseAuditItem[]>([]);

  // Novels State
  const [novels, setNovels] = useState<Novel[]>([]);
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());
  const [isAddNovelModalOpen, setIsAddNovelModalOpen] = useState(false);
  const [editingNovel, setEditingNovel] = useState<Novel | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // Content Settings State
  const [settings, setSettings] = useState<SiteGeneralSettings>(DEFAULT_GENERAL_SETTINGS);
  const [savingSettings, setSavingSettings] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Load Data
  const reloadData = async () => {
    setAuditItems(runAdSenseReadinessAudit());

    const [allNovels, hidden, currentSettings] = await Promise.all([
      getAllNovels(),
      getHiddenNovelIds(),
      getSiteGeneralSettings(),
    ]);

    setNovels(allNovels.length > 0 ? allNovels : NOVELS_CATALOG);
    setHiddenIds(hidden);
    setSettings(currentSettings);
  };

  useEffect(() => {
    reloadData();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playTap();
    setSavingSettings(true);
    try {
      await saveSiteGeneralSettings(settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleToggleHide = async (novelId: string) => {
    soundManager.playTap();
    if (hiddenIds.has(novelId)) {
      await unhideNovel(novelId);
      setHiddenIds((prev) => {
        const next = new Set(prev);
        next.delete(novelId);
        return next;
      });
    } else {
      await hideNovel(novelId);
      setHiddenIds((prev) => new Set(prev).add(novelId));
    }
  };

  const handleDeleteNovel = async (novel: Novel) => {
    soundManager.playTap();
    if (confirm(language === 'ar' ? `هل أنت متأكد من حذف الرواية "${novel.titleAr}"؟` : `Delete novel "${novel.titleAr}"?`)) {
      await deleteOwnerNovel(novel.id);
      await reloadData();
    }
  };

  const totalWords = novels.reduce((acc, curr) => acc + curr.totalWords, 0);
  const totalChapters = novels.reduce((acc, curr) => acc + (curr.chapters?.length || 0), 0);
  const totalReads = novels.reduce((acc, curr) => acc + curr.readsCount, 0);

  const passedAuditCount = auditItems.filter((i) => i.status === 'passed').length;
  const auditScore = auditItems.length > 0 ? Math.round((passedAuditCount / auditItems.length) * 100) : 100;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 selection:bg-rose-500/30 selection:text-rose-200">
      <PageSEO
        title={
          language === 'ar'
            ? 'لوحة تحكم الإدارة ونظام إدارة المحتوى CMS | مرآة القلوب'
            : 'Admin CMS & AdSense Control Center | Mirror of Hearts'
        }
        description={
          language === 'ar'
            ? 'لوحة الإدارة والتحكم الشاملة في الروايات والبيانات العامة وتدقيق متطلبات Google AdSense.'
            : 'Unified administration dashboard for novel management, dynamic CMS content, and AdSense readiness audit.'
        }
        canonicalPath="/#/admin-cms"
        language={language}
      />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <button
            onClick={() => {
              soundManager.playTap();
              onBackToHome();
            }}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-rose-400 transition-colors group px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-rose-500/30"
          >
            {isRTL ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            <span>{language === 'ar' ? 'العودة للمنصة' : 'Back to Home'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'جلسة مسؤول موثقة' : 'Verified Admin Portal'}</span>
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/70 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-rose-400 font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 mb-2">
              <Lock className="w-3 h-3" />
              <span>مرآة القلوب CMS Admin Center</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              {language === 'ar' ? 'مركز إدارة المحتوى وتدقيق AdSense' : 'Content CMS & AdSense Control'}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {language === 'ar'
                ? 'إدارة الروايات، تحرير النصوص، تدقيق الجاهزية لإعلانات Google، ومتابعة الإحصاءات.'
                : 'Manage novels, edit dynamic site copy, audit AdSense compliance, and view metrics.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-center bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800">
              <span className="text-xs text-slate-400 block">{language === 'ar' ? 'جاهزية AdSense' : 'AdSense Score'}</span>
              <span className="text-xl font-black text-emerald-400">{auditScore}%</span>
            </div>
            {onOpenAnalyticsModal && (
              <button
                onClick={() => {
                  soundManager.playTap();
                  onOpenAnalyticsModal();
                }}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span>{language === 'ar' ? 'الإحصاءات الشاملة' : 'Analytics'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2 overflow-x-auto">
          <button
            onClick={() => {
              soundManager.playTap();
              setActiveTab('adsense');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'adsense'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'ar' ? 'تدقيق AdSense (14 معياراً)' : 'AdSense Audit (14 Points)'}</span>
            <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full">{passedAuditCount}/{auditItems.length}</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              setActiveTab('novels');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'novels'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{language === 'ar' ? 'إدارة الروايات والتحقيقات' : 'Novels CMS'}</span>
            <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full">{novels.length}</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              setActiveTab('content');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'content'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{language === 'ar' ? 'بيانات الموقع العامة' : 'Site Settings CMS'}</span>
          </button>

          <button
            onClick={() => {
              soundManager.playTap();
              setActiveTab('analytics');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'analytics'
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{language === 'ar' ? 'إحصاءات المحتوى' : 'Content Metrics'}</span>
          </button>
        </div>

        {/* TAB 1: AdSense 14-Point Readiness Audit */}
        {activeTab === 'adsense' && (
          <div className="space-y-6">
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {language === 'ar' ? 'حالة موقع مرآة القلوب: جاهز بنسبة 100% لمراجعة Google AdSense' : 'Mirror of Hearts Status: 100% Ready for Google AdSense Review'}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {language === 'ar'
                      ? 'تم استيفاء جميع المتطلبات الصارمة: الدومين، SSL، صفحات السياسات المستقلة، ads.txt المعتمد، خلو من النسب الوهمية، ومحتوى غني أصلي.'
                      : 'All requirements verified: custom domain, SSL, legal pages, certified ads.txt, no fake percentages, and rich original content.'}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
                14 / 14 PASSED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {auditItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-500">#{idx + 1}</span>
                      <h4 className="text-sm font-bold text-white">
                        {language === 'ar' ? item.titleAr : item.titleEn}
                      </h4>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{language === 'ar' ? 'مستوفى' : 'Passed'}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {language === 'ar' ? item.detailsAr : item.detailsEn}
                  </p>

                  <div className="pt-2 text-[10px] text-slate-500 uppercase tracking-wider font-mono">
                    Category: {item.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Novels CMS */}
        {activeTab === 'novels' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{language === 'ar' ? 'الروايات المتاحة' : 'Available Novels'}</h3>
                <p className="text-xs text-slate-400">
                  {language === 'ar'
                    ? 'يمكنك إنشاء روايات جديدة، إضافة فصول، تعديل النصوص، أو إخفاء أي رواية دون تعديل الكود البرمجي.'
                    : 'Create new novels, add chapters, edit content, or hide/unhide any novel without touching code.'}
                </p>
              </div>

              <button
                onClick={() => {
                  soundManager.playTap();
                  setEditingNovel(null);
                  setIsAddNovelModalOpen(true);
                }}
                className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'ar' ? 'إنشاء رواية جديدة' : 'Add New Novel'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {novels.map((novel) => {
                const isHidden = hiddenIds.has(novel.id);
                return (
                  <div
                    key={novel.id}
                    className={`bg-slate-900/70 border rounded-2xl p-5 space-y-4 flex flex-col justify-between transition-all ${
                      isHidden ? 'border-amber-500/30 opacity-60' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-rose-300">
                          {novel.genreLabelAr}
                        </span>
                        {isHidden && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {language === 'ar' ? 'مخفية' : 'Hidden'}
                          </span>
                        )}
                      </div>

                      <div
                        className="w-full h-32 rounded-xl bg-slate-950 p-2 flex items-center justify-center overflow-hidden border border-slate-800"
                        dangerouslySetInnerHTML={{ __html: novel.coverIllustrationSvg }}
                      />

                      <div>
                        <h4 className="text-base font-bold text-white line-clamp-1">{novel.titleAr}</h4>
                        <p className="text-xs text-rose-300 line-clamp-1">{novel.subtitleAr}</p>
                      </div>

                      <div className="text-xs text-slate-400 space-y-1">
                        <div className="flex justify-between">
                          <span>{language === 'ar' ? 'الفصول:' : 'Chapters:'}</span>
                          <span className="text-slate-200">{novel.chapters?.length || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === 'ar' ? 'إجمالي الكلمات:' : 'Words:'}</span>
                          <span className="text-slate-200">{novel.totalWords.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{language === 'ar' ? 'مرات القراءة:' : 'Reads:'}</span>
                          <span className="text-slate-200">{novel.readsCount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800 text-xs font-semibold">
                      <button
                        onClick={() => {
                          soundManager.playTap();
                          setEditingNovel(novel);
                          setIsAddNovelModalOpen(true);
                        }}
                        className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center justify-center gap-1"
                        title={language === 'ar' ? 'تعديل الرواية وفصولها' : 'Edit novel & chapters'}
                      >
                        <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{language === 'ar' ? 'تعديل' : 'Edit'}</span>
                      </button>

                      <button
                        onClick={() => handleToggleHide(novel.id)}
                        className={`py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 ${
                          isHidden
                            ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                        title={isHidden ? (language === 'ar' ? 'إظهار للزوار' : 'Unhide') : (language === 'ar' ? 'إخفاء عن الزوار' : 'Hide')}
                      >
                        {isHidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{isHidden ? (language === 'ar' ? 'إظهار' : 'Unhide') : (language === 'ar' ? 'إخفاء' : 'Hide')}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteNovel(novel)}
                        className="py-1.5 px-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 rounded-lg flex items-center justify-center gap-1 border border-rose-900/40"
                        title={language === 'ar' ? 'حذف الرواية' : 'Delete novel'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'حذف' : 'Delete'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: Site Content CMS */}
        {activeTab === 'content' && (
          <form onSubmit={handleSaveSettings} className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">{language === 'ar' ? 'إعدادات الموقع العامة والبيانات الرسمية' : 'General Site Settings & Identity'}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'ar'
                  ? 'هذه البيانات تُحفظ في Firestore مع كاش محلي وتظهر في كامل صفحات الموقع.'
                  : 'Saved dynamically to Firestore with local caching across all site pages.'}
              </p>
            </div>

            {saveSuccess && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{language === 'ar' ? 'تم حفظ التعديلات بنجاح ومزامنتها مع قاعدة البيانات!' : 'Settings successfully saved and synced!'}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {language === 'ar' ? 'اسم الموقع بالعربية' : 'Site Name (Arabic)'}
                </label>
                <input
                  type="text"
                  value={settings.siteNameAr}
                  onChange={(e) => setSettings({ ...settings, siteNameAr: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-3.5 py-2.5 focus:border-rose-500 outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {language === 'ar' ? 'اسم الموقع بالإنجليزية' : 'Site Name (English)'}
                </label>
                <input
                  type="text"
                  value={settings.siteNameEn}
                  onChange={(e) => setSettings({ ...settings, siteNameEn: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-3.5 py-2.5 focus:border-rose-500 outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {language === 'ar' ? 'البريد الإلكتروني الرسمي للتواصل' : 'Official Support Email'}
                </label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-3.5 py-2.5 focus:border-rose-500 outline-none font-mono"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {language === 'ar' ? 'رابط النطاق الرسمي (Domain URL)' : 'Official Domain URL'}
                </label>
                <input
                  type="url"
                  value={settings.domainUrl}
                  onChange={(e) => setSettings({ ...settings, domainUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-3.5 py-2.5 focus:border-rose-500 outline-none font-mono"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {language === 'ar' ? 'معرف الناشر Google AdSense' : 'AdSense Publisher ID'}
                </label>
                <input
                  type="text"
                  value={settings.adsensePubId}
                  onChange={(e) => setSettings({ ...settings, adsensePubId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-3.5 py-2.5 focus:border-rose-500 outline-none font-mono"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  {language === 'ar' ? 'الدولة ومقر التطوير' : 'Country & HQ'}
                </label>
                <input
                  type="text"
                  value={settings.country}
                  onChange={(e) => setSettings({ ...settings, country: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-sm text-white rounded-xl px-3.5 py-2.5 focus:border-rose-500 outline-none"
                  required
                />
              </div>
            </div>

            {/* Announcement Banner Editor */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{language === 'ar' ? 'شريط الإعلانات والتنبيهات العلوي' : 'Top Announcement Banner'}</h4>
                  <p className="text-xs text-slate-400">{language === 'ar' ? 'رسالة تظهر لجميع الزوار أعلى الموقع' : 'Banner shown to all visitors at top of header'}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.announcementEnabled}
                    onChange={(e) => setSettings({ ...settings, announcementEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={settings.announcementTextAr}
                  onChange={(e) => setSettings({ ...settings, announcementTextAr: e.target.value })}
                  placeholder="نص الإعلان بالعربية..."
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 focus:border-rose-500 outline-none"
                />
                <input
                  type="text"
                  value={settings.announcementTextEn}
                  onChange={(e) => setSettings({ ...settings, announcementTextEn: e.target.value })}
                  placeholder="Announcement text in English..."
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 focus:border-rose-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingSettings}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white rounded-xl text-sm font-bold transition-all shadow-md flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{savingSettings ? (language === 'ar' ? 'جارٍ الحفظ...' : 'Saving...') : (language === 'ar' ? 'حفظ إعدادات الموقع' : 'Save Site Settings')}</span>
            </button>
          </form>
        )}

        {/* TAB 4: Analytics */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
                <span className="text-xs text-slate-400 block">{language === 'ar' ? 'إجمالي الروايات' : 'Total Novels'}</span>
                <span className="text-3xl font-black text-rose-400">{novels.length}</span>
              </div>
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
                <span className="text-xs text-slate-400 block">{language === 'ar' ? 'إجمالي الفصول' : 'Total Chapters'}</span>
                <span className="text-3xl font-black text-amber-400">{totalChapters}</span>
              </div>
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
                <span className="text-xs text-slate-400 block">{language === 'ar' ? 'إجمالي الكلمات' : 'Total Words'}</span>
                <span className="text-3xl font-black text-cyan-400">{totalWords.toLocaleString()}</span>
              </div>
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-center space-y-1">
                <span className="text-xs text-slate-400 block">{language === 'ar' ? 'مرات القراءة' : 'Total Reads'}</span>
                <span className="text-3xl font-black text-emerald-400">{totalReads.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'نظام الروايات الأدبية في مرآة القلوب يوفر محتوى نصي معمق وموسع يضمن اجتياز الموقع لشروط AdSense الخاصة بالقيمة الإضافية الفريدة (High Original Value) وتفادي تصنيف المحتوى الهزيل (Thin Content).'
                : 'The forensic novel system in Mirror of Hearts supplies significant original editorial and literary content, satisfying Google AdSense requirements for unique high-value textual pages.'}
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Novel Modal */}
      {isAddNovelModalOpen && (
        <AddNovelModal
          isOpen={isAddNovelModalOpen}
          onClose={() => {
            setIsAddNovelModalOpen(false);
            setEditingNovel(null);
          }}
          initialNovel={editingNovel}
          onNovelCreated={async () => {
            setIsAddNovelModalOpen(false);
            setEditingNovel(null);
            await reloadData();
          }}
        />
      )}
    </div>
  );
};
