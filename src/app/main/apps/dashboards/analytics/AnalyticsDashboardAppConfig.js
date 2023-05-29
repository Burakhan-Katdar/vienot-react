import { lazy } from 'react';
import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';

const AnalyticsDashboardApp = lazy(() => import('./AnalyticsDashboardApp'));

i18next.addResourceBundle('en', 'summaryApp', en);
i18next.addResourceBundle('tr', 'summaryApp', tr);

const AnalyticsDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/dashboards/summary',
      element: <AnalyticsDashboardApp />,
    },
  ],
};

export default AnalyticsDashboardAppConfig;
