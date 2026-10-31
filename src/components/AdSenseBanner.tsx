import React, { useEffect, useRef, useState } from 'react';
import {
  ADSENSE_STORAGE_KEY,
  DEFAULT_ADSENSE_CLIENT_TAG,
  DEFAULT_ADSENSE_PUB_ID,
  applyAdSenseHeadTags,
} from './AdSenseModal';
import { db, doc, getDoc, setDoc } from '../firebase';

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

    fetch('/api/adsense-config')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) syncConfig(d);
      })
      .catch(() => {});

    getDoc(doc(db, 'site_config', 'adsense'))
      .then((snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data.publisherId && !String(data.publisherId).includes('9846513204859123')) {
            syncConfig(data);
          } else {
            // Upgrade Firestore document immediately to the new publisher ID
            setDoc(
              doc(db, 'site_config', 'adsense'),
              {
                publisherId: DEFAULT_ADSENSE_PUB_ID,
                clientTag: DEFAULT_ADSENSE_CLIENT_TAG,
                adsTxtLine: 'google.com, pub-7880718645976012, DIRECT, f08c47fec0942fa0',
                customDomain: 'miratalqulub.com',
                updatedAt: new Date().toISOString(),
              },
              { merge: true }
            ).catch(() => {});
          }
        } else {
          // Seed Firestore with the official publisher ID & domain
          setDoc(
            doc(db, 'site_config', 'adsense'),
            {
              publisherId: DEFAULT_ADSENSE_PUB_ID,
              clientTag: DEFAULT_ADSENSE_CLIENT_TAG,
              headerSlot: '1234567890',
              inArticleSlot: '2345678901',
              footerSlot: '3456789012',
              autoAdsEnabled: true,
              adsTxtLine: 'google.com, pub-7880718645976012, DIRECT, f08c47fec0942fa0',
              customDomain: 'miratalqulub.com',
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          ).catch(() => {});
        }
      })
      .catch(() => {});

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
      <div className="flex items-center justify-between px-3 py-1 text-[10px] text-gray-400 border-b border-white/5">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>إعلان معتمد من Google AdSense</span>
        </span>
        <span className="text-[9px] text-gray-500 font-mono" dir="ltr">
          {clientTag}
        </span>
      </div>

      <div className="relative min-h-[90px] rounded-2xl bg-white/[0.02] border border-white/5 p-2 flex items-center justify-center overflow-hidden">
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
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-45 hover:opacity-75 transition p-2">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
            <span className="font-['Alexandria'] font-bold text-amber-300">Google AdSense</span>
            <span>• مساحة إعلانية متجاوبة ({activeSlot})</span>
          </div>
          <span className="text-[10px] text-gray-500 mt-0.5">
            مرتبط بمعرف الناشر ({clientTag}) — تظهر الإعلانات تلقائياً للزوار
          </span>
        </div>
      </div>
    </div>
  );
};
