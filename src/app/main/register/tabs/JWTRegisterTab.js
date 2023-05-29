import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitRegister } from 'app/auth/store/registerSlice';
import * as yup from 'yup';
import _ from '@lodash';
import { InsertInvitation } from '@mui/icons-material';
import Api from 'app/fuse-configs/Api';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import MuiPhoneNumber from 'material-ui-phone-number';
import { notification } from 'antd';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	employee_name: yup.string().required('You must enter employee name'),
	// phone_number_gsm: yup.number().required('You must enter gsm phone number'),
	social_media_adresses: yup.string().required('You must enter social media adresses'),
	business_name: yup.string().required('You must enter business name'),
	email: yup.string().email('You must enter a valid email').required('You must enter a email'),
	password: yup
		.string()
		.required('Please enter your password.')
		.min(8, 'Password is too short - should be 8 chars minimum.'),
	passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

const defaultValues = {
	employee_name: '',
	social_media_adresses: 'Instagram: \nTwitch: \nYoutube: ',
	business_name: '',
	company_website: '',
	company_address: '',
	email: '',
	password: '',
	passwordConfirm: ''
};

function JWTRegisterTab() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authRegister = useSelector(({ auth }) => auth.register);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [twitterUser, setTwitterUser] = useState('');
	const [twitterUserId, setTwitterUserId] = useState('');
	const [twitterOauthToken, setTwitterOauthToken] = useState('');
	const [twitterOauthSecretToken, setTwitterOauthSecretToken] = useState('');
	const [phoneNumberGSM, setPhoneNumberGSM] = useState('');
	React.useEffect(() => {
		if (window.location.href.split('?')[1] !== undefined) {
			Api.authenticatePartnerAccessToken(
				window.location.href.split('?')[1].split('&')[0],
				window.location.href.split('?')[1].split('&')[1]
			)
				.then(response => {
					if (response.data.code === 1) {
						setTwitterOauthToken(response.data.user.oauth_token);
						setTwitterOauthSecretToken(response.data.user.oauth_token_secret);
						setTwitterUser(response.data.user.screen_name);
						setTwitterUserId(response.data.user.user_id);
						setIsAuthenticated(true);
					} else {
						setIsAuthenticated(false);
					}
				})
				.catch(err => {
					if (err.response.status === 500) {
						navigate('/register');
					}
				});
		}
	}, [window.location]);

	const { control, formState, handleSubmit, reset, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		// authRegister.errors.forEach((error) => {
		//   setError(error.type, {
		//     type: 'manual',
		//     message: error.message,
		//   });
		// });
	}, [authRegister.errors, setError]);

	function onSubmit(model) {
		if (isAuthenticated === true) {
			if (phoneNumberGSM !== '') {
				dispatch(
					submitRegister(model, twitterUser, twitterOauthToken, twitterOauthSecretToken, phoneNumberGSM)
				);
			} else {
				notification.error({
					message: 'Hata!',
					description: 'Lütfen Telefon Numaranızı Girin.'
				});
			}
		} else {
			notification.error({
				message: 'Hata!',
				description: 'Lütfen Twitter Hesabınızı Bağlayın.'
			});
		}
	}

	return (
		<div className="w-full">
			<form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
				<Button
					variant="contained"
					color="primary"
					className="w-full mx-auto mb-16"
					aria-label="Twitter"
					value="legacy"
					disabled={isAuthenticated === true}
					onClick={() => {
						Api.authenticatePartner().then(response => {
							window.open(
								'https://api.twitter.com/oauth/authorize?oauth_token=' + response.data.oauth_token,
								'_self'
							);
						});
					}}
				>
					{isAuthenticated === false ? 'Connect Your Twitter Account!' : 'Welcome ' + twitterUser + '!'}
				</Button>

				<Controller
					name="phone_number_gsm"
					control={control}
					render={({ field }) => (
						<MuiPhoneNumber
							style={{ marginBottom: 20 }}
							name="phone_number_gsm"
							sx={{
								svg: {
									height: '20px'
								}
							}}
							label="Phone Number"
							disableAreaCodes={true}
							data-cy="user-phone"
							defaultCountry={'us'}
							value={phoneNumberGSM}
							onChange={event => setPhoneNumberGSM(event)}
						/>
					)}
				/>

				<Controller
					name="business_name"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="text"
							label="Brand Name"
							required
							error={!!errors.business_name}
							helperText={errors?.business_name?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											company
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
						/>
					)}
				/>
				<Controller
					name="employee_name"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="text"
							label="Name Surname"
							error={!!errors.employee_name}
							helperText={errors?.employee_name?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											person
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
					)}
				/>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="text"
							error={!!errors.email}
							helperText={errors?.email?.message}
							label="Email"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											email
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
					)}
				/>
				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="password"
							label="Password"
							error={!!errors.password}
							helperText={errors?.password?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											vpn_key
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
					)}
				/>
				<Controller
					name="passwordConfirm"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="password"
							label="Confirm Password"
							error={!!errors.passwordConfirm}
							helperText={errors?.passwordConfirm?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											vpn_key
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
					)}
				/>
				<Controller
					name="social_media_adresses"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="text"
							error={!!errors.social_media_adresses}
							helperText={errors?.social_media_adresses?.message}
							label="Social Accounts"
							InputProps={{
								multiline: true,
								rows: 4,
								rowsMax: 4
								// endAdornment: (
								//   <InputAdornment position="start">
								//     <Icon className="text-20" color="action">
								//       phone
								//     </Icon>
								//     +90
								//   </InputAdornment>
								// ),
							}}
							variant="outlined"
							required
						/>
					)}
				/>
				<Controller
					name="company_website"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="text"
							label="Website (Optional)"
							error={!!errors.company_website}
							helperText={errors?.company_website?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											website
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
						/>
					)}
				/>
				<Controller
					name="company_address"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-16"
							type="text"
							style={{ display: 'none' }}
							label="Invoice Address (Optional)"
							error={!!errors.company_address}
							helperText={errors?.company_address?.message}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<InsertInvitation />
									</InputAdornment>
								)
							}}
							variant="outlined"
						/>
					)}
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16"
					aria-label="REGISTER"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					value="legacy"
				>
					Register
				</Button>
			</form>
		</div>
	);
}

export default JWTRegisterTab;
