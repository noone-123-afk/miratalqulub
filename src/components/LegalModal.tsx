import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  FileText,
  Lock,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Server,
  UserCheck,
  Cookie,
  Trash2,
  Mail,
  MapPin,
  Globe,
  Sun,
  Moon,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../utils/theme';
import { purgeAllUserDataPermanently } from '../services/userHistoryService';

export type LegalTab = 'privacy' | 'terms' | 'about';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
}

export const LegalModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const { language, toggleLanguage } = useLanguage();
  const { user } = useAuth();
  const [theme, toggleTheme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';

  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const handlePermanentDelete = async () => {
    soundManager.playTap();
    setIsDeleting(true);
    try {
      await purgeAllUserDataPermanently(user);
      setIsDeleting(false);
      setConfirmDelete(false);
      setDeleteSuccess(true);
      setTimeout(() => setDeleteSuccess(false), 4500);
    } catch {
      setIsDeleting(false);
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
            isLight
              ? 'bg-white border-slate-300 text-slate-900'
              : 'bg-[#0f172a] border-slate-700 text-white shadow-black/80'
          }`}
        >
          {/* Header Bar */}
          <div
            className={`p-4 sm:p-6 border-b flex flex-wrap items-center justify-between gap-4 shrink-0 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border flex items-center justify-center ${
                  isLight
                    ? 'bg-blue-50 border-blue-200 text-blue-600'
                    : 'bg-blue-950/80 border-blue-500/40 text-blue-400'
                }`}
              >
                {activeTab === 'privacy' ? (
                  <Lock className="w-5 h-5 text-emerald-500" />
                ) : activeTab === 'terms' ? (
                  <FileText className="w-5 h-5 text-blue-500" />
                ) : (
                  <Info className="w-5 h-5 text-purple-500" />
                )}
              </div>
              <div>
                <h3
                  className={`text-base sm:text-lg font-extrabold font-['Alexandria'] ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {activeTab === 'privacy'
                    ? isAr
                      ? 'سياسة الخصوصية وحماية البيانات'
                      : 'Privacy Policy & Data Protection'
                    : activeTab === 'terms'
                    ? isAr
                      ? 'شروط الاستخدام والخدمة'
                      : 'Terms of Service'
                    : isAr
                    ? 'عن الموقع والإشراف الهندسي'
                    : 'About Us & Engineering Supervision'}
                </h3>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {isAr
                    ? 'الأردن - عمّان • one497303@gmail.com • تشفير قياسي TLS 1.3'
                    : 'Jordan - Amman • one497303@gmail.com • TLS 1.3 Encrypted'}
                </p>
              </div>
            </div>

            {/* Tab switchers & Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div
                className={`flex p-1 rounded-2xl border ${
                  isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setActiveTab('privacy');
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                    activeTab === 'privacy'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isAr ? 'الخصوصية' : 'Privacy'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setActiveTab('terms');
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                    activeTab === 'terms'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isAr ? 'الشروط' : 'Terms'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setActiveTab('about');
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                    activeTab === 'about'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{isAr ? 'عن الموقع' : 'About'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  toggleLanguage();
                }}
                className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                  isLight
                    ? 'bg-white border-slate-200 text-sky-700'
                    : 'bg-white/5 border-white/10 text-sky-300'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{isAr ? 'EN' : 'AR'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  toggleTheme();
                }}
                className={`p-2 rounded-xl border transition cursor-pointer ${
                  isLight
                    ? 'bg-white border-slate-200 text-amber-700'
                    : 'bg-white/5 border-white/10 text-amber-300'
                }`}
              >
                {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onClose();
                  window.location.hash =
                    activeTab === 'privacy'
                      ? '#/privacy'
                      : activeTab === 'terms'
                      ? '#/terms'
                      : '#/about';
                }}
                className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold transition flex items-center gap-1 cursor-pointer ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                }`}
                title={isAr ? 'عرض الصفحة الكاملة' : 'Open Full Page'}
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                <span className="hidden sm:inline">
                  {isAr ? 'الصفحة الكاملة' : 'Full Page'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onClose();
                }}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition cursor-pointer ${
                  isLight
                    ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div
            className={`flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 text-xs sm:text-sm leading-relaxed scrollbar-thin ${
              isLight ? 'text-slate-700' : 'text-slate-200'
            }`}
          >
            {/* Permanent Data Deletion Action Banner in Modal */}
            <div
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isLight
                  ? 'bg-rose-50 border-rose-200 text-slate-900'
                  : 'bg-rose-950/30 border-rose-500/40 text-slate-100'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-rose-500">
                  <Trash2 className="w-4 h-4 shrink-0" />
                  <span>
                    {isAr
                      ? 'حق المستخدم في حذف بياناته نهائياً (Right to Erasure)'
                      : 'User’s Right to Permanently Delete Data (GDPR)'}
                  </span>
                </div>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {isAr
                    ? 'يمكنك مسح كافة بياناتك وسجل اختباراتك من المتصفح والسحابة نهائياً بنقرة زر واحدة.'
                    : 'You can permanently erase all your profile and test records from browser and cloud storage with one click.'}
                </p>
              </div>

              {!confirmDelete && !deleteSuccess && (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer shrink-0 flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isAr ? 'حذف بياناتي نهائياً' : 'Delete Data Permanently'}</span>
                </button>
              )}

              {deleteSuccess && (
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isAr ? 'تم حذف بياناتك نهائياً.' : 'Data permanently deleted.'}
                  </span>
                </span>
              )}

              {confirmDelete && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={handlePermanentDelete}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer"
                  >
                    {isDeleting
                      ? isAr
                        ? 'جاري الحذف...'
                        : 'Deleting...'
                      : isAr
                      ? 'تأكيد الحذف النهائي'
                      : 'Confirm Delete'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                      isLight
                        ? 'bg-white border border-slate-300 text-slate-700'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {isAr ? 'إلغاء' : 'Cancel'}
                  </button>
                </div>
              )}
            </div>

            {activeTab === 'privacy' && (
              <div className="space-y-5">
                <div
                  className={`p-4 rounded-2xl border space-y-2 ${
                    isLight
                      ? 'bg-emerald-50 border-emerald-300 text-slate-900'
                      : 'bg-emerald-950/40 border-emerald-500/50 text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 font-extrabold text-emerald-500 text-sm">
                    <ShieldCheck className="w-5 h-5 shrink-0" />
                    <span>
                      {isAr
                        ? 'ميثاق حماية البيانات وتشفير TLS 1.3 (الأردن - عمّان)'
                        : 'Data Protection & TLS 1.3 Charter (Jordan - Amman)'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    {isAr
                      ? 'تُعالج جميع إجابات المقاييس النفسية واختبارات الذكاء وكاشف التوافق بخصوصية تامة عبر بروتوكول التشفير القياسي TLS 1.3 أثناء النقل وAES-256 أثناء التخزين، تحت إشراف فريقنا الهندسي في (الأردن - عمّان). نحن لا نبيع ولا نشارك بيانات المستخدمين مع أي طرف ثالث إطلاقاً.'
                      : 'All psychometric responses, intelligence batteries, and compatibility inputs are processed with strict privacy under TLS 1.3 in-transit encryption and AES-256 storage encryption, supervised by our engineering team in Amman, Jordan. We never sell or share user data.'}
                  </p>
                </div>

                <section className="space-y-2">
                  <h4
                    className={`font-extrabold text-sm sm:text-base ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {isAr
                      ? '1. مبدأ الحد الأدنى من جمع البيانات (Data Minimization)'
                      : '1. Data Minimization Principle'}
                  </h4>
                  <p>
                    {isAr
                      ? 'نكتفي بالاسم المستعار، وسنة الميلاد فقط (دون تاريخ الميلاد الدقيق)، والخيارات الثقافية الإقليمية العامة، مع حظر رفع الصور الشخصية، واشتراط مربع الموافقة الإلزامي قبل حساب التوافق.'
                      : 'We collect only a nickname, birth year (never exact date of birth), and general cultural scope, strictly prohibiting personal photo uploads and requiring explicit consent prior to compatibility scoring.'}
                  </p>
                </section>

                <section className="space-y-2">
                  <h4
                    className={`font-extrabold text-sm sm:text-base ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {isAr
                      ? '2. التواصل الرسمي ومسؤول حماية البيانات (DPO)'
                      : '2. Official Engineering Supervision & DPO Contact'}
                  </h4>
                  <p>
                    {isAr
                      ? 'الإشراف الهندسي: الأردن - عمّان (Jordan - Amman) • البريد الرسمي المعتمد: one497303@gmail.com'
                      : 'Engineering Supervision: Jordan - Amman (الأردن - عمّان) • Official Email: one497303@gmail.com'}
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'terms' && (
              <div className="space-y-5">
                <section className="space-y-2">
                  <h4
                    className={`font-extrabold text-sm sm:text-base ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {isAr
                      ? '1. طبيعة المنصة وإخلاء المسؤولية العلمي والعيادي'
                      : '1. Platform Nature & Scientific Clinical Disclaimer'}
                  </h4>
                  <p>
                    {isAr
                      ? 'تُدار منصة «مرآة القلوب» بإشراف هندسي في (الأردن - عمّان). جميع المقاييس والاختبارات هي أدوات استكشافية وتثقيفية بحتة وليست تشخيصاً طبياً أو سريرياً، وتتطلب استشارة مختص مرخص عند الحاجة.'
                      : 'Mirror of Hearts is supervised by our engineering team in Amman, Jordan. All scales and assessments are exploratory and educational tools, not medical or clinical diagnoses.'}
                  </p>
                </section>

                <section className="space-y-2">
                  <h4
                    className={`font-extrabold text-sm sm:text-base ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {isAr
                      ? '2. التشفير TLS 1.3 وحق حذف البيانات نهائياً'
                      : '2. TLS 1.3 Security & Right to Permanent Deletion'}
                  </h4>
                  <p>
                    {isAr
                      ? 'تخضع كافة الجلسات لتشفير TLS 1.3، ويكفل الموقع حق المستخدم المطلق في حذف بياناته نهائياً في أي وقت عبر زر الحذف الفوري أو مراسلة one497303@gmail.com.'
                      : 'All sessions are protected by TLS 1.3 encryption, and users retain the unconditional right to permanently delete their data anytime via the instant delete button or by emailing one497303@gmail.com.'}
                  </p>
                </section>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-5">
                <section className="space-y-2">
                  <h4
                    className={`font-extrabold text-sm sm:text-base ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {isAr
                      ? 'عن منصة مرآة القلوب والإشراف الهندسي (الأردن - عمّان)'
                      : 'About Mirror of Hearts & Engineering Supervision (Jordan - Amman)'}
                  </h4>
                  <p>
                    {isAr
                      ? 'منصة علمية وأدبية مستقلة بإشراف هندسي في (الأردن - عمّان)، تدمج المقاييس السيكومترية الموثقة بمراجع APA (غوتمان، بولبي، بيك، كاتل، غاردنر) مع موسوعة الأبحاث والروايات الأدبية، ضمن بيئة مشفرة ببروتوكول TLS 1.3. للتواصل الرسمي: one497303@gmail.com.'
                      : 'An independent scientific and literary platform supervised by engineers in Amman, Jordan, integrating APA-referenced psychometric scales with a research encyclopedia and literary novels under TLS 1.3 encryption. Official contact: one497303@gmail.com.'}
                  </p>
                </section>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div
            className={`p-4 sm:p-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>
                {isAr
                  ? 'الأردن - عمّان • one497303@gmail.com • تشفير TLS 1.3'
                  : 'Jordan - Amman • one497303@gmail.com • TLS 1.3'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                onClose();
              }}
              className="w-full sm:w-auto py-2 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-sm cursor-pointer"
            >
              {isAr ? 'فهمت وموافق' : 'Understood & Agree'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
