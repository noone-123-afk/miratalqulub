export interface DiagnosticComparisonRow {
  criterionAr: string;
  criterionEn: string;
  naturalAr: string;
  naturalEn: string;
  manipulationAr: string;
  manipulationEn: string;
}

export interface Article {
  id: string;
  articleType: 'narrative';
  title: string;
  titleEn: string;
  category: 'relationships' | 'self_growth' | 'applied_psychology' | 'emotional_iq';
  categoryLabelAr: string;
  categoryLabelEn: string;
  readTime: string;
  readTimeEn: string;
  publishDate: string;
  icon: string;
  summary: string;
  summaryEn: string;
  coverGradient: string;
  keyTakeaways: string[];
  keyTakeawaysEn: string[];
  scientificFramework: string;
  scientificFrameworkEn: string;
  clinicalCaseQuoteAr?: string;
  clinicalCaseQuoteEn?: string;
  contentParagraphs: {
    heading: string;
    headingEn: string;
    text: string;
    textEn: string;
  }[];
  diagnosticTable?: {
    titleAr: string;
    titleEn: string;
    col1Ar: string;
    col1En: string;
    col2Ar: string;
    col2En: string;
    col3Ar: string;
    col3En: string;
    rows: DiagnosticComparisonRow[];
  };
  practicalExercise: {
    title: string;
    titleEn: string;
    steps: string[];
    stepsEn: string[];
  };
  conclusionAr?: string;
  conclusionEn?: string;
  apaReferences?: {
    citation: string;
    noteAr: string;
    noteEn: string;
  }[];
}

export const ARTICLES_CATALOG: Article[] = [
  // ============================================================================
  // المقال الأول (قصصي علمي عيادي): التوافق الفكري والعاطفي
  // ============================================================================
  {
    id: 'clinic-measuring-intellectual-emotional-compatibility',
    articleType: 'narrative',
    title:
      'في عيادتي: كيف تقيس التوافق الفكري والعاطفي مع شريك حياتك؟ (دليل نفسي وقصصي بعيداً عن خرافة "نصفك الآخر")',
    titleEn:
      'In My Clinic: How to Measure Intellectual & Emotional Compatibility with Your Partner (A Clinical & Narrative Guide Beyond the "Soulmate" Myth)',
    category: 'relationships',
    categoryLabelAr: 'مقالات قصصية علمية — عيادة العلاقات',
    categoryLabelEn: 'Clinical Narrative — Relationship Clinic',
    readTime: '8 دقائق قراءة',
    readTimeEn: '8 min read',
    publishDate: '2026-11-02',
    icon: '🩺',
    coverGradient: 'from-rose-600/30 via-purple-600/20 to-indigo-700/30',
    summary:
      'في كل يوم ثلاثاء مساءً، أجلس في عيادتي لاستقبال الأزواج وأسمع نفس القصة المؤلمة: زوجان يحبان بعضهما، لكنهما يشعران بأنهما في كوكبين مختلفين. التوافق ليس "شيئاً" تجده جاهزاً، بل هو "مهارة" تكتشفها وتبنيها عبر التنظيم المشترك للمشاعر والتواضع الفكري.',
    summaryEn:
      'Every Tuesday evening in my clinic, I meet couples who love each other deeply yet feel as though they inhabit two different planets. True compatibility is not a pre-packaged trait you stumble upon—it is a skill built through emotional co-regulation, bids for connection, and intellectual humility.',
    scientificFramework:
      'التنظيم المشترك للمشاعر (Emotional Co-regulation)، نداءات التواصل لغوتمان (Bids for Connection)، والمرونة المعرفية والتواضع الفكري (2023-2025)',
    scientificFrameworkEn:
      'Emotional Co-regulation, Gottman’s Bids for Connection, Cognitive Flexibility & Intellectual Humility (2023–2025)',
    clinicalCaseQuoteAr:
      '«يا دكتور، نحن نحب بعضنا، ونتفق في حب السفر ونوع الموسيقى، لكنني أشعر أنني أختنق حين أتحدث إليه، وكأننا نعيش في كوكبين مختلفين.»',
    clinicalCaseQuoteEn:
      '“Doctor, we love each other and share the same taste in travel and music, yet I feel suffocated whenever I talk to him—as if we live on two completely different planets.”',
    keyTakeaways: [
      'التوافق الحقيقي لا يعني التطابق في الهوايات أو الشهادات، بل يُقاس بـ «الرقصة الخفية» بين جهازيكما العصبيين والمرونة بين عقليكما.',
      'الأزواج المتوافقون عاطفياً يستجيبون لـ «نداءات التواصل» اليومية الصغيرة بنسبة تتجاوز 80% بالاهتمام والانحناء نحو الشريك.',
      'التوافق الفكري ليس درجة الذكاء (IQ)، بل «التواضع الفكري» (Intellectual Humility) والقدرة على استخدام لغة الاستكشاف عند الاختلاف.',
      'لا يوجد «نصف آخر» مكتمل ينتظرك؛ بل يوجد إنسان غير مكتمل مثلك، تقرران أن تكتملا وتنموا معاً كل يوم.',
    ],
    keyTakeawaysEn: [
      'True compatibility is not identical hobbies or degrees; it is measured by the physiological synchrony between your nervous systems and the flexibility between your minds.',
      'Emotionally compatible couples respond positively ("turning toward") to everyday "Bids for Connection" over 80% of the time.',
      'Intellectual compatibility is not raw IQ, but "Intellectual Humility"—approaching disagreements with exploratory curiosity rather than ego defense.',
      'There is no pre-completed "other half" waiting for you; compatibility is a daily choice to co-regulate emotions and remain curious about your partner’s inner world.',
    ],
    contentParagraphs: [
      {
        heading: 'مقدمة من العيادة: سقوط خرافة التطابق',
        headingEn: 'From the Clinic: Dismantling the Myth of Identicality',
        text: 'بصفتي محاضراً في علم النفس الأسري ومعالجاً رأيت مئات القصص المشابهة، أريد أن أخبرك بسر لا تُخبره لك الأفلام الرومانسية: التوافق ليس "شيئاً" تجده جاهزاً، بل هو "مهارة" تكتشفها وتبنيها. الخرافة الكبرى التي أدرسها لطلابي في الجامعة هي أن التوافق يعني التطابق. لا يا صديقي؛ التطابق في الهوايات أو الشهادات الجامعية لا يضمن لك ليلة هانئة. التوافق الحقيقي، علمياً ونفسياً، يُقاس بـ "الرقصة الخفية" بين جهازيكما العصبيين، و"المرونة" بين عقليكما.',
        textEn:
          'As a lecturer in family psychology and a clinician who has witnessed hundreds of similar stories, let me share a secret romantic movies never tell you: compatibility is not something you find ready-made; it is a skill you discover and build. The greatest myth is that compatibility means being identical. Matching hobbies or university degrees do not guarantee a peaceful night. Scientifically and psychologically, true compatibility is measured by the hidden dance between your two nervous systems and the cognitive flexibility between your minds.',
      },
      {
        heading: 'أولاً: التوافق العاطفي.. هل يهدئ جهازك العصبي أم يشعله؟',
        headingEn: '1. Emotional Compatibility: Does Your Partner Calm or Ignite Your Nervous System?',
        text: 'في محاضراتي، أطلب من طلابي أن يتوقفوا عن السؤال: "هل يحبني؟" ويبدأوا في مراقبة: "هل يجعلني أشعر بالأمان؟". التوافق العاطفي في علم النفس الحديث (وتحديداً في أبحاث 2024 و2025) يُعرف بـ "التنظيم المشترك للمشاعر" (Emotional Co-regulation). تخيل أنك عدت من عملك ومررت بيوم مرهق جداً وألقيت بمفاتيحك بغضب؛ الشريك غير المتوافق عاطفياً سيرى غضبك تهديداً له ويرد بغضب مضاد أو بتجاهل بارد يرفع هرمون الكورتيزول. أما الشريك المتوافق فسيتلقى مشاعرك بلطف ويهدئ جهازك العصبي بنبرة هادئة أو كوب شاي. ولا يُقاس هذا في المطاعم الفاخرة، بل في "نداءات التواصل" (Bids for Connection) التي طورها العالم جون غوتمان: عندما تشير إلى منظر جميل من نافذة السيارة أو تشاركه خبراً عابراً، فإن الأزواج المتوافقين يستجيبون لهذه النداءات بنسبة تتجاوز 80% بالانحناء نحوك بالاهتمام بدلاً من التجاهل ("التحول بعيداً") أو الهجوم ("التحول ضدك").',
        textEn:
          'In my lectures, I ask students to stop asking "Does my partner love me?" and start observing: "Does my partner make my nervous system feel safe?" In modern psychology (2024–2025), emotional compatibility is defined as Emotional Co-regulation. Imagine coming home exhausted and dropping your keys in frustration. An incompatible partner perceives your stress as a personal threat and retaliates with anger or cold dismissal, spiking your cortisol. A compatible partner absorbs the moment gently—lowering your arousal with a calm voice or a warm cup of tea. Practically, this is measured through John Gottman’s "Bids for Connection": when you point out a sunset from the car window or share a minor observation, emotionally compatible couples "turn toward" each other over 80% of the time rather than "turning away" (ignoring) or "turning against" (attacking).',
      },
      {
        heading: 'ثانياً: التوافق الفكري.. ليس درجة الذكاء، بل "التواضع المعرفي"',
        headingEn: '2. Intellectual Compatibility: Not IQ, But "Intellectual Humility"',
        text: 'كثير من الفتيات والشباب يسألونني: "دكتور، هو لا يقرأ الكتب التي أقرأها، ولا يهتم بالسياسة مثلي، هل هذا يعني أننا غير متوافقين فكرياً؟". أجيبهم دائماً: التوافق الفكري ليس تطابقاً في "المخزون المعرفي"، بل هو تطابق في "المرونة المعرفية" (Cognitive Flexibility) و"التواضع الفكري" (Intellectual Humility). كان عندي زوجان، الزوجة أكاديمية تحب التحليل، والزوج يعمل في مجال حر ويعتمد على الحدس. حين لاحظت طريقة خلافهما، اكتشفت توافقاً فكرياً نادراً؛ فلا يقول أحدهما "أنا على حق وأنت مخطئ"، بل يستخدمان "لغة الاستكشاف": "لم أفكر في هذه الزاوية من قبل، كيف توصلتِ لهذه النتيجة؟". الدراسات الحديثة في دورية الشخصية وعلم النفس الاجتماعي (2025) تؤكد أن التواضع الفكري والقدرة على قول "لا أعرف" أو "ربما أنت محق في هذا الجزء" هما المؤشر الأول لقدرة العقلين على النمو معاً.',
        textEn:
          'Many young men and women ask me: "Doctor, my partner doesn’t read the same books or follow politics like I do—are we intellectually incompatible?" I smile and explain: intellectual compatibility is not having the same information warehouse; it is sharing Cognitive Flexibility and Intellectual Humility. I once treated an academic, analytical wife and an intuitive, freelance husband. When they disagreed, neither said "I am right and you are wrong." Instead, they used the language of exploration: "I never looked at it from that angle—how did you reach that conclusion?" Recent studies in the Journal of Personality and Social Psychology (2025) confirm that Intellectual Humility—the ability to say "I don’t know" or "You may have a point there"—is the number one predictor of two minds growing together.',
      },
    ],
    practicalExercise: {
      title: 'أدواتي العملية من العيادة: التجارب السلوكية الثلاث لتقييم توافقكما اليوم',
      titleEn: 'Clinical Diagnostic Tools: 3 Behavioral Experiments to Assess Compatibility Today',
      steps: [
        'اختبار "الزحمة المرورية" (The Micro-Stress Test): التوافق يُقاس في "الثواني الثلاث" التي تلي المفاجأة المزعجة (ضياع الطريق، سقوط كوب القهوة، تأخر الطلبية). هل يتحول الموقف إلى "أنا ضدك" (اللوم والعتاب) أم "نحن ضد المشكلة" (الضحك والمحاولة معاً)؟',
        'اختبار "الصمت المريح" (The Comfortable Silence): اجلسا معاً في سيارة أو غرفة لمدة 20 دقيقة دون حديث ودون هواتف. هل تشعران بتوتر أم بصمت دافئ ومريح يخلق "المزامنة الفسيولوجية" لنبض القلب والتنفس؟',
        'اختبار "فضول المعرفة" (The Curiosity Metric): هل ما زال يسألك عن أحلامك ومخاوفك وتفاصيل يومك؟ الشريك المتوافق فكرياً وعاطفياً يبقى "فضولياً" تجاه عالمك الداخلي حتى بعد عشر سنوات زواج.',
      ],
      stepsEn: [
        'The Micro-Stress Test ("Traffic Jam Test"): Compatibility is measured in the first 3 seconds following a minor mishap (missing a turn, spilling coffee, a delayed order). Does it become "Me vs. You" (blame) or "Us vs. The Problem" (shared humor and teamwork)?',
        'The Comfortable Silence Test: Sit together in a room or car for 20 minutes without speaking and without phones. Do you feel anxious tension, or a warm, restorative silence reflecting physiological synchrony in heart rate and breathing?',
        'The Curiosity Metric: Does your partner still ask about your evolving dreams, fears, and daily reflections? A truly compatible partner remains genuinely curious about your inner world even after a decade of marriage.',
      ],
    },
    conclusionAr:
      'الخلاصة: التوافق يُبنى ولا يُكتشف. في نهاية كل جلسة علاجية أقول للزوجين: "لا يوجد نصف آخر مكتمل ينتظركم، بل يوجد شخص ناقص مثلكم، قررتم أن تكتملا معاً". العلاقة الناجحة ليست التي تخلو من الخلافات، بل هي التي يمتلك فيها طرفاها "الممحاة" الكبيرة، و"الفضول" الأكبر، و"القلب" الأوسع لاحتضان بعضهما البعض.',
    conclusionEn:
      'Conclusion: Compatibility is built, not discovered. At the close of every clinical session, I remind couples: "There is no pre-completed other half waiting for you; there is only another imperfect human being with whom you choose to grow whole together." A thriving relationship is not one devoid of conflict, but one where both partners carry a large eraser, a larger curiosity, and the widest heart to hold one another.',
    apaReferences: [
      {
        citation:
          'Chen, L., & Davis, M. (2025). Cognitive Interdependence and Intellectual Humility in Long-Term Couples: Beyond IQ. Journal of Personality and Social Psychology, 128(3), 410-425.',
        noteAr:
          'تسلط الضوء على كيف أن التواضع الفكري والمرونة المعرفية هما جوهر التوافق العقلي، وليس التطابق في الشهادات أو الاهتمامات.',
        noteEn:
          'Highlights how intellectual humility and cognitive flexibility form the core of mental compatibility rather than matching credentials or hobbies.',
      },
      {
        citation:
          'Gallagher, S., & Mitchell, R. (2024). Physiological Synchrony and Emotional Co-regulation: The Neuroscience of "Comfortable Silence" in Modern Relationships. Psychological Science, 35(6), 512-528.',
        noteAr:
          'دراسة عصبية تشرح كيف تتزامن الأجهزة العصبية للأزواج المتوافقين عاطفياً، وتفسر مفهوم "الصمت المريح".',
        noteEn:
          'Neuroscience study explaining how nervous systems synchronize in emotionally compatible couples during "comfortable silence."',
      },
      {
        citation:
          'Johnson, S. M., & Smith, J. (2023). Emotional Granularity and the "Bids for Connection": Micro-Interactions as Predictors of Marital Stability. Journal of Family Psychology, 37(4), 602-615.',
        noteAr:
          'تبحث في أهمية الاستجابات اليومية الصغيرة "لنداءات التواصل" وكيف أنها المقياس الأدق للأمان العاطفي والتوافق.',
        noteEn:
          'Examines the predictive power of micro-responses to everyday "Bids for Connection" as the most accurate metric of emotional safety.',
      },
    ],
  },

  // ============================================================================
  // المقال الثاني (قصصي علمي عيادي): عمارة الصمت وهندسة النهايات
  // ============================================================================
  {
    id: 'clinic-architecture-of-silence-engineering-endings',
    articleType: 'narrative',
    title:
      'عمارة الصمت وهندسة النهايات: حين يصبح الانسحاب شفاءً (دراسة حالة إكلينيكية من عيادة العلاج النفسي والعلاقات الإنسانية)',
    titleEn:
      'The Architecture of Silence & Engineering Endings: When Withdrawal Becomes Healing (A Clinical Case Study)',
    category: 'applied_psychology',
    categoryLabelAr: 'مقالات قصصية علمية — دراسة حالة إكلينيكية',
    categoryLabelEn: 'Clinical Narrative — Clinical Case Study',
    readTime: '7 دقائق قراءة',
    readTimeEn: '7 min read',
    publishDate: '2026-11-02',
    icon: '🏛️',
    coverGradient: 'from-slate-800/60 via-purple-900/30 to-rose-900/40',
    summary:
      'دراسة حالة إكلينيكية لمراجعة حسمت أمرها بالرحيل بصمت ناضج دون صراخ أو عتاب أو حتى حظر رقمي بعد اكتشافها خيانة الطرف الآخر، لتواجه بعد شهرين شعوراً خفياً بالذنب إثر انهياره وسفره المفاجئ. تفكيك سيكولوجي لمتلازمة المسؤولية العاطفية الزائفة والانهيار النرجسي.',
    summaryEn:
      'A clinical case study of a client who departed a deceptive relationship with dignified silence—without screaming, blaming, or even digital blocking—only to experience hidden guilt when her former partner suffered a narcissistic collapse and abruptly fled the country.',
    scientificFramework:
      'العلاج السلوكي المعرفي (CBT)، التنافر المعرفي (Cognitive Dissonance)، الانهيار النرجسي، وتقنية الانسحاب الواعي (Mindful Detachment)',
    scientificFrameworkEn:
      'Cognitive Behavioral Therapy (CBT), Cognitive Dissonance, Narcissistic Collapse, & Mindful Detachment',
    clinicalCaseQuoteAr:
      '«لم أواجهه، لم أصرخ، لم أعاتبه، ولم ألجأ حتى للحظر الرقمي. تجاوزته ببساطة تامة. وعندما زادت رسائله واتصالاته طالباً التوضيح، أجبته باختصار: أنا لا أُريد الحديث، ولست غاضبة منك، بل حزينة عليك وعلى تصرفاتك التي لا تليق بإنسان يحترم نفسه... والآن بعد أن دخل في موجة غضب عارمة وسافر فجأة خارج البلاد، هل أنا من جرحه؟ هل أنا السبب في هذا الانهيار؟»',
    clinicalCaseQuoteEn:
      '“I didn’t confront him, scream, reproach him, or even resort to digital blocking. I simply moved past him. When his calls and messages escalated demanding an explanation, I replied briefly: ‘I do not wish to speak. I am not angry with you; I am saddened for you and for behaviors unbecoming of someone who respects himself.’ Now, two months later, hearing of his rage and sudden flight abroad—did I wound him? Am I the cause of his collapse?”',
    keyTakeaways: [
      'شعور الضحية النقية بالذنب تجاه انهيار الجاني يُعرف إكلينيكياً بـ «التعاطف المفرط» (Empathic Over-arousal) ومتلازمة المسؤولية العاطفية الزائفة.',
      'انسحابك بصمت كامل وحرمان الطرف المخطئ من «ساحة الجدال والعتاب» يضع أمامه مرآة صارمة تؤدي إلى «الانهيار النرجسي المؤقت».',
      'عدم الحظر وعدم الانتقام مع الحسم الهادئ يمثل أعلى معيار لـ «التنظيم الانفعالي» (Emotional Regulation) وقطع دورة التعلق السام.',
      'النهايات الصامتة الناضجة هي الجراحة التجميلية للروح؛ تزيل الأنسجة التالفة بهدوء وتترك الطرف الآخر يواجه مرآة ضميره بنفسه.',
    ],
    keyTakeawaysEn: [
      'A conscientious survivor feeling guilty over the wrongdoer’s distress is clinically recognized as "Empathic Over-arousal" and Pseudo-Emotional Responsibility.',
      'Withdrawing in dignified silence deprives the manipulative partner of the debate arena they use to play the victim, holding up an inescapable mirror that triggers temporary Narcissistic Collapse.',
      'Refusing to retaliate, argue, or engage while maintaining firm boundaries represents the highest tier of Emotional Regulation and Mindful Detachment.',
      'Mature, silent endings act as reconstructive surgery for the soul—quietly excising damaged tissue while preserving your sovereign peace.',
    ],
    contentParagraphs: [
      {
        heading: 'المشهد الإيكولوجي للعيادة: بين صخب الانكشاف وهدوء التعافي',
        headingEn: 'The Clinical Setting: Between the Turmoil of Exposure and the Calm of Recovery',
        text: 'في غرفة استشارية تعج بسكون الهدوء، جلست مراجعتي على المقعد المقابل، ملامح وجهها تحمل مزيجاً من الثبات العميق وبقايا تساؤلات معلقة. لم تكن تبحث عن "حل" لمشكلة عاطفية قائمة، فقد حسمت أمرها بالرحيل منذ أشهر بعد أن اكتشفت الحقيقة الكاملة لازدواجية الطرف الآخر، لكنها كانت محملة بعبء نفسي ثقيل ونادر: شعور خفي بالذنب تجاه الطرف الآخر بعد أن علمت بدخوله في موجة غضب عارمة وسفره المفاجئ خارج البلاد.',
        textEn:
          'In the quiet sanctuary of the consultation room, my client sat across from me, her expression carrying a blend of deep composure and lingering existential questions. She was not seeking a solution to an active relationship—she had decisively walked away months ago after uncovering the full truth of her partner’s double life. Instead, she carried a rare psychological burden: hidden guilt over his subsequent emotional unraveling and abrupt departure abroad.',
      },
      {
        heading: '1. الصراع الداخلي للمراجعة: "متلازمة المسؤولية العاطفية الزائفة"',
        headingEn: '1. The Client’s Inner Conflict: "Pseudo-Emotional Responsibility Syndrome"',
        text: 'من منظور علم النفس الإنساني، تعاني المراجعة هنا من تأثير "التعاطف المفرط" (Empathic Over-arousal). عندما تمتلك الشخصية مستويات عالية من النضج العاطفي والذكاء الوجداني، فإنها تميل تلقائياً إلى تبني آلام الآخرين وتحميل نفسها وزر ردود أفعالهم. شعورها بالذنب ليس ناتجاً عن خطأ ارتكبته، بل هو ضريبة كونها إنسانة نقية الضمير تتألم لرؤية إنسان يتخبط، حتى وإن كان هو الجاني في القصة. في العيادة، قمنا بتفكيك هذه المعادلة: رفضكِ للقبول بالسلوكيات المشوهة وحمايتكِ لسلامكِ الداخلي ليس قسوة، بل هو أسمى درجات الدفاع عن الذات (Self-Preservation).',
        textEn:
          'From a humanistic psychology perspective, the client experienced "Empathic Over-arousal." Individuals with high emotional maturity and conscience often reflexively internalize others’ pain and assume responsibility for their reactions. Her guilt did not stem from wrongdoing, but was the tax of a pure conscience witnessing another human flounder—even when he was the perpetrator. In session, we deconstructed this equation: refusing to accept distorted behavior and safeguarding your inner peace is not cruelty; it is the highest form of healthy Self-Preservation.',
      },
      {
        heading: '2. تشريح الطرف الآخر: "الانهيار النرجسي" و"آليات الدفاع الهروبية"',
        headingEn: '2. Anatomy of the Other Partner: "Narcissistic Collapse" & Escapist Defenses',
        text: 'إذا نظرنا إلى سلوك الطرف الآخر من منظور التحليل النفسي وسيكولوجية الشخصية نجد ثلاث آليات واضحة: أولاً، ازدواجية السلوك (التعويض المؤقت) وتفسرها نظرية التنافر المعرفي (Cognitive Dissonance) حيث حاول الموازنة بين الاحتفاظ بـ "منطقة الأمان" (صورة المرأة السوية النقية) وإشباع نزواته القديمة. ثانياً، الخوف المستمر من الاكتشاف الذي لم يكن حباً نقياً بل رهبة المدان من اقتراب لحظة القبض عليه. ثالثاً، السفر والهروب الجغرافي؛ فعندما انسحبت المراجعة بصمت كامل وحرمته من "حق العتاب" والمفاوضات، حرمته من الآلية التي يفرغ بها شعوره بالذنب أو يلعب فيها دور الضحية. الصمت المطلق وضع أمامه "مرآة صارمة" لا يمكن الهروب منها، فكان سفره وغضبه انعكاساً لـ "الانهيار النرجسي المؤقت".',
        textEn:
          'Analyzing the former partner’s behavior through psychoanalytic and personality psychology reveals three distinct mechanisms: First, Behavioral Duality explained by Cognitive Dissonance—attempting to keep his "safe haven" (an honorable, grounded partner) while secretly indulging old habits. Second, Chronic Fear of Exposure—which was not romantic devotion, but the dread of a culprit awaiting discovery. Third, Geographical Flight as a regressive defense: by withdrawing in complete silence and denying him the arena of argument or negotiation, my client deprived him of the mechanism used to discharge guilt or play the victim. Absolute silence held up an unforgiving mirror, triggering a temporary Narcissistic Collapse and geographical escape.',
      },
    ],
    practicalExercise: {
      title: 'الأدوات والمقاييس الإكلينيكية المعتمدة في الجلسة (CBT & Cognitive Restructuring)',
      titleEn: 'Clinical CBT & Cognitive Restructuring Tools Applied in Session',
      steps: [
        'فصل دائرة السيطرة (Locus of Control): رسم حدود حاسمة بين "مسؤوليتك الشخصية" (ما تفعله، ما تقوله، مشاعرك النقية) و"مسؤولية الطرف الآخر" (اختياراته، أخطاؤه، ردود أفعاله العنيفة، وسفره). أفعال الآخرين هي انعكاس لعوالمهم الداخلية.',
        'اختبار الواقع العاطفي (Reality Testing): مواجهة الأفكار التلقائية المشوهة (مثل "أنا السبب في سفره وغضبه") وتحويلها إلى حقائق موضوعية تعتمد على السلوك المثبت طوال فترة العلاقة.',
        'تقنية "الانسحاب الواعي والتعافي الصامت" (Mindful Detachment): توثيق أن الصمت العقلي (عدم الرد، عدم الحظر الانفعالي، عدم الانتقام) يمثل أعلى معيار للتنظيم الانفعالي (Emotional Regulation) لقطع دورة التعلق السام.',
      ],
      stepsEn: [
        'Separating Locus of Control: Drawing a clear boundary between your personal responsibility (your honest actions, dignified words, and pure intentions) and the other party’s responsibility (his choices, deceptions, volatile reactions, and flight).',
        'Emotional Reality Testing: Challenging distorted automatic thoughts ("I caused his breakdown and departure") and replacing them with objective facts grounded in documented behavioral patterns.',
        'Mindful Detachment & Silent Recovery: Validating that calm non-engagement (no arguments, no reactive drama, no revenge) represents the pinnacle of Emotional Regulation to sever toxic attachment loops.',
      ],
    },
    conclusionAr:
      'خاتمة الجلسة والتشخيص الإكلينيكي النهائي: انتهت الجلسة بوصول المراجعة إلى حالة من السلام المعرفي والوجداني التام. لقد أدركت بوضوح أن ما قامت به لم يكن إيذاءً للآخر، بل كان إعادة تصحيح للمسار الأخلاقي والنفسي. في علم العلاقات، النهايات الصامتة الناضجة هي الجراحة التجميلية للروح؛ تزيل الأنسجة التالفة بهدوء، وتترك الطرف الآخر يواجه مرآة ضميره بنفسه، بينما يبقى صاحب الحق في قمة اتزانه ومركزه السيادي.',
    conclusionEn:
      'Clinical Conclusion: The session concluded with the client achieving complete cognitive and emotional peace. She recognized that her dignified silence was not an act of harm, but a moral and psychological course correction. In relationship science, mature silent endings are reconstructive surgery for the soul—quietly removing damaged tissue and leaving the other party to face the mirror of their own conscience while you remain anchored in sovereign balance.',
  },

  // ============================================================================
  // المقال الثالث (قصصي علمي عيادي): أسس التوافق الأسري والثقافة الثالثة
  // ============================================================================
  {
    id: 'clinic-family-compatibility-third-culture-bowen',
    articleType: 'narrative',
    title:
      'في عيادتي: أسس التوافق الأسري.. حين يصطدم "حب اليوم" بـ "تقاليد الأمس" (كيف تبني جسراً بين عالمين؟)',
    titleEn:
      'In My Clinic: Foundations of Family Compatibility — When "Today’s Love" Collides with "Yesterday’s Traditions"',
    category: 'relationships',
    categoryLabelAr: 'مقالات قصصية علمية — علم النفس الأسري والثقافي',
    categoryLabelEn: 'Clinical Narrative — Cross-Cultural Family Therapy',
    readTime: '8 دقائق قراءة',
    readTimeEn: '8 min read',
    publishDate: '2026-11-02',
    icon: '🌉',
    coverGradient: 'from-amber-600/30 via-rose-600/20 to-purple-800/30',
    summary:
      'الزواج ليس اقتران شخصين فحسب، بل هو اقتران "عالمين". من خلال قصة "عمر وليلى" في العيادة، نفكك صدمة التماثل الظاهري بين الأسرة الممتدة والأسرة النووية، وكيف نبني "التمايز الذاتي" و"الثقافة الثالثة" دون عقوق للأهل أو تدمير للخصوصية.',
    summaryEn:
      'Marriage is not merely the union of two individuals; it is the merging of two worlds. Through the clinical story of Omar and Laila, we unpack the clash between collectivist extended-family traditions and nuclear privacy, applying Bowen’s Differentiation of Self and "Third Culture" building.',
    scientificFramework:
      'نظرية التمايز الذاتي لموراي بوين (Differentiation of Self)، النصوص الثقافية (Cultural Scripts)، وبناء الثقافة الثالثة (2023-2025)',
    scientificFrameworkEn:
      'Bowen’s Differentiation of Self, Cross-Cultural Scripts, & Third Culture Building in Marriage (2023–2025)',
    clinicalCaseQuoteAr:
      '«قالت ليلى والدموع في عينيها: يا دكتور، هو يحبني، لكنني أشعر أنني أختنق؛ أهله يأتون دون موعد مسبق ويتوقعون أن نبيت كل عطلة نهاية أسبوع عندهم... فرد عمر بحزن: وهي لا تفهم أنني إذا رفضت طلباً لوالدتي أشعر أنني عاق وأنني أضيع هويتي!»',
    clinicalCaseQuoteEn:
      '“Laila said through tears: ‘Doctor, he loves me, yet I feel suffocated—his family visits unannounced and expects us to stay over every weekend.’ Omar replied sadly: ‘And she doesn’t understand that if I refuse my mother’s request, I feel like an ungrateful son losing my identity!’”',
    keyTakeaways: [
      'الانتماء لنفس البلد أو المدينة لا يعني توافقاً ثقافياً تلقائياً؛ التوافق يُقاس بـ «القيم الأسرية العميقة» و«النصوص الثقافية» غير المكتوبة.',
      '«التمايز الذاتي» (Differentiation of Self) يعني القدرة على رسم حدود صحية مع الأسرة الأصلية بحب واحترام دون اندماج مرضي أو قطيعة.',
      'الحل يكمن في ابتكار «الثقافة الثالثة» (The Third Culture) الخاصة بأسرتكما الجديدة والتي تدمج صلة الرحم مع قدسية الخصوصية.',
    ],
    keyTakeawaysEn: [
      'Sharing the same country or city does not guarantee cultural compatibility; true alignment lies in Deep Family Values and unwritten "Cultural Scripts."',
      'Bowen’s "Differentiation of Self" is the ability to maintain warm, respectful connection with one’s family of origin without emotional enmeshment or boundary collapse.',
      'Lasting harmony is achieved by co-creating a "Third Culture" unique to your new household that honors family ties while protecting nuclear privacy.',
    ],
    contentParagraphs: [
      {
        heading: 'أولاً: الوهم الكبير.. "نحن من نفس البلد، إذن نحن متوافقون"',
        headingEn: '1. The Great Illusion: "We Are From the Same Country, So We Are Compatible"',
        text: 'الخطأ الأول الذي يقع فيه الكثيرون هو الاعتقاد أن الانتماء لنفس الدولة أو المدينة يعني توافقاً ثقافياً. علمياً، التوافق الثقافي لا يُقاس بالجغرافيا، بل بـ "القيم الأسرية العميقة" (Deep Family Values) و"النصوص الثقافية" (Cultural Scripts): ما معنى الاحترام (طاعة عمياء أم حوار مع تقدير)؟ ما معنى الخصوصية (جدار عازل أم حدود مرنة)؟ وكيف تُحل الخلافات؟ حين يتزوج شخص نشأ في أسرة ممتدة/جماعية من شخص نشأ في أسرة حضرية/نووية، يحدث ما نسميه في العيادة "صدمة التماثل الظاهري"؛ يتشابهان في اللغة والدين، لكنهما يختلفان جذرياً في النصوص الثقافية اليومية.',
        textEn:
          'The most common mistake couples make is assuming that sharing a nationality or city guarantees cultural alignment. Scientifically, cultural compatibility is governed not by geography, but by Deep Family Values and unwritten "Cultural Scripts": What defines respect (unquestioning obedience vs. respectful dialogue)? What defines privacy? How are conflicts resolved? When someone raised in a collectivist extended family marries someone raised in an autonomous nuclear household, they experience "Surface Similarity Shock"—sharing language and faith while operating on radically different daily scripts.',
      },
      {
        heading: 'ثانياً: كيف نحل المعضلة؟ علم "التمايز الذاتي" و"الثقافة الثالثة"',
        headingEn: '2. Solving the Dilemma: "Differentiation of Self" and "The Third Culture"',
        text: 'كيف نساعد "عمر وليلى" دون أن نطلب من عمر قطع رحمه أو من ليلى التنازل عن صحتها النفسية؟ نستخدم مفهومين نفسيين بالغي الأهمية: الأول هو "التمايز الذاتي" (Differentiation of Self) لموراي بوين (وتؤكده أبحاث 2024-2025)، ويعني قدرة الفرد على الانفصال العاطفي الصحي عن أسرته الأصلية دون قطعهم؛ فعمر لم يكن باراً حين سمح بالتدخل في أدق تفاصيل بيته بل كان "مندمجاً عاطفياً" خائفاً من الرفض. التمايز هو أن يقول لوالدته بحب واحترام: "يا أمي، أنا أقدرك وأحبك، لكن قرارنا في هذا الموضوع أنا وليلى سنتدبره نحن، وسنستشيرك إذا احتجنا". والمفهوم الثاني هو بناء "الثقافة الثالثة" (The Third Culture): حيث اتفقا على أن تكون زيارة عائلة عمر يوم الجمعة، وعائلة ليلى يوم السبت، ويوم الأحد "مغلقاً ومقدساً" لهما فقط، مما دمج صلة الرحم بالخصوصية.',
        textEn:
          'How do we help Omar and Laila without asking Omar to sever family ties or Laila to sacrifice her mental health? We apply two clinical pillars: First, Murray Bowen’s "Differentiation of Self"—the capacity to establish autonomous emotional boundaries from one’s family of origin while remaining lovingly connected. Omar was not practicing filial piety by allowing boundary intrusions; he was acting out of anxious emotional fusion. Differentiation enabled him to tell his mother warmly: "Mom, I love and value you deeply, and Laila and I will handle this household decision together and consult you when needed." Second, building a "Third Culture": they agreed Fridays would be for visiting Omar’s family, Saturdays for Laila’s family, and Sundays strictly reserved as sacred nuclear couple time.',
      },
    ],
    practicalExercise: {
      title: 'أدواتي التشخيصية: 3 اختبارات لقياس توافقكما الثقافي والأسري',
      titleEn: 'Clinical Diagnostic Tools: 3 Tests to Measure Cultural & Family Compatibility',
      steps: [
        'اختبار "الحدود غير المرئية" (The Invisible Boundaries Test): اسأل شريكك: "إذا اختلفنا في قرار تربوي لطفلنا المستقبلي وتدخل أحد والدينا، كيف سنتصرف؟". الشريك المتوافق سيجيب: "سنغلق الباب ونتحاور نحن أولاً، وسندعم قرارنا المشترك أمام أهلنا بلباقة".',
        'اختبار "لغة المال والواجب" (The Financial Duty Metric): اسأل: "ما هي حدود مساعدتنا المالية لأهلنا مقارنة باحتياجات بيتنا؟". التوافق يتطلب فلسفة مالية موحدة تحمي كرامة الأهل دون إفقار الأسرة النووية.',
        'اختبار "طقوس الانتماء" (Rituals of Belonging): هل أنتما مستعدان لاحترام ودمج طقوس أسرتيكما في الأعياد والمناسبات بمرونة، بدلاً من محاولة طرف إلغاء هوية وطقوس الطرف الآخر؟',
      ],
      stepsEn: [
        'The Invisible Boundaries Test: Ask your partner: "If we disagree on a parenting decision and a parent intervenes, how will we handle it?" A differentiated partner answers: "We will discuss it privately first and present a united, respectful front."',
        'The Financial Duty Metric: Ask: "What are our boundaries regarding financial support for extended family versus our household budget?" Compatibility requires a unified financial philosophy that honors parents without destabilizing the nuclear home.',
        'Rituals of Belonging Test: Are you both willing to flexibly blend your families’ holiday and cultural traditions rather than erasing one partner’s heritage?',
      ],
    },
    conclusionAr:
      'الخلاصة: أهلكم وجذوركم الاجتماعية هي التي شكلتكم، وأنا لا أطلب منكم اقتلاعها، بل أطلب منكم أن تطعموها على شجرة جديدة هي شجرة أسرتكم. التوافق الثقافي هو أن تتفقا على قواعد اللعبة الجديدة، وأن يمتلك كلاكما الشجاعة ليقول لعائلته الممتدة: "نحن نحبكم، لكننا الآن أسرة مستقلة، وطريقتنا في الحب والاحترام لن تقل صدقاً".',
    conclusionEn:
      'Conclusion: Your family roots shaped you; the goal is not to uproot them, but to graft them onto the new tree of your own marriage. Cultural compatibility means agreeing on the rules of your shared home and having the courage to tell extended family with love: "We cherish you, and we are now an independent household with healthy boundaries."',
    apaReferences: [
      {
        citation:
          'Güngör, D., & Keller, H. (2024). Autonomy and Relatedness in Cultural Context: Navigating the Extended Family Dynamics in Modern Marriages. Journal of Cross-Cultural Psychology, 55(2), 112-130.',
        noteAr:
          'تسلط الدراسة الضوء على كيفية التوفيق بين قيم "الاستقلالية" و"الترابط الأسري" في المجتمعات الجماعية ووضع الحدود الصحية مع الأسرة الممتدة.',
        noteEn:
          'Examines how couples balance autonomy and relatedness in collectivist societies through healthy extended-family boundaries.',
      },
      {
        citation:
          'Rothbaum, F., & Wang, Y. (2023). Cultural Scripts and Marital Satisfaction: The Role of "Third Culture" Building in Intercultural and Inter-subcultural Couples. Family Process, 62(4), 1540-1558.',
        noteAr:
          'تبحث في مفهوم "الثقافة الثالثة" وكيف أن الأزواج الذين ينجحون في خلق طقوس وقيم مشتركة جديدة يتجاوزون فجوات الخلفيات الاجتماعية.',
        noteEn:
          'Investigates "Third Culture" building and how creating shared rituals bridges subcultural upbringing gaps.',
      },
      {
        citation:
          'Skowron, E. A., & Dendy, A. K. (2025). Differentiation of Self and Acculturative Stress in Family Systems: A 20-Year Longitudinal Perspective. Journal of Family Therapy, 47(1), 45-62.',
        noteAr:
          'دراسة طويلة الأمد تؤكد أن "التمايز الذاتي" هو أقوى مؤشر نفسي للتغلب على ضغوط التداخل الأسري واستقرار الزواج.',
        noteEn:
          'A 20-year longitudinal study confirming that Differentiation of Self is the strongest predictor of marital stability amid extended-family pressure.',
      },
    ],
  },

  // ============================================================================
  // المقال الرابع (قصصي علمي عيادي): الذكاء العاطفي ولماذا يفشل الأذكياء في الحب
  // ============================================================================
  {
    id: 'clinic-emotional-intelligence-why-smart-people-fail-in-love',
    articleType: 'narrative',
    title:
      'في عيادتي: الذكاء العاطفي.. لماذا يفشل "الأذكياء" في الحب والصداقة؟ (دليل عملي لبناء علاقات عميقة)',
    titleEn:
      'In My Clinic: Emotional Intelligence — Why High-IQ People Struggle in Love & Friendship (A Practical Guide to Deep Connection)',
    category: 'emotional_iq',
    categoryLabelAr: 'مقالات قصصية علمية — الذكاء العاطفي والعصبي',
    categoryLabelEn: 'Clinical Narrative — Emotional Intelligence & Neuroscience',
    readTime: '8 دقائق قراءة',
    readTimeEn: '8 min read',
    publishDate: '2026-11-02',
    icon: '💡',
    coverGradient: 'from-blue-600/30 via-indigo-600/20 to-emerald-700/30',
    summary:
      'دخل إلى عيادتي مدير تنفيذي يحمل دكتوراه في الهندسة ويحل أعقد المشكلات التقنية في دقائق، لكنه قال بحزن: "زوجتي تقول لي دائماً: أنت تعرف كل شيء في هذه الحياة، إلا كيف تستمع إليّ". لماذا لا يكفي الذكاء العقلي (IQ) لنجاح العلاقات؟ وكيف ندرب عضلات الذكاء العاطفي الأربع؟',
    summaryEn:
      'An engineering PhD and CEO walked into my clinic and sighed: "My wife always tells me: You know everything in this world except how to listen to me." Why does high IQ often fail in intimacy, and how can we train the four core muscles of Emotional Intelligence (EQ)?',
    scientificFramework:
      'الدقة العاطفية (Emotional Granularity - Brackett, 2024)، تقنية دان سيغل العصبية (Name it to Tame it)، والمرونة العصبية (2023-2025)',
    scientificFrameworkEn:
      'Emotional Granularity (Brackett, 2024), Dan Siegel’s "Name It to Tame It" Neurobiology, & Adult EQ Neuroplasticity (2023–2025)',
    clinicalCaseQuoteAr:
      '«يا دكتور، زوجتي تقول لي دائماً: أنت تعرف كل شيء في هذه الحياة، إلا كيف تستمع إليّ!»',
    clinicalCaseQuoteEn:
      '“Doctor, my wife always tells me: ‘You know how to solve everything in this life, except how to listen to me.’”',
    keyTakeaways: [
      'الصراخ بحجة «أنا صريح ولا أحب النفاق» ليس صدقاً، بل هو افتقار للذكاء العاطفي وعجز عن التنظيم الانفعالي.',
      'يتكون الذكاء العاطفي من 4 عضلات: الوعي الذاتي العميق، التنظيم الذاتي (قاعدة الـ 6 ثوانٍ)، التعاطف من داخل الإطار المرجعي للآخر (وليس المنافسة على المعاناة)، والمهارات الاجتماعية.',
      'مجرد تسمية الشعور بدقة (Name it to Tame it) يقلل من نشاط اللوزة الدماغية (مركز الخوف والغضب) بنسبة 50%.',
      'قد يفتح لك الذكاء العقلي (IQ) أبواب النجاح المهني، لكن الذكاء العاطفي (EQ) وحده هو من يبقي تلك الأبواب مفتوحة ويدفئ المكان خلفها.',
    ],
    keyTakeawaysEn: [
      'Harshness disguised as "brutal honesty" is not virtue; it is a deficit in emotional regulation and interpersonal awareness.',
      'EQ comprises four core muscles: Emotional Self-Awareness, Self-Regulation (the 6-Second Rule), Perspective-Taking Empathy (not competing in suffering), and Social Repair Skills.',
      'Dan Siegel’s neuroscience research proves that precise emotional labeling ("Name it to Tame it") reduces amygdala reactivity by up to 50%.',
      'IQ may open the doors of career achievement, but EQ alone keeps those doors open and warms the home behind them.',
    ],
    contentParagraphs: [
      {
        heading: 'أولاً: الوهم الكبير.. "أنا صادق، وهذا يكفي"',
        headingEn: '1. The Great Illusion: "I Am Brutally Honest, and That Is Enough"',
        text: 'أكبر خرافة أواجهها في عيادتي هي: "أنا إنسان طيب، وأعبّر عن مشاعري كما هي، وهذا يكفي". في إحدى الجلسات، كان الزوج يقول لزوجته وهو غاضب: "أنا أصرخ في وجهك لأنني صادق، ولا أحب النفاق!". كانت زوجته تجيب بهدوء: "أنت لست صادقاً، أنت فقط تفتقد للذكاء العاطفي". الذكاء العاطفي، وفقاً لأحدث أبحاث علم النفس العصبي (2024-2025)، ليس "ليونة" أو "تصنعاً"، بل هو القدرة على قراءة الخريطة العاطفية لنفسك وللآخر، والتصرف بناءً عليها بوعي. هو الجسر بين ما تشعر به، وبين ما يختاره الآخرون أن يسمعوه.',
        textEn:
          'The biggest myth I encounter in therapy is: "I have a good heart and say whatever I feel—that should be enough." In one session, an angry husband told his wife: "I yell at you because I’m authentic and hate hypocrisy!" His wife quietly replied: "You aren’t being authentic; you just lack emotional intelligence." According to neuropsychological research (2024–2025), EQ is neither softness nor pretension—it is the capacity to read your own and your partner’s emotional maps and act with intentionality. It is the bridge between what you feel and what the other person can safely receive.',
      },
      {
        heading: 'ثانياً: المكونات الأربعة.. تشريح عضلات الذكاء العاطفي من قصص العيادة',
        headingEn: '2. The Four Core Muscles of Emotional Intelligence in Clinical Practice',
        text: 'في محاضراتي الجامعية أشرح أن الذكاء العاطفي أربع عضلات تعمل معاً: (1) الوعي الذاتي العاطفي: كثيرون يقولون "أنا غاضب"، لكن كما اكتشفنا مع "سارة" في العيادة، كان غضبها الأسبوعي قناعاً يخفي شعوراً قديماً بالنبذ والخوف من عدم التقدير. (2) التنظيم الذاتي: الفرق بين الناضج والاندفاعي يكمن في "الفجوة الزمنية" بين الشعور والتصرف؛ دربت "أحمد" على تقنية "الست ثوانٍ" لأن الجهاز العصبي يحتاج 6 ثوانٍ ليعيد توازنه الكيميائي قبل إرسال رسالة تهدم العلاقة. (3) التعاطف وليس الشفقة أو المنافسة على المعاناة: حين تشكو "ليلى" من تعبها ويرد زوجها "وأنا أيضاً تعبان في العمل!"، فهذه منافسة وليست تعاطفاً؛ التعاطف هو استشعار مشاعر الآخر من داخل إطاره المرجعي ("يبدو أن يومك كان ثقيلاً، أخبريني أكثر"). (4) المهارات الاجتماعية: ترجمة الوعي والتعاطف إلى إصلاح للصدوع بعد الخلاف.',
        textEn:
          'Emotional Intelligence operates through four interconnected muscles: (1) Emotional Self-Awareness: Moving beyond generic anger to identify the underlying vulnerability—like "Sara," whose weekly outbursts masked childhood fears of rejection and feeling unappreciated. (2) Self-Regulation: The pause between trigger and action; I taught "Ahmed" the "6-Second Rule," giving the nervous system six seconds to clear the acute neurochemical surge before sending a destructive message. (3) Empathy (Not Sympathy or Suffering Competition): When "Laila" shared her exhaustion and her husband replied, "I worked hard today too!", he was competing in fatigue rather than empathizing. True empathy steps into the partner’s reference frame: "Your day sounds heavy—tell me more." (4) Social & Repair Skills: Translating awareness into active conflict repair.',
      },
    ],
    practicalExercise: {
      title: 'أدواتي العملية وتمرينان عصبيان من العيادة لتطوير ذكائك العاطفي',
      titleEn: 'Clinical Assessment & 2 Neuroplasticity Exercises to Upgrade Your EQ',
      steps: [
        'اختبار "الفجوة بين المحفز والاستجابة" (Stimulus-Response Gap): تذكر آخر انتقاد لاذع وُجّه إليك؛ هل رددت في الثانية الأولى بدفاعية، أم سألت نفسك: "ما الذي يؤلمني حقاً في هذا الانتقاد؟".',
        'اختبار "قراءة ما بين السطور" (The Subtext Test): 70% من التواصل الإنساني غير لفظي؛ حين يقول شريكك "أنا بخير" بنبرة باردة، هل تقرأ النبرة ولغة الجسد والصمت أم تكتفي بالكلمات؟',
        'تمرين عالم الأعصاب دان سيغل "سمِّ الشعور لتروّضه" (Name it to Tame it): بدلاً من قول "أنا غاضب"، قل بدقة: "أشعر بخيبة أمل مختلطة بشعور بعدم التقدير"—هذه الدقة تخفض نشاط اللوزة الدماغية بنسبة 50%.',
        'تمرين "الفضول بدلاً من الحكم" (Curiosity over Judgment): حين يخطئ شريكك، استبدل سؤال "كيف يجرؤ؟" بسؤال "ما الذي جعله يتصرف هكذا؟" لتنشيط قشرة الفص الجبهي العقلانية وتهدئة الجهاز العاطفي.',
      ],
      stepsEn: [
        'The Stimulus-Response Gap Test: Recall the last sharp criticism you received. Did you react in the first second, or pause to ask what specifically hurt inside?',
        'The Subtext Test: 70% of human communication is non-verbal. When your partner says "I’m fine" in a flat tone, do you read their posture, tone, and silence?',
        'Dan Siegel’s "Name It to Tame It" Exercise: Replace broad labels ("I’m furious") with granular emotion words ("I feel disappointed mixed with feeling unseen"). High emotional granularity reduces amygdala firing by 50%.',
        'Curiosity Over Judgment Exercise: When someone errs, shift from "How dare they?" to "What pain or fear drove them to act this way?"—activating the prefrontal cortex and calming emotional reactivity.',
      ],
    },
    conclusionAr:
      'الخلاصة: العلاقات لا تنهار بسبب قلة الحب، بل بسبب عجزنا عن ترجمة هذا الحب إلى لغة يفهمها الآخر. الذكاء العاطفي هو الذي يحوّل "الصدق الجارح" إلى "صدق شافٍ"، ويحوّل "الصمت البارد" إلى "حضور دافئ"، ويحوّل الخلاف من ساحة حرب إلى جسر عبور.',
    conclusionEn:
      'Conclusion: Relationships rarely collapse from a lack of love; they collapse from our inability to translate love into a language our partner’s nervous system can understand. EQ transforms wounding honesty into healing truth, cold silence into warm presence, and conflict from a battlefield into a bridge.',
    apaReferences: [
      {
        citation:
          'Brackett, M. A., & Rivers, S. E. (2024). The Neuroscience of Emotional Granularity: How "Naming" Transforms Emotional Reactivity in Close Relationships. Journal of Affective Science, 5(3), 201-218.',
        noteAr:
          'تبحث في كيف أن الدقة في تسمية المشاعر تقلل من التفاعل الاندفاعي وتعزز التنظيم العاطفي في العلاقات الحميمة.',
        noteEn:
          'Demonstrates how emotional granularity reduces impulsive reactivity and strengthens emotional regulation in intimate bonds.',
      },
      {
        citation:
          'Côté, S., & House, J. (2023). Emotional Intelligence as a Predictable Skill: Longitudinal Evidence from Adult Development. Psychological Bulletin, 149(7-8), 612-640.',
        noteAr:
          'دراسة طولية تؤكد أن الذكاء العاطفي مهارة قابلة للتطوير في أي مرحلة عمرية، وأنها المؤشر الأقوى لاستقرار العلاقات الزوجية والصداقات العميقة.',
        noteEn:
          'Longitudinal study confirming EQ can be developed at any adult age and is the strongest predictor of long-term relational stability.',
      },
      {
        citation:
          'Davis, M. H., & Kraus, S. (2025). Empathy Beyond Sympathy: The Role of Perspective-Taking Accuracy in Deepening Human Connection. Journal of Personality and Social Psychology, 128(1), 88-105.',
        noteAr:
          'تفرّق بين "الشفقة" و"التعاطف المعرفي"، وتثبت أن القدرة على رؤية العالم من منظور الآخر بدقة هي جوهر الذكاء العاطفي.',
        noteEn:
          'Distinguishes sympathy from cognitive perspective-taking accuracy as the foundation of sustainable human connection.',
      },
    ],
  },

  // ============================================================================
  // المقال الخامس (قصصي علمي عيادي): وهم الاتصال وعلاقات الجهد المنخفض
  // ============================================================================
  {
    id: 'clinic-illusion-of-connection-low-effort-relationships',
    articleType: 'narrative',
    title:
      'في عيادتي: وهم الاتصال.. حين تصبح "العلامة الزرقاء" بديلاً عن نبض القلب (دليل النجاة من علاقات "الجهد المنخفض")',
    titleEn:
      'In My Clinic: The Illusion of Connection — When "Blue Ticks" Replace Heartbeats (Surviving Low-Effort Relationships)',
    category: 'relationships',
    categoryLabelAr: 'مقالات قصصية علمية — علم نفس العلاقات الرقمية',
    categoryLabelEn: 'Clinical Narrative — Digital Relationship Psychology',
    readTime: '9 دقائق قراءة',
    readTimeEn: '9 min read',
    publishDate: '2026-11-02',
    icon: '📱',
    coverGradient: 'from-cyan-600/30 via-blue-700/20 to-indigo-900/40',
    summary:
      'مفارقة جيل Z والألفية: الجيل الأكثر اتصالاً في تاريخ البشرية، والأكثر وحدة في الواقع. نفكك ظاهرة "علاقات الجهد المنخفض" (Ghosting, Situationships, Orbiting)، إدمان الدوبامين المتقطع، والميزان التشخيصي الدقيق للتفريق بين التردد البشري والتلاعب العاطفي (Gaslighting).',
    summaryEn:
      'Unpacking the modern paradox of hyper-connected loneliness: why "Low-Effort Relationships" (Ghosting, Situationships, Orbiting) hijack the brain’s dopamine system through intermittent reinforcement, how to distinguish natural hesitation from Gaslighting, and 5 clinical steps to heal from silent trauma.',
    scientificFramework:
      'متلازمة الاتصال المتقطع (Intermittent Connection Syndrome)، سيكولوجية الاختفاء (Ghosting)، وهندسة الحدود الرقمية (2023-2025)',
    scientificFrameworkEn:
      'Intermittent Connection Syndrome, Psychology of Ghosting & Ambiguity, & Digital Boundary Architecture (2023–2025)',
    clinicalCaseQuoteAr:
      '«دخل إلى عيادتي يوسف (24 عاماً) وعيناه فارغتان، وقال لي جملة لا أنساها: يا دكتور، أنا أتحدث مع عشر فتيات في نفس الوقت على هاتفي، لكنني لم أشعر بالوحدة كما أشعر بها الآن أبداً.»',
    clinicalCaseQuoteEn:
      '“Youssef, 24, sat across from me in the clinic with hollow eyes and said a sentence I will never forget: ‘Doctor, I am texting ten women at the same time on my phone, yet I have never felt as lonely as I do right now.’”',
    keyTakeaways: [
      'علاقات الجهد المنخفض تتجلى في 3 وجوه: الاختفاء المفاجئ (Ghosting) الذي يحرم الدماغ من الإغلاق المعرفي، العلاقات المائعة بلا تعريف (Situationships)، والدوران في الفلك (Orbiting).',
      'الإدمان على هذه العلاقات المؤلمة سببه «متلازمة الاتصال المتقطع» (Intermittent Connection Syndrome) التي تفرز دوبامين غير مستقر يشبه آلية القمار.',
      'القاعدة الذهبية: إذا وجدت نفسك تقول باستمرار «ربما أنا المبالغ أو المخطئ»، فاعلم أنك لست في علاقة بل في «سجن معرفي» وتلاعب عاطفي (Gaslighting).',
      'الحب الحقيقي يتطلب «شجاعة الجهد»: شجاعة الوضوح، شجاعة الالتزام، وشجاعة الحضور.',
    ],
    keyTakeawaysEn: [
      'Low-effort relationships manifest in three forms: Ghosting (depriving the brain of cognitive closure), Situationships (intimacy without commitment), and Orbiting.',
      'We stay hooked on painful ambiguity due to "Intermittent Connection Syndrome"—unpredictable dopamine spikes identical to slot-machine reinforcement.',
      'Golden Rule: If you constantly tell yourself "Maybe I’m overreacting or imagining things," you are experiencing Gaslighting, not a healthy relationship.',
      'Authentic love requires the courage of effort: clarity, consistency, and committed presence.',
    ],
    contentParagraphs: [
      {
        heading: 'أولاً: تشريح الوهم.. لماذا نهرب إلى "العلاقات منخفضة الجهد"؟',
        headingEn: '1. Anatomy of the Illusion: The Three Faces of "Low-Effort Relationships"',
        text: 'في علم نفس العلاقات الرقمي، ندرس ظاهرة اسمها "علاقات الجهد المنخفض" (Low-Effort Relationships) وهي علاقات تُبنى على الحد الأدنى من الالتزام والحد الأقصى من الخيارات الظاهرية. أول وجوهها هو الـ Ghosting (الاختفاء المفاجئ دون تفسير): كما حدث مع "نور" التي ظلت تراجع كل رسالة أرسلتها بحثاً عن الخطأ فيها؛ والصدمة هنا تكمن في "غياب الإغلاق" (Lack of Closure) الذي يدخل الدماغ في حلقة لوم ذاتي. الوجه الثاني هو الـ Situationships (العلاقات المائعة): علاقة فيها كل شيء عدا التعريف والالتزام، وهي استغلال عاطفي مقنن بحرية زائفة. والوجه الثالث هو الـ Orbiting (الدوران في الفلك): أن يبقيك الشخص في مداره بالمشاهدة والإعجابات العابرة دون اقتراب حقيقي.',
        textEn:
          'In digital relationship psychology, "Low-Effort Relationships" are built on minimum commitment and maximum perceived options. Their three primary faces are: (1) Ghosting—abrupt disappearance without explanation, which traumatizes the brain through "Lack of Closure" and triggers endless self-blame; (2) Situationships—relationships containing emotional intimacy without definition or future commitment, masking emotional exploitation as "freedom"; and (3) Orbiting—keeping someone tethered in one’s digital periphery via story views and sporadic likes without genuine investment.',
      },
      {
        heading: 'ثانياً: لماذا نحن "مدمنون" على هذا الألم؟ علم "الدوبامين الرخيص"',
        headingEn: '2. Why Do We Get Addicted to Ambiguity? "Intermittent Connection Syndrome"',
        text: 'قد تسأل: "إذا كانت هذه العلاقات مؤلمة، لماذا نستمر فيها؟". الإجابة في علم الأعصاب: الدوبامين الرخيص. كل "لايك"، كل رسالة مفاجئة بعد غياب، كل "أونلاين" يظهر فجأة، يُطلق دفقة صغيرة من الدوبامين في دماغك. المشكلة أن هذا الدوبامين غير مستقر، فيدخلك في حلقة إدمانية تشبه القمار: أنت تنتظر "الربح" التالي وتتجاهل الخسائر المتراكمة. الدراسات الحديثة (2024) تُسمي هذه الظاهرة "متلازمة الاتصال المتقطع" (Intermittent Connection Syndrome)، وهي نفس الآلية العصبية التي تجعل المقامر يجلس أمام آلة الكازينو.',
        textEn:
          'Why do intelligent people stay in painful, ambiguous connections? Neuroscience points to intermittent dopamine reinforcement. Every unexpected message after silence, every sudden "online" status or like, triggers a volatile dopamine spike. Modern research (2024) terms this "Intermittent Connection Syndrome"—the exact variable-ratio reinforcement schedule that keeps gamblers glued to slot machines, awaiting the next unpredictable reward while ignoring mounting emotional losses.',
      },
      {
        heading: 'خامساً: التعافي من "الصدمات الصامتة".. كيف تعود للحب دون ندوب؟',
        headingEn: '3. Healing from "Silent Traumas": Returning to Love Without Scars',
        text: 'للتعافي من صدمات العلاقات الرقمية دون أن تتحول إلى شخص ساخر أو خائف من الحب، اتبع خمس خطوات علاجية: (1) اعترف بالألم (Name the Grief): الدماغ لا يميز بين فقدان علاقة رسمية وفقدان علاقة مائعة، فلا تصغّر ألمك. (2) أغلق الفجوة المعرفية بنفسك (Close the Loop): لا تنتظر رسالة اعتذار لن تأتي؛ اكتب رسالة وداع لنفسك تغلق فيها الملف: "لم أحصل على الوضوح، لكنني أستحق السلام". (3) أعد تعريف قيمتك الذاتية (Re-anchor Your Worth): ابنِ مرساة داخلية عبر كتابة 10 صفات تحبها في نفسك لا علاقة لها بالمظهر أو العلاقات. (4) جرب "الصيام العاطفي" (Emotional Fasting) لمدة 30 يوماً لإعادة ضبط نظام الدوبامين. (5) اطلب المساعدة المتخصصة إذا وجدت نفسك تكرر جذب أشخاص غير متاحين عاطفياً.',
        textEn:
          'To recover from Ghosting, Situationships, or digital Gaslighting without becoming cynical: (1) Name the Grief—the brain registers the pain of losing an undefined bond just as deeply as a formal breakup; (2) Close the Cognitive Loop Yourself—do not wait for an apology from a ghoster; write a closure letter to yourself affirming "I deserved clarity, and I choose peace"; (3) Re-anchor Your Worth—list 10 core qualities you value in yourself independent of romance; (4) Practice a 30-Day Emotional Fast from dating apps to reset your dopamine baseline; and (5) Seek clinical support if you notice a recurring unconscious pattern of pursuing emotionally unavailable partners.',
      },
    ],
    diagnosticTable: {
      titleAr: 'الميزان التشخيصي من العيادة: كيف تميز بين "التردد البشري" و"التلاعب العاطفي" (Gaslighting)؟',
      titleEn: 'Clinical Diagnostic Matrix: Natural Human Hesitation vs. Emotional Manipulation (Gaslighting)',
      col1Ar: 'المعيار التشخيصي',
      col1En: 'Diagnostic Criterion',
      col2Ar: 'التردد البشري الطبيعي (Natural Hesitation)',
      col2En: 'Natural Human Hesitation',
      col3Ar: 'التلاعب العاطفي (Gaslighting)',
      col3En: 'Emotional Manipulation (Gaslighting)',
      rows: [
        {
          criterionAr: 'الشفافية والوضوح',
          criterionEn: 'Transparency',
          naturalAr: 'يعترف بتردده بصدق: "أنا محتار، أحتاج وقتاً لترتيب ظروفي".',
          naturalEn: 'Honestly admits uncertainty: "I am unsure right now and need time."',
          manipulationAr: 'ينكر الواقع تماماً: "أنتِ تتخيلين، أنا لم أقل ذلك أبداً".',
          manipulationEn: 'Denies reality: "You’re imagining things; I never said that."',
        },
        {
          criterionAr: 'الاتساق السلوكي',
          criterionEn: 'Behavioral Consistency',
          naturalAr: 'أفعاله تتطابق تدريجياً مع كلماته مع مرور الوقت.',
          naturalEn: 'Actions gradually align with words over time.',
          manipulationAr: 'كلماته المعسولة وأفعاله المتناقضة في حرب دائمة.',
          manipulationEn: 'Sweet words and avoidant actions are in perpetual contradiction.',
        },
        {
          criterionAr: 'الاستجابة لمخاوفك',
          criterionEn: 'Response to Your Concerns',
          naturalAr: 'يحاول طمأنتك واحترام مشاعرك حتى لو كان متردداً.',
          naturalEn: 'Validates your feelings and seeks to reassure you respectfully.',
          manipulationAr: 'يصفك بـ "المجنونة"، "الحساسة جداً"، "الدرامية"، أو "المتشبثة".',
          manipulationEn: 'Labels you "crazy," "too sensitive," "dramatic," or "needy."',
        },
        {
          criterionAr: 'طبيعة الاعتذار',
          criterionEn: 'Nature of Apology',
          naturalAr: 'يعتذر بصدق عن تقصيره ويتحمل المسؤولية.',
          naturalEn: 'Takes accountability and apologizes sincerely for real mistakes.',
          manipulationAr: 'يعتذر فقط ليُسكتك ويُنهي النقاش دون أي تغيير في السلوك.',
          manipulationEn: 'Apologizes solely to silence the conversation without behavioral change.',
        },
        {
          criterionAr: 'الأثر النفسي عليك',
          criterionEn: 'Psychological Impact on You',
          naturalAr: 'تشعر بقلق طبيعي، لكنك تحتفظ بثقتك في عقلك وقيمتك.',
          naturalEn: 'You feel normal uncertainty, but your self-trust remains intact.',
          manipulationAr: 'تبدأ بالشك في ذاكرتك، وعقلك، وإدراكك، وقيمتك الذاتية.',
          manipulationEn: 'You begin doubting your own memory, sanity, perception, and worth.',
        },
      ],
    },
    practicalExercise: {
      title: 'هندسة الحدود الرقمية (Digital Boundary Architecture): 4 قواعد لحماية قلبك',
      titleEn: 'Digital Boundary Architecture: 4 Practical Rules to Protect Your Heart',
      steps: [
        'قاعدة "الأسبوع الأول" (The First Week Rule): لاحظ نمط التواصل في الأسبوع الأول؛ هل هو متسق أم يختفي لأيام ثم يعود كأن شيئاً لم يكن؟ أنماط البداية هي بصمة العلاقة كلها.',
        'اختبار "السؤال المباشر" (The Direct Question Test): بعد شهر من التعارف، اسأل بوضوح: "ما الذي تبحث عنه في هذه العلاقة؟". الشريك الجاد سيجيب بوضوح، أما المراوغ ("لماذا نضع مسميات؟") فغموضه المتعمد هو إجابة بحد ذاته.',
        'قاعدة "الـ 48 ساعة" (The 48-Hour Rule): إذا اختفى الشخص لأكثر من 48 ساعة دون ظرف طارئ أو تفسير، لا ترسل رسالة أخرى. الصمت رد، وكرامتك أغلى من علامة صح زرقاء.',
        'ميزان "الاستثمار العاطفي" (Emotional Investment Scale): اسأل نفسك كل أسبوع: "هل أستثمر في هذه العلاقة أكثر مما أستثمر في نفسي وصحتي؟".',
      ],
      stepsEn: [
        'The First Week Rule: Observe communication consistency in week one. Disappearing for days and returning casually early on is a blueprint of the entire relationship.',
        'The Direct Question Test: After one month of talking, ask clearly: "What are you looking for in this connection?" Evasive answers ("Why put labels on things?") are a clear answer in themselves.',
        'The 48-Hour Rule: If someone vanishes for over 48 hours without an emergency or explanation, do not double-text. Silence is a response, and your dignity outweighs a blue read receipt.',
        'The Emotional Investment Scale: Ask yourself weekly: "Am I investing more emotional energy analyzing this person than investing in my own life?"',
      ],
    },
    conclusionAr:
      'الخلاصة: لا تدع "العلامة الزرقاء" تخدعك، ولا تدع "اللايك" يقنعك أنك محبوب. الحب الحقيقي لا يُقاس بعدد الرسائل، بل بحضور القلب حين يكون الجسد بعيداً، والوضوح حين يكون السؤال صعباً. أنت إنسان يستحق علاقة تُعرَّف، وتُحترم، وتُبنى. ضع هاتفك جانباً وانظر في عينيّ: أنت تستحق أكثر من "جهد منخفض".',
    conclusionEn:
      'Conclusion: Do not let a blue read receipt or a casual like trick you into settling for crumbs. Real love is measured not by message frequency, but by emotional presence and unwavering clarity when hard questions are asked. Put your phone aside and remember: you deserve far more than a low-effort connection.',
    apaReferences: [
      {
        citation:
          'Twenge, J. M., & Haidt, J. (2024). The Loneliness Paradox: How Digital Hyper-Connection Fuels Gen Z’s Isolation Crisis. Journal of Adolescent Psychology, 52(3), 289-310.',
        noteAr:
          'دراسة موسعة تشرح "مفارقة الاتصال" لدى جيل Z وارتباط الاستخدام المكثف بارتفاع معدلات الوحدة.',
        noteEn:
          'Explains the hyper-connection loneliness paradox in Gen Z and its link to emotional isolation.',
      },
      {
        citation:
          'LeFebvre, L., & Westerman, D. (2023). Ghosting and the Psychology of Disappearance: Attachment, Closure, and Self-Worth in Digital Breakups. Computers in Human Behavior, 142, 107-125.',
        noteAr:
          'تبحث في الآليات النفسية لظاهرة Ghosting وكيف أن "غياب الإغلاق" يفعّل مناطق الألم في الدماغ.',
        noteEn:
          'Examines how lack of closure in ghosting activates neural pain pathways and outlines recovery models.',
      },
      {
        citation:
          'Spielmann, S. S., & Joel, S. (2025). Situationships and the Ambiguity Trap: How Low-Effort Relationships Erode Emotional Well-Being. Personality and Social Psychology Bulletin, 51(2), 178-195.',
        noteAr:
          'تسلط الضوء على كيف أن العلاقات غير المعرّفة تضعف تقدير الذات على المدى الطويل.',
        noteEn:
          'Highlights how undefined situationships erode long-term self-esteem and emotional security.',
      },
      {
        citation:
          'Fox, J., & Warber, K. (2024). Digital Gaslighting: Recognizing and Recovering from Emotional Manipulation in Online Relationships. Cyberpsychology, Behavior, and Social Networking, 27(5), 340-356.',
        noteAr:
          'تُعرّف "التلاعب العاطفي الرقمي" وتقدم معايير تشخيصية دقيقة للتمييز بينه وبين التردد الطبيعي.',
        noteEn:
          'Defines digital gaslighting and provides diagnostic criteria to distinguish manipulation from natural hesitation.',
      },
    ],
  },

  // ============================================================================
  // المقال السادس (قصصي علمي عيادي): متلازمة الاحتراق المبكر والإنتاجية السامة
  // ============================================================================
  {
    id: 'clinic-early-burnout-syndrome-toxic-productivity',
    articleType: 'narrative',
    title:
      'متلازمة الاحتراق المبكر.. حين يصبح "النجاح" سجناً من ذهب (دليل النجاة من فخ الإنتاجية السامة)',
    titleEn:
      'Early Burnout Syndrome: When "Success" Becomes a Golden Cage (A Clinical Guide to Escaping Toxic Productivity)',
    category: 'self_growth',
    categoryLabelAr: 'مقالات قصصية علمية — الصحة النفسية والاحتراق المبكر',
    categoryLabelEn: 'Clinical Narrative — Burnout & Self-Compassion',
    readTime: '8 دقائق قراءة',
    readTimeEn: '8 min read',
    publishDate: '2026-11-02',
    icon: '🔥',
    coverGradient: 'from-amber-600/30 via-orange-600/20 to-rose-800/30',
    summary:
      'من خلال قصة "ريم" (27 عاماً) التي تنجز عشر مهام يومياً لكنها تشعر بأنها لم تنجز شيئاً ولم تعد تعرف من هي بعيداً عن سيرتها الذاتية؛ نفكك فخ "الإنتاجية السامة"، علم "ذنب الراحة" (Rest Guilt)، وكيف نكسر حلقة التسويف والقلق عبر التعاطف مع الذات.',
    summaryEn:
      'Through the story of Reem, a 27-year-old high achiever who completes ten tasks a day yet feels empty and disconnected from who she is beyond her résumé, we unpack Toxic Productivity, "Rest Guilt," and Kristin Neff’s Self-Compassion framework.',
    scientificFramework:
      'التعاطف مع الذات لكريستين نيف (Self-Compassion - Neff, 2024)، متلازمة العامل الجيد وذنب الراحة، وفشل التنظيم العاطفي في التسويف (2023-2025)',
    scientificFrameworkEn:
      'Kristin Neff’s Self-Compassion (2024), Rest Guilt & Good Worker Syndrome, & Procrastination as Emotion Regulation (2023–2025)',
    clinicalCaseQuoteAr:
      '«قالت لي ريم (27 عاماً) وعيناها حمراوان من قلة النوم: يا دكتور، أنا أنجز كل يوم عشر مهام، لكنني أشعر أنني لم أنجز شيئاً. أنا تعبة لدرجة أنني لم أعد أعرف من أنا بعيداً عن إنجازاتي.»',
    clinicalCaseQuoteEn:
      '“Reem, 27, sat before me with sleep-deprived eyes and said: ‘Doctor, I complete ten tasks every single day, yet I feel like I’ve accomplished nothing. I am so exhausted that I no longer know who I am apart from my achievements.’”',
    keyTakeaways: [
      'الإنتاجية السامة (Toxic Productivity) ليست حباً للعمل، بل هي إدمان على الإنجاز كوسيلة للهروب من الشعور بالدونية عبر معادلة خاطئة: «قيمتي = ما أنجزه».',
      'التسويف ليس كسلاً، بل هو «قلق مقنن» وفشل في تنظيم المشاعر أمام المهام الضخمة المخيفة.',
      'العلاج يبدأ بـ «المفتاح الثلاثي»: التعاطف مع الذات (وليس القسوة)، قاعدة الخطوة الصغيرة جداً، وفصل الهوية الإنسانية عن الإنجاز.',
      'الراحة ليست «مكافأة» تنتظرها بعد الإنهيار، بل هي «حق بيولوجي ونفسي أساسي» قبل الإنجاز.',
    ],
    keyTakeawaysEn: [
      'Toxic Productivity is not passion for work; it is an addiction to achievement used to outrun feelings of inadequacy based on the false equation: "My Worth = My Output."',
      'Procrastination is not laziness—it is regulated anxiety and emotion-regulation failure in the face of overwhelming perfectionist expectations.',
      'Breaking the cycle requires the Triple Key: Self-Compassion (Kristin Neff), the Tiny Step Rule, and separating Identity from Achievement.',
      'Rest is not a reward you earn only after collapsing; it is a foundational human right and biological necessity.',
    ],
    contentParagraphs: [
      {
        heading: 'أولاً: تشريح الفخ.. الوجوه الثلاثة للإنتاجية السامة وعلم "ذنب الراحة"',
        headingEn: '1. Anatomy of the Trap: Toxic Productivity and the Science of "Rest Guilt"',
        text: 'في علم النفس الحديث، تتجلى الإنتاجية السامة في ثلاثة وجوه: (1) وهم الكمال الرقمي (Digital Perfectionism): حيث يقارن الشاب واقعه بمعرض مشوه يعرض أفضل 1% من نجاحات الآخرين على LinkedIn. (2) شلل الخيارات (Choice Paralysis): حيث يؤدي تعدد المسارات إلى تأجيل القرار خوفاً من الخطأ، فالتسويف هنا قلق مقنن وليس كسلاً. (3) معادلة القيمة الخاطئة (قيمتي = ما أنجزه): حين تمرض أو تتوقف تشعر بأنك عديم الفائدة. ويترافق هذا مع "ذنب الراحة" (Rest Guilt) أو "متلازمة العامل الجيد" (Good Worker Syndrome - 2024)، حيث يفسر الدماغ المدمن على الإنتاجية الراحةَ على أنها كسل، والكسلَ على أنه خطيئة أخلاقية.',
        textEn:
          'Modern clinical psychology identifies three faces of Toxic Productivity: (1) Digital Perfectionism—comparing your daily reality to the curated top 1% of others’ career highlights on LinkedIn; (2) Choice Paralysis—where infinite career paths trigger decision freeze; and (3) The False Worth Equation ("My Worth = My Output"), which makes any pause feel like existential failure. This breeds "Rest Guilt" (Good Worker Syndrome, 2024), wherein a productivity-addicted brain misinterprets rest as laziness and laziness as a moral failing.',
      },
      {
        heading: 'ثالثاً: كيف تخرج من حلقة التسويف-القلق؟ المفتاح الثلاثي من العيادة',
        headingEn: '2. Breaking the Procrastination-Anxiety Loop: The Clinical Triple Key',
        text: 'للخروج من شلل الإنجاز، أستخدم مع مراجعي المفتاح الثلاثي: أولاً، التعاطف مع الذات (Self-Compassion) للدكتورة كريستين نيف: القسوة على الذات تشلّك ولا تحفزك؛ استبدل جلد الذات بقول: "أنا أرى أنك متعب وهذا طبيعي، دعنا نبدأ بخطوة صغيرة". ثانياً، قاعدة الخطوة الصغيرة جداً (The Tiny Step Rule): الدماغ يقاوم المهام الضخمة، لذا صغّر المهمة حتى تصبح بسيطة جداً ("سأكتب جملة واحدة فقط" أو "سألبس حذاء الرياضة فقط"). ثالثاً، فصل الهوية عن الإنجاز: حين تفشل في مهمة لا تقل "أنا فاشل" بل قل "فشلت في هذه المهمة، وهذا لا يحدد من أنا كإنسان".',
        textEn:
          'To break the anxiety-procrastination loop, I guide clients through three clinical shifts: First, Kristin Neff’s Self-Compassion—self-criticism paralyzes the nervous system, whereas compassionate self-talk ("I see you are overwhelmed; let’s take one small step") fuels sustainable action. Second, The Tiny Step Rule—shrink intimidating tasks until they bypass amygdala resistance ("I will write just one sentence"). Third, Separating Identity from Achievement—replace "I am a failure" with "This specific task did not succeed, and my human worth remains intact."',
      },
    ],
    practicalExercise: {
      title: 'هندسة النجاح المتوازن (Balanced Success Architecture): 4 تمارين عملية',
      titleEn: 'Balanced Success Architecture: 4 Clinical Exercises to Reclaim Your Life',
      steps: [
        'اختبار "السبب الداخلي" (The Intrinsic Why Test): قبل بدء أي مشروع، اسأل نفسك: "هل أفعل هذا لأنني أريده حقاً، أم لأنني أخاف أن أكون أقل من الآخرين؟".',
        'ميزان "الطاقة مقابل الإنجاز" (Energy vs. Achievement Scale): إذا كنت تنجز 10 مهام يومياً لكنك تنام 4 ساعات وتشعر بالانهيار، فأنت لست ناجحاً بل "مفلس عاطفياً وعصبياً".',
        'قاعدة "الساعة الذهبية" (The Golden Hour Rule): خصص ساعة يومياً تفعل فيها شيئاً لا يُنتج، ولا يُقيّم، ولا يُقارن (مشي، رسم، قراءة، لعب مع طفل) كصيانة نفسية ضرورية.',
        'تمرين "قائمة الكائن، لا الفعل" (The Being, Not Doing List): اكتب 10 أشياء تحبها في نفسك لا علاقة لها بإنجازاتك المهنية أو سيرتك الذاتية ("أنا صديق وفي"، "أصنع قهوة لذيذة"، "أستمع بصدق").',
      ],
      stepsEn: [
        'The Intrinsic Why Test: Before taking on a project, ask: "Am I doing this out of genuine meaning, or out of fear of falling behind others?"',
        'The Energy vs. Achievement Scale: Completing 10 tasks on 4 hours of sleep is not success—it is neurological bankruptcy. Align output with biological energy.',
        'The Golden Hour Rule: Dedicate one hour daily to an activity that produces nothing, is graded by no one, and cannot be compared online (walking, sketching, reading fiction).',
        'The "Being, Not Doing" List: Write down 10 things you love about who you are that have zero connection to your résumé or productivity.',
      ],
    },
    conclusionAr:
      'الخلاصة: النجاح الحقيقي هو أن تكون "كاملاً بإنسانيتك"، لا "مثالياً كآلة". أنت لست سيرة ذاتية تمشي على قدمين، ولست آلة إنتاج. أي نجاح يأتي على حساب صحتك النفسية ليس نجاحاً، بل هو "سجن من ذهب" يستنزفك. ضع هاتفك جانباً وانظر في عينيّ: أنت تستحق أكثر من إنتاجية سامة.',
    conclusionEn:
      'Conclusion: True success is being whole as a human being, not flawless as a machine. You are not a walking résumé. Any achievement purchased at the cost of your mental health is merely a golden cage. Put your phone down and remember: your worth exists independently of your output.',
    apaReferences: [
      {
        citation:
          'Neff, K. D., & Germer, C. K. (2024). Self-Compassion as an Antidote to Burnout: Breaking the Cycle of Toxic Productivity in High-Achieving Young Adults. Journal of Clinical Psychology, 80(3), 445-462.',
        noteAr:
          'دراسة موسعة تثبت أن التعاطف مع الذات هو أقوى أداة نفسية للخروج من حلقة الاحتراق النفسي والتسويف المزمن.',
        noteEn:
          'Demonstrates that self-compassion is the most effective clinical antidote to burnout and chronic procrastination in high achievers.',
      },
      {
        citation:
          'Twenge, J. M., & Campbell, W. K. (2023). The Perfectionism Epidemic: How Social Media Fuels Early Burnout and Choice Paralysis in Gen Z. Psychological Science, 34(8), 1102-1118.',
        noteAr:
          'تبحث في كيف تعزز منصات التواصل "الكمال الرقمي" و"شلل الخيارات" لدى الشباب.',
        noteEn:
          'Examines how social media fuels digital perfectionism and choice paralysis in young adults.',
      },
      {
        citation:
          'Sirois, F. M., & Pychyl, T. A. (2025). Procrastination as Emotional Regulation Failure: The Role of Self-Compassion in Breaking the Anxiety-Procrastination Loop. Personality and Social Psychology Review, 29(1), 78-95.',
        noteAr:
          'تسلط الضوء على أن التسويف ليس كسلاً بل فشل في تنظيم المشاعر، وتقدم أدوات عملية لكسر الحلقة.',
        noteEn:
          'Establishes that procrastination is an emotion-regulation failure rather than laziness and outlines self-compassion interventions.',
      },
      {
        citation:
          'Schaufeli, W. B., & De Wit, H. (2024). Toxic Productivity and the Good Worker Syndrome: A 10-Year Longitudinal Study of Burnout in High-Performing Professionals. Journal of Occupational Health Psychology, 29(2), 156-172.',
        noteAr:
          'دراسة طولية تؤكد أن "الإنتاجية السامة" و"ذنب الراحة" هما المؤشران الأقوى للاحتراق المبكر.',
        noteEn:
          'A 10-year longitudinal study confirming toxic productivity and rest guilt as primary predictors of early burnout.',
      },
    ],
  },

  // ============================================================================
  // المقال السابع (قصصي علمي عيادي): اضطراب الهوية وفخ المقارنة الرقمية
  // ============================================================================
  {
    id: 'clinic-digital-identity-disorder-behind-scenes-vs-stage',
    articleType: 'narrative',
    title:
      'اضطراب الهوية.. حين تقارن "كواليس" حياتك بـ "مسرح" الآخرين (دليل النجاة من فخ المقارنة الرقمية)',
    titleEn:
      'Digital Identity Disorder: When You Compare Your "Behind-the-Scenes" with Others’ "Stage" (Surviving the Digital Comparison Trap)',
    category: 'self_growth',
    categoryLabelAr: 'مقالات قصصية علمية — الهوية وعلم النفس الرقمي',
    categoryLabelEn: 'Clinical Narrative — Identity & Digital Psychology',
    readTime: '8 دقائق قراءة',
    readTimeEn: '8 min read',
    publishDate: '2026-11-02',
    icon: '🎭',
    coverGradient: 'from-purple-600/30 via-fuchsia-600/20 to-indigo-800/30',
    summary:
      'دخل "عمر" (23 عاماً) إلى العيادة قائلاً: "كل يوم أفتح تيك توك أرى شخصاً نجح في مجال مختلف فأريد أن أصبح مثله؛ غيرت تخصصي ثلاث مرات في أسبوع ولم أعد أعرف من أنا!". كيف نفكك وهم المقارنة غير المتكافئة، متلازمة الانتباه المتقطع (TikTok Brain)، ونستعيد البوصلة الداخلية للهوية؟',
    summaryEn:
      'Omar, 23, walked into my clinic exhausted: "Every day I open TikTok, see someone succeeding in a different field, and want to become them—I changed my major three times this week and no longer know who I am!" Here is how to overcome Asymmetric Comparison and rebuild an authentic internal identity.',
    scientificFramework:
      'المقارنة غير المتكافئة (Vogel & Rose, 2023)، متلازمة الانتباه المتقطع (TikTok Brain - 2024)، وإعادة بناء الهوية الداخلية (2025)',
    scientificFrameworkEn:
      'Asymmetric Social Comparison (Vogel & Rose, 2023), Intermittent Attention Syndrome ("TikTok Brain", 2024), & Internal Identity Reconstruction (2025)',
    clinicalCaseQuoteAr:
      '«قال لي عمر (23 عاماً): يا دكتور، أنا لا أعرف من أنا. كل يوم أفتح تيك توك، أرى شخصاً نجح في مجال مختلف، فأريد أن أصبح مثله. أنا تعبت من محاولة أن أكون كل الناس، ولم أعد أعرف من أريد أن أكون فعلاً.»',
    clinicalCaseQuoteEn:
      '“Omar, 23, sighed deeply and told me: ‘Doctor, I don’t know who I am anymore. Every day I open TikTok, see someone succeeding in a different path, and try to copy them. I am exhausted from trying to be everyone else and no longer know who I truly want to be.’”',
    keyTakeaways: [
      'أنت تقارن «كواليس» حياتك الكاملة (الملل، القلق، الروتين) بـ «مسرح» الآخرين المنتقى (أفضل 1% من لحظاتهم بعد الفلاتر والمونتاج).',
      'التعود على فيديوهات الـ 15 ثانية يخلق «متلازمة الانتباه المتقطع» (TikTok Brain) التي تضعف القدرة على التأمل العميق ومعرفة الذات.',
      'لن تجد نفسك في مرآة الآخرين؛ الهوية الحقيقية تُبنى من الداخل عبر الانتقال من سؤال «من أريد أن أبدو؟» إلى سؤال «من أريد أن أكون؟».',
    ],
    keyTakeawaysEn: [
      'You are comparing your unfiltered "Behind-the-Scenes" (doubt, boredom, routine) with others’ heavily edited "Stage" (the top 1% highlight reel).',
      'Chronic consumption of 15-second clips induces "Intermittent Attention Syndrome" (TikTok Brain), eroding deep reflection and identity coherence.',
      'You will never find yourself in someone else’s mirror; authentic identity shifts the question from "Who do I want to look like?" to "Who do I choose to be?"',
    ],
    contentParagraphs: [
      {
        heading: 'أولاً: تشريح الفخ.. المقارنة غير المتكافئة و"الدماغ التيك توكي"',
        headingEn: '1. Anatomy of the Trap: Asymmetric Comparison & "TikTok Brain"',
        text: 'في الماضي كنت تقارن نفسك بجيرانك وزملائك، أما اليوم فتقارن نفسك بملايين الأشخاص الذين يعرضون أفضل لحظاتهم فقط. هذا يخلق ثلاثة فخاخ: (1) وهم المقارنة غير المتكافئة (Asymmetric Comparison): مقارنة كواليسك بمسرحهم. (2) إدمان الدوبامين الرخيص عبر الفيديوهات القصيرة المصممة عصبياً لإبقائك في حلقة تشبه القمار. (3) اضطراب الهوية الرقمي: تقليد هويات الآخرين وتغيير الأسلوب والاهتمامات باستمرار. وتُسمي الدراسات الحديثة (2024) أثر الفيديوهات القصيرة بـ "متلازمة الانتباه المتقطع" (Intermittent Attention Syndrome)، حيث يفقد الدماغ قدرته على التركيز الطويل والتأمل الذاتي اللازم لبناء هوية مستقرة.',
        textEn:
          'Historically, social comparison was local; today, you compare your raw daily life against millions of global highlight reels. This creates three clinical traps: (1) Asymmetric Comparison—measuring your messy backstage against others’ polished stage; (2) Cheap Dopamine Addiction engineered by short-form video algorithms; and (3) Digital Identity Disorder—chameleon-like imitation of trending personas. Neuroscience research (2024) terms the resulting cognitive fragmentation "Intermittent Attention Syndrome" (TikTok Brain), which robs the brain of the sustained introspection required to form a stable identity.',
      },
      {
        heading: 'ثالثاً: المفتاح الثلاثي لاستعادة البوصلة الداخلية للهوية',
        headingEn: '2. The Triple Key to Reclaiming Your Internal Identity Compass',
        text: 'للخروج من حلقة المقارنة والإدمان الرقمي نطبق ثلاث ركائز: (1) الديتوكس الرقمي كإعادة ضبط للدوبامين (صيام رقمي لمدة 24 ساعة أسبوعياً تعود فيه لأفكارك وحياتك الواقعية). (2) قاعدة "الكواليس مقابل المسرح": كلما قارنت نفسك بمؤثر، ذكّر عقلك فوراً: "أنا أقارن كل حياتي بأفضل 1% ممنتج من حياته، وهذه مقارنة غير عادلة علمياً". (3) تمرين الهوية الداخلية: اكتب قائمة بـ 10 قيم جوهرية تريد أن تعيش بها (كالصدق، الإبداع، التعاطف، التعلم المستمر) واجعلها بوصلتك لاتخاذ القرارات بدلاً من البحث عن إعجاب الآخرين.',
        textEn:
          'To exit the comparison loop, we apply three clinical interventions: (1) Dopamine Reset via a weekly 24-hour Digital Detox; (2) The "Backstage vs. Stage" Cognitive Check whenever upward comparison strikes; and (3) The Internal Identity Exercise—defining 10 core personal values (e.g., integrity, creativity, curiosity, compassion) to serve as your internal decision-making compass rather than external validation.',
      },
    ],
    practicalExercise: {
      title: 'هندسة الاستخدام الواعي (Conscious Usage Architecture): 4 قواعد يومية',
      titleEn: 'Conscious Usage Architecture: 4 Daily Practices to Rebuild Self-Trust',
      steps: [
        'اختبار "السبب قبل الفتح" (The Why-Before-Opening Test): قبل فتح أي تطبيق، اسأل نفسك: "لماذا أفتحه الآن؟". إذا كانت الإجابة "ملل، قلق، أو هروب من مهمة"، أغلق الهاتف فوراً وافعل نشاطاً حقيقياً.',
        'قاعدة "الـ 30 دقيقة الأولى" (The First 30 Minutes Rule): لا تفتح منصات التواصل في أول 30 دقيقة بعد استيقاظك حتى لا تبدأ يومك بمقارنة نفسك بالآخرين قبل الاتصال بذاتك.',
        'تمرين "قائمة الإنجازات الصغيرة الحقيقية" (Small Wins List): كل ليلة، اكتب 3 أشياء واقعية أنجزتها لا علاقة لها بالسوشيال ميديا (قراءة 10 صفحات، مشي 20 دقيقة، حوار صادق مع صديق).',
        'تجربة "الصيام عن المقارنة" لمدة أسبوع: كلما بدأ عقلك بالمقارنة قل بوعي: "توقف؛ هذه مقارنة غير متكافئة، وأنا أركز على مساري الخاص".',
      ],
      stepsEn: [
        'The Why-Before-Opening Test: Pause before tapping any social app and ask: "Why am I opening this right now?" If the answer is boredom, anxiety, or task avoidance, put the phone down.',
        'The First 30 Minutes Rule: Keep the first 30 minutes after waking completely social-media-free so your morning mindset is anchored in your own life, not others’ feeds.',
        'The Offline Small Wins List: Every night, write down 3 real-world actions you completed (read 10 pages, walked 20 minutes, had a real conversation).',
        '7-Day Comparison Fast: Whenever you catch yourself comparing, consciously interrupt the thought: "Stop—this is backstage vs. stage. I choose my own lane."',
      ],
    },
    conclusionAr:
      'الخلاصة: هويتك الحقيقية لا تُقاس بما يعتقده الآخرون أو بعدد الإعجابات، بل بـ "من تعرف أنك أنت" حين يكون الهاتف مغلقاً. أنت إنسان لك كواليس ومسرح، وأي مقارنة بين كواليسك ومسرح الآخرين هي ظلم لنفسك. ضع هاتفك جانباً وانظر في عينيّ: أنت تستحق أكثر من "هوية مستعارة".',
    conclusionEn:
      'Conclusion: Your true identity is never measured by likes or follower counts, but by who you know yourself to be when the screen is off. You are a complete human being with both a backstage and a stage—never trade your authentic path for a borrowed persona.',
    apaReferences: [
      {
        citation:
          'Twenge, J. M., & Haidt, J. (2024). The TikTok Brain: How Short-Form Video Platforms Rewire Attention and Identity Formation in Gen Z. Journal of Adolescent Psychology, 53(2), 178-195.',
        noteAr:
          'دراسة موسعة تشرح كيف تعيد منصات الفيديوهات القصيرة تشكيل نظام الانتباه وتكوين الهوية لدى جيل Z.',
        noteEn:
          'Explains how short-form video platforms rewire attention networks and identity formation in youth.',
      },
      {
        citation:
          'Vogel, E. A., & Rose, J. P. (2023). Social Comparison in the Digital Age: The "Behind-the-Scenes vs. Stage" Effect on Self-Esteem and Identity. Personality and Social Psychology Bulletin, 49(8), 1102-1118.',
        noteAr:
          'تبحث في كيف تضعف المقارنة بين كواليس الحياة اليومية ومسرح السوشيال ميديا تقدير الذات.',
        noteEn:
          'Examines the deleterious impact of comparing daily backstage reality with curated social media stages.',
      },
      {
        citation:
          'Primack, B. A., & Sidani, J. (2025). Digital Detox as Identity Reconstruction: Breaking the Cycle of Social Comparison and Dopamine Addiction. Cyberpsychology, Behavior, and Social Networking, 28(3), 234-250.',
        noteAr:
          'تسلط الضوء على دور الديتوكس الرقمي في إعادة ضبط الدوبامين وإعادة بناء الهوية.',
        noteEn:
          'Highlights structured digital detox as a mechanism for dopamine recalibration and identity reconstruction.',
      },
      {
        citation:
          'Nesi, J., & Prinstein, M. J. (2024). Identity Formation in the Age of Social Media: From External Validation to Internal Compass. Journal of Research on Adolescence, 34(1), 45-62.',
        noteAr:
          'تؤكد أن الهوية الصحية تُبنى من الداخل (القيم والشغف والمعنى) لا من المصادقة الرقمية الخارجية.',
        noteEn:
          'Confirms that resilient identity is anchored in internal values rather than external algorithmic validation.',
      },
    ],
  },

  // ============================================================================
  // المقال الثامن (قصصي علمي عيادي): القلق الوجودي وضبابية المستقبل
  // ============================================================================
  {
    id: 'clinic-existential-anxiety-future-fog-resilience',
    articleType: 'narrative',
    title:
      'القلق الوجودي.. حين تنهار "القواعد القديمة" ويبقى السؤال: "ماذا أفعل الآن؟" (دليل النجاة من ضبابية المستقبل)',
    titleEn:
      'Existential Anxiety: When the "Old Rules" Collapse and Only One Question Remains: "What Do I Do Now?" (Navigating Future Fog)',
    category: 'applied_psychology',
    categoryLabelAr: 'مقالات قصصية علمية — علم النفس الوجودي والمرونة',
    categoryLabelEn: 'Clinical Narrative — Existential Psychology & Resilience',
    readTime: '9 دقائق قراءة',
    readTimeEn: '9 min read',
    publishDate: '2026-11-02',
    icon: '🧭',
    coverGradient: 'from-emerald-700/30 via-teal-800/20 to-slate-900/50',
    summary:
      'لماذا يشعر الشباب اليوم بأنهم "يبنون قلعة على رمل" رغم اجتهادهم؟ نفكك ظاهرة انهيار العقد الاجتماعي القديم، القلق الوجودي المزدوج (الاقتصادي والمناخي)، عدم تحمل عدم اليقين عصبياً، وكيف نتخذ قراراتنا المصيرية وسط الضباب باستخدام "بوصلة القيم" بدلاً من "خريطة الطريق".',
    summaryEn:
      'Why do hardworking young adults today feel as though they are "building castles on sand"? We examine the collapse of the old social contract, Intolerance of Uncertainty in the brain, and how to make life decisions in the fog using a "Values Compass" rather than an obsolete roadmap.',
    scientificFramework:
      'العلاج بالقبول والالتزام (ACT - Hayes & Hofmann, 2024)، عدم تحمل عدم اليقين (Dugas, 2025)، وعلم المرونة في عصر الأزمات المتعددة (Southwick & Charney, 2024)',
    scientificFrameworkEn:
      'Acceptance and Commitment Therapy (ACT - Hayes & Hofmann, 2024), Intolerance of Uncertainty (Dugas, 2025), & Polycrisis Resilience Science',
    clinicalCaseQuoteAr:
      '«قال لي المهندس يوسف (27 عاماً): يا دكتور، أنا أعمل وأدرس وأوفر، لكنني أشعر أنني أبني قلعة على رمل. كل يوم أقرأ خبراً عن تسريح موظفين أو أزمة اقتصادية، وأسأل نفسي: ما الجدوى من كل هذا؟»',
    clinicalCaseQuoteEn:
      '“Youssef, a 27-year-old engineer, told me: ‘Doctor, I work hard, study, and save, yet I feel like I’m building a castle on shifting sand. Every day I read about layoffs, economic shocks, or global crises and ask myself: What is the point of all this effort?’”',
    keyTakeaways: [
      'يعيش جيل اليوم «انهيار العقد الاجتماعي القديم» (ادرس ← توظف ← استقر)، مما يولد ضبابية وجودية (Existential Fog).',
      'الدماغ البشري مبرمج على اليقين، ويفسر المجهول كتهديد بيولوجي يطلق الكورتيزول باستمرار (Intolerance of Uncertainty).',
      'في عالم يتغير كل 6 أشهر، انتهت صلاحية «خرائط الطريق الصلبة»؛ والبديل العلمي هو القيادة بـ «بوصلة القيم» (Values Compass) وقاعدة «الخطوة التالية الصحيحة».',
      'المرونة النفسية ليست أن تبني قلعة صلبة تنكسر مع أول عاصفة، بل أن تكون كالغصن الحي ينحني مع الرياح ثم يعود أقوى.',
    ],
    keyTakeawaysEn: [
      'Today’s generation faces the collapse of the old linear social contract (Study → Job → Housing Security), creating dense "Future Fog."',
      'The human brain is wired for certainty and neurobiologically interprets ambiguity as an active threat (Intolerance of Uncertainty).',
      'When 10-year roadmaps become obsolete, navigate using a "Values Compass" and the "Next Right Step" rule.',
      'Resilience is not rigid invulnerability; it is adaptive flexibility and building "Islands of Meaning" amidst global volatility.',
    ],
    contentParagraphs: [
      {
        heading: 'أولاً: لماذا انهارت "القواعد القديمة"؟ وعلم "الدماغ المبرمج على اليقين"',
        headingEn: '1. Collapse of the Old Rules & The Brain’s Intolerance of Uncertainty',
        text: 'في علم النفس الوجودي نرصد ثلاثة وجوه لضبابية العصر: القلق الاقتصادي المزمن (حيث لم يعد الادخار أو الشهادة يضمنان الأمان التقليدي)، والقلق المناخي والكوني على مستقبل الأجيال، وضبابية المستقبل (Future Fog) التي جعلت الخطط العشرية عاجزة أمام تغيرات كل ستة أشهر. وعصبياً، تسمي أبحاث 2024-2025 هذه المعاناة بـ "عدم تحمل عدم اليقين" (Intolerance of Uncertainty)؛ فالدماغ البشري يفسر "المجهول" على أنه "تهديد مباشر"، فيطلق هرمونات التوتر (الكورتيزول والأدرينالين) باستمرار، مما يجعلك تشعر بأنك تغرق حتى وأنت واقف على اليابسة.',
        textEn:
          'Existential psychology identifies three converging stressors: Chronic Economic Anxiety (where degrees and savings no longer guarantee traditional milestones), Eco/Global Anxiety, and "Future Fog." Neurobiologically, research (2024–2025) explains our distress through "Intolerance of Uncertainty": the brain registers ambiguity as an immediate survival threat, chronically activating the HPA stress axis and leaving young adults feeling as though they are drowning even while standing on dry land.',
      },
      {
        heading: 'ثالثاً: المفتاح الثلاثي.. المرونة النفسية، بوصلة القيم، وجزر المعنى',
        headingEn: '2. The Triple Key: Psychological Flexibility, Values Compass, & Islands of Meaning',
        text: 'للخروج من القلق الوجودي نعتمد ثلاث استراتيجيات إكلينيكية من العلاج بالقبول والالتزام (ACT): (1) المرونة النفسية عبر "التقبل الجذري" (Radical Acceptance) بأن عدم الاستقرار هو الواقع الجديد، والتركيز على "دائرة النفوذ" (جهدك، قيمك، علاقاتك) بدلاً من دائرة الهموم الخارجية. (2) اتخاذ القرارات في الضباب باستخدام "بوصلة القيم" (Values Compass) بدلاً من "خريطة الطريق"؛ فبدلاً من سؤال "أي وظيفة تضمن لي المستقبل لـ 20 سنة؟"، اسأل: "أي خطوة اليوم تسمح لي بأن أتعلم وأبدع وأعيش بقيمي؟". (3) بناء "جزر المعنى" (Islands of Meaning) وممارسة الامتنان الجذري في تفاصيل الحياة اليومية.',
        textEn:
          'Drawing from Acceptance and Commitment Therapy (ACT), we apply three clinical strategies: (1) Radical Acceptance and focusing energy strictly within your "Circle of Influence" (your skills, values, and relationships) rather than macro-events beyond your control; (2) Navigating in the Fog using a "Values Compass" instead of a rigid roadmap—choosing actions aligned with core values (learning, service, creativity, family) today; and (3) Building "Islands of Meaning" and practicing radical gratitude as daily emotional anchors.',
      },
    ],
    practicalExercise: {
      title: 'هندسة التكيف الواعي (Conscious Adaptation Architecture): 4 أدوات عملية',
      titleEn: 'Conscious Adaptation Architecture: 4 Practical Clinical Tools',
      steps: [
        'اختبار "دائرة النفوذ" (The Circle of Influence Test): ارسم دائرتين؛ داخلية (جهدك، ردود أفعالك، مهاراتك، علاقاتك) وخارجية (الاقتصاد العالمي، السياسات، المناخ). كلما قلقت، اسأل: في أي دائرة يقع هذا القلق؟ وحرر طاقتك للدائرة الداخلية.',
        'قاعدة "الخطوة التالية الصحيحة" (The Next Right Step): حين يكون الضباب كثيفاً، لا تحاول رؤية الخطوة العاشرة؛ ركز فقط على "ما هو أفضل شيء صحيح يمكنني فعله اليوم؟".',
        'تمرين "التأطير المعرفي" (Cognitive Reframing): استبدل جملة "المستقبل مظلم" بـ "المستقبل مجهول، وهذا يعني وجود إمكانيات وفرص لم أكتشفها بعد".',
        'بناء "جزر المعنى" اليومية: خصص وقتاً ثابتاً لعلاقة عميقة، هواية تحبها، تأمل أو صلاة بخشوع، أو مشي في الطبيعة—فهذه الجزر هي ملاذك الآمن.',
      ],
      stepsEn: [
        'The Circle of Influence Test: Draw two concentric circles—Inner (your effort, skills, responses, relationships) and Outer (global economy, macro-politics). Whenever anxiety spikes, redirect energy from the Outer to the Inner circle.',
        'The Next Right Step Rule: In dense fog, you only need to see one step ahead. Ask: "What is the single most constructive action I can take today?"',
        'Cognitive Reframing: Reframe "The future is dark" into "The future is unwritten, which means possibilities exist that I haven’t discovered yet."',
        'Building Daily Islands of Meaning: Anchor your day in deep relationships, spiritual mindfulness, nature, and creative hobbies that no economic shift can take away.',
      ],
    },
    conclusionAr:
      'الخلاصة: العالم القديم علّمك أن النجاح هو "الاستقرار الصلب"، لكن العالم الجديد يعلّمك أن النجاح هو "المرونة وصناعة المعنى". أنت لست ضحية للظروف، بل أنت صانع معنى في عالم متغير، وكل قرار واعي تتخذه اليوم هو فعل أمل وشجاعة ضد الضباب.',
    conclusionEn:
      'Conclusion: The old world taught that success meant static certainty; the new world teaches that success is psychological agility and meaning-making. You are not a passive victim of volatility—you are an active architect of meaning, and every purposeful step you take today is an act of hope against the fog.',
    apaReferences: [
      {
        citation:
          'Hayes, S. C., & Hofmann, S. G. (2024). Existential Anxiety in an Age of Uncertainty: Acceptance and Commitment Therapy Approaches for Climate and Economic Dread. Journal of Contextual Behavioral Science, 31, 112-128.',
        noteAr:
          'تقدم نموذجاً عملياً من العلاج بالقبول والالتزام (ACT) للتعامل مع القلق الوجودي وبناء المرونة عبر التركيز على القيم.',
        noteEn:
          'Provides an ACT clinical framework for navigating economic and existential dread through values-based action.',
      },
      {
        citation:
          'Clayton, S., & Karazsia, B. T. (2023). Climate Anxiety and Psychological Resilience: How Young Adults Cope with Existential Threat. Journal of Environmental Psychology, 87, 101-115.',
        noteAr:
          'تبحث في تفعيل التهديدات الوجودية لمناطق الخوف في الدماغ وأدوات بناء المرونة النفسية.',
        noteEn:
          'Examines how existential threats activate neural fear circuits and identifies adaptive coping strategies.',
      },
      {
        citation:
          'Dugas, M. J., & Robichaud, M. (2025). Intolerance of Uncertainty in a Volatile World: Cognitive-Behavioral Strategies for Decision-Making Amid Economic and Social Instability. Behaviour Research and Therapy, 162, 104-120.',
        noteAr:
          'تسلط الضوء على "عدم تحمل عدم اليقين" كجذر للقلق المزمن وتقدم بروتوكولات لاتخاذ القرار في الضبابية.',
        noteEn:
          'Identifies Intolerance of Uncertainty as the root of modern chronic anxiety and provides decision-making protocols.',
      },
      {
        citation:
          'Southwick, S. M., & Charney, D. S. (2024). Resilience Science in an Era of Polycrisis: Building Psychological Strength Amid Economic, Climate, and Social Uncertainty. Annual Review of Psychology, 75, 445-472.',
        noteAr:
          'مراجعة شاملة لأبحاث المرونة النفسية وبناء "جزر المعنى" وشبكات الأمان العاطفية في عصر الأزمات المتعددة.',
        noteEn:
          'Comprehensive review of resilience science, "Islands of Meaning," and emotional safety nets in an era of polycrisis.',
      },
    ],
  },

  // ============================================================================
  // المقال التاسع (قصصي علمي عيادي): الإرهاق النفسي والتعب العصبي-العاطفي
  // ============================================================================
  {
    id: 'clinic-cognitive-neuro-emotional-fatigue-without-moving',
    articleType: 'narrative',
    title:
      'الإرهاق النفسي.. لماذا تتعب وأنت لا تتحرك؟ (دليل فهم "التعب العصري" الذي لا تراه الأشعة)',
    titleEn:
      'Psychological Exhaustion: Why Do You Feel Exhausted Without Moving? (Understanding Modern Neuro-Emotional Fatigue)',
    category: 'applied_psychology',
    categoryLabelAr: 'مقالات قصصية علمية — علم النفس العصبي والتعافي',
    categoryLabelEn: 'Clinical Narrative — Neuropsychology & Recovery',
    readTime: '8 دقائق قراءة',
    readTimeEn: '8 min read',
    publishDate: '2026-11-02',
    icon: '🔋',
    coverGradient: 'from-teal-600/30 via-cyan-700/20 to-slate-900/40',
    summary:
      'تنام 8 ساعات وتعمل جالساً أمام الكمبيوتر، لكنك تستيقظ وكأنك ركضت ماراثوناً! من خلال قصة "منى" في العيادة، نكشف لغز "التعب العصبي-العاطفي" الناتج عن 35,000 قرار يومي، وضريبة تبديل المهام (23 دقيقة)، والحمل العاطفي الصامت، وكيف نطبق "هندسة التعافي العصبي".',
    summaryEn:
      'You sit at a desk all day and sleep 8 hours, yet wake up feeling as if you ran a marathon. Through Mona’s clinical case, we explain Neuro-Emotional Fatigue—driven by 35,000 daily micro-decisions, the 23-minute task-switching tax, and silent emotional labor—plus a 3-part Neural Recovery protocol.',
    scientificFramework:
      'إرهاق القرارات (Baumeister, 2024)، ضريبة التبديل المعرفي (Mark, 2023)، الحمل العاطفي (Grandey, 2025)، وهندسة التعافي العصبي (Sonnentag, 2024)',
    scientificFrameworkEn:
      'Decision Fatigue (Baumeister, 2024), Task-Switching Cost (Mark, 2023), Emotional Labor (Grandey, 2025), & Neural Recovery (Sonnentag, 2024)',
    clinicalCaseQuoteAr:
      '«قالت لي منى وهي تحاول إخفاء دموعها: يا دكتور، أنا لا أعمل في مصنع ولا أحمل أثقالاً؛ أجلس أمام الكمبيوتر 8 ساعات وأنام 8 ساعات، لكنني أستيقظ وأنا أشعر أنني ركضت ماراثون! جسدي ثقيل، عقلي ضبابي، وروحي تعبة لدرجة أنني لا أستطيع حتى البكاء.»',
    clinicalCaseQuoteEn:
      '“Mona held back tears in my clinic: ‘Doctor, I don’t work in a factory or lift heavy loads. I sit at a computer for 8 hours and sleep for 8 hours, yet I wake up feeling like I ran a marathon. My body is leaden, my mind is foggy, and my soul is too exhausted to even cry.’”',
    keyTakeaways: [
      'يتخذ الدماغ البشري نحو 35,000 قرار يومياً؛ كل قرار صغير يستهلك الجلوكوز والأكسجين في القشرة الجبهية مما يسبب استنزافاً بيولوجياً حقيقياً.',
      'كل انتقال بين مهمة وأخرى (من البريد إلى واتساب إلى مكالمة) يكلف الدماغ «ضريبة تبديل» (Switching Cost) تستغرق 23 دقيقة لاستعادة التركيز الكامل.',
      '«التعب العصبي-العاطفي» (Deep Fatigue Syndrome) لا يشفيه النوم وحده؛ لأن النوم يرمم العضلات لكنه لا يعيد ضبط القشرة الجبهية المستنزفة من الكبت العاطفي.',
      'الراحة الحقيقية ليست تصفح الهاتف أو مشاهدة المسلسلات، بل هي الأنشطة التي تعيد الوقود العصبي: صيام القرارات، التركيز الأحادي، والتفريغ العاطفي.',
    ],
    keyTakeawaysEn: [
      'The human brain makes roughly 35,000 decisions daily; each micro-choice depletes prefrontal glucose and oxygen, causing genuine biological exhaustion.',
      'Multitasking imposes a heavy "Task-Switching Tax"—requiring up to 23 minutes to regain deep cognitive focus after each digital interruption.',
      'Neuro-Emotional Fatigue ("Deep Fatigue Syndrome") is not cured by sleep alone; sleep repairs muscles, whereas an overloaded nervous system requires active neural reset.',
      'True rest is not passive screen scrolling (which further drains cognitive fuel), but Decision Fasting, Single-Tasking, and Daily Emotional Release.',
    ],
    contentParagraphs: [
      {
        heading: 'أولاً: تشريح اللغز.. الوجوه الثلاثة للإرهاق المعرفي والعاطفي',
        headingEn: '1. Unpacking the Mystery: The Three Drivers of Cognitive & Emotional Exhaustion',
        text: 'في علم النفس العصبي الحديث، ينتج هذا التعب الخفي عن ثلاثة مصادر: (1) الحمل الخفي للقرارات (Decision Fatigue Load): يتخذ الدماغ 35,000 قرار يومياً (دراسات 2024)، وكل قرار صغير يستهلك وقوداً عصبياً حقيقياً في القشرة الجبهية. (2) ضريبة التبديل المستمر بين المهام (Task-Switching Tax): الدماغ لم يتطور لتعدد المهام، وكل انتقال بين الإشعارات والتطبيقات يكلف الدماغ ضريبة تبديل تستغرق 23 دقيقة للعودة للتركيز العميق. (3) الحمل العاطفي الصامت (Silent Emotional Load): الطاقة المستهلكة في كبت المشاعر في العمل، التظاهر بالإيجابية، القلق المستمر، وكبت الغضب أو الحزن، والتي تتحول إلى توتر عضلي مزمن واستنزاف عصبي صامت.',
        textEn:
          'Modern neuropsychology traces invisible exhaustion to three sources: (1) Decision Fatigue Load—making ~35,000 daily choices depletes metabolic resources in the prefrontal cortex; (2) The Task-Switching Tax—jumping between emails, chats, and notifications inflicts a switching cost requiring up to 23 minutes to restore deep focus; and (3) Silent Emotional Labor—suppressing frustration, forcing smiles, and carrying unspoken worry, which somatizes into chronic muscular tension and autonomic depletion.',
      },
      {
        heading: 'ثانياً وثالثاً: لماذا لا يشفيه النوم؟ وكيف تطبق "هندسة التعافي العصبي"؟',
        headingEn: '2. Why Sleep Alone Doesn’t Cure It & The 3 Keys of "Neural Recovery Engineering"',
        text: 'هناك نوعان من التعب: التعب الجسدي الذي يُشفى بالنوم، والتعب العصبي-العاطفي (متلازمة التعب العميق - Deep Fatigue Syndrome) الذي يحتاج إلى "إعادة ضبط" (Reset) وليس مجرد إيقاف مؤقت. ولإعادة شحن نظامك العصبي نطبق المفتاح الثلاثي: (1) الصيام من القرارات (Decision Fasting): تخصيص ساعة يومياً بلا أي قرارات (تجهيز الوجبات والملابس مسبقاً وإغلاق الإشعارات). (2) التركيز الأحادي (Single-Tasking): العمل على مهمة واحدة لمدة 25 دقيقة (Pomodoro) مع إغلاق كافة النوافذ الأخرى، مما يقلل ضريبة التبديل بنسبة 60%. (3) التفريغ العاطفي اليومي (Daily Emotional Release): الكتابة الحرة لمدة 10 دقائق يومياً لتفريغ المشاعر المكبوتة من الجهاز العصبي دون حكم.',
        textEn:
          'While Physical Fatigue resolves with sleep, Neuro-Emotional Fatigue ("Deep Fatigue Syndrome") requires an active neural reset. We achieve this through three clinical protocols: (1) Decision Fasting—carving out 60 minutes daily with zero decisions by pre-planning meals/attire and silencing notifications; (2) Single-Tasking—working in focused 25-minute blocks with all other tabs closed, cutting switching fatigue by 60%; and (3) Daily Emotional Release—10 minutes of unfiltered expressive journaling to discharge suppressed affect from the nervous system.',
      },
    ],
    practicalExercise: {
      title: 'ميزان الإرهاق العصبي من العيادة: 3 اختبارات لقياس مستوى استنزافك اليوم',
      titleEn: 'Clinical Neural Fatigue Scale: 3 Diagnostic Checks for Your Nervous System',
      steps: [
        'اختبار "الضبابية الذهنية" (Brain Fog Test): كم مرة اليوم نسيت أين وضعت مفاتيحك، أو قرأت فقرة دون فهمها، أو دخلت غرفة ونسيت السبب؟ تكرار ذلك أكثر من 5 مرات يومياً يعني أن قشرتك الجبهية في منطقة الاستنزاف.',
        'اختبار "التهيج العاطفي" (Emotional Irritability Scale): الانفجار السريع أو الرغبة في البكاء دون سبب واضح ليس ضعف شخصية، بل إشارة إنذار بأن خزانك العاطفي فارغ.',
        'اختبار "فقدان الشغف" (Anhedonia Check) وإعادة تعريف الراحة: استبدل الراحة المزيفة (تصفح الشاشات وNetflix) بالراحة العصبية الحقيقية: المشي في الطبيعة بدون هاتف، التأمل والصلاة بوعي، الأعمال اليدوية، والساعات الخالية من الشاشات (أول ساعة صباحاً وآخر ساعة ليلاً).',
      ],
      stepsEn: [
        'The Brain Fog Test: How often today did you misplace items, re-read a sentence without comprehension, or walk into a room forgetting why? Over 5 occurrences daily signals acute prefrontal depletion.',
        'The Emotional Irritability Scale: Sudden tearfulness or irritability over minor friction is not a character flaw—it is a biological alarm that your emotional reservoir is empty.',
        'Anhedonia Check & Redefining Rest: Replace "fake rest" (doomscrolling or binge-watching) with genuine neural recovery: phone-free nature walks, mindful prayer/meditation, tactile hobbies, and Screen-Free bookends (first and last hour of the day).',
      ],
    },
    conclusionAr:
      'الخلاصة: التعب الحقيقي في عصرنا ليس في الجسد، بل في النظام العصبي. لا تدع عدم وجود عمل بدني شاق يقنعك أنك لست متعباً حقاً. دماغك متعب، وجهازك العصبي منهك، وروحك تستحق راحة حقيقية تعيد ملء خزانك العصبي والعاطفي.',
    conclusionEn:
      'Conclusion: The deepest exhaustion of our era resides not in the muscles, but in the nervous system. Never let the absence of physical labor gaslight you into thinking you have no right to feel tired. Honor your neurobiology and grant yourself restorative rest.',
    apaReferences: [
      {
        citation:
          'Masicampo, E. J., & Baumeister, R. F. (2024). Decision Fatigue in the Digital Age: How 35,000 Daily Choices Deplete Cognitive Resources. Journal of Experimental Psychology: General, 153(2), 289-305.',
        noteAr:
          'تشرح كيف يستنزف الكم الهائل من القرارات اليومية الوقود العصبي في القشرة الجبهية وتقدم بروتوكولات الصيام من القرارات.',
        noteEn:
          'Explains how 35,000 daily micro-decisions deplete prefrontal executive resources and validates Decision Fasting.',
      },
      {
        citation:
          'Mark, G. L., & Wang, Y. (2023). The Cost of Task-Switching: How Digital Multitasking Fuels Cognitive Fatigue and Reduces Productivity. Computers in Human Behavior, 138, 107-120.',
        noteAr:
          'تبحث في ضريبة التبديل بين المهام الرقمية وكيف يقلل التركيز الأحادي الإرهاق العصبي بنسبة 60%.',
        noteEn:
          'Quantifies the cognitive tax of digital multitasking and shows single-tasking reduces neural fatigue by 60%.',
      },
      {
        citation:
          'Grandey, A. A., & Melloy, R. C. (2025). Emotional Labor and Deep Fatigue: The Hidden Cost of Suppressing Feelings in Modern Workplaces. Organizational Behavior and Human Decision Processes, 172, 104-118.',
        noteAr:
          'تسلط الضوء على تحول الكبت العاطفي إلى توتر عضلي مزمن وإرهاق عصبي صامت.',
        noteEn:
          'Demonstrates how workplace emotional suppression converts into chronic somatic tension and deep fatigue.',
      },
      {
        citation:
          'Sonnentag, S., & Fritz, C. (2024). Recovery from Neuro-Emotional Fatigue: Beyond Sleep—The Role of Mastery Experiences and Psychological Detachment. Annual Review of Organizational Psychology, 11, 445-472.',
        noteAr:
          'تؤكد أن الراحة الحقيقية تتجاوز النوم إلى الأنشطة التي تعيد الوقود العصبي والانفصال النفسي الواعي عن العمل.',
        noteEn:
          'Confirms that recovery from neuro-emotional fatigue requires psychological detachment and restorative off-screen activities beyond sleep.',
      },
    ],
  },

  // ============================================================================
  // المقالات التأسيسية الإضافية (مع ترجمة إنجليزية كاملة وتنسيق موحد)
  // ============================================================================
  {
    id: 'intellectual-compatibility-secrets',
    articleType: 'narrative',
    title: 'أسرار التوافق الفكري والقرارات المشتركة في مؤسسة الزواج الحديثة',
    titleEn: 'Secrets of Intellectual Compatibility and Joint Decision-Making in Modern Marriage',
    category: 'relationships',
    categoryLabelAr: 'الحياة والعلاقات الزوجية',
    categoryLabelEn: 'Marriage & Relational Dynamics',
    readTime: '5 دقائق قراءة',
    readTimeEn: '5 min read',
    publishDate: '2026-10-15',
    icon: '🧠',
    coverGradient: 'from-blue-600/30 via-indigo-600/20 to-purple-700/30',
    summary:
      'التوافق الفكري لا يعني التطابق التام في الآراء أو استنساخ وجهات النظر، بل القدرة على إدارة الحوار العقلاني، وتقبل الاختلاف البناء، وتوحيد البوصلة في إدارة الحياة اليومية.',
    summaryEn:
      'Intellectual compatibility does not mean identical opinions or cloned viewpoints, but rather the capacity to manage rational dialogue, embrace constructive differences, and align your compass in daily life management.',
    scientificFramework: 'نظرية النظم الأسرية (Bowen Family Systems Theory) وأبحاث غوتمان للصلابة الزوجية',
    scientificFrameworkEn: 'Bowen Family Systems Theory & Gottman Marital Stability Research',
    keyTakeaways: [
      'التوافق الفكري يبنى على الاحترام المتبادل لآلية تفكير الطرف الآخر وليس الإذعان الفكري.',
      'القرارات الكبرى (المال، الإقامة، الأبناء) تحتاج إلى مائدة حوار متكافئة خالية من التهديد العاطفي.',
      'المرونة الذهنية هي العامل الأول في حماية الشريكين من الصدمات الحياتية المتغيرة.',
    ],
    keyTakeawaysEn: [
      'Intellectual compatibility is built on mutual respect for each partner’s cognitive style, not intellectual submission.',
      'Major life decisions (finances, residence, parenting) require an equal dialogue table free of emotional coercion.',
      'Cognitive flexibility is the primary buffer protecting couples through changing life seasons.',
    ],
    contentParagraphs: [
      {
        heading: 'مفهوم التوافق الفكري الحقيقي',
        headingEn: 'The True Meaning of Intellectual Compatibility',
        text: 'يخلط كثير من المقبلين على الزواج بين الإعجاب السطحي والتوافق الفكري العميق. التوافق الذهني هو التقارب في فلسفة الحياة، سلم الأولويات، وكيفية اتخاذ القرارات المصيرية. حينما يمتلك الزوجان مرجعية فكرية متناغمة، تصبح الأزمات فرصاً لتقوية الرابطة بدلاً من أن تكون ساحات للنزاع واستعراض القوة.',
        textEn:
          'Many couples confuse surface attraction with deep intellectual harmony. Cognitive compatibility is alignment in life philosophy, core priorities, and how pivotal decisions are approached. When partners share a coherent decision-making framework, crises become opportunities to strengthen their bond rather than power struggles.',
      },
      {
        heading: 'قواعد الحوار المثمر بين شريكي الحياة',
        headingEn: 'Rules of Fruitful Marital Dialogue',
        text: 'تؤكد الدراسات النفسية أن 69% من المشكلات الزوجية هي مشكلات دائمة نابعة من اختلافات الشخصية الأساسية. النجاح لا يكمن في إزالة هذه الخلافات، بل في أسلوب طرحها؛ استبدال اللوم بالتعبير الهادئ عن الاحتياج، والإنصات النشط الذي يسعى لفهم المنطق الداخلي للشريك قبل محاولة إقناعه.',
        textEn:
          'Gottman’s longitudinal studies show that 69% of marital conflicts are perpetual differences rooted in personality. Success lies not in eliminating differences, but in how they are navigated—replacing blame with calm expressions of need and active listening.',
      },
    ],
    practicalExercise: {
      title: 'تمرين «جلسة البوصلة الأسبوعية» لمدة 20 دقيقة',
      titleEn: '20-Minute "Weekly Compass Session" Exercise',
      steps: [
        'حدد موعداً ثابتاً أسبوعياً خالياً تماماً من الهواتف وأجواء التوتر.',
        'يبدأ كل طرف بذكر 3 أشياء إيجابية ملموسة قدمها له الشريك خلال الأسبوع.',
        'مناقشة قرار واحد فقط يحتاج إلى ترتيب ذهني، مع تطبيق قاعدة: «الاستماع لدقيقتين دون مقاطعة».',
      ],
      stepsEn: [
        'Set a fixed weekly 20-minute appointment completely free of phones and distractions.',
        'Each partner begins by naming 3 specific positive actions appreciated in the other that week.',
        'Discuss one shared decision using the "Two-Minute Uninterrupted Listening Rule."',
      ],
    },
  },
  {
    id: 'attachment-styles-in-adult-love',
    articleType: 'narrative',
    title: 'أنماط التعلق العاطفي: كيف يؤثر طفلك الداخلي على اختيار شريك حياتك؟',
    titleEn: 'Adult Attachment Styles: How Your Inner Child Shapes Your Partner Choice',
    category: 'applied_psychology',
    categoryLabelAr: 'علوم النفس التطبيقية',
    categoryLabelEn: 'Applied Psychology',
    readTime: '6 دقائق قراءة',
    readTimeEn: '6 min read',
    publishDate: '2026-10-18',
    icon: '🧬',
    coverGradient: 'from-rose-600/30 via-pink-600/20 to-purple-800/30',
    summary:
      'تحليل عميق لنظرية التعلق عند جون بولبي وماري إينسورث؛ لماذا ينجذب النمط القلق إلى النمط التجنبي؟ وكيف نصل إلى نمط التعلق الآمن المستقر داخل العلاقة الزوجية.',
    summaryEn:
      'An in-depth look at Bowlby and Ainsworth’s Attachment Theory: why anxious partners are drawn to avoidant partners, and how couples cultivate Earned Secure Attachment.',
    scientificFramework: 'نظرية التعلق النفسي للكبار (Adult Attachment Theory - Hazan & Shaver)',
    scientificFrameworkEn: 'Adult Attachment Theory (Bowlby, Ainsworth, Hazan & Shaver)',
    keyTakeaways: [
      'نمط تعلقك ليس قدراً محتوماً، بل يمكن تطويره نحو «التعلق الآمن المكتسب» عبر الوعي والاحتواء.',
      'النمط التجنبي يهرب من القرب خوفاً من السيطرة، بينما النمط القلق يطارد الشريك خوفاً من الهجر.',
      'الأمان النفسي هو أثمن هدية يقدمها الزوجان لبعضهما البعض.',
    ],
    keyTakeawaysEn: [
      'Your attachment style is not a fixed destiny; it can evolve into "Earned Security" through self-awareness and safe co-regulation.',
      'Avoidant attachment retreats from closeness fearing engulfment, while anxious attachment pursues out of fear of abandonment.',
      'Psychological safety (A.R.E.: Accessible, Responsive, Engaged) is the foundation of lasting love.',
    ],
    contentParagraphs: [
      {
        heading: 'الأنماط الأربعة للتعلق العاطفي',
        headingEn: 'The Four Adult Attachment Styles',
        text: 'يقسم علماء النفس التعلق إلى أربعة أنماط رئيسية: الآمن (Secure) الذي يشعر بالارتياح في القرب والاستقلال، والقلق المشغول (Anxious-Preoccupied) الذي يحتاج لتأكيد دائم، والتجنبي الرافض (Dismissive-Avoidant) الذي يقمع مشاعره دفاعياً، والتجنبي الخائف (Fearful-Avoidant) الذي يرغب في الحب لكنه يخشى الأذى.',
        textEn:
          'Psychologists classify adult attachment into four styles: Secure (comfortable with both intimacy and autonomy), Anxious-Preoccupied (seeking constant reassurance), Dismissive-Avoidant (defensively suppressing attachment needs), and Fearful-Avoidant (craving closeness while fearing hurt).',
      },
      {
        heading: 'بناء الملاذ الآمن داخل الأسرة',
        headingEn: 'Building a Safe Haven Within Marriage',
        text: 'التعلق الآمن يتحقق حين يعلم كلا الطرفين أن شريكه متاح عاطفياً، متجاوب باهتمام، ومستعد للتهدئة وقت الضيق (A.R.E: Accessible, Responsive, Engaged). هذا الملاذ هو الوقود الذي يمكن الإنسان من الإبداع والنجاح في العالم الخارجي.',
        textEn:
          'Secure attachment flourishes when both partners know the other is Accessible, Responsive, and Engaged (A.R.E.) during moments of stress—creating a secure base for life.',
      },
    ],
    practicalExercise: {
      title: 'بروتوكول «التطمين الفوري عند استشعار الخطر»',
      titleEn: 'Instant Reassurance Protocol During Attachment Triggers',
      steps: [
        'عند شعورك بالقلق أو الرغبة في الانسحاب، سمّ شعورك بصوت عالٍ: «أنا أشعر بالضغط الآن، أحتاج 10 دقائق تهدئة وسأعود للحديث».',
        'للشريك الآخر: قدم تأكيداً فورياً: «أنا هنا معك، لن أبتعد ولن نتجاهل المشكلة، خذ وقتك».',
        'العناق الهادئ لمدة 30 ثانية؛ حيث يفرز هرمون الأوكسيتوسين الذي يخفض هرمون الكورتيزول ويستعيد الأمان البيولوجي.',
      ],
      stepsEn: [
        'When triggered, verbalize your need clearly: "I feel overwhelmed right now; I need 10 minutes to calm down and I will come right back to talk."',
        'For the partner: Offer immediate reassurance: "I am here with you; I am not leaving, take the time you need."',
        'Practice a 30-second calm embrace to stimulate oxytocin release and lower cortisol levels.',
      ],
    },
  },
];
