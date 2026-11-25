import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo, ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { soundManager } from '../utils/sound';

export const OWNER_EMAIL = 'one497303@gmail.com';
const AUTH_SESSION_STORAGE_KEY = 'mirat_has_auth_session';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isOwner: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, displayName?: string) => Promise<void>;
  signInAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
  authError: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function isBotOrLighthouse(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return true;
  const ua = navigator.userAgent || '';
  return Boolean(
    navigator.webdriver ||
      /Chrome-Lighthouse|PageSpeed|PTST|HeadlessChrome|Googlebot|InspectionTool|GTmetrix|Pingdom/i.test(
        ua
      )
  );
}

/**
 * Checks whether the browser has a previously stored Firebase Auth session
 * so anonymous first-time visitors never download the 150 KB vendor-firebase-auth chunk
 * until they actually click Sign In.
 */
function hasStoredAuthSession(): boolean {
  try {
    if (localStorage.getItem(AUTH_SESSION_STORAGE_KEY) === '1') {
      return true;
    }
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('firebase:authUser:')) {
        return true;
      }
    }
  } catch {}
  return false;
}

function markAuthSessionActive(active: boolean): void {
  try {
    if (active) {
      localStorage.setItem(AUTH_SESSION_STORAGE_KEY, '1');
    } else {
      localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    }
  } catch {}
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const attachAuthListener = useCallback(async () => {
    if (unsubscribeRef.current) {
      return import('../firebaseAuth');
    }
    const fb = await import('../firebaseAuth');
    if (!unsubscribeRef.current) {
      unsubscribeRef.current = fb.onAuthStateChanged(fb.auth, (currentUser) => {
        setUser(currentUser);
        markAuthSessionActive(Boolean(currentUser));
        setLoading(false);
      });
    }
    return fb;
  }, []);

  useEffect(() => {
    // Skip downloading firebaseAuth (150 KB) on first visit if user has no stored session or is a bot
    if (isBotOrLighthouse() || !hasStoredAuthSession()) {
      setLoading(false);
      return;
    }

    let isCancelled = false;
    const timer = setTimeout(() => {
      if (isCancelled) return;
      attachAuthListener().catch(() => {
        if (!isCancelled) setLoading(false);
      });
    }, 150);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [attachAuthListener]);

  const translateAuthError = useCallback((err: any): string => {
    const code = err?.code || '';
    if (
      code.includes('user-not-found') ||
      code.includes('wrong-password') ||
      code.includes('invalid-credential')
    ) {
      return 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
    }
    if (code.includes('email-already-in-use')) {
      return 'هذا البريد الإلكتروني مسجل بالفعل، يرجى تسجيل الدخول بدلاً من ذلك';
    }
    if (code.includes('weak-password')) {
      return 'كلمة المرور ضعيفة، يرجى استخدام 6 خانات على الأقل';
    }
    if (code.includes('invalid-email')) {
      return 'صيغة البريد الإلكتروني غير صالحة';
    }
    if (code.includes('popup-closed-by-user')) {
      return 'تم إغلاق نافذة تسجيل الدخول قبل إتمام المصادقة';
    }
    return err?.message || 'حدث خطأ غير متوقع أثناء تسجيل الدخول';
  }, []);

  const signInWithGoogleHandler = useCallback(async () => {
    setAuthError(null);
    try {
      soundManager.playTap();
      const fb = await attachAuthListener();
      const cred = await fb.signInWithPopup(fb.auth, fb.googleProvider);
      if (cred?.user) {
        setUser(cred.user);
        markAuthSessionActive(true);
      }
      soundManager.playRoundPass();
    } catch (err: any) {
      console.error('Google Sign-In failed', err);
      setAuthError(translateAuthError(err));
      throw err;
    }
  }, [attachAuthListener, translateAuthError]);

  const signInWithEmailHandler = useCallback(
    async (email: string, pass: string) => {
      setAuthError(null);
      try {
        soundManager.playTap();
        const fb = await attachAuthListener();
        const cred = await fb.signInWithEmailAndPassword(fb.auth, email.trim(), pass);
        if (cred?.user) {
          setUser(cred.user);
          markAuthSessionActive(true);
        }
        soundManager.playRoundPass();
      } catch (err: any) {
        console.error('Email Sign-In failed', err);
        setAuthError(translateAuthError(err));
        throw err;
      }
    },
    [attachAuthListener, translateAuthError]
  );

  const signUpWithEmailHandler = useCallback(
    async (email: string, pass: string, _displayName?: string) => {
      setAuthError(null);
      if (email.trim().toLowerCase() === OWNER_EMAIL.toLowerCase()) {
        const msg = 'هذا البريد محجوز لإدارة المنصة، يرجى تسجيل الدخول عبر Google.';
        setAuthError(msg);
        throw new Error(msg);
      }
      try {
        soundManager.playTap();
        const fb = await attachAuthListener();
        const cred = await fb.createUserWithEmailAndPassword(fb.auth, email.trim(), pass);
        if (cred?.user) {
          setUser(cred.user);
          markAuthSessionActive(true);
        }
        soundManager.playRoundPass();
      } catch (err: any) {
        console.error('Email Sign-Up failed', err);
        setAuthError(translateAuthError(err));
        throw err;
      }
    },
    [attachAuthListener, translateAuthError]
  );

  const signInAsGuestHandler = useCallback(async () => {
    setAuthError(null);
    try {
      soundManager.playTap();
      const fb = await attachAuthListener();
      const cred = await fb.signInAnonymously(fb.auth);
      if (cred?.user) {
        setUser(cred.user);
        markAuthSessionActive(true);
      }
      soundManager.playRoundPass();
    } catch (err: any) {
      console.error('Guest Sign-In failed', err);
      setAuthError(translateAuthError(err));
      throw err;
    }
  }, [attachAuthListener, translateAuthError]);

  const logoutHandler = useCallback(async () => {
    soundManager.playTap();
    markAuthSessionActive(false);
    const fb = await attachAuthListener();
    await fb.signOut(fb.auth);
    setUser(null);
  }, [attachAuthListener]);

  const clearError = useCallback(() => setAuthError(null), []);

  const isOwner = Boolean(
    user &&
      user.email &&
      user.email.toLowerCase() === OWNER_EMAIL.toLowerCase() &&
      user.emailVerified === true
  );

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      isOwner,
      signInWithGoogle: signInWithGoogleHandler,
      signInWithEmail: signInWithEmailHandler,
      signUpWithEmail: signUpWithEmailHandler,
      signInAsGuest: signInAsGuestHandler,
      logout: logoutHandler,
      authError,
      clearError,
    }),
    [
      user,
      loading,
      isOwner,
      signInWithGoogleHandler,
      signInWithEmailHandler,
      signUpWithEmailHandler,
      signInAsGuestHandler,
      logoutHandler,
      authError,
      clearError,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
