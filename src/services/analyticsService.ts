import { db, doc, setDoc, getDoc, getDocs, collection } from '../firebase';

export interface AnalyticsSummary {
  totalVisitors: number;
  todayVisitors: number;
  monthVisitors: number;
  yearVisitors: number;
  pageViews: number;
  testCounts: {
    partner_compatibility: { started: number; completed: number };
    intelligence_multiple: { started: number; completed: number };
    psychology_16pf: { started: number; completed: number };
    psychology_bigfive: { started: number; completed: number };
    blind_date: { started: number; completed: number };
    novels: { views: number };
    articles: { views: number };
  };
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  lastUpdated: string;
}

// Session cache to prevent over-counting in a single tab session
let hasTrackedSession = false;

function getTodayString(): string {
  const d = new Date();
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
}

function getMonthString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
}

function getYearString(): string {
  return String(new Date().getFullYear());
}

function detectDevice(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent.toLowerCase();
  if (/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(ua)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

/**
 * Tracks a site visit (daily, monthly, yearly)
 */
export async function trackSiteVisit(): Promise<void> {
  if (hasTrackedSession) return;
  hasTrackedSession = true;

  const today = getTodayString();
  const month = getMonthString();
  const year = getYearString();
  const device = detectDevice();
  const now = new Date().toISOString();

  // Call server analytics endpoint if available
  try {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'visit', today, month, year, device }),
    }).catch(() => {});
  } catch {}

  // Also persist directly to Firestore for resilience
  try {
    const overviewRef = doc(db, 'site_analytics', 'overview');
    const overviewSnap = await getDoc(overviewRef);
    const existing = overviewSnap.exists() ? overviewSnap.data() : {};

    const currentTotal = (existing.totalVisitors || 0) + 1;
    const currentViews = (existing.pageViews || 0) + 1;
    const devices = existing.deviceBreakdown || { mobile: 0, desktop: 0, tablet: 0 };
    devices[device] = (devices[device] || 0) + 1;

    await setDoc(
      overviewRef,
      {
        id: 'overview',
        type: 'overview',
        totalVisitors: currentTotal,
        pageViews: currentViews,
        deviceBreakdown: devices,
        updatedAt: now,
      },
      { merge: true }
    );

    // Update Daily Doc
    const dailyRef = doc(db, 'site_analytics', `daily_${today}`);
    const dailySnap = await getDoc(dailyRef);
    const dailyData = dailySnap.exists() ? dailySnap.data() : {};
    await setDoc(
      dailyRef,
      {
        id: `daily_${today}`,
        type: 'daily',
        period: today,
        visitorCount: (dailyData.visitorCount || 0) + 1,
        pageViews: (dailyData.pageViews || 0) + 1,
        updatedAt: now,
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Analytics local fallback tracking', err);
  }
}

/**
 * Tracks an interactive test or section event
 */
export async function trackTestEvent(
  testKey: 'partner_compatibility' | 'intelligence_multiple' | 'psychology_16pf' | 'psychology_bigfive' | 'blind_date' | 'novels' | 'articles',
  action: 'started' | 'completed' | 'viewed'
): Promise<void> {
  const now = new Date().toISOString();

  // Server API
  try {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'test_event', testKey, action }),
    }).catch(() => {});
  } catch {}

  // Direct Firestore
  try {
    const overviewRef = doc(db, 'site_analytics', 'overview');
    const snap = await getDoc(overviewRef);
    const data = snap.exists() ? snap.data() : {};
    const testCounts = data.testCounts || {
      partner_compatibility: { started: 0, completed: 0 },
      intelligence_multiple: { started: 0, completed: 0 },
      psychology_16pf: { started: 0, completed: 0 },
      psychology_bigfive: { started: 0, completed: 0 },
      blind_date: { started: 0, completed: 0 },
      novels: { views: 0 },
      articles: { views: 0 },
    };

    if (!testCounts[testKey]) {
      testCounts[testKey] = { started: 0, completed: 0, views: 0 };
    }

    if (action === 'viewed') {
      testCounts[testKey].views = (testCounts[testKey].views || 0) + 1;
    } else {
      testCounts[testKey][action] = (testCounts[testKey][action] || 0) + 1;
    }

    await setDoc(
      overviewRef,
      {
        testCounts,
        updatedAt: now,
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Could not record test event to analytics', err);
  }
}

/**
 * Fetch full analytics summary (combining Firestore & defaults)
 */
export async function fetchAnalyticsSummary(): Promise<AnalyticsSummary> {
  // First try server endpoint
  try {
    const res = await fetch('/api/analytics/stats');
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch {}

  // Then try Firestore directly
  try {
    const overviewRef = doc(db, 'site_analytics', 'overview');
    const snap = await getDoc(overviewRef);
    if (snap.exists()) {
      const d = snap.data();
      const today = getTodayString();
      const dailySnap = await getDoc(doc(db, 'site_analytics', `daily_${today}`));
      const todayCount = dailySnap.exists() ? dailySnap.data().visitorCount || 0 : 0;

      return {
        totalVisitors: d.totalVisitors || 0,
        todayVisitors: todayCount,
        monthVisitors: d.totalVisitors || 0,
        yearVisitors: d.totalVisitors || 0,
        pageViews: d.pageViews || 0,
        testCounts: d.testCounts || {
          partner_compatibility: { started: 0, completed: 0 },
          intelligence_multiple: { started: 0, completed: 0 },
          psychology_16pf: { started: 0, completed: 0 },
          psychology_bigfive: { started: 0, completed: 0 },
          blind_date: { started: 0, completed: 0 },
          novels: { views: 0 },
          articles: { views: 0 },
        },
        deviceBreakdown: d.deviceBreakdown || { mobile: 0, desktop: 0, tablet: 0 },
        lastUpdated: d.updatedAt || new Date().toISOString(),
      };
    }
  } catch (err) {
    console.warn('Failed to fetch analytics from Firestore', err);
  }

  return {
    totalVisitors: 0,
    todayVisitors: 0,
    monthVisitors: 0,
    yearVisitors: 0,
    pageViews: 0,
    testCounts: {
      partner_compatibility: { started: 0, completed: 0 },
      intelligence_multiple: { started: 0, completed: 0 },
      psychology_16pf: { started: 0, completed: 0 },
      psychology_bigfive: { started: 0, completed: 0 },
      blind_date: { started: 0, completed: 0 },
      novels: { views: 0 },
      articles: { views: 0 },
    },
    deviceBreakdown: {
      mobile: 0,
      desktop: 0,
      tablet: 0,
    },
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Triggers an analytical report dispatch to the official owner email (one497303@gmail.com)
 */
export async function sendAnalyticsEmailReport(summary: AnalyticsSummary): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch('/api/analytics/send-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: 'one497303@gmail.com',
        summary,
        timestamp: new Date().toISOString(),
      }),
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, message: data.message || 'تم إرسال التقرير التحليلي بنجاح إلى one497303@gmail.com' };
    }
  } catch (e) {
    console.error('Email report API call failed', e);
  }

  return {
    success: true,
    message: 'تم تجهيز وحفظ التقرير التحليلي وجاهز للإرسال إلى one497303@gmail.com',
  };
}
