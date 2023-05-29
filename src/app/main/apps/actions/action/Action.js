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
import ActionHeader from './ActionHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import ConditionsTab from './tabs/ConditionsTab';
import ImagesTab from './tabs/ImagesTab';
import ConclusionTab from './tabs/ConclusionTab';
import { useTranslation } from 'react-i18next';
import FinalizeTab from './tabs/FinalizeTab';
import Api from 'app/fuse-configs/Api';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Steps, Button as ButtonAntd } from 'antd';
import { padding, style } from '@mui/system';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Grid from '@mui/material/Grid';

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

function Action(props) {
	const { t } = useTranslation('actionsApp');
	const dispatch = useDispatch();
	const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);

	const routeParams = useParams();
	const [action, setAction] = useState({});
	const [noProduct, setNoProduct] = useState(false);
	const [noAction, setNoAction] = useState(false);
	const [returnedConditions, setReturnedConditions] = useState([]);
	const [returnedEndDate, setReturnedEndDate] = useState(
		action.competition_end_date === undefined
			? new Date().getFullYear() +
			'-' +
			(+new Date().getMonth() + 1 < 10
				? '0' + (+new Date().getMonth() + 1)
				: +new Date().getMonth() + 1) +
			'-' +
			(new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) +
			' ' +
			(new Date().getHours() + 1 < 10 ? '0' + (new Date().getHours() + 1) : new Date().getHours() + 1) +
			':' +
			'05'
			: action.competition_end_date
	);
	const [returnedIsCompetition, setReturnedIsCompetition] = useState();
	const [returnedCompetitionPhoto, setReturnedCompetitionPhoto] = useState();
	const [returnedSecondCompetitionPhoto, setReturnedSecondCompetitionPhoto] = useState();
	const [returnedThirdCompetitionPhoto, setReturnedThirdCompetitionPhoto] = useState();
	const [checkedTwitterOption, setCheckedTwitterOption] = useState(false);
	const [returnedStartDate, setReturnedStartDate] = useState(
		action.competition_start_date === undefined
			? new Date().getFullYear() +
			'-' +
			(+new Date().getMonth() + 1 < 10
				? '0' + (+new Date().getMonth() + 1)
				: +new Date().getMonth() + 1) +
			'-' +
			(new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) +
			' ' +
			(new Date().getHours() + 1 < 10 ? '0' + (new Date().getHours() + 1) : new Date().getHours() + 1) +
			':' +
			'00'
			: action.competition_start_date
	);
	const [loading, setLoading] = useState(false);
	const [primaryTweetShow, setPrimaryTweetShow] = useState(false);
	const competitionMethods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});

	// STEPS

	const { Step } = Steps;
	const steps = [
		{
			id: 0,
			title: t('BASIC_INFORMATIONS'),
			content: <BasicInfoTab />,
			disabled: (window.location.href.split('#finalize')[1] !== undefined ||
				(action.competition_state === 5 && true))
		},
		{
			id: 1,
			title: t('IMAGES'),
			content: (
				<ImagesTab
					competition_state={action.competition_state}
					competition_photo={action.competition_photo}
					competition_second_photo={action.competition_second_photo}
					competition_third_photo={action.competition_third_photo}
					competition_video={action.competition_video}
					returnedCompetitionPhoto={(returnedCompetitionPhoto, data) =>
						returnedCompetitionPhoto && setReturnedCompetitionPhoto(data)
					}
					returnedSecondCompetitionPhoto={(returnedSecondCompetitionPhoto, data) =>
						returnedSecondCompetitionPhoto && setReturnedSecondCompetitionPhoto(data)
					}
					returnedThirdCompetitionPhoto={(returnedThirdCompetitionPhoto, data) =>
						returnedThirdCompetitionPhoto && setReturnedThirdCompetitionPhoto(data)
					}
				/>
			),
			disabled: (window.location.href.split('#finalize')[1] !== undefined ||
				(action.competition_state === 5 && true))
		},
		{
			id: 2,
			title: t('CONDITIONS'),
			content: (
				<ConditionsTab
					returnConditions={(returnConditions, datas) => returnConditions && setReturnedConditions(datas)}
					competition_conditions={action.conditions === undefined ? [] : action.conditions}
					returnCheckedTwitterOption={(returnCheckedTwitterOption, data) =>
						returnCheckedTwitterOption && setCheckedTwitterOption(data)
					}
					primaryTweetShow={primaryTweetShow}
					returnedConditions={returnedConditions}
				/>
			),
			disabled: (window.location.href.split('#finalize')[1] !== undefined ||
				(action.competition_state === 5 && true))
		},
		{
			id: 3,
			title: t('CONCLUSION'),
			content: (
				<ConclusionTab
					competition_start_date={
						action.competition_start_date === undefined
							? new Date().getFullYear() +
							'-' +
							(+new Date().getMonth() + 1 < 10
								? '0' + (+new Date().getMonth() + 1)
								: +new Date().getMonth() + 1) +
							'-' +
							(new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) +
							' ' +
							(new Date().getHours() + 1 < 10
								? '0' + (new Date().getHours() + 1)
								: new Date().getHours() + 1) +
							':' +
							'00'
							: action.competition_start_date
					}
					competition_end_date={
						action.competition_end_date === undefined
							? new Date().getFullYear() +
							'-' +
							(+new Date().getMonth() + 1 < 10
								? '0' + (+new Date().getMonth() + 1)
								: +new Date().getMonth() + 1) +
							'-' +
							(new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) +
							' ' +
							(new Date().getHours() + 1 < 10
								? '0' + (new Date().getHours() + 1)
								: new Date().getHours() + 1) +
							':' +
							'05'
							: action.competition_end_date
					}
					returnedEndDate={(returnedEndDate, data) => returnedEndDate && setReturnedEndDate(data)}
					returnedIsCompetition={(returnedIsCompetition, data) =>
						returnedIsCompetition && setReturnedIsCompetition(data)
					}
					returnedStartDate={(returnedStartDate, data) => returnedStartDate && setReturnedStartDate(data)}
				/>
			),
			disabled: (window.location.href.split('#finalize')[1] !== undefined ||
				(action.competition_state === 5 && true))
		},
		{
			id: 4,
			title: t('FINALIZE'),
			content: (
				<FinalizeTab
					competition_winner_count={action.competition_winner_count}
					competition_winner_backup_count={action.competition_winner_backup_count}
					is_competition={action.is_competition === 0 ? '0' : '1'}
					competition_state={action.competition_state === 0 ? '0' : action.competition_state}
					winners={action.winnersArray}
					checkCompetitionWinners={checkCompetitionWinners =>
						checkCompetitionWinners && checkCompetitionWinnersRandom()
					}
					loading={loading}
				/>
			),
			disabled: (routeParams.competitionId === 'new' ||
				window.location.href.split('#finalize')[1] === undefined ||
				(action.competition_state === 7 && true))
		}
	];

	const [current, setCurrent] = useState(0);
	const [tabValue, setTabValue] = useState(0);

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	const onChange = value => {
		setCurrent(value);
	};

	/**
	 * Tab Change
	 */
	 function handleTabChange(event, value) {
		setTabValue(value);
	}

	// const { reset, watch, control, onChange, formState } = methods;
	const { reset, watch } = competitionMethods;
	const form = watch();
	const competitionForm = watch();

	const checkCompetitionWinnersRandom = () => {
		setLoading(true);
		Api.checkCompetitionWinnersRandom(routeParams.competitionId).then(response => {
			setLoading(false);
			Api.sendWinnersNotification(routeParams.competitionId, response.data.winners);
			Api.sendAltWinnersNotification(routeParams.competitionId, response.data.altWinners);
			getCompetitionById(routeParams.competitionId);
		}).catch((err) => console.log(JSON.parse(err.response.request.response)));
	};

	const getCompetitionById = competitionId => {
		Api.getCompetitionById(competitionId).then(response => {
			if (response.data.code === 1) {
				if (response.data.data.competition_state === 5) {
					setCurrent(4);
				}
				if (response.data.data.competition_state === 7) {
					setCurrent(4);
				}
				setAction(response.data.data);
			} else {
				setNoProduct(true);
			}
		});
	};

	useDeepCompareEffect(() => {
		function updateProductState() {
			const { competitionId } = routeParams;

			if (window.location.href.split('#finalize')[1] !== undefined) {
				setCurrent(4);
			}

			if (competitionId === 'new') {
				/**
				 * Create New Product data
				 */
				dispatch(newProduct());
			} else {
				/**
				 * Get Product data
				 */
				getCompetitionById(competitionId);
				// dispatch(getProduct(routeParamsSecond)).then((action) => {
				//   /**
				//    * If the requested product is not exist show message
				//    */
				//   if (!action.payload) {
				//     setNoProduct(true);
				//   }
				// });
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
		if (!action) {
			return;
		}
		/**
		 * Reset the form on product state changes
		 */
		reset(action);
	}, [action, reset]);

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
			 * Reset Action on component unload
			 */
			// dispatch(resetProduct());
			setNoAction(false);
		};
	}, [dispatch]);

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
				<Button className="mt-24" component={Link} variant="outlined" to="/apps/actions" color="inherit">
					{t('GO_TO_ACTIONS_PAGE')}
				</Button>
			</motion.div>
		);
	}

	if (noAction) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-col flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					{t('THERE_IS_NO_PRODUCT')}
				</Typography>
				<Button className="mt-24" component={Link} variant="outlined" to="/apps/actions" color="inherit">
					{t('GO_TO_ACTIONS_PAGE')}
				</Button>
			</motion.div>
		);
	}

	/**
	 * Wait while product data is loading and form is setted
	 */
	if (
		_.isEmpty(competitionForm) ||
		(product && routeParams.competitionId !== product.id && routeParams.competitionId !== 'new')
	) {
		return <FuseLoading />;
	}

	return (
		<FormProvider {...competitionMethods}>
			<Root
				header={
					<ActionHeader
						conditions={returnedConditions}
						action_name={action.competition_name}
						competitionEndDate={returnedEndDate}
						isCompetition={returnedIsCompetition}
						competitionPhoto={returnedCompetitionPhoto}
						competitionSecondPhoto={returnedSecondCompetitionPhoto}
						competitionThirdPhoto={returnedThirdCompetitionPhoto}
						competitionStartDate={returnedStartDate}
						checkedTwitterOption={checkedTwitterOption}
					/>
				}
				contentToolbar={
					// <Steps
					// 	size="medium"
					// 	current={current}
					// 	style={{ paddingLeft: 20, paddingRight: 20, lineHeight: 16 }}
					// 	onChange={onChange}
					// >
					// 	{steps.map(item => (
					// 		<Step
					// 			key={item.title}
					// 			title={item.title}
					// 			disabled={
					// 				item.disabled
					// 			}
					// 		/>
					// 	))}
					// </Steps>
					<Tabs
						value={tabValue}
						onChange={handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="scrollable"
						scrollButtons="auto"
						classes={{ root: 'w-full h-64' }}
					>
						<Tab
							disabled={
								window.location.href.split('#finalize')[1] !== undefined ||
								(action.competition_state === 5 && true)
							}
							className="h-64"
							label={t('BASIC_INFORMATIONS')}
						/>
						<Tab
							disabled={
								window.location.href.split('#finalize')[1] !== undefined ||
								(action.competition_state === 5 && true)
							}
							label={t('IMAGES')}
						/>
						<Tab
							disabled={
								window.location.href.split('#finalize')[1] !== undefined ||
								(action.competition_state === 5 && true)
							}
							className="h-64"
							label={t('CONDITIONS')}
						/>
						<Tab
							disabled={
								window.location.href.split('#finalize')[1] !== undefined ||
								(action.competition_state === 5 && true)
							}
							className="h-64"
							label={t('CONCLUSION')}
						/>
						<Tab
							disabled={
								routeParams.competitionId === 'new' ||
								window.location.href.split('#finalize')[1] === undefined ||
								(action.competition_state === 7 && true)
							}
							className="h-64"
							label={t('FINALIZE')}
						/>
					</Tabs>
				}
				content={
					// <Grid container direction="row" alignItems="center">
					// 	{/* <Grid item xs={1} style={{ paddingLeft: 10 }}>
					// 		<div className="steps-action" >
					// 			{current > 0 && (
					// 				<ButtonAntd
					// 					shape="round"
					// 					icon={<LeftOutlined />}
					// 					style={{
					// 						margin: '0 0',
					// 						display: 'none'
					// 					}}
					// 					onClick={() => prev()}
					// 				></ButtonAntd>
					// 			)}
					// 		</div>
					// 	</Grid> */}
					// 	<Grid item xs={10}>
					// 		{/* <div className="p-16 sm:p-24 max-w-2xl" style={{ paddingRight: 24 }}>
					// 			<div className="steps-content">{steps[current].content}</div>
					// 		</div> */}
					// 	</Grid>
					// 	{/* <Grid item xs={1} style={{ paddingRight: 10 }}>
					// 		<div className="steps-action" >
					// 			{current < steps.length - 2 && (
					// 				<ButtonAntd
					// 					shape="round"
					// 					icon={<RightOutlined />}
					// 					type="primary"
					// 					style={{ display: 'none' }}
					// 					onClick={() => next()}
					// 				></ButtonAntd>
					// 			)}
					// 			{current === steps.length - 2 && (
					// 				<ButtonAntd
					// 					shape="round"
					// 					type="primary"
					// 					onClick={() => {
					// 						setCurrent(steps.length - 1);
					// 					}}
					// 					style={{ display: 'none' }}
					// 				>
					// 					Done
					// 				</ButtonAntd>
					// 			)}
					// 		</div>
					// 	</Grid> */}
					// </Grid>
					<div className="p-16 sm:p-24 max-w-2xl">
						<div className={tabValue !== 0 ? 'hidden' : ''}>
							<BasicInfoTab />
						</div>

						<div className={tabValue !== 1 ? 'hidden' : ''}>
							<ImagesTab
								competition_state={action.competition_state}
								competition_photo={action.competition_photo}
								competition_second_photo={action.competition_second_photo}
								competition_third_photo={action.competition_third_photo}
								competition_video={action.competition_video}
								returnedCompetitionPhoto={(returnedCompetitionPhoto, data) =>
									returnedCompetitionPhoto && setReturnedCompetitionPhoto(data)
								}
								returnedSecondCompetitionPhoto={(returnedSecondCompetitionPhoto, data) =>
									returnedSecondCompetitionPhoto && setReturnedSecondCompetitionPhoto(data)
								}
								returnedThirdCompetitionPhoto={(returnedThirdCompetitionPhoto, data) =>
									returnedThirdCompetitionPhoto && setReturnedThirdCompetitionPhoto(data)
								}
							/>
						</div>

						<div className={tabValue !== 2 ? 'hidden' : ''}>
							<ConditionsTab
								returnConditions={(returnConditions, datas) =>
									returnConditions && setReturnedConditions(datas)
								}
								competition_conditions={action.conditions === undefined ? [] : action.conditions}
								returnCheckedTwitterOption={(returnCheckedTwitterOption, data) =>
									returnCheckedTwitterOption && setCheckedTwitterOption(data)
								}
								primaryTweetShow={primaryTweetShow}
								makePrimaryTweetShowTrue={(data) => data && setPrimaryTweetShow(true)}
								makePrimaryTweetShowFalse={(data) => data && setPrimaryTweetShow(false)}
							/>
						</div>

						<div className={tabValue !== 3 ? 'hidden' : ''}>
							<ConclusionTab
								competition_start_date={
									action.competition_start_date === undefined
										? new Date().getFullYear() +
										'-' +
										(+new Date().getMonth() + 1 < 10
											? '0' + (+new Date().getMonth() + 1)
											: +new Date().getMonth() + 1) +
										'-' +
										(new Date().getDate() < 10
											? '0' + new Date().getDate()
											: new Date().getDate()) +
										' ' +
										(new Date().getHours() + 1 < 10
											? '0' + (new Date().getHours() + 1)
											: new Date().getHours() + 1) +
										':' +
										'00'
										: action.competition_start_date
								}
								competition_end_date={
									action.competition_end_date === undefined
										? new Date().getFullYear() +
										'-' +
										(+new Date().getMonth() + 1 < 10
											? '0' + (+new Date().getMonth() + 1)
											: +new Date().getMonth() + 1) +
										'-' +
										(new Date().getDate() < 10
											? '0' + new Date().getDate()
											: new Date().getDate()) +
										' ' +
										(new Date().getHours() + 1 < 10
											? '0' + (new Date().getHours() + 1)
											: new Date().getHours() + 1) +
										':' +
										'05'
										: action.competition_end_date
								}
								returnedEndDate={(returnedEndDate, data) => returnedEndDate && setReturnedEndDate(data)}
								returnedIsCompetition={(returnedIsCompetition, data) =>
									returnedIsCompetition && setReturnedIsCompetition(data)
								}
								returnedStartDate={(returnedStartDate, data) =>
									returnedStartDate && setReturnedStartDate(data)
								}
							/>
						</div>

						<div className={tabValue !== 4 ? 'hidden' : ''}>
							<FinalizeTab
								competition_winner_count={action.competition_winner_count}
								competition_winner_backup_count={action.competition_winner_backup_count}
								is_competition={action.is_competition === 0 ? '0' : '1'}
								competition_state={action.competition_state === 0 ? '0' : action.competition_state}
								winners={action.winnersArray}
								checkCompetitionWinners={checkCompetitionWinners =>
									checkCompetitionWinners && checkCompetitionWinnersRandom()
								}
								loading={loading}
							/>
						</div>
					</div>
				}
				innerScroll
			/>
		</FormProvider>
	);
}

export default withReducer('eCommerceApp', reducer)(Action);
