import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { ProfileStep } from './components/ProfileStep';
import { QuizStep } from './components/QuizStep';
import { AnalyzingStep } from './components/AnalyzingStep';
import { ResultStep } from './components/ResultStep';
import { PrivacyLockScreen } from './components/PrivacyLockScreen';
import { LiveChatModal } from './components/LiveChatModal';
import { BlindDateShowModal } from './components/BlindDateShowModal';
import { DomainHostingModal } from './components/DomainHostingModal';
import { WebsiteSectionsModal, WebsiteTabKey } from './components/WebsiteSectionsModal';
import { AdSenseModal } from './components/AdSenseModal';
import { AdSenseBanner } from './components/AdSenseBanner';
import { UserProfile, PartnerAnalysisResult } from './types';
import { QUIZ_QUESTIONS } from './data/questions';
import { getRealisticPortrait } from './data/portraits';
import { soundManager } from './utils/sound';
import { isPinLockEnabled } from './utils/privacyLock';
import { calculateRealCompatibility } from './utils/realScoringEngine';
import { useAppTheme } from './utils/theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthModal } from './components/AuthModal';
import { SavedResultsHistoryModal } from './components/SavedResultsHistoryModal';
import { PsychologyTestsModal } from './components/PsychologyTestsModal';
import { UserProfileDashboard, DashboardTabKey } from './components/UserProfileDashboard';
import { CoupleInviteModal } from './components/CoupleInviteModal';
import { ArticlesSectionModal } from './components/ArticlesSectionModal';
import { NovelsSectionModal } from './components/NovelsSectionModal';
import { IntelligenceTestModal } from './components/IntelligenceTestModal';
import { OnboardingWizardModal, OnboardingGoal } from './components/OnboardingWizardModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { LegalModal } from './components/LegalModal';
import { ContactFeedbackModal } from './components/ContactFeedbackModal';
import { AnalyticsDashboardModal } from './components/AnalyticsDashboardModal';
import { trackSiteVisit } from './services/analyticsService';
import {
  loadPersistentUserSession,
  savePersistentUserProfile,
  saveTestResultToHistory,
  fetchUserSavedResults,
  fetchUnifiedTestHistory,
} from './services/userHistoryService';

type AppStep = 'profile' | 'quiz' | 'analyzing' | 'result';

// Smooth springy page variants for step transitions
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.985,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.985,
    transition: {
      duration: 0.28,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

function AppContent() {
  const { direction, isRTL, t } = useLanguage();
  const { user, isOwner } = useAuth();
  const [theme] = useAppTheme();
  const [step, setStep] = useState<AppStep>('profile');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<PartnerAnalysisResult | null>(null);
  const [isRegeneratingImage, setIsRegeneratingImage] = useState(false);
  const [isResultUnlocked, setIsResultUnlocked] = useState(false);
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false);
  const [isBlindDateOpen, setIsBlindDateOpen] = useState(false);
  const [isDomainHostingOpen, setIsDomainHostingOpen] = useState(false);
  const [isAdSenseOpen, setIsAdSenseOpen] = useState(false);
  const [isWebsiteSectionsOpen, setIsWebsiteSectionsOpen] = useState(false);
  const [websiteSectionTab, setWebsiteSectionTab] = useState<WebsiteTabKey>('about');
  const [isArticlesModalOpen, setIsArticlesModalOpen] = useState(false);
  const [isNovelsModalOpen, setIsNovelsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isPsychologyTestsOpen, setIsPsychologyTestsOpen] = useState(false);
  const [isIntelligenceModalOpen, setIsIntelligenceModalOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [userProfileDashboardTab, setUserProfileDashboardTab] = useState<DashboardTabKey>('overview');
  const [isCoupleInviteOpen, setIsCoupleInviteOpen] = useState(false);
  const [isOnboardingWizardOpen, setIsOnboardingWizardOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms'>('privacy');
  const [isContactFeedbackOpen, setIsContactFeedbackOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [savedTestsCount, setSavedTestsCount] = useState(0);

  // Automatically track site visit once per session
  useEffect(() => {
    trackSiteVisit();
  }, []);

  // Load persistent visitor or authenticated user session from Cloud Database + LocalStorage
  useEffect(() => {
    let isMounted = true;
    Promise.all([
      loadPersistentUserSession(user),
      fetchUserSavedResults(user),
      fetchUnifiedTestHistory(user),
    ]).then(([session, savedResults, unifiedHistory]) => {
      if (!isMounted) return;
      if (session.profile && !profile) {
        setProfile(session.profile);
      }
      const totalSaved = Math.max(
        savedResults?.length || 0,
        unifiedHistory?.length || 0
      );
      setSavedTestsCount(totalSaved);
    });
    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleOpenContactFeedback = () => {
    soundManager.playTap();
    setIsContactFeedbackOpen(true);
  };

  const handleOpenAnalytics = () => {
    soundManager.playTap();
    setIsAnalyticsOpen(true);
  };

  const handleOpenPrivacyPolicy = () => {
    soundManager.playTap();
    setLegalModalTab('privacy');
    setIsLegalModalOpen(true);
  };

  const handleOpenTermsOfService = () => {
    soundManager.playTap();
    setLegalModalTab('terms');
    setIsLegalModalOpen(true);
  };

  const handleOpenArticles = () => {
    soundManager.playTap();
    setIsArticlesModalOpen(true);
  };

  const handleOpenNovels = () => {
    soundManager.playTap();
    setIsNovelsModalOpen(true);
  };

  const handleOpenIntelligenceTests = () => {
    soundManager.playTap();
    setIsIntelligenceModalOpen(true);
  };

  const handleOpenOnboardingWizard = () => {
    soundManager.playTap();
    setIsOnboardingWizardOpen(true);
  };

  const handleOnboardingSelectDestination = (goal: OnboardingGoal) => {
    setIsOnboardingWizardOpen(false);
    if (goal === 'partner_compatibility') {
      if (step !== 'profile') {
        handleReset();
      } else {
        window.scrollTo({ top: 450, behavior: 'smooth' });
      }
    } else if (goal === 'intelligence_test') {
      setIsIntelligenceModalOpen(true);
    } else if (goal === 'personality_assessment') {
      setIsPsychologyTestsOpen(true);
    } else if (goal === 'blind_date') {
      setIsBlindDateOpen(true);
    } else if (goal === 'articles_science') {
      setIsArticlesModalOpen(true);
    } else if (goal === 'novels_investigation') {
      setIsNovelsModalOpen(true);
    }
  };

  const handleOpenUserDashboard = (tab: DashboardTabKey = 'overview') => {
    soundManager.playTap();
    setUserProfileDashboardTab(tab);
    setIsUserProfileOpen(true);
  };

  const handleLoadHistoricalResult = (savedProfile: UserProfile, savedResult: PartnerAnalysisResult) => {
    soundManager.playResultReveal();
    setProfile(savedProfile);
    setResult(savedResult);
    setIsResultUnlocked(true);
    setStep('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWebsiteSection = (tab: WebsiteTabKey = 'about') => {
    soundManager.playTap();
    setWebsiteSectionTab(tab);
    setIsWebsiteSectionsOpen(true);
  };

  // Start Quiz with Profile
  const handleStart = (userProfile: UserProfile) => {
    soundManager.playPageTransition();
    setProfile(userProfile);
    savePersistentUserProfile(userProfile, user);
    setStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete Quiz -> Trigger AI Analysis & Image Generation
  const handleQuizComplete = async (quizAnswers: Record<number, string>) => {
    if (!profile) return;
    soundManager.playPageTransition();
    setAnswers(quizAnswers);
    setStep('analyzing');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const startTime = Date.now();

    // 1. Pick authentic curated photorealistic portrait for this ethnicity, gender, age & geography
    const curated = getRealisticPortrait(
      profile.ethnicity,
      profile.partnerGender,
      profile.userAge,
      profile.country
    );
    let finalImageUrl = curated.url;

    // Compute real psychometric and mathematical compatibility deterministically from actual answers
    const calculatedScoring = calculateRealCompatibility(profile, quizAnswers);

    try {
      // 2. Call server-side Gemini analysis endpoint
      const response = await fetch('/api/analyze-partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userGender: profile.userGender,
          partnerGender: profile.partnerGender,
          userAge: profile.userAge,
          userName: profile.userName,
          country: profile.country,
          ethnicity: profile.ethnicity,
          educationLevel: profile.educationLevel,
          lifestyleOutlook: profile.lifestyleOutlook,
          partnerFeaturesPreference: profile.partnerFeaturesPreference,
          answers: quizAnswers,
        }),
      });

      const json = await response.json();
      let analysisData: PartnerAnalysisResult;

      if (json && json.data) {
        analysisData = json.data;
        // Strictly reinforce real calculated scores and breakdown
        analysisData.compatibilityScore = calculatedScoring.compatibilityScore;
        analysisData.intellectualScore = calculatedScoring.intellectualScore;
        analysisData.sociologicalScore = calculatedScoring.sociologicalScore;
        analysisData.emotionalScore = calculatedScoring.emotionalScore;
        analysisData.lifestyleScore = calculatedScoring.lifestyleScore;
        analysisData.partnerTraits = calculatedScoring.partnerTraits;
        analysisData.scoringBreakdown = json.data.scoringBreakdown || calculatedScoring;
        analysisData.isRealCalculated = true;
      } else {
        throw new Error('Analysis payload empty');
      }

      // 3. Attempt Gemini image generation via server endpoint with full demographic & ethnic details
      try {
        const imgRes = await fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: analysisData.imagePrompt,
            partnerGender: profile.partnerGender,
            userAge: profile.userAge,
            country: profile.country,
            ethnicity: profile.ethnicity,
            educationLevel: profile.educationLevel,
            lifestyleOutlook: profile.lifestyleOutlook,
            partnerFeaturesPreference: profile.partnerFeaturesPreference,
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

      // Persist result automatically to database for returning visitor/user
      saveTestResultToHistory(user, profile, analysisData).then(() => {
        setSavedTestsCount((prev) => prev + 1);
      });

      // Ensure minimum 3.2s animation time so user feels the magic
      const elapsed = Date.now() - startTime;
      const delayNeeded = Math.max(0, 3200 - elapsed);

      setTimeout(() => {
        setResult(analysisData);
        setIsResultUnlocked(!isPinLockEnabled());
        setStep('result');
        soundManager.playResultReveal();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, delayNeeded);
    } catch (err) {
      console.error('Quiz analysis error:', err);
      // Fallback result with REAL calculated scores and proposed name
      const defaultName = profile.partnerGender === 'female' ? 'نـورة' : 'فيـصل';
      const defaultMeaning =
        profile.partnerGender === 'female'
          ? 'مشتق من النور والضياء؛ يعبر عن شخصية تجمع بين الرزانة الأصيلة، الإشراق، والذكاء الاجتماعي المحبوب.'
          : 'السيف القاطع الصارم في الحق؛ يعبر عن الشهامة، الوقار والقدرة على حماية واحتواء شريكته بحكمة.';

      const fallbackResult: PartnerAnalysisResult = {
        proposedPartnerName: defaultName,
        nameMeaning: defaultMeaning,
        personalityArchetype: 'الروح الواعية والمفكر الاجتماعي المتزن',
        partnerArchetype:
          profile.partnerGender === 'female'
            ? 'سيدة الرقي والهدوء الفكري الملهم'
            : 'السند الحكيم والقيادي النبيل',
        compatibilityScore: calculatedScoring.compatibilityScore,
        intellectualScore: calculatedScoring.intellectualScore,
        sociologicalScore: calculatedScoring.sociologicalScore,
        emotionalScore: calculatedScoring.emotionalScore,
        lifestyleScore: calculatedScoring.lifestyleScore,
        detailedMatchReason: `بناءً على مقاييس التوافق الفكري والاجتماعي المحسوبة رياضياً بدقة خوارزمية (${calculatedScoring.compatibilityScore}%)، شخصيتك تمنحه الأمان والشغف، وشخصيته القادمة من أصول (${profile.ethnicity}) في (${profile.country}) تمنحك الدفء والاحتواء الصادق في كل تفصيلة.`,
        intellectualSynergy: `تتميز العلاقة بتناغم ذهني بنسبة (${calculatedScoring.intellectualScore}%)؛ حيث يتشارك الطرفان أسلوب التفكير العقلاني وتبادل الآراء بإصغاء ناضج مع رؤية مشتركة لبناء المستقبل.`,
        socialHarmony: `تحظى العلاقة بركيزة أسرية متينة بنسبة (${calculatedScoring.sociologicalScore}%) تتوافق مع عادات وتقاليد (${profile.country}) الأصيلة، مع صيانة تامة لخصوصية واستقلال البيت الزوجي.`,
        attachmentStyle: 'ارتباط آمن وتشاركي (Secure Attachment)',
        partnerTraits: calculatedScoring.partnerTraits,
        loveLanguage: 'الوقت النوعي الخاص وكلمات التقدير المتبادلة',
        visualDescription: `ملامح أصيلة ووسيمة تعكس سحر (${profile.ethnicity}) في (${profile.country})، عينان دافئتان تنطقان بالصدق وابتسامة مريحة تلامس الروح.`,
        romanticAdvice:
          'التناغم الفكري بينكما كنز؛ حافظا دائماً على جلسات الحوار الهادئ دون هواتف وشاركا القرارات اليومية بروح الفريق.',
        partnerVibeQuote:
          profile.partnerGender === 'female'
            ? '«في عينيكِ وجدتُ وطناً وسكينة تغنيني عن العالم أجمع»'
            : '«معك فقط، أشعر أن الحياة تسير في اتجاهها الصحيح وأن قلبي في أمان تام»',
        imageUrl: finalImageUrl,
        scoringBreakdown: calculatedScoring,
        isRealCalculated: true,
      };

      // Persist fallback result automatically to database for returning visitor/user
      saveTestResultToHistory(user, profile, fallbackResult).then(() => {
        setSavedTestsCount((prev) => prev + 1);
      });

      setTimeout(() => {
        setResult(fallbackResult);
        setIsResultUnlocked(!isPinLockEnabled());
        setStep('result');
        soundManager.playResultReveal();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2500);
    }
  };

  // Regenerate image variation with demographic & geographic fidelity
  const handleRegenerateImage = async () => {
    if (!profile || !result) return;
    setIsRegeneratingImage(true);

    try {
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
        }),
      });
      const json = await res.json();
      if (json && json.success && json.imageUrl) {
        setResult({ ...result, imageUrl: json.imageUrl });
        setIsRegeneratingImage(false);
        return;
      }

      setResult({ ...result, imageUrl: curated.url });
    } catch {
      // Keep existing
    } finally {
      setIsRegeneratingImage(false);
    }
  };

  const handleReset = () => {
    soundManager.playPageTransition();
    setStep('profile');
    setProfile(null);
    setAnswers({});
    setResult(null);
    setIsResultUnlocked(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      dir={direction}
      className={`min-h-screen ${
        theme === 'light' ? 'bg-white text-[#0f172a]' : 'bg-[#0a0d14] text-[#f8fafc]'
      } flex flex-col selection:bg-blue-600 selection:text-white overflow-x-hidden transition-colors duration-300 ${
        isRTL ? "font-['Alexandria','Tajawal',sans-serif]" : 'font-sans'
      }`}
    >
      {/* Header Navigation with Website Links & Domain Hosting & AdSense */}
      <Header
        onReset={handleReset}
        showReset={step !== 'profile'}
        onOpenLiveChat={() => setIsLiveChatOpen(true)}
        onOpenBlindDate={() => setIsBlindDateOpen(true)}
        onOpenDomainHosting={() => {
          if (isOwner) setIsDomainHostingOpen(true);
        }}
        onOpenWebsiteSection={handleOpenWebsiteSection}
        onOpenAdSense={() => {
          if (isOwner) setIsAdSenseOpen(true);
        }}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenHistory={() => handleOpenUserDashboard('history')}
        onOpenPsychologyTests={() => setIsPsychologyTestsOpen(true)}
        onOpenIntelligenceTests={handleOpenIntelligenceTests}
        onOpenOnboardingWizard={handleOpenOnboardingWizard}
        onOpenUserDashboard={() => handleOpenUserDashboard('overview')}
        onOpenCoupleInvite={() => setIsCoupleInviteOpen(true)}
        onOpenArticles={handleOpenArticles}
        onOpenNovels={handleOpenNovels}
        onOpenContactFeedback={handleOpenContactFeedback}
        onOpenAnalytics={handleOpenAnalytics}
      />

      {/* Main Game Screen with Smooth Framer Motion Page Transitions */}
      <main className="flex-1 flex flex-col justify-center py-4 relative">
        <AnimatePresence mode="wait">
          {step === 'profile' && (
            <motion.div
              key="profile"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <ProfileStep
                onStart={handleStart}
                initialProfile={profile}
                savedTestsCount={savedTestsCount}
                onOpenSavedHistory={() => setIsHistoryModalOpen(true)}
                onOpenBlindDate={() => setIsBlindDateOpen(true)}
                onOpenDomainHosting={isOwner ? () => setIsDomainHostingOpen(true) : undefined}
                onOpenWebsiteSection={handleOpenWebsiteSection}
                onOpenPsychologyTests={() => setIsPsychologyTestsOpen(true)}
                onOpenIntelligenceTests={handleOpenIntelligenceTests}
                onOpenUserDashboard={() => handleOpenUserDashboard('overview')}
                onOpenArticles={handleOpenArticles}
                onOpenNovels={handleOpenNovels}
                onOpenContactFeedback={handleOpenContactFeedback}
              />
            </motion.div>
          )}

          {step === 'quiz' && (
            <motion.div
              key="quiz"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <QuizStep
                questions={QUIZ_QUESTIONS}
                onComplete={handleQuizComplete}
                onBackToProfile={() => setStep('profile')}
              />
            </motion.div>
          )}

          {step === 'analyzing' && profile && (
            <motion.div
              key="analyzing"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <AnalyzingStep profile={profile} />
            </motion.div>
          )}

          {step === 'result' && result && profile && (
            <motion.div
              key={!isResultUnlocked && isPinLockEnabled() ? 'result-locked' : 'result-unlocked'}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              {!isResultUnlocked && isPinLockEnabled() ? (
                <PrivacyLockScreen
                  onUnlock={() => {
                    setIsResultUnlocked(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onBackToHome={handleReset}
                />
              ) : (
                <ResultStep
                  result={result}
                  profile={profile}
                  onRestart={handleReset}
                  onRegenerateImage={handleRegenerateImage}
                  isRegeneratingImage={isRegeneratingImage}
                  onOpenLiveChat={() => setIsLiveChatOpen(true)}
                  onOpenBlindDate={() => setIsBlindDateOpen(true)}
                  onOpenAuth={() => setIsAuthModalOpen(true)}
                  onOpenHistory={() => setIsHistoryModalOpen(true)}
                  onOpenPsychologyTests={() => setIsPsychologyTestsOpen(true)}
                  onOpenIntelligenceTests={handleOpenIntelligenceTests}
                  onOpenArticles={handleOpenArticles}
                  onOpenNovels={handleOpenNovels}
                  onOpenUserDashboard={() => handleOpenUserDashboard('overview')}
                  onOpenCoupleInvite={() => setIsCoupleInviteOpen(true)}
                  onLockResult={() => {
                    setIsResultUnlocked(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Live Chat Modal for Real-Time Compatible Users */}
      <LiveChatModal
        isOpen={isLiveChatOpen}
        onClose={() => setIsLiveChatOpen(false)}
        profile={profile}
        onOpenBlindDate={() => setIsBlindDateOpen(true)}
      />

      {/* The Blind Date Modal (Reciprocal Stages, Rating, Curtain Drop & Open Chat) */}
      <BlindDateShowModal
        isOpen={isBlindDateOpen}
        onClose={() => setIsBlindDateOpen(false)}
        profile={profile}
        result={result}
      />

      {/* Applied Psychology & Relational Articles Modal */}
      <ArticlesSectionModal
        isOpen={isArticlesModalOpen}
        onClose={() => setIsArticlesModalOpen(false)}
      />

      {/* Suspense, Crime, Action & Sci-Fi Novels Modal */}
      <NovelsSectionModal
        isOpen={isNovelsModalOpen}
        onClose={() => setIsNovelsModalOpen(false)}
      />

      {/* Google Cloud, Hosting Purchase, Custom Domain & AdSense Management Modals */}
      <DomainHostingModal
        isOpen={isDomainHostingOpen}
        onClose={() => setIsDomainHostingOpen(false)}
        onOpenAdSense={() => setIsAdSenseOpen(true)}
      />
      <AdSenseModal
        isOpen={isAdSenseOpen}
        onClose={() => setIsAdSenseOpen(false)}
        onOpenDomainHosting={() => setIsDomainHostingOpen(true)}
      />

      {/* Website Sections Modal (About, How It Works, Testimonials, Articles, FAQ, Privacy) */}
      <WebsiteSectionsModal
        isOpen={isWebsiteSectionsOpen}
        onClose={() => setIsWebsiteSectionsOpen(false)}
        initialTab={websiteSectionTab}
        onOpenBlindDate={() => {
          setIsWebsiteSectionsOpen(false);
          setIsBlindDateOpen(true);
        }}
        onStartQuiz={() => {
          setIsWebsiteSectionsOpen(false);
          handleReset();
        }}
      />

      {/* Firebase Auth Modal (Login / Sign Up / Guest) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      {/* Saved Results History Modal (Visitors & Logged-in Users) */}
      <SavedResultsHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        onOpenAuth={() => {
          setIsHistoryModalOpen(false);
          setIsAuthModalOpen(true);
        }}
        onLoadHistoricalResult={handleLoadHistoricalResult}
      />

      {/* Psychology Assessment Suite Modal (User Request) */}
      <PsychologyTestsModal
        isOpen={isPsychologyTestsOpen}
        onClose={() => setIsPsychologyTestsOpen(false)}
        userName={profile?.userName}
        onOpenDashboard={(tab) => {
          setIsPsychologyTestsOpen(false);
          handleOpenUserDashboard(tab || 'overview');
        }}
      />

      {/* User Profile Dashboard & Matches Explorer (User Request) */}
      <UserProfileDashboard
        isOpen={isUserProfileOpen}
        onClose={() => setIsUserProfileOpen(false)}
        profile={profile}
        result={result}
        initialTab={userProfileDashboardTab}
        onProfileUpdated={(newProf) => setProfile(newProf)}
        onOpenPsychologyTests={() => {
          setIsUserProfileOpen(false);
          setIsPsychologyTestsOpen(true);
        }}
        onOpenIntelligenceTest={() => {
          setIsUserProfileOpen(false);
          setIsIntelligenceModalOpen(true);
        }}
        onOpenCoupleInvite={() => {
          setIsUserProfileOpen(false);
          setIsCoupleInviteOpen(true);
        }}
        onOpenLiveChat={() => {
          setIsUserProfileOpen(false);
          setIsLiveChatOpen(true);
        }}
      />

      {/* Couple Real Compatibility Invite Modal */}
      <CoupleInviteModal
        isOpen={isCoupleInviteOpen}
        onClose={() => setIsCoupleInviteOpen(false)}
        profile={profile}
        result={result}
      />

      {/* Multiple Intelligences Assessment Suite (Gardner & McKenzie) */}
      <IntelligenceTestModal
        isOpen={isIntelligenceModalOpen}
        onClose={() => setIsIntelligenceModalOpen(false)}
      />

      {/* Interactive Human Onboarding Wizard (2-Step Guide) */}
      <OnboardingWizardModal
        isOpen={isOnboardingWizardOpen}
        onClose={() => setIsOnboardingWizardOpen(false)}
        onSelectDestination={handleOnboardingSelectDestination}
      />

      {/* Legal & Compliance Modal (Google AdSense & GDPR Ready) */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
      />

      {/* Visitor Contact & Feedback to Email Modal */}
      <ContactFeedbackModal
        isOpen={isContactFeedbackOpen}
        onClose={() => setIsContactFeedbackOpen(false)}
      />

      {/* Visitor Analytics & Usage Tracking Dashboard */}
      <AnalyticsDashboardModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

      {/* Global GDPR & AdSense Cookie Consent Banner */}
      <CookieConsentBanner
        onOpenPrivacyPolicy={handleOpenPrivacyPolicy}
        onOpenTermsOfService={handleOpenTermsOfService}
      />

      {/* Comprehensive Professional Website Footer */}
      <footer className="w-full bg-[#0a0713]/90 border-t border-white/10 pt-10 pb-8 text-gray-400 text-xs backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-right">
            {/* Col 1: Brand & Google Hosting Badge */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔮</span>
                <span className="font-extrabold text-base text-white font-['Alexandria']">
                  مِـرآة القـلوب
                </span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                موقع ومنصة كاشف شريك الحياة والتوافق النفسي وتجربة The Blind Date التفاعلية، لتحليل التوافق الفكري والاجتماعي والعاطفي.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-300 text-[11px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>مستضاف ومحمي على Google Cloud Platform</span>
              </div>
            </div>

            {/* Col 2: Interactive Apps & Quiz */}
            <div>
              <h4 className="font-bold text-white mb-3 text-sm font-['Alexandria']">
                الخدمات التفاعلية
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      handleReset();
                    }}
                    className="hover:text-rose-400 transition cursor-pointer"
                  >
                    اختبار شريك الحياة والتوافق
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      setIsBlindDateOpen(true);
                    }}
                    className="hover:text-rose-400 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>تجربة The Blind Date</span>
                    <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">تفاعلي 💬</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      setIsPsychologyTestsOpen(true);
                    }}
                    className="hover:text-purple-400 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>قسم تحليل الشخصية العلمي</span>
                    <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">معتمد 🔬</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      setIsIntelligenceModalOpen(true);
                    }}
                    className="hover:text-cyan-400 transition cursor-pointer flex items-center gap-1.5 text-cyan-300"
                  >
                    <span>اختبارات الذكاء المتعدد (Gardner & McKenzie)</span>
                    <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-200 text-[10px] font-bold">8 أبعاد 💡</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      setIsOnboardingWizardOpen(true);
                    }}
                    className="hover:text-amber-400 transition cursor-pointer flex items-center gap-1.5 text-amber-300"
                  >
                    <span>المرشد التفاعلي للاستكشاف السريع</span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-200 text-[10px] font-bold">بوصلة 🧭</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      handleOpenUserDashboard('overview');
                    }}
                    className="hover:text-rose-400 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>لوحة ملفي والمتوافقين للتواصل</span>
                    <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">ملفي 👤</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      handleOpenUserDashboard('history');
                    }}
                    className="hover:text-emerald-300 transition cursor-pointer flex items-center gap-1.5 text-emerald-400"
                  >
                    <span>سجل وتطور اختباراتي النفسية</span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">تتبع سحابي 📈</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      setIsCoupleInviteOpen(true);
                    }}
                    className="hover:text-pink-400 transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>دعوة شريك حقيقي للاختبار</span>
                    <span className="text-[10px]">💑</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Website Knowledge & About */}
            <div>
              <h4 className="font-bold text-white mb-3 text-sm font-['Alexandria']">
                عن المنصة والمعرفة
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={handleOpenArticles}
                    className="text-emerald-300 hover:text-emerald-200 font-bold transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>📚 موسوعة المقالات والعلوم النفسية</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleOpenNovels}
                    className="text-amber-300 hover:text-amber-200 font-bold transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>🕵️‍♂️ الروايات والتحقيقات الجنائية</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleOpenWebsiteSection('about')}
                    className="hover:text-rose-400 transition cursor-pointer"
                  >
                    عن المنصة ورؤيتها
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleOpenWebsiteSection('how-it-works')}
                    className="hover:text-rose-400 transition cursor-pointer"
                  >
                    كيف تعمل خوارزمية التوافق؟
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleOpenWebsiteSection('testimonials')}
                    className="hover:text-rose-400 transition cursor-pointer"
                  >
                    آراء وتجارب المستخدمين الموثقة
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleOpenWebsiteSection('faq')}
                    className="hover:text-rose-400 transition cursor-pointer"
                  >
                    الأسئلة الشائعة والدعم الفني
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleOpenContactFeedback}
                    className="text-sky-300 hover:text-sky-200 font-bold transition cursor-pointer flex items-center gap-1.5"
                  >
                    <span>✉️ تواصل معنا وإبداء الملاحظات (one497303@gmail.com)</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Public Launch, Hosting, AdSense & Legal Compliance */}
            <div>
              <h4 className="font-bold text-amber-300 mb-3 text-sm font-['Alexandria'] flex items-center gap-1.5">
                <span>👑</span>
                <span>النشر، الاستضافة، AdSense والأمان</span>
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      setIsDomainHostingOpen(true);
                    }}
                    className="text-blue-300 hover:text-blue-200 transition font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>🚀 رفع الموقع، شراء الاستضافة والدومين</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      setIsAdSenseOpen(true);
                    }}
                    className="text-amber-300 hover:text-amber-200 transition font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>💰 ربط Google AdSense والأرباح</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleOpenAnalytics}
                    className="text-emerald-300 hover:text-emerald-200 transition font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>📊 لوحة إحصائيات الزوار والتحليلات</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleOpenPrivacyPolicy}
                    className="hover:text-emerald-400 transition cursor-pointer text-gray-300 flex items-center gap-1 underline"
                  >
                    <span>🔒 سياسة الخصوصية (Privacy Policy)</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleOpenTermsOfService}
                    className="hover:text-cyan-400 transition cursor-pointer text-gray-300 flex items-center gap-1 underline"
                  >
                    <span>📜 شروط الاستخدام (Terms of Service)</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      localStorage.removeItem('user_cookie_consent_choice');
                      window.location.reload();
                    }}
                    className="hover:text-amber-300 transition cursor-pointer text-gray-400 text-[11px] block pt-1"
                  >
                    🍪 إعادة ضبط ملفات الارتباط (Cookies)
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Global Google AdSense Responsive Footer Banner */}
          <div className="mb-6">
            <AdSenseBanner slot="3456789012" format="auto" />
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-400">
            <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
              <span>{t('footer_rights')}</span>
              <span>•</span>
              <button
                onClick={handleOpenPrivacyPolicy}
                className="hover:text-white transition cursor-pointer underline text-gray-300"
              >
                سياسة الخصوصية
              </button>
              <span>•</span>
              <button
                onClick={handleOpenTermsOfService}
                className="hover:text-white transition cursor-pointer underline text-gray-300"
              >
                شروط الاستخدام
              </button>
              <span>•</span>
              <span className="text-gray-400">Google Cloud Edge CDN (Europe-West1)</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {t('cloud_status')}
              </span>
              <span>{t('ssl_verified')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
