import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ShieldCheck, Check, Settings2, Lock } from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  onOpenPrivacyPolicy: () => void;
  onOpenTermsOfService?: () => void;
}

export const CookieConsentBanner: React.FC<Props> = ({
  onOpenPrivacyPolicy,
  onOpenTermsOfService,
}) => {
  const { language, isRTL } = useLanguage();
  const isEn = language === 'en';

  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [allowAnalytics, setAllowAnalytics] = useState(true);
  const [allowPersonalizedAds, setAllowPersonalizedAds] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent_status');
      if (!consent) {
        // Delay so it animates in gracefully after initial page render
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is blocked
    }
  }, []);

  const handleAcceptAll = () => {
    soundManager.playTap();
    try {
      localStorage.setItem('cookie_consent_status', 'accepted_all');
      localStorage.setItem('cookie_consent_analytics', 'true');
      localStorage.setItem('cookie_consent_ads', 'true');
      localStorage.setItem('cookie_consent_timestamp', new Date().toISOString());
    } catch {}
    setIsVisible(false);
  };

  const handleAcceptNecessaryOnly = () => {
    soundManager.playTap();
    try {
      localStorage.setItem('cookie_consent_status', 'necessary_only');
      localStorage.setItem('cookie_consent_analytics', 'false');
      localStorage.setItem('cookie_consent_ads', 'false');
      localStorage.setItem('cookie_consent_timestamp', new Date().toISOString());
    } catch {}
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    soundManager.playTap();
    try {
      localStorage.setItem('cookie_consent_status', 'custom');
      localStorage.setItem('cookie_consent_analytics', allowAnalytics ? 'true' : 'false');
      localStorage.setItem('cookie_consent_ads', allowPersonalizedAds ? 'true' : 'false');
      localStorage.setItem('cookie_consent_timestamp', new Date().toISOString());
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-5 pointer-events-none"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto rounded-3xl bg-[#0f172a] border border-slate-700/90 shadow-2xl p-4 sm:p-6 text-white pointer-events-auto shadow-black/80"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Description & Icon */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm sm:text-base font-extrabold text-white font-['Alexandria']">
                    {isEn ? 'Cookie Consent & Digital Privacy' : 'ملفات تعريف الارتباط والخصوصية الرقمية'}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>GDPR & Google AdSense Ready</span>
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                  {isEn
                    ? 'We use essential cookies and certified analytics to enhance your experience, safeguard platform security, and display compliant non-intrusive ads via Google AdSense.'
                    : 'نحن نستخدم ملفات تعريف الارتباط وتقنيات القياس المعتمدة لتحسين تجربة التصفح، وضمان أمان المنصة، وعرض محتوى وإعلانات مخصصة عبر شبكة Google AdSense.'}
                  <span className="text-emerald-400 font-semibold block mt-1">
                    {isEn
                      ? '🔒 All psychological assessments and test data are encrypted (TLS 1.3/AES-256), never sold or shared with advertisers, and comply strictly with Google privacy standards.'
                      : '🔒 جميع بياناتك النفسية وإجابات الاختبارات تُعالج بتشفير TLS 1.3 تام ولا تُباع ولا تُشارك مع أي طرف إعلاني، وتخضع لشروط وسياسة قوقل.'}
                  </span>
                </p>
                <div className="flex items-center gap-3 text-xs pt-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      onOpenPrivacyPolicy();
                    }}
                    className="text-blue-400 hover:text-blue-300 underline font-semibold cursor-pointer"
                  >
                    {isEn ? 'Full Privacy Policy' : 'سياسة الخصوصية الكاملة'}
                  </button>
                  {onOpenTermsOfService && (
                    <>
                      <span className="text-slate-600">•</span>
                      <button
                        type="button"
                        onClick={() => {
                          soundManager.playTap();
                          onOpenTermsOfService();
                        }}
                        className="text-slate-400 hover:text-slate-200 underline cursor-pointer"
                      >
                        {isEn ? 'Terms of Service' : 'شروط الاستخدام'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto justify-end">
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  setShowPreferences(!showPreferences);
                }}
                className="py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                title={isEn ? 'Customize Preferences' : 'تخصيص الخيارات'}
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>{isEn ? 'Customize' : 'تخصيص'}</span>
              </button>

              <button
                type="button"
                onClick={handleAcceptNecessaryOnly}
                className="py-2.5 px-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition cursor-pointer"
              >
                {isEn ? 'Necessary Only' : 'الضرورية فقط'}
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-600 text-white text-xs font-extrabold shadow-md shadow-blue-900/30 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{isEn ? 'Accept All' : 'موافق وقبول الكل'}</span>
              </button>
            </div>
          </div>

          {/* Granular Preferences Drawer */}
          {showPreferences && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-slate-800 space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* 1. Necessary */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="font-bold text-white block">
                      {isEn ? 'Strictly Necessary' : 'ملفات ضرورية للتشغيل'}
                    </span>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {isEn
                        ? 'Session security, PIN lock authentication, and core UI functionality.'
                        : 'وظائف الأمان، التحقق من الجلسة، وحفظ إعدادات الخصوصية.'}
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold shrink-0 mx-2">
                    {isEn ? 'Always Active' : 'دائمة التفعيل'}
                  </span>
                </div>

                {/* 2. Analytics */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="font-bold text-white block">
                      {isEn ? 'Performance & Speed' : 'تحسين الأداء والسرعة'}
                    </span>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {isEn
                        ? 'Measures response latency and diagnostics to optimize the platform.'
                        : 'قياس أوقات الاستجابة وتشخيص الأخطاء لتحسين المنصة.'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={allowAnalytics}
                    onChange={(e) => setAllowAnalytics(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer mx-2 mt-0.5"
                  />
                </div>

                {/* 3. Advertising & Google AdSense */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="font-bold text-white block">
                      {isEn ? 'Google AdSense' : 'إعلانات Google AdSense'}
                    </span>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {isEn
                        ? 'Respectful, compliant advertising that keeps all psychometric tests free.'
                        : 'تخصيص الإعلانات النظيفة غير المتطفلة لضمان استمرارية المنصة المجانية.'}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={allowPersonalizedAds}
                    onChange={(e) => setAllowPersonalizedAds(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer mx-2 mt-0.5"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="py-2 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Save Preferences' : 'حفظ خياراتي المفضلة'}</span>
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
