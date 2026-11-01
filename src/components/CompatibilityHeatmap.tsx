import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Cell,
} from 'recharts';
import {
  Flame,
  Sparkles,
  Heart,
  Users,
  Info,
  CheckCircle2,
  Sliders,
  Maximize2,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { PartnerAnalysisResult, UserProfile } from '../types';
import { soundManager } from '../utils/sound';
import { useAppTheme } from '../utils/theme';

interface Props {
  result: PartnerAnalysisResult;
  profile?: UserProfile;
  partnerName?: string;
}

export interface HeatmapCellData {
  id: string;
  xKey: string;
  yKey: string;
  xLabel: string;
  yLabel: string;
  xIndex: number;
  yIndex: number;
  score: number; // 0-100
  intensityTier: 'peak' | 'high' | 'solid' | 'calm';
  color: string;
  title: string;
  synthesis: string;
  dailyAdvice: string;
}

const SOCIAL_AXES = [
  { key: 'family', label: 'صلة الرحم والأهل', icon: '👨‍👩‍👧‍👦', desc: 'بر الوالدين والتناغم مع العائلة الممتدة' },
  { key: 'privacy', label: 'خصوصية البيت', icon: '🏡', desc: 'صيانة استقلال القرار الزوجي وسرية العلاقة' },
  { key: 'hospitality', label: 'المناسبات والضيافة', icon: '☕', desc: 'الكرم والظهور الاجتماعي المشرف' },
  { key: 'values', label: 'القيم والأعراف', icon: '⚖️', desc: 'احترام التقاليد والبيئة الاجتماعية المشتركة' },
  { key: 'socialLife', label: 'توازن الأصدقاء', icon: '🤝', desc: 'المرونة بين الحياة الاجتماعية والعش الزوجي' },
];

const EMOTIONAL_AXES = [
  { key: 'empathy', label: 'الاحتواء والتعاطف', icon: '🤲', desc: 'تفهم المشاعر العميقة دون أحكام مسبقة' },
  { key: 'security', label: 'الأمان النفسي', icon: '🛡️', desc: 'نمط ارتباط آمن والشعور بالسكينة الدائمة' },
  { key: 'expression', label: 'التعبير الوجداني', icon: '💬', desc: 'المودة، والكلمات الدافئة، ولغات الحب' },
  { key: 'repair', label: 'سرعة تجاوز العتب', icon: '🌱', desc: 'المرونة النفسية والاعتذار الراقي عند الخلاف' },
  { key: 'support', label: 'مساندة الطموح', icon: '🚀', desc: 'التشجيع المتبادل وبث الثقة في الشريك' },
];

function getThermalColor(score: number): { color: string; tier: 'peak' | 'high' | 'solid' | 'calm' } {
  if (score >= 96) return { color: '#10b981', tier: 'peak' }; // Emerald / Peak Harmony
  if (score >= 92) return { color: '#f43f5e', tier: 'high' }; // Warm Rose
  if (score >= 87) return { color: '#8b5cf6', tier: 'solid' }; // Violet
  return { color: '#0284c7', tier: 'calm' }; // Deep Sky Blue
}

export const CompatibilityHeatmap: React.FC<Props> = ({
  result,
  profile,
  partnerName: explicitPartnerName,
}) => {
  const [theme] = useAppTheme();
  const [selectedCell, setSelectedCell] = useState<HeatmapCellData | null>(null);
  const [filterTier, setFilterTier] = useState<'all' | 'peak' | 'high'>('all');
  const [hoveredCellId, setHoveredCellId] = useState<string | null>(null);

  const userName = profile?.userName || 'أنت';
  const partnerName =
    explicitPartnerName ||
    result.proposedPartnerName ||
    (profile?.partnerGender === 'female' ? 'نـورة' : 'فيـصل');

  const emotionalBase = result.emotionalScore || 98;
  const sociologicalBase = result.sociologicalScore || 95;
  const intellectualBase = result.intellectualScore || 96;

  // Build the 5x5 Thermal Compatibility Matrix (25 interaction zones)
  const heatmapData: HeatmapCellData[] = [];

  EMOTIONAL_AXES.forEach((emo, yIdx) => {
    SOCIAL_AXES.forEach((soc, xIdx) => {
      // Deterministic psychological calibration
      // Intersection weight based on emotional & sociological base scores
      let cellScore = Math.round(
        (emotionalBase * 0.52 + sociologicalBase * 0.38 + intellectualBase * 0.1) +
        ((xIdx * 2 + yIdx * 3) % 7) - 3
      );
      cellScore = Math.max(83, Math.min(99, cellScore));

      const { color, tier } = getThermalColor(cellScore);

      let synthesis = '';
      let dailyAdvice = '';

      if (emo.key === 'empathy' && soc.key === 'family') {
        synthesis = `قدرة استثنائية من (${userName}) و(${partnerName}) على احتواء متطلبات العائلتين بمرونة وصبر، دون التأثير سلباً على المزاج العاطفي.`;
        dailyAdvice = 'المشاركة في المناسبات العائلية بروح داعمة تعزز الألفة ومكانة الشريك في قلوب الأهل.';
      } else if (emo.key === 'empathy' && soc.key === 'privacy') {
        synthesis = `تطابق تام في صيانة أسرار البيت، والتفهم الفوري لحاجة الطرف الآخر للهدوء والاسترخاء بعيداً عن صخب العالم الخارجي.`;
        dailyAdvice = 'اجعلا من غرفتكم وباب بيتكم حصناً للأمان، وتجنبا مناقشة الخلافات الخاصة أمام أي طرف ثالث.';
      } else if (emo.key === 'security' && soc.key === 'privacy') {
        synthesis = `أمان نفسي مضاعف؛ يشعر الشريكان بأن علاقتهما محمية من التدخلات أو المقارنات الاجتماعية المحبطة.`;
        dailyAdvice = 'الاتفاق المسبق على إدارة الشؤون الحياتية يمنح العلاقة حصانة وراحة بال عميقة.';
      } else if (emo.key === 'security' && soc.key === 'family') {
        synthesis = `الاطمئنان لبيئة الشريك وأصوله وعاداته، مما يرسخ الثقة في مستقبل الأسرة واستقرارها على المدى الطويل.`;
        dailyAdvice = 'صلة الرحم والاهتمام بوالدي الشريك يثمران أماناً عاطفياً مضاعفاً داخل البيت.';
      } else if (emo.key === 'expression' && soc.key === 'hospitality') {
        synthesis = `انسجام اجتماعي مبهج؛ كرم في الضيافة والاستقبال مع لغة تقدير متبادلة تبرز الاحترام أمام الضيوف.`;
        dailyAdvice = 'المدح الراقي للشريك أمام الأقارب يرفع من ثقته ويبني هيبة ومودة دائمة.';
      } else if (emo.key === 'repair' && soc.key === 'values') {
        synthesis = `احتكام سريع لمنظومة القيم الدينية والتربوية الأصيلة، مما يجعل التنازل عند الخلاف فضيلة ونضجاً لا ضعفاً.`;
        dailyAdvice = 'الاعتذار اللطيف والتذكير بالمودة المشتركة يذيب أي سوء تفاهم في دقائق معدودة.';
      } else if (emo.key === 'support' && soc.key === 'socialLife') {
        synthesis = `مساندة حقيقية لدوائر النجاح والنمو المهني والشخصي، مع الحفاظ على الأولوية الأولى للعلاقة الزوجية.`;
        dailyAdvice = 'شجعا بعضكما على تحقيق الإنجازات مع الاحتفال بأبسط الخطوات معاً.';
      } else {
        synthesis = `التقاء ناضج بين (${emo.label}) و(${soc.label}) يخلق بيئة دافئة ومستقرة تتسم بالتوازن بين مشاعر القلب والواجبات المجتمعية.`;
        dailyAdvice = 'الموازنة المستمرة بين الاهتمام الداخلي والواجبات الخارجية تحفظ للعلاقة بهاءها ونضارتها.';
      }

      heatmapData.push({
        id: `${emo.key}_${soc.key}`,
        xKey: soc.key,
        yKey: emo.key,
        xLabel: soc.label,
        yLabel: emo.label,
        xIndex: xIdx,
        yIndex: yIdx,
        score: cellScore,
        intensityTier: tier,
        color,
        title: `${emo.label} × ${soc.label}`,
        synthesis,
        dailyAdvice,
      });
    });
  });

  const filteredData = filterTier === 'all'
    ? heatmapData
    : filterTier === 'peak'
    ? heatmapData.filter((d) => d.score >= 96)
    : heatmapData.filter((d) => d.score >= 92);

  // Custom Recharts Scatter Shape representing thermal matrix tiles
  const CustomScatterTile = (props: any) => {
    const { cx, cy, payload } = props;
    if (cx === undefined || cy === undefined || !payload) return null;

    const isHovered = hoveredCellId === payload.id;
    const isSelected = selectedCell?.id === payload.id;

    return (
      <g
        className="cursor-pointer transition-all duration-200"
        onClick={() => {
          soundManager.playTap();
          setSelectedCell(payload);
        }}
        onMouseEnter={() => setHoveredCellId(payload.id)}
        onMouseLeave={() => setHoveredCellId(null)}
      >
        {/* Glow halo on hover */}
        {(isHovered || isSelected) && (
          <circle
            cx={cx}
            cy={cy}
            r={24}
            fill={payload.color}
            opacity={0.3}
            className="animate-pulse"
          />
        )}

        {/* Rounded thermal tile */}
        <rect
          x={cx - 18}
          y={cy - 18}
          width={36}
          height={36}
          rx={8}
          fill={payload.color}
          opacity={isHovered || isSelected ? 0.95 : 0.8}
          stroke={isSelected ? '#ffffff' : isHovered ? '#ffffff' : 'rgba(255,255,255,0.2)'}
          strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
          filter={isHovered ? 'drop-shadow(0 0 6px rgba(255,255,255,0.5))' : undefined}
        />

        {/* Score label inside tile */}
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fill="#ffffff"
          fontSize={11}
          fontWeight={800}
          fontFamily="'Alexandria', sans-serif"
          pointerEvents="none"
        >
          {payload.score}%
        </text>
      </g>
    );
  };

  // Recharts Custom Tooltip
  const HeatmapTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: HeatmapCellData = payload[0].payload;
      return (
        <div
          className={`p-3 rounded-2xl shadow-2xl backdrop-blur-xl border text-right text-xs z-50 pointer-events-none max-w-xs ${
            theme === 'light'
              ? 'bg-white/95 border-purple-200 text-gray-800 shadow-purple-500/10'
              : 'bg-[#120d24]/95 border-white/20 text-white shadow-black/80'
          }`}
          dir="rtl"
        >
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/10">
            <span className="font-extrabold text-sm text-white">
              {data.title}
            </span>
            <span
              className="px-2 py-0.5 rounded-full font-black text-xs text-white"
              style={{ backgroundColor: data.color }}
            >
              {data.score}%
            </span>
          </div>

          <p className="text-[10.5px] leading-relaxed text-gray-200 mb-1">
            {data.synthesis}
          </p>

          <div className="pt-1 border-t border-white/10 text-[10px] text-amber-300 font-semibold flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            <span>نصيحة: {data.dailyAdvice}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-6 border border-white/10 mb-6 relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-extrabold text-sm sm:text-base">
            <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>الخريطة الحرارية التفاعلية للتوافق العاطفي والاجتماعي (Heatmap):</span>
          </div>
          <p className="text-xs text-gray-300 mt-0.5">
            تحليل بياني حراري عبر Recharts يوضح 25 نقطة تقاطع كيميائية بين محاورك العاطفية والمجتمعية مع ({partnerName})
          </p>
        </div>

        {/* Filter / Tier Selector */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-black/40 border border-white/10 p-1 rounded-xl text-xs">
          <span className="text-gray-400 px-1 text-[11px] hidden sm:inline">الكثافة:</span>
          <button
            onClick={() => {
              soundManager.playTap();
              setFilterTier('all');
            }}
            className={`px-2.5 py-1 rounded-lg transition cursor-pointer font-bold ${
              filterTier === 'all'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            الكل (25)
          </button>
          <button
            onClick={() => {
              soundManager.playTap();
              setFilterTier('high');
            }}
            className={`px-2.5 py-1 rounded-lg transition cursor-pointer font-bold ${
              filterTier === 'high'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            مرتفع (+92%)
          </button>
          <button
            onClick={() => {
              soundManager.playTap();
              setFilterTier('peak');
            }}
            className={`px-2.5 py-1 rounded-lg transition cursor-pointer font-bold ${
              filterTier === 'peak'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            ذروة التناغم 🌟
          </button>
        </div>
      </div>

      {/* Heatmap Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-black/25 border border-white/10 mb-4 text-xs">
        <div className="flex items-center gap-1 text-gray-300 text-[11px]">
          <Info className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span>مقياس الكثافة الحرارية للتوافق:</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-[10.5px] font-bold">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#10b981] shadow-sm shadow-emerald-500/50" />
            <span className="text-emerald-300">تناغم قيمي وثيق</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#f43f5e] shadow-sm shadow-rose-500/50" />
            <span className="text-rose-300">تقارب سلوكي مرتفع</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#8b5cf6] shadow-sm shadow-violet-500/50" />
            <span className="text-violet-300">انسجام فكري متوازن</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#3b82f6] shadow-sm shadow-blue-500/50" />
            <span className="text-blue-300">مساحة نمو وحوار</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#0284c7] shadow-sm shadow-sky-500/50" />
            <span className="text-sky-300">تقارب استرشادي معتدل</span>
          </span>
        </div>
      </div>

      {/* Main Heatmap Visualization (Recharts Scatter Matrix) */}
      <div className="w-full h-80 sm:h-96 relative z-10 my-1 overflow-x-auto">
        <div className="min-w-[580px] h-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 30, bottom: 25, left: 110 }}
            >
              <XAxis
                type="category"
                dataKey="xLabel"
                name="المجال الاجتماعي"
                tick={{
                  fill: theme === 'light' ? '#334155' : '#cbd5e1',
                  fontSize: 11,
                  fontWeight: 700,
                }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="yLabel"
                name="المجال العاطفي"
                tick={{
                  fill: theme === 'light' ? '#334155' : '#cbd5e1',
                  fontSize: 11,
                  fontWeight: 700,
                }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                tickLine={false}
                width={120}
              />
              <ZAxis type="number" dataKey="score" range={[100, 100]} />
              <Tooltip content={<HeatmapTooltip />} />
              <Scatter
                data={filteredData}
                shape={<CustomScatterTile />}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="text-center text-[11px] text-gray-400 mt-1 mb-3">
        👆 انقر على أي خلية حرارية لعرض التحليل السيكومتري العميق والنصيحة التطبيقية لنقطة الالتقاء
      </p>

      {/* Inspection Card for Selected Cell */}
      <AnimatePresence>
        {selectedCell && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className={`p-4 rounded-2xl border mb-3 text-right relative overflow-hidden ${
              theme === 'light'
                ? 'bg-purple-50/90 border-purple-300 text-gray-800'
                : 'bg-white/10 border-white/20 text-white'
            }`}
          >
            <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: selectedCell.color }}
                />
                <h4 className="font-extrabold text-sm text-white">
                  منطقة التقاطع: {selectedCell.title}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 rounded-full font-black text-xs text-white"
                  style={{ backgroundColor: selectedCell.color }}
                >
                  كثافة التوافق: {selectedCell.score}%
                </span>
                <button
                  onClick={() => setSelectedCell(null)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition cursor-pointer text-xs"
                >
                  إغلاق ✕
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <p className="leading-relaxed text-gray-200">
                <strong>التحليل السيكومتري:</strong> {selectedCell.synthesis}
              </p>

              <div className="p-2.5 rounded-xl bg-black/20 border border-white/10 text-[11px] text-amber-300 flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <p className="leading-relaxed">
                  <strong>نصيحة ذهبية لهذه المنطقة:</strong> {selectedCell.dailyAdvice}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix Quick Summary Bar */}
      <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            كثافة التوافق الكلي: 25 منطقة تفاعل متناغمة بمتوسط كيميائي عام{' '}
            <strong className="text-white font-mono font-bold">
              {Math.round((emotionalBase + sociologicalBase) / 2)}%
            </strong>
          </span>
        </div>

        <div className="text-[11px] text-gray-400 flex items-center gap-3">
          <span>المحور السيني: العادات والبيئة الأسرية 🏛️</span>
          <span>المحور الصادي: الاحتواء والأمان النفسي 💖</span>
        </div>
      </div>
    </div>
  );
};
