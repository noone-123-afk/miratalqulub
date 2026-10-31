import { AnniversaryActivity, VirtualMeetingInfo } from '../types';

export const DEFAULT_ANNIVERSARY_ACTIVITIES: AnniversaryActivity[] = [
  {
    id: 'activity-1',
    title: 'عشاء رومانسي خاص تحت ضوء الشموع والنجوم',
    category: 'أجواء شاعرية',
    description:
      'حجز طاولة خاصة في مطعم بإطلالة بانورامية هادئة، مع إعادة تمثيل أول حوار دار بينكما واستحضار مشاعر النظرة الأولى والبدايات.',
    vibe: 'رومانسية طاغية وهدوء حميمي',
    location: 'مطعم فاخر بإطلالة ساحرة أو جلسة شاطئية/جبلية خاصة',
    icon: 'Sparkles',
  },
  {
    id: 'activity-2',
    title: 'كبسولة الذكريات السنوية (Love Time Capsule)',
    category: 'رمزية خالدة',
    description:
      'كتابة رسائل غرامية عميقة بخط اليد يصف فيها كل طرف ما غيره الآخر في حياته خلال العام، وحفظها داخل صندوق خشبي أنيق لا يُفتح إلا في الذكرى الخامسة.',
    vibe: 'عمق عاطفي ووفاء مستمر',
    location: 'جلسة خاصة في البيت مع موسيقى هادئة وشموع عطرية',
    icon: 'Gift',
  },
  {
    id: 'activity-3',
    title: 'رحلة هروب استجمامية إلى الطبيعة أو واحة هادئة',
    category: 'مغامرة واسترخاء',
    description:
      'قضاء عطلة نهاية أسبوع في منتجع منعزل (في الطبيعة، جبل أو شاليه خاص)، للاسترخاء وإغلاق الهواتف وتجديد كيمياء الروح والتواصل العميق.',
    vibe: 'سكينة، استرخاء وتجديد العهد',
    location: 'منتجع جبلي، شاليه شاطئي أو مخيم صحراوي فاخر',
    icon: 'Compass',
  },
  {
    id: 'activity-4',
    title: 'تبادل هدية رمزية محفورة بتاريخ التعارف',
    category: 'تخليد اللحظة',
    description:
      'إهداء قطعة تذكارية فريدة محفورة بتاريخ لقائكما والاسم المقترح (مثل ساعة كلاسيكية، عطر مخصص، أو إطار فوتوغرافي فخم يجمعكما).',
    vibe: 'أناقة وتقدير لا ينسى',
    location: 'لحظة تسليم خاصة خلال نزهة غروب الشمس',
    icon: 'Heart',
  },
];

// Helper to format Arabic date
export function formatArabicDate(date: Date): string {
  const months = [
    'يناير',
    'فبراير',
    'مارس',
    'أبريل',
    'مايو',
    'يونيو',
    'يوليو',
    'أغسطس',
    'سبتمبر',
    'أكتوبر',
    'نوفمبر',
    'ديسمبر',
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}م`;
}

// Generate Hijri approximation or formatted string
export function getHijriDateString(date: Date): string {
  try {
    const formatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formatter.format(date);
  } catch {
    return '1448 هـ';
  }
}

// Generate season vibe based on month
export function getSeasonVibe(month: number): string {
  if (month >= 2 && month <= 4) return 'موسم ربيع القلوب وبدايات الأزهار 🌸';
  if (month >= 5 && month <= 7) return 'موسم الصيف الدافئ وليالي القمر المضيئة ☀️';
  if (month >= 8 && month <= 10) return 'موسم الخريف الذهبي والسكينة العاطفية 🍂';
  return 'موسم الشتاء الرومانسي ودفء القهوة والمطر 🌧️';
}

// Create Virtual Meeting Info
export function calculateVirtualMeetingInfo(
  mode: 'today' | 'random' | 'custom',
  customDate?: Date
): VirtualMeetingInfo {
  let meetingDate: Date;

  if (mode === 'today') {
    meetingDate = new Date();
  } else if (mode === 'random') {
    // Generate a romantic random date within the past year or recent season
    const now = new Date();
    const randomPastDays = Math.floor(Math.random() * 180) + 30; // 30 to 210 days ago
    meetingDate = new Date(now.getTime() - randomPastDays * 24 * 60 * 60 * 1000);
  } else {
    meetingDate = customDate || new Date();
  }

  // 1 Year Anniversary
  const anniversaryDate = new Date(meetingDate);
  anniversaryDate.setFullYear(meetingDate.getFullYear() + 1);

  const now = new Date();
  const diffTime = anniversaryDate.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  return {
    type: mode,
    dateString: formatArabicDate(meetingDate),
    hijriString: getHijriDateString(meetingDate),
    season: getSeasonVibe(meetingDate.getMonth()),
    anniversaryString: formatArabicDate(anniversaryDate),
    daysRemaining: daysRemaining > 0 ? daysRemaining : 365,
  };
}
