import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Apple, Share2, PlusSquare, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir="rtl">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md rounded-3xl glass-panel-glow bg-[#15102a] p-6 text-white shadow-2xl border border-rose-500/30 z-10"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-gray-300 cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="text-center mt-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500 to-violet-600 flex items-center justify-center shadow-lg shadow-rose-500/30 mb-4">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">تثبيت التطبيق على هاتفك</h3>
              <p className="text-sm text-gray-300 mb-6">
                استمتع بتجربة تطبيق كامل وسريع بدون إنترنت أو متصفح، يعمل مثل تطبيقات الآيفون والأندرويد الرسمية!
              </p>
            </div>

            {isInstalled ? (
              <div className="text-center py-4 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <p className="text-emerald-300 font-semibold">التطبيق مثبت بالفعل على جهازك!</p>
              </div>
            ) : isIOS ? (
              <div className="space-y-4 bg-white/5 rounded-2xl p-4 border border-white/10 text-sm">
                <div className="flex items-center gap-2 text-rose-400 font-semibold mb-2">
                  <Apple className="w-5 h-5" />
                  <span>خطوات التثبيت على أجهزة iPhone و iPad:</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 font-bold">1</div>
                  <p className="text-gray-200 pt-0.5">
                    اضغط على زر <strong className="text-white">المشاركة</strong> <Share2 className="w-4 h-4 inline mx-1 text-sky-400" /> في شريط متصفح سفاري بالأسفل.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 font-bold">2</div>
                  <p className="text-gray-200 pt-0.5">
                    مرر للأسفل واختر <strong className="text-white">إضافة إلى الصفحة الرئيسية</strong> <PlusSquare className="w-4 h-4 inline mx-1 text-emerald-400" /> (Add to Home Screen).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 font-bold">3</div>
                  <p className="text-gray-200 pt-0.5">
                    اضغط على <strong className="text-white">إضافة (Add)</strong> في الزاوية العلوية، وسيظهر التطبيق على شاشة هاتفك فوراً!
                  </p>
                </div>
              </div>
            ) : isInstallable ? (
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={async () => {
                    await install();
                    onClose();
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-violet-600 hover:opacity-95 text-white shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Smartphone className="w-5 h-5" />
                  تثبيت الآن بنقرة واحدة (Android)
                </motion.button>
                <p className="text-xs text-center text-gray-400">
                  متوافق مع أجهزة سامسونج، شاومي، هواوي، جوجل بيكسل، وغيرها.
                </p>
              </div>
            ) : (
              <div className="space-y-3 bg-white/5 rounded-2xl p-4 text-xs text-gray-300">
                <p>
                  لتثبيت التطبيق، يمكنك أيضاً الضغط على قائمة المتصفح (نقاط القائمة ⋮) واختيار <strong>"تثبيت التطبيق"</strong> أو <strong>"الإضافة إلى الشاشة الرئيسية"</strong>.
                </p>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={onClose}
              className="w-full mt-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 text-sm font-medium transition cursor-pointer"
            >
              حسناً، فهمت
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
