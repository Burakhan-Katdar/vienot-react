import { lazy } from 'react';
import en from './i18n/en';
import tr from './i18n/tr';
import i18next from 'i18next';
import { Navigate } from 'react-router-dom';

const AllowedPartnerConditions = lazy(() => import('./allowed-partner-conditions/AllowedPartnerConditions'));

i18next.addResourceBundle('en', 'allowedPartnerConditionsApp', en);
i18next.addResourceBundle('tr', 'allowedPartnerConditionsApp', tr);

const AllowedPartnerConditionsAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/allowed-partner-conditions',
			element: <AllowedPartnerConditions />
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
			path: 'apps/allowed-partner-conditions',
			element: <Navigate to="allowed-partner-conditions" />
		}
	]
};

export default AllowedPartnerConditionsAppConfig;
