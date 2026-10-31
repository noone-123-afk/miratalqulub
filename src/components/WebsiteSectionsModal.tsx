import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  BookOpen,
  HelpCircle,
  Shield,
  Star,
  Users,
  Brain,
  Compass,
  CheckCircle2,
  X,
  ChevronDown,
  MessageSquare,
  Lock,
  Award,
  Send,
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import {
  FeedbackMessage,
  fetchFeedbackMessages,
  submitFeedbackMessage,
} from '../services/feedbackService';

export type WebsiteTabKey = 'about' | 'how-it-works' | 'testimonials' | 'articles' | 'faq' | 'privacy';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: WebsiteTabKey;
  onOpenBlindDate?: () => void;
  onStartQuiz?: () => void;
}

export const WebsiteSectionsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialTab = 'about',
  onOpenBlindDate,
  onStartQuiz,
}) => {
  const [activeTab, setActiveTab] = useState<WebsiteTabKey>(initialTab);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'كيف تحدد المنصة مؤشرات التوافق الأسري والزواجي علمياً؟',
      a: 'تعتمد المنصة على مقياس سيكومتري محكّم يتألف من 25 سؤالاً علمياً موزعة على 6 أطر مرجعية: نموذج البيت العلائقي المتين ومحاولات الإصلاح لجون غوتمان (Gottman, 1999)، ومقياس التعلق للراشدين (Bowlby & Fraley ECR-R)، ونظرية الحب الثلاثية لستيرنبرغ وعقلية النمو، ونظرية الأنساق الأسرية لبوين وهرم القيم لشوارتز، وعلم النفس المالي (Klontz, 2011).',
    },
    {
      q: 'ما هو مختبر التقييم العلمي المزدوج للتوافق بين الشريكين (Dyadic Assessment)؟',
      a: 'يتيح لك الموقع مقارنة إجابات الطرف الأول والطرف الثاني بشكل مباشر عبر نموذج التحليل الثنائي (Kenny Dyadic Data Analysis) لحساب معامل التقارب والانسجام الحقيقي بين الشريكين في 6 مقاييس فرعية وتصدير تقرير PDF علمي مفصل.',
    },
    {
      q: 'هل دردشة المتواجدين (الرادار) تجمعني بأشخاص حقيقيين فقط؟',
      a: 'نعم، يعمل الرادار بنظام WebSockets في الوقت الحقيقي للربط بين المستخدمين الحقيقيين المتصلين فعلياً في نفس اللحظة، ولا يستخدم أي حسابات وهمية أو محاكاة آلية.',
    },
    {
      q: 'هل بياناتي الشخصية وإجاباتي محمية وسرية؟',
      a: 'بكل تأكيد. نحن نطبق سياسة خصوصية صارمة: لا يتم بيع بياناتك لأي جهة خارجية، ويتم تشفير الاتصالات عبر بروتوكول TLS 1.3 مع إمكانية حفظ تقدمك محلياً وقفل نتيجتك برمز PIN سري.',
    },
    {
      q: 'كيف يتم احتساب درجات اختبارات الذكاء والشخصية في الموقع؟',
      a: 'تتكون اختبارات الذكاء من 4 بطاريات قياسية (45 سؤالاً للذكاءات المتعددة الـ 9، و25 مصفوفة بصرية لاختبار رافن IQ، و25 سؤالاً للذكاء العاطفي EQ، و25 سؤالاً للقدرات المعرفية CogAT)، بالإضافة إلى 8 مقاييس شخصية محكّمة (20 إلى 32 سؤالاً لكل مقياس) مع معادلات تصحيح معيارية معلنة.',
    },
    {
      q: 'هل الموقع مجاني بالكامل؟',
      a: 'نعم، المنصة مجانية ومفتوحة لجميع المستخدمين في الوطن العربي والعالم لنشر الوعي النفسي والأسري المبني على أسس علمية موثقة.',
    },
  ];

  // Real user reviews fetched from Firestore /feedback_messages
  const [realReviews, setRealReviews] = useState<FeedbackMessage[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRole, setReviewRole] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  React.useEffect(() => {
    if (isOpen && activeTab === 'testimonials') {
      setLoadingReviews(true);
      fetchFeedbackMessages()
        .then((msgs) => {
          setRealReviews(msgs);
        })
        .catch(() => {})
        .finally(() => setLoadingReviews(false));
    }
  }, [isOpen, activeTab]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;
    soundManager.playTap();
    setIsSubmittingReview(true);
    try {
      await submitFeedbackMessage({
        name: reviewName.trim(),
        email: 'user-review@miratalqulub.com',
        subject: reviewRole.trim() || 'مشارك في اختبارات المنصة',
        message: reviewComment.trim(),
        category: 'partner_experience',
        categoryLabelAr: reviewRole.trim() || 'تجربة مستخدم حقيقية',
        rating: reviewRating,
      });
      const updated = await fetchFeedbackMessages();
      setRealReviews(updated);
      setReviewName('');
      setReviewRole('');
      setReviewComment('');
      setReviewSuccess(true);
      soundManager.playRoundPass();
      setTimeout(() => setReviewSuccess(false), 3500);
    } catch (err) {
      console.error('Review submit error', err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const articles = [
    {
      title: 'أسرار التوافق الفكري قبل الزواج: كيف تكتشف الانسجام الحقيقي؟',
      readTime: '4 دقائق قراءة',
      tag: 'علم النفس الأسري',
      icon: '🧠',
      summary:
        'التوافق الفكري لا يعني التطابق في الآراء، بل القدرة على إدارة الحوار والنضج في تقبل الاختلاف، وبناء أهداف حياتية مشتركة تدعم نمو الطرفين.',
    },
    {
      title: 'لغات الحب الخمس في الثقافة العربية: كيف يعبر كل شريك عن مشاعره؟',
      readTime: '5 دقائق قراءة',
      tag: 'الذكاء العاطفي',
      icon: '💖',
      summary:
        'استكشاف كيفية ترجمة كلمات التشجيع، تقديم الخدمات، قضاء الوقت النوعي، تبادل الهدايا، والاحتواء في البيوت العربية المعاصرة.',
    },
    {
      title: 'العلامات الخضراء والحمراء في فترة التعارف والخطوبة',
      readTime: '6 دقائق قراءة',
      tag: 'دليل العلاقات',
      icon: '🚦',
      summary:
        'مؤشرات الأمان النفسي: الوضوح والصدق، احترام الحدود الأسرية، والقدرة على الاعتذار، في مقابل السيطرة وتذبذب المشاعر.',
    },
    {
      title: 'كيف تختار شريك الحياة وفق التطلعات المستقبلية والطموح؟',
      readTime: '3 دقائق قراءة',
      tag: 'تخطيط المستقبل',
      icon: '🚀',
      summary:
        'أهمية مناقشة إدارة الميزانية، الإقامة، عمل الطرفين، ورعاية الأبناء قبل الإقدام على خطوة الارتباط لضمان استقرار طويل المدى.',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl my-6 bg-gradient-to-b from-[#18112e] via-[#120d24] to-[#0c0916] border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl text-white overflow-hidden max-h-[90vh] flex flex-col"
          dir="rtl"
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
          <div className="text-center mb-5 shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>موقع ومنصة مِـرآة القـلوب التفاعلية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-100 to-violet-200 font-['Alexandria']">
              استكشف المنصة والموقع
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-lg mx-auto">
              بوابتك المتكاملة لفهم خوارزميات التوافق، تجارب المستخدمين، والمقالات النفسية التوعوية.
            </p>
          </div>

          {/* Navigation Bar / Tabs */}
          <div className="flex gap-1.5 p-1.5 rounded-2xl bg-white/5 border border-white/10 mb-5 overflow-x-auto shrink-0 scrollbar-none">
            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab('about');
              }}
              className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>عن المنصة ورؤيتها</span>
            </button>

            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab('how-it-works');
              }}
              className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'how-it-works'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>كيف تعمل الخوارزمية</span>
            </button>

            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab('testimonials');
              }}
              className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'testimonials'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Star className="w-4 h-4 text-amber-400" />
              <span>قصص نجاح ومراجعات</span>
            </button>

            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab('articles');
              }}
              className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'articles'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>مقالات ونظريات التوافق</span>
            </button>

            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab('faq');
              }}
              className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'faq'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>الأسئلة الشائعة (FAQ)</span>
            </button>

            <button
              onClick={() => {
                soundManager.playTap();
                setActiveTab('privacy');
              }}
              className={`py-2 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'privacy'
                  ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>الخصوصية والأمان</span>
            </button>
          </div>

          {/* Tab Content Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto pr-1 pl-2 space-y-4">
            {/* 1. About Us */}
            {activeTab === 'about' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed"
              >
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-purple-500/10 border border-rose-500/20">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-['Alexandria'] flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-400 fill-rose-500/40" />
                    رؤية مرآة القلوب: التعارف القائم على الوعي والتوافق القيمي
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3">
                    انطلقت منصة «مرآة القلوب» استجابةً للحاجة إلى بيئة تعارف راقية وعصرية تجمع بين أصالة القيم وأحدث مقاييس التحليل النفسي والسلوكي المتطورة. نؤمن أن الزواج الناجح والشراكة المستدامة تبنى على تناغم فكري واجتماعي ونفسي عميق.
                  </p>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-rose-400 font-bold block sm:inline ml-1">إشراف وتطوير:</span>
                      <span>الموقع مشرف عليه ومُدار بواسطة مجموعة من المهندسين المتخصصين</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span>الأردن - عمّان</span>
                      <span>•</span>
                      <span className="font-mono text-blue-400">one497303@gmail.com</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center mb-2.5 font-bold">
                      01
                    </div>
                    <h4 className="font-bold text-white mb-1">العمق الفكري والأكاديمي</h4>
                    <p className="text-gray-400 text-xs">
                      قياس أسلوب التفكير، النضج في حل الخلافات، والتقارب الثقافي والمستوى الدراسي.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center mb-2.5 font-bold">
                      02
                    </div>
                    <h4 className="font-bold text-white mb-1">الانسجام المجتمعي والأسري</h4>
                    <p className="text-gray-400 text-xs">
                      احترام العادات والتقاليد والبيئة الثقافية الخاصة بكل بلد عربي وأصل اجتماعي.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <div className="w-8 h-8 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center mb-2.5 font-bold">
                      03
                    </div>
                    <h4 className="font-bold text-white mb-1">طموحات المستقبل والأحلام</h4>
                    <p className="text-gray-400 text-xs">
                      تطابق التطلعات في إدارة المنزل وتربية الأبناء وتحقيق الأهداف المهنية المشتركة.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💬</span>
                    <div>
                      <h4 className="font-bold text-white text-xs sm:text-sm">
                        تجربة التعارف التفاعلي المباشر The Blind Date
                      </h4>
                      <p className="text-gray-400 text-xs">
                        حيث تحجب المظاهر حتى يتأكد التوافق عبر 5 أسئلة متبادلة لكل مرحلة قبل إسقاط الستار!
                      </p>
                    </div>
                  </div>
                  {onOpenBlindDate && (
                    <button
                      onClick={() => {
                        soundManager.playTap();
                        onClose();
                        onOpenBlindDate();
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold text-xs whitespace-nowrap active:scale-95 transition cursor-pointer"
                    >
                      خوض التجربة الآن 💬
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* 2. How it works */}
            {activeTab === 'how-it-works' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 text-xs sm:text-sm"
              >
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                  <h3 className="font-bold text-white text-base mb-1.5 font-['Alexandria']">
                    الركائز الأربع لخوارزمية التحليل ودراسة التوافق
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-xs">
                    يقوم محرك التحليل السلوكي بربط كل إجابة يقدمها المستخدم بمؤشرات توافق دقيقة تم تطويرها وفق دراسات علم الاجتماع الحديث:
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs sm:text-sm">المعيار الفكري والإدراكي (Intellectual Synergy)</h4>
                      <p className="text-gray-400 text-xs mt-0.5">
                        تحليل نمط التفكير المنطقي والعاطفي، وطريقة إدارة النقاشات وحل سوء الفهم باحترام متبادل.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-300 flex items-center justify-center shrink-0 font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs sm:text-sm">المعيار المجتمعي والعائلي (Sociological Harmony)</h4>
                      <p className="text-gray-400 text-xs mt-0.5">
                        دراسة التناغم بين الأصول الثقافية والبيئة الأسرية، وأسلوب التواصل مع الأهل والأقارب واستقلال بيت الزوجية.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs sm:text-sm">المعيار النفسي والأمان العاطفي (Emotional Security)</h4>
                      <p className="text-gray-400 text-xs mt-0.5">
                        تقييم نمط التعلق (آمن، قلق، متجنب) والقدرة على منح الطرف الآخر الاحتواء والسكينة في الأوقات الصعبة.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs sm:text-sm">المعيار المستقبلي والطموحات (Aspirational Alignment)</h4>
                      <p className="text-gray-400 text-xs mt-0.5">
                        التطابق في الرؤية المالية، نمط المعيشة، وتطلعات السفر والاستقرار وإنجاب الأطفال.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. Testimonials (Strictly Real User Reviews from Database) */}
            {activeTab === 'testimonials' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="font-bold text-white">آراء وتجارب الزوار الحقيقية</span>
                  </div>
                  <span className="text-gray-300">تُعرض فقط التعليقات الحقيقية المرسلة من المستخدمين ({realReviews.length})</span>
                </div>

                {/* Add Real Review Form */}
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-rose-400" />
                      <span>شارك تجربتك الحقيقية مع المنصة:</span>
                    </h4>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setReviewRating(st)}
                          className="p-0.5 cursor-pointer"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              st <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-gray-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="اسمك الكريم والمدينة..."
                      required
                      className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-400"
                    />
                    <input
                      type="text"
                      value={reviewRole}
                      onChange={(e) => setReviewRole(e.target.value)}
                      placeholder="المهنة أو الاختبار الذي خضته (اختياري)..."
                      className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-400"
                    />
                  </div>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={2}
                    placeholder="اكتب رأيك الصادق وتجربتك الفعلية في اختبارات التوافق أو المقاييس النفسية..."
                    required
                    className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-400 resize-none"
                  />
                  <div className="flex items-center justify-between">
                    {reviewSuccess ? (
                      <span className="text-emerald-400 text-xs font-bold">
                        ✓ تم حفظ ونشر مشاركتك الحقيقية في قاعدة البيانات بنجاح!
                      </span>
                    ) : (
                      <span className="text-[11px] text-gray-400">
                        تُحفظ المراجعات مباشرة في قاعدة بيانات الموقع بشفافية تامة.
                      </span>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmittingReview || !reviewName.trim() || !reviewComment.trim()}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmittingReview ? 'جاري النشر...' : 'نشر تجربتي'}</span>
                    </button>
                  </div>
                </form>

                {loadingReviews ? (
                  <div className="text-center py-8 text-xs text-gray-400">
                    جاري استرجاع تجارب الزوار الحقيقية من قاعدة البيانات...
                  </div>
                ) : realReviews.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-2">
                    <p className="text-xs sm:text-sm font-bold text-white">
                      لا توجد تعليقات أو مراجعات منشورة حتى الآن
                    </p>
                    <p className="text-xs text-gray-400">
                      التزاماً بمصداقية المنصة، لا نعرض أي تعليقات افتراضية أو غير حقيقية. كن أول من يشارك تجربته الحقيقية أعلاه!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {realReviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300 font-bold text-xs">
                              {rev.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-bold text-white text-xs sm:text-sm">{rev.name}</h4>
                              <span className="text-[11px] text-gray-400">
                                {rev.categoryLabelAr || rev.subject}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-amber-400 text-xs">
                            {[...Array(rev.rating || 5)].map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-300 text-xs leading-relaxed">"{rev.message}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* 4. Articles */}
            {activeTab === 'articles' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                {articles.map((art, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-rose-500/30 hover:bg-white/[0.05] transition cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{art.icon}</span>
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                        {art.tag}
                      </span>
                      <span className="text-gray-500 text-[10px] mr-auto">{art.readTime}</span>
                    </div>
                    <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-rose-200 transition mb-1 font-['Alexandria']">
                      {art.title}
                    </h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{art.summary}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* 5. FAQ */}
            {activeTab === 'faq' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2.5"
              >
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden transition"
                    >
                      <button
                        onClick={() => {
                          soundManager.playTap();
                          setOpenFaqIndex(isOpen ? null : idx);
                        }}
                        className="w-full p-3.5 text-right flex items-center justify-between text-xs sm:text-sm font-bold text-gray-200 hover:text-white transition cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          <span>{faq.q}</span>
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-rose-400' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-3.5 pt-1 text-xs text-gray-300 leading-relaxed border-t border-white/5 bg-black/20"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* 6. Privacy & Trust */}
            {activeTab === 'privacy' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed"
              >
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <h3 className="font-bold text-emerald-300 text-sm sm:text-base mb-1.5 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    ميثاق الأمان وحماية الخصوصية الرقمية
                  </h3>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    نحن نعتبر خصوصية مشاعرك وإجاباتك أمانة قصوى. تطبق منصة مرآة القلوب معايير الأمان السحابية الرائدة عالمياً لضمان عدم تسريب أي معلومة.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs font-semibold leading-relaxed">
                    «أي معلومات يتم مشاركتها مع الموقع هي واضحة وضمن موافقتك الشخصية، ولا يتم استخدامها، أو المساس بها، أو الإساءة لها، أو بيعها لأي جهات أخرى، وكل شيء يخضع لشروط وسياسة قوقل».
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>تشفير كامل TLS 1.3 لجميع الاتصالات بين متصفحك وخوادم Google Cloud.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>لا يتم بيع البيانات لأي شبكات إعلانية أو جهات خارجية على الإطلاق.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>تخلي المنصة مسؤوليتها عن أي نتائج يقرر المستخدم مشاركتها علناً بإرادته.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>التواصل الرسمي مع إدارة الموقع: one497303@gmail.com (الأردن - عمّان).</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Modal Bottom Actions */}
          <div className="mt-5 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <span className="text-[11px] text-gray-400">
              © 2026 مِـرآة القـلوب • الأردن - عمّان • جميع الحقوق محفوظة.
            </span>
            <div className="flex items-center gap-2">
              {onStartQuiz && (
                <button
                  onClick={() => {
                    soundManager.playTap();
                    onClose();
                    onStartQuiz();
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs font-bold transition active:scale-95 cursor-pointer"
                >
                  بدء اختبار شريك الحياة 🔮
                </button>
              )}
              <button
                onClick={() => {
                  soundManager.playTap();
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition active:scale-95 cursor-pointer"
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
