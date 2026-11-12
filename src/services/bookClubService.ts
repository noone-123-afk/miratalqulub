import { db, doc, getDoc, setDoc, collection, addDoc, getDocs, query, orderBy, limit, deleteDoc } from '../firebase';

export interface BookClubSession {
  id: string;
  bookTitleAr: string;
  bookTitleEn: string;
  authorAr: string;
  authorEn: string;
  coverImage?: string;
  descriptionAr: string;
  descriptionEn: string;
  sessionDate: string; // e.g. "2026-11-20"
  sessionTimeAr: string; // e.g. "8:00 مساءً بتوقيت مكة"
  sessionTimeEn: string; // e.g. "8:00 PM (Mecca Time)"
  status: 'scheduled' | 'live' | 'completed';
  objectivesAr: string[];
  objectivesEn: string[];
  updatedAt: string;
}

export interface BookClubChatMessage {
  id: string;
  senderName: string;
  senderRole?: 'admin' | 'moderator' | 'reader';
  text: string;
  createdAt: string;
  likes?: number;
}

const LOCAL_STORAGE_SESSION_KEY = 'mirat_book_club_session_v1';
const LOCAL_STORAGE_MESSAGES_KEY = 'mirat_book_club_messages_v1';

export const DEFAULT_BOOK_SESSION: BookClubSession = {
  id: 'current_week_session',
  bookTitleAr: 'الذكاء العاطفي في العلاقات الإنسانية',
  bookTitleEn: 'Emotional Intelligence in Human Relationships',
  authorAr: 'د. دانييل غولمان (تحليل ونقاش تطبيقي)',
  authorEn: 'Dr. Daniel Goleman (Applied Discussion)',
  coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
  descriptionAr:
    'يناقش الصالون هذا الأسبوع كيف يؤثر الوعي بالمشاعر والتعاطف والتنظيم الانفعالي على نجاح العلاقات الزوجية والاجتماعية وتجاوز الخلافات بحكمة.',
  descriptionEn:
    'This week the salon explores how emotional awareness, empathy, and affective regulation elevate marital and personal relationships and resolve conflicts constructively.',
  sessionDate: '2026-11-20',
  sessionTimeAr: 'الجمعة القادمة • 8:00 مساءً (بتوقيت مكة المكرمة)',
  sessionTimeEn: 'Upcoming Friday • 8:00 PM (Mecca Time)',
  status: 'scheduled',
  objectivesAr: [
    'فهم الأنماط الانفعالية الأربعة في إدارة الغضب أثناء الخلاف.',
    'التفريق بين التعاطف المعرفي والتعاطف الوجداني مع الشريك.',
    'خطوات عملية لبناء المرونة العاطفية في مواجهة الضغوط اليومية.',
    'تبادل التجارب الواقعية حول تطبيق الاستبصار الذاتي في التواصل.',
  ],
  objectivesEn: [
    'Understanding 4 affective patterns in managing conflict and anger.',
    'Distinguishing cognitive empathy from affective empathy with partners.',
    'Actionable steps to build emotional agility under daily stress.',
    'Sharing real-world reflections on mindful interpersonal dialogue.',
  ],
  updatedAt: new Date().toISOString(),
};

export const DEFAULT_CHAT_MESSAGES: BookClubChatMessage[] = [
  {
    id: 'msg-welcome-admin',
    senderName: 'إدارة مرآة القلوب',
    senderRole: 'admin',
    text: 'أهلاً بكم في صالون القراءة والنقاش الأسبوعي. نلتقي كل أسبوع لمناقشة كتاب هادف في بيئة تسودها الخصوصية والرقي الفكري. يمكنكم مشاركة آرائكم وطرح أسئلتكم حول كتاب هذا الأسبوع.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    likes: 8,
  },
  {
    id: 'msg-reader-1',
    senderName: 'سارة م.',
    senderRole: 'reader',
    text: 'فصل «الوعي بالذات» في الكتاب كان ملهماً جداً، خصوصاً فكرة التوقف لثوانٍ قبل الرد في لحظات الانفعال!',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    likes: 5,
  },
  {
    id: 'msg-reader-2',
    senderName: 'عمر القحطاني',
    senderRole: 'reader',
    text: 'أعجبني تطبيق الكاتب لمفهوم التعاطف الوجداني، بانتظار موعد النقاش المباشر يوم الجمعة بإذن الله.',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    likes: 3,
  },
];

export async function fetchCurrentBookSession(): Promise<BookClubSession> {
  try {
    const sessionRef = doc(db, 'site_config', 'book_club_session');
    const snap = await getDoc(sessionRef);
    if (snap.exists()) {
      const data = snap.data() as BookClubSession;
      localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn('Could not fetch book club session from Firestore, checking localStorage', err);
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }

  return DEFAULT_BOOK_SESSION;
}

export async function saveBookSession(session: BookClubSession): Promise<void> {
  const updated = {
    ...session,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(updated));

  try {
    const sessionRef = doc(db, 'site_config', 'book_club_session');
    await setDoc(sessionRef, updated, { merge: true });
  } catch (err) {
    console.warn('Could not sync book club session to Firestore', err);
  }
}

export async function fetchBookClubMessages(): Promise<BookClubChatMessage[]> {
  try {
    const colRef = collection(db, 'site_config', 'book_club_session', 'messages');
    const q = query(colRef, orderBy('createdAt', 'asc'), limit(100));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const msgs = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<BookClubChatMessage, 'id'>),
      }));
      localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(msgs));
      return msgs;
    }
  } catch (err) {
    console.warn('Could not fetch book club messages from Firestore, checking localStorage', err);
  }

  const cached = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      // ignore
    }
  }

  return DEFAULT_CHAT_MESSAGES;
}

export async function postBookClubMessage(message: Omit<BookClubChatMessage, 'id'>): Promise<BookClubChatMessage> {
  const newMsg: BookClubChatMessage = {
    ...message,
    id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
  };

  const current = await fetchBookClubMessages();
  const updated = [...current, newMsg];
  localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(updated));

  try {
    const colRef = collection(db, 'site_config', 'book_club_session', 'messages');
    await setDoc(doc(colRef, newMsg.id), newMsg);
  } catch (err) {
    console.warn('Could not post message to Firestore', err);
  }

  return newMsg;
}

export async function deleteBookClubMessage(messageId: string): Promise<void> {
  const current = await fetchBookClubMessages();
  const filtered = current.filter((m) => m.id !== messageId);
  localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(filtered));

  try {
    const msgRef = doc(db, 'site_config', 'book_club_session', 'messages', messageId);
    await deleteDoc(msgRef);
  } catch (err) {
    console.warn('Could not delete message from Firestore', err);
  }
}
