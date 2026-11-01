// Comprehensive Certified Personality Assessments Data (MBTI 16-Personalities, Big Five OCEAN, Cattell 16PF, ECR-R Attachment)
// Fully bilingual (Arabic & English) with scientific scoring rubrics and ethical disclaimers.

export type PersonalityTestId = 'mbti_16types' | 'big_five_ocean' | 'cattell_16pf' | 'attachment_ecrr';

export interface PersonalityQuestion {
  id: number;
  dimension: string; // e.g., 'EI', 'SN', 'TF', 'JP' for MBTI; 'O', 'C', 'E', 'A', 'N' for Big Five
  textAr: string;
  textEn: string;
  positivePole: string; // Dimension rewarded by high score
  weight: number;
}

export interface PersonalityTestMeta {
  id: PersonalityTestId;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  scientificOriginAr: string;
  scientificOriginEn: string;
  badgeAr: string;
  badgeEn: string;
  badgeColor: string;
  estimatedMinutes: number;
  questionCount: number;
  iconName: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  dimensions: Array<{
    key: string;
    nameAr: string;
    nameEn: string;
    descriptionAr: string;
    descriptionEn: string;
    lowPoleAr: string;
    highPoleAr: string;
    lowPoleEn: string;
    highPoleEn: string;
  }>;
  questions: PersonalityQuestion[];
}

export const MBTI_ARCHETYPES_INFO: Record<
  string,
  {
    titleAr: string;
    titleEn: string;
    roleAr: string;
    roleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    strengthsAr: string[];
    strengthsEn: string[];
    relationalStyleAr: string;
    relationalStyleEn: string;
  }
> = {
  INTJ: {
    titleAr: 'المهندس المعماري الاستراتيجي',
    titleEn: 'The Strategic Architect',
    roleAr: 'المحللون الاستراتيجيون',
    roleEn: 'Analysts',
    descriptionAr: 'مفكر استراتيجي يمتلك خيالاً خصباً وإرادة فولاذية، يحب التخطيط بعيد المدى وبناء الأنظمة الفكرية المحكمة.',
    descriptionEn: 'A strategic thinker with a thirst for knowledge and high self-discipline, excelling in long-term visionary planning.',
    strengthsAr: ['تفكير استراتيجي مستقل', 'حل المشكلات المعقدة', 'إتقان التخطيط المستقبلي', 'معايير جودة عالية'],
    strengthsEn: ['Independent strategic thinking', 'Complex problem solving', 'High quality standards', 'Forward planning'],
    relationalStyleAr: 'يبحث عن العمق الفكري والشريك الواعي المستقل، ويفضل الحوارات العميقة على المجاملات العابرة.',
    relationalStyleEn: 'Values cognitive depth and mutual independence, prioritizing substantive discussions over superficiality.',
  },
  INTP: {
    titleAr: 'المفكر الفيلسوف المنطقي',
    titleEn: 'The Logical Thinker',
    roleAr: 'المحللون الاستراتيجيون',
    roleEn: 'Analysts',
    descriptionAr: 'عقل تحليلي مبتكر لا يتوقف عن استكشاف النظريات وتفكيك المسلمات المنطقية وفهم بنية الكون.',
    descriptionEn: 'An inventive analyst driven by curiosity, dissecting logical structures and theoretical models.',
    strengthsAr: ['براعة تحليلية متفردة', 'انفتاح ذهني واسع', 'أصالة الأفكار', 'موضوعية نقدية'],
    strengthsEn: ['Exceptional analytical skill', 'Intellectual open-mindedness', 'Conceptual originality', 'Objectivity'],
    relationalStyleAr: 'يتواصل عبر تبادل الأفكار والنظريات، ويحتاج إلى شريك يقدر مساحته التأملية واستقلاليته الفكرية.',
    relationalStyleEn: 'Connects through mental sparring, requiring a partner who respects their contemplative intellectual autonomy.',
  },
  ENTJ: {
    titleAr: 'القائد التنفيذي الحاسم',
    titleEn: 'The Executive Commander',
    roleAr: 'المحللون الاستراتيجيون',
    roleEn: 'Analysts',
    descriptionAr: 'قائد جريء وحاسم يحول الرؤى الكبرى إلى أهداف واقعية وخطط تنفيذية فعالة بحزم وكفاءة.',
    descriptionEn: 'A bold, decisive leader who transforms expansive visions into tangible execution with efficiency.',
    strengthsAr: ['قيادة تنظيمية حازمة', 'رؤية مستقبلية واضحة', 'كفاءة اتخاذ القرار', 'إرادة صلبة'],
    strengthsEn: ['Decisive leadership', 'Clear strategic vision', 'High decision efficacy', 'Resilient willpower'],
    relationalStyleAr: 'شريك محفز وواضح، يقدّر الطموح والمكاشفة الصريحة والنمو المشترك دون مواربة.',
    relationalStyleEn: 'An encouraging, candid partner who values mutual ambition, transparent dialogue, and proactive growth.',
  },
  ENTP: {
    titleAr: 'المحاور والمبتكر المرن',
    titleEn: 'The Innovative Visionary',
    roleAr: 'المحللون الاستراتيجيون',
    roleEn: 'Analysts',
    descriptionAr: 'مفكر فضولي سريع البديهة، يعشق السجال الفكري وتوليد الحلول المبتكرة من زوايا غير مألوفة.',
    descriptionEn: 'A quick-witted, curious thinker who thrives on mental debates and pioneering creative solutions.',
    strengthsAr: ['سرعة البديهة والابتكار', 'رؤية احتمالات متعددة', 'حيوية فكرية ملهمة', 'مرونة تكيف عالية'],
    strengthsEn: ['Intellectual agility', 'Spotting novel possibilities', 'Inspirational vitality', 'High adaptability'],
    relationalStyleAr: 'يجلب الإثارة الفكرية والتجدد الدائم، ويزدهر مع شريك يشاركه متعة النقاش وتحدي الروتين.',
    relationalStyleEn: 'Brings mental dynamism and novelty, flourishing with a partner who enjoys deep intellectual debate.',
  },
  INFJ: {
    titleAr: 'المستشار المحامي الملهم',
    titleEn: 'The Insightful Advocate',
    roleAr: 'الدبلوماسيون الإنسانيون',
    roleEn: 'Diplomats',
    descriptionAr: 'شخصية هادئة وبصيرة تمتلك قيماً إنسانية راسخة، تسعى لإحداث تأثير عميق وإيجابي في حياة الآخرين.',
    descriptionEn: 'A quiet, visionary soul guided by deeply held moral convictions and profound interpersonal empathy.',
    strengthsAr: ['بصيرة وجدانية نافذة', 'التزام أخلاقي عميق', 'إلهام هادئ', 'إخلاص ومسؤولية'],
    strengthsEn: ['Profound emotional insight', 'Deep ethical grounding', 'Inspiring quiet wisdom', 'Unwavering loyalty'],
    relationalStyleAr: 'يبحث عن التناغم الروحي الصادق، ويمنح شريكه أماناً وجدانياً استثنائياً وفهماً عميقاً للمشاعر.',
    relationalStyleEn: 'Seeks authentic soulful resonance, providing exceptional emotional safety and deep empathetic understanding.',
  },
  INFP: {
    titleAr: 'الوسيط المثالي الأصيل',
    titleEn: 'The Idealistic Mediator',
    roleAr: 'الدبلوماسيون الإنسانيون',
    roleEn: 'Diplomats',
    descriptionAr: 'شخصية حالمة وأصيلة تتمسك بقيمها وتدافع عن العدالة، وتبحث دائماً عن الجمال والخير في العالم.',
    descriptionEn: 'An authentic, poetic idealist driven by core values, championing compassion and individual uniqueness.',
    strengthsAr: ['أصالة المشاعر', 'تعاطف إنساني دافئ', 'إبداع فكري وأدبي', 'وفاء للقيم'],
    strengthsEn: ['Emotional authenticity', 'Warm human empathy', 'Creative expression', 'Loyalty to values'],
    relationalStyleAr: 'شريك متفانٍ ورومانسي يقدر البوح الصادق، ويحتاج إلى بيئة داعمة تفهم مشاعره المرهفة.',
    relationalStyleEn: 'A devoted, deeply romantic partner valuing vulnerable honesty and emotional gentleness.',
  },
  ENFJ: {
    titleAr: 'البطل الملهم والموجه',
    titleEn: 'The Charismatic Protagonist',
    roleAr: 'الدبلوماسيون الإنسانيون',
    roleEn: 'Diplomats',
    descriptionAr: 'قائد إنساني صاحب كاريزما دافئة، يمتلك قدرة فريدة على توحيد القلوب ودعم طاقات الآخرين وتطويرها.',
    descriptionEn: 'A charismatic, empathetic leader who inspires communities and nurtures the potential of others.',
    strengthsAr: ['كاريزما تواصلية دافئة', 'ذكاء اجتماعي متقدم', 'تحفيز الطاقات الكامنة', 'كرم العطاء الوجداني'],
    strengthsEn: ['Warm social charisma', 'Advanced emotional IQ', 'Empowering others', 'Generous emotional support'],
    relationalStyleAr: 'يستثمر بكل جوارحه في العلاقة، ويسعى دوماً لبناء بيئة مشتركة يسودها التفاهم والنمو المتبادل.',
    relationalStyleEn: 'Invests deeply in interpersonal harmony, actively fostering mutual growth and emotional flourishing.',
  },
  ENFP: {
    titleAr: 'المناضل الشغوف بالحرية',
    titleEn: 'The Passionate Campaigner',
    roleAr: 'الدبلوماسيون الإنسانيون',
    roleEn: 'Diplomats',
    descriptionAr: 'روح حرة مبدعة مليئة بالحماس والبهجة، تجد المعنى في الروابط الإنسانية العميقة واستكشاف الآفاق الجديدة.',
    descriptionEn: 'An enthusiastic, free-spirited explorer who finds deep meaning in authentic human connection.',
    strengthsAr: ['طاقة حيوية معدية', 'خيال إبداعي خصب', 'قدرة استثنائية على التواصل', 'عفوية صادقة'],
    strengthsEn: ['Infectious enthusiasm', 'Rich creative imagination', 'Exceptional interpersonal rapport', 'Sincere spontaneity'],
    relationalStyleAr: 'يملأ العلاقة بالمرح والتجدد والدفء، ويفضل الشريك المنفتح الذي يشاركه شغف التجربة والاستكشاف.',
    relationalStyleEn: 'Infuses relationships with joy and warmth, thriving with an open-minded partner who embraces spontaneous adventure.',
  },
  ISTJ: {
    titleAr: 'المفتش الواقعي الموثوق',
    titleEn: 'The Reliable Logistician',
    roleAr: 'الحراس والمنظمون',
    roleEn: 'Sentinels',
    descriptionAr: 'شخصية منظمة وواقعية تتمتع بأعلى درجات الالتزام والموثوقية، تحترم القواعد والعهود والواجبات.',
    descriptionEn: 'A pragmatic, detail-oriented pillar of reliability, upholding order, duty, and systematic integrity.',
    strengthsAr: ['إخلاص وأمانة متناهية', 'دقة وانضباط منهجي', 'ثبات تحت الضغوط', 'احترام الالتزامات'],
    strengthsEn: ['Uncompromising integrity', 'Methodical discipline', 'Composure under stress', 'Honoring commitments'],
    relationalStyleAr: 'سند متين يُعتمد عليه في كل الظروف، يعبر عن محبته بالأفعال العملية الصادقة وحماية أسرته.',
    relationalStyleEn: 'An unwavering rock of dependability who demonstrates love through practical support and stability.',
  },
  ISFJ: {
    titleAr: 'المدافع الحنون المخلص',
    titleEn: 'The Dedicated Defender',
    roleAr: 'الحراس والمنظمون',
    roleEn: 'Sentinels',
    descriptionAr: 'حامٍ دافئ وصبور، يتميز بحس عالٍ بالمسؤولية ورعاية مشاعر أحبائه بصمت وإخلاص نادر.',
    descriptionEn: 'A warm, patient guardian committed to protecting loved ones with devotion and steady grace.',
    strengthsAr: ['رعاية وجدانية دافئة', 'ذاكرة يقظة للتفاصيل الإنسانية', 'وفاء لا يتزعزع', 'صبر وتواضع'],
    strengthsEn: ['Gentle emotional care', 'Keen attentiveness to needs', 'Steadfast loyalty', 'Patience and humility'],
    relationalStyleAr: 'يصنع بيئة منزلية دافئة ومستقرة، ويمنح الأولوية دائماً لراحة شريكه وانسجام الأسرة.',
    relationalStyleEn: 'Creates a peaceful, nurturing domestic haven, prioritizing their partner’s comfort and wellbeing.',
  },
  ESTJ: {
    titleAr: 'المشرف التنفيذي الحريص',
    titleEn: 'The Organized Executive',
    roleAr: 'الحراس والمنظمون',
    roleEn: 'Sentinels',
    descriptionAr: 'شخصية قيادية عملية بارعة في تنظيم المشاريع وحفظ النظام والتقاليد وإدارة المسؤوليات بكفاءة.',
    descriptionEn: 'A principled organizer dedicated to upholding standards, structured order, and family responsibility.',
    strengthsAr: ['تنظيم هيكلي صارم', 'وضوح في التوجيه', 'كفاءة في إدارة الموارد', 'وفاء والتزام'],
    strengthsEn: ['Rigorous organization', 'Direct communication', 'Resource management', 'Dependable loyalty'],
    relationalStyleAr: 'شريك حاسم ومسؤول، يحمي استقرار البيت الأسري ويوفر الأمان المادي والتنظيمي لشريكه.',
    relationalStyleEn: 'A decisive, protective partner who secures practical stability and structured support for the family.',
  },
  ESFJ: {
    titleAr: 'القنصل الاجتماعي المعطاء',
    titleEn: 'The Supportive Consul',
    roleAr: 'الحراس والمنظمون',
    roleEn: 'Sentinels',
    descriptionAr: 'شخصية اجتماعية دافئة ومحبوبة، تكرس طاقاتها لخدمة مجتمعها وترسيخ الروابط الأسرية الوثيقة.',
    descriptionEn: 'A deeply social, caring harmony-seeker who dedicates energy to family warmth and community unity.',
    strengthsAr: ['ذكاء اجتماعي ودود', 'حساسية عالية لاحتياجات الآخرين', 'بناء التماسك الأسري', 'كرم الضيافة'],
    strengthsEn: ['Warm social grace', 'Keen empathy for others', 'Fostering family unity', 'Generous hospitality'],
    relationalStyleAr: 'يعتني بأدق التفاصيل لإسعاد شريكه، ويسعى دوماً لتجنيب البيت الخلافات وبث أجواء المودة.',
    relationalStyleEn: 'Attentive to every detail of emotional care, striving to maintain an affectionate, harmonious home.',
  },
  ISTP: {
    titleAr: 'الحرفي البارع المستقل',
    titleEn: 'The Master Virtuoso',
    roleAr: 'المستكشفون الميدانيون',
    roleEn: 'Explorers',
    descriptionAr: 'مستكشف واقعي هادئ وعملي، يمتلك مهارات استثنائية في تفكيك المشكلات وحلها بهدوء ومرونة.',
    descriptionEn: 'A calm, practical problem-solver who excels at deciphering complex mechanisms with pragmatic agility.',
    strengthsAr: ['حل المشكلات العملية ببراعة', 'هدوء تام في الأزمات', 'استقلالية وواقعية', 'مرونة تكيف'],
    strengthsEn: ['Pragmatic ingenuity', 'Cool composure in crisis', 'Self-reliance and grit', 'High adaptability'],
    relationalStyleAr: 'يقدر الحرية والمساحة الشخصية، ويعبر عن اهتمامه بالمساعدة العملية المباشرة بدلاً من الكلام.',
    relationalStyleEn: 'Values personal freedom and displays affection through tangible acts of assistance rather than overt words.',
  },
  ISFP: {
    titleAr: 'الفنان المرهف والجمالي',
    titleEn: 'The Gentle Adventurer',
    roleAr: 'المستكشفون الميدانيون',
    roleEn: 'Explorers',
    descriptionAr: 'فنان رقيق يعيش اللحظة الحاضرة بحس جمالي رفيع وروح متواضعة وعواطف نبيلة صادقة.',
    descriptionEn: 'A gentle, aesthetic soul living in the present with humble grace and deeply authentic emotion.',
    strengthsAr: ['ذائقة جمالية راقية', 'تسامح ولطف استثنائي', 'حس مرهف بالطبيعة', 'عفوية صادقة'],
    strengthsEn: ['Refined aesthetic taste', 'Exceptional tolerance and kindness', 'Attunement to nature', 'Sincere modesty'],
    relationalStyleAr: 'شريك حنون ومتفهم لا يفرض قيوداً، ويسعى للتعبير عن مشاعره بلطف وإيثار هادئ.',
    relationalStyleEn: 'A tender, non-judgmental partner who expresses love through quiet acts of thoughtfulness.',
  },
  ESTP: {
    titleAr: 'رائد الأعمال الميداني الجريء',
    titleEn: 'The Bold Entrepreneur',
    roleAr: 'المستكشفون الميدانيون',
    roleEn: 'Explorers',
    descriptionAr: 'شخصية حيوية وجريئة تعشق التحديات والمغامرة وتستجيب للفرص الميدانية بسرعة وذكاء.',
    descriptionEn: 'An energetic, bold thrill-seeker who thrives on real-time challenges, action, and dynamic social impact.',
    strengthsAr: ['شجاعة المبادرة والمواجهة', 'قراءة دقيقة للواقع الميداني', 'جاذبية اجتماعية تلقائية', 'تجاوب سريع'],
    strengthsEn: ['Courageous initiative', 'Sharp real-time perception', 'Magnetic spontaneous charm', 'Rapid reflexes'],
    relationalStyleAr: 'يبعث الحيوية والنشاط في حياة شريكه، ويفضل شريكاً واثقاً يشاركه الأنشطة والمغامرات.',
    relationalStyleEn: 'Brings exhilarating energy into relationships, flourishing with a confident partner who loves action.',
  },
  ESFP: {
    titleAr: 'المؤدي المبهج ونجم الحفل',
    titleEn: 'The Joyful Entertainer',
    roleAr: 'المستكشفون الميدانيون',
    roleEn: 'Explorers',
    descriptionAr: 'شخصية عفوية ومرحة تحب الحياة وتشارك البهجة مع الجميع، وتجعل كل يوم تجربة مميزة.',
    descriptionEn: 'A spontaneous, warm-hearted enthusiast who celebrates life, radiating joy and infectious generosity.',
    strengthsAr: ['بث الفرح والتفاؤل', 'عفوية وود دائم', 'كرم وسخاء وجداني', 'حضور لافت'],
    strengthsEn: ['Radiating infectious optimism', 'Warm spontaneity', 'Generous affection', 'Engaging presence'],
    relationalStyleAr: 'يغمر شريكه بالمودة والبهجة، ويحرص على أن تكون الحياة المشتركة مفعمة بالذكريات الجميلة.',
    relationalStyleEn: 'Showers their partner with affection and delight, ensuring shared life is filled with vibrant memories.',
  },
};

// MBTI Assessment Questions (Balanced for E/I, S/N, T/F, J/P)
export const MBTI_QUESTIONS: PersonalityQuestion[] = [
  {
    id: 1,
    dimension: 'EI',
    textAr: 'أشعر بالحيوية وتجدد طاقتي عند التواجد في تجمعات اجتماعية حوارية بدلاً من قضاء وقت طويل بمفردي.',
    textEn: 'I feel energized and recharged when interacting in social gatherings rather than spending quiet time alone.',
    positivePole: 'E',
    weight: 1,
  },
  {
    id: 2,
    dimension: 'SN',
    textAr: 'أفضل التركيز على الوقائع والبيانات العملية الملموسة بدلاً من الغوص في النظريات والاحتمالات المجردة.',
    textEn: 'I prefer focusing on tangible facts and realistic data rather than delving into abstract theories and speculation.',
    positivePole: 'S',
    weight: 1,
  },
  {
    id: 3,
    dimension: 'TF',
    textAr: 'عند اتخاذ القرارات المصيرية، أضع المنطق والموضوعية المجردة فوق الاعتبارات العاطفية ومشاعر الأطراف.',
    textEn: 'When making pivotal decisions, I prioritize objective logic and fairness over emotional considerations and feelings.',
    positivePole: 'T',
    weight: 1,
  },
  {
    id: 4,
    dimension: 'JP',
    textAr: 'أرتاح جداً بوجود جدول زمني منظم ومحدد مسبقاً لكل خطوة بدلاً من ترك الأمور للظروف والعفوية.',
    textEn: 'I feel most at ease with an organized, predefined schedule rather than leaving things open to spontaneous impulse.',
    positivePole: 'J',
    weight: 1,
  },
  {
    id: 5,
    dimension: 'EI',
    textAr: 'أميل إلى التعبير عن أفكاري ومشاركتها بصوت مسموع مع الآخرين أثناء معالجتها وتطويرها.',
    textEn: 'I tend to express and process my thoughts out loud with others while developing solutions.',
    positivePole: 'E',
    weight: 1,
  },
  {
    id: 6,
    dimension: 'SN',
    textAr: 'يستهويني استشراف المستقبل وقراءة ما بين السطور والبحث عن المعاني الكامنة خلف الظواهر.',
    textEn: 'I am naturally drawn to envisioning future patterns, reading between the lines, and seeking hidden metaphors.',
    positivePole: 'N',
    weight: 1,
  },
  {
    id: 7,
    dimension: 'TF',
    textAr: 'أهتم أولاً بالحفاظ على مشاعر الآخرين والانسجام الإنساني حتى لو تطلب ذلك تليين بعض الحقائق الجافة.',
    textEn: 'I prioritize preserving interpersonal harmony and empathetic connection, even if it requires softening blunt truths.',
    positivePole: 'F',
    weight: 1,
  },
  {
    id: 8,
    dimension: 'JP',
    textAr: 'أحب المرونة والخيارات المفتوحة وأستمتع بتغيير الخطط في اللحظة الأخيرة وفق متطلبات اللحظة.',
    textEn: 'I value flexibility and open options, feeling stimulated when adjusting plans spontaneously on the fly.',
    positivePole: 'P',
    weight: 1,
  },
  {
    id: 9,
    dimension: 'EI',
    textAr: 'بعد أسبوع عمل شاق، أفضّل قضاء عطلة نهاية الأسبوع في هدوء منزلي لقراءة كتاب أو ممارسة هواية شخصية.',
    textEn: 'After an intense work week, I prefer spending the weekend in solitary peace reading or pursuing personal hobbies.',
    positivePole: 'I',
    weight: 1,
  },
  {
    id: 10,
    dimension: 'SN',
    textAr: 'أعتمد في بناء آرائي على التجارب الواقعية السابقة والأدلة المحسوسة بدلاً من الحدس والتخمين.',
    textEn: 'I base my convictions on concrete historical experience and empirical evidence rather than gut instinct.',
    positivePole: 'S',
    weight: 1,
  },
  {
    id: 11,
    dimension: 'TF',
    textAr: 'في النقاشات، يسهل عليّ نقد الأفكار وتشريح نقاط الضعف المنطقية دون أن أقصد التجريح الشخصي.',
    textEn: 'In debates, I readily dissect logical inconsistencies and critique flawed premises without personal malice.',
    positivePole: 'T',
    weight: 1,
  },
  {
    id: 12,
    dimension: 'JP',
    textAr: 'أحرص على إنهاء المهام والواجبات وإغلاق الملفات قبل الموعد النهائي بوقت كافٍ لتجنب أي ضغط.',
    textEn: 'I ensure tasks and deadlines are finalized well ahead of time to avoid last-minute chaotic pressure.',
    positivePole: 'J',
    weight: 1,
  },
  {
    id: 13,
    dimension: 'EI',
    textAr: 'أجد سهولة كبيرة في بدء الحوار والتعرف على أشخاص جدد في المناسبات والمؤتمرات دون تردد.',
    textEn: 'I find it easy to initiate conversations and break the ice with new acquaintances at gatherings without hesitation.',
    positivePole: 'E',
    weight: 1,
  },
  {
    id: 14,
    dimension: 'SN',
    textAr: 'غالباً ما تخطر ببالي أفكار إبداعية وروابط مبتكرة بين مواضيع تبدو ظاهرياً غير متصلة.',
    textEn: 'I frequently generate novel connections and conceptual analogies between seemingly unrelated fields.',
    positivePole: 'N',
    weight: 1,
  },
  {
    id: 15,
    dimension: 'TF',
    textAr: 'أتأثر بعمق بمعاناة الآخرين وأعتبر التعاطف الوجداني معيار النجاح الأخلاقي الأول في أي مجتمع.',
    textEn: 'I am deeply moved by the emotional struggles of others, viewing compassion as the primary metric of moral integrity.',
    positivePole: 'F',
    weight: 1,
  },
  {
    id: 16,
    dimension: 'JP',
    textAr: 'أعمل بكفاءة وإبداع أعلى تحت وطأة المواعيد العاجلة وضغط اللحظات الأخيرة بدلاً من الروتين الصارم.',
    textEn: 'I work with heightened creativity and focus under impending deadlines rather than through strict rigid pacing.',
    positivePole: 'P',
    weight: 1,
  },
];

// Big Five (OCEAN) Assessment Questions
export const BIG_FIVE_QUESTIONS: PersonalityQuestion[] = [
  {
    id: 1,
    dimension: 'O',
    textAr: 'أمتلك فضولاً واسعاً لاستكشاف الفنون والثقافات الجديدة وخوض تجارب فكرية وفلسفية غير مألوفة.',
    textEn: 'I have intense intellectual curiosity to explore new arts, diverse cultures, and philosophical inquiries.',
    positivePole: 'O',
    weight: 1,
  },
  {
    id: 2,
    dimension: 'C',
    textAr: 'أحرص على الدقة العالية في مواعيدي وتنظيم شؤوني الشخصية بدقة متناهية وإنجاز واجباتي بأمانة.',
    textEn: 'I am meticulous regarding punctuality, personal organization, and carrying out duties conscientiously.',
    positivePole: 'C',
    weight: 1,
  },
  {
    id: 3,
    dimension: 'E',
    textAr: 'أحب التواجد في قلب الأحداث والتواصل الحيوي مع المحيطين بي وبث الحماس في الجلسات.',
    textEn: 'I naturally enjoy being at the center of social activity, radiating energy and engaging actively with groups.',
    positivePole: 'E',
    weight: 1,
  },
  {
    id: 4,
    dimension: 'A',
    textAr: 'أفترض حسن النية في الناس وأميل إلى التعاون والتسامح وتجنب الصراعات والخصومات قدر الإمكان.',
    textEn: 'I assume good intentions in others, naturally leaning towards cooperation, forgiveness, and conflict resolution.',
    positivePole: 'A',
    weight: 1,
  },
  {
    id: 5,
    dimension: 'N',
    textAr: 'أحتفظ بهدوء أعصابي واتزاني الانفعالي حتى في أوقات الأزمات والضغوط الحياتية المفاجئة.',
    textEn: 'I maintain emotional equilibrium and composed clarity even during unexpected crises and high-pressure moments.',
    positivePole: 'ES', // Emotional Stability (Low Neuroticism)
    weight: 1,
  },
  {
    id: 6,
    dimension: 'O',
    textAr: 'يستهويني تجديد الروتين اليومي وتجربة أساليب غير تقليدية في العمل والمعيشة والتفكير.',
    textEn: 'I love breaking repetitive routines and experimenting with non-conventional lifestyle and working methods.',
    positivePole: 'O',
    weight: 1,
  },
  {
    id: 7,
    dimension: 'C',
    textAr: 'أحدد أهدافي بوضوح وأمتلك قوة إرادة كافية للاستمرار حتى تحقيقها دون استسلام للمشتتات.',
    textEn: 'I define clear milestones and possess the disciplined grit required to accomplish them despite distractions.',
    positivePole: 'C',
    weight: 1,
  },
  {
    id: 8,
    dimension: 'E',
    textAr: 'أشعر بالراحة الكاملة عند التحدث أمام جمهور أو إدارة حوار جماعي دون تردد أو خجل.',
    textEn: 'I feel confident speaking in front of an audience or moderating group discussions without self-consciousness.',
    positivePole: 'E',
    weight: 1,
  },
  {
    id: 9,
    dimension: 'A',
    textAr: 'أجد سعادتي الحقيقية في مساعدة الآخرين ومساندتهم في ظروفهم الصعبة دون انتظار مقابل.',
    textEn: 'I derive genuine fulfillment from helping and supporting others during their difficult times altruistically.',
    positivePole: 'A',
    weight: 1,
  },
  {
    id: 10,
    dimension: 'N',
    textAr: 'نادراً ما أقع فريسة للقلق المفرط أو الأفكار السلبية المتكررة حول المستقبل.',
    textEn: 'I rarely succumb to chronic anxiety or catastrophic ruminations regarding the unknown future.',
    positivePole: 'ES',
    weight: 1,
  },
  {
    id: 11,
    dimension: 'O',
    textAr: 'أستمتع بتأمل الأفكار المجردة والمجازات الأدبية والمعاني الرمزية في الحياة والمواقف.',
    textEn: 'I deeply appreciate conceptual symbolism, poetic metaphors, and abstract philosophical meaning.',
    positivePole: 'O',
    weight: 1,
  },
  {
    id: 12,
    dimension: 'C',
    textAr: 'أفكر بعمق في عواقب قراراتي قبل اتخاذها وأتجنب التهور أو القرارات اللحظية غير المدروسة.',
    textEn: 'I weigh long-term ramifications thoroughly before acting, avoiding impulsive or uncalculated leaps.',
    positivePole: 'C',
    weight: 1,
  },
  {
    id: 13,
    dimension: 'E',
    textAr: 'أبادر تلقائياً بالترحيب بالغرباء وإشراك المنعزلين لضمان شعور الجميع بالاندماج.',
    textEn: 'I proactively welcome newcomers and engage reserved individuals to foster an inclusive social atmosphere.',
    positivePole: 'E',
    weight: 1,
  },
  {
    id: 14,
    dimension: 'A',
    textAr: 'أتقبل وجهات النظر المعارضة بصدر رحب وأحترم التنوع في الآراء دون تعصب أو عداء.',
    textEn: 'I welcome dissenting viewpoints with grace and respect ideological diversity without hostility.',
    positivePole: 'A',
    weight: 1,
  },
  {
    id: 15,
    dimension: 'N',
    textAr: 'أتعافى سريعاً من خيبات الأمل وأستعيد تفاؤلي وطاقتي الإيجابية بعد أي عثرة شخصية أو مهنية.',
    textEn: 'I bounce back rapidly from setbacks, swiftly reclaiming psychological resilience and forward optimism.',
    positivePole: 'ES',
    weight: 1,
  },
];

export const PERSONALITY_TESTS_CATALOG: PersonalityTestMeta[] = [
  {
    id: 'mbti_16types',
    titleAr: 'مؤشر مايرز-بريغز للأنماط الـ 16 (Myers-Briggs / MBTI)',
    titleEn: 'Myers-Briggs 16 Personality Types Indicator (MBTI)',
    subtitleAr: 'التقييم الأكثر شهرة عالمياً لتحديد النمط النفسي وطريقة الإدراك وصنع القرار والتواصل',
    subtitleEn: 'The world-renowned psychometric indicator for cognitive preferences and decision making',
    scientificOriginAr: 'كارل يونغ (1921) ومؤشر مايرز وبريغز (Myers & Briggs, 1944/1985)',
    scientificOriginEn: 'Carl G. Jung (1921) & Isabel Briggs Myers (1944/1985)',
    badgeAr: '16 نمطاً سيكولوجياً 🧠',
    badgeEn: '16 Archetypes 🧠',
    badgeColor: '#e11d48',
    estimatedMinutes: 6,
    questionCount: 16,
    iconName: 'Compass',
    shortDescriptionAr: 'استكشف نمطك النفسي عبر الأبعاد الأربعة: الانبساط مقابل الانطواء، الحس مقابل الحدس، التفكير مقابل المشاعر، والحكم مقابل الإدراك.',
    shortDescriptionEn: 'Discover your psychological archetype across 4 polar dimensions: E/I, S/N, T/F, and J/P.',
    dimensions: [
      {
        key: 'EI',
        nameAr: 'مصدر الطاقة الوجدانية',
        nameEn: 'Energy Orientation',
        descriptionAr: 'أين توجه طاقتك: نحو التفاعل الخارجي والناس أم نحو التأمل الداخلي والهدوء.',
        descriptionEn: 'How you channel energy: external social immersion vs internal reflective solitude.',
        lowPoleAr: 'انطواء (I)',
        highPoleAr: 'انبساط (E)',
        lowPoleEn: 'Introversion (I)',
        highPoleEn: 'Extraversion (E)',
      },
      {
        key: 'SN',
        nameAr: 'طريقة استيعاب المعلومات',
        nameEn: 'Information Processing',
        descriptionAr: 'كيف تدرك العالم: عبر الحقائق والوقائع الحسية الملموسة أم عبر الحدس والمعاني المجردة.',
        descriptionEn: 'How you perceive reality: tangible empirical facts vs abstract intuitive possibilities.',
        lowPoleAr: 'حسي (S)',
        highPoleAr: 'حدسي (N)',
        lowPoleEn: 'Sensing (S)',
        highPoleEn: 'Intuition (N)',
      },
      {
        key: 'TF',
        nameAr: 'منهجية اتخاذ القرار',
        nameEn: 'Decision Making',
        descriptionAr: 'كيف تزن الخيارات: بالمنطق والموضوعية المجردة أم بالتعاطف والقيم الإنسانية.',
        descriptionEn: 'How you evaluate choices: impersonal logic and objective criteria vs personal values and empathy.',
        lowPoleAr: 'تفكير (T)',
        highPoleAr: 'مشاعر (F)',
        lowPoleEn: 'Thinking (T)',
        highPoleEn: 'Feeling (F)',
      },
      {
        key: 'JP',
        nameAr: 'أسلوب تنظيم الحياة',
        nameEn: 'Lifestyle Orientation',
        descriptionAr: 'كيف تتعامل مع العالم الخارجي: بالتخطيط المنهجي الحاسم أم بالمرونة والعفوية.',
        descriptionEn: 'How you approach life: structured planning and decisiveness vs open-ended adaptability.',
        lowPoleAr: 'حكم (J)',
        highPoleAr: 'إدراك مرن (P)',
        lowPoleEn: 'Judging (J)',
        highPoleEn: 'Perceiving (P)',
      },
    ],
    questions: MBTI_QUESTIONS,
  },
  {
    id: 'big_five_ocean',
    titleAr: 'مقياس السمات الخمس الكبرى للشخصية (Big Five / OCEAN)',
    titleEn: 'Big Five Personality Traits Assessment (OCEAN)',
    subtitleAr: 'المعيار الذهبي الأكثر قبولاً ورصانة في الأوساط الأكاديمية والبحثية لعلم النفس الحديث',
    subtitleEn: 'The gold standard personality inventory in modern empirical academic research',
    scientificOriginAr: 'كوستا وماك كري (Costa & McCrae, 1992 - NEO-PI-R Standard)',
    scientificOriginEn: 'Paul Costa & Robert McCrae (1992 - NEO Personality Inventory)',
    badgeAr: 'المعيار الأكاديمي الذهبي 🌍',
    badgeEn: 'Empirical Gold Standard 🌍',
    badgeColor: '#8b5cf6',
    estimatedMinutes: 6,
    questionCount: 15,
    iconName: 'Brain',
    shortDescriptionAr: 'يقيس الأبعاد الخمسة الأساسية التي تحكم السلوك الإنساني: الانفتاح، الضمير، الانبساط، الوفاق، والاتزان الانفعالي.',
    shortDescriptionEn: 'Evaluates the five universal behavioral dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Emotional Stability.',
    dimensions: [
      {
        key: 'O',
        nameAr: 'الانفتاح على الخبرة (Openness)',
        nameEn: 'Openness to Experience',
        descriptionAr: 'مدى الفضول المعرفي والإبداع والتذوق الجمالي والاهتمام بالأفكار غير التقليدية.',
        descriptionEn: 'Intellectual curiosity, aesthetic sensitivity, and appetite for novel unconventional ideas.',
        lowPoleAr: 'تقليدي وواقعي',
        highPoleAr: 'مبتكر وفضولي',
        lowPoleEn: 'Traditional & Pragmatic',
        highPoleEn: 'Creative & Curious',
      },
      {
        key: 'C',
        nameAr: 'يقظة الضمير والانضباط (Conscientiousness)',
        nameEn: 'Conscientiousness',
        descriptionAr: 'درجة التنظيم الذاتي، الالتزام بالواجبات، دقة المواعيد، وضبط الدوافع والمشتتات.',
        descriptionEn: 'Self-discipline, methodical organization, diligence, and goal-directed persistence.',
        lowPoleAr: 'مرن وعفوي',
        highPoleAr: 'منضبط ودقيق',
        lowPoleEn: 'Spontaneous & Easygoing',
        highPoleEn: 'Disciplined & Methodical',
      },
      {
        key: 'E',
        nameAr: 'الانبساطية والاجتماعية (Extraversion)',
        nameEn: 'Extraversion',
        descriptionAr: 'مستوى الطاقة الاجتماعية، الرغبة في التفاعل، الحزم في التعبير، والميل للبهجة.',
        descriptionEn: 'Assertiveness, positive emotionality, enthusiasm, and desire for social stimulation.',
        lowPoleAr: 'هادئ ومتحفظ',
        highPoleAr: 'حيوي واجتماعي',
        lowPoleEn: 'Reserved & Quiet',
        highPoleEn: 'Outgoing & Energetic',
      },
      {
        key: 'A',
        nameAr: 'الوفاق والتعاون (Agreeableness)',
        nameEn: 'Agreeableness',
        descriptionAr: 'الميل لمساعدة الآخرين، التسامح، التعاطف، وتغليب الانسجام المشترك على الصدام.',
        descriptionEn: 'Altruism, empathy, trust, and natural predisposition towards interpersonal cooperation.',
        lowPoleAr: 'تنافسي وحازم',
        highPoleAr: 'متعاون ومتسامح',
        lowPoleEn: 'Competitive & Skeptical',
        highPoleEn: 'Compassionate & Trusting',
      },
      {
        key: 'N',
        nameAr: 'الاتزان الانفعالي (Emotional Stability)',
        nameEn: 'Emotional Stability',
        descriptionAr: 'القدرة على مواجهة الضغوط، الاتزان تحت الصدمات، وتجنب القلق المزمن وتذبذب المزاج.',
        descriptionEn: 'Resilience under acute stress, psychological steadiness, and freedom from chronic anxiety.',
        lowPoleAr: 'حساس ومرهف',
        highPoleAr: 'صلب وهادئ',
        lowPoleEn: 'Emotionally Sensitive',
        highPoleEn: 'Resilient & Composed',
      },
    ],
    questions: BIG_FIVE_QUESTIONS,
  },
];
