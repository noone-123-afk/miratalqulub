import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Copy,
  Check,
  Send,
  MessageCircle,
  QrCode,
  Sparkles,
  X,
  Scale,
  Brain,
  CheckCircle2,
  FileDown,
  RotateCcw,
} from 'lucide-react';
import { UserProfile, PartnerAnalysisResult } from '../types';
import { QUIZ_QUESTIONS } from '../data/questions';
import {
  calculateDyadicCoupleCompatibility,
  DyadicCoupleReport,
} from '../utils/realScoringEngine';
import { exportPsychometricReportAsPDF } from '../utils/pdfReportGenerator';
import { soundManager } from '../utils/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile?: UserProfile | null;
  result?: PartnerAnalysisResult | null;
}

// 12 core scientific dyadic items (2 from each of the 6 empirical marital theories) for direct two-partner comparison
const DYADIC_CORE_QUESTION_IDS = [1, 2, 3, 4, 6, 7, 8, 10, 12, 15, 16, 20];

export const CoupleInviteModal: React.FC<Props> = ({
  isOpen,
  onClose,
  profile,
  result,
}) => {
  const [activeMode, setActiveMode] = useState<'dyadic_lab' | 'invite_link'>('dyadic_lab');
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  // Dyadic Scientific Assessment State
  const [partnerAName, setPartnerAName] = useState(profile?.userName || 'الطرف الأول');
  const [partnerBName, setPartnerBName] = useState(result?.proposedPartnerName || 'الطرف الثاني');
  const [activePartnerTurn, setActivePartnerTurn] = useState<'A' | 'B'>('A');
  const [questionIdx, setQuestionIdx] = useState(0);
  const [partnerAAnswers, setPartnerAAnswers] = useState<Record<number, string>>({});
  const [partnerBAnswers, setPartnerBAnswers] = useState<Record<number, string>>({});
  const [dyadicReport, setDyadicReport] = useState<DyadicCoupleReport | null>(null);

  if (!isOpen) return null;

  const userName = profile?.userName || 'شريكك';
  const userGender = profile?.userGender || 'male';
  const country = profile?.country || 'المملكة العربية السعودية';

  const dyadicQuestions = QUIZ_QUESTIONS.filter((q) => DYADIC_CORE_QUESTION_IDS.includes(q.id));
  const currentQ = dyadicQuestions[questionIdx] || dyadicQuestions[0];

  // Generate unique session ID
  const sessionId = `cp_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://miratalqulub.com';
  const inviteParams = new URLSearchParams({
    coupleInvite: sessionId,
    inviter: userName,
    inviterGender: userGender,
    inviterCountry: country,
    inviterScore: String(result?.compatibilityScore || 92),
  });
  const inviteLink = `${baseUrl}/?${inviteParams.toString()}`;

  const shareText = `أرسل لك ${userName} دعوة لإجراء تقييم التوافق الزواجي العلمي المزدوج على منصة «مِرآة القلوب»:\n${inviteLink}`;

  const handleCopy = () => {
    soundManager.playTap();
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSelectDyadicOption = (optionId: string) => {
    soundManager.playTap();
    if (activePartnerTurn === 'A') {
      const nextA = { ...partnerAAnswers, [currentQ.id]: optionId };
      setPartnerAAnswers(nextA);
      if (questionIdx + 1 < dyadicQuestions.length) {
        setQuestionIdx(questionIdx + 1);
      } else {
        // Switch to Partner B
        setActivePartnerTurn('B');
        setQuestionIdx(0);
      }
    } else {
      const nextB = { ...partnerBAnswers, [currentQ.id]: optionId };
      setPartnerBAnswers(nextB);
      if (questionIdx + 1 < dyadicQuestions.length) {
        setQuestionIdx(questionIdx + 1);
      } else {
        // Compute scientific dyadic compatibility report
        soundManager.playResultReveal();
        const computed = calculateDyadicCoupleCompatibility(
          { userName: partnerAName, country },
          partnerAAnswers,
          { userName: partnerBName, country },
          nextB
        );
        setDyadicReport(computed);
      }
    }
  };

  const handleResetDyadic = () => {
    soundManager.playTap();
    setPartnerAAnswers({});
    setPartnerBAnswers({});
    setActivePartnerTurn('A');
    setQuestionIdx(0);
    setDyadicReport(null);
  };

  const handleExportDyadicPdf = () => {
    if (!dyadicReport) return;
    soundManager.playTap();
    exportPsychometricReportAsPDF({
      reportTitle: `تقرير التوافق العلمي المزدوج بين الشريكين (Dyadic Assessment)`,
      subTitle: `${dyadicReport.partnerAName} ✕ ${dyadicReport.partnerBName} • ${dyadicReport.stabilityClassificationAr}`,
      scientificBasis:
        'Kenny Dyadic Data Analysis (2006), Gottman Method (1999), Bowlby Attachment (ECR-R), Sternberg (1986), Bowen Family Systems, Klontz Financial Psychology',
      completedAt: new Date().toLocaleDateString('ar-JO'),
      overallScoreLabel: 'معامل التناغم الثنائي الموزون',
      overallScoreValue: `${dyadicReport.overallHarmonyScore}%`,
      cognitiveFingerprintTitle: `مؤشر التشابه القيمي (${dyadicReport.similarityIndex}%) • مؤشر التكامل الوظيفي (${dyadicReport.complementarityIndex}%)`,
      executiveSummary: dyadicReport.scientificRecommendationAr,
      metrics: dyadicReport.dimensions.map((d) => ({
        label: d.titleAr,
        scorePercent: d.harmonyPercentage,
        rawText: `${dyadicReport.partnerAName}: ${d.partnerAScore}% | ${dyadicReport.partnerBName}: ${d.partnerBScore}%`,
        levelLabel: d.synergyTypeAr,
        color: '#059669',
      })),
      sections: dyadicReport.dimensions.map((d) => ({
        title: `${d.titleAr} (${d.scientistAr})`,
        badge: `تناغم ${d.harmonyPercentage}% • ${d.synergyTypeAr}`,
        content: d.scientificInsightAr,
        items: [
          `درجة ${dyadicReport.partnerAName}: ${d.partnerAScore}%`,
          `درجة ${dyadicReport.partnerBName}: ${d.partnerBScore}%`,
        ],
      })),
      careersOrRecommendations: [
        ...dyadicReport.strengthsAr,
        ...dyadicReport.growthAreasAr,
      ],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto" dir="rtl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="glass-panel w-full max-w-2xl rounded-3xl p-5 sm:p-6 border border-white/20 shadow-2xl relative my-auto text-right max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playTap();
            onClose();
          }}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-600 p-0.5 shadow-lg shadow-emerald-500/20 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#120d24] rounded-[14px] flex items-center justify-center">
              <Scale className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-base sm:text-lg text-white font-['Alexandria']">
                مختبر التقييم العلمي المزدوج للتوافق بين الشريكين
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Dyadic Psychometrics 🔬
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-0.5">
              قياس التوافق الفعلي بين طرفين استناداً إلى 6 نماذج علمية محكمة (غوتمان، بولبي، ستيرنبرغ، بوين، شوارتز، كلونتز)
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-black/40 border border-white/10 mb-5">
          <button
            type="button"
            onClick={() => {
              soundManager.playTap();
              setActiveMode('dyadic_lab');
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeMode === 'dyadic_lab'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>إجراء التقييم العلمي للطرفين الآن</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playTap();
              setActiveMode('invite_link');
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
              activeMode === 'invite_link'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>إرسال رابط دعوة للشريك عن بُعد</span>
          </button>
        </div>

        {activeMode === 'dyadic_lab' ? (
          <div className="space-y-4">
            {!dyadicReport ? (
              <>
                {/* Partner Names Input */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80">
                  <div>
                    <label className="block text-[11px] font-bold text-emerald-300 mb-1">
                      اسم الطرف الأول:
                    </label>
                    <input
                      type="text"
                      value={partnerAName}
                      onChange={(e) => setPartnerAName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-cyan-300 mb-1">
                      اسم الطرف الثاني:
                    </label>
                    <input
                      type="text"
                      value={partnerBName}
                      onChange={(e) => setPartnerBName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Active Turn Indicator */}
                <div className="p-3 rounded-2xl bg-gradient-to-l from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-slate-950 font-black">
                      دور الإجابة الآن: {activePartnerTurn === 'A' ? partnerAName : partnerBName}
                    </span>
                    <span className="text-slate-300">
                      السؤال {questionIdx + 1} من {dyadicQuestions.length}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-300 font-mono">
                    {currentQ.scientificDimension}
                  </span>
                </div>

                {/* Question Card */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="text-[11px] text-amber-300 font-semibold">
                    {currentQ.subtitle}
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-white font-['Alexandria'] leading-snug">
                    {currentQ.title}
                  </h4>

                  <div className="space-y-2 pt-1">
                    {currentQ.options.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectDyadicOption(opt.id)}
                        className="w-full p-3 rounded-xl bg-slate-900/90 hover:bg-emerald-950/50 border border-slate-700 hover:border-emerald-500/50 text-right transition cursor-pointer space-y-1"
                      >
                        <div className="text-xs font-bold text-white">{opt.text}</div>
                        <div className="text-[11px] text-slate-400">{opt.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Scientific Dyadic Comparison Report */
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-xs text-emerald-300 font-bold">
                      نتيجة القياس السيكومتري المزدوج ({dyadicReport.partnerAName} ✕ {dyadicReport.partnerBName})
                    </div>
                    <h4 className="text-base font-black text-white font-['Alexandria']">
                      {dyadicReport.stabilityClassificationAr}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-300 pt-1">
                      <span>مؤشر التشابه القيمي: <strong className="text-emerald-400">{dyadicReport.similarityIndex}%</strong></span>
                      <span>•</span>
                      <span>مؤشر التكامل الوظيفي: <strong className="text-cyan-400">{dyadicReport.complementarityIndex}%</strong></span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/50 border border-emerald-400/40 text-center shrink-0 min-w-[120px]">
                    <div className="text-[10px] text-slate-300">التناغم الثنائي</div>
                    <div className="text-3xl font-black text-emerald-400 font-mono">
                      {dyadicReport.overallHarmonyScore}%
                    </div>
                  </div>
                </div>

                {/* 6 Scientific Subscales Dyadic Breakdown */}
                <div className="space-y-2.5">
                  {dyadicReport.dimensions.map((dim) => (
                    <div
                      key={dim.id}
                      className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-white">{dim.titleAr}</div>
                          <div className="text-[10px] text-slate-400">{dim.scientistAr}</div>
                        </div>
                        <div className="text-left shrink-0">
                          <span className="text-sm font-black text-emerald-400 font-mono">
                            {dim.harmonyPercentage}%
                          </span>
                          <span className="block text-[10px] text-cyan-300">{dim.synergyTypeAr}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 bg-black/30 p-2 rounded-xl">
                        <div>{dyadicReport.partnerAName}: <strong className="text-white">{dim.partnerAScore}%</strong></div>
                        <div>{dyadicReport.partnerBName}: <strong className="text-white">{dim.partnerBScore}%</strong></div>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">{dim.scientificInsightAr}</p>
                    </div>
                  ))}
                </div>

                {/* Recommendation & Actions */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-xs text-slate-200 leading-relaxed">
                  <strong className="text-emerald-400 block mb-1">التوصية الإكلينيكية والتربوية للشريكين:</strong>
                  {dyadicReport.scientificRecommendationAr}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleExportDyadicPdf}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-md"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>تحميل التقرير العلمي المزدوج (PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetDyadic}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إعادة القياس المزدوج</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Remote Invite Link Mode */
          <div>
            <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 mb-4 text-xs space-y-2">
              <div className="font-bold text-gray-200 flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>كيف تعمل دعوة التقييم العلمي عن بُعد؟</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-gray-300">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-rose-400">1. مشاركة الرابط</span>
                  <p>ترسل الرابط المخصص لشريكك عبر واتساب أو تيليجرام.</p>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-purple-400">2. الإجابة المستقلة</span>
                  <p>يجيب الشريك على الـ 25 سؤالاً علمياً في التوافق الزواجي.</p>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="font-bold text-emerald-400">3. المقارنة العلمية</span>
                  <p>يتم احتساب معامل التناغم القيمي والتكامل السيكومتري بينكما.</p>
                </div>
              </div>
            </div>

            <div className="mb-4 space-y-2">
              <label className="text-xs font-bold text-gray-300 block">
                رابط دعوتك الشخصي:
              </label>
              <div className="flex items-center gap-2 p-2 rounded-2xl bg-black/40 border border-white/15">
                <input
                  type="text"
                  readOnly
                  value={inviteLink}
                  className="bg-transparent text-xs text-rose-200 font-mono flex-1 outline-none px-2 select-all overflow-ellipsis"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-sm ${
                    copied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-rose-500 hover:bg-rose-600 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>تم النسخ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ الرابط</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mb-4">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playTap()}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>إرسال عبر WhatsApp</span>
              </a>

              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playTap()}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-sky-600/30 hover:bg-sky-600/40 border border-sky-500/40 text-sky-300 font-bold text-xs transition cursor-pointer"
              >
                <Send className="w-4 h-4 text-sky-400" />
                <span>إرسال عبر Telegram</span>
              </a>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  soundManager.playTap();
                  setShowQr(!showQr);
                }}
                className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition cursor-pointer font-medium"
              >
                <QrCode className="w-4 h-4 text-purple-400" />
                <span>{showQr ? 'إخفاء رمز QR' : 'إظهار رمز QR للمسح من الهاتف'}</span>
              </button>

              <span className="text-[11px] text-gray-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>جلسة قياس مشفرة</span>
              </span>
            </div>

            <AnimatePresence>
              {showQr && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 p-4 rounded-2xl bg-white flex flex-col items-center justify-center"
                >
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(inviteLink)}`}
                    alt="Couple Invite QR Code"
                    className="w-40 h-40 rounded-xl shadow-md"
                  />
                  <p className="text-gray-700 text-[11px] font-bold mt-2">
                    امسح الرمز بكاميرا الهاتف لفتح رابط الدعوة مباشرة
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
};
