import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Globe,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Mail,
  FileText,
  Brain,
  Scale,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { soundManager } from '../utils/sound';
import { PageSEO } from '../components/PageSEO';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { OFFICIAL_LOGO_URL } from '../utils/logoAsset';

interface Props {
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
  onStartQuiz?: () => void;
  onOpenPsychologyTests?: () => void;
}

export const FAQPage: React.FC<Props> = ({
  onBackToHome,
  onNavigatePage,
  onStartQuiz,
  onOpenPsychologyTests,
}) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const isAr = language === 'ar';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    soundManager.playTap();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqItems = isAr
    ? [
        {
          q: 'ما هو موقع مرآة القلوب وما هدفه الأساسي؟',
          a: 'مرآة القلوب هي منصة رقمية عربية مستقلة تقدم استبيانات سيكومترية وأدوات معرفية لمساعدة الأفراد على فهم ذواتهم، واستكشاف أنماط شخصياتهم، وتعميق الوعي بأساليب التوافق الفكري والاجتماعي والعاطفي. الهدف هو نشر الثقافة النفسية الواعية دون أي ابتذال أو غايات تجارية.',
        },
        {
          q: 'كيف يعمل النظام والخوارزميات المستخدمة؟',
          a: 'يعتمد النظام على استبيانات محددة الأوزان مستندة إلى نماذج علم النفس المعتمدة. تُعالج إجابات المستخدم عبر معادلات إحصائية معيارية لحساب درجات التقارب في أبعاد محددة (الفكر، العواطف، نمط المعيشة، والقيم الأسرية). تُستخدم نماذج الذكاء الاصطناعي المسؤولة (مثل Google Gemini) حصراً للمساعدة في صياغة القراءة السردية للنقاط دون تغيير الدرجات الحسابية.',
        },
        {
          q: 'هل النتائج دقيقة بنسبة 100% وهل يمكن الاعتماد عليها كلياً؟',
          a: 'كلا، لا توجد أي أداة رقمية أو خوارزمية في العالم قادرة على تقديم دقة مطلقة أو التنبؤ الدقيق بالسلوك البشري. النتائج هي قراءة استرشادية واستكشافية تعتمد كلياً على ما يصرح به المستخدم من إجابات ودرجة صدقه مع نفسه. العلاقات الإنسانية معقدة وديناميكية ولا يمكن اختزالها في معادلة نهائية.',
        },
        {
          q: 'هل يتم بيع أو مشاركة بيانات المستخدمين مع أي طرف ثالث؟',
          a: 'قطعاً لا. نحن نلتزم بمبدأ عدم استغلال البيانات نهائياً. جميع البيانات التي قد يدخلها المستخدم (كالاسم المستعار، العمر، ونتائج الاختبارات) تحفظ حصراً لتمكينه من العودة إلى سجله الشخصي ومتابعة تقدمه، ولا يتم بيعها، أو تأجيرها، أو مشاركتها مع أي شركة أو جهة إعلانية.',
        },
        {
          q: 'هل الموقع تابع لجهة حكومية أو شركة تجارية أو منظمة كبرى؟',
          a: 'لا. الموقع مبادرة برمجية مستقلة طورها ويشرف عليها مجموعة من المهندسين ومطوري البرمجيات المستقلين في عمّان - المملكة الأردنية الهاشمية. الموقع لا يتبع لأي حزب، أو مؤسسة رسمية، أو جهة تجارية كبرى، ولا يهدف إلى جمع الأموال أو الترويج لأي أجندة.',
        },
        {
          q: 'كيف يمكنني حذف حسابي وجميع بياناتي بشكل نهائي؟',
          a: 'يمكنك ممارسة حقك الكامل في المحو والنسيان في أي لحظة. بمجرد الدخول إلى إعدادات لوحة التحكم، يمكنك النقر على خيار حذف الحساب، أو مراسلتنا مباشرة على one497303@gmail.com وسيتم مسح كافة سجلاتك من قاعدة البيانات السحابية فوراً دون استرجاع.',
        },
        {
          q: 'هل يقدم الموقع استشارات نفسية أو طبية أو أسرية مرخصة؟',
          a: 'كلا. الموقع يقدم محتوى تثقيفياً واستبيانات تقييم ذاتي عامة فقط. محتويات المنصة لا تشكل تشخيصاً عيادياً ولا استشارة نفسية أو طبية أو أسرية أو قانونية مرخصة. في حال كنت تواجه صعوبات نفسية أو علائقية حادة، ننصحك دائماً بمراجعة أخصائي نفسي أو مرشد أسري معتمد.',
        },
        {
          q: 'هل يضمن الموقع نجاح العلاقات أو التوفيق للزواج؟',
          a: 'كلا على الإطلاق. الموقع لا يقدم أي ضمانات ولا خدمات زواج أو خطبة فعلية. نجاح أي ارتباط بشري يتطلب نضجاً شخصياً، وحواراً مستمراً، وتوافقاً واقعياً في الظروف الحياتية، وهو ما يتجاوز تماماً إطار أي استبيان رقمي.',
        },
        {
          q: 'ما هو مصدر المعلومات والمقاييس النفسية المستخدمة في الموقع؟',
          a: 'تستند المقاييس إلى مراجع علم النفس الأكاديمي المنشورة، ومنها: مقياس التعلق للراشدين (ECR-R لبولبي وفرالي)، ونظرية جون غوتمان للبيت العلائقي المتين، ونظرية ستيرنبرغ لمكونات الحب، ومقياس السمات الـ16 لريموند كاتل (16PF)، ونموذج العوامل الخمسة الكبرى (Big Five)، وبطاريات الذكاء المتعدد لهوارد جاردنر.',
        },
      ]
    : [
        {
          q: 'What is Mirror of Hearts and what is its primary objective?',
          a: 'Mirror of Hearts is an independent digital platform offering psychometric self-assessments and educational resources to help individuals explore self-awareness, personal archetypes, and interpersonal compatibility across intellectual, emotional, and social dimensions. Our goal is to promote mindful psychological literacy without commercial exploitation.',
        },
        {
          q: 'How does the system and scoring algorithm operate?',
          a: 'The system utilizes validated Likert-scale inventories weighted according to established psychological literature. User responses are processed through deterministic statistical rubrics to compute harmony indices. Responsible AI models (such as Google Gemini) are employed solely to help formulate narrative summaries without altering numerical scores.',
        },
        {
          q: 'Are the results 100% accurate, and can they be definitively relied upon?',
          a: 'No. No algorithm or software in the world can claim absolute precision or predict human behavioral nuance with certainty. The results serve as an exploratory, educational mirror reflecting the self-reported answers provided by the user. Human relationships are dynamic and cannot be reduced to an absolute algebraic conclusion.',
        },
        {
          q: 'Is user data sold, leased, or shared with third parties?',
          a: 'Absolutely not. We adhere strictly to zero-commercialization ethics. Any profile details, email addresses, or test responses are stored exclusively to allow users to retrieve their own records and track longitudinal growth. We never sell, trade, or monetize personal information.',
        },
        {
          q: 'Is the platform affiliated with any government, corporation, or institution?',
          a: 'No. The platform is an independent software initiative built and maintained by independent developers and engineers based in Amman, Jordan. It possesses no affiliation with any governmental body, political party, or major corporate enterprise.',
        },
        {
          q: 'How can I permanently delete my account and all associated data?',
          a: 'You retain full rights under GDPR principles to erase your records anytime. You can trigger permanent deletion directly from your account settings, or send an email to one497303@gmail.com, and our team will immediately purge all your entries from our cloud databases.',
        },
        {
          q: 'Does the website provide clinical therapy, medical, or legal counseling?',
          a: 'No. The website provides educational self-reflection resources only. It does not constitute clinical psychological diagnosis, medical treatment, or licensed marriage counseling. Individuals experiencing clinical distress should seek licensed professional guidance.',
        },
        {
          q: 'Does the platform guarantee relationship longevity or marriage success?',
          a: 'Not at all. The platform makes zero guarantees and offers no real-world matchmaking, dating agency, or marriage brokerage services. Interpersonal success depends on mutual emotional maturity, ongoing communication, and real-life commitment.',
        },
        {
          q: 'What is the academic source of the psychometric frameworks utilized?',
          a: 'Our tools draw upon peer-reviewed academic literature: Adult Attachment Theory (Bowlby & Fraley ECR-R), John Gottman’s Sound Relationship House, Robert Sternberg’s Triangular Theory of Love, Raymond Cattell’s 16 Personality Factors (16PF), the Big Five Traits (OCEAN), and Howard Gardner’s Multiple Intelligences.',
        },
      ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div className="w-full min-h-screen text-slate-100 py-6 sm:py-10 px-3 sm:px-6">
      <PageSEO
        title={
          isAr
            ? 'الأسئلة الشائعة | مرآة القلوب - إجابات شفافة وموثوقة'
            : 'FAQ | Mirror of Hearts - Transparent & Honest Answers'
        }
        description={
          isAr
            ? 'إجابات واضحة وصادقة حول منصة مرآة القلوب: دقة النتائج، حماية الخصوصية، استقلالية الموقع، عدم تقديم استشارات طبية، ومصادر المقاييس النفسية.'
            : 'Clear, transparent answers about Mirror of Hearts: scoring accuracy, privacy guarantees, non-clinical nature, and academic sources.'
        }
        canonicalPath="/#/faq"
        language={language}
        pageType="website"
        structuredData={structuredData}
      />

      <div className="max-w-4xl mx-auto space-y-8">
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
            <span className="text-white font-bold">{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</span>
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

        {/* Hero Title */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-purple-950/40 border border-blue-500/30 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={OFFICIAL_LOGO_URL}
              alt="شعار مرآة القلوب الرسمي"
              className="w-12 h-12 rounded-2xl object-cover border border-blue-500/40 shadow-lg shrink-0"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold">
                <Sparkles className="w-3 h-3" />
                <span>{isAr ? 'إجابات واقعية غير تسويقية' : 'Honest & Objective Answers'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Alexandria'] mt-1">
                {isAr ? 'الأسئلة الشائعة (FAQ)' : 'Frequently Asked Questions'}
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            {isAr
              ? 'حرصاً على الشفافية التامة والموثوقية العلمية، نضع بين يديك إجابات واضحة ومباشرة عن كل ما يخص المنصة وآلية عملها وحدودها وخصوصيتك.'
              : 'In commitment to scientific rigor and complete transparency, we provide candid, non-promotional answers regarding our methodology, data privacy, and ethical boundaries.'}
          </p>
        </div>

        {/* AdSense In-Page Banner */}
        <AdSenseBanner slot="5678901234" format="auto" />

        {/* Accordion Questions */}
        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className={`rounded-2xl border transition overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-blue-500/40 shadow-lg'
                    : 'bg-slate-950/60 border-white/5 hover:border-white/15'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-4 sm:p-5 text-right sm:text-start flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-white hover:text-blue-300 transition cursor-pointer"
                >
                  <span className="leading-snug">{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-blue-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-300 border-t border-white/5 leading-relaxed bg-white/[0.01]">
                    <p>{item.a}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Reassurance Disclaimers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-1.5 text-xs">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>{isAr ? 'طبيعة النتائج الاسترشادية' : 'Informational Nature'}</span>
            </span>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {isAr
                ? 'النتائج هي أدوات مساعدة للتأمل الذاتي ولا تغني عن الاستشارة المتخصصة ولا تضمن أي نتائج زوجية.'
                : 'All outputs serve as exploratory reflection guides and do not substitute for clinical or legal counsel.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-1.5 text-xs">
            <span className="font-bold text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'أمان وسرية تامة' : 'Zero Data Selling'}</span>
            </span>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {isAr
                ? 'لا يتم بيع أو مقايضة بياناتك الشخصية مع أي طرف ثالث تحت أي ظرف من الظروف.'
                : 'Your data is strictly protected on encrypted servers with zero monetization or third-party sharing.'}
            </p>
          </div>
        </div>

        {/* Footer Navigation Back Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/50 border border-white/5">
          <button
            onClick={() => onNavigatePage('methodology')}
            className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>{isAr ? 'انتقل إلى: المصادر والمنهجية العلمية' : 'View: Sources & Methodology'}</span>
          </button>
          <button
            onClick={() => onNavigatePage('disclaimer')}
            className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>{isAr ? 'إخلاء المسؤولية القانوني' : 'Content Disclaimer'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
