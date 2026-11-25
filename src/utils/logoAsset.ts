export const OFFICIAL_LOGO_URL = '/logo.webp';
export const OFFICIAL_LOGO_HERO_URL = '/logo-112.webp';
export const OFFICIAL_LOGO_ICON_URL = '/logo-48.webp';

export const OFFICIAL_LOGO_SRCSET =
  '/logo-48.webp 48w, /logo-64.webp 64w, /logo-96.webp 96w, /logo-112.webp 112w, /logo.webp 154w';

export const OFFICIAL_LOGO_SIZES = {
  hero: '(max-width: 639px) 96px, 112px',
  navbar: '(max-width: 639px) 40px, 44px',
  footer: '44px',
  cardSmall: '48px',
  cardMedium: '56px',
  cardResponsive: '(max-width: 639px) 56px, 64px',
} as const;

export const OG_IMAGE_WEBP_URL = '/og-image.webp';
export const OG_IMAGE_WEBP_SRCSET =
  '/og-image-480.webp 480w, /og-image-800.webp 800w, /og-image.webp 1200w';

/**
 * Downloads the official Mirror of Hearts logo directly from browser memory
 * as a genuine binary PNG or JPEG Blob so no iframe/proxy redirect can ever corrupt the file.
 */
export async function downloadOfficialLogoFile(format: 'png' | 'jpg' = 'png'): Promise<void> {
  const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
  const fileName = `mirat-al-qulub-official-logo.${format}`;

  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = OFFICIAL_LOGO_URL;
    });

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || 154;
    canvas.height = img.naturalHeight || 154;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      if (format === 'jpg') {
        ctx.fillStyle = '#0b0e17';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), mimeType, 0.98)
      );

      if (blob && blob.size > 1000) {
        triggerBlobDownload(blob, fileName);
        return;
      }
    }
  } catch {
    // Fallback to direct fetch of the static logo file
  }

  try {
    const response = await fetch(`/logo.${format}`);
    const blob = await response.blob();
    if (blob && blob.size > 1000) {
      triggerBlobDownload(blob, fileName);
      return;
    }
  } catch {
    // Final fallback to server endpoint
    const a = document.createElement('a');
    a.href = `/api/download-logo?format=${format}`;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

function triggerBlobDownload(blob: Blob, fileName: string) {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 4000);
}
