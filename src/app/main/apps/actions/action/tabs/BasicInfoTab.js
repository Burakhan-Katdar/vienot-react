import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

function BasicInfoTab(props) {
	const { t } = useTranslation('actionsApp');
	const methods = useFormContext();
	const { control, formState } = methods;

	return (
		<div>
			<Grid direction="column" justifyContent="center" alignItems="center">
				<Grid item>
					{t('NAME_INPUT')}
					<Controller
						name="competition_name"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mt-8 mb-16"
								InputLabelProps={{
									shrink: true
								}}
								required
								autoFocus
								color="success"
								id="competition_name"
								hiddenLabel
								variant="filled"
								fullWidth
							/>
						)}
					/>
				</Grid>
				<Grid item>
					{t('DESCRIPTION_INPUT')}
					<Controller
						name="competition_description"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mt-8 mb-16"
								InputLabelProps={{
									shrink: true
								}}
								id="competition_description"
								hiddenLabel
								type="text"
								required
								multiline
								rows={5}
								variant="filled"
								fullWidth
								inputProps={{
									maxlength: 2048
								}}
							/>
						)}
					/>
				</Grid>
				<Grid item>
					{t('IS_PAID_INPUT')}
					<Controller
						name="competition_is_paid"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mt-8 mb-16"
								id="competition_is_paid"
								hiddenLabel
								select
								value={0}
								disabled={true}
								variant="filled"
								fullWidth
							>
								<MenuItem value={1}>{t('YES')}</MenuItem>
								<MenuItem value={0}>{t('NO')}</MenuItem>
							</TextField>
						)}
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export default BasicInfoTab;
