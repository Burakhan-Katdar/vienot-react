import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useFormContext } from 'react-hook-form';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import { color } from '@mui/system';
import { Popover, Button as ButtonAntd, message } from 'antd';
import { Icon } from '@mui/material';

function FinalizeTab(props) {
	const { t } = useTranslation('actionsApp');
	const routeParams = useParams();
	const navigate = useNavigate();
	const {
		competition_winner_count,
		competition_winner_backup_count,
		is_competition,
		competition_state,
		winners,
		checkCompetitionWinners,
		loading
	} = props;
	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleAcceptCompetition = () => {
		setOpen(false);
		checkCompetitionWinners(true);
	};

	const firstPlaceMedal = require('./images/1st_place_medal_120px.png');
	const secondPlaceMedal = require('./images/2nd_place_medal_120px.png');
	const thirdPlaceMedal = require('./images/3rd_place_medal_120px.png');

	const WinnerPhotoPreparer = (winner_data) => {
		let winner = winner_data.competition_result.user.social_user
		if (winner.twitter_user != null) {
			return winner.twitter_user.twitter_photo_url;
		}
		else if (winner.discord_user != null) {
			return winner.discord_user.discord_profile_photo;
		}
		else if (winner.youtube_user != null) {
			return winner.youtube_user.channel_profile_photo;
		}
		else if (winner.google_user != null) {
			return winner.google_user.google_photo;
		}
		else {
			return winner.social_user_profile_photo;
		}
	}

	const WinnerInfoPreparer = (winner_data) => {
		let winner = winner_data.competition_result.user.social_user
		let email = winner.google_user === null
			? winner.apple_user === null ? '' : winner.apple_user.apple_email.replace(winner.apple_user.apple_email.substring(0, 5), '*****')
			: winner.google_user.google_email.replace(winner.google_user.google_email.substring(0, 5), '*****');
		let username = '';
		let link = '';
		if (winner.twitter_user != null) {
			username = winner.twitter_user.twitter_username;
			link = 'https://twitter.com/' + winner.twitter_user.twitter_username;
		}
		else if (winner.discord_user != null) {
			username = winner.discord_user.discord_username + '#' + winner.discord_user.discord_discriminator;
			link = 'mailto: ' + winner.google_user === null
				? winner.apple_user === null ? '' : winner.apple_email
				: winner.google_user.google_email;
		}
		else if (winner.youtube_user != null) {
			username = winner.channel_name;
			link = 'mailto: ' + winner.google_user === null
				? winner.apple_user === null ? '' : winner.apple_email
				: winner.google_user.google_email;
		}
		else if (winner.google_user != null) {
			link = 'mailto: ' + winner.google_user.google_email;
		}
		return (
			<>
				{winner.twitter_user !== null &&
					<Typography gutterBottom>{t('WINNER_TWITTER_USERNAME')} : <a
						href={link}
						target='_blank'
						style={{
							textDecoration: 'none',
							color: 'black'
						}}
					>
						{winner.twitter_user.twitter_username}
					</a></Typography>
				}
				{winner.discord_user !== null &&
					<Typography gutterBottom>{t('WINNER_DISCORD_USERNAME')} : {winner.discord_user.discord_username + '#' + winner.discord_user.discord_discriminator}</Typography>
				}
				{email !== '' &&
					<Typography gutterBottom >Email : {email}
						<Icon
							style={{ marginLeft: 8 }}
							onClick={() => {
								let emailPublic = winner.google_user === null
									? winner.apple_user === null ? '' : winner.apple_email
									: winner.google_user.google_email;
								navigator.clipboard.writeText(emailPublic);
								if (emailPublic !== '') {
									message.success(t('COPIED'));
								}
							}}
							fontSize="small"
						>
							content_copy
						</Icon>
					</Typography>
				}
			</>
		);
	}

	const WinnerComponentPreparer = (winner, color) => {
		return (
			<div>
				<div style={{ color, fontSize: 24, fontWeight: color !== null && 'bold' }}>
					{winner.winner_place}. {t('WINNER')}
				</div>
				<div className="p-24 flex items-center">
					{winner.winner_place <= 3 &&
						<img src={
							winner.winner_place === 1
								? firstPlaceMedal
								: (winner.winner_place === 2
									? secondPlaceMedal
									: thirdPlaceMedal)
						} style={{ width: '20%' }} />
					}
					<Avatar
						alt={winner.winner_place + '_photo'}
						src={WinnerPhotoPreparer(winner)}
					/>
					<Popover
						placement="topLeft"
						title={t('WINNER_INFORMATIONS')}
						content={() => WinnerInfoPreparer(winner)} trigger="click"
					>
						<ButtonAntd style={{ margin: 12 }}>{t('INFORMATIONS')}</ButtonAntd>
					</Popover>
				</div>
			</div>
		)
	}
	return (
		<div>
			{is_competition === '1' && (
				<Grid container>
					<Grid item xs={12} className="text-center">
						<Button
							variant="contained"
							onClick={() =>
								navigate(
									'/apps/competition-finalize/' + routeParams.competitionId + '/will-be-reviewed'
								)
							}
						>
							{t('GO_TO_RESULTS')}
						</Button>
					</Grid>
					{competition_state === 7 && (
						<Grid container spacing={2} className="mt-16">
							{winners
								.filter(item => item.is_winner === 1)
								.sort((a, b) => a.winner_place > b.winner_place)
								.map(winner => (
									<Grid >
										{winner.winner_place == 1 && WinnerComponentPreparer(winner, '#D6A706')}
										{winner.winner_place == 2 && WinnerComponentPreparer(winner, '#777A81')}
										{winner.winner_place == 3 && WinnerComponentPreparer(winner, '#CC7F33')}
										{winner.winner_place > 3 && WinnerComponentPreparer(winner, null)}
									</Grid>
								))}
							{winners
								.filter(item => item.is_backup === 1)
								.sort((a, b) => a.winner_place > b.winner_place)
								.map(winner => (
									<Grid item xs={6}>
										<h1>
											{winner.winner_place}. {t('BACKUP_WINNER')}
										</h1>
										<div className="p-24 flex items-center">
											<Avatar
												alt={winner.twitter_username}
												src={winner.twitter_photo_url}
												onClick={ev =>
													window.open(
														'https://twitter.com/' + winner.twitter_username,
														'_blank'
													)
												}
											/>
											<Typography
												className="mx-12"
												onClick={ev =>
													window.open(
														'https://twitter.com/' + winner.twitter_username,
														'_blank'
													)
												}
												style={{ fontSize: 18 }}
											>
												{winner.twitter_username}
											</Typography>
										</div>

										{/* <div className="p-24">
											<Button variant="contained" color="secondary" className="w-full">
												{winner.winner_place}. {t('BACKUP_WINNER')}
											</Button>
										</div> */}
									</Grid>
								))}
						</Grid>
					)}
				</Grid>
			)}

			{is_competition === '0' && (
				<Grid container>
					<Grid item xs={12} className="text-center">
						<LoadingButton
							variant="contained"
							loading={loading}
							disabled={competition_state === 7}
							onClick={handleClickOpen}
						>
							{t('FINALIZE')}
						</LoadingButton>
						<Dialog
							open={open}
							onClose={handleClose}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">{t('LAST_STEP')}</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									{competition_winner_count} {t('WINNERS_AND')} {competition_winner_backup_count}{' '}
									{t('WINNERS_AND_CONTINUES')}
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button color="error" onClick={handleClose}>
									{t('NOT_APPROVE')}
								</Button>
								<Button color="success" onClick={handleAcceptCompetition} autoFocus>
									{t('APPROVE')}
								</Button>
							</DialogActions>
						</Dialog>
					</Grid>

					{competition_state === 7 && (
						<Grid item container direction={'row'} className="mt-16">
							<Grid item container xs={12}>
								{winners
									.filter(item => item.is_winner === 1)
									.sort((a, b) => a.winner_place > b.winner_place)
									.map(winner => (
										<Grid>
											{winner.winner_place == 1 && WinnerComponentPreparer(winner, '#D6A706')}
											{winner.winner_place == 2 && WinnerComponentPreparer(winner, '#777A81')}
											{winner.winner_place == 3 && WinnerComponentPreparer(winner, '#CC7F33')}
											{winner.winner_place > 3 && WinnerComponentPreparer(winner, null)}
										</Grid>
									))}
							</Grid>

							<Grid item container xs={12}>
								{winners
									.filter(item => item.is_backup === 1)
									.sort((a, b) => a.winner_place > b.winner_place)
									.map(winner => (
										<Grid>
											<h1>
												{winner.winner_place}. {t('BACKUP_WINNER')}
											</h1>
											<div className="p-24 flex items-center">
												<Avatar
													alt={winner.winner_place + '_photo'}
													src={WinnerPhotoPreparer(winner)}
												/>
												<Popover
													placement="topLeft"
													title={t('WINNER_INFORMATIONS')}
													content={() => WinnerInfoPreparer(winner)} trigger="click"
												>
													<ButtonAntd style={{ margin: 12 }}>{t('INFORMATIONS')}</ButtonAntd>
												</Popover>
											</div>

											{/* <div className="p-24">
											<Button variant="contained" color="secondary" className="w-full">
												{winner.winner_place}. {t('BACKUP_WINNER')}
											</Button>
										</div> */}
										</Grid>
									))}
							</Grid>
						</Grid>
					)}
				</Grid>
			)}
		</div>
	);
}

export default FinalizeTab;
