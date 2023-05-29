import * as React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Controller, useFormContext } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';

function ConclusionTab(props) {
	const { t } = useTranslation('actionsApp');
	const { competition_end_date, returnedEndDate, returnedIsCompetition, competition_start_date, returnedStartDate } =
		props;
	const [competitionEndDate, setCompetitionEndDate] = React.useState(
		new Date(competition_end_date.replace(' ', 'T'))
	);
	const [competitionStartDate, setCompetitionStartDate] = React.useState(
		new Date(competition_start_date.replace(' ', 'T'))
	);
	const methods = useFormContext();
	const { control } = methods;
	const handleChangeEndDate = newValue => {
		if (newValue.getTime() <= competitionStartDate.getTime()) {
			setCompetitionStartDate(new Date(newValue.getTime() - 5 * 60000));
			returnedStartDate(
				true,
				new Date(newValue.getTime() - 5 * 60000).addHours(-(new Date().getTimezoneOffset() / 60))
			);
		}
		returnedEndDate(true, new Date(newValue).addHours(-(new Date().getTimezoneOffset() / 60)));
		setCompetitionEndDate(newValue);
	};
	Date.prototype.addHours = function (h) {
		this.setTime(this.getTime() + h * 60 * 60 * 1000);
		return this;
	};
	const handleChangeStartDate = newValue => {
		if (newValue.getTime() >= competitionEndDate.getTime()) {
			setCompetitionEndDate(new Date(newValue.getTime() + 5 * 60000));
			returnedEndDate(
				true,
				new Date(newValue.getTime() + 5 * 60000).addHours(-(new Date().getTimezoneOffset() / 60))
			);
		}
		returnedStartDate(true, new Date(newValue).addHours(-(new Date().getTimezoneOffset() / 60)));
		setCompetitionStartDate(newValue);
	};

	return (
		<div>
			<Grid
				container
				direction="row"
				justifyContent="space-around"
				alignItems="right"
				style={{ paddingLeft: 20, paddingRight: 20 }}
			>
				<Grid item>
					{t('ACTION_WINNER_COUNT_LABEL')}
					<Grid>
						<Controller
							name="competition_winner_count"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-8 mb-16"
									InputLabelProps={{
										shrink: true
									}}
									type="number"
									hiddenLabel
									autoFocus
									id="competition_winner_count"
									variant="filled"
									size="large"
								/>
							)}
						/>
					</Grid>
				</Grid>

				<Grid item>
					{t('ACTION_WINNER_BACKUP_COUNT_LABEL')}
					<Grid>
						<Controller
							name="competition_winner_backup_count"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-8 mb-16 ml-16"
									InputLabelProps={{
										shrink: true
									}}
									required
									type="number"
									hiddenLabel
									autoFocus
									id="competition_winner_backup_count"
									variant="filled"
								/>
							)}
						/>
					</Grid>
				</Grid>
			</Grid>

			<br />
			<Divider className="mb-16" light={true} />
			<br />

			<Grid
				container
				direction="row"
				justifyContent="space-around"
				alignItems="left"
				style={{ paddingLeft: 20, paddingRight: 20 }}
			>
				<Grid item>
					
					<Grid>
						<Controller
							name="competition_start_date"
							control={control}
							render={({ field }) => (
								<DateTimePicker
									hiddenLabel
									label={t('ACTION_START_DATE_LABEL')}
									value={competitionStartDate}
									inputFormat="yyyy/MM/dd HH:mm"
									minutesStep={5}
									minDateTime={new Date()}
									ampm={false}
									onChange={handleChangeStartDate}
									renderInput={params => <TextField {...params} variant="filled"/>}
								/>
							)}
						/>
					</Grid>
				</Grid>
				<Grid item>
					
					<Grid>
						<Controller
							name="competition_end_date"
							control={control}
							render={({ field }) => (
								<DateTimePicker
									label={t('ACTION_END_DATE_LABEL')}
									
									value={competitionEndDate}
									inputFormat="yyyy/MM/dd HH:mm"
									minutesStep={5}
									ampm={false}
									minDateTime={
										competitionStartDate.getTime() < competitionEndDate.getTime() &&
										competitionStartDate
									}
									onChange={handleChangeEndDate}
									renderInput={params => <TextField {...params} variant="filled"/>}
								/>
							)}
						/>
					</Grid>
				</Grid>
			</Grid>

			<br />
			<Divider className="mb-16" light={true} />
			<br />

			<Controller
				name="is_competition"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						required
						InputLabelProps={{
							shrink: true
						}}
						select
						onChange={event => {
							returnedIsCompetition(true, event.target.value);
						}}
						label={t('ACTION_TYPE_LABEL')}
						id="is_competition"
						variant="filled"
						fullWidth
					>
						<MenuItem value={'0'}>{t('ACTION_TYPE_DRAW_ITEM')}</MenuItem>
						<MenuItem value={'1'}>{t('ACTION_TYPE_COMPETITION_ITEM')}</MenuItem>
					</TextField>
				)}
			/>

			<Typography variant="subtitle1" style={{ textAlign: 'right', fontStyle: 'italic' }} className="mt-16">
				{t('ACTION_ACCEPT_TERMS_TEXT')}
			</Typography>
		</div>
	);
}

export default ConclusionTab;
