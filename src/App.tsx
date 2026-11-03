import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
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
import { AboutUsPage } from './pages/AboutUsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { ContactUsPage } from './pages/ContactUsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FAQPage } from './pages/FAQPage';
import { SourcesMethodologyPage } from './pages/SourcesMethodologyPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { NovelsDirectoryPage } from './pages/NovelsDirectoryPage';
import { NovelDetailPage } from './pages/NovelDetailPage';
import { ChapterReaderPage } from './pages/ChapterReaderPage';
import { AdminCMSPage } from './pages/AdminCMSPage';
import { PersonalityTestsPage } from './pages/PersonalityTestsPage';
import { ArticlesEncyclopediaPage } from './pages/ArticlesEncyclopediaPage';
import { HomePage } from './pages/HomePage';

export type SitePage =
  | 'home'
  | 'about'
  | 'how-it-works'
  | 'privacy'
  | 'terms'
  | 'contact'
  | 'faq'
  | 'methodology'
  | 'disclaimer'
  | 'novels'
  | 'novel-detail'
  | 'chapter-reader'
  | 'admin-cms'
  | 'personality-tests'
  | 'articles';
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
  const { direction, isRTL, language, t } = useLanguage();
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
  const [currentPage, setCurrentPage] = useState<SitePage>('home');
  const [activeNovelId, setActiveNovelId] = useState<string>('room_104_cipher');
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  // Synchronize URL hash with currentPage for direct deep linking and SEO crawlers
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.toLowerCase().replace('#/', '').replace('#', '').trim();
      const parts = rawHash.split('/');
      const section = parts[0];

      if (section === 'about' || section === 'about-us') {
        setCurrentPage('about');
      } else if (section === 'how-it-works' || section === 'howitworks') {
        setCurrentPage('how-it-works');
      } else if (section === 'privacy' || section === 'privacy-policy') {
        setCurrentPage('privacy');
      } else if (section === 'terms' || section === 'terms-of-service') {
        setCurrentPage('terms');
      } else if (section === 'contact' || section === 'contact-us') {
        setCurrentPage('contact');
      } else if (section === 'faq') {
        setCurrentPage('faq');
      } else if (section === 'methodology' || section === 'sources') {
        setCurrentPage('methodology');
      } else if (section === 'disclaimer') {
        setCurrentPage('disclaimer');
      } else if (section === 'admin' || section === 'admin-cms') {
        setCurrentPage('admin-cms');
      } else if (section === 'articles' || section === 'research') {
        setCurrentPage('articles');
      } else if (
        section === 'personality-tests' ||
        section === 'personality' ||
        section === 'mbti' ||
        section === 'big-five'
      ) {
        setCurrentPage('personality-tests');
      } else if (section === 'novels') {
        if (parts[1]) {
          setActiveNovelId(parts[1]);
          if (parts[2] === 'chapter' && parts[3]) {
            const chNum = parseInt(parts[3], 10);
            setActiveChapterIndex(Math.max(0, (isNaN(chNum) ? 1 : chNum) - 1));
            setCurrentPage('chapter-reader');
          } else {
            setCurrentPage('novel-detail');
          }
        } else {
          setCurrentPage('novels');
        }
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigatePage = (page: string) => {
    soundManager.playTap();
    const validPages: SitePage[] = [
      'about',
      'how-it-works',
      'privacy',
      'terms',
      'contact',
      'faq',
      'methodology',
      'disclaimer',
      'novels',
      'admin-cms',
      'personality-tests',
      'articles',
    ];

    if (validPages.includes(page as SitePage)) {
      setCurrentPage(page as SitePage);
      window.location.hash = `#/${page}`;
    } else {
      setCurrentPage('home');
      if (window.location.hash) {
        history.pushState(null, '', window.location.pathname);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectNovel = (novelId: string) => {
    soundManager.playTap();
    setActiveNovelId(novelId);
    setCurrentPage('novel-detail');
    window.location.hash = `#/novels/${novelId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadChapter = (novelId: string, chapterIdx: number) => {
    soundManager.playTap();
    setActiveNovelId(novelId);
    setActiveChapterIndex(chapterIdx);
    setCurrentPage('chapter-reader');
    window.location.hash = `#/novels/${novelId}/chapter/${chapterIdx + 1}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      {/* Top Navigation Bar (Navbar) structured around the 3 Primary Pathways + My Profile */}
      <Navbar
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
        onNavigatePage={handleNavigatePage}
        onDataDeleted={() => setSavedTestsCount(0)}
        currentPage={currentPage}
      />

      {/* Main Game Screen or Dedicated Full Pages with Smooth Framer Motion Transitions */}
      <main className="flex-1 flex flex-col justify-center py-4 relative">
        {currentPage === 'about' && (
          <AboutUsPage
            onBackToHome={() => handleNavigatePage('home')}
            onNavigatePage={handleNavigatePage}
            onStartQuiz={() => {
              handleNavigatePage('home');
              handleReset();
            }}
            onOpenPsychologyTests={() => setIsPsychologyTestsOpen(true)}
          />
        )}

        {currentPage === 'how-it-works' && (
          <HowItWorksPage
            onBackToHome={() => handleNavigatePage('home')}
            onNavigatePage={handleNavigatePage}
            onStartQuiz={() => {
              handleNavigatePage('home');
              handleReset();
            }}
            onOpenPsychologyTests={() => setIsPsychologyTestsOpen(true)}
            onOpenIntelligenceTests={handleOpenIntelligenceTests}
          />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicyPage
            onBackToHome={() => handleNavigatePage('home')}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'terms' && (
          <TermsOfServicePage
            onBackToHome={() => handleNavigatePage('home')}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'contact' && (
          <ContactUsPage
            onBackToHome={() => handleNavigatePage('home')}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'faq' && (
          <FAQPage
            onBackToHome={() => handleNavigatePage('home')}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'methodology' && (
          <SourcesMethodologyPage
            onBackToHome={() => handleNavigatePage('home')}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'disclaimer' && (
          <DisclaimerPage
            onBackToHome={() => handleNavigatePage('home')}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'novels' && (
          <NovelsDirectoryPage
            onBackToHome={() => handleNavigatePage('home')}
            onSelectNovel={handleSelectNovel}
            onReadChapter={handleReadChapter}
          />
        )}

        {currentPage === 'novel-detail' && (
          <NovelDetailPage
            novelId={activeNovelId}
            onBackToDirectory={() => handleNavigatePage('novels')}
            onReadChapter={handleReadChapter}
          />
        )}

        {currentPage === 'chapter-reader' && (
          <ChapterReaderPage
            novelId={activeNovelId}
            chapterIndex={activeChapterIndex}
            onBackToNovel={() => handleSelectNovel(activeNovelId)}
            onNavigateChapter={(idx) => handleReadChapter(activeNovelId, idx)}
          />
        )}

        {currentPage === 'admin-cms' && (
          <AdminCMSPage
            onBackToHome={() => handleNavigatePage('home')}
            onOpenAnalyticsModal={handleOpenAnalytics}
          />
        )}

        {currentPage === 'personality-tests' && (
          <PersonalityTestsPage
            onBackToHome={() => handleNavigatePage('home')}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'articles' && (
          <ArticlesEncyclopediaPage
            onBackToHome={() => handleNavigatePage('home')}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage === 'home' && (
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
              <HomePage
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
      )}
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
        onOpenStandalonePage={() => handleNavigatePage('articles')}
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

      {/* Structured Bilingual & Theme-Aware Footer (3 Pathways + My Profile & Permanent Data Deletion) */}
      <Footer
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        onResetHome={handleReset}
        onOpenBlindDate={() => setIsBlindDateOpen(true)}
        onOpenPsychologyTests={() => setIsPsychologyTestsOpen(true)}
        onOpenIntelligenceTests={handleOpenIntelligenceTests}
        onOpenUserDashboard={() => handleOpenUserDashboard('overview')}
        onOpenHistory={() => handleOpenUserDashboard('history')}
        onOpenArticles={handleOpenArticles}
        onOpenNovels={handleOpenNovels}
        onOpenCoupleInvite={() => setIsCoupleInviteOpen(true)}
        onOpenDomainHosting={isOwner ? () => setIsDomainHostingOpen(true) : undefined}
        onOpenAdSense={isOwner ? () => setIsAdSenseOpen(true) : undefined}
        onOpenAnalytics={handleOpenAnalytics}
        onDataDeleted={() => setSavedTestsCount(0)}
      />
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
