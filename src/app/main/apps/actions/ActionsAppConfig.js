import { lazy } from 'react';
import en from './i18n/en';
import tr from './i18n/tr';
import i18next from 'i18next';
import { Navigate } from 'react-router-dom';

const Competition = lazy(() => import('./action/Action'));
const Competitions = lazy(() => import('./actions/Actions'));

i18next.addResourceBundle('en', 'actionsApp', en);
i18next.addResourceBundle('tr', 'actionsApp', tr);

const ActionsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/actions',
      element: <Competitions />,
    },
    {
      path: 'apps/actions/:competitionId/*',
      element: <Competition />,
    },
    // {
    //   path: 'apps/actions/orders',
    //   element: <Orders />,
    // },
    // {
    //   path: 'apps/actions/orders/:orderId',
    //   element: <Order />,
    // },
    {
      path: 'apps/actions',
      element: <Navigate to="actions" />,
    },
  ],
};

export default ActionsAppConfig;
