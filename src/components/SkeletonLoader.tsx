import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  type?: 'history_card' | 'result_card' | 'profile_stats' | 'chart';
  count?: number;
}

export const SkeletonLoader: React.FC<Props> = ({
  type = 'history_card',
  count = 3,
}) => {
  const items = Array.from({ length: count });

  if (type === 'history_card') {
    return (
      <div className="space-y-3 w-full" dir="rtl">
        {items.map((_, i) => (
          <div
            key={i}
            className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 animate-pulse space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800" />
                <div className="space-y-1.5">
                  <div className="w-36 h-4 bg-slate-800 rounded-md" />
                  <div className="w-24 h-3 bg-slate-800/60 rounded-md" />
                </div>
              </div>
              <div className="w-16 h-7 bg-slate-800 rounded-xl" />
            </div>

            <div className="flex gap-2 pt-1">
              <div className="w-20 h-5 bg-slate-800/70 rounded-lg" />
              <div className="w-24 h-5 bg-slate-800/70 rounded-lg" />
              <div className="w-16 h-5 bg-slate-800/70 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'profile_stats') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full animate-pulse" dir="rtl">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-slate-800" />
            <div className="w-16 h-5 bg-slate-800 rounded-md" />
            <div className="w-24 h-3 bg-slate-800/60 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 animate-pulse space-y-4 w-full" dir="rtl">
        <div className="w-40 h-5 bg-slate-800 rounded-md" />
        <div className="w-full h-48 bg-slate-800/40 rounded-2xl flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-4 border-slate-800 border-dashed" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 animate-pulse space-y-3 w-full" dir="rtl">
      <div className="w-48 h-5 bg-slate-800 rounded-md" />
      <div className="w-full h-3 bg-slate-800/60 rounded-md" />
      <div className="w-3/4 h-3 bg-slate-800/60 rounded-md" />
    </div>
  );
};
