// Service for managing Novel Comments and Owner-Created Custom Novels
// Interacts with Firestore with local fallback and offline caching

import {
  db,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  deleteDoc,
} from '../firebase';
import { Novel, NOVELS_CATALOG } from '../data/novelsData';

export interface NovelComment {
  id: string;
  novelId: string;
  userName: string;
  userRoleTitle?: string;
  rating: number; // 1 to 5
  commentText: string;
  createdAt: string;
  likesCount: number;
}

const LOCAL_CUSTOM_NOVELS_KEY = 'mirat_owner_custom_novels';
const LOCAL_MODIFIED_NOVELS_KEY = 'mirat_owner_modified_novels';
const LOCAL_HIDDEN_NOVELS_KEY = 'mirat_owner_hidden_novels';
const LOCAL_COMMENTS_STORAGE_KEY = 'mirat_novels_user_comments';

// ----------------------------------------------------
// 1. Fetch Comments for a specific novel (Strictly Real User Comments Only)
// ----------------------------------------------------
export async function getNovelComments(novelId: string): Promise<NovelComment[]> {
  // 1. Load locally cached comments from localStorage
  let localComments: NovelComment[] = [];
  try {
    const raw = localStorage.getItem(`${LOCAL_COMMENTS_STORAGE_KEY}_${novelId}`);
    if (raw) {
      localComments = JSON.parse(raw);
    }
  } catch {
    // Ignore local storage error
  }

  // 2. Fetch from Firestore if available
  try {
    const commentsRef = collection(db, 'novel_comments');
    const q = query(commentsRef, where('novelId', '==', novelId));
    const snapshot = await getDocs(q);
    const firestoreComments: NovelComment[] = [];
    snapshot.forEach((d) => {
      const data = d.data();
      firestoreComments.push({
        id: d.id,
        novelId: data.novelId,
        userName: data.userName,
        userRoleTitle: data.userRoleTitle,
        rating: data.rating,
        commentText: data.commentText,
        createdAt: data.createdAt,
        likesCount: data.likesCount || 0,
      });
    });

    if (firestoreComments.length > 0) {
      const existingIds = new Set(firestoreComments.map((c) => c.id));
      const combined = [...firestoreComments];
      localComments.forEach((c) => {
        if (!existingIds.has(c.id)) {
          combined.push(c);
          existingIds.add(c.id);
        }
      });
      return combined;
    }
  } catch {
    // Firestore may be in offline mode, fall through
  }

  return localComments;
}

// ----------------------------------------------------
// 2. Add New Comment for a novel
// ----------------------------------------------------
export async function addNovelComment(
  novelId: string,
  userName: string,
  rating: number,
  commentText: string,
  userRoleTitle?: string
): Promise<NovelComment> {
  const newComment: NovelComment = {
    id: `com_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    novelId,
    userName: userName.trim() || 'قارئ زائر',
    userRoleTitle: userRoleTitle?.trim() || 'متابع للتحقيقات',
    rating: Math.max(1, Math.min(5, rating)),
    commentText: commentText.trim(),
    createdAt: 'الآن',
    likesCount: 1,
  };

  // Save to local storage cache immediately
  try {
    const raw = localStorage.getItem(`${LOCAL_COMMENTS_STORAGE_KEY}_${novelId}`);
    const currentList: NovelComment[] = raw ? JSON.parse(raw) : [];
    const updated = [newComment, ...currentList];
    localStorage.setItem(`${LOCAL_COMMENTS_STORAGE_KEY}_${novelId}`, JSON.stringify(updated));
  } catch {
    // Ignore
  }

  // Save to Firestore
  try {
    const commentDoc = doc(db, 'novel_comments', newComment.id);
    await setDoc(commentDoc, {
      ...newComment,
      timestamp: Date.now(),
    });
  } catch (err) {
    console.warn('Could not sync comment to Firestore immediately, saved locally.', err);
  }

  return newComment;
}

// ----------------------------------------------------
// 3. Like a Comment
// ----------------------------------------------------
export async function likeNovelComment(commentId: string, novelId: string): Promise<void> {
  try {
    const raw = localStorage.getItem(`${LOCAL_COMMENTS_STORAGE_KEY}_${novelId}`);
    if (raw) {
      const list: NovelComment[] = JSON.parse(raw);
      const updated = list.map((c) =>
        c.id === commentId ? { ...c, likesCount: c.likesCount + 1 } : c
      );
      localStorage.setItem(`${LOCAL_COMMENTS_STORAGE_KEY}_${novelId}`, JSON.stringify(updated));
    }
  } catch {
    // Ignore
  }

  try {
    const commentDoc = doc(db, 'novel_comments', commentId);
    const snap = await getDoc(commentDoc);
    if (snap.exists()) {
      const currentLikes = snap.data().likesCount || 0;
      await setDoc(commentDoc, { likesCount: currentLikes + 1 }, { merge: true });
    }
  } catch {
    // Ignore
  }
}

// ----------------------------------------------------
// 4. Owner Novels Management (تعديل، حذف، وإضافة الروايات - خاص بالمالك)
// ----------------------------------------------------

// Get hidden novel IDs
export async function getHiddenNovelIds(): Promise<Set<string>> {
  const hidden = new Set<string>();
  try {
    const raw = localStorage.getItem(LOCAL_HIDDEN_NOVELS_KEY);
    if (raw) {
      const arr: string[] = JSON.parse(raw);
      arr.forEach((id) => hidden.add(id));
    }
  } catch {
    // Ignore
  }

  try {
    const snapshot = await getDocs(collection(db, 'hidden_novels'));
    snapshot.forEach((d) => {
      hidden.add(d.id);
    });
  } catch {
    // Ignore
  }

  return hidden;
}

// Get modified novels map
export async function getModifiedNovelsMap(): Promise<Record<string, Novel>> {
  const map: Record<string, Novel> = {};
  try {
    const raw = localStorage.getItem(LOCAL_MODIFIED_NOVELS_KEY);
    if (raw) {
      const parsed: Record<string, Novel> = JSON.parse(raw);
      Object.assign(map, parsed);
    }
  } catch {
    // Ignore
  }

  try {
    const snapshot = await getDocs(collection(db, 'modified_novels'));
    snapshot.forEach((d) => {
      const data = d.data() as Novel;
      map[data.id] = data;
    });
  } catch {
    // Ignore
  }

  return map;
}

// Get custom novels created by owner
export async function getOwnerCustomNovels(): Promise<Novel[]> {
  let list: Novel[] = [];
  try {
    const raw = localStorage.getItem(LOCAL_CUSTOM_NOVELS_KEY);
    if (raw) {
      list = JSON.parse(raw);
    }
  } catch {
    // Ignore
  }

  try {
    const novelsRef = collection(db, 'custom_novels');
    const snapshot = await getDocs(novelsRef);
    const firestoreNovels: Novel[] = [];
    snapshot.forEach((d) => {
      firestoreNovels.push(d.data() as Novel);
    });

    if (firestoreNovels.length > 0) {
      const ids = new Set(firestoreNovels.map((n) => n.id));
      const merged = [...firestoreNovels];
      list.forEach((n) => {
        if (!ids.has(n.id)) {
          merged.push(n);
          ids.add(n.id);
        }
      });
      return merged;
    }
  } catch {
    // Fall back to local
  }

  return list;
}

// Get all merged novels (Built-in + Custom + Modified, minus Hidden)
export async function getAllNovels(): Promise<Novel[]> {
  const [hiddenIds, modifiedMap, customNovels] = await Promise.all([
    getHiddenNovelIds(),
    getModifiedNovelsMap(),
    getOwnerCustomNovels(),
  ]);

  // Merge built-in catalog with modifications
  const mergedMap = new Map<string, Novel>();

  // 1. Built-in catalog
  NOVELS_CATALOG.forEach((novel) => {
    if (!hiddenIds.has(novel.id)) {
      const effectiveNovel = modifiedMap[novel.id] ? { ...novel, ...modifiedMap[novel.id] } : novel;
      mergedMap.set(novel.id, effectiveNovel);
    }
  });

  // 2. Custom novels
  customNovels.forEach((novel) => {
    if (!hiddenIds.has(novel.id)) {
      const effectiveNovel = modifiedMap[novel.id] ? { ...novel, ...modifiedMap[novel.id] } : novel;
      mergedMap.set(novel.id, effectiveNovel);
    }
  });

  return Array.from(mergedMap.values());
}

// Save or Update a novel (Owner only)
export async function saveOrUpdateNovel(novel: Novel): Promise<void> {
  const isCustom = !NOVELS_CATALOG.some((n) => n.id === novel.id);

  // If custom novel, save in custom_novels
  if (isCustom) {
    try {
      const current = await getOwnerCustomNovels();
      const filtered = current.filter((n) => n.id !== novel.id);
      const updated = [novel, ...filtered];
      localStorage.setItem(LOCAL_CUSTOM_NOVELS_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    try {
      const novelDoc = doc(db, 'custom_novels', novel.id);
      await setDoc(novelDoc, {
        ...novel,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('Could not sync custom novel to Firestore:', err);
    }
  }

  // Also save in modified_novels to preserve any modifications
  try {
    const raw = localStorage.getItem(LOCAL_MODIFIED_NOVELS_KEY);
    const map: Record<string, Novel> = raw ? JSON.parse(raw) : {};
    map[novel.id] = novel;
    localStorage.setItem(LOCAL_MODIFIED_NOVELS_KEY, JSON.stringify(map));
  } catch {
    // Ignore
  }

  try {
    const modDoc = doc(db, 'modified_novels', novel.id);
    await setDoc(modDoc, {
      ...novel,
      modifiedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Could not sync modified novel to Firestore:', err);
  }

  // Remove from hidden if it was previously hidden
  try {
    const rawHidden = localStorage.getItem(LOCAL_HIDDEN_NOVELS_KEY);
    if (rawHidden) {
      const hiddenList: string[] = JSON.parse(rawHidden);
      const newHidden = hiddenList.filter((id) => id !== novel.id);
      localStorage.setItem(LOCAL_HIDDEN_NOVELS_KEY, JSON.stringify(newHidden));
    }
  } catch {
    // Ignore
  }
}

// Backwards-compatible alias for creating novel
export async function saveOwnerCustomNovel(novel: Novel): Promise<void> {
  return saveOrUpdateNovel(novel);
}

// Delete novel (Owner only)
export async function deleteOwnerNovel(novelId: string): Promise<void> {
  // 1. Add to hidden novels in localStorage
  try {
    const raw = localStorage.getItem(LOCAL_HIDDEN_NOVELS_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    if (!list.includes(novelId)) {
      list.push(novelId);
      localStorage.setItem(LOCAL_HIDDEN_NOVELS_KEY, JSON.stringify(list));
    }
  } catch {
    // Ignore
  }

  // 2. Remove from custom novels in localStorage
  try {
    const raw = localStorage.getItem(LOCAL_CUSTOM_NOVELS_KEY);
    if (raw) {
      const list: Novel[] = JSON.parse(raw);
      const updated = list.filter((n) => n.id !== novelId);
      localStorage.setItem(LOCAL_CUSTOM_NOVELS_KEY, JSON.stringify(updated));
    }
  } catch {
    // Ignore
  }

  // 3. Remove from modified novels in localStorage
  try {
    const raw = localStorage.getItem(LOCAL_MODIFIED_NOVELS_KEY);
    if (raw) {
      const map: Record<string, Novel> = JSON.parse(raw);
      delete map[novelId];
      localStorage.setItem(LOCAL_MODIFIED_NOVELS_KEY, JSON.stringify(map));
    }
  } catch {
    // Ignore
  }

  // 4. Update Firestore
  try {
    await setDoc(doc(db, 'hidden_novels', novelId), {
      id: novelId,
      hidden: true,
      deletedAt: new Date().toISOString(),
    });
  } catch {
    // Ignore
  }

  try {
    await deleteDoc(doc(db, 'custom_novels', novelId));
  } catch {
    // Ignore
  }

  try {
    await deleteDoc(doc(db, 'modified_novels', novelId));
  } catch {
    // Ignore
  }
}

// Backwards-compatible alias
export async function deleteOwnerCustomNovel(novelId: string): Promise<void> {
  return deleteOwnerNovel(novelId);
}
