export type SupportedLanguage = 'ar' | 'en';

export interface Translations {
  [key: string]: {
    ar: string;
    en: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Brand & Header
  brand_name: {
    ar: 'مِـرآة القـلوب',
    en: 'Mirror of Hearts',
  },
  brand_tagline: {
    ar: 'موقع كاشف شريك الحياة والتوافق النفسي',
    en: 'Partner & Personality Compatibility Hub',
  },
  pulse_hearts: {
    ar: 'نبض القلوب التفاعلي',
    en: 'Interactive Heartbeat',
  },
  nav_home: {
    ar: 'الرئيسية',
    en: 'Home',
  },
  nav_about: {
    ar: 'عن المنصة',
    en: 'About',
  },
  nav_how_it_works: {
    ar: 'كيف تعمل؟',
    en: 'How It Works',
  },
  nav_testimonials: {
    ar: 'قصص نجاح',
    en: 'Success Stories',
  },
  nav_articles: {
    ar: 'المقالات',
    en: 'Articles',
  },
  nav_faq: {
    ar: 'الأسئلة',
    en: 'FAQ',
  },
  nav_privacy: {
    ar: 'الأمان والخصوصية',
    en: 'Privacy & Security',
  },
  hosting_btn: {
    ar: 'دومين واستضافة Google',
    en: 'Google Hosting & Domain',
  },
  hosting_btn_mobile: {
    ar: 'استضافة 🌐',
    en: 'Hosting 🌐',
  },
  light_mode: {
    ar: 'نمط النور ☀️',
    en: 'Light Mode ☀️',
  },
  dark_mode: {
    ar: 'نمط الليل 🌙',
    en: 'Dark Mode 🌙',
  },
  adsense_btn: {
    ar: 'Google AdSense',
    en: 'Google AdSense',
  },
  adsense_btn_mobile: {
    ar: 'ادسينس 💰',
    en: 'AdSense 💰',
  },
  blind_date_btn: {
    ar: 'The Blind Date',
    en: 'The Blind Date',
  },
  blind_date_btn_mobile: {
    ar: 'Blind Date 💬',
    en: 'Blind Date 💬',
  },
  owner_admin_badge: {
    ar: 'إدارة المالك 👑',
    en: 'Owner Admin 👑',
  },
  owner_only_hint: {
    ar: 'متاح لمالك الموقع فقط',
    en: 'Site Owner Only',
  },
  psychology_btn: {
    ar: 'مقاييس الشخصية',
    en: 'Personality Tests',
  },
  psychology_btn_mobile: {
    ar: 'مقاييس 🧠',
    en: 'Tests 🧠',
  },
  dashboard_btn: {
    ar: 'لوحة ملفي',
    en: 'My Profile',
  },
  dashboard_btn_mobile: {
    ar: 'ملفي 👤',
    en: 'Profile 👤',
  },
  invite_btn: {
    ar: 'دعوة شريك',
    en: 'Invite Partner',
  },
  invite_btn_mobile: {
    ar: 'دعوة 💑',
    en: 'Invite 💑',
  },
  radar_btn: {
    ar: 'رادار التوافق',
    en: 'Radar Match',
  },
  radar_btn_mobile: {
    ar: 'دردشة 🟢',
    en: 'Chat 🟢',
  },
  install_btn: {
    ar: 'تثبيت',
    en: 'Install',
  },
  login_btn: {
    ar: 'دخول / حسابي',
    en: 'Login / Account',
  },
  login_btn_mobile: {
    ar: 'دخول',
    en: 'Login',
  },
  my_account: {
    ar: 'حسابي',
    en: 'My Account',
  },
  sound_mute: {
    ar: 'كتم المؤثرات الصوتية',
    en: 'Mute Sound Effects',
  },
  sound_unmute: {
    ar: 'تشغيل المؤثرات الصوتية',
    en: 'Play Sound Effects',
  },
  reset_test: {
    ar: 'بدء من جديد',
    en: 'Restart Test',
  },
  lang_toggle_label: {
    ar: 'English',
    en: 'العربية',
  },
  lang_badge: {
    ar: 'EN 🇺🇸',
    en: 'عربي 🇸🇦',
  },
  lang_switch_tooltip: {
    ar: 'Switch to English (التبديل إلى الإنجليزية)',
    en: 'التبديل إلى اللغة العربية (Switch to Arabic)',
  },

  // Profile Step
  hero_title_1: {
    ar: 'اكتشف شريك حياتك الواقعي',
    en: 'Discover Your Ideal Life Partner',
  },
  hero_title_highlight: {
    ar: 'بالمقاييس النفسية المعتمدة',
    en: 'With Certified Psychometric Models',
  },
  hero_subtitle: {
    ar: 'تحليل دقيق ومبتكر لمواصفات وتوافق شريك الحياة الواقعية بحسب دولتك وأصلك مع ملامح مصورة وبرنامج التعارف التفاعلي.',
    en: 'Accurate and innovative analysis of life partner traits and authentic compatibility tailored to your culture, featuring realistic portraits and interactive date sessions.',
  },
  gender_section_title: {
    ar: 'من أنت ومن تبحث عنه؟',
    en: 'Who are you and who are you looking for?',
  },
  i_am_man: {
    ar: 'أنا رجل أبحث عن شريكة حياة',
    en: 'I am a man looking for a life partner (woman)',
  },
  i_am_woman: {
    ar: 'أنا امرأة أبحث عن شريك حياة',
    en: 'I am a woman looking for a life partner (man)',
  },
  age_label: {
    ar: 'كم عمرك؟',
    en: 'Your Age',
  },
  years_old: {
    ar: 'سنة',
    en: 'years old',
  },
  country_label: {
    ar: 'بلدك أو جنسيتك',
    en: 'Your Country / Nationality',
  },
  ethnicity_label: {
    ar: 'الأصل / الملامح المرغوبة',
    en: 'Origin / Preferred Cultural Aesthetic',
  },
  name_optional_label: {
    ar: 'اسمك أو لقبك (اختياري)',
    en: 'Your Name or Nickname (optional)',
  },
  name_placeholder: {
    ar: 'مثال: عبد الله، سارة، فيصل...',
    en: 'e.g. Alex, Sarah, Omar...',
  },
  start_quiz_button: {
    ar: 'ابدأ اختبار التوافق العلمي المعتمد (25 سؤالاً) ✨',
    en: 'Start Certified Scientific Compatibility Quiz (25 Questions) ✨',
  },

  // Quiz Step
  quiz_header: {
    ar: 'اختبار التوافق النفسي والمجتمعي',
    en: 'Psychological & Social Compatibility Quiz',
  },
  quiz_question_counter: {
    ar: 'سؤال {current} من {total}',
    en: 'Question {current} of {total}',
  },
  quiz_prev: {
    ar: 'السابق',
    en: 'Previous',
  },
  quiz_next: {
    ar: 'التالي',
    en: 'Next',
  },
  quiz_finish: {
    ar: 'كشف ملامح وتوافق الشريك الآن ✨',
    en: 'Reveal Partner Traits & Compatibility ✨',
  },

  // Analyzing Step
  analyzing_heading: {
    ar: 'جارٍ تحليل سمات شخصيتك واستقراء ملامح شريك الحياة...',
    en: 'Analyzing your personality traits and generating ideal partner profile...',
  },
  analyzing_subheading: {
    ar: 'نربط الآن بين خوارزميات التوافق الفكري، الذكاء العاطفي، وعادات المجتمع الأصيلة.',
    en: 'Connecting intellectual synergy, emotional intelligence, and authentic social values.',
  },

  // Result Step
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
  click_zoom_portrait: {
    ar: 'انقر للتكبير وفحص التفاصيل بدقة فائقة 🔍',
    en: 'Click to zoom and view in ultra high resolution 🔍',
  },
  proposed_partner_badge: {
    ar: 'الاسم المقترح للشريك المتوافق',
    en: 'Proposed Compatible Partner Name',
  },
  name_meaning_title: {
    ar: 'المعنى والدلالة النفسية للاسم:',
    en: 'Psychological Meaning & Significance:',
  },
  personality_archetype_label: {
    ar: 'النمط الشخصي:',
    en: 'Your Personality Archetype:',
  },
  partner_archetype_label: {
    ar: 'نمط شريكك المتوافق:',
    en: 'Compatible Partner Archetype:',
  },
  overall_compatibility_label: {
    ar: 'مؤشر التوافق الكلي العام',
    en: 'Overall Calculated Compatibility',
  },
  mathematical_audit_btn: {
    ar: 'تدقيق حسابي حقيقي 🧮',
    en: 'Mathematical Audit 🧮',
  },
  score_exceptional_synergy: {
    ar: 'تناغم استثنائي ومثالي للارتباط الزوجي المستدام',
    en: 'Exceptional synergy for a healthy, lifelong partnership',
  },

  // Dimensions
  intellectual_dim: {
    ar: 'التوافق الفكري والتعليمي',
    en: 'Intellectual & Educational Synergy',
  },
  sociological_dim: {
    ar: 'التوافق الاجتماعي والعائلي',
    en: 'Sociological & Family Harmony',
  },
  emotional_dim: {
    ar: 'الذكاء العاطفي والاستقرار',
    en: 'Emotional Intelligence & Stability',
  },
  lifestyle_dim: {
    ar: 'انسجام نمط الحياة والأهداف',
    en: 'Lifestyle & Life Goals Harmony',
  },

  // Deep foundations
  deep_compatibility_foundations: {
    ar: 'أبعاد التوافق النفسي والاجتماعي الموثقة',
    en: 'Verified Psychometric & Sociological Foundations',
  },
  intellectual_synergy_title: {
    ar: 'التوافق الفكري والقرارات المشتركة',
    en: 'Intellectual Synergy & Joint Decision Making',
  },
  social_harmony_title: {
    ar: 'التناغم مع العائلة والمجتمع',
    en: 'Social Harmony & Extended Family Alignment',
  },
  attachment_style_title: {
    ar: 'نمط الارتباط والأمان العاطفي',
    en: 'Attachment Style & Emotional Containment',
  },
  traits_title: {
    ar: 'أبرز السمات والطباع المتوافقة في الشريك',
    en: 'Key Synergistic Traits in Your Partner',
  },
  love_language_title: {
    ar: 'لغة الحب والاحتواء المفضلة',
    en: 'Primary Love Language & Emotional Expression',
  },
  visual_desc_title: {
    ar: 'الملامح والمظهر الخارجي الواقعي',
    en: 'Visual Appearance & Photorealistic Aesthetic',
  },
  romantic_advice_title: {
    ar: 'النصيحة الذهبية لتعزيز المودة والرحمة',
    en: 'Golden Advice for Enduring Harmony & Affection',
  },
  spirit_quote_title: {
    ar: 'اقتباس يصف روح هذا التوافق',
    en: 'Quote Reflecting This Soul Alignment',
  },

  // Result Tabs
  tab_voice_summary: {
    ar: '🎙️ الملخص الصوتي للتوافق',
    en: '🎙️ Voice Compatibility Summary',
  },
  tab_heatmap: {
    ar: '🔥 الخريطة الحرارية',
    en: '🔥 Compatibility Heatmap',
  },
  tab_charts: {
    ar: '📊 الرسوم البيانية',
    en: '📊 Comparison Charts',
  },
  tab_sociology: {
    ar: '🏛️ الأبعاد الاجتماعية',
    en: '🏛️ Sociological Science',
  },
  tab_cadence: {
    ar: '⚡ إيقاع التوافق',
    en: '⚡ Fast Cadence Rhythm',
  },
  tab_predictions: {
    ar: '🔮 توقعات المستقبل',
    en: '🔮 Future Milestones',
  },
  tab_story: {
    ar: '✨ قصة اللقاء الخيالية',
    en: '✨ Fictional Encounter',
  },
  tab_bucket_list: {
    ar: '📝 قائمة أمنيات الزوجين',
    en: '📝 Couple Bucket List',
  },
  tab_anniversary: {
    ar: '💍 مناسبات خاصة',
    en: '💍 Special Anniversaries',
  },

  // Buttons in Result
  retake_test_btn: {
    ar: 'إعادة الاختبار',
    en: 'Retake Test',
  },
  regenerate_image_btn: {
    ar: 'توليد ملامح جديدة',
    en: 'Regenerate Portrait',
  },
  regenerating_now: {
    ar: 'جارٍ التوليد...',
    en: 'Regenerating...',
  },
  share_result_btn: {
    ar: 'مشاركة النتيجة 📤',
    en: 'Share Result 📤',
  },
  download_card_btn: {
    ar: 'تحميل بطاقة الشريك 🖼️',
    en: 'Download Partner Card 🖼️',
  },
  download_pdf_btn: {
    ar: 'تصدير التقرير بصيغة PDF (jsPDF) 📄',
    en: 'Export Official PDF Report (jsPDF) 📄',
  },
  generating_card: {
    ar: 'جارٍ تجهيز البطاقة...',
    en: 'Preparing Card...',
  },
  copy_link_btn: {
    ar: 'نسخ الرابط 📋',
    en: 'Copy Link 📋',
  },
  copied_success: {
    ar: 'تم النسخ بنجاح ✓',
    en: 'Copied Successfully ✓',
  },
  share_whatsapp: {
    ar: 'مشاركة عبر واتساب',
    en: 'Share via WhatsApp',
  },
  share_twitter: {
    ar: 'نشر على X (تويتر)',
    en: 'Post on X (Twitter)',
  },
  live_chat_btn: {
    ar: 'دردشة المتواجدين الآن 💬',
    en: 'Live Match Chat 💬',
  },
  blind_date_action_btn: {
    ar: 'خوض تجربة The Blind Date 💬',
    en: 'Play The Blind Date Experience 💬',
  },
  psychology_suite_btn: {
    ar: 'قسم مقاييس الشخصية المعتمدة 🧠',
    en: 'Psychometric Assessment Suite 🧠',
  },
  my_dashboard_btn: {
    ar: 'لوحة ملفي الشخصي ومواصفات شريكي 👤',
    en: 'My Profile & Ideal Partner Hub 👤',
  },
  couple_invite_btn: {
    ar: 'دعوة شريك حقيقي للاختبار المشترك 💑',
    en: 'Invite Real Partner to Joint Quiz 💑',
  },

  // Footer
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
};

// Comprehensive bilingual dictionary for UI phrases, psychometric dimensions, tests, countries, and reports
export const DYNAMIC_TEXT_TRANSLATIONS: Record<string, string> = {
  // Core Site Headers & Banners
  'مِـرآة القـلوب': 'Mirror of Hearts',
  'مِرآة القلوب': 'Mirror of Hearts',
  'مرآة القلوب': 'Mirror of Hearts',
  'الموقع مشرف عليه ومُدار بواسطة مجموعة من المهندسين المتخصصين':
    'Supervised and Managed by a Team of Specialized Software & Psychometric Engineers',
  'الأردن - عمّان • إدارة معتمدة': 'Amman, Jordan • Certified Administration',
  'الأردن - عمّان': 'Amman, Jordan',
  'تواصل واستفسارات وملاحظات عبر البريد المعتمد حصرياً:':
    'Official Contact, Inquiries & Feedback Exclusively via:',
  'تشفير TLS 1.3 معتمد': 'Verified TLS 1.3 Encryption',
  'جميع الأقسام': 'All Sections',
  'عن الموقع وفريق العمل': 'About & Engineering Team',
  'إشراف هندسي': 'Engineered',
  'اختبارات الذكاء': 'Intelligence Tests',
  'جديد': 'New',
  'كاشف التوافق': 'Partner Compatibility',
  'مقاييس الشخصية': 'Personality Scales',
  'المقالات النفسية': 'Psychology Articles',
  'الروايات والتحقيقات': 'Novels & Crime Files',
  'الخدمات التفاعلية': 'Interactive Services',
  'اختبار شريك الحياة والتوافق': 'Life Partner & Compatibility Assessment',
  'تجربة The Blind Date': 'The Blind Date Experience',
  'تفاعلي 💬': 'Interactive 💬',
  'قسم تحليل الشخصية العلمي': 'Scientific Personality Analysis Suite',
  'معتمد 🔬': 'Certified 🔬',
  'اختبارات الذكاء المتعدد (Gardner & McKenzie)': 'Multiple Intelligences & IQ Battery (Gardner & McKenzie)',
  '8 أبعاد 💡': '8 Dimensions 💡',
  'المرشد التفاعلي للاستكشاف السريع': 'Interactive Quick Discovery Wizard',
  'بوصلة 🧭': 'Compass 🧭',
  'لوحة ملفي والمتوافقين للتواصل': 'My Psychometric Profile & Matches Hub',
  'ملفي 👤': 'My Profile 👤',
  'سجل وتطور اختباراتي النفسية': 'My Psychometric Test History & Progress',
  'تتبع سحابي 📈': 'Cloud Sync 📈',
  'دعوة شريك حقيقي للاختبار': 'Invite a Real Partner to Test',
  'عن المنصة والمعرفة': 'About & Knowledge Hub',
  '📚 موسوعة المقالات والعلوم النفسية': '📚 Encyclopedia of Psychology & Relationship Articles',
  '🕵️‍♂️ الروايات والتحقيقات الجنائية': '🕵️‍♂️ Suspense Novels & Crime Investigations',
  'عن المنصة ورؤيتها': 'About the Platform & Vision',
  'كيف تعمل خوارزمية التوافق؟': 'How Does the Compatibility Algorithm Work?',
  'آراء وتجارب المستخدمين الموثقة': 'Verified User Testimonials & Reviews',
  'الأسئلة الشائعة والدعم الفني': 'FAQ & Technical Support',
  '✉️ تواصل معنا وإبداء الملاحظات (one497303@gmail.com)': '✉️ Contact Us & Send Feedback (one497303@gmail.com)',
  'الامتثال والأمان القانوني': 'Legal Compliance & Security',
  'تشفير تام TLS 1.3 وحماية AdSense': 'Full TLS 1.3 Encryption & AdSense Compliance',
  'خصوصية مطلقة دون بيع أو مشاركة بيانات': 'Strict Privacy — Zero Data Selling or Sharing',
  '✉️ تواصل معنا وملاحظات الزوار': '✉️ Contact Us & Visitor Feedback',
  '📄 سياسة الخصوصية (Privacy Policy)': '📄 Privacy Policy',
  '📜 شروط الاستخدام (Terms of Service)': '📜 Terms of Service',
  '🍪 إعادة ضبط ملفات الارتباط (Cookies)': '🍪 Reset Cookie Preferences',
  'سياسة الخصوصية': 'Privacy Policy',
  'شروط الاستخدام': 'Terms of Service',
  'موقع ومنصة كاشف شريك الحياة والتوافق النفسي وتجربة The Blind Date التفاعلية، لتحليل التوافق الفكري والاجتماعي والعاطفي.':
    'Scientific life partner compatibility platform, psychometric personality lab, and interactive Blind Date experience for intellectual, social, and emotional synergy.',
  'مستضاف ومحمي على Google Cloud Platform': 'Hosted & Protected on Google Cloud Platform',

  // Countries & Ethnicities
  'المملكة العربية السعودية': 'Saudi Arabia',
  'الإمارات العربية المتحدة': 'United Arab Emirates',
  'الكويت': 'Kuwait',
  'قطر': 'Qatar',
  'البحرين': 'Bahrain',
  'سلطنة عُمان': 'Oman',
  'الأردن': 'Jordan',
  'مصر': 'Egypt',
  'لبنان': 'Lebanon',
  'سوريا': 'Syria',
  'فلسطين': 'Palestine',
  'العراق': 'Iraq',
  'المغرب': 'Morocco',
  'الجزائر': 'Algeria',
  'تونس': 'Tunisia',
  'ليبيا': 'Libya',
  'السودان': 'Sudan',
  'اليمن': 'Yemen',
  'تركيا': 'Turkey',
  'أوروبا / أمريكا الشمالية': 'Europe / North America',
  'عربي خليجي': 'Arabian Gulf',
  'عربي شامي': 'Levantine Arab',
  'عربي مصري': 'Egyptian Arab',
  'عربي مغاربي / أمازيغي': 'Maghrebi / Amazigh Arab',
  'عربي عراقي / رافديني': 'Mesopotamian / Iraqi Arab',
  'متوسطي / أوروبي جنوبي': 'Mediterranean / Southern European',
  'أوروبي / غربي': 'European / Western',
  'تركي / أناضولي': 'Turkish / Anatolian',
  'آسيوي شرقي': 'East Asian',
  'جنوب آسيوي': 'South Asian',
  'أفريقي': 'African',
  'لاتيني': 'Latin American',

  // Archetypes & Psychometric Terms
  'المفكر الاستراتيجي': 'The Strategic Thinker',
  'القائد الحكيم': 'The Wise Leader',
  'الداعم العاطفي': 'The Empathetic Supporter',
  'المبدع المستقل': 'The Independent Visionary',
  'الواقعي المنظم': 'The Structured Realist',
  'المصلح الهادئ': 'The Serene Peacemaker',
  'المغامر الشغوف': 'The Passionate Adventurer',
  'الحامي المخلص': 'The Devoted Protector',
  'الروح الواعية والمفكر الاجتماعي المتزن': 'The Conscious Soul & Balanced Social Thinker',
  'سيدة الرقي والهدوء الفكري الملهم': 'Lady of Elegance & Inspiring Intellectual Calm',
  'السند الحكيم والقيادي النبيل': 'The Wise Pillar & Noble Leader',
  'الشريك المتزن والواعي عاطفياً وفكرياً': 'The Emotionally & Intellectually Balanced Partner',
  'المفكر التحليلي والمنظم الاستراتيجي': 'The Analytical Thinker & Strategic Organizer',
  'الداعم الدافئ والمحتوي عاطفياً': 'The Warm Supporter & Emotional Container',
  'القيادي الطموح والحازم برقي': 'The Ambitious & Gracefully Decisive Leader',
  'المبدع المتجدد والمحب للاستكشاف': 'The Innovative Explorer & Creative Spirit',

  // Attachment styles & Love languages
  'نمط ارتباط آمن (Secure)': 'Secure Attachment Style',
  'ارتباط آمن وتشاركي (Secure Attachment)': 'Secure & Collaborative Attachment',
  'نمط ارتباط آمن وداعم': 'Secure & Supportive Attachment',
  'نمط ارتباط تشاركي ناضج': 'Mature Collaborative Attachment',
  'آمن ومتوازن عاطفياً': 'Secure & Emotionally Balanced',
  'كلمات التشجيع والتقدير الصادق': 'Words of Affirmation & Heartfelt Appreciation',
  'تكريس الوقت والاهتمام المشترك': 'Quality Time & Undivided Attention',
  'الوقت النوعي الخاص وكلمات التقدير المتبادلة': 'Dedicated Quality Time & Mutual Words of Affirmation',
  'تبادل الهدايا الرمزية المعبرة': 'Thoughtful Giving & Meaningful Tokens',
  'أفعال الخدمة والمساعدة العملية': 'Acts of Service & Practical Support',
  'التواصل الجسدي والاحتواء الدافئ': 'Physical Touch & Comforting Containment',

  // Psychometric Tests & Scales Titles
  'مقياس العوامل الخمسة الكبرى للشخصية (Big Five - IPIP-NEO)':
    'Big Five Personality Inventory (Costa & McCrae / Goldberg IPIP-NEO)',
  'مقياس كاتل لعوامل الشخصية الستة عشر (Cattell 16PF)':
    'Cattell 16 Personality Factors Questionnaire (Raymond Cattell 16PF)',
  'مقياس أنماط التعلق العاطفي للبالغين (ECR-R - Bowlby & Ainsworth)':
    'Adult Romantic Attachment Scale (ECR-R — Bowlby, Ainsworth & Fraley)',
  'مقياس الذكاء العاطفي التطبيقي في العلاقات (Goleman & Schutte EQ)':
    'Applied Emotional Intelligence Scale (Salovey, Mayer, Goleman & Schutte)',
  'مقياس غوتمان للبيت الزوجي المتين وإدارة الخلاف (Gottman Relationship Scale)':
    'Gottman Sound Relationship House & Conflict Resolution Scale (John Gottman)',
  'مقياس لغات الحب الخمس والاحتياجات التقديرية (Chapman 5 Love Languages)':
    'Five Love Languages & Relational Needs Profile (Gary Chapman)',
  'مقياس أيزنك لأبعاد الشخصية والمزاج (Eysenck EPQ-R)':
    'Eysenck Personality & Temperament Questionnaire (Hans Eysenck EPQ-R)',
  'التقرير السيكومتري الشامل للذكاءات المتعددة (9 ذكاءات • 45 سؤالاً)':
    'Comprehensive Multiple Intelligences Psychometric Report (9 Intelligences • 45 Items)',
  'مقياس الذكاء المنطقي والكمي والفراغي المعياري (IQ Battery - 30 سؤالاً)':
    'Standardized Logical, Quantitative & Spatial IQ Battery (30 Objective Items)',
  'مقياس الذكاء العاطفي والاجتماعي التطبيقي (EQ Battery - 30 سؤالاً)':
    'Applied Emotional & Social Intelligence Battery (EQ - 30 Situational Items)',
  'مقياس القدرات المعرفية العليا والاستدلال التحليلي (CogAT Battery - 30 سؤالاً)':
    'Higher Cognitive Abilities & Analytical Reasoning Battery (CogAT - 30 Items)',
  'التقرير السيكومتري العلمي الشامل للتوافق الأسري والزواجي':
    'Comprehensive Scientific Psychometric Report for Marital & Family Compatibility',

  // Cattell 16PF Factors & Big Five Dimensions
  'الدفء والود الاجتماعي (Warmth - A)': 'Warmth & Interpersonal Affection (Factor A)',
  'الاستدلال والذكاء التحليلي (Reasoning - B)': 'Abstract Reasoning & Analytical Problem Solving (Factor B)',
  'الاستقرار الانفعالي وقوة الأنا (Emotional Stability - C)': 'Emotional Stability & Ego Strength (Factor C)',
  'الحزم والقيادة والتأثير (Dominance - E)': 'Assertiveness, Dominance & Leadership (Factor E)',
  'الحيوية والتلقائية والحماس (Liveliness - F)': 'Liveliness, Enthusiasm & Spontaneity (Factor F)',
  'الالتزام القيمي والضمير الحي (Rule-Consciousness - G)': 'Rule-Consciousness & Moral Duty (Factor G)',
  'الجرأة الاجتماعية والمبادرة (Social Boldness - H)': 'Social Boldness & Venturesomeness (Factor H)',
  'الحساسية العاطفية والذوقية (Sensitivity - I)': 'Emotional & Aesthetic Sensitivity (Factor I)',
  'اليقظة والحذر التحليلي (Vigilance - L)': 'Vigilance & Analytical Caution (Factor L)',
  'التجريد والخيال الفكري (Abstractedness - M)': 'Abstractedness & Imaginative Ideation (Factor M)',
  'الخصوصية والدبلوماسية (Privateness - N)': 'Privateness, Discretion & Diplomacy (Factor N)',
  'محاسبة الذات واليقظة الضميرية (Apprehension - O)': 'Self-Doubt & Conscientious Apprehension (Factor O)',
  'الانفتاح على التغيير والتطوير (Openness to Change - Q1)': 'Openness to Change & Experimentation (Factor Q1)',
  'الاعتماد على الذات والاستقلالية (Self-Reliance - Q2)': 'Self-Reliance & Autonomous Decision-Making (Factor Q2)',
  'الإتقان والتنظيم والانضباط (Perfectionism - Q3)': 'Perfectionism, Orderliness & Self-Discipline (Factor Q3)',
  'اليقظة العصبية والدافعية الزمنية (Tension - Q4)': 'Drive Tension & Time Urgency (Factor Q4)',
  'الانبساط والتفاعل الاجتماعي (Extraversion)': 'Extraversion & Social Engagement',
  'الاتزان الانفعالي والهدوء (Emotional Stability)': 'Emotional Stability & Calmness',
  'الانفتاح الفكري والمعرفي (Openness)': 'Openness to Experience & Intellect',
  'الوفاق والتعاطف والود (Agreeableness)': 'Agreeableness, Empathy & Harmony',
  'يقظة الضمير والانضباط (Conscientiousness)': 'Conscientiousness & Dependability',

  // Normative Level Labels
  'مرتفع جداً (سمة قيادية بارزة)': 'Very High (Dominant Signature Trait)',
  'مرتفع جداً': 'Very High',
  'مرتفع ومتطور': 'High & Well-Developed',
  'مرتفع': 'High',
  'متوسط متزن (المدى المعياري الصحي)': 'Balanced Average (Healthy Normative Range)',
  'متوسط متزن': 'Balanced Average',
  'يميل للقطب المقابل باعتدال': 'Moderately Leaning Toward Opposite Pole',
  'منخفض نسبياً': 'Relatively Low',

  // UI Modal Headers & Common Buttons
  'لوحة الملف الشخصي السيكومتري': 'Psychometric User Profile Dashboard',
  'مختبر مقاييس وتحليل الشخصية العلمي المعتمد': 'Certified Scientific Personality Assessment Lab',
  'مختبر الذكاءات المتعددة والقدرات المعرفية': 'Multiple Intelligences & Cognitive Abilities Lab',
  'تحميل التقرير بصيغة PDF': 'Download PDF Report',
  'تصدير التقرير بصيغة PDF': 'Export PDF Report',
  'تصدير ملف PDF شامل': 'Export Complete PDF Dossier',
  'إغلاق': 'Close',
  'حفظ التغييرات': 'Save Changes',
  'تم الحفظ بنجاح': 'Saved Successfully',
};

export function translateDynamicField(arabicText: string, targetLang: SupportedLanguage): string {
  if (targetLang === 'ar' || !arabicText) return arabicText;
  const trimmed = arabicText.trim();
  if (DYNAMIC_TEXT_TRANSLATIONS[trimmed]) {
    return DYNAMIC_TEXT_TRANSLATIONS[trimmed];
  }

  let result = arabicText;
  // Sort keys by length descending so longer phrases match first
  const entries = Object.entries(DYNAMIC_TEXT_TRANSLATIONS).sort((a, b) => b[0].length - a[0].length);
  for (const [arKey, enVal] of entries) {
    if (result.includes(arKey)) {
      result = result.split(arKey).join(enVal);
    }
  }

  // Common structural pattern replacements for psychometric reports & UI when in English
  if (targetLang === 'en') {
    result = result
      .replace(/المئين/g, 'Percentile')
      .replace(/سؤالاً/g, 'Questions')
      .replace(/سؤال/g, 'Question')
      .replace(/إجابة صحيحة/g, 'Correct Answers')
      .replace(/إجابات صحيحة/g, 'Correct Answers')
      .replace(/بنود قياسية/g, 'Standard Items')
      .replace(/بنداً/g, 'Items')
      .replace(/سنة/g, 'yrs')
      .replace(/صفحة/g, 'Page')
      .replace(/المركز الأول/g, 'Rank #1')
      .replace(/المركز الثاني/g, 'Rank #2')
      .replace(/المركز الثالث/g, 'Rank #3')
      .replace(/المركز (\d+)/g, 'Rank #$1')
      .replace(/الدرجة المعيارية/g, 'Standard Score')
      .replace(/النسبة المئوية/g, 'Percentage')
      .replace(/مؤشر التوافق/g, 'Compatibility Index')
      .replace(/توافق/g, 'Compatibility');
  }

  return result;
}
