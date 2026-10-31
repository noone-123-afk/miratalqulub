import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import {
  BookOpen,
  Sparkles,
  Heart,
  Download,
  Copy,
  Check,
  Coffee,
  Plane,
  Library,
  Award,
  Clock,
  MapPin,
  Quote,
  Feather,
  FileText,
  Share2,
  RefreshCw,
  Printer,
} from 'lucide-react';
import {
  UserProfile,
  PartnerAnalysisResult,
  EncounterSettingKey,
  FictionalEncounterStory,
} from '../types';
import { ENCOUNTER_SETTINGS, generateFictionalStory } from '../utils/fictionalEncounter';
import { soundManager } from '../utils/sound';

interface Props {
  profile: UserProfile;
  result?: PartnerAnalysisResult | null;
}

export const FictionalEncounterSection: React.FC<Props> = ({ profile, result }) => {
  const [selectedSettingId, setSelectedSettingId] = useState<EncounterSettingKey>('cafe');
  const [isExportingPdf, setIsExportingPdf] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  const storyPrintRef = useRef<HTMLDivElement>(null);

  const partnerName =
    result?.proposedPartnerName ||
    (profile.partnerGender === 'female' ? 'نـورة' : 'فيـصل');
  const userName = profile.userName || (profile.userGender === 'male' ? 'شاب' : 'فتاة');

  const currentStory: FictionalEncounterStory = generateFictionalStory(
    selectedSettingId,
    profile,
    result
  );

  const handleSettingSelect = (id: EncounterSettingKey) => {
    soundManager.playTab();
    setSelectedSettingId(id);
  };

  // Generate & Download PDF using html-to-image + jsPDF for pristine Arabic typography rendering
  const handleExportPDF = async () => {
    if (!storyPrintRef.current) return;
    soundManager.playTap();
    setIsExportingPdf(true);

    try {
      // 1. Convert the styled document element to a high-resolution PNG
      const dataUrl = await toPng(storyPrintRef.current, {
        quality: 0.98,
        pixelRatio: 2.2,
        cacheBust: true,
      });

      // 2. Initialize jsPDF in A4 portrait
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Create an image object to calculate proportional height
      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const imgWidth = pdfWidth;
      const imgHeight = (img.height * pdfWidth) / img.width;

      if (imgHeight <= pdfHeight) {
        // Fits on single page
        pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);
      } else {
        // Multi-page handling
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }
      }

      // 3. Save the PDF file
      pdf.save(`qissat-al-liqaa-${partnerName}.pdf`);
      soundManager.playRoundPass();
    } catch (err) {
      console.error('PDF export error:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Copy plain text story
  const handleCopyStory = () => {
    soundManager.playTap();
    const fullStoryText = `📖 ${currentStory.titleAr}\n${currentStory.subtitleAr}\n\n📍 المكان والزمان: ${currentStory.timeAndPlaceAr}\n\n${currentStory.openingQuoteAr}\n\n${currentStory.chapters
      .map(
        (c) =>
          `【${c.numberAr}: ${c.chapterTitleAr}】\n${c.contentAr}\n${
            c.dialogueAr ? `\n«${c.dialogueAr.text}» - ${c.dialogueAr.speaker}\n` : ''
          }`
      )
      .join('\n\n')}\n\nخاتمة الرواية:\n${currentStory.concludingReflectionAr}\n\n🔮 مِرآة القلوب AI - دراسة توافق شريك الحياة`;

    navigator.clipboard.writeText(fullStoryText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 border border-amber-500/30 relative overflow-hidden bg-gradient-to-b from-amber-950/30 via-slate-900/90 to-slate-950 shadow-2xl" dir="rtl">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-80 h-32 bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 relative z-10 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-rose-600 to-purple-600 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/25 shrink-0 text-white">
            <Feather className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-white font-['Alexandria']">
                قصة لقاء خيالية أدبية
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] text-amber-300 font-extrabold flex items-center gap-1">
                <span>Fictional Encounter</span>
                <span>✨</span>
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-0.5">
              سرد أدبي شاعري مستوحى من كيمياء شخصياتكما وأصولكما الثقافية، يصف أول صدفة جمعتكما معاً
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
          {/* Font Size Toggle */}
          <button
            onClick={() => {
              soundManager.playTap();
              setFontSize(fontSize === 'normal' ? 'large' : 'normal');
            }}
            className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 transition cursor-pointer"
            title="تبديل حجم الخط للقراءة"
          >
            {fontSize === 'normal' ? 'خط أوسع 🔍' : 'خط عادي 🔎'}
          </button>

          {/* Copy Text Button */}
          <button
            onClick={handleCopyStory}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-200 transition cursor-pointer flex items-center gap-1.5"
            title="نسخ نص القصة بالكامل"
          >
            {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedText ? 'تم النسخ' : 'نسخ القصة'}</span>
          </button>

          {/* PDF Export Button (User Request) */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleExportPDF}
            disabled={isExportingPdf}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-500/25 disabled:opacity-50"
          >
            {isExportingPdf ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>جاري إنشاء PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>حفظ كملف PDF 📄</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Setting Chooser Tabs */}
      <div className="space-y-2 mb-6">
        <span className="text-xs text-gray-300 font-bold block px-1">
          اختر مسرح اللقاء الأول وأجواء الصدفة:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ENCOUNTER_SETTINGS.map((setting) => {
            const isSelected = setting.id === selectedSettingId;
            return (
              <button
                key={setting.id}
                type="button"
                onClick={() => handleSettingSelect(setting.id)}
                className={`p-3 rounded-2xl border text-right transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500/20 via-rose-500/15 to-purple-500/20 border-amber-400/60 shadow-lg shadow-amber-500/10'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{setting.icon}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-['Alexandria']">
                    {setting.titleAr}
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">{setting.badgeAr}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Story Book Card (Styled as Vintage Literary Parchment Document) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStory.settingId}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35 }}
          className="relative rounded-3xl border-2 border-amber-500/40 p-5 sm:p-8 bg-[#171221] shadow-2xl overflow-hidden"
        >
          {/* Printable Container Target (captured by html-to-image for PDF) */}
          <div ref={storyPrintRef} className="p-4 sm:p-6 bg-[#171221] text-white rounded-2xl">
            {/* Top Book Header Motif */}
            <div className="text-center border-b border-amber-500/30 pb-5 mb-6 space-y-2">
              <div className="inline-flex items-center justify-center gap-2 text-amber-300 text-xs font-semibold">
                <span>✦ ✦ ✦</span>
                <span className="font-['Alexandria']">رواية اللقاء الأول في مِـرآة القلوب</span>
                <span>✦ ✦ ✦</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-amber-200 font-['Alexandria'] leading-snug">
                {currentStory.titleAr}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 italic">
                {currentStory.subtitleAr}
              </p>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-2 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{currentStory.timeAndPlaceAr}</span>
                </span>
              </div>

              {/* Atmosphere Tags */}
              <div className="flex items-center justify-center gap-1.5 flex-wrap pt-2">
                {currentStory.atmosphereTags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-300 font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Opening Poetic Quote */}
            <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center italic text-xs sm:text-sm text-amber-200 leading-relaxed font-serif">
              <Quote className="w-5 h-5 mx-auto mb-1 text-amber-400/60" />
              {currentStory.openingQuoteAr}
            </div>

            {/* Chapters Narrative Flow */}
            <div className="space-y-6">
              {currentStory.chapters.map((ch, idx) => (
                <div
                  key={idx}
                  className="space-y-3 pb-5 border-b border-white/5 last:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 text-[11px] font-bold">
                      {ch.numberAr}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white font-['Alexandria']">
                      {ch.chapterTitleAr}
                    </h3>
                  </div>

                  <p
                    className={`leading-relaxed text-gray-200 text-justify ${
                      fontSize === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                    }`}
                  >
                    {ch.contentAr}
                  </p>

                  {/* Character Dialogue Box */}
                  {ch.dialogueAr && (
                    <div className="p-3.5 rounded-xl bg-purple-950/40 border-r-4 border-amber-400 bg-white/5 my-2">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300 mb-1">
                        <span>🎙️ قال {ch.dialogueAr.speaker}:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-100 italic leading-relaxed">
                        {ch.dialogueAr.text}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Concluding Reflection */}
            <div className="mt-6 pt-5 border-t border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-rose-300 text-xs font-bold">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>حكمة اللقاء وعمق العهد:</span>
              </div>
              <p
                className={`leading-relaxed text-gray-200 italic bg-gradient-to-r from-amber-500/10 to-rose-500/10 p-4 rounded-2xl border border-amber-500/20 ${
                  fontSize === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                }`}
              >
                {currentStory.concludingReflectionAr}
              </p>
            </div>

            {/* Document Signature Footer */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400">
              <div className="flex items-center gap-2">
                <span>🔮 مِـرآة القـلوب AI</span>
                <span>•</span>
                <span>وثيقة قصة اللقاء الخيالية</span>
              </div>
              <div>
                <span>تاريخ التوثيق: {new Date().toLocaleDateString('ar-SA')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* PDF Export Banner */}
      <div className="mt-4 p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-300">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-amber-300" />
          <span>
            يمكنك حفظ هذه الرواية كاملة كملف PDF أنيق والاحتفاظ بها كذكرى رومانسية مميزة.
          </span>
        </div>

        <button
          onClick={handleExportPDF}
          disabled={isExportingPdf}
          className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>تحميل نسخة PDF جاهزة للطباعة</span>
        </button>
      </div>
    </div>
  );
};
