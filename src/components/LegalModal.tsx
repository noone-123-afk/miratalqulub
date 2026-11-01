import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  FileText,
  Lock,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Eye,
  Server,
  UserCheck,
  Cookie,
  Award,
  Globe,
  Trash2,
} from 'lucide-react';
import { soundManager } from '../utils/sound';

export type LegalTab = 'privacy' | 'terms';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
}

export const LegalModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0f172a] border border-slate-700 shadow-2xl text-white overflow-hidden shadow-black/80"
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0 bg-slate-900/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400">
                {activeTab === 'privacy' ? <Lock className="w-5 h-5 text-emerald-400" /> : <FileText className="w-5 h-5 text-blue-400" />}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-white font-['Alexandria']">
                  {activeTab === 'privacy' ? 'سياسة الخصوصية وحماية البيانات' : 'شروط الاستخدام والخدمة'}
                </h3>
                <p className="text-xs text-slate-300">
                  منصة مِـرآة القـلوب • متوافقة مع متطلبات Google AdSense و GDPR
                </p>
              </div>
            </div>

            {/* Tab switchers & Close */}
            <div className="flex items-center gap-2">
              <div className="flex p-1 rounded-2xl bg-slate-950 border border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setActiveTab('privacy');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'privacy'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>الخصوصية</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playTap();
                    setActiveTab('terms');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'terms'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>الشروط</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onClose();
                  window.location.hash = activeTab === 'privacy' ? '#/privacy' : '#/terms';
                }}
                className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[11px] font-bold text-slate-300 transition flex items-center gap-1 cursor-pointer"
                title="عرض الصفحة الكاملة"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">الصفحة الكاملة</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playTap();
                  onClose();
                }}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6 text-xs sm:text-sm text-slate-200 leading-relaxed scrollbar-thin">
            {activeTab === 'privacy' ? (
              /* PRIVACY POLICY (GOOGLE ADSENSE & PSYCHOMETRIC ENCRYPTION COMPLIANT) */
              <div className="space-y-6">
                {/* Critical Psychological Data Protection Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-emerald-300 text-sm sm:text-base">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>ميثاق حماية وتشفير البيانات والالتزام بسياسات Google (إقرار صريح)</span>
                  </div>
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                    نقر ونؤكد بشكل قاطع أن جميع <strong>البيانات النفسية</strong>، وإجابات <strong>مقاييس الشخصية واختبارات الذكاءات وكاشف التوافق</strong> تُحفظ وتُعالج بخصوصية كاملة وتشفير أمني متقدم (TLS 1.3 / AES-256).
                  </p>
                  <div className="p-3 rounded-xl bg-emerald-900/50 border border-emerald-500/40 text-emerald-100 text-xs sm:text-sm font-semibold">
                    «أي معلومات يتم مشاركتها مع الموقع هي واضحة وضمن موافقتك الشخصية، ولا يتم استخدامها، أو المساس بها، أو الإساءة لها، أو بيعها لأي جهات أخرى، وكل شيء يخضع لشروط وسياسة قوقل».
                  </div>
                </div>

                {/* Public Sharing Disclaimer */}
                <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-amber-300 text-xs sm:text-sm">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>إخلاء مسؤولية حول المشاركة العلنية الطوعية للنتائج</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    تخلي إدارة منصة «مِـرآة القـلوب» كامل مسؤوليتها القانونية والأخلاقية عن أي نتائج، أو بطاقات مشاركة، أو تقارير شخصية يختار المستخدم بمحض إرادته الحرة ورغبته الذاتية مشاركتها علناً مع أطراف ثالثة أو نشرها عبر وسائل التواصل الاجتماعي (مثل واتساب، إكس/تويتر، فيسبوك أو غيرها). حماية الروابط المنشورة علناً تقع على عاتق المستخدم وحده.
                  </p>
                </div>

                {/* Section 1: Intro & Scope */}
                <section className="space-y-2">
                  <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>1. مقدمة ونطاق سياسة الخصوصية</span>
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    تحترم منصة «مِـرآة القـلوب» حقك الكامل في حماية بياناتك الشخصية والخصوصية الرقمية. توضح هذه السياسة كيف نقوم بجمع، وحماية، واستخدام، ومعالجة المعلومات عند زيارتك لموقعنا أو استخدامك للخدمات التفاعلية، وفقاً للائحة العامة لحماية البيانات (GDPR)، وقانون خصوصية المستهلك في كاليفورنيا (CCPA)، وسياسات ناشري Google AdSense.
                  </p>
                </section>

                {/* Section 2: Google AdSense & Cookies */}
                <section className="space-y-2 p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-blue-400" />
                    <span>2. إعلانات Google AdSense وملفات تعريف الارتباط (Cookies)</span>
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    تستعين منصتنا بخدمة <strong>Google AdSense</strong> لعرض الإعلانات عند زيارتك لموقعنا. يُرجى الانتباه للنقاط القانونية التالية:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-300 pr-2">
                    <li>
                      يستخدم مورّدون خارجيون، بما في ذلك Google، ملفات تعريف ارتباط (مثل ملف تعريف الارتباط DART) لعرض الإعلانات استنادًا إلى زيارات المستخدم السابقة لموقعنا أو لمواقع أخرى على الويب.
                    </li>
                    <li>
                      يتيح استخدام Google لملفات تعريف الارتباط الإعلانية لها ولشركائها عرض إعلانات للمستخدمين استنادًا إلى زياراتهم لمواقعك و/أو مواقع أخرى عبر الإنترنت.
                    </li>
                    <li>
                      يمكن للمستخدمين إلغاء الاشتراك في الإعلانات المخصصة في أي وقت عبر زيارة:
                      <a
                        href="https://adssettings.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline font-semibold mr-1.5 inline-flex items-center gap-1"
                      >
                        إعدادات إعلانات Google <ExternalLink className="w-3 h-3" />
                      </a>
                      أو عبر موقع
                      <a
                        href="https://www.aboutads.info"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline font-semibold mr-1 inline-flex items-center gap-1"
                      >
                        AboutAds.info <ExternalLink className="w-3 h-3" />
                      </a>.
                    </li>
                    <li>
                      نحن لا نمرر أي بيانات تعريف شخصية (PII) أو إجابات استبيانات نفسية إلى Google AdSense.
                    </li>
                  </ul>
                </section>

                {/* Section 3: Data We Collect */}
                <section className="space-y-2">
                  <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>3. البيانات التي نجمعها وكيفية معالجتها</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="font-bold text-white block">بيانات الحساب الاختيارية:</span>
                      <p className="text-slate-300 leading-relaxed">
                        البريد الإلكتروني والاسم المستعار عند التسجيل لحفظ سجل اختباراتك وتتبع تطورك الشخصي.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="font-bold text-white block">بيانات القياس السلوكي:</span>
                      <p className="text-slate-300 leading-relaxed">
                        إجابات مقاييس ليكرت، الفئة العمرية والجنس لحساب أوزان التوافق والذكاءات بدقة إحصائية.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Section 4: Security & Storage */}
                <section className="space-y-2">
                  <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-400" />
                    <span>4. أمان البيانات والبنية التحتية السحابية</span>
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    يتم استضافة وتشغيل المنصة على بنية تحتية آمنة مقدمة من <strong>Google Cloud Platform (GCP)</strong> و <strong>Firebase Firestore</strong>، مع تطبيق أحدث معايير التشفير أثناء النقل (TLS 1.3) وأثناء التخزين (AES-256). كما نوفر ميزة <em>قفل النتائج برمز PIN محلي</em> لحماية تقاريرك من تطفل الآخرين عند استخدام الأجهزة المشتركة.
                  </p>
                </section>

                {/* Section 5: User Rights */}
                <section className="space-y-2">
                  <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-blue-400" />
                    <span>5. حقوقك القانونية وحذف البيانات (GDPR Rights)</span>
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    وفقاً للأنظمة الدولية لحماية البيانات، يحق لك في أي وقت:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 pr-2">
                    <li>الاطلاع على جميع النتائج والاختبارات المحفوظة بحسابك.</li>
                    <li>تعديل بيانات ملفك الشخصي أو إخفاء ملفك من الظهور العام بنقرة واحدة.</li>
                    <li>حذف سجل اختباراتك بالكامل أو حذف حسابك نهائياً من خوادمنا.</li>
                    <li>طلب نسخة من بياناتك بتنسيق إلكتروني منظم ومقروء.</li>
                  </ul>
                </section>

                {/* Section 6: Contact Data Protection Officer */}
                <section className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <h4 className="text-sm font-extrabold text-white">6. الاتصال بإدارة المنصة ومسؤول حماية البيانات (DPO)</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    الموقع مشرف عليه ومُدار بواسطة مجموعة من المهندسين المتخصصين. لأي استفسارات قانونية، طلبات حذف البيانات، أو الملاحظات، يرجى التواصل معنا عبر القنوات المعتمدة:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-xs text-slate-300 pt-1">
                    <div>
                      <span className="text-slate-400">البريد الإلكتروني المعتمد:</span>{' '}
                      <span className="font-mono text-blue-400 font-bold select-all">one497303@gmail.com</span>
                    </div>
                    <div>
                      <span className="text-slate-400">العنوان الرسمي:</span>{' '}
                      <span className="text-emerald-400 font-semibold">الأردن - عمّان</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">تاريخ آخر تحديث: أكتوبر 2026</p>
                </section>
              </div>
            ) : (
              /* TERMS OF SERVICE */
              <div className="space-y-6">
                <section className="space-y-2">
                  <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>1. قبول الشروط والأحكام</span>
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    باستخدامك لمنصة «مِـرآة القـلوب» أو أي من أدواتها التفاعلية (مقاييس الشخصية، اختبارات الذكاء، كاشف التوافق، The Blind Date، موسوعة المقالات والروايات)، فإنك توافق على الالتزام الكامل بهذه الشروط والأحكام والسياسات الملحقة بها. الموقع مشرف عليه ومُدار بواسطة مجموعة من المهندسين المتخصصين من مقره في <strong>الأردن - عمّان</strong>.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>2. طبيعة الخدمات والأدوات السيكومترية (إخلاء مسؤولية توجيهي)</span>
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    صُممت الاختبارات والمقاييس النفسية المتاحة (بما في ذلك نظرية غاردنر، مقاييس السمات الخمس، و16PF) لأغراض <strong>التنمية الذاتية، الاستكشاف المعرفي، والوعي السلوكي والتوافقي</strong>. لا تشكل هذه الأدوات بأي حال من الأحوال تشخيصاً طبياً نفسياً رسمياً أو بديلاً عن الاستشارة السريرية المباشرة مع طبيب نفسي مرخص.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>3. حقوق الملكية الفكرية</span>
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    جميع الحقوق محفوظة لمنصة «مِـرآة القـلوب». تشمل الملكية الفكرية النصوص البرمجية، الخوارزميات الحسابية، الروايات والتحقيقات الجنائية الأدبية، الرسومات البيانية والأعمال الفنية التوضيحية. يُحظر نسخ، أو إعادة نشر، أو هندسة عكسية لأي جزء من الموقع دون إذن كتابي مسبق من المالك.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>4. قواعد السلوك والتفاعل الأخلاقي</span>
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    يلتزم المستخدم عند المشاركة في ميزة The Blind Date التفاعلية أو كتابة التعليقات تحت الروايات بالآتي:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 pr-2">
                    <li>احترام الآداب العامة وقيم المجتمع وعدم الإساءة للآخرين.</li>
                    <li>الابتعاد التام عن خطابات الكراهية، التنمر، أو الترويج لأي أفكار تكفيرية أو متطرفة.</li>
                    <li>عدم نشر روابط احتيالية أو برمجيات خبيثة أو محاولات جمع معلومات الآخرين دون إذنهم.</li>
                  </ul>
                  <p className="text-xs text-rose-300 mt-1">
                    يحق لإدارة المنصة حظر أي حساب أو حذف أي تعليق يخالف هذه القواعد فورياً دون إشعار مسبق.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>5. إخلاء مسؤولية المشاركة العلنية الطوعية للنتائج</span>
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    تخلي المنصة كامل مسؤوليتها القانونية والأدبية عن أي بيانات أو بطاقات نتائج يختار المستخدم مشاركتها علناً بإرادته الحرة عبر شبكات التواصل أو الإنترنت. أي معلومات يتم مشاركتها مع الموقع هي واضحة وضمن موافقتك الشخصية، ولا يتم استخدامها، أو المساس بها، أو الإساءة لها، أو بيعها لأي جهات أخرى، وكل شيء يخضع لشروط وسياسة قوقل.
                  </p>
                </section>

                <section className="space-y-2">
                  <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>6. تعديل الشروط وإنهاء الخدمة وقنوات التواصل</span>
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    تحتفظ إدارة المنصة بحق تعديل أو تحديث هذه الشروط في أي وقت. لأي استفسارات أو تواصل: <span className="font-mono text-blue-400 select-all">one497303@gmail.com</span> (الأردن - عمّان).
                  </p>
                </section>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>موقع معتمد وآمن • Google Cloud Europe-West1</span>
            </div>
            <button
              type="button"
              onClick={() => {
                soundManager.playTap();
                onClose();
              }}
              className="w-full sm:w-auto py-2 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-sm cursor-pointer"
            >
              فهمت وموافق
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
