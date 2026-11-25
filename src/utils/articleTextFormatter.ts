import type { Article } from '../data/articlesData';

export function getFullContinuousNarrativeText(article: Article, lang: 'ar' | 'en' = 'ar'): string {
  if (lang === 'ar' && article.fullContinuousTextAr) {
    return article.fullContinuousTextAr;
  }
  if (lang === 'en' && article.fullContinuousTextEn) {
    return article.fullContinuousTextEn;
  }

  const isAr = lang === 'ar';
  const lines: string[] = [];
  lines.push(isAr ? article.title : article.titleEn);
  lines.push('');
  lines.push(
    isAr
      ? `التصنيف: ${article.categoryLabelAr} | الإطار العلمي: ${article.scientificFramework}`
      : `Category: ${article.categoryLabelEn} | Scientific Framework: ${article.scientificFrameworkEn}`
  );
  lines.push('────────────────────────────────────────');
  lines.push('');
  lines.push(isAr ? article.summary : article.summaryEn);
  lines.push('');

  if (isAr ? article.clinicalCaseQuoteAr : article.clinicalCaseQuoteEn) {
    lines.push(isAr ? 'مقتطف من داخل العيادة:' : 'Clinical Session Excerpt:');
    lines.push(isAr ? article.clinicalCaseQuoteAr! : article.clinicalCaseQuoteEn!);
    lines.push('');
  }

  article.contentParagraphs.forEach((para) => {
    lines.push(isAr ? para.heading : para.headingEn);
    lines.push(isAr ? para.text : para.textEn);
    lines.push('');
  });

  if (article.diagnosticTable) {
    const dt = article.diagnosticTable;
    lines.push(isAr ? dt.titleAr : dt.titleEn);
    dt.rows.forEach((r) => {
      lines.push(
        isAr
          ? `• ${r.criterionAr}: (${dt.col2Ar}: ${r.naturalAr}) | (${dt.col3Ar}: ${r.manipulationAr})`
          : `• ${r.criterionEn}: (${dt.col2En}: ${r.naturalEn}) | (${dt.col3En}: ${r.manipulationEn})`
      );
    });
    lines.push('');
  }

  lines.push(isAr ? article.practicalExercise.title : article.practicalExercise.titleEn);
  (isAr ? article.practicalExercise.steps : article.practicalExercise.stepsEn).forEach((s, idx) => {
    lines.push(`${idx + 1}. ${s}`);
  });
  lines.push('');

  if (isAr ? article.conclusionAr : article.conclusionEn) {
    lines.push(isAr ? 'الخاتمة العلمية والأدبية:' : 'Clinical & Literary Conclusion:');
    lines.push((isAr ? article.conclusionAr : article.conclusionEn) || '');
    lines.push('');
  }

  if (article.apaReferences && article.apaReferences.length > 0) {
    lines.push(isAr ? 'المراجع العلمية الموثقة (APA 7th):' : 'References (APA 7th):');
    article.apaReferences.forEach((ref, idx) => {
      lines.push(`${idx + 1}. ${ref.citation} — ${isAr ? ref.noteAr : ref.noteEn}`);
    });
  }

  return lines.join('\n');
}
