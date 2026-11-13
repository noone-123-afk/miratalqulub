import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  MessageSquare,
  HelpCircle,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Globe,
  Sparkles,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { soundManager } from '../utils/sound';
import { submitFeedbackMessage, OFFICIAL_EMAIL } from '../services/feedbackService';
import { PageSEO } from '../components/PageSEO';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { OFFICIAL_LOGO_URL } from '../utils/logoAsset';

interface Props {
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
}

export const ContactUsPage: React.FC<Props> = ({
  onBackToHome,
  onNavigatePage,
}) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const { user } = useAuth();
  const isAr = language === 'ar';

  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'general' | 'test_question' | 'feature_request' | 'technical' | 'privacy'>('general');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const categories = isAr
    ? [
        { key: 'general', label: 'استفسار عام', icon: '💬' },
        { key: 'test_question', label: 'استفسار عن الاختبارات والنتائج', icon: '🧠' },
        { key: 'feature_request', label: 'اقتراح ميزة أو تطوير برمجي', icon: '💡' },
        { key: 'technical', label: 'الإبلاغ عن خطأ تقني', icon: '🛠️' },
        { key: 'privacy', label: 'طلب حذف أو تصحيح بيانات (GDPR)', icon: '🔒' },
      ]
    : [
        { key: 'general', label: 'General Inquiry', icon: '💬' },
        { key: 'test_question', label: 'Questions on Tests & Scoring', icon: '🧠' },
        { key: 'feature_request', label: 'Feature Suggestion', icon: '💡' },
        { key: 'technical', label: 'Report a Technical Bug', icon: '🛠️' },
        { key: 'privacy', label: 'Data Deletion / GDPR Request', icon: '🔒' },
      ];

  const contactFaqs = isAr
    ? [
        {
          q: 'ما هو الوقت المتوقع للرد على استفساري؟',
          a: 'يقوم فريقنا الهندسي بمراجعة الرسائل الواردة بشكل يومي، ويتم الرد على معظم الاستفسارات خلال 24 إلى 48 ساعة عمل كحد أقصى.',
        },
        {
          q: 'كيف يمكنني التقدم بطلب محو أو حذف حسابي وبياناتي نهائياً؟',
          a: 'يمكنك إرسال طلب المحو مباشرة من هذا النموذج باختيار فئة "طلب حذف أو تصحيح بيانات (GDPR)" مع ذكر بريدك الإلكتروني المسجل، وسيتم محو سجلك بالكامل فوراً.',
        },
        {
          q: 'هل تقدمون استشارات خاصة أو جلسات توفيق شخصية؟',
          a: 'كلا. نؤكد أن الموقع يقدم أدوات ومقاييس معرفية ورقمية ذاتية فقط، ولا نقدم استشارات عيادية أو خدمات وساطة زواج خاصة.',
        },
        {
          q: 'أواجه مشكلة في حفظ أو تصدير ملف الـ PDF، ماذا أفعل؟',
          a: 'يرجى التأكد من استخدام متصفح حديث (مثل Google Chrome أو Safari أو Edge) وعدم تفعيل حظر النوافذ أو الملفات المنزلة. إذا استمرت المشكلة، يرجى تزويدنا بتفاصيل جهازك عبر هذا النموذج.',
        },
      ]
    : [
        {
          q: 'What is the expected response turnaround time?',
          a: 'Our engineering and support team reviews messages daily, replying to the vast majority of inquiries within 24 to 48 business hours.',
        },
        {
          q: 'How can I submit a formal GDPR data erasure request?',
          a: 'Select the “Data Deletion / GDPR Request” category in the form below with your registered email, and our team will permanently purge your records immediately.',
        },
        {
          q: 'Do you offer private consultations or personalized matchmaking?',
          a: 'No. The platform strictly provides self-guided digital psychometric diagnostics and does not offer clinical consultations or private matchmaking services.',
        },
        {
          q: 'I am experiencing an issue exporting my PDF report, what should I do?',
          a: 'Ensure you are utilizing a modern web browser (Google Chrome, Safari, Edge) without popup download blockers. If issues persist, detail your device and browser in the form.',
        },
      ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMessage(isAr ? 'يرجى ملء كافة الحقول المطلوبة' : 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    soundManager.playTap();

    const selectedCategoryObj = categories.find((c) => c.key === category);

    try {
      await submitFeedbackMessage({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim() || (selectedCategoryObj?.label ?? 'رسالة تواصل'),
        message: message.trim(),
        category: category as any,
        categoryLabelAr: selectedCategoryObj?.label || 'استفسار',
        rating: 5,
        user,
      });

      setSubmitted(true);
      soundManager.playRoundPass();
    } catch (err: any) {
      console.warn('Direct submit fallback to mailto:', err);
      // Fallback mailto
      const mailto = `mailto:one497303@gmail.com?subject=${encodeURIComponent(
        `[مرآة القلوب - ${selectedCategoryObj?.label}] ${subject || name}`
      )}&body=${encodeURIComponent(
        `الاسم: ${name}\nالبريد: ${email}\nالفئة: ${selectedCategoryObj?.label}\n\nالرسالة:\n${message}`
      )}`;
      window.location.href = mailto;
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: isAr ? 'اتصل بنا | مرآة القلوب' : 'Contact Us | Mirror of Hearts',
    description: isAr
      ? 'تواصل مع فريق تطوير وإدارة منصة مرآة القلوب في عمّان - الأردن للاستفسارات والاقتراحات والدعم الفني.'
      : 'Get in touch with the Mirror of Hearts engineering team in Amman, Jordan for inquiries, suggestions, and technical support.',
    url: 'https://miratalqulub.com/#/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'مرآة القلوب - Mirror of Hearts',
      email: 'one497303@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Amman',
        addressCountry: 'JO',
      },
    },
  };

  return (
    <div className="w-full min-h-screen text-slate-100 py-6 sm:py-10 px-3 sm:px-6">
      <PageSEO
        title={
          isAr
            ? 'اتصل بنا | مرآة القلوب - تواصل مع فريق التطوير والدعم الفني'
            : 'Contact Us | Mirror of Hearts - Get in Touch with Engineering'
        }
        description={
          isAr
            ? 'تواصل مع إدارة منصة مرآة القلوب عبر البريد الإلكتروني الرسمي one497303@gmail.com أو نموذج الاتصال المباشر. مقرنا: عمّان - الأردن.'
            : 'Contact the Mirror of Hearts development team via official email one497303@gmail.com or our direct contact form. Located in Amman, Jordan.'
        }
        canonicalPath="/#/contact"
        language={language}
        pageType="contact"
        structuredData={structuredData}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumb and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={onBackToHome}
              className="hover:text-rose-400 transition cursor-pointer flex items-center gap-1 font-semibold"
            >
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            </button>
            <span>/</span>
            <span className="text-white font-bold">{isAr ? 'اتصل بنا' : 'Contact Us'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-sky-300 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isAr ? 'English' : 'العربية'}</span>
            </button>

            <button
              onClick={onBackToHome}
              className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-xs font-bold text-rose-300 transition flex items-center gap-1 cursor-pointer"
            >
              {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isAr ? 'العودة للرئيسية' : 'Back to Home'}</span>
            </button>
          </div>
        </div>

        {/* Header Title Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-950/40 via-slate-900/80 to-blue-950/40 border border-sky-500/30 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={OFFICIAL_LOGO_URL}
              alt="شعار مرآة القلوب الرسمي"
              className="w-12 h-12 rounded-2xl object-cover border border-sky-500/40 shadow-lg shrink-0"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[11px] font-bold">
                <Sparkles className="w-3 h-3" />
                <span>{isAr ? 'قنوات الاتصال المباشرة والدعم الفني' : 'Direct Support & Inquiries'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Alexandria'] mt-1">
                {isAr ? 'اتصل بنا — مرآة القلوب' : 'Contact Us — Mirror of Hearts'}
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            {isAr
              ? 'يسعدنا دائماً الاستماع إلى آرائكم، مقترحاتكم، استفساراتكم السيكومترية أو طلبات الدعم التقني والامتثال لخصوصية البيانات.'
              : 'We welcome your feedback, psychometric inquiries, technical reports, and data privacy requests.'}
          </p>
        </div>

        {/* AdSense In-Page Banner */}
        <AdSenseBanner slot="3456789012" format="auto" />

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Mail className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-white">{isAr ? 'البريد الإلكتروني الرسمي' : 'Official Email'}</h3>
            <p className="text-xs text-slate-400">{isAr ? 'للتواصل المباشر والرد السريع:' : 'Direct inquiries and response:'}</p>
            <a
              href="mailto:one497303@gmail.com"
              className="text-xs font-mono font-bold text-sky-400 hover:text-sky-300 underline block"
            >
              one497303@gmail.com
            </a>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <MapPin className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-white">{isAr ? 'المقر والدولة' : 'Location & Headquarters'}</h3>
            <p className="text-xs text-slate-400">{isAr ? 'فريق التطوير المستقل:' : 'Independent Engineering Team:'}</p>
            <span className="text-xs font-semibold text-emerald-300 block">
              {isAr ? 'عمّان، المملكة الأردنية الهاشمية' : 'Amman, Hashemite Kingdom of Jordan'}
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-white">{isAr ? 'زمن الاستجابة' : 'Response Turnaround'}</h3>
            <p className="text-xs text-slate-400">{isAr ? 'متابعة دورية على مدار الأسبوع:' : 'Monitored daily:'}</p>
            <span className="text-xs font-semibold text-amber-300 block">
              {isAr ? 'خلال 24 إلى 48 ساعة كحد أقصى' : 'Within 24 to 48 business hours'}
            </span>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-['Alexandria']">
                {isAr ? 'أرسل لنا رسالة مباشرة' : 'Send Us a Direct Message'}
              </h2>
              <p className="text-xs text-slate-400">
                {isAr ? 'سيتم تسليم رسالتك سحابياً إلى الفريق الهندسي والرد على بريدك' : 'Your message will be securely transmitted to our engineering team'}
              </p>
            </div>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-3"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white font-['Alexandria']">
                {isAr ? 'تم استلام رسالتك بنجاح!' : 'Message Received Successfully!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                {isAr
                  ? 'شكراً لتواصلك معنا. قام نظامنا بتسجيل رسالتك وتوجيهها إلى فريق العمل، وسنقوم بالرد على بريدك الإلكتروني في أقرب وقت.'
                  : 'Thank you for reaching out. Your message has been logged and forwarded to our team. We will reply to your email promptly.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                  setSubject('');
                }}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition cursor-pointer mt-2"
              >
                {isAr ? 'إرسال رسالة أخرى' : 'Send Another Message'}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Category Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  {isAr ? 'نوع وموضوع الاستفسار:' : 'Inquiry Category:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setCategory(cat.key as any)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition flex flex-col items-center justify-center gap-1 cursor-pointer text-center ${
                        category === cat.key
                          ? 'bg-sky-600/30 border-sky-400 text-white shadow-sm'
                          : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span className="text-[11px] leading-tight">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isAr ? 'الاسم الكامل أو اللقب *' : 'Your Full Name or Pseudonym *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? 'مثال: سارة أو عمر' : 'e.g. Sarah or Alex'}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isAr ? 'البريد الإلكتروني للرد *' : 'Your Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500 transition font-mono"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {isAr ? 'عنوان الرسالة (اختياري)' : 'Message Subject (Optional)'}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={isAr ? 'اكتب عنواناً مختصراً لرسالتك' : 'Brief subject summary'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500 transition"
                />
              </div>

              {/* Message Body */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {isAr ? 'تفاصيل الرسالة أو الاستفسار *' : 'Message Details *'}
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    isAr
                      ? 'يرجى كتابة استفسارك أو ملاحظتك بالتفصيل لمساعدتنا في تقديم أفضل رد ممكن...'
                      : 'Please describe your inquiry, feedback, or report in detail...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500 transition leading-relaxed resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/25 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{loading ? (isAr ? 'جاري الإرسال...' : 'Sending...') : (isAr ? 'إرسال الرسالة الآن' : 'Send Message Now')}</span>
              </button>
            </form>
          )}
        </div>

        {/* Section: Frequently Asked Support Questions */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? 'أسئلة شائعة حول التواصل والدعم' : 'Frequently Asked Support Questions'}
            </h2>
          </div>

          <div className="space-y-2.5">
            {contactFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/5 bg-slate-950/60 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-3.5 text-right sm:text-start flex items-center justify-between gap-3 text-xs font-bold text-white hover:text-sky-400 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-sky-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-3.5 pt-0 text-xs text-slate-300 border-t border-white/5 leading-relaxed bg-white/[0.01]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Navigation Back Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/50 border border-white/5">
          <button
            onClick={() => onNavigatePage('about')}
            className="text-xs text-purple-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>{isAr ? 'انتقل إلى: من نحن (About Us)' : 'View: About Us'}</span>
          </button>
          <button
            onClick={() => onNavigatePage('privacy')}
            className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>{isAr ? 'سياسة الخصوصية (Privacy Policy)' : 'Privacy Policy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
