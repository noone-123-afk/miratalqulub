import { PartnerAnalysisResult, UserProfile } from '../types';

export async function generateShareCardCanvas(
  result: PartnerAnalysisResult,
  profile: UserProfile,
  imageUrl: string
): Promise<string> {
  const canvas = document.createElement('canvas');
  const width = 1080;
  const height = 1520;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return imageUrl;

  // Background deep royal gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#150c26');
  bgGrad.addColorStop(0.35, '#0b0817');
  bgGrad.addColorStop(1, '#24081c');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Outer frame
  ctx.strokeStyle = 'rgba(244, 63, 94, 0.45)';
  ctx.lineWidth = 6;
  roundRect(ctx, 30, 30, width - 60, height - 60, 44);
  ctx.stroke();

  // Inner subtle gold border
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)';
  ctx.lineWidth = 2;
  roundRect(ctx, 42, 42, width - 84, height - 84, 36);
  ctx.stroke();

  // Header
  ctx.textAlign = 'center';
  ctx.font = 'bold 36px Tajawal, sans-serif';
  ctx.fillStyle = '#fb7185';
  ctx.fillText('✨ مِـرآة الـقـلـوب ✨', width / 2, 95);

  ctx.font = '22px Tajawal, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('دراسة التوافق الفكري والمجتمعي والنفسي المعتمدة', width / 2, 130);

  // Load and draw partner image
  try {
    const img = await loadImage(imageUrl);
    const imgW = 600;
    const imgH = 600;
    const imgX = (width - imgW) / 2;
    const imgY = 165;
    const imgRadius = 36;

    // Glowing shadow behind image
    ctx.save();
    ctx.shadowColor = 'rgba(244, 63, 94, 0.65)';
    ctx.shadowBlur = 45;
    ctx.fillStyle = '#ffffff';
    roundRect(ctx, imgX, imgY, imgW, imgH, imgRadius);
    ctx.fill();
    ctx.restore();

    // Clip and draw image
    ctx.save();
    roundRect(ctx, imgX, imgY, imgW, imgH, imgRadius);
    ctx.clip();
    ctx.drawImage(img, imgX, imgY, imgW, imgH);
    ctx.restore();

    // Border on image
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 4;
    roundRect(ctx, imgX, imgY, imgW, imgH, imgRadius);
    ctx.stroke();
    ctx.restore();
  } catch (e) {
    console.error('Failed to draw portrait image on canvas:', e);
  }

  // Proposed Name Pill (Prominent Gold & Rose luxury banner)
  const nameY = 820;
  ctx.save();
  ctx.fillStyle = 'rgba(244, 63, 94, 0.95)';
  roundRect(ctx, width / 2 - 240, nameY - 40, 480, 80, 40);
  ctx.fill();
  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 3;
  roundRect(ctx, width / 2 - 240, nameY - 40, 480, 80, 40);
  ctx.stroke();

  ctx.font = 'bold 42px Alexandria, Tajawal, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`شريك الحياة: ${result.proposedPartnerName}`, width / 2, nameY + 14);
  ctx.restore();

  // Compatibility Score
  ctx.font = 'bold 30px Tajawal, sans-serif';
  ctx.fillStyle = '#fde047';
  ctx.fillText(`نسبة التوافق الكلي: ${result.compatibilityScore}% ❤️`, width / 2, 905);

  // Archetype & Origin
  ctx.font = 'bold 36px Tajawal, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(result.partnerArchetype, width / 2, 955);

  ctx.font = '24px Tajawal, sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText(`الأصل والمجتمع: ${profile.country} (${profile.ethnicity})`, width / 2, 995);

  // Scientific Compatibility Indicators Box
  const metricsBoxY = 1040;
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  roundRect(ctx, 80, metricsBoxY, width - 160, 160, 24);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2;
  roundRect(ctx, 80, metricsBoxY, width - 160, 160, 24);
  ctx.stroke();

  // Draw 3 scientific score columns
  const colW = (width - 160) / 3;
  const metrics = [
    { title: 'التوافق الفكري', score: result.intellectualScore || 96, color: '#38bdf8' },
    { title: 'التوافق المجتمعي', score: result.sociologicalScore || 95, color: '#c084fc' },
    { title: 'الذكاء العاطفي', score: result.emotionalScore || 98, color: '#fb7185' },
  ];

  metrics.forEach((m, idx) => {
    const cx = 80 + idx * colW + colW / 2;
    ctx.font = 'bold 22px Tajawal, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(m.title, cx, metricsBoxY + 50);

    ctx.font = 'bold 44px Alexandria, Tajawal, sans-serif';
    ctx.fillStyle = m.color;
    ctx.fillText(`${m.score}%`, cx, metricsBoxY + 110);
  });
  ctx.restore();

  // Name meaning quote
  ctx.font = 'italic 22px Tajawal, sans-serif';
  ctx.fillStyle = '#fef08a';
  ctx.fillText(`دلالة الاسم: «${result.nameMeaning}»`, width / 2, 1260);

  // Partner Quote
  ctx.font = 'italic 24px Tajawal, sans-serif';
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText(`${result.partnerVibeQuote}`, width / 2, 1330);

  // Love language and attachment
  ctx.font = 'bold 22px Tajawal, sans-serif';
  ctx.fillStyle = '#f43f5e';
  ctx.fillText(`لغة الحب: ${result.loveLanguage} • ${result.attachmentStyle || 'ارتباط آمن'}`, width / 2, 1380);

  // Footer branding
  ctx.font = 'bold 22px Tajawal, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('منصة مِـرآة القـلوب • دراسة التوافق الإنساني • الأردن - عمّان', width / 2, 1460);

  return canvas.toDataURL('image/png');
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = src;
  });
}
