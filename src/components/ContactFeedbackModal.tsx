import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Send,
  X,
  Star,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Building,
  User,
  ExternalLink,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useAuth } from '../context/AuthContext';
import { submitFeedbackMessage, OFFICIAL_EMAIL } from '../services/feedbackService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: 'general' | 'test_question' | 'feature_request' | 'technical' | 'partner_experience';
}

export const ContactFeedbackModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialCategory = 'general',
}) => {
  const { user } = useAuth();

  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<'general' | 'test_question' | 'feature_request' | 'technical' | 'partner_experience'>(initialCategory);
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = [
    { key: 'general', label: 'ملاحظة عامة', icon: '💬' },
    { key: 'test_question', label: 'استفسار عن الاختبارات والنتائج', icon: '🧠' },
    { key: 'feature_request', label: 'اقتراح ميزة أو تطوير', icon: '💡' },
    { key: 'technical', label: 'إبلاغ عن خطأ تقني', icon: '🛠️' },
    { key: 'partner_experience', label: 'تجربة التوافق وشريك الحياة', icon: '💖' },
  ] as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const activeCat = categories.find((c) => c.key === category);
    try {
      const res = await submitFeedbackMessage({
        name,
        email,
        subject: subject.trim() || activeCat?.label || 'ملاحظة زائر',
        message,
        category,
        categoryLabelAr: activeCat?.label || 'ملاحظة عامة',
        rating,
        user,
      });

      soundManager.playRoundPass();
      setMailtoUrl(res.mailtoUrl);
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubject('');
    setMessage('');
    setErrorMessage(null);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto"
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0f172a] border border-slate-700 shadow-2xl text-white overflow-hidden shadow-black/80"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-900/60 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-white font-['Alexandria']">
                  تواصل معنا وإبداء الملاحظات
                </h3>
                <p className="text-xs text-slate-300">
                  فريق المهندسين المتخصصين يستقبل رسائلكم مباشرة عبر: <span className="font-mono text-blue-400 font-bold">{OFFICIAL_EMAIL}</span>
                </p>
              </div>
            </div>

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

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs sm:text-sm text-slate-200 custom-scrollbar">
            {submitted ? (
              /* Success State */
              <div className="p-6 sm:p-8 rounded-3xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg sm:text-xl font-black text-white font-['Alexandria']">
                  تم استلام رسالتك وحفظها بنجاح!
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
                  تم تسجيل ملاحظتك في قاعدة بيانات المنصة المشفرة وتوجيه إشعار رسمي إلى الفريق الهندسي المسؤول عبر البريد:
                  <strong className="block text-emerald-300 font-mono mt-1">{OFFICIAL_EMAIL}</strong>
                  سنقوم بمراجعة ملاحظاتك والرد على بريدك الإلكتروني في أقرب وقت.
                </p>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={mailtoUrl}
                    className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-blue-900/30"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>إرسال نسخة مباشرة عبر تطبيق الإيميل / Gmail</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              </div>
            ) : (
              /* Input Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Official Info Banner */}
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>الموقع مشرف عليه ومُدار بواسطة مجموعة من المهندسين المتخصصين</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <span className="text-emerald-400 font-semibold">الأردن - عمّان</span>
                    <span>•</span>
                    <span className="font-mono text-blue-400 select-all">{OFFICIAL_EMAIL}</span>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Sender Identity Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      الاسم الكامل أو المستعار: <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="مثال: أحمد خالد"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      بريدك الإلكتروني (للرد والمتابعة): <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    تصنيف الرسالة أو الاستفسار:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.map((c) => (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => {
                          soundManager.playTap();
                          setCategory(c.key);
                        }}
                        className={`p-2.5 rounded-xl text-xs font-bold border text-right transition flex items-center gap-2 cursor-pointer ${
                          category === c.key
                            ? 'bg-blue-600/30 border-blue-500 text-white shadow-sm'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="text-base">{c.icon}</span>
                        <span className="truncate">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    عنوان الموضوع:
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="اكتب عنواناً مختصراً لرسالتك..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    تقييمك لتجربة المنصة والأدوات السيكومترية:
                  </label>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          soundManager.playTap();
                          setRating(star);
                        }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 transition-transform hover:scale-110 cursor-pointer"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            (hoverRating !== null ? star <= hoverRating : star <= rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-amber-300 font-bold mr-2">
                      {rating === 5
                        ? 'ممتاز جداً 🌟'
                        : rating === 4
                        ? 'جيد جداً 👍'
                        : rating === 3
                        ? 'مقبول ✨'
                        : 'يحتاج لتحسين 🔧'}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    تفاصيل الرسالة أو الملاحظة: <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب ملاحظاتك، استفساراتك، أو تفاصيل المشكلة التي واجهتك بكل أريحية..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                  />
                </div>

                {/* Disclaimer note */}
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  🔒 «أي معلومات يتم مشاركتها مع الموقع هي واضحة وضمن موافقتك الشخصية، ولا يتم استخدامها، أو المساس بها، أو الإساءة لها، أو بيعها لأي جهات أخرى، وكل شيء يخضع لشروط وسياسة قوقل».
                </p>

                {/* Submit Action */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      onClose();
                    }}
                    className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
                  >
                    إلغاء
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-900/30 transition cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'جاري الإرسال...' : 'إرسال الملاحظة الآن ✉️'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
