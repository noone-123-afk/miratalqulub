import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Sparkles,
  Gift,
  Compass,
  Heart,
  Clock,
  Shuffle,
  CalendarDays,
  MapPin,
  Flame,
  Check,
  Copy,
  PartyPopper,
} from 'lucide-react';
import { VirtualMeetingInfo, AnniversaryActivity } from '../types';
import {
  calculateVirtualMeetingInfo,
  DEFAULT_ANNIVERSARY_ACTIVITIES,
} from '../utils/anniversary';
import { soundManager } from '../utils/sound';

interface Props {
  partnerName: string;
  country: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-amber-300" />,
  Gift: <Gift className="w-5 h-5 text-rose-400" />,
  Compass: <Compass className="w-5 h-5 text-sky-400" />,
  Heart: <Heart className="w-5 h-5 text-pink-400" />,
};

export const AnniversarySection: React.FC<Props> = ({ partnerName, country }) => {
  const [meetingMode, setMeetingMode] = useState<'today' | 'random' | 'custom'>('today');
  const [meetingInfo, setMeetingInfo] = useState<VirtualMeetingInfo>(() =>
    calculateVirtualMeetingInfo('today')
  );
  const [copiedActivityId, setCopiedActivityId] = useState<string | null>(null);
  const [customDateInput, setCustomDateInput] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const handleModeChange = (mode: 'today' | 'random' | 'custom') => {
    soundManager.playTap();
    setMeetingMode(mode);
    if (mode === 'custom') {
      const selected = new Date(customDateInput);
      setMeetingInfo(calculateVirtualMeetingInfo('custom', selected));
    } else {
      setMeetingInfo(calculateVirtualMeetingInfo(mode));
    }
  };

  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomDateInput(val);
    const selected = new Date(val);
    if (!isNaN(selected.getTime())) {
      setMeetingInfo(calculateVirtualMeetingInfo('custom', selected));
    }
  };

  const handleCopyActivity = (activity: AnniversaryActivity) => {
    soundManager.playTap();
    navigator.clipboard.writeText(
      `🌹 فكرة للاحتفال بالذكرى الأولى مع «${partnerName}»:\n✨ ${activity.title} (${activity.category})\n📍 ${activity.location}\n💡 ${activity.description}`
    );
    setCopiedActivityId(activity.id);
    setTimeout(() => setCopiedActivityId(null), 2500);
  };

  return (
    <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5 text-center sm:text-right">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 6 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center shrink-0 shadow-md shadow-rose-500/20 cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h4 className="font-extrabold text-base sm:text-lg text-white font-['Alexandria']">
              تاريخ التعارف والذكرى السنوية الأولى
            </h4>
            <p className="text-xs text-gray-300">
              احسب موعد لقاء الأقدار الافتراضي وخطط لأجمل احتفال مع «{partnerName}»
            </p>
          </div>
        </div>

        {/* Mode Selector Buttons with Hover & Tap */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10 text-xs">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleModeChange('today')}
            className={`py-1.5 px-3 rounded-xl font-bold transition flex items-center gap-1 cursor-pointer ${
              meetingMode === 'today'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>تاريخ اليوم</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleModeChange('random')}
            className={`py-1.5 px-3 rounded-xl font-bold transition flex items-center gap-1 cursor-pointer ${
              meetingMode === 'random'
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>تاريخ قدري عشوائي</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleModeChange('custom')}
            className={`py-1.5 px-3 rounded-xl font-bold transition flex items-center gap-1 cursor-pointer ${
              meetingMode === 'custom'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>تاريخ مخصص</span>
          </motion.button>
        </div>
      </div>

      {/* Custom Date Input */}
      {meetingMode === 'custom' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs"
        >
          <span className="text-gray-300">حدد تاريخ التعارف الذي تفضله:</span>
          <input
            type="date"
            value={customDateInput}
            onChange={handleCustomDateChange}
            className="px-3 py-1.5 rounded-xl bg-[#16102a] border border-white/20 text-white text-xs focus:outline-none focus:border-rose-400 cursor-pointer"
          />
        </motion.div>
      )}

      {/* Date & Countdown Cards Grid with Hover & Tap animations */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Virtual Meeting Date Card */}
        <motion.div
          whileHover={{ scale: 1.03, y: -4, boxShadow: '0 12px 28px -6px rgba(244, 63, 94, 0.3)' }}
          whileTap={{ scale: 0.98 }}
          className="p-4 rounded-2xl bg-gradient-to-b from-rose-500/15 to-pink-500/5 border border-rose-500/30 space-y-1.5 relative overflow-hidden transition cursor-pointer"
        >
          <div className="text-xs text-rose-300 font-bold flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
            <span>تاريخ التعارف الافتراضي</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">
            {meetingInfo.dateString}
          </div>
          {meetingInfo.hijriString && (
            <div className="text-[11px] text-gray-300 font-medium">
              الموافق: {meetingInfo.hijriString}
            </div>
          )}
          <div className="text-[11px] text-amber-300/90 pt-1 border-t border-rose-500/20">
            {meetingInfo.season}
          </div>
        </motion.div>

        {/* 1st Anniversary Date */}
        <motion.div
          whileHover={{ scale: 1.03, y: -4, boxShadow: '0 12px 28px -6px rgba(245, 158, 11, 0.3)' }}
          whileTap={{ scale: 0.98 }}
          className="p-4 rounded-2xl bg-gradient-to-b from-amber-500/15 to-yellow-500/5 border border-amber-500/30 space-y-1.5 relative overflow-hidden transition cursor-pointer"
        >
          <div className="text-xs text-amber-300 font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>موعد الذكرى السنوية الأولى</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-['Alexandria']">
            {meetingInfo.anniversaryString}
          </div>
          <div className="text-[11px] text-gray-300 font-medium">
            مرور عام كامل على لقاء القلوب
          </div>
          <div className="text-[11px] text-emerald-300/90 pt-1 border-t border-amber-500/20">
            🎉 محطة التتويج وتجديد العهد
          </div>
        </motion.div>

        {/* Days Countdown */}
        <motion.div
          whileHover={{ scale: 1.03, y: -4, boxShadow: '0 12px 28px -6px rgba(139, 92, 246, 0.3)' }}
          whileTap={{ scale: 0.98 }}
          className="p-4 rounded-2xl bg-gradient-to-b from-violet-500/15 to-purple-500/5 border border-violet-500/30 space-y-1.5 relative overflow-hidden flex flex-col justify-between transition cursor-pointer"
        >
          <div>
            <div className="text-xs text-violet-300 font-bold flex items-center gap-1.5">
              <PartyPopper className="w-4 h-4 text-violet-400" />
              <span>العد التنازلي للذكرى الأولى</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-violet-300 font-['Alexandria'] mt-1">
              {meetingInfo.daysRemaining}{' '}
              <span className="text-sm font-normal text-gray-300">يوماً</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 pt-1 border-t border-violet-500/20">
            الوقت المثالي للبدء بالتحضير للاحتفال الكبير!
          </p>
        </motion.div>
      </div>

      {/* Suggested 1st Anniversary Activities Header */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-300 font-extrabold text-sm sm:text-base">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>أنشطة مقترحة للاحتفال بالذكرى الأولى مع «{partnerName}»:</span>
          </div>
          <span className="text-xs text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
            أفكار رومانسية مجربة
          </span>
        </div>

        {/* Activities Grid with Hover & Tap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DEFAULT_ANNIVERSARY_ACTIVITIES.map((activity) => (
            <motion.div
              key={activity.id}
              whileHover={{
                scale: 1.02,
                y: -4,
                borderColor: 'rgba(244, 63, 94, 0.45)',
                boxShadow: '0 12px 30px -8px rgba(0, 0, 0, 0.5)',
              }}
              whileTap={{ scale: 0.985 }}
              className="p-4 rounded-2xl bg-white/5 hover:bg-white/8 border border-white/10 space-y-2.5 transition flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0"
                    >
                      {ICON_MAP[activity.icon] || <Sparkles className="w-4 h-4 text-amber-300" />}
                    </motion.div>
                    <div>
                      <h5 className="font-bold text-sm text-white leading-tight">
                        {activity.title}
                      </h5>
                      <span className="text-[10px] font-semibold text-rose-400">
                        {activity.category}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {activity.description}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                  <span className="truncate">{activity.location}</span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-[10px] text-amber-300/90 font-medium">
                    ✨ {activity.vibe}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyActivity(activity);
                    }}
                    className="p-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 text-[11px] font-semibold flex items-center gap-1 transition cursor-pointer"
                  >
                    {copiedActivityId === activity.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-300" />
                        <span>نسخ الفكرة</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
