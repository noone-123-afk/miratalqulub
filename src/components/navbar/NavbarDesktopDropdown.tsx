import React from 'react';
import {
  Brain,
  Cpu,
  Compass,
  FileText,
  Heart,
  MessageCircle,
  UserCheck,
  BookOpen,
  Feather,
} from 'lucide-react';

export interface NavbarDesktopDropdownProps {
  activeDropdown: 'self' | 'compatibility' | 'oasis';
  isAr: boolean;
  isLight: boolean;
  onCleanNav: (page: string, cleanPath: string, fallback?: () => void) => void;
  onNavAction: (callback?: () => void) => void;
  onNavigatePage?: (page: string) => void;
  onReset?: () => void;
  onOpenPsychologyTests?: () => void;
  onOpenIntelligenceTests?: () => void;
  onOpenBlindDate?: () => void;
  onOpenCoupleInvite?: () => void;
  onOpenArticles?: () => void;
  onOpenNovels?: () => void;
}

export const NavbarDesktopDropdown: React.FC<NavbarDesktopDropdownProps> = ({
  activeDropdown,
  isAr,
  isLight,
  onCleanNav,
  onNavAction,
  onNavigatePage,
  onReset,
  onOpenPsychologyTests,
  onOpenIntelligenceTests,
  onOpenBlindDate,
  onOpenCoupleInvite,
  onOpenArticles,
  onOpenNovels,
}) => {
  if (activeDropdown === 'self') {
    return (
      <div
        className={`absolute top-full mt-2 w-80 rounded-2xl border p-2.5 shadow-2xl z-50 space-y-1.5 ${
          isAr ? 'right-0 text-right' : 'left-0 text-left'
        } ${
          isLight
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-slate-950/95 border-purple-500/35 text-slate-100 backdrop-blur-xl'
        }`}
      >
        <div
          className={`px-3 py-1.5 text-[11px] font-extrabold border-b ${
            isLight
              ? 'border-slate-100 text-purple-700'
              : 'border-white/10 text-purple-300'
          }`}
        >
          {isAr
            ? 'المسار الأول: مقاييس الشخصية واختبارات الذكاء'
            : 'Pathway 1: Personality Scales & Intelligence Labs'}
        </div>

        {/* Item 1: MBTI & Big Five Page */}
        <a
          href="/personality-tests"
          onClick={(e) => {
            e.preventDefault();
            onCleanNav('personality-tests', '/personality-tests', onOpenPsychologyTests);
          }}
          className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer text-start ${
            isLight ? 'hover:bg-purple-50' : 'hover:bg-white/10'
          }`}
        >
          <Brain className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-xs">
              {isAr
                ? 'مختبر مقاييس الشخصية (MBTI & Big Five)'
                : 'Personality Lab (MBTI & Big Five / OCEAN)'}
            </div>
            <div
              className={`text-[11px] font-normal mt-0.5 ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'تحليل الأنماط الـ16 والعوامل الخمسة الكبرى موثق بمراجع APA'
                : '16 Jungian archetypes & Five-Factor model with APA citations'}
            </div>
          </div>
        </a>

        {/* Item 2: Intelligence Tests Clean URL Page */}
        <a
          href="/iq-tests"
          onClick={(e) => {
            e.preventDefault();
            onCleanNav('iq-tests', '/iq-tests', onOpenIntelligenceTests);
          }}
          className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer text-start ${
            isLight ? 'hover:bg-cyan-50' : 'hover:bg-white/10'
          }`}
        >
          <Cpu className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-xs">
              {isAr
                ? 'مختبر اختبارات الذكاء والقدرات (IQ & EQ)'
                : 'Multiple Intelligences & IQ/EQ Batteries'}
            </div>
            <div
              className={`text-[11px] font-normal mt-0.5 ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'ذكاءات جاردنر الـ9، مصفوفات رافين، والذكاء العاطفي (135 سؤالاً)'
                : 'Gardner 9 MI, Raven Progressive Matrices & Emotional Intelligence'}
            </div>
          </div>
        </a>

        {/* Item 3: Specialized Clinical Psychometrics (16PF, EPQ, Attachment) */}
        {onOpenPsychologyTests && (
          <button
            type="button"
            onClick={() => onNavAction(onOpenPsychologyTests)}
            className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer ${
              isLight ? 'hover:bg-indigo-50' : 'hover:bg-white/10'
            }`}
          >
            <Compass className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs">
                {isAr
                  ? 'المقاييس المتخصصة (كاتل 16PF وآيزنك والتعلق)'
                  : 'Specialized Scales (Cattell 16PF, EPQ & Attachment)'}
              </div>
              <div
                className={`text-[11px] font-normal mt-0.5 ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                {isAr
                  ? '8 مقاييس إكلينيكية بدرجات معيارية Sten وتصدير PDF فوري'
                  : '8 clinical scales with normative Sten scores & direct PDF export'}
              </div>
            </div>
          </button>
        )}

        {/* Item 4: How Test Results Are Calculated */}
        {onNavigatePage && (
          <a
            href="/how-results-are-calculated"
            onClick={(e) => {
              e.preventDefault();
              onCleanNav('how-results-are-calculated', '/how-results-are-calculated');
            }}
            className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer border-t text-start ${
              isLight
                ? 'hover:bg-emerald-50 border-slate-100'
                : 'hover:bg-white/10 border-white/10'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs">
                {isAr ? 'كيف يتم حساب نتائج الاختبارات؟' : 'How Are Test Results Calculated?'}
              </div>
              <div
                className={`text-[11px] font-normal mt-0.5 ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                {isAr
                  ? 'شرح مبسط لـ Big Five • HEXACO • Attachment • EQ'
                  : 'Simplified guide to Big Five, HEXACO, Attachment & EQ'}
              </div>
            </div>
          </a>
        )}
      </div>
    );
  }

  if (activeDropdown === 'compatibility') {
    return (
      <div
        className={`absolute top-full mt-2 w-80 rounded-2xl border p-2.5 shadow-2xl z-50 space-y-1.5 ${
          isAr ? 'right-0 text-right' : 'left-0 text-left'
        } ${
          isLight
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-slate-950/95 border-rose-500/35 text-slate-100 backdrop-blur-xl'
        }`}
      >
        <div
          className={`px-3 py-1.5 text-[11px] font-extrabold border-b ${
            isLight
              ? 'border-slate-100 text-rose-700'
              : 'border-white/10 text-rose-300'
          }`}
        >
          {isAr
            ? 'المسار الثاني: كاشف التوافق و The Blind Date'
            : 'Pathway 2: Compatibility Detector & The Blind Date'}
        </div>

        {/* Item 1: Compatibility Detector */}
        <a
          href="/compatibility"
          onClick={(e) => {
            e.preventDefault();
            onCleanNav('compatibility', '/compatibility');
            if (onReset) onReset();
          }}
          className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer text-start ${
            isLight ? 'hover:bg-rose-50' : 'hover:bg-white/10'
          }`}
        >
          <Heart className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-xs">
              {isAr
                ? 'كاشف التوافق الفكري والعاطفي (حاسبة التوافق)'
                : 'Partner Compatibility Detector & Calculator'}
            </div>
            <div
              className={`text-[11px] font-normal mt-0.5 ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'خوارزمية التوافق السيكومتري عبر 4 أبعاد مع تحليل الشريك'
                : '4-dimension psychometric compatibility engine & partner synthesis'}
            </div>
          </div>
        </a>

        {/* Item 2: The Blind Date */}
        {onOpenBlindDate && (
          <button
            type="button"
            onClick={() => onNavAction(onOpenBlindDate)}
            className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer ${
              isLight ? 'hover:bg-pink-50' : 'hover:bg-white/10'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs">
                {isAr
                  ? 'تجربة اللقاء الأعمى التفاعلي (The Blind Date)'
                  : 'The Blind Date Interactive Experience'}
              </div>
              <div
                className={`text-[11px] font-normal mt-0.5 ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                {isAr
                  ? 'حوار فكري متدرج خلف الستار لاختبار انسجام القيم والروح'
                  : 'Progressive curtain-drop dialogue to test intellectual & value resonance'}
              </div>
            </div>
          </button>
        )}

        {/* Item 3: Couple Compatibility Invite */}
        {onOpenCoupleInvite && (
          <button
            type="button"
            onClick={() => onNavAction(onOpenCoupleInvite)}
            className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer ${
              isLight ? 'hover:bg-rose-50' : 'hover:bg-white/10'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-xs">
                {isAr
                  ? 'اختبار التوافق المزدوج مع الشريك (Couple Invite)'
                  : 'Dual Couple Compatibility Assessment'}
              </div>
              <div
                className={`text-[11px] font-normal mt-0.5 ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                {isAr
                  ? 'أنشئ رابط دعوة خاصاً لمقارنة إجاباتك مع شريكك مباشرة'
                  : 'Generate a private invite link to compare responses with your partner'}
              </div>
            </div>
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`absolute top-full mt-2 w-84 rounded-2xl border p-2.5 shadow-2xl z-50 space-y-1.5 ${
        isAr ? 'right-0 text-right' : 'left-0 text-left'
      } ${
        isLight
          ? 'bg-white border-slate-200 text-slate-800'
          : 'bg-slate-950/95 border-emerald-500/35 text-slate-100 backdrop-blur-xl'
      }`}
    >
      <div
        className={`px-3 py-1.5 text-[11px] font-extrabold border-b ${
          isLight
            ? 'border-slate-100 text-emerald-800'
            : 'border-white/10 text-emerald-300'
        }`}
      >
        {isAr
          ? 'المسار الثالث: الواحة المعرفية، الأبحاث المحكّمة، والروايات'
          : 'Pathway 3: Knowledge Oasis, Peer-Reviewed Research & Novels'}
      </div>

      {/* Item 1: Articles & Academic Research Encyclopedia */}
      <a
        href="/articles"
        onClick={(e) => {
          e.preventDefault();
          onCleanNav('articles', '/articles', onOpenArticles);
        }}
        className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer text-start ${
          isLight ? 'hover:bg-emerald-50' : 'hover:bg-white/10'
        }`}
      >
        <BookOpen className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-xs">
            {isAr
              ? 'موسوعة المقالات والأبحاث الأكاديمية المحكّمة'
              : 'Clinical Articles & Peer-Reviewed Research Encyclopedia'}
          </div>
          <div
            className={`text-[11px] font-normal mt-0.5 ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            {isAr
              ? 'مقالات إكلينيكية معمّقة وأوراق بحثية محكّمة بصيغة APA'
              : 'Clinical narrative articles & peer-reviewed APA research papers'}
          </div>
        </div>
      </a>

      {/* Item 2: Novels Directory Page */}
      <a
        href="/novels"
        onClick={(e) => {
          e.preventDefault();
          onCleanNav('novels', '/novels', onOpenNovels);
        }}
        className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer text-start ${
          isLight ? 'hover:bg-amber-50' : 'hover:bg-white/10'
        }`}
      >
        <Feather className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-xs">
            {isAr
              ? 'مكتبة الروايات الأدبية والتحقيقات والخيال العلمي'
              : 'Literary, Sci-Fi & Forensic Mystery Novels Library'}
          </div>
          <div
            className={`text-[11px] font-normal mt-0.5 ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            {isAr
              ? 'في بيتنا ياسمين • شيفرة الأندرويد • ظلال لا تترك أثراً والمزيد'
              : 'Multi-genre full novels with reader mode, time/place & commentary'}
          </div>
        </div>
      </a>

      {/* Item 3: Scientific Methodology & Sources */}
      {onNavigatePage && (
        <a
          href="/methodology"
          onClick={(e) => {
            e.preventDefault();
            onCleanNav('methodology', '/methodology');
          }}
          className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer text-start ${
            isLight ? 'hover:bg-sky-50' : 'hover:bg-white/10'
          }`}
        >
          <FileText className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-xs">
              {isAr
                ? 'المنهجية العلمية والمصادر الأكاديمية'
                : 'Scientific Methodology & Academic Sources'}
            </div>
            <div
              className={`text-[11px] font-normal mt-0.5 ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'توثيق النماذج السيكومترية، الخصوصية، وأخلاقيات البحث'
                : 'Documentation of psychometric models, privacy, and research ethics'}
            </div>
          </div>
        </a>
      )}

      {/* Item 4: Interactive Tools Hub */}
      {onNavigatePage && (
        <a
          href="/tools"
          onClick={(e) => {
            e.preventDefault();
            onCleanNav('tools', '/tools');
          }}
          className={`w-full p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer border-t text-start ${
            isLight
              ? 'hover:bg-violet-50 border-slate-100'
              : 'hover:bg-white/10 border-white/10'
          }`}
        >
          <Compass className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-xs">
              {isAr ? 'دليل الأدوات التفاعلية المتكامل' : 'Interactive Tools Directory'}
            </div>
            <div
              className={`text-[11px] font-normal mt-0.5 ${
                isLight ? 'text-slate-700' : 'text-slate-300'
              }`}
            >
              {isAr
                ? 'The Blind Date • التوافق المزدوج • معالج التوجيه الذكي'
                : 'The Blind Date, Couple Invite & Guided Compass'}
            </div>
          </div>
        </a>
      )}
    </div>
  );
};

export default NavbarDesktopDropdown;
