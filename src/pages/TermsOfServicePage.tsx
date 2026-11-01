import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  ShieldAlert,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Scale,
  Users,
  Lock,
  ArrowRight,
  ArrowLeft,
  Globe,
  CheckCircle2,
  XCircle,
  Mail,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageSEO } from '../components/PageSEO';
import { AdSenseBanner } from '../components/AdSenseBanner';

interface Props {
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
}

export const TermsOfServicePage: React.FC<Props> = ({
  onBackToHome,
  onNavigatePage,
}) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const isAr = language === 'ar';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isAr ? 'شروط الاستخدام والخدمة | مرآة القلوب' : 'Terms of Service | Mirror of Hearts',
    description: isAr
      ? 'وثيقة شروط الاستخدام الرسمية لمنصة مرآة القلوب: توضيح الالتزامات والمسؤوليات وحدود المسؤولية وإخلاء المسؤولية القانوني وحقوق الملكية.'
      : 'Official Terms of Service of Mirror of Hearts platform: outline of responsibilities, disclaimers, and user conduct.',
    url: 'https://miratalqulub.com/#/terms',
    publisher: {
      '@type': 'Organization',
      name: 'مرآة القلوب - Mirror of Hearts',
      url: 'https://miratalqulub.com/',
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
            ? 'شروط الاستخدام والخدمة | مرآة القلوب - الضوابط القانونية وإخلاء المسؤولية'
            : 'Terms of Service | Mirror of Hearts - User Agreement & Disclaimers'
        }
        description={
          isAr
            ? 'اطلع على شروط استخدام منصة مرآة القلوب: حقوق الملكية الفكرية، مسؤوليات المستخدم، تنبيه إخلاء المسؤولية القانوني، وضوابط الاستخدام الآمن.'
            : 'Review the Terms of Service for Mirror of Hearts: intellectual property rights, user responsibilities, and clear legal disclaimers.'
        }
        canonicalPath="/#/terms"
        language={language}
        pageType="terms"
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
            <span className="text-white font-bold">{isAr ? 'شروط الاستخدام' : 'Terms of Service'}</span>
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
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-purple-950/40 border border-blue-500/30 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold">
                <FileText className="w-3 h-3" />
                <span>{isAr ? 'اتفاقية الاستخدام والخدمة الرسمية' : 'Official User Agreement & Terms'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Alexandria'] mt-1">
                {isAr ? 'شروط الاستخدام والخدمة' : 'Terms of Service'}
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isAr
              ? 'تاريخ السريان: 31 أكتوبر 2026. يحكم هذا العقد شروط وأحكام استخدامك لمنصة «مرآة القلوب» وتطبيقاتها التفاعلية.'
              : 'Effective Date: October 31, 2026. This agreement outlines the terms governing your use of Mirror of Hearts and its interactive tools.'}
          </p>
        </div>

        {/* Mandatory Legal Disclaimer Banner (Prominent User Requirement) */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/60 via-slate-950 to-amber-950/60 border-2 border-amber-500/50 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-amber-300 font-extrabold text-sm sm:text-base">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>{isAr ? 'تنبيه قانوني واستشاري إلزامي (إخلاء مسؤولية):' : 'Mandatory Legal Disclaimer & Limitation:'}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
            {isAr
              ? '«النتائج، والمقاييس، والتقارير، والتحليلات المقدمة داخل موقع مرآة القلوب هي لأغراض معرفية وتثقيفية واستكشافية فقط، وليست استشارات نفسية أو قانونية أو طبية أو مهنية مرخصة، ولا تمثل بأي حال من الأحوال ضماناً لنجاح أو استمرار أي علاقة أو ارتباط بين أي طرفين».'
              : '“The results, metrics, assessments, and analytical reports provided within Mirror of Hearts are strictly for educational, informational, and self-reflection purposes. They do not constitute licensed psychological, clinical, legal, or medical counseling, nor do they guarantee or warrant the success, compatibility, or durability of any interpersonal relationship or marriage.”'}
          </p>
        </div>

        {/* AdSense In-Page Banner */}
        <AdSenseBanner slot="2345678901" format="auto" />

        {/* 1. Acceptance & Nature of the Platform */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? '1. الموافقة وطبيعة المنصة' : '1. Acceptance & Nature of the Platform'}
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
            <p>
              {isAr
                ? 'باستخدامك لموقع «مرآة القلوب» أو وصولك إلى أي من صفحاته واختباراته، فإنك تقر وتوافق صراحة على الالتزام بجميع بنود هذه الشروط وسياسة الخصوصية. إذا كنت لا توافق على هذه الشروط، يرجى التوقف فوراً عن استخدام المنصة.'
                : 'By accessing or utilizing Mirror of Hearts, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you disagree with any provision, you must discontinue using the platform immediately.'}
            </p>
            <p className="text-slate-400">
              {isAr
                ? 'المنصة أداة رقمية معرفية تعتمد على الاستبيانات السيكومترية الذاتية ولا تتدخل في العلاقات الواقعية للمستخدمين.'
                : 'The platform is an informational digital utility reliant on self-reported psychometric inventories and does not intervene in real-world interactions.'}
            </p>
          </div>
        </div>

        {/* 2. Platform Identity & Operator Disclosure (Crucial User Requirement) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Users className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? '2. هوية المالك، المشغل والاستقلالية' : '2. Identity of Operators & Independence Statement'}
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
            <p>
              {isAr
                ? 'يتم تشغيل وبرمجة هذا الموقع بواسطة مجموعة من المهندسين ومطوري البرمجيات المستقلين في عمّان - المملكة الأردنية الهاشمية، الذين يطورون المشاريع والمنصات الرقمية تلبيةً لاحتياجات المستخدمين وتطلعاتهم المعرفية.'
                : 'This platform is developed and maintained by an independent group of software engineers and developers based in Amman, Hashemite Kingdom of Jordan, dedicated to crafting meaningful web utilities.'}
            </p>
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1.5 text-xs">
              <span className="font-bold text-sky-300 block">{isAr ? 'تأكيدات قانونية واضحة:' : 'Explicit Declarations:'}</span>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>{isAr ? 'هذا الموقع لا ينتمي إلى أي جهة حكومية أو منظمة رسمية أو شركة تجارية كبرى.' : 'This platform does not belong to any government agency, official organization, or commercial conglomerate.'}</li>
                <li>{isAr ? 'الموقع لا يهدف لجمع البيانات أو بيعها أو استغلالها تجارياً.' : 'The platform never collects, monetizes, or sells user data.'}</li>
                <li>{isAr ? 'الموقع مجاني بالكامل ولا يقدم أي اشتراكات مدفوعة.' : 'All features are 100% free with zero paid subscriptions.'}</li>
                <li>{isAr ? 'الموقع لا يقدم خدمات زواج أو خطبة فعلية أو مكاتب تعارف.' : 'The platform does not operate actual matchmaking or dating agencies.'}</li>
                <li>{isAr ? 'الموقع يحظر رفع الصور الشخصية لحماية الخصوصية.' : 'Personal photo uploads are strictly prohibited to protect user integrity.'}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. User Responsibilities & Acceptable Conduct */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? '3. مسؤوليات والتزامات المستخدم' : '3. User Responsibilities & Conduct'}
            </h2>
          </div>
          <div className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
            <p>{isAr ? 'يلتزم المستخدم عند تصفحه للموقع أو مشاركته في الاستبيانات والدردشة بالآتي:' : 'When engaging with our tools or live chat, you agree to:'}</p>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300">
              <li>{isAr ? 'تقديم إجابات صادقة تعبر عن قناعاته للحصول على تقارير ذات قيمة حقيقية.' : 'Provide sincere responses to ensure accurate psychometric reflection.'}</li>
              <li>{isAr ? 'الالتزام بالأدب والاحترام في غرف الحوار المفتوحة وتجنب أي إساءة لفظية أو تنمر.' : 'Maintain respectful and dignified conduct in open chat sessions.'}</li>
              <li>{isAr ? 'عدم محاولة اختراق خوادم المنصة أو إرسال روبوتات آلية أو نشر روابط ضارة.' : 'Refrain from sending automated bots, scrapers, or malicious payloads.'}</li>
              <li>{isAr ? 'الحفاظ على سرية رمز PIN الخاص به في حال تفعيل قفل النتائج.' : 'Maintain the confidentiality of your personal result PIN lock.'}</li>
            </ul>
          </div>
        </div>

        {/* 4. Intellectual Property Rights */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Scale className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? '4. حقوق الملكية الفكرية' : '4. Intellectual Property Rights'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isAr
              ? 'كافة حقوق التصميم، الأكواد البرمجية، الخوارزميات، المقالات التثقيفية، وشعارات منصة «مرآة القلوب» هي ملكية حصرية لفريق التطوير الهندسي المستقل ومحمية بموجب قوانين الملكية الفكرية وحق المؤلف الدولية. يُسمح للمستخدمين بتصدير ومشاركة تقاريرهم السيكومترية الشخصية (PDF) للاستخدام الفردي فقط.'
              : 'All source code, algorithmic scoring modules, UI designs, graphics, and proprietary educational articles are the intellectual property of the independent engineering team and are protected under international copyright law. Personal PDF dossiers may be downloaded and shared for personal, non-commercial use.'}
          </p>
        </div>

        {/* 5. Account Suspension or Termination */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <XCircle className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? '5. تعليق أو إيقاف الحسابات وسوء الاستخدام' : '5. Account Suspension and Misuse'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isAr
              ? 'تحتفظ إدارة المنصة بالحق الكامل في إيقاف أو حظر أي حساب أو عنوان IP يثبت ارتكابه لمخالفات جسيمة، مثل: نشر رسائل سب أو مضايقة في الدردشة الحية، أو محاولة تعطيل الخوادم، أو التحايل على أنظمة القياس، وذلك دون أي إشعار مسبق لضمان سلامة المجتمع.'
              : 'We reserve the right to suspend or terminate accounts, or block IPs, engaging in abusive behavior, hate speech in chat, server disruption, or fraudulent abuse of measurement tools without prior notice to preserve community safety.'}
          </p>
        </div>

        {/* 6. Future Amendments and Modifications */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? '6. التعديلات المستقبلية على الشروط' : '6. Future Amendments to Terms'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isAr
              ? 'قد نقوم بتحديث هذه الشروط من حين لآخر لتعكس التطويرات التقنية والتحسينات في المقاييس والامتثال للمتطلبات التنظيمية. استمرارك في استخدام الموقع بعد نشر أي تعديلات يعتبر موافقة ضمنية على الشروط المحدثة.'
              : 'We may modify these Terms periodically to reflect architectural upgrades, updated psychometric batteries, or evolving regulatory standards. Continued use of the platform constitutes acceptance of any revised provisions.'}
          </p>
        </div>

        {/* 7. Governing Law & Jurisdiction */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Globe className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? '7. القانون الحاكم وحل النزاعات' : '7. Governing Law & Contact'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isAr
              ? 'تخضع هذه الشروط وتفسر وفقاً للقوانين والأنظمة المعمول بها في المملكة الأردنية الهاشمية، وتختص محاكم عمّان بأي نزاع قد ينشأ عنها.'
              : 'These Terms of Service are construed and governed by the laws and regulations of the Hashemite Kingdom of Jordan, with the courts of Amman retaining jurisdiction.'}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="mailto:one497303@gmail.com"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>one497303@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Footer Navigation Back Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/50 border border-white/5">
          <button
            onClick={() => onNavigatePage('privacy')}
            className="text-xs text-emerald-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isAr ? 'انتقل إلى: سياسة الخصوصية (Privacy Policy)' : 'View: Privacy Policy'}</span>
          </button>
          <button
            onClick={() => onNavigatePage('contact')}
            className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{isAr ? 'تواصل مع الدعم القانوني والتقني' : 'Contact Legal & Tech Support'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
