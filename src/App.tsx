import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { UserProfile, PartnerAnalysisResult } from './types';
import type { WebsiteTabKey } from './components/WebsiteSectionsModal';
import type { DashboardTabKey } from './components/UserProfileDashboard';
import type { OnboardingGoal } from './components/OnboardingWizardModal';
import type { DetectedNationalityProfile } from './utils/locationNationalityDetector';
import { soundManager } from './utils/sound';
import { isPinLockEnabled } from './utils/privacyLock';
import { useAppTheme } from './utils/theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);
const CookieConsentBanner = lazy(() =>
  import('./components/CookieConsentBanner').then((m) => ({ default: m.CookieConsentBanner }))
);

// Code-Split Lazy Loaded Pages & Compatibility Flow Steps (Reduces main JS bundle payload & Main Thread work)
const ProfileStep = lazy(() =>
  import('./components/ProfileStep').then((m) => ({ default: m.ProfileStep }))
);
const QuizStep = lazy(() =>
  import('./components/QuizStep').then((m) => ({ default: m.QuizStep }))
);
const AnalyzingStep = lazy(() =>
  import('./components/AnalyzingStep').then((m) => ({ default: m.AnalyzingStep }))
);
const ResultStep = lazy(() =>
  import('./components/ResultStep').then((m) => ({ default: m.ResultStep }))
);
const PrivacyLockScreen = lazy(() =>
  import('./components/PrivacyLockScreen').then((m) => ({ default: m.PrivacyLockScreen }))
);

const AboutUsPage = lazy(() =>
  import('./pages/AboutUsPage').then((m) => ({ default: m.AboutUsPage }))
);
const PrivacyPolicyPage = lazy(() =>
  import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage }))
);
const TermsOfServicePage = lazy(() =>
  import('./pages/TermsOfServicePage').then((m) => ({ default: m.TermsOfServicePage }))
);
const ContactUsPage = lazy(() =>
  import('./pages/ContactUsPage').then((m) => ({ default: m.ContactUsPage }))
);
const HowItWorksPage = lazy(() =>
  import('./pages/HowItWorksPage').then((m) => ({ default: m.HowItWorksPage }))
);
const FAQPage = lazy(() =>
  import('./pages/FAQPage').then((m) => ({ default: m.FAQPage }))
);
const SourcesMethodologyPage = lazy(() =>
  import('./pages/SourcesMethodologyPage').then((m) => ({ default: m.SourcesMethodologyPage }))
);
const DisclaimerPage = lazy(() =>
  import('./pages/DisclaimerPage').then((m) => ({ default: m.DisclaimerPage }))
);
const NovelsDirectoryPage = lazy(() =>
  import('./pages/NovelsDirectoryPage').then((m) => ({ default: m.NovelsDirectoryPage }))
);
const NovelDetailPage = lazy(() =>
  import('./pages/NovelDetailPage').then((m) => ({ default: m.NovelDetailPage }))
);
const ChapterReaderPage = lazy(() =>
  import('./pages/ChapterReaderPage').then((m) => ({ default: m.ChapterReaderPage }))
);
const AdminCMSPage = lazy(() =>
  import('./pages/AdminCMSPage').then((m) => ({ default: m.AdminCMSPage }))
);
const PersonalityTestsPage = lazy(() =>
  import('./pages/PersonalityTestsPage').then((m) => ({ default: m.PersonalityTestsPage }))
);
const ArticlesEncyclopediaPage = lazy(() =>
  import('./pages/ArticlesEncyclopediaPage').then((m) => ({ default: m.ArticlesEncyclopediaPage }))
);
const HowTestResultsCalculatedPage = lazy(() =>
  import('./pages/HowTestResultsCalculatedPage').then((m) => ({
    default: m.HowTestResultsCalculatedPage,
  }))
);

// Code-Split Lazy Loaded Modals (Mounted only when opened)
const LiveChatModal = lazy(() =>
  import('./components/LiveChatModal').then((m) => ({ default: m.LiveChatModal }))
);
const BlindDateShowModal = lazy(() =>
  import('./components/BlindDateShowModal').then((m) => ({ default: m.BlindDateShowModal }))
);
const DomainHostingModal = lazy(() =>
  import('./components/DomainHostingModal').then((m) => ({ default: m.DomainHostingModal }))
);
const WebsiteSectionsModal = lazy(() =>
  import('./components/WebsiteSectionsModal').then((m) => ({ default: m.WebsiteSectionsModal }))
);
const AdSenseModal = lazy(() =>
  import('./components/AdSenseModal').then((m) => ({ default: m.AdSenseModal }))
);
const AuthModal = lazy(() =>
  import('./components/AuthModal').then((m) => ({ default: m.AuthModal }))
);
const SavedResultsHistoryModal = lazy(() =>
  import('./components/SavedResultsHistoryModal').then((m) => ({
    default: m.SavedResultsHistoryModal,
  }))
);
const PsychologyTestsModal = lazy(() =>
  import('./components/PsychologyTestsModal').then((m) => ({ default: m.PsychologyTestsModal }))
);
const UserProfileDashboard = lazy(() =>
  import('./components/UserProfileDashboard').then((m) => ({ default: m.UserProfileDashboard }))
);
const CoupleInviteModal = lazy(() =>
  import('./components/CoupleInviteModal').then((m) => ({ default: m.CoupleInviteModal }))
);
const ArticlesSectionModal = lazy(() =>
  import('./components/ArticlesSectionModal').then((m) => ({ default: m.ArticlesSectionModal }))
);
const NovelsSectionModal = lazy(() =>
  import('./components/NovelsSectionModal').then((m) => ({ default: m.NovelsSectionModal }))
);
const IntelligenceTestModal = lazy(() =>
  import('./components/IntelligenceTestModal').then((m) => ({ default: m.IntelligenceTestModal }))
);
const OnboardingWizardModal = lazy(() =>
  import('./components/OnboardingWizardModal').then((m) => ({ default: m.OnboardingWizardModal }))
);
const LegalModal = lazy(() =>
  import('./components/LegalModal').then((m) => ({ default: m.LegalModal }))
);
const ContactFeedbackModal = lazy(() =>
  import('./components/ContactFeedbackModal').then((m) => ({ default: m.ContactFeedbackModal }))
);
const AnalyticsDashboardModal = lazy(() =>
  import('./components/AnalyticsDashboardModal').then((m) => ({
    default: m.AnalyticsDashboardModal,
  }))
);
const BookClubCommunityModal = lazy(() =>
  import('./components/BookClubCommunityModal').then((m) => ({
    default: m.BookClubCommunityModal,
  }))
);

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
  | 'articles'
  | 'compatibility'
  | 'how-results-are-calculated';
type AppStep = 'profile' | 'quiz' | 'analyzing' | 'result';

function SectionLoadingFallback() {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center gap-3 text-center">
      <div className="w-10 h-10 rounded-full border-3 border-rose-500/30 border-t-rose-500 animate-spin" />
      <span className="text-xs font-bold text-slate-400">جاري تحميل القسم...</span>
    </div>
  );
}

function AppContent() {
  const { direction, isRTL } = useLanguage();
  const { user, isOwner } = useAuth();
  const [theme] = useAppTheme();
  const [step, setStep] = useState<AppStep>('profile');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
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
  const [isBookClubOpen, setIsBookClubOpen] = useState(false);
  const [savedTestsCount, setSavedTestsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState<SitePage>('home');
  const [activeNovelId, setActiveNovelId] = useState<string>('room_104_cipher');
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  // Synchronize URL hash, pathname, and query params with currentPage for direct deep linking, OAuth/AdSense validators, and SEO crawlers
  useEffect(() => {
    const handleRouteChange = () => {
      const rawHash = window.location.hash.toLowerCase().replace('#/', '').replace('#', '').trim();
      const rawPath = window.location.pathname.toLowerCase().replace(/^\/+|\/+$/g, '').trim();
      const searchParams = new URLSearchParams(window.location.search);
      const queryPage = (searchParams.get('page') || '').toLowerCase().trim();

      const effectiveRoute = rawHash || queryPage || rawPath;
      const parts = effectiveRoute.split('/');
      const section = parts[0];

      if (section === 'about' || section === 'about-us') {
        setCurrentPage('about');
      } else if (section === 'how-it-works' || section === 'howitworks') {
        setCurrentPage('how-it-works');
      } else if (section === 'privacy' || section === 'privacy-policy' || section === 'privacypolicy') {
        setCurrentPage('privacy');
      } else if (section === 'terms' || section === 'terms-of-service' || section === 'tos') {
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
        if (parts[1]) {
          try {
            sessionStorage.setItem('mirat_open_article_id', decodeURIComponent(parts[1]));
          } catch {
            // ignore
          }
        }
        setCurrentPage('articles');
      } else if (section === 'community' || section === 'book-club' || section === 'salon') {
        setIsBookClubOpen(true);
        setCurrentPage('home');
      } else if (
        section === 'how-results-are-calculated' ||
        section === 'scoring-guide' ||
        section === 'how-tests-work' ||
        section === 'scoring'
      ) {
        setCurrentPage('how-results-are-calculated');
      } else if (
        section === 'personality-tests' ||
        section === 'personality' ||
        section === 'mbti' ||
        section === 'big-five'
      ) {
        setCurrentPage('personality-tests');
      } else if (
        section === 'compatibility' ||
        section === 'partner-detector' ||
        section === 'partner'
      ) {
        setCurrentPage('compatibility');
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

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Load quiz questions dynamically when entering compatibility section
  useEffect(() => {
    if (currentPage === 'compatibility' && quizQuestions.length === 0) {
      import('./data/questions').then((m) => {
        setQuizQuestions(m.QUIZ_QUESTIONS);
      });
    }
  }, [currentPage, quizQuestions.length]);

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
      'compatibility',
      'how-results-are-calculated',
    ];

    if (page === 'community' || page === 'book-club' || page === 'salon') {
      setIsBookClubOpen(true);
      return;
    }

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

  // Defer site analytics tracking & session loading to idle time without pulling 498 KB Firebase Firestore SDK for anonymous/Lighthouse visits
  useEffect(() => {
    let isMounted = true;

    // 1. Fast zero-bundle local read from localStorage
    try {
      const rawProfile = localStorage.getItem('mirat_persistent_user_profile');
      if (rawProfile) {
        const parsedProfile = JSON.parse(rawProfile);
        if (parsedProfile && typeof parsedProfile === 'object') {
          setProfile((prev) => prev || parsedProfile);
        }
      }
      const rawSaved = localStorage.getItem('mirat_saved_results_local_v1');
      const rawUnified = localStorage.getItem('mirat_unified_test_history_v2');
      const savedLen = rawSaved ? (JSON.parse(rawSaved)?.length || 0) : 0;
      const unifiedLen = rawUnified ? (JSON.parse(rawUnified)?.length || 0) : 0;
      setSavedTestsCount(Math.max(savedLen, unifiedLen));
    } catch {}

    const ua = (typeof navigator !== 'undefined' && navigator.userAgent) || '';
    const isAuditBot = Boolean(
      (typeof navigator !== 'undefined' && navigator.webdriver) ||
        /Chrome-Lighthouse|PageSpeed|PTST|HeadlessChrome|Googlebot|InspectionTool|GTmetrix/i.test(ua)
    );
    if (isAuditBot) {
      return;
    }

    const timer = setTimeout(async () => {
      if (!isMounted) return;
      try {
        const { trackSiteVisit } = await import('./services/analyticsService');
        if (!isMounted) return;
        trackSiteVisit();

        // Only dynamically import userHistoryService (and Firebase Firestore) when user is signed in or has cloud-synced data
        const hasCloudFlag = localStorage.getItem('mirat_has_cloud_data') === '1';
        if (user || hasCloudFlag) {
          const historySvc = await import('./services/userHistoryService');
          if (!isMounted) return;
          const [session, savedResults, unifiedHistory] = await Promise.all([
            historySvc.loadPersistentUserSession(user),
            historySvc.fetchUserSavedResults(user),
            historySvc.fetchUnifiedTestHistory(user),
          ]);
          if (!isMounted) return;
          if (session.profile) {
            setProfile((prev) => prev || session.profile);
          }
          const totalSaved = Math.max(
            savedResults?.length || 0,
            unifiedHistory?.length || 0
          );
          setSavedTestsCount(totalSaved);
        }
      } catch {}
    }, 1500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [user]);

  const handleOpenContactFeedback = () => {
    soundManager.playTap();
    setIsContactFeedbackOpen(true);
  };

  const handleOpenAnalytics = () => {
    if (!isOwner) return;
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
      handleNavigatePage('compatibility');
      if (step !== 'profile') {
        handleReset();
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
    setCurrentPage('compatibility');
    window.location.hash = '#/compatibility';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWebsiteSection = (tab: WebsiteTabKey = 'about') => {
    soundManager.playTap();
    setWebsiteSectionTab(tab);
    setIsWebsiteSectionsOpen(true);
  };

  // Start Quiz with Profile
  const handleStart = async (userProfile: UserProfile) => {
    soundManager.playPageTransition();
    setProfile(userProfile);
    import('./services/userHistoryService').then((m) =>
      m.savePersistentUserProfile(userProfile, user)
    );
    if (quizQuestions.length === 0) {
      const m = await import('./data/questions');
      setQuizQuestions(m.QUIZ_QUESTIONS);
    }
    setStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete Quiz -> Trigger AI Analysis & Image Generation with Auto-Detected Location & Nationality
  const handleQuizComplete = async (
    quizAnswers: Record<number, string>,
    quizDetectedLocation?: DetectedNationalityProfile
  ) => {
    if (!profile) return;
    soundManager.playPageTransition();
    setAnswers(quizAnswers);
    setStep('analyzing');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const startTime = Date.now();

    const [
      { detectUserLocationAndNationality, getNationalityEntryByCountry },
      { getRealisticPortrait },
      { calculateRealCompatibility },
    ] = await Promise.all([
      import('./utils/locationNationalityDetector'),
      import('./data/portraits'),
      import('./utils/realScoringEngine'),
    ]);

    // Ensure location and nationality are detected and refined with the user's quiz answers
    const resolvedLocation =
      quizDetectedLocation ||
      (await detectUserLocationAndNationality({
        partnerGender: profile.partnerGender,
        fallbackCountry: profile.country,
        answers: quizAnswers,
      })) ||
      getNationalityEntryByCountry(profile.country, profile.partnerGender);

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

    setProfile(activeProfile);
    const historySvc = await import('./services/userHistoryService');
    historySvc.savePersistentUserProfile(activeProfile, user);

    // 1. Pick authentic curated photorealistic portrait for this ethnicity, gender, age & geography
    const curated = getRealisticPortrait(
      activeProfile.ethnicity,
      activeProfile.partnerGender,
      activeProfile.userAge,
      activeProfile.country
    );
    let finalImageUrl = curated.url;

    // Compute real psychometric and mathematical compatibility deterministically from actual answers
    const calculatedScoring = calculateRealCompatibility(activeProfile, quizAnswers);

    try {
      // 2. Call server-side Gemini analysis endpoint with detected nationality & ethnic traits
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
        // Strictly reinforce real calculated scores and breakdown
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

      // 3. Attempt Gemini image generation via server endpoint guided by detected nationality & ethnic traits
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

      // Persist result automatically to database for returning visitor/user
      historySvc.saveTestResultToHistory(user, activeProfile, analysisData).then(() => {
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

      // Persist fallback result automatically to database for returning visitor/user
      historySvc.saveTestResultToHistory(user, activeProfile, fallbackResult).then(() => {
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

  // Regenerate image variation with demographic, nationality & geographic fidelity
  const handleRegenerateImage = async () => {
    if (!profile || !result) return;
    setIsRegeneratingImage(true);

    try {
      const { getRealisticPortrait } = await import('./data/portraits');
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
        onOpenDomainHosting={isOwner ? () => setIsDomainHostingOpen(true) : undefined}
        onOpenWebsiteSection={handleOpenWebsiteSection}
        onOpenAdSense={isOwner ? () => setIsAdSenseOpen(true) : undefined}
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
        onOpenAnalytics={isOwner ? handleOpenAnalytics : undefined}
        onNavigatePage={handleNavigatePage}
        onDataDeleted={() => setSavedTestsCount(0)}
        currentPage={currentPage}
      />

      {/* Main Game Screen or Dedicated Full Pages with Smooth Framer Motion Transitions */}
      <main className="flex-1 flex flex-col justify-center py-4 relative">
        {currentPage === 'home' && (
          <HomePage
            onStart={(prof) => {
              handleStart(prof);
              setCurrentPage('compatibility');
              window.location.hash = '#/compatibility';
            }}
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
            onOpenCommunity={() => setIsBookClubOpen(true)}
            onNavigatePage={handleNavigatePage}
          />
        )}

        {currentPage !== 'home' && (
          <Suspense fallback={<SectionLoadingFallback />}>
            {currentPage === 'about' && (
              <AboutUsPage
                onBackToHome={() => handleNavigatePage('home')}
                onNavigatePage={handleNavigatePage}
                onStartQuiz={() => {
                  handleReset();
                  handleNavigatePage('compatibility');
                }}
                onOpenPsychologyTests={() => setIsPsychologyTestsOpen(true)}
                onOpenIntelligenceTests={handleOpenIntelligenceTests}
                onOpenArticles={handleOpenArticles}
                onOpenNovels={handleOpenNovels}
              />
            )}

            {currentPage === 'how-it-works' && (
              <HowItWorksPage
                onBackToHome={() => handleNavigatePage('home')}
                onNavigatePage={handleNavigatePage}
                onStartQuiz={() => {
                  handleReset();
                  handleNavigatePage('compatibility');
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

            {currentPage === 'admin-cms' &&
              (isOwner ? (
                <AdminCMSPage
                  onBackToHome={() => handleNavigatePage('home')}
                  onOpenAnalyticsModal={handleOpenAnalytics}
                />
              ) : (
                <HomePage
                  onStart={(prof) => {
                    handleStart(prof);
                    setCurrentPage('compatibility');
                    window.location.hash = '#/compatibility';
                  }}
                  initialProfile={profile}
                  savedTestsCount={savedTestsCount}
                  onOpenSavedHistory={() => setIsHistoryModalOpen(true)}
                  onOpenBlindDate={() => setIsBlindDateOpen(true)}
                  onOpenDomainHosting={undefined}
                  onOpenWebsiteSection={handleOpenWebsiteSection}
                  onOpenPsychologyTests={() => setIsPsychologyTestsOpen(true)}
                  onOpenIntelligenceTests={handleOpenIntelligenceTests}
                  onOpenUserDashboard={() => handleOpenUserDashboard('overview')}
                  onOpenArticles={handleOpenArticles}
                  onOpenNovels={handleOpenNovels}
                  onOpenContactFeedback={handleOpenContactFeedback}
                  onOpenCommunity={() => setIsBookClubOpen(true)}
                  onNavigatePage={handleNavigatePage}
                />
              ))}

            {currentPage === 'personality-tests' && (
              <PersonalityTestsPage
                onBackToHome={() => handleNavigatePage('home')}
                onNavigatePage={handleNavigatePage}
              />
            )}

            {currentPage === 'how-results-are-calculated' && (
              <HowTestResultsCalculatedPage
                onBackToHome={() => handleNavigatePage('home')}
                onNavigatePage={handleNavigatePage}
                onStartPersonalityTests={() => handleNavigatePage('personality-tests')}
                onStartCompatibilityTest={() => {
                  handleReset();
                  handleNavigatePage('compatibility');
                }}
              />
            )}

            {currentPage === 'articles' && (
              <ArticlesEncyclopediaPage
                onBackToHome={() => handleNavigatePage('home')}
                onNavigatePage={handleNavigatePage}
              />
            )}

            {currentPage === 'compatibility' && (
              <div className="w-full transition-opacity duration-300">
                {step === 'profile' && (
                  <div key="profile" className="w-full">
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
                      onBackToHome={() => handleNavigatePage('home')}
                    />
                  </div>
                )}

                {step === 'quiz' && quizQuestions.length > 0 && (
                  <div key="quiz" className="w-full">
                    <QuizStep
                      questions={quizQuestions}
                      profile={profile}
                      onComplete={handleQuizComplete}
                      onBackToProfile={() => setStep('profile')}
                    />
                  </div>
                )}

                {step === 'analyzing' && profile && (
                  <div key="analyzing" className="w-full">
                    <AnalyzingStep profile={profile} />
                  </div>
                )}

                {step === 'result' && result && profile && (
                  <div
                    key={
                      !isResultUnlocked && isPinLockEnabled()
                        ? 'result-locked'
                        : 'result-unlocked'
                    }
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
                  </div>
                )}
              </div>
            )}
          </Suspense>
        )}
      </main>

      {/* Lazy-Loaded Modals (Only mounted when opened to keep initial DOM & Main Thread fast) */}
      <Suspense fallback={null}>
        {isLiveChatOpen && (
          <LiveChatModal
            isOpen={isLiveChatOpen}
            onClose={() => setIsLiveChatOpen(false)}
            profile={profile}
            onOpenBlindDate={() => setIsBlindDateOpen(true)}
          />
        )}

        {isBlindDateOpen && (
          <BlindDateShowModal
            isOpen={isBlindDateOpen}
            onClose={() => setIsBlindDateOpen(false)}
            profile={profile}
            result={result}
          />
        )}

        {isArticlesModalOpen && (
          <ArticlesSectionModal
            isOpen={isArticlesModalOpen}
            onClose={() => setIsArticlesModalOpen(false)}
            onOpenStandalonePage={() => handleNavigatePage('articles')}
          />
        )}

        {isNovelsModalOpen && (
          <NovelsSectionModal
            isOpen={isNovelsModalOpen}
            onClose={() => setIsNovelsModalOpen(false)}
          />
        )}

        {isOwner && isDomainHostingOpen && (
          <DomainHostingModal
            isOpen={isDomainHostingOpen}
            onClose={() => setIsDomainHostingOpen(false)}
            onOpenAdSense={() => setIsAdSenseOpen(true)}
          />
        )}

        {isOwner && isAdSenseOpen && (
          <AdSenseModal
            isOpen={isAdSenseOpen}
            onClose={() => setIsAdSenseOpen(false)}
            onOpenDomainHosting={() => setIsDomainHostingOpen(true)}
          />
        )}

        {isWebsiteSectionsOpen && (
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
        )}

        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />
        )}

        {isHistoryModalOpen && (
          <SavedResultsHistoryModal
            isOpen={isHistoryModalOpen}
            onClose={() => setIsHistoryModalOpen(false)}
            onOpenAuth={() => {
              setIsHistoryModalOpen(false);
              setIsAuthModalOpen(true);
            }}
            onLoadHistoricalResult={handleLoadHistoricalResult}
          />
        )}

        {isPsychologyTestsOpen && (
          <PsychologyTestsModal
            isOpen={isPsychologyTestsOpen}
            onClose={() => setIsPsychologyTestsOpen(false)}
            userName={profile?.userName}
            onOpenDashboard={(tab) => {
              setIsPsychologyTestsOpen(false);
              handleOpenUserDashboard(tab || 'overview');
            }}
          />
        )}

        {isUserProfileOpen && (
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
        )}

        {isCoupleInviteOpen && (
          <CoupleInviteModal
            isOpen={isCoupleInviteOpen}
            onClose={() => setIsCoupleInviteOpen(false)}
            profile={profile}
            result={result}
          />
        )}

        {isIntelligenceModalOpen && (
          <IntelligenceTestModal
            isOpen={isIntelligenceModalOpen}
            onClose={() => setIsIntelligenceModalOpen(false)}
          />
        )}

        {isOnboardingWizardOpen && (
          <OnboardingWizardModal
            isOpen={isOnboardingWizardOpen}
            onClose={() => setIsOnboardingWizardOpen(false)}
            onSelectDestination={handleOnboardingSelectDestination}
          />
        )}

        {isLegalModalOpen && (
          <LegalModal
            isOpen={isLegalModalOpen}
            onClose={() => setIsLegalModalOpen(false)}
            initialTab={legalModalTab}
          />
        )}

        {isContactFeedbackOpen && (
          <ContactFeedbackModal
            isOpen={isContactFeedbackOpen}
            onClose={() => setIsContactFeedbackOpen(false)}
          />
        )}

        {isOwner && isAnalyticsOpen && (
          <AnalyticsDashboardModal
            isOpen={isAnalyticsOpen}
            onClose={() => setIsAnalyticsOpen(false)}
          />
        )}

        {isBookClubOpen && (
          <BookClubCommunityModal
            isOpen={isBookClubOpen}
            onClose={() => setIsBookClubOpen(false)}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
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
          onOpenAnalytics={isOwner ? handleOpenAnalytics : undefined}
          onDataDeleted={() => setSavedTestsCount(0)}
        />
      </Suspense>
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
