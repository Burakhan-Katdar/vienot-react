import { lazy } from 'react';
import en from './i18n/en';
import tr from './i18n/tr';
import i18next from 'i18next';
import { Navigate } from 'react-router-dom';

const Invitations = lazy(() => import('./invitations/Invitations'));
const Invitation = lazy(() => import('./invitation/Invitation'));

i18next.addResourceBundle('en', 'invitationsApp', en);
i18next.addResourceBundle('tr', 'invitationsApp', tr);

const InvitationsAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/invitations',
			element: <Invitations />
		},
		{
			path: 'apps/invitations/:invitationId/*',
			element: <Invitation />
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
			path: 'apps/invitations',
			element: <Navigate to="invitations" />
		}
	]
};

export default InvitationsAppConfig;
