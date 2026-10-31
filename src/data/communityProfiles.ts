// Directory of compatible and similar community & psychometric reference profiles
// + Structured Personal, Behavioral & Marital Discovery Questionnaire Data & Scientific Matching Engine

import { PsychometricReport } from './psychologySuiteData';
import { UserProfile } from '../types';

export interface CommunityMemberProfile {
  id: string;
  displayName: string;
  userGender: 'male' | 'female';
  userAge: number;
  country: string;
  city: string;
  avatarUrl: string;
  archetype: string;
  archetypeBadge: string;
  category: 'complementary' | 'similar' | 'both';
  compatibilityScore: number; // Computed dynamically 0-100%
  similarityScore: number; // Computed dynamically 0-100%
  bio: string;
  strengths: string[];
  interests: string[];
  aspirations: string[];
  idealPartnerNeeds: string;
  communicationStyle: string;
  attachmentStyleAr?: string;
  loveLanguageAr?: string;
  cattellTopFactorsAr?: string[];
  sharedHighlightsWithUser?: string[];
  complementaryReasonsWithUser?: string[];
  contactOptions: {
    whatsapp?: string;
    allowDirectChat: boolean;
    allowInvite: boolean;
  };
  dimensionScores: {
    extraversion: number;
    emotionalStability: number;
    openness: number;
    agreeableness: number;
    conscientiousness: number;
  };
}

// ============================================================================
// STRUCTURED PERSONAL, BEHAVIORAL & MARITAL QUESTIONNAIRE (USER-DRIVEN DATA)
// ============================================================================

export interface UserPersonalQuestionnaireData {
  isCompleted: boolean;
  updatedAt: string;
  // 1. Core Personal Info
  fullName: string;
  userGender: 'male' | 'female';
  userAge: number;
  country: string;
  city: string;
  educationAndCareer: string;
  personalBio: string;

  // 2. Behavioral Traits & Strengths (صفاتي ونقاط قوتي السلوكية)
  selectedStrengths: string[];
  customStrengths: string[];
  stressResponseStyle: string;
  decisionMakingStyle: string;
  socialEnergyStyle: string;

  // 3. Daily Interests & Passions (اهتماماتي وشغفي اليومي)
  selectedInterests: string[];
  customInterests: string[];
  weekendRoutinePreference: string;
  intellectualPassion: string;

  // 4. Future Marital Nest Aspirations (تطلعاتي المستقبلية للعش الزوجي)
  selectedMaritalAspirations: string[];
  customMaritalAspirations: string[];
  maritalHomeAtmosphere: string;
  financialManagementVision: string;
  conflictResolutionProtocol: string;
  parentingAndFamilyVision: string;
  primaryLoveLanguage: string;

  // 5. Ideal Life Partner Specifications (مواصفات شريك الحياة المناسب)
  preferredPartnerAgeRange: string;
  partnerCorePersonalityType: string;
  partnerEssentialTraits: string[];
  partnerEmotionalNeedsFromThem: string;
  partnerCommunicationPreference: string;
  partnerGreenFlags: string[];
  partnerRedFlags: string[];
}

export const QUESTIONNAIRE_OPTIONS = {
  strengthsCatalog: [
    'الهدوء وضبط النفس وقت الأزمات والضغوط (Emotional Stability)',
    'الوفاء الصادق بالوعود والالتزام الأخلاقي بالمسؤوليات (Conscientiousness)',
    'الدفء العاطفي والقدرة على جبر الخواطر والاحتواء (Warmth - Factor A+)',
    'التفكير التحليلي المنطقي وحل المشكلات بروية (Reasoning - Factor B+)',
    'الاستماع الفعال والتعاطف العميق مع مشاعر الآخرين (Empathy)',
    'المبادرة القيادية وتحمل المسؤولية في المواقف الصعبة (Dominance - E+)',
    'المرح التلقائي وإشاعة البهجة والتفاؤل في المحيط (Liveliness - F+)',
    'صيانة الخصوصية وحفظ أسرار البيت والعلاقات (Privateness - N+)',
    'المرونة الفكرية والانفتاح على التعلم والتجديد المستمر (Openness - Q1+)',
    'الاستقلالية الذاتية والاعتماد على النفس بكفاءة (Self-Reliance - Q2+)',
    'الدقة والتنظيم والاهتمام بالتفاصيل والترتيب (Perfectionism - Q3+)',
    'التسامح الكريم والتغافل عن الهفوات الصغيرة (Forgiveness & Grace)',
  ],
  interestsCatalog: [
    'القراءة ومناقشة الكتب الفكرية والنفسية وتطوير الذات',
    'السفر واستكشاف الثقافات والمدن والطبيعة مع شريك العمر',
    'الرياضة اليومية والاهتمام باللياقة البدنية والصحة الغذائية',
    'جلسات القهوة الهادئة والحوارات العميقة بعيداً عن الشاشات',
    'ريادة الأعمال، التخطيط المالي، والمشاريع الاستثمارية الطموحة',
    'الفنون، الأدب، الشعر، والتذوق الجمالي والموسيقي',
    'الطبخ المنزلي، تنسيق الديكور، وإكرام الضيف بلمسة دافئة',
    'العمل التطوعي، المبادرات الإنسانية، وصلة الرحم العائلية',
    'التقنية الحديثة، البرمجة، والابتكار الرقمي والعلمي',
    'الهدوء المنزلي، التأمل، والأمسيات العائلية الدافئة',
  ],
  maritalAspirationsCatalog: [
    'تأسيس بيت زوجي مستقل يفيض بالسكينة والمودة والرحمة بعيداً عن التدخلات الخارجية',
    'بناء شراكة مالية شفافة ومتوازنة تجمع بين رغد العيش والادخار الذكي للمستقبل',
    'اعتماد الحوار الهادئ الفوري لحل أي خلاف زوجي ومنع الصمت العقابي أو تراكم العتب',
    'تربية الأبناء تربية حوارية حديثة تجمع بين الأصالة الأخلاقية والثقة بالنفس',
    'تخصيص وقت نوعي أسبوعي ثابت للزوجين فقط لتجديد المشاعر وكسر الروتين',
    'التشجيع المتبادل على الطموح المهني والعلمي مع وضع استقرار الأسرة كأولوية أولى',
    'بناء علاقة قائمة على الأمان النفسي التام بحيث يكون كل طرف هو الملاذ الأول لشريكه',
    'التوازن الحكيم بين بر الوالدين وصلة الرحم وبين صيانة استقلالية وأسرار العش الزوجي',
  ],
  stressResponseOptions: [
    'أحافظ على هدوئي وأحلل المشكلة منطقياً للوصول إلى حل عملي (ثبات انفعالي C+)',
    'أحتاج لبعض الوقت الهادئ بمفردي لترتيب أفكاري ثم أعود للحوار باتزان (استقلالية Q2+)',
    'أرتاح للتحدث الفوري ومشاركة مشاعري مع شريك متفهم يطمئنني (دفء وتواصل A+)',
    'أفرغ التوتر في العمل أو الرياضة والنشاط الحركي حتى أستعيد توازني (حيوية F+)',
  ],
  decisionMakingOptions: [
    'تشاوري وتشاركي: أحب دراسة الخيارات مع شريك حياتي والاتفاق سوياً (توافق ووفاق)',
    'تحليلي متأنٍ: أجمع المعلومات وأحسب العواقب بدقة قبل أي خطوة (تفكير منطقي B+)',
    'قيادي حاسم: أبادر بحسم الأمور وتحمل المسؤولية مع مراعاة مصلحة الأسرة (قيادة E+)',
    'حدسي مرن: أعتمد على البصيرة والمرونة والتكيف السريع مع المعطيات (انفتاح Q1+)',
  ],
  maritalHomeAtmosphereOptions: [
    'واحة سكينة وهدوء وخصوصية عالية مع جلسات حوارية دافئة',
    'بيت حيوي مليء بالبهجة، المرح، الأنشطة المشتركة، واستقبال الأحبة',
    'بيئة منظمة وراقية تجمع بين الهدوء المنزلي والتخطيط الطموح للمستقبل',
    'ملاذ رومانسي شاعري يركز على الاحتواء العاطفي والتفاصيل الجميلة',
  ],
  financialVisionOptions: [
    'ميزانية أسرية تشاركية بشفافية كاملة مع خطة ادخار واستثمار للمستقبل',
    'توزيع واضح للمسؤوليات المالية مع كرم ومرونة في إسعاد الأسرة',
    'إدارة مالية دقيقة ومنظمة تمنع الديون وتحقق الأمان المالي طويل الأمد',
  ],
  conflictProtocolOptions: [
    'النقاش الهادئ المباشر في نفس اليوم وتطييب الخاطر قبل النوم (Gottman Repair)',
    'أخذ هدنة قصيرة (30 دقيقة) لتهدئة الانفعال ثم الجلوس لحوار ودي صريح',
    'التغافل الكريم عن الهفوات البسيطة والتركيز على جوهر المودة والاحترام',
  ],
  loveLanguagesOptions: [
    'كلمات التقدير، الثناء، والامتنان اللفظي الصادق يومياً (Words of Affirmation)',
    'الوقت النوعي المشترك، الإصغاء الكامل، والأنشطة الثنائية (Quality Time)',
    'الأفعال الخدمية، المساندة العملية، وتخفيف الأعباء دون طلب (Acts of Service)',
    'المبادرات الرومانسية، الهدايا المعبرة، والمفاجآت اللطيفة (Thoughtful Gifts)',
    'الاحتواء الدافئ، القرب الحاني، وإشعار الشريك بالأمان (Warm Presence & Touch)',
  ],
  partnerEssentialTraitsCatalog: [
    'الارتباط الآمن والاتزان الانفعالي (هدوء الأعصاب وقت الخلاف)',
    'الصدق والشفافية والوضوح التام بعيداً عن الغموض والمراوغة',
    'الحنان والرفق والقدرة على الاحتواء العاطفي وجبر الخواطر',
    'الضمير الحي والوفاء بالوعود وتحمل المسؤولية الأسرية بجدية',
    'النضج الفكري وحب الحوار الهادف والتطوير المشترك',
    'حفظ الخصوصية وعدم إفشاء أسرار البيت للأطراف الخارجية',
    'الكرم العاطفي والمالي والتوازن في إدارة شؤون الحياة',
    'روح الدعابة والتفاؤل والقدرة على تلطيف الأجواء',
  ],
  partnerRedFlagsCatalog: [
    'الصمت العقابي الطويل أو الهروب والانسحاب عند حدوث أي خلاف',
    'النقد اللاذع المستمر أو التقليل من المشاعر والإنجازات',
    'إفشاء أسرار العلاقة الزوجية للأهل أو الأصدقاء',
    'العصبية الحادة غير المنضبطة أو التلفظ بكلمات جارحة وقت الغضب',
    'البخل العاطفي أو المالي والأنانية في اتخاذ القرارات',
    'الغموض والتقلب المزاجي الحاد وعدم الوضوح في النوايا',
  ],
};

const PERSONAL_QUESTIONNAIRE_STORAGE_KEY = 'mirat_user_personal_questionnaire_v1';

export function getDefaultPersonalQuestionnaire(
  profile?: UserProfile | null,
  report?: PsychometricReport | null
): UserPersonalQuestionnaireData {
  const isAlreadyCompleted = false;
  return {
    isCompleted: isAlreadyCompleted,
    updatedAt: new Date().toISOString(),
    fullName: profile?.userName || '',
    userGender: profile?.userGender || 'male',
    userAge: profile?.userAge || 26,
    country: profile?.country || 'المملكة العربية السعودية',
    city: '',
    educationAndCareer: profile?.educationLevel || 'جامعي / بكالوريوس',
    personalBio: '',
    selectedStrengths: report?.isCompleted
      ? report.userStrengthsAr.slice(0, 4)
      : [],
    customStrengths: [],
    stressResponseStyle: QUESTIONNAIRE_OPTIONS.stressResponseOptions[0],
    decisionMakingStyle: QUESTIONNAIRE_OPTIONS.decisionMakingOptions[0],
    socialEnergyStyle: 'توازن صحي بين الحضور الاجتماعي الودود والخصوصية الهادئة',
    selectedInterests: report?.isCompleted
      ? QUESTIONNAIRE_OPTIONS.interestsCatalog.slice(0, 3)
      : [],
    customInterests: [],
    weekendRoutinePreference: 'مزيج متوازن بين لقاء الأحبة والأنشطة الهادئة في المنزل أو الطبيعة',
    intellectualPassion: 'علم النفس، تطوير الذات، وبناء العلاقات الأسرية الناجحة',
    selectedMaritalAspirations: report?.isCompleted
      ? QUESTIONNAIRE_OPTIONS.maritalAspirationsCatalog.slice(0, 3)
      : [],
    customMaritalAspirations: [],
    maritalHomeAtmosphere: QUESTIONNAIRE_OPTIONS.maritalHomeAtmosphereOptions[0],
    financialManagementVision: QUESTIONNAIRE_OPTIONS.financialVisionOptions[0],
    conflictResolutionProtocol: QUESTIONNAIRE_OPTIONS.conflictProtocolOptions[0],
    parentingAndFamilyVision: 'تربية قائمة على الحوار، القدوة الصالحة، والدفء النفسي لبناء جيل واثق ومتزن',
    primaryLoveLanguage: QUESTIONNAIRE_OPTIONS.loveLanguagesOptions[0],
    preferredPartnerAgeRange: 'متقارب عمرياً (ضمن فارق 1 إلى 6 سنوات)',
    partnerCorePersonalityType:
      report?.idealPartnerProfile?.recommendedArchetypeAr ||
      'شريك متزن عاطفياً، صادق الحوار، يجمع بين دفء القلب ونضج العقل',
    partnerEssentialTraits: QUESTIONNAIRE_OPTIONS.partnerEssentialTraitsCatalog.slice(0, 4),
    partnerEmotionalNeedsFromThem:
      'الاحتواء الصادق، الإنصات المتعاطف دون أحكام، والتعبير الصريح عن التقدير والمحبة',
    partnerCommunicationPreference:
      'حوار هادئ، شفاف، ومباشر يعتمد على حسن الظن وتطييب الخاطر دون تأجيل أو صمت عقابي',
    partnerGreenFlags: [
      'المبادرة بالاعتذار وتطييب الخاطر عند أي سوء تفاهم',
      'الوفاء التام بالوعود والالتزام الصادق بالمسؤوليات',
      'الإنصات باهتمام واحترام الخصوصية الزوجية',
      'التشجيع المستمر والافتخار بالشريك',
    ],
    partnerRedFlags: QUESTIONNAIRE_OPTIONS.partnerRedFlagsCatalog.slice(0, 4),
  };
}

export function loadUserPersonalQuestionnaire(
  profile?: UserProfile | null,
  report?: PsychometricReport | null
): UserPersonalQuestionnaireData {
  try {
    const raw = localStorage.getItem(PERSONAL_QUESTIONNAIRE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as UserPersonalQuestionnaireData;
      if (parsed && typeof parsed === 'object') {
        return {
          ...getDefaultPersonalQuestionnaire(profile, report),
          ...parsed,
          fullName: parsed.fullName || profile?.userName || '',
          country: parsed.country || profile?.country || 'المملكة العربية السعودية',
          userAge: parsed.userAge || profile?.userAge || 26,
          userGender: parsed.userGender || profile?.userGender || 'male',
        };
      }
    }
  } catch {
    // ignore storage errors
  }
  return getDefaultPersonalQuestionnaire(profile, report);
}

export function saveUserPersonalQuestionnaire(data: UserPersonalQuestionnaireData): void {
  try {
    const updated: UserPersonalQuestionnaireData = {
      ...data,
      isCompleted: true,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(PERSONAL_QUESTIONNAIRE_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Could not save personal questionnaire', e);
  }
}

// ============================================================================
// SCIENTIFIC REFERENCE ARCHETYPE PROFILES & REAL PSYCHOMETRIC MATCHING ENGINE
// ============================================================================

export const COMMUNITY_PROFILES: CommunityMemberProfile[] = [
  {
    id: 'ref_prof_1',
    displayName: 'د. ليان الحسن (نمط مرجعي - آمن متكامل)',
    userGender: 'female',
    userAge: 26,
    country: 'الأردن',
    city: 'عمّان',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85',
    archetype: 'الروح المتزنة الحنونة (Cattell A+ / C+ / G+ — ارتباط آمن)',
    archetypeBadge: 'ملف سيكومتري معياري 🔬',
    category: 'both',
    compatibilityScore: 92,
    similarityScore: 88,
    bio: 'باحثة في علم النفس التربوي، أؤمن بأن البيت الزوجي هو واحة سكينة ومودة تقوم على الحوار الهادئ، الاحترام المتبادل، والنمو الفكري المشترك.',
    strengths: [
      'الهدوء وضبط النفس وقت الأزمات والضغوط (Emotional Stability)',
      'الدفء العاطفي والقدرة على جبر الخواطر والاحتواء (Warmth - Factor A+)',
      'الاستماع الفعال والتعاطف العميق مع مشاعر الآخرين (Empathy)',
      'صيانة الخصوصية وحفظ أسرار البيت والعلاقات (Privateness - N+)',
    ],
    interests: [
      'القراءة ومناقشة الكتب الفكرية والنفسية وتطوير الذات',
      'جلسات القهوة الهادئة والحوارات العميقة بعيداً عن الشاشات',
      'السفر واستكشاف الثقافات والمدن والطبيعة مع شريك العمر',
    ],
    aspirations: [
      'تأسيس بيت زوجي مستقل يفيض بالسكينة والمودة والرحمة بعيداً عن التدخلات الخارجية',
      'اعتماد الحوار الهادئ الفوري لحل أي خلاف زوجي ومنع الصمت العقابي أو تراكم العتب',
      'تربية الأبناء تربية حوارية حديثة تجمع بين الأصالة الأخلاقية والثقة بالنفس',
    ],
    idealPartnerNeeds: 'شريك ناضج فكرياً، صادق الوعد، يقدر الحوار الهادئ ويشاركني طموح بناء أسرة مستقرة دافئة.',
    communicationStyle: 'حوار هادئ، صريح، ومباشر يعتمد على الإنصات المتعاطف وتطييب الخاطر.',
    attachmentStyleAr: 'ارتباط آمن (Secure Base - Bowlby)',
    loveLanguageAr: 'الوقت النوعي المشترك وكلمات التقدير',
    cattellTopFactorsAr: ['الدفء الإنساني (A+: 88%)', 'قوة الأنا والاستقرار (C+: 90%)', 'الضمير والواجب (G+: 92%)', 'الكياسة والخصوصية (N+: 86%)'],
    contactOptions: {
      allowDirectChat: true,
      allowInvite: true,
    },
    dimensionScores: {
      extraversion: 68,
      emotionalStability: 90,
      openness: 84,
      agreeableness: 92,
      conscientiousness: 89,
    },
  },
  {
    id: 'ref_prof_2',
    displayName: 'م. طارق المنصور (نمط مرجعي - قيادي حكيم)',
    userGender: 'male',
    userAge: 29,
    country: 'المملكة العربية السعودية',
    city: 'الرياض',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=85',
    archetype: 'القائد التحليلي المطمئن (Cattell B+ / C+ / E+ / G+)',
    archetypeBadge: 'ملف سيكومتري معياري 🔬',
    category: 'complementary',
    compatibilityScore: 91,
    similarityScore: 85,
    bio: 'مهندس نظم ومستشار تقني، أجمع بين التخطيط المنظم والقلب الدافئ، أبحث عن شريكة حياة واعية نكون معاً سكنًا وسنداً في بناء أسرة راقية.',
    strengths: [
      'التفكير التحليلي المنطقي وحل المشكلات بروية (Reasoning - Factor B+)',
      'الوفاء الصادق بالوعود والالتزام الأخلاقي بالمسؤوليات (Conscientiousness)',
      'المبادرة القيادية وتحمل المسؤولية في المواقف الصعبة (Dominance - E+)',
      'الهدوء وضبط النفس وقت الأزمات والضغوط (Emotional Stability)',
    ],
    interests: [
      'ريادة الأعمال، التخطيط المالي، والمشاريع الاستثمارية الطموحة',
      'السفر واستكشاف الثقافات والمدن والطبيعة مع شريك العمر',
      'الرياضة اليومية والاهتمام باللياقة البدنية والصحة الغذائية',
    ],
    aspirations: [
      'بناء شراكة مالية شفافة ومتوازنة تجمع بين رغد العيش والادخار الذكي للمستقبل',
      'تأسيس بيت زوجي مستقل يفيض بالسكينة والمودة والرحمة بعيداً عن التدخلات الخارجية',
      'بناء علاقة قائمة على الأمان النفسي التام بحيث يكون كل طرف هو الملاذ الأول لشريكه',
    ],
    idealPartnerNeeds: 'شريكة دافئة المشاعر، تقدر الاستقرار الأسري، وتحب الحوار الصريح والتشاور.',
    communicationStyle: 'واضح، عملي، وحنون، يفضل الحلول المباشرة وجبر الخاطر.',
    attachmentStyleAr: 'ارتباط آمن مستقر (Secure Autonomous)',
    loveLanguageAr: 'الأفعال الخدمية والمساندة + الوقت النوعي',
    cattellTopFactorsAr: ['التفكير المنطقي (B+: 92%)', 'الاستقرار الانفعالي (C+: 88%)', 'الضمير الحي (G+: 94%)', 'الدقة والنظام (Q3+: 87%)'],
    contactOptions: {
      allowDirectChat: true,
      allowInvite: true,
    },
    dimensionScores: {
      extraversion: 72,
      emotionalStability: 88,
      openness: 80,
      agreeableness: 85,
      conscientiousness: 93,
    },
  },
  {
    id: 'ref_prof_3',
    displayName: 'نور الهدى العبدالله (نمط مرجعي - مبدع مرهف)',
    userGender: 'female',
    userAge: 25,
    country: 'الإمارات العربية المتحدة',
    city: 'دبي',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=85',
    archetype: 'المفكرة الوجدانية المبدعة (Cattell I+ / M+ / Q1+)',
    archetypeBadge: 'ملف سيكومتري معياري 🔬',
    category: 'similar',
    compatibilityScore: 89,
    similarityScore: 91,
    bio: 'مصممة معمارية وكاتبة، شغوفة بالفن والأدب والسفر، أقدر الجمال في التفاصيل اليومية وأبحث عن شريك يجمع بين نضج الفكر ورقي المشاعر.',
    strengths: [
      'المرونة الفكرية والانفتاح على التعلم والتجديد المستمر (Openness - Q1+)',
      'الدفء العاطفي والقدرة على جبر الخواطر والاحتواء (Warmth - Factor A+)',
      'المرح التلقائي وإشاعة البهجة والتفاؤل في المحيط (Liveliness - F+)',
      'التسامح الكريم والتغافل عن الهفوات الصغيرة (Forgiveness & Grace)',
    ],
    interests: [
      'الفنون، الأدب، الشعر، والتذوق الجمالي والموسيقي',
      'السفر واستكشاف الثقافات والمدن والطبيعة مع شريك العمر',
      'الطبخ المنزلي، تنسيق الديكور، وإكرام الضيف بلمسة دافئة',
    ],
    aspirations: [
      'تخصيص وقت نوعي أسبوعي ثابت للزوجين فقط لتجديد المشاعر وكسر الروتين',
      'التشجيع المتبادل على الطموح المهني والعلمي مع وضع استقرار الأسرة كأولوية أولى',
      'بناء علاقة قائمة على الأمان النفسي التام بحيث يكون كل طرف هو الملاذ الأول لشريكه',
    ],
    idealPartnerNeeds: 'شريك متفهم، واسع الأفق، يقدر المشاعر الرقيقة ويدعم الطموح والإبداع.',
    communicationStyle: 'تعبيري، دافئ، وعميق يركز على المشاركة الوجدانية والتقدير المتبادل.',
    attachmentStyleAr: 'ارتباط آمن متعاطف (Empathic Secure)',
    loveLanguageAr: 'كلمات التقدير والمبادرات الرومانسية المعبرة',
    cattellTopFactorsAr: ['رهافة الحس والجمال (I+: 93%)', 'الخيال والإبداع (M+: 89%)', 'الانفتاح على التطوير (Q1+: 90%)', 'الدفء الإنساني (A+: 87%)'],
    contactOptions: {
      allowDirectChat: true,
      allowInvite: true,
    },
    dimensionScores: {
      extraversion: 78,
      emotionalStability: 79,
      openness: 94,
      agreeableness: 90,
      conscientiousness: 81,
    },
  },
  {
    id: 'ref_prof_4',
    displayName: 'أ. فارس الشامي (نمط مرجعي - دبلوماسي متزن)',
    userGender: 'male',
    userAge: 28,
    country: 'الأردن',
    city: 'عمّان',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=85',
    archetype: 'المحاور الحكيم ذو السكينة (Cattell A+ / C+ / Q4+)',
    archetypeBadge: 'ملف سيكومتري معياري 🔬',
    category: 'both',
    compatibilityScore: 90,
    similarityScore: 87,
    bio: 'محلل مالي، هادئ الطباع وطويل البال، أؤمن بأن السعادة الزوجية تكمن في البساطة، التغافل الكريم، والاحترام العميق لخصوصية وكرامة الشريك.',
    strengths: [
      'الهدوء وضبط النفس وقت الأزمات والضغوط (Emotional Stability)',
      'التسامح الكريم والتغافل عن الهفوات الصغيرة (Forgiveness & Grace)',
      'صيانة الخصوصية وحفظ أسرار البيت والعلاقات (Privateness - N+)',
      'الدقة والتنظيم والاهتمام بالتفاصيل والترتيب (Perfectionism - Q3+)',
    ],
    interests: [
      'القراءة ومناقشة الكتب الفكرية والنفسية وتطوير الذات',
      'الهدوء المنزلي، التأمل، والأمسيات العائلية الدافئة',
      'العمل التطوعي، المبادرات الإنسانية، وصلة الرحم العائلية',
    ],
    aspirations: [
      'التوازن الحكيم بين بر الوالدين وصلة الرحم وبين صيانة استقلالية وأسرار العش الزوجي',
      'اعتماد الحوار الهادئ الفوري لحل أي خلاف زوجي ومنع الصمت العقابي أو تراكم العتب',
      'بناء شراكة مالية شفافة ومتوازنة تجمع بين رغد العيش والادخار الذكي للمستقبل',
    ],
    idealPartnerNeeds: 'شريكة هادئة، أصيلة القيم، تحب السكينة المنزلية والحوار الراقي.',
    communicationStyle: 'رزين، دبلوماسي، ومستمع جيد يفضل الهدوء والاحتواء.',
    attachmentStyleAr: 'ارتباط آمن هادئ (Phlegmatic Secure Base)',
    loveLanguageAr: 'الاحتواء الدافئ، الوفاء، والوقت النوعي الهادئ',
    cattellTopFactorsAr: ['السكينة والاسترخاء (Q4+: 92%)', 'الاطمئنان النفسي (O-: 89%)', 'قوة الأنا (C+: 91%)', 'حفظ الخصوصية (N+: 90%)'],
    contactOptions: {
      allowDirectChat: true,
      allowInvite: true,
    },
    dimensionScores: {
      extraversion: 58,
      emotionalStability: 92,
      openness: 78,
      agreeableness: 91,
      conscientiousness: 88,
    },
  },
];

/**
 * Scientifically computes real compatibility & similarity scores between the user
 * (based on their PsychometricReport + Personal Questionnaire) and a CommunityMemberProfile.
 * Uses Costa & McCrae Five-Factor Dyadic Fit + Winch Complementarity + Shared Interests/Aspirations overlap.
 */
export function calculateMemberPsychometricMatch(
  member: CommunityMemberProfile,
  userReport: PsychometricReport,
  userQuestionnaire?: UserPersonalQuestionnaireData
): CommunityMemberProfile {
  // 1. Extract User's 5 Core Dimensions (from Big Five, 16PF, EPQ, or general report)
  const getDim = (keys: string[], fallback: number): number => {
    for (const k of keys) {
      const found = userReport.dimensionScores.find((d) => d.key === k);
      if (found) return found.score;
    }
    if (userReport.cattellGlobalFactors) {
      for (const k of keys) {
        const gf = userReport.cattellGlobalFactors.find((g) => g.key === k);
        if (gf) return gf.score;
      }
    }
    return fallback;
  };

  const userDims = {
    extraversion: getDim(['extraversion', 'eysenck_extraversion', 'global_extraversion', 'warmth'], 70),
    emotionalStability: getDim(['emotional_stability', 'eysenck_stability', 'global_stability', 'stability', 'secure_attachment'], 75),
    openness: getDim(['openness', 'global_sensitivity', 'openness_to_change', 'cognitive_synthesis', 'growth_mindset'], 75),
    agreeableness: getDim(['agreeableness', 'eysenck_empathy', 'warmth', 'social_empathy', 'forgiveness_grace'], 78),
    conscientiousness: getDim(['conscientiousness', 'global_self_control', 'rule_consciousness', 'perfectionism', 'self_regulation'], 76),
  };

  const mDims = member.dimensionScores;

  // 2. Compute Psychometric Similarity (100 - mean absolute difference across 5 factors)
  const diffE = Math.abs(userDims.extraversion - mDims.extraversion);
  const diffS = Math.abs(userDims.emotionalStability - mDims.emotionalStability);
  const diffO = Math.abs(userDims.openness - mDims.openness);
  const diffA = Math.abs(userDims.agreeableness - mDims.agreeableness);
  const diffC = Math.abs(userDims.conscientiousness - mDims.conscientiousness);

  const rawTraitSimilarity = 100 - (diffE + diffS + diffO + diffA + diffC) / 5;

  // 3. Compute Interest, Strength & Aspiration Overlap if user filled questionnaire
  const sharedHighlights: string[] = [];
  const complementaryReasons: string[] = [];

  if (userQuestionnaire) {
    const userInterests = [...userQuestionnaire.selectedInterests, ...userQuestionnaire.customInterests];
    const userAspirations = [...userQuestionnaire.selectedMaritalAspirations, ...userQuestionnaire.customMaritalAspirations];
    const userStrengths = [...userQuestionnaire.selectedStrengths, ...userQuestionnaire.customStrengths];

    member.interests.forEach((mi) => {
      if (userInterests.some((ui) => ui.includes(mi.slice(0, 12)) || mi.includes(ui.slice(0, 12)))) {
        sharedHighlights.push(`اهتمام مشترك: ${mi}`);
      }
    });

    member.aspirations.forEach((ma) => {
      if (userAspirations.some((ua) => ua.includes(ma.slice(0, 14)) || ma.includes(ua.slice(0, 14)))) {
        sharedHighlights.push(`تطلع زوجي مشترك: ${ma}`);
      }
    });

    member.strengths.forEach((ms) => {
      if (userStrengths.some((us) => us.includes(ms.slice(0, 12)) || ms.includes(us.slice(0, 12)))) {
        sharedHighlights.push(`قوة سلوكية متشابهة: ${ms}`);
      }
    });
  }

  // Add psychometric similarity & complementarity explanations
  if (diffO <= 14) {
    sharedHighlights.push(`تقارب فكري ومعرفي عالٍ في الانفتاح (${userDims.openness}% لديك مقابل ${mDims.openness}%)`);
  }
  if (diffC <= 14) {
    sharedHighlights.push(`توافق في مستوى التنظيم والالتزام بالمسؤوليات (${userDims.conscientiousness}% مقابل ${mDims.conscientiousness}%)`);
  }
  if (diffA <= 14) {
    sharedHighlights.push(`تناغم في التعاطف والوفاق العلائقي (${userDims.agreeableness}% مقابل ${mDims.agreeableness}%)`);
  }

  // Complementarity analysis (Gottman & Winch Marital Synergy)
  const combinedStability = (userDims.emotionalStability + mDims.emotionalStability) / 2;
  const combinedAgreeableness = (userDims.agreeableness + mDims.agreeableness) / 2;
  const extraversionBalance = 100 - Math.abs(Math.abs(userDims.extraversion - mDims.extraversion) - 10) * 0.6;
  const conscientiousFit = 100 - diffC * 0.8;
  const opennessFit = 100 - diffO * 0.7;

  complementaryReasons.push(
    `معامل الأمان والاستقرار الانفعالي المشترك للأسرة: ${Math.round(combinedStability)}%`,
    `معامل المودة والتعاطف وحل الخلافات بالحسنى: ${Math.round(combinedAgreeableness)}%`,
    `تكامل الطاقة الاجتماعية والخصوصية المنزلية: ${Math.round(extraversionBalance)}%`
  );

  const overlapBonus = Math.min(8, sharedHighlights.length * 2);
  const similarityScore = Math.max(55, Math.min(98, Math.round(rawTraitSimilarity * 0.92 + overlapBonus)));

  const rawCompatibility =
    combinedStability * 0.25 +
    combinedAgreeableness * 0.25 +
    conscientiousFit * 0.2 +
    opennessFit * 0.15 +
    extraversionBalance * 0.15 +
    overlapBonus * 0.5;

  const compatibilityScore = Math.max(60, Math.min(99, Math.round(rawCompatibility)));

  const category: 'complementary' | 'similar' | 'both' =
    compatibilityScore >= 86 && similarityScore >= 86
      ? 'both'
      : compatibilityScore >= similarityScore
      ? 'complementary'
      : 'similar';

  return {
    ...member,
    compatibilityScore,
    similarityScore,
    category,
    sharedHighlightsWithUser: sharedHighlights.slice(0, 4),
    complementaryReasonsWithUser: complementaryReasons,
  };
}
