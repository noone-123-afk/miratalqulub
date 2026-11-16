// Genuine jsPDF (.pdf) & Interactive Bilingual (Arabic / English) Report Generator
// Uses the official `jspdf` library to construct multi-page A4 PDF documents with structured
// psychometric data tables, visual normative bars, and item-by-item audit tables in Arabic (RTL) or English (LTR).
// Avoids window.open() and window.alert() in accordance with runtime environment rules.

import { jsPDF } from 'jspdf';
import { getInitialLanguage } from '../context/LanguageContext';
import { SupportedLanguage, translateDynamicField } from '../data/translations';
import type { VisualChartsPayload } from '../types';

export interface PrintableReportSection {
  title: string;
  badge?: string;
  content: string;
  items?: string[];
  scorePercent?: number;
  color?: string;
}

export interface PrintableReportData {
  lang?: SupportedLanguage;
  reportTitle: string;
  subTitle: string;
  scientificBasis: string;
  userName?: string;
  completedAt: string;
  overallScoreLabel: string;
  overallScoreValue: string;
  cognitiveFingerprintTitle: string;
  executiveSummary: string;
  metrics: {
    label: string;
    scorePercent: number;
    rawText?: string;
    levelLabel?: string;
    color: string;
  }[];
  sections: PrintableReportSection[];
  careersOrRecommendations?: string[];
  disclaimerText?: string;
  questionAudit?: Array<{
    questionNumber?: number;
    questionId?: string;
    questionText?: string;
    textAr?: string;
    userAnswer?: string;
    chosenTextAr?: string;
    correctAnswerOrTrait?: string;
    isCorrectOrHigh?: boolean;
    pointsEarned?: string;
    scoreWeight?: number;
    explanationAr?: string;
    dimensionLabelAr?: string;
  }>;
  visualCharts?: VisualChartsPayload;
  comparisonDualRadar?: {
    personAName: string;
    personBName: string;
    axes: Array<{ axisNameAr: string; personAScore: number; personBScore: number }>;
  };
  textOnly?: boolean;
}

export interface PdfExportOptions {
  textOnly?: boolean;
  mode?: 'pdf' | 'print';
  lang?: SupportedLanguage;
}

export function generateExecutiveSummary(
  iqLevel: string,
  topEQSkill: string,
  topMISkill: string,
  lang: SupportedLanguage = getInitialLanguage()
): string {
  if (lang === 'en') {
    const enMI = translateDynamicField(topMISkill, 'en');
    const enEQ = translateDynamicField(topEQSkill, 'en');
    const enIQ = translateDynamicField(iqLevel, 'en');
    return `Based on the comprehensive psychometric assessment, the examinee demonstrates a prominent strength in "${enMI}", supported by well-developed proficiency in "${enEQ}" and a cognitive performance index of (${enIQ}). This profile forms a balanced cognitive-affective signature suited for analytical problem-solving, composed leadership, and empathetic interpersonal communication.`;
  }
  return `بناءً على التقييم السيكومتري الشامل، يتمتع المختبَر بقدرة بارزة في "${topMISkill}" مدعومة بمهارة متميزة في "${topEQSkill}"، ومستوى أداء معرفي (${iqLevel}). هذا المزيج يشكل بصمة معرفية ووجدانية تؤهله للتميز في البيئات التي تتطلب تحليلاً عميقاً، قيادة متزنة، وتواصلاً إنسانياً ذكياً، مع قدرة عالية على تحويل الأفكار المعقدة إلى إنجازات عملية ملموسة.`;
}

function localizeReportText(text: string | undefined, lang: SupportedLanguage): string {
  if (!text) return '';
  if (lang === 'ar') return text;
  return translateDynamicField(text, 'en');
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const cleaned = (text || '').replace(/\n+/g, ' ').trim();
  if (!cleaned) return [''];
  const words = cleaned.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const width = ctx.measureText(testLine).width;
    if (width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines.length > 0 ? lines : [''];
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawRadarChartOnCanvas(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  items: Array<{ label: string; score: number }>,
  strokeColor: string,
  fillRgba: string,
  title: string
) {
  if (!items || items.length < 3) return;
  ctx.save();
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 17px Alexandria, Tahoma, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, cx, cy - radius - 34);

  // Concentric reference rings (25%, 50%, 75%, 100%)
  [0.25, 0.5, 0.75, 1].forEach((rPct) => {
    ctx.beginPath();
    const r = radius * rPct;
    items.forEach((_, idx) => {
      const ang = (Math.PI * 2 * idx) / items.length - Math.PI / 2;
      const px = cx + Math.cos(ang) * r;
      const py = cy + Math.sin(ang) * r;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Spokes and axis labels
  items.forEach((it, idx) => {
    const ang = (Math.PI * 2 * idx) / items.length - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(ang) * radius, cy + Math.sin(ang) * radius);
    ctx.strokeStyle = '#e2e8f0';
    ctx.stroke();

    const lx = cx + Math.cos(ang) * (radius + 22);
    const ly = cy + Math.sin(ang) * (radius + 18);
    ctx.fillStyle = '#334155';
    ctx.font = 'bold 12px Alexandria, Tahoma, Arial, sans-serif';
    ctx.textAlign = Math.cos(ang) > 0.2 ? 'left' : Math.cos(ang) < -0.2 ? 'right' : 'center';
    const clamped = Math.max(0, Math.min(100, Math.round(it.score)));
    ctx.fillText(`${it.label.slice(0, 22)} (${clamped}%)`, lx, ly + 4);
  });

  // Data polygon
  ctx.beginPath();
  items.forEach((it, idx) => {
    const clamped = Math.max(0, Math.min(100, it.score));
    const r = (clamped / 100) * radius;
    const ang = (Math.PI * 2 * idx) / items.length - Math.PI / 2;
    const px = cx + Math.cos(ang) * r;
    const py = cy + Math.sin(ang) * r;
    if (idx === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();
  ctx.fillStyle = fillRgba;
  ctx.fill();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.restore();
}

function drawAttachmentQuadrantOnCanvas(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  anxiety: number,
  avoidance: number,
  styleLabel: string,
  title: string
) {
  ctx.save();
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 17px Alexandria, Tahoma, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, x + w / 2, y - 14);

  const halfW = w / 2;
  const halfH = h / 2;
  // 4 Quadrant fills
  ctx.fillStyle = 'rgba(245,158,11,0.12)';
  ctx.fillRect(x, y, halfW, halfH);
  ctx.fillStyle = 'rgba(244,63,94,0.12)';
  ctx.fillRect(x + halfW, y, halfW, halfH);
  ctx.fillStyle = 'rgba(16,185,129,0.15)';
  ctx.fillRect(x, y + halfH, halfW, halfH);
  ctx.fillStyle = 'rgba(249,115,22,0.12)';
  ctx.fillRect(x + halfW, y + halfH, halfW, halfH);

  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x, y, w, h);
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(x + halfW, y);
  ctx.lineTo(x + halfW, y + h);
  ctx.moveTo(x, y + halfH);
  ctx.lineTo(x + w, y + halfH);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.font = 'bold 12px Alexandria, Tahoma, Arial, sans-serif';
  ctx.fillStyle = '#92400e';
  ctx.fillText('قلق متعطش (Anxious)', x + halfW / 2, y + 22);
  ctx.fillStyle = '#9f1239';
  ctx.fillText('حذر متذبذب (Fearful)', x + halfW + halfW / 2, y + 22);
  ctx.fillStyle = '#065f46';
  ctx.fillText('آمن مستقر (Secure)', x + halfW / 2, y + h - 14);
  ctx.fillStyle = '#9a3412';
  ctx.fillText('تجنبي مكتفٍ (Avoidant)', x + halfW + halfW / 2, y + h - 14);

  const safeAvoid = Math.max(0, Math.min(100, avoidance));
  const safeAnx = Math.max(0, Math.min(100, anxiety));
  const dotX = x + (safeAvoid / 100) * w;
  const dotY = y + h - (safeAnx / 100) * h;

  ctx.beginPath();
  ctx.arc(dotX, dotY, 13, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(109,40,217,0.28)';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(dotX, dotY, 6.5, 0, Math.PI * 2);
  ctx.fillStyle = '#6d28d9';
  ctx.fill();

  ctx.fillStyle = '#334155';
  ctx.font = 'bold 12.5px Alexandria, Tahoma, Arial, sans-serif';
  ctx.fillText(`${styleLabel} (${safeAnx}% قلق / ${safeAvoid}% تجنب)`, x + w / 2, y + h + 24);
  ctx.restore();
}

function drawDualComparisonRadarOnCanvas(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  personAName: string,
  personBName: string,
  axes: Array<{ axisNameAr: string; personAScore: number; personBScore: number }>,
  title: string
) {
  if (!axes || axes.length < 3) return;
  ctx.save();
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 18px Alexandria, Tahoma, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, cx, cy - radius - 42);

  [0.25, 0.5, 0.75, 1].forEach((rPct) => {
    ctx.beginPath();
    const r = radius * rPct;
    axes.forEach((_, idx) => {
      const ang = (Math.PI * 2 * idx) / axes.length - Math.PI / 2;
      const px = cx + Math.cos(ang) * r;
      const py = cy + Math.sin(ang) * r;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  axes.forEach((ax, idx) => {
    const ang = (Math.PI * 2 * idx) / axes.length - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(ang) * radius, cy + Math.sin(ang) * radius);
    ctx.strokeStyle = '#e2e8f0';
    ctx.stroke();

    const lx = cx + Math.cos(ang) * (radius + 26);
    const ly = cy + Math.sin(ang) * (radius + 20);
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 12px Alexandria, Tahoma, Arial, sans-serif';
    ctx.textAlign = Math.cos(ang) > 0.2 ? 'left' : Math.cos(ang) < -0.2 ? 'right' : 'center';
    ctx.fillText(ax.axisNameAr.split('(')[0].trim().slice(0, 26), lx, ly + 4);
  });

  // Person A polygon
  ctx.beginPath();
  axes.forEach((ax, idx) => {
    const r = (Math.max(0, Math.min(100, ax.personAScore)) / 100) * radius;
    const ang = (Math.PI * 2 * idx) / axes.length - Math.PI / 2;
    const px = cx + Math.cos(ang) * r;
    const py = cy + Math.sin(ang) * r;
    if (idx === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(139,92,246,0.28)';
  ctx.fill();
  ctx.strokeStyle = '#7c3aed';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Person B polygon
  ctx.beginPath();
  axes.forEach((ax, idx) => {
    const r = (Math.max(0, Math.min(100, ax.personBScore)) / 100) * radius;
    const ang = (Math.PI * 2 * idx) / axes.length - Math.PI / 2;
    const px = cx + Math.cos(ang) * r;
    const py = cy + Math.sin(ang) * r;
    if (idx === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(16,185,129,0.24)';
  ctx.fill();
  ctx.strokeStyle = '#059669';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Legend
  ctx.fillStyle = '#7c3aed';
  ctx.font = 'bold 14px Alexandria, Tahoma, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`● ${personAName}    |    ● ${personBName}`, cx, cy + radius + 48);
  ctx.fillStyle = '#059669';
  ctx.fillText(`(بنفسجي: ${personAName} • أخضر: ${personBName})`, cx, cy + radius + 70);
  ctx.restore();
}

function drawHorizontalBarChartOnCanvas(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  items: Array<{ label: string; score: number; color?: string }>,
  title: string,
  isRTL: boolean
) {
  if (!items || items.length === 0) return;
  ctx.save();
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 17px Alexandria, Tahoma, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(title, x + w / 2, y - 14);

  const rowH = Math.min(44, Math.floor((h - 16) / items.length));
  items.slice(0, 6).forEach((item, idx) => {
    const ry = y + 8 + idx * rowH;
    const pct = Math.max(0, Math.min(100, Math.round(item.score)));

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 13px Alexandria, Tahoma, Arial, sans-serif';
    if (isRTL) {
      ctx.textAlign = 'right';
      ctx.fillText(item.label.slice(0, 26), x + w - 10, ry + 15);
      ctx.textAlign = 'left';
      ctx.fillStyle = item.color || '#6d28d9';
      ctx.fillText(`${pct}%`, x + 10, ry + 15);
    } else {
      ctx.textAlign = 'left';
      ctx.fillText(item.label.slice(0, 26), x + 10, ry + 15);
      ctx.textAlign = 'right';
      ctx.fillStyle = item.color || '#6d28d9';
      ctx.fillText(`${pct}%`, x + w - 10, ry + 15);
    }

    const barX = x + 10;
    const barY = ry + 22;
    const barW = w - 20;
    const barH = 10;
    ctx.fillStyle = '#e2e8f0';
    drawRoundedRect(ctx, barX, barY, barW, barH, 5);
    ctx.fill();

    if (pct > 0) {
      const fillW = (barW * pct) / 100;
      ctx.fillStyle = item.color || '#7c3aed';
      drawRoundedRect(ctx, isRTL ? barX + (barW - fillW) : barX, barY, fillW, barH, 5);
      ctx.fill();
    }
  });
  ctx.restore();
}

// Renders report data onto one or more high-resolution A4 Canvas elements with structured data tables
function renderReportPagesToCanvases(
  data: PrintableReportData,
  lang: SupportedLanguage,
  textOnlyMode = false
): {
  dataUrl: string;
  width: number;
  height: number;
}[] {
  const isRTL = lang === 'ar';
  const PAGE_W = 1240;
  const PAGE_H = 1754;
  const MARGIN = 60;
  const CONTENT_W = PAGE_W - MARGIN * 2;

  const pages: HTMLCanvasElement[] = [];

  const createNewPage = (): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } => {
    const canvas = document.createElement('canvas');
    canvas.width = PAGE_W;
    canvas.height = PAGE_H;
    const ctx = canvas.getContext('2d')!;
    ctx.direction = isRTL ? 'rtl' : 'ltr';
    ctx.textAlign = isRTL ? 'right' : 'left';

    // Crisp White A4 Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, PAGE_W, PAGE_H);

    // Outer subtle frame
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 3;
    drawRoundedRect(ctx, 26, 26, PAGE_W - 52, PAGE_H - 52, 22);
    ctx.stroke();

    // Top decorative gradient bar
    const grad = ctx.createLinearGradient(0, 0, PAGE_W, 0);
    grad.addColorStop(0, '#4f46e5');
    grad.addColorStop(0.5, '#7c3aed');
    grad.addColorStop(1, '#db2777');
    ctx.fillStyle = grad;
    ctx.fillRect(46, 26, PAGE_W - 92, 10);

    pages.push(canvas);
    return { canvas, ctx };
  };

  let { ctx } = createNewPage();
  let y = 74;

  const startX = isRTL ? PAGE_W - MARGIN : MARGIN;
  const oppX = isRTL ? MARGIN : PAGE_W - MARGIN;
  const primaryAlign: CanvasTextAlign = isRTL ? 'right' : 'left';
  const oppositeAlign: CanvasTextAlign = isRTL ? 'left' : 'right';

  const drawFooter = (pageCtx: CanvasRenderingContext2D, pageNum: number, totalPages?: number) => {
    const footerY = PAGE_H - 68;
    pageCtx.strokeStyle = '#e2e8f0';
    pageCtx.lineWidth = 2;
    pageCtx.beginPath();
    pageCtx.moveTo(MARGIN, footerY - 18);
    pageCtx.lineTo(PAGE_W - MARGIN, footerY - 18);
    pageCtx.stroke();

    pageCtx.fillStyle = '#64748b';
    pageCtx.font = 'bold 15px Alexandria, Tahoma, Arial, sans-serif';
    pageCtx.textAlign = primaryAlign;
    const disc = localizeReportText(
      data.disclaimerText ||
        (isRTL
          ? 'تقرير سيكومتري علمي صادر عن منصة مِـرآة القـلوب — للأغراض الاسترشادية والتطوير المعرفي.'
          : 'Official Scientific Psychometric Report issued by Mirror of Hearts — For self-awareness and cognitive development.'),
      lang
    );
    pageCtx.fillText(disc.slice(0, 105), startX, footerY + 8);

    pageCtx.textAlign = oppositeAlign;
    const pageLabel = isRTL
      ? `الأردن - عمّان | one497303@gmail.com | صفحة ${pageNum}${totalPages ? ` من ${totalPages}` : ''}`
      : `Amman, Jordan | one497303@gmail.com | Page ${pageNum}${totalPages ? ` of ${totalPages}` : ''}`;
    pageCtx.fillText(pageLabel, oppX, footerY + 8);
    pageCtx.textAlign = primaryAlign;
  };

  const ensureSpace = (neededHeight: number) => {
    if (y + neededHeight > PAGE_H - 108) {
      const next = createNewPage();
      ctx = next.ctx;
      y = 74;
    }
  };

  // 1. Official Report Header Block
  const brandHeader = isRTL
    ? 'مِـرآة القـلوب • المختبر السيكومتري والمعرفي المعتمد (jsPDF Official Report)'
    : 'Mirror of Hearts • Certified Psychometric & Cognitive Assessment Lab';
  ctx.fillStyle = '#6d28d9';
  ctx.font = 'bold 19px Alexandria, Tahoma, Arial, sans-serif';
  ctx.textAlign = primaryAlign;
  ctx.fillText(brandHeader, startX, y + 20);

  const reportTitleText = localizeReportText(data.reportTitle, lang);
  ctx.fillStyle = '#0f172a';
  ctx.font = '800 30px Alexandria, Tahoma, Arial, sans-serif';
  const titleLines = wrapCanvasText(ctx, reportTitleText, CONTENT_W - 280);
  let titleY = y + 60;
  titleLines.forEach((line) => {
    ctx.fillText(line, startX, titleY);
    titleY += 38;
  });

  const subTitleText = localizeReportText(data.subTitle, lang);
  ctx.fillStyle = '#334155';
  ctx.font = 'bold 19px Alexandria, Tahoma, Arial, sans-serif';
  ctx.fillText(subTitleText.slice(0, 95), startX, titleY + 4);

  const sciBasisText = localizeReportText(data.scientificBasis, lang);
  const userLabel = data.userName
    ? isRTL
      ? `المختبَر: ${data.userName}   |   `
      : `Examinee: ${localizeReportText(data.userName, lang)}   |   `
    : '';
  const datePrefix = isRTL ? 'التاريخ:' : 'Date:';
  const refPrefix = isRTL ? 'المرجعية:' : 'Reference:';
  ctx.fillStyle = '#64748b';
  ctx.font = '16px Alexandria, Tahoma, Arial, sans-serif';
  ctx.fillText(
    `${userLabel}${refPrefix} ${sciBasisText.slice(0, 68)}   |   ${datePrefix} ${data.completedAt}`,
    startX,
    titleY + 34
  );

  // Overall Score Badge on opposite side
  const badgeW = 256;
  const badgeH = 124;
  const badgeX = isRTL ? MARGIN : PAGE_W - MARGIN - badgeW;
  const badgeY = y + 6;
  ctx.fillStyle = '#f5f3ff';
  drawRoundedRect(ctx, badgeX, badgeY, badgeW, badgeH, 18);
  ctx.fill();
  ctx.strokeStyle = '#c4b5fd';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#4c1d95';
  ctx.font = 'bold 15px Alexandria, Tahoma, Arial, sans-serif';
  const scoreLabelText = localizeReportText(data.overallScoreLabel, lang);
  ctx.fillText(scoreLabelText.slice(0, 34), badgeX + badgeW / 2, badgeY + 38);

  ctx.fillStyle = '#6d28d9';
  ctx.font = '800 26px Alexandria, Tahoma, Arial, sans-serif';
  const scoreValText = localizeReportText(data.overallScoreValue, lang);
  ctx.fillText(scoreValText.slice(0, 24), badgeX + badgeW / 2, badgeY + 86);
  ctx.textAlign = primaryAlign;

  y = Math.max(titleY + 56, badgeY + badgeH + 24);

  // Header divider
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(MARGIN, y);
  ctx.lineTo(PAGE_W - MARGIN, y);
  ctx.stroke();
  y += 24;

  // 2. Executive Summary Box
  const execText = localizeReportText(data.executiveSummary, lang);
  const fingerprintText = localizeReportText(data.cognitiveFingerprintTitle, lang);
  ctx.font = '18px Alexandria, Tahoma, Arial, sans-serif';
  const summaryLines = wrapCanvasText(ctx, execText, CONTENT_W - 48);
  const summaryBoxH = 62 + summaryLines.length * 29;
  ensureSpace(summaryBoxH + 20);

  ctx.fillStyle = '#f8fafc';
  drawRoundedRect(ctx, MARGIN, y, CONTENT_W, summaryBoxH, 16);
  ctx.fill();
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#1e1b4b';
  ctx.font = 'bold 20px Alexandria, Tahoma, Arial, sans-serif';
  ctx.textAlign = primaryAlign;
  const execHeader = isRTL
    ? `الملخص التنفيذي (${fingerprintText})`
    : `Executive Summary (${fingerprintText})`;
  ctx.fillText(execHeader.slice(0, 88), isRTL ? PAGE_W - MARGIN - 22 : MARGIN + 22, y + 35);

  ctx.fillStyle = '#334155';
  ctx.font = '18px Alexandria, Tahoma, Arial, sans-serif';
  let sumY = y + 70;
  summaryLines.forEach((line) => {
    ctx.fillText(line, isRTL ? PAGE_W - MARGIN - 22 : MARGIN + 22, sumY);
    sumY += 29;
  });

  y += summaryBoxH + 28;

  // 3. Structured Psychometric Data Table (جدول البيانات والدرجات المعيارية الدقيقة)
  if (data.metrics && data.metrics.length > 0) {
    ensureSpace(130);
    ctx.fillStyle = '#0f172a';
    ctx.font = '800 22px Alexandria, Tahoma, Arial, sans-serif';
    ctx.textAlign = primaryAlign;
    ctx.fillText(
      isRTL
        ? 'جدول البيانات السيكومترية والدرجات المعيارية الدقيقة:'
        : 'Psychometric Normative Data & Dimensions Table:',
      startX,
      y
    );
    y += 16;

    // Draw Table Header Row
    const tableHeaderH = 46;
    ctx.fillStyle = '#1e1b4b';
    drawRoundedRect(ctx, MARGIN, y, CONTENT_W, tableHeaderH, 10);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Alexandria, Tahoma, Arial, sans-serif';

    // Column layout (RTL vs LTR)
    // Columns: # (60px) | Dimension/Trait (440px) | Normative Level / Details (280px) | Score % (120px) | Visual Bar (220px)
    if (isRTL) {
      ctx.textAlign = 'center';
      ctx.fillText('#', PAGE_W - MARGIN - 30, y + 29);
      ctx.textAlign = 'right';
      ctx.fillText('البُعد / السمة السيكومترية المقاسة', PAGE_W - MARGIN - 70, y + 29);
      ctx.fillText('المستوى المعياري / التفاصيل', PAGE_W - MARGIN - 520, y + 29);
      ctx.textAlign = 'center';
      ctx.fillText('النسبة %', MARGIN + 280, y + 29);
      ctx.fillText('المؤشر البصري', MARGIN + 115, y + 29);
    } else {
      ctx.textAlign = 'center';
      ctx.fillText('#', MARGIN + 30, y + 29);
      ctx.textAlign = 'left';
      ctx.fillText('Measured Psychometric Dimension / Trait', MARGIN + 70, y + 29);
      ctx.fillText('Normative Level / Details', MARGIN + 520, y + 29);
      ctx.textAlign = 'center';
      ctx.fillText('Score %', PAGE_W - MARGIN - 280, y + 29);
      ctx.fillText('Visual Indicator', PAGE_W - MARGIN - 115, y + 29);
    }
    y += tableHeaderH + 4;

    data.metrics.forEach((m, idx) => {
      const labelStr = localizeReportText(m.label, lang);
      const levelStr = localizeReportText(
        m.levelLabel || (m.rawText && m.rawText.length <= 42 ? m.rawText : ''),
        lang
      );
      const rawDescStr =
        m.rawText && m.rawText.length > 42 ? localizeReportText(m.rawText, lang) : '';

      ctx.font = '15px Alexandria, Tahoma, Arial, sans-serif';
      const descLines = rawDescStr ? wrapCanvasText(ctx, rawDescStr, CONTENT_W - 90).slice(0, 2) : [];
      const rowH = 48 + (descLines.length > 0 ? descLines.length * 22 + 8 : 0);

      ensureSpace(rowH + 8);

      // Alternating row background
      ctx.fillStyle = idx % 2 === 0 ? '#f8fafc' : '#ffffff';
      drawRoundedRect(ctx, MARGIN, y, CONTENT_W, rowH, 8);
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      const pct = Math.max(0, Math.min(100, Math.round(m.scorePercent)));

      if (isRTL) {
        // # Col
        ctx.fillStyle = '#475569';
        ctx.font = 'bold 16px Alexandria, Tahoma, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(idx + 1), PAGE_W - MARGIN - 30, y + 30);

        // Dimension Label
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 17px Alexandria, Tahoma, Arial, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(labelStr.slice(0, 44), PAGE_W - MARGIN - 70, y + 30);

        // Level / Raw Short Text
        ctx.fillStyle = '#4c1d95';
        ctx.font = 'bold 15px Alexandria, Tahoma, Arial, sans-serif';
        ctx.fillText((levelStr || 'معياري معتمد').slice(0, 32), PAGE_W - MARGIN - 520, y + 30);

        // Percentage
        ctx.fillStyle = m.color || '#6d28d9';
        ctx.font = '800 18px Alexandria, Tahoma, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${pct}%`, MARGIN + 280, y + 30);

        // Visual Bar
        const barX = MARGIN + 24;
        const barY = y + 19;
        const barW = 185;
        const barH = 12;
        ctx.fillStyle = '#e2e8f0';
        drawRoundedRect(ctx, barX, barY, barW, barH, 6);
        ctx.fill();
        if (pct > 0) {
          ctx.fillStyle = m.color || '#7c3aed';
          const fillW = (barW * pct) / 100;
          drawRoundedRect(ctx, barX + (barW - fillW), barY, fillW, barH, 6);
          ctx.fill();
        }

        // Optional sub-row description
        if (descLines.length > 0) {
          ctx.fillStyle = '#475569';
          ctx.font = '14.5px Alexandria, Tahoma, Arial, sans-serif';
          ctx.textAlign = 'right';
          let subY = y + 54;
          descLines.forEach((dl) => {
            ctx.fillText(dl, PAGE_W - MARGIN - 70, subY);
            subY += 21;
          });
        }
      } else {
        // LTR Table Row
        ctx.fillStyle = '#475569';
        ctx.font = 'bold 16px Alexandria, Tahoma, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(idx + 1), MARGIN + 30, y + 30);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 16.5px Alexandria, Tahoma, Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(labelStr.slice(0, 46), MARGIN + 70, y + 30);

        ctx.fillStyle = '#4c1d95';
        ctx.font = 'bold 14.5px Alexandria, Tahoma, Arial, sans-serif';
        ctx.fillText((levelStr || 'Standardized').slice(0, 32), MARGIN + 520, y + 30);

        ctx.fillStyle = m.color || '#6d28d9';
        ctx.font = '800 18px Alexandria, Tahoma, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`${pct}%`, PAGE_W - MARGIN - 280, y + 30);

        const barX = PAGE_W - MARGIN - 209;
        const barY = y + 19;
        const barW = 185;
        const barH = 12;
        ctx.fillStyle = '#e2e8f0';
        drawRoundedRect(ctx, barX, barY, barW, barH, 6);
        ctx.fill();
        if (pct > 0) {
          ctx.fillStyle = m.color || '#7c3aed';
          const fillW = (barW * pct) / 100;
          drawRoundedRect(ctx, barX, barY, fillW, barH, 6);
          ctx.fill();
        }

        if (descLines.length > 0) {
          ctx.fillStyle = '#475569';
          ctx.font = '14.5px Alexandria, Tahoma, Arial, sans-serif';
          ctx.textAlign = 'left';
          let subY = y + 54;
          descLines.forEach((dl) => {
            ctx.fillText(dl, MARGIN + 70, subY);
            subY += 21;
          });
        }
      }

      y += rowH + 4;
    });

    y += 20;
  }

  // 3B. Scientific Visual Dashboards Embedded Directly in PDF (or Clean Text-Only Breakdown when textOnlyMode=true)
  if (!textOnlyMode && data.comparisonDualRadar && data.comparisonDualRadar.axes.length >= 3) {
    ensureSpace(470);
    ctx.fillStyle = '#f8fafc';
    drawRoundedRect(ctx, MARGIN, y, CONTENT_W, 450, 16);
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.6;
    ctx.stroke();

    drawDualComparisonRadarOnCanvas(
      ctx,
      PAGE_W / 2,
      y + 218,
      142,
      localizeReportText(data.comparisonDualRadar.personAName, lang),
      localizeReportText(data.comparisonDualRadar.personBName, lang),
      data.comparisonDualRadar.axes.map((ax) => ({
        ...ax,
        axisNameAr: localizeReportText(ax.axisNameAr.split('(')[0].trim(), lang),
      })),
      isRTL
        ? `مخطط المقارنة السيكومترية المباشرة عبر المحاور التسعة`
        : 'Nine-Axis Two-Person Psychometric Overlay Radar'
    );
    y += 472;
  }

  if (data.visualCharts) {
    if (textOnlyMode) {
      // Clean Text-Only Mode: Render structured textual summary of visual constructs without graphics
      const att = data.visualCharts.attachment;
      const comm = data.visualCharts.communicationStyles || [];
      const conf = data.visualCharts.conflictModes || [];
      const goals = data.visualCharts.lifeGoalsAlignment || [];

      const textSummaryLines: string[] = [
        isRTL
          ? `• إحداثيات التعلق العاطفي (ECR-R): ${att?.styleAr || 'آمن'} — قلق التعلق ${att?.anxiety ?? 25}% | تجنب القرب ${att?.avoidance ?? 25}%`
          : `• Adult Attachment Coordinates (ECR-R): ${localizeReportText(att?.styleAr || 'Secure', lang)} — Anxiety ${att?.anxiety ?? 25}% | Avoidance ${att?.avoidance ?? 25}%`,
        comm.length > 0
          ? isRTL
            ? `• أنماط التواصل الحواري: ${comm.map((c) => `${c.style} (${c.score}%)`).join(' ، ')}`
            : `• Interpersonal Communication Styles: ${comm.map((c) => `${localizeReportText(c.style, lang)} (${c.score}%)`).join(', ')}`
          : '',
        conf.length > 0
          ? isRTL
            ? `• خريطة إدارة النزاعات (TKI): ${conf.map((c) => `${c.mode} (${c.score}%)`).join(' ، ')}`
            : `• Conflict Resolution Modes (TKI): ${conf.map((c) => `${localizeReportText(c.mode, lang)} (${c.score}%)`).join(', ')}`
          : '',
        goals.length > 0
          ? isRTL
            ? `• اتساق أهداف الحياة (PERMA): ${goals.map((g) => `${g.domain} (${g.userScore}%)`).join(' ، ')}`
            : `• Life Goals & PERMA Alignment: ${goals.map((g) => `${localizeReportText(g.domain, lang)} (${g.userScore}%)`).join(', ')}`
          : '',
      ].filter(Boolean);

      const boxH = 66 + textSummaryLines.length * 32;
      ensureSpace(boxH + 20);

      ctx.fillStyle = '#f8fafc';
      drawRoundedRect(ctx, MARGIN, y, CONTENT_W, boxH, 14);
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.font = '800 19px Alexandria, Tahoma, Arial, sans-serif';
      ctx.textAlign = primaryAlign;
      ctx.fillText(
        isRTL
          ? 'ملخص المؤشرات البصرية والنماذج السيكومترية (الوضع النصي النظيف):'
          : 'Structured Summary of Psychometric Construct Models (Clean Text-Only Mode):',
        isRTL ? PAGE_W - MARGIN - 22 : MARGIN + 22,
        y + 34
      );

      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 16px Alexandria, Tahoma, Arial, sans-serif';
      let ty = y + 66;
      textSummaryLines.forEach((line) => {
        ctx.fillText(line.slice(0, 112), isRTL ? PAGE_W - MARGIN - 22 : MARGIN + 22, ty);
        ty += 30;
      });

      y += boxH + 20;
    } else {
      ensureSpace(520);
      ctx.fillStyle = '#0f172a';
      ctx.font = '800 22px Alexandria, Tahoma, Arial, sans-serif';
      ctx.textAlign = primaryAlign;
      ctx.fillText(
        isRTL ? 'الرسوم البيانية واللوحات البصرية السيكومترية:' : 'Scientific Psychometric Visual Dashboards:',
        startX,
        y
      );
      y += 18;

      // Row 1: Overall 8-Construct Radar + Big Five Radar
      ctx.fillStyle = '#f8fafc';
      drawRoundedRect(ctx, MARGIN, y, CONTENT_W, 410, 16);
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      drawRadarChartOnCanvas(
        ctx,
        MARGIN + CONTENT_W * 0.25,
        y + 215,
        120,
        (data.visualCharts.overallRadar || []).map((o) => ({
          label: localizeReportText(o.subject.split('(')[0].trim(), lang),
          score: o.score,
        })),
        '#7c3aed',
        'rgba(124,58,237,0.28)',
        isRTL ? 'رادار النماذج الثمانية الشامل' : '8-Construct Synthesis Radar'
      );

      drawRadarChartOnCanvas(
        ctx,
        MARGIN + CONTENT_W * 0.75,
        y + 215,
        120,
        (data.visualCharts.bigFiveRadar || []).map((b) => ({
          label: localizeReportText(b.trait, lang),
          score: b.score,
        })),
        '#db2777',
        'rgba(219,39,119,0.26)',
        isRTL ? 'رادار العوامل الخمسة الكبرى (Big Five)' : 'Big Five Personality Radar'
      );
      y += 432;

      // Row 2: HEXACO Radar + ECR-R 2D Attachment Quadrant
      ensureSpace(390);
      ctx.fillStyle = '#f8fafc';
      drawRoundedRect(ctx, MARGIN, y, CONTENT_W, 370, 16);
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      drawRadarChartOnCanvas(
        ctx,
        MARGIN + CONTENT_W * 0.25,
        y + 195,
        108,
        (data.visualCharts.hexacoRadar || []).map((h) => ({
          label: localizeReportText(h.trait, lang),
          score: h.score,
        })),
        '#0891b2',
        'rgba(8,145,178,0.28)',
        isRTL ? 'رادار هيكساكو سداسي العوامل (HEXACO)' : 'HEXACO 6-Factor Radar'
      );

      drawAttachmentQuadrantOnCanvas(
        ctx,
        MARGIN + CONTENT_W * 0.54,
        y + 62,
        CONTENT_W * 0.41,
        235,
        data.visualCharts.attachment?.anxiety ?? 30,
        data.visualCharts.attachment?.avoidance ?? 30,
        localizeReportText(data.visualCharts.attachment?.styleAr, lang),
        isRTL ? 'خريطة التعلق العاطفي ثنائية الأبعاد (ECR-R)' : 'ECR-R Attachment 2D Quadrant'
      );
      y += 392;

      // Row 3: TKI Conflict Modes Radar + Communication & EQ Bar Chart
      if (
        (data.visualCharts.conflictModes && data.visualCharts.conflictModes.length >= 3) ||
        (data.visualCharts.communicationStyles && data.visualCharts.communicationStyles.length > 0)
      ) {
        ensureSpace(370);
        ctx.fillStyle = '#f8fafc';
        drawRoundedRect(ctx, MARGIN, y, CONTENT_W, 350, 16);
        ctx.fill();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (data.visualCharts.conflictModes && data.visualCharts.conflictModes.length >= 3) {
          drawRadarChartOnCanvas(
            ctx,
            MARGIN + CONTENT_W * 0.25,
            y + 188,
            102,
            data.visualCharts.conflictModes.map((c) => ({
              label: localizeReportText(c.mode, lang),
              score: c.score,
            })),
            '#d97706',
            'rgba(217,119,6,0.25)',
            isRTL ? 'خريطة إدارة النزاعات (TKI)' : 'TKI Conflict Modes Radar'
          );
        }

        if (data.visualCharts.communicationStyles && data.visualCharts.communicationStyles.length > 0) {
          drawHorizontalBarChartOnCanvas(
            ctx,
            MARGIN + CONTENT_W * 0.52,
            y + 52,
            CONTENT_W * 0.44,
            265,
            data.visualCharts.communicationStyles.map((cs) => ({
              label: localizeReportText(cs.style, lang),
              score: cs.score,
              color: cs.color,
            })),
            isRTL ? 'أنماط التواصل الحواري (NVC)' : 'Communication Styles Profile',
            isRTL
          );
        }
        y += 372;
      }
    }
  }

  // 4. Detailed Qualitative Analysis Sections
  if (data.sections && data.sections.length > 0) {
    ensureSpace(90);
    ctx.fillStyle = '#0f172a';
    ctx.font = '800 22px Alexandria, Tahoma, Arial, sans-serif';
    ctx.textAlign = primaryAlign;
    ctx.fillText(
      isRTL
        ? 'التحليل التفصيلي العميق والتوصيات السيكومترية:'
        : 'In-Depth Qualitative Analysis & Psychometric Insights:',
      startX,
      y
    );
    y += 20;

    data.sections.forEach((sec) => {
      const secTitle = localizeReportText(sec.title, lang);
      const secBadge = localizeReportText(sec.badge, lang);
      const secContent = localizeReportText(sec.content || '', lang);

      ctx.font = '17.5px Alexandria, Tahoma, Arial, sans-serif';
      const contentLines = wrapCanvasText(ctx, secContent, CONTENT_W - 48);
      const itemLinesList: string[][] = (sec.items || []).map((it) =>
        wrapCanvasText(ctx, `• ${localizeReportText(it, lang)}`, CONTENT_W - 64)
      );
      const totalItemLines = itemLinesList.reduce((acc, l) => acc + l.length, 0);
      const cardH = 58 + contentLines.length * 27 + totalItemLines * 26 + 16;

      ensureSpace(cardH + 14);

      ctx.fillStyle = '#ffffff';
      drawRoundedRect(ctx, MARGIN, y, CONTENT_W, cardH, 14);
      ctx.fill();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 19px Alexandria, Tahoma, Arial, sans-serif';
      ctx.textAlign = primaryAlign;
      ctx.fillText(secTitle.slice(0, 72), isRTL ? PAGE_W - MARGIN - 22 : MARGIN + 22, y + 34);

      if (secBadge) {
        ctx.fillStyle = '#6d28d9';
        ctx.font = 'bold 15px Alexandria, Tahoma, Arial, sans-serif';
        ctx.textAlign = oppositeAlign;
        ctx.fillText(secBadge.slice(0, 42), isRTL ? MARGIN + 22 : PAGE_W - MARGIN - 22, y + 34);
        ctx.textAlign = primaryAlign;
      }

      let secY = y + 64;
      ctx.fillStyle = '#334155';
      ctx.font = '17.5px Alexandria, Tahoma, Arial, sans-serif';
      contentLines.forEach((line) => {
        ctx.fillText(line, isRTL ? PAGE_W - MARGIN - 22 : MARGIN + 22, secY);
        secY += 27;
      });

      if (itemLinesList.length > 0) {
        secY += 4;
        ctx.fillStyle = '#475569';
        ctx.font = '16.5px Alexandria, Tahoma, Arial, sans-serif';
        itemLinesList.forEach((lines) => {
          lines.forEach((line) => {
            ctx.fillText(line, isRTL ? PAGE_W - MARGIN - 30 : MARGIN + 30, secY);
            secY += 26;
          });
        });
      }

      y += cardH + 14;
    });
  }

  // 5. Question-by-Question Audit Table (جدول التدقيق التفصيلي لبنود الاختبار)
  if (data.questionAudit && data.questionAudit.length > 0) {
    ensureSpace(120);
    ctx.fillStyle = '#0f172a';
    ctx.font = '800 22px Alexandria, Tahoma, Arial, sans-serif';
    ctx.textAlign = primaryAlign;
    ctx.fillText(
      isRTL
        ? `جدول التدقيق العلمي التفصيلي لإجابات المختبَر (${data.questionAudit.length} بنداً):`
        : `Item-by-Item Psychometric Response Audit Table (${data.questionAudit.length} Items):`,
      startX,
      y
    );
    y += 16;

    const auditHeaderH = 44;
    ctx.fillStyle = '#0f172a';
    drawRoundedRect(ctx, MARGIN, y, CONTENT_W, auditHeaderH, 10);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px Alexandria, Tahoma, Arial, sans-serif';
    if (isRTL) {
      ctx.textAlign = 'center';
      ctx.fillText('#', PAGE_W - MARGIN - 28, y + 28);
      ctx.textAlign = 'right';
      ctx.fillText('البند / السؤال السيكومتري', PAGE_W - MARGIN - 64, y + 28);
      ctx.fillText('إجابة المختبَر', PAGE_W - MARGIN - 560, y + 28);
      ctx.fillText('السمة المقاسة / المعيار', PAGE_W - MARGIN - 850, y + 28);
      ctx.textAlign = 'center';
      ctx.fillText('الوزن', MARGIN + 52, y + 28);
    } else {
      ctx.textAlign = 'center';
      ctx.fillText('#', MARGIN + 28, y + 28);
      ctx.textAlign = 'left';
      ctx.fillText('Psychometric Item / Prompt', MARGIN + 64, y + 28);
      ctx.fillText('Examinee Response', MARGIN + 560, y + 28);
      ctx.fillText('Measured Trait / Key', MARGIN + 850, y + 28);
      ctx.textAlign = 'center';
      ctx.fillText('Score', PAGE_W - MARGIN - 52, y + 28);
    }
    y += auditHeaderH + 4;

    data.questionAudit.forEach((qa, idx) => {
      const qNum = qa.questionNumber ?? idx + 1;
      const qPrompt = localizeReportText(qa.questionText || qa.textAr || '', lang);
      const uAns = localizeReportText(qa.userAnswer || qa.chosenTextAr || '', lang);
      const traitOrKey = localizeReportText(
        qa.correctAnswerOrTrait || qa.dimensionLabelAr || '',
        lang
      );
      const pts = qa.pointsEarned || (qa.scoreWeight !== undefined ? `${qa.scoreWeight}/5` : '✓');

      ctx.font = '14px Alexandria, Tahoma, Arial, sans-serif';
      const qLines = wrapCanvasText(ctx, qPrompt, 470).slice(0, 2);
      const aLines = wrapCanvasText(ctx, uAns, 270).slice(0, 2);
      const maxLines = Math.max(qLines.length, aLines.length, 1);
      const rowH = 22 + maxLines * 20;

      ensureSpace(rowH + 6);

      ctx.fillStyle = idx % 2 === 0 ? '#f8fafc' : '#ffffff';
      drawRoundedRect(ctx, MARGIN, y, CONTENT_W, rowH, 6);
      ctx.fill();
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.stroke();

      if (isRTL) {
        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 14px Alexandria, Tahoma, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(qNum), PAGE_W - MARGIN - 28, y + 26);

        ctx.fillStyle = '#0f172a';
        ctx.font = '14px Alexandria, Tahoma, Arial, sans-serif';
        ctx.textAlign = 'right';
        qLines.forEach((line, lIdx) => {
          ctx.fillText(line, PAGE_W - MARGIN - 64, y + 24 + lIdx * 19);
        });

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13.5px Alexandria, Tahoma, Arial, sans-serif';
        aLines.forEach((line, lIdx) => {
          ctx.fillText(line, PAGE_W - MARGIN - 560, y + 24 + lIdx * 19);
        });

        ctx.fillStyle = '#4c1d95';
        ctx.font = '13.5px Alexandria, Tahoma, Arial, sans-serif';
        ctx.fillText(traitOrKey.slice(0, 28), PAGE_W - MARGIN - 850, y + 26);

        ctx.fillStyle = qa.isCorrectOrHigh === false ? '#dc2626' : '#059669';
        ctx.font = 'bold 14px Alexandria, Tahoma, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pts, MARGIN + 52, y + 26);
      } else {
        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 14px Alexandria, Tahoma, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(qNum), MARGIN + 28, y + 26);

        ctx.fillStyle = '#0f172a';
        ctx.font = '14px Alexandria, Tahoma, Arial, sans-serif';
        ctx.textAlign = 'left';
        qLines.forEach((line, lIdx) => {
          ctx.fillText(line, MARGIN + 64, y + 24 + lIdx * 19);
        });

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 13.5px Alexandria, Tahoma, Arial, sans-serif';
        aLines.forEach((line, lIdx) => {
          ctx.fillText(line, MARGIN + 560, y + 24 + lIdx * 19);
        });

        ctx.fillStyle = '#4c1d95';
        ctx.font = '13.5px Alexandria, Tahoma, Arial, sans-serif';
        ctx.fillText(traitOrKey.slice(0, 28), MARGIN + 850, y + 26);

        ctx.fillStyle = qa.isCorrectOrHigh === false ? '#dc2626' : '#059669';
        ctx.font = 'bold 14px Alexandria, Tahoma, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pts, PAGE_W - MARGIN - 52, y + 26);
      }

      y += rowH + 4;
    });

    y += 18;
  }

  // 6. Careers or Applied Recommendations
  if (data.careersOrRecommendations && data.careersOrRecommendations.length > 0) {
    ctx.font = '17.5px Alexandria, Tahoma, Arial, sans-serif';
    const recLinesList = data.careersOrRecommendations.map((c) =>
      wrapCanvasText(ctx, `✓ ${localizeReportText(c, lang)}`, CONTENT_W - 56)
    );
    const totalRecLines = recLinesList.reduce((acc, l) => acc + l.length, 0);
    const recH = 62 + totalRecLines * 27 + 16;

    ensureSpace(recH + 18);

    ctx.fillStyle = '#f0fdf4';
    drawRoundedRect(ctx, MARGIN, y, CONTENT_W, recH, 16);
    ctx.fill();
    ctx.strokeStyle = '#86efac';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#065f46';
    ctx.font = 'bold 20px Alexandria, Tahoma, Arial, sans-serif';
    ctx.textAlign = primaryAlign;
    ctx.fillText(
      isRTL
        ? 'المسارات المهنية والتوصيات التطبيقية المقترحة:'
        : 'Recommended Career Pathways & Applied Action Plan:',
      isRTL ? PAGE_W - MARGIN - 22 : MARGIN + 22,
      y + 35
    );

    let recY = y + 68;
    ctx.fillStyle = '#1e293b';
    ctx.font = '17.5px Alexandria, Tahoma, Arial, sans-serif';
    recLinesList.forEach((lines) => {
      lines.forEach((line) => {
        ctx.fillText(line, isRTL ? PAGE_W - MARGIN - 28 : MARGIN + 28, recY);
        recY += 27;
      });
    });

    y += recH + 18;
  }

  // Draw footers with accurate Page X of Y across all generated pages
  const totalPagesCount = pages.length;
  pages.forEach((pageCanvas, idx) => {
    const pCtx = pageCanvas.getContext('2d')!;
    drawFooter(pCtx, idx + 1, totalPagesCount);
  });

  return pages.map((canvas) => ({
    dataUrl: canvas.toDataURL('image/jpeg', 0.94),
    width: canvas.width,
    height: canvas.height,
  }));
}

// Uses the official `jsPDF` library to build a multi-page A4 PDF document with metadata & vector accents
function buildJsPdfDocument(
  jpegPages: { dataUrl: string; width: number; height: number }[],
  data: PrintableReportData,
  lang: SupportedLanguage
): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const localizedTitle = localizeReportText(data.reportTitle, lang);
  const localizedSub = localizeReportText(data.subTitle, lang);

  doc.setProperties({
    title: `${localizedTitle} - Mirror of Hearts`,
    subject: localizedSub,
    author: 'Mirror of Hearts Psychometric Lab (one497303@gmail.com)',
    keywords: 'psychometrics, 16PF, Big Five, IQ, EQ, compatibility, jsPDF, Mirror of Hearts',
    creator: 'Mirror of Hearts jsPDF Engine v4.2',
  });

  jpegPages.forEach((page, index) => {
    if (index > 0) {
      doc.addPage('a4', 'portrait');
    }
    // Add the high-resolution A4 page canvas (210mm x 297mm)
    doc.addImage(page.dataUrl, 'JPEG', 0, 0, 210, 297, `page_${index + 1}`, 'FAST');

    // Add subtle vector border in jsPDF to reinforce print sharpness
    doc.setDrawColor(124, 58, 237);
    doc.setLineWidth(0.25);
    doc.roundedRect(4.5, 4.5, 201, 288, 3, 3, 'S');
  });

  return doc;
}

function buildHtmlReportString(data: PrintableReportData, lang: SupportedLanguage): string {
  const isRTL = lang === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  const titleText = localizeReportText(data.reportTitle, lang);
  const subTitleText = localizeReportText(data.subTitle, lang);
  const sciBasisText = localizeReportText(data.scientificBasis, lang);
  const scoreLabelText = localizeReportText(data.overallScoreLabel, lang);
  const scoreValText = localizeReportText(data.overallScoreValue, lang);
  const fingerprintText = localizeReportText(data.cognitiveFingerprintTitle, lang);
  const execSummaryText = localizeReportText(data.executiveSummary, lang);

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="UTF-8" />
  <title>${titleText} - ${isRTL ? 'مِـرآة القـلوب' : 'Mirror of Hearts'}</title>
  <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Alexandria', 'Segoe UI', Tahoma, sans-serif;
      background: #f1f5f9;
      color: #0f172a;
      line-height: 1.7;
      padding: 28px;
      direction: ${dir};
    }
    .report-container {
      max-width: 920px;
      margin: 0 auto;
      border: 2px solid #cbd5e1;
      border-radius: 22px;
      padding: 34px;
      background: #ffffff;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      border-bottom: 2px solid #cbd5e1;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .brand { font-size: 13px; font-weight: 800; color: #6d28d9; margin-bottom: 6px; }
    .title { font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
    .subtitle { font-size: 14px; color: #334155; font-weight: 600; }
    .scientific-ref { font-size: 12px; color: #64748b; margin-top: 6px; }
    .score-box {
      text-align: center;
      background: #f5f3ff;
      border: 2px solid #c4b5fd;
      border-radius: 16px;
      padding: 14px 20px;
      min-width: 185px;
    }
    .score-label { font-size: 12px; color: #4c1d95; font-weight: 700; }
    .score-val { font-size: 24px; font-weight: 800; color: #6d28d9; margin-top: 4px; }
    .summary-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 16px;
      padding: 18px 22px;
      margin-bottom: 24px;
    }
    .summary-title { font-size: 16px; font-weight: 800; color: #1e1b4b; margin-bottom: 8px; }
    .summary-text { font-size: 13.5px; color: #1e293b; text-align: justify; }
    .section-heading {
      font-size: 17px;
      font-weight: 800;
      color: #0f172a;
      margin: 24px 0 14px;
      padding-bottom: 6px;
      border-bottom: 2px solid #e2e8f0;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      font-size: 13px;
    }
    table.data-table th {
      background: #1e1b4b;
      color: #ffffff;
      padding: 10px 12px;
      text-align: ${isRTL ? 'right' : 'left'};
      font-weight: 700;
    }
    table.data-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: middle;
    }
    table.data-table tr:nth-child(even) { background: #f8fafc; }
    .bar-bg {
      width: 120px;
      height: 9px;
      background: #e2e8f0;
      border-radius: 99px;
      overflow: hidden;
      display: inline-block;
    }
    .bar-fill { height: 100%; background: #7c3aed; border-radius: 99px; }
    .detail-card {
      border: 1px solid #cbd5e1;
      border-radius: 14px;
      padding: 16px 20px;
      margin-bottom: 14px;
      page-break-inside: avoid;
    }
    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .detail-title { font-size: 15px; font-weight: 800; color: #0f172a; }
    .detail-badge {
      font-size: 11.5px;
      font-weight: 700;
      color: #6d28d9;
      background: #ede9fe;
      padding: 3px 12px;
      border-radius: 99px;
    }
    .detail-text { font-size: 13px; color: #334155; margin-bottom: 8px; }
    .detail-list { padding-${isRTL ? 'right' : 'left'}: 18px; font-size: 12.5px; color: #475569; }
    .detail-list li { margin-bottom: 4px; }
    .footer {
      margin-top: 28px;
      padding-top: 16px;
      border-top: 1px solid #cbd5e1;
      font-size: 11.5px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
    }
    @media print {
      body { background: #ffffff; padding: 0; }
      .report-container { border: none; box-shadow: none; padding: 12px; }
    }
  </style>
</head>
<body>
  <div class="report-container">
    <div class="header">
      <div>
        <div class="brand">${isRTL ? 'مِـرآة القـلوب • المختبر السيكومتري والمعرفي المعتمد' : 'Mirror of Hearts • Certified Psychometric & Cognitive Lab'}</div>
        <h1 class="title">${titleText}</h1>
        <div class="subtitle">${subTitleText}</div>
        <div class="scientific-ref">${isRTL ? 'المرجعية العلمية:' : 'Scientific Reference:'} ${sciBasisText} | ${isRTL ? 'التاريخ:' : 'Date:'} ${data.completedAt}</div>
      </div>
      <div class="score-box">
        <div class="score-label">${scoreLabelText}</div>
        <div class="score-val">${scoreValText}</div>
      </div>
    </div>

    <div class="summary-card">
      <div class="summary-title">${isRTL ? 'الملخص التنفيذي' : 'Executive Summary'} (${fingerprintText})</div>
      <div class="summary-text">${execSummaryText}</div>
    </div>

    <h2 class="section-heading">${isRTL ? 'جدول البيانات السيكومترية والدرجات المعيارية' : 'Psychometric Normative Data Table'}</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th>#</th>
          <th>${isRTL ? 'البُعد / السمة السيكومترية' : 'Psychometric Dimension / Trait'}</th>
          <th>${isRTL ? 'المستوى / التفاصيل' : 'Normative Level / Details'}</th>
          <th>${isRTL ? 'النسبة %' : 'Score %'}</th>
          <th>${isRTL ? 'المؤشر' : 'Indicator'}</th>
        </tr>
      </thead>
      <tbody>
        ${data.metrics
          .map(
            (m, i) => `
          <tr>
            <td><strong>${i + 1}</strong></td>
            <td><strong>${localizeReportText(m.label, lang)}</strong></td>
            <td>${localizeReportText(m.levelLabel || m.rawText || '', lang)}</td>
            <td><strong style="color:${m.color || '#6d28d9'}">${Math.round(m.scorePercent)}%</strong></td>
            <td>
              <div class="bar-bg">
                <div class="bar-fill" style="width:${Math.min(100, Math.max(0, m.scorePercent))}%;background:${m.color || '#7c3aed'};"></div>
              </div>
            </td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>

    <h2 class="section-heading">${isRTL ? 'التحليل التفصيلي العميق والتوصيات' : 'In-Depth Analysis & Recommendations'}</h2>
    ${data.sections
      .map(
        (sec) => `
      <div class="detail-card">
        <div class="detail-header">
          <div class="detail-title">${localizeReportText(sec.title, lang)}</div>
          ${sec.badge ? `<div class="detail-badge">${localizeReportText(sec.badge, lang)}</div>` : ''}
        </div>
        <div class="detail-text">${localizeReportText(sec.content, lang)}</div>
        ${
          sec.items && sec.items.length > 0
            ? `<ul class="detail-list">${sec.items.map((it) => `<li>${localizeReportText(it, lang)}</li>`).join('')}</ul>`
            : ''
        }
      </div>
    `
      )
      .join('')}

    ${
      data.questionAudit && data.questionAudit.length > 0
        ? `
      <h2 class="section-heading">${isRTL ? 'جدول التدقيق التفصيلي لبنود الاختبار' : 'Item-by-Item Psychometric Audit Table'}</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>${isRTL ? 'السؤال / البند' : 'Question / Item'}</th>
            <th>${isRTL ? 'إجابة المختبَر' : 'Examinee Answer'}</th>
            <th>${isRTL ? 'البُعد المقاس' : 'Measured Trait'}</th>
            <th>${isRTL ? 'النتيجة' : 'Score'}</th>
          </tr>
        </thead>
        <tbody>
          ${data.questionAudit
            .map(
              (qa, idx) => `
            <tr>
              <td>${qa.questionNumber ?? idx + 1}</td>
              <td>${localizeReportText(qa.questionText || qa.textAr || '', lang)}</td>
              <td><strong>${localizeReportText(qa.userAnswer || qa.chosenTextAr || '', lang)}</strong></td>
              <td>${localizeReportText(qa.correctAnswerOrTrait || qa.dimensionLabelAr || '', lang)}</td>
              <td><strong>${qa.pointsEarned || (qa.scoreWeight !== undefined ? `${qa.scoreWeight}/5` : '✓')}</strong></td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `
        : ''
    }

    ${
      data.careersOrRecommendations && data.careersOrRecommendations.length > 0
        ? `
      <div class="detail-card">
        <div class="detail-header">
          <div class="detail-title">${isRTL ? 'المسارات المهنية والتوصيات التطبيقية المقترحة' : 'Recommended Career Pathways & Action Plan'}</div>
        </div>
        <ul class="detail-list">
          ${data.careersOrRecommendations.map((c) => `<li>${localizeReportText(c, lang)}</li>`).join('')}
        </ul>
      </div>
    `
        : ''
    }

    <div class="footer">
      <span>${localizeReportText(
        data.disclaimerText ||
          (isRTL
            ? 'هذا التقرير السيكومتري استرشادي لأغراض التطوير الذاتي والوعي المعرفي، ولا يُعد تشخيصاً طبياً إكلينيكياً.'
            : 'This psychometric report is for self-awareness and cognitive development purposes and does not constitute a clinical diagnosis.'),
        lang
      )}</span>
      <span>${isRTL ? 'الأردن - عمّان' : 'Amman, Jordan'} | one497303@gmail.com</span>
    </div>
  </div>
</body>
</html>`;
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1500);
}

export function triggerPrintFriendlyReport(options?: { textOnly?: boolean }): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const root = document.documentElement;
  if (options?.textOnly) {
    root.classList.add('print-text-only-mode');
  } else {
    root.classList.remove('print-text-only-mode');
  }

  const cleanup = () => {
    root.classList.remove('print-text-only-mode');
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);
  window.print();
}

export function exportPsychometricReportAsPDF(
  data: PrintableReportData,
  overrideLang?: SupportedLanguage,
  options?: PdfExportOptions
): void {
  if (options?.mode === 'print') {
    triggerPrintFriendlyReport({ textOnly: options.textOnly ?? data.textOnly });
    return;
  }

  let activeLang: SupportedLanguage = options?.lang || overrideLang || data.lang || getInitialLanguage();
  let isTextOnly: boolean = Boolean(options?.textOnly ?? data.textOnly);

  const generateAndSaveForLang = (lang: SupportedLanguage, textOnly: boolean, autoDownload: boolean) => {
    const localizedTitle = localizeReportText(data.reportTitle, lang);
    const safeBaseName =
      localizedTitle
        .replace(/[^\u0600-\u06FFa-zA-Z0-9_-]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 60) || (lang === 'ar' ? 'تقرير_مرآة_القلوب' : 'Mirror_of_Hearts_Report');

    const suffix = textOnly ? '_TEXT_CLEAN' : '';
    const jpegPages = renderReportPagesToCanvases(data, lang, textOnly);
    const pdfDoc = buildJsPdfDocument(jpegPages, data, lang);
    const pdfBlob = pdfDoc.output('blob');

    if (autoDownload) {
      triggerBlobDownload(pdfBlob, `${safeBaseName}${suffix}_${lang.toUpperCase()}.pdf`);
    }

    return { jpegPages, pdfBlob, safeBaseName: `${safeBaseName}${suffix}` };
  };

  // 1. Immediately generate and download the genuine jsPDF file in the user's selected language and layout mode
  let currentBundle = generateAndSaveForLang(activeLang, isTextOnly, true);

  // 2. Display interactive On-Screen Report Preview Modal with live Arabic / English & Text-Only / Charts switchers
  const existingModal = document.getElementById('mirat-pdf-preview-overlay');
  if (existingModal) {
    existingModal.remove();
  }

  const overlay = document.createElement('div');
  overlay.id = 'mirat-pdf-preview-overlay';
  overlay.dir = activeLang === 'ar' ? 'rtl' : 'ltr';
  overlay.style.cssText =
    'position:fixed;inset:0;z-index:99999;background:rgba(2,6,23,0.92);backdrop-filter:blur(10px);display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:16px;overflow-y:auto;font-family:Alexandria,Tahoma,sans-serif;';

  const renderModalContents = () => {
    overlay.innerHTML = '';
    overlay.dir = activeLang === 'ar' ? 'rtl' : 'ltr';
    const isRTL = activeLang === 'ar';

    const toolbar = document.createElement('div');
    toolbar.className = 'pdf-preview-toolbar no-print';
    toolbar.style.cssText =
      'width:100%;max-width:920px;background:#0f172a;border:1px solid rgba(139,92,246,0.45);border-radius:20px;padding:14px 20px;margin-bottom:16px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;color:#ffffff;box-shadow:0 15px 35px rgba(0,0,0,0.5);position:sticky;top:0;z-index:10;';

    const statusSide = document.createElement('div');
    const localizedTitle = localizeReportText(data.reportTitle, activeLang);
    statusSide.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;font-weight:800;font-size:14px;color:#34d399;">
        <span>${
          isRTL
            ? `✓ تم تجهيز وتنزيل ملف التقرير عبر مكتبة jsPDF (${currentBundle.jpegPages.length} صفحة A4)`
            : `✓ Official PDF Report Generated & Downloaded via jsPDF (${currentBundle.jpegPages.length} A4 Pages)`
        }</span>
      </div>
      <div style="font-size:11.5px;color:#cbd5e1;margin-top:2px;">
        ${localizedTitle} • ${
      isTextOnly
        ? isRTL
          ? 'الوضع النصي النظيف (بدون رسوم)'
          : 'Clean Text-Only Layout'
        : isRTL
        ? 'وضع الرسوم البيانية والجداول الكاملة'
        : 'Full Readable Charts & Tables Layout'
    }
      </div>
    `;

    const actionsSide = document.createElement('div');
    actionsSide.style.cssText = 'display:flex;align-items:center;gap:8px;flex-wrap:wrap;';

    // Toggle Clean Text-Only vs Full Readable Charts
    if (data.visualCharts || data.comparisonDualRadar) {
      const btnToggleTextOnly = document.createElement('button');
      btnToggleTextOnly.type = 'button';
      btnToggleTextOnly.textContent = isTextOnly
        ? isRTL
          ? '📊 التبديل لوضع الرسوم البيانية الكامل'
          : '📊 Switch to Full Charts PDF'
        : isRTL
        ? '📄 وضع النص النظيف فقط (Text-Only PDF)'
        : '📄 Clean Text-Only PDF';
      btnToggleTextOnly.style.cssText =
        'background:rgba(16,185,129,0.2);color:#6ee7b7;border:1px solid rgba(16,185,129,0.45);border-radius:12px;padding:9px 14px;font-size:12px;font-weight:800;cursor:pointer;font-family:inherit;';
      btnToggleTextOnly.onclick = () => {
        isTextOnly = !isTextOnly;
        currentBundle = generateAndSaveForLang(activeLang, isTextOnly, true);
        renderModalContents();
      };
      actionsSide.appendChild(btnToggleTextOnly);
    }

    // Language Switcher inside PDF Modal (Arabic <-> English)
    const btnSwitchLang = document.createElement('button');
    btnSwitchLang.type = 'button';
    btnSwitchLang.textContent = isRTL
      ? '🇺🇸 Switch Report to English (PDF)'
      : '🇸🇦 التبديل إلى النسخة العربية (PDF)';
    btnSwitchLang.style.cssText =
      'background:linear-gradient(135deg,#0284c7,#2563eb);color:#fff;border:1px solid rgba(56,189,248,0.4);border-radius:12px;padding:9px 14px;font-size:12px;font-weight:800;cursor:pointer;font-family:inherit;';
    btnSwitchLang.onclick = () => {
      activeLang = activeLang === 'ar' ? 'en' : 'ar';
      currentBundle = generateAndSaveForLang(activeLang, isTextOnly, true);
      renderModalContents();
    };

    const btnRedownloadPdf = document.createElement('button');
    btnRedownloadPdf.type = 'button';
    btnRedownloadPdf.textContent = isRTL
      ? 'تنزيل ملف PDF (jsPDF) 📄'
      : 'Download PDF (jsPDF) 📄';
    btnRedownloadPdf.style.cssText =
      'background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#fff;border:none;border-radius:12px;padding:9px 16px;font-size:12px;font-weight:800;cursor:pointer;font-family:inherit;';
    btnRedownloadPdf.onclick = () => {
      triggerBlobDownload(
        currentBundle.pdfBlob,
        `${currentBundle.safeBaseName}_${activeLang.toUpperCase()}.pdf`
      );
    };

    const btnPrintClean = document.createElement('button');
    btnPrintClean.type = 'button';
    btnPrintClean.textContent = isRTL ? 'طباعة نظيفة 🖨️' : 'Print Clean A4 🖨️';
    btnPrintClean.style.cssText =
      'background:#0f766e;color:#fff;border:1px solid rgba(45,212,191,0.35);border-radius:12px;padding:9px 14px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;';
    btnPrintClean.onclick = () => {
      triggerPrintFriendlyReport({ textOnly: isTextOnly });
    };

    const btnDownloadHtml = document.createElement('button');
    btnDownloadHtml.type = 'button';
    btnDownloadHtml.textContent = isRTL ? 'تنزيل نسخة ويب (.HTML) 🌐' : 'Download Web (.HTML) 🌐';
    btnDownloadHtml.style.cssText =
      'background:#059669;color:#fff;border:none;border-radius:12px;padding:9px 14px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;';
    btnDownloadHtml.onclick = () => {
      const htmlStr = buildHtmlReportString(data, activeLang);
      const htmlBlob = new Blob([htmlStr], { type: 'text/html;charset=utf-8' });
      triggerBlobDownload(
        htmlBlob,
        `${currentBundle.safeBaseName}_${activeLang.toUpperCase()}.html`
      );
    };

    const btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.textContent = isRTL ? 'إغلاق المعاينة ✕' : 'Close Preview ✕';
    btnClose.style.cssText =
      'background:rgba(255,255,255,0.1);color:#f8fafc;border:1px solid rgba(255,255,255,0.2);border-radius:12px;padding:9px 14px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;';
    btnClose.onclick = () => {
      overlay.remove();
    };

    actionsSide.appendChild(btnSwitchLang);
    actionsSide.appendChild(btnRedownloadPdf);
    actionsSide.appendChild(btnPrintClean);
    actionsSide.appendChild(btnDownloadHtml);
    actionsSide.appendChild(btnClose);

    toolbar.appendChild(statusSide);
    toolbar.appendChild(actionsSide);
    overlay.appendChild(toolbar);

    const pagesContainer = document.createElement('div');
    pagesContainer.style.cssText =
      'width:100%;max-width:920px;display:flex;flex-direction:column;gap:20px;padding-bottom:36px;';

    currentBundle.jpegPages.forEach((p, idx) => {
      const imgWrap = document.createElement('div');
      imgWrap.className = 'print-keep-together';
      imgWrap.style.cssText =
        'background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.45);border:2px solid #cbd5e1;';
      const img = document.createElement('img');
      img.className = 'keep-in-print';
      img.src = p.dataUrl;
      img.alt = isRTL ? `صفحة ${idx + 1}` : `Page ${idx + 1}`;
      img.style.cssText = 'width:100%;height:auto;display:block;';
      imgWrap.appendChild(img);
      pagesContainer.appendChild(imgWrap);
    });

    overlay.appendChild(pagesContainer);
  };

  renderModalContents();
  document.body.appendChild(overlay);
}

/**
 * Helper function to export any active psychological report, multi-tier assessment result,
 * or two-person comparison report directly to PDF (with full readable charts or clean text-only mode)
 * or trigger the print-friendly stylesheet view.
 */
export function exportCurrentReportOrAnalysisToPDF(
  reportOrPayload: PrintableReportData,
  options?: PdfExportOptions
): void {
  exportPsychometricReportAsPDF(reportOrPayload, options?.lang, options);
}

