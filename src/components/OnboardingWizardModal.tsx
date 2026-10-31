import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  X,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Heart,
  Brain,
  Lightbulb,
  BookOpen,
  MessageCircle,
  Search,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { soundManager } from '../utils/sound';

export type OnboardingGoal =
  | 'partner_compatibility'
  | 'personality_assessment'
  | 'intelligence_test'
  | 'blind_date'
  | 'novels_investigation'
  | 'articles_science';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectDestination: (goal: OnboardingGoal) => void;
}

export const OnboardingWizardModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectDestination,
}) => {
  const [selectedGoal, setSelectedGoal] = useState<OnboardingGoal>('partner_compatibility');
  const [stepIndex, setStepIndex] = useState<1 | 2>(1);

  if (!isOpen) return null;

  const goalsList: {
    key: OnboardingGoal;
    titleAr: string;
    subtitleAr: string;
    icon: string;
    badgeAr: string;
    color: string;
    bgHover: string;
    recommendationAr: string;
  }[] = [
    {
      key: 'partner_compatibility',
      titleAr: 'كشف شريك الحياة والتوافق النفسي',
      subtitleAr: 'اختبار دقيق يقيس التوافق الفكري والاجتماعي والعاطفي ويرسم صورة الشريك الأنسب.',
      icon: '🔮',
      badgeAr: 'التوافق الشامل',
      color: '#f43f5e',
      bgHover: 'hover:border-rose-500/50',
      recommendationAr:
        'ننصحك بخوض استبيان التوافق المكون من 15 سؤالاً نفسياً وسوسيولوجياً معتمداً لاكتشاف نسب الانسجام وصورة الشريك المثالي.',
    },
    {
      key: 'personality_assessment',
      titleAr: 'مقاييس تحليل الشخصية المعتمدة',
      subtitleAr: '8 اختبارات سيكولوجية كبرى (العوامل الخمسة، MMPI، 16PF، آيزنك، رورشاخ).',
      icon: '🧠',
      badgeAr: 'أكاديمي إكلينيكي',
      color: '#a855f7',
      bgHover: 'hover:border-purple-500/50',
      recommendationAr:
        'ستخوض مقاييس علمية دقيقة تكشف سماتك الدفينة، درجة انفعالاتك، وآلياتك الدفاعية وفق معايير الجمعية الأمريكية لعلم النفس (APA).',
    },
    {
      key: 'intelligence_test',
      titleAr: 'اختبار أنواع الذكاء المتعددة والمهارات',
      subtitleAr: 'مقياس جاردنر وماكينزي العالمي لتحديد ذكائك المهيمن والمهن الأنسب وتمارين التطوير.',
      icon: '💡',
      badgeAr: '8 أبعاد و24 مهارة',
      color: '#06b6d4',
      bgHover: 'hover:border-cyan-500/50',
      recommendationAr:
        'ستكتشف خريطتك العقلية برسم راداري شامل، مع حساب دقيق لنسبة كل مهارة ونقاط ضعفك ونصائح التدريب اليومية.',
    },
    {
      key: 'blind_date',
      titleAr: 'تجربة The Blind Date خلف الستار',
      subtitleAr: '4 مراحل حوارية عميقة ومتبادلة مع الشريك لتقييم الانسجام دون أحكام مظهرية.',
      icon: '💬',
      badgeAr: 'لقاء فكري أصيل',
      color: '#ec4899',
      bgHover: 'hover:border-pink-500/50',
      recommendationAr:
        'تجربة استثنائية ترتكز على التوافق القلبي والفكري أولاً، حيث تتناقشان في جوهر القيم وأسلوب الحياة حتى اتخاذ قرار اللقاء.',
    },
    {
      key: 'novels_investigation',
      titleAr: 'الروايات والتحقيقات الجنائية المشوقة',
      subtitleAr: 'روايات سينمائية طويلة بأسلوب محقق جنائي خبير، مسارح جرائم، وأدلة ميكروسكوبية.',
      icon: '🕵️‍♂️',
      badgeAr: 'تشويق وأكشن وأدلة',
      color: '#f59e0b',
      bgHover: 'hover:border-amber-500/50',
      recommendationAr:
        'انغمس في حبكات مكتوبة بدقة روائية وأسلوب إخراج سينمائي يحلل نفسية الجناة، مطياف الكتلة، وألغاز الغرف المغلقة.',
    },
    {
      key: 'articles_science',
      titleAr: 'موسوعة المقالات وعلم النفس التطبيقي',
      subtitleAr: 'أبحاث ودراسات إنسانية في العلاقات الأسرية، لغات الحب، وإدارة الخلافات الزوجية.',
      icon: '📚',
      badgeAr: 'تنمية ذات وعلاقات',
      color: '#10b981',
      bgHover: 'hover:border-emerald-500/50',
      recommendationAr:
        'مقالات موثقة ومبسطة صاغها مستشارون أسريون وأخصائيو علم نفس إكلينيكي لتطوير مهارات التواصل والنضج العاطفي.',
    },
  ];

  const currentGoalData = goalsList.find((g) => g.key === selectedGoal) || goalsList[0];

  const handleConfirm = () => {
    soundManager.playRoundPass();
    onSelectDestination(selectedGoal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-hidden text-right">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-2xl bg-[#0f172a] border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col relative"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-xl text-indigo-300 shadow-md">
              <Compass className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-white font-['Alexandria']">
                  المرشد التفاعلي: ما الذي تبحث عنه اليوم؟
                </h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  خطوة {stepIndex} من 2
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                دعنا نوجهك مباشرة إلى التجربة الأنسب لاهتمامك النفسي والفكري
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[70vh] custom-scrollbar space-y-4">
          {stepIndex === 1 ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-300 font-medium">
                اختر الوجهة أو الموضوع الذي ترغب في البدء به وسنقوم بتحضيره لك فورياً:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {goalsList.map((item) => {
                  const isSelected = selectedGoal === item.key;
                  return (
                    <div
                      key={item.key}
                      onClick={() => {
                        soundManager.playTap();
                        setSelectedGoal(item.key);
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 text-right ${
                        isSelected
                          ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-950/50'
                          : `bg-slate-900/60 border-slate-800 ${item.bgHover} hover:bg-slate-900`
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{item.icon}</span>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${item.color}15`,
                            color: item.color,
                            border: `1px solid ${item.color}35`,
                          }}
                        >
                          {item.badgeAr}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-white font-['Alexandria']">
                          {item.titleAr}
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed mt-1 line-clamp-2">
                          {item.subtitleAr}
                        </p>
                      </div>

                      <div className="pt-1 flex items-center justify-end">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-indigo-400 bg-indigo-500 text-white'
                              : 'border-slate-600'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Step 2: Personalized Recommendation Card */}
              <div className="p-5 rounded-3xl bg-slate-900/80 border border-indigo-500/30 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentGoalData.icon}</span>
                  <div>
                    <span className="text-[10px] font-bold text-indigo-400">
                      خيارك المفضل:
                    </span>
                    <h4 className="font-extrabold text-base text-white font-['Alexandria']">
                      {currentGoalData.titleAr}
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-black/30 p-3.5 rounded-2xl border border-white/5">
                  «{currentGoalData.recommendationAr}»
                </p>

                {/* Trust & Safety Human Signature Notice */}
                <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-500/25 flex items-start gap-2.5 text-xs text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold block">محتوى إنساني موثوق وآمن 100%:</span>
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                      تمت مراجعة هذا القسم واعتماده من قبل استشاريين نفسيين وخبراء قياس سلوكي. جميع إجاباتك مشفرة ولا يتم مشاركتها إطلاقاً.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-white/10 flex items-center justify-between gap-3 shrink-0">
          {stepIndex === 2 ? (
            <button
              onClick={() => setStepIndex(1)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>تغيير الاختيار</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>اختيارك يفتح البوابة المناسبة لك</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-bold transition cursor-pointer"
            >
              تخطي
            </button>

            {stepIndex === 1 ? (
              <button
                onClick={() => {
                  soundManager.playTap();
                  setStepIndex(2);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-black text-xs transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/25"
              >
                <span>متابعة التوجيه</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleConfirm}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:opacity-95 text-white font-black text-xs transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-600/25"
              >
                <span>الانتقال إلى القسم الآن 🚀</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
