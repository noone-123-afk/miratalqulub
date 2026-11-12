import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  BookOpen,
  Calendar,
  Clock,
  Send,
  Sparkles,
  ShieldCheck,
  X,
  MessageCircle,
  Settings,
  CheckCircle2,
  Trash2,
  Heart,
  HelpCircle,
  Bookmark,
  Share2,
  Radio,
  User,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../utils/theme';
import { soundManager } from '../utils/sound';
import {
  BookClubSession,
  BookClubChatMessage,
  fetchCurrentBookSession,
  saveBookSession,
  fetchBookClubMessages,
  postBookClubMessage,
  deleteBookClubMessage,
  DEFAULT_BOOK_SESSION,
} from '../services/bookClubService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const BookClubCommunityModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { language, isRTL } = useLanguage();
  const isAr = language === 'ar';
  const { user, isOwner } = useAuth();
  const [theme] = useAppTheme();
  const isLight = theme === 'light';

  const [activeTab, setActiveTab] = useState<'chat' | 'book' | 'admin'>('chat');
  const [session, setSession] = useState<BookClubSession>(DEFAULT_BOOK_SESSION);
  const [messages, setMessages] = useState<BookClubChatMessage[]>([]);
  const [senderName, setSenderName] = useState(() => {
    return localStorage.getItem('mirat_chat_username') || (user?.displayName || '');
  });
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Admin form state
  const [adminForm, setAdminForm] = useState<BookClubSession>(DEFAULT_BOOK_SESSION);
  const [objectivesTextAr, setObjectivesTextAr] = useState('');
  const [objectivesTextEn, setObjectivesTextEn] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    const s = await fetchCurrentBookSession();
    setSession(s);
    setAdminForm(s);
    setObjectivesTextAr(s.objectivesAr.join('\n'));
    setObjectivesTextEn(s.objectivesEn.join('\n'));

    const msgs = await fetchBookClubMessages();
    setMessages(msgs);
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    soundManager.playTap();
    setIsSending(true);

    const effectiveName = senderName.trim() || (isAr ? 'قارئ مهتم' : 'Mindful Reader');
    localStorage.setItem('mirat_chat_username', effectiveName);

    const newMsg = await postBookClubMessage({
      senderName: effectiveName,
      senderRole: isOwner ? 'admin' : 'reader',
      text: inputText.trim(),
      createdAt: new Date().toISOString(),
      likes: 0,
    });

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsSending(false);
    soundManager.playTap();
  };

  const handleDeleteMessage = async (msgId: string) => {
    soundManager.playTap();
    await deleteBookClubMessage(msgId);
    setMessages((prev) => prev.filter((m) => m.id !== msgId));
  };

  const handleSaveAdminSession = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playTap();

    const objAr = objectivesTextAr
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const objEn = objectivesTextEn
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const updated: BookClubSession = {
      ...adminForm,
      objectivesAr: objAr.length > 0 ? objAr : adminForm.objectivesAr,
      objectivesEn: objEn.length > 0 ? objEn : adminForm.objectivesEn,
      updatedAt: new Date().toISOString(),
    };

    await saveBookSession(updated);
    setSession(updated);
    setSaveSuccess(true);
    soundManager.playTap();
    setTimeout(() => {
      setSaveSuccess(false);
      setActiveTab('chat');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          dir={isRTL ? 'rtl' : 'ltr'}
          className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-colors ${
            isLight
              ? 'bg-white border-slate-200 text-slate-800'
              : 'bg-slate-900 border-white/10 text-white'
          }`}
        >
          {/* Top Bar Header */}
          <div
            className={`p-4 sm:p-6 border-b flex items-center justify-between gap-4 shrink-0 ${
              isLight ? 'border-slate-100 bg-slate-50/80' : 'border-white/5 bg-slate-950/40'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 via-pink-500 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black font-['Alexandria']">
                    {isAr ? 'المجتمع والتفاعل • صالون كتاب الأسبوع' : 'Community • Weekly Book Club'}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border ${
                      session.status === 'live'
                        ? 'bg-rose-500/15 border-rose-500/30 text-rose-500 animate-pulse'
                        : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-500'
                    }`}
                  >
                    <Radio className="w-3 h-3" />
                    <span>
                      {session.status === 'live'
                        ? isAr
                          ? 'الصالون مباشر الآن'
                          : 'Live Session'
                        : isAr
                        ? 'جلسة أسبوعية مجدولة'
                        : 'Scheduled Session'}
                    </span>
                  </span>
                </div>
                <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isAr
                    ? 'مساحة راقية للحوار وتبادل الخبرات ومناقشة كتاب أسبوعي محدد'
                    : 'A respectful sanctuary for purposeful dialogue and weekly book discussion'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                onClose();
              }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition cursor-pointer shrink-0 ${
                isLight
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  : 'bg-white/10 hover:bg-white/15 text-white'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Featured Book Ribbon Banner */}
          <div
            className={`px-4 sm:px-6 py-3 border-b flex flex-wrap items-center justify-between gap-3 text-xs shrink-0 ${
              isLight
                ? 'bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50/50 border-purple-100 text-purple-950'
                : 'bg-gradient-to-r from-purple-950/40 via-pink-950/30 to-slate-900 border-white/5 text-purple-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-500 shrink-0" />
              <span className="font-bold">
                {isAr ? 'كتاب الأسبوع:' : 'Book of the Week:'}{' '}
                <span className="font-black text-purple-600 dark:text-purple-300">
                  {isAr ? session.bookTitleAr : session.bookTitleEn}
                </span>{' '}
                — ({isAr ? session.authorAr : session.authorEn})
              </span>
            </div>

            <div className="flex items-center gap-3 font-semibold text-[11px]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-pink-500" />
                <span>{isAr ? session.sessionTimeAr : session.sessionTimeEn}</span>
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div
            className={`px-4 sm:px-6 pt-3 border-b flex items-center justify-between gap-2 shrink-0 ${
              isLight ? 'border-slate-100' : 'border-white/5'
            }`}
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  setActiveTab('chat');
                }}
                className={`pb-2.5 px-3 text-xs font-black font-['Alexandria'] border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'chat'
                    ? 'border-purple-500 text-purple-500'
                    : isLight
                    ? 'border-transparent text-slate-500 hover:text-slate-800'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>{isAr ? 'غرفة الحوار والدردشة' : 'Discussion Room'}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-purple-500/10 text-purple-500">
                  {messages.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  setActiveTab('book');
                }}
                className={`pb-2.5 px-3 text-xs font-black font-['Alexandria'] border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'book'
                    ? 'border-purple-500 text-purple-500'
                    : isLight
                    ? 'border-transparent text-slate-500 hover:text-slate-800'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isAr ? 'تفاصيل الكتاب وغايات النقاش' : 'Book & Goals'}</span>
              </button>
            </div>

            {/* Admin control tab toggle */}
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                setActiveTab(activeTab === 'admin' ? 'chat' : 'admin');
              }}
              className={`pb-2.5 px-3 text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                activeTab === 'admin'
                  ? 'text-amber-500 border-b-2 border-amber-500'
                  : 'text-slate-400 hover:text-amber-400'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{isAr ? 'إدارة الجلسة والكتاب' : 'Manage Session'}</span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* TAB 1: CHAT & LIVE DISCUSSION */}
            {activeTab === 'chat' && (
              <div className="flex flex-col h-full space-y-4">
                {/* Rules & Privacy Card */}
                <div
                  className={`p-3.5 rounded-2xl border text-xs flex items-start gap-3 ${
                    isLight
                      ? 'bg-indigo-50/70 border-indigo-100 text-indigo-950'
                      : 'bg-indigo-950/25 border-indigo-500/20 text-indigo-200'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-extrabold block">
                      {isAr
                        ? 'ميثاق صالون مرآة القلوب الحواري:'
                        : 'Mirror of Hearts Salon Guidelines:'}
                    </span>
                    <p className={`text-[11px] leading-relaxed ${isLight ? 'text-indigo-900/80' : 'text-indigo-300'}`}>
                      {isAr
                        ? 'مساحة تحترم الخصوصية والتعددية الفكرية. يُرجى التركيز على أفكار الكتاب والتجارب الإنسانية الهادفة، وتجنب أي لغة غير لائقة أو إعلانات تجارية.'
                        : 'A safe space respecting privacy and diverse perspectives. Please focus on book insights and constructive personal reflections.'}
                    </p>
                  </div>
                </div>

                {/* Messages Feed */}
                <div className="space-y-3 min-h-[260px] max-h-[380px] overflow-y-auto pr-1">
                  {messages.map((msg) => {
                    const isAdmin = msg.senderRole === 'admin';
                    return (
                      <div
                        key={msg.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          isAdmin
                            ? isLight
                              ? 'bg-purple-50/90 border-purple-200 text-purple-950'
                              : 'bg-purple-950/30 border-purple-500/30 text-purple-100'
                            : isLight
                            ? 'bg-slate-50 border-slate-200/80 text-slate-800'
                            : 'bg-white/[0.03] border-white/10 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                                isAdmin
                                  ? 'bg-purple-600 text-white'
                                  : isLight
                                  ? 'bg-slate-200 text-slate-700'
                                  : 'bg-white/10 text-white'
                              }`}
                            >
                              {msg.senderName.charAt(0) || 'U'}
                            </div>
                            <span className="font-extrabold text-xs font-['Alexandria']">
                              {msg.senderName}
                            </span>
                            {isAdmin && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-500/20 text-purple-500 border border-purple-500/30">
                                {isAr ? 'إدارة المنصة' : 'Admin'}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-400">
                              {new Date(msg.createdAt).toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                            {(isOwner || msg.senderRole === 'admin') && (
                              <button
                                type="button"
                                onClick={() => handleDeleteMessage(msg.id)}
                                title={isAr ? 'حذف الرسالة' : 'Delete message'}
                                className="text-slate-400 hover:text-rose-500 transition cursor-pointer p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                          {msg.text}
                        </p>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Sender input bar */}
                <form
                  onSubmit={handleSendMessage}
                  className={`pt-3 border-t space-y-2.5 ${isLight ? 'border-slate-100' : 'border-white/5'}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1/3 min-w-[130px]">
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder={isAr ? 'اسمك أو اسمك المستعار...' : 'Your Name / Handle...'}
                        className={`w-full px-3 py-2 rounded-xl border text-xs outline-none transition ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500'
                            : 'bg-white/5 border-white/10 text-white focus:border-purple-400'
                        }`}
                      />
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={
                          isAr
                            ? 'شارك رأيك أو انطباعك حول كتاب هذا الأسبوع...'
                            : 'Share your perspective on this week’s book...'
                        }
                        className={`w-full px-3.5 py-2 rounded-xl border text-xs outline-none transition ${
                          isLight
                            ? 'bg-slate-50 border-slate-200 text-slate-800 focus:border-purple-500'
                            : 'bg-white/5 border-white/10 text-white focus:border-purple-400'
                        }`}
                      />
                      <button
                        type="submit"
                        disabled={isSending || !inputText.trim()}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-purple-500/20 disabled:opacity-50 shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isAr ? 'إرسال' : 'Send'}</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: BOOK DETAILS & OBJECTIVES */}
            {activeTab === 'book' && (
              <div className="space-y-6">
                <div
                  className={`p-6 rounded-3xl border ${
                    isLight
                      ? 'bg-white border-slate-200 shadow-sm'
                      : 'bg-slate-900/60 border-white/10'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    {session.coverImage && (
                      <div className="w-32 h-44 rounded-2xl overflow-hidden shadow-xl shrink-0 border border-white/20">
                        <img
                          src={session.coverImage}
                          alt={session.bookTitleAr}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-3 flex-1">
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-500/10 text-purple-500 border border-purple-500/20 inline-block">
                        {isAr ? 'كتاب الأسبوع المختار للنقاش' : 'Selected Book of the Week'}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black font-['Alexandria']">
                        {isAr ? session.bookTitleAr : session.bookTitleEn}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-purple-500">
                        {isAr ? session.authorAr : session.authorEn}
                      </p>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isLight ? 'text-slate-600' : 'text-slate-300'
                        }`}
                      >
                        {isAr ? session.descriptionAr : session.descriptionEn}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-purple-500" />
                          <span>{session.sessionDate}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-pink-500" />
                          <span>{isAr ? session.sessionTimeAr : session.sessionTimeEn}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Objectives Card */}
                <div
                  className={`p-6 rounded-3xl border space-y-4 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.02] border-white/10'
                  }`}
                >
                  <h4 className="text-sm font-black font-['Alexandria'] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>{isAr ? 'غايات ومحاور النقاش الأسبوعي:' : 'Discussion Objectives & Focal Points:'}</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {(isAr ? session.objectivesAr : session.objectivesEn).map((obj, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 3: ADMIN & OWNER CONTROL */}
            {activeTab === 'admin' && (
              <form onSubmit={handleSaveAdminSession} className="space-y-5">
                <div
                  className={`p-4 rounded-2xl border text-xs flex items-center gap-3 ${
                    isLight
                      ? 'bg-amber-50 border-amber-200 text-amber-950'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                  }`}
                >
                  <Settings className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>
                    {isAr
                      ? 'لوحة تحكم المشرف: يمكنك هنا تغيير كتاب الأسبوع، وضبط تاريخ وموعد جلسة النقاش، وتحديد محاور الحوار.'
                      : 'Admin Control Panel: Update the weekly book, schedule date and time, and customize discussion objectives.'}
                  </span>
                </div>

                {saveSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isAr ? 'تم حفظ التعديلات ونشرها بنجاح!' : 'Changes saved and published successfully!'}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-extrabold">{isAr ? 'عنوان الكتاب (عربي)' : 'Book Title (Arabic)'}</label>
                    <input
                      type="text"
                      value={adminForm.bookTitleAr}
                      onChange={(e) => setAdminForm({ ...adminForm, bookTitleAr: e.target.value })}
                      className={`w-full px-3 py-2.5 rounded-xl border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-slate-800 border-white/10 text-white'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold">{isAr ? 'عنوان الكتاب (إنجليزي)' : 'Book Title (English)'}</label>
                    <input
                      type="text"
                      value={adminForm.bookTitleEn}
                      onChange={(e) => setAdminForm({ ...adminForm, bookTitleEn: e.target.value })}
                      className={`w-full px-3 py-2.5 rounded-xl border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-slate-800 border-white/10 text-white'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold">{isAr ? 'اسم المؤلف (عربي)' : 'Author (Arabic)'}</label>
                    <input
                      type="text"
                      value={adminForm.authorAr}
                      onChange={(e) => setAdminForm({ ...adminForm, authorAr: e.target.value })}
                      className={`w-full px-3 py-2.5 rounded-xl border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-slate-800 border-white/10 text-white'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold">{isAr ? 'اسم المؤلف (إنجليزي)' : 'Author (English)'}</label>
                    <input
                      type="text"
                      value={adminForm.authorEn}
                      onChange={(e) => setAdminForm({ ...adminForm, authorEn: e.target.value })}
                      className={`w-full px-3 py-2.5 rounded-xl border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-slate-800 border-white/10 text-white'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold">{isAr ? 'تاريخ وموعد الجلسة (عربي)' : 'Session Schedule (Arabic)'}</label>
                    <input
                      type="text"
                      value={adminForm.sessionTimeAr}
                      onChange={(e) => setAdminForm({ ...adminForm, sessionTimeAr: e.target.value })}
                      placeholder="الجمعة القادمة • 8:00 مساءً"
                      className={`w-full px-3 py-2.5 rounded-xl border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-slate-800 border-white/10 text-white'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-extrabold">{isAr ? 'تاريخ وموعد الجلسة (إنجليزي)' : 'Session Schedule (English)'}</label>
                    <input
                      type="text"
                      value={adminForm.sessionTimeEn}
                      onChange={(e) => setAdminForm({ ...adminForm, sessionTimeEn: e.target.value })}
                      placeholder="Friday • 8:00 PM"
                      className={`w-full px-3 py-2.5 rounded-xl border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-slate-800 border-white/10 text-white'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-extrabold">{isAr ? 'حالة الجلسة' : 'Session Status'}</label>
                    <select
                      value={adminForm.status}
                      onChange={(e) => setAdminForm({ ...adminForm, status: e.target.value as any })}
                      className={`w-full px-3 py-2.5 rounded-xl border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-slate-800 border-white/10 text-white'
                      }`}
                    >
                      <option value="scheduled">{isAr ? 'مجدولة قادمة' : 'Scheduled'}</option>
                      <option value="live">{isAr ? 'جارية ومباشرة الآن' : 'Live Now'}</option>
                      <option value="completed">{isAr ? 'منتهية ومؤرشفة' : 'Completed'}</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-extrabold">
                      {isAr ? 'نبذة عن الكتاب وموضوع النقاش (عربي)' : 'Book Summary & Topic (Arabic)'}
                    </label>
                    <textarea
                      rows={3}
                      value={adminForm.descriptionAr}
                      onChange={(e) => setAdminForm({ ...adminForm, descriptionAr: e.target.value })}
                      className={`w-full p-3 rounded-xl border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-slate-800 border-white/10 text-white'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-extrabold">
                      {isAr ? 'محاور وغايات النقاش (سطر لكل محور - عربي)' : 'Objectives (One per line - Arabic)'}
                    </label>
                    <textarea
                      rows={3}
                      value={objectivesTextAr}
                      onChange={(e) => setObjectivesTextAr(e.target.value)}
                      className={`w-full p-3 rounded-xl border outline-none ${
                        isLight ? 'bg-white border-slate-300' : 'bg-slate-800 border-white/10 text-white'
                      }`}
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold text-xs cursor-pointer shadow-md"
                  >
                    {isAr ? 'حفظ وتحديث الجلسة' : 'Save & Publish Session'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
