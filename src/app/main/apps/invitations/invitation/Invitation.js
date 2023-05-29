import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';
import { resetProduct, newProduct, getProduct } from '../store/productSlice';
import reducer from '../store';
import InvitationHeader from './InvitationHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import DetailsTab from './tabs/DetailsTab';
import { useTranslation } from 'react-i18next';
import Api from 'app/fuse-configs/Api';

const Root = styled(FusePageCarded)(({ theme }) => ({
	'& .FusePageCarded-header': {
		minHeight: 72,
		height: 72,
		alignItems: 'center',
		[theme.breakpoints.up('sm')]: {
			minHeight: 136,
			height: 136
		}
	}
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	name: yup
		.string()
		.required('You must enter a product name')
		.min(5, 'The product name must be at least 5 characters')
});

function Invitation(props) {
	const { t } = useTranslation('invitationsApp');
	const dispatch = useDispatch();
	const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);

	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [invitation, setInvitation] = useState({});
	const [noProduct, setNoProduct] = useState(false);
	const [noInvitation, setNoInvitation] = useState(false);

	const competitionMethods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});

	// const { reset, watch, control, onChange, formState } = methods;
	const { reset, watch } = competitionMethods;
	const form = watch();
	const competitionForm = watch();

	const getInvitationById = invitationId => {
		Api.getInvitationById(invitationId)
			.then(response => {
				setInvitation(response.data.data);
			})
			.catch(err => console.log(err.response.request));
	};

	useDeepCompareEffect(() => {
		function updateProductState() {
			const { invitationId } = routeParams;

			if (invitationId === 'new') {
				/**
				 * Create New Product data
				 */
				dispatch(newProduct());
			} else {
				/**
				 * Get Product data
				 */
				getInvitationById(invitationId);
			}
		}

		updateProductState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if (!product) {
			return;
		}
		/**
		 * Reset the form on product state changes
		 */
		reset(product);
	}, [product, reset]);

	useEffect(() => {
		if (!invitation) {
			return;
		}
		/**
		 * Reset the form on product state changes
		 */
		reset(invitation);
	}, [invitation, reset]);

	useEffect(() => {
		return () => {
			/**
			 * Reset Product on component unload
			 */
			dispatch(resetProduct());
			setNoProduct(false);
		};
	}, [dispatch]);

	useEffect(() => {
		return () => {
			/**
			 * Reset invitation on component unload
			 */
			// dispatch(resetProduct());
			setNoInvitation(false);
		};
	}, [dispatch]);

	/**
	 * Tab Change
	 */
	function handleTabChange(event, value) {
		setTabValue(value);
	}

	/**
	 * Show Message if the requested products is not exists
	 */
	if (noProduct) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					{t('THERE_IS_NO_PRODUCT')}
				</Typography>
				<Button className="mt-24" component={Link} variant="outlined" to="/apps/invitations" color="inherit">
					{t('GO_TO_INVITATIONS_PAGE')}
				</Button>
			</motion.div>
		);
	}

	if (noInvitation) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					{t('THERE_IS_NO_PRODUCT')}
				</Typography>
				<Button className="mt-24" component={Link} variant="outlined" to="/apps/invitations" color="inherit">
					{t('GO_TO_INVITATIONS_PAGE')}
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while product data is loading and form is setted
	 */
	if (
		_.isEmpty(competitionForm) ||
		(product && routeParams.invitationId !== product.id && routeParams.invitationId !== 'new')
	) {
		return <FuseLoading />;
	}

	return (
		<FormProvider {...competitionMethods}>
			<Root
				header={<InvitationHeader code={invitation.code} />}
				contentToolbar={
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						classes={{ root: 'w-full h-64' }}
					>
						<Tab className="h-64" label={t('BASIC_INFORMATIONS')} />
						<Tab label={t('DETAILS')} />
					</Tabs>
				}
				content={
					<div className="p-16 sm:p-24 max-w-2xl">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<BasicInfoTab />
						</div>

						<div className={tabValue !== 1 ? 'hidden' : ''}>
							<DetailsTab />
						</div>
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default withReducer('eCommerceApp', reducer)(Invitation);
