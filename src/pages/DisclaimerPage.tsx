import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  AlertTriangle,
  Scale,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Globe,
  FileText,
  Mail,
  Heart,
  HelpCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageSEO } from '../components/PageSEO';
import { AdSenseBanner } from '../components/AdSenseBanner';

interface Props {
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
}

export const DisclaimerPage: React.FC<Props> = ({
  onBackToHome,
  onNavigatePage,
}) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const isAr = language === 'ar';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isAr ? 'إخلاء المسؤولية القانوني والتنبيه الاستشاري | مرآة القلوب' : 'Content Disclaimer | Mirror of Hearts',
    description: isAr
      ? 'وثيقة إخلاء المسؤولية الرسمية لمنصة مرآة القلوب: توضيح حدود المسؤولية، طبيعة النتائج الاسترشادية والتثقيفية، وعدم تقديم استشارات طبية أو نفسية أو قانونية.'
      : 'Official Content Disclaimer of Mirror of Hearts: detailing advisory limitations, non-clinical nature, and non-guarantee of relationship success.',
    url: 'https://miratalqulub.com/#/disclaimer',
    publisher: {
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
            ? 'إخلاء المسؤولية القانوني | مرآة القلوب - حدود الاستخدام والتنبيه الاستشاري'
            : 'Content Disclaimer | Mirror of Hearts - Legal & Educational Limits'
        }
        description={
          isAr
            ? 'تنبيه إخلاء المسؤولية الصريح لمنصة مرآة القلوب: النتائج لأغراض معرفية وتثقيفية فقط وليست استشارات طبية أو عيادية أو قانونية، ولا تضمن نجاح أو استمرار أي علاقة.'
            : 'Explicit Content Disclaimer for Mirror of Hearts: all results are purely educational and exploratory, with zero relationship guarantees.'
        }
        canonicalPath="/#/disclaimer"
        language={language}
        pageType="terms"
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
            <span className="text-white font-bold">{isAr ? 'إخلاء المسؤولية' : 'Content Disclaimer'}</span>
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
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900/80 to-rose-950/40 border border-amber-500/30 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold">
                <Scale className="w-3 h-3" />
                <span>{isAr ? 'إشعار قانوني ملزم وتنبيه استشاري' : 'Binding Legal & Advisory Notice'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Alexandria'] mt-1">
                {isAr ? 'إخلاء المسؤولية (Content Disclaimer)' : 'Content & Liability Disclaimer'}
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            {isAr
              ? 'يرجى قراءة هذا الإشعار بعناية قبل استخدام أدوات واستبيانات منصة «مرآة القلوب». دخولك إلى الموقع يمثل إقراراً وفهماً تاماً لكافة البنود الموضحة أدناه.'
              : 'Please review this notice carefully before utilizing Mirror of Hearts tools. Accessing our platform constitutes full understanding and acknowledgment of these provisions.'}
          </p>
        </div>

        {/* AdSense In-Page Banner */}
        <AdSenseBanner slot="7890123456" format="auto" />

        {/* Section 1: Core Non-Clinical Purpose */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>{isAr ? '1. طبيعة النتائج: استرشادية وتثقيفية فقط' : '1. Advisory & Educational Nature of Results'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isAr
              ? 'كافة الاستبيانات، ومقاييس الشخصية، ومؤشرات التوافق، والتقارير التحليلية المصدرة عبر منصة «مرآة القلوب» صُممت حصراً لأغراض التثقيف النفسي، وزيادة الوعي الذاتي، وفتح آفاق الحوار الإيجابي. لا تقدم المنصة أي نتائج قطعية أو أحكام حتمية حول مستقبل أي علاقة.'
              : 'All questionnaires, personality metrics, compatibility indices, and narrative reports generated on Mirror of Hearts are designed exclusively for psychological education, introspective reflection, and constructive dialogue. The platform provides no categorical verdicts regarding relationship outcomes.'}
          </p>
        </div>

        {/* Section 2: No Professional, Medical, or Legal Advice */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
            <XCircle className="w-5 h-5 text-rose-400" />
            <span>{isAr ? '2. عدم تقديم استشارات مهنية، نفسية، أو طبية' : '2. No Licensed Psychological, Medical, or Legal Advice'}</span>
          </div>
          <div className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
            <p>
              {isAr
                ? 'الموقع وأدواته لا يقدم استشارات عيادية، ولا يشكل بديلاً عن استشارة الأخصائيين النفسيين، أو الأطباء، أو المستشارين الأسريين المعتمدين، أو المحامين.'
                : 'The platform does not provide clinical therapy and does not replace the counsel of licensed psychotherapists, psychiatrists, family counselors, or legal attorneys.'}
            </p>
            <p className="text-rose-300 font-medium text-xs">
              {isAr
                ? 'إذا كنت تعاني من ضغوط نفسية حادة، أو اكتئاب، أو أزمات أسرية معقدة، نوصيك بالتواصل فوراً مع جهات الرعاية الصحية أو الاستشارية المعتمدة في دولتك.'
                : 'If you are undergoing severe psychological distress or domestic crises, we urge you to consult qualified healthcare and social counseling professionals.'}
            </p>
          </div>
        </div>

        {/* Section 3: No Guarantee of Relationship Success or Marriage */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
            <Heart className="w-5 h-5 text-pink-400" />
            <span>{isAr ? '3. عدم ضمان نجاح العلاقات أو الزواج' : '3. No Guarantees of Relationship Longevity or Marriage'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isAr
              ? 'لا يضمن الموقع نجاح، استمرار، أو التوفيق في أي علاقة عاطفية أو زواج. النجاح الإنساني والأسري يرتبط بالنضج الشخصي، والمرونة، والظروف الواقعية، والتفاهم المستمر بين الطرفين، وهي أبعاد حية لا يمكن لأي أداة رقمية ضمانها أو فرضها.'
              : 'The platform offers zero guarantees regarding marriage success, dating longevity, or relationship stability. Real-world interpersonal fulfillment hinges upon emotional maturity, reciprocal empathy, and joint commitment beyond any software calculation.'}
          </p>
        </div>

        {/* Section 4: Limitation of Liability */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
            <Scale className="w-5 h-5 text-indigo-400" />
            <span>{isAr ? '4. حدود المسؤولية القانونية' : '4. Complete Limitation of Liability'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isAr
              ? 'لا يتحمل فريق تطوير أو إدارة «مرآة القلوب» أي مسؤولية قانونية أو أدبية عن أي قرارات شخصية، أو عاطفية، أو مالية، أو اجتماعية يتخذها المستخدم استناداً إلى نتائج أو محتويات الموقع. تقع مسؤولية جميع القرارات الحياتية كاملة على عاتق المستخدم وحده.'
              : 'Under no circumstances shall the developers or operators of Mirror of Hearts be held liable for personal, relational, financial, or social decisions made by users in connection with site contents. All life choices remain the sole responsibility of the individual.'}
          </p>
        </div>

        {/* Footer Navigation Back Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/50 border border-white/5">
          <button
            onClick={() => onNavigatePage('terms')}
            className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>{isAr ? 'انتقل إلى: شروط الاستخدام (Terms of Service)' : 'View: Terms of Service'}</span>
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
