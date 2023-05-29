import { lazy } from 'react';
import en from './i18n/en';
import tr from './i18n/tr';
import i18next from 'i18next';
import { Navigate } from 'react-router-dom';

const Partners = lazy(() => import('./partners/Partners'));
const Partner = lazy(() => import('./action/Action'));

i18next.addResourceBundle('en', 'partnersApp', en);
i18next.addResourceBundle('tr', 'partnersApp', tr);

const PartnersAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/partners',
			element: <Partners />
		},
		{
			path: 'apps/partners/:partnerId/*',
			element: <Partner />
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
			path: 'apps/partners',
			element: <Navigate to="partners" />
		}
	]
};

export default PartnersAppConfig;
