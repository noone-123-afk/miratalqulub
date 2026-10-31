import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage, TRANSLATIONS, translateDynamicField } from '../data/translations';
import { soundManager } from '../utils/sound';

interface LanguageContextType {
  language: SupportedLanguage;
  direction: 'rtl' | 'ltr';
  isRTL: boolean;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  translateText: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LANG_STORAGE_KEY = 'mirat_al_quloob_lang';

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
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === 'ar' ? 'rtl' : 'ltr';

  if (lang === 'ar') {
    root.classList.add('lang-ar');
    root.classList.remove('lang-en');
  } else {
    root.classList.add('lang-en');
    root.classList.remove('lang-ar');
  }

  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    window.dispatchEvent(new CustomEvent('app-language-changed', { detail: { language: lang } }));
  } catch (e) {
    console.error('Failed to persist language in localStorage', e);
  }
}

// High-coverage phrase & UI dictionary for instant bilingual DOM localization across all modals & sections
const UI_PHRASE_MAP: Array<[string, string]> = [
  // User Profile Dashboard & 16PF
  ['لوحة الملف الشخصي السيكومتري والزوجي الشامل', 'Comprehensive Psychometric & Marital Profile Dashboard'],
  ['لوحة ملفي الشخصي والمتوافقين للتواصل', 'My Psychometric Profile & Compatible Matches Hub'],
  ['نظرة عامة وملفي الشخصي', 'Overview & My Profile'],
  ['استبيان بياناتي وتفضيلاتي الدقيقة', 'My Personal Data & Preferences Questionnaire'],
  ['مقياس كاتل لـ 16 سمة (16PF)', 'Cattell 16PF Personality Profile'],
  ['المتوافقون والمتشابهون للتواصل', 'Compatible & Similar Matches to Connect'],
  ['سجل وتطور اختباراتي', 'My Test History & Progress'],
  ['تصدير ملفي السيكومتري الكامل (PDF)', 'Export Complete Psychometric Dossier (PDF)'],
  ['تصدير التقرير بصيغة PDF', 'Export PDF Report'],
  ['تحميل التقرير بصيغة PDF', 'Download PDF Report'],
  ['تصدير ملف PDF', 'Export PDF File'],
  ['صفاتي ونقاط قوتي السلوكية', 'My Behavioral Strengths & Traits'],
  ['اهتماماتي وشغفي اليومي', 'My Daily Interests & Passions'],
  ['تطلعاتي المستقبلية للعش الزوجي', 'My Future Marital Nest Aspirations'],
  ['معلومات شريك الحياة المناسب', 'Ideal Life Partner Specifications'],
  ['اكتشف من يشبهك أو يتوافق معك للتواصل', 'Discover Similar or Compatible Matches to Connect'],
  ['تقرير مبسط لغير المختصين', 'Simplified Non-Specialist Report'],
  ['العوامل العالمية الخمسة الكبرى', 'The 5 Global Second-Order Factors'],
  ['السمات الـ 16 الأولية لريموند كاتل', 'Raymond Cattell’s 16 Primary Personality Factors'],
  ['حفظ وتحديث بياناتي وتفضيلاتي', 'Save & Update My Profile & Preferences'],
  ['إجراء أو تحديث مقياس كاتل (16PF) الآن', 'Take or Update Cattell 16PF Assessment Now'],

  // Psychology Tests Modal
  ['مختبر مقاييس وتحليل الشخصية العلمي المعتمد', 'Certified Scientific Personality Assessment Lab'],
  ['اختر المقياس العلمي لبدء التقييم السيكومتري', 'Select a Certified Scale to Begin Psychometric Assessment'],
  ['ابدأ الاختبار الآن', 'Start Assessment Now'],
  ['استئناف الاختبار', 'Resume Assessment'],
  ['عرض التقرير المحفوظ', 'View Saved Report'],
  ['إعادة ضبط الإجابات', 'Reset Answers'],
  ['اعتماد الإجابات وإصدار التقرير السيكومتري', 'Submit Answers & Generate Psychometric Report'],
  ['جدول التدقيق السيكومتري التفصيلي لإجاباتك', 'Detailed Item-by-Item Psychometric Audit Table'],

  // Intelligence Tests Modal
  ['مختبر الذكاءات المتعددة والقدرات المعرفية', 'Multiple Intelligences & Cognitive Abilities Lab'],
  ['مقياس الذكاءات المتعددة (جاردنر وماكينزي - 45 سؤالاً)', 'Multiple Intelligences Inventory (Gardner & McKenzie - 45 Items)'],
  ['الذكاء اللغوي اللفظي', 'Verbal-Linguistic Intelligence'],
  ['الذكاء المنطقي الرياضي', 'Logical-Mathematical Intelligence'],
  ['الذكاء البصري المكاني', 'Visual-Spatial Intelligence'],
  ['الذكاء الحركي الجسدي', 'Bodily-Kinesthetic Intelligence'],
  ['الذكاء الموسيقي الإيقاعي', 'Musical-Rhythmic Intelligence'],
  ['الذكاء الاجتماعي التفاعلي', 'Interpersonal Intelligence'],
  ['الذكاء الذاتي التأملي', 'Intrapersonal Intelligence'],
  ['الذكاء الطبيعي البيئي', 'Naturalist Intelligence'],
  ['الذكاء الوجودي الفلسفي', 'Existential-Philosophical Intelligence'],
  ['إنهاء الاختبار وعرض التقرير السيكومتري', 'Finish Test & View Psychometric Report'],

  // Blind Date, Articles, Novels, Live Chat, Couple Invite
  ['تجربة التعارف المتدرج وراء الستار', 'Progressive Blind Date Behind the Curtain'],
  ['موسوعة المقالات والدراسات النفسية والزوجية', 'Encyclopedia of Psychological & Marital Studies'],
  ['مكتبة الروايات البوليسية والتحقيقات الجنائية', 'Mystery Novels & Criminal Investigations Library'],
  ['دعوة شريك حقيقي لاختبار التوافق المشترك', 'Invite a Real Partner for Joint Compatibility Testing'],
  ['سجل نتائج الاختبارات المحفوظة في قاعدة البيانات', 'Saved Test Results History in Database'],
  ['فتح التقرير', 'Open Report'],
  ['حذف من السجل', 'Delete from History'],
  ['تسجيل الخروج', 'Sign Out'],
  ['ربط بحساب', 'Link Account'],
  ['لا توجد نتائج محفوظة بعد', 'No Saved Results Yet'],
];

const originalNodeTextMap = new WeakMap<Node, string>();
const originalElementAttrMap = new WeakMap<Element, Record<string, string>>();

function translateRawArabicToEnglish(input: string): string {
  if (!input || !/[\u0600-\u06FF]/.test(input)) return input;

  let out = translateDynamicField(input, 'en');
  for (const [ar, en] of UI_PHRASE_MAP) {
    if (out.includes(ar)) {
      out = out.split(ar).join(en);
    }
  }
  return out;
}

function applyDomLocalization(lang: SupportedLanguage) {
  if (typeof document === 'undefined' || !document.body) return;

  // Walk text nodes
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'TEXTAREA') {
        return NodeFilter.FILTER_REJECT;
      }
      // Skip PDF preview modal which handles its own bilingual toggle
      if (parent.closest('#mirat-pdf-preview-overlay')) {
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

  // Handle elements with dir="rtl" inside modals and attributes like placeholder/title
  const allElements = document.body.querySelectorAll('[dir], [placeholder], [title]');
  allElements.forEach((el) => {
    if (el.closest('#mirat-pdf-preview-overlay')) return;

    if (el.hasAttribute('dir')) {
      const currentDir = el.getAttribute('dir');
      const targetDir = lang === 'ar' ? 'rtl' : 'ltr';
      if (currentDir && currentDir !== targetDir) {
        el.setAttribute('dir', targetDir);
      }
    }

    const attrsToTranslate = ['placeholder', 'title'];
    const savedAttrs = originalElementAttrMap.get(el) || {};

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

  useEffect(() => {
    applyLanguageSettings(language);
    applyDomLocalization(language);

    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ language: SupportedLanguage }>;
      if (customEvent.detail?.language) {
        setLanguageState(customEvent.detail.language);
      }
    };

    window.addEventListener('app-language-changed', handleLangChange);

    // Observe dynamic modals/tabs opening so they also localize seamlessly
    let rafId: number | null = null;
    const observer = new MutationObserver(() => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        applyDomLocalization(language);
      });
    });

    if (typeof document !== 'undefined' && document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener('app-language-changed', handleLangChange);
      observer.disconnect();
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
    const entry = TRANSLATIONS[key];
    if (entry && entry[language]) {
      return entry[language];
    }
    return fallback || entry?.ar || key;
  };

  const translateText = (text: string): string => {
    return translateDynamicField(text, language);
  };

  const isRTL = language === 'ar';
  const direction = isRTL ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        isRTL,
        setLanguage,
        toggleLanguage,
        t,
        translateText,
      }}
    >
      {children}
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
