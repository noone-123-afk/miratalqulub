export type Gender = 'male' | 'female';

export interface UserProfile {
  userGender: Gender;
  partnerGender: Gender;
  userAge: number;
  birthYear?: number;
  country: string;
  ethnicity: string;
  educationLevel?: string;
  lifestyleOutlook?: string;
  partnerFeaturesPreference?: string;
  userName?: string;
  userBirthDate?: string;
  coreValuesPriority?: string;
  communicationAndConflictStyle?: string;
  financialAndFamilyVision?: string;
  privacyConsentAccepted?: boolean;
  detectedCountryCode?: string;
  detectedNationalityAr?: string;
  detectedNationalityEn?: string;
  detectedEthnicTraitsPrompt?: string;
  detectedEthnicTraitsAr?: string;
  isLocationAutoDetected?: boolean;
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
  scientificReference?: string;
  scoringNoteAr?: string;
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
  detectedNationalityAr?: string;
  detectedEthnicTraitsAr?: string;
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

// ================= MULTI-TIER PSYCHOMETRIC ASSESSMENT & VISUALIZATION TYPES =================

export type AnalysisTier = 'quick' | 'advanced' | 'professional';

export type QuestionFormat = 'likert' | 'forced_choice';

export type PsychologicalConstructKey =
  | 'big_five'
  | 'hexaco'
  | 'attachment'
  | 'emotional_intelligence'
  | 'self_regulation'
  | 'interpersonal'
  | 'communication'
  | 'positive_psychology';

export interface ForcedChoiceOption {
  id: 'A' | 'B';
  textAr: string;
  textEn: string;
  targetSubscale: string;
  scoreValue: number; // Mapped contribution (1..5 equivalent)
  traitTagAr: string;
  traitTagEn: string;
}

export interface TieredAssessmentQuestion {
  id: string;
  index: number;
  construct: PsychologicalConstructKey;
  subscale: string; // e.g., 'openness', 'honesty_humility', 'anxiety', 'avoidance', 'empathy', etc.
  facetAr: string;
  facetEn: string;
  format: QuestionFormat;
  direction: 1 | -1; // 1 = direct, -1 = reverse-scored
  textAr: string;
  textEn: string;
  scientificReference: string;
  dimensionExplanationAr: string;
  dimensionExplanationEn: string;
  forcedOptions?: [ForcedChoiceOption, ForcedChoiceOption];
  minTier: AnalysisTier; // 'quick' appears in all, 'advanced' in advanced+pro, 'professional' in pro only
}

export interface SubscaleScoreResult {
  key: string;
  construct: PsychologicalConstructKey;
  labelAr: string;
  labelEn: string;
  rawScore: number; // sum of points
  maxRawScore: number;
  percentage: number; // 0..100
  stenScore: number; // 1..10
  percentile: number; // 1..99
  tScore: number; // mean 50, sd 10 (clamped 20..80)
  scientificReference: string;
  dimensionExplanationAr: string;
  interpretationAr: string;
  interpretationEn: string;
  color: string;
}

export interface VisualChartsPayload {
  overallRadar: Array<{ subject: string; score: number; fullMark: 100 }>;
  bigFiveRadar: Array<{ trait: string; score: number; benchmark: number; fullMark: 100 }>;
  hexacoRadar: Array<{ trait: string; score: number; fullMark: 100 }>;
  emotionalIntelligence: Array<{ branch: string; score: number; color: string }>;
  attachment: {
    anxiety: number; // 0..100
    avoidance: number; // 0..100
    styleKey: 'secure' | 'anxious' | 'avoidant' | 'fearful';
    styleAr: string;
    styleEn: string;
  };
  communicationStyles: Array<{ style: string; score: number; color: string }>;
  conflictModes: Array<{ mode: string; score: number; fullMark: 100 }>;
  lifeGoalsAlignment: Array<{ domain: string; userScore: number; targetBenchmark: number }>;
  compatibilityMatrix: Array<{
    axisA: string;
    axisB: string;
    synergyScore: number;
    labelAr: string;
  }>;
}

export interface TieredAssessmentReport {
  id: string;
  tier: AnalysisTier;
  tierTitleAr: string;
  tierTitleEn: string;
  questionCount: number;
  answeredCount: number;
  isComplete: boolean;
  completionRate: number;
  consistencyIndex: number; // 0..100 test-retest internal consistency check
  createdAt: string;
  userName: string;
  overallMaturityIndex: number; // 0..100
  overallPercentile: number;
  overallSten: number;
  archetypeTitleAr: string;
  archetypeTitleEn: string;
  executiveSummaryAr: string;
  personalityDescriptionAr: string;
  strengthsAr: string[];
  improvementAreasAr: string[];
  communicationStyleAr: string;
  emotionalMaturitySummaryAr: string;
  // Advanced & Professional sections
  thinkingStyleAnalysisAr?: string;
  decisionMakingAnalysisAr?: string;
  attachmentAnalysisAr?: string;
  conflictResolutionAnalysisAr?: string;
  expectedEmotionalCompatibilityAr?: string;
  familySuccessIndicatorsAr?: string[];
  // Professional-only multi-section dossiers
  valuesAndBeliefsAr?: string;
  lifeGoalsAnalysisAr?: string;
  stressManagementCapacityAr?: string;
  empathyAnalysisAr?: string;
  longTermMaritalCompatibilityAr?: string;
  subscales: SubscaleScoreResult[];
  visualCharts: VisualChartsPayload;
  scientificDisclaimerAr: string;
  scientificReferences: string[];
  rawAnswersSnapshot?: Record<string, number | string>;
}

// ================= TWO-PERSON PSYCHOMETRIC COMPARISON ENGINE TYPES =================

export interface IndividualPsychometricProfile {
  personName: string;
  personLabelAr: string;
  sourceType: 'tiered_report' | 'saved_record' | 'live_assessment' | 'profile_questionnaire';
  bigFive: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    emotionalStability: number;
  };
  hexaco: {
    honestyHumility: number;
    emotionality: number;
    extraversion: number;
    agreeableness: number;
    conscientiousness: number;
    openness: number;
  };
  attachment: {
    anxiety: number;
    avoidance: number;
    styleAr: string;
  };
  emotionalIntelligence: number;
  communicationStyle: {
    assertive: number;
    reflective: number;
    analytical: number;
    expressive: number;
    primaryAr: string;
  };
  conflictResolution: {
    collaborating: number;
    compromising: number;
    accommodating: number;
    competing: number;
    avoiding: number;
    primaryAr: string;
  };
  valuesScore: number;
  lifeGoals: {
    familyStability: number;
    careerGrowth: number;
    intellectualDepth: number;
    socialHarmony: number;
    financialSecurity: number;
  };
  parentingOrientation: number;
}

export interface ComparisonSubIndex {
  key: 'intellectual' | 'emotional' | 'social' | 'family' | 'values' | 'goals';
  titleAr: string;
  titleEn: string;
  score: number; // 0..100
  weight: number;
  scientificReference: string;
  interpretationAr: string;
  strengthsAr: string[];
  risksAr: string[];
}

export interface NineAxisComparisonRow {
  axisKey: string;
  axisNameAr: string;
  personAScore: number;
  personBScore: number;
  delta: number;
  matchScore: number;
  scientificNoteAr: string;
}

export interface TwoPersonComparisonReport {
  id: string;
  createdAt: string;
  personA: IndividualPsychometricProfile;
  personB: IndividualPsychometricProfile;
  overallWeightedCompatibility: number;
  compatibilityClassificationAr: string;
  subIndices: ComparisonSubIndex[]; // 6 distinct compatibility metrics with interpretations
  nineAxesBreakdown: NineAxisComparisonRow[]; // Big Five, HEXACO, Attachment, EI, Communication, Conflict, Values, Life Goals, Parenting
  sharedStrengthsAr: string[];
  growthRecommendationsAr: string[];
  executiveSummaryAr: string;
  scientificReferences: string[];
}




