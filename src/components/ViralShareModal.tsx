import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Share2,
  X,
  Copy,
  Check,
  Send,
  Download,
} from 'lucide-react';
import { soundManager } from '../utils/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  titleAr: string;
  shareText: string;
  categoryTagAr?: string;
}

export const ViralShareModal: React.FC<Props> = ({
  isOpen,
  onClose,
  titleAr,
  shareText,
  categoryTagAr = 'مِـرآة القـلوب للتحليل النفسي والتوافق',
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadedImg, setDownloadedImg] = useState(false);

  if (!isOpen) return null;

  const currentUrl =
    typeof window !== 'undefined' ? window.location.origin : 'https://miratalqulub.com';

  const fullShareMessage = `${shareText}\n\n🔗 جرب الاختبار بنفسك واكتشف خريطتك النفسية والمعرفية:\n${currentUrl}`;

  const handleCopy = () => {
    soundManager.playTap();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullShareMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2800);
    }
  };

  const handleDownloadShareImage = () => {
    soundManager.playTap();
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.direction = 'rtl';
    ctx.textAlign = 'center';

    // Dark luxury gradient background
    const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
    grad.addColorStop(0, '#0f0c20');
    grad.addColorStop(0.5, '#1e1b4b');
    grad.addColorStop(1, '#311042');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1080);

    // Border frame
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.55)';
    ctx.lineWidth = 6;
    ctx.strokeRect(44, 44, 992, 992);

    // Brand Title
    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 28px Alexandria, Tahoma, sans-serif';
    ctx.fillText('مِـرآة القـلوب • المختبر السيكومتري والمعرفي المعتمد', 540, 130);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 42px Alexandria, Tahoma, sans-serif';
    ctx.fillText(titleAr, 540, 200);

    ctx.fillStyle = '#f472b6';
    ctx.font = 'bold 24px Alexandria, Tahoma, sans-serif';
    ctx.fillText(categoryTagAr, 540, 250);

    // Inner Card
    ctx.fillStyle = 'rgba(15, 23, 42, 0.82)';
    ctx.fillRect(88, 300, 904, 580);
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)';
    ctx.lineWidth = 3;
    ctx.strokeRect(88, 300, 904, 580);

    // Wrap lines of shareText
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 28px Alexandria, Tahoma, sans-serif';
    const rawLines = shareText.split('\n').filter(Boolean);
    let y = 380;
    rawLines.forEach((rawLine) => {
      const words = rawLine.split(/\s+/);
      let current = '';
      words.forEach((w) => {
        const test = current ? `${current} ${w}` : w;
        if (ctx.measureText(test).width > 820 && current) {
          ctx.fillText(current, 540, y);
          y += 50;
          current = w;
        } else {
          current = test;
        }
      });
      if (current) {
        ctx.fillText(current, 540, y);
        y += 56;
      }
    });

    // Footer
    ctx.fillStyle = '#94a3b8';
    ctx.font = '22px Alexandria, Tahoma, sans-serif';
    ctx.fillText('الأردن - عمّان | one497303@gmail.com', 540, 960);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'بطاقة_نتيجة_مرآة_القلوب.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadedImg(true);
      setTimeout(() => setDownloadedImg(false), 3000);
    }, 'image/png');
  };

  const whatsappHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(fullShareMessage)}`;
  const telegramHref = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(fullShareMessage)}`;
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `${shareText}\n${currentUrl}\n#تحليل_شخصية #اختبار_ذكاء #مرآة_القلوب`
  )}`;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-hidden text-right">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-lg bg-[#0f172a] border border-rose-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-md">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white font-['Alexandria']">
                  {titleAr}
                </h3>
              </div>
              <p className="text-[11px] text-slate-400">{categoryTagAr}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-rose-300">بطاقة النتيجة المعتمدة:</span>
              <span className="text-[10px]">جاهزة للنسخ أو التنزيل كصورة</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-line bg-black/40 p-3 rounded-xl border border-white/5">
              {shareText}
            </p>
          </div>

          {/* Social Quick Share Links (Iframe-safe <a> links) */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 block">
              اختر منصة المشاركة الفورية:
            </span>

            <div className="grid grid-cols-3 gap-2.5">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playTap()}
                className="p-3 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition flex flex-col items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span className="text-xl">💬</span>
                <span>واتساب</span>
              </a>

              <a
                href={telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playTap()}
                className="p-3 rounded-2xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/40 text-sky-300 text-xs font-bold transition flex flex-col items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <Send className="w-5 h-5 text-sky-400" />
                <span>تيليجرام</span>
              </a>

              <a
                href={twitterHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playTap()}
                className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-xs font-bold transition flex flex-col items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span className="text-base font-black font-mono">𝕏</span>
                <span>منصة X</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Download PNG Card Button */}
            <button
              type="button"
              onClick={handleDownloadShareImage}
              className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              {downloadedImg ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>تم تنزيل البطاقة PNG ✓</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>تنزيل بطاقة النتيجة كصورة 📸</span>
                </>
              )}
            </button>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:opacity-95 text-white font-extrabold text-xs transition shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>تم النسخ للحافظة ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>نسخ النص والرابط</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
