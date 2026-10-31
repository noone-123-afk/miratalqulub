import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  BookOpen,
  Plus,
  Trash2,
  Check,
  Sparkles,
  ShieldAlert,
  Save,
  Target,
  UserCheck,
  FileText,
  Sliders,
  Edit3,
} from 'lucide-react';
import { Novel, NovelChapter, NovelGenre, CrimeClue, SuspectProfile } from '../data/novelsData';
import { saveOrUpdateNovel } from '../services/novelsService';
import { soundManager } from '../utils/sound';
import { useAuth } from '../context/AuthContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNovelCreated: (savedNovel: Novel) => void;
  initialNovel?: Novel | null;
}

// Preset vector covers for custom novels
const COVER_PRESETS: Record<NovelGenre, string> = {
  crime_mystery: `
    <svg viewBox="0 0 400 560" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cov_cm_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f051d"/>
          <stop offset="50%" stop-color="#1e1026"/>
          <stop offset="100%" stop-color="#2a0815"/>
        </linearGradient>
      </defs>
      <rect width="400" height="560" fill="url(#cov_cm_bg)"/>
      <ellipse cx="200" cy="220" rx="90" ry="90" fill="#f43f5e" opacity="0.3"/>
      <!-- Fingerprint lines -->
      <g stroke="#f43f5e" stroke-width="2.5" fill="none" opacity="0.8">
        <path d="M200,160 Q200,220 200,280"/>
        <path d="M185,175 Q175,220 188,290"/>
        <path d="M215,175 Q225,220 212,290"/>
        <path d="M170,195 Q160,230 176,305"/>
        <path d="M230,195 Q240,230 224,305"/>
      </g>
      <!-- Crime tape -->
      <g transform="rotate(-6, 200, 480)">
        <rect x="-30" y="460" width="460" height="32" fill="#fbbf24" opacity="0.9"/>
        <text x="200" y="482" font-family="monospace" font-size="12" font-weight="900" fill="#000" text-anchor="middle">
          CRIME SCENE INVESTIGATION • أدلة جنائية
        </text>
      </g>
    </svg>
  `,
  tactical_action: `
    <svg viewBox="0 0 400 560" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cov_ta_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1c0c04"/>
          <stop offset="100%" stop-color="#2d1305"/>
        </linearGradient>
      </defs>
      <rect width="400" height="560" fill="url(#cov_ta_bg)"/>
      <circle cx="200" cy="240" r="80" stroke="#f97316" stroke-width="2" fill="none" opacity="0.7"/>
      <circle cx="200" cy="240" r="30" stroke="#ef4444" stroke-width="2" fill="none" opacity="0.8"/>
      <line x1="100" y1="240" x2="300" y2="240" stroke="#f97316" stroke-width="2"/>
      <line x1="200" y1="140" x2="200" y2="340" stroke="#f97316" stroke-width="2"/>
      <polygon points="200,225 215,250 185,250" fill="#facc15"/>
      <rect x="30" y="475" width="340" height="38" rx="8" fill="#000" opacity="0.85" stroke="#f97316" stroke-width="1.5"/>
      <text x="200" y="500" font-family="sans-serif" font-size="13" font-weight="900" fill="#f97316" text-anchor="middle">
        TACTICAL MISSION • عمليات خاصة
      </text>
    </svg>
  `,
  sci_fi_future: `
    <svg viewBox="0 0 400 560" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cov_sf_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#020617"/>
          <stop offset="100%" stop-color="#082f49"/>
        </linearGradient>
      </defs>
      <rect width="400" height="560" fill="url(#cov_sf_bg)"/>
      <ellipse cx="200" cy="220" rx="110" ry="35" fill="none" stroke="#38bdf8" stroke-width="4" opacity="0.9"/>
      <circle cx="200" cy="220" r="25" fill="#38bdf8"/>
      <line x1="200" y1="40" x2="200" y2="520" stroke="#bae6fd" stroke-width="2" opacity="0.8"/>
      <rect x="30" y="475" width="340" height="38" rx="8" fill="#020617" opacity="0.85" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="200" y="500" font-family="sans-serif" font-size="13" font-weight="900" fill="#38bdf8" text-anchor="middle">
        FUTURE HORIZON • استشراف المستقبل
      </text>
    </svg>
  `,
  sci_fantasy: `
    <svg viewBox="0 0 400 560" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cov_fan_bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e1035"/>
          <stop offset="100%" stop-color="#3b0764"/>
        </linearGradient>
      </defs>
      <rect width="400" height="560" fill="url(#cov_fan_bg)"/>
      <polygon points="120,380 200,140 280,380" fill="#a855f7" opacity="0.4"/>
      <line x1="140" y1="200" x2="260" y2="200" stroke="#f0abfc" stroke-width="3"/>
      <circle cx="200" cy="140" r="10" fill="#ffffff"/>
      <rect x="30" y="475" width="340" height="38" rx="8" fill="#0f0728" opacity="0.85" stroke="#c084fc" stroke-width="1.5"/>
      <text x="200" y="500" font-family="sans-serif" font-size="13" font-weight="900" fill="#c084fc" text-anchor="middle">
        KINETIC BLADE • أكشن وخيال إبداعي
      </text>
    </svg>
  `,
};

export const AddNovelModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onNovelCreated,
  initialNovel,
}) => {
  const { isOwner } = useAuth();
  const isEditMode = Boolean(initialNovel);

  // Form State
  const [titleAr, setTitleAr] = useState('');
  const [subtitleAr, setSubtitleAr] = useState('');
  const [genre, setGenre] = useState<NovelGenre>('crime_mystery');
  const [authorPersonaAr, setAuthorPersonaAr] = useState('المحقق ساري كنعان');
  const [authorTitleAr, setAuthorTitleAr] = useState('خبير التحقيقات الجنائية والعلوم السلوكية');
  const [synopsisAr, setSynopsisAr] = useState('');
  const [forensicThemeAr, setForensicThemeAr] = useState('الأدلة الجنائية، فحص البصمات والميكرو-تعبيرات');
  const [psychologicalFocusAr, setPsychologicalFocusAr] = useState('تحليل شخصية الجاني ودوافعه السيكولوجية');

  // Chapters State
  const [chapters, setChapters] = useState<NovelChapter[]>([]);
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);

  // Active Chapter Editor fields
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterSynopsis, setChapterSynopsis] = useState('');
  const [chapterContent, setChapterContent] = useState('');

  // Clues & Suspects
  const [clues, setClues] = useState<CrimeClue[]>([]);
  const [suspects, setSuspects] = useState<SuspectProfile[]>([]);

  // Temp Clue input
  const [clueTitle, setClueTitle] = useState('');
  const [clueDesc, setClueDesc] = useState('');
  const [clueLab, setClueLab] = useState('');

  // Temp Suspect input
  const [suspectName, setSuspectName] = useState('');
  const [suspectRole, setSuspectRole] = useState('');
  const [suspectAlibi, setSuspectAlibi] = useState('');
  const [suspectMotive, setSuspectMotive] = useState('');
  const [suspectMotiveRating, setSuspectMotiveRating] = useState(85);

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Reset or Populate form when opened or when initialNovel changes
  useEffect(() => {
    if (initialNovel) {
      setTitleAr(initialNovel.titleAr || '');
      setSubtitleAr(initialNovel.subtitleAr || '');
      setGenre(initialNovel.genre || 'crime_mystery');
      setAuthorPersonaAr(initialNovel.authorPersonaAr || 'المحقق ساري كنعان');
      setAuthorTitleAr(initialNovel.authorTitleAr || 'خبير التحقيقات الجنائية والعلوم السلوكية');
      setSynopsisAr(initialNovel.synopsisAr || '');
      setForensicThemeAr(initialNovel.forensicThemeAr || '');
      setPsychologicalFocusAr(initialNovel.psychologicalFocusAr || '');

      const loadedChapters = initialNovel.chapters && initialNovel.chapters.length > 0
        ? [...initialNovel.chapters]
        : [
            {
              chapterNumber: 1,
              titleAr: 'الفصل الأول: البداية ومسرح الحادث',
              synopsisAr: 'معاينة مسرح الجريمة الأولي وبدء استجواب الخيوط المتاحة.',
              contentAr: '',
              estimatedMinutes: 5,
              wordsCount: 500,
              sceneIllustrationSvg: COVER_PRESETS[initialNovel.genre || 'crime_mystery'],
              illustrationCaptionAr: `مشهد من ${initialNovel.titleAr}`,
            },
          ];

      setChapters(loadedChapters);
      setSelectedChapterIdx(0);
      setChapterTitle(loadedChapters[0]?.titleAr || '');
      setChapterSynopsis(loadedChapters[0]?.synopsisAr || '');
      setChapterContent(loadedChapters[0]?.contentAr || '');

      const initialClues: CrimeClue[] = [];
      loadedChapters.forEach((ch) => {
        if (ch.investigationClues) {
          initialClues.push(...ch.investigationClues);
        }
      });
      setClues(initialClues);
      setSuspects(initialNovel.suspectsDossier ? [...initialNovel.suspectsDossier] : []);
    } else {
      // Create mode defaults
      setTitleAr('');
      setSubtitleAr('');
      setGenre('crime_mystery');
      setAuthorPersonaAr('المحقق ساري كنعان');
      setAuthorTitleAr('خبير التحقيقات الجنائية والعلوم السلوكية');
      setSynopsisAr('');
      setForensicThemeAr('الأدلة الجنائية، فحص البصمات والميكرو-تعبيرات');
      setPsychologicalFocusAr('تحليل شخصية الجاني ودوافعه السيكولوجية');

      const defaultChapter: NovelChapter = {
        chapterNumber: 1,
        titleAr: 'الفصل الأول: البداية ومسرح الحادث',
        synopsisAr: 'معاينة مسرح الجريمة الأولي وبدء استجواب الخيوط المتاحة.',
        contentAr: '',
        estimatedMinutes: 5,
        wordsCount: 0,
        sceneIllustrationSvg: COVER_PRESETS.crime_mystery,
        illustrationCaptionAr: 'مسرح الأحداث الأول',
      };
      setChapters([defaultChapter]);
      setSelectedChapterIdx(0);
      setChapterTitle(defaultChapter.titleAr);
      setChapterSynopsis(defaultChapter.synopsisAr);
      setChapterContent('');
      setClues([]);
      setSuspects([]);
    }
    setErrorMessage('');
  }, [initialNovel, isOpen]);

  // Sync active chapter text to chapters array when switching
  const handleSwitchChapter = (newIdx: number) => {
    // Save current fields back to array
    const updated = [...chapters];
    if (updated[selectedChapterIdx]) {
      const words = chapterContent.trim().split(/\s+/).filter(Boolean).length;
      updated[selectedChapterIdx] = {
        ...updated[selectedChapterIdx],
        titleAr: chapterTitle.trim() || `الفصل ${selectedChapterIdx + 1}`,
        synopsisAr: chapterSynopsis.trim(),
        contentAr: chapterContent,
        wordsCount: words,
        estimatedMinutes: Math.max(2, Math.round(words / 130)),
      };
      setChapters(updated);
    }

    setSelectedChapterIdx(newIdx);
    if (updated[newIdx]) {
      setChapterTitle(updated[newIdx].titleAr);
      setChapterSynopsis(updated[newIdx].synopsisAr);
      setChapterContent(updated[newIdx].contentAr);
    }
  };

  const handleAddNewChapter = () => {
    soundManager.playTap();
    // First flush current
    const updated = [...chapters];
    if (updated[selectedChapterIdx]) {
      const words = chapterContent.trim().split(/\s+/).filter(Boolean).length;
      updated[selectedChapterIdx] = {
        ...updated[selectedChapterIdx],
        titleAr: chapterTitle.trim() || `الفصل ${selectedChapterIdx + 1}`,
        synopsisAr: chapterSynopsis.trim(),
        contentAr: chapterContent,
        wordsCount: words,
        estimatedMinutes: Math.max(2, Math.round(words / 130)),
      };
    }

    const nextNum = updated.length + 1;
    const newChapter: NovelChapter = {
      chapterNumber: nextNum,
      titleAr: `الفصل ${nextNum}: تطور الأحداث والمواجهة`,
      synopsisAr: 'خيوط جديدة تتكشف في مسار القضية والتحقيق السيكولوجي.',
      contentAr: '',
      estimatedMinutes: 5,
      wordsCount: 0,
      sceneIllustrationSvg: COVER_PRESETS[genre],
      illustrationCaptionAr: `مشهد من الفصل ${nextNum}`,
    };

    const nextList = [...updated, newChapter];
    setChapters(nextList);
    setSelectedChapterIdx(nextList.length - 1);
    setChapterTitle(newChapter.titleAr);
    setChapterSynopsis(newChapter.synopsisAr);
    setChapterContent('');
  };

  const handleRemoveChapter = (idxToRemove: number) => {
    if (chapters.length <= 1) return;
    soundManager.playTap();
    const filtered = chapters.filter((_, idx) => idx !== idxToRemove).map((ch, i) => ({
      ...ch,
      chapterNumber: i + 1,
    }));
    setChapters(filtered);
    const newIdx = Math.max(0, idxToRemove - 1);
    setSelectedChapterIdx(newIdx);
    setChapterTitle(filtered[newIdx].titleAr);
    setChapterSynopsis(filtered[newIdx].synopsisAr);
    setChapterContent(filtered[newIdx].contentAr);
  };

  const handleAddClue = () => {
    if (!clueTitle.trim() || !clueDesc.trim()) return;
    soundManager.playTap();
    const newClue: CrimeClue = {
      id: `clue_${Date.now()}`,
      titleAr: clueTitle.trim(),
      type: 'forensic',
      descriptionAr: clueDesc.trim(),
      forensicLabReportAr: clueLab.trim() || 'فحص مخبري جنائي أثبت تطابق البصمات الجزيئية ومطياف الكتلة.',
      significanceLevel: 'حاسم',
      status: 'تم فحصها وتحريزها',
    };
    setClues([...clues, newClue]);
    setClueTitle('');
    setClueDesc('');
    setClueLab('');
  };

  const handleRemoveClue = (id: string) => {
    soundManager.playTap();
    setClues(clues.filter((c) => c.id !== id));
  };

  const handleAddSuspect = () => {
    if (!suspectName.trim() || !suspectRole.trim()) return;
    soundManager.playTap();
    const newSuspect: SuspectProfile = {
      nameAr: suspectName.trim(),
      roleAr: suspectRole.trim(),
      age: 35,
      alibiAr: suspectAlibi.trim() || 'ادعى التواجد خارج موقع الحادث ساعة وقوع الجريمة.',
      psychologicalMotiveAr: suspectMotive.trim() || 'دافع مالي وانتقامي نرجسي.',
      behavioralTraitsAr: ['برود انفعالي مدروس', 'تجنب النظر المباشر عند ذكر التوقيت الجنائي'],
      motiveRating: suspectMotiveRating,
      status: suspectMotiveRating >= 80 ? 'المشتبه به الرئيسي' : 'محتجز للتحقيق',
    };
    setSuspects([...suspects, newSuspect]);
    setSuspectName('');
    setSuspectRole('');
    setSuspectAlibi('');
    setSuspectMotive('');
  };

  const handleRemoveSuspect = (idx: number) => {
    soundManager.playTap();
    setSuspects(suspects.filter((_, i) => i !== idx));
  };

  if (!isOpen) return null;

  if (!isOwner) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md text-right">
        <div className="p-6 rounded-3xl bg-slate-900 border border-red-500/30 max-w-md text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto" />
          <h3 className="font-bold text-white text-base">خاصية محصورة بمالك الموقع فقط</h3>
          <p className="text-xs text-gray-300">
            هذه اللوحة مخصصة لحساب مالك الموقع (one497303@gmail.com) لنشر وتعديل وحذف الروايات الرسمية.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    );
  }

  const handleSaveNovel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleAr.trim() || !synopsisAr.trim() || !chapterContent.trim()) {
      setErrorMessage('يرجى ملء عنوان الرواية، الملخص التشويقي، ونص الفصل الحالي على الأقل.');
      return;
    }

    setIsSaving(true);
    setErrorMessage('');
    soundManager.playTap();

    // Flush current chapter into chapters array
    const updatedChapters = [...chapters];
    const currentWords = chapterContent.trim().split(/\s+/).filter(Boolean).length;
    updatedChapters[selectedChapterIdx] = {
      ...(updatedChapters[selectedChapterIdx] || {}),
      chapterNumber: selectedChapterIdx + 1,
      titleAr: chapterTitle.trim() || `الفصل ${selectedChapterIdx + 1}`,
      synopsisAr: chapterSynopsis.trim() || 'أحداث مشوقة ومكثفة.',
      contentAr: chapterContent.trim(),
      wordsCount: currentWords,
      estimatedMinutes: Math.max(2, Math.round(currentWords / 130)),
      sceneIllustrationSvg:
        updatedChapters[selectedChapterIdx]?.sceneIllustrationSvg || COVER_PRESETS[genre],
      illustrationCaptionAr: `مشهد من ${titleAr.trim()}`,
      detectiveNotesAr: updatedChapters[selectedChapterIdx]?.detectiveNotesAr || [
        'معاينة أولية تفيد بوجود تناقض واضح بين إفادة المشتبه به والأدلة المادية المحرزة.',
        'تم تحريز كافة العينات وإحالتها للمختبر الجنائي المركزي لمطابقة البصمات.',
      ],
      investigationClues: clues.length > 0 ? clues : undefined,
    };

    const totalWords = updatedChapters.reduce((acc, ch) => acc + (ch.wordsCount || 0), 0);
    const totalMinutes = Math.max(3, Math.round(totalWords / 130));

    const genreLabels: Record<NovelGenre, { label: string; color: string }> = {
      crime_mystery: { label: 'غموض وجرائم جنائية', color: '#ef4444' },
      tactical_action: { label: 'أكشن ومطاردات تكتيكية', color: '#f97316' },
      sci_fi_future: { label: 'خيال علمي وتطوير ومستقبل', color: '#06b6d4' },
      sci_fantasy: { label: 'أكشن وخيال إبداعي', color: '#8b5cf6' },
    };

    const novelId = initialNovel ? initialNovel.id : `nov_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    const savedNovel: Novel = {
      id: novelId,
      titleAr: titleAr.trim(),
      subtitleAr: subtitleAr.trim() || (isEditMode ? initialNovel?.subtitleAr || '' : 'رواية تشويقية حصرية من مالك المنصة'),
      genre,
      genreLabelAr: genreLabels[genre].label,
      genreBadgeColor: genreLabels[genre].color,
      coverIllustrationSvg: initialNovel?.coverIllustrationSvg || COVER_PRESETS[genre],
      rating: initialNovel ? initialNovel.rating : 5.0,
      readsCount: initialNovel ? initialNovel.readsCount : 1,
      totalChapters: updatedChapters.length,
      totalWords: totalWords || currentWords,
      estimatedReadingTime: `${totalMinutes} دقيقة`,
      authorPersonaAr: authorPersonaAr.trim() || 'المحقق ساري كنعان',
      authorTitleAr: authorTitleAr.trim() || 'خبير التحقيقات الجنائية المعتمد',
      synopsisAr: synopsisAr.trim(),
      forensicThemeAr: forensicThemeAr.trim(),
      psychologicalFocusAr: psychologicalFocusAr.trim(),
      suspectsDossier: suspects.length > 0 ? suspects : undefined,
      chapters: updatedChapters,
    };

    try {
      await saveOrUpdateNovel(savedNovel);
      soundManager.playRoundPass();
      onNovelCreated(savedNovel);
      onClose();
    } catch (err) {
      console.error('Error saving novel', err);
      setErrorMessage('حدث خطأ أثناء حفظ الرواية، يرجى المحاولة ثانية.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto text-right">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="glass-panel w-full max-w-4xl rounded-3xl p-5 sm:p-7 border border-amber-500/40 shadow-2xl relative my-auto max-h-[92vh] flex flex-col overflow-hidden bg-slate-950"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-white shadow-lg">
              {isEditMode ? <Edit3 className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  لوحة تحكم مالك الموقع 👑
                </span>
                {isEditMode && (
                  <span className="text-[10px] font-bold text-rose-400">
                    وضع التعديل المباشر
                  </span>
                )}
              </div>
              <h3 className="font-extrabold text-white text-base sm:text-lg font-['Alexandria']">
                {isEditMode ? `تعديل الرواية: ${titleAr || initialNovel?.titleAr}` : 'كتابة ونشر رواية جديدة'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSaveNovel} className="flex-1 overflow-y-auto py-4 space-y-6 custom-scrollbar pr-1">
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Main Novel Details */}
          <div className="space-y-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="text-xs font-extrabold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>1. بيانات وهوية الرواية</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  عنوان الرواية <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={titleAr}
                  onChange={(e) => setTitleAr(e.target.value)}
                  placeholder="مثال: لغز خريطة الميكرون، بصمة الظل..."
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  العنوان الفرعي / الشعار التشويقي
                </label>
                <input
                  type="text"
                  value={subtitleAr}
                  onChange={(e) => setSubtitleAr(e.target.value)}
                  placeholder="مثال: تحقيق جنائي مستحيل خلف الجدران الذكية"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Genre Picker */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5">
                تصنيف الرواية (النوع الأدبي)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { key: 'crime_mystery', label: 'جرائم وغموض', icon: '🔍' },
                  { key: 'tactical_action', label: 'أكشن ومطاردات', icon: '🎯' },
                  { key: 'sci_fi_future', label: 'خيال علمي ومستقبل', icon: '🚀' },
                  { key: 'sci_fantasy', label: 'أكشن وخيال إبداعي', icon: '⚡' },
                ].map((g) => (
                  <button
                    type="button"
                    key={g.key}
                    onClick={() => setGenre(g.key as NovelGenre)}
                    className={`p-2.5 rounded-xl border text-center transition cursor-pointer flex items-center justify-center gap-1.5 font-bold ${
                      genre === g.key
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md'
                        : 'bg-black/30 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span>{g.icon}</span>
                    <span>{g.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Author Persona & Focus */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  شخصية المحقق / الكاتب
                </label>
                <input
                  type="text"
                  value={authorPersonaAr}
                  onChange={(e) => setAuthorPersonaAr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  صفة المحقق العلمية
                </label>
                <input
                  type="text"
                  value={authorTitleAr}
                  onChange={(e) => setAuthorTitleAr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">
                ملخص الرواية التشويقي (Synopsis) <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={synopsisAr}
                onChange={(e) => setSynopsisAr(e.target.value)}
                placeholder="اكتب ملخصاً مشوقاً يصف عقدة الجريمة، التحدي، ومسرح الأحداث الغامض..."
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  المنهج الجنائي والأدلة
                </label>
                <input
                  type="text"
                  value={forensicThemeAr}
                  onChange={(e) => setForensicThemeAr(e.target.value)}
                  placeholder="مثال: البصمات، الفحص البيولوجي، السموم النادرة"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  التركيز السيكولوجي للجناة
                </label>
                <input
                  type="text"
                  value={psychologicalFocusAr}
                  onChange={(e) => setPsychologicalFocusAr(e.target.value)}
                  placeholder="مثال: تحليل نرجسية الجاني ومحاكاة الجريمة المثالية"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Chapters Editor (Multiple Chapters Support) */}
          <div className="space-y-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-rose-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>2. فصول الرواية ({chapters.length} فصول)</span>
              </h4>

              <button
                type="button"
                onClick={handleAddNewChapter}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>إضافة فصل جديد</span>
              </button>
            </div>

            {/* Chapters Navigation Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {chapters.map((ch, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleSwitchChapter(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 shrink-0 ${
                      selectedChapterIdx === idx
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-black/40 text-gray-400 hover:text-white border border-white/10'
                    }`}
                  >
                    <span>الفصل {idx + 1}</span>
                  </button>
                  {chapters.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveChapter(idx)}
                      className="p-1 text-gray-500 hover:text-rose-400 transition cursor-pointer"
                      title="حذف هذا الفصل"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  عنوان الفصل {selectedChapterIdx + 1}
                </label>
                <input
                  type="text"
                  required
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                  placeholder="مثال: البداية ومسرح الحادث الغامض"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">
                  ملخص الفصل
                </label>
                <input
                  type="text"
                  value={chapterSynopsis}
                  onChange={(e) => setChapterSynopsis(e.target.value)}
                  placeholder="وصف مختصر لمجريات هذا الفصل"
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-gray-300">
                  نص الفصل وسرد الأحداث <span className="text-rose-400">*</span>
                </label>
                <span className="text-[11px] text-gray-400 font-mono">
                  {chapterContent.trim().split(/\s+/).filter(Boolean).length} كلمة
                </span>
              </div>
              <textarea
                required
                rows={9}
                value={chapterContent}
                onChange={(e) => setChapterContent(e.target.value)}
                placeholder="اكتب تفاصيل المشهد، حوارات التحقيق، استنتاجات المحقق، وصف مسرح الجريمة، والتوتر النفسي..."
                className="w-full px-3 py-2.5 rounded-xl bg-black/50 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-400 leading-loose font-sans"
              />
            </div>
          </div>

          {/* Section 3: Crime Clues & Evidence Board */}
          <div className="space-y-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="text-xs font-extrabold text-purple-400 flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              <span>3. لوحة الأدلة الجنائية والمختبر ({clues.length} أدلة)</span>
            </h4>

            {clues.length > 0 && (
              <div className="space-y-2">
                {clues.map((clue) => (
                  <div
                    key={clue.id}
                    className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span className="text-purple-300">🔍 {clue.titleAr}</span>
                        <span className="text-[10px] px-2 py-0.2 rounded-full bg-rose-500/20 text-rose-300">
                          {clue.significanceLevel}
                        </span>
                      </div>
                      <p className="text-gray-300 text-[11px] mt-1">{clue.descriptionAr}</p>
                      <p className="text-amber-400 text-[10px] font-mono mt-1">
                        🔬 {clue.forensicLabReportAr}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveClue(clue.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-400 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-2.5">
              <span className="text-[11px] font-bold text-gray-300 block">
                + إضافة دليل جنائي جديد:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={clueTitle}
                  onChange={(e) => setClueTitle(e.target.value)}
                  placeholder="اسم الدليل (مثال: ألياف كربونية دقيقة)"
                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500"
                />
                <input
                  type="text"
                  value={clueDesc}
                  onChange={(e) => setClueDesc(e.target.value)}
                  placeholder="وصف العثور عليه في مسرح الجريمة"
                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500"
                />
              </div>
              <input
                type="text"
                value={clueLab}
                onChange={(e) => setClueLab(e.target.value)}
                placeholder="تقرير المختبر الجنائي (مثال: مطياف الكتلة يكشف مادة تيتانيوم مصهورة)"
                className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500"
              />
              <button
                type="button"
                onClick={handleAddClue}
                disabled={!clueTitle.trim() || !clueDesc.trim()}
                className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white text-xs font-bold transition cursor-pointer"
              >
                حفظ الدليل الجنائي
              </button>
            </div>
          </div>

          {/* Section 4: Suspects & Psychological Dossier */}
          <div className="space-y-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="text-xs font-extrabold text-indigo-400 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4" />
              <span>4. الملف السيكولوجي للجناة والمشتبه بهم ({suspects.length} أشخاص)</span>
            </h4>

            {suspects.length > 0 && (
              <div className="space-y-2">
                {suspects.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span className="text-indigo-300">👤 {s.nameAr}</span>
                        <span className="text-[10px] text-gray-400">({s.roleAr})</span>
                        <span className="text-[10px] text-rose-300 px-2 py-0.2 rounded-full bg-rose-500/20">
                          دافع {s.motiveRating}%
                        </span>
                      </div>
                      <p className="text-gray-300 text-[11px] mt-1">الغياب: {s.alibiAr}</p>
                      <p className="text-rose-300 text-[11px] mt-0.5">الدافع: {s.psychologicalMotiveAr}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveSuspect(idx)}
                      className="p-1.5 text-gray-400 hover:text-rose-400 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-2.5">
              <span className="text-[11px] font-bold text-gray-300 block">
                + إضافة مشتبه به للملف السلوكي:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={suspectName}
                  onChange={(e) => setSuspectName(e.target.value)}
                  placeholder="اسم المشتبه به"
                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500"
                />
                <input
                  type="text"
                  value={suspectRole}
                  onChange={(e) => setSuspectRole(e.target.value)}
                  placeholder="صفته أو عمله"
                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={suspectAlibi}
                  onChange={(e) => setSuspectAlibi(e.target.value)}
                  placeholder="حجة الغياب (Alibi)"
                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500"
                />
                <input
                  type="text"
                  value={suspectMotive}
                  onChange={(e) => setSuspectMotive(e.target.value)}
                  placeholder="الدافع السيكولوجي للجريمة"
                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-[11px] text-gray-300">مؤشر الدافع الجنائي ({suspectMotiveRating}%):</label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={suspectMotiveRating}
                  onChange={(e) => setSuspectMotiveRating(Number(e.target.value))}
                  className="flex-1 accent-rose-500 cursor-pointer"
                />
              </div>
              <button
                type="button"
                onClick={handleAddSuspect}
                disabled={!suspectName.trim() || !suspectRole.trim()}
                className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold transition cursor-pointer"
              >
                إضافة المشتبه به
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-bold transition cursor-pointer"
            >
              إلغاء
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-600 to-purple-600 hover:opacity-95 text-white font-extrabold text-xs transition shadow-lg shadow-rose-600/25 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>جارٍ الحفظ والمزامنة...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{isEditMode ? 'حفظ التعديلات والتحديث الفوري' : 'نشر الرواية الآن في المكتبة'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
