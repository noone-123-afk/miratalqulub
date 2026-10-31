import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  ShieldCheck,
  X,
  KeyRound,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  setPinLock,
  disablePinLock,
  isPinLockEnabled,
  getStoredPin,
} from '../utils/privacyLock';
import { soundManager } from '../utils/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPinConfigured: (isLockedNow: boolean) => void;
}

export const PrivacySettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onPinConfigured,
}) => {
  const currentEnabled = isPinLockEnabled();
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPinText, setShowPinText] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!/^\d{4}$/.test(newPin)) {
      setErrorMsg('يجب أن يتكون رمز الأمان من 4 أرقام بالضبط');
      return;
    }

    if (newPin !== confirmPin) {
      setErrorMsg('رمزا الأمان غير متطابقين، يرجى التأكد');
      return;
    }

    soundManager.playResultReveal();
    setPinLock(newPin);
    setSuccessMsg('تم تفعيل وحفظ رمز الأمان بنجاح! 🔒');

    setTimeout(() => {
      onPinConfigured(false);
      onClose();
    }, 1200);
  };

  const handleDisablePin = () => {
    soundManager.playTap();
    disablePinLock();
    setSuccessMsg('تم إيقاف قفل الأمان لصفحة النتائج 🔓');
    setTimeout(() => {
      onPinConfigured(false);
      onClose();
    }, 1000);
  };

  const handleLockNow = () => {
    soundManager.playTap();
    onPinConfigured(true); // lock immediately
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="w-full max-w-md glass-panel rounded-3xl p-6 border border-white/20 relative shadow-2xl overflow-hidden"
      >
        {/* Glow corner accents */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white font-['Alexandria']">
                إعدادات قفل الأمان والخصوصية
              </h3>
              <p className="text-[11px] text-gray-300">
                حماية صفحة النتائج برمز دخول PIN مكون من 4 أرقام
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current status banner */}
        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 mb-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            {currentEnabled ? (
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            ) : (
              <Unlock className="w-5 h-5 text-amber-400" />
            )}
            <div>
              <p className="text-xs font-bold text-white">
                حالة القفل: {currentEnabled ? (
                  <span className="text-emerald-400 font-extrabold">مُفـعّـل 🔒</span>
                ) : (
                  <span className="text-amber-300 font-medium">غير مُفعل 🔓</span>
                )}
              </p>
              <p className="text-[10px] text-gray-400">
                {currentEnabled
                  ? 'يطلب التطبيق الرمز عند محاولة فتح صفحة النتيجة'
                  : 'يمكن لأي شخص يفتح المتصفح رؤية النتيجة'}
              </p>
            </div>
          </div>

          {currentEnabled && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLockNow}
              className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition cursor-pointer flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>قفل الآن</span>
            </motion.button>
          )}
        </div>

        {/* Feedback Messages */}
        {successMsg && (
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs text-center font-bold mb-4 flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs text-center font-bold mb-4 flex items-center justify-center gap-1.5">
            <AlertCircle className="w-4 h-4" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Setup / Change PIN Form */}
        <form onSubmit={handleSavePin} className="space-y-3 relative z-10">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              {currentEnabled ? 'تعيين رمز مرور جديد (4 أرقام):' : 'أدخل رمز المرور المكون من 4 أرقام:'}
            </label>
            <div className="relative">
              <input
                type={showPinText ? 'text' : 'password'}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={newPin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                  setNewPin(val);
                }}
                placeholder="••••"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-rose-400 focus:outline-none text-white text-center text-lg tracking-widest font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPinText(!showPinText)}
                className="absolute left-3 top-3 text-gray-400 hover:text-white"
              >
                {showPinText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              تأكيد رمز المرور (أعد كتابته):
            </label>
            <input
              type={showPinText ? 'text' : 'password'}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={confirmPin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                setConfirmPin(val);
              }}
              placeholder="••••"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-rose-400 focus:outline-none text-white text-center text-lg tracking-widest font-mono"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={newPin.length !== 4 || confirmPin.length !== 4}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-rose-500/25 transition cursor-pointer disabled:opacity-40"
            >
              <Lock className="w-4 h-4" />
              <span>{currentEnabled ? 'تحديث وحفظ الرمز' : 'تفعيل قفل الأمان'}</span>
            </motion.button>

            {currentEnabled && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleDisablePin}
                className="py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-rose-300 font-medium text-xs transition cursor-pointer"
              >
                إيقاف القفل
              </motion.button>
            )}
          </div>
        </form>

        <p className="text-[10px] text-gray-400 text-center mt-4">
          💡 يتم حفظ رمز المرور محلياً وبشكل آمن على جهازك فقط لحماية خصوصية نتائجك.
        </p>
      </motion.div>
    </div>
  );
};
