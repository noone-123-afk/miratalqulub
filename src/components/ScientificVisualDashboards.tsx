import React, { useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import { VisualChartsPayload } from '../types';
import { useAppTheme } from '../utils/theme';
import { useLanguage } from '../context/LanguageContext';

interface ComparisonOverlayProps {
  personAName: string;
  personBName: string;
  axes: Array<{
    axisNameAr: string;
    personAScore: number;
    personBScore: number;
  }>;
}

interface Props {
  charts: VisualChartsPayload;
  userName?: string;
  comparisonOverlay?: ComparisonOverlayProps;
}

function safeVal(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

export const ScientificVisualDashboards: React.FC<Props> = ({
  charts,
  userName,
  comparisonOverlay,
}) => {
  const { theme } = useAppTheme();
  const { direction, isRTL, translateText } = useLanguage();
  const isLight = theme === 'light';
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  const axisTextColor = isLight ? '#334155' : '#cbd5e1';
  const gridStroke = isLight ? 'rgba(15,23,42,0.12)' : 'rgba(255,255,255,0.12)';
  const cardBg = isLight
    ? 'bg-white border-slate-200 text-slate-900 shadow-sm'
    : 'bg-slate-900/75 border-white/10 text-slate-100';
  const tooltipStyle = {
    backgroundColor: isLight ? '#ffffff' : '#0f172a',
    border: isLight ? '1px solid #cbd5e1' : '1px solid rgba(139,92,246,0.45)',
    borderRadius: '12px',
    color: isLight ? '#0f172a' : '#f8fafc',
    fontSize: '12px',
    fontFamily: isRTL ? 'Alexandria, sans-serif' : 'Inter, system-ui, sans-serif',
  };

  // Safe Clamped Datasets with bilingual psychometric label resolution
  const overallData = (charts.overallRadar || []).map((d) => ({
    ...d,
    subject: isRTL ? d.subject : translateText(d.subject),
    score: safeVal(d.score),
    fullMark: 100,
  }));

  const bfData = (charts.bigFiveRadar || []).map((d) => ({
    ...d,
    trait: isRTL ? d.trait : translateText(d.trait),
    score: safeVal(d.score),
    benchmark: safeVal(d.benchmark),
    fullMark: 100,
  }));

  const hxData = (charts.hexacoRadar || []).map((d) => ({
    ...d,
    trait: isRTL ? d.trait : translateText(d.trait),
    score: safeVal(d.score),
    fullMark: 100,
  }));

  const eiData = (charts.emotionalIntelligence || []).map((d) => ({
    ...d,
    branch: isRTL ? d.branch : translateText(d.branch),
    score: safeVal(d.score),
  }));
  const overallEI =
    eiData.length > 0
      ? Math.round(eiData.reduce((acc, item) => acc + item.score, 0) / eiData.length)
      : 50;

  const commData = (charts.communicationStyles || []).map((d) => ({
    ...d,
    style: isRTL ? d.style : translateText(d.style),
    score: safeVal(d.score),
  }));

  const conflictData = (charts.conflictModes || []).map((d) => ({
    ...d,
    mode: isRTL ? d.mode : translateText(d.mode),
    score: safeVal(d.score),
    fullMark: 100,
  }));

  const goalsData = (charts.lifeGoalsAlignment || []).map((d) => ({
    ...d,
    domain: isRTL ? d.domain : translateText(d.domain),
    userScore: safeVal(d.userScore),
    targetBenchmark: safeVal(d.targetBenchmark),
  }));

  const attAnxiety = safeVal(charts.attachment?.anxiety ?? 30);
  const attAvoidance = safeVal(charts.attachment?.avoidance ?? 30);

  // SVG Circular Gauge math for Emotional Intelligence Meter
  const gaugeRadius = 46;
  const gaugeCircumference = 2 * Math.PI * gaugeRadius;
  const gaugeDashOffset = gaugeCircumference * (1 - overallEI / 100);

  return (
    <div className="space-y-5" dir={direction}>
      {/* Optional Two-Person Radar Overlay when comparing Person A vs B */}
      {comparisonOverlay && comparisonOverlay.axes.length > 0 && (
        <div className={`rounded-2xl border p-4 sm:p-5 ${cardBg}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div>
              <h4 className="font-extrabold text-sm sm:text-base">
                {isRTL
                  ? `مقارنة المحاور التسعة: ${comparisonOverlay.personAName} ✕ ${comparisonOverlay.personBName}`
                  : `9-Axis Dyadic Comparison: ${comparisonOverlay.personAName} ✕ ${comparisonOverlay.personBName}`}
              </h4>
              <p className="text-xs opacity-75">
                {isRTL
                  ? 'تراكب سيكومتري مباشر عبر Big Five وHEXACO والتعلق والذكاء العاطفي والتواصل والقيم'
                  : 'Direct psychometric overlay across Big Five, HEXACO, Attachment (ECR-R), EI, Communication & Core Values'}
              </p>
            </div>
          </div>
          <div className="w-full h-72 sm:h-80 ltr-preserve" dir="ltr" data-keep-dir="true">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={comparisonOverlay.axes.map((a) => ({
                  axis: isRTL
                    ? a.axisNameAr.split('(')[0].trim()
                    : translateText(a.axisNameAr).split('(')[0].trim(),
                  A: safeVal(a.personAScore),
                  B: safeVal(a.personBScore),
                  fullMark: 100,
                }))}
                outerRadius="68%"
              >
                <PolarGrid stroke={gridStroke} />
                <PolarAngleAxis dataKey="axis" tick={{ fill: axisTextColor, fontSize: 10 }} />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={{ fill: axisTextColor, fontSize: 9 }}
                />
                <Radar
                  name={comparisonOverlay.personAName}
                  dataKey="A"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.35}
                  strokeWidth={2.5}
                />
                <Radar
                  name={comparisonOverlay.personBName}
                  dataKey="B"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                  strokeWidth={2.5}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Charts 1 & 2: Overall Synthesis Radar + Big Five vs Benchmark Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={`rounded-2xl border p-4 ${cardBg}`}>
          <h4 className="font-extrabold text-sm mb-1">
            {isRTL
              ? '1. رادار التركيبة النفسية الشاملة (8 نماذج علمية)'
              : '1. Comprehensive 8-Construct Psychometric Radar'}
          </h4>
          <p className="text-[11px] opacity-75 mb-2">
            {isRTL
              ? `التوزيع المتكامل لبصمة ${userName || 'المختبَر'} عبر المحاور الثمانية`
              : `Integrated psychometric profile of ${userName || 'Examinee'} across 8 scientific constructs`}
          </p>
          <div className="w-full h-64 ltr-preserve" dir="ltr" data-keep-dir="true">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={overallData} outerRadius="66%">
                <PolarGrid stroke={gridStroke} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: axisTextColor, fontSize: 10 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: axisTextColor, fontSize: 9 }}
                />
                <Radar
                  name={isRTL ? 'نتيجتك %' : 'Your Score %'}
                  dataKey="score"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.42}
                  strokeWidth={2.5}
                />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`rounded-2xl border p-4 ${cardBg}`}>
          <h4 className="font-extrabold text-sm mb-1">
            {isRTL
              ? '2. رادار العوامل الخمسة الكبرى (Big Five vs Normative)'
              : '2. Big Five (OCEAN) vs. Normative Benchmark'}
          </h4>
          <p className="text-[11px] opacity-75 mb-2">
            {isRTL
              ? 'مقارنة سماتك الخمس مع المتوسط المعياري (Benchmark)'
              : 'Comparing your 5 personality dimensions against the normative population benchmark'}
          </p>
          <div className="w-full h-64 ltr-preserve" dir="ltr" data-keep-dir="true">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={bfData} outerRadius="68%">
                <PolarGrid stroke={gridStroke} />
                <PolarAngleAxis dataKey="trait" tick={{ fill: axisTextColor, fontSize: 10.5 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: axisTextColor, fontSize: 9 }}
                />
                <Radar
                  name={isRTL ? 'درجتك %' : 'Your Score %'}
                  dataKey="score"
                  stroke="#ec4899"
                  fill="#ec4899"
                  fillOpacity={0.4}
                  strokeWidth={2.5}
                />
                <Radar
                  name={isRTL ? 'المتوسط المعياري' : 'Normative Benchmark'}
                  dataKey="benchmark"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.14}
                  strokeWidth={1.8}
                  strokeDasharray="4 4"
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts 3 & 4: HEXACO Radar + Emotional Intelligence Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={`rounded-2xl border p-4 ${cardBg}`}>
          <h4 className="font-extrabold text-sm mb-1">
            {isRTL
              ? '3. رادار نموذج هيكساكو سداسي العوامل (HEXACO)'
              : '3. HEXACO 6-Factor Personality Radar'}
          </h4>
          <p className="text-[11px] opacity-75 mb-2">
            {isRTL
              ? 'يُظهر عامل الصدق والتواضع (H) إلى جانب الأبعاد الخمسة المفسرة للسلوك'
              : 'Highlights Honesty-Humility (H) alongside the 5 structural personality factors'}
          </p>
          <div className="w-full h-64 ltr-preserve" dir="ltr" data-keep-dir="true">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={hxData} outerRadius="68%">
                <PolarGrid stroke={gridStroke} />
                <PolarAngleAxis dataKey="trait" tick={{ fill: axisTextColor, fontSize: 10.5 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: axisTextColor, fontSize: 9 }}
                />
                <Radar
                  name="HEXACO %"
                  dataKey="score"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.38}
                  strokeWidth={2.5}
                />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`rounded-2xl border p-4 flex flex-col justify-between ${cardBg}`}>
          <div>
            <h4 className="font-extrabold text-sm mb-1">
              {isRTL
                ? '4. مقياس الذكاء العاطفي (Emotional Intelligence Meter)'
                : '4. Mayer-Salovey Emotional Intelligence (EQ) Meter'}
            </h4>
            <p className="text-[11px] opacity-75 mb-3">
              {isRTL
                ? 'الفروع الأربعة لنموذج ماير وسالوفي (الوعي، التعاطف، التنظيم، المهارة الاجتماعية)'
                : 'Four Mayer-Salovey branches: Self-Awareness, Empathy, Regulation & Social Competence'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 my-auto">
            {/* Circular SVG Gauge */}
            <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
              <svg
                viewBox="0 0 110 110"
                className="w-full h-full -rotate-90"
                aria-label={
                  isRTL
                    ? `مؤشر الذكاء العاطفي ${overallEI}%`
                    : `Emotional Intelligence Index ${overallEI}%`
                }
              >
                <circle
                  cx="55"
                  cy="55"
                  r={gaugeRadius}
                  fill="none"
                  stroke={isLight ? '#e2e8f0' : 'rgba(255,255,255,0.1)'}
                  strokeWidth="10"
                />
                <circle
                  cx="55"
                  cy="55"
                  r={gaugeRadius}
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={gaugeCircumference}
                  strokeDashoffset={gaugeDashOffset}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black tabular-nums">{overallEI}%</span>
                <span className="text-[10px] opacity-75 font-bold">
                  {isRTL ? 'مؤشر EQ الكلي' : 'Composite EQ'}
                </span>
              </div>
            </div>

            {/* 4 Branches Progress Bars */}
            <div className="flex-1 w-full space-y-2.5">
              {eiData.map((b) => (
                <div key={b.branch} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>{b.branch}</span>
                    <span className="tabular-nums" style={{ color: b.color }}>
                      {b.score}%
                    </span>
                  </div>
                  <div className={`w-full h-2.5 rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-white/10'}`}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${b.score}%`, backgroundColor: b.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts 5 & 6: 2D Attachment Quadrant + Relationship Compatibility Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 5. Attachment 2D Quadrant (Anxiety vs Avoidance) */}
        <div className={`rounded-2xl border p-4 ${cardBg}`}>
          <h4 className="font-extrabold text-sm mb-1">
            {isRTL
              ? '5. خريطة التعلق العاطفي ثنائية الأبعاد (ECR-R Quadrant)'
              : '5. Two-Dimensional Adult Attachment Space (ECR-R Quadrant)'}
          </h4>
          <p className="text-[11px] opacity-75 mb-3">
            {isRTL ? 'التصنيف:' : 'Classification:'}{' '}
            <strong>
              {isRTL
                ? charts.attachment?.styleAr
                : charts.attachment?.styleEn || translateText(charts.attachment?.styleAr || '')}
            </strong>{' '}
            • {isRTL ? 'القلق:' : 'Anxiety:'}{' '}
            <span className="tabular-nums font-bold">{attAnxiety}%</span> •{' '}
            {isRTL ? 'التجنب:' : 'Avoidance:'}{' '}
            <span className="tabular-nums font-bold">{attAvoidance}%</span>
          </p>
          <div className="relative w-full aspect-[4/3] max-h-64 ltr-preserve" dir="ltr" data-keep-dir="true">
            <svg
              viewBox="0 0 320 220"
              className="w-full h-full"
              role="img"
              aria-label={isRTL ? 'خريطة التعلق العاطفي' : 'Adult Attachment Quadrant Map'}
            >
              {/* 4 Quadrants */}
              <rect x="40" y="15" width="125" height="85" rx="6" fill="rgba(245,158,11,0.12)" stroke={gridStroke} />
              <rect x="165" y="15" width="125" height="85" rx="6" fill="rgba(244,63,94,0.14)" stroke={gridStroke} />
              <rect x="40" y="100" width="125" height="85" rx="6" fill="rgba(16,185,129,0.16)" stroke={gridStroke} />
              <rect x="165" y="100" width="125" height="85" rx="6" fill="rgba(249,115,22,0.12)" stroke={gridStroke} />

              {/* Quadrant Labels */}
              <text x="102" y="34" textAnchor="middle" fill={axisTextColor} fontSize="10" fontWeight="bold">
                {isRTL ? 'قلق متعطش (Anxious)' : 'Anxious-Preoccupied'}
              </text>
              <text x="227" y="34" textAnchor="middle" fill={axisTextColor} fontSize="10" fontWeight="bold">
                {isRTL ? 'حذر متذبذب (Fearful)' : 'Fearful-Avoidant'}
              </text>
              <text x="102" y="175" textAnchor="middle" fill="#10b981" fontSize="10.5" fontWeight="bold">
                {isRTL ? 'آمن مستقر (Secure)' : 'Secure Attachment'}
              </text>
              <text x="227" y="175" textAnchor="middle" fill={axisTextColor} fontSize="10" fontWeight="bold">
                {isRTL ? 'تجنبي مكتفٍ (Avoidant)' : 'Dismissive-Avoidant'}
              </text>

              {/* Center crosshair at 50%/50% */}
              <line x1="165" y1="15" x2="165" y2="185" stroke={axisTextColor} strokeOpacity="0.35" strokeDasharray="3 3" />
              <line x1="40" y1="100" x2="290" y2="100" stroke={axisTextColor} strokeOpacity="0.35" strokeDasharray="3 3" />

              {/* Axis Titles */}
              <text x="165" y="206" textAnchor="middle" fill={axisTextColor} fontSize="10">
                {isRTL ? 'محور التجنب (Avoidance: 0% ⟶ 100%)' : 'Attachment Avoidance (0% ⟶ 100%)'}
              </text>
              <text
                x="16"
                y="100"
                textAnchor="middle"
                fill={axisTextColor}
                fontSize="10"
                transform="rotate(-90 16 100)"
              >
                {isRTL ? 'قلق الهجر (Anxiety %)' : 'Attachment Anxiety (%)'}
              </text>

              {/* User Dot: X = 40 + (avoidance/100)*250, Y = 185 - (anxiety/100)*170 */}
              {(() => {
                const cx = 40 + (attAvoidance / 100) * 250;
                const cy = 185 - (attAnxiety / 100) * 170;
                return (
                  <g>
                    <circle cx={cx} cy={cy} r="13" fill="rgba(139,92,246,0.28)" />
                    <circle cx={cx} cy={cy} r="6.5" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" />
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>

        {/* 6. Interactive Relationship Compatibility Matrix */}
        <div className={`rounded-2xl border p-4 ${cardBg}`}>
          <h4 className="font-extrabold text-sm mb-1">
            {isRTL
              ? '6. مصفوفة التوافق العلائقي التفاعلية (4×4 Matrix)'
              : '6. Interactive Dyadic Synergy Matrix (4×4)'}
          </h4>
          <p className="text-[11px] opacity-75 mb-3">
            {isRTL
              ? 'انقر على أي خلية لقراءة تفسير التآزر بين ركائز الاستقرار والذكاء العاطفي'
              : 'Click any cell to inspect dyadic synergy across emotional stability and relational pillars'}
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {(charts.compatibilityMatrix || []).slice(0, 16).map((cell, idx) => {
              const s = safeVal(cell.synergyScore);
              const cellBg =
                s >= 75
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-500'
                  : s >= 50
                  ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400'
                  : 'bg-amber-500/20 border-amber-500/40 text-amber-500';
              return (
                <button
                  key={`${cell.axisA}_${cell.axisB}_${idx}`}
                  type="button"
                  onClick={() => setSelectedCell(selectedCell === idx ? null : idx)}
                  className={`p-2 rounded-xl border text-center transition hover:scale-[1.03] cursor-pointer ${cellBg} ${
                    selectedCell === idx ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  <div className="text-sm font-black tabular-nums">{s}%</div>
                  <div className="text-[9.5px] font-bold truncate opacity-90">
                    {isRTL ? cell.labelAr : translateText(cell.labelAr)}
                  </div>
                </button>
              );
            })}
          </div>
          {selectedCell !== null && charts.compatibilityMatrix?.[selectedCell] && (
            <div className={`mt-2.5 p-2.5 rounded-xl text-xs border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/30 border-white/10'}`}>
              <span className="font-extrabold">
                {isRTL
                  ? charts.compatibilityMatrix[selectedCell].axisA
                  : translateText(charts.compatibilityMatrix[selectedCell].axisA)}{' '}
                ×{' '}
                {isRTL
                  ? charts.compatibilityMatrix[selectedCell].axisB
                  : translateText(charts.compatibilityMatrix[selectedCell].axisB)}
                :
              </span>{' '}
              <span className="font-bold text-purple-400 tabular-nums">
                {safeVal(charts.compatibilityMatrix[selectedCell].synergyScore)}%
              </span>{' '}
              —{' '}
              {isRTL
                ? charts.compatibilityMatrix[selectedCell].labelAr
                : translateText(charts.compatibilityMatrix[selectedCell].labelAr)}
            </div>
          )}
        </div>
      </div>

      {/* Charts 7, 8, 9: Communication Style + Conflict Management + Life Goals Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 7. Communication Style Graph */}
        <div className={`rounded-2xl border p-4 ${cardBg}`}>
          <h4 className="font-extrabold text-sm mb-1">
            {isRTL ? '7. أنماط التواصل الحواري' : '7. Communication Styles Profile'}
          </h4>
          <p className="text-[11px] opacity-75 mb-2">
            {isRTL
              ? 'توزيع الحزم والإنصات والتحليل والدفء'
              : 'Distribution of Assertive, Reflective, Analytical & Expressive styles'}
          </p>
          <div className="w-full h-56 ltr-preserve" dir="ltr" data-keep-dir="true">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={commData} layout="vertical" margin={{ left: 10, right: 16, top: 6, bottom: 6 }}>
                <CartesianGrid stroke={gridStroke} horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: axisTextColor, fontSize: 10 }} />
                <YAxis
                  type="category"
                  dataKey="style"
                  width={105}
                  tick={{ fill: axisTextColor, fontSize: 10 }}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="score" name={isRTL ? 'النسبة %' : 'Score %'} radius={[0, 6, 6, 0]}>
                  {commData.map((entry, idx) => (
                    <Cell key={`comm_${idx}`} fill={entry.color || '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 8. Conflict Management Profile (TKI 5 Modes) */}
        <div className={`rounded-2xl border p-4 ${cardBg}`}>
          <h4 className="font-extrabold text-sm mb-1">
            {isRTL ? '8. خريطة إدارة النزاعات (TKI)' : '8. Conflict Resolution Modes (TKI)'}
          </h4>
          <p className="text-[11px] opacity-75 mb-2">
            {isRTL
              ? 'أوضاع توماس-كيلمان الخمسة عند الخلاف'
              : 'Thomas-Kilmann 5 conflict-handling orientations'}
          </p>
          <div className="w-full h-56 ltr-preserve" dir="ltr" data-keep-dir="true">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={conflictData} outerRadius="65%">
                <PolarGrid stroke={gridStroke} />
                <PolarAngleAxis dataKey="mode" tick={{ fill: axisTextColor, fontSize: 10 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: axisTextColor, fontSize: 9 }}
                />
                <Radar
                  name={isRTL ? 'استجابة النزاع %' : 'Conflict Mode %'}
                  dataKey="score"
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={0.38}
                  strokeWidth={2}
                />
                <Tooltip contentStyle={tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 9. Life Goals Alignment Chart */}
        <div className={`rounded-2xl border p-4 ${cardBg}`}>
          <h4 className="font-extrabold text-sm mb-1">
            {isRTL ? '9. اتساق أهداف الحياة (PERMA)' : '9. Life Goals Alignment (PERMA)'}
          </h4>
          <p className="text-[11px] opacity-75 mb-2">
            {isRTL
              ? 'مؤشر أهدافك مقابل هدف الازدهار الأسري'
              : 'Your goal alignment vs. normative family flourishing'}
          </p>
          <div className="w-full h-56 ltr-preserve" dir="ltr" data-keep-dir="true">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={goalsData} margin={{ top: 8, right: 10, left: -12, bottom: 8 }}>
                <CartesianGrid stroke={gridStroke} vertical={false} />
                <XAxis dataKey="domain" tick={{ fill: axisTextColor, fontSize: 9.5 }} interval={0} />
                <YAxis domain={[0, 100]} tick={{ fill: axisTextColor, fontSize: 10 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: '10.5px' }} />
                <Bar dataKey="userScore" name={isRTL ? 'هدفك %' : 'Your Score %'} fill="#14b8a6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="targetBenchmark" name={isRTL ? 'المعيار' : 'Benchmark'} fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
