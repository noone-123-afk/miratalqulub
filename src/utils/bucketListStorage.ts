import { BucketListItem, BucketListCategory } from '../types';

export const BUCKET_CATEGORY_META: Record<
  BucketListCategory,
  { label: string; icon: string; color: string; badgeBg: string }
> = {
  travel: {
    label: 'سفر واستكشاف',
    icon: 'Plane',
    color: 'text-sky-400',
    badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  },
  romance: {
    label: 'رومانسية ولحظات دافئة',
    icon: 'Heart',
    color: 'text-rose-400',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  },
  learning: {
    label: 'توافق فكري وثقافة',
    icon: 'BookOpen',
    color: 'text-violet-400',
    badgeBg: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  },
  adventure: {
    label: 'مغامرات وتجارب حية',
    icon: 'Compass',
    color: 'text-amber-400',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  },
  home: {
    label: 'عش الزوجية ونمط الحياة',
    icon: 'Home',
    color: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
};

export const INSPIRATIONAL_SUGGESTIONS: {
  title: string;
  category: BucketListCategory;
}[] = [
  { title: 'رحلة لمشاهدة النجوم والتأمل في واحة صحراوية هادئة', category: 'romance' },
  { title: 'السفر معاً لاستكشاف مدائن صالح أو جزر المالديف', category: 'travel' },
  { title: 'قراءة كتاب شهرياً وتبادل الأفكار والنقاش في مقهى دافئ', category: 'learning' },
  { title: 'طبخ وجبة عشاء تقليدية من بلد جديد في نهاية كل شهر', category: 'home' },
  { title: 'زراعة شجرة تذكارية تحمل اسمينا وتكبر مع ذكرياتنا', category: 'adventure' },
  { title: 'حضور أمسية فنية أو معرض للخط العربي والتراث', category: 'learning' },
  { title: 'الذهاب في رحلة بالمنطاد الهوائي وقت شروق الشمس', category: 'adventure' },
  { title: 'توثيق ألبوم صور سنوي مطبوع يحكي محطات رحلتنا', category: 'romance' },
  { title: 'إعداد ركن قهوة منزلي خاص بتفاصيل وتصميم مشترك', category: 'home' },
  { title: 'تجربة التخييم الشتوي وإشعال الحطب مع شاي كرك دافئ', category: 'adventure' },
];

const STORAGE_PREFIX = 'miraa_bucket_list_';

export function getBucketListStorageKey(partnerName: string): string {
  const sanitized = partnerName.trim().toLowerCase().replace(/\s+/g, '_');
  return `${STORAGE_PREFIX}${sanitized}`;
}

export function loadBucketList(partnerName: string): BucketListItem[] {
  try {
    const key = getBucketListStorageKey(partnerName);
    const data = localStorage.getItem(key);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading bucket list from localStorage:', e);
  }

  // Initial starter template
  return [
    {
      id: 'default-1',
      title: `رحلة تأمل لمراقبة النجوم في ليلة مقمرة مع «${partnerName}»`,
      category: 'romance',
      completed: false,
      createdAt: Date.now() - 3600000,
    },
    {
      id: 'default-2',
      title: 'السفر معاً في وجهة جبلية هادئة واستكشاف طبيعتها',
      category: 'travel',
      completed: false,
      createdAt: Date.now() - 2500000,
    },
    {
      id: 'default-3',
      title: 'جلسة قراءة دورية لمناقشة كتب الفكر وتطوير الذات',
      category: 'learning',
      completed: false,
      createdAt: Date.now() - 1200000,
    },
    {
      id: 'default-4',
      title: 'تجهيز ركن قهوة دافئ وتصميم مساحتنا الخاصة بالمنزل',
      category: 'home',
      completed: false,
      createdAt: Date.now() - 600000,
    },
  ];
}

export function saveBucketList(partnerName: string, items: BucketListItem[]): void {
  try {
    const key = getBucketListStorageKey(partnerName);
    localStorage.setItem(key, JSON.stringify(items));
  } catch (e) {
    console.error('Error saving bucket list to localStorage:', e);
  }
}
