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
            catalog_version: '1.0',
            name: 'منصة مِـرآة القـلوب',
            description: 'منصة متخصصة في التحليل النفسي، تقييم الشخصية، واختبارات التوافق العاطفي.',
            url: 'https://miratalqulub.com',
            resources: [
              {
                name: 'الرئيسية',
                url: 'https://miratalqulub.com/',
                type: 'text/html',
                description: 'الصفحة الرئيسية للمنصة واختبارات الشخصية.',
              },
              {
                name: 'تحليل الشخصية',
                url: 'https://miratalqulub.com/#/personality-tests',
                type: 'text/html',
                description: 'منظومة التحليل النفسي متعدد المستويات (السريع، المتقدم، الاحترافي) ومقارنة الشخصيات.',
              },
              {
                name: 'كاشف شريك الحياة',
                url: 'https://miratalqulub.com/#/compatibility',
                type: 'text/html',
                description: 'اختبار التوافق العاطفي والفكري والأسري المبني على النماذج السيكومترية المعتمدة.',
              },
              {
                name: 'المقالات المعرفية والأبحاث',
                url: 'https://miratalqulub.com/#/articles',
                type: 'text/html',
                description: 'موسوعة المقالات النفسية والأبحاث السيكومترية الموثقة.',
              },
              {
                name: 'الروايات والقصص',
                url: 'https://miratalqulub.com/#/novels',
                type: 'text/html',
                description: 'مكتبة الروايات والقصص النفسية والاجتماعية التفاعلية.',
              },
              {
                name: 'دليل النماذج اللغوية (LLMs)',
                url: 'https://miratalqulub.com/llms.txt',
                type: 'text/plain',
                description: 'ملف تعريفي مهيأ لوكلاء الذكاء الاصطناعي والنماذج اللغوية الكبيرة.',
              },
              {
                name: 'وصف موارد الوكلاء (ARD)',
                url: 'https://miratalqulub.com/ard.json',
                type: 'application/json',
                description: 'ملف توصيف الموارد والواجهات البرمجية لمعيار التصفح الوكيل (Agentic Browsing).',
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
