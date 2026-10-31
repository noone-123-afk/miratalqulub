import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Star,
  ThumbsUp,
  Send,
  User,
  ShieldCheck,
  Sparkles,
  Check,
  AlertCircle,
} from 'lucide-react';
import {
  NovelComment,
  getNovelComments,
  addNovelComment,
  likeNovelComment,
} from '../services/novelsService';
import { soundManager } from '../utils/sound';
import { useAuth } from '../context/AuthContext';

interface Props {
  novelId: string;
  novelTitle: string;
}

export const NovelCommentsSection: React.FC<Props> = ({ novelId, novelTitle }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<NovelComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [userRoleTitle, setUserRoleTitle] = useState('متابع للتحقيقات');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  // Auto-fill user name if logged in
  useEffect(() => {
    if (user?.displayName && !userName) {
      setUserName(user.displayName);
    }
  }, [user]);

  // Load comments
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getNovelComments(novelId).then((data) => {
      if (isMounted) {
        setComments(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [novelId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    soundManager.playTap();

    try {
      const added = await addNovelComment(
        novelId,
        userName || user?.displayName || 'قارئ زائر',
        rating,
        commentText,
        userRoleTitle
      );

      soundManager.playRoundPass();
      setComments((prev) => [added, ...prev]);
      setCommentText('');
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);
    } catch (err) {
      console.error('Failed to post comment', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = (commentId: string) => {
    if (likedComments[commentId]) return;
    soundManager.playTap();

    setLikedComments((prev) => ({ ...prev, [commentId]: true }));
    setComments((prev) =>
      prev.map((c) => (c.id === commentId ? { ...c, likesCount: c.likesCount + 1 } : c))
    );

    likeNovelComment(commentId, novelId);
  };

  const averageRating =
    comments.length > 0
      ? (comments.reduce((acc, c) => acc + c.rating, 0) / comments.length).toFixed(1)
      : '5.0';

  return (
    <div className="pt-6 mt-8 border-t border-white/10 space-y-6 text-right">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-sm shadow-md">
            💬
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-white font-['Alexandria']">
              انطباعات ومناقشات القراء والمحققين
            </h4>
            <span className="text-[11px] text-gray-400">
              شارك تحليلك لمسرح الجريمة، الأكشن، الاستنتاجات، وتوقعاتك للأحداث القادمة
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 text-amber-400 font-bold px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <span>★ {averageRating}</span>
            <span className="text-gray-400 font-normal">({comments.length} تعليق)</span>
          </div>
        </div>
      </div>

      {/* New Comment Submission Form */}
      <form
        onSubmit={handleSubmit}
        className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3.5 shadow-md"
      >
        <div className="flex items-center justify-between text-xs font-bold text-white">
          <span className="flex items-center gap-1.5 text-rose-300">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span>أضف انطباعك أو تحليلك الجنائي:</span>
          </span>
          {/* Star Rating Selectors */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] text-gray-400 ml-1">تقييمك:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => {
                  soundManager.playTap();
                  setRating(star);
                }}
                className="p-0.5 text-amber-400 hover:scale-110 transition cursor-pointer"
              >
                <Star
                  className={`w-4 h-4 ${
                    star <= (hoverRating || rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-600'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="text-[11px] text-gray-400 block mb-1">اسمك أو لقبك المستعار:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={user?.displayName || 'مثال: المحقق فهد، سارة، باحث فلكي...'}
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-400/50 transition"
            />
          </div>

          <div>
            <label className="text-[11px] text-gray-400 block mb-1">صفتك أو اهتمامك:</label>
            <select
              value={userRoleTitle}
              onChange={(e) => setUserRoleTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-rose-400/50 transition cursor-pointer"
            >
              <option value="متابع للتحقيقات الجنائية" className="bg-slate-900">متابع للتحقيقات الجنائية 🔍</option>
              <option value="عاشق روايات الغموض والجريمة" className="bg-slate-900">عاشق روايات الغموض والجريمة 🕵️</option>
              <option value="محب لأكشن المطاردات والتكتيك" className="bg-slate-900">محب لأكشن المطاردات والتكتيك 🎯</option>
              <option value="شغوف بالخيال العلمي والمستقبل" className="bg-slate-900">شغوف بالخيال العلمي والمستقبل 🚀</option>
              <option value="قارئ روايات عام" className="bg-slate-900">قارئ روايات عام 📖</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[11px] text-gray-400 block mb-1">تعليقك وانطباعك حول الأحداث والأدلة:</label>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
            placeholder="ما رأيك في الدليل الحاسم، تصرف المحقق، دوافع المشتبه بهم، أو المشهد الأكشن؟ شاركنا تحليلك..."
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-400/50 transition resize-none"
            required
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          {successMessage ? (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>تم نشر انطباعك بنجاح! شكرًا لمشاركتك.</span>
            </span>
          ) : (
            <span className="text-[10px] text-gray-400">
              متاح للجميع دون الحاجة لتسجيل دخول إلزامي 🌟
            </span>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !commentText.trim()}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:opacity-95 text-white font-bold text-xs transition shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'جارٍ النشر...' : 'نشر التعليق'}</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        <h5 className="font-bold text-xs text-gray-300">
          أحدث انطباعات ومناقشات القراء ({comments.length}):
        </h5>

        {isLoading ? (
          <div className="text-center py-6 text-xs text-gray-400">جارٍ تحميل تعليقات الرواية...</div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 rounded-2xl bg-white/5 border border-white/10 text-gray-400 text-xs">
            كن أول من يشارك انطباعه وتحليله لهذه الرواية! ✨
          </div>
        ) : (
          comments.map((c) => {
            const isLiked = likedComments[c.id];
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center justify-center font-bold text-xs">
                      {c.userName.charAt(0) || 'ق'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs">{c.userName}</span>
                        {c.userRoleTitle && (
                          <span className="text-[10px] text-gray-400 hidden sm:inline">
                            · {c.userRoleTitle}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 text-[10px]">
                        {[...Array(c.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] text-gray-400 font-mono">{c.createdAt}</span>
                </div>

                <p className="text-xs text-gray-200 leading-relaxed pl-2 pr-1">
                  {c.commentText}
                </p>

                <div className="flex items-center justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => handleLike(c.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      isLiked
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>مفيد</span>
                    <span className="font-mono text-[10px]">({c.likesCount})</span>
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
