import arBundle from './ar.json';
import enBundle from './en.json';

export type SupportedLanguage = 'ar' | 'en';
export type TextDirection = 'rtl' | 'ltr';

export interface LanguageMetadata {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  dir: TextDirection;
  isRTL: boolean;
  locale: string;
  flag: string;
  fontFamily: string;
}

export interface TailwindDirectionClasses {
  dirClass: string;
  textAlignClass: string;
  oppositeTextAlignClass: string;
  fontClass: string;
  headingFontClass: string;
  flexRowClass: string;
  containerClass: string;
}

export interface LocaleBundle {
  meta: {
    code: SupportedLanguage;
    name: string;
    nativeName: string;
    dir: TextDirection;
    isRTL: boolean;
    locale: string;
    flag: string;
    fontFamily: string;
  };
  ui: Record<string, string>;
  psychometrics: {
    tiers: Record<string, { title: string; subtitle: string; duration: string }>;
    constructs: Record<string, { title: string; reference: string }>;
    subscales: Record<string, string>;
    comparisonAxes: Record<string, string>;
    compatibilityIndices: Record<string, string>;
  };
  phrases: Record<string, string>;
}

export const arLocale = arBundle as unknown as LocaleBundle;
export const enLocale = enBundle as unknown as LocaleBundle;

export const LOCALE_BUNDLES: Record<SupportedLanguage, LocaleBundle> = {
  ar: arLocale,
  en: enLocale,
};

export const LANGUAGE_REGISTRY: Record<SupportedLanguage, LanguageMetadata> = {
  ar: {
    code: 'ar',
    name: arLocale.meta.name,
    nativeName: arLocale.meta.nativeName,
    dir: 'rtl',
    isRTL: true,
    locale: arLocale.meta.locale,
    flag: arLocale.meta.flag,
    fontFamily: arLocale.meta.fontFamily,
  },
  en: {
    code: 'en',
    name: enLocale.meta.name,
    nativeName: enLocale.meta.nativeName,
    dir: 'ltr',
    isRTL: false,
    locale: enLocale.meta.locale,
    flag: enLocale.meta.flag,
    fontFamily: enLocale.meta.fontFamily,
  },
};

export const SUPPORTED_LANGUAGES: LanguageMetadata[] = Object.values(LANGUAGE_REGISTRY);

export function getLanguageMetadata(lang: SupportedLanguage): LanguageMetadata {
  return LANGUAGE_REGISTRY[lang] || LANGUAGE_REGISTRY.ar;
}

export function getLanguageDirection(lang: SupportedLanguage): TextDirection {
  return getLanguageMetadata(lang).dir;
}

export function getTailwindLayoutClasses(lang: SupportedLanguage): TailwindDirectionClasses {
  const isRTL = lang === 'ar';
  return {
    dirClass: isRTL ? 'dir-rtl' : 'dir-ltr',
    textAlignClass: isRTL ? 'text-right' : 'text-left',
    oppositeTextAlignClass: isRTL ? 'text-left' : 'text-right',
    fontClass: isRTL
      ? "font-['Alexandria','Tajawal',system-ui,sans-serif]"
      : 'font-sans',
    headingFontClass: isRTL ? "font-['Alexandria']" : 'font-sans tracking-tight',
    flexRowClass: isRTL ? 'flex-row' : 'flex-row',
    containerClass: isRTL
      ? "dir-rtl text-right font-['Alexandria','Tajawal',system-ui,sans-serif]"
      : 'dir-ltr text-left font-sans',
  };
}

export interface Translations {
  [key: string]: {
    ar: string;
    en: string;
    [locale: string]: string;
  };
}

function buildTranslationsDictionary(): Translations {
  const dict: Translations = {};
  const allKeys = new Set<string>([
    ...Object.keys(arLocale.ui || {}),
    ...Object.keys(enLocale.ui || {}),
  ]);

  for (const key of allKeys) {
    dict[key] = {
      ar: arLocale.ui[key] || enLocale.ui[key] || key,
      en: enLocale.ui[key] || arLocale.ui[key] || key,
    };
  }
  return dict;
}

function buildDynamicPhraseMap(): Record<string, string> {
  const map: Record<string, string> = {};

  // 1. Direct phrases from en.json (keyed by Arabic source phrase -> English psychometric translation)
  if (enLocale.phrases) {
    for (const [arPhrase, enPhrase] of Object.entries(enLocale.phrases)) {
      map[arPhrase] = enPhrase;
    }
  }

  // 2. Map all UI keys from ar.json -> en.json so any Arabic UI string is also dynamically translatable
  for (const key of Object.keys(arLocale.ui || {})) {
    const arVal = arLocale.ui[key];
    const enVal = enLocale.ui[key];
    if (arVal && enVal && arVal !== enVal && !map[arVal]) {
      map[arVal] = enVal;
    }
  }

  // 3. Map structured psychometric tiers, constructs, subscales, comparison axes, and compatibility indices
  const arPsy = arLocale.psychometrics;
  const enPsy = enLocale.psychometrics;

  if (arPsy && enPsy) {
    for (const tierKey of Object.keys(arPsy.tiers || {})) {
      const arTier = arPsy.tiers[tierKey];
      const enTier = enPsy.tiers?.[tierKey];
      if (arTier && enTier) {
        map[arTier.title] = enTier.title;
        map[arTier.subtitle] = enTier.subtitle;
        map[arTier.duration] = enTier.duration;
      }
    }

    for (const cKey of Object.keys(arPsy.constructs || {})) {
      const arCon = arPsy.constructs[cKey];
      const enCon = enPsy.constructs?.[cKey];
      if (arCon && enCon) {
        map[arCon.title] = enCon.title;
      }
    }

    for (const sKey of Object.keys(arPsy.subscales || {})) {
      const arSub = arPsy.subscales[sKey];
      const enSub = enPsy.subscales?.[sKey];
      if (arSub && enSub) {
        map[arSub] = enSub;
      }
    }

    for (const aKey of Object.keys(arPsy.comparisonAxes || {})) {
      const arAxis = arPsy.comparisonAxes[aKey];
      const enAxis = enPsy.comparisonAxes?.[aKey];
      if (arAxis && enAxis) {
        map[arAxis] = enAxis;
      }
    }

    for (const iKey of Object.keys(arPsy.compatibilityIndices || {})) {
      const arIdx = arPsy.compatibilityIndices[iKey];
      const enIdx = enPsy.compatibilityIndices?.[iKey];
      if (arIdx && enIdx) {
        map[arIdx] = enIdx;
      }
    }
  }

  return map;
}

export const TRANSLATIONS: Translations = buildTranslationsDictionary();
export const DYNAMIC_TEXT_TRANSLATIONS: Record<string, string> = buildDynamicPhraseMap();

// Pre-sorted dictionary entries (longest phrases first) so translateDynamicField executes in O(N) without sorting on every call
const SORTED_DYNAMIC_TRANSLATION_ENTRIES: ReadonlyArray<[string, string]> = Object.entries(
  DYNAMIC_TEXT_TRANSLATIONS
).sort((a, b) => b[0].length - a[0].length);

export function translateDynamicField(arabicText: string, targetLang: SupportedLanguage): string {
  if (targetLang === 'ar' || !arabicText) return arabicText;
  const trimmed = arabicText.trim();
  if (DYNAMIC_TEXT_TRANSLATIONS[trimmed]) {
    return DYNAMIC_TEXT_TRANSLATIONS[trimmed];
  }

  let result = arabicText;
  for (const [arKey, enVal] of SORTED_DYNAMIC_TRANSLATION_ENTRIES) {
    if (result.includes(arKey)) {
      result = result.split(arKey).join(enVal);
    }
  }

  if (targetLang === 'en') {
    result = result
      .replace(/المرتبة المئينية/g, 'Percentile Rank')
      .replace(/المئين/g, 'Percentile')
      .replace(/معيار Sten/g, 'Sten')
      .replace(/الدرجة الخام/g, 'Raw Score')
      .replace(/الدرجات الخام/g, 'Raw Scores')
      .replace(/الدرجة المعيارية/g, 'Standard Score')
      .replace(/الدرجات المعيارية/g, 'Standard Scores')
      .replace(/سؤالاً/g, 'Items')
      .replace(/أسئلة/g, 'Items')
      .replace(/سؤال/g, 'Item')
      .replace(/إجابة صحيحة/g, 'Correct Answers')
      .replace(/إجابات صحيحة/g, 'Correct Answers')
      .replace(/بنود قياسية/g, 'Standard Items')
      .replace(/بنداً/g, 'Items')
      .replace(/دقائق/g, 'mins')
      .replace(/دقيقة/g, 'mins')
      .replace(/سنة/g, 'yrs')
      .replace(/صفحة/g, 'Page')
      .replace(/المركز الأول/g, 'Rank #1')
      .replace(/المركز الثاني/g, 'Rank #2')
      .replace(/المركز الثالث/g, 'Rank #3')
      .replace(/المركز (\d+)/g, 'Rank #$1')
      .replace(/النسبة المئوية/g, 'Percentage')
      .replace(/مؤشر التوافق/g, 'Compatibility Index')
      .replace(/توافق/g, 'Compatibility');
  }

  return result;
}
