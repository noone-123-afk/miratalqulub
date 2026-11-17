import type { Article } from './articlesData';
import type { AcademicPaper } from './academicPapersData';

/**
 * المقالات الأربع المضافة من ملف PDF:
 * «من النفس الباطنة إلى العقل القيادي: تحليل علمي متكامل لأنواع الشخصية عبر العوامل الخمسة»
 * مقسمة إلى 4 مقالات مستقلة كما وردت في الملف:
 * - مقال 1: الشخصية الانطوائية - استكشاف عالم الداخل والقوة الخفية للعزلة
 * - مقال 2: الشخصية الاجتماعية - ديناميكية الطاقة والتأثير في العالم الخارجي
 * - مقال 3: الشخصيات القيادية - من الصفات الجوهرية إلى الأداء الفعال
 * - مقال 4: العوامل الخمسة الكبرى - تحليل شامل للنموذج الخمسي كخريطة للشخصية البشرية
 */

export const PDF_FOUR_NARRATIVE_ARTICLES: Article[] = [
  // =========================================================================
  // مقال 1: الشخصية الانطوائية - استكشاف عالم الداخل والقوة الخفية للعزلة
  // =========================================================================
  {
    id: 'article-1-introverted-personality-inner-world-hidden-power',
    articleType: 'narrative',
    title: 'مقال 1: الشخصية الانطوائية - استكشاف عالم الداخل والقوة الخفية للعزلة',
    titleEn: 'Article 1: The Introverted Personality — Exploring the Inner World & Hidden Power of Solitude',
    category: 'applied_psychology',
    categoryLabelAr: 'علم النفس التطبيقي والعصبي',
    categoryLabelEn: 'Applied & Neuro-Psychology',
    readTime: '12 دقيقة قراءة',
    readTimeEn: '12 min read',
    publishDate: '2026-11-17',
    icon: '🧘‍♂️',
    coverGradient: 'from-indigo-600/30 via-purple-600/20 to-slate-800/30',
    summary:
      'في مجتمع يكافئ غالباً صوت المنبسطين ويحب الأضواء، يأخذك هذا المقال في رحلة علمية لاستكشاف عالم الانطوائية، ليس كضعف أو خجل اجتماعي، بل كنظام عصبي متميز وقوة خفية تكمن في عمق التفكير، الاستثارة القشرية، نشاط الفص الجبهي، وإدارة ميزانية الطاقة وفق منهج الزخم الهادئ.',
    summaryEn:
      'In a society that often rewards the loudest voices, this article explores introversion not as shyness or a flaw to be fixed, but as a distinct neurobiological system characterized by high cortical arousal, frontal lobe analytical depth, parasympathetic energy regulation, and the "Quiet Momentum" strategy.',
    scientificFramework:
      'نظرية الأنواع النفسية لكارل يونغ (1923) • نظرية الاستثارة القشرية لهانس أيزنك • علم الأعصاب المعرفي (fMRI) • نظرية الاختيار الاجتماعي العاطفي للورا كارستنسن',
    scientificFrameworkEn:
      'Carl Jung Psychological Types (1923) • Hans Eysenck Cortical Arousal Theory • fMRI Cognitive Neuroscience • Laura Carstensen Socioemotional Selectivity Theory',
    clinicalCaseQuoteAr:
      '«ماذا لو كانت طبيعتك الداخلية الهادئة ليست ضعفاً يجب إصلاحه، بل نظاماً عصبياً متكاملاً ومصمماً بعناية للتفكير العميق وبناء العلاقات ذات المعنى؟»',
    clinicalCaseQuoteEn:
      '“What if your quiet inner nature is not a weakness to be repaired, but a carefully designed neurobiological system built for deep thought and meaningful connection?”',
    keyTakeaways: [
      'الانطوائية لا تعني الخجل أو الخوف الاجتماعي؛ فالخجل يرتبط بسمة القلق، بينما الانطوائية هي تفضيل ذاتي للبيئات منخفضة التحفيز والاستثمار في الحياة الداخلية.',
      'أثبت هانس أيزنك أن الانطوائيين يمتلكون مستوى استثارة قشرية (Cortical Arousal) أعلى طبيعياً، مما يجعلهم يكتفون بتحفيز خارجي أقل لتجنب الإشباع والإرهاق.',
      'تُظهر دراسات الرنين المغناطيسي الوظيفي (fMRI) نشاطاً وتدفقاً دموياً أعلى في الفص الجبهي لدى الانطوائيين، مع تفضيل الجهاز العصبي الباراسمبثاوي (PNS) المسؤول عن التأمل والتركيز العميق.',
      'تعتمد إدارة «ميزانية الطاقة» للانطوائيين على «منهج الزخم الهادئ» عبر 3 طبقات: الاستثمار في المدخلات، الممارسة المنفردة المتعمدة، والتطبيق الاجتماعي المختار بعناية.',
      'تمنح الانطوائية ميزة حيوية في مراحل التقدم في العمر عبر التوافق مع «التضييق الاجتماعي» وتقليل الإجهاد المزمن وحماية طول التيلومير الخلوي.',
    ],
    keyTakeawaysEn: [
      'Introversion is fundamentally distinct from shyness; shyness stems from social judgment anxiety, whereas introversion reflects an internal energy economy.',
      'Hans Eysenck demonstrated that introverts have naturally higher baseline cortical arousal, making them sensitive to overstimulation in loud environments.',
      'fMRI neuroimaging reveals increased blood flow in the frontal lobe of introverts and reliance on the parasympathetic nervous system (PNS) for deep focus.',
      'Managing an "Energy Budget" through the 3-layer "Quiet Momentum" framework transforms solitude into strategic career and leadership strength.',
      'Introversion aligns naturally with Carstensen’s Socioemotional Selectivity Theory in aging and correlates with lower chronic stress and healthier telomere maintenance.',
    ],
    contentParagraphs: [
      {
        heading: 'مدخل استراتيجي: جسر بين العمق الأكاديمي والسرد الأدبي وفهم عالم الداخل',
        headingEn: 'Strategic Prologue: Bridging Academic Depth, Narrative Engagement & the Inner World',
        text: 'إن توليد محتوى علمي متخصص يلبي متطلبات القارئ المبتدئ والمتخصص في آن واحد، ويتجاوز حدود الكتابة الأكاديمية التقليدية ليصل إلى مستوى السرد الأدبي المشوق، يقوم على ثلاث ركائز مترابطة: فهم الجمهور المستهدف بترجمة المفاهيم المعقدة دون تشويه، وتبني نهج سردي فعال يحفز الدماغ البشري (وفق إطار And-But-Therefore لراندي أولسن)، وضمان أعلى درجات الموثوقية العلمية.\n\nفي مجتمع يكافئ غالباً صوت المنبسطين (المقربين) ويحب الأضواء، قد يبدو أن الانطوائية هي حالة يجب إصلاحها، أو على الأقل تخفيفها. لكن ماذا لو كانت هذه الشخصية ليست مجرد نقيض للمنبسطين، بل هي نظام متميز ومصمم بعناية؟ هذا المقال يأخذك في رحلة لاستكشاف عالم الانطوائية، ليس كضعف، بل كقوة خفية تكمن في عمق التفكير، والتركيز العميق، والقدرة على الاستماع. سننتقل من تفكيك الشائعات الشائعة، مروراً بالأساس التاريخي الذي وضع الأسس لهذا المفهوم، ونصل إلى الأدلة البيولوجية الحديثة التي تكشف كيف يعمل عقل ودماغ الشخص الانطوائي بطريقة مختلفة تماماً. وأخيراً، سنستكشف كيفية تحويل هذه الطبيعة إلى ميزة حقيقية في العمل، والتعلم، وحتى القيادة، مع تقديم استراتيجيات عملية لفهم وإدارة طاقتك الخاصة.',
        textEn:
          'Creating specialized scientific content that serves both newcomers and experts bridges academic rigor with compelling narrative structure.\n\nIn a society that frequently rewards the loudest voices and loves the spotlight, introversion can seem like a condition to be fixed or toned down. Yet what if the introverted personality is not merely the absence of extraversion, but a distinct, finely tuned system? This article takes you on a journey into the inner world of introversion—not as a weakness, but as a hidden power rooted in deep reflection, sustained focus, and active listening.',
      },
      {
        heading: '١. تقويض الشائعة الكبرى: لماذا الانطوائية ليست خجلاً أو خوفاً اجتماعياً؟',
        headingEn: '1. Debunking the Biggest Myth: Why Introversion Is Not Shyness',
        text: 'دعنا نبدأ بتقويض أحد أكبر الشائعات: أن الانطوائية تعني الخجل أو الخوف الاجتماعي. هذا الخلط، كما يؤكد الباحثون، خطأ فادح. الخجل هو شعور بعدم الارتياح أو الخوف من الحكم الاجتماعي، وهو أكثر ارتباطاً بسمة "القلق / العصابية" في النموذج الخمسي الكبير. أما الانطوائية، فهي تفضيل ذاتي للبيئات ذات التحفيز المنخفض والاستثمار في الحياة الداخلية.\n\nالشخص الانطوائي لا يكره الناس، بل يجد أن التفاعلات الاجتماعية، خاصة تلك التي تكون متعددة الأوجه وطويلة الأمد، تستنزف طاقته. إنه يحتاج إلى وقت وحده لاستعادة طاقته وتجديد شبابه، بينما يشعر المنبسطون (المقربون) بالتحفيز والطاقة من نفس التفاعلات. هذا الاختلاف في مصدر الطاقة هو جوهر الفرق بينهما.',
        textEn:
          'Let us begin by dismantling one of the most pervasive misconceptions: that introversion equals shyness or social anxiety. Shyness is the fear of negative social judgment and correlates with Neuroticism in the Big Five. Introversion, by contrast, is a subjective preference for low-stimulation environments and rich inner mental life. Introverts do not dislike people; rather, prolonged multi-faceted social interactions deplete their energy reserves, requiring solitude to recharge.',
      },
      {
        heading: '٢. الجذور التاريخية والبيولوجية: من كارل يونغ (1909) إلى هانس أيزنك والاستثارة القشرية',
        headingEn: '2. Historical & Biological Roots: From Carl Jung (1909) to Hans Eysenck’s Cortical Arousal',
        text: 'تأتي جذور هذا المفهوم من أعمال الطبيب النفسي كارل يونغ (Carl Jung)، الذي قدم مصطلحي "الانطوائي" و"المنبسط / المقرب" للجمهور لأول مرة في محاضرة في جامعة كلارك عام 1909، ثم توسع في تفاصيله في كتابه "الأنواع النفسية" عام 1923. اقترح يونغ أن كل شخص لديه كلا النوعين، ولكن غالباً ما يهيمن أحدهما على الآخر. للانطوائي، يكون تركيزه موجهاً نحو العالم الداخلي من الأفكار والمفاهيم والقيم، بينما يكون للمنبسط تركيزه على العالم الخارجي من الأشياء والأشخاص.\n\nلعقود، ظلت هذه الفكرة ضمن دائرة الأبحاث الأكاديمية النادرة، حتى جاء عالم النفس الألماني هانس أيزنك (Hans Eysenck) في الخمسينيات ليضيف إليها بُعداً بيولوجياً مهماً. افترض أيزنك أن اختلافات الانطوائية مقابل الانبساطية تنبع من اختلافات في مستوى الاستثارة القشرية (Cortical Arousal). وفقاً لنظريته، فإن المنبسطين لديهم مستوى استثارة قليل بشكل طبيعي، مما يجعلهم دائماً في بحث عن تحفيز من الخارج، مثل الاجتماعات والأنشطة الاجتماعية، لرفع مستواهم إلى الحد الأمثل. في المقابل، فإن الانطوائيين لديهم مستوى استثارة قشرية أعلى بكثير، مما يعني أنهم يحصلون على الكثير من التحفيز بالفعل، وبالتالي يميلون إلى تجنب البيئات المزدحمة والمزعجة التي قد تؤدي بهم إلى حالة "الإشباع" أو الإرهاق.',
        textEn:
          'The concept traces back to psychiatrist Carl Jung, who introduced introversion and extraversion at Clark University in 1909 and expanded them in Psychological Types (1923). In the 1950s, Hans Eysenck added a pivotal biological dimension: cortical arousal. Because introverts possess naturally high baseline cortical arousal, they reach optimal stimulation quickly and avoid noisy, crowded settings that trigger sensory overload and exhaustion.',
      },
      {
        heading: '٣. علم الأعصاب الحديث (fMRI): نشاط الفص الجبهي، الدوبامين، والنظام الباراسمبثاوي (PNS)',
        headingEn: '3. Modern Neuroscience (fMRI): Frontal Lobe Activity, Dopamine & the Parasympathetic System',
        text: 'تذهب الأبحاث الحديثة في علم الأعصاب إلى أبعد من ذلك، لتقدم صورة دقيقة لكيفية عمل عقول الانطوائيين. أظهرت دراسات التصوير بالرنين المغناطيسي الوظيفي (fMRI) أن الدماغ الانطوائي أكثر نشاطاً في الفص الجبهي (Frontal Lobe)، وهي المنطقة المسؤولة عن التفكير التحليلي والتحليل والتنظيم والتخطيط. هذا يفسر لماذا يميل الانطوائيون إلى التفكير العميق والتأمل في المشكلات. وفي المقابل، يظهر المنبسطون نشاطاً أكبر في مناطق استقبال الحواس في الجزء الأمامي والجانبي من الدماغ، مما يشير إلى اهتمامهم بالمحفزات الخارجية من البيئة المحيطة.\n\nبالإضافة إلى ذلك، هناك اختلاف في كيفية استجابة الدماغ لمستقبلات الدوبامين، وهي الناقل العصبي المرتبط بالشعور بالمكافأة والدافعية. يُعتقد أن الانطوائيين يستجيبون بشكل مختلف لمستقبلات الدوبامين، حيث يمكن أن يؤدي فائض الدوبامين إلى إحساس بالإرهاق بدلاً من الإيجابية. بدلاً من ذلك، يفضل الانطوائيون النظام العصبي الباراسمبثاوي (PNS) المسؤول عن "راحة وهضم" الطاقة، والذي يحفز التأمل والتركيز العميق، بينما يميل المنبسطون نحو النظام العصبي السمبثاوي (SNS) الذي يهيئ الجسم للعمل والمخاطرة.',
        textEn:
          'Functional MRI (fMRI) studies demonstrate that introverted brains exhibit higher blood flow in the frontal lobe—the seat of analytical thinking, planning, and deep problem-solving. Furthermore, introverts show distinct sensitivity to dopamine; excessive dopaminergic stimulation can feel overwhelming, leading them to favor the acetylcholine-driven parasympathetic nervous system (PNS) responsible for calm contemplation and deep focus.',
      },
      {
        heading: '٤. إدارة «ميزانية الطاقة» ومنهج الزخم الهادئ (Quiet Momentum) وميزة الشيخوخة',
        headingEn: '4. Managing the "Energy Budget", the Quiet Momentum Framework & Healthy Aging',
        text: 'لكن ماذا يعني هذا كل شيء في الواقع؟ وكيف يمكن للانطوائيين أن يتحولوا من شعورهم بالعزلة إلى شعور بالقوة؟ الإجابة تكمن في إدارة "ميزانية الطاقة" الخاصة بهم. يجب أن يعامل الانطوائيون طاقتهم كمورد محدود، ويقومون بتوزيعها بوعي على أنشطة محددة. يمكن أن يشمل ذلك استراتيجيات عملية مثل "منهج الزخم الهادئ"، وهو إطار عمل يركز على ثلاث طبقات من التطوير:\n• الطبقة الأولى: الاستثمار في المدخلات وحدها (مثل القراءة والتأمل).\n• الطبقة الثانية: الممارسة المنفردة المتعمدة (مثل العمل على حالات دراسية بمفردك).\n• الطبقة الثالثة: التطبيق الاجتماعي المختار بعناية (مثل التوجيه الفردي).\n\nبدلاً من المشاركة في شبكات الاتصال الواسعة، يمكن للانطوائيين بناء "رؤية استراتيجية" من خلال بناء علاقات عميقة ومؤثرة مع عدد قليل من الأشخاص، مثل المديرين الفنيين الذين يدعمون مسيرتهم المهنية. كما أن التحدث عن الانطوائية في مكان العمل له أهمية كبيرة؛ إذ يمكن لمديري الانطوائيين اتخاذ خطوات بسيطة مثل احترام حدودهم، والسماح لهم بالتفكير قبل المشاركة في المناقشات الجماعية، وتقصير الاجتماعات، وتوفير مساحات هادئة للعمل.\n\nعلاوة على ذلك، تشير الأبحاث إلى أن الانطوائية يمكن أن تكون ميزة حيوية خاصة في مراحل الشيخوخة. وفقاً لنظرية الاختيار الاجتماعي العاطفي لـ لورا كارستنسن (Laura Carstensen)، يميل الأشخاص مع التقدم في العمر إلى اختيار أصدقائهم بعناية أكبر، مع التركيز على العلاقات العميقة ذات المعنى بدلاً من توسيع شبكة العلاقات. هذه الظاهرة، التي تسمى "التضييق الاجتماعي"، تتوافق بشكل طبيعي مع طبيعة الانطوائيين، مما قد يقلل من التوتر المرتبط بالشيخوخة ويساعدهم على التكيف مع التغيرات بشكل أفضل. وقد لوحظ أن الانطوائيين، بسبب تفضيلهم البيئات المنخفضة التحفيز، قد يعانون من مستويات أقل من الإجهاد المزمن، مما قد يؤثر إيجابياً على الصحة على المستوى الخلوي، مثل طول طرفيات الأحماض النووية (التيلومير - Telomere ends)، وهي حماية للخلية.',
        textEn:
          'How can introverts transform solitude into strength? The answer lies in managing their "Energy Budget" and applying the three-tiered "Quiet Momentum" framework: (1) Solo input investment (reading and reflection), (2) Deliberate solitary practice, and (3) Selectively curated social application (one-on-one mentoring). Moreover, according to Laura Carstensen’s Socioemotional Selectivity Theory, introverts are naturally adapted to healthy aging through selective, meaningful relationships and lower chronic stress, supporting cellular telomere preservation.',
      },
    ],
    diagnosticTable: {
      titleAr: 'جدول مقارنة علمي: الشخصية الانطوائية مقابل الشخصية الاجتماعية (من الملف ص 5)',
      titleEn: 'Scientific Comparison Table: Introverted vs. Social/Extraverted Personality',
      col1Ar: 'السمة',
      col1En: 'Trait Dimension',
      col2Ar: 'الشخصية الانطوائية',
      col2En: 'Introverted Personality',
      col3Ar: 'الشخصية الاجتماعية',
      col3En: 'Social / Extraverted Personality',
      rows: [
        {
          criterionAr: 'مصادر الطاقة',
          criterionEn: 'Energy Sources',
          naturalAr: 'تُعاد شحن طاقتها من خلال الوقت المنقضي وحدها، وتستنزفها التفاعلات الاجتماعية الطويلة.',
          naturalEn: 'Recharged through solitude; depleted by prolonged social interactions.',
          manipulationAr: 'تُعاد شحن طاقتها من خلال التفاعلات الاجتماعية، وتستنزفها فترات العزلة الطويلة.',
          manipulationEn: 'Recharged through social interaction; depleted by extended isolation.',
        },
        {
          criterionAr: 'النشاط الدماغي',
          criterionEn: 'Brain Activity (fMRI)',
          naturalAr: 'تدفق دموي أعلى في الفص الجبهي (مجال التفكير والتحليل والتخطيط).',
          naturalEn: 'Higher blood flow in the frontal lobe (analytical thinking and planning).',
          manipulationAr: 'تدفق دموي أعلى في مناطق استقبال الحواس (مجالات الاستقبال الحسي الخارجي).',
          manipulationEn: 'Higher blood flow in sensory processing regions oriented to external stimuli.',
        },
        {
          criterionAr: 'الاستثارة القشرية',
          criterionEn: 'Cortical Arousal',
          naturalAr: 'لديها مستوى استثارة قشرية أعلى بشكل طبيعي، مما يجعلها أكثر عرضة للإرهاق من البيئات المزدحمة.',
          naturalEn: 'Naturally higher baseline cortical arousal; prone to overstimulation in crowds.',
          manipulationAr: 'لديها مستوى استثارة قشرية أقل، مما يجعلها تسعى بنشاط إلى الحصول على تحفيز من البيئة المحيطة.',
          manipulationEn: 'Naturally lower baseline cortical arousal; actively seeks external stimulation.',
        },
        {
          criterionAr: 'استجابة الدوبامين',
          criterionEn: 'Dopamine Response',
          naturalAr: 'قد تسبب مستويات عالية من الدوبامين إحساساً بالإرهاق أو الإشباع، وتفضل مسار الباراسمبثاوي (PNS).',
          naturalEn: 'High dopamine spikes can cause fatigue/overload; favors parasympathetic (PNS) calm.',
          manipulationAr: 'حساسة للغاية للدوبامين في مسارات المكافأة، مما يدفعها نحو السلوكيات المحفزة للمكافأة (SNS).',
          manipulationEn: 'Highly responsive to dopaminergic reward pathways, driving reward-seeking behavior.',
        },
        {
          criterionAr: 'التركيز',
          criterionEn: 'Focus & Attention',
          naturalAr: 'تميل إلى التركيز العميق والانتباه للتفاصيل، وتبرع في المهام التي تتطلب تفكيراً طويل الأمد.',
          naturalEn: 'Excels at deep focus, attention to detail, and long-horizon analytical tasks.',
          manipulationAr: 'تميل إلى تعدد المهام وتتبع معلومات متعددة في وقت واحد، وتكون أكثر فعالية في المواقف الديناميكية.',
          manipulationEn: 'Inclined toward multitasking and rapid adaptation in dynamic environments.',
        },
        {
          criterionAr: 'التفاعل الاجتماعي',
          criterionEn: 'Social Interaction',
          naturalAr: 'يفضل التفاعلات العميقة والنوعية بدلاً من الكم، وقد يبدو غير متفاعل أو بعيداً في المجموعات الكبيرة.',
          naturalEn: 'Prefers deep one-on-one quality over quantity; may appear reserved in large groups.',
          manipulationAr: 'يستمتع بالتفاعلات الاجتماعية المتعددة، ويمتلك شبكة واسعة من العلاقات، ويميل لأن يكون المتحدث الأول.',
          manipulationEn: 'Thrives on frequent social engagement, wide networks, and initiating group conversation.',
        },
      ],
    },
    practicalExercise: {
      title: 'تطبيق عملي: بناء «ميزانية الطاقة» ومنهج الزخم الهادئ (3 طبقات)',
      titleEn: 'Practical Exercise: Building Your "Energy Budget" & Quiet Momentum',
      steps: [
        'الطبقة الأولى (الاستثمار في المدخلات وحدها): خصص 30 إلى 45 دقيقة يومياً في بيئة منخفضة التحفيز للقراءة العميقة أو التأمل التحليلي قبل الانخراط في ضغوط العمل.',
        'الطبقة الثانية (الممارسة المنفردة المتعمدة): أنجز المهام المعقدة والدراسات التحليلية في جلسات تركيز منفردة دون مقاطعات.',
        'الطبقة الثالثة (التطبيق الاجتماعي المختار بعناية): استبدل شبكات التواصل السطحية المرهقة بلقاءات فردية عميقة ومؤثرة مع مرشدين أو شركاء عمل يدعمون رؤيتك الاستراتيجية.',
      ],
      stepsEn: [
        'Layer 1 (Solo Input Investment): Dedicate 30–45 minutes daily in a low-stimulation space for deep reading and reflection.',
        'Layer 2 (Deliberate Solitary Practice): Tackle complex casework and analytical tasks in uninterrupted solo blocks.',
        'Layer 3 (Curated Social Application): Replace exhausting mass networking with purposeful one-on-one strategic relationships.',
      ],
    },
    conclusionAr:
      'في النهاية، لا ينبغي النظر إلى الانطوائية كحالة يجب معالجتها. هي نظام متميز يأتي مع مجموعة فريدة من نقاط القوة: القدرة على التركيز العميق، والتفكير التحليلي، والقدرة على بناء علاقات ذات معنى. من خلال فهم الأساس البيولوجي لهذه الشخصية، وإدارة الطاقة بوعي، واستغلال نقاط القوة الخاصة بها، يمكن للانطوائيين أن يحققوا نجاحهم الخاص وأن يساهموا بطرق فريدة لا يمكن للآخرين القيام بها. إن إعادة تعريف الانطوائية ليست سوى الخطوة الأولى نحو تقدير التنوع البشري، وفهم أن هناك طرقاً متعددة لتحقيق التألق في هذا العالم الصاخب.',
    conclusionEn:
      'Ultimately, introversion should never be viewed as a deficit to be cured. It is a sophisticated neurobiological system offering deep focus, analytical clarity, and meaningful connection. Understanding its biological foundation and managing energy consciously empowers introverts to thrive on their own terms.',
    apaReferences: [
      {
        citation: 'Eysenck, H. J. (1967). The biological basis of personality. Charles C Thomas.',
        noteAr: 'المرجع الأساسي لنظرية الاستثارة القشرية والفرق البيولوجي بين الانطوائية والانبساطية.',
        noteEn: 'Foundational text on cortical arousal differences between introverts and extraverts.',
      },
      {
        citation: 'Jung, C. G. (1923). Psychological types. Harcourt, Brace & Company.',
        noteAr: 'تأصيل مفهومي الانطوائية والانبساطية وتوجيه الطاقة النفسية.',
        noteEn: 'Original formulation of introverted and extraverted psychological orientations.',
      },
      {
        citation: 'Introversion and working memory: central executive differences. ScienceDirect (S0191886999001130).',
        noteAr: 'دراسة الفروق التنفيذية والذاكرة العاملة ونشاط الفص الجبهي لدى الانطوائيين.',
        noteEn: 'Empirical analysis of frontal lobe and working memory advantages in introverts.',
      },
    ],
  },

  // =========================================================================
  // مقال 2: الشخصية الاجتماعية - ديناميكية الطاقة والتأثير في العالم الخارجي
  // =========================================================================
  {
    id: 'article-2-social-extraverted-personality-energy-dynamics',
    articleType: 'narrative',
    title: 'مقال 2: الشخصية الاجتماعية - ديناميكية الطاقة والتأثير في العالم الخارجي',
    titleEn: 'Article 2: The Social (Extraverted) Personality — Energy Dynamics & External World Impact',
    category: 'relationships',
    categoryLabelAr: 'عيادة العلاقات والتواصل الاجتماعي',
    categoryLabelEn: 'Relationships & Social Dynamics',
    readTime: '11 دقيقة قراءة',
    readTimeEn: '11 min read',
    publishDate: '2026-11-17',
    icon: '⚡',
    coverGradient: 'from-amber-500/30 via-rose-500/20 to-pink-700/30',
    summary:
      'إذا كانت الانطوائية هي الموسيقى الهادئة داخل العقل، فإن الشخصية الاجتماعية هي الأغنية الصاخبة التي تملأ الغرفة. يغوص هذا المقال في المحرك العصبي الدوباميني (مستقبلات D2 والنواة المتكئة)، واستجابة الدماغ للوجوه البشرية (ERPs)، ومنحنى القبول الاجتماعي، وكيفية إدارة الطاقة الاجتماعية دون الوقوع في الإرهاق.',
    summaryEn:
      'If introversion is quiet music within the mind, the social personality is the vibrant song filling the room. This article explores the dopaminergic reward system (D2 receptors, nucleus accumbens), ERP responses to human faces, the curvilinear U-shaped socialization curve, and strategies to prevent social burnout.',
    scientificFramework:
      'علم الأعصاب السلوكي ونظام المكافأة الدوباميني (D2 / Nucleus Accumbens) • التفاعلات المرتبطة بالأحداث (ERPs) • منحنى الانبساط والقبول الاجتماعي',
    scientificFrameworkEn:
      'Behavioral Neuroscience & Dopaminergic Reward System (D2 / Nucleus Accumbens) • Event-Related Potentials (ERPs) • Curvilinear Socialization Model',
    clinicalCaseQuoteAr:
      '«إنهم يبحثون عن "الموسيقى" والشعور بالحياة في العالم الخارجي، والبشر والتفاعلات الحية هم المصدر الرئيسي لتلك الطاقة.»',
    clinicalCaseQuoteEn:
      '“They seek the ‘music’ and vitality of life in the external world, and human beings are its primary source.”',
    keyTakeaways: [
      'يعود الأساس البيولوجي للشخصية الاجتماعية عند هانس أيزنك إلى «استثارة قشرية منخفضة» تدفع الدماغ للبحث النشط عن التحفيز الخارجي للوصول إلى اليقظة والحيوية المثلى.',
      'يمتلك الأفراد الاجتماعيون حساسية عالية لمستقبلات الدوبامين D2 في مسارات المكافأة مثل المهاد (Thalamus) والنواة المتكئة (Nucleus Accumbens).',
      'تكشف دراسات قياس التفاعلات المرتبطة بالأحداث (ERPs) أن دماغ الشخص الاجتماعي يوجه انتباهاً عصبياً أكبر بكثير للوجوه البشرية مقارنة بالأشياء غير الاجتماعية كالزهور.',
      'العلاقة بين الانبساط والقبول الاجتماعي تتبع منحنى على شكل حرف U مقلوب؛ فهي مفيدة جداً حتى مستوى معين، لكن الإفراط المبالغ فيه قد يؤدي إلى تسطح العلاقة أو الإرهاق الاجتماعي.',
      'توجيه هذه الطاقة بوعي وتحديد الأولويات يحولها إلى قوة مبتكرة ومؤثرة في مجالات القيادة، الإدارة، المبيعات، التسويق، والعمل الاجتماعي.',
    ],
    keyTakeawaysEn: [
      'Eysenck’s low baseline cortical arousal explains why social personalities actively seek external stimulation to feel alert and alive.',
      'High sensitivity of D2 dopamine receptors in the thalamus and nucleus accumbens fuels ambition, positive affect, and reward-seeking.',
      'Event-Related Potential (ERP) studies confirm that extraverted brains allocate significantly greater neural attention to human faces than neutral objects.',
      'Social acceptance follows an inverted U-shaped curve: extraversion enhances popularity up to a point, beyond which excessive intensity can backfire.',
      'Conscious pacing prevents social exhaustion and channels extraverted drive into transformative career and community impact.',
    ],
    contentParagraphs: [
      {
        heading: '١. مدخل: الأغنية الصاخبة والأساس البيولوجي للاستثارة القشرية المنخفضة',
        headingEn: '1. Introduction: The Vibrant Song & Low Cortical Arousal Baseline',
        text: 'إذا كانت الانطوائية هي الموسيقى الهادئة داخل العقل، فإن الشخصية الاجتماعية هي الأغنية الصاخبة التي تملأ الغرفة. إنها الطاقة، والحماس، والرغبة في الانغماس في العالم الخارجي. في هذا المقال، نغوص في أعماق الشخصية الاجتماعية، لنكتشف أنها ليست مجرد "المرح" أو "الحب للناس"، بل هي محرك أساسي مرتبط بالنظام العصبي للمكافأة. سنستعرض كيف شكلت نظريات أيزنك وعلم الأعصاب الحديث فهمنا لهذه الشخصية، ونستكشف قوتها في بناء العلاقات وتحقيق السعادة، مع تسليط الضوء على التحديات التي قد تواجهها عندما تصبح هذه الطاقة بلا قيود. أخيراً، سنناقش كيف يمكن للشخصيات الاجتماعية أن تستخدم دافعاتها الطبيعية لتحويلها إلى قوة مبتكرة ومؤثرة في حياتهم المهنية والشخصية.\n\nإن الأساس البيولوجي للشخصية الاجتماعية يعود إلى أعمال هانس أيزنك في الخمسينيات، الذي اقترح أن المنبسطين (المقربين) يعانون من "استثارة قشرية منخفضة". هذا يعني أن عقولهم تحتاج باستمرار إلى الحصول على المزيد من التحفيز من البيئة المحيطة لمواصلة الشعور باليقظة والحيوية. فالاجتماعات، والأنشطة، والمحادثات، كلها مصادر تحفيزية تساعدهم على الوصول إلى مستوى الاستثارة الأمثل. هذه الفكرة، التي كانت ثورية في حينها، أصبحت اليوم قاعدة أساسية في فهم دافعية الشخصية الاجتماعية؛ لقد كانوا يبحثون عن "الشعور بالحياة" الذي يمنحه التفاعل الاجتماعي.',
        textEn:
          'If introversion is the quiet melody within the mind, the social personality is the vibrant song that fills the room. Rooted in Hans Eysenck’s 1950s discovery of low baseline cortical arousal, extraverted brains continuously seek external stimulation—meetings, conversations, and dynamic activities—to reach their optimal level of alertness and vitality.',
      },
      {
        heading: '٢. علم الأعصاب السلوكي: النظام الدوباميني، مستقبلات D2، والنواة المتكئة',
        headingEn: '2. Behavioral Neuroscience: The Dopaminergic System, D2 Receptors & Nucleus Accumbens',
        text: 'تطور هذا الفهم بشكل كبير مع ظهور علم الأعصاب السلوكي. أظهرت الأبحاث أن الشخصية الاجتماعية مرتبطة ارتباطاً وثيقاً بالنظام الدوباميني في الدماغ، وهو النظام المسؤول عن الدافعية والمكافأة. تشير الدراسات إلى أن الأفراد الاجتماعيين لديهم حساسية عالية جداً لمستقبلات الدوبامين D2 في مسارات المكافأة، مثل المهاد (Thalamus) والنواة المتكئة (Nucleus Accumbens).\n\nهذا يعني أنهم مدفوعون بشكل طبيعي لتحقيق المكافآت الخارجية، سواء كانت شهرة، أو سلطة، أو اهتماماً من الآخرين، أو مجرد شعور بالفرح. عندما ينجح الشخص الاجتماعي، يشعر بـ "هبة" قوية من السعادة والتشجيع، وهي التجربة التي يشاركها مع الآخرين، مما يعزز علاقته بهم. هذا الدافع القوي يجعل الاجتماعيين طموحين ونشطين ومستعدين لتحمل المخاطر، سواء كانت مخاطر مالية أو اجتماعية أو شخصية.',
        textEn:
          'Behavioral neuroscience reveals that extraversion is tightly linked to the brain’s dopamine reward network—specifically heightened sensitivity of D2 receptors in the thalamus and nucleus accumbens. Achieving external rewards triggers a powerful surge of joy and motivation, making social individuals ambitious, energetic, and willing to take calculated risks.',
      },
      {
        heading: '٣. التكنولوجيا العصبية (ERPs) وجاذبية الوجوه البشرية ومنحنى القبول الاجتماعي (U-Curve)',
        headingEn: '3. Neurotechnology (ERPs), Human Faces & the Curvilinear Social Acceptance Curve',
        text: 'لكن ما هو المحفز الأكثر جاذبية لشخص ما؟ إنها الإجابة على هذا السؤال التي تكشف عنها دراسات التكنولوجيا العصبية الحديثة. أظهرت دراسة استخدمت قياس التفاعلات المرتبطة بالأحداث (ERPs) أن الأفراد ذوي المستويات العالية من الانبساط والانفتاح الاجتماعي يوجهون انتباهاً أكبر بكثير إلى الوجوه البشرية مقارنة بالأشياء غير الاجتماعية مثل الزهور. هذا يشير إلى أن الدماغ الاجتماعي يعطي أهمية خاصة للمحفزات الاجتماعية، ويشحنها بمعنى ومكافأة أكبر. هذا يفسر لماذا يجد الاجتماعيون سهولة في بناء شبكة علاقات واسعة ومتعددة، ولماذا يشعرون بالملل في الأماكن الهادئة. إنهم يبحثون عن "الموسيقى" في العالم، والبشر هم المصدر الرئيسي لها.\n\nتتجلى هذه القوة الاجتماعية في العديد من جوانب الحياة؛ فيوجد ارتباط قوي ومستقر بين الانبساط والسعادة العامة والرضا عن الحياة، حيث يميلون إلى تجربة المزيد من المشاعر الإيجابية يومياً، ولديهم عدد أكبر من الأصدقاء والعلاقات. ولكن يجب أن نلاحظ أن العلاقة بين الانبساط والقبول الاجتماعي ليست خطية دائماً؛ إذ أظهرت دراسة أجريت على طلاب جامعيين صينيين أن العلاقة بين الانبساط والقبول الاجتماعي كانت منحنية على شكل حرف U مقلوب، حيث كان الانبساط مفيداً للقبول حتى مستوى معين، ولكن عند الوصول إلى مستويات عالية جداً، بدأ في أن يصبح مزعجاً أو مبالغاً فيه، مما أدى إلى تسطح العلاقة. هذا يوضح أن "الإفراط في شيء جيد" يمكن أن يكون له عواقب سلبية، وأن التوازن هو المفتاح.',
        textEn:
          'Event-Related Potential (ERP) studies show that extraverted brains register significantly stronger neural responses to human faces than to non-social objects like flowers. While this drives higher daily positive affect and wider social networks, research on university students demonstrates an inverted U-shaped relationship between extraversion and peer acceptance: moderate-to-high sociability boosts acceptance, whereas extreme overbearingness flattens social receptivity.',
      },
      {
        heading: '٤. مواجهة الإرهاق الاجتماعي والمخاطرة وتحويل الطاقة إلى قوة مهنية وشخصية',
        headingEn: '4. Navigating Social Burnout, Risk-Taking & Channeling Energy into Impact',
        text: 'بالطبع، لا يمكن أن تكون هذه الطاقة والمكافأة بدون تحديات. التحدي الأكبر الذي يواجهه الاجتماعيون هو الإرهاق الاجتماعي. التفاعل المستمر مع الآخرين، على الرغم من أنه مصدر طاقة لهم، يمكن أن يصبح مفرطاً ويؤدي إلى إرهاق إذا لم يتم إدارته بوعي. كما أن حسهم القوي بالدافعية والمكافأة يجعلهم عرضة للمخاطرة، سواء في الألعاب أو في الأنشطة عالية المخاطر أو القرارات المالية والاجتماعية والشخصية الجريئة التي قد تكون مربحة جداً وقد تكون مدمرة أيضاً. لذلك، فإن إدارة هذه الطاقة القوية تتطلب وعياً وتحديد أولويات.\n\nوعلى الرغم من هذه التحديات، يمكن للشخصيات الاجتماعية أن تستخدم دافعاتها الطبيعية لتحويلها إلى قوة مبتكرة ومؤثرة. في مكان العمل، يميل الأفراد ذوو المستويات العالية من الانبساط إلى الأدوار التي تتطلب التأثير على الآخرين، مثل المبيعات، والإدارة، والتسويق، والعمل الاجتماعي. وفي الحياة الشخصية، يمكنهم استخدام شبكتهم الواسعة لتكوين فرص جديدة، وتقديم الدعم للآخرين، والمشاركة في المجتمع.\n\nباختصار، الشخصية الاجتماعية هي نظام ديناميكي يعتمد على الدافعية والمكافأة. إنها قوة طبيعية وصحية، تأتي مع مجموعة فريدة من نقاط القوة في بناء العلاقات وتحقيق السعادة، ومع إدارتها بحذر وتوازن تفتح أمام أصحابها عالماً من الفرص والأثر الإيجابي.',
        textEn:
          'The primary challenges facing social personalities are social exhaustion from unchecked over-scheduling and impulsive risk-taking driven by dopamine reward sensitivity. By setting conscious priorities, extraverts channel their natural magnetism into high-impact roles in leadership, management, marketing, sales, and community building.',
      },
    ],
    practicalExercise: {
      title: 'بروتوكول التوازن الطاقي للشخصية الاجتماعية (منع الإرهاق الاجتماعي)',
      titleEn: 'Energy Balance Protocol for Social Personalities (Preventing Social Burnout)',
      steps: [
        'قاعدة منحنى التوازن (Inverted U-Curve): امنح مساحة استماع متكافئة للطرف الآخر في الحوارات حتى لا يتحول الحماس العالي إلى اندفاع مفرط.',
        'جدولة فترات استشفاء عصبي: حتى الدماغ الاجتماعي يحتاج إلى فترات راحة يومية لتهدئة مسارات الدوبامين ومنع الإرهاق الاجتماعي.',
        'فلترة القرارات عالية المخاطر: قبل اتخاذ قرار مالي أو مهني جريء تحت تأثير الحماس اللحظي، انتظر 24 ساعة وراجع العواقب بموضوعية.',
      ],
      stepsEn: [
        'Apply the Inverted U-Curve Rule: Balance speaking enthusiasm with active listening to keep social engagement magnetic rather than overwhelming.',
        'Schedule Neural Recovery Windows: Protect daily downtime to prevent dopaminergic depletion and social burnout.',
        '24-Hour Risk Filter: Pause for 24 hours before committing to high-risk financial or personal decisions driven by excitement.',
      ],
    },
    conclusionAr:
      'باختصار، الشخصية الاجتماعية هي نظام ديناميكي يعتمد على الدافعية والمكافأة. إنها قوة طبيعية وصحية، تأتي مع مجموعة فريدة من نقاط القوة في بناء العلاقات وتحقيق السعادة. ومع ذلك، فإنها تتطلب وعياً وإدارة حذرة للحفاظ على التوازن ومنع الإرهاق. إن فهم هذا المحرك الداخلي يمكن للشخصيات الاجتماعية أن يفتح أمامهم عالماً من الفرص، ويساعدهم على توجيه طاقتهم الهائلة نحو أهداف ذات معنى، وجعل تأثيرهم في العالم أكبر وأكثر إيجابية.',
    conclusionEn:
      'In summary, the social personality is a dynamic reward-driven system rich in relational warmth and vitality. When paired with mindful self-regulation, it opens extraordinary avenues for leadership and positive human impact.',
    apaReferences: [
      {
        citation: 'Individual differences in extraversion and dopamine genetics predict neural reward responses. ScienceDirect (S0926641005002880).',
        noteAr: 'دور الجينات الدوبامينية ومسارات المكافأة في تفسير الفروق الفردية في الانبساطية.',
        noteEn: 'Genetic and neuroimaging evidence linking dopamine D2 pathways to extraversion.',
      },
      {
        citation: 'Do extraverts process social stimuli differently from introverts? PMC - NIH (PMC3129862).',
        noteAr: 'دراسة التفاعلات العصبية المرتبطة بالأحداث (ERPs) واستجابة الدماغ للوجوه البشرية.',
        noteEn: 'ERP study demonstrating heightened neural processing of human faces in extraverts.',
      },
      {
        citation: 'Curvilinear Effects of Extraversion on Socialization Outcomes. Frontiers in Psychology (10.3389/fpsyg.2021.652834).',
        noteAr: 'توثيق العلاقة المنحنية (U-Shape) بين الانبساط والقبول الاجتماعي.',
        noteEn: 'Empirical proof of the curvilinear relationship between extraversion and peer acceptance.',
      },
    ],
  },

  // =========================================================================
  // مقال 3: الشخصيات القيادية - من الصفات الجوهرية إلى الأداء الفعال
  // =========================================================================
  {
    id: 'article-3-leadership-personalities-core-traits-effective-performance',
    articleType: 'narrative',
    title: 'مقال 3: الشخصيات القيادية - من الصفات الجوهرية إلى الأداء الفعال',
    titleEn: 'Article 3: Leadership Personalities — From Core Traits to Effective Performance',
    category: 'self_growth',
    categoryLabelAr: 'القيادة وتطوير الذات والأداء',
    categoryLabelEn: 'Leadership & Performance Psychology',
    readTime: '13 دقيقة قراءة',
    readTimeEn: '13 min read',
    publishDate: '2026-11-17',
    icon: '👑',
    coverGradient: 'from-amber-600/30 via-indigo-600/20 to-emerald-800/30',
    summary:
      'منذ فرضية «الرجل العظيم» لتوماس كارلايل (1840) وفرانسيس غالتون (1869) إلى تحليلات الميتا-تحليل المعاصرة للنموذج الخمسي الكبير، يوضح هذا المقال كيف تتفاعل سمات الانضباط والانفتاح والانسجام والاستقرار العاطفي مع «الدافعية للقيادة» و«القيادة المعرفية» وقوة الموقف عند والتر ميشيل.',
    summaryEn:
      'From Thomas Carlyle’s "Great Man" theory (1840) to modern Big Five meta-analyses, this article examines how Conscientiousness, Openness, Extraversion, Agreeableness, and Emotional Stability interact with "Motivation to Lead," "Cognitive Leadership," and Walter Mischel’s situational strength.',
    scientificFramework:
      'تحليلات الميتا-تحليل للقيادة والعوامل الخمسة الكبرى • الدافعية للقيادة (Hoffman & Johnson) • القيادة المعرفية (Cognitive Leadership) • نظرية الشخصية في موقف (Walter Mischel)',
    scientificFrameworkEn:
      'Big Five Leadership Meta-Analyses • Motivation to Lead (Hoffman & Johnson) • Cognitive Leadership Neuroscience • Walter Mischel Situational Strength Theory',
    clinicalCaseQuoteAr:
      '«لم تعد القيادة تُعتبر موهبة غامضة يولد بها القليلون، بل هي نتاج متكامل يتفاعل فيه ملفك الشخصي مع الدافعية للقيادة، العمليات المعرفية العليا، وطبيعة الموقف.»',
    clinicalCaseQuoteEn:
      '“Leadership is no longer a mysterious birthright; it is an emergent synergy of personality traits, motivation to lead, executive cognition, and situational context.”',
    keyTakeaways: [
      'تحولت نظريات القيادة من فكرة «الرجل العظيم» (كارلايل 1840 وغالتون 1869) إلى فهم تفاعلي يدمج السمات الشخصية مع السلوك والثقافة والموقف.',
      'تُثبت دراسات الميتا-تحليل أن «الانضباط» (Conscientiousness) هو أقوى متنبئ بالأداء القيادي والوظيفي العام، يليه الانفتاح والانبساط في الأدوار الاستراتيجية والابتكارية.',
      'تؤثر «العصابية» سلباً على الأداء القيادي وإدارة الأزمات، بينما يعزز «الانسجام / الوفاق» القيادة الديمقراطية وبناء الفرق المتماسكة.',
      'تميز الأبحاث الحديثة بين «الدافعية للقيادة» (الرغبة في تحفيز الآخرين لهدف مشترك) وبين مجرد السعي للسلطة، إلى جانب «القيادة المعرفية» المرتبطة بوظائف الدماغ العليا واتخاذ القرار تحت الضغط.',
      'وفق نظرية والتر ميشيل (Walter Mischel)، تظهر سمات القائد بقوة في «المواقف الضعيفة» غير المهيكلة، بينما قد تكبتها القواعد الصارمة في «المواقف القوية».',
    ],
    keyTakeawaysEn: [
      'Leadership science evolved from Carlyle’s 1840 "Great Man" hypothesis to an integrative trait-situation-behavior model.',
      'Meta-analyses confirm Conscientiousness as the premier predictor of leadership effectiveness across professions, alongside Openness and Extraversion.',
      'Neuroticism negatively impacts crisis leadership, whereas Agreeableness empowers democratic and collaborative team building.',
      '"Motivation to Lead" (Hoffman & Johnson) and "Cognitive Leadership" (prefrontal/temporoparietal executive function) explain how leaders solve complex problems under pressure.',
      'Walter Mischel’s situational theory shows that personality traits shine brightest in "weak" (unstructured) situations compared to rigid "strong" situations.',
    ],
    contentParagraphs: [
      {
        heading: '١. مدخل وتطور تاريخي: من فكرة «الرجل العظيم» (1840) إلى انتعاش علم نفس القيادة',
        headingEn: '1. Historical Evolution: From the "Great Man" Theory (1840) to Modern Leadership Science',
        text: 'منذ أيام توماس كارلايل (Thomas Carlyle) الذي رأى أن تاريخ العالم هو مجرد سلسلة من أفعال الرجال العظماء، يتساءل البشر عن طبيعة القيادة: هل هي موهبة فطرية يولد بها القائد؟ أم هي مهارة يمكن تعلّمها وتطويرها؟ يجيب هذا المقال على هذه الأسئلة المعقدة من خلال دمج النظرية الكلاسيكية عن الصفات مع الإطار العلمي الحديث للنموذج الخمسي الكبير للشخصية.\n\nبدأت رحلة البحث عن صفات القادة في أوائل القرن العشرين، مدفوعة بفكرة "الرجل العظيم" التي اقترحها توماس كارلايل في عام 1840. اعتقد كارلايل، وكذلك فرانسيس غالتون (Francis Galton) في كتابه "العبقرية الوراثية" (Hereditary Genius) عام 1869، أن القادة هم أفراد استثنائيون يولدون بصفات خاصة لا يمكن للآخرين اكتسابها. في الأربعينيات من القرن الماضي، بدأت نظرية السمات في تراجع شعبيتها مع اعتراف الباحثين بدور عوامل أخرى مثل الثقافة والبيئة. ومع ذلك، شهد العقد الأول من الألفية الجديدة انتعاشاً كبيراً للنظرية السلوكية ونظرية السمات، ليس على أنها الحل الوحيد، بل كمكون مهم في المعادلة المعقدة للقيادة الفعالة. لقد تحولت النظرة من فكرة أن الصفات "تقرر" النجاح إلى فكرة أن الشخصية هي جزء من مجموعة من العوامل التي تساهم في فعالية القائد، إلى جانب الأحداث الحالية والثقافة والرسالة.',
        textEn:
          'Since Thomas Carlyle (1840) and Francis Galton (1869) proposed that leaders are born with不可-acquirable hereditary genius, psychology has debated whether leadership is innate or developed. In the 21st century, trait theory experienced a scientific renaissance—not as a deterministic destiny, but as a vital component interacting with culture, mission, and context.',
      },
      {
        heading: '٢. العوامل الخمسة الكبرى والأداء القيادي وتفاعل الأساليب القيادية',
        headingEn: '2. The Big Five in Leadership Meta-Analyses & Leadership Style Matching',
        text: 'في قلب هذا النموذج المعاصر يقف النموذج الخمسي الكبير، الذي يوفر إطاراً علمياً قوياً لفهم كيف تؤثر الصفات الشخصية على القيادة. أظهرت تحليلات الميتا-تحليل المتعددة أن بعض صفات النموذج الخمسي الكبير مرتبطة بشكل قوي بالأداء القيادي:\n• على رأس هذه الصفات يأتي «الانضباط» (Conscientiousness)، وهو يتنبأ بالأداء الوظيفي عبر جميع المهن تقريباً؛ فالقائد المنضبط منظم، ومسؤول، ومتحمس، ويحافظ على تركيزه حتى في مواجهة التحديات.\n• ثانياً، يأتي «الانفتاح» و«الانبساط»، واللذان يرتبطان بالقدرة على القيادة، خاصة في الأدوار التي تتطلب الرؤية الاستراتيجية والابتكار وتحمل المخاطر.\n• وعلى النقيض من ذلك، فإن سمة «العصابية / التقلب العاطفي» (Neuroticism) ترتبط بشكل سلبي بالأداء القيادي الفعال؛ إذ يجد القادة الذين يعانون من اضطرابات عاطفية صعوبة في إدارة الضغوط، والتعامل مع الأزمات، وبناء ثقة الفريق.\n• وأخيراً، يأتي «الانسجام / الوفاق» (Agreeableness) الذي يعكس التوجه نحو التعاون، ويرتبط بشكل إيجابي بالأداء القيادي في الأدوار التي تتطلب بناء العلاقات والتفاوض.\n\nلكن الأمر لا يقتصر على وجود هذه الصفات، بل يتعلق بكيفية تفاعلها وتشكيل نمط قيادي فريد: فالقائد الذي يتمتع بمستويات عالية من الانفتاح/الانبساط وانخفاض الانسجام قد يكون فعالاً بشكل خاص في أسلوب القيادة الرسمي الحازم، بينما يكون القائد الذي يتمتع بمستويات عالية من الانسجام والانفتاح أكثر فعالية في أسلوب القيادة الديمقراطية التشاركية.',
        textEn:
          'Meta-analytic reviews demonstrate that Conscientiousness is the most consistent predictor of leadership performance across domains, followed by Openness and Extraversion for strategic innovation. Neuroticism impairs stress management during crises, whereas Agreeableness fosters cohesive teams. Crucially, trait combinations shape leadership styles—matching personality profile to directive versus democratic leadership.',
      },
      {
        heading: '٣. «الدافعية للقيادة»، «القيادة المعرفية»، ونظرية والتر ميشيل عن قوة الموقف',
        headingEn: '3. Motivation to Lead, Cognitive Leadership & Walter Mischel’s Situational Strength',
        text: 'لكن ماذا عن الدافع الحقيقي وراء رغبة الشخص في أن يصبح قائداً؟ هنا يأتي دور مفهوم "الدافعية للقيادة" (Motivation to Lead)، الذي يميزه بريان هوفمان وجاري جونسون كصفة أساسية للقادة. هذه الدافعية هي الرغبة القوية في تحفيز الآخرين لتحقيق أهداف مشتركة، وهي تختلف عن مجرد الرغبة في السلطة أو الاعتراف؛ إنها المحرك الداخلي الذي يدفع القائد إلى تجاوز الحدود وتحقيق الإنجازات الاستثنائية.\n\nبالإضافة إلى ذلك، هناك مفهوم "القيادة المعرفية" (Cognitive Leadership)، وهو إطار حديث يركز على العمليات المعرفية للقائد، ويربط بين وظائف الدماغ العليا (مثل قشرة الفص الجبهي والفص الصدغي الجداري) وفعالية القائد في حل المشكلات واتخاذ القرارات تحت الضغط، والتخطيط الاستراتيجي، والتفكير النقدي، وإدارة المشاعر.\n\nومع ذلك، من الأهمية بمكان ألا نبالغ في أهمية الصفات الشخصية وحدها. تنص نظرية والتر ميشيل (Walter Mischel) عن "الشخصية في موقف" على أن تأثير الصفات الشخصية على السلوك يعتمد بشكل كبير على طبيعة الموقف: ففي المواقف "الضعيفة" (Weak Situations) التي تكون فيها القواعد غير واضحة، تظهر الصفات الشخصية بشكل أكبر. أما في المواقف "القوية" (Strong Situations) التي تكون فيها القواعد والمعايير واضحة وصارمة (مثل شركة ميكانيكية)، فإن الضغط الاجتماعي القوي قد يكبت التعبير عن الصفات الشخصية، مما يجعل تأثيرها أقل بروزاً. هذا يعني أن فعالية القائد لا تتعلق فقط بمن هو، بل أيضاً بما يحدث حوله.',
        textEn:
          'Brian Hoffman and Gary Johnson highlight "Motivation to Lead"—the intrinsic drive to mobilize others toward shared goals rather than mere power-seeking. Simultaneously, "Cognitive Leadership" links executive brain networks (prefrontal and temporoparietal cortex) to strategic decision-making under pressure. Finally, Walter Mischel’s person-situation theory reminds us that traits express strongly in unstructured "weak" situations, whereas rigid "strong" organizational situations can constrain individual trait expression.',
      },
    ],
    diagnosticTable: {
      titleAr: 'جدول العوامل الخمسة الكبرى ودورها في القيادة (من الملف ص 9)',
      titleEn: 'Big Five Traits, Role in Leadership & Potential Leadership Style',
      col1Ar: 'صفة من الخمسة الكبرى',
      col1En: 'Big Five Trait',
      col2Ar: 'الدور في القيادة',
      col2En: 'Role in Leadership',
      col3Ar: 'نمط القيادة المحتمل',
      col3En: 'Potential Leadership Style',
      rows: [
        {
          criterionAr: 'الانضباط (Conscientiousness)',
          criterionEn: 'Conscientiousness',
          naturalAr: 'أفضل مؤشر للقدرة على القيادة؛ يرتبط بالأداء الوظيفي العام والالتزام بالأهداف.',
          naturalEn: 'Strongest predictor of leadership; linked to overall job performance and goal commitment.',
          manipulationAr: 'القيادة المؤسسية، والقيادة التحويلية.',
          manipulationEn: 'Institutional Leadership & Transformational Leadership.',
        },
        {
          criterionAr: 'الانفتاح (Openness)',
          criterionEn: 'Openness to Experience',
          naturalAr: 'يرتبط بالقدرة على القيادة، خاصة في الأدوار التي تتطلب الرؤية الاستراتيجية والابتكار.',
          naturalEn: 'Linked to leadership effectiveness in roles requiring strategic vision and innovation.',
          manipulationAr: 'القيادة التحويلية، والقيادة الرؤيوية.',
          manipulationEn: 'Transformational Leadership & Visionary Leadership.',
        },
        {
          criterionAr: 'الانبساطية (Extraversion)',
          criterionEn: 'Extraversion',
          naturalAr: 'ترتبط بالطاقة والمبادرة وتحفيز الفرق والاستعداد لتحمل المخاطر نحو أهداف طموحة.',
          naturalEn: 'Associated with initiative, team mobilization, and boldness in pursuing ambitious goals.',
          manipulationAr: 'القيادة التحويلية، والقيادة التحفيزية.',
          manipulationEn: 'Transformational & Charismatic/Motivational Leadership.',
        },
        {
          criterionAr: 'الانسجام / الوفاق (Agreeableness)',
          criterionEn: 'Agreeableness',
          naturalAr: 'يرتبط بشكل إيجابي بالأداء القيادي والقدرة على بناء العلاقات والتفاوض وتماسك الفريق.',
          naturalEn: 'Positively linked to relationship building, negotiation, and team cohesion.',
          manipulationAr: 'القيادة الديمقراطية، والقيادة التحفيزية.',
          manipulationEn: 'Democratic Leadership & Supportive/Motivational Leadership.',
        },
        {
          criterionAr: 'العصابية مقابل الاستقرار العاطفي',
          criterionEn: 'Neuroticism vs. Emotional Stability',
          naturalAr: 'ترتبط العصابية بشكل سلبي بالأداء القيادي الفعال، بينما يرتبط الاستقرار العاطفي بالقدرة على إدارة الضغوط والأزمات.',
          naturalEn: 'Neuroticism negatively impacts leadership; emotional stability enables crisis resilience.',
          manipulationAr: 'القيادة التحفيزية، والقيادة المؤسسية المتزنة.',
          manipulationEn: 'Resilient Institutional & Motivational Leadership.',
        },
      ],
    },
    practicalExercise: {
      title: 'تمرين تطوير البصمة القيادية وفق ملفك في العوامل الخمسة',
      titleEn: 'Exercise: Developing Your Leadership Signature via the Big Five',
      steps: [
        'حدد سمتك العليا في العوامل الخمسة (هل هي الانضباط المنظم أم الانفتاح الابتكاري أم الوفاق الديمقراطي؟) واختر أسلوب القيادة المتناغم معها.',
        'افحص «الدافعية للقيادة» لديك: انتقل من التركيز على المنصب إلى صياغة هدف مشترك يلهم فريقك أو أسرتك.',
        'حلل طبيعة الموقف (وفق والتر ميشيل): في المواقف الغامضة («الضعيفة») قدّم رؤية وهيكلية واضحة، وفي المواقف الروتينية («القوية») افتح مساحة للإبداع والمشاركة.',
      ],
      stepsEn: [
        'Identify your dominant Big Five trait and align your leadership style (Institutional, Visionary, or Democratic) accordingly.',
        'Clarify your Motivation to Lead by focusing on shared team purpose rather than positional authority.',
        'Assess Situational Strength (Mischel): provide clear structure in ambiguous situations and foster autonomy in overly rigid ones.',
      ],
    },
    conclusionAr:
      'في الختام، لم تعد القيادة تُعتبر موهبة غامضة، بل أصبحت مجالاً للدراسة العلمية. إنها ليست نتيجة لصفة واحدة، بل هي نتاج معقد من الصفات الشخصية، والمهارات المكتسبة، والدافعية الداخلية، والظروف المحيطة. يوفر النموذج الخمسي الكبير إطاراً قوياً لفهم هذه المعادلة المعقدة ويساعدنا على رؤية أن كل شخص لديه إمكانات قيادية فريدة يمكن تطويرها. سواء كنت تنطلق في مسارك المهني، أو تعمل على تحسين فريقك، فإن فهم هذه الديناميكيات يمكن أن يكون بمثابة خريطة طريق لتصبح قائداً أكثر فعالية، ليس فقط في عينيك، ولكن في عيون من تؤثر عليهم.',
    conclusionEn:
      'In conclusion, leadership is a scientifically grounded synergy of personality traits, acquired skills, intrinsic motivation, and situational awareness. Understanding the Big Five provides a roadmap for unlocking your unique leadership potential.',
    apaReferences: [
      {
        citation: 'Judge, T. A., Bono, J. E., Ilies, R., & Gerhardt, M. W. (2002). Personality and leadership: A qualitative and quantitative review. Journal of Applied Psychology, 87(4), 765-780.',
        noteAr: 'مراجعة الميتا-تحليل المرجعية للعلاقة بين العوامل الخمسة الكبرى والقيادة.',
        noteEn: 'Landmark meta-analytic review of the Big Five traits and leadership effectiveness.',
      },
      {
        citation: 'Neuroscientific Foundations of Cognitive Leadership and its Impact on Decision-Making. JMSR Online (319).',
        noteAr: 'الأسس العصبية للقيادة المعرفية واتخاذ القرار الاستراتيجي تحت الضغط.',
        noteEn: 'Neuroscientific analysis of executive brain function in cognitive leadership.',
      },
      {
        citation: 'The Trait Theory of Leadership. Program on Negotiation — Harvard Law School.',
        noteAr: 'تطور نظرية السمات القيادية وتفاعلها مع الموقف.',
        noteEn: 'Evolution of trait leadership models and situational interaction.',
      },
    ],
  },

  // =========================================================================
  // مقال 4: العوامل الخمسة الكبرى - تحليل شامل للنموذج الخمسي كخريطة للشخصية البشرية
  // =========================================================================
  {
    id: 'article-4-big-five-comprehensive-analysis-map-of-human-personality',
    articleType: 'narrative',
    title: 'مقال 4: العوامل الخمسة الكبرى - تحليل شامل للنموذج الخمسي كخريطة للشخصية البشرية',
    titleEn: 'Article 4: The Big Five — A Comprehensive Analysis of the Five-Factor Model as a Map of Human Personality',
    category: 'emotional_iq',
    categoryLabelAr: 'خريطة الشخصية والوعي الذاتي',
    categoryLabelEn: 'Personality Mapping & Self-Awareness',
    readTime: '14 دقيقة قراءة',
    readTimeEn: '14 min read',
    publishDate: '2026-11-17',
    icon: '🗺️',
    coverGradient: 'from-emerald-600/30 via-teal-600/20 to-indigo-800/30',
    summary:
      'تخيل خريطة لعالم النفس البشري لا ترسم الجبال والأنهار بل ترسم اختلافاتنا الداخلية. يستعرض هذا المقال الشامل قصة اكتشاف العوامل الخمسة الكبرى منذ الفرضية المعجمية لألبورت وأودبرت (1936) وكاتل وتوبس وكريستال وصولاً إلى كوستا وماكراي (NEO-PI)، مع تحليل الأبعاد الخمسة، تطبيقاتها في الصحة والعمل والعلاقات، ونقدها الأكاديمي وظهور نموذج HEXACO.',
    summaryEn:
      'Imagine a map of the human psyche charting our inner differences. This comprehensive article traces the discovery of the Big Five from Allport & Odbert’s 1936 Lexical Hypothesis, Cattell, and Tupes & Christal to Costa & McCrae’s NEO-PI, detailing all five dimensions, real-world life outcomes, cross-cultural debates, and the rise of HEXACO.',
    scientificFramework:
      'الفرضية المعجمية (Allport & Odbert, 1936) • التحليل العاملي (Cattell; Tupes & Christal; Norman) • مقياس الشخصية NEO-PI (Costa & McCrae) • نموذج HEXACO والدراسات عبر الثقافات',
    scientificFrameworkEn:
      'Lexical Hypothesis (Allport & Odbert, 1936) • Factor Analysis (Cattell; Tupes & Christal; Norman) • NEO-PI (Costa & McCrae) • HEXACO & Cross-Cultural Psychometrics',
    clinicalCaseQuoteAr:
      '«إن النموذج الخمسي الكبير لا يضع علامات جامدة على الناس، بل يمنحنا لغة مهذبة ودقيقة للتحدث عن اختلافاتنا وفهم الذات والآخرين.»',
    clinicalCaseQuoteEn:
      '“The Big Five does not place rigid labels on people; it gives us a refined, accurate language to understand our differences, ourselves, and others.”',
    keyTakeaways: [
      'بدأت قصة اكتشاف الخمسة الكبرى من «فرضية اللغة / الفرضية المعجمية» التي اقترحها غوردون ألبورت وهنري أودبرت عام 1936 عبر تصنيف 18,000 كلمة تصف سلوك البشر.',
      'طوّر ريموند كاتل التحليل العاملي، ثم أثبت إرنست توبس ورونالد كريستال ووارين نورمان وجود 5 عوامل كبرى، ورسخها بول كوستا وروبرت ماكراي عبر مقياس NEO-PI.',
      'تشمل الأبعاد الخمسة: (1) الانضباط، (2) الانفتاح على التجارب، (3) الانبساطية، (4) الانسجام/الوفاق، و(5) الاستقرار العاطفي مقابل العصابية.',
      'تتنبأ هذه الخريطة بالأداء الوظيفي، التحصيل الأكاديمي، الرضا عن العلاقات، والصحة الجسدية والقلبية ومتوسط العمر.',
      'أدت المراجعات النقدية للنموذج إلى تطوير نموذج HEXACO الذي يضيف بُعد «الصدق/التواضع» للتنبؤ بسلوكيات الاستغلال والثلاثية الداكنة، إلى جانب دراسة الفروق عبر أكثر من 50 ثقافة.',
    ],
    keyTakeawaysEn: [
      'The Big Five originated in Allport and Odbert’s 1936 Lexical Hypothesis, cataloging 18,000 trait terms in human language.',
      'Factor-analytic breakthroughs by Cattell, Tupes & Christal, Norman, and Costa & McCrae (NEO-PI) established the Five-Factor structure.',
      'The 5 continua—Conscientiousness, Openness, Extraversion, Agreeableness, and Emotional Stability (vs. Neuroticism)—predict career, academic, relational, and longevity outcomes.',
      'Critiques that the Big Five is "descriptive rather than explanatory" spurred extensions like HEXACO, adding Honesty-Humility to detect Dark Triad exploitation.',
      'While replicated across 50+ cultures, indigenous dimensions such as interpersonal harmony in China and social curiosity in the Philippines enrich cross-cultural psychology.',
    ],
    contentParagraphs: [
      {
        heading: '١. مدخل وقصة الاكتشاف: من فرضية اللغة (1936) و18,000 كلمة إلى مقياس NEO-PI',
        headingEn: '1. The Story of Discovery: From the 1936 Lexical Hypothesis (18,000 Words) to NEO-PI',
        text: 'تخيل أن هناك خريطة لعالم النفس البشري، خريطة لا ترسم الجبال والأنهار، بل ترسم اختلافاتنا الداخلية. هذه الخريطة ليست تخيلية، بل هي النموذج الخمسي الكبير للشخصية، وهو الإطار الأكثر قبولاً وبحثاً في علم النفس الحديث لفهم من نحن. إنه لا يصنفنا، بل يمنحنا لغة لوصف مدى توجهنا نحو التفكير أو الشعور، نحو الانضباط أو الانبساطية، نحو الانفتاح على التجارب أو التمسك بالمعتاد.\n\nإن قصة اكتشاف الخمسة الكبرى هي قصة استكشاف لغتنا. البداية تعود إلى فرضية اللغة (الفرضية المعجمية)، التي اقترحها غوردون ألبورت وهنري أودبرت (Gordon Allport & Henry Odbert) في عام 1936. هذه الفرضية البسيطة والعميقة تنص على أنه إذا كان هناك تمييز مهم ومستمر في سلوك الناس، فإن لغتنا ستخلق له كلمة. أخذ ألبورت وأودبرت هذه الفكرة وقاما بتصنيف حوالي 18,000 كلمة في القاموس تصف سلوك الناس وخصائصهم.\n\nهذا العمل الضخم قدم المادة الخام التي كانت بحاجة إليها الرياضيات والإحصاء. ففي الستينيات، قام ريموند كاتل بتطبيق تحليل العوامل على هذه الكلمات، ووجد أنه يمكن اختزالها إلى مجموعة من العوامل الأساسية. ثم جاء إرنست توبس ورونالد كريستال في قاعدة جوية أمريكية، وعندما أعادا تحليل بيانات كاتل، وجدا أن البيانات كانت تدعم بشكل قوي وجود خمسة عوامل رئيسية فقط. كانت هذه النقطة المحورية، وعمل وارين نورمان وبول كوستا وروبرت ماكراي (Paul Costa & Robert McCrae) لاحقاً على هذه الفكرة، وطوروا أدوات قياس قوية مثل مقياس الشخصية (NEO Personality Inventory - NEO-PI)، مما أدى إلى ترسيخ النموذج الخمسي الكبير كإطار عمل قياسي في علم النفس.',
        textEn:
          'Imagine a map of the human psyche charting our inner differences. Its discovery began with Gordon Allport and Henry Odbert’s 1936 Lexical Hypothesis: any socially significant human difference becomes encoded into language. Cataloging 18,000 dictionary descriptors provided the raw material for Raymond Cattell’s factor analysis, followed by Ernest Tupes and Raymond Christal’s discovery of five recurrent factors, later standardized by Warren Norman and Paul Costa & Robert McCrae’s NEO-PI.',
      },
      {
        heading: '٢. الأبعاد الخمسة الرئيسية للشخصية البشرية بالتفصيل',
        headingEn: '2. The Five Major Dimensions of Human Personality in Detail',
        text: 'اليوم، يقسم النموذج الخمسي الكبير الشخصية البشرية إلى خمسة أبعاد رئيسية، وكل منها يمثل طيفاً من السلوكيات والمشاعر والأفكار:\n\n1. الانضباط (Conscientiousness): يصف مدى الترتيب والتنظيم والمسؤولية التي يتمتع بها الشخص. الأفراد ذوو المستويات العالية من الانضباط هم منظمون، متحفظون، ومحفزون، ويتمتعون بقدرة عالية على التحكم في أنفسهم لتحقيق أهدافهم طويلة الأمد. على النقيض من ذلك، يميل الأفراد ذوو المستويات المنخفضة إلى عدم التنظيم، وعدم اليقظة، والاعتماد على اللحظة، والاندفاع.\n\n2. الانفتاح على التجارب (Openness to Experience): يقيس مدى انفتاح الشخص على العالم من حوله. الأفراد ذوو المستويات العالية من الانفتاح هم فضوليون، خياليون، ومتقبلون لتجارب جديدة، ويعشقون الفن والأفكار المبتكرة، وهم على استعداد للتفكير خارج الصندوق. في المقابل، يميل الأفراد ذوو المستويات المنخفضة إلى التمسك بالمعتاد، والاهتمام بالأمور العملية، والخوف من المجهول.\n\n3. الانبساطية / الانفتاح الاجتماعي (Extraversion): يصف مدى الانغماس في العالم الخارجي والتفاعلات الاجتماعية. الأفراد ذوو المستويات العالية هم اجتماعيون، طموحون، ونشيطون، ويشعرون بالطاقة من خلال التفاعل مع الآخرين، ويحبون أن يكونوا في مركز الأنشطة. أما الأفراد ذوو المستويات المنخفضة فيميلون إلى الانسحاب من التفاعل الاجتماعي، واحتضان الأنشطة الهادئة والداخلية.\n\n4. الانسجام / الوفاق (Agreeableness): يقيس مدى التوجه نحو التعاون والثقة. الأفراد ذوو المستويات العالية من الانسجام هم لطفاء، متعاونون، وموثوقون، ويرغبون في الحفاظ على العلاقات السلمية، ويميلون إلى الاعتقاد بأن الناس خيرون في جوهرهم. في المقابل، يميل الأفراد ذوو المستويات المنخفضة إلى أن يكونوا أكثر مباشرة، وقليلي التنازل، ويركزون على تحقيق مصالحهم الخاصة.\n\n5. الاستقرار العاطفي مقابل العصبية (Emotional Stability vs. Neuroticism): يقيس الاستقرار العاطفي. الأفراد ذوو المستويات العالية من العصبية هم قلقون، وعاطفيون، ويتعرضون لمشاعر سلبية مثل الحزن والغضب والقلق، وهم أكثر عرضة للضغط النفسي. أما الأفراد ذوو المستويات المنخفضة من العصبية (المستقرون عاطفياً) فيتمتعون بسلام عاطفي، وثبات، وتحكم جيد في مشاعرهم.',
        textEn:
          'Today, the Big Five maps human personality across five continuous spectra: (1) Conscientiousness (orderliness, self-control, and long-term dependability vs. impulsivity), (2) Openness to Experience (curiosity, imagination, and originality vs. conventionality), (3) Extraversion (sociability, ambition, and external energy vs. quiet reserve), (4) Agreeableness (trust, kindness, and cooperative harmony vs. tough-minded directness), and (5) Emotional Stability vs. Neuroticism (calm resilience vs. anxiety and stress vulnerability).',
      },
      {
        heading: '٣. التطبيقات العملية في الحياة والعمل والصحة، والنقد الأكاديمي (نموذج HEXACO والثقافات)',
        headingEn: '3. Real-World Applications in Career & Health, Academic Critiques, HEXACO & Culture',
        text: 'هذه الخريطة ليست مجرد تصنيف نظري، بل لها تطبيقات عملية ونتائج ملموسة في جميع جوانب الحياة. أظهرت الأبحاث أن هذه الصفات يمكن أن تتنبأ بالأداء الوظيفي، والنجاح الأكاديمي، والصحة الجسدية والنفسية، وحتى متوسط العمر. على سبيل المثال، يعتبر الانضباط أفضل مؤشر للقدرة على القيادة والأداء الوظيفي العام، كما أنه يتنبأ بالنجاح الأكاديمي وتحصيل الدرجات المرتفعة. من ناحية أخرى، يرتبط الانبساط العالي بالرضا العام عن الحياة والسعادة. أما العصبية المرتفعة، فهي عامل خطر رئيسي للكثير من المشاكل الصحية، بما في ذلك القلق والاكتئاب والمشاكل القلبية، بينما يرتبط الانسجام (الوفاق) العالي والاستقرار العاطفي بالرضا عن العلاقات.\n\nعلى الرغم من نجاحه الهائل، لم يخل النموذج الخمسي الكبير من النقد. من أبرز هذه الانتقادات أنه "وصف وليس شرحاً"؛ فهو ينظم كيف نختلف، ولكنه لا يفسر لماذا نتصرف بهذه الطريقة. كما أن بعض النقاد يرون أنه قد يكون واسعاً جداً بحيث يفقد بعض التفاصيل الدقيقة. هذا دفع الباحثين إلى تطوير نماذج بديلة أو موسعة، ومن أشهر هذه النماذج نموذج HEXACO الذي يضيف بُعداً جديداً هو "الصدق/التواضع" (Honesty-Humility)، والذي يُعتقد أنه يتنبأ بشكل أفضل بسلوكيات الاستغلال مثل تلك الموجودة لدى "الثلاثية الداكنة" (النرجسية، الماكيافيلية، والعنف النفسي/السيكوباتية).\n\nكما أن هناك نقاشات مستمرة حول مدى انتشار النموذج في جميع الثقافات. على الرغم من أن بنية الخمسة الكبرى تظهر بشكل مدهش عبر أكثر من 50 ثقافة، إلا أن هناك بعض التحفظات؛ فعلى سبيل المثال، قد لا يظهر البعد الخامس (الانفتاح) كعامل مستقل بوضوح في بعض الثقافات الآسيوية حيث قد يندمج مع عوامل أخرى، كما تم اقتراح عوامل ثقافية محلية أخرى، مثل "العلاقات الإنسانية" في الصين، و"الفضول الاجتماعي" في الفلبين.',
        textEn:
          'Beyond theory, the Big Five predicts job performance, academic grades, relationship satisfaction, cardiovascular health, and longevity. Still, critics note that it is descriptive rather than causal, prompting expanded models such as HEXACO—which adds Honesty-Humility to better counter Dark Triad behaviors (narcissism, Machiavellianism, psychopathy)—as well as cross-cultural studies across 50+ nations exploring indigenous traits in Asia.',
      },
    ],
    diagnosticTable: {
      titleAr: 'جدول أبعاد النموذج الخمسي الكبير: التعريف العام، نقاط القوة، ونقاط الضعف المحتملة (من الملف ص 12)',
      titleEn: 'Big Five Dimensions Table: American/European Names, Definition, Strengths & Potential Weaknesses',
      col1Ar: 'البعد (الاسم الأمريكي / الأوروبي) والتعريف العام',
      col1En: 'Dimension (US / European Name) & Definition',
      col2Ar: 'نقاط القوة المحتملة (المستوى المرتفع)',
      col2En: 'Potential Strengths',
      col3Ar: 'نقاط الضعف المحتملة (عند التطرف أو الانخفاض)',
      col3En: 'Potential Weaknesses',
      rows: [
        {
          criterionAr: 'الانضباط / الاعتمادية (Conscientiousness): القدرة على التحكم في النفس والالتزام بالمسؤوليات والعمل بجد.',
          criterionEn: 'Conscientiousness / Dependability: Self-control, responsibility, and diligence.',
          naturalAr: 'منظم، موثوق، مسؤول، يركز، متحمس لإنجاز الأهداف.',
          naturalEn: 'Organized, reliable, responsible, focused, goal-driven.',
          manipulationAr: 'فوضوي، غير مسؤول، غير منضبط، يتأخر، يفتقر إلى الإرادة.',
          manipulationEn: 'Disorganized, unreliable, undisciplined, procrastinating, impulsive.',
        },
        {
          criterionAr: 'الانفتاح / الثقافة (Openness / Culture): الانفتاح على مجموعة واسعة من الخبرات والأفكار والتجارب.',
          criterionEn: 'Openness / Culture: Receptivity to broad experiences, ideas, and aesthetics.',
          naturalAr: 'خيالي، فضولي، مبدع، مثقف، مفتوح للنقاش.',
          naturalEn: 'Imaginative, curious, creative, cultured, open to dialogue.',
          manipulationAr: 'عملي بصرامة، مباشر، متمسك بالمعتاد، غير مبدع، غير متحمس للأفكار الجديدة.',
          manipulationEn: 'Overly rigid, conventional, uncreative, resistant to new ideas.',
        },
        {
          criterionAr: 'الانبساطية / الانفتاح الاجتماعي (Extraversion): الطاقة والتفاعل الاجتماعي والانغماس في العالم الخارجي.',
          criterionEn: 'Extraversion: Social energy and engagement with the external world.',
          naturalAr: 'اجتماعي، طموح، طاقوي، متحمس، يحب أن يكون في المركز.',
          naturalEn: 'Sociable, ambitious, energetic, enthusiastic, expressive.',
          manipulationAr: 'هادئ، مكتفٍ، يفضل العزلة، غير مطالب، غير متحمس للصخب الاجتماعي.',
          manipulationEn: 'Reserved, solitary, quiet, low social assertiveness.',
        },
        {
          criterionAr: 'الانسجام / الوفاق (Agreeableness): التوجه نحو التعاون والثقة والتعاطف مع الآخرين.',
          criterionEn: 'Agreeableness: Orientation toward cooperation, trust, and empathy.',
          naturalAr: 'لطيف، متعاون، متعاطف، موثوق، مسالم ومتسامح.',
          naturalEn: 'Kind, cooperative, empathetic, trustworthy, forgiving.',
          manipulationAr: 'مباشر بحدة، غير متعاون، يشكك في نوايا الآخرين، يركز على مصالحه الخاصة.',
          manipulationEn: 'Blunt, uncooperative, skeptical of others’ motives, self-centered.',
        },
        {
          criterionAr: 'الاستقرار العاطفي مقابل العصبية (Emotional Stability vs. Neuroticism): الثبات الانفعالي مقابل التقلب العاطفي.',
          criterionEn: 'Emotional Stability vs. Neuroticism: Calmness vs. emotional reactivity.',
          naturalAr: 'هادئ، مستقر، متفائل، متزن في مواجهة الضغوط.',
          naturalEn: 'Calm, stable, optimistic, resilient under stress.',
          manipulationAr: 'قلق، عصبي، متوتر، حزين، حساس للنقد.',
          manipulationEn: 'Anxious, tense, irritable, sad, hypersensitive to criticism.',
        },
      ],
    },
    practicalExercise: {
      title: 'تمرين قراءة خريطتك الشخصية عبر الأبعاد الخمسة',
      titleEn: 'Exercise: Mapping Your Personal Big Five Profile',
      steps: [
        'حدد موقعك الحالي على كل طيف من الأطياف الخمسة (من 0% إلى 100%) عبر إجراء مقياس العوامل الخمسة في مختبر الشخصية بالموقع.',
        'تأمل في بيئة عملك وعلاقاتك الحالية: هل تتناسب مع مستوى الانبساط والانفتاح لديك أم تفرض عليك ضغطاً معاكساً لطبيعتك؟',
        'استثمر نقاط قوتك الفطرية واعمل تدريجياً على تقوية عادات الانضباط والتنظيم الذاتي وتهدئة التوتر.',
      ],
      stepsEn: [
        'Locate your position across all five dimensions (0%–100%) using the Big Five assessment in our Personality Lab.',
        'Evaluate whether your current work and relational environments align with your natural extraversion and openness levels.',
        'Leverage your signature strengths while cultivating daily habits of conscientiousness and emotional regulation.',
      ],
    },
    conclusionAr:
      'في النهاية، يظل النموذج الخمسي الكبير أداة لا تقدر بثمن. إنه يوفر لنا إطاراً مشتركاً وموثوقاً لفهم النفس البشرية. إنه لا يضع علامات على الناس، بل يمنحنا لغة للتحدث عن اختلافاتنا بطريقة مهذبة ودقيقة. من خلال فهم ملفنا الشخصي، يمكننا أن نتعرف على نقاط قوتنا وضعفنا، وأن نختار المهن والبيئات التي تتناسب معنا بشكل أفضل. يمكن للمنظمات استخدامه لتحسين توظيفها وتجميع فرقها، ويمكن للباحثين استخدامه كقاعدة متينة لدراسة المزيد من الأسئلة المعقدة حول السلوك البشري. إن الخمسة الكبرى ليست خريطة نهائية، بل هي بوابة مفتوحة إلى عالم مذهل من الاختلافات الإنسانية، ودعوة مستمرة للبحث عن الذات والآخرين.',
    conclusionEn:
      'Ultimately, the Big Five remains an invaluable, scientifically trusted framework for understanding human nature—offering a respectful, accurate language to appreciate our individual differences and guide lifelong growth.',
    apaReferences: [
      {
        citation: 'Allport, G. W., & Odbert, H. S. (1936). Trait-names: A psycho-lexical study. Psychological Monographs, 47(1), i–171.',
        noteAr: 'الدراسة التأسيسية لفرضية اللغة وتصنيف 18,000 سمة في القاموس.',
        noteEn: 'Foundational psycho-lexical study cataloging 18,000 trait descriptors.',
      },
      {
        citation: 'McCrae, R. R., & Costa, P. T. (2003). Personality in adulthood: A five-factor theory perspective. Guilford Press.',
        noteAr: 'المرجع الرئيسي لنظرية العوامل الخمسة ومقياس NEO-PI.',
        noteEn: 'Core reference for Five-Factor Theory and the NEO Personality Inventory.',
      },
      {
        citation: 'Cross-Cultural Equivalence of the Big Five. Springer Nature (10.1007/978-1-4615-0763-5_14).',
        noteAr: 'دراسة التكافؤ العابر للثقافات للنموذج الخمسي الكبير في أكثر من 50 ثقافة.',
        noteEn: 'Cross-cultural validation and nuances of the Five-Factor Model across 50+ cultures.',
      },
    ],
  },
];

/**
 * النسخة البحثية/الأكاديمية الكاملة لنفس المقالات الأربع حتى تظهر أيضاً في المسار الأول (الأبحاث والدراسات)
 * بالإضافة إلى ظهورها في مسار المقالات المعرفية والسردية.
 */
export const PDF_FOUR_ACADEMIC_PAPERS: AcademicPaper[] = PDF_FOUR_NARRATIVE_ARTICLES.map(
  (art, index) => ({
    id: art.id,
    articleType: 'academic',
    titleAr: art.title,
    titleEn: art.titleEn,
    category: art.category,
    categoryLabelAr: art.categoryLabelAr,
    categoryLabelEn: art.categoryLabelEn,
    readTimeAr: art.readTime,
    readTimeEn: art.readTimeEn,
    publishDate: art.publishDate,
    icon: art.icon,
    coverGradient: art.coverGradient,
    methodologyBadgeAr: `سلسلة تحليلات العوامل الخمسة الكبرى • المقال ${index + 1} من 4`,
    methodologyBadgeEn: `Big Five Scientific Series • Article ${index + 1} of 4`,
    abstractAr: art.summary,
    abstractEn: art.summaryEn,
    keywordsAr: [
      'العوامل الخمسة الكبرى',
      'Big Five',
      index === 0
        ? 'الشخصية الانطوائية'
        : index === 1
        ? 'الشخصية الاجتماعية'
        : index === 2
        ? 'الشخصيات القيادية'
        : 'خريطة الشخصية البشرية',
      'هانس أيزنك',
      'علم الأعصاب السلوكي',
    ],
    keywordsEn: [
      'Big Five',
      'Five-Factor Model',
      index === 0
        ? 'Introversion'
        : index === 1
        ? 'Extraversion'
        : index === 2
        ? 'Leadership'
        : 'Lexical Hypothesis',
      'Hans Eysenck',
      'Cognitive Neuroscience',
    ],
    introductionAr: [art.contentParagraphs[0].text],
    introductionEn: [art.contentParagraphs[0].textEn],
    theoreticalFramework: art.contentParagraphs.slice(1, 3).map((p, idx) => ({
      sectionNumber: `2.${idx + 1}`,
      titleAr: p.heading,
      titleEn: p.headingEn,
      contentAr: p.text,
      contentEn: p.textEn,
    })),
    methodology: {
      approachAr: art.scientificFramework,
      approachEn: art.scientificFrameworkEn,
      pillarsAr: art.keyTakeaways,
      pillarsEn: art.keyTakeawaysEn,
    },
    analysisAndDiscussion: art.contentParagraphs.slice(3).map((p, idx) => ({
      sectionNumber: `4.${idx + 1}`,
      titleAr: p.heading,
      titleEn: p.headingEn,
      contentAr: p.text,
      contentEn: p.textEn,
    })),
    summaryTable: art.diagnosticTable
      ? {
          titleAr: art.diagnosticTable.titleAr,
          titleEn: art.diagnosticTable.titleEn,
          headersAr: [
            art.diagnosticTable.col1Ar,
            art.diagnosticTable.col2Ar,
            art.diagnosticTable.col3Ar,
          ],
          headersEn: [
            art.diagnosticTable.col1En,
            art.diagnosticTable.col2En,
            art.diagnosticTable.col3En,
          ],
          rows: art.diagnosticTable.rows.map((r) => ({
            col1Ar: r.criterionAr,
            col1En: r.criterionEn,
            col2Ar: r.naturalAr,
            col2En: r.naturalEn,
            col3Ar: r.manipulationAr,
            col3En: r.manipulationEn,
          })),
        }
      : undefined,
    conclusionAr: art.conclusionAr || art.summary,
    conclusionEn: art.conclusionEn || art.summaryEn,
    recommendations: [
      {
        categoryAr: art.practicalExercise.title,
        categoryEn: art.practicalExercise.titleEn,
        itemsAr: art.practicalExercise.steps,
        itemsEn: art.practicalExercise.stepsEn,
      },
    ],
    apaReferences: (art.apaReferences || []).map((r) => `${r.citation} — ${r.noteAr}`),
  })
);
