import React, { useMemo } from 'react';
import { PartnerAnalysisResult, UserProfile } from '../types';
import {
  getCompatibilityRecommendations,
  ResolvedTestCard,
} from '../data/recommendationsMapping';
import { NextStepRecommendations } from './NextStepRecommendations';

interface Props {
  result: PartnerAnalysisResult;
  profile: UserProfile;
  onOpenPsychologyTests?: () => void;
  onOpenIntelligenceTests?: () => void;
  onOpenArticles?: (articleId?: string) => void;
  onOpenNovels?: (novelId?: string) => void;
}

export const SmartRecommendationsSection: React.FC<Props> = ({
  result,
}) => {
  const bundle = useMemo(() => getCompatibilityRecommendations(result), [result]);

  const handleLaunchTest = (testCard: ResolvedTestCard) => {
    window.dispatchEvent(new CustomEvent('mirat:launch-test', { detail: testCard }));
    return true;
  };

  return (
    <div className="space-y-4">
      <NextStepRecommendations
        bundle={bundle}
        onLaunchTest={handleLaunchTest}
        forceDark
      />

      {/* Explicit Scientific Disclaimer Under Results */}
      <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-emerald-300">
          <span>⚖️ إخلاء مسؤولية علمي وتوعوي:</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400">
          هذه النتائج والتوصيات مقدمة لأغراض الإرشاد الذاتي والتوافق المعرفي والإثراء الإنساني؛ ولا تشكل بأي حال من الأحوال تشخيصاً عيادياً أو طبياً نفسياً. كل شخص يتميز بتفرده ومرونته النفسية المستمرة في التطور والنمو.
        </p>
      </div>
    </div>
  );
};
