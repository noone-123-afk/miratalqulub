import { db, doc, setDoc, getDocs, collection, query, orderBy, User } from '../firebase';

export interface FeedbackMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  category: 'general' | 'test_question' | 'feature_request' | 'technical' | 'partner_experience';
  categoryLabelAr: string;
  rating?: number;
  userId?: string;
  createdAt: string;
  status: 'new' | 'reviewed' | 'resolved';
}

export const OFFICIAL_EMAIL = 'one497303@gmail.com';

/**
 * Submit visitor feedback/contact message
 */
export async function submitFeedbackMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: 'general' | 'test_question' | 'feature_request' | 'technical' | 'partner_experience';
  categoryLabelAr: string;
  rating?: number;
  user?: User | null;
}): Promise<{ success: boolean; messageId: string; mailtoUrl: string }> {
  const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const feedbackDoc: FeedbackMessage = {
    id: messageId,
    name: data.name.trim(),
    email: data.email.trim(),
    subject: data.subject.trim(),
    message: data.message.trim(),
    category: data.category,
    categoryLabelAr: data.categoryLabelAr,
    rating: data.rating || 5,
    userId: data.user?.uid,
    createdAt: now,
    status: 'new',
  };

  // 1. Save to local cache for immediate availability
  try {
    const existing: FeedbackMessage[] = JSON.parse(localStorage.getItem('mirat_real_feedback_messages') || '[]');
    localStorage.setItem('mirat_real_feedback_messages', JSON.stringify([feedbackDoc, ...existing].slice(0, 50)));
  } catch {}

  // 2. Direct write to Firestore collection /feedback_messages
  try {
    const feedbackRef = doc(db, 'feedback_messages', messageId);
    await setDoc(feedbackRef, feedbackDoc);
  } catch (err) {
    console.warn('Could not write directly to Firestore feedback_messages, using server endpoint', err);
  }

  // 3. Transmit via server backend endpoint /api/feedback
  try {
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackDoc),
    });
  } catch (err) {
    console.warn('Server feedback API call failed', err);
  }

  // 4. Prepare direct mailto URL
  const mailSubject = encodeURIComponent(`[مرآة القلوب - ${data.categoryLabelAr}] ${data.subject}`);
  const mailBody = encodeURIComponent(
    `السلام عليكم ورحمة الله،\n\nالاسم: ${data.name}\nالبريد الإلكتروني: ${data.email}\nالقسم/التصنيف: ${data.categoryLabelAr}\nالتقييم: ${data.rating || 5} نجوم\n\nنص الرسالة والملاحظة:\n${data.message}\n\n---\nأُرسلت عبر نموذج الملاحظات والتواصل في منصة مِـرآة القـلوب\nالتاريخ: ${new Date().toLocaleString('ar')}`
  );
  const mailtoUrl = `mailto:${OFFICIAL_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

  return { success: true, messageId, mailtoUrl };
}

/**
 * Fetch all real feedback messages (Strictly genuine user submissions only, no fake demo items)
 */
export async function fetchFeedbackMessages(): Promise<FeedbackMessage[]> {
  try {
    const colRef = collection(db, 'feedback_messages');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    const list: FeedbackMessage[] = [];
    snapshot.forEach((d) => {
      list.push(d.data() as FeedbackMessage);
    });

    if (list.length > 0) {
      try {
        localStorage.setItem('mirat_real_feedback_messages', JSON.stringify(list));
      } catch {}
      return list;
    }
  } catch (err) {
    console.warn('Could not read feedback_messages from Firestore, trying server endpoint', err);
  }

  // Fallback to server endpoint
  try {
    const res = await fetch('/api/feedback/list');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.messages) && data.messages.length > 0) {
        return data.messages;
      }
    }
  } catch {}

  // Fallback to locally submitted real messages
  try {
    const raw = localStorage.getItem('mirat_real_feedback_messages');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}

  return [];
}
