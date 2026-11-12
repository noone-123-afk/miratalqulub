import officialLogoImg from '../assets/images/mirat_al_qulub_logo_1794297285302.jpg';

export const OFFICIAL_LOGO_URL: string = officialLogoImg;

/**
 * Downloads the official 1024x1024 Mirror of Hearts logo directly from browser memory
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
    canvas.width = img.naturalWidth || 1024;
    canvas.height = img.naturalHeight || 1024;
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
    // Fallback to direct fetch of the bundled asset URL
  }

  try {
    const response = await fetch(OFFICIAL_LOGO_URL);
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
