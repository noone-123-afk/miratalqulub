import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Users,
  Sparkles,
  Heart,
  Radar,
  Radio,
  ShieldCheck,
  LogOut,
  RefreshCw,
  Compass,
  Smile,
  Mic,
} from 'lucide-react';
import { UserProfile, VoiceToneAnalysisResult } from '../types';
import { useLiveChat } from '../hooks/useLiveChat';
import { soundManager } from '../utils/sound';
import { VoiceToneAnalysisModal } from './VoiceToneAnalysisModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  onOpenBlindDate?: () => void;
}

const ICEBREAKERS = [
  'ما هي أهم قيمة تبحث عنها في شريك الحياة؟ 🌟',
  'ما هو نمط يومك المثالي في نهاية الأسبوع؟ ☕',
  'كيف تحب أن يعبّر لك الطرف الآخر عن التقدير والاهتمام؟ 💖',
  'ما هو حلمك الأكبر الذي تسعى لتحقيقه قريباً؟ 🚀',
  'أي المدن أو الأماكن الطبيعية هي الأقرب لقلبك؟ ✈️',
];

export const LiveChatModal: React.FC<Props> = ({ isOpen, onClose, profile, onOpenBlindDate }) => {
  const {
    isConnected,
    myUserId,
    status,
    partner,
    compatibilityScore,
    compatibilityReason,
    messages,
    partnerIsTyping,
    partnerLeftMessage,
    onlineCount,
    searchingCount,
    startSearch,
    cancelSearch,
    sendMessage,
    sendTyping,
    leaveChat,
  } = useLiveChat(profile);

  const [inputText, setInputText] = useState('');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, partnerIsTyping]);

  if (!isOpen) return null;

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    soundManager.playTap();
    sendMessage(inputText);
    setInputText('');
    sendTyping(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    sendTyping(e.target.value.length > 0);
  };

  const handleIcebreakerClick = (prompt: string) => {
    soundManager.playTap();
    sendMessage(prompt);
  };

  const userGenderText = profile?.userGender === 'male' ? 'شاب' : 'فتاة';
  const partnerGenderText = profile?.partnerGender === 'female' ? 'فتاة' : 'شاب';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-xl bg-slate-950 border border-rose-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-purple-950/80 via-slate-900 to-rose-950/80 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white font-['Alexandria']">
                  رادار التوافق والدردشة الحية
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[10px] text-emerald-300 font-bold">
                  مباشر 🟢
                </span>
              </div>
              <p className="text-[11px] text-gray-300">
                مطابقة فورية للمتواجدين في الوقت نفسه إذا تشابهت المواصفات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[11px] text-gray-300">
              <Users className="w-3.5 h-3.5 text-rose-400" />
              <span>متواجدون الآن: <strong>{onlineCount}</strong></span>
            </div>
            <button
              onClick={() => {
                soundManager.playTap();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* STATE 1: IDLE */}
          {status === 'idle' && (
            <div className="py-4 space-y-4 text-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-rose-600/30 via-purple-600/30 to-amber-500/20 border border-rose-500/40 flex items-center justify-center text-4xl shadow-inner shadow-rose-500/20"
              >
                📡
              </motion.div>

              <div className="space-y-1">
                <h4 className="text-lg font-bold text-white font-['Alexandria']">
                  ابحث عن شخص متواجد الآن يطابق مواصفاتك
                </h4>
                <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                  يقوم الرادار بفحص المتصلين حالياً على المنصة في نفس اللحظة، وإذا وجد تطابقاً متبادلاً في الرغبات والمواصفات للطرفين يفتح غرفة محادثة حية ومباشرة.
                </p>
              </div>

              {/* Profile Recap Card */}
              {profile && (
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto text-xs text-right space-y-2">
                  <div className="flex items-center justify-between text-rose-300 font-bold border-b border-white/10 pb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>مواصفاتك المسجلة للبحث:</span>
                    </span>
                    <span className="text-[10px] text-gray-400">هويتك محمية ومجهولة 🔒</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-gray-300 text-[11px]">
                    <div>
                      <span className="text-gray-400">أنت: </span>
                      <strong>{profile.userName || userGenderText} ({profile.userAge} عاماً)</strong>
                    </div>
                    <div>
                      <span className="text-gray-400">تبحث عن: </span>
                      <strong className="text-rose-300">{partnerGenderText}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400">البلد: </span>
                      <span>{profile.country}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">الثقافة: </span>
                      <span>{profile.ethnicity}</span>
                    </div>
                  </div>
                </div>
              )}

              {partnerLeftMessage && (
                <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs">
                  ℹ️ {partnerLeftMessage}
                </div>
              )}

              {/* Start Search Action */}
              <div className="pt-2 space-y-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={startSearch}
                  className="w-full max-w-md py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:opacity-95 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition cursor-pointer mx-auto"
                >
                  <Radar className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>بدء البحث بالرادار المباشر عن متصل متوافق 🟢</span>
                </motion.button>

                {onOpenBlindDate && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      soundManager.playTap();
                      onClose();
                      onOpenBlindDate();
                    }}
                    className="w-full max-w-md py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:opacity-95 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30 transition cursor-pointer mx-auto"
                  >
                    <span>🎬 الانتقال إلى عرض The Blind Date Show التلفزيوني</span>
                  </motion.button>
                )}
              </div>

              {/* Multi-Tab Simulation Note for testers */}
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-200 max-w-md mx-auto text-right space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <span>💡 نصيحة للتجربة الفورية:</span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  يمكنك فتح هذا الرابط في <strong>نافذة خاصة ثانية (Incognito)</strong> أو على جهاز آخر؛ وبمجرد النقر على البحث في النافذتين سيتم ربطهما في دردشة حية فورية ومتبادلة!
                </p>
              </div>
            </div>
          )}

          {/* STATE 2: SEARCHING */}
          {status === 'searching' && (
            <div className="py-8 space-y-6 text-center">
              {/* Radar Animation */}
              <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.8, 2.2], opacity: [0.6, 0.2, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border-2 border-rose-500"
                />
                <motion.div
                  animate={{ scale: [1, 1.4, 1.8], opacity: [0.7, 0.3, 0] }}
                  transition={{ repeat: Infinity, duration: 2.2, delay: 0.6, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full border-2 border-purple-500"
                />
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center text-white text-3xl shadow-xl shadow-rose-500/30 relative z-10 animate-pulse">
                  📡
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-lg font-bold text-white font-['Alexandria'] flex items-center justify-center gap-2">
                  <span>جاري البحث عن متصلين متوافقين...</span>
                  <RefreshCw className="w-4 h-4 text-rose-400 animate-spin" />
                </h4>
                <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
                  نقوم حالياً بفحص رغبات الشريك والمواصفات مع الأشخاص المتواجدين على المنصة في هذه اللحظة...
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
                <span>المتواجدون: <strong className="text-white">{onlineCount}</strong></span>
                <span>•</span>
                <span>الباحثون عن تطابق: <strong className="text-rose-400">{searchingCount || 1}</strong></span>
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={cancelSearch}
                  className="py-2.5 px-6 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-gray-300 text-xs font-semibold cursor-pointer transition"
                >
                  إلغاء البحث والعودة
                </motion.button>
              </div>
            </div>
          )}

          {/* STATE 3: IN CHAT */}
          {status === 'in_chat' && partner && (
            <div className="flex flex-col h-full space-y-3">
              {/* Matched Partner Profile Banner */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-950/60 via-purple-950/60 to-slate-900 border border-rose-500/30 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-2xl shadow-md shadow-rose-500/20">
                    {partner.userGender === 'male' ? '👨' : '👩'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm font-['Alexandria']">
                        {partner.userName}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-[10px] text-rose-300 font-bold">
                        توافق {compatibilityScore}% ❤️
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-300">
                      {partner.country} • {partner.ethnicity} • {partner.userAge} عاماً
                    </p>
                    <p className="text-[10px] text-amber-300/90 mt-0.5">
                      {compatibilityReason}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={leaveChat}
                  className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-300 border border-white/10 transition cursor-pointer text-xs flex items-center gap-1"
                  title="إنهاء المحادثة"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">إنهاء</span>
                </motion.button>
              </motion.div>

              {/* Chat Messages Flow */}
              <div className="min-h-[220px] max-h-[320px] overflow-y-auto space-y-2.5 p-2 rounded-2xl bg-black/40 border border-white/5 scrollbar-thin">
                {messages.length === 0 && (
                  <div className="text-center py-6 text-gray-400 text-xs space-y-1">
                    <p className="font-bold text-rose-300">🎉 بدأت المحادثة الحية بينكما بنجاح!</p>
                    <p>ألقِ التحية أو اختر أحد أسئلة التوافق المقترحة بالأسفل لبدء حوار ثري.</p>
                  </div>
                )}

                {messages.map((m) => {
                  const isMe = m.senderId === myUserId;
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1.5 mb-0.5 px-1 text-[10px] text-gray-400">
                        <span>{isMe ? 'أنت' : partner.userName}</span>
                        <span>•</span>
                        <span>{new Date(m.timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div
                        className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                          isMe
                            ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-tr-none shadow-md shadow-rose-500/10'
                            : 'bg-white/10 text-gray-100 rounded-tl-none border border-white/10 shadow-sm'
                        }`}
                      >
                        {m.text}
                      </div>
                    </motion.div>
                  );
                })}

                {partnerIsTyping && (
                  <div className="flex items-center gap-2 text-xs text-rose-300 py-1 px-2 italic">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </div>
                    <span>{partner.userName} يكتب الآن...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Icebreaker Prompts */}
              <div className="space-y-1">
                <span className="text-[11px] text-gray-400 block px-1">
                  💬 أسئلة مقترحة لكسر الجليد واستكشاف التوافق:
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                  {ICEBREAKERS.map((prompt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleIcebreakerClick(prompt)}
                      className="shrink-0 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-gray-300 hover:text-white transition cursor-pointer"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input Box with Optional Voice Note Feature */}
              <form onSubmit={handleSend} className="flex items-center gap-2 pt-1">
                {/* Optional Voice Recording & Tone Analysis Button */}
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setIsVoiceModalOpen(true);
                  }}
                  className="px-3 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-purple-500/20 hover:from-rose-500/30 hover:to-purple-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95 shadow-sm"
                  title="تسجيل رسالة صوتية قصيرة وتحليل نبرة الصوت والمشاعر بواسطة الذكاء الاصطناعي"
                >
                  <Mic className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span className="hidden sm:inline font-['Alexandria']">تسجيل صوتي 🎙️</span>
                  <span className="sm:hidden">🎙️</span>
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={handleInputChange}
                  placeholder="اكتب رسالتك باحترام ومودة..."
                  className="flex-1 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-rose-400"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 hover:opacity-95 text-white transition flex items-center justify-center gap-1.5 text-xs font-bold cursor-pointer disabled:opacity-40"
                >
                  <span>إرسال</span>
                  <Send className="w-3.5 h-3.5 -rotate-90" />
                </motion.button>
              </form>
            </div>
          )}
        </div>

        {/* Optional Voice Tone Analysis Modal Component */}
        {partner && (
          <VoiceToneAnalysisModal
            isOpen={isVoiceModalOpen}
            onClose={() => setIsVoiceModalOpen(false)}
            partnerName={partner.userName}
            partnerGender={partner.userGender}
            userGender={profile?.userGender || 'male'}
            onSendVoiceMessageToChat={(record) => {
              const synergy = record.analysis?.vocalSynergyScore || 96;
              const archetype = record.analysis?.voiceToneArchetype || 'نبرة صوتية دافئة';
              sendMessage(`🎙️ [رسالة صوتية ${record.duration}ث] • ${archetype} • نسبة التوافق الصوتي: ${synergy}%`);
            }}
          />
        )}
      </motion.div>
    </div>
  );
};
