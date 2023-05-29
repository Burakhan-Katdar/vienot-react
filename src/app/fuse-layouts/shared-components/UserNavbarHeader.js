import React from 'react';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import DefaultURLs from '../../../@fuse/utils/DefaultURLs';
import { Upload, message } from 'antd';
import { useTranslation } from 'react-i18next';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
	'& .username, & .email': {
		transition: theme.transitions.create('opacity', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	},

	'& .avatar': {
		background: theme.palette.background.default,
		transition: theme.transitions.create('all', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		}),
		bottom: 0,
		'& > img': {
			borderRadius: '50%'
		}
	}
}));

function UserNavbarHeader(props) {
	const user = useSelector(({ auth }) => auth.user);
	const [companyPhoto, setCompanyPhoto] = React.useState('');
	const { t } = useTranslation('actionsApp');
	const [width, setWidth] = React.useState()
	const [height, setHeight] = React.useState()
	const beforeUploadChecks = (file, fileList, type) => {
		const isAllowedFileSize = file.size < 2000000;
		const isAllowedFileType = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg';
		const isAllowedFileWidthHeight = true;
		// const reader = new FileReader();
		// reader.readAsDataURL(file);
		// reader.addEventListener('load', event => {
		// 	const _loadedImageUrl = event.target.result;
		// 	const image = document.createElement('img');
		// 	image.src = _loadedImageUrl;
		// 	image.addEventListener('load', () => {
		// 		const { width, height } = image;
		// 		// set image width and height to your state here
		// 		console.log('yüklenen foto width: ', width)
		// 		console.log('yüklenen foto height: ', height)
		// 		setWidth(width)
		// 		setHeight(height)
		// 	});
		// });
		// if(width === 600 && height === 600){
		// 	isAllowedFileWidthHeight = true;
		// }
		if (!isAllowedFileType) {
			message.error(t('UPLOAD_FILE_TYPE_ERROR'));
		} else {
			if (!isAllowedFileSize) {
				message.error(t('UPLOAD_FILE_SIZE_ERROR'));
			}else{
				if(!isAllowedFileWidthHeight){
					message.error(t('UPLOAD_FILE_WIDTH_HEIGHT_ERROR'));
				}
			}
		}
		return (isAllowedFileType && isAllowedFileSize && isAllowedFileWidthHeight) || Upload.LIST_IGNORE;
	};
	return (
		<StyledAppBar
			position="static"
			color="primary"
			className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0 shadow-0"
		>
			<Typography className="username text-18 whitespace-nowrap font-semibold mb-4" color="inherit">
				{user.data.displayName}
			</Typography>
			{/* <Typography
        className="email text-13 opacity-50 whitespace-nowrap font-medium"
        color="inherit"
      >
        {user.data.email}
      </Typography> */}
			<div className="flex items-center justify-center absolute bottom-0 -mb-44">
				{user.data.displayName === 'John Doe' ? (
					<Avatar className="w-72 h-72 p-8 box-content">{user.data.displayName[0]}</Avatar>
				) : (
					<Upload
						name="company_photo"
						showUploadList={false}
						action={DefaultURLs.apiBasePointURL + 'competitions/add-competition-photo?user_id=' + user.uuid}
						onChange={info => {
							if (info.file.status !== 'uploading') {
								// console.log(info.file, info.fileList);
							}
							if (info.file.status === 'done') {
								setCompanyPhoto(info.file.response.data);
							} else if (info.file.status === 'error') {
								message.error(`${info.file.name} ${t('FILE_UPLOAD_ERROR')}`);
							}
						}}
						beforeUpload={(file, fileList) => beforeUploadChecks(file, fileList, 'competition_third_photo')}
						accept=".png,.jpg,.jpeg"
					>
						<Avatar
							className="avatar w-72 h-72 p-8 box-content"
							alt="user photo"
							src={
								companyPhoto === ''
									? user.data.photoURL && user.data.photoURL !== ''
										? DefaultURLs.uploadProfilePhotoServerURL +
										(companyPhoto === '' ? user.data.photoURL : companyPhoto)
										: 'assets/images/avatars/profile.jpg'
									: DefaultURLs.uploadProfilePhotoServerURL + companyPhoto
							}
						/>
					</Upload>
				)}
			</div>
		</StyledAppBar>
	);
}

export default UserNavbarHeader;
