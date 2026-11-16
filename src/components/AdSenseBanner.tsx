import React, { useEffect, useRef, useState } from 'react';
import { useAppTheme } from '../utils/theme';

const ADSENSE_STORAGE_KEY = 'mirat_adsense_config_v2';
const DEFAULT_ADSENSE_PUB_ID = 'pub-7880718645976012';
const DEFAULT_ADSENSE_CLIENT_TAG = 'ca-pub-7880718645976012';

function applyAdSenseHeadTags(publisherId: string = DEFAULT_ADSENSE_PUB_ID) {
  if (typeof document === 'undefined') return;
  const cleanPubId = publisherId.replace(/^ca-/, '').replace(/^pub-/, '');
  const fullClientTag = `ca-pub-${cleanPubId}`;

  let meta = document.querySelector('meta[name="google-adsense-account"]') as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'google-adsense-account';
    document.head.appendChild(meta);
  }
  meta.content = fullClientTag;
}

interface Props {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const AdSenseBanner: React.FC<Props> = ({
  slot = '1234567890',
  format = 'auto',
  className = '',
  responsive = true,
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const [theme] = useAppTheme();
  const isLight = theme === 'light';
  const [clientTag, setClientTag] = useState(DEFAULT_ADSENSE_CLIENT_TAG);
  const [activeSlot, setActiveSlot] = useState(slot);

  useEffect(() => {
    const syncConfig = (cfg: any) => {
      if (!cfg) return;
      if (cfg.publisherId && !String(cfg.publisherId).includes('9846513204859123')) {
        const clean = String(cfg.publisherId).replace(/^ca-/, '').replace(/^pub-/, '');
        const tag = `ca-pub-${clean}`;
        setClientTag(tag);
        applyAdSenseHeadTags(clean);
      } else {
        setClientTag(DEFAULT_ADSENSE_CLIENT_TAG);
        applyAdSenseHeadTags(DEFAULT_ADSENSE_PUB_ID);
      }
      if (slot === '1234567890' && cfg.headerSlot) {
        setActiveSlot(cfg.headerSlot);
      } else if (slot === '2345678901' && cfg.inArticleSlot) {
        setActiveSlot(cfg.inArticleSlot);
      } else if (cfg.footerSlot && slot === '3456789012') {
        setActiveSlot(cfg.footerSlot);
      }
    };

    try {
      localStorage.removeItem('mirat_adsense_config_v1');
      const raw = localStorage.getItem(ADSENSE_STORAGE_KEY);
      if (raw) {
        syncConfig(JSON.parse(raw));
      } else {
        applyAdSenseHeadTags(DEFAULT_ADSENSE_PUB_ID);
      }
    } catch {
      applyAdSenseHeadTags(DEFAULT_ADSENSE_PUB_ID);
    }

    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent;
      if (custom.detail) syncConfig(custom.detail);
    };
    window.addEventListener('adsense-config-updated', handleUpdate);
    return () => window.removeEventListener('adsense-config-updated', handleUpdate);
  }, [slot]);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch {
      // AdSense push catch for duplicate ads or ad-blockers
    }
  }, [clientTag, activeSlot]);

  return (
    <div className={`w-full max-w-4xl mx-auto my-4 text-center ${className}`} dir="rtl">
      <div
        className={`flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold border-b ${
          isLight
            ? 'text-slate-700 border-slate-200'
            : 'text-slate-200 border-white/10'
        }`}
      >
        <span className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isLight ? 'bg-emerald-700' : 'bg-emerald-400'
            }`}
          />
          <span>إعلان معتمد من Google AdSense</span>
        </span>
        <span
          className={`text-[10px] font-mono font-bold ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}
          dir="ltr"
        >
          {clientTag}
        </span>
      </div>

      <div
        className={`relative min-h-[90px] rounded-2xl border p-2 flex items-center justify-center overflow-hidden ${
          isLight
            ? 'bg-slate-50 border-slate-200'
            : 'bg-slate-900/80 border-white/10'
        }`}
      >
        {/* Real AdSense Ad Unit Tag */}
        <ins
          key={`${clientTag}-${activeSlot}`}
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', minWidth: '280px', width: '100%' }}
          data-ad-client={clientTag}
          data-ad-slot={activeSlot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />

        {/* Fallback graceful presentation when AdSense is reviewing the site or ad-blocker is on */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition p-2">
          <div
            className={`flex items-center gap-2 text-xs font-bold ${
              isLight ? 'text-slate-800' : 'text-slate-100'
            }`}
          >
            <span
              className={`font-['Alexandria'] font-extrabold ${
                isLight ? 'text-amber-800' : 'text-amber-300'
              }`}
            >
              Google AdSense
            </span>
            <span>• مساحة إعلانية متجاوبة ({activeSlot})</span>
          </div>
          <span
            className={`text-[11px] font-medium mt-0.5 ${
              isLight ? 'text-slate-700' : 'text-slate-300'
            }`}
          >
            مرتبط بمعرف الناشر ({clientTag}) — تظهر الإعلانات تلقائياً للزوار
          </span>
        </div>
      </div>
    </div>
  );
};
