import type { User } from 'firebase/auth';
import { UserProfile, PartnerAnalysisResult } from '../types';
import type { DetectedNationalityProfile } from './locationNationalityDetector';

export interface RunCompatibilityAnalysisParams {
  profile: UserProfile;
  quizAnswers: Record<number, string>;
  user: User | null;
  onProfileResolved: (updatedProfile: UserProfile) => void;
  onSavedToHistory: () => void;
}

export async function runCompatibilityAnalysis({
  profile,
  quizAnswers,
  user,
  onProfileResolved,
  onSavedToHistory,
}: RunCompatibilityAnalysisParams): Promise<PartnerAnalysisResult> {
  const startTime = Date.now();

  const [
    { detectUserLocationAndNationality, getNationalityEntryByCountry },
    { getRealisticPortrait },
    { calculateRealCompatibility },
    historySvc,
  ] = await Promise.all([
    import('./locationNationalityDetector'),
    import('../data/portraits'),
    import('./realScoringEngine'),
    import('../services/userHistoryService'),
  ]);

  const resolvedLocation: DetectedNationalityProfile =
    (await detectUserLocationAndNationality({
      partnerGender: profile.partnerGender,
      fallbackCountry: profile.country,
      answers: quizAnswers,
    })) || getNationalityEntryByCountry(profile.country, profile.partnerGender);

  const activeProfile: UserProfile = {
    ...profile,
    country: resolvedLocation.countryNameAr || profile.country,
    ethnicity: resolvedLocation.ethnicityTag || profile.ethnicity,
    detectedCountryCode: resolvedLocation.countryCode,
    detectedNationalityAr: resolvedLocation.nationalityAr,
    detectedNationalityEn: resolvedLocation.nationalityEn,
    detectedEthnicTraitsPrompt: resolvedLocation.ethnicFacialTraitsPromptEn,
    detectedEthnicTraitsAr: resolvedLocation.ethnicFacialTraitsDescriptionAr,
    isLocationAutoDetected: true,
  };

  onProfileResolved(activeProfile);
  historySvc.savePersistentUserProfile(activeProfile, user);

  const curated = getRealisticPortrait(
    activeProfile.ethnicity,
    activeProfile.partnerGender,
    activeProfile.userAge,
    activeProfile.country
  );
  let finalImageUrl = curated.url;

  const calculatedScoring = calculateRealCompatibility(activeProfile, quizAnswers);

  try {
    const response = await fetch('/api/analyze-partner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userGender: activeProfile.userGender,
        partnerGender: activeProfile.partnerGender,
        userAge: activeProfile.userAge,
        userName: activeProfile.userName,
        country: activeProfile.country,
        ethnicity: activeProfile.ethnicity,
        educationLevel: activeProfile.educationLevel,
        lifestyleOutlook: activeProfile.lifestyleOutlook,
        partnerFeaturesPreference: activeProfile.partnerFeaturesPreference,
        detectedCountryCode: activeProfile.detectedCountryCode,
        detectedNationalityAr: activeProfile.detectedNationalityAr,
        detectedNationalityEn: activeProfile.detectedNationalityEn,
        detectedEthnicTraitsPrompt: activeProfile.detectedEthnicTraitsPrompt,
        detectedEthnicTraitsAr: activeProfile.detectedEthnicTraitsAr,
        answers: quizAnswers,
      }),
    });

    const json = await response.json();
    let analysisData: PartnerAnalysisResult;

    if (json && json.data) {
      analysisData = json.data;
      analysisData.compatibilityScore = calculatedScoring.compatibilityScore;
      analysisData.intellectualScore = calculatedScoring.intellectualScore;
      analysisData.sociologicalScore = calculatedScoring.sociologicalScore;
      analysisData.emotionalScore = calculatedScoring.emotionalScore;
      analysisData.lifestyleScore = calculatedScoring.lifestyleScore;
      analysisData.partnerTraits = calculatedScoring.partnerTraits;
      analysisData.scoringBreakdown = json.data.scoringBreakdown || calculatedScoring;
      analysisData.isRealCalculated = true;
      analysisData.detectedNationalityAr =
        analysisData.detectedNationalityAr || activeProfile.detectedNationalityAr;
      analysisData.detectedEthnicTraitsAr =
        analysisData.detectedEthnicTraitsAr || activeProfile.detectedEthnicTraitsAr;
    } else {
      throw new Error('Analysis payload empty');
    }

    try {
      const imgRes = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: analysisData.imagePrompt,
          partnerGender: activeProfile.partnerGender,
          userAge: activeProfile.userAge,
          country: activeProfile.country,
          ethnicity: activeProfile.ethnicity,
          educationLevel: activeProfile.educationLevel,
          lifestyleOutlook: activeProfile.lifestyleOutlook,
          partnerFeaturesPreference: activeProfile.partnerFeaturesPreference,
          detectedCountryCode: activeProfile.detectedCountryCode,
          detectedNationalityAr: activeProfile.detectedNationalityAr,
          detectedNationalityEn: activeProfile.detectedNationalityEn,
          detectedEthnicTraitsPrompt: activeProfile.detectedEthnicTraitsPrompt,
        }),
      });
      const imgJson = await imgRes.json();
      if (imgJson && imgJson.success && imgJson.imageUrl) {
        finalImageUrl = imgJson.imageUrl;
      }
    } catch (imgErr) {
      console.warn('AI image generation fallback triggered:', imgErr);
    }

    analysisData.imageUrl = finalImageUrl;

    historySvc.saveTestResultToHistory(user, activeProfile, analysisData).then(() => {
      onSavedToHistory();
    });

    const elapsed = Date.now() - startTime;
    const delayNeeded = Math.max(0, 3200 - elapsed);
    if (delayNeeded > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayNeeded));
    }

    return analysisData;
  } catch (err) {
    console.error('Quiz analysis error:', err);
    const defaultName = activeProfile.partnerGender === 'female' ? 'نـورة' : 'فيـصل';
    const defaultMeaning =
      activeProfile.partnerGender === 'female'
        ? 'مشتق من النور والضياء؛ يعبر عن شخصية تجمع بين الرزانة الأصيلة، الإشراق، والذكاء الاجتماعي المحبوب.'
        : 'السيف القاطع الصارم في الحق؛ يعبر عن الشهامة، الوقار والقدرة على حماية واحتواء شريكته بحكمة.';

    const fallbackResult: PartnerAnalysisResult = {
      proposedPartnerName: defaultName,
      nameMeaning: defaultMeaning,
      personalityArchetype: 'الروح الواعية والمفكر الاجتماعي المتزن',
      partnerArchetype:
        activeProfile.partnerGender === 'female'
          ? 'سيدة الرقي والهدوء الفكري الملهم'
          : 'السند الحكيم والقيادي النبيل',
      compatibilityScore: calculatedScoring.compatibilityScore,
      intellectualScore: calculatedScoring.intellectualScore,
      sociologicalScore: calculatedScoring.sociologicalScore,
      emotionalScore: calculatedScoring.emotionalScore,
      lifestyleScore: calculatedScoring.lifestyleScore,
      detailedMatchReason: `بناءً على مقاييس التوافق الفكري والاجتماعي المحسوبة رياضياً بدقة خوارزمية (${calculatedScoring.compatibilityScore}%)، شخصيتك تمنحه الأمان والشغف، وشخصيته القادمة من أصول (${activeProfile.detectedNationalityAr || activeProfile.ethnicity}) في (${activeProfile.country}) تمنحك الدفء والاحتواء الصادق في كل تفصيلة.`,
      intellectualSynergy: `تتميز العلاقة بتناغم ذهني بنسبة (${calculatedScoring.intellectualScore}%)؛ حيث يتشارك الطرفان أسلوب التفكير العقلاني وتبادل الآراء بإصغاء ناضج مع رؤية مشتركة لبناء المستقبل.`,
      socialHarmony: `تحظى العلاقة بركيزة أسرية متينة بنسبة (${calculatedScoring.sociologicalScore}%) تتوافق مع عادات وتقاليد (${activeProfile.country}) الأصيلة، مع صيانة تامة لخصوصية واستقلال البيت الزوجي.`,
      attachmentStyle: 'ارتباط آمن وتشاركي (Secure Attachment)',
      partnerTraits: calculatedScoring.partnerTraits,
      loveLanguage: 'الوقت النوعي الخاص وكلمات التقدير المتبادلة',
      visualDescription:
        activeProfile.detectedEthnicTraitsAr ||
        `ملامح أصيلة ووسيمة تعكس سحر (${activeProfile.ethnicity}) في (${activeProfile.country})، عينان دافئتان تنطقان بالصدق وابتسامة مريحة تلامس الروح.`,
      romanticAdvice:
        'التناغم الفكري بينكما كنز؛ حافظا دائماً على جلسات الحوار الهادئ دون هواتف وشاركا القرارات اليومية بروح الفريق.',
      partnerVibeQuote:
        activeProfile.partnerGender === 'female'
          ? '«في عينيكِ وجدتُ وطناً وسكينة تغنيني عن العالم أجمع»'
          : '«معك فقط، أشعر أن الحياة تسير في اتجاهها الصحيح وأن قلبي في أمان تام»',
      imageUrl: finalImageUrl,
      scoringBreakdown: calculatedScoring,
      isRealCalculated: true,
      detectedNationalityAr: activeProfile.detectedNationalityAr,
      detectedEthnicTraitsAr: activeProfile.detectedEthnicTraitsAr,
    };

    historySvc.saveTestResultToHistory(user, activeProfile, fallbackResult).then(() => {
      onSavedToHistory();
    });

    await new Promise((resolve) => setTimeout(resolve, 2500));
    return fallbackResult;
  }
}

export async function regeneratePartnerPortrait(
  profile: UserProfile,
  result: PartnerAnalysisResult
): Promise<string | null> {
  const { getRealisticPortrait } = await import('../data/portraits');
  const curated = getRealisticPortrait(
    profile.ethnicity,
    profile.partnerGender,
    profile.userAge,
    profile.country
  );
  const res = await fetch('/api/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: result.imagePrompt
        ? `${result.imagePrompt}, different candid angle, natural expression`
        : undefined,
      partnerGender: profile.partnerGender,
      userAge: profile.userAge,
      country: profile.country,
      ethnicity: profile.ethnicity,
      educationLevel: profile.educationLevel,
      lifestyleOutlook: profile.lifestyleOutlook,
      partnerFeaturesPreference: profile.partnerFeaturesPreference,
      detectedCountryCode: profile.detectedCountryCode,
      detectedNationalityAr: profile.detectedNationalityAr,
      detectedNationalityEn: profile.detectedNationalityEn,
      detectedEthnicTraitsPrompt: profile.detectedEthnicTraitsPrompt,
    }),
  });
  const json = await res.json();
  if (json && json.success && json.imageUrl) {
    return json.imageUrl;
  }
  return curated.url;
}
