import {
  AnalysisTier,
  PsychologicalConstructKey,
  SubscaleScoreResult,
  TieredAssessmentQuestion,
  TieredAssessmentReport,
  VisualChartsPayload,
} from '../types';
import {
  ANALYSIS_TIERS_CATALOG,
  CONSTRUCT_SCIENTIFIC_CATALOG,
  getQuestionsForAnalysisTier,
} from '../data/tieredPsychologyBank';

export type TieredAnswersMap = Record<string, number | 'A' | 'B'>;

export interface TieredAutoSaveState {
  tier: AnalysisTier;
  answers: TieredAnswersMap;
  currentIndex: number;
  isPaused: boolean;
  updatedAt: string;
}

const AUTOSAVE_PREFIX = 'mirat_tiered_autosave_';

export const NON_CLINICAL_DISCLAIMER_AR =
  'ملاحظة علمية وأخلاقية هامة: هذه الاختبارات النفسية مصممة لأغراض الاستكشاف الذاتي والوعي العلائقي المبني على النظريات السيكومترية الرصينة، وتحتمل الخطأ الإحصائي والتغير الموقفي، وليست بأي حال اختبارات طبية أو تشخيصات سريرية.';

export const NON_CLINICAL_DISCLAIMER_EN =
  'Scientific Notice: These psychometric assessments are designed for self-exploration and relational awareness based on established psychological models. Results carry statistical margin of error and do NOT constitute medical or clinical diagnoses.';

export function saveTieredProgressAutoSave(state: TieredAutoSaveState): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(`${AUTOSAVE_PREFIX}${state.tier}`, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

export function loadTieredProgressAutoSave(tier: AnalysisTier): TieredAutoSaveState | null {
  try {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(`${AUTOSAVE_PREFIX}${tier}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as TieredAutoSaveState;
    if (parsed && parsed.tier === tier && parsed.answers && typeof parsed.currentIndex === 'number') {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function clearTieredProgressAutoSave(tier: AnalysisTier): void {
  try {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(`${AUTOSAVE_PREFIX}${tier}`);
  } catch {
    // Ignore
  }
}

interface SubscaleMetaInfo {
  construct: PsychologicalConstructKey;
  labelAr: string;
  labelEn: string;
  color: string;
  explanationAr: string;
  reference: string;
  isReversePositive?: boolean;
}

const SUBSCALE_METADATA: Record<string, SubscaleMetaInfo> = {
  // Big Five
  bf_openness: {
    construct: 'big_five',
    labelAr: 'الانفتاح الفكري والجمالي (O)',
    labelEn: 'Openness to Experience',
    color: '#8b5cf6',
    explanationAr: 'الفضول المعرفي، الخيال الإبداعي، والانفتاح على الأفكار الجديدة.',
    reference: 'Costa & McCrae (1992) NEO-PI-R',
  },
  bf_conscientiousness: {
    construct: 'big_five',
    labelAr: 'يقظة الضمير والانضباط (C)',
    labelEn: 'Conscientiousness',
    color: '#6366f1',
    explanationAr: 'المسؤولية، التخطيط المنظم، الإتقان، والوفاء بالالتزامات.',
    reference: 'Costa & McCrae (1992) NEO-PI-R',
  },
  bf_extraversion: {
    construct: 'big_five',
    labelAr: 'الانبساط والحيوية الاجتماعية (E)',
    labelEn: 'Extraversion',
    color: '#ec4899',
    explanationAr: 'الحماس الاجتماعي، الدفء التعبيري، وتوليد الطاقة عبر التفاعل.',
    reference: 'Costa & McCrae (1992) NEO-PI-R',
  },
  bf_agreeableness: {
    construct: 'big_five',
    labelAr: 'الوفاق واللطف العلائقي (A)',
    labelEn: 'Agreeableness',
    color: '#10b981',
    explanationAr: 'التعاون، الرأفة، التواضع التفاعلي، والسعي للوئام.',
    reference: 'Costa & McCrae (1992) NEO-PI-R',
  },
  bf_emotional_stability: {
    construct: 'big_five',
    labelAr: 'الاتزان الانفعالي (ES)',
    labelEn: 'Emotional Stability',
    color: '#06b6d4',
    explanationAr: 'الهدوء الداخلي، المرونة أمام التوتر، وثبات المزاج.',
    reference: 'Goldberg (1999) IPIP Big Five',
  },

  // HEXACO
  hx_honesty_humility: {
    construct: 'hexaco',
    labelAr: 'الصدق والنزاهة والتواضع (H)',
    labelEn: 'Honesty-Humility',
    color: '#06b6d4',
    explanationAr: 'الإخلاص، تجنب التلاعب والمصلحية، التواضع، والنزاهة الأخلاقية.',
    reference: 'Ashton & Lee (2004) HEXACO-PI-R',
  },
  hx_emotionality: {
    construct: 'hexaco',
    labelAr: 'الرهافة والارتباط العاطفي (E)',
    labelEn: 'HEXACO Emotionality',
    color: '#f43f5e',
    explanationAr: 'الحساسية الوجدانية، طلب القرب، والتعلق العاطفي بالآخرين.',
    reference: 'Ashton & Lee (2004) HEXACO-PI-R',
  },
  hx_extraversion: {
    construct: 'hexaco',
    labelAr: 'الثقة الاجتماعية والجرأة (X)',
    labelEn: 'HEXACO Extraversion',
    color: '#a855f7',
    explanationAr: 'تقدير الذات الاجتماعي، المبادرة القيادية، والحيوية.',
    reference: 'Ashton & Lee (2004) HEXACO-PI-R',
  },
  hx_agreeableness: {
    construct: 'hexaco',
    labelAr: 'المسامحة وحلم الطبع (A)',
    labelEn: 'HEXACO Agreeableness',
    color: '#10b981',
    explanationAr: 'التسامح، الصبر، ولين الجانب عند الخلاف والخطأ.',
    reference: 'Ashton & Lee (2004) HEXACO-PI-R',
  },
  hx_conscientiousness: {
    construct: 'hexaco',
    labelAr: 'الاجتهاد والحكمة التنظيمية (C)',
    labelEn: 'HEXACO Conscientiousness',
    color: '#3b82f6',
    explanationAr: 'التنظيم، التأني قبل اتخاذ القرار، والمثابرة العملية.',
    reference: 'Ashton & Lee (2004) HEXACO-PI-R',
  },
  hx_openness: {
    construct: 'hexaco',
    labelAr: 'الاستكشاف الفكري والجمالي (O)',
    labelEn: 'HEXACO Openness',
    color: '#8b5cf6',
    explanationAr: 'تذوق المعرفة والفن، والمرونة الفكرية.',
    reference: 'Ashton & Lee (2004) HEXACO-PI-R',
  },

  // Attachment
  att_anxiety: {
    construct: 'attachment',
    labelAr: 'قلق التعلق والهجر',
    labelEn: 'Attachment Anxiety',
    color: '#f59e0b',
    explanationAr: 'مستوى القلق بشأن الاستجابة العاطفية والحاجة لطمأنة متكررة (القيم الأقل تشير لأمان أعلى).',
    reference: 'Fraley et al. (2000) ECR-R',
    isReversePositive: true,
  },
  att_avoidance: {
    construct: 'attachment',
    labelAr: 'تجنب القرب العاطفي',
    labelEn: 'Attachment Avoidance',
    color: '#f97316',
    explanationAr: 'درجة الانكفاء الذاتي أو التردد في البوح والاعتماد العاطفي المتبادل (القيم الأقل تشير لانفتاح آمن).',
    reference: 'Fraley et al. (2000) ECR-R',
    isReversePositive: true,
  },
  att_security: {
    construct: 'attachment',
    labelAr: 'الأمان العاطفي المكتسب',
    labelEn: 'Attachment Security',
    color: '#10b981',
    explanationAr: 'الثقة العاطفية، راحة القرب، وتوازن الاستقلالية والارتباط.',
    reference: 'Bowlby (1969) & Ainsworth (1978)',
  },

  // Emotional Intelligence
  ei_self_awareness: {
    construct: 'emotional_intelligence',
    labelAr: 'الوعي العاطفي بالذات',
    labelEn: 'Emotional Self-Awareness',
    color: '#ec4899',
    explanationAr: 'القدرة على تسمية المشاعر بدقة وفهم محركاتها الداخلية.',
    reference: 'Salovey & Mayer (1990) MSCEIT',
  },
  ei_empathy: {
    construct: 'emotional_intelligence',
    labelAr: 'التعاطف وفهم الآخر',
    labelEn: 'Empathetic Decoding',
    color: '#db2777',
    explanationAr: 'قراءة مشاعر الشريك والتناغم معها دون أحكام.',
    reference: 'Goleman (1995) & Bar-On (1997)',
  },
  ei_regulation: {
    construct: 'emotional_intelligence',
    labelAr: 'إدارة الانفعالات وتوظيفها',
    labelEn: 'Emotion Regulation & Use',
    color: '#f43f5e',
    explanationAr: 'توجيه الانفعالات لبناء الحوار ومنع التصعيد الهدّام.',
    reference: 'Salovey & Mayer (1990) MSCEIT',
  },
  ei_social_skill: {
    construct: 'emotional_intelligence',
    labelAr: 'المهارة الاجتماعية والاحتواء',
    labelEn: 'Social & Relational Skill',
    color: '#8b5cf6',
    explanationAr: 'بناء الألفة، التهدئة العاطفية، وتعزيز التقارب المستدام.',
    reference: 'Bar-On (1997) EQ-i',
  },

  // Self Regulation
  sr_cognitive_reappraisal: {
    construct: 'self_regulation',
    labelAr: 'إعادة التقييم المعرفي',
    labelEn: 'Cognitive Reappraisal',
    color: '#f59e0b',
    explanationAr: 'إعادة تأطير المواقف الضاغطة بتفكير متزن وهادئ.',
    reference: 'Gross (1998) Emotion Regulation',
  },
  sr_impulse_control: {
    construct: 'self_regulation',
    labelAr: 'ضبط الاندفاع والتأني',
    labelEn: 'Impulse Control',
    color: '#d97706',
    explanationAr: 'تأخير ردود الفعل الحادة والتثبت قبل النطق أو القرار.',
    reference: 'Baumeister & Vohs (2004)',
  },
  sr_stress_resilience: {
    construct: 'self_regulation',
    labelAr: 'الصلابة أمام الضغوط',
    labelEn: 'Stress Resilience',
    color: '#eab308',
    explanationAr: 'القدرة على التعافي العصبي والنفسي عند الأعباء الثقيلة.',
    reference: 'Gross (1998) & Connor-Davidson',
  },
  sr_goal_persistence: {
    construct: 'self_regulation',
    labelAr: 'المثابرة والاستمرارية',
    labelEn: 'Goal Persistence',
    color: '#84cc16',
    explanationAr: 'الالتزام طويل الأمد بالأهداف والمشاريع المشتركة.',
    reference: 'Baumeister & Vohs (2004)',
  },

  // Interpersonal
  int_trust_commitment: {
    construct: 'interpersonal',
    labelAr: 'الثقة والميثاق العلائقي',
    labelEn: 'Relational Trust & Commitment',
    color: '#10b981',
    explanationAr: 'الاعتمادية، حفظ السر، والوفاء بالعهد في السراء والضراء.',
    reference: 'Gottman (1999) Trust Metric',
  },
  int_boundaries: {
    construct: 'interpersonal',
    labelAr: 'الحدود الصحية والاستقلالية',
    labelEn: 'Healthy Family Boundaries',
    color: '#059669',
    explanationAr: 'التمايز النفسي وصيانة خصوصية الأسرة تجاه التدخلات.',
    reference: 'Bowen (1978) Family Systems',
  },
  int_parenting_family: {
    construct: 'interpersonal',
    labelAr: 'التوجه التربوي والأسري',
    labelEn: 'Parenting & Family Orientation',
    color: '#14b8a6',
    explanationAr: 'رؤية التربية المتوازنة وبناء بيئة أسرية دافئة للأبناء.',
    reference: 'Baumrind & Bowen Family Systems',
  },
  int_repair_synergy: {
    construct: 'interpersonal',
    labelAr: 'القدرة على الإصلاح والتكامل',
    labelEn: 'Repair & Dyadic Synergy',
    color: '#0d9488',
    explanationAr: 'مبادرات المصالحة والتكامل العملي بعد الخلافات.',
    reference: 'Gottman (1999) Repair Attempts',
  },

  // Communication & Conflict
  com_assertive: {
    construct: 'communication',
    labelAr: 'التواصل الحازم المحترم',
    labelEn: 'Assertive Communication',
    color: '#3b82f6',
    explanationAr: 'التعبير عن الحقوق والاحتياجات بوضوح دون عدوانية أو صمت.',
    reference: 'Rosenberg (2003) NVC',
  },
  com_reflective: {
    construct: 'communication',
    labelAr: 'الإنصات التأملي الفعال',
    labelEn: 'Reflective Listening',
    color: '#2563eb',
    explanationAr: 'الاستماع المتعمق، التحقق من الفهم، وتجنب المقاطعة.',
    reference: 'Rogers & Rosenberg NVC',
  },
  com_collaborating: {
    construct: 'communication',
    labelAr: 'التعاون التفاوضي في النزاعات',
    labelEn: 'Collaborative Conflict Resolution',
    color: '#0284c7',
    explanationAr: 'تحويل التعارض إلى حل تكاملي يرضي حاجات الطرفين.',
    reference: 'Thomas & Kilmann (1974) TKI',
  },
  com_analytical: {
    construct: 'communication',
    labelAr: 'الوضوح التحليلي والمنطقي',
    labelEn: 'Analytical Dialogue Clarity',
    color: '#4f46e5',
    explanationAr: 'تنظيم الأفكار والمناقشة الموضوعية البعيدة عن الشخصنة.',
    reference: 'Burleson Relational Communication',
  },
  com_expressive: {
    construct: 'communication',
    labelAr: 'التعبير الوجداني الدافئ',
    labelEn: 'Warm Expressiveness',
    color: '#ec4899',
    explanationAr: 'إظهار التقدير والامتنان والمودة بالكلام والمبادرة.',
    reference: 'Gottman Fondness & Admiration',
  },

  // Positive Psychology
  pp_values_meaning: {
    construct: 'positive_psychology',
    labelAr: 'القيم الجوهرية ومعنى الحياة',
    labelEn: 'Core Values & Meaning',
    color: '#14b8a6',
    explanationAr: 'وضوح البوصلة الأخلاقية والعيش وفق مبادئ نبيلة.',
    reference: 'Schwartz (1992) Values & Seligman PERMA',
  },
  pp_optimism_gratitude: {
    construct: 'positive_psychology',
    labelAr: 'التفاؤل الواقعي والامتنان',
    labelEn: 'Learned Optimism & Gratitude',
    color: '#10b981',
    explanationAr: 'تقدير النعم، حسن الظن، وصناعة الأمل التشاركي.',
    reference: 'Seligman (2011) PERMA',
  },
  pp_life_goals: {
    construct: 'positive_psychology',
    labelAr: 'وضوح أهداف الحياة والمستقبل',
    labelEn: 'Life Goals Alignment',
    color: '#06b6d4',
    explanationAr: 'التخطيط المستقبلي المتوازن بين الأسرة والطموح الشخصي.',
    reference: 'Emmons Personal Strivings & PERMA',
  },
  pp_resilience_flourishing: {
    construct: 'positive_psychology',
    labelAr: 'الازدهار والنمو النفسي',
    labelEn: 'Psychological Flourishing',
    color: '#22c55e',
    explanationAr: 'الشعور بالحيوية، العافية الروحية، والقدرة على الازدهار.',
    reference: 'Keyes & Seligman Flourishing',
  },
};

function clampPct(n: number): number {
  if (!Number.isFinite(n)) return 50;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function pctToSten(pct: number): number {
  const safe = clampPct(pct);
  const sten = Math.round(1 + (safe / 100) * 9);
  return Math.max(1, Math.min(10, sten));
}

function pctToTScore(pct: number): number {
  const safe = clampPct(pct);
  // Maps 0 -> 25, 50 -> 50, 100 -> 75 smoothly within normative clinical bounds [20..80]
  return Math.max(20, Math.min(80, Math.round(25 + (safe / 100) * 50)));
}

function pctToPercentile(pct: number): number {
  const safe = clampPct(pct);
  if (safe <= 2) return 1;
  if (safe >= 98) return 99;
  return Math.max(1, Math.min(99, Math.round(safe)));
}

function interpretSubscaleScore(meta: SubscaleMetaInfo, pct: number): { ar: string; en: string } {
  if (meta.isReversePositive) {
    if (pct >= 68) {
      return {
        ar: `مؤشر مرتفع (${pct}%): يُنصح بتعزيز الأمان العاطفي عبر الحوار التطميني الهادئ وبناء الثقة التدريجية.`,
        en: `Elevated (${pct}%): Reassurance-focused dialogue and gradual emotional safety habits are beneficial.`,
      };
    }
    if (pct >= 38) {
      return {
        ar: `مستوى متوسط (${pct}%): استجابة موقفية طبيعية تتوازن بالوضوح والتفاهم المتبادل.`,
        en: `Moderate (${pct}%): Situational reactivity balanced through transparent mutual communication.`,
      };
    }
    return {
      ar: `مؤشر منخفض مريح (${pct}%): يعكس طمأنينة عالية واستقراراً ارتباطياً متيناً.`,
      en: `Low & Secure (${pct}%): Indicates grounded emotional confidence and secure relational ease.`,
    };
  }

  if (pct >= 72) {
    return {
      ar: `مستوى مرتفع متميز (${pct}%): يمثل إحدى الركائز القيادية والوجدانية القوية في شخصيتك.`,
      en: `High Strength (${pct}%): Represents a core pillar of your psychological and relational profile.`,
    };
  }
  if (pct >= 45) {
    return {
      ar: `مستوى متزن معتدل (${pct}%): مرونة تكيفية متزنة تتيح التناغم مع مختلف الأنماط البشرية.`,
      en: `Balanced Moderate (${pct}%): Adaptive flexibility supporting harmony across varied contexts.`,
    };
  }
  return {
    ar: `مستوى نامٍ قابل للتطوير (${pct}%): مساحة واعدة للتنمية الذاتية ورفع الكفاءة التفاعلية.`,
    en: `Developing Area (${pct}%): A focused opportunity for intentional personal and relational growth.`,
  };
}

export function validateTierReportCompleteness(
  tier: AnalysisTier,
  questions: TieredAssessmentQuestion[],
  answers: TieredAnswersMap
): {
  isComplete: boolean;
  answeredCount: number;
  totalCount: number;
  missingIds: string[];
  reasonAr?: string;
} {
  const missingIds: string[] = [];
  for (const q of questions) {
    const ans = answers[q.id];
    if (q.format === 'forced_choice') {
      if (ans !== 'A' && ans !== 'B') {
        missingIds.push(q.id);
      }
    } else {
      const num = typeof ans === 'number' ? ans : Number(ans);
      if (!Number.isFinite(num) || num < 1 || num > 5) {
        missingIds.push(q.id);
      }
    }
  }

  const isComplete = missingIds.length === 0 && questions.length > 0;
  return {
    isComplete,
    answeredCount: questions.length - missingIds.length,
    totalCount: questions.length,
    missingIds,
    reasonAr: !isComplete
      ? `يتطلب اعتماد تقرير «${ANALYSIS_TIERS_CATALOG.find((t) => t.id === tier)?.titleAr || tier}» إكمال جميع الأسئلة (${questions.length - missingIds.length} من أصل ${questions.length} مكتملة). يمنع نظام الضبط العلمي إصدار تقرير ناقص البيانات.`
      : undefined,
  };
}

export function calculateTieredPsychometricReport(
  tier: AnalysisTier,
  answers: TieredAnswersMap,
  userName = 'المستخدم',
  options?: { allowPartialForTest?: boolean }
): TieredAssessmentReport {
  const tierMeta =
    ANALYSIS_TIERS_CATALOG.find((t) => t.id === tier) || ANALYSIS_TIERS_CATALOG[0];
  const questions = getQuestionsForAnalysisTier(tier);
  const validation = validateTierReportCompleteness(tier, questions, answers);

  if (tier === 'professional' && !validation.isComplete && !options?.allowPartialForTest) {
    throw new Error(
      validation.reasonAr ||
        'يمنع الوصول لتقرير التحليل الاحترافي قبل استكمال كافة الأسئلة الـ 288 لضمان الدقة السيكومترية.'
    );
  }

  // Accumulators per subscale
  const acc: Record<
    string,
    { sum: number; minSum: number; maxSum: number; count: number; values: number[] }
  > = {};

  Object.keys(SUBSCALE_METADATA).forEach((k) => {
    acc[k] = { sum: 0, minSum: 0, maxSum: 0, count: 0, values: [] };
  });

  questions.forEach((q) => {
    const rawAns = answers[q.id];
    if (q.format === 'forced_choice' && q.forcedOptions) {
      const optA = q.forcedOptions[0];
      const optB = q.forcedOptions[1];
      const minV = Math.min(optA.scoreValue, optB.scoreValue);
      const maxV = Math.max(optA.scoreValue, optB.scoreValue);
      const chosen =
        rawAns === 'A'
          ? optA
          : rawAns === 'B'
          ? optB
          : null;

      if (chosen) {
        const target = acc[chosen.targetSubscale] ? chosen.targetSubscale : q.subscale;
        const bucket = acc[target] || (acc[target] = { sum: 0, minSum: 0, maxSum: 0, count: 0, values: [] });
        bucket.sum += chosen.scoreValue;
        bucket.minSum += Math.min(minV, 1);
        bucket.maxSum += Math.max(maxV, 5);
        bucket.count += 1;
        bucket.values.push(chosen.scoreValue);
      }
      return;
    }

    // Likert 1..5
    const numRaw = typeof rawAns === 'number' ? rawAns : Number(rawAns);
    if (!Number.isFinite(numRaw) || numRaw < 1 || numRaw > 5) return;

    const scored = q.direction === -1 ? 6 - numRaw : numRaw;
    const bucket = acc[q.subscale] || (acc[q.subscale] = { sum: 0, minSum: 0, maxSum: 0, count: 0, values: [] });
    bucket.sum += scored;
    bucket.minSum += 1;
    bucket.maxSum += 5;
    bucket.count += 1;
    bucket.values.push(scored);
  });

  // Convert subscale accumulators to full standardized results
  const subscaleMap: Record<string, SubscaleScoreResult> = {};
  const subscales: SubscaleScoreResult[] = [];

  Object.entries(SUBSCALE_METADATA).forEach(([key, meta]) => {
    const b = acc[key];
    let percentage = 50;
    let rawScore = 0;
    let maxRawScore = 0;

    if (b && b.count > 0 && b.maxSum > b.minSum) {
      percentage = clampPct(((b.sum - b.minSum) / (b.maxSum - b.minSum)) * 100);
      rawScore = b.sum;
      maxRawScore = b.maxSum;
    } else if (b && b.count > 0 && b.maxSum === b.minSum) {
      percentage = b.sum >= b.maxSum ? 100 : 0;
      rawScore = b.sum;
      maxRawScore = b.maxSum;
    } else {
      // Fallback: derive coherently from other answered items within the same construct if tier omitted sub-bucket
      const peerVals = Object.entries(acc)
        .filter(([pk, pb]) => SUBSCALE_METADATA[pk]?.construct === meta.construct && pb.count > 0 && pb.maxSum > pb.minSum)
        .map(([, pb]) => ((pb.sum - pb.minSum) / (pb.maxSum - pb.minSum)) * 100);
      if (peerVals.length > 0) {
        percentage = clampPct(peerVals.reduce((s, v) => s + v, 0) / peerVals.length);
      }
    }

    const interp = interpretSubscaleScore(meta, percentage);
    const entry: SubscaleScoreResult = {
      key,
      construct: meta.construct,
      labelAr: meta.labelAr,
      labelEn: meta.labelEn,
      rawScore,
      maxRawScore,
      percentage,
      stenScore: pctToSten(percentage),
      percentile: pctToPercentile(percentage),
      tScore: pctToTScore(percentage),
      scientificReference: meta.reference,
      dimensionExplanationAr: meta.explanationAr,
      interpretationAr: interp.ar,
      interpretationEn: interp.en,
      color: meta.color,
    };
    subscaleMap[key] = entry;
    subscales.push(entry);
  });

  const getPct = (k: string) => subscaleMap[k]?.percentage ?? 50;

  // Compute consistency index from paired forward vs reverse variance within constructs (deterministic!)
  const constructSpreads: number[] = [];
  (['big_five', 'hexaco', 'attachment', 'emotional_intelligence', 'self_regulation', 'interpersonal', 'communication', 'positive_psychology'] as PsychologicalConstructKey[]).forEach((ck) => {
    const items = questions.filter((q) => q.construct === ck && q.format === 'likert' && answers[q.id] !== undefined);
    if (items.length >= 2) {
      const vals = items.map((q) => {
        const r = Number(answers[q.id]);
        return q.direction === -1 ? 6 - r : r;
      });
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      const variance = vals.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / vals.length;
      constructSpreads.push(Math.sqrt(variance));
    }
  });
  const avgSD = constructSpreads.length > 0 ? constructSpreads.reduce((a, b) => a + b, 0) / constructSpreads.length : 0.8;
  // Low within-construct SD => high consistency (clamped cleanly 62..99%)
  const consistencyIndex = clampPct(98 - avgSD * 16);

  // Domain aggregates
  const attAnxiety = getPct('att_anxiety');
  const attAvoidance = getPct('att_avoidance');
  const attSecurityDirect = getPct('att_security');
  // Attachment quadrant classification (Fraley ECR-R 50% median cutoffs)
  let attStyleKey: VisualChartsPayload['attachment']['styleKey'] = 'secure';
  let attStyleAr = 'نمط التعلق الآمن (Secure Attachment)';
  let attStyleEn = 'Secure Attachment';

  if (attAnxiety >= 52 && attAvoidance >= 52) {
    attStyleKey = 'fearful';
    attStyleAr = 'نمط التعلق القلق-التجنبي الحذر (Fearful-Avoidant)';
    attStyleEn = 'Fearful-Avoidant Attachment';
  } else if (attAnxiety >= 52) {
    attStyleKey = 'anxious';
    attStyleAr = 'نمط التعلق القلق المتعطش للطمانينة (Anxious-Preoccupied)';
    attStyleEn = 'Anxious-Preoccupied Attachment';
  } else if (attAvoidance >= 52) {
    attStyleKey = 'avoidant';
    attStyleAr = 'نمط التعلق التجنبي المكتفي ذاتياً (Dismissive-Avoidant)';
    attStyleEn = 'Dismissive-Avoidant Attachment';
  }

  const effectiveAttachmentSecurity = clampPct(
    (attSecurityDirect * 0.45 + (100 - attAnxiety) * 0.275 + (100 - attAvoidance) * 0.275)
  );

  // 8-construct averages for Overall Radar
  const constructScores: Record<PsychologicalConstructKey, number> = {
    big_five: clampPct(
      (getPct('bf_openness') +
        getPct('bf_conscientiousness') +
        getPct('bf_extraversion') +
        getPct('bf_agreeableness') +
        getPct('bf_emotional_stability')) /
        5
    ),
    hexaco: clampPct(
      (getPct('hx_honesty_humility') +
        getPct('hx_agreeableness') +
        getPct('hx_conscientiousness') +
        getPct('hx_openness') +
        getPct('hx_extraversion') +
        (100 - Math.abs(getPct('hx_emotionality') - 55) * 0.5)) /
        6
    ),
    attachment: effectiveAttachmentSecurity,
    emotional_intelligence: clampPct(
      (getPct('ei_self_awareness') +
        getPct('ei_empathy') +
        getPct('ei_regulation') +
        getPct('ei_social_skill')) /
        4
    ),
    self_regulation: clampPct(
      (getPct('sr_cognitive_reappraisal') +
        getPct('sr_impulse_control') +
        getPct('sr_stress_resilience') +
        getPct('sr_goal_persistence')) /
        4
    ),
    interpersonal: clampPct(
      (getPct('int_trust_commitment') +
        getPct('int_boundaries') +
        getPct('int_parenting_family') +
        getPct('int_repair_synergy')) /
        4
    ),
    communication: clampPct(
      (getPct('com_assertive') +
        getPct('com_reflective') +
        getPct('com_collaborating') +
        getPct('com_analytical') +
        getPct('com_expressive')) /
        5
    ),
    positive_psychology: clampPct(
      (getPct('pp_values_meaning') +
        getPct('pp_optimism_gratitude') +
        getPct('pp_life_goals') +
        getPct('pp_resilience_flourishing')) /
        4
    ),
  };

  const overallMaturityIndex = clampPct(
    (constructScores.emotional_intelligence * 0.16 +
      constructScores.self_regulation * 0.14 +
      constructScores.attachment * 0.14 +
      constructScores.communication * 0.14 +
      constructScores.interpersonal * 0.14 +
      constructScores.positive_psychology * 0.12 +
      getPct('hx_honesty_humility') * 0.08 +
      getPct('bf_conscientiousness') * 0.08)
  );

  // Thomas-Kilmann 5 Conflict Resolution Modes synthesized deterministically
  const collab = clampPct(getPct('com_collaborating') * 0.65 + getPct('int_repair_synergy') * 0.35);
  const comprom = clampPct(getPct('bf_agreeableness') * 0.5 + getPct('com_assertive') * 0.5);
  const accom = clampPct(getPct('hx_agreeableness') * 0.55 + (100 - getPct('com_assertive')) * 0.45);
  const compet = clampPct(getPct('com_assertive') * 0.5 + (100 - getPct('bf_agreeableness')) * 0.5);
  const avoidMode = clampPct(attAvoidance * 0.6 + (100 - getPct('com_assertive')) * 0.4);

  const visualCharts: VisualChartsPayload = {
    overallRadar: [
      { subject: 'العوامل الخمسة (Big 5)', score: constructScores.big_five, fullMark: 100 },
      { subject: 'النزاهة والمرونة (HEXACO)', score: constructScores.hexaco, fullMark: 100 },
      { subject: 'الأمان العاطفي (Attachment)', score: constructScores.attachment, fullMark: 100 },
      { subject: 'الذكاء العاطفي (EI)', score: constructScores.emotional_intelligence, fullMark: 100 },
      { subject: 'التنظيم الذاتي', score: constructScores.self_regulation, fullMark: 100 },
      { subject: 'الكفاءة البينشخصية', score: constructScores.interpersonal, fullMark: 100 },
      { subject: 'التواصل والحلول', score: constructScores.communication, fullMark: 100 },
      { subject: 'الازدهار والقيم (PERMA)', score: constructScores.positive_psychology, fullMark: 100 },
    ],
    bigFiveRadar: [
      { trait: 'الانفتاح (O)', score: getPct('bf_openness'), benchmark: 64, fullMark: 100 },
      { trait: 'يقظة الضمير (C)', score: getPct('bf_conscientiousness'), benchmark: 68, fullMark: 100 },
      { trait: 'الانبساط (E)', score: getPct('bf_extraversion'), benchmark: 58, fullMark: 100 },
      { trait: 'الوفاق (A)', score: getPct('bf_agreeableness'), benchmark: 70, fullMark: 100 },
      { trait: 'الاتزان الانفعالي (ES)', score: getPct('bf_emotional_stability'), benchmark: 65, fullMark: 100 },
    ],
    hexacoRadar: [
      { trait: 'الصدق-التواضع (H)', score: getPct('hx_honesty_humility'), fullMark: 100 },
      { trait: 'العاطفية (E)', score: getPct('hx_emotionality'), fullMark: 100 },
      { trait: 'الانبساط (X)', score: getPct('hx_extraversion'), fullMark: 100 },
      { trait: 'التسامح (A)', score: getPct('hx_agreeableness'), fullMark: 100 },
      { trait: 'الاجتهاد (C)', score: getPct('hx_conscientiousness'), fullMark: 100 },
      { trait: 'الانفتاح (O)', score: getPct('hx_openness'), fullMark: 100 },
    ],
    emotionalIntelligence: [
      { branch: 'الوعي العاطفي بالذات', score: getPct('ei_self_awareness'), color: '#ec4899' },
      { branch: 'التعاطف وفهم المشاعر', score: getPct('ei_empathy'), color: '#8b5cf6' },
      { branch: 'تنظيم الانفعالات وضبطها', score: getPct('ei_regulation'), color: '#06b6d4' },
      { branch: 'المهارة الاجتماعية والاحتواء', score: getPct('ei_social_skill'), color: '#10b981' },
    ],
    attachment: {
      anxiety: attAnxiety,
      avoidance: attAvoidance,
      styleKey: attStyleKey,
      styleAr: attStyleAr,
      styleEn: attStyleEn,
    },
    communicationStyles: [
      { style: 'الحزم المحترم (Assertive)', score: getPct('com_assertive'), color: '#3b82f6' },
      { style: 'الإنصات التأملي (Reflective)', score: getPct('com_reflective'), color: '#10b981' },
      { style: 'الوضوح التحليلي (Analytical)', score: getPct('com_analytical'), color: '#8b5cf6' },
      { style: 'الدفء التعبيري (Expressive)', score: getPct('com_expressive'), color: '#ec4899' },
    ],
    conflictModes: [
      { mode: 'التعاون التكاملي', score: collab, fullMark: 100 },
      { mode: 'الحلول الوسطية', score: comprom, fullMark: 100 },
      { mode: 'المرونة والاستيعاب', score: accom, fullMark: 100 },
      { mode: 'الحسم الفردي', score: compet, fullMark: 100 },
      { mode: 'التجنب والانسحاب', score: avoidMode, fullMark: 100 },
    ],
    lifeGoalsAlignment: [
      { domain: 'استقرار الأسرة والمودة', userScore: getPct('int_parenting_family'), targetBenchmark: 78 },
      { domain: 'القيم والمعنى الروحي', userScore: getPct('pp_values_meaning'), targetBenchmark: 75 },
      { domain: 'النمو الفكري والمعرفي', userScore: getPct('bf_openness'), targetBenchmark: 68 },
      { domain: 'الإنجاز والانضباط العملي', userScore: getPct('sr_goal_persistence'), targetBenchmark: 72 },
      { domain: 'الصمود والازدهار النفسي', userScore: getPct('pp_resilience_flourishing'), targetBenchmark: 74 },
    ],
    compatibilityMatrix: [
      {
        axisA: 'الاستقرار العاطفي',
        axisB: 'الأمان الارتباطي',
        synergyScore: clampPct((getPct('bf_emotional_stability') + effectiveAttachmentSecurity) / 2),
        labelAr: 'تحمل الأزمات بهدوء',
      },
      {
        axisA: 'الاستقرار العاطفي',
        axisB: 'التواصل البناء',
        synergyScore: clampPct((getPct('bf_emotional_stability') + constructScores.communication) / 2),
        labelAr: 'حوار خالٍ من التصعيد',
      },
      {
        axisA: 'الاستقرار العاطفي',
        axisB: 'الوفاق والنزاهة',
        synergyScore: clampPct((getPct('bf_emotional_stability') + getPct('hx_honesty_humility')) / 2),
        labelAr: 'أمانة وثبات مزاجي',
      },
      {
        axisA: 'الاستقرار العاطفي',
        axisB: 'القيم والأهداف',
        synergyScore: clampPct((getPct('bf_emotional_stability') + getPct('pp_values_meaning')) / 2),
        labelAr: 'سكينة معنوية مستدامة',
      },
      {
        axisA: 'الذكاء العاطفي',
        axisB: 'الأمان الارتباطي',
        synergyScore: clampPct((constructScores.emotional_intelligence + effectiveAttachmentSecurity) / 2),
        labelAr: 'احتواء وجداني عميق',
      },
      {
        axisA: 'الذكاء العاطفي',
        axisB: 'التواصل البناء',
        synergyScore: clampPct((constructScores.emotional_intelligence + constructScores.communication) / 2),
        labelAr: 'تعاطف وإنصات فعّال',
      },
      {
        axisA: 'الذكاء العاطفي',
        axisB: 'الوفاق والنزاهة',
        synergyScore: clampPct((constructScores.emotional_intelligence + getPct('bf_agreeableness')) / 2),
        labelAr: 'لطف معنوي ورفق',
      },
      {
        axisA: 'الذكاء العاطفي',
        axisB: 'القيم والأهداف',
        synergyScore: clampPct((constructScores.emotional_intelligence + getPct('pp_life_goals')) / 2),
        labelAr: 'توجيه الطموح برحمة',
      },
      {
        axisA: 'التنظيم الذاتي',
        axisB: 'الأمان الارتباطي',
        synergyScore: clampPct((constructScores.self_regulation + effectiveAttachmentSecurity) / 2),
        labelAr: 'ضبط الاندفاع بالثقة',
      },
      {
        axisA: 'التنظيم الذاتي',
        axisB: 'التواصل البناء',
        synergyScore: clampPct((getPct('sr_impulse_control') + getPct('com_assertive')) / 2),
        labelAr: 'حزم متزن غير جارح',
      },
      {
        axisA: 'التنظيم الذاتي',
        axisB: 'الوفاق والنزاهة',
        synergyScore: clampPct((getPct('bf_conscientiousness') + getPct('hx_honesty_humility')) / 2),
        labelAr: 'وفاء بالعهود والتزام',
      },
      {
        axisA: 'التنظيم الذاتي',
        axisB: 'القيم والأهداف',
        synergyScore: clampPct((getPct('sr_goal_persistence') + getPct('pp_life_goals')) / 2),
        labelAr: 'تحويل الرؤية لإنجاز',
      },
      {
        axisA: 'الشراكة الأسرية',
        axisB: 'الأمان الارتباطي',
        synergyScore: clampPct((getPct('int_trust_commitment') + effectiveAttachmentSecurity) / 2),
        labelAr: 'بناء بيت آمن مستقيم',
      },
      {
        axisA: 'الشراكة الأسرية',
        axisB: 'التواصل البناء',
        synergyScore: clampPct((getPct('int_repair_synergy') + collab) / 2),
        labelAr: 'إصلاح الخلاف بسلاسة',
      },
      {
        axisA: 'الشراكة الأسرية',
        axisB: 'الوفاق والنزاهة',
        synergyScore: clampPct((getPct('int_boundaries') + getPct('hx_agreeableness')) / 2),
        labelAr: 'حفظ الخصوصية باحترام',
      },
      {
        axisA: 'الشراكة الأسرية',
        axisB: 'القيم والأهداف',
        synergyScore: clampPct((getPct('int_parenting_family') + getPct('pp_values_meaning')) / 2),
        labelAr: 'تربية وقدوة مشتركة',
      },
    ],
  };

  // Rank positive subscales for dynamic narrative
  const rankedPositive = subscales
    .filter((s) => !SUBSCALE_METADATA[s.key]?.isReversePositive)
    .sort((a, b) => b.percentage - a.percentage);

  const top3 = rankedPositive.slice(0, 3);
  const bottom3 = rankedPositive.slice(-3).reverse();

  // Primary archetype
  let archetypeTitleAr = 'الشخصية المتزنة الشاملة';
  let archetypeTitleEn = 'Balanced Integrative Profile';
  if (constructScores.emotional_intelligence >= 72 && effectiveAttachmentSecurity >= 70) {
    archetypeTitleAr = 'النمط الآمن المتعاطف المتزن (Secure Empathetic Anchor)';
    archetypeTitleEn = 'Secure Empathetic Anchor';
  } else if (getPct('bf_conscientiousness') >= 72 && getPct('hx_honesty_humility') >= 70) {
    archetypeTitleAr = 'النمط الأمين المنضبط القيادي (Conscientious Principled Leader)';
    archetypeTitleEn = 'Conscientious Principled Leader';
  } else if (getPct('bf_openness') >= 72 && getPct('com_analytical') >= 68) {
    archetypeTitleAr = 'المفكر التطويري المستكشف (Reflective Growth Thinker)';
    archetypeTitleEn = 'Reflective Growth Thinker';
  } else if (overallMaturityIndex < 40) {
    archetypeTitleAr = 'مسار النمو واكتشاف الذات (Emerging Self-Discovery Path)';
    archetypeTitleEn = 'Emerging Self-Discovery Path';
  }

  const dominantComm = [...visualCharts.communicationStyles].sort((a, b) => b.score - a.score)[0];
  const dominantConflict = [...visualCharts.conflictModes].sort((a, b) => b.score - a.score)[0];

  const strengthsAr = top3.map(
    (s) => `${s.labelAr} (${s.percentage}% • معيار Sten ${s.stenScore}/10): ${s.interpretationAr}`
  );
  const improvementAreasAr = bottom3.map(
    (s) =>
      `${s.labelAr} (${s.percentage}%): يحتاج لدعم عملي وتدريب تدريجي لرفع مرونتك وتوازنك في المواقف الضاغطة.`
  );

  const executiveSummaryAr = `أتمّ «${userName}» تقييم «${tierMeta.titleAr}» (${validation.answeredCount}/${validation.totalCount} بنداً) بمؤشر نضج سيكومتري إجمالي قدره ${overallMaturityIndex}% (مرتبة مئينية ${pctToPercentile(overallMaturityIndex)}%) ومؤشر اتساق إجابات داخلي ${consistencyIndex}%. يبرز في البصمة النفسية تفوق واضح في «${top3[0]?.labelAr || ''}» (${top3[0]?.percentage || 50}%) و«${top3[1]?.labelAr || ''}» (${top3[1]?.percentage || 50}%).`;

  const personalityDescriptionAr = `تعكس درجاتك في العوامل الخمسة الكبرى ونموذج HEXACO ملفاً ${overallMaturityIndex >= 65 ? 'ناضجاً مستقراً' : 'نامياً قابلاً للتمكين'} يرتكز على الصدق والتواضع (${getPct('hx_honesty_humility')}%) ويقظة الضمير (${getPct('bf_conscientiousness')}%)، مع نمط «${attStyleAr}» وميل تواصلي غالبه «${dominantComm.style}» (${dominantComm.score}%).`;

  const communicationStyleAr = `أسلوب تواصلك الأساسي هو «${dominantComm.style}» (${dominantComm.score}%)، مدعوماً بالإنصات التأملي (${getPct('com_reflective')}%) والوضوح التحليلي (${getPct('com_analytical')}%). هذه البنية تساعد على صياغة الاحتياجات بوضوح وتفادي اللوم المباشر.`;

  const emotionalMaturitySummaryAr = `مؤشر الذكاء العاطفي المركب لديك هو ${constructScores.emotional_intelligence}% والتنظيم الذاتي ${constructScores.self_regulation}%، مما يعبر عن قدرتك على استيعاب الانفعالات (${getPct('ei_regulation')}%) والتعاطف الفعلي (${getPct('ei_empathy')}%).`;

  // Tier-specific advanced + professional depth sections
  const includeAdvanced = tier === 'advanced' || tier === 'professional';
  const includePro = tier === 'professional';

  const thinkingStyleAnalysisAr = includeAdvanced
    ? `يجمع نمطك الإدراكي بين الانفتاح الاستكشافي (${getPct('bf_openness')}%) والوضوح التحليلي (${getPct('com_analytical')}%) وإعادة التقييم المعرفي (${getPct('sr_cognitive_reappraisal')}%). عند مواجهة المواقف المعقدة تميل إلى ${getPct('com_analytical') >= getPct('ei_empathy') ? 'تفكيك المعطيات منطقياً أولاً ثم مراعاة الأثر الشعوري' : 'البدء باستقراء الأثر الإنساني والوجداني ثم ترتيب الخطوات العملية'}.`
    : undefined;

  const decisionMakingAnalysisAr = includeAdvanced
    ? `يعتمد أسلوب اتخاذ القرار لديك على يقظة الضمير (${getPct('bf_conscientiousness')}%) وضبط الاندفاع (${getPct('sr_impulse_control')}%). هذا يمنحك تأنياً محسوباً بمعدل ${pctToSten((getPct('bf_conscientiousness') + getPct('sr_impulse_control')) / 2)}/10، ويحد من القرارات الانفعالية تحت الضغط.`
    : undefined;

  const attachmentAnalysisAr = includeAdvanced
    ? `وفق نموذج الإحداثيات الثنائي للتعلق (ECR-R): درجة قلق التعلق ${attAnxiety}% ودرجة تجنب القرب ${attAvoidance}%، مع أمان مباشر ${attSecurityDirect}%، ما يصنفك ضمن «${attStyleAr}». تعزيز الوضوح الهادئ وقت المسافة النفسية يضاعف الشعور بالسكينة.`
    : undefined;

  const conflictResolutionAnalysisAr = includeAdvanced
    ? `عند نشوء خلاف علائقي، تبرز استراتيجية «${dominantConflict.mode}» (${dominantConflict.score}%) بفضل التعاون التفاوضي (${collab}%) والقدرة على الإصلاح السريع (${getPct('int_repair_synergy')}%). ويُنصح بالحذر من ارتفاع مؤشر التجنب (${avoidMode}%) إذا تجاوز 55%.`
    : undefined;

  const expectedEmotionalCompatibilityAr = includeAdvanced
    ? `تشير معادلة التوافق السيكومتري إلى انسجام مرتفع مع شريك يتحلى بـ «الوفاق العالي» (≥ 68%) والاتزان الانفعالي الآمن، لتكوين علاقة تقوم على الثقة (${getPct('int_trust_commitment')}%) والحدود الصحية (${getPct('int_boundaries')}%).`
    : undefined;

  const familySuccessIndicatorsAr = includeAdvanced
    ? [
        `مؤشر الأمان والثقة الأسرية (Gottman Trust Metric): ${getPct('int_trust_commitment')}%`,
        `كفاءة الحدود الصحية وحماية خصوصية البيت (Bowen): ${getPct('int_boundaries')}%`,
        `الانسجام في التوجه التربوي وبناء الأسرة: ${getPct('int_parenting_family')}%`,
        `القدرة على احتواء الخلاف وإعادة المودة (Repair Index): ${getPct('int_repair_synergy')}%`,
      ]
    : undefined;

  const valuesAndBeliefsAr = includePro
    ? `تكشف البصمة القيمية (نموذج شوارتز + HEXACO) عن محورية الصدق والنزاهة (${getPct('hx_honesty_humility')}%) والمعنى القيمي العميق (${getPct('pp_values_meaning')}%). تميل لاتخاذ مواقفك الجوهرية من منطلق المبدأ الثابت لا المظهر الاجتماعي العابر.`
    : undefined;

  const lifeGoalsAnalysisAr = includePro
    ? `تنسجم أهدافك المستقبلية (${getPct('pp_life_goals')}%) مع المثابرة التنفيذية (${getPct('sr_goal_persistence')}%) والتوجه الأسري (${getPct('int_parenting_family')}%). هذا التلاقي يدعم بناء مسار عائلي ومهني متوازن طويل النفس.`
    : undefined;

  const stressManagementCapacityAr = includePro
    ? `تبلغ سعتك التنفيذية لإدارة الضغوط ${constructScores.self_regulation}%: تشمل إعادة التقييم المعرفي (${getPct('sr_cognitive_reappraisal')}%)، والصلابة العصبية (${getPct('sr_stress_resilience')}%)، وضبط الاندفاع (${getPct('sr_impulse_control')}%). عند تراكم الأعباء يُنصح بتفريغ التوتر تدريجياً عبر الحركة والحوار الهادئ.`
    : undefined;

  const empathyAnalysisAr = includePro
    ? `يسجل بُعد التعاطف الوجداني والمعرفي ${getPct('ei_empathy')}% مع مهارة اجتماعية ${getPct('ei_social_skill')}% ولطف HEXACO (${getPct('hx_agreeableness')}%). تستطيع استشعار مشاعر الآخرين مبكراً، مع ضرورة التوازن الذاتي لحماية طاقتك النفسية.`
    : undefined;

  const longTermMaritalCompatibilityAr = includePro
    ? `تُظهر التنبؤات الطولية بناءً على مثلث (الوفاق + يقظة الضمير + النزاهة + الأمان الارتباطي + الإصلاح العلائقي) مؤشر ديمومة زوجية مقداره ${clampPct(
        getPct('hx_honesty_humility') * 0.2 +
          getPct('bf_conscientiousness') * 0.2 +
          effectiveAttachmentSecurity * 0.2 +
          getPct('int_repair_synergy') * 0.2 +
          getPct('pp_optimism_gratitude') * 0.2
      )}%. نجاح الشراكة على المدى البعيد يرتبط بصون طقوس الامتنان الأسبوعية والتفاهم المرن حول الأهداف المالية والتربوية.`
    : undefined;

  const scientificReferences = Array.from(
    new Set(
      (Object.keys(CONSTRUCT_SCIENTIFIC_CATALOG) as PsychologicalConstructKey[]).map(
        (ck) => CONSTRUCT_SCIENTIFIC_CATALOG[ck].referenceAr
      )
    )
  );

  return {
    id: `tr_${tier}_${Date.now()}`,
    tier,
    tierTitleAr: tierMeta.titleAr,
    tierTitleEn: tierMeta.titleEn,
    questionCount: questions.length,
    answeredCount: validation.answeredCount,
    isComplete: validation.isComplete,
    completionRate: Math.round((validation.answeredCount / Math.max(1, questions.length)) * 100),
    consistencyIndex,
    createdAt: new Date().toISOString(),
    userName,
    overallMaturityIndex,
    overallPercentile: pctToPercentile(overallMaturityIndex),
    overallSten: pctToSten(overallMaturityIndex),
    archetypeTitleAr,
    archetypeTitleEn,
    executiveSummaryAr,
    personalityDescriptionAr,
    strengthsAr,
    improvementAreasAr,
    communicationStyleAr,
    emotionalMaturitySummaryAr,
    thinkingStyleAnalysisAr,
    decisionMakingAnalysisAr,
    attachmentAnalysisAr,
    conflictResolutionAnalysisAr,
    expectedEmotionalCompatibilityAr,
    familySuccessIndicatorsAr,
    valuesAndBeliefsAr,
    lifeGoalsAnalysisAr,
    stressManagementCapacityAr,
    empathyAnalysisAr,
    longTermMaritalCompatibilityAr,
    subscales,
    visualCharts,
    scientificDisclaimerAr: NON_CLINICAL_DISCLAIMER_AR,
    scientificReferences,
    rawAnswersSnapshot: answers,
  };
}
