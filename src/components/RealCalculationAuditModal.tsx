import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  ShieldCheck,
  Brain,
  Heart,
  Users,
  Flame,
  CheckCircle2,
  X,
  FileCheck2,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  BookOpen,
  FileDown,
} from 'lucide-react';
import { RealScoringBreakdown } from '../types';
import { soundManager } from '../utils/sound';
import { exportPsychometricReportAsPDF } from '../utils/pdfReportGenerator';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  scoringBreakdown?: RealScoringBreakdown;
  partnerName: string;
}

export const RealCalculationAuditModal: React.FC<Props> = ({
  isOpen,
  onClose,
  scoringBreakdown,
  partnerName,
}) => {
  const [expandedDimension, setExpandedDimension] = useState<string | null>('intellectual');

  if (!isOpen || !scoringBreakdown) return null;

  const {
    compatibilityScore,
    intellectualScore,
    sociologicalScore,
    emotionalScore,
    lifestyleScore,
    details,
    scientificSubscales = [],
    algorithmVersion,
    auditHash,
  } = scoringBreakdown;

  const toggleDimension = (key: string) => {
    soundManager.playTab();
    setExpandedDimension((prev) => (prev === key ? null : key));
  };

  const handleExportAuditPdf = () => {
    soundManager.playTap();
    exportPsychometricReportAsPDF({
      reportTitle: `تقرير التدقيق السيكومتري للتوافق الزواجي (25 محوراً علمياً)`,
      subTitle: `تحليل التوافق الرياضي الموزون مع الشريك المقترح «${partnerName}»`,
      scientificBasis:
        'Gottman (1999), Bowlby & Ainsworth (ECR-R), Sternberg (1986), Bowen Family Systems, Schwartz Values, Brad Klontz Financial Psychology',
      completedAt: new Date().toLocaleDateString('ar-JO'),
      overallScoreLabel: 'معدل التوافق الكلي الموزون',
      overallScoreValue: `${compatibilityScore}%`,
      cognitiveFingerprintTitle: `البصمة السيكومترية للتوافق (${auditHash})`,
      executiveSummary: `تم احتساب هذا التقرير بناءً على 25 سؤالاً علمياً تقيس الأبعاد الأربعة الكبرى للتوافق الزواجي بأوزان إحصائية مثبتة: الأمان العاطفي وإصلاح الخلاف (${emotionalScore}% بوزن 32%)، التوافق الفكري والشورى (${intellectualScore}% بوزن 28%)، الأنساق الأسرية والمنظومة القيمية (${sociologicalScore}% بوزن 22%)، وعلم النفس المالي وإيقاع الحياة (${lifestyleScore}% بوزن 18%).`,
      metrics: [
        {
          label: 'الذكاء الوجداني والتعلق الآمن (وزن 32%)',
          scorePercent: emotionalScore,
          rawText: `${details.emotional.rawPoints}/${details.emotional.maxPoints}`,
          color: '#e11d48',
        },
        {
          label: 'التوافق الفكري والقرارات المشتركة (وزن 28%)',
          scorePercent: intellectualScore,
          rawText: `${details.intellectual.rawPoints}/${details.intellectual.maxPoints}`,
          color: '#0284c7',
        },
        {
          label: 'الأنساق الأسرية والقيم التربوية (وزن 22%)',
          scorePercent: sociologicalScore,
          rawText: `${details.sociological.rawPoints}/${details.sociological.maxPoints}`,
          color: '#7c3aed',
        },
        {
          label: 'علم النفس المالي ونمط الحياة (وزن 18%)',
          scorePercent: lifestyleScore,
          rawText: `${details.lifestyle.rawPoints}/${details.lifestyle.maxPoints}`,
          color: '#d97706',
        },
        ...scientificSubscales.map((sub) => ({
          label: sub.titleAr,
          scorePercent: sub.score,
          levelLabel: sub.scientistAr.split('(')[0].trim(),
          color: '#059669',
        })),
      ],
      sections: [
        {
          title: details.emotional.dimensionNameAr,
          badge: `${emotionalScore}% • مساهمة +${details.emotional.weightedContribution}%`,
          content: details.emotional.scientificReasoningAr,
          items: details.emotional.primaryAnswers,
        },
        {
          title: details.intellectual.dimensionNameAr,
          badge: `${intellectualScore}% • مساهمة +${details.intellectual.weightedContribution}%`,
          content: details.intellectual.scientificReasoningAr,
          items: details.intellectual.primaryAnswers,
        },
        {
          title: details.sociological.dimensionNameAr,
          badge: `${sociologicalScore}% • مساهمة +${details.sociological.weightedContribution}%`,
          content: details.sociological.scientificReasoningAr,
          items: details.sociological.primaryAnswers,
        },
        {
          title: details.lifestyle.dimensionNameAr,
          badge: `${lifestyleScore}% • مساهمة +${details.lifestyle.weightedContribution}%`,
          content: details.lifestyle.scientificReasoningAr,
          items: details.lifestyle.primaryAnswers,
        },
        ...scientificSubscales.map((sub) => ({
          title: `${sub.titleAr} (${sub.scientistAr})`,
          badge: `${sub.score}%`,
          content: sub.analysisAr,
          items: [`الأسئلة العلمية المحسوبة في هذا المقياس: ${sub.questionsUsed.map((q) => `س${q}`).join('، ')}`],
        })),
      ],
    });
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto"
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-3xl my-6 bg-gradient-to-b from-[#18112e] via-[#100a20] to-[#0a0714] border border-emerald-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl text-white overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 shrink-0">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-black font-['Alexandria'] text-white">
                    لوحة التدقيق السيكومتري والمقاييس العلمية المعتمدة (25 سؤالاً)
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] text-emerald-300 font-extrabold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>قياس علمي موثق</span>
                  </span>
                </div>
                <p className="text-xs text-gray-300 mt-0.5">
                  تقييم حقيقي مبني على 6 نظريات علمية محكمة في علم النفس الزواجي والاجتماعي دون أي أرقام عشوائية
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportAuditPdf}
                className="px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                title="تحميل التقرير السيكومتري الشامل PDF"
              >
                <FileDown className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">تقرير PDF</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playTap();
                  onClose();
                }}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="space-y-5 my-4 relative z-10 max-h-[70vh] overflow-y-auto pr-1">
            {/* Authenticity Guarantee Card */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <FileCheck2 className="w-4 h-4 text-emerald-400" />
                  <span>شهادة التوثيق الحسابي (25-Item Psychometric Audit):</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  تم احتساب كل نسبة مئوية في تقريرك استناداً إلى إجاباتك الفعلية على 25 محوراً علمياً وفق نماذج (Gottman, Bowlby/ECR-R, Sternberg, Bowen, Schwartz, Klontz).
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] text-emerald-400/80">
                  <span>المعرف: {auditHash}</span>
                  <span>•</span>
                  <span>النسخة: {algorithmVersion}</span>
                </div>
              </div>

              {/* Big Overall Metric Badge */}
              <div className="p-3.5 rounded-2xl bg-black/50 border border-emerald-400/30 text-center shrink-0 min-w-[130px]">
                <div className="text-[10px] text-gray-300 font-medium">معدل التوافق العلمي</div>
                <div className="text-3xl font-black text-emerald-400 font-['Alexandria']">
                  {compatibilityScore}%
                </div>
                <div className="text-[10px] text-emerald-300/80 mt-0.5">مع «{partnerName}»</div>
              </div>
            </div>

            {/* Mathematical Formula Explanation */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>المعادلة الرياضية الموزونة وفق دراسات استقرار الزواج:</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                يتم احتساب الدرجة الكلية بدمج المحاور الأربعة الكبرى حسب وزنها التنبؤي باستقرار العلاقة طويل الأمد:
              </p>
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-xs sm:text-sm text-center text-amber-300 font-bold overflow-x-auto" dir="ltr">
                Total = (Emotional × 32%) + (Intellectual × 28%) + (Sociological × 22%) + (Lifestyle × 18%)
              </div>
              <div className="text-[11px] text-gray-400 text-center" dir="rtl">
                الحساب الفعلي لحالتك: ({emotionalScore} × 0.32) + ({intellectualScore} × 0.28) + ({sociologicalScore} × 0.22) + ({lifestyleScore} × 0.18) = <strong className="text-emerald-400">{compatibilityScore}%</strong>
              </div>
            </div>

            {/* 6 Empirical Scientific Subscales */}
            {scientificSubscales.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>نتائج المقاييس العلمية الستة المحكّمة:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scientificSubscales.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-extrabold text-white">{sub.titleAr}</div>
                          <div className="text-[10px] text-emerald-300 font-medium mt-0.5">
                            {sub.scientistAr}
                          </div>
                        </div>
                        <span className="text-base font-black text-emerald-400 font-mono shrink-0">
                          {sub.score}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-l from-emerald-500 to-teal-400 rounded-full"
                          style={{ width: `${sub.score}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">{sub.analysisAr}</p>
                      <div className="text-[10px] text-slate-400 font-mono">
                        الأسئلة المحسوبة: {sub.questionsUsed.map((q) => `س${q}`).join(' • ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4 Detailed Dimension Cards */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                <Info className="w-4 h-4 text-sky-400" />
                <span>تفاصيل احتساب النقاط لكل بعد من إجاباتك الفعلية:</span>
              </h4>

              {/* 1. Intellectual */}
              <div className="rounded-2xl bg-white/5 border border-sky-500/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleDimension('intellectual')}
                  className="w-full p-3.5 flex items-center justify-between text-right hover:bg-white/5 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                      <Brain className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{details.intellectual.dimensionNameAr}</div>
                      <div className="text-[11px] text-gray-400">
                        الوزن: 28% • النقاط الخام: {details.intellectual.rawPoints}/{details.intellectual.maxPoints} • المساهمة: +{details.intellectual.weightedContribution}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-black text-lg text-sky-400 font-['Alexandria']">
                      {intellectualScore}%
                    </span>
                    {expandedDimension === 'intellectual' ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>

                {expandedDimension === 'intellectual' && (
                  <div className="p-4 pt-1 bg-black/30 border-t border-sky-500/10 space-y-2 text-xs">
                    <div className="text-gray-300">
                      <strong>الإجابات التي تم قياس البعد منها:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-gray-400">
                        {details.intellectual.primaryAnswers.map((ans, idx) => (
                          <li key={idx}>{ans}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-2.5 rounded-xl bg-sky-950/30 border border-sky-500/20 text-sky-200">
                      <strong>التحليل السيكومتري:</strong> {details.intellectual.scientificReasoningAr}
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Emotional */}
              <div className="rounded-2xl bg-white/5 border border-rose-500/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleDimension('emotional')}
                  className="w-full p-3.5 flex items-center justify-between text-right hover:bg-white/5 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                      <Heart className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{details.emotional.dimensionNameAr}</div>
                      <div className="text-[11px] text-gray-400">
                        الوزن: 32% (الأعلى تأثيراً) • النقاط الخام: {details.emotional.rawPoints}/{details.emotional.maxPoints} • المساهمة: +{details.emotional.weightedContribution}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-black text-lg text-rose-400 font-['Alexandria']">
                      {emotionalScore}%
                    </span>
                    {expandedDimension === 'emotional' ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>

                {expandedDimension === 'emotional' && (
                  <div className="p-4 pt-1 bg-black/30 border-t border-rose-500/10 space-y-2 text-xs">
                    <div className="text-gray-300">
                      <strong>الإجابات التي تم قياس البعد منها:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-gray-400">
                        {details.emotional.primaryAnswers.map((ans, idx) => (
                          <li key={idx}>{ans}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/20 text-rose-200">
                      <strong>التحليل السيكومتري:</strong> {details.emotional.scientificReasoningAr}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Sociological */}
              <div className="rounded-2xl bg-white/5 border border-violet-500/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleDimension('sociological')}
                  className="w-full p-3.5 flex items-center justify-between text-right hover:bg-white/5 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{details.sociological.dimensionNameAr}</div>
                      <div className="text-[11px] text-gray-400">
                        الوزن: 22% • النقاط الخام: {details.sociological.rawPoints}/{details.sociological.maxPoints} • المساهمة: +{details.sociological.weightedContribution}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-black text-lg text-violet-400 font-['Alexandria']">
                      {sociologicalScore}%
                    </span>
                    {expandedDimension === 'sociological' ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>

                {expandedDimension === 'sociological' && (
                  <div className="p-4 pt-1 bg-black/30 border-t border-violet-500/10 space-y-2 text-xs">
                    <div className="text-gray-300">
                      <strong>الإجابات التي تم قياس البعد منها:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-gray-400">
                        {details.sociological.primaryAnswers.map((ans, idx) => (
                          <li key={idx}>{ans}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-2.5 rounded-xl bg-violet-950/30 border border-violet-500/20 text-violet-200">
                      <strong>التحليل السيكومتري:</strong> {details.sociological.scientificReasoningAr}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Lifestyle */}
              <div className="rounded-2xl bg-white/5 border border-amber-500/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleDimension('lifestyle')}
                  className="w-full p-3.5 flex items-center justify-between text-right hover:bg-white/5 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-white">{details.lifestyle.dimensionNameAr}</div>
                      <div className="text-[11px] text-gray-400">
                        الوزن: 18% • النقاط الخام: {details.lifestyle.rawPoints}/{details.lifestyle.maxPoints} • المساهمة: +{details.lifestyle.weightedContribution}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-black text-lg text-amber-400 font-['Alexandria']">
                      {lifestyleScore}%
                    </span>
                    {expandedDimension === 'lifestyle' ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>

                {expandedDimension === 'lifestyle' && (
                  <div className="p-4 pt-1 bg-black/30 border-t border-amber-500/10 space-y-2 text-xs">
                    <div className="text-gray-300">
                      <strong>الإجابات التي تم قياس البعد منها:</strong>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-gray-400">
                        {details.lifestyle.primaryAnswers.map((ans, idx) => (
                          <li key={idx}>{ans}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/20 text-amber-200">
                      <strong>التحليل السيكومتري:</strong> {details.lifestyle.scientificReasoningAr}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 relative z-10">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>معدل الأرقام يخضع لمعايير المصداقية الإحصائية ولا يعتمد على أرقام عشوائية.</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportAuditPdf}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold transition cursor-pointer flex items-center gap-1.5"
              >
                <FileDown className="w-4 h-4 text-emerald-400" />
                <span>تحميل التقرير PDF</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playTap();
                  onClose();
                }}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                إغلاق اللوحة
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
