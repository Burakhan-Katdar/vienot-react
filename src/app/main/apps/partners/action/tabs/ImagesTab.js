import React, { useState, useEffect } from 'react';
import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import DefaultURLs from '../../../../../../@fuse/utils/DefaultURLs';
import { Upload, message, Button as AntdButton } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Root = styled('div')(({ theme }) => ({
	'& .productImageFeaturedStar': {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},

	'& .productImageUpload': {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},

	'& .productImageItem': {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& .productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& .productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover .productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));
const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary
}));

function ImagesTab(props) {
	const { t } = useTranslation('actionsApp');
	const {
		competition_photo,
		competition_state,
		competition_second_photo,
		competition_third_photo,
		competition_video,
		returnedCompetitionPhoto,
		returnedSecondCompetitionPhoto,
		returnedThirdCompetitionPhoto
	} = props;
	const [competitionPhoto, setCompetitionPhoto] = useState(competition_photo);
	const [competitionSecondPhoto, setCompetitionSecondPhoto] = useState(competition_second_photo);
	const [competitionThirdPhoto, setCompetitionThirdPhoto] = useState(competition_third_photo);
	const user = useSelector(({ auth }) => auth.user);
	useEffect(() => {
		returnedCompetitionPhoto(true, competitionPhoto);
	}, [competitionPhoto]);
	useEffect(() => {
		returnedSecondCompetitionPhoto(true, competitionSecondPhoto);
	}, [competitionSecondPhoto]);
	useEffect(() => {
		returnedThirdCompetitionPhoto(true, competitionThirdPhoto);
	}, [competitionThirdPhoto]);
	const methods = useFormContext();
	const { control } = methods;
	return (
		<Root>
			<Grid container>
				<Grid item xs={6}>
					<Grid container>
						<Item>
							<Grid container spacing={2}>
								<Grid item xs={4}>
									<Upload
										name="photo"
										action={DefaultURLs.apiBasePointURL + "competitions/add-competition-photo"}
										onChange={info => {
											if (info.file.status !== 'uploading') {
												// console.log(info.file, info.fileList);
											}
											if (info.file.status === 'done') {
												setCompetitionPhoto(info.file.response.data);
											} else if (info.file.status === 'error') {
												message.error(`${info.file.name} ${t('FILE_UPLOAD_ERROR')}`);
											}
										}}
									>
										<AntdButton
											disabled={
												competition_state !== undefined || user.data.displayName === 'John Doe'
											}
											icon={<UploadOutlined />}
										>
											{t('UPLOAD_COVER_PHOTO')}
										</AntdButton>
									</Upload>
								</Grid>
								<Grid item xs={6}>
									{competitionPhoto && (
										<div className={'h-128'}>
											<img
												className="h-128"
												src={DefaultURLs.uploadEventServerURL + competitionPhoto}
												alt="competition_photo"
											/>
										</div>
									)}
								</Grid>

								<Grid item xs={4}>
									<Upload
										name="photo"
										action={DefaultURLs.apiBasePointURL + "competitions/add-competition-photo"}
										onChange={info => {
											if (info.file.status !== 'uploading') {
												// console.log(info.file, info.fileList);
											}
											if (info.file.status === 'done') {
												setCompetitionSecondPhoto(info.file.response.data);
											} else if (info.file.status === 'error') {
												message.error(`${info.file.name} ${t('FILE_UPLOAD_ERROR')}`);
											}
										}}
									>
										<AntdButton
											disabled={
												competition_state !== undefined || user.data.displayName === 'John Doe'
											}
											icon={<UploadOutlined />}
										>
											{t('UPLOAD_FIRST_PHOTO')}
										</AntdButton>
									</Upload>
								</Grid>
								<Grid item xs={6}>
									{competitionSecondPhoto && (
										<div className={'h-128'}>
											{/* <Icon className="productImageFeaturedStar">star</Icon> */}
											<img
												className="h-128"
												src={DefaultURLs.uploadEventPhotoServerURL + competitionSecondPhoto}
												alt="competition_second_photo"
											/>
										</div>
									)}
								</Grid>

								<Grid item xs={4}>
									<Upload
										name="photo"
										action={DefaultURLs.apiBasePointURL + "competitions/add-competition-photo"}
										onChange={info => {
											if (info.file.status !== 'uploading') {
												// console.log(info.file, info.fileList);
											}
											if (info.file.status === 'done') {
												setCompetitionThirdPhoto(info.file.response.data);
											} else if (info.file.status === 'error') {
												message.error(`${info.file.name} ${t('FILE_UPLOAD_ERROR')}`);
											}
										}}
									>
										<AntdButton
											disabled={
												competition_state !== undefined || user.data.displayName === 'John Doe'
											}
											icon={<UploadOutlined />}
										>
											{t('UPLOAD_SECOND_PHOTO')}
										</AntdButton>
									</Upload>
								</Grid>
								<Grid item xs={6}>
									{competitionThirdPhoto && (
										<div className={'h-128'}>
											{/* <Icon className="productImageFeaturedStar">star</Icon> */}
											<img
												className="h-128"
												src={DefaultURLs.uploadEventPhotoServerURL + competitionThirdPhoto}
												alt="competition_third_photo"
											/>
										</div>
									)}
								</Grid>

								<Grid item xs={12}>
									<Controller
										name="competition_video"
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												className="mt-8 mb-16"
												InputLabelProps={{
													shrink: true
												}}
												value={competition_video}
												label={t('ACTION_VIDEO_INPUT')}
												autoFocus
												id="competition_video"
												variant="outlined"
												fullWidth
											/>
										)}
									/>
								</Grid>
							</Grid>
						</Item>
					</Grid>
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={5}>
					<Item>
						<img
							className="max-w-none w-400 h-270 items-center justify-center rounded-16"
							// style={{ marginLeft: 50 }}
							src="https://wallpaperaccess.com/full/4155459.png"
							alt="default_photo"
						/>
						<span className="text-center">{t('ACTION_EXAMPLE_IMAGE_DESC_1')}</span>
						<span className="text-center">{t('ACTION_EXAMPLE_IMAGE_DESC_2')}</span>
					</Item>
				</Grid>
			</Grid>
		</Root>
	);
}

export default ImagesTab;
