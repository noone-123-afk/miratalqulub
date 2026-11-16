import {
  ComparisonSubIndex,
  IndividualPsychometricProfile,
  NineAxisComparisonRow,
  TieredAssessmentReport,
  TwoPersonComparisonReport,
} from '../types';
import type { UnifiedTestRecord } from '../services/userHistoryService';
import type { CommunityMemberProfile, UserPersonalQuestionnaireData } from '../data/communityProfiles';

function clampScore(n: number): number {
  if (!Number.isFinite(n)) return 50;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function similarityMatch(a: number, b: number): number {
  const diff = Math.abs(a - b);
  return clampScore(100 - diff);
}

// Extraversion / dominance benefit moderately from mild complementarity while avoiding extreme poles
function balancedMatch(a: number, b: number): number {
  const diff = Math.abs(a - b);
  if (diff <= 15) return clampScore(100 - diff * 0.5);
  return clampScore(100 - diff * 0.9);
}

export function profileFromTieredReport(
  report: TieredAssessmentReport,
  overrideName?: string
): IndividualPsychometricProfile {
  const sub = (k: string, fallback = 65) =>
    report.subscales.find((s) => s.key === k)?.percentage ?? fallback;

  const attStyle = report.visualCharts?.attachment?.styleAr || 'نمط التعلق الآمن';
  const commStyles = report.visualCharts?.communicationStyles || [];
  const topComm = [...commStyles].sort((a, b) => b.score - a.score)[0]?.style || 'الحزم المحترم';
  const conflictModes = report.visualCharts?.conflictModes || [];
  const topConf = [...conflictModes].sort((a, b) => b.score - a.score)[0]?.mode || 'التعاون التكاملي';

  return {
    personName: overrideName || report.userName || 'المختبَر',
    personLabelAr: `${overrideName || report.userName} (${report.tierTitleAr})`,
    sourceType: 'tiered_report',
    bigFive: {
      openness: sub('bf_openness'),
      conscientiousness: sub('bf_conscientiousness'),
      extraversion: sub('bf_extraversion'),
      agreeableness: sub('bf_agreeableness'),
      emotionalStability: sub('bf_emotional_stability'),
    },
    hexaco: {
      honestyHumility: sub('hx_honesty_humility'),
      emotionality: sub('hx_emotionality'),
      extraversion: sub('hx_extraversion'),
      agreeableness: sub('hx_agreeableness'),
      conscientiousness: sub('hx_conscientiousness'),
      openness: sub('hx_openness'),
    },
    attachment: {
      anxiety: sub('att_anxiety', 32),
      avoidance: sub('att_avoidance', 30),
      styleAr: attStyle,
    },
    emotionalIntelligence: clampScore(
      (sub('ei_self_awareness') + sub('ei_empathy') + sub('ei_regulation') + sub('ei_social_skill')) / 4
    ),
    communicationStyle: {
      assertive: sub('com_assertive'),
      reflective: sub('com_reflective'),
      analytical: sub('com_analytical'),
      expressive: sub('com_expressive'),
      primaryAr: topComm,
    },
    conflictResolution: {
      collaborating: sub('com_collaborating'),
      compromising: clampScore((sub('bf_agreeableness') + sub('com_assertive')) / 2),
      accommodating: sub('hx_agreeableness'),
      competing: clampScore(sub('com_assertive') * 0.6 + (100 - sub('bf_agreeableness')) * 0.4),
      avoiding: sub('att_avoidance', 30),
      primaryAr: topConf,
    },
    valuesScore: sub('pp_values_meaning'),
    lifeGoals: {
      familyStability: sub('int_parenting_family'),
      careerGrowth: sub('sr_goal_persistence'),
      intellectualDepth: sub('bf_openness'),
      socialHarmony: sub('ei_social_skill'),
      financialSecurity: sub('bf_conscientiousness'),
    },
    parentingOrientation: sub('int_parenting_family'),
  };
}

export function profileFromUnifiedRecord(
  record: UnifiedTestRecord,
  overrideName?: string
): IndividualPsychometricProfile {
  const snap = record.snapshot;
  if (snap && snap.subscales && snap.visualCharts) {
    return profileFromTieredReport(snap as TieredAssessmentReport, overrideName);
  }

  // Reconstruct coherently from standardizedScores or legacy snapshots
  const basePct = clampScore(record.percentage || 70);
  const std = record.standardizedScores || {};
  const dimScores: Array<{ key: string; score: number }> = snap?.dimensionScores || [];
  const findDim = (kw: string, fb: number) =>
    dimScores.find((d) => d.key?.includes(kw))?.score ?? std[kw] ?? fb;

  const openness = clampScore(findDim('openness', basePct));
  const conscientiousness = clampScore(findDim('conscientious', findDim('rule', basePct)));
  const extraversion = clampScore(findDim('extraversion', findDim('warmth', Math.max(40, basePct - 6))));
  const agreeableness = clampScore(findDim('agreeable', findDim('warmth', basePct)));
  const emotionalStability = clampScore(findDim('stability', basePct));

  return {
    personName: overrideName || snap?.userName || record.testTitleAr.slice(0, 28),
    personLabelAr: `${overrideName || record.testTitleAr} (${basePct}%)`,
    sourceType: 'saved_record',
    bigFive: {
      openness,
      conscientiousness,
      extraversion,
      agreeableness,
      emotionalStability,
    },
    hexaco: {
      honestyHumility: clampScore((conscientiousness + agreeableness) / 2),
      emotionality: clampScore(100 - emotionalStability * 0.5),
      extraversion,
      agreeableness,
      conscientiousness,
      openness,
    },
    attachment: {
      anxiety: clampScore(100 - emotionalStability),
      avoidance: clampScore(100 - agreeableness * 0.8),
      styleAr: emotionalStability >= 60 ? 'ارتباط متزن مستقر' : 'ارتباط حساس يحتاج لطمأنة',
    },
    emotionalIntelligence: clampScore((agreeableness + emotionalStability) / 2),
    communicationStyle: {
      assertive: clampScore((conscientiousness + extraversion) / 2),
      reflective: agreeableness,
      analytical: openness,
      expressive: clampScore((extraversion + agreeableness) / 2),
      primaryAr: openness >= conscientiousness ? 'تواصل تحليلي متفتح' : 'تواصل منظم متزن',
    },
    conflictResolution: {
      collaborating: clampScore((agreeableness + emotionalStability + conscientiousness) / 3),
      compromising: agreeableness,
      accommodating: clampScore(agreeableness * 0.8),
      competing: clampScore(100 - agreeableness * 0.6),
      avoiding: clampScore(100 - extraversion * 0.5),
      primaryAr: 'التعاون البناء',
    },
    valuesScore: clampScore((conscientiousness + agreeableness) / 2),
    lifeGoals: {
      familyStability: clampScore((agreeableness + emotionalStability) / 2),
      careerGrowth: clampScore((conscientiousness + openness) / 2),
      intellectualDepth: openness,
      socialHarmony: extraversion,
      financialSecurity: conscientiousness,
    },
    parentingOrientation: clampScore((agreeableness + conscientiousness + emotionalStability) / 3),
  };
}

export function profileFromQuestionnaireOrCommunity(
  source: UserPersonalQuestionnaireData | CommunityMemberProfile,
  overrideName?: string
): IndividualPsychometricProfile {
  const isCommunity = 'dimensionScores' in source;
  const dims = isCommunity
    ? source.dimensionScores
    : {
        extraversion: source.socialEnergyStyle ? 74 : 68,
        emotionalStability: source.stressResponseStyle ? 82 : 68,
        openness: source.intellectualPassion ? 84 : 70,
        agreeableness: source.conflictResolutionProtocol ? 85 : 72,
        conscientiousness: source.financialManagementVision ? 84 : 72,
      };

  const name =
    overrideName || (isCommunity ? source.displayName : source.fullName || 'ملف الاستبيان الشخصي');

  return {
    personName: name,
    personLabelAr: name,
    sourceType: 'profile_questionnaire',
    bigFive: {
      openness: clampScore(dims.openness),
      conscientiousness: clampScore(dims.conscientiousness),
      extraversion: clampScore(dims.extraversion),
      agreeableness: clampScore(dims.agreeableness),
      emotionalStability: clampScore(dims.emotionalStability),
    },
    hexaco: {
      honestyHumility: clampScore((dims.conscientiousness + dims.agreeableness) / 2 + 4),
      emotionality: clampScore(100 - dims.emotionalStability * 0.45),
      extraversion: clampScore(dims.extraversion),
      agreeableness: clampScore(dims.agreeableness),
      conscientiousness: clampScore(dims.conscientiousness),
      openness: clampScore(dims.openness),
    },
    attachment: {
      anxiety: clampScore(100 - dims.emotionalStability),
      avoidance: clampScore(100 - dims.agreeableness * 0.85),
      styleAr: dims.emotionalStability >= 70 ? 'ارتباط آمن' : 'ارتباط حساس نسبياً',
    },
    emotionalIntelligence: clampScore((dims.emotionalStability + dims.agreeableness) / 2),
    communicationStyle: {
      assertive: clampScore((dims.conscientiousness + dims.extraversion) / 2),
      reflective: clampScore(dims.agreeableness),
      analytical: clampScore(dims.openness),
      expressive: clampScore(dims.extraversion),
      primaryAr:
        dims.openness >= dims.extraversion ? 'التحليل والحوار العميق' : 'التواصل الدافئ التفاعلي',
    },
    conflictResolution: {
      collaborating: clampScore((dims.agreeableness + dims.emotionalStability) / 2),
      compromising: clampScore(dims.agreeableness),
      accommodating: clampScore(dims.agreeableness * 0.8),
      competing: clampScore(100 - dims.agreeableness * 0.5),
      avoiding: clampScore(100 - dims.extraversion * 0.5),
      primaryAr: 'الإصلاح التشاركي',
    },
    valuesScore: clampScore((dims.conscientiousness + dims.agreeableness) / 2 + 3),
    lifeGoals: {
      familyStability: clampScore((dims.agreeableness + dims.emotionalStability) / 2),
      careerGrowth: clampScore((dims.conscientiousness + dims.openness) / 2),
      intellectualDepth: clampScore(dims.openness),
      socialHarmony: clampScore(dims.extraversion),
      financialSecurity: clampScore(dims.conscientiousness),
    },
    parentingOrientation: clampScore((dims.agreeableness + dims.conscientiousness) / 2),
  };
}

export function compareTwoPsychometricProfiles(
  personA: IndividualPsychometricProfile,
  personB: IndividualPsychometricProfile
): TwoPersonComparisonReport {
  // 1. Evaluate independent composite score per person across all 9 empirical axes first (AC-28)
  const bigFiveA = clampScore(
    (personA.bigFive.openness +
      personA.bigFive.conscientiousness +
      personA.bigFive.extraversion +
      personA.bigFive.agreeableness +
      personA.bigFive.emotionalStability) /
      5
  );
  const bigFiveB = clampScore(
    (personB.bigFive.openness +
      personB.bigFive.conscientiousness +
      personB.bigFive.extraversion +
      personB.bigFive.agreeableness +
      personB.bigFive.emotionalStability) /
      5
  );

  const hexacoA = clampScore(
    (personA.hexaco.honestyHumility +
      personA.hexaco.agreeableness +
      personA.hexaco.conscientiousness +
      personA.hexaco.openness +
      personA.hexaco.extraversion +
      (100 - Math.abs(personA.hexaco.emotionality - 55) * 0.4)) /
      6
  );
  const hexacoB = clampScore(
    (personB.hexaco.honestyHumility +
      personB.hexaco.agreeableness +
      personB.hexaco.conscientiousness +
      personB.hexaco.openness +
      personB.hexaco.extraversion +
      (100 - Math.abs(personB.hexaco.emotionality - 55) * 0.4)) /
      6
  );

  const attSecA = clampScore(
    100 - (personA.attachment.anxiety * 0.5 + personA.attachment.avoidance * 0.5)
  );
  const attSecB = clampScore(
    100 - (personB.attachment.anxiety * 0.5 + personB.attachment.avoidance * 0.5)
  );

  const commCapA = clampScore(
    (personA.communicationStyle.assertive +
      personA.communicationStyle.reflective +
      personA.communicationStyle.analytical +
      personA.communicationStyle.expressive) /
      4
  );
  const commCapB = clampScore(
    (personB.communicationStyle.assertive +
      personB.communicationStyle.reflective +
      personB.communicationStyle.analytical +
      personB.communicationStyle.expressive) /
      4
  );

  const confCapA = clampScore(
    (personA.conflictResolution.collaborating * 0.55 +
      personA.conflictResolution.compromising * 0.3 +
      (100 - personA.conflictResolution.avoiding) * 0.15)
  );
  const confCapB = clampScore(
    (personB.conflictResolution.collaborating * 0.55 +
      personB.conflictResolution.compromising * 0.3 +
      (100 - personB.conflictResolution.avoiding) * 0.15)
  );

  const goalsMeanA = clampScore(
    (personA.lifeGoals.familyStability +
      personA.lifeGoals.careerGrowth +
      personA.lifeGoals.intellectualDepth +
      personA.lifeGoals.socialHarmony +
      personA.lifeGoals.financialSecurity) /
      5
  );
  const goalsMeanB = clampScore(
    (personB.lifeGoals.familyStability +
      personB.lifeGoals.careerGrowth +
      personB.lifeGoals.intellectualDepth +
      personB.lifeGoals.socialHarmony +
      personB.lifeGoals.financialSecurity) /
      5
  );

  // 2. Compare across the 9 required axes (AC-29)
  const bfTraitMatch =
    (similarityMatch(personA.bigFive.openness, personB.bigFive.openness) +
      similarityMatch(personA.bigFive.conscientiousness, personB.bigFive.conscientiousness) +
      balancedMatch(personA.bigFive.extraversion, personB.bigFive.extraversion) +
      similarityMatch(personA.bigFive.agreeableness, personB.bigFive.agreeableness) +
      similarityMatch(personA.bigFive.emotionalStability, personB.bigFive.emotionalStability)) /
    5;

  const hxTraitMatch =
    (similarityMatch(personA.hexaco.honestyHumility, personB.hexaco.honestyHumility) +
      similarityMatch(personA.hexaco.agreeableness, personB.hexaco.agreeableness) +
      similarityMatch(personA.hexaco.conscientiousness, personB.hexaco.conscientiousness) +
      similarityMatch(personA.hexaco.openness, personB.hexaco.openness) +
      balancedMatch(personA.hexaco.extraversion, personB.hexaco.extraversion) +
      similarityMatch(personA.hexaco.emotionality, personB.hexaco.emotionality)) /
    6;

  // Attachment dyadic pairing penalizes pursue-withdraw mismatch (high anxiety >55 with high avoidance >55)
  const pursueWithdrawPenalty =
    (Math.max(0, personA.attachment.anxiety - 55) *
      Math.max(0, personB.attachment.avoidance - 55) +
      Math.max(0, personB.attachment.anxiety - 55) *
        Math.max(0, personA.attachment.avoidance - 55)) *
    0.012;

  const attMatch = clampScore(
    (similarityMatch(personA.attachment.anxiety, personB.attachment.anxiety) * 0.45 +
      similarityMatch(personA.attachment.avoidance, personB.attachment.avoidance) * 0.45 +
      ((attSecA + attSecB) / 2) * 0.1) -
      pursueWithdrawPenalty
  );

  const eiMatch = clampScore(
    similarityMatch(personA.emotionalIntelligence, personB.emotionalIntelligence) * 0.75 +
      Math.min(personA.emotionalIntelligence, personB.emotionalIntelligence) * 0.25
  );

  const commMatch = clampScore(
    (similarityMatch(personA.communicationStyle.assertive, personB.communicationStyle.assertive) +
      similarityMatch(personA.communicationStyle.reflective, personB.communicationStyle.reflective) +
      similarityMatch(personA.communicationStyle.analytical, personB.communicationStyle.analytical) +
      balancedMatch(personA.communicationStyle.expressive, personB.communicationStyle.expressive)) /
      4
  );

  const conflictMatch = clampScore(
    (similarityMatch(personA.conflictResolution.collaborating, personB.conflictResolution.collaborating) * 0.5 +
      similarityMatch(personA.conflictResolution.compromising, personB.conflictResolution.compromising) * 0.3 +
      similarityMatch(personA.conflictResolution.avoiding, personB.conflictResolution.avoiding) * 0.2)
  );

  const valuesMatch = similarityMatch(personA.valuesScore, personB.valuesScore);

  const goalsMatch = clampScore(
    (similarityMatch(personA.lifeGoals.familyStability, personB.lifeGoals.familyStability) +
      similarityMatch(personA.lifeGoals.careerGrowth, personB.lifeGoals.careerGrowth) +
      similarityMatch(personA.lifeGoals.intellectualDepth, personB.lifeGoals.intellectualDepth) +
      similarityMatch(personA.lifeGoals.socialHarmony, personB.lifeGoals.socialHarmony) +
      similarityMatch(personA.lifeGoals.financialSecurity, personB.lifeGoals.financialSecurity)) /
      5
  );

  const parentingMatch = similarityMatch(personA.parentingOrientation, personB.parentingOrientation);

  const nineAxesBreakdown: NineAxisComparisonRow[] = [
    {
      axisKey: 'big_five',
      axisNameAr: 'العوامل الخمسة الكبرى (Big Five)',
      personAScore: bigFiveA,
      personBScore: bigFiveB,
      delta: Math.abs(bigFiveA - bigFiveB),
      matchScore: clampScore(bfTraitMatch),
      scientificNoteAr:
        bfTraitMatch >= 75
          ? 'تقارب قوي في البنية الشخصية اليومية والانضباط والتعاون.'
          : 'تباين في الإيقاع السلوكي يتطلب تفاهماً على المساحة والتنظيم.',
    },
    {
      axisKey: 'hexaco',
      axisNameAr: 'نموذج هيكساكو والنزاهة (HEXACO)',
      personAScore: hexacoA,
      personBScore: hexacoB,
      delta: Math.abs(hexacoA - hexacoB),
      matchScore: clampScore(hxTraitMatch),
      scientificNoteAr:
        hxTraitMatch >= 75
          ? 'انسجام عالٍ في الصدق-التواضع والشفافية الأخلاقية.'
          : 'فجوة في التوقعات الأخلاقية أو التعبير العاطفي تستوجب الصراحة.',
    },
    {
      axisKey: 'attachment',
      axisNameAr: 'أنماط التعلق والارتباط (ECR-R)',
      personAScore: attSecA,
      personBScore: attSecB,
      delta: Math.abs(attSecA - attSecB),
      matchScore: attMatch,
      scientificNoteAr:
        pursueWithdrawPenalty > 8
          ? 'تنبيه ديناميكية الملاحقة-الانسحاب (Anxious vs Avoidant)؛ ينصح بطقوس طمأنة وحدود واضحة.'
          : attMatch >= 75
          ? 'أمان ارتباطي متناغم يتيح القرب الدافئ دون خوف أو اختناق.'
          : 'اختلاف في الحاجة للقرب العاطفي؛ يُبنى التوازن عبر الوضوح التدريجي.',
    },
    {
      axisKey: 'emotional_intelligence',
      axisNameAr: 'الذكاء العاطفي والتعاطف (EI)',
      personAScore: personA.emotionalIntelligence,
      personBScore: personB.emotionalIntelligence,
      delta: Math.abs(personA.emotionalIntelligence - personB.emotionalIntelligence),
      matchScore: eiMatch,
      scientificNoteAr:
        eiMatch >= 75
          ? 'كفاءة متبادلة في قراءة المشاعر واحتواء الضغوط بلطف.'
          : 'تفاوت في سرعة التقاط الإشارات الشعورية يتطلب تعبيراً لفظياً أوضح.',
    },
    {
      axisKey: 'communication',
      axisNameAr: 'أساليب التواصل والحوار',
      personAScore: commCapA,
      personBScore: commCapB,
      delta: Math.abs(commCapA - commCapB),
      matchScore: commMatch,
      scientificNoteAr:
        commMatch >= 75
          ? 'انسيابية في النقاش وتوافق بين التحليل والإنصات المتبادل.'
          : 'اختلاف في أسلوب النقاش (تحليلي مقابل عاطفي أو صامت)؛ اتفاق على قواعد الحوار يفيدكما.',
    },
    {
      axisKey: 'conflict',
      axisNameAr: 'حل النزاعات وإدارة الخلاف (TKI)',
      personAScore: confCapA,
      personBScore: confCapB,
      delta: Math.abs(confCapA - confCapB),
      matchScore: conflictMatch,
      scientificNoteAr:
        conflictMatch >= 75
          ? 'نضج مشترك في معالجة الخلاف بالبحث عن حلول مربحة للطرفين.'
          : 'احتمال تباين ردود الفعل وقت الغضب؛ تجنب الصمت العقابي والهجوم المباشر.',
    },
    {
      axisKey: 'values',
      axisNameAr: 'القيم والمعتقدات الجوهرية',
      personAScore: personA.valuesScore,
      personBScore: personB.valuesScore,
      delta: Math.abs(personA.valuesScore - personB.valuesScore),
      matchScore: valuesMatch,
      scientificNoteAr:
        valuesMatch >= 78
          ? 'بوصلة أخلاقية وقيمية موحدة تمثل أقوى ضمانات الديمومة الزوجية.'
          : 'تباين في أولويات القيم؛ يتطلب حواراً صريحاً حول الثوابت المشتركة.',
    },
    {
      axisKey: 'life_goals',
      axisNameAr: 'أهداف الحياة والتخطيط المستقبلي',
      personAScore: goalsMeanA,
      personBScore: goalsMeanB,
      delta: Math.abs(goalsMeanA - goalsMeanB),
      matchScore: goalsMatch,
      scientificNoteAr:
        goalsMatch >= 75
          ? 'رؤية متلاقية في بناء الأسرة والطموح العملي والمالي.'
          : 'اختلاف في إيقاع الأولويات بين الاستقرار الأسري والطموح الفردي.',
    },
    {
      axisKey: 'parenting',
      axisNameAr: 'التوجه الأسري والتربوي',
      personAScore: personA.parentingOrientation,
      personBScore: personB.parentingOrientation,
      delta: Math.abs(personA.parentingOrientation - personB.parentingOrientation),
      matchScore: parentingMatch,
      scientificNoteAr:
        parentingMatch >= 75
          ? 'توافق في فلسفة التربية، الدفء العائلي، وصناعة القدوة الأبوية.'
          : 'يُنصح بالاتفاق المسبق على فلسفة التربية والحدود الأسرية.',
    },
  ];

  // 3. Synthesize 6 Scored Compatibility Sub-Indices (AC-30 & AC-31)
  const intellectualScore = clampScore(
    similarityMatch(personA.bigFive.openness, personB.bigFive.openness) * 0.45 +
      similarityMatch(personA.communicationStyle.analytical, personB.communicationStyle.analytical) * 0.3 +
      similarityMatch(personA.lifeGoals.intellectualDepth, personB.lifeGoals.intellectualDepth) * 0.25
  );

  const emotionalScore = clampScore(attMatch * 0.55 + eiMatch * 0.45);

  const socialScore = clampScore(
    balancedMatch(personA.bigFive.extraversion, personB.bigFive.extraversion) * 0.35 +
      commMatch * 0.4 +
      similarityMatch(personA.lifeGoals.socialHarmony, personB.lifeGoals.socialHarmony) * 0.25
  );

  const familyScore = clampScore(
    parentingMatch * 0.45 +
      conflictMatch * 0.35 +
      similarityMatch(personA.lifeGoals.familyStability, personB.lifeGoals.familyStability) * 0.2
  );

  const valuesIdxScore = clampScore(
    valuesMatch * 0.55 +
      similarityMatch(personA.hexaco.honestyHumility, personB.hexaco.honestyHumility) * 0.45
  );

  const goalsIdxScore = clampScore(
    goalsMatch * 0.65 +
      similarityMatch(personA.bigFive.conscientiousness, personB.bigFive.conscientiousness) * 0.35
  );

  const subIndices: ComparisonSubIndex[] = [
    {
      key: 'intellectual',
      titleAr: 'التوافق الفكري والمعرفي',
      titleEn: 'Intellectual Compatibility',
      score: intellectualScore,
      weight: 0.16,
      scientificReference: 'Big Five Openness & Burleson Cognitive Complexity',
      interpretationAr:
        intellectualScore >= 75
          ? 'تناغم ذهني رائع يغذي الحوارات العميقة والاهتمامات المعرفية المشتركة.'
          : 'تنوع فكري يتطلب احتراماً متبادلاً لطريقة تفكير ومعالجة كل طرف.',
      strengthsAr:
        intellectualScore >= 70
          ? ['عمق الحوار الفكري وتقارب الفضول المعرفي', 'وضوح تحليلي متقارب في النقاشات']
          : ['تنوع معرفي يتيح التكامل إذا توفّر الاحترام'],
      risksAr:
        intellectualScore < 65
          ? ['احتمال الفتور الحواري أو اختلاف اهتمامات القراءة والمعرفة']
          : [],
    },
    {
      key: 'emotional',
      titleAr: 'التوافق العاطفي والارتباطي',
      titleEn: 'Emotional & Attachment Compatibility',
      score: emotionalScore,
      weight: 0.22,
      scientificReference: 'Bowlby Attachment (ECR-R) & Mayer-Salovey EI',
      interpretationAr:
        emotionalScore >= 75
          ? 'أمان وجداني مشترك وقدرة رفيعة على الاحتواء العاطفي والتطمين.'
          : 'تفاوت في احتياجات القرب العاطفي واليقظة الانفعالية يستدعي مراعاةً واضحة.',
      strengthsAr:
        emotionalScore >= 70
          ? ['أمان ارتباطي عالٍ وتوازن في التعبير العاطفي', 'قدرة متبادلة على قراءة المشاعر']
          : ['فرصة لتطوير مهارات التطمين المتبادل والإنصات الوجداني'],
      risksAr:
        emotionalScore < 65
          ? ['خطر سوء فهم الصمت أو الاختلاف في سرعة الاستجابة العاطفية']
          : [],
    },
    {
      key: 'social',
      titleAr: 'التوافق الاجتماعي والتواصلي',
      titleEn: 'Social & Communication Compatibility',
      score: socialScore,
      weight: 0.14,
      scientificReference: 'Gottman Sound House & Rosenberg NVC',
      interpretationAr:
        socialScore >= 75
          ? 'توازن جذاب في النشاط الاجتماعي وتكامل مريح في إدارة العلاقات مع المحيط.'
          : 'اختلاف في الحاجة للانبساط الاجتماعي مقابل الخصوصية الهادئة.',
      strengthsAr: ['توافق الإيقاع الاجتماعي واحترام المساحة الشخصية'],
      risksAr:
        socialScore < 65
          ? ['تضارب محتمل حول كثرة الزيارات العائلية والاجتماعية']
          : [],
    },
    {
      key: 'family',
      titleAr: 'التوافق الأسري وإدارة الخلافات',
      titleEn: 'Family & Conflict Management Compatibility',
      score: familyScore,
      weight: 0.18,
      scientificReference: 'Bowen Family Systems & Thomas-Kilmann (TKI)',
      interpretationAr:
        familyScore >= 75
          ? 'جاهزية عالية لتأسيس بيت هادئ بحدود صحية وتوجه تربوي متوافق.'
          : 'يتطلب الاتفاق المسبق على آلية حسم الخلاف والحدود مع العائلتين.',
      strengthsAr: ['تشابه الرؤية التربوية وأسلوب حل النزاعات البناء'],
      risksAr:
        familyScore < 65
          ? ['اختلاف في مرونة التعامل وقت النزاع أو الحدود مع المحيط']
          : [],
    },
    {
      key: 'values',
      titleAr: 'التوافق القيمي والأخلاقي',
      titleEn: 'Values & Integrity Compatibility',
      score: valuesIdxScore,
      weight: 0.16,
      scientificReference: 'Schwartz Basic Values & HEXACO Honesty-Humility',
      interpretationAr:
        valuesIdxScore >= 78
          ? 'اتحاد عميق في البوصلة الأخلاقية والصدق والنزاهة، وهو الحجر الأساس للثقة المطلقة.'
          : 'فروق واضحة في نسق القيم الأولوية تتطلب شفافية قبل الارتباط الرسمي.',
      strengthsAr: ['وضوح الضمير الأخلاقي وتقارب معايير الأمانة والوفاء'],
      risksAr:
        valuesIdxScore < 65
          ? ['تضارب محتمل في القرارات الأخلاقية والمجتمعية الحساسة']
          : [],
    },
    {
      key: 'goals',
      titleAr: 'توافق أهداف الحياة والمستقبل',
      titleEn: 'Life Goals Compatibility',
      score: goalsIdxScore,
      weight: 0.14,
      scientificReference: 'Seligman PERMA & Emmons Personal Strivings',
      interpretationAr:
        goalsIdxScore >= 75
          ? 'مسار طموحات متوازٍ يدعم الشراكة المالية والمهنية والأسرية طويلة المدى.'
          : 'يحتاج الطرفان لمواءمة خطط الاستقرار والعمل حتى لا تتعارض الأولويات.',
      strengthsAr: ['اتفاق واقعي على الخطة المالية والمهنية والانضباط التخطيطي'],
      risksAr:
        goalsIdxScore < 65
          ? ['تباين سرعة الإنجاز والطموح العملي بين الشريكين']
          : [],
    },
  ];

  const overallWeightedCompatibility = clampScore(
    subIndices.reduce((acc, item) => acc + item.score * item.weight, 0)
  );

  let compatibilityClassificationAr = 'توافق متزن واعد وقابل للارتقاء';
  if (overallWeightedCompatibility >= 88) {
    compatibilityClassificationAr = 'تناغم استثنائي نادر واستقرار طويل الأمد';
  } else if (overallWeightedCompatibility >= 75) {
    compatibilityClassificationAr = 'توافق علمي مرتفع وبنية شراكة متينة';
  } else if (overallWeightedCompatibility >= 60) {
    compatibilityClassificationAr = 'توافق جيد يحتاج لمهارات حوار وإدارة اختلافات';
  } else {
    compatibilityClassificationAr = 'تباين شخصي ملموس يتطلب حواراً عميقاً ومراجعة الأولويات';
  }

  const sharedStrengthsAr = [
    ...nineAxesBreakdown
      .filter((r) => r.matchScore >= 75)
      .slice(0, 4)
      .map((r) => `${r.axisNameAr} (${r.matchScore}%): ${r.scientificNoteAr}`),
  ];
  if (sharedStrengthsAr.length === 0) {
    sharedStrengthsAr.push('فرصة لبناء تكامل نوعي في المهارات المختلفة عبر الوعي والتفاهم الصريح.');
  }

  const growthRecommendationsAr = [
    ...nineAxesBreakdown
      .filter((r) => r.matchScore < 72)
      .slice(0, 4)
      .map((r) => `تطوير محور «${r.axisNameAr}» (${r.matchScore}%): ${r.scientificNoteAr}`),
    'اعتماد مبدأ الحوار الأسبوعي الهادئ دون أحكام وتفعيل طقوس الامتنان والتقدير المتبادل.',
  ];

  const executiveSummaryAr = `تحليل مقارنة شخصيتين بين «${personA.personName}» و«${personB.personName}» عبر 9 محاور سيكومترية و6 مؤشرات توافقية، أظهر معامل توافق إجمالي موزون قدره ${overallWeightedCompatibility}% (${compatibilityClassificationAr}). أعلى نقاط الانسجام برزت في «${[...subIndices].sort((a, b) => b.score - a.score)[0]?.titleAr}» (${[...subIndices].sort((a, b) => b.score - a.score)[0]?.score}%).`;

  return {
    id: `cmp_${Date.now()}`,
    createdAt: new Date().toISOString(),
    personA,
    personB,
    overallWeightedCompatibility,
    compatibilityClassificationAr,
    subIndices,
    nineAxesBreakdown,
    sharedStrengthsAr,
    growthRecommendationsAr,
    executiveSummaryAr,
    scientificReferences: [
      'Costa & McCrae (1992) Big Five Model',
      'Ashton & Lee (2004) HEXACO-PI-R',
      'Fraley et al. (2000) ECR-R Adult Attachment',
      'Salovey & Mayer (1990) Emotional Intelligence',
      'Thomas & Kilmann (1974) Conflict Modes (TKI)',
      'Gottman (1999) & Bowen (1978) Relational Systems',
      'Schwartz (1992) Values & Seligman PERMA',
    ],
  };
}
