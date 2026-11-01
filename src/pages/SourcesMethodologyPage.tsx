import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Brain,
  Layers,
  Scale,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Globe,
  FileText,
  Bookmark,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageSEO } from '../components/PageSEO';
import { AdSenseBanner } from '../components/AdSenseBanner';

interface Props {
  onBackToHome: () => void;
  onNavigatePage: (page: string) => void;
}

export const SourcesMethodologyPage: React.FC<Props> = ({
  onBackToHome,
  onNavigatePage,
}) => {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const isAr = language === 'ar';

  const academicReferences = isAr
    ? [
        {
          title: 'نموذج البيت العلائقي المتين (Sound Relationship House Theory)',
          author: 'د. جون غوتمان (Dr. John M. Gottman & Dr. Julie Schwartz Gottman, 1999)',
          journal: 'The Gottman Institute & Journal of Family Psychology',
          details:
            'يركز هذا النموذج على بناء خرائط الحب المعرفية، والتعبير عن الإعجاب والتقدير، والاستجابة لمحاولات التقارب والترميم العاطفي (Repair Attempts)، وإدارة الخلافات الزوجية بأسلوب متزن بدلاً من التجريح أو الانسحاب الدفاعي.',
        },
        {
          title: 'نظرية التعلق العاطفي للراشدين (Adult Attachment Theory - ECR-R)',
          author: 'جون بولبي، ماري إينسورث، وكريس فرالي (Bowlby, Ainsworth, & Fraley et al., 2000)',
          journal: 'Journal of Personality and Social Psychology',
          details:
            'أداة قياس مقننة تقيس بعدين أساسيين في العلاقات: قلق التعلق (Attachment Anxiety) وتجنب التعلق (Attachment Avoidance). تساعد الأفراد في تحديد نمط ارتباطهم (الآمن، القلق، أو التجنبي) وتأثيره المباشر على الأمان الزوجي.',
        },
        {
          title: 'نظرية الحب الثلاثية ومثلث المشاعر (Triangular Theory of Love)',
          author: 'روبرت ستيرنبرغ (Robert J. Sternberg, 1986)',
          journal: 'Psychological Review, 93(2), 119-135',
          details:
            'تحدد النظرية ثلاثة أركان أساسية للعلاقات: الحميمية (Intimacy - القرب الوجداني)، الشغف (Passion - الجاذبية والطاقة المشتركة)، والالتزام (Commitment - القرار الواعي باستمرار وبناء العلاقة).',
        },
        {
          title: 'مقياس السمات الـ16 ونظرية الشخصية (16 Personality Factor Questionnaire)',
          author: 'ريموند كاتل (Raymond B. Cattell, 1946 / 1993)',
          journal: 'Institute for Personality and Ability Testing (IPAT)',
          details:
            'من أقدم وأدق المقاييس السيكومترية التي تحلل الشخصية عبر 16 سمة أولية وخمسة أبعاد عالمية عليا، مما يساعد في فهم أساليب حل المشكلات، والاتزان الوجداني، والتفاعل الاجتماعي.',
        },
        {
          title: 'نظرية الذكاءات المتعددة (Multiple Intelligences Theory)',
          author: 'هوارد جاردنر ووالتر ماكينزي (Howard Gardner, 1983; Walter McKenzie, 1999)',
          journal: 'Frames of Mind: The Theory of Multiple Intelligences',
          details:
            'تجاوز المفهوم التقليدي الضيق للذكاء ليشمل 8 مسارات معرفية متكاملة: الذكاء اللغوي، المنطقي، البصري المكاني، الموسيقي، الحركي، الاجتماعي التفاعلي، والتأملي الذاتي والطبيعي.',
        },
        {
          title: 'علم النفس المالي ومخططات الإنفاق (Financial Psychology & Money Scripts)',
          author: 'برادلي كلونتز وتيد كلونتز (Dr. Bradley Klontz & Ted Klontz, 2011)',
          journal: 'Journal of Financial Therapy',
          details:
            'دراسة المعتقدات اللاواعية حول المال والإنفاق وكيف تؤثر على الاستقرار الأسري وتوافق الشريكين في إدارة الميزانية المنزلية.',
        },
      ]
    : [
        {
          title: 'The Sound Relationship House Theory',
          author: 'Dr. John M. Gottman & Dr. Julie Schwartz Gottman (1999)',
          journal: 'The Gottman Institute & Journal of Family Psychology',
          details:
            'Focuses on building cognitive love maps, sharing admiration, responding to bids for connection, utilizing repair attempts during conflict, and establishing shared existential meaning.',
        },
        {
          title: 'Adult Attachment Theory & The ECR-R Inventory',
          author: 'John Bowlby, Mary Ainsworth, & R. Chris Fraley et al. (2000)',
          journal: 'Journal of Personality and Social Psychology',
          details:
            'A psychometrically validated construct measuring attachment anxiety and attachment avoidance, enabling individuals to recognize whether their attachment blueprint is secure, anxious, or avoidant.',
        },
        {
          title: 'Triangular Theory of Love',
          author: 'Robert J. Sternberg (1986)',
          journal: 'Psychological Review, 93(2), 119-135',
          details:
            'Defines relationship dynamics through three intersecting vertices: intimacy (emotional warmth and vulnerability), passion (physical attraction and drive), and commitment (conscious decision to sustain partnership).',
        },
        {
          title: 'Cattell 16 Personality Factor Model (16PF)',
          author: 'Raymond B. Cattell (1946 / 1993)',
          journal: 'Institute for Personality and Ability Testing (IPAT)',
          details:
            'A foundational psychometric model identifying 16 primary personality factors alongside 5 global second-order dimensions, mapping behavioral stability, warmth, and cognitive problem-solving.',
        },
        {
          title: 'Multiple Intelligences Theory',
          author: 'Howard Gardner (1983) & Walter McKenzie (1999)',
          journal: 'Frames of Mind: The Theory of Multiple Intelligences',
          details:
            'Expands beyond singular IQ metrics into 8 distinct cognitive pathways: verbal-linguistic, logical-mathematical, spatial, interpersonal, intrapersonal, bodily-kinesthetic, and naturalist.',
        },
        {
          title: 'Financial Psychology & Money Scripts Inventory',
          author: 'Dr. Bradley Klontz & Ted Klontz (2011)',
          journal: 'Journal of Financial Therapy',
          details:
            'Examines subconscious financial beliefs and habits to understand how differing money perspectives affect domestic harmony and long-term marital equilibrium.',
        },
      ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isAr ? 'المصادر والمنهجية العلمية | مرآة القلوب' : 'Sources & Methodology | Mirror of Hearts',
    description: isAr
      ? 'شرح تفصيلي للمرجعيات الأكاديمية والمقاييس السيكومترية المعتمدة وحدود الخوارزميات في منصة مرآة القلوب.'
      : 'Comprehensive breakdown of peer-reviewed academic sources, psychometric models, and algorithmic boundaries.',
    url: 'https://miratalqulub.com/#/methodology',
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
            ? 'المصادر والمنهجية العلمية | مرآة القلوب - المرجعيات الأكاديمية وحدود القياس'
            : 'Sources & Methodology | Mirror of Hearts - Academic References'
        }
        description={
          isAr
            ? 'اطلع على الأطر العلمية والمصادر الأكاديمية المنشورة التي تستند إليها منصة مرآة القلوب، ومعايير القياس السيكومتري والفرق بين التثقيف والتشخيص العيادي.'
            : 'Explore the academic frameworks, peer-reviewed psychology literature, and psychometric boundaries of Mirror of Hearts.'
        }
        canonicalPath="/#/methodology"
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
            <span className="text-white font-bold">{isAr ? 'المصادر والمنهجية' : 'Sources & Methodology'}</span>
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
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-slate-900/80 to-purple-950/40 border border-indigo-500/30 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold">
                <Brain className="w-3 h-3" />
                <span>{isAr ? 'توثيق أكاديمي ومقاييس سيكومترية منشورة' : 'Peer-Reviewed Academic Frameworks'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-['Alexandria'] mt-1">
                {isAr ? 'المصادر والمنهجية العلمية' : 'Sources & Scientific Methodology'}
              </h1>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            {isAr
              ? 'تلتزم منصة «مرآة القلوب» بنقل المعرفة النفسية بأسلوب علمي رصين، وتبيان المرجعيات الأكاديمية التي استندت إليها استبياناتنا، مع توضيح حدود الخوارزميات والفرق بين التثقيف والتشخيص العيادي.'
              : 'Mirror of Hearts strictly adheres to transparent, academic psychological literature. Here we detail the published models underlying our tools, alongside the fundamental distinction between self-education and clinical diagnosis.'}
          </p>
        </div>

        {/* AdSense In-Page Banner */}
        <AdSenseBanner slot="6789012345" format="auto" />

        {/* Critical Distinction: Self-Exploration vs Clinical Diagnosis */}
        <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-sm sm:text-base">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <span>{isAr ? 'الفرق الجوهري بين التثقيف الذاتي والتشخيص العيادي:' : 'Critical Distinction: Educational Reflection vs Clinical Diagnosis:'}</span>
          </div>
          <div className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
            <p>
              {isAr
                ? 'تهدف استبيانات ومقاييس «مرآة القلوب» إلى فتح مساحة آمنة للتأمل الفردي واكتشاف أنماط التفكير والتعبير الوجداني. لا تشكل هذه الأدوات بأي حال من الأحوال تشخيصاً لاضطرابات الشخصية أو تقييماً طبياً أو عيادياً أو علاجاً نفسياً.'
                : 'The inventories on Mirror of Hearts are designed to foster introspective self-awareness and mindful dialogue. They do not constitute clinical diagnostic evaluations, psychopathology assessments, psychiatric diagnoses, or medical treatment.'}
            </p>
            <p className="text-amber-200/90 font-medium">
              {isAr
                ? 'التشخيص النفسي العيادي يتطلب جلسات مقابلة معمقة ومباشرة يشرف عليها أخصائيون نفسيون أو أطباء نفسيون مرخصون وفق معايير الدليل التشخيصي (DSM-5 / ICD-11).'
                : 'Formal psychological and psychiatric diagnoses require comprehensive in-person evaluations conducted by licensed clinicians adhering to international diagnostic criteria (DSM-5 / ICD-11).'}
            </p>
          </div>
        </div>

        {/* Academic References Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-indigo-400" />
            <h2 className="text-lg font-bold text-white font-['Alexandria']">
              {isAr ? 'المرجعيات الأكاديمية والمقاييس المعتمدة' : 'Academic Frameworks & Published References'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {academicReferences.map((ref, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition space-y-2.5"
              >
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-white font-['Alexandria'] leading-snug">
                    {ref.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-indigo-300">{ref.author}</div>
                  <div className="text-[10px] text-slate-400 font-mono italic">{ref.journal}</div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{ref.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Algorithmic Boundaries and Humility */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm sm:text-base">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>{isAr ? 'حدود الخوارزميات والمعالجة الحسابية' : 'Algorithmic Boundaries & Mathematical Humility'}</span>
          </div>
          <div className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
            <p>
              {isAr
                ? 'مهما بلغت خوارزميات الذكاء الاصطناعي من تطور، فإن العلاقات البشرية تتسم بالتعقيد العاطفي والظروف الحياتية المتغيرة التي لا يمكن لأي برنامج حاسوبي التنبؤ بها كلياً. تستخدم الخوارزمية أوزاناً معيارية محددة للمقارنة بين إجابات الاستبيان، ولكن اتخاذ القرارات الحياتية والزوجية يظل مسؤولية شخصية تامة تخص الأطراف المعنية.'
                : 'Regardless of algorithmic sophistication, human partnerships involve nuances, values, and evolving life circumstances that no machine model can compute with totality. Our deterministic rubrics measure directional resonance, leaving all life choices to the conscious sovereignty of individuals.'}
            </p>
          </div>
        </div>

        {/* Footer Navigation Back Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-slate-900/50 border border-white/5">
          <button
            onClick={() => onNavigatePage('how-it-works')}
            className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <span>{isAr ? 'انتقل إلى: كيف يعمل الموقع بالتفصيل' : 'View: How The Platform Works'}</span>
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
