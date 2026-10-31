import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2 } from 'lucide-react';

interface Props {
  imageUrl: string;
  title: string;
  subtitle: string;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  onShare: () => void;
}

export const ImageViewerModal: React.FC<Props> = ({
  imageUrl,
  title,
  subtitle,
  isOpen,
  onClose,
  onDownload,
  onShare,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 bg-black/95 backdrop-blur-xl"
          dir="rtl"
        >
          {/* Top Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl flex items-center justify-between py-2 text-white"
          >
            <div>
              <h4 className="font-bold text-base">{title}</h4>
              <p className="text-xs text-gray-300">{subtitle}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Main Image Container */}
          <div className="relative flex-1 w-full max-w-lg flex items-center justify-center p-2 my-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative rounded-3xl overflow-hidden border-2 border-rose-500/30 shadow-2xl shadow-rose-500/30 max-h-[70vh]"
            >
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover max-h-[70vh] rounded-3xl"
              />
            </motion.div>
          </div>

          {/* Bottom Action Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md flex items-center gap-3 py-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onDownload}
              className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition shadow-lg shadow-rose-500/25 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>تحميل الصورة بدقة عالية</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onShare}
              className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>مشاركة</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
