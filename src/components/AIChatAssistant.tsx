import React, { useState, useRef, useEffect } from 'react';
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
} from 'lucide-react';
import { useAIChat, ChatConversation } from '../context/AIChatContext';
import { useLanguage } from '../context/LanguageContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';

interface AIChatAssistantProps {
  currentPage?: string;
  onNavigatePage: (page: string) => void;
}

const QUICK_PROMPTS_AR = [
  'أي اختبار شخصية أو توافق يناسبني للبدء؟',
  'كيف تحسب منصة مرآة القلوب نتائج التوافق؟',
  'رشّح لي مقالاً علمياً أو رواية مناسبة الآن',
  'كيف تحمي المنصة خصوصية بياناتي ونتائجي؟',
];

const QUICK_PROMPTS_EN = [
  'Which personality or compatibility test should I start with?',
  'How does Mirror of Hearts calculate test results?',
  'Recommend a scientific article or novel to read',
  'How does the platform protect my privacy and data?',
];

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

/**
 * Safely renders assistant text with clickable internal route links `[Label](/route)`
 * without ever injecting raw HTML.
 */
function renderMessageContent(
  text: string,
  isLight: boolean,
  onNavigate: (route: string) => void
): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const linkRegex = /\[([^\]]+)\]\((\/[a-zA-Z0-9\-_\/%]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIdx = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const label = match[1];
    const targetRoute = match[2];
    parts.push(
      <button
        key={`lnk-${keyIdx++}`}
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
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
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
  } = useAIChat();

  const [input, setInput] = useState('');
  const [showHistoryView, setShowHistoryView] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

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
    setInput('');
    setShowHistoryView(false);
    await sendMessage(trimmed, currentPage);
  };

  const handleQuickPrompt = async (prompt: string) => {
    if (isStreaming) return;
    soundManager.playTap();
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

  const handleInternalNavigate = (route: string) => {
    soundManager.playTap();
    onNavigatePage(route.replace(/^\/+/, '') || 'home');
    setOpen(false);
  };

  const handleSelectHistoryItem = (conv: ChatConversation) => {
    soundManager.playTap();
    selectConversation(conv.id);
    setShowHistoryView(false);
  };

  const quickPrompts = isAr ? QUICK_PROMPTS_AR : QUICK_PROMPTS_EN;
  const nonEmptyConversations = conversations.filter((c) => c.messages.length > 0);
  const positionSide = isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6';

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
          className={`w-[calc(100vw-2rem)] sm:w-[400px] md:w-[430px] h-[min(78vh,600px)] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-colors duration-200 ${
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
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  startNewConversation();
                  setShowHistoryView(false);
                }}
                title={isAr ? 'محادثة جديدة' : 'New conversation'}
                aria-label={isAr ? 'بدء محادثة جديدة' : 'Start new conversation'}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
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
                }}
                title={isAr ? 'سجل المحادثات' : 'Conversation history'}
                aria-label={isAr ? 'عرض سجل المحادثات' : 'Toggle conversation history'}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
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
                  setOpen(false);
                }}
                title={isAr ? 'إغلاق' : 'Close'}
                aria-label={isAr ? 'إغلاق المساعد الذكي' : 'Close AI Assistant'}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
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

              {nonEmptyConversations.length === 0 ? (
                <div className="py-14 text-center space-y-2">
                  <History
                    className={`w-8 h-8 mx-auto ${isLight ? 'text-slate-400' : 'text-slate-600'}`}
                  />
                  <p className={`text-sm font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {isAr ? 'لا توجد محادثات محفوظة بعد.' : 'No saved conversations yet.'}
                  </p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {nonEmptyConversations.map((conv) => {
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
                        ? 'اسألني عن اختبارات الشخصية أو التوافق، طريقة احتساب النتائج، المقالات والروايات، أو اختر أحد الأسئلة السريعة أدناه:'
                        : 'Ask me about personality or compatibility tests, how scoring works, articles and novels, or pick a quick prompt below:'}
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
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} gap-1`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap break-words ${
                          isUser
                            ? 'bg-blue-600 text-white'
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
                        <div className="flex items-center gap-2 px-1">
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
                            )
                          )}
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
