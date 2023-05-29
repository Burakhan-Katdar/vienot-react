import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import _ from '@lodash';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import Api from 'app/fuse-configs/Api';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';

function ActionHeader(props) {
	const {
		action_name,
		conditions,
		competitionEndDate,
		isCompetition,
		competitionPhoto,
		competitionSecondPhoto,
		competitionThirdPhoto,
		competitionStartDate,
		checkedTwitterOption
	} = props;

	const { t } = useTranslation('actionsApp');
	const competitionMethods = useFormContext();
	const { getValues } = competitionMethods;
	const theme = useTheme();
	const navigate = useNavigate();
	const routeParams = useParams();
	const user = useSelector(({ auth }) => auth.user);
	const [loading, setLoading] = useState(false)

	const checkCompetitionHashtag = (twitterLink, isLiveTweet) => {
		if (isCompetition === '1') {
			if (conditions.find(item => item.condition_id === 11) || conditions.find(item => item.condition_id === 12)) {
				let falseCheck = 0;
				conditions.map((condition) => {
					if (condition.condition_id === 11 || condition.condition_id === 12) {
						if (!condition.competition_condition_value) {
							falseCheck = 1;
						}
					}
				})
				if (falseCheck) {
					message.error(t('ACTION_FILL_HASHTAG_CONDITION_ERROR'));
				} else {
					sendToServerTheAction(twitterLink === null ? null : twitterLink, isLiveTweet);
				}
			} else {
				message.error(t('ACTION_ADD_HASHTAG_CONDITION_ERROR'));
			}
		} else {
			sendToServerTheAction(twitterLink === null ? null : twitterLink, isLiveTweet);
		}
	}

	const sendToServerTheAction = (tweet_link, isLiveTweet) => {
		setLoading(true)
		Api.addCompetition(
			getValues().competition_name,
			getValues().competition_description,
			getValues().competition_video,
			competitionPhoto,
			competitionSecondPhoto,
			competitionThirdPhoto,
			tweet_link,
			getValues().competition_is_paid === undefined ? 0 : getValues().competition_is_paid,
			competitionEndDate,
			conditions,
			isCompetition,
			getValues().competition_winner_count,
			getValues().competition_winner_backup_count,
			competitionStartDate,
			new Date().getTimezoneOffset() / 60,
			isLiveTweet
		)
			.then(response => {
				setLoading(false)
				if (response.data.code === 1) {
					Api.sendEventAddedMail()
					message.success(t('ACTION_SUCCESS_SEND_TO_REVIEW'));
					navigate('/apps/actions');
				} else {
					message.success(t('ACTION_ERR_SEND_TO_REVIEW'));
				}
			})
			.catch(err => {
				setLoading(false)
				if (err.response === undefined) {
					console.log('err: ', err);
				} else {
					console.log('err: ', JSON.parse(err.response.request.response));
				}
				message.error(t('ERROR_ON_SERVER'));
			});
	};

	function handleSaveAction() {
		console.log('conditions: ', conditions)
		let isConditionsTrue = 0;
		let twitterSartVarVeDoldurmamis = 0;
		conditions.map((condition) => {
			if (condition.social_media_id === 2) {
				if (condition.must_fill === 0 && condition.competition_condition_value === undefined) {
					twitterSartVarVeDoldurmamis = 1;
				}
			}
			if (condition.must_fill === 1 && condition.competition_condition_value === undefined) {
				isConditionsTrue = 1;
			}
		})
		if (getValues().competition_name === undefined) {
			message.error(t('ACTION_TITLE_ERROR'));
		} else {
			if (getValues().competition_description === undefined) {
				message.error(t('ACTION_DESC_ERROR'));
			} else {
				if (conditions.length === 0) {
					message.error(t('ACTION_CONDITION_ERROR'));
				} else {
					if (isConditionsTrue) {
						message.error(t('CHECK_YOUR_CONDITIONS'));
					}
					else {
						if (
							parseInt(getValues().competition_winner_count) < 1 ||
							getValues().competition_winner_count === undefined
						) {
							message.error(t('ACTION_WINNER_COUNT_ERROR'));
						} else {
							if (
								getValues().competition_winner_count > getValues().competition_winner_backup_count ||
								parseInt(getValues().competition_winner_backup_count) < 1 ||
								getValues().competition_winner_backup_count === undefined
							) {
								message.error(t('ACTION_WINNER_BACKUP_COUNT_ERROR'));
							} else {
								if (isCompetition === undefined) {
									message.error(t('ACTION_TYPE_ERROR'));
								} else {
									if (checkedTwitterOption === true) {
										checkCompetitionHashtag(null, 1)
									} else {
										if (getValues().competition_tweet_link === undefined) {
											if (twitterSartVarVeDoldurmamis === 1) {
												message.error(t('ACTION_TWEET_LINK_ERROR'));
											} else {
												checkCompetitionHashtag(null, 0)
											}
										} else {
											checkCompetitionHashtag(getValues().competition_tweet_link, 0)
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	const handleOnaylaAction = () => {
		Api.changeCompetitionState(routeParams.competitionId, 3).then(() => {
			message.success(t('ACTION_ACCEPTED'));
			navigate('/apps/actions');
		});
	};

	const handleSponsorluOnaylaAction = () => {
		Api.changeCompetitionStateSponsored(routeParams.competitionId, 3).then(() => {
			message.success(t('ACTION_ACCEPTED'));
			navigate('/apps/actions');
		});
	};

	const handleReddetAction = () => {
		Api.changeCompetitionState(routeParams.competitionId, 2).then(() => {
			message.success(t('ACTION_REJECTED'));
			navigate('/apps/actions');
		});
	};;

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/apps/actions"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">{t('ACTIONS')}</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="hidden sm:flex"
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.3 } }}
					>
						{/* {images.length > 0 && featuredImageId ? (
							<img
								className="w-32 sm:w-48 rounded"
								src={_.find(images, { id: featuredImageId }).url}
								alt={name}
							/>
							) : (
							<img
								className="w-32 sm:w-48 rounded"
								src="assets/images/ecommerce/product-image-placeholder.png"
								alt={name}
							/>
							)} */}
					</motion.div>
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{action_name || t('NEW_ACTION')}
							</Typography>
							{/* <Typography variant="caption" className="font-medium">
								{t('ACTION_DETAILS')}
							</Typography> */}
						</motion.div>
					</div>
				</div>
			</div>
			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					style={
						routeParams.competitionId == 'new'
							? { display: 'none' }
							: user.role === 'admin'
								? null
								: { display: 'none' }
					}
					startIcon={<Icon className="hidden sm:flex">save</Icon>}
					onClick={handleSponsorluOnaylaAction}
				>
					Sponsorlu Onayla
				</Button>
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					style={
						routeParams.competitionId == 'new'
							? { display: 'none' }
							: user.role === 'admin'
								? null
								: { display: 'none' }
					}
					startIcon={<Icon className="hidden sm:flex">save</Icon>}
					onClick={handleOnaylaAction}
				>
					Onayla
				</Button>
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					style={
						routeParams.competitionId == 'new'
							? { display: 'none' }
							: user.role === 'admin'
								? null
								: { display: 'none' }
					}
					startIcon={<Icon className="hidden sm:flex">save</Icon>}
					onClick={handleReddetAction}
				>
					Reddet
				</Button>
				<LoadingButton
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					loading={loading}
					style={routeParams.competitionId == 'new' ? null : { display: 'none' }}
					startIcon={<Icon className="hidden sm:flex">save</Icon>}
					disabled={
						(routeParams.competitionId == 'new' ? false : true) || user.data.displayName === 'John Doe'
					}
					onClick={handleSaveAction}
				>
					{t('SAVE')}
				</LoadingButton>
			</motion.div>
		</div>
	);
}

export default ActionHeader;
