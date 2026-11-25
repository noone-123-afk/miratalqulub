import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Plus,
  History,
  Trash2,
  RotateCcw,
  Copy,
  Check,
  Square,
  Compass,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Search,
  Download,
  RefreshCw,
} from 'lucide-react';
import { AIChatProvider, useAIChat, ChatConversation } from '../context/AIChatContext';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';

interface AIChatAssistantProps {
  currentPage?: string;
  onNavigatePage: (page: string) => void;
}

function getContextualQuickPrompts(currentPage: string, isAr: boolean): string[] {
  const page = (currentPage || 'home').toLowerCase();
  if (page.includes('compatibility')) {
    return isAr
      ? [
          'كيف تحسب المنصة نسبة التوافق بين الشريكين؟',
          'ما الفرق بين أنماط التعلق في العلاقة؟',
          'رشّح لي مقالاً علمياً عن الزواج الواعي',
          'ما هي تجربة The Blind Date وكيف أستفيد منها؟',
        ]
      : [
          'How does the platform calculate partner compatibility?',
          'How do attachment styles affect relationships?',
          'Recommend a scientific article on conscious marriage',
          'How does The Blind Date experience work?',
        ];
  }

  if (page.includes('personality')) {
    return isAr
      ? [
          'ما الفرق بين مقياس Big Five ومؤشر MBTI؟',
          'أي اختبار شخصية يناسبني للبدء؟',
          'ما هو اختبار التعب الوجودي وكيف يفسر استنزاف الطاقة؟',
          'كيف تحفظ المنصة نتائج اختباراتي وخصوصيتي؟',
        ]
      : [
          'What is the difference between Big Five and MBTI?',
          'Which personality test should I start with?',
          'What is the Existential Fatigue assessment?',
          'How does the platform protect my test privacy?',
        ];
  }

  if (page.includes('iq')) {
    return isAr
      ? [
          'ما الفرق بين اختبار رافين وبطارية الذكاءات التسعة؟',
          'أي اختبار ذكاء أبدأ به لتحديد نقاط قوتي؟',
          'كيف أستفيد من نتائج الذكاء المتعدد في مساري المهني؟',
          'كيف تُحسب الدرجات في اختبارات القدرات المعرفية؟',
        ]
      : [
          'Raven Matrices vs Multiple Intelligences: what is the difference?',
          'Which IQ battery should I start with?',
          'How can Multiple Intelligences guide my career path?',
          'How are cognitive aptitude scores calculated?',
        ];
  }

  if (page.includes('article')) {
    return isAr
      ? [
          'رشّح لي مقالاً عن الذكاء العاطفي أو القلق',
          'هل توجد دراسات علمية عن التوافق الأسري؟',
          'ما أبرز مقالات فهم الذات في المكتبة؟',
          'اقترح لي اختباراً يكمّل ما أقرأه الآن',
        ]
      : [
          'Recommend an article on emotional intelligence or anxiety',
          'Are there research papers on family compatibility?',
          'What are the top self-understanding articles?',
          'Suggest a test that complements my reading',
        ];
  }

  if (page.includes('novel')) {
    return isAr
      ? [
          'رشّح لي رواية نفسية مشوقة من المكتبة',
          'ما هي الروايات التي تناقش العلاقات والتعافي العاطفي؟',
          'كيف ترتبط الروايات التفاعلية بالمقاييس النفسية؟',
          'اقترح لي مقالاً علمياً يرتبط بأجواء الروايات',
        ]
      : [
          'Recommend an engaging psychological novel',
          'Which novels explore relationships and emotional healing?',
          'How do interactive novels connect to psychology?',
          'Suggest a related scientific article',
        ];
  }

  return isAr
    ? [
        'أي اختبار شخصية أو توافق يناسبني للبدء؟',
        'كيف تحسب منصة مرآة القلوب نتائج التوافق؟',
        'رشّح لي مقالاً علمياً أو رواية مناسبة الآن',
        'كيف تحمي المنصة خصوصية بياناتي ونتائجي؟',
      ]
    : [
        'Which personality or compatibility test should I start with?',
        'How does Mirror of Hearts calculate test results?',
        'Recommend a scientific article or novel to read',
        'How does the platform protect my privacy and data?',
      ];
}

function formatRelativeTime(timestamp: number, lang: 'ar' | 'en'): string {
  const diffMs = Date.now() - timestamp;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return lang === 'ar' ? 'الآن' : 'Just now';
  if (diffMins < 60) return lang === 'ar' ? `منذ ${diffMins} د` : `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return lang === 'ar' ? `منذ ${diffHours} س` : `${diffHours}h ago`;
  try {
    return new Date(timestamp).toLocaleDateString(lang === 'ar' ? 'ar-JO' : 'en-US', {
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

function stripMarkdownForSpeech(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(\/[^)]+\)/g, '$1')
    .replace(/[*_`#>]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function renderInlineMarkdown(
  text: string,
  isLight: boolean,
  onNavigate: (route: string) => void,
  keyPrefix: string
): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const tokenRegex = /(\[([^\]]+)\]\((\/[a-zA-Z0-9\-_\/%?.=&]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      const label = match[2];
      const targetRoute = match[3];
      nodes.push(
        <button
          key={`${keyPrefix}-lnk-${idx++}`}
          type="button"
          onClick={() => onNavigate(targetRoute)}
          className={`inline-flex items-center gap-1 mx-0.5 px-2 py-0.5 rounded-lg text-xs font-semibold underline-offset-2 hover:underline transition-colors cursor-pointer ${
            isLight
              ? 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
              : 'bg-blue-500/15 text-blue-300 border border-blue-500/30 hover:bg-blue-500/25'
          }`}
        >
          <Compass className="w-3 h-3 shrink-0" />
          <span>{label}</span>
        </button>
      );
    } else if (match[4]) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${idx++}`} className="font-bold">
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      nodes.push(
        <code
          key={`${keyPrefix}-c-${idx++}`}
          className={`px-1.5 py-0.5 rounded text-[12px] font-mono ${
            isLight ? 'bg-slate-200/80 text-slate-900' : 'bg-slate-900/90 text-blue-200'
          }`}
        >
          {match[5]}
        </code>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

/**
 * Safely renders assistant Markdown (headings, bullet/numbered lists, bold, inline code,
 * and clickable internal route links `[Label](/route)`) as pure React elements without HTML injection.
 */
function renderMessageContent(
  text: string,
  isLight: boolean,
  onNavigate: (route: string) => void
): React.ReactNode {
  const lines = text.split(/\r?\n/);
  const blocks: React.ReactNode[] = [];
  let listItems: { ordered: boolean; items: string[] } | null = null;

  const flushList = (keyIdx: number) => {
    if (!listItems) return;
    const ListTag = listItems.ordered ? 'ol' : 'ul';
    blocks.push(
      <ListTag
        key={`list-${keyIdx}`}
        className={`my-1.5 space-y-1 ps-5 ${listItems.ordered ? 'list-decimal' : 'list-disc'}`}
      >
        {listItems.items.map((item, idx) => (
          <li key={`li-${keyIdx}-${idx}`} className="leading-relaxed">
            {renderInlineMarkdown(item, isLight, onNavigate, `li-${keyIdx}-${idx}`)}
          </li>
        ))}
      </ListTag>
    );
    listItems = null;
  };

  lines.forEach((rawLine, lineIdx) => {
    const trimmed = rawLine.trim();
    if (!trimmed) {
      flushList(lineIdx);
      return;
    }

    const headingMatch = trimmed.match(/^#{1,3}\s+(.+)$/);
    if (headingMatch) {
      flushList(lineIdx);
      blocks.push(
        <p key={`h-${lineIdx}`} className="font-bold text-[13.5px] mt-2 mb-1">
          {renderInlineMarkdown(headingMatch[1], isLight, onNavigate, `h-${lineIdx}`)}
        </p>
      );
      return;
    }

    const bulletMatch = trimmed.match(/^[-*•]\s+(.+)$/);
    if (bulletMatch) {
      if (!listItems || listItems.ordered) {
        flushList(lineIdx);
        listItems = { ordered: false, items: [] };
      }
      listItems.items.push(bulletMatch[1]);
      return;
    }

    const orderedMatch = trimmed.match(/^\d+[.)]\s+(.+)$/);
    if (orderedMatch) {
      if (!listItems || !listItems.ordered) {
        flushList(lineIdx);
        listItems = { ordered: true, items: [] };
      }
      listItems.items.push(orderedMatch[1]);
      return;
    }

    flushList(lineIdx);
    blocks.push(
      <p key={`p-${lineIdx}`} className="leading-relaxed">
        {renderInlineMarkdown(trimmed, isLight, onNavigate, `p-${lineIdx}`)}
      </p>
    );
  });

  flushList(lines.length);
  return <div className="space-y-1.5">{blocks}</div>;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({
  currentPage = 'home',
  onNavigatePage,
}) => {
  const { language, isRTL } = useLanguage();
  const [theme] = useAppTheme();
  const isAr = language === 'ar';
  const isLight = theme === 'light';

  const {
    isOpen,
    isStreaming,
    conversations,
    activeConversation,
    messages,
    setOpen,
    toggleOpen,
    startNewConversation,
    selectConversation,
    deleteConversation,
    clearHistory,
    stopGenerating,
    sendMessage,
    retryLastMessage,
    regenerateLastReply,
  } = useAIChat();

  const [input, setInput] = useState('');
  const [showHistoryView, setShowHistoryView] = useState(false);
  const [historySearch, setHistorySearch] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const supportsSpeech =
    typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    setSpeakingMsgId(null);
  };

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopSpeech();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && !showHistoryView) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, showHistoryView, messages.length, messages[messages.length - 1]?.content]);

  useEffect(() => {
    if (isOpen && !showHistoryView) {
      const timer = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showHistoryView]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 112)}px`;
  }, [input]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, setOpen]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;
    soundManager.playTap();
    stopSpeech();
    setInput('');
    setShowHistoryView(false);
    await sendMessage(trimmed, currentPage);
  };

  const handleQuickPrompt = async (prompt: string) => {
    if (isStreaming) return;
    soundManager.playTap();
    stopSpeech();
    setShowHistoryView(false);
    await sendMessage(prompt, currentPage);
  };

  const handleCopyMessage = (msgId: string, content: string) => {
    soundManager.playTap();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content).catch(() => {});
      setCopiedId(msgId);
      setTimeout(() => setCopiedId((prev) => (prev === msgId ? null : prev)), 2000);
    }
  };

  const handleToggleSpeak = (msgId: string, content: string) => {
    if (!supportsSpeech) return;
    soundManager.playTap();
    if (speakingMsgId === msgId) {
      stopSpeech();
      return;
    }
    stopSpeech();
    const cleanText = stripMarkdownForSpeech(content);
    if (!cleanText) return;
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = /[\u0600-\u06FF]/.test(cleanText) ? 'ar-SA' : 'en-US';
    utterance.rate = 1;
    utterance.onend = () => setSpeakingMsgId((prev) => (prev === msgId ? null : prev));
    utterance.onerror = () => setSpeakingMsgId((prev) => (prev === msgId ? null : prev));
    setSpeakingMsgId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleExportConversation = () => {
    if (!activeConversation || activeConversation.messages.length === 0) return;
    soundManager.playTap();
    const lines = activeConversation.messages.map((m) => {
      const label = m.role === 'user' ? (isAr ? 'أنت' : 'You') : (isAr ? 'المساعد الذكي' : 'AI Assistant');
      return `[${label}]\n${m.content}\n`;
    });
    const blob = new Blob([`${activeConversation.title}\n${'='.repeat(32)}\n\n${lines.join('\n')}`], {
      type: 'text/plain;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mirat-assistant-${activeConversation.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  };

  const handleInternalNavigate = (route: string) => {
    soundManager.playTap();
    onNavigatePage(route.replace(/^\/+/, '') || 'home');
    setOpen(false);
  };

  const handleSelectHistoryItem = (conv: ChatConversation) => {
    soundManager.playTap();
    stopSpeech();
    selectConversation(conv.id);
    setShowHistoryView(false);
  };

  const quickPrompts = useMemo(
    () => getContextualQuickPrompts(currentPage, isAr),
    [currentPage, isAr]
  );

  const nonEmptyConversations = useMemo(
    () => conversations.filter((c) => c.messages.length > 0),
    [conversations]
  );

  const filteredConversations = useMemo(() => {
    const q = historySearch.trim().toLowerCase();
    if (!q) return nonEmptyConversations;
    return nonEmptyConversations.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.messages.some((m) => m.content.toLowerCase().includes(q))
    );
  }, [nonEmptyConversations, historySearch]);

  const positionSide = isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6';
  const lastAssistantId = [...messages].reverse().find((m) => m.role === 'assistant')?.id;

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`fixed bottom-4 sm:bottom-6 ${positionSide} ${
        isOpen ? 'z-50' : 'z-40'
      } no-print`}
    >
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => {
            soundManager.playTap();
            toggleOpen();
          }}
          aria-label={isAr ? 'فتح المساعد الذكي للموقع' : 'Open AI Chat Assistant'}
          className={`group flex items-center gap-2.5 h-12 px-4 rounded-2xl border shadow-lg transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            isLight
              ? 'bg-slate-900 text-white border-slate-700 hover:bg-slate-800 shadow-slate-900/20'
              : 'bg-blue-600 text-white border-blue-400/40 hover:bg-blue-500 shadow-blue-950/60'
          }`}
        >
          <MessageSquare className="w-5 h-5 shrink-0" />
          <span className="text-sm font-bold whitespace-nowrap">
            {isAr ? 'المساعد الذكي' : 'AI Assistant'}
          </span>
          {nonEmptyConversations.length > 0 && messages.length > 0 && (
            <span className="text-[11px] font-semibold tabular-nums px-1.5 py-0.5 rounded-md bg-white/15">
              {messages.length}
            </span>
          )}
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <section
          role="dialog"
          aria-label={isAr ? 'محادثة المساعد الذكي' : 'AI Assistant Chat'}
          className={`${
            isExpanded
              ? 'w-[calc(100vw-2rem)] sm:w-[min(92vw,680px)] h-[min(85vh,720px)]'
              : 'w-[calc(100vw-2rem)] sm:w-[400px] md:w-[430px] h-[min(78vh,600px)]'
          } flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-all duration-200 ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900 shadow-slate-900/15'
              : 'bg-[#0f172a] border-slate-700/80 text-slate-100 shadow-black/70'
          }`}
        >
          {/* Header */}
          <header
            className={`px-4 py-3.5 border-b flex items-center justify-between gap-2 shrink-0 ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-slate-900/95 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isLight ? 'bg-blue-600 text-white' : 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-bold truncate">
                  {isAr ? 'مساعد مرآة القلوب الذكي' : 'Mirror of Hearts Assistant'}
                </h2>
                <p
                  className={`text-[11px] truncate ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {showHistoryView
                    ? isAr
                      ? `سجل المحادثات (${nonEmptyConversations.length})`
                      : `Conversation History (${nonEmptyConversations.length})`
                    : isStreaming
                    ? isAr
                      ? 'يكتب الرد الآن...'
                      : 'Writing reply...'
                    : isAr
                    ? 'استشارات معرفية وتوجيه داخل المنصة'
                    : 'Guidance & psychometric Q&A'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {messages.length > 0 && !showHistoryView && (
                <button
                  type="button"
                  onClick={handleExportConversation}
                  title={isAr ? 'تصدير المحادثة' : 'Export conversation'}
                  aria-label={isAr ? 'تصدير المحادثة كملف نصي' : 'Export conversation'}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                    isLight
                      ? 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Download className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  stopSpeech();
                  startNewConversation();
                  setShowHistoryView(false);
                }}
                title={isAr ? 'محادثة جديدة' : 'New conversation'}
                aria-label={isAr ? 'بدء محادثة جديدة' : 'Start new conversation'}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                  isLight
                    ? 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Plus className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  setShowHistoryView((prev) => !prev);
                  setConfirmClearAll(false);
                  setHistorySearch('');
                }}
                title={isAr ? 'سجل المحادثات' : 'Conversation history'}
                aria-label={isAr ? 'عرض سجل المحادثات' : 'Toggle conversation history'}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                  showHistoryView
                    ? 'bg-blue-600 text-white'
                    : isLight
                    ? 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <History className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  setIsExpanded((prev) => !prev);
                }}
                title={isExpanded ? (isAr ? 'تصغير النافذة' : 'Compact view') : (isAr ? 'توسيع النافذة' : 'Expand view')}
                aria-label={isExpanded ? (isAr ? 'تصغير نافذة المحادثة' : 'Compact chat window') : (isAr ? 'توسيع نافذة المحادثة' : 'Expand chat window')}
                className={`hidden sm:flex w-8 h-8 rounded-xl items-center justify-center transition-colors cursor-pointer ${
                  isLight
                    ? 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  setOpen(false);
                }}
                title={isAr ? 'إغلاق' : 'Close'}
                aria-label={isAr ? 'إغلاق المساعد الذكي' : 'Close AI Assistant'}
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                  isLight
                    ? 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Body: Either History Drawer or Active Chat Messages */}
          {showHistoryView ? (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-500/20">
                <button
                  type="button"
                  onClick={() => setShowHistoryView(false)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg cursor-pointer ${
                    isLight
                      ? 'text-slate-700 hover:bg-slate-100'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {isRTL ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                  <span>{isAr ? 'العودة للمحادثة' : 'Back to chat'}</span>
                </button>

                {nonEmptyConversations.length > 0 && (
                  confirmClearAll ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          soundManager.playTap();
                          stopSpeech();
                          clearHistory();
                          setConfirmClearAll(false);
                          setShowHistoryView(false);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold cursor-pointer"
                      >
                        {isAr ? 'تأكيد المسح' : 'Confirm'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmClearAll(false)}
                        className={`px-2 py-1 rounded-lg text-[11px] cursor-pointer ${
                          isLight ? 'bg-slate-200 text-slate-700' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {isAr ? 'إلغاء' : 'Cancel'}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmClearAll(true)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isAr ? 'مسح السجل' : 'Clear all'}</span>
                    </button>
                  )
                )}
              </div>

              {nonEmptyConversations.length > 0 && (
                <div className="relative">
                  <Search
                    className={`w-3.5 h-3.5 absolute top-1/2 -translate-y-1/2 ${
                      isRTL ? 'right-3' : 'left-3'
                    } ${isLight ? 'text-slate-400' : 'text-slate-500'}`}
                  />
                  <input
                    type="search"
                    value={historySearch}
                    onChange={(e) => setHistorySearch(e.target.value)}
                    placeholder={isAr ? 'ابحث في سجل المحادثات...' : 'Search conversations...'}
                    className={`w-full rounded-xl border py-2 ${
                      isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'
                    } text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                        : 'bg-slate-900/70 border-slate-800 text-slate-100 placeholder:text-slate-500'
                    }`}
                  />
                </div>
              )}

              {filteredConversations.length === 0 ? (
                <div className="py-14 text-center space-y-2">
                  <History
                    className={`w-8 h-8 mx-auto ${isLight ? 'text-slate-400' : 'text-slate-600'}`}
                  />
                  <p className={`text-sm font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {historySearch.trim()
                      ? isAr
                        ? 'لا توجد نتائج مطابقة للبحث.'
                        : 'No matching conversations found.'
                      : isAr
                      ? 'لا توجد محادثات محفوظة بعد.'
                      : 'No saved conversations yet.'}
                  </p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {filteredConversations.map((conv) => {
                    const isActive = conv.id === activeConversation?.id;
                    return (
                      <li
                        key={conv.id}
                        className={`rounded-2xl border p-3 flex items-center justify-between gap-2 transition-colors ${
                          isActive
                            ? isLight
                              ? 'bg-blue-50 border-blue-200'
                              : 'bg-blue-500/10 border-blue-500/40'
                            : isLight
                            ? 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleSelectHistoryItem(conv)}
                          className="flex-1 min-w-0 text-start space-y-1 cursor-pointer"
                        >
                          <p className="text-xs font-bold truncate">{conv.title}</p>
                          <div
                            className={`flex items-center gap-2 text-[11px] tabular-nums ${
                              isLight ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            <span>
                              {conv.messages.length}{' '}
                              {isAr ? 'رسائل' : conv.messages.length === 1 ? 'msg' : 'msgs'}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{formatRelativeTime(conv.updatedAt, language)}</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            soundManager.playTap();
                            deleteConversation(conv.id);
                          }}
                          aria-label={isAr ? 'حذف المحادثة' : 'Delete conversation'}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 shrink-0 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="py-4 space-y-5">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold">
                      {isAr
                        ? 'أهلاً بك في المساعد الذكي لمرآة القلوب'
                        : 'Welcome to Mirror of Hearts Assistant'}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed ${
                        isLight ? 'text-slate-600' : 'text-slate-300'
                      }`}
                    >
                      {isAr
                        ? 'اسألني عن اختبارات الشخصية أو التوافق، طريقة احتساب النتائج، المقالات العلمية والروايات، أو اختر أحد الأسئلة السريعة أدناه:'
                        : 'Ask me about personality or compatibility tests, how scoring works, scientific articles and novels, or pick a quick prompt below:'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {quickPrompts.map((promptText, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleQuickPrompt(promptText)}
                        className={`w-full text-start px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-800'
                            : 'bg-slate-900/70 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-blue-500/40'
                        }`}
                      >
                        {promptText}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  const isError = msg.status === 'error';
                  const isLatestAssistant = !isUser && msg.id === lastAssistantId;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1.5`}
                    >
                      <div
                        className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed break-words ${
                          isUser
                            ? 'bg-blue-600 text-white whitespace-pre-wrap'
                            : isError
                            ? isLight
                              ? 'bg-rose-50 border border-rose-200 text-rose-800'
                              : 'bg-rose-950/50 border border-rose-500/40 text-rose-200'
                            : isLight
                            ? 'bg-slate-100 border border-slate-200 text-slate-900'
                            : 'bg-slate-800/90 border border-slate-700/80 text-slate-100'
                        }`}
                      >
                        {msg.content ? (
                          isUser ? (
                            msg.content
                          ) : (
                            renderMessageContent(msg.content, isLight, handleInternalNavigate)
                          )
                        ) : (
                          <span className="inline-block text-xs opacity-75">
                            {isAr ? 'جاري التفكير وكتابة الرد...' : 'Thinking...'}
                          </span>
                        )}
                      </div>

                      {!isUser && msg.status !== 'streaming' && (
                        <div className="flex flex-wrap items-center gap-3 px-1">
                          {isError ? (
                            <button
                              type="button"
                              onClick={() => retryLastMessage(currentPage)}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-500 hover:underline cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>{isAr ? 'إعادة المحاولة' : 'Retry'}</span>
                            </button>
                          ) : (
                            msg.content && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleCopyMessage(msg.id, msg.content)}
                                  className={`inline-flex items-center gap-1 text-[11px] cursor-pointer ${
                                    isLight
                                      ? 'text-slate-500 hover:text-slate-800'
                                      : 'text-slate-400 hover:text-slate-200'
                                  }`}
                                >
                                  {copiedId === msg.id ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-500" />
                                      <span>{isAr ? 'تم النسخ' : 'Copied'}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>{isAr ? 'نسخ' : 'Copy'}</span>
                                    </>
                                  )}
                                </button>

                                {supportsSpeech && (
                                  <button
                                    type="button"
                                    onClick={() => handleToggleSpeak(msg.id, msg.content)}
                                    className={`inline-flex items-center gap-1 text-[11px] cursor-pointer ${
                                      speakingMsgId === msg.id
                                        ? 'text-blue-500 font-semibold'
                                        : isLight
                                        ? 'text-slate-500 hover:text-slate-800'
                                        : 'text-slate-400 hover:text-slate-200'
                                    }`}
                                  >
                                    {speakingMsgId === msg.id ? (
                                      <>
                                        <VolumeX className="w-3 h-3" />
                                        <span>{isAr ? 'إيقاف' : 'Stop'}</span>
                                      </>
                                    ) : (
                                      <>
                                        <Volume2 className="w-3 h-3" />
                                        <span>{isAr ? 'استماع' : 'Listen'}</span>
                                      </>
                                    )}
                                  </button>
                                )}

                                {isLatestAssistant && !isStreaming && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      soundManager.playTap();
                                      stopSpeech();
                                      regenerateLastReply(currentPage);
                                    }}
                                    className={`inline-flex items-center gap-1 text-[11px] cursor-pointer ${
                                      isLight
                                        ? 'text-slate-500 hover:text-slate-800'
                                        : 'text-slate-400 hover:text-slate-200'
                                    }`}
                                  >
                                    <RefreshCw className="w-3 h-3" />
                                    <span>{isAr ? 'إعادة التوليد' : 'Regenerate'}</span>
                                  </button>
                                )}
                              </>
                            )
                          )}
                        </div>
                      )}

                      {isLatestAssistant &&
                        msg.status === 'complete' &&
                        !isStreaming &&
                        msg.suggestions &&
                        msg.suggestions.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-0.5 max-w-[95%]">
                            {msg.suggestions.map((suggestion, sIdx) => (
                              <button
                                key={`sug-${msg.id}-${sIdx}`}
                                type="button"
                                onClick={() => handleQuickPrompt(suggestion)}
                                className={`text-[11px] px-2.5 py-1 rounded-xl border text-start transition-colors cursor-pointer ${
                                  isLight
                                    ? 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700'
                                    : 'bg-slate-900/70 border-slate-700 text-slate-300 hover:border-blue-500/50 hover:bg-slate-800 hover:text-blue-200'
                                }`}
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input Footer */}
          {!showHistoryView && (
            <form
              onSubmit={handleSubmit}
              className={`p-3 border-t shrink-0 ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/95 border-slate-800'
              }`}
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  rows={1}
                  maxLength={4000}
                  placeholder={
                    isAr
                      ? 'اكتب سؤالك هنا... (مثال: أي اختبار أبدأ به؟)'
                      : 'Ask a question... (e.g., which test fits me?)'
                  }
                  className={`flex-1 resize-none max-h-28 rounded-xl border px-3 py-2.5 text-sm leading-snug focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                      : 'bg-slate-950 border-slate-700 text-slate-100 placeholder:text-slate-500'
                  }`}
                />

                {isStreaming ? (
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playTap();
                      stopGenerating();
                    }}
                    aria-label={isAr ? 'إيقاف التوليد' : 'Stop generating'}
                    className="w-10 h-10 rounded-xl bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                  >
                    <Square className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    aria-label={isAr ? 'إرسال الرسالة' : 'Send message'}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      input.trim()
                        ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer'
                        : isLight
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
            </form>
          )}
        </section>
      )}
    </div>
  );
};

export const AIChatAssistantWithProvider: React.FC<AIChatAssistantProps> = (props) => (
  <AIChatProvider>
    <AIChatAssistant {...props} />
  </AIChatProvider>
);
