import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  User,
} from '../firebase';
import { soundManager } from '../utils/sound';

export const OWNER_EMAIL = 'one497303@gmail.com';

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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const translateAuthError = (err: any): string => {
    const code = err?.code || '';
    if (code.includes('user-not-found') || code.includes('wrong-password') || code.includes('invalid-credential')) {
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
  };

  const signInWithGoogleHandler = async () => {
    setAuthError(null);
    try {
      soundManager.playTap();
      await signInWithPopup(auth, googleProvider);
      soundManager.playRoundPass();
    } catch (err: any) {
      console.error('Google Sign-In failed', err);
      setAuthError(translateAuthError(err));
      throw err;
    }
  };

  const signInWithEmailHandler = async (email: string, pass: string) => {
    setAuthError(null);
    try {
      soundManager.playTap();
      await signInWithEmailAndPassword(auth, email.trim(), pass);
      soundManager.playRoundPass();
    } catch (err: any) {
      console.error('Email Sign-In failed', err);
      setAuthError(translateAuthError(err));
      throw err;
    }
  };

  const signUpWithEmailHandler = async (email: string, pass: string, displayName?: string) => {
    setAuthError(null);
    try {
      soundManager.playTap();
      await createUserWithEmailAndPassword(auth, email.trim(), pass);
      soundManager.playRoundPass();
    } catch (err: any) {
      console.error('Email Sign-Up failed', err);
      setAuthError(translateAuthError(err));
      throw err;
    }
  };

  const signInAsGuestHandler = async () => {
    setAuthError(null);
    try {
      soundManager.playTap();
      await signInAnonymously(auth);
      soundManager.playRoundPass();
    } catch (err: any) {
      console.error('Guest Sign-In failed', err);
      setAuthError(translateAuthError(err));
      throw err;
    }
  };

  const logoutHandler = async () => {
    soundManager.playTap();
    await signOut(auth);
  };

  const isOwner = Boolean(
    user && user.email && user.email.toLowerCase() === OWNER_EMAIL.toLowerCase()
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isOwner,
        signInWithGoogle: signInWithGoogleHandler,
        signInWithEmail: signInWithEmailHandler,
        signUpWithEmail: signUpWithEmailHandler,
        signInAsGuest: signInAsGuestHandler,
        logout: logoutHandler,
        authError,
        clearError: () => setAuthError(null),
      }}
    >
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
