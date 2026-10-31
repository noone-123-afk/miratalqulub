import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  ShieldAlert,
  Delete,
  RotateCcw,
  KeyRound,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { verifyPin, getStoredPin, removePinCompletely } from '../utils/privacyLock';
import { soundManager } from '../utils/sound';

interface Props {
  onUnlock: () => void;
  onBackToHome?: () => void;
}

export const PrivacyLockScreen: React.FC<Props> = ({ onUnlock, onBackToHome }) => {
  const [pin, setPin] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Handle number click
  const handleDigitPress = (digit: string) => {
    if (pin.length >= 4) return;
    soundManager.playTap();
    setErrorMsg(null);
    const nextPin = pin + digit;
    setPin(nextPin);

    // If 4 digits entered, auto-verify
    if (nextPin.length === 4) {
      setTimeout(() => checkPin(nextPin), 150);
    }
  };

  // Backspace
  const handleBackspace = () => {
    soundManager.playTap();
    setErrorMsg(null);
    setPin((prev) => prev.slice(0, -1));
  };

  // Clear
  const handleClear = () => {
    soundManager.playTap();
    setErrorMsg(null);
    setPin('');
  };

  // Verification
  const checkPin = (codeToTest: string) => {
    const isValid = verifyPin(codeToTest);
    if (isValid) {
      soundManager.playResultReveal();
      onUnlock();
    } else {
      soundManager.playTap();
      setIsShaking(true);
      setErrorMsg('رمز المرور غير صحيح! حاول مرة أخرى');
      setTimeout(() => {
        setIsShaking(false);
        setPin('');
      }, 700);
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showForgotModal) return;
      if (e.key >= '0' && e.key <= '9') {
        handleDigitPress(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, showForgotModal]);

  // Handle emergency reset PIN
  const handleResetPin = () => {
    removePinCompletely();
    setResetSuccess(true);
    setTimeout(() => {
      setShowForgotModal(false);
      onUnlock();
    }, 1200);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-6 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-sm glass-panel rounded-3xl p-6 sm:p-7 border border-rose-500/30 text-center relative overflow-hidden shadow-2xl shadow-rose-950/40"
      >
        {/* Background glow halos */}
        <div className="absolute -top-20 -right-20 w-52 h-52 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Pulsing Lock Icon */}
        <div className="relative mb-4 flex justify-center">
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              boxShadow: [
                '0 0 15px rgba(244, 63, 94, 0.3)',
                '0 0 30px rgba(244, 63, 94, 0.6)',
                '0 0 15px rgba(244, 63, 94, 0.3)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-white shadow-xl cursor-default"
          >
            <Lock className="w-8 h-8" />
          </motion.div>
        </div>

        {/* Title & Privacy Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-[11px] font-bold text-rose-300 mb-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>حماية الخصوصية مفعلة</span>
        </div>

        <h3 className="text-xl font-extrabold text-white font-['Alexandria'] mb-1">
          أدخل رمز الأمان (PIN)
        </h3>
        <p className="text-xs text-gray-300 mb-6">
          صفحة النتائج وهوية شريكك محمية برمز مرور مكون من 4 أرقام
        </p>

        {/* 4 Digit Indicators */}
        <motion.div
          animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex justify-center items-center gap-4 mb-4"
        >
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = pin.length > idx;
            return (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  scale: isFilled ? 1.15 : 1,
                  borderColor: isFilled ? '#fb7185' : 'rgba(255,255,255,0.2)',
                  backgroundColor: isFilled ? 'rgba(244, 63, 94, 0.25)' : 'rgba(255,255,255,0.05)',
                  boxShadow: isFilled ? '0 0 14px rgba(244, 63, 94, 0.5)' : 'none',
                }}
                className="w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-200"
              >
                {isFilled ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3.5 h-3.5 rounded-full bg-rose-400"
                  />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Error message */}
        <div className="h-6 mb-3 flex items-center justify-center">
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs font-bold text-rose-400 flex items-center gap-1"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <motion.button
              key={digit}
              whileHover={{ scale: 1.06, backgroundColor: 'rgba(255,255,255,0.14)' }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleDigitPress(digit)}
              className="h-13 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-['Alexandria'] text-xl font-bold flex items-center justify-center transition cursor-pointer shadow-sm"
            >
              {digit}
            </motion.button>
          ))}

          {/* Clear button */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleClear}
            className="h-13 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 text-xs font-bold flex items-center justify-center transition cursor-pointer"
            title="مسح"
          >
            مسح
          </motion.button>

          {/* Digit 0 */}
          <motion.button
            whileHover={{ scale: 1.06, backgroundColor: 'rgba(255,255,255,0.14)' }}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleDigitPress('0')}
            className="h-13 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-['Alexandria'] text-xl font-bold flex items-center justify-center transition cursor-pointer shadow-sm"
          >
            0
          </motion.button>

          {/* Backspace button */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={handleBackspace}
            className="h-13 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-rose-300 flex items-center justify-center transition cursor-pointer"
            title="حذف رقم"
          >
            <Delete className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Secondary options footer */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={() => setShowForgotModal(true)}
            className="hover:text-rose-300 transition underline underline-offset-4 cursor-pointer"
          >
            نسيت رمز المرور؟
          </button>

          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <span>إعادة الاختبار</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Forgot PIN / Reset Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 10 }}
              className="w-full max-w-sm glass-panel rounded-3xl p-6 border border-white/20 text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-300">
                <KeyRound className="w-6 h-6" />
              </div>

              <h4 className="font-extrabold text-lg text-white font-['Alexandria']">
                إعادة تعيين رمز الأمان
              </h4>

              {resetSuccess ? (
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                  تم إلغاء قفل الأمان بنجاح! جاري فتح النتيجة...
                </div>
              ) : (
                <>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    هل نسيت رمز المرور الخاص بك؟ يمكنك إلغاء قفل الأمان وفتح النتيجة مباشرة دون فقدان أي بيانات.
                  </p>

                  <div className="flex gap-2 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleResetPin}
                      className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs cursor-pointer shadow-md shadow-rose-500/25"
                    >
                      إلغاء القفل وفتح النتيجة
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowForgotModal(false)}
                      className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 font-medium text-xs cursor-pointer"
                    >
                      إلغاء
                    </motion.button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
