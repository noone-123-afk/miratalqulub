import {
  db,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
  deleteDoc,
  User,
} from '../firebase';
import { UserProfile, PartnerAnalysisResult } from '../types';
import { COMMUNITY_PROFILES, CommunityMemberProfile } from '../data/communityProfiles';

export interface SavedHistoricalResult {
  id: string;
  userId: string;
  createdAt: string;
  partnerName: string;
  partnerGender: string;
  userGender: string;
  userAge: number;
  country: string;
  compatibilityScore: number;
  intellectualScore: number;
  sociologicalScore: number;
  emotionalScore: number;
  lifestyleScore: number;
  partnerTraits: string[];
  loveLanguage: string;
  romanticAdvice: string;
  partnerVibeQuote: string;
  imageUrl?: string;
  visualDescription?: string;
  profileSnapshot?: Partial<UserProfile>;
  fullResultSnapshot?: Partial<PartnerAnalysisResult>;
}

const VISITOR_ID_STORAGE_KEY = 'mirat_persistent_visitor_id';
const VISITOR_PROFILE_STORAGE_KEY = 'mirat_persistent_user_profile';
const VISITOR_LATEST_RESULT_KEY = 'mirat_persistent_latest_result';

/**
 * Generates or retrieves a persistent visitor ID so returning visitors always keep their database records
 */
export function getOrCreateVisitorId(): string {
  try {
    let vid = localStorage.getItem(VISITOR_ID_STORAGE_KEY);
    if (!vid || !/^[a-zA-Z0-9_-]+$/.test(vid)) {
      vid = `vis_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      localStorage.setItem(VISITOR_ID_STORAGE_KEY, vid);
    }
    return vid;
  } catch {
    return 'vis_default_session';
  }
}

export function getEffectiveOwnerId(user?: User | null): string {
  return user?.uid || getOrCreateVisitorId();
}

/**
 * Saves the visitor/user's demographic profile preferences to both LocalStorage and Firestore
 */
export async function savePersistentUserProfile(
  profile: UserProfile,
  user?: User | null
): Promise<void> {
  const now = new Date().toISOString();
  const visitorId = getOrCreateVisitorId();

  try {
    localStorage.setItem(VISITOR_PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {}

  // Save to visitor_sessions in Firestore
  try {
    const visRef = doc(db, 'visitor_sessions', visitorId);
    await setDoc(
      visRef,
      {
        visitorId,
        profile,
        updatedAt: now,
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Could not sync profile to visitor_sessions:', err);
  }

  // Also sync to /api/visitor-session on server
  try {
    fetch('/api/visitor-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorId, profile, updatedAt: now }),
    }).catch(() => {});
  } catch {}

  // If authenticated user, also update /users/{uid}
  if (user?.uid) {
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(
        userRef,
        {
          id: user.uid,
          email: user.email || '',
          displayName: user.displayName || profile.userName || 'مستخدم مِرآة القلوب',
          profile,
          updatedAt: now,
          createdAt: now,
        },
        { merge: true }
      );
    } catch {}
  }
}

/**
 * Restores a returning visitor or user's saved profile and latest state from Firestore or LocalStorage
 */
export async function loadPersistentUserSession(user?: User | null): Promise<{
  profile: UserProfile | null;
  latestResult: PartnerAnalysisResult | null;
}> {
  let localProfile: UserProfile | null = null;
  let localResult: PartnerAnalysisResult | null = null;

  try {
    const rawProf = localStorage.getItem(VISITOR_PROFILE_STORAGE_KEY);
    if (rawProf) localProfile = JSON.parse(rawProf);
    const rawRes = localStorage.getItem(VISITOR_LATEST_RESULT_KEY);
    if (rawRes) localResult = JSON.parse(rawRes);
  } catch {}

  // 1. Check authenticated user doc in Firestore
  if (user?.uid) {
    try {
      const userSnap = await getDoc(doc(db, 'users', user.uid));
      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.profile) {
          localProfile = data.profile as UserProfile;
          localStorage.setItem(VISITOR_PROFILE_STORAGE_KEY, JSON.stringify(localProfile));
        }
        if (data.latestResult) {
          localResult = data.latestResult as PartnerAnalysisResult;
          localStorage.setItem(VISITOR_LATEST_RESULT_KEY, JSON.stringify(localResult));
        }
      }
    } catch {}
  }

  // 2. Check visitor_sessions in Firestore
  const visitorId = getOrCreateVisitorId();
  try {
    const visSnap = await getDoc(doc(db, 'visitor_sessions', visitorId));
    if (visSnap.exists()) {
      const data = visSnap.data();
      if (data.profile && !localProfile) {
        localProfile = data.profile as UserProfile;
        localStorage.setItem(VISITOR_PROFILE_STORAGE_KEY, JSON.stringify(localProfile));
      }
      if (data.latestResult && !localResult) {
        localResult = data.latestResult as PartnerAnalysisResult;
        localStorage.setItem(VISITOR_LATEST_RESULT_KEY, JSON.stringify(localResult));
      }
      if (Array.isArray(data.testHistory) && data.testHistory.length > 0) {
        const key = `offline_test_history_${getEffectiveOwnerId(user)}`;
        if (!localStorage.getItem(key)) {
          localStorage.setItem(key, JSON.stringify(data.testHistory));
        }
      }
      if (Array.isArray(data.results) && data.results.length > 0) {
        const key = `offline_results_${getEffectiveOwnerId(user)}`;
        if (!localStorage.getItem(key)) {
          localStorage.setItem(key, JSON.stringify(data.results));
        }
      }
    }
  } catch {}

  return { profile: localProfile, latestResult: localResult };
}

export async function saveTestResultToHistory(
  user: User | null | undefined,
  profile: UserProfile,
  result: PartnerAnalysisResult
): Promise<string> {
  const resultId = `res_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();
  const ownerId = getEffectiveOwnerId(user);
  const visitorId = getOrCreateVisitorId();

  // Save latest profile & result locally
  try {
    localStorage.setItem(VISITOR_PROFILE_STORAGE_KEY, JSON.stringify(profile));
    localStorage.setItem(VISITOR_LATEST_RESULT_KEY, JSON.stringify(result));
  } catch {}

  // Extract traits as plain string array
  const traitsList = Array.isArray(result.partnerTraits)
    ? result.partnerTraits.map((t: any) => (typeof t === 'string' ? t : t.title || t.trait || ''))
    : [];

  const resultDocData: SavedHistoricalResult = {
    id: resultId,
    userId: ownerId,
    createdAt: now,
    partnerName: result.proposedPartnerName || (result as any).partnerName || 'الشريك المتوافق',
    partnerGender: profile.partnerGender || 'female',
    userGender: profile.userGender || 'male',
    userAge: profile.userAge || 26,
    country: profile.country || 'المملكة العربية السعودية',
    compatibilityScore: result.compatibilityScore || 92,
    intellectualScore: result.intellectualScore || 90,
    sociologicalScore: result.sociologicalScore || 91,
    emotionalScore: result.emotionalScore || 93,
    lifestyleScore: result.lifestyleScore || 89,
    partnerTraits: traitsList,
    loveLanguage: result.loveLanguage || '',
    romanticAdvice: result.romanticAdvice || '',
    partnerVibeQuote: result.partnerVibeQuote || '',
    imageUrl: result.imageUrl || '',
    visualDescription: result.visualDescription || '',
    profileSnapshot: profile,
    fullResultSnapshot: result,
  };

  // Backup to localStorage for both ownerId and visitorId
  let updatedLocalResults: SavedHistoricalResult[] = [resultDocData];
  try {
    const localKey = `offline_results_${ownerId}`;
    const existing: SavedHistoricalResult[] = JSON.parse(localStorage.getItem(localKey) || '[]');
    updatedLocalResults = [resultDocData, ...existing.filter((r) => r.id !== resultId)].slice(0, 30);
    localStorage.setItem(localKey, JSON.stringify(updatedLocalResults));
    localStorage.setItem(`offline_results_${visitorId}`, JSON.stringify(updatedLocalResults));
  } catch (e) {
    console.error('Local backup failed', e);
  }

  // 1. If authenticated user, save to /users/{userId} and /users/{userId}/results/{resultId}
  if (user?.uid) {
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(
        userRef,
        {
          id: user.uid,
          email: user.email || '',
          displayName: user.displayName || profile.userName || 'مستخدم مِرآة القلوب',
          profile,
          latestResult: result,
          updatedAt: now,
          createdAt: now,
        },
        { merge: true }
      );

      const resultRef = doc(db, 'users', user.uid, 'results', resultId);
      await setDoc(resultRef, resultDocData);
    } catch (err) {
      console.warn('Could not save result to user Firestore doc, continuing to visitor session', err);
    }
  }

  // 2. Always persist to /visitor_sessions/{visitorId} in Firestore so returning visitors have cloud persistence
  try {
    const visRef = doc(db, 'visitor_sessions', visitorId);
    await setDoc(
      visRef,
      {
        visitorId,
        profile,
        latestResult: result,
        results: updatedLocalResults.slice(0, 15),
        updatedAt: now,
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Could not sync result to visitor_sessions in Firestore', err);
  }

  // 3. Also record into unified test history
  try {
    await saveUnifiedTestRecord(user || null, {
      testType: 'partner_compatibility',
      testTitleAr: `توافق الشريك: ${resultDocData.partnerName}`,
      testCategoryAr: 'التوافق الفكري والروحي',
      scoreOrArchetype: `${resultDocData.compatibilityScore}% توافق`,
      percentage: resultDocData.compatibilityScore,
      badgeColor: '#2563eb',
      keyInsights: traitsList.slice(0, 3),
      snapshot: resultDocData,
    });
  } catch (err) {
    console.warn('Could not mirror to unified test history', err);
  }

  return resultId;
}

export async function fetchUserSavedResults(user?: User | null): Promise<SavedHistoricalResult[]> {
  const ownerId = getEffectiveOwnerId(user);
  const visitorId = getOrCreateVisitorId();

  // 1. If authenticated user, try /users/{uid}/results
  if (user?.uid) {
    try {
      const resultsCol = collection(db, 'users', user.uid, 'results');
      const q = query(resultsCol, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      const items: SavedHistoricalResult[] = [];
      snapshot.forEach((d) => {
        items.push(d.data() as SavedHistoricalResult);
      });

      if (items.length > 0) {
        try {
          localStorage.setItem(`offline_results_${user.uid}`, JSON.stringify(items));
        } catch {}
        return items;
      }
    } catch (err) {
      console.warn('Firestore user results fetch failed, checking visitor session', err);
    }
  }

  // 2. Check /visitor_sessions/{visitorId} in Firestore
  try {
    const visSnap = await getDoc(doc(db, 'visitor_sessions', visitorId));
    if (visSnap.exists()) {
      const data = visSnap.data();
      if (Array.isArray(data.results) && data.results.length > 0) {
        try {
          localStorage.setItem(`offline_results_${ownerId}`, JSON.stringify(data.results));
        } catch {}
        return data.results as SavedHistoricalResult[];
      }
    }
  } catch {}

  // 3. Fallback to localStorage cache
  try {
    const local =
      localStorage.getItem(`offline_results_${ownerId}`) ||
      localStorage.getItem(`offline_results_${visitorId}`);
    if (local) {
      return JSON.parse(local);
    }
  } catch (e) {
    console.error('Offline cache read error', e);
  }

  return [];
}

export async function deleteSavedResultFromHistory(
  user: User | null | undefined,
  resultId: string
): Promise<void> {
  const ownerId = getEffectiveOwnerId(user);
  const visitorId = getOrCreateVisitorId();

  if (user?.uid) {
    try {
      const resultRef = doc(db, 'users', user.uid, 'results', resultId);
      await deleteDoc(resultRef);
    } catch {}
  }

  // Remove from local cache & update visitor_sessions
  try {
    const localKey = `offline_results_${ownerId}`;
    const existing: SavedHistoricalResult[] = JSON.parse(localStorage.getItem(localKey) || '[]');
    const filtered = existing.filter((r) => r.id !== resultId);
    localStorage.setItem(localKey, JSON.stringify(filtered));
    localStorage.setItem(`offline_results_${visitorId}`, JSON.stringify(filtered));

    const visRef = doc(db, 'visitor_sessions', visitorId);
    await setDoc(
      visRef,
      {
        visitorId,
        results: filtered,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (e) {
    console.error('Local cache delete error', e);
  }
}

// ================= PSYCHOLOGY & PUBLIC PROFILES SERVICE =================

export async function saveUserPsychologyReport(
  user: User | null | undefined,
  report: any,
  profile?: UserProfile | null
): Promise<void> {
  const now = new Date().toISOString();
  const visitorId = getOrCreateVisitorId();

  // 1. Always mirror to local storage
  try {
    localStorage.setItem('latest_psychology_report', JSON.stringify(report));
    localStorage.setItem(`psychology_report_${report.testId}`, JSON.stringify(report));
    if (user?.uid) {
      localStorage.setItem(`offline_psych_report_${user.uid}`, JSON.stringify(report));
    }
  } catch (e) {
    console.error('Failed to cache psychology report locally', e);
  }

  // 2. Persist to visitor_sessions in Firestore for returning visitors
  try {
    const visRef = doc(db, 'visitor_sessions', visitorId);
    await setDoc(
      visRef,
      {
        visitorId,
        psychologyReport: report,
        updatedAt: now,
      },
      { merge: true }
    );
  } catch {}

  // 3. If user is signed in to Firebase, persist to /users/{uid}
  if (user?.uid) {
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(
        userRef,
        {
          id: user.uid,
          displayName: user.displayName || profile?.userName || 'المستخدم',
          email: user.email || '',
          archetype: report.primaryArchetypeAr,
          psychologyReport: report,
          updatedAt: now,
          createdAt: now,
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Could not persist psychology report to Firestore user doc:', err);
    }
  }

  // 4. Mirror to unified test history for both visitors and logged-in users
  try {
    await saveUnifiedTestRecord(user || null, {
      testType: 'psychology',
      testTitleAr: report.testTitleAr || 'مقياس الشخصية المعتمد',
      testCategoryAr: report.testCategoryAr || 'المقاييس النفسية والسيكومترية',
      scoreOrArchetype: report.primaryArchetypeAr || `${report.totalScore}%`,
      percentage: report.totalScore || 85,
      badgeColor: report.badgeColor || '#059669',
      keyInsights: [
        `النمط السيكومتري: ${report.primaryArchetypeAr || 'متوازن'}`,
        ...(report.dimensionScores?.slice(0, 2).map((d: any) => `${d.labelAr}: ${d.score}%`) || []),
      ],
      snapshot: report,
    });
  } catch (err) {
    console.warn('Could not mirror psychology report to unified test history', err);
  }
}

export async function setPublicProfileStatus(
  user: User | null | undefined,
  isPublic: boolean,
  profileData: {
    displayName: string;
    userGender: 'male' | 'female';
    userAge: number;
    country: string;
    city?: string;
    archetype: string;
    contactWhatsapp?: string;
    bio?: string;
    strengths?: string[];
    interests?: string[];
    aspirations?: string[];
    idealPartnerNeeds?: string;
    communicationStyle?: string;
    dimensionScores?: {
      extraversion: number;
      emotionalStability: number;
      openness: number;
      agreeableness: number;
      conscientiousness: number;
    };
  }
): Promise<void> {
  const now = new Date().toISOString();
  const profileId = getEffectiveOwnerId(user);
  const publicRef = doc(db, 'public_profiles', profileId);

  if (isPublic) {
    try {
      await setDoc(
        publicRef,
        {
          id: profileId,
          displayName: profileData.displayName,
          userGender: profileData.userGender,
          userAge: profileData.userAge,
          country: profileData.country,
          city: profileData.city || profileData.country || 'المدينة',
          archetype: profileData.archetype,
          contactWhatsapp: profileData.contactWhatsapp || '',
          bio: profileData.bio || '',
          strengths: profileData.strengths || [],
          interests: profileData.interests || [],
          aspirations: profileData.aspirations || [],
          idealPartnerNeeds: profileData.idealPartnerNeeds || '',
          communicationStyle: profileData.communicationStyle || '',
          dimensionScores: profileData.dimensionScores || {
            extraversion: 70,
            emotionalStability: 75,
            openness: 75,
            agreeableness: 78,
            conscientiousness: 76,
          },
          isDiscoverable: true,
          createdAt: now,
          updatedAt: now,
        },
        { merge: true }
      );
    } catch {}
  } else {
    try {
      await deleteDoc(publicRef);
    } catch {}
  }

  try {
    localStorage.setItem(`is_public_profile_${profileId}`, isPublic ? 'true' : 'false');
    if (profileData.contactWhatsapp) {
      localStorage.setItem('user_contact_whatsapp', profileData.contactWhatsapp);
    }
  } catch {}
}

/**
 * Fetches real opted-in public user profiles from Firestore /public_profiles
 * combined with scientific reference archetype profiles
 */
export async function fetchPublicCommunityProfiles(): Promise<CommunityMemberProfile[]> {
  try {
    const snap = await getDocs(collection(db, 'public_profiles'));
    const list: CommunityMemberProfile[] = [];
    snap.forEach((d) => {
      const data = d.data();
      if (data && data.isDiscoverable !== false && data.displayName) {
        list.push({
          id: d.id,
          displayName: data.displayName,
          userGender: data.userGender || 'male',
          userAge: Number(data.userAge) || 26,
          country: data.country || 'الأردن',
          city: data.city || data.country || 'عمّان',
          avatarUrl:
            data.avatarUrl ||
            (data.userGender === 'female'
              ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85'
              : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=85'),
          archetype: data.archetype || 'شخصية متزنة ومتوافقة',
          archetypeBadge: 'عضو مسجل ✓',
          category: 'both',
          compatibilityScore: 88,
          similarityScore: 85,
          bio:
            data.bio ||
            `عضو مسجل في منصة مرآة القلوب من ${data.country || 'الوطن العربي'} يشارك ملفه السيكومتري للتوافق.`,
          strengths:
            Array.isArray(data.strengths) && data.strengths.length > 0
              ? data.strengths
              : ['تواصل صادق', 'توافق قيمي', 'وضوح فكري'],
          interests:
            Array.isArray(data.interests) && data.interests.length > 0
              ? data.interests
              : ['الحوار الفكري', 'بناء أسرة متناغمة'],
          aspirations:
            Array.isArray(data.aspirations) && data.aspirations.length > 0
              ? data.aspirations
              : ['شراكة حياة واعية ومستقرة'],
          idealPartnerNeeds:
            data.idealPartnerNeeds || 'شريك متفهم يقدر الاحترام المتبادل والحوار الهادئ',
          communicationStyle: data.communicationStyle || 'حوار صريح وهادئ',
          contactOptions: {
            whatsapp: data.contactWhatsapp || undefined,
            allowDirectChat: true,
            allowInvite: true,
          },
          dimensionScores: data.dimensionScores || {
            extraversion: 72,
            emotionalStability: 80,
            openness: 78,
            agreeableness: 82,
            conscientiousness: 80,
          },
        });
      }
    });
    return [...list, ...COMMUNITY_PROFILES];
  } catch {
    return [...COMMUNITY_PROFILES];
  }
}

// ================= UNIFIED TEST TRACKING & TIMELINE SERVICE =================

export type UnifiedTestType = 'partner_compatibility' | 'psychology' | 'intelligence';

export interface UnifiedTestRecord {
  id: string;
  userId: string;
  testType: UnifiedTestType;
  testTitleAr: string;
  testCategoryAr: string;
  scoreOrArchetype: string;
  percentage: number;
  createdAt: string;
  badgeColor: string;
  keyInsights: string[];
  snapshot: any;
}

export async function saveUnifiedTestRecord(
  user: User | null | undefined,
  record: Omit<UnifiedTestRecord, 'id' | 'userId' | 'createdAt'>
): Promise<string> {
  const recordId = `test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();
  const ownerId = getEffectiveOwnerId(user);
  const visitorId = getOrCreateVisitorId();

  const fullRecord: UnifiedTestRecord = {
    ...record,
    id: recordId,
    userId: ownerId,
    createdAt: now,
  };

  // 1. Update local cache
  let updatedHistory: UnifiedTestRecord[] = [fullRecord];
  try {
    const localKey = `offline_test_history_${ownerId}`;
    const existing: UnifiedTestRecord[] = JSON.parse(localStorage.getItem(localKey) || '[]');
    updatedHistory = [fullRecord, ...existing].slice(0, 50);
    localStorage.setItem(localKey, JSON.stringify(updatedHistory));
    localStorage.setItem(`offline_test_history_${visitorId}`, JSON.stringify(updatedHistory));
    localStorage.setItem('offline_test_history_guest', JSON.stringify(updatedHistory));
  } catch (e) {
    console.error('Local backup failed', e);
  }

  // 2. If signed in, save to /users/{uid}/test_history/{recordId}
  if (user?.uid) {
    try {
      const testDocRef = doc(db, 'users', user.uid, 'test_history', recordId);
      await setDoc(testDocRef, fullRecord);
    } catch (err) {
      console.warn('Could not save test_history to user firestore doc', err);
    }
  }

  // 3. Always save to /visitor_sessions/{visitorId} in Firestore
  try {
    const visRef = doc(db, 'visitor_sessions', visitorId);
    await setDoc(
      visRef,
      {
        visitorId,
        testHistory: updatedHistory.slice(0, 25),
        updatedAt: now,
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Could not sync test_history to visitor_sessions in Firestore', err);
  }

  return recordId;
}

export async function fetchUnifiedTestHistory(user?: User | null): Promise<UnifiedTestRecord[]> {
  const ownerId = getEffectiveOwnerId(user);
  const visitorId = getOrCreateVisitorId();

  // 1. If authenticated user, check /users/{uid}/test_history
  if (user?.uid) {
    try {
      const historyCol = collection(db, 'users', user.uid, 'test_history');
      const q = query(historyCol, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      const items: UnifiedTestRecord[] = [];
      snapshot.forEach((d) => {
        items.push(d.data() as UnifiedTestRecord);
      });

      if (items.length > 0) {
        try {
          localStorage.setItem(`offline_test_history_${user.uid}`, JSON.stringify(items));
        } catch {}
        return items;
      }
    } catch (err) {
      console.warn('Firestore fetchUnifiedTestHistory failed, checking visitor session', err);
    }
  }

  // 2. Check /visitor_sessions/{visitorId} in Firestore
  try {
    const visSnap = await getDoc(doc(db, 'visitor_sessions', visitorId));
    if (visSnap.exists()) {
      const data = visSnap.data();
      if (Array.isArray(data.testHistory) && data.testHistory.length > 0) {
        try {
          localStorage.setItem(`offline_test_history_${ownerId}`, JSON.stringify(data.testHistory));
        } catch {}
        return data.testHistory as UnifiedTestRecord[];
      }
    }
  } catch {}

  // 3. Fallback to local cache
  try {
    const local =
      localStorage.getItem(`offline_test_history_${ownerId}`) ||
      localStorage.getItem(`offline_test_history_${visitorId}`) ||
      localStorage.getItem('offline_test_history_guest');
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}

  // 4. Synthesize from saved compatibility results if present
  try {
    const compResults = await fetchUserSavedResults(user);
    if (compResults.length > 0) {
      return compResults.map((c) => ({
        id: c.id,
        userId: c.userId,
        testType: 'partner_compatibility' as const,
        testTitleAr: `توافق الشريك: ${c.partnerName}`,
        testCategoryAr: 'التوافق الفكري والاجتماعي',
        scoreOrArchetype: `${c.compatibilityScore}% توافق`,
        percentage: c.compatibilityScore,
        createdAt: c.createdAt,
        badgeColor: '#2563eb',
        keyInsights: c.partnerTraits.slice(0, 3),
        snapshot: c,
      }));
    }
  } catch {}

  return [];
}

export async function deleteUnifiedTestRecord(
  user: User | null | undefined,
  recordId: string
): Promise<void> {
  const ownerId = getEffectiveOwnerId(user);
  const visitorId = getOrCreateVisitorId();

  if (user?.uid) {
    try {
      const testDocRef = doc(db, 'users', user.uid, 'test_history', recordId);
      await deleteDoc(testDocRef);
    } catch {}
  }

  try {
    const localKey = `offline_test_history_${ownerId}`;
    const existing: UnifiedTestRecord[] = JSON.parse(
      localStorage.getItem(localKey) || localStorage.getItem(`offline_test_history_${visitorId}`) || '[]'
    );
    const filtered = existing.filter((r) => r.id !== recordId);
    localStorage.setItem(localKey, JSON.stringify(filtered));
    localStorage.setItem(`offline_test_history_${visitorId}`, JSON.stringify(filtered));
    localStorage.setItem('offline_test_history_guest', JSON.stringify(filtered));

    const visRef = doc(db, 'visitor_sessions', visitorId);
    await setDoc(
      visRef,
      {
        visitorId,
        testHistory: filtered,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch {}
}

/**
 * Permanently deletes all local and cloud psychometric, intelligence, compatibility, and profile data for the user
 */
export async function purgeAllUserDataPermanently(user?: User | null): Promise<void> {
  const visitorId = getOrCreateVisitorId();
  const ownerId = getEffectiveOwnerId(user);

  // 1. Delete from Firestore visitor_sessions
  try {
    await deleteDoc(doc(db, 'visitor_sessions', visitorId));
  } catch {}

  // 2. If authenticated user, delete user document and known subcollection records
  if (user?.uid) {
    try {
      const historySnap = await getDocs(collection(db, 'users', user.uid, 'test_history'));
      for (const d of historySnap.docs) {
        await deleteDoc(d.ref);
      }
    } catch {}
    try {
      const savedSnap = await getDocs(collection(db, 'users', user.uid, 'saved_results'));
      for (const d of savedSnap.docs) {
        await deleteDoc(d.ref);
      }
    } catch {}
    try {
      const psychSnap = await getDocs(collection(db, 'users', user.uid, 'psychology_reports'));
      for (const d of psychSnap.docs) {
        await deleteDoc(d.ref);
      }
    } catch {}
    try {
      await deleteDoc(doc(db, 'users', user.uid));
    } catch {}
  }

  // 3. Purge all app keys from localStorage (preserving only theme & language preference)
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (
        k &&
        (k.startsWith('mirat_') ||
          k.startsWith('offline_') ||
          k.includes('intelligence') ||
          k.includes('psych') ||
          k.includes(ownerId) ||
          k.includes(visitorId)) &&
        k !== 'mirat_al_quloob_theme' &&
        k !== 'mirat_language'
      ) {
        keysToRemove.push(k);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
    localStorage.removeItem(VISITOR_PROFILE_STORAGE_KEY);
    localStorage.removeItem(VISITOR_LATEST_RESULT_KEY);
    localStorage.removeItem(VISITOR_ID_STORAGE_KEY);
  } catch {}
}

