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
		checkCompetitionWinners
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
						<Grid container className="mt-16">
							{winners
								.filter(item => item.is_winner === 1)
								.sort((a, b) => a.winner_place > b.winner_place)
								.map(winner => (
									<Grid item xs={2}>
										<Paper
											component={motion.div}
											initial={{ y: 20, opacity: 0 }}
											animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
											className="rounded-0 shadow-none lg:rounded-16 lg:shadow"
										>
											<div className="p-24 flex items-center">
												<Avatar alt={winner.twitter_username} src={winner.twitter_photo_url} />
												<Typography className="mx-12">{winner.twitter_username}</Typography>
											</div>

											<Divider />

											<div className="p-24">
												<Button
													variant="contained"
													color="secondary"
													className="w-full"
													onClick={ev =>
														window.open(
															'https://twitter.com/' + winner.twitter_username,
															'_blank'
														)
													}
												>
													{winner.winner_place}. {t('WINNER')}
												</Button>
											</div>
										</Paper>
									</Grid>
								))}
							{winners
								.filter(item => item.is_backup === 1)
								.sort((a, b) => a.winner_place > b.winner_place)
								.map(winner => (
									<Grid item xs={2}>
										<Paper
											component={motion.div}
											initial={{ y: 20, opacity: 0 }}
											animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
											className="rounded-0 shadow-none lg:rounded-16 lg:shadow"
										>
											<div className="p-24 flex items-center">
												<Avatar alt={winner.twitter_username} src={winner.twitter_photo_url} />
												<Typography className="mx-12">{winner.twitter_username}</Typography>
											</div>

											<Divider />

											<div className="p-24">
												<Button
													variant="contained"
													color="secondary"
													className="w-full"
													onClick={ev =>
														window.open(
															'https://twitter.com/' + winner.twitter_username,
															'_blank'
														)
													}
												>
													{winner.winner_place}. {t('WINNER_BACKUP')}
												</Button>
											</div>
										</Paper>
									</Grid>
								))}
						</Grid>
					)}
				</Grid>
			)}

			{is_competition === '0' && (
				<Grid container>
					<Grid item xs={12} className="text-center">
						<Button variant="contained" disabled={competition_state === 7} onClick={handleClickOpen}>
							{t('FINALIZE')}
						</Button>
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
						<Grid container className="mt-16">
							{winners
								.filter(item => item.is_winner === 1)
								.sort((a, b) => a.winner_place > b.winner_place)
								.map(winner => (
									<Grid item xs={2}>
										<Paper
											component={motion.div}
											initial={{ y: 20, opacity: 0 }}
											animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
											className="rounded-0 shadow-none lg:rounded-16 lg:shadow"
										>
											<div className="p-24 flex items-center">
												<Avatar alt={winner.twitter_username} src={winner.twitter_photo_url} />
												<Typography className="mx-12">{winner.twitter_username}</Typography>
											</div>

											<Divider />

											<div className="p-24">
												<Button
													variant="contained"
													color="secondary"
													className="w-full"
													onClick={ev =>
														window.open(
															'https://twitter.com/' + winner.twitter_username,
															'_blank'
														)
													}
												>
													{winner.winner_place}. {t('WINNER')}
												</Button>
											</div>
										</Paper>
									</Grid>
								))}
							{winners
								.filter(item => item.is_backup === 1)
								.sort((a, b) => a.winner_place > b.winner_place)
								.map(winner => (
									<Grid item xs={2}>
										<Paper
											component={motion.div}
											initial={{ y: 20, opacity: 0 }}
											animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
											className="rounded-0 shadow-none lg:rounded-16 lg:shadow"
										>
											<div className="p-24 flex items-center">
												<Avatar alt={winner.twitter_username} src={winner.twitter_photo_url} />
												<Typography className="mx-12">{winner.twitter_username}</Typography>
											</div>

											<Divider />

											<div className="p-24">
												<Button
													variant="contained"
													color="secondary"
													className="w-full"
													onClick={ev =>
														window.open(
															'https://twitter.com/' + winner.twitter_username,
															'_blank'
														)
													}
												>
													{winner.winner_place}. {t('BACKUP_WINNER')}
												</Button>
											</div>
										</Paper>
									</Grid>
								))}
						</Grid>
					)}
				</Grid>
			)}
		</div>
	);
}

export default FinalizeTab;
