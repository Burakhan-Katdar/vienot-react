import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Controller, useFormContext } from 'react-hook-form';
import { TwitterOutlined } from '@ant-design/icons';
import Api from 'app/fuse-configs/Api';
import { useTranslation } from 'react-i18next';
const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary
}));
function ConditionsTab(props) {
	const { t } = useTranslation('actionsApp');
	const { competition_conditions, returnConditions } = props;
	const methods = useFormContext();
	const { control } = methods;
	const [values, setValues] = React.useState([]);
	React.useEffect(() => {
		returnConditions(true, values);
	}, [values]);
	const [conditions, setConditions] = React.useState([]);
	React.useEffect(() => {
		Api.getConditions().then(response => {
			setConditions(response.data.data);
		});
		setValues(competition_conditions);
	}, []);
	const addValue = () => {
		setValues([
			...values,
			{
				condition_id: '',
				competition_condition_value: '',
				condition_placeholder: '',
				condition_placeholder_en: ''
			}
		]);
	};
	const handleValueChange = (index, e, change_type) => {
		let updatedValues = [];
		if (change_type === 'text_change') {
			updatedValues = values.map((value, i) => {
				if (i === index) {
					return {
						condition_id: value.condition_id,
						competition_condition_value: e.target.value,
						condition_placeholder: value.condition_placeholder,
						condition_placeholder_en: value.condition_placeholder_en
					};
				} else {
					return value;
				}
			});
		} else {
			updatedValues = values.map((value, i) => {
				if (i === index) {
					return {
						condition_id: e.target.value,
						competition_condition_value: value.condition_value,
						condition_placeholder: conditions.find(item => item.id === parseInt(e.target.value))
							.condition_placeholder,
						condition_placeholder_en: conditions.find(item => item.id === parseInt(e.target.value))
							.condition_placeholder_en
					};
				} else {
					return value;
				}
			});
		}
		setValues(updatedValues);
	};
	const deleteValue = jump => {
		setValues(values.filter(j => j !== jump));
	};
	return (
		<div>
			<Controller
				name="competition_tweet_link"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						InputLabelProps={{
							shrink: true
						}}
						id="competition_tweet_link"
						label={t('ACTION_TWEET_INPUT')}
						type="text"
						variant="outlined"
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<TwitterOutlined style={{ fontSize: 25, color: '#1DA1F2' }} />
								</InputAdornment>
							)
						}}
					/>
				)}
			/>

			<Grid className={'mb-16'} container spacing={2}>
				<Grid item xs={12}>
					<Item>
						{values.map((jump, index) => (
							<Box key={'jump' + index}>
								<Grid container spacing={1} alignItems="flex-end">
									<Grid item xs={5}>
										<TextField
											autoFocus
											margin="dense"
											select
											InputLabelProps={{
												shrink: true
											}}
											fullWidth
											value={jump.condition_id || ''}
											onChange={e => handleValueChange(index, e, 'condition_change')}
											label={t('ACTION_CONDITION_LABEL')}
											variant="outlined"
										>
											{conditions.map(condition => (
												<MenuItem value={condition.id}>
													{t('LANGUAGE') === 'EN'
														? condition.condition_name_en
														: condition.condition_name}
												</MenuItem>
											))}
										</TextField>
									</Grid>
									<Grid item xs={5}>
										<TextField
											autoFocus
											InputLabelProps={{
												shrink: true
											}}
											margin="dense"
											label={
												(jump.condition_placeholder &&
													(t('LANGUAGE') === 'EN'
														? jump.condition_placeholder_en
														: jump.condition_placeholder)) ||
												t('ACTION_CONDITION_FIRST_CHOOSE')
											}
											value={jump.competition_condition_value || ''}
											onChange={e => handleValueChange(index, e, 'text_change')}
											fullWidth
										/>
									</Grid>
									<Grid item xs={2} style={{ marginBottom: 10 }}>
										<div className="font-icon-wrapper" onClick={() => deleteValue(jump)}>
											<Icon fontSize="large" color="action">
												delete
											</Icon>
										</div>
									</Grid>
								</Grid>
							</Box>
						))}
						<Button onClick={addValue} color="primary">
							{t('ADD_NEW_CONDITION')}
						</Button>
					</Item>
				</Grid>
			</Grid>
		</div>
	);
}

export default ConditionsTab;
