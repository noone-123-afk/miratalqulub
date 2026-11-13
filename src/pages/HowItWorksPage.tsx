import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Cpu,
  Layers,
  Heart,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Globe,
  Sliders,
  Scale,
  Users,
  Compass,
  FileText,
  Mail,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageSEO } from '../components/PageSEO';
import { AdSenseBanner } from '../components/AdSenseBanner';
import { OFFICIAL_LOGO_URL } from '../utils/logoAsset';

interface Props {
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
  onStartQuiz?: () => void;
  onOpenPsychologyTests?: () => void;
  onOpenIntelligenceTests?: () => void;
}

export const HowItWorksPage: React.FC<Props> = ({
  onBackToHome,
  onNavigatePage,
  onStartQuiz,
  onOpenPsychologyTests,
  onOpenIntelligenceTests,
}) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const isAr = language === 'ar';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isAr ? 'كيف يعمل الموقع والمنهجية العلمية | مرآة القلوب' : 'How The Platform Works | Mirror of Hearts',
    description: isAr
      ? 'دليل تفصيلي يشرح المنهجية العلمية لقياس التوافق السيكومتري وخوارزميات التحليل واستخدام الذكاء الاصطناعي وحدود التقنية في مرآة القلوب.'
      : 'Comprehensive breakdown of our scientific psychometric methodology, algorithmic scoring, responsible AI usage, and technical boundaries.',
    url: 'https://miratalqulub.com/#/how-it-works',
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
            ? 'كيف يعمل الموقع | مرآة القلوب - المنهجية العلمية وخوارزميات التوافق'
            : 'How The Platform Works | Mirror of Hearts - Scientific Psychometrics'
        }
        description={
          isAr
            ? 'اكتشف كيف تحسب خوارزميات مرآة القلوب مؤشرات التوافق الإنساني بدقة رياضية، ودور الذكاء الاصطناعي المسؤول وحدود التكنولوجيا والأطر العلمية.'
            : 'Learn how Mirror of Hearts calculates interpersonal compatibility using validated psychometrics, responsible AI, and deterministic scoring models.'
        }
        canonicalPath="/#/how-it-works"
        language={language}
        pageType="website"
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
            <span className="text-white font-bold">{isAr ? 'كيف يعمل الموقع' : 'How The Platform Works'}</span>
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

        {/* Hero Title Banner */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-violet-950/50 via-slate-900/80 to-purple-950/50 border border-violet-500/30 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={OFFICIAL_LOGO_URL}
              alt="شعار مرآة القلوب الرسمي"
              className="w-12 h-12 rounded-2xl object-cover border border-violet-500/40 shadow-lg shrink-0"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-[11px] font-bold">
                <Brain className="w-3 h-3" />
                <span>{isAr ? 'المنهجية السيكومترية وخوارزميات التوافق' : 'Psychometric Methodology & Algorithmic Architecture'}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white font-['Alexandria'] mt-1">
                {isAr ? 'كيف يعمل موقع مرآة القلوب؟' : 'How The Platform Works'}
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {isAr
              ? 'تعتمد المنصة على مزيج هندسي محكم يجمع بين النظريات السيكومترية المقننة، والخوارزميات الرياضية الدقيقة، ونماذج الذكاء الاصطناعي المسؤولة لتفكيك أبعاد التوافق الإنساني بموضوعية وشفافية تامة.'
              : 'Our architecture marries peer-reviewed psychometric frameworks with deterministic mathematical scoring and responsible AI interpretation for transparent self-discovery.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={onStartQuiz}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/20 transition cursor-pointer flex items-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{isAr ? 'ابدأ تجربة اختبار التوافق' : 'Launch Compatibility Assessment'}</span>
            </button>
            <button
              onClick={onOpenIntelligenceTests}
              className="px-5 py-2.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-cyan-200 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2"
            >
              <span>💡</span>
              <span>{isAr ? 'اختبارات الذكاءات المتعددة' : 'Multiple Intelligences Lab'}</span>
            </button>
          </div>
        </div>

        {/* AdSense In-Page Banner */}
        <AdSenseBanner slot="4567890123" format="auto" />

        {/* Step-by-Step Methodology (Detailed Breakdown) */}
        <div className="space-y-6">
          <div className="text-center sm:text-start space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">
              {isAr ? 'المراحل الخمس في آلية معالجة وقياس التوافق' : 'The 5-Stage Diagnostic Pipeline'}
            </h2>
            <p className="text-xs text-slate-400">
              {isAr ? 'خطوات منهجية معلنة تضمن الشفافية وتلغي العشوائية' : 'Transparent, verifiable steps ensuring scientific integrity'}
            </p>
          </div>

          {/* Stage 1: Data Ingestion */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 font-black text-sm flex items-center justify-center">
                1
              </span>
              <h3 className="text-base font-bold text-white font-['Alexandria']">
                {isAr ? 'مرحلة الاستبيان والقياس السيكومتري (Assessment Mechanism)' : 'Assessment Mechanism & Psychometric Ingestion'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'يخوض المستخدم استبياناً مقنناً يتألف من أسئلة محكمة تغطي محاور التوافق الأساسية: أسلوب حل الخلافات الأسرية، الرؤية المالية المشتركة، الأهداف الحياتية والاستقلالية، نمط التعبير عن المشاعر، ودور الأهل والروابط الاجتماعية. يتم استخدام مقاييس ليكرت (Likert Scales) وأوزان معيارية مستخلصة من أبحاث علمية منشورة.'
                : 'Users complete validated questionnaires calibrated along core relationship pillars: conflict resolution, financial philosophy, life goals, affective communication, and boundary management. Standardized Likert scales ensure psychometric reliability.'}
            </p>
          </div>

          {/* Stage 2: Deterministic Compatibility Calculation */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 font-black text-sm flex items-center justify-center">
                2
              </span>
              <h3 className="text-base font-bold text-white font-['Alexandria']">
                {isAr ? 'طريقة احتساب التوافق (Compatibility Scoring Engine)' : 'Compatibility Scoring Engine & Normalization'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'يتم احتساب درجات التوافق عبر محرك رياضي حتمي (Deterministic Engine) يقسم النتيجة الإجمالية إلى مؤشرات فرعية محددة: التوافق الفكري، التوافق الاجتماعي، التوافق العاطفي، ونمط الحياة اليومي. تُعالج الاستجابات بخوارزمية مطابقة تمنح وزناً أكبر للتوافق في القيم الجوهرية (Core Values) مع مراعاة المرونة في الاهتمامات السطحية.'
                : 'Overall compatibility is calculated via a deterministic scoring engine breaking results into intellectual, sociological, emotional, and lifestyle synergy vectors. Core shared values receive heavy statistical weighting, distinguishing non-negotiable fundamentals from flexible preferences.'}
            </p>
          </div>

          {/* Stage 3: Dyadic Assessment for Couples */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-black text-sm flex items-center justify-center">
                3
              </span>
              <h3 className="text-base font-bold text-white font-['Alexandria']">
                {isAr ? 'نموذج التقييم الثنائي بين الشريكين (Dyadic Data Assessment)' : 'Dyadic Assessment for Partner Pairs'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'عند دعوة شريك حقيقي لخوض الاختبار، تعتمد المنصة على نموذج التحليل الثنائي (Kenny Dyadic Analysis)، حيث تقارن إجابات الطرف الأول بإجابات الطرف الثاني بنداً ببند لتوليد مصفوفة توافق حقيقية، وكشف مساحات الانسجام ومناطق التباين المحتملة بموضوعية تامة.'
                : 'When two individuals undertake a joint assessment, our Kenny Dyadic Data framework contrasts partner responses item-by-item to produce a multi-dimensional synergy matrix, highlighting harmonic intersections alongside potential growth areas.'}
            </p>
          </div>

          {/* Stage 4: Responsible AI Narrative Formulation */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-black text-sm flex items-center justify-center">
                4
              </span>
              <h3 className="text-base font-bold text-white font-['Alexandria']">
                {isAr ? 'كيفية استخدام الذكاء الاصطناعي المسؤول (Responsible AI Integration)' : 'Responsible AI & Natural Language Formulation'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'تُستخدم نماذج الذكاء الاصطناعي المتقدمة (Google Gemini) حصرياً لتحويل الدرجات الرقمية الجافة إلى تقرير سردي غني، يشرح للمستخدم نقاط القوة في شخصيته، أسلوب تواصله الأمثل، ونصائح عملية لتطوير الذات، مع مراعاة السياق الثقافي والاجتماعي ودون أي انتهاك للبيانات الحساسة.'
                : 'Advanced AI models (Google Gemini) transform quantitative scores into rich narrative dossiers, detailing behavioral traits, communication styles, and personalized self-development pointers with cultural sensitivity and privacy preservation.'}
            </p>
          </div>

          {/* Stage 5: Auditing, Encryption & PDF Dossier */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-sm flex items-center justify-center">
                5
              </span>
              <h3 className="text-base font-bold text-white font-['Alexandria']">
                {isAr ? 'التدقيق، التشفير وتصدير ملف الـ PDF (Results Auditing & Export)' : 'Auditing, Encryption & Certified PDF Dossier'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'توفر المنصة جدول تدقيق تفصيلي لكل بند وإجابة، مع إمكانية تصدير التقرير كاملاً بصيغة PDF عالية الدقة تحتوي على الرسوم البيانية، ومقاييس كاتل 16PF، وجداول التوافق، مع حفظ التقدم مشفراً على Google Cloud.'
                : 'Every test run provides an item-by-item audit table alongside a one-click high-resolution PDF export featuring psychometric charts, Cattell 16PF breakdowns, and compatibility scorecards.'}
            </p>
          </div>
        </div>

        {/* Scientific Theories & Literature Anchors */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-['Alexandria']">
                {isAr ? 'النظريات والمقاييس السيكومترية المعتمدة' : 'Validated Theories & Scientific References'}
              </h2>
              <p className="text-xs text-slate-400">
                {isAr ? 'أطر أكاديمية عالمية منشورة في مجلات علم النفس المحكمة' : 'Peer-reviewed academic frameworks underpinning our platform'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1.5">
              <span className="font-bold text-rose-300 block">🏠 {isAr ? 'نموذج جون غوتمان للبيت المتين' : 'Gottman Sound Relationship House'}</span>
              <span className="text-slate-400 leading-relaxed">
                {isAr ? 'قياس خرائط الحب، محاولات الإصلاح، والتواصل الناضج أثناء الاختلاف.' : 'Measures love maps, shared meaning, and repair attempts.'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1.5">
              <span className="font-bold text-sky-300 block">🔗 {isAr ? 'نظرية التعلق للراشدين (ECR-R)' : 'Adult Attachment Theory (ECR-R)'}</span>
              <span className="text-slate-400 leading-relaxed">
                {isAr ? 'تصنيف نمط الارتباط (آمن، قلق، تجنبي) وتأثيره على الاستقرار العاطفي.' : 'Classifies attachment styles (Secure, Anxious, Avoidant).'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1.5">
              <span className="font-bold text-amber-300 block">🔺 {isAr ? 'نظرية الحب الثلاثية (ستيرنبرغ)' : 'Sternberg Triangular Theory'}</span>
              <span className="text-slate-400 leading-relaxed">
                {isAr ? 'تحليل ركائز الحميمية، الشغف، والالتزام الواعي بين الشريكين.' : 'Evaluates intimacy, passion, and conscious commitment.'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1.5">
              <span className="font-bold text-purple-300 block">🧬 {isAr ? 'مقياس السمات الـ 16 (ريموند كاتل)' : 'Cattell 16 Personality Factors'}</span>
              <span className="text-slate-400 leading-relaxed">
                {isAr ? 'رسم بياني تفصيلي للسمات الأولية والعوامل الخمسة الكبرى.' : 'Comprehensive profiling of 16 primary personality factors.'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1.5">
              <span className="font-bold text-emerald-300 block">💡 {isAr ? 'الذكاءات المتعددة (جاردنر وماكينزي)' : 'Multiple Intelligences (Gardner)'}</span>
              <span className="text-slate-400 leading-relaxed">
                {isAr ? 'تقييم 8 أبعاد للذكاء (اللغوي، المنطقي، العاطفي، الاجتماعي، إلخ).' : 'Assesses 8 intelligences including emotional & interpersonal.'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-1.5">
              <span className="font-bold text-cyan-300 block">⚖️ {isAr ? 'العوامل الخمسة الكبرى (Big Five)' : 'Big Five Traits (OCEAN)'}</span>
              <span className="text-slate-400 leading-relaxed">
                {isAr ? 'الانفتاح، الضمير الحي، الانبساط، الوفاق، والاستقرار النفسي.' : 'Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism.'}
              </span>
            </div>
          </div>
        </div>

        {/* Technical & Algorithmic Limitations (Crucial Requirement) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-950/25 border border-amber-500/30 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-['Alexandria']">
                {isAr ? 'حدود التقنية والمحاذير الأخلاقية' : 'Technological Limitations & Ethical AI Boundaries'}
              </h2>
              <p className="text-xs text-amber-300/80">
                {isAr ? 'تأكيد الشفافية ومسؤولية استخدام الخوارزميات' : 'Transparency commitment and algorithmic humility'}
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
            <p>
              {isAr
                ? 'على الرغم من الدقة الرياضية العالية لخوارزمياتنا، فإننا نؤكد بشفافية كاملة على حدود التكنولوجيا فيما يتعلق بالعلاقات الإنسانية:'
                : 'While our algorithms provide structured insight, human dynamics possess nuanced depths that no software can fully compress:'}
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300">
              <li>
                {isAr
                  ? 'التوافق الإنساني ليس معادلة جبرية حتمية، بل هو مسار تشاركي ديناميكي يعتمد على النضج، الحوار، والإرادة المشتركة.'
                  : 'Interpersonal synergy is not a deterministic algebraic formula, but an ongoing collaborative practice requiring maturity and commitment.'}
              </li>
              <li>
                {isAr
                  ? 'دقة أي تقرير تعتمد بشكل كامل على صدق ووعي إجابات المستخدم؛ فالخوارزمية تحلل ما يُقدَّم لها دون إصدار أحكام غيبية.'
                  : 'The validity of any report relies on genuine, sincere responses; our models analyze stated values without presumption.'}
              </li>
              <li>
                {isAr
                  ? 'التقارير هي بوصلة استرشادية لفتح آفاق الحوار وليست حكماً نهائياً على فشل أو نجاح أي علاقة.'
                  : 'Diagnostic dossiers serve as conversational guideposts, never definitive verdicts on marital success or viability.'}
              </li>
            </ul>
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
