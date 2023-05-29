import { lazy } from 'react';
import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';

i18next.addResourceBundle('en', 'knowledgeBaseApp', en);
i18next.addResourceBundle('tr', 'knowledgeBaseApp', tr);

const KnowledgeBasePage = lazy(() => import('./KnowledgeBasePage'));

const KnowledgeBasePageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'pages/knowledge-base',
      element: <KnowledgeBasePage />,
    },
  ],
};

export default KnowledgeBasePageConfig;
