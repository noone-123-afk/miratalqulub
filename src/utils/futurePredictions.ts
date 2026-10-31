import { FutureHorizonPrediction, UserProfile, PartnerAnalysisResult } from '../types';

export function generateFuturePredictions(
  profile: UserProfile,
  result?: PartnerAnalysisResult | null
): FutureHorizonPrediction[] {
  const partnerName =
    result?.proposedPartnerName ||
    (profile.partnerGender === 'female' ? 'نـورة' : 'فيـصل');
  const country = profile.country || 'المملكة العربية السعودية';
  const ethnicity = profile.ethnicity || 'عربي خليجي';
  const baseScore = result?.compatibilityScore || 85;

  return [
    {
      years: 1,
      labelAr: 'بعد سنة واحدة',
      badgeAr: 'التناغم وتأسيس البيت',
      themeTitleAr: `السنة الأولى: بناء العش الدافئ وتناغم التفاصيل اليومية مع ${partnerName}`,
      summaryAr: `تشهد سنتكما الأولى اكتمال مرحلة التناغم العفوي؛ حيث يتحول بيتكما في (${country}) إلى واحة سكينة تعبق برائحة القهوة والهدوء، مع تأسيس تقاليدكما الخاصة والضحكات التي تملأ زوايا المنزل كل مساء.`,
      aiProbability: Math.min(96, Math.max(65, Math.round(baseScore * 0.98))),
      goldenKeyAr: 'المصارحة اللطيفة في نهاية كل يوم، والاحتفال بالإنجازات الصغيرة المشتركة.',
      symbolicImages: [
        {
          url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=85',
          captionAr: 'دفء الصباح وبداية الأيام السعيدة في بيتكما',
          tagAr: '🏡 البيت والسكينة',
        },
        {
          url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=85',
          captionAr: 'التناغم والانسجام الروحي في أولى محطات العمر',
          tagAr: '💖 كيمياء المشاعر',
        },
      ],
      pillars: [
        {
          category: 'home',
          icon: '🏡',
          titleAr: 'البيئة المعيشية وتأسيس المنزل',
          descriptionAr: `اختيار أثاث يجمع بين الطراز العصري الأنيق واللمسات التراثية الأصيلة التي تميز بيئة (${country})، مع ركن مخصص لجلسات القراءة وشاي المساء.`,
          highlightAr: 'مملكة خاصة يسودها الهدوء والأمان النفسي.',
        },
        {
          category: 'romance',
          icon: '💖',
          titleAr: 'التجدد العاطفي والانسجام',
          descriptionAr: `اكتشاف كل منكما لطباع الآخر بعين المحبة والتقدير، مع التفاهم التلقائي حول أوقات الراحة وطرق التعبير عن الامتنان والاهتمام.`,
          highlightAr: 'لغة تفاهم بالعيون تفوق الكلمات.',
        },
        {
          category: 'travel',
          icon: '✈️',
          titleAr: 'أول رحلة استكشافية مشتركة',
          descriptionAr: `سفرة هادئة لشاطئ بحري خلاب أو وجهة جبلية ساحرة لقضاء لحظات لا تُنسى في مستهل الحياة الزوجية.`,
          highlightAr: 'رحلة الشكر وصناعة أول ألبوم ذكريات.',
        },
      ],
    },
    {
      years: 3,
      labelAr: 'بعد 3 سنوات',
      badgeAr: 'النضج والتوسع المشترك',
      themeTitleAr: `السنوات الثلاث: رسوخ الشراكة الحياتية ونماء الأهداف الطموحة`,
      summaryAr: `تكون العلاقة قد بلغت قمة النضج؛ تتكامل الرؤى المهنية والمالية، وتتضح خطط التوسع الأسري بخطى واثقة تجمع بين الحكمة والاستقرار في ظل انسجام عادات (${ethnicity}).`,
      aiProbability: Math.min(94, Math.max(62, Math.round(baseScore * 0.94))),
      goldenKeyAr: 'دعم الطموح الأكاديمي والمهني للطرف الآخر واعتباره نجاحاً مشتركاً للبيت.',
      symbolicImages: [
        {
          url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=85',
          captionAr: 'التخطيط الذكي وبناء المشاريع المستقبلية معاً',
          tagAr: '💼 الشراكة والنجاح',
        },
        {
          url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
          captionAr: 'إجازات استجمام ملهمة تجدد طاقة الحب والحياة',
          tagAr: '🌊 تجدد المشاعر',
        },
      ],
      pillars: [
        {
          category: 'career',
          icon: '💼',
          titleAr: 'القفزة المهنية والمالية',
          descriptionAr: `تحقيق ترقية نوعية أو تأسيس استثمار عائلي ذكي يوفر دخلاً إضافياً ويعزز الأمان المالي المستقبلي للأسرة.`,
          highlightAr: 'شراكة اقتصادية واعية قائمة على الشورى والبركة.',
        },
        {
          category: 'family',
          icon: '👶',
          titleAr: 'الاستعداد للمرحلة الأسرية',
          descriptionAr: `اتفاق تام وناضج حول الاستعداد لاستقبال الأطفال، مع تجهيز بيئة متكاملة تضمن الرعاية الفائقة والتربية السوية.`,
          highlightAr: 'تطلعات أسرية مباركة تصنع البهجة.',
        },
        {
          category: 'home',
          icon: '🌿',
          titleAr: 'تطوير المسكن والحديقة',
          descriptionAr: `إضافة لمسات نباتية وحديقة منزلية صغيرة أو شرفة متسعة تكون متنفساً طبيعياً لعطلات نهاية الأسبوع.`,
          highlightAr: 'أجواء خضراء تعزز السكينة والطمأنينة.',
        },
      ],
    },
    {
      years: 5,
      labelAr: 'بعد 5 سنوات',
      badgeAr: 'الاستقرار التام والعائلة السعيدة',
      themeTitleAr: `خمس سنوات من النور: البيت الملك، ضحكات الأبناء، والرسوخ التام مع ${partnerName}`,
      summaryAr: `المحطة الفارقة الكبرى التي تنبأ بها التحليل! بعد 5 سنوات، يكتمل مشهد الأحلام: أطفال يملؤون البيت بهجة وضحكات بريئة، بيت ملكي مستقر ومصمم بذوقكما، واستقرار مالي ونفسي يجعل بيتكما مضرب المثل في البر والمودة بين كل الأقارب.`,
      aiProbability: Math.min(91, Math.max(58, Math.round(baseScore * 0.90))),
      goldenKeyAr: 'تخصيص موعد أسبوعي خاص بكما بمفردكما للحفاظ على وهج الرومانسية مهما كثرت مسؤوليات الأطفال.',
      symbolicImages: [
        {
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85',
          captionAr: 'البيت الملكي المستقر.. تحقيق حلم السكن والأمان',
          tagAr: '🏡 البيت المستقر',
        },
        {
          url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=85',
          captionAr: 'ضحكات الأبناء والترابط الأسري النبيل والمبهج',
          tagAr: '👶 دفء العائلة والأبناء',
        },
        {
          url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=85',
          captionAr: 'رحلة عائلية سنوية كبرى تخلد أجمل ذكريات العمر',
          tagAr: '✈️ مغامرات لا تُنسى',
        },
      ],
      pillars: [
        {
          category: 'family',
          icon: '👶',
          titleAr: 'الأبناء وتربية الأجيال الصالحة',
          descriptionAr: `أطفال ينشؤون في كنف والدين متحابين؛ يشهدون الصدق والرحمة والاحترام في كل يوم، ويتعلمون الأخلاق النبيلة وتفوق التعليم المبكر.`,
          highlightAr: 'بناء أسرة صالحة وقوية ترفع الرأس وتسر الخاطر.',
        },
        {
          category: 'home',
          icon: '🏰',
          titleAr: 'امتلاك البيت المثالي',
          descriptionAr: `الانتقال إلى بيت العمر أو فيلا رحبة تملكها العائلة؛ تتوفر فيها غرف مبهجة للأطفال ومجلس أنيق لاستقبال الأهل والضيوف بكل فخر.`,
          highlightAr: 'استقرار عقاري ونفسي يمنح الأسرة جذوراً راسخة.',
        },
        {
          category: 'career',
          icon: '📈',
          titleAr: 'الحرية المالية وتنوع الاستثمارات',
          descriptionAr: `الوصول إلى مرحلة الراحة المالية والادخار المدروس؛ حيث تسير الالتزامات بسلاسة وتتوفر ميزانية مريحة للسفر السنوي والتعليم النوعي.`,
          highlightAr: 'أمان واستقلال مالي يحمي مستقبل البيت.',
        },
        {
          category: 'romance',
          icon: '🌹',
          titleAr: 'عمق الارتباط وتجدد العهد',
          descriptionAr: `نظرة فخر متبادلة في عيني ${partnerName} وعينيك؛ استذكار البدايات والقول بابتسامة: «الحمد لله، لقد بنينا معاً كل ما حلمنا به وزيادة».`,
          highlightAr: 'حب ناضج يتجاوز بريق البدايات إلى قداسة العهد.',
        },
      ],
    },
    {
      years: 10,
      labelAr: 'بعد 10 سنوات',
      badgeAr: 'القدوة الملهمة والسكينة الدائمة',
      themeTitleAr: `عقد من الوفاء: ثمار التضحيات، وقار الحكمة، والأثر المبارك في المجتمع`,
      summaryAr: `بعد مرور عقد كامل، يتحول زواجكما إلى قصة نجاح إنسانية ملهمة لكل العائلة والمجتمع. أبناء متفوقون ومؤدبون، بيت يفيض بالبركة والكرم، وشراكة روحية لا تهزها عواصف الحياة بل تزيدها ثباتاً ورسوخاً.`,
      aiProbability: Math.min(88, Math.max(55, Math.round(baseScore * 0.86))),
      goldenKeyAr: 'الشكر المستمر لله، والتطوع والصدقة المشتركة كشكر عملي على نعمة التوفيق والاستقرار.',
      symbolicImages: [
        {
          url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=85',
          captionAr: 'السكينة والوقار وجني ثمار الحب المخلص عبر السنين',
          tagAr: '👑 قمة السكينة والوفاق',
        },
        {
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85',
          captionAr: 'القدوة الأسرية المباركة والاحتفال بالذكرى العاشرة',
          tagAr: '🌟 قدوة ملهمة',
        },
      ],
      pillars: [
        {
          category: 'family',
          icon: '🎓',
          titleAr: 'تفوق الأبناء وبواكير إنجازاتهم',
          descriptionAr: `أبناء يتمتعون بشخصيات قيادية وأخلاق رفيعة، يحصدون التكريم الدراسي والرياضي، ويبرون بوالديهم في كل مناسبة.`,
          highlightAr: 'ثمار تربية واعية تعكس حب الوالدين وانسجامهما.',
        },
        {
          category: 'romance',
          icon: '🕊️',
          titleAr: 'سكينة الروح والاطمئنان الأبدي',
          descriptionAr: `سلام داخلي تام؛ كل تفصيلة في حياة الشريكين أصبحت كتاباً مفتوحاً ومحط تقدير وإجلال متبادل لا يحتاج إلى عناء لإثباته.`,
          highlightAr: 'صفاء الأرواح التي تعاهدت بصدق ووفّت بالعهد.',
        },
        {
          category: 'travel',
          icon: '🕋',
          titleAr: 'رحلة العمر الروحانية والاحتفالية',
          descriptionAr: `أداء مناسك الحج أو العمرة معاً شكراً لله على هذا التوفيق، تليها رحلة استثنائية حول العالم احتفاءً بالعقد الأول السعيد.`,
          highlightAr: 'تتويج مبارك لعشر سنوات من المودة والرحمة.',
        },
      ],
    },
  ];
}
