import React from 'react';
import {
  BookOpen,
  Brain,
  ShieldCheck,
  Lock,
  Scale,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  HeartHandshake,
  FileCheck2,
  Cpu,
} from 'lucide-react';
import { ProfileStep } from '../components/ProfileStep';
import { UserProfile } from '../types';
import { WebsiteTabKey } from '../components/WebsiteSectionsModal';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';

export interface HomePageProps {
  onStart: (profile: UserProfile) => void;
  initialProfile?: UserProfile | null;
  savedTestsCount?: number;
  onOpenSavedHistory?: () => void;
  onOpenBlindDate?: () => void;
  onOpenDomainHosting?: () => void;
  onOpenWebsiteSection?: (tab?: WebsiteTabKey) => void;
  onOpenPsychologyTests?: () => void;
  onOpenIntelligenceTests?: () => void;
  onOpenUserDashboard?: () => void;
  onOpenArticles?: () => void;
  onOpenNovels?: () => void;
  onOpenContactFeedback?: () => void;
}

/**
 * الكتلة النصية الأكاديمية والتحليلية الشاملة (Comprehensive Academic & Analytical Block)
 * معروضة بشكل ظاهر ومرئي بالكامل أسفل حاسبة التوافق مباشرة بدون أي قوائم منسدلة أو إخفاء،
 * مع دعم كامل للغتين العربية والإنجليزية (AR / EN) والوضع الليلي والنهاري (Dark / Light Mode).
 */
export const ComprehensiveAcademicBlock: React.FC = () => {
  const { language, isRTL } = useLanguage();
  const [theme] = useAppTheme();
  const isLight = theme === 'light';
  const isAr = language === 'ar';

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-labelledby="academic-methodology-heading"
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 mt-8 mb-12"
    >
      <article
        className={`rounded-3xl border p-6 sm:p-10 md:p-12 transition-colors duration-300 shadow-2xl space-y-10 ${
          isLight
            ? 'bg-white border-slate-200/90 text-slate-800 shadow-slate-200/60'
            : 'bg-slate-900/85 border-slate-800/90 text-slate-200 shadow-black/50 backdrop-blur-xl'
        }`}
      >
        {/* ================= HEADER BANNER ================= */}
        <header
          className={`border-b pb-8 space-y-4 ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-indigo-500/10 border border-indigo-500/30 text-indigo-500">
            <Brain className="w-4 h-4" />
            <span>
              {isAr
                ? 'المرجعية الأكاديمية والمنهجية السيكومترية المعتمدة'
                : 'Peer-Reviewed Psychometric & Clinical Methodology'}
            </span>
          </div>

          <h2
            id="academic-methodology-heading"
            className={`text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight font-['Alexandria'] ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            {isAr
              ? 'المنهجية العلمية والأسس النفسية لمنصة «مرآة القلوب»: دراسة تحليلية في قياس التوافق الإنساني وأخلاقيات البيانات'
              : 'Scientific Methodology & Psychological Foundations of "Mirror of Hearts": An Analytical Study in Human Compatibility Psychometrics & Data Ethics'}
          </h2>

          <p
            className={`text-base sm:text-lg leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            {isAr
              ? 'تُعد منصة «مرآة القلوب» (miratalqulub.com) بيئة بحثية وتطبيقية متخصصة في علم النفس التوافقي والقياسات السيكومترية الحديثة. صُممت حاسبة التوافق والمختبرات الملحقة بها استناداً إلى أطر نظرية محكّمة في علم النفس المعرفي، وعلم نفس العلاقات الأسرية، ونظريات التعلق العاطفي، مع التزام هندسي صارم بمعايير التشفير القياسي وحماية الخصوصية الفردية.'
              : '"Mirror of Hearts" (miratalqulub.com) is an applied research and educational platform specializing in relational psychology and modern psychometrics. Our compatibility calculator and assessment laboratories are built upon peer-reviewed frameworks in cognitive psychology, marital systems theory, and adult attachment science, reinforced by strict cryptographic privacy engineering.'}
          </p>
        </header>

        {/* ================= SECTION 1: SCIENTIFIC METHODOLOGY ================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-500 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <h3
              className={`text-xl sm:text-2xl font-extrabold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? 'أولاً: المنهجية العلمية والأسس السيكومترية لقياس التوافق'
                : '1. Scientific Methodology & Psychometric Foundations of Compatibility Assessment'}
            </h3>
          </div>

          <div
            className={`space-y-4 text-base leading-loose ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            <p>
              {isAr
                ? 'تجاوزت الدراسات النفسية المعاصرة النظرة الأحادية السطحية للتوافق الزواجي والعاطفي؛ إذ لم يعد الانسجام بين شريكين يُقاس بمجرد تشابه الهوايات الظاهرية، بل بمدى التكامل والتناغم عبر أربعة محاور بنيوية متداخلة: المحور المعرفي والفكري (Cognitive & Intellectual Synergy)، المحور الوجداني والتنظيمي للعواطف (Emotional Regulation & Empathy)، المحور القيمي والاجتماعي الديموغرافي (Sociocultural & Generational Alignment)، ومحور إدارة الأزمات ونمط الحياة اليومي (Behavioral & Lifestyle Equilibrium).'
                : 'Contemporary psychological research has moved far beyond superficial, single-dimension compatibility metrics. True relational harmony between partners is no longer evaluated by mere overlap in casual hobbies, but through structural alignment across four interdependent axes: Cognitive & Intellectual Synergy, Emotional Regulation & Empathy, Sociocultural & Generational Alignment, and Behavioral & Lifestyle Equilibrium.'}
            </p>
            <p>
              {isAr
                ? 'تعتمد خوارزمية القياس في «مرآة القلوب» على نموذج الأوزان النسبية متعددة المتغيرات (Multivariate Weighted Psychometric Scoring)؛ حيث يتم تحليل استجابات المستخدم عبر مصفوفة مواقف حياتية تحاكي التفاعلات اليومية الحقيقية (كإدارة الضغوط المالية، وأساليب الحوار وقت الخلاف، وتوزيع الأدوار الأسرية، ومستويات الاستقلالية مقابل الاندماج). وتُعالج هذه المدخلات رياضياً لإنتاج مؤشرات كمية ونوعية دقيقة تكشف مناطق القوة المشتركة والفجوات المحتملة التي تتطلب وعياً استباقياً.'
                : 'The scoring engine in Mirror of Hearts utilizes a Multivariate Weighted Psychometric Model. User responses are analyzed across situational matrices simulating real-world relational dynamics—including financial stress management, conflict communication styles, domestic role expectations, and autonomy-versus-togetherness thresholds—producing quantitative and qualitative indices that highlight shared strengths and growth areas.'}
            </p>
          </div>
        </div>

        {/* ================= SECTION 2: GOTTMAN, BECK & BOWLBY MODELS ================= */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-500 shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3
              className={`text-xl sm:text-2xl font-extrabold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? 'ثانياً: النماذج الإكلينيكية التأسيسية المعتمدة (غوتمان، بيك، وبولبي)'
                : '2. Foundational Clinical & Theoretical Models (Gottman, Beck, and Bowlby)'}
            </h3>
          </div>

          <p
            className={`text-base leading-loose ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            {isAr
              ? 'ترتكز بنية الأسئلة والتحليلات السردية والأكاديمية في المنصة على ثلاث مدارس علمية رائدة في الطب النفسي وعلم النفس العيادي والعلائقي:'
              : 'The assessment items, algorithmic interpretations, and research encyclopedias across our platform are anchored in three foundational schools of clinical and relational psychology:'}
          </p>

          <div className="grid grid-cols-1 gap-5">
            {/* 1. Gottman Model */}
            <div
              className={`p-5 sm:p-6 rounded-2xl border space-y-2.5 ${
                isLight
                  ? 'bg-slate-50/90 border-slate-200'
                  : 'bg-slate-950/70 border-slate-800/90'
              }`}
            >
              <h4
                className={`text-lg font-extrabold flex items-center gap-2 ${
                  isLight ? 'text-indigo-900' : 'text-indigo-300'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>
                  {isAr
                    ? '1. نموذج جون غوتمان للبيت العلائقي المتين (Gottman’s Sound Relationship House Theory)'
                    : '1. Dr. John Gottman’s Sound Relationship House Theory'}
                </span>
              </h4>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                {isAr
                  ? 'استناداً إلى الدراسات الطولية التي أجراها البروفيسور جون غوتمان على مدار أربعة عقود في مختبر الحب والأسرة (The Love Lab)، تقيس منصتنا قدرة الشريكين على بناء «خرائط الحب المعرفية» (Love Maps)، والاستجابة الإيجابية لمحاولات التقارب الوجداني (Turning Toward Bids for Connection)، وامتلاك مهارات «الترميم العاطفي» (Repair Attempts) لخفض التوتر أثناء النقاش. كما ترصد المؤشرات الوقائية ضد ما أسماه غوتمان «الفرسان الأربعة المدمرة للعلاقة» (The Four Horsemen): النقد اللاذع (Criticism)، الازدراء والتهكم (Contempt)، الدفاعية المفرطة (Defensiveness)، والانسحاب الصامت أو الجدار الصخري (Stonewalling).'
                  : 'Drawing upon Dr. John Gottman’s four-decade longitudinal research, our framework evaluates partners’ capacity to build cognitive "Love Maps," turn toward everyday emotional bids for connection, and execute timely "Repair Attempts" to de-escalate conflict. Furthermore, our diagnostic items screen for protective resilience against Gottman’s "Four Horsemen of the Apocalypse": Criticism, Contempt, Defensiveness, and Stonewalling.'}
              </p>
            </div>

            {/* 2. Beck Cognitive Model */}
            <div
              className={`p-5 sm:p-6 rounded-2xl border space-y-2.5 ${
                isLight
                  ? 'bg-slate-50/90 border-slate-200'
                  : 'bg-slate-950/70 border-slate-800/90'
              }`}
            >
              <h4
                className={`text-lg font-extrabold flex items-center gap-2 ${
                  isLight ? 'text-emerald-900' : 'text-emerald-300'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>
                  {isAr
                    ? '2. النموذج المعرفي لآرون بيك (Aaron T. Beck’s Cognitive Therapy & Schema Model)'
                    : '2. Aaron T. Beck’s Cognitive Model & Relational Schemas'}
                </span>
              </h4>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                {isAr
                  ? 'أثبت رائد العلاج المعرفي آرون بيك في كتابه الشهير (الحب لا يكفي وحدَه - Love Is Never Enough) أن معظم التصدعات الزوجية لا تنشأ من غياب المودة، بل من «التشوهات المعرفية» (Cognitive Distortions) والأفكار التلقائية السلبية التي تشوه تأويل نوايا الشريك. توظف «مرآة القلوب» مبادئ بيك لتحليل كيف يتعامل الفرد مع أخطاء التفكير الشائعة مثل: قراءة الأفكار المسبقة (Mind Reading)، التعميم المفرط (Overgeneralization)، التفكير الكارثي (Catastrophizing)، والتفكير الثنائي الحدي (All-or-Nothing Thinking)، مما يساعد المستخدمين على تبني مرونة معرفية وحوار عقلاني ناضج.'
                  : 'As pioneer of Cognitive Therapy Dr. Aaron T. Beck demonstrated in "Love Is Never Enough," marital distress frequently stems not from a lack of affection, but from automatic negative thoughts and "Cognitive Distortions" that bias how partners interpret each other’s intentions. Mirror of Hearts integrates Beck’s cognitive restructuring principles to assess and mitigate Mind Reading, Overgeneralization, Catastrophizing, and All-or-Nothing Thinking.'}
              </p>
            </div>

            {/* 3. Bowlby Attachment Theory */}
            <div
              className={`p-5 sm:p-6 rounded-2xl border space-y-2.5 ${
                isLight
                  ? 'bg-slate-50/90 border-slate-200'
                  : 'bg-slate-950/70 border-slate-800/90'
              }`}
            >
              <h4
                className={`text-lg font-extrabold flex items-center gap-2 ${
                  isLight ? 'text-rose-900' : 'text-rose-300'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0" />
                <span>
                  {isAr
                    ? '3. نظرية التعلق العاطفي لجون بولبي وماري إينسورث (Bowlby & Ainsworth’s Attachment Theory)'
                    : '3. John Bowlby & Mary Ainsworth’s Adult Attachment Theory'}
                </span>
              </h4>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                {isAr
                  ? 'وفقاً لنظرية التعلق التي أسسها جون بولبي وطورتها ماري إينسورث وامتدت لاحقاً إلى مقاييس التعلق للراشدين (ECR-R)، يشكل كل إنسان «نموذج عمل داخلياً» (Internal Working Model) للأمان العاطفي والاستحقاق الذاتي. تحلل استبيانات المنصة بدقة أبعاد قلق الهجران (Attachment Anxiety) وتجنب الحميمية (Attachment Avoidance) لتحديد نمط التعلق السائد (التعلق الآمن Secure، التعلق القلق-المنشغل Anxious-Preoccupied، التعلق التجنبي-المستخف Dismissive-Avoidant، أو القلق-التجنبي Fearful-Avoidant)، مع دمجها بنموذج العوامل الخمسة الكبرى للشخصية (Big Five / OCEAN) ونظرية الحب الثلاثية لروبرت ستيرنبرغ.'
                  : 'Grounded in John Bowlby and Mary Ainsworth’s Attachment Theory and adult psychometric inventories (ECR-R), every individual operates from an "Internal Working Model" of emotional safety. Our assessments measure Attachment Anxiety and Attachment Avoidance to identify Secure, Anxious-Preoccupied, Dismissive-Avoidant, and Fearful-Avoidant attachment dynamics, integrated with the Big Five (OCEAN) personality traits and Sternberg’s Triangular Theory of Love.'}
              </p>
            </div>
          </div>
        </div>

        {/* ================= SECTION 3: DATA MINIMIZATION & TLS 1.3 ENCRYPTION ================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <h3
              className={`text-xl sm:text-2xl font-extrabold font-['Alexandria'] ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isAr
                ? 'ثالثاً: هندسة الخصوصية، مبدأ الحد الأدنى من جمع البيانات، وتشفير TLS 1.3'
                : '3. Privacy Engineering, Data Minimization Principle & TLS 1.3 Cryptographic Security'}
            </h3>
          </div>

          <div
            className={`space-y-4 text-base leading-loose ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            <p>
              {isAr
                ? 'تتبنى منصة «مرآة القلوب» فلسفة «الخصوصية بالتصميم» (Privacy by Design) وتطبق بصرامة مبدأ الحد الأدنى من جمع البيانات (Data Minimization Principle) المتوافق مع اللوائح العالمية لحماية البيانات (GDPR / CCPA). لا تطلب المنصة من الزوار أي وثائق رسمية، أو أرقام هواتف شخصية، أو عناوين سكنية، أو رفع صور شخصية لإجراء اختبارات التوافق والمقاييس النفسية؛ بل تكتفي بالمتغيرات الديموغرافية والسيكومترية الضرورية حصراً لتشغيل المعادلات التحليلية.'
                : 'Mirror of Hearts is architected around "Privacy by Design" and strictly enforces the Data Minimization Principle in full alignment with international data protection standards (GDPR / CCPA). Users are never required to submit government IDs, phone numbers, physical addresses, or personal photographs to utilize our compatibility and psychometric calculators; only the minimal demographic and behavioral variables required for mathematical scoring are processed.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  isLight
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-emerald-950/20 border-emerald-500/30'
                }`}
              >
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                <div className="text-sm leading-relaxed">
                  <strong
                    className={`block mb-1 ${
                      isLight ? 'text-emerald-950' : 'text-emerald-300'
                    }`}
                  >
                    {isAr
                      ? 'بروتوكول التشفير القياسي TLS 1.3 و AES-256:'
                      : 'TLS 1.3 Transport Security & AES-256 Encryption:'}
                  </strong>
                  <span>
                    {isAr
                      ? 'تُؤمّن كافة حزم البيانات المتبادلة بين متصفح المستخدم وخوادم السحابة عبر بروتوكول التشفير القياسي الحديث (TLS 1.3 - Transport Layer Security) مع سرية التوجيه التام (Perfect Forward Secrecy)، مما يمنع أي اعتراض أو تنصت سيبراني، بالإضافة إلى إمكانية قفل النتائج محلياً برمز سري خاص (PIN Lock).'
                      : 'All data packets transmitted between the client browser and cloud endpoints are secured via modern Transport Layer Security (TLS 1.3) with Perfect Forward Secrecy and AES-256 encryption at rest, complemented by an optional client-side PIN privacy lock.'}
                  </span>
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  isLight
                    ? 'bg-blue-50/60 border-blue-200'
                    : 'bg-blue-950/20 border-blue-500/30'
                }`}
              >
                <Cpu className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <div className="text-sm leading-relaxed">
                  <strong
                    className={`block mb-1 ${
                      isLight ? 'text-blue-950' : 'text-blue-300'
                    }`}
                  >
                    {isAr
                      ? 'مبدأ الحد الأدنى من البيانات وعدم المشاركة التجارية:'
                      : 'Strict Data Minimization & Zero Third-Party Selling:'}
                  </strong>
                  <span>
                    {isAr
                      ? 'تُعالج إجابات الاستبيانات لحظياً لتوليد التقرير التوافقي، ولا تقوم المنصة ببيع أو تأجير أو المتاجرة بأي بيانات سيكومترية أو شخصية مع سماسرة البيانات أو شركات الإعلانات الموجهة، مع منح المستخدم حق الحذف الفوري الكامل لسجله في أي وقت.'
                      : 'Questionnaire responses are processed instantaneously to generate analytical reports. We never sell, rent, or trade psychometric profiles to data brokers, and users retain full sovereignty to permanently purge their local or cloud history at any time.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 4: SCIENTIFIC & CLINICAL DISCLAIMER ================= */}
        <div
          className={`p-6 sm:p-8 rounded-2xl border space-y-3 ${
            isLight
              ? 'bg-amber-50/80 border-amber-300 text-slate-800'
              : 'bg-amber-950/20 border-amber-500/35 text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Scale className="w-6 h-6 text-amber-500 shrink-0" />
            <h3
              className={`text-lg sm:text-xl font-black font-['Alexandria'] ${
                isLight ? 'text-amber-950' : 'text-amber-300'
              }`}
            >
              {isAr
                ? 'رابعاً: إخلاء المسؤولية العلمي والعيادي والقانوني (Scientific & Clinical Disclaimer)'
                : '4. Mandatory Scientific, Clinical & Legal Disclaimer'}
            </h3>
          </div>

          <p className="text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'إن جميع المقاييس السيكومترية، وحاسبات التوافق الفكري والعاطفي، والدراسات البحثية، والمقالات العيادية القصصية المنشورة عبر منصة «مرآة القلوب» قُدّمت لأغراض التثقيف العلمي، وتعزيز الوعي الذاتي، وإثراء الحوار البناء بين الشركاء والمقبلين على الزواج. لا تُعد هذه الأدوات أو النتائج المستخلصة منها بأي حال من الأحوال بديلاً عن التشخيص الطبي النفسي أو التقييم الإكلينيكي المباشر وفق الدليل التشخيصي والإحصائي للاضطرابات النفسية (DSM-5-TR) أو التصنيف الدولي للأمراض (ICD-11).'
              : 'All psychometric inventories, intellectual and emotional compatibility calculators, peer-reviewed research papers, and clinical narrative articles published on "Mirror of Hearts" are provided strictly for scientific education, self-awareness, and constructive relational dialogue. These tools and their generated outputs do not constitute, nor do they replace, formal psychiatric diagnosis, clinical psychotherapy, or medical evaluation under DSM-5-TR or ICD-11 criteria.'}
          </p>

          <p
            className={`text-xs sm:text-sm font-semibold leading-relaxed pt-1 ${
              isLight ? 'text-amber-900' : 'text-amber-200/90'
            }`}
          >
            {isAr
              ? 'تؤكد إدارة المنصة أن التوافق الإنساني عملية ديناميكية حية تقوم على المسؤولية الأخلاقية، والمروءة، والاحترام المتبادل، والجهد الواعي المستمر من كلا الطرفين، وفي حالات الاضطرابات النفسية الحادة أو النزاعات الأسرية العميقة يُوصى دائماً بمراجعة الأخصائيين النفسيين والاستشاريين الأسريين المرخصين.'
              : 'Human compatibility is a living, dynamic process rooted in mutual respect, moral integrity, and conscious effort from both partners. In cases of acute psychological distress or severe domestic conflict, users are strongly advised to consult licensed clinical psychologists or certified family therapists.'}
          </p>
        </div>
      </article>
    </section>
  );
};

export const HomePage: React.FC<HomePageProps> = (props) => {
  return (
    <div className="w-full">
      {/* حاسبة التوافق الرئيسية والأقسام التفاعلية */}
      <ProfileStep {...props} />

      {/* الكتلة النصية الأكاديمية والتحليلية الشاملة (ظاهرة ومرئية بالكامل أسفل حاسبة التوافق مباشرة) */}
      <ComprehensiveAcademicBlock />
    </div>
  );
};

export default HomePage;
