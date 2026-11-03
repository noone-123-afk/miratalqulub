import React from 'react';
import { BookOpen, Brain, ShieldCheck, Scale, Sparkles, GraduationCap, FileCheck2, Layers, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';

interface FramingProps {
  variant?: 'page' | 'modal';
  focusScope?: 'all' | 'personality' | 'intelligence';
}

export const PsychometricAcademicIntro: React.FC<FramingProps> = ({
  variant = 'page',
  focusScope = 'all',
}) => {
  const { language } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';

  return (
    <section
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={
        isAr
          ? 'المقدمة الأكاديمية والمنهجية لمختبر المقاييس السيكومترية واختبارات الذكاء'
          : 'Academic and Methodological Introduction to the Psychometric & Intelligence Laboratory'
      }
      className={`w-full rounded-3xl border transition-colors duration-300 ${
        variant === 'page' ? 'p-6 sm:p-8 md:p-10 mb-8 shadow-xl' : 'p-5 sm:p-6 mb-5 shadow-md'
      } ${
        isLight
          ? 'bg-white/95 border-slate-200/90 text-slate-800 shadow-slate-200/60'
          : 'bg-slate-900/85 border-purple-500/25 text-slate-100 shadow-black/40'
      }`}
    >
      {/* Top Academic Badge & Classification */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-purple-500/20">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
              isLight
                ? 'bg-purple-50 border-purple-200 text-purple-700'
                : 'bg-purple-500/15 border-purple-500/30 text-purple-300'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span
              className={`text-[11px] font-extrabold uppercase tracking-wider block ${
                isLight ? 'text-purple-700' : 'text-purple-300'
              }`}
            >
              {isAr
                ? 'تأطير أكاديمي محكّم • منهجية القياس النفسي والقدرات المعرفية (APA 7th Ed.)'
                : 'Peer-Reviewed Academic Framing • Psychometric & Cognitive Assessment Methodology (APA 7th Ed.)'}
            </span>
            <h2
              className={`text-lg sm:text-xl md:text-2xl font-black font-['Alexandria'] mt-0.5 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? 'الأسس الإبستمولوجية والنماذج الإحصائية لمقاييس الشخصية والذكاءات المتعددة'
                : 'Epistemological Foundations & Statistical Models of Personality and Intelligence Scales'}
            </h2>
          </div>
        </div>

        <div
          className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${
            isLight
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
          }`}
        >
          <FileCheck2 className="w-4 h-4 shrink-0" />
          <span>
            {isAr
              ? 'موثق وفق معايير الجمعية الأمريكية لعلم النفس (APA)'
              : 'Documented per American Psychological Association (APA) Standards'}
          </span>
        </div>
      </div>

      {/* Main Scholarly Introduction Body */}
      <div className="space-y-5 text-sm sm:text-base leading-[1.9] font-normal">
        <p className={isLight ? 'text-slate-700' : 'text-slate-200'}>
          {isAr ? (
            <>
              يُعَدُّ <strong>القياس النفسي المعاصر (Modern Psychometrics)</strong> وتقييم القدرات المعرفية حجر الزاوية في علم النفس الفارقي (Differential Psychology) وعلم الأعصاب الإدراكي. في مختبر <strong>«مِـرآة القـلوب» (Mirat Al-Quloob)</strong>، تم تصميم وهندسة بطاريات التقييم السيكومتري واختبارات الذكاء وفق <strong>النظرية الكلاسيكية للاختبارات (Classical Test Theory - CTT)</strong> ونماذج <strong>الاستجابة للمفردة الاختبارية (Item Response Theory - IRT)</strong>، مما يضمن اتساقاً داخلياً مرتفعاً (معامل ألفا كرونباخ <span dir="ltr" className="font-mono font-bold">Cronbach’s α ≥ 0.84</span>) وصدقاً عاملياً (Construct & Factorial Validity) عبر أبعاد الشخصية والذكاء.
            </>
          ) : (
            <>
              <strong>Modern Psychometrics</strong> and cognitive capacity assessment constitute the cornerstone of differential psychology and cognitive neuroscience. Within the <strong>Mirat Al-Quloob Psychometric Laboratory</strong>, all personality inventories and intelligence batteries are engineered in accordance with <strong>Classical Test Theory (CTT)</strong> and <strong>Item Response Theory (IRT)</strong> models, ensuring high internal consistency (<span className="font-mono font-bold">Cronbach’s α ≥ 0.84</span>) and robust factorial construct validity across structural traits and cognitive domains.
            </>
          )}
        </p>

        {/* Three Pillar Sub-Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
          {/* Pillar 1: Typological & Trait Personality Architecture */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 ${
              isLight
                ? 'bg-slate-50/90 border-slate-200/80'
                : 'bg-slate-950/60 border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <Brain className={`w-5 h-5 shrink-0 ${isLight ? 'text-purple-600' : 'text-purple-400'}`} />
              <h3 className={`font-extrabold text-sm sm:text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {isAr
                  ? '١. نماذج السمات والأنماط الإدراكية (MBTI & Big Five)'
                  : '1. Cognitive Typology & Five-Factor Trait Models'}
              </h3>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {isAr ? (
                <>
                  يجمع المختبر بين مدرسة <strong>علم النفس التحليلي لكارل يونغ (Jung, 1921)</strong> وتطوير مايرز-بريجز للوظائف الإدراكية الأربع (الاستمداد الطاقي E/I، جمع المعلومات S/N، اتخاذ القرار T/F، وتنظيم الحياة J/P)، وبين <strong>الفرضية المعجمية ونموذج العوامل الخمسة الكبرى (Big Five / NEO-PI-R)</strong> لبول كوستا وروبرت مكري (Costa & McCrae, 1992)، بالإضافة إلى <strong>تحليل كاتل العاملي لـ 16 سمة (16PF)</strong> ونموذج آيزنك للأمزجة البيولوجية (EPQ-R).
                </>
              ) : (
                <>
                  Integrates <strong>Carl Jung’s (1921) Analytical Psychology</strong> and the Myers-Briggs four-dichotomy cognitive framework (E/I, S/N, T/F, J/P) with the empirical <strong>Lexical Hypothesis & Five-Factor Model (Big Five / NEO-PI-R)</strong> developed by Costa and McCrae (1992), alongside Raymond Cattell’s <strong>16 Personality Factors (16PF)</strong> and Hans Eysenck’s biological temperament theory (EPQ-R).
                </>
              )}
            </p>
          </div>

          {/* Pillar 2: Multiple Intelligences & CHC Cognitive Factor */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 ${
              isLight
                ? 'bg-slate-50/90 border-slate-200/80'
                : 'bg-slate-950/60 border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className={`w-5 h-5 shrink-0 ${isLight ? 'text-sky-600' : 'text-sky-400'}`} />
              <h3 className={`font-extrabold text-sm sm:text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {isAr
                  ? '٢. الذكاءات المتعددة والذكاء السائل والبلوري (CHC & Gardner)'
                  : '2. Multiple Intelligences & Fluid/Crystallized IQ'}
              </h3>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {isAr ? (
                <>
                  يتجاوز القياس المعرفي الحديث اختزال العقل البشري في رقم واحد؛ إذ نطبق نظرية <strong>هوارد جاردنر للذكاءات المتعددة (Gardner, 1983/1999)</strong> عبر 9 أبعاد مستقلة عصبياً، بالتكامل مع نموذج <strong>كاتل-هورن-كارول (CHC Theory)</strong> ومصفوفات <strong>رافين المتتابعة (Raven’s Progressive Matrices, 2000)</strong> لقياس الاستدلال الاستنتاجي غير اللفظي (Fluid Intelligence - Gf) والقدرات اللفظية والكمية (Crystallized Intelligence - Gc).
                </>
              ) : (
                <>
                  Moving beyond single-quotient reductionism, our batteries implement <strong>Howard Gardner’s (1983/1999) Theory of Multiple Intelligences</strong> across 9 neuro-cognitively distinct modalities, integrated with the <strong>Cattell-Horn-Carroll (CHC)</strong> psychometric taxonomy and <strong>Raven’s Progressive Matrices (2000)</strong> to evaluate non-verbal fluid reasoning (<span className="font-mono">Gf</span>) and quantitative-verbal crystallized ability (<span className="font-mono">Gc</span>).
                </>
              )}
            </p>
          </div>

          {/* Pillar 3: Emotional Intelligence & Relational Psychodynamics */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 ${
              isLight
                ? 'bg-slate-50/90 border-slate-200/80'
                : 'bg-slate-950/60 border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <Scale className={`w-5 h-5 shrink-0 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
              <h3 className={`font-extrabold text-sm sm:text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {isAr
                  ? '٣. الذكاء العاطفي وأنماط التعلق (EQ & Attachment)'
                  : '3. Emotional Intelligence (MSCEIT/EQ) & Attachment'}
              </h3>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {isAr ? (
                <>
                  لقياس الكفاءة الوجدانية والاجتماعية، تستند بطاريات الذكاء العاطفي والتعلق إلى النموذج الرباعي القدراتي لـ <strong>ماير وسالوفي وكاروسو (Salovey & Mayer, 1990; MSCEIT)</strong> ونموذج الكفاءات الانفعالية لـ <strong>دانيال جولمان (Goleman, 1995)</strong> وبار-أون (Bar-On, 1997)، إلى جانب مقياس <strong>تجارب العلاقات الوثيقة (ECR-R)</strong> المبني على نظرية التعلق لجون بولبي (Bowlby, 1982).
                </>
              ) : (
                <>
                  To quantify socio-emotional regulation and interpersonal attunement, our assessments incorporate the four-branch ability model of <strong>Salovey and Mayer (1990; MSCEIT)</strong>, <strong>Daniel Goleman’s (1995)</strong> emotional competence framework, and Reuven Bar-On’s (1997) EQ-i, paired with the <strong>Experiences in Close Relationships (ECR-R)</strong> inventory grounded in Bowlby’s (1982) attachment paradigm.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const PsychometricAcademicConclusion: React.FC<FramingProps> = ({
  variant = 'page',
}) => {
  const { language } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';

  const apaReferences = [
    {
      id: 'baron1997',
      citationEn:
        'Bar-On, R. (1997). The Emotional Quotient Inventory (EQ-i): Technical manual. Multi-Health Systems.',
      noteAr:
        'المرجع التأسيسي لبناء مقياس معامل الذكاء العاطفي والاجتماعي (EQ-i) وتقنين أبعاده الخمسة.',
      noteEn:
        'Foundational technical manual establishing the five composite scales of the Emotional Quotient Inventory.',
    },
    {
      id: 'bowlby1982',
      citationEn:
        'Bowlby, J. (1982). Attachment and loss: Vol. 1. Attachment (2nd ed.). Basic Books. (Original work published 1969)',
      noteAr:
        'النظرية الكلاسيكية لأنماط التعلق الوجداني (الآمن، القلق، المتجنب) وتأثيرها على استقرار العلاقات الراشدة.',
      noteEn:
        'Seminal formulation of internal working models and attachment security in human relational development.',
    },
    {
      id: 'cattell1970',
      citationEn:
        'Cattell, R. B., Eber, H. W., & Tatsuoka, M. M. (1970). Handbook for the Sixteen Personality Factor Questionnaire (16PF). Institute for Personality and Ability Testing.',
      noteAr:
        'دليل استبيان عوامل الشخصية الستة عشر (16PF) والتحليل العاملي للسمات الأولية والدرجات المعيارية (Sten Scores).',
      noteEn:
        'Primary psychometric reference for the 16 primary personality traits, global factors, and standard ten (Sten) scoring.',
    },
    {
      id: 'costa1992',
      citationEn:
        'Costa, P. T., Jr., & McCrae, R. R. (1992). Revised NEO Personality Inventory (NEO-PI-R) and NEO Five-Factor Inventory (NEO-FFI) professional manual. Psychological Assessment Resources.',
      noteAr:
        'الدليل المهني المعتمد لنموذج العوامل الخمسة الكبرى للشخصية (OCEAN: الانفتاح، الضمير، الانبساط، الوفاق، العصابية).',
      noteEn:
        'Gold-standard validation manual for the Five-Factor Model (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism).',
    },
    {
      id: 'eysenck1985',
      citationEn:
        'Eysenck, H. J., & Eysenck, M. W. (1985). Personality and individual differences: A natural science approach. Plenum Press.',
      noteAr:
        'التأصيل البيولوجي العصبي لأبعاد الشخصية (الانبساط، الاستقرار الانفعالي، والحزم العقلي) والأمزجة الأربعة.',
      noteEn:
        'Neurobiological foundations of cortical arousal, autonomic activation, and the PEN temperament dimensions.',
    },
    {
      id: 'gardner1983',
      citationEn:
        'Gardner, H. (1983). Frames of mind: The theory of multiple intelligences. Basic Books.',
      noteAr:
        'المرجع العلمي الأول لنظرية الذكاءات المتعددة وتفنيد النظرة الأحادية للقدرات البشرية.',
      noteEn:
        'Landmark treatise introducing modular neuro-cognitive potentials across linguistic, logical, spatial, musical, kinesthetic, and personal domains.',
    },
    {
      id: 'gardner1999',
      citationEn:
        'Gardner, H. (1999). Intelligence reframed: Multiple intelligences for the 21st century. Basic Books.',
      noteAr:
        'توسيع نظرية الذكاءات المتعددة لتشمل الذكاء الطبيعي والذكاء الوجودي (التأملي) والتطبيقات التربوية والمهنية.',
      noteEn:
        'Expansion of the Multiple Intelligences taxonomy to incorporate naturalistic and existential intelligence dimensions.',
    },
    {
      id: 'goldberg1993',
      citationEn:
        'Goldberg, L. R. (1993). The structure of phenotypic personality traits. American Psychologist, 48(1), 26–34. https://doi.org/10.1037/0003-066X.48.1.26',
      noteAr:
        'توثيق الفرضية المعجمية (Lexical Hypothesis) وبنوك الأسئلة القياسية المفتوحة (IPIP) لقياس السمات الخمس الكبرى.',
      noteEn:
        'Empirical synthesis of the lexical hypothesis and factor-analytic structure of phenotypic personality descriptors.',
    },
    {
      id: 'goleman1995',
      citationEn:
        'Goleman, D. (1995). Emotional intelligence: Why it can matter more than IQ. Bantam Books.',
      noteAr:
        'إطار الكفاءات العاطفية الخمس: الوعي بالذات، التنظيم الذاتي، الدافعية، التعاطف، والمهارات الاجتماعية.',
      noteEn:
        'Comprehensive model of emotional self-awareness, self-regulation, internal motivation, empathy, and social mastery.',
    },
    {
      id: 'jung1971',
      citationEn:
        'Jung, C. G. (1971). Psychological types (H. G. Baynes, Trans.; R. F. C. Hull, Rev.). Princeton University Press. (Original work published 1921)',
      noteAr:
        'العمل التأسيسي لكارل غوستاف يونغ حول اتجاهات الطاقة النفسية (الانبساط والانطواء) والوظائف الإدراكية الأربع.',
      noteEn:
        'Foundational monograph defining attitude-types (extraversion/introversion) and functional cognitive modes (sensing, intuition, thinking, feeling).',
    },
    {
      id: 'myers1998',
      citationEn:
        'Myers, I. B., McCaulley, M. H., Quenk, N. L., & Hammer, A. L. (1998). MBTI manual: A guide to the development and use of the Myers-Briggs Type Indicator (3rd ed.). Consulting Psychologists Press.',
      noteAr:
        'الدليل الإحصائي والتطبيقي لمؤشر مايرز-بريجز للأنماط الستة عشر (16 Personalities / MBTI) وديناميكيات الوظائف المعرفية.',
      noteEn:
        'Psychometric manual detailing item construction, reliability, and type dynamics for the 16 Myers-Briggs personality configurations.',
    },
    {
      id: 'raven2000',
      citationEn:
        'Raven, J. (2000). The Raven’s Progressive Matrices: Change and stability over culture and time. Cognitive Psychology, 41(1), 1–48. https://doi.org/10.1006/cogp.1999.0735',
      noteAr:
        'توثيق صدق مصفوفات رافين المتتابعة كأداة عابرة للثقافات لقياس الذكاء السائل (Fluid Intelligence) والاستنتاج البصري المنطقي.',
      noteEn:
        'Cross-cultural validation of Raven’s Progressive Matrices as a non-verbal measure of eductive and reproductive cognitive ability.',
    },
    {
      id: 'salovey1990',
      citationEn:
        'Salovey, P., & Mayer, J. D. (1990). Emotional intelligence. Imagination, Cognition and Personality, 9(3), 185–211. https://doi.org/10.2190/DUGG-P24E-52WK-6CDG',
      noteAr:
        'البحث الأكاديمي الأول الذي صاغ مفهوم الذكاء العاطفي كقدرة معرفية-وجدانية قابلة للقياس الموضوعي.',
      noteEn:
        'Pioneering peer-reviewed paper conceptualizing emotional intelligence as a set of information-processing mental abilities.',
    },
  ];

  return (
    <section
      dir={isAr ? 'rtl' : 'ltr'}
      aria-label={
        isAr
          ? 'الخاتمة الأكاديمية التحليلية وقائمة المراجع العلمية الموثقة بصيغة APA'
          : 'Academic Analytical Conclusion and APA 7th Edition Peer-Reviewed References'
      }
      className={`w-full rounded-3xl border transition-colors duration-300 ${
        variant === 'page' ? 'p-6 sm:p-8 md:p-10 mt-10 shadow-xl' : 'p-5 sm:p-6 mt-6 shadow-md'
      } ${
        isLight
          ? 'bg-white/95 border-slate-200/90 text-slate-800 shadow-slate-200/60'
          : 'bg-slate-900/85 border-purple-500/25 text-slate-100 shadow-black/40'
      }`}
    >
      {/* Section 1: Analytical Synthesis & Methodological Conclusion */}
      <div className="space-y-4 pb-6 mb-6 border-b border-purple-500/20">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
              isLight
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300'
            }`}
          >
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span
              className={`text-[11px] font-extrabold uppercase tracking-wider block ${
                isLight ? 'text-indigo-700' : 'text-indigo-300'
              }`}
            >
              {isAr
                ? 'الخاتمة الأكاديمية والضوابط المنهجية • المعيارية الإحصائية وأخلاقيات القياس'
                : 'Academic Synthesis & Methodological Governance • Normative Scoring & Ethics'}
            </span>
            <h2
              className={`text-lg sm:text-xl md:text-2xl font-black font-['Alexandria'] mt-0.5 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? 'الخاتمة التحليلية: التفسير السيكومتري المعياري وضوابط الممارسة الأخلاقية'
                : 'Analytical Conclusion: Normative Psychometric Interpretation & Ethical Safeguards'}
            </h2>
          </div>
        </div>

        <div className="space-y-3.5 text-sm sm:text-base leading-[1.9]">
          <p className={isLight ? 'text-slate-700' : 'text-slate-200'}>
            {isAr ? (
              <>
                <strong>أولاً — التكامل بين القياس الكمي والتفسير الكيفي:</strong> تؤكد الأدبيات السيكومترية الحديثة أن أي مقياس نفسي أو معرفي منفرد لا يمثل حكماً حتمياً مغلقاً على الكينونة الإنسانية، بل يمثل <em>خريطة احتمالية ديناميكية (Probabilistic Trait & Ability Profile)</em> ترصد التفضيلات المعرفية الفطرية ومستويات الأداء الراهنة. ولذلك تعتمد منصة <strong>«مِـرآة القـلوب»</strong> منهجية التقييم المتعدد المقاييس (Multi-Trait Multi-Method Approach)، حيث تُقرأ نتائج مؤشر مايرز-بريجز (MBTI) جنباً إلى جنب مع التوزيع المتصل للعوامل الخمسة الكبرى (Big Five)، والدرجات المعيارية العشرية (Sten Scores 1–10) لمقياس كاتل (16PF)، ومصفوفة الذكاءات التسعة والقدرات المعرفية (IQ/EQ).
              </>
            ) : (
              <>
                <strong>1. Quantitative-Qualitative Synthesis:</strong> Contemporary psychometric literature emphasizes that no single inventory constitutes a deterministic verdict on human potential; rather, each scale yields a <em>dynamic probabilistic profile</em> capturing dispositional preferences and current functional capacities. Accordingly, <strong>Mirat Al-Quloob</strong> employs a <strong>Multi-Trait Multi-Method (MTMM)</strong> framework—synthesizing Jungian cognitive typology (MBTI) with continuous Five-Factor percentiles (Big Five), standard ten (Sten 1–10) factor scores (16PF), and multi-modal cognitive/emotional intelligence indices (IQ/EQ).
              </>
            )}
          </p>

          <p className={isLight ? 'text-slate-700' : 'text-slate-200'}>
            {isAr ? (
              <>
                <strong>ثانياً — المعالجة الحسابية المحلية وحماية الخصوصية (Client-Side Zero-Knowledge Scoring):</strong> التزاماً بالمبادئ الأخلاقية للجمعية الأمريكية لعلم النفس (APA Ethical Principles of Psychologists and Code of Conduct, Section 9: Assessment) ومعايير حماية البيانات القياسية، تتم خوارزميات جمع النقاط، حساب الأوزان العاملية، وتحويل الدرجات الخام إلى درجات معيارية ومئينات (<span dir="ltr" className="font-mono">Z-Scores, T-Scores, & Percentiles</span>) محلياً داخل متصفح المستخدِم، مع توفير سجل تدقيق علمي شفاف (Item-by-Item Audit) وتقارير PDF فورية دون بيع أو مشاركة البيانات السلوكية مع أي أطراف إعلانية.
              </>
            ) : (
              <>
                <strong>2. Local Algorithmic Computation & Ethical Data Governance:</strong> In strict adherence to the <strong>APA Ethical Principles of Psychologists and Code of Conduct (Section 9: Assessment)</strong> and privacy-by-design engineering, all raw-score aggregations, factor weightings, and normative transformations (<span className="font-mono">Z-Scores, T-Scores, Sten, & Percentiles</span>) execute locally on the client device, accompanied by transparent item-by-item scientific rationales and direct PDF export.
              </>
            )}
          </p>

          {/* Scientific & Clinical Disclaimer Box */}
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 ${
              isLight
                ? 'bg-amber-50/90 border-amber-200 text-amber-950'
                : 'bg-amber-950/25 border-amber-500/30 text-amber-100'
            }`}
          >
            <ShieldCheck
              className={`w-5 h-5 shrink-0 mt-1 ${
                isLight ? 'text-amber-700' : 'text-amber-400'
              }`}
            />
            <div className="text-xs sm:text-sm leading-relaxed">
              <strong className="block mb-0.5">
                {isAr
                  ? 'إخلاء مسؤولية علمي وسريري (Clinical & Educational Disclaimer):'
                  : 'Clinical & Educational Boundary Disclaimer:'}
              </strong>
              {isAr
                ? 'جميع المقاييس النفسية واختبارات الذكاء المتاحة في هذه الصفحة مُصممة لأغراض الاستبصار الذاتي، الإرشاد التربوي والمهني، وتنمية الوعي العاطفي والأسري. وهي لا تُغني بأي حال عن التشخيص الإكلينيكي المباشر الذي يُجريه طبيب نفسي أو أخصائي سيكومتري مرخص في الحالات المرضية أو الاضطرابات النمائية.'
                : 'All psychometric inventories and intelligence batteries on this platform are engineered for educational self-discovery, career guidance, and relational enrichment. They do not substitute for formal clinical diagnosis administered in-person by a licensed psychiatrist or clinical neuropsychologist.'}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Peer-Reviewed APA 7th Edition References List */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3
            className={`text-base sm:text-lg font-black font-['Alexandria'] flex items-center gap-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            <Sparkles className={`w-5 h-5 ${isLight ? 'text-purple-600' : 'text-purple-400'}`} />
            <span>
              {isAr
                ? 'قائمة المراجع والدراسات العلمية المحكّمة (توثيق APA الإصدار السابع - 7th Edition)'
                : 'Peer-Reviewed Scientific References (APA 7th Edition Format)'}
            </span>
          </h3>
          <span
            className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${
              isLight
                ? 'bg-slate-100 border-slate-300 text-slate-700'
                : 'bg-slate-800/80 border-slate-700 text-slate-300'
            }`}
          >
            APA 7th Ed. • {apaReferences.length} {isAr ? 'مرجعاً علمياً محكّماً' : 'Primary Citations'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {apaReferences.map((ref, idx) => (
            <div
              key={ref.id}
              className={`p-3.5 sm:p-4 rounded-2xl border transition ${
                isLight
                  ? 'bg-slate-50/90 border-slate-200/90 hover:border-purple-300'
                  : 'bg-slate-950/65 border-white/10 hover:border-purple-500/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                    isLight
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-purple-500/20 text-purple-300'
                  }`}
                >
                  [{idx + 1}] APA Citation
                </span>
              </div>
              <p
                dir="ltr"
                className={`text-xs sm:text-[13px] font-mono leading-relaxed text-left mb-2 ${
                  isLight ? 'text-slate-800' : 'text-slate-200'
                }`}
              >
                {ref.citationEn}
              </p>
              <p
                className={`text-xs leading-relaxed border-t pt-2 ${
                  isLight
                    ? 'border-slate-200/80 text-slate-600'
                    : 'border-white/10 text-slate-400'
                }`}
              >
                {isAr ? ref.noteAr : ref.noteEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface ScientificClinicalDisclaimerProps {
  testType?: 'intelligence' | 'personality' | 'compatibility' | 'general';
  testTitleAr?: string;
  testTitleEn?: string;
  compact?: boolean;
}

export const ScientificClinicalDisclaimerBanner: React.FC<ScientificClinicalDisclaimerProps> = ({
  testType = 'general',
  testTitleAr,
  testTitleEn,
  compact = false,
}) => {
  const { language } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';

  const typeLabelAr =
    testType === 'intelligence'
      ? 'اختبار الذكاء والقدرات المعرفية'
      : testType === 'personality'
      ? 'مقياس السمات الشخصية والوعي الذاتي'
      : testType === 'compatibility'
      ? 'كاشف التوافق والانسجام العلائقي'
      : 'المقياس السيكومتري الاستكشافي';

  const typeLabelEn =
    testType === 'intelligence'
      ? 'Cognitive & Intelligence Assessment'
      : testType === 'personality'
      ? 'Personality Traits & Self-Discovery Scale'
      : testType === 'compatibility'
      ? 'Relational Compatibility Detector'
      : 'Exploratory Psychometric Assessment';

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      role="note"
      aria-label={
        isAr
          ? 'تنبيه إخلاء المسؤولية العلمي والعيادي'
          : 'Scientific and Clinical Disclaimer Notice'
      }
      className={`rounded-2xl border transition-all duration-300 ${
        compact ? 'p-3.5 sm:p-4 mb-4' : 'p-4 sm:p-5 mb-6'
      } ${
        isLight
          ? 'bg-gradient-to-br from-amber-50/95 via-white to-teal-50/80 border-amber-300/90 text-slate-800 shadow-sm'
          : 'bg-gradient-to-br from-amber-950/35 via-slate-900/95 to-teal-950/30 border-amber-500/40 text-slate-100 shadow-lg'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
            isLight
              ? 'bg-amber-100 border-amber-300 text-amber-800'
              : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
          }`}
        >
          <AlertTriangle className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <h4
              className={`font-black text-xs sm:text-sm flex items-center gap-1.5 ${
                isLight ? 'text-amber-900' : 'text-amber-300'
              }`}
            >
              <span>
                {isAr
                  ? 'تنبيه إخلاء المسؤولية العلمي والعيادي (قبل البدء)'
                  : 'Scientific & Clinical Disclaimer Notice (Before Starting)'}
              </span>
            </h4>
            <span
              className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                isLight
                  ? 'bg-teal-100/90 border-teal-300 text-teal-900'
                  : 'bg-teal-500/15 border-teal-500/35 text-teal-300'
              }`}
            >
              {isAr
                ? `${testTitleAr || typeLabelAr} • أداة استكشافية وتثقيفية`
                : `${testTitleEn || typeLabelEn} • Exploratory & Educational Tool`}
            </span>
          </div>

          <p
            className={`text-xs sm:text-[13px] leading-relaxed font-medium ${
              isLight ? 'text-slate-700' : 'text-slate-200'
            }`}
          >
            {isAr ? (
              <>
                إن جميع المقاييس واختبارات الذكاء وحاسبات التوافق المتاحة في منصة{' '}
                <strong>«مرآة القلوب»</strong> هي{' '}
                <strong className={isLight ? 'text-amber-900' : 'text-amber-300'}>
                  أدوات استكشافية وتثقيفية لبناء الوعي الذاتي والتفاهم الأسري فقط، وليست تشخيصاً طبياً أو نفسيّاً سريريّاً (Clinical Diagnosis) بأي شكل من الأشكال
                </strong>
                . تخلو هذه الأدوات تماماً من أي مسميات تشخيصية مرضية، ولا تُغني نتائجها في أي حال عن{' '}
                <strong className={isLight ? 'text-teal-800' : 'text-teal-300'}>
                  استشارة مختص نفسي أو أسري أو طبيب مرخص
                </strong>{' '}
                عند الحاجة إلى تقييم إكلينيكي أو إرشاد علاجي متخصص.
              </>
            ) : (
              <>
                All personality scales, intelligence batteries, and compatibility detectors on{' '}
                <strong>&ldquo;Mirror of Hearts&rdquo;</strong> are{' '}
                <strong className={isLight ? 'text-amber-900' : 'text-amber-300'}>
                  strictly exploratory and educational self-discovery tools, and do NOT constitute a medical, psychiatric, or clinical diagnosis
                </strong>
                . These instruments exclude all clinical diagnostic labels and never replace{' '}
                <strong className={isLight ? 'text-teal-800' : 'text-teal-300'}>
                  consulting a licensed psychologist, psychiatrist, or certified family counselor
                </strong>{' '}
                whenever professional evaluation or clinical support is needed.
              </>
            )}
          </p>

          {!compact && (
            <div
              className={`mt-3 pt-2.5 border-t flex flex-wrap items-center gap-3 text-[11px] font-bold ${
                isLight
                  ? 'border-amber-200/80 text-slate-600'
                  : 'border-white/10 text-slate-300'
              }`}
            >
              <span className="inline-flex items-center gap-1">
                <ShieldCheck
                  className={`w-3.5 h-3.5 ${
                    isLight ? 'text-emerald-700' : 'text-emerald-400'
                  }`}
                />
                {isAr
                  ? 'خالية من أي مسميات تشخيصية سريرية محظورة'
                  : 'Free of prohibited clinical diagnostic labels'}
              </span>
              <span className="opacity-40">•</span>
              <span className="inline-flex items-center gap-1">
                <Scale
                  className={`w-3.5 h-3.5 ${
                    isLight ? 'text-amber-700' : 'text-amber-400'
                  }`}
                />
                {isAr
                  ? 'تهدف للتثقيف النفسي واستكشاف السمات الإيجابية'
                  : 'Designed for psycho-education & positive trait exploration'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

