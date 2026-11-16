import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type {
  SupportedLanguage,
  TextDirection,
  LanguageMetadata,
  TailwindDirectionClasses,
  Translations,
} from '../i18n';
import { soundManager } from '../utils/sound';

interface LanguageContextType {
  language: SupportedLanguage;
  direction: TextDirection;
  isRTL: boolean;
  languageMetadata: LanguageMetadata;
  supportedLanguages: LanguageMetadata[];
  tailwindClasses: TailwindDirectionClasses;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  translateText: (text: string) => string;
  formatNumber: (value: number) => string;
  formatDate: (isoOrDate: string | Date, options?: Intl.DateTimeFormatOptions) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LANG_STORAGE_KEY = 'mirat_al_quloob_lang';

const FALLBACK_LANG_METADATA: Record<SupportedLanguage, LanguageMetadata> = {
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    dir: 'rtl',
    isRTL: true,
    locale: 'ar-JO',
    flag: '🇸🇦',
    fontFamily: "'Alexandria', 'Tajawal', system-ui, sans-serif",
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    dir: 'ltr',
    isRTL: false,
    locale: 'en-US',
    flag: '🇺🇸',
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
};

function computeTailwindClasses(lang: SupportedLanguage): TailwindDirectionClasses {
  const isRTL = lang === 'ar';
  return {
    dirClass: isRTL ? 'dir-rtl' : 'dir-ltr',
    textAlignClass: isRTL ? 'text-right' : 'text-left',
    oppositeTextAlignClass: isRTL ? 'text-left' : 'text-right',
    fontClass: isRTL
      ? "font-['Alexandria','Tajawal',system-ui,sans-serif]"
      : 'font-sans',
    headingFontClass: isRTL ? "font-['Alexandria']" : 'font-sans tracking-tight',
    flexRowClass: 'flex-row',
    containerClass: isRTL
      ? "dir-rtl text-right font-['Alexandria','Tajawal',system-ui,sans-serif]"
      : 'dir-ltr text-left font-sans',
  };
}

// Lightweight inline dictionary for instant initial rendering without blocking on the full i18n JSON bundle
const CORE_TRANSLATIONS: Translations = {
  brand_name: {
    ar: 'مِـرآة القـلوب',
    en: 'Mirror of Hearts',
  },
  brand_tagline: {
    ar: 'موقع كاشف شريك الحياة والتوافق النفسي',
    en: 'Partner & Psychometric Compatibility Hub',
  },
  footer_rights: {
    ar: '© 2026 مِـرآة القـلوب. جميع الحقوق محفوظة.',
    en: '© 2026 Mirror of Hearts. All Rights Reserved.',
  },
  cloud_status: {
    ar: 'خوادم سحابية تعمل 99.9%',
    en: 'Cloud Uptime 99.9%',
  },
  ssl_verified: {
    ar: '🔒 شهادة SSL مدارة من Google',
    en: '🔒 Google-Managed SSL Certificate',
  },
  light_mode: {
    ar: 'نمط النور ☀️',
    en: 'Light Mode ☀️',
  },
  dark_mode: {
    ar: 'نمط الليل 🌙',
    en: 'Dark Mode 🌙',
  },
  result_badge_success: {
    ar: 'تم إعداد تقرير التوافق الفكري والمجتمعي بنجاح',
    en: 'Intellectual & Sociological Compatibility Report Prepared Successfully',
  },
  result_title_main: {
    ar: 'ملامح ومواصفات',
    en: 'Features & Traits of',
  },
  result_title_partner: {
    ar: 'شريك حياتك',
    en: 'Your Life Partner',
  },
  result_subtitle_desc: {
    ar: 'تحليل علمي ومجتمعي مبني على سمات شخصيتك وتوافقك مع بيئة',
    en: 'Scientific & sociological analysis grounded in your personality and synergy in',
  },
  pin_security_enabled: {
    ar: 'قفل الأمان: مُفـعّـل (PIN 4 أرقام) 🔒',
    en: 'Security Lock: Enabled (4-Digit PIN) 🔒',
  },
  pin_security_disabled: {
    ar: 'قفل الأمان: غير مفعل (مكشوف)',
    en: 'Security Lock: Disabled',
  },
  lock_now: {
    ar: 'قفل الآن 🔒',
    en: 'Lock Now 🔒',
  },
  pin_settings: {
    ar: 'إعدادات الرمز',
    en: 'PIN Settings',
  },
  enable_pin: {
    ar: '🛡️ تفعيل قفل PIN',
    en: '🛡️ Enable PIN',
  },
  save_to_account: {
    ar: 'حفظ النتيجة في حسابي 💾',
    en: 'Save Result to Account 💾',
  },
  saved_in_account: {
    ar: 'تم الحفظ في حسابك ✓',
    en: 'Saved to Account ✓',
  },
  saving_progress: {
    ar: 'جارٍ الحفظ...',
    en: 'Saving...',
  },
  history_btn: {
    ar: 'السجل 📂',
    en: 'History 📂',
  },
  ultra_hd_badge: {
    ar: 'دقة تصوير 4K واقعية',
    en: 'Photorealistic 4K Quality',
  },
  proposed_partner_badge: {
    ar: 'الاسم المقترح للشريك المتوافق',
    en: 'Proposed Compatible Partner Name',
  },
  overall_compatibility_label: {
    ar: 'مؤشر التوافق الكلي العام',
    en: 'Overall Calculated Compatibility',
  },
  mathematical_audit_btn: {
    ar: 'تدقيق حسابي حقيقي 🧮',
    en: 'Mathematical Audit 🧮',
  },
  regenerating_now: {
    ar: 'جارٍ التوليد...',
    en: 'Regenerating...',
  },
  regenerate_image_btn: {
    ar: 'توليد ملامح جديدة',
    en: 'Regenerate Portrait',
  },
};

let loadedI18nModule: typeof import('../i18n') | null = null;

export function getInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'ar';
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'ar' || saved === 'en') {
      return saved;
    }
  } catch (e) {
    console.error('Failed to read language from localStorage', e);
  }
  return 'ar';
}

export function applyLanguageSettings(lang: SupportedLanguage) {
  if (typeof document === 'undefined') return;
  const meta = FALLBACK_LANG_METADATA[lang] || FALLBACK_LANG_METADATA.ar;
  const tw = computeTailwindClasses(lang);
  const root = document.documentElement;
  root.lang = meta.code;
  root.dir = meta.dir;

  root.classList.remove('lang-ar', 'lang-en', 'dir-rtl', 'dir-ltr', 'text-right', 'text-left');
  root.classList.add(`lang-${meta.code}`, `dir-${meta.dir}`, tw.textAlignClass);

  if (document.body) {
    document.body.dir = meta.dir;
    document.body.classList.remove('dir-rtl', 'dir-ltr', 'text-right', 'text-left', 'font-sans');
    document.body.classList.add(tw.dirClass, tw.textAlignClass);
    if (!meta.isRTL) {
      document.body.classList.add('font-sans');
    }
  }

  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    window.dispatchEvent(new CustomEvent('app-language-changed', { detail: { language: lang } }));
  } catch (e) {
    console.error('Failed to persist language in localStorage', e);
  }
}

const originalNodeTextMap = new WeakMap<Node, string>();
const originalElementAttrMap = new WeakMap<Element, Record<string, string>>();
let hasEverLocalizedToEnglish = false;

function translateRawArabicToEnglish(input: string): string {
  if (!input || !/[\u0600-\u06FF]/.test(input)) return input;
  if (!loadedI18nModule) return input;
  return loadedI18nModule.translateDynamicField(input, 'en');
}

function shouldPreserveElementDirection(el: Element): boolean {
  if (
    el.hasAttribute('data-keep-dir') ||
    el.hasAttribute('data-dir-lock') ||
    el.classList.contains('ltr-preserve') ||
    el.classList.contains('rtl-preserve') ||
    el.classList.contains('recharts-wrapper') ||
    el.classList.contains('recharts-responsive-container') ||
    el.querySelector(':scope > .recharts-wrapper, :scope > .recharts-responsive-container, :scope > svg.recharts-surface') !== null
  ) {
    return true;
  }
  return false;
}

function applyDomLocalization(lang: SupportedLanguage) {
  if (typeof document === 'undefined' || !document.body) return;
  if (lang === 'ar' && !hasEverLocalizedToEnglish) return;
  if (lang === 'en') {
    hasEverLocalizedToEnglish = true;
  }

  const targetDir: TextDirection = (FALLBACK_LANG_METADATA[lang] || FALLBACK_LANG_METADATA.ar).dir;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'TEXTAREA') {
        return NodeFilter.FILTER_REJECT;
      }
      if (parent.closest('#mirat-pdf-preview-overlay, [data-no-translate="true"]')) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let currentNode = walker.nextNode();
  while (currentNode) {
    const val = currentNode.nodeValue || '';
    if (lang === 'en') {
      if (/[\u0600-\u06FF]/.test(val)) {
        if (!originalNodeTextMap.has(currentNode)) {
          originalNodeTextMap.set(currentNode, val);
        }
        const sourceAr = originalNodeTextMap.get(currentNode) || val;
        const translated = translateRawArabicToEnglish(sourceAr);
        if (translated !== val) {
          currentNode.nodeValue = translated;
        }
      }
    } else {
      const original = originalNodeTextMap.get(currentNode);
      if (original !== undefined && currentNode.nodeValue !== original) {
        currentNode.nodeValue = original;
      }
    }
    currentNode = walker.nextNode();
  }

  const allElements = document.body.querySelectorAll('[dir], [placeholder], [title], [aria-label]');
  allElements.forEach((el) => {
    if (el.closest('#mirat-pdf-preview-overlay, [data-no-translate="true"]')) return;

    const savedAttrs = originalElementAttrMap.get(el) || {};

    if (el.hasAttribute('dir') && !shouldPreserveElementDirection(el)) {
      const currentDir = el.getAttribute('dir');
      if (!savedAttrs.dir && currentDir) {
        savedAttrs.dir = currentDir;
        originalElementAttrMap.set(el, savedAttrs);
      }
      if (lang === 'ar') {
        const restoreDir = savedAttrs.dir || 'rtl';
        if (currentDir !== restoreDir) {
          el.setAttribute('dir', restoreDir);
        }
      } else if (currentDir && currentDir !== targetDir) {
        el.setAttribute('dir', targetDir);
      }
    }

    const attrsToTranslate = ['placeholder', 'title', 'aria-label'];
    for (const attr of attrsToTranslate) {
      const attrVal = el.getAttribute(attr);
      if (!attrVal) continue;

      if (lang === 'en') {
        if (/[\u0600-\u06FF]/.test(attrVal)) {
          if (!savedAttrs[attr]) {
            savedAttrs[attr] = attrVal;
            originalElementAttrMap.set(el, savedAttrs);
          }
          const translatedAttr = translateRawArabicToEnglish(savedAttrs[attr]);
          if (translatedAttr !== attrVal) {
            el.setAttribute(attr, translatedAttr);
          }
        }
      } else if (savedAttrs[attr] && attrVal !== savedAttrs[attr]) {
        el.setAttribute(attr, savedAttrs[attr]);
      }
    }
  });
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(getInitialLanguage);
  const [, setDictLoaded] = useState(Boolean(loadedI18nModule));

  useEffect(() => {
    applyLanguageSettings(language);

    let rafId: number | null = null;
    let observer: MutationObserver | null = null;

    if (language === 'en') {
      import('../i18n').then((mod) => {
        loadedI18nModule = mod;
        setDictLoaded(true);
        applyDomLocalization('en');

        if (typeof document !== 'undefined' && document.body) {
          observer = new MutationObserver(() => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
              applyDomLocalization('en');
            });
          });
          observer.observe(document.body, {
            childList: true,
            subtree: true,
          });
        }
      });
    } else {
      applyDomLocalization('ar');
    }

    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ language: SupportedLanguage }>;
      if (customEvent.detail?.language) {
        setLanguageState(customEvent.detail.language);
      }
    };

    window.addEventListener('app-language-changed', handleLangChange);

    return () => {
      window.removeEventListener('app-language-changed', handleLangChange);
      if (observer) observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [language]);

  const setLanguage = (lang: SupportedLanguage) => {
    soundManager.playTap();
    setLanguageState(lang);
    applyLanguageSettings(lang);
  };

  const toggleLanguage = () => {
    soundManager.playTap();
    const nextLang: SupportedLanguage = language === 'ar' ? 'en' : 'ar';
    setLanguageState(nextLang);
    applyLanguageSettings(nextLang);
  };

  const t = (key: string, fallback?: string): string => {
    const fullDict = loadedI18nModule?.TRANSLATIONS || CORE_TRANSLATIONS;
    const entry = fullDict[key] || CORE_TRANSLATIONS[key];
    if (entry && entry[language]) {
      return entry[language];
    }
    return fallback || entry?.ar || key;
  };

  const translateText = (text: string): string => {
    if (language === 'ar' || !loadedI18nModule) return text;
    return loadedI18nModule.translateDynamicField(text, language);
  };

  const languageMetadata =
    loadedI18nModule?.getLanguageMetadata(language) ||
    FALLBACK_LANG_METADATA[language] ||
    FALLBACK_LANG_METADATA.ar;

  const supportedLanguages =
    loadedI18nModule?.SUPPORTED_LANGUAGES || Object.values(FALLBACK_LANG_METADATA);

  const isRTL = languageMetadata.isRTL;
  const direction: TextDirection = languageMetadata.dir;
  const tailwindClasses =
    loadedI18nModule?.getTailwindLayoutClasses(language) || computeTailwindClasses(language);

  const formatNumber = (value: number): string => {
    if (!Number.isFinite(value)) return '0';
    try {
      return new Intl.NumberFormat(languageMetadata.locale).format(value);
    } catch {
      return String(value);
    }
  };

  const formatDate = (isoOrDate: string | Date, options?: Intl.DateTimeFormatOptions): string => {
    try {
      const d = typeof isoOrDate === 'string' ? new Date(isoOrDate) : isoOrDate;
      return d.toLocaleDateString(
        languageMetadata.locale,
        options || { year: 'numeric', month: 'short', day: 'numeric' }
      );
    } catch {
      return String(isoOrDate);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        isRTL,
        languageMetadata,
        supportedLanguages,
        tailwindClasses,
        setLanguage,
        toggleLanguage,
        t,
        translateText,
        formatNumber,
        formatDate,
      }}
    >
      <div
        dir={direction}
        className={`min-h-screen w-full transition-colors duration-200 ${tailwindClasses.containerClass}`}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
