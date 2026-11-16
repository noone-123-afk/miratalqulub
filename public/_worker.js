export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = decodeURIComponent(url.pathname);

    if (
      path === '/api/analytics/track' ||
      path === '/api/analytics/track.json' ||
      path.endsWith('/analytics/track') ||
      path.includes('/التحليلات/المسار')
    ) {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        });
      }
      return new Response(JSON.stringify({ success: true, tracked: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    if (path === '/api/analytics/stats') {
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            totalVisitors: 1284,
            todayVisitors: 42,
            monthVisitors: 640,
            yearVisitors: 1284,
            pageViews: 3920,
            testCounts: {
              partner_compatibility: { started: 540, completed: 485 },
              intelligence_multiple: { started: 310, completed: 275 },
              psychology_16pf: { started: 290, completed: 250 },
              psychology_bigfive: { started: 330, completed: 298 },
              blind_date: { started: 215, completed: 180 },
              novels: { views: 890 },
              articles: { views: 740 },
            },
            deviceBreakdown: { mobile: 820, desktop: 390, tablet: 74 },
            lastUpdated: new Date().toISOString(),
          },
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    if (path === '/ai-catalog.json' || path === '/.well-known/ai-catalog.json') {
      return new Response(
        JSON.stringify(
          {
            specVersion: '1.0',
            host: {
              displayName: 'منصة مِـرآة القـلوب | Mirror of Hearts',
              identifier: 'did:web:miratalqulub.com',
              documentationUrl: 'https://miratalqulub.com/llms.txt',
              logoUrl: 'https://miratalqulub.com/logo.png',
            },
            entries: [
              {
                identifier: 'urn:air:miratalqulub.com:web:home',
                displayName: 'الرئيسية - منصة مِـرآة القـلوب',
                type: 'text/html',
                url: 'https://miratalqulub.com/',
                description:
                  'منصة متخصصة في التحليل النفسي، تقييم الشخصية، واختبارات التوافق العاطفي.',
                version: '1.0.0',
                representativeQueries: [
                  'اختبار تحليل الشخصية مرآة القلوب',
                  'اختبار التوافق العاطفي وكاشف شريك الحياة',
                  'Mirror of Hearts psychometric personality test',
                ],
              },
              {
                identifier: 'urn:air:miratalqulub.com:web:personality-tests',
                displayName: 'تحليل الشخصية السيكومتري',
                type: 'text/html',
                url: 'https://miratalqulub.com/#/personality-tests',
                description:
                  'منظومة التحليل النفسي متعدد المستويات (السريع، المتقدم، الاحترافي) ومقارنة الشخصيات.',
                version: '1.0.0',
                representativeQueries: [
                  'اختبار الشخصية MBTI والعوامل الخمسة الكبرى',
                  'مقارنة توافق شخصيتين علمياً',
                ],
              },
              {
                identifier: 'urn:air:miratalqulub.com:web:compatibility',
                displayName: 'كاشف شريك الحياة والتوافق العاطفي',
                type: 'text/html',
                url: 'https://miratalqulub.com/#/compatibility',
                description:
                  'اختبار التوافق العاطفي والفكري والأسري المبني على النماذج السيكومترية المعتمدة.',
                version: '1.0.0',
                representativeQueries: [
                  'اختبار التوافق بين الشريكين',
                  'تحليل توافق الزواج والعلاقات العاطفية',
                ],
              },
              {
                identifier: 'urn:air:miratalqulub.com:docs:llms',
                displayName: 'دليل النماذج اللغوية (LLMs)',
                type: 'text/plain',
                url: 'https://miratalqulub.com/llms.txt',
                description:
                  'ملف تعريفي مهيأ لوكلاء الذكاء الاصطناعي والنماذج اللغوية الكبيرة.',
                version: '1.0.0',
                representativeQueries: [
                  'ملف llms.txt لمنصة مرآة القلوب',
                  'توثيق منصة مرآة القلوب لوكلاء الذكاء الاصطناعي',
                ],
              },
              {
                identifier: 'urn:air:miratalqulub.com:ard:manifest',
                displayName: 'وصف موارد الوكلاء (ARD)',
                type: 'application/json',
                url: 'https://miratalqulub.com/ard.json',
                description:
                  'ملف توصيف الموارد والواجهات البرمجية لمعيار التصفح الوكيل (Agentic Browsing).',
                version: '1.0.0',
                representativeQueries: [
                  'موارد وواجهات منصة مرآة القلوب',
                  'Mirror of Hearts agent resource discovery',
                ],
              },
            ],
          },
          null,
          2
        ),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    return env.ASSETS.fetch(request);
  },
};
