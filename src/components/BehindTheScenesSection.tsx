import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Mail,
  MapPin,
  Users,
  CheckCircle2,
  Send,
  MessageSquare,
  FileCheck,
} from 'lucide-react';
import { soundManager } from '../utils/sound';

interface Props {
  onExploreTests?: () => void;
  onExploreNovels?: () => void;
  onOpenContactFeedback?: () => void;
}

export const BehindTheScenesSection: React.FC<Props> = ({
  onExploreTests,
  onExploreNovels,
  onOpenContactFeedback,
}) => {
  return (
    <div className="w-full my-8 text-right" dir="rtl">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/40 text-blue-200 text-xs font-bold mb-3 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>عن إدارة المنصة والتواصل الرسمي</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 font-['Alexandria',sans-serif]">
          إدارة الموقع وفريق العمل الهندسي
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          الموقع مشرف عليه ومُدار بواسطة مجموعة من المهندسين المتخصصين، مع الالتزام التام بأعلى معايير الخصوصية والأمان.
        </p>
      </div>

      {/* Main Official Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-3xl bg-[#0f172a] border border-slate-700/80 p-5 sm:p-7 shadow-xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Engineering Oversight */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white font-['Alexandria']">
                فريق هندسي متخصص
              </h3>
              <p className="text-xs text-blue-400 font-semibold mt-0.5">
                إشراف وإدارة برمجية متكاملة
              </p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              الموقع مشرف عليه ومُدار بواسطة مجموعة من المهندسين المتخصصين في نظم الويب وقواعد البيانات السحابية، لمتابعة استقرار المنصة وتطوير خدماتها المعرفية.
            </p>
          </div>

          {/* Official Location */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white font-['Alexandria']">
                المقر والعنوان الرسمي
              </h3>
              <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                المملكة الأردنية الهاشمية
              </p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              العنوان الرسمي لإدارة الموقع: <strong className="text-white">الأردن - عمّان</strong>.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5 border-t border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>إدارة موثقة وقانونية</span>
            </div>
          </div>

          {/* Official Contact */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white font-['Alexandria']">
                التواصل والاستفسارات
              </h3>
              <p className="text-xs text-purple-400 font-semibold mt-0.5">
                قناة الاتصال المعتمدة حصرياً
              </p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              للإبلاغ عن الملاحظات، المقترحات الفنية أو الاستفسارات العامة، يُرجى التواصل مباشرة عبر البريد الإلكتروني:
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:one497303@gmail.com"
                onClick={() => soundManager.playTap()}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-mono font-bold transition w-full justify-center cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>one497303@gmail.com</span>
              </a>

              {onOpenContactFeedback && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    onOpenContactFeedback();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition w-full justify-center cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>فتح نموذج الملاحظات الفوري ✉️</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Clear Professional Statement */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-right">
            <h4 className="font-extrabold text-sm text-white flex items-center justify-center sm:justify-start gap-2">
              <FileCheck className="w-4 h-4 text-blue-400" />
              <span>بيان الشفافية والموافقة الشخصية</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              أي معلومات يتم مشاركتها مع الموقع هي واضحة وضمن موافقتك الشخصية، ولا يتم استخدامها، أو المساس بها، أو الإساءة لها، أو بيعها لأي جهات أخرى، وكل شيء يخضع لشروط وسياسة قوقل.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onExploreTests && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onExploreTests();
                }}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition cursor-pointer"
              >
                اختبارات الذكاء
              </button>
            )}
            {onExploreNovels && (
              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onExploreNovels();
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition border border-slate-700 cursor-pointer"
              >
                الروايات والتحقيقات
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
