import React, { useState, useEffect } from 'react';
import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import DefaultURLs from '../../../../../../@fuse/utils/DefaultURLs';
import { Upload, message, Button as AntdButton, Modal } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Api from 'app/fuse-configs/Api';
import { useParams } from 'react-router';

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
	const routeParams = useParams();
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
	// const [competitionPhotoFileList, setCompetitionPhotoFileList] = useState([
	// 	(competitionPhoto !== null &&
	// 	{
	// 		uid: '-1',
	// 		name: competitionPhoto,
	// 		status: 'done',
	// 		url: DefaultURLs.uploadServerURL + competitionPhoto,
	// 	}
	// 	)
	// ]);
	const user = useSelector(({ auth }) => auth.user);
	const [previewImage, setPreviewImage] = useState('');
	const [previewVisible, setPreviewVisible] = useState(false);
	const [previewTitle, setPreviewTitle] = useState('');
	const beforeUploadChecks = (file, fileList, type) => {
		const isAllowedFileSize = file.size < 1000000;
		const isAllowedFileType = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg';
		if (!isAllowedFileType) {
			message.error(t('UPLOAD_FILE_TYPE_ERROR'));
		} else {
			if (!isAllowedFileSize) {
				message.error(t('UPLOAD_FILE_SIZE_ERROR'));
			}
		}
		if (isAllowedFileType && isAllowedFileSize) {
			if (type === 'competition_photo') {
				if (competitionPhoto) {
					Api.deleteAPhoto(competitionPhoto, 'temp');
				}
			} else if (type === 'competition_second_photo') {
				if (competitionSecondPhoto) {
					Api.deleteAPhoto(competitionSecondPhoto, 'temp');
				}
			} else if (type === 'competition_third_photo') {
				if (competitionThirdPhoto) {
					Api.deleteAPhoto(competitionThirdPhoto, 'temp');
				}
			}
		}
		return (isAllowedFileType && isAllowedFileSize) || Upload.LIST_IGNORE;
	};
	useEffect(() => {
		returnedCompetitionPhoto(true, competitionPhoto);
	}, [competitionPhoto]);
	useEffect(() => {
		returnedSecondCompetitionPhoto(true, competitionSecondPhoto);
	}, [competitionSecondPhoto]);
	useEffect(() => {
		returnedThirdCompetitionPhoto(true, competitionThirdPhoto);
	}, [competitionThirdPhoto]);
	function getBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	}
	const handlePreviewPhoto = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewVisible(true);
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
	};
	const methods = useFormContext();
	const { control } = methods;
	return (
		<Root>
			<Modal
				visible={previewVisible}
				title={previewTitle}
				footer={null}
				onCancel={() => setPreviewVisible(false)}
			>
				<img alt="example" style={{ width: '100%' }} src={previewImage} />
			</Modal>
			<Grid container>
				<Grid item xs={6} direction="row" container>
					<Grid item md={routeParams.competitionId !== 'new' && competitionPhoto !== null ? 4 : 12}>
						<Upload
							name="photo"
							action={DefaultURLs.apiBasePointURL + 'competitions/add-competition-photo'}
							accept=".png,.jpg,.jpeg"
							beforeUpload={(file, fileList) => beforeUploadChecks(file, fileList, 'competition_photo')}
							maxCount={1}
							onRemove={info => {
								Api.deleteAPhoto(info.response.data, 'temp');
								message.success(t('FILE_DELETE_SUCCESS'));
								setCompetitionPhoto('');
							}}
							listType="picture-card"
							onPreview={handlePreviewPhoto}
							disabled={competition_state !== undefined || user.data.displayName === 'John Doe'}
							onChange={info => {
								if (info.file.status !== 'uploading') {
									// console.log('uploading: ', info);
								}
								if (info.file.status === 'done') {
									setCompetitionPhoto(info.file.response.data);
								} else if (info.file.status === 'error') {
									message.error(`${info.file.name} ${t('FILE_UPLOAD_ERROR')}`);
								}
							}}
						>
							<div>
								<PlusOutlined />
								<div style={{ marginTop: 8 }}>{t('UPLOAD_COVER_PHOTO')}</div>
							</div>
						</Upload>
					</Grid>

					{routeParams.competitionId !== 'new' && competitionPhoto !== null && (
						<Grid item md={2}>
							<div className={'h-128'}>
								<img
									className="h-128"
									src={DefaultURLs.uploadEventPhotoServerURL + competitionPhoto}
									alt="competition_photo"
								/>
							</div>
						</Grid>
					)}

					{competitionPhoto && (
						<Grid item md={routeParams.competitionId !== 'new' && competitionSecondPhoto !== null ? 4 : 12}>
							<Upload
								name="photo"
								action={DefaultURLs.apiBasePointURL + 'competitions/add-competition-photo'}
								accept=".png,.jpg,.jpeg"
								beforeUpload={(file, fileList) =>
									beforeUploadChecks(file, fileList, 'competition_second_photo')
								}
								maxCount={1}
								onRemove={info => {
									Api.deleteAPhoto(info.response.data, 'temp');
									message.success(t('FILE_DELETE_SUCCESS'));
									setCompetitionSecondPhoto('');
								}}
								listType="picture-card"
								onPreview={handlePreviewPhoto}
								disabled={competition_state !== undefined || user.data.displayName === 'John Doe'}
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
								<div>
									<PlusOutlined />
									<div style={{ marginTop: 8 }}>{t('UPLOAD_FIRST_PHOTO')}</div>
								</div>
							</Upload>
						</Grid>
					)}

					{routeParams.competitionId !== 'new' && competitionSecondPhoto !== null && (
						<Grid item md={12}>
							<div className={'h-128'}>
								<img
									className="h-128"
									src={DefaultURLs.uploadEventPhotoServerURL + competitionSecondPhoto}
									alt="competition_second_photo"
								/>
							</div>
						</Grid>
					)}

					{competitionPhoto && competitionSecondPhoto && (
						<Grid item md={routeParams.competitionId !== 'new' && competitionThirdPhoto !== null ? 4 : 12}>
							<Upload
								name="photo"
								action={DefaultURLs.apiBasePointURL + 'competitions/add-competition-photo'}
								accept=".png,.jpg,.jpeg"
								beforeUpload={(file, fileList) =>
									beforeUploadChecks(file, fileList, 'competition_third_photo')
								}
								maxCount={1}
								onRemove={info => {
									Api.deleteAPhoto(info.response.data, 'temp');
									message.success(t('FILE_DELETE_SUCCESS'));
									setCompetitionThirdPhoto('');
								}}
								listType="picture-card"
								onPreview={handlePreviewPhoto}
								disabled={competition_state !== undefined || user.data.displayName === 'John Doe'}
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
								style={{ display: 'inline' }}
							>
								<div>
									<PlusOutlined />
									<div style={{ marginTop: 8 }}>{t('UPLOAD_SECOND_PHOTO')}</div>
								</div>
							</Upload>
						</Grid>
					)}

					{routeParams.competitionId !== 'new' && competitionThirdPhoto !== null && (
						<Grid item md={12}>
							<div className={'h-128'}>
								<img
									className="h-128"
									src={DefaultURLs.uploadEventPhotoServerURL + competitionThirdPhoto}
									alt="competition_third_photo"
								/>
							</div>
						</Grid>
					)}

					<Grid item md={12} style={{ display: '' }}>
						{t('ACTION_VIDEO_INPUT')}
						<Controller
							name="competition_video"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mt-16 mb-16"
									InputLabelProps={{
										shrink: true
									}}
									value={competition_video}
									hiddenLabel
									autoFocus
									id="competition_video"
									variant="filled"
									fullWidth
								/>
							)}
						/>
					</Grid>
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={5}>
					<img
						className="max-w-max mb-10 w-400 h-270 items-center justify-center rounded-16"
						src="assets/images/examples/default-event.png"
						alt="default_photo"
					/>
					<p className="text-center">{t('ACTION_EXAMPLE_IMAGE_DESC_1')}</p>
					<p className="text-center">{t('ACTION_EXAMPLE_IMAGE_DESC_2')}</p>
					<p className="text-center">{t('ACTION_EXAMPLE_IMAGE_DESC_3')}</p>
				</Grid>
			</Grid>
		</Root>
	);
}

export default ImagesTab;
