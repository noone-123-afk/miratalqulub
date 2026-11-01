import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Target,
  Compass,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Users,
  Brain,
  Globe,
  Mail,
  Lock,
  Layers,
  Award,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { soundManager } from '../utils/sound';
import { PageSEO } from '../components/PageSEO';
import { AdSenseBanner } from '../components/AdSenseBanner';

interface Props {
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
  onStartQuiz?: () => void;
  onOpenPsychologyTests?: () => void;
}

export const AboutUsPage: React.FC<Props> = ({
  onBackToHome,
  onNavigatePage,
  onStartQuiz,
  onOpenPsychologyTests,
}) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    soundManager.playTap();
    setOpenFaq(openFaq === index ? null : index);
  };

  const isAr = language === 'ar';

  const faqs = isAr
    ? [
        {
          q: 'ما هي المنطلقات العلمية التي تستند إليها منصة «مرآة القلوب»؟',
          a: 'ترتكز المنصة على نماذج ومقاييس سيكومترية عالمية رصينة، منها: نموذج البيت العلائقي المتين للدكتور جون غوتمان (Gottman Sound Relationship House)، ومقياس التعلق العاطفي للراشدين (ECR-R) المستند لأبحاث جون بولبي، ونظرية الحب الثلاثية لروبرت ستيرنبرغ، ومقياس السمات الـ16 لريموند كاتل (16PF)، ونموذج العوامل الخمسة الكبرى (Big Five - OCEAN)، إضافةً إلى بطاريات الذكاءات المتعددة لهوارد جاردنر ووالتر ماكينزي.',
        },
        {
          q: 'هل يقدم الموقع خدمات زواج أو خطبة أو وساطة تعارف تجارية؟',
          a: 'قطعاً لا. الموقع منصة بحثية، معرفية، وتثقيفية تفاعلية تعنى بفهم الذات وقياس التوافق النفسي والفكري. الموقع لا يقدم أي خدمات زواج فعلية، ولا وساطة خطبة، ولا يرتب أي تعاملات خارج إطار المحتوى المعرفي والاستبيانات الذاتية.',
        },
        {
          q: 'هل يتطلب الموقع أي اشتراكات مدفوعة أو رسوم مالية؟',
          a: 'جميع خدمات المنصة واختباراتها ومقاييسها وتقاريرها (بما في ذلك تصدير ملفات PDF السيكومترية) مجانية بالكامل بنسبة 100%، ولا توجد أي اشتراكات مدفوعة أو خطط VIP محجوبة خلف بوابات دفع.',
        },
        {
          q: 'لماذا يمنع الموقع رفع الصور الشخصية للمستخدمين؟',
          a: 'انطلاقاً من التزامنا الصارم بحماية خصوصية المستخدمين وحرمتهم الشخصية ومكافحة الانتحال وسوء الاستخدام، لا يتيح الموقع رفع أي صور شخصية من قبل الزوار، بل يتم تمثيل النماذج بصور توضيحية خوارزمية أو تصاميم جرافيكية مجردة.',
        },
        {
          q: 'كيف يتم استخدام الذكاء الاصطناعي (AI) في المنصة؟',
          a: 'تُستخدم نماذج الذكاء الاصطناعي المسؤولة (مثل Google Gemini) حصراً للمساعدة في صياغة القراءات السردية التحليلية وتوليد الرؤى النفسية التوجيهية وتفسير درجات الاستبيانات بطريقة ملهمة وسهلة الفهم للمستخدم العادي، مع بقاء المعادلات الحسابية السيكومترية منضبطة بقواعد رياضية محكمة.',
        },
        {
          q: 'من يقف وراء منصة «مرآة القلوب» وما صفتهم القانونية؟',
          a: 'يتم تطوير المنصة وإدارتها بواسطة مجموعة من المهندسين ومطوري البرمجيات المستقلين في عمّان - المملكة الأردنية الهاشمية. الموقع مبادرة تقنية رقمية مستقلة لا تتبع لأي جهة حكومية أو منظمة حزبية أو شركة كبرى، ولا تهدف إلى جمع البيانات أو بيعها لأي جهة.',
        },
        {
          q: 'هل نتائج وتوصيات الموقع تعتبر بديلاً عن الاستشارات النفسية أو الزوجية المتخصصة؟',
          a: 'كلا. النتائج والتقارير الصادرة عن المنصة هي لأغراض معرفية، تثقيفية واستكشافية فقط، ولا تمثل بأي حال من الأحوال تشخيصاً طبياً، أو علاجاً نفسياً، أو استشارة قانونية أو أسرية معتمدة، ولا تضمن نجاح أو استمرار أي علاقة.',
        },
        {
          q: 'كيف يمكنني استعادة نتائجي السابقة أو حذف بياناتي بالكامل؟',
          a: 'يمكنك الوصول لنتائجك وسجل اختباراتك عبر تسجيل الدخول بالبريد الإلكتروني المعتمد. كما يمكنك في أي وقت طلب محو أو حذف جميع بياناتك نهائياً من قاعدة بياناتنا عبر إعدادات لوحة التحكم أو مراسلتنا مباشرة على one497303@gmail.com.',
        },
      ]
    : [
        {
          q: 'What scientific frameworks underpin the Mirror of Hearts platform?',
          a: 'The platform is anchored in peer-reviewed psychometric models, including Dr. John Gottman’s Sound Relationship House model, John Bowlby and Chris Fraley’s Adult Attachment Theory (ECR-R), Robert Sternberg’s Triangular Theory of Love, Raymond Cattell’s 16 Personality Factor Questionnaire (16PF), the Big Five Personality Traits (OCEAN), and Howard Gardner & Walter McKenzie’s Multiple Intelligences inventories.',
        },
        {
          q: 'Does the platform provide matchmaking, marriage brokerage, or dating services?',
          a: 'Absolutely not. Mirror of Hearts is purely an educational, exploratory, and self-discovery platform focusing on psychometric compatibility and personal insight. We do not provide actual matchmaking, dating agency services, or offline marriage facilitation.',
        },
        {
          q: 'Are there any paid subscriptions, hidden fees, or paywalls?',
          a: 'No. All tools, personality inventories, intelligence batteries, and comprehensive PDF report exports are 100% free of charge. There are no paid memberships or premium paywalls.',
        },
        {
          q: 'Why does the website prohibit uploading personal photos?',
          a: 'To guarantee absolute user privacy, maintain dignified digital boundaries, and prevent misuse or identity impersonation, the platform never asks for or allows user photograph uploads. All portraits are algorithmically generated conceptual representations.',
        },
        {
          q: 'How is Artificial Intelligence (AI) utilized on the platform?',
          a: 'Responsible AI models (such as Google Gemini) are utilized strictly to formulate articulate narrative interpretations, psychological reflection prompts, and digestible summaries of mathematically scored psychometric inventories, without compromising user confidentiality.',
        },
        {
          q: 'Who operates Mirror of Hearts and what is their legal identity?',
          a: 'The platform is built and maintained by an independent group of software engineers and developers based in Amman, Jordan. The project is an independent technology initiative with no affiliation to any governmental body, international conglomerate, or commercial agency, and does not sell or commercially exploit user data.',
        },
        {
          q: 'Are the results considered formal psychological or marriage therapy?',
          a: 'No. The insights provided are strictly for educational and self-reflection purposes. They do not constitute licensed medical, clinical, legal, or psychological counseling, nor do they guarantee marital longevity or interpersonal success.',
        },
        {
          q: 'How can I retrieve my past test records or permanently erase my data?',
          a: 'You can access your test dossier by logging in with your email. You also retain the full right under GDPR principles to request the irreversible erasure of your records anytime via your profile panel or by emailing us at one497303@gmail.com.',
        },
      ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: isAr ? 'من نحن | مرآة القلوب' : 'About Us | Mirror of Hearts',
    description: isAr
      ? 'تعرف على فكرة وأهداف ورؤية منصة مرآة القلوب، المنصة العربية المتخصصة في التوافق الإنساني والمقاييس السيكومترية والتحليل النفسي الرصين.'
      : 'Learn about the concept, objectives, and vision of Mirror of Hearts, an independent platform for interpersonal compatibility and psychometric exploration.',
    url: 'https://miratalqulub.com/#/about',
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
            ? 'من نحن | مرآة القلوب - منصة التوافق الإنساني والمقاييس النفسية'
            : 'About Us | Mirror of Hearts - Psychometric & Compatibility Platform'
        }
        description={
          isAr
            ? 'اكتشف فكرة ورؤية ورسالة منصة مرآة القلوب: منصة عربية مستقلة لدراسة التوافق الإنساني والمقاييس السيكومترية بإشراف فريق هندسي في عمّان - الأردن.'
            : 'Discover the vision, mission, and methodology of Mirror of Hearts: an independent Arabic and English platform for human compatibility and psychometrics.'
        }
        canonicalPath="/#/about"
        language={language}
        pageType="about"
        structuredData={structuredData}
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation Breadcrumb & Back Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <button
              onClick={onBackToHome}
              className="hover:text-rose-400 transition cursor-pointer flex items-center gap-1 font-semibold"
            >
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            </button>
            <span>/</span>
            <span className="text-white font-bold">{isAr ? 'من نحن' : 'About Us'}</span>
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

        {/* Hero Section */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-purple-950/60 via-slate-900/80 to-slate-950 border border-purple-500/30 shadow-2xl backdrop-blur-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{isAr ? 'المرجع المعرفي في التوافق الإنساني والقياس النفسي' : 'Authoritative Hub in Human Compatibility & Psychometrics'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white font-['Alexandria',sans-serif] leading-tight">
              {isAr ? 'من نحن — منصة مِـرآة القـلوب' : 'About Us — Mirror of Hearts'}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isAr
                ? 'مرآة القلوب منصة عربية مستقلة رائدة تعتمد على الذكاء الاصطناعي المسؤول والتحليل النفسي والاستبيانات السيكومترية المحكمة، لمساعدة الفرد على استكشاف التوافق الفكري، العاطفي، والاجتماعي، وفهم أنماط الذات وشريك الحياة بأسلوب علمي رصين بعيداً عن العشوائية والادعاءات غير المثبتة.'
                : 'Mirror of Hearts is an independent platform leveraging responsible AI, psychometric inventories, and validated psychological models to guide users in exploring intellectual, emotional, and social compatibility with scientific rigor and uncompromising data ethics.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartQuiz}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/20 transition cursor-pointer flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{isAr ? 'خض اختبار شريك الحياة والتوافق' : 'Take Compatibility Assessment'}</span>
              </button>

              <button
                onClick={onOpenPsychologyTests}
                className="px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-purple-500/30 text-purple-200 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center gap-2"
              >
                <Brain className="w-4 h-4 text-purple-400" />
                <span>{isAr ? 'استكشف المقاييس السيكومترية' : 'Explore Psychometric Lab'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* AdSense In-Page Banner */}
        <AdSenseBanner slot="7890123456" format="auto" />

        {/* Core Pillars: Concept, Vision, Mission, Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Concept */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? 'فكرة الموقع' : 'Platform Concept'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'انطلقت منصة «مرآة القلوب» من إيمان عميق بأن العلاقات الإنسانية الناجحة لا تبنى على المصادفة وحدها، بل تتطلب وعياً ذاتياً عميقاً وفهماً للركائز النفسية والاجتماعية التي تحكم التفاعل البشري. نوفر بيئة رقمية تفاعلية تمكن الزائر من خوض اختبارات سيكومترية مقننة تساعده على قراءة تطلعاته واكتشاف السمات التي تضمن له انسجاماً مستداماً.'
                : 'Mirror of Hearts was born from the conviction that healthy interpersonal relationships require deep self-awareness and structured understanding of sociological and psychological compatibility factors. We offer interactive, validated psychometric tools to illuminate emotional blueprints.'}
            </p>
          </div>

          {/* Card 2: Vision */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 transition shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? 'رؤيتنا' : 'Our Vision'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'أن نكون المنصة المعرفية العربية الأولى والأكثر موثوقية في مجال التوافق النفسي، والذكاءات المتعددة، وبناء ثقافة أسرية وزواجية قائمة على التفاهم والوعي العلمي، بعيداً عن الخرافات والابتذال التجاري أو التجارة بالبيانات الشخصية.'
                : 'To stand as the most trusted Arabic and international digital beacon in human compatibility, emotional intelligence, and cognitive development, championing truth, transparency, and zero commercial data exploitation.'}
            </p>
          </div>

          {/* Card 3: Mission */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? 'رسالتنا' : 'Our Mission'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isAr
                ? 'تسخير أفضل ما توصل إليه علم النفس المعاصر وخوارزميات الذكاء الاصطناعي الأخلاقية في واجهات مستخدم ميسرة، لتقديم تحليلات دقيقة وتقارير موثقة تعين المستخدم على اتخاذ قرارات حياتية واعية وتطوير علاقات متوازنة.'
                : 'To synthesize contemporary psychological research and ethical algorithmic design into accessible digital experiences, equipping individuals with calibrated diagnostics for enlightened interpersonal decisions.'}
            </p>
          </div>

          {/* Card 4: Objectives */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? 'أهداف الموقع' : 'Core Objectives'}
            </h2>
            <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{isAr ? 'نشر الوعي السيكومتري والفكري بين الشباب والأسر.' : 'Promote psychometric literacy and relational mindfulness.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{isAr ? 'توفير مقاييس سيكومترية محكمة مجاناً وبدقة عالية.' : 'Provide certified psychological inventories free of charge.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{isAr ? 'مساعدة الأفراد في تحديد لغات الحب وأنماط التعلق العاطفي.' : 'Assist users in identifying adult attachment styles and love languages.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{isAr ? 'ضمان خصوصية مطلقة للبيانات دون استغلال تجاري.' : 'Ensure complete privacy protection with zero data selling.'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section: Methodology & Technology */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-['Alexandria']">
                {isAr ? 'طريقة العمل والتقنيات المستخدمة' : 'Methodology & Technology Stack'}
              </h2>
              <p className="text-xs text-slate-400">
                {isAr ? 'معايير برمجية وهندسية متقدمة تضمن الأمان والدقة والسرعة' : 'Advanced engineering standards ensuring security, speed, and accuracy'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
              <h3 className="font-bold text-indigo-300 flex items-center gap-1.5">
                <span>🔬</span>
                <span>{isAr ? 'القياس السيكومتري الرياضي' : 'Psychometric Mathematics'}</span>
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {isAr
                  ? 'تعتمد جميع المقاييس على أوزان إحصائية مستنبطة من أبحاث علمية محكّمة لتوليد درجات معيارية خالية من التحيز والتخمين.'
                  : 'All assessments utilize standardized statistical weightings derived from peer-reviewed literature for objective normalization.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
              <h3 className="font-bold text-sky-300 flex items-center gap-1.5">
                <span>🤖</span>
                <span>{isAr ? 'ذكاء اصطناعي مسؤول (Gemini)' : 'Ethical AI Models'}</span>
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {isAr
                  ? 'توظيف واجهات برمجة تطبيقات Google Gemini لتحويل الأرقام والإحصاءات إلى توصيات سردية مثرية تراعي السياق الثقافي والاجتماعي.'
                  : 'Employing Google Gemini APIs to translate mathematical scores into nuanced, culturally contextual narrative advice.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 space-y-2">
              <h3 className="font-bold text-emerald-300 flex items-center gap-1.5">
                <span>☁️</span>
                <span>{isAr ? 'بنية Google Cloud المشفرة' : 'Encrypted Google Cloud'}</span>
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {isAr
                  ? 'استضافة أوروبية فائقة السرعة على خوادم Google Cloud (Europe-West1) مع تشفير TLS 1.3 وقواعد Firestore الصارمة.'
                  : 'Hosted on enterprise Google Cloud Platform (Europe-West1) with end-to-end TLS 1.3 encryption and hardened Firestore rules.'}
              </p>
            </div>
          </div>
        </div>

        {/* Section: Who We Are & Non-Affiliation Declaration (Crucial User Request) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-purple-950/40 border border-blue-500/30 shadow-xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-['Alexandria']">
                {isAr ? 'فريق العمل والملكية والاستقلالية' : 'Ownership, Engineering Team & Independence'}
              </h2>
              <p className="text-xs text-blue-300/80">
                {isAr ? 'عمّان، المملكة الأردنية الهاشمية' : 'Amman, Hashemite Kingdom of Jordan'}
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
            <p>
              {isAr
                ? 'يقوم على تطوير وإدارة وتحديث موقع «مرآة القلوب» مجموعة من المهندسين ومطوري البرمجيات المستقلين في عمّان - الأردن، انطلاقاً من شغفهم بالابتكار الرقمي وبناء أدوات تفاعلية تخدم المجتمع العربي وتلبي احتياجات الزوار الفعلية في بيئة آمنة.'
                : 'Mirror of Hearts is developed, engineered, and maintained by an independent group of software engineers and developers based in Amman, Jordan. The project stems from a dedication to building dignified, value-driven digital tools for users worldwide.'}
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-blue-500/20 text-xs space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'إقرارات وتوضيحات استقلالية ملزمة:' : 'Binding Declarations of Independence:'}</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>
                  {isAr
                    ? 'هذا الموقع مستقل تماماً ولا ينتمي إلى أي جهة حكومية، أو منظمة دولية، أو حزب سياسي، أو شركة تجارية كبرى.'
                    : 'This platform is entirely independent and is not affiliated with any governmental entity, international agency, political organization, or corporate giant.'}
                </li>
                <li>
                  {isAr
                    ? 'لا يهدف الموقع إطلاقاً إلى جمع البيانات، أو بيعها، أو مشاركتها، أو استغلالها تجارياً بأي شكل من الأشكال.'
                    : 'The platform never collects, monetizes, trades, shares, or exploits user data under any circumstance.'}
                </li>
                <li>
                  {isAr
                    ? 'الموقع لا يقدم أي اشتراكات مدفوعة، ولا يطلب بطاقات ائتمان، ولا يفرض أي رسوم على خدماته.'
                    : 'The platform offers no paid subscriptions, never solicits payment cards, and charges zero service fees.'}
                </li>
                <li>
                  {isAr
                    ? 'الموقع لا يسمح برفع صور شخصية للمستخدمين صيانة للحرمة والخصوصية ومكافحة الانتحال.'
                    : 'User photograph uploads are strictly disallowed to maintain sanctity, privacy, and prevent impersonation.'}
                </li>
                <li>
                  {isAr
                    ? 'الموقع لا يقدم خدمات زواج أو خطبة أو وساطة فعلية، بل يقدم مقاييس ورؤى معرفية وتثقيفية فقط.'
                    : 'The platform does not provide actual matchmaking, dating agency, or marriage brokerage services; it provides self-knowledge insights.'}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section: Mandatory Legal Disclaimer */}
        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <div className="font-bold text-amber-300">
              {isAr ? 'تنبيه قانوني واستشاري إلزامي:' : 'Mandatory Legal & Advisory Disclaimer:'}
            </div>
            <p>
              {isAr
                ? 'النتائج والتقارير والتحليلات المقدمة داخل موقع «مرآة القلوب» هي لأغراض معرفية وتثقيفية واستكشافية فقط، وليست استشارات نفسية أو قانونية أو طبية أو مهنية مرخصة، ولا تمثل بأي حال من الأحوال ضماناً لنجاح أو استمرار أي علاقة أو ارتباط زوجي.'
                : 'Results, metrics, and narrative breakdowns provided within Mirror of Hearts are for educational, exploratory, and self-reflection purposes only. They do not constitute licensed medical, clinical, legal, or psychological counseling, nor do they guarantee marital longevity or interpersonal success.'}
            </p>
          </div>
        </div>

        {/* Section: Interactive FAQ Accordion */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-['Alexandria']">
                {isAr ? 'الأسئلة الشائعة حول المنصة (FAQ)' : 'Frequently Asked Questions (FAQ)'}
              </h2>
              <p className="text-xs text-slate-400">
                {isAr ? 'إجابات واضحة وشفافة عن كل ما يتعلق بخدماتنا وخصوصيتك' : 'Clear and transparent answers regarding our tools and privacy'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-white/5 bg-slate-950/60 overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 text-right sm:text-start flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-white hover:text-rose-400 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-rose-400' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-1 text-xs sm:text-sm text-slate-300 border-t border-white/5 leading-relaxed bg-white/[0.02]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA & Internal Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-white/10">
          <div className="space-y-1">
            <h3 className="font-bold text-sm sm:text-base text-white">
              {isAr ? 'هل لديك أي استفسار أو اقتراح؟' : 'Have a question or feedback?'}
            </h3>
            <p className="text-xs text-slate-400">
              {isAr ? 'فريقنا البرمجي في عمّان يرحب بتواصلك على الدوام.' : 'Our engineering team in Amman welcomes your inquiries.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigatePage('contact')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{isAr ? 'اتصل بنا الآن' : 'Contact Us'}</span>
            </button>
            <button
              onClick={() => onNavigatePage('how-it-works')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isAr ? 'كيف يعمل الموقع؟' : 'How It Works'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
