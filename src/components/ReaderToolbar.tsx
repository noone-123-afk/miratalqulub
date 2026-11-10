import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Share2,
  Check,
  FileText,
  Layers,
  Copy,
  RotateCcw,
} from 'lucide-react';
import { soundManager } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';

export type ContinuousViewMode = 'segmented_and_continuous' | 'continuous_only';

interface ReaderToolbarProps {
  isLight?: boolean;
  language?: 'ar' | 'en';
  fontSize: number;
  onChangeFontSize: (newSize: number) => void;
  onToggleTheme?: () => void;
  shareTitle: string;
  shareSummary: string;
  shareUrl?: string;
  viewMode?: ContinuousViewMode;
  onChangeViewMode?: (mode: ContinuousViewMode) => void;
  onJumpToContinuous?: () => void;
  contentTypeLabelAr?: string;
  contentTypeLabelEn?: string;
}

export const ReaderToolbar: React.FC<ReaderToolbarProps> = ({
  isLight: isLightProp,
  language: languageProp,
  fontSize,
  onChangeFontSize,
  onToggleTheme: onToggleThemeProp,
  shareTitle,
  shareSummary,
  shareUrl,
  viewMode = 'segmented_and_continuous',
  onChangeViewMode,
  onJumpToContinuous,
  contentTypeLabelAr = 'البحث / القصة',
  contentTypeLabelEn = 'Paper / Story',
}) => {
  const { language: ctxLanguage } = useLanguage();
  const [ctxTheme, ctxToggleTheme] = useAppTheme();

  const language = languageProp ?? ctxLanguage;
  const isLight = isLightProp ?? ctxTheme === 'light';
  const onToggleTheme = onToggleThemeProp ?? ctxToggleTheme;

  const [showSocialMenu, setShowSocialMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const isAr = language === 'ar';

  const currentUrl =
    shareUrl || (typeof window !== 'undefined' ? window.location.href : 'https://miratalqulub.com/#/articles');
  const fullShareText = `📖 ${shareTitle}\n\n${shareSummary.slice(0, 220)}...\n\n🔗 ${currentUrl}`;
  const encodedText = encodeURIComponent(fullShareText);
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(`📖 ${shareTitle} — ${shareSummary.slice(0, 140)}...`);

  const handleCopyShare = () => {
    soundManager.playTap();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullShareText);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2400);
    }
  };

  const pct = Math.round((fontSize / 16) * 100);

  return (
    <div
      className={`sticky top-2 z-30 p-3 sm:p-4 rounded-2xl border backdrop-blur-md shadow-lg space-y-2.5 transition-colors ${
        isLight
          ? 'bg-white/95 border-indigo-200 text-slate-800 shadow-slate-200/70'
          : 'bg-slate-900/95 border-cyan-500/35 text-gray-100 shadow-black/50'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* Reading Mode Switcher (Segmented + Continuous vs Continuous Only) */}
        <div className="flex flex-wrap items-center gap-1.5">
          {onChangeViewMode && (
            <div
              className={`inline-flex items-center p-1 rounded-xl border ${
                isLight ? 'bg-slate-100 border-slate-200' : 'bg-black/40 border-white/10'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onChangeViewMode('continuous_only');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'continuous_only'
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-sm'
                    : isLight
                    ? 'text-slate-700 hover:bg-white'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>
                  {isAr
                    ? `📜 قراءة ${contentTypeLabelAr} كاملة دون تجزئة`
                    : `📜 Read Full ${contentTypeLabelEn} Unsegmented`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onChangeViewMode('segmented_and_continuous');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'segmented_and_continuous'
                    ? 'bg-gradient-to-r from-purple-600 to-rose-600 text-white shadow-sm'
                    : isLight
                    ? 'text-slate-700 hover:bg-white'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>
                  {isAr ? '📑 العرض المنهجي + النص الكامل' : '📑 Structured + Full Text'}
                </span>
              </button>
            </div>
          )}

          {viewMode === 'segmented_and_continuous' && onJumpToContinuous && (
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                onJumpToContinuous();
              }}
              className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition cursor-pointer ${
                isLight
                  ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-indigo-200'
                  : 'bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-200 border-cyan-500/30'
              }`}
            >
              {isAr ? '⬇ الانتقال للنص الكامل المتواصل بالأسفل' : '⬇ Jump to Full Continuous Text'}
            </button>
          )}
        </div>

        {/* Font Size, Dark/Light Mode, and Social Share Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Font Size Controller */}
          <div
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-xl border ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-black/40 border-white/15'
            }`}
            title={isAr ? 'التحكم في حجم الخط' : 'Font Size Control'}
          >
            <span className="text-[11px] font-bold px-1 opacity-75 hidden sm:inline">
              {isAr ? 'حجم الخط:' : 'Font:'}
            </span>
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                onChangeFontSize(Math.max(13, fontSize - 2));
              }}
              className={`px-2 py-0.5 rounded-lg text-xs font-black transition cursor-pointer ${
                isLight ? 'hover:bg-white text-slate-800' : 'hover:bg-white/15 text-white'
              }`}
              title={isAr ? 'تصغير الخط' : 'Decrease Font Size'}
            >
              A-
            </button>
            <span className="text-[11px] font-mono font-bold px-1.5 text-indigo-600 dark:text-cyan-300">
              {pct}%
            </span>
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                onChangeFontSize(Math.min(26, fontSize + 2));
              }}
              className={`px-2 py-0.5 rounded-lg text-xs font-black transition cursor-pointer ${
                isLight ? 'hover:bg-white text-slate-800' : 'hover:bg-white/15 text-white'
              }`}
              title={isAr ? 'تكبير الخط' : 'Increase Font Size'}
            >
              A+
            </button>
            {fontSize !== 16 && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onChangeFontSize(16);
                }}
                className="p-1 rounded-lg opacity-70 hover:opacity-100 cursor-pointer"
                title={isAr ? 'إعادة ضبط حجم الخط' : 'Reset Font Size'}
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              soundManager.playTap();
              onToggleTheme();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border flex items-center gap-1.5 transition cursor-pointer ${
              isLight
                ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-indigo-950/70 hover:bg-indigo-900/80 text-amber-300 border-amber-400/30'
            }`}
            title={isAr ? 'تبديل الوضع الليلي / النهاري' : 'Toggle Dark / Light Mode'}
          >
            {isLight ? <Moon className="w-3.5 h-3.5 text-indigo-700" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            <span>
              {isLight
                ? isAr
                  ? 'الوضع الليلي'
                  : 'Dark Mode'
                : isAr
                ? 'الوضع النهاري'
                : 'Light Mode'}
            </span>
          </button>

          {/* Social Media Share Toggle Button */}
          <button
            type="button"
            onClick={() => {
              soundManager.playTap();
              setShowSocialMenu((prev) => !prev);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{isAr ? 'مشاركة عبر التواصل الاجتماعي' : 'Share on Social Media'}</span>
          </button>
        </div>
      </div>

      {/* Expandable Social Media Share Bar */}
      {showSocialMenu && (
        <div
          className={`pt-2.5 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}
        >
          <span className="font-bold opacity-80">
            {isAr ? 'اختر منصة المشاركة المباشرة:' : 'Share directly via:'}
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`https://api.whatsapp.com/send?text=${encodedText}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playTap()}
              className="px-3 py-1.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-emerald-700 dark:text-emerald-300 border border-[#25D366]/40 font-extrabold flex items-center gap-1.5 transition"
            >
              <span>💬</span>
              <span>{isAr ? 'واتساب (WhatsApp)' : 'WhatsApp'}</span>
            </a>

            <a
              href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playTap()}
              className={`px-3 py-1.5 rounded-xl border font-extrabold flex items-center gap-1.5 transition ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-300'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              <span>𝕏</span>
              <span>{isAr ? 'منصة إكس (X)' : 'X (Twitter)'}</span>
            </a>

            <a
              href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playTap()}
              className="px-3 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-700 dark:text-sky-300 border border-sky-500/40 font-extrabold flex items-center gap-1.5 transition"
            >
              <span>✈️</span>
              <span>{isAr ? 'تيليجرام (Telegram)' : 'Telegram'}</span>
            </a>

            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playTap()}
              className="px-3 py-1.5 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 text-blue-700 dark:text-blue-300 border border-blue-500/40 font-extrabold flex items-center gap-1.5 transition"
            >
              <span>📘</span>
              <span>{isAr ? 'فيسبوك (Facebook)' : 'Facebook'}</span>
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playTap()}
              className="px-3 py-1.5 rounded-xl bg-indigo-600/15 hover:bg-indigo-600/25 text-indigo-700 dark:text-indigo-300 border border-indigo-500/40 font-extrabold flex items-center gap-1.5 transition"
            >
              <span>💼</span>
              <span>{isAr ? 'لينكدإن (LinkedIn)' : 'LinkedIn'}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyShare}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold flex items-center gap-1.5 transition cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>
                {copiedLink
                  ? isAr
                    ? 'تم نسخ الرابط والنص!'
                    : 'Link & Text Copied!'
                  : isAr
                  ? 'نسخ الرابط والمقتطف'
                  : 'Copy Link & Excerpt'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface FormattedContinuousManuscriptProps {
  text: string;
  fontSize: number;
  isLight: boolean;
}

function renderFormattedInline(line: string, isLight: boolean): React.ReactNode {
  // Format bold **...**, italic *"..."*, and bracketed citations [[...]] or [1, 2]
  const parts = line.split(/(\*\*[^*]+\*\*|\*"[^"]+"\*\|\[\[[^\]]+\]\]|\[\d+(?:,\s*\d+)*\])/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong
          key={idx}
          className={`font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    if ((part.startsWith('[[') && part.endsWith(']]')) || /^\[\d+(?:,\s*\d+)*\]$/.test(part)) {
      const cleanRef = part.replace(/^\[+|\]+$/g, '');
      return (
        <span
          key={idx}
          className={`inline-block px-1.5 py-0.2 mx-0.5 rounded text-[0.82em] font-mono font-bold ${
            isLight
              ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
              : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
          }`}
        >
          [{cleanRef}]
        </span>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export const FormattedContinuousManuscript: React.FC<FormattedContinuousManuscriptProps> = ({
  text,
  fontSize,
  isLight,
}) => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Markdown Table Detection
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }
      const parsedRows = tableLines
        .filter((tl) => !/^\|[\s\-:|]+\|$/.test(tl))
        .map((tl) =>
          tl
            .slice(1, -1)
            .split('|')
            .map((cell) => cell.trim())
        );

      if (parsedRows.length > 0) {
        const headers = parsedRows[0];
        const bodyRows = parsedRows.slice(1);
        elements.push(
          <div
            key={`tbl-${i}`}
            className={`my-6 rounded-2xl border overflow-x-auto ${
              isLight ? 'border-indigo-200 bg-indigo-50/30' : 'border-cyan-500/30 bg-slate-900/60'
            }`}
          >
            <table className="w-full text-xs sm:text-sm border-collapse">
              <thead>
                <tr
                  className={
                    isLight
                      ? 'bg-indigo-100/90 text-indigo-950 border-b border-indigo-200'
                      : 'bg-cyan-950/60 text-cyan-200 border-b border-cyan-500/30'
                  }
                >
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} className="p-3 text-start font-extrabold">
                      {renderFormattedInline(h, isLight)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((r, rIdx) => (
                  <tr
                    key={rIdx}
                    className={`border-b ${
                      isLight
                        ? 'border-indigo-100 bg-white/90 hover:bg-indigo-50/40'
                        : 'border-white/10 bg-black/20 hover:bg-white/[0.03]'
                    }`}
                  >
                    {r.map((c, cIdx) => (
                      <td
                        key={cIdx}
                        className={`p-3 leading-relaxed ${
                          cIdx === 0 ? 'font-bold text-indigo-700 dark:text-cyan-300' : ''
                        }`}
                      >
                        {renderFormattedInline(c, isLight)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Horizontal Rule
    if (trimmed === '---' || trimmed.startsWith('────────')) {
      elements.push(
        <hr
          key={`hr-${i}`}
          className={`my-7 border-t-2 ${
            isLight ? 'border-indigo-200/80' : 'border-white/15'
          }`}
        />
      );
      i++;
      continue;
    }

    // H1 Heading
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h2
          key={`h1-${i}`}
          className={`font-black font-['Alexandria'] mt-6 mb-4 pb-3 border-b ${
            isLight
              ? 'text-indigo-950 border-indigo-200'
              : 'text-white border-cyan-500/30'
          }`}
          style={{ fontSize: `${Math.round(fontSize * 1.45)}px`, lineHeight: 1.4 }}
        >
          {trimmed.replace(/^#\s+/, '')}
        </h2>
      );
      i++;
      continue;
    }

    // H2 Heading
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h3
          key={`h2-${i}`}
          className={`font-black font-['Alexandria'] mt-8 mb-3 flex items-center gap-2 ${
            isLight ? 'text-indigo-800' : 'text-cyan-300'
          }`}
          style={{ fontSize: `${Math.round(fontSize * 1.25)}px`, lineHeight: 1.45 }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 dark:bg-cyan-400 shrink-0" />
          <span>{trimmed.replace(/^##\s+/, '')}</span>
        </h3>
      );
      i++;
      continue;
    }

    // H3 Heading
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h4
          key={`h3-${i}`}
          className={`font-extrabold font-['Alexandria'] mt-6 mb-2 ${
            isLight ? 'text-rose-800' : 'text-rose-300'
          }`}
          style={{ fontSize: `${Math.round(fontSize * 1.12)}px`, lineHeight: 1.5 }}
        >
          {trimmed.replace(/^###\s+/, '')}
        </h4>
      );
      i++;
      continue;
    }

    // Quote / Literary Dialogue Highlight
    if (trimmed.startsWith('>') || (trimmed.startsWith('*"') && trimmed.endsWith('"*'))) {
      const cleanQuote = trimmed.replace(/^>\s*/, '');
      elements.push(
        <blockquote
          key={`q-${i}`}
          className={`my-4 p-4 rounded-2xl border-s-4 border-rose-500 italic font-medium ${
            isLight
              ? 'bg-rose-50/70 text-slate-800 border border-rose-200'
              : 'bg-rose-950/25 text-rose-100 border border-rose-500/20'
          }`}
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.9 }}
        >
          {renderFormattedInline(cleanQuote, isLight)}
        </blockquote>
      );
      i++;
      continue;
    }

    // Bullet or Numbered List Item
    if (/^(\*|-|•|\d+\.)\s+/.test(trimmed)) {
      elements.push(
        <div
          key={`li-${i}`}
          className="my-2 flex items-start gap-2.5 ps-2"
          style={{ fontSize: `${fontSize}px`, lineHeight: 1.9 }}
        >
          <span className="text-indigo-600 dark:text-cyan-400 font-bold shrink-0 mt-0.5">
            {trimmed.match(/^(\d+\.)/) ? trimmed.match(/^(\d+\.)/)![1] : '•'}
          </span>
          <div className="flex-1">
            {renderFormattedInline(trimmed.replace(/^(\*|-|•|\d+\.)\s+/, ''), isLight)}
          </div>
        </div>
      );
      i++;
      continue;
    }

    // Standard Paragraph
    elements.push(
      <p
        key={`p-${i}`}
        className="my-3.5 leading-loose"
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.95 }}
      >
        {renderFormattedInline(trimmed, isLight)}
      </p>
    );
    i++;
  }

  return <div className="space-y-1">{elements}</div>;
};
