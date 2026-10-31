import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Plus,
  CheckCircle2,
  Circle,
  Trash2,
  Download,
  Share2,
  Plane,
  BookOpen,
  Compass,
  Home,
  Check,
  Lightbulb,
  PartyPopper,
  Camera,
} from 'lucide-react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { BucketListItem, BucketListCategory, UserProfile } from '../types';
import {
  loadBucketList,
  saveBucketList,
  BUCKET_CATEGORY_META,
  INSPIRATIONAL_SUGGESTIONS,
} from '../utils/bucketListStorage';
import { soundManager } from '../utils/sound';

interface Props {
  partnerName: string;
  profile: UserProfile;
  imageUrl?: string;
}

const CATEGORY_ICONS: Record<BucketListCategory, React.ComponentType<{ className?: string }>> = {
  travel: Plane,
  romance: Heart,
  learning: BookOpen,
  adventure: Compass,
  home: Home,
};

export const BucketListSection: React.FC<Props> = ({
  partnerName,
  profile,
  imageUrl,
}) => {
  const [items, setItems] = useState<BucketListItem[]>(() => loadBucketList(partnerName));
  const [newTitle, setNewTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BucketListCategory>('romance');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);
  const [showInspirations, setShowInspirations] = useState(false);

  // Hidden/Ref container for image snapshot
  const exportCardRef = useRef<HTMLDivElement>(null);

  // Sync to localStorage whenever items change
  useEffect(() => {
    saveBucketList(partnerName, items);
  }, [partnerName, items]);

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  // Add Item
  const handleAddItem = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newTitle.trim()) return;

    soundManager.playTap();
    const newItem: BucketListItem = {
      id: 'wish-' + Date.now(),
      title: newTitle.trim(),
      category: selectedCategory,
      completed: false,
      createdAt: Date.now(),
    };

    setItems((prev) => [newItem, ...prev]);
    setNewTitle('');
  };

  // Add from suggestions
  const handleAddSuggestion = (title: string, category: BucketListCategory) => {
    soundManager.playTap();
    if (items.some((i) => i.title === title)) return;

    const newItem: BucketListItem = {
      id: 'wish-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      title,
      category,
      completed: false,
      createdAt: Date.now(),
    };
    setItems((prev) => [newItem, ...prev]);
  };

  // Toggle Completed
  const handleToggleCompleted = (id: string) => {
    soundManager.playTap();
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextCompleted = !item.completed;
          if (nextCompleted) {
            // Trigger light confetti
            try {
              confetti({
                particleCount: 45,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#f43f5e', '#ec4899', '#a855f7', '#fbbf24'],
              });
            } catch {
              // Ignore
            }
          }
          return { ...item, completed: nextCompleted };
        }
        return item;
      })
    );
  };

  // Delete Item
  const handleDeleteItem = (id: string) => {
    soundManager.playTap();
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Export as Image (html-to-image)
  const handleExportAsImage = async (mode: 'download' | 'share' = 'download') => {
    if (!exportCardRef.current) return;
    soundManager.playTap();
    setIsExporting(true);

    try {
      // Small pause to ensure rendering stability
      await new Promise((r) => setTimeout(r, 150));

      const dataUrl = await toPng(exportCardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#0f0a1c',
      });

      if (mode === 'share' && navigator.share) {
        try {
          const res = await fetch(dataUrl);
          const blob = await res.blob();
          const file = new File([blob], `bucket-list-${partnerName}.png`, { type: 'image/png' });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: `قائمة أمنياتي المشتركة مع ${partnerName}`,
              text: `🌟 قائمة أمنيات العمر المشتركة مع شريك حياتي (${partnerName}) من تطبيق مِرآة القلوب!`,
              files: [file],
            });
            setIsExporting(false);
            return;
          }
        } catch {
          // Fallback to download
        }
      }

      // Default Download
      const link = document.createElement('a');
      link.download = `قائمة_أمنيات_مع_${partnerName}.png`;
      link.href = dataUrl;
      link.click();

      setExportSuccessMessage('تم تصدير وحفظ بطاقة الأمنيات كصورة فائقة الدقة بنجاح! 📸');
      setTimeout(() => setExportSuccessMessage(null), 4000);
    } catch (err) {
      console.error('Failed to export bucket list as image:', err);
      setExportSuccessMessage('حدث خطأ أثناء تصدير الصورة، يرجى المحاولة مرة أخرى.');
      setTimeout(() => setExportSuccessMessage(null), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  const filteredItems = items.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  return (
    <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-6 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-16 -right-16 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3 text-center sm:text-right">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 6 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center shrink-0 shadow-lg shadow-rose-500/25"
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h4 className="font-extrabold text-lg sm:text-xl text-white font-['Alexandria']">
                قائمة أمنيات العمر المشتركة (Bucket List)
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                محفوظة محلياً 💾
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-0.5">
              اكتب وخطط لأحلامك وتجاربك الاستثنائية مع شريك حياتك «{partnerName}»
            </p>
          </div>
        </div>

        {/* Export image button */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleExportAsImage('download')}
            disabled={isExporting || items.length === 0}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-rose-500/80 to-purple-600/80 hover:from-rose-500 hover:to-purple-600 border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-500/20 transition cursor-pointer disabled:opacity-50"
            title="تصدير كصورة عالية الجودة"
          >
            <Camera className="w-4 h-4 text-rose-200" />
            <span>{isExporting ? 'جاري التحويل...' : 'تصدير كصورة 📸'}</span>
          </motion.button>
        </div>
      </div>

      {/* Progress & Stat Banner */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/10 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300 font-extrabold text-sm">
            {completedCount}/{items.length}
          </div>
          <div>
            <p className="text-xs font-bold text-white">
              نسبة تحقيق أمنياتكم: <span className="text-rose-400">{progressPercent}%</span>
            </p>
            <p className="text-[11px] text-gray-400">
              {completedCount === 0
                ? 'ابدأ بتحديد الأهداف التي ترغبون في إنجازها معاً'
                : completedCount === items.length
                ? '✨ رائع! تم إنجاز جميع أمنيات القائمة سوياً!'
                : `تبقى ${items.length - completedCount} أمنيات جميلة تنتظر تحقيقها`}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full sm:w-48 h-2.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-500 to-violet-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Export notification message */}
      <AnimatePresence>
        {exportSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs text-center font-bold flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>{exportSuccessMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add New Wish Form */}
      <form onSubmit={handleAddItem} className="space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder={`أضف أمنية جديدة مع «${partnerName}» (مثال: رحلة لمشاهدة الشفق، تعلم لغة...)`}
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 focus:border-rose-400 focus:outline-none text-white text-sm placeholder:text-gray-400 transition"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!newTitle.trim()}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-rose-500/20 transition cursor-pointer disabled:opacity-40"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة أمنية</span>
          </motion.button>
        </div>

        {/* Category Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-gray-400 text-xs shrink-0 pl-1">تصنيف الأمنية:</span>
          {(Object.keys(BUCKET_CATEGORY_META) as BucketListCategory[]).map((catKey) => {
            const meta = BUCKET_CATEGORY_META[catKey];
            const IconComponent = CATEGORY_ICONS[catKey];
            const isSelected = selectedCategory === catKey;

            return (
              <motion.button
                key={catKey}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  soundManager.playTap();
                  setSelectedCategory(catKey);
                }}
                className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 shrink-0 transition cursor-pointer font-medium ${
                  isSelected
                    ? `${meta.badgeBg} border-white/30 font-bold shadow-sm`
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${meta.color}`} />
                <span>{meta.label}</span>
              </motion.button>
            );
          })}
        </div>
      </form>

      {/* Quick Inspiration Drawer Toggle */}
      <div className="relative z-10">
        <button
          type="button"
          onClick={() => {
            soundManager.playTap();
            setShowInspirations(!showInspirations);
          }}
          className="text-xs text-rose-300 hover:text-rose-200 transition flex items-center gap-1.5 font-bold cursor-pointer"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>{showInspirations ? 'إخفاء الأفكار المقترحة' : '💡 أفكار وأمنيات مقترحة بنقرة واحدة'}</span>
        </button>

        <AnimatePresence>
          {showInspirations && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2 overflow-hidden"
            >
              <p className="text-[11px] text-gray-300">
                انقر على أي أمنية لإضافتها فوراً إلى قائمتك المشتركة:
              </p>
              <div className="flex flex-wrap gap-2">
                {INSPIRATIONAL_SUGGESTIONS.map((sugg, idx) => {
                  const meta = BUCKET_CATEGORY_META[sugg.category];
                  const Icon = CATEGORY_ICONS[sugg.category];
                  const isAlreadyAdded = items.some((i) => i.title === sugg.title);

                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isAlreadyAdded}
                      onClick={() => handleAddSuggestion(sugg.title, sugg.category)}
                      className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-1.5 transition cursor-pointer text-right ${
                        isAlreadyAdded
                          ? 'bg-white/5 border-white/5 text-gray-500 opacity-50 cursor-default'
                          : 'bg-black/30 hover:bg-rose-500/20 border-white/10 hover:border-rose-500/30 text-gray-200'
                      }`}
                    >
                      <Icon className={`w-3 h-3 ${meta.color}`} />
                      <span>{sugg.title}</span>
                      {isAlreadyAdded ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Plus className="w-3 h-3 text-rose-400" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Tabs & List Header */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10 relative z-10">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => {
              soundManager.playTab();
              setFilterCategory('all');
            }}
            className={`px-3 py-1 rounded-xl transition cursor-pointer font-bold ${
              filterCategory === 'all'
                ? 'bg-white/20 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            الكل ({items.length})
          </button>
          {(Object.keys(BUCKET_CATEGORY_META) as BucketListCategory[]).map((catKey) => {
            const count = items.filter((i) => i.category === catKey).length;
            if (count === 0 && filterCategory !== catKey) return null;
            return (
              <button
                key={catKey}
                onClick={() => {
                  soundManager.playTab();
                  setFilterCategory(catKey);
                }}
                className={`px-2.5 py-1 rounded-xl transition cursor-pointer font-medium ${
                  filterCategory === catKey
                    ? 'bg-white/20 text-white font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {BUCKET_CATEGORY_META[catKey].label} ({count})
              </button>
            );
          })}
        </div>

        {items.length > 0 && (
          <span className="text-[11px] text-gray-400 shrink-0">
            انقر على الدائرة للتعليم كمنجز ✨
          </span>
        )}
      </div>

      {/* Wishes List with Framer Motion AnimatePresence */}
      <div className="space-y-2 relative z-10">
        <AnimatePresence>
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8 text-gray-400 text-xs"
            >
              لا توجد أمنيات في هذا التصنيف حالياً. اكتب أمنية أعلاه أو اختر من الأفكار المقترحة!
            </motion.div>
          ) : (
            filteredItems.map((item) => {
              const meta = BUCKET_CATEGORY_META[item.category] || BUCKET_CATEGORY_META.romance;
              const Icon = CATEGORY_ICONS[item.category] || Heart;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.01 }}
                  className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
                    item.completed
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-gray-300'
                      : 'bg-black/30 hover:bg-black/40 border-white/10 text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Checkbox toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleCompleted(item.id)}
                      className="shrink-0 text-gray-400 hover:text-emerald-400 transition cursor-pointer"
                      title={item.completed ? 'إلغاء الإنجاز' : 'تعليم كمنجز'}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 hover:text-rose-400" />
                      )}
                    </button>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-sm font-medium ${
                            item.completed
                              ? 'line-through text-gray-400'
                              : 'text-white'
                          }`}
                        >
                          {item.title}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] border ${meta.badgeBg}`}
                        >
                          <Icon className={`w-3 h-3 ${meta.color}`} />
                          <span>{meta.label}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer shrink-0"
                    title="حذف من القائمة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* HIDDEN / OFF-SCREEN EXPORT CARD CONTAINER FOR html-to-image */}
      <div
        style={{
          position: 'fixed',
          top: -9999,
          left: -9999,
          width: 800,
          opacity: 0.99,
          pointerEvents: 'none',
        }}
      >
        <div
          ref={exportCardRef}
          style={{
            width: 800,
            padding: '36px',
            backgroundColor: '#0c0717',
            backgroundImage:
              'radial-gradient(circle at 10% 20%, rgba(244,63,94,0.18) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(139,92,246,0.2) 0%, transparent 40%)',
            borderRadius: '32px',
            border: '2px solid rgba(244,63,94,0.4)',
            color: '#ffffff',
            fontFamily: 'Tajawal, sans-serif',
            direction: 'rtl',
            boxSizing: 'border-box',
          }}
        >
          {/* Card Brand Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.15)',
              paddingBottom: '20px',
              marginBottom: '24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={partnerName}
                  crossOrigin="anonymous"
                  style={{
                    width: '74px',
                    height: '74px',
                    borderRadius: '20px',
                    objectFit: 'cover',
                    border: '2px solid rgba(255,255,255,0.4)',
                    boxShadow: '0 0 16px rgba(244,63,94,0.5)',
                  }}
                />
              )}
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: '24px',
                    fontWeight: 800,
                    color: '#ffffff',
                  }}
                >
                  قائمة أمنيات العمر المشتركة 🌹
                </h2>
                <p
                  style={{
                    margin: '4px 0 0',
                    fontSize: '14px',
                    color: '#fb7185',
                    fontWeight: 700,
                  }}
                >
                  مع شريك الحياة المقترح: «{partnerName}» ({profile.country})
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  background: 'rgba(244,63,94,0.2)',
                  border: '1px solid rgba(244,63,94,0.4)',
                  padding: '6px 14px',
                  borderRadius: '16px',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#fda4af',
                }}
              >
                {completedCount} من {items.length} أمنية مُنجزة ({progressPercent}%)
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#94a3b8',
                  marginTop: '6px',
                  textAlign: 'center',
                }}
              >
                مِـرآة الـقـلـوب ✨
              </div>
            </div>
          </div>

          {/* List of items in export card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {items.slice(0, 10).map((item, index) => {
              const meta = BUCKET_CATEGORY_META[item.category] || BUCKET_CATEGORY_META.romance;
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '16px',
                    backgroundColor: item.completed
                      ? 'rgba(16, 185, 129, 0.12)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: item.completed
                      ? '1px solid rgba(16, 185, 129, 0.35)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: item.completed
                          ? '2px solid #10b981'
                          : '2px solid rgba(255,255,255,0.4)',
                        backgroundColor: item.completed ? '#10b981' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontSize: '12px',
                        fontWeight: 'bold',
                      }}
                    >
                      {item.completed ? '✓' : ''}
                    </div>
                    <span
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        textDecoration: item.completed ? 'line-through' : 'none',
                        color: item.completed ? '#94a3b8' : '#ffffff',
                      }}
                    >
                      {item.title}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '11px',
                      padding: '4px 10px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#e2e8f0',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    {meta.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer of export card */}
          <div
            style={{
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#94a3b8',
            }}
          >
            <span>🔮 تم التصميم عبر تطبيق مِرآة القلوب للتوافق الفكري والمجتمعي</span>
            <span>تاريخ الحفظ: {new Date().toLocaleDateString('ar-EG')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
