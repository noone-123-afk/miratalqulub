// Ultra-crisp, high-definition photorealistic portraits (8K Studio & Natural Editorial Quality)
// Focused on authentic fine facial features, regional geography, diverse age brackets (20s, 30s, 40s, 50s+),
// natural eye reflections, micro-skin textures, and cultural backgrounds.

export interface RealisticPortrait {
  url: string;
  ethnicityKey: string;
  gender: 'male' | 'female';
  ageRange: 'young_20s' | 'prime_30s' | 'mature_40s_50s';
  minAge: number;
  maxAge: number;
  vibe: string;
  caption: string;
  fineFacialFeatures: string;
}

export const REALISTIC_PORTRAITS: Record<string, { male: RealisticPortrait[]; female: RealisticPortrait[] }> = {
  // عربي خليجي (السعودية، الإمارات، الكويت، قطر، البحرين، عمان)
  gulf: {
    male: [
      {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'gulf',
        gender: 'male',
        ageRange: 'young_20s',
        minAge: 18,
        maxAge: 28,
        vibe: 'هيبة شبابية وأناقة خليجية عصرية',
        caption: 'ملامح خليجية شابة وأصيلة، نظرة واثقة ومريحة مع ابتسامة راقية',
        fineFacialFeatures: 'Warm olive-wheat Arabian complexion, expressive dark almond eyes with thick eyelashes, neatly groomed youthful beard, strong jawline',
      },
      {
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'gulf',
        gender: 'male',
        ageRange: 'prime_30s',
        minAge: 29,
        maxAge: 39,
        vibe: 'حكمة وطيبة تعكس نضجاً قيادياً في الثلاثينيات',
        caption: 'ملامح رجولية ناضجة ومتزنة ونظرات تفيض أماناً واحتواءً',
        fineFacialFeatures: 'Refined Gulf Arab cheekbones, deep warm brown eyes with subtle crow-feet laugh lines, dignified tailored beard, natural skin pores',
      },
      {
        url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'gulf',
        gender: 'male',
        ageRange: 'mature_40s_50s',
        minAge: 40,
        maxAge: 70,
        vibe: 'وقار رزين وكاريزما قيادية ناضجة',
        caption: 'حضور وقور يجمع بين الحكمة، الشهامة، والاتزان الفكري والأسري',
        fineFacialFeatures: 'Distinguished mature Arabian facial structure, salt-and-pepper beard touches, wise warm eyes with authentic character lines, noble demeanor',
      },
    ],
    female: [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'gulf',
        gender: 'female',
        ageRange: 'young_20s',
        minAge: 18,
        maxAge: 28,
        vibe: 'جمال خليجي شاب وعيون كحيلة لوزية',
        caption: 'عيون عربية واسعة تفيض ذكاءً وأصالة مع بشرة نضرة ووقار',
        fineFacialFeatures: 'Luminous warm honey-olive skin, large dark kohl-rimmed almond eyes, naturally arched eyebrows, soft graceful smile',
      },
      {
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'gulf',
        gender: 'female',
        ageRange: 'prime_30s',
        minAge: 29,
        maxAge: 39,
        vibe: 'أناقة ناضجة وابتسامة مريحة تلامس الروح',
        caption: 'حضور ملهم متزن يجمع بين الرقة والنضج الفكري والاجتماعي',
        fineFacialFeatures: 'Elegant thirty-something Arabian features, high cheekbones, radiant warm eyes, poised confident expression',
      },
      {
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'gulf',
        gender: 'female',
        ageRange: 'mature_40s_50s',
        minAge: 40,
        maxAge: 70,
        vibe: 'وقار راقٍ وحضور قيادي مفعم بالسكينة والحكمة',
        caption: 'ملامح أصيلة متناغمة تعكس النضج، الحكمة، والاحتواء الأسري الدافئ',
        fineFacialFeatures: 'Graceful mature Arabian woman, dignified warm gaze, subtle natural expression lines around kind eyes, refined elegance',
      },
    ],
  },

  // عربي شامي (الأردن، سوريا، لبنان، فلسطين)
  levantine: {
    male: [
      {
        url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'levantine',
        gender: 'male',
        ageRange: 'young_20s',
        minAge: 18,
        maxAge: 28,
        vibe: 'وسامة شامية شابة وعفوية فكرية ملهمة',
        caption: 'ملامح شامية جذابة، نظرة ذكية ومرحة مع حيوية واضحة',
        fineFacialFeatures: 'Fair-olive Mediterranean Levantine skin, hazel-brown expressive eyes, defined nose bridge, light stubble',
      },
      {
        url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'levantine',
        gender: 'male',
        ageRange: 'prime_30s',
        minAge: 29,
        maxAge: 39,
        vibe: 'رصانة وهدوء يبعث على الثقة التامة',
        caption: 'شخصية راقية ذات تطلعات طموحة ورعاية كريمة',
        fineFacialFeatures: 'Classic Levantine cheekbones, warm chestnut eyes, well-groomed beard, calm intellectual expression',
      },
      {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'levantine',
        gender: 'male',
        ageRange: 'mature_40s_50s',
        minAge: 40,
        maxAge: 70,
        vibe: 'هيبة شامية أصيلة ونضج فكري واجتماعي',
        caption: 'ملامح وقورة تعكس الخبرة الحياتية والدفء العائلي الأصيل',
        fineFacialFeatures: 'Mature Levantine gentleman, silver-touched temples, deep thoughtful eyes, natural skin texture with noble laugh lines',
      },
    ],
    female: [
      {
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'levantine',
        gender: 'female',
        ageRange: 'young_20s',
        minAge: 18,
        maxAge: 28,
        vibe: 'جمال شامي مشرق ومبهج',
        caption: 'ابتسامة دافئة تأسر القلوب وتفيض حيوية وثقة متوازنة',
        fineFacialFeatures: 'Fair Levantine complexion with rosy undertones, bright hazel-green eyes, soft wavy dark hair, radiant genuine smile',
      },
      {
        url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'levantine',
        gender: 'female',
        ageRange: 'prime_30s',
        minAge: 29,
        maxAge: 39,
        vibe: 'عيون زيتونية وملامح ناضجة آسرة',
        caption: 'طبيعية للغاية دون أي تكلف مع رقة وحسن منطق',
        fineFacialFeatures: 'Refined Mediterranean Levantine features, olive-hazel eyes, sculpted eyebrows, serene intelligent gaze',
      },
      {
        url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'levantine',
        gender: 'female',
        ageRange: 'mature_40s_50s',
        minAge: 40,
        maxAge: 70,
        vibe: 'رقي شامي أصيل وحكمة أنثوية دافئة',
        caption: 'حضور راقٍ يجمع بين الجمال الطبيعي الهادئ والنضج العاطفي',
        fineFacialFeatures: 'Graceful mature Levantine woman, warm expressive eyes, natural unretouched skin texture, dignified warm smile',
      },
    ],
  },

  // عربي مصري (مصر)
  egyptian: {
    male: [
      {
        url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'egyptian',
        gender: 'male',
        ageRange: 'young_20s',
        minAge: 18,
        maxAge: 28,
        vibe: 'شهامة وجدعنة مصرية أصيلة',
        caption: 'ملامح مصرية خمرية أصيلة، عينان تنطقان بالدفء وحسن العهد',
        fineFacialFeatures: 'Warm sun-kissed Egyptian bronze-wheat skin, deep dark soulful eyes, friendly genuine smile, short curly dark hair',
      },
      {
        url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'egyptian',
        gender: 'male',
        ageRange: 'prime_30s',
        minAge: 29,
        maxAge: 42,
        vibe: 'حضور مصري ناضج وابتسامة تملأ البيت بهجة',
        caption: 'شخصية محبوبة تجمع بين الطموح المهني والروح الإيجابية الدافئة',
        fineFacialFeatures: 'Authentic Nile Valley Egyptian facial structure, warm expressive brown eyes, neat beard, charismatic laugh lines',
      },
      {
        url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'egyptian',
        gender: 'male',
        ageRange: 'mature_40s_50s',
        minAge: 43,
        maxAge: 70,
        vibe: 'وقار مصري أصيل وحكمة أبوية مطمئنة',
        caption: 'شخصية يعتمد عليها، تبث الأمان وتتمتع برقي في التعامل وتفهم عميق',
        fineFacialFeatures: 'Distinguished mature Egyptian man, warm wheat complexion, wise kind eyes, distinguished silver-flecked beard',
      },
    ],
    female: [
      {
        url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'egyptian',
        gender: 'female',
        ageRange: 'young_20s',
        minAge: 18,
        maxAge: 28,
        vibe: 'طيبة وأصالة ودفء مصري مريح',
        caption: 'ملامح مصرية مألوفة تبعث في النفس شعور الأمان والاستقرار',
        fineFacialFeatures: 'Warm golden-wheat Egyptian skin, classic almond dark eyes, cheerful warm smile, natural facial harmony',
      },
      {
        url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'egyptian',
        gender: 'female',
        ageRange: 'prime_30s',
        minAge: 29,
        maxAge: 70,
        vibe: 'سحر مصري أصيل ونظرة ملهمة ذكية',
        caption: 'عيون لوزية كحيلة وبشرة قمحية دافئة تفيض رقياً وثقافة',
        fineFacialFeatures: 'Poised Egyptian woman, expressive dark almond eyes, warm wheat-bronze complexion, confident intellectual aura',
      },
    ],
  },

  // عربي مغاربي (المغرب، الجزائر، تونس، ليبيا)
  maghreb: {
    male: [
      {
        url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'maghreb',
        gender: 'male',
        ageRange: 'young_20s',
        minAge: 18,
        maxAge: 29,
        vibe: 'أناقة أطلسية وشخصية شابة جذابة',
        caption: 'ملامح شمال أفريقية مميزة، نظرة عميقة وهدوء ملفت',
        fineFacialFeatures: 'North African Maghrebi Amazigh-Arab features, olive-tan complexion, sharp cheekbones, deep expressive eyes',
      },
      {
        url: 'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'maghreb',
        gender: 'male',
        ageRange: 'prime_30s',
        minAge: 30,
        maxAge: 70,
        vibe: 'كاريزما متوسطية ناضجة وحضور لافت',
        caption: 'حضور قوي وملامح جذابة تجمع بين عمق الأصالة ورقي المعاصرة',
        fineFacialFeatures: 'Mature Maghrebi Mediterranean facial structure, warm olive skin, defined jawline, calm dignified gaze',
      },
    ],
    female: [
      {
        url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'maghreb',
        gender: 'female',
        ageRange: 'young_20s',
        minAge: 18,
        maxAge: 29,
        vibe: 'جمال أمازيغي عربي فتان وأصيل',
        caption: 'عيون عميقة ساحرة وبشرة برونزية نضرة تفيض نبالة وأصالة',
        fineFacialFeatures: 'Authentic Maghrebi Andalusian-Amazigh beauty, luminous olive-bronze skin, expressive dark eyes, graceful bone structure',
      },
      {
        url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'maghreb',
        gender: 'female',
        ageRange: 'prime_30s',
        minAge: 30,
        maxAge: 70,
        vibe: 'رقة وصفاء ملامح ناضجة تلامس الوجدان',
        caption: 'ملامح متناسقة صافية وابتسامة راقية تنشر السكينة',
        fineFacialFeatures: 'Refined North African woman, warm almond eyes, natural skin texture, serene compassionate expression',
      },
    ],
  },

  // نوبي / سوداني / أفريقي أسمر جذاب
  african_nubian: {
    male: [
      {
        url: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'african_nubian',
        gender: 'male',
        ageRange: 'young_20s',
        minAge: 18,
        maxAge: 29,
        vibe: 'كاريزما سمراء متوهجة وهيبة رجولية',
        caption: 'بشرة سمراء متوهجة وابتسامة بيضاء مشرقة تشع طاقة إيجابية',
        fineFacialFeatures: 'Rich deep Nubian-Sudanese melanin complexion, radiant warm smile, noble high cheekbones, kind expressive dark eyes',
      },
      {
        url: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'african_nubian',
        gender: 'male',
        ageRange: 'prime_30s',
        minAge: 30,
        maxAge: 70,
        vibe: 'شهامة نوبية سودانية وأصالة هادئة ناضجة',
        caption: 'نظرة قوية ومطمئنة، ملامح معبرة توحي بالنبل والوفاء',
        fineFacialFeatures: 'Distinguished mature Nubian-African features, rich dark skin texture with natural sheen, wise composed eyes, neatly trimmed beard',
      },
    ],
    female: [
      {
        url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'african_nubian',
        gender: 'female',
        ageRange: 'young_20s',
        minAge: 18,
        maxAge: 29,
        vibe: 'جمال نوبي مشرق وبشرة مخملية ناعمة',
        caption: 'سحر أسمر أخاذ، ابتسامة بهية وروح مفعمة بالحب والحنان',
        fineFacialFeatures: 'Velvety rich Nubian dark brown skin, luminous almond eyes,sculpted cheekbones, warm radiant smile',
      },
      {
        url: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'african_nubian',
        gender: 'female',
        ageRange: 'prime_30s',
        minAge: 30,
        maxAge: 70,
        vibe: 'أناقة فطرية وملامح ملكية ناضجة وراقية',
        caption: 'ملامح متناسقة رائعة تعكس الطيبة والبهجة والأناقة المترفة',
        fineFacialFeatures: 'Regal Nubian-Sudanese woman, poised facial symmetry, deep warm eyes, natural textured hair, dignified presence',
      },
    ],
  },

  // عراقي / رافديني
  iraqi: {
    male: [
      {
        url: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'iraqi',
        gender: 'male',
        ageRange: 'prime_30s',
        minAge: 18,
        maxAge: 70,
        vibe: 'رجولة وهيبة رافدينية أصيلة',
        caption: 'ملامح عراقية أصيلة، عيون دافئة تعكس الشهامة والوفاء العائلي',
        fineFacialFeatures: 'Authentic Mesopotamian Iraqi features, bold dark eyebrows, deep soulful brown eyes, strong jawline with full groomed beard',
      },
    ],
    female: [
      {
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'iraqi',
        gender: 'female',
        ageRange: 'prime_30s',
        minAge: 18,
        maxAge: 70,
        vibe: 'جمال بغدادي راقٍ وعيون كحيلة',
        caption: 'عيون كحيلة واسعة وابتسامة راقية تنطق بالوفاء وحسن المعشر',
        fineFacialFeatures: 'Classic Baghdadi Iraqi beauty, wide dark kohl eyes, warm wheat complexion, thick dark hair, gentle dignified smile',
      },
    ],
  },

  // قوقازي / أوروبي
  caucasian: {
    male: [
      {
        url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'caucasian',
        gender: 'male',
        ageRange: 'prime_30s',
        minAge: 18,
        maxAge: 70,
        vibe: 'ملامح كلاسيكية مشرقة وأناقة مهنية',
        caption: 'عيون معبرة وملامح هادئة راقية مع رصانة فكرية',
        fineFacialFeatures: 'Natural European Caucasian facial structure, fair skin with natural texture, expressive blue-hazel eyes, warm smile',
      },
    ],
    female: [
      {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'caucasian',
        gender: 'female',
        ageRange: 'prime_30s',
        minAge: 18,
        maxAge: 70,
        vibe: 'نعومة ونضارة طبيعية ساحرة',
        caption: 'ابتسامة مشرقة ونظرة ملهمة تعكس نضجاً ثقافياً',
        fineFacialFeatures: 'Natural Caucasian features, soft fair skin with subtle freckles, bright expressive eyes, genuine warm expression',
      },
    ],
  },

  // آسيوي / تركي / أوراسي
  asian_turkish: {
    male: [
      {
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'asian_turkish',
        gender: 'male',
        ageRange: 'prime_30s',
        minAge: 18,
        maxAge: 70,
        vibe: 'أناقة عصرية وجاذبية هادئة',
        caption: 'نظرة ودودة وملامح جذابة متوازنة ذات بعد فكري عميق',
        fineFacialFeatures: 'Anatolian Turkish-Eurasian features, high cheekbones, almond hazel-brown eyes, olive complexion, refined facial proportions',
      },
    ],
    female: [
      {
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=95',
        ethnicityKey: 'asian_turkish',
        gender: 'female',
        ageRange: 'prime_30s',
        minAge: 18,
        maxAge: 70,
        vibe: 'رقة وأناقة شرقية تفيض صفاءً',
        caption: 'ملامح متناغمة وابتسامة هادئة تعكس رقياً استثنائياً',
        fineFacialFeatures: 'Graceful Eurasian-Turkish facial features, luminous fair-olive skin, expressive almond eyes, poised natural elegance',
      },
    ],
  },
};

/**
 * Selects an age-appropriate, geographically & ethnically matched portrait
 */
export function getRealisticPortrait(
  ethnicity: string,
  gender: 'male' | 'female',
  userAge: number = 26,
  country: string = ''
): RealisticPortrait {
  let key = 'gulf';
  const norm = `${ethnicity} ${country}`.toLowerCase();

  if (
    norm.includes('خليج') ||
    norm.includes('سعود') ||
    norm.includes('إمارات') ||
    norm.includes('كويت') ||
    norm.includes('قطر') ||
    norm.includes('عمان') ||
    norm.includes('بحرين') ||
    norm.includes('يمن')
  ) {
    key = 'gulf';
  } else if (
    norm.includes('شام') ||
    norm.includes('لبنان') ||
    norm.includes('سور') ||
    norm.includes('أردن') ||
    norm.includes('فلسطين')
  ) {
    key = 'levantine';
  } else if (norm.includes('مصر')) {
    key = 'egyptian';
  } else if (
    norm.includes('مغرب') ||
    norm.includes('جزائر') ||
    norm.includes('تونس') ||
    norm.includes('ليبيا') ||
    norm.includes('موريتان')
  ) {
    key = 'maghreb';
  } else if (
    norm.includes('نوب') ||
    norm.includes('سودان') ||
    norm.includes('أفريق') ||
    norm.includes('أسمر') ||
    norm.includes('صومال')
  ) {
    key = 'african_nubian';
  } else if (norm.includes('عراق') || norm.includes('رافد')) {
    key = 'iraqi';
  } else if (norm.includes('أوروب') || norm.includes('قوقاز') || norm.includes('غرب')) {
    key = 'caucasian';
  } else if (norm.includes('ترك') || norm.includes('آسي') || norm.includes('أوراس')) {
    key = 'asian_turkish';
  }

  const category = REALISTIC_PORTRAITS[key] || REALISTIC_PORTRAITS['gulf'];
  const list = category[gender] || REALISTIC_PORTRAITS['gulf'][gender];

  // Filter by closest age bracket first
  const ageMatched = list.filter((p) => userAge >= p.minAge && userAge <= p.maxAge);
  if (ageMatched.length > 0) {
    return ageMatched[Math.floor(Math.random() * ageMatched.length)];
  }

  return list[Math.floor(Math.random() * list.length)];
}
