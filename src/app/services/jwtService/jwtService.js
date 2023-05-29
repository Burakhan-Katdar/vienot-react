import FuseUtils from '@fuse/utils/FuseUtils';
import Api from 'app/fuse-configs/Api';
import axios from 'axios';
import { notification } from 'antd';
import 'antd/dist/antd.css';
/* eslint-disable camelcase */
class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = (data, twitterUserName, twitterOauthToken, twitterOauthSecretToken, phoneNumberGSM) => {
		return new Promise((resolve, reject) => {
			const {
				business_name,
				employee_name,
				// phone_number_gsm,
				// phone_number_local,
				company_website,
				company_address,
				email,
				password,
				social_media_adresses
			} = data;
			// let phoneNumberLocal = '+90' + phone_number_local;
			if(phoneNumberGSM.length > 6){
				Api.signUp({
					business_name,
					employee_name,
					phone_number_gsm: phoneNumberGSM,
					// phoneNumberLocal,
					company_website,
					company_address,
					email,
					password,
					social_media_adresses,
					company_twitter_username: twitterUserName,
					auth_token: twitterOauthToken,
					auth_token_secret: twitterOauthSecretToken
				})
					.then(response => {
						if (response.data.code === 1) {
							const newUser = {
								uuid: response.data.data.id,
								from: 'custom-db',
								role: response.data.data.role,
								data: {
									displayName: business_name,
									photoURL: response.data.data.photo_url,
									email: email,
									settings: {},
									shortcuts: []
								}
							};
							const user = _.cloneDeep(newUser);
							delete user.password;
							// const access_token = response.data.data.token;
							// this.setSession(access_token);
							notification.success({
								message: 'Successfull!',
								description: response.data.message
							});
							// resolve(user);
						} else {
							notification.error({
								message: 'Hata oluştu!',
								description: response.data.message
							});
							reject(response.data.message);
						}
					})
					.catch(err => console.log(err.response.request));
			}else{
				notification.error({
					message: 'Error!',
					description: 'Check your phone number!'
				});
			}
		});
	};

	signInWithEmailAndPassword = (email, password) => {
		return new Promise((resolve, reject) => {
			Api.login(email, password).then(response => {
				if (response.data.code === 1) {
					const access_token = response.data.data.token;
					this.setSession(access_token);
					const user = {
						uuid: response.data.data.id,
						from: 'custom-db',
						role: response.data.data.role,
						data: {
							displayName: response.data.data.name,
							photoURL: response.data.data.photo_url,
							email: email,
							settings: {},
							shortcuts: []
						}
					};
					resolve(user);
				} else {
					reject(response.data.message);
					notification.error({
						message: 'Error!',
						description: response.data.message
					});
				}
			});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			Api.controlAccessToken()
				.then(response => {
					if (response.data.code === 1) {
						this.setSession(response.data.data.token);
						const user = {
							uuid: response.data.data.id,
							from: 'custom-db',
							role: response.data.data.role,
							data: {
								displayName: response.data.data.name,
								photoURL: response.data.data.photo_url,
								email: response.data.data.email,
								settings: {},
								shortcuts: []
							}
						};
						resolve(user);
					} else {
						this.logout();
						reject(new Error('Token ile girişte hata oluştu.'));
					}
				})
				.catch(error => {
					if (error.response.status === 401) {
						this.logout();
						reject(new Error('Token ile girişte hata oluştu.'));
					}
				});
		});
	};

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('VienotToken', access_token);
		} else {
			localStorage.removeItem('VienotToken');
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('VienotToken');
	};
}

const instance = new JwtService();

export default instance;
