import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  Clock,
  Flame,
  ArrowRight,
  ArrowLeft,
  Share2,
  Check,
  ChevronRight,
  ChevronLeft,
  X,
  VolumeX,
  Bookmark,
  Target,
  FileText,
  UserCheck,
  Plus,
  Edit3,
  Trash2,
  MessageSquare,
  AlertTriangle,
  Crown,
  Sparkles,
} from 'lucide-react';
import {
  Novel,
  NovelChapter,
  NovelGenre,
  NOVELS_CATALOG,
  CrimeClue,
  SuspectProfile,
} from '../data/novelsData';
import { soundManager } from '../utils/sound';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getAllNovels, deleteOwnerNovel } from '../services/novelsService';
import { NovelCommentsSection } from './NovelCommentsSection';
import { AddNovelModal } from './AddNovelModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialNovelId?: string;
}

type ReaderTheme = 'noir' | 'cyber' | 'amber';
type ReaderTab = 'narrative' | 'evidence_board' | 'suspects' | 'notes' | 'comments';

export const NovelsSectionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialNovelId,
}) => {
  const { language, isRTL, t } = useLanguage();
  const { isOwner } = useAuth();

  // Novels List State (merged built-in, modified, custom, minus deleted)
  const [novelsList, setNovelsList] = useState<Novel[]>(NOVELS_CATALOG);
  const [selectedGenre, setSelectedGenre] = useState<'all' | NovelGenre>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Reading State
  const [activeNovel, setActiveNovel] = useState<Novel | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [readerTab, setReaderTab] = useState<ReaderTab>('narrative');
  const [fontSize, setFontSize] = useState<number>(17);
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>('noir');
  const [copiedShare, setCopiedShare] = useState(false);
  const [savedBookmarks, setSavedBookmarks] = useState<Record<string, number>>({});
  const [isAmbiencePlaying, setIsAmbiencePlaying] = useState(false);
  const [ambienceType, setAmbienceType] = useState<'rain' | 'pulse' | 'cyber'>('rain');

  // Owner Management Modal States
  const [isAddOrEditModalOpen, setIsAddOrEditModalOpen] = useState(false);
  const [novelToEdit, setNovelToEdit] = useState<Novel | null>(null);
  const [deletingNovel, setDeletingNovel] = useState<Novel | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Audio context ref for procedural suspense ambience
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambienceNodesRef = useRef<{ osc?: OscillatorNode; gain?: GainNode; noise?: AudioNode } | null>(null);

  // Load all merged novels from service (Firestore + localStorage)
  const refreshNovels = async () => {
    try {
      const merged = await getAllNovels();
      if (merged && merged.length > 0) {
        setNovelsList(merged);
        // If an active novel was updated, sync it
        if (activeNovel) {
          const fresh = merged.find((n) => n.id === activeNovel.id);
          if (fresh) {
            setActiveNovel(fresh);
          }
        }
      }
    } catch {
      // Fallback is NOVELS_CATALOG
    }
  };

  useEffect(() => {
    if (isOpen) {
      refreshNovels();
    }
  }, [isOpen]);

  // Set initial novel if requested
  useEffect(() => {
    if (initialNovelId && novelsList.length > 0) {
      const target = novelsList.find((n) => n.id === initialNovelId);
      if (target) {
        setActiveNovel(target);
        setCurrentChapterIndex(0);
      }
    }
  }, [initialNovelId, novelsList]);

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mirat_novels_bookmarks');
      if (stored) {
        setSavedBookmarks(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Stop sound on unmount or close
  useEffect(() => {
    return () => {
      stopAmbience();
    };
  }, []);

  if (!isOpen) return null;

  // Procedural Web Audio Suspense Ambience Generator
  const startAmbience = (type: 'rain' | 'pulse' | 'cyber') => {
    stopAmbience();
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);

      if (type === 'rain') {
        // Pink noise filter simulation for noir rain
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0,
          b1 = 0,
          b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.969 * b2 + white * 0.153852;
          data[i] = (b0 + b1 + b2) * 0.15;
        }
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = buffer;
        noiseSource.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, ctx.currentTime);

        noiseSource.connect(filter);
        filter.connect(masterGain);
        noiseSource.start();

        ambienceNodesRef.current = { gain: masterGain, noise: noiseSource };
      } else if (type === 'pulse') {
        // Low heartbeat sub-bass pulse
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(55, ctx.currentTime);

        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(1.2, ctx.currentTime); // ~72 bpm heartbeat

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(0.06, ctx.currentTime);

        lfo.connect(masterGain.gain);
        osc.connect(masterGain);

        osc.start();
        lfo.start();
        ambienceNodesRef.current = { osc, gain: masterGain };
      } else {
        // Cyber synth drone
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, ctx.currentTime);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        osc.connect(filter);
        filter.connect(masterGain);
        osc.start();
        ambienceNodesRef.current = { osc, gain: masterGain };
      }

      setIsAmbiencePlaying(true);
      setAmbienceType(type);
    } catch {
      setIsAmbiencePlaying(false);
    }
  };

  const stopAmbience = () => {
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch {
        // Ignore
      }
      audioCtxRef.current = null;
    }
    ambienceNodesRef.current = null;
    setIsAmbiencePlaying(false);
  };

  const toggleAmbience = (type: 'rain' | 'pulse' | 'cyber') => {
    soundManager.playTap();
    if (isAmbiencePlaying && ambienceType === type) {
      stopAmbience();
    } else {
      startAmbience(type);
    }
  };

  // Genre Filters List
  const genresList: { key: 'all' | NovelGenre; labelAr: string; icon: string }[] = [
    { key: 'all', labelAr: 'جميع الروايات', icon: '✨' },
    { key: 'crime_mystery', labelAr: 'غموض وجرائم جنائية', icon: '🔍' },
    { key: 'tactical_action', labelAr: 'أكشن ومطاردات تكتيكية', icon: '🎯' },
    { key: 'sci_fi_future', labelAr: 'خيال علمي وتطوير ومستقبل', icon: '🚀' },
    { key: 'sci_fantasy', labelAr: 'أكشن وخيال إبداعي', icon: '⚔️' },
  ];

  const filteredNovels = novelsList.filter((nov) => {
    const matchesGenre = selectedGenre === 'all' || nov.genre === selectedGenre;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      nov.titleAr.toLowerCase().includes(q) ||
      nov.subtitleAr.toLowerCase().includes(q) ||
      nov.synopsisAr.toLowerCase().includes(q) ||
      nov.authorPersonaAr.toLowerCase().includes(q) ||
      nov.forensicThemeAr.toLowerCase().includes(q);
    return matchesGenre && matchesQuery;
  });

  const handleOpenNovel = (novel: Novel, chapterIdx = 0) => {
    soundManager.playTap();
    setActiveNovel(novel);
    setCurrentChapterIndex(chapterIdx);
    setReaderTab('narrative');
  };

  const handleBackToCatalog = () => {
    soundManager.playTap();
    setActiveNovel(null);
    stopAmbience();
  };

  const handleToggleBookmark = (novelId: string, chapIdx: number) => {
    soundManager.playTap();
    const updated = { ...savedBookmarks, [novelId]: chapIdx };
    setSavedBookmarks(updated);
    try {
      localStorage.setItem('mirat_novels_bookmarks', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  const handleShareNovel = (novel: Novel, chapter?: NovelChapter) => {
    soundManager.playTap();
    const url = typeof window !== 'undefined' ? window.location.origin : 'https://miratalqulub.com';
    const textToShare = chapter
      ? `📖 أقرأ الآن في رواية "${novel.titleAr}" - ${chapter.titleAr}\n${novel.subtitleAr}\nمنصة مِـرآة القـلوب للروايات والتحقيقات التشويقية:\n${url}`
      : `🔥 رواية تشويقية رائعة: "${novel.titleAr}"\n${novel.synopsisAr}\nاكتشف تفاصيل الجريمة والتحقيق الجنائي:\n${url}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2600);
    }
  };

  // Owner Actions
  const handleOpenCreateNovel = () => {
    soundManager.playTap();
    setNovelToEdit(null);
    setIsAddOrEditModalOpen(true);
  };

  const handleOpenEditNovel = (novel: Novel, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundManager.playTap();
    setNovelToEdit(novel);
    setIsAddOrEditModalOpen(true);
  };

  const handleOpenDeleteConfirm = (novel: Novel, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundManager.playTap();
    setDeletingNovel(novel);
  };

  const handleConfirmDelete = async () => {
    if (!deletingNovel) return;
    setIsDeleting(true);
    soundManager.playTap();
    try {
      await deleteOwnerNovel(deletingNovel.id);
      soundManager.playRoundPass();
      // If deleted novel is currently open in reader, back to catalog
      if (activeNovel?.id === deletingNovel.id) {
        setActiveNovel(null);
      }
      setDeletingNovel(null);
      await refreshNovels();
    } catch (err) {
      console.error('Error deleting novel', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleNovelSaved = (savedNovel: Novel) => {
    refreshNovels();
  };

  const currentChapter = activeNovel && activeNovel.chapters ? activeNovel.chapters[currentChapterIndex] : null;
  const isCurrentBookmarked = activeNovel && savedBookmarks[activeNovel.id] === currentChapterIndex;

  // Reader Background Styling classes
  const themeClasses: Record<
    ReaderTheme,
    { bg: string; text: string; panel: string; border: string; accent: string }
  > = {
    noir: {
      bg: 'bg-[#090b14]',
      text: 'text-slate-100',
      panel: 'bg-slate-900/90',
      border: 'border-rose-900/40',
      accent: 'text-rose-400',
    },
    cyber: {
      bg: 'bg-[#030712]',
      text: 'text-cyan-50',
      panel: 'bg-slate-950/90',
      border: 'border-cyan-500/30',
      accent: 'text-cyan-400',
    },
    amber: {
      bg: 'bg-[#181410]',
      text: 'text-[#f5ede3]',
      panel: 'bg-[#211a14]/90',
      border: 'border-amber-700/40',
      accent: 'text-amber-400',
    },
  };

  const currentThemeStyle = themeClasses[readerTheme];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-hidden text-right"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="w-full max-w-5xl h-[94vh] max-h-[880px] bg-slate-950 border border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative"
      >
        {/* ================= TOP HEADER ================= */}
        <div className="p-3.5 sm:p-4 bg-gradient-to-r from-purple-950 via-slate-900 to-rose-950 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-purple-600 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-[#120d24] rounded-[14px] flex items-center justify-center text-lg">
                🕵️‍♂️
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-sm sm:text-base text-white font-['Alexandria']">
                  قسم الروايات التشويقية والتحقيقات الجنائية
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  غموض • أكشن • خيال علمي 🔍
                </span>
                {isOwner && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 hidden sm:inline-flex items-center gap-1">
                    <Crown className="w-3 h-3 text-amber-400" />
                    صلاحيات المالك مفعلة
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-300">
                روايات احترافية طويلة بأسلوب محقق جنائي خبير، تفاصيل الأدلة، سيكولوجية الجناة والخيال العلمي
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Owner Add Novel Quick Button */}
            {isOwner && !activeNovel && (
              <button
                onClick={handleOpenCreateNovel}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:opacity-90 text-white text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
                title="إضافة رواية جديدة بصفتك مالك الموقع"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">إضافة رواية جديدة</span>
                <span className="sm:hidden">إضافة</span>
              </button>
            )}

            <button
              onClick={() => {
                soundManager.playTap();
                stopAmbience();
                onClose();
              }}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition cursor-pointer"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= VIEW 1: NOVELS CATALOG ================= */}
        {!activeNovel && (
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4 custom-scrollbar">
            {/* Spotlight Banner: Featured Novel */}
            {filteredNovels.length > 0 && (
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-red-950/60 via-purple-950/50 to-slate-900 border border-rose-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2 text-xs text-amber-300 font-bold">
                    <Flame className="w-4 h-4 text-rose-400" />
                    <span>رواية الشهر الأكثر قراءة وتشويقاً:</span>
                    <span className="text-[10px] text-gray-400">· {filteredNovels[0].readsCount || 28450} قارئ</span>
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-white font-['Alexandria']">
                    {filteredNovels[0].titleAr}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {filteredNovels[0].synopsisAr}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 pt-1">
                    <span>⏱️ {filteredNovels[0].totalChapters} فصول كاملة · {filteredNovels[0].estimatedReadingTime}</span>
                    <span>🔬 {filteredNovels[0].forensicThemeAr}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                  {isOwner && (
                    <button
                      onClick={(e) => handleOpenEditNovel(filteredNovels[0], e)}
                      className="px-3 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer border border-white/15"
                      title="تعديل الرواية المميزة"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                      <span>تعديل</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleOpenNovel(filteredNovels[0], 0)}
                    className="flex-1 md:flex-initial px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:opacity-95 text-white font-extrabold text-xs transition shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>ابدأ قراءة الرواية الآن</span>
                  </button>
                </div>
              </div>
            )}

            {/* Search Bar & Genre Filters */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث بالعنوان، اسم المحقق، الكلمات المفتاحية، أو نوع الجريمة..."
                  className="w-full pr-10 pl-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-rose-400/50 transition"
                />
              </div>

              {/* Genre Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10 overflow-x-auto text-xs font-bold scrollbar-none">
                {genresList.map((g) => (
                  <button
                    key={g.key}
                    onClick={() => {
                      soundManager.playTab();
                      setSelectedGenre(g.key);
                    }}
                    className={`px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                      selectedGenre === g.key
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{g.icon}</span>
                    <span>{g.labelAr}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Empty State */}
            {filteredNovels.length === 0 && (
              <div className="p-8 text-center space-y-3 rounded-3xl bg-white/5 border border-white/10">
                <p className="text-gray-400 text-xs">لا توجد روايات تطابق هذا البحث أو التصنيف حالياً.</p>
                {isOwner && (
                  <button
                    onClick={handleOpenCreateNovel}
                    className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold transition hover:bg-rose-700 cursor-pointer"
                  >
                    + إضافة رواية جديدة الآن
                  </button>
                )}
              </div>
            )}

            {/* Novels Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredNovels.map((novel) => {
                const isBookmarked = savedBookmarks[novel.id] !== undefined;
                return (
                  <motion.div
                    key={novel.id}
                    whileHover={{ scale: 1.015, y: -3 }}
                    className="p-4 sm:p-5 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-500/40 transition flex flex-col justify-between group shadow-md relative"
                  >
                    <div>
                      {/* Top Meta info */}
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="font-bold text-[11px]"
                            style={{ color: novel.genreBadgeColor }}
                          >
                            {novel.genreLabelAr}
                          </span>
                          <span>·</span>
                          <span>{novel.authorPersonaAr}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400 font-bold">
                          <span>★</span>
                          <span>{novel.rating}</span>
                        </div>
                      </div>

                      {/* Cover & Title Layout */}
                      <div className="flex gap-3 mb-3">
                        <div
                          className="w-20 h-28 sm:w-24 sm:h-32 rounded-2xl overflow-hidden shrink-0 border border-white/15 shadow-inner"
                          dangerouslySetInnerHTML={{ __html: novel.coverIllustrationSvg }}
                        />
                        <div className="space-y-1 flex-1 min-w-0">
                          <h4 className="font-extrabold text-sm sm:text-base text-white group-hover:text-rose-300 transition line-clamp-2 font-['Alexandria']">
                            {novel.titleAr}
                          </h4>
                          <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                            {novel.subtitleAr}
                          </p>
                          <div className="text-[11px] text-gray-400 pt-1 flex items-center gap-2">
                            <span>⏱️ {novel.estimatedReadingTime}</span>
                            <span>·</span>
                            <span>{novel.totalChapters} فصول</span>
                            <span>·</span>
                            <span>{novel.totalWords ? novel.totalWords.toLocaleString() : '5,000'} كلمة</span>
                          </div>
                        </div>
                      </div>

                      {/* Forensic / Psychological Highlights */}
                      <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 text-[11px] space-y-1 mb-3">
                        <div className="text-gray-300">
                          <span className="text-rose-400 font-bold">المنهج الجنائي: </span>
                          <span className="text-gray-300">{novel.forensicThemeAr}</span>
                        </div>
                      </div>
                    </div>

                    {/* Owner Management Bar (Only for site owner one497303@gmail.com) */}
                    {isOwner && (
                      <div className="mb-3 p-2 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1 text-amber-300 font-bold text-[11px]">
                          <Crown className="w-3 h-3 text-amber-400" />
                          <span>إدارة المالك:</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => handleOpenEditNovel(novel, e)}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-[11px] transition flex items-center gap-1 cursor-pointer border border-amber-500/30"
                            title="تعديل نصوص وفصول هذه الرواية"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>تعديل</span>
                          </button>
                          <button
                            onClick={(e) => handleOpenDeleteConfirm(novel, e)}
                            className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-[11px] transition flex items-center gap-1 cursor-pointer border border-rose-500/30"
                            title="حذف هذه الرواية نهائياً من المكتبة"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>حذف</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleShareNovel(novel)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition cursor-pointer"
                          title="مشاركة الرواية"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleOpenNovel(novel, savedBookmarks[novel.id] || 0)}
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <span>{isBookmarked ? 'متابعة القراءة 🔖' : 'قراءة الرواية'}</span>
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= VIEW 2: NOVEL READER ================= */}
        {activeNovel && currentChapter && (
          <div className={`flex-1 flex flex-col overflow-hidden ${currentThemeStyle.bg} ${currentThemeStyle.text}`}>
            {/* Reader Sub-Header Toolbar */}
            <div
              className={`px-4 py-2.5 ${currentThemeStyle.panel} border-b ${currentThemeStyle.border} flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToCatalog}
                  className="flex items-center gap-1 text-gray-400 hover:text-white transition cursor-pointer font-bold"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>المكتبة</span>
                </button>
                <span className="text-gray-500">|</span>
                <span className="font-extrabold text-white truncate max-w-[200px] sm:max-w-xs font-['Alexandria']">
                  {activeNovel.titleAr}
                </span>
                <span className="text-gray-400 text-[11px] hidden sm:inline">
                  (الفصل {currentChapter.chapterNumber} من {activeNovel.totalChapters})
                </span>
              </div>

              {/* Reader Controls: Font, Ambience, Theme, Owner Controls, Bookmarks */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Owner controls in reader */}
                {isOwner && (
                  <div className="flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 p-0.5 rounded-xl">
                    <button
                      onClick={() => handleOpenEditNovel(activeNovel)}
                      className="px-2 py-1 rounded-lg text-[11px] font-bold text-amber-300 hover:bg-amber-500/20 transition cursor-pointer flex items-center gap-1"
                      title="تعديل فصول الرواية الحالية"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span className="hidden sm:inline">تعديل الرواية</span>
                    </button>
                    <button
                      onClick={() => handleOpenDeleteConfirm(activeNovel)}
                      className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/20 transition cursor-pointer"
                      title="حذف هذه الرواية"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Suspense Ambience Sounds */}
                <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-xl border border-white/10">
                  <button
                    onClick={() => toggleAmbience('rain')}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer flex items-center gap-1 ${
                      isAmbiencePlaying && ambienceType === 'rain'
                        ? 'bg-rose-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    title="أجواء المطر النوار والتحقيق"
                  >
                    <span>🌧️</span>
                    <span className="hidden md:inline">مطر نوار</span>
                  </button>
                  <button
                    onClick={() => toggleAmbience('pulse')}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer flex items-center gap-1 ${
                      isAmbiencePlaying && ambienceType === 'pulse'
                        ? 'bg-rose-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                    title="نبضات التوتر الحابسة للأنفاس"
                  >
                    <span>💓</span>
                    <span className="hidden md:inline">نبض التوتر</span>
                  </button>
                  {isAmbiencePlaying && (
                    <button
                      onClick={stopAmbience}
                      className="p-1 rounded-lg text-rose-400 hover:text-white"
                      title="كتم الصوت"
                    >
                      <VolumeX className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Font Size Adjusters */}
                <div className="flex items-center bg-black/40 rounded-xl border border-white/10 p-0.5 text-xs">
                  <button
                    onClick={() => setFontSize(Math.max(14, fontSize - 1))}
                    className="px-2 py-0.5 text-gray-300 hover:text-white cursor-pointer font-bold"
                    title="تصغير الخط"
                  >
                    A-
                  </button>
                  <span className="px-1 text-[10px] text-gray-400 font-mono">{fontSize}</span>
                  <button
                    onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                    className="px-2 py-0.5 text-gray-300 hover:text-white cursor-pointer font-bold"
                    title="تكبير الخط"
                  >
                    A+
                  </button>
                </div>

                {/* Theme Switcher */}
                <div className="flex items-center bg-black/40 rounded-xl border border-white/10 p-0.5">
                  <button
                    onClick={() => setReaderTheme('noir')}
                    className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] cursor-pointer ${
                      readerTheme === 'noir' ? 'bg-rose-600 text-white' : 'text-gray-400'
                    }`}
                    title="ثيم محقق نوار (داكن أحمر)"
                  >
                    🕵️
                  </button>
                  <button
                    onClick={() => setReaderTheme('cyber')}
                    className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] cursor-pointer ${
                      readerTheme === 'cyber' ? 'bg-cyan-600 text-white' : 'text-gray-400'
                    }`}
                    title="ثيم سايبر الفضاء (أزرق سماوي)"
                  >
                    🚀
                  </button>
                  <button
                    onClick={() => setReaderTheme('amber')}
                    className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] cursor-pointer ${
                      readerTheme === 'amber' ? 'bg-amber-600 text-white' : 'text-gray-400'
                    }`}
                    title="ثيم المخطوطة الدافئة (عنبر كلاسيكي)"
                  >
                    📜
                  </button>
                </div>

                {/* Bookmark Chapter */}
                <button
                  onClick={() => handleToggleBookmark(activeNovel.id, currentChapterIndex)}
                  className={`p-1.5 rounded-xl border transition cursor-pointer ${
                    isCurrentBookmarked
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                  }`}
                  title={isCurrentBookmarked ? 'الفصل محفوظ في إشاراتك' : 'حفظ موضع القراءة'}
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                {/* Share Quote / Chapter */}
                <button
                  onClick={() => handleShareNovel(activeNovel, currentChapter)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition cursor-pointer"
                  title="مشاركة الفصل"
                >
                  {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* View Mode Tabs (Narrative, Evidence Board, Suspects Dossier, Notes, Comments) */}
            <div
              className={`px-4 py-2 ${currentThemeStyle.panel} border-b ${currentThemeStyle.border} flex items-center justify-between overflow-x-auto text-xs font-bold gap-2 shrink-0 scrollbar-none`}
            >
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setReaderTab('narrative')}
                  className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                    readerTab === 'narrative'
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>نص الرواية والفصول</span>
                </button>

                {currentChapter.investigationClues && currentChapter.investigationClues.length > 0 && (
                  <button
                    onClick={() => setReaderTab('evidence_board')}
                    className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                      readerTab === 'evidence_board'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Target className="w-3.5 h-3.5 text-amber-400" />
                    <span>لوحة الأدلة والتحقيق الجنائي ({currentChapter.investigationClues.length})</span>
                  </button>
                )}

                {activeNovel.suspectsDossier && activeNovel.suspectsDossier.length > 0 && (
                  <button
                    onClick={() => setReaderTab('suspects')}
                    className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                      readerTab === 'suspects'
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5 text-sky-400" />
                    <span>الملف السيكولوجي للجناة ({activeNovel.suspectsDossier.length})</span>
                  </button>
                )}

                {currentChapter.detectiveNotesAr && currentChapter.detectiveNotesAr.length > 0 && (
                  <button
                    onClick={() => setReaderTab('notes')}
                    className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                      readerTab === 'notes'
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-300" />
                    <span>ملاحظات المحقق الميدانية</span>
                  </button>
                )}

                {/* Visitor Comments Tab */}
                <button
                  onClick={() => setReaderTab('comments')}
                  className={`px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                    readerTab === 'comments'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                  <span>تعليقات وانطباعات القراء 💬</span>
                </button>
              </div>

              {/* Chapter Fast Switcher */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  disabled={currentChapterIndex === 0}
                  onClick={() => {
                    soundManager.playTap();
                    setCurrentChapterIndex(currentChapterIndex - 1);
                  }}
                  className={`p-1.5 rounded-lg border transition ${
                    currentChapterIndex === 0
                      ? 'opacity-30 cursor-not-allowed border-white/5'
                      : 'hover:bg-white/10 border-white/10 text-white cursor-pointer'
                  }`}
                  title="الفصل السابق"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="text-[11px] text-gray-300 px-1 font-mono">
                  {currentChapterIndex + 1} / {activeNovel.totalChapters}
                </span>
                <button
                  disabled={currentChapterIndex === activeNovel.totalChapters - 1}
                  onClick={() => {
                    soundManager.playTap();
                    setCurrentChapterIndex(currentChapterIndex + 1);
                  }}
                  className={`p-1.5 rounded-lg border transition ${
                    currentChapterIndex === activeNovel.totalChapters - 1
                      ? 'opacity-30 cursor-not-allowed border-white/5'
                      : 'hover:bg-white/10 border-white/10 text-white cursor-pointer'
                  }`}
                  title="الفصل التالي"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ================= TAB 1: NARRATIVE CHAPTER VIEW ================= */}
            {readerTab === 'narrative' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 custom-scrollbar max-w-4xl mx-auto w-full">
                {/* Chapter Title & Header */}
                <div className="space-y-1.5 pb-3 border-b border-white/10">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className={currentThemeStyle.accent}>
                      {activeNovel.titleAr} · الفصل {currentChapter.chapterNumber}
                    </span>
                    <span>⏱️ قراءة {currentChapter.estimatedMinutes} دقيقة · {currentChapter.wordsCount} كلمة</span>
                  </div>
                  <h3 className="text-lg sm:text-2xl font-black text-white font-['Alexandria']">
                    {currentChapter.titleAr}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed italic">
                    «{currentChapter.synopsisAr}»
                  </p>
                </div>

                {/* Chapter Scene Artwork (رسومات للأحداث خيالية) */}
                <div className="rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-black/40">
                  <div
                    className="w-full h-56 sm:h-72"
                    dangerouslySetInnerHTML={{ __html: currentChapter.sceneIllustrationSvg }}
                  />
                  <div className="p-2.5 bg-black/70 text-center text-xs text-gray-300 border-t border-white/10">
                    🎨 {currentChapter.illustrationCaptionAr}
                  </div>
                </div>

                {/* Long, Gripping Novel Content */}
                <div
                  className="leading-loose space-y-4 tracking-normal"
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {currentChapter.contentAr
                    .trim()
                    .split('\n\n')
                    .map((paragraph, idx) => (
                      <p key={idx} className="text-justify indent-6">
                        {paragraph}
                      </p>
                    ))}
                </div>

                {/* Bottom Chapter Navigation Bar */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <button
                    disabled={currentChapterIndex === 0}
                    onClick={() => {
                      soundManager.playTap();
                      setCurrentChapterIndex(currentChapterIndex - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border font-bold transition flex items-center justify-center gap-1.5 ${
                      currentChapterIndex === 0
                        ? 'opacity-30 cursor-not-allowed border-white/5'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-white cursor-pointer'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span>الفصل السابق</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleBookmark(activeNovel.id, currentChapterIndex)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        isCurrentBookmarked
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-white/5 text-gray-300 hover:text-white border border-white/10'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{isCurrentBookmarked ? 'الفصل محفوظ ✓' : 'حفظ الفصل الحالي'}</span>
                    </button>
                  </div>

                  <button
                    disabled={currentChapterIndex === activeNovel.totalChapters - 1}
                    onClick={() => {
                      soundManager.playTap();
                      setCurrentChapterIndex(currentChapterIndex + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-black transition flex items-center justify-center gap-1.5 shadow-md ${
                      currentChapterIndex === activeNovel.totalChapters - 1
                        ? 'opacity-30 cursor-not-allowed'
                        : 'hover:opacity-95 cursor-pointer'
                    }`}
                  >
                    <span>الفصل التالي</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>

                {/* Embedded Novel Comments Section for Visitors */}
                <div className="pt-8 border-t border-white/15">
                  <NovelCommentsSection
                    novelId={activeNovel.id}
                    novelTitle={activeNovel.titleAr}
                  />
                </div>
              </div>
            )}

            {/* ================= TAB 2: CRIME EVIDENCE BOARD ================= */}
            {readerTab === 'evidence_board' && currentChapter.investigationClues && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar max-w-4xl mx-auto w-full">
                <div className="p-3.5 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-start gap-2.5 text-xs text-purple-200">
                  <Target className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-extrabold text-white">لوحة الأدلة والتحقيق الجنائي للمحقق:</h4>
                    <p className="leading-relaxed">
                      هنا تجد نتائج الفحص المخبري الجنائي، مطياف الكتلة، البصمات، وسجلات الاتصال المحرزة رسمياً في مسرح الجريمة لهذا الفصل.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {currentChapter.investigationClues.map((clue) => (
                    <div
                      key={clue.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          {clue.significanceLevel} 🔥
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          الحالة: {clue.status}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-white font-['Alexandria']">
                        {clue.titleAr}
                      </h4>

                      <p className="text-xs text-gray-300 leading-relaxed">
                        {clue.descriptionAr}
                      </p>

                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] space-y-1">
                        <span className="text-amber-400 font-bold block">🔬 التقرير المخبري الجنائي:</span>
                        <p className="text-gray-300 leading-relaxed font-mono">
                          {clue.forensicLabReportAr}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB 3: SUSPECTS PROFILING DOSSIER ================= */}
            {readerTab === 'suspects' && activeNovel.suspectsDossier && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar max-w-4xl mx-auto w-full">
                <div className="p-3.5 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-start gap-2.5 text-xs text-indigo-200">
                  <UserCheck className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-extrabold text-white">الملف السيكولوجي للجناة والمشتبه بهم:</h4>
                    <p className="leading-relaxed">
                      دراسة نفسية وسلوكية معمقة لكل شخصية تحيط بمسرح الجريمة، مع قياس درجة الدافع والانفعال النفسي المسجل.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  {activeNovel.suspectsDossier.map((suspect, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 shadow-md flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              suspect.status === 'المشتبه به الرئيسي'
                                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            }`}
                          >
                            {suspect.status}
                          </span>
                          <span className="text-[11px] text-gray-400">{suspect.age} سنة</span>
                        </div>

                        <h4 className="font-bold text-sm text-white font-['Alexandria']">
                          {suspect.nameAr}
                        </h4>
                        <span className="text-[11px] text-purple-300 block">
                          {suspect.roleAr}
                        </span>

                        <div className="p-2 rounded-xl bg-black/40 text-[11px] space-y-1">
                          <span className="text-gray-400 block font-bold">حجة الغياب (Alibi):</span>
                          <p className="text-gray-300 leading-relaxed">{suspect.alibiAr}</p>
                        </div>

                        <div className="p-2 rounded-xl bg-black/40 text-[11px] space-y-1">
                          <span className="text-rose-400 block font-bold">الدافع السيكولوجي:</span>
                          <p className="text-gray-300 leading-relaxed">{suspect.psychologicalMotiveAr}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-gray-400">مؤشر الدافع الجنائي:</span>
                          <span className="font-black text-rose-400 font-mono">{suspect.motiveRating}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                            style={{ width: `${suspect.motiveRating}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB 4: DETECTIVE's FIELD NOTES ================= */}
            {readerTab === 'notes' && currentChapter.detectiveNotesAr && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar max-w-4xl mx-auto w-full">
                <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
                  <FileText className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-extrabold text-white">مذكرات المحقق الميدانية:</h4>
                    <p className="leading-relaxed">
                      الاستنتاجات الاستنباطية والملاحظات الدقيقة المسجلة في دفتر المباحث الجنائية لحظة بلحظة.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {currentChapter.detectiveNotesAr.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3"
                    >
                      <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-sans">
                        {note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= TAB 5: VISITOR COMMENTS & REVIEWS ================= */}
            {readerTab === 'comments' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-7 custom-scrollbar max-w-4xl mx-auto w-full">
                <NovelCommentsSection
                  novelId={activeNovel.id}
                  novelTitle={activeNovel.titleAr}
                />
              </div>
            )}
          </div>
        )}

        {/* ================= DELETE CONFIRMATION MODAL ================= */}
        <AnimatePresence>
          {deletingNovel && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm text-right">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6 rounded-3xl bg-slate-900 border border-rose-500/40 max-w-md w-full shadow-2xl space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="text-center space-y-1.5">
                  <h3 className="font-extrabold text-white text-base">تأكيد حذف الرواية</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    هل أنت متأكد من رغبتك في حذف رواية{' '}
                    <span className="font-bold text-rose-300">«{deletingNovel.titleAr}»</span> نهائياً؟
                  </p>
                  <p className="text-[11px] text-gray-400">
                    لن تظهر هذه الرواية للزوار والقراء في المكتبة بعد الحذف.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    disabled={isDeleting}
                    onClick={() => setDeletingNovel(null)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300 text-xs font-bold transition cursor-pointer"
                  >
                    تراجع وإلغاء
                  </button>
                  <button
                    disabled={isDeleting}
                    onClick={handleConfirmDelete}
                    className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-rose-600/30 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <span>جارٍ الحذف...</span>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        <span>تأكيد الحذف نهائياً</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ================= OWNER CREATE / EDIT NOVEL MODAL ================= */}
        <AnimatePresence>
          {isAddOrEditModalOpen && (
            <AddNovelModal
              isOpen={isAddOrEditModalOpen}
              onClose={() => setIsAddOrEditModalOpen(false)}
              onNovelCreated={handleNovelSaved}
              initialNovel={novelToEdit}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
