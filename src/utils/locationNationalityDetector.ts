export interface DetectedNationalityProfile {
  countryCode: string;
  countryNameAr: string;
  countryNameEn: string;
  nationalityAr: string;
  nationalityEn: string;
  ethnicityTag: string;
  flag: string;
  cityOrRegion?: string;
  timezone?: string;
  ethnicFacialTraitsPromptEn: string;
  ethnicFacialTraitsDescriptionAr: string;
  detectionSource: 'ip_And_timezone' | 'timezone_locale' | 'quiz_context' | 'manual';
  confidence: number;
  detectedAt: string;
}

interface CountryNationalityEntry {
  code: string;
  nameAr: string;
  nameEn: string;
  nationalityAr: string;
  nationalityEn: string;
  ethnicityTag: string;
  flag: string;
  timezones: string[];
  femalePromptEn: string;
  malePromptEn: string;
  traitsDescriptionAr: string;
}

export const NATIONALITY_DATABASE: Record<string, CountryNationalityEntry> = {
  SA: {
    code: 'SA',
    nameAr: 'المملكة العربية السعودية',
    nameEn: 'Saudi Arabia',
    nationalityAr: 'سعودي / خليجي',
    nationalityEn: 'Saudi Arabian (Khaleeji Arab)',
    ethnicityTag: 'عربي خليجي',
    flag: '🇸🇦',
    timezones: ['Asia/Riyadh'],
    femalePromptEn:
      'authentic Saudi Arabian Khaleeji woman, warm honey-olive Arabian complexion, large expressive dark almond kohl-rimmed eyes with thick natural eyelashes, well-defined arched eyebrows, symmetrical nose bridge, graceful modest contemporary Saudi elegance, natural unretouched human skin texture',
    malePromptEn:
      'authentic Saudi Arabian Khaleeji man, warm olive-bronze Arabian Peninsula complexion, deep expressive dark brown almond eyes, noble high cheekbones, strong jawline with neatly groomed traditional Saudi beard, wearing refined contemporary Saudi attire, natural skin pores',
    traitsDescriptionAr:
      'ملامح سعودية خليجية أصيلة: بشرة حنطية دافئة، عيون لوزية عربية واسعة وكحيلة، تقاسيم وجه متناسقة ووقورة تعكس الأصالة والهيبة الهادئة.',
  },
  AE: {
    code: 'AE',
    nameAr: 'الإمارات العربية المتحدة',
    nameEn: 'United Arab Emirates',
    nationalityAr: 'إماراتي / خليجي',
    nationalityEn: 'Emirati (Khaleeji Arab)',
    ethnicityTag: 'عربي خليجي',
    flag: '🇦🇪',
    timezones: ['Asia/Dubai'],
    femalePromptEn:
      'authentic Emirati Khaleeji Arab woman from UAE, luminous warm olive-honey skin tone, captivating dark almond eyes, defined eyebrows, poised contemporary Emirati grace, natural unretouched skin',
    malePromptEn:
      'authentic Emirati Khaleeji Arab man from UAE, warm bronze-olive complexion, expressive dark eyes, neatly tailored Emirati beard, dignified jawline and warm confident smile',
    traitsDescriptionAr:
      'ملامح إماراتية خليجية أصيلة: بشرة قمحية صافية، عيون عربية معبرة، وحضور يجمع بين الرقي العصري والوقار الأصيل.',
  },
  KW: {
    code: 'KW',
    nameAr: 'الكويت',
    nameEn: 'Kuwait',
    nationalityAr: 'كويتي / خليجي',
    nationalityEn: 'Kuwaiti (Khaleeji Arab)',
    ethnicityTag: 'عربي خليجي',
    flag: '🇰🇼',
    timezones: ['Asia/Kuwait'],
    femalePromptEn:
      'authentic Kuwaiti Arab woman, warm fair-olive Gulf complexion, expressive dark brown almond eyes, refined facial symmetry, modern Kuwaiti elegance, natural skin texture',
    malePromptEn:
      'authentic Kuwaiti Arab man, warm olive complexion, defined cheekbones, neat beard, expressive warm dark eyes, smart contemporary Gulf style',
    traitsDescriptionAr:
      'ملامح كويتية خليجية جذابة: تقاسيم عربية متزنة، نظرة واثقة وودودة، وأناقة عصرية راقية.',
  },
  QA: {
    code: 'QA',
    nameAr: 'قطر',
    nameEn: 'Qatar',
    nationalityAr: 'قطري / خليجي',
    nationalityEn: 'Qatari (Khaleeji Arab)',
    ethnicityTag: 'عربي خليجي',
    flag: '🇶🇦',
    timezones: ['Asia/Qatar'],
    femalePromptEn:
      'authentic Qatari Khaleeji woman, warm honey-olive skin, deep dark almond eyes, graceful Arabian bone structure, refined contemporary Qatari poise',
    malePromptEn:
      'authentic Qatari Khaleeji man, warm olive-bronze skin, noble Arabian facial structure, neatly groomed beard, calm dignified gaze',
    traitsDescriptionAr:
      'ملامح قطرية خليجية أصيلة: تقاسيم عربية نبيلة، عيون لوزية دافئة، وحضور وقور متزن.',
  },
  BH: {
    code: 'BH',
    nameAr: 'البحرين',
    nameEn: 'Bahrain',
    nationalityAr: 'بحريني / خليجي',
    nationalityEn: 'Bahraini (Khaleeji Arab)',
    ethnicityTag: 'عربي خليجي',
    flag: '🇧🇭',
    timezones: ['Asia/Bahrain'],
    femalePromptEn:
      'authentic Bahraini Arab woman, warm olive complexion, kind expressive almond eyes, soft natural smile, refined Gulf elegance',
    malePromptEn:
      'authentic Bahraini Arab man, warm wheat-olive complexion, friendly expressive dark eyes, neatly trimmed beard, poised demeanor',
    traitsDescriptionAr:
      'ملامح بحرينية خليجية دافئة: ابتسامة مريحة، عيون عربية صافية، وملامح تبعث على الألفة والسكينة.',
  },
  OM: {
    code: 'OM',
    nameAr: 'سلطنة عُمان',
    nameEn: 'Oman',
    nationalityAr: 'عُماني / خليجي',
    nationalityEn: 'Omani (Khaleeji Arab)',
    ethnicityTag: 'عربي خليجي',
    flag: '🇴🇲',
    timezones: ['Asia/Muscat'],
    femalePromptEn:
      'authentic Omani Arab woman, warm golden-olive complexion, serene expressive dark almond eyes, graceful symmetrical features, noble Omani elegance',
    malePromptEn:
      'authentic Omani Arab man, warm bronze-olive skin, kind wise dark eyes, neatly groomed beard, noble calm expression',
    traitsDescriptionAr:
      'ملامح عُمانية أصيلة: هدوء ووقار فطري، بشرة حنطية سمراء دافئة، ونظرات تفيض بالطيبة والسكينة.',
  },
  JO: {
    code: 'JO',
    nameAr: 'الأردن',
    nameEn: 'Jordan',
    nationalityAr: 'أردني / شامي',
    nationalityEn: 'Jordanian (Levantine Arab)',
    ethnicityTag: 'عربي شامي',
    flag: '🇯🇴',
    timezones: ['Asia/Amman'],
    femalePromptEn:
      'authentic Jordanian Levantine Arab woman from Amman, fair-wheat to warm olive Mediterranean complexion, captivating expressive chestnut-hazel almond eyes, sculpted eyebrows, natural dark brown hair, refined contemporary Jordanian elegance, realistic human skin texture',
    malePromptEn:
      'authentic Jordanian Levantine Arab man from Amman, warm wheat-olive complexion, sharp noble cheekbones, expressive dark brown or hazel eyes, neatly groomed Levantine beard, strong jawline, dignified charismatic presence, realistic skin pores',
    traitsDescriptionAr:
      'ملامح أردنية شامية أصيلة: بشرة قمحية مشرقة، عيون عسلية أو بنية عميقة، وتقاسيم وجه تجمع بين الشهامة والجاذبية الهادئة.',
  },
  PS: {
    code: 'PS',
    nameAr: 'فلسطين',
    nameEn: 'Palestine',
    nationalityAr: 'فلسطيني / شامي',
    nationalityEn: 'Palestinian (Levantine Arab)',
    ethnicityTag: 'عربي شامي',
    flag: '🇵🇸',
    timezones: ['Asia/Gaza', 'Asia/Hebron', 'Asia/Jerusalem'],
    femalePromptEn:
      'authentic Palestinian Levantine woman, fair-olive Mediterranean complexion, soulful hazel-brown or olive-green almond eyes, graceful facial harmony, warm resilient smile',
    malePromptEn:
      'authentic Palestinian Levantine man, fair-olive wheat skin, expressive warm hazel-brown eyes, classic straight nose bridge, neatly trimmed beard, noble expression',
    traitsDescriptionAr:
      'ملامح فلسطينية شامية أصيلة: بشرة قمحية صافية، عيون لوزية معبرة بلون عسلي أو زيتوني، وحضور دافئ مفعم بالأصالة.',
  },
  LB: {
    code: 'LB',
    nameAr: 'لبنان',
    nameEn: 'Lebanon',
    nationalityAr: 'لبناني / شامي',
    nationalityEn: 'Lebanese (Levantine Mediterranean)',
    ethnicityTag: 'عربي شامي',
    flag: '🇱🇧',
    timezones: ['Asia/Beirut'],
    femalePromptEn:
      'authentic Lebanese Mediterranean Levantine woman, luminous fair-olive skin, striking hazel-green or warm brown almond eyes, sculpted cheekbones, soft dark waves, effortless Beirut sophistication',
    malePromptEn:
      'authentic Lebanese Mediterranean Levantine man, fair-olive complexion, defined jawline, expressive hazel-brown eyes, well-groomed beard and hair, refined smart-casual elegance',
    traitsDescriptionAr:
      'ملامح لبنانية شامية متناسقة: بشرة فاتحة حنطية، عيون ملونة أو بنية جذابة، وأناقة متوسطية لافتة.',
  },
  SY: {
    code: 'SY',
    nameAr: 'سوريا',
    nameEn: 'Syria',
    nationalityAr: 'سوري / شامي',
    nationalityEn: 'Syrian (Levantine Arab)',
    ethnicityTag: 'عربي شامي',
    flag: '🇸🇾',
    timezones: ['Asia/Damascus'],
    femalePromptEn:
      'authentic Syrian Damascene Levantine woman, fair luminous complexion with warm undertones, expressive hazel-brown almond eyes, classic Levantine facial symmetry, gentle heartwarming smile',
    malePromptEn:
      'authentic Syrian Levantine man, fair-wheat olive complexion, warm chestnut eyes, classic straight nose bridge, neatly groomed beard, noble Damascene poise',
    traitsDescriptionAr:
      'ملامح سورية شامية أصيلة: بشرة صافية مشرقة، تقاسيم متناسقة هادئة، ونظرة دافئة تبعث على المودة والاحترام.',
  },
  EG: {
    code: 'EG',
    nameAr: 'مصر',
    nameEn: 'Egypt',
    nationalityAr: 'مصري / وادي النيل',
    nationalityEn: 'Egyptian (Nile Valley Arab)',
    ethnicityTag: 'عربي مصري',
    flag: '🇪🇬',
    timezones: ['Africa/Cairo'],
    femalePromptEn:
      'authentic Egyptian woman from Cairo, warm sun-kissed golden-wheat Nile Valley complexion, soulful dark almond eyes, naturally full eyebrows, radiant heartwarming smile, refined contemporary Egyptian elegance, natural skin texture',
    malePromptEn:
      'authentic Egyptian man from Cairo, warm bronze-wheat Nile Valley complexion, kind expressive dark brown eyes, charismatic genuine smile, neatly styled dark hair and trimmed beard, smart modern attire, realistic skin pores',
    traitsDescriptionAr:
      'ملامح مصرية أصيلة: بشرة قمحية خمرية دافئة، عيون واسعة تنطق بالطيبة والذكاء، وابتسامة مشرقة تبعث على الألفة والطمأنينة.',
  },
  IQ: {
    code: 'IQ',
    nameAr: 'العراق',
    nameEn: 'Iraq',
    nationalityAr: 'عراقي / رافديني',
    nationalityEn: 'Iraqi (Mesopotamian Arab)',
    ethnicityTag: 'عربي عراقي',
    flag: '🇮🇶',
    timezones: ['Asia/Baghdad'],
    femalePromptEn:
      'authentic Mesopotamian Iraqi woman from Baghdad, warm wheat-olive complexion, wide expressive dark kohl-rimmed eyes, thick defined eyebrows, poised Baghdadi grace, natural skin texture',
    malePromptEn:
      'authentic Mesopotamian Iraqi man from Baghdad, warm olive complexion, bold dark eyebrows, deep soulful brown eyes, strong jawline with full neatly groomed beard, noble Iraqi presence',
    traitsDescriptionAr:
      'ملامح عراقية رافدينية أصيلة: عيون واسعة كحيلة، حواجب مرسومة، وبشرة حنطية دافئة تعكس الشهامة والهيبة البغدادية.',
  },
  MA: {
    code: 'MA',
    nameAr: 'المغرب',
    nameEn: 'Morocco',
    nationalityAr: 'مغربي / مغاربي',
    nationalityEn: 'Moroccan (Maghrebi Arab-Amazigh)',
    ethnicityTag: 'عربي مغاربي',
    flag: '🇲🇦',
    timezones: ['Africa/Casablanca'],
    femalePromptEn:
      'authentic Moroccan Maghrebi Arab-Amazigh woman, warm Mediterranean olive-bronze complexion, striking deep dark almond eyes, high sculpted cheekbones, graceful Andalusian-Maghrebi facial symmetry, natural skin texture',
    malePromptEn:
      'authentic Moroccan Maghrebi Arab-Amazigh man, olive-tan Mediterranean complexion, sharp defined cheekbones, deep thoughtful dark eyes, neat facial hair, refined Moroccan elegance',
    traitsDescriptionAr:
      'ملامح مغربية أطلسية أصيلة: تقاسيم عربية أمازيغية جذابة، عيون لوزية عميقة، وبشرة حنطية برونزية نضرة.',
  },
  DZ: {
    code: 'DZ',
    nameAr: 'الجزائر',
    nameEn: 'Algeria',
    nationalityAr: 'جزائري / مغاربي',
    nationalityEn: 'Algerian (Maghrebi Arab-Amazigh)',
    ethnicityTag: 'عربي مغاربي',
    flag: '🇩🇿',
    timezones: ['Africa/Algiers'],
    femalePromptEn:
      'authentic Algerian Maghrebi woman, fair-olive Mediterranean complexion, expressive almond eyes, noble high cheekbones, poised Algerian grace',
    malePromptEn:
      'authentic Algerian Maghrebi man, warm olive Mediterranean complexion, strong jawline, expressive dark brown eyes, neatly trimmed beard, dignified presence',
    traitsDescriptionAr:
      'ملامح جزائرية مغاربية أصيلة: تقاسيم متوسطية واضحة، نظرة واثقة وعميقة، وحضور يجمع بين الهيبة والوقار.',
  },
  TN: {
    code: 'TN',
    nameAr: 'تونس',
    nameEn: 'Tunisia',
    nationalityAr: 'تونسي / مغاربي',
    nationalityEn: 'Tunisian (Mediterranean Maghrebi)',
    ethnicityTag: 'عربي مغاربي',
    flag: '🇹🇳',
    timezones: ['Africa/Tunis'],
    femalePromptEn:
      'authentic Tunisian Mediterranean woman, luminous olive complexion, warm expressive hazel-brown eyes, soft natural waves, refined Carthage Mediterranean elegance',
    malePromptEn:
      'authentic Tunisian Mediterranean man, warm olive skin, expressive dark eyes, well-groomed beard, calm intellectual demeanor',
    traitsDescriptionAr:
      'ملامح تونسية متوسطية راقية: بشرة قمحية صافية، تقاسيم هادئة متناسقة، وابتسامة تفيض باللطف والثقافة.',
  },
  LY: {
    code: 'LY',
    nameAr: 'ليبيا',
    nameEn: 'Libya',
    nationalityAr: 'ليبي / مغاربي',
    nationalityEn: 'Libyan (North African Arab)',
    ethnicityTag: 'عربي مغاربي',
    flag: '🇱🇾',
    timezones: ['Africa/Tripoli'],
    femalePromptEn:
      'authentic Libyan North African Arab woman, warm wheat-olive complexion, expressive dark almond eyes, dignified modest grace',
    malePromptEn:
      'authentic Libyan North African Arab man, warm bronze-olive complexion, noble facial bone structure, neatly trimmed beard, warm trustworthy gaze',
    traitsDescriptionAr:
      'ملامح ليبية عربية أصيلة: تقاسيم واضحة ووقورة، بشرة سمراء قمحية دافئة، ونظرة تعكس الكرم والأصالة.',
  },
  SD: {
    code: 'SD',
    nameAr: 'السودان',
    nameEn: 'Sudan',
    nationalityAr: 'سوداني / نوبي وادي النيل',
    nationalityEn: 'Sudanese (Nubian Nile Valley)',
    ethnicityTag: 'نوبي / أفريقي أسمر',
    flag: '🇸🇩',
    timezones: ['Africa/Khartoum'],
    femalePromptEn:
      'authentic Sudanese Nubian woman, rich velvety dark melanin complexion with warm golden subsurface scattering, luminous expressive almond eyes, noble high cheekbones, radiant graceful smile, natural skin texture',
    malePromptEn:
      'authentic Sudanese Nubian man, rich deep bronze-ebony melanin skin with natural texture, noble symmetrical bone structure, warm compassionate dark eyes, dignified charismatic smile',
    traitsDescriptionAr:
      'ملامح سودانية نوبية أصيلة: بشرة سمراء مخملية متوهجة، تقاسيم نبيلة متناسقة، وابتسامة صافية تبعث على السكينة والطيبة.',
  },
  YE: {
    code: 'YE',
    nameAr: 'اليمن',
    nameEn: 'Yemen',
    nationalityAr: 'يمني / عربي أصيل',
    nationalityEn: 'Yemeni (South Arabian)',
    ethnicityTag: 'عربي أصيل',
    flag: '🇾🇪',
    timezones: ['Asia/Aden'],
    femalePromptEn:
      'authentic Yemeni Arabian woman, warm honey-bronze skin, large striking dark kohl-rimmed almond eyes, sculpted eyebrows, timeless Arabian beauty',
    malePromptEn:
      'authentic Yemeni Arabian man, warm bronze-olive complexion, deep expressive dark almond eyes, sharp noble cheekbones, neatly groomed beard',
    traitsDescriptionAr:
      'ملامح يمنية عربية عريقة: عيون عربية واسعة وكحيلة، تقاسيم أصيلة دقيقة، وبشرة حنطية دافئة.',
  },
  TR: {
    code: 'TR',
    nameAr: 'تركيا',
    nameEn: 'Turkey',
    nationalityAr: 'تركي / أوراسي',
    nationalityEn: 'Turkish (Anatolian Eurasian)',
    ethnicityTag: 'تركي / أوراسي',
    flag: '🇹🇷',
    timezones: ['Europe/Istanbul'],
    femalePromptEn:
      'authentic Turkish Anatolian Eurasian woman, fair-olive luminous complexion, high cheekbones, expressive almond hazel eyes, graceful natural beauty',
    malePromptEn:
      'authentic Turkish Anatolian Eurasian man, olive complexion, defined high cheekbones, warm hazel-brown eyes, refined modern style',
    traitsDescriptionAr:
      'ملامح تركية أوراسية متناسقة: بشرة فاتحة حنطية، وجنتان بارزتان، وعيون لوزية عسلية معبرة.',
  },
};

const TIMEZONE_TO_COUNTRY_CODE: Record<string, string> = {
  'Asia/Riyadh': 'SA',
  'Asia/Dubai': 'AE',
  'Asia/Muscat': 'OM',
  'Asia/Kuwait': 'KW',
  'Asia/Qatar': 'QA',
  'Asia/Bahrain': 'BH',
  'Asia/Amman': 'JO',
  'Asia/Jerusalem': 'PS',
  'Asia/Gaza': 'PS',
  'Asia/Hebron': 'PS',
  'Asia/Beirut': 'LB',
  'Asia/Damascus': 'SY',
  'Africa/Cairo': 'EG',
  'Asia/Baghdad': 'IQ',
  'Africa/Casablanca': 'MA',
  'Africa/El_Aaiun': 'MA',
  'Africa/Algiers': 'DZ',
  'Africa/Tunis': 'TN',
  'Africa/Tripoli': 'LY',
  'Africa/Khartoum': 'SD',
  'Asia/Aden': 'YE',
  'Europe/Istanbul': 'TR',
};

/**
 * Resolves a CountryNationalityEntry from a country code or Arabic country name
 */
export function getNationalityEntryByCountry(
  countryCodeOrName?: string,
  partnerGender: 'male' | 'female' = 'female'
): DetectedNationalityProfile {
  const raw = (countryCodeOrName || '').trim();
  const upper = raw.toUpperCase();

  let matched: CountryNationalityEntry | undefined = NATIONALITY_DATABASE[upper];

  if (!matched && raw) {
    matched = Object.values(NATIONALITY_DATABASE).find(
      (entry) =>
        entry.nameAr === raw ||
        raw.includes(entry.nameAr) ||
        entry.nameAr.includes(raw) ||
        entry.nameEn.toLowerCase() === raw.toLowerCase()
    );
  }

  if (!matched) {
    matched = NATIONALITY_DATABASE.SA;
  }

  return {
    countryCode: matched.code,
    countryNameAr: matched.nameAr,
    countryNameEn: matched.nameEn,
    nationalityAr: matched.nationalityAr,
    nationalityEn: matched.nationalityEn,
    ethnicityTag: matched.ethnicityTag,
    flag: matched.flag,
    ethnicFacialTraitsPromptEn:
      partnerGender === 'female' ? matched.femalePromptEn : matched.malePromptEn,
    ethnicFacialTraitsDescriptionAr: matched.traitsDescriptionAr,
    detectionSource: 'manual',
    confidence: 95,
    detectedAt: new Date().toISOString(),
  };
}

/**
 * Client-side synchronous detection using Browser Timezone (Intl) + Navigator Locale (BCP-47)
 */
export function detectFromBrowserEnvironment(
  partnerGender: 'male' | 'female' = 'female'
): DetectedNationalityProfile | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const tzCode = TIMEZONE_TO_COUNTRY_CODE[tz];

    if (tzCode && NATIONALITY_DATABASE[tzCode]) {
      const entry = NATIONALITY_DATABASE[tzCode];
      return {
        countryCode: entry.code,
        countryNameAr: entry.nameAr,
        countryNameEn: entry.nameEn,
        nationalityAr: entry.nationalityAr,
        nationalityEn: entry.nationalityEn,
        ethnicityTag: entry.ethnicityTag,
        flag: entry.flag,
        cityOrRegion: tz.split('/')[1]?.replace(/_/g, ' ') || tz,
        timezone: tz,
        ethnicFacialTraitsPromptEn:
          partnerGender === 'female' ? entry.femalePromptEn : entry.malePromptEn,
        ethnicFacialTraitsDescriptionAr: entry.traitsDescriptionAr,
        detectionSource: 'timezone_locale',
        confidence: 96,
        detectedAt: new Date().toISOString(),
      };
    }

    // Check navigator.languages for regional tag like ar-SA, ar-JO, ar-EG, ar-AE, ar-MA
    const langs =
      typeof navigator !== 'undefined'
        ? [...(navigator.languages || []), navigator.language || '']
        : [];
    for (const loc of langs) {
      const parts = loc.replace('_', '-').split('-');
      if (parts.length >= 2) {
        const regionCode = parts[1].toUpperCase();
        if (NATIONALITY_DATABASE[regionCode]) {
          const entry = NATIONALITY_DATABASE[regionCode];
          return {
            countryCode: entry.code,
            countryNameAr: entry.nameAr,
            countryNameEn: entry.nameEn,
            nationalityAr: entry.nationalityAr,
            nationalityEn: entry.nationalityEn,
            ethnicityTag: entry.ethnicityTag,
            flag: entry.flag,
            timezone: tz || undefined,
            ethnicFacialTraitsPromptEn:
              partnerGender === 'female' ? entry.femalePromptEn : entry.malePromptEn,
            ethnicFacialTraitsDescriptionAr: entry.traitsDescriptionAr,
            detectionSource: 'timezone_locale',
            confidence: 90,
            detectedAt: new Date().toISOString(),
          };
        }
      }
    }
  } catch {
    // ignore
  }
  return null;
}

/**
 * Refines the ethnic facial traits prompt based on the user's quiz answers
 * while keeping the detected nationality as the primary anthropological anchor.
 */
export function refineEthnicPromptWithQuizAnswers(
  detected: DetectedNationalityProfile,
  answers: Record<number, string>,
  partnerGender: 'male' | 'female' = 'female'
): DetectedNationalityProfile {
  const answerCount = Object.keys(answers || {}).length;
  if (answerCount === 0) return detected;

  const entry =
    NATIONALITY_DATABASE[detected.countryCode] ||
    Object.values(NATIONALITY_DATABASE).find((e) => e.nameAr === detected.countryNameAr) ||
    NATIONALITY_DATABASE.SA;

  const basePrompt = partnerGender === 'female' ? entry.femalePromptEn : entry.malePromptEn;

  // Extract subtle personality expression & styling nuances from quiz answers
  const stylingCues: string[] = [];
  if (answers[1] === '1a' || answers[3] === '3a') {
    stylingCues.push('intelligent poised gaze reflecting analytical depth and calm wisdom');
  } else if (answers[1] === '1b') {
    stylingCues.push('warm spontaneous genuine smile with bright expressive eyes');
  }

  if (answers[2] === '2b') {
    stylingCues.push('authentic traditional-leaning cultural elegance rooted in family warmth');
  } else if (answers[2] === '2c') {
    stylingCues.push('refined modern executive aesthetic with culturally authentic poise');
  }

  const extraCue = stylingCues.length > 0 ? `, ${stylingCues.join(', ')}` : '';

  return {
    ...detected,
    ethnicFacialTraitsPromptEn: `${basePrompt}${extraCue}`,
    confidence: Math.min(99, detected.confidence + Math.min(3, Math.floor(answerCount / 3))),
  };
}

/**
 * Full async detector that queries `/api/detect-location` and merges with browser timezone/locale
 * and quiz answer signals.
 */
export async function detectUserLocationAndNationality(options?: {
  partnerGender?: 'male' | 'female';
  fallbackCountry?: string;
  answers?: Record<number, string>;
}): Promise<DetectedNationalityProfile> {
  const partnerGender = options?.partnerGender || 'female';
  const browserDetected = detectFromBrowserEnvironment(partnerGender);

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = typeof navigator !== 'undefined' ? navigator.language || '' : '';
    const res = await fetch(
      `/api/detect-location?tz=${encodeURIComponent(tz)}&lang=${encodeURIComponent(lang)}&gender=${partnerGender}`
    );
    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.detected) {
        const serverProfile: DetectedNationalityProfile = json.detected;
        // If browser timezone explicitly resolved to a specific Arab country, prefer the more specific match
        const finalBase =
          browserDetected && serverProfile.detectionSource !== 'ip_And_timezone'
            ? browserDetected
            : serverProfile;

        return refineEthnicPromptWithQuizAnswers(
          finalBase,
          options?.answers || {},
          partnerGender
        );
      }
    }
  } catch {
    // Fallback to client-side detection
  }

  const resolved =
    browserDetected || getNationalityEntryByCountry(options?.fallbackCountry, partnerGender);

  return refineEthnicPromptWithQuizAnswers(resolved, options?.answers || {}, partnerGender);
}
