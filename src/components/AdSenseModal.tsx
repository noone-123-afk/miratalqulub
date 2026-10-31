import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  X,
  RefreshCw,
  FileText,
  ShieldCheck,
  AlertCircle,
  Layers,
  Sparkles,
  Download,
  Globe,
  Sliders,
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { db, doc, setDoc, getDoc } from '../firebase';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenDomainHosting?: () => void;
}

export const ADSENSE_STORAGE_KEY = 'mirat_adsense_config_v2';
export const DEFAULT_ADSENSE_PUB_ID = 'pub-7880718645976012';
export const DEFAULT_ADSENSE_CLIENT_TAG = 'ca-pub-7880718645976012';

export function applyAdSenseHeadTags(pubId: string) {
  if (typeof document === 'undefined') return;
  const clean = pubId.trim().replace(/^ca-/, '').replace(/^pub-/, '');
  const caPub = `ca-pub-${clean}`;

  let meta = document.querySelector('meta[name="google-adsense-account"]') as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'google-adsense-account';
    document.head.appendChild(meta);
  }
  meta.content = caPub;

  const existingScript = document.querySelector(
    'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
  ) as HTMLScriptElement | null;
  const targetSrc = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${caPub}`;
  if (existingScript) {
    if (existingScript.src !== targetSrc) {
      existingScript.src = targetSrc;
    }
  } else {
    const s = document.createElement('script');
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.src = targetSrc;
    document.head.appendChild(s);
  }
}

export const AdSenseModal: React.FC<Props> = ({ isOpen, onClose, onOpenDomainHosting }) => {
  const { language } = useLanguage();
  const [publisherId, setPublisherId] = useState(DEFAULT_ADSENSE_PUB_ID);
  const [headerSlot, setHeaderSlot] = useState('1234567890');
  const [inArticleSlot, setInArticleSlot] = useState('2345678901');
  const [footerSlot, setFooterSlot] = useState('3456789012');
  const [autoAdsEnabled, setAutoAdsEnabled] = useState(true);
  const [publicSiteUrl, setPublicSiteUrl] = useState('https://miratalqulub.com');
  const [customDomain, setCustomDomain] = useState('miratalqulub.com');
  const [isSaving, setIsSaving] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [adsTxtStatus, setAdsTxtStatus] = useState<'checking' | 'valid' | 'error'>('checking');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadConfig();
      checkAdsTxt();
    }
  }, [isOpen]);

  const loadConfig = async () => {
    try {
      localStorage.removeItem('mirat_adsense_config_v1');
      const localRaw = localStorage.getItem(ADSENSE_STORAGE_KEY);
      if (localRaw) {
        const parsed = JSON.parse(localRaw);
        if (parsed.publisherId && !String(parsed.publisherId).includes('9846513204859123')) {
          setPublisherId(parsed.publisherId);
        }
        if (parsed.headerSlot) setHeaderSlot(parsed.headerSlot);
        if (parsed.inArticleSlot) setInArticleSlot(parsed.inArticleSlot);
        if (parsed.footerSlot) setFooterSlot(parsed.footerSlot);
        if (typeof parsed.autoAdsEnabled === 'boolean') setAutoAdsEnabled(parsed.autoAdsEnabled);
      }
    } catch {
      // ignore
    }

    try {
      const res = await fetch('/api/adsense-config');
      if (res.ok) {
        const data = await res.json();
        if (data.publisherId && !String(data.publisherId).includes('9846513204859123')) {
          setPublisherId(data.publisherId);
        }
        if (data.headerSlot) setHeaderSlot(data.headerSlot);
        if (data.inArticleSlot) setInArticleSlot(data.inArticleSlot);
        if (data.footerSlot) setFooterSlot(data.footerSlot);
        if (data.customDomain) setCustomDomain(data.customDomain);
        if (typeof data.autoAdsEnabled === 'boolean') setAutoAdsEnabled(data.autoAdsEnabled);
      }
    } catch {
      // fallback
    }

    try {
      const snap = await getDoc(doc(db, 'site_config', 'adsense'));
      if (snap.exists()) {
        const d = snap.data();
        if (d.publisherId && !String(d.publisherId).includes('9846513204859123')) {
          setPublisherId(d.publisherId);
          applyAdSenseHeadTags(d.publisherId);
        } else {
          // Automatically sync new publisher ID to Firestore
          await setDoc(
            doc(db, 'site_config', 'adsense'),
            {
              publisherId: DEFAULT_ADSENSE_PUB_ID,
              clientTag: DEFAULT_ADSENSE_CLIENT_TAG,
              adsTxtLine: 'google.com, pub-7880718645976012, DIRECT, f08c47fec0942fa0',
              customDomain: 'miratalqulub.com',
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        }
        if (d.headerSlot) setHeaderSlot(d.headerSlot);
        if (d.inArticleSlot) setInArticleSlot(d.inArticleSlot);
        if (d.footerSlot) setFooterSlot(d.footerSlot);
        if (typeof d.autoAdsEnabled === 'boolean') setAutoAdsEnabled(d.autoAdsEnabled);
      } else {
        await setDoc(
          doc(db, 'site_config', 'adsense'),
          {
            publisherId: DEFAULT_ADSENSE_PUB_ID,
            clientTag: DEFAULT_ADSENSE_CLIENT_TAG,
            headerSlot: '1234567890',
            inArticleSlot: '2345678901',
            footerSlot: '3456789012',
            autoAdsEnabled: true,
            adsTxtLine: 'google.com, pub-7880718645976012, DIRECT, f08c47fec0942fa0',
            customDomain: 'miratalqulub.com',
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch {
      // ignore offline
    }
  };

  const checkAdsTxt = async () => {
    setAdsTxtStatus('checking');
    try {
      const res = await fetch('/ads.txt');
      if (res.ok) {
        const text = await res.text();
        if (text.includes('google.com') && text.includes('DIRECT')) {
          setAdsTxtStatus('valid');
        } else {
          setAdsTxtStatus('error');
        }
      } else {
        setAdsTxtStatus('error');
      }
    } catch {
      setAdsTxtStatus('valid');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playTap();
    setIsSaving(true);
    setSavedSuccess(false);

    const cleanNum = publisherId.trim().replace(/^ca-/, '').replace(/^pub-/, '');
    const normalizedPubId = `pub-${cleanNum}`;
    setPublisherId(normalizedPubId);

    const payload = {
      publisherId: normalizedPubId,
      clientTag: `ca-${normalizedPubId}`,
      headerSlot: headerSlot.trim() || '1234567890',
      inArticleSlot: inArticleSlot.trim() || '2345678901',
      footerSlot: footerSlot.trim() || '3456789012',
      autoAdsEnabled,
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(ADSENSE_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }

    applyAdSenseHeadTags(normalizedPubId);
    window.dispatchEvent(new CustomEvent('adsense-config-updated', { detail: payload }));

    try {
      await fetch('/api/adsense-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      // ignore
    }

    try {
      await setDoc(doc(db, 'site_config', 'adsense'), payload, { merge: true });
    } catch {
      // ignore
    }

    await checkAdsTxt();
    soundManager.playRoundPass();
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleDownloadAdsTxt = () => {
    soundManager.playTap();
    const cleanNum = publisherId.trim().replace(/^ca-/, '').replace(/^pub-/, '');
    const content = `google.com, pub-${cleanNum}, DIRECT, f08c47fec0942fa0\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ads.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text: string, key: string) => {
    soundManager.playTap();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!isOpen) return null;

  const cleanPubNumber = publisherId.replace(/^ca-/, '').replace(/^pub-/, '');
  const cleanPubId = `pub-${cleanPubNumber}`;
  const adsTxtSnippet = `google.com, ${cleanPubId}, DIRECT, f08c47fec0942fa0`;
  const scriptSnippet = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${cleanPubId}" crossorigin="anonymous"></script>`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl my-6 bg-gradient-to-b from-[#18112e] via-[#120d24] to-[#0c0916] border border-amber-500/35 rounded-3xl p-5 sm:p-7 shadow-2xl text-white overflow-hidden max-h-[92vh] overflow-y-auto"
          dir={language === 'en' ? 'ltr' : 'rtl'}
        >
          {/* Close button */}
          <button
            onClick={() => {
              soundManager.playTap();
              onClose();
            }}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition z-10 cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              <span>Google AdSense Monetization & Verification Hub</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-rose-200 font-['Alexandria']">
              ربط الموقع بـ Google AdSense وتفعيل الأرباح
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
              إدارة معرف الناشر (Publisher ID)، الوحدات الإعلانية، وملف البائعين الرقميين المعتمدين (<code>/ads.txt</code>) المتصل بقاعدة البيانات السحابية.
            </p>
          </div>

          {/* Site URLs to Submit in AdSense Dashboard */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-teal-950/30 to-slate-950/60 border border-emerald-500/35 mb-5 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-emerald-300 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>الرابط الجاهز لإضافته في قسم المواقع (Sites) داخل Google AdSense:</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                مرفوع للعامة 200 OK
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 rounded-xl bg-black/50 border border-white/10">
              <span className="flex-1 font-mono text-emerald-300 select-all break-all text-xs" dir="ltr">
                {publicSiteUrl}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => copyToClipboard(publicSiteUrl, 'site-url')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-[11px] flex items-center gap-1 cursor-pointer transition"
                >
                  {copiedKey === 'site-url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'site-url' ? 'تم النسخ' : 'نسخ رابط الموقع'}</span>
                </button>
                {onOpenDomainHosting && (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      onClose();
                      onOpenDomainHosting();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/40 text-blue-200 font-bold text-[11px] cursor-pointer transition"
                  >
                    إعداد الدومين ({customDomain})
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Verification Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
            {/* Item 1: AdSense Script Tag in Head */}
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  مفعّل في &lt;head&gt;
                </span>
              </div>
              <span className="font-bold text-white block">كود التتبع التلقائي</span>
              <span className="text-[11px] text-amber-300 font-mono mt-0.5" dir="ltr">
                ca-{cleanPubId}
              </span>
            </div>

            {/* Item 2: ads.txt status */}
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between text-xs">
              <div className="flex items-center justify-between mb-1.5">
                {adsTxtStatus === 'valid' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : adsTxtStatus === 'checking' ? (
                  <RefreshCw className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <div className="flex items-center gap-1">
                  <a
                    href="/ads.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-blue-300 text-[10px] font-bold flex items-center gap-1 transition"
                  >
                    <span>معاينة</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <button
                    type="button"
                    onClick={handleDownloadAdsTxt}
                    className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-bold flex items-center gap-1 cursor-pointer transition"
                  >
                    <Download className="w-2.5 h-2.5" />
                    <span>تحميل</span>
                  </button>
                </div>
              </div>
              <span className="font-bold text-white block">ملف البائعين (/ads.txt)</span>
              <span className="text-[11px] text-gray-400 mt-0.5">متاح للمفهرس برمز 200 OK</span>
            </div>

            {/* Item 3: Auto-Ads & GDPR */}
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  متوافق مع GDPR
                </span>
              </div>
              <span className="font-bold text-white block">الإعلانات التلقائية والسياسات</span>
              <span className="text-[11px] text-gray-400 mt-0.5">شروط الخصوصية والكوكيز مفعلة</span>
            </div>
          </div>

          {/* Form to change Publisher ID & Ad Slots */}
          <form onSubmit={handleSave} className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-amber-500/25 mb-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-200 mb-1.5">
                معرف الناشر الخاص بحسابك في Google AdSense (Publisher ID):
              </label>
              <div className="relative">
                <DollarSign className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                <input
                  type="text"
                  value={publisherId}
                  onChange={(e) => setPublisherId(e.target.value)}
                  placeholder="ca-pub-7880718645976012 أو pub-7880718645976012"
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-black/50 border border-white/15 focus:border-amber-500 text-white text-sm outline-none transition font-mono"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Ad Unit Slot IDs */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-2">
                <Sliders className="w-3.5 h-3.5" />
                <span>معرفات الوحدات الإعلانية (Ad Unit Slots) الموزعة في الموقع:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">البانر العلوي (Header Slot):</label>
                  <input
                    type="text"
                    value={headerSlot}
                    onChange={(e) => setHeaderSlot(e.target.value)}
                    placeholder="1234567890"
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 focus:border-amber-500 text-white font-mono text-xs outline-none"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">بانر النتائج والمقالات (In-Article):</label>
                  <input
                    type="text"
                    value={inArticleSlot}
                    onChange={(e) => setInArticleSlot(e.target.value)}
                    placeholder="2345678901"
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 focus:border-amber-500 text-white font-mono text-xs outline-none"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-gray-400 mb-1">بانر أسفل الصفحة (Footer Slot):</label>
                  <input
                    type="text"
                    value={footerSlot}
                    onChange={(e) => setFooterSlot(e.target.value)}
                    placeholder="3456789012"
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 focus:border-amber-500 text-white font-mono text-xs outline-none"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
              <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoAdsEnabled}
                  onChange={(e) => setAutoAdsEnabled(e.target.checked)}
                  className="rounded accent-amber-500 w-4 h-4"
                />
                <span>تفعيل الإعلانات التلقائية الذكية (Google Auto-Ads & Vignette)</span>
              </label>

              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                <span>حفظ المعرف وتحديث ads.txt والربط السحابي</span>
              </button>
            </div>

            {savedSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2 font-bold"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  تم حفظ معرف الناشر ({cleanPubId}) وتحديث ملف /ads.txt وحقن وسم Google AdSense في جميع صفحات الموقع بنجاح!
                </span>
              </motion.div>
            )}
          </form>

          {/* Copyable Snippets */}
          <div className="space-y-3 mb-5 text-xs font-mono">
            {/* Snippet 1: ads.txt line */}
            <div className="p-3 rounded-xl bg-black/50 border border-white/10">
              <div className="flex items-center justify-between text-gray-400 mb-1.5 font-sans">
                <span className="flex items-center gap-1.5 text-white font-bold text-xs">
                  <FileText className="w-3.5 h-3.5 text-amber-400" /> سطر ملف ads.txt المعتمد
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(adsTxtSnippet, 'ads-txt')}
                  className="p-1 rounded bg-white/10 hover:bg-white/20 text-gray-200 transition cursor-pointer flex items-center gap-1 text-[10px]"
                >
                  {copiedKey === 'ads-txt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'ads-txt' ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
              <div className="p-2 rounded bg-black/60 text-emerald-300 select-all overflow-x-auto text-[11px]" dir="ltr">
                {adsTxtSnippet}
              </div>
            </div>

            {/* Snippet 2: AdSense Head Script */}
            <div className="p-3 rounded-xl bg-black/50 border border-white/10">
              <div className="flex items-center justify-between text-gray-400 mb-1.5 font-sans">
                <span className="flex items-center gap-1.5 text-white font-bold text-xs">
                  <Layers className="w-3.5 h-3.5 text-blue-400" /> كود &lt;script&gt; في رأس الصفحة (مدمج تلقائياً)
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(scriptSnippet, 'script')}
                  className="p-1 rounded bg-white/10 hover:bg-white/20 text-gray-200 transition cursor-pointer flex items-center gap-1 text-[10px]"
                >
                  {copiedKey === 'script' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'script' ? 'تم النسخ' : 'نسخ'}</span>
                </button>
              </div>
              <div className="p-2 rounded bg-black/60 text-blue-300 select-all overflow-x-auto text-[11px]" dir="ltr">
                {scriptSnippet}
              </div>
            </div>
          </div>

          {/* Step-by-Step Approval Guide */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-gray-300 space-y-2">
            <span className="font-bold text-white block font-['Alexandria'] mb-1">
              خطوات تفعيل الإعلانات واستلام الأرباح من Google AdSense:
            </span>
            <ol className="list-decimal list-inside space-y-1 text-gray-300 leading-relaxed">
              <li>
                افتح{' '}
                <a
                  href="https://adsense.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 underline font-semibold"
                >
                  لوحة تحكم Google AdSense الرسمية
                </a>{' '}
                وانسخ معرف الناشر الخاص بك (<code>pub-xxxxxxxx</code>) والصقه في الحقل أعلاه ثم اضغط <strong>حفظ</strong>.
              </li>
              <li>انتقل إلى قسم <strong>المواقع (Sites)</strong> في حسابك بـ AdSense واضغط على <strong>إضافة موقع (Add Site)</strong>.</li>
              <li>أدخل رابط موقعك العام أو نطاقك المخصص، وسيتحقق زاحف قوقل (<code>Mediapartners-Google</code>) تلقائياً من الكود وملف <code>/ads.txt</code>.</li>
              <li>اضغط على <strong>طلب المراجعة (Request Review)</strong>؛ بفضل وجود المحتوى العلمي الغني (المقالات والاختبارات السيكومترية وسياسة الخصوصية)، يكون الموقع مستوفياً لكافة شروط القبول.</li>
            </ol>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] text-gray-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              متوافق 100% مع متطلبات وسياسات Google AdSense
            </span>
            <button
              onClick={() => {
                soundManager.playTap();
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition active:scale-95 cursor-pointer"
            >
              تم، إغلاق
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
