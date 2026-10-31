import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IntelligenceCategory,
  INTELLIGENCE_CATEGORIES,
} from '../data/intelligenceTestData';

interface Props {
  scores: Record<IntelligenceCategory, { percentage: number; rawScore: number }>;
  size?: number;
  highlightCategory?: IntelligenceCategory | null;
  onSelectCategory?: (category: IntelligenceCategory) => void;
}

export const IntelligenceRadarChart: React.FC<Props> = ({
  scores,
  size = 380,
  highlightCategory,
  onSelectCategory,
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<IntelligenceCategory | null>(null);

  const categories: IntelligenceCategory[] = [
    'linguistic',
    'logical',
    'spatial',
    'kinesthetic',
    'musical',
    'interpersonal',
    'intrapersonal',
    'naturalistic',
    'existential',
  ];

  const totalAxes = categories.length;
  const center = size / 2;
  const maxRadius = (size / 2) - 55; // Leave room for labels
  const levels = [0.25, 0.5, 0.75, 1.0];

  // Calculate coordinates on radar for a given index and normalized value (0 to 1)
  const getCoordinates = (index: number, value: number) => {
    // Start at top (-90 degrees) and rotate clockwise
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = maxRadius * value;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Generate polygon points for the scores
  const scorePoints = categories.map((cat, idx) => {
    const pct = (scores[cat]?.percentage || 10) / 100;
    return getCoordinates(idx, Math.max(0.1, Math.min(1.0, pct)));
  });

  const polygonPath = scorePoints.map((pt) => `${pt.x},${pt.y}`).join(' ');

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-[420px] mx-auto">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto overflow-visible filter drop-shadow-xl"
      >
        <defs>
          {/* Glowing Radar Gradient */}
          <linearGradient id="radarAreaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.45" />
          </linearGradient>

          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 1. Concentric Background Polygons (25%, 50%, 75%, 100%) */}
        {levels.map((level, lvlIdx) => {
          const levelPoints = categories
            .map((_, idx) => {
              const { x, y } = getCoordinates(idx, level);
              return `${x},${y}`;
            })
            .join(' ');

          return (
            <g key={lvlIdx}>
              <polygon
                points={levelPoints}
                fill={lvlIdx === levels.length - 1 ? 'rgba(15, 23, 42, 0.6)' : 'none'}
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth={lvlIdx === levels.length - 1 ? '1.5' : '1'}
                strokeDasharray={lvlIdx < levels.length - 1 ? '3,3' : undefined}
              />
              {/* Level indicator text */}
              <text
                x={center + 4}
                y={center - maxRadius * level + 11}
                fill="rgba(148, 163, 184, 0.6)"
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {Math.round(level * 100)}%
              </text>
            </g>
          );
        })}

        {/* 2. Radial Axis Lines */}
        {categories.map((cat, idx) => {
          const { x, y } = getCoordinates(idx, 1.0);
          const meta = INTELLIGENCE_CATEGORIES[cat];
          const isHighlighted = highlightCategory === cat || hoveredCategory === cat;

          return (
            <line
              key={cat}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke={isHighlighted ? meta.color : 'rgba(255, 255, 255, 0.15)'}
              strokeWidth={isHighlighted ? '2' : '1'}
              className="transition-all duration-300"
            />
          );
        })}

        {/* 3. The Filled Player Result Polygon */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          points={polygonPath}
          fill="url(#radarAreaGradient)"
          stroke="#a855f7"
          strokeWidth="2.5"
          filter="url(#radarGlow)"
        />

        {/* 4. Data Vertex Points with Pulsing Circles */}
        {categories.map((cat, idx) => {
          const pt = scorePoints[idx];
          const meta = INTELLIGENCE_CATEGORIES[cat];
          const isHighlighted = highlightCategory === cat || hoveredCategory === cat;
          const pct = scores[cat]?.percentage || 0;

          return (
            <g
              key={cat}
              className="cursor-pointer transition-transform"
              onMouseEnter={() => setHoveredCategory(cat)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => onSelectCategory && onSelectCategory(cat)}
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r={isHighlighted ? '7' : '5'}
                fill={meta.color}
                stroke="#ffffff"
                strokeWidth="2"
                className="transition-all duration-200"
              />
              {isHighlighted && (
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="12"
                  fill={meta.color}
                  opacity="0.35"
                  className="animate-ping"
                />
              )}
            </g>
          );
        })}

        {/* 5. Axis Labels & Percentages */}
        {categories.map((cat, idx) => {
          const { x, y } = getCoordinates(idx, 1.22);
          const meta = INTELLIGENCE_CATEGORIES[cat];
          const pct = scores[cat]?.percentage || 0;
          const isHighlighted = highlightCategory === cat || hoveredCategory === cat;

          return (
            <g
              key={`label_${cat}`}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredCategory(cat)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => onSelectCategory && onSelectCategory(cat)}
            >
              {/* Category Icon & Short Name */}
              <text
                x={x}
                y={y - 8}
                textAnchor="middle"
                fontSize="14"
                className="transition-transform duration-200"
              >
                {meta.icon}
              </text>
              <text
                x={x}
                y={y + 7}
                textAnchor="middle"
                fill={isHighlighted ? '#ffffff' : '#cbd5e1'}
                fontSize="11"
                fontWeight={isHighlighted ? '800' : '600'}
                fontFamily="Alexandria, sans-serif"
                className="transition-colors duration-200"
              >
                {meta.titleAr.split(' ')[1] || meta.titleAr}
              </text>
              {/* Percentage Badge */}
              <text
                x={x}
                y={y + 20}
                textAnchor="middle"
                fill={meta.color}
                fontSize="11"
                fontWeight="900"
                fontFamily="monospace"
              >
                {pct}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Info Pill on Hover */}
      {hoveredCategory && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-purple-500/40 text-center shadow-lg backdrop-blur-md"
        >
          <span className="text-xs font-bold text-white">
            {INTELLIGENCE_CATEGORIES[hoveredCategory].icon}{' '}
            {INTELLIGENCE_CATEGORIES[hoveredCategory].titleAr}:{' '}
          </span>
          <span className="text-xs font-black text-rose-400 font-mono">
            {scores[hoveredCategory]?.percentage}%
          </span>
        </motion.div>
      )}
    </div>
  );
};
