import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  Share2,
  Check,
  Award,
  ChevronRight,
  X,
  Compass,
  Heart,
  Bookmark,
} from 'lucide-react';
import { Article, ARTICLES_CATALOG } from '../data/articlesData';
import { soundManager } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialArticleId?: string;
}

type FilterCategory = 'all' | 'relationships' | 'self_growth' | 'applied_psychology' | 'emotional_iq';

export const ArticlesSectionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialArticleId,
}) => {
  const { language, isRTL, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(() => {
    if (initialArticleId) {
      return ARTICLES_CATALOG.find((a) => a.id === initialArticleId) || null;
    }
    return null;
  });
  const [copiedShare, setCopiedShare] = useState(false);

  if (!isOpen) return null;

  const categories: { key: FilterCategory; labelAr: string; labelEn: string; icon: string }[] = [
    { key: 'all', labelAr: 'جميع المقالات', labelEn: 'All Insights', icon: '✨' },
    { key: 'relationships', labelAr: 'الحياة والعلاقات الزوجية', labelEn: 'Relationships & Marriage', icon: '💑' },
    { key: 'applied_psychology', labelAr: 'علوم النفس التطبيقية', labelEn: 'Applied Psychology', icon: '🧠' },
    { key: 'self_growth', labelAr: 'تنمية الذات والنضج النفسي', labelEn: 'Self-Growth & Maturity', icon: '🌱' },
    { key: 'emotional_iq', labelAr: 'الذكاء العاطفي والتواصل', labelEn: 'Emotional Intelligence', icon: '🎯' },
  ];

  const filteredArticles = ARTICLES_CATALOG.filter((art) => {
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      art.title.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.scientificFramework.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  const handleOpenArticle = (article: Article) => {
    soundManager.playTap();
    setActiveArticle(article);
  };

  const handleBackToList = () => {
    soundManager.playTap();
    setActiveArticle(null);
  };

  const handleShareArticle = (article: Article) => {
    soundManager.playTap();
    const textToShare = `📖 مقال مميز: "${article.title}"\n${article.summary}\nمِـرآة القـلوب - موسوعة العلوم النفسية والتوافق`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2400);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-4xl h-[92vh] max-h-[850px] bg-slate-950 border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative"
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-purple-950 via-slate-900 to-rose-950 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-600 to-rose-500 flex items-center justify-center text-xl shadow-lg shadow-purple-500/25 shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white font-['Alexandria']">
                  {language === 'ar' ? 'موسوعة المقالات والعلوم النفسية' : 'Psychological & Relational Knowledge'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  {language === 'ar' ? 'أبحاث ودراسات موثوقة' : 'Peer-Reviewed Insights'}
                </span>
              </div>
              <p className="text-[11px] text-gray-300 mt-0.5">
                {language === 'ar'
                  ? 'مقالات متخصصة في أسرار التوافق الزوجي، علوم النفس التطبيقية، وتنمية الذات والنضج النفسي'
                  : 'Curated articles on marriage dynamics, emotional intelligence, and cognitive development'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeArticle && (
              <button
                onClick={handleBackToList}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 text-xs font-bold transition cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'فهرس المقالات' : 'Back to Catalog'}</span>
              </button>
            )}
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

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          <AnimatePresence mode="wait">
            {!activeArticle ? (
              /* --- VIEW 1: ARTICLES CATALOG & SEARCH --- */
              <motion.div
                key="catalog-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {/* Search & Category Filter Controls */}
                <div className="space-y-3">
                  <div className="relative">
                    <Search className={`w-4 h-4 text-gray-400 absolute top-3.5 ${isRTL ? 'right-3.5' : 'left-3.5'}`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        language === 'ar'
                          ? 'ابحث بالكلمات المفتاحية (التوافق، الصدمات، النضج، غوتمان)...'
                          : 'Search by keyword (compatibility, Gottman, resilience)...'
                      }
                      className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-purple-400 transition`}
                    />
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                    {categories.map((cat) => {
                      const isSelected = selectedCategory === cat.key;
                      return (
                        <button
                          key={cat.key}
                          type="button"
                          onClick={() => {
                            soundManager.playTap();
                            setSelectedCategory(cat.key);
                          }}
                          className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-purple-600 to-rose-600 text-white shadow-md shadow-purple-500/25 border border-purple-400/50'
                              : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                          }`}
                        >
                          <span>{cat.icon}</span>
                          <span>{language === 'ar' ? cat.labelAr : cat.labelEn}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Articles Grid */}
                {filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredArticles.map((art) => (
                      <motion.div
                        key={art.id}
                        whileHover={{ scale: 1.015, y: -2 }}
                        onClick={() => handleOpenArticle(art)}
                        className="p-5 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-purple-500/40 transition cursor-pointer flex flex-col justify-between space-y-4 group shadow-lg"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/30 flex items-center gap-1">
                              <span>{art.icon}</span>
                              <span>{language === 'ar' ? art.categoryLabelAr : art.categoryLabelEn}</span>
                            </span>
                            <div className="flex items-center gap-1 text-[10px] text-gray-400">
                              <Clock className="w-3 h-3 text-amber-400" />
                              <span>{art.readTime}</span>
                            </div>
                          </div>

                          <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-purple-300 transition leading-snug font-['Alexandria']">
                            {art.title}
                          </h3>

                          <p className="text-xs text-gray-300 line-clamp-3 leading-relaxed">
                            {art.summary}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1 text-[10px] text-gray-400">
                            <Award className="w-3 h-3 text-rose-400" />
                            <span className="truncate max-w-[200px]">{art.scientificFramework}</span>
                          </div>

                          <span className="text-purple-400 font-bold group-hover:text-purple-300 flex items-center gap-1">
                            <span>{language === 'ar' ? 'اقرأ المقال' : 'Read Article'}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-gray-400 space-y-3">
                    <span className="text-4xl block">🔍</span>
                    <p className="text-sm">
                      {language === 'ar'
                        ? 'لم يتم العثور على مقالات تطابق معايير البحث'
                        : 'No articles matched your search query'}
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition cursor-pointer"
                    >
                      {language === 'ar' ? 'عرض جميع المقالات' : 'Reset Filters'}
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              /* --- VIEW 2: ARTICLE READER MODE --- */
              <motion.div
                key="reader-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-3xl mx-auto space-y-6"
              >
                {/* Back Button for mobile */}
                <button
                  onClick={handleBackToList}
                  className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-gray-200 text-xs font-bold cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'الرجوع لفهرس المقالات' : 'Back to Catalog'}</span>
                </button>

                {/* Article Header Card */}
                <div className={`p-6 rounded-3xl bg-gradient-to-br ${activeArticle.coverGradient} border border-purple-500/30 space-y-4 shadow-xl`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-xl bg-purple-500/25 border border-purple-400/40 text-purple-200 text-xs font-extrabold flex items-center gap-1.5">
                      <span>{activeArticle.icon}</span>
                      <span>{language === 'ar' ? activeArticle.categoryLabelAr : activeArticle.categoryLabelEn}</span>
                    </span>

                    <div className="flex items-center gap-3 text-xs text-gray-300">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-300" />
                        <span>{activeArticle.readTime}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-rose-300" />
                        <span>{activeArticle.publishDate}</span>
                      </span>
                    </div>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-black text-white leading-tight font-['Alexandria']">
                    {activeArticle.title}
                  </h1>

                  <p className="text-sm text-gray-200 leading-relaxed font-medium">
                    {activeArticle.summary}
                  </p>

                  <div className="p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-rose-300">
                      <Award className="w-4 h-4 shrink-0" />
                      <span><strong>المرجعية العلمية:</strong> {activeArticle.scientificFramework}</span>
                    </div>

                    <button
                      onClick={() => handleShareArticle(activeArticle)}
                      className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0"
                    >
                      {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copiedShare ? 'تم النسخ!' : 'مشاركة'}</span>
                    </button>
                  </div>
                </div>

                {/* Key Takeaways Box */}
                <div className="p-5 rounded-3xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-amber-300 font-extrabold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>خلاصة البحث وأبرز النقاط المستفادة:</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-200">
                    {activeArticle.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold shrink-0">✓</span>
                        <span className="leading-relaxed">{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Main Content Paragraphs */}
                <div className="space-y-5 text-gray-200 text-sm leading-relaxed">
                  {activeArticle.contentParagraphs.map((para, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                      <h3 className="text-base font-extrabold text-white font-['Alexandria'] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                        <span>{para.heading}</span>
                      </h3>
                      <p className="text-gray-300 leading-loose text-sm">
                        {para.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Practical Exercise Box */}
                <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/35 space-y-3 shadow-xl">
                  <div className="flex items-center gap-2 text-emerald-300 font-black text-base">
                    <span>⚡</span>
                    <h3 className="font-['Alexandria']">{activeArticle.practicalExercise.title}</h3>
                  </div>
                  <div className="space-y-2">
                    {activeArticle.practicalExercise.steps.map((st, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-200">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Navigator */}
                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                  <button
                    onClick={handleBackToList}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>العودة لجميع المقالات</span>
                  </button>

                  <button
                    onClick={() => handleShareArticle(activeArticle)}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>نشر ومشاركة المقال</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
