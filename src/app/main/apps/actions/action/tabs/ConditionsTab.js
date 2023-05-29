import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { Controller, useFormContext } from 'react-hook-form';
import { TwitterOutlined } from '@ant-design/icons';
import Api from 'app/fuse-configs/Api';
import { useTranslation } from 'react-i18next';
import { Button as ButtonAntd } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary
}));

function ConditionsTab(props) {
	const { t } = useTranslation('actionsApp');
	const {
		competition_conditions,
		returnConditions,
		returnCheckedTwitterOption,
		primaryTweetShow,
		returnedConditions
	} = props;
	const methods = useFormContext();
	const { control } = methods;
	const [values, setValues] = React.useState([]);
	const [checkedTwitterOption, setCheckedTwitterOption] = React.useState(false);
	const [allowedPartnerConditions, setAllowedPartnerConditions] = React.useState([]);
	const [conditionLimitForMyCompany, setConditionLimitForMyCompany] = React.useState();

	//Sosyal Medya useState
	const [vienotOptions, setVienotOptions] = React.useState([]);
	const [twitterOptions, setTwitterOptions] = React.useState([]);
	const [youtubeOptions, setYoutubeOptions] = React.useState([]);
	const [discordOptions, setDiscordOptions] = React.useState([]);

	//Kontrol useState
	const [checkedVienotConditionOption, setCheckedVienotConditionOption] = React.useState();
	const [checkedTwitterConditionOption, setCheckedTwitterConditionOption] = React.useState();
	const [checkedYoutubeConditionOption, setCheckedYoutubeConditionOption] = React.useState();
	const [checkedDiscordConditionOption, setCheckedDiscordConditionOption] = React.useState();
	const [isCheckedCheckButtons, setIsCheckedCheckButtons] = React.useState(false);

	//Fianl Şartların Bulunduğu Stateler
	const [vienotValues, setVienotValues] = React.useState([]);
	const [twitterValues, setTwitterValues] = React.useState([]);
	const [youtubeValues, setYoutubeValues] = React.useState([]);
	const [discordValues, setDiscordValues] = React.useState([]);

	const routeParams = useParams();

	//Discord ve Vienot entegre ediliyor
	const discordIcon = require('./images/discord_120px.png');
	const vienotIcon = require('./images/amblem2.png');
	const twitterStep = {
		type: 'twitter',
		content: checkedTwitterConditionOption && (
			<>
				{/* <Grid container>
					<TwitterIcon style={{ color: '#1D9AF1', fontSize: 60, marginLeft: '45%' }} />
				</Grid> */}
				<TwitterIcon style={{ fontSize: 40, color: '#1DA1F2' }} />
				<Grid container direction={'row'} spacing={5} style={{ paddingLeft: 15, paddingRight: 15 }}>
					<Grid item xs={6}>
						<Checkbox
							onChange={event => setCheckedTwitterOption(event.target.checked)}
							value={checkedTwitterOption}
							sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
						/>

						{t('ACTION_SHARE_OPTION')}
					</Grid>

					<Grid item xs={6} >
						<Controller
							name="competition_tweet_link"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-8 mb-16"
									style={
										checkedTwitterOption === true && primaryTweetShow === false
											? { display: 'none' }
											: null
									}
									InputLabelProps={{
										shrink: true
									}}
									id="competition_tweet_link"
									label={t('ACTION_TWEET_INPUT')}
									type="text"
									variant="filled"
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
					</Grid>
				</Grid>
				<br />
				<Grid
					item
					xs={12}
					container
					spacing={2}
					style={checkedTwitterConditionOption === false ? { display: 'none' } : null}
				>
					<Grid item xs={12}>
						<Item>
							{twitterValues.map((jump, index) => (
								<Box key={'jump' + index}>
									<Grid container spacing={3} alignItems="flex-end">
										<Grid item xs={5}>
											{t('ACTION_CONDITION_LABEL')}
											<TextField
												autoFocus
												margin="dense"
												select
												InputLabelProps={{
													shrink: true
												}}
												fullWidth
												value={jump.condition_id || ''}
												onChange={e =>
													handleValueChange(index, e, 'condition_change', 'twitter')
												}
												hiddenLabel
												variant="filled"
											>
												{twitterOptions.map(condition => (
													<MenuItem
														disabled={
															allowedPartnerConditions.find(
																item => item.condition_id === condition.id
															) === undefined
														}
														value={condition.id}
													>
														{t('LANGUAGE') === 'EN'
															? condition.condition_name_en
															: condition.condition_name}
													</MenuItem>
												))}
											</TextField>
										</Grid>
										<Grid item xs={6}>
											{(jump.condition_placeholder &&
												(t('LANGUAGE') === 'EN'
													? jump.condition_placeholder_en
													: jump.condition_placeholder)) ||
												t('ACTION_CONDITION_FIRST_CHOOSE')}
											<TextField
												autoFocus
												InputLabelProps={{
													shrink: true
												}}
												margin="dense"
												hiddenLabel
												value={jump.competition_condition_value || ''}
												onChange={e =>
													handleValueChange(index, e, 'text_change', 'twitter', 'twitter')
												}
												fullWidth
												variant="filled"
											/>
										</Grid>
										<Grid item xs={1} style={{ marginBottom: 10 }}>
											<div
												className="font-icon-wrapper"
												onClick={() => deleteValue(jump, 'twitter')}
											>
												<Icon fontSize="large" color="action">
													delete
												</Icon>
											</div>
										</Grid>
									</Grid>
								</Box>
							))}
							{conditionLimitForMyCompany && (

								<Button
									disabled={conditionLimitForMyCompany <= values.length}
									onClick={() => addValue('twitter')}
									color="primary"
								>
									<TwitterIcon /> {t('ADD_NEW_CONDITION')}
								</Button>
							)}
						</Item>
					</Grid>
				</Grid>
			</>
		)
	}

	const youtubeStep = {
		type: 'youtube',
		content: checkedYoutubeConditionOption && (
			<Grid
				item
				xs={12}
				container
				spacing={2}
				style={checkedYoutubeConditionOption === false ? { display: 'none' } : null}
			>

				<Grid item xs={12}>
					{/* <Grid container>
						<YouTubeIcon style={{ color: '#FF0000', fontSize: 60, marginLeft: '45%' }} />
					</Grid> */}
					<YouTubeIcon style={{ color: 'ff0000', fontSize: 40 }} />
					<Item>
						{youtubeValues.map((jump, index) => (
							<Box key={'jump' + index}>
								<Grid container spacing={3} alignItems="flex-end">
									<Grid item xs={5}>
										{t('ACTION_CONDITION_LABEL')}
										<TextField
											autoFocus
											margin="dense"
											select
											InputLabelProps={{
												shrink: true
											}}
											fullWidth
											value={jump.condition_id || ''}
											onChange={e =>
												handleValueChange(index, e, 'condition_change', 'youtube')
											}
											hiddenLabel
											variant="filled"
										>
											{youtubeOptions.map(condition => (
												<MenuItem
													disabled={
														allowedPartnerConditions.find(
															item => item.condition_id === condition.id
														) === undefined
													}
													value={condition.id}
												>
													{t('LANGUAGE') === 'EN'
														? condition.condition_name_en
														: condition.condition_name}
												</MenuItem>
											))}
										</TextField>
									</Grid>
									<Grid item xs={6}>
										{(jump.condition_placeholder &&
											(t('LANGUAGE') === 'EN'
												? jump.condition_placeholder_en
												: jump.condition_placeholder)) ||
											t('ACTION_CONDITION_FIRST_CHOOSE')}
										<TextField
											autoFocus
											InputLabelProps={{
												shrink: true
											}}
											margin="dense"
											hiddenLabel
											value={jump.competition_condition_value || ''}
											onChange={e => handleValueChange(index, e, 'text_change', 'youtube')}
											fullWidth
											variant="filled"
										/>
									</Grid>
									<Grid item xs={1} style={{ marginBottom: 10 }}>
										<div
											className="font-icon-wrapper"
											onClick={() => deleteValue(jump, 'youtube')}
										>
											<Icon fontSize="large" color="action">
												delete
											</Icon>
										</div>
									</Grid>
								</Grid>
							</Box>
						))}
						{conditionLimitForMyCompany && (
							<Button
								disabled={conditionLimitForMyCompany <= values.length}
								onClick={() => addValue('youtube')}
								color="primary"
							>
								<YouTubeIcon style={{ color: 'ff0000', fontSize: 30 }} />	{t('ADD_NEW_CONDITION')}
							</Button>
						)}
					</Item>
				</Grid>
			</Grid>
		)
	}

	const discordStep = {
		type: 'discord',
		content: checkedDiscordConditionOption && (
			<Grid
				item
				xs={12}
				container
				spacing={2}
				style={checkedDiscordConditionOption === false ? { display: 'none' } : null}
			>
				<Grid item xs={12}>
					{/* <Grid
						style={{
							backgroundImage: `url(${discordBackgroundImage})`,
							height: '40px',
							backgroundSize: 'contain',

							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center'
						}}
					></Grid> */}
					<img src={`${discordIcon}`} style={{ width: '5%' }}></img>
					<Item>
						{discordValues.map((jump, index) => (
							<Box key={'jump' + index}>
								<Grid container spacing={3} alignItems="flex-end">
									<Grid item xs={5}>
										{t('ACTION_CONDITION_LABEL')}
										<TextField
											autoFocus
											margin="dense"
											select
											InputLabelProps={{
												shrink: true
											}}
											fullWidth
											value={jump.condition_id || ''}
											onChange={e =>
												handleValueChange(index, e, 'condition_change', 'discord')
											}
											hiddenLabel
											variant="filled"
										>
											{discordOptions.map(condition => (
												<MenuItem
													disabled={
														allowedPartnerConditions.find(
															item => item.condition_id === condition.id
														) === undefined
													}
													value={condition.id}
												>
													{t('LANGUAGE') === 'EN'
														? condition.condition_name_en
														: condition.condition_name}
												</MenuItem>
											))}
										</TextField>
									</Grid>
									<Grid item xs={6}>
										{(jump.condition_placeholder &&
											(t('LANGUAGE') === 'EN'
												? jump.condition_placeholder_en
												: jump.condition_placeholder)) ||
											t('ACTION_CONDITION_FIRST_CHOOSE')}
										<TextField
											autoFocus
											InputLabelProps={{
												shrink: true
											}}
											margin="dense"
											hiddenLabel
											value={jump.competition_condition_value || ''}
											onChange={e => handleValueChange(index, e, 'text_change', 'discord')}
											fullWidth
											variant="filled"
										/>
									</Grid>
									<Grid item xs={1} style={{ marginBottom: 10 }}>
										<div
											className="font-icon-wrapper"
											onClick={() => deleteValue(jump, 'discord')}
										>
											<Icon fontSize="large" color="action">
												delete
											</Icon>
										</div>
									</Grid>
								</Grid>
							</Box>
						))}
						{conditionLimitForMyCompany && (
							<Button
								disabled={conditionLimitForMyCompany <= values.length}
								onClick={() => addValue('discord')}
								color="primary"
							>
								<img src={`${discordIcon}`} style={{ width: '15%' }}></img> {t('ADD_NEW_CONDITION')}
							</Button>
						)}
					</Item>
				</Grid>
			</Grid>
		)
	}

	const vienotStep = {
		type: 'vienot',
		content: checkedVienotConditionOption && (
			<Grid
				item
				xs={12}
				container
				spacing={2}
				style={checkedVienotConditionOption === false ? { display: 'none' } : null}
			>
				<Grid item xs={12}>
					{/* <Grid
						style={{
							backgroundImage: `url(${vienotBackgroundImage})`,
							height: '100px',
							backgroundSize: 'contain',

							backgroundRepeat: 'no-repeat',
							backgroundPosition: 'center'
						}}
					></Grid> */}
					<img src={`${vienotIcon}`} style={{ width: '5%' }}></img>
					<Item>
						{vienotValues.map((jump, index) => (
							<Box key={'jump' + index}>
								<Grid
									container
									spacing={3}
									alignItems="flex-end"
									style={{ marginTop: 10, paddingLeft: 10, paddingRight: 10 }}
								>
									<Grid item xs={5} style={{ color: 'black' }}>
										{t('ACTION_CONDITION_LABEL')}
										<TextField
											autoFocus
											margin="dense"
											select
											InputLabelProps={{
												shrink: true,
												color: 'black'
											}}
											inputProps={{ color: 'black' }}
											fullWidth
											value={jump.condition_id || ''}
											onChange={e =>
												handleValueChange(index, e, 'condition_change', 'vienot')
											}
											hiddenLabel
											variant="filled"
										>
											{vienotOptions.map(condition => (
												<MenuItem
													disabled={
														allowedPartnerConditions.find(
															item => item.condition_id === condition.id
														) === undefined
													}
													value={condition.id}
												>
													{t('LANGUAGE') === 'EN'
														? condition.condition_name_en
														: condition.condition_name}
												</MenuItem>
											))}
										</TextField>
									</Grid>
									<Grid item xs={6} style={{ color: 'black' }}>
										{(jump.condition_placeholder &&
											(t('LANGUAGE') === 'EN'
												? jump.condition_placeholder_en
												: jump.condition_placeholder)) ||
											t('ACTION_CONDITION_FIRST_CHOOSE')}
										<TextField
											autoFocus
											InputLabelProps={{
												shrink: true
											}}
											margin="dense"
											hiddenLabel
											inputProps={{ color: 'black' }}
											value={jump.competition_condition_value || ''}
											onChange={e => handleValueChange(index, e, 'text_change', 'vienot')}
											fullWidth
											variant="filled"
										/>
									</Grid>
									<Grid item xs={1} style={{ marginBottom: 10, color: '#757575' }}>
										<div
											className="font-icon-wrapper"
											onClick={() => deleteValue(jump, 'vienot')}
										>
											<Icon fontSize="large" color="black">
												delete
											</Icon>
										</div>
									</Grid>
								</Grid>
							</Box>
						))}
						{conditionLimitForMyCompany && (
							<Button
								disabled={conditionLimitForMyCompany <= values.length}
								onClick={() => addValue('vienot')}
								sx={{ color: 'primary' }}
								style={{ marginTop: 10 }}
							>
								<img src={`${vienotIcon}`} style={{ width: '5%' }}></img>{t('ADD_NEW_CONDITION')}
							</Button>
						)}
					</Item>
				</Grid>
			</Grid>
		)
	}

	//STEPS
	const steps = [

		twitterStep,

		youtubeStep,

		discordStep,

		vienotStep
	];

	const [current, setCurrent] = React.useState(0);

	const next = () => {
		setCurrent(current + 1);
	};

	const prev = () => {
		setCurrent(current - 1);
	};

	const onChange = value => {
		setCurrent(value);
	};

	///


	React.useEffect(() => {
		let dataToStorage = {
			competition_id: routeParams.competitionId,
			conditions: returnedConditions
		}
		window.localStorage.setItem('CompConds', JSON.stringify(dataToStorage))
	}, [returnedConditions]);

	React.useEffect(() => {
		setValues([...youtubeValues, ...twitterValues, ...discordValues, ...vienotValues]);
	}, [youtubeValues, twitterValues, discordValues, vienotValues]);
	React.useEffect(() => {
		returnCheckedTwitterOption(true, checkedTwitterOption);
	}, [checkedTwitterOption]);
	React.useEffect(() => {
		returnConditions(true, values);
	}, [values]);
	const [conditions, setConditions] = React.useState([]);
	React.useEffect(() => {
		let storageData = JSON.parse(window.localStorage.getItem('CompConds'))
		if (storageData === null) {
			let dataToStorage = {
				competition_id: routeParams.competitionId,
				conditions: returnedConditions
			}
			window.localStorage.setItem('CompConds', JSON.stringify(dataToStorage))
		} else {
			if (storageData.competition_id !== routeParams.competitionId) {
				let dataToStorage = {
					competition_id: routeParams.competitionId,
					conditions: returnedConditions
				}
				window.localStorage.setItem('CompConds', JSON.stringify(dataToStorage))
			}
		}
		if (!isCheckedCheckButtons) {
			Api.getConditions().then(response => {
				setConditions(response.data.data);

				let vienotOptionsArray = response.data.data.filter(option => option.social_media_id == 1);
				setVienotOptions(vienotOptionsArray);

				let twitterOptionsArray = response.data.data.filter(option => option.social_media_id == 2);
				setTwitterOptions(twitterOptionsArray);

				let youtubeOptionsArray = response.data.data.filter(option => option.social_media_id == 4);
				setYoutubeOptions(youtubeOptionsArray);

				let discordOptionsArray = response.data.data.filter(option => option.social_media_id == 5);
				setDiscordOptions(discordOptionsArray);
			});
			Api.getAllowedConditionsForMyCompany()
				.then(response => {
					setAllowedPartnerConditions(response.data.data);
				})
				.catch(err => console.log(err.response.request));
			Api.getConditionLimitForMyCompany()
				.then(response => {
					setConditionLimitForMyCompany(response.data.data);
				})
				.catch(err => console.log(err.response.request));
			if (competition_conditions) {
				let vienotData = competition_conditions.filter(item => item.social_media_id == 1);
				let twitterData = competition_conditions.filter(item => item.social_media_id == 2);
				let youtubeData = competition_conditions.filter(item => item.social_media_id == 4);
				let discordData = competition_conditions.filter(item => item.social_media_id == 5);
				if (vienotData.length > 0) {
					setCheckedVienotConditionOption(true);
					setVienotValues(vienotData);
				} else {
					setCheckedVienotConditionOption(false);
				}

				if (twitterData.length > 0) {
					setCheckedTwitterConditionOption(true);
					setTwitterValues(twitterData);
				} else {
					setCheckedTwitterConditionOption(false);
				}

				if (youtubeData.length > 0) {
					setCheckedYoutubeConditionOption(true);
					setYoutubeValues(youtubeData);
				} else {
					setCheckedYoutubeConditionOption(false);
				}

				if (discordData.length > 0) {
					setCheckedDiscordConditionOption(true);
					setDiscordValues(discordData);
				} else {
					setCheckedDiscordConditionOption(false);
				}
			}
			if (storageData.competition_id !== 'new') {
				setValues(competition_conditions);
			} else {
				let vienotValuesArray = [];
				let twitterValuesArray = [];
				let youtubeValuesArray = [];
				let discordValuesArray = [];
				if (storageData.conditions !== undefined) {
					storageData.conditions.map((condition) => {
						if (condition.social_media_id === 1) {
							vienotValuesArray.push(condition)
						}
						else if (condition.social_media_id === 2) {
							twitterValuesArray.push(condition)
						}
						else if (condition.social_media_id === 4) {
							youtubeValuesArray.push(condition)
						}
						else if (condition.social_media_id === 5) {
							discordValuesArray.push(condition)
						}
					})
					if (vienotValuesArray.length + twitterValuesArray.length
						+ youtubeValuesArray.length + discordValuesArray.length > 0) {
						setIsCheckedCheckButtons(true)
					}
					if (vienotValuesArray.length > 0) {
						setCheckedVienotConditionOption(true)
					}
					if (twitterValuesArray.length > 0) {
						setCheckedTwitterConditionOption(true)
					}
					if (youtubeValuesArray.length > 0) {
						setCheckedYoutubeConditionOption(true)
					}
					if (discordValuesArray.length > 0) {
						setCheckedDiscordConditionOption(true)
					}
				}
				setVienotValues(vienotValuesArray)
				setTwitterValues(twitterValuesArray)
				setYoutubeValues(youtubeValuesArray)
				setDiscordValues(discordValuesArray)
				setValues(storageData.conditions);
			}
		}
	}, []);

	React.useEffect(() => {
		if (checkedTwitterConditionOption == true) {
			// steps.push(twitterStep)
			setCheckedTwitterConditionOption(true)
			setCurrent(0)
		}
		if (checkedYoutubeConditionOption == true) {
			// steps.push(youtubeStep)
			setCheckedYoutubeConditionOption(true)
			setCurrent(1)
		}
		if (checkedDiscordConditionOption == true) {
			// steps.push(discordStep)
			setCheckedDiscordConditionOption(true)
			setCurrent(2)
		}
		if (checkedVienotConditionOption == true) {
			// steps.push(vienotStep)
			setCheckedVienotConditionOption(true)
			setCurrent(3)
		}
		if (
			checkedTwitterConditionOption == true ||
			checkedYoutubeConditionOption == true ||
			checkedDiscordConditionOption == true ||
			checkedVienotConditionOption == true
		) {
			setIsCheckedCheckButtons(true);
		} else if (
			checkedTwitterConditionOption == false ||
			checkedYoutubeConditionOption == false ||
			checkedDiscordConditionOption == false ||
			checkedVienotConditionOption == false
		) {
			setIsCheckedCheckButtons(false);
		}
	}, [checkedTwitterConditionOption, checkedYoutubeConditionOption,
		checkedDiscordConditionOption, checkedVienotConditionOption]);

	const addValue = type => {
		if (type == 'twitter') {
			setTwitterValues([
				...twitterValues,
				{
					condition_id: '',
					competition_condition_value: '',
					condition_placeholder: '',
					condition_placeholder_en: '',
					must_fill: 0,
					social_media_id: 2
				}
			]);
		} else if (type == 'youtube') {
			setYoutubeValues([
				...youtubeValues,
				{
					condition_id: '',
					competition_condition_value: '',
					condition_placeholder: '',
					condition_placeholder_en: '',
					must_fill: 0,
					social_media_id: 4
				}
			]);
		} else if (type == 'discord') {
			setDiscordValues([
				...discordValues,
				{
					condition_id: '',
					competition_condition_value: '',
					condition_placeholder: '',
					condition_placeholder_en: '',
					must_fill: 0,
					social_media_id: 5
				}
			]);
		} else if (type == 'vienot') {
			setVienotValues([
				...vienotValues,
				{
					condition_id: '',
					competition_condition_value: '',
					condition_placeholder: '',
					condition_placeholder_en: '',
					must_fill: 0,
					social_media_id: 1
				}
			]);
		}
	};
	const handleValueChange = (index, e, change_type, type) => {
		let updatedValues = [];
		if (type == 'twitter') {
			if (change_type === 'text_change') {
				updatedValues = twitterValues.map((value, i) => {
					if (i === index) {
						return {
							condition_id: value.condition_id,
							competition_condition_value: e.target.value,
							condition_placeholder: value.condition_placeholder,
							condition_placeholder_en: value.condition_placeholder_en,
							must_fill: value.must_fill,
							social_media_id: 2
						};
					} else {
						return value;
					}
				});
			} else {
				updatedValues = twitterValues.map((value, i) => {
					if (i === index) {
						return {
							condition_id: e.target.value,
							competition_condition_value: value.condition_value,
							condition_placeholder: conditions.find(item => item.id === parseInt(e.target.value))
								.condition_placeholder,
							condition_placeholder_en: conditions.find(item => item.id === parseInt(e.target.value))
								.condition_placeholder_en,
							must_fill: conditions.find(item => item.id === parseInt(e.target.value)).must_fill,
							social_media_id: 2
						};
					} else {
						return value;
					}
				});
			}
			setTwitterValues(updatedValues);
		} else if (type == 'youtube') {
			if (change_type === 'text_change') {
				updatedValues = youtubeValues.map((value, i) => {
					if (i === index) {
						return {
							condition_id: value.condition_id,
							competition_condition_value: e.target.value,
							condition_placeholder: value.condition_placeholder,
							condition_placeholder_en: value.condition_placeholder_en,
							must_fill: value.must_fill,
							social_media_id: 4
						};
					} else {
						return value;
					}
				});
			} else {
				updatedValues = youtubeValues.map((value, i) => {
					if (i === index) {
						return {
							condition_id: e.target.value,
							competition_condition_value: value.condition_value,
							condition_placeholder: conditions.find(item => item.id === parseInt(e.target.value))
								.condition_placeholder,
							condition_placeholder_en: conditions.find(item => item.id === parseInt(e.target.value))
								.condition_placeholder_en,
							must_fill: conditions.find(item => item.id === parseInt(e.target.value)).must_fill,
							social_media_id: 4
						};
					} else {
						return value;
					}
				});
			}
			setYoutubeValues(updatedValues);
		} else if (type == 'discord') {
			if (change_type === 'text_change') {
				updatedValues = discordValues.map((value, i) => {
					if (i === index) {
						return {
							condition_id: value.condition_id,
							competition_condition_value: e.target.value,
							condition_placeholder: value.condition_placeholder,
							condition_placeholder_en: value.condition_placeholder_en,
							must_fill: value.must_fill,
							social_media_id: 5
						};
					} else {
						return value;
					}
				});
			} else {
				updatedValues = discordValues.map((value, i) => {
					if (i === index) {
						return {
							condition_id: e.target.value,
							competition_condition_value: value.condition_value,
							condition_placeholder: conditions.find(item => item.id === parseInt(e.target.value))
								.condition_placeholder,
							condition_placeholder_en: conditions.find(item => item.id === parseInt(e.target.value))
								.condition_placeholder_en,
							must_fill: conditions.find(item => item.id === parseInt(e.target.value)).must_fill,
							social_media_id: 5
						};
					} else {
						return value;
					}
				});
			}
			setDiscordValues(updatedValues);
		} else if (type == 'vienot') {
			if (change_type === 'text_change') {
				updatedValues = vienotValues.map((value, i) => {
					if (i === index) {
						return {
							condition_id: value.condition_id,
							competition_condition_value: e.target.value,
							condition_placeholder: value.condition_placeholder,
							condition_placeholder_en: value.condition_placeholder_en,
							must_fill: value.must_fill,
							social_media_id: 1
						};
					} else {
						return value;
					}
				});
			} else {
				updatedValues = vienotValues.map((value, i) => {
					if (i === index) {
						return {
							condition_id: e.target.value,
							competition_condition_value: value.condition_value,
							condition_placeholder: conditions.find(item => item.id === parseInt(e.target.value))
								.condition_placeholder,
							condition_placeholder_en: conditions.find(item => item.id === parseInt(e.target.value))
								.condition_placeholder_en,
							must_fill: conditions.find(item => item.id === parseInt(e.target.value)).must_fill,
							social_media_id: 1
						};
					} else {
						return value;
					}
				});
			}
			setVienotValues(updatedValues);
		}
	};
	const deleteValue = (jump, type) => {
		if (type == 'twitter') {
			setTwitterValues(twitterValues.filter(j => j !== jump));
		} else if (type == 'youtube') {
			setYoutubeValues(youtubeValues.filter(j => j !== jump));
		} else if (type == 'discord') {
			setDiscordValues(discordValues.filter(j => j !== jump));
		} else if (type == 'vienot') {
			setVienotValues(vienotValues.filter(j => j !== jump));
		}
	};

	const FindIsDisabledForPrev = (current) => {
		let sayi = current - 1;
		if (sayi == 0) {
			return !checkedTwitterConditionOption;
		}
		else if (sayi == 1) {
			return !checkedYoutubeConditionOption;
		}
		else if (sayi == 2) {
			return !checkedDiscordConditionOption;
		}
		else if (sayi == 3) {
			return !checkedVienotConditionOption;
		}
	}

	const FindIsDisabledForNext = (current) => {
		let sayi = current + 1;
		if (sayi == 0) {
			return !checkedTwitterConditionOption;
		}
		else if (sayi == 1) {
			return !checkedYoutubeConditionOption;
		}
		else if (sayi == 2) {
			return !checkedDiscordConditionOption;
		}
		else if (sayi == 3) {
			return !checkedVienotConditionOption;
		}
	}

	return (
		<div>
			<Grid style={{ fontWeight: 'bold' }}>Bir Etkinliğe Maksimum X adet şart ekleyebilirsiniz. <a href='#'>Daha Fazlası İçin..</a> </Grid>
			<Grid container direction="row" style={{ justifyContent: 'space-between' }}>
				<Grid item>
					<div>
						{checkedTwitterConditionOption !== undefined && (
							<Button
								className="mt-24"
								variant="outlined"
								color="inherit"
								onClick={() => {
									setCheckedTwitterConditionOption(!checkedTwitterConditionOption)
									setCheckedDiscordConditionOption(false)
									setCheckedVienotConditionOption(false)
									setCheckedYoutubeConditionOption(false)
								}}
							>
								{t('I_WILL_ADD_TWITTER_CONDITION')}
							</Button>
						)}
					</div>
				</Grid>
				<Grid item>
					<div>
						{checkedYoutubeConditionOption !== undefined && (
							<Button
								className="mt-24"
								variant="outlined"
								color="inherit"
								onClick={() => {
									setCheckedYoutubeConditionOption(!checkedYoutubeConditionOption)
									setCheckedDiscordConditionOption(false)
									setCheckedVienotConditionOption(false)
									setCheckedTwitterConditionOption(false)
								}}
							>
								{t('I_WILL_ADD_YOUTUBE_CONDITION')}
							</Button>
						)}
					</div>
				</Grid>
				<Grid item>
					<div>
						{checkedDiscordConditionOption !== undefined && (
							<Button
								className="mt-24"
								variant="outlined"
								color="inherit"
								onClick={() => {
									setCheckedDiscordConditionOption(!checkedDiscordConditionOption)
									setCheckedYoutubeConditionOption(false)
									setCheckedVienotConditionOption(false)
									setCheckedTwitterConditionOption(false)
								}}
							>
								{t('I_WILL_ADD_DISCORD_CONDITION')}
							</Button>
						)}

					</div>
				</Grid>
				<Grid item>
					<div>
						{checkedVienotConditionOption !== undefined && (
							<Button
								className="mt-24"
								variant="outlined"
								color="inherit"
								onClick={() => {
									setCheckedVienotConditionOption(!checkedVienotConditionOption)
									setCheckedYoutubeConditionOption(false)
									setCheckedDiscordConditionOption(false)
									setCheckedTwitterConditionOption(false)
								}}
							>
								{t('I_WILL_ADD_VIENOT_CONDITION')}
							</Button>
						)}
					</div>
				</Grid>
			</Grid>
			<Grid>
				{isCheckedCheckButtons == true && (
					<Grid
						spacing={8}
						style={{
							width: '100%',
							height: '100%',
							border: '2px solid #E0E0E0',
							borderRadius: '50px',
							marginTop: 30,
							marginLeft: 20,
							padding: 30
						}}
					>
						<Grid container direction={'row'} style={{ justifyContent: 'space-between' }}>
							{/* {current >= 0 ?
								<>
									<Grid>
										<div className="steps-action">
											{current > 0 && (
												<ButtonAntd
													shape="round"
													disabled={FindIsDisabledForPrev(current)}
													icon={<LeftOutlined />}
													style={{
														margin: '0 0'
													}}
													onClick={() => prev()}
												></ButtonAntd>
											)}
										</div>
									</Grid>

									<Grid>
										<div className="steps-action">
											{current < steps.length - 1 && (
												<ButtonAntd
													shape="round"
													disabled={FindIsDisabledForNext(current)}
													icon={<RightOutlined />}
													type="primary"
													onClick={() => next()}
												></ButtonAntd>
											)}
										</div>
									</Grid>
								</>
								: null
							} */}


						</Grid>
						<div className="steps-content">{steps[current].content}</div>
					</Grid>
				)}
			</Grid>
		</div>
	);
}

export default ConditionsTab;
