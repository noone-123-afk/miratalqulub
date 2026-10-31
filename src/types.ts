export type Gender = 'male' | 'female';

export interface UserProfile {
  userGender: Gender;
  partnerGender: Gender;
  userAge: number;
  country: string;
  ethnicity: string;
  educationLevel?: string;
  lifestyleOutlook?: string;
  partnerFeaturesPreference?: string;
  userName?: string;
  userBirthDate?: string;
}

export interface SocioculturalDimension {
  id: string;
  category: 'values' | 'sociology' | 'culture' | 'psychology' | 'practical';
  titleAr: string;
  categoryNameAr: string;
  score: number;
  badge: string;
  scientificReference: string;
  sociologicalBasis: string;
  practicalDailyRule: string;
  realScenario: string;
  synergyLevel: 'تناغم استثنائي' | 'توافق عالٍ ومثمر' | 'تكامل متوازن' | 'توافق إيجابي';
}

export interface GenerationalInsight {
  cohortName: string;
  birthYearRange: string;
  lifeStage: string;
  sociologicalTraits: string[];
  recommendedCommunication: string;
}

export interface ScientificGuideline {
  id: string;
  frameworkName: string;
  scholarReference: string;
  principleAr: string;
  practicalApplicationAr: string;
  benefitToCouple: string;
}

export interface SocioculturalAnalysisResult {
  partnerName: string;
  overallFitPercentage: number;
  valuesAlignmentScore: number;
  sociologicalScore: number;
  practicalCultureScore: number;
  psychologicalMaturityScore: number;
  generationalInsight: GenerationalInsight;
  dimensions: SocioculturalDimension[];
  scientificGuidelines: ScientificGuideline[];
  familyAndCommunityProtocol: {
    extendedFamilyHarmony: string;
    socialHospitalityNorms: string;
    financialTransparencyProtocol: string;
    workLifeSynergy: string;
  };
  executiveSummaryAr: string;
}

export interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  scientificDimension: string;
  icon: string;
  options: {
    id: string;
    text: string;
    description: string;
    icon: string;
    trait: string;
    intellectualVibe?: string;
  }[];
}

export interface ScientificScore {
  dimension: string;
  score: number;
  analysis: string;
}

export interface PartnerAnalysisResult {
  proposedPartnerName: string; // الاسم المقترح لشريك الحياة المتوافق
  nameMeaning: string; // المعنى والدلالة النفسية للاسم
  personalityArchetype: string;
  partnerArchetype: string;
  compatibilityScore: number;
  
  // الأبعاد العلمية للتوافق (الأكاديمية والاجتماعية)
  intellectualScore: number; // مؤشر التوافق الفكري والتعليمي
  sociologicalScore: number; // مؤشر التوافق الاجتماعي والعائلي
  emotionalScore: number; // مؤشر الذكاء العاطفي والاستقرار
  lifestyleScore: number; // مؤشر انسجام نمط الحياة والأهداف
  
  detailedMatchReason: string;
  intellectualSynergy: string; // دراسة التوافق الفكري والقرارات
  socialHarmony: string; // التوافق مع العائلة والبيئة المجتمعية
  attachmentStyle: string; // نمط الارتباط (آمن، داعم، تشاركي)
  
  partnerTraits: {
    title: string;
    description: string;
    percentage: number;
  }[];
  
  loveLanguage: string;
  visualDescription: string;
  romanticAdvice: string;
  partnerVibeQuote: string;
  imageUrl?: string;
  imagePrompt?: string;
  anniversaryActivities?: AnniversaryActivity[];
  scoringBreakdown?: RealScoringBreakdown;
  isRealCalculated?: boolean;
}

export interface DimensionCalculationDetail {
  dimensionNameAr: string;
  rawPoints: number;
  maxPoints: number;
  percentage: number;
  weight: number;
  weightedContribution: number;
  primaryAnswers: string[];
  scientificReasoningAr: string;
}

export interface ScientificSubscaleMetric {
  id: string;
  titleAr: string;
  scientistAr: string;
  theoryNameEn: string;
  score: number;
  questionsUsed: number[];
  analysisAr: string;
}

export interface RealScoringBreakdown {
  compatibilityScore: number;
  intellectualScore: number;
  sociologicalScore: number;
  emotionalScore: number;
  lifestyleScore: number;
  details: {
    intellectual: DimensionCalculationDetail;
    sociological: DimensionCalculationDetail;
    emotional: DimensionCalculationDetail;
    lifestyle: DimensionCalculationDetail;
  };
  scientificSubscales?: ScientificSubscaleMetric[];
  partnerTraits: {
    title: string;
    description: string;
    percentage: number;
    subDimension?: string;
  }[];
  algorithmVersion: string;
  auditHash: string;
  calculatedAt: string;
}

export interface AnniversaryActivity {
  id: string;
  title: string;
  category: string;
  description: string;
  vibe: string;
  location: string;
  icon: string;
}

export interface VirtualMeetingInfo {
  type: 'today' | 'random' | 'custom';
  dateString: string;
  hijriString?: string;
  season: string;
  anniversaryString: string;
  daysRemaining: number;
}

export type BucketListCategory = 'travel' | 'romance' | 'learning' | 'home' | 'adventure';

export interface BucketListItem {
  id: string;
  title: string;
  category: BucketListCategory;
  completed: boolean;
  createdAt: number;
  note?: string;
}

// --- The Blind Date Show Types ---
export type BlindDateStageKey = 'personal' | 'social' | 'academic' | 'ambitions';

export interface BlindDateQuestionItem {
  id: string;
  stage: BlindDateStageKey;
  questionAr: string;
  subtitleAr?: string;
  optionsAr: string[];
  partnerPresetAnswer?: string;
  partnerQuestionToUser?: string;
  userSuggestedAnswers?: string[];
}

export interface BlindDateStageDefinition {
  key: BlindDateStageKey;
  stepNumber: number;
  titleAr: string;
  badgeAr: string;
  subtitleAr: string;
  icon: string;
  color: string;
  gradient: string;
  borderClass: string;
  questions: BlindDateQuestionItem[];
}

export interface BlindDateAnswerRecord {
  stageKey: BlindDateStageKey;
  questionIndex: number;
  userAskedQuestion?: string;
  partnerAnswer?: string;
  userRatingForPartner?: number; // 1 - 5 stars
  userReactionComment?: string;
  partnerAskedQuestion?: string;
  userAnswer?: string;
  partnerRatingForUser?: number; // 1 - 5 stars
  partnerReactionComment?: string;
}

export interface BlindDateRoomSyncPayload {
  action: 'ask_question' | 'answer_question' | 'rate_answer' | 'stage_pass' | 'final_decision' | 'sync_all';
  stageIndex: number;
  turnIndex: number;
  data: Record<string, any>;
}

// --- AI Future Predictions Types ---
export interface FutureHorizonPrediction {
  years: number;
  labelAr: string;
  badgeAr: string;
  themeTitleAr: string;
  summaryAr: string;
  symbolicImages: {
    url: string;
    captionAr: string;
    tagAr: string;
  }[];
  pillars: {
    category: 'home' | 'career' | 'romance' | 'family' | 'travel';
    icon: string;
    titleAr: string;
    descriptionAr: string;
    highlightAr: string;
  }[];
  goldenKeyAr: string;
  aiProbability: number;
}

// --- Fictional First Encounter Story Types ---
export type EncounterSettingKey = 'cafe' | 'library' | 'travel' | 'cultural_event';

export interface EncounterSetting {
  id: EncounterSettingKey;
  titleAr: string;
  badgeAr: string;
  icon: string;
  locationAr: string;
  timeAr: string;
  atmosphereAr: string;
  bgGradient: string;
}

export interface FictionalEncounterStory {
  settingId: EncounterSettingKey;
  titleAr: string;
  subtitleAr: string;
  timeAndPlaceAr: string;
  openingQuoteAr: string;
  chapters: {
    numberAr: string;
    chapterTitleAr: string;
    contentAr: string;
    dialogueAr?: {
      speaker: string;
      text: string;
    };
  }[];
  concludingReflectionAr: string;
  atmosphereTags: string[];
}

// --- Voice Tone & Emotion Analysis Types ---
export interface EmotionalToneItem {
  name: string;
  score: number;
  description: string;
}

export interface VoiceToneAnalysisResult {
  voiceToneArchetype: string;
  vocalSynergyScore: number;
  emotionalTones: EmotionalToneItem[];
  acousticProfile: {
    pitchDescription: string;
    cadence: string;
    resonance: string;
  };
  vocalCompatibilityReport: string;
  communicationTip: string;
  partnerAcousticReaction: string;
  audioBlobUrl?: string;
  durationSeconds?: number;
}



