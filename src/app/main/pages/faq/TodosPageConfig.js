import { lazy } from 'react';
import i18next from 'i18next';
import en from './i18n/en';
import tr from './i18n/tr';

i18next.addResourceBundle('en', 'todosApp', en);
i18next.addResourceBundle('tr', 'todosApp', tr);

const TodosPage = lazy(() => import('./TodosPage'));

const TodosPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'pages/todos',
      element: <TodosPage />,
    },
  ],
};

export default TodosPageConfig;
