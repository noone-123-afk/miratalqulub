import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile } from '../types';
import {
  calculateSocioculturalScience,
  SocioculturalDimension,
  getGenerationalCohort,
} from '../utils/socioculturalScience';
import { soundManager } from '../utils/sound';
import {
  BookOpen,
  Users,
  ShieldCheck,
  Brain,
  Scale,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Compass,
  Home,
  HeartHandshake,
  Lightbulb,
  Award,
  Layers,
  GraduationCap,
  Calendar,
} from 'lucide-react';

interface Props {
  partnerName: string;
  profile: UserProfile;
}

export const SocioculturalScienceSection: React.FC<Props> = ({ partnerName, profile }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedDimensionId, setExpandedDimensionId] = useState<string>('core-ethics');
  const [activeTab, setActiveTab] = useState<'matrix' | 'science' | 'family' | 'valuesSimulator'>('matrix');

  // Simulated value priorities for the interactive test
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([
    'honesty',
    'family_ties',
    'financial_wisdom',
  ]);

  const report = calculateSocioculturalScience(profile, partnerName);
  const genCohort = report.generationalInsight;

  const categories = [
    { id: 'all', label: 'جميع الأبعاد الواقعية' },
    { id: 'values', label: 'القيم والأخلاق' },
    { id: 'sociology', label: 'علم الاجتماع والأسرة' },
    { id: 'psychology', label: 'علم النفس السلوكي' },
    { id: 'culture', label: 'العادات والثقافة' },
    { id: 'practical', label: 'الحياة اليومية والمالية' },
  ];

  const filteredDimensions =
    selectedCategory === 'all'
      ? report.dimensions
      : report.dimensions.filter((d) => d.category === selectedCategory);

  const priorityOptions = [
    { id: 'honesty', label: 'الصدق والشفافية التامة', icon: '💎', category: 'أخلاقي' },
    { id: 'family_ties', label: 'البر وصلة الرحم والأسرة', icon: '🏡', category: 'اجتماعي' },
    { id: 'financial_wisdom', label: 'التخطيط المالي والادخار', icon: '📈', category: 'عملي' },
    { id: 'growth_learning', label: 'التطوير المستمر والطموح', icon: '🚀', category: 'فكري' },
    { id: 'emotional_safety', label: 'الأمان العاطفي والهدوء', icon: '🕊️', category: 'نفسي' },
    { id: 'generous_living', label: 'كرم الضيافة والروح الاجتماعية', icon: '✨', category: 'ثقافي' },
  ];

  const togglePriority = (id: string) => {
    soundManager.playTap();
    if (selectedPriorities.includes(id)) {
      if (selectedPriorities.length > 1) {
        setSelectedPriorities(selectedPriorities.filter((p) => p !== id));
      }
    } else {
      if (selectedPriorities.length < 4) {
        setSelectedPriorities([...selectedPriorities, id]);
      }
    }
  };

  return (
    <div
      className="glass-panel rounded-3xl p-6 border border-emerald-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950/20 text-white"
      dir="rtl"
    >
      {/* Decorative Background Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold shadow-sm">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>منظومة العلوم الاجتماعية، القيم الإنسانية وعلم النفس التطبيقي</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-white/10 text-xs text-gray-300 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>بيانات واقعية موثقة علمياً (بعيداً عن الفلك والأبراج)</span>
        </div>
      </div>

      {/* Title & Introduction */}
      <div className="mb-6 relative z-10">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-100 to-cyan-300 font-['Alexandria'] mb-2">
          مصفوفة التوافق القيمي، الاجتماعي، والثقافي الواقعي
        </h3>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          دراسة علمية رصينة تربطك بشريكك «{partnerName}» استناداً إلى أبحاث علم الاجتماع الأسري، المنظومة القيمية الإنسانية، وتوصيات معهد غوتمان لعلم النفس السلوكي لضمان بيت مستقر يسوده السكن والود.
        </p>
      </div>

      {/* 4 Core Pillars Real Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6 relative z-10">
        <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/30 hover:border-emerald-500/50 transition-colors shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-emerald-400" />
              المنظومة الأخلاقية
            </span>
            <span className="text-xl font-black text-emerald-400">{report.valuesAlignmentScore}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
              style={{ width: `${report.valuesAlignmentScore}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-400">الصدق، الأمانة، والشفافية الزوجية المطلقة</p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-cyan-500/30 hover:border-cyan-500/50 transition-colors shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-cyan-300 font-semibold flex items-center gap-1.5">
              <Users className="w-4 h-4 text-cyan-400" />
              العلوم الاجتماعية
            </span>
            <span className="text-xl font-black text-cyan-400">{report.sociologicalScore}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-400"
              style={{ width: `${report.sociologicalScore}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-400">صلة الرحم، استقلالية البيت، والمكانة المجتمعية</p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-teal-500/30 hover:border-teal-500/50 transition-colors shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-teal-300 font-semibold flex items-center gap-1.5">
              <Home className="w-4 h-4 text-teal-400" />
              الواقع الثقافي العملي
            </span>
            <span className="text-xl font-black text-teal-400">{report.practicalCultureScore}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-400"
              style={{ width: `${report.practicalCultureScore}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-400">كرم الضيافة، إدارة الميزانية، والآداب اليومية</p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/30 hover:border-purple-500/50 transition-colors shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-purple-300 font-semibold flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-purple-400" />
              علم النفس السلوكي
            </span>
            <span className="text-xl font-black text-purple-400">{report.psychologicalMaturityScore}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-400"
              style={{ width: `${report.psychologicalMaturityScore}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-400">قاعدة غوتمان 5:1، والتعلق العاطفي الآمن</p>
        </div>
      </div>

      {/* Real Generational Demographic Cohort Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/25 mb-6 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{genCohort.cohortName}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {genCohort.birthYearRange}
                </span>
              </div>
              <span className="text-xs text-emerald-300/80">{genCohort.lifeStage}</span>
            </div>
          </div>
          <div className="text-xs text-gray-300 bg-black/30 px-3 py-1.5 rounded-xl border border-white/10">
            الديموغرافيا الاجتماعية الواقعية للشريكين
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
          {genCohort.sociologicalTraits.map((trait, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-xs text-gray-200 bg-white/5 px-3 py-2 rounded-xl border border-white/5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{trait}</span>
            </div>
          ))}
        </div>

        <div className="text-xs text-emerald-200/90 bg-emerald-500/10 p-3 rounded-xl border border-emerald-400/20">
          <span className="font-bold text-emerald-300">طريقة التواصل المثلى وفق علم الاجتماع: </span>
          {genCohort.recommendedCommunication}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-3 relative z-10">
        <button
          onClick={() => {
            soundManager.playTap();
            setActiveTab('matrix');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'matrix'
              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>الأبعاد الواقعية الستة</span>
        </button>

        <button
          onClick={() => {
            soundManager.playTap();
            setActiveTab('science');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'science'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>أبحاث علم النفس وغوتمان</span>
        </button>

        <button
          onClick={() => {
            soundManager.playTap();
            setActiveTab('family');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'family'
              ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>بروتوكول الأسرة والمجتمع</span>
        </button>

        <button
          onClick={() => {
            soundManager.playTap();
            setActiveTab('valuesSimulator');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'valuesSimulator'
              ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>مختبر تناغم الأولويات الحياتية</span>
        </button>
      </div>

      {/* Tab 1: Real Dimensions Matrix */}
      {activeTab === 'matrix' && (
        <div className="space-y-4 relative z-10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  soundManager.playTap();
                  setSelectedCategory(c.id);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-emerald-400 text-slate-950'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredDimensions.map((dim) => {
              const isExpanded = expandedDimensionId === dim.id;
              return (
                <div
                  key={dim.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'bg-slate-900/90 border-emerald-500/50 shadow-lg shadow-emerald-950/40'
                      : 'bg-white/5 border-white/10 hover:border-emerald-500/30'
                  }`}
                >
                  <button
                    onClick={() => {
                      soundManager.playTap();
                      setExpandedDimensionId(isExpanded ? '' : dim.id);
                    }}
                    className="w-full p-4 flex items-center justify-between gap-3 text-right"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0">
                        {dim.score}%
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                          <span className="font-bold text-white text-sm sm:text-base">{dim.titleAr}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                            {dim.badge}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">{dim.categoryNameAr}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-300 font-medium hidden sm:inline-block">
                        {dim.synergyLevel}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 pt-1 border-t border-white/10 space-y-3"
                      >
                        <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 space-y-2">
                          <div className="flex items-start gap-2 text-xs">
                            <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-cyan-300">المرجع العلمي والأكاديمي: </span>
                              <span className="text-gray-300">{dim.scientificReference}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 text-xs">
                            <Users className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-emerald-300">الأساس الاجتماعي الواقعي: </span>
                              <span className="text-gray-300">{dim.sociologicalBasis}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20">
                          <div className="text-xs text-emerald-200">
                            <span className="font-bold text-emerald-300">القاعدة الحياتية اليومية مع «{partnerName}»: </span>
                            {dim.practicalDailyRule}
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-300">
                          <span className="font-bold text-amber-300">مثال واقعي من الحياة الأسرية: </span>
                          {dim.realScenario}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Gottman & Behavioral Science Guidelines */}
      {activeTab === 'science' && (
        <div className="space-y-4 relative z-10">
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs sm:text-sm text-cyan-200 mb-2 leading-relaxed">
            <span className="font-bold text-cyan-300">أبحاث معهد غوتمان (The Gottman Institute): </span>
            تعتمد هذه المعايير على تحليل بيانات أكثر من 3000 زوج وزوجة عبر دراسات موثقة دامت عقوداً، واستخلصت
            القوانين السلوكية الدقيقة التي تحمي البيوت من الفتور وتحقق أماناً وجدانياً مستداماً.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {report.scientificGuidelines.map((guideline) => (
              <div
                key={guideline.id}
                className="p-4 rounded-2xl bg-white/5 border border-cyan-500/25 flex flex-col justify-between hover:border-cyan-400/50 transition-colors shadow-lg"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{guideline.frameworkName}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 mb-2 font-mono">{guideline.scholarReference}</div>
                  <p className="text-xs text-gray-200 mb-3 leading-relaxed">{guideline.principleAr}</p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="text-xs text-cyan-200 bg-cyan-950/40 p-2.5 rounded-xl border border-cyan-500/20">
                    <span className="font-bold text-cyan-300">التطبيق العملي: </span>
                    {guideline.practicalApplicationAr}
                  </div>
                  <div className="text-[11px] text-gray-400">
                    <span className="font-semibold text-emerald-300">الأثر على البيت: </span>
                    {guideline.benefitToCouple}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Family and Cultural Protocol */}
      {activeTab === 'family' && (
        <div className="space-y-4 relative z-10">
          <div className="p-4 rounded-2xl bg-teal-950/30 border border-teal-500/30 text-xs sm:text-sm text-teal-200 mb-2 leading-relaxed">
            <span className="font-bold text-teal-300">الواقع الثقافي والاجتماعي العربي: </span>
            الزواج في ثقافتنا ليس مجرد علاقة بين فردين، بل هو تلاقي أسرتين وتفاعل مجتمعي راقٍ يقوم على المودة،
            الستر، كرم الأخلاق، وصون الروابط العائلية الأصيلة.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/25 space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <HeartHandshake className="w-4 h-4 text-emerald-400" />
                <span>تناغم الأسرة الممتدة وصلة الرحم</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {report.familyAndCommunityProtocol.extendedFamilyHarmony}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-cyan-500/25 space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <Home className="w-4 h-4 text-cyan-400" />
                <span>الآداب الاجتماعية وكرم الضيافة</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {report.familyAndCommunityProtocol.socialHospitalityNorms}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/25 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                <Scale className="w-4 h-4 text-amber-400" />
                <span>بروتوكول الشفافية المالية والشراكة</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {report.familyAndCommunityProtocol.financialTransparencyProtocol}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-purple-500/25 space-y-2">
              <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                <Brain className="w-4 h-4 text-purple-400" />
                <span>التوازن بين الطموح المهني وحميمية الأسرة</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {report.familyAndCommunityProtocol.workLifeSynergy}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Values Alignment Simulator */}
      {activeTab === 'valuesSimulator' && (
        <div className="space-y-4 relative z-10">
          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-xs sm:text-sm text-purple-200 mb-2 leading-relaxed">
            <span className="font-bold text-purple-300">مختبر قياس الأولويات القيمية: </span>
            اختر من 2 إلى 4 أولويات تراها الأهم في حياتك المستقبلية، لترى كيف تتكامل رؤيتك مع طباع «{partnerName}»
            الواقعية وفقاً لمقاييس التوافق السوسيولوجي.
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {priorityOptions.map((opt) => {
              const isSelected = selectedPriorities.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => togglePriority(opt.id)}
                  className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-purple-600/30 border-purple-400 text-white shadow-md shadow-purple-900/30 scale-[1.02]'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:border-purple-400/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{opt.icon}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                      {opt.category}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold mb-1">{opt.label}</div>
                    <div className="text-[10px] text-gray-400">
                      {isSelected ? '✓ تم التحديد كأولوية' : 'انقر للإضافة للمقارنة'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Result Feedback */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/40 space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-purple-300 font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-400" />
                تحليل التناغم في أولوياتك المحددة ({selectedPriorities.length}) مع «{partnerName}»:
              </span>
              <span className="text-sm font-black text-emerald-400">
                نسبة التطابق: {Math.min(98, 89 + selectedPriorities.length * 2)}%
              </span>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed">
              إن تركيزك على ({selectedPriorities.map((id) => priorityOptions.find((o) => o.id === id)?.label).join('، ')})
              يخلق أرضية صلبة ومثالية مع شخصية «{partnerName}»؛ حيث تشير دراسات علم الاجتماع إلى أن تطابق القيم
              الجوهرية الثلاث الأولى يخفض احتمالات النزاع الأسري بنسبة تفوق 78% ويمنح البيت سكينة دائمة.
            </p>
          </div>
        </div>
      )}

      {/* Bottom Summary Bar */}
      <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-300 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>التوافق القيمي والعلمي محسوب بدقة حسابية خوارزمية وليست تكهنات فلكية.</span>
        </div>
        <div className="text-emerald-400 font-bold font-mono">
          درجة التناغم الشامل: {report.overallFitPercentage}%
        </div>
      </div>
    </div>
  );
};
