import * as React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Controller, useFormContext } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

function ConclusionTab(props) {
	const { t } = useTranslation('actionsApp');
	const { competition_end_date, returnedEndDate, returnedIsCompetition, competition_start_date, returnedStartDate } =
		props;
	const [value, setValue] = React.useState(new Date(competition_end_date.replace(' ', 'T')));
	const [competitionStartDate, setCompetitionStartDate] = React.useState(
		new Date(competition_start_date.replace(' ', 'T'))
	);
	const methods = useFormContext();
	const { control } = methods;
	const handleChange = newValue => {
		if (newValue.getTime() <= competitionStartDate.getTime()) {
			setCompetitionStartDate(new Date(newValue.getTime() - 5 * 60000));
		}
		returnedEndDate(true, newValue);
		setValue(newValue);
	};

	const handleChangeStartDate = newValue => {
		if (newValue.getTime() >= value.getTime()) {
			setValue(new Date(newValue.getTime() + 5 * 60000));
		}
		returnedStartDate(true, newValue);
		setCompetitionStartDate(newValue);
	};

	return (
		<div>
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
						label={t('ACTION_WINNER_COUNT_LABEL')}
						autoFocus
						id="competition_winner_count"
						variant="outlined"
					/>
				)}
			/>

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
						label={t('ACTION_WINNER_BACKUP_COUNT_LABEL')}
						autoFocus
						id="competition_winner_backup_count"
						variant="outlined"
					/>
				)}
			/>

			<Divider className="mb-16" light={true} />

			<Controller
				name="competition_start_date"
				control={control}
				render={({ field }) => (
					<DateTimePicker
						label={t('ACTION_START_DATE_LABEL')}
						value={competitionStartDate}
						inputFormat="yyyy/MM/dd HH:mm"
						minutesStep={5}
						minDateTime={new Date()}
						ampm={false}
						onChange={handleChangeStartDate}
						renderInput={params => <TextField {...params} />}
					/>
				)}
			/>

			<Controller
				name="competition_end_date"
				control={control}
				render={({ field }) => (
					<DateTimePicker
						label={t('ACTION_END_DATE_LABEL')}
						value={value}
						inputFormat="yyyy/MM/dd HH:mm"
						minutesStep={5}
						ampm={false}
						minDateTime={competitionStartDate.getTime() < value.getTime() && competitionStartDate}
						onChange={handleChange}
						renderInput={params => <TextField {...params} />}
					/>
				)}
			/>

			<Divider className="mb-16" light={true} />

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
						variant="outlined"
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
